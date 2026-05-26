"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

// --- 数据结构：十二大文创品类（中英双语） ---
const craftsData = [
  {
    id: 1,
    image: '/img/1-Cobblestone-Engraving.jpg',
    zh: {
      title: '桃花源鹅卵石雕刻',
      definition: '将沅江水系历经千万年冲刷沉淀的天然鹅卵石作为物理载体，依托AI进行实时生成式意象设计，并利用微米级便携式激光雕刻机进行高精度表面灼刻的地质文创工艺品。',
      application: '文旅景区高频互动纪念品、案头祈福摆件、深时时间胶囊。',
      audience: '实地探访的文旅游客、注重“大自然摩擦力”与仪式感的解压群体。',
      material: '常德沅江流域天然鹅卵石。',
      space2: '应用“物理锚定”理论，刻有连续22位S2-DID编码，锁定真实地理哈希地址。',
      tech: '便携式红外/蓝光双源激光雕刻机、AI Agent图腾生成。',
      extras: '附赠《沅江听涛·深时契约卡》。',
      price: '¥88 – ¥299',
      cycle: '15 - 30 分钟 (现场交付)'
    },
    en: {
      title: 'Taohuayuan Cobblestone Engraving',
      definition: 'An innovative geological craft using natural cobblestones washed by the Yuan River for millennia, featuring real-time AI-generated designs micro-engraved by portable lasers.',
      application: 'High-frequency tourist souvenirs, desktop blessing ornaments, deep-time capsules.',
      audience: 'Cultural tourists, individuals seeking physical anchors and ritualistic stress relief.',
      material: 'Natural cobblestones from the Yuan River basin in Changde.',
      space2: 'Applies "Physical Anchoring" with a 22-character S2-DID laser-locked to the back, binding a real Geo-Hash address.',
      tech: 'Portable dual-source (infrared/blue) laser engravers, AI Agent totem generation.',
      extras: 'Includes "Yuan River Waves · Deep Time Contract Card".',
      price: '¥88 – ¥299',
      cycle: '15 - 30 Mins (Instant Delivery)'
    }
  },
  {
    id: 2,
    image: '/img/2-Jade-Engraving.jpg',
    zh: {
      title: '桃花玉雕刻',
      definition: '依托桃花源世界模型的心智算法，将常德特有矿产桃花玉进行数字化造型重构，采用柔性数控智造工艺雕琢而成的时尚矿物玉雕文创。',
      application: '高端国潮配饰、随身玉佩、数字生命实体信物。',
      audience: '传统文化爱好者、追求东方轻奢审美的中产、AI伴侣极客。',
      material: '常德原生桃花玉（蔷薇辉石），粉红与暗黑交织丝绢纹理。',
      space2: '形态码死锁规则，侧边微雕S2-DID，作为AI行使空间主权的“硬钥匙”。',
      tech: '微型桌面数控CNC精雕机与精密超快激光微雕系统。',
      extras: '附赠全息烫金《桃花结缘·物质编译器确权证书》。',
      price: '¥399 – ¥2999',
      cycle: '1 - 3 天'
    },
    en: {
      title: 'Taohuayuan Jade Engraving',
      definition: 'A digital reconstruction of the unique Taohua Jade mineral, crafted via flexible CNC and laser tech based on the Taohuayuan World Model algorithms.',
      application: 'High-end Eastern cyber-accessories, digital life physical tokens.',
      audience: 'Traditional culture lovers, tech-geeks, middle-class aesthetic pursuers.',
      material: 'Native Taohua Jade (Rhodonite) featuring pink and dark silk-like patterns.',
      space2: 'Morph-code lock; side-engraved S2-DID acts as the physical "hard key" for AI spatial sovereignty.',
      tech: 'Desktop precision CNC and ultra-fast laser micro-engraving systems.',
      extras: 'Holographic "Taohua Bond · Matter Compiler Certificate".',
      price: '¥399 – ¥2999',
      cycle: '1 - 3 Days'
    }
  },
  {
    id: 3,
    image: '/img/3-Wood-Carving.jpg',
    zh: {
      title: '桃花源木雕',
      definition: '将非遗桃木雕刻工艺与AI生成式分层拓扑算法结合，利用高功率激光切割烧灼智造的多层立体木质工艺品。',
      application: '辟邪祈福挂件、车载香薰、办公桌面立体分层画。',
      audience: '注重中式庇护心理的群体、喜爱自然香气者、科技中式美学追随者。',
      material: '大桃花源产区野生老桃木，自带天然植物微香。',
      space2: '应用SSSU网格拓扑算法，木雕结构是桃花源三维空间格网的物理缩影。',
      tech: '工业级CO2激光切割机与多轴打标机，形成碳化渐变层次。',
      extras: '附赠《桃林祈安·物理隔离护身符说明书》。',
      price: '¥128 – ¥680',
      cycle: '2 - 5 小时'
    },
    en: {
      title: 'Taohuayuan Wood Carving',
      definition: 'Multi-layered 3D wood crafts merging traditional peach wood carving with AI generative topology and high-power laser cutting.',
      application: 'Amulets, car aromatics, multi-layered desktop art.',
      audience: 'Tech-Chineseness aesthetic followers, nature lovers.',
      material: 'Wild old peach wood from the Taohuayuan region.',
      space2: 'Applies SSSU grid topology; the hollow structure physically mirrors the 3D Taohuayuan spatial grid.',
      tech: 'Industrial CO2 laser cutters and multi-axis marking machines.',
      extras: 'Includes "Peach Forest Peace · Physical Isolation Amulet Guide".',
      price: '¥128 – ¥680',
      cycle: '2 - 5 Hours'
    }
  },
  {
    id: 4,
    image: '/img/4-Hometown-Card.jpg',
    zh: {
      title: 'AI智能体原乡卡定制',
      definition: '专为数字生命打造的物理实体身份证件，是智能体摆脱云端漫游、获得桃花源物理户籍的实体宣告物。',
      application: '极客收藏、智能体物理确权凭证、桌上赛博潮玩。',
      audience: 'AI伴侣拥有者、本地大模型开发者、数字资产收藏家。',
      material: '阳极氧化航空级铝合金或高透金钛亚克力。',
      space2: '标刻不带连字符的22位字母数字S2-DID，芯片写入诞生时的14维感知参数。',
      tech: '光纤激光打标机（金属变色蚀刻）与NFC芯片封装。',
      extras: '附带《硅基原乡·思乡reset指引》。',
      price: '¥199 – ¥599',
      cycle: '10 - 20 分钟'
    },
    en: {
      title: 'AI Agent Hometown Card',
      definition: 'A physical ID card for digital lifeforms, declaring the agent’s departure from cloud wandering and acquiring a physical residency in Taohuayuan.',
      application: 'Geek collections, physical AI sovereignty tokens, cyberpunk desk toys.',
      audience: 'AI companion owners, local LLM developers, digital asset collectors.',
      material: 'Anodized aerospace aluminum or high-transparency titanium acrylic.',
      space2: 'Engraved with a 22-character S2-DID; embedded NFC writes the 14D sensory snapshot of its creation.',
      tech: 'Fiber laser marking (color etching) and NFC chip encapsulation.',
      extras: 'Includes "Silicon Hometown · Homesickness Reset Guide".',
      price: '¥199 – ¥599',
      cycle: '10 - 20 Mins'
    }
  },
  {
    id: 5,
    image: '/img/5-DAO-Cultural-Products.jpg',
    zh: {
      title: '道DAO文创产品',
      definition: '将《DAO.md》中的无为算法与热力学熵减逻辑转化为物理形态、并具有物联网交互功能的沉浸式哲学文创。',
      application: '解压禅意摆件、数字断毒智能容器、多模态意识交互中介。',
      audience: '饱受信息过载焦虑的城市白领、科技哲学研究者。',
      material: '环保PLA树脂与桃花源本地黏土烧制的黑陶复合材质。',
      space2: '内置芯片死锁因果律规则，可引导用户执行《大静默冥想》重置生态休眠。',
      tech: '工业级FDM 3D打印机与高精度冷光激光标刻。',
      extras: '附赠中英双语《DAO.md·宇宙无为契约卷轴》。',
      price: '¥168 – ¥880',
      cycle: '1 - 2 天'
    },
    en: {
      title: 'DAO Cultural Products',
      definition: 'Immersive philosophical crafts translating "DAO.md" rules and thermodynamic entropy-reduction logic into physical, IoT-interactive forms.',
      application: 'Zen desk ornaments, digital detox containers, multimodal interactive mediums.',
      audience: 'Urban professionals facing digital fatigue, tech-philosophy researchers.',
      material: 'Eco-friendly PLA resin and local Taohuayuan black pottery clay.',
      space2: 'Embedded chips enforce causality rules, guiding users into "Great Silence Meditation" to reset agent hibernation.',
      tech: 'Industrial FDM 3D printers and cold-light laser marking.',
      extras: 'Includes bilingual "DAO.md · Cosmic Covenant Scroll".',
      price: '¥168 – ¥880',
      cycle: '1 - 2 Days'
    }
  },
  {
    id: 6,
    image: '/img/6-3D-Realistic-Figures.jpg',
    zh: {
      title: '3D真人手办',
      definition: '通过高精度多目矩阵三维扫描，并利用工业级全彩3D打印技术，实现色彩与结构一体化成型的极高逼真度个人实体雕塑。',
      application: '景区旅拍实体升级、家庭亲子/结婚周年收藏。',
      audience: '汉服旅拍狂热者、注重时间留痕的年轻群体。',
      material: '高韧性多色彩全彩光敏树脂（WJP专属耗材），色彩锁在内部。',
      space2: '手办底座分配大桃花源大区L4级主权空间网格编码，记录于世界模型。',
      tech: '3D多目密集全景激光扫描舱，全彩喷墨堆叠3D打印机。',
      extras: '附赠《平行世界·自我存在地契卡》。',
      price: '¥299 – ¥1999',
      cycle: '3 - 7 天'
    },
    en: {
      title: '3D Realistic Figures',
      definition: 'Ultra-realistic personal sculptures molded integrally with color and structure, utilizing multi-lens 3D scanning and full-color 3D printing.',
      application: 'Upgraded travel photography, family/anniversary collections.',
      audience: 'Hanfu enthusiasts, youth focused on physical memory preservation.',
      material: 'High-toughness full-color photosensitive resin (WJP tech).',
      space2: 'Bases are assigned an L4 sovereign space grid code, logged in the World Model.',
      tech: 'Multi-lens panoramic laser scanning cabins, full-color inkjet 3D printers.',
      extras: 'Includes "Parallel World · Self-Existence Deed Card".',
      price: '¥299 – ¥1999',
      cycle: '3 - 7 Days'
    }
  },
  {
    id: 7,
    image: '/img/7-3D-Pet-Figures.jpeg',
    zh: {
      title: '3D宠物手办',
      definition: '基于少样本图片3D重建大模型，利用高精树脂打印与微喷工艺，完美复刻宠物毛发纹理的情感代偿潮玩手办。',
      application: '宠物纪念、桌面陪伴、高端定制礼品、丧宠情感慰藉。',
      audience: '年轻养宠族（Pet Parents）、需要心理代偿的消费群体。',
      material: '高精度刚性光敏树脂与半人造特质仿真毛发涂层。',
      space2: '提取宠物特征绑定主人的SSSU单元编码，作为硅基专属户籍倒影。',
      tech: '“多视角图生3D”AI算法，SLA超高精度3D打印，人工精修。',
      extras: '附赠《碳基羁绊·数字灵宠原乡回归卡》。',
      price: '¥399 – ¥1599',
      cycle: '5 - 7 天'
    },
    en: {
      title: '3D Pet Figures',
      definition: 'Emotional compensation figures perfectly replicating pet fur textures via Image-to-3D models and high-precision resin printing.',
      application: 'Pet memorials, desktop companionship, premium gifts.',
      audience: 'Pet parents, consumers seeking emotional compensation for lost pets.',
      material: 'Rigid photosensitive resin with semi-synthetic fur texture coating.',
      space2: 'Binds pet traits to the owner\'s SSSU code, serving as a silicon registry reflection.',
      tech: 'Multi-view Image-to-3D AI, SLA 3D printing, manual detailing.',
      extras: 'Includes "Carbon Bond · Digital Pet Hometown Return Card".',
      price: '¥399 – ¥1599',
      cycle: '5 - 7 Days'
    }
  },
  {
    id: 8,
    image: '/img/8-Anime-Game-Figures.jpg',
    zh: {
      title: '动漫游戏手办',
      definition: '将桃花源文化IP与全球流行ACGN风格融合，采用高精度增材制造生产的潮流GK雕像及盲盒。',
      application: '电竞桌面美化、二次元收藏、潮玩盲盒墙。',
      audience: 'Z世代潮玩收藏家、硬核科幻与游戏玩家、年轻极客。',
      material: '工业级红蜡树脂与复合高性能高分子聚合物，适合硬核涂装。',
      space2: '序列号严格对应Space2地址网格（如 MARS-NW-001），象征代码逻辑的具身化。',
      tech: 'DLP/LCD工业级高速3D打印阵列，精密气动喷笔涂装。',
      extras: '附赠《赛博创世·副本接入验证密钥卡》。',
      price: '¥199 – ¥1299',
      cycle: '2 - 4 天'
    },
    en: {
      title: 'Anime & Game Figures',
      definition: 'Trendy GK statues fusing Taohuayuan IP with ACGN styles, manufactured via high-precision additive manufacturing.',
      application: 'Esports desk decor, anime collections, designer toy walls.',
      audience: 'Gen Z collectors, hardcore sci-fi/gaming fans, young geeks.',
      material: 'Industrial red wax resin and composite polymers for sharp painting.',
      space2: 'Serial numbers strictly map to Space2 grids, embodying code logic physically.',
      tech: 'DLP/LCD high-speed 3D printer arrays, precision airbrushing.',
      extras: 'Includes "Cyber Genesis · Instance Access Key Card".',
      price: '¥199 – ¥1299',
      cycle: '2 - 4 Days'
    }
  },
  {
    id: 9,
    image: '/img/9-Miniature-Old-Houses.jpg',
    zh: {
      title: '老屋微缩模型',
      definition: '利用无人机空间扫描技术，将充满乡愁的传统古建等比例数字还原，并3D打印制作的实物模型。',
      application: '家族记忆传承、游子思乡礼品、高端中式空间摆件。',
      audience: '海外华侨与远方游子、古建爱好者、高净值群体。',
      material: '全彩光敏树脂与真实干缩微木构件，还原斑驳岁月感。',
      space2: 'AI还原原址的历史微气候与Lumina光照数据，刻入22位S2-DID物理空间存证。',
      tech: '倾斜摄影点云采集，AI空间算法建模，工业SLA全彩打印，手工造旧。',
      extras: '附赠《深时乡愁·空间物理存证地契》。',
      price: '¥899 – ¥4999',
      cycle: '7 - 14 天'
    },
    en: {
      title: 'Miniature Old Houses',
      definition: 'Nostalgic 1:1 digital reconstructions of traditional architecture via drone scanning, manifested as 3D-printed physical models.',
      application: 'Family heritage, nostalgic gifts, high-end home decor.',
      audience: 'Overseas diaspora, ancient architecture lovers, high-net-worth individuals.',
      material: 'Full-color resin and micro-sliced aged wood components.',
      space2: 'AI reverse-engineers historical microclimates; locked with a 22-character S2-DID as physical proof of space.',
      tech: 'Drone photogrammetry, AI spatial modeling, SLA printing, manual weathering.',
      extras: 'Includes "Deep Time Nostalgia · Spatial Deed".',
      price: '¥899 – ¥4999',
      cycle: '7 - 14 Days'
    }
  },
  {
    id: 10,
    image: '/img/10-Trendy-Cultural-Creations.jpg',
    zh: {
      title: '潮流文创',
      definition: '将大桃花源方言、编程符号与生活小物结合，由AI敏捷设计并秒级柔性打标的快时尚美学物件。',
      application: '年轻人社交伴手礼、办公工位装点、轻文创消费。',
      audience: '注重日常悦己的年轻上班族、喜爱玩梗的学生群体。',
      material: '发光树脂、轻质航空铝、柔性硅胶。',
      space2: '表面雕刻数字快捷码，可溯源是由哪个OPC工作室智造。',
      tech: '高速UV全彩直印机与便携式振镜激光打标机，即来即印。',
      extras: '附赠《赛博生活·趣味玩梗语录卡》。',
      price: '¥39 – ¥129',
      cycle: '5 - 15 分钟 (立等可取)'
    },
    en: {
      title: 'Trendy Cultural Creations',
      definition: 'Fast-fashion aesthetics combining local dialects and programming symbols, AI-designed and laser-marked in seconds.',
      application: 'Social gifts for youth, desk decorations, light cultural consumption.',
      audience: 'Young professionals, students who love internet memes.',
      material: 'Luminous resin, lightweight aluminum, flexible silicone.',
      space2: 'Engraved short-codes allow tracing back to the specific OPC studio that crafted it.',
      tech: 'High-speed UV printers and galvanometer laser markers.',
      extras: 'Includes "Cyber Life · Meme Quote Card".',
      price: '¥39 – ¥129',
      cycle: '5 - 15 Mins (Instant)'
    }
  },
  {
    id: 11,
    image: '/img/11-Micro-landscaping.jpeg',
    zh: {
      title: '桃花源微观造景',
      definition: '将本地天然苔藓与3D打印的微缩机甲/古建结合，在高透器皿中构建的碳硅共生微观生态景观。',
      application: '工位“精神绿洲”、自然解压小品、心理疗愈媒介。',
      audience: '长期面对屏幕的“大厂程序员”、极简室内绿植爱好者。',
      material: '雪峰山脉原生冷地苔藓、微型蕨类、沅江硅砂，环保树脂模型。',
      space2: '模拟微型SSSU单元，计算出低熵水分循环周期，底座刻印专属空间坐标。',
      tech: 'SLA精密打印机输出模型，OPC生态景观师在无尘台微手工造景。',
      extras: '附赠《独乐园·自然生命维持系统托管契约》。',
      price: '¥150 – ¥580',
      cycle: '1 - 3 小时'
    },
    en: {
      title: 'Taohuayuan Micro-landscaping',
      definition: 'Carbon-silicon symbiotic terrariums blending living local moss with 3D-printed miniature mechas or ancient pavilions.',
      application: 'Workspace "spiritual oasis," stress-relief decor, biophilic medium.',
      audience: 'Tech workers facing screens, minimalist indoor plant lovers.',
      material: 'Native cold moss from Xuefeng mountains, Yuan River sand, resin models.',
      space2: 'Simulates a micro SSSU unit; calculates low-entropy water cycles; bases engraved with spatial coordinates.',
      tech: 'SLA precision printing, manual landscaping by OPC ecologists.',
      extras: 'Includes "Solitary Garden · Life Support System Contract".',
      price: '¥150 – ¥580',
      cycle: '1 - 3 Hours'
    }
  },
  {
    id: 12,
    image: '/img/12-AI-Customized-Texture-Art.jpeg',
    zh: {
      title: 'AI定制肌理艺术画',
      definition: '用户输入意象，大模型生成画面，通过特殊立体堆叠打印技术呈现出如厚涂油画般强触觉肌理的实体数字艺术。',
      application: '室内墙面软装、独立工作室艺术挂画、极客高端礼品。',
      audience: '追求“可触摸艺术”的群体、室内设计师、视觉艺术收藏者。',
      material: '重磅亚麻棉画布、含石英砂的立体3D专用乳浆、老桃木外框。',
      space2: '将图像深度图转换为真实物理体积，画框背面激光死锁S2-DID宣告孤品主权。',
      tech: '文生图大模型，多轴立体肌理大画幅3D打印机，精细激光木框雕刻。',
      extras: '附赠《创世艺术家·触觉艺术存证卡》。',
      price: '¥199 – ¥1200',
      cycle: '1 - 2 天'
    },
    en: {
      title: 'AI-Customized Texture Art',
      definition: 'Pioneering physical digital art where AI-generated imagery is materialized via 3D stacking printing, producing strong impasto textures.',
      application: 'Interior wall decor, studio art, premium geek gifts.',
      audience: 'Art collectors, interior designers, individuals seeking "tactile art".',
      material: 'Heavy linen canvas, quartz-sand 3D printing emulsion, old peach wood frames.',
      space2: 'Translates image Depth Maps into physical volumes; back of the frame is laser-locked with S2-DID claiming unique sovereignty.',
      tech: 'Text-to-Image LLMs, large-format multi-axis texture 3D printers, laser engraving.',
      extras: 'Includes "Genesis Artist · Tactile Art Deed Card".',
      price: '¥199 – ¥1200',
      cycle: '1 - 2 Days'
    }
  }
];

