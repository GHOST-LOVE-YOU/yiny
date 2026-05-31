import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "音视频对齐新范式与实时视频生成框架",
    overview: [
      "NAVA提出Align-then-Fuse MMDiT架构，在专用交互空间内建立音视频对应关系，实现更精确的时序同步",
      "minWM开源框架提供从双向扩散模型到实时自回归世界模型的完整转换pipeline，支持Wan2.1/HY1.5等主流backbone",
      "AdaState用自适应状态替代静态首帧anchor，解决自回归视频生成中的动态不足问题"
    ],
    papers: [
      {
        num: 1,
        tag: "音视频生成",
        title: "NAVA：原生音视频对齐生成框架",
        description: "NAVA（Native Audio-Visual Alignment）针对现有开源音视频生成方法的双塔后对齐或完全统一三模态设计的缺陷，提出context-conditioned native audio-visual alignment范式。核心创新Align-then-Fuse MMDiT架构先在专用交互空间内通过模态感知层建立音视频对应关系，再通过共享融合层进行协同去噪。对于music-to-dance任务，该设计的迁移路径清晰：当前方案使用3D Audio Attention进行音频-运动对齐，NAVA的dedicated interaction space机制可提供更细粒度的节拍-动作同步，且Timbre-in-Context Conditioning的跨模态条件注入方式可直接借鉴用于参考人物外观与舞蹈动作的绑定控制。",
        keyPoints: [
          "Align-then-Fuse MMDiT：模态感知对齐层 + 统一融合层的渐进式架构",
          "专用音视频交互空间：分离同步与条件注入，避免高层语义与低层同步耦合",
          "Timbre-in-Context Conditioning：将参考音色作为上下文条件绑定到特定语音片段，无需额外的说话人控制分支"
        ],
        href: "https://arxiv.org/abs/2605.30073",
        paperLink: "Native Audio-Visual Alignment for Generation",
      },
      {
        num: 2,
        tag: "实时视频生成",
        title: "minWM：实时交互式视频世界模型全栈框架",
        description: "minWM是首个开源的端到端pipeline，将现有双向T2V/TI2V视频基础模型转换为相机可控的少步自回归世界模型。框架包含完整工作流：相机可控微调、AR扩散训练、因果ODE/因果一致性蒸馏、非对称DMD后训练。在Wan2.1-T2V-1.3B上的实验显示，相比多步双向基线，首帧延迟降低236.64倍（从269秒降至1.1秒）。对于music-to-dance生成，该框架解决了长序列建模和实时推理的关键瓶颈，Causal Forcing++的蒸馏策略可直接应用于舞蹈视频生成模型的加速部署。",
        keyPoints: [
          "两阶段recipe：相机可控微调 + Causal Forcing/++蒸馏（AR训练→因果ODE/CD→非对称DMD）",
          "架构通用性：支持cross-attention条件注入（Wan2.1）和MMDiT-style架构（HY1.5）",
          "实时性能：Wan2.1 1.3B模型首帧延迟降至1.137秒，HY1.5 8B模型降至3.446秒"
        ],
        href: "https://arxiv.org/abs/2605.30263",
        paperLink: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
      },
      {
        num: 3,
        tag: "视频动力学",
        title: "AdaState：流式视频生成的自适应状态机制",
        description: "自回归视频扩散模型存在结构性缺陷：首帧KV表示在attention cache中占据特权位置，作为静态anchor导致视频动态被抑制、场景演进受阻。AdaState提出用adaptive state替代静态anchor——这是一个在每chunk与内容联合去噪但永不渲染的隐藏潜变量。模型通过同时关注前一状态和当前内容来生成自己的场景anchor，实现参考与生成内容的共同演进。实验表明该方法显著改善视频动态性。对于舞蹈视频生成，该机制可避免生成陷入静态姿态，提升身体运动的连贯性和多样性，且horizon-weighted DMD训练策略可优先优化长序列后段的生成质量。",
        keyPoints: [
          "自适应状态机制：隐藏潜变量随内容演进，替代冻结的首帧anchor",
          "时间相对性：每个生成步骤看到相同的相对位置结构，无特权时间零点",
          "Horizon-weighted DMD：线性递增的帧级loss权重，优先优化后期帧的生成质量"
        ],
        href: "https://arxiv.org/abs/2605.30349",
        paperLink: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "YoCausal：从因果视角评估视频生成与世界模型的差距",
        tag: "因果推理",
        href: "https://arxiv.org/abs/2605.30346",
        description: "提出Reverse Surprise Index和Causality Cognition Index，通过时间反转真实视频作为自然反事实样本，评估VDM是否真正理解因果关系。可用于诊断舞蹈生成中的节拍-动作因果一致性。",
      },
      {
        num: 5,
        title: "PhyGenHOI：物理感知的动态人-物交互4D生成",
        tag: "物理仿真",
        href: "https://arxiv.org/abs/2605.30268",
        description: "结合Motion Diffusion Model与Material Point Method，通过Windowed Attraction Loss和Contact-Driven Re-simulation实现物理一致的人-物交互。舞蹈场景中的身体-环境交互可借鉴其接触仿真机制。",
      },
      {
        num: 6,
        title: "NeuROK：生成式4D神经物体运动学",
        tag: "4D动力学",
        href: "https://arxiv.org/abs/2605.30347",
        description: "学习数据驱动的运动学状态参数化，在低维潜空间中建模物体动态。其latent space设计可能适用于舞蹈动作的连续生成和插值。",
      },
      {
        num: 7,
        title: "Qwen-VLA：跨任务、环境和机器人本体的统一视觉-语言-动作建模",
        tag: "VLA模型",
        href: "https://arxiv.org/abs/2605.30280",
        description: "基于DiT的action decoder统一了操作、导航和轨迹预测。其跨模态对齐和连续动作生成框架可为舞蹈动作生成提供参考实现。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Audio-Visual Alignment Paradigm and Real-Time Video Generation Framework",
    overview: [
      "NAVA proposes Align-then-Fuse MMDiT architecture, establishing audio-video correspondence in a dedicated interaction space for more precise temporal synchronization",
      "minWM open-source framework provides a complete pipeline for converting bidirectional diffusion models to real-time autoregressive world models, supporting Wan2.1/HY1.5 backbones",
      "AdaState replaces static first-frame anchors with adaptive states, addressing the dynamic deficiency in autoregressive video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Video Generation",
        title: "NAVA: Native Audio-Visual Alignment Framework",
        description: "NAVA addresses limitations of existing open-source audio-visual generation methods—dual-tower posterior alignment and fully unified tri-modal designs—by proposing context-conditioned native audio-visual alignment. The core innovation, Align-then-Fuse MMDiT, first establishes audio-video correspondence via modality-aware layers in a dedicated interaction space, then performs collaborative denoising through shared fusion layers. For music-to-dance tasks, the migration path is clear: current approaches use 3D Audio Attention for audio-motion alignment, while NAVA's dedicated interaction space mechanism enables finer-grained beat-action synchronization. The Timbre-in-Context Conditioning approach can be directly adapted for binding reference character appearance with dance motion control.",
        keyPoints: [
          "Align-then-Fuse MMDiT: Progressive architecture with modality-aware alignment layers + unified fusion layers",
          "Dedicated audio-video interaction space: Separates synchronization from conditioning, avoiding coupling between high-level semantics and low-level synchronization",
          "Timbre-in-Context Conditioning: Binds reference timbre cues to specific speech spans as contextual conditions without auxiliary speaker-control branches"
        ],
        href: "https://arxiv.org/abs/2605.30073",
        paperLink: "Native Audio-Visual Alignment for Generation",
      },
      {
        num: 2,
        tag: "Real-Time Video Generation",
        title: "minWM: Full-Stack Framework for Real-Time Interactive Video World Models",
        description: "minWM is the first open-source end-to-end pipeline converting existing bidirectional T2V/TI2V foundation models into camera-controllable few-step autoregressive world models. The framework covers the complete workflow: camera-controllable fine-tuning, AR diffusion training, causal ODE/causal consistency distillation, and asymmetric DMD post-training. Experiments on Wan2.1-T2V-1.3B show first-frame latency reduced by 236.64× compared to multi-step bidirectional baselines (from 269s to 1.1s). For music-to-dance generation, this framework addresses critical bottlenecks in long-sequence modeling and real-time inference, with Causal Forcing++ distillation strategies directly applicable for accelerating dance video generation model deployment.",
        keyPoints: [
          "Two-phase recipe: Camera-controllable fine-tuning + Causal Forcing/++ distillation (AR training → causal ODE/CD → asymmetric DMD)",
          "Architecture generality: Supports cross-attention condition injection (Wan2.1) and MMDiT-style architectures (HY1.5)",
          "Real-time performance: Wan2.1 1.3B model first-frame latency reduced to 1.137s, HY1.5 8B model to 3.446s"
        ],
        href: "https://arxiv.org/abs/2605.30263",
        paperLink: "minWM: A Full-Stack Open-Source Framework for Real-Time Interactive Video World Models",
      },
      {
        num: 3,
        tag: "Video Dynamics",
        title: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
        description: "Autoregressive video diffusion models have a structural flaw: the first-frame KV representation occupies a privileged position in the attention cache as a static anchor, suppressing video dynamics and hindering scene progression. AdaState proposes replacing the static anchor with an adaptive state—a hidden latent jointly denoised with content at each chunk but never rendered. The model generates its own scene anchor by attending to both the previous state and current content, enabling the reference to co-evolve with generated content. Experiments show significant improvement in video dynamics. For dance video generation, this mechanism prevents generation from falling into static poses, improving body motion coherence and diversity, while horizon-weighted DMD training prioritizes generation quality in later segments of long sequences.",
        keyPoints: [
          "Adaptive state mechanism: Hidden latent evolves with content, replacing frozen first-frame anchors",
          "Temporal relativity: Each generation step sees the same relative position structure without privileged time-zero",
          "Horizon-weighted DMD: Linearly increasing frame-level loss weights prioritizing later frames' generation quality"
        ],
        href: "https://arxiv.org/abs/2605.30349",
        paperLink: "AdaState: Self-Evolving Anchors for Streaming Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "YoCausal: Evaluating Video Generation vs World Models from Causality Perspective",
        tag: "Causal Reasoning",
        href: "https://arxiv.org/abs/2605.30346",
        description: "Proposes Reverse Surprise Index and Causality Cognition Index, using temporally reversed real videos as natural counterfactual samples to assess whether VDMs truly understand causality. Applicable for diagnosing beat-action causal consistency in dance generation.",
      },
      {
        num: 5,
        title: "PhyGenHOI: Physically-Aware 4D Human-Object Interaction Generation",
        tag: "Physics Simulation",
        href: "https://arxiv.org/abs/2605.30268",
        description: "Combines Motion Diffusion Model with Material Point Method, achieving physically consistent human-object interaction via Windowed Attraction Loss and Contact-Driven Re-simulation. The contact simulation mechanism can inform body-environment interaction in dance scenes.",
      },
      {
        num: 6,
        title: "NeuROK: Generative 4D Neural Object Kinematics",
        tag: "4D Dynamics",
        href: "https://arxiv.org/abs/2605.30347",
        description: "Learns data-driven kinematic state parameterization, modeling object dynamics in low-dimensional latent space. Its latent space design may apply to continuous dance motion generation and interpolation.",
      },
      {
        num: 7,
        title: "Qwen-VLA: Unifying Vision-Language-Action Modeling",
        tag: "VLA Models",
        href: "https://arxiv.org/abs/2605.30280",
        description: "DiT-based action decoder unifies manipulation, navigation, and trajectory prediction. Its cross-modal alignment and continuous action generation framework provides reference implementation for dance motion generation.",
      },
    ],
    observation: "",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-30`,
        'en': `/en/daily/music-to-dance/2026-05-30`,
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
      date="2026-05-30"
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
