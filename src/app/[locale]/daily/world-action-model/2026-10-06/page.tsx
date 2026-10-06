import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '单步异步 WAM、分层潜空间规划与未来锚点恢复',
    description: 'World Action Model 研究论文日报',
    overview: [
      'RealtimeWAM 将动作去噪压缩为一步，并以视频—动作专家的波前流水消除串行等待',
      'H-JEPA 在多时间尺度潜空间中自顶向下规划，把远期预测逐层转化为可执行子目标',
      'FAVOR 保留 WAM 执行前生成的未来帧，以同一组未来锚点完成偏差验证和在线恢复',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM · Diffusion · Multi-stream / Shared KV State',
        title: 'RealtimeWAM: One-Step Asynchronous World Action Models',
        keyPoints: [
          '以 Teacher-Anchored Consistency Distillation 同时约束局部一致性和冻结教师多步 rollout 的终点，将迭代式动作去噪压缩为一步',
          '提出 Cross-Expert Wavefront Pipelining：视频专家按 block 生成 KV cache，动作专家在对应 attention 消费前才同步，从而让两位专家异步重叠',
          '可直接应用于 Fast-WAM 与 Faster-WAM，并在 LIBERO、LIBERO-Plus 和 RoboTwin 上把性能下降控制在 1% 以内',
          '在 H100 上报告约 25 倍端到端加速，同时公开 LightX2V 中的代码和检查点',
        ],
        description: 'RealtimeWAM 没有削弱世界—动作耦合来换速度：视频生成主干的视觉 KV 表示仍逐块进入动作专家，只是把跨专家依赖改造成流水线，并把动作扩散蒸馏成单步。按 taxonomy，它属于 Joint Diffusion WAM 的 multi-stream/shared-state 路线；贡献在于把“世界先算完、动作再开始”的同步边界细化到 attention block，使 WAM 更接近实时闭环控制。',
        href: 'https://arxiv.org/abs/2610.06617v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Predictive Latent Planning / Inverse Dynamics',
        title: 'H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning',
        keyPoints: [
          '端到端训练一组分层 action-conditioned JEPA，每层在独立学习的潜空间中预测不同时间尺度的未来',
          '规划自顶向下进行：最高层优化面向目标的进度，每层预测再成为下一层规划器的子目标',
          '当数据因素具有分离的变化速度时，高层会丢弃快速且不可预测的细节，保留较慢的任务相关状态',
          'Visual AntMaze 中三层模型把成功率从 18% 提至 73% 且减少规划计算；加入 inverse-dynamics 监督后还在 DROID 真实机器人视频上改善离线规划保真度',
        ],
        description: 'H-JEPA 是强相关的 Cascaded WAM：候选动作驱动层级潜世界向前预测，高层未来被逐层细化为短期子目标，底层再通过 inverse dynamics 接到动作。它没有生成像素视频，却把 predictive latent dynamics 直接放在规划—控制链路中。最大的启示是长时 WAM 不必在单一 latent 中兼顾所有尺度，而可以让抽象未来负责方向、细粒度未来负责可执行性。',
        href: 'https://arxiv.org/abs/2610.06805v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Explicit Future Verification / Closed-loop Recovery',
        title: 'Future Anchored Verification and Online Recovery for World Action Models',
        keyPoints: [
          '保留 WAM 在执行前生成的未来帧，把原本只用于动作解码的一次性预测转化为闭环执行锚点',
          'Anchor Verifier 联合比较当前观测、对应未来锚点和已执行动作，检测会破坏任务的偏差',
          'Anchor-Guided Recovery 让视觉语言模型把失败锚点转换为短纠错指令，再由原 WAM 执行恢复并续接原任务',
          '无需修改策略，在 LIBERO 上将成功率从 97.85% 提至 98.10%，在 LIBERO-Plus 上从 72.60% 提至 72.98%',
        ],
        description: 'FAVOR 为级联式“先生成未来、再从未来解码动作”补上了闭环接口。关键并非另建独立监控器，而是复用动作生成所依据的显式未来：同一未来既定义预期轨迹，也定位偏差并提供恢复目标。提升幅度有限但机制清晰，特别适合长时任务中一次 rollout 很快因执行误差失效的问题。',
        href: 'https://arxiv.org/abs/2610.06280v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Mind the Execution Gap: Action-Semantic Mismatch in World-Model Control', tag: 'Cascaded WAM · Execution-consistent Planning', href: 'https://arxiv.org/abs/2610.06582v1', description: '区分 TD-MPC2 的未来动作时间线错配与 DreamerV3 的转移—动作归因错误，并分别用 Future-Sequence 与 Applied-Action Feedback 修复异步执行语义；它直接检验 world-model planning 到真实控制接口，但不是新联合生成架构。' },
      { num: 2, title: 'SimForcing: Distilling Simulation Motion Priors into Real-Domain Robot World Models', tag: 'WAM-adjacent · Action-conditioned Video World Model', href: 'https://arxiv.org/abs/2610.06598v1', description: '通过 latent-motion distillation 和多 block 仿真条件训练真实域视频世界模型，学生同时生成仿真条件与真实视频；其权重可改善 VLA 初始化，但当前动作策略与未来生成仍是先预训练、后迁移。' },
      { num: 3, title: 'KineWorld: Action-Induced Transport Fields for Embodied World Modeling', tag: 'WAM-adjacent · Diffusion Future Prediction', href: 'https://arxiv.org/abs/2610.06349v1', description: '把机器人运动学提升为相机对齐 transport field，并对未来 RGB flow matching 的交互区域加权；更准确地学习动作后果，但摘要未展示与动作生成或策略选择的闭环耦合。' },
      { num: 4, title: 'TAPDreamer: Transferable Adversarial Patches for World Action Models', tag: 'WAM Safety · Shared Encoder Attack', href: 'https://arxiv.org/abs/2610.06814v1', description: '仅用公共编码器和单任务六帧构造无需查询目标策略的固定贴片，令 FastWAM、DreamWAM 与 Motus 大幅失效；它揭示 shared visual encoder 是跨世界预测与动作策略共同继承的系统级攻击面。' },
    ],
    observation: '今日核心进展集中在“如何让预测真正留在控制环里”。RealtimeWAM 在不拆散视频—动作专家的前提下，把共享 KV 依赖流水化并将动作去噪蒸馏到一步；H-JEPA 用分层潜未来解决单尺度模型的长时规划负担；FAVOR 则让生成未来在动作解码后继续承担验证和恢复。与此同时，执行异步性与共享编码器攻击表明，WAM 的耦合也会传播系统风险：未来模型假设的动作语义必须与实际执行一致，视觉表示的脆弱性也会同时污染预测和控制。arXiv 类别池发现了三篇核心论文；Hugging Face Daily Papers API 成功覆盖，但截至采集时尚未收录这些 10 月 5 日提交；Awesome-WAM 最新 README 已核读 Joint/Diffusion taxonomy，尚未出现 2610.* 条目，因此仅作分类参照。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'One-Step Asynchronous WAMs, Hierarchical Latent Planning, and Future-Anchored Recovery',
    description: 'Daily research digest for World Action Models',
    overview: [
      'RealtimeWAM compresses action denoising to one step and removes serial waiting with a wavefront pipeline across video and action experts',
      'H-JEPA plans top-down across multi-timescale latent spaces, progressively turning distant predictions into executable subgoals',
      'FAVOR retains futures generated before execution and uses the same visual anchors for deviation verification and online recovery',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM · Diffusion · Multi-stream / Shared KV State',
        title: 'RealtimeWAM: One-Step Asynchronous World Action Models',
        keyPoints: [
          'Teacher-Anchored Consistency Distillation supervises both local consistency and the frozen teacher’s multi-step rollout endpoint, reducing iterative action denoising to one step',
          'Cross-Expert Wavefront Pipelining lets the video expert produce KV-cache blocks while the action expert synchronizes only immediately before consuming each corresponding attention block',
          'Applies to Fast-WAM and Faster-WAM while keeping degradation below 1% on LIBERO, LIBERO-Plus, and RoboTwin',
          'Reports roughly 25x end-to-end speedup on H100 and releases code and checkpoints through LightX2V',
        ],
        description: 'RealtimeWAM does not buy speed by weakening world-action coupling. Visual KV representations from the video backbone still enter the action expert block by block; the method pipelines that dependency and distills action diffusion to one step. Taxonomically, it is a multi-stream/shared-state Joint Diffusion WAM. Its main contribution is refining the “finish world computation, then begin action” barrier down to attention blocks, moving WAMs closer to real-time closed-loop control.',
        href: 'https://arxiv.org/abs/2610.06617v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Predictive Latent Planning / Inverse Dynamics',
        title: 'H-JEPA: End-to-End Learning of Hierarchical World Models for Visual Planning',
        keyPoints: [
          'Trains a hierarchy of action-conditioned JEPAs end to end, with every level predicting a different temporal range in its own learned latent space',
          'Plans top-down: the highest level optimizes goal progress, and each level’s prediction becomes a subgoal for the planner below',
          'When data factors evolve at separated rates, upper levels discard fast unpredictable details and retain slower task-relevant state',
          'A three-level model raises Visual AntMaze success from 18% to 73% with less planning compute; inverse-dynamics supervision also improves offline planning fidelity on real-robot DROID videos',
        ],
        description: 'H-JEPA is a strongly relevant Cascaded WAM: candidate actions drive a hierarchy of predictive latent worlds, distant futures are progressively refined into short-range subgoals, and inverse dynamics connects the bottom level to action. It does not render pixels, but predictive dynamics sit directly in the planning-control chain. The broader lesson is that long-horizon WAMs need not force all timescales into one latent space: abstract futures can set direction while fine futures preserve executability.',
        href: 'https://arxiv.org/abs/2610.06805v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Explicit Future Verification / Closed-loop Recovery',
        title: 'Future Anchored Verification and Online Recovery for World Action Models',
        keyPoints: [
          'Retains future frames generated before execution, converting a disposable action-decoding prediction into a closed-loop execution anchor',
          'The Anchor Verifier jointly compares each observation, its corresponding future anchor, and executed actions to detect task-breaking deviations',
          'Anchor-Guided Recovery asks a vision-language model to turn the failed anchor into a short corrective instruction that the original WAM executes before resuming',
          'Without modifying the policy, raises success from 97.85% to 98.10% on LIBERO and from 72.60% to 72.98% on LIBERO-Plus',
        ],
        description: 'FAVOR adds a closed-loop interface to cascaded “generate a future, then decode actions from it” systems. Rather than introducing an unrelated monitor, it reuses the explicit future that grounded action generation: the same future specifies the intended trajectory, localizes deviation, and supplies a recovery target. The gains are modest, but the mechanism directly addresses how quickly one-shot rollouts become stale under execution error in long tasks.',
        href: 'https://arxiv.org/abs/2610.06280v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Mind the Execution Gap: Action-Semantic Mismatch in World-Model Control', tag: 'Cascaded WAM · Execution-consistent Planning', href: 'https://arxiv.org/abs/2610.06582v1', description: 'Separates TD-MPC2’s future-action timeline mismatch from DreamerV3’s transition-action attribution error, then repairs them with Future-Sequence and Applied-Action Feedback interfaces. It directly tests the world-model-planning-to-control boundary but is not a new joint generator.' },
      { num: 2, title: 'SimForcing: Distilling Simulation Motion Priors into Real-Domain Robot World Models', tag: 'WAM-adjacent · Action-conditioned Video World Model', href: 'https://arxiv.org/abs/2610.06598v1', description: 'Uses latent-motion distillation and multi-block simulation conditioning to train a real-domain video world model whose student generates both simulation conditions and real video. Its weights improve VLA initialization, but future generation and action policy remain pretraining and transfer stages.' },
      { num: 3, title: 'KineWorld: Action-Induced Transport Fields for Embodied World Modeling', tag: 'WAM-adjacent · Diffusion Future Prediction', href: 'https://arxiv.org/abs/2610.06349v1', description: 'Lifts robot kinematics into camera-aligned transport fields and reweights future-RGB flow matching around interaction regions. It better models action consequences, but the abstract does not establish a closed coupling to action generation or policy selection.' },
      { num: 4, title: 'TAPDreamer: Transferable Adversarial Patches for World Action Models', tag: 'WAM Safety · Shared Encoder Attack', href: 'https://arxiv.org/abs/2610.06814v1', description: 'Builds a fixed, query-free patch from a public encoder and six source-task frames, sharply degrading FastWAM, DreamWAM, and Motus. It identifies the shared visual encoder as a system-level attack surface inherited by both world prediction and action policy.' },
    ],
    observation: 'Today’s core work asks how prediction can remain inside the control loop. RealtimeWAM pipelines shared-KV dependence and distills action denoising to one step without separating its video and action experts. H-JEPA uses hierarchical latent futures to carry long-range planning across timescales. FAVOR keeps generated futures active after action decoding as verification and recovery anchors. Execution asynchrony and shared-encoder attacks also expose a cost of coupling: action semantics assumed by the model must match actual execution, and visual vulnerabilities can contaminate prediction and control together. The category-bounded arXiv pool supplied all three core papers. The Hugging Face Daily Papers API was reachable but had not yet indexed these October 5 submissions at collection time. The latest Awesome-WAM README and its Joint/Diffusion taxonomy were reviewed; it contains no 2610.* entries yet and therefore served as taxonomy reference only.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-06',
        en: '/en/daily/world-action-model/2026-10-06',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-10-06" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
