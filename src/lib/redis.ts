// src/lib/redis.ts
import { Redis } from '@upstash/redis';

// 强制检查云端环境变量，确保不会在本地裸奔
if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
  throw new Error("MATRIX_ERROR // 缺失云端 Redis 密钥，系统拒绝启动。");
}

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export default redis;