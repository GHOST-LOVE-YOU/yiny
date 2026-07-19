import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "视频理解架构革新与少步生成 RL 调优",
    overview: [
      "VideoChat3 提出 I3D-ViT 和自适应帧分辨率，为长视频和流式理解提供高效架构",
      "KeyFrame-Compass 和 MultiRef-Compass 建立了关键帧/多参考视频生成的评估基准",
      "MeanFlowNFT 实现 4 步 RL 调优超越 50 步基线，为实时舞蹈生成提供加速路径"
    ],
    papers: [
      {
        num: 1,
        tag: "视频理解",
        title: "VideoChat3：全开源高效通用视频 MLLM",
        description: "VideoChat3 针对视频 MLLM 的两大瓶颈——计算效率和领域泛化——提出了系统性的解决方案。核心创新 I3D-ViT（Inflated 3D Vision Transformer）将 2D 图像分词器扩展为 3D 时空自注意力，通过帧分块、局部时空建模和时间池化，在保留运动信息的同时显著压缩视觉 token 数量。配合 Adaptive Frame Resolution 机制，模型可根据内容重要性动态调整空间分辨率，非关键时段低分辨率处理，关键时刻高分辨率精细感知。在数据层面，作者构建了 300 万条多模态指令数据，覆盖学术、长视频和流式三种场景，并采用课程学习策略渐进训练。仅 4B 参数的 VideoChat3 在 VideoMME、LVBench 等 10 余项基准上超越同等规模开源模型，训练和推理吞吐量均有显著提升。对于 music-to-dance 任务，I3D-ViT 的时空压缩技术可直接迁移用于降低舞蹈视频生成的计算成本，而完整开源的训练策略和数据集构建流程为复现和改进提供了坚实基础。",
        keyPoints: [
          "I3D-ViT 通过 3D 时空自注意力和时间池化实现视觉 token 压缩，缓解长视频计算瓶颈",
          "Adaptive Frame Resolution 根据内容重要性动态调整分辨率，平衡效率与感知精度",
          "完整开源模型权重、训练代码、数据集和构建流程，提供可复现的视频理解基座"
        ],
        href: "https://arxiv.org/abs/2607.14935",
        paperLink: "VideoChat3: Fully Open Video MLLM for Efficient and Generalist Video Understanding",
      },
      {
        num: 2,
        tag: "评估基准",
        title: "KeyFrame-Compass：关键帧条件视频生成综合评估",
        description: "关键帧条件生成是 music-to-dance 的核心场景——给定参考人物图作为首帧，生成该人物随音乐起舞的视频。KeyFrame-Compass 是首个专门针对多关键帧条件视频生成的评估基准，包含 386 个精心构建的测试样本，覆盖日常拍摄、产品可视化和电影叙事三个领域。评估框架将关键帧执行分解为 6 项互补指标：存在性（Presence）、保真度（Fidelity）、时序正确性（Ordering）、时间定位（Timing）、持续性（Persistence）和唯一性（Uniqueness）。实验发现当前模型在关键帧忠实度和自然视频合成之间存在明显权衡，且随着关键帧密度增加，模型性能显著下降。对于 dance video 生成，该基准提供的 6 项指标可直接用于量化评估外观一致性，特别是 Persistence 指标可衡量生成过程中人物外观的稳定性。",
        keyPoints: [
          "6 项关键帧执行指标覆盖存在、保真、时序、定位、持续和唯一性维度",
          "386 个样本覆盖 3 个应用领域、2 种视频结构、4 种关键帧密度",
          "当前开源模型在多关键帧理解上与领先闭源系统差距达 0.153 分"
        ],
        href: "https://arxiv.org/abs/2607.14202",
        paperLink: "KeyFrame-Compass: Towards Comprehensive Evaluation of Keyframe-Conditioned Video Generation",
      },
      {
        num: 3,
        tag: "评估基准",
        title: "MultiRef-Compass：多参考-音频-视频生成评估",
        description: "MultiRef-Compass 针对多参考到音频视频（MR2AV）生成任务构建了 350 个测试样本的评估基准。与单参考生成不同，MR2AV 要求模型理解多个参考图像之间的关系（如多视角同一人 vs. 不同实体），并将其正确绑定到文本描述的角色、动作和声音上。评估框架定义了 4 个维度 14 项子指标：基础质量、参考一致性、音视频一致性和指令遵循。其中 Audio-Visual Consistency 维度直接评估生成视频与音频的同步质量，包括声音源定位、事件-声音对应等细粒度指标。对于 music-to-dance 任务，该基准的音视频一致性评估框架可用于衡量生成舞蹈与音乐节拍的对齐质量，而多参考绑定机制对多人舞蹈或人物-场景组合生成具有参考价值。",
        keyPoints: [
          "14 项子指标覆盖基础质量、参考一致性、音视频一致性和指令遵循",
          "评估多参考理解、跨参考绑定和自然视觉整合三项核心能力",
          "音视频一致性维度提供声音源定位和事件-声音对应等细粒度评估"
        ],
        href: "https://arxiv.org/abs/2607.14189",
        paperLink: "MultiRef-Compass: Towards Comprehensive Evaluation of Multi-Reference-to-Audio-Video Generation",
      },
      {
        num: 4,
        tag: "视频生成",
        title: "HDR：面向多步视觉推理的分层去噪",
        description: "HDR（Hierarchical Denoising for Visual Reasoning）提出将分层隐变量引入流式自回归扩散模型，在保持低延迟流式生成的同时实现多步推理能力。核心设计是将视频隐变量组织为树状层级结构：粗粒度层保留不确定的全局规划假设，细粒度层逐步将其细化为具体视觉状态。配合 SHAP（Sparse Hierarchical Attention Pattern）稀疏层级注意力，每层 token 仅与局部上下文和父层通信，大幅降低时间注意力成本。在迷宫导航、汉诺塔、一笔画等 6 项多步推理任务上，HDR 将成功率从 34.22 提升至 60.29（相对提升 76.2%），同时保持 0.70 秒/隐元的流式延迟，比双向扩散快 54.2 倍。数据效率方面，仅用 2% 训练数据即可保留 82.9% 性能。对于 dance video 生成，HDR 的 coarse-to-fine 规划机制可用于实现舞蹈动作的分层生成——粗层规划整体动作序列，细层细化具体姿态，54.2 倍加速比对实时生成具有重要意义。",
        keyPoints: [
          "树状层级隐变量实现 coarse-to-fine 推理，粗层保留全局规划、细层细化视觉状态",
          "SHAP 稀疏注意力使每层仅与局部和父层通信，降低时间注意力成本",
          "54.2 倍加速于双向扩散，0.70 秒/隐元延迟支持低延迟流式生成"
        ],
        href: "https://arxiv.org/abs/2607.15278",
        paperLink: "Hierarchical Denoising For Multi-Step Visual Reasoning",
      },
      {
        num: 5,
        tag: "生成优化",
        title: "MeanFlowNFT：平均速度生成器的前向 RL 调优",
        description: "MeanFlow 通过预测时间区间内的平均速度实现少步采样，但如何对其进行 RL 调优以对齐人类偏好一直未解决。MeanFlowNFT 基于 MeanFlow 恒等式构建诱导瞬时速度预测器，将 DiffusionNFT 的前向过程 RL 目标应用于该预测器，使奖励优化对 MeanFlow 良定义，同时采样仍基于平均速度以保持少步效率。理论证明该方法继承 DiffusionNFT 的策略改进保证。实验显示，在 Wan 2.1 上 4 步 MeanFlowNFT 达到 VBench 84.33 分，超越 50 步 LongCat-Video RL（82.57）；在 SD3.5-M 上 8 项指标中 6 项超越先前少步 RL 调优方法。对于 music-to-dance 任务，MeanFlowNFT 提供了将舞蹈生成模型从多步（如 50 步）压缩到 4 步的完整路径，且无需反向过程轨迹或似然估计，训练效率显著优于 GRPO 类方法。",
        keyPoints: [
          "基于 MeanFlow 恒等式构建诱导瞬时速度预测器，使前向 RL 目标良定义",
          "4 步采样超越 50 步基线，在 Wan 2.1 上 VBench 84.33 vs 82.57",
          "无需反向轨迹或似然估计，训练效率优于 GRPO 类方法"
        ],
        href: "https://arxiv.org/abs/2607.15273",
        paperLink: "MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "D2DF：一步视频对象移除",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2607.14976",
        description: "通过特权蒸馏将多步草稿精炼能力压缩到单步模型，支持 draft-free 推理，单视频去噪约 1 秒。可用于舞蹈视频实时背景替换或对象移除。",
      },
      {
        num: 7,
        title: "FlashDecoder：实时 Transformer 视频解码器",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2607.14898",
        description: "纯 Transformer 视频解码器，滚动 KV Cache 实现常数延迟流式解码，Wan2.1 上 3.6-4.7 倍加速、11 倍内存降低。可直接用于舞蹈视频生成后处理加速。",
      },
      {
        num: 8,
        title: "WanSong：长音频生成技术报告",
        tag: "音频生成",
        href: "https://arxiv.org/abs/2607.14749",
        description: "纯扩散模型直接生成 5 分钟高保真歌曲，支持人声和背景音乐双轨输出。可作为舞蹈背景音乐生成或音乐-舞蹈联合生成的音频基座。",
      },
      {
        num: 9,
        title: "MIDI-RAE-JEPA：符号音乐层级表示学习",
        tag: "音乐理解",
        href: "https://arxiv.org/abs/2607.14537",
        description: "结合音高/时间移位等变目标与 LeJEPA 学习符号音乐的层级表示，解码器 F1 达 0.995。可用于音乐节拍结构理解，改善音频-舞蹈对齐。",
      },
      {
        num: 10,
        title: "ACID：视频生成的自适应缓存加速",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2607.12358",
        description: "动态监测漂移信号变化率，在关键步骤使用低阈值、其他步骤激进缓存，TeaCache+HunyuanVideo 上达 2.16 倍加速。可直接应用于现有视频扩散模型。",
      },
    ],
    observation: "本周论文呈现两个清晰的技术趋势。一是视频理解架构的革新：VideoChat3 的 I3D-ViT 通过时空联合建模和自适应分辨率，在 4B 参数规模实现了高效长视频理解，其技术路线对舞蹈视频的特征提取具有直接参考价值。二是少步生成与 RL 调优的融合：MeanFlowNFT 和 HDR 分别从优化目标和生成架构角度，将多步扩散模型压缩到 4 步甚至单步，同时保持或提升生成质量。对于 music-to-dance 的实时生成需求，这两条路线的结合——少步采样 + 分层规划——可能是实现可交互舞蹈生成的关键路径。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Video Understanding Architecture & Few-Step RL Tuning",
    overview: [
      "VideoChat3 introduces I3D-ViT and adaptive frame resolution for efficient long-video and streaming understanding",
      "KeyFrame-Compass and MultiRef-Compass establish evaluation benchmarks for keyframe/multi-reference video generation",
      "MeanFlowNFT achieves 4-step RL tuning surpassing 50-step baselines, providing acceleration path for real-time dance generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Understanding",
        title: "VideoChat3: Fully Open Video MLLM",
        description: "VideoChat3 addresses two critical bottlenecks in video MLLMs: computational efficiency and domain generalization. The core innovation I3D-ViT (Inflated 3D Vision Transformer) extends 2D image tokenizers to 3D spatiotemporal self-attention, compressing visual tokens while preserving motion information through frame chunking, local spatiotemporal modeling, and temporal pooling. Combined with Adaptive Frame Resolution that dynamically adjusts spatial resolution based on content importance, the system processes uninformative intervals at low resolution and critical moments at high resolution. The authors constructed 3 million multimodal instruction samples across academic, long-video, and streaming scenarios with curriculum learning. With only 4B parameters, VideoChat3 surpasses same-scale open-source models on 10+ benchmarks including VideoMME and LVBench. For music-to-dance tasks, I3D-ViT's spatiotemporal compression can directly reduce computational costs, while the fully open training strategy and dataset construction pipeline provide a solid foundation for reproduction and improvement.",
        keyPoints: [
          "I3D-ViT achieves visual token compression through 3D spatiotemporal self-attention and temporal pooling",
          "Adaptive Frame Resolution dynamically adjusts resolution based on content importance",
          "Fully open model weights, training code, datasets, and construction pipeline for reproducible research"
        ],
        href: "https://arxiv.org/abs/2607.14935",
        paperLink: "VideoChat3: Fully Open Video MLLM for Efficient and Generalist Video Understanding",
      },
      {
        num: 2,
        tag: "Evaluation Benchmark",
        title: "KeyFrame-Compass: Keyframe-Conditioned Video Generation Evaluation",
        description: "Keyframe-conditioned generation is central to music-to-dance: given a reference person image as the first frame, generate a video of that person dancing to music. KeyFrame-Compass is the first comprehensive benchmark for multi-keyframe-conditioned video generation, containing 386 curated test samples across daily capture, product visualization, and cinematic narrative domains. The evaluation framework decomposes keyframe execution into 6 complementary metrics: Presence, Fidelity, Ordering, Timing, Persistence, and Uniqueness. Experiments reveal a clear trade-off between keyframe fidelity and natural video synthesis, with performance degrading significantly as keyframe density increases. For dance video generation, these 6 metrics can directly quantify appearance consistency, with the Persistence metric specifically measuring character appearance stability throughout generation.",
        keyPoints: [
          "6 keyframe execution metrics covering presence, fidelity, ordering, timing, persistence, and uniqueness",
          "386 samples across 3 application domains, 2 video structures, and 4 keyframe densities",
          "Current open-source models lag leading proprietary systems by 0.153 points in multi-keyframe understanding"
        ],
        href: "https://arxiv.org/abs/2607.14202",
        paperLink: "KeyFrame-Compass: Towards Comprehensive Evaluation of Keyframe-Conditioned Video Generation",
      },
      {
        num: 3,
        tag: "Evaluation Benchmark",
        title: "MultiRef-Compass: Multi-Reference-to-Audio-Video Evaluation",
        description: "MultiRef-Compass builds a 350-sample evaluation benchmark for Multi-Reference-to-Audio-Video (MR2AV) generation. Unlike single-reference generation, MR2AV requires models to understand relationships between multiple reference images (e.g., multi-view same person vs. different entities) and correctly bind them to text-described roles, actions, and sounds. The evaluation framework defines 4 dimensions with 14 sub-metrics: Basic Quality, Reference Consistency, Audio-Visual Consistency, and Instruction Following. The Audio-Visual Consistency dimension directly evaluates synchronization quality between generated video and audio, including fine-grained metrics like sound source localization and event-sound correspondence. For music-to-dance tasks, this benchmark's audio-visual consistency framework can measure alignment quality between generated dance and music beats, while the multi-reference binding mechanism provides reference for multi-person dance or person-scene composition generation.",
        keyPoints: [
          "14 sub-metrics covering basic quality, reference consistency, audio-visual consistency, and instruction following",
          "Evaluates multi-reference understanding, cross-reference binding, and natural visual integration",
          "Audio-visual consistency dimension provides fine-grained evaluation of sound source localization and event-sound correspondence"
        ],
        href: "https://arxiv.org/abs/2607.14189",
        paperLink: "MultiRef-Compass: Towards Comprehensive Evaluation of Multi-Reference-to-Audio-Video Generation",
      },
      {
        num: 4,
        tag: "Video Generation",
        title: "HDR: Hierarchical Denoising for Multi-Step Visual Reasoning",
        description: "HDR introduces hierarchical latents into streaming autoregressive diffusion models, enabling multi-step reasoning while maintaining low-latency streaming generation. The core design organizes video latents into a tree-structured hierarchy: coarse layers preserve uncertain global planning hypotheses, while finer layers progressively refine them into concrete visual states. Paired with SHAP (Sparse Hierarchical Attention Pattern), tokens at each layer communicate only with local context and parent layers, significantly reducing temporal attention costs. On 6 multi-step reasoning tasks including maze navigation, Tower of Hanoi, and one-line drawing, HDR improves success rate from 34.22 to 60.29 (76.2% relative gain) while maintaining 0.70s per latent streaming latency—54.2× faster than bidirectional diffusion. Data efficiency is also strong: 82.9% performance retained with only 2% training data. For dance video generation, HDR's coarse-to-fine planning mechanism can enable hierarchical dance generation—coarse layers plan overall motion sequences, fine layers refine specific poses, with the 54.2× speedup being significant for real-time generation.",
        keyPoints: [
          "Tree-structured hierarchical latents enable coarse-to-fine reasoning: coarse layers for global planning, fine layers for visual refinement",
          "SHAP sparse attention allows each layer to communicate only with local and parent contexts, reducing temporal attention cost",
          "54.2× faster than bidirectional diffusion, 0.70s per latent latency supports low-latency streaming generation"
        ],
        href: "https://arxiv.org/abs/2607.15278",
        paperLink: "Hierarchical Denoising For Multi-Step Visual Reasoning",
      },
      {
        num: 5,
        tag: "Generation Optimization",
        title: "MeanFlowNFT: Forward-Process RL for Average-Velocity Generators",
        description: "MeanFlow achieves few-step sampling by predicting average velocities over time intervals, but how to apply RL tuning for human preference alignment remained unsolved. MeanFlowNFT constructs an induced instantaneous-velocity predictor based on the MeanFlow identity, applying DiffusionNFT's forward-process RL objective to this predictor—making reward optimization well-defined for MeanFlow while sampling remains based on average velocities to preserve few-step efficiency. Theory proves this method inherits DiffusionNFT's policy improvement guarantee. Experiments show 4-step MeanFlowNFT achieves VBench 84.33 on Wan 2.1, surpassing 50-step LongCat-Video RL (82.57); on SD3.5-M it exceeds prior few-step RL-tuned methods on 6 of 8 metrics. For music-to-dance tasks, MeanFlowNFT provides a complete path to compress dance generation models from many steps (e.g., 50) to 4 steps, without requiring reverse-process trajectories or likelihood estimation, with training efficiency significantly better than GRPO-style methods.",
        keyPoints: [
          "Constructs induced instantaneous-velocity predictor based on MeanFlow identity, making forward RL objective well-defined",
          "4-step sampling surpasses 50-step baseline: VBench 84.33 vs 82.57 on Wan 2.1",
          "No reverse trajectories or likelihood estimation needed, training efficiency better than GRPO methods"
        ],
        href: "https://arxiv.org/abs/2607.15273",
        paperLink: "MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "D2DF: One-Step Video Object Removal",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2607.14976",
        description: "Distills multi-step draft refinement capability into single-step model via privileged distillation, supporting draft-free inference with ~1 second denoising per video. Applicable for real-time background replacement or object removal in dance videos.",
      },
      {
        num: 7,
        title: "FlashDecoder: Real-Time Transformer Video Decoder",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2607.14898",
        description: "Pure Transformer video decoder with rolling KV Cache for constant-latency streaming decoding. 3.6-4.7× speedup and 11× memory reduction on Wan2.1. Directly applicable for accelerating dance video generation post-processing.",
      },
      {
        num: 8,
        title: "WanSong: Long-Form Audio Generation",
        tag: "Audio Generation",
        href: "https://arxiv.org/abs/2607.14749",
        description: "Pure diffusion model directly generates 5-minute high-fidelity songs with dual-stem output (vocals and background). Can serve as audio foundation for dance background music generation or joint music-dance generation.",
      },
      {
        num: 9,
        title: "MIDI-RAE-JEPA: Hierarchical Music Representation Learning",
        tag: "Music Understanding",
        href: "https://arxiv.org/abs/2607.14537",
        description: "Combines pitch/time-shift equivariance objectives with LeJEPA for learning hierarchical symbolic music representations, achieving decoder F1 of 0.995. Applicable for music beat structure understanding to improve audio-dance alignment.",
      },
      {
        num: 10,
        title: "ACID: Adaptive Caching for Video Generation",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2607.12358",
        description: "Dynamically monitors drift signal change rate, using low threshold at critical steps and aggressive caching elsewhere. Achieves 2.16× speedup on TeaCache+HunyuanVideo. Directly applicable to existing video diffusion models.",
      },
    ],
    observation: "This week's papers reveal two clear technical trends. First, innovation in video understanding architecture: VideoChat3's I3D-ViT achieves efficient long-video understanding at 4B parameters through joint spatiotemporal modeling and adaptive resolution, with direct reference value for dance video feature extraction. Second, the convergence of few-step generation and RL tuning: MeanFlowNFT and HDR respectively approach from optimization objectives and generation architecture, compressing multi-step diffusion models to 4 steps or even single step while maintaining or improving quality. For real-time music-to-dance generation, combining these two approaches—few-step sampling + hierarchical planning—may be the key path toward interactive dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-18`,
        'en': `/en/daily/music-to-dance/2026-07-18`,
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
      date="2026-07-18"
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
