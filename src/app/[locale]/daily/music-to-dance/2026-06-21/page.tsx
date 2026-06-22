import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "风格解耦与反馈校正：提升可控视频生成的新思路",
    overview: [
      "FreeStyle 提出社区 LoRA 挖掘的双参考生成框架，实现风格与内容的解耦控制",
      "FlowBender 引入反馈感知训练机制，让条件流模型具备自校正能力",
      "Holo-World 统一相机、物体与天气控制，展示单图视频生成的可控性",
      "ImageWAM 用图像编辑替代视频生成，大幅降低推理成本的同时保持性能"
    ],
    papers: [
      {
        num: 1,
        tag: "风格迁移",
        title: "FreeStyle：基于社区 LoRA 挖掘的风格-内容双参考生成",
        description: "FreeStyle 针对风格-内容双参考生成任务，提出了一套可扩展的数据构建框架。核心思路是将社区 LoRA 视为风格和内容的组合锚点，通过严格的生成与过滤流程，构建大规模三元组数据集。论文发现内容泄漏在不同阶段有不同机制：风格参考生成阶段的泄漏主要来自去噪后期的注意力分配失衡，而双参考阶段的泄漏则通过高频 RoPE 分量的位置对应发生。为此，论文采用两阶段课程学习：第一阶段用注意力级富集约束抑制风格参考泄漏，第二阶段用频率感知 RoPE 调制抑制位置对应泄漏。对于 music-to-dance 任务，这套双参考框架可直接迁移：参考人物图作为 style reference，音频驱动的姿态作为 content reference，实现外观与运动的解耦控制。",
        keyPoints: [
          "社区 LoRA 挖掘：从 Civitai、TensorArt 等平台挖掘 68.6k 个 LoRA，筛选出稳定组合构建 478k 三元组",
          "两阶段解耦策略：注意力级约束处理风格阶段泄漏，频率感知 RoPE 调制处理双参考阶段泄漏",
          "迁移价值：双参考生成框架可直接用于 music-to-dance 的外观-运动解耦控制"
        ],
        href: "https://arxiv.org/abs/2606.20506",
        paperLink: "FreeStyle: Free Control of Style-Content Dual-Reference Generation from Community LoRA Mining",
      },
      {
        num: 2,
        tag: "条件流模型",
        title: "FlowBender：反馈感知训练实现自校正条件流",
        description: "FlowBender 针对条件扩散/流模型在推理时难以满足约束的问题，提出闭环反馈训练框架。现有方法分为两类：监督训练将条件视为静态提示，推理时无法调整轨迹；引导方法通过手工调参的梯度更新来强制约束，但会牺牲样本合理性。FlowBender 的核心创新是将模型自身的对齐误差作为一等输入，训练网络学习基于推理时反馈的校正策略。具体实现采用双通策略：第一通无引导预测得到 clean signal 估计，计算任务特定的偏差信号；第二通将该信号作为条件输入，生成校正后的速度场。实验显示，在超分辨率、深度/边缘到 RGB、JPEG 恢复等任务上，FlowBender 同时在保真度（PSNR 提升 2-10dB）和合理性（FID 降低）上超越基线。对于 music-to-dance 任务，3D Audio Attention 可引入 FlowBender 的闭环校正机制，让模型根据生成结果与音频节拍的对齐误差进行自我修正。",
        keyPoints: [
          "闭环反馈训练：将模型对齐误差作为输入，学习非线性校正策略而非手工调参的梯度引导",
          "双通执行：look-ahead 通估计 clean signal 并计算反馈，refinement 通生成校正速度",
          "零阶反馈变体：支持非可微算子（如 JPEG 压缩），扩展应用范围"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
      {
        num: 3,
        tag: "视频世界模型",
        title: "Holo-World：统一的相机、物体与天气控制视频世界模型",
        description: "Holo-World 研究从单张图像出发，在显式相机和物体控制下生成视频，同时支持场景保持或天气状态转移的任务。现有方法通常将相机控制、物体控制和天气生成分开处理，且天气生成往往依赖已提供未来结构的源视频或重建场景。Holo-World 构建 HoloStateData 数据集，将真实视频、合成天气视频和 V2V 转移视频统一为相机、物体、天气监督样本。模型核心 Unified Scene Adapter 将世界保持和天气转移分解到不同参数子空间：World Adapter 使用渲染背景、几何缓冲区和物体控制保持场景结构，State Adapter 建模天气相关外观和粒子效果。采样时的 Scene-Weather Decomposed CFG 分别引导场景和天气残差，增强天气效果而不过度放大完整条件。实验显示 Holo-World 在保持精确相机/物体控制和场景结构的同时，实现多样化天气状态生成。对于 music-to-dance 任务，Unified Scene Adapter 的思路可用于参考人物的相机视角变化控制，同时保持人物外观一致性。",
        keyPoints: [
          "统一状态控制：单图生成视频，同时支持相机运动、物体动态和环境状态变化",
          "HoloStateData：15K 训练样本，包含真实视频、合成天气对和 V2V 转移视频三类数据",
          "分解式适配器：World Adapter 保持场景结构，State Adapter 处理天气转移，避免目标纠缠"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
      {
        num: 4,
        tag: "世界行动模型",
        title: "ImageWAM：用图像编辑替代视频生成的世界行动模型",
        description: "ImageWAM 质疑世界行动模型（WAM）是否真的需要视频生成。现有基于视频的 WAM 面临三个耦合限制：密集多帧未来 token 使推理成本高昂，完整视频预测将容量花在动作无关的时间/外观细节上，长程未来想象可能引入误导动作预测的错误。ImageWAM 提出用预训练图像编辑模型替代视频生成：图像编辑只需建模目标帧变换，关注动作相关的当前到目标的视觉差异，通过编辑预训练将任务指令落地到局部视觉变化。实际实现中，ImageWAM 在推理时不解码目标帧，而是将图像编辑去噪产生的 KV cache 作为紧凑的世界-动作上下文，输入 flow-matching 动作专家。在 LIBERO、LIBERO-Plus 和真实机器人实验中，ImageWAM 无需额外策略预训练即超越标准 VLA 基线和竞争 WAM，同时将 FLOPs 降至 1/6、延迟降至 1/4。对于 music-to-dance 任务，图像编辑替代视频生成的思路可大幅降低推理成本：当前方案生成完整视频帧开销大，可尝试仅预测关键帧变化区域，通过图像编辑实现高效推理。",
        keyPoints: [
          "图像编辑先验：相比视频生成，更匹配机器人控制的需求——关注任务相关的视觉变化",
          "KV cache 复用：不解码完整图像，仅用编辑去噪的中间表示作为动作预测上下文",
          "效率提升：FLOPs 降至 1/6，延迟降至 1/4，同时保持或提升任务成功率"
        ],
        href: "https://arxiv.org/abs/2606.19531",
        paperLink: "ImageWAM: Do World Action Models Really Need Video Generation, or Just Image Editing?",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "S-Agent：空间工具使用引发空间智能推理",
        tag: "空间智能",
        href: "https://arxiv.org/abs/2606.20515",
        description: "将空间推理建模为时空证据积累而非孤立帧级预测，可借鉴其时序证据积累机制改进舞蹈视频的连续帧一致性。",
      },
      {
        num: 6,
        title: "HumanScale：第一人称人体视频优于真实机器人数据用于具身预训练",
        tag: "预训练",
        href: "https://arxiv.org/abs/2606.20521",
        description: "人体视频预训练范式，相同数据量下在真实机器人任务上成功率提升 52.5%-90%，可为舞蹈生成模型的预训练数据策略提供参考。",
      },
      {
        num: 7,
        title: "UNIEGO：代理介导的统一第一人称视频表示学习",
        tag: "表示学习",
        href: "https://arxiv.org/abs/2606.20559",
        description: "多视角人体表示学习方法，融合 ego-exo 视角、RGB、深度和骨骼模态，可用于融合多视角舞蹈视频数据。",
      },
      {
        num: 8,
        title: "Learning When to Denoise：优化潜在扩散的异步调度",
        tag: "训练效率",
        href: "https://arxiv.org/abs/2606.19662",
        description: "学习多表示空间的去噪异步调度，ImageNet 256x256 上 200 epoch 达到 800 epoch 基线性能，训练计算量减少 4 倍。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的技术趋势。一是生成模型的条件控制正从开环走向闭环：FlowBender 将模型自身的对齐误差作为输入进行反馈训练，Holo-World 通过分解式适配器解耦不同控制目标，都体现了对生成过程更精细的干预能力。对于 music-to-dance 任务，这意味着音频-运动对齐可以超越静态条件注入，引入动态校正机制。二是视频生成与图像编辑的边界在模糊：ImageWAM 用图像编辑实现视频级世界建模，FreeStyle 的 LoRA 组合策略也可视为一种编辑操作。这提示 music-to-dance 方案或许可以简化——与其生成完整视频序列，不如聚焦于关键姿态帧的编辑式生成，再通过时序插值或扩散外推得到平滑视频，从而在保持质量的同时大幅降低推理成本。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Style Disentanglement & Feedback Correction: New Directions for Controllable Video Generation",
    overview: [
      "FreeStyle proposes a community LoRA mining framework for dual-reference generation, achieving disentangled style-content control",
      "FlowBender introduces feedback-aware training, enabling conditional flow models with self-correcting capabilities",
      "Holo-World unifies camera, object and weather control, demonstrating controllability in single-image video generation",
      "ImageWAM replaces video generation with image editing, significantly reducing inference cost while maintaining performance"
    ],
    papers: [
      {
        num: 1,
        tag: "Style Transfer",
        title: "FreeStyle: Style-Content Dual-Reference Generation via Community LoRA Mining",
        description: "FreeStyle addresses the style-content dual-reference generation task with a scalable data construction framework. The core idea treats community LoRAs as compositional anchors for style and content, building large-scale triplet datasets through rigorous generation and filtering pipelines. The paper identifies that content leakage manifests through different mechanisms across stages: in style-reference generation, leakage arises from disproportionate attention allocation during late denoising steps; in the harder dual-reference setting, leakage occurs through local positional correspondence encoded in high-frequency RoPE components. To address this, a two-stage curriculum is adopted: Stage 1 uses attention-level enrichment constraints to suppress style-reference leakage, while Stage 2 applies frequency-aware RoPE modulation to suppress positional-correspondence leakage. For music-to-dance tasks, this dual-reference framework can be directly migrated: the reference person image serves as style reference, while audio-driven poses serve as content reference, enabling disentangled appearance-motion control.",
        keyPoints: [
          "Community LoRA mining: 68.6k LoRAs crawled from Civitai, TensorArt, etc., filtered to 478k stable triplets",
          "Two-stage disentanglement: attention-level constraints for style-stage leakage, frequency-aware RoPE for dual-reference leakage",
          "Transfer value: dual-reference framework directly applicable for appearance-motion disentanglement in music-to-dance"
        ],
        href: "https://arxiv.org/abs/2606.20506",
        paperLink: "FreeStyle: Free Control of Style-Content Dual-Reference Generation from Community LoRA Mining",
      },
      {
        num: 2,
        tag: "Conditional Flow",
        title: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
        description: "FlowBender addresses the challenge that conditional diffusion/flow models routinely fail to satisfy constraints at inference. Existing approaches fall into two categories: supervised training treats conditions as static cues without trajectory adjustment at inference; guidance methods enforce constraints via hand-tuned gradient updates but sacrifice sample plausibility. FlowBender's core innovation treats the model's own alignment error as a first-class input, training the network to learn a correction policy based on inference-time feedback. The implementation uses a two-pass strategy: the first pass generates an unguided prediction to estimate the clean signal and compute task-specific deviation; the second pass consumes this signal as conditional input to generate corrected velocity. Experiments on super-resolution, depth/edge-to-RGB, and JPEG restoration show FlowBender simultaneously improves fidelity (2-10dB PSNR gains) and plausibility (lower FID). For music-to-dance tasks, 3D Audio Attention could incorporate FlowBender's closed-loop correction mechanism, enabling self-correction based on alignment errors between generated results and audio beats.",
        keyPoints: [
          "Closed-loop feedback training: model alignment error as input, learning non-linear correction policy vs. hand-tuned gradient guidance",
          "Two-pass execution: look-ahead pass estimates clean signal and computes feedback, refinement pass generates corrected velocity",
          "Zero-order feedback variant: supports non-differentiable operators (e.g., JPEG compression), extending applicability"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
      {
        num: 3,
        tag: "Video World Model",
        title: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
        description: "Holo-World studies the task of generating video from a single image under explicit camera and object controls, supporting either scene preservation or weather state transfer. Existing methods typically separate camera control, object control, and weather generation, with weather generation often relying on source videos or reconstructed scenes that already provide future structure. Holo-World builds the HoloStateData dataset, unifying real videos, synthetic weather videos, and V2V transferred videos into samples with camera, object, and weather supervision. The core Unified Scene Adapter factorizes world preservation and weather transfer into distinct parameter subspaces: the World Adapter uses rendered backgrounds, geometry buffers, and object controls to maintain scene structure, while the State Adapter models weather-dependent appearance and particle effects. During sampling, Scene-Weather Decomposed CFG guides scene and weather residuals separately, strengthening weather effects without over-amplifying the full condition. Experiments demonstrate Holo-World maintains precise camera/object control and scene structure while generating diverse weather states. For music-to-dance tasks, the Unified Scene Adapter approach could enable camera viewpoint variation for reference persons while maintaining appearance consistency.",
        keyPoints: [
          "Unified state control: single-image video generation supporting camera motion, object dynamics, and environmental state changes",
          "HoloStateData: 15K training samples across real videos, synthetic weather pairs, and V2V transferred videos",
          "Factorized adapters: World Adapter preserves scene structure, State Adapter handles weather transfer, avoiding objective entanglement"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
      {
        num: 4,
        tag: "World Action Model",
        title: "ImageWAM: Do World Action Models Really Need Video Generation, or Just Image Editing?",
        description: "ImageWAM questions whether World Action Models (WAMs) truly require video generation. Existing video-based WAMs face three coupled limitations: dense multi-frame future tokens make inference costly, full video prediction spends capacity on action-irrelevant temporal/appearance details, and long-horizon future imagination may introduce errors that mislead action prediction. ImageWAM proposes replacing video generation with pretrained image editing models: image editing only needs to model target-frame transformations, focuses on action-relevant current-to-target visual differences, and grounds task instructions to localized visual changes through edit pretraining. In practice, ImageWAM does not decode target frames at inference; instead, it conditions a flow-matching action expert on KV caches produced by image editing denoising, using them as compact world-action context. In LIBERO, LIBERO-Plus, and real robot experiments, ImageWAM outperforms standard VLA baselines and competitive WAMs without additional policy pretraining, while reducing FLOPs to 1/6 and latency to 1/4. For music-to-dance tasks, the image-editing-replaces-video-generation insight could significantly reduce inference costs: instead of generating complete video frames, focus on editing-style generation of key pose frames, then use temporal interpolation or diffusion extrapolation for smooth video.",
        keyPoints: [
          "Image editing prior: better matched to robot control needs—focusing on task-relevant visual changes vs. video generation",
          "KV cache reuse: no full image decoding, using intermediate editing representations as action prediction context",
          "Efficiency gains: FLOPs reduced to 1/6, latency to 1/4, while maintaining or improving task success rates"
        ],
        href: "https://arxiv.org/abs/2606.19531",
        paperLink: "ImageWAM: Do World Action Models Really Need Video Generation, or Just Image Editing?",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "S-Agent: Spatial Tool-Use Elicits Reasoning for Spatial Intelligence",
        tag: "Spatial Intelligence",
        href: "https://arxiv.org/abs/2606.20515",
        description: "Models spatial reasoning as spatio-temporal evidence accumulation rather than isolated frame-level prediction. The temporal evidence accumulation mechanism could improve frame consistency in dance videos.",
      },
      {
        num: 6,
        title: "HumanScale: Egocentric Human Video Outperforms Real-Robot Data for Embodied Pretraining",
        tag: "Pretraining",
        href: "https://arxiv.org/abs/2606.20521",
        description: "Human video pretraining paradigm: with the same data volume, success rates on real robot tasks improve by 52.5%-90%. Provides reference for pretraining data strategies in dance generation models.",
      },
      {
        num: 7,
        title: "UNIEGO: Proxies as Mediators for Unified Egocentric Video Representation Learning",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2606.20559",
        description: "Multi-view human representation learning method fusing ego-exo viewpoints, RGB, depth, and skeleton modalities. Applicable for fusing multi-view dance video data.",
      },
      {
        num: 8,
        title: "Learning When to Denoise: Optimizing Asynchronous Schedules for Latent Diffusion",
        tag: "Training Efficiency",
        href: "https://arxiv.org/abs/2606.19662",
        description: "Learning asynchronous denoising schedules across multi-representation spaces. On ImageNet 256x256, 200 epochs match 800-epoch baseline performance with 4x less training computation.",
      },
    ],
    observation: "Today's papers reveal two notable technical trends. First, conditional control in generative models is moving from open-loop to closed-loop: FlowBender treats the model's own alignment error as input for feedback training, while Holo-World decouples different control objectives through factorized adapters—both demonstrating more fine-grained intervention capabilities in the generation process. For music-to-dance tasks, this means audio-motion alignment can transcend static condition injection to incorporate dynamic correction mechanisms. Second, the boundary between video generation and image editing is blurring: ImageWAM achieves video-level world modeling through image editing, while FreeStyle's LoRA composition strategy can also be viewed as an editing operation. This suggests music-to-dance approaches could be simplified—rather than generating complete video sequences, focus on editing-style generation of key pose frames, then obtain smooth video through temporal interpolation or diffusion extrapolation, thereby significantly reducing inference costs while maintaining quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-21`,
        'en': `/en/daily/music-to-dance/2026-06-21`,
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
      date="2026-06-21"
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
