type Awaited<T> = T extends PromiseLike<infer U> ? Awaited<U> : T;
export type MetroConfig = Awaited<ReturnType<typeof import('metro-config').getDefaultConfig>>;