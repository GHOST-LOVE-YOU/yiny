import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "扩散加速与可控生成：从 10x 提速到持久动态记忆",
    overview: [
      "MrFlow 实现无需训练的 10x 扩散加速，通过像素空间超分 + 噪声注入保持生成质量",
      "WorldDirector 提出持久动态记忆机制，解决物体离开视野后重新进入的身份一致性问题",
      "OrbitQuant 实现 W2A4 极低比特量化，为边缘设备部署 DiT 模型提供可行方案"
    ],
    papers: [
      {
        num: 1,
        tag: "扩散加速",
        title: "MrFlow：多分辨率流匹配实现 10x 训练无关加速",
        description: "MrFlow 提出了一种分阶段的多分辨率生成策略：先在低分辨率潜空间快速生成图像主体结构（12步），然后通过 Real-ESRGAN 在像素空间进行超分，接着注入低强度噪声（σ=0.1）实现高频重采样，最后在高分辨率潜空间进行单步细节精炼。该方法充分利用了低分辨率采样时的二次方 token 减少特性，在 FLUX.1-dev 和 Qwen-Image 上实现了 10.3x 端到端加速，OneIG 指标与原始生成差距小于 1%。关键创新在于像素空间超分保留了低分辨率阶段的全局结构语义，而噪声注入则削弱了超分可能引入的伪影，使高分辨率流先验能够重新采样和修正细节。",
        keyPoints: [
          "低分辨率阶段每步执行时间加速约 4x，且所需采样步数更少（12步 vs 高分辨率阶段1步）",
          "像素空间 GAN 超分（Real-ESRGAN）比潜空间上采样更能保留结构语义并添加高频信号",
          "噪声注入强度仅需 0.1 即可实现有效的高频重采样，使高分辨率精炼阶段能快速收敛"
        ],
        href: "https://arxiv.org/abs/2607.01642",
        paperLink: "Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration via Staged Sampling",
      },
      {
        num: 2,
        tag: "世界模型",
        title: "WorldDirector：持久动态记忆的可控世界模拟器",
        description: "WorldDirector 通过显式解耦语义运动编排与视觉生成，解决了现有世界模型在物体离开视野后无法保持动态记忆的问题。该方法利用 LLM 协调 3D 轨迹与相机运动，将规划结果投影为 2D 边界框序列作为视频生成的位置条件。为确保物体重新进入视野时的外观一致性，论文提出了 Appearance Binding 机制，从历史上下文中检索动态对象的 RGB 特征作为视觉锚点。结合空间感知的交叉注意力机制（将实体特定的文本提示路由到对应区域）和因果自回归架构，WorldDirector 能够在长时程视频生成中严格保持动态对象记忆，实现物体永久性和外观一致性。",
        keyPoints: [
          "LLM 编排器将用户指令转换为 3D 边界框和相机轨迹，提供显式的运动控制",
          "Appearance Binding 机制通过检索历史外观特征，确保物体重新进入视野时的身份一致性",
          "Temporal Drop 机制（初始16帧密集采样，之后每6帧稀疏采样）防止模型过度依赖外观条件而产生滑动伪影"
        ],
        href: "https://arxiv.org/abs/2607.02517",
        paperLink: "WorldDirector: Building Controllable World Simulators with Persistent Dynamic Memory",
      },
      {
        num: 3,
        tag: "模型量化",
        title: "OrbitQuant：数据无关的 DiT 量化至 W2A4",
        description: "OrbitQuant 针对扩散 Transformer（DiT）的激活值在 timestep、prompt 和 CFG 分支间漂移的问题，提出了一种无需校准数据的旋转量化方案。该方法通过随机置换块 Hadamard（RPBH）旋转将激活值映射到固定边际分布，使用单个 Lloyd-Max 码本即可量化所有 timestep 和层的激活。权重在离线阶段通过相同旋转吸收到共享基底中，推理时仅需对激活进行前向旋转。在 FLUX.1、Z-Image-Turbo、Wan 2.1 和 CogVideoX 上的实验表明，OrbitQuant 在 W3A4、W3A3 和 W2A4 等低比特设置下均达到 SOTA，其中 W2A4 是唯一能产生可用图像的 PTQ 方法。",
        keyPoints: [
          "RPBH 旋转使激活值坐标集中在固定边际分布周围，单个码本服务所有 timestep 和层",
          "权重离线吸收旋转，推理时仅需激活前向旋转，计算开销极小",
          "从图像到视频 DiT 无需 per-modality 调参，方案可直接迁移"
        ],
        href: "https://arxiv.org/abs/2607.02461",
        paperLink: "OrbitQuant: Data-Agnostic Quantization for Image and Video Diffusion Transformers",
      },
      {
        num: 4,
        tag: "单步生成",
        title: "iRDM：表示分布匹配实现单步视觉生成",
        description: "iRDM 系统研究了表示分布匹配（RDM）的设计空间，发现 MMD 估计方式、生成批次大小和编码器组合是关键设计轴。论文提出使用 Nyström 近似（4096 个地标点）构建冻结的全数据参考分布，配合精确的批次内排斥项估计 MMD；生成批次大小最优值超过 2048，远大于常规做法；采用 14 个编码器的平衡电池并通过比例拉格朗日控制器动态调整权重，防止对单一编码器过拟合。在 ImageNet 上，iRDM 达到 SW_r14 1.30 的单步生成 SOTA；应用于 FLUX.2 [klein]（4B 参数 4 步生成器），仅用 90 H200 GPU 小时即可 post-train 为单步模型，GenEval 从 0.794 提升至 0.826，PickScore 从 22.58 提升至 22.76。",
        keyPoints: [
          "Nyström 近似（4096 landmarks）构建零方差的全数据参考，优于每批次重采样的漂移场方法",
          "生成批次大小最优值 >2048，梯度缓存技术使大批次训练成为可能",
          "14 编码器平衡电池 + 比例拉格朗日控制器防止对单一表示过拟合"
        ],
        href: "https://arxiv.org/abs/2607.02375",
        paperLink: "Representation Distribution Matching for One-Step Visual Generation",
      },
      {
        num: 5,
        tag: "手部控制",
        title: "HandsOnWorld：相机解耦的手部控制视频生成",
        description: "HandsOnWorld 解决了第一人称视角视频中手部控制生成的两个核心挑战：训练数据稀缺和相机-手部运动耦合。论文提出 protagonist-centered 标注流程，通过单目重建在 Ego4D 上构建 EgoVid-Pro 数据集（103K 片段，约 12M 帧），在动作语义、图像质量和 3D 几何三个层面过滤得到干净的主角手部轨迹。针对 ego-motion 导致的手部控制歧义，论文提出 Plücker Hand Map：将 Plücker 射线表示从相机射线扩展到手部表面，在世界坐标系中表示手部，从而解耦绝对 3D 运动与相机 ego-motion。实验表明，该方法在重建保真度和控制精度上超越现有手部控制生成方法，并能泛化到实验室数据集之外的日常场景。",
        keyPoints: [
          "EgoVid-Pro 数据集通过单目重建从野外视频获取 3D 手部标注，规模与现有最大数据集相当但场景更多样",
          "Plücker Hand Map 将手部表示为世界坐标系中的射线，解耦相机运动与手部运动",
          "基于 Wan 视频扩散模型（5B/14B）训练，支持第一人称视角的细粒度手部交互控制"
        ],
        href: "https://arxiv.org/abs/2607.02075",
        paperLink: "HandsOnWorld: Unconstrained Egocentric Video Generation with Camera-Disentangled Hand Control",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "分布级奖励优化视觉生成模型",
        tag: "RLHF",
        href: "https://arxiv.org/abs/2607.02291",
        description: "提出分布级奖励函数替代样本级奖励，通过子集替换策略高效估计奖励，缓解模式坍塌问题。",
      },
      {
        num: 7,
        title: "Self-Flow 改进机制再审视",
        tag: "扩散训练",
        href: "https://arxiv.org/abs/2607.02508",
        description: "发现 Self-Flow 的增益主要来自噪声维度的数据增强而非双 timestep 交互，提出 Attention Separation 机制。",
      },
      {
        num: 8,
        title: "Ink3D：视频生成模型合成复杂纹理",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2607.01222",
        description: "利用视频生成模型的先验进行 3D 纹理合成，OrbitPainter 生成多视角视频，TextureOptimizer 整合为一致纹理。",
      },
      {
        num: 9,
        title: "AnyGroundBench：视频时空定位基准",
        tag: "基准测试",
        href: "https://arxiv.org/abs/2607.02269",
        description: "针对专业领域（动物、工业、体育等）的视频时空定位基准，评估 VLM 的领域适应能力。",
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：扩散模型的推理效率优化正从单一维度（如 timestep 蒸馏）转向多维度协同优化。MrFlow 结合多分辨率生成与像素空间超分，iRDM 通过表示分布匹配实现单步生成，OrbitQuant 则将量化推向 W2A4 的极限——三者共同指向一个目标：在保持生成质量的前提下，将扩散模型的推理成本降低一个数量级。对于 music-to-dance 任务而言，这些技术的迁移路径明确：MrFlow 的分阶段采样可直接应用于舞蹈视频生成，OrbitQuant 的量化方案可降低边缘设备部署门槛，而 iRDM 的单步生成思路则为实时交互式舞蹈生成提供了可能性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Diffusion Acceleration & Controllable Generation: From 10x Speedup to Persistent Dynamic Memory",
    overview: [
      "MrFlow achieves training-free 10x diffusion acceleration via pixel-space super-resolution + noise injection",
      "WorldDirector introduces persistent dynamic memory to maintain object identity consistency after out-of-view periods",
      "OrbitQuant pushes quantization to W2A4 for DiT models, enabling edge device deployment"
    ],
    papers: [
      {
        num: 1,
        tag: "Diffusion Acceleration",
        title: "MrFlow: 10x Training-Free Acceleration via Multi-Resolution Flow Matching",
        description: "MrFlow proposes a staged multi-resolution generation strategy: first rapidly generate image structure in low-resolution latent space (12 steps), then perform super-resolution in pixel space using Real-ESRGAN, inject low-strength noise (σ=0.1) for high-frequency resampling, and finally perform single-step detail refinement in high-resolution latent space. This method exploits the quadratic token reduction property of low-resolution sampling, achieving 10.3x end-to-end acceleration on FLUX.1-dev and Qwen-Image with less than 1% gap in OneIG metrics. The key innovation is that pixel-space super-resolution preserves global structure semantics from the low-resolution stage, while noise injection weakens potential artifacts introduced by super-resolution, allowing high-resolution flow prior to resample and correct details.",
        keyPoints: [
          "Low-resolution stage achieves ~4x per-step speedup and requires fewer sampling steps (12 vs 1 for high-res)",
          "Pixel-space GAN super-resolution (Real-ESRGAN) better preserves structure semantics than latent upsampling",
          "Noise injection with σ=0.1 enables effective high-frequency resampling for fast high-resolution refinement"
        ],
        href: "https://arxiv.org/abs/2607.01642",
        paperLink: "Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration via Staged Sampling",
      },
      {
        num: 2,
        tag: "World Model",
        title: "WorldDirector: Controllable World Simulators with Persistent Dynamic Memory",
        description: "WorldDirector addresses the limitation of existing world models that cannot maintain dynamic memory when objects leave the field of view, by explicitly decoupling semantic motion orchestration from visual generation. The method leverages an LLM to coordinate 3D trajectories with camera movements, projecting planning results into 2D bounding box sequences as location conditions for video generation. To ensure appearance consistency when objects re-enter the view, the paper proposes Appearance Binding mechanism that retrieves RGB features of dynamic objects from historical context as visual anchors. Combined with spatial-aware cross-attention (routing entity-specific text prompts to corresponding regions) and causal autoregressive architecture, WorldDirector strictly maintains dynamic object memory across long-horizon video generation.",
        keyPoints: [
          "LLM orchestrator converts user instructions into 3D bounding boxes and camera trajectories for explicit motion control",
          "Appearance Binding mechanism retrieves historical appearance features to ensure identity consistency upon re-entry",
          "Temporal Drop mechanism (dense sampling for initial 16 frames, sparse sampling every 6 frames thereafter) prevents over-reliance on appearance conditions"
        ],
        href: "https://arxiv.org/abs/2607.02517",
        paperLink: "WorldDirector: Building Controllable World Simulators with Persistent Dynamic Memory",
      },
      {
        num: 3,
        tag: "Model Quantization",
        title: "OrbitQuant: Data-Agnostic Quantization for DiTs down to W2A4",
        description: "OrbitQuant addresses the challenge that DiT activations drift across timesteps, prompts, and CFG branches, by proposing a calibration-free rotation-based quantization scheme. The method maps activations to a fixed marginal distribution via Randomized Permuted Block-Hadamard (RPBH) rotation, allowing a single Lloyd-Max codebook to quantize activations for all timesteps and layers. Weights absorb the rotation offline into a shared basis, requiring only a forward rotation on activations at inference. Experiments on FLUX.1, Z-Image-Turbo, Wan 2.1, and CogVideoX show OrbitQuant achieves SOTA at low-bit settings including W3A4, W3A3, and W2A4, with W2A4 being the only PTQ method producing usable images.",
        keyPoints: [
          "RPBH rotation concentrates activation coordinates around a fixed marginal, enabling single codebook for all timesteps and layers",
          "Weights absorb rotation offline, leaving only activation forward rotation at inference with minimal overhead",
          "Transfers directly from image to video DiTs without per-modality tuning"
        ],
        href: "https://arxiv.org/abs/2607.02461",
        paperLink: "OrbitQuant: Data-Agnostic Quantization for Image and Video Diffusion Transformers",
      },
      {
        num: 4,
        tag: "One-Step Generation",
        title: "iRDM: One-Step Visual Generation via Representation Distribution Matching",
        description: "iRDM systematically studies the design space of Representation Distribution Matching (RDM), identifying MMD estimation, generation batch size, and encoder combination as key design axes. The paper proposes using Nyström approximation (4096 landmarks) to build a frozen full-data reference distribution, paired with exact within-batch repulsion for MMD estimation; optimal generation batch size exceeds 2048, much larger than common practice; employs a balanced battery of 14 encoders with proportional Lagrangian controller for dynamic weight adjustment to prevent overfitting to single encoders. On ImageNet, iRDM achieves one-step generation SOTA at SW_r14 1.30; applied to FLUX.2 [klein] (4B parameter 4-step generator), post-training to one-step takes only 90 H200 GPU-hours, improving GenEval from 0.794 to 0.826 and PickScore from 22.58 to 22.76.",
        keyPoints: [
          "Nyström approximation (4096 landmarks) builds zero-variance full-data reference, outperforming per-batch resampled drifting field",
          "Optimal generation batch size >2048, enabled by gradient caching for large-batch training",
          "14-encoder balanced battery + proportional Lagrangian controller prevents overfitting to single representation"
        ],
        href: "https://arxiv.org/abs/2607.02375",
        paperLink: "Representation Distribution Matching for One-Step Visual Generation",
      },
      {
        num: 5,
        tag: "Hand Control",
        title: "HandsOnWorld: Camera-Disentangled Hand Control for Egocentric Video",
        description: "HandsOnWorld addresses two core challenges in hand-controlled egocentric video generation: scarce training data and camera-hand motion coupling. The paper proposes a protagonist-centered annotation pipeline to build EgoVid-Pro dataset (103K clips, ~12M frames) from Ego4D via monocular reconstruction, filtering at action-semantic, image-quality, and 3D-geometric levels. To address hand control ambiguity caused by ego-motion, the paper proposes Plücker Hand Map: extending Plücker-ray representation from camera rays to hand surface, representing hands in world coordinates to disentangle absolute 3D motion from camera ego-motion. Experiments show the method surpasses existing hand-controlled generators in reconstruction fidelity and control accuracy, generalizing to everyday scenes beyond laboratory datasets.",
        keyPoints: [
          "EgoVid-Pro dataset obtains 3D hand annotations from in-the-wild video via monocular reconstruction, matching scale of largest existing datasets with more diverse scenes",
          "Plücker Hand Map represents hands as rays in world coordinates, disentangling camera motion from hand motion",
          "Trained on Wan video diffusion models (5B/14B), supporting fine-grained hand interaction control in egocentric view"
        ],
        href: "https://arxiv.org/abs/2607.02075",
        paperLink: "HandsOnWorld: Unconstrained Egocentric Video Generation with Camera-Disentangled Hand Control",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Optimizing Visual Generative Models via Distribution-wise Rewards",
        tag: "RLHF",
        href: "https://arxiv.org/abs/2607.02291",
        description: "Proposes distribution-wise reward functions replacing sample-wise rewards, using subset-replace strategy for efficient reward estimation to mitigate mode collapse.",
      },
      {
        num: 7,
        title: "From SRA to Self-Flow: Data Augmentation or Self-Supervision?",
        tag: "Diffusion Training",
        href: "https://arxiv.org/abs/2607.02508",
        description: "Finds Self-Flow gains mainly come from data augmentation along noise dimension rather than dual-timestep interaction, proposes Attention Separation mechanism.",
      },
      {
        num: 8,
        title: "Ink3D: Sculpting 3D Assets with Complex Textures via Video Generative Models",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2607.01222",
        description: "Leverages video generative model priors for 3D texture synthesis, with OrbitPainter generating multi-view videos and TextureOptimizer integrating into consistent textures.",
      },
      {
        num: 9,
        title: "AnyGroundBench: Video Grounding Benchmark for Vision-Language Models",
        tag: "Benchmark",
        href: "https://arxiv.org/abs/2607.02269",
        description: "Video spatio-temporal grounding benchmark targeting specialized domains (animals, industry, sports), evaluating VLM domain adaptation capabilities.",
      },
    ],
    observation: "Today's papers reveal a clear technical trend: diffusion model inference efficiency optimization is shifting from single-dimension approaches (e.g., timestep distillation) to multi-dimensional collaborative optimization. MrFlow combines multi-resolution generation with pixel-space super-resolution, iRDM achieves one-step generation via representation distribution matching, and OrbitQuant pushes quantization to the W2A4 limit—all converging toward one goal: reducing diffusion model inference costs by an order of magnitude while maintaining generation quality. For music-to-dance tasks, the migration paths are clear: MrFlow's staged sampling can be directly applied to dance video generation, OrbitQuant's quantization scheme lowers edge deployment barriers, and iRDM's one-step generation concept opens possibilities for real-time interactive dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-04`,
        'en': `/en/daily/music-to-dance/2026-07-04`,
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
      date="2026-07-04"
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
