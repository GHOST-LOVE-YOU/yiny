import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '冻结视频世界模型中的训练自由动作迁移与长时程视觉证据',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'World in World 将源视频、几何投影和历史状态统一为带相机与时间标签的干净视觉状态，无需重训即可控制冻结的因果视频模型',
      '对应关系引导的注意力路由用持久点身份与几何匹配源视频 token，面向大视角变化维持人物外观和事件进程',
      '按证据拆分的 attention CFG 独立调节不同控制通道，并复用同一次去噪前向结果，不增加 guidance NFE',
      '同一接口覆盖重新运镜、长时程回访和人体动作迁移，为舞蹈视频的镜头重定向与动作驱动提供可组合路径',
    ],
    papers: [
      {
        num: 1,
        tag: '动作迁移 · 可控视频世界模型',
        title: 'World in World: Explore the World with World Models',
        keyPoints: [
          '提出训练自由的视觉证据接口，把源视频观察、目标视角场景投影、几何渲染和检索到的生成历史写成冻结因果视频模型原生 self-attention 可读取的干净状态',
          'Correspondence-Guided Attention Routing 结合持久点身份与相机几何，在有效区域把当前查询路由到对应的源视频 token，减少大视角变化和动态运动中的外观歧义',
          'Evidence-Wise Attention CFG 分别调节各类辅助证据的增量贡献，并复用同一次去噪前向中的注意力响应，不额外增加网络函数评估次数',
          '在 LingBot-World 2.0 causal-fast 冻结检查点上验证相机可控重渲染，并展示 bullet time、视频编辑、长时程生成与人体动作迁移等应用',
        ],
        description: '这项工作的 Music-to-Dance 价值在于把“动作驱动、人物外观、镜头轨迹和历史一致性”从彼此独立的专用控制器，改写成同一个视觉证据编排问题。舞蹈驱动视频可将 driving clip 的人体运动作为时间标注证据，将参考人物和目标相机投影作为空间证据，再由路由与分通道 CFG 控制各自影响。它并非直接的音乐到骨架生成器，论文的主定量任务也是相机重渲染；但其项目页明确展示 motion transfer，因此更适合作为现有 Music-to-Dance 动作序列之后的可控视频渲染与重新运镜层。',
        href: 'https://arxiv.org/abs/2609.11548v1',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: '本次周一窗口中，严格筛选后只有 World in World 达到发布标准。它反映出一条值得跟踪的工程路线：不再为动作迁移、相机控制和长记忆分别训练适配器，而是把控制信号转换为预训练视频模型已经理解的视觉状态，再显式管理证据的时空对应和强度。对 Music-to-Dance 系统而言，这不会替代音乐到动作的节拍与语义建模，却可能显著简化动作生成之后的人物渲染、镜头重定向和长片段身份保持。由于 arXiv API 持续限流，本期 arXiv 覆盖降级；条目由 Hugging Face Daily Papers 发现，并以 arXiv v1 全文核验。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Training-Free Motion Transfer and Long-Horizon Visual Evidence in Frozen Video World Models',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'World in World unifies source video, geometric projections, and historical states as camera- and time-labelled clean visual states for controlling a frozen causal video model without retraining',
      'Correspondence-guided attention routing uses persistent point identities and geometry to match source-video tokens under large viewpoint changes while preserving appearance and event progression',
      'Evidence-wise attention CFG regulates each control channel independently and reuses attention responses from the same denoising pass, adding no guidance NFE',
      'One interface supports re-cinematography, long-horizon revisiting, and human-motion transfer, offering a compositional route to camera redirection and motion-driven dance video rendering',
    ],
    papers: [
      {
        num: 1,
        tag: 'Motion Transfer · Controllable Video World Model',
        title: 'World in World: Explore the World with World Models',
        keyPoints: [
          'Introduces a training-free visual-evidence interface that turns source observations, target-view scene projections, geometry renders, and retrieved generation history into clean states readable by a frozen causal video model through native self-attention',
          'Correspondence-Guided Attention Routing combines persistent point identities with camera geometry to route current queries to matching source-video tokens, reducing appearance ambiguity under dynamic motion and large viewpoint changes',
          'Evidence-Wise Attention CFG independently regulates the incremental contribution of each auxiliary evidence source while reusing attention responses from one denoising pass, adding no network function evaluations for guidance',
          'Instantiates the method on the frozen LingBot-World 2.0 causal-fast checkpoint for camera-controlled rerendering and demonstrates bullet time, video editing, long-horizon generation, and human-motion transfer',
        ],
        description: 'For Music-to-Dance, the key contribution is to recast motion driving, subject appearance, camera trajectory, and historical consistency as one visual-evidence orchestration problem instead of a collection of separately trained controllers. A dance pipeline could treat motion from a driving clip as time-labelled evidence and combine it with reference-identity and target-camera projections, while routing and per-evidence CFG govern their influence. This is not a direct music-to-skeleton generator, and the paper quantifies camera rerendering as its main task; however, the project explicitly demonstrates motion transfer, making the method most relevant as a controllable rendering and re-cinematography layer after music-conditioned motion generation.',
        href: 'https://arxiv.org/abs/2609.11548v1',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: 'Only World in World met the publication threshold in this Monday window. It points to an engineering direction worth tracking: rather than training separate adapters for motion transfer, camera control, and long-term memory, convert each control into visual states already understood by a pretrained video model, then explicitly manage temporal-spatial correspondence and evidence strength. This does not replace beat- and semantics-aware music-to-motion modeling, but it may simplify identity-preserving rendering, camera redirection, and long-clip consistency after motion generation. The arXiv API remained rate-limited, so arXiv coverage is degraded; the paper was discovered through Hugging Face Daily Papers and verified against the arXiv v1 full text.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-14',
        en: '/en/daily/music-to-dance/2026-09-14',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-14" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
