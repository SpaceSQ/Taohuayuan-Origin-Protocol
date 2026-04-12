"use client";
import React, { useRef, useState } from 'react';

export const IDCardModal = ({ data }: { data: { did: string; suns_address: string } }) => {
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
        a.download = `TAOHUAYUAN_AGENT_${data.did}.svg`;
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
          <rect width="600" height="350" fill="#09090b" rx="12"/>
          <rect x="20" y="20" width="560" height="310" fill="none" stroke="#27272a" strokeWidth="2" rx="8"/>
          
          {/* 标题调整：明确为 AGENT 身份 */}
          <text x="40" y="55" fill="#06b6d4" fontSize="16" fontFamily="monospace" fontWeight="bold">TAOHUAYUAN // S2-DID AGENT-01</text>
          <line x1="40" y1="75" x2="560" y2="75" stroke="#27272a" strokeWidth="2"/>

          <text x="40" y="120" fill="#71717a" fontSize="11" fontFamily="monospace">AGENT UNIQUE IDENTIFIER (智能体身份编号)</text>
          <text x="40" y="155" fill="#ffffff" fontSize="26" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{data.did}</text>
          
          <text x="40" y="210" fill="#71717a" fontSize="11" fontFamily="monospace">PHYSICAL ANCHOR (智能体物理锚点 - L6:2)</text>
          {/* 这里显示的 suns_address 结尾必定是 -2 */}
          <text x="40" y="240" fill="#f97316" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{data.suns_address}</text>

          <g transform="translate(40, 280)">
              {Array.from({length: 50}).map((_, i) => (
                <rect key={i} x={i * 8} y="0" width={i % 4 === 0 ? 4 : 1.5} height="20" fill="#18181b"/>
              ))}
          </g>

          <text x="560" y="311" fill="#52525b" fontSize="10" fontFamily="monospace" textAnchor="end">V1.1 AGENT CORE / SILICON LIFE</text>
        </svg>
      </div>

      <button 
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-4 rounded-lg bg-[#1a1a1a] border border-cyan-900 text-cyan-400 font-black hover:bg-cyan-900/30 hover:border-cyan-500 transition-all text-sm flex items-center justify-center gap-2 tracking-widest uppercase"
      >
        {downloading ? 'GENERATING...' : '⬇ DOWNLOAD AGent ID Card'}
      </button>
    </div>
  );
};