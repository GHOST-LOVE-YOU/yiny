import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '骨架接口驱动的跨具身 WAM 与任务聚焦未来建模',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'SkelWAM 用统一的 25 维骨架—末端状态连接视觉预测、动作块与不同机器人控制器，实现零样本跨具身迁移',
      'Skel-WAM 以人手—机器人共享骨架接口联合学习视觉和关键点动力学，把无机器人动作标签的人类视频用于策略训练',
      'FOCAL-VLA 只蒸馏当前子任务相关的几何与未来 3D 交互动态，避免全场景未来监督干扰动作学习',
      '多相材料 world model 展示了预测液体—固体耦合结果并从扩散策略候选中选动作的级联规划路径',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled',
        title: 'SkelWAM: A Skeleton-Guided World-Action Model for Zero-Shot Cross-Embodiment Manipulation',
        keyPoints: [
          '以手臂中心线、工具中心点位姿和平行夹爪命令组成统一 25 维状态，同一几何定义同时用于规范化视觉观测和未来全身动作目标',
          '视频—动作 Mixture-of-Transformers 在预测视觉监督下生成规范骨架动作块，再由具身专属约束解码器转换为关节或连续体机器人控制',
          '在覆盖 10 个任务、10 种目标具身和 4 类形态的 LIBERO-Cross10 上，仅用 Franka 源数据达到 43.3%，比最佳评测基线高 36.2 个百分点',
          '无需目标任务演示或目标策略更新，并将 JAKA mini2 训练的策略部署到 Feagine A03 连续体机器人完成三项桌面任务',
        ],
        description: 'SkelWAM 的关键不是把不同机器人的关节强行对齐，而是把可观察未来和可执行动作都投影到一个任务相关的骨架几何接口。预测视觉监督与动作块共享 Mixture-of-Transformers，但最终控制由具身约束解码器完成，因此按 taxonomy 属于 explicit-decoupled 的 Joint WAM - Autoregressive。它首次把零样本形态迁移作为 WAM 接口设计问题系统化；不过 43.3% 的总体成功率也表明，统一几何仍不能消除动力学和视角差异。',
        href: 'https://arxiv.org/abs/2609.21983v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Multi-Stream Shared Dynamics',
        title: 'Skel-WAM: A Hand-Skeleton-Conditioned World Action Model for Human-to-Robot Manipulation Transfer',
        keyPoints: [
          '用场景中的骨架叠加图和结构化 2.5D 关键点建立人手与机器人手共享的运动拓扑，同时保留视觉语境和显式手部运动学',
          'Video Expert 与 Keypoint Expert 通过 Mixture-of-Transformers 联合学习视觉—骨架未来，独立的 Action Expert 再把预测映射为可执行机器人控制',
          '人类视频无需机器人动作标签即可直接监督共享动力学；在 4 项真实双臂任务与 7 项仿真任务上平均成功率分别为 79.86% 和 63.29%',
          '对机器人训练数据未覆盖的真实任务变化，人机联合训练把成功率从 38.89% 提升至 86.11%',
        ],
        description: '这篇工作把跨具身数据利用的瓶颈定位到“共同预测什么”：不是统一原始动作，而是联合预测视觉和同拓扑骨架动态，再由机器人专属动作专家执行。其多流专家共享动力学、动作分支解耦，最接近 explicit-decoupled 的 Joint WAM - Autoregressive。与 SkelWAM 的零样本目标机器人迁移相比，本工作更强调人类数据扩展机器人任务分布；两篇同日论文共同说明骨架可能成为跨具身 WAM 的实用中间语言。',
        href: 'https://arxiv.org/abs/2609.21514v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Implicit Future · Shared Representation',
        title: 'FOCAL-VLA: Subtask-Guided Geometry Distillation and Implicit World Modeling for Vision-Language-Action Models',
        keyPoints: [
          '用当前子任务相关图像区域对齐 VGGT 几何 latent，只蒸馏动作所需的空间结构，减少全场景冗余信息',
          '以当前和未来演示帧的 Track4World 特征监督未来 3D 交互演化，将隐式世界建模表示与当前几何表示共同用于动作生成',
          'VGGT 与 Track4World 都只在训练期提供教师特征，推理时无需运行，避免未来建模增加在线视觉模型开销',
          '摘要报告在仿真基准和真实机器人操作中均优于基线，但未披露具体任务数、绝对成功率或各监督项消融幅度',
        ],
        description: 'FOCAL-VLA 代表 WAM 从“预测整幅未来”转向“预测当前交互所需未来”的趋势。它不显式生成视频，而把未来 3D 轨迹特征蒸馏进动作模型的共享表示，属于 implicit-future/shared-representation 的 Joint WAM - Diffusion。训练期教师、部署期移除的设计兼顾控制延迟，但当前摘要缺少定量细节，尚不能判断收益主要来自几何蒸馏、未来监督还是二者协同。',
        href: 'https://arxiv.org/abs/2609.21228v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Latent Dynamics Planning · Diffusion Policy',
        title: 'Robotic Multiphase Interaction: Manipulating Coupled Liquid and Solid Dynamics with a World Model',
        keyPoints: [
          '提出液体进入多孔固体并与变形骨架机械耦合的 Robotic Multiphase Interaction，以含水海绵作为首个任务实例',
          '动作条件 world model 预测候选命令下液体—固体耦合状态，Temporal UNet 则以 Diffusion Policy 或 rectified flow matching 生成动作序列',
          '世界模型相对基线将残余水量预测误差降低超过 60%，再由模型从策略候选中选择序列，可把预测终端水量误差进一步约减一半',
        ],
        description: '该方法的动作生成与世界预测并非同一生成流，而是先由扩散或流匹配策略提出候选，再由动作条件 world model 预测多相结果并筛选，因此属于 Cascaded WAM。它的重要性在于把规划状态从刚体位姿扩展到液体与可变形固体的耦合物理量，证明 world-model scoring 能改善策略输出；但目前证据来自新建仿真环境，摘要没有报告真实机器人转移或闭环执行结果。',
        href: 'https://arxiv.org/abs/2609.21448v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'GALA: Geometry-Aware Latent Action Modeling for Vision-Language-Action Model Pretraining across Embodiments', tag: 'Cascaded WAM · Learned Action Extraction', href: 'https://arxiv.org/abs/2609.21948v1', description: '将场景级视觉 latent action 与统一末端几何运动表示结合，从跨具身数据和无动作人类视频提取动作监督；RoboCasa-GR1 与真实机器人成功率分别为 68.3% 和 75.5%。它强化动作抽取和 VLA 预训练，但没有显式未来—动作联合生成，故列入延伸阅读。' },
      { num: 2, title: 'WM-VS: Progress-Aligned World Models for Closed-Loop Visual Servoing', tag: 'Cascaded WAM · Latent Planning', href: 'https://arxiv.org/abs/2609.20892v1', description: '把动作条件 latent 转移对齐到带符号的伺服进度坐标，再用短 imagined rollout 训练反应式关节速度策略；真实 7-DoF 系统最终保持目标误差标准的比例为 83.33%，移除未来误差对齐后降至 26.67%。论文 9 月 17 日提交，作为周一补充阅读收录。' },
      { num: 3, title: 'ForeTac-VLA: A Forecasting-Based Tactile-Vision-Language-Action Model for Contact-Rich Robotic Manipulation', tag: 'Joint WAM · Predictive Tactile Latent', href: 'https://arxiv.org/abs/2609.20980v1', description: '多步预测未来触觉状态并与视觉—语言表示共同条件化动作生成，在四项真实接触任务上平均成功率达 95%。未来触觉与动作耦合明确，但预测模块与 VLA 主干仍是串联结构；论文 9 月 17 日提交，作为周一补充阅读收录。' },
    ],
    observation: '本期最清晰的趋势是以结构化中间状态替代完整像素未来。两篇骨架 WAM 分别把它用于零样本机器人形态迁移和人类视频监督，FOCAL-VLA 则只保留子任务相关的未来 3D 交互 latent；共同目标都是让“预测什么”直接服务动作接口。多相操作进一步提醒我们，必要的未来状态未必是视觉，也可能是残余液体、接触或任务进度。arXiv API 两轮请求均遭遇 429，已按降级流程改用 arXiv cs.RO recent 页面并逐篇核验摘要与提交时间；Hugging Face Daily Papers API 成功检查 100 条，其中 9 月 18 日条目没有合格机器人 WAM；Awesome-WAM 最新 README 成功核读，其最近 README 提交为 9 月 6 日，本期论文尚未进入清单。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Skeleton Interfaces for Cross-Embodiment WAMs and Task-Focused Future Modeling',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'SkelWAM connects visual prediction, action chunks, and embodiment-specific controllers through a unified 25-D skeleton–tool state for zero-shot transfer',
      'Skel-WAM jointly learns visual and keypoint dynamics through a human–robot skeleton interface, turning human videos without robot actions into policy supervision',
      'FOCAL-VLA distills only subtask-relevant geometry and future 3D interaction dynamics, reducing distraction from full-scene future supervision',
      'A multiphase world model predicts coupled liquid–solid outcomes and selects among diffusion-policy proposals in a cascaded planning loop',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled',
        title: 'SkelWAM: A Skeleton-Guided World-Action Model for Zero-Shot Cross-Embodiment Manipulation',
        keyPoints: [
          'Defines a shared 25-D state from arm centerline geometry, tool-center-point pose, and parallel-jaw commands, using the same geometry for canonical observations and future whole-body action targets',
          'A video–action Mixture-of-Transformers predicts canonical skeleton action chunks under predictive visual supervision; constrained embodiment-specific decoders convert them into joint or continuum-robot controls',
          'On LIBERO-Cross10—ten tasks, ten target embodiments, and four morphology groups—a Franka-only model reaches 43.3% over 1,000 episodes, 36.2 points above the best evaluated baseline',
          'Requires no target-task demonstrations or target-policy updates and transfers a JAKA mini2-trained policy to a Feagine A03 continuum robot on three tabletop tasks',
        ],
        description: 'SkelWAM does not force heterogeneous robot joints into direct correspondence. Instead, it projects observable futures and executable actions into a task-relevant skeleton interface. Predictive visual supervision and action chunks share a Mixture-of-Transformers, while embodiment constraints remain in separate decoders, making it an explicit-decoupled Joint WAM - Autoregressive. It systematizes zero-shot morphology transfer as a WAM-interface problem, although the 43.3% aggregate success also shows that shared geometry does not erase dynamics and viewpoint gaps.',
        href: 'https://arxiv.org/abs/2609.21983v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Multi-Stream Shared Dynamics',
        title: 'Skel-WAM: A Hand-Skeleton-Conditioned World Action Model for Human-to-Robot Manipulation Transfer',
        keyPoints: [
          'Combines scene-grounded skeleton overlays with structured 2.5-D keypoints to establish shared human–robot hand topology while preserving visual context and explicit kinematics',
          'Video and Keypoint Experts jointly learn visual–skeletal futures through a Mixture-of-Transformers, while a separate robot-trained Action Expert maps predictions into executable controls',
          'Human videos supervise shared dynamics without robot action labels; average success reaches 79.86% across four real bimanual tasks and 63.29% across seven simulated tasks',
          'For real task variations absent from robot training, human–robot cotraining raises success from 38.89% to 86.11%',
        ],
        description: 'This work reframes cross-embodiment data use around what should be predicted jointly: not raw heterogeneous actions, but visual and topologically shared skeleton dynamics, followed by a robot-specific action expert. Its shared multi-stream dynamics with a decoupled action branch fits explicit-decoupled Joint WAM - Autoregressive. Whereas SkelWAM emphasizes zero-shot transfer to new robots, this paper emphasizes using human data to expand the robot task distribution; together they make a strong case for skeletons as a practical intermediate WAM language.',
        href: 'https://arxiv.org/abs/2609.21514v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Implicit Future · Shared Representation',
        title: 'FOCAL-VLA: Subtask-Guided Geometry Distillation and Implicit World Modeling for Vision-Language-Action Models',
        keyPoints: [
          'Aligns VGGT geometry latents only with image regions relevant to the current subtask, reducing redundant full-scene spatial supervision',
          'Uses Track4World features from current and future demonstration frames to supervise future 3D interaction evolution, jointly guiding action generation with present geometry',
          'VGGT and Track4World are training-only teachers and are removed at inference, avoiding online foundation-model overhead',
          'The abstract reports gains on simulation and real manipulation but gives no task counts, absolute success rates, or separate ablation magnitudes',
        ],
        description: 'FOCAL-VLA exemplifies a shift from predicting the entire future to predicting the future needed for the current interaction. It does not render video; instead, future 3D trajectory features are distilled into representations shared with the action model, fitting implicit-future/shared-representation Joint WAM - Diffusion. Removing the teachers at deployment protects control latency, but the abstract lacks enough quantitative detail to separate the effects of geometry distillation, future supervision, and their combination.',
        href: 'https://arxiv.org/abs/2609.21228v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Latent Dynamics Planning · Diffusion Policy',
        title: 'Robotic Multiphase Interaction: Manipulating Coupled Liquid and Solid Dynamics with a World Model',
        keyPoints: [
          'Introduces Robotic Multiphase Interaction, where liquid enters and mechanically couples with a deformable porous skeleton, using a water-filled sponge as the first task',
          'An action-conditioned world model predicts coupled liquid–solid states under candidate commands, while a temporal UNet proposes action sequences through Diffusion Policy or rectified flow matching',
          'The world model cuts retained-water prediction error by more than 60% versus the baseline, and model-based selection among policy proposals roughly halves predicted terminal-water error again',
        ],
        description: 'Action generation and world prediction are separate here: a diffusion or flow policy proposes candidates, then an action-conditioned model predicts multiphase outcomes and ranks them, making this a Cascaded WAM. Its main contribution is extending planning state beyond rigid pose to coupled liquid and deformable-solid quantities. The reported model-based selection gain is encouraging, but the evidence is currently confined to the new simulated environment, with no real-robot transfer or closed-loop execution result stated in the abstract.',
        href: 'https://arxiv.org/abs/2609.21448v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'GALA: Geometry-Aware Latent Action Modeling for Vision-Language-Action Model Pretraining across Embodiments', tag: 'Cascaded WAM · Learned Action Extraction', href: 'https://arxiv.org/abs/2609.21948v1', description: 'Combines scene-level visual latent actions with a unified end-effector geometry representation to extract supervision from cross-embodiment data and action-free human video, reaching 68.3% on RoboCasa-GR1 and 75.5% in the real world. It strengthens action extraction and VLA pretraining but does not jointly generate futures and actions.' },
      { num: 2, title: 'WM-VS: Progress-Aligned World Models for Closed-Loop Visual Servoing', tag: 'Cascaded WAM · Latent Planning', href: 'https://arxiv.org/abs/2609.20892v1', description: 'Aligns action-conditioned latent transitions to a signed servo-progress coordinate and trains a reactive joint-velocity policy with short imagined rollouts. A real 7-DoF system retains the target-error criterion in 83.33% of trials versus 26.67% without future-error alignment. Submitted September 17 and included as Monday catch-up reading.' },
      { num: 3, title: 'ForeTac-VLA: A Forecasting-Based Tactile-Vision-Language-Action Model for Contact-Rich Robotic Manipulation', tag: 'Joint WAM · Predictive Tactile Latent', href: 'https://arxiv.org/abs/2609.20980v1', description: 'Forecasts multistep future tactile states and uses them with vision–language features to condition action generation, reaching 95% average success on four real contact-rich tasks. Coupling is explicit, but the forecast module and VLA remain sequential. Submitted September 17 and included as Monday catch-up reading.' },
    ],
    observation: 'The clearest trend is replacing full pixel futures with structured intermediate states. The two skeleton WAMs use that idea for zero-shot morphology transfer and human-video supervision, while FOCAL-VLA keeps only subtask-relevant future 3D interaction latents. All three make the prediction target directly serve the action interface. Multiphase manipulation further shows that the required future need not be visual at all—it may be retained liquid, contact, or progress. The arXiv API returned 429 on both attempts, so collection fell back to the arXiv cs.RO recent listing and every selected abstract and submission timestamp was verified individually. The Hugging Face Daily Papers API successfully returned 100 entries, with no qualifying September 18 robot WAM. The latest Awesome-WAM README was reviewed successfully; its most recent README commit is dated September 6 and none of today’s papers has entered the list.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-21',
        en: '/en/daily/world-action-model/2026-09-21',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-21" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
