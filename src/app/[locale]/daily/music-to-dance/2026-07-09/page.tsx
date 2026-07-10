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
      "ARDY 提出流式自回归扩散框架，4步推理实现33ms延迟的实时人体运动生成",
      "RynnWorld-Teleop 的数字遥操作范式为舞蹈数据合成提供可扩展引擎",
      "OPSD-V 的 on-policy 自蒸馏有效缓解长视频生成的误差累积问题"
    ],
    papers: [
      {
        num: 1,
        tag: "运动生成",
        title: "ARDY：混合表征的实时交互式人体运动生成",
        description: "ARDY 是 NVIDIA 提出的流式运动生成框架，核心创新在于混合表征设计：显式根轨迹特征 + 隐式身体潜码。两阶段自回归去噪器先预测根轨迹、再预测身体姿态，在 4 步扩散推理下实现平均 33ms 的生成延迟。其变量历史上下文机制支持最长 8 秒的历史记忆和 10 秒的未来预测窗口，远超现有在线方法（DiP 仅 1 秒历史）。对于舞蹈生成任务，ARDY 的流式架构可直接迁移——当前方案需要等待完整序列生成，而 ARDY 的逐块生成模式可实现实时预览与交互控制。其运动约束接口（根轨迹、关键帧、末端执行器位置）也与舞蹈编排中的节拍标记和姿态约束天然契合。",
        keyPoints: [
          "混合表征：显式根特征 + 潜码身体嵌入，平衡轨迹控制与生成效率",
          "两阶段去噪：根轨迹预测 → 身体姿态预测，交替优化确保一致性",
          "33ms 延迟：4 步扩散推理，满足实时交互需求"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "数据合成",
        title: "RynnWorld-Teleop：数字遥操作的动作条件世界模型",
        description: "RynnWorld-Teleop 提出「数字遥操作」新范式：操作者的手部姿态流驱动生成式世界模型，从单张参考图合成机器人视角视频。关键设计包括深度感知的骨骼渲染（用相机深度调制关节颜色和半径）、渐进式人-机器人跨域训练、以及流式自回归蒸馏实现 40+ FPS 实时生成。对于舞蹈视频生成，该范式可直接作为数据引擎——姿态流作为与 embodiment 无关的动作标签，可重定向到任意角色骨架，生成的视频则提供配对的视觉观测。这解决了舞蹈领域训练数据稀缺的核心瓶颈：无需真实机器人或舞者，即可大规模合成（姿态, 视频）配对数据。",
        keyPoints: [
          "数字遥操作：姿态流驱动生成，解耦数据收集与物理硬件",
          "深度感知骨骼：21 关节手部姿态用深度调制渲染，提供 3D 空间线索",
          "40+ FPS 实时：流式自回归蒸馏实现单 H100 实时交互生成"
        ],
        href: "https://arxiv.org/abs/2607.06558",
        paperLink: "RynnWorld-Teleop: An Action-Conditioned World Model for Digital Teleoperation",
      },
      {
        num: 3,
        tag: "视频生成",
        title: "OPSD-V：面向少步自回归视频生成器的 On-Policy 自蒸馏",
        description: "OPSD-V 针对少步自回归视频生成器的长时程退化问题，提出 on-policy 自蒸馏后训练框架。核心洞察：现有 DMD 蒸馏的监督信号来自双向短片段教师，无法有效监督真正的长自回归轨迹。OPSD-V 在训练时引入真实长视频作为 privileged temporal context——学生遵循推理时的 rollout 写入自生成 KV cache，教师则在相同去噪状态使用由真实视频构建的 cleaner cache。这种设计在不改变采样器、去噪步数或推理 cache 机制的前提下，提供密集的轨迹级监督。对于舞蹈视频生成，OPSD-V 可直接应用于基于自回归的视频扩散模型，缓解长舞蹈序列生成中的误差累积和运动动态衰减问题。",
        keyPoints: [
          "On-policy 自蒸馏：学生在自生成轨迹上训练，教师用真实视频上下文提供 cleaner 目标",
          "Cache-aware 监督：在相同去噪状态对比学生/教师的 velocity 预测",
          "长视频增益：在 Self-Forcing 和 LongLive 上均提升视觉质量与运动动态"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "RynnWorld-4D：4D 具身世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2607.06559",
        description: "同步生成 RGB、深度和光流的三分支架构，为舞蹈视频生成提供几何-运动联合表示。",
      },
      {
        num: 5,
        title: "LingBot-Video：MoE 视频预训练",
        tag: "架构",
        href: "https://arxiv.org/abs/2607.07675",
        description: "Mixture-of-Experts 架构在保持推理效率的同时扩展模型容量，可作为舞蹈生成骨干。",
      },
      {
        num: 6,
        title: "SenseNova-Vision：统一多模态生成视觉",
        tag: "统一框架",
        href: "https://arxiv.org/abs/2607.06560",
        description: "将多种视觉任务统一为生成问题，其指令-响应范式可启发多条件舞蹈控制设计。",
      },
      {
        num: 7,
        title: "LightCrafter：PBR 条件视频扩散重光照",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2607.08016",
        description: "PBR 代理视频范式实现可控重光照，可应用于舞蹈场景的光照一致性控制。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Real-Time Motion Generation & Long-Video Self-Distillation",
    overview: [
      "ARDY proposes a streaming autoregressive diffusion framework achieving 33ms latency with 4-step inference",
      "RynnWorld-Teleop's digital teleoperation paradigm provides a scalable engine for dance data synthesis",
      "OPSD-V's on-policy self-distillation effectively mitigates error accumulation in long video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "ARDY: Real-Time Interactive Human Motion Generation via Hybrid Representation",
        description: "ARDY is NVIDIA's streaming motion generation framework. Its core innovation is the hybrid representation design: explicit root trajectory features + implicit body latent codes. The two-stage autoregressive denoiser first predicts root trajectories, then body poses, achieving an average 33ms generation latency with 4-step diffusion inference. Its variable history context mechanism supports up to 8 seconds of history memory and 10 seconds of future prediction—far exceeding existing online methods (DiP only has 1 second). For dance generation, ARDY's streaming architecture enables real-time preview and interactive control, while its motion constraint interface naturally aligns with beat markers and pose constraints in choreography.",
        keyPoints: [
          "Hybrid representation: explicit root features + latent body embedding balances trajectory control and efficiency",
          "Two-stage denoising: root prediction → body prediction with alternating optimization",
          "33ms latency: 4-step diffusion inference meets real-time interactive requirements"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "Data Synthesis",
        title: "RynnWorld-Teleop: Digital Teleoperation via Action-Conditioned World Models",
        description: "RynnWorld-Teleop introduces the 'digital teleoperation' paradigm: operator hand-pose streams drive a generative world model to synthesize robot-centric videos from a single reference image. Key designs include depth-aware skeletal rendering, progressive human-to-robot training, and streaming autoregressive distillation for 40+ FPS real-time generation. For dance video synthesis, this paradigm serves as a data engine—pose streams act as embodiment-agnostic action labels retargetable to any skeleton, while generated videos provide paired visual observations. This addresses the core bottleneck of scarce training data in dance: no real robots or dancers needed for large-scale (pose, video) pair synthesis.",
        keyPoints: [
          "Digital teleoperation: pose-driven generation decouples data collection from physical hardware",
          "Depth-aware skeleton: 21-joint hand poses with depth-modulated rendering provide 3D spatial cues",
          "40+ FPS real-time: streaming autoregressive distillation on single H100"
        ],
        href: "https://arxiv.org/abs/2607.06558",
        paperLink: "RynnWorld-Teleop: An Action-Conditioned World Model for Digital Teleoperation",
      },
      {
        num: 3,
        tag: "Video Generation",
        title: "OPSD-V: On-Policy Self-Distillation for Few-Step AR Video Generators",
        description: "OPSD-V addresses long-horizon degradation in few-step autoregressive video generators via on-policy self-distillation post-training. Key insight: existing DMD distillation uses bidirectional short-clip teachers that cannot supervise true long AR trajectories. OPSD-V introduces real long videos as privileged temporal context—the student follows inference-time rollout writing to self-generated KV cache, while the teacher uses cleaner cache built from real videos at the same denoising states. This provides dense trajectory-level supervision without changing the sampler, denoising steps, or inference cache mechanism. For dance video generation, OPSD-V can be directly applied to AR video diffusion models to mitigate error accumulation and motion dynamics decay in long dance sequences.",
        keyPoints: [
          "On-policy self-distillation: student trains on self-generated trajectory, teacher provides cleaner targets with real video context",
          "Cache-aware supervision: velocity prediction comparison at identical denoising states",
          "Long-video gains: consistent improvements on Self-Forcing and LongLive baselines"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "RynnWorld-4D: 4D Embodied World Models",
        tag: "World Models",
        href: "https://arxiv.org/abs/2607.06559",
        description: "Tri-branch architecture co-generating RGB, depth, and optical flow for geometry-motion joint representation in dance video generation.",
      },
      {
        num: 5,
        title: "LingBot-Video: MoE Video Pretraining",
        tag: "Architecture",
        href: "https://arxiv.org/abs/2607.07675",
        description: "Mixture-of-Experts architecture scales model capacity while maintaining inference efficiency, suitable as dance generation backbone.",
      },
      {
        num: 6,
        title: "SenseNova-Vision: Unified Multimodal Generation Vision",
        tag: "Unified Framework",
        href: "https://arxiv.org/abs/2607.06560",
        description: "Unifies diverse vision tasks as generation problems; its instruction-response paradigm inspires multi-condition dance control design.",
      },
      {
        num: 7,
        title: "LightCrafter: PBR-Conditioned Video Diffusion Relighting",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2607.08016",
        description: "PBR proxy video paradigm enables controllable relighting, applicable to illumination consistency control in dance scenes.",
      },
    ],
    observation: "",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-09`,
        'en': `/en/daily/music-to-dance/2026-07-09`,
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
      date="2026-07-09"
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
