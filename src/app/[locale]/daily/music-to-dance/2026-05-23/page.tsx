import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "音频-视觉对齐与运动建模新思路",
    overview: [
      "Bernini 提出 MLLM 语义规划 + DiT 渲染的解耦架构，为音频驱动生成提供新范式",
      "LatentOmni 在统一潜空间中进行音频-视觉联合推理，改善时序对齐精度",
      "AnyMo 通过几何感知 IMU 模拟实现 setup-agnostic 的人体运动建模"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "Bernini：MLLM 语义规划与 DiT 渲染的统一视频生成框架",
        description: "Bernini 提出将多模态大语言模型（MLLM）与扩散模型解耦协作的新范式：MLLM-based Planner 在 ViT 嵌入空间进行语义规划，预测目标视觉表征；DiT-based Renderer 基于语义嵌入和源 VAE 特征进行流匹配去噪生成。关键创新包括 Segment-Aware 3D RoPE（处理多视觉输入的段感知位置编码）和 Chain-of-Thought 潜空间推理。对于 music-to-dance 任务，这种语义-像素分离架构极具迁移价值：音频编码器可替代 MLLM 提取节拍语义特征，扩散模型负责生成对应舞蹈动作，SA-3D RoPE 可处理参考人物图与生成视频的跨帧对齐。",
        keyPoints: [
          "MLLM Planner 在 ViT 嵌入空间预测目标语义表征，作为 DiT 的 cross-attention 条件",
          "SA-3D RoPE 通过段索引条件相位调制区分不同视觉源的 token，解决多输入身份歧义",
          "两阶段训练策略：Planner 与 Renderer 分别预训练后轻量 co-training，保留各自预训练能力"
        ],
        href: "https://arxiv.org/abs/2605.22344",
        paperLink: "Bernini: Latent Semantic Planning for Video Diffusion",
      },
      {
        num: 2,
        tag: "音频-视觉推理",
        title: "LatentOmni：统一潜空间中的音频-视觉联合推理",
        description: "LatentOmni 针对显式文本 CoT 压缩连续音频-视觉信号导致时序 grounding 弱化的问题，提出在统一潜空间中进行跨模态推理。核心设计包括：feature-level supervision（对齐潜状态与任务相关感官特征）、Omni-Sync Position Embedding（OSPE，通过共享物理时间戳同步音频-视觉潜特征）、以及 <Unified_Latent> 触发机制实现文本与潜状态交替推理。在 DailyOmni 等基准上，LatentOmni 显著优于显式文本 CoT 基线，AV token 注意力比例大幅提升。对于 music-to-dance，其 OSPE 机制可直接迁移到 3D Audio Attention 模块，改善音频节拍与视觉动作的时序同步精度。",
        keyPoints: [
          "<Unified_Latent> 机制实现文本推理与潜空间推理的交替，保留密集感官信息",
          "OSPE 为时序对应的视觉帧和音频段分配共享物理时间戳，防止序列生成中的位置漂移",
          "LatentOmni-Instruct-35K 数据集提供带音频-视觉段标注的推理轨迹监督"
        ],
        href: "https://arxiv.org/abs/2605.22012",
        paperLink: "LatentOmni: Rethinking Omni-Modal Understanding via Unified Audio-Visual Latent Reasoning",
      },
      {
        num: 3,
        tag: "运动建模",
        title: "AnyMo：几何感知的 setup-agnostic 人体运动建模",
        description: "AnyMo 解决可穿戴 IMU 信号因设备位置、朝向、硬件差异导致的 setup 依赖问题。通过 physics-grounded IMU simulation 在密集体表位置生成合成信号，预训练图编码器学习 setup-agnostic 表征，再将多位置 IMU token 化为全身运动 token 并与 LLM 对齐。在 14 个零样本活动识别数据集、跨模态检索和 IMU 运动描述任务上均取得显著提升。对于 music-to-dance，其几何感知编码器和运动 token 化方案可用于提升生成舞蹈动作的物理合理性（重心转移、肢体协调），改善舞蹈自然度。",
        keyPoints: [
          "基于 Nymeria 身体模型的物理 grounded IMU 模拟，在 23 个解剖段密集采样体表位置",
          "Masked Cross-View Predictive Contrastive Learning 预训练策略学习 setup-agnostic 表征",
          "全身运动 token 作为连续 IMU 信号与离散语言之间的紧凑接口，支持开放词汇识别和描述"
        ],
        href: "https://arxiv.org/abs/2605.22715",
        paperLink: "AnyMo: Geometry-Aware Setup-Agnostic Modeling of Human Motion in the Wild",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "MotiMotion：视觉推理驱动的运动控制视频生成",
        tag: "运动控制",
        href: "https://arxiv.org/abs/2605.22818",
        description: "将运动控制重构为推理-生成问题，confidence-aware 控制方案可根据置信度调节引导强度，改善动作自然度。",
      },
      {
        num: 5,
        title: "SEGA：频谱能量引导的 DiT 高分辨率外推",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2605.22668",
        description: "根据潜空间的空间-频率结构动态缩放 RoPE 组件，改善高分辨率生成的结构一致性和细节保真度。",
      },
      {
        num: 6,
        title: "LMDMs：交互式音乐扩散模型",
        tag: "音频生成",
        href: "https://arxiv.org/abs/2605.22717",
        description: "通过 block-wise KV Caching 和 ARC-Forcing 范式实现实时交互式音乐生成，推理效率优于离散 AR 模型。",
      },
      {
        num: 7,
        title: "WorldKV：视频扩散的高效世界记忆",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2605.22718",
        description: "World Retrieval 机制选择性检索场景相关 KV chunk，在保持长时一致性的同时实现 2 倍吞吐。",
      },
      {
        num: 8,
        title: "SAMOSA：运动-几何-语义自适应的复杂跟踪",
        tag: "视觉跟踪",
        href: "https://arxiv.org/abs/2605.22538",
        description: "非线性运动预测器 + 语义漂移检测 + 几何约束，将 SAM 2 适配到复杂跟踪场景。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "New Directions in Audio-Visual Alignment and Motion Modeling",
    overview: [
      "Bernini proposes a decoupled MLLM semantic planning + DiT rendering architecture, offering a new paradigm for audio-driven generation",
      "LatentOmni enables audio-visual joint reasoning in unified latent space, improving temporal alignment precision",
      "AnyMo achieves setup-agnostic human motion modeling through geometry-aware IMU simulation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "Bernini: Unified Video Generation via MLLM Semantic Planning and DiT Rendering",
        description: "Bernini introduces a novel paradigm decoupling multimodal LLMs and diffusion models: the MLLM-based Planner performs semantic planning in ViT embedding space to predict target visual representations, while the DiT-based Renderer performs flow-matching denoising conditioned on semantic embeddings and source VAE features. Key innovations include Segment-Aware 3D RoPE (segment-aware positional encoding for multi-visual inputs) and Chain-of-Thought latent reasoning. For music-to-dance tasks, this semantic-pixel separation architecture is highly transferable: the audio encoder can replace the MLLM to extract beat semantic features, while the diffusion model generates corresponding dance motions, with SA-3D RoPE handling cross-frame alignment between reference images and generated videos.",
        keyPoints: [
          "MLLM Planner predicts target semantic representations in ViT embedding space as cross-attention conditions for DiT",
          "SA-3D RoPE distinguishes tokens from different visual sources via segment-index-conditioned phase modulation, resolving multi-input identity ambiguity",
          "Two-stage training: Planner and Renderer are pre-trained separately then lightly co-trained, preserving individual pretrained capabilities"
        ],
        href: "https://arxiv.org/abs/2605.22344",
        paperLink: "Bernini: Latent Semantic Planning for Video Diffusion",
      },
      {
        num: 2,
        tag: "Audio-Visual Reasoning",
        title: "LatentOmni: Unified Audio-Visual Latent Reasoning",
        description: "LatentOmni addresses the weakening of temporal grounding caused by explicit text CoT compressing continuous audio-visual signals, proposing cross-modal reasoning in a unified latent space. Core designs include: feature-level supervision (aligning latent states with task-relevant sensory features), Omni-Sync Position Embedding (OSPE, synchronizing audio-visual latent features via shared physical timestamps), and the <Unified_Latent> trigger mechanism for alternating text and latent reasoning. On DailyOmni and other benchmarks, LatentOmni significantly outperforms explicit text CoT baselines with substantially higher AV token attention ratios. For music-to-dance, its OSPE mechanism can be directly transferred to the 3D Audio Attention module to improve temporal synchronization precision between audio beats and visual motions.",
        keyPoints: [
          "<Unified_Latent> mechanism enables alternation between text reasoning and latent space reasoning, preserving dense sensory information",
          "OSPE assigns shared physical timestamps to temporally corresponding visual frames and audio segments, preventing positional drift in sequential generation",
          "LatentOmni-Instruct-35K dataset provides reasoning trajectory supervision with audio-visual segment annotations"
        ],
        href: "https://arxiv.org/abs/2605.22012",
        paperLink: "LatentOmni: Rethinking Omni-Modal Understanding via Unified Audio-Visual Latent Reasoning",
      },
      {
        num: 3,
        tag: "Motion Modeling",
        title: "AnyMo: Geometry-Aware Setup-Agnostic Human Motion Modeling",
        description: "AnyMo addresses the setup dependency of wearable IMU signals caused by device location, orientation, and hardware differences. Through physics-grounded IMU simulation generating synthetic signals at dense body-surface locations, it pre-trains a graph encoder to learn setup-agnostic representations, then tokenizes multi-position IMU into full-body motion tokens aligned with an LLM. It achieves significant improvements on 14 zero-shot activity recognition datasets, cross-modal retrieval, and IMU motion captioning tasks. For music-to-dance, its geometry-aware encoder and motion tokenization scheme can enhance the physical plausibility of generated dance motions (center-of-mass transfer, limb coordination), improving dance naturalness.",
        keyPoints: [
          "Physics-grounded IMU simulation based on Nymeria body model, densely sampling body-surface locations across 23 anatomical segments",
          "Masked Cross-View Predictive Contrastive Learning pre-training strategy learns setup-agnostic representations",
          "Full-body motion tokens serve as a compact interface between continuous IMU signals and discrete language, supporting open-vocabulary recognition and captioning"
        ],
        href: "https://arxiv.org/abs/2605.22715",
        paperLink: "AnyMo: Geometry-Aware Setup-Agnostic Modeling of Human Motion in the Wild",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "MotiMotion: Motion-Controlled Video Generation with Visual Reasoning",
        tag: "Motion Control",
        href: "https://arxiv.org/abs/2605.22818",
        description: "Reformulates motion control as reasoning-then-generation with confidence-aware control that modulates guidance strength based on confidence, improving motion naturalness.",
      },
      {
        num: 5,
        title: "SEGA: Spectral-Energy Guided Attention for DiT Resolution Extrapolation",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2605.22668",
        description: "Dynamically scales RoPE components according to spatial-frequency structure of latents, improving structural coherence and fine-detail fidelity in high-resolution generation.",
      },
      {
        num: 6,
        title: "LMDMs: Interactive Diffusion Music Generators",
        tag: "Audio Generation",
        href: "https://arxiv.org/abs/2605.22717",
        description: "Achieves real-time interactive music generation via block-wise KV Caching and ARC-Forcing paradigm, with better inference efficiency than discrete AR models.",
      },
      {
        num: 7,
        title: "WorldKV: Efficient World Memory for Video Diffusion",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2605.22718",
        description: "World Retrieval mechanism selectively retrieves scene-relevant KV chunks, achieving 2x throughput while maintaining long-term consistency.",
      },
      {
        num: 8,
        title: "SAMOSA: Motion-Geometry-Semantic Adaptation for Complex Tracking",
        tag: "Visual Tracking",
        href: "https://arxiv.org/abs/2605.22538",
        description: "Nonlinear motion predictor + semantic shift detection + geometric constraints adapts SAM 2 to complex tracking scenarios.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-23`,
        'en': `/en/daily/music-to-dance/2026-05-23`,
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
      date="2026-05-23"
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
