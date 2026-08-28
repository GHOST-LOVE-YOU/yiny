import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '统一世界-动作建模、跨 embodiment 物理预测与预测编码控制',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'Riemann-1.0 在统一因果序列中共同建模多视角观测、机器人状态与 embodiment-specific actions',
      'CLAP 用跨 embodiment 动作条件视频生成吸收人类与机器人视频中的通用物理规律，并支持真实任务迁移',
      'Zero-WAM 将人类示范视频作为上下文任务规范，PredVLA 则以预测误差驱动紧凑 latent 状态修正',
      'TemporalFlow-VLA 以物理监督压缩执行历史，说明长时操控中的状态记忆仍是 VLA/WAM 的关键接口',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Unified-Discrete · Causal State Transitions',
        title: 'Riemann-1.0: An Embodied World Action Model for Physical AI',
        keyPoints: [
          '在统一因果自回归序列中联合建模多视角视觉观测、机器人状态与 embodiment-specific actions，将动作和世界演化表示为因果状态转移',
          '同一模型同时承担可执行机器人策略与 action-conditioned 多 embodiment 视觉世界模拟器',
          '通过渐进式具身预训练统一 egocentric human videos、handheld-gripper demonstrations 与异构机器人轨迹，训练数据超过 200K 小时',
          '在 RoboTwin2.0、LIBERO、RoboCasa-365 与真实长时操控上分别报告 94.3%、99.0%、62.6% 和 85.0% 成功率',
        ],
        description: 'Riemann-1.0 是今日最直接的统一 WAM 代表：世界状态预测不再是策略外部的辅助分支，而是与动作、机器人状态共享一个因果序列。它把在线控制和动作条件模拟器合并到同一个接口，重点价值在于跨 embodiment 数据的统一训练与部署复用。对 WAM 研究而言，关键观察是“世界演化”被定义为可执行状态转移，而不只是视觉上逼真的未来帧。',
        href: 'https://arxiv.org/abs/2608.27033v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Action-Conditioned Video Generation · Cross-Embodiment',
        title: 'CLAP: Cross-Embodiment Video World Models are Zero-Shot Physical Simulators',
        keyPoints: [
          '提出跨 embodiment action-conditioned video generation，从人类与机器人互联网规模视频中学习可泛化的物理先验',
          '用 end-effector poses、自然语言指令和 learned latent actions 对齐不同机器人平台及无显式动作的人类视频',
          '采用先用 latent actions 学习无标注视频物理先验、再落地到 end-effector action space 的课程式训练',
          '通过跨策略规划与视频世界模型中的强化学习微调，将跨 embodiment 模型用于真实任务并改进现有机器人策略',
        ],
        description: 'CLAP 把 WAM 的泛化问题从单一机器人数据集扩展到跨 embodiment 物理学习。它的级联结构先预测动作条件下的视频世界，再把世界模型用于策略规划或微调，因此属于 Cascaded WAM；真正的贡献在于动作空间对齐和从人类视频迁移物理先验，而不是单纯提升视频观感。',
        href: 'https://arxiv.org/abs/2608.27406v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled · In-Context Control',
        title: 'Zero-WAM: In-Context World-Action Modeling from Human Videos for Open-Ended Task Generalization',
        keyPoints: [
          '提出因果视频-动作模型，以人类示范视频作为上下文任务规范，在不更新参数的情况下执行训练外操作任务',
          '构建 HumanGen，自动匹配任务采样机器人轨迹与语义对应的人类视频，形成 74.2K 组人机 ICL 数据，覆盖 8.6K 任务',
          '引入 in-context future chunk prediction，抑制已见任务捷径并迫使策略从视频提示读取任务演化信息',
          '在 RoboTwin 2.0 七个未见任务上达到 47.0% 平均成功率，较最强视频-动作基线提升 29.5 个百分点，并验证真实机器人泛化',
        ],
        description: 'Zero-WAM 将“任务要怎样发展”直接放进 video-action 上下文，而不是只把人类视频当成外观条件。未来 chunk prediction 把未来世界结构与下一步可执行动作绑定，令跨任务泛化成为上下文中的任务推断与闭环执行。它属于显式解耦的自回归 Joint WAM，实验覆盖仿真和真实机器人长时、多物体及精细插入场景。',
        href: 'https://arxiv.org/abs/2608.26103v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent · Predictive Coding',
        title: 'PredVLA: A Sub-Million-Parameter Predictive-Coding Policy for Robot Manipulation',
        keyPoints: [
          '用分层生成式循环动力学预测视觉特征与本体感知，只有 0.68M 可训练网络参数且无需机器人数据预训练',
          '观测只通过在线 sensory prediction errors 推断影响 latent state，提供明确的闭环状态修正机制',
          '在 LIBERO 三个短时程套件上平均成功率为 86.9%，纳入长时程套件后为 75.4%',
          '禁用 prediction-error inference 可构成精确 open-loop 对照，使观察驱动的修正贡献可直接测量',
        ],
        description: 'PredVLA 并非完整的显式未来视频生成器，但它满足 predictive-latent WAM 的核心耦合：生成式动态预测未来感知状态，预测误差再用于在线修正控制 latent。其参数效率和可测量的 open-loop 对照，说明世界建模价值不必依赖庞大的视频 backbone，也可以体现在动作策略的状态估计接口中。',
        href: 'https://arxiv.org/abs/2608.26673v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'TemporalFlow-VLA: Learning Physically Grounded Execution History for Long-Horizon Robot Manipulation', tag: 'Predictive-Latent · Execution History · 参考延伸', href: 'https://arxiv.org/abs/2608.26821v1', description: '用机器人状态、几何与标定相机构造训练期 temporal flow，学习两个与执行对齐的 temporal queries；在 LIBERO Long 和 RoboTwin 上改善长时、多阶段操控，并保持单帧级服务端采样延迟。它更偏历史状态表示，但直接连接物理变化、动作预测与长时闭环。' },
      { num: 2, title: 'PAWBench: How Far Are We from Probabilistically Aligned World Modeling?', tag: 'World-Model Evaluation · Action-Conditioned Futures · 参考延伸', href: 'https://arxiv.org/abs/2608.27345v1', description: '将世界模型要求从单条“看起来合理”的轨迹提升为同一初始观测和动作下的行为分布复现，提出 probabilistic alignment 评估视角。论文更偏评价而非策略，但为判断 action-conditioned 视频世界模型是否真正具有模拟器性质提供了重要标准。' },
    ],
    observation: '今日的新作覆盖 WAM 的三个关键接口：Riemann-1.0 将动作、机器人状态和世界演化统一为因果状态转移；CLAP 通过跨 embodiment 动作条件视频学习可迁移物理；Zero-WAM 把人类视频变成未见任务的上下文规范。PredVLA 则给出另一条低成本路线，用预测误差而非像素级未来生成维持闭环状态。整体趋势是从“生成逼真的未来”转向“让未来预测直接改变可执行动作”，并同时关注跨 embodiment 数据、长时记忆和模拟器可靠性。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Unified World-Action Modeling, Cross-Embodiment Physics, and Predictive-Coding Control',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'Riemann-1.0 jointly models multi-view observations, robot states, and embodiment-specific actions in one causal sequence',
      'CLAP learns transferable physics from cross-embodiment action-conditioned video and transfers it to real tasks',
      'Zero-WAM uses human demonstrations as in-context task specifications, while PredVLA uses prediction errors to correct a compact latent state',
      'TemporalFlow-VLA compresses physically grounded execution history, highlighting long-horizon state memory as a key VLA/WAM interface',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Unified-Discrete · Causal State Transitions',
        title: 'Riemann-1.0: An Embodied World Action Model for Physical AI',
        keyPoints: [
          'Jointly models multi-view visual observations, robot states, and embodiment-specific actions in one causal autoregressive sequence',
          'The same model serves as an executable robot policy and an action-conditioned visual simulator across embodiments',
          'Progressive embodied pretraining unifies egocentric human videos, handheld-gripper demonstrations, and heterogeneous robot trajectories across 200K+ hours',
          'Reports 94.3%, 99.0%, 62.6%, and 85.0% success rates on RoboTwin2.0, LIBERO, RoboCasa-365, and long-horizon real-world manipulation',
        ],
        description: 'Riemann-1.0 is the most direct unified WAM result today: world-state prediction is not an auxiliary branch outside the policy, but shares a causal sequence with actions and robot states. Combining online control with an action-conditioned simulator creates one reusable interface for cross-embodiment training and deployment. The important WAM distinction is that world evolution is represented as executable state transitions, not merely plausible future frames.',
        href: 'https://arxiv.org/abs/2608.27033v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Action-Conditioned Video Generation · Cross-Embodiment',
        title: 'CLAP: Cross-Embodiment Video World Models are Zero-Shot Physical Simulators',
        keyPoints: [
          'Introduces cross-embodiment action-conditioned video generation to learn generalizable physical priors from internet-scale human and robot videos',
          'Aligns heterogeneous platforms and action-free human videos with end-effector poses, language instructions, and learned latent actions',
          'Uses a curriculum that first learns physical priors from unlabeled video with latent actions, then grounds them in end-effector action spaces',
          'Uses cross-policy planning and reinforcement-learning fine-tuning in the video world model to improve existing robot policies on real tasks',
        ],
        description: 'CLAP expands WAM generalization beyond a single robot dataset. Its cascaded design predicts action-conditioned video futures and then uses the world model for policy planning or fine-tuning, so it belongs to Cascaded WAM. The substantive contribution is action-space alignment and transfer of physical priors from human video, rather than video realism alone.',
        href: 'https://arxiv.org/abs/2608.27406v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled · In-Context Control',
        title: 'Zero-WAM: In-Context World-Action Modeling from Human Videos for Open-Ended Task Generalization',
        keyPoints: [
          'Introduces a causal video-action model that treats a human demonstration as an in-context task specification without parameter updates',
          'Builds HumanGen with 74.2K human-robot ICL pairs across 8.6K tasks by matching sampled robot trajectories with semantically aligned human videos',
          'Uses in-context future chunk prediction to suppress seen-task shortcuts and make the policy recover task evolution from the video prompt',
          'Reaches 47.0% average success on seven unseen RoboTwin 2.0 tasks, 29.5 points above the strongest video-action baseline, with real-robot generalization',
        ],
        description: 'Zero-WAM places the evolution of a task directly in the video-action context instead of using human video only as an appearance condition. Future-chunk prediction binds future world structure to executable next actions, turning cross-task generalization into in-context task inference and closed-loop execution. It is an explicit-decoupled autoregressive Joint WAM evaluated in simulation and on long-horizon, multi-object, and insertion tasks on real robots.',
        href: 'https://arxiv.org/abs/2608.26103v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent · Predictive Coding',
        title: 'PredVLA: A Sub-Million-Parameter Predictive-Coding Policy for Robot Manipulation',
        keyPoints: [
          'Uses hierarchical generative recurrent dynamics to predict visual features and proprioception with only 0.68M trainable parameters and no robot-data pretraining',
          'Lets observations influence the latent state only through online inference from sensory prediction errors, providing explicit closed-loop correction',
          'Achieves 86.9% mean success across three LIBERO short-horizon suites and 75.4% with the long-horizon suite included',
          'Disabling prediction-error inference creates an exact open-loop condition, making the value of observation-driven correction measurable',
        ],
        description: 'PredVLA is not an explicit future-video generator, but it meets the core predictive-latent WAM coupling: generative dynamics predict future sensory state and prediction errors correct the control latent online. Its parameter efficiency and exact open-loop comparison show that world modeling can shape action-policy state estimation without a massive video backbone or pixel-level rollout.',
        href: 'https://arxiv.org/abs/2608.26673v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'TemporalFlow-VLA: Learning Physically Grounded Execution History for Long-Horizon Robot Manipulation', tag: 'Predictive-Latent · Execution History · Further Reading', href: 'https://arxiv.org/abs/2608.26821v1', description: 'Uses robot states, geometry, and calibrated cameras to construct training-only temporal-flow supervision and learn two execution-aligned temporal queries. It improves long-horizon, multi-stage manipulation on LIBERO Long and RoboTwin while retaining single-frame-level server-side sampling latency. It is closer to history representation than a full WAM, but directly connects physical change, action prediction, and closed-loop execution.' },
      { num: 2, title: 'PAWBench: How Far Are We from Probabilistically Aligned World Modeling?', tag: 'World-Model Evaluation · Action-Conditioned Futures · Further Reading', href: 'https://arxiv.org/abs/2608.27345v1', description: 'Raises the evaluation target from one plausible trajectory to recovery of the behavior distribution under the same initial observation and action. The paper focuses on evaluation rather than policy learning, but offers an important standard for judging whether action-conditioned video models behave like simulators.' },
    ],
    observation: 'Today’s papers cover three critical WAM interfaces. Riemann-1.0 unifies actions, robot states, and world evolution as causal state transitions; CLAP learns transferable physics through cross-embodiment action-conditioned video; and Zero-WAM turns human video into an in-context specification for unseen tasks. PredVLA offers a lower-cost route in which prediction errors, rather than pixel-level future generation, maintain the closed-loop state. The broader shift is from generating plausible futures to making future prediction directly change executable actions, with cross-embodiment data, long-horizon memory, and simulator faithfulness as the next constraints.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-08-28',
        en: '/en/daily/world-action-model/2026-08-28',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-08-28" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
