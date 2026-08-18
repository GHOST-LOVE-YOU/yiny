import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '世界模型引导的长时程机器人规划与潜空间闭环避障',
    description: 'World Action Model 研究日报',
    overview: [
      'τ₀-VLA 将世界模型引导的测试时计算用于层级 VLA 的子任务生成与长时程操作',
      'Orbit-Planner 以动作条件潜空间 rollout 和物理状态解码支持卫星智能体闭环避障',
      'DriveCache 展示动作感知的驾驶世界模型扩散推理缓存，但尚未形成动作生成闭环',
      'Awesome-WAM 新增 HiMem-WAM 与 Flash-WAM，均标记为参考清单新增而非本日论文',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'τ₀-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation',
        keyPoints: [
          '将高层子任务生成表述为可扩展的测试时计算问题：策略先利用执行记忆提出子任务，必要时搜索多个候选后再提交',
          '低层策略跨多个机器人本体执行生成的子任务，使世界模型的预测与层级 policy 的长时程决策直接耦合',
          '模型在 40,115 小时异构真实世界数据上进行多模态协同训练，并在域内和分布偏移设置中评估',
          '增加测试时计算可提升下一子任务预测准确率，并转化为长时程机器人操作任务更高的闭环成功率',
        ],
        description: 'τ₀-VLA 的 WAM 价值在于把世界模型从离线预测器变成高层 policy 的搜索与决策接口。摘要没有声称显式生成视频或 latent trajectory，因此它更接近 taxonomy 中以预测性世界模型支撑 planning 的联合自回归路线；关键实验信号是额外计算不仅改善子任务判定，还改善真实机器人闭环结果。后续应核对正文中世界模型的预测对象、候选评估方式及其与动作生成器的参数共享程度。',
        href: 'https://arxiv.org/abs/2608.16885',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Action-Conditioned Latent Rollout',
        title: 'Orbit-Planner: Towards Latent World Models for On-Orbit Obstacle Avoidance of Satellite Agents',
        keyPoints: [
          '提出两阶段潜空间世界模型，学习动作条件化的航天器动力学并在 latent space 中执行未来状态 rollout',
          '引入 Physics Probe，从想象的 latent 轨迹中解码物理状态变化，使规划结果具备可解释的状态接口',
          '针对有限机载观测下的在轨导航和动态障碍规避，报告长时程潜空间 rollout 与物理状态恢复能力',
          '在 Isaac Sim 的闭环避障导航中取得 91.7% 成功率，并公开代码',
        ],
        description: 'Orbit-Planner 明确满足 WAM 的动作条件世界预测与闭环控制边界：动作进入动力学模型，未来 latent 轨迹再被解码为物理状态并用于避障导航。它属于 Cascaded WAM，而不是联合扩散生成，因为动作规划和世界预测通过 rollout 与 Physics Probe 串接。卫星场景与机械臂分布不同，但有限观测、长时程 imagined rollout 和物理可解码性对机器人世界模型同样具有直接参考价值。',
        href: 'https://arxiv.org/abs/2608.16651',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'DriveCache: Action-Aware Caching for Driving World Model Inference',
        tag: 'Cascaded WAM · Action-Aware World-Model Inference',
        href: 'https://arxiv.org/abs/2608.16354',
        description: '面向扩散式驾驶世界模型，利用自车速度和规划轨迹决定特征复用，并通过动态规划安排去噪步骤中的缓存刷新；因果漂移检查会在生成偏离校准时重新规划。它把动作信号用于未来场景生成效率控制，并直接服务仿真和规划评估，但摘要未报告由生成结果直接选择或生成动作，因此列为边界相关参考。',
      },
    ],
    observation: '本日最强信号是 WAM 的世界预测接口正在从“生成未来画面”转向“为长时程决策分配计算并验证候选动作”。τ₀-VLA 以世界模型引导测试时搜索连接层级子任务和闭环成功，Orbit-Planner 则以动作条件 latent rollout 与物理状态 probe 形成可解码的避障链路。扩散方向的 DriveCache 说明动作先验也能用于控制世界模型推理成本，但尚缺策略闭环证据。Awesome-WAM 的 HiMem-WAM 与 Flash-WAM 是清单新增，需作为参考条目跟踪，不能计入本日新论文。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'World-Model-Guided Long-Horizon Robot Planning and Latent Closed-Loop Avoidance',
    description: 'Daily research digest for World Action Models',
    overview: [
      'τ₀-VLA uses world-model-guided test-time computation for hierarchical subtask generation and long-horizon manipulation',
      'Orbit-Planner combines action-conditioned latent rollouts with physical-state decoding for closed-loop satellite avoidance',
      'DriveCache presents action-aware diffusion inference caching for driving world models without a complete action-generation loop',
      'Awesome-WAM added HiMem-WAM and Flash-WAM; both are new reference-list entries rather than papers published today',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'τ₀-VLA: a Hierarchical Robot Foundation Model with World-Model-Guided Test-Time Computation',
        keyPoints: [
          'Formulates high-level subtask generation as a compute-scalable test-time problem: the policy proposes a subtask from execution memory and searches alternatives when needed',
          'A low-level policy executes the generated subtask across multiple robot embodiments, directly coupling world-model support with hierarchical policy decisions',
          'Trains on 40,115 hours of heterogeneous real-world data with multimodal co-training and evaluates both in-domain and distribution-shifted settings',
          'Additional test-time computation improves next-subtask prediction and translates into higher closed-loop success on long-horizon robot manipulation tasks',
        ],
        description: 'τ₀-VLA treats the world model as a search and decision interface for a high-level policy rather than merely an offline predictor. The abstract does not claim explicit video or latent-trajectory generation, so it is closest to a predictive world-model route in the joint autoregressive taxonomy. The important empirical signal is that extra computation improves both subtask decisions and real-robot closed-loop outcomes. The full paper should be checked for the predicted object, candidate evaluation mechanism, and the degree of parameter sharing with the action generator.',
        href: 'https://arxiv.org/abs/2608.16885',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Action-Conditioned Latent Rollout',
        title: 'Orbit-Planner: Towards Latent World Models for On-Orbit Obstacle Avoidance of Satellite Agents',
        keyPoints: [
          'Introduces a two-stage latent world model that learns action-conditioned spacecraft dynamics and rolls out future states in latent space',
          'Uses a Physics Probe to decode physical-state changes from imagined latent trajectories, providing an interpretable state interface for planning',
          'Targets on-orbit navigation and dynamic obstacle avoidance under limited onboard observations, with long-horizon latent rollouts and state recovery',
          'Reports 91.7% success in closed-loop obstacle-avoidance navigation in Isaac Sim and releases code',
        ],
        description: 'Orbit-Planner clearly meets the action-conditioned world-prediction and closed-loop-control boundary: actions enter the dynamics model, while future latent trajectories are decoded into physical states for avoidance navigation. It is a Cascaded WAM rather than a joint diffusion generator because prediction and action planning are connected through rollout and a Physics Probe. Although the satellite domain differs from manipulation, limited observation, long-horizon imagined rollouts, and physical decodability are directly relevant to embodied world models.',
        href: 'https://arxiv.org/abs/2608.16651',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'DriveCache: Action-Aware Caching for Driving World Model Inference',
        tag: 'Cascaded WAM · Action-Aware World-Model Inference',
        href: 'https://arxiv.org/abs/2608.16354',
        description: 'For diffusion driving world models, DriveCache uses ego speed and planned trajectories to allocate feature reuse and dynamic programming to schedule cache refreshes across denoising steps; a causal drift check replans when generation leaves calibration. It uses action signals to control future-scene generation efficiency and serves simulation and planning evaluation, but the abstract does not report actions selected or generated directly from the predicted scenes, so it remains a boundary-relevant reference.',
      },
    ],
    observation: 'The strongest signal today is that WAM interfaces are moving from generating future frames toward allocating computation for long-horizon decisions and validating candidate actions. τ₀-VLA connects hierarchical subtasks to closed-loop success through world-model-guided test-time search, while Orbit-Planner forms a decodable avoidance loop with action-conditioned latent rollouts and a physical-state probe. DriveCache shows how action priors can also reduce world-model inference cost, although policy-loop evidence is still missing. HiMem-WAM and Flash-WAM are new Awesome-WAM list entries and are tracked as references, not counted as papers published in this window.',
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
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/world-action-model/2026-08-18',
        en: '/en/daily/world-action-model/2026-08-18',
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
      date="2026-08-18"
      roleId="world-action-model"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
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

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
