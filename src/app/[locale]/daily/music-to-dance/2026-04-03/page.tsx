import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-04-03 | 动作绑定、动态运动生成与连续编辑控制",
    overview: [
      "ActionParty 提出 subject state tokens 机制，实现多主体动作绑定，可直接迁移到舞蹈生成的人物身份保持与动作控制",
      "DynaVid 利用合成光流数据学习高动态运动，两阶段生成框架（运动→视频）与当前扩散模型方案高度契合",
      "FlowSlider 的 fidelity-steering 分解为舞蹈强度/风格的连续可控调节提供了新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "多主体控制",
        title: "ActionParty：基于 Subject State Tokens 的多主体动作绑定世界模型",
        description: "ActionParty 针对视频扩散模型中的动作绑定问题，提出了 subject state tokens 机制——一组持续捕获场景中每个主体状态的隐变量。通过空间偏置机制联合建模 state tokens 和视频隐变量，将全局视频帧渲染与个体动作控制解耦。在 Melting Pot 基准的 46 个多智能体游戏环境中，ActionParty 实现了对最多 7 个玩家的精确控制，动作跟随准确率达 77.9%，主体保持率 90.3%。对于 music-to-dance 任务，subject state tokens 可直接用于解耦人物身份保持与舞蹈动作控制，解决多人物场景下的动作绑定难题。",
        keyPoints: [
          "Subject state tokens：通过 2D 坐标表示主体状态，使用注意力掩码强制动作-主体对应关系",
          "3D RoPE 偏置：将主体 token 偏置到视频中的空间坐标，实现可靠的主体定位",
          "Update-and-render 范式：自注意力层渲染视频帧，交叉注意力层更新主体状态"
        ],
        href: "https://arxiv.org/abs/2604.02330",
        paperLink: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
      },
      {
        num: 2,
        tag: "高动态运动",
        title: "DynaVid：基于合成光流数据的高动态视频生成",
        description: "DynaVid 针对视频扩散模型难以生成高动态运动的问题，提出利用计算机图形学渲染的光流作为合成运动数据。光流仅编码运动信息、与外观解耦，避免了合成视频的人工外观问题。框架采用两阶段生成：运动生成器首先合成光流，运动引导视频生成器再基于光流生成 RGB 帧。在霹雳舞等高动态人体运动和极端相机运动控制场景中，DynaVid 相比 Wan2.2-5B 等基线显著提升了运动真实感和可控性。该框架可直接应用于舞蹈动作生成，光流作为中间表示可提供精确的运动控制信号。",
        keyPoints: [
          "合成光流数据：利用 Blender Cycles 渲染动态人体和相机运动的光流，提供精确控制信号",
          "两阶段解耦生成：运动生成器学习动态模式，视频生成器保持真实外观",
          "VACE 控制分支：通过 Plücker 嵌入实现相机轨迹的显式控制"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
      {
        num: 3,
        tag: "连续编辑",
        title: "FlowSlider：基于 Fidelity-Steering 分解的免训练连续图像编辑",
        description: "FlowSlider 针对连续图像编辑中编辑强度控制的难题，将 FlowEdit 的更新分解为 fidelity 项（保持身份和结构的源条件稳定器）和 steering 项（驱动语义转换）。几何分析和实证测量表明这两项近似正交，通过仅缩放 steering 项即可实现稳定的强度控制。在 FLUX.1-dev 和 SD3 Medium 上的实验表明，FlowSlider 在保持源图像保真度的同时实现了平滑可靠的连续编辑。对于 music-to-dance 任务，这种 fidelity-steering 分解思想可迁移到视频编辑场景，用于实现舞蹈强度/风格的连续可控调节。",
        keyPoints: [
          "Fidelity-steering 分解：V∆ = Vfid + Vsteer，精确分离源条件稳定与语义驱动",
          "正交性保证：两项夹角集中在 90° 附近，缩放 steering 项对 fidelity 影响有限",
          "免训练即插即用：无需后训练或优化，直接应用于任意提示词对的连续编辑"
        ],
        href: "https://arxiv.org/abs/2604.02088",
        paperLink: "FlowSlider: Training-Free Continuous Image Editing via Fidelity-Steering Decomposition",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Generative World Renderer：基于 G-buffer 的高保真视频生成",
        tag: "渲染",
        href: "https://arxiv.org/abs/2604.02329",
        description: "从 3A 游戏提取 400 万帧同步 RGB 和 G-buffer 数据，支持几何材质分解和 G-buffer 引导的视频生成，可为舞蹈视频提供高质量训练数据和几何一致性约束。",
      },
      {
        num: 5,
        title: "Steerable Visual Representations：可引导的视觉表征",
        tag: "表征学习",
        href: "https://arxiv.org/abs/2604.02327",
        description: "通过早期融合将文本直接注入视觉编码器层，实现可用自然语言引导的全局和局部视觉特征，可提升舞蹈生成中参考人物图的特征提取精度。",
      },
      {
        num: 6,
        title: "NearID：基于近身份干扰物的身份表征学习",
        tag: "身份保持",
        href: "https://arxiv.org/abs/2604.01973",
        description: "提出 NearID 干扰物原则，通过对比学习解耦身份与背景，在 DreamBench++ 上实现 99.2% 的样本成功率，可用于提升外观迁移中的身份保持鲁棒性。",
      },
      {
        num: 7,
        title: "VOID：视频对象与交互删除",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2604.02296",
        description: "针对视频中对象删除后的物理交互修正问题，利用 VLM 识别受影响区域并引导扩散模型生成物理一致的结果，可用于舞蹈视频后处理中的背景元素移除。",
      },
      {
        num: 8,
        title: "SimpleStream：流式视频理解的简单基线",
        tag: "流式理解",
        href: "https://arxiv.org/abs/2604.02317",
        description: "发现仅使用最近 N 帧的滑动窗口基线即可匹敌复杂记忆机制，对长舞蹈视频的实时处理有参考价值，可平衡时序一致性与计算效率。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的趋势：一是显式状态建模（ActionParty 的 subject state tokens）正在成为多主体视频生成的关键机制，这与 music-to-dance 中人物身份保持与动作控制解耦的需求高度契合；二是合成数据（DynaVid 的光流、Generative World Renderer 的 G-buffer）在弥补真实数据不足方面发挥越来越重要的作用，为舞蹈这类需要精确运动控制的场景提供了可扩展的解决方案。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-04-03 | Action Binding, Dynamic Motion Generation & Continuous Editing Control",
    overview: [
      "ActionParty proposes subject state tokens for multi-subject action binding, directly applicable to identity preservation and motion control in dance generation",
      "DynaVid leverages synthetic optical flow data for highly dynamic motion, with a two-stage framework (motion→video) highly compatible with current diffusion-based approaches",
      "FlowSlider's fidelity-steering decomposition provides new insights for continuously controllable dance intensity/style adjustment"
    ],
    papers: [
      {
        num: 1,
        tag: "Multi-Subject Control",
        title: "ActionParty: Multi-Subject Action Binding via Subject State Tokens",
        description: "ActionParty addresses the action binding problem in video diffusion models by introducing subject state tokens—latent variables that persistently capture each subject's state. Through spatial biasing mechanisms that jointly model state tokens and video latents, it disentangles global frame rendering from individual action control. On the Melting Pot benchmark across 46 multi-agent game environments, ActionParty achieves precise control of up to 7 players with 77.9% action-following accuracy and 90.3% subject preservation. For music-to-dance tasks, subject state tokens can directly decouple identity preservation from dance motion control, solving action binding challenges in multi-person scenarios.",
        keyPoints: [
          "Subject state tokens: Represent subject state via 2D coordinates, using attention masks to enforce action-subject correspondence",
          "3D RoPE biasing: Bias subject tokens to spatial coordinates in video for reliable subject localization",
          "Update-and-render paradigm: Self-attention layers render video frames, cross-attention layers update subject states"
        ],
        href: "https://arxiv.org/abs/2604.02330",
        paperLink: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
      },
      {
        num: 2,
        tag: "Dynamic Motion",
        title: "DynaVid: Highly Dynamic Video Generation via Synthetic Motion Data",
        description: "DynaVid addresses the challenge of generating highly dynamic motion in video diffusion models by leveraging optical flow rendered from computer graphics as synthetic motion data. Optical flow encodes only motion information, decoupled from appearance, avoiding the artificial look of synthetic videos. The framework adopts two-stage generation: a motion generator first synthesizes optical flow, then a motion-guided video generator produces RGB frames conditioned on the flow. In scenarios like breakdancing and extreme camera motion control, DynaVid significantly improves motion realism and controllability compared to baselines like Wan2.2-5B. This framework can be directly applied to dance motion generation, with optical flow as an intermediate representation providing precise motion control signals.",
        keyPoints: [
          "Synthetic optical flow data: Use Blender Cycles to render optical flow for dynamic human and camera motion, providing precise control signals",
          "Two-stage decoupled generation: Motion generator learns dynamic patterns, video generator maintains realistic appearance",
          "VACE control branch: Explicit camera trajectory control via Plücker embeddings"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
      {
        num: 3,
        tag: "Continuous Editing",
        title: "FlowSlider: Training-Free Continuous Editing via Fidelity-Steering Decomposition",
        description: "FlowSlider addresses continuous image editing by decomposing FlowEdit's update into a fidelity term (source-conditioned stabilizer preserving identity and structure) and a steering term (driving semantic transition). Geometric analysis and empirical measurements show these terms are approximately orthogonal, enabling stable strength control by scaling only the steering term. Experiments on FLUX.1-dev and SD3 Medium demonstrate smooth and reliable continuous editing while preserving source fidelity. For music-to-dance tasks, this fidelity-steering decomposition can be transferred to video editing scenarios for continuously controllable dance intensity/style adjustment.",
        keyPoints: [
          "Fidelity-steering decomposition: V∆ = Vfid + Vsteer, precisely separating source-conditioned stabilization from semantic driving",
          "Orthogonality guarantee: Angle between terms concentrates near 90°, scaling steering has limited impact on fidelity",
          "Training-free plug-and-play: No post-training or optimization needed, directly applicable to any prompt pair for continuous editing"
        ],
        href: "https://arxiv.org/abs/2604.02088",
        paperLink: "FlowSlider: Training-Free Continuous Image Editing via Fidelity-Steering Decomposition",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Generative World Renderer: G-buffer Guided High-Fidelity Video Generation",
        tag: "Rendering",
        href: "https://arxiv.org/abs/2604.02329",
        description: "Extracts 4M synchronized RGB and G-buffer frames from AAA games, supporting geometry-material decomposition and G-buffer guided video generation, providing high-quality training data and geometric consistency constraints for dance videos.",
      },
      {
        num: 5,
        title: "Steerable Visual Representations: Language-Guided Visual Features",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2604.02327",
        description: "Injects text directly into visual encoder layers via early fusion, enabling global and local visual features steerable by natural language, improving feature extraction precision for reference person images in dance generation.",
      },
      {
        num: 6,
        title: "NearID: Identity Representation Learning via Near-Identity Distractors",
        tag: "Identity Preservation",
        href: "https://arxiv.org/abs/2604.01973",
        description: "Proposes NearID distractor principle to decouple identity from background via contrastive learning, achieving 99.2% sample success rate on DreamBench++, applicable for improving identity preservation robustness in appearance transfer.",
      },
      {
        num: 7,
        title: "VOID: Video Object and Interaction Deletion",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2604.02296",
        description: "Addresses physical interaction correction after object removal in videos, using VLM to identify affected regions and guide diffusion models for physically consistent results, applicable for background element removal in dance video post-processing.",
      },
      {
        num: 8,
        title: "SimpleStream: A Simple Baseline for Streaming Video Understanding",
        tag: "Streaming Understanding",
        href: "https://arxiv.org/abs/2604.02317",
        description: "Finds that a sliding-window baseline using only recent N frames can match complex memory mechanisms, providing reference for real-time processing of long dance videos, balancing temporal consistency and computational efficiency.",
      },
    ],
    observation: "Today's papers reveal two notable trends: first, explicit state modeling (ActionParty's subject state tokens) is becoming a key mechanism for multi-subject video generation, highly aligned with the need to decouple identity preservation from motion control in music-to-dance; second, synthetic data (DynaVid's optical flow, Generative World Renderer's G-buffer) plays an increasingly important role in compensating for real data scarcity, providing scalable solutions for scenarios like dance that require precise motion control.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-03`,
        'en': `/en/daily/music-to-dance/2026-04-03`,
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
      date="2026-04-03"
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