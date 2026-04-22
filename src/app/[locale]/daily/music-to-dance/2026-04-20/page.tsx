import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "扩散模型偏差修正与跨模态对齐新进展",
    overview: [
      "扩散模型的 SNR-t 偏差问题被系统性地揭示和解决，提出的差分校正方法可即插即用提升生成质量",
      "层次化编解码器扩散模型为音视频对齐提供了新思路，粗到细的 token 生成策略值得借鉴",
      "神经运动重定向框架在舞蹈任务上验证了时序建模方法的有效性，可直接迁移到动作生成"
    ],
    papers: [
      {
        num: 1,
        tag: "扩散模型",
        title: "SNR-t 偏差：扩散模型中被忽视的生成质量杀手",
        description: "这篇论文首次系统性地揭示了扩散概率模型中存在的 SNR-t（信噪比-时间步）偏差问题。研究发现，训练时样本的 SNR 与时间步严格绑定，但推理时由于模型预测误差和数值求解器离散化误差的累积，去噪轨迹偏离理想路径，导致预测样本的 SNR 与指定时间步不匹配。这种偏差表现为：低 SNR 样本会导致网络产生过大的噪声预测，而高 SNR 样本则预测不足。论文提出了小波域动态差分校正方法（DCW），利用重构样本与预测分布的差异信号来引导偏差样本向理想分布对齐，且针对不同频率分量采用动态权重系数。实验表明，该方法在 IDDPM、ADM、DDIM、EDM、PFGM++ 和 FLUX 等多种扩散模型上均显著提升生成质量，且计算开销可忽略不计。对于 music-to-dance 任务，这一方法可直接应用于基于扩散模型的视频生成 pipeline，改善时序一致性和生成质量。",
        keyPoints: [
          "首次从理论和实验角度证明了 SNR-t 偏差的存在及其对生成质量的严重影响",
          "提出小波域差分校正方法，利用重构分布与预测分布的差异信号进行动态修正",
          "方法无需重新训练，即插即用，在 8 种主流扩散模型上均取得一致提升"
        ],
        href: "https://arxiv.org/abs/2604.16044",
        paperLink: "Elucidating the SNR-t Bias of Diffusion Probabilistic Models",
      },
      {
        num: 2,
        tag: "音视频对齐",
        title: "HiCoDiT：层次化编解码器扩散模型实现高质量视频到语音生成",
        description: "HiCoDiT 针对视频到语音（VTS）生成任务，创新性地利用了残差向量量化（RVQ）编解码器的层次结构特性。论文发现，低层 token 主要编码说话人相关的语义内容，而高层 token 编码更抽象的韵律细节。基于此，HiCoDiT 设计了分层扩散 Transformer，低层块以唇部同步运动和面部身份为条件进行语义和音色对齐，高层块则以面部表情序列指导韵律对齐。此外，论文提出了双尺度自适应实例层归一化（AdaLN），通过通道归一化建模全局声乐风格，通过时间归一化捕捉局部韵律动态。实验表明，HiCoDiT 在语义一致性和语音多样性方面均优于现有方法。对于 music-to-dance 任务，这种层次化 token 建模和跨模态对齐方法可直接迁移到音频-动作对齐，尤其是粗到细的条件注入策略对音乐节奏与舞蹈动作的精细对齐具有重要参考价值。",
        keyPoints: [
          "首个将语音层次先验显式集成到离散扩散框架中的 VTS 方法",
          "利用 RVQ 编解码器的固有层次结构实现解耦的视觉条件注入",
          "双尺度 AdaLN 同时建模全局声乐风格和局部韵律动态"
        ],
        href: "https://arxiv.org/abs/2604.15923",
        paperLink: "Hierarchical Codec Diffusion for Video-to-Speech Generation",
      },
      {
        num: 3,
        tag: "运动生成",
        title: "NMR：神经运动重定向框架攻克人形机器人全身控制",
        description: "NMR 框架通过将运动重定向问题从静态几何优化重新定义为数据分布学习，有效解决了传统基于优化的方法固有的非凸性和局部最优问题。论文首先通过 Hessian 分析证明了传统优化方法的数学局限性，然后提出了聚类专家物理精炼（CEPR）数据管道：利用 VAE 进行运动聚类，将异构运动分组为潜在 motif，再通过大规模并行强化学习专家策略在物理模拟器中投影和修复噪声人体演示，生成满足动态约束的真值运动数据。最终，非自回归 CNN-Transformer 架构在全局时序上下文上进行推理，抑制重构噪声并绕过几何陷阱。在 Unitree G1 人形机器人上的实验涵盖武术、舞蹈等多种动态任务，结果显示 NMR 消除了关节跳跃，显著减少了自碰撞。对于 music-to-dance 研究，NMR 的时序建模方法和物理一致性约束处理对舞蹈动作生成具有直接借鉴意义。",
        keyPoints: [
          "通过 Hessian 分析从理论上证明传统优化方法的非凸性局限",
          "CEPR 数据管道结合 VAE 运动聚类和 RL 专家策略生成物理一致的训练数据",
          "CNN-Transformer 架构在舞蹈等动态任务上验证了其时序建模的有效性"
        ],
        href: "https://arxiv.org/abs/2603.22201",
        paperLink: "Make Tracking Easy: Neural Motion Retargeting for Humanoid Whole-body Control",
      },
      {
        num: 4,
        tag: "跨模态控制",
        title: "ControlFoley：统一可控的视频到音频生成框架 ⚠️ 基于摘要",
        description: "ControlFoley 针对视频到音频生成中的跨模态冲突问题，提出了统一的多模态控制框架。该方法引入联合视觉编码范式，将 CLIP 与时空音视频编码器集成以改善对齐和文本可控性；提出时序-音色解耦方法，抑制冗余时序线索同时保留判别性音色特征；设计了模态鲁棒训练方案，包括统一多模态表示对齐（REPA）和随机模态丢弃。论文还发布了 VGGSound-TVC 基准用于评估不同程度的视觉-文本冲突下的文本可控性。实验表明，ControlFoley 在跨模态冲突场景下实现了优越的可控性，同时保持强同步性和音频质量。对于 music-to-dance 任务，其跨模态冲突处理机制和条件控制方法对解决音频-动作对齐中的多条件冲突问题具有参考价值，REPA 对齐策略也值得借鉴。⚠️ 基于摘要（PDF 下载失败）",
        keyPoints: [
          "联合视觉编码范式集成 CLIP 和时空编码器改善跨模态对齐",
          "时序-音色解耦实现更精细的风格控制",
          "REPA 和随机模态丢弃提升训练鲁棒性"
        ],
        href: "https://arxiv.org/abs/2604.15086",
        paperLink: "ControlFoley: Unified and Controllable Video-to-Audio Generation with Cross-Modal Conflict Handling",
      },
      {
        num: 5,
        tag: "Flow Matching",
        title: "LeapAlign：通过两步轨迹实现 Flow Matching 模型的任意步对齐",
        description: "LeapAlign 解决了 Flow Matching 模型后训练中的关键难题：长轨迹反向传播的内存开销和梯度爆炸问题导致早期生成步骤难以更新，而早期步骤对最终图像的全局结构至关重要。论文提出构建跳跃轨迹——从完整轨迹中随机选择两个时间步 k > j，通过单步跳跃预测构建仅有两步的缩短轨迹进行微调。这种方法保持内存成本恒定，允许直接更新任意生成步骤。为进一步稳定训练，论文提出梯度折扣机制：降低大幅值梯度项的权重而非完全移除，从而保留 DRTune 丢弃的有用学习信号；同时引入轨迹相似性加权，使更接近真实路径的跳跃轨迹获得更高权重。在 FLUX 模型上的实验表明，LeapAlign 在图像质量和图文对齐方面均优于 GRPO 和直接梯度方法。对于 music-to-dance 生成模型的偏好对齐训练，LeapAlign 提供了一种高效稳定的早期步骤微调方案。",
        keyPoints: [
          "两步跳跃轨迹设计使早期生成步骤的微调成为可能",
          "梯度折扣机制保留有用梯度信号，避免完全移除嵌套梯度项",
          "轨迹相似性加权增强与真实生成路径一致的样本学习信号"
        ],
        href: "https://arxiv.org/abs/2604.15311",
        paperLink: "LeapAlign: Post-Training Flow Matching Models at Any Generation Step by Building Two-Step Trajectories",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Qwen3.5-Omni：百亿参数级全模态理解模型",
        tag: "多模态",
        href: "https://arxiv.org/abs/2604.15804",
        description: "Qwen3.5-Omni 在 2.15 亿小时的音视频内容上训练，支持 256k 上下文和 10+ 小时音频理解，其音频-视觉对齐能力对 music-to-dance 的多模态建模有参考价值。",
      },
      {
        num: 7,
        title: "GlobalSplat：基于全局场景 Token 的高效前馈 3D 高斯渲染",
        tag: "3D 渲染",
        href: "https://arxiv.org/abs/2604.15284",
        description: "通过先对齐后解码原则学习紧凑的全局隐式场景表示，仅需 16K 高斯即可实现高质量渲染，对 dance 视频中的人体建模和渲染加速有潜在价值。",
      },
      {
        num: 8,
        title: "LaviGen：自回归 3D 布局生成",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2604.16299",
        description: "将 3D 扩散模型重新用于自回归布局生成，显式建模物体间的几何关系和物理约束，双引导自推出蒸馏机制可为人体姿态建模提供新思路。",
      },
      {
        num: 9,
        title: "1D 有序 Token 实现高效的测试时搜索",
        tag: "生成优化",
        href: "https://arxiv.org/abs/2604.15453",
        description: "粗到细的 1D 有序 token 结构使中间状态具有语义意义，可被验证器可靠评估，其测试时扩展方法可能用于优化 dance 生成质量。",
      },
      {
        num: 10,
        title: "VEFX-Bench：通用视频编辑与视觉效果评估基准",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2604.16272",
        description: "包含 5,049 个视频编辑示例的数据集和 VEFX-Reward 质量评估模型，其时序一致性评价指标可为 dance 视频生成质量评估提供参考。",
      },
    ],
    observation: "今日论文呈现出几个值得关注的趋势：首先，扩散模型的基础理论研究正在深入，SNR-t 偏差的揭示表明学术界对生成模型内在机制的理解正在从经验性调参走向理论化分析，这对 music-to-dance 等高质量视频生成任务尤为重要。其次，层次化建模成为跨模态对齐的主流方向——无论是 HiCoDiT 的 RVQ 层次编解码器还是 1D 有序 token 的粗到细结构，都体现了利用数据固有层次结构实现更精细控制的思想，这与 music-to-dance 中音乐节奏与舞蹈动作的多粒度对齐需求高度契合。最后，Flow Matching 作为扩散模型的新兴替代方案，其后训练对齐方法（如 LeapAlign）正在快速发展，为 dance 生成模型的偏好优化提供了新的技术路径。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "New Advances in Diffusion Model Bias Correction and Cross-Modal Alignment",
    overview: [
      "The SNR-t bias in diffusion models has been systematically revealed and addressed, with a differential correction method that can be plug-and-play to improve generation quality",
      "Hierarchical codec diffusion models provide new insights for audio-visual alignment, with coarse-to-fine token generation strategies worth learning from",
      "Neural motion retargeting framework validates the effectiveness of temporal modeling methods on dance tasks, which can be directly transferred to motion generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Diffusion Model",
        title: "SNR-t Bias: The Overlooked Quality Killer in Diffusion Models",
        description: "This paper systematically reveals the SNR-t (Signal-to-Noise Ratio-timestep) bias in diffusion probabilistic models for the first time. The study finds that during training, the SNR of samples is strictly bound to timesteps, but during inference, the denoising trajectory deviates from the ideal path due to accumulated model prediction errors and numerical solver discretization errors, causing a mismatch between the predicted sample's SNR and the designated timestep. This bias manifests as: low-SNR samples cause the network to produce excessive noise predictions, while high-SNR samples are under-predicted. The paper proposes a wavelet-domain dynamic differential correction method (DCW) that uses the difference signal between reconstructed and predicted distributions to guide biased samples toward the ideal distribution, with dynamic weight coefficients for different frequency components. Experiments show that this method consistently improves generation quality across various diffusion models including IDDPM, ADM, DDIM, EDM, PFGM++, and FLUX, with negligible computational overhead. For music-to-dance tasks, this method can be directly applied to diffusion-based video generation pipelines to improve temporal consistency and generation quality.",
        keyPoints: [
          "First theoretical and experimental proof of SNR-t bias existence and its severe impact on generation quality",
          "Proposes wavelet-domain differential correction using difference signals between reconstruction and prediction distributions",
          "Training-free, plug-and-play method achieving consistent improvements across 8 mainstream diffusion models"
        ],
        href: "https://arxiv.org/abs/2604.16044",
        paperLink: "Elucidating the SNR-t Bias of Diffusion Probabilistic Models",
      },
      {
        num: 2,
        tag: "Audio-Visual Alignment",
        title: "HiCoDiT: Hierarchical Codec Diffusion for High-Quality Video-to-Speech Generation",
        description: "HiCoDiT innovatively leverages the hierarchical structure of Residual Vector Quantization (RVQ) codecs for video-to-speech (VTS) generation. The paper discovers that lower-level tokens primarily encode speaker-aware semantic content, while higher-level tokens encode more abstract prosodic details. Based on this, HiCoDiT designs a hierarchical diffusion Transformer where low-level blocks perform semantic and timbre alignment conditioned on lip-synchronized motion and facial identity, while high-level blocks guide prosody alignment using facial expression sequences. Additionally, the paper proposes dual-scale Adaptive Instance Layer Normalization (AdaLN) that models global vocal style through channel-wise normalization and captures local prosody dynamics through temporal-wise normalization. Experiments show HiCoDiT outperforms existing methods in both semantic consistency and speech diversity. For music-to-dance tasks, this hierarchical token modeling and cross-modal alignment approach can be directly transferred to audio-motion alignment, especially the coarse-to-fine conditioning injection strategy which has important reference value for fine-grained alignment between music rhythm and dance movements.",
        keyPoints: [
          "First VTS method to explicitly integrate speech hierarchy prior into discrete diffusion framework",
          "Leverages inherent hierarchy of RVQ codec for disentangled visual conditioning",
          "Dual-scale AdaLN simultaneously models global vocal style and local prosody dynamics"
        ],
        href: "https://arxiv.org/abs/2604.15923",
        paperLink: "Hierarchical Codec Diffusion for Video-to-Speech Generation",
      },
      {
        num: 3,
        tag: "Motion Generation",
        title: "NMR: Neural Motion Retargeting Framework for Humanoid Whole-Body Control",
        description: "The NMR framework reformulates motion retargeting from static geometric optimization to data distribution learning, effectively addressing the inherent non-convexity and local optima problems of traditional optimization-based methods. The paper first proves the mathematical limitations of traditional optimization methods through Hessian analysis, then proposes the Clustered-Expert Physics Refinement (CEPR) data pipeline: using VAE for motion clustering to group heterogeneous movements into latent motifs, then training massively parallel RL expert policies to project and repair noisy human demonstrations in physics simulators, generating ground-truth motions satisfying dynamic constraints. Finally, a non-autoregressive CNN-Transformer architecture reasons over global temporal context to suppress reconstruction noise and bypass geometric traps. Experiments on Unitree G1 humanoid across diverse dynamic tasks including martial arts and dancing show NMR eliminates joint jumps and significantly reduces self-collisions. For music-to-dance research, NMR's temporal modeling methods and physical consistency constraint handling have direct reference value for dance motion generation.",
        keyPoints: [
          "Theoretically proves non-convexity limitations of traditional optimization methods through Hessian analysis",
          "CEPR pipeline combines VAE motion clustering and RL expert policies to generate physically consistent training data",
          "CNN-Transformer architecture validates effectiveness of temporal modeling on dynamic tasks like dancing"
        ],
        href: "https://arxiv.org/abs/2603.22201",
        paperLink: "Make Tracking Easy: Neural Motion Retargeting for Humanoid Whole-body Control",
      },
      {
        num: 4,
        tag: "Cross-Modal Control",
        title: "ControlFoley: Unified and Controllable Video-to-Audio Generation Framework ⚠️ Based on Abstract",
        description: "ControlFoley addresses cross-modal conflicts in video-to-audio generation through a unified multimodal control framework. The method introduces a joint visual encoding paradigm integrating CLIP with spatio-temporal audio-visual encoders to improve alignment and text controllability; proposes temporal-timbre decoupling to suppress redundant temporal cues while preserving discriminative timbre features; and designs a modality-robust training scheme including unified multimodal representation alignment (REPA) and random modality dropout. The paper also releases the VGGSound-TVC benchmark for evaluating text controllability under varying degrees of visual-text conflict. Experiments show ControlFoley achieves superior controllability under cross-modal conflict while maintaining strong synchronization and audio quality. For music-to-dance tasks, its cross-modal conflict handling mechanisms and conditional control methods have reference value for addressing multi-condition conflicts in audio-motion alignment, and the REPA alignment strategy is also worth learning from. ⚠️ Based on abstract (PDF download failed)",
        keyPoints: [
          "Joint visual encoding paradigm integrates CLIP and spatio-temporal encoders for improved cross-modal alignment",
          "Temporal-timbre decoupling enables finer-grained style control",
          "REPA and random modality dropout improve training robustness"
        ],
        href: "https://arxiv.org/abs/2604.15086",
        paperLink: "ControlFoley: Unified and Controllable Video-to-Audio Generation with Cross-Modal Conflict Handling",
      },
      {
        num: 5,
        tag: "Flow Matching",
        title: "LeapAlign: Aligning Flow Matching Models at Any Generation Step via Two-Step Trajectories",
        description: "LeapAlign addresses a critical challenge in Flow Matching model post-training: the memory overhead and gradient explosion from long-trajectory backpropagation make early generation steps difficult to update, yet early steps are crucial for the global structure of the final image. The paper proposes constructing leap trajectories—randomly selecting two timesteps k > j from the full trajectory and building a shortened two-step trajectory through one-step leap prediction for fine-tuning. This approach maintains constant memory cost and allows direct updates to any generation step. To further stabilize training, the paper proposes gradient discounting: reducing weights of large-magnitude gradient terms rather than completely removing them, thus preserving useful learning signals that DRTune discards; and trajectory-similarity weighting to amplify learning signals from leap trajectories closer to the true generation path. Experiments on FLUX show LeapAlign outperforms GRPO and direct gradient methods in both image quality and image-text alignment. For music-to-dance generation model preference alignment training, LeapAlign provides an efficient and stable early-step fine-tuning solution.",
        keyPoints: [
          "Two-step leap trajectory design enables fine-tuning of early generation steps",
          "Gradient discounting preserves useful gradient signals instead of completely removing nested gradient terms",
          "Trajectory-similarity weighting amplifies learning signals from trajectories consistent with true generation path"
        ],
        href: "https://arxiv.org/abs/2604.15311",
        paperLink: "LeapAlign: Post-Training Flow Matching Models at Any Generation Step by Building Two-Step Trajectories",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Qwen3.5-Omni: 10B+ Parameter Omni-Modal Understanding Model",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2604.15804",
        description: "Trained on 100M+ hours of audio-visual content with 256k context support and 10+ hour audio understanding, its audio-visual alignment capabilities provide reference for multimodal modeling in music-to-dance.",
      },
      {
        num: 7,
        title: "GlobalSplat: Efficient Feed-Forward 3D Gaussian Splatting via Global Scene Tokens",
        tag: "3D Rendering",
        href: "https://arxiv.org/abs/2604.15284",
        description: "Learns compact global implicit scene representation through align first, decode later principle, achieving high-quality rendering with only 16K Gaussians, with potential value for human body modeling and rendering acceleration in dance videos.",
      },
      {
        num: 8,
        title: "LaviGen: Autoregressive 3D Layout Generation",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2604.16299",
        description: "Repurposes 3D diffusion models for autoregressive layout generation, explicitly modeling geometric relationships and physical constraints between objects, with dual-guidance self-rollout distillation providing new insights for human pose modeling.",
      },
      {
        num: 9,
        title: "1D Ordered Tokens Enable Efficient Test-Time Search",
        tag: "Generation Optimization",
        href: "https://arxiv.org/abs/2604.15453",
        description: "Coarse-to-fine 1D ordered token structures give intermediate states semantic meaning that can be reliably evaluated by verifiers, with test-time scaling methods potentially applicable to optimizing dance generation quality.",
      },
      {
        num: 10,
        title: "VEFX-Bench: Benchmark for Generic Video Editing and Visual Effects",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2604.16272",
        description: "Dataset with 5,049 video editing examples and VEFX-Reward quality assessment model, with temporal consistency evaluation metrics providing reference for dance video generation quality assessment.",
      },
    ],
    observation: "Today's papers reveal several noteworthy trends: First, fundamental theoretical research on diffusion models is deepening. The revelation of SNR-t bias indicates that academic understanding of generative models is moving from empirical tuning toward theoretical analysis, which is particularly important for high-quality video generation tasks like music-to-dance. Second, hierarchical modeling has become the mainstream direction for cross-modal alignment—whether HiCoDiT's RVQ hierarchical codec or the coarse-to-fine structure of 1D ordered tokens, both embody the idea of leveraging inherent data hierarchies for finer control, which aligns highly with the multi-granularity alignment needs between music rhythm and dance movements in music-to-dance. Finally, Flow Matching as an emerging alternative to diffusion models is rapidly developing its post-training alignment methods (like LeapAlign), providing new technical paths for preference optimization of dance generation models.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-20`,
        'en': `/en/daily/music-to-dance/2026-04-20`,
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
      date="2026-04-20"
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