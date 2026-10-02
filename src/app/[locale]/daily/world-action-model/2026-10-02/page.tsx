import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '统一语义、视觉未来与动作：可控扩散 WAM 的闭环进展',
    description: 'World Action Model 研究论文日报',
    overview: [
      'UniWAM 将物理推理、视觉世界生成与动作预测统一训练，并以人类—机器人混合数据扩展',
      'CtrlWAM 用仿真器生成与扰动动作匹配的反事实视觉后果，修复联合去噪中的意图—未来错配',
      'ActiveWAM 把相机与机械臂动作共同纳入策略，以未来视频辅助监督主动视觉操作',
      'Completion Aware Guidance 以免训练采样引导缓解短动作块导致的任务未完成想象',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM · Diffusion · Multi-stream / Shared Representation',
        title: 'UniWAM: Unified World-Action Model',
        keyPoints: [
          '在统一架构中联合物理推理器、视觉世界生成器与动作预测器，同时学习语义理解、未来视觉生成和机器人动作',
          '将低层动作表达为自然语言，并让 VQA、人类第一视角视频和机器人示范分别监督合适的组件，以保留语言能力并注入具身动力学',
          '后训练使用未来视觉噪声增强降低策略对精确未来像素的依赖，并以动作历史初始化 flow-matching 动作生成，从而减少去噪步数',
          '在分布内、鲁棒性、泛化、指令跟随和长时任务上报告 SOTA，并观察到人类—机器人联合预训练的对数线性扩展规律',
        ],
        description: 'UniWAM 是今天最完整的统一 WAM：视觉未来不是独立的视频预测附件，而与物理推理和动作流匹配共享训练目标。其关键价值在于把 VLA 的语义能力与视频生成器的时空先验放入同一系统，同时通过视觉噪声增强避免控制过度依赖像素级预测。按 taxonomy，它属于 Joint WAM 的 diffusion multi-stream/shared-representation 路线；动作历史参与生成初始化，使世界—动作耦合贯穿预训练与后训练。',
        href: 'https://arxiv.org/abs/2610.02054v1',
      },
      {
        num: 2,
        tag: 'Joint WAM · Diffusion · Unified Stream / Explicit Future',
        title: 'CtrlWAM: Controllable World Action Models with Aligned Intent and Foresight',
        keyPoints: [
          '指出同时给真实动作和真实视频加噪会产生训练错配：扰动动作对应反事实后果，但低噪视觉仍泄露原始轨迹',
          '在仿真器中实际执行扰动动作，并将其与对应的带噪视觉后果配对，使联合去噪学习到一致的 intent 与 foresight',
          '设计扭曲的视频—动作噪声日程，适配两种模态不同的去噪难度，并让视觉布局随动作预测变化保持响应',
          '把动作接口扩展到可变数量的 agent streams；驾驶实验改善动作预测、视频—动作一致性和指令跟随，机器人实验提升运动保真与可控性',
        ],
        description: 'CtrlWAM 直击统一扩散 WAM 的因果监督缺口：若动作被扰动而未来视频仍来自原记录，模型会学到互相矛盾的条件。通过真实渲染 off-path 后果，它让动作意图与生成未来在数据层面对齐，而不仅靠损失函数补救。这是 Joint Diffusion WAM 中 unified-stream、explicit future generation 的强代表，也把单机器人控制推广到多主体预测与命令。',
        href: 'https://arxiv.org/abs/2610.00859v1',
      },
      {
        num: 3,
        tag: 'Joint WAM · Diffusion · Multi-stream / Cross-attention',
        title: 'ActiveWAM: Evidence-Aware Active Vision for World-Action Models',
        keyPoints: [
          '将主动视觉形式化为 retain–acquire 决策，在统一 WAM 中共同学习相机 pan/tilt 与双臂操作动作',
          '训练期 inversion 用任务相关源证据与可见时间变化约束冻结的视频先验，无需测试期 inversion 或候选排序',
          '部署时从 view-aware 历史生成机械臂和相机动作，并以新测量的 RGB 更新上下文；未来视频只作联合训练信号，无需在线解码',
          '提出含 50 个任务的 RoboTwin-AV；相对 Fast-WAM 提升 20.0 个点，并在真实厨房任务上提升 26.7 个点',
        ],
        description: 'ActiveWAM 把“看哪里”提升为 world–action coupling 的组成部分：相机动作会改变后续证据，机械臂动作则改变物理世界，两者必须在共同历史中决策。未来视频用于塑造动作表示但不在部署时解码，兼顾预测监督与控制效率。按 taxonomy，它更接近 Joint Diffusion 的 multi-stream/cross-attention 路线，并以真实机器人结果证明主动感知并非外围模块。',
        href: 'https://arxiv.org/abs/2610.01698v1',
      },
      {
        num: 4,
        tag: 'Joint WAM · Diffusion · Completion-guided Sampling',
        title: 'Completion Aware Guidance for World Action Models',
        keyPoints: [
          '识别 task-incomplete imagination：生成未来看似合理且动作一致，却遗漏真正完成任务所需的关键转移',
          '将问题定位到短动作块控制的局部偏好，而非世界模型主干的固有缺陷',
          '提出无需训练的 Completion Aware Guidance，在采样阶段把联合视觉—动作生成引向任务完成',
          '在 RoboTwin 2.0 子集将成功率从 64% 提至 70%，零样本仿真从 69% 提至 75%，未完成想象比例从 79% 降至 40%',
        ],
        description: 'CAG 不改造 WAM 架构，而是在联合采样时加入完成度导向，解决局部可信与全局成功之间的落差。它尤其适合 diffusion WAM：保持已有视频—动作生成器不变，只调整推理轨迹即可获得长程收益。结果也提示，评估 WAM 不能只看视觉合理性或动作一致性，还必须检查想象是否跨过任务完成所需的关键状态转移。',
        href: 'https://arxiv.org/abs/2610.01559v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'FutureWorlds: Learning Robotic World Models from Alternative Futures',
        tag: 'Joint WAM 邻近 · Autoregressive / Alternative Futures',
        href: 'https://arxiv.org/abs/2610.01019v1',
        description: '以多模态离散自回归模型、diverse beam search 和候选专属记忆维护多条动作条件未来，再用 MemSPO 将视频轨迹奖励转成组相对优势优化世界模型。它显著改善 RT-1、BridgeV2 和 RoboCasa 的 32 帧预测，并开源代码；但论文重点是优化动作条件世界预测而非联合动作生成，因此列为强邻近工作。',
      },
    ],
    observation: '今天的论文共同把 Joint WAM 从“同时输出视频和动作”推进到更严格的闭环一致性。UniWAM 统一语义推理、世界生成和动作流；CtrlWAM 修复扰动动作与真实未来不匹配的反事实监督错误；ActiveWAM 将获取证据本身纳入动作空间；CAG 则要求联合想象真正跨越任务完成状态。四者分别对应表示、数据、感知和采样层面的耦合。值得注意的是，部署效率开始成为明确设计目标：未来视觉可作为强训练信号，却未必需要在线完整解码。Hugging Face 今日榜单未覆盖这些新 WAM，Awesome-WAM 当前 README 也尚未收录这些 2610 条目，因此本期核心发现来自类别约束的 arXiv 实时检索，而非清单复述。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Unifying Semantics, Visual Futures, and Actions in Controllable Diffusion WAMs',
    description: 'Daily research digest for World Action Models',
    overview: [
      'UniWAM jointly trains physical reasoning, visual world generation, and action prediction while scaling on mixed human-robot data',
      'CtrlWAM renders counterfactual consequences of perturbed actions to repair intent-foresight mismatch in joint denoising',
      'ActiveWAM jointly controls cameras and manipulators, using future video as auxiliary supervision for active-vision manipulation',
      'Completion Aware Guidance reduces task-incomplete imagination caused by short action chunks without retraining',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM · Diffusion · Multi-stream / Shared Representation',
        title: 'UniWAM: Unified World-Action Model',
        keyPoints: [
          'Unifies a physical reasoner, visual world generator, and action predictor to learn semantic understanding, future visual generation, and robot actions together',
          'Expresses low-level actions in natural language and routes supervision from VQA, human-egocentric video, and robot demonstrations to suitable components while preserving language capability',
          'Uses future-visual noise augmentation to reduce dependence on precise predicted pixels and initializes flow-matching action generation with encoded action history, reducing denoising steps',
          'Reports state-of-the-art results across in-distribution performance, robustness, generalization, instruction following, and long-horizon execution, plus log-linear scaling under human-robot co-training',
        ],
        description: 'UniWAM is today’s most complete unified WAM: visual futures are not an independent prediction attachment but share training with physical reasoning and action flow matching. It combines VLA semantics with the spatiotemporal priors of video generation while preventing control from overfitting exact pixels through visual-noise augmentation. In the taxonomy, it is a Joint Diffusion WAM with multi-stream/shared representations; action history enters generation initialization, coupling world and action learning across pre- and post-training.',
        href: 'https://arxiv.org/abs/2610.02054v1',
      },
      {
        num: 2,
        tag: 'Joint WAM · Diffusion · Unified Stream / Explicit Future',
        title: 'CtrlWAM: Controllable World Action Models with Aligned Intent and Foresight',
        keyPoints: [
          'Identifies a training mismatch in jointly noising recorded actions and video: perturbed actions imply counterfactual consequences while low-noise video still reveals the original trajectory',
          'Executes perturbed actions in simulation and pairs them with their corresponding noised visual consequences, aligning intent and foresight during joint denoising',
          'Introduces warped video-action noise schedules for different denoising demands while keeping visual layout responsive as action predictions evolve',
          'Extends control to a variable number of agent streams; driving tests improve action forecasts, video-action agreement, and command following, while robotics tests improve motion fidelity and controllability',
        ],
        description: 'CtrlWAM addresses a causal supervision flaw in unified diffusion WAMs. If actions are perturbed while future video remains tied to the recording, the model receives contradictory conditions. Rendering off-path outcomes aligns action intent and generated futures at the data level rather than relying on a corrective loss alone. It is a strong Joint Diffusion, unified-stream, explicit-future system that also generalizes the interface from ego control to multi-agent prediction and commands.',
        href: 'https://arxiv.org/abs/2610.00859v1',
      },
      {
        num: 3,
        tag: 'Joint WAM · Diffusion · Multi-stream / Cross-attention',
        title: 'ActiveWAM: Evidence-Aware Active Vision for World-Action Models',
        keyPoints: [
          'Formulates active vision as a retain-acquire decision and jointly learns camera pan/tilt and bimanual manipulation actions in one WAM',
          'Uses training-time inversion to constrain a frozen video prior with task-bearing source evidence and visible temporal changes, removing test-time inversion and candidate ranking',
          'Generates manipulator and camera actions from view-aware history and refreshes context with measured RGB; future video is a co-training signal and need not be decoded online',
          'Introduces the 50-task RoboTwin-AV benchmark, improves by 20.0 points over Fast-WAM there, and by 26.7 points on real physical-kitchen tasks',
        ],
        description: 'ActiveWAM makes “where to look” part of world-action coupling. Camera actions alter future evidence while manipulator actions alter the physical world, so both must be selected from shared history. Future video shapes action representations without deployment-time decoding, balancing predictive supervision and control efficiency. Taxonomically it is closest to a Joint Diffusion multi-stream/cross-attention WAM, with real-robot evidence that active sensing is not merely a peripheral module.',
        href: 'https://arxiv.org/abs/2610.01698v1',
      },
      {
        num: 4,
        tag: 'Joint WAM · Diffusion · Completion-guided Sampling',
        title: 'Completion Aware Guidance for World Action Models',
        keyPoints: [
          'Diagnoses task-incomplete imagination, where plausible and action-consistent futures omit the transition required to finish a task',
          'Attributes the failure to the local preference induced by short-chunk control rather than an inherent limitation of the world-model backbone',
          'Introduces training-free Completion Aware Guidance to steer joint visual-action sampling toward task completion',
          'Raises success from 64% to 70% on a RoboTwin 2.0 subset and from 69% to 75% in zero-shot simulation while reducing incomplete imagination from 79% to 40%',
        ],
        description: 'CAG changes no WAM architecture; it adds completion-oriented guidance during joint sampling to bridge local plausibility and global success. This is particularly attractive for diffusion WAMs because it extracts long-horizon gains from an existing video-action generator without retraining. The results also show why WAM evaluation must test whether imagined trajectories cross task-critical completion transitions, not merely whether visuals look plausible and actions appear consistent.',
        href: 'https://arxiv.org/abs/2610.01559v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'FutureWorlds: Learning Robotic World Models from Alternative Futures',
        tag: 'Joint-WAM Adjacent · Autoregressive / Alternative Futures',
        href: 'https://arxiv.org/abs/2610.01019v1',
        description: 'A multimodal discrete autoregressive model combines diverse beam search with candidate-specific memory, then uses MemSPO to convert video-trajectory rewards into group-relative advantages for world-model optimization. It improves 32-frame predictions on RT-1, BridgeV2, and RoboCasa and releases code. Because its primary contribution optimizes action-conditioned future prediction rather than jointly generating robot actions, it remains a strong adjacent work.',
      },
    ],
    observation: 'Today’s papers move Joint WAMs beyond merely emitting video and actions toward stricter closed-loop consistency. UniWAM couples semantics, world generation, and action flow; CtrlWAM repairs counterfactual supervision when perturbed actions disagree with recorded futures; ActiveWAM brings evidence acquisition into the action space; and CAG requires joint imagination to cross task-completion states. These address coupling at the representation, data, sensing, and sampling levels. Deployment efficiency is also becoming explicit: future video can be a powerful training signal without requiring full online decoding. Hugging Face Daily Papers did not include these new WAMs, and the current Awesome-WAM README has not yet added these 2610 entries, so today’s core findings came from category-bounded live arXiv retrieval rather than reproducing a curated list.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-02',
        en: '/en/daily/world-action-model/2026-10-02',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-10-02" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
