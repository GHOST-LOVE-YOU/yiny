import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '动作跟随、潜在意图与实时闭环：WAM 的可执行未来预测',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'WorldSync 揭示动作条件世界模型在专家分布外的动作跟随缺口，并以干预对齐改善策略学习',
      'LAWA 用紧凑潜在动作表达未来意图，在保留未来想象收益的同时降低推理延迟',
      'GaussianWAM 将 3D 几何与语义蒸馏进 WAM 当前观测表示，部署路径无需额外模块',
      'TrAct 以视觉轨迹连接动作候选、未来视频预测和指令奖励选择',
      'Cosmos-H-Dreams 把动作条件视频模型蒸馏为可实时交互的外科机器人模拟器',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Action-Conditioned Generation · Policy Learning',
        title: 'Do Robotic World Models Really Follow Actions? Diagnosing and Aligning Action-Conditioned Generation for Policy Learning',
        keyPoints: [
          '提出 WorldEcho，在比专家示范更宽的动作分布上用视觉完整性和 SE(3) 轨迹对齐评测世界模型是否真正执行指令动作',
          '发现现有模型对专家动作跟随较好，但对分布外动作可能忽略指令或生成视觉无效的 rollout',
          '提出 WorldSync，从分布覆盖、表征 grounding 和干预效果对齐三方面训练动作条件生成',
          'RoboTwin 与真实机器人实验显示，改进后的模型可作为更可靠的迭代式策略改进模拟器',
        ],
        description: '这篇工作把 WAM 的核心假设变成可检验问题：模型生成的未来是否真的对应所给动作。WorldEcho 暴露了专家动作评测掩盖的 off-expert 失真，而 WorldSync 用动作后果覆盖、Action-Forcing Expert 和干预变化对齐补足训练信号。对闭环策略而言，世界模型的视觉逼真度只有在动作因果关系可信时才有价值。',
        href: 'https://arxiv.org/abs/2608.24885v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Predictive Latent',
        title: 'Latent Action as Intention Enables Efficient Future Imagination for World Action Models',
        keyPoints: [
          '提出 LAWA，以紧凑潜在动作作为未来意图的操作表示，避免测试时生成完整未来视频',
          '动作无关预训练的离散 tokenizer 产生面向操作的 codebook target，并与连续潜在状态联合去噪',
          '联合生成未来 latent state 与可执行 action chunks，使未来想象收益保留在低延迟路径中',
          'RoboCasa few-shot/full-data 成功率为 65.6%/80.8%，较匹配 Fast-WAM 延迟降低 42.9%',
        ],
        description: 'LAWA 针对 WAM 的效率瓶颈给出有针对性的折中：未来想象仍参与动作建模，但部署时不再付出未来观测生成成本。将潜在动作解释为“意图”而非单纯控制 token，使 latent dynamics 与 action chunk 之间形成可执行接口；这对数据稀缺和分布外泛化尤其重要。',
        href: 'https://arxiv.org/abs/2608.24882v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Multi-stream · Shared Representation',
        title: 'GaussianWAM: Distilling Geometry and Semantics from 3D Gaussian Fields into World-Action Models',
        keyPoints: [
          '用同步多视角观测、深度、相机参数和密集语义特征构建共享 3D Gaussian primitives',
          '渲染空间对齐的语义、深度和覆盖目标，并将几何语义监督蒸馏到 WAM 当前观测表示',
          '训练后移除教师模型、Gaussian 组件和辅助头，保留原始 WAM 推理路径且不增加前向计算',
          'LIBERO-Plus 上将 FastWAM 成功率从 52.05% 提升到 71.29%，并改善标准 LIBERO、RoboTwin 和真实操作迁移',
        ],
        description: 'GaussianWAM 的重点不是增加一个更重的部署世界模型，而是修正 WAM 表征的训练目标。视频预测 latent 若只服务外观预测，可能缺少跨视角几何和物体局部语义；3D Gaussian 场把这些信号组织到共同空间，再在训练期注入当前观测表示，为动作生成提供更适合空间推理的状态。',
        href: 'https://arxiv.org/abs/2608.24714v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Visual-Track Interface · Closed-Loop Planning',
        title: 'TrAct: Bridging Robot Control and Visual Prediction with Visual Tracks',
        keyPoints: [
          '用视觉轨迹表示任务点在场景中的运动，作为比 embodiment-specific action 更密集且可迁移的预测接口',
          'VLAT 联合预测动作和视觉轨迹，track-conditioned world model 预测未来视觉结果',
          'VLAC 依据指令对候选未来进行评分，执行与最佳轨迹配对的动作',
          'LIBERO-INTEGRAL 上仿真成功率从 27% 提升至 55%，真实 Franka 任务从 49% 提升至 76%',
        ],
        description: 'TrAct 把动作到视觉变化之间的错位显式化，并引入视觉轨迹作为共享中间语言。规划流程不只是生成动作后盲目执行，而是先提出 action-track 候选、在世界模型中检验视觉后果，再由视觉语言奖励模型选择。这个接口为跨 embodiment 的 WAM 训练和可解释的候选筛选提供了清晰路径。',
        href: 'https://arxiv.org/abs/2608.24101v1',
      },
      {
        num: 5,
        tag: 'Cascaded WAM · Explicit Future Generation · Real-Time Simulation',
        title: 'NVIDIA Cosmos-H-Dreams: Real-Time Generative Physics Simulation for Surgical Robotics',
        keyPoints: [
          '整合动作条件外科视频世界模型、teacher-to-student 蒸馏和 FlashDreams 流式推理栈',
          '用 Self Forcing 将双向教师蒸馏为因果少步学生，在单张 RTX PRO 6000 Blackwell 上约 160 FPS 推理',
          '控制器无关：键盘、Meta Quest、商业外科机器人控制台和学习策略都可驱动合成世界',
          '支持学习策略闭环操作并实时观察组织动态后果，形成可交互的外科机器人模拟器',
        ],
        description: 'Cosmos-H-Dreams 展示了动作条件生成模型从被动视频生成器走向可用模拟器的工程路径。关键不只在速度，而在它允许不同控制接口进入同一合成世界，并让策略在闭环中观察动作后果。对于 WAM，实时性因此成为训练数据生成、策略评估和交互式规划的共同基础设施。',
        href: 'https://arxiv.org/abs/2608.24199v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'LeFlow: Generative Latent Flow Planning for World Models', tag: '边界相关 · Latent Planning', href: 'https://arxiv.org/abs/2608.24855v1', description: '在冻结的 latent world model dynamics 上学习可复用的 latent trajectory prior，以 rectified flow 生成未来 latent 路径、用 inverse dynamics 解码 action chunks，再以自回归 rollout 验证候选；四个 goal-conditioned 控制基准显示规划时间降低一个数量级，但重点是规划摊销而非新的 WAM 联合生成架构。' },
      { num: 2, title: 'XP-JEPA: Cross-Predictive Physics Grounding for Forecastable Latent Dynamics', tag: '边界相关 · Predictive Latent · Physics Grounding', href: 'https://arxiv.org/abs/2608.24044v1', description: '以共享 action-conditioned predictor 同时推进视觉观测与特权物理状态，并将两路预测匹配到未来表示；训练后丢弃物理分支，视觉模型仍可用于 rollout 控制。它强化了可预测 latent dynamics，但尚未呈现完整的 world-action 生成架构。' },
    ],
    observation: '今日最重要的信号是 WAM 评价标准正在从“能否生成看起来合理的未来”转向“是否忠实执行动作并支持策略改进”。WorldSync 直接测量并修复动作后果的偏差，TrAct 用视觉轨迹把控制与视觉预测连接起来，LAWA 则说明未来想象可以压缩成潜在意图以满足实时控制。GaussianWAM 和 Cosmos-H-Dreams 分别从表征监督与系统推理两端补强闭环：前者让状态更适合空间决策，后者让动作后果能被快速反复验证。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Action Following, Latent Intentions, and Real-Time Closed Loops for Executable WAM Futures',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'WorldSync exposes off-expert action-following failures and aligns action-conditioned generation with policy improvement',
      'LAWA represents future intent with compact latent actions while retaining future-imagination benefits at lower latency',
      'GaussianWAM distills 3D geometry and semantics into WAM observations without adding deployment modules',
      'TrAct uses visual tracks to connect candidate actions, future video prediction, and instruction-based selection',
      'Cosmos-H-Dreams distills an action-conditioned video model into a real-time interactive surgical simulator',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Action-Conditioned Generation · Policy Learning',
        title: 'Do Robotic World Models Really Follow Actions? Diagnosing and Aligning Action-Conditioned Generation for Policy Learning',
        keyPoints: [
          'Introduces WorldEcho to test whether world models execute commanded actions across a broader distribution using visual integrity and SE(3) trajectory alignment',
          'Shows that current models follow expert actions reasonably well but may ignore off-expert commands or produce visually invalid rollouts',
          'Introduces WorldSync, aligning training with distributional coverage, representational grounding, and intervention effects',
          'RoboTwin and real-robot experiments show improved simulator reliability for iterative policy improvement',
        ],
        description: 'This work turns a central WAM assumption into a measurable question: does the generated future actually correspond to the supplied action? WorldEcho reveals how expert-only evaluation hides off-expert failures, while WorldSync adds action-consequence coverage, an Action-Forcing Expert, and intervention alignment. For closed-loop policy learning, visual realism matters only when the model preserves the causal relationship between actions and futures.',
        href: 'https://arxiv.org/abs/2608.24885v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Predictive Latent',
        title: 'Latent Action as Intention Enables Efficient Future Imagination for World Action Models',
        keyPoints: [
          'Introduces LAWA, using compact latent actions as operational future intentions instead of generating full future videos at test time',
          'An action-free-pretrained discrete tokenizer produces manipulation-centric codebook targets for the latent dynamics',
          'Jointly denoises a continuous latent state and executable action chunks, retaining future imagination in a low-latency path',
          'Reaches 65.6% and 80.8% success on RoboCasa few-shot and full-data settings with 42.9% lower inference latency',
        ],
        description: 'LAWA offers a targeted compromise for the efficiency bottleneck in WAMs: future imagination still shapes action modeling, but deployment no longer pays for full future-observation generation. Treating latent actions as intentions creates an executable interface between latent dynamics and action chunks, which is especially useful under scarce demonstrations and distribution shift.',
        href: 'https://arxiv.org/abs/2608.24882v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Multi-stream · Shared Representation',
        title: 'GaussianWAM: Distilling Geometry and Semantics from 3D Gaussian Fields into World-Action Models',
        keyPoints: [
          'Builds shared 3D Gaussian primitives from synchronized multi-view observations, depth, camera parameters, and dense semantic features',
          'Renders spatially aligned semantic, depth, and coverage targets and distills them into current-observation WAM representations',
          'Removes teachers, Gaussian components, and auxiliary heads after training, leaving the original inference path unchanged',
          'Improves FastWAM on LIBERO-Plus from 52.05% to 71.29% and transfers to standard LIBERO, RoboTwin, and real manipulation',
        ],
        description: 'GaussianWAM improves the WAM training target rather than adding a heavier deployment world model. Video-prediction latents may capture appearance while missing cross-view geometry and local object semantics; the Gaussian field organizes these signals in a common space before injecting them into current observations. The resulting representation is better aligned with spatial reasoning for action generation.',
        href: 'https://arxiv.org/abs/2608.24714v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Visual-Track Interface · Closed-Loop Planning',
        title: 'TrAct: Bridging Robot Control and Visual Prediction with Visual Tracks',
        keyPoints: [
          'Uses visual tracks as a dense, embodiment-agnostic interface for task-relevant point motion',
          'VLAT jointly predicts candidate actions and tracks, while a track-conditioned world model predicts future visual outcomes',
          'VLAC scores candidates against the instruction and executes the action paired with the selected track',
          'Success rises from 27% to 55% in simulation and from 49% to 76% on real Franka tasks',
        ],
        description: 'TrAct makes the mismatch between robot actions and image-space changes explicit and introduces visual tracks as a shared intermediate language. The system proposes action-track pairs, checks their visual consequences in a world model, and selects among them with a vision-language reward model. This provides a clear route toward cross-embodiment WAM training and interpretable candidate selection.',
        href: 'https://arxiv.org/abs/2608.24101v1',
      },
      {
        num: 5,
        tag: 'Cascaded WAM · Explicit Future Generation · Real-Time Simulation',
        title: 'NVIDIA Cosmos-H-Dreams: Real-Time Generative Physics Simulation for Surgical Robotics',
        keyPoints: [
          'Combines an action-conditioned surgical video world model, teacher-to-student distillation, and the FlashDreams streaming stack',
          'Uses Self Forcing to distill a bidirectional teacher into a causal few-step student at about 160 FPS on one RTX PRO 6000 Blackwell GPU',
          'Is controller-agnostic: keyboards, Meta Quest, commercial surgical consoles, and learned policies can drive the synthetic world',
          'Supports closed-loop learned-policy control while exposing real-time visual consequences in the surgical simulator',
        ],
        description: 'Cosmos-H-Dreams shows how an action-conditioned generator can become a usable simulator rather than a passive video model. The important result is not only speed: multiple control interfaces can enter the same synthetic world, and policies can observe the consequences of their actions in a loop. Real-time inference thus becomes shared infrastructure for data generation, policy evaluation, and interactive planning.',
        href: 'https://arxiv.org/abs/2608.24199v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'LeFlow: Generative Latent Flow Planning for World Models', tag: 'Adjacent Work · Latent Planning', href: 'https://arxiv.org/abs/2608.24855v1', description: 'Learns a reusable latent trajectory prior over frozen world-model dynamics, generates future latent paths with rectified flow, decodes action chunks with inverse dynamics, and verifies candidates through autoregressive rollout. It cuts planning time by an order of magnitude on four goal-conditioned control benchmarks, but focuses on amortized planning rather than a new joint world-action generation architecture.' },
      { num: 2, title: 'XP-JEPA: Cross-Predictive Physics Grounding for Forecastable Latent Dynamics', tag: 'Adjacent Work · Predictive Latent · Physics Grounding', href: 'https://arxiv.org/abs/2608.24044v1', description: 'A shared action-conditioned predictor advances visual observations and privileged physical states, matching both predictions to future representations; the physical branch is discarded after training. It improves forecastable latent dynamics for rollout control, but does not present a complete world-action generation architecture.' },
    ],
    observation: 'The strongest signal today is a shift in WAM evaluation from “can it generate a plausible-looking future?” to “does it faithfully execute actions and support policy improvement?” WorldSync measures and repairs action-consequence errors, TrAct connects control to visual prediction through tracks, and LAWA compresses future imagination into latent intentions for real-time control. GaussianWAM and Cosmos-H-Dreams strengthen the loop from opposite ends: representation supervision makes states more useful for spatial decisions, while real-time inference makes action consequences cheap to verify repeatedly.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/world-action-model/2026-08-26',
        en: '/en/daily/world-action-model/2026-08-26',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-08-26" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>
        {c.papers.map(paper => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <KeyPoints points={paper.keyPoints} />
            <p className="text-[#2C2C24] leading-relaxed">{paper.description}</p>
            <PaperLink href={paper.href} title={paper.title} />
          </Paper>
        ))}
      </MustRead>
      <WorthReading>
        {c.worthReading.map(item => (
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>
        ))}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
