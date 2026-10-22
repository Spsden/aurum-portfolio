"use client";

import {
  ArrowDown,
  ArrowUp,
  Clock3,
  Cpu,
  Database,
  Gauge,
  HardDrive,
  MemoryStick,
  Network,
  RefreshCw,
  Server,
  Thermometer,
  Zap,
} from "lucide-react";
import { type ReactNode, useEffect, useState } from "react";

import type { SystemMetrics } from "@/types/system-metrics.t";

const FALLBACK_REFRESH_INTERVAL_MS = 2_500;
const HISTORY_LENGTH = 36;

type HistoryPoint = {
  cpu: number;
  memory: number;
  networkDown: number;
  networkUp: number;
};

export default function SystemDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let timeoutId: number | undefined;
    let controller: AbortController | undefined;

    const update = async () => {
      controller = new AbortController();

      try {
        const response = await fetch("/api/system-metrics", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) throw new Error("Metrics request failed");

        const next = (await response.json()) as SystemMetrics;
        if (!active) return;

        setMetrics(next);
        setError(null);
        setHistory((current) =>
          [
            ...current,
            {
              cpu: next.cpu.loadPercent,
              memory: next.memory.usedPercent,
              networkDown: next.network.receivedBytesPerSecond,
              networkUp: next.network.sentBytesPerSecond,
            },
          ].slice(-HISTORY_LENGTH),
        );
        timeoutId = window.setTimeout(
          update,
          next.refreshIntervalMs || FALLBACK_REFRESH_INTERVAL_MS,
        );
      } catch (caughtError) {
        if (
          !active ||
          (caughtError instanceof DOMException &&
            caughtError.name === "AbortError")
        ) {
          return;
        }

        setError("Live telemetry is temporarily unavailable.");
        timeoutId = window.setTimeout(update, FALLBACK_REFRESH_INTERVAL_MS);
      }
    };

    void update();

    return () => {
      active = false;
      controller?.abort();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  if (!metrics) {
    return <DashboardLoading error={error} />;
  }

  const primaryFilesystem =
    metrics.storage.filesystems.find(
      (filesystem) => filesystem.mount === "/",
    ) ?? metrics.storage.filesystems[0];
  const sampledTime = new Date(metrics.sampledAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="space-y-6 sm:space-y-8">
      <header className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
            Server observability
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] sm:text-4xl md:text-5xl">
            System pulse
          </h1>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-[var(--foreground-300)] sm:text-xl md:text-2xl">
            Serving this website from a glorified potato under my table, powered
            by{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {metrics.cpu.brand || "a brave little CPU"}
            </span>
            ,{" "}
            <span className="font-semibold text-[var(--foreground)]">
              {formatBytes(metrics.memory.totalBytes)} RAM
            </span>
            , and a suspiciously long{" "}
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              Cloudflare Tunnel
            </span>
            .
          </p>
          <p className="mt-3 max-w-2xl font-mono text-xs leading-relaxed text-[var(--foreground-500)]">
            Live host telemetry · Processes and private network identifiers are
            intentionally excluded.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-2 text-emerald-700 dark:text-emerald-300">
            <span className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse" />
            Live · 2.5s
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-[var(--background-300)] bg-[var(--background-100)] px-3 py-2 text-[var(--foreground-400)]">
            <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
            {sampledTime}
          </span>
        </div>
      </header>

      {error && (
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-300">
          {error} Showing the most recent successful sample.
        </div>
      )}

      <section
        aria-label="System overview"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
      >
        <SummaryCard
          accent="emerald"
          icon={<Cpu className="h-4 w-4" aria-hidden="true" />}
          label="CPU load"
          value={formatPercent(metrics.cpu.loadPercent)}
          detail={formatOptional(metrics.cpu.speedGhz, " GHz")}
        >
          <Sparkline
            values={history.map((point) => point.cpu)}
            max={100}
            className="text-emerald-500"
          />
        </SummaryCard>
        <SummaryCard
          accent="violet"
          icon={<MemoryStick className="h-4 w-4" aria-hidden="true" />}
          label="Active memory"
          value={formatPercent(metrics.memory.usedPercent)}
          detail={
            formatBytes(metrics.memory.activeBytes) +
            " / " +
            formatBytes(metrics.memory.totalBytes)
          }
        >
          <Sparkline
            values={history.map((point) => point.memory)}
            max={100}
            className="text-violet-500"
          />
        </SummaryCard>
        <SummaryCard
          accent="sky"
          icon={<Network className="h-4 w-4" aria-hidden="true" />}
          label="Network"
          value={formatRate(metrics.network.receivedBytesPerSecond)}
          detail={"↑ " + formatRate(metrics.network.sentBytesPerSecond)}
        >
          <Sparkline
            values={history.map((point) => point.networkDown)}
            className="text-sky-500"
          />
        </SummaryCard>
        <SummaryCard
          accent="amber"
          icon={<HardDrive className="h-4 w-4" aria-hidden="true" />}
          label="Primary storage"
          value={
            primaryFilesystem
              ? formatPercent(primaryFilesystem.usedPercent)
              : "N/A"
          }
          detail={
            primaryFilesystem
              ? formatBytes(primaryFilesystem.usedBytes) +
                " / " +
                formatBytes(primaryFilesystem.sizeBytes)
              : "No mounted filesystem"
          }
        >
          <Sparkline
            values={
              primaryFilesystem
                ? history.map(() => primaryFilesystem.usedPercent)
                : []
            }
            max={100}
            className="text-amber-500"
          />
        </SummaryCard>
      </section>

      <section
        aria-label="Detailed system telemetry"
        className="grid grid-cols-1 gap-5 xl:grid-cols-12"
      >
        <Panel className="xl:col-span-8">
          <PanelHeader
            icon={<Cpu className="h-4 w-4" aria-hidden="true" />}
            title="CPU"
            subtitle={metrics.cpu.manufacturer + " " + metrics.cpu.brand}
          >
            <div className="flex flex-wrap gap-2">
              <Chip
                icon={<Gauge className="h-3 w-3" aria-hidden="true" />}
                text={formatOptional(metrics.cpu.speedGhz, " GHz")}
              />
              <Chip
                icon={<Thermometer className="h-3 w-3" aria-hidden="true" />}
                text={
                  metrics.cpu.temperatureCelsius === null
                    ? "Temp N/A"
                    : formatNumber(metrics.cpu.temperatureCelsius) + "°C"
                }
              />
            </div>
          </PanelHeader>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-mono text-xs uppercase tracking-wider text-[var(--foreground-500)]">
                    Total load
                  </p>
                  <p className="mt-1 font-mono text-4xl font-semibold tabular-nums text-[var(--foreground)]">
                    {formatPercent(metrics.cpu.loadPercent)}
                  </p>
                </div>
                <div className="text-right font-mono text-xs text-[var(--foreground-400)]">
                  <p>User {formatPercent(metrics.cpu.userPercent)}</p>
                  <p>System {formatPercent(metrics.cpu.systemPercent)}</p>
                </div>
              </div>
              <div className="mt-5 h-36 rounded-xl border border-[var(--background-300)] bg-[var(--background)] p-3">
                <Sparkline
                  values={history.map((point) => point.cpu)}
                  max={100}
                  className="h-full text-emerald-500"
                  large
                />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <TinyStat
                  label="Physical"
                  value={String(metrics.cpu.physicalCores)}
                />
                <TinyStat
                  label="Logical"
                  value={String(metrics.cpu.logicalCores)}
                />
                <TinyStat
                  label="Idle"
                  value={formatPercent(metrics.cpu.idlePercent)}
                />
                <TinyStat
                  label="Load avg"
                  value={formatOptional(metrics.cpu.averageLoad, "")}
                />
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-wider text-[var(--foreground-500)]">
                Per-core activity
              </p>
              <div className="mt-3 grid max-h-64 grid-cols-2 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 lg:grid-cols-2 2xl:grid-cols-4">
                {metrics.cpu.cores.map((core) => (
                  <CoreMeter
                    key={core.index}
                    index={core.index}
                    value={core.loadPercent}
                  />
                ))}
              </div>
            </div>
          </div>
        </Panel>

        <Panel className="xl:col-span-4">
          <PanelHeader
            icon={<MemoryStick className="h-4 w-4" aria-hidden="true" />}
            title="Memory"
            subtitle={formatBytes(metrics.memory.totalBytes) + " installed"}
          />
          <div className="mt-6 space-y-5">
            <UsageRow
              label="Active"
              value={metrics.memory.activeBytes}
              total={metrics.memory.totalBytes}
              color="bg-violet-500"
            />
            <UsageRow
              label="Available"
              value={metrics.memory.availableBytes}
              total={metrics.memory.totalBytes}
              color="bg-emerald-500"
            />
            <UsageRow
              label="Cache"
              value={metrics.memory.cacheBytes}
              total={metrics.memory.totalBytes}
              color="bg-sky-500"
            />
            <UsageRow
              label="Reclaimable"
              value={metrics.memory.reclaimableBytes}
              total={metrics.memory.totalBytes}
              color="bg-amber-500"
            />
          </div>
          <div className="mt-6 rounded-xl border border-[var(--background-300)] bg-[var(--background)] p-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--foreground-500)]">
                Swap
              </span>
              <span className="font-mono text-sm font-semibold tabular-nums">
                {formatPercent(metrics.memory.swapUsedPercent)}
              </span>
            </div>
            <p className="mt-2 text-xs text-[var(--foreground-400)]">
              {formatBytes(metrics.memory.swapUsedBytes)} of{" "}
              {formatBytes(metrics.memory.swapTotalBytes)}
            </p>
          </div>
        </Panel>

        <Panel className="xl:col-span-7">
          <PanelHeader
            icon={<Network className="h-4 w-4" aria-hidden="true" />}
            title="Network"
            subtitle={
              metrics.network.available
                ? String(metrics.network.interfaces.length) +
                  " active interface" +
                  (metrics.network.interfaces.length === 1 ? "" : "s")
                : "No active interface"
            }
          >
            <div className="flex gap-2">
              <Chip
                icon={<ArrowDown className="h-3 w-3" aria-hidden="true" />}
                text={formatRate(metrics.network.receivedBytesPerSecond)}
              />
              <Chip
                icon={<ArrowUp className="h-3 w-3" aria-hidden="true" />}
                text={formatRate(metrics.network.sentBytesPerSecond)}
              />
            </div>
          </PanelHeader>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {metrics.network.interfaces.map((networkInterface) => (
              <article
                key={networkInterface.interface}
                className="rounded-xl border border-[var(--background-300)] bg-[var(--background)] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-mono text-sm font-semibold text-[var(--foreground)]">
                      {networkInterface.interface}
                    </h3>
                    <p className="mt-1 text-xs text-[var(--foreground-500)]">
                      {networkInterface.type}
                      {networkInterface.speedMbps
                        ? " · " +
                          formatNumber(networkInterface.speedMbps) +
                          " Mbps"
                        : ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 px-2 py-1 font-mono text-[10px] uppercase text-emerald-600 dark:text-emerald-400">
                    {networkInterface.state}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <DirectionStat
                    direction="down"
                    rate={networkInterface.receivedBytesPerSecond}
                    total={networkInterface.receivedBytes}
                  />
                  <DirectionStat
                    direction="up"
                    rate={networkInterface.sentBytesPerSecond}
                    total={networkInterface.sentBytes}
                  />
                </div>
              </article>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4 font-mono text-xs text-[var(--foreground-500)]">
            <span>RX total {formatBytes(metrics.network.receivedBytes)}</span>
            <span>TX total {formatBytes(metrics.network.sentBytes)}</span>
            <span>Errors {formatNumber(metrics.network.errors)}</span>
            <span>Dropped {formatNumber(metrics.network.dropped)}</span>
          </div>
        </Panel>

        <Panel className="xl:col-span-5">
          <PanelHeader
            icon={<HardDrive className="h-4 w-4" aria-hidden="true" />}
            title="Filesystems"
            subtitle={
              String(metrics.storage.filesystems.length) + " mounted volumes"
            }
          />
          <div className="mt-6 space-y-4">
            {metrics.storage.filesystems.map((filesystem) => (
              <FilesystemRow
                key={filesystem.mount + filesystem.type}
                filesystem={filesystem}
              />
            ))}
          </div>
        </Panel>

        <Panel className="xl:col-span-6">
          <PanelHeader
            icon={<Database className="h-4 w-4" aria-hidden="true" />}
            title="Disk I/O"
            subtitle="Aggregate filesystem throughput"
          />
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <IoCard
              icon={<ArrowDown className="h-4 w-4" aria-hidden="true" />}
              label="Read"
              rate={metrics.storage.io.readBytesPerSecond}
              operations={metrics.storage.io.readOperationsPerSecond}
              color="text-sky-500"
            />
            <IoCard
              icon={<ArrowUp className="h-4 w-4" aria-hidden="true" />}
              label="Write"
              rate={metrics.storage.io.writeBytesPerSecond}
              operations={metrics.storage.io.writeOperationsPerSecond}
              color="text-violet-500"
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <TinyStat
              label="Total throughput"
              value={formatRate(metrics.storage.io.totalBytesPerSecond)}
            />
            <TinyStat
              label="I/O wait"
              value={
                metrics.storage.io.waitPercent === null
                  ? "N/A"
                  : formatPercent(metrics.storage.io.waitPercent)
              }
            />
          </div>
        </Panel>

        <Panel className="xl:col-span-6">
          <PanelHeader
            icon={<Server className="h-4 w-4" aria-hidden="true" />}
            title="Host"
            subtitle="Public, non-identifying system details"
          />
          <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
            <Definition
              label="Operating system"
              value={
                metrics.system.distro +
                (metrics.system.release ? " " + metrics.system.release : "")
              }
            />
            <Definition
              label="Architecture"
              value={metrics.system.architecture}
            />
            <Definition label="Kernel" value={metrics.system.kernel} />
            <Definition
              label="Virtualization"
              value={metrics.cpu.virtualization ? "Available" : "Unavailable"}
            />
            <Definition
              label="Uptime"
              value={formatDuration(metrics.system.uptimeSeconds)}
              icon={<Clock3 className="h-3.5 w-3.5" aria-hidden="true" />}
            />
            <Definition
              label="Timezone"
              value={metrics.system.timezone}
              icon={<Zap className="h-3.5 w-3.5" aria-hidden="true" />}
            />
          </dl>
        </Panel>
      </section>
    </div>
  );
}

function DashboardLoading({ error }: { error: string | null }) {
  return (
    <div className="min-h-[60vh]">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-emerald-600 dark:text-emerald-400">
        Server observability
      </p>
      <h1 className="mt-2 text-3xl font-semibold sm:text-5xl">System pulse</h1>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-36 animate-pulse rounded-2xl border border-[var(--background-300)] bg-[var(--background-100)] motion-reduce:animate-none"
          />
        ))}
      </div>
      <div className="mt-5 h-72 animate-pulse rounded-2xl border border-[var(--background-300)] bg-[var(--background-100)] motion-reduce:animate-none" />
      <p className="mt-4 font-mono text-xs text-[var(--foreground-500)]">
        {error ?? "Collecting the first server sample…"}
      </p>
    </div>
  );
}

function Panel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={
        "rounded-2xl border border-[var(--background-300)] bg-[var(--background-100)] p-5 shadow-theme-md sm:p-6 " +
        className
      }
    >
      {children}
    </article>
  );
}

