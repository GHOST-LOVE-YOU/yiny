import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '统一扩散 WAM、因果互惠训练与潜空间动作验证',
    description: 'World Action Model 研究论文日报',
    overview: [
      'P³-WAM 在同一视频扩散骨干中统一三维感知、动作条件未来预测与视觉—动作联合规划',
      'OneWM 以统一因果视频—动作架构实证世界建模与动作学习可以双向增益',
      'TS-WAM 与 VeriVLA 分别把未来 latent 用于端到端动作生成和测试时动作候选验证',
      '今日强相关论文集中涌现，覆盖联合生成、共享预测表征与级联规划三条 WAM 路线',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-stream / Cross-attention',
        title: 'Perceive, Predict, and Plan: a Unified World Action Model for Egocentric Dexterous Manipulation',
        keyPoints: [
          '以 Perceive、Predict、Plan 三种模式统一三维手部与相机重建、给定动作的视觉未来生成，以及动作轨迹与预期视觉后果的联合生成',
          '把紧凑结构化三维动作表示接入预训练视频扩散 Transformer，采用共享基础权重、模态专属适配器和双向视觉—动作注意力',
          '通过随机控制模态可见性，让视频与三维动作在三种模式中都可充当条件或预测目标',
          '统一训练在四个数据集上同时改善三维手部重建、动作条件视频预测和目标导向规划',
        ],
        description: 'P³-WAM 是今天最完整的联合式 WAM：它不是先生成视频再外挂动作头，而是在扩散骨干内让视觉与三维动作双向交互，并在 Plan 模式共同生成可执行轨迹及其视觉后果。按 taxonomy 属于 Joint WAM - Diffusion 的 multi-stream / cross-attention 路线。其关键价值是把感知、前向动力学与规划置于共享参数体系中；后续应重点核验联合生成的动作能否在真实机器人闭环执行，以及视觉质量指标与控制成功率是否一致。',
        href: 'https://arxiv.org/abs/2610.22363v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Explicit-decoupled / Unified Causal',
        title: 'Can World and Action Modeling Benefit Each Other under Unified Causal Training?',
        keyPoints: [
          '提出 OneWM，在共享视频—动作架构中把动作同时作为世界预测条件和策略学习目标',
          '在 LIBERO、LIBERO-Plus、RoboCasa365 与真实机器人实验中检验世界建模和动作学习的双向作用',
          '学习指定动作的视觉后果可提升策略性能与跨场景泛化',
          '反向来看，动作学习也提升同一架构下的多视角世界预测保真度',
        ],
        description: 'OneWM 直接回答 WAM 的核心科学问题：共享因果训练中的世界与动作任务是否只是共存，还是能真正互相促进。结果支持后者，因此它比“世界预测作为辅助损失”的弱耦合方案更重要。按 taxonomy 可归入 Joint WAM - Autoregressive 的 explicit-decoupled 统一因果训练：动作既条件化未来，也由同一架构生成。它为架构选择提供了清晰基线，但摘要未给出长时闭环规划机制，未来仍需观察互惠增益在滚动执行中的误差累积。',
        href: 'https://arxiv.org/abs/2610.21095v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Predictive-latent',
        title: 'TS-WAM: Temporal Latent Actions and World-Action Coupling for Vision-Language Robot Control',
        keyPoints: [
          '用 EMA 目标分支的 vlm-jepa 从机器人示范与无动作人类视频中进行自监督时序学习，无需独立外部教师',
          'delta-lwm 从当前观测和指令预测 latent action，再预测未来视觉特征，并在推理时用这些特征引导动作生成',
          '端到端联合优化时序表征、视觉动力学和机器人控制，无需单独预训练 latent-action 或 world model',
          '在 LIBERO、LIBERO-Plus、SimplerEnv 及 FR3、RevoTron 真实机器人上验证泛化与鲁棒性',
        ],
        description: 'TS-WAM 以 predictive latent 而非像素视频承载未来，把动作无标注视频纳入策略学习，并让预测未来在推理阶段继续参与动作生成，而不是训练后丢弃的辅助头。这满足强 WAM 门槛：latent action、未来视觉特征与控制在同一端到端链路中耦合。其轻量部署设计很实用，但未来表征不可直接目视审计，需结合可解释 probe 或失效检测判断模型到底预测了哪些与控制有关的变化。',
        href: 'https://arxiv.org/abs/2610.21922v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Latent Planning / Action Verification',
        title: 'VeriVLA: Adaptive Test-Time Verification for Flow-Based VLAs with Latent World Models',
        keyPoints: [
          '先用两个流策略样本的块内时间变化与跨样本方差识别关键状态，仅在必要时触发验证',
          '触发后由 JEPA latent world model 预测各候选动作块的条件未来状态及任务进度变化并排序',
          '潜空间验证避免像素重建；在单张 RTX 4090 上每次触发增加 326 ms 的采样与验证开销',
          '三项真实任务平均完成分数由 50.8% 提升至 65.5%，RoboTwin 2.0 干净设置成功率由 66.4% 提升至 73.6%',
        ],
        description: 'VeriVLA 属于典型 Cascaded WAM：流式 VLA 先提出动作，latent world model 再预测后果并选择候选。它的贡献不在联合生成，而在把世界模型计算聚焦于高不确定决策，从而兼顾闭环可靠性与延迟。真实机器人结果说明潜空间未来足以用于精细操作筛选；但 verifier 依赖任务进度表征，跨任务迁移时其校准与失败拒绝能力仍是关键。',
        href: 'https://arxiv.org/abs/2610.21985v1',
      },
      {
        num: 5,
        tag: 'Cascaded WAM · Model-Predictive Control / Policy Distillation',
        title: 'Dexterity from Supervised Play',
        keyPoints: [
          '从数分钟人类监督玩耍行为克隆 play policy，再自主采集数小时接触丰富的交互数据训练 world model',
          '推理时由同一 play policy 提议动作序列，并由 learned world model 在 MPC 中评估',
          '进一步在 learned world model 内通过 self-play 蒸馏闭环目标条件策略，以降低规划推理成本',
          '覆盖仿真与真实多指手推动、任意姿态重定向；真实实验较 hindsight behavior cloning 成功率高 69.6%',
        ],
        description: 'DSP 将数据采集、模型预测控制和策略蒸馏连成闭环：行为策略既探索并生成世界模型数据，又限制 MPC 的候选分布，最后想象经验再回流为快速策略。按 taxonomy 属于 Cascaded WAM 的 learned action proposal + latent/world-model planning。它以 490 倍更少交互数据达到与强化学习相当的真实成功率，突出可复现的数据效率；限制是目前任务范围较窄，尚需验证长时任务中 play policy 覆盖不足是否会限制世界模型与规划器。',
        href: 'https://arxiv.org/abs/2610.22340v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'T2-z: Test-Time Optimization of Environment Latents for Robotic World Models', tag: 'Cascaded WAM · Adaptive Action-conditioned Dynamics', href: 'https://arxiv.org/abs/2610.22364v1', description: '冻结 world model，仅用一次或多次测试交互优化环境 latent，以吸收摩擦、质量和规则等不可观测因素；7 个仿真设置和 4 个真实任务中，对象预测误差由 15.20 降至 7.00，动作成功率由 33.73% 升至 72.96%。动作条件预测直接改善执行，但摘要未展示联合动作生成。' },
      { num: 2, title: 'What Should Robot Policies Learn to Predict? Rethinking Supervision Targets in Vision-Language-Action Learning', tag: 'Joint WAM - Diffusion · Multi-stream / Future Representation', href: 'https://arxiv.org/abs/2610.21915v1', description: '在双流 MMDiT 中显式分配动作、latent-action 与 future-vision 监督预算；LIBERO、CALVIN 和四项真实任务显示合适的未来视觉目标普遍优于纯动作训练。它证明未来预测目标的选择和预算是 WAM 设计变量，但摘要未说明未来分支是否在推理时参与控制。' },
      { num: 3, title: 'Plans Are Not Executions: Adapting Frozen World-Model Planners to Controller-Induced Execution Shift', tag: 'Cascaded WAM · Controller-aware Latent Rollout', href: 'https://arxiv.org/abs/2610.22041v1', description: 'ExecutionBridge 从计划—执行轨迹对推断控制器特性，在保持规划轨迹语义不变的同时修正冻结 world model 的 ego latent rollout；NAVSIM 上跨未见控制器稳定提升，指出“更像真实执行的输入”并不等于更好的候选决策。' },
    ],
    observation: '今天的论文不是数量上的常规增量，而是 WAM 三条耦合路线的集中对照。P³-WAM 把视觉未来和动作放进双向扩散交互，OneWM 用统一因果训练验证两个任务确有互惠，TS-WAM 则表明不可见的 predictive latent 也能在轻量部署中持续引导控制；另一端，VeriVLA 与 DSP 保留模块化级联，以按需验证和 MPC 获得更清晰的决策接口。共同趋势是“预测未来”正在从泛化辅助任务变为推理时可消费的决策变量。下一阶段不应只比较视频保真度，而要统一报告未来预测校准、动作成功率、闭环延迟，以及模型错误被策略利用或放大的方式。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Unified Diffusion WAMs, Reciprocal Causal Training, and Latent Action Verification',
    description: 'Daily research digest for World Action Models',
    overview: [
      'P³-WAM unifies 3D perception, action-conditioned future prediction, and visual-action planning in one video diffusion backbone',
      'OneWM empirically shows that world modeling and action learning benefit each other under unified causal training',
      'TS-WAM and VeriVLA use future latents for end-to-end action generation and test-time candidate verification, respectively',
      'A dense set of strongly relevant papers spans joint generation, shared predictive representations, and cascaded planning',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-stream / Cross-attention',
        title: 'Perceive, Predict, and Plan: a Unified World Action Model for Egocentric Dexterous Manipulation',
        keyPoints: [
          'Unifies 3D hand and camera reconstruction, action-conditioned visual future generation, and joint generation of action trajectories with anticipated visual consequences',
          'Injects compact structured 3D actions into a pretrained video diffusion transformer using shared base weights, modality-specific adapters, and bidirectional visual-action attention',
          'Randomizes modality visibility so video and 3D actions can each serve as conditions or prediction targets across Perceive, Predict, and Plan modes',
          'Unified training improves 3D hand reconstruction, action-conditioned video prediction, and goal-directed planning across four datasets',
        ],
        description: 'P³-WAM is today’s most complete joint WAM. Rather than generating video and attaching an action head, it makes vision and 3D actions interact bidirectionally inside the diffusion backbone, then co-generates executable trajectories and their visual consequences in Plan mode. It fits the Joint WAM - Diffusion multi-stream / cross-attention taxonomy. The key contribution is a shared parameterization of perception, forward dynamics, and planning; the next test is whether jointly generated actions close the loop on physical robots and whether visual metrics track control success.',
        href: 'https://arxiv.org/abs/2610.22363v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Explicit-decoupled / Unified Causal',
        title: 'Can World and Action Modeling Benefit Each Other under Unified Causal Training?',
        keyPoints: [
          'Introduces OneWM, treating actions as both conditions for world prediction and targets for policy learning in one video-action architecture',
          'Tests reciprocal effects across LIBERO, LIBERO-Plus, RoboCasa365, and real-world policy experiments',
          'Learning visual consequences under specified actions improves policy performance and generalization across changing scenes',
          'Conversely, action learning improves multi-view world-prediction fidelity in the same architecture',
        ],
        description: 'OneWM directly tests the central WAM question: do world and action objectives merely coexist, or do they improve each other under shared causal training? Its results support genuine reciprocity, making it stronger than a weakly coupled auxiliary future-prediction loss. Taxonomically, it is a Joint WAM - Autoregressive explicit-decoupled causal design: actions condition futures and are generated by the same architecture. It establishes a clean architectural baseline, though the abstract does not describe long-horizon closed-loop planning or compounding rollout error.',
        href: 'https://arxiv.org/abs/2610.21095v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Predictive-latent',
        title: 'TS-WAM: Temporal Latent Actions and World-Action Coupling for Vision-Language Robot Control',
        keyPoints: [
          'Uses an EMA-target vlm-jepa objective for self-supervised temporal learning from robot demonstrations and action-free human videos without a separately trained external teacher',
          'delta-lwm predicts latent actions from the current observation and instruction, then predicts future visual features that guide action generation at inference',
          'Jointly optimizes temporal representation learning, visual dynamics, and robot control end to end without separate latent-action or world-model pretraining',
          'Evaluates generalization and robustness on LIBERO, LIBERO-Plus, SimplerEnv, and physical FR3 and RevoTron robots',
        ],
        description: 'TS-WAM carries the future in predictive latents rather than pixels, absorbs action-free video into policy learning, and keeps the predicted future in the inference path instead of discarding it as a training-only head. This clears the strong WAM threshold: latent actions, future visual features, and control form one end-to-end chain. Its lightweight deployment is practical, but non-rendered futures are harder to audit and should be paired with interpretable probes or failure detection to reveal which control-relevant changes are actually predicted.',
        href: 'https://arxiv.org/abs/2610.21922v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Latent Planning / Action Verification',
        title: 'VeriVLA: Adaptive Test-Time Verification for Flow-Based VLAs with Latent World Models',
        keyPoints: [
          'Uses within-chunk temporal variation and cross-sample variance from two flow-policy samples to detect critical states before invoking verification',
          'A JEPA latent world model then predicts action-conditioned future states and task-progress changes to rank candidate action chunks',
          'Latent verification avoids pixel reconstruction and adds 326 ms of sampling and verification per triggered decision on one RTX 4090',
          'Raises average completion from 50.8% to 65.5% on three real tasks and RoboTwin 2.0 clean success from 66.4% to 73.6%',
        ],
        description: 'VeriVLA is a clear Cascaded WAM: a flow VLA proposes actions and a latent world model predicts consequences to select among them. Its novelty is concentrating world-model compute on uncertain decisions, balancing closed-loop reliability and latency rather than pursuing joint generation. Physical-robot gains show that latent futures can rank fine-grained manipulation actions, but transfer depends on how well the task-progress representation remains calibrated and rejects failures on new tasks.',
        href: 'https://arxiv.org/abs/2610.21985v1',
      },
      {
        num: 5,
        tag: 'Cascaded WAM · Model-Predictive Control / Policy Distillation',
        title: 'Dexterity from Supervised Play',
        keyPoints: [
          'Behavior-clones a play policy from minutes of supervised human play, then deploys it autonomously to collect hours of contact-rich world-model data',
          'Uses the same play policy to propose action sequences that the learned world model evaluates through model-predictive control',
          'Distills a closed-loop goal-conditioned policy through self-play inside the learned world model to reduce planning cost',
          'Covers simulated and physical multifinger pushing and any-to-any reorientation, improving real-world success over hindsight behavior cloning by 69.6%',
        ],
        description: 'DSP closes the loop among data collection, model-predictive control, and policy distillation. The behavior policy both explores to build world-model data and constrains the MPC proposal distribution, while imagined experience returns as a fast policy. It is a Cascaded WAM with learned action proposals and world-model planning. Matching reinforcement learning with 490 times less interaction data is a strong efficiency result, though the current tasks are narrow and limited play-policy coverage may bottleneck both modeling and planning on longer tasks.',
        href: 'https://arxiv.org/abs/2610.22340v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'T2-z: Test-Time Optimization of Environment Latents for Robotic World Models', tag: 'Cascaded WAM · Adaptive Action-conditioned Dynamics', href: 'https://arxiv.org/abs/2610.22364v1', description: 'Freezes the world model and optimizes an environment latent from one or more test interactions to capture unobserved friction, mass, and rules. Across seven simulated settings and four physical tasks, object prediction error falls from 15.20 to 7.00 and action success rises from 33.73% to 72.96%. Action-conditioned adaptation improves execution, although the abstract does not show joint action generation.' },
      { num: 2, title: 'What Should Robot Policies Learn to Predict? Rethinking Supervision Targets in Vision-Language-Action Learning', tag: 'Joint WAM - Diffusion · Multi-stream / Future Representation', href: 'https://arxiv.org/abs/2610.21915v1', description: 'Explicitly allocates a two-stream MMDiT training budget among action, latent-action, and future-vision objectives. LIBERO, CALVIN, and four physical tasks show that suitable future-vision targets generally beat action-only training. It makes future target choice and allocation explicit WAM design variables, though the abstract does not say that the future branch participates in inference.' },
      { num: 3, title: 'Plans Are Not Executions: Adapting Frozen World-Model Planners to Controller-Induced Execution Shift', tag: 'Cascaded WAM · Controller-aware Latent Rollout', href: 'https://arxiv.org/abs/2610.22041v1', description: 'ExecutionBridge infers controller characteristics from planned-executed trajectory pairs and adapts a frozen world model’s ego latent rollout while preserving the planned trajectory’s semantics. Consistent NAVSIM gains across unseen controllers show that an input closer to executed motion is not automatically better for candidate decisions.' },
    ],
    observation: 'Today’s papers provide a concentrated comparison of three WAM coupling strategies rather than a routine increase in volume. P³-WAM places visual futures and actions in bidirectional diffusion interaction; OneWM demonstrates reciprocal benefits under unified causal training; and TS-WAM shows that invisible predictive latents can keep guiding control in a lightweight deployment. VeriVLA and DSP retain modular cascades, gaining clearer decision interfaces through selective verification and MPC. Across them, future prediction is shifting from a generic auxiliary task into a decision variable consumed at inference. The next evaluation standard should jointly report future calibration, action success, closed-loop latency, and how model errors are exploited or amplified by the policy—not video fidelity alone.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-16',
        en: '/en/daily/world-action-model/2026-10-16',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-16" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>
            {item.description}
          </NotableItem>
        ))}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
