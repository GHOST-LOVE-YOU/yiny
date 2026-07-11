import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "实时运动生成与长视频自蒸馏",
    overview: [
      "ARDY 实现 33ms 延迟的实时人体运动生成，支持文本+运动学约束的在线控制",
      "OPSD-V 提出长视频自蒸馏范式，缓解 AR 视频生成的误差累积问题",
      "LongE2V 通过 Autoregressive Unrolling 实现长时序视频生成的稳定性"
    ],
    papers: [
      {
        num: 1,
        tag: "运动生成",
        title: "ARDY: 混合表示的实时交互式人体运动生成",
        description: "ARDY 是一个流式人体运动生成框架，通过混合表示（显式根轨迹特征 + 隐式身体嵌入）实现了 33ms 的生成延迟。论文提出的两阶段自回归扩散去噪器支持可变历史上下文（最长 8 秒）和长程运动学约束（最长 10 秒），在 HumanML3D 和 Bones Rigplay 数据集上验证了高质量运动生成和约束遵循能力。对于音乐驱动舞蹈生成，ARDY 的实时性能使其可直接用于交互式预览场景，而混合表示的设计思路对姿态控制模块有借鉴价值。",
        keyPoints: [
          "混合表示：显式根特征实现精确轨迹控制，隐式身体嵌入保证生成效率",
          "两阶段去噪：先预测根轨迹，再预测身体嵌入，两阶段在去噪循环中交错进行",
          "33ms 延迟：4 步扩散模型实现实时生成，支持在线文本提示和键盘鼠标交互"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "视频生成",
        title: "OPSD-V: 长视频自蒸馏缓解 AR 生成误差累积",
        description: "OPSD-V 针对少步自回归视频生成器的长程退化问题，提出了一种 on-policy 自蒸馏训练范式。核心创新是将真实长视频作为 privileged temporal context 构建更干净的教师分布：学生遵循推理时的 rollout 写入自生成 KV cache，教师则在相同去噪状态使用由真实视频构建的 AR-consistent temporal cache。在 Self-Forcing 和 LongLive 上的实验表明，该方法在不改变采样器、步数和推理 cache 机制的前提下，显著提升了视觉质量、运动动态和 VBenchLong 分数。对于长舞蹈视频生成，这种 error accumulation 缓解机制尤为重要。",
        keyPoints: [
          "On-policy 自蒸馏：学生在自生成轨迹上训练，教师使用真实长视频上下文",
          "AR-consistent cache：教师 cache 中旧历史替换为真实视频，最新 chunk 保持学生生成",
          "密集监督：在 student-visited 去噪状态提供逐点 corrective targets"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
      {
        num: 3,
        tag: "视频生成",
        title: "LongE2V: 长时序事件相机视频重建与预测",
        description: "LongE2V 利用预训练视频扩散先验（CogVideoX）联合处理事件相机的视频重建、预测和插帧任务。论文提出 Autoregressive Unrolling 训练策略弥合训练-推理分布差距：初始用 GT 上下文训练至收敛，随后用模型自身预测替换上下文进行迭代微调。Adaptive Context Switching 动态调整时序依赖以缓解漂移，Reencoding Alignment 与 Cross Residual Correction 解决 3D VAE  latent 空间的时序不对齐问题。对于舞蹈视频生成，这些长时序稳定性技术可直接迁移。",
        keyPoints: [
          "Autoregressive Unrolling：迭代用自生成预测替换 GT 上下文，强制模型适应自身误差",
          "Adaptive Context Switching：动态更新上下文，防止固定调度导致的时序漂移",
          "Event Voxel Density Augmentation：随机 resize 事件体素增强不同传感器分辨率的鲁棒性"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "OpenCoF: 通过视频生成学习推理",
        tag: "视频推理",
        href: "https://arxiv.org/abs/2607.08763",
        description: "Chain-of-Frame (CoF) 视频推理框架，提出视觉+文本推理 token 机制，对音乐-动作时序对齐有启发。",
      },
      {
        num: 5,
        title: "LingBot-Video: 面向具身智能的 MoE 视频预训练",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2607.07675",
        description: "DiT-MoE 架构结合物理合理性奖励，对舞蹈动作真实性评估有参考价值。",
      },
      {
        num: 6,
        title: "LaMem-VLA: 机器人操作的双潜记忆 VLA 模型",
        tag: "VLA",
        href: "https://arxiv.org/abs/2607.07608",
        description: "长短时互补记忆库设计，长时序依赖处理对长舞蹈序列建模有借鉴。",
      },
      {
        num: 7,
        title: "ReChannel: DiT 的像素空间密集预测",
        tag: "姿态估计",
        href: "https://arxiv.org/abs/2607.06553",
        description: "丢弃 VAE 解码器，token-local linear head 直接输出密集预测，可用于舞蹈姿态估计。",
      },
    ],
    observation: "今日三篇重点关注论文均围绕「长时序稳定性」这一核心问题：ARDY 通过混合表示和两阶段去噪实现实时可控生成，OPSD-V 用自蒸馏缓解 AR 生成的误差累积，LongE2V 则以 Autoregressive Unrolling 弥合训练-推理差距。对于分钟级舞蹈视频生成，这些技术的组合可能是关键路径——实时预览需要 ARDY 的低延迟，长序列稳定性需要 OPSD-V 的自蒸馏，而训练-推理对齐则可借鉴 LongE2V 的 unrolling 策略。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Real-time Motion Generation & Long-Video Self-Distillation",
    overview: [
      "ARDY achieves 33ms latency for real-time human motion generation with online text and kinematic control",
      "OPSD-V proposes on-policy self-distillation to mitigate error accumulation in AR video generation",
      "LongE2V enables stable long-horizon video generation through Autoregressive Unrolling"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "ARDY: Real-Time Interactive Human Motion Generation with Hybrid Representation",
        description: "ARDY is a streaming human motion generation framework that achieves 33ms generation latency through a hybrid representation (explicit root trajectory features + latent body embedding). The proposed two-stage autoregressive diffusion denoiser supports variable history context (up to 8s) and long-horizon kinematic constraints (up to 10s), demonstrating high-quality motion generation and constraint adherence on HumanML3D and Bones Rigplay datasets. For music-driven dance generation, ARDY's real-time performance enables interactive preview scenarios, and its hybrid representation design provides insights for pose control modules.",
        keyPoints: [
          "Hybrid representation: explicit root features for precise trajectory control, latent body embedding for efficient generation",
          "Two-stage denoising: root trajectory prediction followed by body embedding prediction, interleaved within the denoising loop",
          "33ms latency: 4-step diffusion model enables real-time generation with online text prompting and keyboard/mouse interaction"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "Video Generation",
        title: "OPSD-V: On-Policy Self-Distillation for AR Video Generators",
        description: "OPSD-V addresses long-horizon degradation in few-step autoregressive video generators through an on-policy self-distillation training paradigm. The key innovation uses real long videos as privileged temporal context to construct cleaner teacher distributions: the student follows inference-time rollout writing to self-generated KV cache, while the teacher uses AR-consistent temporal cache built from real videos at the same denoising states. Experiments on Self-Forcing and LongLive show significant improvements in visual quality, motion dynamics, and VBenchLong scores without changing the sampler, steps, or inference cache mechanism. This error accumulation mitigation is particularly crucial for long dance video generation.",
        keyPoints: [
          "On-policy self-distillation: student trains on self-generated trajectories, teacher uses real long-video context",
          "AR-consistent cache: teacher replaces old history with real video while keeping the most recent chunk student-generated",
          "Dense supervision: provides point-wise corrective targets at student-visited denoising states"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
      {
        num: 3,
        tag: "Video Generation",
        title: "LongE2V: Long-Horizon Event-based Video Reconstruction and Prediction",
        description: "LongE2V leverages pre-trained video diffusion priors (CogVideoX) to jointly handle event-based video reconstruction, prediction, and frame interpolation. The paper proposes Autoregressive Unrolling to bridge the train-inference distribution gap: initially training with GT context until convergence, then iteratively fine-tuning with model predictions replacing context. Adaptive Context Switching dynamically adjusts temporal dependencies to mitigate drift, while Reencoding Alignment and Cross Residual Correction address temporal misalignment in 3D VAE latent space. These long-horizon stability techniques are directly transferable to dance video generation.",
        keyPoints: [
          "Autoregressive Unrolling: iteratively replaces GT context with self-generated predictions, forcing model adaptation to its own errors",
          "Adaptive Context Switching: dynamically updates context to prevent temporal drift from fixed schedules",
          "Event Voxel Density Augmentation: random resizing of event voxels enhances robustness across sensor resolutions"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "OpenCoF: Learning to Reason Through Video Generation",
        tag: "Video Reasoning",
        href: "https://arxiv.org/abs/2607.08763",
        description: "Chain-of-Frame (CoF) video reasoning framework with visual+textual reasoning tokens, offering insights for music-motion temporal alignment.",
      },
      {
        num: 5,
        title: "LingBot-Video: MoE Video Pretraining for Embodied Intelligence",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2607.07675",
        description: "DiT-MoE architecture with physical plausibility rewards, relevant for dance motion realism evaluation.",
      },
      {
        num: 6,
        title: "LaMem-VLA: Dual Latent Memory for Robotic Manipulation",
        tag: "VLA",
        href: "https://arxiv.org/abs/2607.07608",
        description: "Complementary short-term and long-term memory vaults design, applicable to long dance sequence modeling.",
      },
      {
        num: 7,
        title: "ReChannel: Pixel-Space Dense Prediction with DiT",
        tag: "Pose Estimation",
        href: "https://arxiv.org/abs/2607.06553",
        description: "Drops VAE decoder, uses token-local linear head for dense prediction, applicable to dance pose estimation.",
      },
    ],
    observation: "Today's three must-read papers all address the core challenge of 'long-horizon stability': ARDY achieves real-time controllable generation through hybrid representation and two-stage denoising; OPSD-V mitigates error accumulation in AR generation via self-distillation; LongE2V bridges the train-inference gap through Autoregressive Unrolling. For minute-long dance video generation, combining these techniques may be the key path—real-time preview requires ARDY's low latency, long-sequence stability needs OPSD-V's self-distillation, and train-inference alignment can leverage LongE2V's unrolling strategy.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-10`,
        'en': `/en/daily/music-to-dance/2026-07-10`,
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
      date="2026-07-10"
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
