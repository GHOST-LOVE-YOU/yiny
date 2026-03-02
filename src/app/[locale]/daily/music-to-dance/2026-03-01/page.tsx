import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "音乐到舞蹈生成",
    title: "因果扩散与时序泛化：长舞蹈视频生成的新路径",
    overview: [
      "CMDM 将因果扩散与自回归结合，解决长序列舞蹈生成的误差累积和推理延迟问题",
      "MMHNet 实现短序列训练、长序列推理，为分钟级舞蹈视频提供可行路径",
      "DyaDiT 的双人对话手势生成框架可直接迁移到双人舞场景"
    ],
    papers: [
      {
        num: 1,
        tag: "动作生成",
        title: "CMDM：因果运动扩散模型实现流式生成",
        description: "现有运动扩散模型要么依赖双向注意力（破坏时序因果性），要么采用自回归架构（导致误差累积）。CMDM 提出 Motion-Language-Aligned Causal VAE (MAC-VAE)，将运动序列编码为时序因果潜在表示，配合因果扩散 Transformer (Causal-DiT) 实现逐帧有序去噪。关键创新是 frame-wise sampling schedule with causal uncertainty：每帧基于部分去噪的前序帧进行预测，而非完全自回归。在 HumanML3D 和 SnapMoGen 上，CMDM 在语义保真度和时序平滑度上超越现有方法，推理延迟降低一个数量级。对于 music-to-dance 任务，该框架可实现低延迟的流式舞蹈生成，MAC-VAE 的因果编码能有效防止长序列中的误差累积。",
        keyPoints: [
          "MAC-VAE 实现运动-语言对齐的时序因果潜在编码，每帧仅依赖历史帧",
          "Causal-DiT 采用因果自注意力，确保严格时序顺序，支持流式生成",
          "Frame-wise sampling 允许从部分去噪的前序帧预测下一帧，显著降低推理延迟",
          "实验显示在长序列生成中比现有扩散和自回归方法更稳定"
        ],
        href: "https://arxiv.org/abs/2602.22594",
        paperLink: "Causal Motion Diffusion Models for Autoregressive Motion Generation (CVPR 2026)",
      },
      {
        num: 2,
        tag: "音视频生成",
        title: "Echoes Over Time：突破长度限制的视频到音频生成",
        description: "视频到音频（V2A）生成面临的核心挑战是：模型通常在 8-10 秒短片段上训练，但推理时需要生成更长序列（如 5 分钟以上）。传统 Transformer 的位置编码难以泛化到训练外的长度。本研究提出 MMHNet (Multimodal Hierarchical Network)，用非因果 Mamba 替代 Transformer，摆脱位置编码限制，实现短序列训练、长序列推理。HNet 的分层架构结合动态分块、路由和平滑模块，在压缩空间进行多模态对齐。实验证明 MMHNet 可生成长达 5 分钟的高质量音频，而此前方法在 1 分钟后质量显著下降。对于 music-to-dance，该架构直接适用：训练时使用短舞蹈片段，推理时生成长达数分钟的连贯舞蹈视频。",
        keyPoints: [
          "用 Mamba-2 替代 Transformer，消除位置编码对长度泛化的限制",
          "分层路由策略压缩冗余 token，提高跨模态对齐效率",
          "证明训练短-测试长在音视频生成任务中可行，生成长度从 8s 扩展到 5min+",
          "在 UnAV100 和 LongVale 长视频基准上达到 SOTA"
        ],
        href: "https://arxiv.org/abs/2602.20981",
        paperLink: "Echoes Over Time: Unlocking Length Generalization in Video-to-Audio Generation Models (CVPR 2026)",
      },
      {
        num: 3,
        tag: "手势生成",
        title: "DyaDiT：社交感知的双人对话手势扩散模型",
        description: "现有手势生成方法通常只考虑单人音频到动作的映射，忽略了社交上下文和双人间互动。DyaDiT 提出多模态扩散 Transformer，从双人对话音频生成社交上下文感知的手势。核心创新包括：(1) Orthogonalization Cross Attention (ORCA) 模块，通过投影消除两条音频流的干扰，获得更清晰的音频表示；(2) 运动字典编码运动先验；(3) 可选地利用对话伙伴的手势生成更协调的响应。模型支持关系类型（朋友/陌生人/家人/伴侣）和人格特质（外向性、宜人性等）作为条件。实验表明 DyaDiT 在客观指标和用户主观偏好上均超越现有方法。对于双人舞生成，该框架直接适用：ORCA 可分离音乐与伴唱/节拍，社交上下文可映射为舞蹈风格，运动字典思路可迁移到舞蹈词汇学习。",
        keyPoints: [
          "ORCA 模块通过正交投影消除双音频流干扰，生成更清晰的动作表示",
          "运动字典编码运动先验，支持风格感知的手势生成",
          "支持关系类型和人格特质作为条件，实现社交上下文感知生成",
          "用户研究显示生成动作在社交一致性和自然度上显著优于基线"
        ],
        href: "https://arxiv.org/abs/2602.23165",
        paperLink: "DyaDiT: A Multi-Modal Diffusion Transformer for Socially Favorable Dyadic Gesture Generation",
      },
      {
        num: 4,
        tag: "训练范式",
        title: "DPE：诊断驱动的渐进式多模态模型训练",
        description: "现有自进化训练框架依赖启发式信号（如困惑度），缺乏可解释的故障归因，导致在长尾任务上不稳定甚至退化。DPE (Diagnostic-driven Progressive Evolution) 提出诊断→生成→强化的螺旋循环：诊断智能体分析模型失败模式，将故障归因到具体能力维度（如 OCR、图表理解、数学推理等 12 个类别），动态调整数据混合比例，指导多智能体系统生成针对性训练数据。DPE 使用 4 个专业智能体（规划、检索/编辑、问题构建、验证）协作，从外部图像池获取多样化视觉内容。在 Qwen3-VL-8B 和 Qwen2.5-VL-7B 上，仅用 ~1000 样本就在 11 个基准上实现持续提升。对于 music-to-dance，DPE 可诊断音频-动作对齐、外观一致性等具体薄弱环节，生成针对性训练数据解决长尾问题。",
        keyPoints: [
          "诊断机制将失败归因到 12 个能力维度，生成结构化诊断报告指导数据生成",
          "多智能体系统配备图像搜索和编辑工具，从外部池获取多样化视觉内容",
          "动态数据混合策略根据当前能力盲点优化训练分布",
          "实验证明相比静态数据训练，DPE 在长尾任务上显著更稳定"
        ],
        href: "https://arxiv.org/abs/2602.22859",
        paperLink: "From Blind Spots to Gains: Diagnostic-Driven Iterative Training for Large Multimodal Models",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "一致性三位一体：通用世界模型的理论基础",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2602.23152",
        description: "提出世界模型必须满足模态一致性（语义接口）、空间一致性（几何基础）、时序一致性（因果引擎）。为舞蹈视频生成提供理论框架：模态一致性指导音频-视觉对齐，空间一致性指导人体几何保持，时序一致性指导动作连贯性。",
      },
      {
        num: 6,
        title: "混合数据-流水线并行加速扩散模型推理",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2602.21760",
        description: "基于条件引导调度的混合并行框架，利用条件/无条件去噪路径作为数据划分视角，自适应切换流水线并行。在双卡上实现 SDXL 2.31×、SD3 2.07× 加速。可直接降低 music-to-dance 推理成本，支持实时生成。",
      },
      {
        num: 7,
        title: "VGG-T³：大规模前馈 3D 重建的线性复杂度方案",
        tag: "3D 重建",
        href: "https://arxiv.org/abs/2602.23361",
        description: "通过测试时训练将可变长度 KV 表示蒸馏为固定大小 MLP，实现输入视图数线性复杂度。重建 1k 图像仅需 54 秒，比 softmax 注意力基线快 11.6 倍。可为多视角舞蹈视频重建提供效率参考。",
      },
      {
        num: 8,
        title: "GeoWorld：双曲空间中的几何世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2602.23058",
        description: "将潜在表示从欧氏空间映射到双曲流形，通过 Hyperbolic JEPA 保持几何结构和层级关系。层级结构保持能力可能帮助建模舞蹈动作的层级语法（舞步→组合→段落）。",
      },
      {
        num: 9,
        title: "想象助力视觉推理，但隐空间尚不成熟",
        tag: "视觉推理",
        href: "https://arxiv.org/abs/2602.22766",
        description: "通过因果中介分析发现隐空间推理存在输入-隐变量和隐变量-答案双重解耦。提出 CapImagine 显式文本想象作为替代方案。警示 music-to-dance 设计：隐变量可能与输入解耦，显式中间表示或许是更好选择。",
      },
    ],
    observation: "本日论文呈现两大趋势：一是时序建模架构从 Transformer 向 Mamba 演进，利用无位置编码特性实现长度泛化（Echoes Over Time）；二是因果性（Causality）成为生成模型核心设计原则，CMDM 的因果扩散和 DyaDiT 的因果音频分离都体现了这一点。对于 music-to-dance 任务，这意味着未来架构可能采用「因果 Mamba 骨干 + 层次化路由」的组合，在保持生成质量的同时解决长序列和实时性难题。此外，DPE 的诊断驱动训练范式提示我们：与其盲目扩展数据，不如系统诊断模型在音频-动作对齐、外观一致性等方面的具体弱点，有针对性地生成训练数据。",
  },
  en: {
    roleName: "Music-to-Dance Generation",
    title: "Causal Diffusion & Length Generalization: New Paths for Long Dance Video Generation",
    overview: [
      "CMDM unifies causal autoregression with diffusion, solving error accumulation and latency in long dance sequence generation",
      "MMHNet enables training on short clips while inferring long sequences, providing a viable path for minute-level dance videos",
      "DyaDiT's dyadic gesture framework directly transfers to duet dance scenarios"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "CMDM: Causal Motion Diffusion for Streaming Generation",
        description: "Existing motion diffusion models rely on bidirectional attention (breaking temporal causality) or autoregressive architectures (causing error accumulation). CMDM proposes Motion-Language-Aligned Causal VAE (MAC-VAE) to encode motion into temporally causal latent representations, paired with Causal Diffusion Transformer (Causal-DiT) for frame-ordered denoising. The key innovation is frame-wise sampling with causal uncertainty: each frame is predicted from partially denoised preceding frames rather than full autoregression. On HumanML3D and SnapMoGen, CMDM surpasses existing methods in semantic fidelity and temporal smoothness while reducing inference latency by an order of magnitude. For music-to-dance, this enables low-latency streaming dance generation with MAC-VAE's causal encoding preventing error accumulation in long sequences.",
        keyPoints: [
          "MAC-VAE achieves motion-language aligned temporal causal latent encoding, each frame only depends on history",
          "Causal-DiT uses causal self-attention ensuring strict temporal order and supporting streaming generation",
          "Frame-wise sampling allows predicting next frame from partially denoised history, significantly reducing latency",
          "Experiments show greater stability than existing diffusion and autoregressive methods on long sequences"
        ],
        href: "https://arxiv.org/abs/2602.22594",
        paperLink: "Causal Motion Diffusion Models for Autoregressive Motion Generation (CVPR 2026)",
      },
      {
        num: 2,
        tag: "Video-to-Audio",
        title: "Echoes Over Time: Breaking Length Limits in V2A Generation",
        description: "The core challenge in video-to-audio (V2A) is that models typically train on 8-10s clips but need to generate longer sequences (5+ minutes) at inference. Traditional Transformer positional embeddings struggle to generalize beyond training length. This work proposes MMHNet (Multimodal Hierarchical Network), replacing Transformers with non-causal Mamba to eliminate positional encoding constraints, enabling short-train-long-test. HNet's hierarchical architecture with dynamic chunking, routing and smoothing modules performs multimodal alignment in compressed space. Experiments show MMHNet can generate high-quality audio up to 5 minutes, while prior methods degrade significantly after 1 minute. For music-to-dance, this architecture directly applies: train on short dance clips, infer minute-long coherent dance videos.",
        keyPoints: [
          "Replaces Transformer with Mamba-2, eliminating positional encoding constraints on length generalization",
          "Hierarchical routing compresses redundant tokens, improving cross-modal alignment efficiency",
          "Proves train-short-test-long feasible in video-to-audio, extending generation from 8s to 5min+",
          "Achieves SOTA on UnAV100 and LongVale long-video benchmarks"
        ],
        href: "https://arxiv.org/abs/2602.20981",
        paperLink: "Echoes Over Time: Unlocking Length Generalization in Video-to-Audio Generation Models (CVPR 2026)",
      },
      {
        num: 3,
        tag: "Gesture Generation",
        title: "DyaDiT: Socially-Aware Dyadic Gesture Diffusion",
        description: "Existing gesture generation methods typically map single-speaker audio to motion, ignoring social context and bidirectional interaction. DyaDiT proposes a multimodal diffusion transformer generating socially context-aware gestures from dyadic audio. Key innovations: (1) Orthogonalization Cross Attention (ORCA) eliminates interference between two audio streams via projection for cleaner audio representations; (2) Motion dictionary encodes motion priors; (3) Optionally leverages partner's gestures for more coordinated responses. The model supports relationship types (friend/stranger/family/partner) and personality traits (extraversion, agreeableness, etc.) as conditions. Experiments show DyaDiT surpasses baselines in both objective metrics and user preference. For duet dance generation, this framework directly applies: ORCA can separate music from vocals/beats, social context maps to dance styles, and the motion dictionary approach transfers to dance vocabulary learning.",
        keyPoints: [
          "ORCA module eliminates dual-audio interference via orthogonal projection for cleaner motion representation",
          "Motion dictionary encodes motion priors, supporting style-aware gesture generation",
          "Supports relationship type and personality traits as conditions for socially-aware generation",
          "User studies show significant improvement over baselines in social consistency and naturalness"
        ],
        href: "https://arxiv.org/abs/2602.23165",
        paperLink: "DyaDiT: A Multi-Modal Diffusion Transformer for Socially Favorable Dyadic Gesture Generation",
      },
      {
        num: 4,
        tag: "Training Paradigm",
        title: "DPE: Diagnostic-Driven Progressive Training for LMMs",
        description: "Existing self-evolving frameworks rely on heuristic signals (e.g., perplexity) lacking interpretable failure attribution, causing instability or degradation on long-tail tasks. DPE (Diagnostic-driven Progressive Evolution) proposes a diagnose→generate→reinforce spiral loop: diagnostic agents analyze failure patterns, attribute faults to specific capability dimensions (12 categories including OCR, chart understanding, math reasoning), dynamically adjust data mixture ratios, and guide multi-agent systems to generate targeted training data. DPE uses 4 specialized agents (planning, retrieval/editing, question construction, validation) collaborating with image search and editing tools to source diverse visual content from external pools. On Qwen3-VL-8B and Qwen2.5-VL-7B, DPE achieves continuous gains across 11 benchmarks with only ~1000 samples. For music-to-dance, DPE can diagnose specific weaknesses in audio-motion alignment and appearance consistency, generating targeted training data to address long-tail issues.",
        keyPoints: [
          "Diagnostic mechanism attributes failures to 12 capability dimensions, generating structured reports to guide data generation",
          "Multi-agent system equipped with image search and editing tools sources diverse visual content from external pools",
          "Dynamic data mixture strategy optimizes training distribution based on current capability blind spots",
          "Experiments show DPE significantly more stable than static data training on long-tail tasks"
        ],
        href: "https://arxiv.org/abs/2602.22859",
        paperLink: "From Blind Spots to Gains: Diagnostic-Driven Iterative Training for Large Multimodal Models",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Trinity of Consistency: Theoretical Foundation for World Models",
        tag: "World Models",
        href: "https://arxiv.org/abs/2602.23152",
        description: "Proposes that world models require Modal Consistency (semantic interface), Spatial Consistency (geometric basis), and Temporal Consistency (causal engine). Provides theoretical framework for dance video generation: modal consistency guides audio-visual alignment, spatial consistency maintains human geometry, temporal consistency ensures motion coherence.",
      },
      {
        num: 6,
        title: "Hybrid Data-Pipeline Parallelism for Diffusion Acceleration",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2602.21760",
        description: "Hybrid parallelism framework based on conditional guidance scheduling uses conditional/unconditional denoising paths as data partitioning perspectives with adaptive pipeline switching. Achieves 2.31× speedup on SDXL and 2.07× on SD3 with dual GPUs. Can directly reduce music-to-dance inference costs for real-time generation.",
      },
      {
        num: 7,
        title: "VGG-T³: Linear Complexity for Large-Scale Feed-Forward 3D Reconstruction",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2602.23361",
        description: "Distills variable-length KV representations into fixed-size MLP via test-time training, achieving linear complexity w.r.t. input views. Reconstructs 1k images in 54 seconds, 11.6× faster than softmax attention baselines. Provides efficiency reference for multi-view dance video reconstruction.",
      },
      {
        num: 8,
        title: "GeoWorld: Geometric World Models in Hyperbolic Space",
        tag: "World Models",
        href: "https://arxiv.org/abs/2602.23058",
        description: "Maps latent representations from Euclidean to hyperbolic manifolds via Hyperbolic JEPA, preserving geometric structure and hierarchical relations. Hierarchical structure preservation may help model dance grammar hierarchies (steps→combinations→segments).",
      },
      {
        num: 9,
        title: "Imagination Helps Visual Reasoning, But Not Yet in Latent Space",
        tag: "Visual Reasoning",
        href: "https://arxiv.org/abs/2602.22766",
        description: "Through causal mediation analysis, discovers dual disconnection between input-latent and latent-answer in latent reasoning. Proposes CapImagine explicit text imagination as alternative. Caution for music-to-dance: latent variables may disconnect from inputs; explicit intermediate representations may be preferable.",
      },
    ],
    observation: "Today's papers reveal two key trends: (1) temporal modeling architectures evolving from Transformers to Mamba, leveraging position-free encoding for length generalization (Echoes Over Time); and (2) causality becoming a core design principle in generative models, evidenced by CMDM's causal diffusion and DyaDiT's causal audio separation. For music-to-dance, this suggests future architectures may adopt 'causal Mamba backbone + hierarchical routing' combinations, solving long-sequence and real-time challenges while maintaining generation quality. Additionally, DPE's diagnostic-driven training paradigm suggests that instead of blindly scaling data, we should systematically diagnose model weaknesses in audio-motion alignment and appearance consistency, generating targeted training data accordingly.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-01`,
        'en': `/en/daily/music-to-dance/2026-03-01`,
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
      date="2026-03-01"
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
