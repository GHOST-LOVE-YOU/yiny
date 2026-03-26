import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "音频-视觉同步生成新范式：单流架构与物理感知运动建模",
    overview: [
      "daVinci-MagiHuman 提出单流 Transformer 统一处理音频-视频-文本，2秒生成5秒视频，WER仅14.60%",
      "Spectral Scalpel 和 LaDy 从频域和物理动力学角度增强动作边界检测与运动自然度",
      "RealMaster 的 IC-LoRA 训练策略为参考图外观保持提供新思路，TrajLoom 的轨迹预测支持长程舞蹈生成"
    ],
    papers: [
      {
        num: 1,
        tag: "音频-视频生成",
        title: "daVinci-MagiHuman：单流架构实现高速音频-视觉同步生成",
        description: "daVinci-MagiHuman 采用15B参数的单流 Transformer 架构，将文本、视频和音频统一表示为token序列，通过自注意力机制联合建模。其核心创新包括：Sandwich架构（首尾4层模态特定投影，中间32层共享）、无显式timestep嵌入的降噪设计、以及per-head gating机制。推理阶段结合模型蒸馏（DMD-2）、潜在空间超分辨率和Turbo VAE解码器，实现单张H100上2秒生成5秒256p视频。在TalkVid-Bench上WER仅14.60%，显著优于Ovi 1.1（40.45%）和LTX 2.3（19.23%）。对于music-to-dance任务，其单流设计可直接迁移：将音频节拍token与视频帧统一处理，避免复杂的跨模态对齐模块；多语言支持（中/英/日/韩/德/法）也为舞蹈视频的国际化生成奠定基础。",
        keyPoints: [
          "单流Transformer统一处理文本-视频-音频token，避免多流架构的工程复杂性",
          "2秒生成5秒视频，1080p版本仅需38.4秒，支持实时交互应用",
          "Sandwich架构平衡模态敏感处理与深层多模态融合"
        ],
        href: "https://arxiv.org/abs/2603.21986",
        paperLink: "Speed by Simplicity: A Single-Stream Architecture for Fast Audio-Video Generative Foundation Model",
      },
      {
        num: 2,
        tag: "动作分割 / 频域建模",
        title: "Spectral Scalpel：频域选择性滤波增强动作边界感知",
        description: "针对骨骼动作分割中的类间混淆和边界模糊问题，Spectral Scalpel提出频域选择性滤波框架。其核心洞察是：不同动作的频谱同时包含共享分量和动作特有分量，而时域建模的平滑效应会抹除这些细微差异。方法包含三个组件：(1) Multi-scale Adaptive Spectral Filter (MASF)：通过FFT将时序特征转换到频域，应用多尺度可学习滤波器，再通过逆FFT返回时域；(2) Adjacent Action Discrepancy Loss (AADL)：显式最大化相邻动作段的频谱差异；(3) Frequency-Aware Channel Mixer (FACM)：在频域内聚合通道间的频谱信息。在PKU-MMD v2等五个数据集上取得SOTA。对于music-to-dance，该技术可直接用于改进3D Audio Attention机制：将音频节拍和舞蹈动作的频域表示联合滤波，增强节拍-动作对齐的边界清晰度。",
        keyPoints: [
          "频域滤波显式增强动作特有频率，抑制共享分量，锐化动作边界",
          "AADL损失函数直接优化相邻动作的频谱差异，缓解时域平滑导致的边界模糊",
          "FACM模块在频域内建模通道交互，补充时域注意力机制"
        ],
        href: "https://arxiv.org/abs/2603.24134",
        paperLink: "Spectral Scalpel: Amplifying Adjacent Action Discrepancy via Frequency-Selective Filtering for Skeleton-Based Action Segmentation",
      },
      {
        num: 3,
        tag: "物理动力学 / 动作分割",
        title: "LaDy：拉格朗日动力学引导的骨骼动作分割",
        description: "LaDy首次将拉格朗日动力学引入骨骼动作分割任务。传统方法仅建模运动学（kinematics）而忽略动力学（dynamics），导致动作意图相似的类别难以区分、边界定位不准。LaDy的Lagrangian Dynamics Synthesis (LDS)模块从关节坐标计算广义坐标q、速度q̇和加速度q̈，通过物理约束的神经网络估计惯性矩阵M、科里奥利矩阵C、重力G和摩擦力F，最终合成广义力τ。Energy Consistency Loss (ECLoss)强制满足功能定理：动能变化等于净力做功。估计的动力学特征通过Spatio-Temporal Modulation (STM)模块融合到空间特征，并以功率、扭矩、扭矩变化为信号进行时序门控。在六个STAS数据集上取得SOTA。对于music-to-dance，该框架可用于生成物理合理的舞蹈动作：将音乐节奏映射为虚拟「驱动力」，通过拉格朗日方程约束生成动作的物理合理性。",
        keyPoints: [
          "LDS模块通过物理约束神经网络估计惯性/科里奥利/重力/摩擦力，合成广义力",
          "ECLoss强制功能定理约束，确保动力学特征的物理一致性",
          "STM模块以功率/扭矩/扭矩变化为信号进行时序门控，增强边界感知"
        ],
        href: "https://arxiv.org/abs/2603.24097",
        paperLink: "LaDy: Lagrangian-Dynamic Informed Network for Skeleton-based Action Segmentation via Spatial-Temporal Modulation",
      },
      {
        num: 4,
        tag: "视频编辑 / 外观保持",
        title: "RealMaster：IC-LoRA实现渲染视频到真实视频的精准转换",
        description: "RealMaster解决sim-to-real视频转换中的结构精确性与全局真实感平衡问题。方法分为两阶段：(1) 数据生成：使用Qwen-Image-Edit编辑首尾关键帧作为外观锚点，利用VACE模型基于边缘图条件将真实感传播到中间帧；(2) 模型训练：在Wan2.2 T2V-A14B上微调IC-LoRA（rank=32），将渲染视频作为clean reference token（t=0）与noisy token拼接训练。IC-LoRA的In-Context LoRA设计使模型能从参考视频学习外观映射，推理时无需首尾锚点，支持序列中间出现的新对象。在GTA-V的SAIL-VOS数据集上，ArcFace身份一致性0.473（vs Editto 0.204），DINO结构保真度30.28（越低越好，Editto 41.79）。对于music-to-dance，IC-LoRA策略可直接用于参考人物图的外观保持：将参考图编码为clean token，与noisy视频token联合去噪，实现身份保持的舞蹈生成。",
        keyPoints: [
          "IC-LoRA将参考视频作为clean token注入，实现外观保持的生成",
          "边缘图条件引导的结构保持策略，避免过度编辑导致的身份漂移",
          "稀疏到稠密的传播策略生成配对训练数据，解决sim-to-real数据稀缺问题"
        ],
        href: "https://arxiv.org/abs/2603.23462",
        paperLink: "RealMaster: Lifting Rendered Scenes into Photorealistic Video",
      },
      {
        num: 5,
        tag: "轨迹预测 / 运动生成",
        title: "TrajLoom：稠密轨迹预测支持长程视频生成",
        description: "TrajLoom提出从观测轨迹和视频预测未来轨迹的生成框架。核心创新包括：(1) Grid-Anchor Offset Encoding：将轨迹表示为相对于像素中心锚点的偏移，消除绝对坐标的位置偏差；(2) TrajLoom-VAE：带掩码重建和时空一致性正则化的变分自编码器，将稠密轨迹压缩为紧凑的时空token；(3) TrajLoom-Flow：基于rectified flow的潜在空间生成模型，通过边界提示（将最后一帧历史token复制到未来序列初始化）和on-policy K-step微调实现稳定采样。预测范围从24帧扩展到81帧，在TrajLoomBench上FVMD指标优于WHN。对于music-to-dance，预测的稠密轨迹可作为运动控制信号：将音频节拍特征映射为轨迹生成条件，先生成舞蹈轨迹再引导视频扩散模型，实现更精确的节拍-动作对齐。",
        keyPoints: [
          "Grid-Anchor Offset Encoding将轨迹表示为锚点偏移，减少位置相关偏差",
          "TrajLoom-VAE的时空一致性正则化约束时序平滑性和空间局部一致性",
          "81帧长程预测能力支持生成更长、更连贯的舞蹈序列"
        ],
        href: "https://arxiv.org/abs/2603.22606",
        paperLink: "TrajLoom: Dense Future Trajectory Generation from Video",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Omni-WorldBench：4D世界模型的交互响应评估基准",
        tag: "世界模型 / 评估",
        href: "https://arxiv.org/abs/2603.22212",
        description: "首个系统评估世界模型交互响应能力的基准，其动作-状态对齐评估框架可用于评估music-to-dance生成视频的动作-音乐一致性。",
      },
      {
        num: 7,
        title: "MinerU-Diffusion：扩散解码替代自回归的文档OCR",
        tag: "扩散模型 / 文档理解",
        href: "https://arxiv.org/abs/2603.22458",
        description: "块级扩散解码器实现3.2倍加速，其并行生成思路对长序列舞蹈视频生成有借鉴意义。",
      },
      {
        num: 8,
        title: "RS-SSM：状态空间模型优化视频时序一致性",
        tag: "状态空间模型 / 视频分割",
        href: "https://arxiv.org/abs/2603.24295",
        description: "FGIR遗忘门信息精炼机制可迁移到扩散模型，改善舞蹈视频生成的时间一致性。",
      },
      {
        num: 9,
        title: "WildWorld：450+动作类别的大规模世界建模数据集",
        tag: "数据集 / 动作建模",
        href: "https://arxiv.org/abs/2603.23497",
        description: "108M帧、450+动作、同步骨骼标注，可用于舞蹈动作数据增强和预训练。",
      },
      {
        num: 10,
        title: "UniGRPO：统一RL框架优化视觉生成",
        tag: "强化学习 / 视觉生成",
        href: "https://arxiv.org/abs/2603.23500",
        description: "FlowGRPO和速度场MSE惩罚可改进扩散模型训练稳定性，适用于舞蹈生成模型后训练。",
      },
      {
        num: 11,
        title: "HAM：无需训练的风格迁移注意力调制",
        tag: "风格迁移 / 注意力机制",
        href: "https://arxiv.org/abs/2603.24043",
        description: "GAR全局注意力调节和LAT局部注意力移植可直接用于参考图外观保持。",
      },
      {
        num: 12,
        title: "ThinkJEPA：VLM引导的潜在世界模型",
        tag: "世界模型 / VLM",
        href: "https://arxiv.org/abs/2603.22281",
        description: "双时间路径（密集JEPA分支+稀疏VLM分支）可结合用于舞蹈动作的长程语义规划与细粒度生成。",
      },
      {
        num: 13,
        title: "WorldCache：视频扩散加速缓存策略",
        tag: "推理加速 / 视频扩散",
        href: "https://arxiv.org/abs/2603.22286",
        description: "2.3倍推理加速且保持99.4%质量，对实时舞蹈视频生成有实用价值。",
      },
    ],
    observation: "今日论文呈现两大技术趋势：一是单流架构取代多流/交叉注意力成为多模态生成新范式，daVinci-MagiHuman 和后续工作表明统一token空间+自注意力足以处理音频-视觉-文本对齐，这对简化music-to-dance架构有重要启发；二是物理感知建模重新受到重视，LaDy的拉格朗日动力学和Spectral Scalpel的频域分析分别从物理约束和信号处理角度提升动作质量，提示我们可从「纯数据驱动」转向「物理+数据」联合建模。此外，IC-LoRA和HAM等外观保持技术的成熟，为端到端music-to-dance生成中「身份保持 vs 动作生成」的平衡提供了实用工具。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Audio-Visual Sync Generation: Single-Stream Architecture & Physics-Aware Motion Modeling",
    overview: [
      "daVinci-MagiHuman proposes a single-stream Transformer for unified audio-video-text processing, generating 5s videos in 2s with 14.60% WER",
      "Spectral Scalpel and LaDy enhance action boundary detection and motion naturalness from frequency-domain and physics perspectives",
      "RealMaster's IC-LoRA training strategy offers new insights for reference image appearance preservation, while TrajLoom's trajectory prediction supports long-horizon dance generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Video Generation",
        title: "daVinci-MagiHuman: Single-Stream Architecture for Fast Audio-Visual Synchronized Generation",
        description: "daVinci-MagiHuman adopts a 15B-parameter single-stream Transformer architecture that unifies text, video, and audio as token sequences, jointly modeling them through self-attention. Key innovations include: Sandwich architecture (4 modality-specific layers at each end, 32 shared layers in the middle), timestep-free denoising design, and per-head gating mechanisms. During inference, model distillation (DMD-2), latent-space super-resolution, and Turbo VAE decoder enable generating 5-second 256p videos in 2 seconds on a single H100. On TalkVid-Bench, WER is only 14.60%, significantly outperforming Ovi 1.1 (40.45%) and LTX 2.3 (19.23%). For music-to-dance tasks, this single-stream design can be directly migrated: processing audio beat tokens and video frames uniformly, avoiding complex cross-modal alignment modules; multilingual support (Chinese/English/Japanese/Korean/German/French) also lays the foundation for international dance video generation.",
        keyPoints: [
          "Single-stream Transformer unifies text-video-audio tokens, avoiding engineering complexity of multi-stream architectures",
          "2-second generation for 5-second videos, 1080p version in 38.4 seconds, supporting real-time interactive applications",
          "Sandwich architecture balances modality-sensitive processing with deep multimodal fusion"
        ],
        href: "https://arxiv.org/abs/2603.21986",
        paperLink: "Speed by Simplicity: A Single-Stream Architecture for Fast Audio-Video Generative Foundation Model",
      },
      {
        num: 2,
        tag: "Action Segmentation / Frequency Modeling",
        title: "Spectral Scalpel: Frequency-Selective Filtering for Enhanced Action Boundary Perception",
        description: "Addressing inter-class confusion and boundary blur in skeleton-based action segmentation, Spectral Scalpel proposes a frequency-selective filtering framework. The core insight is that different actions' spectra contain both shared and action-specific components, while temporal modeling's smoothing effect erases these subtle differences. The method comprises three components: (1) Multi-scale Adaptive Spectral Filter (MASF): transforms temporal features to frequency domain via FFT, applies multi-scale learnable filters, then returns to time domain via inverse FFT; (2) Adjacent Action Discrepancy Loss (AADL): explicitly maximizes spectral differences between adjacent action segments; (3) Frequency-Aware Channel Mixer (FACM): aggregates spectral information across channels within the frequency domain. Achieves SOTA on five datasets including PKU-MMD v2. For music-to-dance, this technique can directly improve 3D Audio Attention mechanisms: jointly filtering frequency representations of audio beats and dance actions to enhance beat-action alignment boundary clarity.",
        keyPoints: [
          "Frequency-domain filtering explicitly enhances action-specific frequencies while suppressing shared components, sharpening action boundaries",
          "AADL loss directly optimizes spectral differences between adjacent actions, alleviating boundary blur caused by temporal smoothing",
          "FACM module models channel interactions in frequency domain, complementing temporal attention mechanisms"
        ],
        href: "https://arxiv.org/abs/2603.24134",
        paperLink: "Spectral Scalpel: Amplifying Adjacent Action Discrepancy via Frequency-Selective Filtering for Skeleton-Based Action Segmentation",
      },
      {
        num: 3,
        tag: "Physics Dynamics / Action Segmentation",
        title: "LaDy: Lagrangian Dynamics-Guided Skeleton-Based Action Segmentation",
        description: "LaDy is the first to introduce Lagrangian dynamics into skeleton-based action segmentation. Traditional methods only model kinematics while ignoring dynamics, making categories with similar motion intents hard to distinguish and causing inaccurate boundary localization. LaDy's Lagrangian Dynamics Synthesis (LDS) module computes generalized coordinates q, velocities q̇, and accelerations q̈ from joint coordinates, then estimates inertia matrix M, Coriolis matrix C, gravity G, and friction F through physics-constrained neural networks, finally synthesizing generalized forces τ. Energy Consistency Loss (ECLoss) enforces the work-energy theorem: kinetic energy change equals net force work. Estimated dynamic features are fused into spatial features via Spatio-Temporal Modulation (STM) module, with power, torque, and torque change as signals for temporal gating. Achieves SOTA on six STAS datasets. For music-to-dance, this framework can generate physically plausible dance motions: mapping music rhythms to virtual 'driving forces' and constraining generated motions through Lagrangian equations for physical plausibility.",
        keyPoints: [
          "LDS module estimates inertia/Coriolis/gravity/friction forces through physics-constrained neural networks to synthesize generalized forces",
          "ECLoss enforces work-energy theorem constraints, ensuring physical consistency of dynamic features",
          "STM module uses power/torque/torque change as signals for temporal gating, enhancing boundary awareness"
        ],
        href: "https://arxiv.org/abs/2603.24097",
        paperLink: "LaDy: Lagrangian-Dynamic Informed Network for Skeleton-based Action Segmentation via Spatial-Temporal Modulation",
      },
      {
        num: 4,
        tag: "Video Editing / Appearance Preservation",
        title: "RealMaster: IC-LoRA for Precise Rendered-to-Real Video Translation",
        description: "RealMaster addresses the balance between structural precision and global realism in sim-to-real video translation. The method has two stages: (1) Data generation: uses Qwen-Image-Edit to edit first and last keyframes as appearance anchors, then propagates realism to intermediate frames using VACE model conditioned on edge maps; (2) Model training: fine-tunes IC-LoRA (rank=32) on Wan2.2 T2V-A14B, training with rendered videos as clean reference tokens (t=0) concatenated with noisy tokens. IC-LoRA's In-Context LoRA design enables the model to learn appearance mapping from reference videos, requiring no anchor frames during inference and supporting new objects appearing mid-sequence. On GTA-V's SAIL-VOS dataset, ArcFace identity consistency is 0.473 (vs Editto 0.204), DINO structure fidelity is 30.28 (lower is better, Editto 41.79). For music-to-dance, the IC-LoRA strategy can directly preserve reference person appearance: encoding reference images as clean tokens and jointly denoising with noisy video tokens for identity-preserving dance generation.",
        keyPoints: [
          "IC-LoRA injects reference videos as clean tokens, enabling appearance-preserving generation",
          "Edge-map conditioned structure preservation strategy prevents identity drift from over-editing",
          "Sparse-to-dense propagation strategy generates paired training data, addressing sim-to-real data scarcity"
        ],
        href: "https://arxiv.org/abs/2603.23462",
        paperLink: "RealMaster: Lifting Rendered Scenes into Photorealistic Video",
      },
      {
        num: 5,
        tag: "Trajectory Prediction / Motion Generation",
        title: "TrajLoom: Dense Trajectory Prediction for Long-Horizon Video Generation",
        description: "TrajLoom proposes a generative framework for predicting future trajectories from observed trajectories and video. Core innovations include: (1) Grid-Anchor Offset Encoding: representing trajectories as offsets relative to pixel-center anchors, eliminating position bias from absolute coordinates; (2) TrajLoom-VAE: a variational autoencoder with masked reconstruction and spatiotemporal consistency regularization, compressing dense trajectories into compact spatiotemporal tokens; (3) TrajLoom-Flow: a latent-space generative model based on rectified flow, achieving stable sampling through boundary hints (copying last-frame history tokens to future sequence initialization) and on-policy K-step fine-tuning. Extends prediction horizon from 24 to 81 frames, outperforming WHN on FVMD metrics in TrajLoomBench. For music-to-dance, predicted dense trajectories can serve as motion control signals: mapping audio beat features to trajectory generation conditions, first generating dance trajectories then guiding video diffusion models for more precise beat-action alignment.",
        keyPoints: [
          "Grid-Anchor Offset Encoding represents trajectories as anchor offsets, reducing position-dependent bias",
          "TrajLoom-VAE's spatiotemporal consistency regularization constrains temporal smoothness and spatial local consistency",
          "81-frame long-horizon prediction capability supports generating longer, more coherent dance sequences"
        ],
        href: "https://arxiv.org/abs/2603.22606",
        paperLink: "TrajLoom: Dense Future Trajectory Generation from Video",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Omni-WorldBench: Evaluating Interactive Response in 4D World Models",
        tag: "World Models / Evaluation",
        href: "https://arxiv.org/abs/2603.22212",
        description: "First benchmark systematically evaluating world models' interactive response capabilities; its action-state alignment evaluation framework can assess action-music consistency in music-to-dance generated videos.",
      },
      {
        num: 7,
        title: "MinerU-Diffusion: Diffusion Decoding Replacing Autoregression for Document OCR",
        tag: "Diffusion Models / Document Understanding",
        href: "https://arxiv.org/abs/2603.22458",
        description: "Block-wise diffusion decoder achieves 3.2x speedup; parallel generation approach offers insights for long-sequence dance video generation.",
      },
      {
        num: 8,
        title: "RS-SSM: State Space Models for Video Temporal Consistency",
        tag: "State Space Models / Video Segmentation",
        href: "https://arxiv.org/abs/2603.24295",
        description: "FGIR forgetting gate information refinement mechanism can migrate to diffusion models, improving temporal consistency in dance video generation.",
      },
      {
        num: 9,
        title: "WildWorld: Large-Scale World Modeling Dataset with 450+ Action Categories",
        tag: "Dataset / Action Modeling",
        href: "https://arxiv.org/abs/2603.23497",
        description: "108M frames, 450+ actions, synchronized skeleton annotations; useful for dance motion data augmentation and pretraining.",
      },
      {
        num: 10,
        title: "UniGRPO: Unified RL Framework for Visual Generation",
        tag: "Reinforcement Learning / Visual Generation",
        href: "https://arxiv.org/abs/2603.23500",
        description: "FlowGRPO and velocity field MSE penalty can improve diffusion model training stability, applicable to dance generation model post-training.",
      },
      {
        num: 11,
        title: "HAM: Training-Free Style Transfer via Attention Modulation",
        tag: "Style Transfer / Attention Mechanisms",
        href: "https://arxiv.org/abs/2603.24043",
        description: "GAR global attention regulation and LAT local attention transplantation can be directly used for reference image appearance preservation.",
      },
      {
        num: 12,
        title: "ThinkJEPA: VLM-Guided Latent World Models",
        tag: "World Models / VLM",
        href: "https://arxiv.org/abs/2603.22281",
        description: "Dual-temporal pathway (dense JEPA branch + sparse VLM branch) can be combined for long-horizon semantic planning and fine-grained generation of dance motions.",
      },
      {
        num: 13,
        title: "WorldCache: Acceleration Caching for Video Diffusion",
        tag: "Inference Acceleration / Video Diffusion",
        href: "https://arxiv.org/abs/2603.22286",
        description: "2.3x inference speedup while maintaining 99.4% quality, practically valuable for real-time dance video generation.",
      },
    ],
    observation: "Today's papers reveal two major technical trends: First, single-stream architectures are replacing multi-stream/cross-attention as the new paradigm for multimodal generation. daVinci-MagiHuman and subsequent work demonstrate that unified token space + self-attention is sufficient for audio-visual-text alignment, offering important insights for simplifying music-to-dance architectures. Second, physics-aware modeling is regaining attention—LaDy's Lagrangian dynamics and Spectral Scalpel's frequency-domain analysis improve motion quality from physics constraints and signal processing perspectives respectively, suggesting a shift from 'pure data-driven' to 'physics + data' joint modeling. Additionally, the maturation of appearance preservation techniques like IC-LoRA and HAM provides practical tools for balancing 'identity preservation vs motion generation' in end-to-end music-to-dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-25`,
        'en': `/en/daily/music-to-dance/2026-03-25`,
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
      date="2026-03-25"
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
