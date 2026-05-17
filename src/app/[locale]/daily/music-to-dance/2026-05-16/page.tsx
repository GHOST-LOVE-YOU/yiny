import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-05-16 | 视频世界模型的高效推理与相机控制",
    overview: [
      "SANA-WM 以 2.6B 参数实现分钟级 720p 视频生成，Hybrid Linear Attention 架构将长上下文建模效率提升 36 倍",
      "Causal Forcing++ 将自回归视频生成压缩至 1-2 步，首帧延迟降低 50%，为实时交互视频提供新范式",
      "Warp-as-History 揭示预训练视频模型的零样本相机控制能力，单视频 LoRA 微调即可泛化到未见场景",
      "RAVEN 通过训练时测试框架解决自回归视频的历史监督缺口，CM-GRPO 强化学习进一步提升生成质量"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型",
        title: "SANA-WM：分钟级世界模型的高效原生训练",
        description: "SANA-WM 是一个 2.6B 参数的开源世界模型，原生训练用于分钟级视频生成。其核心创新 Hybrid Linear Attention 将帧级 Gated DeltaNet (GDN) 与 softmax attention 结合，在保持建模能力的同时实现内存高效的长上下文建模。相比传统累积线性注意力，GDN 引入了衰减门和 delta 规则校正，解决了长序列中状态无界增长导致的漂移问题。模型采用 LTX2-VAE 实现 8 倍于 Wan2.1-VAE 的压缩率，配合双分支相机控制（UCPE 全局轨迹 + Plücker 细粒度运动），在单 H100 上即可生成 60 秒 720p 视频。蒸馏版在 RTX 5090 上仅需 34 秒即可完成去噪。对于舞蹈视频生成，其高效的长序列建模架构可直接借鉴，用于优化当前 3D Audio Attention 的时序扩展瓶颈。",
        keyPoints: [
          "Hybrid Linear Attention: GDN 帧级循环状态 + 周期性 softmax attention，实现 O(1) 内存的分钟级建模",
          "双分支相机控制: UCPE 捕获全局 6-DoF 轨迹，Plücker mixing 恢复 VAE 步长内的细粒度运动",
          "两阶段生成: Stage-1 基础生成 + Stage-2 长视频精炼器，提升全序列一致性和细节质量",
          "训练效率: 仅 213K 公开视频片段，64 张 H100 训练 15 天，单 GPU 推理"
        ],
        href: "https://arxiv.org/abs/2605.15178",
        paperLink: "SANA-WM: Efficient Minute-Scale World Modeling with Hybrid Linear Diffusion Transformer",
      },
      {
        num: 2,
        tag: "蒸馏加速",
        title: "Causal Forcing++：1-2 步实时交互视频生成",
        description: "现有自回归扩散蒸馏方法依赖块级 4 步生成，响应粒度粗且采样延迟高。Causal Forcing++ 将目标推向更激进的帧级 1-2 步生成。其核心创新 Causal Consistency Distillation (Causal CD) 用相邻时间步的单个在线教师 ODE 步提供监督，避免了预计算完整 PF-ODE 轨迹的存储开销。理论上，Causal CD 与 Causal ODE Distillation 学习目标等价（均为 AR-conditional flow map），但优化间隙更小、更易收敛。实验显示，在帧级 2 步设置下，Causal Forcing++ 在 VBench Total/Quality 和 VisionReward 上超越 SOTA 4 步块级 Causal Forcing，首帧延迟降低 50%，Stage 2 训练成本减少约 4 倍。对于舞蹈视频生成，这意味着可将音频-运动对齐模块的推理步数从数十步压缩至 1-2 步，实现真正的实时生成。",
        keyPoints: [
          "Causal CD 初始化: 相邻时间步单步监督替代完整轨迹回归，避免离线存储瓶颈",
          "理论等价性: Causal CD 与 Causal ODE 学习目标相同，但每步优化间隙更小",
          "成本收益: Stage 2 训练从 11600 GPU 小时降至 2900 小时，存储从 1900 GiB 降至 0",
          "扩展性: 可自然扩展到动作条件世界模型（如相机姿态控制）"
        ],
        href: "https://arxiv.org/abs/2605.15141",
        paperLink: "Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation",
      },
      {
        num: 3,
        tag: "相机控制",
        title: "Warp-as-History：单视频激活相机控制能力",
        description: "传统相机控制方法需大规模相机标注视频训练或测试时优化。Warp-as-History 发现预训练的历史条件视频模型已具备弱相机跟随先验，只需将目标相机轨迹转换为相机扭曲的伪历史即可激活。关键设计包括：(1) 目标帧位置对齐——将扭曲历史的 RoPE 位置与目标帧对齐，使模型将扭曲视为当前帧证据而非过去上下文；(2) 可见 token 选择——剔除扭曲中无效区域，让模型依赖生成先验完成遮挡。零样本下冻结模型已能产生可测量的相机跟随行为，单视频 LoRA 微调（1000 迭代，约 1 小时 A800）即可稳定该行为并泛化到未见视频。在 WorldScore、RE10K、DAVIS 上，单视频微调后的性能与大量数据训练的最优基线相当。对于舞蹈视频，这意味着可用极低成本实现相机轨迹控制，无需重新训练整个模型。",
        keyPoints: [
          "零样本能力: 冻结的历史条件视频模型可通过扭曲历史接口产生相机跟随行为",
          "目标帧对齐: 将扭曲历史的 RoPE 位置映射到目标帧位置，关键的位置编码技巧",
          "可见 token 选择: 剔除扭曲中无有效源观测的 token，避免复制扭曲误差",
          "单视频微调: 1 小时离线 LoRA 微调即可泛化到未见场景，非测试时优化"
        ],
        href: "https://arxiv.org/abs/2605.15182",
        paperLink: "Warp-as-History: Generalizable Camera-Controlled Video Generation from One Training Video",
      },
      {
        num: 4,
        tag: "自回归蒸馏",
        title: "RAVEN：训练时测试框架与 CM-GRPO",
        description: "自回归视频扩散蒸馏面临历史监督缺口：Teacher Forcing 使用真实历史导致训练-推理分布不匹配，Self Forcing 使用自展历史但缓存表示无端到端监督。RAVEN 将自展轨迹重新打包成交替的干净历史端点和噪声去噪状态的交错序列，使后续块的损失能监督未来预测所依赖的历史表示。此外，CM-GRPO 将一致性采样步骤重构为条件高斯转移核，直接对其应用组相对策略优化，避免了 Flow-GRPO 中 Euler-Maruyama 离散化引入的随机性与推理时确定性采样的不匹配。实验显示 RAVEN 在质量、语义和动态程度评估上超越近期因果视频蒸馏基线，CM-GRPO 提供互补增益。对于长舞蹈视频生成，RAVEN 的训练时测试框架可减少自回归 rollout 中的误差累积，提升时序一致性。",
        keyPoints: [
          "训练时测试: 自展轨迹重新打包为干净历史端点 + 噪声状态，历史表示纳入监督",
          "CM-GRPO: 一致性采样作为条件高斯转移，直接应用 RL 而无需 Euler-Maruyama 辅助",
          "历史监督: 后续块损失通过注意力机制反向传播到历史表示",
          "Chunk-wise 损失缩放: 针对不同块位置调整损失权重，优化长序列训练"
        ],
        href: "https://arxiv.org/abs/2605.15190",
        paperLink: "RAVEN: Real-time Autoregressive Video Extrapolation with Consistency-model GRPO",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "RefDecoder: 参考条件视频 VAE 解码器",
        tag: "外观一致性",
        href: "https://arxiv.org/abs/2605.15196",
        description: "通过参考注意力将参考图信号注入视频 VAE 解码过程，在 Wan 2.1 和 VideoVAE+ 上实现最高 +2.1dB PSNR 提升，可直接插入现有 I2V 系统改善人物外观一致性。",
      },
      {
        num: 6,
        title: "PDI-Bench: 视频几何一致性定量评估",
        tag: "评估指标",
        href: "https://arxiv.org/abs/2605.15185",
        description: "通过分割、点跟踪和单目重建计算尺度-深度对齐、3D 运动一致性和结构刚性残差，揭示现有视频生成器未被感知指标捕获的几何失效模式。",
      },
      {
        num: 7,
        title: "球面流匹配：潜在空间几何对齐",
        tag: "流匹配",
        href: "https://arxiv.org/abs/2605.15193",
        description: "将数据潜在向量投影到固定半径球面，用球面线性插值替代欧氏弦，在 ImageNet-256 上持续改进 FID，无需修改扩散架构或辅助编码器。",
      },
    ],
    observation: "本周论文呈现两个显著趋势：(1) 高效长视频生成的架构创新——SANA-WM 的 Hybrid Linear Attention 和 Causal Forcing++ 的 1-2 步蒸馏都在挑战传统扩散模型的计算瓶颈，为舞蹈视频生成的实时化提供可行路径；(2) 相机控制的数据效率突破——Warp-as-History 证明预训练模型已内嵌相机控制能力，只需正确的接口设计即可激活，单视频微调范式可大幅降低舞蹈视频相机控制的实现成本。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-05-16 | Efficient Inference and Camera Control for Video World Models",
    overview: [
      "SANA-WM achieves minute-scale 720p video generation with 2.6B parameters, Hybrid Linear Attention improves long-context efficiency by 36×",
      "Causal Forcing++ compresses autoregressive video generation to 1-2 steps, reducing first-frame latency by 50% for real-time interactive video",
      "Warp-as-History reveals zero-shot camera control capability in pretrained video models, single-video LoRA finetuning generalizes to unseen scenes",
      "RAVEN addresses the history supervision gap in autoregressive video through training-time test framework, CM-GRPO further improves generation quality"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model",
        title: "SANA-WM: Efficient Native Training for Minute-Scale World Modeling",
        description: "SANA-WM is a 2.6B-parameter open-source world model natively trained for minute-scale video generation. Its core innovation, Hybrid Linear Attention, combines frame-wise Gated DeltaNet (GDN) with periodic softmax attention for memory-efficient long-context modeling. Unlike cumulative linear attention, GDN introduces decay gates and delta-rule corrections that address unbounded state growth and drift in long sequences. The model uses LTX2-VAE achieving 8× compression compared to Wan2.1-VAE, paired with dual-branch camera control (UCPE for global trajectory + Plücker for fine-grained motion). It generates 60-second 720p videos on a single H100, with the distilled variant denoising in just 34 seconds on RTX 5090. For dance video generation, its efficient long-sequence architecture can directly inform optimizations for 3D Audio Attention's temporal scaling bottlenecks.",
        keyPoints: [
          "Hybrid Linear Attention: GDN frame-level recurrent state + periodic softmax attention enables O(1) memory minute-scale modeling",
          "Dual-branch camera control: UCPE captures global 6-DoF trajectory, Plücker mixing recovers fine motion within VAE strides",
          "Two-stage generation: Stage-1 base generation + Stage-2 long-video refiner improves sequence consistency and detail quality",
          "Training efficiency: Only 213K public video clips, 64 H100s for 15 days, single-GPU inference"
        ],
        href: "https://arxiv.org/abs/2605.15178",
        paperLink: "SANA-WM: Efficient Minute-Scale World Modeling with Hybrid Linear Diffusion Transformer",
      },
      {
        num: 2,
        tag: "Distillation",
        title: "Causal Forcing++: 1-2 Step Real-Time Interactive Video Generation",
        description: "Existing autoregressive diffusion distillation relies on chunk-wise 4-step generation with coarse granularity and high latency. Causal Forcing++ pushes toward more aggressive frame-wise 1-2 step generation. Its core innovation, Causal Consistency Distillation (Causal CD), provides supervision from a single online teacher ODE step between adjacent timesteps, avoiding the storage overhead of precomputing full PF-ODE trajectories. Theoretically, Causal CD is equivalent to Causal ODE Distillation (both target the AR-conditional flow map) but with smaller per-step optimization gaps. Experiments show frame-wise 2-step Causal Forcing++ surpasses SOTA 4-step chunk-wise Causal Forcing on VBench Total/Quality and VisionReward, with 50% lower first-frame latency and ~4× reduced Stage 2 training cost. For dance video generation, this means compressing audio-motion alignment from dozens of steps to 1-2 steps for true real-time generation.",
        keyPoints: [
          "Causal CD initialization: Adjacent-timestep single-step supervision replaces full trajectory regression, eliminating offline storage bottleneck",
          "Theoretical equivalence: Causal CD and Causal ODE share learning objectives but Causal CD has smaller per-step optimization gaps",
          "Cost benefits: Stage 2 training reduced from 11,600 to 2,900 GPU hours, storage from 1,900 GiB to 0",
          "Extensibility: Naturally extends to action-conditioned world models (e.g., camera pose control)"
        ],
        href: "https://arxiv.org/abs/2605.15141",
        paperLink: "Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation",
      },
      {
        num: 3,
        tag: "Camera Control",
        title: "Warp-as-History: Activating Camera Control from Single Video",
        description: "Traditional camera control requires large-scale camera-annotated video training or test-time optimization. Warp-as-History discovers that pretrained history-conditioned video models already possess weak camera-following priors, activatable by converting target camera trajectories into camera-warped pseudo-history. Key designs include: (1) target-frame positional alignment—aligning warped history RoPE positions with target frames so the model treats warp as current-frame evidence rather than past context; (2) visible-token selection—dropping invalid warp regions to let the model rely on generative priors for disocclusions. Zero-shot frozen models already show measurable camera-following behavior, and single-video LoRA finetuning (1000 iterations, ~1 hour on A800) stabilizes this behavior and generalizes to unseen videos. On WorldScore, RE10K, and DAVIS, single-video finetuning matches or exceeds baselines trained on orders of magnitude more data. For dance videos, this enables camera trajectory control at minimal cost without retraining the entire model.",
        keyPoints: [
          "Zero-shot capability: Frozen history-conditioned video models can exhibit camera-following behavior through the warp-history interface",
          "Target-frame alignment: Mapping warped history RoPE positions to target frame positions—a crucial positional encoding technique",
          "Visible-token selection: Dropping tokens without valid source observations in the warp to avoid copying warp errors",
          "Single-video finetuning: 1-hour offline LoRA finetuning generalizes to unseen scenes, not test-time optimization"
        ],
        href: "https://arxiv.org/abs/2605.15182",
        paperLink: "Warp-as-History: Generalizable Camera-Controlled Video Generation from One Training Video",
      },
      {
        num: 4,
        tag: "AR Distillation",
        title: "RAVEN: Training-Time Test Framework with CM-GRPO",
        description: "Autoregressive video diffusion distillation faces a history supervision gap: Teacher Forcing uses real history causing train-inference distribution mismatch, while Self Forcing uses self-rollout history but cache representations lack end-to-end supervision. RAVEN repacks self-rollout trajectories into interleaved sequences of clean historical endpoints and noisy denoising states, allowing subsequent chunk losses to supervise the history representations future predictions depend on. Additionally, CM-GRPO reformulates consistency sampling steps as conditional Gaussian transition kernels, applying group relative policy optimization directly without the Euler-Maruyama discretization used in Flow-GRPO that introduces stochasticity mismatched with deterministic inference-time sampling. Experiments show RAVEN surpasses recent causal video distillation baselines across quality, semantic, and dynamic degree evaluations, with CM-GRPO providing complementary gains. For long dance video generation, RAVEN's training-time test framework can reduce error accumulation in autoregressive rollouts and improve temporal consistency.",
        keyPoints: [
          "Training-time test: Self-rollout repacked as clean historical endpoints + noisy states, history representations纳入 supervision",
          "CM-GRPO: Consistency sampling as conditional Gaussian transition, direct RL application without Euler-Maruyama auxiliary",
          "History supervision: Subsequent chunk losses backpropagate to history representations through attention",
          "Chunk-wise loss scaling: Adjusting loss weights for different chunk positions to optimize long-sequence training"
        ],
        href: "https://arxiv.org/abs/2605.15190",
        paperLink: "RAVEN: Real-time Autoregressive Video Extrapolation with Consistency-model GRPO",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "RefDecoder: Reference-Conditioned Video VAE Decoder",
        tag: "Appearance Consistency",
        href: "https://arxiv.org/abs/2605.15196",
        description: "Injects reference image signals into video VAE decoding via reference attention, achieving up to +2.1dB PSNR improvement on Wan 2.1 and VideoVAE+, directly pluggable into existing I2V systems to improve subject appearance consistency.",
      },
      {
        num: 6,
        title: "PDI-Bench: Quantitative Geometric Consistency Evaluation for Video",
        tag: "Evaluation",
        href: "https://arxiv.org/abs/2605.15185",
        description: "Computes scale-depth alignment, 3D motion consistency, and structural rigidity residuals through segmentation, point tracking, and monocular reconstruction, revealing geometric failure modes in video generators not captured by perceptual metrics.",
      },
      {
        num: 7,
        title: "Spherical Flow Matching: Latent Space Geometry Alignment",
        tag: "Flow Matching",
        href: "https://arxiv.org/abs/2605.15193",
        description: "Projects data latent vectors onto a fixed-radius sphere, replacing Euclidean chords with spherical linear interpolation, consistently improving FID on ImageNet-256 without modifying diffusion architecture or adding auxiliary encoders.",
      },
    ],
    observation: "This week's papers reveal two notable trends: (1) Architectural innovations for efficient long-video generation—SANA-WM's Hybrid Linear Attention and Causal Forcing++'s 1-2 step distillation both challenge computational bottlenecks in traditional diffusion models, providing viable paths for real-time dance video generation; (2) Data-efficiency breakthroughs in camera control—Warp-as-History demonstrates that pretrained models already embed camera control capabilities, requiring only proper interface design to activate, with the single-video finetuning paradigm significantly reducing implementation costs for dance video camera control.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-16`,
        'en': `/en/daily/music-to-dance/2026-05-16`,
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
      date="2026-05-16"
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
