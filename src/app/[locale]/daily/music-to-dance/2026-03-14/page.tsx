import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "多主体运动控制与自适应视频表征：舞蹈生成的新工具箱",
    overview: [
      "DreamVideo-Omni 提出统一框架实现多主体身份保持与全粒度运动控制，其 group/role embeddings 和 latent identity reward 机制可直接迁移到舞蹈生成",
      "ShotVerse 的 Plan-then-Control 范式为音乐驱动的舞蹈镜头规划提供新思路，将文本描述转化为显式相机轨迹",
      "EVATok 的自适应视频 tokenization 可显著降低长舞蹈序列的推理成本，动态分配计算资源到复杂动作片段"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成 / 运动控制",
        title: "DreamVideo-Omni：多主体视频定制的全运动控制框架",
        description: "DreamVideo-Omni 是首个在单一 DiT 架构中统一多主体身份定制与全粒度运动控制的框架。论文提出渐进式两阶段训练范式：第一阶段通过 condition-aware 3D RoPE 协调异构输入（参考图像、边界框、轨迹点），并引入 group 和 role embeddings 显式锚定运动信号到特定身份，解决多主体场景中的控制歧义问题；第二阶段设计 latent identity reward feedback learning，在潜空间训练视频扩散模型-based 的奖励模型，提供运动感知的身份一致性评估，避免传统方法中 VAE 解码的高计算开销。实验表明，该方法在 DreamOmni Bench 上实现了优越的身份保持和运动控制精度，且零样本解锁了图像到视频生成和首帧条件轨迹控制能力。",
        keyPoints: [
          "Group/Role Embeddings：通过可学习的组和角色嵌入显式绑定运动信号到特定主体，解决多主体场景中的控制歧义",
          "Latent Identity Reward Model：基于预训练视频扩散模型构建奖励模型，在潜空间评估运动感知身份一致性，避免像素级解码开销",
          "分层运动注入：通过层级 zero-convolution 将边界框条件注入每层 DiT，增强全局运动控制精度"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "相机控制 / 多镜头",
        title: "ShotVerse：电影级相机控制的文本驱动多镜头视频创作",
        description: "ShotVerse 提出 Plan-then-Control 框架解决电影级多镜头视频生成中的相机控制瓶颈。核心洞察是 (Caption, Trajectory, Video) 三元组形成固有联合分布，可连接自动化规划与精确执行。框架包含两个协作智能体：Planner 基于 VLM 从文本生成全局对齐的电影级相机轨迹，Controller 通过轻量级相机适配器将轨迹渲染为多镜头视频内容。论文还提出自动化多镜头相机标定流程，将独立单镜头轨迹对齐到统一全局坐标系，构建 ShotVerse-Bench 数据集。实验显示，该方法在相机精度和跨镜头一致性方面显著优于现有方法，为舞蹈视频的复杂镜头调度提供了可迁移的技术路径。",
        keyPoints: [
          "Plan-then-Control 范式：将生成解耦为规划（文本→轨迹）和控制（轨迹→视频）两个阶段，各自独立优化又保持分布对齐",
          "4D RoPE 位置编码：扩展标准 3D 位置嵌入为 4D（shot/frame/height/width），显式建模多镜头层次结构，增强镜头内一致性",
          "自动化相机标定：通过动态前景移除、单镜头局部重建、联合关键帧全局重建和锚点对齐四步流程，实现多镜头轨迹的统一坐标对齐"
        ],
        href: "https://arxiv.org/abs/2603.11421",
        paperLink: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
      },
      {
        num: 3,
        tag: "视频表征 / 自回归生成",
        title: "EVATok：自适应长度视频 Tokenization 实现高效视觉自回归生成",
        description: "EVATok 针对自回归视频生成模型中固定长度 tokenization 的效率瓶颈，提出自适应长度视频 tokenizer 框架。核心创新是引入 proxy reward 指标量化质量-成本权衡，通过四阶段流程实现最优 token 分配预测：训练 proxy tokenizer 评估不同分配、构建 (video, optimal assignment) 数据集、训练轻量级 router 快速预测最优分配、最终训练自适应 tokenizer。论文还结合视频语义编码器（V-JEPA2-L, VideoMAE）进行表示对齐和对抗训练。实验表明，EVATok 在 UCF-101 上实现 SOTA 类别到视频生成质量，同时相比 LARP 和固定长度基线节省至少 24.4% 的 token 使用量，为长舞蹈视频生成的效率优化提供了直接可用的技术方案。",
        keyPoints: [
          "Proxy Reward 指标：定义 R_proxy = w_q·Q(E,x,a) - w_l·L(a) 量化质量-成本权衡，指导最优 token 分配识别",
          "四阶段训练流程：proxy tokenizer → 数据集构建 → router 训练 → 最终 tokenizer，解决训练-推理差距问题",
          "视频语义编码器集成：结合 V-JEPA2-L 表示对齐和 VideoMAE 语义判别器，显著提升重建和下游生成质量"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Spatial-TTT：基于测试时训练的流式视觉空间智能",
        tag: "视频理解 / 3D 空间",
        href: "https://arxiv.org/abs/2603.12255",
        description: "通过 TTT 层中的 3D 时空卷积空间预测机制，捕获帧间几何对应和时序连续性，可用于舞蹈场景的空间关系建模。",
      },
      {
        num: 5,
        title: "ELIT：扩散 Transformer 的弹性潜接口",
        tag: "扩散模型 / DiT",
        href: "https://arxiv.org/abs/2603.12245",
        description: "插入可学习的变长 token 序列作为潜接口，通过轻量级读写交叉注意力在输入 token 和潜变量间传递信息，支持根据计算约束动态调整潜变量数量。",
      },
      {
        num: 6,
        title: "EndoCoT：扩散模型中的内生思维链推理",
        tag: "扩散模型 / DiT",
        href: "https://arxiv.org/abs/2603.12252",
        description: "通过迭代思维引导模块激活 MLLM 推理潜力，将潜在思维状态桥接到 DiT 去噪过程，可能提升复杂舞蹈动作序列的生成质量。",
      },
      {
        num: 7,
        title: "基于加权 h-Transform 采样的粗引导视觉生成",
        tag: "视频生成 / 扩散",
        href: "https://arxiv.org/abs/2603.12057",
        description: "使用 h-Transform 工具约束随机过程，通过漂移函数引导生成朝向理想样本，可作为低分辨率姿态指导下的高清舞蹈视频生成增强手段。",
      },
    ],
    observation: "本周论文呈现出视频生成领域从单一控制维度向多维度协同控制的演进趋势。DreamVideo-Omni 和 ShotVerse 共同揭示了显式结构化控制信号（group/role embeddings、4D RoPE）对于复杂视频生成任务的关键作用，这与 music-to-dance 中音频-运动-外观三重对齐的需求高度契合。EVATok 的自适应 tokenization 则提示我们，舞蹈视频生成不仅关注质量，更需在长序列推理效率上寻求突破——舞蹈动作的重复性和周期性恰好适合自适应分配计算资源。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Multi-Subject Motion Control & Adaptive Video Representation: New Tools for Dance Generation",
    overview: [
      "DreamVideo-Omni proposes a unified framework for multi-subject identity preservation and omni-motion control, with group/role embeddings and latent identity reward mechanisms directly transferable to dance generation",
      "ShotVerse's Plan-then-Control paradigm offers new insights for music-driven dance shot planning, transforming text descriptions into explicit camera trajectories",
      "EVATok's adaptive video tokenization can significantly reduce inference costs for long dance sequences, dynamically allocating computational resources to complex motion segments"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation / Motion Control",
        title: "DreamVideo-Omni: A Unified Framework for Multi-Subject Video Customization with Omni-Motion Control",
        description: "DreamVideo-Omni is the first framework to unify multi-subject identity customization and omni-granularity motion control within a single DiT architecture. The paper proposes a progressive two-stage training paradigm: Stage 1 uses condition-aware 3D RoPE to coordinate heterogeneous inputs (reference images, bounding boxes, trajectory points) and introduces group and role embeddings to explicitly anchor motion signals to specific identities, resolving control ambiguity in multi-subject scenarios; Stage 2 designs latent identity reward feedback learning, training a video diffusion model-based reward model in latent space to provide motion-aware identity consistency evaluation, avoiding the high computational overhead of VAE decoding in traditional methods. Experiments demonstrate superior identity preservation and motion control precision on DreamOmni Bench, with zero-shot unlocking of image-to-video generation and first-frame-conditioned trajectory control capabilities.",
        keyPoints: [
          "Group/Role Embeddings: Explicitly bind motion signals to specific subjects through learnable group and role embeddings, resolving control ambiguity in multi-subject scenarios",
          "Latent Identity Reward Model: Build reward model based on pretrained video diffusion model, evaluating motion-aware identity consistency in latent space without pixel-level decoding overhead",
          "Hierarchical Motion Injection: Enhance global motion control precision by injecting bounding box conditions into each DiT layer through hierarchical zero-convolutions"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "Camera Control / Multi-Shot",
        title: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
        description: "ShotVerse proposes a Plan-then-Control framework to address the camera control bottleneck in cinematic multi-shot video generation. The core insight is that (Caption, Trajectory, Video) triplets form an inherent joint distribution that can connect automated planning with precise execution. The framework comprises two collaborative agents: a Planner based on VLM that generates globally aligned cinematic camera trajectories from text, and a Controller that renders trajectories into multi-shot video content through a lightweight camera adapter. The paper also proposes an automated multi-shot camera calibration pipeline that aligns independent single-shot trajectories into a unified global coordinate system, constructing the ShotVerse-Bench dataset. Experiments show significant improvements in camera accuracy and cross-shot consistency compared to existing methods, providing transferable technical pathways for complex shot scheduling in dance videos.",
        keyPoints: [
          "Plan-then-Control Paradigm: Decouple generation into planning (text→trajectory) and control (trajectory→video) stages, independently optimized while maintaining distribution alignment",
          "4D RoPE Positional Encoding: Extend standard 3D positional embeddings to 4D (shot/frame/height/width), explicitly modeling multi-shot hierarchical structure and enhancing intra-shot consistency",
          "Automated Camera Calibration: Achieve unified coordinate alignment of multi-shot trajectories through four-step pipeline: dynamic foreground removal, single-shot local reconstruction, joint keyframe global reconstruction, and anchor-based alignment"
        ],
        href: "https://arxiv.org/abs/2603.11421",
        paperLink: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
      },
      {
        num: 3,
        tag: "Video Representation / Autoregressive Generation",
        title: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
        description: "EVATok addresses the efficiency bottleneck of fixed-length tokenization in autoregressive video generation models by proposing an adaptive length video tokenizer framework. The core innovation is introducing the proxy reward metric to quantify quality-cost trade-offs, achieving optimal token allocation prediction through a four-stage pipeline: training proxy tokenizer to evaluate different allocations, constructing (video, optimal assignment) dataset, training lightweight router for fast optimal assignment prediction, and finally training adaptive tokenizer. The paper also combines video semantic encoders (V-JEPA2-L, VideoMAE) for representation alignment and adversarial training. Experiments show EVATok achieves SOTA class-to-video generation quality on UCF-101 while saving at least 24.4% token usage compared to LARP and fixed-length baselines, providing directly applicable technical solutions for efficiency optimization in long dance video generation.",
        keyPoints: [
          "Proxy Reward Metric: Define R_proxy = w_q·Q(E,x,a) - w_l·L(a) to quantify quality-cost trade-offs, guiding optimal token allocation identification",
          "Four-Stage Training Pipeline: proxy tokenizer → dataset construction → router training → final tokenizer, addressing training-inference gap issues",
          "Video Semantic Encoder Integration: Combine V-JEPA2-L representation alignment and VideoMAE semantic discriminator, significantly improving reconstruction and downstream generation quality"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Spatial-TTT: Streaming Visual-based Spatial Intelligence with Test-Time Training",
        tag: "Video Understanding / 3D Spatial",
        href: "https://arxiv.org/abs/2603.12255",
        description: "Capture geometric correspondence and temporal continuity across frames through 3D spatiotemporal convolution spatial prediction mechanism in TTT layers, applicable for spatial relationship modeling in dance scenes.",
      },
      {
        num: 5,
        title: "ELIT: Elastic Latent Interfaces for Diffusion Transformers",
        tag: "Diffusion / DiT",
        href: "https://arxiv.org/abs/2603.12245",
        description: "Insert learnable variable-length token sequences as latent interfaces, transferring information between input tokens and latents through lightweight read-write cross-attention, supporting dynamic adjustment of latent quantity based on computational constraints.",
      },
      {
        num: 6,
        title: "EndoCoT: Scaling Endogenous Chain-of-Thought Reasoning in Diffusion Models",
        tag: "Diffusion / DiT",
        href: "https://arxiv.org/abs/2603.12252",
        description: "Activate MLLM reasoning potential through iterative thought guidance module, bridging latent thought states to DiT denoising process, potentially improving generation quality for complex dance motion sequences.",
      },
      {
        num: 7,
        title: "Coarse-Guided Visual Generation via Weighted h-Transform Sampling",
        tag: "Video Generation / Diffusion",
        href: "https://arxiv.org/abs/2603.12057",
        description: "Use h-Transform tool to constrain stochastic processes, steering generation toward ideal samples through drift functions, serving as post-training enhancement for high-definition dance video generation under low-resolution pose guidance.",
      },
    ],
    observation: "This week's papers reveal an evolution in video generation from single-dimensional control toward multi-dimensional collaborative control. DreamVideo-Omni and ShotVerse jointly demonstrate the critical role of explicit structured control signals (group/role embeddings, 4D RoPE) for complex video generation tasks, which aligns closely with the triple alignment needs of audio-motion-appearance in music-to-dance. EVATok's adaptive tokenization further suggests that dance video generation must seek breakthroughs not only in quality but also in long-sequence inference efficiency—the repetitiveness and periodicity of dance movements are well-suited for adaptive computational resource allocation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-14`,
        'en': `/en/daily/music-to-dance/2026-03-14`,
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
      date="2026-03-14"
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
