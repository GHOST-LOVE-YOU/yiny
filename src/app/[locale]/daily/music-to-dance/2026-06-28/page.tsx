import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-06-28 | 4D人体建模与视频生成的技术融合",
    overview: [
      "TryOnCrafter提出Renderable 4D Try-on Proxy，将SMPL-X驱动的3DGS avatar与DiT视频生成结合，为可控人体视频生成提供了新范式",
      "SAM2Matting实现零样本视频抠图，通过解耦跟踪与抠图任务，在保持时序一致性的同时实现精细前景分离",
      "DanceOPD提出flow-matching模型的多能力蒸馏框架，通过velocity field组合实现T2I、编辑等能力的统一"
    ],
    papers: [
      {
        num: 1,
        tag: "可控视频生成",
        title: "TryOnCrafter: 基于Renderable 4D Proxy的相机可控虚拟试穿",
        description: "TryOnCrafter开创了Camera-controllable Video Virtual Try-on (CaM-VVT)任务，核心创新在于提出Renderable 4D Try-on Proxy——将2D试穿先验蒸馏为3DGS-based clothed avatar，并通过SMPL-X序列驱动动画。该proxy在world space中metric-aligned，与重建的背景点云结合形成完整的4D场景表示。Proxy-Anchored Video DiT以渲染的proxy为几何锚点，确保生成视频严格遵循指定相机轨迹和物理合理的形变。该方法支持360度轨道视角、子弹时间等交互式应用，在CaM-VVTBench上显著超越现有基线。",
        keyPoints: [
          "提出4D Try-on Proxy架构：3DGS avatar + SMPL-X驱动 + metric-aligned场景，实现显式几何解耦",
          "Proxy-Anchored DiT：以渲染proxy为结构锚点，解决级联误差累积和服装建模不足问题",
          "支持novel camera trajectory合成：实现360度视角、子弹时间等交互式数字时尚体验"
        ],
        href: "https://arxiv.org/abs/2606.26092",
        paperLink: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
      },
      {
        num: 2,
        tag: "视频抠图",
        title: "SAM2Matting: 解耦跟踪与抠图的零样本视频抠图框架",
        description: "SAM2Matting重新思考视频抠图范式，提出tracker-to-matting框架：保持VOS tracker（SAM2/SAM3）冻结以确保高级跟踪能力，仅训练轻量级matting组件在图像数据上学习细粒度alpha估计。ROI Detector通过整合图像特征和跟踪mask识别matting-critical区域，Progressive Alpha Predictor以coarse-to-fine级联方式逐步精修。该方法在视频抠图基准上实现零样本SOTA，且仅增加极小计算开销（SAM2.1-Tiny变体在1080p视频上达40 FPS，显存<5GB）。",
        keyPoints: [
          "解耦设计：冻结VOS tracker保持时序一致性，专用matting组件处理细粒度细节",
          "ROI Detector：智能识别需要精细抠图的区域，避免传统morphological操作的均匀边界假设",
          "零样本视频抠图SOTA：仅训练于图像数据，泛化到human-centric和in-the-wild场景"
        ],
        href: "https://arxiv.org/abs/2606.27339",
        paperLink: "SAM2Matting: Generalized Image and Video Matting",
      },
      {
        num: 3,
        tag: "生成模型蒸馏",
        title: "DanceOPD: Flow-matching模型的On-Policy生成场蒸馏",
        description: "DanceOPD针对flow-matching模型的多能力组合挑战，提出on-policy generative field distillation框架。将每个能力源视为velocity field，通过hard-routed sample-wise field matching为每个样本选择单一能力场，在student rollout的stop-gradient状态上查询（on-policy querying），并采用single semantic-side low-noise query避免轨迹内相关信号的过度计数。实验表明，该方法在T2I+编辑组合任务上GEditBench提升8.1%，在局部+全局编辑组合上提升16.1%，同时支持realism field和CFG的吸收。",
        keyPoints: [
          "Hard-routed field matching：每个样本路由到单一能力场，保持语义身份清晰",
          "On-policy querying：在student rollout状态上查询teacher field，对齐训练与推理分布",
          "Semantic-side single query：选择低噪声区域查询，避免密集采样带来的轨迹相关性偏差"
        ],
        href: "https://arxiv.org/abs/2606.27377",
        paperLink: "DanceOPD: On-Policy Generative Field Distillation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "ViQ: 任意分辨率下的文本对齐视觉量化表示",
        tag: "多模态表示",
        href: "https://arxiv.org/abs/2606.27313",
        description: "两阶段量化学习框架（文本对齐预训练 + 特征离散化），支持原生分辨率输入，在保持细节的同时提升语义丰富度。",
      },
      {
        num: 5,
        title: "MusicJudge: 音乐感知的自动演唱评估框架",
        tag: "音乐理解",
        href: "https://arxiv.org/abs/2606.26451",
        description: "结合歌词正确性与音高-节奏保真度的多模态分析框架，对音频-表演对齐有参考价值。",
      },
      {
        num: 6,
        title: "ICWM: 机器人控制的上下文世界建模",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.26025",
        description: "通过自生成交互历史推断系统变量，实现新相机视角配置下的自适应，无需参数更新。",
      },
      {
        num: 7,
        title: "PhysiFormer: 世界坐标系中的物理合理运动模拟",
        tag: "物理仿真",
        href: "https://arxiv.org/abs/2606.27364",
        description: "直接在world coordinates中对顶点轨迹进行扩散建模，无需显式刚性约束即可生成物理一致的运动。",
      },
      {
        num: 8,
        title: "LISA: 视觉条件可控生成的似然分数对齐",
        tag: "条件生成",
        href: "https://arxiv.org/abs/2606.27192",
        description: "显式对齐side network中间特征与近似likelihood score的正则化方法，加速训练收敛并改善合成质量。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-06-28 | 4D Human Modeling Meets Video Generation",
    overview: [
      "TryOnCrafter introduces Renderable 4D Try-on Proxy, combining SMPL-X-driven 3DGS avatar with DiT video generation for controllable human video synthesis",
      "SAM2Matting achieves zero-shot video matting by decoupling tracking and matting, ensuring temporal consistency with fine-grained foreground separation",
      "DanceOPD proposes multi-capability distillation for flow-matching models, unifying T2I, editing via velocity field composition"
    ],
    papers: [
      {
        num: 1,
        tag: "Controllable Video Generation",
        title: "TryOnCrafter: Camera-Controllable Virtual Try-on via Renderable 4D Proxy",
        description: "TryOnCrafter pioneers the Camera-controllable Video Virtual Try-on (CaM-VVT) task with a Renderable 4D Try-on Proxy that distills 2D try-on priors into a 3DGS-based clothed avatar, animated via SMPL-X sequences. The proxy is metric-aligned in world space with reconstructed background point clouds, forming a complete 4D scene representation. The Proxy-Anchored Video DiT uses rendered proxy as geometric anchor, ensuring synthesized videos strictly follow prescribed camera trajectories with physically plausible deformations. The method supports interactive applications like 360-degree orbital viewing and bullet-time effects, significantly outperforming baselines on CaM-VVTBench.",
        keyPoints: [
          "4D Try-on Proxy architecture: 3DGS avatar + SMPL-X driving + metric-aligned scene for explicit geometric decoupling",
          "Proxy-Anchored DiT: Uses rendered proxy as structural anchor, addressing cascaded error accumulation and limited garment modeling",
          "Novel camera trajectory synthesis: Enables 360-degree viewing, bullet-time effects for interactive digital fashion"
        ],
        href: "https://arxiv.org/abs/2606.26092",
        paperLink: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
      },
      {
        num: 2,
        tag: "Video Matting",
        title: "SAM2Matting: Decoupled Tracking and Matting for Zero-Shot Video Matting",
        description: "SAM2Matting rethinks video matting with a tracker-to-matting framework: keeping the VOS tracker (SAM2/SAM3) frozen for robust high-level tracking while training lightweight matting components on image data for fine-grained alpha estimation. The ROI Detector identifies matting-critical regions by integrating image features and tracking masks, while the Progressive Alpha Predictor refines mattes through coarse-to-fine cascades. The method achieves zero-shot SOTA on video matting benchmarks with minimal computational overhead (SAM2.1-Tiny runs at 40 FPS on 1080p video with <5GB VRAM).",
        keyPoints: [
          "Decoupled design: Frozen VOS tracker maintains temporal consistency, dedicated matting components handle fine details",
          "ROI Detector: Intelligently identifies regions requiring fine matting, avoiding uniform boundary assumptions of morphological operations",
          "Zero-shot video matting SOTA: Trained only on images, generalizes to human-centric and in-the-wild scenarios"
        ],
        href: "https://arxiv.org/abs/2606.27339",
        paperLink: "SAM2Matting: Generalized Image and Video Matting",
      },
      {
        num: 3,
        tag: "Generative Model Distillation",
        title: "DanceOPD: On-Policy Generative Field Distillation for Flow-Matching Models",
        description: "DanceOPD addresses multi-capability composition in flow-matching models through on-policy generative field distillation. Treating each capability source as a velocity field, it uses hard-routed sample-wise field matching to select a single capability field per sample, queries on stop-gradient states from student rollouts (on-policy querying), and employs single semantic-side low-noise queries to avoid overcounting correlated within-trajectory signals. Experiments show 8.1% improvement on GEditBench for T2I+editing composition and 16.1% for local+global editing, while supporting realism field and CFG absorption.",
        keyPoints: [
          "Hard-routed field matching: Each sample routed to single capability field, preserving clear semantic identity",
          "On-policy querying: Queries teacher field on student rollout states, aligning training and inference distributions",
          "Semantic-side single query: Selects low-noise region for querying, avoiding trajectory correlation bias from dense sampling"
        ],
        href: "https://arxiv.org/abs/2606.27377",
        paperLink: "DanceOPD: On-Policy Generative Field Distillation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "ViQ: Text-Aligned Visual Quantized Representations at Any Resolution",
        tag: "Multimodal Representation",
        href: "https://arxiv.org/abs/2606.27313",
        description: "Two-stage quantization framework (text-aligned pretraining + feature discretization) supporting native-resolution inputs with improved semantic richness while preserving details.",
      },
      {
        num: 5,
        title: "MusicJudge: Music-Aware Framework for Automatic Singing Evaluation",
        tag: "Music Understanding",
        href: "https://arxiv.org/abs/2606.26451",
        description: "Multimodal analysis framework combining lyric correctness with pitch-rhythm fidelity, relevant for audio-performance alignment.",
      },
      {
        num: 6,
        title: "ICWM: In-Context World Modeling for Robotic Control",
        tag: "World Models",
        href: "https://arxiv.org/abs/2606.26025",
        description: "Infers system variables from self-generated interaction history, enabling adaptation to novel camera viewpoints without parameter updates.",
      },
      {
        num: 7,
        title: "PhysiFormer: Learning Physics-Plausible Motion in World Space",
        tag: "Physics Simulation",
        href: "https://arxiv.org/abs/2606.27364",
        description: "Direct diffusion modeling of vertex trajectories in world coordinates, generating physically consistent motion without explicit rigidity constraints.",
      },
      {
        num: 8,
        title: "LISA: Likelihood Score Alignment for Visual-Condition Generation",
        tag: "Conditional Generation",
        href: "https://arxiv.org/abs/2606.27192",
        description: "Regularization method explicitly aligning side network features with approximated likelihood scores, accelerating training convergence.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-28`,
        'en': `/en/daily/music-to-dance/2026-06-28`,
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
      date="2026-06-28"
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
