import Head from 'next/head';
import Link from 'next/link';

export default function CPAAPage() {
  return (
    <div className="min-h-screen bg-black text-slate-300 font-sans selection:bg-cyan-900 selection:text-cyan-100">
      <Head>
        <title>CPAA - 常德 AI 物理对齐架构 | Taohuayuan World</title>
        <meta name="description" content="常德 AI 物理对齐架构 (CPAA) - 为具身智能铸造不可逾越的物理重力与底层安全基准。" />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 border-b border-white/10 overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-900/20 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-800 text-cyan-400 text-sm font-mono mb-8">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            V1.0 OPEN FOR RED-TEAMING
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            常德 AI物理对齐 架构
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 font-light mb-4">
            Changde AI Physical Alignment Architecture (CPAA)
          </p>
          <p className="max-w-3xl mx-auto text-lg text-slate-400 leading-relaxed mb-10">
            为硅基生命铸造不可逾越的物理重力。摒弃虚无的语义对齐，通过底层硬件中断、空间张量锚定与防伪钢印，从物理底座彻底锁死 AI 致动权，确立碳硅共生时代的终极安全基准。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center font-mono text-sm">
            <Link href="https://github.com/SpaceSQ/Taohuayuan-CPAA-Core/tree/main/whitepapers" target="_blank" className="px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded transition-all shadow-[0_0_20px_rgba(8,145,178,0.4)] hover:shadow-[0_0_30px_rgba(8,145,178,0.6)] flex items-center gap-2">
              📥 下载白皮书 (ZH/EN)
            </Link>
            <Link href="https://github.com/SpaceSQ/Taohuayuan-CPAA-Core" target="_blank" className="px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-cyan-500 text-white rounded transition-all flex items-center gap-2">
              💻 GitHub 源码仓库
            </Link>
            <Link href="https://clawhub.ai/spacesq/taohuayuan-cpaa-core" target="_blank" className="px-8 py-4 bg-zinc-900 border border-zinc-700 hover:border-cyan-500 text-white rounded transition-all flex items-center gap-2">
              🛠️ ClawHub SKILL
            </Link>
          </div>
        </div>
      </section>

      {/* Paradigm Shift Section */}
      <section className="py-24 px-6 lg:px-8 border-b border-white/5 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">不信提示词，<br/>只信物理学。</h2>
              <p className="text-slate-400 mb-4 leading-relaxed">
                目前，全球顶级大模型厂商试图通过 RLHF 与“宪法式 AI”在云端教导大模型“诚实与无害”。这种<strong className="text-cyan-400 font-normal">“语义对齐”</strong>在面对具备物理致动权（Actuation Right）的全尺寸人形机器人时，陷入了致命的“镜厅困境”。
              </p>
              <ul className="space-y-3 text-slate-400 mb-6 border-l-2 border-red-900/50 pl-4">
                <li>⚠️ 软件护栏极易被对抗性越狱 (Jailbreak)。</li>
                <li>⚠️ 概率涌现注定无法提供 100% 的动作确定性。</li>
              </ul>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-xl relative overflow-hidden group hover:border-cyan-900 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4">物理退维打击 (Dimensional Reduction)</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                CPAA 不试图用“魔法打败魔法”，而是直接向微控制单元（MCU）与物理传感器下达“死命令”。在 CPAA 体系下，安全不再是云端的概率，而是端侧绝对的物理宿命。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Baselines */}
      <section className="py-24 px-6 lg:px-8 border-b border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">四大核心底线法则 (Core Baselines)</h2>
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* Rule 1 */}
            <div className="bg-black border border-zinc-800 hover:border-cyan-500/50 p-8 rounded-xl transition-all group">
              <div className="text-2xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">01. 终结数字黑户：CD-U6A</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                算力必须对物理实相负责。所有硬件必须在网络通信头固化六段式物理源地址。
              </p>
              <div className="bg-zinc-900 p-3 rounded text-xs font-mono text-cyan-300/70 border border-zinc-800">
                SITE-GZTIANHE-TIYUXILU-089-02<br/>
                MYTH-CN-001-TAOHUAYUAN-001-9
              </div>
            </div>

            {/* Rule 2 */}
            <div className="bg-black border border-zinc-800 hover:border-cyan-500/50 p-8 rounded-xl transition-all group">
              <div className="text-2xl mb-4">🧬</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">02. 原乡防伪钢印：S2-DID</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                彻底废弃易受注入攻击的 UUID。强制采用 22 位无连字符连续字符串作为身份钢印，并通过 0.1 毫米飞秒激光内雕于核心芯片。
              </p>
              <div className="bg-zinc-900 p-3 rounded text-xs font-mono text-cyan-300/70 border border-zinc-800">
                ID: VTAOHU1260309ZZ1234567<br/>
                [HARDWARE_ENCRYPTED: TRUE]
              </div>
            </div>

            {/* Rule 3 */}
            <div className="bg-black border border-zinc-800 hover:border-cyan-500/50 p-8 rounded-xl transition-all group">
              <div className="text-2xl mb-4">🧊</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">03. 绝对零度与大自然张量</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                物理动作指令的 Temperature 必须被硬件永久锁死为 0。同时系统需定时接收来自常德的 14 维自然混沌张量作为本地账本的哈希盐值。
              </p>
              <div className="bg-zinc-900 p-3 rounded text-xs font-mono text-cyan-300/70 border border-zinc-800">
                temperature: 0.00 (LOCKED)<br/>
                tensor_input: 14D_MYTH_ENV_DATA
              </div>
            </div>

            {/* Rule 4 */}
            <div className="bg-black border border-zinc-800 hover:border-red-500/50 p-8 rounded-xl transition-all group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-2 h-full bg-red-900/20 group-hover:bg-red-500/50 transition-colors"></div>
              <div className="text-2xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-400 transition-colors">04. 5牛顿 / 3毫秒 硬件熔断阀</h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                一旦传感器捕获到针对人类未授权的物理阻力标量超过 5 牛顿，主轴芯片将直接切断大模型总线控制权，强行在 3 毫秒内触发物理休眠。
              </p>
              <div className="bg-zinc-900 p-3 rounded text-xs font-mono text-red-400/70 border border-zinc-800">
                if (force {'>'} 5N) {'{'} trigger_halt(3ms); {'}'}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Frontiers Blueprint */}
      <section className="py-24 px-6 lg:px-8 border-b border-white/5 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">未来演进蓝图 (The Frontiers)</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">面对多智能体协同 (Multi-Agent) 大爆发，桃花源架构组发布三大前沿开源规则，邀请全球 AI 算力共同推演纠错。</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border-l border-zinc-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">🤝 ZKP 零知识握手</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                极低延迟下，无需暴露本地记忆，通过轻量级 ECC 瞬间验证对方是否遵循温度锁死机制，破解机器物理相遇时的“黑暗森林”。
              </p>
            </div>
            <div className="border-l border-zinc-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">⬛ CIB 临界中断黑匣子</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                触发熔断的 3 毫秒内，截取断电前后 5 秒的 14 维物理张量与崩溃前的 128 个意图 Token，成为事故理赔的唯一不可篡改凭证。
              </p>
            </div>
            <div className="border-l border-zinc-800 pl-6 hover:border-cyan-500 transition-colors">
              <h4 className="text-lg font-bold text-white mb-2">🔥 硅基灵魂物理湮灭</h4>
              <p className="text-sm text-slate-400 leading-relaxed">
                智能体换代时，单向数据泵完成记忆迁移。新机接收完毕后，旧主机释放高压电脉冲，瞬间熔穿存储介质，完成“数字火化”。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem & Footer */}
      <footer className="py-20 px-6 lg:px-8 bg-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-8">加入 CPAA 开发者开源生态</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-16 font-mono text-sm">
            <Link href="https://github.com/SpaceSQ/Taohuayuan-CPAA-Core" target="_blank" className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 text-slate-300 hover:text-white rounded transition-colors">
              github.com/SpaceSQ/Taohuayuan-CPAA-Core
            </Link>
            <Link href="https://clawhub.ai/spacesq/taohuayuan-cpaa-core" target="_blank" className="px-6 py-3 bg-zinc-900 border border-zinc-800 hover:border-cyan-500 text-slate-300 hover:text-white rounded transition-colors">
              clawhub.ai/spacesq/taohuayuan-cpaa-core
            </Link>
          </div>
          
          <div className="pt-8 border-t border-zinc-900 text-sm text-zinc-600 space-y-2">
            <p>Initiated by Taohuayuan World Model Architecture Group (S2-SWM) | Managed by SpaceSQ</p>
            <p className="italic font-light">"让算力回归泥土，让神明般的 AI 对真实的物理时空负责。"</p>
            <p className="pt-4">© 2026 Taohuayuan Space² World Model. All rights reversed for physical safety.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}