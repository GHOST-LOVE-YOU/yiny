import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "可控生成与评估：从手部姿态解耦到视频理解诊断",
    overview: [
      "HandsOnWorld 的 Plücker Hand Map 为姿态控制提供了相机-运动解耦新思路",
      "Video-Oasis 揭示 55% 视频 benchmark 存在捷径问题，对舞蹈评估指标设计有重要警示",
      "WorldOdysseyBench 四维评估框架可直接用于长舞蹈视频的质量评估"
    ],
    papers: [
      {
        num: 1,
        tag: "可控视频生成",
        title: "HandsOnWorld：相机解耦的手部控制第一人称视频生成",
        description: "快手团队提出的手部控制视频生成框架，核心创新 Plücker Hand Map 将 Plücker-ray 表示从相机光线扩展到手部表面，在表示层面解耦相机自运动与手部运动。该方法构建 EgoVid-Pro 数据集（103K 片段，12M 帧），通过单目重建获得野外第一人称视频的 3D 手部标注。与舞蹈生成任务高度相关：当前音乐驱动舞蹈生成面临相机运动与人体姿态耦合的类似问题，Plücker 表示法可直接迁移到 3D 姿态控制信号设计，实现绝对世界坐标系下的人体运动控制。",
        keyPoints: [
          "Plücker Hand Map：统一世界空间控制信号，将相机 Plücker 光线与手部表面法线配对",
          "EgoVid-Pro：首个大规模野外第一人称 3D 手部轨迹数据集，无需多相机或标记",
          "迁移价值：3D-aware 控制表示可直接用于舞蹈生成的姿态解耦与相机控制"
        ],
        href: "https://arxiv.org/abs/2607.02075",
        paperLink: "HandsOnWorld: Unconstrained Egocentric Video Generation with Camera-Disentangled Hand Control",
      },
      {
        num: 2,
        tag: "序列建模",
        title: "DeepGaze3.5-VL：自回归 Token 预测建模视觉扫描路径",
        description: "将扫描路径预测重新定义为离散序列建模任务，利用大规模视觉语言模型的预训练表示。通过将坐标映射为文本词汇表中的离散 token，模型在 MIT1003 上达到 2.18 bits IG，比 DeepGaze III 提升 46%。关键发现：扫描路径预测质量与多模态推理能力高度相关（Spearman ρ=0.93）。对舞蹈生成的启发：音频-动作对齐可借鉴这种自回归坐标预测范式，将舞蹈关键点序列离散化为 token 进行建模。",
        keyPoints: [
          "自回归坐标 token 预测：将 (x,y) 编码为两位零填充整数，确保每个 fixation 恰好 4 个 token",
          "IG 精确计算：利用自回归结构分解空间联合概率，实现快速精确的信息增益计算",
          "迁移价值：离散坐标序列建模方法可直接应用于音频驱动的舞蹈动作生成"
        ],
        href: "https://arxiv.org/abs/2607.02083",
        paperLink: "DeepGaze3.5-VL: Modeling Scanpaths via Autoregressive Token Prediction",
      },
      {
        num: 3,
        tag: "评估方法",
        title: "Video-Oasis：重新审视视频理解评估准则",
        description: "系统性审计 14 个视频理解 benchmark 的诊断套件，发现 55% 的样本可在无需视觉输入或时间上下文的情况下解决。通过视觉依赖测试（Blind/Audio/Summary）、时间依赖测试（Center-Frame/Frame Shuffling/Bag-of-Frames）和人工验证三重筛选，揭示当前 benchmark 高估模型能力的问题。对舞蹈视频评估的重要警示：设计评估指标时必须排除语言先验、单帧感知等捷径，确保真正测试时序一致性和运动质量。",
        keyPoints: [
          "55% shortcut 比例：现有 benchmark 超过半数样本无需视频理解即可作答",
          "三维诊断框架：视觉依赖、时间依赖、歧义性验证联合筛选 video-native 挑战",
          "迁移价值：舞蹈视频评估应借鉴此框架，排除语言偏见和静态感知捷径"
        ],
        href: "https://arxiv.org/abs/2603.29616",
        paperLink: "Video-Oasis: Rethinking Evaluation of Video Understanding",
      },
      {
        num: 4,
        tag: "基准测试",
        title: "WorldOdysseyBench：交互式世界模型的长程稳定性评估",
        description: "针对交互式世界模型（IWM）的全面 benchmark，评估 10+ 开源/闭源模型在 10-60 秒连续交互下的四维稳定性：Action（逐帧动作准确度）、Vision（成像与美学漂移分数）、Physics（力学/光学/3D 一致性）、Memory（场景与主体记忆）。关键发现：轨迹分数≠逐帧正确性，高视觉质量≠动作保真度。该框架可直接迁移用于评估长舞蹈视频的时间一致性、物理合理性和记忆保持能力。",
        keyPoints: [
          "逐帧动作指标：绕过跨模型语义尺度差异，暴露轨迹级评估隐藏的逐帧失败",
          "段级漂移指标：捕捉非单调的中序列质量崩溃，传统逐帧或首尾对比无法发现",
          "迁移价值：四维评估框架可直接用于长舞蹈视频生成质量的全面评估"
        ],
        href: "https://arxiv.org/abs/2606.31672",
        paperLink: "WorldOdysseyBench: An Open-World Benchmark for Long-Horizon Stability of Interactive World Models",
      },
      {
        num: 5,
        tag: "长视频理解",
        title: "Graph it first! 通过场景图实现长视频推理",
        description: "针对第一人称长视频问答任务，提出 Egocentric Scene Graphs（EgoSG）中间表示。将视频转换为时序 grounded 的文本场景图，捕获物体、属性、空间关系和交互，在 HD-EPIC VQA 上取得 SOTA。核心优势：即使 25 分钟长视频，EgoSG 的 token 消耗仍低于 InternVL3 和 VideoLLaMa3 的上下文限制。对舞蹈生成的启发：可将长舞蹈序列抽象为动作场景图，实现高效的时序推理和编辑。",
        keyPoints: [
          "EgoSG 表示：开放词汇场景图，捕获动态物体、空间关系和时序动作",
          "Token 效率：25 分钟视频的场景图表示仍在 MLLM 上下文限制内",
          "迁移价值：动作场景图表示可用于舞蹈序列的抽象、检索和编辑"
        ],
        href: "https://arxiv.org/abs/2606.25842",
        paperLink: "Graph it first! Enabling Reasoning on Long-form Egocentric Videos through Scene Graphs",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "VLA 空间泛化中的 Shortcut Learning 问题",
        tag: "机器人学习",
        href: "https://arxiv.org/abs/2607.02322",
        description: "揭示 VLA 模型依赖虚假相关性的捷径学习问题，混合相机运动策略可提升泛化。对舞蹈数据构建有警示意义。",
      },
      {
        num: 7,
        title: "Bridge-WA：预测世界变化的轻量级世界-动作框架",
        tag: "动作预测",
        href: "https://arxiv.org/abs/2607.02195",
        description: "将未来变化蒸馏为三个紧凑先验（future tokens、change maps、motion-flow maps），multi-source attention memories 机制可用于舞蹈动作预测。",
      },
      {
        num: 8,
        title: "VLA-Corrector：自适应动作时域的检测-纠正推理",
        tag: "动作生成",
        href: "https://arxiv.org/abs/2607.01804",
        description: "轻量级潜在空间视觉监控器检测执行漂移并触发纠正重规划，可用于维护长舞蹈视频的时序一致性。",
      },
      {
        num: 9,
        title: "未来特权监督对因果凝视估计的帮助",
        tag: "时序建模",
        href: "https://arxiv.org/abs/2607.01437",
        description: "发现 1.7-3.3 秒的未来上下文是训练因果模型的最优窗口，对舞蹈生成训练策略有参考价值。",
      },
    ],
    observation: "今日论文围绕「可控生成」与「评估方法」两个主题展开。HandsOnWorld 的 Plücker Hand Map 为姿态控制提供了相机-运动解耦的新思路，而 Video-Oasis 和 WorldOdysseyBench 则为视频生成评估提供了严谨的诊断框架。值得注意的是，55% 的 benchmark 捷径问题提醒我们：在评估舞蹈视频质量时，必须排除语言先验和静态感知等干扰因素，才能真正测试模型的时序一致性和运动生成能力。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Controllable Generation & Evaluation: From Hand Pose Disentanglement to Video Understanding Diagnostics",
    overview: [
      "HandsOnWorld's Plücker Hand Map offers a new approach to camera-motion disentanglement for pose control",
      "Video-Oasis reveals 55% of video benchmarks have shortcut issues, warning for dance evaluation design",
      "WorldOdysseyBench's four-dimensional evaluation framework can be directly applied to long dance video quality assessment"
    ],
    papers: [
      {
        num: 1,
        tag: "Controllable Video Generation",
        title: "HandsOnWorld: Camera-Disentangled Hand Control for Egocentric Video Generation",
        description: "A hand-controlled video generation framework from Kuaishou's Kling Team. The core innovation, Plücker Hand Map, extends Plücker-ray representations from camera rays to hand surfaces, disentangling camera ego-motion from hand motion at the representation level. The method constructs the EgoVid-Pro dataset (103K clips, 12M frames) with 3D hand annotations via monocular reconstruction. Highly relevant to dance generation: music-driven dance faces similar camera-pose coupling issues, and the Plücker representation can be directly migrated to 3D pose control signal design for absolute world-coordinate human motion control.",
        keyPoints: [
          "Plücker Hand Map: Unified world-space control signal pairing camera Plücker rays with surface-normal rays",
          "EgoVid-Pro: First large-scale in-the-wild egocentric 3D hand trajectory dataset without multi-camera or markers",
          "Transfer value: 3D-aware control representation can be directly applied to pose disentanglement and camera control in dance generation"
        ],
        href: "https://arxiv.org/abs/2607.02075",
        paperLink: "HandsOnWorld: Unconstrained Egocentric Video Generation with Camera-Disentangled Hand Control",
      },
      {
        num: 2,
        tag: "Sequence Modeling",
        title: "DeepGaze3.5-VL: Autoregressive Token Prediction for Scanpath Modeling",
        description: "Reframing scanpath prediction as discrete sequence modeling, leveraging pretrained representations from large vision-language models. By mapping coordinates to discrete tokens in the text vocabulary, the model achieves 2.18 bits IG on MIT1003, a 46% improvement over DeepGaze III. Key finding: scanpath prediction quality strongly correlates with multimodal reasoning ability (Spearman ρ=0.93). Implication for dance generation: audio-motion alignment can adopt this autoregressive coordinate prediction paradigm, discretizing dance keypoint sequences into tokens for modeling.",
        keyPoints: [
          "Autoregressive coordinate token prediction: Encoding (x,y) as zero-padded two-digit integers ensures exactly 4 tokens per fixation",
          "Exact IG computation: Exploits autoregressive structure to decompose spatial joint probability for fast, mathematically exact information gain calculation",
          "Transfer value: Discrete coordinate sequence modeling can be directly applied to audio-driven dance motion generation"
        ],
        href: "https://arxiv.org/abs/2607.02083",
        paperLink: "DeepGaze3.5-VL: Modeling Scanpaths via Autoregressive Token Prediction",
      },
      {
        num: 3,
        tag: "Evaluation Methods",
        title: "Video-Oasis: Rethinking Criteria for Video Understanding Evaluation",
        description: "A diagnostic suite systematically auditing 14 video understanding benchmarks, revealing that 55% of samples can be solved without visual input or temporal context. Through visual dependency tests (Blind/Audio/Summary), temporal dependency tests (Center-Frame/Frame Shuffling/Bag-of-Frames), and human verification, it exposes how current benchmarks overestimate model capabilities. Critical warning for dance video evaluation: metrics must exclude shortcuts like language priors and single-frame perception to truly test temporal consistency and motion quality.",
        keyPoints: [
          "55% shortcut ratio: Over half of existing benchmark samples can be answered without video understanding",
          "Three-dimensional diagnostic framework: Visual dependency, temporal dependency, and ambiguity verification jointly filter video-native challenges",
          "Transfer value: Dance video evaluation should adopt this framework to exclude language bias and static perception shortcuts"
        ],
        href: "https://arxiv.org/abs/2603.29616",
        paperLink: "Video-Oasis: Rethinking Evaluation of Video Understanding",
      },
      {
        num: 4,
        tag: "Benchmarking",
        title: "WorldOdysseyBench: Long-Horizon Stability Evaluation for Interactive World Models",
        description: "A comprehensive benchmark for Interactive World Models (IWMs) evaluating 10+ open/closed-source models across 10-60 seconds of continuous interaction on four dimensions: Action (per-frame accuracy), Vision (imaging and aesthetic drift scores), Physics (mechanics/optics/3D consistency), and Memory (scene and subject memory). Key findings: trajectory score ≠ per-frame correctness, high visual quality ≠ action fidelity. This framework can be directly migrated to evaluate temporal consistency, physical plausibility, and memory retention in long dance videos.",
        keyPoints: [
          "Per-frame action metric: Bypasses cross-model semantic scale disparity, exposing per-frame failures hidden by trajectory-level evaluation",
          "Segment-based drift metric: Captures non-monotonic mid-sequence quality collapse missed by per-frame or start-vs-end comparisons",
          "Transfer value: Four-dimensional evaluation framework can be directly applied to comprehensive quality assessment of long dance video generation"
        ],
        href: "https://arxiv.org/abs/2606.31672",
        paperLink: "WorldOdysseyBench: An Open-World Benchmark for Long-Horizon Stability of Interactive World Models",
      },
      {
        num: 5,
        tag: "Long Video Understanding",
        title: "Graph it first! Enabling Long-Form Video Reasoning through Scene Graphs",
        description: "For egocentric long-video question answering, proposes Egocentric Scene Graphs (EgoSG) as an intermediate representation. Converting videos to temporally grounded text scene graphs capturing objects, attributes, spatial relations, and interactions achieves SOTA on HD-EPIC VQA. Core advantage: even 25-minute videos' EgoSG token consumption stays below InternVL3 and VideoLLaMa3 context limits. Implication for dance generation: long dance sequences can be abstracted as action scene graphs for efficient temporal reasoning and editing.",
        keyPoints: [
          "EgoSG representation: Open-vocabulary scene graphs capturing dynamic objects, spatial relations, and temporal actions",
          "Token efficiency: Scene graph representation for 25-minute videos remains within MLLM context limits",
          "Transfer value: Action scene graph representation can be used for dance sequence abstraction, retrieval, and editing"
        ],
        href: "https://arxiv.org/abs/2606.25842",
        paperLink: "Graph it first! Enabling Reasoning on Long-form Egocentric Videos through Scene Graphs",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Shortcut Learning in VLA Spatial Generalization",
        tag: "Robotic Learning",
        href: "https://arxiv.org/abs/2607.02322",
        description: "Reveals shortcut learning in VLA models relying on spurious correlations; mixed camera motion strategies improve generalization. Warning for dance data construction.",
      },
      {
        num: 7,
        title: "Bridge-WA: Lightweight World-Action Framework for Predicting World Changes",
        tag: "Action Prediction",
        href: "https://arxiv.org/abs/2607.02195",
        description: "Distills future changes into three compact priors (future tokens, change maps, motion-flow maps); multi-source attention memories mechanism applicable to dance motion prediction.",
      },
      {
        num: 8,
        title: "VLA-Corrector: Detect-and-Correct Inference for Adaptive Action Horizon",
        tag: "Action Generation",
        href: "https://arxiv.org/abs/2607.01804",
        description: "Lightweight latent-space vision monitor detects execution drift and triggers corrective replanning; can maintain temporal consistency in long dance videos.",
      },
      {
        num: 9,
        title: "How Much Future Helps? Future-Privileged Supervision for Causal Gaze Estimation",
        tag: "Temporal Modeling",
        href: "https://arxiv.org/abs/2607.01437",
        description: "Discovers 1.7-3.3 seconds of future context is optimal for training causal models;参考价值 for dance generation training strategies.",
      },
    ],
    observation: "Today's papers center on two themes: 'controllable generation' and 'evaluation methods.' HandsOnWorld's Plücker Hand Map provides a new approach to camera-motion disentanglement for pose control, while Video-Oasis and WorldOdysseyBench offer rigorous diagnostic frameworks for video generation evaluation. Notably, the 55% benchmark shortcut issue reminds us: when evaluating dance video quality, we must exclude interference factors like language priors and static perception to truly test models' temporal consistency and motion generation capabilities.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-06`,
        'en': `/en/daily/music-to-dance/2026-07-06`,
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
      date="2026-07-06"
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
