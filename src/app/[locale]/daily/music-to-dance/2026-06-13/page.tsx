import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-06-13 | 2D监督3D运动生成与多视角扩散新进展",
    overview: [
      "VideoMDM 实现仅用2D姿态监督训练3D运动扩散模型，摆脱对动作捕捉数据的依赖",
      "Flex4DHuman 提出无几何先验的多视角视频扩散，支持单目视频生成4D高斯点云",
      "OmniDirector 的相机网格表示为舞蹈视频提供导演级运镜控制能力",
      "HYDRA-X 的统一图像视频tokenizer为音乐驱动视频生成提供多模态基础"
    ],
    papers: [
      {
        num: 1,
        tag: "3D运动生成",
        title: "VideoMDM: 从2D监督到3D人体运动生成",
        description: "VideoMDM 提出了一种仅用2D姿态监督训练3D运动扩散模型的框架，彻底摆脱了对昂贵动作捕捉（MoCap）数据的依赖。其核心创新是深度感知的2D重投影损失——在温和假设下，该损失在期望上等价于直接3D监督。模型采用噪声教师策略：预训练的2D-to-3D lifter生成近似3D姿态作为噪声样本，扩散模型在3D空间去噪后通过投影与准确2D关键点对比。论文还适配了两种3D运动正则化器到2D设置：深度加权的2D速度损失确保时序连贯性，运动表示对齐损失通过射线投影伪目标监督关节旋转、速度和足部接触等冗余通道。在HumanML3D上，VideoMDM达到FID 0.88，接近全3D监督MDM的0.54；在真实健身视频数据集Fit3D上，关节误差比WHAM降低一半（MPJPE 111 vs 228 mm），运动平滑度提升5.5倍。",
        keyPoints: [
          "深度加权2D重投影损失在期望上等价于3D MSE监督，数学上证明了2D监督的充分性",
          "噪声教师策略结合预训练lifter，使模型在3D空间学习连贯的运动流形",
          "运动表示对齐损失通过射线投影生成伪目标，监督关节旋转和足部接触等冗余表示",
          "在Fit3D真实视频上，模型生成的运动在人类偏好比较中一致优于所有基线"
        ],
        href: "https://arxiv.org/abs/2606.13364",
        paperLink: "VideoMDM: Towards 3D Human Motion Generation From 2D Supervision",
      },
      {
        num: 2,
        tag: "多视角生成",
        title: "Flex4DHuman: 无几何先验的灵活多视角视频扩散",
        description: "Flex4DHuman 提出了一种无需显式几何先验（骨架、深度图、法线）的多视角视频扩散模型，可直接从单目或稀疏视角视频生成同步的密集多视角视频。模型基于Wan 2.1 1.3B T2V骨干，核心创新是五轴位置编码——将空间坐标、离散帧索引、离散视角槽索引和连续SE(3)相机几何通过PRoPE编码到自注意力中。这种设计使模型能够灵活处理任意数量的参考视角和目标视角，无需固定相机配置。三阶段训练课程逐步引入姿态跟随、灵活参考到目标视角生成和时序展开能力。生成的多视角视频可直接输入4D高斯点云重建流程，在DNA-Rendering数据集上比Diffuman4D（使用GT骨架）提升+1.21dB PSNR，比单目基线提升+9.32dB。",
        keyPoints: [
          "五轴位置编码将相机几何直接注入注意力机制，无需额外可学习参数",
          "相对相机姿态编码和排列不变的视角槽设计支持任意参考/目标视角配置",
          "干净历史token机制支持时序展开，生成长于训练窗口的视频",
          "相同架构经混合人-动物训练后可泛化到动物类别，无需人体特定先验"
        ],
        href: "https://arxiv.org/abs/2606.13655",
        paperLink: "Flex4DHuman: Flexible Multi-view Video Diffusion for 4D Human Reconstruction",
      },
      {
        num: 3,
        tag: "相机控制",
        title: "OmniDirector: 导演级多镜头相机克隆",
        description: "OmniDirector 提出了一种通用的相机运动表示——相机网格（camera grid），将相机参数渲染为在3D空场景中移动的网格线视频，实现从参考视频克隆复杂相机运动到目标内容。这种表示具有三大优势：通用性（统一处理单镜头/多镜头相机运动）、解耦性（空场景消除外观干扰）、可扩展性（任何视频都可生成对应相机网格）。模型在百万级相机网格-视频对上训练，采用分层提示扩展智能体整合相机运动、主体和物体运动信号。在推理时，相机提示被分解为镜头间（inter-shot）和镜头内（intra-shot）两个层次，确保多镜头场景的语义连贯性。相比需要交叉配对数据的隐式方法，OmniDirector无需成对数据即可实现精确的相机克隆，支持鱼眼、推拉变焦等特殊效果。",
        keyPoints: [
          "相机网格将相机运动可视化为3D空场景中的网格线运动，解耦相机与内容信号",
          "百万级相机网格-视频数据集支持从互联网规模视频学习相机运动",
          "分层提示扩展智能体系统整合多模态控制信号，实现导演级创作",
          "支持多镜头克隆和特殊相机效果（鱼眼、推拉变焦等）"
        ],
        href: "https://arxiv.org/abs/2606.13432",
        paperLink: "OmniDirector: General Multi-Shot Camera Cloning without Cross-Paired Data",
      },
      {
        num: 4,
        tag: "多模态Tokenizer",
        title: "HYDRA-X: 统一图像视频表示的全局视觉Tokenizer",
        description: "HYDRA-X 提出了首个在单一ViT中统一图像和视频tokenization的框架HYDRA-XTOK。研究发现两个反直觉结论：(1) 全时空注意力会干扰图像预训练编码的局部结构，而仅关注前一帧的tubelet因果注意力重建效果更好；(2) 层次化时间压缩（2×2阶段）显著优于单步4×压缩。为解决视频语义监督的不对称问题，论文引入轻量级Decompressor将压缩潜在特征上采样回原始时序长度，实现与图像和视频教师的双重蒸馏。基于这一tokenizer，HYDRA-X统一了图像/视频生成、理解、编辑五项任务。特别地，论文提出在tokenizer层面而非LLM层面进行源-目标交互，通过将源图像和目标图像放入同一时间窗口联合处理，使编辑一致性显著提升并加速收敛。",
        keyPoints: [
          "Tubelet因果注意力（仅前一帧）重建质量优于全时空注意力，挑战传统视频建模假设",
          "层次化2×2时间压缩优于单步4×压缩，时序轴受益于渐进多尺度折叠",
          "Decompressor模块解决压缩视频潜在特征与教师模型时序分辨率不匹配问题",
          "Tokenizer层面的源-目标交互使编辑任务在潜在空间早期融合结构信息"
        ],
        href: "https://arxiv.org/abs/2606.13289",
        paperLink: "HYDRA-X: Native Unified Multimodal Models with Holistic Visual Tokenizers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "World Tracing: 像素对齐的可见外几何生成",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2606.13652",
        description: "提出World Tracing表示，为每个像素预测有序的3D点栈（可见表面+遮挡层），实现像素对齐的完整几何生成，可用于舞蹈视频的3D人体重建和遮挡处理。",
      },
      {
        num: 6,
        title: "MoVerse: 全景高斯Scaffold实时视频世界模型",
        tag: "场景建模",
        href: "https://arxiv.org/abs/2606.13376",
        description: "从单张窄视场图像创建可交互漫游的场景，通过拓扑感知扩散生成360°全景，再提升为持久3D高斯scaffold，可用于舞蹈视频背景生成。",
      },
      {
        num: 7,
        title: "Surflo: 全局状态3D表面流模型",
        tag: "几何生成",
        href: "https://arxiv.org/abs/2606.13644",
        description: "将变数量无姿态RGB视图压缩为K个全局潜在token，通过流匹配解码任意分辨率的定向3D表面点，可用于舞蹈生成中的人物几何一致性保持。",
      },
      {
        num: 8,
        title: "HairPort: 3D感知发型迁移",
        tag: "外观迁移",
        href: "https://arxiv.org/abs/2606.12562",
        description: "通过LoRA上下文适应和3D感知传输流程，实现大姿态差距下的发型迁移，对舞蹈视频中的人物外观一致性保持有参考价值。",
      },
      {
        num: 9,
        title: "Modality Forcing: 可扩展的空间生成",
        tag: "深度估计",
        href: "https://arxiv.org/abs/2606.13676",
        description: "通过为每模态分配独立噪声水平，实现单DiT的图像-深度联合生成，AbsRel比现有联合生成模型降低57%，可用于舞蹈视频的空间感知增强。",
      },
      {
        num: 10,
        title: "MiniMax Sparse Attention",
        tag: "高效注意力",
        href: "https://arxiv.org/abs/2606.13392",
        description: "基于GQA的块稀疏注意力，通过轻量级索引分支为每组选择Top-k KV块，在1M上下文下将每token注意力计算降低28.4倍，可用于长舞蹈序列建模。",
      },
    ],
    observation: "今日论文呈现出两个明确的技术趋势：一是摆脱对昂贵3D标注的依赖——VideoMDM用数学上严谨的2D监督等价替代3D监督，Flex4DHuman完全抛弃骨架/深度等几何先验，这表明视觉生成领域正在从'数据驱动'转向'结构驱动'。二是相机/视角控制正成为视频生成的核心能力——OmniDirector的相机网格表示和Flex4DHuman的五轴位置编码都试图将相机几何直接嵌入模型架构，而非作为后处理或条件输入。对于音乐驱动舞蹈生成，这意味着未来可能实现更精确的运镜控制和视角变化，甚至根据音乐节奏自动设计相机运动。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-06-13 | 2D-Supervised 3D Motion Generation & Multi-view Diffusion Advances",
    overview: [
      "VideoMDM enables training 3D motion diffusion models with only 2D pose supervision, eliminating MoCap dependency",
      "Flex4DHuman proposes geometry-prior-free multi-view video diffusion, supporting monocular-to-4D Gaussian splatting",
      "OmniDirector's camera grid representation provides director-level cinematography control for dance videos",
      "HYDRA-X's unified image-video tokenizer offers multimodal foundations for music-driven video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "3D Motion Generation",
        title: "VideoMDM: 3D Human Motion Generation from 2D Supervision",
        description: "VideoMDM introduces a framework for training 3D motion diffusion models using only 2D pose supervision, completely eliminating the need for expensive motion capture (MoCap) data. Its core innovation is depth-aware 2D reprojection loss—which, under mild assumptions, is provably equivalent in expectation to direct 3D supervision. The model employs a noisy-teacher strategy: a pretrained 2D-to-3D lifter generates approximate 3D poses as noisy samples, the diffusion model denoises in 3D space, and supervision is applied by projecting back to compare with accurate 2D keypoints. The paper also adapts two 3D motion regularizers to the 2D setting: depth-weighted 2D velocity loss ensures temporal coherence, and motion representation alignment loss supervises redundant channels (joint rotations, velocities, foot contacts) via ray-projection pseudo-targets. On HumanML3D, VideoMDM achieves FID 0.88, approaching the 0.54 of fully 3D-supervised MDM. On real fitness video dataset Fit3D, joint error is halved compared to WHAM (MPJPE 111 vs 228 mm), with 5.5× smoother motion.",
        keyPoints: [
          "Depth-weighted 2D reprojection loss is equivalent in expectation to 3D MSE supervision, mathematically proving 2D supervision sufficiency",
          "Noisy-teacher strategy with pretrained lifter enables learning coherent 3D motion manifolds in 3D space",
          "Motion representation alignment loss generates pseudo-targets via ray projection to supervise redundant representations",
          "On real Fit3D videos, model-generated motions consistently outperform all baselines in human preference comparisons"
        ],
        href: "https://arxiv.org/abs/2606.13364",
        paperLink: "VideoMDM: Towards 3D Human Motion Generation From 2D Supervision",
      },
      {
        num: 2,
        tag: "Multi-view Generation",
        title: "Flex4DHuman: Geometry-Prior-Free Multi-view Video Diffusion",
        description: "Flex4DHuman proposes a multi-view video diffusion model without explicit geometry priors (skeletons, depth maps, normals), directly generating synchronized dense multi-view videos from monocular or sparse-view inputs. Built on Wan 2.1 1.3B T2V backbone, its core innovation is five-axis positional encoding—encoding spatial coordinates, discrete frame indices, discrete view-slot indices, and continuous SE(3) camera geometry into self-attention via PRoPE. This design enables flexible handling of arbitrary numbers of reference and target views without fixed camera configurations. A three-stage training curriculum progressively introduces pose following, flexible reference-to-target generation, and temporal rollout. Generated multi-view videos can be directly fed into 4D Gaussian splatting reconstruction. On DNA-Rendering, it outperforms Diffuman4D (using GT skeletons) by +1.21dB PSNR, and monocular baselines by +9.32dB.",
        keyPoints: [
          "Five-axis positional encoding injects camera geometry directly into attention without additional learnable parameters",
          "Relative camera pose encoding and permutation-invariant view-slot design support arbitrary reference/target configurations",
          "Clean history token mechanism enables temporal rollout for videos longer than training windows",
          "Same architecture generalizes to animal categories after mixed human-animal training without human-specific priors"
        ],
        href: "https://arxiv.org/abs/2606.13655",
        paperLink: "Flex4DHuman: Flexible Multi-view Video Diffusion for 4D Human Reconstruction",
      },
      {
        num: 3,
        tag: "Camera Control",
        title: "OmniDirector: Director-Level Multi-Shot Camera Cloning",
        description: "OmniDirector introduces a general camera motion representation—the camera grid—which renders camera parameters as grid-line videos moving in an empty 3D scene, enabling cloning complex camera motions from reference videos to target content. This representation offers three advantages: generality (unified handling of single/multi-shot motions), decoupling (empty scene eliminates appearance interference), and scalability (any video can generate its camera grid). The model is trained on million-scale camera grid-video pairs, using a hierarchical prompt expansion agent to integrate camera motion, subject, and object motion signals. At inference, camera prompts are decomposed into inter-shot and intra-shot hierarchies to ensure semantic coherence in multi-shot scenarios. Unlike implicit methods requiring cross-paired data, OmniDirector achieves precise camera cloning without paired data, supporting special effects like fisheye and dolly zoom.",
        keyPoints: [
          "Camera grid visualizes camera motion as grid-line movement in empty 3D scenes, decoupling camera from content signals",
          "Million-scale camera grid-video dataset enables learning camera motion from internet-scale videos",
          "Hierarchical prompt expansion agent system integrates multimodal control signals for director-level creation",
          "Supports multi-shot cloning and special camera effects (fisheye, dolly zoom, etc.)"
        ],
        href: "https://arxiv.org/abs/2606.13432",
        paperLink: "OmniDirector: General Multi-Shot Camera Cloning without Cross-Paired Data",
      },
      {
        num: 4,
        tag: "Multimodal Tokenizer",
        title: "HYDRA-X: Holistic Visual Tokenizer Unifying Images and Videos",
        description: "HYDRA-X presents the first framework HYDRA-XTOK that unifies image and video tokenization within a single ViT. Research reveals two counter-intuitive findings: (1) Full spatiotemporal attention disrupts local structures from image pretraining, while tubelet causal attention (only previous frame) achieves better reconstruction; (2) Hierarchical temporal compression (2×2 stages) significantly outperforms single-step 4× compression. To address video semantic supervision asymmetry, the paper introduces a lightweight Decompressor to upsample compressed latent features back to original temporal length, enabling dual distillation from both image and video teachers. Based on this tokenizer, HYDRA-X unifies five tasks: image/video generation and understanding, plus editing. Notably, the paper proposes source-target interaction at the tokenizer level rather than LLM level—processing source and target images jointly in the same temporal window, substantially improving editing consistency and convergence speed.",
        keyPoints: [
          "Tubelet causal attention (previous frame only) outperforms full spatiotemporal attention, challenging conventional video modeling assumptions",
          "Hierarchical 2×2 temporal compression outperforms single-step 4× compression—temporal axis benefits from progressive multi-scale folding",
          "Decompressor module resolves temporal resolution mismatch between compressed video latents and teacher models",
          "Tokenizer-level source-target interaction fuses structural information early in latent space for editing tasks"
        ],
        href: "https://arxiv.org/abs/2606.13289",
        paperLink: "HYDRA-X: Native Unified Multimodal Models with Holistic Visual Tokenizers",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "World Tracing: Pixel-Aligned Geometry Beyond the Visible",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2606.13652",
        description: "Proposes World Tracing representation predicting ordered 3D point stacks per pixel (visible surface + occluded layers), enabling pixel-aligned complete geometry generation for 3D human reconstruction and occlusion handling in dance videos.",
      },
      {
        num: 6,
        title: "MoVerse: Panoramic Gaussian Scaffold Real-Time World Model",
        tag: "Scene Modeling",
        href: "https://arxiv.org/abs/2606.13376",
        description: "Creates interactively navigable scenes from single narrow-FOV images via topology-aware diffusion for 360° panoramas lifted to persistent 3D Gaussian scaffolds, applicable for dance video background generation.",
      },
      {
        num: 7,
        title: "Surflo: Global State 3D Surface Flow Model",
        tag: "Geometry Generation",
        href: "https://arxiv.org/abs/2606.13644",
        description: "Compresses variable unposed RGB views into K global latent tokens, decoding arbitrary-resolution oriented 3D surface points via flow matching for geometric consistency in dance generation.",
      },
      {
        num: 8,
        title: "HairPort: 3D-Aware Hair Transfer",
        tag: "Appearance Transfer",
        href: "https://arxiv.org/abs/2606.12562",
        description: "Achieves hairstyle transfer across large pose gaps via LoRA in-context adaptation and 3D-aware pipeline, relevant for maintaining appearance consistency in dance videos.",
      },
      {
        num: 9,
        title: "Modality Forcing for Scalable Spatial Generation",
        tag: "Depth Estimation",
        href: "https://arxiv.org/abs/2606.13676",
        description: "Enables joint image-depth generation with single DiT via per-modality noise levels, reducing AbsRel by 57% vs existing joint models for spatial perception enhancement in dance videos.",
      },
      {
        num: 10,
        title: "MiniMax Sparse Attention",
        tag: "Efficient Attention",
        href: "https://arxiv.org/abs/2606.13392",
        description: "GQA-based blockwise sparse attention selecting Top-k KV blocks per group via lightweight index branch, reducing per-token attention compute by 28.4× at 1M context for long dance sequence modeling.",
      },
    ],
    observation: "Today's papers reveal two clear technical trends: first,摆脱dependence on expensive 3D annotations—VideoMDM uses mathematically rigorous 2D supervision as an equivalent replacement for 3D supervision, while Flex4DHuman completely abandons geometric priors like skeletons and depth. This indicates the visual generation field is shifting from 'data-driven' to 'structure-driven' approaches. Second, camera/view control is becoming a core capability for video generation—both OmniDirector's camera grid representation and Flex4DHuman's five-axis positional encoding attempt to embed camera geometry directly into model architecture rather than as post-processing or conditional inputs. For music-driven dance generation, this suggests future possibilities for more precise cinematography control and viewpoint changes, potentially even automatic camera motion design synchronized to music rhythm.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-13`,
        'en': `/en/daily/music-to-dance/2026-06-13`,
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
      date="2026-06-13"
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
