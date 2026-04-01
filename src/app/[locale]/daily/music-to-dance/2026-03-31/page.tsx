import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "视频生成控制、运动适应与多模态对齐的最新进展",
    overview: [
      "TokenDial 提出时空 token 偏移机制，实现视频外观与运动强度的连续滑块控制",
      "MaskAdapt 的两阶段残差学习为运动风格迁移提供可迁移的范式",
      "MM-Dia 数据集为音频-视觉风格一致性评估提供新基准"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成控制",
        title: "TokenDial：通过时空 Token 偏移实现连续属性控制",
        description: "TokenDial 提出在扩散 Transformer 的中间视觉 patch token 空间中添加可学习的偏移向量，实现对视频外观和运动强度的连续滑块式控制。关键创新在于：偏移向量仅引入 0.256% 的可训练参数（远低于 LoRA），却能在保持身份、背景和时序一致性的同时，精确调节属性强度。对于 music-to-dance 任务，该方法可直接迁移用于控制舞蹈动作幅度和风格强度，例如通过调节运动幅度偏移量来生成从柔和到剧烈的舞蹈变体，而无需重新训练主干模型。",
        keyPoints: [
          "在 DiT 的中间视觉 token 空间学习属性特定的偏移向量，参数量仅为 LoRA-r64 的 0.256%",
          "支持外观和运动动力学的连续滑块控制，可调节火焰强度、 aging、运动幅度等属性",
          "通过注意力图导出时空软掩码，实现精确的局部控制（如仅让人物变老而背景不变）",
          "偏移向量可零样本迁移到不同分辨率和帧数的视频"
        ],
        href: "https://arxiv.org/abs/2603.27520",
        paperLink: "TokenDial: Continuous Attribute Control in Text-to-Video via Spatiotemporal Token Offsets"
      },
      {
        num: 2,
        tag: "视频生成综述",
        title: "视频生成模型作为世界模型：高效范式、架构与算法综述",
        description: "这篇综述系统性地梳理了视频生成模型向实时世界模拟器演进过程中的效率优化技术。文章从三个维度建立分类体系：高效建模范式（扩散蒸馏、自回归与混合方法）、高效网络架构（层次化 VAE、长上下文记忆、高效注意力）、高效推理算法（并行化、缓存、剪枝、量化）。对于 music-to-dance 应用，文中讨论的流匹配（Flow Matching）一致性蒸馏和对抗蒸馏技术可直接用于加速舞蹈视频生成；而关于音频条件编码与跨模态注意力融合的讨论，为优化 3D Audio Attention 机制提供了实用指导。",
        keyPoints: [
          "扩散模型蒸馏可将采样步数从 48 步降至 6 步（GPD）甚至单步（Seaweed-APT），实现实时生成",
          "自回归与扩散混合架构（如 VideoPoet、Loong）支持分钟级长视频生成，适用于长舞蹈序列",
          "3D 因果 VAE 和时空联合 tokenization 是压缩视频冗余的关键技术",
          "音频条件通常通过跨注意力或 token 融合机制注入生成主干，与当前 3D Audio Attention 设计呼应"
        ],
        href: "https://arxiv.org/abs/2603.28489",
        paperLink: "Video Generation Models as World Models: Efficient Paradigms, Architectures and Algorithms"
      },
      {
        num: 3,
        tag: "多模态对齐",
        title: "MM-Dia：面向多模态对话生成的细粒度可控数据集",
        description: "MM-Dia 是首个专注于对话表现力的大规模多模态数据集，包含 360+ 小时、54,700 段对话，涵盖语音、视觉和文本三种模态。论文提出「情感三元组」（关系、交互模式、情感基调）的标注范式，以及显式/隐式两种控制方式。对于 music-to-dance 任务，MM-Dia-Bench 评估音频-视觉风格一致性的方法可直接借鉴：当前舞蹈生成模型缺乏对音乐节拍与动作风格一致性的系统评估，而 MM-Dia 提供的跨模态风格一致性评估框架可迁移用于衡量音频节奏与舞蹈动作的对齐质量。",
        keyPoints: [
          "MM-Dia 包含 54,700 段对话、449,138 轮对话、360.26 小时，是目前最大的多模态对话数据集",
          "提出「情感三元组」结构化标注：关系（如朋友、上下级）、交互模式（如调侃、质问）、情感基调",
          "MM-Dia-Bench 包含 309 段高表现力双人对白，专门评估音频-视觉风格一致性",
          "实验发现当前框架在复制人类交互的细微表现力方面存在局限，跨模态风格一致性仍是挑战"
        ],
        href: "https://arxiv.org/abs/2603.29162",
        paperLink: "From Natural Alignment to Conditional Controllability in Multimodal Dialogue"
      },
      {
        num: 4,
        tag: "运动适应",
        title: "MaskAdapt：基于掩码不变先验的灵活运动适应",
        description: "MaskAdapt 提出两阶段残差学习框架用于物理仿真角色的运动适应。第一阶段通过随机身体部位掩码和掩码不变损失训练基础策略，使其在缺失观测时仍能生成稳定动作；第二阶段在冻结的基础策略上训练残差策略，仅修改目标身体部位。该范式对 music-to-dance 的启发在于：可将基础策略视为通用舞蹈先验，通过残差学习针对不同音乐风格或舞者身份进行局部适配，而无需重新训练整个模型。这种「基础+残差」的架构为舞蹈风格迁移和个性化生成提供了可扩展的解决方案。",
        keyPoints: [
          "掩码不变损失（MI Loss）通过 KL 散度约束掩码与完整观测下的动作分布一致性",
          "基础策略在 50% 掩码率下仍能保持 0.9025 的归一化熵（接近无掩码的 0.9124）",
          "残差策略支持动态运动组合（如上半身跳舞+下半身走路）和文本驱动的局部目标跟踪",
          "相比 CML 方法，在保留基础运动和适应新运动两方面均取得更高覆盖率"
        ],
        href: "https://arxiv.org/abs/2603.29272",
        paperLink: "MaskAdapt: Learning Flexible Motion Adaptation via Mask-Invariant Prior for Physics-Based Characters"
      },
      {
        num: 5,
        tag: "手部运动生成",
        title: "HandX：大规模双手交互运动生成基准",
        description: "HandX 构建了 54.2 小时、590 万帧的双手交互运动数据集，包含细粒度文本描述。论文发现当前全身模型往往忽略手部细节，而 HandX 通过光学动捕系统采集高精度手指运动，并提出两阶段自动标注策略（运动特征提取 + LLM 描述生成）。对于 music-to-dance 任务，HandX 填补了一个关键空白：当前舞蹈生成往往缺乏精细手部动作，而 HandX 提供的双手协调和接触感知生成技术可直接用于增强舞蹈视频的手部表现力，使生成的人物能够做出更自然、更具表现力的手势。",
        keyPoints: [
          "HandX 包含 54.2 小时高质量数据，接触比例和接触时长显著高于现有数据集",
          "两阶段标注：先提取接触事件、手指弯曲等运动特征，再用 LLM 生成细粒度描述",
          "基于扩散和自回归的基准模型支持文本驱动、关键帧引导、轨迹控制等多种条件",
          "观察到明显的 scaling 趋势：模型和数据规模增加带来语义一致性和接触精度的持续提升"
        ],
        href: "https://arxiv.org/abs/2603.28766",
        paperLink: "HandX: Scaling Bimanual Motion and Interaction Generation"
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "扩散 Transformer 上下文空间排斥：提升生成多样性",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2603.28762",
        description: "在 DiT 的多模态注意力通道中应用即时排斥，可在不牺牲视觉保真度的前提下显著提升生成多样性，对避免舞蹈生成结果单一化有参考价值。"
      },
      {
        num: 7,
        title: "DreamLite：端侧统一图像生成与编辑模型",
        tag: "高效生成",
        href: "https://arxiv.org/abs/2603.28713",
        description: "0.39B 参数的轻量级扩散模型，通过 4 步蒸馏可在 1 秒内生成 1024×1024 图像，为移动端舞蹈生成应用提供了效率优化思路。"
      },
      {
        num: 8,
        title: "LongCat-Next：将多模态词汇化为离散 Token",
        tag: "多模态统一",
        href: "https://arxiv.org/abs/2603.27538",
        description: "提出 DiNA 框架，将文本、视觉、音频统一在共享离散空间中进行自回归建模，为端到端 audio-dance 联合建模提供了新范式。"
      },
      {
        num: 9,
        title: "AdaptToken：基于熵的自适应 Token 选择",
        tag: "长视频理解",
        href: "https://arxiv.org/abs/2603.28696",
        description: "利用模型响应熵估计视频片段的相关性，实现全局 token 预算分配和提前停止，可优化长舞蹈视频的处理效率。"
      },
      {
        num: 10,
        title: "HumMusQA：人工编写的音乐理解 QA 基准",
        tag: "音乐理解",
        href: "https://arxiv.org/abs/2603.27877",
        description: "320 道专家编写的音乐理解问题，用于评估大型音频语言模型的音乐感知能力，可作为验证 audio-dance 模型音乐理解的参考。"
      },
      {
        num: 11,
        title: "STRIDE：流式视频理解的序列去噪",
        tag: "流式视频",
        href: "https://arxiv.org/abs/2603.27593",
        description: "将主动激活建模为结构化序列问题，支持实时视频流的「何时响应」决策，可迁移到实时舞蹈生成的动作时机预测。"
      }
    ],
    observation: "本周论文呈现出视频生成控制细粒度化的趋势。TokenDial 的时空 token 偏移、MaskAdapt 的掩码不变先验、以及 MM-Dia 的跨模态一致性评估，共同指向一个方向：生成模型需要在保持整体一致性的同时，实现对局部属性（外观、运动、风格）的精确控制。对于 music-to-dance 任务，这意味着未来的模型架构可能需要整合「全局音频-运动对齐」与「局部身体部位控制」两个层面的能力，而残差学习和 token 级干预可能是实现这一目标的关键技术路径。"
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Advances in Video Generation Control, Motion Adaptation, and Multimodal Alignment",
    overview: [
      "TokenDial enables continuous slider control of video appearance and motion via spatiotemporal token offsets",
      "MaskAdapt's two-stage residual learning provides a transferable paradigm for motion style adaptation",
      "MM-Dia dataset offers new benchmarks for audio-visual style consistency evaluation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation Control",
        title: "TokenDial: Continuous Attribute Control via Spatiotemporal Token Offsets",
        description: "TokenDial proposes adding learnable offset vectors to intermediate visual patch tokens in diffusion transformers, enabling continuous slider-style control over video appearance and motion intensity. The key innovation is that offset vectors introduce only 0.256% trainable parameters (far less than LoRA) while precisely adjusting attribute strength without retraining the backbone. For music-to-dance tasks, this method can be directly transferred to control dance motion magnitude and style intensity—generating dance variants from gentle to vigorous by adjusting motion amplitude offsets without retraining the base model.",
        keyPoints: [
          "Learns attribute-specific offset vectors in DiT's intermediate visual token space with only 0.256% parameters of LoRA-r64",
          "Supports continuous slider control for appearance and motion dynamics: fire intensity, aging, motion magnitude",
          "Derives spatiotemporal soft masks from attention maps for precise localized control",
          "Offset vectors transfer zero-shot to videos of different resolutions and frame counts"
        ],
        href: "https://arxiv.org/abs/2603.27520",
        paperLink: "TokenDial: Continuous Attribute Control in Text-to-Video via Spatiotemporal Token Offsets"
      },
      {
        num: 2,
        tag: "Video Generation Survey",
        title: "Video Generation as World Models: Efficiency Survey",
        description: "This survey systematically reviews efficiency optimization techniques for video generation models evolving toward real-time world simulators. It establishes a taxonomy across three dimensions: efficient modeling paradigms (distillation, autoregressive, hybrid), efficient architectures (hierarchical VAE, long-context memory, efficient attention), and efficient inference (parallelism, caching, pruning, quantization). For music-to-dance applications, flow matching consistency distillation and adversarial distillation techniques can directly accelerate dance video generation, while discussions on audio conditioning and cross-modal attention fusion provide practical guidance for optimizing 3D Audio Attention mechanisms.",
        keyPoints: [
          "Diffusion distillation reduces sampling steps from 48 to 6 (GPD) or even single-step (Seaweed-APT) for real-time generation",
          "Autoregressive-diffusion hybrid architectures (VideoPoet, Loong) support minute-level long video generation for long dance sequences",
          "3D causal VAE and spatiotemporal joint tokenization are key to video redundancy compression",
          "Audio conditioning typically injects into generation backbone via cross-attention or token fusion, echoing current 3D Audio Attention design"
        ],
        href: "https://arxiv.org/abs/2603.28489",
        paperLink: "Video Generation Models as World Models: Efficient Paradigms, Architectures and Algorithms"
      },
      {
        num: 3,
        tag: "Multimodal Alignment",
        title: "MM-Dia: Fine-Grained Controllable Multimodal Dialogue Dataset",
        description: "MM-Dia is the first large-scale multimodal dialogue dataset focusing on conversational expressiveness, containing 360+ hours and 54,700 dialogues across speech, vision, and text. The paper proposes 'Affective Triplet' annotation (relationship, interaction mode, emotional tone) and explicit/implicit control paradigms. For music-to-dance tasks, MM-Dia-Bench's audio-visual style consistency evaluation can be directly adapted: current dance generation models lack systematic evaluation of music-dance alignment, and MM-Dia's cross-modal consistency framework can measure the quality of audio rhythm and dance motion alignment.",
        keyPoints: [
          "MM-Dia contains 54,700 dialogues, 449,138 turns, 360.26 hours—largest multimodal dialogue dataset to date",
          "Proposes 'Affective Triplet' structured annotation: relationship, interaction mode, emotional tone",
          "MM-Dia-Bench contains 309 highly expressive dual-speaker dialogues specifically evaluating audio-visual style consistency",
          "Experiments reveal current frameworks' limitations in replicating nuanced human interaction expressiveness"
        ],
        href: "https://arxiv.org/abs/2603.29162",
        paperLink: "From Natural Alignment to Conditional Controllability in Multimodal Dialogue"
      },
      {
        num: 4,
        tag: "Motion Adaptation",
        title: "MaskAdapt: Flexible Motion Adaptation via Mask-Invariant Prior",
        description: "MaskAdapt proposes a two-stage residual learning framework for physics-based character motion adaptation. Stage one trains a base policy with random body-part masking and mask-invariant loss for stable action generation under missing observations. Stage two trains a residual policy atop the frozen base to modify only targeted body parts. The insight for music-to-dance: treat the base policy as a universal dance prior, adapt locally for different music styles or dancer identities via residual learning without retraining the entire model. This 'base+residual' architecture offers a scalable solution for dance style transfer and personalized generation.",
        keyPoints: [
          "Mask-Invariant Loss enforces action distribution consistency between masked and full observations via KL divergence",
          "Base policy maintains 0.9025 normalized entropy at 50% masking rate (close to 0.9124 without masking)",
          "Residual policy supports dynamic motion composition (upper body dancing + lower body walking) and text-driven partial goal tracking",
          "Outperforms CML in both preserving base motion and adapting new motion coverage"
        ],
        href: "https://arxiv.org/abs/2603.29272",
        paperLink: "MaskAdapt: Learning Flexible Motion Adaptation via Mask-Invariant Prior for Physics-Based Characters"
      },
      {
        num: 5,
        tag: "Hand Motion Generation",
        title: "HandX: Scaling Bimanual Motion and Interaction Generation",
        description: "HandX constructs a 54.2-hour, 5.9M-frame bimanual interaction dataset with fine-grained text descriptions. The paper observes that whole-body models often neglect hand details, while HandX captures high-fidelity finger motion via optical mocap and proposes two-stage automatic annotation (motion feature extraction + LLM description generation). For music-to-dance tasks, HandX fills a critical gap: current dance generation often lacks fine hand movements, and HandX's bimanual coordination and contact-aware generation can directly enhance hand expressiveness in dance videos, enabling more natural and expressive gestures.",
        keyPoints: [
          "HandX contains 54.2 hours of high-quality data with significantly higher contact ratio and duration than existing datasets",
          "Two-stage annotation: extract contact events and finger flexion features, then generate fine-grained descriptions with LLM",
          "Benchmark models support text-driven, keyframe-guided, trajectory control, and other versatile conditioning modes",
          "Clear scaling trend observed: increasing model and data size consistently improves semantic consistency and contact accuracy"
        ],
        href: "https://arxiv.org/abs/2603.28766",
        paperLink: "HandX: Scaling Bimanual Motion and Interaction Generation"
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "Contextual Space Repulsion for Diversity in DiT",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2603.28762",
        description: "Applying on-the-fly repulsion in DiT's multimodal attention channels significantly improves generation diversity without sacrificing fidelity, valuable for avoiding repetitive dance generation results."
      },
      {
        num: 7,
        title: "DreamLite: On-Device Unified Image Generation and Editing",
        tag: "Efficient Generation",
        href: "https://arxiv.org/abs/2603.28713",
        description: "0.39B parameter lightweight diffusion model generating 1024×1024 images in 1 second via 4-step distillation, offering efficiency insights for mobile dance generation applications."
      },
      {
        num: 8,
        title: "LongCat-Next: Lexicalizing Modalities as Discrete Tokens",
        tag: "Multimodal Unification",
        href: "https://arxiv.org/abs/2603.27538",
        description: "Proposes DiNA framework unifying text, vision, and audio in shared discrete space for autoregressive modeling, offering a new paradigm for end-to-end audio-dance joint modeling."
      },
      {
        num: 9,
        title: "AdaptToken: Entropy-based Adaptive Token Selection",
        tag: "Long Video Understanding",
        href: "https://arxiv.org/abs/2603.28696",
        description: "Uses model response entropy to estimate video clip relevance, enabling global token budget allocation and early stopping to optimize long dance video processing efficiency."
      },
      {
        num: 10,
        title: "HumMusQA: Human-written Music Understanding QA Benchmark",
        tag: "Music Understanding",
        href: "https://arxiv.org/abs/2603.27877",
        description: "320 expert-written music understanding questions for evaluating large audio language models, useful as reference for validating audio-dance model music comprehension."
      },
      {
        num: 11,
        title: "STRIDE: Sequence Denoising for Streaming Video Understanding",
        tag: "Streaming Video",
        href: "https://arxiv.org/abs/2603.27593",
        description: "Models proactive activation as structured sequence problem supporting real-time video streaming 'when to respond' decisions, transferable to real-time dance generation motion timing prediction."
      }
    ],
    observation: "This week's papers demonstrate a trend toward fine-grained control in video generation. TokenDial's spatiotemporal token offsets, MaskAdapt's mask-invariant prior, and MM-Dia's cross-modal consistency evaluation collectively point in one direction: generative models need to precisely control local attributes (appearance, motion, style) while maintaining global consistency. For music-to-dance tasks, this suggests future architectures may need to integrate both 'global audio-motion alignment' and 'local body-part control' capabilities, with residual learning and token-level intervention as key technical pathways."
  }
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-31`,
        'en': `/en/daily/music-to-dance/2026-03-31`,
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
      date="2026-03-31"
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