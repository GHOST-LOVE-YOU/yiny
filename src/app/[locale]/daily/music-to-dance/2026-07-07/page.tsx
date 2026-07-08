import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "音视频对齐与身份一致性：从跨模态注意力到运动先验",
    overview: [
      "Flowley 的 Progressive Soft-masked Cross-Attention 为零计算开销的音频-视觉同步提供了可直接迁移的方案",
      "VTMR 的两阶段音视频对齐框架（语义检索+时序重排）与 music-to-dance 的音频-运动对齐问题同构",
      "Aura 的 VLM-grounded 语义对齐和 Subject-Aware RoPE-Shift 机制可有效解决参考人物的身份漂移问题"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "Flowley：零开销跨模态注意力实现精准视频到音频生成",
        description: "Flowley 提出了一种端到端的单阶段视频到音频生成框架，核心创新是 Progressive Soft-masked Cross-Attention（PSCA）机制。该机制将音频-视觉同步直接嵌入注意力层，相比标准注意力不增加任何计算成本。具体而言，PSCA 通过渐进式软掩码策略，在训练过程中动态调整音频和视觉特征的对齐强度，使模型能够自动学习细粒度的时间对应关系。实验表明，Flowley 在 VGGSound 数据集上达到了 SOTA 性能，且无需任何预训练的音视频对齐模块。对于 music-to-dance 任务，PSCA 可直接迁移到音频-运动对齐模块，替代当前方案中计算开销较大的显式同步机制，实现零额外成本的节拍-动作对齐。",
        keyPoints: [
          "PSCA 机制将音视频同步嵌入注意力层，零额外计算开销",
          "单阶段训练框架避免了多阶段 pipeline 的复杂性和误差累积",
          "SoundCap 数据增强 pipeline 可迁移用于舞蹈动作描述生成"
        ],
        href: "https://arxiv.org/abs/2607.06405",
        paperLink: "Precise Video-to-Audio Generation with Cross-Modal Alignment in Latent Space",
      },
      {
        num: 2,
        tag: "跨模态检索",
        title: "VTMR：语义检索与时序重排实现视频到音乐推荐",
        description: "VTMR 是一个两阶段的视频到音乐推荐框架。第一阶段通过多模态编码器（PEAV-base）将视频和音乐信号投影到共享的语义嵌入空间，实现高效的候选检索；第二阶段使用时序交叉编码器对候选音乐进行重排，直接关注视频和音乐的时序序列，捕捉细粒度的时间对应关系。这种「粗到细」的对齐策略与 music-to-dance 任务中的音频-运动对齐问题高度同构。VTMR 的时序重排机制（将序列重采样到固定长度后通过 Transformer 编码器计算匹配分数）可直接借鉴用于舞蹈生成中的音乐节拍-动作帧对齐，解决当前方案中全局嵌入难以捕捉局部时间对应的问题。",
        keyPoints: [
          "两阶段框架分离语义匹配和时序对齐，降低优化难度",
          "时序交叉编码器通过自注意力捕捉细粒度跨模态动态",
          "多模态融合策略（视觉+音频+文本）可扩展为（姿态+音频+文本）"
        ],
        href: "https://arxiv.org/abs/2607.05971",
        paperLink: "Multimodal Video-to-Music Recommendation via Semantic Retrieval and Temporal Reranking",
      },
      {
        num: 3,
        tag: "多视角视频生成",
        title: "MV-Forcing：4D 几何桥接实现长时多视角视频生成",
        description: "MV-Forcing 首次实现了任意长度、任意视角数量的长时多视角视频生成。核心创新包括：（1）使用自回归 4D 重建模型（CUT3R）作为几何桥接，在时序自回归和视角自回归之间建立几何一致性；（2）联合去噪训练策略，使模型能够从噪声初始化实现无界时序生成；（3）Distribution Matching Distillation 与 Spatio-Temporal Self-Forcing 结合，消除训练和推理的曝光偏差。对于 music-to-dance 任务，该框架的技术可直接迁移用于：生成多视角舞蹈视频以扩充训练数据、通过 4D 几何一致性约束提升单视角生成的时间稳定性、以及利用时空自蒸馏技术改进扩散模型的长时序一致性。",
        keyPoints: [
          "CUT3R 4D 重建模型作为几何桥接，避免双向注意力的计算瓶颈",
          "时空 Self-Forcing 机制消除长时序生成的曝光偏差",
          "Distribution Matching Distillation 实现少步数高质量采样"
        ],
        href: "https://arxiv.org/abs/2607.05376",
        paperLink: "MV-Forcing: Long Multi-View Video Generation via 4D-Grounded Spatio-Temporal Self-Forcing",
      },
      {
        num: 4,
        tag: "主体驱动视频生成",
        title: "Aura：VLM 语义对齐实现多主体一致性视频生成",
        description: "Aura 针对主体驱动视频生成中的身份一致性保持问题，提出了一套完整的解决方案。核心技术包括：（1）双分支条件注入：T5 文本流与 Qwen2.5-VL 视觉流通过共享 KV 交叉注意力融合，通过 T5-teacher 对齐机制实现无参数共享；（2）主体感知 RoPE-Shift：将不同主体类别映射到旋转位置编码的不同象限，避免特征冲突；（3）渐进式 APG（Adaptive Prompt Guidance）：仅在归一化层上应用渐进式引导，平衡文本遵循和身份保持。实验表明，Aura 在单主体和多主体场景均达到 SOTA。对于 music-to-dance 任务，Aura 的身份保持机制可直接应用于参考人物图的外观迁移，解决当前方案中常见的身份漂移和 copy-paste 伪影问题。",
        keyPoints: [
          "T5-VLM 双分支对齐实现文本和参考图像的协同条件注入",
          "Subject-Aware RoPE-Shift 通过位置编码分离不同主体特征",
          "四阶段训练课程（Coarse-Align → Refine-Align → Ref-Only → Joint-Mix）提升稳定性"
        ],
        href: "https://arxiv.org/abs/2607.04311",
        paperLink: "Aura: Consistent Multi-Subject Video Generation via VLM-Grounded Semantic Alignment",
      },
      {
        num: 5,
        tag: "运动生成",
        title: "HandPrior：先验-条件分离框架实现可控手部运动补全",
        description: "HandPrior 提出了一种「先验优先、条件其次」的运动生成范式。该框架首先从大规模无标注运动数据中学习通用的身体-手部运动学先验，然后通过轻量级适配器注入语义控制。核心设计包括：（1）流式自回归先验：基于扩散模型生成与身体运动学一致的手部运动；（2）运动学链级联注意力：沿运动学链（Root→Spine→Limbs）聚合信息，保持身体到手部的机械耦合；（3）语义分层适配器：在不同运动学层级注入条件信号，支持自监督参数控制和弱监督文本控制。该框架与 music-to-dance 任务高度相关：其身体条件化运动生成范式可直接迁移到音频条件化舞蹈生成，分层适配器设计为音频特征注入提供了清晰的接口，且仅需少量标注数据即可实现可控生成。",
        keyPoints: [
          "先验-条件分离范式降低了对大规模配对标注数据的依赖",
          "运动学链级联注意力保持身体部位间的物理协调性",
          "分层适配器设计支持多层级条件控制（全局风格+局部细节）"
        ],
        href: "https://arxiv.org/abs/2607.05938",
        paperLink: "Prior-First, Condition-Second: Scalable and Controllable Hand Motion Completion",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Wan-Streamer v0.2：低延迟高分辨率音视频交互模型",
        tag: "实时生成",
        href: "https://arxiv.org/abs/2607.04443",
        description: "Thinker-Performer 架构可在单 GPU 上实现 200ms 延迟的 640x368 分辨率视频生成，为实时舞蹈视频生成提供低延迟推理方案。"
      },
      {
        num: 7,
        title: "PixWorld：像素空间统一 3D 场景生成与重建",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2607.05373",
        description: "直接在像素空间监督扩散过程，避免 VAE 信息损失，其几何感知损失可迁移用于提升舞蹈视频的空间细节保真度。"
      },
      {
        num: 8,
        title: "UltraDiffEdit：无需微调的超高分辨率图像编辑",
        tag: "超分辨率",
        href: "https://arxiv.org/abs/2607.06136",
        description: "多尺度渐进编辑策略支持最高 8K 分辨率，可用于舞蹈视频的后处理增强和超分辨率重建。"
      },
      {
        num: 9,
        title: "Geometric Reciprocity：自监督立体视频生成",
        tag: "视角合成",
        href: "https://arxiv.org/abs/2607.05354",
        description: "基于几何互惠定理的自监督框架可利用单目视频学习视角合成，适用于舞蹈训练数据的多视角增强。"
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：音视频/运动对齐正从「显式模块+多阶段训练」向「隐式嵌入+端到端学习」演进。Flowley 的 PSCA 和 VTMR 的时序重排都表明，将跨模态对齐直接嵌入注意力机制而非依赖外部同步模块，是提升效率和精度的关键方向。同时，Aura 和 HandPrior 共同揭示了「先验学习+轻量适配」范式的威力——先在无标注数据上学习通用表示，再通过少量标注实现可控生成。这与 music-to-dance 任务的数据瓶颈高度契合：舞蹈动作标注成本高昂，但无标注视频数据丰富，借鉴这种范式可显著降低对配对数据的依赖。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Audio-Visual Alignment & Identity Consistency: From Cross-Modal Attention to Motion Priors",
    overview: [
      "Flowley's Progressive Soft-masked Cross-Attention offers a directly transferable solution for zero-cost audio-visual synchronization",
      "VTMR's two-stage audio-visual alignment framework (semantic retrieval + temporal reranking) is isomorphic to the audio-motion alignment problem in music-to-dance",
      "Aura's VLM-grounded semantic alignment and Subject-Aware RoPE-Shift effectively address identity drift in reference person images"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "Flowley: Zero-Cost Cross-Modal Attention for Precise Video-to-Audio Generation",
        description: "Flowley proposes an end-to-end single-stage video-to-audio generation framework. The core innovation is the Progressive Soft-masked Cross-Attention (PSCA) mechanism, which embeds audio-visual synchronization directly into the attention layer without adding any computational cost compared to standard attention. Specifically, PSCA dynamically adjusts the alignment strength between audio and visual features through progressive soft masking during training, enabling the model to automatically learn fine-grained temporal correspondences. Experiments show Flowley achieves SOTA performance on VGGSound without any pretrained audio-visual alignment modules. For music-to-dance tasks, PSCA can be directly transferred to the audio-motion alignment module, replacing computationally expensive explicit synchronization mechanisms in current approaches with zero additional cost for beat-action alignment.",
        keyPoints: [
          "PSCA embeds audio-visual sync into attention layers with zero computational overhead",
          "Single-stage training avoids complexity and error accumulation of multi-stage pipelines",
          "SoundCap data augmentation pipeline can be transferred for dance motion description generation"
        ],
        href: "https://arxiv.org/abs/2607.06405",
        paperLink: "Precise Video-to-Audio Generation with Cross-Modal Alignment in Latent Space",
      },
      {
        num: 2,
        tag: "Cross-Modal Retrieval",
        title: "VTMR: Video-to-Music Recommendation via Semantic Retrieval and Temporal Reranking",
        description: "VTMR is a two-stage video-to-music recommendation framework. Stage 1 projects video and music signals into a shared semantic embedding space using multimodal encoders (PEAV-base) for efficient candidate retrieval. Stage 2 employs a temporal cross-encoder to rerank candidates by directly attending to the temporal sequences of both video and music, capturing fine-grained temporal correspondences. This 'coarse-to-fine' alignment strategy is highly isomorphic to the audio-motion alignment problem in music-to-dance. VTMR's temporal reranking mechanism (resampling sequences to fixed length and computing matching scores via Transformer encoder) can be directly adapted for beat-frame alignment in dance generation, addressing the limitation of global embeddings in capturing local temporal correspondences.",
        keyPoints: [
          "Two-stage framework separates semantic matching and temporal alignment, reducing optimization difficulty",
          "Temporal cross-encoder captures fine-grained cross-modal dynamics via self-attention",
          "Multimodal fusion strategy (visual+audio+text) can be extended to (pose+audio+text)"
        ],
        href: "https://arxiv.org/abs/2607.05971",
        paperLink: "Multimodal Video-to-Music Recommendation via Semantic Retrieval and Temporal Reranking",
      },
      {
        num: 3,
        tag: "Multi-View Video Generation",
        title: "MV-Forcing: 4D Geometric Bridging for Long Multi-View Video Generation",
        description: "MV-Forcing achieves, for the first time, long multi-view video generation with arbitrary length and arbitrary number of viewpoints. Core innovations include: (1) using an autoregressive 4D reconstruction model (CUT3R) as a geometric bridge between temporal and view-wise autoregression; (2) a joint denoising training strategy enabling unbounded temporal generation from noise initialization; (3) combining Distribution Matching Distillation with Spatio-Temporal Self-Forcing to eliminate train-inference exposure bias. For music-to-dance tasks, this framework's techniques can be directly transferred for: generating multi-view dance videos for training data augmentation, improving temporal stability of single-view generation through 4D geometric consistency constraints, and leveraging spatio-temporal self-distillation to enhance long-horizon consistency of diffusion models.",
        keyPoints: [
          "CUT3R 4D reconstruction model as geometric bridge avoids computational bottleneck of bidirectional attention",
          "Spatio-temporal Self-Forcing mechanism eliminates exposure bias in long-horizon generation",
          "Distribution Matching Distillation enables few-step high-quality sampling"
        ],
        href: "https://arxiv.org/abs/2607.05376",
        paperLink: "MV-Forcing: Long Multi-View Video Generation via 4D-Grounded Spatio-Temporal Self-Forcing",
      },
      {
        num: 4,
        tag: "Subject-Driven Video Generation",
        title: "Aura: VLM-Grounded Semantic Alignment for Consistent Multi-Subject Video Generation",
        description: "Aura proposes a complete solution for identity consistency in subject-driven video generation. Core techniques include: (1) Dual-branch conditioning: T5 text stream and Qwen2.5-VL visual stream are fused via shared-KV cross-attention, enabled by T5-teacher alignment for parameter-free sharing; (2) Subject-Aware RoPE-Shift: mapping different subject categories to different quadrants of rotary position embeddings to avoid feature conflicts; (3) Progressive APG (Adaptive Prompt Guidance): applying progressive guidance only on normalization layers to balance text adherence and identity preservation. Experiments show Aura achieves SOTA in both single-subject and multi-subject scenarios. For music-to-dance tasks, Aura's identity preservation mechanisms can be directly applied to appearance transfer of reference person images, addressing common identity drift and copy-paste artifacts in current approaches.",
        keyPoints: [
          "T5-VLM dual-branch alignment enables synergistic conditioning of text and reference images",
          "Subject-Aware RoPE-Shift separates features of different subjects via position encoding",
          "Four-stage training curriculum (Coarse-Align → Refine-Align → Ref-Only → Joint-Mix) improves stability"
        ],
        href: "https://arxiv.org/abs/2607.04311",
        paperLink: "Aura: Consistent Multi-Subject Video Generation via VLM-Grounded Semantic Alignment",
      },
      {
        num: 5,
        tag: "Motion Generation",
        title: "HandPrior: Prior-First, Condition-Second Framework for Controllable Hand Motion Completion",
        description: "HandPrior proposes a 'prior-first, condition-second' paradigm for motion generation. The framework first learns a generic body-hand kinematic prior from large-scale unlabeled motion data, then injects semantic control via lightweight adapters. Core designs include: (1) Streaming autoregressive prior: generating hand motions kinematically consistent with body dynamics via diffusion models; (2) Kinematic chain cascading attention: aggregating information along the kinematic chain (Root→Spine→Limbs) to maintain mechanical body-hand coupling; (3) Semantically-layered adapters: injecting conditional signals at different kinematic levels, supporting both self-supervised parameter control and weakly-supervised text control. This framework is highly relevant to music-to-dance tasks: its body-conditioned motion generation paradigm can be directly transferred to audio-conditioned dance generation, the layered adapter design provides a clear interface for audio feature injection, and controllable generation can be achieved with only limited labeled data.",
        keyPoints: [
          "Prior-condition separation paradigm reduces reliance on large-scale paired annotation data",
          "Kinematic chain cascading attention maintains physical coordination between body parts",
          "Layered adapter design supports multi-level conditional control (global style + local details)"
        ],
        href: "https://arxiv.org/abs/2607.05938",
        paperLink: "Prior-First, Condition-Second: Scalable and Controllable Hand Motion Completion",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Wan-Streamer v0.2: Low-Latency High-Resolution Audio-Visual Interaction Model",
        tag: "Real-time Generation",
        href: "https://arxiv.org/abs/2607.04443",
        description: "Thinker-Performer architecture achieves 200ms latency for 640x368 resolution video generation on single GPU, providing low-latency inference solutions for real-time dance video generation."
      },
      {
        num: 7,
        title: "PixWorld: Unifying 3D Scene Generation and Reconstruction in Pixel Space",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2607.05373",
        description: "Directly supervises diffusion in pixel space, avoiding VAE information loss; its geometry-aware loss can be transferred to improve spatial detail fidelity in dance videos."
      },
      {
        num: 8,
        title: "UltraDiffEdit: Tuning-Free Ultra-High-Resolution Image Editing",
        tag: "Super-Resolution",
        href: "https://arxiv.org/abs/2607.06136",
        description: "Multi-scale progressive editing strategy supports up to 8K resolution, applicable for post-processing enhancement and super-resolution reconstruction of dance videos."
      },
      {
        num: 9,
        title: "Geometric Reciprocity: Self-Supervised Stereoscopic Video Generation",
        tag: "View Synthesis",
        href: "https://arxiv.org/abs/2607.05354",
        description: "Self-supervised framework based on geometric reciprocity theorem enables learning view synthesis from monocular videos, suitable for multi-view augmentation of dance training data."
      },
    ],
    observation: "Today's papers reveal a clear technical trend: audio-visual/motion alignment is evolving from 'explicit modules + multi-stage training' toward 'implicit embedding + end-to-end learning'. Both Flowley's PSCA and VTMR's temporal reranking demonstrate that embedding cross-modal alignment directly into attention mechanisms—rather than relying on external synchronization modules—is key to improving efficiency and accuracy. Meanwhile, Aura and HandPrior together reveal the power of the 'prior learning + lightweight adaptation' paradigm: first learning generic representations from unlabeled data, then achieving controllable generation with limited annotations. This aligns perfectly with the data bottleneck in music-to-dance tasks: dance motion annotation is costly, but unlabeled video data is abundant. Adopting this paradigm could significantly reduce dependence on paired data.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-07`,
        'en': `/en/daily/music-to-dance/2026-07-07`,
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
      date="2026-07-07"
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
