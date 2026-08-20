import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '面向决策的未来潜变量与可学习世界模型规划',
    description: 'World Action Model 研究日报',
    overview: [
      'DA-WAM 为每条候选轨迹预测独立未来 latent，并让动作后果直接参与驾驶轨迹评分',
      'DA-LeWM 用动作条件辅助目标修正 latent MPC 中“可解码但不可排序”的决策几何',
      'RP1 从 imagined rollout 离线学习 critic 和多步计划更新器，以极少 rollout 完成高效规划',
      '今日强相关进展集中在 predictive-latent 与 cascaded planning，未发现合格的新联合扩散 WAM',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'DA-WAM: Decision-Aligned Future Latents for Driving World Models',
        keyPoints: [
          '统一 predictive representation learning、动作条件未来建模和轨迹评分，使世界预测与规划目标共同优化',
          '为 32 条候选轨迹分别预测其 0.5 秒后的 scene latent，并将候选特定的未来表示送入 factorized scorer',
          '在线 V-JEPA 2.1 编码器以 LoRA 适配，并由 EMA target 提供持续预测监督；专家轨迹和安全关键 hard negatives 共同约束决策边界',
          '在 NAVSIM-v1 的 12,146 个 navtest 场景及 NAVSIM-v2 上评测，正文报告达到 state of the art，并公开代码',
        ],
        description: 'DA-WAM 直接击中 WAM 的核心问题：未来预测是否真正改变动作选择。它没有对所有候选共享一个未来表示，而是建立候选轨迹与未来 latent 的一一对应关系，让碰撞、驶离道路等动作特定后果进入评分。按 taxonomy，它最接近 Joint WAM 的 predictive-latent 路线：预测表示在 planner 优化期间持续学习，并与轨迹生成和评分形成统一决策目标，但并非像素级联合扩散生成。',
        href: 'https://arxiv.org/abs/2608.19085v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Action-Conditioned Latent MPC',
        title: 'Decision-Metric Alignment in Latent World Models: Diagnostics and Action-Conditioned Objectives for MPC Planning',
        keyPoints: [
          '指出 task variable 可被 latent 线性解码，不代表欧氏 latent goal distance 能按真实任务进展正确排序候选动作序列',
          '提出 Plan-Real Spearman 与 CEM-stage Spearman，分别诊断随机计划和 CEM 搜索逐步收缩时的 latent-real 排名一致性',
          'DA-LeWM 在 LeWM 上增加 inverse-dynamics head 和 demonstration-conditioned goal-action head，以动作相关监督塑造用于规划的 latent geometry',
          '在 PushT、Reacher、Cube 等四个环境中，DA-LeWM 比 LeWM 收敛更快、在线成功率更高，而 linear-probe 分数相近',
        ],
        description: '这篇工作的贡献不是更强的视觉重建，而是给 latent world model 增加“决策度量是否正确”的可检验标准。DA-LeWM 通过动作条件目标改善 CEM-MPC 实际使用的距离几何，说明 world representation 应按可执行计划的真实效果组织，而不只是保留状态信息。模型仍由 world rollout、欧氏代价和 CEM planner 级联，因此归为 Cascaded WAM；其诊断指标对比较 predictive-latent WAM 尤其有价值。',
        href: 'https://arxiv.org/abs/2608.18746v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Learned Latent Planning',
        title: 'Reinforced Planning with Latent World Models',
        keyPoints: [
          'RP1 从离线轨迹学习 goal-conditioned quasimetric critic，并训练神经 planner 迭代改进完整多步 action plan',
          '每次计划更新通过 pretrained world-model rollout 评估 imagined outcome，不在更新内部运行 CEM、MPPI 或梯度优化器，也不蒸馏其搜索轨迹',
          '同一 planner 可挂接 LeWorldModel 与 PLDM，并在 TwoRoom 导航、Reacher 连续控制和 OGBench Cube 接触操作上评测',
          '每次决策仅用 9 次 world-model rollout，对比最强手工 planner 的 9,000 次，并在并发 GPU 推理下将规划延迟最多降低 67 倍',
        ],
        description: 'RP1 把 WAM 的动作侧创新从“用固定搜索器查询世界模型”推进到“学习如何修改整段计划”。world model 负责预测动作序列结果，critic 评价 imagined outcome，learned optimizer 再迭代更新可执行动作序列，构成清晰的预测-评价-控制闭环。由于它可独立挂接预训练 latent world model，世界与动作模块并未联合生成，最准确的归类是 Cascaded WAM 的 learned latent planning。',
        href: 'https://arxiv.org/abs/2608.18669v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Progressive Experience Fusion for Multi-Task World Model Control in Endovascular Navigation',
        tag: 'Cascaded WAM · TD-MPC2 Control',
        href: 'https://arxiv.org/abs/2608.18647v1',
        description: '通过 Progressive Experience Fusion 训练一个跨五个血管导航子任务的 TD-MPC2 world-model controller，并以动作序列离散度自适应 MPPI horizon。摘要报告在 10 个未见血管结构上达到 90% 平均成功率，并在荧光透视下迁移到未见的体外患者血管 phantom；创新重点是经验融合与适配，而非新的 world-action 联合架构。',
      },
      {
        num: 2,
        title: 'SoftVTBench: A Deformation-Aware Visuo-Tactile Dataset and Benchmark for Deformable-Object Manipulation',
        tag: 'WAM Evaluation · Visuo-Tactile Safety',
        href: 'https://arxiv.org/abs/2608.18701v1',
        description: '提供 4,000 条专家演示、50 余种资产和 evaluator-only FEM 状态，以 Deformation-aware Success Rate 同时检查任务完成与峰值形变。Diffusion Policy、π0.5 与 FastWAM 的实验显示，单看成功率会漏掉超出形变容限的交互；该工作评测 WAM，但没有提出新的 world-action coupling。',
      },
    ],
    observation: '今日最明确的趋势是“预测准确”正在让位于“决策对齐”。DA-WAM 要求每条候选轨迹拥有自己的未来 latent 并直接影响评分，DA-LeWM 则证明状态信息可解码仍不足以保证 MPC 的距离代价能正确排序计划。RP1 从另一侧学习计划更新规则，将昂贵的手工搜索压缩为少量 imagined rollout。三者共同表明，WAM 的关键接口不是未来表示本身，而是未来表示如何改变动作候选的排序、更新与执行。Awesome-WAM 的最新 README 仍以 HiMem-WAM 和 Flash-WAM 标记清单新增，但其论文发表于 6 月，本日不计为新论文；今日也没有筛出符合门槛的新联合扩散 WAM。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Decision-Aligned Future Latents and Learned World-Model Planning',
    description: 'Daily research digest for World Action Models',
    overview: [
      'DA-WAM predicts a distinct future latent for each trajectory candidate so action consequences directly shape driving scores',
      'DA-LeWM uses action-conditioned auxiliary objectives to repair decision geometry that is decodable but poorly ranked for latent MPC',
      'RP1 learns a critic and multi-step plan updater offline from imagined rollouts, enabling planning with very few world-model calls',
      'Today\'s strong results center on predictive latents and cascaded planning; no qualifying new joint-diffusion WAM was found',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'DA-WAM: Decision-Aligned Future Latents for Driving World Models',
        keyPoints: [
          'Jointly optimizes predictive representation learning, action-conditioned future modeling, and trajectory scoring so world prediction serves the planning objective',
          'Predicts a separate scene latent 0.5 seconds ahead for each of 32 trajectory candidates and feeds each candidate-specific future into a factorized scorer',
          'Adapts an online V-JEPA 2.1 encoder with LoRA under an EMA target, while expert trajectories and safety-critical hard negatives supervise decision boundaries',
          'Evaluates on 12,146 NAVSIM-v1 navtest scenarios and NAVSIM-v2, reports state-of-the-art performance, and releases code',
        ],
        description: 'DA-WAM addresses the central WAM question: whether future prediction actually changes action selection. Instead of sharing one future across candidates, it creates a one-to-one mapping between trajectories and predicted latents, allowing action-specific outcomes such as collisions and lane departures to enter scoring. In the taxonomy it is closest to a joint predictive-latent WAM: predictive features keep learning during planner optimization and share one decision objective with proposal scoring, without using pixel-level joint diffusion.',
        href: 'https://arxiv.org/abs/2608.19085v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Action-Conditioned Latent MPC',
        title: 'Decision-Metric Alignment in Latent World Models: Diagnostics and Action-Conditioned Objectives for MPC Planning',
        keyPoints: [
          'Shows that linearly decoding task variables from a latent does not imply that Euclidean goal distance ranks candidate action sequences by real progress',
          'Introduces Plan-Real Spearman and CEM-stage Spearman to diagnose latent-real rank agreement for random plans and throughout concentrated CEM search',
          'Adds inverse-dynamics and demonstration-conditioned goal-action heads to LeWM so action-related supervision shapes the geometry used for planning',
          'Across four environments including PushT, Reacher, and Cube, DA-LeWM converges faster and reaches higher online success than LeWM despite similar linear-probe scores',
        ],
        description: 'The contribution is not better visual reconstruction but a testable criterion for whether a latent world model has the right decision metric. DA-LeWM uses action-conditioned objectives to improve the geometry consumed by CEM-MPC, showing that world representations should be organized by the real effects of executable plans rather than information preservation alone. Since world rollouts, Euclidean costs, and CEM remain a pipeline, this is a Cascaded WAM; its diagnostics are particularly useful for predictive-latent comparisons.',
        href: 'https://arxiv.org/abs/2608.18746v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Learned Latent Planning',
        title: 'Reinforced Planning with Latent World Models',
        keyPoints: [
          'RP1 learns a goal-conditioned quasimetric critic from offline trajectories and trains a neural planner to iteratively improve a complete multi-step action plan',
          'Each update evaluates imagined outcomes through a pretrained world model without running or distilling CEM, MPPI, or gradient optimization inside the update',
          'Attaches the same planner to LeWorldModel and PLDM and evaluates on TwoRoom navigation, Reacher control, and contact-rich OGBench Cube manipulation',
          'Uses 9 world-model rollouts per decision versus 9,000 for the strongest hand-designed planner and cuts planning latency by up to 67x under concurrent GPU inference',
        ],
        description: 'RP1 advances the action side of WAM from querying a world model with a fixed search rule to learning how to revise the entire plan. The world model predicts action-sequence outcomes, the critic evaluates imagined futures, and the learned optimizer updates executable actions, forming a clear prediction-evaluation-control loop. Because it can attach independently to a pretrained latent world model rather than jointly generating world and action, it is best classified as Cascaded WAM with learned latent planning.',
        href: 'https://arxiv.org/abs/2608.18669v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Progressive Experience Fusion for Multi-Task World Model Control in Endovascular Navigation',
        tag: 'Cascaded WAM · TD-MPC2 Control',
        href: 'https://arxiv.org/abs/2608.18647v1',
        description: 'Progressive Experience Fusion trains one TD-MPC2 world-model controller across five vascular-navigation subtasks and adapts the MPPI horizon from action-sequence dispersion. The abstract reports 90% mean success on ten unseen vasculatures and transfer to an unseen in-vitro patient phantom under fluoroscopy. Its main novelty is experience fusion and adaptation rather than a new joint world-action architecture.',
      },
      {
        num: 2,
        title: 'SoftVTBench: A Deformation-Aware Visuo-Tactile Dataset and Benchmark for Deformable-Object Manipulation',
        tag: 'WAM Evaluation · Visuo-Tactile Safety',
        href: 'https://arxiv.org/abs/2608.18701v1',
        description: 'Provides 4,000 expert demonstrations, more than 50 assets, and evaluator-only FEM states, using Deformation-aware Success Rate to require both completion and bounded peak deformation. Experiments with Diffusion Policy, π0.5, and FastWAM show that task success alone misses interactions beyond deformation tolerance. It evaluates a WAM but does not introduce new world-action coupling.',
      },
    ],
    observation: 'The clearest trend today is a shift from prediction accuracy to decision alignment. DA-WAM requires a distinct future latent for every trajectory candidate and makes it directly affect scoring, while DA-LeWM shows that decodable state information does not ensure an MPC distance can rank plans correctly. RP1 attacks the other side by learning the plan-update rule and compressing expensive hand-designed search into a handful of imagined rollouts. Together, these works indicate that the critical WAM interface is not the future representation itself, but how it changes the ranking, revision, and execution of action candidates. The latest Awesome-WAM README still marks HiMem-WAM and Flash-WAM as new list entries, but their papers were published in June and are not counted as new today; no qualifying new joint-diffusion WAM was found.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-08-20',
        en: '/en/daily/world-action-model/2026-08-20',
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
      date="2026-08-20"
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
