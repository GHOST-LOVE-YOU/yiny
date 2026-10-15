import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '递归世界—策略共进化与三维物理未来评测',
    description: 'World Action Model 研究论文日报',
    overview: [
      'RIWANav 让动作条件世界模型与导航策略在闭环中交替改进',
      'DepthWorld 以联合 RGB—深度预测增强机器人未来的三维一致性',
      '物理测量基准揭示视频世界模型距离可靠规划仍有明显差距',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Action-conditioned Imagination / Recursive Policy Learning',
        title: 'RIWANav: Recursive World-Action Models with Self-Improvement for Urban Navigation',
        keyPoints: [
          '提出世界模型与动作模型交替更新的递归自改进循环，而非把预训练世界模型冻结为静态评估器',
          '世界模型预测候选策略动作的视觉后果，并以相对比较反馈驱动 GRPO 策略优化',
          '改进后的策略再按行为新颖性与预测误差筛选专家一致的 action-video 对，形成世界模型的 grounded self-curriculum',
          '实验优于训练基线与既有方法，并报告真实世界导航试验，验证循环可落到物理执行',
        ],
        description: 'RIWANav 满足 WAM 的核心耦合门槛：动作条件世界预测不是旁路辅助损失，而是直接为策略候选提供训练反馈；策略进步后产生的数据又反向修正世界模型。按 taxonomy，它更接近 Cascaded WAM——世界模型显式评估动作后果、策略再由反馈更新——但其贡献在于把单向的“想象后控制”改造成双向共进化。值得继续核验的是每轮想象误差如何被真实数据约束，以及递归循环在更长时域中是否会放大模型偏差。',
        href: 'https://arxiv.org/abs/2610.08640v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'DepthWorld: 3D World Model for Robot Manipulation', tag: 'WAM-adjacent · Action-conditioned RGB-D World Model', href: 'https://arxiv.org/abs/2610.08780v1', description: '在 DROID 上恢复共享机器人运动学与逐场景外参，并以空间 latent tiling 联合预测多视角 RGB 和度量深度；深度监督还使等预算 RGB 预测提升 1.48 dB PSNR。它增强了动作后果的三维可信度，但摘要尚未展示与动作生成或策略选择的直接闭环。' },
      { num: 2, title: 'World Models’ Last Exam in Physics', tag: 'WAM Evaluation · Physical Consistency', href: 'https://arxiv.org/abs/2610.08791v1', description: '用 40 个受控任务和任务特定物理测量评估八个视频世界模型的力学、光学、流体、热学、电磁与表面张力一致性；最佳模型仅得 57.76/100。它不生成机器人动作，因此只作为 WAM 的未来可靠性评测参考。' },
    ],
    observation: '今天真正达到动作—世界闭环门槛的新作只有 RIWANav，不宜用纯 VLA、纯扩散策略或通用视频生成凑数。它把研究重点从“更好的冻结世界模型”推进到世界模型与策略如何互相提供课程和监督；与此同时，DepthWorld 与物理评测共同提示，闭环的上限仍受制于三维几何和物理一致性。后续关键问题是：递归改进是否有显式的不确定性或真实观测校准机制，能在策略分布持续漂移时阻止想象偏差自我强化。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Recursive World–Policy Co-evolution and 3D Physical Future Evaluation',
    description: 'Daily research digest for World Action Models',
    overview: [
      'RIWANav alternates improvement of an action-conditioned world model and navigation policy',
      'DepthWorld strengthens 3D consistency through joint RGB-depth prediction',
      'A measurement-based physics benchmark shows that video world models remain unreliable for planning',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Action-conditioned Imagination / Recursive Policy Learning',
        title: 'RIWANav: Recursive World-Action Models with Self-Improvement for Urban Navigation',
        keyPoints: [
          'Alternates updates to the world model and action model instead of retaining a frozen pretrained evaluator',
          'Predicts visual outcomes of policy actions and turns comparative imagined feedback into GRPO policy updates',
          'Uses the improved policy to select expert-consistent action-video pairs by behavioral novelty and prediction error, grounding the world model’s self-curriculum',
          'Outperforms training baselines and prior methods and reports real-world navigation trials',
        ],
        description: 'RIWANav clears the central WAM coupling threshold: action-conditioned prediction is not an auxiliary objective but directly supplies learning feedback for policy candidates, while the improved policy subsequently changes the data used to refine the world model. In the taxonomy it is closest to a Cascaded WAM—explicit world prediction evaluates consequences before policy optimization—but replaces one-way “imagine then control” with bidirectional co-evolution. The next question is how each cycle anchors imagination error to real evidence and avoids amplifying model bias over longer horizons.',
        href: 'https://arxiv.org/abs/2610.08640v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'DepthWorld: 3D World Model for Robot Manipulation', tag: 'WAM-adjacent · Action-conditioned RGB-D World Model', href: 'https://arxiv.org/abs/2610.08780v1', description: 'Recovers shared robot kinematics and per-scene extrinsics for DROID, then jointly predicts multi-view RGB and metric depth with spatial latent tiling. Depth supervision also improves RGB prediction by 1.48 dB PSNR at equal budget. It strengthens 3D fidelity of action consequences, but the abstract does not demonstrate direct coupling to action generation or policy selection.' },
      { num: 2, title: 'World Models’ Last Exam in Physics', tag: 'WAM Evaluation · Physical Consistency', href: 'https://arxiv.org/abs/2610.08791v1', description: 'Evaluates eight video world models on 40 controlled tasks across mechanics, optics, fluids, thermal phenomena, electromagnetism, and surface tension using task-specific measurements; the best model scores only 57.76/100. It does not generate robot actions, so it is included only as a reference for evaluating the reliability of WAM futures.' },
    ],
    observation: 'Only RIWANav among today’s papers clearly meets the world–action closed-loop threshold; pure VLAs, diffusion policies, and generic video generators were not used to fill the list. Its important shift is from improving a frozen world model to asking how world and policy models can create curricula and supervision for each other. DepthWorld and the physics benchmark meanwhile show that this loop is still bounded by geometric and physical fidelity. The key follow-up is whether recursive improvement includes uncertainty or real-observation calibration strong enough to prevent imagined errors from reinforcing themselves as the policy distribution shifts.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-07',
        en: '/en/daily/world-action-model/2026-10-07',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-07" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
