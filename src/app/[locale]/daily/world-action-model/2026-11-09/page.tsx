import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '视触觉联合扩散与世界模型引导的动作选择',
    description: 'World Action Model 论文日报：控制相关表征、接触操作与潜空间闭环规划',
    overview: [
      '周一覆盖上海时间 11 月 6 日至 9 日；本期三篇论文均于 11 月 6 日发布，并非 11 月 9 日首发。',
      'MDF++ 用跨模态选择性梯度训练联合扩散 WAM，让未来感知表征服务接触操作。',
      'FATHOM 用动作条件化潜动态筛选扩散轨迹，在真实水下机器人上闭环跟踪。',
      '来源：arXiv API 两组跨 cs.RO/cs.AI/cs.CV/cs.LG 查询；HF Daily Papers API 50 条；Awesome-WAM 最新 README。HF 未提供额外的窗口内合格新论文；清单已有 NEW 标记不作为本次新增。',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion / Unified Stream / Explicit Future Latents',
        title: 'MDF++: Visuo-Tactile World Action Model with End-to-end Representation Learning',
        keyPoints: [
          '将视觉、触觉、力、本体感知和动作 token 放入同一个 diffusion transformer，以时间-模态独立噪声表达策略、世界-动作联合预测、前向动态、逆动态及随机掩码五类查询。',
          '每个观测编码器只接收其他模态及动作流的去噪损失梯度，阻断自身流损失，缓解编码器与扩散骨干共同适应造成的表征坍塌。',
          '五个仿真任务平均成功率为 86.9%，朴素联合训练为 64.1%，冻结 ViT 为 58.7%；另有真实螺栓旋拧与螺母配合实验。',
        ],
        description: '发表于 2026-11-06；来源：arXiv API，已核验 v1 正文第 4 节和实验表 1。这里的 explicit future 指显式生成未来感知 latent，而非像素视频。对 WAM 更关键的贡献是将控制目标反向用于塑造感知空间：视觉表征必须有助于预测触觉、力与动作，而不只是便于重建自身。复现应同时控制结构化查询与梯度路由；文中额外 MDF 基线采用不同轨迹末端填充及按任务取最大结果，不能把其比较解释为严格单变量消融，也不能把全部增益归因于世界预测。',
        href: 'https://arxiv.org/abs/2611.09293v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM / Latent Planning / Diffusion Action Proposals',
        title: 'FATHOM: World-Model-Guided Diffusion Action-Trajectory Selection for Sparse-Marker AUV Tracking',
        keyPoints: [
          '任务监督的多模态 RSSM 融合稀疏光标记、惯性测量和动作历史，形成支持动作条件化预测的跟踪 belief。',
          '扩散动作先验生成多条推进器轨迹，潜动态预测各候选的未来跟踪结果，再按显式滚动时域目标选择并闭环更新，而非直接执行首个生成样本。',
          '正文报告实时生成采用 10 步 DDIM，并在真实 AUV 上验证部分标记可见时的自主跟踪；运行不依赖运动捕捉反馈。',
        ],
        description: '发表于 2026-11-06；来源：arXiv API 两组查询，按 arXiv ID 合并去重，已核验 v1 正文。它属于潜空间规划式级联 WAM，不应因为使用 diffusion action prior 就标成联合视频-动作扩散。世界-动作耦合落实在候选评估和执行选择上：控制相关 belief 必须预测候选动作后果。对于部分可观测 embodied control，这比仅展示逼真未来更直接；迁移到操作任务时仍需重新验证潜动态的长时误差、候选预算和接触分布偏移。',
        href: 'https://arxiv.org/abs/2611.08898v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Toward the Era of Agentic Embodied Intelligence',
        tag: 'Cascaded WAM / Latent Planning / Future-Feature-Conditioned Flow Policy',
        href: 'https://arxiv.org/abs/2611.09124v1',
        description: '发表于 2026-11-06；来源：arXiv API，已核验 v1 第 3.2-3.4 节。A2-WLA 从多视角转换学习共享 latent，预测未来视觉特征；18 层 flow-matching 动作专家交替交叉注意当前与未来上下文，未来预测器也参与联合策略训练。完整 A2-MEAS 另加诊断和纠错，在 100 个 BEHAVIOR 2026 任务上报告 0.6411 Q-score 与 45.40% 完整任务成功率。系统结果不能归因于世界模型单一模块，跨年度榜单对比也并非同条件实验；模型与代码为计划逐步发布，不视为已验证可复现。',
      },
    ],
    observation: '本期更值得比较的是两种让预测真正参与控制的方式：MDF++ 在训练阶段用跨模态与动作预测塑造共享表征，FATHOM 在推理阶段用潜动态对动作候选排序。A2-WLA 则把预测的未来特征直接送入动作专家。三者都超过了纯视频生成或纯动作扩散的边界，但并不属于同一种联合生成架构。实验评估应拆开表征质量、预测精度与最终闭环收益；接触和遮挡场景尤其需要测试预测错误如何影响执行，而不是只看生成质量。Awesome-WAM 已读取 taxonomy 与 Diffusion-based Generation 章节，其 Flash-WAM、HiMem-WAM 的 NEW 标签对应六月论文且本站历史已收录，不重复包装为今日新增。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Visuo-Tactile Joint Diffusion and World-Model-Guided Action Selection',
    description: 'World Action Model digest: control-relevant representations, contact-rich manipulation, and closed-loop latent planning',
    overview: [
      'Monday coverage spans November 6-9 in Shanghai time. All three papers were published on November 6, not first released on November 9.',
      'MDF++ trains a joint diffusion WAM with selective cross-modal gradients to make predictive sensory representations useful for contact-rich control.',
      'FATHOM ranks diffusion action proposals with action-conditioned latent dynamics for closed-loop real-AUV tracking.',
      'Sources: two arXiv API queries across cs.RO/cs.AI/cs.CV/cs.LG; 50 HF Daily Papers API entries; the latest Awesome-WAM README. HF added no eligible in-window papers; existing NEW labels in the reference list are not treated as new additions in this run.',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion / Unified Stream / Explicit Future Latents',
        title: 'MDF++: Visuo-Tactile World Action Model with End-to-end Representation Learning',
        keyPoints: [
          'Processes vision, touch, force, proprioception, and action tokens in one diffusion transformer, with independent time-modality noise supporting policy, joint world-action, forward-dynamics, inverse-dynamics, and random-masking queries.',
          'Updates each observation encoder only through denoising losses from other sensory and action streams, blocking its own stream loss to mitigate encoder-backbone representation collapse.',
          'Reports 86.9% mean success on five simulated tasks versus 64.1% for naive joint training and 58.7% for frozen ViT features, plus physical bolt-screwing and nut-mating experiments.',
        ],
        description: 'Published 2026-11-06; source: arXiv API, checked against v1 Section 4 and Table 1. Explicit future generation here means future sensory latents, not pixel video. The key WAM contribution is allowing control objectives to shape perception: visual features must help predict touch, force, and actions rather than merely reconstruct themselves. Reproduction should control both structured queries and gradient routing. Additional MDF baselines use different trajectory-end padding and per-task maxima, so those comparisons are not clean single-variable ablations, and all improvements cannot be attributed to world prediction alone.',
        href: 'https://arxiv.org/abs/2611.09293v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM / Latent Planning / Diffusion Action Proposals',
        title: 'FATHOM: World-Model-Guided Diffusion Action-Trajectory Selection for Sparse-Marker AUV Tracking',
        keyPoints: [
          'A task-supervised multimodal RSSM combines sparse light markers, inertial measurements, and action history into a tracking belief supporting action-conditioned prediction.',
          'A diffusion action prior proposes multiple thruster trajectories; latent dynamics predict their tracking consequences, and an explicit receding-horizon objective selects a candidate before the next closed-loop update.',
          'The paper uses 10-step DDIM for online generation and validates autonomous tracking on real AUVs with partial marker visibility, without motion-capture feedback during operation.',
        ],
        description: 'Published 2026-11-06; source: both arXiv API queries, merged by arXiv ID, with v1 full-text verification. This is cascaded latent planning, not joint video-action diffusion merely because its proposal model is a diffusion policy. World-action coupling occurs in candidate evaluation and execution selection: the control-relevant belief must predict candidate consequences. That is a direct route to partially observed embodied control, but transfer to manipulation still requires testing long-horizon model error, proposal budgets, and contact-related distribution shifts.',
        href: 'https://arxiv.org/abs/2611.08898v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Toward the Era of Agentic Embodied Intelligence',
        tag: 'Cascaded WAM / Latent Planning / Future-Feature-Conditioned Flow Policy',
        href: 'https://arxiv.org/abs/2611.09124v1',
        description: 'Published 2026-11-06; source: arXiv API, verified against v1 Sections 3.2-3.4. A2-WLA learns a shared transition latent from multiple views and predicts future visual features. Its 18-layer flow-matching action expert alternates cross-attention to current and future contexts, with the future predictor updated during joint policy training. The full A2-MEAS system adds diagnosis and correction, reporting 0.6411 Q-score and 45.40% complete-task success on 100 BEHAVIOR 2026 tasks. These system results cannot be attributed to the world model alone, and cross-year leaderboard comparisons are not matched experiments. Models and code are planned for progressive release, not verified here as reproducible artifacts.',
      },
    ],
    observation: 'The useful comparison is between two ways of making prediction matter for control: MDF++ shapes shared representations through cross-modal and action prediction during training, whereas FATHOM uses latent dynamics to rank action candidates at inference. A2-WLA feeds predicted future features directly into its action expert. All exceed pure video generation or pure action diffusion, but they are not the same joint-generation architecture. Evaluation should separate representation quality, prediction accuracy, and closed-loop benefit; contact and occlusion especially require testing how incorrect predictions affect execution rather than judging visual quality alone. The Awesome-WAM taxonomy and Diffusion-based Generation section were reviewed. Its existing NEW labels for Flash-WAM and HiMem-WAM refer to June papers already covered in this site history, not new papers for today.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/world-action-model/2026-11-09',
        en: '/en/daily/world-action-model/2026-11-09',
      },
    },
  }
}

export default async function Page({ params }: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-11-09" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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