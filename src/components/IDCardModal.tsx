// src/components/IDCardModal.tsx
"use client";
import React, { useRef, useState } from 'react';

interface IDCardProps {
  data: {
    did: string;
    suns_address: string;
  };
}

export const IDCardModal = ({ data }: IDCardProps) => {
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      const svgElement = cardRef.current?.querySelector('svg');
      if (svgElement) {
        const serializer = new XMLSerializer();
        const source = serializer.serializeToString(svgElement);
        const svgBlob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `TAOHUAYUAN_DID_${data.did}.svg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
      setDownloading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="relative group" ref={cardRef}>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" className="w-full h-auto rounded-xl relative bg-[#09090b] shadow-2xl">
          {/* 背景与边框 */}
          <rect width="600" height="350" fill="#09090b" rx="12"/>
          <rect x="20" y="20" width="560" height="310" fill="none" stroke="#27272a" strokeWidth="2" rx="8"/>
          
          {/* 头部 */}
          <text x="40" y="55" fill="#06b6d4" fontSize="18" fontFamily="monospace" fontWeight="bold">TAOHUAYUAN // S2-DID CITIZEN</text>
          <line x1="40" y1="75" x2="560" y2="75" stroke="#27272a" strokeWidth="2"/>

          {/* 身份核心数据 */}
          <text x="40" y="120" fill="#71717a" fontSize="12" fontFamily="monospace">DECENTRALIZED IDENTIFIER (数字身份编号)</text>
          <text x="40" y="155" fill="#ffffff" fontSize="28" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{data.did}</text>
          
          <text x="40" y="210" fill="#71717a" fontSize="12" fontFamily="monospace">SUNS PHYSICAL ANCHOR (物理空间锚点)</text>
          <text x="40" y="240" fill="#f97316" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{data.suns_address}</text>

          {/* 装饰元素 (条形码模拟) */}
          {/* 🛠️ 修正：条形码位置下移，从 y=210 下移至 y=280 */}
          <g transform="translate(420, 280)">
              {Array.from({length: 25}).map((_, i) => (
                <rect key={i} x={i * 5} y="0" width={i % 3 === 0 ? 3 : 1} height="30" fill="#3f3f46"/>
              ))}
          </g>

          {/* 底部信息 */}
          <rect x="40" y="295" width="80" height="24" fill="#18181b" rx="4"/>
          <text x="80" y="311" fill="#10b981" fontSize="12" fontFamily="monospace" textAnchor="middle">AWAKENED</text>
          <text x="560" y="311" fill="#52525b" fontSize="10" fontFamily="monospace" textAnchor="end">TAOHUAYUAN GENESIS PROTOCOL v1.1</text>
        </svg>
      </div>

      <button 
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-4 rounded-lg bg-[#1a1a1a] border border-cyan-900 text-cyan-400 font-black hover:bg-cyan-900/30 hover:border-cyan-500 transition-all text-sm flex items-center justify-center gap-2 tracking-widest"
      >
        {downloading ? 'GENERATING HD ASSET...' : '⬇ DOWNLOAD OFFICIAL ID CARD (下载高清身份卡)'}
      </button>
    </div>
  );
};