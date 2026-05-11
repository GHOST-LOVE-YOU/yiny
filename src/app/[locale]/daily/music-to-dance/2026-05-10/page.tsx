import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-05-10 | 高分辨率视频生成与评估新范式",
    overview: [
      "SwiftI2V 提出 CSG 分段生成机制，实现 202x 效率提升的 2K 视频生成",
      "Sparkle 通过前景-背景解耦引导解决视频背景替换中的结构坍塌问题",
      "Relit-LiVE 联合学习环境视频，无需相机位姿即可实现物理一致的重光照",
      "DeScore 提出解耦推理-评分范式，为视频质量评估提供可解释的新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "高分辨率 I2V",
        title: "SwiftI2V: 基于条件分段生成的高效高分辨率图生视频",
        description: "SwiftI2V 针对 2K 分辨率图生视频的效率-保真度困境，提出两阶段框架：第一阶段用低分辨率生成运动参考，第二阶段通过 Conditional Segment-wise Generation (CSG) 进行高分辨率细节建模。CSG 将时序划分为有界分段，每段内采用双向上下文交互，既控制每步 token 预算又避免自回归误差累积。在 VBench-I2V 2K 评测上，SwiftI2V 在保持与端到端基线相当性能的同时，将总 GPU 时间降低 202 倍，可在单张 RTX 4090 上实现实用级 2K 视频生成。对于 music-to-dance 任务，CSG 的分段生成策略可直接迁移用于长舞蹈视频的流式生成，解决高分辨率下显存爆炸问题；双向上下文交互机制也可用于跨片段的舞蹈动作连贯性保持。",
        keyPoints: [
          "Conditional Segment-wise Generation (CSG): 分段生成 + 双向上下文交互，平衡显存与连贯性",
          "202x GPU 时间缩减: 2K 生成可在 RTX 4090 上运行",
          "阶段过渡训练策略: 向第二阶段注入第一阶段 artifacts，降低级联训练-测试差距"
        ],
        href: "https://arxiv.org/abs/2605.06356",
        paperLink: "SwiftI2V: Efficient High-Resolution Image-to-Video Generation via Conditional Segment-wise Generation",
      },
      {
        num: 2,
        tag: "视频编辑",
        title: "Sparkle: 通过解耦引导实现生动的指令驱动视频背景替换",
        description: "Sparkle 针对视频背景替换任务中背景结构坍塌、运动缺失的问题，提出解耦引导数据合成 pipeline。核心创新包括：独立背景生成（先提取纯净背景图像再用 I2V 模型动画化）、BAIT 高精度前景跟踪（两阶段稀疏锚点+多轮 SAM3 跟踪+像素投票）、以及解耦的前景/背景 Canny 边缘引导合成。基于该 pipeline 构建的 140K 视频对数据集 Sparkle 和评测基准 Sparkle-Bench，在背景替换质量上显著超越 OpenVE-3M。对于 music-to-dance，前景-背景解耦策略可用于分离舞者主体与舞台背景，实现更灵活的背景替换；BAIT 的高精度跟踪技术可直接用于舞蹈动作序列的时序一致性保持。",
        keyPoints: [
          "解耦引导合成: 独立生成前景和背景引导，避免背景结构坍塌",
          "BAIT 跟踪算法: 稀疏锚点+多轮 SAM3 跟踪+像素投票，解决实体丢失问题",
          "140K 高质量数据集: 覆盖 5 大主题 21 个子主题，支持背景替换模型训练"
        ],
        href: "https://arxiv.org/abs/2605.06535",
        paperLink: "Sparkle: Realizing Lively Instruction-Guided Video Background Replacement via Decoupled Guidance",
      },
      {
        num: 3,
        tag: "视频重光照",
        title: "Relit-LiVE: 联合学习环境视频实现物理一致的视频重光照",
        description: "Relit-LiVE 提出无需相机位姿先验的视频重光照框架，核心创新是 RGB-Intrinsic 融合渲染器和环境视频联合预测。前者将原始 RGB 帧引入渲染过程，补充 intrinsic 分解中丢失的全局光照信息；后者在单次扩散过程中同时生成重光照视频和每帧环境贴图，通过隐式推断光照变换消除对显式位姿估计的依赖。此外，潜在空间插值和循环一致自监督光照学习策略增强了模型对复杂场景的泛化能力。对于 music-to-dance 任务，环境视频联合学习机制可迁移用于音频-动作对齐，将音频节拍隐式编码为动作变换；RGB-Intrinsic 融合思路也可用于舞蹈视频的外观保持与动作生成解耦。",
        keyPoints: [
          "RGB-Intrinsic 融合渲染: 结合原始 RGB 与物理约束，恢复复杂全局光照效果",
          "环境视频联合预测: 单次推理同时生成重光照视频和每帧环境贴图，无需相机位姿",
          "循环一致自监督学习: 无需额外标注即可保证时序光照连贯性"
        ],
        href: "https://arxiv.org/abs/2605.06658",
        paperLink: "Relit-LiVE: Relight Video by Jointly Learning Environment Video",
      },
      {
        num: 4,
        tag: "视频奖励模型",
        title: "DeScore: 解耦推理与评分的视频奖励模型",
        description: "DeScore 针对视频奖励模型的两难困境——判别式模型缺乏显式推理易陷入捷径学习，生成式模型耦合推理与评分导致训练不稳定——提出解耦的「先思考后评分」范式。模型首先用 MLLM 生成 Chain-of-Thought (CoT) 推理，然后通过可学习的 Query Token 和回归头进行判别式评分。两阶段训练框架包括：带随机掩码的判别式冷启动（确保评分模块同时利用多模态输入和 CoT）和双目标强化学习（GRPO 优化 CoT 质量 + BT 损失校准评分）。实验表明 DeScore 在域内和 OOD 基准上均优于 SOTA，且训练更稳定高效。对于 music-to-dance，DeScore 的解耦范式可用于构建舞蹈质量评估器，CoT 推理可显式评估节拍对齐、动作流畅度等维度；随机掩码机制也有助于评估器不过度依赖文本描述而关注真实视觉内容。",
        keyPoints: [
          "解耦推理-评分: MLLM 生成 CoT + 判别式评分模块，兼顾可解释性与训练稳定性",
          "随机掩码冷启动: 防止评分模块过度依赖 CoT，保持对原始视觉特征的敏感性",
          "双目标 RL: GRPO 优化推理质量 + BT 损失校准评分，隔离高方差策略更新"
        ],
        href: "https://arxiv.org/abs/2605.05922",
        paperLink: "Think, then Score: Decoupled Reasoning and Scoring for Video Reward Modeling",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "PersonaGesture: 单参考语音手势个性化",
        tag: "音频驱动生成",
        href: "https://arxiv.org/abs/2605.06064",
        description: "针对未见说话人的单参考语音手势生成，提出自适应风格注入 (ASI) 和隐式分布校正 (IDR) 机制。音频-动作对齐思路可借鉴用于舞蹈生成。",
      },
      {
        num: 6,
        title: "连续时间分布匹配用于少步扩散蒸馏",
        tag: "扩散加速",
        href: "https://arxiv.org/abs/2605.06376",
        description: "CDM 将 DMD 从离散锚点扩展到连续优化，通过动态连续调度和离轨匹配目标提升少步生成质量。可用于加速舞蹈视频扩散模型推理。",
      },
      {
        num: 7,
        title: "PianoCoRe: 大规模钢琴 MIDI 数据集",
        tag: "音乐数据集",
        href: "https://arxiv.org/abs/2605.06627",
        description: "25万+演奏、2.1万小时音乐数据，提供音符级对齐。可作为 music-to-dance 音频特征学习的预训练数据源。",
      },
    ],
    observation: "今日论文呈现出视频生成领域向高分辨率、物理一致性和可解释评估发展的趋势。SwiftI2V 的 CSG 机制为长视频流式生成提供了新思路，Relit-LiVE 的环境视频联合学习则为条件生成中的隐式对齐建模提供了参考。对于 music-to-dance 任务，这些技术可组合应用：CSG 用于高分辨率长舞蹈视频的分段生成，环境视频联合学习用于音频-动作隐式对齐，DeScore 的解耦评估范式用于舞蹈质量的多维度评价。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-05-10 | High-Res Video Generation & Evaluation Paradigms",
    overview: [
      "SwiftI2V proposes CSG segment-wise generation achieving 202x speedup for 2K video synthesis",
      "Sparkle solves background structural collapse via decoupled foreground/background guidance",
      "Relit-LiVE jointly learns environment video for pose-free physically consistent relighting",
      "DeScore introduces decoupled reasoning-scoring paradigm for interpretable video evaluation"
    ],
    papers: [
      {
        num: 1,
        tag: "High-Res I2V",
        title: "SwiftI2V: Efficient 2K Image-to-Video via Conditional Segment-wise Generation",
        description: "SwiftI2V addresses the efficiency-fidelity dilemma in 2K image-to-video generation through a two-stage framework: low-resolution motion reference generation followed by high-resolution detail modeling via Conditional Segment-wise Generation (CSG). CSG partitions the temporal sequence into bounded segments with bidirectional contextual interaction, controlling per-step token budgets while avoiding autoregressive error accumulation. On VBench-I2V at 2K resolution, SwiftI2V matches end-to-end baseline performance while reducing total GPU-time by 202x, enabling practical 2K generation on a single RTX 4090. For music-to-dance, CSG's segment-wise strategy can be directly adapted for streaming generation of long dance videos, addressing memory explosion at high resolutions; bidirectional contextual interaction can also maintain motion coherence across segments.",
        keyPoints: [
          "Conditional Segment-wise Generation (CSG): Segment-wise generation + bidirectional context interaction balancing memory and coherence",
          "202x GPU-time reduction: 2K generation feasible on RTX 4090",
          "Stage-transition training: Injecting Stage I artifacts into Stage II reduces train-test gap"
        ],
        href: "https://arxiv.org/abs/2605.06356",
        paperLink: "SwiftI2V: Efficient High-Resolution Image-to-Video Generation via Conditional Segment-wise Generation",
      },
      {
        num: 2,
        tag: "Video Editing",
        title: "Sparkle: Lively Background Replacement via Decoupled Guidance",
        description: "Sparkle tackles background structural collapse and motion loss in video background replacement through a decoupled guidance data synthesis pipeline. Key innovations include: independent background generation (extracting clean background images then animating with I2V), BAIT high-precision foreground tracking (two-stage sparse anchors + multi-pass SAM3 tracking + pixel voting), and decoupled foreground/background Canny edge guidance. The 140K video pair dataset Sparkle and benchmark Sparkle-Bench significantly surpass OpenVE-3M in background replacement quality. For music-to-dance, the foreground-background decoupling strategy can separate dancer subjects from stage backgrounds for flexible replacement; BAIT's high-precision tracking directly applies to temporal consistency in dance motion sequences.",
        keyPoints: [
          "Decoupled guidance synthesis: Independent foreground and background guidance preventing structural collapse",
          "BAIT tracking: Sparse anchors + multi-pass SAM3 + pixel voting solving entity loss",
          "140K high-quality dataset: Covering 5 themes and 21 sub-themes for background replacement training"
        ],
        href: "https://arxiv.org/abs/2605.06535",
        paperLink: "Sparkle: Realizing Lively Instruction-Guided Video Background Replacement via Decoupled Guidance",
      },
      {
        num: 3,
        tag: "Video Relighting",
        title: "Relit-LiVE: Pose-Free Relighting via Joint Environment Video Learning",
        description: "Relit-LiVE proposes a pose-free video relighting framework with two core innovations: RGB-Intrinsic fusion renderer and joint environment video prediction. The former incorporates raw RGB frames into rendering to supplement global illumination lost in intrinsic decomposition; the latter generates both relit videos and per-frame environment maps in a single diffusion pass, eliminating explicit pose estimation by implicitly inferring lighting transformations. Latent-space interpolation and cycle-consistent self-supervised illumination learning enhance generalization. For music-to-dance, the environment video joint learning mechanism can be adapted for audio-motion alignment by implicitly encoding audio beats as motion transformations; RGB-Intrinsic fusion can also decouple appearance preservation from motion generation.",
        keyPoints: [
          "RGB-Intrinsic fusion renderer: Combining raw RGB with physical constraints to recover complex global illumination",
          "Joint environment video prediction: Single-pass generation of relit video and per-frame environment maps without camera poses",
          "Cycle-consistent self-supervised learning: Temporal lighting coherence without additional annotations"
        ],
        href: "https://arxiv.org/abs/2605.06658",
        paperLink: "Relit-LiVE: Relight Video by Jointly Learning Environment Video",
      },
      {
        num: 4,
        tag: "Video Reward Model",
        title: "DeScore: Decoupled Reasoning and Scoring for Video Evaluation",
        description: "DeScore addresses the dilemma in video reward models—discriminative models lack explicit reasoning prone to shortcut learning, while generative models couple reasoning and scoring causing training instability—through a decoupled 'think-then-score' paradigm. The model first generates Chain-of-Thought (CoT) reasoning with MLLM, then performs discriminative scoring via a learnable Query Token and regression head. The two-stage training includes: discriminative cold-start with random masking (ensuring the scoring module uses both multimodal inputs and CoT) and dual-objective RL (GRPO for CoT quality + BT loss for reward calibration). Experiments show DeScore outperforms SOTA on in-domain and OOD benchmarks with more stable training. For music-to-dance, DeScore's decoupled paradigm can build dance quality evaluators with CoT explicitly assessing beat alignment, motion fluency, etc.; random masking also prevents over-reliance on text descriptions.",
        keyPoints: [
          "Decoupled reasoning-scoring: MLLM CoT generation + discriminative scoring for interpretability and stability",
          "Random masking cold-start: Preventing over-reliance on CoT, maintaining sensitivity to raw visual features",
          "Dual-objective RL: GRPO for reasoning quality + BT loss for reward calibration, isolating high-variance updates"
        ],
        href: "https://arxiv.org/abs/2605.05922",
        paperLink: "Think, then Score: Decoupled Reasoning and Scoring for Video Reward Modeling",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "PersonaGesture: Single-Reference Co-Speech Gesture Personalization",
        tag: "Audio-Driven Generation",
        href: "https://arxiv.org/abs/2605.06064",
        description: "Single-reference gesture generation for unseen speakers using Adaptive Style Infusion (ASI) and Implicit Distribution Rectification (IDR). Audio-motion alignment insights applicable to dance generation.",
      },
      {
        num: 6,
        title: "Continuous-Time Distribution Matching for Diffusion Distillation",
        tag: "Diffusion Acceleration",
        href: "https://arxiv.org/abs/2605.06376",
        description: "CDM extends DMD from discrete to continuous optimization via dynamic scheduling and off-trajectory matching. Can accelerate dance video diffusion model inference.",
      },
      {
        num: 7,
        title: "PianoCoRe: Large-Scale Piano MIDI Dataset",
        tag: "Music Dataset",
        href: "https://arxiv.org/abs/2605.06627",
        description: "250K+ performances, 21K hours with note-level alignment. Suitable as pretraining data for music-to-dance audio feature learning.",
      },
    ],
    observation: "Today's papers reflect trends toward high-resolution synthesis, physical consistency, and interpretable evaluation in video generation. SwiftI2V's CSG mechanism enables streaming generation for long videos, while Relit-LiVE's environment video joint learning provides reference for implicit alignment modeling. For music-to-dance, these techniques can be combined: CSG for segmented generation of high-res long dance videos, environment video learning for implicit audio-motion alignment, and DeScore's decoupled evaluation for multi-dimensional dance quality assessment.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-10`,
        'en': `/en/daily/music-to-dance/2026-05-10`,
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
      date="2026-05-10"
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