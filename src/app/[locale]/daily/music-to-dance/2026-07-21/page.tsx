import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "视频时序定位与扩散推理对齐：舞蹈生成的新工具",
    overview: [
      "TimeLens2：temporal Wasserstein reward实现精准视频时序定位，可直接改进音频-动作对齐",
      "FlowMimic：pixel-pair warped flow field实现图像到视频的实时编辑数据生成，外观迁移新思路",
      "HOMIE：MLLM集成的人物中心视频个性化，解决参考图身份保持与交互建模难题",
      "ShotPlan：可学习的镜头规划token实现多镜头一致性，长舞蹈视频分段生成新方案",
      "DiFA：Kalman filtering-inspired推理时对齐，即插即用提升扩散采样稳定性"
    ],
    papers: [
      {
        num: 1,
        tag: "视频理解 / 时序定位",
        title: "TimeLens2：多模态LLM的通用视频时序定位",
        description: "视频多模态大模型能描述视频内容，但难以定位证据出现的时间。TimeLens2研究通用视频时序定位任务，模型需在变长视频、不同领域、查询形式和视角中预测证据区间集合。现有训练策略与该集合值任务不匹配：长视频标注依赖脆弱的单遍标注，RL奖励无法区分不重叠预测或需要脆弱的片段匹配。TimeLens2将时序证据作为区间集合处理，提出TimeLens2-93K数据集通过caption派生提议、独立定位、跨代理共识、语义验证和边界精炼构建可靠的多跨度监督。其核心贡献temporal Wasserstein reward计算合并区间支撑上均匀分布的精确一维W1距离，为不相等基数和等价碎片化预测提供密集、无需匹配的反馈。",
        keyPoints: [
          "temporal Wasserstein reward为不相交预测提供密集几何反馈，解决tIoU零值问题",
          "TimeLens2-2B/4B/8B在7个基准上全面超越同规模基线，4B模型超越397B参数的Qwen3.5",
          "多跨度长视频定位能力可直接迁移到music-to-dance的音频节拍-舞蹈动作时间戳对齐"
        ],
        href: "https://arxiv.org/abs/2607.17423",
        paperLink: "TimeLens2: Generalist Video Temporal Grounding with Multimodal LLMs",
      },
      {
        num: 2,
        tag: "视频编辑 / 数据生成",
        title: "FlowMimic：Pixel-pair Warped Flow Field实现视频编辑数据生成",
        description: "当前视频编辑数据收集依赖劳动密集型流程：目标掩码标注、I2V模型合成引入误差、VLM质量过滤。FlowMimic提出pixel-pair 4D temporal warped flow field，可从图像编辑样本实时生成视频编辑样本。核心洞察：模型不需要符合现实世界一致性的视频对，像素级编辑对应关系的时序一致性足以让模型学习时间编辑能力。通过将输入和目标图像视为规范3D网格，构建grid inverse sampling实现像素对在时间中的同步'游走'。此外提出modality mimic generation loss和modality mimic editing loss，将图像模态视为视频模态的特例，通过相互模仿对齐两种模态的输出分布。",
        keyPoints: [
          "pixel-pair temporal warped flow field从图像编辑样本实时生成视频编辑训练数据",
          "modality mimic机制对齐T2I与T2V、I2I与V2V的输出分布，实现统一模态建模",
          "无需掩码输入的编辑区域感知能力，通过sense-related tasks和latent-level/attention-level loss内化"
        ],
        href: "https://arxiv.org/abs/2607.18227",
        paperLink: "FlowMimic: Mask-free Visual Editing and Generation with Pixel-pair Warped Flow Field",
      },
      {
        num: 3,
        tag: "视频个性化 / 人物保持",
        title: "HOMIE：人物中心视频个性化的多模态智能增强",
        description: "人物中心视频个性化(HOCVP)是主题驱动视频生成的核心任务。现有方法面临两个局限：inter-subject个性化难以平衡高保真度与准确的人物-物体交互，尤其是抽象概念如logo；intra-subject参考（如OCR图、多视角输入）缺乏理解隐式对应关系的机制。HOMIE提出更好的MLLM集成策略：保留文本编码器，让MLLM专注于提取参考关系知识。通过Global Multimodal Guidance(GMG)在自注意力查询-键计算阶段注入MLLM全局表示，以及Modality-Reference Embedding(MRE)区分不同模态token并关联intra-subject参考，实现统一框架处理两种场景。",
        keyPoints: [
          "保留文本编码器+MLLM专注于参考关系提取，避免昂贵的重新对齐成本",
          "GMG在自注意力阶段注入MLLM知识，改善时序交互建模和语义推理",
          "MRE显式区分模态token并捕捉intra-subject关联，提升身份保真度"
        ],
        href: "https://arxiv.org/abs/2607.18217",
        paperLink: "HOMIE: Human-object Centric Video Personalization via Multimodal Intelligent Enhancement",
      },
      {
        num: 4,
        tag: "视频生成 / 镜头规划",
        title: "ShotPlan：可学习规划Token的电影级视频生成",
        description: "当前视频生成模型在单镜头生成上表现优异，但在电影级视频生成中受限于缺乏显式镜头规划。ShotPlan提出可学习的规划token，捕获镜头级过渡线索，与原始视频生成token无缝集成以控制过渡时间戳。与标准视频token不同，规划token配备Fractional Temporal Rotary Position Embedding(FRoPE)，可在帧级建模镜头过渡。实验表明ShotPlan显著超越现有电影级视频生成方法，提供更灵活的镜头管理和更强的镜头间一致性。对于music-to-dance任务，跨音乐段落的动作过渡可借鉴镜头过渡建模思路。",
        keyPoints: [
          "可学习规划token捕获镜头级过渡线索，与视频生成token联合建模",
          "FRoPE实现帧级镜头过渡建模，突破标准token的时间分辨率限制",
          "显式镜头规划解决多镜头一致性和叙事连贯性难题"
        ],
        href: "https://arxiv.org/abs/2607.17675",
        paperLink: "ShotPlan: Cinematic Video Generation with Learnable Planning Token",
      },
      {
        num: 5,
        tag: "扩散模型 / 推理优化",
        title: "DiFA：推理时前向过程对齐",
        description: "扩散模型主流推理框架将生成视为数值积分问题，将模型视为精确估计器，忽略了去噪过程的统计不确定性。DiFA提出Forward-Process Aligned Diffusion prediction，将推理时数据预测精炼重新框架为序列状态估计问题。受Kalman filtering启发，DiFA将反向轨迹上的迭代数据预测视为相关观测，根据结构一致性和噪声级兼容性聚合历史预测构建前向对齐的时序共识。为避免时序共识的过平滑趋势，引入deviation guidance机制自适应保留残差细节。在CIFAR-10和ImageNet上，DiFA在FID、IS和FD-DINOv2指标上均取得显著提升。",
        keyPoints: [
          "Kalman filtering-inspired时序共识聚合历史预测，纠正估计漂移",
          "deviation guidance自适应保留残差细节，对抗过平滑",
          "训练无关、求解器兼容，即插即用提升现有扩散采样器性能"
        ],
        href: "https://arxiv.org/abs/2607.17972",
        paperLink: "DiFA: Inference-Time Forward-Process Alignment for Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "FlexiAvatar：任意身体可见性下的统一3D高斯人物Avatar",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2607.19100",
        description: "SMPL-X跟踪+3D高斯点云，显式优化可见区域消除未观察肢体伪影。occlusion-robust跟踪对舞蹈遮挡场景有参考价值。",
      },
      {
        num: 7,
        title: "ReViV：单目第一视角视频的4D重建",
        tag: "4D重建",
        href: "https://arxiv.org/abs/2607.17790",
        description: "统一框架从单目RGB视频重建观察者和场景的4D表示。Masked Generative Egocentric Transformer架构对舞蹈视频时序一致性建模有借鉴意义。",
      },
      {
        num: 8,
        title: "HarmoHOI：外观与3D运动协调的手物交互合成",
        tag: "多视角生成",
        href: "https://arxiv.org/abs/2607.17097",
        description: "Mixture of Multi-view Diffusion Transformer联合建模RGB视频和3D点轨迹。Global Motion Aligning Diffusion确保几何一致性，多视角舞蹈生成可参考。",
      },
      {
        num: 9,
        title: "Audio-Visual Flamingo：长复杂视频的开放音视频智能",
        tag: "音视频理解",
        href: "https://arxiv.org/abs/2607.16107",
        description: "专为长视频设计的音视频LLM，Temporal Audio-Visual Interleaved CoT将推理步骤显式锚定到时间戳。音频-视觉对齐预训练模型基础。",
      },
      {
        num: 10,
        title: "FVAttn：视频生成的自适应稀疏注意力",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2607.16190",
        description: "Top-p路由+运行时负载均衡，Wan2.2 I2V上4.41倍注意力加速。舞蹈视频生成的实时性优化可直接应用。",
      },
      {
        num: 11,
        title: "Apple-π：面向物理定律的Video Thinking基准",
        tag: "物理一致性",
        href: "https://arxiv.org/abs/2607.16401",
        description: "首个将视频模型评估锚定在物理定律的基准。Perception-Formulation-Deduction三阶段协议可评估舞蹈动作的真实性和物理合理性。",
      },
      {
        num: 12,
        title: "Thinking in Video：视频生成器真能推理现实世界吗？",
        tag: "因果推理",
        href: "https://arxiv.org/abs/2607.17523",
        description: "Causal-Generative Dual-Judge评估视频生成器的因果推理能力。检验舞蹈生成模型是否真正理解动作因果关系，而非仅记忆外观。",
      },
      {
        num: 13,
        title: "PhyParam：显式物理参数控制的视频生成",
        tag: "物理控制",
        href: "https://arxiv.org/abs/2607.18924",
        description: "physical-attention routing机制条件化于力、质量、摩擦等物理属性。舞蹈动作力度控制可参考此机制。",
      },
    ],
    observation: "今日论文呈现出一个明确的技术路径：music-to-dance任务的核心瓶颈——音频-动作时序对齐、参考人物外观保持、长视频一致性——正在通过更精细的时序建模和更智能的模态融合被逐步攻克。TimeLens2的temporal Wasserstein reward提供了精确的时序定位信号，可直接改进3D Audio Attention机制；HOMIE的MLLM集成策略为参考图特征提取提供了新思路，其GMG和MRE机制可缓解人物身份漂移问题；FlowMimic的modality mimic思想则暗示了音频-视频模态统一建模的可能性。这些技术点的组合，正推动舞蹈视频生成从'能生成'向'生成得好且可控'演进。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Video Temporal Grounding & Diffusion Inference Alignment: New Tools for Dance Generation",
    overview: [
      "TimeLens2: Temporal Wasserstein reward enables precise video temporal grounding, directly improving audio-motion alignment",
      "FlowMimic: Pixel-pair warped flow field for real-time video editing data generation from images, new approach for appearance transfer",
      "HOMIE: MLLM-integrated human-centric video personalization, solving reference image identity preservation and interaction modeling",
      "ShotPlan: Learnable planning tokens for multi-shot consistency, new solution for long dance video segmented generation",
      "DiFA: Kalman filtering-inspired inference-time alignment, plug-and-play improvement for diffusion sampling stability"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Understanding / Temporal Grounding",
        title: "TimeLens2: Generalist Video Temporal Grounding with Multimodal LLMs",
        description: "Video multimodal large language models can describe video content but struggle to locate when evidence appears. TimeLens2 studies generalist video temporal grounding where models predict sets of evidence intervals across variable video lengths, domains, query forms, and viewpoints. Existing training strategies mismatch this set-valued task: long-video labels rely on brittle one-pass annotation, while RL rewards fail to distinguish non-overlapping predictions or require fragile segment matching. TimeLens2 treats temporal evidence as interval sets, proposing TimeLens2-93K dataset with caption-derived proposals, independent localization, cross-agent consensus, semantic verification, and boundary refinement. The core temporal Wasserstein reward computes exact one-dimensional W1 distance between uniform distributions over merged interval supports, providing dense, matching-free feedback for unequal cardinality and equivalent fragmentation.",
        keyPoints: [
          "Temporal Wasserstein reward provides dense geometric feedback for disjoint predictions, solving tIoU zero-value problem",
          "TimeLens2-2B/4B/8B comprehensively surpass same-scale baselines on 7 benchmarks, 4B model exceeds 397B Qwen3.5",
          "Multi-span long-video localization capability directly transferable to music-to-dance audio beat-dance motion timestamp alignment"
        ],
        href: "https://arxiv.org/abs/2607.17423",
        paperLink: "TimeLens2: Generalist Video Temporal Grounding with Multimodal LLMs",
      },
      {
        num: 2,
        tag: "Video Editing / Data Generation",
        title: "FlowMimic: Pixel-pair Warped Flow Field for Video Editing Data Generation",
        description: "Current video editing data collection relies on labor-intensive pipelines: object mask annotation, I2V model synthesis introducing errors, VLM quality filtering. FlowMimic proposes pixel-pair 4D temporal warped flow field to generate video editing samples in real-time from image editing samples. Core insight: models don't need video pairs with real-world consistency; pixel-level editing correspondence temporal consistency suffices for learning temporal editing. By treating input and target images as canonical 3D grids, grid inverse sampling enables pixel pairs to synchronously 'walk' through time. Additionally proposes modality mimic generation loss and modality mimic editing loss, treating image modality as special case of video modality, aligning output distributions through mutual imitation.",
        keyPoints: [
          "Pixel-pair temporal warped flow field generates video editing training data in real-time from image editing samples",
          "Modality mimic mechanism aligns T2I with T2V, I2I with V2V output distributions, enabling unified modality modeling",
          "Mask-free editing region awareness through sense-related tasks and latent-level/attention-level loss internalization"
        ],
        href: "https://arxiv.org/abs/2607.18227",
        paperLink: "FlowMimic: Mask-free Visual Editing and Generation with Pixel-pair Warped Flow Field",
      },
      {
        num: 3,
        tag: "Video Personalization / Identity Preservation",
        title: "HOMIE: Human-centric Video Personalization via Multimodal Intelligent Enhancement",
        description: "Human-object centric video personalization (HOCVP) is core to subject-driven video generation. Existing methods face two limitations: inter-subject personalization struggles to balance high fidelity with accurate human-object interactions, especially abstract concepts like logos; intra-subject references (OCR maps, multi-view inputs) lack mechanisms to understand implicit correspondences. HOMIE proposes better MLLM integration: preserve text encoder, let MLLM focus on extracting reference relationship knowledge. Through Global Multimodal Guidance (GMG) injecting MLLM global representations during self-attention query-key computation, and Modality-Reference Embedding (MRE) distinguishing modality tokens and associating intra-subject references, achieves unified framework for both scenarios.",
        keyPoints: [
          "Preserve text encoder + MLLM focuses on reference relationship extraction, avoiding expensive realignment costs",
          "GMG injects MLLM knowledge during self-attention stage, improving temporal interaction modeling and semantic reasoning",
          "MRE explicitly distinguishes modality tokens and captures intra-subject associations, improving identity fidelity"
        ],
        href: "https://arxiv.org/abs/2607.18217",
        paperLink: "HOMIE: Human-object Centric Video Personalization via Multimodal Intelligent Enhancement",
      },
      {
        num: 4,
        tag: "Video Generation / Shot Planning",
        title: "ShotPlan: Cinematic Video Generation with Learnable Planning Tokens",
        description: "Current video generation models excel at single-shot generation but are limited in cinematic video generation by lack of explicit shot planning. ShotPlan proposes learnable planning tokens that capture shot-level transition cues, seamlessly integrating with original video generation tokens to control transition timestamps. Unlike standard video tokens, planning tokens are equipped with Fractional Temporal Rotary Position Embedding (FRoPE), enabling shot transitions to be modeled at frame level. Experiments show ShotPlan significantly outperforms existing cinematic video generation methods, offering more flexible shot management and stronger inter-shot consistency. For music-to-dance, cross-music-segment motion transitions can借鉴 shot transition modeling approaches.",
        keyPoints: [
          "Learnable planning tokens capture shot-level transition cues, jointly modeling with video generation tokens",
          "FRoPE enables frame-level shot transition modeling, breaking standard token temporal resolution limits",
          "Explicit shot planning solves multi-shot consistency and narrative coherence challenges"
        ],
        href: "https://arxiv.org/abs/2607.17675",
        paperLink: "ShotPlan: Cinematic Video Generation with Learnable Planning Token",
      },
      {
        num: 5,
        tag: "Diffusion Models / Inference Optimization",
        title: "DiFA: Inference-Time Forward-Process Alignment for Diffusion Models",
        description: "Mainstream diffusion model inference frameworks treat generation as numerical integration, viewing models as exact estimators while ignoring denoising process statistical uncertainty. DiFA proposes Forward-Process Aligned Diffusion prediction, reframing inference-time data prediction refinement as sequential state estimation. Inspired by Kalman filtering, DiFA treats iterative data predictions along reverse trajectory as correlated observations, aggregating historical predictions according to structural consistency and noise-level compatibility to build forward-aligned temporal consensus. To avoid over-smoothing, introduces deviation guidance mechanism to adaptively preserve residual details. On CIFAR-10 and ImageNet, DiFA achieves significant improvements on FID, IS, and FD-DINOv2 metrics.",
        keyPoints: [
          "Kalman filtering-inspired temporal consensus aggregates historical predictions, correcting estimation drift",
          "Deviation guidance adaptively preserves residual details, combating over-smoothing",
          "Training-free, solver-compatible, plug-and-play improvement for existing diffusion samplers"
        ],
        href: "https://arxiv.org/abs/2607.17972",
        paperLink: "DiFA: Inference-Time Forward-Process Alignment for Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "FlexiAvatar: Unified 3D Gaussian Human Avatars Under Arbitrary Body Visibility",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2607.19100",
        description: "SMPL-X tracking + 3D Gaussian splatting, explicitly optimizing visible regions to eliminate unobserved limb artifacts. Occlusion-robust tracking valuable for dance occlusion scenarios.",
      },
      {
        num: 7,
        title: "ReViV: Reconstructing Viewer and View in 4D from Monocular Egocentric Video",
        tag: "4D Reconstruction",
        href: "https://arxiv.org/abs/2607.17790",
        description: "Unified framework reconstructing 4D representation of both viewer and scene from monocular RGB video. Masked Generative Egocentric Transformer architecture informative for dance video temporal consistency modeling.",
      },
      {
        num: 8,
        title: "HarmoHOI: Harmonizing Appearance and 3D Motion for Multi-view Hand-Object Interaction Synthesis",
        tag: "Multi-view Generation",
        href: "https://arxiv.org/abs/2607.17097",
        description: "Mixture of Multi-view Diffusion Transformer jointly models RGB videos and 3D point tracks. Global Motion Aligning Diffusion ensures geometric consistency, referenceable for multi-view dance generation.",
      },
      {
        num: 9,
        title: "Audio-Visual Flamingo: Open Audio-Visual Intelligence for Long and Complex Videos",
        tag: "Audio-Visual Understanding",
        href: "https://arxiv.org/abs/2607.16107",
        description: "AV-LLM designed for long videos, Temporal Audio-Visual Interleaved CoT explicitly anchors reasoning steps to timestamps. Foundation for audio-visual alignment pretraining models.",
      },
      {
        num: 10,
        title: "FVAttn: Adaptive Sparse Attention for Video Generation",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2607.16190",
        description: "Top-p routing + runtime load balancing, 4.41x attention speedup on Wan2.2 I2V. Directly applicable for real-time optimization in dance video generation.",
      },
      {
        num: 11,
        title: "Apple-π: Benchmarking Thinking with Video Towards Law-Grounded Physical Intelligence",
        tag: "Physical Consistency",
        href: "https://arxiv.org/abs/2607.16401",
        description: "First benchmark anchoring video model evaluation in physical laws. Perception-Formulation-Deduction three-stage protocol can evaluate authenticity and physical plausibility of dance motions.",
      },
      {
        num: 12,
        title: "Thinking in Video: Can Video Generators Really Reason About the Real World?",
        tag: "Causal Reasoning",
        href: "https://arxiv.org/abs/2607.17523",
        description: "Causal-Generative Dual-Judge evaluates video generator causal reasoning capabilities. Tests whether dance generation models truly understand motion causality versus merely memorizing appearances.",
      },
      {
        num: 13,
        title: "PhyParam: Learning Explicit Physical Parameter Control for Video Generation",
        tag: "Physical Control",
        href: "https://arxiv.org/abs/2607.18924",
        description: "Physical-attention routing mechanism conditioned on force, mass, friction properties. Dance motion intensity control can reference this mechanism.",
      },
    ],
    observation: "Today's papers reveal a clear technical trajectory: the core bottlenecks of music-to-dance tasks—audio-motion temporal alignment, reference person appearance preservation, and long video consistency—are being progressively addressed through finer temporal modeling and smarter modality fusion. TimeLens2's temporal Wasserstein reward provides precise temporal localization signals that can directly improve 3D Audio Attention mechanisms; HOMIE's MLLM integration strategy offers new approaches for reference image feature extraction, with its GMG and MRE mechanisms alleviating identity drift issues; FlowMimic's modality mimic concept hints at the possibility of unified audio-video modality modeling. The combination of these technical points is pushing dance video generation from 'can generate' toward 'generates well and controllably'.",
  },
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const ui = content[locale] || content.zh
  return {
    title: `${ui.title} | Daily Paper Digest`,
    description: ui.overview.join(' '),
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const ui = content[locale] || content.zh
  const t = await getUI(locale)

  return (
    <DigestLayout
      locale={locale}
      roleId="music-to-dance"
      roleName={ui.roleName}
      date="2026-07-21"
      title={ui.title}
      overview={ui.overview}
    >
      <MustRead>
        {ui.papers.map((paper) => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <p>{paper.description}</p>
            <KeyPoints points={paper.keyPoints} />
            <PaperLink href={paper.href} title={paper.paperLink} />
          </Paper>
        ))}
      </MustRead>

      <WorthReading>
        {ui.worthReading.map((item) => (
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

      <Observation>
        {ui.observation}
      </Observation>
    </DigestLayout>
  )
}
