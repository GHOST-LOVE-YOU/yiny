import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '共享扩散动作流、可选择未来与任务相关动态监督',
    description: 'World Action Model 论文日报：共享扩散动作流、未来选择与任务相关动态监督',
    overview: [
      'TAPESTRY 将动作编码为视频 patch，在同一扩散骨干中统一视频与动作学习',
      'ThinkWorld 用观测未来奖励动作动态链，把无动作标注视频转化为策略监督',
      'Best-of-N 研究给出 WAM 候选动作可选择余量的严格测量与闭环验证',
      'Trace-WAM 与 MoGAP 将视觉监督集中到三维运动和动态区域',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Unified Stream · Explicit Future Generation',
        title: 'TAPESTRY: A Single Backbone for Video Generation and Robot Control',
        keyPoints: [
          '把每个动作时刻映射为视频 VAE 潜空间中的单 patch token，与视频 token 共用 patchify 层和扩散 Transformer',
          '以视频扩散、联合视频—动作扩散和动作条件扩散三种目标训练；联合目标共享扩散时间步并使用非对称注意力掩码',
          '部署时不生成视频，以单步 DDIM 直接生成动作 token；论文报告消费级硬件每个动作块 84 ms，并含仿真与真实机器人实验',
        ],
        description: '这是今日最直接的统一扩散 WAM：动作不是外挂 head，而是被提升为与视频 patch 同构的生成对象，视频和动作因此真正共享骨干与表示空间。它同时保留视频预训练的动力学先验，并把测试时路径裁剪为单步动作去噪，为“训练时显式未来、部署时快速控制”提供了清晰实现。',
        href: 'https://arxiv.org/abs/2610.36823v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Unified Discrete',
        title: 'ThinkWorld: World Imagination Reinforces Chain-of-Dynamics Reasoning',
        keyPoints: [
          '用离散 Chain-of-Dynamics（CoD）运动 token 表示从当前世界到未来状态的中间动态，并统一人类与机器人动作推理接口',
          '根据 CoD 预测冻结 DINO 空间中的未来表示，以预测未来与观测未来的一致性作为强化学习奖励',
          '未来预测仅用于训练，使无动作标注人类视频也能监督动作推理；仿真和真实机器人实验验证跨具身迁移与未见任务泛化',
        ],
        description: 'ThinkWorld 的关键不是在线生成未来，而是让世界变化反向筛选动作思路。它先用有标签动作把离散动态链锚定到可执行运动，再利用任何视频都具有的未来结果扩展监督，因此在动作标注稀缺时建立了预测世界与策略学习的实质耦合。',
        href: 'https://arxiv.org/abs/2610.37666v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Implicit Planning via Latent Representations',
        title: 'How Much Can Best-of-N Help a World Action Model? Measuring Selectable Headroom and Realizing It in Closed Loop',
        keyPoints: [
          '提出可复现分支、重复续跑、留出 oracle 与共同随机数构成的去噪反事实协议，区分候选质量与后续环境随机性',
          '在四个 WAM、两个基准和超过十万次分支 rollout 上发现，单次执行估计会显著夸大原生样本的可选择余量',
          '结构化动作扰动可创造最高 16 个百分点余量；失败门控选择器将已见任务成功率从 76.9% 提至 81.6%，未见任务从 62.6% 提至 69.8%',
        ],
        description: '该工作把“想象多个未来再选动作”从直觉变成可测量的闭环决策问题。尤其重要的是，它证明动作条件未来确实携带候选结果信息，但现有 value head 未必利用这些信息；只有先量化可选择余量，再设计失败门控，才能避免昂贵而无效的 Best-of-N。',
        href: 'https://arxiv.org/abs/2610.37196v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'Trace-WAM: Learning to Act via 3D Motion Prediction for World Action Models',
        keyPoints: [
          '在视频—动作学习之外加入未来三维运动预测，监督时序点对应、图像平面位移和深度变化',
          'Tri-MoT 以三个 Transformer 分支联合学习视频、运动与动作，使任务相关交互动态直接塑造动作表示',
          '动作分支不读取预测轨迹，部署仍是单次视觉前向加动作去噪；在 RoboCasa-GR1、LIBERO 与 LIBERO-Plus 上验证',
        ],
        description: 'Trace-WAM 指出全帧重建把大量容量浪费在背景和外观上，三维运动才更接近控制所需的充分统计量。它保留联合视频—动作训练，同时用几何动态作为辅助流，特别适合少样本与分布偏移下提升 WAM 的任务相关性。',
        href: 'https://arxiv.org/abs/2610.36840v1',
      },
      {
        num: 5,
        tag: 'Joint WAM - Diffusion · Unified Stream · Implicit Future Prediction',
        title: 'Adapting Video Models for Robot Control via Motion-guided Asymmetric Prediction',
        keyPoints: [
          '分析 WAM 的空间视觉监督分配，发现聚焦动态区域比均匀重建更有利于策略学习',
          'MoGAP 对动态区域施加更强噪声、以较干净静态区域为上下文进行重建，并与标准视频—动作预测共同训练',
          '辅助路径只在训练时启用且无需外部教师；Fast-WAM（Wan2.2-5B）在 GR-1 tabletop 上由 38.8% 提升至 47.5%',
        ],
        description: 'MoGAP 不改 WAM 的基本生成接口，而是重新分配未来预测损失的注意力预算。动态区域包含机器人、物体和接触变化，非对称加噪迫使共享视频扩散骨干学习这些控制相关因素，是低侵入式提升现有扩散 WAM 的实用途径。',
        href: 'https://arxiv.org/abs/2610.36624v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Vision-Language-Action or World-Action? Just Action Models', tag: 'Joint WAM - Diffusion · Implicit Future Prediction', href: 'https://arxiv.org/abs/2610.37219v1', description: '解耦骨干初始化、未来监督和推理时未来模块，以可丢弃预测头证明 foresight loss 本身可改善控制，并报告相对 FastWAM 更低训练 FLOPs。' },
      { num: 2, title: 'PDRVLA: A Vision-Language-Action Model with Physical Dynamics Representations', tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation', href: 'https://arxiv.org/abs/2610.37381v1', description: '以未来 RGB、深度和光流特征及冻结视频世界模型监督紧凑 physical tokens，部署时无需在线视频生成；四个仿真基准均给出强结果。' },
      { num: 3, title: 'GAWM: A Compact Latent World-Action Model for Multi-Task Robot Manipulation', tag: 'Joint WAM - Autoregressive · Predictive Latent', href: 'https://arxiv.org/abs/2610.37091v1', description: '不足 1 亿参数、无机器人或视频预训练，通过双时域 DINOv3 潜未来和动作解码器构建紧凑 WAM，在低数据或短训练条件下尤其有效。' },
      { num: 4, title: 'World Dreamer v5-lite: A Multi-Robot World Action Model with One Dreamer', tag: 'Joint WAM · Multi-Stream · Shared Representation', href: 'https://arxiv.org/abs/2610.37518v1', description: '将多相机特征投影到固定大小共享工作空间状态，并为各机器人保留独立动作流；在 RoboFactory 与四项真实机器人任务上报告明显优势。' },
    ],
    observation: '今日最清晰的趋势，是 WAM 正从“是否生成未来”转向“未来监督如何进入动作表示”。TAPESTRY选择视频与动作同构 token；ThinkWorld用未来一致性强化离散动作推理；Trace-WAM、MoGAP和PDRVLA则压缩或重加权未来监督，使其集中于几何、运动和物理动态。与此同时，Best-of-N 工作提醒我们：可生成未来不等于未来能改进控制，候选多样性、选择器校准和闭环可选择余量必须被独立测量。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Shared Diffusion Action Streams, Selectable Futures, and Task-Relevant Dynamics',
    description: 'World Action Model daily digest on shared diffusion action streams, future selection, and task-relevant dynamics supervision',
    overview: [
      'TAPESTRY tokenizes actions as video patches and learns both modalities in one diffusion backbone',
      'ThinkWorld rewards action-dynamics chains with observed futures, turning action-free video into policy supervision',
      'A Best-of-N study rigorously measures selectable WAM headroom and validates it in closed loop',
      'Trace-WAM and MoGAP focus visual supervision on 3D motion and dynamic regions',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Unified Stream · Explicit Future Generation',
        title: 'TAPESTRY: A Single Backbone for Video Generation and Robot Control',
        keyPoints: [
          'Maps every action timestep to a single patch token in the video VAE latent space, sharing patchification and the diffusion Transformer with video tokens',
          'Trains video diffusion, joint video-action diffusion, and action-conditioned diffusion objectives; the joint objective uses coupled timesteps and an asymmetric attention mask',
          'Skips video generation at deployment and produces action tokens with one DDIM step; the paper reports 84 ms per action chunk on consumer hardware plus simulation and real-robot tests',
        ],
        description: 'This is the most direct unified diffusion WAM today: actions are not an auxiliary head but generative objects isomorphic to video patches. The design retains dynamics priors from video pretraining while reducing deployment to one-step action denoising, offering a concrete route from explicit future training to fast control.',
        href: 'https://arxiv.org/abs/2610.36823v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Unified Discrete',
        title: 'ThinkWorld: World Imagination Reinforces Chain-of-Dynamics Reasoning',
        keyPoints: [
          'Represents intermediate dynamics from the current world to a future state as discrete Chain-of-Dynamics motion tokens shared across human and robot reasoning',
          'Predicts a future representation in frozen DINO space from each CoD and uses agreement with the observed future as an RL reward',
          'Uses future prediction only during training so action-unlabeled human videos can supervise reasoning; simulation and real-robot studies test cross-embodiment transfer and unseen-task generalization',
        ],
        description: 'ThinkWorld uses world change to select better action thoughts rather than generating futures online. Action-labeled data first grounds discrete dynamics chains in executable motion, then the future available in any video expands supervision. This creates a substantive coupling between predictive modeling and policy learning under scarce action labels.',
        href: 'https://arxiv.org/abs/2610.37666v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Implicit Planning via Latent Representations',
        title: 'How Much Can Best-of-N Help a World Action Model? Measuring Selectable Headroom and Realizing It in Closed Loop',
        keyPoints: [
          'Introduces a denoised counterfactual protocol with reproducible branching, repeated continuations, held-out oracles, and common random numbers',
          'Across four WAMs, two benchmarks, and over 100,000 branched rollouts, single-execution estimates substantially overstate selectable headroom of native samples',
          'Structured action perturbations create up to 16 points of headroom; a fail-gated selector raises success from 76.9% to 81.6% on seen tasks and 62.6% to 69.8% on unseen tasks',
        ],
        description: 'This work turns “imagine several futures and choose” into a measurable closed-loop decision problem. Action-conditioned futures contain candidate-outcome information, but existing value heads may not exploit it. Measuring headroom before designing a fail-gated selector avoids expensive Best-of-N sampling with no realizable benefit.',
        href: 'https://arxiv.org/abs/2610.37196v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'Trace-WAM: Learning to Act via 3D Motion Prediction for World Action Models',
        keyPoints: [
          'Adds future 3D motion prediction to video-action learning, supervising temporal point correspondence, image displacement, and depth change',
          'Uses a three-branch Mixture-of-Transformer to learn video, motion, and action jointly so interaction dynamics shape action representations',
          'The action expert does not consume predicted trajectories, retaining one visual forward pass plus action denoising at deployment; tests cover RoboCasa-GR1, LIBERO, and LIBERO-Plus',
        ],
        description: 'Trace-WAM argues that full-frame reconstruction spends capacity on background and appearance while 3D motion is closer to a sufficient statistic for control. Its geometry stream preserves joint video-action learning but targets interaction dynamics, with particular value under limited demonstrations and distribution shifts.',
        href: 'https://arxiv.org/abs/2610.36840v1',
      },
      {
        num: 5,
        tag: 'Joint WAM - Diffusion · Unified Stream · Implicit Future Prediction',
        title: 'Adapting Video Models for Robot Control via Motion-guided Asymmetric Prediction',
        keyPoints: [
          'Studies spatial allocation of visual supervision in WAMs and finds that emphasizing dynamic regions improves policies over uniform reconstruction',
          'MoGAP applies stronger noise to dynamic regions and reconstructs them from cleaner static context alongside standard video-action prediction',
          'The auxiliary path is training-only and teacher-free; Fast-WAM with Wan2.2-5B improves from 38.8% to 47.5% on GR-1 tabletop',
        ],
        description: 'MoGAP preserves the WAM interface while reallocating future-prediction capacity. Dynamic regions capture robots, objects, and contacts; asymmetric corruption forces the shared video diffusion backbone to learn these control-relevant factors, making it a low-intrusion upgrade for existing diffusion WAMs.',
        href: 'https://arxiv.org/abs/2610.36624v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Vision-Language-Action or World-Action? Just Action Models', tag: 'Joint WAM - Diffusion · Implicit Future Prediction', href: 'https://arxiv.org/abs/2610.37219v1', description: 'Decouples backbone initialization, future supervision, and inference-time machinery; a disposable prediction head shows that foresight loss itself improves control with lower reported training FLOPs than FastWAM.' },
      { num: 2, title: 'PDRVLA: A Vision-Language-Action Model with Physical Dynamics Representations', tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation', href: 'https://arxiv.org/abs/2610.37381v1', description: 'Supervises compact physical tokens with future RGB, depth, flow features and a frozen video world model, then deploys without online video generation; results are reported on four simulation benchmarks.' },
      { num: 3, title: 'GAWM: A Compact Latent World-Action Model for Multi-Task Robot Manipulation', tag: 'Joint WAM - Autoregressive · Predictive Latent', href: 'https://arxiv.org/abs/2610.37091v1', description: 'Builds a sub-100M-parameter WAM without robot or video pretraining using two-horizon DINOv3 latent futures and an action decoder, with strong data- and training-limited results.' },
      { num: 4, title: 'World Dreamer v5-lite: A Multi-Robot World Action Model with One Dreamer', tag: 'Joint WAM · Multi-Stream · Shared Representation', href: 'https://arxiv.org/abs/2610.37518v1', description: 'Projects multi-camera features into a fixed-size shared workspace state while retaining robot-specific action streams, reporting sizable gains on RoboFactory and four real-robot tasks.' },
    ],
    observation: 'The clearest trend today is a shift from whether a WAM generates futures to how future supervision enters action representations. TAPESTRY uses isomorphic video and action tokens; ThinkWorld reinforces discrete action reasoning with future agreement; Trace-WAM, MoGAP, and PDRVLA compress or reweight supervision toward geometry, motion, and physical dynamics. The Best-of-N study adds an important warning: generating futures does not guarantee better control—candidate diversity, selector calibration, and closed-loop selectable headroom must be measured separately.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-29',
        en: '/en/daily/world-action-model/2026-10-29',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-10-29" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
