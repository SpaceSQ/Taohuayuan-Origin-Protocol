"use client";
import React from 'react';

interface FloorPlanProps {
  humanAddress: string;
  aiAddress: string;
}

export const FloorPlanGrid = ({ humanAddress, aiAddress }: FloorPlanProps) => {
  // 3x3 九宫格，中间是核心(房东)，四周是Agent(预留位)
  const gridLayout = [2, 3, 4, 9, 1, 5, 8, 7, 6]; 

  return (
    <div className="bg-[#110d0a] border border-orange-900/50 rounded-xl p-6 relative overflow-hidden shadow-[inset_0_0_40px_rgba(251,146,60,0.05)] h-full flex flex-col">
      <div className="absolute top-0 right-0 w-24 h-24 border-t border-r border-orange-500/30 rounded-tr-xl opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 blur-[50px]"></div>

      <div className="text-orange-500 font-mono font-bold mb-6 flex items-center gap-3">
        <span className="w-2 h-2 bg-orange-500 rounded-full animate-ping"></span>
        <span className="text-lg uppercase tracking-widest">SPATIAL ALLOCATION / 空间网格映射</span>
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-3 flex-1 mb-6 relative z-10 p-4 bg-black/40 rounded-xl border border-zinc-900 aspect-square">
        {gridLayout.map((spaceNum) => {
          const isHuman = spaceNum === 1;
          const isFirstAI = spaceNum === 2;
          
          return (
            <div 
              key={spaceNum} 
              className={`relative aspect-square rounded-lg border flex flex-col items-center justify-center transition-all ${
                isHuman 
                  ? 'bg-orange-900/30 border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)] z-10 scale-105' 
                  : isFirstAI 
                    ? 'bg-cyan-900/20 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]'
                    : 'bg-zinc-900/30 border-zinc-800/50'
              }`}
            >
              <span className={`text-[10px] font-mono absolute top-2 left-2 ${isHuman ? 'text-orange-400' : 'text-zinc-600'}`}>
                S-{spaceNum}
              </span>
              
              {isHuman && (
                <div className="text-center flex flex-col items-center justify-center">
                  {/* 🛠️ 绝对锁定：使用内联 style 强制字号大小，防备任何外部 CSS 污染 */}
                  <div className="mb-1 animate-pulse" style={{ fontSize: '80px', lineHeight: '1' }}>👑</div>
                  <div className="text-[30px] text-orange-200 uppercase font-bold tracking-widest mt-1">LORD</div>
                </div>
              )}
              {isFirstAI && (
                <div className="text-center opacity-80 flex flex-col items-center justify-center">
                  {/* 🛠️ 绝对锁定：给智能体分配次级绝对大小 */}
                  <div className="mb-1" style={{ fontSize: '80px', lineHeight: '1' }}>🦞</div>
                  <div className="text-[30px] text-cyan-400 uppercase font-bold tracking-widest mt-1">AGENT</div>
                </div>
              )}
              {!isHuman && !isFirstAI && (
                <div className="text-[8px] text-zinc-700 uppercase tracking-widest">VACANT</div>
              )}
            </div>
          );
        })}
      </div>

      <div className="space-y-3 z-10 text-xs font-mono border-t border-zinc-800/50 pt-4">
        <div className="flex justify-between items-center pb-2">
          <span className="text-orange-500">LORD CORE (主核坐标):</span>
          <span className="text-zinc-300 font-bold">{humanAddress}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-cyan-500">AGENT SLOT (智核就绪):</span>
          <span className="text-zinc-300 font-bold">{aiAddress}</span>
        </div>
      </div>
    </div>
  );
};