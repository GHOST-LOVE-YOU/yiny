import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "长视频生成与运动建模：层级去噪、稀疏注意力与关节级潜在空间",
    overview: [
      "HiAR提出层级去噪框架，通过同噪声级别条件机制实现20秒长视频的稳定生成，推理速度提升1.8倍",
      "Diagonal Distillation的不对称生成策略（早期多步、后期少步）在5秒视频生成中实现31 FPS实时推理",
      "SVG-EAR的无参数稀疏注意力补偿机制在Wan2.2和HunyuanVideo上分别达到1.77×和1.93×加速",
      "PRISM的关节级潜在空间分解技术为人体运动生成提供了新的结构化表示方法"
    ],
    papers: [
      {
        num: 1,
        tag: "长视频生成",
        title: "HiAR：通过层级去噪实现高效自回归长视频生成",
        description: "HiAR提出了一种革命性的层级去噪框架，彻底改变了自回归视频生成的范式。传统方法在每个块完全去噪后才生成下一个块，导致误差累积和分布漂移。HiAR的核心洞察是：高度干净的条件上下文并非必需——通过在每个去噪步骤中跨所有块执行因果生成，每个块始终以与当前块相同噪声级别的上下文为条件，既能保持时间连贯性，又能有效缓解误差传播。该框架支持流水线并行推理，在4步设置下实现约1.8倍墙钟加速。此外，针对自推出蒸馏中的低运动捷径问题，HiAR引入前向KL正则化器，在双向注意力模式下计算，有效保持运动多样性。在VBench 20秒生成测试中，HiAR获得最佳总体分数和最低时间漂移。",
        keyPoints: [
          "层级去噪：在每个去噪步骤中跨所有块执行因果生成，而非顺序完成每个块",
          "同噪声级别条件：上下文噪声级别tc = tj+1，在保持时间因果性的同时最小化误差传播",
          "流水线并行：利用反对角线独立性实现跨层级流水线并行，提升推理效率",
          "前向KL正则化：在双向注意力模式下计算，防止运动多样性崩溃"
        ],
        href: "https://arxiv.org/abs/2603.08703",
        paperLink: "HiAR: Efficient Autoregressive Long Video Generation via Hierarchical Denoising",
      },
      {
        num: 2,
        tag: "流式视频生成",
        title: "Diagonal Distillation：流式自回归视频生成的对角蒸馏",
        description: "Diagonal Distillation针对实时流式视频生成中的关键瓶颈——现有视频蒸馏方法多改编自图像生成，忽视时间依赖性，导致运动连贯性降低、长序列误差累积和延迟-质量权衡。该方法提出对角去噪策略：为早期视频块分配更多去噪步骤（5步→4步→3步），后期块逐步减少至2步。这种不对称设计让后期块继承早期块充分处理的丰富外观信息，同时使用部分去噪块作为后续合成的条件输入。Diagonal Forcing机制通过控制噪声注入显式建模对角去噪轨迹，有效缓解长程误差累积。Flow Distribution Matching将显式时间建模融入蒸馏损失，在严格步骤约束下保持运动质量。该方法在5秒视频生成中达到2.61秒（最高31 FPS），相比未蒸馏模型实现277.3倍加速。",
        keyPoints: [
          "对角去噪策略：早期块多步、后期块少步的不对称生成策略",
          "Diagonal Forcing：显式建模对角去噪轨迹，利用前一块最终噪声状态作为条件",
          "Flow Distribution Matching：对齐生成视频与真实视频的光流分布，保持运动一致性",
          "实时性能：5秒视频生成仅需2.61秒，达到31 FPS实时推理速度"
        ],
        href: "https://arxiv.org/abs/2603.09488",
        paperLink: "Streaming Autoregressive Video Generation via Diagonal Distillation",
      },
      {
        num: 3,
        tag: "稀疏注意力",
        title: "SVG-EAR：通过误差感知路由实现稀疏视频生成的无参数线性补偿",
        description: "SVG-EAR解决了视频DiT中二次注意力成本瓶颈。现有稀疏注意力方法要么丢弃低分块导致信息损失，要么依赖学习预测器引入训练开销。SVG-EAR的核心创新是：语义聚类后，块内键值表现出强相似性，可用少量聚类质心很好地概括。基于此，提出无参数线性补偿分支，使用质心近似跳过块并恢复其贡献。关键突破在于误差感知路由：轻量级探针估计每个块的补偿误差，计算误差-成本比最高的块，同时补偿跳过块。理论分析将注意力重建误差与聚类质量关联。在Wan2.2和HunyuanVideo上，SVG-EAR分别达到1.77×和1.93×加速，同时保持29.759和31.043的PSNR。",
        keyPoints: [
          "无参数线性补偿：利用聚类质心近似跳过块的贡献，无需训练",
          "误差感知路由：基于补偿误差而非注意力分数选择计算块",
          "理论保证：提供注意力重建误差上界，表征对聚类质量的依赖",
          "显著加速：Wan2.2 1.77×、HunyuanVideo 1.93×加速，质量损失极小"
        ],
        href: "https://arxiv.org/abs/2603.08982",
        paperLink: "SVG-EAR: Parameter-Free Linear Compensation for Sparse Video Generation via Error-aware Routing",
      },
      {
        num: 4,
        tag: "人体运动生成",
        title: "PRISM：通过关节级潜在分解实现流式人体运动生成",
        description: "PRISM针对文本驱动人体运动生成的两大挑战：现有运动自编码器将每帧压缩为单一潜在向量，纠缠轨迹和关节旋转；不同生成任务需要独立模型或特定机制。PRISM提出关节级分解运动潜在空间：每个身体关节（根轨迹、全局方向、各关节旋转）占据独立token，形成结构化2D网格（时间×关节），由因果VAE压缩。这种简单改变显著提升了生成质量，揭示潜在空间设计是被低估的瓶颈。无噪声条件注入机制为每个token分配独立时间步嵌入，允许将条件帧作为干净token（t=0）注入，同时去噪其余token，统一文本到运动和姿态条件生成，并直接支持自回归段链式流式合成。自强制训练进一步抑制长推出中的漂移。在HumanML3D、MotionHub、BABEL和50场景用户研究中达到SOTA。",
        keyPoints: [
          "关节级潜在分解：每帧分解为K=J+2个token，形成时间×关节的2D网格",
          "因果时空VAE：严格因果卷积支持增量编码，前向运动学监督桥接旋转和坐标空间",
          "无噪声条件注入：每token独立时间步嵌入，统一T2M和TP2M生成",
          "自强制训练：模拟自回归推理流程，支持10+段连续生成"
        ],
        href: "https://arxiv.org/abs/2603.08590",
        paperLink: "PRISM: Streaming Human Motion Generation with Per-Joint Latent Decomposition",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Motion Forcing：运动动力学鲁棒视频生成的解耦框架",
        tag: "物理一致性",
        href: "https://arxiv.org/abs/2603.10408",
        description: "通过Point-Shape-Appearance分层范式显式解耦物理推理与视觉合成，Masked Point Recovery策略强制模型学习潜在物理定律。对舞蹈视频物理合理性有参考价值。"
      },
      {
        num: 6,
        title: "CoCo：代码作为CoT的文本到图像预览与稀有概念生成",
        tag: "可控生成",
        href: "https://arxiv.org/abs/2603.08652",
        description: "代码驱动的推理框架将推理过程表示为可执行代码，实现显式可验证的中间规划。其draft-final两阶段生成思路可启发舞蹈动作的层次化生成策略。"
      },
      {
        num: 7,
        title: "InternVL-U：统一多模态模型的理解、推理、生成与编辑",
        tag: "统一多模态",
        href: "https://arxiv.org/abs/2603.09877",
        description: "4B参数轻量级统一多模态模型，MMDiT生成头和CoT对齐方法在多个生成任务上超越14B规模的BAGEL。对轻量级music-to-dance模型设计有借鉴意义。"
      },
      {
        num: 8,
        title: "Doki：生成式视频创作的文本原生界面",
        tag: "交互界面",
        href: "https://arxiv.org/abs/2603.09072",
        description: "文本原生视频创作接口，将视频创作与文本写作过程对齐。展示了音频-视频对齐的交互范式，对music-to-dance用户可控生成界面设计有启发。"
      },
      {
        num: 9,
        title: "CAST：一致视频检索的视觉状态转换建模",
        tag: "时间一致性",
        href: "https://arxiv.org/abs/2603.08648",
        description: "状态条件残差更新机制引入潜在状态演化的显式归纳偏置。对舞蹈视频中的身份一致性保持有参考价值，时间连贯性建模思路可迁移到长序列舞蹈生成。"
      },
      {
        num: 10,
        title: "ReCoSplat：使用渲染-对比的自回归前馈高斯溅射",
        tag: "视角一致性",
        href: "https://arxiv.org/abs/2603.09968",
        description: "Render-and-Compare模块提供稳定的条件信号补偿姿态误差，混合KV缓存压缩策略支持100+帧长序列。对舞蹈视频视角一致性和外观保持有技术参考价值。"
      },
    ],
    observation: "今日论文呈现出视频生成领域的三个重要趋势：一是长视频生成的稳定性问题正通过层级去噪（HiAR）和对角蒸馏（Diagonal Distillation）等创新架构得到解决，这些方法对music-to-dance中需要生成长序列舞蹈视频的任务具有直接迁移价值；二是稀疏注意力优化正从简单的块丢弃转向误差感知路由（SVG-EAR），这种无参数补偿机制可显著降低3D Audio Attention的计算成本；三是人体运动生成领域开始重视潜在空间结构设计（PRISM），其关节级分解思想为舞蹈动作的细粒度控制提供了新思路。建议重点关注HiAR的同噪声级别条件机制和PRISM的无噪声条件注入技术，两者结合有望解决舞蹈视频生成中的长程一致性和条件控制问题。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Long Video Generation & Motion Modeling: Hierarchical Denoising, Sparse Attention & Per-Joint Latent Space",
    overview: [
      "HiAR proposes hierarchical denoising framework achieving stable 20-second video generation with 1.8× speedup via matched-noise conditioning",
      "Diagonal Distillation's asymmetric generation strategy (more steps early, fewer later) achieves 31 FPS real-time inference for 5-second videos",
      "SVG-EAR's parameter-free sparse attention compensation achieves 1.77× and 1.93× speedups on Wan2.2 and HunyuanVideo",
      "PRISM's per-joint latent decomposition provides new structured representation for human motion generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Long Video Generation",
        title: "HiAR: Efficient Autoregressive Long Video Generation via Hierarchical Denoising",
        description: "HiAR introduces a revolutionary hierarchical denoising framework that fundamentally transforms autoregressive video generation. Traditional methods fully denoise each block before generating the next, causing error accumulation and distribution drift. HiAR's key insight: highly clean conditional context is unnecessary—by performing causal generation across all blocks at each denoising step, with each block conditioned on context at the same noise level, temporal coherence is maintained while effectively mitigating error propagation. The framework supports pipelined parallel inference, achieving ~1.8× wall-clock speedup in 4-step settings. To address the low-motion shortcut in self-rollout distillation, HiAR introduces a forward-KL regularizer computed in bidirectional-attention mode, effectively preserving motion diversity. On VBench 20-second generation, HiAR achieves the best overall score and lowest temporal drift.",
        keyPoints: [
          "Hierarchical Denoising: Perform causal generation across all blocks at each denoising step, rather than completing each block sequentially",
          "Matched-Noise Conditioning: Context noise level tc = tj+1 minimizes error propagation while preserving temporal causality",
          "Pipelined Parallelism: Exploit anti-diagonal independence for cross-hierarchy pipeline parallelism, improving inference efficiency",
          "Forward-KL Regularization: Computed in bidirectional-attention mode to prevent motion diversity collapse"
        ],
        href: "https://arxiv.org/abs/2603.08703",
        paperLink: "HiAR: Efficient Autoregressive Long Video Generation via Hierarchical Denoising",
      },
      {
        num: 2,
        tag: "Streaming Video Generation",
        title: "Streaming Autoregressive Video Generation via Diagonal Distillation",
        description: "Diagonal Distillation addresses the critical bottleneck in real-time streaming video generation—existing video distillation methods adapted from image generation neglect temporal dependencies, causing reduced motion coherence, error accumulation over long sequences, and latency-quality trade-offs. The method proposes diagonal denoising: allocating more denoising steps to early video chunks (5→4→3 steps) and progressively fewer to later chunks down to 2 steps. This asymmetric design allows later chunks to inherit rich appearance information from thoroughly processed early chunks while using partially denoised chunks as conditional inputs. The Diagonal Forcing mechanism explicitly models diagonal denoising trajectories through controlled noise injection, effectively mitigating long-range error accumulation. Flow Distribution Matching incorporates explicit temporal modeling into the distillation loss, preserving motion quality under strict step constraints. The method achieves 2.61 seconds (up to 31 FPS) for 5-second video generation, a 277.3× speedup over the undistilled model.",
        keyPoints: [
          "Diagonal Denoising Strategy: Asymmetric generation with more steps for early chunks, fewer for later ones",
          "Diagonal Forcing: Explicitly models diagonal denoising trajectories, using previous chunk's final noisy state as condition",
          "Flow Distribution Matching: Aligns optical flow distributions between generated and real videos to maintain motion consistency",
          "Real-time Performance: 5-second video generation in 2.61 seconds, achieving 31 FPS real-time inference"
        ],
        href: "https://arxiv.org/abs/2603.09488",
        paperLink: "Streaming Autoregressive Video Generation via Diagonal Distillation",
      },
      {
        num: 3,
        tag: "Sparse Attention",
        title: "SVG-EAR: Parameter-Free Linear Compensation for Sparse Video Generation via Error-aware Routing",
        description: "SVG-EAR addresses the quadratic attention cost bottleneck in video DiTs. Existing sparse attention methods either drop low-score blocks causing information loss, or rely on learned predictors introducing training overhead. SVG-EAR's core innovation: after semantic clustering, keys and values within blocks exhibit strong similarity and can be well summarized by a small set of cluster centroids. Based on this, a parameter-free linear compensation branch is proposed, using centroids to approximate skipped blocks and recover their contributions. The key breakthrough is error-aware routing: a lightweight probe estimates compensation error for each block, computing blocks with the highest error-to-cost ratio while compensating skipped blocks. Theoretical analysis relates attention reconstruction error to clustering quality. On Wan2.2 and HunyuanVideo, SVG-EAR achieves 1.77× and 1.93× speedups while maintaining PSNRs of 29.759 and 31.043.",
        keyPoints: [
          "Parameter-Free Linear Compensation: Uses cluster centroids to approximate skipped block contributions without training",
          "Error-Aware Routing: Selects computation blocks based on compensation error rather than attention scores",
          "Theoretical Guarantees: Provides upper bound on attention reconstruction error, characterizing dependence on clustering quality",
          "Significant Speedup: 1.77× on Wan2.2, 1.93× on HunyuanVideo with minimal quality loss"
        ],
        href: "https://arxiv.org/abs/2603.08982",
        paperLink: "SVG-EAR: Parameter-Free Linear Compensation for Sparse Video Generation via Error-aware Routing",
      },
      {
        num: 4,
        tag: "Human Motion Generation",
        title: "PRISM: Streaming Human Motion Generation with Per-Joint Latent Decomposition",
        description: "PRISM addresses two major challenges in text-driven human motion generation: existing motion autoencoders compress each frame into a single latent vector, entangling trajectory and joint rotations; different generation tasks require separate models or specific mechanisms. PRISM proposes per-joint factorized motion latent space: each body joint (root trajectory, global orientation, each joint rotation) occupies its own token, forming a structured 2D grid (time × joints) compressed by a causal VAE. This simple change substantially improves generation quality, revealing that latent space design is an underestimated bottleneck. The noise-free condition injection mechanism assigns independent timestep embeddings to each token, allowing conditioning frames to be injected as clean tokens (t=0) while denoising the rest, unifying text-to-motion and pose-conditioned generation, and directly supporting autoregressive segment chaining for streaming synthesis. Self-forcing training further suppresses drift in long rollouts. Achieves SOTA on HumanML3D, MotionHub, BABEL, and a 50-scenario user study.",
        keyPoints: [
          "Per-Joint Latent Decomposition: Each frame decomposed into K=J+2 tokens, forming time × joints 2D grid",
          "Causal Spatio-Temporal VAE: Strictly causal convolutions support incremental encoding, FK supervision bridges rotation and coordinate spaces",
          "Noise-Free Condition Injection: Per-token independent timestep embeddings unify T2M and TP2M generation",
          "Self-Forcing Training: Simulates autoregressive inference pipeline, supporting 10+ segment continuous generation"
        ],
        href: "https://arxiv.org/abs/2603.08590",
        paperLink: "PRISM: Streaming Human Motion Generation with Per-Joint Latent Decomposition",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Motion Forcing: A Decoupled Framework for Robust Video Generation in Motion Dynamics",
        tag: "Physical Consistency",
        href: "https://arxiv.org/abs/2603.10408",
        description: "Explicitly decouples physical reasoning from visual synthesis via Point-Shape-Appearance hierarchical paradigm. Masked Point Recovery strategy forces models to learn latent physical laws. Valuable reference for physical plausibility in dance video generation."
      },
      {
        num: 6,
        title: "CoCo: Code as CoT for Text-to-Image Preview and Rare Concept Generation",
        tag: "Controllable Generation",
        href: "https://arxiv.org/abs/2603.08652",
        description: "Code-driven reasoning framework represents reasoning as executable code for explicit verifiable intermediate planning. Its draft-final two-stage generation approach can inspire hierarchical dance motion generation strategies."
      },
      {
        num: 7,
        title: "InternVL-U: Democratizing Unified Multimodal Models for Understanding, Reasoning, Generation and Editing",
        tag: "Unified Multimodal",
        href: "https://arxiv.org/abs/2603.09877",
        description: "4B-parameter lightweight unified multimodal model with MMDiT generation head and CoT alignment outperforms 14B-scale BAGEL on multiple generation tasks. Provides reference for lightweight music-to-dance model design."
      },
      {
        num: 8,
        title: "Doki: A Text-Native Interface for Generative Video Authoring",
        tag: "Interaction Interface",
        href: "https://arxiv.org/abs/2603.09072",
        description: "Text-native video creation interface aligning video creation with text writing process. Demonstrates audio-video alignment interaction paradigm, inspiring user-controllable generation interface design for music-to-dance."
      },
      {
        num: 9,
        title: "CAST: Modeling Visual State Transitions for Consistent Video Retrieval",
        tag: "Temporal Consistency",
        href: "https://arxiv.org/abs/2603.08648",
        description: "State-conditioned residual update mechanism introduces explicit inductive bias for latent state evolution. Valuable reference for identity consistency preservation in dance videos, temporal coherence modeling transferable to long-sequence dance generation."
      },
      {
        num: 10,
        title: "ReCoSplat: Autoregressive Feed-Forward Gaussian Splatting Using Render-and-Compare",
        tag: "View Consistency",
        href: "https://arxiv.org/abs/2603.09968",
        description: "Render-and-Compare module provides stable conditioning signal compensating pose errors, hybrid KV cache compression supports 100+ frame long sequences. Technical reference value for view consistency and appearance preservation in dance videos."
      },
    ],
    observation: "Today's papers reveal three important trends in video generation: First, stability issues in long video generation are being addressed through innovative architectures like hierarchical denoising (HiAR) and diagonal distillation (Diagonal Distillation), which have direct transfer value for music-to-dance tasks requiring long-sequence dance video generation. Second, sparse attention optimization is shifting from simple block dropping to error-aware routing (SVG-EAR), whose parameter-free compensation mechanism can significantly reduce computational costs for 3D Audio Attention. Third, the human motion generation field is beginning to emphasize latent space structure design (PRISM), whose per-joint decomposition concept provides new ideas for fine-grained control of dance movements. Recommend focusing on HiAR's matched-noise conditioning mechanism and PRISM's noise-free condition injection technology—their combination could address long-range consistency and conditional control issues in dance video generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-11`,
        'en': `/en/daily/music-to-dance/2026-03-11`,
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
      date="2026-03-11"
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
