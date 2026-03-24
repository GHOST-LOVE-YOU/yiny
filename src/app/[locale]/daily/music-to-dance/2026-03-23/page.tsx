import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "视频编辑的语义-运动解耦与身份保持新范式",
    overview: [
      "SAMA 提出语义锚定与运动对齐的解耦训练框架，零样本视频编辑能力突出",
      "LumosX 通过关系型注意力机制实现多主体身份-属性精确绑定，解决外观迁移难题",
      "MoTok 的扩散式运动 Tokenizer 为音频-运动对齐提供紧凑表示新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "视频编辑",
        title: "SAMA：语义锚定与运动对齐的解耦视频编辑框架",
        description: "SAMA 将指令引导的视频编辑分解为语义锚定（Semantic Anchoring）和运动对齐（Motion Alignment）两个互补能力。语义锚定通过在稀疏锚定帧上联合预测语义 Token 和视频潜变量，实现纯指令感知的结构规划；运动对齐则通过以运动为中心的视频恢复前置任务（cube inpainting、speed perturbation、tube shuffle）预训练模型，使其直接从原始视频中内化时间动态。这种解耦设计使得因子化预训练阶段 alone 就能产生强大的零样本视频编辑能力。对于 music-to-dance 任务，SAMA 的运动对齐预训练任务可直接迁移用于增强音频-运动对齐的稳定性，而语义锚定机制可用于参考人物图与生成舞蹈视频之间的外观一致性保持。",
        keyPoints: [
          "提出语义锚定机制：在稀疏锚定帧上联合预测语义 Token 和视频潜变量，实现指令感知的结构规划",
          "设计运动对齐预训练：通过 cube inpainting、speed perturbation、tube shuffle 等运动中心恢复任务内化时间动态",
          "两阶段训练策略：因子化预训练（无需配对编辑数据）+ 监督微调，预训练 alone 即可产生零样本编辑能力"
        ],
        href: "https://arxiv.org/abs/2603.19228",
        paperLink: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
      },
      {
        num: 2,
        tag: "个性化生成",
        title: "LumosX：关系型注意力实现身份-属性精确绑定的个性化视频生成",
        description: "LumosX 针对多主体个性化视频生成中的身份-属性对齐难题，提出了一套数据+模型的完整解决方案。在数据侧，通过 MLLM 从独立视频中提取显式的人脸-属性依赖关系；在模型侧，设计关系型自注意力（Relational Self-Attention）和关系型交叉注意力（Relational Cross-Attention），通过位置感知嵌入与结构化注意力掩码显式编码人脸-属性绑定。R2PE（关系型旋转位置编码）和 CSAM（因果自注意力掩码）在位置编码和时空自注意力阶段建模依赖关系，MCAM（多级交叉注意力掩码）则增强组内一致性、抑制组间干扰。对于 music-to-dance 任务，LumosX 的关系型注意力机制可直接用于参考人物图与生成舞蹈视频之间的身份保持，解决外观迁移中的身份漂移问题。",
        keyPoints: [
          "关系型自注意力：通过 R2PE 和 CSAM 在位置编码和自注意力阶段显式建模人脸-属性依赖",
          "关系型交叉注意力：MCAM 多级掩码增强组内一致性、抑制组间干扰，精确绑定身份与属性",
          "数据管道创新：利用 MLLM 从独立视频构建带显式人脸-属性对应关系的训练数据"
        ],
        href: "https://arxiv.org/abs/2603.20192",
        paperLink: "LumosX: Relate Any Identities with Their Attributes for Personalized Video Generation",
      },
      {
        num: 3,
        tag: "运动生成",
        title: "MoTok：扩散式离散运动 Tokenizer 桥接语义与运动学条件",
        description: "MoTok 提出了一种扩散式离散运动 Tokenizer，将运动表示分解为紧凑的离散 Token 序列和基于扩散的重建解码器。核心洞察是：离散 Token 负责高层语义抽象，扩散解码器负责细粒度运动重建，两者解耦后可用单层 Codebook 实现高压缩率（仅用 1/6 Token 达到 SOTA）。在条件注入上，MoTok 采用粗到细的策略：运动学条件在 Planning 阶段作为粗约束指导 Token 生成，在 Control 阶段通过扩散去噪中的优化引导强制执行细粒度约束。这种设计避免了运动学细节干扰语义 Token 规划。对于 music-to-dance 任务，MoTok 的范式可将音频特征编码为紧凑的语义 Token 用于舞蹈动作规划，同时保留对特定关节轨迹的精确控制能力。",
        keyPoints: [
          "扩散式 Tokenizer：离散 Token 负责语义抽象，扩散解码器负责细粒度重建，实现紧凑单层表示",
          "粗到细条件注入：运动学条件在 Planning 阶段作粗约束，在 Control 阶段作细约束，避免干扰语义规划",
          "高效压缩：仅用 1/6 Token 达到比 MaskControl 更低的 FID（0.029 vs 0.083）和轨迹误差（0.08cm vs 0.72cm）"
        ],
        href: "https://arxiv.org/abs/2603.19227",
        paperLink: "Bridging Semantic and Kinematic Conditions with Diffusion-based Discrete Motion Tokenizer",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "EffectErase：联合视频对象移除与插入的效果擦除方法",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2603.19224",
        description: "提出 VOR 数据集和 EffectErase 方法，通过互惠学习将视频对象插入作为移除的逆任务，可用于舞蹈视频背景编辑和人物替换。",
      },
      {
        num: 5,
        title: "CubiD：高维表示 Token 上的立方离散扩散",
        tag: "离散生成",
        href: "https://arxiv.org/abs/2603.19232",
        description: "首个针对高维表示（768-1024 维）的离散生成模型，任意维度任意位置可掩码预测，可能用于音频-运动联合表示学习。",
      },
      {
        num: 6,
        title: "VEGA-3D：释放视频生成模型中的隐式 3D 先验",
        tag: "3D 理解",
        href: "https://arxiv.org/abs/2603.19235",
        description: "将预训练视频扩散模型重新定位为潜在世界模拟器，提取时空特征增强 MLLM 的 3D 推理能力，可用于增强舞蹈动作的空间一致性。",
      },
      {
        num: 7,
        title: "CurveStream：曲率感知分层视觉记忆管理",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2603.19571",
        description: "通过曲率评分评估实时语义强度，自适应路由帧到清晰/模糊记忆状态，可用于长舞蹈视频的时序建模。",
      },
    ],
    observation: "本周论文呈现出明显的「解耦」趋势：SAMA 解耦语义编辑与运动建模、MoTok 解耦语义抽象与运动重建、LumosX 解耦身份表示与属性绑定。这种解耦设计不仅提升了各子任务的专业性，更重要的是实现了零样本/少样本能力的涌现。对于 music-to-dance 任务，这提示我们可以将音频-运动对齐、外观迁移、时序一致性等子问题分别建模，再通过统一的生成框架整合，可能比端到端联合训练更有效。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Semantic-Motion Decoupling and Identity Preservation in Video Editing",
    overview: [
      "SAMA proposes a factorized training framework for semantic anchoring and motion alignment with strong zero-shot video editing capabilities",
      "LumosX achieves precise identity-attribute binding through relational attention mechanisms, solving appearance migration challenges",
      "MoTok's diffusion-based motion tokenizer offers a new approach for compact audio-motion alignment representations"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Editing",
        title: "SAMA: Factorized Semantic Anchoring and Motion Alignment",
        description: "SAMA decomposes instruction-guided video editing into two complementary capabilities: Semantic Anchoring and Motion Alignment. Semantic Anchoring establishes reliable visual anchors by jointly predicting semantic tokens and video latents at sparse anchor frames, enabling purely instruction-aware structural planning. Motion Alignment pre-trains the model on motion-centric video restoration pretext tasks (cube inpainting, speed perturbation, tube shuffle), enabling the backbone to internalize temporal dynamics directly from raw videos. This factorized design allows the factorized pre-training stage alone to produce strong zero-shot video editing capabilities. For music-to-dance tasks, SAMA's motion alignment pre-training tasks can be directly transferred to enhance audio-motion alignment stability, while the semantic anchoring mechanism can maintain appearance consistency between reference images and generated dance videos.",
        keyPoints: [
          "Semantic Anchoring: Jointly predicts semantic tokens and video latents at sparse anchor frames for instruction-aware structural planning",
          "Motion Alignment Pre-training: Internalizes temporal dynamics through motion-centric restoration tasks (cube inpainting, speed perturbation, tube shuffle)",
          "Two-stage Training: Factorized pre-training (no paired editing data needed) + supervised fine-tuning, with pre-training alone enabling zero-shot editing"
        ],
        href: "https://arxiv.org/abs/2603.19228",
        paperLink: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
      },
      {
        num: 2,
        tag: "Personalization",
        title: "LumosX: Relating Identities with Attributes for Personalized Video Generation",
        description: "LumosX addresses the identity-attribute alignment challenge in multi-subject personalized video generation through a complete data+model solution. On the data side, MLLMs extract explicit face-attribute dependencies from independent videos. On the model side, Relational Self-Attention and Relational Cross-Attention explicitly encode face-attribute bindings through position-aware embeddings and structured attention masks. R2PE (Relational Rotary Position Embedding) and CSAM (Causal Self-Attention Mask) model dependencies at the position encoding and spatio-temporal self-attention stages, while MCAM (Multilevel Cross-Attention Mask) enhances intra-group coherence and suppresses inter-group interference. For music-to-dance tasks, LumosX's relational attention mechanisms can be directly applied to maintain identity consistency between reference images and generated dance videos, solving identity drift in appearance migration.",
        keyPoints: [
          "Relational Self-Attention: R2PE and CSAM explicitly model face-attribute dependencies at position encoding and self-attention stages",
          "Relational Cross-Attention: MCAM multi-level masks enhance intra-group coherence, suppress inter-group interference, and precisely bind identity with attributes",
          "Data Pipeline Innovation: Uses MLLMs to construct training data with explicit face-attribute correspondences from independent videos"
        ],
        href: "https://arxiv.org/abs/2603.20192",
        paperLink: "LumosX: Relate Any Identities with Their Attributes for Personalized Video Generation",
      },
      {
        num: 3,
        tag: "Motion Generation",
        title: "MoTok: Diffusion-based Discrete Motion Tokenizer Bridging Semantics and Kinematics",
        description: "MoTok proposes a diffusion-based discrete motion tokenizer that factorizes motion representation into compact discrete token sequences and diffusion-based reconstruction decoders. The core insight is: discrete tokens handle high-level semantic abstraction while the diffusion decoder handles fine-grained motion reconstruction. After decoupling, a single-layer codebook achieves high compression rates (SOTA with only 1/6 tokens). For condition injection, MoTok adopts a coarse-to-fine strategy: kinematic conditions act as coarse constraints during the Planning stage to guide token generation, and as fine-grained constraints during the Control stage through optimization guidance in diffusion denoising. This design prevents kinematic details from interfering with semantic token planning. For music-to-dance tasks, MoTok's paradigm can encode audio features as compact semantic tokens for dance motion planning while preserving precise control over specific joint trajectories.",
        keyPoints: [
          "Diffusion-based Tokenizer: Discrete tokens for semantic abstraction, diffusion decoder for fine-grained reconstruction, enabling compact single-layer representation",
          "Coarse-to-Fine Conditioning: Kinematic conditions as coarse constraints in Planning, fine constraints in Control, avoiding interference with semantic planning",
          "Efficient Compression: Achieves lower FID (0.029 vs 0.083) and trajectory error (0.08cm vs 0.72cm) than MaskControl with only 1/6 tokens"
        ],
        href: "https://arxiv.org/abs/2603.19227",
        paperLink: "Bridging Semantic and Kinematic Conditions with Diffusion-based Discrete Motion Tokenizer",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "EffectErase: Joint Video Object Removal and Insertion",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2603.19224",
        description: "Introduces VOR dataset and EffectErase method treating video object insertion as the inverse of removal via reciprocal learning, applicable for dance video background editing and character replacement.",
      },
      {
        num: 5,
        title: "CubiD: Cubic Discrete Diffusion on High-Dimensional Tokens",
        tag: "Discrete Generation",
        href: "https://arxiv.org/abs/2603.19232",
        description: "First discrete generation model for high-dimensional representations (768-1024 dims) with fine-grained masking at any dimension and position, potentially useful for audio-motion joint representation learning.",
      },
      {
        num: 6,
        title: "VEGA-3D: Unleashing Implicit 3D Priors from Video Generation Models",
        tag: "3D Understanding",
        href: "https://arxiv.org/abs/2603.19235",
        description: "Repurposes pre-trained video diffusion models as latent world simulators, extracting spatiotemporal features to enhance MLLM 3D reasoning, applicable for improving spatial consistency in dance motions.",
      },
      {
        num: 7,
        title: "CurveStream: Curvature-Aware Hierarchical Visual Memory",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2603.19571",
        description: "Evaluates real-time semantic intensity via curvature scores and adaptively routes frames to clear/fuzzy memory states, useful for long dance video temporal modeling.",
      },
    ],
    observation: "This week's papers show a clear trend toward 'decoupling': SAMA decouples semantic editing from motion modeling, MoTok decouples semantic abstraction from motion reconstruction, and LumosX decouples identity representation from attribute binding. This decoupled design not only improves specialization of sub-tasks but more importantly enables emergent zero-shot/few-shot capabilities. For music-to-dance tasks, this suggests that separately modeling audio-motion alignment, appearance migration, and temporal consistency before integrating through a unified generation framework may be more effective than end-to-end joint training.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-23`,
        'en': `/en/daily/music-to-dance/2026-03-23`,
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
      date="2026-03-23"
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
