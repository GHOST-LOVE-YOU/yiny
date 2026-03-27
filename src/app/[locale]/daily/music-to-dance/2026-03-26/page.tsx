import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "长视频生成与身份保持：舞蹈生成的关键技术突破",
    overview: [
      "FreeLOC 提出分层稀疏注意力(TSA)与位置重编码(VRPR)，无需训练即可将视频扩散模型扩展到长序列生成",
      "AnyID 实现多参考图像统一表示与属性级控制，为舞蹈人物外观保持提供新思路",
      "TrajLoom 通过流匹配生成密集未来轨迹，支持更连贯的舞蹈动作预测与引导"
    ],
    papers: [
      {
        num: 1,
        tag: "长视频生成",
        title: "FreeLOC：无需训练的长视频生成框架",
        description: "FreeLOC 针对预训练视频扩散模型在生成超长视频时的两个核心问题——帧级相对位置OOD和上下文长度OOD——提出了优雅的解决方案。Video-based Relative Position Re-encoding (VRPR) 通过多粒度策略重新编码时间相对位置，将近帧保持细粒度精度、远帧保持全局一致性。Tiered Sparse Attention (TSA) 则在不同时间尺度上分配注意力密度：短距离密集注意力保留细节，远距离条纹注意力维持全局连贯。更关键的是，FreeLOC 引入层自适应探测机制，识别每个 Transformer 层对OOD问题的敏感度，仅在最关键的层应用修正。对于 music-to-dance 任务，这意味着可以在不重新训练模型的情况下，将舞蹈视频从当前的短片段扩展到完整歌曲长度，同时保持动作连贯性和视觉质量。",
        keyPoints: [
          "VRPR 多粒度位置重编码：分层处理近/远帧的位置外推问题",
          "TSA 分层稀疏注意力：在局部细节与长程依赖之间取得平衡",
          "层自适应探测：识别敏感层并选择性应用修正，避免过度干预"
        ],
        href: "https://arxiv.org/abs/2603.25209",
        paperLink: "Free-Lunch Long Video Generation via Layer-Adaptive O.O.D Correction",
      },
      {
        num: 2,
        tag: "跨模态对齐",
        title: "EagleNet：能量感知的细粒度文本-视频关系学习",
        description: "EagleNet 针对文本-视频检索中文本表达力不足的问题，提出 Fine-Grained Relationship Learning (FRL) 机制。与仅关注文本-帧交互的方法不同，FRL 构建文本-帧关系图，同时学习文本与帧之间、帧与帧之间的关系，将帧上下文信息聚合到 enriched text embedding 中。Energy-Aware Matching (EAM) 进一步引入能量模型建模细粒度交互。对于 music-to-dance 任务，这一思路可直接迁移：将音乐特征视为"文本"，舞蹈帧视为"视频"，构建音乐-帧关系图来学习节拍与动作的细粒度对齐。Sigmoid loss 替代 softmax contrastive loss 的设计也适用于多对多的音乐-舞蹈匹配场景。",
        keyPoints: [
          "FRL 关系图学习：同时建模文本-帧和帧-帧关系，捕获时序上下文",
          "EAM 能量匹配：用能量模型建模细粒度交互分布",
          "Sigmoid Loss：更适合多对多匹配场景的稳定训练目标"
        ],
        href: "https://arxiv.org/abs/2603.25267",
        paperLink: "EagleNet: Energy-Aware Fine-Grained Relationship Learning Network for Text-Video Retrieval",
      },
      {
        num: 3,
        tag: "身份保持",
        title: "AnyID：多参考统一表示的身份保持视频生成",
        description: "⚠️ 基于摘要：AnyID 突破单张参考图的限制，提出 scalable omni-referenced architecture 统一处理人脸、肖像、视频等异构身份输入。Primary-referenced generation paradigm 指定一个主参考作为锚点，通过 differential prompt 实现属性级控制（如改变发型但保持面部）。训练后使用强化学习进行偏好微调，针对身份保真度和提示可控性两个维度优化。对于 music-to-dance，这意味着可以综合利用用户提供的多张参考图和视频片段来构建更完整的身份表示，解决单张图难以捕捉3D面部结构和表情动态的问题。",
        keyPoints: [
          "Omni-referenced 架构：统一表示人脸/肖像/视频等多种参考形式",
          "Primary-referenced 范式：主参考锚定+差异提示实现属性级控制",
          "RLHF 微调：针对身份保真度和可控性的人类偏好优化"
        ],
        href: "https://arxiv.org/abs/2603.25188",
        paperLink: "AnyID: Ultra-Fidelity Universal Identity-Preserving Video Generation from Any Visual References",
      },
      {
        num: 4,
        tag: "动作生成",
        title: "BiMD：跨语言文本到动作生成的对齐策略",
        description: "⚠️ 基于摘要：BiMD 提出首个双语文本-动作数据集 BiHumanML3D 和跨语言对齐 (CLA) 策略。通过显式对齐不同语言的语义表示，构建鲁棒的条件空间支持高质量动作生成，包括零样本代码切换场景。对于 music-to-dance 任务，音乐可以视为一种"跨语言"的模态——CLA 的对齐思想可用于将音乐特征（如节拍、旋律、情感）对齐到动作语义空间，实现更精准的音乐-舞蹈条件生成。",
        keyPoints: [
          "BiHumanML3D：首个双语文本-动作基准数据集",
          "CLA 跨语言对齐：显式对齐语义表示构建鲁棒条件空间",
          "零样本代码切换：支持混合语言输入的动作生成"
        ],
        href: "https://arxiv.org/abs/2603.25178",
        paperLink: "Bilingual Text-to-Motion Generation: A New Benchmark and Baselines",
      },
      {
        num: 5,
        tag: "轨迹预测",
        title: "TrajLoom：密集未来轨迹的流匹配生成",
        description: "TrajLoom 提出从观测轨迹和视频预测未来轨迹的生成框架。Grid-Anchor Offset Encoding 将绝对坐标转换为相对于网格锚点的偏移量，减少位置相关偏差。TrajLoom-VAE 学习紧凑的时空隐空间，TrajLoom-Flow 使用 rectified flow 在隐空间生成未来轨迹，支持81帧预测（SOTA仅24帧）。对于 music-to-dance，密集轨迹预测可用于：1) 舞蹈动作预演与规划；2) 作为中间表示引导视频生成（类似 Wan-Move）；3) 评估生成舞蹈的物理合理性。Flow matching 的生成方式也支持多模态未来预测，可生成多样化的舞蹈变体。",
        keyPoints: [
          "Grid-Anchor Offset Encoding：偏移编码减少位置偏差",
          "TrajLoom-Flow：rectified flow 生成支持81帧长程预测",
          "下游应用：轨迹可直接用于运动控制视频生成与编辑"
        ],
        href: "https://arxiv.org/abs/2603.22606",
        paperLink: "TrajLoom: Dense Future Trajectory Generation from Video",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "OmniWeaving：统一视频生成的多模态组合推理",
        tag: "统一生成",
        href: "https://arxiv.org/abs/2603.24458",
        description: "统一视频生成框架，支持交错文本/图像/视频输入的时间绑定，可为 music-to-dance 的多条件融合提供参考。",
      },
      {
        num: 7,
        title: "RealMaster：渲染到真实视频的转换",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2603.23462",
        description: "IC-LoRA 训练策略将3D引擎输出转换为真实感视频，可用于提升舞蹈生成的视觉真实感。",
      },
      {
        num: 8,
        title: "ABot-PhysWorld：物理一致的视频世界模型",
        tag: "物理一致性",
        href: "https://arxiv.org/abs/2603.23376",
        description: "DPO-based 后训练框架抑制非物理行为，可用于改进舞蹈动作的物理合理性。",
      },
      {
        num: 9,
        title: "LaMP：3D场景流作为运动先验",
        tag: "运动先验",
        href: "https://arxiv.org/abs/2603.25399",
        description: "Flow-matching 运动专家与动作专家的交叉注意力机制，可为舞蹈动作建模提供参考。",
      },
      {
        num: 10,
        title: "InstanceAnimator：多实例草图视频着色",
        tag: "多实例控制",
        href: "https://arxiv.org/abs/2603.25357",
        description: "Instance Matching Mechanism 解决多角色场景对齐问题，可扩展到多人物舞蹈生成。",
      },
    ],
    observation: "今日论文呈现两个显著趋势：一是长视频生成的技术突破——FreeLOC 和 TrajLoom 分别从位置编码和轨迹预测角度解决了长序列生成的核心挑战，为生成完整长度的舞蹈视频提供了可行路径；二是多条件统一表示的兴起——AnyID 和 OmniWeaving 都强调异构输入的统一处理，这与 music-to-dance 需要同时处理音频、参考图、文本描述的需求高度契合。建议关注将 flow matching 与强化学习结合的训练范式，这可能在舞蹈生成的可控性和多样性之间取得更好平衡。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Long Video Generation & Identity Preservation: Key Breakthroughs for Dance Generation",
    overview: [
      "FreeLOC proposes Tiered Sparse Attention (TSA) and Video-based Relative Position Re-encoding (VRPR) to extend video diffusion models to long sequences without training",
      "AnyID enables unified multi-reference representation and attribute-level control, offering new insights for dancer appearance preservation",
      "TrajLoom generates dense future trajectories via flow matching, supporting more coherent dance motion prediction and guidance"
    ],
    papers: [
      {
        num: 1,
        tag: "Long Video Generation",
        title: "FreeLOC: Training-Free Framework for Long Video Generation",
        description: "FreeLOC elegantly addresses two core challenges when extending pretrained video diffusion models to ultra-long videos: frame-level relative position OOD and context-length OOD. Video-based Relative Position Re-encoding (VRPR) employs a multi-granularity strategy to re-encode temporal relative positions—maintaining fine-grained precision for nearby frames while preserving global coherence for distant ones. Tiered Sparse Attention (TSA) allocates attention density across temporal scales: dense attention for short-range details and striped attention for long-range consistency. Crucially, FreeLOC introduces a layer-adaptive probing mechanism that identifies each Transformer layer's sensitivity to OOD issues, applying corrections only to the most critical layers. For music-to-dance tasks, this means extending dance videos from short clips to full song lengths without retraining, while maintaining motion coherence and visual quality.",
        keyPoints: [
          "VRPR multi-granularity re-encoding: Hierarchical handling of near/far frame position extrapolation",
          "TSA tiered sparse attention: Balancing local detail and long-range dependencies",
          "Layer-adaptive probing: Identifying sensitive layers for selective correction"
        ],
        href: "https://arxiv.org/abs/2603.25209",
        paperLink: "Free-Lunch Long Video Generation via Layer-Adaptive O.O.D Correction",
      },
      {
        num: 2,
        tag: "Cross-Modal Alignment",
        title: "EagleNet: Energy-Aware Fine-Grained Text-Video Relationship Learning",
        description: "EagleNet addresses insufficient text expressiveness in text-video retrieval through Fine-Grained Relationship Learning (FRL). Unlike methods focusing only on text-frame interactions, FRL constructs a text-frame relational graph, learning relationships between text-frame and frame-frame to aggregate frame contextual information into enriched text embeddings. Energy-Aware Matching (EAM) further introduces energy models for fine-grained interaction modeling. For music-to-dance, this approach directly transfers: treat music features as 'text' and dance frames as 'video', building a music-frame relational graph to learn beat-to-motion fine-grained alignment. The sigmoid loss design also suits many-to-many music-dance matching scenarios.",
        keyPoints: [
          "FRL relational graph learning: Modeling text-frame and frame-frame relationships simultaneously",
          "EAM energy matching: Using energy models for fine-grained interaction distribution",
          "Sigmoid Loss: Stable training objective better suited for many-to-many matching"
        ],
        href: "https://arxiv.org/abs/2603.25267",
        paperLink: "EagleNet: Energy-Aware Fine-Grained Relationship Learning Network for Text-Video Retrieval",
      },
      {
        num: 3,
        tag: "Identity Preservation",
        title: "AnyID: Multi-Reference Unified Representation for Identity-Preserving Video Generation",
        description: "⚠️ Based on abstract: AnyID breaks the limitation of single reference images, proposing a scalable omni-referenced architecture that unifies heterogeneous identity inputs including faces, portraits, and videos. The primary-referenced generation paradigm designates one main reference as an anchor, using differential prompts for attribute-level control (e.g., changing hairstyle while preserving face). Post-training RLHF optimization targets both identity fidelity and prompt controllability. For music-to-dance, this means leveraging multiple user-provided reference images and video clips to build more complete identity representations, solving the problem that single images cannot capture 3D facial structure and expression dynamics.",
        keyPoints: [
          "Omni-referenced architecture: Unified representation for faces/portraits/videos",
          "Primary-referenced paradigm: Main reference anchor + differential prompt for attribute control",
          "RLHF fine-tuning: Human preference optimization for identity fidelity and controllability"
        ],
        href: "https://arxiv.org/abs/2603.25188",
        paperLink: "AnyID: Ultra-Fidelity Universal Identity-Preserving Video Generation from Any Visual References",
      },
      {
        num: 4,
        tag: "Motion Generation",
        title: "BiMD: Cross-Lingual Alignment for Text-to-Motion Generation",
        description: "⚠️ Based on abstract: BiMD proposes the first bilingual text-motion dataset BiHumanML3D and Cross-Lingual Alignment (CLA) strategy. By explicitly aligning semantic representations across languages, it builds a robust conditional space supporting high-quality motion generation including zero-shot code-switching. For music-to-dance, music can be viewed as a 'cross-lingual' modality—CLA's alignment concept can transfer music features (beat, melody, emotion) to motion semantic space, enabling more precise music-dance conditional generation.",
        keyPoints: [
          "BiHumanML3D: First bilingual text-motion benchmark dataset",
          "CLA cross-lingual alignment: Explicit semantic alignment for robust conditional space",
          "Zero-shot code-switching: Motion generation supporting mixed-language inputs"
        ],
        href: "https://arxiv.org/abs/2603.25178",
        paperLink: "Bilingual Text-to-Motion Generation: A New Benchmark and Baselines",
      },
      {
        num: 5,
        tag: "Trajectory Prediction",
        title: "TrajLoom: Flow Matching Generation for Dense Future Trajectories",
        description: "TrajLoom proposes a generative framework for predicting future trajectories from observed tracks and video. Grid-Anchor Offset Encoding converts absolute coordinates to offsets relative to grid anchors, reducing location-dependent bias. TrajLoom-VAE learns compact spatiotemporal latent spaces, while TrajLoom-Flow uses rectified flow to generate future trajectories in latent space, supporting 81-frame prediction (SOTA only 24). For music-to-dance, dense trajectory prediction enables: 1) Dance motion rehearsal and planning; 2) Intermediate representation for guiding video generation (similar to Wan-Move); 3) Evaluating physical plausibility of generated dances. Flow matching also supports multimodal future prediction for diverse dance variations.",
        keyPoints: [
          "Grid-Anchor Offset Encoding: Offset encoding reduces position bias",
          "TrajLoom-Flow: Rectified flow generation supports 81-frame long-horizon prediction",
          "Downstream applications: Trajectories directly usable for motion-controlled video generation"
        ],
        href: "https://arxiv.org/abs/2603.22606",
        paperLink: "TrajLoom: Dense Future Trajectory Generation from Video",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "OmniWeaving: Unified Video Generation with Multimodal Composition",
        tag: "Unified Generation",
        href: "https://arxiv.org/abs/2603.24458",
        description: "Unified video generation framework supporting temporal binding of interleaved text/image/video inputs, relevant for music-to-dance multi-condition fusion.",
      },
      {
        num: 7,
        title: "RealMaster: Rendering to Photorealistic Video Translation",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2603.23462",
        description: "IC-LoRA training strategy converts 3D engine output to photorealistic video, applicable for enhancing visual realism of dance generation.",
      },
      {
        num: 8,
        title: "ABot-PhysWorld: Physically Consistent Video World Models",
        tag: "Physical Consistency",
        href: "https://arxiv.org/abs/2603.23376",
        description: "DPO-based post-training framework suppresses unphysical behaviors, applicable for improving physical plausibility of dance motions.",
      },
      {
        num: 9,
        title: "LaMP: 3D Scene Flow as Latent Motion Prior",
        tag: "Motion Prior",
        href: "https://arxiv.org/abs/2603.25399",
        description: "Flow-matching motion expert and action expert cross-attention mechanism, relevant for dance motion modeling.",
      },
      {
        num: 10,
        title: "InstanceAnimator: Multi-Instance Sketch Video Colorization",
        tag: "Multi-Instance Control",
        href: "https://arxiv.org/abs/2603.25357",
        description: "Instance Matching Mechanism addresses multi-character alignment, extensible to multi-person dance generation.",
      },
    ],
    observation: "Two significant trends emerge in today's papers: First, breakthroughs in long video generation—FreeLOC and TrajLoom address core challenges of long-sequence generation from position encoding and trajectory prediction perspectives respectively, providing viable paths for generating full-length dance videos. Second, the rise of multi-condition unified representation—both AnyID and OmniWeaving emphasize unified processing of heterogeneous inputs, highly aligned with music-to-dance's need to simultaneously handle audio, reference images, and text descriptions. We recommend exploring training paradigms combining flow matching with reinforcement learning, which may achieve better balance between controllability and diversity in dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-26`,
        'en': `/en/daily/music-to-dance/2026-03-26`,
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
      date="2026-03-26"
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