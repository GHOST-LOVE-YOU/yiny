import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "流式视频生成的可靠性蒸馏与测试时缩放新进展",
    overview: [
      "Stream-R1 提出可靠性-困惑度感知的奖励蒸馏框架，通过自适应重加权机制解决流式视频生成中的监督信号质量问题",
      "Stream-T1 首次将 Test-Time Scaling 引入流式视频生成，通过噪声传播、奖励剪枝和记忆下沉实现长时序一致性",
      "LIVEditor 的 In-Context Sparse Attention 为参考图外观保持提供高效的注意力机制新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "流式视频生成",
        title: "Stream-R1: 可靠性-困惑度感知的流式视频生成奖励蒸馏",
        description: "Stream-R1 针对自回归流式视频扩散模型中的蒸馏加速问题，提出了一个突破性的可靠性-困惑度感知框架。该方法识别出传统 DMD（Distribution Matching Distillation）的两个关键缺陷：一是不同 rollout 之间的监督信号可靠性差异（Inter-Reliability），二是每个 rollout 内部时空区域的质量提升潜力差异（Intra-Perplexity）。为此，Stream-R1 引入单一预训练视频奖励模型，在 rollout 级别通过奖励分数的指数函数重加权损失，使高质量样本主导梯度信号；在时空元素级别通过奖励梯度提取像素级显著性，将优化压力集中在质量提升潜力最大的区域。该方法在视觉质量、运动质量和文本对齐三个维度上均取得一致改进，且无需修改学生模型架构、不增加推理开销。对于 music-to-dance 任务，这一框架可直接迁移用于提升长舞蹈视频生成的时序一致性和动作质量。",
        keyPoints: [
          "提出 Inter-Reliability 和 Intra-Perplexity 两个核心维度，重新形式化流式视频蒸馏问题",
          "单一奖励模型同时驱动 rollout 级重加权和像素级显著性提取，实现高效的双重优化",
          "自适应平衡机制防止单一质量维度主导训练，确保视觉、运动和文本对齐的协同提升"
        ],
        href: "https://arxiv.org/abs/2605.03849",
        paperLink: "Stream-R1: Reliability-Perplexity Aware Reward Distillation for Streaming Video Generation",
      },
      {
        num: 2,
        tag: "测试时缩放",
        title: "Stream-T1: 流式视频生成的测试时缩放框架",
        description: "Stream-T1 是首个专为流式视频生成设计的 Test-Time Scaling（TTS）综合框架。与基于扩散模型的 TTS 方法相比，流式生成的分块合成和少步去噪特性天然适合 TTS，能显著降低计算开销并实现细粒度时序控制。Stream-T1 包含三个核心组件：Stream-Scaled Noise Propagation 通过球面插值将历史高质量噪声轨迹传播到当前块初始化，建立时序依赖；Stream-Scaled Reward Pruning 结合即时短期评估和滑动窗口长期评估，在局部空间美学和全局时序连贯性之间取得平衡；Stream-Scaled Memory Sinking 根据奖励反馈动态将 KV-cache 驱逐的上下文路由到不同更新路径（丢弃、EMA-Sink 或 Append-Sink），实现短期连续性与长期记忆保存的解耦。在 5s 和 30s 视频基准测试中，Stream-T1 显著提升了时序一致性、运动平滑度和帧级视觉质量。",
        keyPoints: [
          "首次将 TTS 范式引入流式视频生成，利用分块合成特性构建浅而宽的搜索树",
          "噪声传播机制通过历史高斯先验指导当前生成，确保块间平滑过渡",
          "动态记忆下沉根据语义边界检测自适应管理 KV-cache，解决长视频全局一致性问题"
        ],
        href: "https://arxiv.org/abs/2605.04461",
        paperLink: "Stream-T1: Test-Time Scaling for Streaming Video Generation",
      },
      {
        num: 3,
        tag: "视频编辑",
        title: "LIVEditor: 基于 In-Context 稀疏注意力的闪电视频编辑",
        description: "LIVEditor 针对 In-Context Learning（ICL）视频编辑中的二次方注意力计算瓶颈，提出了首个近无损的稀疏注意力框架 ISA（In-context Sparse Attention）。核心发现包括：上下文 token 的注意力显著性显著低于源 token；Query 尖锐度与 0 阶泰勒展开的近似误差成正比。基于这些洞察，ISA 首先通过预选择策略剪枝冗余上下文 token，然后采用动态查询分组机制：高尖锐度查询使用全注意力，低尖锐度查询使用计算高效的 0 阶泰勒稀疏注意力。该方法将注意力模块延迟降低约 60%，同时在 EditVerseBench、IVE-Bench 和 VIE-Bench 上超越 SOTA 方法。对于 music-to-dance 任务，ISA 的高效注意力机制可为参考人物图的外观保持提供新思路，与现有的 patch-shuffling 策略形成互补。",
        keyPoints: [
          "理论证明 Query 尖锐度与近似误差的相关性，为动态查询分组提供依据",
          "预选择策略剪枝低显著性上下文 token，动态分组实现近无损加速",
          "构建 170 万高质量视频编辑对数据集，覆盖风格迁移、对象替换等任务"
        ],
        href: "https://arxiv.org/abs/2605.04569",
        paperLink: "Lightning Unified Video Editing via In-Context Sparse Attention",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "PhysForge: 面向交互虚拟世界的物理感知 3D 资产生成",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2605.05163",
        description: "提出解耦的两阶段框架生成物理感知的 3D 交互资产，VLM 作为物理架构师规划层次化物理蓝图，物理感知扩散模型通过 KineVoxel Injection 机制实现。可为舞蹈动作生成提供物理合理性约束。",
      },
      {
        num: 5,
        title: "JoyAI-Image: 唤醒空间智能的统一多模态理解与生成模型",
        tag: "多模态",
        href: "https://arxiv.org/abs/2605.04128",
        description: "将空间增强的 MLLM 与 MMDiT 耦合，通过共享多模态接口实现感知与生成的双向交互。其空间编辑信号和几何感知推理可为 audio-visual 联合建模提供架构参考。",
      },
      {
        num: 6,
        title: "WorldJen: 生成式视频模型的端到端多维基准测试",
        tag: "评测",
        href: "https://arxiv.org/abs/2605.03475",
        description: "用 Likert 量表问卷替代二元 VQA，通过 VLM 在原生分辨率下评分，同时测试 16 个质量维度。为 music-to-dance 视频质量评估（特别是时序一致性维度）提供方法论参考。",
      },
      {
        num: 7,
        title: "UniReasoner: 利用 LLM 作为视觉生成的通用推理器",
        tag: "LLM 推理",
        href: "https://arxiv.org/abs/2605.04040",
        description: "提出理解-生成差距的形式化定义，利用 LLM 生成粗略视觉草稿并执行自我批评，将验证能力转化为生成指导。其 self-critique 机制可借鉴用于音频到舞蹈动作的语义对齐验证。",
      },
    ],
    observation: "本周论文呈现出流式视频生成（Streaming Video Generation）成为长视频合成主流范式的趋势。Stream-R1 和 Stream-T1 分别从训练阶段（可靠性感知蒸馏）和推理阶段（测试时缩放）两个互补角度提升流式生成质量，两者结合可能是未来长舞蹈视频生成的关键路径。同时，稀疏注意力机制（ISA）和物理感知生成（PhysForge）为效率优化和动作合理性提供了基础设施支持。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Advances in Reliable Distillation and Test-Time Scaling for Streaming Video Generation",
    overview: [
      "Stream-R1 proposes a reliability-perplexity aware reward distillation framework that addresses supervision signal quality in streaming video generation through adaptive reweighting",
      "Stream-T1 pioneers Test-Time Scaling for streaming video generation, achieving long-term temporal coherence through noise propagation, reward pruning, and memory sinking",
      "LIVEditor's In-Context Sparse Attention offers a new efficient attention mechanism for reference image appearance preservation"
    ],
    papers: [
      {
        num: 1,
        tag: "Streaming Video Generation",
        title: "Stream-R1: Reliability-Perplexity Aware Reward Distillation for Streaming Video Generation",
        description: "Stream-R1 addresses the distillation acceleration problem in autoregressive streaming video diffusion models with a breakthrough reliability-perplexity aware framework. The method identifies two key limitations of traditional DMD (Distribution Matching Distillation): Inter-Reliability (variations in supervision signal reliability across different rollouts) and Intra-Perplexity (variations in quality improvement potential across spatiotemporal regions within each rollout). To address these, Stream-R1 introduces a single pretrained video reward model that reweights losses via exponential reward scores at the rollout level, allowing high-quality samples to dominate gradient signals; and extracts pixel-level saliency through reward gradients at the spatiotemporal element level, concentrating optimization pressure on regions with the highest quality improvement potential. The method achieves consistent improvements across visual quality, motion quality, and text alignment dimensions without modifying the student model architecture or increasing inference overhead. For music-to-dance tasks, this framework can be directly transferred to improve temporal consistency and motion quality in long dance video generation.",
        keyPoints: [
          "Proposes Inter-Reliability and Intra-Perplexity as two core dimensions, reformulating the streaming video distillation problem",
          "A single reward model drives both rollout-level reweighting and pixel-level saliency extraction, enabling efficient dual optimization",
          "Adaptive balancing mechanism prevents any single quality dimension from dominating training, ensuring coordinated improvement of visual, motion, and text alignment aspects"
        ],
        href: "https://arxiv.org/abs/2605.03849",
        paperLink: "Stream-R1: Reliability-Perplexity Aware Reward Distillation for Streaming Video Generation",
      },
      {
        num: 2,
        tag: "Test-Time Scaling",
        title: "Stream-T1: Test-Time Scaling for Streaming Video Generation",
        description: "Stream-T1 is the first comprehensive Test-Time Scaling (TTS) framework specifically designed for streaming video generation. Compared to diffusion-based TTS methods, streaming generation's chunk-level synthesis and few-step denoising characteristics are naturally suited for TTS, significantly reducing computational overhead while enabling fine-grained temporal control. Stream-T1 comprises three core components: Stream-Scaled Noise Propagation establishes temporal dependencies by propagating historical high-quality noise trajectories to current chunk initialization through spherical interpolation; Stream-Scaled Reward Pruning balances local spatial aesthetics and global temporal coherence by combining immediate short-term assessments with sliding-window long-term evaluations; Stream-Scaled Memory Sinking dynamically routes context evicted from KV-cache to different update pathways (Discard, EMA-Sink, or Append-Sink) based on reward feedback, decoupling short-term continuity from long-term memory preservation. On 5s and 30s video benchmarks, Stream-T1 significantly improves temporal consistency, motion smoothness, and frame-level visual quality.",
        keyPoints: [
          "First to introduce the TTS paradigm to streaming video generation, leveraging chunk-level synthesis to build a shallow but wide search tree",
          "Noise propagation mechanism guides current generation through historical Gaussian priors, ensuring smooth transitions between chunks",
          "Dynamic memory sinking adaptively manages KV-cache based on semantic boundary detection, solving global consistency issues in long videos"
        ],
        href: "https://arxiv.org/abs/2605.04461",
        paperLink: "Stream-T1: Test-Time Scaling for Streaming Video Generation",
      },
      {
        num: 3,
        tag: "Video Editing",
        title: "LIVEditor: Lightning Unified Video Editing via In-Context Sparse Attention",
        description: "LIVEditor addresses the quadratic attention computation bottleneck in In-Context Learning (ICL) video editing by proposing the first near-lossless sparse attention framework called ISA (In-context Sparse Attention). Key findings include: context tokens have significantly lower attention saliency than source tokens; Query sharpness is proportional to the approximation error of 0-th order Taylor expansion. Based on these insights, ISA first prunes redundant context tokens through a pre-selection strategy, then employs a dynamic query grouping mechanism: high-sharpness queries use full attention while low-sharpness queries use computationally efficient 0-th order Taylor sparse attention. This method reduces attention module latency by approximately 60% while surpassing SOTA methods on EditVerseBench, IVE-Bench, and VIE-Bench. For music-to-dance tasks, ISA's efficient attention mechanism offers new ideas for reference image appearance preservation, complementing existing patch-shuffling strategies.",
        keyPoints: [
          "Theoretically proves the correlation between Query sharpness and approximation error, providing basis for dynamic query grouping",
          "Pre-selection strategy prunes low-saliency context tokens, dynamic grouping achieves near-lossless acceleration",
          "Constructs a 1.7M high-quality video editing pair dataset covering style transfer, object swapping, and other tasks"
        ],
        href: "https://arxiv.org/abs/2605.04569",
        paperLink: "Lightning Unified Video Editing via In-Context Sparse Attention",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "PhysForge: Generating Physics-Grounded 3D Assets for Interactive Virtual Worlds",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2605.05163",
        description: "Proposes a decoupled two-stage framework for generating physics-grounded interactive 3D assets. VLM acts as a physical architect planning hierarchical physical blueprints, while a physics-grounded diffusion model implements them via KineVoxel Injection. Can provide physical plausibility constraints for dance motion generation.",
      },
      {
        num: 5,
        title: "JoyAI-Image: Awaking Spatial Intelligence in Unified Multimodal Understanding and Generation",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2605.04128",
        description: "Couples a spatially enhanced MLLM with MMDiT, enabling bidirectional interaction between perception and generation through a shared multimodal interface. Its spatial editing signals and geometry-aware reasoning provide architectural references for audio-visual joint modeling.",
      },
      {
        num: 6,
        title: "WorldJen: An End-to-End Multi-Dimensional Benchmark for Generative Video Models",
        tag: "Evaluation",
        href: "https://arxiv.org/abs/2605.03475",
        description: "Replaces binary VQA with Likert-scale questionnaires scored by VLM at native resolution, testing 16 quality dimensions simultaneously. Provides methodological references for music-to-dance video quality evaluation, particularly the temporal consistency dimension.",
      },
      {
        num: 7,
        title: "UniReasoner: Large Language Models are Universal Reasoners for Visual Generation",
        tag: "LLM Reasoning",
        href: "https://arxiv.org/abs/2605.04040",
        description: "Formalizes the understanding-generation gap, leveraging LLM to generate coarse visual drafts and perform self-critique, converting verification capability into generation guidance. Its self-critique mechanism can be adapted for semantic alignment verification from audio to dance motion.",
      },
    ],
    observation: "This week's papers demonstrate the emerging trend of Streaming Video Generation as the mainstream paradigm for long video synthesis. Stream-R1 and Stream-T1 improve streaming generation quality from complementary angles—training phase (reliability-aware distillation) and inference phase (test-time scaling)—and their combination may be the key path forward for long dance video generation. Meanwhile, sparse attention mechanisms (ISA) and physics-aware generation (PhysForge) provide infrastructure support for efficiency optimization and motion plausibility.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-07`,
        'en': `/en/daily/music-to-dance/2026-05-07`,
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
      date="2026-05-07"
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