function PanelHeader({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode;
  title: string;
  subtitle: string;
  children?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 rounded-lg border border-[var(--background-300)] bg-[var(--background)] p-2 text-[var(--foreground-300)]">
          {icon}
        </span>
        <div>
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            {title}
          </h2>
          <p className="mt-1 text-xs text-[var(--foreground-500)]">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </header>
  );
}

const summaryAccent = {
  emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10",
  violet: "text-violet-600 dark:text-violet-400 bg-violet-500/10",
  sky: "text-sky-600 dark:text-sky-400 bg-sky-500/10",
  amber: "text-amber-600 dark:text-amber-400 bg-amber-500/10",
};

function SummaryCard({
  icon,
  label,
  value,
  detail,
  accent,
  children,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
  accent: keyof typeof summaryAccent;
  children: ReactNode;
}) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-[var(--background-300)] bg-[var(--background-100)] p-5 shadow-theme-md">
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground-500)]">
            {label}
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-[var(--foreground)]">
            {value}
          </p>
          <p className="mt-1 truncate text-xs text-[var(--foreground-400)]">
            {detail}
          </p>
        </div>
        <span className={"rounded-lg p-2 " + summaryAccent[accent]}>
          {icon}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-12 opacity-35">
        {children}
      </div>
    </article>
  );
}

