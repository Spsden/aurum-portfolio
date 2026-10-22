import * as si from "systeminformation";

import type { SystemMetrics } from "@/types/system-metrics.t";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type StaticSystemInfo = {
  cpu: Awaited<ReturnType<typeof si.cpu>>;
  os: Awaited<ReturnType<typeof si.osInfo>>;
};

const metricsGlobal = globalThis as typeof globalThis & {
  __portfolioStaticSystemInfo?: Promise<StaticSystemInfo>;
};

function getStaticSystemInfo() {
  if (!metricsGlobal.__portfolioStaticSystemInfo) {
    metricsGlobal.__portfolioStaticSystemInfo = Promise.all([
      si.cpu(),
      si.osInfo(),
    ]).then(([cpu, os]) => ({ cpu, os }));
  }

  return metricsGlobal.__portfolioStaticSystemInfo;
}

function finiteOrNull(value: number | null | undefined) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function round(value: number | null | undefined, digits = 1) {
  const finiteValue = finiteOrNull(value);
  return finiteValue === null ? null : Number(finiteValue.toFixed(digits));
}

export async function GET() {
  try {
    const time = si.time();
    const [
      staticInfo,
      load,
      speed,
      temperature,
      memory,
      filesystems,
      filesystemStats,
      diskIo,
      networkStats,
      networkInterfaces,
    ] = await Promise.all([
      getStaticSystemInfo(),
      si.currentLoad(),
      si.cpuCurrentSpeed(),
      si.cpuTemperature(),
      si.mem(),
      si.fsSize(),
      si.fsStats(),
      si.disksIO(),
      si.networkStats(),
      si.networkInterfaces(),
    ]);

    const interfaceDetails = new Map(
      networkInterfaces.map((networkInterface) => [
        networkInterface.iface,
        networkInterface,
      ]),
    );
    const publicNetworkStats = networkStats
      .filter((network) => {
        const details = interfaceDetails.get(network.iface);
        return !details?.internal && network.iface !== "lo";
      })
      .map((network) => {
        const details = interfaceDetails.get(network.iface);
        return {
          interface: network.iface,
          state: network.operstate || details?.operstate || "unknown",
          type: details?.type || "network",
          speedMbps: finiteOrNull(details?.speed),
          receivedBytes: network.rx_bytes,
          sentBytes: network.tx_bytes,
          receivedBytesPerSecond: finiteOrNull(network.rx_sec),
          sentBytesPerSecond: finiteOrNull(network.tx_sec),
          errors: network.rx_errors + network.tx_errors,
          dropped: network.rx_dropped + network.tx_dropped,
        };
      });

    const network = publicNetworkStats.reduce(
      (totals, current) => ({
        receivedBytes: totals.receivedBytes + current.receivedBytes,
        sentBytes: totals.sentBytes + current.sentBytes,
        receivedBytesPerSecond:
          totals.receivedBytesPerSecond + (current.receivedBytesPerSecond ?? 0),
        sentBytesPerSecond:
          totals.sentBytesPerSecond + (current.sentBytesPerSecond ?? 0),
        errors: totals.errors + current.errors,
        dropped: totals.dropped + current.dropped,
      }),
      {
        receivedBytes: 0,
        sentBytes: 0,
        receivedBytesPerSecond: 0,
        sentBytesPerSecond: 0,
        errors: 0,
        dropped: 0,
      },
    );

    const visibleFilesystems = filesystems
      .filter(
        (filesystem) =>
          filesystem.size > 0 &&
          !["tmpfs", "devtmpfs", "devfs", "squashfs"].includes(
            filesystem.type.toLowerCase(),
          ),
      )
      .sort((a, b) => b.size - a.size)
      .slice(0, 8)
      .map((filesystem) => ({
        mount: filesystem.mount,
        type: filesystem.type,
        sizeBytes: filesystem.size,
        usedBytes: filesystem.used,
        availableBytes: filesystem.available,
        usedPercent: round(filesystem.use) ?? 0,
        readWrite: filesystem.rw,
      }));

    const response: SystemMetrics = {
      sampledAt: new Date().toISOString(),
      refreshIntervalMs: 2_500,
      system: {
        platform: staticInfo.os.platform,
        distro: staticInfo.os.distro,
        release: staticInfo.os.release,
        kernel: staticInfo.os.kernel,
        architecture: staticInfo.os.arch,
        uptimeSeconds: time.uptime,
        timezone: time.timezone,
      },
      cpu: {
        manufacturer: staticInfo.cpu.manufacturer,
        brand: staticInfo.cpu.brand,
        logicalCores: staticInfo.cpu.cores,
        physicalCores: staticInfo.cpu.physicalCores,
        processors: staticInfo.cpu.processors,
        virtualization: staticInfo.cpu.virtualization,
        loadPercent: round(load.currentLoad) ?? 0,
        userPercent: round(load.currentLoadUser) ?? 0,
        systemPercent: round(load.currentLoadSystem) ?? 0,
        idlePercent: round(load.currentLoadIdle) ?? 0,
        averageLoad: round(load.avgLoad, 2),
        speedGhz: round(speed.avg, 2),
        minSpeedGhz: round(speed.min, 2),
        maxSpeedGhz: round(speed.max, 2),
        temperatureCelsius: round(temperature.main),
        maxTemperatureCelsius: round(temperature.max),
        cores: load.cpus.map((core, index) => ({
          index,
          loadPercent: round(core.load) ?? 0,
          userPercent: round(core.loadUser) ?? 0,
          systemPercent: round(core.loadSystem) ?? 0,
        })),
      },
      memory: {
        totalBytes: memory.total,
        activeBytes: memory.active,
        usedBytes: memory.used,
        availableBytes: memory.available,
        cacheBytes: memory.buffcache,
        reclaimableBytes: memory.reclaimable,
        usedPercent:
          round((memory.active / Math.max(memory.total, 1)) * 100) ?? 0,
        swapTotalBytes: memory.swaptotal,
        swapUsedBytes: memory.swapused,
        swapUsedPercent:
          memory.swaptotal > 0
            ? (round((memory.swapused / memory.swaptotal) * 100) ?? 0)
            : 0,
      },
      network: {
        ...network,
        available: publicNetworkStats.length > 0,
        interfaces: publicNetworkStats,
      },
      storage: {
        filesystems: visibleFilesystems,
        io: {
          readOperationsPerSecond: finiteOrNull(diskIo.rIO_sec),
          writeOperationsPerSecond: finiteOrNull(diskIo.wIO_sec),
          totalOperationsPerSecond: finiteOrNull(diskIo.tIO_sec),
          readBytesPerSecond: finiteOrNull(filesystemStats.rx_sec),
          writeBytesPerSecond: finiteOrNull(filesystemStats.wx_sec),
          totalBytesPerSecond: finiteOrNull(filesystemStats.tx_sec),
          waitPercent: finiteOrNull(diskIo.tWaitPercent),
        },
      },
    };

    return Response.json(response, {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to collect system metrics", error);
    return Response.json(
      { error: "System metrics are temporarily unavailable." },
      {
        status: 503,
        headers: { "Cache-Control": "no-store" },
      },
    );
  }
}
