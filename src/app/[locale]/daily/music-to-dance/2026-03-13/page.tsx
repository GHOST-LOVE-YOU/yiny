import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "多主体视频定制与自适应Token化：身份保持与计算效率的新平衡",
    overview: [
      "DreamVideo-Omni 实现多主体身份保持与全粒度运动控制的统一框架",
      "EVATok 的自适应视频 token 化相比固定长度方法节省 24.4% token 使用量",
      "Spatial-TTT 的 test-time training 机制支持长时序空间理解",
      "OmniStream 的统一流式视觉骨干实现逐帧在线处理"
    ],
    papers: [
      {
        num: 1,
        tag: "多主体定制",
        title: "DreamVideo-Omni：全粒度运动控制的多主体视频定制",
        description: "DreamVideo-Omni 是首个统一多主体身份保持与全粒度运动控制的框架，解决现有方法在控制粒度、控制歧义和身份退化方面的局限。核心创新包括：渐进式两阶段训练范式——第一阶段整合主体外观、全局运动、局部动态和相机运动的综合控制信号，引入 condition-aware 3D RoPE 协调异构输入，分层运动注入策略增强全局运动引导，group 和 role embeddings 显式将运动信号锚定到特定身份；第二阶段设计 latent identity reward feedback 学习范式，在预训练视频扩散骨干上训练 Latent Identity Reward Model (LIRM)，在 latent 空间提供运动感知的身份奖励。与静态图像编码器（CLIP/DINO）不同，LIRM 利用 VDM 的时空先验评估视频级身份一致性，惩罚静态'复制粘贴'伪影，同时鼓励大运动下的鲁棒身份保持。实验表明，该方法在 DreamOmni Bench 上实现 SOTA 性能。对于 music-to-dance 任务，group/role embeddings 机制可直接迁移用于多人物舞蹈场景的运动-身份绑定，LIRM 的奖励学习范式可优化参考人物的外观迁移质量。",
        keyPoints: [
          "首个统一多主体定制与全粒度运动控制的框架，支持主体外观+全局运动+局部动态+相机运动",
          "group 和 role embeddings 显式锚定运动信号到特定身份，解决多主体控制歧义",
          "latent identity reward model 在 latent 空间提供运动感知身份奖励，避免 VAE 解码开销"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "自适应Token化",
        title: "EVATok：自适应长度视频Token化的高效视觉自回归生成",
        description: "EVATok 提出首个为每个视频预测最优 token 分配的自适应视频 token 化框架，解决传统 tokenizer 均匀分配 token 导致的效率低下问题（简单静态片段浪费 token，动态复杂片段 token 不足）。方法包含四阶段：训练 proxy tokenizer 估计最优分配；构建 (video, optimal assignment) 数据集训练轻量级 router；router 预测最优分配；最终 adaptive tokenizer 基于 router 预测进行编码。核心创新是 proxy reward 指标，同时衡量重建质量和 token 成本，识别质量-成本权衡最优的分配方案。实验表明，相比 LARP 和固定长度基线，EVATok 在 UCF-101 上实现 SOTA 类别到视频生成质量，同时节省至少 24.4% 的 token 使用量。对于 music-to-dance 生成，舞蹈动作区域需要更多 token 捕捉细节，静态背景需要更少 token，EVATok 的自适应分配可直接优化推理效率和生成质量。",
        keyPoints: [
          "首个预测每视频最优 token 分配的自适应视频 token 化框架，节省 24.4% token 使用量",
          "proxy reward 指标联合衡量重建质量和 token 成本，识别质量-成本最优分配",
          "router 网络快速预测最优分配，支持训练和推理阶段的自适应编码"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
      {
        num: 3,
        tag: "空间智能",
        title: "Spatial-TTT：基于Test-Time Training的流式视觉空间智能",
        description: "Spatial-TTT 提出首个基于 test-time training (TTT) 的流式视觉空间智能框架，解决长时序视频流中空间信息的选择、组织和保持问题。核心设计包括：混合架构——TTT 层与自注意力锚点层交错，平衡高效长上下文压缩与全上下文推理；大块更新策略——提高并行度和硬件效率；并行滑动窗口注意力——保持块内时空连续性。关键创新是 spatial-predictive 机制：在 TTT 分支中使用轻量级深度可分离 3D 时空卷积替代点向线性投影，聚合局部邻域上下文，鼓励快速权重学习时空上下文间的预测映射而非孤立 token，更好地捕捉几何对应和时序连续性。此外，构建密集 3D 场景描述数据集，要求模型生成涵盖全局上下文、物体计数和空间关系的综合描述，为学习快速权重更新动态提供丰富监督。实验表明，该方法在长时序空间理解基准上达到 SOTA。对于 music-to-dance 的长序列舞蹈视频，TTT 机制可帮助模型自适应地维护时序一致性，无需针对特定舞蹈重新训练。",
        keyPoints: [
          "首个基于 TTT 的流式视觉空间智能框架，快速权重作为紧凑非线性记忆累积空间证据",
          "spatial-predictive 机制使用 3D 时空卷积聚合局部上下文，捕捉几何对应和时序连续性",
          "密集 3D 场景描述数据集提供丰富监督，学习有效的快速权重更新动态"
        ],
        href: "https://arxiv.org/abs/2603.12255",
        paperLink: "Spatial-TTT: Streaming Visual-based Spatial Intelligence with Test-Time Training",
      },
      {
        num: 4,
        tag: "流式骨干",
        title: "OmniStream：连续流中的感知、重建与行动统一框架",
        description: "OmniStream 提出首个统一的流式视觉骨干，通过因果时空注意力和 3D-RoPE 支持高效的逐帧在线视频处理。当前视觉基础模型碎片化，分别专注于图像语义感知、离线时序建模或空间几何。OmniStream 通过 persistent KV-cache 实现因果流式推理，避免对过去帧的重复计算。多任务预训练框架耦合三个互补信号：静态和时序表示学习（自监督师生蒸馏，统一图像表示与因果视频建模）；流式几何重建（轻量级前馈双 DPT 和相机头预测深度图、射线图和相机位姿）；视觉-语言对齐（轻量级自回归语言解码器）。实验表明，即使严格冻结骨干，OmniStream 在图像/视频探测、流式几何重建、复杂视频和空间推理以及机器人操作（训练时未见）等任务上与专业专家相比保持竞争力。对于 music-to-dance 的实时音频驱动视频生成，该统一流式骨干提供了可直接部署的技术基础。",
        keyPoints: [
          "统一流式视觉骨干，因果时空注意力 + 3D-RoPE 支持逐帧在线处理",
          "persistent KV-cache 实现高效流式推理，避免历史帧重复计算",
          "多任务预训练耦合静态/时序表示、几何重建和视觉-语言对齐"
        ],
        href: "https://arxiv.org/abs/2603.12265",
        paperLink: "OmniStream: Mastering Perception, Reconstruction and Action in Continuous Streams",
      },
      {
        num: 5,
        tag: "相机控制",
        title: "ShotVerse：文本驱动的多镜头视频电影级相机控制",
        description: "ShotVerse 提出 'Plan-then-Control' 框架解决电影级多镜头场景中的相机控制瓶颈。现有方法要么难以准确遵循文本相机条件，要么无法确保多镜头设置中相机共享统一坐标系。核心洞察是 (Caption, Trajectory, Video) 三元组形成固有联合分布，可实现自动化绘图和精确执行的对齐。框架包含两个协作智能体：Planner——基于 VLM，利用空间先验从文本获取电影级全局对齐轨迹；Controller——通过相机适配器将轨迹渲染为多镜头视频内容。关键贡献是自动化多镜头相机校准流程，将不相交的单镜头轨迹对齐到统一全局坐标系，构建 ShotVerse-Bench 数据集。三轨评估协议全面测量电影级规划、执行保真度和多镜头一致性。实验表明，该方法在相机准确性和跨镜头一致性方面实现优越性能。对于舞蹈视频生成，'Plan-then-Control' 范式可扩展为音频驱动的相机运动规划，实现电影级舞蹈视频的多镜头自动编排。",
        keyPoints: [
          "'Plan-then-Control' 框架将多镜头相机控制解耦为规划和控制两阶段",
          "自动化多镜头相机校准流程对齐单镜头轨迹到统一全局坐标系",
          "VLM-based Planner 从文本生成电影级轨迹，Controller 渲染多镜头内容"
        ],
        href: "https://arxiv.org/abs/2603.11421",
        paperLink: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "DVD：基于生成先验的确定性视频深度估计",
        tag: "深度估计",
        href: "https://arxiv.org/abs/2603.12250",
        description: "将视频扩散模型适配为确定性深度估计器，latent manifold rectification 和 global affine coherence 技术对舞蹈视频 3D 几何一致性有参考价值。",
      },
      {
        num: 7,
        title: "ELIT：扩散Transformer的弹性Latent接口",
        tag: "计算效率",
        href: "https://arxiv.org/abs/2603.12245",
        description: "可学习变长 latent 接口根据计算预算动态调整 token 数量，对实时生成场景的计算-质量权衡有启发。",
      },
      {
        num: 8,
        title: "EvoTok：残差Latent进化的统一图像Tokenizer",
        tag: "Tokenizer",
        href: "https://arxiv.org/abs/2603.12108",
        description: "残差向量量化轨迹统一视觉理解与生成，对舞蹈视频多粒度表示学习有参考价值。",
      },
      {
        num: 9,
        title: "GRADE：图像编辑中的学科知识推理基准",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2603.12264",
        description: "多维评估协议（推理、一致性、可读性）对舞蹈视频生成质量评估体系设计有参考意义。",
      },
      {
        num: 10,
        title: "Mobile-GS：移动设备实时高斯Splatting",
        tag: "移动端渲染",
        href: "https://arxiv.org/abs/2603.11531",
        description: "深度感知无序渲染和神经增强策略对移动端实时舞蹈视频渲染有参考价值。",
      },
    ],
    observation: "今日论文聚焦两大主题：一是身份保持与多主体控制——DreamVideo-Omni 的 group/role embeddings 和 LIRM 为多人物舞蹈场景提供了技术路径；二是计算效率与自适应——EVATok 的自适应 token 分配和 ELIT 的弹性 latent 接口为实时 dance generation 优化了资源使用。Spatial-TTT 的 test-time training 和 OmniStream 的统一流式骨干进一步支持长序列和实时处理。对于 music-to-dance 系统，这些技术可组合：EVATok 优化 token 效率，DreamVideo-Omni 的身份机制保持参考人物一致性，OmniStream 提供流式推理基础，ShotVerse 的相机控制实现电影级多镜头编排。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Multi-Subject Video Customization & Adaptive Tokenization: New Balance Between Identity Preservation and Computational Efficiency",
    overview: [
      "DreamVideo-Omni achieves unified framework for multi-subject identity preservation and omni-granularity motion control",
      "EVATok's adaptive video tokenization saves 24.4% token usage compared to fixed-length methods",
      "Spatial-TTT's test-time training mechanism supports long-horizon spatial understanding",
      "OmniStream's unified streaming visual backbone enables frame-by-frame online processing"
    ],
    papers: [
      {
        num: 1,
        tag: "Multi-Subject Customization",
        title: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization",
        description: "DreamVideo-Omni is the first framework to unify multi-subject identity preservation with omni-granularity motion control, addressing limitations in control granularity, ambiguity, and identity degradation. Core innovations include: progressive two-stage training paradigm—Stage 1 integrates comprehensive control signals (subject appearances, global motion, local dynamics, camera movements), introduces condition-aware 3D RoPE to coordinate heterogeneous inputs, hierarchical motion injection strategy enhances global motion guidance, and group/role embeddings explicitly anchor motion signals to specific identities; Stage 2 designs latent identity reward feedback learning paradigm, training Latent Identity Reward Model (LIRM) on pretrained video diffusion backbone to provide motion-aware identity rewards in latent space. Unlike static image encoders (CLIP/DINO), LIRM leverages VDM's spatiotemporal priors to evaluate video-level identity consistency, penalizing static 'copy-paste' artifacts while encouraging robust identity preservation under large motion. For music-to-dance tasks, the group/role embeddings mechanism can be directly transferred for motion-identity binding in multi-person dance scenes, and LIRM's reward learning paradigm can optimize reference subject appearance transfer quality.",
        keyPoints: [
          "First unified framework for multi-subject customization and omni-granularity motion control: subject appearance + global motion + local dynamics + camera movement",
          "Group and role embeddings explicitly anchor motion signals to specific identities, resolving multi-subject control ambiguity",
          "Latent identity reward model provides motion-aware identity rewards in latent space, avoiding VAE decoding overhead"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "Adaptive Tokenization",
        title: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
        description: "EVATok proposes the first adaptive video tokenization framework that predicts optimal token allocation per video, addressing inefficiency in traditional tokenizers' uniform allocation (wasting tokens on simple static segments while underserving dynamic complex ones). The four-stage method: train proxy tokenizer to estimate optimal allocation; build (video, optimal assignment) dataset to train lightweight router; router predicts optimal allocation; final adaptive tokenizer encodes based on router predictions. Core innovation is the proxy reward metric that simultaneously measures reconstruction quality and token cost to identify quality-cost optimal allocations. Experiments show EVATok achieves SOTA class-to-video generation quality on UCF-101 while saving at least 24.4% token usage compared to LARP and fixed-length baselines. For music-to-dance generation, dance motion regions need more tokens for detail while static backgrounds need fewer—EVATok's adaptive allocation directly optimizes inference efficiency and generation quality.",
        keyPoints: [
          "First adaptive video tokenization framework predicting optimal token allocation per video, saving 24.4% token usage",
          "Proxy reward metric jointly measures reconstruction quality and token cost to identify quality-cost optimal allocation",
          "Router network rapidly predicts optimal allocation, supporting adaptive encoding in both training and inference"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
      {
        num: 3,
        tag: "Spatial Intelligence",
        title: "Spatial-TTT: Streaming Visual-based Spatial Intelligence with Test-Time Training",
        description: "Spatial-TTT proposes the first test-time training (TTT) based streaming visual spatial intelligence framework, addressing spatial information selection, organization, and retention in long-horizon video streams. Core designs include: hybrid architecture—TTT layers interleaved with self-attention anchor layers balance efficient long-context compression with full-context reasoning; large-chunk update strategy improves parallelism and hardware efficiency; parallel sliding-window attention preserves intra-chunk spatiotemporal continuity. Key innovation is the spatial-predictive mechanism: using lightweight depthwise 3D spatiotemporal convolutions in TTT branch instead of point-wise linear projections to aggregate local neighborhood context, encouraging fast weights to learn predictive mappings between spatiotemporal contexts rather than isolated tokens, better capturing geometric correspondence and temporal continuity. Additionally, a dense 3D scene description dataset is constructed requiring comprehensive descriptions covering global context, object counts, and spatial relations, providing rich supervision for learning effective fast-weight update dynamics. For long-sequence dance videos, TTT mechanism can help models adaptively maintain temporal consistency without retraining for specific dances.",
        keyPoints: [
          "First TTT-based streaming visual spatial intelligence framework, fast weights as compact non-linear memory accumulating spatial evidence",
          "Spatial-predictive mechanism uses 3D spatiotemporal convolutions to aggregate local context, capturing geometric correspondence and temporal continuity",
          "Dense 3D scene description dataset provides rich supervision for learning effective fast-weight update dynamics"
        ],
        href: "https://arxiv.org/abs/2603.12255",
        paperLink: "Spatial-TTT: Streaming Visual-based Spatial Intelligence with Test-Time Training",
      },
      {
        num: 4,
        tag: "Streaming Backbone",
        title: "OmniStream: Mastering Perception, Reconstruction and Action in Continuous Streams",
        description: "OmniStream proposes the first unified streaming visual backbone supporting efficient frame-by-frame online video processing through causal spatiotemporal attention and 3D-RoPE. Current visual foundation models are fragmented, specializing separately in image semantic perception, offline temporal modeling, or spatial geometry. OmniStream enables causal streaming inference via persistent KV-cache, avoiding recomputation over past frames. Multi-task pre-training framework couples three complementary signals: static and temporal representation learning (self-supervised student-teacher distillation unifying image representation with causal video modeling); streaming geometric reconstruction (lightweight feedforward dual DPT and camera heads predicting depth maps, ray maps, and camera poses); vision-language alignment (lightweight autoregressive language decoder). Experiments show that even with strictly frozen backbone, OmniStream maintains competitive performance with specialized experts across image/video probing, streaming geometric reconstruction, complex video and spatial reasoning, and robotic manipulation (unseen at training). For real-time audio-driven music-to-dance generation, this unified streaming backbone provides a directly deployable technical foundation.",
        keyPoints: [
          "Unified streaming visual backbone: causal spatiotemporal attention + 3D-RoPE supports frame-by-frame online processing",
          "Persistent KV-cache enables efficient streaming inference, avoiding historical frame recomputation",
          "Multi-task pre-training couples static/temporal representation, geometric reconstruction, and vision-language alignment"
        ],
        href: "https://arxiv.org/abs/2603.12265",
        paperLink: "OmniStream: Mastering Perception, Reconstruction and Action in Continuous Streams",
      },
      {
        num: 5,
        tag: "Camera Control",
        title: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
        description: "ShotVerse proposes a 'Plan-then-Control' framework addressing the camera control bottleneck in cinematic multi-shot scenarios. Existing methods either struggle to accurately follow textual camera conditions or fail to ensure cameras in multi-shot settings share a unified coordinate system. Core insight is that (Caption, Trajectory, Video) triplets form an inherent joint distribution enabling aligned automated plotting and precise execution. The framework comprises two collaborative agents: Planner—VLM-based, leverages spatial priors to obtain cinematic globally-aligned trajectories from text; Controller—renders trajectories into multi-shot video content via camera adapter. Key contribution is automated multi-shot camera calibration pipeline aligning disjoint single-shot trajectories into unified global coordinate system, constructing ShotVerse-Bench dataset. Three-track evaluation protocol comprehensively measures cinematic planning, execution fidelity, and multi-shot consistency. For dance video generation, 'Plan-then-Control' paradigm can be extended to audio-driven camera motion planning, enabling cinematic multi-shot automatic choreography.",
        keyPoints: [
          "'Plan-then-Control' framework decouples multi-shot camera control into planning and controlling phases",
          "Automated multi-shot camera calibration pipeline aligns single-shot trajectories to unified global coordinate system",
          "VLM-based Planner generates cinematic trajectories from text, Controller renders multi-shot content"
        ],
        href: "https://arxiv.org/abs/2603.11421",
        paperLink: "ShotVerse: Advancing Cinematic Camera Control for Text-Driven Multi-Shot Video Creation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "DVD: Deterministic Video Depth Estimation with Generative Priors",
        tag: "Depth Estimation",
        href: "https://arxiv.org/abs/2603.12250",
        description: "Adapts video diffusion models into deterministic depth regressors; latent manifold rectification and global affine coherence relevant for dance video 3D geometric consistency.",
      },
      {
        num: 7,
        title: "ELIT: Elastic Latent Interfaces for Diffusion Transformers",
        tag: "Computational Efficiency",
        href: "https://arxiv.org/abs/2603.12245",
        description: "Learnable variable-length latent interface dynamically adjusts token count based on compute budget, inspiring compute-quality trade-offs for real-time generation.",
      },
      {
        num: 8,
        title: "EvoTok: Unified Image Tokenizer via Residual Latent Evolution",
        tag: "Tokenizer",
        href: "https://arxiv.org/abs/2603.12108",
        description: "Residual vector quantization trajectory unifies visual understanding and generation, relevant for multi-granularity representation learning in dance videos.",
      },
      {
        num: 9,
        title: "GRADE: Benchmarking Discipline-Informed Reasoning in Image Editing",
        tag: "Evaluation Benchmark",
        href: "https://arxiv.org/abs/2603.12264",
        description: "Multi-dimensional evaluation protocol (reasoning, consistency, readability) provides reference for dance video generation quality assessment design.",
      },
      {
        num: 10,
        title: "Mobile-GS: Real-time Gaussian Splatting for Mobile Devices",
        tag: "Mobile Rendering",
        href: "https://arxiv.org/abs/2603.11531",
        description: "Depth-aware order-independent rendering and neural enhancement strategies relevant for real-time dance video rendering on mobile devices.",
      },
    ],
    observation: "Today's papers focus on two themes: identity preservation and multi-subject control—DreamVideo-Omni's group/role embeddings and LIRM provide technical paths for multi-person dance scenes; and computational efficiency and adaptability—EVATok's adaptive token allocation and ELIT's elastic latent interface optimize resource usage for real-time dance generation. Spatial-TTT's test-time training and OmniStream's unified streaming backbone further support long-sequence and real-time processing. For music-to-dance systems, these technologies can be combined: EVATok optimizes token efficiency, DreamVideo-Omni's identity mechanisms maintain reference subject consistency, OmniStream provides streaming inference foundation, and ShotVerse's camera control enables cinematic multi-shot choreography.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-12`,
        'en': `/en/daily/music-to-dance/2026-03-12`,
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
