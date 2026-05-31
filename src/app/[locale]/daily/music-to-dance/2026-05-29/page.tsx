import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "音视频对齐与世界模型：舞蹈生成的新基建",
    overview: [
      "NAVA 提出原生音频-视觉对齐框架，Align-then-Fuse MMDiT 架构实现细粒度音视频协同演化",
      "minWM 提供完整的实时交互式视频世界模型框架，支持少步自回归生成",
      "AdaState 用自适应状态替代静态锚点，解决长视频生成中的动态性退化问题"
    ],
    papers: [
      {
        num: 1,
        tag: "音视频生成",
        title: "NAVA：原生音频-视觉对齐的统一生成框架",
        description: "NAVA 提出了一种全新的音视频联合生成范式——原生音频-视觉对齐（Native Audio-Visual Alignment）。与双塔架构的后验对齐或完全统一的三模态混合设计不同，NAVA 首先在专用的交互空间中建立音频-视频对应关系，然后使用外部上下文条件引导联合去噪过程。其核心 Align-then-Fuse MMDiT 架构先通过模态感知层对齐异构的音视频表示，再通过共享融合层实现紧凑的协同去噪。对于 music-to-dance 任务，这一框架的关键价值在于：它解耦了高层语义条件与底层音视频同步，使模型能够专注于事件级对应关系（如音乐节拍与舞蹈动作的精确对齐）。此外，Timbre-in-Context Conditioning 机制将音色线索作为上下文条件绑定到特定语音片段，这种细粒度的条件控制思路可直接迁移到舞蹈生成中的动作风格控制。",
        keyPoints: [
          "Align-then-Fuse MMDiT：模态感知对齐层 + 统一融合层的渐进式架构",
          "上下文条件解耦：音频-视频在专用同步空间交互，上下文通过交叉注意力注入",
          "速率感知 RoPE 重缩放：解决音视频 token 率不匹配问题",
          "Timbre-in-Context：无需额外分支的音色控制机制"
        ],
        href: "https://arxiv.org/abs/2605.30073",
        paperLink: "Native Audio-Visual Alignment for Generation",
      },
      {
        num: 2,
        tag: "视频世界模型",
        title: "minWM：实时交互式视频世界模型的全栈开源框架",
        description: "minWM 提供了将现有双向 T2V/TI2V 视频基础模型转换为实时交互式世界模型的完整 pipeline。该框架分两阶段：首先通过 PRoPE（Projective RoPE）将相机参数注入双向扩散模型，实现相机可控性；然后通过 Causal Forcing/Causal Forcing++ pipeline（包括 AR 扩散训练、因果 ODE/因果一致性蒸馏初始化、非对称 DMD 后训练）将模型蒸馏为少步自回归生成器。对于舞蹈视频生成，minWM 的价值在于其低延迟 rollout 能力——可将多步推理压缩至极低步数，同时保持长序列的时间一致性。框架已在 Wan2.1-T2V-1.3B 和 HY1.5-TI2V-8B 上验证，覆盖 cross-attention 和 MMDiT 两种架构，具有良好的可扩展性。",
        keyPoints: [
          "PRoPE 相机控制：将相机内外参编码为块对角变换注入自注意力",
          "Causal Forcing++：AR 扩散训练 + 因果一致性蒸馏 + 非对称 DMD 三阶段蒸馏",
          "流式推理支持：适用于实时交互应用的低延迟生成",
          "架构无关：支持 cross-attention 和 MMDiT 两种主流架构"
        ],
        href: "https://arxiv.org/abs/2605.30263",
        paperLink: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
      },
      {
        num: 3,
        tag: "视频生成",
        title: "AdaState：流式视频生成的自适应状态机制",
        description: "自回归视频扩散模型在生成长视频时面临一个结构性问题：第一帧的 KV 表示作为静态锚点占据注意力缓存的特权位置，导致模型过度关注初始帧，抑制视频动态性。AdaState 提出用自适应状态（adaptive state）替代静态锚点——这是一个在每帧都去噪但永不渲染的隐潜变量。模型通过同时关注前一状态和当前内容来生成场景锚点，使参考随生成内容演化。关键洞察是：去噪本身就是递归——自适应状态是通过模型自身的迭代细化更新的隐变量，通过 KV 缓存传递，无需外部模块。此外，horizon-weighted DMD 损失权重随帧索引增加，防止优化器过度关注早期干净帧。对于舞蹈视频生成，这可解决长序列中动作逐渐僵化的问题，实现更丰富的舞蹈动作变化。",
        keyPoints: [
          "自适应状态：每帧去噪但永不渲染的隐潜变量，替代静态第一帧锚点",
          "时间相对性：每个生成步骤看到相同的相对位置结构，无特权时间零点",
          "去噪即递归：状态转移就是扩散模型的迭代细化过程",
          "Horizon-weighted DMD：随帧索引增加的损失权重，改善长序列训练"
        ],
        href: "https://arxiv.org/abs/2605.30349",
        paperLink: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
      },
      {
        num: 4,
        tag: "人体运动生成",
        title: "PhyGenHOI：物理感知的动态人物-物体交互生成",
        description: "PhyGenHOI 解决了生成物理准确且视觉忠实的 4D 人物-物体交互（HOI）问题。框架将人物建模为由 Motion Diffusion Model（MDM）驱动的语义代理，将物体建模为由 Material Point Method（MPM）模拟的物理代理，统一使用 3D Gaussian Splats 表示。三个耦合机制协调交互：（1）Windowed Attraction Loss 通过分析速度曲线识别接触关节和接触帧，引导人体运动拦截物体；（2）接触检测触发 MPM 重模拟，实现物理一致的动量传递；（3）Masked Video-SDS 在接触帧周围注入视频先验增强接触保真度。对于舞蹈生成，其 Windowed Attraction Loss 的速度分析方法可用于识别舞蹈动作中的关键姿态帧，而接触驱动的物理模拟思路可应用于脚步与地面接触的真实性建模。",
        keyPoints: [
          "双代理框架：MDM 驱动的语义代理（人）+ MPM 模拟的物理代理（物）",
          "Windowed Attraction Loss：基于速度曲线识别接触关节和接触帧",
          "接触驱动重模拟：检测碰撞后触发物理一致的动量传递",
          "3DGS-MPM 统一表示：高斯核直接映射为 MPM 粒子"
        ],
        href: "https://arxiv.org/abs/2605.30268",
        paperLink: "PhyGenHOI: Physically-Aware 4D Generation of Dynamic Human-Object Interactions",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "YoCausal：从因果推理角度评估视频生成与世界模型的距离",
        tag: "视频评估",
        href: "https://arxiv.org/abs/2605.30346",
        description: "提出 Reverse Surprise Index（RSI）和 Causality Cognition Index（CCI）两个指标，评估 13 个 SOTA VDM 发现：感知时间箭头不等于理解因果关系。可用于评估舞蹈视频生成模型是否真正理解动作因果。",
      },
      {
        num: 6,
        title: "Colored Noise Diffusion Sampling",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2605.30332",
        description: "基于扩散模型频谱偏置的动态噪声调度策略，将能量更高效地分配到结构未解析的频带。无需训练即可提升采样质量，ImageNet-256 上 SiT-XL/2 的 FID 从 8.26 降至 6.27。",
      },
      {
        num: 7,
        title: "DynaFLIP：三模态动态引导的机器人感知表示",
        tag: "表示学习",
        href: "https://arxiv.org/abs/2605.30350",
        description: "从异构人类和机器人视频中构建图像-语言-3D 流三元组，通过 simplex 体积最小化将运动理解前置到感知层。OOD 场景下提升 +22.5%，可借鉴用于舞蹈动作特征学习。",
      },
      {
        num: 8,
        title: "EarlyTom：视觉编码器早期 Token 压缩",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2605.30010",
        description: "在视觉编码器内部执行早期 token 压缩，TTFT 降低达 2.65 倍，FLOPs 降低 61%。对于实时舞蹈视频生成系统，可显著降低首帧延迟。",
      },
      {
        num: 9,
        title: "GenClaw：代码驱动的智能体图像生成",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2605.30248",
        description: "通过 SVG/HTML/Three.js 代码作为可控中间画布，将图像生成从黑盒转变为分阶段创作流程。其草图-细化思路可借鉴用于舞蹈视频的草图到最终生成。",
      },
    ],
    observation: "本周论文呈现出音视频联合生成从后验对齐向原生对齐演进的趋势。NAVA 的 Align-then-Fuse 架构与 minWM 的 Causal Forcing++ 蒸馏 pipeline 共同指向一个目标：在保持生成质量的同时实现低延迟、高可控的实时生成。对于 music-to-dance 任务，这意味着未来可能实现真正的音乐流进、舞蹈流出的端到端实时系统。此外，AdaState 的自适应状态机制为解决长舞蹈序列生成中的动作僵化问题提供了新思路，而 PhyGenHOI 的物理感知交互生成则为舞蹈中脚步-地面接触的真实性建模提供了可迁移的技术路径。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Audio-Visual Alignment & World Models: New Infrastructure for Dance Generation",
    overview: [
      "NAVA proposes native audio-visual alignment with Align-then-Fuse MMDiT architecture for fine-grained AV co-evolution",
      "minWM provides a complete real-time interactive video world model framework supporting few-step autoregressive generation",
      "AdaState replaces static anchors with adaptive states to address dynamic degradation in long video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Visual Generation",
        title: "NAVA: Native Audio-Visual Alignment for Joint Generation",
        description: "NAVA introduces a new paradigm for joint audio-visual generation—Native Audio-Visual Alignment. Unlike dual-tower posterior alignment or fully unified tri-modal designs, NAVA first establishes audio-video correspondence in a dedicated interaction space, then uses external context to condition the joint denoising process. Its core Align-then-Fuse MMDiT architecture first aligns heterogeneous audio-video representations through modality-aware layers, then applies shared fusion layers for compact collaborative denoising. For music-to-dance tasks, this framework's key value lies in decoupling high-level semantic conditioning from low-level AV synchronization, enabling the model to focus on event-level correspondence (e.g., precise alignment between music beats and dance movements). The Timbre-in-Context Conditioning mechanism binds timbre cues to specific speech spans as contextual conditions, and this fine-grained conditional control approach can be directly transferred to motion style control in dance generation.",
        keyPoints: [
          "Align-then-Fuse MMDiT: Progressive architecture with modality-aware alignment + unified fusion layers",
          "Decoupled context conditioning: AV interact in dedicated sync space, context injected via cross-attention",
          "Rate-aware RoPE rescaling: Solves token rate mismatch between audio and video",
          "Timbre-in-Context: Timbre control without auxiliary branches"
        ],
        href: "https://arxiv.org/abs/2605.30073",
        paperLink: "Native Audio-Visual Alignment for Generation",
      },
      {
        num: 2,
        tag: "Video World Models",
        title: "minWM: Full-Stack Framework for Real-Time Interactive Video World Models",
        description: "minWM provides a complete pipeline for converting existing bidirectional T2V/TI2V foundation models into real-time interactive world models. The framework operates in two phases: first, injecting camera parameters via PRoPE (Projective RoPE) into bidirectional diffusion models for camera controllability; then applying the Causal Forcing/Causal Forcing++ pipeline (AR diffusion training, causal ODE/causal consistency distillation initialization, asymmetric DMD post-training) to distill the model into a few-step autoregressive generator. For dance video generation, minWM's value lies in its low-latency rollout capability—compressing multi-step inference to minimal steps while maintaining temporal consistency over long sequences. The framework has been validated on Wan2.1-T2V-1.3B and HY1.5-TI2V-8B, covering both cross-attention and MMDiT architectures.",
        keyPoints: [
          "PRoPE camera control: Encodes camera intrinsics/extrinsics as block-diagonal transformations injected into self-attention",
          "Causal Forcing++: Three-stage distillation with AR training, causal consistency distillation, and asymmetric DMD",
          "Streaming inference support: Low-latency generation for real-time interactive applications",
          "Architecture-agnostic: Supports both cross-attention and MMDiT architectures"
        ],
        href: "https://arxiv.org/abs/2605.30263",
        paperLink: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
      },
      {
        num: 3,
        tag: "Video Generation",
        title: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
        description: "Autoregressive video diffusion models face a structural problem in long video generation: the first frame's KV representation serves as a static anchor in the attention cache, causing excessive focus on the initial frame and suppressing video dynamics. AdaState proposes replacing the static anchor with an adaptive state—a hidden latent denoised at every frame but never rendered. The model generates scene anchors by attending to both the previous state and current content, allowing the reference to evolve with generated content. The key insight: denoising is itself recurrence—the adaptive state is updated through the model's own iterative refinement, carried via KV cache without external modules. Additionally, horizon-weighted DMD increases loss weights with frame index, preventing the optimizer from over-focusing on early clean frames. For dance video generation, this addresses motion rigidity in long sequences, enabling richer dance movement variation.",
        keyPoints: [
          "Adaptive state: Hidden latent denoised per-frame but never rendered, replacing static first-frame anchor",
          "Temporal relativity: Each generation step sees identical relative position structure, no privileged time zero",
          "Denoising as recurrence: State transition is the diffusion model's iterative refinement process",
          "Horizon-weighted DMD: Loss weights increase with frame index, improving long-sequence training"
        ],
        href: "https://arxiv.org/abs/2605.30349",
        paperLink: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
      },
      {
        num: 4,
        tag: "Human Motion Generation",
        title: "PhyGenHOI: Physically-Aware 4D Human-Object Interaction Generation",
        description: "PhyGenHOI addresses generating physically accurate and visually faithful 4D human-object interactions (HOI). The framework models humans as semantic agents driven by Motion Diffusion Models (MDM) and objects as physical agents simulated via Material Point Method (MPM), unified under 3D Gaussian Splats. Three coupled mechanisms coordinate interaction: (1) Windowed Attraction Loss analyzes velocity curves to identify contact joints and frames, guiding human motion to intercept objects; (2) Contact detection triggers MPM re-simulation for physically consistent momentum transfer; (3) Masked Video-SDS injects video priors around contact frames to enhance fidelity. For dance generation, its velocity-based analysis can identify key pose frames in dance movements, while the contact-driven physics simulation approach can be applied to foot-ground contact realism modeling.",
        keyPoints: [
          "Dual-agent framework: MDM-driven semantic agent (human) + MPM-simulated physical agent (object)",
          "Windowed Attraction Loss: Identifies contact joints and frames based on velocity profiles",
          "Contact-driven re-simulation: Triggers physically consistent momentum transfer upon collision detection",
          "Unified 3DGS-MPM representation: Gaussian kernels directly mapped to MPM particles"
        ],
        href: "https://arxiv.org/abs/2605.30268",
        paperLink: "PhyGenHOI: Physically-Aware 4D Generation of Dynamic Human-Object Interactions",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "YoCausal: How Far is Video Generation from World Model?",
        tag: "Video Evaluation",
        href: "https://arxiv.org/abs/2605.30346",
        description: "Proposes Reverse Surprise Index (RSI) and Causality Cognition Index (CCI) to evaluate 13 SOTA VDMs, finding that perceiving arrow of time ≠ understanding causality. Can be used to evaluate whether dance generation models truly understand action causality.",
      },
      {
        num: 6,
        title: "Colored Noise Diffusion Sampling",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2605.30332",
        description: "Dynamic noise scheduling based on diffusion model spectral bias, allocating energy more efficiently to structurally unresolved frequency bands. Training-free improvement: SiT-XL/2 FID on ImageNet-256 improves from 8.26 to 6.27.",
      },
      {
        num: 7,
        title: "DynaFLIP: Tri-Modal-Dynamics Guided Representation for Robotics",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2605.30350",
        description: "Constructs image-language-3D flow triplets from heterogeneous human and robot videos, pushing motion understanding upstream into perception via simplex volume minimization. +22.5% on OOD scenarios, applicable to dance motion feature learning.",
      },
      {
        num: 8,
        title: "EarlyTom: Early Token Compression for Fast Video Understanding",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2605.30010",
        description: "Performs early token compression inside the vision encoder, reducing TTFT by up to 2.65× and FLOPs by 61%. Can significantly reduce first-frame latency for real-time dance video generation systems.",
      },
      {
        num: 9,
        title: "GenClaw: Code-Driven Agentic Image Generation",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2605.30248",
        description: "Uses SVG/HTML/Three.js code as controllable intermediate canvas, transforming image generation from black-box to staged creation. Its sketch-to-refinement approach can inspire dance video generation pipelines.",
      },
    ],
    observation: "This week's papers show a trend in joint audio-visual generation evolving from 'posterior alignment' toward 'native alignment.' NAVA's Align-then-Fuse architecture and minWM's Causal Forcing++ distillation pipeline both point toward the same goal: achieving low-latency, highly controllable real-time generation while maintaining quality. For music-to-dance tasks, this suggests the possibility of true end-to-end real-time systems with 'music in, dance out' capability. Additionally, AdaState's adaptive state mechanism offers a new approach to addressing motion rigidity in long dance sequence generation, while PhyGenHOI's physics-aware interaction generation provides a transferable technical path for foot-ground contact realism modeling in dance.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-29`,
        'en': `/en/daily/music-to-dance/2026-05-29`,
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
      date="2026-05-29"
      roleId="music-to-dance"
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
