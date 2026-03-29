import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-03-28 | 流式多镜头生成与音频-视觉控制新进展",
    overview: [
      "ShotStream 提出因果多镜头架构，实现流式提示交互与16 FPS实时生成",
      "AVControl 构建模块化音频-视觉控制框架，每个控制模态仅需数百步训练",
      "PackForcing 通过三分区KV缓存策略，实现24倍时长外推的分钟级视频生成"
    ],
    papers: [
      {
        num: 1,
        tag: "视频生成",
        title: "ShotStream: 流式多镜头视频生成的因果架构",
        description: "ShotStream 将多镜头视频生成重新定义为下一镜头预测任务，通过双向教师模型蒸馏为4步因果学生模型，实现流式提示交互。其核心创新包括：双缓存记忆机制（全局上下文缓存保持镜头间一致性，局部缓存保持镜头内连续性）配合 RoPE 不连续指示器消除歧义；两阶段渐进蒸馏策略（先进行基于真值历史的镜头内自强制，再过渡到基于自生成历史的镜头间自强制），有效缓解自回归生成的误差累积问题。在单张 H200 GPU 上达到16 FPS，生成405帧多镜头视频仅需亚秒级延迟。",
        keyPoints: [
          "因果多镜头架构支持运行时流式提示输入，用户可动态调整叙事内容",
          "双缓存机制通过全局/局部分离确保镜头间与镜头内一致性",
          "两阶段蒸馏有效弥合训练-测试差距，支持长程多镜头生成"
        ],
        href: "https://arxiv.org/abs/2603.25746",
        paperLink: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
      },
      {
        num: 2,
        tag: "音频-视觉控制",
        title: "AVControl: 基于并行画布的模块化音视频控制框架",
        description: "AVControl 在 LTX-2 联合音视频基础模型上构建轻量级可扩展控制框架，每个控制模态作为独立 LoRA 在并行画布上训练。与通道拼接方法不同，参考信号通过自注意力层作为额外 token 处理，参考 token 分配 clean timestep (t=0) 而生成 token 携带当前噪声水平，使模型无需修改位置编码即可区分两者。支持深度、姿态、边缘等空间对齐控制，相机轨迹、稀疏运动控制，以及首个模块化音频-视觉控制（说话人定位、音频强度→波形、哼唱生成）。每个模态仅需数百至数千步训练，全部13个模态总训练量仅约55K步。",
        keyPoints: [
          "并行画布注意力机制支持细粒度参考权重调制，可全局或局部控制参考影响强度",
          "每模态独立 LoRA 训练，添加新控制无需重新训练已有模态",
          "小到大控制网格策略降低稀疏模态的推理延迟"
        ],
        href: "https://arxiv.org/abs/2603.24793",
        paperLink: "AVControl: Efficient Framework for Training Audio-Visual Controls",
      },
      {
        num: 3,
        tag: "长视频生成",
        title: "PackForcing: 短视频训练实现分钟级长视频采样",
        description: "PackForcing 提出三分区 KV 缓存策略解决自回归视频生成的误差累积与内存瓶颈：Sink token 保持早期锚点帧全分辨率以维持全局语义；Mid token 通过双分支网络（渐进3D卷积+低分辨率VAE重编码）实现128倍时空体积压缩；Recent token 保持全分辨率确保局部时序一致性。动态 top-k 上下文选择机制仅保留最信息丰富的中间 token，配合连续 Temporal RoPE Adjustment 无缝重对齐被丢弃 token 导致的位置间隙。在 H200 上单卡生成2分钟832×480视频达16 FPS，KV缓存严格限制在4GB，实现24倍时长外推（5秒→120秒）。",
        keyPoints: [
          "三分区设计将注意力复杂度与视频长度解耦，实现O(1)注意力成本",
          "双分支压缩模块实现约32倍 token 减少，有效内存容量提升27倍",
          "仅5秒片段训练即可实现高质量长视频生成，打破训练-推理长度差距"
        ],
        href: "https://arxiv.org/abs/2603.25730",
        paperLink: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
      },
      {
        num: 4,
        tag: "扩散模型优化",
        title: "Calibri: 参数高效扩散 Transformer 校准方法",
        description: "Calibri 发现扩散 Transformer 的块贡献高度不均匀，禁用某些块反而可能提升生成质量，且每个块存在最优输出缩放系数。基于此，提出仅优化约100个参数的校准方法：将每个 DiT 块的输出乘以学习得到的标量系数，使用 CMA-ES 进化策略求解黑盒奖励优化问题。实验表明，尽管设计轻量，Calibri 在多种文本到图像模型上持续提升性能，同时减少生成所需的推理步数。该方法无需反向传播，可直接应用于预训练模型，为扩散模型后训练优化提供了高效新范式。",
        keyPoints: [
          "仅修改约100个参数即可显著提升生成质量并减少推理步数",
          "基于进化策略的黑盒优化无需梯度计算，适用于任意奖励模型",
          "揭示 DiT 架构块贡献不均匀性，某些块可能引入有害伪影"
        ],
        href: "https://arxiv.org/abs/2603.24800",
        paperLink: "Calibri: Enhancing Diffusion Transformers via Parameter-Efficient Calibration",
      },
      {
        num: 5,
        tag: "表情编辑",
        title: "PixelSmile: 细粒度面部表情编辑的连续控制方法",
        description: "PixelSmile 针对面部表情编辑中的语义重叠问题（如 fear vs surprise、anger vs disgust），构建 Flex Facial Expression (FFE) 数据集，用12维连续情感分数分布替代离散标签。提出全对称联合训练框架：对易混淆表情对进行对比学习，通过 flow matching 损失实现强度对齐，配合身份保持损失确保编辑一致性。推理阶段通过文本潜在空间插值实现无需参考图像的连续强度控制。实验证明该方法在结构混淆、编辑精度、线性可控性和身份保持方面均优于现有方法，支持12种表情类别和无缝表情混合。",
        keyPoints: [
          "连续情感标注替代 one-hot 标签，解决表情语义流形上的固有重叠",
          "对称训练框架通过正负样本角色互换增强易混淆表情的解耦",
          "文本潜在插值机制实现无需参考图像的连续强度控制"
        ],
        href: "https://arxiv.org/abs/2603.25728",
        paperLink: "PixelSmile: Toward Fine-Grained Facial Expression Editing",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "MACRO: 结构化长上下文数据的多参考图像生成",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2603.25319",
        description: "提出 MacroData 数据集（40万样本，每样本最多10张参考图）和 MacroBench 基准，通过跨任务协同训练提升多参考生成的一致性和长上下文处理能力。",
      },
      {
        num: 7,
        title: "LGTM: 4K前馈纹理化高斯 Splatting",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2603.25745",
        description: "通过预测紧凑高斯基元配合每基元纹理，将几何复杂度与渲染分辨率解耦，实现无需逐场景优化的4K高保真新视角合成。",
      },
      {
        num: 8,
        title: "Hybrid Memory: 动态视频世界模型的混合记忆机制",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2603.25716",
        description: "提出同时作为静态背景档案员和动态主体追踪器的混合记忆范式，解决主体离开视野后重新出现时的运动连续性问题。",
      },
      {
        num: 9,
        title: "PhyGenesis: 挑战性轨迹下的物理一致驾驶视频世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2603.24506",
        description: "通过物理条件生成器将无效轨迹输入转换为物理合理条件，结合物理增强视频生成器，在极端条件下生成高保真多视角驾驶视频。",
      },
      {
        num: 10,
        title: "MegaFlow: 零样本大位移光流估计",
        tag: "运动估计",
        href: "https://arxiv.org/abs/2603.25739",
        description: "利用预训练全局 ViT 特征将光流估计重新定义为全局匹配问题，在多个光流基准上实现零样本 SOTA 性能。",
      },
      {
        num: 11,
        title: "YingMusic-Singer: 可控歌声合成与无标注旋律引导",
        tag: "音频生成",
        href: "https://arxiv.org/abs/2603.24589",
        description: "全扩散模型实现旋律可控歌声合成，支持灵活歌词修改，无需人工对齐，通过课程学习和 GRPO 训练提升旋律保持和歌词遵循。",
      },
      {
        num: 12,
        title: "Persistent Robot World Models: 强化学习稳定多步展开",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2603.25685",
        description: "通过对比 RL 目标在模型自身自回归展开上训练世界模型，设计多候选未来比较协议和高效多视角视觉保真奖励，显著减少长程展开误差累积。",
      },
    ],
    observation: "今日论文呈现出自回归视频生成范式的加速成熟：ShotStream、PackForcing 和 Persistent Robot World Models 从不同角度解决长程生成的误差累积问题——分别通过渐进蒸馏、分层 KV 缓存和强化学习后训练。与此同时，AVControl 展示了模块化控制框架在联合音视频生成中的高效性，为 music-to-dance 的音频驱动控制提供了可直接迁移的技术路径。值得关注的趋势是，参数高效微调（LoRA）与黑盒优化（Calibri）正在成为扩散模型后训练的主流范式，大幅降低新能力添加的成本。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-03-28 | Streaming Multi-Shot Generation & Audio-Visual Control Advances",
    overview: [
      "ShotStream proposes causal multi-shot architecture enabling streaming prompt interaction at 16 FPS",
      "AVControl builds modular audio-visual control framework with only hundreds of steps per modality",
      "PackForcing achieves minute-level video generation via three-partition KV cache with 24× temporal extrapolation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Generation",
        title: "ShotStream: Causal Architecture for Streaming Multi-Shot Video Generation",
        description: "ShotStream reformulates multi-shot video generation as next-shot prediction, distilling a bidirectional teacher into a 4-step causal student for streaming prompt interaction. Key innovations include: dual-cache memory mechanism (global context cache for inter-shot consistency, local cache for intra-shot continuity) with RoPE discontinuity indicator to eliminate ambiguity; two-stage progressive distillation (intra-shot self-forcing with ground-truth history first, then inter-shot self-forcing with self-generated history) effectively mitigating error accumulation. Achieves 16 FPS on single H200 GPU with sub-second latency for 405-frame multi-shot videos.",
        keyPoints: [
          "Causal multi-shot architecture supports runtime streaming prompts for dynamic narrative adjustment",
          "Dual-cache mechanism ensures both inter-shot and intra-shot consistency through global/local separation",
          "Two-stage distillation bridges train-test gap for robust long-horizon multi-shot generation"
        ],
        href: "https://arxiv.org/abs/2603.25746",
        paperLink: "ShotStream: Streaming Multi-Shot Video Generation for Interactive Storytelling",
      },
      {
        num: 2,
        tag: "Audio-Visual Control",
        title: "AVControl: Modular Audio-Visual Control Framework via Parallel Canvas",
        description: "AVControl builds on LTX-2 joint audio-visual foundation model with lightweight, extensible framework where each control modality trains as separate LoRA on parallel canvas. Unlike channel concatenation, reference signals process as additional tokens in self-attention layers—reference tokens get clean timestep (t=0) while generation tokens carry current noise level, allowing inherent distinction without positional encoding changes. Supports spatially-aligned controls (depth, pose, edges), camera trajectory, sparse motion, and first modular audio-visual controls (who-is-talking, audio intensity→waveform, humming). Each modality requires only hundreds to thousands of steps; total 13 modalities trained with ~55K steps.",
        keyPoints: [
          "Parallel canvas attention enables fine-grained reference weight modulation, globally or locally",
          "Per-modality independent LoRA training allows adding new controls without retraining existing ones",
          "Small-to-large control grid strategy reduces inference latency for spatially sparse modalities"
        ],
        href: "https://arxiv.org/abs/2603.24793",
        paperLink: "AVControl: Efficient Framework for Training Audio-Visual Controls",
      },
      {
        num: 3,
        tag: "Long Video Generation",
        title: "PackForcing: Short Video Training for Minute-Level Long Video Sampling",
        description: "PackForcing proposes three-partition KV cache strategy addressing error accumulation and memory bottlenecks: Sink tokens preserve early anchor frames at full resolution for global semantics; Mid tokens achieve 128× spatiotemporal compression via dual-branch network (progressive 3D conv + low-res VAE re-encoding); Recent tokens maintain full resolution for local temporal coherence. Dynamic top-k context selection retains only most informative mid tokens, with continuous Temporal RoPE Adjustment seamlessly realigning position gaps from dropped tokens. Generates 2-minute 832×480 video at 16 FPS on single H200 with KV cache bounded at 4GB, achieving 24× temporal extrapolation (5s→120s).",
        keyPoints: [
          "Three-partition design decouples attention complexity from video length, achieving O(1) attention cost",
          "Dual-branch compression achieves ~32× token reduction, increasing effective memory capacity 27×",
          "Training on only 5-second clips enables high-quality long video generation, breaking training-inference length gap"
        ],
        href: "https://arxiv.org/abs/2603.25730",
        paperLink: "PackForcing: Short Video Training Suffices for Long Video Sampling and Long Context Inference",
      },
      {
        num: 4,
        tag: "Diffusion Optimization",
        title: "Calibri: Parameter-Efficient Calibration for Diffusion Transformers",
        description: "Calibri discovers that DiT block contributions are highly uneven—disabling certain blocks can improve quality, and each block has an optimal output scaling factor. Proposes calibration method optimizing only ~100 parameters: multiply each DiT block output by learned scalar coefficient, solved via CMA-ES evolutionary strategy for black-box reward optimization. Experiments show consistent performance gains across text-to-image models while reducing inference steps. No backpropagation required, directly applicable to pretrained models, providing efficient post-training optimization paradigm.",
        keyPoints: [
          "Only ~100 parameter modifications significantly improve quality and reduce inference steps",
          "Black-box optimization via evolutionary strategy requires no gradient computation, compatible with any reward model",
          "Reveals uneven DiT block contributions—some blocks may introduce detrimental artifacts"
        ],
        href: "https://arxiv.org/abs/2603.24800",
        paperLink: "Calibri: Enhancing Diffusion Transformers via Parameter-Efficient Calibration",
      },
      {
        num: 5,
        tag: "Expression Editing",
        title: "PixelSmile: Fine-Grained Facial Expression Editing with Continuous Control",
        description: "PixelSmile addresses semantic overlap in facial expression editing (fear vs surprise, anger vs disgust) by constructing Flex Facial Expression (FFE) dataset with 12-dimensional continuous affective score distributions replacing discrete labels. Proposes fully symmetric joint training framework: contrastive learning on confusing expression pairs, flow matching loss for intensity alignment, plus identity preservation loss. Inference achieves continuous intensity control without reference images via textual latent space interpolation. Demonstrates superior performance on structural confusion, editing accuracy, linear controllability and identity preservation, supporting 12 expression categories and seamless blending.",
        keyPoints: [
          "Continuous affective annotations replace one-hot labels, addressing inherent overlap on expression semantic manifold",
          "Symmetric training enhances disentanglement of confusing expressions via positive-negative role swapping",
          "Textual latent interpolation enables reference-free continuous intensity control"
        ],
        href: "https://arxiv.org/abs/2603.25728",
        paperLink: "PixelSmile: Toward Fine-Grained Facial Expression Editing",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "MACRO: Multi-Reference Image Generation with Structured Long-Context Data",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2603.25319",
        description: "Proposes MacroData dataset (400K samples, up to 10 references each) and MacroBench benchmark, improving multi-reference generation consistency through cross-task co-training.",
      },
      {
        num: 7,
        title: "LGTM: 4K Feed-Forward Textured Gaussian Splatting",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2603.25745",
        description: "Decouples geometric complexity from rendering resolution via compact Gaussian primitives with per-primitive textures, enabling 4K novel view synthesis without per-scene optimization.",
      },
      {
        num: 8,
        title: "Hybrid Memory: Dynamic Video World Models with Subject Tracking",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2603.25716",
        description: "Proposes hybrid memory paradigm acting as archivist for static backgrounds and tracker for dynamic subjects, ensuring motion continuity when subjects exit and re-enter view.",
      },
      {
        num: 9,
        title: "PhyGenesis: Physically Consistent Driving Video World Models",
        tag: "World Models",
        href: "https://arxiv.org/abs/2603.24506",
        description: "Transforms invalid trajectory inputs into physically plausible conditions via physical condition generator, generating high-fidelity multi-view driving videos under extreme conditions.",
      },
      {
        num: 10,
        title: "MegaFlow: Zero-Shot Large Displacement Optical Flow",
        tag: "Motion Estimation",
        href: "https://arxiv.org/abs/2603.25739",
        description: "Reformulates flow estimation as global matching using pretrained ViT features, achieving zero-shot SOTA on multiple optical flow benchmarks.",
      },
      {
        num: 11,
        title: "YingMusic-Singer: Controllable Singing Voice Synthesis",
        tag: "Audio Generation",
        href: "https://arxiv.org/abs/2603.24589",
        description: "Full diffusion model for melody-controllable singing synthesis with flexible lyric manipulation, trained with curriculum learning and GRPO for improved melody preservation.",
      },
      {
        num: 12,
        title: "Persistent Robot World Models: RL for Stabilizing Multi-Step Rollouts",
        tag: "World Models",
        href: "https://arxiv.org/abs/2603.25685",
        description: "Trains world model on its own autoregressive rollouts via contrastive RL, with multi-candidate future comparison and efficient multi-view visual fidelity rewards.",
      },
    ],
    observation: "Today's papers demonstrate the accelerating maturation of autoregressive video generation: ShotStream, PackForcing, and Persistent Robot World Models tackle long-horizon error accumulation from different angles—progressive distillation, hierarchical KV caching, and RL post-training respectively. Meanwhile, AVControl showcases the efficiency of modular control frameworks in joint audio-visual generation, providing directly transferable techniques for audio-driven control in music-to-dance. A notable trend is that parameter-efficient fine-tuning (LoRA) and black-box optimization (Calibri) are becoming mainstream paradigms for diffusion model post-training, significantly reducing the cost of adding new capabilities.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-28`,
        'en': `/en/daily/music-to-dance/2026-03-28`,
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
      date="2026-03-28"
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