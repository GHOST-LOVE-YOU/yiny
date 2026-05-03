import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "强化学习注入3D约束，像素级统一多模态架构新进展",
    overview: [
      "World-R1 通过 Flow-GRPO 强化学习将3D几何一致性注入视频生成模型，无需修改架构即可实现世界模拟能力",
      "Tuna-2 提出无编码器的像素级统一多模态架构，直接在像素空间进行理解与生成，实现端到端优化",
      "Meta-CoT 通过元任务分解和 CoT-Editing Consistency Reward 提升图像编辑的细粒度理解和泛化能力",
      "Diffusion Templates 提供统一的插件框架，支持多种条件控制（结构、亮度、颜色、内容参考等）的模块化组合"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成 / 3D一致性",
        title: "World-R1：通过强化学习注入3D约束的文本到视频生成",
        description: "World-R1 提出了一种无需修改模型架构、无需大规模3D数据集即可增强视频生成3D一致性的方法。核心创新在于利用 Flow-GRPO 强化学习框架，结合预训练3D基础模型（Depth Anything 3）和视觉语言模型（Qwen3-VL）构建复合奖励函数。具体而言，3D奖励包含三个组件：Meta-view Score（从新视角渲染并评估几何完整性）、Rendering Score（与3DGS重渲染的感知相似度）、Trajectory Score（生成相机轨迹与指令的对齐度）。实验表明，该方法在保持原有视觉质量的同时，将3D重建一致性提升10.23dB（PSNR）。对于music-to-dance任务，这种通过强化学习注入几何约束的范式可直接迁移——通过设计针对人体姿态一致性的奖励函数，有望改善舞蹈动作的空间合理性和时序连贯性，而无需依赖昂贵的3D人体标注数据。",
        keyPoints: [
          "Flow-GRPO 强化学习框架：将确定性ODE采样转化为随机SDE策略，通过组相对策略优化实现高效训练",
          "复合3D奖励设计：融合3D高斯溅射重建、新视角渲染评估和轨迹对齐，无需3D标注数据",
          "隐式相机条件策略：通过噪声包裹（noise wrapping）将相机运动先验嵌入潜在空间，无需训练辅助网络",
          "迁移价值：奖励驱动的几何一致性注入方法可直接应用于舞蹈动作生成，改善人体姿态的空间合理性"
        ],
        href: "https://arxiv.org/abs/2604.24764",
        paperLink: "World-R1: Reinforcing 3D Constraints for Text-to-Video Generation",
      },
      {
        num: 2,
        tag: "多模态 / 统一架构",
        title: "Tuna-2：像素嵌入超越视觉编码器的多模态理解与生成",
        description: "Tuna-2 挑战了统一多模态模型必须依赖预训练视觉编码器的传统认知，提出完全无编码器的架构设计。模型仅使用简单的patch嵌入层将图像转换为视觉token，直接在像素空间进行多模态理解和生成。在生成任务中，采用x-prediction和v-loss的流匹配目标；在理解任务中，通过掩码视觉特征学习增强鲁棒性。实验显示，经过充分预训练后，Tuna-2在细粒度视觉感知任务（如V*、CountBench）上显著优于基于编码器的变体Tuna-R，同时在GenEval和DPG-Bench等生成基准上达到SOTA。对于music-to-dance任务，这种像素级统一架构意味着音频、视觉和动作可以在同一空间中进行端到端对齐，避免了传统编码器带来的信息瓶颈和模态错位问题。",
        keyPoints: [
          "无编码器架构：完全移除VAE和表示编码器，使用简单patch嵌入层实现像素级统一建模",
          "掩码视觉特征学习：通过随机掩码patch并预测完整图像，增强像素空间表征的鲁棒性",
          "x-prediction流匹配：在像素空间直接预测干净图像，通过速度项转换实现高效训练",
          "迁移价值：端到端像素级对齐为audio-visual-motion联合建模提供了更直接的优化路径"
        ],
        href: "https://arxiv.org/abs/2604.24763",
        paperLink: "Tuna-2: Pixel Embeddings Beat Vision Encoders for Multimodal Understanding and Generation",
      },
      {
        num: 3,
        tag: "图像编辑 / CoT推理",
        title: "Meta-CoT：提升图像编辑粒度与泛化能力的元任务分解",
        description: "Meta-CoT 提出了一种层次化分解的Chain-of-Thought范式，将任意图像编辑操作表示为三元组（Task, Target, Required Understanding Ability）。第一级分解（Triplet Decomposition）将编辑意图分解为任务摘要、任务思考和目标遍历三个步骤；第二级分解（Meta-task Decomposition）进一步将任务归纳为五个元任务（Addition, Deletion, Replacement, Camera Motion, Position Change）。实验表明，仅在5个元任务上训练即可泛化到21个编辑任务，整体性能提升15.8%。此外，CoT-Editing Consistency Reward通过VLM评估CoT推理与编辑结果的一致性，进一步优化Flow-GRPO训练。对于music-to-dance任务，这种元任务分解思路可用于将复杂的舞蹈动作编辑分解为可组合的元动作单元（如肢体添加/删除、位置变换、相机运动），提升动作编辑的可控性和泛化性。",
        keyPoints: [
          "三元组分解：将编辑操作表示为（任务、目标、理解能力），实现细粒度推理",
          "元任务归纳：5个元任务（添加、删除、替换、相机运动、位置变化）组合覆盖全部编辑空间",
          "CoT-Editing一致性奖励：通过VLM评估推理链与编辑结果的对齐度，优化GRPO训练",
          "迁移价值：元任务分解范式可将舞蹈动作拆解为可组合的原子操作，提升编辑可控性"
        ],
        href: "https://arxiv.org/abs/2604.24625",
        paperLink: "Meta-CoT: Enhancing Granularity and Generalization in Image Editing",
      },
      {
        num: 4,
        tag: "扩散模型 / 可控生成",
        title: "Diffusion Templates：统一的可控扩散插件框架",
        description: "Diffusion Templates 解决了可控扩散方法碎片化、难以组合的问题，提出了一个统一的插件框架。核心设计包含三个组件：Template Model将任务特定输入映射为中间能力表示（Template Cache）、Template Cache作为标准化的能力注入接口（支持KV-Cache、LoRA等异构载体）、Template Pipeline负责加载、合并和注入多个Template Cache到基础扩散模型。基于该框架，作者训练并开源了涵盖结构控制（depth/pose/normal）、亮度/颜色调整、图像编辑、超分辨率、锐度增强、美学对齐、内容参考、局部修复和年龄控制的模型库。对于music-to-dance任务，该框架的模块化设计允许将音频控制（节拍、风格）和外观控制（参考人物）作为独立的Template Model进行训练和组合，实现多条件生成的灵活配置。",
        keyPoints: [
          "统一插件接口：将可控能力封装为Template Model，通过Template Cache标准化注入",
          "异构载体支持：KV-Cache和LoRA可在同一抽象下作为能力载体",
          "可组合性：多个Template Cache可通过拼接等方式联合生效，无需修改基础模型",
          "迁移价值：音频条件和外观条件可作为独立Template Model灵活组合，支持多条件舞蹈生成"
        ],
        href: "https://arxiv.org/abs/2604.24351",
        paperLink: "Diffusion Templates: A Unified Plugin Framework for Controllable Diffusion",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "OmniShotCut：基于Shot-Query Transformer的全关系镜头边界检测",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2604.24762",
        description: "将镜头边界检测建模为结构化关系预测，通过合成过渡数据生成和密集视频Transformer实现精确切分，可用于舞蹈动作分段和关键帧提取。",
      },
      {
        num: 6,
        title: "ReVSI：重建视觉空间智能评估以准确衡量VLM的3D推理",
        tag: "3D评估",
        href: "https://arxiv.org/abs/2604.24300",
        description: "通过重新标注3D场景和严格的人工验证，构建更可靠的视觉空间智能基准，为舞蹈动作的空间合理性评估提供参考框架。",
      },
      {
        num: 7,
        title: "Perceval：以感知为中心的过程奖励模型改进视觉语言模型",
        tag: "VLM / 奖励模型",
        href: "https://arxiv.org/abs/2604.24583",
        description: "提出token级错误定位的过程奖励模型，通过提取图像相关声明并与视觉证据对比，可用于改进music-to-dance中的细粒度视觉-音频对齐质量评估。",
      },
      {
        num: 8,
        title: "VLA安全：视觉-语言-动作模型的威胁、挑战、评估与机制综述",
        tag: "安全 / 综述",
        href: "https://arxiv.org/abs/2604.23775",
        description: "系统综述VLA模型在训练时和推理时的安全威胁与防御机制，对部署music-to-dance系统时的内容安全控制具有参考价值。",
      },
      {
        num: 9,
        title: "PushupBench：VLM在重复计数任务上的能力评估",
        tag: "视频理解 / 时序",
        href: "https://arxiv.org/abs/2604.23407",
        description: "发现视频计数能力是时序推理的代理任务，在计数数据上微调的模型在通用视频理解基准上均有提升，对舞蹈节拍一致性评估有启发。",
      },
      {
        num: 10,
        title: "MMEB-V3：全模态嵌入模型性能差距评估",
        tag: "多模态 / 嵌入",
        href: "https://arxiv.org/abs/2604.23321",
        description: "构建涵盖文本、图像、视频、音频的全模态嵌入基准，发现当前模型在跨模态检索和指令遵循方面存在显著局限，对audio-visual对齐研究有参考意义。",
      },
      {
        num: 11,
        title: "Human-1：印地语全双工对话建模框架",
        tag: "语音 / 对话",
        href: "https://arxiv.org/abs/2604.23295",
        description: "基于Moshi架构适配印地语的全双工语音对话系统，其音频-文本联合建模方法可启发music-to-dance中的音频特征提取和节拍对齐。",
      },
    ],
    observation: "今日论文呈现出强化学习在视觉生成中的渗透趋势：World-R1将Flow-GRPO应用于3D一致性注入，Meta-CoT使用CoT-Editing Consistency Reward优化编辑对齐，两者均展示了奖励驱动训练在细粒度控制上的潜力。对于music-to-dance任务，这意味着可以设计专门的奖励函数来优化舞蹈动作的空间合理性和音乐节拍对齐，而不仅依赖重建损失。同时，Tuna-2的像素级统一架构和Diffusion Templates的模块化控制框架，为构建端到端、多条件可控的舞蹈生成系统提供了可行的技术路径。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "RL-Injected 3D Constraints and Pixel-Level Unified Multimodal Architectures",
    overview: [
      "World-R1 injects 3D geometric consistency into video generation via Flow-GRPO reinforcement learning, enabling world simulation capabilities without architectural modifications",
      "Tuna-2 proposes an encoder-free pixel-level unified multimodal architecture that performs understanding and generation directly in pixel space for end-to-end optimization",
      "Meta-CoT enhances fine-grained understanding and generalization in image editing through meta-task decomposition and CoT-Editing Consistency Reward",
      "Diffusion Templates provides a unified plugin framework supporting modular composition of multiple controls (structure, brightness, color, content reference, etc.)"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation / 3D Consistency",
        title: "World-R1: Reinforcing 3D Constraints for Text-to-Video Generation",
        description: "World-R1 proposes a method to enhance 3D consistency in video generation without modifying model architecture or requiring large-scale 3D datasets. The core innovation leverages the Flow-GRPO reinforcement learning framework, combining pre-trained 3D foundation models (Depth Anything 3) and vision-language models (Qwen3-VL) to build a composite reward function. Specifically, the 3D reward comprises three components: Meta-view Score (rendering from novel views to assess geometric integrity), Rendering Score (perceptual similarity with 3DGS re-rendering), and Trajectory Score (alignment between generated camera motion and instructions). Experiments show that while preserving original visual quality, the method improves 3D reconstruction consistency by 10.23dB (PSNR). For music-to-dance tasks, this paradigm of injecting geometric constraints through reinforcement learning can be directly transferred—by designing reward functions targeting human pose consistency, we can potentially improve spatial rationality and temporal coherence of dance movements without relying on expensive 3D human annotation data.",
        keyPoints: [
          "Flow-GRPO RL framework: Transforms deterministic ODE sampling into stochastic SDE policy, enabling efficient training via group relative policy optimization",
          "Composite 3D reward design: Fuses 3D Gaussian Splatting reconstruction, novel view rendering evaluation, and trajectory alignment without 3D annotated data",
          "Implicit camera conditioning: Embeds camera motion priors into latent space via noise wrapping without training auxiliary networks",
          "Transfer value: Reward-driven geometric consistency injection can be directly applied to dance motion generation, improving spatial rationality of human poses"
        ],
        href: "https://arxiv.org/abs/2604.24764",
        paperLink: "World-R1: Reinforcing 3D Constraints for Text-to-Video Generation",
      },
      {
        num: 2,
        tag: "Multimodal / Unified Architecture",
        title: "Tuna-2: Pixel Embeddings Beat Vision Encoders for Multimodal Understanding and Generation",
        description: "Tuna-2 challenges the conventional wisdom that unified multimodal models must rely on pre-trained vision encoders, proposing a completely encoder-free architecture. The model uses only simple patch embedding layers to convert images into visual tokens, performing multimodal understanding and generation directly in pixel space. For generation tasks, it adopts x-prediction and v-loss flow matching objectives; for understanding tasks, it enhances robustness through masked visual feature learning. Experiments show that after sufficient pre-training, Tuna-2 significantly outperforms the encoder-based variant Tuna-R on fine-grained visual perception tasks (e.g., V*, CountBench) while achieving SOTA on generation benchmarks like GenEval and DPG-Bench. For music-to-dance tasks, this pixel-level unified architecture means audio, visual, and motion can be aligned end-to-end in the same space, avoiding information bottlenecks and modality misalignment issues caused by traditional encoders.",
        keyPoints: [
          "Encoder-free architecture: Completely removes VAE and representation encoders, using simple patch embedding layers for pixel-level unified modeling",
          "Masked visual feature learning: Enhances pixel-space representation robustness by randomly masking patches and predicting complete images",
          "x-prediction flow matching: Directly predicts clean images in pixel space, enabling efficient training through velocity term transformation",
          "Transfer value: End-to-end pixel-level alignment provides a more direct optimization path for joint audio-visual-motion modeling"
        ],
        href: "https://arxiv.org/abs/2604.24763",
        paperLink: "Tuna-2: Pixel Embeddings Beat Vision Encoders for Multimodal Understanding and Generation",
      },
      {
        num: 3,
        tag: "Image Editing / CoT Reasoning",
        title: "Meta-CoT: Enhancing Granularity and Generalization in Image Editing",
        description: "Meta-CoT proposes a hierarchical Chain-of-Thought paradigm that represents any image editing operation as a triplet (Task, Target, Required Understanding Ability). The first-level decomposition (Triplet Decomposition) breaks down editing intent into task summary, task thinking, and target traversal; the second-level decomposition (Meta-task Decomposition) further categorizes tasks into five meta-tasks (Addition, Deletion, Replacement, Camera Motion, Position Change). Experiments show that training on only 5 meta-tasks can generalize to 21 editing tasks with 15.8% overall performance improvement. Additionally, the CoT-Editing Consistency Reward uses VLM to assess alignment between CoT reasoning and editing results, further optimizing Flow-GRPO training. For music-to-dance tasks, this meta-task decomposition approach can be used to break down complex dance motion editing into composable atomic action units (e.g., limb addition/deletion, position transformation, camera motion), enhancing controllability and generalization of motion editing.",
        keyPoints: [
          "Triplet decomposition: Represents editing operations as (task, target, understanding ability) for fine-grained reasoning",
          "Meta-task induction: 5 meta-tasks (add, delete, replace, camera motion, position change) combine to cover the entire editing space",
          "CoT-Editing consistency reward: Optimizes GRPO training by using VLM to evaluate alignment between reasoning chains and editing results",
          "Transfer value: Meta-task decomposition paradigm can decompose dance movements into composable atomic operations, enhancing editing controllability"
        ],
        href: "https://arxiv.org/abs/2604.24625",
        paperLink: "Meta-CoT: Enhancing Granularity and Generalization in Image Editing",
      },
      {
        num: 4,
        tag: "Diffusion / Controllable Generation",
        title: "Diffusion Templates: A Unified Plugin Framework for Controllable Diffusion",
        description: "Diffusion Templates addresses the fragmentation and composability challenges of controllable diffusion methods by proposing a unified plugin framework. The core design comprises three components: Template Model maps task-specific inputs to intermediate capability representations (Template Cache), Template Cache serves as a standardized interface for capability injection (supporting heterogeneous carriers like KV-Cache and LoRA), and Template Pipeline handles loading, merging, and injecting multiple Template Caches into the base diffusion model. Based on this framework, the authors trained and open-sourced a model zoo covering structural control (depth/pose/normal), brightness/color adjustment, image editing, super-resolution, sharpness enhancement, aesthetic alignment, content reference, local inpainting, and age control. For music-to-dance tasks, the modular design of this framework allows audio control (beat, style) and appearance control (reference person) to be trained and composed as independent Template Models, enabling flexible configuration for multi-conditional generation.",
        keyPoints: [
          "Unified plugin interface: Encapsulates controllable capabilities as Template Models, injecting through standardized Template Cache",
          "Heterogeneous carrier support: KV-Cache and LoRA can serve as capability carriers under the same abstraction",
          "Composability: Multiple Template Caches can be jointly effective through concatenation without modifying base models",
          "Transfer value: Audio and appearance conditions can be flexibly composed as independent Template Models for multi-conditional dance generation"
        ],
        href: "https://arxiv.org/abs/2604.24351",
        paperLink: "Diffusion Templates: A Unified Plugin Framework for Controllable Diffusion",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "OmniShotCut: Holistic Relational Shot Boundary Detection with Shot-Query Transformer",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2604.24762",
        description: "Models shot boundary detection as structured relational prediction through synthetic transition data generation and dense video Transformer, applicable to dance motion segmentation and keyframe extraction.",
      },
      {
        num: 6,
        title: "ReVSI: Rebuilding Visual Spatial Intelligence Evaluation for Accurate Assessment of VLM 3D Reasoning",
        tag: "3D Evaluation",
        href: "https://arxiv.org/abs/2604.24300",
        description: "Constructs more reliable visual spatial intelligence benchmarks through re-annotation of 3D scenes and rigorous human verification, providing reference frameworks for evaluating spatial rationality of dance movements.",
      },
      {
        num: 7,
        title: "Perceval: Improving Vision-Language Models with Perception-centric Process Reward Models",
        tag: "VLM / Reward Model",
        href: "https://arxiv.org/abs/2604.24583",
        description: "Proposes a process reward model with token-level error grounding that extracts image-related claims and compares with visual evidence, applicable to improving fine-grained visual-audio alignment quality assessment in music-to-dance.",
      },
      {
        num: 8,
        title: "Vision-Language-Action Safety: Threats, Challenges, Evaluations, and Mechanisms",
        tag: "Safety / Survey",
        href: "https://arxiv.org/abs/2604.23775",
        description: "Comprehensive survey of safety threats and defense mechanisms for VLA models during training and inference, valuable for content safety control when deploying music-to-dance systems.",
      },
      {
        num: 9,
        title: "PushupBench: Your VLM is not good at counting pushups",
        tag: "Video / Temporal",
        href: "https://arxiv.org/abs/2604.23407",
        description: "Discovers that video counting capability is a proxy for temporal reasoning, with models fine-tuned on counting data showing improvements on general video understanding benchmarks,启发 for dance beat consistency evaluation.",
      },
      {
        num: 10,
        title: "MMEB-V3: Measuring the Performance Gaps of Omni-Modality Embedding Models",
        tag: "Multimodal / Embedding",
        href: "https://arxiv.org/abs/2604.23321",
        description: "Constructs full-modality embedding benchmarks covering text, image, video, and audio, revealing significant limitations in cross-modal retrieval and instruction following, valuable for audio-visual alignment research.",
      },
      {
        num: 11,
        title: "Human-1: A Full-Duplex Conversational Modeling Framework in Hindi",
        tag: "Speech / Dialogue",
        href: "https://arxiv.org/abs/2604.23295",
        description: "Full-duplex speech dialogue system for Hindi based on Moshi architecture, whose audio-text joint modeling approach can inspire audio feature extraction and beat alignment in music-to-dance.",
      },
    ],
    observation: "Today's papers reveal a trend of reinforcement learning penetrating visual generation: World-R1 applies Flow-GRPO to 3D consistency injection, while Meta-CoT uses CoT-Editing Consistency Reward to optimize editing alignment—both demonstrating the potential of reward-driven training for fine-grained control. For music-to-dance tasks, this implies we can design specialized reward functions to optimize spatial rationality and music beat alignment of dance movements, rather than relying solely on reconstruction losses. Meanwhile, Tuna-2's pixel-level unified architecture and Diffusion Templates' modular control framework provide viable technical paths for building end-to-end, multi-condition controllable dance generation systems.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-28`,
        'en': `/en/daily/music-to-dance/2026-04-28`,
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
      date="2026-04-28"
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