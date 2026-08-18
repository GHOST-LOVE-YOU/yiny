import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '高效视频生成与人物跨镜头连续性评估',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'SQuad 将视频 DiT 注意力复杂度降至次二次，并把 Wan 2.2 5B 的采样从 100 NFE 压缩到 6 NFE',
      'PersonaShot 用约 1,000 个多镜头片段和 16 项指标评估人物物理、情感与电影语法连续性',
      '生成中语义纠错与视觉上下文编辑为动作语义控制和舞蹈视频后期提供新工具',
    ],
    papers: [
      {
        num: 1,
        tag: '注意力蒸馏 · 高效视频生成 · 8月17日',
        title: 'SQuad: Sub-Quadratic Attention Distillation for Efficient Video Generation',
        keyPoints: [
          '提出 SQuad-Attention，将蒸馏后注意力复杂度控制在 O(n sqrt(n))，在视频长序列中平衡线性近似的效率与完整 softmax 注意力的表达能力',
          '采用两阶段蒸馏：先进行 Flow-Matching 监督微调，再使用改进的 DMD2 同时压缩注意力与采样步数，无需从头训练视频 DiT',
          '在 Wan 2.2 5B 文生视频模型上达到 83.20 VBench，略高于二次复杂度教师的 83.08',
          '单步单块注意力 FLOPs 约降低 67 倍、注意力延迟约降低 11 倍、端到端 DiT 延迟降低 2 倍，并将采样从默认 100 NFE 降到 6 NFE',
        ],
        description: 'SQuad 对 Music-to-Dance 的价值在于同时处理长视频的 token 成本和扩散采样延迟。舞蹈视频需要高帧率来保留快速肢体变化，音乐条件、参考人物与姿态控制又会进一步扩大序列和条件计算；次二次注意力让更长或更高分辨率的生成更可行，6 NFE 则接近交互式预览所需的延迟区间。论文只在通用文生视频上报告结果，尚未验证快速动作、足部接触或节拍对齐是否会在注意力蒸馏后退化，因此迁移时应补充音乐-动作同步与细粒度运动指标。',
        href: 'https://arxiv.org/abs/2608.16585v1',
      },
      {
        num: 2,
        tag: '人物连续性 · 多镜头视频评测 · 8月17日',
        title: 'PersonaShot: Benchmarking Person-Centric Narrative Continuity in Multi-Shot Video Generation',
        keyPoints: [
          '提出首个人物中心的多镜头叙事连续性基准，包含约 1,000 个多镜头片段和 16 项指标',
          '从镜头内状态、跨镜头转场和序列级轨迹三个时间层次评估人物一致性',
          '覆盖物理连续性、情感动态和电影语法，并为不同准则训练与专家判断对齐的轻量专用评估器',
          '系统评测发现感知质量与跨镜头连续性存在明显鸿沟：高观感视频仍常出现物理状态重置、情感突变和镜头关系断裂',
        ],
        description: 'PersonaShot 为长篇舞蹈与多机位编舞补上了单镜头指标缺失的一层。Music-to-Dance 系统不能只检查人物外观是否一致，还应验证动作相位在剪辑点是否延续、身体朝向和支撑状态是否合理、情绪强度是否随音乐段落平滑演化。其分层评测框架可扩展为舞蹈专用指标，把节拍相位、动作短语和队形关系加入跨镜头连续性检查。需要注意的是，该基准面向通用人物叙事，并未包含音乐条件或舞蹈动作的专项标注。',
        href: 'https://arxiv.org/abs/2608.16717v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'MLLM-Guided Semantic Correction for Text-to-Video Generation', tag: '生成中语义纠错 · 8月17日', href: 'https://arxiv.org/abs/2608.16513v1', description: '把多模态大模型反馈直接注入扩散采样循环，通过中间预览诊断偏差并干预潜变量轨迹；可借鉴为舞蹈生成增加动作、服装和场景语义的在线检查，但论文尚未评估音乐同步。' },
      { num: 2, title: 'VicEdit: Learning to Edit Videos from Visual In-Context Examples', tag: '视觉上下文视频编辑 · 8月17日', href: 'https://arxiv.org/abs/2608.16745v1', description: '以单图、图像对和视频对作为视觉示例，结合模态自适应语义蒸馏与双上下文注入完成可控编辑；适合探索用动作示例修正舞蹈视频的局部动态与风格。' },
    ],
    observation: '本期真实采集覆盖 arXiv 与 Hugging Face Daily Papers。首次代理采集时 arXiv 超时，代理重试返回 503；随后无代理重试成功取得最新 100 篇分类候选，因此 arXiv 覆盖恢复。Hugging Face 接口两次请求均成功，但其 100 篇列表的最新条目停留在 8 月 14 日，没有提供本期 8 月 17 日新论文，也没有与入选论文形成重复来源。人工筛选排除了仅因 dance、motion、diffusion 等字符串片段或宽泛词命中的无关工作。今天最明确的组合方向是“先降低长视频生成成本，再把人物连续性纳入评测”：SQuad 解决生成侧的注意力与采样瓶颈，PersonaShot 则揭示高视觉质量不等于跨镜头动作和状态连续。对 Music-to-Dance 而言，下一步应在高效生成模型上联合检查节拍同步、足部接触、动作短语连续性与跨镜头相位保持。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Efficient Video Generation and Cross-Shot Character Continuity',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'SQuad brings Video DiT attention below quadratic complexity and distills Wan 2.2 5B sampling from 100 to 6 NFEs',
      'PersonaShot evaluates physical, affective, and cinematic character continuity with about 1,000 multi-shot segments and 16 metrics',
      'Mid-generation semantic correction and visual in-context editing add new tools for motion control and dance-video post-production',
    ],
    papers: [
      {
        num: 1,
        tag: 'Attention Distillation · Efficient Video Generation · Aug 17',
        title: 'SQuad: Sub-Quadratic Attention Distillation for Efficient Video Generation',
        keyPoints: [
          'Introduces SQuad-Attention with O(n sqrt(n)) complexity, balancing the efficiency of linear approximations with the expressivity of full softmax attention on long video sequences',
          'Uses two-stage distillation: Flow-Matching supervised fine-tuning followed by improved DMD2 to compress both attention and sampling without training a Video DiT from scratch',
          'Scores 83.20 on VBench with Wan 2.2 5B text-to-video, slightly above the quadratic teacher at 83.08',
          'Cuts per-step per-block attention FLOPs by about 67x, attention latency by about 11x, end-to-end DiT latency by 2x, and sampling from the default 100 NFEs to 6',
        ],
        description: 'SQuad addresses both token cost and diffusion latency for longer video generation. Dance video needs sufficient frame rate to preserve fast body movement, while music, identity references, and pose controls further enlarge the sequence and conditioning workload. Sub-quadratic attention makes longer or higher-resolution generation more practical, and six-step sampling approaches the latency needed for interactive previews. The paper reports only general text-to-video results; transfer should therefore test whether rapid motion, foot contact, or beat alignment degrades after attention distillation.',
        href: 'https://arxiv.org/abs/2608.16585v1',
      },
      {
        num: 2,
        tag: 'Character Continuity · Multi-Shot Video Evaluation · Aug 17',
        title: 'PersonaShot: Benchmarking Person-Centric Narrative Continuity in Multi-Shot Video Generation',
        keyPoints: [
          'Introduces the first person-centric multi-shot narrative-continuity benchmark, with about 1,000 multi-shot segments and 16 metrics',
          'Evaluates character coherence at three temporal levels: within-shot states, cross-shot transitions, and sequence-level trajectories',
          'Covers physical continuity, affective dynamics, and cinematic grammar with lightweight criterion-specific evaluators aligned to expert judgments',
          'Finds a clear gap between perceptual quality and cross-shot continuity: visually strong videos still reset physical states, shift affect abruptly, and break cinematic relations',
        ],
        description: 'PersonaShot adds an evaluation layer missing from long-form and multi-camera dance generation. A music-to-dance system should check more than appearance identity: motion phase should survive cuts, body orientation and support states should remain plausible, and emotional intensity should evolve with musical sections. Its hierarchical framework could be extended with dance-specific beat phase, motion phrase, and formation metrics. The current benchmark targets general person-centric narratives and does not include music conditioning or dedicated dance annotations.',
        href: 'https://arxiv.org/abs/2608.16717v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'MLLM-Guided Semantic Correction for Text-to-Video Generation', tag: 'Mid-Generation Semantic Correction · Aug 17', href: 'https://arxiv.org/abs/2608.16513v1', description: 'Injects MLLM feedback into the diffusion loop, using intermediate previews to diagnose deviations and intervene in latent trajectories. It could support online checks for action, costume, and scene semantics in dance generation, although music synchronization is not evaluated.' },
      { num: 2, title: 'VicEdit: Learning to Edit Videos from Visual In-Context Examples', tag: 'Visual In-Context Video Editing · Aug 17', href: 'https://arxiv.org/abs/2608.16745v1', description: 'Uses single images, image pairs, and video pairs as visual examples, combining modality-adaptive semantic distillation with dual-context injection. The approach may support local correction of dance dynamics and style from motion examples.' },
    ],
    observation: 'This issue used live collection from both arXiv and Hugging Face Daily Papers. The first proxied arXiv request timed out and a proxied retry returned HTTP 503; a subsequent direct retry succeeded and supplied the latest 100 category-bounded candidates, restoring arXiv coverage. Both Hugging Face requests succeeded, but its 100-paper response ended with Aug 14 entries and supplied no new Aug 17 papers or duplicate provenance for the selected work. Manual review removed papers matched only by substring artifacts or broad terms such as dance, motion, and diffusion. The clearest combined direction is to reduce long-video generation cost while evaluating character continuity explicitly: SQuad tackles attention and sampling bottlenecks, while PersonaShot shows that visual quality does not guarantee coherent motion and state across cuts. Music-to-dance evaluation should now combine efficient generation with beat synchronization, foot contact, motion-phrase continuity, and cross-shot phase preservation.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-08-18',
        en: '/en/daily/music-to-dance/2026-08-18',
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
      date="2026-08-18"
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
