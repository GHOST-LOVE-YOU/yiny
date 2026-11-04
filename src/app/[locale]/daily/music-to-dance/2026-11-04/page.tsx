import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '音视频联合蒸馏、结构化流匹配与可泛化人体动作',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'OmniOPD 用非对称噪声、分组多噪声采样与时间步重要性加权，稳定音视频联合后训练',
      'TalkFlow 把上肢、下肢和面部拆成结构化潜流，并用跨流交互保持整体语音—动作协调',
      'One Image Is Enough 以自生成伪监督解决单参考图驱动人体视频中的身份保持问题',
      'MAPO 交替更新 MoE 路由器与专家，改善多样人体动作的策略优化和跟踪稳定性',
    ],
    papers: [
      {
        num: 1,
        tag: '联合音视频生成 · 在线蒸馏',
        title: 'OmniOPD: Stable On-Policy Distillation for Joint Audio-Video Generation',
        keyPoints: [
          '指出音频与视频 token 数量不平衡会造成音频监督稀疏，单纯提高音频损失权重并不能解决跨模态干扰',
          '用非对称噪声调度构造特权视觉信息，使音频教师在更干净的视频上下文中产生更有信息量的目标',
          '引入分组多噪声采样扩大音频监督覆盖，并以基于教师—学生转移散度的时间步重要性加权抑制不可靠信号',
          '在 JavisBench 与 VBench 上报告保持音频质量并提升视频生成效果的联合蒸馏结果',
        ],
        description: '这项工作直接对应 Music-to-Dance 的核心耦合：音乐条件、人体运动和最终视频不是三个独立评分项。它把音频监督不足具体化为 token 覆盖与上下文质量问题，并通过教师侧的视觉信息、分组噪声和逐时间步筛选来稳定优化。迁移到舞蹈生成时，值得验证的不是“音频分数是否更高”，而是节拍/音频事件是否在视觉运动改善时仍被保留；论文使用联合音视频基准，但并未专门证明音乐—舞蹈同步。',
        href: 'https://arxiv.org/abs/2611.02803',
      },
      {
        num: 2,
        tag: '语音驱动动作 · 结构化潜流',
        title: 'TalkFlow: Structured Latent Flow Matching for Speech Driven Holistic Motion Generation',
        keyPoints: [
          '学习上肢、下肢和面部表情三个连续潜表示，保留不同身体部位的动态特性而不强行压入单一潜空间',
          '在表示学习和流式生成中加入轻量跨流交互，维持面部、手势与身体动作的整体协调',
          '使用多层次语音特征进行条件流匹配，从源潜变量向自然动作潜变量学习连续传输过程',
          '在 BEAT2 上评估面部表达、身体手势质量和语音—动作同步，并辅以定性比较与用户研究',
        ],
        description: 'TalkFlow 的结构化动作空间是音乐驱动编舞的直接候选：舞蹈中的躯干、脚步、手臂和面部同样具有不同时间尺度，单一动作向量容易在细节与整体协调之间折中。其条件仍是语音而非音乐，因此不能把语音同步结果直接等同于节拍同步；但三流潜表示与跨流交互为“节拍骨架 + 局部表现”式生成提供了可复用的建模接口。',
        href: 'https://arxiv.org/abs/2610.40972',
      },
    ],
    worthReading: [
      { num: 1, title: 'One Image Is Enough: Self-Generated Supervision for Personalizing Human Video Diffusion at Test Time', tag: '单图人体视频 · 身份保持', href: 'https://arxiv.org/abs/2611.02964', description: '针对单张参考图和目标姿态序列之间缺少多姿态监督的问题，先生成关键姿态的伪真值帧，再用参考图引导筛选和低秩适配；在 TikTok 与 UBC Fashion 上改善身份与服装保持。对舞蹈而言，它可降低收集同一舞者多姿态视频的门槛，但仍需单独评估快速动作和长序列稳定性。' },
      { num: 2, title: 'MAPO: Mixture of Experts with Alternating Policy Optimization for Universal Humanoid Motion Tracking', tag: '人体动作跟踪 · MoE 策略', href: 'https://arxiv.org/abs/2611.02613', description: '发现 MoE 动态路由会使策略梯度中的新旧策略散度估计失真，提出交替优化路由器与专家；论文报告其能稳定跟踪 PPO-MoE 难以跟踪的多样人体动作。它更接近可执行动作跟踪而非视频生成，可作为舞蹈动作先验或运动控制后端的参考。' },
    ],
    observation: '本次采集同时成功覆盖 arXiv 与 Hugging Face Daily Papers，JSON 中未记录来源错误。候选的最新提交主要集中在 11 月 2 日，未发现 11 月 4 日明确属于 Music-to-Dance 的新稿，因此本期按直接相关性收录联合音视频生成和人体动作生成，并将单图身份保持与可泛化动作跟踪列为补充。编辑时排除了只命中 motion、diffusion 或 temporal 的泛泛视频论文；需要特别留意的是，TalkFlow 以语音为条件、MAPO 面向机器人跟踪，二者对音乐舞蹈的价值是方法迁移而不是已完成的音乐验证。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Joint Audio-Video Distillation, Structured Flow Matching, and Generalizable Human Motion',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'OmniOPD stabilizes joint audio-video post-training with asymmetric noise, grouped multi-noise sampling, and timestep importance weighting',
      'TalkFlow separates upper body, lower body, and face into structured latent flows while preserving holistic speech-motion coordination',
      'One Image Is Enough uses self-generated supervision to preserve identity in single-reference pose-driven human video',
      'MAPO alternates router and expert updates to improve policy optimization and tracking across diverse humanoid motions',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint Audio-Video Generation · On-Policy Distillation',
        title: 'OmniOPD: Stable On-Policy Distillation for Joint Audio-Video Generation',
        keyPoints: [
          'Identifies cross-modal token imbalance as a source of sparse audio supervision; simply increasing the audio loss weight does not remove interference',
          'Constructs privileged visual information with asymmetric noise schedules so the audio teacher receives cleaner video context',
          'Uses grouped multi-noise sampling to widen audio supervision coverage and timestep importance weights based on teacher-student transition divergence',
          'Reports joint-distillation results on JavisBench and VBench that preserve audio quality while improving video generation',
        ],
        description: 'This work targets the central coupling in Music-to-Dance: music conditioning, human motion, and the rendered video cannot be treated as three independent scores. It reframes weak audio supervision as a problem of token coverage and context quality, then stabilizes optimization with teacher-side visual information, grouped noise, and per-timestep filtering. For dance generation, the key test is whether beat and audio-event alignment survives visual improvement, not merely whether an audio score rises. The paper evaluates joint audio-video benchmarks rather than music-dance synchronization specifically.',
        href: 'https://arxiv.org/abs/2611.02803',
      },
      {
        num: 2,
        tag: 'Speech-Driven Motion · Structured Latent Flow',
        title: 'TalkFlow: Structured Latent Flow Matching for Speech Driven Holistic Motion Generation',
        keyPoints: [
          'Learns three continuous latent streams for upper-body motion, lower-body motion, and facial expression instead of forcing heterogeneous dynamics into one space',
          'Adds lightweight cross-stream interactions during representation learning and flow generation to maintain holistic coordination',
          'Performs conditional flow matching from source latents to realistic motion latents using multi-level speech features',
          'Evaluates facial expression, body-gesture quality, and speech-motion synchronization on BEAT2, with qualitative comparisons and a user study',
        ],
        description: 'TalkFlow offers a direct candidate for music-driven choreography: torso, feet, arms, and face have different temporal scales, and a single motion vector can trade away either detail or coordination. Its conditioning is speech rather than music, so the reported synchronization should not be read as beat alignment. Still, its three-stream latent structure and cross-stream interaction provide a reusable interface for generation that combines a beat-level scaffold with local expressive motion.',
        href: 'https://arxiv.org/abs/2610.40972',
      },
    ],
    worthReading: [
      { num: 1, title: 'One Image Is Enough: Self-Generated Supervision for Personalizing Human Video Diffusion at Test Time', tag: 'Single-Image Human Video · Identity Preservation', href: 'https://arxiv.org/abs/2611.02964', description: 'Addresses the missing multi-pose supervision between one reference image and a target pose sequence by generating pseudo-ground-truth frames at key poses, selecting identity-consistent samples, and training a low-rank adapter. It improves identity and garment preservation on TikTok and UBC Fashion; for dance, fast motion and long-horizon stability still require separate validation.' },
      { num: 2, title: 'MAPO: Mixture of Experts with Alternating Policy Optimization for Universal Humanoid Motion Tracking', tag: 'Human Motion Tracking · MoE Policy', href: 'https://arxiv.org/abs/2611.02613', description: 'Shows that dynamic MoE routing can distort old-versus-new policy divergence during policy-gradient updates, and alternates router and expert optimization to avoid it. Its reported tracking gains make it relevant to executable dance-motion priors or a motion-control backend, although it targets humanoid tracking rather than video generation.' },
    ],
    observation: 'This run successfully covered both arXiv and Hugging Face Daily Papers, with no source errors recorded in the JSON. The newest submissions in the collected pool were mainly from November 2; no November 4 paper was clearly specific to Music-to-Dance. The issue therefore prioritizes directly relevant joint audio-video and human-motion work, with single-image identity preservation and generalizable motion tracking as supporting reads. Papers matching only broad terms such as motion, diffusion, or temporal were excluded. TalkFlow is speech-conditioned and MAPO targets robot tracking, so their relevance is methodological transfer rather than completed music-dance validation.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-11-04',
        en: '/en/daily/music-to-dance/2026-11-04',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-11-04" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
      <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
