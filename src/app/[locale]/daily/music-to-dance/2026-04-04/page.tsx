import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-04-04 | 多主体动作绑定与动态视频生成新进展",
    overview: [
      "ActionParty 提出 subject state tokens 机制，实现多主体场景下的动作-主体精准绑定",
      "DynaVid 利用合成光流数据训练，在保持视觉真实感的同时实现高动态运动生成",
      "Latent Space 综述系统梳理了连续隐空间建模的技术脉络，为音频-视觉对齐提供新视角"
    ],
    papers: [
      {
        num: 1,
        tag: "多主体控制",
        title: "ActionParty：用 Subject State Tokens 解决动作绑定难题",
        description: "ActionParty 针对视频扩散模型在多主体场景下的动作绑定失败问题，提出了 subject state tokens 机制——一组持续捕获场景中每个主体状态的隐变量。通过联合建模 state tokens 和视频隐变量，并引入基于 3D RoPE 的空间偏置机制，模型将全局帧渲染与个体动作控制解耦。在 Melting Pot 基准的 46 个多智能体游戏环境中，ActionParty 实现了对最多 7 个玩家的精确控制，显著优于纯文本控制基线。对于 music-to-dance 任务，这一机制可直接迁移：将舞者视为可控主体，音频节拍特征作为动作输入，通过 state tokens 维护舞者身份一致性，解决当前方案中多人舞蹈时身份混淆和动作错配的问题。",
        keyPoints: [
          "Subject state tokens 作为持久隐状态，实现动作-主体的显式关联",
          "3D RoPE 空间偏置将主体 token 锚定到视频中的具体空间坐标",
          "在 46 个游戏环境、最多 7 主体的场景下验证有效，具备强扩展性"
        ],
        href: "https://arxiv.org/abs/2604.02330",
        paperLink: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
      },
      {
        num: 2,
        tag: "动态运动生成",
        title: "DynaVid：合成光流数据驱动的高动态视频生成",
        description: "DynaVid 针对高动态运动（如街舞、快速相机运动）生成困难的问题，提出用合成光流数据而非合成视频进行训练。光流仅编码运动信息，与外观解耦，避免了合成视频的人工感。框架采用两阶段生成：motion generator 基于合成光流学习动态运动模式，motion-guided video generator 结合真实视频训练保持视觉真实感。实验显示，该方法在剧烈人体运动和极端相机运动控制上均优于现有方案。对于 music-to-dance，可借鉴其思路：用合成舞蹈动作数据（光流或骨骼序列）训练 motion generator，再生成真实感舞蹈视频，解决真实舞蹈数据稀缺的问题。",
        keyPoints: [
          "光流作为中间表示，分离运动学习与外观学习，消除合成-真实域差距",
          "两阶段框架：motion generator 学习动态模式，video generator 保持视觉真实",
          "在街舞生成和快速相机运动控制两个挑战性场景上验证有效"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
      {
        num: 3,
        tag: "隐空间建模",
        title: "Latent Space 综述：从机制到能力的全景梳理",
        description: "这篇综述系统梳理了语言模型中连续隐空间的研究脉络，从 Foundation、Evolution、Mechanism、Ability、Outlook 五个维度展开。核心洞察是：相比离散的文本 token 空间，连续隐空间能更高效地承载推理、规划、感知、记忆等认知能力，避免语言冗余、离散瓶颈和语义损失。对于 music-to-dance 的音频-视觉对齐任务，综述中讨论的 Representation（内部/外部/可学习表示）、Computation（压缩/扩展/自适应计算）和 Optimization（推理时优化）等机制，为改进 3D Audio Attention 的隐空间设计提供了系统性的技术参考。特别是 Interleaved Cross-Modal Reasoning 章节，直接相关于音频特征与视觉特征在隐空间的联合建模。",
        keyPoints: [
          "系统区分了隐空间与显式文本空间、视觉生成模型隐空间的概念差异",
          "从 Architecture、Representation、Computation、Optimization 四个机制维度组织技术脉络",
          "涵盖 Reasoning、Planning、Modeling、Perception、Memory 等七大能力，为跨模态对齐提供理论框架"
        ],
        href: "https://arxiv.org/abs/2604.02029",
        paperLink: "The Latent Space: Foundation, Evolution, Mechanism, Ability, and Outlook",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Generative World Renderer：G-buffer 引导的真实感视频生成",
        tag: "场景渲染",
        href: "https://arxiv.org/abs/2604.02329",
        description: "从 AAA 游戏提取 400 万帧 G-buffer 数据，实现几何材质分解和可控视频生成，可用于增强舞蹈视频场景一致性。",
      },
      {
        num: 5,
        title: "LatentUM：统一隐空间的交错跨模态推理",
        tag: "跨模态统一",
        href: "https://arxiv.org/abs/2604.02097",
        description: "在共享语义隐空间中表示所有模态，消除像素空间中介，对音频-视觉联合建模有参考价值。",
      },
      {
        num: 6,
        title: "Steerable Visual Representations：可引导的视觉表示",
        tag: "视觉表示",
        href: "https://arxiv.org/abs/2604.02327",
        description: "通过 early fusion 将文本注入视觉编码器层，实现可引导的视觉特征，可用于精确控制生成人物外观。",
      },
      {
        num: 7,
        title: "NearID：基于近身份干扰物的身份表示学习",
        tag: "身份保持",
        href: "https://arxiv.org/abs/2604.01973",
        description: "学习身份感知表示，在相同背景下区分相似身份，对参考人物图的外观迁移一致性有直接帮助。",
      },
      {
        num: 8,
        title: "VOID：视频对象与交互删除",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2604.02296",
        description: "物理一致的视频对象删除框架，可处理碰撞等复杂交互，可用于舞蹈视频后期编辑修复。",
      },
      {
        num: 9,
        title: "FlowSlider：无需训练的连续图像编辑",
        tag: "连续控制",
        href: "https://arxiv.org/abs/2604.02088",
        description: "将 FlowEdit 分解为 fidelity 和 steering 两项，实现平滑的强度控制，可用于舞蹈风格连续调节。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的趋势：一是「解耦」成为视频生成的核心设计思想——ActionParty 解耦全局渲染与个体控制，DynaVid 解耦运动与外观，FlowSlider 解耦保真度与编辑方向。这种模块化设计为 music-to-dance 的复杂需求（身份保持 + 动作控制 + 视觉真实）提供了可组合的技术路径。二是「隐空间」作为跨模态对齐的通用 substrate 正在形成共识，Latent Space 综述和 LatentUM 等工作表明，在共享隐空间中统一表示音频、运动、视觉信息，可能是突破当前音频-视觉对齐瓶颈的关键方向。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-04-04 | Multi-Subject Action Binding & Dynamic Video Generation Advances",
    overview: [
      "ActionParty introduces subject state tokens for precise action-subject binding in multi-agent scenes",
      "DynaVid leverages synthetic optical flow data to generate highly dynamic motions while preserving visual realism",
      "The Latent Space survey provides a systematic overview of continuous latent space modeling for audio-visual alignment"
    ],
    papers: [
      {
        num: 1,
        tag: "Multi-Subject Control",
        title: "ActionParty: Solving Action Binding with Subject State Tokens",
        description: "ActionParty addresses the action binding failure in video diffusion models for multi-subject scenarios by introducing subject state tokens—latent variables that persistently capture each subject's state. By jointly modeling state tokens and video latents with 3D RoPE-based spatial biasing, the model disentangles global frame rendering from individual action control. Evaluated on 46 multi-agent game environments in Melting Pot, ActionParty achieves precise control over up to 7 players, significantly outperforming text-only baselines. For music-to-dance tasks, this mechanism can be directly migrated: treating dancers as controllable subjects and audio beat features as action inputs, maintaining dancer identity consistency through state tokens to solve the identity confusion and action misalignment problems in multi-person dance generation.",
        keyPoints: [
          "Subject state tokens serve as persistent latent states for explicit action-subject association",
          "3D RoPE spatial biasing anchors subject tokens to specific spatial coordinates in video",
          "Validated across 46 game environments with up to 7 subjects, demonstrating strong scalability"
        ],
        href: "https://arxiv.org/abs/2604.02330",
        paperLink: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
      },
      {
        num: 2,
        tag: "Dynamic Motion Generation",
        title: "DynaVid: Highly Dynamic Video Generation via Synthetic Motion Data",
        description: "DynaVid addresses the difficulty of generating high-dynamic motions (e.g., breakdancing, rapid camera movements) by training with synthetic optical flow data rather than synthetic videos. Optical flow encodes only motion information, decoupled from appearance, avoiding the artificial look of rendered videos. The framework adopts two-stage generation: a motion generator learns dynamic motion patterns from synthetic flow, and a motion-guided video generator preserves visual realism through training on real videos. Experiments show the method outperforms existing approaches on both vigorous human motion and extreme camera motion control. For music-to-dance, this approach can be adapted: training a motion generator with synthetic dance motion data (flow or skeleton sequences), then generating realistic dance videos to address the scarcity of real dance data.",
        keyPoints: [
          "Optical flow as intermediate representation separates motion learning from appearance learning, eliminating synthetic-real domain gap",
          "Two-stage framework: motion generator learns dynamic patterns, video generator maintains visual realism",
          "Validated on challenging scenarios: breakdance generation and rapid camera motion control"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
      {
        num: 3,
        tag: "Latent Space Modeling",
        title: "The Latent Space Survey: From Mechanisms to Capabilities",
        description: "This survey systematically organizes the research landscape of continuous latent space in language models across five dimensions: Foundation, Evolution, Mechanism, Ability, and Outlook. The core insight is that compared to discrete text token space, continuous latent space can more efficiently carry cognitive capabilities like reasoning, planning, perception, and memory, avoiding linguistic redundancy, discretization bottlenecks, and semantic loss. For music-to-dance audio-visual alignment tasks, the mechanisms discussed—Representation (internal/external/learnable), Computation (compressed/expanded/adaptive), and Optimization (inference-time optimization)—provide systematic technical references for improving 3D Audio Attention's latent space design. Particularly, the Interleaved Cross-Modal Reasoning section directly relates to joint modeling of audio and visual features in latent space.",
        keyPoints: [
          "Systematically distinguishes latent space from explicit text space and visual generative model latent spaces",
          "Organizes technical landscape through four mechanism dimensions: Architecture, Representation, Computation, Optimization",
          "Covers seven capabilities including Reasoning, Planning, Modeling, Perception, Memory, providing theoretical framework for cross-modal alignment"
        ],
        href: "https://arxiv.org/abs/2604.02029",
        paperLink: "The Latent Space: Foundation, Evolution, Mechanism, Ability, and Outlook",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Generative World Renderer: G-buffer Guided Photorealistic Video Generation",
        tag: "Scene Rendering",
        href: "https://arxiv.org/abs/2604.02329",
        description: "Extracts 4M frames of G-buffer data from AAA games for geometry-material decomposition and controllable video generation, applicable for enhancing dance video scene consistency.",
      },
      {
        num: 5,
        title: "LatentUM: Unified Latent Space for Interleaved Cross-Modal Reasoning",
        tag: "Cross-Modal Unification",
        href: "https://arxiv.org/abs/2604.02097",
        description: "Represents all modalities in shared semantic latent space, eliminating pixel-space mediation, providing reference for audio-visual joint modeling.",
      },
      {
        num: 6,
        title: "Steerable Visual Representations: Guidable Visual Features",
        tag: "Visual Representation",
        href: "https://arxiv.org/abs/2604.02327",
        description: "Injects text directly into visual encoder layers via early fusion for steerable visual features, enabling precise control of generated character appearance.",
      },
      {
        num: 7,
        title: "NearID: Identity Representation via Near-Identity Distractors",
        tag: "Identity Preservation",
        href: "https://arxiv.org/abs/2604.01973",
        description: "Learns identity-aware representations to distinguish similar identities on same background, directly helpful for reference image appearance transfer consistency.",
      },
      {
        num: 8,
        title: "VOID: Video Object and Interaction Deletion",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2604.02296",
        description: "Physically consistent video object removal framework handling complex interactions like collisions, applicable for dance video post-editing and repair.",
      },
      {
        num: 9,
        title: "FlowSlider: Training-Free Continuous Image Editing",
        tag: "Continuous Control",
        href: "https://arxiv.org/abs/2604.02088",
        description: "Decomposes FlowEdit into fidelity and steering terms for smooth strength control, applicable for continuous dance style adjustment.",
      },
    ],
    observation: "Today's papers reveal two notable trends: First, 'disentanglement' has become a core design principle in video generation—ActionParty disentangles global rendering from individual control, DynaVid disentangles motion from appearance, and FlowSlider disentangles fidelity from editing direction. This modular design provides composable technical pathways for music-to-dance's complex requirements (identity preservation + motion control + visual realism). Second, 'latent space' is emerging as a consensus substrate for cross-modal alignment. The Latent Space survey and LatentUM demonstrate that unified representation of audio, motion, and visual information in shared latent space may be key to breaking through current audio-visual alignment bottlenecks.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-04`,
        'en': `/en/daily/music-to-dance/2026-04-04`,
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
      date="2026-04-04"
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
