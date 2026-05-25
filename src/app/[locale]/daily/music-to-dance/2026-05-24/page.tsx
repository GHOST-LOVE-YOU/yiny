import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-05-24 | 运动推理、音频流式生成与视频语义规划",
    overview: [
      "MotiMotion 将运动控制重新定义为 reasoning-then-generation 范式，VLM 推理稀疏轨迹的因果后果",
      "LMDMs 通过 block-wise KV Caching 将音频扩散模型转化为实时流式生成器，推理效率超越自回归模型",
      "Bernini 采用 MLLM+DiT 分离架构，在 ViT embedding 空间进行语义规划，实现统一视频生成与编辑",
      "AnyMo 的几何感知运动建模为可穿戴 IMU 到全身动作 token 的转换提供了新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "运动控制",
        title: "MotiMotion: 基于视觉推理的运动控制视频生成",
        description: "当前运动控制视频生成模型严格遵循用户提供稀疏轨迹，导致因果推理缺失。MotiMotion 提出 reasoning-then-generation 框架：首先利用无训练视觉-语言推理器（VLM）理解用户意图，将稀疏轨迹细化为物理合理的密集运动计划，包括推断次级运动（如多米诺骨牌连锁反应）；然后通过 confidence-aware control 机制调节引导强度——高置信度区域严格遵循轨迹，低置信度区域依赖模型内部生成先验。在 MotiBench 基准测试中，该方法在物理真实性和逻辑合理性上显著优于现有方法。",
        keyPoints: [
          "VLM-based motion reasoner 将稀疏输入扩展为密集运动计划，推断隐含的因果后果",
          "Confidence-aware control 根据轨迹置信度动态调节引导强度，平衡控制精度与自然度",
          "在碰撞、约束变化、流动、工具机制等场景下生成更符合物理规律的视频"
        ],
        href: "https://arxiv.org/abs/2605.22818",
        paperLink: "MotiMotion: Motion-Controlled Video Generation with Visual Reasoning",
      },
      {
        num: 2,
        tag: "音频生成",
        title: "LMDMs: 面向实时交互的音频扩散模型流式推理",
        description: "现有音频扩散模型因双向注意力机制无法流式推理，而离散自回归模型（如 LMMs）虽可流式但参数量巨大（40GB+ VRAM）。LMDMs 通过两个关键改进解决这一矛盾：一是 block-wise KV Caching，通过分离 clean context 与 noisy target 的投影路径并设计专用注意力掩码，使 clean context 编码可在扩散步和时间步上缓存，恢复甚至超越 LMMs 的推理效率；二是 ARC-Forcing 后训练范式，结合对抗相对对比（ARC）与 Self-Forcing，在多块 rollout 上提供全局监督，减少误差累积。实验表明，LMDMs 可在消费级游戏本上实现实时音乐生成，支持文本条件、草图控制和即兴伴奏。",
        keyPoints: [
          "Block-wise KV Caching 使音频扩散模型支持流式推理，Encoder-Decoder 变体达到 LMMs 同等复杂度",
          "Block-Causal 变体实现严格更快的推理，支持时间和扩散步双重缓存",
          "ARC-Forcing 无需 RL 或奖励模型即可稳定长序列生成，已在真实艺术家合作中部署"
        ],
        href: "https://arxiv.org/abs/2605.22717",
        paperLink: "Live Music Diffusion Models: Efficient Fine-Tuning and Post-Training of Interactive Diffusion Music Generators",
      },
      {
        num: 3,
        tag: "视频生成",
        title: "Bernini: 基于隐式语义规划的视频扩散统一框架",
        description: "MLLMs 擅长语义推理，扩散模型擅长像素合成，但两者如何有效结合仍是开放问题。Bernini 提出简单分工：MLLM-based planner 在 ViT embedding 空间预测目标语义表示，DiT-based renderer 基于此进行像素合成。关键创新包括 Segment-Aware 3D RoPE（SA-3D RoPE），通过 segment-index 条件化的相位调制区分不同视觉源的 token；以及 chain-of-thought reasoning 机制，在生成前进行隐式空间推理。由于语义作为接口，planner 和 renderer 可独立训练后轻量共训练，保留双方预训练优势。在 OpenVE-Bench、OpenS2V-Eval 等基准上达到 SOTA，特别在多参考图编辑任务上展现强泛化能力。",
        keyPoints: [
          "ViT embedding 空间作为 MLLM 与 DiT 的语义接口，实现理解与生成的高效协同",
          "SA-3D RoPE 解决多视觉源（文本/图像/视频/目标）统一序列中的位置歧义问题",
          "Chain-of-thought reasoning 将 MLLM 的预训练理解能力转化为生成质量提升"
        ],
        href: "https://arxiv.org/abs/2605.22344",
        paperLink: "Bernini: Latent Semantic Planning for Video Diffusion",
      },
      {
        num: 4,
        tag: "运动建模",
        title: "AnyMo: 几何感知的位置无关人体运动建模",
        description: "可穿戴 IMU 信号高度依赖佩戴位置、方向、设备硬件等设置，导致跨设备迁移困难。AnyMo 的核心洞察是：设置变化是结构化的而非任意的——IMU 信号由身体运动、表面几何、传感器方向和设备响应共同决定。基于此，AnyMo 首先通过物理 grounded 的 IMU 仿真在密集身体表面放置点生成多样化合成信号；然后采用 masked cross-view predictive contrastive learning 预训练图编码器，学习设置无关的运动表示；最后将多位置 IMU token 化为全身运动 token 并与 LLM 对齐。在 14 个未见数据集上的零样本活动识别、跨模态检索和可穿戴 IMU 运动描述任务上均取得显著提升。",
        keyPoints: [
          "Physics-grounded geometry-aware IMU simulation 在密集身体表面生成多样化合成信号",
          "Masked cross-view predictive contrastive learning 学习跨设置稳定的运动表示",
          "Full-body motion tokenization 为 IMU-语言对齐提供紧凑接口，支持开放词汇识别和描述"
        ],
        href: "https://arxiv.org/abs/2605.22715",
        paperLink: "AnyMo: Geometry-Aware Setup-Agnostic Modeling of Human Motion in the Wild",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "SEGA: 频谱能量引导的扩散 Transformer 分辨率外推",
        tag: "高分辨率生成",
        href: "https://arxiv.org/abs/2605.22668",
        description: "根据潜在空间的空间频率结构动态缩放 RoPE 组件的注意力，改善高分辨率生成时的结构一致性和细节保真度。",
      },
      {
        num: 6,
        title: "LatentOmni: 统一音频-视觉隐空间推理",
        tag: "多模态推理",
        href: "https://arxiv.org/abs/2605.22012",
        description: "通过 Omni-Sync Position Embedding (OSPE) 保持音频-视觉隐状态的时间一致性，支持细粒度的跨模态联合推理。",
      },
      {
        num: 7,
        title: "PiD: 基于像素扩散的快速高分辨率隐式解码",
        tag: "高效解码",
        href: "https://arxiv.org/abs/2605.23902",
        description: "将隐式解码重新定义为条件像素扩散，4 步推理即可将 512×512 隐式解码为 2048×2048 像素，速度比级联超分快 6 倍。",
      },
      {
        num: 8,
        title: "Swift Sampling: 基于泰勒级数的时间惊喜帧选择",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2605.22678",
        description: "将视频建模为视觉隐空间的可微轨迹，用泰勒展开预测后续帧路径，识别与预测流形偏离的高信息时刻。",
      },
      {
        num: 9,
        title: "RiT: 表示空间中的朴素扩散 Transformer",
        tag: "表示学习",
        href: "https://arxiv.org/abs/2605.21981",
        description: "在冻结 DINOv2 特征上训练 x-prediction 扩散 Transformer，5 步 Heun 采样即可达到 FID 2.0，无需蒸馏或一致性训练。",
      },
    ],
    observation: "今日论文呈现出两个显著趋势：一是生成模型的流式化与实时化——LMDMs 证明扩散模型通过 KV Caching 可实现与自回归模型同等的流式推理效率，这对舞蹈视频的实时音频条件生成具有直接参考价值；二是推理与生成的深度耦合——MotiMotion 和 Bernini 均采用先推理后生成的两阶段范式，利用大模型的世界知识弥补生成模型的因果推理缺陷。对于 music-to-dance 任务，这意味着音频-动作对齐可以借鉴 LMDMs 的流式架构，而舞蹈动作的物理合理性可以通过类似 MotiMotion 的 reasoning-then-generation 框架来增强。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-05-24 | Motion Reasoning, Streaming Audio Generation & Semantic Video Planning",
    overview: [
      "MotiMotion reframes motion control as reasoning-then-generation, using VLM to infer causal consequences of sparse trajectories",
      "LMDMs convert audio diffusion models into real-time streaming generators via block-wise KV Caching, surpassing autoregressive efficiency",
      "Bernini adopts MLLM+DiT decoupled architecture for semantic planning in ViT embedding space, unifying video generation and editing",
      "AnyMo's geometry-aware motion modeling provides new insights for converting wearable IMU to full-body motion tokens"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Control",
        title: "MotiMotion: Motion-Controlled Video Generation with Visual Reasoning",
        description: "Current motion-controlled video generation models rigidly follow user-provided sparse trajectories, leading to missing causal reasoning. MotiMotion proposes a reasoning-then-generation framework: first, a training-free vision-language reasoner (VLM) understands user intent and refines sparse trajectories into physically plausible dense motion plans, including inferred secondary motions (e.g., domino chain reactions); then, a confidence-aware control mechanism modulates guidance strength—strictly following trajectories in high-confidence regions while relying on internal generative priors in low-confidence regions. On the MotiBench benchmark, this approach significantly outperforms existing methods in physical realism and logical plausibility.",
        keyPoints: [
          "VLM-based motion reasoner expands sparse inputs into dense motion plans, inferring implicit causal consequences",
          "Confidence-aware control dynamically adjusts guidance strength based on trajectory confidence, balancing control precision and naturalness",
          "Generates videos more aligned with physical laws in scenarios including collisions, constraint changes, fluid flow, and tool mechanisms"
        ],
        href: "https://arxiv.org/abs/2605.22818",
        paperLink: "MotiMotion: Motion-Controlled Video Generation with Visual Reasoning",
      },
      {
        num: 2,
        tag: "Audio Generation",
        title: "LMDMs: Streaming Inference for Interactive Audio Diffusion Models",
        description: "Existing audio diffusion models cannot stream due to bidirectional attention, while discrete autoregressive models (e.g., LMMs) are streamable but require massive parameters (40GB+ VRAM). LMDMs address this through two key improvements: first, block-wise KV Caching separates clean context and noisy target projection paths with dedicated attention masks, enabling caching of clean context encoding across diffusion steps and time, recovering and surpassing LMMs' inference efficiency; second, ARC-Forcing post-training combines Adversarial Relativistic Contrastive (ARC) with Self-Forcing to provide global supervision on multi-block rollouts without RL or reward models. Experiments show LMDMs achieve real-time music generation on consumer gaming laptops, supporting text conditioning, sketch control, and interactive accompaniment.",
        keyPoints: [
          "Block-wise KV Caching enables streaming inference for audio diffusion, with Encoder-Decoder variant matching LMMs complexity",
          "Block-Causal variant achieves strictly faster inference with dual caching across time and diffusion steps",
          "ARC-Forcing stabilizes long-sequence generation without RL or reward models, already deployed in real artist collaborations"
        ],
        href: "https://arxiv.org/abs/2605.22717",
        paperLink: "Live Music Diffusion Models: Efficient Fine-Tuning and Post-Training of Interactive Diffusion Music Generators",
      },
      {
        num: 3,
        tag: "Video Generation",
        title: "Bernini: Unified Video Diffusion via Latent Semantic Planning",
        description: "MLLMs excel at semantic reasoning and diffusion models at pixel synthesis, but effective integration remains open. Bernini proposes a simple division: MLLM-based planner predicts target semantic representations in ViT embedding space, while DiT-based renderer synthesizes pixels conditioned on these embeddings. Key innovations include Segment-Aware 3D RoPE (SA-3D RoPE), which distinguishes tokens from different visual sources via segment-index-conditioned phase modulation; and chain-of-thought reasoning for implicit spatial reasoning before generation. As semantics serve as the interface, planner and renderer can be trained separately then lightly co-trained, preserving pretrained strengths. Achieves SOTA on OpenVE-Bench, OpenS2V-Eval, and shows strong generalization on multi-reference editing tasks.",
        keyPoints: [
          "ViT embedding space serves as semantic interface between MLLM and DiT, enabling efficient understanding-generation collaboration",
          "SA-3D RoPE resolves position ambiguity in unified sequences with multiple visual sources (text/image/video/target)",
          "Chain-of-thought reasoning translates MLLM's pretrained understanding capabilities into generation quality improvements"
        ],
        href: "https://arxiv.org/abs/2605.22344",
        paperLink: "Bernini: Latent Semantic Planning for Video Diffusion",
      },
      {
        num: 4,
        tag: "Motion Modeling",
        title: "AnyMo: Geometry-Aware Setup-Agnostic Human Motion Modeling",
        description: "Wearable IMU signals are highly dependent on placement position, orientation, and device hardware, making cross-device transfer difficult. AnyMo's core insight: setup variation is structured rather than arbitrary—IMU signals result from the interaction of body motion, surface geometry, sensor orientation, and device response. Based on this, AnyMo first generates diverse synthetic signals via physics-grounded IMU simulation over dense body-surface placements; then pretrains a graph encoder with masked cross-view predictive contrastive learning for setup-agnostic motion representations; finally tokenizes multi-position IMU into full-body motion tokens aligned with LLM. Achieves significant improvements on zero-shot activity recognition across 14 unseen datasets, cross-modal retrieval, and wearable IMU motion captioning.",
        keyPoints: [
          "Physics-grounded geometry-aware IMU simulation generates diverse synthetic signals over dense body-surface placements",
          "Masked cross-view predictive contrastive learning learns stable motion representations across setups",
          "Full-body motion tokenization provides compact interface for IMU-language alignment, supporting open-vocabulary recognition and captioning"
        ],
        href: "https://arxiv.org/abs/2605.22715",
        paperLink: "AnyMo: Geometry-Aware Setup-Agnostic Modeling of Human Motion in the Wild",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "SEGA: Spectral-Energy Guided Attention for Resolution Extrapolation",
        tag: "High-Res Generation",
        href: "https://arxiv.org/abs/2605.22668",
        description: "Dynamically scales attention across RoPE components according to latent spatial-frequency structure, improving structural coherence and fine-detail fidelity in high-resolution generation.",
      },
      {
        num: 6,
        title: "LatentOmni: Unified Audio-Visual Latent Reasoning",
        tag: "Multimodal Reasoning",
        href: "https://arxiv.org/abs/2605.22012",
        description: "Maintains temporal consistency between latent audio and visual states via Omni-Sync Position Embedding (OSPE), enabling fine-grained cross-modal joint reasoning.",
      },
      {
        num: 7,
        title: "PiD: Fast High-Resolution Latent Decoding with Pixel Diffusion",
        tag: "Efficient Decoding",
        href: "https://arxiv.org/abs/2605.23902",
        description: "Reframes latent decoding as conditional pixel diffusion, decoding 512×512 latents to 2048×2048 pixels in 4 steps, 6× faster than cascaded super-resolution.",
      },
      {
        num: 8,
        title: "Swift Sampling: Temporal Surprise Detection via Taylor Series",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2605.22678",
        description: "Models video as differentiable trajectory in visual latent space, uses Taylor expansion to predict subsequent frame paths, identifying high-information moments deviating from predicted manifold.",
      },
      {
        num: 9,
        title: "RiT: Vanilla Diffusion Transformers in Representation Space",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2605.21981",
        description: "Trains x-prediction diffusion Transformer on frozen DINOv2 features, reaching FID 2.0 with 5 Heun steps without distillation or consistency training.",
      },
    ],
    observation: "Today's papers reveal two notable trends: first, the streaming and real-time evolution of generative models—LMDMs demonstrate that diffusion models can achieve streaming inference efficiency comparable to autoregressive models through KV Caching, directly relevant for real-time audio-conditioned dance generation; second, deep coupling of reasoning and generation—both MotiMotion and Bernini adopt two-stage reasoning-then-generation paradigms, leveraging large models' world knowledge to compensate for generative models' causal reasoning deficits. For music-to-dance tasks, this suggests audio-motion alignment could adopt LMDMs' streaming architecture, while dance motion physical plausibility could be enhanced through MotiMotion-like reasoning-then-generation frameworks.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-24`,
        'en': `/en/daily/music-to-dance/2026-05-24`,
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
      date="2026-05-24"
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
