// src/app/api/auth/verify-reset/route.ts
import { NextResponse } from 'next/server';
import redis from '@/lib/redis';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const { email, code, newPassword } = await request.json();

    if (!email || !code || !newPassword) {
      return NextResponse.json({ error: 'DATA_MISSING // 参数不完整' }, { status: 400 });
    }

    // 🛠️ 防弹装甲 1：抹平大小写和误触的空格
    const safeEmail = email.trim().toLowerCase();
    const safeCode = code.trim();

    // 1. 去 Redis 核对 8 位安全码
    const storedCode = await redis.get(`pwd_reset:${safeEmail}`);
    
    // 🛠️ 防弹装甲 2：强制把云端取回的数据转成字符串，防止 Upstash 的 Number 自动转换导致严格比较失败
    if (!storedCode || String(storedCode) !== safeCode) {
      console.log(`[DEBUG] 匹配失败. 云端: ${String(storedCode)}, 输入: ${safeCode}`);
      return NextResponse.json({ error: 'INVALID_CODE // 安全码无效或已自毁(超时)' }, { status: 400 });
    }

    // 2. 遍历查找该邮箱对应的底层 Auth User ID
    const { data: { users }, error: userError } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000
    });
    
    if (userError) throw userError;

    // 同样忽略大小写进行匹配
    const targetUser = users.find(u => u.email?.toLowerCase() === safeEmail);
    if (!targetUser) {
      return NextResponse.json({ error: 'USER_NOT_FOUND // 核心矩阵中未找到该生命体' }, { status: 404 });
    }

// 3. 动用上帝权限，强制覆写该用户的密码，并强制激活账号！
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(
      targetUser.id,
      { 
        password: newPassword,
        email_confirm: true // 🛠️ 关键破局点：强制解除未验证邮箱的封印！
      }
    );

    if (updateError) throw updateError;

    // 4. 用完即毁：从 Redis 中删除安全码
    await redis.del(`pwd_reset:${safeEmail}`);

    return NextResponse.json({ 
      success: true, 
      message: 'GENE_LOCK_UPDATED // 基因锁重置成功，请使用新密码重新入世。' 
    });

  } catch (error: any) {
    console.error("Verify Error:", error);
    return NextResponse.json({ error: `SYSTEM_ERROR // ${error.message}` }, { status: 500 });
  }
}