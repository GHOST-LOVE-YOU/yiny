import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '三维动态先验、多模态接触想象与交互式闭环规划',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'PointZero 用三维点轨迹补全预训练可迁移动态先验，并在后训练中联合预测未来轨迹与机器人动作',
      'Dreaming Contact Sound 从生成视频提取运动、从生成音频提取力曲线，把像素未来扩展为接触可执行的多模态计划',
      'TRACER 用候选动作条件的人类响应预测选路，再以真实执行结果更新身份绑定信念并滚动重规划',
      'ForwardDLO、RiskWorld 与 CaSCo 展示了高效 latent dynamics、风险预测和物理模拟如何直接服务动作选择',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'PointZero: 3D Point Track Completion for Learning Transferable 3D Dynamics',
        keyPoints: [
          '提出三维点轨迹补全预训练：给定单帧 RGB-D 与稀疏、局部未来轨迹，以 DiT 预测所有已观测点的稠密未来轨迹，无需机器人动作标签',
          '构建覆盖可变形体、关节物体与刚体的 290 万帧合成动态数据，以任务无关交互学习几何、运动与物理转移先验',
          '后训练一方面以末端执行器位姿条件化模型进行动作条件三维动态预测，另一方面加入动作 head，联合预测机器人动作与未来三维轨迹',
          '在 PGND 动态预测基准上优于对比方法；在 7 项仿真与真实机器人操作任务中的 6 项达到或超过基线，并发布数据、检查点和完整训练配方',
        ],
        description: 'PointZero 是今日最接近“可扩展 WAM 预训练”的工作。它先从不依赖机器人标注的点轨迹补全中学习转移结构，再把同一预测骨干适配为动作条件世界模型或动作—未来联合策略。按 taxonomy，它属于 multi-stream/shared-representation 的 Joint WAM：动作与三维未来在后训练阶段共享动态表征并共同输出。其优势是避开 RGB 生成的外观负担，并可利用无任务成功标签的自由交互；限制是预训练数据目前以合成为主，真实复杂接触和视觉域迁移仍需后训练吸收。',
        href: 'https://arxiv.org/abs/2609.19142v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Pixel-Space Planning · Geometric + Force Extraction',
        title: 'Dreaming the Sound of Contact: Leveraging Video and Audio Generation for Zero-Shot Force-Aware Manipulation and Data Generation',
        keyPoints: [
          '从初始机器人观测与结构化任务提示联合生成机器人中心视频和音频：视频提供物体与末端执行器运动，音频中的接触响度塑造有界、随时间变化的期望力曲线',
          '通过分割、三维跟踪和机器人映射把生成视频转为末端轨迹，再由闭环力调节器在 Franka Panda 上跟踪音频导出的接触力，而非只重放运动学路径',
          '在多项接触任务中，加入音频力线索的方案成功完成了纯运动学基线失败的操作，直接验证生成未来中的物理线索可改善执行',
          '同一生成管线还能批量产生带运动与力监督的数据，训练可闭环执行任务的策略，把零样本规划器进一步转化为策略数据引擎',
        ],
        description: '这是一条很有辨识度的 Cascaded WAM 路线：世界生成器并不直接输出关节动作，而是先“想象”视听未来，再从视频恢复几何轨迹、从声音恢复接触力，最终交给闭环控制器执行。与既有 video-to-action 方法相比，新增的音频通道补足了像素无法可靠表达的法向接触强度。其动作—世界耦合发生在可执行线索提取而非联合网络内部，因此泛化取决于生成视听内容的物理可信度、三维跟踪和响度—力映射；但它明确推进了 WAM 从几何可执行到接触可执行。',
        href: 'https://arxiv.org/abs/2609.19137v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Latent Planning · Closed-Loop Belief Update',
        title: 'TRACER: Adaptive Multi-Robot Social Navigation via Joint Human-Response Prediction and Interaction-Aware Replanning',
        keyPoints: [
          '对机器人团队的联合候选轨迹进行动作条件响应预测，将单机器人影响与机器人对之间的非加性交互分开建模，以概率安全和响应代价选择执行方案',
          '每次只执行选中轨迹的前缀，并用同步观测到的人类响应更新持久、身份绑定的潜在响应模式信念；未执行候选的反事实预测不会污染信念',
          '记录的人机交互实验显示联合动作模型能恢复加性模型遗漏的非加性响应；保留身份一致证据可改善后续响应预测与重规划',
          '在 SocialGym2 多机器人社会导航基准上，完整闭环相对独立机器人基线提高无碰撞完成表现，并通过滚动时域持续适应交互对象',
        ],
        description: 'TRACER 不是生成式机器人策略，却满足强 WAM 门槛：动作候选条件化未来人类响应，预测直接决定轨迹选择，而执行结果又反向更新下一轮世界信念。其核心贡献是把“预测—执行—校正”闭环落实到多机器人与人类之间的互动动力学，尤其避免将未发生的反事实当作证据。按 taxonomy 更适合归为 latent planning 的 Cascaded WAM。当前验证集中在社会导航模拟与记录交互，响应模式离散化及身份持续跟踪在开放真实场景中仍是关键假设。',
        href: 'https://arxiv.org/abs/2609.18776v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'ForwardDLO: Model-Based Bimanual Shape Matching of Unconstrained Deformable Linear Objects', tag: 'Cascaded WAM · Latent Dynamics Planning', href: 'https://arxiv.org/abs/2609.18455v1', description: '循环 latent dynamics 预测绳索各段位移，并批量评估双臂抓取点、方向和幅度候选；固定时间内可评估多 8–22 倍动作，在 30 Hz 仿真布线任务达到 98% 成功率，也完成真实双臂形状匹配。' },
      { num: 2, title: 'Risk-Aware World Modeling with Flow-Guided Occupancy Evolution for Selective Trajectory Planning in Automated Driving', tag: 'Cascaded WAM · Latent Planning', href: 'https://arxiv.org/abs/2609.18442v1', description: 'RiskWorld 用流引导占据演化一次预测共享给所有候选，并只在新增预测风险触发且替代轨迹满足约束时换轨；nuScenes 3 秒长时域碰撞率最低，单张 RTX 4090 达 11.5 FPS。' },
      { num: 3, title: 'CaSCo: Cascade-Aware Soft-Collision Motion Planning', tag: 'Cascaded WAM · Simulator-Based Planning', href: 'https://arxiv.org/abs/2609.18910v1', description: '以物理模拟器预测候选运动造成的直接与级联物体碰撞，并将 VLM 赋予的物体语义风险纳入最优图搜索；动作条件世界演化直接改变路径代价，但依赖显式模拟而非学习式联合模型。' },
      { num: 4, title: 'World-Action Models for Robot Learning and Control: A Survey', tag: 'Survey · WAM Taxonomy', href: 'https://arxiv.org/abs/2609.16074v1', description: '系统界定 WAM 与传统 world model、model-based RL、动作条件视频生成和反应式 VLA 的边界，并从表示、转移、动作接口、架构、训练与扩展策略组织机器人 WAM；论文发表于前一 arXiv 批次，作为今日边界参考收录。' },
    ],
    observation: '今日最清晰的趋势是“可执行未来”的模态继续扩张。PointZero 说明未来不必是 RGB：稠密三维点轨迹既能作为可扩展动态预训练目标，也能在后训练中与动作共同输出；Dreaming Contact Sound 更进一步，让生成音频承担视频难以表达的接触力信息。与此同时，TRACER、ForwardDLO、RiskWorld 与 CaSCo 表明 WAM 的价值并不限于端到端扩散策略：只要动作条件预测被真实用于候选选择，并以执行结果闭环更新，它同样构成有效的 Cascaded WAM。Hugging Face Daily Papers API 今日榜单尚未覆盖这批 9 月 16 日晚间提交；Awesome-WAM 最新 README 已核读，其 Joint WAM / Diffusion-based Generation 章节今日无新增，最近 README 提交仍为 9 月 6 日。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: '3D Dynamics Priors, Multimodal Contact Imagination, and Interactive Closed-Loop Planning',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'PointZero pretrains transferable dynamics through 3D point-track completion, then jointly predicts future tracks and robot actions during post-training',
      'Dreaming Contact Sound extracts motion from generated video and force profiles from generated audio, extending pixel futures into contact-executable multimodal plans',
      'TRACER selects paths with candidate-conditioned human-response prediction, then updates identity-bound beliefs from actual outcomes for receding-horizon replanning',
      'ForwardDLO, RiskWorld, and CaSCo show how efficient latent dynamics, risk forecasts, and physics simulation can directly drive action selection',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'PointZero: 3D Point Track Completion for Learning Transferable 3D Dynamics',
        keyPoints: [
          'Introduces 3D point-track completion pretraining: given one RGB-D frame and sparse partial future tracks, a DiT predicts dense future trajectories for every observed point without robot-action labels',
          'Builds 2.9 million synthetic frames spanning deformable, articulated, and rigid objects, learning geometric, motion, and physical-transition priors from task-agnostic interactions',
          'Post-training either conditions the model on end-effector pose for action-conditioned 3D dynamics or adds an action head to jointly predict robot actions and future 3D tracks',
          'Outperforms baselines on PGND dynamics prediction and matches or exceeds them on six of seven simulated and real manipulation tasks; data, checkpoints, and training recipes are released',
        ],
        description: 'PointZero is today’s closest result to scalable WAM pretraining. It first learns transition structure from point-track completion without robot labels, then adapts the same predictive backbone into either an action-conditioned world model or a joint action–future policy. Taxonomically, it is a multi-stream, shared-representation Joint WAM at post-training: actions and 3D futures share dynamics features and are emitted together. Avoiding RGB synthesis removes appearance overhead and permits free-form interaction without task-success labels. The current pretraining corpus is primarily synthetic, so complex real contact and visual-domain transfer still have to be absorbed downstream.',
        href: 'https://arxiv.org/abs/2609.19142v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Pixel-Space Planning · Geometric + Force Extraction',
        title: 'Dreaming the Sound of Contact: Leveraging Video and Audio Generation for Zero-Shot Force-Aware Manipulation and Data Generation',
        keyPoints: [
          'Jointly generates robot-centric video and audio from an initial observation and structured prompt: video supplies object and end-effector motion, while contact loudness shapes a bounded time-varying desired-force profile',
          'Segmentation, 3D tracking, and robot mapping turn video into an end-effector trajectory; a closed-loop force regulator on a Franka Panda tracks the audio-derived force rather than replaying kinematics alone',
          'Across contact-rich tasks, adding generated-audio force cues succeeds where the kinematic-only baseline fails, directly showing that physical signals in imagined futures improve execution',
          'The same pipeline generates motion-and-force supervision for training policies that solve the tasks closed-loop, turning a zero-shot planner into a policy-data engine',
        ],
        description: 'This is a distinctive Cascaded WAM: the generator does not directly emit joint actions, but imagines audiovisual futures from which geometry and contact force are extracted for closed-loop execution. Compared with prior video-to-action systems, audio fills in normal-force intensity that pixels encode poorly. Coupling occurs through executable-signal extraction rather than inside one joint network, so transfer depends on audiovisual physical fidelity, 3D tracking, and the loudness-to-force mapping. Even so, it clearly advances WAMs from geometric executability toward contact executability.',
        href: 'https://arxiv.org/abs/2609.19137v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Latent Planning · Closed-Loop Belief Update',
        title: 'TRACER: Adaptive Multi-Robot Social Navigation via Joint Human-Response Prediction and Interaction-Aware Replanning',
        keyPoints: [
          'Predicts responses conditioned on joint candidate trajectories, separating individual-robot effects from non-additive robot-pair interactions, then selects plans under probabilistic safety and response-aware costs',
          'Executes only the selected prefix and updates persistent identity-bound beliefs over latent response modes from synchronized observations; counterfactual predictions for unexecuted candidates never enter the belief',
          'Recorded interactions show that joint-action modeling recovers non-additive responses missed by additive predictors, while identity-consistent evidence improves subsequent prediction and replanning',
          'On SocialGym2, the complete receding-horizon loop improves collision-free completion over an independent-robot baseline while continually adapting to interaction partners',
        ],
        description: 'TRACER is not a generative robot policy, but it clears the strong WAM threshold: candidate actions condition future human-response prediction, the prediction directly selects trajectories, and execution outcomes update the next world belief. Its main contribution is a concrete predict–execute–correct loop for interactive multi-robot dynamics, particularly the exclusion of unrealized counterfactuals from evidence. It fits the latent-planning Cascaded WAM branch. Validation remains centered on social-navigation simulation and recorded interaction, leaving discrete response modes and persistent identity tracking as important assumptions in open real environments.',
        href: 'https://arxiv.org/abs/2609.18776v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'ForwardDLO: Model-Based Bimanual Shape Matching of Unconstrained Deformable Linear Objects', tag: 'Cascaded WAM · Latent Dynamics Planning', href: 'https://arxiv.org/abs/2609.18455v1', description: 'A recurrent latent dynamics model predicts per-segment rope displacement and batches candidates over two-arm grasp points, directions, and magnitudes. It evaluates 8–22× more actions per fixed budget, reaches 98% success in 30 Hz simulated routing, and performs real bimanual shape matching.' },
      { num: 2, title: 'Risk-Aware World Modeling with Flow-Guided Occupancy Evolution for Selective Trajectory Planning in Automated Driving', tag: 'Cascaded WAM · Latent Planning', href: 'https://arxiv.org/abs/2609.18442v1', description: 'RiskWorld reuses one flow-guided occupancy forecast across candidates and replaces the current trajectory only when additional predicted risk triggers intervention and an alternative satisfies constraints. It reports the lowest 3-second collision rate on nuScenes at 11.5 FPS on one RTX 4090.' },
      { num: 3, title: 'CaSCo: Cascade-Aware Soft-Collision Motion Planning', tag: 'Cascaded WAM · Simulator-Based Planning', href: 'https://arxiv.org/abs/2609.18910v1', description: 'A physics simulator predicts direct and cascading object collisions caused by candidate motions, while VLM-assigned semantic object risk enters optimal graph search. Action-conditioned evolution directly changes path cost, though coupling relies on explicit simulation rather than a learned joint model.' },
      { num: 4, title: 'World-Action Models for Robot Learning and Control: A Survey', tag: 'Survey · WAM Taxonomy', href: 'https://arxiv.org/abs/2609.16074v1', description: 'Clarifies the boundary between WAMs, conventional world models, model-based RL, action-conditioned video generation, and reactive VLAs, then organizes robotic WAMs by representation, transition, action interface, architecture, training, and scaling. It appeared in the preceding arXiv batch and is included as a boundary reference.' },
    ],
    observation: 'Today’s clearest pattern is an expansion of what counts as an executable future. PointZero shows that the future need not be RGB: dense 3D point tracks provide a scalable dynamics-pretraining objective and can later be emitted jointly with actions. Dreaming Contact Sound goes further by assigning generated audio the contact-force information that video represents poorly. Meanwhile, TRACER, ForwardDLO, RiskWorld, and CaSCo show that WAM value is not confined to end-to-end diffusion policies: candidate-conditioned prediction that genuinely selects actions and closes the loop with execution outcomes is equally substantive Cascaded WAM work. The Hugging Face Daily Papers API has not yet covered these late September 16 submissions. The latest Awesome-WAM README was reviewed; its Joint WAM and Diffusion-based Generation sections have no new entry today, and its latest README commit remains September 6.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-17',
        en: '/en/daily/world-action-model/2026-09-17',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-17" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
