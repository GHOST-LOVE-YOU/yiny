import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '离散动作接口、长时状态与可执行交互运动',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      '随机运动 tokenizer 将高层行为条件压缩为可执行的全身动作接口',
      'PASPA 用持久状态保持长序列风格，把当前动作块交给局部注意力',
      'Joints, Camera, Action! 联合生成视频、任意骨架的 3D 运动与相机',
      '交互动作迁移与多模态表达运动为舞蹈角色和双人编排提供可迁移模块',
    ],
    papers: [
      { num: 1, tag: '离散动作控制 · Humanoid', title: 'Whole-Body Humanoid Control via Stochastic Motion Tokenization', keyPoints: ['提出可由行为标签或文本命令生成的紧凑运动表示，并直接作为跟踪策略的详细运动参考', '随机运动 tokenizer 在相同容量下重建 Unitree G1 动作优于 FSQ 和 VQ-VAE', '真实 G1 执行了 16.8 秒的舞蹈、格斗和行走，以及 35 秒的 fight-to-dance 序列'], description: '这篇工作把舞蹈从连续控制目标变成高层控制器可生成的离散运动接口。对 Music-to-Dance，音乐段落或节拍编码可以先选择运动 token 序列，再由低层策略执行；这为把生成视频中的动作先验落到可执行人体或机器人提供了清晰的分层路径。', href: 'https://arxiv.org/abs/2610.36452' },
      { num: 2, tag: '长时动作 · Flow Matching', title: 'Past as State, Present as Attention: Persistent-State Blockwise Flow Matching for Long-Horizon Co-Speech Motion Generation', keyPoints: ['提出 Past-As-State、Present-as-Attention：跨块持久状态概括慢变风格，块内双向注意力建模快速动态', '结合 blockwise flow matching、多块监督、prefill-decode 状态缓存与混合 classifier-free guidance', '在公开基准上取得 state-of-the-art FGD，并保持长序列运动风格'], description: 'PASPA 虽然以语音共身动作为条件，却直接对应整首歌曲生成的长时难题：短历史会漂移，完整历史又昂贵。持久状态可保存舞者身份、动作语汇和段落风格，局部注意力则响应当前节拍与乐句；但音乐条件下的同步效果仍需单独验证。', href: 'https://arxiv.org/abs/2610.32373' },
      { num: 3, tag: '视频-3D 运动联合生成 · NVIDIA', title: 'Joints, Camera, Action! Co-Generating 3D Motion and Video for Arbitrary Rigs', keyPoints: ['针对任意给定骨架联合生成视频、3D 运动和注册相机，而不是只输出不可复用的像素运动', '将独立的 3D 运动模型通过少量 cross-attention 层连接到预训练视频模型，支持从文本生成动作', '训练数据接近 200K 对，并支持 video-to-rig motion、rig-to-video 与关键帧控制'], description: '该工作把“舞蹈视频看起来像在动”推进到“动作可在指定角色和场景中重放”。分离的骨架运动模型适合承接音乐节拍和动作结构，视频模型负责外观与场景；对于角色一致性、镜头注册和从视频反推动作尤其有参考价值。', href: 'https://arxiv.org/abs/2610.28632' },
    ],
    worthReading: [
      { num: 1, title: 'Mimetic Embodiment Transfer of Human-Humanoid Interaction from In-the-Wild Videos', tag: '交互动作迁移', href: 'https://arxiv.org/abs/2610.36615', description: 'HumiTransfer 保留舞蹈、拥抱等互动中的空间、语义与接触关系，并在两种 humanoid 上验证物理可执行性，可借鉴双人舞和角色重定向。' },
      { num: 2, title: 'Context-Aware Generation and Modulation of Expressive Motion Behavior using Multimodal Foundation Models', tag: '多模态表达运动', href: 'https://arxiv.org/abs/2610.35615', description: '从文本、音频、视频上下文生成可解释、可组合的全身表达运动，并通过蒸馏降低延迟；对音乐情绪和段落驱动的动作调制有直接启发。' },
    ],
    observation: '本期覆盖采集窗口内最新且与人体动作生成直接相关的结果。最值得组合的方向是“音乐条件 → 离散运动 token → 可执行跟踪”：PASPA 解决长时状态，随机 tokenizer 解决动作接口，Joints, Camera, Action! 解决从动作到视频和任意角色的闭环。arXiv 在本机采集时返回 429，Hugging Face Daily Papers 仍提供了可用候选；因此本期保留来源告警，并将音画节拍同步列为后续验证项。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Discrete Motion Interfaces, Persistent State, and Executable Interaction',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'A stochastic motion tokenizer turns high-level behavior conditions into an executable whole-body interface',
      'PASPA preserves long-horizon style in persistent state while local attention handles the current motion block',
      'Joints, Camera, Action! co-generates video, 3D motion for arbitrary rigs, and a registered camera',
      'Embodiment transfer and multimodal expressive motion offer reusable modules for dance characters and interaction',
    ],
    papers: [
      { num: 1, tag: 'Discrete Motion Control · Humanoid', title: 'Whole-Body Humanoid Control via Stochastic Motion Tokenization', keyPoints: ['Introduces compact motion representations generated from behavior labels or text and fed directly to a tracking policy as detailed references', 'The stochastic motion tokenizer reconstructs Unitree G1 motions better than FSQ and VQ-VAE at matched capacity', 'A physical G1 executes 16.8-second dance, fight, and walk motions plus a 35-second fight-to-dance sequence'], description: 'This work turns dance from a continuous control target into a discrete motion interface that a high-level controller can generate. For Music-to-Dance, musical sections or beat encodings could select motion-token sequences before a low-level policy executes them, providing a clear path from generated motion priors to executable bodies or robots.', href: 'https://arxiv.org/abs/2610.36452' },
      { num: 2, tag: 'Long-Horizon Motion · Flow Matching', title: 'Past as State, Present as Attention: Persistent-State Blockwise Flow Matching for Long-Horizon Co-Speech Motion Generation', keyPoints: ['Introduces Past-As-State and Present-as-Attention: persistent inter-block state summarizes slowly varying style while local bidirectional attention models fast dynamics', 'Combines blockwise flow matching with multi-block supervision, prefill-decode state caching, and hybrid classifier-free guidance', 'Reports state-of-the-art FGD on public benchmarks while preserving motion style over long sequences'], description: 'Although PASPA is speech-conditioned, it addresses the same failure mode as full-song dance generation: short histories drift, while retaining all history is expensive. Persistent state could retain performer identity, motion vocabulary, and section style while local attention responds to current beats and phrases; music synchronization still needs separate validation.', href: 'https://arxiv.org/abs/2610.32373' },
      { num: 3, tag: 'Video-3D Motion Co-Generation · NVIDIA', title: 'Joints, Camera, Action! Co-Generating 3D Motion and Video for Arbitrary Rigs', keyPoints: ['Co-generates video, 3D motion, and a registered camera for an arbitrary supplied rig instead of producing motion that exists only as pixels', 'Connects a separate 3D motion model to a pretrained video model through a small set of cross-attention layers', 'Uses nearly 200K training pairs and supports video-to-rig motion, rig-to-video, and keyframe-based motion control'], description: 'This work moves beyond videos that merely look like they contain dance toward motion that can be replayed on a specified character in a scene. The separated skeleton model can absorb musical timing and motion structure while the video model handles appearance and context, offering useful ideas for identity consistency, camera registration, and motion recovery.', href: 'https://arxiv.org/abs/2610.28632' },
    ],
    worthReading: [
      { num: 1, title: 'Mimetic Embodiment Transfer of Human-Humanoid Interaction from In-the-Wild Videos', tag: 'Interactive Motion Transfer', href: 'https://arxiv.org/abs/2610.36615', description: 'HumiTransfer preserves spatial, semantic, and contact relationships in interactions such as dancing and demonstrates physical execution on two humanoid embodiments, relevant to duet choreography and retargeting.' },
      { num: 2, title: 'Context-Aware Generation and Modulation of Expressive Motion Behavior using Multimodal Foundation Models', tag: 'Multimodal Expressive Motion', href: 'https://arxiv.org/abs/2610.35615', description: 'Generates interpretable and composable full-body expressive motion from text, audio, and video context, then distills it for lower latency; it directly informs music- and mood-conditioned motion modulation.' },
    ],
    observation: 'This issue covers the newest results in the collection window that directly address human motion generation. The most promising combination is music condition → discrete motion tokens → executable tracking: PASPA supplies long-horizon state, stochastic tokenization supplies the motion interface, and Joints, Camera, Action! closes the loop from motion to video and arbitrary characters. arXiv returned 429 during local collection while Hugging Face Daily Papers supplied usable candidates, so the source warning is retained and beat-level audio-visual synchronization remains a follow-up test.',
  },
}

export function generateStaticParams() { return locales.map(locale => ({ locale })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/music-to-dance/2026-10-28', en: '/en/daily/music-to-dance/2026-10-28' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return <DigestLayout locale={locale} date="2026-10-28" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
    <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
    <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
    <Observation><p>{c.observation}</p></Observation>
  </DigestLayout>
}
