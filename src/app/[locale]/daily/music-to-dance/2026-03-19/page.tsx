import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-03-19 | 视频推理机制与音频-视觉对齐新进展",
    overview: [
      "扩散视频模型的推理机制：Chain-of-Steps揭示去噪过程中的多路径探索与自我修正",
      "音频-视觉社交交互基准：SocialOmni为音频驱动的时序控制提供评估框架",
      "混合空间记忆：MosaicMem的patch-and-compose方法提升长视频一致性",
      "相机姿态统一表示：WorldCam的6-DoF控制为视角可控舞蹈生成提供新思路",
      "身份感知联合生成：Identity-as-Presence的跨模态身份注入机制可直接迁移"
    ],
    papers: [
      {
        num: 1,
        tag: "视频推理",
        title: "Chain-of-Steps：扩散视频模型的推理机制新解",
        description: "这篇论文挑战了此前Chain-of-Frames的假设，提出视频推理主要发生在扩散去噪步骤而非帧间。研究发现模型在早期去噪步骤同时探索多个候选解（多路径探索），逐步剪枝次优选择，最终在后期收敛到答案。关键发现包括：工作记忆（保持持久引用）、自我修正（从错误中间解恢复）和感知先于行动（早期步骤建立语义基础）。更关键的是，论文揭示了Diffusion Transformer内部的功能特化——早期层编码密集感知结构，中层执行推理，后期层整合潜在表示。对于music-to-dance任务，这一发现极具启发性：当前3D Audio Attention机制可以在去噪步骤层面重新思考，通过引导模型在特定去噪阶段强化音频-运动对齐，可能显著提升生成质量。论文提出的latent轨迹集成策略也可用于融合多个随机种子的生成结果，改善舞蹈动作的多样性。",
        keyPoints: [
          "推理沿去噪步骤而非帧间进行，早期步骤探索多路径，中期剪枝，后期收敛",
          "DiT内部存在功能特化：早期层感知、中层推理、后期层整合",
          "模型具备工作记忆、自我修正和感知先于行动的涌现能力",
          "latent轨迹集成策略可提升推理质量，无需重新训练"
        ],
        href: "https://arxiv.org/abs/2603.16870",
        paperLink: "Demystifying Video Reasoning"
      },
      {
        num: 2,
        tag: "音频-视觉交互",
        title: "SocialOmni：全模态模型的社交交互能力评估",
        description: "SocialOmni是首个系统评估全模态大语言模型社交交互能力的基准，聚焦三个核心维度：说话人分离与识别（who）、打断时机控制（when）、自然打断生成（how）。该基准包含2000个感知样本和209个交互生成实例，覆盖15个对话领域。研究发现模型在感知准确性和交互生成质量之间存在明显解耦——擅长识别说话人的模型不一定能生成自然的打断。对于music-to-dance任务，SocialOmni的音频分离和时序控制评估框架可直接迁移。特别是when维度（判断何时介入对话）与舞蹈生成中判断何时开始动作转换高度同构。论文揭示的音频-视觉不一致性场景测试方法，也可用于评估音乐-舞蹈对齐的鲁棒性。",
        keyPoints: [
          "首创全模态社交交互评估框架，覆盖who/when/how三个维度",
          "发现感知准确性与交互生成质量存在解耦现象",
          "严格的时序和上下文约束评估实时交互能力",
          "音频-视觉不一致性测试探针可迁移到音乐-舞蹈对齐评估"
        ],
        href: "https://arxiv.org/abs/2603.16859",
        paperLink: "SocialOmni: Benchmarking Audio-Visual Social Interactivity in Omni Models"
      },
      {
        num: 3,
        tag: "空间记忆",
        title: "MosaicMem：混合空间记忆实现可控视频世界模型",
        description: "MosaicMem提出了一种结合显式和隐式空间记忆优势的新机制。该方法将patch提升到3D空间进行可靠定位，同时利用模型原生条件机制保持提示跟随生成能力。核心创新是patch-and-compose接口：在查询视图中空间对齐地组合记忆patch，保留应持续的内容，同时允许模型绘制应演化的内容。论文还提出了PRoPE相机条件机制和两种记忆对齐方法（warped RoPE和warped latent）。对于music-to-dance的长视频生成，MosaicMem的混合记忆机制可直接应用。当前方案在处理长舞蹈序列时面临外观漂移问题，MosaicMem的patch级记忆检索和组合策略可在保持人物身份一致性的同时，允许舞蹈动作的自然演化。此外，PRoPE的相机控制能力可用于生成多视角舞蹈视频。",
        keyPoints: [
          "混合显式-隐式记忆：3D定位+原生条件机制，兼具两者优势",
          "patch-and-compose接口实现选择性记忆保留和动态内容生成",
          "PRoPE相机条件机制提升视角控制能力",
          "支持分钟级导航、记忆-based场景编辑和自回归生成"
        ],
        href: "https://arxiv.org/abs/2603.17117",
        paperLink: "MosaicMem: Hybrid Spatial Memory for Controllable Video World Models"
      },
      {
        num: 4,
        tag: "相机控制",
        title: "WorldCam：相机姿态作为统一几何表示的交互式3D游戏世界",
        description: "WorldCam建立了相机姿态作为统一几何表示的框架，同时实现精确动作控制和长期3D一致性。核心创新包括：基于物理的连续动作空间定义，使用Lie代数表示用户输入，通过矩阵指数映射导出精确的6-DoF相机姿态；相机嵌入模块将Plücker嵌入注入DiT特征；全局相机姿态作为空间索引检索相关历史观测。论文还发布了WorldCam-50h数据集（3000分钟真实人类游戏玩法）。对于music-to-dance，WorldCam的6-DoF相机控制方法可直接迁移用于舞蹈视频的多视角生成。当前方案缺乏精确的视角控制能力，WorldCam的Lie代数动作表示和相机嵌入机制可用于实现用户可控的环绕拍摄、推拉镜头等运镜效果。长期记忆检索机制也有助于保持长舞蹈序列的3D一致性。",
        keyPoints: [
          "Lie代数se(3)表示动作，矩阵指数映射导出精确6-DoF相机姿态",
          "Plücker嵌入通过相机嵌入模块注入DiT中间特征",
          "分层记忆检索：平移位置筛选+旋转方向对齐",
          "渐进式自回归推理支持长程视频生成"
        ],
        href: "https://arxiv.org/abs/2603.16871",
        paperLink: "WorldCam: Interactive Autoregressive 3D Gaming Worlds with Camera Pose as a Unifying Geometric Representation"
      },
      {
        num: 5,
        tag: "身份感知生成",
        title: "Identity-as-Presence：外观与声音个性化的联合音频-视频生成",
        description: "该论文提出了首个统一的外观和声音个性化联合音频-视频生成框架。核心贡献包括：自动化数据策展流程，从原始视频中提取身份标记的音频-视觉对；统一的身份注入机制，通过共享身份嵌入和结构化时空位置嵌入实现视觉和听觉身份控制信号的对齐；解耦参数化的双塔扩散Transformer配合非对称自注意力。多阶段训练策略（单模态身份注入→多模态联合优化→多视角微调）解决了模态差异带来的优化不稳定性。对于music-to-dance任务，这是最直接的迁移论文。身份注入机制可直接用于保持参考人物的外观一致性，而音频-视觉对齐方法可适配为音乐-舞蹈对齐。特别地，多主体场景的身份绑定方法对多人舞蹈生成具有重要参考价值。",
        keyPoints: [
          "自动化数据策展流程构建大规模身份标记音频-视觉数据集",
          "统一身份注入机制：共享嵌入+时空对齐+解耦注意力",
          "多阶段训练策略缓解跨模态优化不稳定性",
          "支持单主体和多主体场景的灵活身份控制"
        ],
        href: "https://arxiv.org/abs/2603.17889",
        paperLink: "Identity as Presence: Towards Appearance and Voice Personalized Joint Audio-Video Generation"
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "统一时空Token评分实现高效视频VLM",
        tag: "效率优化",
        href: "https://arxiv.org/abs/2603.18004",
        description: "STTS通过辅助损失学习时序评分、通过LLM下游梯度学习空间评分，可在整个架构中剪枝50%视觉token，训练和推理效率提升62%，性能仅下降0.7%。对长视频舞蹈生成的效率优化有直接价值。"
      },
      {
        num: 7,
        title: "StereoWorld：相机引导的立体视频生成",
        tag: "立体生成",
        href: "https://arxiv.org/abs/2603.17375",
        description: "StereoWorld提出统一相机帧RoPE和立体感知注意力分解，实现端到端立体视频生成。生成速度提升3倍以上，视角一致性提升5%。多视角舞蹈视频生成可参考其几何一致性保障方法。"
      },
      {
        num: 8,
        title: "重新审视多模态大模型的视频微调",
        tag: "微调策略",
        href: "https://arxiv.org/abs/2603.17541",
        description: "系统研究Video-SFT如何重塑MLLM视觉能力，发现视频性能提升常以静态图像性能下降为代价。提出的Hybrid-Frame策略可缓解这一权衡。对music-to-dance的帧采样策略设计有指导意义。"
      },
      {
        num: 9,
        title: "SparkVSR：稀疏关键帧传播的交互式视频超分",
        tag: "视频增强",
        href: "https://arxiv.org/abs/2603.16864",
        description: "SparkVSR允许用户使用关键帧控制视频超分，通过关键帧条件化的latent-pixel两阶段训练实现。可应用于舞蹈视频的帧插值和细节增强。"
      },
      {
        num: 10,
        title: "Astrolabe：蒸馏自回归视频模型的前向过程强化学习",
        tag: "RL对齐",
        href: "https://arxiv.org/abs/2603.17051",
        description: "Astrolabe提出基于负感知微调的前向过程RL框架，通过流式训练方案扩展到长视频。可用于优化music-to-dance模型的人类偏好对齐，提升生成舞蹈的自然度。"
      },
      {
        num: 11,
        title: "VideoAtlas：对数计算复杂度的长视频导航",
        tag: "长视频理解",
        href: "https://arxiv.org/abs/2603.17948",
        description: "VideoAtlas将视频表示为分层网格，访问深度随视频长度对数增长。Video-RLM架构实现并行探索。对长舞蹈视频的高效处理有参考价值。"
      },
      {
        num: 12,
        title: "V-Co：视觉共去噪的表示对齐研究",
        tag: "表示对齐",
        href: "https://arxiv.org/abs/2603.16792",
        description: "系统研究视觉共去噪的四个关键要素：双流架构、结构化无条件预测、感知漂移混合损失、RMS特征重缩放。可提升music-to-dance生成模型的语义一致性和视觉质量。"
      }
    ],
    observation: "今日论文呈现出几个值得关注的趋势：首先，扩散模型的推理机制正在从宏观的帧级分析深入到微观的去噪步骤级理解，Chain-of-Steps的提出为视频生成模型的内部工作机制提供了全新视角，这对于优化music-to-dance的音频-运动对齐时机具有重要启发。其次，空间记忆技术正在从静态场景向动态场景演进，MosaicMem的patch级混合记忆为长舞蹈视频的一致性保持提供了可行路径。第三，相机控制正从简单的视角切换向精确的6-DoF几何控制发展，WorldCam的Lie代数表示方法为舞蹈视频的多视角生成奠定了理论基础。最后，跨模态身份绑定技术日趋成熟，Identity-as-Presence的统一注入机制为参考人物的外观保持提供了直接可用的技术方案。这些进展共同指向一个趋势：视频生成正在从追求视觉真实感转向追求精确的可控性和长程一致性，这正是music-to-dance任务所需的核心能力。"
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-03-19 | Video Reasoning Mechanisms & Audio-Visual Alignment Advances",
    overview: [
      "Diffusion video model reasoning: Chain-of-Steps reveals multi-path exploration and self-correction during denoising",
      "Audio-visual social interaction benchmark: SocialOmni provides evaluation framework for audio-driven temporal control",
      "Hybrid spatial memory: MosaicMem's patch-and-compose method enhances long video consistency",
      "Unified camera pose representation: WorldCam's 6-DoF control offers new perspectives for view-controllable dance generation",
      "Identity-aware joint generation: Identity-as-Presence's cross-modal identity injection is directly transferable"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Reasoning",
        title: "Chain-of-Steps: New Understanding of Reasoning in Diffusion Video Models",
        description: "This paper challenges the previous Chain-of-Frames hypothesis, proposing that video reasoning primarily occurs along diffusion denoising steps rather than across frames. The study finds that models explore multiple candidate solutions simultaneously in early denoising steps (multi-path exploration), gradually prune suboptimal choices, and finally converge to answers in later steps. Key discoveries include: working memory (maintaining persistent references), self-correction (recovering from incorrect intermediate solutions), and perception before action (early steps establishing semantic grounding). More critically, the paper reveals functional specialization within Diffusion Transformers—early layers encode dense perceptual structure, middle layers execute reasoning, and later layers consolidate latent representations. For music-to-dance tasks, this finding is highly enlightening: the current 3D Audio Attention mechanism could be rethought at the denoising step level, potentially significantly improving generation quality by guiding the model to strengthen audio-motion alignment at specific denoising stages. The latent trajectory ensemble strategy proposed in the paper could also be used to fuse generation results from multiple random seeds, improving dance motion diversity.",
        keyPoints: [
          "Reasoning occurs along denoising steps rather than across frames: early exploration, middle pruning, late convergence",
          "Functional specialization in DiT: early layers perceive, middle layers reason, late layers consolidate",
          "Models exhibit emergent capabilities: working memory, self-correction, and perception before action",
          "Latent trajectory ensemble strategy improves reasoning quality without retraining"
        ],
        href: "https://arxiv.org/abs/2603.16870",
        paperLink: "Demystifying Video Reasoning"
      },
      {
        num: 2,
        tag: "Audio-Visual Interaction",
        title: "SocialOmni: Evaluating Social Interactivity in Omni-Modal Models",
        description: "SocialOmni is the first benchmark to systematically evaluate social interactivity capabilities of omni-modal large language models, focusing on three core dimensions: speaker separation and identification (who), interruption timing control (when), and natural interruption generation (how). The benchmark contains 2,000 perception samples and 209 interaction generation instances across 15 dialogue domains. The study finds a pronounced decoupling between perceptual accuracy and interaction generation quality—models good at speaker identification don't necessarily generate natural interruptions. For music-to-dance tasks, SocialOmni's audio separation and temporal control evaluation framework is directly transferable. Especially, the when dimension (judging when to enter a conversation) is highly isomorphic to judging when to start motion transitions in dance generation. The audio-visual inconsistency testing methods revealed in the paper could also be adapted for evaluating music-dance alignment robustness.",
        keyPoints: [
          "First omni-modal social interaction evaluation framework covering who/when/how dimensions",
          "Discovered decoupling between perceptual accuracy and interaction generation quality",
          "Evaluates real-time interaction capabilities under strict temporal and contextual constraints",
          "Audio-visual inconsistency testing probes transferable to music-dance alignment evaluation"
        ],
        href: "https://arxiv.org/abs/2603.16859",
        paperLink: "SocialOmni: Benchmarking Audio-Visual Social Interactivity in Omni Models"
      },
      {
        num: 3,
        tag: "Spatial Memory",
        title: "MosaicMem: Hybrid Spatial Memory for Controllable Video World Models",
        description: "MosaicMem proposes a new mechanism combining the advantages of explicit and implicit spatial memory. The method lifts patches into 3D space for reliable localization while leveraging the model's native conditioning mechanism to maintain prompt-following generation capability. The core innovation is the patch-and-compose interface: spatially aligned composition of memory patches in the queried view, preserving what should persist while allowing the model to inpaint what should evolve. The paper also proposes PRoPE camera conditioning and two memory alignment methods (warped RoPE and warped latent). For long music-to-dance video generation, MosaicMem's hybrid memory mechanism can be directly applied. Current approaches face appearance drift issues when processing long dance sequences; MosaicMem's patch-level memory retrieval and composition strategy can maintain character identity consistency while allowing natural evolution of dance movements. Additionally, PRoPE's camera control capability can be used for multi-view dance video generation.",
        keyPoints: [
          "Hybrid explicit-implicit memory: 3D localization + native conditioning, combining both advantages",
          "Patch-and-compose interface enables selective memory preservation and dynamic content generation",
          "PRoPE camera conditioning mechanism enhances view control capability",
          "Supports minute-level navigation, memory-based scene editing, and autoregressive generation"
        ],
        href: "https://arxiv.org/abs/2603.17117",
        paperLink: "MosaicMem: Hybrid Spatial Memory for Controllable Video World Models"
      },
      {
        num: 4,
        tag: "Camera Control",
        title: "WorldCam: Camera Pose as Unified Geometric Representation for Interactive 3D Worlds",
        description: "WorldCam establishes a framework using camera pose as a unified geometric representation, simultaneously achieving precise action control and long-term 3D consistency. Core innovations include: physics-based continuous action space definition using Lie algebra to represent user inputs, deriving precise 6-DoF camera poses through matrix exponential mapping; camera embedding module injecting Plücker embeddings into DiT features; global camera poses as spatial indexes to retrieve relevant historical observations. The paper also releases the WorldCam-50h dataset (3,000 minutes of authentic human gameplay). For music-to-dance, WorldCam's 6-DoF camera control methods can be directly transferred for multi-view dance video generation. Current approaches lack precise view control capabilities; WorldCam's Lie algebra action representation and camera embedding mechanisms can be used to implement user-controllable camera movements like orbiting, dolly shots, etc. The long-term memory retrieval mechanism also helps maintain 3D consistency in long dance sequences.",
        keyPoints: [
          "Lie algebra se(3) for action representation, matrix exponential mapping for precise 6-DoF camera poses",
          "Plücker embeddings injected into DiT intermediate features via camera embedding module",
          "Hierarchical memory retrieval: translation position filtering + rotation direction alignment",
          "Progressive autoregressive inference supports long-horizon video generation"
        ],
        href: "https://arxiv.org/abs/2603.16871",
        paperLink: "WorldCam: Interactive Autoregressive 3D Gaming Worlds with Camera Pose as a Unifying Geometric Representation"
      },
      {
        num: 5,
        tag: "Identity-Aware Generation",
        title: "Identity-as-Presence: Joint Audio-Video Generation with Appearance and Voice Personalization",
        description: "This paper proposes the first unified framework for appearance and voice personalized joint audio-video generation. Core contributions include: automated data curation pipeline extracting identity-labeled audio-visual pairs from raw videos; unified identity injection mechanism aligning visual and auditory identity control signals through shared identity embeddings and structured spatiotemporal positional embeddings; decoupled parameterization with asymmetric self-attention in dual-tower diffusion Transformer. Multi-stage training strategy (unimodal identity injection → multimodal joint optimization → multi-view fine-tuning) resolves optimization instability from modality disparities. For music-to-dance tasks, this is the most directly transferable paper. The identity injection mechanism can be directly used to maintain reference character appearance consistency, while the audio-visual alignment methods can be adapted for music-dance alignment. Particularly, the identity binding methods for multi-subject scenarios have important reference value for multi-person dance generation.",
        keyPoints: [
          "Automated data curation pipeline constructs large-scale identity-labeled audio-visual dataset",
          "Unified identity injection: shared embeddings + spatiotemporal alignment + decoupled attention",
          "Multi-stage training strategy mitigates cross-modal optimization instability",
          "Supports flexible identity control for single-subject and multi-subject scenarios"
        ],
        href: "https://arxiv.org/abs/2603.17889",
        paperLink: "Identity as Presence: Towards Appearance and Voice Personalized Joint Audio-Video Generation"
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "Unified Spatio-Temporal Token Scoring for Efficient Video VLMs",
        tag: "Efficiency",
        href: "https://arxiv.org/abs/2603.18004",
        description: "STTS learns temporal scoring through auxiliary loss and spatial scoring through LLM downstream gradients, pruning 50% vision tokens throughout the architecture with 62% efficiency improvement and only 0.7% performance drop. Directly valuable for efficiency optimization in long dance video generation."
      },
      {
        num: 7,
        title: "StereoWorld: Camera-Guided Stereo Video Generation",
        tag: "Stereo Generation",
        href: "https://arxiv.org/abs/2603.17375",
        description: "StereoWorld proposes unified camera-frame RoPE and stereo-aware attention decomposition for end-to-end stereo video generation. 3x faster generation with 5% viewpoint consistency improvement. Multi-view dance video generation can reference its geometric consistency preservation methods."
      },
      {
        num: 8,
        title: "Revisiting Video Fine-Tuning in Multimodal Large Language Models",
        tag: "Fine-tuning",
        href: "https://arxiv.org/abs/2603.17541",
        description: "Systematically studies how Video-SFT reshapes MLLM visual capabilities, finding video performance gains often come at the cost of static image performance degradation. Proposed Hybrid-Frame strategy alleviates this trade-off. Guides frame sampling strategy design for music-to-dance."
      },
      {
        num: 9,
        title: "SparkVSR: Interactive Video Super-Resolution via Sparse Keyframe Propagation",
        tag: "Video Enhancement",
        href: "https://arxiv.org/abs/2603.16864",
        description: "SparkVSR allows users to control video super-resolution using keyframes through keyframe-conditioned latent-pixel two-stage training. Applicable to frame interpolation and detail enhancement for dance videos."
      },
      {
        num: 10,
        title: "Astrolabe: Forward-Process RL for Distilled Autoregressive Video Models",
        tag: "RL Alignment",
        href: "https://arxiv.org/abs/2603.17051",
        description: "Astrolabe proposes forward-process RL framework based on negative-aware fine-tuning, scaling to long videos through streaming training. Can optimize music-to-dance models for human preference alignment, improving generated dance naturalness."
      },
      {
        num: 11,
        title: "VideoAtlas: Navigating Long-Form Video in Logarithmic Compute",
        tag: "Long Video",
        href: "https://arxiv.org/abs/2603.17948",
        description: "VideoAtlas represents video as hierarchical grid with access depth growing logarithmically with video length. Video-RLM architecture enables parallel exploration. Reference value for efficient processing of long dance videos."
      },
      {
        num: 12,
        title: "V-Co: Visual Representation Alignment via Co-Denoising",
        tag: "Representation",
        href: "https://arxiv.org/abs/2603.16792",
        description: "Systematically studies four key ingredients for visual co-denoising: dual-stream architecture, structured unconditional prediction, perceptual-drifting hybrid loss, RMS feature rescaling. Can improve semantic consistency and visual quality of music-to-dance generation models."
      }
    ],
    observation: "Today's papers reveal several noteworthy trends: First, reasoning mechanisms in diffusion models are evolving from macroscopic frame-level analysis to microscopic denoising step-level understanding. The proposal of Chain-of-Steps provides a new perspective on the internal workings of video generation models, offering important insights for optimizing audio-motion alignment timing in music-to-dance. Second, spatial memory technology is evolving from static to dynamic scenes; MosaicMem's patch-level hybrid memory provides a viable path for maintaining consistency in long dance videos. Third, camera control is developing from simple view switching to precise 6-DoF geometric control; WorldCam's Lie algebra representation method lays the theoretical foundation for multi-view dance video generation. Finally, cross-modal identity binding technology is maturing; Identity-as-Presence's unified injection mechanism provides a directly applicable technical solution for maintaining reference character appearance. These advances collectively point to a trend: video generation is shifting from pursuing visual realism to pursuing precise controllability and long-range consistency—precisely the core capabilities required for music-to-dance tasks."
  }
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-19`,
        'en': `/en/daily/music-to-dance/2026-03-19`,
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
      date="2026-03-19"
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
