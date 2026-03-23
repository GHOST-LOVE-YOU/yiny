import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-03-22 | 运动对齐与3D一致性：视频编辑与人物定制的新范式",
    overview: [
      "SAMA提出语义锚定与运动对齐的解耦训练策略，通过视频恢复预训练任务内化时序动态",
      "MoTok将语义条件与运动学控制分离，实现紧凑token表示与精细运动控制的统一",
      "3DreamBooth的1帧优化范式为人物3D一致性保持提供了新思路",
      "VEGA-3D揭示视频生成模型中隐式3D先验的可迁移性"
    ],
    papers: [
      {
        num: 1,
        tag: "视频编辑",
        title: "SAMA：语义锚定与运动对齐的解耦视频编辑框架",
        description: "SAMA (Semantic Anchoring and Motion Alignment) 针对指令引导视频编辑中语义修改与运动保持的冲突问题，提出了一种因子化解耦训练范式。其核心洞察在于：语义编辑通常是稀疏且时序稳定的，而运动连贯性遵循可从原始视频中学习的物理时序动态。\\n\\n技术实现上，SAMA包含两个互补模块：(1) Semantic Anchoring 在稀疏锚定帧上联合预测语义token和视频latent，支持指令感知的结构规划；(2) Motion Alignment 通过三种以运动为中心的视频恢复预训练任务（Cube Inpainting、Speed Perturbation、Tube Shuffle）让模型内化时序动态。\\n\\n对于music-to-dance任务，Motion Alignment的预训练策略极具迁移价值。当前方案依赖3D Audio Attention机制对齐音频与运动，而SAMA的cube inpainting（掩码连续时序块并恢复）和tube shuffle（2×2×2时空管随机重排）技术可直接应用于音频-视觉对齐模块，提升舞蹈动作的时间一致性和对快速节拍变化的鲁棒性。实验显示，仅因子化预训练阶段即可产生强大的零样本视频编辑能力，SAMA在VIE-Bench上达到开源模型SOTA，与Kling-Omni等商业系统相当。",
        keyPoints: [
          "提出语义结构规划与时序运动建模的因子化解耦视角，减少对外部先验的依赖",
          "Motion Alignment通过视频恢复预训练任务（Cube Inpainting/Speed Perturbation/Tube Shuffle）内化时序动态",
          "两阶段训练策略：因子化预训练学习内在语义-运动表示，监督微调提升编辑保真度"
        ],
        href: "https://arxiv.org/abs/2603.19228",
        paperLink: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
      },
      {
        num: 2,
        tag: "运动生成",
        title: "MoTok：扩散式离散运动Tokenizer实现语义与运动学的统一控制",
        description: "MoTok提出了一种三阶段Perception-Planning-Control范式，解决了运动生成中语义条件与运动学控制的融合难题。现有方法要么依赖连续扩散模型（擅长运动学控制），要么使用离散token生成器（擅长语义条件），MoTok通过扩散式离散运动tokenizer结合两者优势。\\n\\n核心设计在于将运动表示因子化为紧凑离散token和基于扩散的重建。MoTok使用单层codebook生成压缩token序列，将运动恢复委托给扩散decoder。这种设计使token只需编码语义结构，无需承载细粒度运动细节，从而将token数量减少至1/6（相比MaskControl），同时提升重建质量。\\n\\n对于music-to-dance任务，MoTok的条件注入方案提供了音频-运动对齐的新思路：将音频节奏作为全局条件引导整体运动风格，将舞蹈姿态关键点作为局部条件提供细粒度控制。粗粒度约束在Planning阶段引导token生成，细粒度约束在Control阶段通过扩散优化强制执行。实验显示，在HumanML3D上轨迹误差从0.72cm降至0.08cm，FID从0.083降至0.029。",
        keyPoints: [
          "扩散式离散运动tokenizer将语义抽象与细粒度重建解耦，实现紧凑单层token表示",
          "粗到细的条件注入方案：运动学信号在Planning阶段作为粗约束，在Control阶段作为细约束",
          "统一支持离散扩散和自回归生成器，使用1/6 token量实现更低FID和轨迹误差"
        ],
        href: "https://arxiv.org/abs/2603.19227",
        paperLink: "Bridging Semantic and Kinematic Conditions with Diffusion-based Discrete Motion Tokenizer",
      },
      {
        num: 3,
        tag: "3D定制",
        title: "3DreamBooth：1帧优化范式实现高保真3D人物视频定制",
        description: "3DreamBooth针对人物驱动视频生成中的3D一致性问题，提出了一种创新的1帧优化范式。现有方法主要将人物视为2D实体，依赖单视图视觉特征或文本提示迁移身份，缺乏重建3D几何所需的空间先验。\\n\\n核心洞察在于：物体身份主要是空间属性，可通过单帧训练内化，而无需完整的视频序列。当视频扩散模型的输入限制为单帧(T=1)时，时序注意力机制被自然绕过，所有梯度更新仅作用于空间表示，不会破坏预训练的时序动态。在推理阶段，这些未触及的时序机制自然提取并驱动学习到的身份的时间流，实现平滑的视角一致视频生成。\\n\\n3DreamBooth通过LoRA在单帧视频上优化，将多视图几何变化内化到标识token V中。为克服文本驱动的信息瓶颈，引入3Dapter多视图条件模块，通过双分支架构直接注入参考图像的空间特征。对于music-to-dance，这种3D感知的人物定制方法可直接应用于参考人物图的3D一致性保持，解决当前方案中人物外观随视角漂移的问题。",
        keyPoints: [
          "1帧训练范式将空间几何与时序运动解耦，自然绕过时序注意力，专注空间表示学习",
          "利用预训练视频模型的隐式3D先验，通过多视图DreamBooth训练将3D身份内化到token",
          "3Dapter视觉条件模块通过双分支架构注入多视图空间特征，加速收敛并保留高频细节"
        ],
        href: "https://arxiv.org/abs/2603.18524",
        paperLink: "3DreamBooth: High-Fidelity 3D Subject-Driven Video Generation Model",
      },
      {
        num: 4,
        tag: "3D理解",
        title: "VEGA-3D：释放视频生成模型中的隐式3D先验",
        description: "VEGA-3D探索了一个新范式：利用视频生成模型学习到的表示作为几何理解的先验。多模态大语言模型(MLLMs)常表现出空间盲，难以进行细粒度几何推理。现有方案依赖显式3D模态或复杂几何支架，受限于数据稀缺和泛化挑战。\\n\\n核心发现是：视频扩散模型为合成时序一致视频，已内隐学习鲁棒的3D结构先验和物理规律。VEGA-3D将预训练视频扩散模型重新定位为Latent World Simulator，通过从中等噪声水平的中间表示中提取时空特征， enrich MLLMs的几何感知能力。关键设计是token级自适应门控融合机制，解决生成空间与语义空间之间的分布偏移。\\n\\n对于music-to-dance任务，这一发现具有重要启示：视频生成模型中的隐式3D先验可用于增强人物舞蹈过程中的空间一致性。当前方案依赖显式姿态估计，而VEGA-3D表明可从视频扩散模型的中间层提取几何一致的3D结构，为不依赖显式姿态估计的3D感知舞蹈生成提供了可能路径。实验显示，在3D场景理解基准上显著优于现有方法。",
        keyPoints: [
          "视频生成模型为合成时序一致视频内隐学习鲁棒的3D结构先验和物理规律",
          "将视频扩散模型重新定位为Latent World Simulator，提取中间噪声水平的时空特征",
          "token级自适应门控融合机制对齐生成特征与语义特征，增强几何敏感推理"
        ],
        href: "https://arxiv.org/abs/2603.19235",
        paperLink: "Generation Models Know Space: Unleashing Implicit 3D Priors for Scene Understanding",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "CubiD：高维表示token上的离散视觉生成",
        tag: "离散生成",
        href: "https://arxiv.org/abs/2603.19232",
        description: "首个高维表示(768-1024维)离散生成模型，通过细粒度掩码实现统一的多模态token预测范式，可为music-to-dance的音频-视觉融合提供参考。",
      },
      {
        num: 6,
        title: "MonoArt：单目关节物体3D重建的渐进结构推理",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2603.19231",
        description: "渐进式结构推理框架将视觉观察转化为规范几何、结构化部件表示和运动感知嵌入，对人物姿态估计和身体部位建模有借鉴价值。",
      },
      {
        num: 7,
        title: "STTS：统一时空token评分实现高效视频VLM",
        tag: "效率优化",
        href: "https://arxiv.org/abs/2603.18004",
        description: "时空token评分模块在ViT和LLM之间统一剪枝50%视觉token，训练推理效率提升62%，可应用于music-to-dance长视频生成加速。",
      },
    ],
    observation: "本周论文呈现出解耦与先验利用两大主题。SAMA、MoTok、3DreamBooth均采用了某种形式的解耦策略——语义/运动、token空间/连续空间、空间/时序——通过分离不同性质的变化因素，实现更精细的控制和更高的训练效率。与此同时，VEGA-3D揭示了预训练视频模型中隐式3D先验的可迁移性，提示music-to-dance领域可以更多地挖掘现有基础模型的内在能力，而非过度依赖显式监督信号。这两条线索的交汇点在于：如何设计巧妙的训练策略和解耦架构，以释放预训练模型中尚未被充分利用的结构化先验。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-03-22 | Motion Alignment & 3D Consistency: New Paradigms for Video Editing and Subject Customization",
    overview: [
      "SAMA proposes decoupled training of semantic anchoring and motion alignment, internalizing temporal dynamics via video restoration pretraining",
      "MoTok separates semantic conditioning from kinematic control, unifying compact token representation with fine-grained motion control",
      "3DreamBooth's 1-frame optimization paradigm offers new insights for maintaining 3D consistency in subject customization",
      "VEGA-3D reveals the transferability of implicit 3D priors in video generation models"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Editing",
        title: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Video Editing",
        description: "SAMA addresses the conflict between semantic modification and motion preservation in instruction-guided video editing through a factorized decoupling paradigm. The core insight is that semantic edits are typically sparse and temporally stable, while motion coherence follows physical temporal dynamics learnable from raw videos.\\n\\nTechnically, SAMA comprises two complementary modules: (1) Semantic Anchoring jointly predicts semantic tokens and video latents on sparse anchor frames; (2) Motion Alignment internalizes temporal dynamics through three motion-centric video restoration pretext tasks (Cube Inpainting, Speed Perturbation, Tube Shuffle).\\n\\nFor music-to-dance tasks, Motion Alignment's pretraining strategy is highly transferable. Current approaches rely on 3D Audio Attention for audio-motion alignment, while SAMA's cube inpainting and tube shuffle techniques can be directly applied to audio-visual alignment modules to improve temporal consistency and robustness to fast beat variations. Experiments show SAMA achieves SOTA among open-source models on VIE-Bench, competitive with commercial systems like Kling-Omni.",
        keyPoints: [
          "Proposes factorized decoupling of semantic structure planning and temporal motion modeling",
          "Motion Alignment internalizes temporal dynamics via video restoration pretraining tasks",
          "Two-stage training: factorized pretraining learns inherent representations, SFT improves fidelity"
        ],
        href: "https://arxiv.org/abs/2603.19228",
        paperLink: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
      },
      {
        num: 2,
        tag: "Motion Generation",
        title: "MoTok: Diffusion-based Discrete Motion Tokenizer Unifying Semantic and Kinematic Control",
        description: "MoTok proposes a three-stage Perception-Planning-Control paradigm addressing the fusion challenge of semantic conditioning and kinematic control in motion generation. Existing methods rely on either continuous diffusion (good at kinematic control) or discrete token generators (good at semantic conditioning); MoTok combines both strengths through a diffusion-based discrete motion tokenizer.\\n\\nThe core design factorizes motion representation into compact discrete tokens and diffusion-based reconstruction. MoTok uses a single-layer codebook to generate compressed token sequences, delegating motion recovery to a diffusion decoder. This reduces token count to 1/6 (vs. MaskControl) while improving reconstruction quality.\\n\\nFor music-to-dance, MoTok's conditioning scheme offers new insights: audio rhythm as global condition guiding overall motion style, dance pose keypoints as local conditions providing fine-grained control. Coarse constraints guide token generation in Planning, fine-grained constraints enforced during Control via diffusion optimization. Experiments show trajectory error reduced from 0.72cm to 0.08cm, FID from 0.083 to 0.029 on HumanML3D.",
        keyPoints: [
          "Diffusion-based discrete motion tokenizer decouples semantic abstraction from fine-grained reconstruction",
          "Coarse-to-fine conditioning: kinematic signals as coarse constraints in Planning, fine constraints in Control",
          "Unified support for discrete diffusion and autoregressive generators with 1/6 tokens and lower FID"
        ],
        href: "https://arxiv.org/abs/2603.19227",
        paperLink: "Bridging Semantic and Kinematic Conditions with Diffusion-based Discrete Motion Tokenizer",
      },
      {
        num: 3,
        tag: "3D Customization",
        title: "3DreamBooth: 1-Frame Optimization for High-Fidelity 3D Subject Video Customization",
        description: "3DreamBooth addresses 3D consistency in subject-driven video generation through an innovative 1-frame optimization paradigm. Existing methods treat subjects as 2D entities, lacking spatial priors needed for 3D geometry reconstruction.\\n\\nThe core insight: object identity is primarily a spatial attribute that can be internalized through single-frame training without full video sequences. When video diffusion model inputs are restricted to single frames (T=1), temporal attention is naturally bypassed, all gradient updates focus on spatial representations without disrupting pretrained temporal dynamics. During inference, untouched temporal mechanisms naturally extract and drive the learned identity's temporal flow.\\n\\n3DreamBooth optimizes via LoRA on single-frame videos, internalizing multi-view geometric variations into identifier token V. To overcome the text-driven information bottleneck, 3Dapter multi-view conditioning module is introduced. For music-to-dance, this 3D-aware subject customization can be directly applied to maintain 3D consistency of reference person images, solving appearance drift issues.",
        keyPoints: [
          "1-frame training decouples spatial geometry from temporal motion, naturally bypassing temporal attention",
          "Leverages implicit 3D priors in pretrained video models via multi-view DreamBooth training",
          "3Dapter visual conditioning module injects multi-view spatial features via dual-branch architecture"
        ],
        href: "https://arxiv.org/abs/2603.18524",
        paperLink: "3DreamBooth: High-Fidelity 3D Subject-Driven Video Generation Model",
      },
      {
        num: 4,
        tag: "3D Understanding",
        title: "VEGA-3D: Unleashing Implicit 3D Priors from Video Generation Models",
        description: "VEGA-3D explores a new paradigm: using representations learned by video generation models as priors for geometric understanding. Multimodal LLMs often exhibit 'spatial blindness' in fine-grained geometric reasoning. Existing solutions rely on explicit 3D modalities or complex geometric scaffolding, limited by data scarcity.\\n\\nThe key finding: video diffusion models implicitly learn robust 3D structural priors and physical laws for synthesizing temporally coherent videos. VEGA-3D repurposes pretrained video diffusion models as Latent World Simulators, extracting spatiotemporal features from intermediate representations at medium noise levels. The key design is a token-level adaptive gated fusion mechanism addressing distribution shift between generative and semantic spaces.\\n\\nFor music-to-dance, this finding is significant: implicit 3D priors in video generation models can enhance spatial consistency during dancing. Current approaches rely on explicit pose estimation, while VEGA-3D suggests geometry-consistent 3D structures can be extracted from intermediate layers of video diffusion models, offering a path for pose-free 3D-aware dance generation.",
        keyPoints: [
          "Video generation models implicitly learn robust 3D structural priors for temporal coherence",
          "Repurposes video diffusion models as Latent World Simulators, extracting intermediate features",
          "Token-level adaptive gated fusion aligns generative and semantic features for geometry-aware reasoning"
        ],
        href: "https://arxiv.org/abs/2603.19235",
        paperLink: "Generation Models Know Space: Unleashing Implicit 3D Priors for Scene Understanding",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "CubiD: Discrete Visual Generation on High-Dimensional Representation Tokens",
        tag: "Discrete Generation",
        href: "https://arxiv.org/abs/2603.19232",
        description: "First discrete generation model for high-dimensional (768-1024 dim) representations via fine-grained masking, offering reference for unified audio-visual token prediction in music-to-dance.",
      },
      {
        num: 6,
        title: "MonoArt: Progressive Structural Reasoning for Monocular Articulated 3D Reconstruction",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2603.19231",
        description: "Progressive structural reasoning framework transforming visual observations into canonical geometry and motion-aware embeddings, valuable for human pose estimation and body part modeling.",
      },
      {
        num: 7,
        title: "STTS: Unified Spatio-Temporal Token Scoring for Efficient Video VLMs",
        tag: "Efficiency",
        href: "https://arxiv.org/abs/2603.18004",
        description: "Spatio-temporal token scoring module prunes 50% vision tokens across ViT and LLM, achieving 62% efficiency improvement applicable to music-to-dance long video generation acceleration.",
      },
    ],
    observation: "This week's papers reveal two major themes: decoupling and prior exploitation. SAMA, MoTok, and 3DreamBooth all employ some form of decoupling strategy—semantic/motion, token space/continuous space, spatial/temporal—enabling finer control and higher training efficiency by separating factors of variation. Meanwhile, VEGA-3D reveals the transferability of implicit 3D priors in pretrained video models, suggesting the music-to-dance field could better exploit existing foundation models' intrinsic capabilities rather than over-relying on explicit supervision. The intersection of these threads lies in designing clever training strategies and decoupled architectures to unlock structured priors not yet fully utilized in pretrained models.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-22`,
        'en': `/en/daily/music-to-dance/2026-03-22`,
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
      date="2026-03-22"
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
