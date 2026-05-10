import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-05-09 | 高分辨率生成与个性化技术的新进展",
    overview: [
      "本周重点关注高分辨率视频生成与个性化技术的突破",
      "SwiftI2V 实现 202 倍效率提升的高分辨率 I2V 生成",
      "PersonaGesture 提出单参考音频驱动动作个性化新方法",
      "Relit-LiVE 的环境视频联合预测为条件生成提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "高分辨率 I2V",
        title: "SwiftI2V: 基于条件分段生成的高效高分辨率图生视频",
        description: "SwiftI2V 针对 2K 分辨率图生视频（I2V）的效率-保真度困境，提出了一种创新的两阶段框架。第一阶段使用大容量 DiT 在低分辨率（360P）生成运动参考，大幅降低 token 数量；第二阶段通过 Conditional Segment-wise Generation (CSG) 策略，将高分辨率视频分段生成，每段使用双向上下文交互保持跨段连贯性。关键创新在于 Stage-Transition Training：通过向低分辨率真值添加噪声并用 Stage I 模型去噪，合成带有 Stage I 风格伪影的训练输入，有效弥合级联管道的训练-测试差距。在 VBench-I2V 2K 分辨率评测中，SwiftI2V 在 I2V Background 指标达到 0.9975（最优），总 GPU 时间比端到端基线降低 202 倍，可在单张 RTX 4090 上实现实用级 2K I2V 生成。对于 music-to-dance 任务，CSG 的分段生成策略可直接迁移用于长舞蹈视频生成，解决当前方案在处理长序列时的内存瓶颈问题。",
        keyPoints: [
          "Conditional Segment-wise Generation (CSG): 将时序划分为有界分段，每段包含 M 个噪声块和 N 个邻居块，通过双向注意力交互控制每步 token 预算",
          "Stage-Transition Training: 合成 Stage I 风格伪影的低分辨率输入训练 Stage II，消除级联管道的训练-测试不匹配",
          "混合参考构建: 将 Stage I 上采样结果的首帧替换为输入图像，作为 Stage II 的显式外观锚点"
        ],
        href: "https://arxiv.org/abs/2605.06356",
        paperLink: "SwiftI2V: Efficient High-Resolution Image-to-Video Generation via Conditional Segment-wise Generation",
      },
      {
        num: 2,
        tag: "音频驱动动作",
        title: "PersonaGesture: 面向未见说话人的单参考协同语音手势个性化",
        description: "PersonaGesture 解决了单参考音频驱动动作生成的个性化难题：给定目标语音和一段新说话人的动作片段，生成跟随新语音且保持说话人特定姿态风格的手势。核心挑战在于参考片段混合了稳定的说话人习惯与特定语句的轨迹，直接使用会导致复制而非泛化。论文提出两个关键组件：Adaptive Style Infusion (ASI) 通过零初始化的残差交叉注意力将 Style Perceiver 提取的说话人记忆 token 注入去噪过程，影响时机、幅度和运动空间决策；Implicit Distribution Rectification (IDR) 在去噪后应用长度感知的对角仿射映射，基于参考片段的通道级矩统计进行保守修正。基于 Wasserstein-2 最优传输的分析表明，对角高斯假设下的最优传输映射正是 IDR 使用的仿射变换。在 BEAT2 和 ZeroEGGS 上的实验表明，PersonaGesture 在未见说话人上的 FGD 达到 0.371，显著优于 LoRA-TTA 和全序列参考注意力基线。",
        keyPoints: [
          "ASI: 零初始化残差交叉注意力注入说话人记忆，保持预训练语音-动作先验的同时实现风格控制",
          "IDR: 基于 W2 最优传输理论的长度感知矩修正，短参考自动减弱修正强度避免过拟合",
          "Style Perceiver: 使用可学习查询 token 和对比学习将变长参考编码为固定数量的说话人记忆"
        ],
        href: "https://arxiv.org/abs/2605.06064",
        paperLink: "PersonaGesture: Single-Reference Co-Speech Gesture Personalization for Unseen Speakers",
      },
      {
        num: 3,
        tag: "视频重光照",
        title: "Relit-LiVE: 通过联合学习环境视频实现视频重光照",
        description: "Relit-LiVE 提出了一种无需相机位姿先验的视频重光照框架，通过联合生成重光照视频和每帧环境视频（warped environment maps）解决复杂光照条件下的物理一致性问题。核心创新是 RGB-Intrinsic 融合渲染器：利用原始 RGB 帧指导渲染过程，弥补内在分解在复杂光照（透明物体、次表面散射）下的信息损失。环境视频预测将光照变换隐式推断，消除了对显式位姿估计的需求。训练策略包括：潜在空间插值合成多样化多光照数据，以及循环一致的自监督光照学习确保时序光照连贯性。在合成和真实世界基准上的实验表明，Relit-LiVE 在物理一致性和时序稳定性上显著优于现有方法。对于 music-to-dance 任务，RGB-Intrinsic 融合的思想可借鉴用于分离人物外观与场景光照，实现更灵活的背景替换和光照控制；环境视频联合预测方法可为音频条件生成提供新思路。",
        keyPoints: [
          "RGB-Intrinsic 融合渲染: 原始 RGB 帧与内在属性（albedo、normal、depth、roughness、metallic）融合，保留真实光照效果",
          "环境视频联合预测: 单一路径同时生成重光照视频和每帧环境贴图，隐式推断光照变换",
          "循环一致自监督学习: 无需额外标注的时序光照连贯性约束"
        ],
        href: "https://arxiv.org/abs/2605.06658",
        paperLink: "Relit-LiVE: Relight Video by Jointly Learning Environment Video",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Sparkle: 基于解耦引导的指令引导视频背景替换",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2605.06535",
        description: "提出可扩展的前景-背景解耦数据合成管道，解决背景替换任务中背景引导不足导致的质量问题。其解耦合成策略可借鉴用于舞蹈人物与背景的分离控制。",
      },
      {
        num: 5,
        title: "连续时间分布匹配用于少步扩散蒸馏",
        tag: "扩散加速",
        href: "https://arxiv.org/abs/2605.06376",
        description: "将 DMD 从离散锚点扩展到连续优化，通过动态连续调度和离轨迹主动匹配提升少步生成质量。对实时舞蹈视频生成的推理加速有潜在价值。",
      },
      {
        num: 6,
        title: "DeScore: 解耦推理与评分的视频奖励模型",
        tag: "视频评估",
        href: "https://arxiv.org/abs/2605.05922",
        description: "提出「先思考再评分」的范式，MLLM 生成显式思维链后由判别式模块预测奖励。可作为舞蹈视频质量评估的反馈信号用于后训练优化。",
      },
      {
        num: 7,
        title: "PianoCoRe: 统一与精炼的钢琴 MIDI 数据集",
        tag: "音乐数据",
        href: "https://arxiv.org/abs/2605.06627",
        description: "25 万表演、5625 首曲目、483 位作曲家的钢琴 MIDI 数据集，包含音符级对齐。可用于训练更精确的音频特征提取器，提升音乐节拍检测精度。",
      },
    ],
    observation: "本周论文呈现出视频生成领域向高效高分辨率化和个性化方向的明显趋势。SwiftI2V 的 CSG 策略为长序列生成提供了可扩展的解决方案，其核心思想——分段生成配合双向上下文交互——可直接应用于 music-to-dance 的长舞蹈视频生成场景。PersonaGesture 的 ASI+IDR 框架展示了如何在保持预训练先验的同时实现细粒度个性化，其长度感知的保守修正策略对单参考舞蹈风格迁移具有直接借鉴意义。Relit-LiVE 的 RGB-Intrinsic 融合渲染则提示我们，在人物视频生成中显式建模外观-光照分离可能带来更高的可控性。这三项技术从效率、个性化和可控性三个维度，为下一代 music-to-dance 系统提供了可组合的技术模块。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-05-09 | Advances in High-Resolution Generation and Personalization",
    overview: [
      "This week focuses on breakthroughs in high-resolution video generation and personalization",
      "SwiftI2V achieves 202× efficiency improvement for high-resolution I2V generation",
      "PersonaGesture proposes a new approach for single-reference audio-driven motion personalization",
      "Relit-LiVE's joint environment video prediction offers new insights for conditional generation"
    ],
    papers: [
      {
        num: 1,
        tag: "High-Res I2V",
        title: "SwiftI2V: Efficient High-Resolution Image-to-Video via Conditional Segment-wise Generation",
        description: "SwiftI2V addresses the efficiency-fidelity dilemma in 2K resolution image-to-video (I2V) generation through an innovative two-stage framework. Stage I uses a large-capacity DiT to generate motion references at low resolution (360P), significantly reducing token count. Stage II employs Conditional Segment-wise Generation (CSG) to synthesize high-resolution videos segment-by-segment, with bidirectional contextual interaction maintaining cross-segment coherence. The key innovation is Stage-Transition Training: by adding noise to low-resolution ground truth and denoising with Stage I model, it synthesizes training inputs with Stage I-style artifacts, effectively bridging the train-test gap in cascaded pipelines. On VBench-I2V at 2K resolution, SwiftI2V achieves 0.9975 on I2V Background metric (best) and reduces total GPU time by 202× compared to end-to-end baselines, enabling practical 2K I2V generation on a single RTX 4090. For music-to-dance tasks, CSG's segment-wise generation strategy can be directly transferred to long dance video generation, addressing current memory bottlenecks in handling long sequences.",
        keyPoints: [
          "Conditional Segment-wise Generation (CSG): Partitions temporal sequence into bounded segments with M noisy blocks and N neighbor blocks, controlling per-step token budget via bidirectional attention",
          "Stage-Transition Training: Synthesizes Stage I-style artifact inputs for Stage II training, eliminating train-test mismatch in cascaded pipelines",
          "Hybrid Reference Construction: Replaces first frame of upsampled Stage I output with input image as explicit appearance anchor for Stage II"
        ],
        href: "https://arxiv.org/abs/2605.06356",
        paperLink: "SwiftI2V: Efficient High-Resolution Image-to-Video Generation via Conditional Segment-wise Generation",
      },
      {
        num: 2,
        tag: "Audio-Driven Motion",
        title: "PersonaGesture: Single-Reference Co-Speech Gesture Personalization for Unseen Speakers",
        description: "PersonaGesture solves the personalization challenge in single-reference audio-driven motion generation: given target speech and a motion clip from a new speaker, synthesize gestures that follow new speech while retaining speaker-specific pose styles. The core challenge is that reference clips mix stable speaker habits with utterance-specific trajectories, and direct use leads to copying rather than generalization. The paper proposes two key components: Adaptive Style Infusion (ASI) injects speaker memory tokens extracted by Style Perceiver into the denoising process through zero-initialized residual cross-attention, influencing timing, amplitude, and motion space decisions; Implicit Distribution Rectification (IDR) applies length-aware diagonal affine mapping after denoising, performing conservative correction based on reference clip channel-wise moment statistics. Analysis based on Wasserstein-2 optimal transport shows that the optimal transport map under diagonal Gaussian assumption is exactly the affine transformation used by IDR. Experiments on BEAT2 and ZeroEGGS show PersonaGesture achieves FGD of 0.371 on unseen speakers, significantly outperforming LoRA-TTA and full-sequence reference attention baselines.",
        keyPoints: [
          "ASI: Zero-initialized residual cross-attention injects speaker memory while preserving pretrained speech-to-motion prior",
          "IDR: Length-aware moment correction based on W2 optimal transport theory, automatically weakening correction for short references to avoid overfitting",
          "Style Perceiver: Uses learnable query tokens and contrastive learning to encode variable-length references into fixed speaker memory"
        ],
        href: "https://arxiv.org/abs/2605.06064",
        paperLink: "PersonaGesture: Single-Reference Co-Speech Gesture Personalization for Unseen Speakers",
      },
      {
        num: 3,
        tag: "Video Relighting",
        title: "Relit-LiVE: Relight Video by Jointly Learning Environment Video",
        description: "Relit-LiVE proposes a video relighting framework without camera pose priors, solving physical consistency under complex lighting by jointly generating relit videos and per-frame environment videos (warped environment maps). The core innovation is RGB-Intrinsic fusion renderer: using original RGB frames to guide rendering, compensating for information loss in intrinsic decomposition under complex lighting (transparent objects, subsurface scattering). Environment video prediction implicitly infers lighting transformations, eliminating need for explicit pose estimation. Training strategies include: latent space interpolation to synthesize diverse multi-illumination data, and cycle-consistent self-supervised illumination learning to ensure temporal lighting coherence. Experiments on synthetic and real-world benchmarks show Relit-LiVE significantly outperforms existing methods in physical consistency and temporal stability. For music-to-dance tasks, the RGB-Intrinsic fusion idea can be adapted to separate character appearance from scene lighting for more flexible background replacement and lighting control; the joint environment video prediction method offers new insights for audio-conditioned generation.",
        keyPoints: [
          "RGB-Intrinsic Fusion Rendering: Fuses original RGB frames with intrinsic attributes (albedo, normal, depth, roughness, metallic) to preserve real lighting effects",
          "Joint Environment Video Prediction: Single pathway generates both relit video and per-frame environment maps, implicitly inferring lighting transformations",
          "Cycle-Consistent Self-Supervised Learning: Temporal lighting coherence constraint without additional annotations"
        ],
        href: "https://arxiv.org/abs/2605.06658",
        paperLink: "Relit-LiVE: Relight Video by Jointly Learning Environment Video",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Sparkle: Instruction-Guided Video Background Replacement via Decoupled Guidance",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2605.06535",
        description: "Proposes a scalable foreground-background decoupled data synthesis pipeline, addressing quality issues from insufficient background guidance in background replacement tasks. Its decoupled synthesis strategy can be adapted for dance character-background separation control.",
      },
      {
        num: 5,
        title: "Continuous-Time Distribution Matching for Few-Step Diffusion Distillation",
        tag: "Diffusion Acceleration",
        href: "https://arxiv.org/abs/2605.06376",
        description: "Extends DMD from discrete anchoring to continuous optimization, improving few-step generation quality through dynamic continuous scheduling and off-trajectory active matching. Has potential value for inference acceleration in real-time dance video generation.",
      },
      {
        num: 6,
        title: "DeScore: Decoupled Reasoning and Scoring for Video Reward Modeling",
        tag: "Video Evaluation",
        href: "https://arxiv.org/abs/2605.05922",
        description: "Proposes a 'think-then-score' paradigm where MLLM generates explicit chain-of-thought before discriminative module predicts reward. Can serve as feedback signal for dance video quality assessment in post-training optimization.",
      },
      {
        num: 7,
        title: "PianoCoRe: Combined and Refined Piano MIDI Dataset",
        tag: "Music Data",
        href: "https://arxiv.org/abs/2605.06627",
        description: "Piano MIDI dataset with 250k performances, 5,625 pieces, 483 composers, including note-level alignment. Can be used to train more accurate audio feature extractors for improved music beat detection.",
      },
    ],
    observation: "This week's papers show a clear trend in video generation toward efficient high-resolution generation and personalization. SwiftI2V's CSG strategy provides a scalable solution for long-sequence generation, with its core idea—segment-wise generation with bidirectional contextual interaction—directly applicable to long dance video generation in music-to-dance scenarios. PersonaGesture's ASI+IDR framework demonstrates how to achieve fine-grained personalization while preserving pretrained priors, with its length-aware conservative correction strategy having direct relevance for single-reference dance style transfer. Relit-LiVE's RGB-Intrinsic fusion rendering suggests that explicit modeling of appearance-lighting separation in character video generation may bring higher controllability. These three technologies provide composable technical modules for next-generation music-to-dance systems from the dimensions of efficiency, personalization, and controllability.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-09`,
        'en': `/en/daily/music-to-dance/2026-05-09`,
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
      date="2026-05-09"
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
