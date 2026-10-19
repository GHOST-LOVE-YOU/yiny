import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '逐 Token 视频加速与细粒度音画语义对齐',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'Speculative Forcing 按 token 提前终止去噪，在保持四步生成质量的同时将平均计算降至约 1.7 步',
      'SCR-V2A 显式定位发声相关局部区域，为动作—声音的细粒度时空对应提供反向建模视角',
      'OmniCompass 暴露现有模型在音视频时空定位上的持续短板',
      'Cepheid 将运动残差的结构与物理尺度解耦，增强跨几何类别的运动补全泛化',
    ],
    papers: [
      {
        num: 1,
        tag: '自回归视频 · 逐 Token 加速',
        title: 'Speculative Forcing for Efficient Autoregressive Video Generation',
        keyPoints: [
          '把中间步骤的 clean estimate 视为草稿，并判断每个 token 是否已可安全接受；被接受后即冻结，不再参与后续去噪',
          '提供训练自由与学习式两类验证器；冻结 token 的 KV 缓存仍作为其余 token 的上下文，因此不切断时序依赖',
          '在 LongLive 上以平均约 1.7 个去噪步骤匹配四步生成器，达到 41.7/37.8 FPS、速度提升超过 1.5 倍；在持续相机运动的 Lingbot-World 2.0 上也取得 1.35 倍加速',
        ],
        description: '这项工作直接针对流式舞蹈视频的推理成本：静态背景、已稳定的人体区域和仍需修正的快速肢体可以获得不同计算预算。与整帧或整块统一早停相比，逐 token 接受更适合舞蹈中局部运动复杂度高度不均的场景；保留冻结 token 的 KV 上下文，也有利于维持身份、服饰和已生成动作的连续性。论文尚未针对音乐条件验证，因此下一步应专门测量早停是否会牺牲手脚快速运动以及强拍附近的音画同步。',
        href: 'https://arxiv.org/abs/2610.22347v1',
      },
      {
        num: 2,
        tag: '音画对齐 · 语义关键区域',
        title: 'Semantic-Critical Regions for Video-to-Audio Generation',
        keyPoints: [
          '提出 Semantic-Critical Regions（SCR），显式定位物体运动、局部动态、接触与交互等能够指示声音事件的细粒度视觉证据',
          '通过适配器式双视觉编码，同时保留全局视频上下文与局部发声证据，再以该表示条件化音频生成模型',
          '在域内和域外基准上提升分布匹配与音频质量，并以较少可训练参数保持有竞争力的跨模态对齐表现',
        ],
        description: '虽然任务方向是 video-to-audio，而非 music-to-dance，但它把音画对应从全局条件下沉到“哪个身体部位、哪次接触、哪个时刻产生语义证据”。这一反向视角可迁移到舞蹈生成：从音乐事件预测应被重点约束的身体区域与动作相位，再把局部节拍/语义控制注入运动或视频生成器。尤其对击掌、跺脚、乐器演奏等局部事件，SCR 式定位比单一全局音频嵌入更可能减少语义正确但时序错位的问题。',
        href: 'https://arxiv.org/abs/2610.23021v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding', tag: '音视频评测 · 时空定位', href: 'https://arxiv.org/abs/2610.18829v1', description: '以时间定位、空间定位和问答共同评测音视频理解；50 个模型的结果显示精确时空 grounding 仍是明显短板，可为舞蹈生成的节拍时刻与身体区域一致性设计更严格的诊断协议。' },
      { num: 2, title: 'Cepheid: Decoupling Scale from Structure for Cross-Family Motion Completion', tag: '运动补全 · 跨类别泛化', href: 'https://arxiv.org/abs/2610.18871v1', description: '学习无量纲运动残差结构，再从可观测量估计幅度；无需骨架、配准或跨网格对应即可迁移到未见过的布料与有腿身体，为稀疏舞者控制信号的稠密运动恢复提供可借鉴的尺度解耦思路。' },
    ],
    observation: '本期最清晰的共同线索是把统一处理拆成可验证的局部决策：Speculative Forcing 决定哪些视频 token 已无需继续去噪，SCR-V2A 决定哪些局部视觉区域真正承载声音语义，Cepheid 则把运动结构与幅度分开估计。对 Music-to-Dance 系统，这提示一种更细粒度的架构方向：按身体区域和音乐事件分配条件与算力，同时用独立的时空 grounding 指标检查“何时动、哪里动、为何动”。需要注意，本期没有直接提出音乐到舞蹈生成器的论文，因此只保留方法迁移路径明确、且能被实验结果支持的工作。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Token-Wise Video Acceleration and Fine-Grained Audio-Visual Alignment',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'Speculative Forcing stops denoising per token, reducing average work to about 1.7 steps while preserving four-step quality',
      'SCR-V2A explicitly localizes sound-relevant regions, offering an inverse view of fine-grained motion-sound correspondence',
      'OmniCompass exposes persistent weaknesses in audio-visual temporal and spatial grounding',
      'Cepheid decouples residual motion structure from physical scale for cross-family motion completion',
    ],
    papers: [
      {
        num: 1,
        tag: 'Autoregressive Video · Token-Wise Acceleration',
        title: 'Speculative Forcing for Efficient Autoregressive Video Generation',
        keyPoints: [
          'Treats intermediate clean estimates as drafts and predicts when each token can be accepted safely; accepted tokens are frozen and skip all remaining denoising',
          'Provides both training-free and learned verifiers, while retaining frozen tokens in the KV cache as context for tokens that still need refinement',
          'Matches a four-step LongLive generator with about 1.7 denoising steps per token, reaching 41.7/37.8 FPS and over 1.5x speedup; it also delivers 1.35x speedup on Lingbot-World 2.0 under continual camera motion',
        ],
        description: 'This work directly targets the inference cost of streaming dance video. Static backgrounds, already stable body regions, and fast limbs that still need correction can receive different compute budgets. Token-wise acceptance is better matched than frame- or chunk-level early exit to the highly uneven local motion complexity of dance. Keeping frozen tokens in the KV context can also preserve identity, clothing, and motion continuity. Music conditioning is not evaluated, so a crucial follow-up is to test whether early acceptance harms rapid hand and foot motion or audio-visual synchronization around strong beats.',
        href: 'https://arxiv.org/abs/2610.22347v1',
      },
      {
        num: 2,
        tag: 'Audio-Visual Alignment · Semantic-Critical Regions',
        title: 'Semantic-Critical Regions for Video-to-Audio Generation',
        keyPoints: [
          'Defines Semantic-Critical Regions that localize fine-grained visual evidence for sound events, including object motion, part dynamics, contacts, and interactions',
          'Uses adapter-based dual visual encoding to retain both global video context and localized sound-relevant evidence before conditioning an audio generator',
          'Improves distribution matching and audio quality on in- and out-of-domain benchmarks while remaining competitive in cross-modal alignment with few trainable parameters',
        ],
        description: 'The direction is video-to-audio rather than music-to-dance, but it moves correspondence from a global condition to which body part, contact, and moment carries semantic evidence. The inverse idea can guide dance generation: predict the body regions and motion phases that a musical event should constrain, then inject localized rhythmic or semantic controls into the motion or video generator. For claps, foot strikes, and instrument performance, SCR-style localization may reduce cases that are semantically plausible yet temporally misplaced compared with a single global audio embedding.',
        href: 'https://arxiv.org/abs/2610.23021v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'OmniCompass: A Holistic Benchmark for Omni-Modal Video Grounding and Understanding', tag: 'Audio-Visual Evaluation · Spatiotemporal Grounding', href: 'https://arxiv.org/abs/2610.18829v1', description: 'Jointly evaluates temporal grounding, spatial grounding, and QA. Results across 50 models show that precise spatiotemporal grounding remains difficult, motivating stricter diagnostics for whether generated dance aligns with the right beat and body region.' },
      { num: 2, title: 'Cepheid: Decoupling Scale from Structure for Cross-Family Motion Completion', tag: 'Motion Completion · Cross-Family Generalization', href: 'https://arxiv.org/abs/2610.18871v1', description: 'Learns dimensionless residual motion structure and estimates amplitude from observables. Its transfer to unseen cloth and legged bodies without skeletons, registration, or mesh correspondence suggests a useful scale-decoupling strategy for recovering dense dance motion from sparse controls.' },
    ],
    observation: 'The clearest shared theme is replacing uniform processing with verifiable local decisions. Speculative Forcing decides which video tokens no longer need denoising, SCR-V2A decides which visual regions actually carry sound semantics, and Cepheid estimates motion structure separately from amplitude. For music-to-dance systems, this suggests allocating conditioning and compute by body region and musical event, then auditing when, where, and why motion occurs with separate grounding metrics. No paper in this edition directly introduces a music-to-dance generator, so the selection is limited to experimentally supported work with a concrete transfer path.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-19',
        en: '/en/daily/music-to-dance/2026-10-19',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-19" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
