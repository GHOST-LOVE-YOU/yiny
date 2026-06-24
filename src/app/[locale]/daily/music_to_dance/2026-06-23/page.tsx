import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "分层编辑与实时生成：视频内容保持与交互式音乐生成的新进展",
    overview: [
      "Vera提出分层扩散框架，通过显式RGBA层分离编辑内容与原始视频，为人物外观保持提供新思路",
      "Lift4D的时序一致单视图3D重建+可变形高斯溅射，可直接用于构建可驱动的人物4D表示",
      "实时交互式音乐生成的流式一致性蒸馏，其单步生成机制可迁移到音频特征实时编码"
    ],
    papers: [
      {
        num: 1,
        tag: "视频编辑",
        title: "Vera：基于分层扩散模型的内容保持视频编辑",
        description: "Vera提出了一种全新的分层扩散框架，将视频编辑问题显式分解为编辑层、alpha遮罩和合成视频三个输出。与现有端到端扩散范式不同，Vera通过Mixture-of-Transformers (MoT)架构让各层DiT通过联合自注意力交互，实现了编辑层与源视频的高度一致合成。在人物舞蹈视频生成中，这一思路可直接迁移：将参考人物图作为固定层，仅编辑运动层，通过alpha matte精确控制哪些区域保持身份一致，从根本上解决当前patch-shuffling策略可能破坏面部细节的问题。",
        keyPoints: [
          "MoT架构通过联合自注意力实现跨层交互，确保编辑层与源视频的光照、相机运动、空间布局一致",
          "分层数据集包含48.6万帧，涵盖合成组合、真实单/多物体场景及视觉特效",
          "在内容保持指标上显著优于开源视频编辑模型，同时保持竞争力的编辑质量"
        ],
        href: "https://arxiv.org/abs/2606.23610",
        paperLink: "Vera: A Layered Diffusion Model for Content-Preserving Video Editing",
      },
      {
        num: 2,
        tag: "4D重建",
        title: "Lift4D：面向野外场景的时序协调单视图3D估计",
        description: "Lift4D针对单目视频中动态非刚性物体的4D重建问题，提出了test-time优化框架。其核心创新是因果潜变量条件策略：通过跨帧传播潜变量信息，使单视图3D重建模型产生时序一致的几何预测。在舞蹈场景下，这意味着可以从参考人物图重建可驱动的4D表示，其可变形3DGS参数化配合遮挡感知渲染监督，能有效处理舞蹈中的自遮挡和大幅度形变。特别值得注意的是，该方法利用视图条件扩散先验来补全未观察区域，为360度人物建模提供了可行路径。",
        keyPoints: [
          "因果潜变量条件策略使单帧3D重建具备时序一致性，为动态人物建模提供强先验",
          "遮挡感知渲染通过深度线索定位遮挡区域，结合颜色匹配实现不可见区域的外观补全",
          "在野外视频的大幅度非刚性形变和严重遮挡场景下达到SOTA性能"
        ],
        href: "https://arxiv.org/abs/2606.23688",
        paperLink: "Lift4D: Harmonizing Single-View 3D Estimation for 4D Reconstruction In-the-Wild",
      },
      {
        num: 3,
        tag: "音乐生成",
        title: "实时交互式音乐生成的数据无关流式一致性蒸馏",
        description: "该工作将生成式音乐模型从离线渲染转变为实时可演奏乐器。通过流式自回归潜空间中的一致性蒸馏，将教师模型的多步预测压缩为单步学生模型，实现低延迟生成。关键创新包括：基于提示的在线合成无需成对音频-潜变量数据集；音乐感知一致性目标联合约束潜变量重建、频谱结构和时序变化，保留音色、瞬态和节奏稳定性。对music-to-dance任务，这一框架可直接迁移到音频特征编码器：将音频编码建模为流式过程， chunk-wise处理实现实时音频-运动对齐，避免当前方案的全序列编码延迟。",
        keyPoints: [
          "数据无关蒸馏通过教师模型在线合成轨迹，摆脱成对音频-潜变量数据集依赖",
          "音乐感知目标函数结合潜变量、频谱和时序差分损失，在极端步数缩减下保持声学保真度",
          "连续自回归流支持动态人类输入实时融入，实现人机协同创作"
        ],
        href: "https://arxiv.org/abs/2606.24307",
        paperLink: "Real-Time Interactive Music Generation via Data-Free Streaming Consistency Distillation",
      },
      {
        num: 4,
        tag: "运动生成",
        title: "TEXEDO：面向控制器感知的人形机器人语言条件运动生成测试时扩展",
        description: "TEXEDO针对文本条件运动生成与下游全身跟踪控制器脱节的问题，提出了test-time scaling框架。其核心洞察是：运动生成器训练时未暴露于目标控制器，导致生成的运动在语义上合理但物理上不可执行。TEXEDO通过两个互补的验证器解决这一问题：动态可行性验证器从控制器rollout中蒸馏，预测参考运动是否可执行；语义对齐验证器测量文本-运动对齐度。这种grounded verification思路对舞蹈生成有直接价值：可训练一个物理可行性验证器来筛选生成的舞蹈动作，确保姿态在物理上合理（如无关节超限、平衡稳定），避免不自然或不可能的动作。",
        keyPoints: [
          "动态可行性验证器将控制器能力（平衡、接触、驱动限制）蒸馏为运动可执行性评分",
          "非对称filter-then-rerank策略将可行性作为硬约束，语义对齐作为可行集内的选择目标",
          "在Unitree G1真实机器人上验证，零样本迁移到未见运动生成器"
        ],
        href: "https://arxiv.org/abs/2606.22998",
        paperLink: "TEXEDO: Test Time Scaling for Controller-aware Language-conditioned Humanoid Motion Generation",
      },
      {
        num: 5,
        tag: "视频理解",
        title: "video-SALMONN-R³：通过强化学习实现高效视频理解的再观看、再提问与再回答",
        description: "video-SALMONN-R³提出了一种无需CoT冷启动的端到端视频LLM再观看机制。模型首先以低帧率/分辨率观看完整视频产生初始答案，然后通过强化学习优化的策略定位相关时段，以高保真度重新观看并精炼答案。其re-answer策略巧妙处理了再观看的推理优先行为与预训练模型回答优先倾向之间的错配。对长舞蹈视频生成，这一范式可迁移为两阶段生成：第一阶段粗理解音乐结构定位关键节拍，第二阶段针对关键时段细粒度生成对应动作，既降低计算成本又提升时序对齐精度。",
        keyPoints: [
          "纯强化学习获得再观看能力，无需昂贵的CoT数据标注和SFT",
          "re-ask机制在重新观看时重新注入查询，解决因果注意力下问题token无法关注新帧的限制",
          "在6个基准上达到SOTA，计算成本显著低于先前再观看方法"
        ],
        href: "https://arxiv.org/abs/2606.24477",
        paperLink: "video-SALMONN-R³: Learning to ReWatch, ReAsk, and ReAnswer for Efficient Video Understanding",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "反事实可控的自主视频生成",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.24152",
        description: "提出反事实可控性作为自进化世界模型的关键标准，对舞蹈动作物理合理性约束有启发。",
      },
      {
        num: 7,
        title: "CoorDex：全身与灵巧手部先验协调的人形机器人移动操作",
        tag: "机器人",
        href: "https://arxiv.org/abs/2606.23680",
        description: "高维身体-手部协调控制与latent residual策略，对舞蹈全身动作协调生成有参考价值。",
      },
      {
        num: 8,
        title: "DTT-BSR+：音乐源修复的生成-回归级联",
        tag: "音频",
        href: "https://arxiv.org/abs/2606.24127",
        description: "两阶段级联框架解耦分布拟合与信号重建，可借鉴到音频特征提取流程设计。",
      },
      {
        num: 9,
        title: "MusicLLM情感对齐",
        tag: "音乐",
        href: "https://arxiv.org/abs/2606.24123",
        description: "反馈驱动的对齐方法可直接用于从音乐提取情感/情绪特征作为舞蹈生成条件。",
      },
      {
        num: 10,
        title: "VESFlow：通过速度编辑实现安全少步生成",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2606.23267",
        description: "Flow matching的velocity editing技术，可用于少步数扩散采样加速舞蹈视频生成。",
      },
      {
        num: 11,
        title: "PolicyTrim：提升VLA模型内在策略效率",
        tag: "VLA",
        href: "https://arxiv.org/abs/2606.22540",
        description: "动作块利用率提升3倍，对长舞蹈序列生成的动作冗余消除有参考价值。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的技术趋势。一是显式分层/解耦思想的回归：Vera的分层扩散、DTT-BSR+的生成-回归级联、TEXEDO的可行性-语义解耦，都指向将复杂生成问题分解为可控子问题的设计哲学。这对music-to-dance的启示是：与其端到端生成，不如显式分离音频解析、运动生成、外观保持等模块。二是test-time scaling的兴起：TEXEDO和video-SALMONN-R³都利用推理时计算提升质量，而非盲目扩大模型规模。在舞蹈生成中，这意味着可以通过采样多个候选动作并验证筛选，而非训练更大的单一模型。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Layered Editing & Real-Time Generation: Advances in Video Content Preservation and Interactive Music Synthesis",
    overview: [
      "Vera proposes a layered diffusion framework that explicitly separates edit layers from source video via RGBA decomposition",
      "Lift4D's temporally consistent single-view 3D reconstruction with deformable Gaussian Splatting enables drivable human 4D representation",
      "Streaming consistency distillation for real-time interactive music generation enables single-step audio encoding"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Editing",
        title: "Vera: Layered Diffusion for Content-Preserving Video Editing",
        description: "Vera introduces a novel layered diffusion framework that explicitly decomposes video editing into three outputs: edit layer, alpha matte, and composite video. Unlike existing end-to-end diffusion paradigms, Vera employs a Mixture-of-Transformers (MoT) architecture where separate DiTs per layer interact through joint self-attention, achieving highly coherent composition between edit layers and source video. For human dance video generation, this approach can be directly adapted: treat the reference person image as a fixed layer while only editing the motion layer, using alpha matte to precisely control which regions maintain identity consistency, fundamentally addressing the issue of facial detail corruption in current patch-shuffling strategies.",
        keyPoints: [
          "MoT architecture enables cross-layer interaction via joint self-attention, ensuring lighting, camera motion, and spatial layout consistency",
          "Layered dataset comprises 486K frames covering synthetic composites, real single/multi-object scenes, and visual effects",
          "Significantly outperforms open-source video editing models on content preservation while maintaining competitive edit quality"
        ],
        href: "https://arxiv.org/abs/2606.23610",
        paperLink: "Vera: A Layered Diffusion Model for Content-Preserving Video Editing",
      },
      {
        num: 2,
        tag: "4D Reconstruction",
        title: "Lift4D: Harmonizing Single-View 3D Estimation for In-the-Wild 4D Reconstruction",
        description: "Lift4D addresses 4D reconstruction of dynamic non-rigid objects from monocular video through a test-time optimization framework. Its core innovation is causal latent conditioning: by propagating latent information across frames, single-view 3D reconstruction models produce temporally consistent geometric predictions. For dance scenarios, this enables reconstructing drivable 4D representations from reference person images, where deformable 3DGS parameterization combined with occlusion-aware rendering supervision effectively handles self-occlusion and large deformations in dance. Notably, the method leverages view-conditioned diffusion priors to complete unobserved regions, providing a viable path for 360-degree human modeling.",
        keyPoints: [
          "Causal latent conditioning strategy provides temporally consistent single-frame 3D reconstruction for dynamic human modeling",
          "Occlusion-aware rendering localizes occluded regions via depth cues, harmonizing invisible appearance with visible regions",
          "Achieves SOTA performance on in-the-wild videos with large non-rigid deformations and severe occlusions"
        ],
        href: "https://arxiv.org/abs/2606.23688",
        paperLink: "Lift4D: Harmonizing Single-View 3D Estimation for 4D Reconstruction In-the-Wild",
      },
      {
        num: 3,
        tag: "Music Generation",
        title: "Real-Time Interactive Music Generation via Data-Free Streaming Consistency Distillation",
        description: "This work transforms generative music models from offline renderers into real-time playable instruments. Through consistency distillation in streaming autoregressive latent space, multi-step teacher predictions are compressed into single-step student models for low-latency generation. Key innovations include: prompt-only online synthesis eliminates need for paired audio-latent datasets; music-aware consistency objectives jointly constrain latent reconstruction, spectral structure, and temporal variation to preserve timbre, transients, and rhythmic stability. For music-to-dance tasks, this framework can be directly adapted to audio feature encoders: model audio encoding as a streaming process with chunk-wise processing for real-time audio-motion alignment, avoiding full-sequence encoding delays in current approaches.",
        keyPoints: [
          "Data-free distillation synthesizes trajectories online via teacher model, eliminating paired audio-latent dataset dependency",
          "Music-aware objective combines latent, spectral, and temporal-difference losses to maintain acoustic fidelity under extreme step reduction",
          "Continuous autoregressive stream supports real-time incorporation of dynamic human inputs for human-AI co-creation"
        ],
        href: "https://arxiv.org/abs/2606.24307",
        paperLink: "Real-Time Interactive Music Generation via Data-Free Streaming Consistency Distillation",
      },
      {
        num: 4,
        tag: "Motion Generation",
        title: "TEXEDO: Test-Time Scaling for Controller-Aware Humanoid Motion Generation",
        description: "TEXEDO addresses the disconnect between text-conditioned motion generators and downstream whole-body tracking controllers through a test-time scaling framework. The key insight: motion generators are trained without exposure to target controllers, producing motions that are semantically plausible but physically infeasible. TEXEDO solves this via two complementary verifiers: a dynamic feasibility verifier distilled from controller rollouts predicts motion executability; a semantic alignment verifier measures text-motion alignment. This grounded verification approach has direct value for dance generation: train a physical feasibility verifier to screen generated dance motions, ensuring poses are physically reasonable (no joint limits exceeded, balance stable), avoiding unnatural or impossible movements.",
        keyPoints: [
          "Dynamic feasibility verifier distills controller capabilities (balance, contact, actuation limits) into motion executability scores",
          "Asymmetric filter-then-rerank treats feasibility as hard constraint, semantic alignment as selection objective within feasible set",
          "Validated on physical Unitree G1 robot with zero-shot transfer to unseen motion generators"
        ],
        href: "https://arxiv.org/abs/2606.22998",
        paperLink: "TEXEDO: Test Time Scaling for Controller-aware Language-conditioned Humanoid Motion Generation",
      },
      {
        num: 5,
        tag: "Video Understanding",
        title: "video-SALMONN-R³: ReWatch, ReAsk, and ReAnswer for Efficient Video Understanding",
        description: "video-SALMONN-R³ proposes an end-to-end video LLM re-watch mechanism without CoT cold-start. The model first watches full video at low frame rate/resolution to produce initial answers, then uses RL-optimized policy to localize relevant segments, re-watching at high fidelity to refine answers. The re-answer strategy elegantly handles the mismatch between re-watch's reasoning-first behavior and pretrained models' answer-first tendency. For long dance video generation, this paradigm can be adapted as two-stage generation: first coarse understanding of music structure to locate key beats, then fine-grained motion generation for key segments, reducing computational cost while improving temporal alignment precision.",
        keyPoints: [
          "Pure RL acquires re-watch capability without expensive CoT data annotation and SFT",
          "Re-ask mechanism re-injects query during re-watching, addressing causal attention limitation where question tokens cannot attend new frames",
          "Achieves SOTA on 6 benchmarks with significantly lower computational cost than prior re-watch methods"
        ],
        href: "https://arxiv.org/abs/2606.24477",
        paperLink: "video-SALMONN-R³: Learning to ReWatch, ReAsk, and ReAnswer for Efficient Video Understanding",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Autonomous Video Generation with Counterfactual Controllability",
        tag: "World Models",
        href: "https://arxiv.org/abs/2606.24152",
        description: "Proposes counterfactual controllability as key criterion for self-evolving world models, inspiring physical plausibility constraints for dance motion.",
      },
      {
        num: 7,
        title: "CoorDex: Coordinating Body and Hand Priors for Humanoid Loco-Manipulation",
        tag: "Robotics",
        href: "https://arxiv.org/abs/2606.23680",
        description: "High-dimensional body-hand coordination control with latent residual strategy, valuable for full-body dance motion coordination.",
      },
      {
        num: 8,
        title: "DTT-BSR+: Generative-Regression Cascade for Music Source Restoration",
        tag: "Audio",
        href: "https://arxiv.org/abs/2606.24127",
        description: "Two-stage cascade decoupling distribution fitting from signal reconstruction, adaptable to audio feature extraction pipeline design.",
      },
      {
        num: 9,
        title: "Aligning MusicLLM with Emotion",
        tag: "Music",
        href: "https://arxiv.org/abs/2606.24123",
        description: "Feedback-driven alignment methods directly applicable for extracting emotional features from music as dance generation conditioning.",
      },
      {
        num: 10,
        title: "VESFlow: Safe Few-Step Generation via Velocity Editing",
        tag: "Diffusion",
        href: "https://arxiv.org/abs/2606.23267",
        description: "Flow matching velocity editing technique for few-step diffusion sampling acceleration in dance video generation.",
      },
      {
        num: 11,
        title: "PolicyTrim: Boosting VLA Intrinsic Policy Efficiency",
        tag: "VLA",
        href: "https://arxiv.org/abs/2606.22540",
        description: "3x action chunk utilization improvement, valuable for motion redundancy elimination in long dance sequence generation.",
      },
    ],
    observation: "Today's papers reveal two noteworthy technical trends. First, the return of explicit layering/decoupling: Vera's layered diffusion, DTT-BSR+'s generative-regression cascade, and TEXEDO's feasibility-semantic decoupling all point to a design philosophy of decomposing complex generation into controllable sub-problems. The implication for music-to-dance: rather than end-to-end generation, explicitly separate audio parsing, motion generation, and appearance preservation modules. Second, the rise of test-time scaling: both TEXEDO and video-SALMONN-R³ leverage inference-time computation for quality improvement rather than blindly scaling model size. In dance generation, this means sampling multiple candidate motions with verification-based selection, rather than training larger single models.",
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
        'zh-CN': `/zh/daily/music_to_dance/2026-06-23`,
        'en': `/en/daily/music_to_dance/2026-06-23`,
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
      date="2026-06-23"
      roleId="music_to_dance"
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
