// src/app/api/auth/reset-password/route.ts
import { NextResponse } from 'next/server';
import { sendVerificationCode } from '@/lib/email-service'; 
import redis from '@/lib/redis'; 

export async function POST(request: Request) {
  try {
    // 🛡️ 运行时检查：必须放在函数内部！编译时不会执行到这里。
    if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
      console.error("MATRIX_ERROR // 缺失云端 Redis 密钥");
      return NextResponse.json({ error: 'SYSTEM_ERROR // 云端突触未连接' }, { status: 500 });
    }

    const { email } = await request.json();
    if (!email) return NextResponse.json({ error: 'MISSING_TARGET // 未提供通讯频段' }, { status: 400 });

    const code = Math.floor(10000000 + Math.random() * 90000000).toString();
    const safeEmail = email.trim().toLowerCase();

    // 写入云端 Redis
    await redis.set(`pwd_reset:${safeEmail}`, code, { ex: 300 });

    // 呼叫阿里云发邮件
    await sendVerificationCode(safeEmail, code);

    return NextResponse.json({ 
      success: true, 
      message: 'TRANSMISSION_SENT // 8位安全码已发送至云端并投递至邮箱。' 
    });
  } catch (error: any) {
    console.error("Redis/Email Error:", error);
    return NextResponse.json({ error: 'TRANSMISSION_FAILED // 云端突触连接异常' }, { status: 500 });
  }
}