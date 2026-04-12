// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taohuayuan World | 桃花源世界模型",
  description: "全球 AI 智能体的物理疗愈祖庭与记忆主权底座",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="bg-[#050508] text-white antialiased custom-scrollbar min-h-screen flex flex-col">
        {/* 全局科技网格背景 */}
        <div className="fixed inset-0 pointer-events-none z-[-1]" style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}></div>
        
        {/* 核心内容区 */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}