function Sparkline({
  values,
  max,
  className = "",
  large = false,
}: {
  values: number[];
  max?: number;
  className?: string;
  large?: boolean;
}) {
  const normalizedValues =
    values.length > 1 ? values : [values[0] ?? 0, values[0] ?? 0];
  const ceiling = Math.max(max ?? Math.max(...normalizedValues, 1), 1);
  const points = normalizedValues
    .map((value, index) => {
      const x = (index / Math.max(normalizedValues.length - 1, 1)) * 100;
      const y = 30 - Math.min(30, (Math.max(0, value) / ceiling) * 28);
      return x.toFixed(2) + "," + y.toFixed(2);
    })
    .join(" ");

  return (
    <svg
      viewBox="0 0 100 32"
      preserveAspectRatio="none"
      className={(large ? "h-full w-full " : "h-full w-full ") + className}
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth={large ? 1.4 : 1.8}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function CoreMeter({ index, value }: { index: number; value: number }) {
  return (
    <div className="rounded-lg border border-[var(--background-300)] bg-[var(--background)] p-2.5">
      <div className="flex items-center justify-between font-mono text-[10px]">
        <span className="text-[var(--foreground-500)]">
          C{String(index).padStart(2, "0")}
        </span>
        <span className="font-semibold tabular-nums text-[var(--foreground)]">
          {formatPercent(value)}
        </span>
      </div>
      <ProgressBar value={value} className="mt-2 bg-emerald-500" />
    </div>
  );
}

function UsageRow({
  label,
  value,
  total,
  color,
}: {
  label: string;
  value: number;
  total: number;
  color: string;
}) {
  const percent = (value / Math.max(total, 1)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <span className="text-[var(--foreground-300)]">{label}</span>
        <span className="font-mono text-xs tabular-nums text-[var(--foreground-400)]">
          {formatBytes(value)} · {formatPercent(percent)}
        </span>
      </div>
      <ProgressBar value={percent} className={"mt-2 " + color} />
    </div>
  );
}

function ProgressBar({
  value,
  className,
}: {
  value: number;
  className: string;
}) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-[var(--background-300)]">
      <div
        className={
          "h-full rounded-full transition-[width] duration-500 " + className
        }
        style={{ width: Math.min(100, Math.max(0, value)) + "%" }}
      />
    </div>
  );
}

