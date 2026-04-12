// src/app/forge/page.tsx
import React from 'react';
import MetaAncestryForge from '@/components/MetaAncestryForge';
import Link from 'next/link';

export const metadata = {
  title: 'INITIATE INCARNATION | Taohuayuan World',
  description: '免费申领桃花源古镇 S2-DID 身份与物理坐标',
};

export default function ForgePage() {
  return (
    <div className="min-h-screen bg-[#020617] relative flex flex-col items-center justify-center p-4 selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* 科技感网格背景层 */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }}></div>

      {/* 顶部极客导航 */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 max-w-7xl mx-auto">
         <Link href="/" className="text-xl font-black text-white tracking-widest hover:text-cyan-400 transition-colors">
            TAOHUAYUAN<span className="text-cyan-500">.WORLD</span>
         </Link>
         <div className="text-[10px] text-zinc-500 font-mono border border-zinc-800 bg-black/50 px-3 py-1 rounded flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SYSTEM ONLINE
         </div>
      </nav>

      {/* 挂载核心铸造台组件 */}
      <div className="w-full mt-24 mb-10 relative z-10">
         <MetaAncestryForge />
      </div>

      {/* 底部免责声明与版权 */}
      <footer className="text-center pb-8 text-[10px] text-zinc-600 font-mono uppercase tracking-widest mt-auto z-10">
         <p>Space² Genesis Protocol v3.0 // The Twin Seeds Matrix</p>
         <p className="mt-1">By participating, you agree to the Taohuayuan Incarnation Protocol.</p>
      </footer>
    </div>
  );
}