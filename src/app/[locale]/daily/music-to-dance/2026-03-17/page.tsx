import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "统一控制与几何感知：视频扩散模型的新进展",
    overview: [
      "Tri-Prompting 提出场景-主体-运动三维统一控制框架，为人物外观保持和动作控制提供新思路",
      "ViFeEdit 实现无需视频数据的视频扩散模型调优，大幅降低数据收集成本",
      "Riemannian Motion Generation 将人体运动生成引入非欧几里得几何空间，提升动作物理合理性",
      "ECHO 展示云边协同的文本到运动生成架构，其紧凑运动表示可直接借鉴用于音频驱动"
    ],
    papers: [
      {
        num: 1,
        tag: "视频控制",
        title: "Tri-Prompting：场景-主体-运动统一控制的视频扩散框架",
        description: "Tri-Prompting 提出首个将场景合成、多视角主体一致性和运动控制统一在单一模型中的框架。其核心设计是双条件运动模块：对场景运动采用 3D 点 XYZ 轨迹控制，对主体运动则引入下采样 RGB 网格作为粗粒度代理。这种设计天然解耦了前景与背景运动，支持大视角变化（如 360° 旋转）同时保持多视角外观一致性。对于 music-to-dance 任务，该框架的主体控制机制可直接迁移：多视角参考图融合可解决当前方案中参考人物外观漂移问题，而 RGB 代理的运动表示可替换为音频节拍特征，实现音频驱动的舞蹈动作控制。论文在 Phantom 和 DaS 等专门化基线上取得显著优势，且训练数据仅需 11k 元组（<7 小时视频），数据效率极高。",
        keyPoints: [
          "双条件运动控制：XYZ 轨迹控制场景运动，RGB 网格代理控制主体运动，实现前景背景解耦",
          "多视角主体一致性：融合多达 3 张多视角参考图，支持 360° 大视角变化下的身份保持",
          "迁移价值：RGB 代理机制可替换为音频特征，实现音频节拍与舞蹈动作的精准对齐"
        ],
        href: "https://arxiv.org/abs/2603.15614",
        paperLink: "Tri-Prompting: Video Diffusion with Unified Control over Scene, Subject, and Motion",
      },
      {
        num: 2,
        tag: "视频编辑",
        title: "ViFeEdit：无需视频数据的视频扩散 Transformer 调优框架",
        description: "ViFeEdit 解决了视频编辑任务中配对视频数据稀缺和训练成本高昂的核心痛点。通过架构重参数化技术，该方法将现代视频扩散 Transformer 中的完整 3D 注意力解耦为空间独立组件，使模型仅通过 2D 图像训练即可掌握视频编辑能力，同时保持预训练时间模块不变以确保时序一致性。具体实现上，ViFeEdit 引入一对互补的 2D 空间注意力块，初始化时相互抵消以保留原始 3D 注意力行为，训练时则学习空间编辑操作。双路径管道设计为潜在状态和条件信号分配独立的时间步嵌入，促进稳定优化。对于 music-to-dance 研究，这一 video-free 范式意义重大：当前方案需要大量配对的音乐-舞蹈视频数据，而 ViFeEdit 表明仅需 100-250 对 2D 图像即可训练出有效的视频生成能力，可大幅降低数据收集成本。其 3D 注意力解耦机制也可用于优化当前的 Audio Attention 模块。",
        keyPoints: [
          "架构重参数化：将 3D 注意力解耦为空间组件，冻结时间模块以保持时序一致性",
          "Video-Free 训练：仅需 100-250 对 2D 图像，无需任何视频数据即可完成调优",
          "迁移价值：大幅降低 music-to-dance 数据收集成本，3D 注意力解耦可优化 Audio Attention 设计"
        ],
        href: "https://arxiv.org/abs/2603.15478",
        paperLink: "ViFeEdit: A Video-Free Tuner of Your Video Diffusion Transformer",
      },
      {
        num: 3,
        tag: "运动生成",
        title: "Riemannian Motion Generation：基于黎曼流匹配的人体运动生成",
        description: "该论文指出人体运动生成通常在欧几里得空间学习，但有效运动实际遵循结构化的非欧几里得几何。Riemannian Motion Generation (RMG) 将运动表示为乘积流形上的点，通过黎曼流匹配学习动力学。具体而言，RMG 将运动分解为全局平移（R³）、全局朝向与关节旋转（单位四元数 S³ 的乘积）和局部姿态（Kendall 预形状空间），每个因子位于其自然流形上。这种表示具有尺度无关性和内在归一化特性，无需数据集级别的均值/标准差归一化。训练时使用测地线插值代替线性插值，在切空间监督速度场，并采用流形保持的 ODE 积分进行采样。在 HumanML3D 基准上，RMG 取得 SOTA FID（0.043），在 MotionMillion 大规模数据集上也显著超越强基线。对于 music-to-dance 任务，RMG 的几何感知建模可直接改进舞蹈动作生成：当前扩散模型常生成物理不连贯的动作，而 RMG 的流形保持采样可确保生成的舞蹈动作符合人体运动学约束。",
        keyPoints: [
          "几何感知表示：将运动分解为 T+R+P 三个流形因子，维度从 12J-1 降至 4J+3",
          "黎曼流匹配：使用测地线插值和切空间监督，实现几何一致的生成动力学",
          "迁移价值：流形保持采样可确保舞蹈动作的物理合理性，解决当前方案的运动学约束问题"
        ],
        href: "https://arxiv.org/abs/2603.15016",
        paperLink: "Riemannian Motion Generation: A Unified Framework for Human Motion Representation and Generation via Riemannian Flow Matching",
      },
      {
        num: 4,
        tag: "机器人控制",
        title: "ECHO：云边协同的文本到运动控制框架",
        description: "ECHO 提出一种云边分离的文本驱动人形机器人全身控制架构。云端部署的扩散模型基于 1D 卷积 UNet，通过 CLIP 编码的文本特征进行条件化，使用 DDIM 采样在约 1 秒内生成运动序列；边缘端则部署轻量级强化学习跟踪器，通过教师-学生范式蒸馏 privileged teacher 策略，配备证据适应模块处理 sim-to-real 迁移。关键创新在于紧凑的 38 维机器人原生运动表示：每帧包含 29 维关节角度、2 维根平面速度、1 维根高度和 6 维连续根朝向，消除推理时从人体模型到机器人的重定向开销，直接兼容 PD 控制器。对于 music-to-dance 研究，ECHO 的架构设计具有直接借鉴价值：其 CLIP 条件化的扩散生成器与当前 audio-to-dance 方案高度相似，而 38 维紧凑表示可启发设计音频驱动的运动潜空间。此外，其教师-学生跟踪策略和形态对称约束也可用于改进舞蹈动作的后处理和平滑。",
        keyPoints: [
          "云边协同架构：云端扩散生成 + 边缘 RL 跟踪，平衡生成质量与实时控制",
          "紧凑运动表示：38 维机器人原生表示，消除重定向开销，直接兼容低层控制",
          "迁移价值：CLIP-扩散架构与 audio-to-dance 相似，紧凑表示可启发音频驱动运动潜空间设计"
        ],
        href: "https://arxiv.org/abs/2603.16188",
        paperLink: "ECHO: Edge-Cloud Humanoid Orchestration for Language-to-Motion Control",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "渐进式 3D 高斯头像表示与层级化细节控制",
        tag: "3D 头像",
        href: "https://arxiv.org/abs/2603.16447",
        description: "ProgressiveAvatars 提出基于 3D 高斯层级结构的渐进式头像表示，通过自适应隐式细分在模板网格上生长高斯层次。其层级扩展机制可根据屏幕空间信号动态分配资源，支持增量加载和渲染。对于 music-to-dance，该层级化细节控制机制可优化参考图特征提取，实现自适应的人物外观保持。",
      },
      {
        num: 6,
        title: "VIGOR：基于几何的视频扩散时间一致性奖励模型",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2603.16271",
        description: "VIGOR 提出利用预训练几何基础模型评估多视角一致性的几何奖励模型，通过跨帧重投影误差计算点级误差度量。该奖励模型可通过 SFT 或强化学习对齐视频扩散模型，也可用于测试时缩放。对于舞蹈视频生成，该几何一致性奖励可直接用于评估生成动作的时间连贯性。",
      },
      {
        num: 7,
        title: "EverTale：持续故事角色定制与 LoRA 集成",
        tag: "角色定制",
        href: "https://arxiv.org/abs/2603.16285",
        description: "EverTale 提出 All-in-One-World Character Integrator，在统一 LoRA 模块中实现持续角色适应，无需每角色优化。其 Character Quality Gate 通过 MLLM-as-Judge 确保每次角色适应的保真度。对于 music-to-dance，该持续角色定制策略可为参考人物外观迁移提供新思路。",
      },
      {
        num: 8,
        title: "HSImul3R：物理约束下的人场景交互重建",
        tag: "物理仿真",
        href: "https://arxiv.org/abs/2603.15612",
        description: "HSImul3R 提出物理双向优化管道，将物理仿真器作为主动监督者联合优化人体动力学和场景几何。前向方向使用场景目标强化学习优化运动，反向方向利用仿真反馈优化场景几何。对于舞蹈生成，该物理约束优化技术可引入运动合理性约束，解决扩散模型生成不自然动作的问题。",
      },
      {
        num: 9,
        title: "Spectrum Matching：潜在扩散的频谱匹配理论",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2603.14645",
        description: "该论文提出 Spectrum Matching 假设：优质潜变量应遵循扁平化的幂律 PSD 并保持频率到语义的对应关系。通过编码频谱匹配（ESM）和解码频谱匹配（DSM），可显著提升扩散生成质量。对于 music-to-dance，该理论可优化 VAE 的潜在空间学习，改善生成视频的视觉质量。",
      },
    ],
    observation: "今日论文呈现出视频扩散模型向统一控制和几何感知发展的趋势。Tri-Prompting、ViFeEdit 和 ECHO 共同展示了多模态条件（文本/图像/音频）到视频/运动生成的技术收敛：统一的控制框架、解耦的时空建模、紧凑的运动表示成为关键设计模式。对于 music-to-dance 任务，这意味着可以构建一个统一的音频-视觉-运动生成框架：音频节拍作为运动控制信号，参考人物图作为外观条件，扩散模型作为生成骨干，几何约束确保物理合理性。Riemannian Motion Generation 更揭示了几何感知建模的重要性——将运动生成从欧几里得空间迁移到流形空间，可能是提升舞蹈动作质量的关键突破口。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Unified Control and Geometry Awareness: New Advances in Video Diffusion Models",
    overview: [
      "Tri-Prompting proposes a unified scene-subject-motion control framework, offering new insights for identity preservation and motion control",
      "ViFeEdit enables video diffusion tuning without video data, significantly reducing data collection costs",
      "Riemannian Motion Generation introduces non-Euclidean geometry for human motion generation, improving physical plausibility",
      "ECHO demonstrates an edge-cloud text-to-motion architecture with compact motion representations adaptable for audio-driven generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Control",
        title: "Tri-Prompting: Unified Control over Scene, Subject, and Motion in Video Diffusion",
        description: "Tri-Prompting introduces the first framework that unifies scene composition, multi-view subject consistency, and motion control in a single model. Its core design is a dual-conditioning motion module: XYZ trajectories control scene motion while downsampled RGB grids serve as coarse proxies for subject motion. This naturally decouples foreground and background motion while supporting large viewpoint changes (e.g., 360° rotation) with multi-view appearance consistency. For music-to-dance tasks, the subject control mechanism is directly transferable: multi-view reference fusion can address identity drift issues in current approaches, and the RGB proxy representation can be replaced with audio beat features for audio-driven dance control. The method significantly outperforms specialized baselines like Phantom and DaS with only 11k training tuples (<7 hours video), demonstrating high data efficiency.",
        keyPoints: [
          "Dual-conditioning motion control: XYZ trajectories for scenes, RGB grid proxies for subjects, achieving foreground-background decoupling",
          "Multi-view subject consistency: Fuses up to 3 multi-view reference images, supporting identity preservation under 360° viewpoint changes",
          "Transfer value: RGB proxy mechanism can be replaced with audio features for precise alignment between audio beats and dance motions"
        ],
        href: "https://arxiv.org/abs/2603.15614",
        paperLink: "Tri-Prompting: Video Diffusion with Unified Control over Scene, Subject, and Motion",
      },
      {
        num: 2,
        tag: "Video Editing",
        title: "ViFeEdit: Video-Free Tuning for Video Diffusion Transformers",
        description: "ViFeEdit addresses the core pain points of scarce paired video data and high training costs in video editing tasks. Through architectural reparameterization, the method decouples full 3D attention into spatial components, enabling the model to learn video editing capabilities from 2D images alone while keeping pretrained temporal modules frozen to ensure temporal consistency. Specifically, ViFeEdit introduces complementary 2D spatial attention blocks that cancel each other at initialization to preserve original 3D attention behavior, then learn spatial editing operations during training. The dual-path pipeline design assigns separate timestep embeddings to latent states and conditional signals for stable optimization. For music-to-dance research, this video-free paradigm is significant: current approaches require large amounts of paired music-dance video data, while ViFeEdit shows that only 100-250 pairs of 2D images are sufficient for effective video generation capability, substantially reducing data collection costs. The 3D attention decoupling mechanism can also optimize current Audio Attention module designs.",
        keyPoints: [
          "Architectural reparameterization: Decouples 3D attention into spatial components, freezing temporal modules to preserve temporal consistency",
          "Video-free training: Requires only 100-250 pairs of 2D images, no video data needed for tuning",
          "Transfer value: Significantly reduces music-to-dance data collection costs; 3D attention decoupling can optimize Audio Attention design"
        ],
        href: "https://arxiv.org/abs/2603.15478",
        paperLink: "ViFeEdit: A Video-Free Tuner of Your Video Diffusion Transformer",
      },
      {
        num: 3,
        tag: "Motion Generation",
        title: "Riemannian Motion Generation: Human Motion via Riemannian Flow Matching",
        description: "This paper notes that human motion generation is typically learned in Euclidean spaces, while valid motions follow structured non-Euclidean geometry. Riemannian Motion Generation (RMG) represents motion as points on product manifolds and learns dynamics via Riemannian flow matching. Specifically, RMG decomposes motion into global translation (R³), global orientation and joint rotations (product of unit quaternions S³), and local pose (Kendall pre-shape space), with each factor on its natural manifold. This representation is scale-free with intrinsic normalization, eliminating the need for dataset-level mean/std normalization. Training uses geodesic interpolation instead of linear interpolation, with tangent-space velocity supervision and manifold-preserving ODE integration for sampling. On HumanML3D benchmark, RMG achieves SOTA FID (0.043) and significantly outperforms strong baselines on large-scale MotionMillion dataset. For music-to-dance tasks, RMG's geometry-aware modeling can directly improve dance motion generation: current diffusion models often generate physically incoherent motions, while RMG's manifold-preserving sampling ensures generated dance motions comply with human kinematic constraints.",
        keyPoints: [
          "Geometry-aware representation: Decomposes motion into T+R+P manifold factors, reducing dimension from 12J-1 to 4J+3",
          "Riemannian flow matching: Uses geodesic interpolation and tangent-space supervision for geometrically consistent generation dynamics",
          "Transfer value: Manifold-preserving sampling ensures physical plausibility of dance motions, addressing kinematic constraint issues in current approaches"
        ],
        href: "https://arxiv.org/abs/2603.15016",
        paperLink: "Riemannian Motion Generation: A Unified Framework for Human Motion Representation and Generation via Riemannian Flow Matching",
      },
      {
        num: 4,
        tag: "Robotics",
        title: "ECHO: Edge-Cloud Humanoid Orchestration for Language-to-Motion Control",
        description: "ECHO proposes a cloud-edge decoupled architecture for text-driven humanoid whole-body control. The cloud-deployed diffusion model uses a 1D convolutional UNet conditioned on CLIP-encoded text features, generating motion sequences in ~1 second via DDIM sampling; the edge deploys a lightweight RL tracker distilled from a privileged teacher policy through a teacher-student paradigm, equipped with an evidential adaptation module for sim-to-real transfer. A key innovation is the compact 38D robot-native motion representation: each frame contains 29D joint angles, 2D root planar velocity, 1D root height, and 6D continuous root orientation, eliminating retargeting overhead from human body models and directly compatible with PD controllers. For music-to-dance research, ECHO's architecture design offers direct transferable value: its CLIP-conditioned diffusion generator is highly similar to current audio-to-dance approaches, and the 38D compact representation can inspire the design of audio-driven motion latent spaces. Additionally, its teacher-student tracking strategy and morphological symmetry constraints can improve dance motion post-processing and smoothing.",
        keyPoints: [
          "Edge-cloud collaborative architecture: Cloud diffusion generation + Edge RL tracking, balancing generation quality and real-time control",
          "Compact motion representation: 38D robot-native representation eliminates retargeting overhead, directly compatible with low-level control",
          "Transfer value: CLIP-diffusion architecture similar to audio-to-dance; compact representation inspires audio-driven motion latent space design"
        ],
        href: "https://arxiv.org/abs/2603.16188",
        paperLink: "ECHO: Edge-Cloud Humanoid Orchestration for Language-to-Motion Control",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Progressive 3D Gaussian Avatar Representation with Hierarchical Detail Control",
        tag: "3D Avatar",
        href: "https://arxiv.org/abs/2603.16447",
        description: "ProgressiveAvatars proposes a progressive avatar representation based on 3D Gaussian hierarchies grown via adaptive implicit subdivision on template meshes. Its hierarchical expansion mechanism dynamically allocates resources based on screen-space signals, supporting incremental loading and rendering. For music-to-dance, this hierarchical detail control can optimize reference image feature extraction for adaptive identity preservation.",
      },
      {
        num: 6,
        title: "VIGOR: Geometry-Based Reward for Temporal Consistency in Video Generation",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2603.16271",
        description: "VIGOR proposes a geometry reward model using pretrained geometric foundation models to evaluate multi-view consistency via cross-frame reprojection error. The reward model can align video diffusion via SFT or RL, or enable test-time scaling. For dance video generation, this geometric consistency reward can directly evaluate temporal coherence of generated motions.",
      },
      {
        num: 7,
        title: "EverTale: Continuous Story Character Customization with LoRA Integration",
        tag: "Character Customization",
        href: "https://arxiv.org/abs/2603.16285",
        description: "EverTale proposes an All-in-One-World Character Integrator achieving continuous character adaptation within unified LoRA modules without per-character optimization. Its Character Quality Gate ensures fidelity via MLLM-as-Judge. For music-to-dance, this continuous customization strategy offers new insights for reference identity migration.",
      },
      {
        num: 8,
        title: "HSImul3R: Physics-Constrained Human-Scene Interaction Reconstruction",
        tag: "Physics Simulation",
        href: "https://arxiv.org/abs/2603.15612",
        description: "HSImul3R proposes a physics bidirectional optimization pipeline treating physics simulators as active supervisors for joint optimization of human dynamics and scene geometry. Forward direction uses scene-targeted RL for motion optimization; reverse direction leverages simulation feedback for geometry refinement. For dance generation, this physics-constrained optimization can introduce motion plausibility constraints to address unnatural motion issues in diffusion models.",
      },
      {
        num: 9,
        title: "Spectrum Matching: Frequency Spectrum Theory for Latent Diffusion",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2603.14645",
        description: "This paper proposes the Spectrum Matching hypothesis: quality latents should follow flattened power-law PSD and preserve frequency-to-semantic correspondence. Through Encoding Spectrum Matching (ESM) and Decoding Spectrum Matching (DSM), diffusion generation quality can be significantly improved. For music-to-dance, this theory can optimize VAE latent space learning to improve generated video visual quality.",
      },
    ],
    observation: "Today's papers reveal a trend toward unified control and geometry awareness in video diffusion models. Tri-Prompting, ViFeEdit, and ECHO collectively demonstrate the technical convergence of multimodal conditions (text/image/audio) to video/motion generation: unified control frameworks, decoupled spatiotemporal modeling, and compact motion representations become key design patterns. For music-to-dance tasks, this suggests building a unified audio-visual-motion generation framework: audio beats as motion control signals, reference images as appearance conditions, diffusion models as generation backbones, and geometric constraints ensuring physical plausibility. Riemannian Motion Generation further reveals the importance of geometry-aware modeling—migrating motion generation from Euclidean space to manifold space may be the key breakthrough for improving dance motion quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-17`,
        'en': `/en/daily/music-to-dance/2026-03-17`,
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
      date="2026-03-17"
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
