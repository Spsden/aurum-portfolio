export type SystemMetrics = {
  sampledAt: string;
  refreshIntervalMs: number;
  system: {
    platform: string;
    distro: string;
    release: string;
    kernel: string;
    architecture: string;
    uptimeSeconds: number;
    timezone: string;
  };
  cpu: {
    manufacturer: string;
    brand: string;
    logicalCores: number;
    physicalCores: number;
    processors: number;
    virtualization: boolean;
    loadPercent: number;
    userPercent: number;
    systemPercent: number;
    idlePercent: number;
    averageLoad: number | null;
    speedGhz: number | null;
    minSpeedGhz: number | null;
    maxSpeedGhz: number | null;
    temperatureCelsius: number | null;
    maxTemperatureCelsius: number | null;
    cores: Array<{
      index: number;
      loadPercent: number;
      userPercent: number;
      systemPercent: number;
    }>;
  };
  memory: {
    totalBytes: number;
    activeBytes: number;
    usedBytes: number;
    availableBytes: number;
    cacheBytes: number;
    reclaimableBytes: number;
    usedPercent: number;
    swapTotalBytes: number;
    swapUsedBytes: number;
    swapUsedPercent: number;
  };
  network: {
    available: boolean;
    receivedBytes: number;
    sentBytes: number;
    receivedBytesPerSecond: number;
    sentBytesPerSecond: number;
    errors: number;
    dropped: number;
    interfaces: Array<{
      interface: string;
      state: string;
      type: string;
      speedMbps: number | null;
      receivedBytes: number;
      sentBytes: number;
      receivedBytesPerSecond: number | null;
      sentBytesPerSecond: number | null;
      errors: number;
      dropped: number;
    }>;
  };
  storage: {
    filesystems: Array<{
      mount: string;
      type: string;
      sizeBytes: number;
      usedBytes: number;
      availableBytes: number;
      usedPercent: number;
      readWrite: boolean | null;
    }>;
    io: {
      readOperationsPerSecond: number | null;
      writeOperationsPerSecond: number | null;
      totalOperationsPerSecond: number | null;
      readBytesPerSecond: number | null;
      writeBytesPerSecond: number | null;
      totalBytesPerSecond: number | null;
      waitPercent: number | null;
    };
  };
};
