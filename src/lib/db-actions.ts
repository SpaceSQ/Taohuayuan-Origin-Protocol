// src/lib/db-actions.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

/**
 * 获取当前大区已注册的智能体总数
 * (真实环境下从 Supabase 获取，无配置时提供模拟数据以便本地测试)
 */
export const getGlobalAgentCount = async (l2Orientation: string): Promise<number> => {
  try {
    const supabase = createClientComponentClient();
    // 真实查库逻辑
    const { count, error } = await supabase
      .from('citizens')
      .select('*', { count: 'exact', head: true })
      .eq('suns_address.ilike', `META-${l2Orientation}-%`);

    if (error) {
      console.warn("Supabase connection missing or error, using mock data:", error.message);
      return Math.floor(Math.random() * 50); // 降级：返回 0-50 的随机数
    }
    
    return count || 0;
  } catch (e) {
    console.warn("Supabase client not initialized, using mock data.");
    return Math.floor(Math.random() * 50); // 降级返回
  }
};