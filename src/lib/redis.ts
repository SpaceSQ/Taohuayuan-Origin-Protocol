import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || 'https://dummy.upstash.io',
  token: process.env.KV_REST_API_TOKEN || 'dummy-token',
});

export default redis;