import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '从三维预演到渐进视觉子目标：长时 WAM 的结构化未来',
    description: 'World Action Model 研究论文日报',
    overview: [
      'PointWAM 在共享时空坐标中联合预测场景与手部三维点轨迹，再将预演动作重定向到机器人',
      'ProWAM 以有序稀疏视觉子目标替代稠密视频 rollout，用一次视频主干前向支撑闭环重规划',
      'ViGAR 将组合任务分解为视觉子目标规划与联合未来—动作执行，并共享世界模型表示',
      'ProAct 让预测未来不仅条件化动作流，还直接校准生成起点、范围与各动作维度的搜索几何',
      'PAM 在同一去噪器中联合生成长时本体感知路径草图与短时可执行动作块',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · 3D Point-Trajectory Planning / Learned Action Retargeting',
        title: 'PointWAM: 3D World Action Modeling for Dexterous Robotic Manipulation',
        keyPoints: [
          '把世界显式拆为场景与手部，在共享时空坐标中联合预测二者的三维点轨迹，以几何方式刻画接触和物体运动',
          '从彩色点云与语言指令生成场景—手部共同演化，再将预测的手部运动重定向为机器人动作',
          '无需任务专属物体或关键点选择，可直接用大规模人类示范视频预训练',
          '人类视频预训练使 DexJoCo 平均成功率提高 56.9 个百分点；场景轨迹监督再贡献 10.9 个点，并在十项任务上领先此前 SOTA 11.7 个点',
        ],
        description: 'PointWAM 把“先想象、再执行”的级联路线从 RGB 视频搬到控制相关的三维几何空间。它显式预演环境和操作者如何共同变化，并从预测手部轨迹提取机器人动作，因此属于 Cascaded WAM 的 learned action extraction，而不是只做动作条件视频预测。共享坐标系同时保留接触几何与跨人—机器人迁移接口，真实机器人结果也验证了预演能够落到控制。',
        href: 'https://arxiv.org/abs/2610.02840v1',
      },
      {
        num: 2,
        tag: 'Joint WAM · Diffusion · Multi-stream / Shared Representation',
        title: 'World Action Modeling with Progressive Visual Planning',
        keyPoints: [
          'ProWAM 联合预测可执行动作与按进度排序的稀疏视觉子目标，以中间锚点替代低效的稠密长视频 rollout',
          '视觉子目标可从大规模无动作视频学习，让视频主干承担复杂视觉规划并持续指导动作生成',
          '推理时仅运行一次视频主干并缓存子目标特征；闭环重规划只需轻量动作去噪',
          '在 LIBERO-Plus 与随机化 RoboTwin 分别达到 85.8% 和 75.7%，零样本真实场景成功率达到 70.0%',
        ],
        description: 'ProWAM 的关键不是减少未来预测，而是把未来压缩成具有任务进度语义的视觉路标。子目标特征与扩散动作生成紧密耦合，又可在重规划时复用，因此兼顾长时 foresight 与控制频率。按 taxonomy，它属于 Joint Diffusion WAM 的 multi-stream/shared-representation 路线：显式未来由视频分支给出，动作分支消费缓存表示形成闭环。',
        href: 'https://arxiv.org/abs/2610.02508v1',
      },
      {
        num: 3,
        tag: 'Cascaded + Joint WAM · Diffusion · Visual Subgoal Hierarchy',
        title: 'Rethinking World-Action Model for Compositional and In-Context Robotic Manipulation',
        keyPoints: [
          'ViGAR 将长时组合操作分解为视觉子目标规划器和子目标执行器，显式补足短视 WAM 缺少的子任务推理',
          '规划器从当前观测与全局指令预测下一子任务视觉目标，执行器再条件于该目标联合生成未来视觉轨迹与动作',
          '两个阶段共享预训练世界模型表示，使任务级规划和动作生成复用相同物理知识',
          '在 RoboTwin Clean2Random 的 Clean 与 Random 设置达到 82.00% 和 67.02%，并在五项组合及两项 in-context 真实机器人任务上验证',
        ],
        description: 'ViGAR 同时包含级联和联合耦合：上层先产生视觉子目标，下层再共同生成视觉未来与动作。共享世界表示避免规划器和策略成为两个互不相干的模块，而全局目标图还能在不更新参数时改变子任务分解。它展示了 WAM 从短动作块扩展到组合任务的一条清晰路径。',
        href: 'https://arxiv.org/abs/2610.02368v1',
      },
      {
        num: 4,
        tag: 'Joint WAM · Diffusion / Flow · Multi-stream Hidden State',
        title: 'World-Calibrated Proposal-to-Action Flow for Vision-Language-Action Models',
        keyPoints: [
          'ProAct 不再从任务无关各向同性高斯噪声生成动作，而由 Proposal Expert 将近期动作转成场景感知的连续性假设',
          'prospective World Expert 以该假设为软运动先验预测任务一致的 latent future，并评估动作提案与未来的兼容性',
          '兼容性进一步构造以提案为中心的各向异性生成源，限制逐步偏移并在平移、旋转和夹爪维度分配修正方向',
          '相对 π₀.₅ 在仿真和真实任务上提高性能，同时去噪步数减少 50%、延迟最多降低 25.8%、吞吐最多提高 34.8%',
        ],
        description: 'ProAct 把 world representation 从普通条件变量升级为动作分布的几何校准器：预测未来决定从哪里开始采样、允许偏离多远以及沿哪些控制维度搜索。世界专家与动作流通过 latent compatibility 实质耦合，属于 Joint Diffusion/Flow 的 multi-stream hidden-state 路线。它也给出了在不显式解码未来视频时保留 foresight 的高效方案。',
        href: 'https://arxiv.org/abs/2610.02323v1',
      },
      {
        num: 5,
        tag: 'Joint WAM · Diffusion · Unified Stream / Implicit Future',
        title: 'Proprioceptive Sketches as Long-Horizon Intent for Generative Action Policies',
        keyPoints: [
          'PAM 在单个 Transformer 去噪器中联合生成剩余任务的本体感知路径草图与当前可执行动作块',
          '草图按弧长而非时间参数化，以紧凑表示捕捉不受执行速度影响的关节空间几何意图',
          'block-causal attention 与错开的去噪日程维持从逐渐变清晰的草图到动作 token 的定向依赖',
          '在 Push-T 和 LIBERO-Long 超过 action-only 对照，并将四项真实双臂任务成功率从 47.5% 提至 75.0%',
        ],
        description: 'PAM 用未来本体状态取代昂贵的视频预演，但仍满足 WAM 的核心门槛：长时预测与动作不是两个串联模型，而是在统一去噪过程中共同生成，且通过因果注意力让未来草图直接塑造可执行动作。它属于 unified-stream、implicit future prediction 路线，说明“世界”可以是控制充分的关节空间未来，而不必总是像素。',
        href: 'https://arxiv.org/abs/2610.02759v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'SkeleWAM: Skeleton World-Action Modeling for Efficient Robotic Manipulation', tag: 'Joint WAM · Predictive Geometric State', href: 'https://arxiv.org/abs/2610.02120v1', description: '用机器人关节、物体中心和交互点组成的稀疏三维骨架统一未来状态预测与动作生成；57.1M 参数在 LIBERO-Plus 达到 85.9%。方法耦合很强，但摘要未明确生成主干属于 taxonomy 中哪类 diffusion/AR，故谨慎列入延伸阅读。' },
      { num: 2, title: 'SimpleTouch: Can Vision-Language-Action Models Master Contact-Rich Manipulation Without Tactile Policy Pretraining?', tag: 'WAM-adjacent · Future Tactile Latents', href: 'https://arxiv.org/abs/2610.02784v1', description: '在 π₀.₅ 上加入触觉专家，以动作监督和多时域未来触觉 latent 预测单阶段训练；六项 UniVTAC 平均 77.5%，四项真实任务平均 71.3%。未来接触预测与策略共享训练，但没有联合生成完整世界状态。' },
      { num: 3, title: 'DeltaWorld: Physically Consistent Interactive World Simulators via Action-Conditioned Latent Increment Learning', tag: 'WAM-adjacent · Action-conditioned World Model', href: 'https://arxiv.org/abs/2610.02691v1', description: 'Delta-LTM 只预测动作引起的 latent 增量，并用反事实交互区域监督减少穿透和过度形变；跨机器人数据上 FVD 降低 46.6%。它可服务规划与策略训练，但当前贡献是世界模拟器而非联合动作生成。' },
    ],
    observation: '本周一回看上一个工作日后，最明显的趋势是 WAM 正在舍弃“必须生成完整 RGB 视频”的单一路径，转而选择控制充分的结构化未来：PointWAM 使用三维点轨迹，ProWAM 使用稀疏视觉子目标，PAM 使用无时间参数的关节路径草图，SkeleWAM 使用稀疏三维骨架。与此同时，未来与动作的接口变得更严格：ViGAR 以共享世界表示贯通层级规划和联合执行，ProAct 甚至让 latent future 决定动作生成源的形状。arXiv 类别检索是本期核心来源；Hugging Face Daily Papers 覆盖了部分相关工作，但未覆盖上述五篇核心 WAM；Awesome-WAM 最新 README 的 Joint/Diffusion 章节已核读，其标记为 NEW 的条目是更早论文，故仅作 taxonomy 参照而未伪作当日新论文。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'From 3D Rehearsal to Progressive Visual Subgoals: Structured Futures for Long-Horizon WAMs',
    description: 'Daily research digest for World Action Models',
    overview: [
      'PointWAM jointly forecasts scene and hand point trajectories in a shared 3D space-time frame, then retargets imagined motion to robots',
      'ProWAM replaces dense video rollouts with ordered sparse visual subgoals and supports closed-loop replanning with one video-backbone pass',
      'ViGAR decomposes compositional tasks into visual-subgoal planning and joint future-action execution over shared world-model representations',
      'ProAct uses predicted futures to calibrate not only action-flow conditioning but also its source, range, and directional search geometry',
      'PAM jointly denoises a long-horizon proprioceptive path sketch and a short executable action chunk',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · 3D Point-Trajectory Planning / Learned Action Retargeting',
        title: 'PointWAM: 3D World Action Modeling for Dexterous Robotic Manipulation',
        keyPoints: [
          'Explicitly decomposes the world into scene and hands and jointly forecasts their 3D point trajectories in one space-time frame to capture contact and object motion',
          'Predicts scene-hand co-evolution from a colored point cloud and language instruction, then retargets the forecast hand motion into robot actions',
          'Supports pretraining directly on large-scale human demonstration videos without task-specific object or keypoint selection',
          'Human-video pretraining adds 56.9 DexJoCo success points; scene-trajectory supervision adds another 10.9 points, and the full system exceeds prior SOTA by 11.7 points across ten tasks',
        ],
        description: 'PointWAM moves cascaded “imagine then act” from RGB video into a control-relevant 3D geometric space. It explicitly rehearses how the environment and actor co-evolve and extracts robot commands from forecast hand trajectories, making it a Cascaded WAM with learned action extraction rather than an action-conditioned video model alone. The shared frame preserves contact geometry and provides a human-to-robot transfer interface, with real-robot results grounding the forecast in control.',
        href: 'https://arxiv.org/abs/2610.02840v1',
      },
      {
        num: 2,
        tag: 'Joint WAM · Diffusion · Multi-stream / Shared Representation',
        title: 'World Action Modeling with Progressive Visual Planning',
        keyPoints: [
          'ProWAM jointly predicts executable actions and a progress-ordered sequence of sparse visual subgoals, replacing inefficient dense long-video rollouts with intermediate anchors',
          'Learns visual subgoals from large-scale action-free video so the video backbone can offload complex visual planning from the action policy',
          'Runs the video backbone once and caches subgoal features; closed-loop replanning then requires only lightweight action denoising',
          'Reaches 85.8% on LIBERO-Plus, 75.7% on randomized RoboTwin, and 70.0% success in zero-shot real-world scenes',
        ],
        description: 'ProWAM does not remove future prediction; it compresses the future into visual landmarks with task-progress semantics. Those features remain tightly coupled to diffusion action generation and reusable during replanning, balancing long-horizon foresight with control rate. In the taxonomy, it is a Joint Diffusion WAM with multi-stream/shared representations: a video branch makes explicit futures and an action branch consumes cached representations in the loop.',
        href: 'https://arxiv.org/abs/2610.02508v1',
      },
      {
        num: 3,
        tag: 'Cascaded + Joint WAM · Diffusion · Visual Subgoal Hierarchy',
        title: 'Rethinking World-Action Model for Compositional and In-Context Robotic Manipulation',
        keyPoints: [
          'ViGAR decomposes long-horizon compositional manipulation into a visual-subgoal planner and subgoal executor, adding explicit subtask reasoning missing from short-horizon WAMs',
          'The planner predicts the next subtask image from current observation and global instruction; the executor jointly generates future visual trajectories and actions conditioned on that image',
          'Both stages share a pretrained world-model representation so task-level planning and action generation reuse the same physical knowledge',
          'Achieves 82.00% and 67.02% in RoboTwin Clean2Random Clean and Random settings and validates on five compositional plus two in-context real-robot tasks',
        ],
        description: 'ViGAR combines cascaded and joint coupling: an upper level first produces a visual subgoal, and a lower level co-generates visual futures and actions. Shared world representations keep the planner and policy from becoming unrelated modules, while a global goal image changes subtask decomposition without parameter updates. It provides a concrete route from short action chunks to compositional WAM control.',
        href: 'https://arxiv.org/abs/2610.02368v1',
      },
      {
        num: 4,
        tag: 'Joint WAM · Diffusion / Flow · Multi-stream Hidden State',
        title: 'World-Calibrated Proposal-to-Action Flow for Vision-Language-Action Models',
        keyPoints: [
          'ProAct replaces a task-agnostic isotropic Gaussian action source with a Proposal Expert that turns recent actions into a scene-aware continuity hypothesis',
          'A prospective World Expert treats that hypothesis as a soft motion prior, predicts a task-consistent latent future, and measures proposal-future compatibility',
          'Compatibility defines a proposal-centered anisotropic source that bounds per-step deviation and allocates refinement across translation, rotation, and gripper directions',
          'Improves over π₀.₅ in simulation and real tasks while halving denoising steps, cutting latency by up to 25.8%, and raising throughput by up to 34.8%',
        ],
        description: 'ProAct elevates the world representation from an ordinary condition into a geometric calibrator of the action distribution: predicted futures decide where sampling begins, how far it may move, and which control directions receive refinement. The world expert and action flow are materially coupled through latent compatibility, placing it in the Joint Diffusion/Flow multi-stream hidden-state family. It also preserves foresight efficiently without decoding future video.',
        href: 'https://arxiv.org/abs/2610.02323v1',
      },
      {
        num: 5,
        tag: 'Joint WAM · Diffusion · Unified Stream / Implicit Future',
        title: 'Proprioceptive Sketches as Long-Horizon Intent for Generative Action Policies',
        keyPoints: [
          'PAM jointly generates a proprioceptive sketch of the remaining task path and the current executable action chunk in one Transformer denoiser',
          'Parameterizes the sketch by arc length rather than time, compactly encoding joint-space geometric intent independent of execution speed',
          'Uses block-causal attention and a staggered denoising schedule to preserve directed dependence from an increasingly clean sketch to action tokens',
          'Beats action-only counterparts on Push-T and LIBERO-Long and raises success from 47.5% to 75.0% over four real bimanual tasks',
        ],
        description: 'PAM replaces expensive video imagination with future proprioceptive state while retaining the core WAM criterion: long-horizon prediction and actions are co-generated rather than handled by two disconnected models, and causal attention makes the future sketch directly shape executable commands. It is a unified-stream, implicit-future approach showing that a “world” can be a control-sufficient joint-space future rather than pixels.',
        href: 'https://arxiv.org/abs/2610.02759v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'SkeleWAM: Skeleton World-Action Modeling for Efficient Robotic Manipulation', tag: 'Joint WAM · Predictive Geometric State', href: 'https://arxiv.org/abs/2610.02120v1', description: 'A sparse 3D skeleton of robot joints, object centers, and interaction points unifies future-state prediction and action generation; 57.1M parameters reach 85.9% on LIBERO-Plus. Coupling is strong, but the abstract does not identify the generator clearly enough for a confident diffusion/AR subtype.' },
      { num: 2, title: 'SimpleTouch: Can Vision-Language-Action Models Master Contact-Rich Manipulation Without Tactile Policy Pretraining?', tag: 'WAM-adjacent · Future Tactile Latents', href: 'https://arxiv.org/abs/2610.02784v1', description: 'Adds a tactile expert to π₀.₅ and trains it in one stage with action supervision and multi-horizon future tactile-latent prediction; averages 77.5% on six UniVTAC tasks and 71.3% on four real tasks. Future-contact prediction shares policy training but does not co-generate a complete world state.' },
      { num: 3, title: 'DeltaWorld: Physically Consistent Interactive World Simulators via Action-Conditioned Latent Increment Learning', tag: 'WAM-adjacent · Action-conditioned World Model', href: 'https://arxiv.org/abs/2610.02691v1', description: 'Delta-LTM predicts only action-induced latent increments, while counterfactual interaction-region supervision reduces penetration and deformation; FVD drops 46.6% on cross-robot data. It can support planning and policy learning, but the present contribution is a simulator rather than joint action generation.' },
    ],
    observation: 'Looking back from Monday to the previous workday, the clearest trend is that WAMs are moving beyond the assumption that every useful future must be a full RGB video. PointWAM uses 3D point trajectories, ProWAM uses sparse visual subgoals, PAM uses timing-free joint-path sketches, and SkeleWAM uses sparse 3D skeletons. The future-action interface is also becoming stricter: ViGAR carries shared world representations across hierarchical planning and joint execution, while ProAct lets latent futures shape the action source itself. Category-bounded arXiv retrieval supplied the core papers. Hugging Face Daily Papers covered some adjacent work but not these five core WAMs. The latest Awesome-WAM Joint/Diffusion sections were reviewed; their NEW markers refer to older papers, so they informed taxonomy but were not misreported as today’s releases.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-05',
        en: '/en/daily/world-action-model/2026-10-05',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-10-05" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
