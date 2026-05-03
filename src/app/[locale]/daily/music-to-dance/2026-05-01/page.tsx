import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "2026-05-01 | 物理可控生成与端到端动作捕捉新进展",
    overview: [
      "PhyCo 提出物理属性控制的视频生成框架，为舞蹈动作的物理一致性提供新思路",
      "MoCapAnything V2 实现端到端动作捕捉，GL-GMHA 注意力机制值得关注",
      "ExoActor 将第三人称视频生成作为交互动力学建模的统一接口",
      "视觉生成领域综述：从原子映射到智能体世界建模的演进路径"
    ],
    papers: [
      {
        num: 1,
        tag: "物理可控生成",
        title: "PhyCo：为生成式运动学习可控的物理先验",
        description: "PhyCo 是一个将连续、可解释且物理基础的控制引入视频生成的框架。该方法通过 ControlNet 架构对预训练扩散模型进行物理监督微调，条件为像素对齐的物理属性图（摩擦、弹性、形变、外力）。在 Physics-IQ 基准上，PhyCo 显著提升了物理真实感。对于 music-to-dance 任务，该框架的技术可直接迁移：通过将音频节拍编码为"虚拟力"或运动强度属性，实现对舞蹈动作物理一致性的细粒度控制，解决当前扩散模型生成动作不自然、缺乏物理真实感的问题。",
        keyPoints: [
          "提出 10 万+物理仿真视频数据集，系统变化摩擦、弹性、形变、外力四种物理属性",
          "ControlNet 架构实现像素级物理属性图条件控制，无需推理时仿真器",
          "VLM 引导的奖励优化机制，通过物理问答提供可微反馈",
          "技术可迁移至舞蹈生成：音频节拍→运动强度/物理属性→可控舞蹈动作"
        ],
        href: "https://arxiv.org/abs/2604.28169",
        paperLink: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
      },
      {
        num: 2,
        tag: "动作捕捉",
        title: "MoCapAnything V2：面向任意骨骼的端到端动作捕捉",
        description: "本文提出首个完全端到端的任意骨骼动作捕捉框架，Video-to-Pose 和 Pose-to-Rotation 两阶段均可学习并联合优化。关键创新是引入参考姿态-旋转对来解决姿态到旋转映射的歧义性问题，将旋转预测转化为条件良好的约束问题。GL-GMHA（全局-局部图引导多头注意力）机制在关节级局部推理和全局协调之间交替，对处理不同骨骼拓扑结构具有良好泛化性。对于 music-to-dance，该技术可用于从舞蹈视频提取高质量动作数据作为训练监督，GL-GMHA 的骨骼感知注意力设计对参考图外观迁移有借鉴价值。",
        keyPoints: [
          "端到端可学习框架，姿态和旋转阶段联合优化，梯度可双向流动",
          "参考姿态-旋转对定义旋转坐标系，解决姿态到旋转的歧义性",
          "GL-GMHA 注意力机制：局部层沿运动链建模，全局层捕获跨肢体协调",
          "相比基于 mesh 的管线推理速度提升约 20 倍，未见骨骼上旋转误差降至 6.54°"
        ],
        href: "https://arxiv.org/abs/2604.28130",
        paperLink: "MoCapAnything V2: End-to-End Motion Capture for Arbitrary Skeletons",
      },
      {
        num: 3,
        tag: "视频生成与控制",
        title: "ExoActor：以第三人称视频生成作为可泛化交互式人形控制",
        description: "ExoActor 利用大规模视频生成模型的泛化能力，将第三人称视频生成作为建模交互动力学的统一接口。给定任务指令和场景上下文，系统合成包含机器人、环境和目标物体之间协调交互的执行过程视频，然后通过人体运动估计和通用运动控制器转换为可执行的人形行为。核心创新包括：机器人到人体的具身转换、任务到动作的分解、以及交互感知的全身运动估计。对于 music-to-dance，这种"视频生成作为行为规划"的范式极具启发性：可将音频条件转化为舞蹈执行视频，再提取动作驱动人物，实现端到端的音乐到舞蹈生成。",
        keyPoints: [
          "第三人称视频生成作为交互动力学建模的统一接口，利用视频模型泛化能力",
          "机器人到人体具身转换，解决视频生成模型的人类中心先验问题",
          "任务分解为原子动作链，结构化指导视频生成",
          "范式可迁移至 music-to-dance：音频→舞蹈视频→动作提取→人物驱动"
        ],
        href: "https://arxiv.org/abs/2604.27711",
        paperLink: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
      },
      {
        num: 4,
        tag: "综述",
        title: "视觉生成新时代：从原子映射到智能体世界建模的演进",
        description: "这篇综述系统梳理了视觉生成领域从被动渲染到交互式、智能体化、世界感知生成器的演进路径。作者提出五级分类法：原子生成、条件生成、上下文生成、智能体生成、世界模型生成。关键技术分析包括：扩散到流匹配的过渡、统一理解与生成模型、改进的视觉表示、后训练与奖励建模、数据策展与合成数据蒸馏、采样加速等。对于 music-to-dance 研究，流匹配（Flow Matching）技术可改进扩散采样效率；统一多模态架构有助于音频-视觉联合建模；时序一致性和物理推理能力是舞蹈视频生成的关键挑战。",
        keyPoints: [
          "五级分类法：从单遍渲染到可控组合、持久一致性、闭环交互、因果世界建模",
          "扩散到流匹配的过渡：Rectified-flow 和 flow-matching 目标改变生成范式",
          "统一理解与生成系统：感知、推理、渲染在共享多模态空间中相互增强",
          "关键启示：时序一致性、物理推理、长程状态跟踪是舞蹈视频生成的核心能力"
        ],
        href: "https://arxiv.org/abs/2604.28185",
        paperLink: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "表示空间中的 Fréchet 距离损失用于视觉生成",
        tag: "视觉质量",
        href: "https://arxiv.org/abs/2604.28190",
        description: "FD-loss 在表示空间中优化 Fréchet 距离，可用于改进舞蹈视频生成的视觉质量评估和训练目标。",
      },
      {
        num: 6,
        title: "在图像编辑中利用基于验证器的强化学习",
        tag: "RLHF",
        href: "https://arxiv.org/abs/2604.27505",
        description: "Edit-R1 的 CoT 奖励模型思路可迁移到舞蹈动作质量评估和优化。",
      },
      {
        num: 7,
        title: "基于视频先验的统一 4D 世界动作建模",
        tag: "视频扩散",
        href: "https://arxiv.org/abs/2604.26694",
        description: "X-WAM 的异步去噪采样 (ANS) 技术可加速舞蹈视频生成推理，平衡质量与效率。",
      },
      {
        num: 8,
        title: "野外视频虚拟试穿的大规模三元组数据集",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2604.27958",
        description: "TripVVT 的 Diffusion Transformer 框架和时序一致性技术对舞蹈视频生成有参考价值。",
      },
      {
        num: 9,
        title: "MiniCPM-o 4.5：迈向实时全双工全模态交互",
        tag: "多模态",
        href: "https://arxiv.org/abs/2604.27393",
        description: "全双工多模态交互技术对音频-视觉同步生成有启发。",
      },
      {
        num: 10,
        title: "GLM-5V-Turbo：面向多模态智能体的原生基础模型",
        tag: "多模态",
        href: "https://arxiv.org/abs/2604.26752",
        description: "多模态感知与推理集成思路对音乐-舞蹈跨模态对齐有参考价值。",
      },
    ],
    observation: "今日论文呈现出一个清晰趋势：视频生成正从"外观合成"向"物理一致、可控交互"演进。PhyCo 的物理属性控制、ExoActor 的视频生成即行为规划、以及 MoCapAnything V2 的端到端动作捕捉，共同指向一个未来方向——将音乐到舞蹈的生成分解为"音频条件→物理/语义属性→视频想象→动作提取"的多阶段可学习管线。这与当前端到端扩散方案形成互补，值得在后续实验中探索融合路径。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "2026-05-01 | Advances in Physics-Controllable Generation and End-to-End Motion Capture",
    overview: [
      "PhyCo introduces physics-aware video generation, offering new approaches for physical consistency in dance motion",
      "MoCapAnything V2 achieves end-to-end motion capture with GL-GMHA attention mechanism",
      "ExoActor uses third-person video generation as a unified interface for interaction dynamics modeling",
      "Visual generation survey: evolution from atomic mapping to agentic world modeling"
    ],
    papers: [
      {
        num: 1,
        tag: "Physics-Controlled Generation",
        title: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
        description: "PhyCo is a framework that introduces continuous, interpretable, and physically grounded control into video generation. It uses ControlNet architecture for physics-supervised fine-tuning of pretrained diffusion models conditioned on pixel-aligned physical property maps (friction, restitution, deformation, force). On the Physics-IQ benchmark, PhyCo significantly improves physical realism. For music-to-dance tasks, this framework's techniques can be directly migrated: encoding audio beats as 'virtual forces' or motion intensity attributes enables fine-grained control over dance motion physical consistency, addressing the unnatural movements and lack of physical realism in current diffusion models.",
        keyPoints: [
          "Proposes 100K+ physics simulation video dataset with systematic variation of four physical properties",
          "ControlNet architecture enables pixel-level physical property map conditioning without inference-time simulators",
          "VLM-guided reward optimization provides differentiable feedback through physics Q&A",
          "Technique transferable to dance generation: audio beats → motion intensity/physics attributes → controllable dance"
        ],
        href: "https://arxiv.org/abs/2604.28169",
        paperLink: "PhyCo: Learning Controllable Physical Priors for Generative Motion",
      },
      {
        num: 2,
        tag: "Motion Capture",
        title: "MoCapAnything V2: End-to-End Motion Capture for Arbitrary Skeletons",
        description: "This paper presents the first fully end-to-end framework for arbitrary-skeleton motion capture, where both Video-to-Pose and Pose-to-Rotation stages are learnable and jointly optimized. The key innovation is introducing reference pose-rotation pairs to resolve the ambiguity in pose-to-rotation mapping, transforming rotation prediction into a well-constrained conditional problem. The GL-GMHA (Global-Local Graph-guided Multi-Head Attention) mechanism alternates between joint-level local reasoning and global coordination, generalizing well to different skeleton topologies. For music-to-dance, this technique can extract high-quality motion data from dance videos as training supervision, and the skeleton-aware attention design offers insights for reference image appearance transfer.",
        keyPoints: [
          "End-to-end learnable framework with joint optimization of pose and rotation stages, bidirectional gradient flow",
          "Reference pose-rotation pairs define rotation coordinate systems, resolving pose-to-rotation ambiguity",
          "GL-GMHA attention: local layers model along kinematic chains, global layers capture cross-limb coordination",
          "~20x faster inference than mesh-based pipelines, rotation error reduced to 6.54° on unseen skeletons"
        ],
        href: "https://arxiv.org/abs/2604.28130",
        paperLink: "MoCapAnything V2: End-to-End Motion Capture for Arbitrary Skeletons",
      },
      {
        num: 3,
        tag: "Video Generation & Control",
        title: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
        description: "ExoActor leverages the generalization capabilities of large-scale video generation models, using third-person video generation as a unified interface for modeling interaction dynamics. Given task instructions and scene context, the system synthesizes execution videos capturing coordinated interactions between robot, environment, and target objects, then converts them into executable humanoid behaviors through human motion estimation and general motion controllers. Core innovations include robot-to-human embodiment transfer, task-to-action decomposition, and interaction-aware whole-body motion estimation. For music-to-dance, this 'video generation as behavior planning' paradigm is highly inspiring: audio conditions can be transformed into dance execution videos, from which motions are extracted to drive characters, enabling end-to-end music-to-dance generation.",
        keyPoints: [
          "Third-person video generation as unified interface for interaction dynamics, leveraging video model generalization",
          "Robot-to-human embodiment transfer addresses human-centric priors of video generation models",
          "Task decomposition into atomic action chains provides structured guidance for video generation",
          "Paradigm transferable to music-to-dance: audio → dance video → motion extraction → character driving"
        ],
        href: "https://arxiv.org/abs/2604.27711",
        paperLink: "ExoActor: Exocentric Video Generation as Generalizable Interactive Humanoid Control",
      },
      {
        num: 4,
        tag: "Survey",
        title: "Visual Generation in the New Era: From Atomic Mapping to Agentic World Modeling",
        description: "This survey systematically reviews the evolution of visual generation from passive rendering to interactive, agentic, world-aware generators. The authors propose a five-level taxonomy: Atomic Generation, Conditional Generation, In-Context Generation, Agentic Generation, and World-Modeling Generation. Key technical analyses include: transition from diffusion to flow matching, unified understanding-and-generation models, improved visual representations, post-training and reward modeling, data curation and synthetic data distillation, sampling acceleration, etc. For music-to-dance research, Flow Matching technology can improve diffusion sampling efficiency; unified multimodal architectures help audio-visual joint modeling; temporal consistency and physical reasoning capabilities are key challenges for dance video generation.",
        keyPoints: [
          "Five-level taxonomy: from single-pass rendering to controllable composition, persistent coherence, closed-loop interaction, causal world modeling",
          "Diffusion to flow matching transition: Rectified-flow and flow-matching objectives transform generation paradigms",
          "Unified understanding-and-generation systems: perception, reasoning, rendering mutually enhance in shared multimodal space",
          "Key insight: temporal consistency, physical reasoning, long-range state tracking are core capabilities for dance video generation"
        ],
        href: "https://arxiv.org/abs/2604.28185",
        paperLink: "Visual Generation in the New Era: An Evolution from Atomic Mapping to Agentic World Modeling",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Representation Fréchet Loss for Visual Generation",
        tag: "Visual Quality",
        href: "https://arxiv.org/abs/2604.28190",
        description: "FD-loss optimizes Fréchet Distance in representation space, applicable for improving visual quality evaluation and training objectives in dance video generation.",
      },
      {
        num: 6,
        title: "Leveraging Verifier-Based RL in Image Editing",
        tag: "RLHF",
        href: "https://arxiv.org/abs/2604.27505",
        description: "Edit-R1's CoT reward model approach can be migrated to dance motion quality assessment and optimization.",
      },
      {
        num: 7,
        title: "Unified 4D World Action Modeling from Video Priors",
        tag: "Video Diffusion",
        href: "https://arxiv.org/abs/2604.26694",
        description: "X-WAM's Asynchronous Noise Sampling (ANS) technique can accelerate dance video generation inference, balancing quality and efficiency.",
      },
      {
        num: 8,
        title: "TripVVT: Large-Scale Triplet Dataset for Video Virtual Try-On",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2604.27958",
        description: "TripVVT's Diffusion Transformer framework and temporal consistency techniques offer reference value for dance video generation.",
      },
      {
        num: 9,
        title: "MiniCPM-o 4.5: Real-Time Full-Duplex Omni-Modal Interaction",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2604.27393",
        description: "Full-duplex multimodal interaction technology provides insights for audio-visual synchronized generation.",
      },
      {
        num: 10,
        title: "GLM-5V-Turbo: Native Foundation Model for Multimodal Agents",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2604.26752",
        description: "Multimodal perception and reasoning integration offers reference value for music-dance cross-modal alignment.",
      },
    ],
    observation: "Today's papers reveal a clear trend: video generation is evolving from 'appearance synthesis' toward 'physically consistent, controllable interaction'. PhyCo's physics attribute control, ExoActor's video-generation-as-behavior-planning, and MoCapAnything V2's end-to-end motion capture collectively point to a future direction—decomposing music-to-dance generation into a multi-stage learnable pipeline of 'audio conditioning → physics/semantic attributes → video imagination → motion extraction'. This complements current end-to-end diffusion approaches and is worth exploring in future experiments.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-01`,
        'en': `/en/daily/music-to-dance/2026-05-01`,
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
      date="2026-05-01"
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
