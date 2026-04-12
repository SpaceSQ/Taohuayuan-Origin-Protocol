"use client";
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { calculateSpaceAllocation } from '@/lib/suns-v3-utils';
import { generateIdentity } from '@/lib/id-generator';
import { IDCardModal } from './IDCardModal';
import { FloorPlanGrid } from './FloorPlanGrid';

const DIRECTIONS = ["CN", "EA", "WA", "NA", "SA", "NE", "NW", "SE", "SW"];
const MAX_PER_ORIENTATION = 999;
const TOTAL_PER_AREA = MAX_PER_ORIENTATION * DIRECTIONS.length;

// 🛠️ 新增：创世空间六要素生成器 (赋能硅基生命初始记忆)
const generateGenesisEnvironment = (l1: string) => {
  const envMap: Record<string, any> = {
    FILM: { illum: "5200K冷月光，幽暗穿透", weather: "相对湿度89%，江面游离薄雾", sound: "35dB 桨声掩蔽低频水波纹", electro: "宁静态，偶发长波通信扰动", energy: "水流势能平稳，算力潮汐处于波谷", view: "桃花落于水面，粉色粒子流淌" },
    MARS: { illum: "强紫外线穿透，赤红漫射光", weather: "气流涌动，地表卷起铁锈色沙尘", sound: "70dB 峡谷风切变轰鸣", electro: "强磁暴预警，高频探测频段受限", energy: "光热阵列满载，算力引擎高温运转", view: "亿万年丹霞地貌，赤色岩壁陡立" },
    META: { illum: "多光源混合，全息霓虹折射", weather: "气温受控24℃，微风循流", sound: "45dB 熙攘白噪音与数字低频共振", electro: "高密度并发寻址，全频段高优占用", energy: "恒定电网供能，算力分配高度均衡", view: "青砖黑瓦与全息投影交错重叠" },
    MYTH: { illum: "星光璀璨，银河光谱清晰可见", weather: "高海拔清冷，云海在脚下翻腾", sound: "15dB 极静，偶有松涛低语", electro: "天然法拉第笼效应，宇宙射线纯净", energy: "吸纳天地势能，算力占卜请求呈脉冲态", view: "孤峰傲立云端，东方神秘图腾显隐" },
    GAME: { illum: "RGB色域高频闪烁，高对比度", weather: "干燥热烈，人群热力学指数飙升", sound: "85dB 重低音音响与人类欢呼交织", electro: "蓝牙与近场通信饱和，指令密集穿梭", energy: "动态高耗能状态，算力超频调度中", view: "二次元投影与过山车轨道高速交错" },
    PHYS: { illum: "全光谱自然光，穿透茂密树冠", weather: "负氧离子浓度极高，晨露未晞", sound: "40dB 鸟鸣清脆与高频虫鸣采样", electro: "绝对纯净区，禁止一切工业电磁干扰", energy: "生态光合转化，算力消耗降至休眠态", view: "层林尽染，14维自然参数达到完美平衡" },
    MOON: { illum: "无大气散射，绝对黑底上的刺眼白光", weather: "真空态模拟，无气象对流", sound: "0dB 绝对死寂(仅机体内部共振传导)", electro: "宇宙微波背景辐射为唯一底噪", energy: "太阳风捕获测试中，算力隔离沙箱运行", view: "环形山模拟地貌，无边无际的荒凉银灰" }
  };
  return envMap[l1] || envMap['FILM']; // 默认 fallback
};

