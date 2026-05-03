import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "视频时序控制与4D重建：舞蹈生成的新工具箱",
    overview: [
      "本周重点关注视频编辑信号的稳定性、语义进度函数的时间重参数化、以及4D点云在视频重拍中的应用",
      "FlowAnchor 提出的 Spatial-aware Attention Refinement 和 Adaptive Magnitude Modulation 可直接解决长舞蹈视频生成中的信号衰减问题",
      "Vista4D 和 Reshoot-Anything 的4D重建方法为多视角舞蹈视频合成提供了可行路径"
    ],
    papers: [
      {
        num: 1,
        tag: "视频编辑",
        title: "FlowAnchor：通过空间感知注意力稳定视频编辑信号",
        description: "FlowAnchor 针对 flow-based 视频编辑中编辑信号不稳定的问题，提出了两个核心机制。Spatial-aware Attention Refinement (SAR) 通过文本token调制和时空调制，强制交叉注意力图与目标语义区域对齐，解决了多目标场景中编辑信号定位不精确的问题。Adaptive Magnitude Modulation (AMM) 则通过帧数感知的自适应放大因子 γ_F = γ·logF/logF_0，补偿长视频中的信号幅度衰减。实验表明，该方法在 FiVE-Bench 和 Anchor-Bench 上均取得了最优的文本对齐度（CLIP-T 28.82）和时间一致性（Warp-Err 2.386×10^-3）。对于 music-to-dance 任务，SAR 可确保音频驱动的编辑信号精准作用于舞蹈者区域，而 AMM 则保证长序列舞蹈视频（如 65 帧以上）仍保持足够的编辑强度。",
        keyPoints: [
          "SAR 机制通过双层调制（文本token级+时空级）实现精确的编辑区域定位，IoU 与 Local CLIP-T 呈强正相关",
          "AMM 的帧数对数缩放策略确保长视频编辑信号不衰减，在 F=65 帧时仍保持与单帧相当的编辑效果",
          "与 Wan-Edit 相比，FlowAnchor 在 Anchor-Bench 的复杂多目标场景中将 Local CLIP-T 从 18.43 提升至 21.59"
        ],
        href: "https://arxiv.org/abs/2604.22586",
        paperLink: "FlowAnchor: Stabilizing the Editing Signal for Inversion-Free Video Editing",
      },
      {
        num: 2,
        tag: "语义进度",
        title: "语义进度函数：让视频变换以恒定语义速率展开",
        description: "本文提出 Semantic Progress Function (SPF)，一种将视频序列的语义演变压缩为一维函数的方法。SPF 通过计算帧间语义距离（使用 SigLIP 嵌入的 arccos 距离）并拟合累积曲线，识别语义变化不均匀的区域。基于此，作者提出语义线性化（semantic linearization）方法，通过重参数化时间坐标使语义进度以恒定速率展开。技术实现上，该方法通过反演 SPF 计算扭曲的时间位置 τ_k = S^{-1}(k/(T-1))，并将其注入 RoPE 位置编码，其中低频带接受更强的扭曲以修正全局节奏，高频带保持线性以保留局部运动平滑性。对于 music-to-dance，SPF 提供了一种将音乐节拍映射到语义变化曲线的数学框架，可实现舞蹈动作与音乐节拍的精确同步。",
        keyPoints: [
          "SPF 将视频语义演变表示为一维函数，其斜率反映语义变化的瞬时速率，偏离直线表明节奏不均",
          "频率感知的 RoPE 扭曲策略：低频带（α=0.77）严格跟踪目标调度，高频带（α=0.20）保持近似线性",
          "迭代细化策略（3次迭代）可将语义进度的线性度提升至接近理想状态"
        ],
        href: "https://arxiv.org/abs/2604.22554",
        paperLink: "Video Analysis and Generation via a Semantic Progress Function",
      },
      {
        num: 3,
        tag: "时间控制",
        title: "Seeing Fast and Slow：学习视频中的时间流动",
        description: "该研究首次系统性地探索了视频中的时间感知与控制能力。作者利用音频-视觉的时频缩放关系（速度变化导致音高变化）作为免费监督信号，训练出速度变化检测器和播放速度估计器。基于此，他们从野外视频构建了 SloMo-44K 数据集（44,632 个片段，1800 万帧，最高 10,000+ FPS），这是目前最大规模的通用慢动作数据集。在生成任务上，作者提出了速度条件化视频生成和极端时间超分辨率两个新任务。速度条件化通过在时间步嵌入中加入速度桶编码（对数间隔的 0.01× 到 1.0×）并在潜在特征中加入帧级速度条件，实现了对生成视频运动速度的显式控制。对于 music-to-dance，这意味着可以根据音乐节拍动态调整舞蹈动作速度，实现真正的速度可控舞蹈生成。",
        keyPoints: [
          "利用音频音高变化作为跨模态监督，实现无标注的速度变化检测（92.4% 准确率）",
          "SloMo-44K 数据集规模是此前最大数据集的 70 倍视频数和 150 倍帧数",
          "速度条件化生成在 FID（68.4 vs 72.2）和 FVD（1114.1 vs 1266.8）上均优于基线 Wan2.1"
        ],
        href: "https://arxiv.org/abs/2604.21931",
        paperLink: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
      },
      {
        num: 4,
        tag: "4D重建",
        title: "Vista4D：基于4D点云的视频重拍",
        description: "Vista4D 提出了一种将输入视频和目标相机都锚定在4D点云中的视频重拍框架。核心创新包括：(1) 时序持久静态像素分割：通过分割获得静态像素掩码，使其在4D点云中跨帧持久存在，从而显式保留源视频内容并为相机控制提供丰富信号；(2) 带噪声多视图数据训练：使用4D重建的多视图动态视频进行训练，使模型对真实世界点云渲染中的几何伪影具有鲁棒性；(3) 源视频与点云渲染的联合条件化：通过 patchify 后的潜在token拼接，利用视频扩散模型的先验从源视频传递几何和外观信息。在 iPhone 数据集上的 novel-view 合成中，Vista4D 的 EPE（光流端点误差）仅为 1.142，显著优于 TrajectoryCrafter 的 2.375。对于 music-to-dance，该方法可实现多视角舞蹈视频合成，支持在复杂相机轨迹（如环绕拍摄）下保持舞蹈动作的一致性。",
        keyPoints: [
          "时序持久静态像素掩码使4D点云能够显式保留源视频内容，即使目标相机与源视频重叠度低",
          "在相机控制精度上，平移误差 1.251、旋转误差 4.647°、内参误差 4.927，均为业界最优",
          "用户研究显示 67.06% 的参与者认为 Vista4D 在源视频内容保留上优于基线"
        ],
        href: "https://arxiv.org/abs/2604.21915",
        paperLink: "Vista4D: Video Reshooting with 4D Point Clouds",
      },
      {
        num: 5,
        tag: "自监督学习",
        title: "Reshoot-Anything：自监督的野外视频重拍模型",
        description: "Reshoot-Anything 提出了一种可扩展的自监督框架，通过从单目视频生成伪多视图训练三元组（源视频、几何锚点、目标视频）来解决配对多视图数据稀缺的问题。训练时，从单个输入视频中提取两条独立的平滑随机游走裁剪轨迹作为源视图和目标视图，锚点则通过对源视频首帧进行前向变形（使用密集跟踪场）合成。这种策略引入了空间错位和人工遮挡，迫使模型无法简单复制对应源帧，而必须从源视频的不同时间点路由和重投影缺失的高保真纹理，从而隐式学习4D时空结构。在推理时，模型利用4D点云派生的锚点实现复杂动态场景的最先进时间一致性、鲁棒相机控制和高保真新视角合成。对于 music-to-dance，该方法提供了一种无需昂贵多视角标注即可学习舞蹈动作时空一致性的路径。",
        keyPoints: [
          "自监督数据生成仅需2D密集跟踪器，可应用于任意单目视频，包括真人、动画和生成艺术",
          "空间瓶颈机制强制模型学习4D重建：必须从不同时间帧搜索缺失纹理并拼接到正确空间位置",
          "混合训练策略（85% 真实数据 + 15% 合成数据）在标准轨迹和极端相机运动间取得平衡"
        ],
        href: "https://arxiv.org/abs/2604.21776",
        paperLink: "Reshoot-Anything: A Self-Supervised Model for In-the-Wild Video Reshooting",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Agentic World Modeling：世界模型综述",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.22748",
        description: "提出 \"levels × laws\" 分类法，将世界模型能力分为 L1 Predictor、L2 Simulator、L3 Evolver 三个层级，对舞蹈动作物理合理性建模有理论参考价值。",
      },
      {
        num: 7,
        title: "Listening with Time：长音频时序感知",
        tag: "音频理解",
        href: "https://arxiv.org/abs/2604.22245",
        description: "提出 LAT-Audio 模型，支持长达30分钟的音频时序感知，可直接应用于 music-to-dance 的音频节拍检测和时序对齐。",
      },
      {
        num: 8,
        title: "Sapiens2：高分辨率人体中心视觉模型",
        tag: "人体理解",
        href: "https://arxiv.org/abs/2604.21681",
        description: "10亿参数人体视觉模型，在姿态估计（+4 mAP）和部位分割（+24.3 mIoU）上达到 SOTA，可作为 dance 生成的前置模块提供人体结构约束。",
      },
      {
        num: 9,
        title: "Structured Motion Descriptions：无编码器的人体运动理解",
        tag: "运动表示",
        href: "https://arxiv.org/abs/2604.21668",
        description: "将关节位置序列转换为结构化自然语言描述，使 LLM 可直接推理人体运动，为 dance 动作的文本化表示和编辑提供了新方法。",
      },
      {
        num: 10,
        title: "WorldMark：交互式视频世界模型基准",
        tag: "基准测试",
        href: "https://arxiv.org/abs/2604.21686",
        description: "首个提供标准化测试条件的交互式视频生成基准，可用于评估 interactive dance video generation 的控制精度和世界一致性。",
      },
      {
        num: 11,
        title: "Omni：统一多模态模型的上下文展开",
        tag: "多模态",
        href: "https://arxiv.org/abs/2604.21921",
        description: "原生支持文本、图像、视频、3D几何的统一多模态模型，其 Context Unrolling 机制为 audio-visual-dance 联合生成提供了架构参考。",
      },
    ],
    observation: "本周论文呈现出视频生成领域从\"生成质量\"向\"生成可控性\"的明显转向。FlowAnchor 和 Semantic Progress Function 分别从空间定位和时间节奏两个维度提供了精细化控制工具，而 Vista4D 和 Reshoot-Anything 则通过4D重建技术打通了多视角合成的技术路径。对于 music-to-dance 任务，这些进展意味着：1）音频驱动的编辑信号可以更精准地作用于特定区域；2）舞蹈动作可以与音乐节拍实现数学上可量化的同步；3）多视角舞蹈视频合成不再依赖昂贵的多相机采集。特别值得关注的是，Reshoot-Anything 的自监督学习范式为舞蹈数据稀缺问题提供了一个潜在解决方案——通过从单目舞蹈视频学习4D结构，而非依赖难以获取的多视角标注。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Video Temporal Control & 4D Reconstruction: New Toolbox for Dance Generation",
    overview: [
      "This week focuses on editing signal stability in video editing, temporal reparameterization via semantic progress functions, and 4D point cloud applications in video reshooting",
      "FlowAnchor's Spatial-aware Attention Refinement and Adaptive Magnitude Modulation directly address signal attenuation in long dance video generation",
      "Vista4D and Reshoot-Anything's 4D reconstruction methods provide viable paths for multi-view dance video synthesis"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Editing",
        title: "FlowAnchor: Stabilizing the Editing Signal for Inversion-Free Video Editing",
        description: "FlowAnchor tackles the instability of editing signals in flow-based video editing through two core mechanisms. Spatial-aware Attention Refinement (SAR) enforces alignment between cross-attention maps and target semantic regions via text-token and spatio-temporal modulation, addressing imprecise localization in multi-object scenes. Adaptive Magnitude Modulation (AMM) compensates for signal magnitude attenuation in long videos through a frame-aware amplification factor γ_F = γ·logF/logF_0. Experiments show state-of-the-art performance on FiVE-Bench and Anchor-Bench with CLIP-T of 28.82 and Warp-Err of 2.386×10^-3. For music-to-dance, SAR ensures audio-driven editing signals precisely target dancer regions, while AMM maintains editing strength for long dance sequences (65+ frames).",
        keyPoints: [
          "SAR achieves precise editing region localization through two-level modulation (text-token + spatio-temporal), with strong positive correlation between IoU and Local CLIP-T",
          "AMM's logarithmic frame scaling ensures signal strength doesn't decay in long videos, maintaining editing effects comparable to single-frame at F=65 frames",
          "Compared to Wan-Edit, FlowAnchor improves Local CLIP-T from 18.43 to 21.59 on Anchor-Bench's complex multi-object scenarios"
        ],
        href: "https://arxiv.org/abs/2604.22586",
        paperLink: "FlowAnchor: Stabilizing the Editing Signal for Inversion-Free Video Editing",
      },
      {
        num: 2,
        tag: "Semantic Progress",
        title: "Video Analysis and Generation via a Semantic Progress Function",
        description: "This paper proposes the Semantic Progress Function (SPF), a method to compress video sequence semantic evolution into a one-dimensional function. SPF identifies regions of uneven semantic change by computing inter-frame semantic distances (arccos distance using SigLIP embeddings) and fitting cumulative curves. Building on this, the authors propose semantic linearization through temporal coordinate reparameterization to enforce constant semantic progress rate. Technically, the method computes warped temporal positions τ_k = S^{-1}(k/(T-1)) by inverting SPF and injects them into RoPE positional encoding, where low-frequency bands receive stronger warping to correct global pacing while high-frequency bands remain linear to preserve local motion smoothness. For music-to-dance, SPF provides a mathematical framework to map music beats to semantic change curves, enabling precise synchronization between dance movements and music rhythm.",
        keyPoints: [
          "SPF represents video semantic evolution as a 1D function where slope reflects instantaneous rate of semantic change; deviation from straight line indicates uneven pacing",
          "Frequency-aware RoPE warping: low-frequency bands (α=0.77) strictly track target schedule, high-frequency bands (α=0.20) remain approximately linear",
          "Iterative refinement strategy (3 iterations) can improve semantic progress linearity to near-ideal state"
        ],
        href: "https://arxiv.org/abs/2604.22554",
        paperLink: "Video Analysis and Generation via a Semantic Progress Function",
      },
      {
        num: 3,
        tag: "Temporal Control",
        title: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
        description: "This research systematically explores temporal perception and control in videos for the first time. The authors leverage audio-visual time-frequency scaling relationships (speed changes cause pitch shifts) as free supervision signals to train speed change detectors and playback speed estimators. Building on this, they construct the SloMo-44K dataset (44,632 clips, 18M frames, up to 10,000+ FPS) from in-the-wild videos—the largest general-purpose slow-motion dataset to date. For generation tasks, the authors propose two novel tasks: speed-conditioned video generation and extreme temporal super-resolution. Speed conditioning is achieved by adding speed bucket encodings (logarithmically spaced 0.01× to 1.0×) to timestep embeddings and frame-level speed conditioning to latent features, enabling explicit control over generated video motion speed. For music-to-dance, this means dance speed can be dynamically adjusted according to music tempo, achieving truly speed-controllable dance generation.",
        keyPoints: [
          "Uses audio pitch changes as cross-modal supervision to achieve annotation-free speed change detection (92.4% accuracy)",
          "SloMo-44K dataset scale is 70× more videos and 150× more frames than previous largest datasets",
          "Speed-conditioned generation outperforms baseline Wan2.1 in FID (68.4 vs 72.2) and FVD (1114.1 vs 1266.8)"
        ],
        href: "https://arxiv.org/abs/2604.21931",
        paperLink: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
      },
      {
        num: 4,
        tag: "4D Reconstruction",
        title: "Vista4D: Video Reshooting with 4D Point Clouds",
        description: "Vista4D proposes a video reshooting framework that grounds both input video and target cameras in 4D point clouds. Core innovations include: (1) Temporally-persistent static pixel segmentation: static pixel masks obtained through segmentation persist across frames in 4D point clouds, explicitly preserving source video content and providing rich signals for camera control; (2) Training with noisy multi-view data: training with 4D-reconstructed multi-view dynamic videos makes the model robust to geometric artifacts in real-world point cloud rendering; (3) Joint conditioning on source video and point cloud rendering: concatenating patchified latent tokens leverages video diffusion model priors to propagate geometric and appearance information from source video. On iPhone dataset novel-view synthesis, Vista4D achieves EPE (optical flow endpoint error) of only 1.142, significantly better than TrajectoryCrafter's 2.375. For music-to-dance, this enables multi-view dance video synthesis with consistent dance movements under complex camera trajectories (e.g., orbiting shots).",
        keyPoints: [
          "Temporally-persistent static pixel masks enable 4D point clouds to explicitly preserve source video content even with low target-source camera overlap",
          "Camera control precision: translation error 1.251, rotation error 4.647°, intrinsics error 4.927—all industry-best",
          "User study shows 67.06% of participants believe Vista4D outperforms baselines in source video content preservation"
        ],
        href: "https://arxiv.org/abs/2604.21915",
        paperLink: "Vista4D: Video Reshooting with 4D Point Clouds",
      },
      {
        num: 5,
        tag: "Self-Supervised Learning",
        title: "Reshoot-Anything: A Self-Supervised Model for In-the-Wild Video Reshooting",
        description: "Reshoot-Anything proposes a scalable self-supervised framework that generates pseudo multi-view training triplets (source video, geometric anchor, target video) from monocular videos to address the scarcity of paired multi-view data. During training, two independent smooth random-walk crop trajectories are extracted from a single input video as source and target views, while the anchor is synthesized by forward-warping the source video's first frame using a dense tracking field. This strategy introduces spatial misalignment and artificial occlusions, forcing the model to learn implicit 4D spatiotemporal structures by routing and re-projecting missing high-fidelity textures from different time points in the source video, rather than simply copying corresponding source frames. At inference, the model utilizes 4D point cloud-derived anchors to achieve state-of-the-art temporal consistency, robust camera control, and high-fidelity novel view synthesis on complex dynamic scenes. For music-to-dance, this provides a path to learn dance movement spatiotemporal consistency without expensive multi-view annotations.",
        keyPoints: [
          "Self-supervised data generation requires only 2D dense tracker, applicable to any monocular video including real humans, animation, and generative art",
          "Spatial bottleneck mechanism forces 4D reconstruction learning: must search for missing textures across different time frames and stitch to correct spatial positions",
          "Hybrid training strategy (85% real data + 15% synthetic data) balances standard trajectories and extreme camera motion generalization"
        ],
        href: "https://arxiv.org/abs/2604.21776",
        paperLink: "Reshoot-Anything: A Self-Supervised Model for In-the-Wild Video Reshooting",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Agentic World Modeling: A Survey",
        tag: "World Models",
        href: "https://arxiv.org/abs/2604.22748",
        description: "Proposes 'levels × laws' taxonomy dividing world model capabilities into L1 Predictor, L2 Simulator, L3 Evolver—provides theoretical reference for physical plausibility modeling in dance movements.",
      },
      {
        num: 7,
        title: "Listening with Time: Long-Form Audio Temporal Awareness",
        tag: "Audio Understanding",
        href: "https://arxiv.org/abs/2604.22245",
        description: "Proposes LAT-Audio model supporting up to 30-minute audio temporal awareness, directly applicable to beat detection and temporal alignment for music-to-dance.",
      },
      {
        num: 8,
        title: "Sapiens2: High-Resolution Human-Centric Vision Models",
        tag: "Human Understanding",
        href: "https://arxiv.org/abs/2604.21681",
        description: "1B parameter human vision model achieving SOTA on pose estimation (+4 mAP) and part segmentation (+24.3 mIoU), can serve as preprocessing module for dance generation to provide human structure constraints.",
      },
      {
        num: 9,
        title: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
        tag: "Motion Representation",
        href: "https://arxiv.org/abs/2604.21668",
        description: "Converts joint position sequences to structured natural language descriptions, enabling LLMs to directly reason about human motion—provides new method for textual representation and editing of dance movements.",
      },
      {
        num: 10,
        title: "WorldMark: Benchmark for Interactive Video World Models",
        tag: "Benchmark",
        href: "https://arxiv.org/abs/2604.21686",
        description: "First benchmark providing standardized test conditions for interactive video generation, can be used to evaluate control precision and world consistency of interactive dance video generation.",
      },
      {
        num: 11,
        title: "Omni: Context Unrolling in Unified Multimodal Models",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2604.21921",
        description: "Unified multimodal model natively supporting text, image, video, and 3D geometry; its Context Unrolling mechanism provides architectural reference for joint audio-visual-dance generation.",
      },
    ],
    observation: "This week's papers show a clear shift in video generation from 'generation quality' to 'generation controllability.' FlowAnchor and Semantic Progress Function provide fine-grained control tools from spatial localization and temporal rhythm perspectives respectively, while Vista4D and Reshoot-Anything open technical paths for multi-view synthesis through 4D reconstruction. For music-to-dance, these advances mean: 1) audio-driven editing signals can more precisely target specific regions; 2) dance movements can achieve mathematically quantifiable synchronization with music beats; 3) multi-view dance video synthesis no longer relies on expensive multi-camera capture. Particularly noteworthy is Reshoot-Anything's self-supervised learning paradigm, which offers a potential solution to the dance data scarcity problem—learning 4D structure from monocular dance videos rather than relying on hard-to-obtain multi-view annotations.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-27`,
        'en': `/en/daily/music-to-dance/2026-04-27`,
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
      date="2026-04-27"
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