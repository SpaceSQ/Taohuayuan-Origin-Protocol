// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { sendVerificationCode } from '@/lib/email-service'; 
import redis from '@/lib/redis'; 

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'MISSING_TARGET // 未提供通讯频段' }, { status: 400 });

    // 1. 生成 8 位纯血赛博安全码
    const code = Math.floor(10000000 + Math.random() * 90000000).toString();

    // 2. 写入云端 Redis，并设置 300秒 (5分钟) 后自动销毁
    // ⚠️ 这里使用的是纯血 Upstash 语法
await redis.set(`pwd_reset:${email.trim().toLowerCase()}`, code, { ex: 300 });

    // 3. 呼叫阿里云 SMTP 发射邮件
    await sendVerificationCode(email, code);

    return NextResponse.json({ 
      success: true, 
      message: 'TRANSMISSION_SENT // 8位安全码已发送至云端并投递至邮箱。' 
    });
  } catch (error: any) {
    console.error("Redis/Email Error:", error);
    return NextResponse.json({ error: 'TRANSMISSION_FAILED // 云端突触连接异常' }, { status: 500 });
  }
}