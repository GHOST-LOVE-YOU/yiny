import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "LPM 1.0: 实时音频驱动角色表演的突破",
    overview: [
      "LPM 1.0 提出首个全双工对话表演生成系统，解决表演三难困境（表现力、实时性、长时一致性）",
      "17B 参数 DiT 架构 + 交错式双音频注入机制，实现说话/倾听行为的联合建模",
      "四阶段自回归蒸馏框架将离线模型转化为实时流式生成器，支持无限时长推理"
    ],
    papers: [
      {
        num: 1,
        tag: "音频驱动视频生成",
        title: "LPM 1.0: 基于视频的角色表演生成模型",
        description: "LPM 1.0 是首个针对单角色全双工音频-视觉对话表演的视频生成系统。论文提出\"表演三难困境\"（performance trilemma）概念——现有模型难以同时满足高表现力、实时推理和长时身份一致性三个目标。为此，作者构建了大规模多模态数据集，包含说话、倾听和社交反应行为的显式标注；开发了 17B 参数的双向扩散 Transformer（Base LPM），通过交错式说话/倾听音频注入策略（偶数层处理说话音频、奇数层处理倾听音频），实现两种音频流的解耦建模；并进一步通过四阶段自回归蒸馏（ODE 初始化 → 离线 DMD → 在线 DMD → 精炼 DMD）将 Base LPM 转化为因果流式生成器（Online LPM）。实验表明，Online LPM 在 480P 分辨率下可实现实时推理，人类评估中与 720P 的 Base LPM 在 42-88% 的情况下难以区分，证明实时因果生成不必牺牲感知真实感。",
        keyPoints: [
          "交错式双音频注入：在 DiT 的偶数/奇数层分别注入说话/倾听音频，降低 50% 音频交叉注意力参数量，同时形成隐式的\"说话专用\"和\"倾听专用\"子网络",
          "多粒度身份参考图像：通过全局外观参考 + 多视角身体参考（1-4 个视角）+ 表情参考（1-8 种表情）解决单图条件不足导致的身份漂移问题",
          "四阶段蒸馏策略：将双向教师模型蒸馏为 2 步因果主干 + 1 步因果精炼器的流式架构，主干负责轨迹稳定，精炼器负责细节恢复"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
    ],
    worthReading: [
      {
        num: 2,
        title: "跨模态情感迁移：说话人脸视频情感编辑",
        tag: "跨模态迁移",
        href: "https://arxiv.org/abs/2604.07786",
        description: "C-MET 方法通过建模语音与视觉特征空间之间的情感语义向量，实现基于语音的情感迁移。对舞蹈生成有启发：可将音频情感特征迁移到舞蹈动作生成中，实现情感可控的舞蹈风格。",
      },
      {
        num: 3,
        title: "OmniJigsaw: 模态编排重排序增强全模态推理",
        tag: "音视频预训练",
        href: "https://arxiv.org/abs/2604.08209",
        description: "通过时序重排序代理任务强制跨模态整合，提出联合模态整合、样本级模态选择和片段级模态掩码三种策略。对音乐-舞蹈对齐的预训练策略有借鉴意义。",
      },
      {
        num: 4,
        title: "Phantom: 物理注入视频生成",
        tag: "物理感知生成",
        href: "https://arxiv.org/abs/2604.08503",
        description: "将潜在物理属性推断直接整合到视频生成过程中，联合建模视觉内容和潜在物理动态。可用于提升舞蹈动作的物理合理性和真实感。",
      },
      {
        num: 5,
        title: "LiVER: 基于渲染器的场景可控视频生成",
        tag: "可控视频生成",
        href: "https://arxiv.org/abs/2604.07966",
        description: "通过显式 3D 场景属性（布局、光照、相机参数）条件化视频合成，实现解耦的场景控制。其条件控制机制可参考用于舞蹈动作的风格/姿态控制。",
      },
    ],
    observation: "本周 HuggingFace 推荐论文中，音频-视觉跨模态生成成为热点方向。LPM 1.0 提出的\"表演三难困境\"框架对音乐-舞蹈生成任务具有直接参考价值——当前扩散模型在舞蹈生成中同样面临表现力、推理速度和长时一致性之间的权衡。其交错式音频注入和多参考身份条件机制可直接迁移到舞蹈场景。此外，Phantom 的物理感知生成和 LiVER 的场景可控生成技术，为提升舞蹈动作的真实感和可控性提供了技术路径。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "LPM 1.0: Breakthrough in Real-Time Audio-Driven Character Performance",
    overview: [
      "LPM 1.0 proposes the first full-duplex conversational performance generation system, addressing the performance trilemma (expressiveness, real-time inference, long-horizon stability)",
      "17B parameter DiT architecture with interleaved dual-audio injection enables joint modeling of speaking and listening behaviors",
      "Four-stage autoregressive distillation converts offline model to real-time streaming generator with unbounded inference horizon"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Driven Video Generation",
        title: "LPM 1.0: Video-based Character Performance Model",
        description: "LPM 1.0 is the first video generation system for single-person full-duplex audio-visual conversational performance. The paper introduces the 'performance trilemma' concept—existing models struggle to simultaneously satisfy three desiderata: expressive quality, real-time inference, and long-horizon identity stability. To address this, the authors construct a large-scale multimodal dataset with explicit annotations for speaking, listening, and socially reactive behaviors; develop a 17B-parameter bidirectional Diffusion Transformer (Base LPM) with interleaved speaking/listening audio injection (even layers for speaking, odd layers for listening) to achieve decoupled modeling of both audio streams; and further convert Base LPM into a causal streaming generator (Online LPM) through four-stage autoregressive distillation (ODE initialization → off-policy DMD → on-policy DMD → refinement DMD). Experiments show that Online LPM achieves real-time inference at 480P resolution, with human evaluators unable to distinguish it from 720P Base LPM in 42-88% of cases, demonstrating that real-time causal generation need not sacrifice perceived realism.",
        keyPoints: [
          "Interleaved dual-audio injection: Speaking audio is injected into even layers and listening audio into odd layers of the DiT, reducing audio cross-attention parameters by 50% while forming implicit 'speak-tuned' and 'listen-tuned' sub-networks",
          "Multi-granularity identity references: Global appearance + multi-view body references (1-4 views) + facial expression references (1-8 expressions) solve the identity drift caused by underspecified single-image conditioning",
          "Four-stage distillation: Distills bidirectional teacher into a streaming architecture with 2-step causal backbone + 1-step causal refiner, where backbone handles trajectory stabilization and refiner handles detail recovery"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
    ],
    worthReading: [
      {
        num: 2,
        title: "Cross-Modal Emotion Transfer for Talking Face Video",
        tag: "Cross-Modal Transfer",
        href: "https://arxiv.org/abs/2604.07786",
        description: "C-MET models emotion semantic vectors between speech and visual feature spaces for emotion transfer. Relevant for dance generation: audio emotion features can be transferred to dance motion generation for emotion-controllable dance styles.",
      },
      {
        num: 3,
        title: "OmniJigsaw: Enhancing Omni-Modal Reasoning via Modality-Orchestrated Reordering",
        tag: "Audio-Visual Pretraining",
        href: "https://arxiv.org/abs/2604.08209",
        description: "Forces cross-modal integration through temporal reordering proxy tasks with joint modality integration, sample-level modality selection, and clip-level modality masking. Provides insights for music-dance alignment pretraining strategies.",
      },
      {
        num: 4,
        title: "Phantom: Physics-Infused Video Generation",
        tag: "Physics-Aware Generation",
        href: "https://arxiv.org/abs/2604.08503",
        description: "Integrates latent physical property inference directly into video generation, jointly modeling visual content and latent physical dynamics. Can improve physical plausibility and realism of dance motions.",
      },
      {
        num: 5,
        title: "LiVER: Lighting-grounded Video Generation with Renderer-based Agent Reasoning",
        tag: "Controllable Video Generation",
        href: "https://arxiv.org/abs/2604.07966",
        description: "Conditions video synthesis on explicit 3D scene properties (layout, lighting, camera) for disentangled scene control. Its conditional control mechanisms can be adapted for dance style/pose control.",
      },
    ],
    observation: "Audio-visual cross-modal generation has emerged as a hot topic in this week's HuggingFace recommended papers. LPM 1.0's 'performance trilemma' framework offers direct relevance for music-to-dance generation tasks—diffusion models in dance generation face similar trade-offs between expressiveness, inference speed, and long-term consistency. Its interleaved audio injection and multi-reference identity conditioning mechanisms can be directly transferred to dance scenarios. Additionally, Phantom's physics-aware generation and LiVER's scene-controllable generation provide technical pathways for improving the realism and controllability of dance motions.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-11`,
        'en': `/en/daily/music-to-dance/2026-04-11`,
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
      date="2026-04-11"
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