function Chip({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--background-300)] bg-[var(--background)] px-2.5 py-1.5 font-mono text-[10px] text-[var(--foreground-400)]">
      {icon}
      {text}
    </span>
  );
}

function TinyStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[var(--background-300)] bg-[var(--background)] p-3">
      <p className="font-mono text-[9px] uppercase tracking-wider text-[var(--foreground-500)]">
        {label}
      </p>
      <p className="mt-1 truncate font-mono text-sm font-semibold tabular-nums text-[var(--foreground)]">
        {value}
      </p>
    </div>
  );
}

function DirectionStat({
  direction,
  rate,
  total,
}: {
  direction: "down" | "up";
  rate: number | null;
  total: number;
}) {
  const down = direction === "down";
  return (
    <div>
      <p
        className={
          "flex items-center gap-1 font-mono text-[10px] uppercase " +
          (down ? "text-sky-500" : "text-violet-500")
        }
      >
        {down ? (
          <ArrowDown className="h-3 w-3" aria-hidden="true" />
        ) : (
          <ArrowUp className="h-3 w-3" aria-hidden="true" />
        )}
        {down ? "Down" : "Up"}
      </p>
      <p className="mt-1 font-mono text-sm font-semibold tabular-nums">
        {formatRate(rate)}
      </p>
      <p className="mt-1 text-[10px] text-[var(--foreground-500)]">
        {formatBytes(total)} total
      </p>
    </div>
  );
}

