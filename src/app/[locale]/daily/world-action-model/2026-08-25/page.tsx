import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '几何未来预测与可交互世界模型的动作耦合边界',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'GeoWAM 将未来场景几何预测与自车轨迹预测统一到面向驾驶的空间状态中',
      '几何状态比像素更直接地表达场景结构、运动和可执行驾驶动作',
      '开放环与闭环结果支持未来几何作为 WAM 预训练目标',
      'ReWorld 以长时记忆和动作跟随为重点，展示交互式世界模型的固定预算设计',
      'EchoWM 联合生成视频、声音与轨迹控制，但更偏通用可进入媒体世界模型',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · 几何未来预测 · Autonomous Driving',
        title: 'GeoWAM: Visual Geometry World Action Models for Autonomous Driving',
        keyPoints: [
          '以点云等视觉几何状态预测未来场景几何，而不是直接预测未来图像，显式承载空间结构与时序演化',
          '在几何世界模型表征之上加入 geometry-conditioned action head，预测未来自车轨迹，使世界预测直接服务动作生成',
          '通过开放环和闭环评估验证未来几何预训练目标，相比图像式替代方案获得更强驾驶策略表现',
        ],
        description: 'GeoWAM 是今日唯一同时满足“未来状态预测”和“可执行动作预测”强耦合门槛的新作。它把 WAM 的状态空间从外观纠缠的像素推进到与驾驶动作更一致的几何空间：模型先学习场景如何在三维结构中演化，再由几何条件动作头输出自车轨迹。对具身系统而言，这意味着未来预测不必追求完整视觉逼真度，而应优先保留能改变控制决策的结构和运动信息。',
        href: 'https://arxiv.org/abs/2608.23486',
      },
    ],
    worthReading: [
      { num: 1, title: 'ReWorld: An Interactive World Model with Long-Horizon Memory', tag: '边界相关 · Interactive World Model', href: 'https://arxiv.org/abs/2608.23565', description: '论文围绕动作跟随、长时记忆和实时视频流设计混合注意力窗口、位姿索引地标库与固定预算 KV cache；它证明了交互式世界模型的动作条件生成和长时回访能力，但摘要未显示机器人策略或具身控制闭环，因此列为 Worth Reading。' },
      { num: 2, title: 'EchoWM: Open and Enterable Omnimodal World Models', tag: '边界相关 · Omnimodal World Model', href: 'https://arxiv.org/abs/2608.23189', description: 'EchoWM 将连续导航轨迹与 720p 视频、环境音、音乐和语音联合生成，并支持第一人称与第三人称交互；其轨迹控制对 WAM 有参考价值，但研究重点是可进入的通用媒体世界，不纳入强相关 Must Read。' },
    ],
    observation: '今日的新作数量很少，但边界清晰。GeoWAM 将未来几何直接接到自车轨迹预测，说明 WAM 的核心不一定是像素级视频逼真度，而是能否学习对动作有用的未来状态。ReWorld 和 EchoWM 则代表另一条相邻路线：动作可以控制世界生成，却未必形成机器人策略学习闭环。后续筛选应继续区分“可交互世界模型”和“面向具身决策的 world-action coupling”，并优先关注共享表征、联合扩散或闭环控制证据。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Geometric Future Prediction and the Boundary of Action-Coupled World Models',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'GeoWAM unifies future scene-geometry prediction with ego-trajectory prediction in a driving-oriented state space',
      'Geometric states express structure, motion, and executable driving actions more directly than pixels',
      'Open-loop and closed-loop results support future geometry as a WAM pretraining objective',
      'ReWorld focuses on action following and long-horizon memory with a fixed-budget interactive design',
      'EchoWM jointly generates video, sound, and trajectory control but is closer to a general enterable world model',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Future Geometry · Autonomous Driving',
        title: 'GeoWAM: Visual Geometry World Action Models for Autonomous Driving',
        keyPoints: [
          'Forecasts future scene geometry, such as point-cloud states, instead of directly predicting future images, explicitly representing spatial structure and temporal evolution',
          'Adds a geometry-conditioned action head on top of the learned geometric dynamics to predict future ego trajectories',
          'Validates future geometry as a pretraining target through open-loop and closed-loop evaluations, outperforming image-based alternatives for driving policies',
        ],
        description: 'GeoWAM is the only new paper today that clearly meets the strong coupling criterion of predicting future states and executable actions together. It moves the WAM state space from appearance-entangled pixels toward geometry that is naturally aligned with driving actions: the model learns how the scene evolves structurally, then uses those dynamics to generate ego trajectories. For embodied systems, this suggests that future prediction should prioritize decision-relevant structure and motion rather than full pixel-level visual fidelity.',
        href: 'https://arxiv.org/abs/2608.23486',
      },
    ],
    worthReading: [
      { num: 1, title: 'ReWorld: An Interactive World Model with Long-Horizon Memory', tag: 'Adjacent Work · Interactive World Model', href: 'https://arxiv.org/abs/2608.23565', description: 'ReWorld combines action following, long-horizon recall, mixed attention windows, a pose-indexed landmark bank, and a fixed-budget KV cache for real-time video interaction. It is relevant to action-conditioned generation, but the abstract does not establish a robot policy or embodied-control loop, so it remains Worth Reading.' },
      { num: 2, title: 'EchoWM: Open and Enterable Omnimodal World Models', tag: 'Adjacent Work · Omnimodal World Model', href: 'https://arxiv.org/abs/2608.23189', description: 'EchoWM jointly generates 720p video, environmental sound, music, and speech while following continuous navigation trajectories in first- and third-person scenes. Its trajectory control is relevant to WAM design, but its focus is a general enterable media world rather than embodied policy learning.' },
    ],
    observation: 'The new-paper pool is small today, but the boundary is informative. GeoWAM connects future geometry directly to ego-trajectory prediction, showing that a WAM need not optimize pixel-level video realism if its future state is useful for action. ReWorld and EchoWM represent adjacent interactive-world-model directions: actions control generation, but a robot policy-learning loop is not established. Future screening should continue to separate interactive world models from embodied world-action coupling and prioritize evidence of shared representations, joint diffusion, or closed-loop control.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-08-25',
        en: '/en/daily/world-action-model/2026-08-25',
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
      date="2026-08-25"
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
          <NotableItem
            key={item.num}
            num={item.num}
            title={item.title}
            tag={item.tag}
            href={item.href}
          >
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
