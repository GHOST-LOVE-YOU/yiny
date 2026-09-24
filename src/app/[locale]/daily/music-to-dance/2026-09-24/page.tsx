import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '互惠跨模态注意力与频谱轨迹监督：让声音、动作真正约束视频',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'RecCAR直接修复联合视频—动作/音频生成中“视频支配其他模态”的非对称注意力',
      'MotionSpec同时约束轨迹频谱与逐帧光流，改善复杂人体运动的连贯性',
      '长视频记忆综述为舞蹈身份、姿态与场景的跨片段保持提供系统设计框架',
      '姿态感知音乐标注验证骨架流可补充音频中的舞种与地域语义',
      'ARS-Avatar提供可动画、可重光照的人体表示，适合作为动作到渲染的高保真接口',
    ],
    papers: [
      {
        num: 1,
        tag: '联合视频生成 · 跨模态对齐',
        title: 'All modalities are equal, but video is more equal: Closing the Cross-Attention Gap in Joint Video Generation',
        keyPoints: [
          '揭示联合多模态扩散 Transformer 的互惠对应差距：动作或音频容易对齐视频，但反向注意力不足以有效约束视频',
          '提出 Reciprocal Cross-modal Attention Regularization（RecCAR），以较稳定的视频到伴随模态对应为固定参照，用 KL 正则校准模态到视频的注意力分布',
          '在视频—动作与视频—音频联合生成上，将 Human Anatomy 分数从 0.69 提升至 0.75，并把音视频不同步指标从 0.804 降至 0.752',
        ],
        description: '这是今日对 Music-to-Dance 最直接的方法论文。舞蹈生成常把音乐或 SMPL 动作作为条件，却不能保证视频分支真正使用这些条件；RecCAR把这种“条件被看到但约束不够”的问题显式化为双向对应分布的不一致。对音乐驱动舞蹈，可把节拍、音频事件或三维骨架到视频 token 的注意力拉回已经学稳的视频到条件对应，在不改为串联系统的前提下同时改善人体解剖、动作一致性与音画同步。',
        href: 'https://arxiv.org/abs/2609.27901',
      },
      {
        num: 2,
        tag: '视频运动监督 · 频谱轨迹',
        title: 'MotionSpec: Spectral Trajectory Supervision for Motion-Consistent Video Generation',
        keyPoints: [
          '提出 Spectral Trajectory Consistency：构建稠密的锚点相对运动轨迹，并经时间傅里叶变换形成运动频谱体',
          '同时对齐预测与真实轨迹的频谱幅值和相位，分别约束不同时间频率上的运动强度与动作组织',
          '以 Local Flow Consistency 对齐相邻帧光流，补足频谱级长期约束对局部过渡的刻画',
        ],
        description: '舞蹈视频中的节拍感不只取决于位移大小，还取决于周期、相位和动作段落何时发生。MotionSpec把轨迹转换到频域后同时监督幅值和相位，比只做像素去噪或单帧姿态损失更贴近舞蹈的周期结构；局部光流项则负责稳定快速肢体运动的逐帧过渡。该框架可与音乐节拍频谱联合设计，让视觉轨迹相位直接对齐音频重拍。',
        href: 'https://arxiv.org/abs/2609.28095',
      },
    ],
    worthReading: [
      { num: 1, title: 'The Past Frames the Future: Memory for Autoregressive Video Generation — A Survey', tag: '长视频生成 · 记忆综述', href: 'https://arxiv.org/abs/2609.28466', description: '从记忆形态、功能、读写操作、学习与评测五个维度梳理自回归视频记忆；对长舞蹈中的人物身份、场景布局、动作状态和因果变化保持尤其有用。' },
      { num: 2, title: 'Pose-Aware Multimodal Automatic Tagging for Greek Traditional Music', tag: '音乐—姿态语义 · 多模态标注', href: 'https://arxiv.org/abs/2609.27094', description: '在希腊传统音乐中联合音频、视频和舞者骨架，最佳三模态系统比最强音频基线的 macro ROC-AUC 高约 4 个百分点，说明姿态能补足舞种与地域风格语义。' },
      { num: 3, title: 'ARS-Avatar: Animatable and Relightable Surfel Avatars with Learnable Ambient Occlusion', tag: '人体 Avatar · 可动画重光照', href: 'https://arxiv.org/abs/2609.27600', description: '以 surfel、模板变形先验、BRDF 材质和可微屏幕空间环境光遮蔽构建可动画人体，为将生成骨架稳定渲染为不同姿态与光照下的角色提供接口。' },
    ],
    observation: '今天的核心信号是“条件存在”正在转向“条件是否真正控制输出”。RecCAR在注意力层面诊断音频/动作对视频的弱约束，MotionSpec则在输出运动层面补上频率、相位与局部流的一致性；两者可以形成互补训练路线：前者保证音乐和骨架信息进入视频分支，后者验证并约束最终运动轨迹。与此同时，长视频记忆与可动画 Avatar 分别覆盖跨片段状态保持和高保真人体渲染，使 Music-to-Dance 的系统边界从单段生成扩展到可持续、可编辑的角色表演。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Reciprocal Cross-Modal Attention and Spectral Trajectory Supervision',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'RecCAR directly addresses video-dominant asymmetric attention in joint video-motion and video-audio generation',
      'MotionSpec combines trajectory spectra with frame-to-frame flow to improve complex human-motion coherence',
      'A survey of long-video memory offers a system framework for preserving identity, pose, and scenes across segments',
      'Pose-aware music tagging shows that skeleton streams add dance-form and regional semantics beyond audio',
      'ARS-Avatar provides an animatable, relightable human representation for high-fidelity motion rendering',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint Video Generation · Cross-Modal Alignment',
        title: 'All modalities are equal, but video is more equal: Closing the Cross-Attention Gap in Joint Video Generation',
        keyPoints: [
          'Identifies a reciprocal correspondence gap in joint multimodal diffusion transformers: motion or audio aligns strongly to video, while the reverse attention is too weak to constrain video effectively',
          'Introduces Reciprocal Cross-modal Attention Regularization, using the more established video-to-companion correspondence as a fixed reference and a KL loss to align modality-to-video attention',
          'Raises Human Anatomy from 0.69 to 0.75 in video-motion generation and lowers audio-video desynchronization from 0.804 to 0.752',
        ],
        description: 'This is today’s most direct contribution to Music-to-Dance. Dance systems often condition on music or SMPL motion without evidence that the video stream truly follows either one. RecCAR turns this “visible but weakly binding” condition into a measurable disagreement between reciprocal correspondence distributions. For music-driven dance, it could align beat-, event-, or skeleton-to-video attention with the already reliable reverse correspondence, improving anatomy, motion agreement, and audiovisual synchronization while retaining joint generation.',
        href: 'https://arxiv.org/abs/2609.27901',
      },
      {
        num: 2,
        tag: 'Video Motion Supervision · Spectral Trajectories',
        title: 'MotionSpec: Spectral Trajectory Supervision for Motion-Consistent Video Generation',
        keyPoints: [
          'Builds dense anchor-relative trajectories and applies a temporal Fourier transform to form motion spectral volumes',
          'Aligns spectral amplitude and phase to constrain motion strength across frequencies and its temporal organization',
          'Adds Local Flow Consistency between adjacent frames to stabilize short-range transitions alongside trajectory-level supervision',
        ],
        description: 'The perception of rhythm in dance depends not only on displacement magnitude but also on periodicity, phase, and when phrases occur. By supervising trajectory amplitude and phase in the frequency domain, MotionSpec is closer to dance structure than pixel denoising or isolated pose losses. Its local-flow term stabilizes rapid limb transitions. A natural extension is joint audio-motion spectral supervision that explicitly locks visual trajectory phases to musical beats.',
        href: 'https://arxiv.org/abs/2609.28095',
      },
    ],
    worthReading: [
      { num: 1, title: 'The Past Frames the Future: Memory for Autoregressive Video Generation — A Survey', tag: 'Long Video · Memory Survey', href: 'https://arxiv.org/abs/2609.28466', description: 'Organizes autoregressive video memory by forms, functions, operations, learning, and evaluation—a useful map for retaining performer identity, scene layout, motion state, and causal changes in long dances.' },
      { num: 2, title: 'Pose-Aware Multimodal Automatic Tagging for Greek Traditional Music', tag: 'Music–Pose Semantics · Multimodal Tagging', href: 'https://arxiv.org/abs/2609.27094', description: 'Combines audio, video, and dancer skeletons for Greek traditional music; the best trimodal model gains about four macro ROC-AUC points over the strongest audio baseline, showing that pose adds dance-form and regional semantics.' },
      { num: 3, title: 'ARS-Avatar: Animatable and Relightable Surfel Avatars with Learnable Ambient Occlusion', tag: 'Human Avatar · Animation and Relighting', href: 'https://arxiv.org/abs/2609.27600', description: 'Combines surfels, template deformation priors, BRDF materials, and differentiable screen-space ambient occlusion, offering an interface for rendering generated skeleton motion faithfully under novel poses and lighting.' },
    ],
    observation: 'The central signal today is a shift from asking whether a condition is present to whether it actually controls the output. RecCAR diagnoses weak audio/motion-to-video constraints inside attention, while MotionSpec enforces frequency, phase, and local-flow consistency in the resulting motion. They suggest a complementary training path: ensure that music and skeleton information enters the video branch, then verify and constrain the final trajectory. Long-video memory and animatable avatars cover persistent state and high-fidelity rendering, extending Music-to-Dance from isolated clips toward sustained, editable character performances.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-24',
        en: '/en/daily/music-to-dance/2026-09-24',
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
      date="2026-09-24"
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
