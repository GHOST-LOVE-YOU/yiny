import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "稀疏关键帧学习与世界空间扩散：运动生成的新范式",
    overview: [
      "SignSparK 的 CFM 框架和稀疏关键帧驱动生成范式可直接迁移到舞蹈生成任务",
      "DomainShuttle 的域感知解耦和 DualRoPE 机制可用于改善人物外观与动作的分离",
      "PhysiFormer 的世界坐标系扩散范式为物理合理的运动生成提供了新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "运动生成",
        title: "SignSparK：基于稀疏关键帧的 CFM 手语生成框架",
        description: "手语生成与舞蹈生成任务高度同构——都是将高层语义（文本/音频）映射到 3D 人体运动序列。SignSparK 提出基于稀疏关键帧的训练范式，通过 Conditional Flow Matching (CFM) 框架利用时间锚点合成 3D 手语序列。关键创新在于：稀疏关键帧作为锚点防止回归均值效应，同时 CFM 学习中间帧的流畅过渡。该方法支持四种手语，并集成 3D Gaussian Splatting 实现真实感渲染。对于 music-to-dance 任务，这种关键帧锚定机制可以改善当前方案中运动平滑性与多样性之间的 trade-off：关键帧确保特定节拍点的姿态准确性，而 CFM 学习中间帧的流畅过渡。",
        keyPoints: [
          "CFM 框架实现高效的手语序列生成，采样步骤少于 10 步",
          "稀疏关键帧作为锚点防止回归均值，确保流畅运动连续性",
          "FAST 分割模型自动挖掘时间边界，支持大规模多语言训练",
          "3DGS 集成实现从 SMPL-X 参数到真实感渲染的端到端流程"
        ],
        href: "https://arxiv.org/abs/2603.10446",
        paperLink: "SignSparK: Efficient Multilingual Sign Language Production via Sparse Keyframe Learning",
      },
      {
        num: 2,
        tag: "主体驱动生成",
        title: "DomainShuttle：域感知解耦实现灵活的跨域视频个性化",
        description: "DomainShuttle 提出新的主体驱动视频生成（S2V）框架，解决现有方法在跨域场景（如风格迁移、语义组合）中灵活性不足的问题。核心创新包括：(1) Domain-MoT 模块通过独立注意力映射路径解耦视频和参考图像特征；(2) Domain-aware AdaLN 将域属性显式注入参考图像分支，实现内容与域的分离；(3) Video-Reference DualRoPE 将参考图像 token 和视频 token 分配到独立的 RoPE 空间，实现精确的主体级空间建模；(4) Cross-Pair Consistent Loss 对齐同一视频的两组参考图像，提取不受光照、风格影响的内在主体特征。对于 music-to-dance 的外观迁移模块，这种域感知建模可以直接应用——参考图像的外观特征只影响人物身份属性，而舞蹈动作、背景、光照等域属性可根据音乐灵活变化。",
        keyPoints: [
          "Domain-MoT 解耦视频和参考特征，支持独立的域感知建模",
          "DualRoPE 将参考图像和视频置于独立 RoPE 空间，实现主体级精确控制",
          "Domain-aware AdaLN 显式注入域属性，支持灵活的跨域生成",
          "跨域场景性能提升 18.7%，同时保持域内高保真度"
        ],
        href: "https://arxiv.org/abs/2606.26058",
        paperLink: "DomainShuttle: Freeform Open Domain Subject-driven Text-to-video Generation",
      },
      {
        num: 3,
        tag: "物理仿真",
        title: "PhysiFormer：世界坐标系下的物理合理运动扩散模型",
        description: "PhysiFormer 是一种用于物理合理 3D 物体运动的扩散 Transformer。与在视角相关像素空间操作的视频世界模型不同，PhysiFormer 将物体表示为世界坐标系中的 3D 网格，通过单次去噪扩散过程直接预测顶点轨迹，无需显式刚性或因果归纳偏置。模型采用时间-空间-物体分解注意力，实现置换不变的多物体推理。在刚性/弹性/混合材质场景上均取得优异效果，且泛化到未见过的几何形状和更大物体数量。对于 dance 生成，PhysiFormer 的坐标空间扩散范式可直接迁移：用世界坐标系下的 3D 人体运动（如 SMPL-X 参数）代替像素空间生成，再通过渲染得到最终视频。这种方法可以更好地保持人物运动的物理合理性（如骨骼约束、地面接触），同时扩散的概率形式可以捕捉运动的不确定性，生成多样化的舞蹈风格。",
        keyPoints: [
          "在世界坐标系下直接进行扩散生成，无需显式物理约束",
          "时间-空间-物体分解注意力实现高效的多物体推理",
          "单次前向生成避免自回归误差累积，保持长期几何一致性",
          "支持刚性和弹性材质，泛化到混合材质和未见几何形状"
        ],
        href: "https://arxiv.org/abs/2606.27364",
        paperLink: "PhysiFormer: Learning to Simulate Mechanics in World Space",
      },
      {
        num: 4,
        tag: "4D 重建",
        title: "TryOnCrafter：可渲染 4D 代理实现相机可控视频试衣",
        description: "TryOnCrafter 提出 Camera-controllable Video Virtual Try-on (CaM-VVT) 任务，通过 Renderable 4D Try-on Proxy 显式解耦人物与环境。核心流程包括：(1) 基于 MVS 和 SAM2 重建动态场景点云，分离人物和背景；(2) 使用 GVHMR 估计时序一致的 SMPL-X 序列；(3) Anchor-based alignment 解决相机空间与世界空间的尺度歧义；(4) 将 2D 试衣先验蒸馏到基于 3DGS 的虚拟形象，通过 SMPL-X 序列驱动动画。对于 dance 生成，这种 4D Proxy 构建流程有直接参考价值——特别是通过 SMPL-X 序列驱动 3DGS-based avatar 动画、anchor-based alignment 解决单目重建尺度歧义的方法。此外，相机可控生成技术可用于舞蹈视频的视角控制，实现子弹时间等特效。",
        keyPoints: [
          "Anchor-based alignment 解决单目重建的尺度歧义问题",
          "SMPL-X 序列驱动 3DGS avatar 实现高保真纹理和几何一致性",
          "人物与背景显式解耦，支持独立的相机轨迹控制",
          "Proxy-Anchored Video DiT 确保生成结果符合物理合理的变形"
        ],
        href: "https://arxiv.org/abs/2606.26092",
        paperLink: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
      },
      {
        num: 5,
        tag: "几何监督",
        title: "MVTrack4Gen：多视角点跟踪作为 4D 视频生成的几何监督",
        description: "MVTrack4Gen 通过多视角点跟踪作为几何和运动监督信号，增强仅依赖相机条件的新视角视频扩散模型。关键发现是：特定注意力层编码了强对应关系线索，query-key 匹配提供了清晰的时序和跨视角对应关系。当动态物体出现几何或运动不一致时，这些层的注意力图表现出错误的跨视角对应。基于这一观察，MVTrack4Gen 在选定的注意力层之上构建多视角跟踪头，使用局部 4D 相关体积计算 query 和 key 特征的对应关系，并与扩散模型联合训练。对于 music-to-dance，这种注意力监督机制可用于改进 3D Audio Attention：将音频-运动对齐的注意力特征路由到辅助跟踪头，用点跟踪目标进行联合训练，从而增强运动感知能力，提升生成视频中人物运动的连贯性和几何一致性。",
        keyPoints: [
          "发现 3D 注意力层编码跨视角/时间的几何对应关系线索",
          "多视角跟踪头利用 4D 相关体积强化运动感知对应",
          "多视角对应损失直接监督注意力图，改善几何一致性",
          "在动态物体上显著改善几何一致性和视觉质量"
        ],
        href: "https://arxiv.org/abs/2606.26087",
        paperLink: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "PhysRAG：检索增强生成提升视频物理感知",
        tag: "物理感知",
        href: "https://arxiv.org/abs/2606.26916",
        description: "通过 RAG 机制将物理知识注入视频扩散模型，构建物理视频数据库并使用可学习查询提取物理信息。可用于增强舞蹈生成的物理合理性。",
      },
      {
        num: 7,
        title: "LISA：似然分数对齐优化视觉条件生成",
        tag: "条件生成",
        href: "https://arxiv.org/abs/2606.27192",
        description: "从分数建模角度重新审视双分支范式，显式对齐侧网络特征与似然分数，加速训练收敛。可用于优化参考图条件分支的训练。",
      },
      {
        num: 8,
        title: "DanceOPD：基于策略的生成场蒸馏",
        tag: "生成场蒸馏",
        href: "https://arxiv.org/abs/2606.27377",
        description: "流匹配模型的生成场蒸馏框架，将样本路由到能力场并查询学生诱导状态。可用于统一多能力（T2V、编辑、外观迁移）的舞蹈生成模型。",
      },
      {
        num: 9,
        title: "VISE：视觉自进化多模态模型",
        tag: "视觉条件",
        href: "https://arxiv.org/abs/2606.27373",
        description: "通过几何和语义不变性奖励解决视觉欠条件问题，防止模型过度依赖语言先验。可用于改进音频-视觉对齐，防止过度依赖音频先验。",
      },
      {
        num: 10,
        title: "SAM2Matting：通用视频抠图框架",
        tag: "视频分割",
        href: "https://arxiv.org/abs/2606.27339",
        description: "跟踪器到抠图框架，通过区域提议桥和专用抠图头增强 SAM2/SAM3，实现高质量视频抠图。可用于改进舞蹈视频的前景分割和背景合成。",
      },
    ],
    observation: "本日论文呈现出三个显著趋势：一是稀疏关键帧驱动的生成范式成为运动生成的新方向，SignSparK 的 CFM 框架证明关键帧锚定可以有效平衡运动准确性和流畅性；二是世界坐标系扩散正在取代像素空间生成，PhysiFormer 和 TryOnCrafter 都展示了 3D 表示在物理合理性和可控性上的优势；三是注意力机制的显式监督成为改善几何一致性的有效手段，MVTrack4Gen 的多视角点跟踪监督为改进 3D Audio Attention 提供了具体路径。对于 music-to-dance 任务，这些进展提示未来架构可能采用「稀疏关键帧 + 世界坐标系扩散 + 注意力监督」的组合，在保持生成质量的同时实现物理合理性和精确可控性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Sparse Keyframe Learning & World-Space Diffusion: New Paradigms for Motion Generation",
    overview: [
      "SignSparK's CFM framework and sparse keyframe-driven generation paradigm directly transfer to dance generation tasks",
      "DomainShuttle's domain-aware disentanglement and DualRoPE mechanism improve separation of appearance and motion",
      "PhysiFormer's world-coordinate diffusion provides new directions for physically plausible motion generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "SignSparK: CFM-based Sign Language Generation with Sparse Keyframes",
        description: "Sign language production and dance generation are highly isomorphic tasks—both map high-level semantics (text/audio) to 3D human motion sequences. SignSparK proposes a sparse keyframe-based training paradigm that synthesizes 3D signing sequences via Conditional Flow Matching (CFM) using temporal anchors. The key innovation is that sparse keyframes act as anchors preventing regression-to-the-mean while CFM learns smooth transitions between frames. The method supports four sign languages and integrates 3D Gaussian Splatting for photorealistic rendering. For music-to-dance tasks, this keyframe anchoring mechanism can improve the trade-off between motion smoothness and diversity: keyframes ensure pose accuracy at specific beat points while CFM learns smooth intermediate transitions.",
        keyPoints: [
          "CFM framework enables efficient sign sequence generation with fewer than 10 sampling steps",
          "Sparse keyframes as anchors prevent regression-to-mean while ensuring fluent motion continuity",
          "FAST segmentation model automatically mines temporal boundaries for large-scale multilingual training",
          "3DGS integration enables end-to-end pipeline from SMPL-X parameters to photorealistic rendering"
        ],
        href: "https://arxiv.org/abs/2603.10446",
        paperLink: "SignSparK: Efficient Multilingual Sign Language Production via Sparse Keyframe Learning",
      },
      {
        num: 2,
        tag: "Subject-Driven Generation",
        title: "DomainShuttle: Domain-Aware Disentanglement for Flexible Cross-Domain Video Personalization",
        description: "DomainShuttle proposes a new subject-driven video generation (S2V) framework addressing the limited flexibility of existing methods in cross-domain scenarios (e.g., style transfer, semantic composition). Core innovations include: (1) Domain-MoT module decouples video and reference features via independent attention pathways; (2) Domain-aware AdaLN explicitly injects domain attributes into the reference branch, achieving content-domain separation; (3) Video-Reference DualRoPE assigns reference and video tokens to independent RoPE spaces for precise subject-level spatial modeling; (4) Cross-Pair Consistent Loss aligns two sets of reference images for the same video, extracting intrinsic subject features unaffected by lighting or style. For music-to-dance appearance migration, this domain-aware modeling can be directly applied—reference image appearance features only affect identity attributes while dance motion, background, and lighting can flexibly adapt to music.",
        keyPoints: [
          "Domain-MoT decouples video and reference features, supporting independent domain-aware modeling",
          "DualRoPE places reference images and video in independent RoPE spaces for precise subject-level control",
          "Domain-aware AdaLN explicitly injects domain attributes, enabling flexible cross-domain generation",
          "18.7% improvement in cross-domain scenarios while maintaining high in-domain fidelity"
        ],
        href: "https://arxiv.org/abs/2606.26058",
        paperLink: "DomainShuttle: Freeform Open Domain Subject-driven Text-to-video Generation",
      },
      {
        num: 3,
        tag: "Physical Simulation",
        title: "PhysiFormer: Physically Plausible Motion Diffusion in World Coordinates",
        description: "PhysiFormer is a diffusion transformer for physically-plausible 3D object motion. Unlike video world models operating in view-dependent pixel space, PhysiFormer represents objects as 3D meshes in world coordinates, predicting vertex trajectories through a single denoising diffusion process without explicit rigidity or causality inductive biases. The model uses factorized temporal-spatial-object attention for permutation-invariant multi-object reasoning. It achieves excellent results on rigid/elastic/mixed-material scenes and generalizes to unseen geometries and larger object counts. For dance generation, PhysiFormer's coordinate-space diffusion paradigm can be directly transferred: using 3D human motion in world coordinates (e.g., SMPL-X parameters) instead of pixel-space generation, then rendering to final video. This approach better maintains physical plausibility of human motion (skeletal constraints, ground contact) while the probabilistic diffusion formulation captures motion uncertainty for diverse dance styles.",
        keyPoints: [
          "Direct diffusion generation in world coordinate space without explicit physical constraints",
          "Factorized temporal-spatial-object attention enables efficient multi-object reasoning",
          "Single forward generation avoids autoregressive error accumulation, maintaining long-term geometric consistency",
          "Supports rigid and elastic materials, generalizing to mixed materials and unseen geometries"
        ],
        href: "https://arxiv.org/abs/2606.27364",
        paperLink: "PhysiFormer: Learning to Simulate Mechanics in World Space",
      },
      {
        num: 4,
        tag: "4D Reconstruction",
        title: "TryOnCrafter: Renderable 4D Proxy for Camera-Controllable Video Try-on",
        description: "TryOnCrafter proposes the Camera-controllable Video Virtual Try-on (CaM-VVT) task, explicitly decoupling human subjects from environment via Renderable 4D Try-on Proxy. The core pipeline includes: (1) MVS and SAM2-based dynamic scene reconstruction with human/background separation; (2) GVHMR for temporally consistent SMPL-X sequence estimation; (3) Anchor-based alignment resolving scale ambiguity between camera and world space; (4) Distilling 2D try-on priors into 3DGS-based avatar animated by SMPL-X sequences. For dance generation, this 4D Proxy construction has direct reference value—especially the SMPL-X-driven 3DGS avatar animation and anchor-based alignment for resolving monocular reconstruction scale ambiguity. Additionally, camera-controllable generation enables viewpoint control for dance videos, achieving bullet-time effects.",
        keyPoints: [
          "Anchor-based alignment resolves scale ambiguity in monocular reconstruction",
          "SMPL-X sequence-driven 3DGS avatar achieves high-fidelity texture and geometric consistency",
          "Explicit human-background decoupling enables independent camera trajectory control",
          "Proxy-Anchored Video DiT ensures generated results conform to physically plausible deformations"
        ],
        href: "https://arxiv.org/abs/2606.26092",
        paperLink: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
      },
      {
        num: 5,
        tag: "Geometric Supervision",
        title: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
        description: "MVTrack4Gen uses multi-view point tracking as geometric and motion supervision signals to enhance camera-conditioning-only novel-view video diffusion models. The key finding is that specific attention layers encode strong correspondence cues, with query-key matching providing clear temporal and cross-view correspondences. When dynamic objects exhibit geometric or motion inconsistencies, attention maps at these layers show incorrect cross-view correspondences. Based on this observation, MVTrack4Gen builds a multi-view tracking head on selected attention layers using local 4D correlation volumes between query and key features, jointly trained with the diffusion model. For music-to-dance, this attention supervision mechanism can improve 3D Audio Attention: routing audio-motion alignment attention features to an auxiliary tracking head for joint training with point tracking objectives, enhancing motion-aware capabilities and improving motion coherence and geometric consistency in generated videos.",
        keyPoints: [
          "Discovered 3D attention layers encode cross-view/temporal geometric correspondence cues",
          "Multi-view tracking head uses 4D correlation volumes to strengthen motion-aware correspondences",
          "Multi-view correspondence loss directly supervises attention maps, improving geometric consistency",
          "Significantly improves geometric consistency and visual quality on dynamic objects"
        ],
        href: "https://arxiv.org/abs/2606.26087",
        paperLink: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "PhysRAG: RAG for Physics-Aware Video Generation",
        tag: "Physical Awareness",
        href: "https://arxiv.org/abs/2606.26916",
        description: "Injects physical knowledge into video diffusion via RAG mechanism, building physical video database with learnable queries. Can enhance physical plausibility of dance generation.",
      },
      {
        num: 7,
        title: "LISA: Likelihood Score Alignment for Visual-Conditioned Generation",
        tag: "Conditional Generation",
        href: "https://arxiv.org/abs/2606.27192",
        description: "Revisits dual-branch paradigm from score modeling perspective, explicitly aligning side network features with likelihood scores to accelerate training convergence. Can optimize reference image conditioning branch training.",
      },
      {
        num: 8,
        title: "DanceOPD: On-Policy Generative Field Distillation",
        tag: "Generative Field Distillation",
        href: "https://arxiv.org/abs/2606.27377",
        description: "Flow matching model generative field distillation framework routing samples to capability fields and querying student-induced states. Can unify multi-capability (T2V, editing, appearance migration) dance generation models.",
      },
      {
        num: 9,
        title: "VISE: Visual Self-Evolving Multimodal Models",
        tag: "Visual Conditioning",
        href: "https://arxiv.org/abs/2606.27373",
        description: "Solves visual under-conditioning via geometric and semantic invariance rewards, preventing over-reliance on language priors. Can improve audio-visual alignment, preventing over-reliance on audio priors.",
      },
      {
        num: 10,
        title: "SAM2Matting: Generalized Video Matting Framework",
        tag: "Video Segmentation",
        href: "https://arxiv.org/abs/2606.27339",
        description: "Tracker-to-matting framework enhancing SAM2/SAM3 via region proposal bridge and dedicated matting heads for high-quality video matting. Can improve foreground segmentation and background composition for dance videos.",
      },
    ],
    observation: "Today's papers reveal three notable trends: (1) sparse keyframe-driven generation paradigms are becoming a new direction for motion generation, with SignSparK's CFM framework demonstrating that keyframe anchoring can effectively balance motion accuracy and fluency; (2) world-coordinate diffusion is replacing pixel-space generation, with both PhysiFormer and TryOnCrafter showing the advantages of 3D representations in physical plausibility and controllability; (3) explicit supervision of attention mechanisms is becoming an effective means to improve geometric consistency, with MVTrack4Gen's multi-view point tracking supervision providing concrete paths for improving 3D Audio Attention. For music-to-dance tasks, these advances suggest future architectures may adopt combinations of 'sparse keyframes + world-coordinate diffusion + attention supervision' to achieve physical plausibility and precise controllability while maintaining generation quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-26`,
        'en': `/en/daily/music-to-dance/2026-06-26`,
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
      date="2026-06-26"
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
