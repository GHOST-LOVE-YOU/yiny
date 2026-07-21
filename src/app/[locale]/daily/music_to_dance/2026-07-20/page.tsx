import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-07-20 | 音视频对齐与高效推理",
    overview: [
      "AV-Flamingo 提出 TAVIT 时间锚定推理框架，为音频-视觉时序对齐提供新思路",
      "HDR 分层去噪架构在保持流式生成效率的同时提升多步推理一致性",
      "MeanFlowNFT 实现 4 步 RL 对齐生成，为舞蹈视频实时推理提供可能"
    ],
    papers: [
      {
        num: 1,
        tag: "音视频理解",
        title: "AV-Flamingo: 面向长视频的开源音视频大模型",
        description: "AV-Flamingo 是 NVIDIA 推出的完全开源的音视频大语言模型，核心创新在于 Temporal Audio-Visual Interleaved Chain-of-Thought (TAVIT) 框架——将中间推理步骤显式锚定到音视频流的时间戳。这与 music-to-dance 任务中音频节拍与动作对齐的核心问题高度同构。模型采用三阶段课程训练（短上下文→长上下文→CoT推理），在 MMOU 长视频理解基准上达到 60.2%，超越 Gemini-2.5 Pro (64.2%→60.2% 为闭源 vs 开源对比)。其跨模态时间对齐机制可直接借鉴到舞蹈生成中的音乐节拍-动作同步模块。",
        keyPoints: [
          "TAVIT 框架将推理步骤锚定到具体时间戳，提升时序对齐精度",
          "AV-Skills 数据集包含 7M 训练样本，强调跨模态时序推理",
          "在 15+ 音视频基准上达到 SOTA，MMOU 长视频理解 60.2%"
        ],
        href: "https://arxiv.org/abs/2607.16107",
        paperLink: "Audio-Visual Flamingo: Open Audio-Visual Intelligence for Long and Complex Videos",
      },
      {
        num: 2,
        tag: "视频推理",
        title: "HDR: 分层去噪实现多步视觉推理",
        description: "HDR (Hierarchical Denoising for Visual Reasoning) 提出树状层次化隐变量架构，在流式自回归扩散框架内实现粗到细的多步推理。粗层保持高噪声以保留多个可能的全局规划，细层逐步去噪实例化为具体视觉状态。核心设计 SHAP (Sparse Hierarchical Attention Pattern) 让每层 token 仅关注局部上下文和父层节点，将时序注意力成本从 O(N²) 降至 O(N)。在六项多步推理任务（迷宫、汉诺塔、一笔画等）上，HDR 将成功率从 34.22 提升至 60.29（+76.2%），同时保持 0.70s/latent 的低延迟流式生成，比双向扩散快 54.2 倍。",
        keyPoints: [
          "树状层次隐变量实现粗到细推理，粗层保留规划、细层实例化",
          "SHAP 稀疏注意力将时序注意力复杂度降至线性",
          "仅用 2% 训练数据即可保持 82.9% 全数据性能"
        ],
        href: "https://arxiv.org/abs/2607.15278",
        paperLink: "Hierarchical Denoising For Multi-Step Visual Reasoning",
      },
      {
        num: 3,
        tag: "高效采样",
        title: "MeanFlowNFT: 少步 RL 对齐的流模型",
        description: "MeanFlowNFT 将 DiffusionNFT 的前向过程 RL 框架扩展到 MeanFlow 生成器。通过 MeanFlow 恒等式构建诱导瞬时速度预测器，在保持少步采样效率的同时实现奖励优化。关键突破：在 Wan 2.1 视频生成上，4 步 MeanFlowNFT 达到 VBench 84.33，超越 50 步 LongCat-Video RL (82.57)。对于 music-to-dance 任务，这意味着可在 4 步内完成高质量舞蹈视频生成，推理速度提升 12 倍以上。论文证明该方法继承 DiffusionNFT 的策略改进保证，且无需修改采样流程。",
        keyPoints: [
          "4 步采样超越 50 步 RL 基线，VBench 84.33 vs 82.57",
          "前向过程 RL 训练，无需反向轨迹或似然估计",
          "采样流程不变，直接替换基线模型即可部署"
        ],
        href: "https://arxiv.org/abs/2607.15273",
        paperLink: "MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators",
      },
      {
        num: 4,
        tag: "注意力优化",
        title: "FVAttn: 自适应稀疏注意力的运行时负载均衡",
        description: "FVAttn 针对视频 DiT 的自适应 Top-p 稀疏注意力在序列并行下的负载不均衡问题，提出运行时负载均衡 (RLB) 机制。在稀疏掩码物化后，通过 P2P 通信迁移少量重载注意力头，将平均负载不均衡从 1.34 降至 1.08。Slack-Aware Sparse Augmentation (SASA) 将非关键 rank 的剩余算力转化为额外高价值块计算。在 Wan2.2 I2V 上实现 4.41 倍注意力加速和 2.02-2.11 倍 DiT 推理加速。对于依赖 3D Audio Attention 的 music-to-dance 系统，该方案可直接用于优化长序列注意力计算效率。",
        keyPoints: [
          "运行时负载均衡将负载不均衡因子从 1.34 降至 1.08",
          "4.41 倍注意力加速，2.02-2.11 倍 DiT 整体加速",
          "训练无关，直接应用于现有稀疏注意力系统"
        ],
        href: "https://arxiv.org/abs/2607.16190",
        paperLink: "FVAttn: Adaptive Sparse Attention with Runtime Load Balancing for Video Generation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "快慢异步架构：5Hz 思考、20Hz 执行的 VLA 推理",
        tag: "机器人",
        href: "https://arxiv.org/abs/2607.15621",
        description: "快慢系统分离架构：7B VLM 作为慢系统处理指令和视觉历史，轻量动作专家作为快系统每 50ms 回归航点。对实时舞蹈生成的帧率-延迟权衡有借鉴意义。",
      },
      {
        num: 6,
        title: "Orbis 2: 分层驾驶世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2607.15898",
        description: "扩散强制预训练+教师强制微调的两阶段范式，结合表征丰富性和 rollout 稳定性。可用于改进舞蹈视频生成的长程一致性。",
      },
      {
        num: 7,
        title: "EgoExoMoCap: 分布式 ego-exo 人体动作捕捉",
        tag: "动作捕捉",
        href: "https://arxiv.org/abs/2607.15868",
        description: "利用智能眼镜实现 ego-exo 多视角融合的动作捕捉，无需多相机或动捕服。对舞蹈动作数据采集的多视角融合策略有参考价值。",
      },
      {
        num: 8,
        title: "Exo2EgoPose: 跨视角 3D 手部姿态预测",
        tag: "姿态估计",
        href: "https://arxiv.org/abs/2607.15890",
        description: "利用外视角视频指导 ego 视角手部姿态预测的双层重建模块。对舞蹈中的手部动作估计和跨视角迁移有参考价值。",
      },
    ],
    observation: "今日论文呈现两个显著趋势：一是时序对齐技术的精细化——AV-Flamingo 的 TAVIT 将推理锚定到时间戳，HDR 的分层架构在粗层保留规划空间，两者都在解决长序列生成中的时序一致性问题；二是推理效率的极致优化——MeanFlowNFT 的 4 步采样和 FVAttn 的稀疏注意力负载均衡，共同推动视频生成向实时应用迈进。对于 music-to-dance 任务，这意味着未来可能实现：用 TAVIT 风格的机制对齐音乐节拍与动作关键点，用 HDR 的分层规划保证舞蹈序列的逻辑连贯性，用 MeanFlowNFT 的少步采样实现实时生成，用 FVAttn 优化高分辨率长视频的注意力开销。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-07-20 | Audio-Visual Alignment & Efficient Inference",
    overview: [
      "AV-Flamingo introduces TAVIT timestamp-grounded reasoning for audio-visual temporal alignment",
      "HDR's hierarchical denoising improves multi-step reasoning consistency while maintaining streaming efficiency",
      "MeanFlowNFT achieves RL-aligned generation in just 4 steps, enabling real-time dance video inference"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Visual Understanding",
        title: "AV-Flamingo: Open Audio-Visual Intelligence for Long Videos",
        description: "AV-Flamingo is NVIDIA's fully open-source audio-visual large language model. Its core innovation is the Temporal Audio-Visual Interleaved Chain-of-Thought (TAVIT) framework, which explicitly grounds intermediate reasoning steps to timestamps in audio-visual streams. This is highly isomorphic to the core challenge in music-to-dance tasks: aligning audio beats with motion. The model uses a three-stage curriculum (short-context → long-context → CoT reasoning) and achieves 60.2% on the MMOU long-video understanding benchmark. Its cross-modal temporal alignment mechanism can be directly adapted to the music beat-motion synchronization module in dance generation.",
        keyPoints: [
          "TAVIT framework anchors reasoning steps to specific timestamps for improved temporal alignment",
          "AV-Skills dataset contains 7M training samples emphasizing cross-modal temporal reasoning",
          "Achieves SOTA on 15+ AV benchmarks, 60.2% on MMOU long-video understanding"
        ],
        href: "https://arxiv.org/abs/2607.16107",
        paperLink: "Audio-Visual Flamingo: Open Audio-Visual Intelligence for Long and Complex Videos",
      },
      {
        num: 2,
        tag: "Video Reasoning",
        title: "HDR: Hierarchical Denoising for Multi-Step Visual Reasoning",
        description: "HDR proposes a tree-structured hierarchical latent architecture that enables coarse-to-fine multi-step reasoning within a streaming autoregressive diffusion framework. Coarse layers maintain high noise levels to preserve multiple possible global plans, while finer layers progressively denoise into concrete visual states. The core SHAP (Sparse Hierarchical Attention Pattern) design allows tokens at each level to attend only to local context and parent nodes, reducing temporal attention cost from O(N²) to O(N). On six multi-step reasoning tasks (maze, Tower of Hanoi, one-line drawing, etc.), HDR improves success rate from 34.22 to 60.29 (+76.2%) while maintaining low-latency streaming generation at 0.70s/latent, 54.2× faster than bidirectional diffusion.",
        keyPoints: [
          "Tree-structured hierarchical latents enable coarse-to-fine reasoning",
          "SHAP sparse attention reduces temporal attention complexity to linear",
          "Retains 82.9% of full-data performance with only 2% training data"
        ],
        href: "https://arxiv.org/abs/2607.15278",
        paperLink: "Hierarchical Denoising For Multi-Step Visual Reasoning",
      },
      {
        num: 3,
        tag: "Efficient Sampling",
        title: "MeanFlowNFT: Few-Step RL-Aligned Flow Models",
        description: "MeanFlowNFT extends the DiffusionNFT forward-process RL framework to MeanFlow generators. By constructing an induced instantaneous-velocity predictor via the MeanFlow identity, it enables reward optimization while preserving few-step sampling efficiency. Key breakthrough: on Wan 2.1 video generation, 4-step MeanFlowNFT achieves VBench 84.33, surpassing 50-step LongCat-Video RL (82.57). For music-to-dance tasks, this means high-quality dance video generation in just 4 steps, with 12×+ inference speedup. The paper proves this method inherits DiffusionNFT's policy improvement guarantee without modifying the sampling procedure.",
        keyPoints: [
          "4-step sampling surpasses 50-step RL baseline: VBench 84.33 vs 82.57",
          "Forward-process RL training without reverse trajectories or likelihood estimation",
          "Sampling pipeline unchanged—drop-in replacement for baseline models"
        ],
        href: "https://arxiv.org/abs/2607.15273",
        paperLink: "MeanFlowNFT: Bringing Forward-Process RL to Average-Velocity Generators",
      },
      {
        num: 4,
        tag: "Attention Optimization",
        title: "FVAttn: Runtime Load Balancing for Adaptive Sparse Attention",
        description: "FVAttn addresses the workload imbalance problem of adaptive Top-p sparse attention under sequence parallelism in video DiTs. It proposes Runtime Load Balancing (RLB): after sparse mask materialization, migrating a small number of heavy attention heads via P2P communication reduces average load imbalance from 1.34 to 1.08. Slack-Aware Sparse Augmentation (SASA) converts residual compute capacity on non-critical ranks into additional high-value block computation. On Wan2.2 I2V, it achieves 4.41× attention speedup and 2.02-2.11× DiT inference speedup. For music-to-dance systems relying on 3D Audio Attention, this approach can directly optimize long-sequence attention computation efficiency.",
        keyPoints: [
          "Runtime load balancing reduces imbalance factor from 1.34 to 1.08",
          "4.41× attention speedup, 2.02-2.11× overall DiT speedup",
          "Training-free—directly applicable to existing sparse attention systems"
        ],
        href: "https://arxiv.org/abs/2607.16190",
        paperLink: "FVAttn: Adaptive Sparse Attention with Runtime Load Balancing for Video Generation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Fast-Slow Async Architecture: 5Hz Think, 20Hz Act VLA Inference",
        tag: "Robotics",
        href: "https://arxiv.org/abs/2607.15621",
        description: "Fast-slow system separation: 7B VLM as slow system processing instructions and visual history, lightweight action expert as fast system regressing waypoints every 50ms. Relevant for frame rate-latency tradeoffs in real-time dance generation.",
      },
      {
        num: 6,
        title: "Orbis 2: Hierarchical Driving World Model",
        tag: "World Model",
        href: "https://arxiv.org/abs/2607.15898",
        description: "Two-stage paradigm: diffusion forcing pretraining + teacher forcing finetuning, combining representational richness and rollout stability. Applicable for improving long-range consistency in dance video generation.",
      },
      {
        num: 7,
        title: "EgoExoMoCap: Distributed Ego-Exo Human Motion Capture",
        tag: "Motion Capture",
        href: "https://arxiv.org/abs/2607.15868",
        description: "Uses smart glasses for ego-exo multi-view fusion motion capture without multi-camera setups or mocap suits. Reference value for multi-view fusion strategies in dance motion data collection.",
      },
      {
        num: 8,
        title: "Exo2EgoPose: Cross-View 3D Hand Pose Forecasting",
        tag: "Pose Estimation",
        href: "https://arxiv.org/abs/2607.15890",
        description: "Dual-level reconstruction module leveraging exocentric video to guide egocentric hand pose prediction. Reference value for hand motion estimation and cross-view transfer in dance.",
      },
    ],
    observation: "Today's papers reveal two notable trends: first, the refinement of temporal alignment technology—AV-Flamingo's TAVIT anchors reasoning to timestamps, and HDR's hierarchical architecture preserves planning space at coarse layers, both addressing temporal consistency in long-sequence generation. Second, the extreme optimization of inference efficiency—MeanFlowNFT's 4-step sampling and FVAttn's sparse attention load balancing together push video generation toward real-time applications. For music-to-dance tasks, this suggests a future architecture: TAVIT-style mechanisms for aligning music beats with motion keypoints, HDR-style hierarchical planning for ensuring logical coherence in dance sequences, MeanFlowNFT's few-step sampling for real-time generation, and FVAttn for optimizing attention overhead in high-resolution long videos.",
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
        'zh-CN': `/zh/daily/music_to_dance/2026-07-20`,
        'en': `/en/daily/music_to_dance/2026-07-20`,
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
      date="2026-07-20"
      roleId="music_to_dance"
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
