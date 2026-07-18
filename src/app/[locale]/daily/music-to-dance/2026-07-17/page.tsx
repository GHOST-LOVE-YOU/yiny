import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "视频生成评估新基准：多参考条件与关键帧控制",
    overview: [
      "MultiRef-Compass 提出 MR2AV 任务统一评估框架，14 项指标覆盖音频-视觉一致性",
      "KeyFrame-Compass 揭示关键帧保真度与视频自然度的根本性 trade-off",
      "两篇基准均来自 Kling Team，反映工业界对可控视频生成的关注焦点"
    ],
    papers: [
      {
        num: 1,
        tag: "基准评估",
        title: "MultiRef-Compass：多参考音频-视频生成统一评估基准",
        description: "这篇论文针对 Multi-reference-to-Audio-Video (MR2AV) 生成任务提出了首个统一评估基准。与 music-to-dance 任务高度相关：两者都需要处理多模态条件（参考图像 + 音频/文本）生成同步视频。论文构建的 350 个测试样本覆盖多视角主体保持、多实体绑定、人-物-场景组合三大场景。评估框架的四个维度（基础质量、参考一致性、音频-视觉一致性、指令遵循）中，Audio-Visual Consistency 维度下的 Speech-Lip Synchronization、Event-Sound Correspondence 等指标可直接迁移到舞蹈生成的音乐节拍对齐评估。论文揭示的 identity splitting、attribute leakage 等失败模式，与舞蹈生成中常见的身份漂移、外观泄露问题高度一致。",
        keyPoints: [
          "提出 14 项细粒度指标，覆盖音频-视觉一致性的时间同步与事件-声音对应",
          "揭示多参考条件下的三大失败模式：identity splitting、compositional binding 错误、copy-and-paste 伪影",
          "评估框架可直接迁移：将 speech-lip sync 替换为 music-motion beat 对齐评估"
        ],
        href: "https://arxiv.org/abs/2607.14189",
        paperLink: "MultiRef-Compass: Towards Comprehensive Evaluation of Multi-Reference-to-Audio-Video Generation",
      },
      {
        num: 2,
        tag: "基准评估",
        title: "KeyFrame-Compass：关键帧条件视频生成的诊断性基准",
        description: "这篇论文首次系统评估 keyframe-conditioned video generation 任务，与 music-to-dance 中的参考人物图保持任务直接对应。论文构建的 386 个样本覆盖 3/6/9/12 个关键帧密度，揭示了一个关键发现：当前模型在 keyframe fidelity 与 natural video synthesis 之间存在根本性 trade-off——严格遵循关键帧的模型往往产生突兀过渡，而生成自然视频的模型则会偏离关键帧内容。这一发现对舞蹈生成至关重要：我们的任务同样面临外观保持（参考图）与运动自然度（舞蹈流畅性）的平衡。论文提出的六项关键帧响应指标（presence、fidelity、ordering、timing、persistence、uniqueness）可作为舞蹈生成中参考人物保持能力的评估模板。",
        keyPoints: [
          "揭示关键帧保真度与视频自然度的根本性 trade-off，与舞蹈生成的外观-运动平衡问题对应",
          "提出六项关键帧执行指标：presence、fidelity、ordering、timing、persistence、uniqueness",
          "发现开源模型在多关键帧理解上与闭源模型存在显著差距（0.153 分）"
        ],
        href: "https://arxiv.org/abs/2607.14202",
        paperLink: "KeyFrame-Compass: Towards Comprehensive Evaluation of Keyframe-Conditioned Video Generation",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "VideoChat3：高效通用视频理解 MLLM",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2607.14935",
        description: "I3D-ViT 和 Adaptive Frame Resolution 设计对舞蹈视频长序列建模和高效推理有参考价值。",
      },
      {
        num: 4,
        title: "HDR：分层去噪多步视觉推理",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2607.15278",
        description: "分层潜变量架构和 SHAP 注意力模式可能适用于舞蹈生成的长程时间一致性建模。",
      },
      {
        num: 5,
        title: "D2DF：一步视频对象移除",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2607.14976",
        description: "一步视频生成技术路径对降低舞蹈生成推理成本有启发意义。",
      },
      {
        num: 6,
        title: "MeanFlowNFT：平均速度生成器 RL 优化",
        tag: "高效采样",
        href: "https://arxiv.org/abs/2607.15273",
        description: "少步采样优化与 RL 结合的方法，对加速舞蹈视频生成有潜在借鉴价值。",
      },
    ],
    observation: "今日两篇重点论文均来自 Kling Team（可灵团队），反映出工业级视频生成系统对可控性评估的迫切需求。MultiRef-Compass 和 KeyFrame-Compass 分别从多参考条件和关键帧控制两个角度，建立了系统性的评估框架。对于 music-to-dance 研究而言，这些基准的指标设计具有直接迁移价值：将 audio-visual consistency 转换为 music-motion beat alignment，将 keyframe fidelity 转换为 reference person consistency。值得注意的是，两篇论文都揭示了可控性与生成质量之间的 trade-off，这与当前舞蹈生成中外观保持与运动自然度的平衡困境相呼应。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "New Benchmarks for Video Generation: Multi-Reference Conditioning & Keyframe Control",
    overview: [
      "MultiRef-Compass proposes a unified evaluation framework for MR2AV tasks with 14 metrics covering audio-visual consistency",
      "KeyFrame-Compass reveals the fundamental trade-off between keyframe fidelity and video naturalness",
      "Both benchmarks from Kling Team reflect industry focus on controllable video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Benchmark",
        title: "MultiRef-Compass: Unified Benchmark for Multi-Reference-to-Audio-Video Generation",
        description: "This paper introduces the first unified evaluation benchmark for Multi-reference-to-Audio-Video (MR2AV) generation. Highly relevant to music-to-dance: both tasks require processing multimodal conditions (reference images + audio/text) to generate synchronized video. The 350 test samples cover multi-view subject preservation, multi-entity binding, and human-object-scene composition. Among the four evaluation dimensions (Basic Quality, Reference Consistency, Audio-Visual Consistency, Instruction Following), the Audio-Visual Consistency metrics—Speech-Lip Synchronization and Event-Sound Correspondence—can be directly adapted for beat alignment evaluation in dance generation. The failure modes identified (identity splitting, attribute leakage) closely mirror the identity drift and appearance leakage issues common in dance generation.",
        keyPoints: [
          "Proposes 14 fine-grained metrics covering temporal synchronization and event-sound correspondence in audio-visual consistency",
          "Reveals three failure modes in multi-reference conditioning: identity splitting, compositional binding errors, copy-and-paste artifacts",
          "Evaluation framework is directly transferable: replace speech-lip sync with music-motion beat alignment evaluation"
        ],
        href: "https://arxiv.org/abs/2607.14189",
        paperLink: "MultiRef-Compass: Towards Comprehensive Evaluation of Multi-Reference-to-Audio-Video Generation",
      },
      {
        num: 2,
        tag: "Benchmark",
        title: "KeyFrame-Compass: Diagnostic Benchmark for Keyframe-Conditioned Video Generation",
        description: "This paper presents the first systematic evaluation of keyframe-conditioned video generation, directly corresponding to the reference person preservation task in music-to-dance. The 386 samples cover keyframe densities of 3/6/9/12, revealing a critical finding: current models exhibit a fundamental trade-off between keyframe fidelity and natural video synthesis—models that strictly follow keyframes tend to produce abrupt transitions, while models generating natural videos drift from keyframe content. This finding is crucial for dance generation, which faces the same balance between appearance preservation (reference image) and motion naturalness (dance fluidity). The six keyframe response metrics (presence, fidelity, ordering, timing, persistence, uniqueness) can serve as an evaluation template for reference person preservation in dance generation.",
        keyPoints: [
          "Reveals fundamental trade-off between keyframe fidelity and video naturalness, corresponding to the appearance-motion balance in dance generation",
          "Proposes six keyframe execution metrics: presence, fidelity, ordering, timing, persistence, uniqueness",
          "Identifies significant gap between open-source and proprietary models in multi-keyframe understanding (0.153 points)"
        ],
        href: "https://arxiv.org/abs/2607.14202",
        paperLink: "KeyFrame-Compass: Towards Comprehensive Evaluation of Keyframe-Conditioned Video Generation",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "VideoChat3: Efficient Generalist Video MLLM",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2607.14935",
        description: "I3D-ViT and Adaptive Frame Resolution designs offer reference value for long-sequence modeling and efficient inference in dance video.",
      },
      {
        num: 4,
        title: "HDR: Hierarchical Denoising for Multi-Step Visual Reasoning",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2607.15278",
        description: "Hierarchical latent architecture and SHAP attention patterns may apply to long-range temporal consistency modeling in dance generation.",
      },
      {
        num: 5,
        title: "D2DF: One-Step Video Object Removal",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2607.14976",
        description: "One-step video generation approach offers insights for reducing inference costs in dance generation.",
      },
      {
        num: 6,
        title: "MeanFlowNFT: RL Optimization for Average-Velocity Generators",
        tag: "Efficient Sampling",
        href: "https://arxiv.org/abs/2607.15273",
        description: "Few-step sampling optimization combined with RL has potential value for accelerating dance video generation.",
      },
    ],
    observation: "Today's two highlighted papers both come from Kling Team, reflecting the urgent need for controllability evaluation in industrial video generation systems. MultiRef-Compass and KeyFrame-Compass establish systematic evaluation frameworks from the perspectives of multi-reference conditioning and keyframe control respectively. For music-to-dance research, the metric designs in these benchmarks have direct transfer value: converting audio-visual consistency to music-motion beat alignment, and keyframe fidelity to reference person consistency. Notably, both papers reveal trade-offs between controllability and generation quality, echoing the current dilemma in dance generation between appearance preservation and motion naturalness.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-17`,
        'en': `/en/daily/music-to-dance/2026-07-17`,
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
      date="2026-07-17"
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
