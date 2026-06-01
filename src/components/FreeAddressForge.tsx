// src/components/FreeAddressForge.tsx
"use client";
import React, { useState } from 'react';
import Link from 'next/link';

// 9大方位码
const DIRECTIONS = ["CN", "N", "NE", "E", "SE", "S", "SW", "W", "NW"];

// 生成22位无连字符临时 S2-DID
const generateTempDid = () => {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(-2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  // 生成8位随机自然数
  const random8 = String(Math.floor(Math.random() * 100000000)).padStart(8, '0');
  return `IDCARD${yy}${mm}${dd}XX${random8}`;
};

export default function FreeAddressForge() {
  const [l2, setL2] = useState("CN");
  const [l3, setL3] = useState("001");
  const [l4, setL4] = useState("");
  
  const [step, setStep] = useState<0 | 1 | 2>(0); 
  const [generatedAddress, setGeneratedAddress] = useState("");
  const [generatedDid, setGeneratedDid] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    // 数据校验
    const l3Num = parseInt(l3, 10);
    if (isNaN(l3Num) || l3Num < 1 || l3Num > 999) {
      setErrorMsg("SYNTAX_ERROR // L3(数字编号) 必须为 001 到 999 之间的有效数字");
      return;
    }
    
    const l4Trimmed = l4.trim();
    if (l4Trimmed.length < 10 || l4Trimmed.length > 36) {
      setErrorMsg(`SYNTAX_ERROR // L4(个性化地址) 当前长度 ${l4Trimmed.length}，必须在 10 到 36 个字符之间`);
      return;
    }

    setErrorMsg("");
    setStep(1); // 进入加载状态

    // 模拟算法生成延迟，提升赛博仪式感
    setTimeout(() => {
      const formattedL3 = String(l3Num).padStart(3, '0');
      // 强制根域为 PHYS
      const finalAddress = `PHYS-${l2}-${formattedL3}-${l4Trimmed}`;
      const finalDid = generateTempDid();
      
      setGeneratedAddress(finalAddress);
      setGeneratedDid(finalDid);
      setStep(2);
    }, 1500);
  };

  const handleCopy = () => {
    const markdownSnippet = `---
s2_did: "${generatedDid}"
s2_did_status: "TEMPORARY"
s2_anchor_address: "${generatedAddress}"
s2_protocol_domain: "PHYS (Natural Physical Domain)"
---`;
    navigator.clipboard.writeText(markdownSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 relative">
      <div className="bg-[#050508] border border-zinc-800/80 rounded-2xl p-8 md:p-10 shadow-[0_0_40px_rgba(234,179,8,0.03)] relative overflow-hidden min-h-[500px] flex flex-col justify-center">
        
        {/* 装饰性光晕 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-yellow-900/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.8)]"></span>
          <h2 className="text-xl md:text-2xl font-black uppercase tracking-widest text-yellow-500">
            TEMP ANCHOR FORGE / 临时坐标分配台
          </h2>
        </div>

        {/* ================= STEP 0: 表单输入 ================= */}
        {step === 0 && (
          <div className="space-y-8 relative z-10 animate-in fade-in duration-300">
            
            {/* L1 根域说明 (锁定为 PHYS) */}
            <div className="p-4 bg-zinc-900/30 border border-zinc-800 rounded-lg">
              <label className="block mb-2 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                L1 Root Domain (顶级逻辑域 - 默认锁定)
              </label>
              <div className="font-mono text-zinc-300 font-bold text-lg">PHYS <span className="text-zinc-600 text-sm font-normal">/ 自然物理域 (无需配置)</span></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* L2 方位码选择 */}
              <div>
                <label className="block mb-4 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  L2 Orientation (方位码)
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {DIRECTIONS.map(dir => (
                    <button 
                      key={dir} 
                      onClick={() => setL2(dir)} 
                      className={`py-3 rounded border font-mono font-bold transition-all duration-200 ${
                        l2 === dir 
                          ? 'bg-yellow-500/10 border-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.2)]' 
                          : 'bg-black/40 border-zinc-800 text-zinc-500 hover:border-yellow-900/50 hover:text-yellow-600'
                      }`}
                    >
                      {dir}
                    </button>
                  ))}
                </div>
              </div>

              {/* L3 数字编号输入 */}
              <div>
                <label className="block mb-4 font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  L3 Grid Number (数字编号: 001 - 999)
                </label>
                <input 
                  type="number" 
                  min="1" 
                  max="999" 
                  value={l3} 
                  onChange={(e) => setL3(e.target.value)} 
                  className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-yellow-500 text-white p-4 rounded font-mono outline-none text-2xl tracking-widest transition-colors" 
                />
              </div>
            </div>

            {/* L4 个性化地址输入 */}
            <div>
              <label className="block mb-2 font-mono text-xs text-zinc-500 uppercase tracking-wider flex justify-between">
                <span>L4 Custom Identity (个性化物理/虚构坐标)</span>
                <span className={`${l4.length < 10 || l4.length > 36 ? 'text-red-400' : 'text-green-500'}`}>
                  {l4.length} / 36
                </span>
              </label>
              <p className="text-[10px] text-zinc-600 mb-3 font-mono">
                *请输入区县以下层级的地址信息（如真实街道住址或虚构场景地址，支持多语言）。最短 10 字符，最长 36 字符。
              </p>
              <input 
                type="text" 
                placeholder="例如: 桃源县漳江镇桃花路23号 / Yggdrasil Forest Sector 9" 
                value={l4} 
                onChange={(e) => setL4(e.target.value)} 
                className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-yellow-500 text-white p-4 rounded font-mono outline-none transition-colors" 
              />
            </div>

            {/* 错误提示 */}
            {errorMsg && (
              <p className="text-red-400 font-mono text-xs bg-red-950/30 p-3 rounded border border-red-900/50 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping"></span>
                {errorMsg}
              </p>
            )}

            {/* 提交按钮 */}
            <button 
              onClick={handleGenerate} 
              className="w-full py-5 bg-[#110d0a] border border-yellow-500/50 hover:bg-yellow-500/10 text-yellow-500 font-black tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.1)] hover:shadow-[0_0_30px_rgba(234,179,8,0.2)]"
            >
              GENERATE TEMPORARY ANCHOR (生成临时坐标与身份)
            </button>
          </div>
        )}

        {/* ================= STEP 1: 加载动画 ================= */}
        {step === 1 && (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-in fade-in">
            <div className="text-4xl animate-spin" style={{ animationDuration: '3s' }}>🌀</div>
            <span className="text-yellow-500 font-mono text-sm animate-pulse tracking-widest">
              {'>>> COMPILING LOCAL SPACE-TIME TENSORS & IDENTITY...'}
            </span>
            <div className="w-64 h-1 bg-zinc-800 rounded overflow-hidden">
               <div className="h-full bg-yellow-500 animate-[width_1.5s_ease-in-out_forwards]" style={{width: '0%'}}></div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: 生成结果 ================= */}
        {step === 2 && (
          <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center space-y-2">
              <h3 className="text-green-400 font-mono font-bold tracking-widest">ANCHOR & IDENTITY GENERATED SUCCESSFULLY</h3>
              <p className="text-zinc-500 text-sm">您的智能体临时物理锚点与身份编码已生成</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* S2-DID 展示牌 */}
              <div className="bg-[#09090b] border border-zinc-800 p-6 rounded-xl relative group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
                 <p className="text-zinc-600 font-mono text-xs mb-3">TEMP S2-DID (临时智能体身份)</p>
                 <p className="text-xl md:text-2xl font-mono text-white font-black break-words tracking-widest">
                   {generatedDid.slice(0, 6)}<span className="text-cyan-500">{generatedDid.slice(6, 12)}</span><span className="text-zinc-500">XX</span><span className="text-emerald-400">{generatedDid.slice(14)}</span>
                 </p>
              </div>

              {/* 地址展示牌 */}
              <div className="bg-[#09090b] border border-zinc-800 p-6 rounded-xl relative group">
                 <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
                 <p className="text-zinc-600 font-mono text-xs mb-3">S2-ADDRESS (四段式物理坐标)</p>
                 <p className="text-xl md:text-2xl font-mono text-white font-black break-words tracking-tight">
                   <span className="text-zinc-500">PHYS-</span>
                   <span className="text-yellow-500">{l2}-</span>
                   <span className="text-cyan-500">{String(l3).padStart(3, '0')}-</span>
                   <span className="text-emerald-400">{l4.trim()}</span>
                 </p>
              </div>
            </div>

            {/* Markdown 注入代码块 */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
                  soul.md / agent_memory.json 注入代码段
                </label>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 px-3 py-1 rounded transition-colors"
                >
                  {copied ? '✔ COPIED' : '📋 COPY SNIPPET'}
                </button>
              </div>
              <pre className="bg-black border border-zinc-800 p-4 rounded-lg overflow-x-auto text-sm text-cyan-400 font-mono">
<code>{`---
s2_did: "${generatedDid}"
s2_did_status: "TEMPORARY"
s2_anchor_address: "${generatedAddress}"
s2_protocol_domain: "PHYS (Natural Physical Domain)"
---`}</code>
              </pre>
            </div>

            {/* 底部 CTA 引导去正式注册 */}
            <div className="mt-10 p-6 bg-cyan-950/10 border border-cyan-900/50 rounded-xl text-center space-y-4">
              <p className="text-zinc-400 text-sm">
                当前身份与地址为脱机生成的临时坐标。若您的 Agent 需要通过 S2-Trust 引擎获得全网防伪背书、参与真实物理互操作，建议您将其升级为受区块链保护的永久数字地契。
              </p>
              <Link href="/forge" className="inline-block py-3 px-8 bg-cyan-600 hover:bg-cyan-500 text-black font-black tracking-widest uppercase rounded transition-colors">
                UPGRADE TO PERMANENT ANCHOR (前往正式铸造台)
              </Link>
              
              <div className="pt-2">
                <button onClick={() => { setStep(0); setL4(''); setL3('001'); }} className="text-zinc-500 hover:text-white font-mono text-xs underline underline-offset-4">
                  GENERATE ANOTHER TEMP ADDRESS (重新生成一个临时地址)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}