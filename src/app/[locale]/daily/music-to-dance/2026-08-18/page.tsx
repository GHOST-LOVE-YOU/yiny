import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '音乐驱动舞蹈生成的组合控制、节奏保持与长视频评测',
    description: '2026 年 8 月 18 日 Music-to-Dance 论文速递',
    overview: [
      'SingDance 将歌曲演唱、角色语义与音乐驱动舞蹈组合到统一视频扩散框架中，并报告强运动-节拍对齐',
      'FlowDance 使用姿态与 RGB 并行流，把音乐-动作对应、身份保持和真实视频生成拆成可控模块',
      'CIME、SQuad 与 PersonaShot 分别补足编辑节奏、长视频效率和跨镜头连续性三个质量维度',
    ],
    papers: [
      {
        num: 1,
        tag: '歌唱-舞蹈组合生成 · 8月17日 · cs.CV/cs.SD',
        title: 'SingDance: Compositional Zero-Shot Singing-and-Dancing Video Generation with Role-Aware Audio Conditioning',
        keyPoints: [
          '提出统一视频扩散框架，把角色语义分为演唱者 source 和听众 listener，并通过硬路由选择语音、音乐和角色条件',
          '用说话视频学习口型路径，用器乐和歌曲舞蹈视频学习音乐条件身体运动，训练阶段不直接观察目标 Song/Source 组合',
          '推理时组合已学习的口型与音乐舞蹈能力，实现零样本演唱-舞蹈生成，并报告强运动-节拍对齐和可切换角色控制',
        ],
        description: '这是本期最直接的 Music-to-Dance 工作。它把“跟着音乐跳舞”和“对歌曲做演唱口型”视为可组合能力，而不是为每一种角色关系重新训练模型。对 yiny 而言，关键启发是将音频条件拆成可路由的音乐、语音和角色语义，并单独评估节拍相位保持、口型同步和身体运动质量。',
        href: 'https://arxiv.org/abs/2608.16220',
      },
      {
        num: 2,
        tag: '音乐驱动舞蹈生成 · 8月16日 · cs.CV',
        title: 'FlowDance: Music-Driven Dance Video Generation with Parallel Pose and RGB Streams',
        keyPoints: [
          '用姿态流和 RGB 流并行建模显式动作结构与参考人物视觉合成，直接面向音乐驱动舞蹈视频',
          '提出 timestep-aware pose injection，适配不同去噪阶段的结构引导，并用 persistent identity injection 保持长视频身份',
          '构建带同步音乐、RGB、3D 身体运动、相机参数和 2D 姿态标注的高分辨率真实舞蹈视频数据集',
        ],
        description: 'FlowDance 与 yiny 的目标最接近：它把 music-to-motion correspondence、身份保持、时间一致性和视频真实感放在同一个系统里处理。并行姿态/RGB 设计适合作为工程基线，数据集中的 3D 动作、相机和投影姿态标注也为节拍对齐、足部接触和镜头运动评测提供了参照。',
        href: 'https://arxiv.org/abs/2608.15818',
      },
      {
        num: 3,
        tag: '动作编辑与节奏保持 · 8月17日 · cs.CV',
        title: 'Spatial Temporal Synergy: Balancing Change and Invariance in Text Driven 3D Human Motion Editing',
        keyPoints: [
          '提出 CIME，将动作编辑中的变化与不变性分解到空间姿态和时间节奏两个维度',
          '用正负监督、层级回溯特征和细微运动保持约束姿态语义变化，同时保护原始运动结构',
          'RNIMM 使用运动学感知的非均匀时间戳复现物理节拍，避免可变长度编辑破坏内在节奏',
        ],
        description: '虽然它不是音乐条件生成器，但对舞蹈编辑的节奏保持非常直接：文本修改不应抹掉原有动作的物理节拍。yiny 可以借鉴其空间-时间解耦，把音乐节拍、动作短语边界和接触事件作为编辑时必须保持的时间结构。',
        href: 'https://arxiv.org/abs/2608.16008',
      },
    ],
    worthReading: [
      { num: 1, title: 'SQuad: Sub-Quadratic Attention Distillation for Efficient Video Generation', tag: '高效长视频生成 · 8月17日', href: 'https://arxiv.org/abs/2608.16585', description: '将视频注意力降为 O(n sqrt(n))，在 Wan 2.2 5B 上报告约 67 倍单块注意力 FLOPs 降低、约 11 倍注意力延迟降低，并把采样从 100 NFE 降到 6；迁移到舞蹈前仍需验证快速动作和节拍对齐是否退化。' },
      { num: 2, title: 'PersonaShot: Benchmarking Person-Centric Narrative Continuity in Multi-Shot Video Generation', tag: '跨镜头人物连续性评测 · 8月17日', href: 'https://arxiv.org/abs/2608.16717', description: '以约 1,000 个多镜头片段和 16 项指标评估物理连续性、情感动态与电影语法；其跨镜头状态评测可扩展为舞蹈相位、身体朝向、支撑状态和队形连续性指标。' },
    ],
    observation: '本次重新采集使用四组独立的 cs.* arXiv 小请求：cs.AI/cs.CV、cs.LG/cs.SD、cs.CL/cs.RO、cs.HC/cs.MM/cs.GR；每组最多 25 条，并对 429、5xx 和超时进行有界重试。代理采集全部成功，无来源告警。Hugging Face Daily Papers 也成功返回。筛选以 2026-08-17 为主，并保留 2026-08-16 的 FlowDance 作为周一窗口内的直接相关论文；排除了仅命中 audio、dance、motion 或 diffusion 字符串的无关论文。本期最清晰的技术路线是：用组合式音频条件控制歌唱与舞蹈，用并行姿态/RGB 流保持动作和身份，再用节奏保持、效率和跨镜头连续性补齐质量门禁。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Compositional Control, Rhythm Preservation, and Long-Video Evaluation for Music-Driven Dance',
    description: 'Music-to-Dance research digest for August 18, 2026',
    overview: [
      'SingDance composes singing, role semantics, and music-driven dance in one video diffusion framework with strong motion-beat alignment',
      'FlowDance uses parallel pose and RGB streams to separate music-motion correspondence, identity preservation, and realistic synthesis',
      'CIME, SQuad, and PersonaShot add complementary coverage for rhythm-preserving editing, long-video efficiency, and cross-shot continuity',
    ],
    papers: [
      {
        num: 1,
        tag: 'Compositional Singing and Dance · Aug 17 · cs.CV/cs.SD',
        title: 'SingDance: Compositional Zero-Shot Singing-and-Dancing Video Generation with Role-Aware Audio Conditioning',
        keyPoints: [
          'Introduces a unified video diffusion framework with source and listener role semantics and hard routing for speech, music, and role conditions',
          'Learns articulation from speaking videos and music-conditioned body motion from instrumental and song-dance videos without observing the target Song/Source combination during training',
          'Composes the learned capabilities at inference for zero-shot singing-and-dancing, reporting strong motion-beat alignment and controllable role switching',
        ],
        description: 'This is the most directly relevant Music-to-Dance paper in the issue. It treats music-driven dance and singing articulation as composable capabilities rather than retraining for every role relationship. For yiny, the key idea is to route music, speech, and role semantics separately and evaluate beat phase, lip synchronization, and body motion quality as distinct signals.',
        href: 'https://arxiv.org/abs/2608.16220',
      },
      {
        num: 2,
        tag: 'Music-Driven Dance Generation · Aug 16 · cs.CV',
        title: 'FlowDance: Music-Driven Dance Video Generation with Parallel Pose and RGB Streams',
        keyPoints: [
          'Uses parallel pose and RGB streams to model explicit motion structure and reference-preserving visual synthesis for music-driven dance video',
          'Introduces timestep-aware pose injection for denoising-stage structural guidance and persistent identity injection for long-video identity preservation',
          'Builds a high-resolution in-the-wild dance dataset with synchronized music, RGB video, 3D body motion, camera parameters, and projected 2D poses',
        ],
        description: 'FlowDance is closely aligned with yiny\'s target: it addresses music-motion correspondence, identity preservation, temporal coherence, and visual realism together. Its parallel pose/RGB design is a useful engineering baseline, while its annotations support beat alignment, foot-contact, and camera-motion evaluation.',
        href: 'https://arxiv.org/abs/2608.15818',
      },
      {
        num: 3,
        tag: 'Motion Editing and Rhythm Preservation · Aug 17 · cs.CV',
        title: 'Spatial Temporal Synergy: Balancing Change and Invariance in Text Driven 3D Human Motion Editing',
        keyPoints: [
          'Introduces CIME, separating change and invariance in motion editing across spatial pose and temporal rhythm',
          'Uses positive-negative supervision, hierarchical feature supervision, and subtle-motion preservation to constrain semantic pose changes',
          'Uses kinematics-aware non-uniform timestamps in RNIMM to reproduce physical beats during variable-length editing',
        ],
        description: 'Although it is not a music-conditioned generator, its rhythm-preservation objective is directly useful for dance editing: text changes should not erase the physical beat of the original motion. A yiny adaptation could preserve musical beats, motion-phrase boundaries, and contact events as explicit temporal constraints.',
        href: 'https://arxiv.org/abs/2608.16008',
      },
    ],
    worthReading: [
      { num: 1, title: 'SQuad: Sub-Quadratic Attention Distillation for Efficient Video Generation', tag: 'Efficient Long-Video Generation · Aug 17', href: 'https://arxiv.org/abs/2608.16585', description: 'Reduces video attention to O(n sqrt(n)); on Wan 2.2 5B it reports about 67x lower per-block attention FLOPs, about 11x lower attention latency, and sampling reduced from 100 to 6 NFEs. Dance transfer still needs tests for fast motion and beat alignment degradation.' },
      { num: 2, title: 'PersonaShot: Benchmarking Person-Centric Narrative Continuity in Multi-Shot Video Generation', tag: 'Cross-Shot Character Continuity · Aug 17', href: 'https://arxiv.org/abs/2608.16717', description: 'Evaluates physical continuity, affective dynamics, and cinematic grammar on about 1,000 multi-shot segments with 16 metrics. Its cross-shot state evaluation can be extended to dance phase, body orientation, support state, and formation continuity.' },
    ],
    observation: 'This rerun used four independent small arXiv requests over cs.* categories: cs.AI/cs.CV, cs.LG/cs.SD, cs.CL/cs.RO, and cs.HC/cs.MM/cs.GR. Each group requested at most 25 entries and used bounded retries for 429, 5xx, and timeouts. All proxied requests succeeded without source warnings, and Hugging Face Daily Papers also returned successfully. The selection prioritizes Aug 17 and retains FlowDance from Aug 16 as a directly relevant paper within the Monday coverage window. Papers matched only by broad audio, dance, motion, or diffusion strings were removed. The clearest direction is compositional audio control for singing and dance, parallel pose/RGB synthesis for motion and identity, and explicit quality gates for rhythm, efficiency, and cross-shot continuity.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/music-to-dance/2026-08-18', en: '/en/daily/music-to-dance/2026-08-18' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-08-18" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
