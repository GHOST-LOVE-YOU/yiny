import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "3D视觉错觉生成与视频空间控制：舞蹈生成的几何与纹理新工具",
    overview: [
      "跨空间双分支去噪实现3D视觉错觉快速生成",
      "稀疏3D框控制为舞蹈动作编排提供直观接口",
      "反馈感知流匹配提升条件生成的一致性与保真度"
    ],
    papers: [
      {
        num: 1,
        tag: "3D生成",
        title: "JanusMesh：跨空间双分支去噪实现零样本3D视觉错觉生成",
        description: "JanusMesh提出了一种快速且无需训练的框架，用于生成文本驱动的3D视觉错觉。该方法将生成过程解耦为两个阶段：首先，跨空间双分支去噪过程在每一步将3D潜码动态解码到体素空间，通过CLIP引导的方向对齐和SDF融合确保几何完整性；其次，视角条件纹理合成模块将视角特定的2D扩散先验投影并聚合到融合后的几何体上。该方法仅需3-5分钟即可生成高质量的双语义3D错觉，显著优于现有方法在几何完整性、语义可识别性和效率方面的表现。对于舞蹈视频生成，其跨空间去噪和视角条件纹理合成技术可直接迁移到人物视角一致性和外观保持问题。",
        keyPoints: [
          "跨空间双分支去噪：动态解码3D潜码到体素空间进行CLIP引导对齐和SDF融合",
          "视角条件纹理合成：将视角特定的2D扩散先验投影到融合几何体",
          "零样本生成：无需训练，3-5分钟内生成高质量双语义3D错觉"
        ],
        href: "https://arxiv.org/abs/2606.20563",
        paperLink: "JanusMesh: Fast and Zero-Shot 3D Visual Illusion Generation via Cross-Space Denoising",
      },
      {
        num: 2,
        tag: "视频世界模型",
        title: "Holo-World：统一的相机、物体与天气控制视频世界模型",
        description: "Holo-World提出了首个统一的相机、物体和天气控制视频世界模型。该方法从单张图像出发，遵循显式的相机和物体控制以及可选的天气指令，生成保持源世界或将其转移到目标天气状态的视频。核心贡献包括：统一场景适配器（UniSA）将世界保持和天气转移分解到不同的参数子空间；场景-天气分解CFG（SW-CFG）在采样时独立引导场景和天气残差。HoloStateData数据集将多样化视频转换为统一的控制样本，支持相机、物体和天气监督。对于舞蹈视频生成，其相机运动控制和物体动力学保持机制对舞蹈动作的空间编排具有重要借鉴价值。",
        keyPoints: [
          "统一场景适配器：将世界保持和天气转移分解到独立参数子空间",
          "场景-天气分解CFG：独立引导场景和天气残差，避免过度放大条件",
          "HoloStateData：首个支持相机、物体、天气联合控制的状态视频数据集"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
      {
        num: 3,
        tag: "视频控制",
        title: "LooseControlVideo：使用空间Blocking的导演级视频控制",
        description: "LooseControlVideo提出了一种使用稀疏定向3D框作为「blocking」代理的直观视频控制框架。该方法允许用户通过简单的3D建模工具或刚体物理模拟来创作高级布局和轨迹，而生成模型负责推断次级动态和真实变形。核心创新包括：DNOCS（深度调制归一化物体坐标空间）表示，联合编码局部方向和全局深度；在Wan 2.2骨干网络上进行微调，学习从稀疏意图信号到物理运动执行的映射。在nuScenes、HO-3D和BEHAVE基准上的评估显示，该方法在轨迹误差上实现1.2-3倍改进，在刚体运动一致性上实现2倍改进，在遮挡精度上实现1.5-2倍提升。对于舞蹈视频生成，这种稀疏3D框控制范式可直接应用于舞蹈动作的空间编排和轨迹控制。",
        keyPoints: [
          "DNOCS表示：联合编码3D尺寸、方向和深度排序遮挡的新颖编码方案",
          "空间Blocking范式：使用定向3D框解耦编排与局部变形",
          "自动化训练数据生成：从大规模野外视频数据集中提取时间跟踪的3D定向框"
        ],
        href: "https://arxiv.org/abs/2606.19495",
        paperLink: "LooseControlVideo: Directorial Video Control using Spatial Blocking",
      },
      {
        num: 4,
        tag: "流匹配",
        title: "FlowBender：反馈感知训练实现自校正条件流",
        description: "FlowBender提出了一种闭环框架，将条件扩散和流模型中的对齐误差作为一等输入，训练网络学习基于推理时反馈的校正策略。该方法在每个采样步骤执行两次前向传播：第一次无引导的前瞻传播估计干净信号，通过前向算子计算任务特定的偏差信号；第二次精炼传播消费该误差并生成校正后的速度。框架包含一阶梯度变体（用于可微算子）和零阶变体（用于非可微设置如JPEG压缩）。先验步骤快捷方式将推理成本降低到N+1次评估（N步采样）。在图像到图像翻译、恢复和3D网格纹理上的实验表明，FlowBender同时提升了保真度和合理性，克服了传统指导方法的权衡。对于舞蹈视频生成，该反馈感知机制可用于改进音频-动作对齐的精度和一致性。",
        keyPoints: [
          "闭环自校正：将模型自身的对齐误差作为一等输入进行训练",
          "双传播策略：前瞻传播估计偏差，精炼传播生成校正",
          "零阶变体：扩展学习校正到非可微或黑盒算子场景"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "世界模型状态持久性诊断基准",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.20545",
        description: "WRBench首次系统诊断世界模型的状态持久性，发现当前系统在相机离开后无法正确推进世界状态演化。对长视频生成的时序一致性研究有参考价值。",
      },
      {
        num: 6,
        title: "异步去噪调度优化",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2606.19662",
        description: "Learning When to Denoise提出学习多表示扩散模型的异步去噪调度，在ImageNet 256x256上实现FID 1.02，训练成本降低4倍。可加速舞蹈视频生成模型训练。",
      },
      {
        num: 7,
        title: "轻量级图像修复框架Moebius",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2606.19195",
        description: "Moebius以0.22B参数实现10B级性能，提出Local-λ Mix Interaction块和自适应多粒度蒸馏策略。高效设计思路可迁移到舞蹈视频生成模型的轻量化部署。",
      },
      {
        num: 8,
        title: "判别器引导的流匹配修正",
        tag: "流匹配",
        href: "https://arxiv.org/abs/2606.19162",
        description: "DRL训练判别器在预训练表示空间中区分数据与模型样本，使用其对数几率作为奖励进行KL正则化RL。可提升舞蹈动作生成的一致性。",
      },
      {
        num: 9,
        title: "风格-内容双参考生成FreeStyle",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2606.20506",
        description: "FreeStyle基于社区LoRA挖掘实现风格-内容双参考生成，采用两阶段课程学习解决内容泄漏问题。可用于舞蹈视频中人物外观风格迁移。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "3D Visual Illusion Generation & Video Spatial Control: New Geometric and Textural Tools for Dance Generation",
    overview: [
      "Cross-space dual-branch denoising enables fast 3D visual illusion generation",
      "Sparse 3D box control provides intuitive interface for dance motion choreography",
      "Feedback-aware flow matching improves conditional generation consistency and fidelity"
    ],
    papers: [
      {
        num: 1,
        tag: "3D Generation",
        title: "JanusMesh: Zero-Shot 3D Visual Illusion via Cross-Space Dual-Branch Denoising",
        description: "JanusMesh presents a fast, training-free framework for text-driven 3D visual illusion generation. The method decouples generation into two stages: first, a cross-space dual-branch denoising process dynamically decodes 3D latents into voxel space at each step, performing CLIP-guided orientation alignment and SDF blending to ensure geometric integrity; second, a view-conditioned texture synthesis module projects and aggregates view-specific 2D diffusion priors onto the fused geometry. The method generates high-quality dual-semantic 3D illusions in just 3-5 minutes, significantly outperforming existing approaches in geometric integrity, semantic recognizability, and efficiency. For dance video generation, its cross-space denoising and view-conditioned texture synthesis techniques can be directly transferred to address viewpoint consistency and appearance preservation challenges.",
        keyPoints: [
          "Cross-space dual-branch denoising: Dynamic latent decoding to voxel space for CLIP-guided alignment and SDF blending",
          "View-conditioned texture synthesis: Projects view-specific 2D diffusion priors onto fused geometry",
          "Zero-shot generation: No training required, generates high-quality dual-semantic 3D illusions in 3-5 minutes"
        ],
        href: "https://arxiv.org/abs/2606.20563",
        paperLink: "JanusMesh: Fast and Zero-Shot 3D Visual Illusion Generation via Cross-Space Denoising",
      },
      {
        num: 2,
        tag: "Video World Model",
        title: "Holo-World: Unified Camera, Object and Weather Control",
        description: "Holo-World introduces the first unified video world model for joint camera, object, and weather control. Starting from a single image, the model follows explicit camera and object controls plus optional weather instructions to generate videos that either preserve the source world or transfer it to a target weather state. Key contributions include: Unified Scene Adapter (UniSA) that factorizes world preservation and weather transfer into distinct parameter subspaces; Scene-Weather Decomposed CFG (SW-CFG) that independently guides scene and weather residuals during sampling. The HoloStateData dataset converts diverse videos into unified control samples supporting camera, object, and weather supervision. For dance video generation, its camera motion control and object dynamics preservation mechanisms offer valuable insights for spatial choreography of dance movements.",
        keyPoints: [
          "Unified Scene Adapter: Factorizes world preservation and weather transfer into independent parameter subspaces",
          "Scene-Weather Decomposed CFG: Independently guides scene and weather residuals to avoid over-amplifying conditions",
          "HoloStateData: First state video dataset supporting joint control of camera, object, and weather"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
      {
        num: 3,
        tag: "Video Control",
        title: "LooseControlVideo: Directorial Control via Spatial Blocking",
        description: "LooseControlVideo proposes an intuitive video control framework using sparse oriented 3D boxes as a blocking proxy. Users can author high-level layouts and trajectories through simple 3D modeling tools or rigid-body physics simulations, while the generative model infers secondary dynamics and realistic deformations. Core innovations include: DNOCS (Depth-modulated Normalized Object Coordinate Space) representation that jointly encodes local orientation and global depth; fine-tuning on Wan 2.2 backbone to learn mapping from sparse intent signals to physical motion execution. Evaluations on nuScenes, HO-3D, and BEHAVE benchmarks show 1.2-3× improvement in Trajectory Error, 2× improvement in Rigid Motion Consistency, and 1.5-2× increase in Occlusion Accuracy. For dance video generation, this sparse 3D box control paradigm can be directly applied to spatial choreography and trajectory control of dance movements.",
        keyPoints: [
          "DNOCS representation: Novel encoding jointly representing 3D size, orientation, and depth-ordered occlusions",
          "Spatial blocking paradigm: Decouples choreography from local deformation using oriented 3D boxes",
          "Automated training data generation: Extracts temporally-tracked 3D oriented boxes from large-scale in-the-wild video datasets"
        ],
        href: "https://arxiv.org/abs/2606.19495",
        paperLink: "LooseControlVideo: Directorial Video Control using Spatial Blocking",
      },
      {
        num: 4,
        tag: "Flow Matching",
        title: "FlowBender: Feedback-Aware Training for Self-Correcting Flows",
        description: "FlowBender introduces a closed-loop framework that treats alignment errors in conditional diffusion and flow models as first-class inputs, training networks to learn correction policies based on inference-time feedback. The method performs two forward passes at each sampling step: first, an unguided look-ahead pass estimates the clean signal and computes task-specific deviation via the forward operator; second, a refinement pass consumes this error and generates corrected velocity. The framework includes first-order gradient variants (for differentiable operators) and zero-order variants (for non-differentiable settings like JPEG compression). A prior-step shortcut reduces inference cost to N+1 evaluations for N-step sampling. Experiments on image-to-image translation, restoration, and 3D mesh texturing show FlowBender simultaneously improves fidelity and plausibility, overcoming the trade-offs of traditional guidance methods. For dance video generation, this feedback-aware mechanism can improve the precision and consistency of audio-motion alignment.",
        keyPoints: [
          "Closed-loop self-correction: Trains with model's own alignment error as first-class input",
          "Dual-pass strategy: Look-ahead pass estimates deviation, refinement pass generates correction",
          "Zero-order variant: Extends learned correction to non-differentiable or black-box operator scenarios"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "World Model State Persistence Diagnostic Benchmark",
        tag: "World Model",
        href: "https://arxiv.org/abs/2606.20545",
        description: "WRBench systematically diagnoses world model state persistence for the first time, finding current systems cannot correctly evolve world state after camera leaves. Valuable reference for temporal consistency research in long video generation.",
      },
      {
        num: 6,
        title: "Asynchronous Denoising Schedule Optimization",
        tag: "Diffusion Model",
        href: "https://arxiv.org/abs/2606.19662",
        description: "Learning When to Denoise proposes learning asynchronous denoising schedules for multi-representation diffusion models, achieving FID 1.02 on ImageNet 256x256 with 4× reduced training cost. Can accelerate dance video generation model training.",
      },
      {
        num: 7,
        title: "Lightweight Image Inpainting Framework Moebius",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2606.19195",
        description: "Moebius achieves 10B-level performance with 0.22B parameters, proposing Local-λ Mix Interaction blocks and adaptive multi-granularity distillation. Efficient design ideas can be transferred to lightweight deployment of dance video generation models.",
      },
      {
        num: 8,
        title: "Discriminator-Guided Flow Matching Correction",
        tag: "Flow Matching",
        href: "https://arxiv.org/abs/2606.19162",
        description: "DRL trains a discriminator to distinguish data from model samples in pretrained representation space, using its logit as reward for KL-regularized RL. Can improve consistency of dance motion generation.",
      },
      {
        num: 9,
        title: "Style-Content Dual-Reference Generation FreeStyle",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2606.20506",
        description: "FreeStyle achieves style-content dual-reference generation based on community LoRA mining, using two-stage curriculum learning to solve content leakage. Can be used for character appearance style transfer in dance videos.",
      },
    ],
    observation: "",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-19`,
        'en': `/en/daily/music-to-dance/2026-06-19`,
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
      date="2026-06-19"
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
