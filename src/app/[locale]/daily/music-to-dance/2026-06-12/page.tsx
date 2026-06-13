import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-06-12 | 2D监督3D运动生成与多视角视频扩散",
    overview: [
      "VideoMDM 提出从2D视频监督学习3D人体运动的扩散框架，无需3D标注即可训练高质量运动先验",
      "Flex4DHuman 基于Wan 2.1实现无显式几何先验的多视角视频生成，支持从单目视频重建4D高斯溅射",
      "OmniDirector 提出相机网格表示实现导演级运镜控制，支持多镜头复杂相机运动克隆",
      "HYDRA-X 统一图像视频tokenization，帧级因果注意力机制为高效时序建模提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "运动生成",
        title: "VideoMDM：从2D监督学习3D人体运动生成",
        description: "VideoMDM 提出了一种革命性的训练范式：仅使用从单目视频中提取的2D姿态，即可训练高质量的3D人体运动扩散模型。核心创新在于深度加权的2D重投影损失——在温和假设下，该损失在期望上等价于直接的3D MSE监督。论文还提出了针对2D设置的运动表示对齐损失，通过射线投影为关节旋转、速度和足地接触等冗余通道生成伪目标。在HumanML3D上，VideoMDM达到FID 0.88，接近全3D监督的MDM（FID 0.54）；在真实健身视频数据集Fit3D上，其MPJPE误差比WHAM降低51%（111mm vs 228mm），加速度平滑度提升5.5倍。",
        keyPoints: [
          "深度加权2D重投影损失：乘以预测深度d消除透视投影的1/d缩放效应，在期望上等价于3D监督",
          "运动表示对齐：通过射线投影操作PΠ将2D观测对齐到3D预测，为冗余通道（旋转、速度、足地接触）生成监督信号",
          "2D速度损失：在重投影空间约束时序一致性，避免仅依赖位置损失导致的抖动",
          "LIS式训练策略：高噪声 timestep 直接监督，低噪声 timestep 采用多步DDIM去噪后再监督"
        ],
        href: "https://arxiv.org/abs/2606.13364",
        paperLink: "VideoMDM: Towards 3D Human Motion Generation From 2D Supervision",
      },
      {
        num: 2,
        tag: "多视角生成",
        title: "Flex4DHuman：无几何先验的多视角视频扩散模型",
        description: "Flex4DHuman 基于Wan 2.1 1.3B文本到视频模型，通过五轴位置编码（空间坐标+帧索引+视角槽位+连续SE(3)相机几何）实现了无需显式几何先验的多视角视频生成。与依赖SMPL骨骼、深度图或法向量的前人方法不同，该模型仅通过相对相机姿态条件即可从单目或稀疏视角视频生成同步的密集多视角视频。在DNA-Rendering数据集上，Flex4DHuman比Diffuman4D的GT-skeleton设置提升+1.21dB PSNR；在ActorsHQ零样本测试上，比单目Diffuman4D提升+3.35dB PSNR。",
        keyPoints: [
          "五轴位置编码：将RoPE扩展为(D_frame, D_view, D_SE(3), D_h, D_w) = (16,8,20,42,42)，在注意力中编码相对相机几何",
          "PRoPE相机编码：通过T⊤变换query、T⁻¹变换key，使注意力依赖于token间的相对相机变换",
          "三阶段课程学习：阶段1单参考单目标适应位置编码；阶段2动态参考采样支持可变视角数；阶段3时序rollout训练",
          "4D高斯溅射重建：生成的多视角视频可直接输入现成重建流程，从单目静态相机视频生成动态4D高斯溅射"
        ],
        href: "https://arxiv.org/abs/2606.13655",
        paperLink: "Flex4DHuman: Flexible Multi-view Video Diffusion for 4D Human Reconstruction",
      },
      {
        num: 3,
        tag: "相机控制",
        title: "OmniDirector：导演级多镜头相机运动克隆",
        description: "OmniDirector 提出相机网格（camera grid）表示法，将相机参数渲染为3D空场景中的网格运动视频，实现了无需交叉配对数据的多镜头相机运动克隆。该表示具有三大优势：通用性（统一处理单镜头/多镜头）、解耦性（空场景消除内容干扰）、可扩展性（任何视频都可提取相机网格）。基于百万级相机网格-视频对训练，模型在MMDiT架构上实现了导演级控制。分层提示扩展代理将相机运动分解为镜头间（inter-shot）和镜头内（intra-shot）两个层次，再与主体、动作语义融合为统一文本条件。",
        keyPoints: [
          "相机网格表示：在3D空房间中渲染相机轨迹，用X-Z平面网格+Y轴垂直线展示空间结构和相机运动",
          "百万级数据集：从任意视频提取相机参数生成对应网格，突破交叉配对数据稀缺瓶颈",
          "分层提示扩展：inter-shot层处理镜头切换关系确保语义连贯，intra-shot层描述单镜头内相机克隆",
          "特殊效果扩展：支持鱼眼畸变（Kannala-Brandt模型）和推拉变焦（dolly zoom/Hitchcock zoom）"
        ],
        href: "https://arxiv.org/abs/2606.13432",
        paperLink: "OmniDirector: General Multi-Shot Camera Cloning without Cross-Paired Data",
      },
      {
        num: 4,
        tag: "统一模型",
        title: "HYDRA-X：统一图像视频tokenization的整体视觉tokenizer",
        description: "HYDRA-X 提出了首个在单ViT中统一图像和视频tokenization的框架HYDRA-XTOK。反直觉的实验发现：(1)帧级因果时序注意力（仅 attends 前一帧）全面优于全时空注意力，后者会破坏图像预训练编码的局部结构；(2)分层时序压缩（连续2×2×）显著优于单步4×压缩。为注入视频级语义，论文引入轻量级Decompressor将压缩latent上采样回原始时序长度，实现与视频教师的蒸馏对齐。基于该tokenizer，HYDRA-X统一了图像/视频生成、理解、编辑五大任务，并通过在tokenizer阶段进行源-目标交互，显著提升了编辑一致性。",
        keyPoints: [
          "Tubelet注意力：限制因果注意力在2帧窗口（当前帧+前一帧），重建指标全面优于Full/Causal注意力",
          "分层patchify：两阶段2×时序压缩优于单步4×，表明时序轴受益于渐进多尺度折叠",
          "Decompressor设计：轻量级ViT模块将1+T/4 latent上采样到T帧，支持与图像+视频教师的双流蒸馏",
          "编辑架构改进：源-目标在tokenizer的Sem-ViT阶段交互，而非在LLM语义层交互，保留细粒度结构信息"
        ],
        href: "https://arxiv.org/abs/2606.13289",
        paperLink: "HYDRA-X: Native Unified Multimodal Models with Holistic Visual Tokenizers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "World Tracing：像素对齐的生成式几何重建",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2606.13652",
        description: "提出World Tracing表示：为每个像素预测有序的相机空间3D点栈，第一层为可见表面，后续层为遮挡表面。WT-DiT通过因子化和全局注意力耦合多层几何token，在可见表面重建和完整几何生成上均优于深度估计器和image-to-3D生成器。",
      },
      {
        num: 6,
        title: "MoVerse：实时视频世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.13376",
        description: "从单张窄视场图像创建可交互漫游的场景。通过拓扑感知扩散扩展为360°全景，再提升为3D Gaussian scaffold，最后用双向扩散教师蒸馏的因果自回归渲染器生成视频。RTX 4090上实现8 FPS实时漫游。",
      },
      {
        num: 7,
        title: "Surflo：具全局状态的一致3D表面流模型",
        tag: "表面重建",
        href: "https://arxiv.org/abs/2606.13644",
        description: "将可变数量无姿态RGB视图压缩为K个全局latent token，通过flow matching独立解码定向3D表面点。推理时注入光度梯度引导项抑制局部不一致性，是首个结合全局latent与任意分辨率解码的前馈方法。",
      },
      {
        num: 8,
        title: "HairPort：3D感知发型迁移",
        tag: "外观迁移",
        href: "https://arxiv.org/abs/2606.12562",
        description: "基于FLUX.1 Kontext的LoRA自适应秃头转换器+Baldy数据集（6000对），通过3D感知管线重建并重新渲染参考发型，再用条件flow matching生成器合成。支持大姿态差异下的准确、姿态一致、身份保持的发型迁移。",
      },
      {
        num: 9,
        title: "Modality Forcing：可扩展的空间生成",
        tag: "多模态生成",
        href: "https://arxiv.org/abs/2606.13676",
        description: "通过后训练recipe实现联合图像-深度生成，为每模态分配独立噪声水平。在稀疏深度数据上训练的DiT在单目深度估计上达到SOTA，AbsRel比现有联合生成模型降低57%。",
      },
      {
        num: 10,
        title: "Z-Image Turbo++：高保真2步图像生成",
        tag: "加速生成",
        href: "https://arxiv.org/abs/2606.12575",
        description: "通过分布对齐对抗学习（教师生成图像作为GAN真实样本）、步解耦参数化（两步独立参数）、端到端迭代正则化训练，将2步生成质量逼近8步教师模型。",
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：视频生成正从单一模态向多模态、多视角、精细化控制方向演进。VideoMDM和Flex4DHuman共同展示了如何减少对显式3D监督的依赖——前者通过巧妙的2D重投影损失实现3D运动学习，后者通过位置编码隐式编码相机几何。这为music-to-dance任务提供了重要启示：当前依赖3D姿态估计（如DWPose）的pipeline可能可以通过端到端的2D监督训练获得更好的泛化性。OmniDirector的相机网格表示则为舞蹈视频的运镜控制提供了可扩展的解决方案，其分层提示扩展机制也可借鉴用于音乐-运动对齐的多层次条件融合。HYDRA-X的架构发现（帧级因果注意力优于全时空注意力）对设计高效的时序建模模块具有直接指导意义，其Decompressor设计也为多尺度时序特征融合提供了新思路。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-06-12 | 2D-Supervised 3D Motion & Multi-View Video Diffusion",
    overview: [
      "VideoMDM proposes a diffusion framework for learning 3D human motion from 2D video supervision without 3D annotations",
      "Flex4DHuman builds on Wan 2.1 to achieve multi-view video generation without explicit geometric priors, enabling 4D Gaussian splatting from monocular video",
      "OmniDirector introduces camera grid representation for director-level camera control, supporting multi-shot complex camera motion cloning",
      "HYDRA-X unifies image-video tokenization, with frame-level causal attention providing new insights for efficient temporal modeling"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "VideoMDM: 3D Human Motion Generation from 2D Supervision",
        description: "VideoMDM introduces a revolutionary training paradigm: training high-quality 3D human motion diffusion models using only 2D poses extracted from monocular videos. The core innovation is depth-weighted 2D reprojection loss—which, under mild assumptions, is equivalent in expectation to direct 3D MSE supervision. The paper also proposes motion representation alignment loss for the 2D setting, generating pseudo-targets for redundant channels (joint rotations, velocities, foot contacts) via ray projection. On HumanML3D, VideoMDM achieves FID 0.88, approaching fully 3D-supervised MDM (FID 0.54). On real fitness video dataset Fit3D, MPJPE error is reduced by 51% compared to WHAM (111mm vs 228mm), with 5.5× better acceleration smoothness.",
        keyPoints: [
          "Depth-weighted 2D reprojection loss: multiplying by predicted depth d eliminates 1/d scaling from perspective projection, equivalent to 3D supervision in expectation",
          "Motion representation alignment: ray projection operation PΠ aligns 2D observations to 3D predictions, generating supervision signals for redundant channels",
          "2D velocity loss: constrains temporal consistency in reprojected space, avoiding jitter from position-only losses",
          "LIS-style training: direct supervision at high-noise timesteps, multi-step DDIM denoising before supervision at low-noise timesteps"
        ],
        href: "https://arxiv.org/abs/2606.13364",
        paperLink: "VideoMDM: Towards 3D Human Motion Generation From 2D Supervision",
      },
      {
        num: 2,
        tag: "Multi-View Generation",
        title: "Flex4DHuman: Multi-View Video Diffusion Without Geometric Priors",
        description: "Flex4DHuman builds on Wan 2.1 1.3B text-to-video model with five-axis positional encoding (spatial coordinates + frame indices + view slots + continuous SE(3) camera geometry) to achieve multi-view video generation without explicit geometric priors. Unlike prior methods relying on SMPL skeletons, depth maps, or normals, this model generates synchronized dense multi-view videos from monocular or sparse-view videos using only relative camera-pose conditioning. On DNA-Rendering, Flex4DHuman achieves +1.21dB PSNR over Diffuman4D's GT-skeleton setting. On zero-shot ActorsHQ, it achieves +3.35dB PSNR over monocular Diffuman4D.",
        keyPoints: [
          "Five-axis positional encoding: extends RoPE to (D_frame, D_view, D_SE(3), D_h, D_w) = (16,8,20,42,42), encoding relative camera geometry in attention",
          "PRoPE camera encoding: transforms queries by T⊤ and keys by T⁻¹, making attention depend on relative camera transformation between tokens",
          "Three-stage curriculum: Stage 1 single-ref/single-target for position encoding adaptation; Stage 2 dynamic reference sampling for variable views; Stage 3 temporal rollout",
          "4D Gaussian splatting reconstruction: generated multi-view videos can directly feed into off-the-shelf reconstruction pipelines for dynamic 4D Gaussian splats"
        ],
        href: "https://arxiv.org/abs/2606.13655",
        paperLink: "Flex4DHuman: Flexible Multi-view Video Diffusion for 4D Human Reconstruction",
      },
      {
        num: 3,
        tag: "Camera Control",
        title: "OmniDirector: Director-Level Multi-Shot Camera Motion Cloning",
        description: "OmniDirector proposes camera grid representation, rendering camera parameters as grid motion videos in empty 3D scenes, enabling multi-shot camera motion cloning without cross-paired data. This representation offers three advantages: generality (unified handling of single/multi-shot), decoupling (empty scene eliminates content interference), and scalability (any video can extract camera grids). Trained on million-scale camera grid-video pairs, the model achieves director-level control on MMDiT architecture. A hierarchical prompt expansion agent decomposes camera motion into inter-shot and intra-shot hierarchies, then fuses with subject and action semantics into unified text conditioning.",
        keyPoints: [
          "Camera grid representation: renders camera trajectory in empty 3D room with X-Z plane grids + Y-axis vertical lines showing spatial structure and motion",
          "Million-scale dataset: extracts camera parameters from arbitrary videos to generate corresponding grids, breaking through cross-paired data scarcity",
          "Hierarchical prompt expansion: inter-shot layer handles shot transitions for semantic coherence, intra-shot layer describes single-shot camera cloning",
          "Special effects extension: supports fisheye distortion (Kannala-Brandt model) and dolly zoom (Hitchcock zoom)"
        ],
        href: "https://arxiv.org/abs/2606.13432",
        paperLink: "OmniDirector: General Multi-Shot Camera Cloning without Cross-Paired Data",
      },
      {
        num: 4,
        tag: "Unified Model",
        title: "HYDRA-X: Holistic Visual Tokenizer Unifying Image and Video",
        description: "HYDRA-X presents the first framework (HYDRA-XTOK) to unify image and video tokenization within a single ViT. Counter-intuitive findings: (1) frame-level causal temporal attention (attending only to previous frame) comprehensively outperforms full spatiotemporal attention, which disrupts local structure from image pretraining; (2) hierarchical temporal compression (consecutive 2×2×) significantly outperforms single-step 4× compression. To inject video-level semantics, a lightweight Decompressor upsamples compressed latents back to original temporal length for distillation alignment with video teachers. Based on this tokenizer, HYDRA-X unifies five tasks (image/video generation, understanding, editing), with source-target interaction at the tokenizer stage significantly improving editing consistency.",
        keyPoints: [
          "Tubelet attention: restricting causal attention to 2-frame window (current + previous) achieves better reconstruction than Full/Causal attention",
          "Hierarchical patchify: two-stage 2× temporal compression outperforms single-step 4×, indicating temporal axis benefits from progressive multi-scale folding",
          "Decompressor design: lightweight ViT upsamples 1+T/4 latent to T frames, enabling dual-stream distillation with image + video teachers",
          "Editing architecture improvement: source-target interaction at tokenizer's Sem-ViT stage rather than LLM semantic layer preserves fine-grained structural information"
        ],
        href: "https://arxiv.org/abs/2606.13289",
        paperLink: "HYDRA-X: Native Unified Multimodal Models with Holistic Visual Tokenizers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "World Tracing: Generative Pixel-Aligned Geometry",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2606.13652",
        description: "Proposes World Tracing representation: predicts ordered camera-space 3D point stacks per pixel, first layer for visible surface, subsequent layers for occluded surfaces. WT-DiT couples multi-layer geometry tokens through factorized and global attention, outperforming both depth predictors and image-to-3D generators.",
      },
      {
        num: 6,
        title: "MoVerse: Real-Time Video World Model",
        tag: "World Model",
        href: "https://arxiv.org/abs/2606.13376",
        description: "Creates interactively navigable scenes from single narrow-FOV images. Expands to 360° panorama via topology-aware diffusion, lifts to 3D Gaussian scaffold, then renders along camera trajectories using bidirectional diffusion teacher distilled to causal autoregressive student. Achieves 8 FPS real-time roaming on RTX 4090.",
      },
      {
        num: 7,
        title: "Surflo: Consistent 3D Surface Flow with Global State",
        tag: "Surface Reconstruction",
        href: "https://arxiv.org/abs/2606.13644",
        description: "Compresses variable unposed RGB views into K global latent tokens, decodes oriented 3D surface points via flow matching. Inference-time photometric gradient guidance suppresses local inconsistencies. First feed-forward approach combining global latent with arbitrary-resolution decoding.",
      },
      {
        num: 8,
        title: "HairPort: 3D-Aware Hair Transfer",
        tag: "Appearance Transfer",
        href: "https://arxiv.org/abs/2606.12562",
        description: "LoRA-adapted FLUX.1 Kontext bald converter + Baldy dataset (6000 pairs), reconstructs and re-renders reference hairstyle through 3D-aware pipeline, then synthesizes with conditional flow matching. Supports accurate, pose-consistent, identity-preserving transfer under large pose discrepancies.",
      },
      {
        num: 9,
        title: "Modality Forcing: Scalable Spatial Generation",
        tag: "Multimodal Generation",
        href: "https://arxiv.org/abs/2606.13676",
        description: "Joint image-depth generation via post-training recipe assigning independent noise levels per modality. DiT trained on sparse depth data achieves SOTA monocular depth estimation, reducing AbsRel by 57% vs existing joint generation models.",
      },
      {
        num: 10,
        title: "Z-Image Turbo++: High-Fidelity 2-Step Generation",
        tag: "Accelerated Generation",
        href: "https://arxiv.org/abs/2606.12575",
        description: "Distribution-aligned adversarial learning (teacher-generated images as GAN real samples), step-decoupled parameterization (independent parameters per step), and end-to-end iterative regularization training approach 8-step teacher quality with only 2 steps.",
      },
    ],
    observation: "Today's papers reveal a clear technical trend: video generation is evolving from single-modality toward multi-modal, multi-view, and fine-grained control. VideoMDM and Flex4DHuman demonstrate how to reduce reliance on explicit 3D supervision—the former achieves 3D motion learning through clever 2D reprojection loss, while the latter implicitly encodes camera geometry via positional encoding. This provides crucial insights for music-to-dance tasks: current pipelines relying on 3D pose estimation (e.g., DWPose) could potentially achieve better generalization through end-to-end 2D-supervised training. OmniDirector's camera grid representation offers a scalable solution for camera motion control in dance videos, and its hierarchical prompt expansion mechanism could be adapted for multi-level music-motion alignment conditioning. HYDRA-X's architectural discovery (frame-level causal attention outperforming full spatiotemporal attention) provides direct guidance for designing efficient temporal modeling modules, and its Decompressor design offers new ideas for multi-scale temporal feature fusion.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-12`,
        'en': `/en/daily/music-to-dance/2026-06-12`,
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
      date="2026-06-12"
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
