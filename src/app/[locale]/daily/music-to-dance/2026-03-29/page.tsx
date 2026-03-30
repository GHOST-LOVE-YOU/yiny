import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "长视频生成与音频-视觉控制：流式架构与记忆机制的新突破",
    overview: [
      "ShotStream提出因果多镜头架构，实现16 FPS实时多镜头视频生成，双缓存记忆机制可有效保持镜头间一致性",
      "PackForcing通过三层KV缓存策略（Sink/Mid/Recent）实现24倍时序外推，仅用5秒训练片段即可生成2分钟连贯视频",
      "AVControl基于LTX-2构建模块化音频-视觉控制框架，每个控制模态作为独立LoRA训练，支持音频强度、语音环境等多种控制"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "ShotStream：流式多镜头视频生成的因果架构",
        description: "ShotStream提出了一种创新的因果多镜头视频生成架构，将多镜头合成重新表述为基于历史上下文的下一镜头生成任务。该方法通过Distribution Matching Distillation将双向教师模型蒸馏为4步因果学生模型，实现了16 FPS的实时生成速度。核心创新包括双缓存记忆机制（全局上下文缓存保持镜头间一致性，局部上下文缓存保持镜头内连续性）以及RoPE不连续指示器来区分两种缓存。两阶段蒸馏策略（镜头内自强制+镜头间自强制）有效缓解了自回归生成中的误差累积问题。在VBench评测中，ShotStream在主体一致性（0.825）、背景一致性（0.819）和镜头过渡控制（0.978）上均达到SOTA水平。对于music-to-dance任务，这种流式架构可直接迁移用于生成更长、更连贯的舞蹈视频序列，支持实时交互式叙事。",
        keyPoints: [
          "因果多镜头架构支持流式提示输入，实现实时交互式视频生成",
          "双缓存记忆机制（全局+局部）分别保持镜头间和镜头内视觉一致性",
          "两阶段渐进蒸馏策略有效弥合训练-测试差距，缓解误差累积"
        ],
        href: "https://arxiv.org/abs/2603.25746",
        paperLink: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
      },
      {
        num: 2,
        tag: "长视频生成",
        title: "PackForcing：短视频训练实现长视频采样的三层KV缓存策略",
        description: "PackForcing针对自回归视频扩散模型中的KV缓存线性增长、时间重复和误差累积三大挑战，提出了创新的三层分区KV缓存策略。该框架将历史上下文分为三类：Sink tokens（保持早期锚点帧完整分辨率）、Mid tokens（通过双分支网络实现32倍token压缩）和Recent tokens（保持完整分辨率确保局部时序连贯）。动态top-k上下文选择机制配合增量式Temporal RoPE调整，在严格限制内存占用的同时保持生成质量。仅用5秒视频片段训练即可实现24倍时序外推（5秒→120秒），在单张H200 GPU上生成2分钟832×480视频时KV缓存仅需4GB。VBench评测显示时序一致性（26.07）和动态程度（56.25）均达SOTA。对于music-to-dance任务，这种高效的长期记忆机制可支持生成更长、更连贯的舞蹈视频，同时大幅降低显存需求。",
        keyPoints: [
          "三层分区KV缓存（Sink/Mid/Recent）将每层注意力限制在约27,872个token",
          "双分支压缩模块（HR分支3D CNN + LR分支VAE重编码）实现32倍token压缩",
          "增量式RoPE旋转调整解决token丢弃导致的位置不连续问题"
        ],
        href: "https://arxiv.org/abs/2603.25730",
        paperLink: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
      },
      {
        num: 3,
        tag: "音频-视觉控制",
        title: "AVControl：基于LTX-2的模块化音频-视觉控制框架",
        description: "AVControl提出了一种轻量级、可扩展的音频-视觉控制框架，基于LTX-2联合音视频基础模型构建。与现有方法不同，每个控制模态（深度、姿态、相机轨迹、音频变换等）都作为独立的LoRA在并行画布上训练，通过注意力层中的额外token提供参考信号，无需修改主干架构。这种设计使得添加新控制模态只需少量数据和几百到几千步训练，所有13个模态的总训练预算仅约55K步（不到VACE的1/3）。框架支持空间对齐控制（深度、姿态、边缘）、相机轨迹控制、稀疏运动控制、视频编辑以及首创的模块化音频-视觉控制（音频强度控制、语音转环境音、谁在说话）。对于music-to-dance任务，该框架的音频-视觉控制模态可直接用于实现更精细的音频-舞蹈动作对齐，支持通过参考音频控制生成视频的强度和节奏。",
        keyPoints: [
          "并行画布条件机制通过自注意力实现参考信号与生成目标的高效交互",
          "每个控制模态作为独立LoRA训练，支持灵活组合和推理时强度调节",
          "小到大控制网格策略根据信息密度调整参考画布分辨率，降低推理延迟"
        ],
        href: "https://arxiv.org/abs/2603.24793",
        paperLink: "AVControl: Efficient Framework for Training Audio-Visual Controls",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "PixelSmile：细粒度表情编辑的扩散框架",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2603.25728",
        description: "通过全对称联合训练解耦表情语义，实现连续可控的细粒度表情编辑，可借鉴用于舞蹈视频中人物表情的精细调控。",
      },
      {
        num: 5,
        title: "Calibri：参数高效校准增强扩散Transformer",
        tag: "DiT优化",
        href: "https://arxiv.org/abs/2603.24800",
        description: "仅修改约100个参数即可显著提升DiT生成质量并减少推理步数，可尝试应用于music-to-dance扩散模型的快速优化。",
      },
      {
        num: 6,
        title: "Voxtral TTS：表达性多语言语音合成",
        tag: "语音合成",
        href: "https://arxiv.org/abs/2603.25551",
        description: "采用自回归语义token+flow-matching声学token的混合架构，为music-to-dance中的音频特征提取提供新思路。",
      },
      {
        num: 7,
        title: "LGTM：4K前馈纹理化高斯泼溅",
        tag: "3D渲染",
        href: "https://arxiv.org/abs/2603.25745",
        description: "通过预测紧凑高斯基元配合每基元纹理实现几何复杂度与渲染分辨率解耦，未来可用于提升舞蹈视频人物外观渲染质量。",
      },
      {
        num: 8,
        title: "YingMusic-Singer：可控歌声合成",
        tag: "歌声合成",
        href: "https://arxiv.org/abs/2603.24589",
        description: "基于课程学习和GRPO训练实现旋律保持的歌词修改，其训练方法可借鉴用于音频-舞蹈对齐任务。",
      },
    ],
    observation: "本周论文呈现出视频生成领域向长序列、实时性和多模态控制方向发展的明显趋势。ShotStream和PackForcing分别从架构设计（因果多镜头）和记忆机制（三层KV缓存）两个角度解决了长视频生成的核心难题，两者都采用了RoPE位置编码的改进策略来处理时序不连续性。AVControl则展示了模块化LoRA训练在音视频控制中的高效性，其并行画布机制为music-to-dance任务中音频-动作对齐提供了可直接迁移的技术路径。值得关注的是，这三项工作都基于或兼容Wan2.1-T2V-1.3B/LTX-2等开源基础模型，显示出开源生态在推动视频生成技术创新中的关键作用。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Long Video Generation & Audio-Visual Control: Breakthroughs in Streaming Architecture and Memory Mechanisms",
    overview: [
      "ShotStream proposes a causal multi-shot architecture achieving 16 FPS real-time generation, with dual-cache memory mechanism for maintaining inter-shot consistency",
      "PackForcing enables 24x temporal extrapolation via three-tier KV cache strategy (Sink/Mid/Recent), generating 2-minute coherent videos from just 5-second training clips",
      "AVControl builds a modular audio-visual control framework on LTX-2, training each control modality as separate LoRA, supporting audio intensity and speech-to-ambient controls"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "ShotStream: Causal Architecture for Streaming Multi-Shot Video Generation",
        description: "ShotStream introduces an innovative causal multi-shot video generation architecture that reformulates multi-shot synthesis as next-shot generation conditioned on historical context. The method distills a bidirectional teacher model into a 4-step causal student via Distribution Matching Distillation, achieving 16 FPS real-time generation. Core innovations include a dual-cache memory mechanism (global context cache for inter-shot consistency, local context cache for intra-shot continuity) and a RoPE discontinuity indicator to distinguish between the two caches. The two-stage distillation strategy (intra-shot self-forcing + inter-shot self-forcing) effectively mitigates error accumulation in autoregressive generation. On VBench evaluation, ShotStream achieves SOTA performance in subject consistency (0.825), background consistency (0.819), and shot transition control (0.978). For music-to-dance tasks, this streaming architecture can be directly migrated to generate longer, more coherent dance video sequences with real-time interactive storytelling support.",
        keyPoints: [
          "Causal multi-shot architecture supports streaming prompt input for real-time interactive video generation",
          "Dual-cache memory mechanism (global + local) maintains inter-shot and intra-shot visual consistency respectively",
          "Two-stage progressive distillation strategy effectively bridges train-test gap and alleviates error accumulation"
        ],
        href: "https://arxiv.org/abs/2603.25746",
        paperLink: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
      },
      {
        num: 2,
        tag: "Long Video Generation",
        title: "PackForcing: Three-Tier KV Cache Strategy for Long Video from Short Training Clips",
        description: "PackForcing addresses three major challenges in autoregressive video diffusion models—linear KV cache growth, temporal repetition, and error accumulation—through an innovative three-partition KV cache strategy. The framework categorizes historical context into three types: Sink tokens (preserving early anchor frames at full resolution), Mid tokens (achieving 32x token compression via dual-branch network), and Recent tokens (maintaining full resolution for local temporal coherence). Dynamic top-k context selection coupled with incremental Temporal RoPE adjustment maintains generation quality while strictly limiting memory footprint. Training on just 5-second video clips enables 24x temporal extrapolation (5s→120s), with only 4GB KV cache needed for 2-minute 832×480 video generation on a single H200 GPU. VBench evaluation shows SOTA temporal consistency (26.07) and dynamic degree (56.25). For music-to-dance tasks, this efficient long-term memory mechanism supports generating longer, more coherent dance videos while significantly reducing memory requirements.",
        keyPoints: [
          "Three-partition KV cache (Sink/Mid/Recent) limits per-layer attention to ~27,872 tokens",
          "Dual-branch compression module (HR branch 3D CNN + LR branch VAE re-encoding) achieves 32x token reduction",
          "Incremental RoPE rotation adjustment resolves positional discontinuities caused by token eviction"
        ],
        href: "https://arxiv.org/abs/2603.25730",
        paperLink: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
      },
      {
        num: 3,
        tag: "Audio-Visual Control",
        title: "AVControl: Modular Audio-Visual Control Framework Based on LTX-2",
        description: "AVControl proposes a lightweight, extensible audio-visual control framework built on the LTX-2 joint audio-visual foundation model. Unlike existing methods, each control modality (depth, pose, camera trajectory, audio transformation, etc.) is trained as a separate LoRA on a parallel canvas, providing reference signals through additional tokens in attention layers without modifying the backbone architecture. This design enables adding new control modalities with only small datasets and a few hundred to thousand training steps, with total training budget for all 13 modalities at only ~55K steps (less than 1/3 of VACE). The framework supports spatially-aligned controls (depth, pose, edges), camera trajectory control, sparse motion control, video editing, and pioneering modular audio-visual controls (audio intensity control, speech-to-ambient, who-is-talking). For music-to-dance tasks, the framework's audio-visual control modalities can be directly applied to achieve finer audio-dance alignment, supporting intensity and rhythm control through reference audio.",
        keyPoints: [
          "Parallel canvas conditioning mechanism enables efficient interaction between reference signals and generation targets via self-attention",
          "Each control modality trained as independent LoRA, supporting flexible combination and inference-time strength modulation",
          "Small-to-large control grid strategy adjusts reference canvas resolution based on information density, reducing inference latency"
        ],
        href: "https://arxiv.org/abs/2603.24793",
        paperLink: "AVControl: Efficient Framework for Training Audio-Visual Controls",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "PixelSmile: Diffusion Framework for Fine-Grained Facial Expression Editing",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2603.25728",
        description: "Disentangles expression semantics through fully symmetric joint training for continuous controllable fine-grained expression editing,借鉴able for fine character expression control in dance videos.",
      },
      {
        num: 5,
        title: "Calibri: Parameter-Efficient Calibration for Enhanced Diffusion Transformers",
        tag: "DiT Optimization",
        href: "https://arxiv.org/abs/2603.24800",
        description: "Modifying only ~100 parameters significantly improves DiT generation quality and reduces inference steps, applicable for rapid optimization of music-to-dance diffusion models.",
      },
      {
        num: 6,
        title: "Voxtral TTS: Expressive Multilingual Text-to-Speech",
        tag: "Speech Synthesis",
        href: "https://arxiv.org/abs/2603.25551",
        description: "Hybrid architecture combining autoregressive semantic tokens with flow-matching acoustic tokens, providing new insights for audio feature extraction in music-to-dance.",
      },
      {
        num: 7,
        title: "LGTM: 4K Feed-Forward Textured Gaussian Splatting",
        tag: "3D Rendering",
        href: "https://arxiv.org/abs/2603.25745",
        description: "Decouples geometric complexity from rendering resolution via compact Gaussian primitives with per-primitive textures, potentially applicable for improving character appearance rendering in dance videos.",
      },
      {
        num: 8,
        title: "YingMusic-Singer: Controllable Singing Voice Synthesis",
        tag: "Singing Synthesis",
        href: "https://arxiv.org/abs/2603.24589",
        description: "Achieves melody-preserving lyric modification through curriculum learning and GRPO training, with training methods借鉴able for audio-dance alignment tasks.",
      },
    ],
    observation: "This week's papers demonstrate a clear trend in video generation toward long sequences, real-time capabilities, and multimodal control. ShotStream and PackForcing address core challenges in long video generation from two angles—architectural design (causal multi-shot) and memory mechanisms (three-tier KV cache)—both employing improved RoPE positional encoding strategies to handle temporal discontinuities. AVControl showcases the efficiency of modular LoRA training in audio-visual control, with its parallel canvas mechanism providing a directly transferable technical path for audio-motion alignment in music-to-dance tasks. Notably, all three works are based on or compatible with open-source foundation models like Wan2.1-T2V-1.3B/LTX-2, highlighting the critical role of open-source ecosystems in driving video generation technology innovation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-29`,
        'en': `/en/daily/music-to-dance/2026-03-29`,
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
      date="2026-03-29"
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
