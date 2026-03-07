import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "4D重建与实时生成：人体运动合成的新前沿",
    overview: [
      "本周论文聚焦4D动态场景重建与实时视频生成技术",
      "ArtHOI提出零样本关节式人体-物体交互合成框架",
      "MIBURI实现首个实时因果语音驱动手势生成系统",
      "Helios实现14B模型19.5 FPS实时长视频生成突破"
    ],
    papers: [
      {
        num: 1,
        tag: "4D重建 / 人体交互",
        title: "ArtHOI：基于视频先验的4D重建实现关节式人体-物体交互合成",
        description: "ArtHOI是首个零样本关节式人体-物体交互(HOI)合成框架，通过4D重建从单目视频先验中恢复几何一致且物理合理的动态场景。核心创新包括：1)基于光流的部件分割，利用光流作为几何线索分离动态与静态区域；2)解耦重建流水线，先重建物体关节运动再生成以物体状态为条件的人体运动，解决单目歧义下的联合优化不稳定问题。实验表明该方法在接触精度、穿透减少和关节保真度上显著优于现有方法。对于music-to-dance任务，ArtHOI的两阶段重建思路可迁移到舞蹈生成：先重建音乐节奏结构，再生成以节奏为条件的舞蹈动作；其接触感知损失对舞蹈中的手势-身体交互建模也有参考价值。",
        keyPoints: [
          "零样本4D重建：无需3D监督，从单目视频先验重建关节式人体-物体交互",
          "解耦两阶段流水线：先重建物体关节运动，再生成条件化人体运动",
          "接触感知损失：显式建模手部-物体接触，确保物理合理性"
        ],
        href: "https://arxiv.org/abs/2603.04338",
        paperLink: "ArtHOI: Articulated Human-Object Interaction Synthesis by 4D Reconstruction from Video Priors",
      },
      {
        num: 2,
        tag: "4D生成 / 时空解耦",
        title: "OSTDT：正交时空分布迁移的4D生成框架",
        description: "OSTDT(Orthogonal Spatial-temporal Distributional Transfer)提出从3D扩散模型迁移空间先验、从视频扩散模型迁移时间先验来增强4D合成。核心创新是时空解耦的4D扩散模型(STD-4D Diffusion)，通过正交子空间投影显式分离空间和时间特征分布，避免直接叠加导致的灾难性遗忘。具体采用交错式时空UNet保持特征表示分离，再通过Orster机制分别注入空间和时间知识。实验显示该方法在4D人类运动合成和动态场景生成上达到SOTA。对于music-to-dance任务，其正交解耦思路可直接应用于音频-姿态联合建模：将音频节奏和舞蹈姿态视为正交分布分别编码再融合，可能比直接拼接更有效。",
        keyPoints: [
          "时空解耦4D扩散：通过正交子空间投影分离空间和时间特征分布",
          "Orster知识迁移：分别从3D扩散迁移空间先验、视频扩散迁移时间先验",
          "ST-HexPlane 4D构建：时空感知六平面整合迁移特征用于4D高斯建模"
        ],
        href: "https://arxiv.org/abs/2603.05081",
        paperLink: "Orthogonal Spatial-temporal Distributional Transfer for 4D Generation",
      },
      {
        num: 3,
        tag: "语音驱动 / 实时生成",
        title: "MIBURI：实时因果语音驱动手势生成系统",
        description: "MIBURI是首个在线、因果、实时的表达性全身手势生成框架，可直接接入语音-文本基础模型(Moshi)的内部token流生成分歧化对话手势。核心创新包括：1)身体部位感知手势编解码器，将分层运动细节编码为多级离散token；2)二维因果生成框架，一个transformer建模时序上下文，另一个生成每帧骨架感知运动特征；3)直接利用Moshi内部语义/声学token避免传统管道的延迟瓶颈。实验表明该方法在实时性约束下仍能生成自然且上下文对齐的手势。对于music-to-dance任务，MIBURI的因果实时架构是音频驱动舞蹈生成的理想参考——其身体部位分群token化和残差VQ-VAE编码可直接迁移；利用基础模型内部token而非外部音频特征的思路也值得借鉴。",
        keyPoints: [
          "因果实时架构：基于Moshi内部token流的在线手势生成，满足实时交互需求",
          "身体部位感知编解码：面/上肢/下肢分群token化，残差VQ-VAE分层编码",
          "二维生成框架：时序transformer+运动transformer分别建模时间和空间层次"
        ],
        href: "https://arxiv.org/abs/2603.03282",
        paperLink: "MIBURI: Towards Expressive Interactive Gesture Synthesis",
      },
      {
        num: 4,
        tag: "实时视频生成 / 长视频",
        title: "Helios：14B参数实时长视频生成模型",
        description: "Helios是首个在单卡H100上达到19.5 FPS的14B视频生成模型，支持分钟级长视频生成且质量匹敌强基线。三大核心突破：1)无需Self-Forcing或Error-Bank等启发式策略即可实现稳健长视频生成，通过表征控制和引导注意力高效注入历史上下文；2)无需KV-Cache、稀疏注意力等标准加速技术即可实时生成，通过多期记忆Patch化和金字塔统一预测校正器大幅减少token数量，对抗分层蒸馏将采样步数从50降至3；3)无需并行或分片框架即可训练，通过基础设施级优化在80GB显存内同时容纳4个14B模型。对于music-to-dance任务，Helios的实时长视频能力对长舞蹈序列生成至关重要；其统一历史注入机制可为长舞蹈视频的时序一致性保持提供参考；3步蒸馏方案也可用于加速舞蹈生成推理。",
        keyPoints: [
          "统一历史注入：通过Representation Control和Guidance Attention高效注入历史上下文",
          "多期记忆Patch化：将历史上下文压缩为长/中/短期记忆，减少DiT输入token数",
          "对抗分层蒸馏：纯教师强制方法将采样步数从50降至3，实现实时生成"
        ],
        href: "https://arxiv.org/abs/2603.04379",
        paperLink: "Helios: Real Real-Time Long Video Generation Model",
      },
      {
        num: 5,
        "tag": "360°视频 / 自回归生成",
        "title": "CubeComposer：时空自回归4K 360°视频生成",
        "description": "CubeComposer是首个原生生成4K分辨率360°视频的时空自回归扩散模型。核心创新是通过cubemap表示将视频分解为六个面，按规划的时空顺序自回归合成。关键设计包括：1)时空生成顺序规划策略，时间因果+空间覆盖优先排序，优先生成条件充分的面以减少早期不确定性；2)立方体面上下文管理机制，稀疏上下文注意力设计提高效率；3)连续性感知技术，立方体感知位置编码、填充和混合消除边界接缝。相比依赖超分辨率的现有方法(最高1K)，CubeComposer原生4K生成显著减少误差级联。对于music-to-dance任务，其时空自回归思路可用于多视角舞蹈视频生成；cubemap分解策略也可借鉴用于将长舞蹈序列分解为可管理的时空块逐一生成。",
        keyPoints: [
          "Cubemap时空自回归：将360°视频分解为六个面，按时空顺序逐步生成",
          "覆盖优先排序：优先生成条件充分的面，有效传播几何/外观/运动线索",
          "连续性感知设计：立方体感知位置编码和边界混合消除接缝"
        ],
        href: "https://arxiv.org/abs/2603.04291",
        paperLink: "CubeComposer: Spatio-Temporal Autoregressive 4K 360° Video Generation from Perspective Video",
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "CalibAtt：校准稀疏注意力加速视频生成",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2603.05503",
        description: "无需训练即可实现1.58x端到端加速，通过离线校准识别块级稀疏模式，可用于优化3D Audio Attention的推理效率。",
      },
      {
        num: 7,
        title: "MoRe：运动感知前馈4D重建Transformer",
        tag: "4D重建",
        href: "https://arxiv.org/abs/2603.05078",
        description: "单次前馈实现实时4D重建，运动感知注意力显式建模时序对应关系，可为舞蹈姿态估计提供实时解决方案。",
      },
      {
        num: 8,
        title: "频率感知误差边界缓存加速扩散Transformer",
        tag: "训练效率",
        href: "https://arxiv.org/abs/2603.05315",
        description: "利用高低频特征稳定性差异，在后续去噪步缓存稳定特征，可用于加速舞蹈视频生成的扩散模型推理。",
      },
      {
        num: 9,
        title: "FaceCam：尺度感知人像视频相机控制",
        tag: "相机控制",
        href: "https://arxiv.org/abs/2603.05506",
        description: "CVPR 2026工作，提出面部定制的尺度感知相机表示，对舞蹈视频的多视角生成和相机轨迹控制有参考价值。",
      },
      {
        num: 10,
        title: "InfinityStory：无限长视频生成与世界一致性",
        tag: "长视频生成",
        href: "https://arxiv.org/abs/2603.03646",
        description: "链式帧推理机制保持叙事和视觉连贯性，记忆增强架构存储检索相关上下文，对长舞蹈视频的叙事连贯性有启发。",
      }
    ],
    observation: "本周论文呈现出视频生成从「短时片段」向「长时连贯」、从「离线生成」向「实时交互」转型的明显趋势。Helios和MIBURI分别从基础设施架构和交互范式两个角度突破了实时性瓶颈，这对music-to-dance的实际应用至关重要——舞蹈生成如果不能实时响应音乐变化，就难以在直播、互动娱乐等场景落地。特别值得关注的是MIBURI直接利用基础模型内部token的思路：与其在外部拼接音频编码器和运动生成器，不如直接接入音乐理解模型(如MusicBERT/Jukebox)的内部表示，可能获得更丰富的节奏和风格信息。此外，ArtHOI和OSTDT的解耦思想也值得深思：舞蹈生成中的「音乐理解」和「动作合成」是否也应该解耦为两个正交子空间？",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "4D Reconstruction and Real-Time Generation: New Frontiers in Human Motion Synthesis",
    overview: [
      "This week's papers focus on 4D dynamic scene reconstruction and real-time video generation",
      "ArtHOI proposes a zero-shot articulated human-object interaction synthesis framework",
      "MIBURI achieves the first real-time causal speech-driven gesture generation system",
      "Helios achieves breakthrough 19.5 FPS real-time long video generation with 14B parameters"
    ],
    papers: [
      {
        num: 1,
        tag: "4D Reconstruction / Human Interaction",
        title: "ArtHOI: 4D Reconstruction from Video Priors for Articulated Human-Object Interaction Synthesis",
        description: "ArtHOI is the first zero-shot articulated human-object interaction (HOI) synthesis framework that reconstructs geometrically consistent and physically plausible 4D dynamic scenes from monocular video priors. Core innovations include: 1) Flow-based part segmentation using optical flow as geometric cues to separate dynamic from static regions; 2) Decoupled reconstruction pipeline that first reconstructs object articulation then synthesizes human motion conditioned on object states, addressing instability in joint optimization under monocular ambiguity. Experiments show significant improvements in contact accuracy, penetration reduction, and articulation fidelity. For music-to-dance tasks, ArtHOI's two-stage reconstruction approach can be migrated: first reconstruct music rhythmic structure, then generate dance movements conditioned on rhythm; its contact-aware loss is also valuable for modeling hand-body interactions in dance.",
        keyPoints: [
          "Zero-shot 4D reconstruction: Reconstructs articulated HOI from monocular video without 3D supervision",
          "Decoupled two-stage pipeline: Object articulation reconstruction followed by conditional human motion generation",
          "Contact-aware loss: Explicitly models hand-object contact for physical plausibility"
        ],
        href: "https://arxiv.org/abs/2603.04338",
        paperLink: "ArtHOI: Articulated Human-Object Interaction Synthesis by 4D Reconstruction from Video Priors",
      },
      {
        num: 2,
        tag: "4D Generation / Spatio-Temporal Disentanglement",
        title: "OSTDT: Orthogonal Spatial-temporal Distributional Transfer for 4D Generation",
        description: "OSTDT proposes transferring spatial priors from 3D diffusion models and temporal priors from video diffusion models to enhance 4D synthesis. The core innovation is the spatial-temporal-disentangled 4D diffusion model (STD-4D Diffusion) that explicitly separates spatial and temporal feature distributions through orthogonal subspace projection, avoiding catastrophic forgetting from direct superposition. Specifically, it employs interleaved spatial-temporal UNet to maintain feature separation, then injects spatial and temporal knowledge separately through the Orster mechanism. Experiments show SOTA results in 4D human motion synthesis and dynamic scene generation. For music-to-dance tasks, the orthogonal disentanglement approach can be directly applied to audio-pose joint modeling: treating audio rhythm and dance pose as orthogonal distributions for separate encoding before fusion may be more effective than direct concatenation.",
        keyPoints: [
          "Spatial-temporal disentangled 4D diffusion: Separates spatial and temporal feature distributions via orthogonal subspace projection",
          "Orster knowledge transfer: Transfers spatial priors from 3D diffusion and temporal priors from video diffusion separately",
          "ST-HexPlane 4D construction: Spatial-temporal-aware hexplane integrates transferred features for 4D Gaussian modeling"
        ],
        href: "https://arxiv.org/abs/2603.05081",
        paperLink: "Orthogonal Spatial-temporal Distributional Transfer for 4D Generation",
      },
      {
        num: 3,
        tag: "Speech-Driven / Real-Time Generation",
        title: "MIBURI: Real-Time Causal Speech-Driven Gesture Generation System",
        description: "MIBURI is the first online, causal, real-time expressive full-body gesture generation framework that directly taps into the internal token stream of a speech-text foundation model (Moshi) to generate divergent conversational gestures. Core innovations include: 1) Body-part-aware gesture codec that encodes hierarchical motion details into multi-level discrete tokens; 2) Two-dimensional causal generation framework with one transformer modeling temporal context and another generating per-frame skeleton-aware kinematic features; 3) Direct utilization of Moshi's internal semantic/acoustic tokens to avoid latency bottlenecks of traditional pipelines. Experiments show the method generates natural and contextually aligned gestures even under real-time constraints. For music-to-dance tasks, MIBURI's causal real-time architecture is an ideal reference for audio-driven dance generation—its body-part-grouped tokenization and residual VQ-VAE encoding can be directly migrated; the approach of using foundation model internal tokens rather than external audio features is also worth learning from.",
        keyPoints: [
          "Causal real-time architecture: Online gesture generation based on Moshi internal tokens, meeting real-time interaction requirements",
          "Body-part-aware codec: Face/upper/lower body grouped tokenization, residual VQ-VAE hierarchical encoding",
          "2D generation framework: Temporal transformer + motion transformer modeling time and spatial hierarchies separately"
        ],
        href: "https://arxiv.org/abs/2603.03282",
        paperLink: "MIBURI: Towards Expressive Interactive Gesture Synthesis",
      },
      {
        num: 4,
        tag: "Real-Time Video / Long Video",
        title: "Helios: 14B Real-Time Long Video Generation Model",
        description: "Helios is the first 14B video generation model to achieve 19.5 FPS on a single H100 GPU, supporting minute-scale long video generation with quality matching strong baselines. Three core breakthroughs: 1) Robust long video generation without heuristic strategies like Self-Forcing or Error-Bank, through Representation Control and Guidance Attention for efficient historical context injection; 2) Real-time generation without standard acceleration techniques like KV-Cache or sparse attention, through Multi-Term Memory Patchification and Pyramid Unified Predictor Corrector to drastically reduce token count, plus Adversarial Hierarchical Distillation reducing sampling steps from 50 to 3; 3) Training without parallelism or sharding frameworks, through infrastructure-level optimizations fitting 4 14B models in 80GB VRAM. For music-to-dance tasks, Helios's real-time long video capability is crucial for long dance sequence generation; its unified history injection mechanism provides reference for temporal consistency in long dance videos; the 3-step distillation scheme can also accelerate dance generation inference.",
        keyPoints: [
          "Unified history injection: Efficient historical context injection through Representation Control and Guidance Attention",
          "Multi-term memory patchification: Compresses historical context into long/mid/short-term memory, reducing DiT input tokens",
          "Adversarial hierarchical distillation: Pure teacher-forcing approach reducing sampling steps from 50 to 3 for real-time generation"
        ],
        href: "https://arxiv.org/abs/2603.04379",
        paperLink: "Helios: Real Real-Time Long Video Generation Model",
      },
      {
        num: 5,
        tag: "360° Video / Autoregressive Generation",
        title: "CubeComposer: Spatio-Temporal Autoregressive 4K 360° Video Generation",
        description: "CubeComposer is the first spatio-temporal autoregressive diffusion model that natively generates 4K resolution 360° videos. The core innovation decomposes videos into six cubemap faces and synthesizes them autoregressively in a planned spatio-temporal order. Key designs include: 1) Spatio-temporal generation order planning strategy with temporal causality and spatial coverage-prioritized ordering, prioritizing well-conditioned faces to reduce early uncertainty; 2) Cube face context management mechanism with sparse context attention design for efficiency; 3) Continuity-aware techniques including cube-aware positional encoding, padding, and blending to eliminate boundary seams. Compared to existing methods relying on super-resolution (max 1K), CubeComposer's native 4K generation significantly reduces error cascades. For music-to-dance tasks, its spatio-temporal autoregressive approach can be applied to multi-view dance video generation; the cubemap decomposition strategy can also inspire decomposing long dance sequences into manageable spatio-temporal blocks for sequential generation.",
        keyPoints: [
          "Cubemap spatio-temporal autoregression: Decomposes 360° video into six faces, generating sequentially in spatio-temporal order",
          "Coverage-prioritized ordering: Prioritizes well-conditioned faces to effectively propagate geometry/appearance/motion cues",
          "Continuity-aware design: Cube-aware positional encoding and boundary blending eliminate seams"
        ],
        href: "https://arxiv.org/abs/2603.04291",
        paperLink: "CubeComposer: Spatio-Temporal Autoregressive 4K 360° Video Generation from Perspective Video",
      }
    ],
    worthReading: [
      {
        num: 6,
        title: "CalibAtt: Calibrated Sparse Attention for Video Generation Acceleration",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2603.05503",
        description: "Training-free 1.58x end-to-end acceleration through offline calibration identifying block-level sparsity patterns, applicable for optimizing 3D Audio Attention inference efficiency.",
      },
      {
        num: 7,
        title: "MoRe: Motion-aware Feed-forward 4D Reconstruction Transformer",
        tag: "4D Reconstruction",
        href: "https://arxiv.org/abs/2603.05078",
        description: "Single forward-pass real-time 4D reconstruction with motion-aware attention explicitly modeling temporal correspondences, providing real-time solutions for dance pose estimation.",
      },
      {
        num: 8,
        title: "Frequency-Aware Error-Bounded Caching for Diffusion Transformers",
        tag: "Training Efficiency",
        href: "https://arxiv.org/abs/2603.05315",
        description: "Exploits stability differences between high and low-frequency features, caching stable features in later denoising steps for accelerating dance video generation diffusion inference.",
      },
      {
        num: 9,
        title: "FaceCam: Scale-Aware Portrait Video Camera Control",
        tag: "Camera Control",
        href: "https://arxiv.org/abs/2603.05506",
        description: "CVPR 2026 work proposing face-tailored scale-aware camera representation, valuable for multi-view dance video generation and camera trajectory control.",
      },
      {
        num: 10,
        title: "InfinityStory: Unlimited Video Generation with World Consistency",
        tag: "Long Video Generation",
        href: "https://arxiv.org/abs/2603.03646",
        description: "Chain-of-frame reasoning maintains narrative and visual coherence, memory-augmented architecture stores and retrieves relevant context, inspiring narrative coherence in long dance videos.",
      }
    ],
    observation: "This week's papers reveal a clear trend in video generation shifting from 'short clips' to 'long coherent sequences' and from 'offline generation' to 'real-time interaction'. Helios and MIBURI break through real-time bottlenecks from infrastructure architecture and interaction paradigm perspectives respectively, which is crucial for practical music-to-dance applications—dance generation that cannot respond to music changes in real-time is difficult to deploy in live streaming and interactive entertainment scenarios. Particularly noteworthy is MIBURI's approach of directly utilizing foundation model internal tokens: rather than concatenating external audio encoders and motion generators, directly accessing internal representations from music understanding models (like MusicBERT/Jukebox) may yield richer rhythmic and stylistic information. Additionally, the disentanglement thinking in ArtHOI and OSTDT is worth considering: should 'music understanding' and 'motion synthesis' in dance generation also be decoupled into two orthogonal subspaces?",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-05`,
        'en': `/en/daily/music-to-dance/2026-03-05`,
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
      date="2026-03-05"
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