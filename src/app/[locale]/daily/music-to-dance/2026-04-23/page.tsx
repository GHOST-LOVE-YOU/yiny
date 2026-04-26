import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "2026-04-23 | 统一多模态扩散模型与人体视频生成新范式",
    overview: [
      "LLaDA2.0-Uni 提出统一的多模态扩散框架，其 SigLIP-VQ 语义 tokenizer 和 block-level masked diffusion 技术为音频-视觉联合生成提供新思路",
      "ReImagine 采用 Image-First 策略解耦外观建模与时序一致性，其 SMPL-X 运动引导 + 无训练时序精炼流程可直接应用于舞蹈视频生成",
      "Sapiens2 在 308 关键点姿态估计和人体部位分割上达到 SOTA，可作为舞蹈生成的高质量预处理模块"
    ],
    papers: [
      {
        num: 1,
        tag: "多模态统一",
        title: "LLaDA2.0-Uni：统一多模态理解与生成的离散扩散大模型",
        description: "LLaDA2.0-Uni 是一个原生集成的统一多模态模型，采用完全语义的离散 tokenizer (SigLIP-VQ) 将连续视觉输入离散化，使文本和图像能够在共享的 block-level masked diffusion 目标下进行联合优化。其核心创新在于：1) SigLIP-VQ 直接在理解任务上训练，保留丰富语义信息，优于传统的重建式 VQ-VAE；2) 16B MoE 扩散语言模型主干支持文本和视觉 token 的统一处理；3) 专用扩散解码器通过 8 步蒸馏实现高保真图像重建。该框架支持交错式生成与推理（interleaved generation and reasoning），在图像生成、编辑和多模态理解任务上均达到 SOTA 性能。对于 music-to-dance 任务，其统一的离散表示和跨模态 block diffusion 机制为音频-视觉联合建模提供了可直接迁移的技术路径，特别是其 prefix-aware 优化和少步蒸馏技术可显著提升推理效率。",
        keyPoints: [
          "SigLIP-VQ 语义 tokenizer：在理解任务上训练，codebook 大小 16,384，支持动态分辨率处理，优于重建式 VQ 的语义提取能力",
          "统一 block-wise masked diffusion：文本和视觉 token 在共享目标下优化，支持交错式生成与推理",
          "8 步扩散解码器：通过一致性蒸馏实现 CFG-free 推理，在保持图像质量的同时大幅降低计算成本"
        ],
        href: "https://arxiv.org/abs/2604.20796",
        paperLink: "LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion Large Language Model",
      },
      {
        num: 2,
        tag: "虚拟试穿",
        title: "Tstars-Tryon 1.0：大规模商业级虚拟试穿系统",
        description: "Tstars-Tryon 1.0 是阿里巴巴推出的商业级虚拟试穿系统，已部署于淘宝 App 服务数百万用户。该系统在极端姿态、严重光照变化、运动模糊等复杂场景下保持高成功率，同时实现高保真细节重建和近实时推理（单件 3.92 秒，多件 6.74 秒）。其技术亮点包括：1) 统一 MMDiT 架构支持多达 6 张参考图像的灵活组合；2) 多阶段训练范式（预训练 → 渐进分辨率连续训练 → 高质量 SFT → 强化学习）确保生成质量；3) 多维度奖励函数（身份一致性、服装保真度、背景保持、物理结构逻辑）优化生成结果。对于 music-to-dance 任务，其多参考图组合、身份保持和姿态控制技术可直接迁移，特别是其服装细节保持和物理合理性约束对舞蹈视频的人物外观一致性具有重要参考价值。",
        keyPoints: [
          "统一 MMDiT 架构：同时处理和协调多张参考图像，支持 8 类时尚单品的灵活组合",
          "多阶段训练策略：任务平衡与内容平衡数据集、渐进分辨率训练、DiffusionNFT 强化学习优化",
          "近实时推理：5B DiT 模型结合 CFG 蒸馏和步数蒸馏，单件/多件试穿分别仅需 3.92s/6.74s"
        ],
        href: "https://arxiv.org/abs/2604.19748",
        paperLink: "Tstars-Tryon 1.0: Robust and Realistic Virtual Try-On for Diverse Fashion Items",
      },
      {
        num: 3,
        tag: "人体视频生成",
        title: "ReImagine：Image-First 可控高质量人体视频生成",
        description: "ReImagine 提出从图像优先视角解决人体视频生成的挑战，将外观建模与时序一致性解耦。该方法首先通过微调 FLUX Kontext 实现姿态和视角可控的图像合成（使用 SMPL-X 法线图作为条件），然后采用预训练视频扩散模型 (Wan 2.1) 进行无训练的时序精炼。核心创新包括：1) 图像优先策略：利用强大的预训练图像生成先验，即使在有限的多视角数据下也能学习几何条件；2) 条件感知位置编码：通过 (x, y, condition_type) 三元组区分姿态、前视图、后视图和噪声 token；3) 无训练时序一致性：低噪声重去噪结合 3D FFT 时空正则化，在推理时抑制帧间伪影。实验表明，该方法在 MVHumanNet++ 和 DNA-Rendering 数据集上的 FID 和 FVD 指标均优于 Wan-Animate、Human4DiT 等基线。对于 music-to-dance 任务，其 Image-First 范式为解耦外观学习和时序建模提供了可行路径，SMPL-X 运动引导可替换为音频驱动的运动表示。",
        keyPoints: [
          "Image-First 解耦策略：外观建模通过图像生成学习，时序一致性通过预训练视频模型精炼，避免联合训练的数据瓶颈",
          "SMPL-X 条件编码：渲染法线图作为 ControlNet 条件，MLP 嵌入姿态参数提供全局几何先验",
          "无训练时序精炼：低噪声重去噪 + 3D FFT 时空低通滤波（τ_t=0.06, τ_s=0.12），在前 35% 步骤应用"
        ],
        href: "https://arxiv.org/abs/2604.19720",
        paperLink: "ReImagine: Rethinking Controllable High-Quality Human Video Generation via Image-First Synthesis",
      },
      {
        num: 4,
        tag: "人体视觉基础模型",
        title: "Sapiens2：高分辨率人体中心视觉基础模型",
        description: "Sapiens2 是 Meta 推出的高分辨率人体中心视觉模型家族，包含 0.4B/0.8B/1B/5B 四个规模，支持原生 1K 分辨率和分层 4K 变体。相比第一代，Sapiens2 在预训练和后训练阶段均有显著提升：1) 预训练目标：结合 masked image reconstruction 与自蒸馏对比学习，同时捕获低级细节（用于密集预测）和高级语义（用于零样本/少样本设置）；2) 数据规模：在 10 亿张高质量人体图像上预训练，任务标注数量提升 10 倍；3) 架构改进：采用窗口注意力处理长空间上下文，RMSNorm、GQA、QK-Norm 提升训练稳定性。在 308 关键点姿态估计上，Sapiens2-5B 达到 82.3 mAP（+4.0 相比第一代）；在 29 类人体部位分割上，Sapiens2-1B 达到 81.7 mIoU（+23.5）。对于 music-to-dance 任务，Sapiens2 可作为高质量的人体姿态估计和分割预处理模块，其精确的人体结构理解有助于提升生成视频的人体合理性。",
        keyPoints: [
          "统一预训练目标：L = L_MAE + λL_CL，结合重建损失和对比损失，兼顾细节保留和语义理解",
          "分层 4K 架构：K 层窗口自注意力捕获局部结构 → 池化降采样 → L 层全局自注意力融合长程上下文",
          "SOTA 人体任务性能：308 关键点姿态估计 82.3 mAP，29 类分割 82.5 mIoU，法线估计 6.73° 平均角误差"
        ],
        href: "https://arxiv.org/abs/2604.21681",
        paperLink: "Sapiens2",
      },
      {
        num: 5,
        tag: "扩散 VLM",
        title: "BARD：渐进式块合并与阶段蒸馏桥接自回归与扩散 VLM",
        description: "BARD 提出一种高效框架，将预训练的自回归视觉语言模型 (VLM) 转换为同架构的大块扩散 VLM (dVLM)，实现高达 3 倍解码吞吐加速。核心挑战在于直接转换会导致显著性能下降，BARD 通过两阶段解决：1) 渐进式监督块合并：采用 (4,8,16,32) 的块大小调度，平滑过渡而非直接跳转；2) 阶段式 dVLM 蒸馏：使用固定的小块扩散锚点模型作为教师，恢复大块模型的性能损失。关键发现：直接自回归→扩散蒸馏对齐不良，而扩散 regime 内的蒸馏始终有效。此外，混合噪声调度器（同时训练 masked 和 visibly corrupted token）提升迭代修正能力，内存友好的打包训练布局减少多模态上下文冗余。基于 Qwen3-VL 训练的 BARD-VL 在 4B/8B 规模上达到开源 dVLM 的 SOTA，在 MMMU、MME、ChartQA 等基准上匹敌或超越源模型。对于 music-to-dance 任务，其渐进式块合并和阶段蒸馏技术为扩散模型的架构优化和加速提供了可复用的训练范式。",
        keyPoints: [
          "渐进块合并策略：块大小调度 (4,8,16,32)，平滑扩展解码并行度，避免 abrupt transition 的性能损失",
          "阶段式蒸馏：固定小块锚点作为教师，使用温度 τ=1.0 的 KL 散度损失恢复大块模型能力",
          "混合噪声调度：κ₁ₜ=1-cos(πt/2), κ₂ₜ=cos(πt/2)+sin(πt/2)-1, κ₃ₜ=1-sin(πt/2)，支持 token 修正"
        ],
        href: "https://arxiv.org/abs/2604.16514",
        paperLink: "BARD: Bridging AutoRegressive and Diffusion Vision-Language Models Via Highly Efficient Progressive Block Merging and Stage-Wise Distillation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "DeVI：基于合成视频模仿的物理合理灵巧人机交互",
        tag: "人机交互",
        href: "https://arxiv.org/abs/2604.20841",
        description: "利用文本条件合成视频实现物理合理的灵巧智能体控制，其 3D 人体跟踪与 2D 物体跟踪混合奖励机制可为舞蹈生成的物理合理性约束提供参考。",
      },
      {
        num: 7,
        title: "AnyRecon：视频扩散模型的任意视角 3D 重建",
        tag: "3D 重建",
        href: "https://arxiv.org/abs/2604.19747",
        description: "通过持久全局场景记忆和几何感知条件策略实现可扩展的稀疏视角重建，其几何记忆机制可借鉴用于舞蹈场景的 3D 一致性保持。",
      },
      {
        num: 8,
        title: "StyleID：风格化感知的人脸身份识别数据集与指标",
        tag: "身份保持",
        href: "https://arxiv.org/abs/2604.21689",
        description: "针对风格化人像的身份一致性评估框架，其感知感知的身份识别方法可用于评估舞蹈生成中参考人物的身份保持质量。",
      },
      {
        num: 9,
        title: "LEXIS：基于潜在交互特征的 3D 人机交互重建",
        tag: "3D 交互",
        href: "https://arxiv.org/abs/2604.20800",
        description: "通过 VQ-VAE 学习交互特征流形，结合扩散框架估计人体和物体网格，其物理合理性约束对舞蹈动作的空间合理性建模有借鉴意义。",
      },
      {
        num: 10,
        title: "OmniFit：尺度无关的多模态 3D 人体拟合",
        tag: "人体拟合",
        href: "https://arxiv.org/abs/2604.21575",
        description: "通过条件 transformer 解码器直接映射表面点到密集人体 landmark，实现毫米级精度的 SMPL-X 拟合，可作为舞蹈生成的人体先验模型。",
      },
    ],
    observation: "今日论文呈现出两个显著趋势：一是多模态统一建模的兴起，LLaDA2.0-Uni 和 BARD 分别从架构统一和训练范式角度推动扩散模型向统一框架演进，这对 music-to-dance 的音频-视觉联合建模具有直接启发；二是人体生成任务的解耦策略，ReImagine 的 Image-First 方法表明，将外观学习与动态建模分离可有效缓解数据瓶颈，这与当前端到端训练扩散模型的主流思路形成互补。此外，Sapiens2 等人体中心视觉模型的进步为舞蹈生成提供了更高质量的预处理工具，未来可考虑将 Sapiens2 的姿态估计和分割能力集成到生成流程中作为辅助监督信号。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "2026-04-23 | Unified Multimodal Diffusion and New Paradigms for Human Video Generation",
    overview: [
      "LLaDA2.0-Uni proposes a unified multimodal diffusion framework with SigLIP-VQ semantic tokenizer and block-level masked diffusion, offering new directions for audio-visual joint generation",
      "ReImagine adopts an Image-First strategy to decouple appearance modeling from temporal consistency, with SMPL-X motion guidance + training-free temporal refinement directly applicable to dance video generation",
      "Sapiens2 achieves SOTA on 308-keypoint pose estimation and body-part segmentation, serving as a high-quality preprocessing module for dance generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Multimodal Unified",
        title: "LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion LLM",
        description: "LLaDA2.0-Uni is a natively integrated unified multimodal model that uses a fully semantic discrete tokenizer (SigLIP-VQ) to discretize continuous visual inputs, enabling joint optimization of text and images under a shared block-level masked diffusion objective. Key innovations include: 1) SigLIP-VQ trained directly on understanding tasks with rich semantic information, outperforming reconstructive VQ-VAEs; 2) 16B MoE diffusion language model backbone for unified text and visual token processing; 3) Dedicated diffusion decoder achieving high-fidelity image reconstruction with 8-step distillation. The framework supports interleaved generation and reasoning, reaching SOTA performance on image generation, editing, and multimodal understanding. For music-to-dance tasks, its unified discrete representation and cross-modal block diffusion mechanism provide directly transferable technical paths, especially prefix-aware optimization and few-step distillation for significant inference efficiency gains.",
        keyPoints: [
          "SigLIP-VQ semantic tokenizer: Trained on understanding tasks, codebook size 16,384, dynamic resolution support, superior semantic extraction vs. reconstructive VQ",
          "Unified block-wise masked diffusion: Text and visual tokens optimized under shared objective, supporting interleaved generation and reasoning",
          "8-step diffusion decoder: CFG-free inference via consistency distillation, dramatically reducing computational cost while maintaining image quality"
        ],
        href: "https://arxiv.org/abs/2604.20796",
        paperLink: "LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion Large Language Model",
      },
      {
        num: 2,
        tag: "Virtual Try-On",
        title: "Tstars-Tryon 1.0: Large-Scale Commercial Virtual Try-On System",
        description: "Tstars-Tryon 1.0 is Alibaba's commercial-scale virtual try-on system deployed on Taobao App serving millions of users. It maintains high success rates under extreme poses, severe illumination variations, and motion blur while achieving high-fidelity detail reconstruction and near real-time inference (3.92s for single garment, 6.74s for multiple). Technical highlights include: 1) Unified MMDiT architecture supporting flexible composition of up to 6 reference images; 2) Multi-stage training paradigm (pre-training → progressive resolution continuous training → high-quality SFT → RL) ensuring generation quality; 3) Multi-dimensional reward functions (identity consistency, garment fidelity, background preservation, physical & structural logic) optimizing results. For music-to-dance tasks, its multi-reference composition, identity preservation, and pose control techniques are directly transferable, especially garment detail preservation and physical plausibility constraints valuable for dancer appearance consistency.",
        keyPoints: [
          "Unified MMDiT architecture: Simultaneously processes and coordinates multiple reference images, supporting flexible composition across 8 fashion categories",
          "Multi-stage training: Task-balanced and content-balanced datasets, progressive resolution training, DiffusionNFT RL optimization",
          "Near real-time inference: 5B DiT model with CFG and step distillation, single/multi-garment try-on in 3.92s/6.74s"
        ],
        href: "https://arxiv.org/abs/2604.19748",
        paperLink: "Tstars-Tryon 1.0: Robust and Realistic Virtual Try-On for Diverse Fashion Items",
      },
      {
        num: 3,
        tag: "Human Video Generation",
        title: "ReImagine: Image-First Controllable High-Quality Human Video Generation",
        description: "ReImagine addresses human video generation from an image-first perspective, decoupling appearance modeling from temporal consistency. The method first fine-tunes FLUX Kontext for pose and viewpoint-controllable image synthesis (using SMPL-X normal maps as conditions), then applies a pretrained video diffusion model (Wan 2.1) for training-free temporal refinement. Core innovations include: 1) Image-first strategy leveraging strong pretrained image generation priors to learn geometric conditioning even with limited multi-view data; 2) Condition-aware positional encoding via (x, y, condition_type) triplets distinguishing pose, front-view, back-view, and noise tokens; 3) Training-free temporal consistency via low-noise re-denoising combined with 3D FFT spatiotemporal regularization to suppress inter-frame artifacts at inference. Experiments show superior FID and FVD metrics over Wan-Animate, Human4DiT baselines on MVHumanNet++ and DNA-Rendering datasets. For music-to-dance tasks, its Image-First paradigm provides a viable path for decoupling appearance learning and temporal modeling, with SMPL-X motion guidance replaceable by audio-driven motion representations.",
        keyPoints: [
          "Image-First decoupling: Appearance modeling via image generation, temporal consistency via pretrained video model refinement, avoiding joint training data bottlenecks",
          "SMPL-X conditioning: Rendered normal maps as ControlNet conditions, MLP-embedded pose parameters providing global geometric priors",
          "Training-free temporal refinement: Low-noise re-denoising + 3D FFT spatiotemporal low-pass filtering (τ_t=0.06, τ_s=0.12), applied in first 35% steps"
        ],
        href: "https://arxiv.org/abs/2604.19720",
        paperLink: "ReImagine: Rethinking Controllable High-Quality Human Video Generation via Image-First Synthesis",
      },
      {
        num: 4,
        tag: "Human-Centric Vision",
        title: "Sapiens2: High-Resolution Human-Centric Vision Foundation Models",
        description: "Sapiens2 is Meta's family of high-resolution human-centric vision models with 0.4B/0.8B/1B/5B variants, supporting native 1K resolution and hierarchical 4K variants. Improvements over the first generation include: 1) Pretraining objective combining masked image reconstruction with self-distilled contrastive learning, capturing both low-level details (for dense prediction) and high-level semantics (for zero/few-shot settings); 2) Data scale: pretrained on 1 billion high-quality human images with 10× task annotations; 3) Architectural improvements: windowed attention for long spatial context, RMSNorm, GQA, QK-Norm for training stability. On 308-keypoint pose estimation, Sapiens2-5B achieves 82.3 mAP (+4.0 vs. first generation); on 29-class body-part segmentation, Sapiens2-1B reaches 81.7 mIoU (+23.5). For music-to-dance tasks, Sapiens2 serves as a high-quality preprocessing module for human pose estimation and segmentation, with precise human structure understanding improving generated video plausibility.",
        keyPoints: [
          "Unified pretraining objective: L = L_MAE + λL_CL, combining reconstruction and contrastive losses for detail preservation and semantic understanding",
          "Hierarchical 4K architecture: K layers window self-attention for local structure → pooling downsampling → L layers global self-attention for long-range context",
          "SOTA human task performance: 308-keypoint pose estimation 82.3 mAP, 29-class segmentation 82.5 mIoU, normal estimation 6.73° mean angular error"
        ],
        href: "https://arxiv.org/abs/2604.21681",
        paperLink: "Sapiens2",
      },
      {
        num: 5,
        tag: "Diffusion VLM",
        title: "BARD: Progressive Block Merging and Stage-wise Distillation for AR-to-Diffusion VLM",
        description: "BARD proposes an efficient framework converting pretrained autoregressive VLMs to same-architecture large-block diffusion VLMs (dVLM), achieving up to 3× decoding throughput speedup. The core challenge is that direct conversion causes significant performance degradation. BARD addresses this via two stages: 1) Progressive supervised block merging with block size schedule (4,8,16,32) for smooth transition rather than abrupt jumps; 2) Stage-wise dVLM distillation using a fixed small-block diffusion anchor as teacher to recover performance loss from larger blocks. Key finding: direct AR→diffusion distillation is poorly aligned, while distillation within the diffusion regime is consistently effective. Additionally, mixed-noise scheduler (training both masked and visibly corrupted tokens) improves iterative revision capability, and memory-friendly packed training layout reduces multimodal context redundancy. BARD-VL trained from Qwen3-VL achieves SOTA among open dVLMs at 4B/8B scales, matching or exceeding source model performance on MMMU, MME, ChartQA benchmarks. For music-to-dance tasks, its progressive block merging and stage distillation provide reusable training paradigms for diffusion model architecture optimization and acceleration.",
        keyPoints: [
          "Progressive block merging: Block size schedule (4,8,16,32), smoothly expanding decoding parallelism without abrupt transition performance loss",
          "Stage-wise distillation: Fixed small-block anchor as teacher, KL divergence loss with temperature τ=1.0 to recover large-block model capabilities",
          "Mixed-noise scheduler: κ₁ₜ=1-cos(πt/2), κ₂ₜ=cos(πt/2)+sin(πt/2)-1, κ₃ₜ=1-sin(πt/2), supporting token revision"
        ],
        href: "https://arxiv.org/abs/2604.16514",
        paperLink: "BARD: Bridging AutoRegressive and Diffusion Vision-Language Models Via Highly Efficient Progressive Block Merging and Stage-Wise Distillation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "DeVI: Physics-based Dexterous Human-Object Interaction via Synthetic Video Imitation",
        tag: "HOI",
        href: "https://arxiv.org/abs/2604.20841",
        description: "Leverages text-conditioned synthetic videos for physically plausible dexterous agent control. Its hybrid 3D human tracking + 2D object tracking reward mechanism provides reference for physical plausibility constraints in dance generation.",
      },
      {
        num: 7,
        title: "AnyRecon: Arbitrary-View 3D Reconstruction with Video Diffusion",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2604.19747",
        description: "Achieves scalable sparse-view reconstruction via persistent global scene memory and geometry-aware conditioning. Its geometric memory mechanism can be adapted for 3D consistency in dance scenes.",
      },
      {
        num: 8,
        title: "StyleID: Perception-Aware Face Identity Recognition under Stylization",
        tag: "Identity",
        href: "https://arxiv.org/abs/2604.21689",
        description: "Evaluation framework for identity consistency under stylization. Its perception-aware identity recognition approach can assess reference person identity preservation quality in dance generation.",
      },
      {
        num: 9,
        title: "LEXIS: Latent Interaction Signatures for 3D HOI from Images",
        tag: "3D Interaction",
        href: "https://arxiv.org/abs/2604.20800",
        description: "Learns interaction feature manifolds via VQ-VAE, combining with diffusion for human/object mesh estimation. Its physical plausibility constraints inform spatial reasoning for dance motion modeling.",
      },
      {
        num: 10,
        title: "OmniFit: Scale-agnostic Multi-modal 3D Body Fitting",
        tag: "Body Fitting",
        href: "https://arxiv.org/abs/2604.21575",
        description: "Maps surface points to dense body landmarks via conditional transformer decoder, achieving millimeter-accurate SMPL-X fitting. Can serve as human prior model for dance generation.",
      },
    ],
    observation: "Today's papers reveal two notable trends: first, the rise of unified multimodal modeling, with LLaDA2.0-Uni and BARD pushing diffusion models toward unified frameworks from architectural and training perspectives respectively—directly relevant for audio-visual joint modeling in music-to-dance. Second, decoupling strategies for human generation tasks: ReImagine's Image-First approach demonstrates that separating appearance learning from dynamic modeling can effectively alleviate data bottlenecks, complementing current end-to-end diffusion training paradigms. Additionally, advances in human-centric vision models like Sapiens2 provide higher-quality preprocessing tools for dance generation; future work could integrate Sapiens2's pose estimation and segmentation capabilities as auxiliary supervision signals in the generation pipeline.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-23`,
        'en': `/en/daily/music-to-dance/2026-04-23`,
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
      date="2026-04-23"
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