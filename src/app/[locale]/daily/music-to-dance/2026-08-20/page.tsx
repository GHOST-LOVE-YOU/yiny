import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '音频驱动精确动作生成与音视频一致性奖励',
    description: '2026 年 8 月 20 日 Music-to-Dance 论文速递',
    overview: [
      '鼓手动作生成把骨架自然度与鼓槌落点精度解耦，并为音频-动作时序对齐提出可量化指标',
      'VA-Judger 用人类偏好统一评估音质、视觉质量以及跨模态语义与时间一致性',
      '实时纹理迁移、4D 人体动作表示与稀疏注意力分别补充同步、结构表征和生成效率',
    ],
    papers: [
      {
        num: 1,
        tag: '音频驱动人体动作 · 8月19日 · cs.CV/cs.GR/cs.SD',
        title: 'Generalized Audio-Driven Synthesis of Precise Drummer Motion',
        keyPoints: [
          '提出生成式扩散框架，用双目标损失解耦骨架完整性与鼓槌落点精度，在保持自然身体动态的同时追求厘米级击打控制',
          '结合自建数据集与数据增强，使模型从策划音频扩展到非策划的真实世界音频，而不依赖 MIDI 或动作匹配输入',
          '提出 impact-to-target distance 衡量空间落点，并以 audio-motion correlation score 评估音频与动作的时间对齐',
          '论文报告定量评估与用户研究，并获 SCA 2026 Best Paper Award；代码或模型是否开放仍需后续确认',
        ],
        description: '这是今天与 Music-to-Dance 最直接的论文。鼓手动作比一般舞蹈同时要求高速全身动态和严格的末端执行器落点，因此其“身体自然度/局部精度”双目标设计可迁移到脚步接触、手势命中和舞台道具交互。两项新指标也比泛化的运动质量分数更可操作：可将鼓面目标替换为节拍事件、足底接触或编舞关键位，分别诊断空间误差与音乐相位偏差。',
        href: 'https://arxiv.org/abs/2608.19055',
      },
      {
        num: 2,
        tag: '音视频偏好奖励 · 8月19日 · cs.CV',
        title: 'VA-Judger: Reward Modeling from Human Preference Feedback for Joint Video-Audio Generation',
        keyPoints: [
          '构建 VAPref-10K：覆盖 9K 提示词和 10.3K 组细粒度成对比较，用于联合音视频生成的人类偏好学习',
          '指出独立优化音质、视觉保真和同步指标会遗漏文本-视频-音频的整体语义与时间一致性，并可能诱发 reward hacking',
          '采用由易到难的偏好学习、经人工标注验证的解释蒸馏，以及按质量维度分解的强化学习来提供更密集奖励',
          '论文报告其偏好预测在域内与域外比较中优于指标基线，并已给出代码仓库链接',
        ],
        description: 'Music-to-Dance 的评测不能只把音乐质量、画面质量和节拍分数相加，因为局部指标都高的样本仍可能在动作语义、重拍选择或段落结构上违背人类感受。VA-Judger 提供了一个可借鉴的后训练闭环：先建立舞蹈专用成对偏好数据，再把动作自然度、音乐语义、节拍同步、身份一致性和镜头连贯性分维度建模，同时保留整体偏好作为约束。',
        href: 'https://arxiv.org/abs/2608.18607',
      },
    ],
    worthReading: [
      { num: 1, title: 'EfficientSync: Real-Time Lip Synchronization via Deformation-Based Reference Texture Mixing', tag: '实时音频同步 · 8月19日', href: 'https://arxiv.org/abs/2608.18832', description: '通过动态纹理混合、时空移位自适应掩码和参考帧采样，以形变和真实纹理复用替代整张下半脸重建；论文在 HDTF/VFHQ 上报告单 GPU 166 FPS。其局部形变与参考纹理保真思路可用于舞者面部、手部等高敏感区域，但当前任务仅验证口型同步。' },
      { num: 2, title: 'CL4D: Contrastive Language-4D Pretraining for Vision-Language Reasoning in Dynamic Scenes', tag: '4D 人体动作表征 · 8月19日 · ECCV 2026', href: 'https://arxiv.org/abs/2608.18734', description: '在动态点云上对齐语言与时空几何，并通过 DynAction4D 覆盖多种人体动作、物体交互和场景。它不是生成模型，但 text-to-motion 检索与显式 4D 几何编码可作为舞蹈语义检索、动作条件和几何一致性评测器。' },
      { num: 3, title: 'Partition the Support, Reconstruct the Residual: Training-Free Sparse Attention for Video Generation and World Models', tag: '视频生成稀疏注意力 · 8月19日', href: 'https://arxiv.org/abs/2608.18484', description: 'SparsePR 以响应耦合分区和探针拟合残差重建压缩视频 Transformer 注意力；论文在四类视频生成/世界模型上以 22%-26% 的执行配对密度报告 1.48x-2.61x 端到端加速。迁移到舞蹈生成时仍需单独检查快速肢体运动和节拍对齐是否受损。' },
    ],
    observation: '本期以 2026 年 8 月 19 日提交的新论文为主。代理采集成功连接 Hugging Face Daily Papers；当日 CLI 列表正常返回，但没有提供额外的合格 Music-to-Dance 论文。arXiv 在首次和延迟重试中均出现限流或超时：四个分类查询组中仅第 1 组恢复成功，第 2、3 组持续返回 429，第 4 组持续超时；因此本期明确属于 arXiv 部分覆盖，不能把未检出的领域解释为当日无论文。入选论文均来自成功返回的真实结果，并对 5 个候选再次使用 arXiv ID API 核验标题、作者、摘要、类别和 v1 日期。筛选排除了仅因 pose、motion、dance、diffusion 或 temporal 字符串误命中的导航、LLM agent、图像编辑等无关工作。技术上最值得跟进的是把舞蹈质量拆成可诊断的局部空间精度、音频-动作时间对齐和整体人类偏好，再将这些信号用于生成模型后训练。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Precise Audio-Driven Motion and Audio-Visual Coherence Rewards',
    description: 'Music-to-Dance research digest for August 20, 2026',
    overview: [
      'Drummer-motion synthesis decouples skeletal naturalness from stick-placement precision and adds measurable audio-motion alignment criteria',
      'VA-Judger learns human preferences across audio quality, visual quality, and cross-modal semantic and temporal coherence',
      'Real-time texture transfer, 4D human-motion representations, and sparse attention add complementary tools for synchronization, structure, and efficiency',
    ],
    papers: [
      {
        num: 1,
        tag: 'Audio-Driven Human Motion · Aug 19 · cs.CV/cs.GR/cs.SD',
        title: 'Generalized Audio-Driven Synthesis of Precise Drummer Motion',
        keyPoints: [
          'Introduces a generative diffusion framework whose dual-objective loss separates skeletal integrity from drumstick placement, targeting centimeter-level strikes without sacrificing natural body dynamics',
          'Uses a custom dataset and augmentation to generalize beyond curated inputs to in-the-wild audio without requiring MIDI or motion matching',
          'Proposes impact-to-target distance for spatial precision and an audio-motion correlation score for temporal alignment',
          'Reports quantitative and user-study results and received the SCA 2026 Best Paper Award; public code or model availability remains to be confirmed',
        ],
        description: 'This is today\'s most direct Music-to-Dance paper. Drumming combines fast full-body motion with strict end-effector targets, making its body-naturalness/local-precision objective relevant to foot contacts, gesture hits, and prop interaction in dance. Its metrics are also more actionable than a generic motion score: drum targets can be replaced with beat events, foot contacts, or choreographic key poses to diagnose spatial error separately from musical phase error.',
        href: 'https://arxiv.org/abs/2608.19055',
      },
      {
        num: 2,
        tag: 'Audio-Visual Preference Reward · Aug 19 · cs.CV',
        title: 'VA-Judger: Reward Modeling from Human Preference Feedback for Joint Video-Audio Generation',
        keyPoints: [
          'Builds VAPref-10K with 9K prompts and 10.3K fine-grained pairwise comparisons for human-preference learning in joint video-audio generation',
          'Argues that separate audio-quality, visual-fidelity, and synchronization metrics miss overall text-video-audio semantic and temporal coherence and can invite reward hacking',
          'Combines easy-to-hard preference learning, explanation distillation verified against human annotations, and dimension-wise reinforcement learning for denser rewards',
          'Reports stronger in-domain and out-of-domain preference prediction than metric baselines and provides a code repository',
        ],
        description: 'Music-to-Dance evaluation cannot be reduced to adding music quality, image quality, and beat scores: a clip can score well locally while violating human expectations about motion semantics, accent choice, or phrase structure. VA-Judger suggests a practical post-training loop: collect dance-specific pairwise preferences, model naturalness, musical semantics, beat synchronization, identity, and camera continuity by dimension, and retain a holistic preference signal as the constraint.',
        href: 'https://arxiv.org/abs/2608.18607',
      },
    ],
    worthReading: [
      { num: 1, title: 'EfficientSync: Real-Time Lip Synchronization via Deformation-Based Reference Texture Mixing', tag: 'Real-Time Audio Synchronization · Aug 19', href: 'https://arxiv.org/abs/2608.18832', description: 'Uses dynamic texture mixing, spatio-temporal shifted adaptive masking, and reference sampling to reuse authentic textures instead of reconstructing the entire lower face; the paper reports 166 FPS on one GPU on HDTF/VFHQ. Local deformation and texture preservation may transfer to sensitive face and hand regions, although the current evidence is limited to lip sync.' },
      { num: 2, title: 'CL4D: Contrastive Language-4D Pretraining for Vision-Language Reasoning in Dynamic Scenes', tag: '4D Human-Motion Representation · Aug 19 · ECCV 2026', href: 'https://arxiv.org/abs/2608.18734', description: 'Aligns language with spatio-temporal geometry in dynamic point clouds and uses DynAction4D to cover human motions, object interactions, and scenes. It is not a generator, but text-to-motion retrieval and explicit 4D geometry could support dance semantic retrieval, conditioning, and geometric-coherence evaluation.' },
      { num: 3, title: 'Partition the Support, Reconstruct the Residual: Training-Free Sparse Attention for Video Generation and World Models', tag: 'Sparse Attention for Video Generation · Aug 19', href: 'https://arxiv.org/abs/2608.18484', description: 'SparsePR combines response-coupled partitioning with probe-fitted residual reconstruction for video-transformer attention. Across four video-generation and world-model families, the paper reports 1.48x-2.61x end-to-end speedups at 22%-26% executed-pair density. Dance transfer still requires targeted tests for fast limb motion and beat alignment.' },
    ],
    observation: 'This issue prioritizes papers submitted on August 19, 2026. The proxied Hugging Face Daily Papers collection succeeded, and the date-specific CLI listing returned normally, but it added no qualifying Music-to-Dance paper. arXiv remained degraded across both the initial run and a delayed retry: only category group 1 recovered, groups 2 and 3 continued to return HTTP 429, and group 4 continued to time out. This is explicitly partial arXiv coverage and must not be interpreted as evidence that uncovered areas had no new papers. Every selected item came from a real successful response, and five candidates were rechecked through the arXiv ID API for title, authors, abstract, categories, and v1 date. Navigation, LLM-agent, and image-editing papers matched only by broad strings such as pose, motion, dance, diffusion, or temporal were excluded. The strongest direction is to decompose dance quality into local spatial precision, audio-motion timing, and holistic human preference, then use those signals for generative post-training.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/music-to-dance/2026-08-20', en: '/en/daily/music-to-dance/2026-08-20' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-08-20" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>
        {c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}
      </MustRead>
      <WorthReading>
        {c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
