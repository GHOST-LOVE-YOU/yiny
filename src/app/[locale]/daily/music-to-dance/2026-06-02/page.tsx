import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "视频生成的测试时优化与长时序一致性",
    overview: [
      "VLM-as-Teacher：将VLM从求解器转变为教师，通过可微奖励引导视频生成模型进行测试时优化",
      "LongLive-RAG：将RAG框架引入自回归长视频生成，解决滑动窗口注意力的误差累积问题",
      "语义运动锚点：将连续手势离散化为语义原语，为音频-运动对齐提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "视频推理",
        title: "VLM-as-Teacher：通过测试时优化增强视频推理能力",
        description: "这篇论文提出了一个范式转变：将Vision-Language Models (VLMs) 从「求解器」转变为「教师」。传统方法使用VLM生成文本指导来引导视频生成模型(VGM)，但文本难以捕捉精细的时空细节。本文的核心洞见是：VLM虽然不擅长构造可执行的视觉轨迹，但具备强大的感知能力来评估过程约束满足度和最终目标达成度。基于此，作者让VLM提取任务特定规则并形式化为可微奖励，通过在线优化轻量级LoRA模块来引导VGM。在VBVR-Bench和RULER-Bench上，该方法平均提升16.7个百分点，显著优于VLM-as-Solver (+0.4) 和Best-of-N scaling (+2.2)。对于music-to-dance任务，这种测试时优化范式可直接迁移：用VLM评估生成舞蹈与音乐节拍的对齐程度，并反馈优化扩散模型的LoRA适配器，实现更精准的音频-运动对齐。",
        keyPoints: [
          "VLM-as-Teacher范式：将VLM角色从文本求解器转变为测试时监督者，提供优化信号",
          "可微奖励合成：从任务描述自动生成过程约束和最终目标两类奖励查询",
          "高效适配设计：轻量级替代解码器 + 单步clean-latent预测 + 基于损失的早停",
          "迁移价值：测试时优化LoRA的策略可直接用于优化舞蹈生成的音频-运动对齐"
        ],
        href: "https://arxiv.org/abs/2606.02564",
        paperLink: "VLMs are Good Teachers for Video Reasoning via Adaptive Test-Time Optimization",
      },
      {
        num: 2,
        tag: "长视频生成",
        title: "LongLive-RAG：检索增强的长视频生成框架",
        description: "自回归(AR)视频扩散在生成长视频时面临误差累积和身份漂移问题。现有方法使用滑动窗口注意力，一旦活动窗口积累外观错误，后续生成只能基于这个退化的轨迹继续，导致漂移加剧。本文将长视频生成分解为检索增强生成(RAG)问题：将历史生成的潜变量视为可搜索的动态记忆库。LongLive-RAG在生成每个新块时，使用查询嵌入检索相关的历史潜变量，让生成器能够关注非局部上下文而非仅依赖近期窗口。为提升检索判别力，作者提出Window Temporal Delta Loss抑制冗余的局部相似性，同时加入平滑项保持嵌入轨迹稳定。在Causal-Forcing、Self-Forcing和LongLive三个AR骨干上，LongLive-RAG在30s/60s/120s生成中均取得最佳VBench-Long平均排名。对于舞蹈视频生成，这意味着可以通过检索早期保持人物外观一致性的历史帧，有效缓解长序列中的身份漂移问题。",
        keyPoints: [
          "RAG范式迁移：首次将检索增强引入开放式AR长视频生成，历史潜变量作为可寻址记忆",
          "Window Temporal Delta Loss：抑制局部时间窗口内的冗余相似性，增强检索判别力",
          "轻量开销：每块仅增加4.08ms检索开销（编码3.96ms + 搜索0.08ms）",
          "迁移价值：检索历史外观一致帧的机制可直接用于舞蹈视频的长时序身份保持"
        ],
        href: "https://arxiv.org/abs/2606.02553",
        paperLink: "LongLive-RAG: A General Retrieval-Augmented Framework for Long Video Generation",
      },
      {
        num: 3,
        tag: "语音手势",
        title: "语义运动锚点：桥接语音与手势的语义对齐",
        description: "学习语音与手势的共享表示是协同语音手势合成与理解的核心挑战。直接对比学习往往过度强调低级运动学特征，而忽略语义手势的交际意图。本文提出语义运动锚点(semantic motion anchors)：用自然语言抽象描述手势的物理形式和交际意图。方法首先通过双流RVQ-VAE将连续3D手势离散化为运动token，然后将每个token映射为描述手部位置、运动轨迹、手掌朝向等物理属性的结构化语言片段，最后用LLM结合语音转录生成语义锚点。在BEAT2数据集上，该方法将text-to-gesture R@1从39.1提升到42.3（+8.2%）。对于music-to-dance任务，这种将连续运动离散化为语义原语并用自然语言描述的思路极具启发：可以将舞蹈动作离散化为与音乐节拍对应的语义原语，通过自然语言桥接音频和舞蹈动作，解决当前方案中音频-运动对齐不够精准的问题。",
        keyPoints: [
          "语义运动锚点：用自然语言同时描述手势物理形式（位置、轨迹、朝向）和交际意图",
          "RVQ-VAE离散化：将连续3D手势压缩为离散token，实现运动的原子化表示",
          "LLM推理增强：四阶段结构化推理（惯用手-运动-意图-验证）生成语义锚点",
          "迁移价值：将舞蹈动作离散化为语义原语，用自然语言桥接音乐与运动的思路"
        ],
        href: "https://arxiv.org/abs/2605.30608",
        paperLink: "Semantic Motion Anchors: Bridging Motion and Meaning in Co-Speech Gestures",
      },
      {
        num: 4,
        tag: "机器人学习",
        title: "τ₀-WM：统一视频-动作世界模型",
        description: "机器人操作需要模型既能生成可执行动作，又能在物理执行前预测和评估未来结果。本文提出τ₀-World Model，在共享的视频扩散骨干上集成策略学习、视频预测和动作评估。模型提供两个互补接口：Video Action Model (VAM)从多视角观测、语言指令和机器人状态联合预测未来视觉潜变量和连续动作块；Action-Conditioned Video Simulator (ACVS)则将候选动作块展开为多视角未来并预测密集任务进度分数。模型在约27,300小时的异构数据（真实机器人遥操作、UMI风格交互、第一人称人类视频、失败轨迹）上训练，使用模态特定监督掩码让每种数据源只监督其包含的信号。测试时，模型采样多个动作候选，用重去噪一致性排序，并调用ACVS对低质量候选进行模拟评估和修正。对于music-to-dance，这种视频-动作联合建模的思路值得借鉴：可以构建一个统一模型，同时预测舞蹈动作和对应的未来视频帧，通过视频预测来评估动作质量。",
        keyPoints: [
          "统一世界模型：共享视频扩散骨干集成动作生成、视频预测和动作评估",
          "双接口设计：VAM回答「做什么」，ACVS回答「如果做了会发生什么」",
          "异构数据融合：27.3K小时真实机器人/UMI/人类视频数据，模态特定监督",
          "迁移价值：视频-动作联合建模思路可用于舞蹈动作生成与质量评估"
        ],
        href: "https://arxiv.org/abs/2606.01027",
        paperLink: "τ_0-WM: A Unified Video-Action World Model for Robotic Manipulation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Moment-Video：诊断视频MLLMs的时序保真度",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2606.02522",
        description: "提出诊断短暂视觉事件理解能力的基准，对舞蹈视频中短暂动作事件的准确捕捉有参考价值。",
      },
      {
        num: 6,
        title: "X-Stream：多流视频理解基准",
        tag: "多模态",
        href: "https://arxiv.org/abs/2606.02482",
        description: "首个多流流媒体理解基准，对音频+视频多模态联合建模的评估方法有启发。",
      },
      {
        num: 7,
        title: "TRACE：多视频事件理解与声明生成",
        tag: "视频推理",
        href: "https://arxiv.org/abs/2605.16740",
        description: "基于证据定位的多视频事件推理框架，其ground-before-reasoning策略可借鉴到音乐-舞蹈对齐。",
      },
    ],
    observation: "今日论文呈现出一个共同主题：测试时计算(test-time computation)正在成为提升生成模型能力的关键维度。VLM-as-Teacher通过测试时LoRA优化扩展VGM的推理能力，LongLive-RAG通过检索历史上下文增强长视频生成，τ₀-WM通过测试时动作采样和模拟评估提升机器人策略。对于music-to-dance任务，这意味着除了改进模型架构，还可以通过增加测试时计算（如迭代优化音频-运动对齐、检索历史外观一致的参考帧）来提升生成质量。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Test-Time Optimization & Long-Horizon Consistency for Video Generation",
    overview: [
      "VLM-as-Teacher: Transforming VLMs from solvers to teachers, guiding video generation via differentiable rewards",
      "LongLive-RAG: Introducing RAG into autoregressive long video generation to address sliding-window error accumulation",
      "Semantic Motion Anchors: Discretizing continuous gestures into semantic primitives for audio-motion alignment"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Reasoning",
        title: "VLM-as-Teacher: Enhancing Video Reasoning via Test-Time Optimization",
        description: "This paper proposes a paradigm shift: transforming Vision-Language Models (VLMs) from 'solvers' to 'teachers'. Traditional approaches use VLMs to generate textual guidance for Video Generation Models (VGMs), but text struggles to capture intricate spatiotemporal details. The key insight is that while VLMs are poor at constructing executable visual trajectories, they possess strong perceptual capabilities to evaluate process-constraint satisfaction and final-goal achievement. The authors leverage this by having VLMs extract task-specific rules and formulate them as differentiable rewards, guiding VGMs through online optimization of a lightweight LoRA module. On VBVR-Bench and RULER-Bench, this approach achieves a 16.7-point average improvement, significantly outperforming VLM-as-Solver (+0.4) and Best-of-N scaling (+2.2). For music-to-dance tasks, this test-time optimization paradigm can be directly transferred: using VLMs to evaluate dance-music beat alignment and feeding back to optimize the diffusion model's LoRA adapter for more precise audio-motion synchronization.",
        keyPoints: [
          "VLM-as-Teacher paradigm: Shifting VLM role from text solver to test-time supervisor providing optimization signals",
          "Differentiable reward synthesis: Automatically generating process constraints and final goal reward queries from task descriptions",
          "Efficient adaptation design: Lightweight surrogate decoder + single-step clean-latent prediction + loss-based early stopping",
          "Transfer value: Test-time LoRA optimization strategy can be directly applied to optimize audio-motion alignment in dance generation"
        ],
        href: "https://arxiv.org/abs/2606.02564",
        paperLink: "VLMs are Good Teachers for Video Reasoning via Adaptive Test-Time Optimization",
      },
      {
        num: 2,
        tag: "Long Video Generation",
        title: "LongLive-RAG: Retrieval-Augmented Framework for Long Video Generation",
        description: "Autoregressive (AR) video diffusion faces error accumulation and identity drift in long-horizon generation. Existing sliding-window attention methods create an irreversible trajectory: once the active window accumulates appearance errors, subsequent generations condition on this degraded trajectory and drift further. This paper formulates long video generation as a Retrieval-Augmented Generation (RAG) problem, treating historically generated latents as a dynamic, searchable memory bank. LongLive-RAG uses query embeddings to retrieve relevant historical latents for each new block, allowing the generator to attend to non-local context instead of only the recent window. The Window Temporal Delta Loss suppresses redundant local similarity while a smoothing term maintains embedding stability. Across three AR backbones (Causal-Forcing, Self-Forcing, LongLive) and three generation lengths (30s/60s/120s), LongLive-RAG achieves the best average VBench-Long rank. For dance video generation, this means retrieving historically appearance-consistent frames can effectively alleviate identity drift in long sequences.",
        keyPoints: [
          "RAG paradigm transfer: First to introduce retrieval augmentation into open-ended AR long video generation, using historical latents as addressable memory",
          "Window Temporal Delta Loss: Suppresses redundant similarity within local temporal windows, enhancing retrieval discriminability",
          "Lightweight overhead: Only 4.08ms retrieval cost per block (3.96ms encoding + 0.08ms search)",
          "Transfer value: Mechanism for retrieving historically appearance-consistent frames can be directly applied to identity preservation in dance videos"
        ],
        href: "https://arxiv.org/abs/2606.02553",
        paperLink: "LongLive-RAG: A General Retrieval-Augmented Framework for Long Video Generation",
      },
      {
        num: 3,
        tag: "Co-Speech Gesture",
        title: "Semantic Motion Anchors: Bridging Motion and Meaning",
        description: "Learning shared representations between spoken text and gesture is central to co-speech gesture synthesis. Direct contrastive alignment often overemphasizes low-level kinematics while missing communicative intent. This paper proposes semantic motion anchors: natural language abstractions capturing both physical form and communicative intent. The method first discretizes continuous 3D gestures into motion tokens via two-stream RVQ-VAE, then maps each token to structured language fragments describing hand position, trajectory, and palm orientation, and finally uses LLMs to generate semantic anchors grounded in speech transcripts. On BEAT2, this improves text-to-gesture R@1 from 39.1 to 42.3 (+8.2%). For music-to-dance, the insight of discretizing continuous motion into semantic primitives and bridging modalities via natural language is highly relevant: dance movements could be discretized into primitives corresponding to music beats, using natural language to bridge audio and dance motion for more precise alignment.",
        keyPoints: [
          "Semantic motion anchors: Natural language descriptions capturing both gesture physical form (position, trajectory, orientation) and communicative intent",
          "RVQ-VAE discretization: Compressing continuous 3D gestures into discrete tokens for atomic motion representation",
          "LLM reasoning enhancement: Four-stage structured reasoning (handedness-motion-intent-verification) for anchor generation",
          "Transfer value: Discretizing dance into semantic primitives, using natural language to bridge music and motion"
        ],
        href: "https://arxiv.org/abs/2605.30608",
        paperLink: "Semantic Motion Anchors: Bridging Motion and Meaning in Co-Speech Gestures",
      },
      {
        num: 4,
        tag: "Robot Learning",
        title: "τ₀-WM: Unified Video-Action World Model",
        description: "Robotic manipulation requires models that generate executable actions while anticipating future consequences. This paper presents τ₀-World Model, integrating policy learning, video prediction, and action evaluation within a shared video diffusion backbone. The model provides two complementary interfaces: Video Action Model (VAM) jointly predicts future visual latents and continuous action chunks from multi-view observations, language instructions, and robot state; Action-Conditioned Video Simulator (ACVS) rolls out candidate action chunks into multi-view futures and predicts dense task-progress scores. Trained on ~27,300 hours of heterogeneous data (real robot teleoperation, UMI-style interaction, egocentric human videos, failure trajectories) with modality-specific supervision masks. At test time, the model samples multiple action candidates, ranks them by re-denoising consistency, and invokes ACVS to evaluate and rectify low-quality candidates. For music-to-dance, this video-action joint modeling approach is worth exploring: building a unified model that simultaneously predicts dance movements and corresponding future video frames, using video prediction to evaluate motion quality.",
        keyPoints: [
          "Unified world model: Shared video diffusion backbone integrating action generation, video prediction, and action evaluation",
          "Dual-interface design: VAM answers 'what to do', ACVS answers 'what would happen if'",
          "Heterogeneous data fusion: 27.3K hours of real robot/UMI/human video data with modality-specific supervision",
          "Transfer value: Video-action joint modeling approach applicable to dance generation and quality evaluation"
        ],
        href: "https://arxiv.org/abs/2606.01027",
        paperLink: "τ_0-WM: A Unified Video-Action World Model for Robotic Manipulation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "Moment-Video: Diagnosing Temporal Fidelity in Video MLLMs",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2606.02522",
        description: "Benchmark for diagnosing brief visual event understanding, relevant for capturing transient dance movements.",
      },
      {
        num: 6,
        title: "X-Stream: Multi-Stream Video Understanding",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2606.02482",
        description: "First benchmark for multi-stream streaming understanding,启发 for audio+video multimodal joint modeling evaluation.",
      },
      {
        num: 7,
        title: "TRACE: Multi-Video Event Understanding and Claim Generation",
        tag: "Video Reasoning",
        href: "https://arxiv.org/abs/2605.16740",
        description: "Evidence grounding-guided multi-video reasoning framework; ground-before-reasoning strategy applicable to music-dance alignment.",
      },
    ],
    observation: "Today's papers share a common theme: test-time computation is becoming a key dimension for improving generative model capabilities. VLM-as-Teacher extends VGM reasoning through test-time LoRA optimization, LongLive-RAG enhances long video generation via historical context retrieval, and τ₀-WM improves robot policies through test-time action sampling and simulation evaluation. For music-to-dance tasks, this suggests that beyond improving model architectures, generation quality can be enhanced by increasing test-time computation (e.g., iterative optimization of audio-motion alignment, retrieving historically appearance-consistent reference frames).",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-02`,
        'en': `/en/daily/music-to-dance/2026-06-02`,
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
      date="2026-06-02"
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
