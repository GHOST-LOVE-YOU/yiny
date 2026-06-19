import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "世界模型与扩散生成：从交互式视频到频谱优化",
    overview: [
      "DreamX-World 1.0 实现通用交互式世界模型，支持长时程可控视频生成与实时流式推理",
      "Qwen-RobotWorld 通过 Double-Stream MMDiT 架构统一语言条件视频生成",
      "ActWorld 提出动作感知记忆机制解决长时程交互中的一致性问题"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型",
        title: "DreamX-World 1.0：通用交互式世界模型",
        description: "DreamX-World 1.0 是一个通用交互式文本/图像到视频的世界模型，支持可控的长时程生成。它通过因果强制、DMD风格蒸馏和长时程训练，将双向视频生成器转换为少步自回归世界模型。论文提出的 E-PRoPE 相机控制机制通过投影位置编码实现精确的视角控制，同时降低30%推理延迟；Memory-Conditioned Scene Persistence 利用相机几何检索来保持场景内容在长时间跨度内的一致性。",
        keyPoints: [
          "E-PRoPE：轻量级投影位置编码变体，在保持相机控制性能的同时降低30%推理延迟",
          "DMD蒸馏将50步采样压缩到3步，实现16FPS实时流式生成",
          "记忆条件场景持久化通过相机几何检索保持长时程一致性"
        ],
        href: "https://arxiv.org/abs/2606.16993",
        paperLink: "DreamX-World 1.0: A General-Purpose Interactive World Model",
      },
      {
        num: 2,
        tag: "视频生成",
        title: "Qwen-RobotWorld：通过语言条件视频生成统一具身世界建模",
        description: "Qwen-RobotWorld 采用 Double-Stream MMDiT 架构，理解流使用冻结的 Qwen2.5-VL 编码器处理动作/语言特征，生成流处理视频 VAE latent，两者通过层间联合注意力进行双向跨模态融合。这种架构与 music-to-dance 的音频条件生成高度同构——将音频特征输入理解流即可实现音频驱动的视频生成。",
        keyPoints: [
          "Double-Stream MMDiT：理解流与生成流通过层间联合注意力双向融合",
          "860万视频-文本对、500+动作类别的具身世界知识数据集",
          "通用+专家渐进课程训练策略实现跨场景稳定联合训练"
        ],
        href: "https://arxiv.org/abs/2606.17030",
        paperLink: "Qwen-RobotWorld Technical Report: Unifying Embodied World Modeling through Language-Conditioned Video Generation",
      },
      {
        num: 3,
        tag: "记忆机制",
        title: "ActWorld：通过动作感知记忆实现可探索到交互式世界模型",
        description: "ActWorld 诊断的「动作遗忘」问题——交互关键帧因时间距离被压缩到粗粒度桶中——与舞蹈生成中关键姿态在长时间序列中被稀释的问题同构。论文提出的 Event-Aware Frame Routing (EAFR) 用重要性评分替代时间分桶；Persistent Action-Aware Memory Bank 维护事件token和对象token跨块边界持久化。",
        keyPoints: [
          "Event-Aware Frame Routing：用重要性评分替代时间分桶，关键帧即使久远也能进入细粒度记忆",
          "Persistent Action-Aware Memory Bank：DINOv3提取视觉锚点，FIFO策略保留最多16个token",
          "ACHA：根据动作类别动态调整历史键的注意力权重"
        ],
        href: "https://arxiv.org/abs/2606.17730",
        paperLink: "ActWorld: From Explorable to Interactive World Model via Action-Aware Memory",
      },
      {
        num: 4,
        tag: "扩散模型",
        title: "SyncVC：基于变分测试时优化的扩散同步",
        description: "SyncVC 为 music-to-dance 的多模态协同生成提供了理论基础。论文将扩散同步形式化为变分推断问题：引入控制变量耦合相邻去噪轨迹，ELBO平衡最大化期望奖励（一致性）和保持接近扩散先验（KL正则）。这对音频-视觉对齐的启示：可将音频节拍检测作为奖励函数，在采样过程中强制视频帧与音乐节拍对齐。",
        keyPoints: [
          "基于最优控制数学推导扩散同步框架，提供原则性解释",
          "变分控制变量优化：在每个时间步优化控制变量引导多轨迹朝向连贯解",
          "ELBO平衡一致性奖励与扩散先验正则化"
        ],
        href: "https://arxiv.org/abs/2606.15614",
        paperLink: "Variational Test-time Optimization for Diffusion Synchronization",
      },
      {
        num: 5,
        tag: "扩散优化",
        title: "Spectral Forcing：像素空间扩散的频谱强制",
        description: "Spectral Forcing 为像素空间扩散模型提供了即插即用的训练改进。核心洞察：在rectified-flow中，每频段数据-噪声比 DNR(k,t) = k^(-α)/(1-t)^2，其单位水平集给出截止频率 k*(t) = (1-t)^(-2/α)。该方法在输入侧显式施加这一边界：应用时间条件的2D-DCT低通掩码，截止半径随扩散时间单调增长。",
        keyPoints: [
          "数据-噪声比分析：DNR(k,t) = k^(-α)/(1-t)^2 定义信号与噪声区域边界",
          "无参数2D-DCT低通算子，在patch嵌入器之前应用于噪声输入",
          "ImageNet-256上FID提升14%，Inception Score提升13%"
        ],
        href: "https://arxiv.org/abs/2606.15236",
        paperLink: "Show the Signal, Hide the Noise: Spectral Forcing for Pixel-Space Diffusion",
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "EgoCS-400K：面向世界模型的第一人称游戏数据集",
        tag: "数据集",
        href: "https://arxiv.org/abs/2606.18180",
        description: "40万第一人称视频、1万小时游戏数据，支持动作条件预测和状态感知场景展开。"
      },
      {
        num: 7,
        title: "Looped World Models",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.18208",
        description: "首个循环架构世界模型，实现100倍参数效率和自适应计算深度。"
      },
      {
        num: 8,
        title: "UniAR：统一多模态自回归建模",
        tag: "多模态",
        href: "https://arxiv.org/abs/2606.18249",
        description: "单一离散视觉tokenizer连接理解与生成，可用于舞蹈视频的离散表示学习。"
      },
      {
        num: 9,
        title: "TuneJury：音乐生成偏好对齐的开放指标",
        tag: "音频",
        href: "https://arxiv.org/abs/2606.17006",
        description: "文本到音乐的成对奖励模型，其音频偏好建模方法可迁移到音频-运动对齐评估。"
      },
      {
        num: 10,
        title: "BRDFusion：物理与生成结合的城市场景逆渲染",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2606.17049",
        description: "物理渲染与生成模型结合的思路对可控舞蹈视频生成有启发。"
      },
      {
        num: 11,
        title: "音频-语言模型时间理解失败模式分析",
        tag: "音频",
        href: "https://arxiv.org/abs/2606.17417",
        description: "发现重分配音频token注意力比增加音频注意力更有效，对音频-视觉对齐有参考价值。"
      }
    ]
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "World Models & Diffusion Generation: From Interactive Video to Spectral Optimization",
    overview: [
      "DreamX-World 1.0 enables general-purpose interactive world models with long-horizon controllable video generation",
      "Qwen-RobotWorld unifies language-conditioned video generation through Double-Stream MMDiT architecture",
      "ActWorld proposes action-aware memory mechanisms to solve consistency issues in long-horizon interaction"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model",
        title: "DreamX-World 1.0: A General-Purpose Interactive World Model",
        description: "DreamX-World 1.0 is a general-purpose interactive text/image-to-video world model supporting controllable long-horizon generation. It converts bidirectional video generators into few-step autoregressive world models using causal forcing, DMD-style distillation, and long-rollout training. The proposed E-PRoPE camera control mechanism achieves precise viewpoint control through projective positional encoding while reducing inference latency by 30%.",
        keyPoints: [
          "E-PRoPE: Lightweight projective positional encoding reducing inference latency by 30%",
          "DMD distillation compresses 50 sampling steps to 3, achieving 16FPS real-time streaming",
          "Memory-conditioned scene persistence maintains long-horizon consistency through camera-geometry-based retrieval"
        ],
        href: "https://arxiv.org/abs/2606.16993",
        paperLink: "DreamX-World 1.0: A General-Purpose Interactive World Model",
      },
      {
        num: 2,
        tag: "Video Generation",
        title: "Qwen-RobotWorld: Unifying Embodied World Modeling through Language-Conditioned Video Generation",
        description: "Qwen-RobotWorld adopts Double-Stream MMDiT architecture where the understanding stream processes action/language features using frozen Qwen2.5-VL encoder and the generation stream processes video VAE latents, with bidirectional cross-modal fusion via layer-wise joint attention. This architecture is highly isomorphic to audio-conditioned generation in music-to-dance.",
        keyPoints: [
          "Double-Stream MMDiT: Understanding and generation streams fuse bidirectionally through layer-wise joint attention",
          "8.6M video-text pairs, 500+ action categories in Embodied World Knowledge dataset",
          "General+Expert progressive curriculum enables stable joint training across scenarios"
        ],
        href: "https://arxiv.org/abs/2606.17030",
        paperLink: "Qwen-RobotWorld Technical Report: Unifying Embodied World Modeling through Language-Conditioned Video Generation",
      },
      {
        num: 3,
        tag: "Memory Mechanism",
        title: "ActWorld: From Explorable to Interactive World Model via Action-Aware Memory",
        description: "The 'action-forgetting' problem diagnosed in ActWorld—interaction keyframes being compressed to coarse buckets due to temporal distance—is isomorphic to key poses being diluted in long dance sequences. The paper proposes Event-Aware Frame Routing (EAFR) replacing time-based bucketing with importance scoring.",
        keyPoints: [
          "Event-Aware Frame Routing: Replaces time-based bucketing with importance scoring",
          "Persistent Action-Aware Memory Bank: DINOv3 extracts visual anchors, FIFO policy retains up to 16 tokens",
          "ACHA: Dynamically adjusts history key attention weights based on action class"
        ],
        href: "https://arxiv.org/abs/2606.17730",
        paperLink: "ActWorld: From Explorable to Interactive World Model via Action-Aware Memory",
      },
      {
        num: 4,
        tag: "Diffusion Model",
        title: "SyncVC: Variational Test-time Optimization for Diffusion Synchronization",
        description: "SyncVC provides theoretical foundations for multi-modal collaborative generation in music-to-dance. The paper formalizes diffusion synchronization as variational inference: introducing control variables coupling adjacent denoising trajectories, with ELBO balancing maximizing expected reward and staying close to diffusion prior.",
        keyPoints: [
          "Mathematical derivation of diffusion synchronization framework based on optimal control",
          "Variational control variable optimization at each timestep",
          "ELBO balances consistency reward with diffusion prior regularization"
        ],
        href: "https://arxiv.org/abs/2606.15614",
        paperLink: "Variational Test-time Optimization for Diffusion Synchronization",
      },
      {
        num: 5,
        tag: "Diffusion Optimization",
        title: "Spectral Forcing for Pixel-Space Diffusion",
        description: "Spectral Forcing provides plug-and-play training improvements for pixel-space diffusion models. Core insight: in rectified-flow, per-band data-to-noise ratio DNR(k,t) = k^(-α)/(1-t)^2, whose unit level set gives cutoff frequency k*(t) = (1-t)^(-2/α). The method explicitly imposes this boundary at input with time-conditional 2D-DCT low-pass mask.",
        keyPoints: [
          "Data-to-noise ratio analysis: DNR(k,t) = k^(-α)/(1-t)^2 defines signal vs noise region boundary",
          "Parameter-free 2D-DCT low-pass operator applied to noisy input before patch embedder",
          "ImageNet-256: FID improves 14%, Inception Score improves 13%"
        ],
        href: "https://arxiv.org/abs/2606.15236",
        paperLink: "Show the Signal, Hide the Noise: Spectral Forcing for Pixel-Space Diffusion",
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "EgoCS-400K: Egocentric Gameplay Dataset for World Models",
        tag: "Dataset",
        href: "https://arxiv.org/abs/2606.18180",
        description: "400K first-person videos, 10K hours of gameplay data supporting action-conditioned prediction."
      },
      {
        num: 7,
        title: "Looped World Models",
        tag: "World Model",
        href: "https://arxiv.org/abs/2606.18208",
        description: "First looped architecture world model achieving 100x parameter efficiency."
      },
      {
        num: 8,
        title: "UniAR: Unified Multimodal Autoregressive Modeling",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2606.18249",
        description: "Single discrete visual tokenizer connecting understanding and generation."
      },
      {
        num: 9,
        title: "TuneJury: Open Metric for Music Generation Preference Alignment",
        tag: "Audio",
        href: "https://arxiv.org/abs/2606.17006",
        description: "Text-to-music pairwise reward model transferable to audio-motion alignment."
      },
      {
        num: 10,
        title: "BRDFusion: Physics Meets Generation for Urban Scene Inverse Rendering",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2606.17049",
        description: "Physics-generation combination approach inspiring controllable dance video generation."
      },
      {
        num: 11,
        title: "Failure Modes in Temporal Understanding of Large Audio-Language Models",
        tag: "Audio",
        href: "https://arxiv.org/abs/2606.17417",
        description: "Redistributing attention across audio tokens more effective than increasing audio attention."
      }
    ]
  }
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
        'zh-CN': `/zh/daily/music_to_dance/2025-06-17`,
        'en': `/en/daily/music_to_dance/2025-06-17`,
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
      date="2025-06-17"
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
    </DigestLayout>
  )
}
