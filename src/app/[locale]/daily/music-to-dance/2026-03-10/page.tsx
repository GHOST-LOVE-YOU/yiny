import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance",
    title: "概念定制化中的模型保持与纯学习",
    overview: [
      "PureCC 提出解耦学习目标，在保持原模型能力的同时实现高保真概念定制",
      "双分支训练架构：冻结提取器提供纯净概念表征，可训练流模型保持原条件预测",
      "自适应引导尺度 λ* 动态平衡定制保真度与模型保持"
    ],
    papers: [
      {
        num: 1,
        tag: "概念定制",
        title: "PureCC：解耦学习目标实现纯概念学习",
        description: "PureCC 针对现有概念定制化方法破坏原模型行为的问题，提出了一个创新的解耦学习目标。该方法将目标概念的隐式引导与原条件预测分离，通过双分支架构实现：一个冻结的表征提取器提供纯净的目标概念表征作为隐式引导，一个可训练的流模型生成原条件预测。这种分离形式使模型在学习个性化概念时能充分考虑原模型行为。此外，论文提出的自适应引导尺度 λ* 基于双分支表征对齐动态调整目标概念引导强度，有效平衡了定制保真度与模型保持。对于 music-to-dance 任务，当前 patch-shuffling 外观迁移策略可能破坏原扩散模型的生成能力，PureCC 的双分支思想可直接迁移：用一个冻结分支保持原模型的运动生成能力，另一个分支专门学习目标人物外观，避免外观学习对动作质量的影响。",
        keyPoints: [
          "解耦学习目标：将目标概念隐式引导与原条件预测分离，避免分布漂移",
          "双分支架构：冻结提取器提供纯净概念表征，可训练模型保持原预测能力",
          "自适应引导尺度 λ*：基于表征对齐动态调整，平衡保真度与模型保持"
        ],
        href: "https://arxiv.org/abs/2603.07561",
        paperLink: "PureCC: Pure Learning for Text-to-Image Concept Customization",
      },
    ],
    worthReading: [
      {
        num: 2,
        title: "注意力引导的视觉锚定与反思",
        tag: "多模态推理",
        href: "https://arxiv.org/abs/2603.03825",
        description: "提出 VAS 指标量化模型对视觉 token 的关注度，发现推理性能与 VAS 强相关(r=0.9616)。可借鉴到 3D Audio Attention 的注意力分配诊断。",
      },
    ],
    observation: "今日论文数量较少（仅4篇），但 PureCC 的双分支训练思想对 video generation 的外观保持问题有直接启发。当前 music-to-dance 的 patch-shuffling 策略在迁移参考人物外观时，可能无意中破坏了原模型生成自然动作的能力。借鉴 PureCC 的「冻结分支保持原能力 + 可训练分支学习目标」架构，或许可以设计一个类似的解耦方案：冻结原扩散模型的 motion 相关层，仅训练外观适配模块，从而在保持动作质量的同时实现更好的身份保持。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "Model Preservation and Pure Learning in Concept Customization",
    overview: [
      "PureCC proposes decoupled learning objectives for high-fidelity customization while preserving original model capabilities",
      "Dual-branch architecture: frozen extractor provides pure concept representations, trainable flow model maintains original conditional prediction",
      "Adaptive guidance scale λ* dynamically balances customization fidelity and model preservation"
    ],
    papers: [
      {
        num: 1,
        tag: "Concept Customization",
        title: "PureCC: Decoupled Learning for Pure Concept Learning",
        description: "PureCC addresses the issue of existing concept customization methods disrupting original model behavior by proposing an innovative decoupled learning objective. The method separates implicit guidance of the target concept from original conditional prediction through a dual-branch architecture: a frozen representation extractor provides purified target concept representations as implicit guidance, while a trainable flow model generates original conditional predictions. This separated form allows the model to fully consider original model behavior when learning personalized concepts. Additionally, the adaptive guidance scale λ* dynamically adjusts target concept guidance strength based on cross-branch representation alignment, effectively balancing customization fidelity and model preservation. For music-to-dance tasks, current patch-shuffling appearance transfer strategies may compromise the original diffusion model's generation capabilities. PureCC's dual-branch concept can be directly transferred: use a frozen branch to preserve the original model's motion generation capability, and another branch dedicated to learning target person appearance, avoiding the impact of appearance learning on motion quality.",
        keyPoints: [
          "Decoupled learning objective: separates target concept implicit guidance from original conditional prediction to avoid distribution drift",
          "Dual-branch architecture: frozen extractor provides pure concept representations, trainable model maintains original prediction capability",
          "Adaptive guidance scale λ*: dynamically adjusts based on representation alignment, balancing fidelity and model preservation"
        ],
        href: "https://arxiv.org/abs/2603.07561",
        paperLink: "PureCC: Pure Learning for Text-to-Image Concept Customization",
      },
    ],
    worthReading: [
      {
        num: 2,
        title: "Attention-Guided Visual Anchoring and Reflection",
        tag: "Multimodal Reasoning",
        href: "https://arxiv.org/abs/2603.03825",
        description: "Proposes VAS metric to quantify model attention to visual tokens, finding strong correlation (r=0.9616) between reasoning performance and VAS. Can inspire 3D Audio Attention diagnostics.",
      },
    ],
    observation: "Limited paper volume today (only 4 papers), but PureCC's dual-branch training concept offers direct inspiration for appearance preservation in video generation. Current music-to-dance patch-shuffling strategies may inadvertently compromise the original model's ability to generate natural motions when transferring reference person appearance. Drawing from PureCC's 'frozen branch preserves original capability + trainable branch learns target' architecture, a similar decoupled approach could be designed: freeze original diffusion model's motion-related layers while only training appearance adaptation modules, achieving better identity preservation while maintaining motion quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-10`,
        'en': `/en/daily/music-to-dance/2026-03-10`,
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
      date="2026-03-10"
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
            <PaperLink href={paper.href} title={paper.paperLink} />
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

      {c.observation ? (
        <Observation>
          <p>{c.observation}</p>
        </Observation>
      ) : null}
    </DigestLayout>
  )
}
