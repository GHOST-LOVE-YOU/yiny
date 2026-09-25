import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '模态锚定的音视频扩散强化学习与可执行人体动作',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'AV-GRPO 将联合音视频偏好学习拆成可归因的单模态子问题，同时优化画面、声音与同步性',
      'BeyondRetarget 绕过显式人体表示，直接从单目视频学习可执行的机器人动作',
      'Ego-Exo4D-HM 补充大规模稠密 4D 人体运动重建及配套流水线',
      'ComplexSync 展示单步扩散与结构对齐损失在实时音频驱动人物动画中的组合价值',
    ],
    papers: [
      {
        num: 1,
        tag: '联合音视频生成 · 扩散强化学习',
        title: 'AV-GRPO: Modality-Anchored Decoupling Diffusion Reinforcement Learning for Joint Audio-Video Generation',
        keyPoints: [
          '提出模态锚定 rollout，将异构的画面、音频与同步奖励解耦，缓解联合优化中的信用分配困难',
          '以轨迹锁定的冻结塔优化降低双塔联合训练成本，并针对不同模态采用自适应目标与扰动强度',
          '发布按五个维度解耦、难度可控的 5DAV 数据集；在 JavisBench 与 VABench 上优于 LTX-2.3 的生成质量、语义对齐和跨模态同步',
        ],
        description: '对 Music-to-Dance 而言，这项工作的关键不是再增加一个同步损失，而是让每次策略更新能够回答“画面、声音还是二者关系出了问题”。模态锚定 rollout 固定比较难度，冻结其中一座模态塔再优化另一座，可减少音乐质量、人体运动质量与节拍同步奖励相互干扰。它为后训练联合舞蹈视频模型提供了一条可审计路径：分别提升视觉动作和音频保真度，再用跨模态奖励校准同步，同时保留作者已公开的代码与数据以便复现。',
        href: 'https://arxiv.org/abs/2609.29816',
      },
    ],
    worthReading: [
      { num: 1, title: 'BeyondRetarget: Learning Executable Humanoid Motions Directly from Monocular Video', tag: '人体视频 · 可执行动作', href: 'https://arxiv.org/abs/2609.29850', description: '跳过“人体动作估计—机器人重定向”的串联误差，直接把单目 RGB 视频映射为机器人动作，并用接触感知优化改善时间一致性与物理合理性；其隐式跨形态表示对把舞者参考视频迁移到不同骨架很有启发。' },
      { num: 2, title: 'Ego-Exo4D Human Meshes Dataset: 4D Human Motion Reconstruction for Ego-Exo Captures', tag: '4D 人体运动 · 数据集', href: 'https://arxiv.org/abs/2609.30187', description: '为 Ego-Exo4D 的同步第一/第三人称多视角视频补充大规模稠密 4D 人体运动重建，并开放重建流水线，可用于动作先验训练、跨视角一致性评测与舞蹈数据构建。' },
      { num: 3, title: 'ComplexSync: High-Fidelity and Real-Time Lip Sync in Complex Scenarios', tag: '音频驱动动画 · 实时扩散', href: 'https://arxiv.org/abs/2609.29225', description: '以双流联合训练抑制参考帧信息泄漏，以蒸馏实现单步去噪和超过 70 FPS 的吞吐，并用视觉基础模型结构先验构造关系对齐损失；虽聚焦口型，其实时音频—运动对齐方案可迁移到局部身体动画。' },
    ],
    observation: '今天最值得追踪的变化是，音视频联合生成的后训练开始显式处理“奖励属于哪个模态”。AV-GRPO 把耦合奖励拆成可控的更新过程，比把视觉质量、音频质量和同步分数直接加权求和更适合定位舞蹈生成中的退化来源。其余三项工作分别补齐跨骨架动作迁移、稠密 4D 人体数据和实时音频驱动动画：它们尚未组成完整的 Music-to-Dance 系统，却清楚勾勒出从参考动作获取、可执行运动建模到低延迟渲染的工程链路。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Modality-Anchored Audio-Video Diffusion RL and Executable Human Motion',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'AV-GRPO decomposes joint audio-video preference learning into attributable unimodal subproblems while improving fidelity and synchronization',
      'BeyondRetarget bypasses explicit human representations to learn executable robot motion directly from monocular video',
      'Ego-Exo4D-HM adds large-scale dense 4D human-motion reconstructions and an accompanying pipeline',
      'ComplexSync combines one-step diffusion with structural alignment for real-time audio-driven character animation',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint Audio-Video Generation · Diffusion RL',
        title: 'AV-GRPO: Modality-Anchored Decoupling Diffusion Reinforcement Learning for Joint Audio-Video Generation',
        keyPoints: [
          'Introduces modality-anchored rollouts that disentangle heterogeneous visual, audio, and synchronization rewards to improve credit assignment',
          'Uses trajectory-locked frozen-tower optimization to lower joint two-tower training cost, with adaptive objectives and perturbation strengths for each modality',
          'Releases the difficulty-controllable 5DAV dataset, decoupled along five dimensions, and outperforms LTX-2.3 on generation quality, semantic alignment, and cross-modal synchronization on JavisBench and VABench',
        ],
        description: 'For Music-to-Dance, the central contribution is not simply another synchronization loss but an update procedure that can identify whether an error belongs to video, audio, or their relationship. Modality-anchored rollouts stabilize comparison difficulty, while freezing one modality tower and optimizing the other reduces interference among music fidelity, body-motion quality, and beat-alignment rewards. This offers an auditable post-training route: improve each modality separately, then calibrate synchronization with cross-modal rewards, with released code and data supporting reproduction.',
        href: 'https://arxiv.org/abs/2609.29816',
      },
    ],
    worthReading: [
      { num: 1, title: 'BeyondRetarget: Learning Executable Humanoid Motions Directly from Monocular Video', tag: 'Human Video · Executable Motion', href: 'https://arxiv.org/abs/2609.29850', description: 'Avoids the cascading errors of human-motion estimation followed by robot retargeting, maps monocular RGB video directly to robot motion, and adds contact-aware optimization for temporal consistency and physical plausibility. Its implicit cross-morphology representation is relevant to transferring dancer references across skeletons.' },
      { num: 2, title: 'Ego-Exo4D Human Meshes Dataset: 4D Human Motion Reconstruction for Ego-Exo Captures', tag: '4D Human Motion · Dataset', href: 'https://arxiv.org/abs/2609.30187', description: 'Adds large-scale dense 4D human-motion reconstructions to synchronized ego/exocentric Ego-Exo4D captures and releases the reconstruction pipeline, supporting motion-prior training, cross-view evaluation, and dance-data construction.' },
      { num: 3, title: 'ComplexSync: High-Fidelity and Real-Time Lip Sync in Complex Scenarios', tag: 'Audio-Driven Animation · Real-Time Diffusion', href: 'https://arxiv.org/abs/2609.29225', description: 'Combines dual-stream training that limits reference-frame leakage, distilled one-step denoising above 70 FPS, and a relational alignment loss based on vision-foundation-model structure. Although focused on lips, its real-time audio-motion design can inform localized body animation.' },
    ],
    observation: 'The strongest signal today is that post-training for joint audio-video generation is beginning to address which modality a reward should update. AV-GRPO turns coupled rewards into controlled optimization steps, making it easier to locate dance-generation regressions than a single weighted sum of visual, audio, and synchronization scores. The other three papers fill complementary gaps in cross-skeleton transfer, dense 4D human data, and real-time audio-driven animation. They do not yet form a complete Music-to-Dance system, but together outline a practical chain from reference-motion acquisition through executable motion modeling to low-latency rendering.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-25',
        en: '/en/daily/music-to-dance/2026-09-25',
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
      date="2026-09-25"
      roleId="music-to-dance"
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
