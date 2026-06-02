import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-06-01 | 视频统一生成与长序列一致性",
    overview: [
      "Lumos-Nexus 提出 Unified Progressive Frequency Bridging，在共享潜空间中实现轻量生成器与大容量生成器的渐进式交接，为推理质量与视觉保真度的平衡提供新思路",
      "Robust Dreamer 针对长序列自回归生成的漂移问题，提出 Latent Gaussian Memory 和 Deviation Learning，直接解决 music-to-dance 长视频时序一致性挑战",
      "SwanSphere 的空间音频-视频对齐技术（SVAC 对比学习）可为节拍-动作同步任务提供迁移路径",
      "Representation Forcing 消除了统一多模态模型对外部 VAE 的依赖，为端到端视频生成提供新的架构范式"
    ],
    papers: [
      {
        num: 1,
        tag: "视频统一生成",
        title: "Lumos-Nexus：共享潜空间中的渐进式频率桥接",
        description: "Lumos-Nexus 提出了一种训练高效的统一视频生成框架，核心创新是 Unified Progressive Frequency Bridging (UPFB)。该方法在训练阶段仅对齐轻量级生成器与理解模块，使其学习推理驱动的语义控制；在推理阶段通过 UPFB 将生成责任渐进式地交接给高容量预训练生成器。UPFB 通过时序语义门控（Temporal Semantic Gating）和时变频率分解（Time-Varying Frequency Decomposition）实现粗细粒度的平滑过渡：早期步骤依赖小生成器维持语义一致性，后期步骤切换到大生成器增强视觉细节。实验显示该方法在 VBench 上显著提升了视觉真实感和时序连贯性，同时保持强推理能力。",
        keyPoints: [
          "UPFB 在速度域进行双频桥接，小生成器负责低频语义结构，大生成器贡献高频纹理细节",
          "通过余弦退火权重 wt 控制生成器间的渐进交接，避免直接混合导致的语义不稳定和纹理冲突",
          "RMS 对齐和能量再平衡机制确保两个生成器在融合点处的速度场幅度匹配，防止过曝和激活不稳定"
        ],
        href: "https://arxiv.org/abs/2605.31603",
        paperLink: "Lumos-Nexus: Efficient Frequency Bridging with Homogeneous Latent Space for Video Unified Models",
      },
      {
        num: 2,
        tag: "长序列视频生成",
        title: "Robust Dreamer：偏差感知潜高斯记忆",
        description: "Robust Dreamer 针对帧级动作控制的 AR 视频生成中的灾难性漂移问题，提出两个核心组件。首先是 Latent Gaussian Memory：将扩散潜变量直接锚定到高斯基元，通过潜空间高斯 splatting 进行召回，避免了反复 VAE 编解码导致的信息损失。其次是 Deviation Learning with Dynamic Deviation Archive：通过单步近似合成 rollout 引入的潜变量偏差，按自回归阶段和去噪时间戳分层存储，在训练时注入历史记忆以模拟推理时的 corrupted memory 状态。该方法在 ScanNet、DL3DV 和 OmniWorldGame 上达到 SOTA 长程性能，对 music-to-dance 的长舞蹈视频生成具有直接参考价值。",
        keyPoints: [
          "Latent Gaussian Memory 完全在潜空间操作，避免 Latent-RGB Cycling 造成的累积量化误差和颜色漂移",
          "Dynamic Deviation Archive 按 (autoregressive stage, denoising timestamp) 二维索引存储偏差，实现精细化的误差建模",
          "训练时以概率 p 注入偏差，让生成器学习在 corrupted memory 条件下进行内部修正"
        ],
        href: "https://arxiv.org/abs/2605.30855",
        paperLink: "Robust Dreamer: Deviation-Aware Latent Gaussian Memory for Action-Controlled AR Video Generation",
      },
      {
        num: 3,
        tag: "音频-视觉对齐",
        title: "SwanSphere：流式同步空间音频生成",
        description: "SwanSphere 提出了一种因果自回归扩散 Transformer 架构，用于从全景视频和文本提示生成高保真空间音频。核心创新包括 Spatial Video-Audio Contrastive (SVAC) 学习策略，通过设计四类物理感知的正负样本对（同位置正样本、跨位置负样本、跨时间负样本、静音负样本）来对齐视频编码器和声学域；以及多目标在线直接偏好优化（ODPO）方案，从美学、语义和空间感知三个维度对齐生成音频与人类偏好。该系统支持流式生成，首块延迟显著低于标准扩散模型，其音频-视觉对齐技术可直接迁移到 music-to-dance 的节拍-动作同步任务。",
        keyPoints: [
          "LocDiT (Localized DiT) 在 patch 内使用双向注意力进行去噪，平衡 AR 模型的时序建模与扩散模型的高保真生成",
          "SVAC 对比学习显式建模空间线索，解决 CLIP 编码器缺乏声学感知的问题",
          "课程学习策略：先在大规模单声道音频上预训练，再适应空间音频分布，提升泛化能力"
        ],
        href: "https://arxiv.org/abs/2605.30940",
        paperLink: "Towards Streaming Synchronized Spatial Audio Generation via Autoregressive Diffusion Transformer",
      },
      {
        num: 4,
        tag: "统一多模态模型",
        title: "Representation Forcing：无瓶颈统一多模态模型",
        description: "Representation Forcing (RF) 解决了统一多模态模型依赖外部预训练 VAE 的结构性瓶颈。RF 强制解码器在生成像素之前自回归地预测视觉表示作为中间 token，这些表示来自模型自身的理解编码器（通过 EMA 和在线向量量化获得），并保持在上下文中指导像素扩散。该方法将表示从感知输出转变为生成目标，使理解和生成共享单一的端到端学习表示空间。实验表明，RF-Pixel 模型在 GenEval 和 DPG-Bench 上匹配 VAE-based 基线，同时在理解任务上表现更优，证明像素空间生成与统一多模态建模的兼容性优于 VAE-based 方案。",
        keyPoints: [
          "在线向量量化使用 SwAV 动量更新和 Sinkhorn-Knopp 平衡，无需单独预训练 tokenizer",
          "表示 token 使用 2D 空间位置嵌入 + token 身份嵌入，保持图像空间布局信息",
          "三阶段训练：对齐阶段（冻结 backbone 训练 MLP 连接器）、联合预训练、高分辨率继续训练"
        ],
        href: "https://arxiv.org/abs/2605.31604",
        paperLink: "Representation Forcing for Bottleneck-Free Unified Multimodal Models",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "线性缩放视频 VLM：StateKV 长视频理解",
        tag: "长视频理解",
        href: "https://arxiv.org/abs/2605.31598",
        description: "通过重要性递归状态实现线性时间复杂度，对长舞蹈视频生成的效率优化有参考价值。",
      },
      {
        num: 6,
        title: "UNISON：统一声音生成与编辑框架",
        tag: "音频生成",
        href: "https://arxiv.org/abs/2605.31530",
        description: "潜扩散 + 深度 LLM 融合的多任务架构，对音频-视觉统一建模有启发。",
      },
      {
        num: 7,
        title: "UniAudio-Token：通用音频感知语义 tokenizer",
        tag: "音频表示",
        href: "https://arxiv.org/abs/2605.31521",
        description: "语义-声学均衡机制恢复细粒度声学细节，可作为 music-to-dance 的音频特征提取器。",
      },
      {
        num: 8,
        title: "GGT-100K：生成式多模态基础模型用于图像恢复",
        tag: "数据合成",
        href: "https://arxiv.org/abs/2605.31039",
        description: "高质量生成目标合成方法，可用于舞蹈视频的数据增强。",
      },
      {
        num: 9,
        title: "RayDer：可扩展自监督新视角合成",
        tag: "3D 视觉",
        href: "https://arxiv.org/abs/2605.31535",
        description: "统一 Transformer 架构处理相机估计和渲染，对 3D 一致的视频生成有参考价值。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的趋势：一是视频生成正在从「单一模型端到端训练」向「训练-推理解耦」演进——Lumos-Nexus 和 Robust Dreamer 都采用了「轻量模块训练 + 大容量模块推理」或「潜空间记忆」的策略，在降低训练成本的同时保持生成质量；二是音频-视觉对齐技术日趋成熟，SwanSphere 的 SVAC 对比学习和 ODPO 偏好优化为多模态同步提供了可迁移的技术路径。对于 music-to-dance 任务，这些进展意味着可以分别优化音频理解模块和视觉生成模块，再通过统一的对齐机制进行融合，而非追求单一端到端模型的训练。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-06-01 | Unified Video Generation & Long-Sequence Consistency",
    overview: [
      "Lumos-Nexus proposes Unified Progressive Frequency Bridging for progressive handoff between lightweight and high-capacity generators in a shared latent space",
      "Robust Dreamer addresses drift in long-sequence AR generation via Latent Gaussian Memory and Deviation Learning—directly relevant to music-to-dance long video consistency",
      "SwanSphere's spatial audio-video alignment (SVAC contrastive learning) offers a migration path for beat-motion synchronization tasks",
      "Representation Forcing eliminates dependency on external VAEs for unified multimodal models, enabling end-to-end video generation architectures"
    ],
    papers: [
      {
        num: 1,
        tag: "Unified Video Generation",
        title: "Lumos-Nexus: Progressive Frequency Bridging in Shared Latent Space",
        description: "Lumos-Nexus introduces a training-efficient unified video generation framework with Unified Progressive Frequency Bridging (UPFB). During training, only a lightweight generator is aligned with the understanding block to learn reasoning-driven semantic control; during inference, UPFB progressively hands off generation responsibility to a high-capacity pretrained generator. UPFB achieves smooth coarse-to-fine transition through Temporal Semantic Gating and Time-Varying Frequency Decomposition: early steps rely on the small generator for semantic consistency, while later steps switch to the large generator for visual detail enhancement. Experiments show substantial improvements in visual realism and temporal coherence on VBench while maintaining strong reasoning capabilities.",
        keyPoints: [
          "UPFB performs dual-frequency bridging in velocity space: small generator handles low-frequency semantic structure, large generator contributes high-frequency texture details",
          "Cosine-annealed weight wt controls progressive handoff between generators, avoiding semantic instability and texture conflicts from direct mixing",
          "RMS alignment and energy re-balancing ensure velocity field magnitude matching at fusion points, preventing over-exposure and activation instability"
        ],
        href: "https://arxiv.org/abs/2605.31603",
        paperLink: "Lumos-Nexus: Efficient Frequency Bridging with Homogeneous Latent Space for Video Unified Models",
      },
      {
        num: 2,
        tag: "Long-Sequence Video Generation",
        title: "Robust Dreamer: Deviation-Aware Latent Gaussian Memory",
        description: "Robust Dreamer tackles catastrophic drift in frame-wise action-controlled AR video generation with two core components. First, Latent Gaussian Memory anchors diffusion latents directly to Gaussian primitives and recalls them via latent-space Gaussian splatting, avoiding information loss from repeated VAE encode-decode cycles. Second, Deviation Learning with Dynamic Deviation Archive synthesizes rollout-induced latent deviations via one-step approximation, storing them hierarchically by autoregressive stage and denoising timestamp, then injecting them into historical memory during training to simulate corrupted memory states encountered during inference. The method achieves SOTA long-horizon performance on ScanNet, DL3DV, and OmniWorldGame, offering direct relevance for long dance video generation in music-to-dance tasks.",
        keyPoints: [
          "Latent Gaussian Memory operates entirely in latent space, avoiding accumulated quantization errors and color drift from Latent-RGB Cycling",
          "Dynamic Deviation Archive stores deviations indexed by (autoregressive stage, denoising timestamp) for fine-grained error modeling",
          "Training-time deviation injection with probability p teaches the generator internal correction under corrupted memory conditions"
        ],
        href: "https://arxiv.org/abs/2605.30855",
        paperLink: "Robust Dreamer: Deviation-Aware Latent Gaussian Memory for Action-Controlled AR Video Generation",
      },
      {
        num: 3,
        tag: "Audio-Visual Alignment",
        title: "SwanSphere: Streaming Synchronized Spatial Audio Generation",
        description: "SwanSphere proposes a causal autoregressive diffusion transformer architecture for high-fidelity spatial audio generation from panoramic videos and text prompts. Key innovations include Spatial Video-Audio Contrastive (SVAC) learning, which aligns video encoder and acoustic domain through four types of physics-aware positive-negative sample pairs (same-location positive, cross-location negative, cross-time negative, silence negative); and multi-objective Online Direct Preference Optimization (ODPO) that aligns generated audio with human preferences across aesthetics, semantics, and spatial perception dimensions. The system supports streaming generation with significantly lower first-chunk latency than standard diffusion models, and its audio-visual alignment techniques are directly transferable to beat-motion synchronization tasks in music-to-dance generation.",
        keyPoints: [
          "LocDiT (Localized DiT) uses bidirectional attention within patches for denoising, balancing AR model's temporal modeling with diffusion model's high-fidelity generation",
          "SVAC contrastive learning explicitly models spatial cues, addressing the lack of acoustic awareness in CLIP encoders",
          "Curriculum learning: pre-training on large-scale monaural audio before adapting to spatial audio distribution improves generalization"
        ],
        href: "https://arxiv.org/abs/2605.30940",
        paperLink: "Towards Streaming Synchronized Spatial Audio Generation via Autoregressive Diffusion Transformer",
      },
      {
        num: 4,
        tag: "Unified Multimodal Models",
        title: "Representation Forcing: Bottleneck-Free Unified Multimodal Models",
        description: "Representation Forcing (RF) addresses the structural bottleneck of unified multimodal models depending on external pretrained VAEs. RF forces the decoder to autoregressively predict visual representations as intermediate tokens before pixel generation—these representations come from the model's own understanding encoder (obtained via EMA and online vector quantization) and remain in context to guide pixel diffusion. By turning representations from perception outputs into generation targets, RF grounds understanding and generation in a single end-to-end learned representation space. Experiments show RF-Pixel matches VAE-based baselines on GenEval and DPG-Bench while outperforming on understanding tasks, demonstrating that pixel-space generation is more compatible with unified multimodal modeling than VAE-based approaches.",
        keyPoints: [
          "Online vector quantization uses SwAV momentum updates and Sinkhorn-Knopp balancing, requiring no separately pretrained tokenizer",
          "Representation tokens use 2D spatial position embeddings + token identity embeddings, preserving image spatial layout information",
          "Three-stage training: alignment (frozen backbone, train MLP connector), joint pre-training, high-resolution continued training"
        ],
        href: "https://arxiv.org/abs/2605.31604",
        paperLink: "Representation Forcing for Bottleneck-Free Unified Multimodal Models",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Linear Scaling Video VLMs: StateKV for Long Video Understanding",
        tag: "Long Video Understanding",
        href: "https://arxiv.org/abs/2605.31598",
        description: "Achieves linear time complexity via importance-based recurrent states, relevant for efficiency optimization in long dance video generation.",
      },
      {
        num: 6,
        title: "UNISON: Unified Sound Generation and Editing Framework",
        tag: "Audio Generation",
        href: "https://arxiv.org/abs/2605.31530",
        description: "Latent diffusion + deep LLM fusion multi-task architecture, offering insights for audio-visual unified modeling.",
      },
      {
        num: 7,
        title: "UniAudio-Token: Universal Audio Perception Semantic Tokenizer",
        tag: "Audio Representation",
        href: "https://arxiv.org/abs/2605.31521",
        description: "Semantic-Acoustic Equilibrium mechanism restores fine-grained acoustic details, usable as audio feature extractor for music-to-dance.",
      },
      {
        num: 8,
        title: "GGT-100K: Generative Multimodal Foundation Models for Image Restoration",
        tag: "Data Synthesis",
        href: "https://arxiv.org/abs/2605.31039",
        description: "High-quality generative target synthesis methods applicable for dance video data augmentation.",
      },
      {
        num: 9,
        title: "RayDer: Scalable Self-Supervised Novel View Synthesis",
        tag: "3D Vision",
        href: "https://arxiv.org/abs/2605.31535",
        description: "Unified Transformer architecture for camera estimation and rendering, relevant for 3D-consistent video generation.",
      },
    ],
    observation: "Today's papers reveal two notable trends: video generation is evolving from 'single-model end-to-end training' toward 'training-inference decoupling'—both Lumos-Nexus and Robust Dreamer adopt strategies of 'lightweight module training + high-capacity module inference' or 'latent-space memory' to reduce training costs while maintaining generation quality. Meanwhile, audio-visual alignment technology is maturing: SwanSphere's SVAC contrastive learning and ODPO preference optimization provide transferable technical paths for multimodal synchronization. For music-to-dance tasks, these advances suggest optimizing audio understanding and visual generation modules separately, then fusing them through a unified alignment mechanism, rather than pursuing training of a single end-to-end model.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-01`,
        'en': `/en/daily/music-to-dance/2026-06-01`,
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
      date="2026-06-01"
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
