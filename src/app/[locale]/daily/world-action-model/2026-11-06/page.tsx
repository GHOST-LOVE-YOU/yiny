import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '未来表征蒸馏、几何运动与长时程扩散耦合',
    description: 'World Action Model 与 embodied AI 论文日报',
    overview: [
      'DreamFree 将视频扩散模型的未来预测知识蒸馏为单次前向的视觉表征',
      'Cycle WAM 用双向转换与循环一致性强化视频—动作因果对应',
      'FloMo 以 3D scene flow 作为视频到动作迁移的中间接口',
      'Gnomon4D 联合生成视频、动作与交互显著的 4D 几何运动场',
      'HiLo-WAM 分离长时任务演化与局部动力学并进行渐进式推理',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'Future Representation Distillation for Imagination-free World Action Models',
        keyPoints: [
          '提出 DreamFree：视觉编码器只看当前观测，却蒸馏冻结视频扩散模型对未来表征的预测',
          '动作模块从预测性视觉表征中提取动作相关信息，部署时不再生成未来视频',
          '在仿真与真实任务上超过对比 VLA/WAM，并以 14B 视频扩散骨干实现 11Hz 闭环控制',
          '表征学习阶段无需动作标注，因此可利用跨 embodiment 的视频示范迁移到新任务',
        ],
        description: 'DreamFree 把 WAM 的关键耦合从“运行时生成未来视频”改为“当前观测中的未来表征预测”。这属于 Predictive-Latent 路线：世界预测仍直接监督动作学习，但将迭代去噪的成本移到训练期。对实际机器人而言，11Hz 闭环速度说明未来知识可以在不牺牲视频先验的情况下变成可部署的动作条件。',
        href: 'https://arxiv.org/abs/2611.04527',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled',
        title: 'Cycle WAM: Coupling Action and Video through Cycle Consistency',
        keyPoints: [
          '通过视频到动作、动作到视频的双向转换，同时恢复 forward dynamics 与 inverse dynamics',
          '引入可微循环重建目标，要求跨模态转换后保留原输入中的交互信息',
          '把视频—动作的因果对应作为训练对象，而不只依赖共享 backbone 的隐式关联',
          '在 LIBERO-Pro 达到同类方法的领先结果，并显著改善 DreamZero 在 DROID 上的表现',
        ],
        description: 'Cycle WAM 针对 WAM 中常见的“视频预测和动作预测虽联合训练、但未必一致”问题。双向转换加循环约束使未来视觉后果与产生它的动作互相可解释，适合同时需要前向想象、逆动力学和策略执行的系统。',
        href: 'https://arxiv.org/abs/2611.04711',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Geometric Extraction',
        title: 'FloMo: 3D Scene Flow as a World Action Model Intermediate for Learning from Human Video',
        keyPoints: [
          '将 3D scene flow 与 action tokens 作为视频生成骨干的联合预测目标',
          '把 scene flow 渲染为 RGB 并编码到视频 latent 空间，复用大规模视频先验',
          '联合利用无动作人类视频与有动作机器人遥操作数据，支持跨物体、动作原语和任务泛化',
          '消融显示仅预测视频会损害 OOD 泛化，而动作 token 对 motion 的关注高于对 RGB 视频的关注',
        ],
        description: 'FloMo 选择 3D 运动而不是完整 RGB 未来作为视频到动作的中间层，强调控制真正需要的是物体与场景如何移动，而不是纹理细节。按 Awesome-WAM taxonomy，这是一条带几何动作抽取的 Cascaded WAM 路线，也为 human video 预训练和 robot action grounding 提供了清晰接口。',
        href: 'https://arxiv.org/abs/2611.05062',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Multi-Stream / Cross-Attention',
        title: 'Gnomon4D: Learning Where and When to Focus for Geometric Motion-Grounded World-Action Modeling',
        keyPoints: [
          '联合生成未来视频、机器人动作和 GeoDelta 4D 几何运动场，显式记录深度变化与图像位移',
          'Interaction-Salient Attention 聚焦 embodiment–object 接触区域，Transition-Anchored Aggregation 聚焦抓取与释放时刻',
          '用与 embodiment 无关的表面运动作为 human–robot quasi-action，连接无动作视频与机器人数据',
          '在 RoboTwin 2.0、VLABench、RoboDojo 和真实机器人上领先或超过基线，尤其改善视觉分布变化',
        ],
        description: 'Gnomon4D 把“动作应该读哪里、读哪个时间段”作为 WAM 的核心设计变量。GeoDelta 同时覆盖机器人和物体，使相对运动成为可迁移的交互信号；这属于多流扩散中的显式几何辅助耦合，直接补足 RGB future 对 3D 接触关系表达不足的问题。',
        href: 'https://arxiv.org/abs/2611.02474',
      },
      {
        num: 5,
        tag: 'Joint WAM - Diffusion · Multi-Stream / Cross-Attention',
        title: 'HiLo-WAM: Decoupling Long-Horizon Task Evolution and Local Dynamics in World Action Models',
        keyPoints: [
          '以稀疏视觉流建模长时任务上下文与未来演化，以密集视觉流建模短时机器人—物体交互',
          '双流在统一 dual-DiT 中以不同时间尺度运行，并通过结构化 cross-stream attention 指导动作',
          '渐进式推理允许视觉流部分去噪、缓存与动态跳过，减少不必要的世界模型计算',
          '在 RoboTwin 2.0 达到 93.70% 平均成功率，在 RoboDojo 长时任务达到 17.43 progress score，并获得 2.93x 加速',
        ],
        description: 'HiLo-WAM 将长时规划和局部接触控制拆成互补而非相互竞争的视觉流，再让动作流跨尺度读取两者。它体现了 Multi-Stream / Cross-Attention taxonomy 的一个实用方向：不是盲目延长高分辨率预测，而是用稀疏长时信息提供任务方向，用密集短时信息完成精确执行。',
        href: 'https://arxiv.org/abs/2611.05023',
      },
    ],
    worthReading: [
      { num: 1, title: 'W2A: Distilling World Priors into Action Models for Real-Time Robotic Control', tag: 'Predictive-Latent · 参考清单新增前的近期论文', href: 'https://arxiv.org/abs/2611.02600', description: '将视频扩散中间去噪表征压缩蒸馏到动作 DiT，LIBERO 平均成功率 95.9%，推理约快 21 倍；是 DreamFree 的互补实时化路线。' },
      { num: 2, title: 'GreenWAM: A World Foundation Model for Robotics', tag: 'Joint WAM · 参考清单相关', href: 'https://arxiv.org/abs/2610.18774', description: '在多机器人族的共享解剖动作空间中联合训练视觉、action-conditioned 与 world-action 模式，并将 action expert 从生成器中分离适配。' },
      { num: 3, title: 'PointWAM: 3D World Action Modeling for Dexterous Robotic Manipulation', tag: 'Cascaded WAM · 3D Geometric', href: 'https://arxiv.org/abs/2610.02840', description: '在共享时空坐标系中联合预测 scene 与 hand 的 3D 点轨迹，再将手部预测重定向为机器人动作，专门处理灵巧操作的接触几何。' },
      { num: 4, title: 'World Action Planner: Generalizable Robot Decision-Making with Action-Conditioned World Models', tag: 'Cascaded WAM · Planning', href: 'https://arxiv.org/abs/2607.27599', description: '通过动作条件世界模型的 imagined rollouts 做 coarse-to-fine action search，把 VLM 提案、全局优化与局部候选比较结合到新任务规划。' },
    ],
    observation: '本期最明确的方向是把 WAM 的“未来”变成更可用的控制接口：DreamFree 与 W2A 取消部署时的完整视频想象，FloMo 与 Gnomon4D 用几何运动压缩视频到动作的因果桥梁，HiLo-WAM 则把长时任务演化与局部动力学放到不同时间尺度。Awesome-WAM README 当前仍以 2026 年 6 月前后的条目为主，本期新增论文尚未进入该清单，因此页面中的 taxonomy 是按其既有标签体系做的编辑归类，而不是把参考清单新增误称为今日论文。编辑检查：优先核验论文摘要与 arXiv 提交日期；HF Daily Papers 已覆盖但本期未发现达到 WAM 门槛的候选。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Future Representation Distillation, Geometric Motion, and Long-Horizon Diffusion Coupling',
    description: 'Daily research digest for World Action Models and embodied AI',
    overview: [
      'DreamFree distills future knowledge from video diffusion into a single-pass visual representation',
      'Cycle WAM strengthens causal video-action correspondence with bidirectional conversion and cycle consistency',
      'FloMo uses 3D scene flow as an intermediate interface from video pretraining to action',
      'Gnomon4D jointly models video, actions, and interaction-salient 4D geometric motion',
      'HiLo-WAM separates long-horizon task evolution from local dynamics with progressive inference',
    ],
    papers: [
      { num: 1, tag: 'Joint WAM - Autoregressive · Predictive-Latent', title: 'Future Representation Distillation for Imagination-free World Action Models', keyPoints: ['DreamFree distills a frozen video diffusion model’s predicted future representation from the current observation alone', 'An action module extracts control-relevant information, removing future-video generation at deployment', 'It reports stronger simulation and real-world results than VLA/WAM baselines and 11Hz closed-loop control with a 14B backbone', 'Representation learning needs no action labels, enabling transfer from videos across embodiments'], description: 'DreamFree moves WAM coupling from generating future videos at inference to predicting future representations from the current observation. This Predictive-Latent design keeps future supervision coupled to action learning while shifting iterative denoising to training. The reported 11Hz loop shows how video priors can become deployable control signals without retaining the full video generator online.', href: 'https://arxiv.org/abs/2611.04527' },
      { num: 2, tag: 'Joint WAM - Autoregressive · Explicit-Decoupled', title: 'Cycle WAM: Coupling Action and Video through Cycle Consistency', keyPoints: ['Uses bidirectional video-to-action and action-to-video conversion to recover forward and inverse dynamics', 'Adds differentiable cycle reconstruction so cross-modal conversion preserves interaction information', 'Treats causal video-action correspondence as a training target rather than relying only on a shared backbone', 'Reports leading comparable results on LIBERO-Pro and substantial gains over DreamZero on DROID'], description: 'Cycle WAM addresses the gap between jointly trained video and action heads that are not necessarily consistent. Bidirectional conversion and cycle constraints make visual consequences and their generating actions mutually explanatory, supporting forward imagination, inverse dynamics, and policy execution in one framework.', href: 'https://arxiv.org/abs/2611.04711' },
      { num: 3, tag: 'Cascaded WAM · Geometric Extraction', title: 'FloMo: 3D Scene Flow as a World Action Model Intermediate for Learning from Human Video', keyPoints: ['Jointly predicts 3D scene flow and action tokens with a video-generation backbone', 'Renders scene flow as RGB and encodes it in the video latent space to reuse video priors', 'Combines action-free human video with action-labeled robot teleoperation for cross-task generalization', 'Ablations show that video-only targets hurt OOD generalization and action tokens attend more to motion than RGB video'], description: 'FloMo chooses 3D motion rather than full RGB futures as the intermediate from video to action. It argues that control needs object and scene movement more than texture detail. In the Awesome-WAM taxonomy, this is a Cascaded WAM with geometric action extraction and a clear interface for grounding human-video pretraining in robot actions.', href: 'https://arxiv.org/abs/2611.05062' },
      { num: 4, tag: 'Joint WAM - Diffusion · Multi-Stream / Cross-Attention', title: 'Gnomon4D: Learning Where and When to Focus for Geometric Motion-Grounded World-Action Modeling', keyPoints: ['Jointly generates future video, robot actions, and GeoDelta, a 4D field of image displacement and depth change', 'Interaction-Salient Attention focuses on embodiment-object contacts while Transition-Anchored Aggregation focuses on grasp and release', 'Uses embodiment-agnostic surface motion as a human-robot quasi-action linking action-free and robot data', 'Leads or improves baselines on RoboTwin 2.0, VLABench, RoboDojo, and real robots, especially under visual shifts'], description: 'Gnomon4D treats where and when an action reads the world as a central WAM design choice. GeoDelta covers both robot and object motion, making relative movement a transferable interaction signal. It is a multi-stream diffusion coupling strategy that directly addresses the weak 3D contact structure of RGB futures.', href: 'https://arxiv.org/abs/2611.02474' },
      { num: 5, tag: 'Joint WAM - Diffusion · Multi-Stream / Cross-Attention', title: 'HiLo-WAM: Decoupling Long-Horizon Task Evolution and Local Dynamics in World Action Models', keyPoints: ['Uses a sparse visual stream for long-horizon context and future task evolution and a dense stream for local robot-object dynamics', 'Runs both streams at different temporal scales in a unified dual-DiT with structured cross-stream action attention', 'Progressive inference supports partial denoising, caching, and dynamic skipping', 'Reports 93.70% average success on RoboTwin 2.0, 17.43 progress on RoboDojo, and 2.93x speedup'], description: 'HiLo-WAM makes long-horizon planning and local contact control complementary streams rather than one overloaded representation. It exemplifies Multi-Stream / Cross-Attention: sparse long-term information supplies task direction while dense short-term information supports precise execution.', href: 'https://arxiv.org/abs/2611.05023' },
    ],
    worthReading: [
      { num: 1, title: 'W2A: Distilling World Priors into Action Models for Real-Time Robotic Control', tag: 'Predictive-Latent · Recent reference', href: 'https://arxiv.org/abs/2611.02600', description: 'Distills intermediate video-diffusion representations into an action DiT, reporting 95.9% average LIBERO success and about 21x faster inference; a complementary real-time route to DreamFree.' },
      { num: 2, title: 'GreenWAM: A World Foundation Model for Robotics', tag: 'Joint WAM · Related reference', href: 'https://arxiv.org/abs/2610.18774', description: 'Jointly trains visual, action-conditioned, and world-action modes across a shared anatomical action space spanning many robot families.' },
      { num: 3, title: 'PointWAM: 3D World Action Modeling for Dexterous Robotic Manipulation', tag: 'Cascaded WAM · 3D Geometric', href: 'https://arxiv.org/abs/2610.02840', description: 'Forecasts scene and hand point trajectories in a shared space-time frame, then retargets hand forecasts into robot actions for contact-rich dexterous tasks.' },
      { num: 4, title: 'World Action Planner: Generalizable Robot Decision-Making with Action-Conditioned World Models', tag: 'Cascaded WAM · Planning', href: 'https://arxiv.org/abs/2607.27599', description: 'Uses imagined rollouts for coarse-to-fine action search, combining VLM proposals, global optimization, and local candidate comparison for novel tasks.' },
    ],
    observation: 'The clearest trend is making the WAM future a more usable control interface. DreamFree and W2A remove full video imagination at deployment; FloMo and Gnomon4D compress the causal bridge from video to action into geometric motion; HiLo-WAM assigns long-horizon evolution and local dynamics to different temporal scales. The current Awesome-WAM README is still centered on entries through roughly June 2026, so these papers are not marked as newly added to that list. Taxonomy labels here follow its existing scheme as editorial classifications. We verified abstracts and arXiv submission dates; Hugging Face Daily Papers was covered but yielded no candidate meeting the WAM threshold for this issue.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/world-action-model/2026-11-06', en: '/en/daily/world-action-model/2026-11-06' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-11-06" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>
        {c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}
      </MustRead>
      <WorthReading>
        {c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
