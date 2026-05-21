import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "可控生成与音视频评估：从创意意图到同步质量的系统探索",
    overview: [
      "CogOmniControl 提出 VLM 驱动的创意意图认知框架，将抽象条件转化为密集推理输出",
      "MSAVBench 建立首个多镜头音视频生成评估基准，Spearman 相关系数达 91.5%",
      "Aurora 的 VLM agent 架构与 WavFlow 的原始波形生成方法可直接迁移到 music-to-dance 任务"
    ],
    papers: [
      {
        num: 1,
        tag: "可控视频生成",
        title: "CogOmniControl：通过创意意图认知实现推理驱动的可控视频生成",
        description: "CogOmniControl 针对现有可控视频生成模型难以理解抽象条件（如故事板草图、黏土渲染）的问题，提出将生成过程解耦为「创意意图认知」和「视频生成」两个阶段。第一阶段通过专业动画生产数据微调的 CogVLM 理解多模态输入（参考图、控制视频、文本），输出密集推理结果；第二阶段 CogOmniDiT 通过 in-context 生成统一各类条件，并与 VLM 推理输出对齐。关键创新在于引入强化学习（Holistic Reward + Accuracy Reward）优化 VLM 推理质量，以及通过 CogVLM 规划 evaluator 实现 Best-of-N 选择的闭环架构。",
        keyPoints: [
          "CogVLM 通过 SFT + RFT 两阶段训练，将通用 VLM 转化为专业级创意意图理解器",
          "CogOmniDiT 采用 in-context 生成统一控制条件，通过零时间步调制区分噪声 token 与条件 token",
          "闭环 harness 架构：VLM 推理时规划 evaluator（身份一致性、物理动力学、动作平滑度等），支持 Best-of-N 选择"
        ],
        href: "https://arxiv.org/abs/2605.19995",
        paperLink: "CogOmniControl: Reasoning-Driven Controllable Video Generation via Creative Intent Cognition",
      },
      {
        num: 2,
        tag: "音视频评估",
        title: "MSAVBench：多镜头音视频生成的综合可靠评估基准",
        description: "MSAVBench 是首个针对多镜头音视频（MSAV）生成的综合评估基准，覆盖视频、音频、镜头、参考四个维度。核心贡献包括：自适应自校正机制解决镜头分割错误传播问题；实例级评分标准（rubric-based scoring）将主观维度转化为预定义多选题；工具锚定证据提取（tool-grounded evidence）为复杂判断提供客观依据。评估框架与人类判断的 Spearman 相关系数达 91.5%。对 19 个 SOTA 模型的系统评估揭示：当前系统在导演级控制、细粒度音视频同步方面仍有显著差距，模块化或 agentic 生成管道是缩小开源与闭源差距的有前景路径。",
        keyPoints: [
          "自适应镜头分割自校正机制：VLM 迭代检查边界并调用工具合并/分割片段",
          "细粒度音视频同步评估：LR-ASD + SortFormer + StableSyncNet 组合指标",
          "286 个 prompt、2198 个镜头、最多 15 镜头的复杂叙事结构"
        ],
        href: "https://arxiv.org/abs/2605.20183",
        paperLink: "MSAVBench: Towards Comprehensive and Reliable Evaluation of Multi-Shot Audio-Video Generation",
      },
      {
        num: 3,
        tag: "视频编辑 Agent",
        title: "Aurora：基于工具使用 Agent 的统一视频编辑框架",
        description: "Aurora 针对统一视频编辑模型面临的「条件构造」问题——用户请求往往缺少模型所需的完整条件（参考图、空间掩码、精确指令）——提出将条件构造与视频生成分离的 agentic 架构。VLM agent（LoRA 微调的 Qwen3-VL-8B）解析原始请求，触发图像搜索或分割工具补全缺失条件，输出统一条件元组供视频 DiT 消费。核心设计包括：四字段编辑计划（重写指令、任务标签、图像搜索查询、掩码短语）；零时间步调制区分噪声 token 与条件 token；DPO 偏好对齐优化工具使用和指令细化。AgentEdit-Bench 评估显示，该 agent 可迁移至其他统一视频编辑模型。",
        keyPoints: [
          "VLM agent 解决文本与视觉欠指定问题：图像搜索补全视觉参考，分割工具定位空间区域",
          "统一条件元组 (y', Vsrc, R+) 设计，支持替换、移除、风格迁移、参考驱动插入等任务",
          "工具调用与视频生成解耦，agent 可迁移至兼容的冻结视频编辑模型"
        ],
        href: "https://arxiv.org/abs/2605.18748",
        paperLink: "Aurora: Unified Video Editing with a Tool-Using Agent",
      },
      {
        num: 4,
        tag: "原始波形音频生成",
        title: "WavFlow：在波形空间直接生成音频的流匹配框架",
        description: "WavFlow 挑战了音频生成必须依赖潜空间压缩的范式，提出直接在原始波形空间生成高保真音频的框架。核心创新包括：waveform patchify 将高维 1D 波形重塑为 2D token 网格；amplitude lifting（RMS 归一化 + 全局缩放）解决波形能量低、信噪比差的问题；x-prediction 策略在流匹配中直接预测干净信号。通过自动化数据管道筛选 500 万高质量视频-文本-音频三元组进行训练。在 VGGSound 基准上，WavFlow 达到 SOTA FDPaSST（59.98@16kHz），DeSync 仅 0.44，证明原始波形生成可达到与潜空间方法相当的同步精度和保真度。",
        keyPoints: [
          "waveform patchify：C×D 网格表示，D=200 时 16kHz 8 秒片段仅 640 个 token",
          "amplitude lifting：r*=0.33, sa=3.0 将信号尺度与高斯噪声先验对齐",
          "x-prediction + v-loss：网络专注于恢复数据流形，目标仍锚定流匹配速度场"
        ],
        href: "https://arxiv.org/abs/2605.18749",
        paperLink: "WavFlow: Audio Generation in Waveform Space",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Artifact-Bench：MLLM 检测 AI 生成视频伪影的基准",
        tag: "视频质量评估",
        href: "https://arxiv.org/abs/2605.18984",
        description: "三层级真实感伪影分类体系（真实感/动画/CG 风格），评估 19 个 MLLM 在时序一致性、结构失真方面的感知能力。",
      },
      {
        num: 6,
        title: "Fast 4D Mesh Generation by Spatio-Temporal Attention Chains",
        tag: "4D 网格生成",
        href: "https://arxiv.org/abs/2605.19786",
        description: "时空注意力链在潜空间传播时序对应关系，9 秒生成 4D 网格（13 倍加速），可扩展至 16 倍长视频。",
      },
      {
        num: 7,
        title: "From Seeing to Thinking：解耦感知与推理改进 VLM 后训练",
        tag: "VLM 训练",
        href: "https://arxiv.org/abs/2605.20177",
        description: "三阶段训练（视觉感知→视觉推理→文本推理），证明感知能力应通过 RL 而非 caption-based SFT 学习。",
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：VLM 正在从「理解器」进化为「控制器」。CogOmniControl 和 Aurora 都将 VLM 置于生成管道的核心位置，前者通过强化学习优化推理质量并规划 evaluator，后者通过工具调用补全缺失条件。这与 music-to-dance 任务的技术路线高度契合——当前方案中的 3D Audio Attention 机制可以借鉴 CogVLM 的意图认知框架，将音乐节奏解析为更密集的运动控制信号。同时，MSAVBench 的细粒度音视频同步评估指标（DeSync、LR-ASD）和 WavFlow 的原始波形生成方法，为改进音频-运动对齐模块提供了可直接落地的技术参考。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Controllable Generation & Audio-Video Evaluation: From Creative Intent to Synchronization Quality",
    overview: [
      "CogOmniControl proposes a VLM-driven creative intent cognition framework that transforms abstract conditions into dense reasoning outputs",
      "MSAVBench establishes the first comprehensive benchmark for multi-shot audio-video generation with 91.5% Spearman correlation to human judgments",
      "Aurora's VLM agent architecture and WavFlow's raw-waveform generation approach are directly transferable to music-to-dance tasks"
    ],
    papers: [
      {
        num: 1,
        tag: "Controllable Video Generation",
        title: "CogOmniControl: Reasoning-Driven Controllable Video Generation via Creative Intent Cognition",
        description: "CogOmniControl addresses the challenge that existing controllable video generation models struggle to understand abstract conditions (e.g., storyboard sketches, clay renders). It decouples the generation process into 'creative intent cognition' and 'video generation' stages. The first stage uses CogVLM fine-tuned on professional animation production data to understand multimodal inputs (reference images, control videos, text) and output dense reasoning results. The second stage, CogOmniDiT, unifies various conditions through in-context generation and aligns with VLM reasoning outputs. Key innovations include reinforcement learning (Holistic Reward + Accuracy Reward) to optimize VLM reasoning quality, and a closed-loop harness architecture where CogVLM plans evaluators for Best-of-N selection.",
        keyPoints: [
          "CogVLM transforms generic VLM into professional-grade creative intent understanding through SFT + RFT two-stage training",
          "CogOmniDiT adopts in-context generation for unified condition injection, using zero-timestep modulation to distinguish noise and condition tokens",
          "Closed-loop harness: VLM plans evaluators (ID consistency, physical dynamics, motion smoothness) during reasoning, enabling Best-of-N selection"
        ],
        href: "https://arxiv.org/abs/2605.19995",
        paperLink: "CogOmniControl: Reasoning-Driven Controllable Video Generation via Creative Intent Cognition",
      },
      {
        num: 2,
        tag: "Audio-Video Evaluation",
        title: "MSAVBench: Comprehensive and Reliable Evaluation of Multi-Shot Audio-Video Generation",
        description: "MSAVBench is the first comprehensive benchmark for multi-shot audio-video (MSAV) generation, covering video, audio, shot, and reference dimensions. Core contributions include: an adaptive self-correction mechanism to address shot segmentation error propagation; instance-wise rubric-based scoring that transforms subjective dimensions into predefined multiple-choice questions; and tool-grounded evidence extraction providing objective basis for complex judgments. The evaluation framework achieves 91.5% Spearman correlation with human judgments. Systematic evaluation of 19 SOTA models reveals that current systems still struggle with director-level control and fine-grained audio-visual synchronization, while modular or agentic generation pipelines offer a promising path to narrow the gap between open-source and closed-source systems.",
        keyPoints: [
          "Adaptive shot segmentation self-correction: VLM iteratively inspects boundaries and invokes tools to merge/split segments",
          "Fine-grained audio-visual sync evaluation: LR-ASD + SortFormer + StableSyncNet combined metrics",
          "286 prompts, 2198 shots, complex narrative structures up to 15 shots"
        ],
        href: "https://arxiv.org/abs/2605.20183",
        paperLink: "MSAVBench: Towards Comprehensive and Reliable Evaluation of Multi-Shot Audio-Video Generation",
      },
      {
        num: 3,
        tag: "Video Editing Agent",
        title: "Aurora: Unified Video Editing with a Tool-Using Agent",
        description: "Aurora addresses the 'condition construction' problem faced by unified video editing models—user requests often lack complete conditions (reference images, spatial masks, precise instructions) required by the model. It proposes an agentic architecture that separates condition construction from video generation. The VLM agent (LoRA-finetuned Qwen3-VL-8B) parses raw requests, triggers image search or segmentation tools to complete missing conditions, and outputs a unified condition tuple for the video DiT. Core designs include: a four-field edit plan (rewritten instruction, task label, image search query, mask phrase); zero-timestep modulation to distinguish noise and condition tokens; and DPO preference alignment for tool use and instruction refinement. AgentEdit-Bench evaluation shows this agent can transfer to other unified video editing models.",
        keyPoints: [
          "VLM agent resolves textual and visual underspecification: image search completes visual references, segmentation tools localize spatial regions",
          "Unified condition tuple (y', Vsrc, R+) design supporting replacement, removal, style transfer, reference-driven insertion tasks",
          "Decoupled tool invocation and video generation, agent transferable to compatible frozen video editing models"
        ],
        href: "https://arxiv.org/abs/2605.18748",
        paperLink: "Aurora: Unified Video Editing with a Tool-Using Agent",
      },
      {
        num: 4,
        tag: "Raw Waveform Audio Generation",
        title: "WavFlow: Audio Generation in Waveform Space",
        description: "WavFlow challenges the paradigm that audio generation must rely on latent-space compression, proposing a framework that generates high-fidelity audio directly in raw waveform space. Core innovations include: waveform patchify reshaping high-dimensional 1D waveforms into 2D token grids; amplitude lifting (RMS normalization + global scaling) addressing low waveform energy and poor SNR; and x-prediction strategy directly predicting clean signals in flow matching. Trained on 5M high-quality video-text-audio triplets curated through an automated data pipeline. On VGGSound benchmark, WavFlow achieves SOTA FDPaSST (59.98@16kHz) with DeSync only 0.44, proving raw-waveform generation can achieve comparable synchronization precision and fidelity to latent-space methods.",
        keyPoints: [
          "Waveform patchify: C×D grid representation, only 640 tokens for 16kHz 8-second clip when D=200",
          "Amplitude lifting: r*=0.33, sa=3.0 aligns signal scale with Gaussian noise prior",
          "x-prediction + v-loss: network focuses on recovering data manifold while target remains anchored to flow-matching velocity field"
        ],
        href: "https://arxiv.org/abs/2605.18749",
        paperLink: "WavFlow: Audio Generation in Waveform Space",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Artifact-Bench: Evaluating MLLMs on Detecting AI-Generated Video Artifacts",
        tag: "Video Quality Evaluation",
        href: "https://arxiv.org/abs/2605.18984",
        description: "Three-level realism artifact taxonomy (photorealistic/animated/CG-style), evaluating 19 MLLMs on temporal consistency and structural distortion perception.",
      },
      {
        num: 6,
        title: "Fast 4D Mesh Generation by Spatio-Temporal Attention Chains",
        tag: "4D Mesh Generation",
        href: "https://arxiv.org/abs/2605.19786",
        description: "Spatio-temporal attention chains propagate temporal correspondences in latent space, generating 4D meshes in 9 seconds (13× speedup), scalable to 16× longer videos.",
      },
      {
        num: 7,
        title: "From Seeing to Thinking: Decoupling Perception and Reasoning Improves VLM Post-Training",
        tag: "VLM Training",
        href: "https://arxiv.org/abs/2605.20177",
        description: "Three-stage training (visual perception → visual reasoning → textual reasoning), proving perception should be learned via RL rather than caption-based SFT.",
      },
    ],
    observation: "Today's papers reveal a clear technical trend: VLMs are evolving from 'understanders' to 'controllers'. Both CogOmniControl and Aurora place VLMs at the core of the generation pipeline—the former optimizing reasoning quality through reinforcement learning and planning evaluators, the latter completing missing conditions through tool invocation. This aligns highly with the music-to-dance task's technical roadmap—the current 3D Audio Attention mechanism can borrow from CogVLM's intent cognition framework to parse music rhythms into denser motion control signals. Meanwhile, MSAVBench's fine-grained audio-visual synchronization metrics (DeSync, LR-ASD) and WavFlow's raw-waveform generation method provide directly applicable technical references for improving the audio-motion alignment module.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-20`,
        'en': `/en/daily/music-to-dance/2026-05-20`,
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
      date="2026-05-20"
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