import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance",
    title: "今日论文速递（2026-03-04）",
    overview: [
      "今日 arXiv 无新论文（周末），仅 HuggingFace 推荐 4 篇",
      "DREAM 统一视觉表示学习与图像生成，提出渐进式掩码训练策略",
      "Mix-GRM 探索生成奖励模型的广度-深度推理协同机制"
    ],
    papers: [],
    worthReading: [
      {
        num: 1,
        title: "DREAM：视觉理解与图像生成的统一框架",
        tag: "视觉生成",
        href: "https://arxiv.org/abs/2603.02667",
        description: "提出联合优化判别和生成目标的统一框架，Masking Warmup渐进式掩码策略从最小掩码开始建立对比对齐，逐步过渡到完整掩码实现稳定生成训练。语义对齐解码在推理时选择最佳候选，无需外部重排序器即可提升文本-图像保真度6.3%。对music-to-dance的生成质量优化有参考价值。"
      },
      {
        num: 2,
        title: "Mix-GRM：生成奖励模型的广度与深度协同",
        tag: "奖励模型",
        href: "https://arxiv.org/abs/2603.01571",
        description: "将原始推理重构为结构化的广度CoT（多维原则覆盖）和深度CoT（实质判断合理性），通过SFT和RLVR优化。发现B-CoT利于主观偏好任务，D-CoT excels于客观正确性任务。RLVR作为切换放大器使模型自发分配推理风格匹配任务需求。可为舞蹈视频生成的质量评估提供新思路。"
      }
    ],
    observation: "今日为周二，arXiv在周一（美国时间周日）无更新。HuggingFace推荐的论文虽与music-to-dance直接关联不强，但DREAM的统一表示学习框架和Mix-GRM的奖励模型优化方法对生成任务有普适性参考价值。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "Daily Paper Digest (2026-03-04)",
    overview: [
      "No new arXiv papers today (weekend), only 4 HuggingFace recommended papers",
      "DREAM unifies visual representation learning and image generation with progressive masking strategy",
      "Mix-GRM explores synergizing breadth and depth reasoning for generative reward models"
    ],
    papers: [],
    worthReading: [
      {
        num: 1,
        title: "DREAM: Where Visual Understanding Meets Text-to-Image Generation",
        tag: "Visual Generation",
        href: "https://arxiv.org/abs/2603.02667",
        description: "Proposes a unified framework jointly optimizing discriminative and generative objectives. Masking Warmup starts with minimal masking for contrastive alignment, gradually transitioning to full masking for stable generative training. Semantically Aligned Decoding selects best candidates at inference, improving text-image fidelity by 6.3% without external rerankers."
      },
      {
        num: 2,
        title: "Mix-GRM: Synergizing Breadth and Depth for Generative Reward Models",
        tag: "Reward Model",
        href: "https://arxiv.org/abs/2603.01571",
        description: "Reconfigures raw rationales into structured Breadth-CoT and Depth-CoT through modular synthesis, optimized via SFT and RLVR. Discovers B-CoT benefits subjective preference tasks while D-CoT excels in objective correctness tasks. RLVR acts as switching amplifier inducing spontaneous reasoning style allocation."
      }
    ],
    observation: "Today is Tuesday, arXiv has no updates on Mondays (US Sunday). While HuggingFace recommended papers are not directly related to music-to-dance, DREAM's unified representation learning framework and Mix-GRM's reward model optimization methods offer generalizable insights for generation tasks.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-04`,
        'en': `/en/daily/music-to-dance/2026-03-04`,
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
      date="2026-03-04"
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