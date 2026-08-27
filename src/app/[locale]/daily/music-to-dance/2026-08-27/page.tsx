import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '同步指标可靠性与语义优先的人体动作表示',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'AV 同步指标审计表明，时间偏移、语义相关与人类感知不是同一个评测轴',
      'SeMoCo 将动作语义与运动学细节分层编码，为音乐条件下的组合式动作生成提供新接口',
      'MyoMechanix 用姿态、肌电和动作阶段构建更细粒度的动作质量监督',
      'AffectSim 与 EchoWM 分别拓展了可控人体动作观察和长时程同步音视频生成',
    ],
    papers: [
      {
        num: 1,
        tag: '音视频同步评测 · ECCV 2026 Gen4AVC',
        title: 'What Do Audio-Visual Synchronization Metrics Actually Measure?',
        keyPoints: [
          '在统一可靠性协议下审计 AV-Align、ImageBind AV-relevance、JavisScore 与 Synchformer/DeSync，覆盖受控失真单调性、预处理敏感性、排序不确定性和跨指标一致性',
          'Synchformer/DeSync 对时间偏移最敏感，Kendall tau 达 0.84；ImageBind 与 JavisScore 更接近 PEAVS 人类对齐代理，但相关性仅为 0.20',
          '四类指标相互一致性很低，Krippendorff alpha 仅 0.066，简单线性或 k-NN 融合也未超过最佳单项指标',
          '建议用带置信区间和指标族拆分的 Reliability Card 取代单一同步分数',
        ],
        description: '这篇论文直接改变 Music-to-Dance 的评测设计：节拍偏移检测、动作与音乐的语义匹配、以及观众感受到的协调性不能由一个 sync score 代替。训练时若把单一指标直接用作奖励，还可能针对该指标的盲区过拟合。更稳妥的做法是分别报告时间偏移、内容扰动与人类感知代理，并对排名给出置信区间。',
        href: 'https://arxiv.org/abs/2608.25157v1',
      },
      {
        num: 2,
        tag: '人体动作 Codec · Text-to-Motion',
        title: 'SeMoCo: A Semantic-First Motion Codec for Motion Language Modeling',
        keyPoints: [
          '每个动作 token 由一个语义 token 和一列残差运动学 token 组成，显式区分动作意图与细节重建',
          '双轴生成器沿时间建模语义演化，再自回归细化每个时刻的运动学残差',
          '构建统一为 SOMA 表示的大规模多源 Omega-MotionVerse 数据集',
          '在论文报告的 codec 对比中取得最佳重建精度，并在文本到动作生成上验证 token 的下游有效性',
        ],
        description: 'SeMoCo 为 Music-to-Dance 提供了比纯重建导向 VQ token 更清晰的条件接口。音乐段落、风格和动作类型可以先约束低码率语义轨迹，鼓点、接触和关节细节再进入残差层；这种分层方式有望减少“节拍对了但动作含义漂移”或“语义正确但局部动力学僵硬”的冲突。作者同时公开 tokenizer、generator 与 Hugging Face 资源，便于复现和迁移实验。',
        href: 'https://arxiv.org/abs/2608.24334v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Biomechanically-Grounded Compositional Skilled Activity Understanding and Coaching', tag: '生物力学动作质量 · IJCV', href: 'https://arxiv.org/abs/2608.26094v1', description: 'MyoMechanix 含 7,500+ 个样本、20 类动作和 38 名受试者，同步多视角 RGB、3D 姿态与 sEMG，并按阶段、关键步骤和错误类型组织监督；可启发舞蹈生成中的关节负荷、动作阶段和错误归因评测。' },
      { num: 2, title: 'AffectSim: A Controllable Interactive 3D Simulation Benchmark for Embodied Affective Perception', tag: '情感人体动作 · 交互式 3D 基准', href: 'https://arxiv.org/abs/2608.25664v1', description: '以 27,647 个可重放 episode 覆盖 5 类情感和 57 个场景，可独立改变距离、视角、遮挡与场景几何；其因子化情感动作资产适合检验舞蹈表现力是否能跨镜头条件保持。' },
      { num: 3, title: 'EchoWM: Open and Enterable Omnimodal World Models', tag: '长时程音视频世界模型', href: 'https://arxiv.org/abs/2608.23189v1', description: '联合生成 720p 视频、环境声、音乐和语音，并以统一的相对 6-DoF 轨迹控制第一与第三人称场景；长时程同步和第三人称角色-相机动力学对可交互舞蹈视频有参考价值。' },
    ],
    observation: '今日最重要的信号不是再增加一个生成模型，而是重新拆分 Music-to-Dance 的表示和评测轴。SeMoCo 在表示端将动作语义与运动学残差分开，AV-sync 审计则在评测端证明时间对齐、语义相关和感知协调彼此不可替代。两者结合提示下一阶段实验应采用分层音乐条件，并用多指标 Reliability Card 检查每一层是否真正改善，而不是只追逐一个总分。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Reliable Synchronization Metrics and Semantic-First Human Motion Representations',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'An AV-sync audit shows that temporal offset, semantic relevance, and human perception are distinct evaluation axes',
      'SeMoCo separates motion semantics from kinematic detail, creating a compositional interface for music-conditioned generation',
      'MyoMechanix combines pose, muscle activity, and action phases for finer-grained motion-quality supervision',
      'AffectSim and EchoWM extend controllable human-motion observation and long-horizon synchronized audio-video generation',
    ],
    papers: [
      {
        num: 1,
        tag: 'Audio-Visual Sync Evaluation · ECCV 2026 Gen4AVC',
        title: 'What Do Audio-Visual Synchronization Metrics Actually Measure?',
        keyPoints: [
          'Audits AV-Align, ImageBind AV-relevance, JavisScore, and Synchformer/DeSync under one protocol covering controlled-distortion monotonicity, preprocessing sensitivity, rank uncertainty, and cross-metric agreement',
          'Finds Synchformer/DeSync strongest for temporal offsets at Kendall tau 0.84, while ImageBind and JavisScore better match the PEAVS human-aligned proxy but reach only tau 0.20',
          'Measures very low agreement across metric families at Krippendorff alpha 0.066; simple linear and k-NN fusion do not beat the best individual metric',
          'Recommends a Reliability Card with metric-family breakdowns and confidence intervals instead of one bare synchronization score',
        ],
        description: 'This paper directly changes how a Music-to-Dance system should be evaluated. Beat-offset detection, semantic correspondence between motion and music, and perceived coordination cannot be collapsed into one sync score. Using a single metric as a training reward can also optimize against that instrument\'s blind spots. A stronger protocol reports temporal offset, content disruption, and perceptual proxies separately, with uncertainty on model rankings.',
        href: 'https://arxiv.org/abs/2608.25157v1',
      },
      {
        num: 2,
        tag: 'Human Motion Codec · Text-to-Motion',
        title: 'SeMoCo: A Semantic-First Motion Codec for Motion Language Modeling',
        keyPoints: [
          'Represents each motion token with one semantic token followed by residual kinematic tokens, explicitly separating action intent from reconstruction detail',
          'Uses a dual-axis generator that models semantic progression over time and then autoregressively refines kinematic residuals at each step',
          'Builds Omega-MotionVerse, a large multi-source human-motion dataset unified under the SOMA representation',
          'Reports the best reconstruction accuracy among the compared codecs and strong text-to-motion results with the learned tokens',
        ],
        description: 'SeMoCo gives Music-to-Dance a cleaner conditioning interface than reconstruction-first VQ tokens. Musical sections, style, and action class can constrain a low-rate semantic trajectory, while beats, contacts, and joint detail enter through residual levels. This hierarchy may reduce conflicts where timing is correct but action meaning drifts, or semantics are right but local dynamics remain stiff. The released tokenizer, generator, and Hugging Face artifacts also make transfer experiments practical.',
        href: 'https://arxiv.org/abs/2608.24334v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Biomechanically-Grounded Compositional Skilled Activity Understanding and Coaching', tag: 'Biomechanical Motion Quality · IJCV', href: 'https://arxiv.org/abs/2608.26094v1', description: 'MyoMechanix provides 7,500+ samples across 20 actions and 38 subjects with synchronized multiview RGB, 3D pose, and sEMG, structured by phases, key steps, and error types. It suggests richer supervision for joint loading, dance phases, and error attribution.' },
      { num: 2, title: 'AffectSim: A Controllable Interactive 3D Simulation Benchmark for Embodied Affective Perception', tag: 'Affective Human Motion · Interactive 3D Benchmark', href: 'https://arxiv.org/abs/2608.25664v1', description: 'Its 27,647 replayable episodes span five emotions and 57 scenes while independently varying distance, viewpoint, occlusion, and geometry. The factorized expressive-motion assets can test whether dance affect survives camera changes.' },
      { num: 3, title: 'EchoWM: Open and Enterable Omnimodal World Models', tag: 'Long-Horizon Audio-Visual World Model', href: 'https://arxiv.org/abs/2608.23189v1', description: 'Jointly generates 720p video, environmental sound, music, and speech under a shared relative 6-DoF trajectory interface. Its long-horizon synchronization and third-person camera-character dynamics are relevant to interactive dance video.' },
    ],
    observation: 'The main signal today is not another generation backbone, but a cleaner decomposition of representation and evaluation. SeMoCo separates action semantics from kinematic residuals, while the AV-sync audit demonstrates that temporal alignment, semantic relevance, and perceived coordination are not interchangeable. Together they argue for hierarchical music conditioning paired with a multi-metric Reliability Card, so each layer is tested for real improvement instead of optimizing one aggregate score.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/music-to-dance/2026-08-27',
        en: '/en/daily/music-to-dance/2026-08-27',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-08-27" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>
        {c.papers.map(paper => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <KeyPoints points={paper.keyPoints} />
            <p className="text-[#2C2C24] leading-relaxed">{paper.description}</p>
            <PaperLink href={paper.href} title={paper.title} />
          </Paper>
        ))}
      </MustRead>
      <WorthReading>
        {c.worthReading.map(item => (
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>
            {item.description}
          </NotableItem>
        ))}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
