import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-05-27 | 音频驱动生成与长视频评估新基准",
    overview: [
      "LongCat-Video-Avatar 1.5 开源发布，实现8步推理的工业级音频驱动视频生成",
      "LongAV-Compass 推出分钟级音视频生成统一评估框架，覆盖I2AV等条件生成",
      "RoMo 数据集提供82万条高质量人体动作数据，支持舞蹈等细粒度类别评估"
    ],
    papers: [
      {
        num: 1,
        tag: "音频驱动生成",
        title: "LongCat-Video-Avatar 1.5：8步推理的工业级开源数字人框架",
        description: "美团LongCat团队发布的开源音频驱动视频生成框架，通过Whisper Large音频编码器升级、GRPO强化学习优化和DMD步数蒸馏，实现仅需8步NFE的高效推理。系统在500+测试案例上达到与HeyGen、OmniHuman 1.5等闭源商业系统相当或更优的人像真实度评分。技术亮点包括：Group-Relative Per-Frame Policy Optimization (GRPO) 用于提升生成质量；Distribution Matching Distillation (DMD) 将推理压缩至8步；支持多人物交互、物体操作、动漫风格迁移等复杂场景。其两阶段优化策略（先GRPO提质量，再DMD加速）为music-to-dance任务的工业化部署提供了可直接参考的技术路径。",
        keyPoints: [
          "Whisper Large音频编码器替代Wav2Vec2，实现更精准的唇形同步和时序平滑度",
          "GRPO强化学习训练显著提升生成质量，DMD蒸馏实现8步高效推理",
          "支持多人物对话、物体交互、动漫/动物风格迁移等复杂开放域场景"
        ],
        href: "https://arxiv.org/abs/2605.26486",
        paperLink: "LongCat-Video-Avatar 1.5 Technical Report",
      },
      {
        num: 2,
        tag: "评估基准",
        title: "LongAV-Compass：分钟级音视频生成统一评估基准",
        description: "北大、可灵团队等联合提出的分钟级音视频生成评估框架，填补长视频评估空白。包含284个精选测试案例，覆盖T2AV（文本到音视频）、I2AV（图像到音视频）、V2AV（视频到音视频）三种条件生成任务。评估维度超过20个，包括片段内质量、跨片段一致性、全局叙事连贯性、语义对齐、音视频同步等。采用MLLM（Gemini 3.1 Pro）辅助评估结合DINO-v2、ArcFace、CLIP、ImageBind等多模态指标。对music-to-dance任务而言，其I2AV评估维度（身份一致性、长时序稳定性）和细粒度诊断报告可直接用于评估参考人物图+音频驱动的舞蹈视频生成质量。",
        keyPoints: [
          "首个支持T2AV/I2AV/V2AV统一评估的分钟级音视频生成基准",
          "20+评估维度覆盖身份一致性、叙事连贯性、音视频同步等长视频核心指标",
          "提供事件级注释和分层诊断报告，支持模型能力缺陷的精细化分析"
        ],
        href: "https://arxiv.org/abs/2605.26244",
        paperLink: "LongAV-Compass: Towards Unified Evaluation of Minute-Scale Audio-Visual Generation Across T2AV, I2AV, and V2AV",
      },
      {
        num: 3,
        tag: "动作数据集",
        title: "RoMo：大规模分层人体动作数据集与语义分类体系",
        description: "Roblox与斯坦福等联合推出的82万条高质量in-the-wild人体动作数据集，总时长1237小时。采用三级语义分类体系（54类别→2065子类别→原子动作），包含舞蹈(Dance)、健身、运动等细粒度类别。数据经过taxonomy-aware自适应过滤管道处理，去除静态和伪影序列。每条动作配有5条详细文本描述。实验表明，在RoMo上训练的模型在保真度、多样性和复杂文本提示理解方面达到SOTA。其Motion Toolbox提供标准化评估指标和数据转换工具，为music-to-dance任务的动作质量评估提供了可复用的基础设施。",
        keyPoints: [
          "82万条高质量动作数据，三级语义分类支持舞蹈等细粒度类别评估",
          "Taxonomy-aware自适应过滤确保数据质量，避免静态和低质量序列",
          "Motion Toolbox提供标准化评估工具，支持FID、R-precision等指标计算"
        ],
        href: "https://arxiv.org/abs/2605.26241",
        paperLink: "RoMo: A Large-Scale, Richly Organized Dataset and Semantic Taxonomy for Human Motion Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "对称注意力分解调节扩散模型保真度-多样性权衡",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2605.27476",
        description: "将QK^T注意力矩阵分解为对称/反对称分量，从Hopfield能量视角解释生成过程，提出可控旋钮调节保真度-多样性权衡。可用于优化舞蹈生成中的动作多样性控制。",
      },
      {
        num: 5,
        title: "JLT：潜在扩散Transformer中的Clean-Latent预测",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2605.27102",
        description: "证明在潜在空间中clean-latent预测优于velocity预测，FID-50K达2.50。为DiT-based视频生成模型提供训练目标选择依据。",
      },
      {
        num: 6,
        title: "RT-Lynx：DiT激活稀疏化加速推理",
        tag: "推理优化",
        href: "https://arxiv.org/abs/2605.26632",
        description: "发现DiT激活比权重更适合N:M半结构化稀疏化，实现1.55x线性层加速。对实时舞蹈视频生成推理优化有直接参考价值。",
      },
      {
        num: 7,
        title: "递归流匹配：2-4步高保真时空动态生成",
        tag: "生成模型",
        href: "https://arxiv.org/abs/2605.26535",
        description: "Recursive Flow Matching通过跨离散尺度自一致性对齐轨迹，实现2-4步高保真生成，20倍加速。可用于提升舞蹈生成模型推理效率。",
      },
      {
        num: 8,
        title: "OmniRetriever：Fusion-as-Teacher音视频文本检索",
        tag: "跨模态对齐",
        href: "https://arxiv.org/abs/2605.26641",
        description: "提出fusion-as-teacher蒸馏策略，用融合嵌入指导单模态嵌入学习。其跨模态对齐方法可用于改进音乐-舞蹈特征对齐。",
      },
    ],
    observation: "今日论文呈现两个显著趋势：一是音频驱动视频生成进入工业化阶段，LongCat-Video-Avatar 1.5通过GRPO+DMD的两阶段优化实现了8步推理的商用级质量，开源方案开始逼近闭源商业系统；二是长视频评估基础设施逐步完善，LongAV-Compass针对分钟级音视频生成建立了20+维度的统一评估框架，填补了music-to-dance等长时序生成任务缺乏标准化评估的空白。建议关注I2AV评估维度在参考人物图+音频驱动舞蹈生成中的迁移应用。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-05-27 | Audio-Driven Generation & Long-Video Evaluation Benchmarks",
    overview: [
      "LongCat-Video-Avatar 1.5 open-sourced with 8-step inference for production-grade audio-driven video generation",
      "LongAV-Compass introduces unified evaluation framework for minute-scale audio-visual generation including I2AV",
      "RoMo dataset provides 820K high-quality human motions with fine-grained category evaluation including Dance"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Driven Generation",
        title: "LongCat-Video-Avatar 1.5: Industrial-Grade Open-Source Avatar Framework with 8-Step Inference",
        description: "Meituan LongCat team's open-source audio-driven video generation framework achieves efficient inference with only 8 NFEs through Whisper Large audio encoder upgrade, GRPO reinforcement learning optimization, and DMD step distillation. The system matches or surpasses closed-source commercial systems like HeyGen and OmniHuman 1.5 in human-likeness ratings across 500+ test cases. Key technical highlights include: Group-Relative Per-Frame Policy Optimization (GRPO) for quality enhancement; Distribution Matching Distillation (DMD) compressing inference to 8 steps; support for complex scenarios including multi-person interactions, object manipulation, and anime style transfer. The two-stage optimization strategy (GRPO for quality, then DMD for speed) provides a directly applicable technical path for industrial deployment of music-to-dance tasks.",
        keyPoints: [
          "Whisper Large audio encoder replaces Wav2Vec2 for more accurate lip-sync and temporal smoothness",
          "GRPO RL training significantly improves generation quality, DMD distillation enables efficient 8-step inference",
          "Supports complex open-domain scenarios: multi-person conversations, object interactions, anime/animal style transfer"
        ],
        href: "https://arxiv.org/abs/2605.26486",
        paperLink: "LongCat-Video-Avatar 1.5 Technical Report",
      },
      {
        num: 2,
        tag: "Evaluation Benchmark",
        title: "LongAV-Compass: Unified Benchmark for Minute-Scale Audio-Visual Generation",
        description: "A joint effort from Peking University, Kling Team, and others proposes an evaluation framework for minute-scale audio-visual generation, filling the gap in long-video assessment. Contains 284 curated test cases covering three conditional generation tasks: T2AV (text-to-audio-video), I2AV (image-to-audio-video), and V2AV (video-to-audio-video). The evaluation spans 20+ dimensions including within-segment quality, cross-segment consistency, global narrative coherence, semantic alignment, and audio-visual synchronization. Uses MLLM (Gemini 3.1 Pro) assisted evaluation combined with multimodal metrics including DINO-v2, ArcFace, CLIP, and ImageBind. For music-to-dance tasks, its I2AV evaluation dimensions (identity consistency, long-term temporal stability) and fine-grained diagnostic reports can be directly applied to assess reference-image-plus-audio-driven dance video generation quality.",
        keyPoints: [
          "First benchmark supporting unified T2AV/I2AV/V2AV evaluation for minute-scale audio-visual generation",
          "20+ evaluation dimensions covering identity consistency, narrative coherence, AV sync and other long-video metrics",
          "Provides event-level annotations and hierarchical diagnostic reports for fine-grained model capability analysis"
        ],
        href: "https://arxiv.org/abs/2605.26244",
        paperLink: "LongAV-Compass: Towards Unified Evaluation of Minute-Scale Audio-Visual Generation Across T2AV, I2AV, and V2AV",
      },
      {
        num: 3,
        tag: "Motion Dataset",
        title: "RoMo: Large-Scale Human Motion Dataset with Semantic Taxonomy",
        description: "A joint effort from Roblox, Stanford, and others introduces 820K high-quality in-the-wild human motion clips totaling 1,237 hours. Uses a three-level semantic taxonomy (54 categories → 2,065 subcategories → atomic actions), including fine-grained categories like Dance, Fitness, and Sports. Data is processed through a taxonomy-aware adaptive filtering pipeline to remove static and artifact-prone sequences. Each motion comes with 5 detailed text descriptions. Experiments show models trained on RoMo achieve SOTA in fidelity, diversity, and complex text prompt understanding. The Motion Toolbox provides standardized evaluation metrics and data conversion tools, offering reusable infrastructure for motion quality assessment in music-to-dance tasks.",
        keyPoints: [
          "820K high-quality motion clips with three-level semantic taxonomy supporting fine-grained category evaluation including Dance",
          "Taxonomy-aware adaptive filtering ensures data quality by removing static and low-quality sequences",
          "Motion Toolbox provides standardized evaluation tools supporting FID, R-precision, and other metrics"
        ],
        href: "https://arxiv.org/abs/2605.26241",
        paperLink: "RoMo: A Large-Scale, Richly Organized Dataset and Semantic Taxonomy for Human Motion Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Symmetric Attention Decomposition for Fidelity-Diversity Trade-off in Diffusion Models",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2605.27476",
        description: "Decomposes QK^T attention matrix into symmetric/anti-symmetric components, explaining generation from Hopfield energy perspective and proposing controllable knob for fidelity-diversity trade-off. Applicable for motion diversity control in dance generation.",
      },
      {
        num: 5,
        title: "JLT: Clean-Latent Prediction in Latent Diffusion Transformers",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2605.27102",
        description: "Demonstrates clean-latent prediction outperforms velocity prediction in latent space, achieving FID-50K of 2.50. Provides guidance for training target selection in DiT-based video generation models.",
      },
      {
        num: 6,
        title: "RT-Lynx: Activation Sparsification for DiT Inference Acceleration",
        tag: "Inference Optimization",
        href: "https://arxiv.org/abs/2605.26632",
        description: "Finds DiT activations more suitable than weights for N:M semi-structured sparsification, achieving 1.55x speedup in linear layers. Directly applicable for real-time dance video generation inference optimization.",
      },
      {
        num: 7,
        title: "Recursive Flow Matching: 2-4 Step High-Fidelity Spatiotemporal Generation",
        tag: "Generative Models",
        href: "https://arxiv.org/abs/2605.26535",
        description: "Recursive Flow Matching achieves high-fidelity generation in 2-4 steps through cross-scale self-consistency alignment, with 20x speedup. Can improve inference efficiency for dance generation models.",
      },
      {
        num: 8,
        title: "OmniRetriever: Fusion-as-Teacher Audio-Video-Text Retrieval",
        tag: "Cross-Modal Alignment",
        href: "https://arxiv.org/abs/2605.26641",
        description: "Proposes fusion-as-teacher distillation strategy using fused embeddings to guide single-modal embedding learning. Its cross-modal alignment approach can improve music-dance feature alignment.",
      },
    ],
    observation: "Today's papers reveal two notable trends: First, audio-driven video generation is reaching industrial maturity—LongCat-Video-Avatar 1.5 achieves commercial-grade quality with 8-step inference through GRPO+DMD two-stage optimization, with open-source solutions approaching closed-source commercial systems. Second, long-video evaluation infrastructure is maturing—LongAV-Compass establishes a unified evaluation framework with 20+ dimensions for minute-scale audio-visual generation, filling the gap of standardized evaluation for long-horizon generation tasks like music-to-dance. Recommend exploring the migration of I2AV evaluation dimensions to reference-image-plus-audio-driven dance generation assessment.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-27`,
        'en': `/en/daily/music-to-dance/2026-05-27`,
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
      date="2026-05-27"
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
