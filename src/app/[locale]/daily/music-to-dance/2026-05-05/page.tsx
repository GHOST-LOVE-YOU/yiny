import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "扩散模型多模态统一框架与运动感知加速",
    overview: [
      "UniVidX 提出统一多模态视频生成框架，通过 SCM、DGL 和 CMSA 三大设计实现任意模态间的灵活生成",
      "MotionCache 利用帧间差异作为运动代理，实现细粒度 token 级缓存加速，在 SkyReels-V2 上达到 6.28 倍加速",
      "SignVerse-2M 构建大规模姿势原生数据集，DWPose 统一表示为姿势驱动生成提供标准化接口"
    ],
    papers: [
      {
        num: 1,
        tag: "多模态生成",
        title: "UniVidX：基于扩散先验的统一多模态视频生成框架",
        description: "UniVidX 是一个统一的多模态视频生成框架，核心创新包括三项设计：(1) Stochastic Condition Masking (SCM) 随机将模态划分为干净条件和噪声目标，实现全向条件生成而非固定映射，支持 Text→X、X→X、Text&X→X 三种范式；(2) Decoupled Gated LoRA (DGL) 为每种模态分配独立的 LoRA 适配器，仅在作为生成目标时激活，避免参数干扰同时保留 VDM 原生先验；(3) Cross-Modal Self-Attention (CMSA) 在自注意力中共享 keys/values 而保持 queries 模态特定，促进跨模态信息交换和对齐。该框架在 <1k 视频训练数据下即可实现野外场景鲁棒泛化，为 music-to-dance 的音频-视觉对齐提供了可迁移的技术路径——CMSA 机制可直接扩展为 3D Audio Attention 的跨模态交互方案。",
        keyPoints: [
          "SCM 随机条件掩码实现全向生成，打破固定输入输出映射限制",
          "DGL 解耦门控 LoRA 在适配多模态分布的同时保留预训练 VDM 先验",
          "CMSA 跨模态自注意力共享 KV 而保持 Q 模态特定，实现细粒度跨模态对齐"
        ],
        href: "https://arxiv.org/abs/2605.00658",
        paperLink: "UniVidX: A Unified Multimodal Framework for Versatile Video Generation via Diffusion Priors",
      },
      {
        num: 2,
        tag: "推理加速",
        title: "MotionCache：运动感知缓存加速自回归视频生成",
        description: "MotionCache 针对自回归视频生成的迭代去噪计算瓶颈，提出基于运动感知的细粒度缓存框架。核心理论贡献包括：(1) 证明缓存误差与残差不稳定性严格成正比，建立残差不一致原理（Residual Inconsistency Principle）；(2) 提出运动诱导残差不稳定性引理，证明帧间差异是残差不稳定性的数学上界；(3) 基于上述理论，设计运动感知 token 重要性评分机制，将帧间 L1 差异作为轻量级运动代理。实验表明，在 SkyReels-V2 上实现 6.28 倍加速（PSNR 23.46），在 MAGI-1 上实现 1.64 倍加速，显著优于 TeaCache 和 FlowCache。粗到细策略先通过 warmup 阶段建立语义一致性，再基于运动特征动态分配计算资源——高运动区域优先更新，静态背景积极复用缓存。",
        keyPoints: [
          "残差不一致原理：缓存误差与相邻 timestep 残差差异严格成正比",
          "帧间差异作为运动代理，NDCG > 0.94 验证其与真实残差重要性的高保真排序一致性",
          "粗到细推理调度：warmup 阶段建立结构完整性，后续 token 级运动加权缓存复用"
        ],
        href: "https://arxiv.org/abs/2605.01725",
        paperLink: "Motion-Aware Caching for Efficient Autoregressive Video Generation",
      },
      {
        num: 3,
        tag: "姿势驱动数据集",
        title: "SignVerse-2M：25+ 手语的大规模姿势原生数据集",
        description: "SignVerse-2M 是首个面向现代姿势驱动生成范式的大规模多语言手语数据集，包含约 200 万片段覆盖 25+ 手语。核心贡献在于构建与 DWPose 标准化接口兼容的姿势原生表示：(1) 统一使用 DWPose 从原始视频提取 2D 姿势序列，减少外观变化（背景、服装、身份）干扰，将焦点重新聚焦于手部、身体和上半身运动本身；(2) 提供标准化的姿势-姿势、姿势-视频生成接口，与 ControlNet、pose-to-video 等主流生成范式直接兼容；(3) 保留真实世界视频的录制条件和说话人多样性，而非实验室理想环境。该数据集的定位不是另一个视频-文本平行语料库，而是为生成任务重构数据表示、任务接口和评估对象。对于 music-to-dance 研究，SignVerse-2M 展示了姿势作为中间控制空间的价值——可与当前 patch-shuffling 外观迁移方案结合，探索姿势-外观解耦的舞蹈生成范式。",
        keyPoints: [
          "DWPose 统一表示成为姿势驱动生成的标准化接口，与 ControlNet 等主流框架兼容",
          "姿势原生表示减少外观变化干扰，支持跨语言统一训练和标准化评估",
          "200 万片段覆盖 25+ 手语，为姿势空间建模提供大规模真实世界数据"
        ],
        href: "https://arxiv.org/abs/2605.01720",
        paperLink: "SignVerse-2M: A Two-Million-Clip Pose-Native Universe of 25+ Sign Languages",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "VideoNet：领域特定动作识别的大规模基准",
        tag: "动作识别",
        href: "https://arxiv.org/abs/2605.02834",
        description: "涵盖 37 个领域 1000 种动作的识别基准，舞蹈动作理解可参考其领域特定动作建模方法。",
      },
      {
        num: 5,
        title: "WeightFormer：无显式注意力的线性时间全局视觉建模",
        tag: "高效注意力",
        href: "https://arxiv.org/abs/2605.01711",
        description: "动态参数化替代显式注意力实现线性复杂度，可优化 3D Audio Attention 的计算效率。",
      },
      {
        num: 6,
        title: "VideoThinker：因果启发的视频推理去偏优化",
        tag: "鲁棒训练",
        href: "https://arxiv.org/abs/2605.01324",
        description: "CDPO 算法通过排斥目标推动模型远离偏差逻辑，可减少舞蹈生成中训练数据的感知偏差。",
      },
      {
        num: 7,
        title: "Persistent Visual Memory：长序列视觉感知持久化",
        tag: "视觉一致性",
        href: "https://arxiv.org/abs/2605.00814",
        description: "PVM 模块抵抗长度诱导的视觉信号衰减，对长舞蹈视频生成中的身份保持具有启发意义。",
      },
      {
        num: 8,
        title: "GameScope：游戏视频质量评估基准",
        tag: "质量评估",
        href: "https://arxiv.org/abs/2605.01272",
        description: "多属性多编码器游戏视频质量数据集，其评估方法论可参考用于舞蹈生成质量评估。",
      },
    ],
    observation: "今日论文呈现出视频生成领域的三个技术趋势：(1) 多模态统一框架成为主流，UniVidX 的 SCM+DGL+CMSA 组合展示了如何在不破坏预训练先验的前提下实现灵活的条件生成，这对 music-to-dance 的音频-视觉-外观三模态对齐具有直接参考价值；(2) 运动感知计算优化受到关注，MotionCache 从理论层面建立缓存误差与运动动态的联系，为舞蹈视频这类高运动内容的高效生成提供了可量化的优化路径；(3) 姿势作为中间表示的标准化趋势明显，SignVerse-2M 采用 DWPose 作为统一接口，预示着姿势驱动生成正从研究原型走向标准化基础设施。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Unified Multimodal Framework & Motion-Aware Acceleration for Diffusion Models",
    overview: [
      "UniVidX proposes a unified multimodal video generation framework achieving flexible generation across arbitrary modalities via SCM, DGL, and CMSA designs",
      "MotionCache leverages inter-frame differences as motion proxies for fine-grained token-level caching, achieving 6.28× speedup on SkyReels-V2",
      "SignVerse-2M constructs a large-scale pose-native dataset with DWPose unified representation providing standardized interfaces for pose-driven generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Multimodal Generation",
        title: "UniVidX: Unified Multimodal Framework for Versatile Video Generation via Diffusion Priors",
        description: "UniVidX is a unified multimodal video generation framework with three core innovations: (1) Stochastic Condition Masking (SCM) randomly partitions modalities into clean conditions and noisy targets, enabling omni-directional conditional generation across Text→X, X→X, and Text&X→X paradigms; (2) Decoupled Gated LoRA (DGL) assigns independent LoRA adapters per modality, activated only when serving as generation targets, preventing parameter interference while preserving VDM priors; (3) Cross-Modal Self-Attention (CMSA) shares keys/values across modalities while keeping queries modality-specific, facilitating cross-modal information exchange and alignment. The framework achieves robust in-the-wild generalization with <1k training videos, offering a transferable technical path for music-to-dance audio-visual alignment—the CMSA mechanism can be directly extended as a cross-modal interaction scheme for 3D Audio Attention.",
        keyPoints: [
          "SCM stochastic condition masking enables omni-directional generation, breaking fixed input-output mapping constraints",
          "DGL decoupled gated LoRA adapts to multimodal distributions while preserving pretrained VDM priors",
          "CMSA cross-modal self-attention shares KV while keeping Q modality-specific, achieving fine-grained cross-modal alignment"
        ],
        href: "https://arxiv.org/abs/2605.00658",
        paperLink: "UniVidX: A Unified Multimodal Framework for Versatile Video Generation via Diffusion Priors",
      },
      {
        num: 2,
        tag: "Inference Acceleration",
        title: "MotionCache: Motion-Aware Caching for Efficient Autoregressive Video Generation",
        description: "MotionCache addresses the iterative denoising bottleneck in autoregressive video generation through a motion-aware fine-grained caching framework. Key theoretical contributions include: (1) proving caching error is strictly proportional to residual instability, establishing the Residual Inconsistency Principle; (2) proposing the Motion-Induced Residual Instability lemma, proving frame differences serve as a mathematical upper bound for residual instability; (3) designing a motion-aware token importance scoring mechanism using inter-frame L1 differences as lightweight motion proxies. Experiments demonstrate 6.28× speedup on SkyReels-V2 (PSNR 23.46) and 1.64× on MAGI-1, significantly outperforming TeaCache and FlowCache. The coarse-to-fine strategy first establishes semantic coherence via warmup, then dynamically allocates computation based on motion characteristics—prioritizing updates for high-motion regions while aggressively reusing cache for static backgrounds.",
        keyPoints: [
          "Residual Inconsistency Principle: caching error is strictly proportional to residual differences between adjacent timesteps",
          "Inter-frame differences as motion proxies, NDCG > 0.94 validates high-fidelity ranking consistency with true residual importance",
          "Coarse-to-fine inference schedule: warmup phase establishes structural integrity, followed by token-level motion-weighted cache reuse"
        ],
        href: "https://arxiv.org/abs/2605.01725",
        paperLink: "Motion-Aware Caching for Efficient Autoregressive Video Generation",
      },
      {
        num: 3,
        tag: "Pose-Driven Dataset",
        title: "SignVerse-2M: A Two-Million-Clip Pose-Native Universe of 25+ Sign Languages",
        description: "SignVerse-2M is the first large-scale multilingual sign language dataset designed for modern pose-driven generation paradigms, comprising ~2M clips across 25+ sign languages. The core contribution lies in constructing a pose-native representation compatible with the standardized DWPose interface: (1) unified 2D pose sequence extraction via DWPose reduces appearance variation (background, clothing, identity) interference, refocusing on hand, body, and upper-body motions; (2) provides standardized pose-to-pose and pose-to-video generation interfaces directly compatible with mainstream paradigms like ControlNet; (3) preserves real-world recording conditions and speaker diversity rather than laboratory idealizations. The dataset's positioning is not another video-text parallel corpus, but a reconstruction of data representation, task interfaces, and evaluation objects for generation tasks. For music-to-dance research, SignVerse-2M demonstrates the value of pose as an intermediate control space—combinable with current patch-shuffling appearance migration schemes to explore pose-appearance decoupled dance generation paradigms.",
        keyPoints: [
          "DWPose unified representation becomes the standardized interface for pose-driven generation, compatible with mainstream frameworks like ControlNet",
          "Pose-native representation reduces appearance variation interference, supporting cross-lingual unified training and standardized evaluation",
          "2M clips covering 25+ sign languages provide large-scale real-world data for pose-space modeling"
        ],
        href: "https://arxiv.org/abs/2605.01720",
        paperLink: "SignVerse-2M: A Two-Million-Clip Pose-Native Universe of 25+ Sign Languages",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "VideoNet: Large-Scale Dataset for Domain-Specific Action Recognition",
        tag: "Action Recognition",
        href: "https://arxiv.org/abs/2605.02834",
        description: "Benchmark covering 1000 actions across 37 domains; domain-specific action modeling approaches are relevant for dance motion understanding.",
      },
      {
        num: 5,
        title: "WeightFormer: Linear-Time Global Visual Modeling without Explicit Attention",
        tag: "Efficient Attention",
        href: "https://arxiv.org/abs/2605.01711",
        description: "Dynamic parameterization replaces explicit attention with linear complexity, potentially optimizing 3D Audio Attention computational efficiency.",
      },
      {
        num: 6,
        title: "VideoThinker: Causal-Inspired Debiasing for Video Reasoning",
        tag: "Robust Training",
        href: "https://arxiv.org/abs/2605.01324",
        description: "CDPO algorithm pushes models away from bias logic via repulsive objectives, potentially reducing perceptual biases in dance generation training data.",
      },
      {
        num: 7,
        title: "Persistent Visual Memory: Sustaining Perception for Deep Generation",
        tag: "Visual Consistency",
        href: "https://arxiv.org/abs/2605.00814",
        description: "PVM module resists length-induced visual signal decay, offering insights for identity preservation in long dance video generation.",
      },
      {
        num: 8,
        title: "GameScope: Gaming Video Quality Assessment Benchmark",
        tag: "Quality Assessment",
        href: "https://arxiv.org/abs/2605.01272",
        description: "Multi-attribute multi-codec gaming video quality dataset; assessment methodology is referenceable for dance generation quality evaluation.",
      },
    ],
    observation: "Today's papers reveal three technical trends in video generation: (1) Unified multimodal frameworks are becoming mainstream—UniVidX's SCM+DGL+CMSA combination demonstrates how to achieve flexible conditional generation without destroying pretrained priors, offering direct reference value for music-to-dance audio-visual-appearance three-modal alignment; (2) Motion-aware computational optimization is gaining attention—MotionCache establishes theoretical connections between caching error and motion dynamics from first principles, providing quantifiable optimization paths for efficient generation of high-motion content like dance videos; (3) Standardization of pose as intermediate representation is evident—SignVerse-2M's adoption of DWPose as a unified interface signals that pose-driven generation is transitioning from research prototypes to standardized infrastructure.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-05`,
        'en': `/en/daily/music-to-dance/2026-05-05`,
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
      date="2026-05-05"
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
