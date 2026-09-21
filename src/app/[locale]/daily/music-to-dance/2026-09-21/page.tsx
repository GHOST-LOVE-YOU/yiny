import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

// Monday edition: papers first submitted on Friday, 18 September (UTC).
const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '流式音频动作生成与参考视频的运动因子评测',
    description: '9 月 21 日 Music-to-Dance 日报：回顾 9 月 18 日新论文中的流式手势生成、参考视频评测与人体姿态表示',
    overview: [
      '周一回顾上一个工作日（9 月 18 日 UTC）首发论文；本次采集未检出 9 月 21 日首发候选。',
      'GestureFAR 用连续动作潜变量和逐 token 流匹配头实现因果音频驱动手势，并将流头蒸馏至单次网络评估。',
      'OmniVBench 将参考视频的运动、风格与结构拆为可核查因子；SignGPT 展示分部位的人体姿态语言生成。',
    ],
    papers: [
      {
        num: 1,
        tag: '流式音频驱动动作 · 流匹配',
        title: 'GestureFAR: Streaming Co-Speech Gesture Generation with Flow Autoregression',
        keyPoints: [
          '以因果 Transformer 建模流式音频—动作上下文，自回归预测连续动作潜变量，而非离散动作码本。',
          '逐 token 的流匹配头从连续分布采样下一个动作潜变量，以保留动作表现力和多样性。',
          '冻结因果主干，仅蒸馏多步流头：结合一致性与分布匹配目标，将每个 token 的生成压至一次网络评估。',
          '在 BEAT2 上报告流式方法中更优的质量—延迟权衡；论文研究对象是语音手势，未验证音乐节拍对齐或全身舞蹈。',
        ],
        description: '对 Music-to-Dance 最直接的启发是把“及时响应输入”与“连续动作细节”同时纳入设计：音频持续到来时，因果主干负责上下文，轻量流头负责下一段动作。头部蒸馏也比重新训练完整流模型更明确地针对在线延迟。但语音手势与舞蹈的动作幅度、脚步接触和节拍结构不同；移植时仍需专门测量节拍误差、全身运动自然度与在线延迟。',
        href: 'https://arxiv.org/abs/2609.21576v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'OmniVBench: A Benchmark and Large-Scale Dataset for Omni Reference-to-Video Generation',
        tag: '参考视频生成 · 因子化评测',
        href: 'https://arxiv.org/abs/2609.22069v1',
        description: '覆盖 7 类任务和 18 项细分任务，以 12,172 条案例清单检查运动、风格、结构等参考因子的保留与绑定，并提供 34 万条训练样本；可借鉴其分因子评测舞蹈参考动作与人物外观，但不是音乐条件生成基准。',
      },
      {
        num: 2,
        title: 'SignGPT: Toward LLM-Mediated Sign Language Interaction through Gloss-Free Translation and Generation',
        tag: '人体姿态生成 · 分部位表示',
        href: 'https://arxiv.org/abs/2609.21709v1',
        description: '在同一模型中以身体、手与面部的分层姿态表示进行手语翻译和生成，并在 How2Sign、Phoenix-2014T 上评估；对舞蹈多部位协调表示有方法参考，但未处理音乐条件或脚步接触。',
      },
    ],
    observation: '本期没有直接的音乐驱动舞蹈新作，因此只将与音频驱动运动生成最接近的 GestureFAR 列为必读。它把在线因果建模与单步流头拆开；OmniVBench 则提醒评价生成视频时必须分别检查参考运动与外观是否被正确保留。两者结合可形成“低延迟生成—因子化评估”的实验路线，但不能将语音手势结果直接当作音乐舞蹈的节拍对齐证据。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Streaming Audio-to-Motion and Factor-Level Evaluation of Reference Video',
    description: 'September 21 Music-to-Dance digest: September 18 papers on streaming gestures, reference-video evaluation, and human pose representations',
    overview: [
      'This Monday issue covers first submissions from the previous working day, September 18 UTC; the collected pool contained no September 21 first submissions.',
      'GestureFAR combines continuous motion latents with a per-token flow head for causal audio-driven gestures, then distills that head to a single evaluation.',
      'OmniVBench evaluates motion, style, and structure as distinct reference factors; SignGPT explores part-aware human pose generation.',
    ],
    papers: [
      {
        num: 1,
        tag: 'Streaming Audio-Driven Motion · Flow Matching',
        title: 'GestureFAR: Streaming Co-Speech Gesture Generation with Flow Autoregression',
        keyPoints: [
          'A causal Transformer models streaming audio-motion context and autoregresses continuous motion latents instead of discrete codebook tokens.',
          'A per-token flow-matching head samples the next latent from a continuous distribution to retain expressiveness and diversity.',
          'Head-only distillation freezes the causal backbone and uses consistency and distribution-matching objectives to reduce each token to one network evaluation.',
          'BEAT2 experiments report a stronger quality-latency trade-off among streaming methods; the task is speech gesture, not beat-synchronized full-body dance.',
        ],
        description: 'The most transferable idea for Music-to-Dance is to design for prompt response and continuous motion detail together: the causal backbone tracks incoming audio while a distilled flow head generates the next motion segment. Distilling only the head targets online latency without retraining the entire backbone. Speech gestures, however, differ from dance in range of motion, foot contact, and musical structure. Beat error, full-body realism, and live latency would need dedicated evaluation before any transfer claim.',
        href: 'https://arxiv.org/abs/2609.21576v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'OmniVBench: A Benchmark and Large-Scale Dataset for Omni Reference-to-Video Generation',
        tag: 'Reference-to-Video · Factor-Grounded Evaluation',
        href: 'https://arxiv.org/abs/2609.22069v1',
        description: 'Seven task families, 18 fine-grained tasks, and 12,172 case-specific checklist items test whether motion, style, and structure are preserved and bound correctly; a 340K-sample training set accompanies the benchmark. Useful for separating dance-reference motion from appearance fidelity, but not a music-conditioned benchmark.',
      },
      {
        num: 2,
        title: 'SignGPT: Toward LLM-Mediated Sign Language Interaction through Gloss-Free Translation and Generation',
        tag: 'Human Pose Generation · Part-Aware Representation',
        href: 'https://arxiv.org/abs/2609.21709v1',
        description: 'Uses hierarchical body, hand, and facial pose representations for both sign-language translation and generation, evaluated on How2Sign and Phoenix-2014T. Part-aware modeling may inform coordinated dance motion, although music conditioning and foot contact are outside its scope.',
      },
    ],
    observation: 'No new paper in this collection directly generates dance from music, so only GestureFAR earns a Must Read for its close audio-to-motion connection. It separates causal online modeling from one-step motion sampling; OmniVBench highlights the need to check reference motion and appearance independently. Together they suggest a low-latency generation and factor-level evaluation workflow, but speech-gesture performance is not evidence of musical beat alignment.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-21',
        en: '/en/daily/music-to-dance/2026-09-21',
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
      date="2026-09-21"
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
