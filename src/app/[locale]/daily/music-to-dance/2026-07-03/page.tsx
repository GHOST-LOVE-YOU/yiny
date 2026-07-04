import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "扩散模型加速与可控生成：从推理优化到世界模拟",
    overview: [
      "MrFlow 实现无需训练的 10x 扩散加速，为实时 dance 生成提供可行路径",
      "WorldDirector 的持久动态记忆机制可解决长视频人物外观一致性问题",
      "HandsOnWorld 的 Plücker Hand Map 为相机-运动解耦提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "扩散加速",
        title: "MrFlow：无需训练的多分辨率流匹配加速",
        description: "MrFlow 提出分阶段低分辨率到高分辨率采样策略：先在低分辨率 latent 空间快速生成主体结构（12步），然后通过 Real-ESRGAN 在 pixel 空间进行超分辨率，再注入低强度噪声实现高频重采样，最后在高分辨率 latent 空间细化细节（1步）。该方法利用低分辨率采样的二次方 token 缩减和更少步数需求，在 FLUX.1-dev 和 Qwen-Image 上实现 10x 端到端加速，OneIG 差距仅 1%。关键创新在于 pixel 空间超分辨率保留结构、latent 空间噪声注入实现高频重采样，且可与 timestep distillation 正交结合达到 25x 加速。",
        keyPoints: [
          "低分辨率阶段每步执行时间加速约 4x，且所需采样步数更少（12步 vs 高分辨率的多步）",
          "Pixel 空间 GAN 超分辨率（Real-ESRGAN）比 latent 空间上采样更能保留结构、减少伪影",
          "可与预训练 timestep distillation 策略正交结合，实现 25x 以上加速"
        ],
        href: "https://arxiv.org/abs/2607.01642",
        paperLink: "Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration via Staged Sampling",
      },
      {
        num: 2,
        tag: "可控生成",
        title: "WorldDirector：持久动态记忆的可控世界模拟器",
        description: "WorldDirector 通过显式解耦语义运动编排与视觉生成，实现持久动态对象记忆。框架使用 LLM 作为中央编排器，将用户指令转换为 3D 边界框和相机轨迹，再投影为 2D 边界框序列作为视频生成的位置条件。核心创新包括：Appearance Binding 机制从历史上下文注入 RGB 动态对象特征作为视觉锚点，确保对象重新进入视野时视觉身份完全一致；Temporal Drop 机制在对象进入视野后的前 16 帧密集采样外观参考，之后每 6 帧稀疏采样，迫使模型基于轨迹和语义描述合成自然运动；空间感知交叉注意力机制将实体特定的文本提示路由到对应空间区域。",
        keyPoints: [
          "Appearance Binding 机制解决对象长时间出视野后重新进入时的身份一致性问题",
          "LLM 编排的 3D 轨迹控制与当前 Audio Attention 的时间对齐机制可互补",
          "因果自回归架构支持长时程视频生成，对长舞蹈序列生成有参考价值"
        ],
        href: "https://arxiv.org/abs/2607.02517",
        paperLink: "WorldDirector: Building Controllable World Simulators with Persistent Dynamic Memory",
      },
      {
        num: 3,
        tag: "运动控制",
        title: "HandsOnWorld：相机解耦的手部控制视频生成",
        description: "HandsOnWorld 提出 Plücker Hand Map 控制信号，将 Plücker 射线表示从相机光线扩展到手部表面，在表示层面解耦相机自我运动与手部运动。该方法首先通过单目重建在野外 egocentric 视频上标注 3D 手部，构建 EgoVid-Pro 数据集（103K clips，约 12M 帧）；然后使用 Plücker Hand Map 将手部表示在与相机相同的世界坐标系中，使绝对 3D 运动与相机相对运动分离。这种绝对放置决定了生成手部是否真正到达世界中的物体，实现更准确的控制和更物理合理的交互。",
        keyPoints: [
          "Plücker Hand Map 将相机 Plücker 射线与手部表面法线射线统一，在表示层面解耦相机与运动",
          "Protagonist-centered 标注流水线可从野外单目视频中提取干净的 3D 手部轨迹",
          "世界坐标系下的绝对 3D 运动表示可迁移到舞蹈生成中的身体姿态控制"
        ],
        href: "https://arxiv.org/abs/2607.02075",
        paperLink: "HandsOnWorld: Unconstrained Egocentric Video Generation with Camera-Disentangled Hand Control",
      },
      {
        num: 4,
        tag: "模型量化",
        title: "OrbitQuant：数据无关的扩散 Transformer 量化",
        description: "OrbitQuant 提出基于旋转的 PTQ 框架，通过随机置换块 Hadamard (RPBH) 旋转将激活映射到固定分布，使用单个 Lloyd-Max 码本量化所有时间步、提示和层的激活。该方法将旋转离线折叠到权重行中，使权重和激活在同一基中量化，每层仅需一次前向 RPBH 旋转。在 FLUX.1、Z-Image-Turbo、Wan 2.1 和 CogVideoX 上达到 SOTA PTQ 性能，在 W2A4 设置下仍能产生可用图像（此前方法在此设置下崩溃为噪声）。",
        keyPoints: [
          "数据无关量化无需为每个新检查点或模态重新收集校准数据",
          "RPBH 旋转使激活坐标集中在固定边际分布周围，可用统一码本量化",
          "W2A4 量化下仍保持可用生成质量，对部署 dance 生成模型到边缘设备有重要意义"
        ],
        href: "https://arxiv.org/abs/2607.02461",
        paperLink: "OrbitQuant: Data-Agnostic Quantization for Image and Video Diffusion Transformers",
      },
      {
        num: 5,
        tag: "单步生成",
        title: "iRDM：表示分布匹配实现单步视觉生成",
        description: "iRDM 通过匹配生成样本与参考特征分布训练单步生成器，无需在线教师、对抗者或轨迹模拟。关键发现：使用 Nyström 近似和精确批内排斥的 MMD 估计器在大 batch size（>2048）下表现最佳；单一编码器容易被过拟合，因此采用 14 个编码器的平衡组合，通过比例拉格朗日控制器动态调整权重。在 ImageNet 上达到单步 SOTA（SW_r14 1.30），并将 4 步 FLUX.2 [klein] 后训练为单步模型，在 GenEval 上超过 4 步版本（0.826 vs 0.794）。",
        keyPoints: [
          "Nyström MMD 估计器配合大 batch size（5120-10240）是单步训练的关键",
          "多编码器平衡策略防止生成器过拟合单一特征空间",
          "90 H200 GPU 小时即可将 4 步模型后训练为单步，质量反而提升"
        ],
        href: "https://arxiv.org/abs/2607.02375",
        paperLink: "Representation Distribution Matching for One-Step Visual Generation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "分布级奖励优化视觉生成模型",
        tag: "生成优化",
        href: "https://arxiv.org/abs/2607.02291",
        description: "提出分布级奖励函数替代样本级奖励，缓解奖励黑客导致的模式坍塌问题，FID-50K 从 8.30 降至 5.77（SiT）。",
      },
      {
        num: 7,
        title: "Ink3D：视频生成模型雕刻复杂纹理 3D 资产",
        tag: "纹理生成",
        href: "https://arxiv.org/abs/2607.01222",
        description: "利用大规模视频生成模型（OrbitPainter）合成复杂纹理，TextureOptimizer 神经烘焙模块整合多视角观测，可借鉴用于服装细节一致性。",
      },
      {
        num: 8,
        title: "LIME：从自我中心视频学习意图感知相机运动",
        tag: "相机控制",
        href: "https://arxiv.org/abs/2607.02417",
        description: "结合自回归观测增益输出与连续流匹配姿态头，从被动人类视频学习主动相机姿态选择，可用于舞蹈视频的动态相机视角生成。",
      },
      {
        num: 9,
        title: "The Moving Eye：混合动态数据增强 VLA 空间泛化",
        tag: "数据策略",
        href: "https://arxiv.org/abs/2607.02322",
        description: "连续相机运动与多样静态视点混合策略减少捷径学习，对 dance 数据集的多视角采集有参考价值。",
      },
    ],
    observation: "本周论文呈现出扩散模型推理加速的多元路径：MrFlow 从多分辨率采样角度实现 10x 加速，OrbitQuant 从量化角度压缩至 W2A4，iRDM 从蒸馏角度实现单步生成。三者可正交组合，理论上可将 dance 视频生成从当前的秒级推理压缩到实时水平。同时，WorldDirector 和 HandsOnWorld 在可控生成方面的进展——持久动态记忆与相机-运动解耦——为长舞蹈序列中的人物一致性和相机控制提供了可迁移的技术方案。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Diffusion Acceleration & Controllable Generation: From Inference Optimization to World Simulation",
    overview: [
      "MrFlow achieves 10x training-free diffusion acceleration, providing a viable path for real-time dance generation",
      "WorldDirector's persistent dynamic memory mechanism addresses character appearance consistency in long videos",
      "HandsOnWorld's Plücker Hand Map offers new insights for camera-motion disentanglement"
    ],
    papers: [
      {
        num: 1,
        tag: "Diffusion Acceleration",
        title: "MrFlow: Training-Free Multi-Resolution Flow Matching Acceleration",
        description: "MrFlow proposes a staged low-to-high-resolution sampling strategy: first rapidly generate main structure in low-resolution latent space (12 steps), then perform super-resolution in pixel space using Real-ESRGAN, inject low-strength noise for high-frequency resampling, and finally refine details in high-resolution latent space (1 step). By exploiting quadratic token reduction and fewer step requirements at low resolution, it achieves 10x end-to-end acceleration on FLUX.1-dev and Qwen-Image with only 1% OneIG gap. Key innovations include pixel-space super-resolution for structure preservation, latent-space noise injection for high-frequency resampling, and orthogonal combination with timestep distillation for 25x acceleration.",
        keyPoints: [
          "Low-resolution stage achieves ~4x per-step speedup and requires fewer sampling steps (12 vs multiple at high-res)",
          "Pixel-space GAN super-resolution (Real-ESRGAN) better preserves structure and reduces artifacts compared to latent upsampling",
          "Can be orthogonally combined with pre-trained timestep distillation strategies for 25x+ acceleration"
        ],
        href: "https://arxiv.org/abs/2607.01642",
        paperLink: "Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration via Staged Sampling",
      },
      {
        num: 2,
        tag: "Controllable Generation",
        title: "WorldDirector: Controllable World Simulators with Persistent Dynamic Memory",
        description: "WorldDirector explicitly decouples semantic motion orchestration from visual generation to achieve persistent dynamic object memory. The framework uses an LLM as a central orchestrator to translate user instructions into 3D bounding boxes and camera trajectories, projected into 2D bounding box sequences as location conditions for video generation. Core innovations include: Appearance Binding mechanism injects RGB dynamic object features from historical context as visual anchors to ensure identity consistency when objects re-enter; Temporal Drop mechanism densely samples appearance references for the first 16 frames after entry, then sparsely samples every 6 frames, forcing natural motion synthesis from trajectories; spatial-aware cross-attention routes entity-specific text prompts to corresponding spatial regions.",
        keyPoints: [
          "Appearance Binding mechanism solves identity consistency when objects re-enter after prolonged absence",
          "LLM-orchestrated 3D trajectory control complements current Audio Attention temporal alignment mechanisms",
          "Causal autoregressive architecture supports long-horizon video generation, relevant for long dance sequences"
        ],
        href: "https://arxiv.org/abs/2607.02517",
        paperLink: "WorldDirector: Building Controllable World Simulators with Persistent Dynamic Memory",
      },
      {
        num: 3,
        tag: "Motion Control",
        title: "HandsOnWorld: Camera-Disentangled Hand Control for Egocentric Video",
        description: "HandsOnWorld proposes the Plücker Hand Map control signal, extending Plücker-ray representations from camera rays to hand surfaces to disentangle camera ego-motion from hand motion at the representation level. The method first annotates 3D hands on in-the-wild egocentric video through monocular reconstruction, building the EgoVid-Pro dataset (103K clips, ~12M frames); then uses Plücker Hand Map to represent hands in the same world frame as the camera, separating absolute 3D motion from camera-relative motion. This absolute placement determines whether the generated hand actually reaches objects in the world, enabling more accurate control and physically plausible interactions.",
        keyPoints: [
          "Plücker Hand Map unifies camera Plücker rays with hand surface normal rays, disentangling camera and motion at representation level",
          "Protagonist-centered annotation pipeline extracts clean 3D hand trajectories from in-the-wild monocular video",
          "Absolute 3D motion representation in world coordinates can transfer to body pose control in dance generation"
        ],
        href: "https://arxiv.org/abs/2607.02075",
        paperLink: "HandsOnWorld: Unconstrained Egocentric Video Generation with Camera-Disentangled Hand Control",
      },
      {
        num: 4,
        tag: "Model Quantization",
        title: "OrbitQuant: Data-Agnostic Quantization for Diffusion Transformers",
        description: "OrbitQuant proposes a rotation-based PTQ framework that maps activations to a fixed distribution via Randomized Permuted Block-Hadamard (RPBH) rotation, using a single Lloyd-Max codebook to quantize activations across all timesteps, prompts, and layers. The rotation is folded into weight rows offline, quantizing weights and activations in a shared basis with only one forward RPBH rotation per layer at inference. Achieves SOTA PTQ performance on FLUX.1, Z-Image-Turbo, Wan 2.1, and CogVideoX, producing usable images at W2A4 where prior methods collapse to noise.",
        keyPoints: [
          "Data-agnostic quantization eliminates need to re-collect calibration data for each new checkpoint or modality",
          "RPBH rotation concentrates activation coordinates around a fixed marginal distribution, enabling unified codebook quantization",
          "Maintains usable generation quality at W2A4 quantization, significant for deploying dance generation models on edge devices"
        ],
        href: "https://arxiv.org/abs/2607.02461",
        paperLink: "OrbitQuant: Data-Agnostic Quantization for Image and Video Diffusion Transformers",
      },
      {
        num: 5,
        tag: "One-Step Generation",
        title: "iRDM: One-Step Visual Generation via Representation Distribution Matching",
        description: "iRDM trains one-step generators by matching generated and reference feature distributions without online teachers, adversaries, or trajectory simulation. Key findings: MMD estimator with Nyström approximation and exact within-batch repulsion works best at large batch sizes (>2048); single encoders can be gamed, so a balanced battery of 14 encoders is used with proportional Lagrangian controller for dynamic weighting. Achieves one-step SOTA on ImageNet (SW_r14 1.30) and post-trains 4-step FLUX.2 [klein] into a one-step model that surpasses the 4-step version on GenEval (0.826 vs 0.794).",
        keyPoints: [
          "Nyström MMD estimator with large batch sizes (5120-10240) is key to one-step training",
          "Multi-encoder balancing strategy prevents generator from overfitting to single feature space",
          "Post-training to one-step in 90 H200 GPU-hours with quality improvement over multi-step baseline"
        ],
        href: "https://arxiv.org/abs/2607.02375",
        paperLink: "Representation Distribution Matching for One-Step Visual Generation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Optimizing Visual Generative Models via Distribution-wise Rewards",
        tag: "Generation Optimization",
        href: "https://arxiv.org/abs/2607.02291",
        description: "Proposes distribution-wise reward functions replacing sample-wise rewards, mitigating mode collapse from reward hacking. FID-50K improves from 8.30 to 5.77 (SiT).",
      },
      {
        num: 7,
        title: "Ink3D: Sculpting 3D Assets with Complex Textures via Video Generative Models",
        tag: "Texture Generation",
        href: "https://arxiv.org/abs/2607.01222",
        description: "Leverages large-scale video generative models (OrbitPainter) for complex texture synthesis. TextureOptimizer neural baking module integrates multi-view observations, applicable to costume detail consistency.",
      },
      {
        num: 8,
        title: "LIME: Learning Intent-aware Camera Motion from Egocentric Video",
        tag: "Camera Control",
        href: "https://arxiv.org/abs/2607.02417",
        description: "Combines autoregressive observation-gain output with continuous flow-matching pose head, learning active camera pose selection from passive human video, applicable to dynamic camera viewpoint generation for dance videos.",
      },
      {
        num: 9,
        title: "The Moving Eye: Enhancing VLA Spatial Generalization via Hybrid Dynamic Data",
        tag: "Data Strategy",
        href: "https://arxiv.org/abs/2607.02322",
        description: "Hybrid strategy of continuous camera motion with diverse static viewpoints reduces shortcut learning, relevant for multi-view dance dataset collection.",
      },
    ],
    observation: "This week's papers demonstrate diverse paths for diffusion model inference acceleration: MrFlow achieves 10x speedup via multi-resolution sampling, OrbitQuant compresses to W2A4 via quantization, and iRDM achieves single-step generation via distillation. These approaches are orthogonal and could theoretically be combined to compress dance video generation from current second-level inference to real-time. Meanwhile, WorldDirector and HandsOnWorld's advances in controllable generation—persistent dynamic memory and camera-motion disentanglement—provide transferable technical solutions for character consistency and camera control in long dance sequences.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-03`,
        'en': `/en/daily/music-to-dance/2026-07-03`,
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
      date="2026-07-03"
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
