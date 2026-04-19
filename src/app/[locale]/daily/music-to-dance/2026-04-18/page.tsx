import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "原生多模态音视频生成与跨模态对齐技术突破",
    overview: [
      "Seedance 2.0 发布：原生支持 image+audio→video，与 music-to-dance 任务高度同构",
      "ControlFoley 提出时序-音色解耦机制，为音频-动作对齐提供新思路",
      "HiVLA 的分层控制架构展示了 Flow-matching DiT 在动作生成中的潜力"
    ],
    papers: [
      {
        num: 1,
        tag: "多模态生成",
        title: "Seedance 2.0：原生多模态音视频联合生成",
        description: "字节跳动 Seed 团队发布的 Seedance 2.0 是业界领先的多模态音视频生成模型，采用统一的高效大规模架构实现多模态联合生成。模型支持 text、image、audio、video 四种输入模态的任意组合，原生支持 4-15 秒音视频内容生成，输出分辨率可达 720p。在 Arena.AI 排行榜上，Seedance 2.0 在 Text-to-Video 和 Image-to-Video 任务均排名第一，Elo 分数分别为 1450 和 1449。对于 music-to-dance 任务而言，Seedance 2.0 的 image+audio→video 生成范式与当前任务（参考人物图+音频→舞蹈视频）高度同构，其多模态参考生成能力、音频-视觉同步机制（Audio-Visual Sync 评分 3.75）以及身份保持技术都具有直接借鉴价值。模型在动作质量（Motion Quality 3.75）和音频提示跟随（Audio Prompt Following 3.56）方面表现突出，这些能力对于生成与音乐节拍精准同步的舞蹈动作至关重要。",
        keyPoints: [
          "原生多模态架构：统一框架支持 text/image/audio/video 任意组合输入，直接实现 image+audio→video",
          "SOTA 生成质量：在 Arena.AI T2V 和 I2V 排行榜均排名第一，动作质量评分 3.75 领先竞品至少 0.65 分",
          "强音频-视觉同步：Audio-Visual Sync 评分 3.75，Audio Prompt Following 评分 3.56，支持多音轨同步输出"
        ],
        href: "https://arxiv.org/abs/2604.14148",
        paperLink: "Seedance 2.0: Advancing Video Generation for World Complexity",
      },
      {
        num: 2,
        tag: "跨模态对齐",
        title: "ControlFoley：视频到音频的跨模态冲突处理",
        description: "ControlFoley 是一个统一的多模态视频到音频（V2A）生成框架，针对视觉-文本冲突下的弱文本可控性和参考音频中时序-音色信息纠缠导致的风格控制不精确问题提出解决方案。论文提出的时序-音色解耦机制（temporal-timbre decoupling）通过抑制冗余时序线索同时保留判别性音色特征，实现了更精确的音频风格控制。此外，论文设计了模态鲁棒训练方案，包括统一多模态表征对齐（REPA）和随机模态丢弃策略。对于 music-to-dance 任务，ControlFoley 的研究方向与当前任务形成互补：当前任务是从音频生成视频动作，而 ControlFoley 是从视频生成音频。其跨模态对齐技术和冲突处理机制对于解决音频节拍与舞蹈动作的对齐问题具有重要启发意义。",
        keyPoints: [
          "时序-音色解耦：分离参考音频中的时序和音色信息，实现更精确的音频风格控制",
          "跨模态冲突处理：提出联合视觉编码范式，整合 CLIP 与时序音频-视觉编码器改善对齐",
          "双向互补价值：V2A 与 A2V（music-to-dance）是双向问题，技术方案可相互借鉴"
        ],
        href: "https://arxiv.org/abs/2604.15086",
        paperLink: "ControlFoley: Unified and Controllable Video-to-Audio Generation with Cross-Modal Conflict Handling",
      },
      {
        num: 3,
        tag: "分层控制",
        title: "HiVLA：基于 Flow-matching DiT 的分层操控系统",
        description: "HiVLA 是一个以视觉 grounding 为核心的分层具身操作系统，通过显式解耦高层语义规划与低层运动控制来解决端到端 VLA 模型在微调时出现的灾难性遗忘问题。系统采用 VLM 作为高层规划器进行任务分解和视觉 grounding，生成包含子任务指令和目标边界框的结构化计划；低层则引入基于 Flow-matching 的 Diffusion Transformer（DiT）动作专家，配备新颖的级联交叉注意力机制，依次融合全局上下文、高分辨率目标中心裁剪和技能语义。在 RoboTwin 2.0 基准测试中，HiVLA 相比强基线 H-RDT 提升 17.7%，相比 π0 提升 42.7%。对于 music-to-dance 任务，HiVLA 的分层架构提供了重要启示：当前端到端方案可以尝试解耦为高层音频节拍规划与低层动作生成，而 Flow-matching DiT 作为动作执行器的成功应用也验证了该架构在时序动作生成中的潜力。",
        keyPoints: [
          "分层解耦架构：VLM 高层规划 + DiT 低层执行，避免灾难性遗忘，支持独立优化",
          "级联交叉注意力：依次融合全局场景、高分辨率局部目标、技能语义三层信息",
          "Flow-matching DiT：验证该架构在时序动作生成中的有效性，可迁移到舞蹈动作生成"
        ],
        href: "https://arxiv.org/abs/2604.14125",
        paperLink: "HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "LeapAlign：Flow Matching 模型的高效后训练对齐",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2604.15311",
        description: "提出两阶段轨迹缩短方法，将长轨迹压缩为两步跳跃，实现高效稳定的早期生成步骤更新。若 music-to-dance 采用 Flow Matching 替代扩散模型，此技术可直接用于加速训练。",
      },
      {
        num: 5,
        title: "OneHOI：统一的人-物交互生成与编辑",
        tag: "人-物交互",
        href: "https://arxiv.org/abs/2604.14062",
        description: "提出 Relational Diffusion Transformer (R-DiT) 和结构化 HOI 注意力机制，统一 HOI 生成与编辑。其角色感知和实例感知的交互建模对舞蹈中的人体动作表示有参考价值。",
      },
      {
        num: 6,
        title: "Free Geometry：测试时自监督 3D 重建优化",
        tag: "自监督学习",
        href: "https://arxiv.org/abs/2604.14048",
        description: "通过跨视角特征一致性实现测试时自监督微调，无需 3D 真值。这种自监督思路可迁移到舞蹈视频的时序一致性优化，解决长视频生成中的帧间一致性问题。",
      },
      {
        num: 7,
        title: "HY-World 2.0：多模态世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.14268",
        description: "支持 text/image/video 多种输入模态的 3D 世界生成模型，采用 3D Gaussian Splatting 表示。其视频输入处理和长时序场景生成能力对理解人体运动建模有间接参考价值。",
      },
    ],
    observation: "本周论文呈现出多模态音视频生成的技术收敛趋势。Seedance 2.0 的原生多模态架构验证了 image+audio→video 的技术可行性，其 Audio-Visual Sync 评分达到 3.75，为 music-to-dance 任务树立了新的性能基准。与此同时，ControlFoley 从相反方向（video→audio）探索跨模态对齐，其提出的时序-音色解耦机制可能对解决音频节拍与舞蹈动作的对齐问题有启发。HiVLA 则展示了 Flow-matching DiT 在时序动作生成中的成功应用，其分层控制架构为当前端到端 music-to-dance 方案提供了新的设计思路：解耦高层音频语义规划与低层动作执行，可能有助于提升长舞蹈视频生成的稳定性和可控性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Breakthroughs in Native Multi-Modal Audio-Video Generation and Cross-Modal Alignment",
    overview: [
      "Seedance 2.0 released: native support for image+audio→video, highly isomorphic to music-to-dance tasks",
      "ControlFoley proposes temporal-timbre decoupling, offering new insights for audio-motion alignment",
      "HiVLA's hierarchical control architecture demonstrates the potential of Flow-matching DiT for motion generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Multi-Modal Generation",
        title: "Seedance 2.0: Native Multi-Modal Audio-Video Joint Generation",
        description: "ByteDance Seed team's Seedance 2.0 is a state-of-the-art multi-modal audio-video generation model featuring a unified, efficient large-scale architecture for joint multi-modal generation. The model supports arbitrary combinations of four input modalities (text, image, audio, video), natively generating 4-15 second audio-video content at up to 720p resolution. On Arena.AI leaderboard, Seedance 2.0 ranks #1 in both Text-to-Video and Image-to-Video tasks with Elo scores of 1450 and 1449 respectively. For music-to-dance tasks, Seedance 2.0's image+audio→video generation paradigm is highly isomorphic to the current task (reference image + audio → dance video). Its multi-modal reference generation capabilities, audio-visual synchronization mechanism (Audio-Visual Sync score 3.75), and identity preservation technology are all directly applicable. The model excels in motion quality (3.75) and audio prompt following (3.56), capabilities crucial for generating dance movements precisely synchronized with music beats.",
        keyPoints: [
          "Native multi-modal architecture: unified framework supporting arbitrary combinations of text/image/audio/video inputs, directly enabling image+audio→video",
          "SOTA generation quality: ranks #1 on Arena.AI T2V and I2V leaderboards, motion quality score 3.75 leads competitors by at least 0.65 points",
          "Strong audio-visual synchronization: Audio-Visual Sync score 3.75, Audio Prompt Following score 3.56, supports multi-track synchronized output"
        ],
        href: "https://arxiv.org/abs/2604.14148",
        paperLink: "Seedance 2.0: Advancing Video Generation for World Complexity",
      },
      {
        num: 2,
        tag: "Cross-Modal Alignment",
        title: "ControlFoley: Video-to-Audio Generation with Cross-Modal Conflict Handling",
        description: "ControlFoley is a unified multi-modal video-to-audio (V2A) generation framework addressing weak textual controllability under visual-text conflicts and imprecise stylistic control due to entangled temporal-timbre information in reference audio. The proposed temporal-timbre decoupling mechanism achieves more precise audio style control by suppressing redundant temporal cues while preserving discriminative timbre features. Additionally, the paper designs a modality-robust training scheme including unified multi-modal representation alignment (REPA) and random modality dropout. For music-to-dance tasks, ControlFoley's research direction is complementary: current tasks generate video motion from audio, while ControlFoley generates audio from video. Its cross-modal alignment technology and conflict handling mechanisms offer important insights for solving audio beat and dance motion alignment problems.",
        keyPoints: [
          "Temporal-timbre decoupling: separates temporal and timbre information in reference audio for more precise style control",
          "Cross-modal conflict handling: proposes joint visual encoding paradigm integrating CLIP with spatio-temporal audio-visual encoder",
          "Bidirectional complementary value: V2A and A2V (music-to-dance) are bidirectional problems with mutually applicable solutions"
        ],
        href: "https://arxiv.org/abs/2604.15086",
        paperLink: "ControlFoley: Unified and Controllable Video-to-Audio Generation with Cross-Modal Conflict Handling",
      },
      {
        num: 3,
        tag: "Hierarchical Control",
        title: "HiVLA: Flow-matching DiT-based Hierarchical Manipulation System",
        description: "HiVLA is a visual-grounded-centric hierarchical embodied manipulation system that explicitly decouples high-level semantic planning from low-level motor control to address catastrophic forgetting in end-to-end VLA models during fine-tuning. The system uses VLM as a high-level planner for task decomposition and visual grounding, generating structured plans with subtask instructions and target bounding boxes; the low-level introduces a Flow-matching Diffusion Transformer (DiT) action expert with a novel cascaded cross-attention mechanism that sequentially fuses global context, high-resolution object-centric crops, and skill semantics. On RoboTwin 2.0 benchmark, HiVLA achieves 17.7% improvement over strong baseline H-RDT and 42.7% over π0. For music-to-dance tasks, HiVLA's hierarchical architecture provides important insights: current end-to-end approaches could be decoupled into high-level audio beat planning and low-level motion generation, and the successful application of Flow-matching DiT as an action executor validates this architecture's potential in temporal motion generation.",
        keyPoints: [
          "Hierarchical decoupled architecture: VLM high-level planning + DiT low-level execution avoids catastrophic forgetting and enables independent optimization",
          "Cascaded cross-attention: sequentially fuses global scene, high-resolution local target, and skill semantics at three levels",
          "Flow-matching DiT: validates this architecture's effectiveness in temporal motion generation, transferable to dance motion generation"
        ],
        href: "https://arxiv.org/abs/2604.14125",
        paperLink: "HiVLA: A Visual-Grounded-Centric Hierarchical Embodied Manipulation System",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "LeapAlign: Efficient Post-Training Alignment for Flow Matching Models",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2604.15311",
        description: "Proposes a two-step trajectory shortening method that compresses long trajectories into two-step leaps, enabling efficient and stable updates for early generation steps. If music-to-dance adopts Flow Matching instead of diffusion models, this technique can directly accelerate training.",
      },
      {
        num: 5,
        title: "OneHOI: Unified Human-Object Interaction Generation and Editing",
        tag: "Human-Object Interaction",
        href: "https://arxiv.org/abs/2604.14062",
        description: "Proposes Relational Diffusion Transformer (R-DiT) and structured HOI attention mechanism, unifying HOI generation and editing. Its role-aware and instance-aware interaction modeling offers reference value for human motion representation in dance.",
      },
      {
        num: 6,
        title: "Free Geometry: Test-Time Self-Supervised 3D Reconstruction Refinement",
        tag: "Self-Supervised Learning",
        href: "https://arxiv.org/abs/2604.14048",
        description: "Achieves test-time self-supervised fine-tuning through cross-view feature consistency without 3D ground truth. This self-supervised approach can be transferred to temporal consistency optimization in dance videos, addressing frame consistency issues in long video generation.",
      },
      {
        num: 7,
        title: "HY-World 2.0: Multi-Modal World Model",
        tag: "World Models",
        href: "https://arxiv.org/abs/2604.14268",
        description: "3D world generation model supporting multiple input modalities (text/image/video) using 3D Gaussian Splatting representation. Its video input processing and long-term scene generation capabilities offer indirect reference value for understanding human motion modeling.",
      },
    ],
    observation: "This week's papers demonstrate a technological convergence trend in multi-modal audio-video generation. Seedance 2.0's native multi-modal architecture validates the technical feasibility of image+audio→video, with its Audio-Visual Sync score reaching 3.75, setting a new performance benchmark for music-to-dance tasks. Meanwhile, ControlFoley explores cross-modal alignment from the opposite direction (video→audio), and its proposed temporal-timbre decoupling mechanism may offer insights for solving audio beat and dance motion alignment. HiVLA demonstrates the successful application of Flow-matching DiT in temporal motion generation, and its hierarchical control architecture provides new design ideas for current end-to-end music-to-dance approaches: decoupling high-level audio semantic planning from low-level motion execution may help improve the stability and controllability of long dance video generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-18`,
        'en': `/en/daily/music-to-dance/2026-04-18`,
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
      date="2026-04-18"
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
