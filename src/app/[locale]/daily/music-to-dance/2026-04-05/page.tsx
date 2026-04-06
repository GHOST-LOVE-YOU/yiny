import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "动态视频生成与多主体控制的技术突破",
    overview: [
      "G-buffer 引导的视频生成技术为外观迁移提供更精确的几何与材质控制",
      "多主体动作绑定机制解决了复杂场景中的动作-主体关联问题",
      "光流引导的两阶段生成框架实现了高动态舞蹈动作的合成"
    ],
    papers: [
      {
        num: 1,
        tag: "渲染与生成",
        title: "G-buffer 引导的生成式世界渲染器",
        description: "论文提出了一个大规模游戏数据集（400万帧720p视频），包含同步的RGB和5通道G-buffer（深度、法线、反照率、金属度、粗糙度）。该数据集通过双屏拼接捕获技术从AAA游戏中提取，支持双向渲染：既可用于逆渲染（从视频分解几何/材质），也可用于G-buffer引导的前向视频生成。实验表明，在该数据上微调的DiffusionRenderer在材质分解和视频合成方面显著优于基线。对于music-to-dance任务，G-buffer提供了显式的几何和外观先验，可用于更精确地控制参考人物的外观迁移，解决当前方案中patch-shuffling可能导致的外观失真问题。",
        keyPoints: [
          "400万帧同步G-buffer数据集，支持深度、法线、材质属性的显式分解",
          "G-buffer引导的视频生成可实现光照、天气、风格的精确编辑",
          "VLM-based评估协议验证真实场景泛化能力，与人类判断高度一致"
        ],
        href: "https://arxiv.org/abs/2604.02329",
        paperLink: "Generative World Renderer",
      },
      {
        num: 2,
        tag: "多主体控制",
        title: "ActionParty：生成式视频游戏中的多主体动作绑定",
        description: "论文针对视频扩散模型中的动作绑定问题（action binding）——即模型难以将特定动作与对应主体关联——提出了ActionParty框架。通过引入subject state tokens（主体状态令牌）作为隐式状态表示，结合3D RoPE位置编码的空间偏置机制，实现了全局视频渲染与个体动作控制的解耦。在Melting Pot基准的46个环境中，模型可同时控制多达7个玩家，动作跟随准确率从文本基线的0.158提升至0.779。对于music-to-dance，该技术可直接迁移：当场景中包含多个参考人物或需要分离人物与背景动作时，subject state tokens可确保音频驱动的动作仅作用于目标主体。",
        keyPoints: [
          "Subject state tokens实现主体状态的显式建模，解耦全局渲染与个体控制",
          "3D RoPE空间偏置机制确保动作-主体的精确绑定",
          "在46个游戏环境、7个玩家场景下验证，动作跟随准确率达77.9%"
        ],
        href: "https://arxiv.org/abs/2604.02330",
        paperLink: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
      },
      {
        num: 3,
        tag: "动态运动生成",
        title: "DynaVid：基于合成运动数据的高动态视频生成",
        description: "论文指出视频扩散模型在高动态运动（如街舞）合成上的瓶颈在于训练数据中此类样本稀缺。DynaVid提出两阶段框架：运动生成器先合成光流图，再由运动引导的视频生成器合成RGB帧。关键创新是使用渲染的光流而非合成视频作为训练数据——光流仅编码运动、与外观解耦，从而避免合成视频的人工痕迹。实验显示，该方法在breakdancing等高动态人体运动和极端相机运动控制上均优于Wan2.2-5B等基线。对于music-to-dance任务，该框架可直接借鉴：音频节拍可通过类似光流的中间表示转换为运动信号，再引导视频生成，实现更精确的音频-运动对齐。",
        keyPoints: [
          "光流作为中间表示，实现运动与外观的显式解耦",
          "合成运动数据提供精确控制信号，弥补真实数据中高动态样本的稀缺",
          "两阶段生成框架支持文本到视频和相机控制两种场景"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "可引导的视觉表征：用语言控制视觉特征聚焦",
        tag: "表征学习",
        href: "https://arxiv.org/abs/2604.02327",
        description: "通过早期融合将文本注入视觉编码器层，实现全局和局部特征的自然语言引导，可用于舞蹈生成中的外观精确控制。",
      },
      {
        num: 5,
        title: "VOID：视频对象与交互删除",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2604.02296",
        description: "基于物理推理的视频对象删除框架，可应用于舞蹈视频后处理中去除不需要的背景元素。",
      },
      {
        num: 6,
        title: "FlowSlider：无需训练的连续图像编辑",
        tag: "图像编辑",
        href: "https://arxiv.org/abs/2604.02088",
        description: "在Rectified Flow中将编辑分解为保真项和引导项，实现滑块式连续编辑，可迁移到舞蹈视频的风格调整。",
      },
      {
        num: 7,
        title: "NearID：基于近身份干扰物的身份表征学习",
        tag: "身份保持",
        href: "https://arxiv.org/abs/2604.01973",
        description: "通过近身份干扰物训练身份感知表征，提升参考人物编码的准确性，对appearance migration有借鉴价值。",
      },
      {
        num: 8,
        title: "流式视频理解的简单基线",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2604.02317",
        description: "发现滑动窗口基线在流式视频理解中已能匹敌复杂记忆机制，对长舞蹈视频的实时处理有参考价值。",
      },
    ],
    observation: "今日论文呈现出视频生成领域的三个关键趋势：一是显式几何/材质表示（G-buffer）与生成模型的结合，为可控视频合成提供了物理基础；二是动作-主体绑定机制从隐式（文本提示）向显式（state tokens + 空间偏置）的转变，这对多人物舞蹈场景尤为重要；三是运动-外观解耦的两阶段生成范式，通过光流等中间表示桥接合成数据与真实视频。对于music-to-dance任务，这些技术可组合应用：G-buffer提供外观迁移的几何先验，subject state tokens确保音频动作精准作用于目标人物，光流引导的两阶段框架则支持从音乐节拍到高动态舞蹈动作的端到端生成。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Breakthroughs in Dynamic Video Generation and Multi-Subject Control",
    overview: [
      "G-buffer guided video generation enables precise geometry and material control for appearance transfer",
      "Multi-subject action binding mechanisms solve action-subject association in complex scenes",
      "Optical flow-guided two-stage generation framework synthesizes highly dynamic dance motions"
    ],
    papers: [
      {
        num: 1,
        tag: "Rendering & Generation",
        title: "G-buffer Guided Generative World Renderer",
        description: "This paper introduces a large-scale game dataset (4M frames at 720p) with synchronized RGB and 5-channel G-buffers (depth, normals, albedo, metallic, roughness). Extracted from AAA games via dual-screen stitched capture, the dataset supports bidirectional rendering: inverse rendering for geometry/material decomposition and G-buffer guided forward video generation. Experiments show fine-tuned DiffusionRenderer significantly outperforms baselines in material decomposition and video synthesis. For music-to-dance tasks, G-buffers provide explicit geometric and appearance priors for more precise reference person appearance transfer, addressing distortion issues in current patch-shuffling approaches.",
        keyPoints: [
          "4M-frame synchronized G-buffer dataset enabling explicit decomposition of depth, normals, and material properties",
          "G-buffer guided generation enables precise editing of lighting, weather, and style",
          "VLM-based evaluation protocol validates real-world generalization, strongly correlating with human judgment"
        ],
        href: "https://arxiv.org/abs/2604.02329",
        paperLink: "Generative World Renderer",
      },
      {
        num: 2,
        tag: "Multi-Subject Control",
        title: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
        description: "Addressing the action binding problem in video diffusion models—where models struggle to associate specific actions with corresponding subjects—this paper proposes ActionParty. By introducing subject state tokens as implicit state representations combined with 3D RoPE spatial biasing, it decouples global video rendering from individual action control. Evaluated on 46 Melting Pot environments, the model controls up to 7 players simultaneously, improving action-following accuracy from 0.158 (text baseline) to 0.779. For music-to-dance, this directly transfers: when scenes contain multiple reference persons or require separating subject from background motion, subject state tokens ensure audio-driven actions apply only to target subjects.",
        keyPoints: [
          "Subject state tokens enable explicit subject state modeling, decoupling global rendering from individual control",
          "3D RoPE spatial biasing mechanism ensures precise action-subject binding",
          "Validated across 46 game environments with 7 players, achieving 77.9% action-following accuracy"
        ],
        href: "https://arxiv.org/abs/2604.02330",
        paperLink: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
      },
      {
        num: 3,
        tag: "Dynamic Motion Generation",
        title: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
        description: "Identifying the bottleneck of scarce high-dynamic-motion samples in video diffusion training data, DynaVid proposes a two-stage framework: a motion generator first synthesizes optical flow maps, then a motion-guided video generator produces RGB frames. The key innovation is using rendered optical flow rather than synthetic videos as training data—flow encodes only motion, decoupled from appearance, avoiding synthetic artifacts. Experiments show superior performance over Wan2.2-5B baselines in breakdancing and extreme camera motion control. For music-to-dance, this framework directly applies: audio beats can be converted to motion signals through flow-like intermediate representations, then guide video generation for more precise audio-motion alignment.",
        keyPoints: [
          "Optical flow as intermediate representation enables explicit motion-appearance decoupling",
          "Synthetic motion data provides precise control signals, compensating for scarce high-dynamic samples in real data",
          "Two-stage generation framework supports both text-to-video and camera control scenarios"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Steerable Visual Representations: Language-Guided Visual Feature Focusing",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2604.02327",
        description: "Injecting text into visual encoder layers via early fusion enables natural language guidance of global and local features for precise appearance control in dance generation.",
      },
      {
        num: 5,
        title: "VOID: Video Object and Interaction Deletion",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2604.02296",
        description: "Physics-aware video object removal framework applicable to post-processing dance videos for removing unwanted background elements.",
      },
      {
        num: 6,
        title: "FlowSlider: Training-Free Continuous Image Editing",
        tag: "Image Editing",
        href: "https://arxiv.org/abs/2604.02088",
        description: "Decomposing editing into fidelity and steering terms in Rectified Flow enables slider-style continuous editing, transferable to dance video style adjustment.",
      },
      {
        num: 7,
        title: "NearID: Identity Representation Learning via Near-Identity Distractors",
        tag: "Identity Preservation",
        href: "https://arxiv.org/abs/2604.01973",
        description: "Training identity-aware representations via near-identity distractors improves reference person encoding accuracy, valuable for appearance migration.",
      },
      {
        num: 8,
        title: "A Simple Baseline for Streaming Video Understanding",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2604.02317",
        description: "Finding that sliding-window baselines match complex memory mechanisms in streaming video understanding, relevant for real-time processing of long dance videos.",
      },
    ],
    observation: "Today's papers reveal three key trends in video generation: (1) integration of explicit geometric/material representations (G-buffers) with generative models, providing physical foundations for controllable synthesis; (2) shift from implicit (text prompts) to explicit (state tokens + spatial biasing) action-subject binding mechanisms, crucial for multi-person dance scenes; (3) motion-appearance decoupled two-stage generation paradigms bridging synthetic data and real videos via intermediate representations like optical flow. For music-to-dance tasks, these technologies combine: G-buffers provide geometric priors for appearance transfer, subject state tokens ensure audio actions precisely target specific persons, and flow-guided two-stage frameworks support end-to-end generation from music beats to high-dynamic dance motions.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-05`,
        'en': `/en/daily/music-to-dance/2026-04-05`,
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
      date="2026-04-05"
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