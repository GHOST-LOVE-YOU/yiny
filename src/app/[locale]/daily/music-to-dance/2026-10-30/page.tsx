import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '三维一致主体视频、多声源时序理解与音乐驱动视频评测',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'OmniShowcase 用重建表面法线与几何驱动数据合成提升大幅运镜下的主体身份和三维一致性',
      'MixCardBench 将复合音频拆为声源识别、时间定位及结构化属性描述，暴露聚合指标掩盖的时序错误',
      'VibeVideoBench 以音乐驱动作品等 239 个任务评测代码驱动视频代理，并把交付可靠性纳入评价',
    ],
    papers: [
      {
        num: 1,
        tag: '主体一致视频 · 三维几何条件',
        title: 'OmniShowcase: Omnidirectional Subject-Consistent Video Generation from Multi-View Images',
        keyPoints: [
          '构建全自动数据合成流程，沿 12 类相机运动、88 种轨迹配置生成由底层主体几何约束的视频，覆盖完整 360 度环绕',
          '从多视图参考图重建表面法线转台并作为几何条件输入视频模型，不要求条件序列与生成帧逐时对齐',
          '发布 Showcase-4K 与保留源网格、相机参数的 ShowcaseBench；实验报告主体身份和三维一致性达到 state of the art，同时保持有竞争力的视频质量与运动表现',
        ],
        description: '舞蹈视频常用环绕、推拉或侧移镜头展示全身动作，但参考图未覆盖的背面与服装区域容易在运镜中漂移。OmniShowcase 把多视图之间的三维联系显式编码成表面法线条件，并用几何一致的轨迹数据训练，可作为人物定制 Music-to-Dance 管线的主体一致性模块。它没有验证音乐—动作同步，因此价值主要在渲染层，而不是编舞层。',
        href: 'https://arxiv.org/abs/2610.35684',
      },
    ],
    worthReading: [
      { num: 1, title: 'MixCards: Evaluating Structured Descriptions of Multi-Source Sound Scenes', tag: '多声源音频 · 时间定位', href: 'https://arxiv.org/abs/2610.38276', description: 'MixCardBench 用 4,884 个最多含九个重叠语音、音乐与音效声源的合成声景，分别评测声源识别/时间定位和语义、时间、声学属性描述；最强模型平均字段分数仍仅约 60%。其结构化时间标签可用于审计舞曲中节拍、乐器与事件条件是否被正确分离和定位。' },
      { num: 2, title: 'VibeVideoBench: Evaluating Multimodal Agents on Code-Driven Video Generation', tag: '音乐驱动视频 · 代理评测', href: 'https://arxiv.org/abs/2610.35864', description: '包含 239 个中英文代码驱动视频任务，覆盖音乐驱动作品并要求在一小时内交付有声 MP4；约 13,000 条任务级 rubric、三组 VLM 裁判与盲测人工偏好形成分层评估。它不直接评测扩散式舞蹈生成，但其需求可追踪评分和“缺失交付计零”原则适合构建端到端 Music-to-Dance 生产评测。' },
    ],
    observation: '本次真实采集同时尝试 arXiv 与 Hugging Face Daily Papers。Hugging Face 成功；arXiv 四组查询中三组成功，第一组在内置重试后仍超时，因此属于降级覆盖，不能表述为完整检索。采集窗口未出现 10 月 30 日当天提交的合格论文，本期只收录尚未进入本站日报、且能明确补足 Music-to-Dance 渲染或评测链路的近期工作，不以 motion、pose、diffusion 等宽泛命中凑数。共同趋势是把质量控制从单一生成分数拆开：主体三维一致性、复合音频时间结构和最终视频交付应分别验证。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: '3D-Consistent Subject Video, Multi-Source Temporal Audio Understanding, and Music-Driven Video Evaluation',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'OmniShowcase uses reconstructed surface normals and geometry-driven data synthesis to preserve subject identity and 3D consistency under large camera motion',
      'MixCardBench decomposes polyphonic audio understanding into source identification, temporal localization, and structured attributes, exposing timing failures hidden by aggregate metrics',
      'VibeVideoBench evaluates code-driven video agents on 239 tasks including music-driven pieces and treats delivery reliability as part of quality',
    ],
    papers: [
      {
        num: 1,
        tag: 'Subject-Consistent Video · 3D Geometry Conditioning',
        title: 'OmniShowcase: Omnidirectional Subject-Consistent Video Generation from Multi-View Images',
        keyPoints: [
          'Builds a fully automated synthesis pipeline whose videos follow subject geometry across 12 camera motions and 88 trajectory configurations, including full 360-degree orbits',
          'Conditions the video model on a turntable of reconstructed surface-normal maps from multi-view references without requiring framewise temporal alignment',
          'Releases Showcase-4K and ShowcaseBench with held-out source meshes and camera parameters; experiments report state-of-the-art identity and 3D consistency with competitive video quality and motion',
        ],
        description: 'Dance videos often use orbiting, dolly, and lateral camera moves to show whole-body motion, but unseen clothing and body surfaces can drift when references cover only a few views. OmniShowcase explicitly connects those views through surface-normal geometry and geometry-consistent trajectory data. It can serve as the subject-consistency layer of a personalized Music-to-Dance pipeline. The work does not evaluate music-motion synchronization, so its contribution is primarily to rendering rather than choreography.',
        href: 'https://arxiv.org/abs/2610.35684',
      },
    ],
    worthReading: [
      { num: 1, title: 'MixCards: Evaluating Structured Descriptions of Multi-Source Sound Scenes', tag: 'Polyphonic Audio · Temporal Localization', href: 'https://arxiv.org/abs/2610.38276', description: 'MixCardBench uses 4,884 synthetic soundscapes with up to nine overlapping speech, music, and sound-effect sources, separately evaluating source identification/localization and semantic, temporal, and acoustic attributes. The strongest model reaches only about 60% mean card-field score. Its structured timing labels can audit whether beats, instruments, and events in dance music are separated and localized correctly.' },
      { num: 2, title: 'VibeVideoBench: Evaluating Multimodal Agents on Code-Driven Video Generation', tag: 'Music-Driven Video · Agent Evaluation', href: 'https://arxiv.org/abs/2610.35864', description: 'The benchmark contains 239 English and Chinese code-driven video tasks, including music-driven pieces, and requires delivery of a finished MP4 with sound within one hour. Roughly 13,000 task-specific rubric checks, three VLM judge panels, and blind human preferences provide hierarchical evaluation. It is not a diffusion dance benchmark, but its traceable requirements and zero score for missing delivery suit end-to-end Music-to-Dance production evaluation.' },
    ],
    observation: 'This run attempted live collection from both arXiv and Hugging Face Daily Papers. Hugging Face succeeded; three of four arXiv query groups succeeded, while group one still timed out after the collector’s built-in retries, so arXiv coverage is explicitly degraded rather than described as complete. The window contained no qualifying paper submitted on October 30. This issue therefore includes only recent work not previously covered by the site that clearly strengthens the Music-to-Dance rendering or evaluation stack, without padding from broad motion, pose, or diffusion keyword matches. The shared direction is decomposed quality control: subject-level 3D consistency, temporal structure in mixed audio, and final video delivery should be tested separately.',
  },
}

export function generateStaticParams() { return locales.map(locale => ({ locale })) }

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return { title: c.title, description: c.description, alternates: { languages: { 'zh-CN': '/zh/daily/music-to-dance/2026-10-30', en: '/en/daily/music-to-dance/2026-10-30' } } }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return <DigestLayout locale={locale} date="2026-10-30" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
    <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
    <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
    <Observation><p>{c.observation}</p></Observation>
  </DigestLayout>
}
