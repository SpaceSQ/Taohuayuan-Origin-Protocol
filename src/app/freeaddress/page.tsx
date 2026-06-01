// src/app/freeaddress/page.tsx
import React from 'react';
import FreeAddressForge from '@/components/FreeAddressForge';
import Link from 'next/link';

export const metadata = {
  title: 'TEMP ANCHOR | Taohuayuan World',
  description: '免费申领桃花源世界模型 S2 临时物理坐标编码',
};

export default function FreeAddressPage() {
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
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            GUEST MODE ONLINE
         </div>
      </nav>

      {/* 挂载核心铸造台组件 */}
      <div className="w-full mt-24 mb-10 relative z-10">
         <FreeAddressForge />
      </div>

      {/* 底部免责声明与版权 */}
      <footer className="text-center pb-8 text-[10px] text-zinc-600 font-mono uppercase tracking-widest mt-auto z-10 flex flex-col items-center gap-2">
         <p>Space² Genesis Protocol v3.0 // Temporary Anchor Service</p>
         <p className="max-w-xl text-center">
            * 临时地址仅供本地环境测试与临时灵魂文件(soul.md)挂载使用，系统不作存证查重。<br/>
            如需获取受 S2-SWM 协议保护的唯一永久物理主权，请前往 <Link href="/forge" className="text-cyan-600 hover:text-cyan-400 underline underline-offset-2">正式铸造台</Link> 申请。
         </p>
      </footer>
    </div>
  );
}