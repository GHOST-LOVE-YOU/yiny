import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-06-16 | 3D 重建与世界模型前沿",
    overview: [
      "3D Gaussian Splatting 在线重建技术实现实时相机追踪与全局优化",
      "交互式世界模型 DreamX-World 支持长时程视频生成与相机控制",
      "语言条件视频生成统一跨场景具身智能"
    ],
    papers: [
      {
        num: 1,
        tag: "3D 重建",
        title: "MoonSplat：基于 Sim(3) 全局优化的单目在线高斯重建",
        description: "MoonSplat 提出了一种鲁棒的在线体素化 3DGS 重建框架，通过 Sim(3) 全局优化模块联合优化相机位姿和高斯参数，实现了可靠的回环检测和全局优化。针对长序列中的内存瓶颈，采用体素化表示替代原始 3DGS，并引入颜色残差学习策略显著加速收敛。在 ScanNetV2 和 Tank-and-Temples 等数据集上，该方法在相机位姿估计精度和渲染质量上均达到 SOTA，同时保持实时性能。对于 music-to-dance 任务，其在线重建能力和全局优化机制可直接迁移用于舞蹈视频的实时 3D 场景表示和相机位姿估计，颜色残差学习策略也有助于提升人物外观细节的重建质量。",
        keyPoints: [
          "Sim(3) 全局优化实现相机位姿与高斯参数的联合优化和回环检测",
          "颜色残差学习策略加速体素化 3DGS 收敛并提升渲染质量",
          "基于 MAST3R 先验的鲁棒相机位姿估计，降低对相机基线的依赖"
        ],
        href: "https://arxiv.org/abs/2606.17935",
        paperLink: "MoonSplat: Monocular Online Gaussian Splatting with Sim(3) Global Optimization",
      },
      {
        num: 2,
        tag: "世界模型",
        title: "DreamX-World 1.0：通用交互式世界模型",
        description: "DreamX-World 是一个通用的文本/图像到视频交互式世界模型，支持跨真实感、游戏风格和艺术化领域的可控长时程生成。核心创新包括 E-PRoPE（轻量级投影位置编码）实现高效相机控制，相比 PRoPE 降低约 30% 推理延迟；记忆条件场景持久化机制通过相机几何检索保持长程一致性；自回归蒸馏与长程 rollout 训练显著减少跨块的风格漂移。在 8 张 RTX 5090 上达到 16FPS 的实时流式生成。对于音乐驱动舞蹈视频生成，其长时程一致性机制、相机控制方法和自回归生成策略具有直接参考价值，特别是减少风格漂移的技术可应用于舞蹈动作序列的时序一致性保持。",
        keyPoints: [
          "E-PRoPE 投影位置编码在保持轨迹跟随性能的同时降低 30% 延迟",
          "记忆条件场景持久化机制解决长程生成中的内容一致性问题",
          "DMD 蒸馏结合 RL 对齐实现少步自回归生成与视觉质量恢复"
        ],
        href: "https://arxiv.org/abs/2606.16993",
        paperLink: "DreamX-World 1.0: A General-Purpose Interactive World Model",
      },
      {
        num: 3,
        tag: "逆渲染",
        title: "BRDFusion：物理与生成结合的城市场景逆渲染",
        description: "BRDFusion 提出了一种统一框架，将物理渲染的可控性与生成模型的真实感相结合。在逆渲染阶段，利用生成模型作为正则化先验解决几何、材质和光照的歧义性分解；在前向渲染阶段，物理模型提供精确的光照控制，生成模型则去除噪声和伪影。场景采用 3D 高斯表示，支持动态物体场景图、HDR 环境光照和基于物理的渲染方程。该方法支持新视角重光照、夜间模拟和动态物体插入等应用。对于舞蹈视频生成，其光照解耦和材质分解技术可用于实现人物在不同光照条件下的外观一致性，动态物体编辑能力也为舞蹈场景中的人物编辑提供了技术参考。",
        keyPoints: [
          "物理-生成混合渲染框架结合可控性与真实感",
          "3D 高斯场景图表示支持动态物体和 HDR 环境光照",
          "SDEdit 风格的生成先验用于逆渲染正则化和前向渲染去噪"
        ],
        href: "https://arxiv.org/abs/2606.17049",
        paperLink: "BRDFusion: Physics Meets Generation for Urban Scene Inverse Rendering",
      },
      {
        num: 4,
        tag: "具身智能",
        title: "Qwen-RobotWorld：语言条件视频世界模型",
        description: "Qwen-RobotWorld 是一个以自然语言为统一动作接口的视频世界模型，通过双流 MMDiT 架构将冻结的 Qwen2.5-VL 语义与视频 VAE 潜空间耦合。构建了包含 860 万视频-文本对的 Embodied World Knowledge (EWK) 数据集，涵盖 20+ 具身形态和 500+ 动作类别。采用 General+Expert 渐进式课程策略，先在通用视觉数据上预训练，再注入具身专业化知识。在 EWMBench 和 DreamGen Bench 上均排名第一。对于 music-to-dance 任务，其语言-动作映射框架和跨模态对齐方法具有重要启发，特别是将异构动作信号统一为自然语言表示的思路，可借鉴用于音乐-舞蹈跨模态对齐的改进。",
        keyPoints: [
          "双流 MMDiT 架构实现语言语义与视觉潜空间的层间联合注意力",
          "动作-语言映射框架统一 20+ 具身形态和 500+ 动作类别",
          "General+Expert 渐进式课程实现跨场景稳定联合训练"
        ],
        href: "https://arxiv.org/abs/2606.17030",
        paperLink: "Qwen-RobotWorld Technical Report: Unifying Embodied World Modeling through Language-Conditioned Video Generation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Geometric Action Model：基于几何基础模型的机器人策略学习",
        tag: "机器人学习",
        href: "https://arxiv.org/abs/2606.17046",
        description: "将预训练几何基础模型作为感知、时序预测和动作解码的共享基底，GFM 共享表征空间的设计对人物动作生成中的 3D 几何推理有参考价值。",
      },
      {
        num: 6,
        title: "TIE：Masked Diffusion 解码轨迹跟踪与集成",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2606.16281",
        description: "通过跟踪答案相关位置的置信度动态选择可靠解码轨迹，对扩散模型生成舞蹈动作序列的稳定性可能有帮助。",
      },
      {
        num: 7,
        title: "Edit3DGS：动态头部编辑的统一框架",
        tag: "3D 编辑",
        href: "https://arxiv.org/abs/2606.17432",
        description: "结合 2D 指令引导扩散和 3DGS 实现动态头部编辑，时序一致性和身份保持技术可迁移到舞蹈视频的人物编辑。",
      },
      {
        num: 8,
        title: "DiffPC：基于扩散的投影仪光度补偿",
        tag: "物理约束",
        href: "https://arxiv.org/abs/2606.17521",
        description: "将光度补偿建模为带物理约束的去噪任务，对视频生成中的光照一致性处理有参考价值。",
      },
      {
        num: 9,
        title: "神经形态音频事件检测触发器",
        tag: "音频处理",
        href: "https://arxiv.org/abs/2606.17775",
        description: "基于脉冲神经网络的高效音频前端，对音乐节拍检测的计算优化有启发。",
      },
      {
        num: 10,
        title: "ELSA：细粒度音频-语义对齐评估",
        tag: "跨模态评估",
        href: "https://arxiv.org/abs/2606.17404",
        description: "事件级音频-文本对齐评估方法，对音乐驱动舞蹈的跨模态对齐质量评估有参考价值。",
      },
    ],
    observation: "今日论文呈现出一个明显趋势：3D Gaussian Splatting 正在从静态重建向动态、在线、可编辑方向演进。MoonSplat 的在线重建与全局优化、BRDFusion 的物理-生成混合渲染、Edit3DGS 的动态编辑，共同指向一个技术方向——将 3DGS 的实时渲染优势与扩散模型的生成能力结合，同时保持物理一致性和时序稳定性。这与 music-to-dance 任务的核心挑战高度契合：如何在生成高质量舞蹈视频的同时，保持人物身份、外观和动作的一致性。特别是 DreamX-World 的长程一致性机制和 Qwen-RobotWorld 的语言-动作对齐框架，为音乐-舞蹈跨模态生成提供了可直接借鉴的技术路径。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-06-16 | 3D Reconstruction & World Model Frontiers",
    overview: [
      "Online 3D Gaussian Splatting with real-time camera tracking and global optimization",
      "Interactive world model DreamX-World enables long-horizon video generation with camera control",
      "Language-conditioned video generation unifies cross-scenario embodied intelligence"
    ],
    papers: [
      {
        num: 1,
        tag: "3D Reconstruction",
        title: "MoonSplat: Monocular Online Gaussian Splatting with Sim(3) Global Optimization",
        description: "MoonSplat proposes a robust online voxelized 3DGS reconstruction framework that jointly optimizes camera poses and Gaussian parameters through Sim(3) global optimization, enabling reliable loop closure and global optimization. To address memory bottlenecks in long sequences, it adopts voxelized representation instead of raw 3DGS and introduces a color residual learning strategy that significantly accelerates convergence. On datasets like ScanNetV2 and Tank-and-Temples, the method achieves SOTA performance in camera pose estimation accuracy and rendering quality while maintaining real-time performance. For music-to-dance tasks, its online reconstruction capability and global optimization mechanism can be directly transferred to real-time 3D scene representation and camera pose estimation for dance videos, and the color residual learning strategy also helps improve the reconstruction quality of human appearance details.",
        keyPoints: [
          "Sim(3) global optimization enables joint optimization of camera poses and Gaussian parameters with loop closure",
          "Color residual learning strategy accelerates voxelized 3DGS convergence and improves rendering quality",
          "MAST3R prior-based robust camera pose estimation reduces reliance on camera baselines"
        ],
        href: "https://arxiv.org/abs/2606.17935",
        paperLink: "MoonSplat: Monocular Online Gaussian Splatting with Sim(3) Global Optimization",
      },
      {
        num: 2,
        tag: "World Model",
        title: "DreamX-World 1.0: A General-Purpose Interactive World Model",
        description: "DreamX-World is a general-purpose text/image-to-video interactive world model supporting controllable long-horizon generation across photorealistic, game-style, and stylized domains. Key innovations include E-PRoPE (lightweight projective positional encoding) for efficient camera control, reducing inference latency by ~30% compared to PRoPE; memory-conditioned scene persistence mechanism that maintains long-range consistency through camera-geometry-based retrieval; and autoregressive distillation with long-rollout training that significantly reduces style drift across chunks. Achieves 16FPS real-time streaming generation on 8 RTX 5090 GPUs. For music-driven dance video generation, its long-horizon consistency mechanisms, camera control methods, and autoregressive generation strategies have direct reference value, particularly the techniques for reducing style drift that can be applied to maintaining temporal consistency in dance motion sequences.",
        keyPoints: [
          "E-PRoPE projective positional encoding reduces latency by 30% while maintaining trajectory-following performance",
          "Memory-conditioned scene persistence mechanism addresses content consistency in long-horizon generation",
          "DMD distillation combined with RL alignment enables few-step autoregressive generation with visual quality recovery"
        ],
        href: "https://arxiv.org/abs/2606.16993",
        paperLink: "DreamX-World 1.0: A General-Purpose Interactive World Model",
      },
      {
        num: 3,
        tag: "Inverse Rendering",
        title: "BRDFusion: Physics Meets Generation for Urban Scene Inverse Rendering",
        description: "BRDFusion proposes a unified framework that combines the controllability of physically-based rendering with the photorealism of generative models. In the inverse rendering stage, generative models serve as regularization priors to resolve ambiguous decomposition of geometry, material, and lighting; in the forward rendering stage, the physical model provides precise lighting control while the generative model removes noise and artifacts. The scene uses 3D Gaussian representation, supporting dynamic object scene graphs, HDR environment lighting, and physics-based rendering equations. The method supports applications like novel-view relighting, night simulation, and dynamic object insertion. For dance video generation, its lighting disentanglement and material decomposition techniques can be used to achieve appearance consistency of human subjects under different lighting conditions, and the dynamic object editing capability also provides technical references for human editing in dance scenes.",
        keyPoints: [
          "Physics-generative hybrid rendering framework combines controllability and photorealism",
          "3D Gaussian scene graph representation supports dynamic objects and HDR environment lighting",
          "SDEdit-style generative prior for inverse rendering regularization and forward rendering denoising"
        ],
        href: "https://arxiv.org/abs/2606.17049",
        paperLink: "BRDFusion: Physics Meets Generation for Urban Scene Inverse Rendering",
      },
      {
        num: 4,
        tag: "Embodied AI",
        title: "Qwen-RobotWorld: Language-Conditioned Video World Model",
        description: "Qwen-RobotWorld is a video world model with natural language as a unified action interface, coupling frozen Qwen2.5-VL semantics with video VAE latent space through a double-stream MMDiT architecture. It constructs the Embodied World Knowledge (EWK) dataset containing 8.6M video-text pairs, covering 20+ embodiment types and 500+ action categories. Adopts a General+Expert progressive curriculum strategy, first pre-training on general visual data then injecting embodied specialization knowledge. Ranks #1 on both EWMBench and DreamGen Bench. For music-to-dance tasks, its language-action mapping framework and cross-modal alignment methods provide important insights, especially the approach of unifying heterogeneous action signals into natural language representations, which can be borrowed for improving music-dance cross-modal alignment.",
        keyPoints: [
          "Double-stream MMDiT architecture enables layer-wise joint attention between language semantics and visual latent space",
          "Action-language mapping framework unifies 20+ embodiment types and 500+ action categories",
          "General+Expert progressive curriculum enables stable cross-scenario joint training"
        ],
        href: "https://arxiv.org/abs/2606.17030",
        paperLink: "Qwen-RobotWorld Technical Report: Unifying Embodied World Modeling through Language-Conditioned Video Generation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Geometric Action Model: Robot Policy Learning with Geometric Foundation Models",
        tag: "Robot Learning",
        href: "https://arxiv.org/abs/2606.17046",
        description: "Using pretrained geometric foundation models as shared substrate for perception, temporal prediction, and action decoding; GFM shared representation space design provides reference value for 3D geometric reasoning in human motion generation.",
      },
      {
        num: 6,
        title: "TIE: Tracking Reliable Trajectories for Ensembling Masked Diffusion",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2606.16281",
        description: "Dynamically selecting reliable decoding trajectories by tracking confidence at answer-relevant positions; may help improve stability of diffusion models for dance motion sequence generation.",
      },
      {
        num: 7,
        title: "Edit3DGS: Unified Framework for Dynamic Head Editing",
        tag: "3D Editing",
        href: "https://arxiv.org/abs/2606.17432",
        description: "Combining 2D instruction-guided diffusion with 3DGS for dynamic head editing; temporal consistency and identity preservation techniques can be transferred to human editing in dance videos.",
      },
      {
        num: 8,
        title: "DiffPC: Diffusion-Based Projector Photometric Compensation",
        tag: "Physical Constraints",
        href: "https://arxiv.org/abs/2606.17521",
        description: "Modeling photometric compensation as a denoising task with physical constraints; provides reference value for lighting consistency processing in video generation.",
      },
      {
        num: 9,
        title: "Neuromorphic Trigger for Efficient Audio Event Detection",
        tag: "Audio Processing",
        href: "https://arxiv.org/abs/2606.17775",
        description: "Spiking neural network-based efficient audio frontend; provides inspiration for computational optimization of music beat detection.",
      },
      {
        num: 10,
        title: "ELSA: Fine-Grained Audio-Semantic Alignment Evaluation",
        tag: "Cross-Modal Evaluation",
        href: "https://arxiv.org/abs/2606.17404",
        description: "Event-level audio-text alignment evaluation method; provides reference value for cross-modal alignment quality evaluation in music-driven dance generation.",
      },
    ],
    observation: "Today's papers reveal a clear trend: 3D Gaussian Splatting is evolving from static reconstruction toward dynamic, online, and editable directions. MoonSplat's online reconstruction with global optimization, BRDFusion's physics-generative hybrid rendering, and Edit3DGS's dynamic editing collectively point to a technical direction—combining 3DGS's real-time rendering advantages with diffusion models' generative capabilities while maintaining physical consistency and temporal stability. This aligns closely with the core challenges of music-to-dance tasks: how to generate high-quality dance videos while maintaining consistency in human identity, appearance, and motion. Particularly, DreamX-World's long-horizon consistency mechanisms and Qwen-RobotWorld's language-action alignment framework provide directly transferable technical pathways for music-dance cross-modal generation.",
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
        'zh-CN': `/zh/daily/music_to_dance/2026-06-16`,
        'en': `/en/daily/music_to_dance/2026-06-16`,
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
      date="2026-06-16"
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
