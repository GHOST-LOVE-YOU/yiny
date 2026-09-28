import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '因果未来印记：以预测动力学直接驱动动作生成',
    description: 'World Action Model 研究论文日报',
    overview: [
      'InternW0-Δ 用定向 Mixture-of-Transformers 耦合视频专家与动作专家',
      'Causal Imprint 从训练期未来监督学习动作相关的场景变化，推理时无需生成未来视频',
      '超过 2 万小时异构数据与统一状态—动作接口将 WAM 预训练扩展至多种具身形态',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-stream / Shared Representation',
        title: 'InternW0-Δ: A World Action Model Bridging Predictive Dynamics and Actions with 20K+ Hours of Open Data',
        keyPoints: [
          '在定向 Mixture-of-Transformers 中联合训练未来视频与动作的 flow-matching 目标；视频专家和动作专家保留独立参数，并通过受掩码约束的联合注意力交换信息',
          '提出 Causal Imprint：用相邻未来视频 latent 差分与未来视频专家特征监督当前上下文表示，再把该预测表示直接提供给动作专家；真实未来帧不会进入动作前向路径，推理时也不必 rollout 视频',
          '从 Track4World 蒸馏训练期 4D 几何与运动先验，并用稀疏的首帧、上一动作块前观测和当前观测保留长短期交互上下文',
          '统一机器人演示、UMI、第一人称人类演示和 Ego2Robot 数据，形成超过 2 万小时语料；在 LIBERO-Plus、RoboTwin 2.0、EBench、RoboDojo 及四种真实机器人平台上验证',
        ],
        description: '这篇工作的关键不只是规模，而是把“预测未来”变成动作生成可直接消费的共享表示。联合视频—动作扩散目标保留了预训练视频动力学，Causal Imprint 又隔离了训练期未来信息与在线控制路径：动作专家能利用未来相关变化，却不承担显式视频采样的延迟。按 taxonomy，它属于 Joint WAM - Diffusion 的 multi-stream/shared-representation 路线，并兼具 hidden-state coupling。论文报告 LIBERO-Plus 92.8%、RoboTwin 2.0 Clean2Random 71.9%、EBench 66.0 和 RoboDojo 23.9% 等结果；真实机器人与异构具身适配使其成为今天最强的直接 WAM 信号。作者声明将开放代码、权重、基础设施及许可允许的数据处理产物，但实际可复现性仍需等待发布兑现。',
        href: 'https://arxiv.org/abs/2609.31394v1',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: '今天只有一篇达到强相关门槛，因此不为数量扩充 Worth Reading。InternW0-Δ 体现了 Joint Diffusion WAM 的一个清晰转向：显式未来生成仍可作为强训练目标，但在线策略未必需要真的“看完”采样出的未来。未来 latent 差分、视频专家中间表征和 4D 运动先验被压入当前时刻的动作条件表示，在保留生成式世界知识的同时降低控制延迟。相比仅把视频骨干当视觉编码器，这种带未来监督、联合目标和定向跨流交互的设计具有更实质的 world–action coupling；下一步应重点观察开源资产是否完整，以及超过 2 万小时数据规模下各来源的独立贡献。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Causal Future Imprints: Predictive Dynamics Directly Driving Action Generation',
    description: 'Daily research digest for World Action Models',
    overview: [
      'InternW0-Δ couples video and action experts with a directed Mixture-of-Transformers',
      'Causal Imprint learns action-relevant scene changes from future supervision without video rollout at inference',
      'More than 20K hours of heterogeneous data and a canonical state-action interface scale WAM pretraining across embodiments',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-stream / Shared Representation',
        title: 'InternW0-Δ: A World Action Model Bridging Predictive Dynamics and Actions with 20K+ Hours of Open Data',
        keyPoints: [
          'Jointly trains flow-matching objectives for future video and actions in a directed Mixture-of-Transformers; the video and action experts retain separate parameters and communicate through masked joint attention',
          'Introduces Causal Imprint, supervising present-context representations with adjacent future-video latent differences and future video-expert features, then exposing those representations to the action expert without allowing realized future frames into its forward path or requiring video rollout at inference',
          'Distills training-only 4D geometry and motion priors from Track4World and uses sparse anchor, previous-chunk, and current observations to retain episode-level and recent interaction context',
          'Unifies robot demonstrations, UMI, egocentric human demonstrations, and Ego2Robot data into a corpus exceeding 20K hours, with evaluation on LIBERO-Plus, RoboTwin 2.0, EBench, RoboDojo, and four real-robot platforms',
        ],
        description: 'The main contribution is not scale alone, but turning future prediction into a representation the action generator can consume directly. Joint video-action diffusion preserves pretrained visual dynamics, while Causal Imprint separates future-derived training signals from the online control path: the action expert receives predictive changes without paying for explicit video sampling. In the taxonomy, this is a Joint WAM - Diffusion system in the multi-stream/shared-representation family, also featuring hidden-state coupling. The paper reports 92.8% on LIBERO-Plus, 71.9% on RoboTwin 2.0 Clean2Random, 66.0 on EBench, and 23.9% on RoboDojo; cross-embodiment and real-robot results make it today’s strongest direct WAM signal. The authors promise code, weights, infrastructure, and permitted processed data, but reproducibility remains contingent on those releases.',
        href: 'https://arxiv.org/abs/2609.31394v1',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: 'Only one paper clears the strong-relevance bar today, so Worth Reading is intentionally left empty. InternW0-Δ illustrates a clear direction for Joint Diffusion WAMs: explicit future generation can remain a strong training objective without requiring an online policy to sample and inspect the future. Future latent differences, intermediate video-expert representations, and 4D motion priors are compressed into an action-conditioning representation at the current step, retaining generative world knowledge while reducing control latency. Unlike systems that merely reuse a video backbone as an encoder, the future supervision, joint objectives, and directed cross-stream interaction provide substantive world-action coupling. The next questions are whether the promised assets arrive in full and how much each component of the 20K-hour mixture contributes independently.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>
}): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/world-action-model/2026-09-28',
        en: '/en/daily/world-action-model/2026-09-28',
      },
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: Locale }>
}) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout
      locale={locale}
      date="2026-09-28"
      roleId="world-action-model"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
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

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
