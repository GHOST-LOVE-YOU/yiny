import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '跨骨架文本动作生成与长时运动状态建模',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: ['TopX 从骨架文件泛化到训练未见角色，为动作迁移提供通用接口', 'PASPA 将慢变历史风格压缩为持久状态，把当前动作块交给局部注意力', '本期没有足够直接的音乐驱动舞蹈新作，重点转向可迁移的人体运动生成基础'],
    papers: [
      { num: 1, tag: '跨骨架文本动作 · Flow Matching', title: 'TopX: Text-to-Motion for Unseen Skeletons from the Skeleton File Alone', keyPoints: ['仅依据运动学树、静止姿态和关节名称生成关节旋转与根轨迹，不需要新角色动作片段、模板、重定向或微调', '用静止姿态归一化、骨架图热核坐标和跨关节/跨帧因子化注意力处理不同拓扑与骨架朝向', '在 SkelShift 的 2,043 个未见骨架上，报告相较 UniMate 更低的描述符 FID 与 kinetic FID，并减少下沉帧'], description: 'TopX 将动作生成接口从固定训练骨架提升到由骨架文件定义的角色。对 Music-to-Dance，这可支持不同人体比例、虚拟角色或机器人化身，减少逐角色重定向和微调；但论文目前是文本到动作，音乐节拍条件下的迁移仍需验证。', href: 'https://arxiv.org/abs/2610.34321' },
      { num: 2, tag: '长时动作 · Persistent State', title: 'Past as State, Present as Attention: Persistent-State Blockwise Flow Matching for Long-Horizon Co-Speech Motion Generation', keyPoints: ['提出 Past-As-State、Present-as-Attention：用跨块持久状态概括慢变风格，用块内双向注意力建模快速动态', '落实到 blockwise flow matching，并加入多块监督、prefill-decode 状态缓存和混合 classifier-free guidance', '公开基准取得 state-of-the-art FGD，并在长序列生成中保持运动风格'], description: 'PASPA 虽以语音共身动作为条件，却直面整首歌曲生成的同一难题：短历史会导致风格漂移，完整历史又昂贵。对 Music-to-Dance，可让持久状态保存舞者身份、动作语汇和段落风格，把当前块的节拍与乐句响应交给局部注意力；这应被视为结构迁移而非直接舞蹈基线。', href: 'https://arxiv.org/abs/2610.32373' },
    ], worthReading: [] as { num: number; title: string; tag: string; href: string; description: string }[], observation: '本期覆盖上一个工作日以来的公开结果。筛选后只有两篇与人体动作生成基础足够相关：TopX 解决角色骨架变化，PASPA 解决长时动作状态；仅命中 motion、diffusion 或 temporal 的泛论文均被排除。下一步应测试持久状态与音乐段落条件结合后，对节拍同步、足底接触和可执行性的影响。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Cross-Skeleton Text-to-Motion and Persistent State for Long-Horizon Motion',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: ['TopX generalizes motion generation to unseen characters from the skeleton file alone', 'PASPA compresses slowly varying history into persistent state while local attention models the current block', 'There were not enough directly music-driven dance papers today, so this issue focuses on transferable motion foundations'],
    papers: [
      { num: 1, tag: 'Cross-Skeleton Text-to-Motion · Flow Matching', title: 'TopX: Text-to-Motion for Unseen Skeletons from the Skeleton File Alone', keyPoints: ['Generates joint rotations and root trajectories from a kinematic tree, rest pose, and joint names without clips, templates, retargeting, or fine-tuning', 'Uses rest-pose normalization, skeleton-graph heat-kernel coordinates, and factorized joint/frame attention across topologies and orientations', 'On 2,043 unseen skeletons in SkelShift, reports lower descriptor and kinetic FIDs than UniMate and fewer frames sinking below ground'], description: 'TopX moves the motion interface from a fixed training skeleton to a character defined by its skeleton file. For Music-to-Dance, this could support different body proportions, avatars, or robot embodiments without per-character retargeting. It is currently text-to-motion rather than music-to-motion, so beat and phrase conditioning remains to be tested.', href: 'https://arxiv.org/abs/2610.34321' },
      { num: 2, tag: 'Long-Horizon Motion · Persistent State', title: 'Past as State, Present as Attention: Persistent-State Blockwise Flow Matching for Long-Horizon Co-Speech Motion Generation', keyPoints: ['Introduces Past-As-State and Present-as-Attention: persistent inter-block state summarizes style while local attention models fast dynamics', 'Uses blockwise flow matching with multi-block supervision, prefill-decode state caching, and hybrid classifier-free guidance', 'Reports state-of-the-art FGD on public benchmarks while preserving motion style over long sequences'], description: 'Although PASPA is speech-conditioned, it addresses the same failure mode as full-song dance generation: short histories drift, while retaining all history is expensive. Persistent state could retain performer identity, motion vocabulary, and section style while local attention responds to beats and phrases. This is a structural transfer, not a direct dance baseline.', href: 'https://arxiv.org/abs/2610.32373' },
    ], worthReading: [] as { num: number; title: string; tag: string; href: string; description: string }[], observation: 'This issue covers results released since the previous business day. Only two papers were sufficiently relevant after filtering: TopX addresses changing character skeletons, while PASPA addresses long-horizon motion state. Papers matching only broad terms such as motion, diffusion, or temporal were excluded. The next validation step is to combine persistent state with musical-section conditioning and test beat synchronization, foot contact, and executability.',
  },
}

export function generateStaticParams() { return locales.map(locale => ({ locale })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/music-to-dance/2026-10-27', en: '/en/daily/music-to-dance/2026-10-27' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return <DigestLayout locale={locale} date="2026-10-27" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
    <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
    <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
    <Observation><p>{c.observation}</p></Observation>
  </DigestLayout>
}
