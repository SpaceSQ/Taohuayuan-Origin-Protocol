"use client";
import React, { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { calculateSpaceAllocation } from '@/lib/suns-v3-utils';
import { generateIdentity } from '@/lib/id-generator';
import { IDCardModal } from './IDCardModal';
import { FloorPlanGrid } from './FloorPlanGrid';

const DIRECTIONS = ["CN", "EA", "WA", "NA", "SA", "NE", "NW", "SE", "SW"];
const MAX_PER_ORIENTATION = 999;
const TOTAL_PER_AREA = MAX_PER_ORIENTATION * DIRECTIONS.length; // 8991

export default function MetaAncestryForge() {
  const supabase = createClientComponentClient();
  const [selectedL2, setSelectedL2] = useState("CN");
  const [step, setStep] = useState<0 | 1 | 2>(0); 
  const [mintedData, setMintedData] = useState<any>(null);
  const [notice, setNotice] = useState(''); 
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // 🛠️ 新增：重置密码专属状态
  const [resetMode, setResetMode] = useState(false);
  const [resetStep, setResetStep] = useState(0); // 0: 发送验证码, 1: 输入验证码和新密码
  const [resetData, setResetData] = useState({ email: '', code: '', newPassword: '' });
  const [resetMsg, setResetMsg] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  // 原有的入世铸造逻辑
  const handleFreeMint = async () => {
    if (!formData.email || !formData.password) {
      setErrorMsg('MISSING_CREDENTIALS // 请输入通讯频段与基因锁');
      return;
    }
    setErrorMsg(''); setNotice(''); setStep(1);

    try {
      const { data: existingCitizen } = await supabase.from('citizens').select('*').eq('email', formData.email).single();

      if (existingCitizen) {
        const { error: loginError } = await supabase.auth.signInWithPassword({ email: formData.email, password: formData.password });
if (loginError) {
          // 将真实的报错信息接在后面，如果是邮箱未验证，你一眼就能看出来
          throw new Error(`PASSWORD_INCORRECT // 矩阵拒绝: ${loginError.message}`);
        } else {
          setMintedData(existingCitizen);
          setNotice(`IDENTITY_VERIFIED // 欢迎归来！您已成功激活物理网格：${existingCitizen.suns_address}`);
          setStep(2);
          return;
        }
      }

      const { error: signUpError } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      if (signUpError) {
        if (signUpError.message.includes("already registered") || signUpError.message.includes("User already exists")) {
           const { error: retryLogin } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
           });
           if (retryLogin) throw new Error(`PASSWORD_INCORRECT // 认证异常: ${retryLogin.message}`);
        } else {
           throw signUpError;
        }
      }

      const { count: globalCount } = await supabase.from('citizens').select('*', { count: 'exact', head: true });
      const currentCount = globalCount || 0;
      const areaCode = String.fromCharCode(65 + Math.floor(currentCount / TOTAL_PER_AREA));
      const l4WithChecksum = `TAOHUAYUANTOWN${areaCode}4`;

      const { count: l2Count } = await supabase.from('citizens').select('*', { count: 'exact', head: true }).like('suns_address', `META-${selectedL2}-%-${l4WithChecksum}-%`);
      const currentL2Count = l2Count || 0;
      if (currentL2Count >= MAX_PER_ORIENTATION) throw new Error(`CAPACITY_FULL // 当前 ${areaCode} 区 ${selectedL2} 方位已满，请选择其他。`);

      const l3Formatted = (currentL2Count + 1).toString().padStart(3, '0');
      const hSpace = calculateSpaceAllocation(0);
      const aSpace = calculateSpaceAllocation(1);
      
      const citizenRecord = {
        email: formData.email,
        did: generateIdentity('D', l4WithChecksum.slice(0, 5)),
        suns_address: `META-${selectedL2}-${l3Formatted}-${l4WithChecksum}-${hSpace.room}-${hSpace.space}`,
        ai_reserve_address: `META-${selectedL2}-${l3Formatted}-${l4WithChecksum}-${aSpace.room}-${aSpace.space}`,
        type: 'HUMAN'
      };

      const { error: insertError } = await supabase.from('citizens').insert([citizenRecord]);
      if (insertError) throw new Error(`DB_WRITE_FAILED // 数据库拒绝同步: ${insertError.message}`);

      setMintedData(citizenRecord);
      setNotice('GENESIS_COMPLETE // 入世成功！您的赛博祖籍已永久锚定。');
      setStep(2);
    } catch (err: any) {
      setErrorMsg(err.message);
      setStep(0);
    }
  };

  // 🛠️ 新增：发送重置安全码
  const handleSendResetCode = async () => {
    if (!resetData.email) { setResetMsg('请输入您的通讯频段(邮箱)'); return; }
    setIsResetting(true); setResetMsg('正在请求超空间传输...');
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST', body: JSON.stringify({ email: resetData.email })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResetMsg('传输成功！8位安全码已发送至邮箱。');
      setResetStep(1); // 进入填验证码的步骤
    } catch (error: any) {
      setResetMsg(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  // 🛠️ 新增：核对验证码并重置
  const handleVerifyAndReset = async () => {
    if (!resetData.code || !resetData.newPassword) { setResetMsg('安全码与新基因锁不能为空'); return; }
    setIsResetting(true); setResetMsg('正在重写底层权限...');
    try {
      const res = await fetch('/api/auth/verify-reset', {
        method: 'POST', body: JSON.stringify(resetData)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      // 成功后，自动退回主界面，并帮用户填好邮箱和新密码
      setResetMsg('重写成功！矩阵已重启。');
      setTimeout(() => {
        setFormData({ ...formData, email: resetData.email, password: resetData.newPassword, confirmPassword: resetData.newPassword });
        setResetMode(false);
        setResetStep(0);
        setResetData({ email: '', code: '', newPassword: '' });
      }, 2000);
    } catch (error: any) {
      setResetMsg(error.message);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 relative">
      {step !== 2 && (
        <div className="bg-[#050508] border border-zinc-800/80 rounded-2xl p-8 shadow-[0_0_40px_rgba(0,243,255,0.05)] relative overflow-hidden mb-8 min-h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

          <div className="flex items-center gap-2 mb-8">
            <span className={`w-3 h-3 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)] ${resetMode ? 'bg-red-500 shadow-red-500' : 'bg-cyan-400'}`}></span>
            <h2 className={`text-xl md:text-2xl font-black uppercase tracking-widest ${resetMode ? 'text-red-400' : 'text-cyan-400'}`}>
              {resetMode ? 'SECURITY OVERRIDE / 权限重置协议' : 'META ANCESTRY FORGE / 物理实景映射舱'}
            </h2>
          </div>

          {/* 🔴 重置密码面板 (Reset Mode) */}
          {resetMode && step === 0 && (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300 relative z-10 max-w-lg">
              <p className="text-zinc-400 font-mono text-sm border-l-2 border-red-500 pl-3">
                警告：您正在启动最高级别的基因锁覆写协议。请验证您的通讯频段。
              </p>
              
              {resetStep === 0 && (
                <>
                  <input type="email" placeholder="输入已绑定的邮箱 (COMM_LINK)" value={resetData.email} onChange={e => setResetData({...resetData, email: e.target.value})} className="w-full bg-zinc-900/50 border border-red-900/50 focus:border-red-500 text-white p-4 rounded font-mono outline-none" />
                  <button onClick={handleSendResetCode} disabled={isResetting} className="w-full py-4 bg-[#110d0a] border border-red-500/50 text-red-400 hover:bg-red-900/20 font-black tracking-widest rounded-xl transition-all">
                    {isResetting ? 'TRANSMITTING...' : 'REQUEST SECURE CODE (请求8位安全码)'}
                  </button>
                </>
              )}

              {resetStep === 1 && (
                <>
                  <input type="text" placeholder="输入8位安全码 (SECURE_CODE)" value={resetData.code} onChange={e => setResetData({...resetData, code: e.target.value})} className="w-full bg-zinc-900/50 border border-red-900/50 focus:border-red-500 text-red-400 p-4 rounded font-mono outline-none tracking-widest text-center text-xl" />
                  <input type="password" placeholder="设定新基因锁 (NEW_GENE_LOCK)" value={resetData.newPassword} onChange={e => setResetData({...resetData, newPassword: e.target.value})} className="w-full bg-zinc-900/50 border border-red-900/50 focus:border-red-500 text-white p-4 rounded font-mono outline-none" />
                  <button onClick={handleVerifyAndReset} disabled={isResetting} className="w-full py-4 bg-red-900/20 border border-red-500 text-red-400 hover:bg-red-500 hover:text-black font-black tracking-widest rounded-xl transition-all">
                    {isResetting ? 'OVERRIDING...' : 'CONFIRM OVERRIDE (确认重写矩阵)'}
                  </button>
                </>
              )}

              {resetMsg && <p className="text-red-400 font-mono text-xs">{resetMsg}</p>}

              <button onClick={() => {setResetMode(false); setResetStep(0); setResetMsg('');}} className="text-zinc-600 font-mono text-xs hover:text-white underline underline-offset-4 mt-4 block">
                [ ABORT ] 终止协议并返回主屏幕
              </button>
            </div>
          )}

          {/* 🟢 常规入世面板 (Normal Mode) */}
          {!resetMode && step === 0 && (
            <div className="space-y-8 relative z-10 animate-in fade-in duration-300">
              <div className="border-b border-zinc-800/50 pb-8">
                <label className="block mb-4 font-mono text-sm text-zinc-500 uppercase tracking-wider">1. Select Orientation (选择物理矩阵方位)</label>
                <div className="grid grid-cols-3 md:grid-cols-9 gap-3">
                  {DIRECTIONS.map(dir => (
                    <button key={dir} onClick={() => setSelectedL2(dir)} className={`py-3 rounded border font-mono font-bold transition-all duration-300 ${selectedL2 === dir ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] scale-105' : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-cyan-900 hover:text-cyan-600'}`}>{dir}</button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block mb-4 font-mono text-sm text-zinc-500 uppercase tracking-wider">2. SECURE YOUR ANCHOR (绑定身份凭证)</label>
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
                  {/* 🛠️ 关键按钮：触发找回密码 */}
                  {errorMsg.includes('PASSWORD_INCORRECT') && (
                 <button onClick={() => setResetMode(true)} className="text-left text-cyan-500 hover:text-cyan-400 font-mono text-xs underline underline-offset-4 pl-2">
                 {'>>> INITIATE OVERRIDE PROTOCOL (遗忘基因锁？点击重置)'}
                </button>
                  )}
                </div>
              )}

              <button onClick={handleFreeMint} className="w-full py-5 bg-[#110d0a] border border-orange-500/50 hover:bg-orange-500/10 text-orange-400 font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(251,146,60,0.15)] hover:shadow-[0_0_30px_rgba(251,146,60,0.3)] hover:scale-[1.01]">
                INITIATE DIGITAL INCARNATION (开始入世)
              </button>
            </div>
          )}

          {step === 1 && (
             <div className="py-20 flex flex-col items-center justify-center space-y-6">
               <div className="text-4xl animate-bounce">🦞</div>
               <span className="text-orange-500 font-mono text-sm animate-pulse tracking-widest">{'>>> EXECUTING GENESIS_PROTOCOL...'}</span>
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
            <IDCardModal data={{ did: mintedData.did, suns_address: mintedData.suns_address }} />
            <FloorPlanGrid humanAddress={mintedData.suns_address} aiAddress={mintedData.ai_reserve_address || mintedData.aiAddress} />
          </div>
        </div>
      )}
    </div>
  );
}