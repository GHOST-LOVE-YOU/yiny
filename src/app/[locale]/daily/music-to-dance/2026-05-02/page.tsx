import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-05-02 | 视觉生成新纪元：从原子映射到智能世界建模",
    overview: [
      "视觉生成领域正经历从「像素渲染」到「智能世界建模」的范式转变",
      "ExoActor 提出用第三人称视频生成作为人形机器人控制的新范式",
      "PhyCo 将物理一致性控制引入视频生成，为舞蹈动作的真实感提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "视觉生成综述",
        title: "视觉生成新纪元：从原子映射到智能世界建模的五级进化",
        description: "这篇综述提出了视觉智能的五级分类体系（Atomic → Conditional → In-Context → Agentic → World-Modeling），为理解当前视觉生成模型的能力边界提供了清晰框架。对于 music-to-dance 任务，最具启发的是 Level 3（In-Context Generation）和 Level 4（Agentic Generation）的讨论：前者强调在多轮编辑中保持身份一致性和像素级保真，后者则关注闭环控制中的验证与自校正机制。论文指出的核心挑战——长程一致性、时序动态建模、因果理解——恰好是舞蹈视频生成的痛点。特别值得关注的是文中对 Flow Matching、统一理解-生成模型、以及推理加速技术的系统性梳理，这些技术路线可直接用于改进扩散模型的采样效率和音频-动作对齐精度。",
        keyPoints: [
          "提出五级视觉智能分类法，明确当前扩散模型处于 L2-L3 阶段，向 L4 智能体生成演进",
          "Flow Matching 和 Rectified Flow 技术可将采样步数从数百降至个位数，显著提升推理效率",
          "In-Context Generation 的累积上下文机制可用于多段音乐舞蹈序列的连贯生成"
        ],
        href: "https://arxiv.org/abs/2604.28185",
        paperLink: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
      },
      {
        num: 2,
        tag: "视频生成与控制",
        title: "ExoActor：用第三人称视频生成实现可泛化的人形机器人交互控制",
        description: "ExoActor 的核心创新是将视频生成模型作为人形机器人控制的统一接口。系统首先通过 robot-to-human embodiment transfer 将机器人视角转换为人形视角，然后生成任务执行的第三人称视频，再通过运动估计模块提取 3D 人体运动，最后由通用运动控制器执行。这一「视觉想象→物理执行」的范式对 music-to-dance 极具启发：我们可以将音频作为条件，生成目标人物跟随音乐起舞的视频，再从中提取舞蹈动作。论文中的动作分解（Task-to-Action Decomposition）和分步提示构造方法，可直接迁移到音频驱动的舞蹈生成——将音乐节拍分解为具体的动作单元，再逐段生成视频。此外，论文对视频生成模型（Kling、Veo、Wan）的对比分析也为舞蹈视频生成模型的选型提供了参考。",
        keyPoints: [
          "提出'视频生成+运动估计+运动执行'的三阶段范式，实现零样本任务泛化",
          "Robot-to-Human Embodiment Transfer 技术解决机器人与人体形态差异问题",
          "动作分解与分步提示构造方法可用于将长音乐序列拆解为可生成的舞蹈单元"
        ],
        href: "https://arxiv.org/abs/2604.27711",
        paperLink: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
      },
      {
        num: 3,
        tag: "物理一致性生成",
        title: "PhyCo：为生成式运动学习可控的物理先验",
        description: "PhyCo 针对视频扩散模型物理一致性不足的问题，提出了一套完整的物理属性控制框架。通过构建 10 万+ 物理仿真视频数据集，使用 ControlNet 架构对预训练扩散模型进行物理监督微调，并引入 VLM 引导的奖励优化，实现了对摩擦、弹性、形变、外力等物理属性的连续控制。对于 music-to-dance 任务，物理真实感是舞蹈动作自然度的关键——舞者的重心转移、肢体碰撞、布料飘动都需要符合物理规律。PhyCo 的 VLM 引导奖励优化思路可直接迁移：训练一个评估舞蹈动作物理合理性的 VLM，将其作为奖励模型来优化扩散模型的生成结果。此外，论文提出的像素级物理属性图条件控制方法，也可用于实现对舞蹈风格（如力度、速度）的精细控制。",
        keyPoints: [
          "构建 100K+ 物理仿真数据集，涵盖摩擦、弹性、形变、外力四种物理属性",
          "ControlNet + VLM 奖励优化的两阶段训练实现物理一致的可控生成",
          "无需显式物理仿真器即可在推理时生成物理合理的视频"
        ],
        href: "https://arxiv.org/abs/2604.28169",
        paperLink: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "异构科学基础模型协作框架 Eywa",
        tag: "多智能体系统",
        href: "https://arxiv.org/abs/2604.27351",
        description: "Eywa 将语言模型与领域专用基础模型结合，其多模态协作机制可为 music-to-dance 的音频-视觉-动作多模态融合提供架构参考。",
      },
      {
        num: 5,
        title: "MoCapAnything V2：端到端任意骨骼运动捕捉",
        tag: "运动捕捉",
        href: "https://arxiv.org/abs/2604.28130",
        description: "端到端动作捕捉的旋转预测方法可为舞蹈动作的骨骼动画生成提供更精确的关节角度估计。",
      },
      {
        num: 6,
        title: "视觉生成的表示空间 Fréchet 损失",
        tag: "训练目标",
        href: "https://arxiv.org/abs/2604.28190",
        description: "FD-loss 训练目标可直接用于改进舞蹈视频生成的质量评估和训练稳定性。",
      },
      {
        num: 7,
        title: "X-WAM：异步去噪的统一 4D 世界动作建模",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.26694",
        description: "异步去噪采样 (ANS) 方法可为实时舞蹈视频生成提供加速思路，平衡生成质量与推理速度。",
      },
      {
        num: 8,
        title: "Edit-R1：基于验证器的图像编辑强化学习",
        tag: "强化学习",
        href: "https://arxiv.org/abs/2604.27505",
        description: "基于验证器的强化学习方法可用于优化舞蹈动作生成的奖励模型，提升动作质量的可控性。",
      },
    ],
    observation: "本周论文呈现出一个清晰的信号：视觉生成领域正在从'外观合成'向'物理一致、时序连贯、因果合理'的智能生成演进。对于 music-to-dance 任务，这意味着我们需要关注的不仅是如何让生成的舞蹈'看起来对'，更是如何让动作'物理上合理、时序上连贯、风格上可控'。ExoActor 和 PhyCo 分别代表了两个关键方向：前者展示了视频生成作为动作控制接口的可行性，后者则提供了物理约束下的可控生成方法。将这两条路线结合——用音频条件生成舞蹈视频，同时引入物理一致性约束——可能是提升舞蹈生成质量的重要路径。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-05-02 | Visual Generation in the New Era: From Atomic Mapping to Agentic World Modeling",
    overview: [
      "The visual generation field is undergoing a paradigm shift from 'pixel rendering' to 'intelligent world modeling'",
      "ExoActor proposes third-person video generation as a new paradigm for humanoid robot control",
      "PhyCo introduces physical consistency control into video generation, offering new ideas for realistic dance motion"
    ],
    papers: [
      {
        num: 1,
        tag: "Visual Generation Survey",
        title: "Visual Generation in the New Era: A Five-Level Evolution from Atomic Mapping to Agentic World Modeling",
        description: "This survey proposes a five-level taxonomy of visual intelligence (Atomic → Conditional → In-Context → Agentic → World-Modeling), providing a clear framework for understanding the capability boundaries of current visual generation models. For music-to-dance tasks, the most inspiring discussions are around Level 3 (In-Context Generation) and Level 4 (Agentic Generation): the former emphasizes maintaining identity consistency and pixel-level fidelity across multi-turn editing, while the latter focuses on verification and self-correction mechanisms in closed-loop control. The core challenges identified—long-horizon consistency, temporal dynamic modeling, and causal understanding—are precisely the pain points in dance video generation. Particularly noteworthy is the systematic review of Flow Matching, unified understanding-generation models, and inference acceleration techniques, which can be directly applied to improve sampling efficiency and audio-motion alignment precision in diffusion models.",
        keyPoints: [
          "Proposes a five-level taxonomy of visual intelligence, positioning current diffusion models at L2-L3 stage, evolving toward L4 agentic generation",
          "Flow Matching and Rectified Flow techniques can reduce sampling steps from hundreds to single digits, significantly improving inference efficiency",
          "In-Context Generation's cumulative context mechanism can be used for coherent generation of multi-segment music-dance sequences"
        ],
        href: "https://arxiv.org/abs/2604.28185",
        paperLink: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
      },
      {
        num: 2,
        tag: "Video Generation & Control",
        title: "ExoActor: Exocentric Video Generation for Generalizable Interactive Humanoid Control",
        description: "ExoActor's core innovation is using video generation models as a unified interface for humanoid robot control. The system first converts robot perspective to human-like perspective via robot-to-human embodiment transfer, then generates third-person videos of task execution, extracts 3D human motion through motion estimation, and finally executes via a general motion controller. This 「visual imagination → physical execution」 paradigm is highly inspiring for music-to-dance: we can use audio as a condition to generate videos of target characters dancing to music, then extract dance motions from them. The paper's action decomposition (Task-to-Action Decomposition) and step-wise prompt construction methods can be directly transferred to audio-driven dance generation—decomposing music beats into specific action units and generating videos segment by segment. Additionally, the comparative analysis of video generation models (Kling, Veo, Wan) provides reference for model selection in dance video generation.",
        keyPoints: [
          "Proposes a three-stage paradigm of 'video generation + motion estimation + motion execution' for zero-shot task generalization",
          "Robot-to-Human Embodiment Transfer technique addresses the morphological gap between robots and humans",
          "Action decomposition and step-wise prompt construction methods can be used to break down long music sequences into generatable dance units"
        ],
        href: "https://arxiv.org/abs/2604.27711",
        paperLink: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
      },
      {
        num: 3,
        tag: "Physical Consistency Generation",
        title: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
        description: "Addressing the insufficient physical consistency in video diffusion models, PhyCo proposes a complete framework for physical attribute control. By constructing a dataset of 100K+ physics-simulation videos, using ControlNet architecture for physics-supervised fine-tuning of pretrained diffusion models, and introducing VLM-guided reward optimization, it achieves continuous control over physical attributes including friction, restitution, deformation, and external force. For music-to-dance tasks, physical realism is key to the naturalness of dance motions—dancers' weight shifts, limb collisions, and fabric movements all need to follow physical laws. PhyCo's VLM-guided reward optimization approach can be directly transferred: train a VLM that evaluates the physical plausibility of dance motions and use it as a reward model to optimize the diffusion model's generation results. Additionally, the paper's pixel-level physical property map conditioning method can also be used for fine-grained control over dance styles (e.g., intensity, speed).",
        keyPoints: [
          "Constructs 100K+ physics simulation dataset covering four physical attributes: friction, restitution, deformation, and external force",
          "Two-stage training of ControlNet + VLM reward optimization achieves physically consistent controllable generation",
          "Generates physically plausible videos at inference time without explicit physics simulators"
        ],
        href: "https://arxiv.org/abs/2604.28169",
        paperLink: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Eywa: Heterogeneous Scientific Foundation Model Collaboration",
        tag: "Multi-Agent Systems",
        href: "https://arxiv.org/abs/2604.27351",
        description: "Eywa combines language models with domain-specific foundation models, offering architectural reference for audio-visual-motion multimodal fusion in music-to-dance.",
      },
      {
        num: 5,
        title: "MoCapAnything V2: End-to-End Motion Capture for Arbitrary Skeletons",
        tag: "Motion Capture",
        href: "https://arxiv.org/abs/2604.28130",
        description: "End-to-end motion capture rotation prediction methods can provide more accurate joint angle estimation for skeletal animation generation in dance motions.",
      },
      {
        num: 6,
        title: "Representation Fréchet Loss for Visual Generation",
        tag: "Training Objectives",
        href: "https://arxiv.org/abs/2604.28190",
        description: "FD-loss training objective can be directly applied to improve quality assessment and training stability for dance video generation.",
      },
      {
        num: 7,
        title: "X-WAM: Unified 4D World Action Modeling with Asynchronous Denoising",
        tag: "World Models",
        href: "https://arxiv.org/abs/2604.26694",
        description: "Asynchronous Noise Sampling (ANS) method can provide acceleration ideas for real-time dance video generation, balancing generation quality and inference speed.",
      },
      {
        num: 8,
        title: "Edit-R1: Verifier-Based Reinforcement Learning for Image Editing",
        tag: "Reinforcement Learning",
        href: "https://arxiv.org/abs/2604.27505",
        description: "Verifier-based reinforcement learning methods can be used to optimize reward models for dance motion generation, improving controllability of motion quality.",
      },
    ],
    observation: "This week's papers send a clear signal: the visual generation field is evolving from 「appearance synthesis」 toward 「physically consistent, temporally coherent, causally reasonable」 intelligent generation. For music-to-dance tasks, this means we need to focus not only on making generated dances 「look right」, but also on making motions 「physically plausible, temporally coherent, and stylistically controllable」. ExoActor and PhyCo represent two key directions: the former demonstrates the feasibility of video generation as a motion control interface, while the latter provides controllable generation methods under physical constraints. Combining these two approaches—using audio-conditioned dance video generation while introducing physical consistency constraints—may be an important path toward improving dance generation quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-02`,
        'en': `/en/daily/music-to-dance/2026-05-02`,
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
      date="2026-05-02"
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
