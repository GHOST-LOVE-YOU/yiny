import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '人类对齐音画同步奖励与低成本自回归视频蒸馏',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'SyncReward 用 8 万条专业标注建立面向生成视频的人类对齐音画同步奖励',
      'Glance Forcing 将高、低噪声去噪阶段解耦，只用一条 PF-ODE 轨迹完成自回归视频蒸馏',
      '今日更值得关注的是可训练的同步反馈与低成本实时视频骨干，而非新的舞蹈动作生成器',
    ],
    papers: [
      {
        num: 1,
        tag: '音画同步 · 人类反馈奖励',
        title: 'SyncReward: Human-Aligned Synchronization Reward for Audio-Visual Generation',
        keyPoints: [
          '构建 SyncReward-Data-80K，包含来自八种音画生成器的 8 万条专业同步评分，并以 Speech、Onset、Instrument、Ambient 四类声音事件覆盖不同对齐模式',
          '建立由多位专业标注者独立评分的 1,000 段留出基准 SyncReward-Bench，发现专用同步指标与全模态模型都和人类判断存在显著偏差',
          '奖励模型先在真实视频上进行语义—时序对比预训练，再用生成视频的人类监督对齐；既可作为指标，也能通过 best-of-N 和强化学习后训练改善同步',
        ],
        description: '这篇工作直接补上 Music-to-Dance 长期缺失的“人是否觉得同步”监督。节拍峰值或嵌入相似度只能覆盖局部信号，SyncReward 则同时建模语义与事件时序，并把专业评分变成可用于筛选和后训练的奖励。迁移到舞蹈时，应补充重拍落点、动作准备—击打延迟、乐句级动作语义和静止段等舞蹈专属标注；但其数据—基准—奖励闭环已经给出了比单一 beat alignment 更可靠的评测与优化范式。',
        href: 'https://arxiv.org/abs/2610.16338v1',
      },
      {
        num: 2,
        tag: '视频扩散蒸馏 · 自回归生成',
        title: 'Glance Forcing: Making Bidirectional Diffusion Autoregressive at a Glance',
        keyPoints: [
          '诊断单一样本轨迹蒸馏的质量崩溃来自去噪几何差异：高噪声阶段负责语义布局与运动，低噪声阶段负责细节纹理，单个学生会产生表征干扰',
          '将轨迹拆成互补的 slow/fast experts，并为两个阶段配置不同目标，同时完全冻结预训练双向扩散教师',
          '只采集一条 PF-ODE 轨迹便将 VBench Total 从强基线的 84.04 提升至 84.22，把轨迹采集从数千 GPU 小时和海量存储降至约一张 A100 的一小时',
        ],
        description: '对需要持续输出的 Music-to-Dance 视频，双向视频扩散质量高但无法直接低延迟流式运行。Glance Forcing 提供了把现有教师转换为因果少步学生的低成本路线，并揭示了运动结构与纹理细节不应由同一阶段目标硬性兼顾。其结果尚未验证音乐条件、跨块节拍相位或人体结构稳定性，因此真正迁移时应把音频条件注入高噪声运动专家，并单独评测长序列动作漂移与节拍响应。',
        href: 'https://arxiv.org/abs/2610.20220v1',
      },
    ],
    worthReading: [],
    observation: '今日严格筛选后只有两篇进入 Must Read，没有为数量加入仅命中 motion、pose 或 diffusion 的宽泛论文。两篇工作恰好构成实时 Music-to-Dance 的两端：SyncReward 让音画同步从启发式分数转为人类对齐、可训练的反馈，Glance Forcing 则显著降低高质量双向视频模型转为因果少步生成器的成本。下一步最有价值的组合实验，是用 Glance Forcing 蒸馏流式舞蹈视频骨干，再以包含舞蹈专属时序标签的 SyncReward 变体进行候选筛选或后训练；同时必须保留姿态、身份和物理接触指标，避免同步奖励提升却牺牲人体质量。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Human-Aligned Audio-Visual Rewards and Low-Cost Autoregressive Video Distillation',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'SyncReward turns 80K professional judgments into a human-aligned reward for generated audio-visual synchronization',
      'Glance Forcing separates high- and low-noise denoising regimes and distills autoregressive video from a single PF-ODE trajectory',
      'The strongest theme today is trainable synchronization feedback plus affordable real-time video backbones, not a new dance-motion generator',
    ],
    papers: [
      {
        num: 1,
        tag: 'Audio-Visual Synchronization · Human-Aligned Reward',
        title: 'SyncReward: Human-Aligned Synchronization Reward for Audio-Visual Generation',
        keyPoints: [
          'Builds SyncReward-Data-80K from 80K professional synchronization ratings across eight audio-visual generators and four event families: Speech, Onset, Instrument, and Ambient',
          'Introduces SyncReward-Bench, a 1,000-clip held-out benchmark independently rated by multiple professionals, and shows substantial disagreement between human judgments and existing specialized or omni-modal metrics',
          'Combines semantic-temporal contrastive pretraining on real clips with human supervision on generated clips; the resulting model works both as an evaluation metric and as a reward for best-of-N selection or reinforcement-learning post-training',
        ],
        description: 'This work directly addresses a missing supervision signal in Music-to-Dance: whether people actually perceive the audio and motion as synchronized. Beat peaks and embedding similarity cover only fragments of that judgment, whereas SyncReward combines event semantics with timing and turns professional ratings into a trainable selection and post-training signal. Dance transfer should add labels for accent hits, preparation-to-impact delay, phrase-level motion semantics, and intentional stillness, but the data-benchmark-reward loop is already a stronger template than a single beat-alignment score.',
        href: 'https://arxiv.org/abs/2610.16338v1',
      },
      {
        num: 2,
        tag: 'Video Diffusion Distillation · Autoregressive Generation',
        title: 'Glance Forcing: Making Bidirectional Diffusion Autoregressive at a Glance',
        keyPoints: [
          'Traces single-trajectory distillation collapse to different denoising geometries: the high-noise regime controls semantic layout and motion, while the low-noise regime controls fine texture, creating representation interference in one monolithic student',
          'Splits the trajectory into complementary slow and fast experts with stage-specific objectives while keeping the pretrained bidirectional diffusion teacher frozen',
          'With only one PF-ODE trajectory, raises VBench Total from a strong baseline’s 84.04 to 84.22 and reduces trajectory collection from thousands of GPU-hours and massive storage to roughly one A100-GPU-hour',
        ],
        description: 'Music-to-Dance systems need continuous low-latency output, while strong bidirectional video diffusion models are not naturally streamable. Glance Forcing offers an inexpensive route from such a teacher to a causal few-step student and shows why motion structure and texture detail should not be forced through one stage objective. It does not evaluate music conditioning, beat phase across chunks, or articulated-human stability, so transfer should place audio control in the high-noise motion expert and explicitly test long-horizon drift and rhythmic response.',
        href: 'https://arxiv.org/abs/2610.20220v1',
      },
    ],
    worthReading: [],
    observation: 'After strict screening, only two papers qualify for Must Read; broad matches on motion, pose, or diffusion were not added to fill space. Together they address both ends of a real-time Music-to-Dance stack. SyncReward replaces heuristic synchronization scores with human-aligned trainable feedback, while Glance Forcing makes conversion of a strong bidirectional video model into a causal few-step generator much cheaper. A useful next experiment is to distill a streaming dance-video backbone with Glance Forcing and then use a dance-specific SyncReward variant for candidate selection or post-training, while retaining pose, identity, and physical-contact metrics so synchronization gains do not hide degraded human quality.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-16',
        en: '/en/daily/music-to-dance/2026-10-16',
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
      date="2026-10-16"
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
          <div key={item} />
        ))}
      </WorthReading>

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
