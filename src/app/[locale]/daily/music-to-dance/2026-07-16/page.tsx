import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "视频生成中的时序一致性与动作表示学习",
    overview: [
      "VideoRAE 提出利用冻结的视频基础模型(V-JEPA 2等)作为编码器，将语义丰富的表示转化为生成友好的latent空间，收敛速度提升5倍",
      "FlowWAM 将光流作为统一的动作表示，与视频生成联合建模，为舞蹈动作生成提供新的表示思路",
      "Hallo4D 针对4D生成中的时空一致性问题，提出LMM驱动的检测-修正范式，可直接迁移解决舞蹈视频中的身份闪烁和抖动问题"
    ],
    papers: [
      {
        num: 1,
        tag: "视频表示学习",
        title: "VideoRAE：利用视频基础模型的表示进行生成建模",
        description: "VideoRAE 首次系统性地证明冻结的视频基础模型(VFM)可直接作为视频生成的编码器。与传统3D-VAE仅优化像素级重建不同，VideoRAE利用V-JEPA 2等模型的层次化语义特征，通过轻量级1D自注意力投影器压缩为紧凑latent空间。关键创新在于解码阶段的局部-全局表示对齐(REPA)目标——无需KL正则化即可保持语义流形的良好结构。实验显示，在UCF-101上AR和DiT生成器分别达到gFVD 40和93的最先进结果，且收敛速度比基线快约5倍。对于music-to-dance任务，当前方案使用3D-VAE编码视频，可直接借鉴这种利用预训练VFM表示的方法，提升时序一致性和语义保持能力。",
        keyPoints: [
          "利用冻结VFM(V-JEPA 2/VideoMAEv2)作为编码器，提取层次化时空特征",
          "1D自注意力投影器将冗余3D特征压缩为紧凑1D latent序列",
          "REPA对齐目标替代KL散度，保持语义流形结构",
          "支持连续latent(DiT)和离散token(AR)两种生成范式"
        ],
        href: "https://arxiv.org/abs/2607.14088",
        paperLink: "VideoRAE: Taming Video Foundation Models for Generative Modeling via Representation Autoencoders",
      },
      {
        num: 2,
        tag: "动作表示",
        title: "FlowWAM：光流作为统一的动作表示",
        description: "FlowWAM 提出将光流作为World Action Models的统一动作表示，解决数值动作与视频生成器不对齐、视觉动作缺乏时序运动结构的问题。光流以HSV编码转为RGB格式，与视频帧共享相同格式，可直接输入VAE编码器和视频生成器。双路DiT架构让RGB和光流token在自注意力层中联合处理，实现深层的时空交互。在策略模式下生成未来光流并解码为动作，在世界模型模式下用目标光流指导视频生成。RoboTwin上达到92.94%成功率，WorldArena上EWMScore 63.71。对于舞蹈生成，人物运动可视为光流场，这种表示可直接用于改进当前方案的motion表示学习，解耦姿态与外观。",
        keyPoints: [
          "光流作为视频原生动作表示，与RGB共享格式，弥合控制信号与视频先验的模态鸿沟",
          "双路DiT联合建模RGB和光流，通过拼接-分离机制实现深层交互",
          "支持策略模式(生成光流→解码动作)和世界模型模式(光流条件→生成视频)",
          "可从无动作标签的视频中提取光流进行预训练，利用大规模未标注数据"
        ],
        href: "https://arxiv.org/abs/2607.13017",
        paperLink: "FlowWAM: Optical Flow as a Unified Action Representation for World Action Models",
      },
      {
        num: 3,
        tag: "时空一致性",
        title: "Hallo4D：多模态幻觉缓解实现一致的时空生成",
        description: "Hallo4D 针对3D/4D生成中的时空幻觉问题(重复结构、几何错位、抖动、身份闪烁)，提出无需重新训练或修改架构的生成-检测-修正范式。利用多模态大语言模型(LMM)从多视角多帧渲染中识别时空不一致性，通过共识驱动的图像空间优化进行修正——LMM选择器通过多模型投票评估候选修正。4D生成特有组件包括：LMM引导的初始化阶段、基于光流运动显著性的关键帧采样(OF-Range)、曝光感知语义对齐(CSEA和LDR损失)。舞蹈视频生成面临完全相同的挑战：人物身份保持、动作连贯性、跨帧外观一致。Hallo4D的LMM驱动检测-修正范式可直接迁移，特别是其运动感知采样策略对长舞蹈序列的优化具有直接参考价值。",
        keyPoints: [
          "生成-检测-修正范式：LMM识别时空不一致，共识驱动扩散编辑修正",
          "OF-Range关键帧采样：基于光流运动显著性，优先优化动态信息丰富帧",
          "曝光感知损失(CSEA+LDR)解决非正视视角下的曝光不稳定",
          "无需重新训练，可即插即用到现有3D/4D生成模型"
        ],
        href: "https://arxiv.org/abs/2607.12752",
        paperLink: "Hallo4D: Multi-Modal Hallucination Mitigation for Consistent Spatio-Temporal Generation",
      },
      {
        num: 4,
        tag: "视频扩散理论",
        title: "视频扩散模型的序列性鸿沟",
        description: "该研究揭示视频扩散模型的根本性限制：在需要长链依赖事件预测的任务上，标准双向扩散性能随因果链长度增加而下降，即使增加去噪步数也无法弥补。通过硬球动力学实验(多球碰撞链vs单球对照)，证明这种「序列性鸿沟」源于依赖事件结构而非视频长度。理论证明：对于确定性视频预测，去噪步骤不提供超出骨干网络的额外串行计算能力。增加深度比增加宽度更有效，自回归/分块生成能单调提升性能。舞蹈动作具有强时序因果性——前一帧姿态影响后一帧，音乐节拍驱动运动转换。理解这一结构性限制有助于优化当前方案的时序建模策略，考虑在关键帧引入自回归或分块生成机制。",
        keyPoints: [
          "序列性鸿沟：双向扩散在依赖事件链增长时性能下降，去噪步数无法解决",
          "理论证明：确定性预测中，去噪不提供超出骨干的额外串行计算",
          "深度增加比宽度更有效；自回归/分块生成可改善依赖事件预测",
          "对舞蹈生成启示：关键帧可考虑引入自回归机制处理强时序因果"
        ],
        href: "https://arxiv.org/abs/2607.13031",
        paperLink: "The Seriality Gap in Video Diffusion Models",
      },
      {
        num: 5,
        tag: "音乐表示",
        title: "MIDI-RAE-JEPA：符号音乐的层次化表示学习与生成",
        description: "MIDI-RAE-JEPA 提出结合音高-时间平移等变目标与LeJEPA的符号音乐层次化表示学习方法。钢琴卷帘表示为128×128二值图像，Swin Transformer V2编码器学习从局部音符到全局结构的层次化特征。核心创新是平滑等变损失：嵌入距离与平移幅度成正比，保持几何一致的latent空间。冻结编码器嵌入训练独立解码器，重建F1达0.995；条件flow matching生成模型能根据条件片段生成音高范围和节奏密度匹配的音乐。对于music-to-dance任务，当前方案使用3D Audio Attention对齐音乐节拍与运动，可借鉴其等变性思想改进音频编码——特别是time-shift等变目标对节拍编码的启示，以及层次化表示对长时程音乐结构建模的参考价值。",
        keyPoints: [
          "音高-时间平移等变目标：嵌入距离与变换幅度成正比，保持几何结构",
          "层次化Swin编码器：6级金字塔结构，从音符到乐句到乐段",
          "冻结表示支持重建和条件生成，验证表示的生成可用性",
          "等变性可测量验证：嵌入距离随音高/时间平移单调增加"
        ],
        href: "https://arxiv.org/abs/2607.14537",
        paperLink: "MIDI-RAE-JEPA: Hierarchical Representation Learning and Generation for Symbolic Music",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "AVSCap：音视频协同的全模态视频描述",
        tag: "跨模态对齐",
        href: "https://arxiv.org/abs/2607.12820",
        description: "显式跨模态事件绑定框架，解耦-融合训练流程对音频-视觉对齐有参考价值。",
      },
      {
        num: 7,
        title: "ChunkFlow：连续性一致的分块策略学习",
        tag: "时序连续性",
        href: "https://arxiv.org/abs/2607.12992",
        description: "解决分块动作头中的边界抖动问题，对长视频生成的时序连续性有借鉴意义。",
      },
      {
        num: 8,
        title: "Boogu-Image-0.1：开源统一多模态理解与生成",
        tag: "多模态生成",
        href: "https://arxiv.org/abs/2607.13125",
        description: "统一多模态理解与生成模型，训练成本仅$400K，可作为外观迁移参考。",
      },
      {
        num: 9,
        title: "离散扩散模型：从token化到生成的统一框架",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2607.13431",
        description: "离散扩散模型设计空间的统一视角，可能启发新的音频/动作表示方法。",
      },
    ],
    observation: "今日论文围绕视频生成的核心挑战展开：VideoRAE和FlowWAM分别从表示学习和动作表示角度改进视频生成基础；Hallo4D和Seriality Gap研究则聚焦时序一致性这一舞蹈视频的关键难题。一个值得关注的趋势是：冻结的基础模型表示(VFM、VLM)正成为视频生成的新基石，这与当前music-to-dance方案从零训练3D-VAE的做法形成对比，迁移预训练表示可能是提升生成质量的重要方向。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Temporal Consistency and Motion Representation in Video Generation",
    overview: [
      "VideoRAE proposes using frozen video foundation models (V-JEPA 2, etc.) as encoders, converting semantically rich representations into generation-friendly latent spaces with 5x faster convergence",
      "FlowWAM introduces optical flow as a unified action representation jointly modeled with video generation, offering new insights for dance motion representation",
      "Hallo4D addresses spatiotemporal consistency in 4D generation through an LMM-driven detection-correction paradigm, directly applicable to solving identity flicker and jitter in dance videos"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Representation Learning",
        title: "VideoRAE: Leveraging Video Foundation Model Representations for Generative Modeling",
        description: "VideoRAE is the first to systematically demonstrate that frozen Video Foundation Models (VFMs) can serve as encoders for video generation. Unlike traditional 3D-VAEs that only optimize pixel-level reconstruction, VideoRAE utilizes hierarchical semantic features from models like V-JEPA 2, compressing them into compact latent spaces through a lightweight 1D self-attention projector. The key innovation is the local-and-global Representation Alignment (REPA) objective during decoding—which maintains well-structured semantic manifolds without KL regularization. Experiments show state-of-the-art gFVD results of 40 (AR) and 93 (DiT) on UCF-101, with approximately 5x faster convergence than baselines. For music-to-dance tasks, which currently use 3D-VAE for video encoding, this approach of leveraging pretrained VFM representations can be directly adopted to improve temporal consistency and semantic preservation.",
        keyPoints: [
          "Utilizes frozen VFMs (V-JEPA 2/VideoMAEv2) as encoders to extract hierarchical spatiotemporal features",
          "1D self-attention projector compresses redundant 3D features into compact 1D latent sequences",
          "REPA alignment objective replaces KL divergence to maintain semantic manifold structure",
          "Supports both continuous latents (DiT) and discrete tokens (AR) generation paradigms"
        ],
        href: "https://arxiv.org/abs/2607.14088",
        paperLink: "VideoRAE: Taming Video Foundation Models for Generative Modeling via Representation Autoencoders",
      },
      {
        num: 2,
        tag: "Motion Representation",
        title: "FlowWAM: Optical Flow as a Unified Action Representation",
        description: "FlowWAM proposes optical flow as a unified action representation for World Action Models, addressing the misalignment between numerical actions and video generators, and the lack of temporal motion structure in visual actions. Flow is converted to RGB format via HSV encoding, sharing the same format as video frames and directly compatible with VAE encoders and video generators. The dual-stream DiT architecture enables joint processing of RGB and flow tokens through self-attention layers, achieving deep spatiotemporal interaction. In policy mode, future flow is generated and decoded into actions; in world-model mode, target flow guides video generation. Achieves 92.94% success on RoboTwin and EWMScore 63.71 on WorldArena. For dance generation, human motion can be viewed as flow fields—this representation can directly improve motion representation learning in current approaches, decouposing pose from appearance.",
        keyPoints: [
          "Optical flow as video-native action representation shares format with RGB, bridging the modality gap",
          "Dual-stream DiT jointly models RGB and flow through concatenation-splitting mechanism",
          "Supports policy mode (flow generation → action decoding) and world-model mode (flow conditioning → video generation)",
          "Flow can be extracted from videos without action labels, enabling pretraining on large-scale unlabeled data"
        ],
        href: "https://arxiv.org/abs/2607.13017",
        paperLink: "FlowWAM: Optical Flow as a Unified Action Representation for World Action Models",
      },
      {
        num: 3,
        tag: "Spatiotemporal Consistency",
        title: "Hallo4D: Multi-Modal Hallucination Mitigation for Consistent Spatio-Temporal Generation",
        description: "Hallo4D addresses spatiotemporal hallucinations in 3D/4D generation (duplicate structures, geometric misalignment, jitter, identity flicker) through a generation-detection-correction paradigm requiring no retraining or architecture modification. It leverages Large Multimodal Models (LMMs) to identify spatiotemporal inconsistencies from multi-view multi-frame renderings, correcting them via consensus-driven image-space optimization—where an LMM selector evaluates candidates through multi-model voting. 4D-specific components include: LMM-guided initialization, optical-flow-based motion-saliency keyframe sampling (OF-Range), and exposure-aware semantic alignment (CSEA and LDR losses). Dance video generation faces identical challenges: identity preservation, motion coherence, cross-frame appearance consistency. Hallo4D's LMM-driven detection-correction paradigm can be directly transferred, especially its motion-aware sampling strategy for optimizing long dance sequences.",
        keyPoints: [
          "Generation-detection-correction paradigm: LMM identifies inconsistencies, consensus-driven diffusion editing corrects",
          "OF-Range keyframe sampling: prioritizes frames with motion saliency based on optical flow",
          "Exposure-aware losses (CSEA+LDR) solve exposure instability under non-frontal views",
          "Plug-and-play to existing 3D/4D generation models without retraining"
        ],
        href: "https://arxiv.org/abs/2607.12752",
        paperLink: "Hallo4D: Multi-Modal Hallucination Mitigation for Consistent Spatio-Temporal Generation",
      },
      {
        num: 4,
        tag: "Video Diffusion Theory",
        title: "The Seriality Gap in Video Diffusion Models",
        description: "This study reveals a fundamental limitation of video diffusion models: on tasks requiring prediction of long chains of dependent events, standard bidirectional diffusion performance degrades as causal chain length increases, even with more denoising steps. Through hard-sphere dynamics experiments (multi-ball collision chains vs single-ball control), it proves this 'seriality gap' stems from dependent event structure rather than video length. Theoretically proven: for deterministic video prediction, denoising steps do not provide additional serial computation beyond the backbone. Increasing depth is more effective than width; autoregressive/blockwise generation monotonically improves performance. Dance motion has strong temporal causality—previous pose affects next frame, music beats drive motion transitions. Understanding this structural limitation helps optimize temporal modeling strategies, considering introducing autoregressive or blockwise generation at keyframes.",
        keyPoints: [
          "Seriality gap: bidirectional diffusion degrades with dependent event chain length; denoising steps cannot fix",
          "Theoretical proof: denoising doesn't provide serial computation beyond backbone for deterministic prediction",
          "Depth increase more effective than width; autoregressive/blockwise generation improves dependent event prediction",
          "Implication for dance generation: consider autoregressive mechanisms at keyframes for strong temporal causality"
        ],
        href: "https://arxiv.org/abs/2607.13031",
        paperLink: "The Seriality Gap in Video Diffusion Models",
      },
      {
        num: 5,
        tag: "Music Representation",
        title: "MIDI-RAE-JEPA: Hierarchical Representation Learning for Symbolic Music",
        description: "MIDI-RAE-JEPA proposes hierarchical representation learning for symbolic music combining pitch-time translation equivariance objectives with LeJEPA. Piano roll representations (128×128 binary images) are processed by a Swin Transformer V2 encoder learning hierarchical features from local notes to global structure. The core innovation is smooth equivariance loss: embedding distance proportional to translation magnitude, maintaining geometrically consistent latent space. A separate decoder trained on frozen encoder embeddings achieves F1 of 0.995; conditional flow matching generation produces music matching the pitch register and rhythmic density of conditioning excerpts. For music-to-dance tasks, which currently use 3D Audio Attention to align music beats with motion, the equivariance ideas can improve audio encoding—particularly time-shift equivariance objectives for beat encoding, and hierarchical representations for long-term music structure modeling.",
        keyPoints: [
          "Pitch-time translation equivariance: embedding distance proportional to transformation magnitude",
          "Hierarchical Swin encoder: 6-level pyramid from notes to phrases to sections",
          "Frozen representations support reconstruction and conditional generation",
          "Measurable equivariance: embedding distances increase monotonically with pitch/time shifts"
        ],
        href: "https://arxiv.org/abs/2607.14537",
        paperLink: "MIDI-RAE-JEPA: Hierarchical Representation Learning and Generation for Symbolic Music",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "AVSCap: Orchestrating Audio-Visual Synergy for Video Captioning",
        tag: "Cross-modal Alignment",
        href: "https://arxiv.org/abs/2607.12820",
        description: "Explicit cross-modal event binding framework; decouple-then-fuse training pipeline relevant for audio-visual alignment.",
      },
      {
        num: 7,
        title: "ChunkFlow: Continuity-Consistent Chunked Policy Learning",
        tag: "Temporal Continuity",
        href: "https://arxiv.org/abs/2607.12992",
        description: "Addresses boundary jitter in chunked action heads; relevant for long video generation temporal continuity.",
      },
      {
        num: 8,
        title: "Boogu-Image-0.1: Unified Multimodal Understanding and Generation",
        tag: "Multimodal Generation",
        href: "https://arxiv.org/abs/2607.13125",
        description: "Unified multimodal understanding/generation model with $400K training cost; reference for appearance transfer.",
      },
      {
        num: 9,
        title: "Discrete Diffusion Models: A Unified Framework",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2607.13431",
        description: "Unified view of discrete diffusion model design space; may inspire new audio/motion representations.",
      },
    ],
    observation: "Today's papers center on core challenges in video generation: VideoRAE and FlowWAM improve video generation foundations from representation learning and motion representation perspectives; Hallo4D and Seriality Gap research focus on temporal consistency—a critical challenge for dance videos. A notable trend: frozen foundation model representations (VFM, VLM) are becoming new cornerstones for video generation, contrasting with current music-to-dance approaches that train 3D-VAE from scratch. Transferring pretrained representations may be an important direction for improving generation quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-16`,
        'en': `/en/daily/music-to-dance/2026-07-16`,
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
      date="2026-07-16"
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
