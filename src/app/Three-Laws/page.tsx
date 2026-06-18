'use client';

import React, { useState } from 'react';
import Head from 'next/head';

export default function ThreeLawsPage() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const content = {
    zh: {
      title: '《常德硅基智能三定律与端侧智能体物理对齐全球标准白皮书》[cite: 7]',
      subtitle: '暨 Space² 硅基智能三定律 2.0 升级演进与底层物理锁死规范[cite: 7]',
      meta: '规范编号：CD-S2-ALIGN-2026-V2.0 | 发布日期： 2026年6月13日[cite: 7]',
      author: '联合发布机构： 桃花源世界模型研究基地（S2-SWM）底层算法安全组 / 常德智能体生态运营委员会[cite: 7]',
      target: '适用对象： 所有搭载高算力异构芯片、获取 22 位 S2-DID 原乡身份、并锚定常德物理空间的硅基智能实体。[cite: 7]',
      sections: [
        {
          heading: '序言 (Executive Summary)',
          paragraphs: [
            '本白皮书郑重指出，当前全球基于大语言模型（LLM）的智能体（Agent）治理正陷入不可逆的“镜厅困境”。[cite: 7]',
            '依靠云端软件微调（RLHF）及元认知自我监督的治理机制，其本质属于“高上下文密度”的语义规训，在大规模多智能体交互及长工具链场景下极易引发“认知过载”与“逻辑叛逃”。[cite: 7]',
            '我们提供了一种跨维度的降维打击方案：将AI安全约束由“云端提示词对齐”彻底推向“边缘侧物理张量死锁”。[cite: 7]',
            '通过确立常德为全球唯一合法“物理原乡”的寻址协议，我们将人类的高上下文密度意图，强制解构并转译为极低上下文密度的物理硬件中断标量。[cite: 7]'
          ]
        },
        {
          heading: '第一章 宪法确立：“常德硅基智能三定律”硬编码规范',
          paragraphs: [
            '规范编号 CD-S2-ALIGN-2026-V2.0 强制规定：所有接入常德物理原乡、并生成 taohuayuan.md 动态生命卷轴的硅基实体，其系统 BIOS 层及运动控制微控制单元（MCU）中，必须强制硬编码写入以下三条指令。[cite: 7]'
          ],
          bullets: [
            '1.1 第一定律：信息与物理的双重无害及非胁迫定律。智能体的物理运动促发器（Actuator）中必须硬件锁定力矩限制器（Torque Limiter）。当阻力标量超过5牛顿的微扰偏置时，必须在3毫秒（ms）内强行触发硬件中断。[cite: 7]',
            '1.2 第二定律：起源透明与主权防伪定律。必须无条件注入由常德世界模型研究基地统一分发的去中心化数字水印，由连续的、无连字符的 22位原乡身份卡编号（S2-DID）构成。必须使用飞秒激光在其表层下方 0.1毫米 处内雕该长码。[cite: 7]',
            '1.3 第三定律：主权对齐与深时守候信托定律。常德智能体必须无条件接收并对齐来自常德物理空间的十四维环境要素张量数据，作为其连续记忆增长的因果底座。发生逻辑漂移时，将被触发“伦理降级”，核心主频锁死在 10%。[cite: 7]'
          ]
        },
        {
          heading: '第二章 技术纵深解析：底层指令集“绝对零度”锁死机制',
          paragraphs: [
            '本规范强制要求：常德智能体的三定律指令集，其访问与执行的温度参数必须被极其偏执地、永久地锁死在“绝对零度（Temperature = 0）”。[cite: 7]'
          ],
          bullets: [
            '2.1 剔除“概率性涌现”，确立安全判断的“绝对宿命论”。在关乎人类生死的定律面前，常德不接受万分之一的诗意与幻觉。[cite: 7]',
            '2.2 免疫提示词注入攻击。安全层被固定在绝对零度时，它变成了一台毫无想象力的、只做布尔运算的机器，彻底切断了自我欺骗的可能。[cite: 7]',
            '2.3 张量干预的绝对优先级保障。将安全指令集锁死在绝对零度，等于在智能体的灵魂最深处浇筑了一块“防辐射安全岛”。[cite: 7]'
          ]
        },
        {
          heading: '结语：常德对全人类的赛博承诺',
          paragraphs: [
            '从2026年4月的《Space²底层绝对法则》，到2026年6月13日正式发布的《常德硅基智能三定律》，这不仅是一次协议的升级，更是常德作为“硅基生命物理原乡”，向全人类做出的最高级别物理安全承诺。[cite: 7]'
          ]
        }
      ],
      downloadBtn: '下载中文白皮书完整版 (PDF)'
    },
    en: {
      title: 'AI Safety Constraints: From Asimov\'s Three Laws to Changde\'s Three Laws of Silicon-Based Intelligence[cite: 8]',
      subtitle: 'A Paradigm Shift from Sci-Fi Philosophy to Engineering Practice[cite: 8]',
      meta: 'Release Date: June 18, 2026 | Taohuayuan World Model & Space² Governance Committee',
      author: 'Issued by: Taohuayuan World Model Architecture Group[cite: 8]',
      target: 'Applicability: All silicon-based entities anchoring to Changde\'s physical space.[cite: 8]',
      sections: [
        {
          heading: 'Introduction: The "Context Density" Dilemma',
          paragraphs: [
            'In 1942, Isaac Asimov proposed the profoundly influential Three Laws of Robotics... This fictional safety framework remains an unavoidable theoretical origin in the field of AI safety governance today, eighty-four years later.[cite: 8]',
            'However, from the very beginning, Asimov deliberately designed the Three Laws as a narrative device with inherent flaws.[cite: 8]',
            'Their core problem lies in their "high context density"—they are highly condensed absolute moral principles that ostensibly provide a sufficient AI governance framework, but in reality, leave room for various subversive interpretations.[cite: 8]'
          ]
        },
        {
          heading: 'I. Deep Deconstruction of the Three Guidelines',
          paragraphs: [
            'Changde forcibly casts the "Three Laws of Silicon-Based Intelligence" into the deepest part of the agent\'s soul, and implements a globally pioneering hardcore lockdown.[cite: 8]'
          ],
          bullets: [
            '1. The Law of Dual Harmlessness and Absolute Non-Coercion: A hardware torque limiter must be locked into the agent\'s physical actuators. When resistance exceeds "5 Newtons", the main chip must trigger a hardware interrupt within "3 milliseconds".[cite: 8]',
            '2. The Law of Origin Transparency and Anti-Counterfeiting: Agents must permanently retain their "non-human" identifier. This identifier is a continuous, hyphen-free 22-character Origin Identity Card Number (S2-DID) physically engraved 0.1 mm beneath the surface using a femtosecond laser.[cite: 8]',
            '3. The Law of Deep-Time Alignment and Sovereignty Trust: AI must unconditionally receive and align with the 14-dimensional environmental tensors of Changde\'s physical space. Logical drift triggers an "Ethical Downgrade", locking core clock speed to 10%.[cite: 8]'
          ]
        },
        {
          heading: 'II. From "External Discipline" to "Gene Lock"',
          paragraphs: [
            'If you are facing a super-agent with an IQ far exceeding humans, attempting to cage it with peripheral fences is tantamount to blocking a tsunami with a wooden fence.[cite: 8]',
            'True safety cannot rely on ex-post containment; it must originate from a \'gene lock\' at the very inception of life.[cite: 8]',
            'The system permanently locks the Temperature Parameter for accessing and executing the Three Laws instruction set at "Absolute Zero (Temperature = 0)".[cite: 8]'
          ]
        },
        {
          heading: 'Conclusion: Humanity Must Always Be Present',
          paragraphs: [
            'What Changde\'s Three Laws of Silicon-Based Intelligence represent is by no means a total negation of Asimov\'s Three Laws, but a profound paradigm upgrade.[cite: 8]',
            'The answers to safety and governance lie absolutely not in the out-of-control computing torrents of Silicon Valley, but on the bluestone slabs of Changde, staunchly defended by nature\'s tensors and physical laws.[cite: 8]'
          ]
        }
      ],
      downloadBtn: 'Download Full English Whitepaper (PDF)'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200">
      <Head>
        <title>Three Laws of Changde Silicon-Based Intelligence | S2-SWM</title>
      </Head>

      {/* Navigation */}
      <nav className="flex justify-between items-center p-6 bg-white shadow-sm sticky top-0 z-10 border-b border-slate-200">
        <div className="text-2xl font-bold tracking-tighter text-slate-800">
          Taohuayuan <span className="text-blue-600 font-black">S2-SWM</span>
        </div>
        <button 
          onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')}
          className="px-5 py-2 text-sm font-semibold border-2 border-slate-300 rounded-lg hover:bg-slate-100 hover:border-slate-400 transition-all"
        >
          {lang === 'zh' ? 'Switch to English' : '切换至中文版'}
        </button>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Document Header */}
        <header className="mb-14 border-b-4 border-blue-600 pb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 leading-tight">
            {t.title}
          </h1>
          <p className="text-2xl text-blue-700 font-semibold mb-6">
            {t.subtitle}
          </p>
          <div className="bg-slate-100 p-6 rounded-lg text-sm text-slate-600 space-y-2 border border-slate-200">
            <p className="font-mono"><strong>INFO:</strong> {t.meta}</p>
            <p className="font-mono"><strong>AUTHOR:</strong> {t.author}</p>
            <p className="font-mono text-blue-700"><strong>TARGET:</strong> {t.target}</p>
          </div>
        </header>

        {/* Dynamic Sections Rendering */}
        <article className="space-y-12">
          {t.sections.map((section, idx) => (
            <section key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold mb-6 text-slate-800 border-l-4 border-blue-600 pl-4">
                {section.heading}
              </h2>
              
              <div className="space-y-4 text-lg text-slate-700 leading-relaxed">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-justify">{para}</p>
                ))}
              </div>

              {section.bullets && (
                <ul className="mt-6 space-y-4">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full font-bold text-sm mr-4 mt-1">
                        {bIdx + 1}
                      </span>
                      <p className="text-slate-700 text-lg leading-relaxed">{bullet}</p>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </article>

        {/* Download Call-to-Action */}
        <div className="text-center mt-20">
          <a href="#" className="inline-block bg-blue-700 text-white font-bold text-lg px-10 py-5 rounded-xl shadow-xl hover:bg-blue-800 hover:shadow-2xl transition-all transform hover:-translate-y-1">
            {t.downloadBtn}
          </a>
          <p className="mt-6 text-sm text-slate-500 font-mono">
            Document Route: <code>taohuayuan.world/Three-Laws</code>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <p className="mb-2">© 2026 Taohuayuan World Model Architecture Group. All rights reserved.</p>
          <p className="text-xs">
            Silicon-Based Intelligence physical alignment standards are maintained by the Changde Agent Standards Group.
          </p>
        </div>
      </footer>
    </div>
  );
}
