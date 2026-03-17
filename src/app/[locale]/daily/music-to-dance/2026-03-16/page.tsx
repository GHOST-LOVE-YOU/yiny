import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "身份保持与运动控制的统一框架 · 自适应视频Token化",
    overview: [
      "DreamVideo-Omni提出两阶段训练范式，将多主体身份保持与全粒度运动控制统一在单一DiT架构中",
      "EVATok的自适应Token分配机制可为舞蹈视频生成节省24%以上计算开销",
      "EndoCoT的迭代式思维引导为复杂多条件生成提供了渐进式推理新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "DreamVideo-Omni：多主体身份保持与全粒度运动控制的统一框架",
        description: `DreamVideo-Omni是当前视频定制化领域最完整的技术方案之一。论文针对多主体身份保持与运动控制之间的固有冲突，提出了渐进式两阶段训练范式。第一阶段通过条件感知3D RoPE、层级运动注入和组/角色嵌入机制，实现了参考图像、边界框和轨迹的异构条件统一编码；第二阶段引入潜在空间身份奖励反馈学习（LIReFL），在无需VAE解码的情况下直接对中间噪声潜变量进行身份监督。

对music-to-dance任务的核心启发在于：1）组嵌入和角色嵌入的显式绑定机制可直接迁移到多角色舞蹈场景，解决音频-运动对齐中的主体混淆问题；2）潜在身份奖励模型（LIRM）基于视频扩散模型骨干，能够评估运动感知身份一致性，这对评估舞蹈视频中身份保持质量具有直接参考价值；3）条件感知3D RoPE的时序索引策略（视频帧t∈[0,T-1]、参考图像t_ref、轨迹token共享视频时序）为音频条件与视觉条件的融合提供了可借鉴的编码方案。`,
        keyPoints: [
          "组/角色嵌入显式绑定运动信号与特定身份，解决多主体控制歧义",
          "潜在身份奖励模型在潜空间直接计算身份奖励，绕过昂贵的VAE解码",
          "层级运动注入策略将边界框条件密集注入每层DiT块，增强全局运动控制精度"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "视频Token化",
        title: "EVATok：面向高效视觉自回归生成的自适应长度视频Token化",
        description: `EVATok针对视频自回归模型中固定长度token分配的低效问题，提出了四阶段自适应token化框架。核心创新在于：1）将最优分配识别形式化为最大代理奖励分配问题，通过可学习的代理tokenizer估计不同分配下的质量-成本权衡；2）训练轻量级router网络预测最优分配，避免推理时的启发式搜索或ILP求解；3）在保持重建质量的同时，相比LARP等SOTA方法节省至少24.4%的token使用量。

对music-to-dance任务的直接价值在于：舞蹈视频通常包含大量静态或重复帧（如定格pose、循环动作），EVATok的自适应分配策略可将更多token预算分配给动作变化剧烈的片段，在保持生成质量的同时显著降低推理成本。论文中展示的分配直觉（重复/简单/静态内容少分配token，非重复/复杂/动态内容多分配）与舞蹈视频的时序特性高度契合。`,
        keyPoints: [
          "代理奖励指标统一量化重建质量与token成本，实现最优分配的形式化定义",
          "轻量级router网络实现训练和推理时的快速最优分配预测",
          "相比固定长度基线节省24.4%以上token，同时提升重建和生成质量"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
      {
        num: 3,
        tag: "扩散模型推理",
        title: "EndoCoT：扩散模型中的内生思维链推理",
        description: `EndoCoT揭示了当前MLLM+扩散模型范式在复杂推理任务中的两个关键瓶颈：单步推理深度不足、静态条件引导失效。论文通过层敏感度分析发现，逻辑推理主要集中在MLLM的末端层与DiT的初始层交界处，而DiT在复杂场景下会出现跨注意力熵全局扩散，导致空间锚定失效。

为此，EndoCoT提出迭代式思维引导模块：在MLLM的潜空间中迭代更新思维状态，建立与DiT去噪过程的对应关系；同时通过终端思维接地模块确保推理轨迹与文本监督对齐。在迷宫、TSP、VSP、数独等任务上达到92.1%平均准确率，相比最强基线提升8.3个百分点。

对music-to-dance的启发在于：当前方案使用固定音频条件，EndoCoT的渐进式推理机制提示我们——可在去噪过程中动态调整音频-运动对齐强度，实现更精细的条件控制。`,
        keyPoints: [
          "层敏感度分析定位推理能力在MLLM末端层与DiT初始层的集中分布",
          "迭代思维引导在MLLM潜空间建立类CoT的多轮推理过程",
          "动态条件更新机制替代静态一次注入，维持复杂约束下的空间锚定"
        ],
        href: "https://arxiv.org/abs/2603.12252",
        paperLink: "EndoCoT: Scaling Endogenous Chain-of-Thought Reasoning in Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Spatial-TTT：基于测试时训练的流式视觉空间智能",
        tag: "空间推理",
        href: "https://arxiv.org/abs/2603.12255",
        description: "3D时空卷积与空间预测机制可增强舞蹈视频长序列空间一致性。",
      },
      {
        num: 5,
        title: "ELIT：扩散Transformer的弹性潜在接口",
        tag: "高效推理",
        href: "https://arxiv.org/abs/2603.12245",
        description: "动态计算分配支持推理速度-质量权衡，适用于实时舞蹈生成场景。",
      },
      {
        num: 6,
        title: "IndexCache：跨层索引复用加速稀疏注意力",
        tag: "注意力优化",
        href: "https://arxiv.org/abs/2603.12201",
        description: "75%索引计算削减技术可应用于3D Audio Attention模块加速。",
      },
      {
        num: 7,
        title: "MV-GRPO：增强条件空间的多视角GRPO",
        tag: "强化学习",
        href: "https://arxiv.org/abs/2603.12648",
        description: "多视角条件增强可改进音频-视觉对齐的鲁棒性。",
      },
      {
        num: 8,
        title: "FIRM：忠实图像奖励建模",
        tag: "奖励模型",
        href: "https://arxiv.org/abs/2603.12247",
        description: "身份保持和一致性的自动评估框架，可作为舞蹈视频质量评估基准。",
      },
    ],
    observation: "今日论文呈现出视频生成领域向『统一控制』和『高效推理』演进的明显趋势。DreamVideo-Omni将身份保持与运动控制统一在单一DiT中，EVATok从token化角度优化效率，EndoCoT则从推理机制角度提升复杂条件处理能力。对于music-to-dance任务，这三条技术路线可形成互补：DreamVideo-Omni的组/角色嵌入机制解决多角色舞蹈的身份-运动绑定问题，EVATok的自适应token化降低长舞蹈序列的推理成本，EndoCoT的迭代推理为音频-视觉对齐提供动态调整能力。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Unified Identity Preservation & Motion Control · Adaptive Video Tokenization",
    overview: [
      "DreamVideo-Omni proposes a two-stage training paradigm unifying multi-subject identity preservation and omni-motion control in a single DiT architecture",
      "EVATok's adaptive token allocation can save 24%+ computational overhead for dance video generation",
      "EndoCoT's iterative thought guidance provides new ideas for progressive reasoning in complex multi-condition generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "DreamVideo-Omni: Unified Framework for Multi-Subject Identity Preservation and Omni-Motion Control",
        description: `DreamVideo-Omni represents one of the most comprehensive technical solutions in video customization. Addressing the inherent conflict between multi-subject identity preservation and motion control, the paper proposes a progressive two-stage training paradigm. Stage 1 achieves unified encoding of heterogeneous conditions (reference images, bounding boxes, trajectories) through condition-aware 3D RoPE, hierarchical motion injection, and group/role embeddings. Stage 2 introduces Latent Identity Reward Feedback Learning (LIReFL) that performs identity supervision directly on intermediate noisy latents without VAE decoding.

Key insights for music-to-dance: 1) The explicit binding mechanism of group and role embeddings can be directly migrated to multi-character dance scenarios, resolving subject confusion in audio-motion alignment; 2) The Latent Identity Reward Model (LIRM) based on video diffusion model backbone evaluates motion-aware identity consistency, providing direct reference for assessing identity preservation quality in dance videos; 3) The temporal indexing strategy of condition-aware 3D RoPE (video frames t∈[0,T-1], reference images t_ref, trajectory tokens sharing video temporality) offers an encoding scheme worth借鉴 for fusing audio and visual conditions.`,
        keyPoints: [
          "Group/role embeddings explicitly bind motion signals to specific identities, resolving multi-subject control ambiguity",
          "Latent identity reward model computes identity rewards directly in latent space, bypassing expensive VAE decoding",
          "Hierarchical motion injection densely injects bounding box conditions into each DiT block, enhancing global motion control precision"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "Video Tokenization",
        title: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
        description: `EVATok addresses the inefficiency of fixed-length token allocation in video autoregressive models through a four-stage adaptive tokenization framework. Core innovations: 1) Formulating optimal allocation identification as a maximum proxy reward assignment problem, using a learnable proxy tokenizer to estimate quality-cost trade-offs under different allocations; 2) Training a lightweight router network to predict optimal allocations, avoiding heuristic search or ILP solving at inference; 3) Saving at least 24.4% token usage compared to SOTA methods like LARP while maintaining reconstruction quality.

Direct value for music-to-dance: Dance videos often contain substantial static or repetitive frames (frozen poses, cyclic movements). EVATok's adaptive allocation strategy can allocate more token budget to segments with dramatic motion changes, significantly reducing inference costs while maintaining generation quality. The allocation intuition demonstrated in the paper (fewer tokens for repetitive/simple/static content, more for non-repetitive/complex/dynamic content) aligns well with the temporal characteristics of dance videos.`,
        keyPoints: [
          "Proxy reward metric unifies reconstruction quality and token cost quantification, enabling formal definition of optimal allocation",
          "Lightweight router network enables fast optimal allocation prediction during training and inference",
          "Saves 24.4%+ tokens compared to fixed-length baselines while improving reconstruction and generation quality"
        ],
        href: "https://arxiv.org/abs/2603.12267",
        paperLink: "EVATok: Adaptive Length Video Tokenization for Efficient Visual Autoregressive Generation",
      },
      {
        num: 3,
        tag: "Diffusion Reasoning",
        title: "EndoCoT: Endogenous Chain-of-Thought Reasoning in Diffusion Models",
        description: `EndoCoT reveals two critical bottlenecks in current MLLM+diffusion model paradigms for complex reasoning tasks: insufficient single-step reasoning depth and static conditioning guidance failure. Through layer-wise sensitivity analysis, the paper finds that logical reasoning concentrates at the junction between MLLM terminal layers and DiT initial layers, while DiT exhibits global cross-attention entropy diffusion in complex scenarios, leading to spatial anchoring failure.

To address this, EndoCoT proposes an iterative thought guidance module that updates thought states iteratively in MLLM latent space, establishing correspondence with DiT denoising process; meanwhile, a terminal thought grounding module ensures reasoning trajectory alignment with textual supervision. Achieves 92.1% average accuracy on maze, TSP, VSP, and Sudoku tasks, 8.3 percentage points improvement over strongest baselines.

Insight for music-to-dance: Current approaches use fixed audio conditions. EndoCoT's progressive reasoning mechanism suggests dynamically adjusting audio-motion alignment strength during denoising for finer conditional control.`,
        keyPoints: [
          "Layer-wise sensitivity analysis locates reasoning capability concentration at MLLM terminal and DiT initial layers",
          "Iterative thought guidance establishes CoT-like multi-round reasoning in MLLM latent space",
          "Dynamic condition update mechanism replaces static one-time injection, maintaining spatial anchoring under complex constraints"
        ],
        href: "https://arxiv.org/abs/2603.12252",
        paperLink: "EndoCoT: Scaling Endogenous Chain-of-Thought Reasoning in Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Spatial-TTT: Streaming Visual Spatial Intelligence via Test-Time Training",
        tag: "Spatial Reasoning",
        href: "https://arxiv.org/abs/2603.12255",
        description: "3D spatiotemporal convolution and spatial prediction enhance long-sequence spatial consistency in dance videos.",
      },
      {
        num: 5,
        title: "ELIT: Elastic Latent Interfaces for Diffusion Transformers",
        tag: "Efficient Inference",
        href: "https://arxiv.org/abs/2603.12245",
        description: "Dynamic compute allocation supports inference speed-quality trade-offs for real-time dance generation scenarios.",
      },
      {
        num: 6,
        title: "IndexCache: Cross-Layer Index Reuse for Sparse Attention Acceleration",
        tag: "Attention Optimization",
        href: "https://arxiv.org/abs/2603.12201",
        description: "75% indexer computation reduction applicable to 3D Audio Attention module acceleration.",
      },
      {
        num: 7,
        title: "MV-GRPO: Multi-View GRPO via Augmented Condition Space",
        tag: "Reinforcement Learning",
        href: "https://arxiv.org/abs/2603.12648",
        description: "Multi-view condition enhancement improves robustness of audio-visual alignment.",
      },
      {
        num: 8,
        title: "FIRM: Faithful Image Reward Modeling",
        tag: "Reward Model",
        href: "https://arxiv.org/abs/2603.12247",
        description: "Automated evaluation framework for identity preservation and consistency, suitable as dance video quality benchmark.",
      },
    ],
    observation: "Today's papers show a clear trend toward 'unified control' and 'efficient inference' in video generation. DreamVideo-Omni unifies identity preservation and motion control in a single DiT, EVATok optimizes efficiency from the tokenization perspective, and EndoCoT enhances complex conditional processing from the reasoning mechanism angle. For music-to-dance, these three technical routes can complement each other: DreamVideo-Omni's group/role embedding mechanism addresses identity-motion binding in multi-character dance, EVATok's adaptive tokenization reduces inference costs for long dance sequences, and EndoCoT's iterative reasoning provides dynamic adjustment capabilities for audio-visual alignment.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-16`,
        'en': `/en/daily/music-to-dance/2026-03-16`,
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
      date="2026-03-16"
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
