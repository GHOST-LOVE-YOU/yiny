import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '不确定性感知人体重建、单目服装化身与节拍驱动镜头编排',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'UT-HMR 用关节相关的姿态不确定性与时间早融合提升弱观测下的 3D 人体网格恢复',
      '双层 GS-Mesh 将服装与身体解耦，从单目输入构建可动画、可换装的时序一致化身',
      '音乐会视频编辑框架把乐器活动、可见性、清晰度与节拍切点组合成可解释的镜头选择流程',
    ],
    papers: [
      { num: 1, tag: '3D 人体重建 · 时序不确定性', title: 'UT-HMR: Uncertainty-Guided Temporal Modeling for Robust 3D Human Mesh Recovery', keyPoints: ['为每个人体查询预测完整 SMPL 姿态的高斯分布，以低秩加对角协方差捕获关节间相关不确定性', '将协方差转为逐关节精度权重进行异方差监督，同时以姿态均值保持确定性推理', '通过时间早融合在姿态解码前引入邻帧证据；在 VIP-HockeyPose-v2 与 WorldPose 上达到 state-of-the-art，MPJPE、PA-MPJPE、PVE 最多分别降低 4.7%、3.8%、5.6%'], description: 'Music-to-Dance 的训练视频常有远景舞台、遮挡、快速运动模糊和多人交叠，单帧姿态标签因此并不等可靠。UT-HMR 的相关姿态不确定性可用于给舞蹈重建或伪标签按关节加权，时间早融合则为高速动作补充邻帧证据；它本身不是动作生成器，但能改善生成系统所依赖的 3D 人体监督质量。', href: 'https://arxiv.org/abs/2610.36203' },
    ],
    worthReading: [
      { num: 1, title: 'Single Camera based Simulation and Try-on Ready Avatar Modeling', tag: '单目化身 · 服装动力学', href: 'https://arxiv.org/abs/2610.34223', description: '以物理整合的双层 GS-Mesh 分离服装与身体，并分解 2D 生成数据的几何和外观时序不一致；单目视频乃至单图即可得到支持新姿态动画、具有可信服装动态的 3D 一致化身，适合舞者角色与服饰迁移。' },
      { num: 2, title: 'Multimodal Concert Video Editing: System Design and Exploratory Evaluation', tag: '音乐语义 · 节拍剪辑', href: 'https://arxiv.org/abs/2610.35816', description: '把多轨音频中的乐器活动、画面中的乐器可见性与清晰度汇入可解释评分，并用节拍和速度决定候选切点；专家探索性评估结果不一，但其音画相关性与切镜时序分离设计可迁移到舞蹈视频编排。' },
    ],
    observation: '本期真实采集同时覆盖 arXiv 与 Hugging Face Daily Papers，二者均成功且无来源告警。采集窗口没有 10 月 29 日当天提交的合格论文，因此不以宽泛关键词凑数，而从尚未收录、与 Music-to-Dance 制作链直接相关的近期结果中选出三篇：重点从“生成模型”前移到数据与呈现基础设施——不确定性感知的人体重建提高动作监督可靠性，解耦服装化身承接角色渲染，节拍驱动的镜头选择补足最终视频编排。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Uncertainty-Aware Human Recovery, Monocular Clothed Avatars, and Beat-Guided Editing',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'UT-HMR combines correlated pose uncertainty with temporal early fusion for 3D mesh recovery under weak observations',
      'A double-layer GS-Mesh decouples clothing from the body to build animatable, try-on-ready, temporally coherent avatars from monocular input',
      'A concert-editing framework combines instrument activity, visibility, sharpness, and beat-timed cuts in an interpretable camera-selection pipeline',
    ],
    papers: [
      { num: 1, tag: '3D Human Recovery · Temporal Uncertainty', title: 'UT-HMR: Uncertainty-Guided Temporal Modeling for Robust 3D Human Mesh Recovery', keyPoints: ['Predicts a Gaussian distribution over the full SMPL pose for each person query, using a low-rank-plus-diagonal covariance to capture correlated uncertainty across joints', 'Converts covariance into joint-wise precision weights for heteroscedastic supervision while retaining deterministic inference from the pose mean', 'Injects neighboring-frame evidence through temporal early fusion before pose decoding; reports state-of-the-art results on VIP-HockeyPose-v2 and WorldPose, reducing MPJPE, PA-MPJPE, and PVE by up to 4.7%, 3.8%, and 5.6%'], description: 'Music-to-Dance training footage often contains distant stages, occlusion, fast-motion blur, and overlapping performers, making single-frame pose labels unevenly reliable. UT-HMR offers a way to weight reconstructed dance supervision or pseudo-labels by joint uncertainty, while temporal early fusion recovers evidence for rapid motion. It is not a motion generator, but it can strengthen the 3D human supervision on which generation systems depend.', href: 'https://arxiv.org/abs/2610.36203' },
    ],
    worthReading: [
      { num: 1, title: 'Single Camera based Simulation and Try-on Ready Avatar Modeling', tag: 'Monocular Avatars · Cloth Dynamics', href: 'https://arxiv.org/abs/2610.34223', description: 'A physically integrated double-layer GS-Mesh separates clothing and body while decomposing geometric and appearance inconsistency in generated 2D data. It creates a 3D-consistent avatar with plausible cloth dynamics and novel-pose animation from a monocular video or even one image, useful for dancer identity and costume transfer.' },
      { num: 2, title: 'Multimodal Concert Video Editing: System Design and Exploratory Evaluation', tag: 'Music Semantics · Beat Editing', href: 'https://arxiv.org/abs/2610.35816', description: 'The system combines instrument activity from multitrack audio, visible instruments, and image sharpness in an interpretable score, while beats and tempo define candidate cuts. Its exploratory expert results are mixed, but separating audiovisual relevance from cut timing is directly transferable to dance-video assembly.' },
    ],
    observation: 'This issue was collected live from both arXiv and Hugging Face Daily Papers, with both sources succeeding and no source warnings. The collection window contained no qualifying submission dated October 29, so the digest avoids padding with broad keyword matches and selects three recent, previously uncovered papers that directly support the Music-to-Dance production stack. The emphasis shifts upstream and downstream of generation: uncertainty-aware human recovery improves motion supervision, decoupled clothed avatars support character rendering, and beat-guided camera selection supports final video assembly.',
  },
}

export function generateStaticParams() { return locales.map(locale => ({ locale })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/music-to-dance/2026-10-29', en: '/en/daily/music-to-dance/2026-10-29' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return <DigestLayout locale={locale} date="2026-10-29" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
    <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
    <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
    <Observation><p>{c.observation}</p></Observation>
  </DigestLayout>
}
