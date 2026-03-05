import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance",
    title: "视频编辑与扩散控制：无配对学习与稳定引导的新进展",
    overview: [
      "NOVA提出稀疏控制+密集合成框架，实现无需配对数据的视频编辑",
      "CFG-Ctrl将分类器自由引导重新诠释为控制理论问题，提出滑动模态控制提升稳定性",
      "视频LLM的token压缩与多模态层次化推理技术持续演进"
    ],
    papers: [
      {
        num: 1,
        tag: "视频编辑",
        title: "NOVA：稀疏控制与密集合成的无配对视频编辑",
        description: "现有视频编辑模型大多需要大规模配对数据集，而收集自然对齐的配对数据极具挑战性。论文提出NOVA框架，采用稀疏控制+密集合成的双分支架构：稀疏分支通过分布在视频中的用户编辑关键帧提供语义引导，密集分支持续整合原始视频的运动和纹理信息以保持高保真度和连贯性。核心创新是退化模拟训练策略——通过在人工退化的视频上训练，使模型学习运动重建和时序一致性，从而消除对配对数据的需求。实验表明NOVA在编辑保真度、运动保持和时序连贯性上均优于现有方法。对于music-to-dance，这种关键帧引导+运动保持的技术路线对舞蹈视频的时序一致性和外观保持有重要参考价值。",
        keyPoints: [
          "稀疏分支：用户编辑关键帧提供语义引导",
          "密集分支：持续整合运动和纹理信息保持连贯性",
          "退化模拟训练：人工退化视频学习运动重建，无需配对数据",
          "关键帧引导+运动保持技术可迁移至舞蹈生成"
        ],
        href: "https://arxiv.org/abs/2603.02802",
        paperLink: "NOVA: Sparse Control, Dense Synthesis for Pair-Free Video Editing",
      },
      {
        num: 2,
        tag: "扩散控制",
        title: "CFG-Ctrl：基于控制理论的分类器自由扩散引导",
        description: "CFG已成为流式扩散模型中增强语义对齐的核心方法。本文将CFG重新诠释为应用于一阶连续时间生成流的控制，使用条件-无条件差异作为误差信号调整速度场。传统CFG本质上是固定增益的比例控制器（P控制），现有方法主要依赖线性控制，在大引导尺度下会导致不稳定和过冲。论文提出滑动模态控制CFG（SMC-CFG），通过定义指数滑动模态面和切换控制项建立非线性反馈引导修正，并提供Lyapunov稳定性分析支持有限时间收敛。在SD 3.5、Flux、Qwen-Image上的实验表明SMC-CFG在语义对齐上优于标准CFG，并在宽引导尺度范围内增强鲁棒性。对于舞蹈生成，这种稳定的扩散引导技术有助于提升音频-运动对齐的精确性和一致性。",
        keyPoints: [
          "将CFG重新诠释为生成流的控制问题",
          "传统CFG等价于固定增益P控制器",
          "SMC-CFG通过滑动模态实现非线性反馈修正",
          "Lyapunov稳定性分析保证有限时间收敛"
        ],
        href: "https://arxiv.org/abs/2603.03281",
        paperLink: "CFG-Ctrl: Control-Based Classifier-Free Diffusion Guidance",
      }
    ],
    worthReading: [
      {
        num: 3,
        title: "AOT：局部-全局上下文优化的视频LLM Token压缩",
        tag: "高效推理",
        href: "https://arxiv.org/abs/2603.01400",
        description: "通过局部-全局最优传输聚合信息上下文，关键帧锚点整合连续帧相似信息同时保留时序动态token。对舞蹈视频的长时序建模和效率优化有参考价值。"
      },
      {
        "num": 4,
        "title": "Mix-GRM：广度与深度协同的生成奖励模型",
        "tag": "奖励模型",
        "href": "https://arxiv.org/abs/2603.01571",
        "description": "将原始推理重构为广度CoT（多维原则覆盖）和深度CoT（实质判断合理性），B-CoT利于主观偏好任务，D-CoT excels于客观正确性任务。对舞蹈生成质量评估有启发。"
      },
      {
        num: 5,
        title: "HIER：层次化语义表示的进化多模态推理",
        tag: "多模态推理",
        href: "http://arxiv.org/abs/2603.03827v1",
        description: "三层渐进抽象语义表示（模态特定token→语义概念→概念间关系），自进化机制通过MLLM反馈动态优化。对多模态舞蹈理解任务有借鉴意义。"
      }
    ],
    observation: "今日论文显示视频生成领域正从\"需要大量配对数据\"向\"无需配对的高效学习\"转变。NOVA的退化模拟训练、CFG-Ctrl的控制理论框架都体现了用更聪明的方法而非更多数据解决问题的思路。这与music-to-dance中舞蹈数据稀缺但音频-运动对齐要求高的场景高度契合——关键在于设计有效的训练策略和稳定的生成控制机制。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "Video Editing & Diffusion Control: Advances in Pair-Free Learning and Stable Guidance",
    overview: [
      "NOVA proposes sparse control + dense synthesis framework for pair-free video editing",
      "CFG-Ctrl reinterprets CFG as control theory problem with sliding mode control for stability",
      "Video LLM token compression and multimodal hierarchical reasoning continue to evolve"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Editing",
        title: "NOVA: Sparse Control, Dense Synthesis for Pair-Free Video Editing",
        description: "Existing video editing models mostly require large-scale paired datasets, which are challenging to collect. NOVA adopts a sparse control + dense synthesis dual-branch architecture: sparse branch provides semantic guidance through user-edited keyframes, dense branch continuously integrates motion and texture information for fidelity and coherence. Core innovation is degradation-simulation training—learning motion reconstruction and temporal consistency from artificially degraded videos, eliminating paired data requirements. For music-to-dance, this keyframe-guided + motion-preserving approach offers important insights for temporal consistency and appearance preservation.",
        keyPoints: [
          "Sparse branch: user-edited keyframes provide semantic guidance",
          "Dense branch: continuous integration of motion and texture",
          "Degradation-simulation training: learn from degraded videos, no pairs needed",
          "Keyframe-guided + motion-preserving transferable to dance generation"
        ],
        href: "https://arxiv.org/abs/2603.02802",
        paperLink: "NOVA: Sparse Control, Dense Synthesis for Pair-Free Video Editing",
      },
      {
        num: 2,
        tag: "Diffusion Control",
        title: "CFG-Ctrl: Control-Based Classifier-Free Diffusion Guidance",
        description: "CFG is central for semantic alignment in flow-based diffusion. This paper reinterprets CFG as control applied to generative flow, using conditional-unconditional discrepancy as error signal. Traditional CFG is essentially P-control with fixed gain; existing methods rely on linear control causing instability at large scales. SMC-CFG defines exponential sliding mode surface and switching control for nonlinear feedback, with Lyapunov stability analysis. Experiments on SD 3.5, Flux, Qwen-Image show superior semantic alignment and robustness across guidance scales. For dance generation, this stable guidance improves audio-motion alignment precision.",
        keyPoints: [
          "Reinterprets CFG as control problem for generative flow",
          "Traditional CFG equivalent to fixed-gain P-controller",
          "SMC-CFG achieves nonlinear feedback via sliding mode",
          "Lyapunov analysis guarantees finite-time convergence"
        ],
        href: "https://arxiv.org/abs/2603.03281",
        paperLink: "CFG-Ctrl: Control-Based Classifier-Free Diffusion Guidance",
      }
    ],
    worthReading: [
      {
        num: 3,
        title: "AOT: Token Reduction via Local-Global Context Optimization",
        tag: "Efficient Inference",
        href: "https://arxiv.org/abs/2603.01400",
        description: "Aggregates informative contexts via local-global optimal transport. Keyframe anchors ensemble similar information while preserving temporal dynamics. Valuable for long dance sequence modeling."
      },
      {
        num: 4,
        title: "Mix-GRM: Breadth-Depth Synergy for Generative Reward Models",
        tag: "Reward Model",
        href: "https://arxiv.org/abs/2603.01571",
        description: "Reconstructs reasoning into Breadth-CoT and Depth-CoT. B-CoT for subjective preferences, D-CoT for objective correctness. Inspiring for dance generation quality assessment."
      },
      {
        num: 5,
        title: "HIER: Evolutionary Multimodal Reasoning via Hierarchical Semantics",
        tag: "Multimodal Reasoning",
        href: "http://arxiv.org/abs/2603.03827v1",
        description: "Three-level progressive abstraction with self-evolution mechanism refining representations via MLLM feedback. Relevant for multimodal dance understanding."
      }
    ],
    observation: "Today's papers show video generation is shifting from 'requiring massive paired data' to 'pair-free efficient learning.' NOVA's degradation-simulation training and CFG-Ctrl's control theory framework embody solving problems through smarter methods rather than more data—highly relevant for music-to-dance where dance data is scarce but audio-motion alignment demands are high.",
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