import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-06-07 | 视频生成的物理一致性与高效条件机制",
    overview: [
      "LoomVideo 的 Scale-and-Add 条件机制为零开销视频编辑提供新思路",
      "PhaseLock 揭示扩散模型相位侵蚀问题，2步推理即可锁定运动先验",
      "Future-L1 的 latent 视觉推理框架可用于舞蹈动作预测"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成与编辑",
        title: "LoomVideo：统一多模态输入的高效视频生成与编辑框架",
        description: "LoomVideo 提出了一种创新的 Scale-and-Add 条件机制，彻底解决了传统视频编辑中 token 拼接导致的计算瓶颈。该方法将源视频 latent 按时间步缩放后直接加到目标噪声 latent 上，实现零额外 token 开销，推理速度提升 5.41 倍。对于 music-to-dance 任务，这一机制可直接迁移到参考人物图的外观保持——当前方案通过 patch-shuffling 实现外观迁移，而 LoomVideo 的 Negative Temporal RoPE 策略为处理多张参考图提供了更优雅的时序区分方案。此外，Deepstack 注入机制从 MLLM 的每一层提取特征并注入 DiT 对应层，这种深层语义对齐方式可增强音频-运动对齐的细粒度控制能力。",
        keyPoints: [
          "Scale-and-Add 条件机制：零额外 token，推理加速 5.41 倍，支持复杂非刚性编辑",
          "Negative Temporal RoPE：通过负时间索引区分参考图与目标帧，实现多图引导",
          "Deepstack 注入：MLLM 每层特征注入 DiT 对应层，增强多模态语义对齐"
        ],
        href: "https://arxiv.org/abs/2606.06042",
        paperLink: "LoomVideo: Unifying Multimodal Inputs into Video Generation and Editing",
      },
      {
        num: 2,
        tag: "物理一致性",
        title: "PhaseLock：在视觉细化抹除运动先验前锁定它",
        description: "这篇论文揭示了一个反直觉现象：2步推理生成的视频比 50 步推理具有更好的物理一致性。通过频谱分析，作者发现去噪过程中相位（编码运动结构）显著退化（从 step 2 到 step 50 下降约 18%），而幅度（编码外观）相对稳定。基于此，他们提出 PhaseLock——一种无需训练的 Latent Delta Guidance 方法，从 2 步推理提取运动先验并通过帧间 latent 差分引导完整去噪过程。该方法平均提升物理一致性 6.2 分，开销仅 1.06 倍时间和 1.02 倍显存。对于舞蹈视频生成，这一发现解释了为何长时序生成会出现动作不连贯：相位侵蚀导致运动结构丢失。PhaseLock 可直接集成到现有 pipeline，在保持视觉质量的同时改善舞蹈动作的物理合理性。",
        keyPoints: [
          "核心发现：2步推理物理一致性优于 50 步，因去噪过程侵蚀相位谱",
          "Latent Delta Guidance：提取 2 步推理的帧间 latent 差分作为运动先验",
          "训练无关：平均提升物理一致性 6.2 分，开销仅 1.06×时间/1.02×显存"
        ],
        href: "https://arxiv.org/abs/2606.06361",
        paperLink: "Physics in 2-Steps: Locking Motion Priors Before Visual Refinement Erases Them",
      },
      {
        num: 3,
        tag: "视觉推理 ⚠️",
        title: "Future-L1：交错式潜在视觉推理用于视频事件预测 ⚠️ 基于摘要",
        description: "Future-L1 提出了一种在自回归解码过程中交替使用语言 token 和连续潜在视觉跨度的框架，解决传统视频 MLLM 将视觉证据文本化导致细粒度运动、几何和交互线索丢失的问题。通过将潜在状态与未来帧嵌入对齐，并采用 LA-DAPO（具有结果对比和时间多样性奖励的潜在感知 RL 目标）优化采样轨迹，该方法在 FutureBench 上将 Qwen3-VL-8B 从 61.0 提升到 85.4。对于 music-to-dance 任务，这种潜在视觉推理范式可用于音乐节拍条件下的未来舞姿预测，避免文本化推理导致的动作细节丢失。",
        keyPoints: [
          "交错式潜在视觉推理：自回归解码中交替语言 token 和连续视觉潜在跨度",
          "LA-DAPO 优化：结果对比+时间多样性奖励的潜在感知 RL 目标",
          "SOTA 性能：FutureBench 上从 61.0 提升到 85.4，超越 Video-CoE 10.4 分"
        ],
        href: "https://arxiv.org/abs/2606.05769",
        paperLink: "Imagine Before You Predict: Interleaved Latent Visual Reasoning for Video Event Prediction",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Complexity-Balanced Diffusion Splitting",
        tag: "扩散模型优化",
        href: "https://arxiv.org/abs/2606.06477",
        description: "基于函数逼近理论和 de Boor 等分布原则，将扩散时间线划分为近似负担相等的段，为生成动态更难的区域分配更多表示能力。可用于优化舞蹈视频生成的推理效率。",
      },
      {
        num: 5,
        title: "Dream.exe：视频生成模型能否梦见可执行的机器人操作？",
        tag: "物理可执行性",
        href: "https://arxiv.org/abs/2606.04811",
        description: "通过视频到执行的评估框架验证生成视频的物理可执行性。可用于评估舞蹈动作的真实性和物理合理性。",
      },
      {
        num: 6,
        title: "GeoVR：从视频中学习几何表示",
        tag: "几何表示学习",
        href: "https://arxiv.org/abs/2606.05833",
        description: "通过估计帧间相机姿态、回归密集深度图、预测度量尺度因子和蒸馏多尺度 3D 特征，为 MLLM 解锁空间智能。可改善舞蹈视频的人体姿态和相机视角一致性。",
      },
      {
        num: 7,
        title: "One-to-Many Temporal Grounding",
        tag: "时序定位",
        href: "https://arxiv.org/abs/2606.06294",
        description: "针对单查询定位多个不连续视频段的 OMTG 任务，提出 Count Accuracy 和 EtF1 评估指标。可用于音乐-舞蹈对齐任务中多节拍位置的精确检测。",
      },
      {
        num: 8,
        title: "StoryVideoQA：大规模深度视频理解数据集",
        tag: "长视频理解",
        href: "https://arxiv.org/abs/2606.06338",
        description: "36.3 万 QA 对、393.2 小时故事视频的 DVU 数据集。PlotTree 层次化情节结构对处理长舞蹈序列的时间一致性有参考价值。",
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：视频生成领域正在从「追求视觉质量」转向「保证物理一致性+推理效率」。PhaseLock 揭示的相位侵蚀问题解释了当前扩散模型在生成长时序舞蹈视频时动作不连贯的根因，而其 2 步先验锁定机制提供了一种即插即用的解决方案。LoomVideo 的零开销条件机制则为实时舞蹈生成指明了方向——在保持参考人物外观一致性的同时大幅降低推理延迟。这两个工作的结合可能催生更实用的人像舞蹈生成系统。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-06-07 | Physical Consistency and Efficient Conditioning for Video Generation",
    overview: [
      "LoomVideo's Scale-and-Add conditioning enables zero-overhead video editing",
      "PhaseLock reveals phase erosion in diffusion models and locks motion priors from 2-step inference",
      "Future-L1's latent visual reasoning framework applicable to dance motion prediction"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation & Editing",
        title: "LoomVideo: Unifying Multimodal Inputs into Video Generation and Editing",
        description: "LoomVideo introduces an innovative Scale-and-Add conditioning mechanism that fundamentally solves the computational bottleneck caused by token concatenation in traditional video editing. By scaling the source video latent by timestep and directly adding it to the target noised latent, this approach achieves zero additional token overhead with 5.41× inference speedup. For music-to-dance generation, this mechanism can be directly migrated to reference person appearance preservation—current approaches use patch-shuffling for appearance transfer, while LoomVideo's Negative Temporal RoPE strategy provides a more elegant temporal distinction scheme for handling multiple reference images. Additionally, the Deepstack injection mechanism extracts features from every MLLM layer and injects them into corresponding DiT layers, enhancing fine-grained control over audio-motion alignment.",
        keyPoints: [
          "Scale-and-Add conditioning: zero extra tokens, 5.41× speedup, supports complex non-rigid editing",
          "Negative Temporal RoPE: distinguishes reference images from target frames via negative temporal indices",
          "Deepstack injection: MLLM layer-wise features injected into corresponding DiT layers for deep semantic alignment"
        ],
        href: "https://arxiv.org/abs/2606.06042",
        paperLink: "LoomVideo: Unifying Multimodal Inputs into Video Generation and Editing",
      },
      {
        num: 2,
        tag: "Physical Consistency",
        title: "PhaseLock: Locking Motion Priors Before Visual Refinement Erases Them",
        description: "This paper reveals a counter-intuitive phenomenon: 2-step inference produces videos with better physical consistency than 50-step inference. Through spectral analysis, the authors discover that phase (encoding motion structure) degrades significantly during denoising (~18% drop from step 2 to step 50), while magnitude (encoding appearance) remains relatively stable. Based on this, they propose PhaseLock—a training-free Latent Delta Guidance method that extracts motion priors from 2-step inference and guides the full denoising process via inter-frame latent differences. The method improves physical consistency by 6.2 points on average with only 1.06× time and 1.02× memory overhead. For dance video generation, this finding explains why long temporal generation suffers from motion incoherence: phase erosion leads to loss of motion structure. PhaseLock can be directly integrated into existing pipelines to improve physical plausibility of dance motions while maintaining visual quality.",
        keyPoints: [
          "Key finding: 2-step inference achieves better physical consistency than 50-step due to phase spectrum erosion",
          "Latent Delta Guidance: extracts inter-frame latent differences from 2-step inference as motion prior",
          "Training-free: 6.2 point improvement in physical consistency with only 1.06× time / 1.02× memory overhead"
        ],
        href: "https://arxiv.org/abs/2606.06361",
        paperLink: "Physics in 2-Steps: Locking Motion Priors Before Visual Refinement Erases Them",
      },
      {
        num: 3,
        tag: "Visual Reasoning ⚠️",
        title: "Future-L1: Interleaved Latent Visual Reasoning for Video Event Prediction ⚠️ Based on Abstract",
        description: "Future-L1 proposes a framework that alternates between language tokens and continuous latent visual spans during autoregressive decoding, addressing the issue that traditional video MLLMs lose fine-grained motion, geometry, and interaction cues when verbalizing visual evidence. By aligning latent states to future-frame embeddings and optimizing sampled trajectories with LA-DAPO (latent-aware RL objective with outcome-contrastive and temporal-diversity rewards), the method improves Qwen3-VL-8B from 61.0 to 85.4 on FutureBench. For music-to-dance generation, this latent visual reasoning paradigm can be applied to future dance pose prediction under music beat conditions, avoiding motion detail loss from text-based reasoning.",
        keyPoints: [
          "Interleaved latent visual reasoning: alternates language tokens and continuous visual latent spans during decoding",
          "LA-DAPO optimization: latent-aware RL with outcome-contrastive and temporal-diversity rewards",
          "SOTA performance: improves from 61.0 to 85.4 on FutureBench, surpassing Video-CoE by 10.4 points"
        ],
        href: "https://arxiv.org/abs/2606.05769",
        paperLink: "Imagine Before You Predict: Interleaved Latent Visual Reasoning for Video Event Prediction",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Complexity-Balanced Diffusion Splitting",
        tag: "Diffusion Optimization",
        href: "https://arxiv.org/abs/2606.06477",
        description: "Partitions diffusion timeline into segments of equal approximation burden based on function approximation theory. Can optimize inference efficiency for dance video generation.",
      },
      {
        num: 5,
        title: "Dream.exe: Can Video Generation Models Dream Executable Robot Manipulation?",
        tag: "Physical Executability",
        href: "https://arxiv.org/abs/2606.04811",
        description: "Evaluates physical executability of generated videos through a video-to-execution pipeline. Applicable for assessing realism and physical plausibility of dance motions.",
      },
      {
        num: 6,
        title: "GeoVR: Learning Geometric Representations from Videos",
        tag: "Geometric Representation",
        href: "https://arxiv.org/abs/2606.05833",
        description: "Unlocks spatial intelligence in MLLMs via camera pose estimation, depth regression, metric scale prediction, and 3D feature distillation. Improves human pose and camera viewpoint consistency in dance videos.",
      },
      {
        num: 7,
        title: "One-to-Many Temporal Grounding",
        tag: "Temporal Grounding",
        href: "https://arxiv.org/abs/2606.06294",
        description: "Addresses OMTG task of localizing multiple disjoint segments for single query. Proposed Count Accuracy and EtF1 metrics applicable to multi-beat detection in music-dance alignment.",
      },
      {
        num: 8,
        title: "StoryVideoQA: Large-Scale Deep Video Understanding Dataset",
        tag: "Long Video Understanding",
        href: "https://arxiv.org/abs/2606.06338",
        description: "363K QA pairs on 393.2 hours of story videos. PlotTree hierarchical plot structure offers insights for handling temporal consistency in long dance sequences.",
      },
    ],
    observation: "Today's papers reveal a clear technical trend: video generation is shifting from 'chasing visual quality' to 'ensuring physical consistency + inference efficiency'. PhaseLock's discovery of phase erosion explains the root cause of motion incoherence in current diffusion models when generating long temporal dance videos, and its 2-step prior locking mechanism provides a plug-and-play solution. LoomVideo's zero-overhead conditioning points toward real-time dance generation—maintaining reference person appearance consistency while significantly reducing inference latency. The combination of these two works could enable more practical portrait dance generation systems.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-07`,
        'en': `/en/daily/music-to-dance/2026-06-07`,
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
      date="2026-06-07"
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
