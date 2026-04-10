import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-04-09 | 运动解耦控制与音频驱动视频生成新进展",
    overview: [
      "MoRight 提出运动解耦控制框架，将相机运动与物体运动分离，支持前向/逆向运动推理",
      "GenLCA 实现从单目视频训练全身3D扩散模型，visibility-aware训练策略解决遮挡问题",
      "LPM 1.0 构建17B参数音频驱动角色表演模型，实现实时流式视频生成与身份一致性"
    ],
    papers: [
      {
        num: 1,
        tag: "运动控制",
        title: "MoRight：实现相机与物体运动解耦的因果推理视频生成",
        description: "MoRight 提出了一种统一的运动控制框架，通过双流运动建模实现相机与物体运动的解耦。核心创新包括：(1) 在规范静态视角下建模物体运动，通过时序跨视角注意力将运动迁移到任意目标相机视角；(2) 将运动分解为主动（用户驱动）和被动（结果）两种成分，使模型能够学习运动因果关系。实验表明，该框架支持前向推理（从主动运动预测场景演化）和逆向推理（从期望结果恢复合理动作），在生成质量、运动可控性和交互感知方面达到SOTA。对于music-to-dance任务，这种解耦机制可直接迁移：将音频节拍作为主动运动信号，舞蹈动作作为被动结果，实现相机视角与人物舞蹈动作的独立控制。",
        keyPoints: [
          "双流运动建模：规范静态视角分支 + 跨视角运动迁移机制",
          "运动因果推理：主动运动与被动运动的分解与学习",
          "双向推理能力：支持前向场景演化和逆向动作恢复"
        ],
        href: "https://arxiv.org/abs/2604.07348",
        paperLink: "MoRight: Motion Control Done Right",
      },
      {
        num: 2,
        tag: "3D生成",
        title: "GenLCA：从野外视频训练全身3D扩散模型",
        description: "GenLCA 提出了一种从部分可观测的2D数据（单目视频）训练全身3D扩散模型的新范式。关键技术包括：(1) 利用预训练的前馈头像重建模型作为可动画3D tokenizer，将非结构化视频帧编码为结构化3D token；(2) 提出visibility-aware扩散训练策略，用可学习token替换未观测区域，并仅在有效区域计算损失。该方法使训练数据规模扩展到约110万个身份，生成的头像支持高保真面部和全身动画。对于music-to-dance任务，这种从野外视频构建大规模3D训练数据的方法具有直接参考价值，visibility-aware策略可有效处理舞蹈视频中的遮挡问题。",
        keyPoints: [
          "3D tokenizer：预训练头像重建模型编码视频为结构化3D token",
          "Visibility-aware训练：处理部分观测导致的token模糊/缺失问题",
          "百万级身份数据：从单目视频构建大规模3D扩散训练集"
        ],
        href: "https://arxiv.org/abs/2604.07273",
        paperLink: "GenLCA: 3D Diffusion for Full-Body Avatars from In-the-Wild Videos",
      },
      {
        num: 3,
        tag: "音频驱动",
        title: "LPM 1.0：实时音频驱动角色表演生成模型",
        description: "LPM 1.0 是一个17B参数的大型表演模型，专注于单人多模态音视频对话表演。系统架构包括：(1) Base LPM：基于14B图像到视频基础模型，增加3B参数用于交错说话/聆听音频交叉注意力，实现语音驱动动态、聆听反应、文本控制和身份保持的联合学习；(2) Online LPM：通过蒸馏Base LPM得到的因果流式生成器，支持低延迟、无限长度的实时交互。模型在推理时可根据角色图像、用户音频和文本提示生成聆听视频和说话视频。对于music-to-dance任务，其实时流式生成能力和身份一致性保持机制具有重要借鉴意义，多参考图像的身份感知提取方法可用于保持舞蹈人物外观稳定。",
        keyPoints: [
          "17B参数DiT架构：14B基础模型 + 3B音频交叉注意力模块",
          "全双工对话：同时支持说话驱动和聆听反应生成",
          "实时流式推理：因果生成器支持无限长度低延迟交互"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "INSPATIO-WORLD：实时4D世界模拟器",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.07209",
        description: "时空自回归架构对长时程舞蹈视频生成的参考价值，隐式时空缓存机制可用于保持舞蹈序列一致性。",
      },
      {
        num: 5,
        title: "Sol-RL：FP4量化扩散强化学习",
        tag: "训练效率",
        href: "https://arxiv.org/abs/2604.06916",
        description: "FP4探索+BF16训练的两阶段框架，可显著降低music-to-dance模型后训练成本，加速人类偏好对齐。",
      },
      {
        num: 6,
        title: "FlowInOne：统一多模态生成的视觉流",
        tag: "多模态",
        href: "https://arxiv.org/abs/2604.06757",
        description: "将所有输入统一为视觉提示的图像进图像出范式，可能简化music-to-dance的多模态输入处理。",
      },
      {
        num: 7,
        title: "Action Images：像素级动作表示",
        tag: "动作表示",
        href: "https://arxiv.org/abs/2604.06168",
        description: "将7自由度机器人动作编码为2D像素动作图像的方法，对音频驱动舞蹈动作控制有启发。",
      },
      {
        num: 8,
        title: "接触丰富交互角色的物理运动追踪",
        tag: "物理模拟",
        href: "https://arxiv.org/abs/2604.07984",
        description: "基于渐进神经网络的多专家运动追踪方法，对地面动作、双人舞等接触丰富舞蹈的真实感生成有参考价值。",
      },
    ],
    observation: "今日论文在运动控制、3D生成和音频驱动三个方向均有重要进展。MoRight的运动解耦框架为music-to-dance提供了相机与舞蹈动作独立控制的技术路径；GenLCA的visibility-aware训练策略可直接应用于野外舞蹈视频的数据构建；LPM 1.0的实时流式生成能力则指向了交互式舞蹈生成的工程实现。三者结合，有望推动music-to-dance从离线生成向实时交互演进。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-04-09 | Advances in Disentangled Motion Control and Audio-Driven Video Generation",
    overview: [
      "MoRight proposes a disentangled motion control framework separating camera and object motion with forward/inverse reasoning",
      "GenLCA enables training full-body 3D diffusion models from monocular videos using visibility-aware training",
      "LPM 1.0 builds a 17B parameter audio-driven character performance model with real-time streaming generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Control",
        title: "MoRight: Disentangled Camera-Object Motion Control with Causal Reasoning",
        description: "MoRight introduces a unified motion control framework with dual-stream motion modeling. Key innovations: (1) Modeling object motion in a canonical static view and transferring to arbitrary target viewpoints via temporal cross-view attention; (2) Decomposing motion into active (user-driven) and passive (consequence) components for learning motion causality. The framework supports both forward reasoning (predicting scene evolution from actions) and inverse reasoning (recovering plausible actions from desired outcomes). For music-to-dance, this disentanglement enables independent control of camera viewpoints and character dance motions by treating audio beats as active motion signals.",
        keyPoints: [
          "Dual-stream motion modeling: canonical static view branch + cross-view motion transfer",
          "Motion causality reasoning: decomposition of active and passive motion components",
          "Bidirectional reasoning: forward scene evolution and inverse action recovery"
        ],
        href: "https://arxiv.org/abs/2604.07348",
        paperLink: "MoRight: Motion Control Done Right",
      },
      {
        num: 2,
        tag: "3D Generation",
        title: "GenLCA: Training 3D Diffusion Models from In-the-Wild Videos",
        description: "GenLCA presents a novel paradigm for training full-body 3D diffusion models from partially observable 2D data. Key techniques: (1) Using a pretrained feed-forward avatar reconstruction model as an animatable 3D tokenizer; (2) Proposing visibility-aware diffusion training that replaces unobserved regions with learnable tokens and computes losses only over valid regions. This scales training data to ~1.1 million identities. For music-to-dance, the visibility-aware strategy directly addresses occlusion challenges in dance videos, while the tokenizer approach enables building large-scale 3D training datasets from wild dance videos.",
        keyPoints: [
          "3D tokenizer: pretrained avatar reconstruction model encodes videos to structured 3D tokens",
          "Visibility-aware training: handles token corruption from partial observations",
          "Million-scale identities: building 3D diffusion training sets from monocular videos"
        ],
        href: "https://arxiv.org/abs/2604.07273",
        paperLink: "GenLCA: 3D Diffusion for Full-Body Avatars from In-the-Wild Videos",
      },
      {
        num: 3,
        tag: "Audio-Driven",
        title: "LPM 1.0: Real-Time Audio-Driven Character Performance Generation",
        description: "LPM 1.0 is a 17B parameter large performance model for single-person full-duplex audio-visual conversational performance. Architecture: (1) Base LPM: 14B image-to-video foundation model plus 3B parameters for interleaved speak/listen audio cross-attention, jointly learning speech-driven dynamics, listening reactions, text control, and identity preservation; (2) Online LPM: distilled causal streaming generator supporting low-latency, infinite-length interaction. For music-to-dance, its real-time streaming capability and identity consistency mechanisms are highly relevant, and the identity-aware multi-reference extraction method can maintain stable dancer appearance.",
        keyPoints: [
          "17B parameter DiT: 14B base model + 3B audio cross-attention modules",
          "Full-duplex conversation: simultaneous speaking-driven and listening-reaction generation",
          "Real-time streaming: causal generator supports infinite-length low-latency interaction"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "INSPATIO-WORLD: Real-Time 4D World Simulator",
        tag: "World Model",
        href: "https://arxiv.org/abs/2604.07209",
        description: "Spatiotemporal autoregressive architecture for long-horizon dance video generation, with implicit spatiotemporal cache for maintaining sequence consistency.",
      },
      {
        num: 5,
        title: "Sol-RL: FP4 Quantized Diffusion RL",
        tag: "Training Efficiency",
        href: "https://arxiv.org/abs/2604.06916",
        description: "Two-stage FP4 exploration + BF16 training framework significantly reduces post-training costs for music-to-dance models and accelerates human preference alignment.",
      },
      {
        num: 6,
        title: "FlowInOne: Unified Visual Flow for Multimodal Generation",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2604.06757",
        description: "Image-in image-out paradigm unifying all inputs as visual prompts, potentially simplifying multimodal input processing for music-to-dance.",
      },
      {
        num: 7,
        title: "Action Images: Pixel-Level Action Representation",
        tag: "Action Representation",
        href: "https://arxiv.org/abs/2604.06168",
        description: "Encoding 7-DoF robot actions as 2D pixel action images, inspiring audio-driven dance motion control approaches.",
      },
      {
        num: 8,
        title: "Physics-Based Motion Tracking for Contact-Rich Characters",
        tag: "Physics Simulation",
        href: "https://arxiv.org/abs/2604.07984",
        description: "Progressive neural network based multi-expert tracking method relevant for realistic generation of contact-rich dance motions like floor work and partner dancing.",
      },
    ],
    observation: "Today's papers show significant advances in motion control, 3D generation, and audio-driven generation. MoRight's disentanglement framework provides a technical path for independent camera and dance motion control; GenLCA's visibility-aware training directly applies to building dance video datasets; LPM 1.0's real-time streaming capability points toward interactive dance generation. Together, these advances could push music-to-dance from offline generation toward real-time interaction.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-09`,
        'en': `/en/daily/music-to-dance/2026-04-09`,
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
      date="2026-04-09"
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
