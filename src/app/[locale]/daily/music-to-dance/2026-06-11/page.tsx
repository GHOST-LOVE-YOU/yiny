import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "扩散模型加速与跨模态表示学习新进展",
    overview: [
      "BudCache 提出预算约束的扩散模型步级缓存方法，在固定计算预算下优化缓存策略，对实时舞蹈视频生成有重要参考价值",
      "MACCO 通过跨模态掩码组合概念建模增强视觉-语言组合性，可改进音乐-舞蹈跨模态对齐",
      "Self-Guidance 通过解码器流形对齐提升神经编解码器性能，对音频 tokenizer 设计有启发"
    ],
    papers: [
      {
        num: 1,
        tag: "扩散加速",
        title: "BudCache：预算约束的步级扩散缓存",
        description: "BudCache 提出了一种新的扩散模型加速范式：不再使用基于阈值的启发式缓存决策，而是预先固定计算预算，然后搜索最优缓存策略以最大化最终输出质量。该方法结合模拟退火和确定性爬山算法，在离线阶段几分钟内即可找到高质量缓存策略，推理时无需额外开销。实验在 FLUX.1-dev 和 Wan2.1 上验证，在相同推理预算下优于启发式基线。对于 music-to-dance 的实时推理需求，BudCache 提供了一种可预测、可控制的延迟优化方案。",
        keyPoints: [
          "预算约束：预先固定计算预算，反向搜索最优缓存策略",
          "离线优化：模拟退火 + 爬山算法，几分钟内找到高质量策略",
          "零推理开销：策略在离线阶段确定，推理时直接应用"
        ],
        href: "https://arxiv.org/abs/2606.13496",
        paperLink: "Budget-Constrained Step-Level Diffusion Caching",
      },
      {
        num: 2,
        tag: "跨模态学习",
        title: "MACCO：跨模态掩码组合概念建模",
        description: "MACCO 针对视觉-语言模型（如 CLIP）的组合理解缺陷提出改进方案。现有模型常表现出「词袋」行为，难以捕捉对象关系、属性-对象绑定和词序依赖。MACCO 通过在一个模态中掩码组合概念，并在另一模态的完整上下文条件下重建，有效捕捉跨模态组合结构。实验在五个组合基准上验证，同时提升了文本到图像生成和多模态大模型的性能。对于 music-to-dance 任务，其跨模态对齐思路可迁移到音乐-舞蹈组合关系建模。",
        keyPoints: [
          "掩码重建：掩码组合概念，跨模态重建以增强组合理解",
          "双向对齐：联合对齐和正则化掩码特征，跨模态和模态内双重监督",
          "广泛适用：提升组合性的同时改善句法结构和语言信息捕获"
        ],
        href: "https://arxiv.org/abs/2606.13288",
        paperLink: "Cross-Modal Masked Compositional Concept Modeling",
      },
      {
        num: 3,
        tag: "音频编码",
        title: "Self-Guidance：通过解码器流形对齐增强神经编解码器",
        description: "基于 VQ-VAE 的神经语音编解码器是语音大模型的核心音频 tokenizer，但重建保真度受量化误差限制。Self-Guidance 的核心思想是：对齐解码器在处理量化 token 和原始连续嵌入时的内部特征流形，使用轻量级特征映射损失。该方法仅需极少训练开销，无需推理时修改。在 XCodec2 上应用后，实现了 SOTA 低码率性能，并支持 4 倍码本缩减而不损失保真度。对于 music-to-dance 的音频编码器设计，这种流形对齐思路可直接借鉴。",
        keyPoints: [
          "流形对齐：对齐解码器处理量化/连续特征时的内部表示",
          "轻量级：仅需特征映射损失，训练和推理开销极小",
          "码本压缩：支持 4 倍码本缩减，简化下游语言建模"
        ],
        href: "https://arxiv.org/abs/2606.12940",
        paperLink: "Self-Guidance: Enhancing Neural Codecs via Decoder Manifold Alignment",
      },
      {
        num: 4,
        tag: "流匹配",
        title: "PolyFlow：多面体约束流匹配",
        description: "PolyFlow 提出将约束直接嵌入流匹配模型和流动态的多面体约束流匹配框架。现有方法通常通过后验修正强制执行安全约束，计算开销大且可能扭曲学习分布。PolyFlow 引入离散时间流公式和无投影架构，消除离散化误差，保证严格满足任意多面体约束，无需昂贵的迭代求解器。实验表明 PolyFlow 实现零约束违反，同时保持高分布保真度。对于需要物理约束的舞蹈运动生成，该方法提供了可微的约束满足机制。",
        keyPoints: [
          "约束嵌入：将多面体约束直接嵌入模型和流动态",
          "无投影：无需昂贵迭代求解器，严格满足约束",
          "高效推理：相比 SOTA 约束生成基线显著降低推理延迟"
        ],
        href: "https://arxiv.org/abs/2606.13400",
        paperLink: "PolyFlow: Safe and Efficient Polytope-Constrained Flow Matching",
      },
      {
        num: 5,
        tag: "优化理论",
        title: "不同层，不同流形：Transformer 优化中的模块级权重空间几何",
        description: "该研究探索了 Transformer 不同模块是否偏好不同流形几何的问题。通过比较注意力层和 MLP 层分配 Stiefel 和 DGram 约束的效果，发现：注意力层使用 Stiefel 几何、MLP 层使用 DGram 几何的配置性能最佳，而反向分配则不稳定。分析表明 DGram 约束注意力权重会导致奇异值增长，放大注意力 logits 并引发 softmax 饱和。这提示在 music-to-dance 的多模块架构设计中，应考虑模块特定的几何约束。",
        keyPoints: [
          "模块特异性：不同 Transformer 模块偏好不同流形几何",
          "注意力层：Stiefel 几何约束更稳定，避免 softmax 饱和",
          "MLP 层：DGram 几何约束有效，与注意力层形成互补"
        ],
        href: "https://arxiv.org/abs/2606.13276",
        paperLink: "Different Layers, Different Manifolds: Module-Wise Weight-Space Geometry",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Lip Forcing：实时唇同步的少步自回归扩散",
        tag: "音频驱动生成",
        href: "https://arxiv.org/abs/2606.11180",
        description: "首个自回归扩散唇同步方法，14B 教师模型蒸馏为因果学生模型，1.3B 模型实现 31 FPS 实时推理，比双向模型快 17.6 倍。",
      },
      {
        num: 7,
        title: "ReFree：奖励无关 RL 的多级语音引导人像视频生成",
        tag: "语音驱动生成",
        href: "https://arxiv.org/abs/2606.13304",
        description: "流匹配语音驱动动画框架，多级语音表示捕捉音素和韵律信息，奖励无关 RL 实现自然头部运动，无需人工偏好标注。",
      },
      {
        num: 8,
        title: "MoVerse：全景高斯支架的实时视频世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.13376",
        description: "单张窄视角图像创建可交互漫游场景，360° 全景扩展 + 3D 高斯支架，RTX 4090 上 8 FPS 实时渲染。",
      },
      {
        num: 9,
        title: "CustoMDiT：开放域定制化视频生成生态系统",
        tag: "视频定制",
        href: "https://arxiv.org/abs/2606.11783",
        description: "百万级身份保持视频生成数据集 PexelsCustom-1M，仅需 8% 额外可学习参数实现多模态扩散 Transformer 定制化。",
      },
      {
        num: 10,
        title: "VideoMDM：从 2D 监督到 3D 人体运动生成",
        tag: "运动生成",
        href: "https://arxiv.org/abs/2606.13364",
        description: "仅使用单目视频提取的 2D 姿态训练 3D 运动先验，深度加权 2D 重投影损失等价于 3D 监督，HumanML3D FID 0.88 接近全 3D 监督。",
      },
    ],
    observation: "今日论文呈现出扩散模型效率优化与跨模态表示学习并重的趋势。BudCache 的预算约束缓存策略为实时舞蹈视频生成提供了可预测的延迟控制方案；MACCO 的跨模态组合建模思路可改进音乐-舞蹈的细粒度对齐；Self-Guidance 的流形对齐技术对音频 tokenizer 设计有直接启发。同时，Lip Forcing 和 ReFree 在音频驱动视频生成方面的进展，为 music-to-dance 的实时推理和语音-舞蹈联合生成提供了可迁移的技术路径。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Advances in Diffusion Acceleration and Cross-Modal Representation Learning",
    overview: [
      "BudCache proposes budget-constrained step-level diffusion caching, optimizing cache policies under fixed compute budgets for real-time dance video generation",
      "MACCO enhances vision-language compositionality through cross-modal masked concept modeling, applicable to music-dance cross-modal alignment",
      "Self-Guidance improves neural codecs via decoder manifold alignment, inspiring audio tokenizer design"
    ],
    papers: [
      {
        num: 1,
        tag: "Diffusion Acceleration",
        title: "BudCache: Budget-Constrained Step-Level Diffusion Caching",
        description: "BudCache introduces a new diffusion acceleration paradigm: instead of threshold-based heuristic cache decisions, it fixes the compute budget in advance and searches for the optimal cache policy to maximize final output quality. Combining simulated annealing with deterministic hill climbing, it identifies high-quality cache policies within minutes offline, with no runtime overhead. Experiments on FLUX.1-dev and Wan2.1 demonstrate superiority over heuristic baselines under the same inference budget. For real-time music-to-dance inference, BudCache provides a predictable, controllable latency optimization solution.",
        keyPoints: [
          "Budget constraint: Pre-fixes compute budget, searches for optimal cache policy",
          "Offline optimization: Simulated annealing + hill climbing finds quality policies in minutes",
          "Zero inference overhead: Policy determined offline, applied directly at inference"
        ],
        href: "https://arxiv.org/abs/2606.13496",
        paperLink: "Budget-Constrained Step-Level Diffusion Caching",
      },
      {
        num: 2,
        tag: "Cross-Modal Learning",
        title: "MACCO: Cross-Modal Masked Compositional Concept Modeling",
        description: "MACCO addresses compositionality limitations in vision-language models (e.g., CLIP). Existing models often exhibit 「bag-of-words」 behavior, struggling with object relations, attribute-object bindings, and word order dependencies. MACCO masks compositional concepts in one modality and reconstructs them conditioned on full context from the other, effectively capturing cross-modal compositional structures. Validated on five compositional benchmarks while improving text-to-image generation and multimodal LLM performance. Its cross-modal alignment approach can be transferred to music-dance compositional relationship modeling.",
        keyPoints: [
          "Masked reconstruction: Masks compositional concepts, cross-modal reconstruction enhances understanding",
          "Bidirectional alignment: Jointly aligns and regularizes features inter- and intra-modally",
          "Broad applicability: Improves compositionality while enhancing syntactic and linguistic capture"
        ],
        href: "https://arxiv.org/abs/2606.13288",
        paperLink: "Cross-Modal Masked Compositional Concept Modeling",
      },
      {
        num: 3,
        tag: "Audio Coding",
        title: "Self-Guidance: Enhancing Neural Codecs via Decoder Manifold Alignment",
        description: "VQ-VAE-based neural speech codecs are core audio tokenizers for speech LLMs, but reconstruction fidelity is limited by quantization error. Self-Guidance's core idea: align decoder internal feature manifolds when processing quantized tokens versus original continuous embeddings, using a lightweight feature-mapping loss. Requires minimal training overhead, no inference modifications. Applied to XCodec2, achieves SOTA low-bitrate performance and supports 4× codebook reduction without fidelity loss. For music-to-dance audio encoder design, this manifold alignment approach is directly applicable.",
        keyPoints: [
          "Manifold alignment: Aligns decoder internal representations for quantized/continuous features",
          "Lightweight: Feature-mapping loss only, minimal training and inference overhead",
          "Codebook compression: Supports 4× codebook reduction, simplifying downstream language modeling"
        ],
        href: "https://arxiv.org/abs/2606.12940",
        paperLink: "Self-Guidance: Enhancing Neural Codecs via Decoder Manifold Alignment",
      },
      {
        num: 4,
        tag: "Flow Matching",
        title: "PolyFlow: Polytope-Constrained Flow Matching",
        description: "PolyFlow proposes embedding constraints directly into flow matching models and flow dynamics. Existing methods typically enforce safety through post-hoc corrections with substantial computational overhead and potential distribution distortion. PolyFlow introduces discrete-time flow formulation and projection-free architecture, eliminating discretization error and guaranteeing strict satisfaction of arbitrary polyhedral constraints without expensive iterative solvers. Experiments show zero constraint violation with high distributional fidelity. For physically-constrained dance motion generation, this provides a differentiable constraint satisfaction mechanism.",
        keyPoints: [
          "Constraint embedding: Embeds polyhedral constraints directly into model and flow dynamics",
          "Projection-free: No expensive iterative solvers, strict constraint satisfaction",
          "Efficient inference: Significantly reduces inference latency vs. SOTA constrained generation baselines"
        ],
        href: "https://arxiv.org/abs/2606.13400",
        paperLink: "PolyFlow: Safe and Efficient Polytope-Constrained Flow Matching",
      },
      {
        num: 5,
        tag: "Optimization Theory",
        title: "Different Layers, Different Manifolds: Module-Wise Weight-Space Geometry",
        description: "This study explores whether different Transformer modules prefer different manifold geometries. Comparing Stiefel and DGram constraint assignments across attention and MLP layers reveals: attention layers with Stiefel geometry and MLP layers with DGram geometry perform best, while the reverse assignment is unstable. Analysis shows DGram-constrained attention weights cause singular value growth, amplifying attention logits and inducing softmax saturation. This suggests module-specific geometric constraints should be considered in music-to-dance multi-module architecture design.",
        keyPoints: [
          "Module specificity: Different Transformer modules prefer different manifold geometries",
          "Attention layers: Stiefel geometry constraints more stable, avoid softmax saturation",
          "MLP layers: DGram geometry constraints effective, complementary to attention layers"
        ],
        href: "https://arxiv.org/abs/2606.13276",
        paperLink: "Different Layers, Different Manifolds: Module-Wise Weight-Space Geometry",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Lip Forcing: Few-Step Autoregressive Diffusion for Real-Time Lip Sync",
        tag: "Audio-Driven Generation",
        href: "https://arxiv.org/abs/2606.11180",
        description: "First autoregressive diffusion lip sync method, distilling 14B teacher to causal student, 1.3B model achieves 31 FPS real-time inference, 17.6× faster than bidirectional models.",
      },
      {
        num: 7,
        title: "ReFree: Realistic Co-Speech Video Generation via Reward-Free RL",
        tag: "Speech-Driven Generation",
        href: "https://arxiv.org/abs/2606.13304",
        description: "Flow matching speech-driven animation with multi-level speech representations capturing phonetic and prosodic information, reward-free RL for natural head motion without human preference annotations.",
      },
      {
        num: 8,
        title: "MoVerse: Real-Time Video World Modeling with Panoramic Gaussian Scaffold",
        tag: "World Models",
        href: "https://arxiv.org/abs/2606.13376",
        description: "Creates interactively navigable scenes from single narrow-FOV images, 360° panorama expansion + 3D Gaussian scaffold, 8 FPS real-time rendering on RTX 4090.",
      },
      {
        num: 9,
        title: "CustoMDiT: Open-Domain Customized Video Generation Ecosystem",
        tag: "Video Customization",
        href: "https://arxiv.org/abs/2606.11783",
        description: "Million-scale identity-preserving video generation dataset PexelsCustom-1M, achieves multimodal diffusion transformer customization with only 8% additional learnable parameters.",
      },
      {
        num: 10,
        title: "VideoMDM: 3D Human Motion Generation from 2D Supervision",
        tag: "Motion Generation",
        href: "https://arxiv.org/abs/2606.13364",
        description: "Trains 3D motion priors using only 2D poses from monocular videos, depth-weighted 2D reprojection loss equivalent to 3D supervision, HumanML3D FID 0.88 approaching full 3D supervision.",
      },
    ],
    observation: "Today's papers show concurrent trends in diffusion model efficiency optimization and cross-modal representation learning. BudCache's budget-constrained caching provides predictable latency control for real-time dance video generation; MACCO's cross-modal compositional modeling can improve fine-grained music-dance alignment; Self-Guidance's manifold alignment directly inspires audio tokenizer design. Meanwhile, advances in Lip Forcing and ReFree for audio-driven video generation provide transferable technical paths for real-time inference and speech-dance joint generation in music-to-dance.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-11`,
        'en': `/en/daily/music-to-dance/2026-06-11`,
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
      date="2026-06-11"
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
