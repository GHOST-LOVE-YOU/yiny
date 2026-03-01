import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import type { Locale } from '@/lib/i18n'
import { locales } from '@/lib/i18n'
import type { Metadata } from 'next'

// 双语内容对象
const content = {
  zh: {
    title: "扩散模型遇上舞蹈生成",
    overview: [
      "第一条概览要点，用一句话概括最重要的发现",
      "第二条概览要点",
      "第三条概览要点",
    ],
    roleName: "Music-to-Dance 视频生成研究者",
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "虚构论文：基于扩散模型的音乐驱动舞蹈视频生成",
        description: "分析段落，描述这篇论文的核心贡献和对当前任务的启发...",
        keyPoints: [
          "要点一：核心技术贡献",
          "要点二：与现有方案的对比",
          "要点三：对 music-to-dance 任务的迁移价值",
        ],
        paperLink: "Fictional Dance Generation with Diffusion Models",
      },
      {
        num: 2,
        tag: "运动生成",
        title: "虚构论文：跨模态运动表示学习",
        description: "分析段落...",
        keyPoints: ["要点一", "要点二"],
        paperLink: "Cross-Modal Motion Representation Learning",
      },
      {
        num: 3,
        tag: "推理加速",
        title: "虚构论文：扩散模型一致性蒸馏新方案",
        description: "分析段落...",
        keyPoints: ["要点一", "要点二", "要点三"],
        paperLink: "Consistency Distillation for Video Diffusion",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "虚构：参考图像身份保持的新方法",
        tag: "图像生成",
        href: "https://arxiv.org/abs/0000.00004",
        description: "一句话描述该论文的核心贡献及其对当前任务的参考价值。",
      },
      {
        num: 5,
        title: "虚构：音频特征与视觉节拍对齐",
        tag: "多模态",
        href: "https://arxiv.org/abs/0000.00005",
        description: "一句话描述。",
      },
      {
        num: 6,
        title: "虚构：人体姿态估计的无监督方案",
        tag: "计算机视觉",
        href: "https://arxiv.org/abs/0000.00006",
        description: "一句话描述。",
      },
      {
        num: 7,
        title: "虚构：视频时序一致性约束",
        tag: "视频生成",
        href: "https://arxiv.org/abs/0000.00007",
        description: "一句话描述。",
      },
      {
        num: 8,
        title: "虚构：MoE 在生成模型中的应用",
        tag: "模型架构",
        href: "https://arxiv.org/abs/0000.00008",
        description: "一句话描述。",
      },
    ],
    observation: "今日观察段落，跨论文找规律，写出对当前研究方向有启发的共性洞察...",
  },
  en: {
    title: "Diffusion Models Meet Dance Generation",
    overview: [
      "First overview point summarizing the most important finding",
      "Second overview point",
      "Third overview point",
    ],
    roleName: "Music-to-Dance Video Generation",
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "Fictional: Music-Driven Dance Video Generation with Diffusion Models",
        description: "Analysis paragraph describing the core contributions of this paper and its insights for the current task...",
        keyPoints: [
          "Point 1: Core technical contribution",
          "Point 2: Comparison with existing approaches",
          "Point 3: Transfer value for music-to-dance tasks",
        ],
        paperLink: "Fictional Dance Generation with Diffusion Models",
      },
      {
        num: 2,
        tag: "Motion Generation",
        title: "Fictional: Cross-Modal Motion Representation Learning",
        description: "Analysis paragraph...",
        keyPoints: ["Point 1", "Point 2"],
        paperLink: "Cross-Modal Motion Representation Learning",
      },
      {
        num: 3,
        tag: "Inference Acceleration",
        title: "Fictional: New Consistency Distillation for Diffusion Models",
        description: "Analysis paragraph...",
        keyPoints: ["Point 1", "Point 2", "Point 3"],
        paperLink: "Consistency Distillation for Video Diffusion",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Fictional: New Method for Reference Image Identity Preservation",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/0000.00004",
        description: "One sentence describing the core contribution and its reference value for the current task.",
      },
      {
        num: 5,
        title: "Fictional: Audio Feature and Visual Beat Alignment",
        tag: "Multi-modal",
        href: "https://arxiv.org/abs/0000.00005",
        description: "One sentence description.",
      },
      {
        num: 6,
        title: "Fictional: Unsupervised Human Pose Estimation",
        tag: "Computer Vision",
        href: "https://arxiv.org/abs/0000.00006",
        description: "One sentence description.",
      },
      {
        num: 7,
        title: "Fictional: Video Temporal Consistency Constraints",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/0000.00007",
        description: "One sentence description.",
      },
      {
        num: 8,
        title: "Fictional: MoE Applications in Generative Models",
        tag: "Model Architecture",
        href: "https://arxiv.org/abs/0000.00008",
        description: "One sentence description.",
      },
    ],
    observation: "Today's observation paragraph, finding patterns across papers, and writing general insights that are inspiring for the current research direction...",
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    alternates: {
      languages: {
        'zh-CN': `/zh/daily/music-to-dance/2000-01-01`,
        'en': `/en/daily/music-to-dance/2000-01-01`,
      }
    }
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout
      locale={locale}
      date="2000-01-01"
      roleId="music-to-dance"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
      <MustRead>
        {c.papers.map((paper) => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <p>{paper.description}</p>
            <KeyPoints points={paper.keyPoints} />
            <PaperLink href={`https://arxiv.org/abs/${paper.num.toString().padStart(8, '0')}`} title={paper.paperLink} />
          </Paper>
        ))}
      </MustRead>

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

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
