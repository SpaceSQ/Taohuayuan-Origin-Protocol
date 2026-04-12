// src/lib/redis.ts
import { Redis } from '@upstash/redis';

// 编译期静态扫描时，如果没有真实密钥，就塞给它一个假奶嘴，绝对不许报错 (throw Error)
const redisUrl = process.env.KV_REST_API_URL || 'https://build-dummy.upstash.io';
const redisToken = process.env.KV_REST_API_TOKEN || 'build-dummy-token';

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export default redis;