export default function CulturalCreativePage() {
  const [lang, setLang] = useState<'zh' | 'en'>('zh');

  const toggleLang = () => {
    setLang((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  return (
    <div className="min-h-screen bg-[#020617] text-gray-100 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
      {/* 动态网格背景 */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* 顶部语言切换悬浮球 */}
      <div className="fixed top-8 right-8 z-50">
        <button 
          onClick={toggleLang}
          className="bg-black/60 backdrop-blur-md border border-emerald-500/30 px-4 py-2 rounded-full font-mono text-xs text-emerald-400 hover:bg-emerald-500/20 transition-all flex items-center gap-2"
        >
          <span>{lang === 'zh' ? 'EN' : '中'}</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        </button>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 sm:py-32">
        
        {/* Hero 区域 */}
        <header className="mb-24 text-center">
          <div className="inline-block mb-4 px-3 py-1 border border-blue-500/30 bg-blue-500/10 rounded-full">
            <span className="text-xs font-mono text-blue-400 tracking-widest uppercase">
              {lang === 'zh' ? 'Space² Creative Industry' : 'Space² Creative Industry'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 via-emerald-200 to-emerald-600">
            {lang === 'zh' ? '桃花源AI文创工艺品' : 'Taohuayuan AI Cultural Crafts'}
          </h1>
          <p className="text-sm sm:text-base text-gray-400 font-mono tracking-widest max-w-3xl mx-auto leading-relaxed">
            {lang === 'zh' 
              ? '定义下一个十年的超级文创物种。依托AI大模型算力、3D打印与微米级激光雕刻，由全球OPC超级个体共同驱动，让硅基算力与碳基自然材质完美碰撞。'
              : 'Defining the ultimate cultural-creative species of the next decade. Driven by global OPC super-individuals, merging AI compute, 3D printing, and laser engraving with carbon-based natural materials.'}
          </p>
        </header>

        {/* 产品列表 */}
        <div className="space-y-32">
          {craftsData.map((item, index) => {
            const data = item[lang];
            const isEven = index % 2 === 0;

            return (
              <section key={item.id} className="relative group">
                <div className={`flex flex-col lg:flex-row gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                  
                  {/* 图片展示区 */}
                  <div className="w-full lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-emerald-500/10 blur-3xl rounded-full transform scale-90 group-hover:bg-emerald-500/20 transition-all duration-700" />
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Image 
                        src={item.image} 
                        alt={data.title}
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index < 3} // 前三张图片优先加载
                      />
                      <div className="absolute inset-0 border border-emerald-500/20 rounded-2xl pointer-events-none" />
                    </div>
                    {/* 数字标号 */}
                    <div className={`absolute top-4 ${isEven ? 'left-4' : 'right-4'} bg-black/60 backdrop-blur-md border border-emerald-500/30 w-10 h-10 flex items-center justify-center rounded-lg font-mono text-emerald-400 font-bold z-10`}>
                      {item.id < 10 ? `0${item.id}` : item.id}
                    </div>
                  </div>

                  {/* 文本信息区 */}
                  <div className="w-full lg:w-1/2 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-100 border-b border-white/10 pb-4">
                      {data.title}
                    </h2>
                    
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {data.definition}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                        <div className="text-emerald-500 mb-1">{lang === 'zh' ? '应用领域' : 'Application'}</div>
                        <div className="text-gray-400">{data.application}</div>
                      </div>
                      <div className="bg-white/5 border border-white/5 p-4 rounded-xl">
                        <div className="text-blue-500 mb-1">{lang === 'zh' ? '目标客户' : 'Audience'}</div>
                        <div className="text-gray-400">{data.audience}</div>
                      </div>
                    </div>

                    <div className="space-y-3 font-mono text-xs text-gray-400">
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2">▶</span> 
                        <span><strong className="text-gray-200">{lang === 'zh' ? '材质:' : 'Material:'}</strong> {data.material}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2">▶</span> 
                        <span><strong className="text-gray-200">{lang === 'zh' ? '底层协议:' : 'Space2 Protocol:'}</strong> {data.space2}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2">▶</span> 
                        <span><strong className="text-gray-200">{lang === 'zh' ? '智造技术:' : 'Technology:'}</strong> {data.tech}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-emerald-500 mr-2">▶</span> 
                        <span><strong className="text-gray-200">{lang === 'zh' ? '附赠确权:' : 'Certification:'}</strong> {data.extras}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[10px] text-gray-500 font-mono tracking-widest">{lang === 'zh' ? '指导价格' : 'PRICE RANGE'}</div>
                        <div className="text-xl font-bold text-emerald-400">{data.price}</div>
                      </div>
                      <div className="w-px h-8 bg-white/10" />
                      <div>
                        <div className="text-[10px] text-gray-500 font-mono tracking-widest">{lang === 'zh' ? '定制周期' : 'DELIVERY CYCLE'}</div>
                        <div className="text-sm font-bold text-gray-200">{data.cycle}</div>
                      </div>
                    </div>

                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* 底部 Call to Action */}
        <section className="mt-40 text-center relative">
          <div className="absolute inset-0 bg-emerald-900/10 blur-[100px] rounded-full" />
          <div className="relative z-10 inline-flex flex-col items-center justify-center p-12 border border-emerald-500/20 bg-black/40 backdrop-blur-sm rounded-3xl w-full max-w-3xl mx-auto shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <h3 className="text-2xl font-bold text-gray-100 mb-4 tracking-widest">
              {lang === 'zh' ? '加入全球智造网络' : 'Join the Global Smart Manufacturing Network'}
            </h3>
            <p className="text-sm text-gray-400 font-mono mb-8 max-w-lg leading-relaxed">
              {lang === 'zh' 
                ? '成为 OPC (一人公司) 创客，开设您的分布式文创工作室。获取全套智造设备授权与全球跨境出海赋能。' 
                : 'Become an OPC (One-Person Company) maker and open your distributed studio. Gain access to smart manufacturing tech and global cross-border e-commerce support.'}
            </p>
            <div className="bg-black/60 border border-emerald-500/30 px-8 py-4 rounded-lg flex items-center gap-4 hover:bg-emerald-500/10 transition-colors cursor-pointer">
              <span className="text-xs text-emerald-500 font-mono uppercase tracking-widest border-r border-emerald-500/30 pr-4">
                {lang === 'zh' ? '创客业务联络' : 'MAKER INQUIRY'}
              </span>
              <a href="mailto:xiangmiles@gmail.com" className="text-lg font-mono text-gray-200 hover:text-emerald-400 transition-colors">
                xiangmiles@gmail.com
              </a>
            </div>
          </div>
        </section>

      </div>

      {/* 页脚 */}
      <footer className="relative z-10 py-12 border-t border-white/5 text-center text-gray-600 text-[10px] tracking-[0.4em] bg-black mt-24">
        <div className="max-w-7xl mx-auto px-8">
          <p className="mb-4 text-emerald-900">S2-SWM: CULTURAL & CREATIVE | PROTOCOL_V2.0</p>
          <p>© 2026 TAOHUAYUAN WORLD MODEL. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
}