import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "多模态音视频生成新进展：Seedance 2.0 与跨模态对齐技术",
    overview: [
      "Seedance 2.0 发布：原生多模态音视频联合生成架构，支持图像+音频作为输入",
      "ControlFoley 提出时空音频-视觉编码器，解决跨模态对齐难题",
      "RAD-2 的扩散生成器+RL判别器框架为长时序动作生成提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "Seedance 2.0：原生多模态音视频生成架构",
        description: "字节跳动Seed团队发布的Seedance 2.0采用统一的多模态音视频联合生成架构，支持文本、图像、音频、视频四种输入模态。该模型在人物动作建模方面实现了显著提升，能够生成时序精确、物理合理的复杂交互场景。特别值得关注的是其多模态参考生成能力：支持最多3个视频片段、9张图像和3个音频片段作为参考输入，这与music-to-dance任务（参考图+音频→舞蹈视频）高度同构。模型在Arena.AI的Text-to-Video和Image-to-Video榜单均排名第一，Elo分数分别达到1450和1449。其高保真音视频同步生成能力（支持4-15秒、480p/720p分辨率）为舞蹈视频生成提供了可直接借鉴的技术路径。",
        keyPoints: [
          "统一多模态架构：支持图像+音频联合输入生成视频，与music-to-dance任务同构",
          "强大多模态参考能力：最多9图+3音频参考，为人物外观保持和音频对齐提供新思路",
          "高保真音视频同步：双声道音频生成，严格音画时序对齐，支持唱歌、说唱等复杂音频",
          "生产级可用性：在SeedVideoBench 2.0上可用率达97.55%，显著优于竞品"
        ],
        href: "https://arxiv.org/abs/2604.14148",
        paperLink: "Seedance 2.0: Advancing Video Generation for World Complexity",
      },
      {
        num: 2,
        tag: "音视频对齐 ⚠️",
        title: "ControlFoley：可控视频到音频生成的跨模态冲突处理",
        description: "ControlFoley针对视频到音频（V2A）生成中的跨模态对齐问题，提出联合视觉编码范式，将CLIP与时空音频-视觉编码器结合以改进对齐和文本可控性。论文提出的temporal-timbre解耦方法能有效抑制冗余时间线索同时保留音色特征，这对music-to-dance中的音频-动作对齐有重要启发。⚠️ 基于摘要：PDF下载失败。",
        keyPoints: [
          "联合视觉编码：CLIP+时空音频-视觉编码器，提升跨模态对齐精度",
          "Temporal-timbre解耦：分离时间信息与音色特征，可迁移到音频-动作对齐",
          "跨模态冲突处理：在视觉-文本冲突场景下保持文本可控性",
          "VGGSound-TVC基准：提供文本可控性评估标准"
        ],
        href: "https://arxiv.org/abs/2604.15086",
        paperLink: "ControlFoley: Unified and Controllable Video-to-Audio Generation with Cross-Modal Conflict Handling",
      },
      {
        num: 3,
        tag: "扩散模型+RL",
        title: "RAD-2：生成器-判别器框架中的强化学习规模化",
        description: "RAD-2针对扩散规划器在纯模仿学习中缺乏负反馈的问题，提出统一的生成器-判别器框架。扩散生成器产生多样化轨迹候选，RL优化的判别器根据长期驾驶质量重新排序。这种解耦设计避免了将稀疏标量奖励直接应用于高维轨迹空间，提高了优化稳定性。论文提出的Temporally Consistent Group Relative Policy Optimization（TC-GRPO）利用时间连贯性缓解信用分配问题，On-policy Generator Optimization（OGO）将闭环反馈转化为结构化纵向优化信号。该框架与music-to-dance任务同构：舞蹈动作序列可类比为车辆轨迹，长期动作连贯性对应长期驾驶质量。RAD-2在大规模基准测试上降低碰撞率56%，为舞蹈动作生成的长期连贯性优化提供了可迁移的技术路径。",
        keyPoints: [
          "生成器-判别器解耦：扩散生成+RL重排序，避免高维空间直接优化",
          "TC-GRPO：利用时间连贯性的组相对策略优化，缓解信用分配问题",
          "OGO：将闭环反馈转化为纵向优化信号，渐进式优化轨迹分布",
          "BEV-Warp：特征级闭环仿真环境，支持大规模RL训练"
        ],
        href: "https://arxiv.org/abs/2604.15308",
        paperLink: "RAD-2: Scaling Reinforcement Learning in a Generator-Discriminator Framework",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "ArrowGEV：通过时间之箭学习视频事件定位",
        tag: "时序理解",
        href: "https://arxiv.org/abs/2601.06559",
        description: "将事件分为时间敏感/不敏感两类，通过RL建模时间方向性，对舞蹈动作时序一致性理解有参考价值。"
      },
      {
        num: 5,
        title: "LeapAlign：Flow Matching模型的后训练对齐",
        tag: "扩散优化",
        href: "https://arxiv.org/abs/2604.15311",
        description: "通过两步轨迹缩短实现高效梯度传播，可用于加速music-to-dance扩散模型的采样过程。"
      },
      {
        num: 6,
        title: "HiVLA：基于Flow-matching DiT的分层具身操作系统",
        tag: "动作生成",
        href: "https://arxiv.org/abs/2604.14125",
        description: "Flow-matching DiT+级联交叉注意力机制，实现高层语义规划与低层动作执行的解耦。"
      },
      {
        num: 7,
        title: "1D有序Token实现高效测试时搜索",
        tag: "生成架构",
        href: "https://arxiv.org/abs/2604.15453",
        description: "粗到细的1D有序token结构对视频时序建模有启发，可能改进patch-shuffling的时序一致性。"
      },
      {
        num: 8,
        title: "HY-World 2.0：多模态3D世界模型",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2604.14268",
        description: "多模态世界模型的3D场景生成和一致性保持技术，对人物-背景一致性有借鉴意义。"
      },
    ],
    observation: "本周论文呈现出多模态音视频生成的技术收敛趋势：Seedance 2.0展示了图像+音频→视频的端到端可行性，ControlFoley提供了跨模态对齐的技术细节，RAD-2则为长时序动作生成的优化提供了RL框架。这三篇论文共同指向一个技术路线：统一的多模态架构+显式的跨模态对齐+RL优化的时序连贯性。对于music-to-dance任务，这意味着当前基于扩散模型的方案可以借鉴Seedance的多模态融合设计，用ControlFoley的时空编码改进音频-动作对齐，并引入RAD-2的生成器-判别器框架来优化长期动作连贯性。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Multimodal Audio-Video Generation Advances: Seedance 2.0 and Cross-Modal Alignment",
    overview: [
      "Seedance 2.0 released: Native multimodal audio-video joint generation architecture supporting image+audio input",
      "ControlFoley proposes spatio-temporal audio-visual encoder to solve cross-modal alignment challenges",
      "RAD-2's diffusion generator+RL discriminator framework offers new insights for long-horizon motion generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "Seedance 2.0: Native Multimodal Audio-Video Generation Architecture",
        description: "ByteDance Seed's Seedance 2.0 adopts a unified multimodal audio-video joint generation architecture supporting four input modalities: text, image, audio, and video. The model achieves significant improvements in human motion modeling, generating temporally precise and physically plausible complex interaction scenes. Its multimodal reference generation capability supports up to 3 video clips, 9 images, and 3 audio clips as reference inputs—highly isomorphic to the music-to-dance task (reference image + audio → dance video). The model ranks #1 on Arena.AI's Text-to-Video and Image-to-Video leaderboards with Elo scores of 1450 and 1449 respectively. Its high-fidelity audio-video synchronized generation (4-15 seconds, 480p/720p) provides a directly transferable technical path for dance video generation.",
        keyPoints: [
          "Unified multimodal architecture: Supports image+audio joint input for video generation, isomorphic to music-to-dance",
          "Powerful multimodal reference: Up to 9 images + 3 audio references, new insights for appearance preservation and audio alignment",
          "High-fidelity audio-video sync: Binaural audio generation with strict audio-visual temporal alignment",
          "Production-grade usability: 97.55% usability rate on SeedVideoBench 2.0, significantly outperforming competitors"
        ],
        href: "https://arxiv.org/abs/2604.14148",
        paperLink: "Seedance 2.0: Advancing Video Generation for World Complexity",
      },
      {
        num: 2,
        tag: "Audio-Visual Alignment ⚠️",
        title: "ControlFoley: Controllable Video-to-Audio with Cross-Modal Conflict Handling",
        description: "ControlFoley addresses cross-modal alignment in video-to-audio generation by proposing a joint visual encoding paradigm combining CLIP with spatio-temporal audio-visual encoders. The temporal-timbre decoupling method effectively suppresses redundant temporal cues while preserving timbre features, offering important insights for audio-motion alignment in music-to-dance. ⚠️ Based on abstract: PDF download failed.",
        keyPoints: [
          "Joint visual encoding: CLIP + spatio-temporal audio-visual encoder for improved cross-modal alignment",
          "Temporal-timbre decoupling: Separating temporal and timbre features, transferable to audio-motion alignment",
          "Cross-modal conflict handling: Maintains text controllability under visual-text conflicts",
          "VGGSound-TVC benchmark: Provides evaluation standard for text controllability"
        ],
        href: "https://arxiv.org/abs/2604.15086",
        paperLink: "ControlFoley: Unified and Controllable Video-to-Audio Generation with Cross-Modal Conflict Handling",
      },
      {
        num: 3,
        tag: "Diffusion+RL",
        title: "RAD-2: Scaling RL in a Generator-Discriminator Framework",
        description: "RAD-2 addresses the lack of negative feedback in diffusion planners trained with pure imitation learning by proposing a unified generator-discriminator framework. A diffusion-based generator produces diverse trajectory candidates while an RL-optimized discriminator reranks them based on long-term driving quality. This decoupled design avoids directly applying sparse scalar rewards to high-dimensional trajectory spaces, improving optimization stability. The proposed TC-GRPO exploits temporal coherence to alleviate credit assignment, while OGO converts closed-loop feedback into structured longitudinal optimization signals. This framework is isomorphic to music-to-dance: dance sequences parallel vehicle trajectories, and long-term motion coherence corresponds to long-term driving quality. RAD-2 reduces collision rates by 56% on large-scale benchmarks, providing a transferable technical path for optimizing long-term coherence in dance generation.",
        keyPoints: [
          "Generator-discriminator decoupling: Diffusion generation + RL reranking avoids direct optimization in high-dim space",
          "TC-GRPO: Temporally consistent group relative policy optimization alleviates credit assignment",
          "OGO: Converts closed-loop feedback into longitudinal optimization signals for progressive trajectory improvement",
          "BEV-Warp: Feature-level closed-loop simulation environment supporting large-scale RL training"
        ],
        href: "https://arxiv.org/abs/2604.15308",
        paperLink: "RAD-2: Scaling Reinforcement Learning in a Generator-Discriminator Framework",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "ArrowGEV: Learning the Arrow of Time for Video Event Grounding",
        tag: "Temporal Understanding",
        href: "https://arxiv.org/abs/2601.06559",
        description: "Categorizes events into time-sensitive/insensitive classes and models temporal directionality via RL, relevant for dance motion temporal coherence."
      },
      {
        num: 5,
        title: "LeapAlign: Post-Training Flow Matching Alignment",
        tag: "Diffusion Optimization",
        href: "https://arxiv.org/abs/2604.15311",
        description: "Achieves efficient gradient propagation via two-step trajectory shortening, applicable for accelerating music-to-dance diffusion sampling."
      },
      {
        num: 6,
        title: "HiVLA: Flow-matching DiT for Hierarchical Embodied Manipulation",
        tag: "Motion Generation",
        href: "https://arxiv.org/abs/2604.14125",
        description: "Flow-matching DiT with cascaded cross-attention decouples high-level semantic planning from low-level motor execution."
      },
      {
        num: 7,
        title: "1D Ordered Tokens Enable Efficient Test-Time Search",
        tag: "Generation Architecture",
        href: "https://arxiv.org/abs/2604.15453",
        description: "Coarse-to-fine 1D ordered token structure offers insights for video temporal modeling, potentially improving patch-shuffling consistency."
      },
      {
        num: 8,
        title: "HY-World 2.0: Multimodal 3D World Model",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2604.14268",
        description: "3D scene generation and consistency techniques from multimodal world models offer insights for human-background coherence."
      },
    ],
    observation: "This week's papers demonstrate a convergence trend in multimodal audio-video generation: Seedance 2.0 shows the end-to-end feasibility of image+audio→video, ControlFoley provides technical details for cross-modal alignment, and RAD-2 offers an RL framework for long-horizon motion optimization. Together they point to a technical roadmap: unified multimodal architecture + explicit cross-modal alignment + RL-optimized temporal coherence. For music-to-dance, this suggests current diffusion-based approaches can adopt Seedance's multimodal fusion design, use ControlFoley's spatio-temporal encoding to improve audio-motion alignment, and incorporate RAD-2's generator-discriminator framework to optimize long-term motion coherence.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-19`,
        'en': `/en/daily/music-to-dance/2026-04-19`,
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
      date="2026-04-19"
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