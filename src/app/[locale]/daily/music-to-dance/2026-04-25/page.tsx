import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "时间流控制与运动理解的突破",
    overview: [
      "LLaDA2.0-Uni 提出统一离散扩散框架，其 block-level masked diffusion 机制可为舞蹈视频生成提供更高效的音频-视觉对齐",
      "Seeing Fast and Slow 实现视频速度估计与速度条件生成，为舞蹈节奏控制提供精确的时间流操控能力",
      "Structured Motion Description 将人体运动转化为结构化文本描述，可直接改进舞蹈动作的理解与生成"
    ],
    papers: [
      {
        num: 1,
        tag: "统一生成框架",
        title: "LLaDA2.0-Uni：统一多模态理解与生成的离散扩散大模型",
        description: "LLaDA2.0-Uni 提出了一种原生集成的统一框架，通过 SigLIP-VQ 语义离散 tokenizer 将连续视觉输入离散化，实现文本和视觉输入在骨干网络中的 block-level masked diffusion。其核心创新在于：1) 使用纯语义表示而非重建式 VQ-VAE，保留关键细节并支持复杂视觉推理；2) 采用 MoE 架构的 dLLM 骨干网络，支持模态无关的动态容量分配；3) 专用扩散解码器通过少步蒸馏（8步推理）将语义 token 重建为高保真图像。实验表明，该模型在视觉理解和生成任务上均达到 SOTA 水平，且原生支持交错生成与推理。对于 music-to-dance 任务，其 block-level masked diffusion 机制可用于改进音频-视觉对齐模块，而统一的离散表示有助于实现更精确的外观迁移和动作生成。",
        keyPoints: [
          "SigLIP-VQ tokenizer 将图像转换为完全离散的语义 token，支持动态分辨率处理，codebook 大小为 16,384",
          "16B 参数的 MoE dLLM 骨干网络采用 block-wise attention 平衡训练稳定性与并行解码效率",
          "扩散解码器基于 Z-Image-Base 构建，通过一致性蒸馏实现 8 步 CFG-free 推理",
          "统一框架原生支持交错生成与推理，为音频-动作联合建模提供新思路"
        ],
        href: "https://arxiv.org/abs/2604.20796",
        paperLink: "LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion Large Language Model",
      },
      {
        num: 2,
        tag: "时间流控制",
        title: "Seeing Fast and Slow：学习视频中的时间流",
        description: "该论文首次系统性地研究视频中的时间感知与控制问题。核心贡献包括：1) 利用音频音调变化（时间-频率缩放原理）和自监督等变性约束，训练出能够检测速度变化和估计播放速度的视觉模型；2) 基于速度估计模型自动筛选并标注了 SloMo-44K 数据集（44,632 个慢动作视频片段，1800 万帧），是目前最大规模的通用慢动作数据集；3) 提出速度条件视频生成模型，通过将对数空间的速度桶编码添加到时间步嵌入和帧级特征中，实现对生成视频速度的显式控制（0.01× 到 1.0×）。对于 music-to-dance 任务，该技术可直接用于精确控制舞蹈动作的节奏和速度，实现音频节拍与动作速度的完美同步。",
        keyPoints: [
          "利用音频音调变化提供跨模态监督，训练纯视觉速度变化检测器，准确率达 92.4%",
          "通过时间重采样的等变性约束实现自监督速度估计，Pearson 相关系数达 0.735",
          "SloMo-44K 数据集规模是此前最大数据集的 70 倍，覆盖 10,000+ FPS 的极端慢动作",
          "速度条件生成通过将速度桶编码注入时间步嵌入和帧级特征实现精确控制"
        ],
        href: "https://arxiv.org/abs/2604.21931",
        paperLink: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
      },
      {
        num: 3,
        tag: "运动理解",
        title: "Encoder-Free 人体运动理解：结构化运动描述",
        description: "论文提出 Structured Motion Description (SMD)，一种将关节位置序列确定性转换为结构化自然语言描述的方法。SMD 包含三个部分：1) 基于生物力学标准计算 26 个关节角度（髋、膝、踝、肩、肘等），使用关节局部坐标系和解剖参考平面；2) 提取骨盆轨迹的全局运动描述（前后/左右/高度位移、身体旋转）；3) 对角度和轨迹时间序列进行平滑和峰谷检测，生成 increases/decreases/holds/repeats 等结构化描述。实验表明，SMD 在 BABEL-QA 上达到 66.7% 准确率（超越此前 SOTA 6.6%），在 HuMMan-QA 上达到 90.1%（超越 14.9%），在 HumanML3D 动作描述任务上 CIDEr 达 53.16（超越此前 31%）。对于 music-to-dance 任务，SMD 提供了一种无需学习编码器的人体运动文本化表示，可直接用于改进动作-音频对齐和细粒度动作控制。",
        keyPoints: [
          "基于生物力学标准计算 26 个关节角度，使用关节局部坐标系和解剖参考平面",
          "两阶段分割算法（移动平均滤波 + 峰谷检测）将时间序列压缩为 3-8 个描述性区间",
          "相同文本输入可在 8 个不同 LLM（6 个模型家族）上仅通过轻量级 LoRA 微调工作",
          "人类可读的表示支持可解释的注意力分析，直接显示模型依赖的身体部位"
        ],
        href: "https://arxiv.org/abs/2604.21668",
        paperLink: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Vista4D：基于 4D 点云的视频重拍",
        tag: "4D 重建",
        href: "https://arxiv.org/abs/2604.21915",
        description: "提出基于 4D 点云的视频重拍框架，通过静态像素分割和 4D 重建显式保留内容，支持动态场景扩展和 4D 场景重组。对舞蹈视频的视角控制和场景编辑有参考价值。",
      },
      {
        num: 5,
        title: "精确视频语言构建",
        tag: "视频语言",
        href: "https://arxiv.org/abs/2604.21718",
        description: "提出 CHAI 框架，通过专业视频创作者的反馈构建精确的 video captioning 规范，涵盖主体、场景、运动、空间和相机动态。其运动描述规范可用于改进舞蹈动作的语言控制。",
      },
      {
        num: 6,
        title: "StyleVAR：可控图像风格迁移",
        tag: "风格迁移",
        href: "https://arxiv.org/abs/2604.21052",
        description: "基于 VAR 框架的风格迁移方法，提出 blended cross-attention 机制和 scale-dependent blending 系数。其风格-内容解耦策略可借鉴到舞蹈视频的外观迁移任务。",
      },
      {
        num: 7,
        title: "Sapiens2：高分辨率人体中心视觉模型",
        tag: "人体理解",
        href: "https://arxiv.org/abs/2604.21681",
        description: "10 亿高质量人体图像预训练，在姿态估计（+4 mAP）、身体部位分割（+24.3 mIoU）和法线估计（45.6% 更低角度误差）上达到 SOTA。可为舞蹈动作生成提供更精确的人体结构理解。",
      },
    ],
    observation: "本周论文呈现出三个对 music-to-dance 任务具有直接迁移价值的技术趋势：1) 离散扩散框架的统一化（LLaDA2.0-Uni）为音频-视觉联合建模提供了新的架构范式，其 block-level masked diffusion 机制可能比当前的自回归方法更适合处理音频这种连续时序信号；2) 时间流的显式控制（Seeing Fast and Slow）填补了舞蹈生成中节奏精确控制的空白，其速度条件生成方法可直接用于实现音频节拍与动作速度的同步；3) 运动描述的文本化（SMD）提供了一种无需学习编码器的运动表示方法，这对于需要细粒度动作控制的舞蹈生成任务尤为重要。这三个方向共同指向一个更统一的舞蹈生成框架：使用离散扩散模型联合建模音频和动作，通过显式的时间控制实现节奏同步，并利用结构化的运动描述实现可解释的动作编辑。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Breakthroughs in Temporal Flow Control and Motion Understanding",
    overview: [
      "LLaDA2.0-Uni proposes a unified discrete diffusion framework whose block-level masked diffusion mechanism can improve audio-visual alignment for dance video generation",
      "Seeing Fast and Slow achieves video speed estimation and speed-conditioned generation, providing precise temporal flow control for dance rhythm",
      "Structured Motion Description transforms human motion into structured text descriptions, directly improving dance motion understanding and generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Unified Generation",
        title: "LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation",
        description: "LLaDA2.0-Uni presents a natively integrated unified framework that discretizes continuous visual inputs via SigLIP-VQ semantic tokenizer, enabling block-level masked diffusion for both text and vision inputs. Key innovations: 1) Pure semantic representation (not reconstructive VQ-VAE) preserves crucial details and supports complex visual reasoning; 2) MoE-based dLLM backbone enables modality-agnostic dynamic capacity allocation; 3) Dedicated diffusion decoder reconstructs semantic tokens into high-fidelity images with few-step distillation (8-step inference). The model achieves SOTA on both understanding and generation benchmarks with native support for interleaved generation and reasoning. For music-to-dance, its block-level masked diffusion can improve audio-visual alignment, while unified discrete representation enables more precise appearance transfer and motion generation.",
        keyPoints: [
          "SigLIP-VQ tokenizer converts images to fully discrete semantic tokens with dynamic resolution, codebook size 16,384",
          "16B MoE dLLM backbone uses block-wise attention to balance training stability and parallel decoding",
          "Diffusion decoder based on Z-Image-Base achieves 8-step CFG-free inference via consistency distillation",
          "Unified framework natively supports interleaved generation and reasoning for audio-motion joint modeling"
        ],
        href: "https://arxiv.org/abs/2604.20796",
        paperLink: "LLaDA2.0-Uni: Unifying Multimodal Understanding and Generation with Diffusion Large Language Model",
      },
      {
        num: 2,
        tag: "Temporal Control",
        title: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
        description: "This paper systematically studies time perception and control in videos. Core contributions: 1) Training visual models for speed change detection and playback speed estimation using audio pitch shifts (time-frequency scaling) and self-supervised equivariance constraints; 2) Automatic curation of SloMo-44K dataset (44,632 slow-motion clips, 18M frames), the largest generic slow-motion dataset; 3) Speed-conditioned video generation by encoding logarithmic speed buckets into timestep embeddings and frame-level features, enabling explicit control from 0.01× to 1.0×. For music-to-dance, this enables precise control of dance rhythm and speed, achieving perfect synchronization between audio beats and motion speed.",
        keyPoints: [
          "Audio pitch shifts provide cross-modal supervision for training pure visual speed change detector (92.4% accuracy)",
          "Temporal resampling equivariance enables self-supervised speed estimation (Pearson ρ = 0.735)",
          "SloMo-44K is 70× larger than previous datasets, covering extreme slow-motion up to 10,000+ FPS",
          "Speed conditioning via speed bucket encoding in timestep and frame-level features enables precise control"
        ],
        href: "https://arxiv.org/abs/2604.21931",
        paperLink: "Seeing Fast and Slow: Learning the Flow of Time in Videos",
      },
      {
        num: 3,
        tag: "Motion Understanding",
        title: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
        description: "The paper proposes Structured Motion Description (SMD), a deterministic method converting joint position sequences to structured natural language. SMD has three components: 1) 26 biomechanical joint angles (hip, knee, ankle, shoulder, elbow) computed using joint-local coordinate systems and anatomical reference planes; 2) Global trajectory description from pelvis movement (forward/backward/lateral/height displacement, body rotation); 3) Smoothing and peak-valley detection to generate structured descriptions ('increases/decreases/holds/repeats'). Results: 66.7% on BABEL-QA (+6.6% over SOTA), 90.1% on HuMMan-QA (+14.9%), CIDEr 53.16 on HumanML3D (+31%). For music-to-dance, SMD provides a learned-encoder-free text representation of human motion for improving motion-audio alignment and fine-grained motion control.",
        keyPoints: [
          "26 joint angles computed using biomechanical standards with joint-local coordinate systems",
          "Two-stage segmentation (moving average + peak-valley detection) compresses time series to 3-8 descriptive intervals",
          "Same text input works across 8 LLMs (6 families) with only lightweight LoRA fine-tuning",
          "Human-readable representation enables interpretable attention analysis showing body parts the model relies on"
        ],
        href: "https://arxiv.org/abs/2604.21668",
        paperLink: "Encoder-Free Human Motion Understanding via Structured Motion Descriptions",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Vista4D: Video Reshooting with 4D Point Clouds",
        tag: "4D Reconstruction",
        href: "https://arxiv.org/abs/2604.21915",
        description: "Proposes 4D point cloud-based video reshooting framework with static pixel segmentation and 4D reconstruction. Supports dynamic scene expansion and 4D scene recomposition. Valuable for viewpoint control and scene editing in dance videos.",
      },
      {
        num: 5,
        title: "Building a Precise Video Language",
        tag: "Video Language",
        href: "https://arxiv.org/abs/2604.21718",
        description: "Proposes CHAI framework for precise video captioning through professional video creator feedback, covering subjects, scenes, motion, spatial and camera dynamics. Motion description specifications can improve language control for dance movements.",
      },
      {
        num: 6,
        title: "StyleVAR: Controllable Image Style Transfer",
        tag: "Style Transfer",
        href: "https://arxiv.org/abs/2604.21052",
        description: "VAR-based style transfer with blended cross-attention and scale-dependent blending coefficients. Style-content disentanglement strategy can be adapted for appearance transfer in dance video generation.",
      },
      {
        num: 7,
        title: "Sapiens2: High-Resolution Human-Centric Vision",
        tag: "Human Understanding",
        href: "https://arxiv.org/abs/2604.21681",
        description: "Pretrained on 1B high-quality human images, achieves SOTA on pose estimation (+4 mAP), body-part segmentation (+24.3 mIoU), and normal estimation (45.6% lower angular error). Can provide more precise human structure understanding for dance generation.",
      },
    ],
    observation: "This week's papers reveal three directly transferable trends for music-to-dance: 1) Unified discrete diffusion frameworks (LLaDA2.0-Uni) offer new architectural paradigms for audio-visual joint modeling, where block-level masked diffusion may be more suitable than autoregressive methods for continuous temporal signals like audio; 2) Explicit temporal flow control (Seeing Fast and Slow) fills the gap in precise rhythm control for dance generation, with speed-conditioned generation directly applicable for synchronizing audio beats with motion speed; 3) Textual motion representation (SMD) provides a learned-encoder-free motion representation crucial for fine-grained motion control in dance generation. Together these point toward a more unified dance generation framework: using discrete diffusion for joint audio-motion modeling, explicit temporal control for rhythm synchronization, and structured motion descriptions for interpretable motion editing.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-25`,
        'en': `/en/daily/music-to-dance/2026-04-25`,
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
      date="2026-04-25"
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
