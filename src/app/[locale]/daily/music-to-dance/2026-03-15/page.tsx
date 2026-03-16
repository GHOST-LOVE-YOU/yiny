import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-03-15 | 多主体运动控制与实时音视频生成新进展",
    overview: [
      "DreamVideo-Omni 提出统一框架实现多主体身份保持与全粒度运动控制，其 latent identity reward 机制对参考人物外观一致性有重要参考价值",
      "OmniForcing 首次实现实时音频-视觉联合生成，其非对称块因果对齐机制对 music-to-dance 的音频-运动同步有启发",
      "ELIT 弹性 latent 接口机制可在不修改 DiT 架构的情况下实现推理速度与质量的动态权衡"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "DreamVideo-Omni：通过 Latent Identity 强化学习实现多主体全运动控制",
        description: "该论文提出了首个统一框架 DreamVideo-Omni，能够同时实现多主体身份保持和全粒度运动控制（全局运动、局部动态、相机运动）。其核心创新包括：(1) 条件感知的 3D RoPE 协调异构输入；(2) 层次化运动注入策略增强全局运动引导；(3) Group 和 Role Embeddings 显式锚定运动信号到特定身份，解决多主体场景中的控制歧义；(4) Latent Identity Reward Model (LIRM) 在 latent 空间提供运动感知的身份奖励，有效缓解大幅度运动下的身份退化问题。对于 music-to-dance 任务，该框架的 group/role embeddings 机制可直接借鉴用于解耦音频-运动映射，LIRM 的奖励反馈范式可用于保持参考人物外观一致性。",
        keyPoints: [
          "两阶段渐进训练：第一阶段联合训练多主体定制与全运动控制，第二阶段通过 latent identity reward 反馈学习增强身份保持",
          "Group 和 Role Embeddings 显式绑定运动信号到对应身份，有效解耦复杂场景中的多主体控制",
          "LIRM 基于预训练视频扩散骨干网络，在 latent 空间评估视频级身份一致性，避免昂贵的 VAE 解码"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "音视频生成",
        title: "OmniForcing：首个实时音频-视觉联合生成框架",
        description: "OmniForcing 首次将双向音频-视觉扩散模型蒸馏为流式自回归生成器，实现约 25 FPS 的实时生成。针对音频-视频模态间的时间不对称性（25 FPS vs 3 FPS），论文提出 Asymmetric Block-Causal Alignment 机制，通过 1 秒宏块边界同步两种模态。Global Prefix 机制提供跨模态语义锚点，Audio Sink Token 配合 Identity RoPE 约束解决稀疏因果注意力导致的梯度爆炸问题。对于 music-to-dance 任务，该框架的音频-视觉同步机制具有重要的参考价值，其流式生成范式可启发舞蹈视频的实时生成方案设计。",
        keyPoints: [
          "Asymmetric Block-Causal Alignment 通过 1 秒宏块（3 视频帧 + 25 音频帧）自然解决模态频率不对称问题",
          "Audio Sink Token 与 Identity RoPE 约束作为架构稳定器，缓解稀疏因果注意力中的 Softmax 崩溃和梯度爆炸",
          "Joint Self-Forcing Distillation 通过自展开训练缓解长序列生成中的曝光偏差问题"
        ],
        href: "https://arxiv.org/abs/2603.11647",
        paperLink: "OmniForcing: Unleashing Real-time Joint Audio-Visual Generation",
      },
      {
        num: 3,
        tag: "扩散模型效率",
        title: "ELIT：弹性 Latent 接口实现扩散 Transformer 的动态计算分配",
        description: "ELIT 提出一种极简的 DiT 兼容机制，通过引入可变长度的 latent token 序列（latent interface）和轻量级的 Read/Write 交叉注意力层，实现计算资源的动态分配。Read 层将信息从空间 token 拉入 latent 接口，优先处理困难区域；Write 层将更新后的 latent 状态广播回空间域。通过随机尾部 token 丢弃训练，模型学会产生重要性排序的表示——靠前的 latent 捕获全局结构，靠后的细化细节。推理时可动态调整 latent 数量以匹配计算预算。对于 music-to-dance 部署，ELIT 可在不修改基础 DiT 架构的情况下，实现推理速度与生成质量的灵活权衡。",
        keyPoints: [
          "Latent interface 解耦输入图像大小与计算量，通过调整 latent token 数量实现灵活的延迟-质量权衡",
          "Grouped cross-attention 将计算复杂度从 O(NK) 降至 O(NK/G)，支持可变分辨率输入",
          "Cheap Classifier-Free Guidance (CCFG) 利用多预算特性，以较低计算成本实现引导采样"
        ],
        href: "https://arxiv.org/abs/2603.12245",
        paperLink: "One Model, Many Budgets: Elastic Latent Interfaces for Diffusion Transformers",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "ShotVerse：电影级多镜头视频生成的相机控制",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2603.11421",
        description: "Plan-then-Control 框架将生成解耦为 VLM-based Planner 和 Controller，对舞蹈视频的镜头运动设计有借鉴价值。"
      },
      {
        num: 5,
        title: "EVATok：自适应长度视频 Token 化",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2603.12267",
        description: "根据视频内容动态分配 token，相比固定长度基线节省 24.4% token 使用量，对长舞蹈视频生成有潜在价值。"
      },
      {
        num: 6,
        title: "Video Streaming Thinking：流式视频理解",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2603.12262",
        description: "thinking while watching 机制实现实时视频理解，对舞蹈视频的实时分析有参考价值。"
      },
      {
        num: 7,
        title: "Coarse-Guided Visual Generation：h-Transform 采样",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2603.12057",
        description: "无需训练的粗引导生成方法，可用于从低分辨率引导生成高分辨率舞蹈视频。"
      },
    ],
    observation: "本周论文呈现出两个显著趋势：(1) 身份保持与运动控制的统一框架成为热点，DreamVideo-Omni 通过 latent reward 机制有效缓解了二者的权衡问题，这对 music-to-dance 中参考人物一致性保持具有直接参考价值；(2) 实时生成技术取得突破，OmniForcing 首次实现音频-视觉联合流式生成，其非对称因果对齐机制为多模态舞蹈生成提供了新思路。建议关注 latent reward 机制与 music-to-dance 现有 3D Audio Attention 机制的融合可能性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-03-15 | Advances in Multi-Subject Motion Control and Real-time Audio-Visual Generation",
    overview: [
      "DreamVideo-Omni proposes a unified framework for multi-subject identity preservation and omni-motion control, with its latent identity reward mechanism offering valuable insights for reference person appearance consistency",
      "OmniForcing achieves the first real-time joint audio-visual generation, with its asymmetric block-causal alignment inspiring audio-motion synchronization for music-to-dance",
      "ELIT's elastic latent interface enables dynamic trade-offs between inference speed and quality without modifying the DiT architecture"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "DreamVideo-Omni: Omni-Motion Control with Latent Identity Reinforcement Learning",
        description: "This paper presents DreamVideo-Omni, the first unified framework enabling harmonious multi-subject customization with omni-motion control (global motion, local dynamics, camera movements). Key innovations include: (1) condition-aware 3D RoPE for coordinating heterogeneous inputs; (2) hierarchical motion injection for enhanced global motion guidance; (3) group and role embeddings to explicitly anchor motion signals to specific identities, resolving multi-subject ambiguity; (4) Latent Identity Reward Model (LIRM) providing motion-aware identity rewards in latent space, effectively mitigating identity degradation under large motions. For music-to-dance tasks, the group/role embeddings mechanism can be adapted for decoupling audio-motion mapping, and LIRM's reward feedback paradigm can maintain reference person appearance consistency.",
        keyPoints: [
          "Two-stage progressive training: joint training of multi-subject customization and omni-motion control in stage 1, latent identity reward feedback learning in stage 2",
          "Group and role embeddings explicitly bind motion signals to corresponding identities, effectively disentangling multi-subject control in complex scenes",
          "LIRM based on pretrained video diffusion backbone evaluates video-level identity consistency in latent space, avoiding expensive VAE decoding"
        ],
        href: "https://arxiv.org/abs/2603.12257",
        paperLink: "DreamVideo-Omni: Omni-Motion Controlled Multi-Subject Video Customization with Latent Identity Reinforcement Learning",
      },
      {
        num: 2,
        tag: "Audio-Visual Generation",
        title: "OmniForcing: The First Real-time Joint Audio-Visual Generation Framework",
        description: "OmniForcing is the first framework to distill bidirectional audio-visual diffusion models into streaming autoregressive generators, achieving ~25 FPS real-time generation. Addressing the temporal asymmetry between audio and video modalities (25 FPS vs 3 FPS), the paper proposes Asymmetric Block-Causal Alignment that synchronizes both modalities through 1-second macro-block boundaries. The Global Prefix mechanism provides cross-modal semantic anchors, while Audio Sink Tokens with Identity RoPE constraints resolve gradient explosions caused by sparse causal attention. For music-to-dance tasks, the audio-visual synchronization mechanism offers important reference value, and its streaming generation paradigm can inspire real-time dance video generation design.",
        keyPoints: [
          "Asymmetric Block-Causal Alignment naturally resolves modal frequency asymmetry through 1-second macro-blocks (3 video frames + 25 audio frames)",
          "Audio Sink Tokens with Identity RoPE constraints serve as architectural stabilizers, mitigating Softmax collapse and gradient explosions in sparse causal attention",
          "Joint Self-Forcing Distillation mitigates exposure bias in long-sequence generation through self-unrolling training"
        ],
        href: "https://arxiv.org/abs/2603.11647",
        paperLink: "OmniForcing: Unleashing Real-time Joint Audio-Visual Generation",
      },
      {
        num: 3,
        tag: "Diffusion Efficiency",
        title: "ELIT: Elastic Latent Interfaces for Dynamic Compute Allocation in Diffusion Transformers",
        description: "ELIT proposes a minimal DiT-compatible mechanism that enables dynamic compute allocation through a variable-length latent token sequence (latent interface) and lightweight Read/Write cross-attention layers. The Read layer pulls information from spatial tokens into the latent interface, prioritizing challenging regions; the Write layer broadcasts updated latent states back to the spatial domain. Through random tail token dropping during training, the model learns to produce importance-ordered representations—earlier latents capture global structure while later ones refine details. During inference, the number of latents can be dynamically adjusted to match compute budgets. For music-to-dance deployment, ELIT enables flexible trade-offs between inference speed and generation quality without modifying the base DiT architecture.",
        keyPoints: [
          "Latent interface decouples input image size from compute, enabling flexible latency-quality trade-offs by adjusting latent token count",
          "Grouped cross-attention reduces computational complexity from O(NK) to O(NK/G), supporting variable-resolution inputs",
          "Cheap Classifier-Free Guidance (CCFG) leverages multi-budget characteristics to achieve guided sampling at lower computational cost"
        ],
        href: "https://arxiv.org/abs/2603.12245",
        paperLink: "One Model, Many Budgets: Elastic Latent Interfaces for Diffusion Transformers",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "ShotVerse: Cinematic Camera Control for Multi-Shot Video",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2603.11421",
        description: "Plan-then-Control framework decouples generation into VLM-based Planner and Controller, offering insights for camera motion design in dance videos."
      },
      {
        num: 5,
        title: "EVATok: Adaptive Length Video Tokenization",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2603.12267",
        description: "Dynamically allocates tokens based on video content, saving 24.4% token usage compared to fixed-length baselines, with potential value for long dance video generation."
      },
      {
        num: 6,
        title: "Video Streaming Thinking: Streaming Video Understanding",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2603.12262",
        description: "thinking while watching mechanism enables real-time video understanding, offering reference value for real-time dance video analysis."
      },
      {
        num: 7,
        title: "Coarse-Guided Visual Generation: h-Transform Sampling",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2603.12057",
        description: "Training-free coarse-guided generation method that can be used for upsampling low-resolution dance videos to high resolution."
      },
    ],
    observation: "This week's papers reveal two notable trends: (1) unified frameworks for identity preservation and motion control are gaining traction, with DreamVideo-Omni effectively alleviating the trade-off through latent reward mechanisms, offering direct reference value for reference person consistency in music-to-dance; (2) real-time generation technology has achieved breakthroughs, with OmniForcing enabling the first streaming joint audio-visual generation, whose asymmetric causal alignment mechanism provides new insights for multimodal dance generation. It is recommended to explore the integration potential between latent reward mechanisms and existing 3D Audio Attention mechanisms in music-to-dance.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-15`,
        'en': `/en/daily/music-to-dance/2026-03-15`,
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
      date="2026-03-15"
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