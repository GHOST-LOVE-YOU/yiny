import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-06-08 | 流式力控视频生成与自回归世界模型",
    overview: [
      "StreamForce 实现 16.6 FPS 流式力控视频生成，统一局部/全局力表示支持实时交互",
      "AnchorWorld 提出混合视角训练策略，解决第一人称视角下身体部位截断的监督稀疏问题",
      "CBS 基于 Dirichlet 能量的复杂度平衡扩散分割，在不增加推理成本前提下提升 ~35% FID"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成 / 物理控制",
        title: "StreamForce：流式力控视频生成的因果统一框架",
        description: "StreamForce 是首个支持时变力输入的流式视频生成框架，通过统一的像素对齐掩码力映射表示同时编码局部接触力（如推特定物体）和全局环境力（如风）。核心创新在于将力条件双向扩散教师模型蒸馏为因果自回归学生模型，并构建包含动态力转换的训练数据集。模型在单张 H200 GPU 上达到 16.6 FPS（832×480 分辨率，0.6 秒延迟），在力遵循度和运动真实感上达到 SOTA。对 music-to-dance 任务的直接启发是：可将音频节拍作为时变力信号输入，实现音乐驱动的实时舞蹈视频流式生成，解决当前方案推理延迟高、无法交互调整的问题。",
        keyPoints: [
          "统一力表示：共享的像素对齐掩码力映射同时处理局部/全局力，避免训练分离模型",
          "力感知蒸馏：在蒸馏全过程中强制力条件，使用多样化图像-力轨迹数据保持可控性",
          "实时性能：16.6 FPS 流式生成支持用户随时调整力参数，形成交互反馈闭环"
        ],
        href: "https://arxiv.org/abs/2606.07508",
        paperLink: "Streaming Video Generation with Streaming Force Control",
      },
      {
        num: 2,
        tag: "第一人称模拟 / 人体运动",
        title: "AnchorWorld：基于锚点视图定制化的具身自我中心世界模拟",
        description: "AnchorWorld 针对第一人称视角视频生成中身体部位截断导致的监督稀疏问题，提出混合视角训练策略：使用第三人称视频（TPV）提供完整全身运动监督，再通过相机参数对齐迁移到第一人称视角（FPV）。模型以 SMPL-X 参数化人体动作为条件，结合可定制的锚点视图（RGB 图像 + 3D 姿态 + 演化描述）实现世界状态的空间定位与时序演化控制。在 Ego-Exo4D 和 LEMMA 数据集上的实验表明，该方法在场景一致性（Mat. Pix. 4493.4 vs PlayerOne 3961.6）和相机精度（ATE 0.112 vs 0.131）上显著优于基线。对舞蹈视频生成的启示是：混合视角训练可缓解参考图人物与生成视频中人体姿态的空间对齐难题，锚点视图机制可用于固定舞蹈场景中的背景元素。",
        keyPoints: [
          "混合视角训练：TPV 提供完整身体监督，FPV 对齐头部视角，解决 egocentric 监督稀疏",
          "锚点视图机制：RGB + 6-DoF 姿态 + 文本演化描述，支持局部场景状态的时空一致控制",
          "空间姿态注意力：通过运动编码器和相机编码器将 3D 人体运动投影到 2D 视觉观察"
        ],
        href: "https://arxiv.org/abs/2606.07326",
        paperLink: "AnchorWorld: Embodied Egocentric World Simulation with View-based Evolution Customization",
      },
      {
        num: 3,
        tag: "音频理解 / 多模态评估",
        title: "MMAE：首个大规模多任务音频编辑基准",
        description: "MMAE 是首个面向通用指令驱动音频编辑的综合评估基准，涵盖声音、语音、音乐及其混合等 7 种音频模态。基准建立 6 级任务复杂度分类（从基础修改到多跳推理和多轮编辑）、2 级粒度、8 种操作类型的完整分类体系，包含 2000 个高质量样本和 17741 条可验证评估标准。对领先模型的评估显示，当前系统在精确编辑上远未达标：精确匹配率（EMR）始终低于 5%，复杂混合模态任务降至 0%。对 music-to-dance 任务的价值在于：其细粒度音频-语义对齐评估框架和音乐编辑任务定义，可为音频节拍检测、音乐风格迁移等子任务提供标准化的能力诊断工具。",
        keyPoints: [
          "7 种音频模态：声音、语音、音乐及混合，覆盖真实场景中的复杂音频编辑需求",
          "Rubric-based 评估：将自由形式任务分解为 17741 条可验证标准，实现精确多维评估",
          "暴露能力瓶颈：当前最佳模型在复杂任务上 EMR 为 0%，显示音频编辑仍有巨大提升空间"
        ],
        href: "https://arxiv.org/abs/2606.07229",
        paperLink: "MMAE: A Massive Multitask Audio Editing Benchmark",
      },
      {
        num: 4,
        tag: "扩散模型 / 推理优化",
        title: "CBS：基于复杂度平衡的扩散时间轴分割",
        description: "CBS（Complexity-Balanced Splitting）提出从函数逼近理论出发的时间轴容量分配框架，基于 de Boor 等分布原理将扩散时间轴划分为近似负担相等的段，在需要更多表示能力的区域（如结构形成阶段）分配更大容量。论文提出两种互补的监控函数：基于流场 Dirichlet 能量的空间度量，以及基于采样轨迹加速度的几何度量。在 SiT-XL 上的实验显示，CBS 相比朴素时间分割在 CFG 条件下 FID 提升约 35%，且不增加每步推理成本。对舞蹈视频长序列生成的直接价值是：可在不增加推理开销的前提下，将更多模型容量分配给运动结构形成的关键时间步，提升长舞蹈序列的时序一致性。",
        keyPoints: [
          "理论 grounded：基于 de Boor 等分布原理，将时间轴划分为近似负担相等的段",
          "两种监控函数：Dirichlet 能量（空间变化）和轨迹加速度（几何复杂度）估计局部难度",
          "零推理开销：每步只评估一个子网络，总参数量增加但 FLOPs 不变"
        ],
        href: "https://arxiv.org/abs/2606.06477",
        paperLink: "Complexity-Balanced Diffusion Splitting",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "MLLM 视频理解的人类视角综述",
        tag: "视频理解 / 综述",
        href: "https://arxiv.org/abs/2606.07433",
        description: "从观看、记忆、推理三维度分析视频 MLLM 的能力边界，涵盖长视频处理、多模态对齐和流式理解，对舞蹈视频长序列生成的跨帧一致性有间接参考价值。",
      },
      {
        num: 6,
        title: "DiT 信念空间熵正则化驱动音乐多样性",
        tag: "音乐生成 / 扩散模型",
        href: "https://arxiv.org/abs/2606.07207",
        description: "Eisbach log-barrier 基于 DiT 输出空间能量分布的熵进行损失加权，在 Stable Audio 3 上实现更强的主题发展和声学区分度，对音频-运动对齐的多样性控制有启发。",
      },
      {
        num: 7,
        title: "DIRECT：分解视觉代理的 3D 感知物体插入",
        tag: "图像生成 / 3D 控制",
        href: "https://arxiv.org/abs/2606.06601",
        description: "外观-几何-上下文解耦的条件注入机制，避免特征纠缠的同时保持参考外观和用户指定姿态，可借鉴到舞蹈生成中的人物外观保持和姿态控制。",
      },
      {
        num: 8,
        title: "机器人需要从非结构化行为数据中提取监督信号",
        tag: "机器人 / 数据引擎",
        href: "https://arxiv.org/abs/2606.06556",
        description: "探讨从人体运动、互联网视频等非结构化数据中提取任务语义和奖励结构的机制，对舞蹈数据集的构建和动作标注有方法论参考。",
      },
      {
        num: 9,
        title: "Astra：世界模拟器增强的视觉推理",
        tag: "视觉推理 / 世界模型",
        href: "https://arxiv.org/abs/2606.06476",
        description: "动作条件视觉想象框架，通过视角一致性调优提升跨视图一致性，其世界模拟器机制可用于舞蹈生成的多视角一致性控制。",
      },
    ],
    observation: "今日论文呈现两个明确趋势：一是视频生成正从「离线批处理」转向「流式实时交互」——StreamForce 的 16.6 FPS 力控生成和 AnchorWorld 的混合视角训练都指向可实时响应的生成系统，这对需要音乐同步的舞蹈视频尤为关键；二是扩散模型的时间轴优化进入精细化阶段——CBS 基于理论指导的复杂度平衡分割证明，不增加推理成本的前提下仍有显著质量提升空间。对于 music-to-dance 任务，可将音频节拍编码为时变力信号接入 StreamForce 框架，同时借鉴 CBS 的时间轴容量分配策略优化长舞蹈序列的生成稳定性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-06-08 | Streaming Force-Controlled Video Generation & Autoregressive World Models",
    overview: [
      "StreamForce achieves 16.6 FPS streaming force-controlled video generation with unified local/global force representation",
      "AnchorWorld proposes hybrid-view training to address sparse supervision from truncated body parts in egocentric views",
      "CBS achieves ~35% FID improvement via Dirichlet energy-based complexity-balanced diffusion splitting without inference overhead"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation / Physics Control",
        title: "StreamForce: Causal Unified Framework for Streaming Force-Controlled Video Generation",
        description: "StreamForce is the first streaming video generation framework supporting time-varying force inputs. It encodes both local contact forces (pushing specific objects) and global environmental forces (wind) through a unified pixel-aligned masked force map. The key innovation is distilling a force-conditioned bidirectional diffusion teacher into a causal autoregressive student, trained on a dataset with dynamic force transitions. The model achieves 16.6 FPS at 832×480 resolution (0.6s latency) on a single H200 GPU, reaching SOTA in force adherence and motion realism. For music-to-dance tasks, audio beats can be encoded as time-varying force signals to enable real-time streaming dance video generation, addressing current limitations in high inference latency and lack of interactive adjustment.",
        keyPoints: [
          "Unified force representation: Shared pixel-aligned masked force map handles both local and global forces without separate models",
          "Force-aware distillation: Enforces force conditioning throughout distillation using diverse image-force trajectory data",
          "Real-time performance: 16.6 FPS streaming generation allows users to adjust force parameters anytime, creating interactive feedback loops"
        ],
        href: "https://arxiv.org/abs/2606.07508",
        paperLink: "Streaming Video Generation with Streaming Force Control",
      },
      {
        num: 2,
        tag: "Egocentric Simulation / Human Motion",
        title: "AnchorWorld: Embodied Egocentric World Simulation with View-based Evolution Customization",
        description: "AnchorWorld addresses sparse supervision from truncated body parts in egocentric video generation through hybrid-view training: using third-person videos (TPV) for complete full-body motion supervision, then adapting to first-person views (FPV) via camera parameter alignment. The model conditions on SMPL-X parametric human motion combined with customizable anchor views (RGB image + 3D pose + evolution description) for spatial localization and temporal evolution control. Experiments on Ego-Exo4D and LEMMA show significant improvements in scene consistency (Mat. Pix. 4493.4 vs PlayerOne 3961.6) and camera accuracy (ATE 0.112 vs 0.131). For dance video generation, hybrid-view training can alleviate spatial alignment challenges between reference image subjects and generated video poses, while the anchor view mechanism can fix background elements in dance scenes.",
        keyPoints: [
          "Hybrid-view training: TPV provides complete body supervision, FPV aligns head perspective, addressing egocentric supervision sparsity",
          "Anchor view mechanism: RGB + 6-DoF pose + text evolution description enables spatiotemporally consistent control of local scene states",
          "Spatial pose attention: Projects 3D human motion to 2D visual observations via motion and camera encoders"
        ],
        href: "https://arxiv.org/abs/2606.07326",
        paperLink: "AnchorWorld: Embodied Egocentric World Simulation with View-based Evolution Customization",
      },
      {
        num: 3,
        tag: "Audio Understanding / Multimodal Evaluation",
        title: "MMAE: First Large-Scale Multitask Audio Editing Benchmark",
        description: "MMAE is the first comprehensive benchmark for general-purpose instruction-driven audio editing, covering 7 audio modalities including sound, speech, music, and their mixtures. It establishes a complete taxonomy with 6 levels of task complexity (basic modifications to multi-hop reasoning and multi-round editing), 2 granularity levels, and 8 operation types, comprising 2000 high-quality samples and 17,741 verifiable evaluation criteria. Evaluation of leading models reveals current systems fall far short on precise editing: Exact Match Rate (EMR) consistently below 5%, dropping to 0% on complex mixed-modality tasks. For music-to-dance tasks, its fine-grained audio-semantic alignment evaluation framework and music editing task definitions provide standardized diagnostic tools for audio beat detection and music style transfer subtasks.",
        keyPoints: [
          "7 audio modalities: Sound, speech, music and mixtures covering complex real-world audio editing scenarios",
          "Rubric-based evaluation: Decomposes free-form tasks into 17,741 verifiable criteria for precise multi-dimensional assessment",
          "Exposes capability gaps: Current best models achieve 0% EMR on complex tasks, showing vast room for improvement in audio editing"
        ],
        href: "https://arxiv.org/abs/2606.07229",
        paperLink: "MMAE: A Massive Multitask Audio Editing Benchmark",
      },
      {
        num: 4,
        tag: "Diffusion Models / Inference Optimization",
        title: "CBS: Complexity-Balanced Splitting for Diffusion Timeline",
        description: "CBS (Complexity-Balanced Splitting) proposes a function approximation theory-grounded temporal capacity allocation framework based on de Boor's equidistribution principle, partitioning the diffusion timeline into segments of equal approximation burden. More capacity is allocated to regions requiring greater representational power (e.g., structure formation phases). Two complementary monitor functions are proposed: spatial measure based on flow Dirichlet energy, and geometric measure based on sampling trajectory acceleration. Experiments on SiT-XL show ~35% FID improvement over naive temporal splitting with CFG, without increasing per-step inference cost. For long dance sequence generation, this enables allocating more model capacity to critical timesteps for motion structure formation without inference overhead, improving temporal consistency of long dance sequences.",
        keyPoints: [
          "Theory-grounded: Based on de Boor's equidistribution principle, partitions timeline into segments of equal approximation burden",
          "Two monitor functions: Dirichlet energy (spatial variation) and trajectory acceleration (geometric complexity) estimate local difficulty",
          "Zero inference overhead: Only one subnetwork evaluated per step, total parameters increase but FLOPs remain constant"
        ],
        href: "https://arxiv.org/abs/2606.06477",
        paperLink: "Complexity-Balanced Diffusion Splitting",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Human-View Perspective on MLLM Video Understanding",
        tag: "Video Understanding / Survey",
        href: "https://arxiv.org/abs/2606.07433",
        description: "Analyzes video MLLM capabilities through watching, remembering, and reasoning dimensions, covering long video processing and streaming understanding, with indirect value for cross-frame consistency in dance video generation.",
      },
      {
        num: 6,
        title: "Entropy-based DiT Regularization for Musical Diversity",
        tag: "Music Generation / Diffusion Models",
        href: "https://arxiv.org/abs/2606.07207",
        description: "Eisbach log-barrier weights loss by entropy of DiT output spatial energy distribution, achieving stronger thematic development on Stable Audio 3, offering insights for diversity control in audio-motion alignment.",
      },
      {
        num: 7,
        title: "DIRECT: 3D-Aware Object Insertion via Decomposed Visual Proxies",
        tag: "Image Generation / 3D Control",
        href: "https://github.com/abs/2606.06601",
        description: "Decoupled appearance-geometry-context conditioning mechanism avoids feature entanglement while preserving reference appearance and user-specified pose, applicable to appearance preservation and pose control in dance generation.",
      },
      {
        num: 8,
        title: "Robots Need Mechanisms to Extract Supervision from Unstructured Data",
        tag: "Robotics / Data Engine",
        href: "https://arxiv.org/abs/2606.06556",
        description: "Explores mechanisms for extracting task semantics and reward structure from human motion and internet videos, offering methodological references for dance dataset construction and motion annotation.",
      },
      {
        num: 9,
        title: "Astra: World Simulator-Augmented Visual Reasoning",
        tag: "Visual Reasoning / World Models",
        href: "https://arxiv.org/abs/2606.06476",
        description: "Action-conditioned visual imagination framework improves cross-view consistency through view consistency tuning, applicable to multi-view consistency control in dance generation.",
      },
    ],
    observation: "Today's papers reveal two clear trends: First, video generation is shifting from 'offline batch processing' to 'streaming real-time interaction'—StreamForce's 16.6 FPS force-controlled generation and AnchorWorld's hybrid-view training both point toward systems that can respond in real-time, which is particularly critical for music-synchronized dance videos. Second, diffusion model timeline optimization is entering a refined stage—CBS's theory-guided complexity-balanced splitting demonstrates significant quality improvements are still possible without increasing inference costs. For music-to-dance tasks, audio beats can be encoded as time-varying force signals integrated into the StreamForce framework, while CBS's temporal capacity allocation strategy can be adapted to optimize generation stability for long dance sequences.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-08`,
        'en': `/en/daily/music-to-dance/2026-06-08`,
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
      date="2026-06-08"
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
