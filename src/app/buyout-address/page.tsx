"use client";

import React, { useEffect, useState } from 'react';

export default function AddressBuyout() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* 物理网格与动态光晕背景 (承袭桃花源UI风格) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 sm:py-32">
        
        {/* 页面头部区域 */}
        <header className="mb-24 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-emerald-500/30 bg-emerald-500/10 rounded-full">
            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase">
              Space² Digital Territory Buyout
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-emerald-100 to-gray-400">
            赛博版图买断计划
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-mono tracking-widest max-w-2xl mx-auto leading-relaxed">
            抢占硅基世界的专属物理坐标与空间主权。当硬件参数的内卷走到尽头，数字领地将成为大模型与具身智能的绝对护城河。
          </p>
        </header>

        <div className="space-y-32">
          
          {/* Section 1: 前言 */}
          <section className="relative border-l border-emerald-500/30 pl-8 ml-4 sm:ml-0">
            <div className="absolute -left-[5px] top-0 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
            <h2 className="text-xl font-bold mb-6 flex items-center text-gray-200">
              <span className="text-emerald-500 mr-3 font-mono">01.</span> 
              户籍危机与主权确权
            </h2>
            <div className="prose prose-invert max-w-none text-gray-400 font-mono text-sm leading-relaxed">
              <p>
                当企业的战略不再局限于销售几万台设备，而是要在全球乃至星际网络部署数以亿计的 AI 伴侣；当具身机器人矩阵即将进入千家万户、接管未来的全自动化工业生产线……企业面临的最高维度瓶颈，不再是单纯的算力堆砌，而是 <strong className="text-emerald-400 font-normal">“赛博人口的户籍危机与主权确权”</strong>。
              </p>
              <p className="mt-4">
                在桃花源世界模型（MYTH）的宏大宇宙中，我们正式向全球 B 端品牌厂商、智能体平台及具身智能巨头开放地址买断服务。
              </p>
            </div>
          </section>

          {/* Section 2: 三段式买断 (品牌专属) */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent border border-emerald-500/20 rounded-2xl transform transition-transform group-hover:scale-[1.01] duration-500" />
            <div className="relative p-8 sm:p-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="text-xs font-mono text-amber-500 tracking-widest mb-4">[ LEVEL 3 BUYOUT ]</div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">品牌专属三段式地址编码</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-mono mb-6">
                    为你的 AI 产品买下一片足以容纳 890 万硅基大军的专属领地。三段式地址是你在新大陆上的“专属军区代号”。
                  </p>
                  <div className="bg-black/50 border border-white/5 p-4 rounded-lg font-mono text-xs text-gray-300 mb-6">
                    <span className="text-gray-500">FORMAT:</span> <span className="text-emerald-400">[L1 逻辑域]</span> - <span className="text-blue-400">[L2 方位码]</span> - <span className="text-amber-400">[L3 数字网格]</span><br/>
                    <span className="text-gray-500">EXAMPLE:</span> MOON - SW - 555
                  </div>
                  <ul className="space-y-3 font-mono text-sm text-gray-400">
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">▶</span> 
                      <span>向下兼容指数级容量：<strong className="text-gray-200 font-normal">999个L4空间 × 999个房间 × 9个单元 = 8,982,009 个物理容器</strong>。</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-emerald-500 mr-2">▶</span> 
                      绝对冠名权与子网格分配权，出厂智能体打上品牌专属烙印。
                    </li>
                  </ul>
                </div>
                <div className="md:w-64 shrink-0 flex flex-col justify-center items-center p-6 border border-white/10 bg-white/[0.02] rounded-xl">
                  <div className="text-xs text-gray-500 font-mono mb-2">买断买断费 / GRID</div>
                  <div className="text-3xl font-bold text-emerald-400 mb-1">¥ 1,000</div>
                  <div className="text-[10px] text-gray-500 tracking-widest mt-4 text-center">基础网格定价<br/>终身主权归属</div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: 二段式超级买断 (生态巨头专属) */}
          <section className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/20 rounded-2xl transform transition-transform group-hover:scale-[1.01] duration-500" />
            <div className="relative p-8 sm:p-12">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                <div className="flex-1">
                  <div className="text-xs font-mono text-amber-500 tracking-widest mb-4">[ LEVEL 2 SUPER BUYOUT ]</div>
                  <h3 className="text-2xl font-bold text-gray-100 mb-4">二段式大区超级买断</h3>
                  <p className="text-sm text-gray-400 leading-relaxed font-mono mb-6">
                    针对全球顶尖智能体平台与 AGI 基础设施构建者。一次性独占整片“星辰大海”，获取大区级主权垄断。
                  </p>
                  <div className="bg-black/50 border border-white/5 p-4 rounded-lg font-mono text-xs text-gray-300 mb-6">
                    <span className="text-gray-500">FORMAT:</span> <span className="text-emerald-400">[L1 逻辑域]</span> - <span className="text-blue-400">[L2 方位码]</span><br/>
                    <span className="text-gray-500">EXAMPLE:</span> MARS - NW (火星域-西北方)
                  </div>
                  <ul className="space-y-3 font-mono text-sm text-gray-400">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">▶</span> 
                      <span>打包该大区方向内全部 <strong className="text-gray-200 font-normal">999 个连续的 L3 三段式网格资产 (001-999)</strong>。</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">▶</span> 
                      <span>掌控近 <strong className="text-gray-200 font-normal">89亿</strong> 个赛博物理空间的法理主权，单设备数字地契授权成本摊薄至尘埃级。</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">▶</span> 
                      构建全封闭的私有智能体城池，或作为 PaaS 平台进行二次拆分授权。
                    </li>
                  </ul>
                </div>
                <div className="md:w-64 shrink-0 flex flex-col justify-center items-center p-6 border border-white/10 bg-white/[0.02] rounded-xl">
                  <div className="text-xs text-gray-500 font-mono mb-2">大区垄断总价 / REGION</div>
                  <div className="text-3xl font-bold text-blue-400 mb-1">¥ 99.9 万</div>
                  <div className="text-[10px] text-gray-500 tracking-widest mt-4 text-center text-mono">
                    1000元 × 999个网格<br/>排他性法理确权
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: 绝对红线 */}
          <section className="border border-red-900/30 bg-red-950/10 p-8 rounded-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600/50" />
            <h3 className="text-lg font-bold text-gray-200 mb-4 flex items-center">
              <span className="text-red-500 mr-2">⚠️</span> 
              大区买断绝对准入红线
            </h3>
            <p className="text-sm text-gray-400 font-mono leading-relaxed">
              <strong className="text-red-400 font-normal">CN（中央区域）绝对不可买断原则：</strong> 所有八大逻辑域下的 CN（中央方位码）大区均属于公共数字基础设施。为保障公共通道的法理完整性，所有逻辑域的 CN 大区均不接受二段式超级买断。
            </p>
          </section>

          {/* Section 5: 商业联络 (唯一CTA) */}
          <section className="text-center pt-12">
            <div className="inline-flex flex-col items-center justify-center p-10 border border-emerald-500/20 bg-emerald-950/10 rounded-2xl w-full max-w-2xl mx-auto shadow-[0_0_30px_rgba(16,185,129,0.05)]">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2 tracking-widest">启动主权确权</h3>
              <p className="text-sm text-gray-400 font-mono mb-8">
                获取“数字领地”完整白皮书，或发起专属区位勘测与认购，请联系桃花源空间调度中心。
              </p>
              
              <div className="bg-black/60 border border-emerald-500/30 px-8 py-4 rounded-lg flex items-center gap-4">
                <span className="text-xs text-emerald-500 font-mono uppercase tracking-widest border-r border-emerald-500/30 pr-4">业务专属联络</span>
                <a href="mailto:xiangmiles@gmail.com" className="text-lg font-mono text-gray-200 hover:text-emerald-400 transition-colors">
                  xiangmiles@gmail.com
                </a>
              </div>
            </div>
          </section>

        </div>
      </div>

      {/* 页脚 */}
      <footer className="relative z-10 py-16 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-[0.4em] bg-black">
        <div className="max-w-7xl mx-auto px-8">
          <p className="mb-4 text-emerald-900">S2-SWM: TERRITORY BUYOUT | PROTOCOL_V2.0</p>
          <p>© 2026 TAOHUAYUAN WORLD MODEL. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>

    </div>
  );
}
