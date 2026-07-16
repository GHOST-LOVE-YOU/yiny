import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "原子化舞蹈生成与无骨架运动迁移：结构感知生成的新范式",
    overview: [
      "原子动作表示：将舞蹈分解为语义可解释的原子动作单元，实现结构化的两阶段生成（规划+补全）",
      "无骨架运动迁移：基于光流而非骨骼的运动表示，实现跨物种/跨人物的运动迁移",
      "视频扩散的序列性缺陷：揭示扩散模型在因果链推理上的根本限制，为长视频生成提供改进方向"
    ],
    papers: [
      {
        num: 1,
        tag: "音乐驱动生成",
        title: "基于原子动作的舞蹈生成：结构化两阶段框架",
        description: "本文提出了一种全新的舞蹈生成范式——将舞蹈建模为原子动作（Atomic Movements）的序列组合，而非传统的连续信号回归。作者首先通过分割-聚类-重聚类三阶段流程，从AIST++数据集中提取出100个语义可解释的原子动作原型（平均每个原型包含268个片段），并使用Gemini-2.5-Pro为每个动作生成自然语言描述。基于此，他们设计了两阶段生成框架：第一阶段使用D3PM（离散扩散模型）进行原子动作规划，预测动作类型、时长和时序位置，形成符号化的舞蹈编排；第二阶段使用DDPM生成平滑过渡和动作变体。实验表明，该方法在结构连贯性、节奏对齐度和感知自然度上均显著优于EDGE等基线，同时提供了前所未有的可编辑性——用户可以像编辑乐谱一样修改舞蹈结构。",
        keyPoints: [
          "原子动作定义满足三个标准：清晰的过程性、重复性与变异性、语义可解释性",
          "两阶段生成：D3PM规划器输出符号化舞蹈编排，DDPM补全器生成平滑过渡",
          "LLM辅助的语义重聚类：使用Gemini对动作片段进行细粒度语义标注和聚类"
        ],
        href: "https://arxiv.org/abs/2607.13978",
        paperLink: "Music-to-Dance Generation via Atomic Movements",
      },
      {
        num: 2,
        tag: "音乐驱动生成",
        title: "情感感知的360°音乐视频生成",
        description: "本文提出了一个情感感知的音乐驱动360°视频生成管道。给定输入音乐，系统首先使用Dynamic V-A Regressor预测每四个小节的valence-arousal（愉悦度-唤醒度）情感值，然后通过EmotiCrafter将情感值转换为视觉引导向量，结合SEGA框架实现细粒度的语义控制生成关键帧，最后使用Wan-I2V模型生成动态视频片段。该方法的核心贡献在于将音乐情感轨迹显式建模并映射到视觉生成过程，生成的360°视频可在VR设备中观看。虽然输出形式是全景视频而非舞蹈，但其情感轨迹预测和EmotiCrafter视觉引导方法可直接迁移到舞蹈视频生成中，用于增强舞蹈动作的情感表达。",
        keyPoints: [
          "每四个小节预测V-A情感值，形成音乐的情感轨迹",
          "EmotiCrafter+SEGA实现情感感知的视觉引导生成",
          "Wan-I2V和Wan-flf2v分别生成动态场景和转场片段"
        ],
        href: "https://arxiv.org/abs/2607.13471",
        paperLink: "Bring Music The Horizon: Music-Driven 360° Video Generation",
      },
      {
        num: 3,
        tag: "运动迁移",
        title: "Motion4Motion：无训练跨主体运动迁移",
        description: "本文提出了一种无需训练的运动迁移框架Motion4Motion，突破了传统方法依赖预定义骨骼结构的限制。核心思想是用像素级运动流（Motion Flow）而非骨架来表示运动，通过TransPE（Transformer Positional Encoding）模块将源视频的运动流注入目标主体的生成过程。具体流程包括：1）使用Grounded SAM-2在源主体上采样锚点；2）通过语义匹配建立源主体与目标主体之间的跨图像对应；3）在源视频中跟踪锚点轨迹构建运动流；4）在WAN-T2V的扩散Transformer中通过注意力操控注入运动流。该方法完全在推理阶段实现，无需任何微调，支持跨物种迁移（如人→熊猫、人→鹅），在真实图像和生成图像上均取得了高质量的运动迁移效果。",
        keyPoints: [
          "基于光流的运动表示，摆脱对预定义骨架的依赖",
          "TransPE模块通过3D RoPE位置编码操控实现运动注入",
          "完全无训练，仅通过注意力操控在推理阶段完成迁移"
        ],
        href: "https://arxiv.org/abs/2607.11644",
        paperLink: "Motion4Motion: Motion Transfer Across Subjects at Inference",
      },
      {
        num: 4,
        tag: "视频生成理论",
        title: "视频扩散模型的序列性缺陷（Seriality Gap）",
        description: "本文通过硬球动力学实验，揭示了标准双向视频扩散模型在因果链推理上的根本限制。研究发现，当需要预测的依赖事件链增长时（多球碰撞场景），模型性能显著下降，而这种下降在单球控制场景中几乎消失，证明问题源于序列复杂性而非视频长度。关键理论发现：对于确定性视频预测，去噪步骤本身不提供超出主干网络的额外串行计算能力——这意味着单纯增加去噪步数无法解决长程因果推理问题。实验表明，增加网络深度或采用自回归/分块生成等增加有效串行计算的方法才能改善性能。这一发现对基于扩散的舞蹈视频生成具有重要指导意义：当前方案在生成长舞蹈序列时可能遇到类似的因果一致性瓶颈，需要考虑架构层面的改进（如更深的网络或自回归因子化）而非仅仅增加扩散步数。",
        keyPoints: [
          "双向扩散在因果链增长时性能下降，去噪步数增加无法解决",
          "增加有效串行计算（深度、自回归）才能改善依赖事件预测",
          "理论证明：去噪步骤不提供超出主干网络的额外串行计算"
        ],
        href: "https://arxiv.org/abs/2607.13031",
        paperLink: "The Seriality Gap in Video Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Kaleido：利用潜在空间相关性加速视频扩散Transformer",
        tag: "加速",
        href: "https://arxiv.org/abs/2607.13770",
        description: "算法-硬件协同设计，通过通道级时空相关性重用实现5.9倍加速和16倍能耗节省，对优化舞蹈视频生成推理速度有参考价值。",
      },
      {
        num: 6,
        title: "FlowWAM：光流作为统一的动作表示",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2607.13017",
        description: "将光流作为视频原生的动作表示，用于世界动作模型中的动作预测和视频生成引导，可为舞蹈动作的中间表示提供新思路。",
      },
      {
        num: 7,
        title: "ChunkFlow：连续性一致的分块策略学习",
        tag: "机器人",
        href: "https://arxiv.org/abs/2607.12992",
        description: "解决分块动作生成中的边界抖动问题，通过缝感知训练和连续性损失实现平滑过渡，可应用于长舞蹈视频生成。",
      },
      {
        num: 8,
        title: "RINO：让RGB成为视觉的语言",
        tag: "统一表示",
        href: "https://arxiv.org/abs/2607.12450",
        description: "将掩码、深度图等视觉信息统一表示为RGB图像，实现RGB-to-RGB的通用视觉任务处理，可简化舞蹈生成的多条件输入处理。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的趋势：一是舞蹈生成正从端到端黑盒模型向结构化、可解释的符号化方法演进（Atomic Movements），这与音乐理论中\"乐句-音符\"的层级结构相呼应；二是运动表示正在摆脱对人体骨架的依赖，转向更通用的像素级光流表示（Motion4Motion、FlowWAM），这为跨物种、跨风格的运动迁移打开了新可能。对于当前基于扩散的舞蹈视频生成方案，建议关注序列性缺陷问题——在生成长舞蹈视频时，可能需要引入自回归或分块生成机制来保证长程因果一致性，而非单纯增加扩散步数。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Atomic Dance Generation & Skeleton-Free Motion Transfer: A New Paradigm for Structure-Aware Generation",
    overview: [
      "Atomic action representation: Decomposing dance into semantically interpretable atomic movement units for structured two-stage generation (planning + completion)",
      "Skeleton-free motion transfer: Flow-based motion representation enabling cross-subject/cross-species motion transfer without skeletal constraints",
      "Seriality gap in video diffusion: Revealing fundamental limitations of diffusion models in causal chain reasoning, providing directions for long video generation improvements"
    ],
    papers: [
      {
        num: 1,
        tag: "Music-Driven Generation",
        title: "Atomic Movement-Based Dance Generation: A Structured Two-Stage Framework",
        description: "This paper proposes a novel paradigm for dance generation—modeling dance as a sequential composition of atomic movements rather than traditional continuous signal regression. The authors first extract 100 semantically interpretable atomic movement prototypes from the AIST++ dataset through a three-stage pipeline (segmentation-clustering-re-clustering), with Gemini-2.5-Pro generating natural language descriptions for each movement. Based on this, they design a two-stage generation framework: Stage 1 uses D3PM (Discrete Denoising Diffusion Probabilistic Model) for atomic movement planning, predicting movement types, durations, and temporal positions to form a symbolic dance score; Stage 2 uses DDPM to generate smooth transitions and movement variations. Experiments show the method significantly outperforms baselines like EDGE in structural coherence, rhythmic alignment, and perceptual naturalness, while providing unprecedented editability—users can modify dance structure like editing a musical score.",
        keyPoints: [
          "Atomic movements satisfy three criteria: clear process, repetition with variation, and semantic interpretability",
          "Two-stage generation: D3PM planner outputs symbolic dance scores, DDPM completion generates smooth transitions",
          "LLM-assisted semantic re-clustering: Using Gemini for fine-grained semantic annotation and clustering of movement segments"
        ],
        href: "https://arxiv.org/abs/2607.13978",
        paperLink: "Music-to-Dance Generation via Atomic Movements",
      },
      {
        num: 2,
        tag: "Music-Driven Generation",
        title: "Emotion-Aware 360° Music Video Generation",
        description: "This paper presents an emotion-aware pipeline for music-driven 360° video generation. Given input music, the system first predicts valence-arousal emotion values for every four bars using a Dynamic V-A Regressor, then converts these values into visual guidance vectors through EmotiCrafter. Combined with the SEGA framework for fine-grained semantic control, keyframes are generated and finally animated using Wan-I2V models. While the output is panoramic video rather than dance, the emotion trajectory prediction and EmotiCrafter visual guidance methods can be directly transferred to dance video generation for enhanced emotional expression.",
        keyPoints: [
          "Predicts V-A emotion values every four bars to form the music's emotional trajectory",
          "EmotiCrafter+SEGA enables emotion-aware visual guidance generation",
          "Wan-I2V and Wan-flf2v generate dynamic scenes and transition clips respectively"
        ],
        href: "https://arxiv.org/abs/2607.13471",
        paperLink: "Bring Music The Horizon: Music-Driven 360° Video Generation",
      },
      {
        num: 3,
        tag: "Motion Transfer",
        title: "Motion4Motion: Training-Free Cross-Subject Motion Transfer",
        description: "This paper proposes Motion4Motion, a training-free motion transfer framework that breaks through the limitation of traditional methods relying on predefined skeletal structures. The core idea is to represent motion using pixel-level motion flow rather than skeletons, injecting source video motion flow into the target subject's generation process through the TransPE module. The pipeline includes: 1) sampling anchor points on the source subject using Grounded SAM-2; 2) establishing cross-image correspondence through semantic matching; 3) tracking anchor trajectories to build motion flow; 4) injecting motion flow through attention manipulation in WAN-T2V's diffusion Transformer. The method is completely inference-time, requires no fine-tuning, and supports cross-species transfer (e.g., human→panda, human→goose).",
        keyPoints: [
          "Flow-based motion representation eliminates dependency on predefined skeletons",
          "TransPE module achieves motion injection through 3D RoPE positional encoding manipulation",
          "Completely training-free, accomplished solely through attention manipulation at inference"
        ],
        href: "https://arxiv.org/abs/2607.11644",
        paperLink: "Motion4Motion: Motion Transfer Across Subjects at Inference",
      },
      {
        num: 4,
        tag: "Video Generation Theory",
        title: "The Seriality Gap in Video Diffusion Models",
        description: "Through hard-sphere dynamics experiments, this paper reveals fundamental limitations of standard bidirectional video diffusion models in causal chain reasoning. The study finds that model performance significantly degrades as the chain of dependent events grows (multi-ball collision scenarios), while this degradation almost disappears in single-ball control scenarios, proving the issue stems from serial complexity rather than video length. Key theoretical finding: for deterministic video prediction, denoising steps themselves do not provide additional serial computation beyond the backbone network—meaning simply increasing denoising steps cannot solve long-range causal reasoning. This has important implications for diffusion-based dance video generation: current approaches may encounter similar causal consistency bottlenecks when generating long dance sequences, requiring architectural improvements (deeper networks or autoregressive factorization) rather than just more diffusion steps.",
        keyPoints: [
          "Bidirectional diffusion degrades as causal chains lengthen; increasing denoising steps cannot solve this",
          "Increasing effective serial computation (depth, autoregression) improves dependent event prediction",
          "Theoretical proof: denoising steps do not provide serial computation beyond the backbone network"
        ],
        href: "https://arxiv.org/abs/2607.13031",
        paperLink: "The Seriality Gap in Video Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Kaleido: Accelerating Video Diffusion Transformers via Latent Space Correlations",
        tag: "Acceleration",
        href: "https://arxiv.org/abs/2607.13770",
        description: "Algorithm-hardware co-design achieving 5.9x speedup and 16x energy savings through channel-wise spatiotemporal correlation reuse, valuable for optimizing dance video generation inference speed.",
      },
      {
        num: 6,
        title: "FlowWAM: Optical Flow as Unified Action Representation",
        tag: "World Models",
        href: "https://arxiv.org/abs/2607.13017",
        description: "Using optical flow as a video-native action representation for action prediction and video generation guidance in world action models, offering new ideas for intermediate dance motion representation.",
      },
      {
        num: 7,
        title: "ChunkFlow: Continuity-Consistent Chunked Policy Learning",
        tag: "Robotics",
        href: "https://arxiv.org/abs/2607.12992",
        description: "Addressing boundary jitter in chunked action generation through seam-aware training and continuity losses, applicable to long dance video generation.",
      },
      {
        num: 8,
        title: "RINO: Let RGB Be the Language of Vision",
        tag: "Unified Representation",
        href: "https://arxiv.org/abs/2607.12450",
        description: "Unifying visual information (masks, depth maps) as RGB images for generic RGB-to-RGB visual task processing, simplifying multi-condition input handling for dance generation.",
      },
    ],
    observation: "Today's papers reveal two notable trends: First, dance generation is evolving from end-to-end black-box models toward structured, interpretable symbolic methods (Atomic Movements), echoing the hierarchical structure of \"phrases-notes\" in music theory. Second, motion representation is moving away from human skeleton dependencies toward more generic pixel-level flow representations (Motion4Motion, FlowWAM), opening new possibilities for cross-species, cross-style motion transfer. For current diffusion-based dance video generation approaches, attention should be paid to the seriality gap issue—when generating long dance videos, autoregressive or chunked generation mechanisms may be needed to ensure long-range causal consistency, rather than simply increasing diffusion steps.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-15`,
        'en': `/en/daily/music-to-dance/2026-07-15`,
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
      date="2026-07-15"
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
