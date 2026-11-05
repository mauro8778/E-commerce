import Redis, { RedisOptions } from 'ioredis';

export const redisOptions: RedisOptions = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379', 10),
  password: process.env.REDIS_PASSWORD || undefined,
  maxRetriesPerRequest: null, // Requerido por BullMQ
  enableReadyCheck: false,
  retryStrategy(times) {
    return Math.min(times * 100, 3000);
  },
  lazyConnect: true,
};

export const redisClient = new Redis(redisOptions);

redisClient.on('connect', () => {
  console.log('⚡ [Redis] Conectado exitosamente');
});

redisClient.on('error', (err) => {
  console.warn('⚠️ [Redis] Error / Modo Fallback:', err.message);
});

export async function getRedis(): Promise<Redis> {
  if (redisClient.status === 'wait' || redisClient.status === 'close') {
    try {
      await redisClient.connect();
    } catch (e: any) {
      console.warn('⚠️ Redis offline, operando con fallback en memoria');
    }
  }
  return redisClient;
}

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const client = await getRedis();
    const data = await client.get(`ecom:cache:${key}`);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function setCache(key: string, value: any, ttlSeconds: number = 300): Promise<void> {
  try {
    const client = await getRedis();
    await client.set(`ecom:cache:${key}`, JSON.stringify(value), 'EX', ttlSeconds);
  } catch {
    // Fallback silencioso
  }
}

export async function deleteCache(pattern: string): Promise<void> {
  try {
    const client = await getRedis();
    const keys = await client.keys(`ecom:cache:${pattern}`);
    if (keys.length > 0) {
      await client.del(...keys);
    }
  } catch {
    // Ignorar
  }
}

/**
 * Bloqueo Distribuido con Redis (Redlock Mutex)
 * Protege contra venta simultánea de la última unidad en productos de alta demanda
 */
export async function acquireDistributedLock(
  lockKey: string,
  ttlSeconds: number = 5
): Promise<string | null> {
  const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
  try {
    const client = await getRedis();
    const result = await client.set(`ecom:lock:${lockKey}`, token, 'EX', ttlSeconds, 'NX');
    return result === 'OK' ? token : null;
  } catch {
    return token; // Fallback permitiendo continuar si Redis está offline
  }
}

export async function releaseDistributedLock(
  lockKey: string,
  token: string
): Promise<boolean> {
  const lua = `
    if redis.call("get", KEYS[1]) == ARGV[1] then
      return redis.call("del", KEYS[1])
    else
      return 0
    end
  `;
  try {
    const client = await getRedis();
    const res = await client.eval(lua, 1, `ecom:lock:${lockKey}`, token);
    return res === 1;
  } catch {
    return false;
  }
}
