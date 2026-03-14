import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "音乐驱动舞蹈",
    title: "2026-03-13 | 视频生成控制与效率优化新进展",
    overview: [
      "多主体视频定制与全粒度运动控制取得突破，身份保持与运动控制的权衡问题得到缓解",
      "自适应视频token化技术显著降低计算开销，为实时生成提供新思路",
      "流式空间智能与统一视觉骨干网络推动长序列视频理解与实时推理发展"
    ],
    papers: [
      {
        num: 1,
        tag: "视频定制",
        title: "DreamVideo-Omni: 多主体全粒度运动控制的统一框架",
        description: "DreamVideo-Omni 通过渐进式两阶段训练范式，首次实现了多主体身份保持与全粒度运动控制的统一。第一阶段整合主体外观、全局运动、局部动态和相机运动的综合控制信号，引入条件感知的3D RoPE协调异构输入，并通过层次化运动注入策略增强全局运动引导。为解决多主体场景中的控制歧义问题，论文提出可学习的组和角色嵌入，将运动信号显式锚定到特定身份。第二阶段设计了潜在身份奖励反馈学习范式，在预训练视频扩散骨干上训练潜在身份奖励模型(LIRM)，在潜在空间提供运动感知的身份奖励，优先保证符合人类偏好的身份保持。",
        keyPoints: [
          "条件感知3D RoPE：为异构输入分配不同的时空索引，实现更快的收敛和更稳定的训练",
          "组和角色嵌入：显式解耦复杂场景为独立可控实例，解决多主体运动信号绑定问题",
          "潜在身份奖励模型：基于VDM构建，评估视频级身份一致性，避免昂贵的VAE解码"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "Token化",
        title: "EVATok: 自适应长度视频Token化提升AR生成效率",
        description: "EVATok 提出了一种四阶段框架，根据视频内容复杂度自适应分配token数量，实现质量-成本的最佳权衡。传统视频tokenizer对不同视频块采用统一token分配，导致简单静态片段token浪费而复杂动态片段token不足。EVATok通过代理tokenizer估计最优token分配，训练轻量级router进行快速预测，最终自适应tokenizer根据router预测的分配进行编码。在UCF-101上，相比LARP和固定长度基线，EVATok至少节省24.4%的token使用量，同时达到SOTA的类别到视频生成质量。",
        keyPoints: [
          "代理奖励指标：量化特定token分配的质量-成本权衡，用于识别最优分配",
          "轻量级router：ViT架构，将视频分类到最优token分配，实现单次预测",
          "VideoMAE语义判别器：结合视频表示对齐，显著提升重建和下游AR生成质量"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
      {
        num: 3,
        tag: "空间智能",
        title: "Spatial-TTT: 测试时训练实现流式空间智能",
        description: "Spatial-TTT 将测试时训练(TTT)范式应用于流式视觉空间智能任务，通过在线更新快速权重来捕获和组织长时程场景视频中的空间证据。核心挑战不仅是更长的上下文窗口，而是如何在时间上选择、组织和保留空间信息。论文设计了混合架构，以3:1比例交错TTT层与自注意力锚定层，采用大块更新与滑动窗口注意力并行实现高效处理。引入空间预测机制，在TTT层的Q/K/V上应用轻量级深度可分离3D时空卷积，鼓励模型捕获几何对应和时序连续性。在VSI-Bench上，Spatial-TTT实现了SOTA性能，特别是在路线规划(84.6%)和相对方向(72.3%)任务上表现突出。",
        keyPoints: [
          "混合TTT架构：75% TTT层+25%自注意力锚定层，平衡长上下文压缩与全上下文推理",
          "空间预测机制：3×3×3深度可分离卷积聚合局部邻域上下文，增强空间一致性",
          "密集场景描述数据集：从SceneVerse构建，提供全局上下文、物体计数和空间关系的丰富监督"
        ],
        href: "https://arxiv.org/abs/2603.12255",
        paperLink: "Spatial-TTT: Streaming Visual-based Spatial Intelligence with Test-Time Training",
      },
      {
        num: 4,
        tag: "统一骨干",
        title: "OmniStream: 统一流式视觉骨干实现感知-重建-行动",
        description: "OmniStream 提出了一个统一的流式视觉骨干网络，通过因果时空注意力和3D旋转位置编码(3D-RoPE)支持高效的逐帧在线处理。模型在29个数据集上进行多任务预训练，结合静态与时序表示学习、流式几何重建和视觉-语言对齐。3D-RoPE采用2:3:3的维度分配策略(时间:高度:宽度)，将时间分量交织到原始2D RoPE中。实验表明，即使严格冻结骨干网络，OmniStream在图像/视频探测、流式几何重建、复杂视频与空间推理以及机器人操作任务上都达到了与专业专家相当或更优的性能。在VSI-Bench上达到70.6%的平均准确率，在CALVIN和SIMPLER-ENV机器人操作基准上分别达到3.89和45.8%的成功率。",
        keyPoints: [
          "因果时空注意力：严格时序因果性，通过persistent KV-cache实现逐帧在线处理",
          "3D-RoPE位置编码：扩展2D RoPE到时空域，支持长序列的位置推理",
          "多任务协同训练：静态/时序表示、几何重建、VLA对齐三类目标相互促进"
        ],
        href: "https://arxiv.org/abs/2603.12265",
        paperLink: "OmniStream: Mastering Perception, Reconstruction and Action in Continuous Streams",
      },
      {
        num: 5,
        tag: "相机控制",
        title: "ShotVerse: 电影级多镜头视频创作的相机控制",
        description: "ShotVerse 针对文本驱动的多镜头视频生成中的相机控制瓶颈，提出了'Plan-then-Control'框架。核心洞察是(Caption, Trajectory, Video)三元组形成内在联合分布，可以连接自动化规划与精确执行。Planner基于VLM，利用空间先验从文本生成电影级、全局对齐的轨迹；Controller基于整体多镜头视频骨干，通过相机适配器将轨迹渲染为多镜头视频内容。论文构建了ShotVerse-Bench数据集，包含20.5K高制作水准的电影片段，通过自动化多镜头相机标定流程将单镜头轨迹对齐到统一全局坐标系。在三轨评估协议上，ShotVerse在轨迹规划、执行保真度和端到端生成质量上均表现优异。",
        keyPoints: [
          "Plan-then-Control范式：解耦规划与执行，避免联合训练的不稳定性",
          "4D旋转位置编码：显式告知模型镜头边界，强制镜头内一致性",
          "自动化相机标定：四步流程(动态前景移除→单镜头局部重建→联合关键帧全局重建→锚点对齐)"
        ],
        href: "https://arxiv.org/abs/2603.11421",
        paperLink: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "DVD: 确定性视频深度估计",
        tag: "深度估计",
        href: "https://arxiv.org/abs/2603.12250",
        description: "将预训练视频扩散模型适配为单遍深度回归器，通过潜在流形校正(LMR)和全局仿射一致性实现长视频无缝推理。",
      },
      {
        num: 7,
        title: "ELIT: 弹性Latent接口的扩散Transformer",
        tag: "高效推理",
        href: "https://arxiv.org/abs/2603.12245",
        description: "通过可学习变长latent接口解耦输入大小与计算量，轻量级Read/Write交叉注意力层优先处理重要区域。",
      },
      {
        num: 8,
        title: "EvoTok: 残差进化统一图像Tokenizer",
        tag: "Tokenizer",
        href: "https://arxiv.org/abs/2603.12108",
        description: "通过残差向量量化将图像编码为级联残差token序列，早期阶段捕获低级细节，深层阶段过渡到高级语义表示。",
      },
      {
        num: 9,
        title: "GRADE: 图像编辑的学科知识推理基准",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2603.12264",
        description: "首个评估图像编辑中学科知识和推理能力的基准，包含10个学术领域的520个精选样本和多维评估协议。",
      },
      {
        num: 10,
        title: "Mobile-GS: 移动端实时高斯溅射",
        tag: "实时渲染",
        href: "https://arxiv.org/abs/2603.11531",
        description: "面向移动设备的实时高斯溅射方法，深度感知无序渲染消除排序瓶颈，神经视角相关增强策略建模视角相关效果。",
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：视频生成领域正在从生成质量向可控性与效率双轨演进。DreamVideo-Omni和ShotVerse分别解决了多主体控制和相机控制的精细化问题，而EVATok则从token化角度优化计算效率。值得注意的是，Spatial-TTT和OmniStream代表的流式处理范式对music-to-dance任务具有直接参考价值——长序列舞蹈视频生成需要维护时序一致性，而TTT机制和因果注意力提供了无需重新训练的自适应方案。此外，3D-RoPE和4D-RoPE等位置编码技术的演进，为处理舞蹈动作的空间-时序耦合提供了新工具。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "2026-03-13 | Advances in Video Generation Control and Efficiency",
    overview: [
      "Breakthrough in multi-subject video customization with omni-motion control, mitigating the trade-off between identity preservation and motion control",
      "Adaptive video tokenization significantly reduces computational overhead, offering new directions for real-time generation",
      "Streaming spatial intelligence and unified visual backbones advance long-sequence video understanding and real-time inference"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Customization",
        title: "DreamVideo-Omni: Unified Framework for Multi-Subject Omni-Motion Control",
        description: "DreamVideo-Omni achieves unified multi-subject customization with omni-motion control through a progressive two-stage training paradigm. Stage 1 integrates comprehensive control signals including subject appearances, global motion, local dynamics, and camera movements. It introduces condition-aware 3D RoPE to coordinate heterogeneous inputs and hierarchical motion injection to enhance global motion guidance. To resolve multi-subject ambiguity, learnable group and role embeddings explicitly anchor motion signals to specific identities. Stage 2 designs a latent identity reward feedback learning paradigm, training a Latent Identity Reward Model (LIRM) on a pretrained video diffusion backbone to provide motion-aware identity rewards in latent space, prioritizing identity preservation aligned with human preferences.",
        keyPoints: [
          "Condition-aware 3D RoPE: Assigns distinct spatiotemporal indices to heterogeneous inputs for faster convergence",
          "Group and role embeddings: Explicitly disentangle complex scenes into independent controllable instances",
          "Latent Identity Reward Model: VDM-based evaluation of video-level identity consistency without expensive VAE decoding"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "Tokenization",
        title: "EVATok: Adaptive Length Video Tokenization for Efficient AR Generation",
        description: "EVATok introduces a four-stage framework that adaptively allocates tokens based on video content complexity to achieve optimal quality-cost trade-offs. Traditional video tokenizers use uniform token assignment across temporal blocks, wasting tokens on simple static segments while underserving dynamic complex ones. EVATok estimates optimal token assignments via a proxy tokenizer, trains a lightweight router for fast prediction, and trains adaptive tokenizers encoding videos based on router-predicted assignments. On UCF-101, EVATok achieves at least 24.4% token savings compared to LARP and fixed-length baselines while reaching SOTA class-to-video generation quality.",
        keyPoints: [
          "Proxy reward metric: Quantifies quality-cost trade-off for specific token assignments to identify optimal allocation",
          "Lightweight router: ViT architecture classifying videos to optimal token assignments in a single pass",
          "VideoMAE semantic discriminator: Combined with video representation alignment, significantly improves reconstruction and downstream AR generation"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
      {
        num: 3,
        tag: "Spatial Intelligence",
        title: "Spatial-TTT: Streaming Spatial Intelligence via Test-Time Training",
        description: "Spatial-TTT applies the Test-Time Training (TTT) paradigm to streaming visual spatial intelligence, updating fast weights online to capture and organize spatial evidence from long-horizon scene videos. The core challenge is not simply longer context windows but how spatial information is selected, organized, and retained over time. The paper designs a hybrid architecture interleaving TTT layers with self-attention anchor layers at a 3:1 ratio, adopting large-chunk updates parallel with sliding-window attention for efficient processing. A spatial-predictive mechanism applies lightweight depthwise 3D spatiotemporal convolution on TTT layer Q/K/V to encourage capturing geometric correspondence and temporal continuity. On VSI-Bench, Spatial-TTT achieves SOTA performance, particularly excelling in route planning (84.6%) and relative direction (72.3%) tasks.",
        keyPoints: [
          "Hybrid TTT architecture: 75% TTT layers + 25% self-attention anchor layers balance long-context compression with full-context reasoning",
          "Spatial-predictive mechanism: 3×3×3 depthwise separable convolution aggregates local neighborhood context for spatial coherence",
          "Dense scene description dataset: Built from SceneVerse providing rich supervision for global context, object counts, and spatial relations"
        ],
        href: "https://arxiv.org/abs/2603.12255",
        paperLink: "Spatial-TTT: Streaming Visual-based Spatial Intelligence with Test-Time Training",
      },
      {
        num: 4,
        tag: "Unified Backbone",
        title: "OmniStream: Unified Streaming Visual Backbone for Perception, Reconstruction and Action",
        description: "OmniStream proposes a unified streaming visual backbone supporting efficient frame-by-frame online processing via causal spatiotemporal attention and 3D Rotary Positional Embeddings (3D-RoPE). The model is pre-trained on 29 datasets with a multi-task framework coupling static and temporal representation learning, streaming geometric reconstruction, and vision-language alignment. 3D-RoPE adopts a 2:3:3 dimension allocation strategy (time:height:width), interleaving temporal components into the original 2D RoPE. Experiments show that even with a strictly frozen backbone, OmniStream achieves competitive or superior performance across image/video probing, streaming geometric reconstruction, complex video and spatial reasoning, and robotic manipulation. It reaches 70.6% average accuracy on VSI-Bench and 3.89 / 45.8% success rates on CALVIN and SIMPLER-ENV robotic manipulation benchmarks.",
        keyPoints: [
          "Causal spatiotemporal attention: Strict temporal causality with persistent KV-cache for frame-by-frame online processing",
          "3D-RoPE positional encoding: Extends 2D RoPE to spatiotemporal domain supporting position reasoning over long sequences",
          "Multi-task synergistic training: Static/temporal representation, geometric reconstruction, and VLA alignment mutually reinforce"
        ],
        href: "https://arxiv.org/abs/2603.12265",
        paperLink: "OmniStream: Mastering Perception, Reconstruction and Action in Continuous Streams",
      },
      {
        num: 5,
        tag: "Camera Control",
        title: "ShotVerse: Cinematic Camera Control for Multi-Shot Video Creation",
        description: "ShotVerse addresses the camera control bottleneck in text-driven multi-shot video generation with a Plan-then-Control framework. The key insight is that (Caption, Trajectory, Video) triplets form an inherent joint distribution connecting automated plotting and precise execution. The Planner, based on VLM, leverages spatial priors to generate cinematic, globally-aligned trajectories from text; the Controller, based on a holistic multi-shot video backbone, renders these trajectories into multi-shot video via a camera adapter. The paper constructs ShotVerse-Bench dataset with 20.5K high-production cinematic clips, aligning single-shot trajectories into a unified global coordinate system through an automated multi-shot camera calibration pipeline. Under a three-track evaluation protocol, ShotVerse demonstrates superior performance in trajectory planning, execution fidelity, and end-to-end generation quality.",
        keyPoints: [
          "Plan-then-Control paradigm: Decouples planning and execution, avoiding instability of joint training",
          "4D Rotary Positional Embedding: Explicitly informs model of shot boundaries, enforcing intra-shot consistency",
          "Automated camera calibration: Four-step pipeline (dynamic foreground removal → single-shot local reconstruction → joint keyframe global reconstruction → anchor-based alignment)"
        ],
        href: "https://arxiv.org/abs/2603.11421",
        paperLink: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "DVD: Deterministic Video Depth Estimation",
        tag: "Depth Estimation",
        href: "https://arxiv.org/abs/2603.12250",
        description: "Adapts pretrained video diffusion models into single-pass depth regressors via Latent Manifold Rectification (LMR) and global affine coherence for seamless long-video inference.",
      },
      {
        num: 7,
        title: "ELIT: Elastic Latent Interfaces for Diffusion Transformers",
        tag: "Efficient Inference",
        href: "https://arxiv.org/abs/2603.12245",
        description: "Decouples input size from compute via learnable variable-length latent interfaces, with lightweight Read/Write cross-attention layers prioritizing important regions.",
      },
      {
        num: 8,
        title: "EvoTok: Unified Image Tokenizer via Residual Evolution",
        tag: "Tokenizer",
        href: "https://arxiv.org/abs/2603.12108",
        description: "Encodes images into cascaded residual token sequences via residual vector quantization, with early stages capturing low-level details and deeper stages transitioning to high-level semantics.",
      },
      {
        num: 9,
        title: "GRADE: Benchmarking Discipline-Informed Reasoning in Image Editing",
        tag: "Benchmark",
        href: "https://arxiv.org/abs/2603.12264",
        description: "First benchmark assessing discipline-informed knowledge and reasoning in image editing, with 520 curated samples across 10 academic domains and multi-dimensional evaluation protocol.",
      },
      {
        num: 10,
        title: "Mobile-GS: Real-time Gaussian Splatting for Mobile Devices",
        tag: "Real-time Rendering",
        href: "https://arxiv.org/abs/2603.11531",
        description: "Mobile-tailored real-time Gaussian Splatting with depth-aware order-independent rendering eliminating sorting bottleneck and neural view-dependent enhancement.",
      },
    ],
    observation: "Today's papers reveal a clear technical trend: video generation is evolving from generation quality toward dual-track controllability and efficiency. DreamVideo-Omni and ShotVerse address fine-grained control for multi-subject and camera control respectively, while EVATok optimizes computational efficiency from the tokenization perspective. Notably, the streaming processing paradigms represented by Spatial-TTT and OmniStream have direct reference value for music-to-dance tasks—long-sequence dance video generation requires maintaining temporal consistency, and TTT mechanisms with causal attention provide adaptive solutions without retraining. Furthermore, the evolution of positional encoding techniques like 3D-RoPE and 4D-RoPE offers new tools for handling the spatial-temporal coupling of dance movements.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-13`,
        'en': `/en/daily/music-to-dance/2026-03-13`,
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
      date="2026-03-13"
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