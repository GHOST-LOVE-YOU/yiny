import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-04-15 | 多模态统一生成与高效视频表征",
    overview: [
      "OmniShow 提出首个统一文本/图像/音频/姿态的人物交互视频生成框架，Gated Local-Context Attention 机制对音频-运动对齐有直接启发",
      "VideoFlexTok 的 coarse-to-fine 可变长度 tokenization 可将视频表征压缩 8 倍，为长舞蹈视频生成提供新思路",
      "Long-term Motion Embeddings 实现 64 倍时间压缩的流匹配运动生成，比视频模型快 10000 倍",
      "GRN 的 Hierarchical Binary Quantization 实现近无损离散表征，entropy-guided sampling 可优化推理效率"
    ],
    papers: [
      {
        num: 1,
        tag: "多模态视频生成",
        title: "OmniShow: 统一多模态条件的人物交互视频生成",
        description: "OmniShow 是首个专门面向人物交互视频生成（HOIVG）的端到端框架，能够同时处理文本、参考图像、音频和姿态四种条件。该工作提出的 Unified Channel-wise Conditioning 通过通道拼接策略高效注入图像和姿态条件，避免破坏基础模型的生成先验。更重要的是，Gated Local-Context Attention 机制采用音频上下文打包策略，通过滑动窗口聚合丰富的音频特征，并使用掩码注意力限制视频 token 只与对应音频段交互，同时引入可学习的门控向量来调节音频注入强度。这一设计与 music-to-dance 任务中音频-运动对齐的核心需求高度契合，可作为改进 3D Audio Attention 的直接参考。此外，Decoupled-Then-Joint Training 策略通过模型融合实现异构数据的高效利用，为解决舞蹈数据稀缺问题提供了可行路径。",
        keyPoints: [
          "Unified Channel-wise Conditioning：通过伪帧 token 和通道拼接实现图像/姿态的高效注入，保持基础模型结构",
          "Gated Local-Context Attention：掩码注意力实现精确的时序对齐，可学习门控稳定早期训练",
          "Decoupled-Then-Joint Training：先分别训练 A2V 和 R2V 专家模型，再融合进行联合微调",
          "HOIVG-Bench：首个专门评估人物交互视频生成的综合基准"
        ],
        href: "https://arxiv.org/abs/2604.11804",
        paperLink: "OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation",
      },
      {
        num: 2,
        tag: "视频表征学习",
        title: "VideoFlexTok: 可变长度 Coarse-to-Fine 视频 Tokenization",
        description: "VideoFlexTok 提出了一种革命性的视频表征方式，将视频编码为可变长度的 coarse-to-fine token 序列，而非传统的固定 3D 网格。前几个 token 自发地捕捉语义和运动等抽象信息，后续 token 逐步添加细粒度细节。这种结构使得下游生成模型可以根据需要自适应地选择 token 数量——仅需 672 个 token 即可表示 10 秒 81 帧的视频，比传统 3D 网格 tokenizer 少 8 倍。对于 music-to-dance 任务，这意味着可以用更少的计算资源生成更长的舞蹈视频，同时保持运动质量。该工作的核心创新包括：基于 register token 的时序因果编码器、嵌套 dropout 诱导的层级结构、以及基于流模型的生成式解码器。实验表明，使用 VideoFlexTok 可以在 1.1B 参数模型上达到与 5.2B 基线相当的质量，为高效舞蹈视频生成提供了可行方案。",
        keyPoints: [
          "可变长度表征：根据下游需求自适应选择 token 数量，实现灵活的细节-效率权衡",
          "Coarse-to-fine 结构：前 token 捕捉语义/运动，后 token 补充细节，无需显式监督即可涌现",
          "流式兼容：时序因果注意力支持逐帧处理，无需访问未来帧",
          "8 倍压缩：10 秒视频仅需 672 token，大幅降低训练和推理成本"
        ],
        href: "https://arxiv.org/abs/2604.12887",
        paperLink: "VideoFlexTok: Flexible-Length Coarse-to-Fine Video Tokenization",
      },
      {
        num: 3,
        tag: "运动生成",
        title: "Long-term Motion Embeddings: 高效运动学生成",
        description: "该工作提出了一种从大规模轨迹中学习长期运动嵌入的方法，实现了比视频模型高 4 个数量级的效率。核心思想是直接在紧凑的运动潜空间中进行生成，而非高维像素空间。首先，通过变分自编码器将稀疏轨迹压缩为 64 倍时间压缩率的潜空间表示；然后，在该空间中训练条件流匹配模型，根据文本提示或空间 poke 生成运动潜变量。这种方法生成的运动分布在质量上超越了最先进的视频模型和专门的轨迹预测方法。对于 music-to-dance 任务，这意味着可以先生成紧凑的舞蹈运动表示，再解码为完整视频，大幅降低生成长序列舞蹈的计算成本。此外，学习到的运动空间支持在运动层面进行推理和编辑，为舞蹈生成提供了更可控的接口。",
        keyPoints: [
          "64 倍时间压缩：将长时运动压缩为紧凑潜空间，比视频模型高效 10000 倍",
          "密集运动空间：从稀疏轨迹学习，支持任意空间位置的密集运动查询",
          "流匹配生成：在潜空间中训练条件流模型，支持文本/空间条件控制",
          "统一接口：运动空间可作为标准化中间表示，驱动下游合成或推理任务"
        ],
        href: "https://arxiv.org/abs/2604.11737",
        paperLink: "Learning Long-term Motion Embeddings for Efficient Kinematics Generation",
      },
      {
        num: 4,
        tag: "视觉生成",
        title: "GRN: 生成式精炼网络实现复杂度感知的视觉合成",
        description: "GRN 提出了一种结合扩散模型和自回归模型优势的新一代视觉合成范式。核心创新 Hierarchical Binary Quantization (HBQ) 通过分层二叉树量化，使离散 tokenizer 的重建误差随层数指数衰减，在相同潜维度下实现与连续 tokenizer 相当的重建质量（rFID 0.56）。基于此，GRN 引入了全局精炼机制——从随机 token 图开始，逐步预测和修正 token，如同人类绘画过程。Entropy-guided sampling 策略根据生成复杂度动态分配计算资源：低熵（高置信度）区域减少精炼步数，高熵（复杂）区域增加步数。对于 music-to-dance 的扩散模型实现，HBQ 可提升离散表征质量，全局精炼机制可增强长序列生成的一致性，而自适应采样可优化推理效率，避免在简单帧上浪费计算。",
        keyPoints: [
          "HBQ 量化：分层二叉量化实现近无损离散表征，误差指数衰减",
          "全局精炼：从随机图开始逐步修正，支持 retroactive 错误修正",
          "熵引导采样：根据预测置信度动态调整步数，实现复杂度感知生成",
          "任务泛化：在 ImageNet C2I、T2I、T2V 上均取得 SOTA 或相当性能"
        ],
        href: "https://arxiv.org/abs/2604.13030",
        paperLink: "Generative Refinement Networks for Visual Synthesis",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Lyra 2.0: 可探索的生成式 3D 世界",
        tag: "3D 一致性",
        href: "https://arxiv.org/abs/2604.13036",
        description: "解决长视频生成的空间遗忘和时间漂移问题，通过维护每帧 3D 几何进行信息路由，并训练模型纠正自身漂移。对长舞蹈序列的一致性有启发。",
      },
      {
        num: 6,
        title: "StructDiff: 结构保持的空间可控扩散模型",
        tag: "空间控制",
        href: "https://arxiv.org/abs/2604.12575",
        description: "引入 3D 位置编码作为空间先验，实现生成内容位置、尺度和细节的灵活控制。可用于舞蹈动作的空间位置约束。",
      },
      {
        num: 7,
        title: "APEX: 基于条件偏移的单步生成",
        tag: "高效推理",
        href: "https://arxiv.org/abs/2604.12322",
        description: "通过流模型的条件偏移提取内源性对抗信号，实现无需判别器的单步生成。0.6B 模型超越 FLUX-Schnell 12B，推理速度提升 15 倍。",
      },
      {
        num: 8,
        title: "Nucleus-Image: 图像生成的稀疏 MoE",
        tag: "高效架构",
        href: "https://arxiv.org/abs/2604.12163",
        description: "稀疏 MoE 扩散 Transformer，每次前向仅激活 2B 参数，总容量 17B。Expert-Choice Routing 和 timestep 解耦设计可提升推理效率。",
      },
      {
        num: 9,
        title: "TimePro-RL: 音频侧时间提示的细粒度时间感知",
        tag: "音频理解",
        href: "http://arxiv.org/abs/2604.13715v1",
        description: "将时间戳编码为嵌入并插入音频特征序列，使用 RL 优化时间对齐。可提升 3D Audio Attention 的节拍对齐精度。",
      },
      {
        num: 10,
        title: "SpotSound: 细粒度音频时间定位",
        tag: "音频定位",
        href: "https://arxiv.org/abs/2604.13023",
        description: "针对长音频中事件时间定位的音频语言模型，在目标事件占比 <10% 的'大海捞针'场景下取得 SOTA。可用于精确对齐音乐节拍与舞蹈动作。",
      },
      {
        num: 11,
        title: "HDR 视频生成：对数编码的潜空间对齐",
        tag: "视频质量",
        href: "https://arxiv.org/abs/2604.11788",
        description: "利用对数编码将 HDR 影像映射到预训练生成模型的潜空间分布，通过轻量微调实现高质量 HDR 视频生成。可提升舞蹈视频的动态范围。",
      },
    ],
    observation: "今日论文呈现出两个显著趋势：一是多模态统一生成框架的成熟，OmniShow 证明了文本/图像/音频/姿态四种条件可以在单一框架中有效协调，其 Gated Local-Context Attention 为音频-运动对齐提供了可直接借鉴的技术路径；二是视频表征与生成效率的大幅提升，VideoFlexTok 的 8 倍压缩、Motion Embeddings 的 64 倍时间压缩、以及 GRN 的复杂度感知采样，共同为长舞蹈视频的高效生成指明方向。这些技术的组合应用有望突破当前 music-to-dance 在序列长度和推理效率上的瓶颈。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-04-15 | Multimodal Unified Generation & Efficient Video Representation",
    overview: [
      "OmniShow proposes the first unified framework for human-object interaction video generation with text/image/audio/pose conditions",
      "VideoFlexTok's coarse-to-fine variable-length tokenization achieves 8x compression, enabling longer dance video generation",
      "Long-term Motion Embeddings achieves 64x temporal compression with flow matching, 10,000x faster than video models",
      "GRN's Hierarchical Binary Quantization enables near-lossless discrete representation with entropy-guided adaptive sampling"
    ],
    papers: [
      {
        num: 1,
        tag: "Multimodal Video Generation",
        title: "OmniShow: Unifying Multimodal Conditions for HOI Video Generation",
        description: "OmniShow is the first end-to-end framework specifically designed for Human-Object Interaction Video Generation (HOIVG), capable of simultaneously processing four conditions: text, reference images, audio, and pose. The proposed Unified Channel-wise Conditioning efficiently injects image and pose conditions through channel concatenation without disrupting the base model's generative priors. Most importantly, the Gated Local-Context Attention mechanism packs audio context through sliding windows and uses masked attention to restrict video tokens to interact only with corresponding audio segments, while introducing learnable gating vectors to modulate injection strength. This design directly addresses the core need for audio-motion alignment in music-to-dance tasks and can serve as a reference for improving 3D Audio Attention.",
        keyPoints: [
          "Unified Channel-wise Conditioning: Efficient injection via pseudo-frame tokens and channel concatenation",
          "Gated Local-Context Attention: Masked attention for precise temporal alignment with learnable gating",
          "Decoupled-Then-Joint Training: Train A2V and R2V experts separately, then fuse for joint fine-tuning",
          "HOIVG-Bench: First comprehensive benchmark for human-object interaction video generation"
        ],
        href: "https://arxiv.org/abs/2604.11804",
        paperLink: "OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation",
      },
      {
        num: 2,
        tag: "Video Representation",
        title: "VideoFlexTok: Flexible-Length Coarse-to-Fine Video Tokenization",
        description: "VideoFlexTok proposes a revolutionary video representation approach that encodes videos as variable-length coarse-to-fine token sequences instead of traditional fixed 3D grids. Early tokens spontaneously capture abstract information like semantics and motion, while later tokens add fine-grained details. This structure allows downstream generative models to adaptively select token counts based on needs—only 672 tokens for 10-second 81-frame videos, 8x fewer than traditional 3D grid tokenizers. For music-to-dance, this means generating longer dance videos with less computation while maintaining motion quality.",
        keyPoints: [
          "Variable-length representation: Adaptively select token count based on downstream needs",
          "Coarse-to-fine structure: Early tokens capture semantics/motion, later tokens add details",
          "Streaming compatible: Time-causal attention supports frame-by-frame processing",
          "8x compression: 10-second video with only 672 tokens, significantly reducing costs"
        ],
        href: "https://arxiv.org/abs/2604.12887",
        paperLink: "VideoFlexTok: Flexible-Length Coarse-to-Fine Video Tokenization",
      },
      {
        num: 3,
        tag: "Motion Generation",
        title: "Long-term Motion Embeddings for Efficient Kinematics",
        description: "This work proposes learning long-term motion embeddings from large-scale trajectories, achieving 4 orders of magnitude efficiency over video models. The core idea is to generate directly in a compact motion latent space rather than high-dimensional pixel space. First, sparse trajectories are compressed to a 64x temporal compression latent space via VAE; then a conditional flow matching model is trained in this space to generate motion latents conditioned on text or spatial pokes. For music-to-dance, this means generating compact dance motion representations first, then decoding to full videos, dramatically reducing computational costs for long-sequence generation.",
        keyPoints: [
          "64x temporal compression: Compact latent space 10,000x more efficient than video models",
          "Dense motion space: Learned from sparse trajectories, supports dense queries at any position",
          "Flow matching generation: Conditional flow model in latent space with text/spatial control",
          "Unified interface: Motion space as standardized intermediate representation"
        ],
        href: "https://arxiv.org/abs/2604.11737",
        paperLink: "Learning Long-term Motion Embeddings for Efficient Kinematics Generation",
      },
      {
        num: 4,
        tag: "Visual Synthesis",
        title: "GRN: Generative Refinement Networks with Complexity-Aware Sampling",
        description: "GRN proposes a new visual synthesis paradigm combining strengths of diffusion and autoregressive models. The core innovation Hierarchical Binary Quantization (HBQ) achieves exponentially decaying reconstruction error through hierarchical binary tree quantization, matching continuous tokenizer quality at equivalent latent dimensions (rFID 0.56). GRN introduces a global refinement mechanism—starting from random token maps and progressively predicting/correcting tokens like human painting. Entropy-guided sampling dynamically allocates computation: fewer steps for low-entropy (high confidence) regions, more steps for high-entropy (complex) regions. For music-to-dance, HBQ improves discrete representation quality, global refinement enhances long-sequence consistency, and adaptive sampling optimizes inference efficiency.",
        keyPoints: [
          "HBQ quantization: Hierarchical binary quantization with exponentially decaying error",
          "Global refinement: Progressive correction from random maps with retroactive error fixing",
          "Entropy-guided sampling: Dynamic step adjustment based on prediction confidence",
          "Task generalization: SOTA or competitive performance on C2I, T2I, and T2V tasks"
        ],
        href: "https://arxiv.org/abs/2604.13030",
        paperLink: "Generative Refinement Networks for Visual Synthesis",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Lyra 2.0: Explorable Generative 3D Worlds",
        tag: "3D Consistency",
        href: "https://arxiv.org/abs/2604.13036",
        description: "Addresses spatial forgetting and temporal drift in long video generation through per-frame 3D geometry maintenance and drift correction training. Relevant for long dance sequence consistency.",
      },
      {
        num: 6,
        title: "StructDiff: Structure-Preserving Spatially Controllable Diffusion",
        tag: "Spatial Control",
        href: "https://arxiv.org/abs/2604.12575",
        description: "Introduces 3D positional encoding as spatial prior for flexible control over position, scale, and details. Applicable for spatial constraints in dance motion.",
      },
      {
        num: 7,
        title: "APEX: One-Step Generation via Condition Shifting",
        tag: "Efficient Inference",
        href: "https://arxiv.org/abs/2604.12322",
        description: "Extracts endogenous adversarial signals from flow models via condition shifting for discriminator-free one-step generation. 0.6B model surpasses FLUX-Schnell 12B with 15x speedup.",
      },
      {
        num: 8,
        title: "Nucleus-Image: Sparse MoE for Image Generation",
        tag: "Efficient Architecture",
        href: "https://arxiv.org/abs/2604.12163",
        description: "Sparse MoE diffusion transformer with only 2B active parameters out of 17B total. Expert-Choice Routing and timestep-decoupled design improve inference efficiency.",
      },
      {
        num: 9,
        title: "TimePro-RL: Fine-grained Temporal Perception with Audio-Side Time Prompt",
        tag: "Audio Understanding",
        href: "http://arxiv.org/abs/2604.13715v1",
        description: "Encodes timestamps as embeddings interleaved in audio feature sequences, optimized with RL. Can improve beat alignment precision in 3D Audio Attention.",
      },
      {
        num: 10,
        title: "SpotSound: Fine-Grained Audio Temporal Grounding",
        tag: "Audio Grounding",
        href: "https://arxiv.org/abs/2604.13023",
        description: "Audio language model for temporal event grounding in long audio, achieving SOTA on 'needle-in-a-haystack' scenarios with <10% target event coverage. Useful for precise beat-dance alignment.",
      },
      {
        num: 11,
        title: "HDR Video Generation via Logarithmic Latent Alignment",
        tag: "Video Quality",
        href: "https://arxiv.org/abs/2604.11788",
        description: "Maps HDR imagery to pretrained generative model latent space via logarithmic encoding, enabling high-quality HDR video with lightweight fine-tuning. Can enhance dynamic range of dance videos.",
      },
    ],
    observation: "Today's papers reveal two significant trends: first, the maturation of multimodal unified generation frameworks—OmniShow demonstrates that text/image/audio/pose conditions can be effectively coordinated in a single framework, with Gated Local-Context Attention providing directly applicable techniques for audio-motion alignment. Second, substantial improvements in video representation and generation efficiency—VideoFlexTok's 8x compression, Motion Embeddings' 64x temporal compression, and GRN's complexity-aware sampling collectively point toward efficient long-form dance video generation. The combination of these technologies could break through current bottlenecks in sequence length and inference efficiency for music-to-dance tasks.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-15`,
        'en': `/en/daily/music-to-dance/2026-04-15`,
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
      date="2026-04-15"
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