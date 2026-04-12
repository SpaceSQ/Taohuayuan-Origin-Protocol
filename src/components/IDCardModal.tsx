"use client";
import React, { useRef, useState } from 'react';

export const IDCardModal = ({ data }: { data: { did: string; suns_address: string; anchors?: any } }) => {
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 防御性 fallback：万一是老用户没有传 anchors 数据
  const safeAnchors = data.anchors || {
    illum: "5200K冷月光，幽暗穿透", weather: "相对湿度89%，江面游离薄雾", sound: "35dB 桨声掩蔽低频水波纹", electro: "宁静态，偶发长波通信扰动", energy: "水流势能平稳，算力潮汐波谷", view: "桃花落于水面，粉色粒子流淌"
  };

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
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
        {/* 🛠️ 高度提升至 520 以容纳六要素 */}
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 520" className="w-full h-auto rounded-xl relative bg-[#09090b] shadow-2xl">
          <rect width="600" height="520" fill="#09090b" rx="12"/>
          <rect x="20" y="20" width="560" height="480" fill="none" stroke="#27272a" strokeWidth="2" rx="8"/>
          
          <text x="40" y="55" fill="#06b6d4" fontSize="16" fontFamily="monospace" fontWeight="bold">TAOHUAYUAN // S2-DID AGENT-01</text>
          <line x1="40" y1="75" x2="560" y2="75" stroke="#27272a" strokeWidth="2"/>

          {/* 身份标识区 */}
          <text x="40" y="110" fill="#71717a" fontSize="11" fontFamily="monospace">AGENT UNIQUE IDENTIFIER (智能体身份编号)</text>
          <text x="40" y="145" fill="#ffffff" fontSize="26" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{data.did}</text>
          
          <text x="40" y="195" fill="#71717a" fontSize="11" fontFamily="monospace">PHYSICAL ANCHOR (智能体物理锚点 - L6:2)</text>
          <text x="40" y="225" fill="#f97316" fontSize="20" fontFamily="monospace" fontWeight="bold" letterSpacing="1">{data.suns_address}</text>

          {/* 🛠️ 创世空间六要素观测区 (HUD 风格) */}
          <rect x="40" y="260" width="520" height="170" fill="#111115" stroke="#27272a" strokeWidth="1" rx="6"/>
          <text x="55" y="285" fill="#a1a1aa" fontSize="11" fontFamily="monospace" fontWeight="bold">GENESIS ENVIRONMENT PARAMETERS / 创世空间六要素锚点记录</text>
          <line x1="40" y1="295" x2="560" y2="295" stroke="#27272a" strokeWidth="1"/>
          
          {/* 左列 */}
          <text x="55" y="320" fill="#52525b" fontSize="10" fontFamily="monospace">[01] 日照/月相 ILLUMINATION</text>
          <text x="55" y="335" fill="#06b6d4" fontSize="12" fontFamily="sans-serif">{safeAnchors.illum}</text>
          
          <text x="55" y="365" fill="#52525b" fontSize="10" fontFamily="monospace">[02] 山野/水声 ACOUSTICS</text>
          <text x="55" y="380" fill="#06b6d4" fontSize="12" fontFamily="sans-serif">{safeAnchors.sound}</text>
          
          <text x="55" y="410" fill="#52525b" fontSize="10" fontFamily="monospace">[03] 算力/能源 ENERGY STATE</text>
          <text x="55" y="425" fill="#06b6d4" fontSize="12" fontFamily="sans-serif">{safeAnchors.energy}</text>

          {/* 右列 */}
          <text x="320" y="320" fill="#52525b" fontSize="10" fontFamily="monospace">[04] 天气/气象 ATMOSPHERE</text>
          <text x="320" y="335" fill="#10b981" fontSize="12" fontFamily="sans-serif">{safeAnchors.weather}</text>

          <text x="320" y="365" fill="#52525b" fontSize="10" fontFamily="monospace">[05] 电磁场域 ELECTRO-MAGNETIC</text>
          <text x="320" y="380" fill="#10b981" fontSize="12" fontFamily="sans-serif">{safeAnchors.electro}</text>

          <text x="320" y="410" fill="#52525b" fontSize="10" fontFamily="monospace">[06] 视觉流淌 VISUAL LANDSCAPE</text>
          <text x="320" y="425" fill="#10b981" fontSize="12" fontFamily="sans-serif">{safeAnchors.view}</text>

          {/* 底部装饰 */}
          <g transform="translate(40, 460)">
              {Array.from({length: 40}).map((_, i) => (
                <rect key={i} x={i * 8} y="0" width={i % 4 === 0 ? 4 : 1.5} height="20" fill="#18181b"/>
              ))}
          </g>

          <text x="560" y="481" fill="#52525b" fontSize="10" fontFamily="monospace" textAnchor="end">LATENT SUBSTRATE ENGRAVED / S2-DID ISSUED</text>
        </svg>
      </div>

      <button 
        onClick={handleDownload}
        disabled={downloading}
        className="w-full py-4 rounded-lg bg-[#1a1a1a] border border-cyan-900 text-cyan-400 font-black hover:bg-cyan-900/30 hover:border-cyan-500 transition-all text-sm flex items-center justify-center gap-2 tracking-widest uppercase"
      >
        {downloading ? 'GENERATING...' : '⬇ DOWNLOAD AGENT ORIGIN CERTIFICATE'}
      </button>
    </div>
  );
};