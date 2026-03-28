import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "长视频生成与音频-视觉对齐：自回归架构与记忆机制的新进展",
    overview: [
      "自回归视频生成成为长视频合成的主流范式，但错误累积和KV缓存膨胀仍是核心挑战",
      "音频-视觉联合控制框架趋向模块化，LoRA适配器成为扩展新模态的高效方案",
      "细粒度表情编辑和身份保持技术对舞蹈视频中人物自然度有重要参考价值"
    ],
    papers: [
      {
        num: 1,
        tag: "长视频生成",
        title: "ShotStream：面向交互式叙事的流式多镜头视频生成",
        description: "ShotStream提出了一种因果多镜头架构，将多镜头合成重新定义为基于历史上下文的下一镜头生成任务。该框架通过Distribution Matching Distillation将双向教师模型蒸馏为4步因果学生模型，实现单GPU 16 FPS的实时生成。其核心创新dual-cache记忆机制分别维护全局上下文缓存（保留稀疏条件历史帧以确保镜头间一致性）和局部上下文缓存（保留当前镜头生成帧以确保镜头内连续性），配合RoPE不连续指示器消除缓存歧义。两阶段渐进蒸馏策略（先进行基于真实历史帧的镜头内自强制，再过渡到基于自生成历史的镜头间自强制）有效缓解了自回归生成的错误累积问题。对于music-to-dance任务，该架构的流式提示交互能力和长程一致性保证机制可直接迁移，解决当前方案在生成较长舞蹈序列时的时序一致性和交互控制问题。",
        keyPoints: [
          "Dual-cache记忆机制：全局缓存确保镜头间一致性，局部缓存保证镜头内连续性",
          "两阶段渐进蒸馏：从真实历史过渡到自生成历史，有效桥接训练-测试差距",
          "16 FPS实时生成：单GPU即可实现亚秒级延迟的多镜头视频合成"
        ],
        href: "https://arxiv.org/abs/2603.25746",
        paperLink: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
      },
      {
        num: 2,
        tag: "长视频生成",
        title: "PackForcing：短视频训练实现长视频采样与长上下文推理",
        description: "PackForcing针对自回归视频扩散模型的两大瓶颈——错误累积和无界KV缓存增长——提出了三层分区KV缓存策略。该方法将历史上下文分为三类：Sink tokens（保留早期锚点帧完整分辨率以维持全局语义）、Mid tokens（通过双分支网络实现32倍时空压缩）、Recent tokens（保持完整分辨率以确保局部时序连贯）。动态top-k上下文选择机制严格限制压缩中间缓存的容量，而连续Temporal RoPE Adjustment则以可忽略的开销重新对齐丢弃token造成的位置间隙。该框架可在单张H200 GPU上生成连贯的2分钟832×480视频（16 FPS），KV缓存仅需4GB，实现24倍时间外推（5秒→120秒）。对于music-to-dance，这种分层上下文压缩技术可显著降低长舞蹈视频生成的内存占用，同时保持时序一致性。",
        keyPoints: [
          "三层分区KV缓存：Sink/Mid/Recent tokens分别采用不同压缩策略",
          "双分支压缩网络：融合渐进3D卷积与低分辨率VAE重编码，实现32倍token缩减",
          "24倍时间外推：仅用5秒片段训练即可生成120秒连贯视频"
        ],
        href: "https://arxiv.org/abs/2603.25730",
        paperLink: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
      },
      {
        num: 3,
        tag: "表情编辑",
        title: "PixelSmile：面向细粒度面部表情编辑",
        description: "PixelSmile针对细粒度面部表情编辑中固有的语义重叠问题，构建了带有连续情感标注的Flex Facial Expression (FFE)数据集，并建立了FFE-Bench评估体系。该扩散框架通过完全对称的联合训练解耦表情语义，结合强度监督与对比学习生成更强、更可区分的表情特征，通过文本潜在插值实现精确且稳定的线性表情控制。实验表明该方法在结构混淆、编辑准确性、线性可控性以及表情编辑与身份保持的权衡方面均表现优异。对于music-to-dance任务，舞蹈视频中人物面部表情的自然度是整体真实感的重要组成部分，PixelSmile的连续可控表情编辑技术可直接应用于舞蹈人物的表情细化，提升生成视频的自然度和表现力。",
        keyPoints: [
          "连续情感标注：用12维情感分数分布替代离散标签，捕捉表情流形的细粒度边界",
          "完全对称联合训练：对比易混淆表情对，有效解耦重叠语义",
          "文本潜在插值：无需参考图像即可实现连续可调的表情强度控制"
        ],
        href: "https://arxiv.org/abs/2603.25728",
        paperLink: "PixelSmile: Toward Fine-Grained Facial Expression Editing",
      },
      {
        num: 4,
        tag: "音频-视觉控制",
        title: "AVControl：面向音频-视觉控制的高效训练框架",
        description: "AVControl构建于LTX-2联合音频-视觉基础模型之上，提出了一种轻量级、可扩展的控制框架。每种控制模态（深度、姿态、相机轨迹、音频变换等）作为独立的LoRA在并行画布上训练，将参考信号作为注意力层中的额外token，无需改变主干架构。与通道拼接方法不同，并行画布通过自注意力实现参考与目标的交互，支持推理时全局或局部的细粒度参考权重调制。该框架在VACE基准上超越了所有评估基线，且每种模态仅需数百至数千训练步骤。对于music-to-dance，这种模块化的音频-视觉控制范式具有直接迁移价值：音频节拍控制、参考人物外观保持等可分别训练为独立LoRA，灵活组合以实现更精细的舞蹈生成控制。",
        keyPoints: [
          "并行画布条件：参考信号作为额外token参与自注意力，支持细粒度权重调制",
          "模块化LoRA训练：每种控制模态独立训练，无需重新训练现有模态",
          "高效收敛：每种模态仅需数百至数千步训练，总预算仅为VACE的三分之一"
        ],
        href: "https://arxiv.org/abs/2603.24793",
        paperLink: "AVControl: Efficient Framework for Training Audio-Visual Controls",
      },
      {
        num: 5,
        tag: "歌声合成",
        title: "YingMusic-Singer：面向灵活歌词操控与无标注旋律引导的可控歌声合成",
        description: "YingMusic-Singer是一种完全基于扩散模型的歌声合成系统，可在修改歌词的同时保持旋律一致性。模型仅需三个输入：可选的音色参考、提供旋律的演唱片段和修改后的歌词，无需手动对齐或精确标注。通过课程学习策略和Group Relative Policy Optimization (GRPO)训练，该方法在旋律保持和歌词遵循方面超越了Vevo2等可比基线。作者还构建了LyricEditBench，首个针对旋律保持歌词修改评估的基准。对于music-to-dance任务，虽然领域不同，但该论文的音频-旋律对齐技术和扩散模型训练方法具有重要参考价值——特别是GRPO在平衡多个目标（歌词清晰度vs旋律保持）方面的经验，可借鉴用于优化舞蹈生成中的音频-动作对齐。",
        keyPoints: [
          "无手动对齐：仅需参考音频和修改歌词即可生成旋律一致的演唱",
          "GRPO训练：在线策略优化平衡歌词清晰度和旋律保持的权衡",
          "Centered Kernel Alignment损失：显式约束预测与旋律特征的对齐"
        ],
        href: "https://arxiv.org/abs/2603.24589",
        paperLink: "YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "MuRF：释放视觉基础模型的多尺度潜力",
        tag: "视觉表征",
        href: "https://arxiv.org/abs/2603.25744",
        description: "多分辨率融合策略，通过处理多尺度图像并融合特征提升表征质量，可提升舞蹈视频细节生成。",
      },
      {
        num: 7,
        title: "MegaFlow：零样本大位移光流估计",
        tag: "运动估计",
        href: "https://arxiv.org/abs/2603.25739",
        description: "基于预训练ViT特征的零样本光流估计，可用于舞蹈动作一致性约束和后处理优化。",
      },
      {
        num: 8,
        title: "Hybrid Memory：动态视频世界模型的混合记忆",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2603.25716",
        description: "同时作为静态背景的精确档案员和动态主体的警觉追踪者，对舞蹈人物身份保持有参考价值。",
      },
      {
        num: 9,
        title: "Persistent Robot World Models：通过RL稳定多步展开",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2603.25685",
        description: "RL后训练稳定自回归生成的方法，可应用于music-to-dance长序列生成优化。",
      },
      {
        num: 10,
        title: "Voxtral TTS：富有表现力的多语言文本转语音",
        tag: "语音合成",
        href: "https://arxiv.org/abs/2603.25551",
        description: "自回归语义token与flow-matching声学token混合架构，对音频特征提取和生成有借鉴意义。",
      },
      {
        num: 11,
        title: "PMT：基于冻结视觉编码器的图像视频分割",
        tag: "分割",
        href: "https://arxiv.org/abs/2603.25398",
        description: "轻量级Transformer分割解码器，可用于舞蹈视频中人物与背景分离。",
      },
      {
        num: 12,
        title: "Calibri：通过参数高效校准增强扩散Transformer",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2603.24800",
        description: "仅修改约100个参数即可提升DiT生成质量并减少推理步数，可直接应用于舞蹈生成模型优化。",
      },
      {
        num: 13,
        title: "OmniWeaving：面向自由组合与推理的统一视频生成",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2603.24458",
        description: "统一视频生成模型，支持多模态组合和推理增强，对多模态舞蹈视频生成有架构参考价值。",
      },
    ],
    observation: "本周论文显示自回归视频生成正成为长视频合成的主流范式，但错误累积和KV缓存膨胀仍是核心挑战。ShotStream和PackForcing从不同角度切入——前者通过dual-cache记忆机制和渐进蒸馏保证多镜头一致性，后者通过三层分区KV缓存和动态选择实现24倍时间外推。两者共同指向一个趋势：未来的视频生成架构需要在推理效率和长程一致性之间找到新的平衡点。对于music-to-dance任务，这意味着可以借鉴这些记忆管理和压缩技术来支持更长、更连贯的舞蹈序列生成。同时，AVControl的模块化控制框架展示了LoRA在扩展多模态控制能力方面的潜力，这种'即插即用'的范式可能比训练单一庞大模型更适合需要灵活组合的舞蹈生成场景。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Long Video Generation & Audio-Visual Alignment: Advances in Autoregressive Architectures and Memory Mechanisms",
    overview: [
      "Autoregressive video generation is becoming the mainstream paradigm for long video synthesis, but error accumulation and KV cache膨胀 remain core challenges",
      "Audio-visual joint control frameworks are trending toward modularity, with LoRA adapters emerging as efficient solutions for extending new modalities",
      "Fine-grained expression editing and identity preservation techniques offer important reference value for character naturalness in dance videos"
    ],
    papers: [
      {
        num: 1,
        tag: "Long Video Generation",
        title: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
        description: "ShotStream proposes a causal multi-shot architecture that reformulates multi-shot synthesis as next-shot generation conditioned on historical context. The framework distills a bidirectional teacher model into a 4-step causal student via Distribution Matching Distillation, achieving real-time generation at 16 FPS on a single GPU. Its core innovation, the dual-cache memory mechanism, maintains a global context cache (preserving sparse conditional historical frames for inter-shot consistency) and a local context cache (retaining generated frames within the current shot for intra-shot continuity), coupled with a RoPE discontinuity indicator to eliminate cache ambiguity. The two-stage progressive distillation strategy (starting with intra-shot self-forcing conditioned on ground-truth history, then transitioning to inter-shot self-forcing using self-generated histories) effectively mitigates error accumulation in autoregressive generation. For music-to-dance tasks, this architecture's streaming prompt interaction capability and long-range consistency guarantee mechanism can be directly migrated to address temporal coherence and interactive control issues in generating longer dance sequences.",
        keyPoints: [
          "Dual-cache memory mechanism: global cache ensures inter-shot consistency, local cache guarantees intra-shot continuity",
          "Two-stage progressive distillation: transitioning from real history to self-generated history effectively bridges the train-test gap",
          "16 FPS real-time generation: sub-second latency multi-shot video synthesis on a single GPU"
        ],
        href: "https://arxiv.org/abs/2603.25746",
        paperLink: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
      },
      {
        num: 2,
        tag: "Long Video Generation",
        title: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
        description: "PackForcing addresses two major bottlenecks in autoregressive video diffusion models—error accumulation and unbounded KV cache growth—through a three-partition KV cache strategy. The method categorizes historical context into three types: Sink tokens (preserving early anchor frames at full resolution to maintain global semantics), Mid tokens (achieving 32× spatiotemporal compression via a dual-branch network), and Recent tokens (kept at full resolution to ensure local temporal coherence). A dynamic top-k context selection mechanism strictly limits the capacity of the compressed mid-buffer, while continuous Temporal RoPE Adjustment seamlessly re-aligns position gaps caused by dropped tokens with negligible overhead. The framework can generate coherent 2-minute 832×480 videos (16 FPS) on a single H200 GPU with only 4GB KV cache, achieving 24× temporal extrapolation (5s→120s). For music-to-dance, this hierarchical context compression technology can significantly reduce memory footprint for long dance video generation while maintaining temporal consistency.",
        keyPoints: [
          "Three-partition KV cache: Sink/Mid/Recent tokens with different compression strategies respectively",
          "Dual-branch compression network: fusing progressive 3D convolutions with low-resolution VAE re-encoding for 32× token reduction",
          "24× temporal extrapolation: generating 120-second coherent videos trained only on 5-second clips"
        ],
        href: "https://arxiv.org/abs/2603.25730",
        paperLink: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
      },
      {
        num: 3,
        tag: "Expression Editing",
        title: "PixelSmile: Toward Fine-Grained Facial Expression Editing",
        description: "PixelSmile addresses the inherent semantic overlap problem in fine-grained facial expression editing by constructing the Flex Facial Expression (FFE) dataset with continuous affective annotations and establishing the FFE-Bench evaluation framework. This diffusion framework disentangles expression semantics through fully symmetric joint training, combining intensity supervision with contrastive learning to produce stronger and more distinguishable expression features, achieving precise and stable linear expression control through textual latent interpolation. Experiments demonstrate superior performance in structural confusion, editing accuracy, linear controllability, and the trade-off between expression editing and identity preservation. For music-to-dance tasks, character facial expression naturalness is an important component of overall realism in dance videos. PixelSmile's continuous controllable expression editing technology can be directly applied to refine dance character expressions, enhancing the naturalness and expressiveness of generated videos.",
        keyPoints: [
          "Continuous affective annotations: replacing discrete labels with 12-dimensional affective score distributions to capture fine-grained boundaries of expression manifold",
          "Fully symmetric joint training: contrasting confusing expression pairs to effectively disentangle overlapping semantics",
          "Textual latent interpolation: continuous adjustable expression intensity control without reference images"
        ],
        href: "https://arxiv.org/abs/2603.25728",
        paperLink: "PixelSmile: Toward Fine-Grained Facial Expression Editing",
      },
      {
        num: 4,
        tag: "Audio-Visual Control",
        title: "AVControl: Efficient Framework for Training Audio-Visual Controls",
        description: "Built on the LTX-2 joint audio-visual foundation model, AVControl proposes a lightweight, extensible control framework. Each control modality (depth, pose, camera trajectory, audio transformations, etc.) is trained as a separate LoRA on a parallel canvas, providing the reference signal as additional tokens in attention layers without changing the backbone architecture. Unlike channel concatenation methods, the parallel canvas enables interaction between reference and target through self-attention, supporting fine-grained reference weight modulation globally or locally at inference time. The framework surpasses all evaluated baselines on the VACE benchmark, with each modality requiring only hundreds to thousands of training steps. For music-to-dance, this modular audio-visual control paradigm has direct migration value: audio beat control, reference character appearance preservation, etc. can be trained as independent LoRAs and flexibly combined to achieve more refined dance generation control.",
        keyPoints: [
          "Parallel canvas conditioning: reference signals participate in self-attention as additional tokens, supporting fine-grained weight modulation",
          "Modular LoRA training: each control modality trained independently without retraining existing modalities",
          "Efficient convergence: each modality requires only hundreds to thousands of steps, total budget only one-third of VACE"
        ],
        href: "https://arxiv.org/abs/2603.24793",
        paperLink: "AVControl: Efficient Framework for Training Audio-Visual Controls",
      },
      {
        num: 5,
        tag: "Singing Voice Synthesis",
        title: "YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance",
        description: "YingMusic-Singer is a fully diffusion-based singing voice synthesis system that maintains melody consistency while modifying lyrics. The model requires only three inputs: an optional timbre reference, a singing clip providing the melody, and modified lyrics, without manual alignment or precise annotation. Through curriculum learning strategy and Group Relative Policy Optimization (GRPO) training, this method surpasses comparable baselines like Vevo2 in both melody preservation and lyric adherence. The authors also construct LyricEditBench, the first benchmark for melody-preserving lyric modification evaluation. For music-to-dance tasks, although the domain differs, this paper's audio-melody alignment technology and diffusion model training methods have important reference value—particularly GRPO's experience in balancing multiple objectives (lyric clarity vs. melody preservation) can be borrowed for optimizing audio-motion alignment in dance generation.",
        keyPoints: [
          "No manual alignment: generating melody-consistent singing with only reference audio and modified lyrics",
          "GRPO training: online policy optimization balancing the trade-off between lyric clarity and melody preservation",
          "Centered Kernel Alignment loss: explicitly constraining alignment between predictions and melody features"
        ],
        href: "https://arxiv.org/abs/2603.24589",
        paperLink: "YingMusic-Singer: Controllable Singing Voice Synthesis with Flexible Lyric Manipulation and Annotation-free Melody Guidance",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "MuRF: Unlocking the Multi-Scale Potential of Vision Foundation Models",
        tag: "Visual Representation",
        href: "https://arxiv.org/abs/2603.25744",
        description: "Multi-resolution fusion strategy improving representation quality by processing multi-scale images and fusing features, can enhance detail generation in dance videos.",
      },
      {
        num: 7,
        title: "MegaFlow: Zero-Shot Large Displacement Optical Flow",
        tag: "Motion Estimation",
        href: "https://arxiv.org/abs/2603.25739",
        description: "Zero-shot optical flow estimation based on pre-trained ViT features, can be used for dance motion consistency constraints and post-processing optimization.",
      },
      {
        num: 8,
        title: "Hybrid Memory for Dynamic Video World Models",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2603.25716",
        description: "Acting as precise archivists for static backgrounds and vigilant trackers for dynamic subjects, offering reference value for dance character identity preservation.",
      },
      {
        num: 9,
        title: "Persistent Robot World Models: Stabilizing Multi-Step Rollouts via RL",
        tag: "World Models",
        href: "https://arxiv.org/abs/2603.25685",
        description: "RL post-training methods for stabilizing autoregressive generation, applicable to music-to-dance long sequence generation optimization.",
      },
      {
        num: 10,
        title: "Voxtral TTS: Expressive Multilingual Text-to-Speech",
        tag: "Speech Synthesis",
        href: "https://arxiv.org/abs/2603.25551",
        description: "Hybrid architecture combining autoregressive semantic tokens with flow-matching acoustic tokens, offering insights for audio feature extraction and generation.",
      },
      {
        num: 11,
        title: "PMT: Plain Mask Transformer for Image and Video Segmentation",
        tag: "Segmentation",
        href: "https://arxiv.org/abs/2603.25398",
        description: "Lightweight Transformer segmentation decoder, can be used for character-background separation in dance videos.",
      },
      {
        num: 12,
        title: "Calibri: Enhancing Diffusion Transformers via Parameter-Efficient Calibration",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2603.24800",
        description: "Improving DiT generation quality and reducing inference steps by modifying only ~100 parameters, directly applicable to dance generation model optimization.",
      },
      {
        num: 13,
        title: "OmniWeaving: Towards Unified Video Generation with Free-form Composition",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2603.24458",
        description: "Unified video generation model supporting multimodal composition and reasoning enhancement, offering architectural reference for multimodal dance video generation.",
      },
    ],
    observation: "This week's papers show that autoregressive video generation is becoming the mainstream paradigm for long video synthesis, but error accumulation and KV cache膨胀 remain core challenges. ShotStream and PackForcing approach from different angles—the former guarantees multi-shot consistency through dual-cache memory mechanisms and progressive distillation, while the latter achieves 24× temporal extrapolation through three-partition KV caching and dynamic selection. Both point to a common trend: future video generation architectures need to find a new balance between inference efficiency and long-range consistency. For music-to-dance tasks, this means memory management and compression techniques from these works can be borrowed to support longer, more coherent dance sequence generation. Meanwhile, AVControl's modular control framework demonstrates LoRA's potential in extending multimodal control capabilities, suggesting this 'plug-and-play' paradigm may be more suitable than training single massive models for dance generation scenarios requiring flexible combinations.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-27`,
        'en': `/en/daily/music-to-dance/2026-03-27`,
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
      date="2026-03-27"
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
