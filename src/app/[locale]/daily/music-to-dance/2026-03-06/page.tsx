import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "世界建模与细节保持：视频生成的新突破",
    overview: [
      "本周重点关注论文围绕视频生成的核心挑战：时序一致性、细节保持和推理效率",
      "DreamWorld提出联合世界建模范式，通过多源知识融合提升视频世界一致性",
      "HiFi-Inpaint的Shared Enhancement Attention机制为人物外观保持提供了新思路",
      "RealWonder实现13.2 FPS实时生成，其高效蒸馏方案对推理加速有直接借鉴价值"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成 / 世界模型",
        title: "DreamWorld：统一世界建模范式的视频生成框架",
        description: "DreamWorld提出了一种联合世界建模范式，通过同时预测视频像素和来自基础模型的特征（光流时序动态、VGGT空间几何、DINOv2语义理解）来构建统一的世界模型。核心创新Consistent Constraint Annealing (CCA)通过渐进退火机制调节多源异构知识注入，在训练初期强化世界知识约束，后期逐步放松以保真视觉质量，有效解决了多目标优化导致的视觉不稳定和时序闪烁问题。实验表明DreamWorld在VBench上比Wan2.1提升2.26分。对于music-to-dance任务，其CCA机制可直接应用于音频-视觉对齐的渐进式训练，而多源特征联合预测的思路可扩展为音频+姿态+外观的多条件生成框架。",
        keyPoints: [
          "联合世界建模范式：同时预测像素+多源特征（光流/VGGT/DINOv2）构建统一世界模型",
          "CCA渐进约束退火：训练初期强化世界知识约束，后期逐步放松以平衡物理合理性与视觉保真度",
          "Multi-Source Inner-Guidance推理机制：利用模型自身预测的知识特征引导生成过程"
        ],
        href: "https://arxiv.org/abs/2603.00466",
        paperLink: "DreamWorld: Unified World Modeling in Video Generation",
      },
      {
        num: 2,
        tag: "图像修复 / 细节保持",
        title: "HiFi-Inpaint：高保真参考图像修复框架",
        description: "HiFi-Inpaint针对人物-产品图像生成中的细节保持难题，提出了Shared Enhancement Attention (SEA)和Detail-Aware Loss (DAL)两大核心组件。SEA采用双流DiT块结构，在一个分支中执行标准视觉token处理，另一分支用高频图token替换产品token，通过共享注意力机制将高频细节信息注入主分支。DAL则利用高频像素级监督替代传统的MSE损失，强制模型重建细粒度纹理。实验显示该方法在保持人物姿态的同时能精确还原产品细节。对于music-to-dance任务，SEA的双流注意力机制可直接迁移到外观迁移模块，解决patch-shuffling可能导致的细节模糊问题；DAL的高频监督思路也可用于舞蹈视频的姿态细节优化。",
        keyPoints: [
          "Shared Enhancement Attention (SEA)：双流结构通过高频图token分支增强主分支的细节特征",
          "Detail-Aware Loss (DAL)：高频像素级监督替代MSE损失，强制重建细粒度纹理",
          "HP-Image-40K数据集：4万+自合成样本，经自动过滤确保高质量训练数据"
        ],
        href: "https://arxiv.org/abs/2603.02210",
        paperLink: "HiFi-Inpaint: Towards High-Fidelity Reference-Based Inpainting for Generating Detail-Preserving Human-Product Images",
      },
      {
        num: 3,
        tag: "实时生成 / 物理仿真",
        title: "RealWonder：实时物理动作条件视频生成",
        description: "RealWonder是首个支持3D物理动作（力、力场、机器人操作）条件输入的实时视频生成系统，在480×832分辨率下达到13.2 FPS。核心创新在于将物理仿真作为中间表示桥梁：将连续3D动作通过物理引擎转换为光流和RGB预览图，再输入蒸馏后的4步扩散视频生成器。这种架构巧妙避开了连续动作的token化难题，且无需昂贵的动作-视频配对数据。对于music-to-dance任务，RealWonder的流条件蒸馏方案（flow-conditioned distillation）可直接借鉴用于降低推理成本；其「物理仿真→中间表示→视频生成」的流水线思路也为音频节拍到舞蹈动作的映射提供了新范式——可将音频特征转换为运动学表示（如光流或姿态热力图）作为中间桥梁。",
        keyPoints: [
          "物理仿真作为中间表示：将3D动作转换为光流/RGB预览，避免连续动作token化难题",
          "4步蒸馏视频生成器：流条件扩散模型实现13.2 FPS实时生成",
          "单图3D重建+实时物理仿真：支持刚体、可变形体、流体和颗粒材料"
        ],
        href: "https://arxiv.org/abs/2603.05449",
        paperLink: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
      },
      {
        num: 4,
        tag: "注意力机制 / 局部特征",
        title: "LocAtViT：局部注意力增强的视觉Transformer",
        description: "LocAtViT针对ViT在密集预测任务中局部细节丢失的问题，提出了轻量级的局部注意力增强方案。核心组件Gaussian-Augmented (GAug) Attention使用可学习的高斯核调制注意力logits，使每个token倾向于关注邻近patch，同时保留全局交互能力；Patch Representation Refinement (PRR)则在分类头前对patch表示进行微调，解决ViT中空间token梯度流不畅的问题。实验显示在ADE20K上ViT-Tiny提升6%、ViT-Base提升4%，且不牺牲分类性能。对于music-to-dance任务，GAug的局部偏置注意力可直接替换3D Audio Attention中的标准自注意力，增强舞蹈姿态的局部连贯性；PRR的表示精炼思路也有助于改善时序建模中姿态token的质量。",
        keyPoints: [
          "Gaussian-Augmented Attention：可学习高斯核偏置注意力向邻近patch，保留全局交互",
          "Patch Representation Refinement：分类头前微调patch表示，改善密集预测梯度流",
          "即插即用：仅需边际架构改动，兼容自监督预训练和基础模型"
        ],
        href: "https://arxiv.org/abs/2603.04892",
        paperLink: "Locality-Attending Vision Transformer",
      },
      {
        num: 5,
        tag: "世界模型 / 对象中心表示",
        title: "LPWM：自监督对象中心随机动力学建模",
        description: "LPWM是首个可端到端训练于复杂真实世界视频的自监督对象中心世界模型。它从视频中自动发现关键点、边界框和对象掩码，通过新颖的latent action模块建模随机粒子动力学，支持动作、语言、图像目标等多种条件输入。与patch-based方法相比，对象中心表示更契合语言语义单元，有助于视觉-语言对齐。对于music-to-dance任务，LPWM的自监督关键点发现机制可用于自动提取舞蹈姿态关键点，减少人工标注依赖；其latent action模块为音频-动作对齐提供了连续隐变量建模思路——可将音频节拍编码为latent action来驱动姿态生成；多条件（动作+语言+图像）框架也为music-to-dance的多模态条件扩展提供了参考架构。",
        keyPoints: [
          "自监督对象发现：从视频自动学习关键点、边界框和掩码，无需标注",
          "Latent Action模块：连续隐变量建模随机动力学，支持可采样推理",
          "多条件灵活输入：支持动作、语言、图像目标、多视角等条件"
        ],
        href: "https://arxiv.org/abs/2603.04553",
        paperLink: "Latent Particle World Models: Self-supervised Object-centric Stochastic Dynamics Modeling",
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "OPSDC：推理压缩的自蒸馏方法",
        tag: "推理优化",
        href: "https://arxiv.org/abs/2603.05433",
        description: "通过自蒸馏实现57-59%的token压缩，同时提升9-16点准确率。思路可借鉴用于扩散模型推理加速。",
      },
      {
        num: 7,
        title: "MASQuant：多模态模型的模态感知量化",
        tag: "模型量化",
        href: "https://arxiv.org/abs/2603.04800",
        description: "CVPR 2026工作，提出模态特定的平滑因子解决跨模态量化不对齐问题，对音频-视觉多模态部署有参考价值。",
      },
      {
        num: 8,
        title: "CIRCLE：多模态模型的上下文分类",
        tag: "上下文学习",
        href: "https://arxiv.org/abs/2602.23229",
        description: "CVPR 2026 Findings，展示LMM通过少量上下文示例即可匹敌CLIP性能，对舞蹈生成的条件控制策略有启发。",
      },
      {
        num: 9,
        title: "AgentVista：超难真实视觉场景的多模态智能体评估",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2602.23166",
        description: "涵盖25个子领域的长程多模态工具使用基准，可为舞蹈视频的长程时序一致性评估提供参考框架。",
      },
      {
        num: 10,
        title: "SageBwd：可训练的低比特注意力",
        tag: "训练效率",
        href: "https://arxiv.org/abs/2603.02170",
        description: "INT8注意力训练方案，QK-norm保证大token训练稳定性，可用于降低3D Audio Attention的训练成本。",
      },
      {
        num: 11,
        title: "RoboPocket：手机端实时策略迭代",
        tag: "交互式数据收集",
        href: "https://arxiv.org/abs/2603.05504",
        description: "AR视觉预测反馈机制可借鉴用于舞蹈动作生成的可视化调试和人机交互优化。",
      }
    ],
    observation: "本周论文呈现出视频生成领域向「世界模型」转型的明显趋势：DreamWorld、RealWonder和LPWM分别从多源知识融合、物理仿真桥接和对象中心表示三个角度探索如何让生成模型「理解」而非仅仅「模仿」世界。对于music-to-dance任务，这意味着未来的舞蹈生成不应止步于外观迁移和节拍对齐，而应构建对「人体运动学」和「音乐-动作因果关系」的深层理解。特别值得关注的是RealWonder的「中间表示桥接」思路——将音频节拍转换为可解释的中间表示（如姿态热力图或运动光流）再输入生成器，可能比端到端学习更可控、更可解释。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "World Modeling and Detail Preservation: New Breakthroughs in Video Generation",
    overview: [
      "This week's highlighted papers address core challenges in video generation: temporal consistency, detail preservation, and inference efficiency",
      "DreamWorld proposes a joint world modeling paradigm that improves video world consistency through multi-source knowledge fusion",
      "HiFi-Inpaint's Shared Enhancement Attention mechanism offers new insights for person appearance preservation",
      "RealWonder achieves 13.2 FPS real-time generation, with efficient distillation schemes directly applicable for inference acceleration"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation / World Model",
        title: "DreamWorld: Unified World Modeling Paradigm for Video Generation",
        description: "DreamWorld proposes a joint world modeling paradigm that builds unified world models by jointly predicting video pixels and features from foundation models (optical flow for temporal dynamics, VGGT for spatial geometry, DINOv2 for semantic understanding). The core innovation, Consistent Constraint Annealing (CCA), uses a progressive annealing mechanism to regulate multi-source heterogeneous knowledge injection—strengthening world knowledge constraints early in training and gradually relaxing them later to preserve visual fidelity. This effectively resolves visual instability and temporal flickering caused by multi-objective optimization. Experiments show DreamWorld outperforms Wan2.1 by 2.26 points on VBench. For music-to-dance tasks, the CCA mechanism can be directly applied to progressive training of audio-visual alignment, while the multi-source feature joint prediction approach can be extended to a multi-conditional generation framework (audio + pose + appearance).",
        keyPoints: [
          "Joint World Modeling Paradigm: Simultaneously predicts pixels + multi-source features (optical flow/VGGT/DINOv2) to build unified world models",
          "CCA Progressive Constraint Annealing: Strengthens world knowledge constraints early, gradually relaxes to balance physical plausibility and visual fidelity",
          "Multi-Source Inner-Guidance: Leverages model's own predicted knowledge features to guide generation during inference"
        ],
        href: "https://arxiv.org/abs/2603.00466",
        paperLink: "DreamWorld: Unified World Modeling in Video Generation",
      },
      {
        num: 2,
        tag: "Image Inpainting / Detail Preservation",
        title: "HiFi-Inpaint: High-Fidelity Reference-Based Inpainting Framework",
        description: "HiFi-Inpaint addresses the challenge of detail preservation in human-product image generation through two core components: Shared Enhancement Attention (SEA) and Detail-Aware Loss (DAL). SEA employs a dual-stream DiT block structure—one branch processes standard visual tokens while another replaces product tokens with high-frequency map tokens, injecting high-frequency detail information into the main branch through shared attention. DAL replaces traditional MSE loss with high-frequency pixel-level supervision, forcing the model to reconstruct fine-grained textures. Experiments demonstrate precise product detail restoration while maintaining human pose. For music-to-dance tasks, SEA's dual-stream attention mechanism can be directly migrated to the appearance transfer module to address detail blurring from patch-shuffling; DAL's high-frequency supervision concept can also be applied to pose detail optimization in dance videos.",
        keyPoints: [
          "Shared Enhancement Attention (SEA): Dual-stream structure enhances main branch detail features through high-frequency map token branch",
          "Detail-Aware Loss (DAL): High-frequency pixel-level supervision replaces MSE loss to enforce fine-grained texture reconstruction",
          "HP-Image-40K Dataset: 40K+ self-synthesized samples with automatic filtering for high-quality training data"
        ],
        href: "https://arxiv.org/abs/2603.02210",
        paperLink: "HiFi-Inpaint: Towards High-Fidelity Reference-Based Inpainting for Generating Detail-Preserving Human-Product Images",
      },
      {
        num: 3,
        tag: "Real-time Generation / Physics Simulation",
        title: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
        description: "RealWonder is the first real-time video generation system supporting 3D physical action (forces, force fields, robot manipulation) conditioning, achieving 13.2 FPS at 480×832 resolution. The core innovation uses physics simulation as an intermediate representation bridge: continuous 3D actions are converted to optical flow and RGB preview maps through physics engines, then fed into a distilled 4-step diffusion video generator. This architecture elegantly avoids tokenization challenges for continuous actions and eliminates the need for expensive action-video paired data. For music-to-dance tasks, RealWonder's flow-conditioned distillation scheme can be directly adapted to reduce inference costs; its 'physics simulation → intermediate representation → video generation' pipeline also provides a new paradigm for mapping audio beats to dance movements—converting audio features to kinematic representations (like optical flow or pose heatmaps) as an intermediate bridge.",
        keyPoints: [
          "Physics Simulation as Intermediate Representation: Converts 3D actions to optical flow/RGB preview, avoiding continuous action tokenization",
          "4-Step Distilled Video Generator: Flow-conditioned diffusion model achieves 13.2 FPS real-time generation",
          "Single-Image 3D Reconstruction + Real-Time Physics: Supports rigid bodies, deformable objects, fluids, and granular materials"
        ],
        href: "https://arxiv.org/abs/2603.05449",
        paperLink: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
      },
      {
        num: 4,
        tag: "Attention Mechanism / Local Features",
        title: "LocAtViT: Locality-Attending Vision Transformer",
        description: "LocAtViT addresses local detail loss in ViTs for dense prediction tasks with a lightweight local attention enhancement scheme. The core Gaussian-Augmented (GAug) Attention modulates attention logits with a learnable Gaussian kernel, biasing each token toward neighboring patches while preserving global interaction capability; Patch Representation Refinement (PRR) fine-tunes patch representations before the classification head to address gradient flow issues for spatial tokens in ViTs. Experiments show 6% improvement on ADE20K for ViT-Tiny and 4% for ViT-Base without sacrificing classification performance. For music-to-dance tasks, GAug's locally-biased attention can directly replace standard self-attention in 3D Audio Attention to enhance local coherence of dance poses; PRR's representation refinement concept also helps improve pose token quality in temporal modeling.",
        keyPoints: [
          "Gaussian-Augmented Attention: Learnable Gaussian kernel biases attention toward neighboring patches while preserving global interaction",
          "Patch Representation Refinement: Fine-tunes patch representations before classification head to improve dense prediction gradient flow",
          "Plug-and-Play: Requires only marginal architectural changes, compatible with self-supervised pretraining and foundation models"
        ],
        href: "https://arxiv.org/abs/2603.04892",
        paperLink: "Locality-Attending Vision Transformer",
      },
      {
        num: 5,
        tag: "World Model / Object-Centric Representation",
        title: "LPWM: Self-Supervised Object-Centric Stochastic Dynamics Modeling",
        description: "LPWM is the first self-supervised object-centric world model capable of end-to-end training on complex real-world videos. It automatically discovers keypoints, bounding boxes, and object masks from videos, models stochastic particle dynamics through a novel latent action module, and supports multiple conditional inputs including actions, language, and image goals. Compared to patch-based methods, object-centric representations better align with language semantic units, facilitating vision-language alignment. For music-to-dance tasks, LPWM's self-supervised keypoint discovery mechanism can automatically extract dance pose keypoints, reducing reliance on manual annotation; its latent action module provides continuous latent variable modeling for audio-action alignment—encoding audio beats as latent actions to drive pose generation; the multi-conditional (action + language + image) framework also provides a reference architecture for extending music-to-dance to multi-modal conditioning.",
        keyPoints: [
          "Self-Supervised Object Discovery: Automatically learns keypoints, bounding boxes, and masks from video without annotation",
          "Latent Action Module: Continuous latent variables model stochastic dynamics, supporting sampleable inference",
          "Flexible Multi-Conditional Input: Supports actions, language, image goals, multi-view inputs"
        ],
        href: "https://arxiv.org/abs/2603.04553",
        paperLink: "Latent Particle World Models: Self-supervised Object-centric Stochastic Dynamics Modeling",
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "OPSDC: Self-Distillation for Reasoning Compression",
        tag: "Inference Optimization",
        href: "https://arxiv.org/abs/2603.05433",
        description: "Achieves 57-59% token compression through self-distillation while improving 9-16 points accuracy. Approach can be adapted for diffusion model inference acceleration.",
      },
      {
        num: 7,
        title: "MASQuant: Modality-Aware Smoothing Quantization for MLLMs",
        tag: "Model Quantization",
        href: "https://arxiv.org/abs/2603.04800",
        description: "CVPR 2026 work proposing modality-specific smoothing factors to solve cross-modal quantization misalignment, valuable for audio-visual multi-modal deployment.",
      },
      {
        num: 8,
        title: "CIRCLE: Large Multimodal Models as In-Context Classifiers",
        tag: "In-Context Learning",
        href: "https://arxiv.org/abs/2602.23229",
        description: "CVPR 2026 Findings showing LMMs can match CLIP performance with few in-context examples, inspiring conditional control strategies for dance generation.",
      },
      {
        num: 9,
        title: "AgentVista: Evaluating Multimodal Agents in Ultra-Challenging Visual Scenarios",
        tag: "Evaluation Benchmark",
        href: "https://arxiv.org/abs/2602.23166",
        description: "Long-horizon multi-modal tool use benchmark spanning 25 sub-domains, provides reference framework for long-term temporal consistency evaluation in dance videos.",
      },
      {
        num: 10,
        title: "SageBwd: Trainable Low-bit Attention",
        tag: "Training Efficiency",
        href: "https://arxiv.org/abs/2603.02170",
        description: "INT8 attention training scheme with QK-norm for stable large-token training, applicable for reducing 3D Audio Attention training costs.",
      },
      {
        num: 11,
        title: "RoboPocket: Instant Robot Policy Improvement with Phones",
        tag: "Interactive Data Collection",
        href: "https://arxiv.org/abs/2603.05504",
        description: "AR visual prediction feedback mechanism can inspire visual debugging and human-computer interaction optimization for dance motion generation.",
      }
    ],
    observation: "This week's papers reveal a clear trend toward 'world models' in video generation: DreamWorld, RealWonder, and LPWM explore how to make generative models 'understand' rather than merely 'imitate' the world through multi-source knowledge fusion, physics simulation bridging, and object-centric representations respectively. For music-to-dance tasks, this suggests future dance generation should go beyond appearance transfer and beat alignment to build deep understanding of 'human kinematics' and 'music-action causality'. Particularly noteworthy is RealWonder's 'intermediate representation bridging' approach—converting audio beats to interpretable intermediate representations (like pose heatmaps or motion optical flow) before feeding to the generator may be more controllable and interpretable than end-to-end learning.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-06`,
        'en': `/en/daily/music-to-dance/2026-03-06`,
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
      date="2026-03-06"
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