import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '骨架约束潜动作、策略效用驱动世界模型与显式三维预演',
    description: 'World Action Model 研究论文日报',
    overview: [
      'SkeLAM 将潜动作拆成骨架约束运动与视觉残差，使人类视频预训练更可靠地对齐机器人控制',
      'DRILL 以想象 rollout 产生的策略回报反向训练世界模型，不再把像素误差当作唯一目标',
      'DeXplicit 先预测可度量三维物理状态，再渲染视觉未来，以两步因果生成兼顾结构与速度',
      'DiffDreamer 与 Inside-JEPA 分别推进混合物理想象和动作监督的关系潜状态',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Implicit Latent Action / Action-conditioned Generation',
        title: 'Skeleton-Grounded Latent Action Model for Robot World Models',
        keyPoints: [
          '把视频转移编码为骨架监督的运动分量与保留物体响应等信息的视觉残差分量，并以独立条件路径注入世界模型',
          '通过跨模态交换重建对齐 RGB 与骨架运动表示，并用 branch dropout 降低模型对未来残差信息的依赖',
          '轻量适配器把机器人动作映射到运动潜空间；推理时由当前观测与机器人动作生成未来观测',
          '在 DROID 上相对 DreamDojo 将末端执行器 ADE 降低 19.5%、LPIPS 降低 11.1%，并展示零样本人到机器人运动迁移',
        ],
        description: 'SkeLAM 解决潜动作模型最关键的可控性问题：纯重建目标容易把机器人运动、物体响应和背景变化混在同一 latent 中，使视频先验难以映射到真实控制。它用机器人骨架提供运动锚点，同时保留残差来表达完整世界变化，再把真实动作接入运动分量。按 taxonomy 属于 Cascaded WAM 的隐式潜动作路线，并带有明确的动作条件未来生成；它尚未联合生成策略动作，但预测成功率与真实执行结果的一致性让世界预测可直接服务策略评估。',
        href: 'https://arxiv.org/abs/2610.31474v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Policy-coupled World Modeling',
        title: 'DRILL: Training World Models to Improve Policies, Not Predict Pixels',
        keyPoints: [
          '指出一步像素 MSE 与策略梯度质量并不一致：像素误差更低的世界模型可能产生更差的下游策略',
          '提出双层 Downstream-Return Imagination Learning Loop，以策略在想象 rollout 内更新后的真实回报作为世界模型目标',
          'DRILL-VWI 用策略访问、组相对 GRPO advantage 与模型置信度重加权预测误差；DRILL-IMG 则通过截断 Hessian-vector product 计算完整元梯度',
          '在五个操控模拟器和两个 VLA backbone 上，DRILL-IMG 平均成功率较 WMPO 提升 13.1 个百分点、较 RLVR-World 提升 7.9 个百分点',
        ],
        description: 'DRILL 的贡献是把 world-action coupling 写进优化目标：视频世界模型不再只追求视觉逼真，而要产生能改善 VLA 的策略梯度。它更接近 Joint WAM - Diffusion 中策略与未来生成紧耦合的训练范式，尽管世界模型与 VLA 仍是可区分组件。结果表明，预测误差高 17% 的模型仍可能训练出更好策略，提醒 WAM 评测必须测量想象对控制的因果效用，而不能只报告 LPIPS 或帧级误差。',
        href: 'https://arxiv.org/abs/2610.30814v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Explicit 3D Future / Geometric Control',
        title: 'DeXplicit: Making Physical State Explicit in Dexterous Manipulation World Models',
        keyPoints: [
          '给定初始场景和未来手部轨迹，先由轻量三维动力学网络预测物体中心运动与形变，再渲染对应视觉结果',
          '把预测三维运动投影到未来视角并搬运外观，使视频生成器集中补全不确定区域与新显露内容',
          '在 HOT3D、OakInk2 和 PhysTwin 上相对 PointWorld 将 moved-point error 降低 27–40%，HOT3D 的物体 fidelity IoU+ 提升 47%',
          '采用每块两步去噪的因果生成，相对 14B 双向配置实现 57 倍视频合成加速',
        ],
        description: 'DeXplicit 是典型 Cascaded WAM：未来手部轨迹先驱动显式、可度量的三维世界状态，再由几何投影和视频模型形成视觉预演。它没有自行生成动作，因此不是统一 action decoder，但其结构把控制、接触后果与可观察未来连接起来，避免让大视频模型隐式承担所有物理推断。对灵巧操作而言，这种“3D dynamics first, rendering second”的分工还让规划器能够在生成像素前检查物体运动与形变。',
        href: 'https://arxiv.org/abs/2610.30781v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Predictive Latent Planning / Differentiable Control',
        title: 'DiffDreamer: Coupling World Models with Differentiable Simulation for Agile Quadrotor Control',
        keyPoints: [
          '在同一次 actor 优化中，由 learned world model 推进外部动态与历史相关 latent，由可微模拟器推进无人机显式物理状态',
          '把 actor 目标拆成 critic 驱动的不可微任务奖励路径和 simulator 驱动的可微运动奖励路径',
          '在高速跟踪与动态门竞速上较 model-free、model-based 和 differentiable-RL baseline 改善收敛与最终性能',
          '除仿真消融外，还提供真实飞行 proof-of-concept 验证',
        ],
        description: 'DiffDreamer 的耦合点不是共同生成视频和动作，而是让 learned dynamics 与已知物理在同一策略优化图中各司其职：前者预测难以显式建模的环境演化，后者保留高频飞行动力学的可靠梯度。它属于 Cascaded WAM 的 predictive-latent planning 路线。对需要精确控制的 embodied AI，这种混合 imagination 能减少纯学习 rollout 的模型偏差，同时让世界预测直接影响 actor 更新。',
        href: 'https://arxiv.org/abs/2610.31617v1',
      },
      {
        num: 5,
        tag: 'Joint WAM - Autoregressive · Predictive Latent',
        title: 'Inside-JEPA: From Prediction to Relational Grounding in Latent World Models',
        keyPoints: [
          '在 JEPA latent state 内为有序实体对设置关系通道，并用读取这些通道的 inverse-dynamics loss 在无关系标签下完成 grounding',
          '仅做 latent prediction 的关系头不优于随机；动作恢复监督在十种设置中把关系 AUROC 提升 0.065–0.103',
          '给定动作后，预测关系变化接近真实未来关系质量，AUROC 为 0.599 对 0.621',
          '在 65 个动作的一步关系目标中，16 个关系通道将正确动作排入 top-5 的比例从 prediction-only 的 24% 提升到 43%',
        ],
        description: 'Inside-JEPA 展示动作监督如何把不透明的预测 latent 变成可用于决策的关系状态。它同时学习给定动作后的关系未来，并通过 inverse dynamics 从状态变化恢复动作，符合 Joint WAM - Autoregressive 的 predictive-latent 范式。其价值不只是更好的 action decoding：实体对通道提供了可检查的中间接口，可让规划器按“抓取关系是否形成、物体是否进入目标区域”选择动作，而非依赖难解释的全局 latent 距离。',
        href: 'https://arxiv.org/abs/2610.31194v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'RGraph-Eval: Task-Grounded Scene Graphs for Evaluating Robot Video Generation', tag: 'WAM Evaluation · Temporal Scene Graph', href: 'https://arxiv.org/abs/2610.31121v1', description: '把实体、交互、状态变化、动作区间与三维物体路径组织成可解释时序场景图，并发布含 1,000 个操控场景的 ShareRobot-SG。它不生成动作，但可检测“视频逼真却任务错误”的 WAM failure mode。' },
      { num: 2, title: 'In-Context Learning World Models for Robot Dual-Arm Manipulation of Soft Garment with Partial Observations', tag: 'Cascaded WAM · Action-conditioned Point-cloud Planning', href: 'https://arxiv.org/abs/2610.30988v1', description: '从可变长度局部点云历史推断衣物形状与材料 latent，进行完整状态估计和动作条件动力学预测，再接入 goal-conditioned planner；跨机器人 embodiment、材料和衣物形状无需权重更新，并包含真实双臂折叠验证。' },
      { num: 3, title: 'Adaptive Aerial Loco-Manipulation Policy Learning via LLM-Assisted Proactive Task Generation', tag: 'WAM Foundation · Action-conditioned Predictive Representation', href: 'https://arxiv.org/abs/2610.30810v1', description: '以动作条件未来测量表示预测训练飞行策略的历史上下文，并用 LLM 针对已观察到的控制困难生成新机械臂运动任务；真实空中机械臂零样本迁移中，周期臂运动下悬停位置 RMSE 较 baseline 降低 79.6%。' },
    ],
    observation: '今天的主线是让世界模型对动作更“有用”，而非只对像素更“准确”。SkeLAM 用骨架把潜动作中的主动运动与被动物理响应分开；DeXplicit 把动作后果先落到显式三维状态；Inside-JEPA 用 inverse dynamics 把关系 latent 锚定到可选择动作；DRILL 更进一步，直接以想象产生的策略改进来训练世界模型。四者共同指向一项评测转变：未来画面质量只是中间指标，真正的 WAM 指标应回答表示是否可控、预测是否改变动作排序、以及 imagined update 是否提升真实回报。DiffDreamer 还表明，在高频控制中，learned world model 不必替代物理模拟，而可与其组成互补的可微闭环。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Skeleton-Grounded Latent Actions, Policy-Useful World Models, and Explicit 3D Foresight',
    description: 'Daily research digest for World Action Models',
    overview: [
      'SkeLAM separates skeleton-grounded motion from visual residuals to align video pretraining with robot control',
      'DRILL trains world models through the policy return produced by imagined rollouts rather than pixel error alone',
      'DeXplicit predicts metric 3D physical states before rendering visual futures, combining structure with two-step causal generation',
      'DiffDreamer and Inside-JEPA advance hybrid physical imagination and action-grounded relational latent states',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Implicit Latent Action / Action-conditioned Generation',
        title: 'Skeleton-Grounded Latent Action Model for Robot World Models',
        keyPoints: [
          'Decomposes video transitions into a skeleton-supervised kinematic component and a residual that preserves object responses and other visual dynamics',
          'Uses cross-modal swap reconstruction to align RGB and skeleton motion representations, with branch dropout reducing reliance on future-derived residuals',
          'Maps robot actions into the kinematic latent through a lightweight adapter and generates future observations from the current view and actions at inference',
          'Reduces end-effector ADE by 19.5% and LPIPS by 11.1% over DreamDojo on DROID, while demonstrating zero-shot human-to-robot motion transfer',
        ],
        description: 'SkeLAM addresses a central controllability problem in latent-action models: reconstruction alone mixes robot motion, object response, and incidental scene change, making video priors difficult to map onto physical controls. Skeleton supervision anchors the active motion component while a residual preserves full world dynamics, and real actions are connected to the motion space. It fits the Cascaded WAM implicit-latent-action taxonomy with explicit action-conditioned future generation. Although it does not jointly generate policy actions, agreement between predicted and physical success rates makes its forecasts useful for policy evaluation.',
        href: 'https://arxiv.org/abs/2610.31474v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Policy-coupled World Modeling',
        title: 'DRILL: Training World Models to Improve Policies, Not Predict Pixels',
        keyPoints: [
          'Shows that one-step pixel MSE is misaligned with policy-gradient quality: a lower-error world model can produce a worse downstream policy',
          'Introduces a bilevel Downstream-Return Imagination Learning Loop that optimizes the world model for real return after an inner policy update on imagined rollouts',
          'DRILL-VWI reweights errors by policy visitation, group-relative GRPO advantage, and confidence; DRILL-IMG differentiates through the inner update with truncated Hessian-vector products',
          'Across five manipulation simulators and two VLA backbones, DRILL-IMG improves mean success by 13.1 points over WMPO and 7.9 points over RLVR-World',
        ],
        description: 'DRILL places world-action coupling directly in the optimization objective: a video world model is rewarded for producing gradients that improve a VLA, not merely for rendering plausible pixels. It is closest to policy-coupled Joint WAM - Diffusion training, although the world model and VLA remain distinguishable components. A model with 17% higher prediction MSE can still train the better policy, showing why WAM evaluation must measure the causal utility of imagination for control rather than rely only on frame metrics.',
        href: 'https://arxiv.org/abs/2610.30814v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Explicit 3D Future / Geometric Control',
        title: 'DeXplicit: Making Physical State Explicit in Dexterous Manipulation World Models',
        keyPoints: [
          'Given an initial scene and future hand trajectory, predicts object-centric motion and deformation with a lightweight 3D dynamics network before rendering',
          'Projects predicted 3D motion into future views and transports appearance so the video model can focus on uncertainty and newly revealed content',
          'Reduces moved-point error by 27–40% over PointWorld across HOT3D, OakInk2, and PhysTwin, and raises object-fidelity IoU+ by 47% on HOT3D',
          'Uses two denoising steps per causal block and achieves a 57x video-synthesis speedup over its 14B bidirectional configuration',
        ],
        description: 'DeXplicit is a Cascaded WAM: a future hand trajectory first drives an explicit metric 3D world state, then geometric projection and video generation produce visual foresight. It does not synthesize actions itself, but it ties control, contact consequences, and observable futures together without forcing a large video model to infer all physics implicitly. For dexterous manipulation, this 3D-dynamics-first decomposition also lets a planner inspect object motion and deformation before paying the cost of pixel rendering.',
        href: 'https://arxiv.org/abs/2610.30781v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Predictive Latent Planning / Differentiable Control',
        title: 'DiffDreamer: Coupling World Models with Differentiable Simulation for Agile Quadrotor Control',
        keyPoints: [
          'Within one actor update, a learned world model advances external dynamics and history-dependent latents while a differentiable simulator advances explicit vehicle state',
          'Splits the actor objective into a critic-driven path for non-differentiable task rewards and a simulator-driven path for differentiable motion rewards',
          'Improves convergence and final performance over model-free, model-based, differentiable-RL, planning, and classical-control baselines on tracking and dynamic-gate racing',
          'Supplements simulation ablations with proof-of-concept real-world flight experiments',
        ],
        description: 'DiffDreamer couples world and action through a shared policy-optimization graph rather than joint video-action generation. Learned dynamics predict external evolution that is difficult to model explicitly, while the simulator preserves reliable gradients for high-frequency vehicle physics. This is a Cascaded WAM predictive-latent-planning design. The hybrid imagination reduces the bias of a wholly learned rollout and makes world prediction directly influence actor optimization.',
        href: 'https://arxiv.org/abs/2610.31617v1',
      },
      {
        num: 5,
        tag: 'Joint WAM - Autoregressive · Predictive Latent',
        title: 'Inside-JEPA: From Prediction to Relational Grounding in Latent World Models',
        keyPoints: [
          'Allocates relational channels to ordered entity pairs inside the JEPA latent state and grounds them without relation labels through an inverse-dynamics head',
          'Latent prediction alone is no better than a random relation head, while action-recovery supervision raises relational AUROC by 0.065–0.103 across ten settings',
          'Given an action, predicted relation changes approach observed-future quality at 0.599 versus 0.621 AUROC',
          'For one-step relational goals over 65 actions, the 16-channel readout ranks the correct action in the top five 43% of the time, versus 24% for prediction-only latents',
        ],
        description: 'Inside-JEPA shows how action supervision turns opaque predictive latents into decision-relevant relational state. It learns future relation changes under actions and recovers actions from state transitions, fitting the Joint WAM - Autoregressive predictive-latent taxonomy. The entity-pair channels also provide an inspectable planning interface: actions can be ranked by whether a grasp relation forms or an object reaches a target, rather than by an uninterpretable global latent distance.',
        href: 'https://arxiv.org/abs/2610.31194v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'RGraph-Eval: Task-Grounded Scene Graphs for Evaluating Robot Video Generation', tag: 'WAM Evaluation · Temporal Scene Graph', href: 'https://arxiv.org/abs/2610.31121v1', description: 'Organizes entities, interactions, state changes, action intervals, and 3D object paths into interpretable temporal scene graphs and releases ShareRobot-SG with 1,000 manipulation scenes. It does not generate actions, but exposes the WAM failure mode where video looks realistic while the task is wrong.' },
      { num: 2, title: 'In-Context Learning World Models for Robot Dual-Arm Manipulation of Soft Garment with Partial Observations', tag: 'Cascaded WAM · Action-conditioned Point-cloud Planning', href: 'https://arxiv.org/abs/2610.30988v1', description: 'Infers garment shape and material latents from variable-length partial point-cloud histories, performs full-state estimation and action-conditioned dynamics prediction, then connects the model to a goal-conditioned planner. It generalizes across embodiments, materials, and garment shapes without weight updates and includes real bimanual folding validation.' },
      { num: 3, title: 'Adaptive Aerial Loco-Manipulation Policy Learning via LLM-Assisted Proactive Task Generation', tag: 'WAM Foundation · Action-conditioned Predictive Representation', href: 'https://arxiv.org/abs/2610.30810v1', description: 'Trains flight-policy context through action-conditioned prediction of future measurement representations and uses an LLM to generate arm-motion tasks targeting observed control weaknesses. In zero-shot transfer to a physical aerial manipulator, it reduces hover-position RMSE by 79.6% during periodic arm motion versus the real-world baseline.' },
    ],
    observation: 'Today’s central theme is making world models more useful for action rather than merely more accurate in pixels. SkeLAM separates active motion from passive visual response with skeleton grounding; DeXplicit first commits action consequences to explicit 3D state; Inside-JEPA anchors relational latents through inverse dynamics; and DRILL directly trains the world model for the policy improvement produced by imagination. Together they point to a shift in evaluation: image quality is an intermediate metric, while a WAM should ultimately be judged by controllability, changes in action ranking, and gains in real return after imagined updates. DiffDreamer further shows that learned world models need not replace physics simulators in high-frequency control; they can form a complementary differentiable loop.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-23',
        en: '/en/daily/world-action-model/2026-10-23',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-23" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
