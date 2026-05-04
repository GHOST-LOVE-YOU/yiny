import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-05-03 | 视频生成驱动的人形控制与物理一致性",
    overview: [
      "ExoActor 提出以第三人称视频生成为统一接口，将生成视频直接转换为可执行的人形行为",
      "PhyCo 通过物理属性图条件化生成，解决视频扩散模型中动作物理不自然的问题",
      "视觉生成领域正从原子映射向智能世界建模演进，流匹配与统一理解-生成模型成为关键技术驱动"
    ],
    papers: [
      {
        num: 1,
        tag: "人形控制",
        title: "ExoActor：以第三人称视频生成为统一接口的交互式人形控制",
        description: "ExoActor 提出了一种全新的范式：利用大规模视频生成模型的泛化能力，通过第三人称视频生成作为建模交互动力学的统一接口。给定任务指令和场景上下文，系统首先通过 robot-to-human embodiment transfer 将机器人观察转换为人形表示，然后生成任务一致的执行视频。这些视频通过 GENMO 进行全身运动估计、WiLoR 进行手部姿态估计，最终通过 SONIC 运动跟踪控制器转换为物理一致的可执行行为。该方法无需任务特定的数据收集，在 Unitree G1 机器人上实现了从视觉想象到物理执行的端到端流程。对于 music-to-dance 任务，这种视频-运动-执行的解耦架构具有直接借鉴价值：可将音频驱动的舞蹈视频生成与下游运动执行分离，利用现有视频生成模型的泛化能力降低对配对舞蹈数据的需求。",
        keyPoints: [
          "提出第三人称视频生成作为交互动力学建模的统一接口，解耦高层交互建模与底层控制",
          "通过 robot-to-human embodiment transfer 解决机器人与人形视频生成模型之间的本体不匹配问题",
          "使用 GPT-5.4 Thinking 进行任务分解，将高层指令转化为时序动作链，提升视频生成的时间一致性"
        ],
        href: "https://arxiv.org/abs/2604.27711",
        paperLink: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
      },
      {
        num: 2,
        tag: "综述",
        title: "视觉生成新纪元：从原子映射到智能世界建模的演进",
        description: "这篇综述提出了视觉智能的五级分类法：原子生成、条件生成、上下文生成、智能体生成、世界模型生成。作者指出当前视觉生成模型虽在真实感上取得进展，但在空间推理、持久状态、长程一致性和因果理解方面仍显不足。关键技术分析包括：扩散到流匹配的过渡、统一理解与生成模型、改进的视觉表征、后训练对齐（DPO/GRPO）、奖励建模、数据策展与合成数据蒸馏、采样加速等。对于 music-to-dance 任务，该综述提供的视角有助于定位技术路线：当前基于扩散的音频-视觉对齐属于 Level 2-3，向 Level 4 演进需要引入闭环交互和物理一致性验证。",
        keyPoints: [
          "提出五级视觉智能分类法，从被动渲染器演进至交互式、智能体化、世界感知的生成器",
          "流匹配（Flow Matching）正在取代扩散模型成为主流生成范式，实现更高效的采样",
          "当前评估指标过度强调感知质量而忽视结构、时间和因果缺陷，需要 stress testing 补充"
        ],
        href: "https://arxiv.org/abs/2604.28185",
        paperLink: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
      },
      {
        num: 3,
        tag: "物理一致性",
        title: "PhyCo：为生成式运动学习可控的物理先验",
        description: "现代视频扩散模型在动作物理一致性方面存在明显缺陷：物体漂移、碰撞缺乏真实反弹、材质响应与属性不符。PhyCo 提出三阶段解决方案：（1）构建 100K+ 物理仿真视频数据集，系统变化摩擦、弹性、形变和力四个物理参数；（2）使用 ControlNet 架构对预训练扩散模型进行物理监督微调，条件化为像素对齐的物理属性图；（3）引入 VLM 引导的奖励优化，通过针对性物理问题评估生成视频并提供可微反馈。在 Physics-IQ 基准上，PhyCo 显著提升了物理真实感。对于 music-to-dance 任务，该方法提供了将物理合理性引入舞蹈动作生成的可行路径：可通过类似的 ControlNet 条件化，将骨骼动力学约束注入视频生成过程，解决当前方案中动作漂浮、重心不稳等物理不自然问题。",
        keyPoints: [
          "构建 100K+ 多场景物理仿真数据集，覆盖摩擦、弹性、形变、外力四种物理属性的连续变化",
          "ControlNet 条件化物理属性图，实现无需仿真器或几何重建的推理时物理可控生成",
          "VLM 引导奖励优化通过针对性物理查询（如形变幅度、摩擦效应）提供可微反馈"
        ],
        href: "https://arxiv.org/abs/2604.28169",
        paperLink: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "表征空间 Fréchet 损失：将多步生成器蒸馏为单步生成器",
        tag: "训练目标",
        href: "https://arxiv.org/abs/2604.28190",
        description: "FD-loss 在表征空间中优化 Fréchet 距离，可将多步生成器转化为强单步生成器而无需教师蒸馏。对优化 music-to-dance 推理速度有潜在价值。",
      },
      {
        num: 5,
        title: "MoCapAnything V2：任意骨骼的端到端动作捕捉",
        tag: "动作捕捉",
        href: "https://arxiv.org/abs/2604.28130",
        description: "首个端到端框架联合优化 Video-to-Pose 和 Pose-to-Rotation，通过参考姿态-旋转对解决坐标系统歧义。GL-GMHA 模块对舞蹈姿态估计有借鉴意义。",
      },
      {
        num: 6,
        title: "X-WAM：异步去噪的统一 4D 世界动作建模",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.26694",
        description: "提出异步噪声采样（ANS）在保持生成质量的同时实现高效动作解码，少步快速解码思路可应用于实时舞蹈视频生成。",
      },
      {
        num: 7,
        title: "Edit-R1：基于验证器的图像编辑强化学习",
        tag: "强化学习",
        href: "https://arxiv.org/abs/2604.27505",
        description: "构建链式思维验证器奖励模型（RRM），将指令分解为独立原则并逐条评估。细粒度奖励建模方法可迁移到舞蹈生成的动作质量优化。",
      },
    ],
    observation: "本周论文呈现出视觉生成向物理一致性和智能体化演进的双重趋势。ExoActor 和 PhyCo 分别代表了两个互补方向：前者利用视频生成的泛化能力解决人形控制中的交互建模问题，后者通过物理属性条件化解决生成视频的物理真实性问题。对于 music-to-dance 任务，这意味着未来技术路线可能从当前的端到端扩散模型，演进为「视频生成 → 物理验证 → 运动执行」的模块化流程。流匹配、统一理解-生成模型、VLM 引导的奖励优化等关键技术值得持续关注。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-05-03 | Video Generation for Humanoid Control and Physical Consistency",
    overview: [
      "ExoActor proposes third-person video generation as a unified interface, converting generated videos directly into executable humanoid behaviors",
      "PhyCo addresses physical inconsistency in video diffusion models through physical property map conditioning",
      "Visual generation is evolving from atomic mapping toward intelligent world modeling, with flow matching and unified understanding-generation models as key drivers"
    ],
    papers: [
      {
        num: 1,
        tag: "Humanoid Control",
        title: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
        description: "ExoActor introduces a novel paradigm leveraging large-scale video generation models for humanoid control. The key insight is using third-person video generation as a unified interface for modeling interaction dynamics. Given task instructions and scene context, the system first performs robot-to-human embodiment transfer to convert robot observations into human-like representations, then generates task-consistent execution videos. These videos are processed through GENMO for whole-body motion estimation, WiLoR for hand pose estimation, and finally executed via the SONIC motion tracking controller. This approach requires no task-specific data collection and achieves end-to-end visual imagination to physical execution on Unitree G1 robots. For music-to-dance tasks, this decoupled video-motion-execution architecture offers direct value: audio-driven dance video generation can be separated from downstream motion execution, reducing reliance on paired dance data by leveraging existing video generation models' generalization capabilities.",
        keyPoints: [
          "Proposes third-person video generation as a unified interface for interaction dynamics modeling, decoupling high-level interaction modeling from low-level control",
          "Addresses embodiment mismatch between robots and human-centric video generation models through robot-to-human embodiment transfer",
          "Uses GPT-5.4 Thinking for task decomposition, converting high-level instructions into temporal action chains to improve video generation consistency"
        ],
        href: "https://arxiv.org/abs/2604.27711",
        paperLink: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
      },
      {
        num: 2,
        tag: "Survey",
        title: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
        description: "This survey proposes a five-level taxonomy of visual intelligence: Atomic Generation, Conditional Generation, In-Context Generation, Agentic Generation, and World-Modeling Generation. The authors note that while current visual generation models have made progress in photorealism, they still struggle with spatial reasoning, persistent state, long-horizon consistency, and causal understanding. Key technical drivers analyzed include: diffusion-to-flow matching transition, unified understanding-and-generation models, improved visual representations, post-training alignment (DPO/GRPO), reward modeling, data curation and synthetic data distillation, and sampling acceleration. For music-to-dance tasks, this survey provides valuable perspective for positioning technical roadmaps: current diffusion-based audio-visual alignment belongs to Level 2-3, and evolving toward Level 4 requires introducing closed-loop interaction and physical consistency verification.",
        keyPoints: [
          "Proposes a five-level taxonomy of visual intelligence, evolving from passive renderers to interactive, agentic, world-aware generators",
          "Flow Matching is replacing diffusion models as the mainstream generation paradigm, enabling more efficient sampling",
          "Current evaluation metrics overemphasize perceptual quality while neglecting structural, temporal, and causal weaknesses, requiring stress testing supplementation"
        ],
        href: "https://arxiv.org/abs/2604.28185",
        paperLink: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
      },
      {
        num: 3,
        tag: "Physical Consistency",
        title: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
        description: "Modern video diffusion models exhibit clear deficiencies in physical consistency: object drift, unrealistic collision rebounds, and material responses inconsistent with properties. PhyCo proposes a three-stage solution: (1) constructing a 100K+ physics simulation video dataset with systematic variation of friction, restitution, deformation, and force parameters; (2) physics-supervised fine-tuning of pretrained diffusion models using ControlNet architecture conditioned on pixel-aligned physical property maps; (3) introducing VLM-guided reward optimization that evaluates generated videos through targeted physics questions and provides differentiable feedback. On the Physics-IQ benchmark, PhyCo significantly improves physical realism. For music-to-dance tasks, this method provides a viable path for introducing physical plausibility into dance motion generation: similar ControlNet conditioning could inject skeletal dynamics constraints into the video generation process, addressing current issues like floating motions and unstable center of gravity.",
        keyPoints: [
          "Constructs 100K+ multi-scenario physics simulation dataset covering continuous variation of friction, restitution, deformation, and external force",
          "ControlNet conditioning on physical property maps enables physics-controllable generation at inference without simulators or geometric reconstruction",
          "VLM-guided reward optimization provides differentiable feedback through targeted physics queries (e.g., deformation magnitude, friction effects)"
        ],
        href: "https://arxiv.org/abs/2604.28169",
        paperLink: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Representation Fréchet Loss for Visual Generation",
        tag: "Training Objective",
        href: "https://arxiv.org/abs/2604.28190",
        description: "FD-loss optimizes Fréchet Distance in representation space, converting multi-step generators into strong one-step generators without teacher distillation. Potential value for optimizing music-to-dance inference speed.",
      },
      {
        num: 5,
        title: "MoCapAnything V2: End-to-End Motion Capture for Arbitrary Skeletons",
        tag: "Motion Capture",
        href: "https://arxiv.org/abs/2604.28130",
        description: "First end-to-end framework jointly optimizing Video-to-Pose and Pose-to-Rotation, solving coordinate system ambiguity through reference pose-rotation pairs. GL-GMHA module offers insights for dance pose estimation.",
      },
      {
        num: 6,
        title: "X-WAM: Unified 4D World Action Modeling with Asynchronous Denoising",
        tag: "World Model",
        href: "https://arxiv.org/abs/2604.26694",
        description: "Proposes Asynchronous Noise Sampling (ANS) for efficient action decoding while maintaining generation quality. Few-step fast decoding approach applicable to real-time dance video generation.",
      },
      {
        num: 7,
        title: "Edit-R1: Verifier-Based Reinforcement Learning for Image Editing",
        tag: "Reinforcement Learning",
        href: "https://arxiv.org/abs/2604.27505",
        description: "Builds chain-of-thought verifier reward model (RRM) decomposing instructions into independent principles. Fine-grained reward modeling approach transferable to dance generation motion quality optimization.",
      },
    ],
    observation: "This week's papers demonstrate dual trends in visual generation: toward physical consistency and agentic capabilities. ExoActor and PhyCo represent two complementary directions: the former leverages video generation's generalization to solve interaction modeling in humanoid control, while the latter addresses physical realism through physical property conditioning. For music-to-dance tasks, this suggests future technical evolution from current end-to-end diffusion models toward modular pipelines of 'video generation → physics verification → motion execution'. Key technologies worth continued attention include flow matching, unified understanding-generation models, and VLM-guided reward optimization.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-03`,
        'en': `/en/daily/music-to-dance/2026-05-03`,
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
      date="2026-05-03"
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
