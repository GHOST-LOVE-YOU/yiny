import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "世界模型与实时生成：视频一致性与效率的新进展",
    overview: [
      "DreamWorld提出联合世界建模范式，通过CCA渐进约束退火机制整合时序动态、空间几何与语义一致性，为舞蹈视频的长时序一致性提供新思路",
      "RealWonder首次实现13.2 FPS的实时物理动作条件视频生成，4步蒸馏扩散模型为实时舞蹈生成提供加速方案",
      "HiFi-Inpaint的Shared Enhancement Attention机制可迁移至人物外观保持任务，解决patch-shuffling中的细节丢失问题"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型",
        title: "DreamWorld：多源知识联合建模提升视频时序一致性",
        description: "DreamWorld提出Joint World Modeling Paradigm，首次将光流时序动态、VGGT空间几何和DINOv2语义理解三种异构知识统一整合到视频生成中。核心创新Consistent Constraint Annealing (CCA)通过渐进式约束退火机制，在训练初期强化世界知识约束，后期逐步退火以保证视觉质量，有效解决了多目标优化冲突导致的时序抖动问题。Multi-Source Inner-Guidance机制在推理阶段利用模型自身预测的知识特征引导生成，确保输出符合物理规律。在VBench上比Wan2.1提升2.26分，其联合建模思路可直接应用于舞蹈视频的音频-运动对齐，解决当前3D Audio Attention机制中的时序不一致问题。",
        keyPoints: [
          "CCA渐进约束退火：训练初期λ=0.8强化知识约束，后期退火至λ=0.2，平衡世界建模与视觉保真度",
          "多源特征整合：光流(temporal)+VGGT(spatial)+DINOv2(semantic)拼接为Z_world，与噪声潜变量联合建模",
          "对舞蹈生成的启发：当前音频-运动对齐缺乏显式的时序一致性约束，可借鉴CCA机制设计Audio Constraint Annealing"
        ],
        href: "https://arxiv.org/abs/2603.00466",
        paperLink: "DreamWorld: Unified World Modeling in Video Generation",
      },
      {
        num: 2,
        tag: "实时生成",
        title: "RealWonder：4步扩散实现13.2 FPS物理动作条件视频生成",
        description: "RealWonder首次实现实时物理动作条件视频生成，核心创新在于将物理模拟作为中间表示桥梁，而非直接token化连续动作。系统通过3D重建→物理模拟→光流/RGB渲染的三阶段流水线，将3D力场、机器人动作等连续输入转换为视频模型可处理的光流条件。视频生成器采用Distribution Matching Distillation蒸馏为4步因果生成器，在480×832分辨率下达到13.2 FPS。关键技术包括：光流条件LoRA后训练、双向固定时长蒸馏策略、以及自回归长视频生成机制。对舞蹈生成的直接价值在于：音频节拍可类比为力场输入，通过类似的中间表示（如节拍-光流映射）实现实时舞蹈视频合成。",
        keyPoints: [
          "物理模拟作为中间表示：将连续3D动作→物理模拟→光流/RGB，避免动作token化难题",
          "4步实时蒸馏：基于DMD的流条件视频蒸馏，M步教师模型蒸馏为N步学生模型(M≫N)",
          "对舞蹈生成的启发：音频节拍可映射为类似光流的时序条件，实现实时音频驱动舞蹈生成"
        ],
        href: "https://arxiv.org/abs/2603.05449",
        paperLink: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
      },
      {
        num: 3,
        tag: "外观保持",
        title: "HiFi-Inpaint：高频引导的参考图像细节保持机制",
        description: "HiFi-Inpaint针对参考图像细节保持问题，提出Shared Enhancement Attention (SEA)和Detail-Aware Loss (DAL)两大核心组件。SEA在双路DiT块中引入高频图token分支，通过可学习权重α_i增强产品细节特征，相比固定权重显著减少视觉伪影。DAL利用离散傅里叶变换(DFT)提取高频图，在像素级提供精确的细粒度监督，弥补潜空间MSE损失的不足。HP-Image-40K数据集的构建流程（FLUX合成→Sobel分割→CLIP语义过滤→InternVL文本过滤）也为舞蹈视频训练数据合成提供参考。对当前舞蹈生成方案的直接启发是：patch-shuffling外观迁移策略可引入类似的SEA机制，通过高频图增强参考人物的外观细节保持。",
        keyPoints: [
          "SEA双路注意力：共享参数的双流DiT块，高频分支通过可学习α_i加权增强细节",
          "DAL高频监督：DFT提取高频图，像素级L1损失补充潜空间MSE的不足",
          "对舞蹈生成的启发：patch-shuffling可引入高频图引导，提升参考人物外观迁移的细节保真度"
        ],
        href: "https://arxiv.org/abs/2603.02210",
        paperLink: "HiFi-Inpaint: Towards High-Fidelity Reference-Based Inpainting for Generating Detail-Preserving Human-Product Images",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "LPWM：自监督关键点发现与世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2603.04553",
        description: "自监督发现关键点、边界框和物体掩码，可用于舞蹈姿态关键点提取，替代显式姿态估计。",
      },
      {
        num: 5,
        title: "LocAtViT：局部注意力增强的视觉Transformer",
        tag: "注意力机制",
        href: "https://arxiv.org/abs/2603.04892",
        description: "可学习高斯核调制自注意力偏向邻近patch，可增强3D Audio Attention对局部音频特征的捕捉。",
      },
      {
        num: 6,
        title: "MASQuant：多模态感知平滑量化",
        tag: "模型量化",
        href: "https://arxiv.org/abs/2603.04800",
        description: "跨模态补偿机制解决音频-视觉联合模型的推理加速问题，降低多模态融合计算开销。",
      },
    ],
    observation: "本周论文呈现两个明确趋势：一是世界模型从单一知识对齐转向多源异构知识联合建模（DreamWorld），二是视频生成从追求质量转向实时交互（RealWonder）。对Music-to-Dance任务而言，这意味着下一代方案需要同时解决「时序一致性」和「实时性」两大挑战。一个值得探索的方向是将RealWonder的物理模拟中间表示思路迁移到音频领域：将音频节拍编码为类似光流的时序条件，结合DreamWorld的CCA机制实现渐进式音频-运动对齐约束，最终达到实时舞蹈视频生成。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "World Models & Real-Time Generation: New Advances in Video Consistency and Efficiency",
    overview: [
      "DreamWorld proposes Joint World Modeling Paradigm with CCA annealing to integrate temporal dynamics, spatial geometry and semantic consistency",
      "RealWonder achieves 13.2 FPS real-time physical action-conditioned generation with 4-step distilled diffusion",
      "HiFi-Inpaint's SEA mechanism can migrate to person appearance preservation tasks to solve detail loss in patch-shuffling"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model",
        title: "DreamWorld: Multi-Source Knowledge Joint Modeling for Video Temporal Consistency",
        description: "DreamWorld introduces the Joint World Modeling Paradigm, unifying optical flow temporal dynamics, VGGT spatial geometry, and DINOv2 semantic understanding into video generation for the first time. The core innovation, Consistent Constraint Annealing (CCA), uses progressive constraint annealing—strong world knowledge constraints early in training (λ=0.8) gradually annealing to λ=0.2—to balance world modeling with visual fidelity, effectively solving temporal flickering caused by multi-objective optimization conflicts. The Multi-Source Inner-Guidance mechanism leverages the model's own predicted knowledge features during inference to ensure physically plausible outputs. Achieving 2.26 points improvement over Wan2.1 on VBench, its joint modeling approach can be directly applied to audio-motion alignment in dance video generation, addressing temporal inconsistency issues in current 3D Audio Attention mechanisms.",
        keyPoints: [
          "CCA annealing: λ=0.8→0.2 progressive schedule balances world modeling constraints with visual fidelity",
          "Multi-source features: Flow(temporal)+VGGT(spatial)+DINOv2(semantic) concatenated as Z_world for joint modeling",
          "Insight for dance: Current audio-motion alignment lacks explicit temporal consistency constraints; CCA-inspired Audio Constraint Annealing is worth exploring"
        ],
        href: "https://arxiv.org/abs/2603.00466",
        paperLink: "DreamWorld: Unified World Modeling in Video Generation",
      },
      {
        num: 2,
        tag: "Real-Time",
        title: "RealWonder: 4-Step Diffusion Achieves 13.2 FPS Physical Action-Conditioned Generation",
        description: "RealWonder presents the first real-time physical action-conditioned video generation system. The key insight uses physics simulation as an intermediate representation bridge rather than directly tokenizing continuous actions. The three-stage pipeline (3D reconstruction → physics simulation → flow/RGB rendering) converts 3D force fields and robot actions into optical flow conditions processable by video models. The generator is distilled via Distribution Matching Distillation into a 4-step causal generator, achieving 13.2 FPS at 480×832 resolution. Key techniques include flow-conditioned LoRA post-training, bidirectional fixed-duration distillation, and autoregressive long video generation. The direct value for dance generation: audio beats can be analogized to force field inputs, enabling real-time dance video synthesis through similar intermediate representations (e.g., beat-to-flow mapping).",
        keyPoints: [
          "Physics as intermediate representation: Continuous 3D actions → physics sim → flow/RGB, avoiding action tokenization",
          "4-step real-time distillation: DMD-based flow-conditioned distillation from M-step teacher to N-step student (M≫N)",
          "Insight for dance: Audio beats can be mapped to temporal conditions similar to optical flow, enabling real-time audio-driven dance generation"
        ],
        href: "https://arxiv.org/abs/2603.05449",
        paperLink: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
      },
      {
        num: 3,
        tag: "Appearance Preservation",
        title: "HiFi-Inpaint: High-Frequency Guided Reference Image Detail Preservation",
        description: "HiFi-Inpaint addresses reference image detail preservation through Shared Enhancement Attention (SEA) and Detail-Aware Loss (DAL). SEA introduces a high-frequency map token branch in dual-stream DiT blocks, enhancing product details via learnable weight α_i, significantly reducing visual artifacts compared to fixed weights. DAL uses Discrete Fourier Transform (DFT) to extract high-frequency maps, providing precise pixel-level supervision to complement latent-space MSE limitations. The HP-Image-40K dataset construction pipeline (FLUX synthesis → Sobel segmentation → CLIP filtering → InternVL text filtering) also provides reference for dance video training data synthesis. The direct insight for current dance generation: patch-shuffling appearance migration strategies can incorporate similar SEA mechanisms to enhance reference person detail preservation through high-frequency map guidance.",
        keyPoints: [
          "SEA dual-stream attention: Shared-parameter dual DiT blocks with high-frequency branch weighted by learnable α_i",
          "DAL high-frequency supervision: DFT-extracted high-frequency maps with pixel-level L1 loss complementing latent MSE",
          "Insight for dance: Patch-shuffling can introduce high-frequency map guidance to improve reference person appearance migration fidelity"
        ],
        href: "https://arxiv.org/abs/2603.02210",
        paperLink: "HiFi-Inpaint: Towards High-Fidelity Reference-Based Inpainting for Generating Detail-Preserving Human-Product Images",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "LPWM: Self-Supervised Keypoint Discovery and World Models",
        tag: "World Model",
        href: "https://arxiv.org/abs/2603.04553",
        description: "Self-supervised discovery of keypoints, bounding boxes and object masks from video, applicable to dance pose keypoint extraction replacing explicit pose estimation.",
      },
      {
        num: 5,
        title: "LocAtViT: Locality-Attending Vision Transformer",
        tag: "Attention",
        href: "https://arxiv.org/abs/2603.04892",
        description: "Learnable Gaussian kernel modulates self-attention toward neighboring patches, can enhance 3D Audio Attention's local audio feature capture.",
      },
      {
        num: 6,
        title: "MASQuant: Modality-Aware Smoothing Quantization",
        tag: "Quantization",
        href: "https://arxiv.org/abs/2603.04800",
        description: "Cross-modal compensation mechanism addresses inference acceleration for audio-visual joint models, reducing multimodal fusion computational overhead.",
      },
    ],
    observation: "This week's papers reveal two clear trends: world models shifting from single-knowledge alignment to multi-source heterogeneous knowledge joint modeling (DreamWorld), and video generation moving from quality pursuit to real-time interaction (RealWonder). For Music-to-Dance tasks, this implies next-generation solutions must address both 'temporal consistency' and 'real-time' challenges. A promising direction is migrating RealWonder's physics-simulation-as-intermediate-representation concept to the audio domain: encoding audio beats as temporal conditions similar to optical flow, combining with DreamWorld's CCA mechanism for progressive audio-motion alignment constraints, ultimately achieving real-time dance video generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-08`,
        'en': `/en/daily/music-to-dance/2026-03-08`,
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
      date="2026-03-08"
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