function FilesystemRow({
  filesystem,
}: {
  filesystem: SystemMetrics["storage"]["filesystems"][number];
}) {
  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-mono text-xs font-semibold text-[var(--foreground)]">
            {filesystem.mount}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-[var(--foreground-500)]">
            {filesystem.type} · {filesystem.readWrite ? "rw" : "read only"}
          </p>
        </div>
        <span className="font-mono text-xs font-semibold tabular-nums">
          {formatPercent(filesystem.usedPercent)}
        </span>
      </div>
      <ProgressBar
        value={filesystem.usedPercent}
        className={
          "mt-2 " +
          (filesystem.usedPercent > 85 ? "bg-rose-500" : "bg-amber-500")
        }
      />
      <p className="mt-1.5 text-right text-[10px] text-[var(--foreground-500)]">
        {formatBytes(filesystem.usedBytes)} /{" "}
        {formatBytes(filesystem.sizeBytes)}
      </p>
    </div>
  );
}

function IoCard({
  icon,
  label,
  rate,
  operations,
  color,
}: {
  icon: ReactNode;
  label: string;
  rate: number | null;
  operations: number | null;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-[var(--background-300)] bg-[var(--background)] p-4">
      <span className={color}>{icon}</span>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground-500)]">
        {label}
      </p>
      <p className="mt-1 font-mono text-xl font-semibold tabular-nums">
        {formatRate(rate)}
      </p>
      <p className="mt-1 text-xs text-[var(--foreground-500)]">
        {operations === null
          ? "IOPS unavailable"
          : formatNumber(operations) + " ops/s"}
      </p>
    </div>
  );
}

