import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "实时音视频生成与长序列建模：流式扩散与空间加速的新突破",
    overview: [
      "V2M-Zero 提出 event curves 方法实现零样本视频-音乐节拍对齐，在 AIST++ 舞蹈数据集上提升 28%",
      "OmniForcing 首次实现实时联合音视频流式生成，单 GPU 达到 25 FPS",
      "SoulX-LiveAct 实现小时级实时人体动画，ConvKV 记忆机制支持无限长视频生成",
      "JiT 空间加速实现 7x 推理加速，为扩散模型实时化提供新路径"
    ],
    papers: [
      {
        num: 1,
        tag: "音视频对齐",
        title: "V2M-Zero：零样本时序对齐的视频到音乐生成",
        description: "V2M-Zero 的核心突破在于发现时序同步的关键不在于'什么发生了变化'，而在于'何时发生变化'以及'变化的程度'。论文提出的 event curves 通过计算模态内相似度（intra-modal similarity）来捕捉时序结构，使得音乐和视觉事件虽然语义不同，却能共享相同的时间结构。具体实现上，使用预训练的 music encoder 和 video encoder 分别提取特征，通过余弦相似度计算相邻时间步的变化量，再经过标准化和平滑处理得到 event curve。在 AIST++ 舞蹈视频上的实验表明，该方法在节拍对齐（beat alignment）指标上比成对数据训练基线提升 28%，且无需任何视频-音乐成对训练数据。对于 music-to-dance 任务，这一方法可直接迁移用于改进音频-运动同步模块，将 event curve 作为额外的条件信号注入扩散模型。",
        keyPoints: [
          "event curves 通过模态内相似度捕捉共享时序结构，实现零样本跨模态迁移",
          "在 AIST++ 舞蹈数据集上节拍对齐提升 28%，音频质量提升 5-21%",
          "无需成对视频-音乐数据，仅需在 text-to-music 模型上轻量微调（192-768 GPU hours）"
        ],
        href: "https://arxiv.org/abs/2603.11042",
        paperLink: "V2M-Zero: Zero-Pair Time-Aligned Video-to-Music Generation",
      },
      {
        num: 2,
        tag: "身份保持",
        title: "ID-LoRA：联合音视频身份个性化生成",
        description: "ID-LoRA 是首个在单一生成过程中同时保持视觉外观和声音身份的框架。现有方法将视频和音频分开处理，导致音频无法与画面动作同步，且无法通过文本提示控制说话风格或环境声学。ID-LoRA 基于 LTX-2 联合音视频扩散骨干，通过 In-Context LoRA 技术实现参数高效的适配。关键技术包括：negative temporal positions——将参考音频 token 置于 RoPE 空间的负时间区域，与目标 token 分离但保留内部时序结构；identity guidance——一种 classifier-free guidance 变体，通过对比有无参考信号的预测来放大说话人特征。在人类偏好研究中，ID-LoRA 在声音相似度上优于 Kling 2.6 Pro 达 73%，在说话风格上达 65%。对于 music-to-dance 任务，该方法的联合生成范式可为音频驱动的舞蹈视频生成提供新思路，特别是身份保持和风格控制机制。",
        keyPoints: [
          "首个单一生成过程中联合保持视觉外观和声音身份的框架",
          "negative temporal positions 解决参考与目标 token 的时空对齐问题",
          "identity guidance 机制通过对比预测放大说话人特征，仅需 ~3K 训练对"
        ],
        href: "https://arxiv.org/abs/2603.10256",
        paperLink: "ID-LoRA: Identity-Driven Audio-Video Personalization with In-Context LoRA",
      },
      {
        num: 3,
        tag: "流式生成",
        title: "OmniForcing：实时联合音视频流式生成",
        description: "OmniForcing 是首个将双向音视频扩散模型蒸馏为流式自回归生成器的框架，在单 GPU 上实现 ~25 FPS 的实时生成。核心挑战在于音视频模态的极端时序不对称（视频 3 FPS vs 音频 25 FPS）导致因果掩码下的 token 稀疏性和梯度爆炸。解决方案包括：Asymmetric Block-Causal Alignment——以 1 秒为宏块边界，每块包含 3 个视频 latent 和 25 个音频 latent；Global Prefix——将初始帧合并为全局双向锚点，提供跨模态语义锚定；Audio Sink Token with Identity RoPE——为音频流设置位置无关的全局记忆缓冲区，缓解稀疏因果注意力的 Softmax 崩溃；Joint Self-Forcing Distillation——通过自展开训练动态纠正长序列中的累积误差。相比 LTX-2 的 197 秒 TTFC，OmniForcing 将首块延迟降至 0.7 秒。对于 music-to-dance 的实时音频驱动生成，该框架提供了可直接部署的技术路径。",
        keyPoints: [
          "首个实时联合音视频流式生成框架，单 GPU 达 25 FPS，TTFC 仅 0.7 秒",
          "Asymmetric Block-Causal Alignment 解决 25:3 频率不对称问题",
          "Audio Sink Token 与 Identity RoPE 缓解稀疏因果注意力的训练不稳定性"
        ],
        href: "https://arxiv.org/abs/2603.11647",
        paperLink: "OmniForcing: Unleashing Real-time Joint Audio-Visual Generation",
      },
      {
        num: 4,
        tag: "长视频生成",
        title: "SoulX-LiveAct：小时级实时人体动画与 ConvKV 记忆",
        description: "SoulX-LiveAct 针对小时级实时人体动画提出 Neighbor Forcing 和 ConvKV Memory 两大创新。现有 AR 扩散方法在传播样本级表示时存在扩散状态不匹配问题，导致学习信号不一致和收敛不稳定。Neighbor Forcing 的核心思想是传播'相同扩散步的相邻帧 latent'作为参考状态，而非干净帧或异构噪声历史。理论分析表明，相同步的相邻帧 latent 在 latent 流形上几何接近且在相同噪声状态下统计对齐，满足局部平滑性。ConvKV Memory 则通过轻量级 1D 卷积将历史 KV 压缩为固定长度表示，实现常数内存推理和真正无限长视频生成。实验表明，该方法在双 H100/H200 GPU 上支持 20 FPS 实时流式推理，在唇同步精度、动画质量和情感表达上达到 SOTA，每帧仅需 27.2 TFLOPs。对于 music-to-dance 的长序列舞蹈视频生成，Neighbor Forcing 的步一致设计和 ConvKV 的压缩机制可直接迁移应用。",
        keyPoints: [
          "Neighbor Forcing 通过传播相同扩散步的相邻帧 latent 实现步一致 AR 生成",
          "ConvKV Memory 将 KV 缓存压缩为固定长度，支持小时级无限长视频生成",
          "双 H100/H200 GPU 实现 20 FPS 实时推理，每帧 27.2 TFLOPs"
        ],
        href: "https://arxiv.org/abs/2603.11746",
        paperLink: "SoulX-LiveAct: Towards Hour-Scale Real-Time Human Animation with Neighbor Forcing and ConvKV Memory",
      },
      {
        num: 5,
        tag: "推理加速",
        title: "Just-in-Time：无需训练的空间加速扩散 Transformer",
        description: "JiT 提出首个无需训练的空间域加速框架，在 FLUX.1-dev 上实现 7x 加速且几乎无损性能。核心观察是扩散生成过程存在显著空间冗余：全局结构在早期阶段就已形成，而细粒度细节在后期才逐步细化。JiT 通过空间近似生成 ODE（SAG-ODE）仅对动态选择的稀疏锚点 token 计算速度场，再通过增强的 lifter 算子外推至完整空间。确定性微流（DMF）确保新激活 token 在阶段过渡时的结构连贯性和统计正确性。SAG-ODE 的一致性性质保证锚点 token 的动态由 Transformer 精确控制，而插值算子不影响锚点子空间。实验表明，在 4x 和 7x 加速因子下，JiT 显著优于现有加速方法。对于计算密集型的 music-to-dance 视频生成，JiT 的空间加速策略可直接应用于扩散采样过程，降低实时部署的硬件门槛。",
        keyPoints: [
          "首个无需训练的空间域扩散加速框架，FLUX.1-dev 上实现 7x 加速",
          "SAG-ODE 通过稀疏锚点 token 计算和外推实现空间近似",
          "DMF 确保阶段过渡时的结构连贯性，避免上采样伪影"
        ],
        href: "https://arxiv.org/abs/2603.10744",
        paperLink: "Just-in-Time: Training-Free Spatial Acceleration for Diffusion Transformers",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Motion Forcing：解耦物理推理与视觉合成的鲁棒视频生成",
        tag: "物理一致性",
        href: "https://arxiv.org/abs/2603.10408",
        description: "Point-Shape-Appearance 分层解耦范式，通过 Masked Point Recovery 学习潜在物理规律，对舞蹈动作生成的物理一致性有参考价值。",
      },
      {
        num: 7,
        title: "遮挡感知的稀疏 3D 手部关节控制自我中心视频生成",
        tag: "姿态控制",
        href: "https://arxiv.org/abs/2603.11755",
        description: "稀疏 3D 关节点控制信号和遮挡感知特征提取，可借鉴用于舞蹈动作的姿态控制和遮挡处理。",
      },
      {
        num: 8,
        title: "CourtSI：体育场景空间智能基准测试",
        tag: "空间理解",
        href: "https://arxiv.org/abs/2603.09896",
        description: "包含 100 万 QA 对的体育空间智能数据集，对评估舞蹈视频生成中的人物空间关系有参考意义。",
      },
      {
        num: 9,
        title: "InternVL-U：统一多模态理解与生成",
        tag: "统一模型",
        href: "https://arxiv.org/abs/2603.09877",
        description: "4B 参数统一多模态模型，平衡语义理解与生成能力，对端到端音频到视频框架设计有启发。",
      },
      {
        num: 10,
        title: "4DEquine：运动与外观解耦的 4D 马匹重建",
        tag: "4D 重建",
        href: "https://arxiv.org/abs/2603.10125",
        description: "时空 transformer 和高斯 avatar 技术，可用于舞蹈人物的 4D 建模和外观迁移。",
      },
      {
        num: 11,
        title: "UniCom：压缩连续语义表示的统一多模态建模",
        tag: "表示学习",
        href: "https://arxiv.org/abs/2603.10702",
        description: "通过降维而非空间下采样实现连续表示压缩，对音频-视觉跨模态对齐的表示学习有参考价值。",
      },
    ],
    observation: "今日论文呈现两大趋势：一是实时化——OmniForcing 和 SoulX-LiveAct 分别从流式生成和无限长视频角度突破实时性瓶颈；二是跨模态对齐的新范式——V2M-Zero 的 event curves 和 ID-LoRA 的 negative temporal positions 都揭示了时序结构可以独立于语义内容被捕捉和利用。对于 music-to-dance 任务，这些技术可组合应用：event curves 用于音频-运动节拍对齐，Neighbor Forcing + ConvKV 用于长舞蹈序列生成，JiT 空间加速降低推理成本，OmniForcing 的流式框架支持实时交互。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Real-Time Audio-Visual Generation & Long-Sequence Modeling: Breakthroughs in Streaming Diffusion and Spatial Acceleration",
    overview: [
      "V2M-Zero proposes event curves for zero-shot video-music beat alignment, achieving 28% improvement on AIST++ dance dataset",
      "OmniForcing achieves the first real-time joint audio-visual streaming generation at 25 FPS on a single GPU",
      "SoulX-LiveAct enables hour-scale real-time human animation with ConvKV memory for infinite-length video generation",
      "JiT spatial acceleration achieves 7x inference speedup, opening new paths for real-time diffusion models"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Visual Alignment",
        title: "V2M-Zero: Zero-Pair Time-Aligned Video-to-Music Generation",
        description: "V2M-Zero's key insight is that temporal synchronization depends not on 'what changes' but on 'when changes occur' and 'how much'. The proposed event curves capture temporal structure through intra-modal similarity, allowing musical and visual events to share temporal structure despite semantic differences. Implementation uses pretrained music and video encoders to extract features, computes cosine similarity between consecutive timesteps, then standardizes and smooths to obtain event curves. Experiments on AIST++ dance videos show 28% improvement in beat alignment over paired-data baselines without any paired video-music training data. For music-to-dance tasks, this method can be directly transferred to improve audio-motion synchronization by injecting event curves as additional conditioning signals into diffusion models.",
        keyPoints: [
          "Event curves capture shared temporal structure through intra-modal similarity, enabling zero-shot cross-modal transfer",
          "28% improvement in beat alignment on AIST++ dance dataset, 5-21% better audio quality",
          "No paired video-music data needed, only lightweight fine-tuning on text-to-music models (192-768 GPU hours)"
        ],
        href: "https://arxiv.org/abs/2603.11042",
        paperLink: "V2M-Zero: Zero-Pair Time-Aligned Video-to-Music Generation",
      },
      {
        num: 2,
        tag: "Identity Preservation",
        title: "ID-LoRA: Identity-Driven Audio-Video Personalization with In-Context LoRA",
        description: "ID-LoRA is the first framework to preserve both visual appearance and vocal identity in a single generative pass. Existing methods process video and audio separately, preventing audio from synchronizing with on-screen actions and blocking text-prompt control over speaking style or environment acoustics. ID-LoRA adapts the LTX-2 joint audio-video diffusion backbone via parameter-efficient In-Context LoRA. Key techniques include: negative temporal positions—placing reference audio tokens in negative time regions of RoPE space to separate them from target tokens while preserving internal temporal structure; and identity guidance—a classifier-free guidance variant that amplifies speaker-specific features by contrasting predictions with and without reference signals. In human preference studies, ID-LoRA outperforms Kling 2.6 Pro by 73% in voice similarity and 65% in speaking style. For music-to-dance tasks, this unified generation paradigm offers new directions for audio-driven dance video generation, particularly in identity preservation and style control mechanisms.",
        keyPoints: [
          "First framework to jointly preserve visual appearance and vocal identity in a single generative pass",
          "Negative temporal positions solve spatiotemporal alignment between reference and target tokens",
          "Identity guidance amplifies speaker features through contrastive prediction, requiring only ~3K training pairs"
        ],
        href: "https://arxiv.org/abs/2603.10256",
        paperLink: "ID-LoRA: Identity-Driven Audio-Video Personalization with In-Context LoRA",
      },
      {
        num: 3,
        tag: "Streaming Generation",
        title: "OmniForcing: Unleashing Real-time Joint Audio-Visual Generation",
        description: "OmniForcing is the first framework to distill a bidirectional audio-visual diffusion model into a streaming autoregressive generator, achieving ~25 FPS real-time generation on a single GPU. The core challenge is extreme temporal asymmetry between modalities (video 3 FPS vs audio 25 FPS) causing token sparsity and gradient explosions under causal masking. Solutions include: Asymmetric Block-Causal Alignment—using 1-second macro-blocks containing 3 video latents and 25 audio latents; Global Prefix—merging initial frames into a global bidirectional anchor for cross-modal semantic anchoring; Audio Sink Token with Identity RoPE—creating position-agnostic global memory buffers for the audio stream to mitigate Softmax collapse in sparse causal attention; and Joint Self-Forcing Distillation—dynamically correcting accumulated errors in long sequences through self-unrolled training. Compared to LTX-2's 197-second TTFC, OmniForcing reduces first-chunk latency to 0.7 seconds. For real-time audio-driven music-to-dance generation, this framework provides a directly deployable technical path.",
        keyPoints: [
          "First real-time joint audio-visual streaming generation framework: 25 FPS on single GPU, TTFC only 0.7s",
          "Asymmetric Block-Causal Alignment solves 25:3 frequency asymmetry problem",
          "Audio Sink Token with Identity RoPE mitigates training instability from sparse causal attention"
        ],
        href: "https://arxiv.org/abs/2603.11647",
        paperLink: "OmniForcing: Unleashing Real-time Joint Audio-Visual Generation",
      },
      {
        num: 4,
        tag: "Long Video Generation",
        title: "SoulX-LiveAct: Hour-Scale Real-Time Human Animation with Neighbor Forcing and ConvKV Memory",
        description: "SoulX-LiveAct addresses hour-scale real-time human animation through Neighbor Forcing and ConvKV Memory innovations. Existing AR diffusion methods suffer from mismatched diffusion states when propagating sample-level representations, causing inconsistent learning signals and unstable convergence. Neighbor Forcing's core idea is propagating 'neighbor frame latents at the same diffusion step' as reference states, rather than clean frames or heterogeneous noise histories. Theoretical analysis shows that same-step neighbor latents are geometrically close on the latent manifold and statistically aligned under the same noise state, satisfying local smoothness. ConvKV Memory compresses historical KV into fixed-length representations via lightweight 1D convolution, enabling constant-memory inference and truly infinite-length video generation. Experiments show the method supports 20 FPS real-time streaming inference on dual H100/H200 GPUs, achieving SOTA in lip-sync accuracy, animation quality, and emotional expressiveness with only 27.2 TFLOPs per frame. For long-sequence music-to-dance video generation, Neighbor Forcing's step-consistent design and ConvKV's compression mechanism can be directly transferred.",
        keyPoints: [
          "Neighbor Forcing achieves step-consistent AR generation by propagating same-step neighbor frame latents",
          "ConvKV Memory compresses KV cache to fixed length, supporting hour-scale infinite-length video generation",
          "Dual H100/H200 GPUs achieve 20 FPS real-time inference at 27.2 TFLOPs per frame"
        ],
        href: "https://arxiv.org/abs/2603.11746",
        paperLink: "SoulX-LiveAct: Towards Hour-Scale Real-Time Human Animation with Neighbor Forcing and ConvKV Memory",
      },
      {
        num: 5,
        tag: "Inference Acceleration",
        title: "Just-in-Time: Training-Free Spatial Acceleration for Diffusion Transformers",
        description: "JiT proposes the first training-free spatial acceleration framework, achieving 7x speedup on FLUX.1-dev with nearly lossless performance. The core observation is significant spatial redundancy in the diffusion generation process: global structures emerge early while fine-grained details refine later. JiT uses Spatially Approximated Generative ODE (SAG-ODE) to compute velocity fields only on dynamically selected sparse anchor tokens, then extrapolates to full space via an augmented lifter operator. Deterministic Micro-Flow (DMF) ensures structural coherence and statistical correctness during stage transitions. SAG-ODE's consistency property guarantees anchor token dynamics are precisely controlled by the Transformer while the interpolation operator doesn't affect the anchor subspace. Experiments show JiT significantly outperforms existing acceleration methods at 4x and 7x acceleration factors. For compute-intensive music-to-dance video generation, JiT's spatial acceleration strategy can be directly applied to the diffusion sampling process, lowering hardware barriers for real-time deployment.",
        keyPoints: [
          "First training-free spatial acceleration framework for diffusion, achieving 7x speedup on FLUX.1-dev",
          "SAG-ODE computes on sparse anchor tokens and extrapolates for spatial approximation",
          "DMF ensures structural coherence during stage transitions, avoiding upsampling artifacts"
        ],
        href: "https://arxiv.org/abs/2603.10744",
        paperLink: "Just-in-Time: Training-Free Spatial Acceleration for Diffusion Transformers",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Motion Forcing: Decoupled Framework for Robust Video Generation",
        tag: "Physical Consistency",
        href: "https://arxiv.org/abs/2603.10408",
        description: "Point-Shape-Appearance hierarchical decoupling with Masked Point Recovery for learning latent physical laws, relevant for physical consistency in dance motion generation.",
      },
      {
        num: 7,
        title: "Controllable Egocentric Video Generation via Occlusion-Aware Sparse 3D Hand Joints",
        tag: "Pose Control",
        href: "https://arxiv.org/abs/2603.11755",
        description: "Sparse 3D joint control signals and occlusion-aware feature extraction, applicable to dance pose control and occlusion handling.",
      },
      {
        num: 8,
        title: "CourtSI: Spatial Intelligence Benchmark for Sports",
        tag: "Spatial Understanding",
        href: "https://arxiv.org/abs/2603.09896",
        description: "1M QA pairs sports spatial intelligence dataset, relevant for evaluating spatial relationships in dance video generation.",
      },
      {
        num: 9,
        title: "InternVL-U: Unified Multimodal Understanding and Generation",
        tag: "Unified Model",
        href: "https://arxiv.org/abs/2603.09877",
        description: "4B-parameter unified multimodal model balancing understanding and generation, inspiring end-to-end audio-to-video framework design.",
      },
      {
        num: 10,
        title: "4DEquine: Disentangled Motion and Appearance for 4D Equine Reconstruction",
        tag: "4D Reconstruction",
        href: "https://arxiv.org/abs/2603.10125",
        description: "Spatiotemporal transformer and Gaussian avatar techniques applicable to 4D modeling and appearance transfer for dance characters.",
      },
      {
        num: 11,
        title: "UniCom: Unified Multimodal Modeling via Compressed Continuous Representations",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2603.10702",
        description: "Continuous representation compression via dimensionality reduction rather than spatial downsampling, relevant for audio-visual cross-modal alignment.",
      },
    ],
    observation: "Today's papers reveal two major trends: real-time optimization—OmniForcing and SoulX-LiveAct break real-time bottlenecks from streaming generation and infinite-length video perspectives respectively; and new paradigms for cross-modal alignment—both V2M-Zero's event curves and ID-LoRA's negative temporal positions reveal that temporal structure can be captured and utilized independently of semantic content. For music-to-dance tasks, these technologies can be combined: event curves for audio-motion beat alignment, Neighbor Forcing + ConvKV for long dance sequence generation, JiT spatial acceleration to reduce inference costs, and OmniForcing's streaming framework for real-time interaction.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-12`,
        'en': `/en/daily/music-to-dance/2026-03-12`,
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
      date="2026-03-12"
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
