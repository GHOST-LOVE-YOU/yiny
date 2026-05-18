import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-05-17 | 实时视频生成与相机控制新进展",
    overview: [
      "SANA-WM 提出 Hybrid Linear Attention 机制，实现分钟级长视频生成，单卡 34 秒生成 60 秒 720p 视频",
      "Causal Forcing++ 将首帧延迟降低 50%，frame-wise 2-step 自回归扩散蒸馏实现实时交互",
      "Warp-as-History 仅需单视频微调即可实现零样本相机控制，无需大规模相机标注数据"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型",
        title: "SANA-WM：基于混合线性扩散 Transformer 的高效分钟级世界建模",
        description: "SANA-WM 是一个 2.6B 参数的开源世界模型，原生训练用于一分钟视频生成。其核心创新是 Hybrid Linear Attention 架构：将帧级 Gated DeltaNet (GDN) 与周期性 softmax attention 结合，在保持长上下文建模能力的同时将内存开销降至恒定。GDN 通过 decay gate 和 delta-rule 校正机制解决了传统累积线性注意力中状态无界增长导致的漂移问题。论文提出的 Dual-Branch Camera Control 设计尤为值得关注——latent-rate UCPE 分支捕捉全局 6-DoF 轨迹结构，raw-frame Plücker mixing 分支则在每个 VAE 时间步长内恢复精细相机运动。对于 music-to-dance 任务，这种 coarse-to-fine 的控制范式可直接迁移到音频-运动对齐：UCPE 层处理音乐节拍的全局结构，Plücker 层捕捉细粒度节奏变化。此外，Two-Stage Generation Pipeline 的长视频 refiner 对舞蹈动作时序一致性优化具有直接参考价值。",
        keyPoints: [
          "Hybrid GDN/Softmax 架构：15 个 GDN 块与 5 个 softmax attention 块交替，实现分钟级上下文的高效建模",
          "Dual-Branch 相机控制：UCPE 全局轨迹 + Plücker 局部运动补偿，RotErr 降至 4.50°/8.34°",
          "可迁移价值：GDN 的帧级循环状态更新机制可替换现有 3D Audio Attention，降低长音乐序列的内存开销"
        ],
        href: "https://arxiv.org/abs/2605.15178",
        paperLink: "SANA-WM: Efficient Minute-Scale World Modeling with Hybrid Linear Diffusion Transformer",
      },
      {
        num: 2,
        tag: "扩散蒸馏",
        title: "Causal Forcing++：面向实时交互视频生成的可扩展少步自回归扩散蒸馏",
        description: "本文将自回归扩散蒸馏推向更激进的低延迟场景：frame-wise 自回归配合仅 1-2 步采样。核心突破是提出 Causal Consistency Distillation (causal CD) 作为 AR 学生模型初始化方法。与传统 Causal ODE Distillation 需要预计算完整 PF-ODE 轨迹不同，causal CD 仅从相邻时间步的单个在线教师 ODE 步获取监督，避免了昂贵的轨迹存储开销（Stage 2 训练成本降低约 4 倍）。在 Wan2.1-1.3B 上的实验表明，frame-wise 2-step 设置下 Causal Forcing++ 相比 4-step chunk-wise Causal Forcing 在 VBench Total 上提升 0.1，首帧延迟降低 50%。对于舞蹈视频生成，这意味着可将当前方案的多步扩散推理压缩到 2 步以内，实现接近实时的生成速度。论文还验证了该方法可自然扩展到 action-conditioned 世界模型（Genie3 范式），为音频条件控制提供了技术路径。",
        keyPoints: [
          "Causal CD 初始化：相邻时间步局部一致性监督，避免完整轨迹预计算，存储开销从 1900GiB 降至 0",
          "Frame-wise 2-step 生成：VBench Total 84.14，首帧延迟降低 50%，训练成本减少 4 倍",
          "迁移价值：可将现有舞蹈生成模型的多步推理蒸馏到 2-step，实现实时交互式生成"
        ],
        href: "https://arxiv.org/abs/2605.15141",
        paperLink: "Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation",
      },
      {
        num: 3,
        tag: "相机控制",
        title: "Warp-as-History：单训练视频实现可泛化相机控制视频生成",
        description: "传统相机控制方法依赖大规模相机标注视频训练或测试时优化。本文提出将相机诱导的 warp 转换为相机 warp 伪历史，通过模型的视觉历史路径注入控制信号。关键设计包括：target-frame positional alignment（将 warp token 的 RoPE 位置与目标帧对齐）和 visible-token selection（移除无效观测区域的历史 token）。令人惊讶的是，这种条件接口在冻结模型上即可产生可测量的零样本相机跟随行为——证明预训练视频生成器已具备解释相机诱导视觉证据的潜在能力。仅需在单个相机标注视频上进行轻量级 LoRA 微调（1000 迭代，约 1 小时 A800），即可稳定该行为并泛化到未见视频。在 DAVIS 动态视频基准上，单视频微调后的方法在 FID (68.18) 和 FVD (57.95) 上优于 Gen3C、Voyager 等需要 7-9 万视频训练的基线。对于舞蹈生成，这一框架提示：参考人物的外观控制或许也可通过类似的 warp-as-history 机制实现，无需重新训练大规模模型。",
        keyPoints: [
          "零样本相机跟随：冻结模型通过历史路径即可解读相机 warp 证据，无需任何训练",
          "单视频 LoRA 微调：1000 迭代（1 小时 A800）即可泛化到未见视频，Camera Control 从 26.42 提升至 62.00",
          "迁移启示：参考人物外观控制或可借鉴 warp-as-history 范式，通过轻量级微调实现个性化"
        ],
        href: "https://arxiv.org/abs/2605.15182",
        paperLink: "Warp-as-History: Generalizable Camera-Controlled Video Generation from One Training Video",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "RAVEN：基于一致性模型 GRPO 的实时自回归视频外推",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2605.15190",
        description: "提出 CM-GRPO 强化学习方法，将一致性采样步骤重新表述为条件高斯转移，直接对其核应用在线 RL。对优化舞蹈视频长时序一致性有参考价值。"
      },
      {
        num: 5,
        title: "RefDecoder：条件视频解码增强视觉生成",
        tag: "VAE 解码器",
        href: "https://arxiv.org/abs/2605.15196",
        description: "通过参考注意力将高保真参考图像信号注入解码过程，可直接集成到现有 I2V 系统提升人物外观一致性，无需额外微调。"
      },
      {
        num: 6,
        title: "EntityBench：面向实体一致的长程多镜头视频生成基准",
        tag: "一致性评估",
        href: "https://arxiv.org/abs/2605.15199",
        description: "提出 140 个 episodes（2491 个镜头）的实体一致性评估基准，EntityMem 记忆机制对舞蹈视频中人物外观保持具有借鉴意义。"
      },
      {
        num: 7,
        title: "PDI-Bench：几何一致性视频世界模型量化评估",
        tag: "评估指标",
        href: "https://arxiv.org/abs/2605.15185",
        description: "基于 SAM 2、MegaSaM 和 CoTracker3 的 3D 几何一致性评估框架，可用于评估舞蹈视频中人体姿态和运动的物理合理性。"
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：视频生成正从「质量优先」转向「效率与可控性并重」。SANA-WM 的 Hybrid Linear Attention 和 Causal Forcing++ 的 2-step 蒸馏都在解决同一个问题——如何在有限算力下实现长视频生成。对于 music-to-dance 任务，这意味着我们可能需要重新评估当前方案的架构选择：3D Audio Attention 虽然有效，但其内存开销随序列长度线性增长；GDN 的帧级循环状态或许能以更低成本实现类似的时序建模。另一个值得关注的信号是「单视频微调」范式的兴起——Warp-as-History 证明，预训练模型已蕴含丰富的视觉控制能力，关键在于设计正确的条件接口。这提示我们：与其从头训练舞蹈专用模型，不如研究如何将参考人物外观、音乐节奏等控制信号转换为模型已能理解的历史条件形式。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-05-17 | Real-Time Video Generation and Camera Control Advances",
    overview: [
      "SANA-WM proposes Hybrid Linear Attention for minute-scale video generation, producing 60s 720p videos in 34s on a single GPU",
      "Causal Forcing++ reduces first-frame latency by 50% with frame-wise 2-step autoregressive diffusion distillation",
      "Warp-as-History achieves zero-shot camera control with only one training video, no large-scale camera-annotated data needed"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model",
        title: "SANA-WM: Efficient Minute-Scale World Modeling with Hybrid Linear Diffusion Transformer",
        description: "SANA-WM is a 2.6B-parameter open-source world model natively trained for one-minute video generation. Its core innovation is the Hybrid Linear Attention architecture that combines frame-wise Gated DeltaNet (GDN) with periodic softmax attention, maintaining long-context modeling capability while keeping memory overhead constant. GDN addresses the drift problem in traditional cumulative linear attention through decay gates and delta-rule correction mechanisms. The Dual-Branch Camera Control design is particularly noteworthy—the latent-rate UCPE branch captures global 6-DoF trajectory structure while the raw-frame Plücker mixing branch recovers fine camera motion within each VAE temporal stride. For music-to-dance tasks, this coarse-to-fine control paradigm can be directly transferred to audio-motion alignment: UCPE layers handle the global structure of music beats while Plücker layers capture fine-grained rhythmic variations. Additionally, the Two-Stage Generation Pipeline's long-video refiner offers direct reference value for optimizing dance motion temporal consistency.",
        keyPoints: [
          "Hybrid GDN/Softmax architecture: 15 GDN blocks interleaved with 5 softmax attention blocks for efficient minute-scale context modeling",
          "Dual-Branch camera control: UCPE global trajectory + Plücker local motion compensation, RotErr reduced to 4.50°/8.34°",
          "Transfer value: GDN's frame-wise recurrent state updates can replace existing 3D Audio Attention to reduce memory overhead for long music sequences"
        ],
        href: "https://arxiv.org/abs/2605.15178",
        paperLink: "SANA-WM: Efficient Minute-Scale World Modeling with Hybrid Linear Diffusion Transformer",
      },
      {
        num: 2,
        tag: "Diffusion Distillation",
        title: "Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation",
        description: "This paper pushes autoregressive diffusion distillation to a more aggressive low-latency regime: frame-wise autoregression with only 1-2 sampling steps. The key breakthrough is Causal Consistency Distillation (causal CD) for AR student initialization. Unlike traditional Causal ODE Distillation that requires precomputing complete PF-ODE trajectories, causal CD obtains supervision from only a single online teacher ODE step between adjacent timesteps, avoiding expensive trajectory storage overhead (Stage 2 training cost reduced by ~4×). Experiments on Wan2.1-1.3B show that under frame-wise 2-step settings, Causal Forcing++ achieves 0.1 improvement in VBench Total over 4-step chunk-wise Causal Forcing while reducing first-frame latency by 50%. For dance video generation, this means the current multi-step diffusion inference can be compressed to within 2 steps, enabling near real-time generation speed. The paper also verifies that this method naturally extends to action-conditioned world models (Genie3 paradigm), providing a technical path for audio-conditioned control.",
        keyPoints: [
          "Causal CD initialization: Local consistency supervision between adjacent timesteps avoids full trajectory precomputation, storage overhead reduced from 1900GiB to 0",
          "Frame-wise 2-step generation: VBench Total 84.14, first-frame latency reduced by 50%, training cost reduced by 4×",
          "Transfer value: Can distill existing dance generation models from multi-step inference to 2-step for real-time interactive generation"
        ],
        href: "https://arxiv.org/abs/2605.15141",
        paperLink: "Causal Forcing++: Scalable Few-Step Autoregressive Diffusion Distillation for Real-Time Interactive Video Generation",
      },
      {
        num: 3,
        tag: "Camera Control",
        title: "Warp-as-History: Generalizable Camera-Controlled Video Generation from One Training Video",
        description: "Traditional camera control methods rely on large-scale camera-annotated video training or test-time optimization. This paper proposes converting camera-induced warps into camera-warped pseudo-history, injecting control signals through the model's visual history pathway. Key designs include target-frame positional alignment (aligning warp token RoPE positions with target frames) and visible-token selection (removing history tokens from invalid observation regions). Surprisingly, this conditioning interface produces measurable zero-shot camera-following behavior on frozen models—demonstrating that pretrained video generators already possess latent capabilities to interpret camera-induced visual evidence. Only lightweight LoRA finetuning on a single camera-annotated video (1000 iterations, ~1 hour A800) is needed to stabilize this behavior and generalize to unseen videos. On the DAVIS dynamic video benchmark, the single-video finetuned method achieves better FID (68.18) and FVD (57.95) than Gen3C, Voyager, and other baselines requiring 70-90K videos for training. For dance generation, this framework suggests that reference person appearance control might also be achievable through similar warp-as-history mechanisms without retraining large-scale models.",
        keyPoints: [
          "Zero-shot camera following: Frozen models can interpret camera warp evidence through history pathway without any training",
          "Single-video LoRA finetuning: 1000 iterations (1 hour A800) generalizes to unseen videos, Camera Control improved from 26.42 to 62.00",
          "Transfer insight: Reference person appearance control may borrow from the warp-as-history paradigm through lightweight finetuning"
        ],
        href: "https://arxiv.org/abs/2605.15182",
        paperLink: "Warp-as-History: Generalizable Camera-Controlled Video Generation from One Training Video",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "RAVEN: Real-time Autoregressive Video Extrapolation with Consistency-model GRPO",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2605.15190",
        description: "Proposes CM-GRPO reinforcement learning method reformulating consistency sampling as conditional Gaussian transitions, applying online RL directly to the kernel. Valuable for optimizing long-term temporal consistency in dance video generation."
      },
      {
        num: 5,
        title: "RefDecoder: Enhancing Visual Generation with Conditional Video Decoding",
        tag: "VAE Decoder",
        href: "https://arxiv.org/abs/2605.15196",
        description: "Injects high-fidelity reference image signals into the decoding process via reference attention, can be directly integrated into existing I2V systems to improve subject appearance consistency without additional finetuning."
      },
      {
        num: 6,
        title: "EntityBench: Towards Entity-Consistent Long-Range Multi-Shot Video Generation",
        tag: "Consistency Evaluation",
        href: "https://arxiv.org/abs/2605.15199",
        description: "Proposes entity consistency evaluation benchmark with 140 episodes (2491 shots), EntityMem memory mechanism offers reference value for maintaining person appearance in dance videos."
      },
      {
        num: 7,
        title: "PDI-Bench: Quantitative Video World Model Evaluation for Geometric-Consistency",
        tag: "Evaluation Metrics",
        href: "https://arxiv.org/abs/2605.15185",
        description: "3D geometric consistency evaluation framework based on SAM 2, MegaSaM, and CoTracker3, applicable for assessing physical plausibility of human poses and motion in dance videos."
      },
    ],
    observation: "Today's papers reveal a clear technical trend: video generation is shifting from 'quality-first' to 'efficiency and controllability equally important.' Both SANA-WM's Hybrid Linear Attention and Causal Forcing++'s 2-step distillation address the same problem—how to achieve long video generation with limited compute. For music-to-dance tasks, this suggests we may need to reevaluate current architectural choices: while 3D Audio Attention is effective, its memory overhead grows linearly with sequence length; GDN's frame-wise recurrent states might achieve similar temporal modeling at lower cost. Another noteworthy signal is the rise of the 'single-video finetuning' paradigm—Warp-as-History demonstrates that pretrained models already contain rich visual control capabilities; the key lies in designing the right conditioning interface. This hints that rather than training dance-specific models from scratch, we should investigate how to convert control signals like reference person appearance and music rhythm into history conditioning forms that models already understand.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-17`,
        'en': `/en/daily/music-to-dance/2026-05-17`,
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
      date="2026-05-17"
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