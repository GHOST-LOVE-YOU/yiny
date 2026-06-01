import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-05-31 | 音视频对齐、实时推理与长序列动态",
    overview: [
      "NAVA提出原生音视频对齐框架，Align-then-Fuse MMDiT架构可直接替换现有3D Audio Attention机制",
      "minWM实现视频扩散模型到少步自回归生成器的完整蒸馏流程，推理延迟降低200倍以上",
      "AdaState用自适应状态替代静态首帧锚点，解决长序列生成中的运动抑制问题"
    ],
    papers: [
      {
        num: 1,
        tag: "音视频生成",
        title: "NAVA：原生音视频对齐的联合生成框架",
        description: "NAVA (Native Audio-Visual Alignment) 针对现有开源音视频生成方法的双塔设计（后期对齐）或完全统一的三模态设计（语义与同步耦合）的缺陷，提出了context-conditioned native audio-visual alignment范式。核心创新Align-then-Fuse MMDiT架构首先在专用交互空间内建立音视频对应关系（通过模态感知的Hierarchical Alignment Layers），然后通过跨注意力注入外部上下文条件，最后过渡到模态共享的Unified Fusion Layers进行协同去噪。这种解耦设计使模型专注于事件级对应和时序一致性学习。Timbre-in-Context Conditioning机制将参考音色嵌入作为上下文条件与特定语音片段绑定，无需额外的说话人控制分支即可实现多说话人音色控制。实验显示NAVA仅用6.3B参数就在Verse-Bench上取得最优的Sync-C (7.791)和Sync-D (7.566)指标，显著优于Ovi、MoVA、LTX等基线。",
        keyPoints: [
          "Align-then-Fuse MMDiT：先对齐后融合的两阶段架构，解耦同步学习与条件控制",
          "Timbre-in-Context Conditioning：通过上下文路径实现片段级音色绑定，支持多说话人",
          "6.3B参数取得SOTA同步性能，模型效率显著优于19B的LTX-2.3"
        ],
        href: "https://arxiv.org/abs/2605.30073",
        paperLink: "Native Audio-Visual Alignment for Generation",
      },
      {
        num: 2,
        tag: "实时视频生成",
        title: "minWM：实时交互视频世界模型的全栈开源框架",
        description: "minWM提供了将双向T2V/TI2V视频基础模型转换为相机可控少步自回归世界模型的端到端方案。两阶段流程：首先通过PRoPE (Projective RoPE) 将相机参数注入双向扩散模型进行可控微调；然后应用Causal Forcing/Causal Forcing++蒸馏流程，包括AR扩散训练、因果ODE/因果一致性蒸馏初始化、以及asymmetric DMD后训练。在Wan2.1-T2V-1.3B上的实验显示，少步AR模型相比多步双向基线实现236.64倍的首帧延迟降低（从269秒降至1.137秒）。框架模块化设计支持跨架构扩展（cross-attention和MMDiT风格），并可将现有世界模型（如HY-WorldPlay）适配到新数据分布和延迟目标。",
        keyPoints: [
          "PRoPE相机控制：通过投影矩阵的RoPE编码实现相机轨迹条件注入",
          "Causal Forcing++蒸馏：三阶段流程（AR训练→因果CD初始化→asymmetric DMD）将多步模型蒸馏为少步生成器",
          "236倍延迟降低：Wan2.1 1.3B模型实现1.137秒首帧延迟，支持实时交互"
        ],
        href: "https://arxiv.org/abs/2605.30263",
        paperLink: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
      },
      {
        num: 3,
        tag: "长序列视频生成",
        title: "AdaState：流式视频生成的自适应锚点机制",
        description: "自回归视频扩散模型在生成长序列时存在结构性问题：首帧KV表示作为静态锚点占据注意力缓存的特权位置，导致模型过度关注初始视角而抑制场景动态演进。AdaState用自适应状态替代静态首帧锚点——这是一个在每帧块中与内容联合去噪但永不渲染的隐藏潜变量。状态通过注意力机制同时读取前一状态缓存和当前内容，生成与场景演进同步的参考表示。关键设计将时间视为相对概念：每个生成步骤看到相同的位置结构，状态转移函数（即去噪操作）在每个块相同。Horizon-Weighted DMD训练策略对越靠后的帧施加越高的损失权重，强制优化器关注依赖状态表示的关键帧。实验显示AdaState在长序列生成中显著改善视频动态性，实现更丰富的运动和自然的场景演进。",
        keyPoints: [
          "自适应状态机制：用可演化的隐藏潜变量替代静态首帧锚点，通过去噪过程更新",
          "相对时间公式：消除绝对时间零点的特权位置，每个块具有相同的状态转移结构",
          "Horizon-Weighted DMD：线性递增的帧级损失权重，优化后期帧的生成质量"
        ],
        href: "https://arxiv.org/abs/2605.30349",
        paperLink: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "YoCausal：从因果性视角评估视频生成与世界模型的差距",
        tag: "视频生成评估",
        href: "https://arxiv.org/abs/2605.30346",
        description: "提出Reverse Surprise Index (RSI) 和Causality Cognition Index (CCI) 两个指标，通过时间反转真实视频作为自然反事实样本，评估视频扩散模型是否真正理解因果性而非仅拟合统计时序模式。",
      },
      {
        num: 5,
        title: "PhyGenHOI：物理感知的动态人物交互4D生成",
        tag: "人物动作生成",
        href: "https://arxiv.org/abs/2605.30268",
        description: "结合Motion Diffusion Model与Material Point Method (MPM) 物理仿真，通过Windowed Attraction Loss和Contact-Driven Re-simulation实现人物与物体的物理一致交互生成。",
      },
      {
        num: 6,
        title: "Colored Noise Diffusion Sampling",
        tag: "扩散采样",
        href: "https://arxiv.org/abs/2605.30332",
        description: "提出频率解耦的彩色噪声采样策略，根据模型固有的谱偏置动态分配注入能量，在SiT-XL/2上将ImageNet-256的FID从8.26降至6.27。",
      },
      {
        num: 7,
        title: "LoMo：面向更深视觉语言融合的局部模态替换",
        tag: "多模态融合",
        href: "https://arxiv.org/abs/2605.30265",
        description: "通过将文本片段动态替换为渲染图像构建交错多模态序列，训练跨模态表示不变性，在13个多模态基准上取得一致提升。",
      },
      {
        num: 8,
        title: "EarlyTom：视觉编码器内的早期Token压缩",
        tag: "视频理解效率",
        href: "https://arxiv.org/abs/2605.30010",
        description: "在视觉编码器内部执行早期token压缩，将LLaVA-OneVision-7B的TTFT降低2.65倍，FLOPs减少61%，同时保持与全token基线相当的精度。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-05-31 | Audio-Visual Alignment, Real-Time Inference & Long-Horizon Dynamics",
    overview: [
      "NAVA proposes native audio-visual alignment with Align-then-Fuse MMDiT architecture as a direct replacement for 3D Audio Attention",
      "minWM achieves 200x+ latency reduction through complete distillation pipeline from bidirectional diffusion to few-step autoregressive generation",
      "AdaState replaces static first-frame anchors with adaptive states to solve motion suppression in long-sequence generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Video Generation",
        title: "NAVA: Native Audio-Visual Alignment Framework for Joint Generation",
        description: "NAVA addresses limitations of existing open-source audio-visual generation methods—dual-tower designs with posterior alignment and fully unified tri-modal designs that couple semantics with synchronization. The core innovation is the context-conditioned native audio-visual alignment paradigm. The Align-then-Fuse MMDiT architecture first establishes audio-video correspondence in a dedicated interaction space (via modality-aware Hierarchical Alignment Layers), then injects external context through cross-attention, and finally transitions to modality-shared Unified Fusion Layers for collaborative denoising. This decoupled design allows the model to focus on event-level correspondence and temporal consistency learning. The Timbre-in-Context Conditioning mechanism embeds reference timbre as context conditions bound to specific speech spans, enabling multi-speaker timbre control without auxiliary speaker-control branches. Experiments show NAVA achieves optimal Sync-C (7.791) and Sync-D (7.566) on Verse-Bench with only 6.3B parameters, significantly outperforming Ovi, MoVA, and LTX baselines.",
        keyPoints: [
          "Align-then-Fuse MMDiT: Two-stage align-then-fuse architecture decouples synchronization learning from conditional control",
          "Timbre-in-Context Conditioning: Segment-level timbre binding through context pathway, supporting multi-speaker generation",
          "6.3B parameters achieve SOTA synchronization performance, significantly more efficient than 19B LTX-2.3"
        ],
        href: "https://arxiv.org/abs/2605.30073",
        paperLink: "Native Audio-Visual Alignment for Generation",
      },
      {
        num: 2,
        tag: "Real-Time Video Generation",
        title: "minWM: Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
        description: "minWM provides an end-to-end solution for converting bidirectional T2V/TI2V foundation models into camera-controllable few-step autoregressive world models. The two-stage pipeline: first, controllable fine-tuning of bidirectional diffusion models via PRoPE (Projective RoPE) camera parameter injection; then applying Causal Forcing/Causal Forcing++ distillation including AR diffusion training, causal ODE/causal consistency distillation initialization, and asymmetric DMD post-training. Experiments on Wan2.1-T2V-1.3B show the few-step AR model achieves 236.64× first-frame latency reduction compared to multi-step bidirectional baseline (from 269s to 1.137s). The modular framework supports cross-architecture extension (cross-attention and MMDiT-style) and can adapt existing world models (e.g., HY-WorldPlay) to new data distributions and latency targets.",
        keyPoints: [
          "PRoPE camera control: Camera trajectory conditioning through projective matrix RoPE encoding",
          "Causal Forcing++ distillation: Three-stage pipeline (AR training → causal CD init → asymmetric DMD) distills multi-step to few-step generator",
          "236× latency reduction: Wan2.1 1.3B achieves 1.137s first-frame latency, enabling real-time interaction"
        ],
        href: "https://arxiv.org/abs/2605.30263",
        paperLink: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
      },
      {
        num: 3,
        tag: "Long-Sequence Video Generation",
        title: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
        description: "Autoregressive video diffusion models face structural issues in long-sequence generation: the first-frame KV representation as a static anchor occupies a privileged position in attention cache, causing over-attention to initial viewpoints and suppression of scene dynamics. AdaState replaces the static first-frame anchor with an adaptive state—a hidden latent jointly denoised with content at each chunk but never rendered. The state reads both previous state cache and current content through attention mechanisms, generating reference representations synchronized with scene evolution. The key design treats time as relative: each generation step sees the same positional structure, with identical state transition functions (i.e., denoising operations) at each chunk. Horizon-Weighted DMD training applies higher loss weights to later frames, forcing the optimizer to focus on critical frames dependent on state representation. Experiments show AdaState significantly improves video dynamics in long-sequence generation, enabling richer motion and natural scene progression.",
        keyPoints: [
          "Adaptive state mechanism: Replace static first-frame anchor with evolvable hidden latent updated through denoising",
          "Relative time formulation: Eliminate privileged absolute time-zero position, each chunk has identical state transition structure",
          "Horizon-Weighted DMD: Linearly increasing frame-level loss weights optimize later-frame generation quality"
        ],
        href: "https://arxiv.org/abs/2605.30349",
        paperLink: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "YoCausal: Evaluating the Gap Between Video Generation and World Models from Causality Perspective",
        tag: "Video Generation Evaluation",
        href: "https://arxiv.org/abs/2605.30346",
        description: "Proposes Reverse Surprise Index (RSI) and Causality Cognition Index (CCI) metrics, using temporally reversed real videos as natural counterfactual samples to evaluate whether video diffusion models truly understand causality or merely fit statistical temporal patterns.",
      },
      {
        num: 5,
        title: "PhyGenHOI: Physically-Aware 4D Generation of Dynamic Human-Object Interactions",
        tag: "Human Motion Generation",
        href: "https://arxiv.org/abs/2605.30268",
        description: "Combines Motion Diffusion Model with Material Point Method (MPM) physics simulation, achieving physically consistent human-object interaction generation through Windowed Attraction Loss and Contact-Driven Re-simulation.",
      },
      {
        num: 6,
        title: "Colored Noise Diffusion Sampling",
        tag: "Diffusion Sampling",
        href: "https://arxiv.org/abs/2605.30332",
        description: "Proposes frequency-decoupled colored noise sampling strategy that dynamically allocates injected energy according to model's inherent spectral bias, improving ImageNet-256 FID from 8.26 to 6.27 on SiT-XL/2.",
      },
      {
        num: 7,
        title: "LoMo: Local Modality Substitution for Deeper Vision-Language Fusion",
        tag: "Multimodal Fusion",
        href: "https://arxiv.org/abs/2605.30265",
        description: "Constructs interleaved multimodal sequences by dynamically replacing text spans with rendered images, training cross-modal representational invariance with consistent gains across 13 multimodal benchmarks.",
      },
      {
        num: 8,
        title: "EarlyTom: Early Token Compression Inside Vision Encoder",
        tag: "Video Understanding Efficiency",
        href: "https://arxiv.org/abs/2605.30010",
        description: "Performs early token compression inside vision encoder, reducing LLaVA-OneVision-7B TTFT by 2.65× and FLOPs by 61% while maintaining accuracy comparable to full-token baseline.",
      },
    ],
    observation: "",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-31`,
        'en': `/en/daily/music-to-dance/2026-05-31`,
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
      date="2026-05-31"
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