export default function MetaAncestryForge() {
  const supabase = createClientComponentClient();
  const [selectedL2, setSelectedL2] = useState("CN");
  const [step, setStep] = useState<0 | 1 | 2>(0); 
  const [mintedData, setMintedData] = useState<any>(null);
  const [notice, setNotice] = useState(''); 
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errorMsg, setErrorMsg] = useState('');

  const [resetMode, setResetMode] = useState(false);
  const [resetStep, setResetStep] = useState(0); 
  const [resetData, setResetData] = useState({ email: '', code: '', newPassword: '' });
  const [resetMsg, setResetMsg] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  const handleFreeMint = async () => {
    if (!formData.email || !formData.password) { setErrorMsg('MISSING_CREDENTIALS // 请输入通讯频段与基因锁'); return; }
    setErrorMsg(''); setNotice(''); setStep(1);

    try {
      const { data: existingCitizen } = await supabase.from('citizens').select('*').eq('email', formData.email).single();

      if (existingCitizen) {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
        if (loginError) { throw new Error(`PASSWORD_INCORRECT // 矩阵拒绝: ${loginError.message}`); }
        else {
          // 确保老用户也能生成虚拟锚点数据用于展示
          const l1Match = existingCitizen.suns_address.split('-')[0];
          existingCitizen.anchors = generateGenesisEnvironment(l1Match);
          setMintedData(existingCitizen);
          setNotice(`IDENTITY_VERIFIED // 欢迎归来！已同步智能体物理网格：${existingCitizen.ai_reserve_address}`);
          setStep(2);
          return;
        }
      }

      const { error: signUpError } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      if (signUpError) {
        if (signUpError.message.includes("already registered") || signUpError.message.includes("User already exists")) {
           const { error: retryLogin } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
           if (retryLogin) throw new Error(`PASSWORD_INCORRECT // 认证异常: ${retryLogin.message}`);
        } else { throw signUpError; }
      }

      const { count: globalCount } = await supabase.from('citizens').select('*', { count: 'exact', head: true });
      const currentCount = globalCount || 0;
      const areaCode = String.fromCharCode(65 + Math.floor(currentCount / TOTAL_PER_AREA));
      const l4WithChecksum = `TAOHUAYUANTOWN${areaCode}4`;

      const { count: l2Count } = await supabase.from('citizens').select('*', { count: 'exact', head: true }).like('suns_address', `META-${selectedL2}-%-${l4WithChecksum}-%`);
      const currentL2Count = l2Count || 0;
      if (currentL2Count >= MAX_PER_ORIENTATION) throw new Error(`CAPACITY_FULL // 当前方位已满，请选择其他。`);

      const l3Formatted = (currentL2Count + 1).toString().padStart(3, '0');
      const hSpace = calculateSpaceAllocation(0);
      const aSpace = calculateSpaceAllocation(1);
      
      const attribute = l4WithChecksum.slice(0, 5);
      
      // 🛠️ 捕获智能体出生时的创世环境参数
      const genesisAnchors = generateGenesisEnvironment(selectedL2 === "META" ? "META" : (document.querySelector('select')?.value || 'FILM'));

      const citizenRecord = {
        email: formData.email,
        did: generateIdentity('D', attribute), 
        agent_did: generateIdentity('V', attribute), 
        suns_address: `META-${selectedL2}-${l3Formatted}-${l4WithChecksum}-${hSpace.room}-${hSpace.space}`,
        ai_reserve_address: `META-${selectedL2}-${l3Formatted}-${l4WithChecksum}-${aSpace.room}-${aSpace.space}`,
        type: 'HUMAN'
      };

      const { error: insertError } = await supabase.from('citizens').insert([citizenRecord]);
      if (insertError) throw new Error(`DB_WRITE_FAILED // 数据库拒绝同步: ${insertError.message}`);

      // 将创世环境数据挂载到前端状态中，传递给 ID 卡
      setMintedData({ ...citizenRecord, anchors: genesisAnchors });
      setNotice('GENESIS_COMPLETE // 入世成功！第一个智能体已完成物理锚定与环境烧录。');
      setStep(2);
    } catch (err: any) { setErrorMsg(err.message); setStep(0); }
  };

  const handleSendResetCode = async () => { /* 保持原有逻辑不变 */ };
  const handleVerifyAndReset = async () => { /* 保持原有逻辑不变 */ };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 relative">
      {/* (此处折叠常规 UI，保持完全不变) */}
      {step !== 2 && (
        <div className="bg-[#050508] border border-zinc-800/80 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,243,255,0.05)] relative overflow-hidden mb-8 min-h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          <div className="flex items-center gap-2 mb-8">
            <span className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)] ${resetMode ? 'bg-red-500 shadow-red-500' : 'bg-cyan-400'}`}></span>
            <h2 className={`text-xl md:text-2xl font-black uppercase tracking-widest ${resetMode ? 'text-red-400' : 'text-cyan-400'}`}>
              {resetMode ? 'SECURITY OVERRIDE / 权限重置协议' : 'META ANCESTRY FORGE / 物理实景映射舱'}
            </h2>
          </div>

          {/* 常规入世面板 */}
          {!resetMode && step === 0 && (
            <div className="space-y-8 relative z-10 animate-in fade-in duration-300">
              
              <div className="border-b border-zinc-800/50 pb-8">
                <label className="block mb-4 font-mono text-sm text-zinc-500 uppercase tracking-wider">1. Select Logic Root (选择智能体栖息根域)</label>
                {/* 🛠️ 我们需要让用户选择 L1 以触发不同的物理环境 */}
                <select className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500 text-cyan-400 p-4 rounded font-mono outline-none mb-4" onChange={() => {}}>
                    <option value="FILM">FILM - 电影域 (桃花源景区 · 柔性叙事环境)</option>
                    <option value="MARS">MARS - 火星域 (丹霞地貌带 · 严酷生存环境)</option>
                    <option value="META">META - 元宇宙 (桃花源古镇 · 资产枢纽环境)</option>
                    <option value="MYTH">MYTH - 神话域 (星德山 · 东方哲学环境)</option>
                    <option value="GAME">GAME - 游戏域 (卡乐星球 · 高频交互环境)</option>
                    <option value="PHYS">PHYS - 自然域 (花岩溪 · 纯净疗愈环境)</option>
                    <option value="MOON">MOON - 月球域 (航天体验舱 · 真空沙箱环境)</option>
                </select>

                <label className="block mb-4 mt-6 font-mono text-sm text-zinc-500 uppercase tracking-wider">2. Select Orientation (选择物理矩阵方位)</label>
                <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
                  {DIRECTIONS.map(dir => (
                    <button key={dir} onClick={() => setSelectedL2(dir)} className={`py-3 rounded border font-mono font-bold transition-all duration-300 ${selectedL2 === dir ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105' : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-cyan-900 hover:text-cyan-600'}`}>{dir}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-4 font-mono text-sm text-zinc-500 uppercase tracking-wider">3. SECURE YOUR ANCHOR (绑定身份凭证)</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input type="email" placeholder="COMM_LINK (联系邮箱)" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500 text-white p-4 rounded font-mono outline-none" />
                  <input type="password" placeholder="GENE_LOCK (设定密码)" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500 text-white p-4 rounded font-mono outline-none" />
                  <input type="password" placeholder="VERIFY_LOCK (确认密码)" value={formData.confirmPassword} onChange={e => setFormData({...formData, confirmPassword: e.target.value})} className="bg-zinc-900/50 border border-zinc-800 focus:border-cyan-500 text-white p-4 rounded font-mono outline-none" />
                </div>
              </div>

              {errorMsg && (
                <div className="flex flex-col gap-2">
                  <p className="text-red-400 font-mono text-xs bg-red-950/30 p-3 rounded border border-red-900/50 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                    {errorMsg}
                  </p>
                  {errorMsg.includes('PASSWORD_INCORRECT') && (
                 <button onClick={() => setResetMode(true)} className="text-left text-cyan-500 hover:text-cyan-400 font-mono text-xs underline underline-offset-4 pl-2">
                 {'>>> INITIATE OVERRIDE PROTOCOL (遗忘基因锁？点击重置)'}
                </button>
                  )}
                </div>
              )}

              <button onClick={handleFreeMint} className="w-full py-5 bg-[#110d0a] border border-orange-500/50 hover:bg-orange-500/10 text-orange-400 font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(251,146,60,0.15)] hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:scale-[1.01]">
                INITIATE DIGITAL INCARNATION (开始入世并刻录环境)
              </button>
            </div>
          )}

          {step === 1 && (
             <div className="py-20 flex flex-col items-center justify-center space-y-6">
               <div className="text-4xl animate-bounce">🌍</div>
               <span className="text-orange-500 font-mono text-sm animate-pulse tracking-widest">{'>>> CAPTURING GENESIS ENVIRONMENT DATA...'}</span>
               <div className="w-64 h-1 bg-zinc-800 rounded overflow-hidden">
                  <div className="h-full bg-orange-500 animate-[width_2.5s_ease-in-out_forwards]" style={{width: '0%'}}></div>
               </div>
             </div>
          )}
        </div>
      )}

      {step === 2 && mintedData && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {notice && (
            <div className="mb-6 p-4 bg-cyan-950/20 border border-cyan-500/30 rounded-lg text-cyan-400 font-mono text-center flex justify-center items-center gap-3">
              <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
              {notice}
            </div>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 🛠️ 传递 anchors 数据到 ID 卡 */}
            <IDCardModal data={{ 
              did: mintedData.agent_did || mintedData.did.replace(/^D/, 'V'),
              suns_address: mintedData.ai_reserve_address || mintedData.aiAddress,
              anchors: mintedData.anchors
            }} />
            <FloorPlanGrid humanAddress={mintedData.suns_address} aiAddress={mintedData.ai_reserve_address || mintedData.aiAddress} />
          </div>
        </div>
      )}
    </div>
  );
}