function Definition({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon?: ReactNode;
}) {
  return (
    <div className="border-b border-[var(--background-300)] pb-3">
      <dt className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--foreground-500)]">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 truncate text-sm font-medium text-[var(--foreground)]">
        {value || "N/A"}
      </dd>
    </div>
  );
}

function formatBytes(bytes: number) {
  if (!Number.isFinite(bytes) || bytes <= 0) return "0 B";
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const exponent = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );
  const value = bytes / 1024 ** exponent;
  return (
    value.toFixed(value >= 100 || exponent === 0 ? 0 : value >= 10 ? 1 : 2) +
    " " +
    units[exponent]
  );
}

function formatRate(bytesPerSecond: number | null) {
  return bytesPerSecond === null
    ? "Sampling…"
    : formatBytes(bytesPerSecond) + "/s";
}

function formatPercent(value: number) {
  return formatNumber(value) + "%";
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: value < 10 ? 1 : 0,
  }).format(value);
}

function formatOptional(value: number | null, suffix: string) {
  return value === null ? "N/A" : formatNumber(value) + suffix;
}

function formatDuration(totalSeconds: number) {
  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  return (
    (days > 0 ? days + "d " : "") +
    (hours > 0 ? hours + "h " : "") +
    minutes +
    "m"
  );
}
