import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "因果扩散与音频-运动对齐的新进展",
    overview: [
      "CMDM 提出因果运动扩散模型，实现流式长程动作生成",
      "DyaDiT 通过正交化注意力解决双人对话场景下的音频-姿态对齐",
      "世界模型一致性理论为视频生成的时空一致性提供系统框架"
    ],
    papers: [
      {
        num: 1,
        tag: "运动生成",
        title: "CMDM：因果运动扩散模型实现流式动作合成",
        description: "现有动作扩散模型依赖双向注意力，破坏了时间因果性，无法支持实时流式生成；而自回归模型又存在误差累积问题。CMDM 提出 Motion-Language-Aligned Causal VAE (MAC-VAE)，将动作序列编码为时间因果的隐空间表示，并在此之上训练因果扩散 Transformer (Causal-DiT)。关键创新是 frame-wise sampling schedule with causal uncertainty：每帧基于部分去噪的前序帧进行预测，而非等待完整自回归去噪。在 HumanML3D 和 SnapMoGen 上，CMDM 在语义保真度和时间平滑性上超越现有方法，同时推理延迟降低一个数量级。对于 music-to-dance 任务，其因果架构可直接迁移用于音频驱动的流式舞蹈生成，解决当前方案无法实时生成的问题。",
        keyPoints: [
          "MAC-VAE 学习运动-语言对齐的因果隐表示，支持 4× 时间下采样",
          "Causal-DiT 通过因果自注意力实现帧间时序有序去噪",
          "Frame-wise sampling 允许从部分去噪前序帧预测下一帧，实现交互式速率生成"
        ],
        href: "https://arxiv.org/abs/2602.22594",
        paperLink: "Causal Motion Diffusion Models for Autoregressive Motion Generation",
      },
      {
        num: 2,
        tag: "音频-运动对齐",
        title: "DyaDiT：面向双人对话的正交化音频-姿态扩散模型",
        description: "现有手势生成方法通常将单条音频映射到单人动作，忽略了社交语境和双人动态。DyaDiT 针对双人对话场景，提出 Orthogonalization Cross Attention (ORCA) 模块，通过投影消除两条音频流的相互干扰，获得更清晰的音频表示。模型还引入 motion dictionary 编码运动先验，并可选择性地利用对话伙伴的手势生成更协调的响应动作。在 Seamless Interaction 数据集上的实验表明，DyaDiT 在客观指标和用户主观偏好上均超越现有方法。对于 music-to-dance，ORCA 的音频分离思想可借鉴用于处理音乐中的多乐器/多声部结构，而 motion dictionary 机制有助于学习舞蹈风格先验。",
        keyPoints: [
          "ORCA 模块通过正交投影消除双人音频流的语义干扰",
          "Motion dictionary 编码风格感知的手势先验知识",
          "支持关系类型和人格特质等社交语境条件生成"
        ],
        href: "https://arxiv.org/abs/2602.23165",
        paperLink: "DyaDiT: A Multi-Modal Diffusion Transformer for Socially Favorable Dyadic Gesture Generation",
      },
      {
        num: 3,
        tag: "世界模型",
        title: "一致性三元组：世界模型的理论框架",
        description: "当前视频生成模型虽能生成逼真画面，却常出现结构性幻觉、时间不一致和因果违反等问题。本文提出 General World Model 必须满足一致性三元组：Modal Consistency（语义接口）、Spatial Consistency（几何基础）、Temporal Consistency（因果引擎）。其中 Temporal Consistency 强调动态演化应遵循可预测且逻辑合理的轨迹，而非仅追求帧间平滑。作者提出 CoW-Bench 评估基准，测试模型在复杂开放场景下维持三种一致性的能力。对于 music-to-dance 研究，该框架提示：舞蹈动作生成不仅要外观逼真，更要满足音乐-动作因果对齐（节拍触发动作）和物理合理性（人体动力学约束），这是当前扩散模型容易忽视的本质问题。",
        keyPoints: [
          "Temporal Consistency 作为因果引擎，超越帧间平滑追求物理合规",
          "CoW-Bench 统一评估多帧推理和约束满足能力",
          "从 specialized modules 到 unified world simulators 的演进路径"
        ],
        href: "https://arxiv.org/abs/2602.23152",
        paperLink: "The Trinity of Consistency as a Defining Principle for General World Models",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Hybridiff：基于条件引导调度的扩散并行加速",
        tag: "扩散加速",
        href: "https://arxiv.org/abs/2602.21760",
        description: "通过条件/无条件去噪路径的数据并行划分，实现 2.3× 推理加速，可迁移至音乐条件扩散的实时生成场景。",
      },
      {
        num: 5,
        title: "EmbodMocap：野外 4D 人体-场景重建",
        tag: "运动捕捉",
        href: "https://arxiv.org/abs/2602.23205",
        description: "双 iPhone 实现度量级人体运动采集，为舞蹈数据集构建提供低成本野外采集方案。",
      },
      {
        num: 6,
        title: "DPE：诊断驱动的多模态模型迭代训练",
        tag: "训练方法",
        href: "https://arxiv.org/abs/2602.22859",
        description: "通过诊断-生成-强化循环动态调整数据分布，可用于修复音乐-舞蹈生成中的特定失效模式（如节拍偏移）。",
      },
      {
        num: 7,
        title: "GeoWorld：双曲空间世界模型",
        tag: "表示学习",
        href: "https://arxiv.org/abs/2602.23058",
        description: "Hyperbolic JEPA 保持几何层次结构，改善长程预测稳定性，或有助于长舞蹈序列的时序一致性。",
      },
    ],
    observation: "今日论文呈现出一个清晰趋势：视频/运动生成正从「外观逼真」走向「物理因果」。CMDM 的因果扩散架构和 Trinity 框架的因果引擎概念，直指当前 music-to-dance 方法的核心痛点——扩散模型的双向注意力虽能生成漂亮帧，却无法保证音乐节拍与动作 trigger 的因果时序。下一步值得探索：将 CMDM 的 causal diffusion forcing 引入音频条件分支，用显式的音乐 onset 检测替代隐式的 3D Audio Attention，实现真正的节拍因果驱动。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Advances in Causal Diffusion and Audio-Motion Alignment",
    overview: [
      "CMDM proposes causal motion diffusion for streaming long-horizon motion synthesis",
      "DyaDiT addresses audio-pose alignment in dyadic conversations via orthogonalized attention",
      "World model consistency theory provides a systematic framework for spatiotemporal coherence"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "CMDM: Causal Motion Diffusion Enables Streaming Motion Synthesis",
        description: "Existing motion diffusion models rely on bidirectional attention, breaking temporal causality and preventing real-time streaming; autoregressive alternatives suffer from error accumulation. CMDM introduces the Motion-Language-Aligned Causal VAE (MAC-VAE) to encode motion into temporally causal latent representations, upon which a Causal Diffusion Transformer (Causal-DiT) is trained. The key innovation is frame-wise sampling with causal uncertainty: each frame is predicted from partially denoised preceding frames, avoiding full autoregressive denoising. On HumanML3D and SnapMoGen, CMDM surpasses existing methods in semantic fidelity and temporal smoothness while reducing inference latency by an order of magnitude. For music-to-dance, its causal architecture can be directly adapted for audio-driven streaming dance generation, addressing the real-time limitation of current approaches.",
        keyPoints: [
          "MAC-VAE learns motion-language aligned causal latent representations with 4× temporal downsampling",
          "Causal-DiT performs temporally ordered denoising via causal self-attention",
          "Frame-wise sampling enables prediction from partially denoised history for interactive-rate generation"
        ],
        href: "https://arxiv.org/abs/2602.22594",
        paperLink: "Causal Motion Diffusion Models for Autoregressive Motion Generation",
      },
      {
        num: 2,
        tag: "Audio-Motion Alignment",
        title: "DyaDiT: Orthogonalized Audio-Pose Diffusion for Dyadic Interaction",
        description: "Existing gesture generation maps single audio to single-speaker motion, ignoring social context and dyadic dynamics. DyaDiT targets dyadic conversations with the Orthogonalization Cross Attention (ORCA) module, which eliminates interference between two audio streams via projection to obtain cleaner representations. The model also introduces a motion dictionary encoding motion priors and can optionally leverage the partner's gestures for more coordinated responsive motion. Experiments on the Seamless Interaction dataset show DyaDiT outperforms prior methods in both objective metrics and user preference. For music-to-dance, ORCA's audio separation insight can inform handling multi-instrument/multi-vocal structures in music, while the motion dictionary mechanism helps learn dance style priors.",
        keyPoints: [
          "ORCA module disambiguates dual audio streams via orthogonal projection",
          "Motion dictionary encodes style-aware gesture priors",
          "Supports conditioning on social context including relationship types and personality traits"
        ],
        href: "https://arxiv.org/abs/2602.23165",
        paperLink: "DyaDiT: A Multi-Modal Diffusion Transformer for Socially Favorable Dyadic Gesture Generation",
      },
      {
        num: 3,
        tag: "World Models",
        title: "Trinity of Consistency: A Theoretical Framework for World Models",
        description: "Current video generation models produce realistic frames but often exhibit structural hallucinations, temporal inconsistencies, and causality violations. This paper proposes that General World Models must satisfy the Trinity of Consistency: Modal Consistency (semantic interface), Spatial Consistency (geometric basis), and Temporal Consistency (causal engine). Temporal Consistency emphasizes that dynamic evolution should follow predictable, logically sound trajectories rather than mere frame smoothness. The authors introduce CoW-Bench to evaluate models' ability to maintain all three consistencies under complex open-ended scenarios. For music-to-dance research, this framework suggests that dance generation must satisfy not only visual fidelity but also music-motion causal alignment (beats trigger actions) and physical plausibility (human dynamics constraints)—fundamental issues that current diffusion models often overlook.",
        keyPoints: [
          "Temporal Consistency as causal engine: pursuing physical compliance beyond frame smoothness",
          "CoW-Bench unifies evaluation of multi-frame reasoning and constraint satisfaction",
          "Evolution path from specialized modules to unified world simulators"
        ],
        href: "https://arxiv.org/abs/2602.23152",
        paperLink: "The Trinity of Consistency as a Defining Principle for General World Models",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Hybridiff: Conditional Guidance Scheduling for Diffusion Parallelism",
        tag: "Diffusion Acceleration",
        href: "https://arxiv.org/abs/2602.21760",
        description: "Achieves 2.3× inference speedup via data parallelism partitioning of conditional/unconditional denoising paths, applicable to real-time music-conditioned generation.",
      },
      {
        num: 5,
        title: "EmbodMocap: In-the-Wild 4D Human-Scene Reconstruction",
        tag: "Motion Capture",
        href: "https://arxiv.org/abs/2602.23205",
        description: "Dual-iPhone metric-scale human motion capture provides a low-cost in-the-wild data collection approach for dance datasets.",
      },
      {
        num: 6,
        title: "DPE: Diagnostic-Driven Iterative Training for LMMs",
        tag: "Training Methods",
        href: "https://arxiv.org/abs/2602.22859",
        description: "Diagnosis-generation-reinforcement loop dynamically adjusts data distribution, applicable to fixing specific failure modes like beat misalignment in music-dance generation.",
      },
      {
        num: 7,
        title: "GeoWorld: Hyperbolic Space World Models",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2602.23058",
        description: "Hyperbolic JEPA preserves geometric hierarchies and improves long-horizon prediction stability, potentially benefiting temporal coherence in long dance sequences.",
      },
    ],
    observation: "Today's papers reveal a clear trend: video/motion generation is shifting from 'visual realism' to 'physical causality.' CMDM's causal diffusion architecture and the Trinity framework's causal engine concept directly address a core pain point in current music-to-dance methods—diffusion models' bidirectional attention generates beautiful frames but cannot guarantee the causal temporal ordering between music beats and action triggers. A promising next step: adapt CMDM's causal diffusion forcing to the audio conditioning branch, replacing implicit 3D Audio Attention with explicit music onset detection for true beat-causal driving.",
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    alternates: {
      languages: {
        'zh-CN': `/zh/daily/music_to_dance/2026-02-28`,
        'en': `/en/daily/music_to_dance/2026-02-28`,
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout
      locale={locale}
      date="2026-02-28"
      roleId="music_to_dance"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
      <MustRead>
        {c.papers.map((paper) => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <p>{paper.description}</p>
            <KeyPoints points={paper.keyPoints} />
            <PaperLink href={paper.href} title={paper.paperLink} />
          </Paper>
        ))}
      </MustRead>

      <WorthReading>
        {c.worthReading.map((item) => (
          <NotableItem
            key={item.num}
            num={item.num}
            title={item.title}
            tag={item.tag}
            href={item.href}
          >
            {item.description}
          </NotableItem>
        ))}
      </WorthReading>

      {c.observation ? (
        <Observation>
          <p>{c.observation}</p>
        </Observation>
      ) : null}
    </DigestLayout>
  )
}
