import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '动作一致性奖励与世界模型后训练：从未来评估到闭环优化',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'WorldReward 用动作对齐的视频片段统一评估动作执行、外观质量和运动质量',
      '分块偏好建模缓解长视频与完整动作序列联合评估时的证据稀释',
      '将奖励模型用于 HY-WorldPlay 1.5 的 RL 后训练，同时提升短程到长程的动作执行与视觉质量',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Implicit Planning · Reward Modeling · RL 后训练',
        title: 'WorldReward: Reward Modeling for Camera-Conditioned World Models',
        keyPoints: [
          '提出基于 VLM 的成对偏好奖励模型，把动作一致性与视觉质量放入同一评价空间',
          '将成对视频拆分为与动作对齐的片段，组织结构化视觉证据，再通过片段投票聚合视频级动作和质量偏好',
          '构建 WorldReward-Bench，分别测量动作一致性、外观质量和运动质量，并在三项指标上超过 GPT-5.5 的人类偏好一致性',
          '用于 HY-WorldPlay 1.5 的 RL 后训练后，在短期到长期 rollout 中同时改善动作执行和视觉质量',
        ],
        description: 'WorldReward 的核心贡献不是生成新的世界模型，而是补上 WAM 闭环中“如何判断生成的未来是否值得执行”这一环节。摄像机条件世界模型需要让指令动作带来预期场景变化，同时保持外观、几何和时间动态一致；单独的几何奖励看不到视觉质量，单独的图像奖励又无法判断动作是否真正执行。该方法用 VLM 将动作与其视觉后果联系起来，并用动作对齐的局部证据降低长时程评估的噪声。对 WAM 而言，这是一条 Cascaded WAM 的隐式规划/后训练路线：世界模型负责产生交互式未来，奖励模型负责从未来结果反向塑造策略。',
        href: 'https://arxiv.org/abs/2609.03952',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: '今日严格筛选后仅保留一篇强相关新作。WorldReward 将 WAM 的评估对象从“视频是否逼真”推进到“动作是否导致了正确且视觉上可靠的世界变化”，并把这类评价实际接入 RL 后训练。它提示后续系统应把动作-观测对应关系作为独立的可学习信号，而不是把视频质量代理为控制质量。Hugging Face Daily Papers 还收录了 SolarWM，但其 publishedAt 为 2026-09-02，不属于今日新论文；Puffin-World、GIFT、OctWorld 等当天候选未能从摘要确认完整的世界-动作耦合，因此排除。Awesome-WAM README 本次有 [NEW] HiMem-WAM 与 Flash-WAM 等 2606.* 条目，属于参考清单新增而非今日发布。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Action-Consistent Rewards and World-Model Post-Training from Future Evaluation to Closed-Loop Optimization',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'WorldReward jointly evaluates action execution, appearance quality, and motion quality with action-aligned video chunks',
      'Chunk-level preference modeling reduces evidence dilution when long videos are evaluated against complete action sequences',
      'Using the reward model for RL post-training of HY-WorldPlay 1.5 improves action execution and visual quality from short to long horizons',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Implicit Planning · Reward Modeling · RL Post-Training',
        title: 'WorldReward: Reward Modeling for Camera-Conditioned World Models',
        keyPoints: [
          'Introduces a VLM-based pairwise preference reward model that evaluates action consistency and visual quality in one reasoning space',
          'Decomposes paired videos into action-aligned chunks, structures their visual evidence, and aggregates chunk votes into video-level action and quality preferences',
          'Introduces WorldReward-Bench for action consistency, appearance quality, and motion quality, exceeding GPT-5.5 in agreement with human preferences on all three dimensions',
          'Improves both action execution and visual quality across short- to long-horizon rollouts when used for RL post-training of HY-WorldPlay 1.5',
        ],
        description: 'WorldReward does not introduce another world generator; it addresses the WAM loop question of how to decide whether an imagined future is reliable enough to execute. A camera-conditioned world model must make commanded actions induce the expected scene changes while preserving appearance, geometry, and temporal dynamics. Geometry-only rewards miss visual quality, while image-only rewards cannot tell whether the action was executed. WorldReward uses a VLM to relate actions to visual consequences and action-aligned local evidence to reduce long-horizon evaluation noise. For WAMs, this is a Cascaded WAM implicit-planning and post-training route: the world model produces interactive futures, while the reward model feeds outcome judgments back into policy optimization.',
        href: 'https://arxiv.org/abs/2609.03952',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: 'Strict filtering leaves one directly relevant new paper today. WorldReward moves WAM evaluation beyond whether a video looks realistic: it asks whether an action caused the correct and visually reliable world change, then connects that judgment to RL post-training. This suggests treating action-observation correspondence as a learnable signal rather than using video quality as a proxy for control quality. Hugging Face Daily Papers also lists SolarWM, but its publishedAt is 2026-09-02 and it is not a paper published today. Puffin-World, GIFT, and OctWorld were excluded because their available abstracts did not establish complete world-action coupling. The Awesome-WAM README contains [NEW] 2606.* entries such as HiMem-WAM and Flash-WAM; these are new reference-list entries, not papers published today.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-04',
        en: '/en/daily/world-action-model/2026-09-04',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-04" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
