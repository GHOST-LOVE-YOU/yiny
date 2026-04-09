import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "今日无重点论文：音频推理优化的一点启发",
    overview: [
      "今日 arXiv 仅 5 篇论文，无直接相关研究",
      "AudioKV 的频域处理方法对音频特征提取有一定参考价值",
      "周末论文数量较少，建议关注下周新发布"
    ],
    papers: [],
    worthReading: [
      {
        num: 1,
        title: "AudioKV：高效音频语言模型的 KV Cache 淘汰策略",
        tag: "音频推理优化",
        href: "https://arxiv.org/abs/2604.06694",
        description: "针对音频-语言模型的 KV Cache 压缩问题，提出通过语义-声学对齐机制识别音频关键注意力头，并结合 FFT 频域滤波平滑重要性分数。40% 压缩率下仅损失 0.45% 精度。⚠️ 基于摘要",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "No Priority Papers Today: A Hint from Audio Inference Optimization",
    overview: [
      "Only 5 papers on arXiv today, no directly relevant research",
      "AudioKV's frequency-domain processing offers some reference value for audio feature extraction",
      "Weekend paper volume is typically low, recommend watching next week's releases"
    ],
    papers: [],
    worthReading: [
      {
        num: 1,
        title: "AudioKV: KV Cache Eviction in Efficient Large Audio Language Models",
        tag: "Audio Inference Optimization",
        href: "https://arxiv.org/abs/2604.06694",
        description: "Addresses KV Cache compression for audio-language models by identifying audio-critical attention heads via semantic-acoustic alignment and applying FFT frequency-domain filtering to smooth importance scores. Only 0.45% accuracy loss at 40% compression ratio. ⚠️ Based on abstract",
      },
    ],
    observation: "",
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
    alternates: {
      languages: {
        'zh-CN': `/zh/daily/music-to-dance/2026-04-08`,
        'en': `/en/daily/music-to-dance/2026-04-08`,
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
      date="2026-04-08"
      roleId="music-to-dance"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
      <WorthReading>
        {c.worthReading.map((item) => (
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

      {c.observation ? (
        <Observation>
          <p>{c.observation}</p>
        </Observation>
      ) : null}
    </DigestLayout>
  )
}
