import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-26 | 交互式世界模型与舞蹈生成",
    overview: [
      "交互式视频世界模型评估框架 WorldMark 提供了标准化的动作控制和相机轨迹评估方法",
      "DeVI 展示了如何利用合成视频作为 HOI-aware 运动规划器，其混合跟踪奖励机制对舞蹈动作对齐有启发",
      "时间流控制技术为舞蹈视频的节奏生成和速度调节提供了新思路",
      "结构化运动描述 SMD 将关节序列转换为自然语言，为舞蹈动作的文本条件控制开辟了新途径"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型评估",
        title: "WorldMark：交互式视频世界模型的统一基准测试套件",
        description: "WorldMark 是首个为交互式 Image-to-Video 世界模型设计的标准化基准测试框架，解决了当前各模型使用私有场景和轨迹进行评估导致的跨模型比较困难问题。该框架的核心贡献包括：(1) 统一动作映射层，将共享的 WASD 风格动作词汇表翻译成每个模型的原生控制格式，使六种主要模型（YUME 1.5、Matrix-Game 2.0、HY-World 1.5、HY-GameCraft、Open-Oasis、Genie 3）能够在相同场景和轨迹上进行公平比较；(2) 层次化测试套件包含 500 个评估案例，涵盖第一/第三人称视角、真实/风格化场景，以及从简单到困难的三个难度层级（20-60秒）；(3) 模块化评估工具包覆盖视觉质量、控制对齐和世界一致性三个维度。对于 music-to-dance 任务，WorldMark 提供的标准化动作控制和相机轨迹评估方法可直接迁移，用于评估舞蹈生成模型对音乐节拍和相机视角的控制精度。",
        keyPoints: [
          "统一动作映射层支持跨模型公平比较，将 WASD 动作词汇翻译为各模型原生控制格式",
          "500个评估案例覆盖多视角、多风格、多难度，包含轨迹误差和 VLM 判断指标",
          "控制对齐维度通过 DROID-SLAM 重建相机姿态，计算平移误差和旋转误差",
          "可直接迁移到舞蹈生成评估：相机轨迹控制、动作对齐精度、长时一致性"
        ],
        href: "https://arxiv.org/abs/2604.21686",
        paperLink: "WorldMark: A Unified Benchmark Suite for Interactive Video World Models",
      },
      {
        num: 2,
        tag: "物理交互生成",
        title: "DeVI：基于合成视频模仿的物理灵巧人机交互",
        description: "DeVI (Dexterous Video Imitation) 是一个利用文本条件合成视频来生成物理上可信的灵巧人机交互动作的框架。其核心创新是混合模仿目标（hybrid imitation target）：使用 3D 重建的人体姿态作为人类组件，同时保留 2D 物体轨迹作为物体组件——这是因为从视频中准确恢复物体的 6D 姿态仍然具有挑战性。DeVI 首先使用视频扩散模型生成 2D HOI 视频，然后通过世界坐标系人体网格恢复和手部姿态估计获取 3D 人体参考，再通过视觉 HOI 对齐优化使其与视频和 3D 物体状态对齐。训练阶段采用混合跟踪奖励函数，结合 3D 人体跟踪和 2D 物体跟踪。对于 music-to-dance 任务，DeVI 的方法论具有重要启发：其混合跟踪奖励机制（3D 人体 + 2D 特征）可借鉴用于提升舞蹈动作与音乐节拍的对齐精度；视觉 HOI 对齐优化思路可迁移到音频-视觉对齐；使用视频作为运动规划器的范式为舞蹈生成提供了新的数据驱动思路。",
        keyPoints: [
          "混合模仿目标：3D 人体姿态 + 2D 物体轨迹，解决 4D HOI 重建中的对齐难题",
          "视觉 HOI 对齐优化：通过 2D 投影损失、时间一致性损失和 HOI 损失联合优化",
          "混合跟踪奖励：RL 训练中的奖励函数结合 3D 人体跟踪项和 2D 物体跟踪项",
          "零样本泛化：无需高质量 3D mocap 数据，仅使用生成的视频即可训练"
        ],
        href: "https://arxiv.org/abs/2604.20841",
        paperLink: "DeVI: Physics-based Dexterous Human-Object Interaction via Synthetic Video Imitation",
      },
      {
        num: 3,
        tag: "时间控制生成",
        title: "Seeing Fast and Slow：学习视频中的时间流",
        description: "该研究将时间作为可学习的视觉概念，开发了用于推理和操控视频时间流的模型。核心方法包括：(1) 利用音频音调变化（时间-频率缩放原理）和自监督等变性目标（时间重采样的比例关系）来学习检测速度变化和估计播放速度；(2) 基于学习的时间推理模型，从野外视频筛选构建了 SloMo-44K 数据集——这是目前最大的慢动作视频数据集，包含 44,632 个片段、1800 万帧，覆盖 10,000+ FPS；(3) 在该数据集上微调 Wan2.1-I2V 模型，实现速度条件视频生成（speed-conditioned video generation）和时间超分辨率（temporal super-resolution）。对于 music-to-dance 任务，这项工作提供了关键技术支持：速度条件生成可直接用于根据音乐节拍（BPM）生成对应速度的舞蹈视频；时间超分辨率可将低帧率舞蹈视频转换为高帧率平滑序列；快慢动作控制能力可用于强调舞蹈中的特定节拍或动作。",
        keyPoints: [
          "自监督速度估计：利用时间重采样的等变性，无需标注即可学习播放速度预测",
          "SloMo-44K 数据集：比现有数据集大 70 倍视频量、150 倍帧数，覆盖 0.01x 到 1.0x 速度范围",
          "速度条件生成：通过离散化速度桶和 MLP 调制时间步嵌入，实现显式速度控制",
          "时间超分辨率：将低 FPS 模糊视频转换为高 FPS 清晰序列，人类偏好胜率达 80.3%"
        ],
        href: "https://arxiv.org/abs/2604.21931",
        paperLink: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
      },
      {
        num: 4,
        tag: "运动文本表示",
        title: "Encoder-Free 人体运动理解：基于结构化运动描述",
        description: "该研究提出 Structured Motion Description (SMD)，一种将关节位置序列转换为结构化自然语言描述的规则化确定性方法。SMD 基于生物力学原理，计算 26 个关节角度（髋、膝、踝、肩、肘等）和全局轨迹（骨盆位移、高度变化、身体旋转），并将这些数值转换为人类可读的文本描述，如「左髋屈曲从 3° 增加到 81°」。这种方法的优势在于：无需学习运动编码器或跨模态对齐模块，直接利用预训练 LLM 对身体部位、空间方向和运动语义的先验知识。实验表明，SMD 在运动问答（BABEL-QA 66.7%、HuMMan-QA 90.1%）和运动描述（HumanML3D R@1 0.584）上超越所有先前方法。对于 music-to-dance 任务，SMD 提供了一种全新的条件控制方式：可将舞蹈动作转换为文本描述，用于训练文本条件舞蹈生成模型；也可将音乐特征映射到 SMD 空间，实现音频驱动的结构化运动生成；其人体可读的表示还支持可解释的注意力分析。",
        keyPoints: [
          "确定性规则转换：从关节位置计算 26 个生物力学角度，生成结构化文本描述",
          "LLM 原生处理：无需运动编码器，直接利用预训练 LLM 的运动语义知识",
          "跨模型泛化：相同文本输入可在 8 个 LLM（6 个模型家族）上仅通过 LoRA 微调适配",
          "可解释性：注意力分析可直接显示模型依赖哪些身体部位和轨迹片段"
        ],
        href: "https://arxiv.org/abs/2604.21668",
        paperLink: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Vista4D：基于 4D 点云的视频重拍",
        tag: "视角控制",
        href: "https://arxiv.org/abs/2604.21915",
        description: "通过 4D 点云表示实现视频重拍，支持新相机轨迹合成。其相机轨迹控制方法可借鉴用于舞蹈视频的视角控制。"
      },
      {
        num: 6,
        title: "Sapiens2：高分辨率人体中心视觉模型",
        tag: "人体理解",
        href: "https://arxiv.org/abs/2604.21681",
        description: "Meta 发布的 0.4B-5B 参数人体视觉模型家族，支持 1K-4K 分辨率。姿态估计 (+4 mAP) 和身体部位分割 (+24.3 mIoU) 能力可辅助舞蹈动作分析。"
      },
      {
        num: 7,
        title: "Reshoot-Anything：野外视频重拍的自监督模型",
        tag: "时空一致性",
        href: "https://arxiv.org/abs/2604.21776",
        description: "利用单目视频生成伪多视角训练数据，学习 4D 时空结构。其时间一致性保持方法对舞蹈动作生成有参考价值。"
      },
      {
        num: 8,
        title: "CHAI：构建精确视频语言的人机协作监督",
        tag: "视频描述",
        href: "https://arxiv.org/abs/2604.21718",
        description: "基于专家批评的框架生成高质量视频描述，支持 400 词详细提示。可用于舞蹈动作文本标注和数据集构建。"
      },
      {
        num: 9,
        title: "StyleVAR：基于视觉自回归建模的可控图像风格迁移",
        tag: "风格控制",
        href: "https://arxiv.org/abs/2604.21052",
        description: "将 VAR 框架应用于风格迁移，通过混合交叉注意力和 GRPO 强化学习实现多尺度风格控制。可迁移到舞蹈风格生成。"
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：视频生成正从被动合成向交互式、可控式生成演进。WorldMark 和 DeVI 代表了交互式世界模型的评估与训练前沿，其动作控制和物理一致性方法可直接迁移到舞蹈生成；Seeing Fast and Slow 揭示的时间流控制技术为节奏敏感的舞蹈生成提供了关键工具；SMD 则开辟了一条将运动表示为文本的新路径，这与当前 music-to-dance 领域使用音频特征作为条件的范式形成互补。值得关注的是，这些工作都强调了跨模态对齐（音频-视觉、文本-运动、2D-3D）的重要性，而这正是 music-to-dance 任务的核心挑战。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-26 | Interactive World Models & Dance Generation",
    overview: [
      "WorldMark provides standardized action control and camera trajectory evaluation methods for interactive video world models",
      "DeVI demonstrates using synthetic videos as HOI-aware motion planners, with hybrid tracking rewards inspiring dance-motion alignment",
      "Temporal flow control techniques offer new approaches for rhythm generation and speed adjustment in dance videos",
      "Structured Motion Description (SMD) converts joint sequences to natural language, opening new paths for text-conditioned dance control"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model Evaluation",
        title: "WorldMark: A Unified Benchmark Suite for Interactive Video World Models",
        description: "WorldMark is the first standardized benchmark for interactive Image-to-Video world models, addressing the challenge of cross-model comparison caused by proprietary scenes and trajectories. Key contributions include: (1) A unified action-mapping layer that translates a shared WASD-style action vocabulary into each model's native control format, enabling fair comparison across six major models (YUME 1.5, Matrix-Game 2.0, HY-World 1.5, HY-GameCraft, Open-Oasis, Genie 3); (2) A hierarchical test suite of 500 evaluation cases covering first/third-person viewpoints, photorealistic/stylized scenes, and three difficulty tiers (20-60s); (3) A modular evaluation toolkit spanning Visual Quality, Control Alignment, and World Consistency. For music-to-dance tasks, WorldMark's standardized action control and camera trajectory evaluation can be directly adapted to assess dance generation models' control precision over music beats and camera viewpoints.",
        keyPoints: [
          "Unified action-mapping layer enables cross-model comparison by translating WASD vocabulary to native control formats",
          "500 evaluation cases cover multi-view, multi-style, multi-difficulty with trajectory error and VLM judgment metrics",
          "Control alignment dimension reconstructs camera poses via DROID-SLAM, computing translation and rotation errors",
          "Directly transferable to dance generation evaluation: camera trajectory control, motion alignment precision, long-term consistency"
        ],
        href: "https://arxiv.org/abs/2604.21686",
        paperLink: "WorldMark: A Unified Benchmark Suite for Interactive Video World Models",
      },
      {
        num: 2,
        tag: "Physical Interaction Generation",
        title: "DeVI: Physics-based Dexterous Human-Object Interaction via Synthetic Video Imitation",
        description: "DeVI (Dexterous Video Imitation) is a framework that leverages text-conditioned synthetic videos to generate physically plausible dexterous human-object interaction motions. Its core innovation is the hybrid imitation target: using 3D reconstructed human poses for the human component while retaining 2D object trajectories for the object component—since accurate 6D object pose recovery from video remains challenging. DeVI first generates 2D HOI videos using a video diffusion model, then obtains 3D human references via world-grounded human mesh recovery and hand pose estimation, followed by visual HOI alignment optimization. Training uses a hybrid tracking reward combining 3D human tracking and 2D object tracking. For music-to-dance tasks, DeVI's methodology offers important insights: its hybrid tracking reward mechanism (3D human + 2D features) can be adapted to improve dance-motion alignment with music beats; visual HOI alignment optimization ideas can transfer to audio-visual alignment; the paradigm of using video as a motion planner provides new data-driven approaches for dance generation.",
        keyPoints: [
          "Hybrid imitation target: 3D human poses + 2D object trajectories, solving alignment challenges in 4D HOI reconstruction",
          "Visual HOI alignment: joint optimization via 2D projection loss, temporal consistency loss, and HOI loss",
          "Hybrid tracking reward: RL training combines 3D human tracking terms and 2D object tracking terms",
          "Zero-shot generalization: trains without high-quality 3D mocap data, using only generated videos"
        ],
        href: "https://arxiv.org/abs/2604.20841",
        paperLink: "DeVI: Physics-based Dexterous Human-Object Interaction via Synthetic Video Imitation",
      },
      {
        num: 3,
        tag: "Temporal Control Generation",
        title: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
        description: "This study treats time as a learnable visual concept, developing models for reasoning about and manipulating temporal flow in videos. Core methods include: (1) Using audio pitch changes (time-frequency scaling principle) and self-supervised equivariance objectives (proportional relationships under temporal resampling) to learn speed change detection and playback speed estimation; (2) Building the SloMo-44K dataset from in-the-wild videos using learned temporal reasoning models—currently the largest slow-motion video dataset with 44,632 clips, 18M frames, covering 10,000+ FPS; (3) Fine-tuning Wan2.1-I2V on this dataset for speed-conditioned video generation and temporal super-resolution. For music-to-dance tasks, this work provides key technical support: speed-conditioned generation can directly generate dance videos at speeds corresponding to music BPM; temporal super-resolution can convert low-FPS dance videos to high-FPS smooth sequences; fast/slow motion control can emphasize specific beats or movements in dance.",
        keyPoints: [
          "Self-supervised speed estimation: leverages equivariance under temporal resampling, learning playback speed prediction without labels",
          "SloMo-44K dataset: 70x more videos and 150x more frames than existing datasets, covering 0.01x to 1.0x speed range",
          "Speed-conditioned generation: explicit speed control via discretized speed buckets and MLP-modulated timestep embeddings",
          "Temporal super-resolution: converts low-FPS blurry videos to high-FPS clear sequences with 80.3% human preference win rate"
        ],
        href: "https://arxiv.org/abs/2604.21931",
        paperLink: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
      },
      {
        num: 4,
        tag: "Motion Text Representation",
        title: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
        description: "This study proposes Structured Motion Description (SMD), a rule-based deterministic approach converting joint position sequences to structured natural language descriptions. SMD computes 26 joint angles (hip, knee, ankle, shoulder, elbow, etc.) and global trajectories (pelvis displacement, height change, body rotation) based on biomechanical principles, converting these values to human-readable text descriptions like 'left hip flexion increases from 3° to 81°'. The advantage is eliminating learned motion encoders or cross-modal alignment modules, directly leveraging pretrained LLMs' prior knowledge of body parts, spatial directions, and motion semantics. Experiments show SMD surpasses all prior methods on motion QA (BABEL-QA 66.7%, HuMMan-QA 90.1%) and motion captioning (HumanML3D R@1 0.584). For music-to-dance tasks, SMD provides a novel conditioning approach: converting dance motions to text descriptions for training text-conditioned dance generation models; mapping music features to SMD space for audio-driven structured motion generation; its human-readable representation also enables interpretable attention analysis.",
        keyPoints: [
          "Deterministic rule conversion: computes 26 biomechanical angles from joint positions, generating structured text descriptions",
          "Native LLM processing: no motion encoder needed, directly leveraging pretrained LLMs' motion semantic knowledge",
          "Cross-model generalization: same text input works across 8 LLMs (6 model families) with only LoRA fine-tuning",
          "Interpretability: attention analysis directly reveals which body parts and trajectory segments the model relies on"
        ],
        href: "https://arxiv.org/abs/2604.21668",
        paperLink: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Vista4D: Video Reshooting with 4D Point Clouds",
        tag: "View Control",
        href: "https://arxiv.org/abs/2604.21915",
        description: "Enables video reshooting via 4D point cloud representation, supporting novel camera trajectory synthesis. Its camera trajectory control methods can be adapted for dance video viewpoint control."
      },
      {
        num: 6,
        title: "Sapiens2: High-Resolution Human-Centric Vision Models",
        tag: "Human Understanding",
        href: "https://arxiv.org/abs/2604.21681",
        description: "Meta's 0.4B-5B parameter human vision model family supporting 1K-4K resolution. Pose estimation (+4 mAP) and body-part segmentation (+24.3 mIoU) capabilities can assist dance motion analysis."
      },
      {
        num: 7,
        title: "Reshoot-Anything: Self-Supervised Model for In-the-Wild Video Reshooting",
        tag: "Spatiotemporal Consistency",
        href: "https://arxiv.org/abs/2604.21776",
        description: "Generates pseudo multi-view training data from monocular videos to learn 4D spatiotemporal structures. Its temporal consistency preservation methods offer reference value for dance motion generation."
      },
      {
        num: 8,
        title: "CHAI: Building Precise Video Language with Human-AI Oversight",
        tag: "Video Captioning",
        href: "https://arxiv.org/abs/2604.21718",
        description: "Expert critique-based framework for generating high-quality video descriptions, supporting 400-word detailed prompts. Can be used for dance motion text annotation and dataset construction."
      },
      {
        num: 9,
        title: "StyleVAR: Controllable Image Style Transfer via Visual Autoregressive Modeling",
        tag: "Style Control",
        href: "https://arxiv.org/abs/2604.21052",
        description: "Applies VAR framework to style transfer, achieving multi-scale style control via blended cross-attention and GRPO reinforcement learning. Transferable to dance style generation."
      },
    ],
    observation: "Today's papers reveal a clear technical trend: video generation is evolving from passive synthesis toward interactive, controllable generation. WorldMark and DeVI represent the frontier of interactive world model evaluation and training, with their motion control and physical consistency methods directly transferable to dance generation; Seeing Fast and Slow's temporal flow control techniques provide key tools for rhythm-sensitive dance generation; SMD opens a new path representing motion as text, complementing the current music-to-dance paradigm of using audio features as conditions. Notably, all these works emphasize the importance of cross-modal alignment (audio-visual, text-motion, 2D-3D), which is precisely the core challenge of music-to-dance tasks.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-26`,
        'en': `/en/daily/music-to-dance/2026-04-26`,
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
      date="2026-04-26"
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
