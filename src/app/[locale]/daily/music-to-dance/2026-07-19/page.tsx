import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "少步视频生成 RL 调优与流式解码加速",
    overview: [
      "MeanFlowNFT：4步生成达到50步RL质量，少步视频生成的新标杆",
      "FlashDecoder：纯Transformer解码器实现3.6-4.7倍加速，实时流式视频生成关键组件",
      "HDR：分层去噪框架实现粗到细的视频推理，长时序一致性建模新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成 / RL优化",
        title: "MeanFlowNFT：前向过程RL优化MeanFlow少步生成器",
        description: "MeanFlow通过预测时间区间平均速度实现少步采样，但RL调优方法一直未解决。本文提出MeanFlowNFT，利用MeanFlow恒等式构建诱导瞬时速度预测器，将DiffusionNFT目标函数应用于该预测器，实现无需反向轨迹的在线RL训练。在Wan 2.1上，4步MeanFlowNFT达到VBench 84.33分，超越50步LongCat-Video RL（82.57分）。对于music-to-dance任务，这意味着可将舞蹈视频生成的推理步数从50步降至4步，同时保持甚至提升生成质量，显著降低实时应用门槛。",
        keyPoints: [
          "提出MeanFlow恒等式连接平均速度与瞬时速度，构建可微分的诱导预测器",
          "前向过程RL训练无需反向轨迹或似然估计，训练效率显著优于GRPO方法",
          "Wan 2.1上4步生成超越50步RL基线，SD3.5-M上6/8指标超越现有少步SOTA"
        ],
        href: "https://arxiv.org/abs/2607.15273",
        paperLink: "MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators",
      },
      {
        num: 2,
        tag: "视频理解 / 高效架构",
        title: "VideoChat3：全开源高效通用视频理解MLLM",
        description: "现有视频MLLM存在泛化性差、计算开销大、开源不充分等问题。本文提出VideoChat3，通过I3D-ViT（膨胀3D视觉Transformer）和自适应帧分辨率实现高效时空表示学习，同时构建300万样本的多样化训练数据集。模型仅4B参数即在多项基准上超越更大参数的开源模型。对于music-to-dance，其I3D-ViT的局部时空建模机制可借鉴用于音频-视频跨模态对齐，自适应分辨率策略可降低长舞蹈视频的训练推理成本。",
        keyPoints: [
          "I3D-ViT将2D空间自注意力扩展为3D时空自注意力，在chunk内建模局部运动",
          "自适应帧分辨率根据内容重要性动态调整空间分辨率，降低计算冗余",
          "完全开源：模型权重、训练代码、策略、完整数据集全部公开"
        ],
        href: "https://arxiv.org/abs/2607.14935",
        paperLink: "VideoChat3: Fully Open Video MLLM for Efficient and Generalist Video Understanding",
      },
      {
        num: 3,
        tag: "视频推理 / 分层生成",
        title: "HDR：分层去噪实现多步视觉推理",
        description: "流式自回归扩散模型高效但推理能力弱，双向扩散支持全局修正但推理成本高。HDR提出树状层级隐变量组织方式，粗层保持不确定假设用于全局规划，细层逐步求精为具体视觉状态。稀疏分层注意力(SHAP)仅与局部和父层上下文交互，降低时序注意力开销。在6项推理任务上，HDR将成功率从34.22提升至60.29（相对增益76.2%）。对于舞蹈生成，这种粗到细的层级结构可用于音频-动作对齐的时序建模，在保持流式生成能力的同时提升长程一致性。",
        keyPoints: [
          "树状层级隐变量实现粗到细推理，粗层高噪声保持多假设，细层低噪声实例化",
          "SHAP稀疏注意力模式仅访问局部和父层，时序注意力成本与序列长度解耦",
          "流式延迟0.70秒/隐变量，比双向扩散快54.2倍，2%数据保留82.9%性能"
        ],
        href: "https://arxiv.org/abs/2607.15278",
        paperLink: "Hierarchical Denoising For Multi-Step Visual Reasoning",
      },
      {
        num: 4,
        tag: "视频解码 / 实时推理",
        title: "FlashDecoder：实时流式Transformer视频解码器",
        description: "现有视频扩散模型的3D卷积解码器在高分辨率或长视频场景下缓慢且内存密集，成为实时生成的瓶颈。FlashDecoder是纯Transformer潜空间到像素的解码器，通过滚动KV缓存逐帧解码，固定时间窗口保证无论视频长度如何都保持恒定延迟。在Wan2.1/Wan2.2潜空间上，1080p重建质量与卷积解码器相当（41.55 vs 41.49 dB PSNR），但速度快3.6-4.7倍，内存降低11倍。对于music-to-dance的实时应用，FlashDecoder可将端到端延迟降低超过60%，是实现实时舞蹈视频生成的关键组件。",
        keyPoints: [
          "纯Transformer架构逐帧处理，滚动KV缓存保证恒定延迟和内存有界",
          "无需显式因果掩码，训练和推理采用相同的时序顺序处理",
          "Wan2.2上优化后达151 FPS（720p），端到端生成速度提升超过2倍"
        ],
        href: "https://arxiv.org/abs/2607.14898",
        paperLink: "FlashDecoder: Real-Time Latent-to-Pixel Streaming Decoder with Transformers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "WanSong：纯扩散长音频生成模型",
        tag: "音频生成",
        href: "https://arxiv.org/abs/2607.14749",
        description: "Wan系列音乐生成模型，纯扩散架构支持5分钟长音频生成，单轮输出人声和伴奏双轨。music-to-dance依赖音频理解，其音频编码器设计和对齐机制可借鉴。",
      },
      {
        num: 6,
        title: "Wan-Streamer v0.3：World + Event Stream实时音视频交互",
        tag: "实时交互",
        href: "https://arxiv.org/abs/2607.15038",
        description: "160ms流式单元、200ms模型延迟的实时音视频交互框架。World+Event Stream建模方式将静态环境与动态事件分离，实时舞蹈生成场景可参考此架构设计。",
      },
      {
        num: 7,
        title: "ACID：自适应缓存加速视频扩散模型",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2607.12358",
        description: "动态监测漂移信号变化率，在关键步骤使用低阈值、其他步骤激进缓存。TeaCache上2.16倍加速，额外38%速度提升，质量损失可忽略。可直接应用于舞蹈视频生成pipeline。",
      },
      {
        num: 8,
        title: "Reflex：流式VLA实时控制框架",
        tag: "流式推理",
        href: "https://arxiv.org/abs/2607.14695",
        description: "利用Timestep-Invariance Property实现flow matching策略的O(1)增量KV缓存更新，50Hz稳定流式、延迟降低54%。实时舞蹈动作生成的流式推理优化可参考。",
      },
      {
        num: 9,
        title: "D2DF：一步视频对象移除",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2607.14976",
        description: "时序Masked Transformer实现场景一致伪草稿生成，一步完成视频对象移除。视频编辑技术可迁移用于舞蹈视频后处理，如背景替换或干扰物移除。",
      },
    ],
    observation: "今日论文呈现出一个明确趋势：视频生成领域正在从'质量优先'转向'效率优先'。MeanFlowNFT用4步达到50步质量、FlashDecoder将解码速度提升4倍、HDR在保持流式能力的同时实现全局推理——这三项工作共同指向一个目标：让高质量视频生成达到实时或近实时。对于music-to-dance任务，这意味着我们正接近一个拐点：端到端实时舞蹈视频生成在技术上已具备可行性，下一步的关键在于如何将音频-动作对齐的时序建模与这些高效推理技术无缝整合。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Few-Step Video Generation RL Tuning & Streaming Decoder Acceleration",
    overview: [
      "MeanFlowNFT: 4-step generation matches 50-step RL quality, new benchmark for few-step video generation",
      "FlashDecoder: Pure Transformer decoder achieves 3.6-4.7x speedup, key component for real-time streaming video generation",
      "HDR: Hierarchical denoising enables coarse-to-fine video reasoning, new approach for long-term consistency modeling"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation / RL Optimization",
        title: "MeanFlowNFT: Forward-Process RL for MeanFlow Few-Step Generators",
        description: "MeanFlow achieves few-step sampling by predicting average velocities, but RL tuning methods remained unsolved. This paper proposes MeanFlowNFT, using the MeanFlow identity to construct an induced instantaneous-velocity predictor and applying DiffusionNFT objectives for online RL training without reverse trajectories. On Wan 2.1, 4-step MeanFlowNFT achieves VBench 84.33, surpassing 50-step LongCat-Video RL (82.57). For music-to-dance, this means reducing inference steps from 50 to 4 while maintaining or improving quality, significantly lowering the barrier for real-time applications.",
        keyPoints: [
          "Proposes MeanFlow identity connecting average and instantaneous velocities for differentiable induced predictor",
          "Forward-process RL training requires no reverse trajectories or likelihood estimation, significantly more efficient than GRPO",
          "4-step generation on Wan 2.1 surpasses 50-step RL baseline; 6/8 metrics exceed existing few-step SOTA on SD3.5-M"
        ],
        href: "https://arxiv.org/abs/2607.15273",
        paperLink: "MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators",
      },
      {
        num: 2,
        tag: "Video Understanding / Efficient Architecture",
        title: "VideoChat3: Fully Open Video MLLM for Efficient and Generalist Understanding",
        description: "Existing video MLLMs suffer from poor generalization, high computational cost, and insufficient open-sourcing. VideoChat3 introduces I3D-ViT (Inflated 3D Vision Transformer) and adaptive frame resolution for efficient spatiotemporal representation learning, along with 3M diverse training samples. With only 4B parameters, it surpasses larger open-source models on multiple benchmarks. For music-to-dance, I3D-ViT's local spatiotemporal modeling can inform audio-video cross-modal alignment, and adaptive resolution reduces training/inference costs for long dance videos.",
        keyPoints: [
          "I3D-ViT extends 2D spatial self-attention to 3D spatiotemporal, modeling local motion within chunks",
          "Adaptive frame resolution dynamically adjusts spatial resolution based on content importance, reducing computational redundancy",
          "Fully open-source: model weights, training code, strategies, and complete datasets publicly released"
        ],
        href: "https://arxiv.org/abs/2607.14935",
        paperLink: "VideoChat3: Fully Open Video MLLM for Efficient and Generalist Video Understanding",
      },
      {
        num: 3,
        tag: "Video Reasoning / Hierarchical Generation",
        title: "HDR: Hierarchical Denoising for Multi-Step Visual Reasoning",
        description: "Streaming autoregressive diffusion models are efficient but weak at reasoning; bidirectional diffusion supports global revision but at high inference cost. HDR organizes video latents into a tree-structured hierarchy where coarse layers maintain uncertain hypotheses for global planning and fine layers progressively refine them. Sparse Hierarchical Attention Pattern (SHAP) only interacts with local and parent contexts, reducing temporal attention overhead. On 6 reasoning tasks, HDR improves success rate from 34.22 to 60.29 (76.2% relative gain). For dance generation, this coarse-to-fine structure can model audio-motion alignment temporally while maintaining streaming capability.",
        keyPoints: [
          "Tree-structured hierarchical latents enable coarse-to-fine reasoning: coarse layers maintain multiple hypotheses, fine layers instantiate",
          "SHAP sparse attention only accesses local and parent layers, decoupling temporal attention cost from sequence length",
          "Streaming latency 0.70s per latent, 54.2x faster than bidirectional diffusion, 82.9% performance retained with 2% data"
        ],
        href: "https://arxiv.org/abs/2607.15278",
        paperLink: "Hierarchical Denoising For Multi-Step Visual Reasoning",
      },
      {
        num: 4,
        tag: "Video Decoding / Real-Time Inference",
        title: "FlashDecoder: Real-Time Streaming Transformer Video Decoder",
        description: "Existing 3D convolutional decoders in video diffusion models are slow and memory-intensive at high resolutions or long videos, becoming the bottleneck for real-time generation. FlashDecoder is a pure Transformer latent-to-pixel decoder that decodes frame-by-frame with a rolling KV cache. The fixed temporal window ensures constant latency regardless of video length. On Wan2.1/Wan2.2 latent spaces, 1080p reconstruction quality matches convolutional decoders (41.55 vs 41.49 dB PSNR) while being 3.6-4.7x faster with 11x less memory. For real-time music-to-dance applications, FlashDecoder can reduce end-to-end latency by over 60%, making it a key component for real-time dance video generation.",
        keyPoints: [
          "Pure Transformer architecture processes frame-by-frame with rolling KV cache for constant latency and bounded memory",
          "No explicit causal masks needed; same temporal-order processing for training and inference",
          "Optimized FlashDecoder-XL achieves 151 FPS at 720p on Wan2.2, more than 2x end-to-end generation speedup"
        ],
        href: "https://arxiv.org/abs/2607.14898",
        paperLink: "FlashDecoder: Real-Time Latent-to-Pixel Streaming Decoder with Transformers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "WanSong: Pure Diffusion Long-Form Audio Generation",
        tag: "Audio Generation",
        href: "https://arxiv.org/abs/2607.14749",
        description: "Wan-series music generation model with pure diffusion architecture supporting 5-minute long audio generation, outputting vocals and accompaniment in a single pass. Audio encoder design and alignment mechanisms are relevant for music-to-dance.",
      },
      {
        num: 6,
        title: "Wan-Streamer v0.3: World + Event Stream Real-Time Audio-Visual Interaction",
        tag: "Real-Time Interaction",
        href: "https://arxiv.org/abs/2607.15038",
        description: "Real-time audio-visual interaction framework with 160ms streaming units and 200ms model latency. World+Event Stream architecture separates static environment from dynamic events, providing reference for real-time dance generation system design.",
      },
      {
        num: 7,
        title: "ACID: Adaptive Caching for Video Diffusion Acceleration",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2607.12358",
        description: "Dynamically monitors drift signal rate-of-change, using low thresholds at critical steps and aggressive caching elsewhere. 2.16x speedup on TeaCache with additional 38% improvement, negligible quality loss. Directly applicable to dance video generation pipelines.",
      },
      {
        num: 8,
        title: "Reflex: Streaming VLA Real-Time Control Framework",
        tag: "Streaming Inference",
        href: "https://arxiv.org/abs/2607.14695",
        description: "Exploits Timestep-Invariance Property for O(1) incremental KV cache updates in flow matching policies, achieving 50Hz stable streaming with 54% latency reduction. Streaming inference optimization insights applicable to real-time dance motion generation.",
      },
      {
        num: 9,
        title: "D2DF: One-Step Video Object Removal",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2607.14976",
        description: "Temporal Masked Transformer generates scene-consistent pseudo-drafts, enabling one-step video object removal. Video editing techniques transferable to dance video post-processing such as background replacement or distraction removal.",
      },
    ],
    observation: "Today's papers reveal a clear trend: video generation is shifting from 'quality-first' to 'efficiency-first'. MeanFlowNFT achieves 50-step quality in 4 steps, FlashDecoder speeds up decoding by 4x, and HDR enables global reasoning while maintaining streaming capability—all pointing toward one goal: making high-quality video generation real-time or near real-time. For music-to-dance tasks, this means we are approaching an inflection point: end-to-end real-time dance video generation is technically feasible. The next critical step is seamlessly integrating audio-motion alignment temporal modeling with these efficient inference techniques.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-19`,
        'en': `/en/daily/music-to-dance/2026-07-19`,
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
      date="2026-07-19"
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
