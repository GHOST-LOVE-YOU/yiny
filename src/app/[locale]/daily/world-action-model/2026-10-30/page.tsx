import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '未来效用校正与评论家引导的潜空间经验生成',
    description: 'World Action Model 论文日报：未来效用校正与评论家引导的潜空间经验生成',
    overview: [
      'Utility-WAM 量化视觉未来对动作的真实增益与负迁移，并按查询选择是否生成未来',
      'CGSE 用评论家在冻结潜世界模型内细化动作，离线生成可用于策略改进的局部经验',
      '今日严格筛选后仅一篇达到强 WAM 相关门槛；纯未来生成或纯感知世界模型未被强行收录',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Hidden-State Coupling',
        title: 'Utility-WAM: Correcting Future-Induced Action Changes',
        keyPoints: [
          '以同一 WAM 的未来条件路径与无未来路径之动作差 Δa 为分析对象：平均成功率变化很小，但视觉未来使推理延迟增加 1.7–1.9 倍',
          '发现未来对长时任务有益，却会在精密操作上造成集中式负迁移；冻结共享 WAM 后，以残差适配器按真实动态引导修正速度差',
          '预生成门控在 RoboTwin 75.5% 的查询上跳过视频生成，延迟降低 38%；RoboTwin 2.0 与 LIBERO 平均成功率分别达 93.3% 和 98.9%',
          '三项真实双臂任务 60 次试验成功 53 次，FAST-WAM 为 43 次，说明效用校正可迁移到物理闭环',
        ],
        description: '这项工作直接回答了部署 WAM 时最关键的问题：预测未来何时真正改变并改善动作。它没有把“生成得出未来”等同于“控制更好”，而是把未来诱导的动作增量作为可诊断、可修复的接口；残差适配器保留长时 foresight，门控则在未来无益时省去视频扩散。按 taxonomy，它属于动作与未来流紧密耦合、通过隐状态影响控制的多流扩散 WAM，并给出了精度—延迟—负迁移三者的闭环证据。',
        href: 'https://arxiv.org/abs/2610.39367v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Generating Critic-Guided Synthetic Experience in Latent World Models',
        tag: 'Cascaded WAM · Implicit Planning via Latent Representations',
        href: 'https://arxiv.org/abs/2610.39100v1',
        description: '从离线策略采样候选动作，以 Q 函数一阶近似在信赖域内细化，再让冻结潜世界模型预测下一状态并由评论家选择合成转移；三项 OGBench manipulation 任务平均成功率相对提升 7.1%。它具备动作条件世界预测到策略改进的直接闭环，但没有联合生成世界与动作，因此列入延伸阅读。',
      },
    ],
    observation: '今日最重要的信号不是更大的生成模型，而是对“未来是否值得生成”的可操作判断。Utility-WAM 表明平均指标会掩盖精密任务上的严重负迁移，未来想象应当成为按状态调用、可被残差修正的控制资源。CGSE 从训练侧给出互补路径：世界模型不必承担长 rollout，只需作为局部动作后果生成器，并由任务评论家约束其使用范围。WorldFlow 与 GenSight 虽在联合视频—三维运动和统一生成—感知上推进了 embodied world modeling，但未把预测与可执行动作或策略实质耦合，故未纳入 WAM 主榜。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Future-Utility Correction and Critic-Guided Latent Experience Generation',
    description: 'World Action Model daily digest on future-utility correction and critic-guided latent experience generation',
    overview: [
      'Utility-WAM measures both the real benefit and negative transfer of visual futures, then decides per query whether imagination is worth its cost',
      'CGSE refines actions with a critic inside a frozen latent world model to generate local offline experience for policy improvement',
      'Only one paper clears the strong WAM relevance bar today; future-only generation and perception-only world models are not padded into the list',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Hidden-State Coupling',
        title: 'Utility-WAM: Correcting Future-Induced Action Changes',
        keyPoints: [
          'Studies the action delta Δa between future-conditioned and future-free paths of the same WAM: average success changes little while visual-future generation adds 1.7–1.9x latency',
          'Finds benefits on long-horizon tasks but concentrated negative transfer on precision tasks, then repairs velocity deltas with a residual adapter under a frozen shared WAM and ground-truth dynamics guidance',
          'A pre-generation gate skips video on 75.5% of RoboTwin queries, cuts latency by 38%, and reaches 93.3% average success on RoboTwin 2.0 and 98.9% on LIBERO',
          'Across three physical bimanual tasks it succeeds in 53 of 60 trials versus 43 for FAST-WAM, demonstrating transfer to real closed-loop control',
        ],
        description: 'This paper addresses the central deployment question for WAMs: when does a predicted future actually change and improve control? Rather than equating successful imagination with better action, it turns the future-induced action delta into a diagnosable and repairable interface. The residual adapter preserves long-horizon foresight, while the gate avoids video diffusion when it has low utility. Taxonomically, it is a multi-stream diffusion WAM whose future stream influences control through hidden representations, backed by closed-loop evidence on accuracy, latency, and negative transfer.',
        href: 'https://arxiv.org/abs/2610.39367v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Generating Critic-Guided Synthetic Experience in Latent World Models',
        tag: 'Cascaded WAM · Implicit Planning via Latent Representations',
        href: 'https://arxiv.org/abs/2610.39100v1',
        description: 'Samples candidate actions from an offline policy, refines them within a trust region using a first-order Q approximation, predicts next states with a frozen latent world model, and lets the critic select synthetic transitions. It reports a 7.1% relative average success gain on three OGBench manipulation tasks. The action-conditioned world prediction directly improves a policy, but world and action generation are not jointly modeled, so it remains Worth Reading.',
      },
    ],
    observation: 'The strongest signal today is not a larger generator but an operational test of whether a future is worth generating. Utility-WAM shows that averages can hide severe negative transfer on precision tasks, making imagination a state-dependent control resource that should be gated and repairable. CGSE provides a complementary training-side view: a world model need not support long rollouts if it serves as a local action-consequence generator constrained by a task critic. WorldFlow and GenSight advance embodied world modeling through joint video–3D motion and unified generation–perception, respectively, but neither materially couples prediction to executable actions or policy learning, so they are excluded from the WAM lists.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-30',
        en: '/en/daily/world-action-model/2026-10-30',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-10-30" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
