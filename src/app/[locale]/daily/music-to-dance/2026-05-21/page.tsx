import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-05-21 | 多条件运动控制与长视频生成新进展",
    overview: [
      "DrawMotion 提出手绘草图+文本的多条件运动生成框架，Multi-Condition Module 可迁移到音乐-舞蹈任务",
      "FlowLong 实现无需训练的长视频生成，Tweedie matching 保持时序一致性并支持音视频联合生成",
      "iTryOn 的 Action-aware RoPE 为时间敏感的条件注入提供新思路",
      "DAR 重新审视 DiT 残差连接，提出 timestep-adaptive 信息路由机制"
    ],
    papers: [
      {
        num: 1,
        tag: "运动生成",
        title: "DrawMotion：手绘草图驱动的 3D 人体运动生成",
        description: "论文提出首个基于手绘草图的人体运动生成框架，通过 Multi-Condition Module (MCM) 融合文本语义与手绘空间信息。MCM 的核心设计是针对不同条件的模态特定解码器——文本条件使用全局自注意力，手绘 stickman 使用局部窗口注意力，轨迹条件使用 1D 卷积。这种设计使模型能灵活处理 C(text,draw)、C(text,∅)、C(∅,draw) 等任意条件组合。更关键的是，MCM 的中间特征空间具有连续性，支持训练-free 的 Intermediate Feature Guidance (IFG)：在推理时通过分类器引导梯度直接更新中间特征，无需重新训练即可增强轨迹对齐。实验显示用户绘制时间减少 46.7%，Traj.Err 和 StiSim 指标优于 OmniControl 等训练式方法。对于 music-to-dance 任务，MCM 的架构可直接迁移用于融合音频节拍与参考外观，IFG 机制则可用于增强舞蹈动作与音乐节拍的对齐。",
        keyPoints: [
          "MCM 采用模态特定解码器：文本用全局自注意力，stickman 用局部窗口注意力，轨迹用 1D 卷积",
          "中间特征空间的连续性支持训练-free 的 IFG 引导，推理时直接更新特征以改善轨迹对齐",
          "支持任意条件组合 C(text,draw)/C(text,∅)/C(∅,draw)，计算复杂度低于传统 mask-based 多条件融合"
        ],
        href: "https://arxiv.org/abs/2605.20955",
        paperLink: "DrawMotion: Generating 3D Human Motions by Freehand Drawing",
      },
      {
        num: 2,
        tag: "长视频生成",
        title: "FlowLong：基于 Tweedie Matching 的推理时长视频生成",
        description: "针对视频扩散模型生成长序列的挑战，论文提出完全无需训练、架构无关的 FlowLong 框架。核心创新是 Tweedie matching：通过重叠滑动窗口生成，在重叠区域对相邻窗口的 Tweedie 估计（去噪后的 clean sample）进行插值，强制满足流形约束和时序一致性。为避免轨迹回归原始 ODE 路径，论文提出 stochastic early-phase sampling——在高噪声阶段注入随机噪声破坏轨迹惯性，再过渡到确定性 ODE 采样保持细粒度保真。实验表明该方法可将视频延长至原生窗口长度的数倍，在时序一致性和视觉质量上均优于 FIFO-Diffusion 等训练-free 基线和 CausVid 等自回归方法。特别值得注意的是，FlowLong 可直接扩展至 audio-video 联合生成，无需任何微调，这对 music-to-dance 的长舞蹈序列生成具有直接应用价值。",
        keyPoints: [
          "Tweedie matching 在重叠区域插值相邻窗口的去噪估计，强制流形约束和时序一致性",
          "Stochastic early-phase sampling 在高噪声阶段注入噪声打破轨迹惯性，再转确定性 ODE 采样",
          "架构无关、无需训练，可直接应用于 text-to-video、audio-video 联合生成和 text-to-3DGS"
        ],
        href: "https://arxiv.org/abs/2605.20910",
        paperLink: "FlowLong: Inference-time Long Video Generation via Manifold-constrained Tweedie Matching",
      },
      {
        num: 3,
        tag: "视频扩散 Transformer",
        title: "iTryOn：空间-语义引导的交互式视频虚拟试穿",
        description: "论文提出交互式视频虚拟试穿新任务，解决人物与服装主动交互（如拉拉链、整理衣领）的生成挑战。核心贡献是多级交互注入机制：空间层面引入 garment-agnostic 3D hand prior 提供精细的手-服装接触引导，解决 2D 姿态在 Z 轴方向上的语义歧义；语义层面使用全局 caption 描述整体动作，配合时间戳动作 caption 描述局部交互，通过 novel Action-aware Rotational Position Embedding (A-RoPE) 实现 caption 与视频段的精确同步。A-RoPE 将动作时间戳编码为位置嵌入的相位偏移，使模型能准确对齐时间敏感的条件信号。此外，action-aware constraint loss 在训练时加强对稀疏交互帧的监督。该框架基于 Wan2.1-VACE 视频扩散 Transformer，对 music-to-dance 的启示在于：A-RoPE 机制可用于同步音频节拍事件与舞蹈动作，3D hand prior 思路可迁移到舞蹈姿态的空间约束。",
        keyPoints: [
          "Action-aware RoPE 将动作时间戳编码为位置嵌入相位偏移，实现条件与视频段的精确同步",
          "Garment-agnostic 3D hand prior 提供 3D 空间引导，解决 2D 姿态的 Z 轴语义歧义",
          "Action-aware constraint loss 加强对稀疏交互帧的监督，稳定复杂动力学学习"
        ],
        href: "https://arxiv.org/abs/2605.21431",
        paperLink: "iTryOn: Mastering Interactive Video Virtual Try-On with Spatial-Semantic Guidance",
      },
      {
        num: 4,
        tag: "扩散 Transformer 架构",
        title: "DAR：扩散 Transformer 的跨层自适应路由",
        description: "论文系统分析 DiT 中残差连接的三重症状：前向幅度随深度单调膨胀（100 倍）、后向梯度急剧衰减、相邻 block 相似度高达 0.9 以上的冗余。根源在于标准残差连接的 fixed、time-agnostic、incremental 聚合方式不适合扩散模型时变的去噪动态。提出的 Diffusion-Adaptive Routing (DAR) 用可学习的 timestep-adaptive softmax 注意力替代残差加法，query 来自 adaLN 调制后的隐藏状态，使路由机制继承内容和 timestep 依赖。DAR 保持各向同性的 Transformer 堆栈，无需手动指定层配对，与 REPA 等现代增强方法兼容。在 ImageNet 256×256 上，DAR 将 SiT-XL/2 的 FID 从 9.67 降至 7.56，并以 8.75 倍更少迭代达到基线收敛质量。与 REPA 叠加时早期训练加速 2 倍。对于 music-to-dance 的 3D Audio Attention 架构，DAR 可替换残差连接以改善深层梯度和训练效率。",
        keyPoints: [
          "诊断发现标准残差连接导致前向幅度膨胀 100 倍、后向梯度衰减、block 相似度>0.9 的冗余",
          "DAR 用 timestep-adaptive softmax 注意力替代残差加法，query 来自 adaLN 调制状态",
          "ImageNet 256×256 上 FID 7.56（↓2.11），8.75 倍加速收敛，与 REPA 叠加早期加速 2 倍"
        ],
        href: "https://arxiv.org/abs/2605.20708",
        paperLink: "Rethinking Cross-Layer Information Routing in Diffusion Transformers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "RiT：表征空间中的极简扩散 Transformer",
        tag: "表征学习",
        href: "https://arxiv.org/abs/2605.21981",
        description: "在冻结 DINOv2 特征上训练 x-prediction 扩散 Transformer，FID 1.45 无需引导。可借鉴用于舞蹈视频生成，用预训练视觉特征替代像素空间。",
      },
      {
        num: 6,
        title: "Uni-Edit：统一多模态模型的智能编辑任务",
        tag: "统一模型",
        href: "https://arxiv.org/abs/2605.21487",
        description: "将图像编辑作为统一多模态模型的通用训练任务，单任务同时提升理解、生成、编辑能力。单阶段训练策略可借鉴简化 music-to-dance 的多条件训练。",
      },
      {
        num: 7,
        title: "OcclusionFormer：布局引导图像生成的 Z-Order 建模",
        tag: "空间控制",
        href: "https://arxiv.org/abs/2605.21343",
        description: "通过体积渲染显式建模遮挡顺序，解决重叠区域纹理纠缠。Z-order 建模对多人舞蹈场景的身体部位遮挡处理有参考价值。",
      },
      {
        num: 8,
        title: "Q-ARVD：自回归视频扩散模型的量化",
        tag: "推理优化",
        href: "https://arxiv.org/abs/2605.21072",
        description: "针对 ARVD 的帧间不平衡量化和权重异常值问题，提出 frame-weighting 和 outlier-aware 量化。对部署实时舞蹈视频生成系统的推理优化有实用价值。",
      },
      {
        num: 9,
        title: "MSAVBench：多镜头音视频生成评估基准",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2605.20183",
        description: "首个多镜头音视频生成综合评估框架，支持最多 15 个镜头。可用于评估 music-to-dance 生成质量，特别是音视频同步指标。",
      },
    ],
    observation: "今日论文呈现两个值得关注的技术趋势。一是多条件融合的训练-free 引导：DrawMotion 的 IFG 利用 MCM 中间特征的连续性，在推理时通过梯度更新直接优化轨迹对齐，避免了耗时的重新训练或噪声优化。这为 music-to-dance 中音频-外观-运动的多条件控制提供了轻量级调优思路。二是长视频生成的流形约束：FlowLong 的 Tweedie matching 将长视频生成分解为重叠窗口的协调问题，通过 clean sample 插值强制时序一致性，相比自回归方法避免了误差累积。结合两者的思路，未来可探索在重叠窗口框架下应用训练-free 引导，实现高质量的长舞蹈序列生成。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-05-21 | Advances in Multi-Condition Motion Control and Long Video Generation",
    overview: [
      "DrawMotion proposes a multi-condition motion generation framework combining hand-drawing and text; its Multi-Condition Module is adaptable for music-to-dance tasks",
      "FlowLong enables training-free long video generation with Tweedie matching for temporal consistency and supports audio-video joint generation",
      "iTryOn's Action-aware RoPE provides new insights for time-sensitive conditioning injection",
      "DAR re-examines DiT residual connections and proposes timestep-adaptive information routing"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "DrawMotion: 3D Human Motion Generation via Hand-Drawn Sketches",
        description: "This paper introduces the first hand-drawing-based human motion generation framework, fusing textual semantics and sketch spatial information through the Multi-Condition Module (MCM). MCM's core design employs modality-specific decoders: global self-attention for text, local window attention for stickman drawings, and 1D convolution for trajectory conditions. This architecture flexibly handles arbitrary condition combinations including C(text,draw), C(text,∅), and C(∅,draw). Crucially, MCM's intermediate feature space exhibits continuity, supporting training-free Intermediate Feature Guidance (IFG): classifier guidance gradients directly update intermediate features during inference, enhancing trajectory alignment without retraining. Experiments show 46.7% reduction in user drawing time, with Traj.Err and StiSim metrics outperforming training-based methods like OmniControl. For music-to-dance tasks, MCM's architecture can be directly adapted to fuse audio beats with reference appearance, while IFG can strengthen alignment between dance movements and music tempo.",
        keyPoints: [
          "MCM uses modality-specific decoders: global self-attention for text, local window attention for stickman, 1D convolution for trajectory",
          "Continuous intermediate feature space enables training-free IFG to directly update features during inference for improved trajectory alignment",
          "Supports arbitrary condition combinations with lower computational complexity than traditional mask-based fusion"
        ],
        href: "https://arxiv.org/abs/2605.20955",
        paperLink: "DrawMotion: Generating 3D Human Motions by Freehand Drawing",
      },
      {
        num: 2,
        tag: "Long Video Generation",
        title: "FlowLong: Training-Free Long Video Generation via Tweedie Matching",
        description: "Addressing the challenge of extending video diffusion models to long sequences, this paper proposes FlowLong—a completely training-free, architecture-agnostic framework. The core innovation is Tweedie matching: generating through overlapping sliding windows and interpolating adjacent windows' Tweedie estimates (denoised clean samples) in overlap regions to enforce manifold constraints and temporal consistency. To prevent trajectories from reverting to original ODE paths, stochastic early-phase sampling injects random noise in high-noise regimes to break trajectory inertia before transitioning to deterministic ODE sampling for fine-grained fidelity. Experiments demonstrate extending videos to several times the native window length, outperforming training-free baselines like FIFO-Diffusion and autoregressive methods like CausVid in both temporal consistency and visual quality. Notably, FlowLong directly extends to audio-video joint generation without any fine-tuning, offering immediate value for long dance sequence generation in music-to-dance applications.",
        keyPoints: [
          "Tweedie matching interpolates denoised estimates in overlap regions to enforce manifold constraints and temporal consistency",
          "Stochastic early-phase sampling injects noise in high-noise regimes to break trajectory inertia before deterministic ODE sampling",
          "Architecture-agnostic and training-free, applicable to text-to-video, audio-video joint generation, and text-to-3DGS"
        ],
        href: "https://arxiv.org/abs/2605.20910",
        paperLink: "FlowLong: Inference-time Long Video Generation via Manifold-constrained Tweedie Matching",
      },
      {
        num: 3,
        tag: "Video Diffusion Transformer",
        title: "iTryOn: Spatial-Semantic Guidance for Interactive Video Virtual Try-On",
        description: "This paper introduces the interactive video virtual try-on task, addressing generation challenges for active human-garment interactions like zipping or adjusting collars. The core contribution is a multi-level interaction injection mechanism: at the spatial level, a garment-agnostic 3D hand prior provides fine-grained hand-garment contact guidance, resolving semantic ambiguity from 2D pose projections along the Z-axis; at the semantic level, global captions describe overall motion while timestamped action captions describe local interactions, synchronized via the novel Action-aware Rotational Position Embedding (A-RoPE). A-RoPE encodes action timestamps as phase shifts in positional embeddings, enabling precise alignment of time-sensitive conditioning signals. Additionally, action-aware constraint loss intensifies supervision on sparse interaction frames during training. Built on Wan2.1-VACE video diffusion Transformer, this framework offers insights for music-to-dance: A-RoPE can synchronize audio beat events with dance movements, and the 3D hand prior concept can be adapted for spatial constraints in dance poses.",
        keyPoints: [
          "Action-aware RoPE encodes action timestamps as positional embedding phase shifts for precise condition-video synchronization",
          "Garment-agnostic 3D hand prior provides 3D spatial guidance, resolving Z-axis semantic ambiguity in 2D poses",
          "Action-aware constraint loss intensifies supervision on sparse interaction frames, stabilizing complex dynamics learning"
        ],
        href: "https://arxiv.org/abs/2605.21431",
        paperLink: "iTryOn: Mastering Interactive Video Virtual Try-On with Spatial-Semantic Guidance",
      },
      {
        num: 4,
        tag: "Diffusion Transformer Architecture",
        title: "DAR: Cross-Layer Adaptive Routing for Diffusion Transformers",
        description: "This paper systematically analyzes three symptoms of residual connections in DiTs: monotonic forward magnitude inflation (100×), sharp backward gradient decay, and block similarity exceeding 0.9 indicating redundancy. The root cause is that fixed, time-agnostic, incremental aggregation in standard residuals is unsuitable for the time-varying denoising dynamics of diffusion models. The proposed Diffusion-Adaptive Routing (DAR) replaces residual addition with learnable timestep-adaptive softmax attention, where queries come from adaLN-modulated hidden states, enabling the routing mechanism to inherit content and timestep dependencies. DAR preserves the isotropic Transformer stack without manual layer pairing and remains compatible with modern enhancements like REPA. On ImageNet 256×256, DAR improves SiT-XL/2 FID from 9.67 to 7.56 and achieves baseline convergence quality with 8.75× fewer iterations. When combined with REPA, it yields 2× early-stage training acceleration. For music-to-dance 3D Audio Attention architectures, DAR can replace residual connections to improve deep gradient flow and training efficiency.",
        keyPoints: [
          "Diagnosis reveals standard residuals cause 100× forward magnitude inflation, gradient decay, and block similarity >0.9 redundancy",
          "DAR replaces residual addition with timestep-adaptive softmax attention, queries from adaLN-modulated states",
          "ImageNet 256×256: FID 7.56 (↓2.11), 8.75× convergence speedup, 2× early acceleration when combined with REPA"
        ],
        href: "https://arxiv.org/abs/2605.20708",
        paperLink: "Rethinking Cross-Layer Information Routing in Diffusion Transformers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "RiT: Vanilla Diffusion Transformers in Representation Space",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2605.21981",
        description: "Trains x-prediction diffusion Transformer on frozen DINOv2 features, achieving FID 1.45 without guidance. Adaptable for dance video generation using pretrained visual features instead of pixel space.",
      },
      {
        num: 6,
        title: "Uni-Edit: Intelligent Editing as a General Task for Unified Models",
        tag: "Unified Models",
        href: "https://arxiv.org/abs/2605.21487",
        description: "Uses image editing as a universal training task for unified multimodal models, simultaneously improving understanding, generation, and editing. Single-stage training strategy can simplify music-to-dance multi-condition training.",
      },
      {
        num: 7,
        title: "OcclusionFormer: Z-Order Modeling for Layout-Grounded Generation",
        tag: "Spatial Control",
        href: "https://arxiv.org/abs/2605.21343",
        description: "Explicitly models occlusion order through volume rendering to resolve texture entanglement in overlapping regions. Z-order modeling offers insights for handling body part occlusions in multi-person dance scenes.",
      },
      {
        num: 8,
        title: "Q-ARVD: Quantizing Autoregressive Video Diffusion Models",
        tag: "Inference Optimization",
        href: "https://arxiv.org/abs/2605.21072",
        description: "Addresses frame-wise imbalanced quantization and weight outliers in ARVDs via frame-weighting and outlier-aware quantization. Practical value for inference optimization in real-time dance video generation systems.",
      },
      {
        num: 9,
        title: "MSAVBench: Multi-Shot Audio-Video Generation Benchmark",
        tag: "Evaluation Benchmark",
        href: "https://arxiv.org/abs/2605.20183",
        description: "First comprehensive evaluation framework for multi-shot audio-video generation, supporting up to 15 shots. Applicable for evaluating music-to-dance generation quality, particularly audio-visual synchronization metrics.",
      },
    ],
    observation: "Today's papers reveal two notable technical trends. First, training-free guidance for multi-condition fusion: DrawMotion's IFG leverages the continuity of MCM intermediate features, optimizing trajectory alignment through gradient updates during inference without costly retraining or noise optimization. This offers lightweight tuning insights for audio-appearance-motion multi-condition control in music-to-dance. Second, manifold constraints for long video generation: FlowLong's Tweedie matching decomposes long video generation into overlapping window coordination, enforcing temporal consistency through clean sample interpolation rather than autoregressive error accumulation. Combining both approaches, future work could explore applying training-free guidance within an overlapping window framework for high-quality long dance sequence generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-21`,
        'en': `/en/daily/music-to-dance/2026-05-21`,
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
      date="2026-05-21"
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