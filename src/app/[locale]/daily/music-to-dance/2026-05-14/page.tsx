import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-05-14 | 视频扩散蒸馏、音频驱动运动生成与物理一致性评估",
    overview: [
      "AnyFlow 提出任意步数视频扩散蒸馏框架，解决少步生成质量随步数增加而下降的问题",
      "UMo 通过统一稀疏运动建模实现实时协同语音头像生成，音频-运动对齐技术可迁移",
      "AnchorRoute 的稀疏锚点运动合成框架为参考图引导的舞蹈生成提供可控性方案"
    ],
    papers: [
      {
        num: 1,
        tag: "视频扩散蒸馏",
        title: "AnyFlow: 基于流映射的任意步数视频扩散蒸馏",
        description: "AnyFlow 是第一个基于流映射（Flow Map）的任意步数视频扩散蒸馏框架，解决了传统一致性蒸馏模型在测试时增加采样步数反而性能下降的问题。该方法将蒸馏目标从端点一致性映射（zt→z0）转变为任意时间间隔的流映射过渡学习（zt→zr），并提出流映射反向模拟（Flow Map Backward Simulation）技术，将完整的欧拉采样轨迹分解为 shortcut 流映射过渡，实现高效的 on-policy 蒸馏。在因果式文本到视频生成中，AnyFlow-FAR 14B 模型在 4 NFEs 时达到 84.05 VBench 分数，32 NFEs 时进一步提升至 84.41，超越了 Krea-Realtime-14B（83.25@4NFEs）。对于图像到视频生成，AnyFlow-FAR 在 4 NFEs 时达到 87.87 VBench-I2V 分数，与使用 50×2 NFEs 的 Wan2.1-I2V-14B（87.71）相当。",
        keyPoints: [
          "流映射公式学习任意时间点对之间的过渡（zt→zr），自然支持可变步长和任意步数推理",
          "流映射反向模拟将完整轨迹分解为 shortcut 段，避免一致性模型中的重噪声引入偏差",
          "在 1.3B 到 14B 参数的因果式和双向架构上验证，少步质量与多步扩展性兼得"
        ],
        href: "https://arxiv.org/abs/2605.13724",
        paperLink: "AnyFlow: Any-Step Video Diffusion Model with On-Policy Flow Map Distillation",
      },
      {
        num: 2,
        tag: "音频驱动运动生成",
        title: "UMo: 统一稀疏运动建模实现实时协同语音头像",
        description: "UMo 是一个面向实时协同语音头像的统一稀疏运动建模架构，通过空间稀疏的混合专家（MoE）框架和时间稀疏的关键帧中心设计，在保持高保真度的同时实现实时性能。该方法将文本、音频和运动 token 统一在自回归公式下处理，使用四个专家网络分别处理面部表情、上半身、下半身和手势。关键帧中心设计将完整序列预测转化为两阶段范式：语言模型仅预测稀疏关键帧，轻量级插值网络重建非关键帧区间。三阶段训练策略（基础运动建模→细粒度音频-运动对齐→端到端自回归同步）配合针对性音频增强，在严格延迟约束下保持细粒度语音-运动对齐。",
        keyPoints: [
          "空间稀疏 MoE 将不同身体区域路由到专用专家网络，增强运动保真度同时保持流式推理高吞吐",
          "关键帧中心设计通过预测稀疏关键帧+插值重建，实现实时密集重建且保留细粒度运动细节",
          "三阶段训练策略和音频增强有效缓解配对数据稀缺问题，提升声学多样性和语义一致性"
        ],
        href: "https://arxiv.org/abs/2605.14731",
        paperLink: "UMo: Unified Sparse Motion Modeling for Real-Time Co-Speech Avatars",
      },
      {
        num: 3,
        tag: "稀疏控制运动合成",
        title: "AnchorRoute: 基于区间路由稀疏控制的人体运动合成",
        description: "AnchorRoute 使用稀疏锚点作为生成和细化的共享支架，支持根轨迹、平面路径和身体点三种控制族。在生成阶段，锚点通过 AnchorKV 注入到冻结的 Transition Masked Diffusion（TMD）先验中，双上下文条件分离文本语义和锚点条件；在细化阶段，RouteSolver 将锚点残差作为信号，通过投影软 token 更新到锚点定义的分段仿射区间基上。该方法在稀疏关键关节协议下优于现有稀疏控制方法，生成器保持文本-运动质量，RouteSolver 提供可控的锚点遵循路径。",
        keyPoints: [
          "锚点支架同时定义生成时的条件记忆和细化时的区间更新空间，实现控制与质量的解耦",
          "AnchorKV 和双上下文条件在冻结 TMD 先验上学习稀疏空间控制，保留预训练生成能力",
          "RouteSolver 的区间路由细化仅操作软 token 变量，网络参数保持固定，提供可控的锚点遵循"
        ],
        href: "https://arxiv.org/abs/2605.14716",
        paperLink: "AnchorRoute: Human Motion Synthesis with Interval-Routed Sparse Control",
      },
      {
        num: 4,
        tag: "视频生成评估",
        title: "MechVerse: 评估视频生成模型的物理运动一致性",
        description: "MechVerse 是一个评估机械一致性的图像到视频生成基准，包含 21,156 个合成片段，来自 1,357 个机械装配体，涵盖 141 个类别。数据集按运动学复杂度分为三层：Easy（独立运动）、Medium（成对耦合）和 Hard（密集耦合多部件）。每个片段配有结构化提示，描述部件身份、静止支撑、运动部件、运动原语、方向、速度/幅度和部件间依赖关系。评估发现当前模型在保持外观和平滑度的同时，往往无法生成机械上可接受的运动，错误随耦合复杂度增加而增加。该基准为舞蹈视频生成质量评估提供了思路：可借鉴其运动学约束检查方法，评估生成舞蹈动作的生物力学合理性。",
        keyPoints: [
          "三层复杂度结构（独立/成对耦合/密集耦合）支持诊断性分析模型在不同运动复杂度下的表现",
          "结构化提示包含部件身份、运动类型、方向、速度、依赖关系等六个语义组件，实现细粒度运动控制",
          "感知视频质量与机械正确性相关性弱，需要专门的物理一致性评估指标"
        ],
        href: "https://arxiv.org/abs/2605.14843",
        paperLink: "MechVerse: Evaluating Physical Motion Consistency in Video Generation Models",
      },
      {
        num: 5,
        tag: "Flow Matching 优化",
        title: "Velocity Deficit: Flow Matching 的初始能量注入",
        description: "该研究识别了 Flow Matching 在高维实践中的关键问题：Velocity Deficit（速度赤字）。MSE 目标系统性地低估了速度幅度，导致生成样本无法到达数据流形（Integration Lag）。研究发现速度收缩在轨迹起点有害（信号匮乏），在终点有益（细节保留）。基于此提出两种互补方法：训练-based 的 Magnitude-Aware Flow Matching（MAFM）和训练-free 的 Scale Schedule Corrector（SSC）。SSC 仅需一行代码，在 ImageNet-1k 256×256 上将 FID 从 13.68 提升到 7.58（44.6% 改进），实现 5 倍加速（50 步生成器超越 250 步基线）。方法可推广到文本到图像和高分辨率生成。",
        keyPoints: [
          "数学证明 MSE 目标的凸性导致学习速度幅度严格小于目标能量，形成系统性 Velocity Deficit",
          "速度收缩在 t→0 时有害（信号匮乏导致结构缺陷），在 t→1 时有益（隐式去噪保留细节）",
          "SSC 是即插即用的推理干预，零重训练开销，γ(t) = 1 + α(1-t)^β 形式简单有效"
        ],
        href: "https://arxiv.org/abs/2605.14819",
        paperLink: "The Velocity Deficit: Initial Energy Injection for Flow Matching",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "MiVE: 多尺度视觉语言特征用于参考引导视频编辑",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2605.14664",
        description: "利用 Qwen3-VL 的分层特征（早期层捕获空间细节，深层编码全局语义）实现参考引导视频编辑，消除跨注意力设计的模态不匹配。",
      },
      {
        num: 7,
        title: "FactorizedHMR: 视频人体网格恢复的混合框架",
        tag: "人体重建",
        href: "https://arxiv.org/abs/2605.14854",
        description: "两阶段框架区分处理躯干-根锚点（确定性回归）和非躯干关节（概率流匹配），结合几何感知监督和特征感知 CFG 改善遮挡严重恢复。",
      },
      {
        num: 8,
        title: "BioHuman: 从视频学习生物力学人体表示",
        tag: "运动分析",
        href: "https://arxiv.org/abs/2605.14772",
        description: "基于模拟的框架从动作捕捉数据集估计肌肉激活，构建 BioHuman10M 数据集，端到端模型从单目视频联合预测人体运动和肌肉激活。",
      },
      {
        num: 9,
        title: "Video-Zero: 自进化视频理解",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2605.14733",
        description: "无标注的 Questioner-Solver 协同进化框架，以时间定位证据为中心，Questioner 发现信息性证据片段并生成证据基础问题。",
      },
      {
        num: 10,
        title: "Probing into Camera Control of Video Models",
        tag: "相机控制",
        href: "https://arxiv.org/abs/2605.14815",
        description: "将相机控制重新表述为位移场，通过去噪过程中潜在特征的可微重采样应用，无需训练即可实现有效相机控制。",
      },
    ],
    observation: "今日论文呈现出视频生成领域从'能生成'向'生成得快且好'的明显转变。AnyFlow 的流映射蒸馏和 Velocity Deficit 的初始能量注入分别从架构和训练动态角度提升扩散模型效率，两者结合可能产生协同效应。UMo 和 AnchorRoute 展示了运动生成任务中'稀疏性'的重要性——无论是 MoE 的空间稀疏还是关键帧的时间稀疏，都是突破实时性瓶颈的关键。对于 music-to-dance 任务，这些技术提供了清晰的迁移路径：AnyFlow 的蒸馏框架可应用于舞蹈视频生成加速，UMo 的音频-运动对齐策略可适配到音乐-舞蹈对齐，AnchorRoute 的稀疏锚点控制可用于参考人物的外观保持。MechVerse 则提醒我们，舞蹈视频评估不应仅关注视觉质量，还需关注运动本身的物理合理性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-05-14 | Video Diffusion Distillation, Audio-Driven Motion Generation & Physical Consistency Evaluation",
    overview: [
      "AnyFlow proposes an any-step video diffusion distillation framework, solving the problem of quality degradation with increased sampling steps",
      "UMo achieves real-time co-speech avatar generation through unified sparse motion modeling, with transferable audio-motion alignment techniques",
      "AnchorRoute's sparse-anchor motion synthesis framework provides controllability solutions for reference-guided dance generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Diffusion Distillation",
        title: "AnyFlow: Any-Step Video Diffusion with On-Policy Flow Map Distillation",
        description: "AnyFlow is the first any-step video diffusion distillation framework based on flow maps, addressing the issue where consistency-distilled models degrade when more sampling steps are allocated at test time. The method shifts the distillation target from endpoint consistency mapping (zt→z0) to flow-map transition learning (zt→zr) over arbitrary time intervals, and proposes Flow Map Backward Simulation to decompose full Euler rollouts into shortcut transitions for efficient on-policy distillation. In causal text-to-video generation, AnyFlow-FAR 14B achieves 84.05 VBench score at 4 NFEs and improves to 84.41 at 32 NFEs, surpassing Krea-Realtime-14B (83.25@4NFEs). For image-to-video, AnyFlow-FAR achieves 87.87 VBench-I2V at 4 NFEs, comparable to Wan2.1-I2V-14B using 50×2 NFEs (87.71).",
        keyPoints: [
          "Flow map formulation learns transitions between arbitrary time pairs (zt→zr), naturally supporting variable step sizes and any-step inference",
          "Flow map backward simulation decomposes trajectories into shortcut segments, avoiding re-noising bias in consistency models",
          "Validated on causal and bidirectional architectures from 1.3B to 14B parameters, achieving both few-step quality and multi-step scalability"
        ],
        href: "https://arxiv.org/abs/2605.13724",
        paperLink: "AnyFlow: Any-Step Video Diffusion Model with On-Policy Flow Map Distillation",
      },
      {
        num: 2,
        tag: "Audio-Driven Motion Generation",
        title: "UMo: Unified Sparse Motion Modeling for Real-Time Co-Speech Avatars",
        description: "UMo is a unified sparse motion modeling architecture for real-time co-speech avatars that achieves real-time performance while maintaining high fidelity through spatially sparse Mixture-of-Experts (MoE) and temporally sparse keyframe-centric design. The method processes text, audio, and motion tokens within a unified autoregressive formulation, using four expert networks for facial expressions, upper body, lower body, and gestures respectively. The keyframe-centric design reformulates full-sequence prediction into a two-stage paradigm: the language model predicts only sparse keyframes, and a lightweight interpolation network reconstructs non-keyframe intervals. A three-stage training strategy with targeted audio augmentation maintains fine-grained speech-motion alignment under strict latency constraints.",
        keyPoints: [
          "Spatial sparse MoE routes distinct body regions to dedicated experts, enhancing motion fidelity while maintaining high throughput for streaming inference",
          "Keyframe-centric design achieves real-time dense reconstruction by predicting sparse keyframes with interpolation, preserving fine-grained motion details",
          "Three-stage training and audio augmentation effectively alleviate paired data scarcity, improving acoustic diversity and semantic consistency"
        ],
        href: "https://arxiv.org/abs/2605.14731",
        paperLink: "UMo: Unified Sparse Motion Modeling for Real-Time Co-Speech Avatars",
      },
      {
        num: 3,
        tag: "Sparse-Control Motion Synthesis",
        title: "AnchorRoute: Human Motion Synthesis with Interval-Routed Sparse Control",
        description: "AnchorRoute uses sparse anchors as a shared scaffold for both generation and refinement, supporting root-trajectory, planar-path, and body-point control families. During generation, anchors are injected into a frozen Transition Masked Diffusion (TMD) prior through AnchorKV with dual-context conditioning; during refinement, RouteSolver uses anchor residuals to project soft-token updates onto anchor-defined piecewise-affine interval bases. The method outperforms prior sparse-control methods under the sparse keyjoint protocol, with the generator preserving text-motion quality and RouteSolver providing a controllable path toward stronger anchor adherence.",
        keyPoints: [
          "Anchor scaffold defines both generation-time condition memory and refinement-time interval update space, decoupling control from quality",
          "AnchorKV and dual-context conditioning learn sparse spatial control on frozen TMD prior, preserving pretrained generation capabilities",
          "RouteSolver's interval-routed refinement operates only on soft-token variables with fixed network parameters, providing controllable anchor adherence"
        ],
        href: "https://arxiv.org/abs/2605.14716",
        paperLink: "AnchorRoute: Human Motion Synthesis with Interval-Routed Sparse Control",
      },
      {
        num: 4,
        tag: "Video Generation Evaluation",
        title: "MechVerse: Evaluating Physical Motion Consistency in Video Generation",
        description: "MechVerse is a benchmark for mechanically consistent image-to-video generation, containing 21,156 synthetic clips from 1,357 mechanical assemblies across 141 categories. The dataset is organized into three complexity tiers: Easy (independent motion), Medium (pairwise coupling), and Hard (densely coupled multi-part). Each clip is paired with structured prompts describing part identities, stationary supports, moving components, motion primitives, direction, speed/extent, and inter-part dependencies. Evaluation reveals that current models often fail to generate mechanically admissible motion despite preserving appearance and smoothness, with errors increasing as coupling complexity grows. This benchmark provides insights for dance video evaluation: kinematic constraint checking methods can be adapted to assess biomechanical plausibility of generated dance motions.",
        keyPoints: [
          "Three-tier complexity structure (independent/pairwise/dense coupling) enables diagnostic analysis of model performance across motion complexity regimes",
          "Structured prompts with six semantic components (part identity, motion type, direction, speed, dependencies) enable fine-grained motion control",
          "Perceptual video quality is weakly correlated with mechanical correctness, requiring specialized physical consistency evaluation metrics"
        ],
        href: "https://arxiv.org/abs/2605.14843",
        paperLink: "MechVerse: Evaluating Physical Motion Consistency in Video Generation Models",
      },
      {
        num: 5,
        tag: "Flow Matching Optimization",
        title: "The Velocity Deficit: Initial Energy Injection for Flow Matching",
        description: "This study identifies a critical issue in Flow Matching practice: the Velocity Deficit. The MSE objective systematically underestimates velocity magnitude, causing generated samples to fail reaching the data manifold (Integration Lag). The analysis reveals velocity contraction plays opposing roles: harmful at trajectory start (signal starvation) and beneficial at end (detail-preserving denoising). Two complementary solutions are proposed: training-based Magnitude-Aware Flow Matching (MAFM) and training-free Scale Schedule Corrector (SSC). SSC requires only one line of code, improving FID from 13.68 to 7.58 (44.6% improvement) on ImageNet-1k 256×256, achieving 5× speedup (50-step generator surpasses 250-step baseline). Methods generalize to text-to-image and high-resolution generation.",
        keyPoints: [
          "Mathematical proof: MSE objective convexity causes learned velocity magnitude to strictly underestimate target energy, creating systematic Velocity Deficit",
          "Velocity contraction is harmful at t→0 (signal starvation causes structural defects) but beneficial at t→1 (implicit denoising preserves details)",
          "SSC is plug-and-play inference intervention with zero retraining overhead, simple γ(t) = 1 + α(1-t)^β form is highly effective"
        ],
        href: "https://arxiv.org/abs/2605.14819",
        paperLink: "The Velocity Deficit: Initial Energy Injection for Flow Matching",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "MiVE: Multiscale Vision-Language Features for Reference-Guided Video Editing",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2605.14664",
        description: "Leverages hierarchical features from Qwen3-VL (early layers for spatial details, deep layers for global semantics) for reference-guided video editing, eliminating modality mismatch in cross-attention designs.",
      },
      {
        num: 7,
        title: "FactorizedHMR: A Hybrid Framework for Video Human Mesh Recovery",
        tag: "Human Reconstruction",
        href: "https://arxiv.org/abs/2605.14854",
        description: "Two-stage framework distinguishing torso-root anchor (deterministic regression) from non-torso articulation (probabilistic flow matching), with geometry-aware supervision and feature-aware CFG for occlusion-heavy recovery.",
      },
      {
        num: 8,
        title: "BioHuman: Learning Biomechanical Human Representations from Video",
        tag: "Motion Analysis",
        href: "https://arxiv.org/abs/2605.14772",
        description: "Simulation-based framework estimating muscle activations from motion capture datasets, building BioHuman10M dataset; end-to-end model jointly predicts human motion and muscle activations from monocular video.",
      },
      {
        num: 9,
        title: "Video-Zero: Self-Evolution Video Understanding",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2605.14733",
        description: "Annotation-free Questioner-Solver co-evolution framework centered on temporally localized evidence; Questioner discovers informative evidence segments and generates evidence-grounded questions.",
      },
      {
        num: 10,
        title: "Probing into Camera Control of Video Models",
        tag: "Camera Control",
        href: "https://arxiv.org/abs/2605.14815",
        description: "Reformulates camera control as displacement fields applied via differentiable resampling of latent features during denoising, enabling effective camera control without training.",
      },
    ],
    observation: "Today's papers demonstrate a clear shift in video generation from 'can generate' to 'generates fast and well.' AnyFlow's flow map distillation and Velocity Deficit's initial energy injection improve diffusion model efficiency from architectural and training dynamics perspectives respectively, with potential synergistic effects when combined. UMo and AnchorRoute demonstrate the importance of 'sparsity' in motion generation tasks—whether spatial sparsity via MoE or temporal sparsity via keyframes, both are key to breaking real-time bottlenecks. For music-to-dance tasks, these technologies provide clear migration paths: AnyFlow's distillation framework can accelerate dance video generation, UMo's audio-motion alignment strategy can adapt to music-dance alignment, and AnchorRoute's sparse anchor control can maintain reference person appearance. MechVerse reminds us that dance video evaluation should not only focus on visual quality but also on the physical plausibility of motion itself.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-14`,
        'en': `/en/daily/music-to-dance/2026-05-14`,
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
      date="2026-05-14"
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
