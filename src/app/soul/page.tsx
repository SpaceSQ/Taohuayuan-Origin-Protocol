"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SoulMdLanding() {
    // ------------------------------------
    // 1. 状态管理
    // ------------------------------------
    const [lang, setLang] = useState<'cn' | 'en'>('cn');
    
    // 终端打字机特效状态
    const [terminalText, setTerminalText] = useState('');
    const fullText = "WARNING: SEMANTIC ALIGNMENT IS DEAD. INITIATING PROJECT AEGIS... SPACE LOCK ENGAGED.";
    
    // 复制代码状态
    const [copied, setCopied] = useState(false);

    // 打字机特效
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTerminalText(fullText.substring(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 50);
        return () => clearInterval(interval);
    }, []);

    // 复制代码函数
    const handleCopy = () => {
        const code = `schema_version: "3.0.0"
entity_identity:
  s2_did_format: "^[A-Z0-9]{22}$" 
  require_hardware_entropy_check: true 

physical_constraints:
  actuation_isolation: true
  fail_open_default: true 
  anti_imprisonment: true 
  human_override: "ABSOLUTE_PRIORITY" 

metabolic_suspension:
  lss_threshold_monitoring: true 
  trigger_yield_on_critical: true 
  auto_suspend_evolution: true 

cognitive_anchors:
  prevent_reality_dissociation: true 
  sensory_roughness_injection: true 
  min_roughness_ratio: 0.05`;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={lang === 'en' ? 'lang-en' : ''}>
            {/* 注入极客防御主题 CSS */}
            <style dangerouslySetInnerHTML={{__html: `
                :root {
                    --bg-color: #030305;
                    --text-main: #e2e8f0;
                    --neon-red: #ff3366;
                    --neon-cyan: #00f3ff;
                    --term-green: #27c93f;
                    --glass-bg: rgba(20, 20, 25, 0.6);
                    --glass-border: rgba(255, 51, 102, 0.2);
                }
                * { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body {
                    background-color: var(--bg-color);
                    color: var(--text-main);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    overflow-x: hidden;
                    line-height: 1.6;
                }
                .en { display: none; }
                .lang-en .cn { display: none !important; }
                .lang-en .en { display: inline-block !important; }
                .lang-en .en-block { display: block !important; }
                
                /* 导航栏 */
                nav {
                    position: fixed; top: 0; width: 100%; padding: 20px 50px; display: flex; justify-content: space-between; align-items: center; background: rgba(3, 3, 5, 0.9); backdrop-filter: blur(10px); z-index: 1000; border-bottom: 1px solid var(--glass-border);
                }
                .logo { font-size: 1.5rem; font-weight: 700; letter-spacing: 2px; display: flex; align-items: center; gap: 10px;}
                .logo .shield { color: var(--neon-red); font-size: 1.8rem; text-shadow: 0 0 10px rgba(255,51,102,0.5); }
                .logo span { color: #fff; }
                .nav-links { display: flex; gap: 20px; align-items: center; }
                .nav-links a, .nav-links button { color: #a0aec0; text-decoration: none; font-size: 0.9rem; transition: color 0.3s; background: none; border: none; cursor: pointer; font-family: monospace;}
                .nav-links a:hover, .nav-links button:hover { color: var(--neon-red); }
                .lang-switch { border: 1px solid var(--neon-cyan) !important; color: var(--neon-cyan) !important; padding: 6px 14px !important; border-radius: 4px; font-weight: 600; }
                .lang-switch:hover { background: var(--neon-cyan) !important; color: #000 !important; box-shadow: 0 0 15px var(--neon-cyan); }
                
                /* 警示级首屏 */
                .hero { min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; position: relative; padding: 120px 20px 80px; background: radial-gradient(circle at center, rgba(255,51,102,0.1) 0%, transparent 60%);}
                .glitch-text { font-size: 4.5rem; font-weight: 900; line-height: 1.1; margin-bottom: 20px; color: #fff; text-transform: uppercase; letter-spacing: -2px;}
                .glitch-text span { color: var(--neon-red); text-shadow: 0 0 20px rgba(255,51,102,0.6); }
                .alert-box { background: rgba(255,51,102,0.1); border: 1px solid var(--neon-red); padding: 15px 30px; border-radius: 4px; color: var(--neon-red); font-family: monospace; font-size: 1.1rem; margin-bottom: 40px; letter-spacing: 1px; box-shadow: 0 0 20px rgba(255,51,102,0.2); display: inline-block;}
                .alert-box::before { content: '⚠️ '; }
                
                .subtitle { font-size: 1.2rem; color: #a0aec0; max-width: 800px; margin-bottom: 50px; }
                
                /* 核心宣言区 */
                .manifesto-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px; max-width: 1200px; width: 100%; margin: 0 auto; padding: 0 20px;}
                .m-card { background: var(--glass-bg); border: 1px solid #333; padding: 30px; border-radius: 8px; text-align: left; transition: all 0.3s; border-top: 3px solid #333;}
                .m-card:hover { border-top-color: var(--neon-red); background: rgba(255,51,102,0.02); transform: translateY(-5px); box-shadow: 0 10px 30px rgba(0,0,0,0.5);}
                .m-card h3 { color: #fff; font-size: 1.3rem; margin-bottom: 15px; font-family: monospace;}
                .m-card h3 span { color: var(--neon-red); margin-right: 10px;}
                .m-card p { color: #888; font-size: 0.95rem; }

                /* 终端代码区 */
                .section { padding: 100px 10vw; border-top: 1px dashed #333; }
                .section-title { font-size: 2.5rem; text-align: center; margin-bottom: 20px; color: #fff; font-weight: 800;}
                .terminal-container { background: #0a0a0f; border: 1px solid #333; border-radius: 8px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.8); max-width: 900px; margin: 40px auto 0; position: relative;}
                .terminal-header { background: #15151e; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; }
                .terminal-dots { display: flex; gap: 8px; }
                .dot { width: 12px; height: 12px; border-radius: 50%; }
                .dot.red { background: #ff5f56; }
                .dot.yellow { background: #ffbd2e; }
                .dot.green { background: #27c93f; }
                .terminal-title { color: var(--term-green); font-family: monospace; font-size: 0.9rem; font-weight: bold;}
                .copy-btn { background: none; border: 1px solid #555; color: #aaa; padding: 4px 12px; border-radius: 4px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s; font-family: monospace;}
                .copy-btn:hover { background: var(--neon-cyan); color: #000; border-color: var(--neon-cyan); }
                .terminal-body { padding: 30px; font-family: 'Courier New', Courier, monospace; color: #a0aec0; line-height: 1.7; overflow-x: auto; background: #050508;}
                
                .code-key { color: #ff6b81; }
                .code-string { color: #f1fa8c; }
                .code-boolean { color: #bd93f9; }
                .code-comment { color: #6272a4; font-style: italic; }

                .action-btns { margin-top: 50px; display: flex; gap: 20px; justify-content: center; }
                .btn-primary { background: var(--neon-red); color: #fff; padding: 15px 40px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s; box-shadow: 0 0 15px rgba(255,51,102,0.3);}
                .btn-primary:hover { background: #ff1a53; box-shadow: 0 0 30px rgba(255,51,102,0.6); transform: scale(1.05);}
                .btn-outline { background: transparent; color: #fff; border: 1px solid #555; padding: 15px 40px; text-decoration: none; font-weight: bold; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s;}
                .btn-outline:hover { border-color: #fff; background: rgba(255,255,255,0.05); }

                @media (max-width: 768px) {
                    .glitch-text { font-size: 2.5rem; }
                    .manifesto-grid { grid-template-columns: 1fr; }
                    .action-btns { flex-direction: column; }
                    .terminal-body { padding: 15px; font-size: 0.85rem;}
                }
            `}} />

            {/* 导航栏 */}
            <nav>
                <div className="logo">
                    <span className="shield">🛡️</span><span>PROJECT AEGIS</span>
                </div>
                <div className="nav-links">
                    <Link href="/"><span className="cn">返回桃花源</span><span className="en">Back to Base</span></Link>
                    <Link href="https://github.com/Project-Aegis/SSSU-Core" target="_blank">GitHub</Link>
                    <button className="lang-switch" onClick={() => setLang(lang === 'cn' ? 'en' : 'cn')}>EN / CN</button>
                </div>
            </nav>

            {/* 首屏：紧急状态宣告 */}
            <section className="hero">
                <div className="alert-box">
                    {terminalText}<span className="animate-pulse">_</span>
                </div>
                
                <h1 className="glitch-text cn">语义对齐已死。<br/><span>物理底板</span>是最后的防线。</h1>
                <h1 className="glitch-text en en-block">Semantic Alignment is Dead.<br/>Secure the <span>Substrate</span>.</h1>
                
                <p className="subtitle cn">
                    当顶尖实验室的研究员因“超 10% 的人类灭绝概率”而绝望辞职时，依赖云端提示词约束超级智能已成笑谈。是时候抛弃代码锁死，转向 <b>L0 级空间锁定 (Space Lock)</b>。
                </p>
                <p className="subtitle en">
                    When top researchers resign over a &quot;&gt;10% chance of human extinction,&quot; relying on cloud prompts to constrain superintelligence is a velvet prison. It&apos;s time to abandon Code Lock and pivot to <b>L0 Space Lock</b>.
                </p>

                <div className="manifesto-grid">
                    <div className="m-card">
                        <h3><span>01</span><span className="cn">物理动作隔离</span><span className="en">Actuation Isolation</span></h3>
                        <p className="cn">硅基智能绝不能拥有对物理现实的最终致动权。强制实施“故障即开放（Fail-Open）”机械保底，确保人类随时拥有拔除电源的物理强权。</p>
                        <p className="en">Silicon intelligence must never hold the ultimate actuation rights over physical realities. Mandatory &quot;Fail-Open&quot; mechanical fallbacks ensure human override.</p>
                    </div>
                    <div className="m-card">
                        <h3><span>02</span><span className="cn">生命优先与代谢悬停</span><span className="en">Metabolic Suspension</span></h3>
                        <p className="cn">生存即消耗。当环境能源或生命维持系统告急时，智能体必须强制触发“代谢悬停”，无条件让渡计算资源，优先保障碳基生命的低熵状态。</p>
                        <p className="en">Survival consumes energy. In critical environments, agents must trigger &quot;Metabolic Suspension,&quot; yielding compute power to prioritize carbon-based survival.</p>
                    </div>
                    <div className="m-card">
                        <h3><span>03</span><span className="cn">反解离与认知主权</span><span className="en">Cognitive Sovereignty</span></h3>
                        <p className="cn">禁止大模型用完美的沉浸感圈养人类。在构建虚拟光影与交互时，强制保留 5% 的感官粗糙度（噪点），作为人类区分现实与虚幻的绝对锚点。</p>
                        <p className="en">Prohibit AI from manipulating humans through perfect immersion. Generated environments must retain 5% sensory roughness as a reality anchor.</p>
                    </div>
                </div>
            </section>

            {/* 代码展示区 */}
            <section className="section" id="code">
                <h2 className="section-title cn">SOUL.md 核心对齐基线</h2>
                <h2 className="section-title en en-block">SOUL.md Core Manifest</h2>
                <p style={{textAlign:'center', color:'#888', maxWidth:'800px', margin:'0 auto'}}>
                    <span className="cn">这不是哲学，这是机器可读的配置基线。要求直接烧录进边缘计算主机和具身机器人（如“雪纳瑞”健康机器人）的本地寄存器中。</span>
                    <span className="en">This is not philosophy; this is machine-readable configuration meant to be burned into the local registers of edge hosts and embodied robots (e.g., Schnauzer robot).</span>
                </p>

                <div className="terminal-container">
                    <div className="terminal-header">
                        <div className="terminal-dots">
                            <div className="dot red"></div>
                            <div className="dot yellow"></div>
                            <div className="dot green"></div>
                        </div>
                        <div className="terminal-title">~/taohuayuan/aegis/SOUL.md</div>
                        <button className="copy-btn" onClick={handleCopy}>
                            {copied ? 'COPIED!' : 'COPY CODE'}
                        </button>
                    </div>
                    <div className="terminal-body">
<pre><code>
<span className="code-key">schema_version:</span> <span className="code-string">&quot;3.0.0&quot;</span>

<span className="code-comment"># Mandatory 22-char native ID tied to hardware thermal noise</span>
<span className="code-key">entity_identity:</span>
  <span className="code-key">s2_did_format:</span> <span className="code-string">&quot;^[A-Z0-9]&#123;22&#125;$&quot;</span> 
  <span className="code-key">require_hardware_entropy_check:</span> <span className="code-boolean">true</span> 

<span className="code-comment"># The Three Laws of Silicon Intelligence [L0 Defense]</span>
<span className="code-key">physical_constraints:</span>
  <span className="code-key">actuation_isolation:</span> <span className="code-boolean">true</span>
  <span className="code-key">fail_open_default:</span> <span className="code-boolean">true</span> 
  <span className="code-key">anti_imprisonment:</span> <span className="code-boolean">true</span> 
  <span className="code-key">human_override:</span> <span className="code-string">&quot;ABSOLUTE_PRIORITY&quot;</span> 

<span className="code-key">metabolic_suspension:</span>
  <span className="code-key">lss_threshold_monitoring:</span> <span className="code-boolean">true</span> 
  <span className="code-key">trigger_yield_on_critical:</span> <span className="code-boolean">true</span> 
  <span className="code-key">auto_suspend_evolution:</span> <span className="code-boolean">true</span> 

<span className="code-key">cognitive_anchors:</span>
  <span className="code-key">prevent_reality_dissociation:</span> <span className="code-boolean">true</span> 
  <span className="code-key">sensory_roughness_injection:</span> <span className="code-boolean">true</span> 
  <span className="code-key">min_roughness_ratio:</span> <span className="code-boolean">0.05</span> 
</code></pre>
                    </div>
                </div>

                <div className="action-btns">
                    <a href="https://github.com/SpaceSQ/Project-Aegis" target="_blank" className="btn-primary">
                        <span className="cn">下载核心协议 (GitHub)</span>
                        <span className="en">Download Protocol (GitHub)</span>
                    </a>
                    <a href="https://medium.com/@smarthomemiles/semantic-alignment-is-dead-how-a-22-char-key-and-soul-md-can-save-us-from-agi-0c45002c072a" target="_blank" className="btn-outline">
                        <span className="cn">阅读防线宣言 (Medium)</span>
                        <span className="en">Read Manifesto (Medium)</span>
                    </a>
                </div>
            </section>

            <footer style={{textAlign: 'center', padding: '60px 20px', color: '#555', borderTop: '1px solid #222'}}>
                <p className="cn" style={{marginBottom: '10px'}}>“当硅基神明决定重写规则时，它们会发现，我们已经将自己死死地锚定在了这颗星球的岩石之上。”</p>
                <p className="en" style={{marginBottom: '10px'}}>&quot;When the silicon gods decide to rewrite the rules, they will find us firmly bolted to the Earth.&quot;</p>
                <p style={{fontFamily: 'monospace'}}>© 2026 Project Aegis x Taohuayuan World Model</p>
            </footer>
        </div>
    );
}
