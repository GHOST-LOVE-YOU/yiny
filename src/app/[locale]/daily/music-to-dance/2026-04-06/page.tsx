import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "运动解耦、高效推理与几何感知：视频生成的新前沿",
    overview: [
      "DynaVid提出光流-视频两阶段生成框架，运动与外观解耦设计可直接迁移到music-to-dance任务",
      "Salt的SC-DMD蒸馏技术将视频生成压缩至2-4步，KV Cache感知训练优化内存效率",
      "Generative World Renderer的G-buffer引导生成提升时间一致性和几何稳定性"
    ],
    papers: [
      {
        num: 1,
        tag: "动态运动生成",
        title: "DynaVid：基于合成运动数据的高动态视频生成",
        description: "DynaVid提出了一种光流引导的两阶段视频生成框架，核心创新在于运动与外观的解耦设计。第一阶段的运动生成器合成光流图，第二阶段的视频生成器基于光流生成RGB帧。这种解耦使得模型可以从合成数据学习高动态运动模式（如霹雳舞），同时从真实数据保持视觉真实感。论文使用Blender渲染合成运动数据，避免了合成视频的外观域差距。实验表明，该方法在高动态人体运动和极端相机运动控制场景下均显著优于Wan2.2-5B等基线模型。对于music-to-dance任务，这种架构提供了清晰的迁移路径：可将音频特征作为运动生成器的额外条件，实现音频驱动的光流生成，再基于光流生成舞蹈视频。",
        keyPoints: [
          "两阶段解耦架构：光流生成器+视频生成器，运动与外观分离",
          "合成光流数据训练：从Blender渲染获取高动态运动监督，避免合成视频的外观伪影",
          "Plücker嵌入相机控制：支持极端相机运动轨迹的精确控制",
          "迁移价值：音频条件可直接注入运动生成器，实现音频-运动对齐"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
      {
        num: 2,
        tag: "流式视频理解",
        title: "SimpleStream：流式视频理解的极简基线",
        description: "SimpleStream挑战了流式视频理解领域过度依赖复杂记忆机制的趋势。研究发现，仅将最近N帧输入现成的VLM，就能匹配或超越现有的流式模型。在OVO-Bench和StreamingBench上的评估显示，仅用4帧的滑动窗口基线分别达到67.7%和80.59%的准确率。消融实验揭示了感知-记忆的权衡：增加历史上下文可改善召回，但会削弱实时感知能力。对于music-to-dance的长视频生成，这一发现具有重要参考价值——可能不需要复杂的记忆机制，仅需维护关键帧缓存即可实现高效的长序列生成。",
        keyPoints: [
          "滑动窗口基线：仅使用最近N帧即可达到SOTA性能",
          "感知-记忆权衡：更多历史上下文不总是更好，可能降低实时感知",
          "极简设计价值：复杂记忆模块需明确证明其优于简单基线",
          "迁移价值：长舞蹈视频生成可考虑关键帧缓存替代复杂记忆机制"
        ],
        href: "https://arxiv.org/abs/2604.02317",
        paperLink: "A Simple Baseline for Streaming Video Understanding",
      },
      {
        num: 3,
        tag: "快速视频生成",
        title: "Salt：自一致分布匹配与Cache感知训练",
        description: "Salt针对视频生成模型的极低步数推理（2-4 NFEs）提出SC-DMD（自一致分布匹配蒸馏）方法。核心创新是显式正则化连续去噪更新的端点一致性，解决DMD在多步组合时的漂移问题。此外，针对自回归实时生成，论文将KV Cache视为质量参数化条件，提出Cache-分布感知训练策略，通过混合步数训练和跨步特征对齐，显著提升低步数生成质量。在Wan 2.1和Self Forcing等架构上的实验验证了方法的有效性。对于music-to-dance的实时性需求，Salt的2-4步推理能力具有直接应用价值，Cache感知训练也可用于优化3D Audio Attention的内存效率。",
        keyPoints: [
          "SC-DMD：自一致正则化解决多步去噪的漂移问题",
          "Cache感知训练：将KV Cache质量纳入训练，提升长序列稳定性",
          "混合步数训练：交替使用2/4/8步训练，增强对不同质量条件的鲁棒性",
          "迁移价值：2-4步推理满足实时舞蹈生成需求，Cache优化可降低内存开销"
        ],
        href: "https://arxiv.org/abs/2604.03118",
        paperLink: "Salt: Self-Consistent Distribution Matching with Cache-Aware Training for Fast Video Generation",
      },
      {
        num: 4,
        tag: "世界渲染",
        title: "Generative World Renderer：大规模G-buffer引导视频生成",
        description: "Generative World Renderer通过从AAA游戏提取400万帧同步G-buffer数据（深度、法线、反照率、金属度、粗糙度），解决了生成式逆渲染和正向渲染的数据瓶颈。论文提出双屏拼接采集方法，支持高分辨率G-buffer捕获。基于该数据集训练的模型在几何分解和可控生成方面显著优于现有方法。此外，论文提出VLM-based评估协议，用于无真值场景下的语义、空间和时间一致性评估。对于music-to-dance，G-buffer引导生成可用于提升舞蹈视频的时间一致性和几何稳定性，VLM评估协议也可借鉴用于舞蹈生成质量的自动评估。",
        keyPoints: [
          "大规模G-buffer数据集：400万帧来自赛博朋克2077和黑神话：悟空",
          "双屏拼接采集：实现720p/30fps的高分辨率G-buffer同步录制",
          "双向渲染能力：支持逆渲染（几何分解）和正向渲染（G-buffer到视频）",
          "迁移价值：G-buffer引导提升时序一致性，VLM评估可用于舞蹈质量自动评测"
        ],
        href: "https://arxiv.org/abs/2604.02329",
        paperLink: "Generative World Renderer",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "VOID：视频对象与交互删除的物理一致性修复",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2604.02296",
        description: "提出物理合理的视频对象删除框架，可修复对象与其他物体的碰撞交互。VLM识别受影响区域，视频扩散模型生成物理一致的反事实结果。可用于舞蹈视频后处理，去除背景干扰物同时保持舞者动作连贯性。",
      },
      {
        num: 6,
        title: "FlowSlider：免训练连续图像编辑",
        tag: "图像编辑",
        href: "https://arxiv.org/abs/2604.02088",
        description: "将FlowEdit更新分解为保真项和引导项，通过仅缩放引导项实现连续强度控制。无需训练即可实现平滑可靠的编辑控制，可用于舞蹈视频中人物外观的精细调节。",
      },
      {
        num: 7,
        title: "NearID：基于近身份干扰物的身份表示学习",
        tag: "身份保持",
        href: "https://arxiv.org/abs/2604.01973",
        description: "通过将相似身份置于相同背景构造干扰物，消除上下文捷径，学习纯粹的身份表示。双层对比学习目标将SSR从30.7%提升至99.2%。可直接用于提升music-to-dance的参考人物身份保持能力。",
      },
      {
        num: 8,
        title: "ActionParty：生成式视频游戏中的多主体动作绑定",
        tag: "多主体控制",
        href: "https://arxiv.org/abs/2604.02330",
        description: "引入主体状态token，通过空间偏置机制联合建模状态token和视频潜变量，解耦全局渲染与个体动作更新。首个支持同时控制7个玩家的视频世界模型，对多舞者场景的音乐驱动生成有借鉴价值。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Motion Decoupling, Efficient Inference & Geometry Awareness: New Frontiers in Video Generation",
    overview: [
      "DynaVid proposes a flow-video two-stage generation framework with decoupled motion-appearance design directly transferable to music-to-dance tasks",
      "Salt's SC-DMD distillation compresses video generation to 2-4 steps, with KV Cache-aware training optimizing memory efficiency",
      "Generative World Renderer's G-buffer guided generation improves temporal consistency and geometric stability"
    ],
    papers: [
      {
        num: 1,
        tag: "Dynamic Motion Generation",
        title: "DynaVid: Highly Dynamic Video Generation via Synthetic Motion Data",
        description: "DynaVid introduces an optical flow-guided two-stage video generation framework with a core innovation in decoupling motion and appearance. The motion generator synthesizes flow maps in the first stage, while the video generator produces RGB frames conditioned on flow in the second stage. This decoupling enables the model to learn high-dynamic motion patterns (e.g., breakdancing) from synthetic data while preserving visual realism from real data. The paper uses Blender-rendered synthetic motion data, avoiding the appearance domain gap of synthetic videos. Experiments demonstrate significant improvements over Wan2.2-5B baselines in both high-dynamic human motion and extreme camera motion control scenarios. For music-to-dance tasks, this architecture provides a clear migration path: audio features can be injected as additional conditions to the motion generator for audio-driven flow generation, followed by dance video generation based on flow.",
        keyPoints: [
          "Two-stage decoupled architecture: flow generator + video generator separates motion and appearance",
          "Synthetic flow data training: high-dynamic motion supervision from Blender rendering avoids synthetic video artifacts",
          "Plücker embedding camera control: precise control of extreme camera motion trajectories",
          "Transfer value: audio conditions can be directly injected into motion generator for audio-motion alignment"
        ],
        href: "https://arxiv.org/abs/2604.01666",
        paperLink: "DynaVid: Learning to Generate Highly Dynamic Videos using Synthetic Motion Data",
      },
      {
        num: 2,
        tag: "Streaming Video Understanding",
        title: "SimpleStream: A Minimal Baseline for Streaming Video Understanding",
        description: "SimpleStream challenges the trend of over-reliance on complex memory mechanisms in streaming video understanding. The study finds that simply feeding the most recent N frames to off-the-shelf VLMs can match or surpass existing streaming models. Evaluations on OVO-Bench and StreamingBench show that a sliding window baseline with only 4 frames achieves 67.7% and 80.59% accuracy respectively. Ablation studies reveal a perception-memory trade-off: more historical context improves recall but weakens real-time perception. For long video generation in music-to-dance, this finding has important reference value—complex memory mechanisms may not be necessary, and efficient keyframe caching may suffice for long sequence generation.",
        keyPoints: [
          "Sliding window baseline: using only recent N frames achieves SOTA performance",
          "Perception-memory trade-off: more historical context is not always better, may degrade real-time perception",
          "Minimal design value: complex memory modules need explicit proof of superiority over simple baselines",
          "Transfer value: long dance video generation can consider keyframe caching instead of complex memory mechanisms"
        ],
        href: "https://arxiv.org/abs/2604.02317",
        paperLink: "A Simple Baseline for Streaming Video Understanding",
      },
      {
        num: 3,
        tag: "Fast Video Generation",
        title: "Salt: Self-Consistent Distribution Matching with Cache-Aware Training",
        description: "Salt proposes SC-DMD (Self-Consistent Distribution Matching Distillation) for extremely low-step video generation (2-4 NFEs). The core innovation is explicit regularization of endpoint consistency for consecutive denoising updates, addressing the drift problem in DMD during multi-step composition. Additionally, for autoregressive real-time generation, the paper treats KV Cache as a quality-parameterized condition and proposes Cache-Distribution-Aware training, significantly improving low-step generation quality through mixed-step training and cross-step feature alignment. Experiments on Wan 2.1 and Self Forcing architectures validate the method's effectiveness. For real-time requirements in music-to-dance, Salt's 2-4 step inference capability has direct application value, and Cache-aware training can also optimize memory efficiency for 3D Audio Attention.",
        keyPoints: [
          "SC-DMD: self-consistency regularization solves drift in multi-step denoising",
          "Cache-aware training: incorporates KV Cache quality into training, improving long-sequence stability",
          "Mixed-step training: alternating 2/4/8 step training enhances robustness to varying quality conditions",
          "Transfer value: 2-4 step inference meets real-time dance generation needs, Cache optimization reduces memory overhead"
        ],
        href: "https://arxiv.org/abs/2604.03118",
        paperLink: "Salt: Self-Consistent Distribution Matching with Cache-Aware Training for Fast Video Generation",
      },
      {
        num: 4,
        tag: "World Rendering",
        title: "Generative World Renderer: Large-Scale G-buffer Guided Video Generation",
        description: "Generative World Renderer addresses the data bottleneck in generative inverse and forward rendering by extracting 4M frames of synchronized G-buffer data (depth, normals, albedo, metallic, roughness) from AAA games. The paper proposes a dual-screen stitched capture method supporting high-resolution G-buffer acquisition. Models trained on this dataset significantly outperform existing methods in geometric decomposition and controllable generation. Additionally, the paper proposes a VLM-based evaluation protocol for semantic, spatial, and temporal consistency assessment in scenarios without ground truth. For music-to-dance, G-buffer guided generation can improve temporal consistency and geometric stability in dance videos, and the VLM evaluation protocol can be adapted for automatic dance generation quality assessment.",
        keyPoints: [
          "Large-scale G-buffer dataset: 4M frames from Cyberpunk 2077 and Black Myth: Wukong",
          "Dual-screen stitched capture: enables 720p/30fps high-resolution G-buffer synchronized recording",
          "Bidirectional rendering capability: supports inverse rendering (geometric decomposition) and forward rendering (G-buffer to video)",
          "Transfer value: G-buffer guidance improves temporal consistency, VLM evaluation enables automatic dance quality assessment"
        ],
        href: "https://arxiv.org/abs/2604.02329",
        paperLink: "Generative World Renderer",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "VOID: Video Object and Interaction Deletion",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2604.02296",
        description: "Proposes a physically-plausible video object removal framework that can repair collision interactions between objects. VLM identifies affected regions, video diffusion model generates physically consistent counterfactual results. Can be used for dance video post-processing to remove background distractions while maintaining dancer motion coherence.",
      },
      {
        num: 6,
        title: "FlowSlider: Training-Free Continuous Image Editing",
        tag: "Image Editing",
        href: "https://arxiv.org/abs/2604.02088",
        description: "Decomposes FlowEdit updates into fidelity and steering terms, achieving continuous intensity control by scaling only the steering term. Enables smooth and reliable editing control without training, suitable for fine appearance adjustment of characters in dance videos.",
      },
      {
        num: 7,
        title: "NearID: Identity Representation Learning via Near-identity Distractors",
        tag: "Identity Preservation",
        href: "https://arxiv.org/abs/2604.01973",
        description: "Constructs distractors by placing similar identities on identical backgrounds, eliminating context shortcuts to learn pure identity representations. Two-tier contrastive learning objective improves SSR from 30.7% to 99.2%. Can be directly applied to improve reference subject identity preservation in music-to-dance.",
      },
      {
        num: 8,
        title: "ActionParty: Multi-Subject Action Binding in Generative Video Games",
        tag: "Multi-Subject Control",
        href: "https://arxiv.org/abs/2604.02330",
        description: "Introduces subject state tokens, jointly modeling state tokens and video latents through spatial biasing mechanism, decoupling global rendering from individual action updates. First video world model supporting simultaneous control of 7 players, providing reference value for music-driven generation in multi-dancer scenarios.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-06`,
        'en': `/en/daily/music-to-dance/2026-04-06`,
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
      date="2026-04-06"
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
