import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "音乐偏好奖励与条件流自校正",
    overview: [
      "音乐生成中的人类偏好奖励建模为舞蹈动作美学评估提供新思路",
      "风格-内容解耦的双参考生成框架可直接迁移到外观保持任务",
      "反馈感知的条件流自校正机制解决姿态条件漂移问题"
    ],
    papers: [
      {
        num: 1,
        tag: "音乐生成",
        title: "TuneJury：基于人类偏好奖励的音乐生成优化",
        description: "论文提出TuneJury双胞胎成对排序器，在LAION-CLAP-Music和MERT特征上训练，用于预测人类对音乐片段的偏好。该奖励模型在训练时作为条件信号（Fourier嵌入+InputAdd注入），在推理时通过CFG进行分数外推。关键发现：专家迭代（Expert Iteration）对FAD-CLAP提升最大（-0.0362），CRPO微调仅带来噪声级增益。这一范式可直接迁移到舞蹈生成：用类似的双胞胎排序器学习人类对动作美学、音乐-动作对齐质量的偏好，解决当前方案中缺乏显式美学评估指标的问题。",
        keyPoints: [
          "TuneJury在~22K偏好对上训练，held-out准确率70.3%，ECE仅0.027",
          "训练时奖励条件化使推理时可沿CFG轴进行分数外推（s=+1.5 vs s=-0.5）",
          "专家迭代（top decile筛选）是性能提升的主导因素",
          "Demucs音源分离+LUFS响度归一化的后处理流程可借鉴到视频生成"
        ],
        href: "https://arxiv.org/abs/2606.21670",
        paperLink: "Improving Text-to-Music Generation with Human Preference Rewards",
      },
      {
        num: 2,
        tag: "风格迁移",
        title: "FreeStyle：社区LoRA挖掘实现风格-内容双参考生成",
        description: "论文针对风格-内容双参考生成中的内容泄漏问题，提出两阶段课程训练策略。第一阶段使用注意力级富集约束（Attention-level Enrichment Constraint）抑制风格参考在晚期去噪步骤中的过度关注；第二阶段引入频率感知RoPE调制（Frequency-aware RoPE Modulation），抑制高频位置分量（导致patch级复制）同时放大低频全局风格结构。这一解耦机制可直接应用于舞蹈生成：将参考人物图视为「风格」、姿态序列视为「内容」，解决外观保持与动作变化之间的干扰问题。",
        keyPoints: [
          "社区LoRA作为组合锚点构建大规模三元组数据，覆盖长尾风格",
          "两阶段课程针对不同泄漏机制：注意力分配 vs 位置对应",
          "RoPE调制通过频率分解实现位置-风格的解耦",
          "VLM-based Verification Score可迁移评估舞蹈生成的身份保持质量"
        ],
        href: "https://arxiv.org/abs/2606.20506",
        paperLink: "FreeStyle: Free Control of Style-Content Dual-Reference Generation from Community LoRA Mining",
      },
      {
        num: 3,
        tag: "扩散模型",
        title: "FlowBender：反馈感知的条件流自校正训练",
        description: "论文指出条件扩散/流模型的核心缺陷：模型从未被训练利用自身的对齐误差。FlowBender通过两阶段推理实现闭环校正：第一阶段进行无引导的前瞻预测（look-ahead）估计干净信号，通过前向算子H计算偏差信号；第二阶段将该偏差作为第一级输入进行精炼预测。关键创新：80%的校正能量位于梯度正交方向，表明模型学习到了标量加权方案无法表达的非线性策略。对于舞蹈生成，可将DWPose姿态估计器作为H，在推理时自动修正生成视频与目标姿态的偏差，解决DDIM采样中的条件漂移问题。",
        keyPoints: [
          "两阶段推理：look-ahead估计→偏差计算→refinement校正",
          "零阶变体支持非可微算子（如JPEG压缩、第三方API）",
          "Prior-step shortcut将推理开销降至N+1次评估（N步采样）",
          "正交分解显示80%校正能量与梯度方向正交"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
      {
        num: 4,
        tag: "视频生成",
        title: "Holo-World：统一相机/物体/天气控制的视频世界模型",
        description: "论文提出Unified Scene Adapter（UniSA），将世界保持（World Adapter）与天气迁移（State Adapter）分解到不同的参数子空间，共享冻结的视频主干。World Adapter使用渲染背景、G-buffers和物体控制来维持场景结构；State Adapter建模天气相关的外观和粒子效果。Scene-Weather Decomposed CFG（SW-CFG）在采样时独立引导场景残差和天气残差，避免标准CFG中过增强天气效果时同时过增强源场景的问题。对于舞蹈生成，这一分解思路可应用于相机运动与人物动作的联合控制：将相机参数和人物姿态分别作为独立控制分支，通过分解CFG避免相互干扰。",
        keyPoints: [
          "UniSA将世界保持与天气迁移分解到独立参数子空间",
          "SW-CFG独立缩放场景和天气残差，解耦控制强度",
          "HoloStateData构建15K训练样本，覆盖Real/Simulation/V2V三种来源",
          "MoGe渲染深度/法线作为几何锚点，MegaSaM估计相机轨迹"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "JanusMesh：跨空间去噪实现3D视觉错觉生成",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2606.20563",
        description: "跨空间双分支去噪（voxel空间CLIP引导+SDF融合）实现不同视角呈现不同语义的3D错觉，其几何一致性融合方法可借鉴用于多视角舞蹈视频生成。",
      },
      {
        num: 6,
        title: "当前世界模型缺乏持久状态核心",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.20559",
        description: "WRBench评估框架揭示现有世界模型在相机离开后无法正确推进事件状态，对长序列舞蹈生成中的时序一致性评估有参考价值。",
      },
      {
        num: 7,
        title: "HumanScale：第一人称人体视频预训练超越真实机器人数据",
        tag: "具身智能",
        href: "https://arxiv.org/abs/2606.20521",
        description: "精心过滤和标注的第一人称人体视频作为预训练数据，在相同数据量下实现24%更低的验证损失，其数据质量评估流程可指导舞蹈视频数据集构建。",
      },
      {
        num: 8,
        title: "S-Agent：空间工具使用激发空间智能推理",
        tag: "空间推理",
        href: "https://arxiv.org/abs/2606.20515",
        description: "时空证据累积框架将2D物体提升为3D几何证据并聚合为高层空间知识，其Scene Memory机制可用于舞蹈动作的空间关系建模。",
      },
      {
        num: 9,
        title: "EventVLA：事件驱动的视觉证据记忆用于长程VLA策略",
        tag: "记忆机制",
        href: "https://arxiv.org/abs/2606.20092",
        description: "Keyframe Evidence Memory（KEM）从VLA潜在嵌入预测未来关键帧概率，自主捕获稀疏任务关键视觉事件，可应用于长序列舞蹈生成的关键姿态保持。",
      },
    ],
    observation: "今日论文呈现三个可迁移到Music-to-Dance生成的关键技术趋势：（1）人类偏好奖励建模（TuneJury）为舞蹈动作美学评估提供了可量化的训练信号；（2）风格-内容解耦机制（FreeStyle的RoPE调制、Holo-World的参数子空间分解）为外观保持与动作变化的联合控制提供了工程范式；（3）闭环自校正（FlowBender）将前向算子（如姿态估计器）整合进推理流程，有望解决当前扩散采样中条件漂移的固有问题。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Human Preference Rewards & Self-Correcting Conditional Flows",
    overview: [
      "Human preference reward modeling in music generation offers new insights for dance motion aesthetics evaluation",
      "Style-content disentanglement frameworks can be directly transferred to appearance preservation tasks",
      "Feedback-aware conditional flow self-correction mechanisms address pose condition drift issues"
    ],
    papers: [
      {
        num: 1,
        tag: "Music Generation",
        title: "TuneJury: Optimizing Music Generation with Human Preference Rewards",
        description: "The paper proposes TuneJury, a twin pairwise ranker trained on LAION-CLAP-Music and MERT features to predict human preferences for music clips. This reward model serves as a conditioning signal during training (Fourier embedding + InputAdd injection) and enables score extrapolation via CFG at inference. Key finding: Expert Iteration provides the largest FAD-CLAP improvement (-0.0362), while CRPO fine-tuning only brings noise-level gains. This paradigm can be directly transferred to dance generation: using a similar twin ranker to learn human preferences for motion aesthetics and music-motion alignment quality, addressing the lack of explicit aesthetic evaluation metrics in current approaches.",
        keyPoints: [
          "TuneJury trained on ~22K preference pairs achieves 70.3% held-out accuracy with ECE of only 0.027",
          "Reward conditioning during training enables score extrapolation along CFG axis at inference (s=+1.5 vs s=-0.5)",
          "Expert iteration (top decile filtering) is the dominant contributor to performance gains",
          "Demucs source separation + LUFS loudness normalization pipeline can be adapted for video generation"
        ],
        href: "https://arxiv.org/abs/2606.21670",
        paperLink: "Improving Text-to-Music Generation with Human Preference Rewards",
      },
      {
        num: 2,
        tag: "Style Transfer",
        title: "FreeStyle: Community LoRA Mining for Style-Content Dual-Reference Generation",
        description: "Addressing content leakage in style-content dual-reference generation, the paper proposes a two-stage curriculum training strategy. Stage 1 uses attention-level enrichment constraints to suppress excessive attention to style references during late denoising steps. Stage 2 introduces frequency-aware RoPE modulation, suppressing high-frequency positional components (causing patch-level copying) while amplifying low-frequency global style structures. This disentanglement mechanism can be directly applied to dance generation: treating reference person images as 'style' and pose sequences as 'content' to solve interference between appearance preservation and motion variation.",
        keyPoints: [
          "Community LoRAs serve as compositional anchors for constructing large-scale triplet datasets covering long-tail styles",
          "Two-stage curriculum targets different leakage mechanisms: attention allocation vs. positional correspondence",
          "RoPE modulation achieves position-style disentanglement through frequency decomposition",
          "VLM-based Verification Score can be transferred to evaluate identity preservation quality in dance generation"
        ],
        href: "https://arxiv.org/abs/2606.20506",
        paperLink: "FreeStyle: Free Control of Style-Content Dual-Reference Generation from Community LoRA Mining",
      },
      {
        num: 3,
        tag: "Diffusion Models",
        title: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
        description: "The paper identifies a core limitation in conditional diffusion/flow models: models are never trained to utilize their own alignment errors. FlowBender achieves closed-loop correction through two-stage inference: first, an unguided look-ahead pass estimates the clean signal and computes deviation via forward operator H; second, this deviation serves as first-class input for refinement. Key innovation: 80% of correction energy lies orthogonal to the gradient direction, indicating the model learns nonlinear policies that scalar-weighted schemes cannot express. For dance generation, DWPose can serve as H to automatically correct deviations between generated video and target poses during inference, addressing condition drift in DDIM sampling.",
        keyPoints: [
          "Two-stage inference: look-ahead estimation → deviation computation → refinement correction",
          "Zero-order variant supports non-differentiable operators (e.g., JPEG compression, third-party APIs)",
          "Prior-step shortcut reduces inference overhead to N+1 evaluations for N-step sampling",
          "Orthogonal decomposition shows 80% correction energy is orthogonal to gradient direction"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
      {
        num: 4,
        tag: "Video Generation",
        title: "Holo-World: Unified Camera, Object and Weather Control for Video World Models",
        description: "The paper proposes Unified Scene Adapter (UniSA), decomposing world preservation (World Adapter) and weather transfer (State Adapter) into different parameter subspaces while sharing a frozen video backbone. The World Adapter uses rendered backgrounds, G-buffers, and object controls to maintain scene structure; the State Adapter models weather-dependent appearance and particle effects. Scene-Weather Decomposed CFG (SW-CFG) independently guides scene and weather residuals during sampling, avoiding the problem where standard CFG over-amplifies source scenes when strengthening weather effects. For dance generation, this decomposition approach can be applied to joint control of camera motion and human motion: treating camera parameters and human poses as independent control branches with decomposed CFG to avoid mutual interference.",
        keyPoints: [
          "UniSA decomposes world preservation and weather transfer into independent parameter subspaces",
          "SW-CFG independently scales scene and weather residuals, decoupling control strengths",
          "HoloStateData constructs 15K training samples covering Real/Simulation/V2V sources",
          "MoGe renders depth/normals as geometric anchors, MegaSaM estimates camera trajectories"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "JanusMesh: Cross-Space Denoising for 3D Visual Illusion Generation",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2606.20563",
        description: "Cross-space dual-branch denoising (CLIP guidance in voxel space + SDF fusion) achieves 3D illusions with different semantics from different views; its geometric consistency fusion methods can inform multi-view dance video generation.",
      },
      {
        num: 6,
        title: "Current World Models Lack a Persistent State Core",
        tag: "World Models",
        href: "https://arxiv.org/abs/2606.20559",
        description: "WRBench evaluation framework reveals existing world models fail to properly advance event states when cameras leave the scene, providing reference value for temporal consistency evaluation in long-sequence dance generation.",
      },
      {
        num: 7,
        title: "HumanScale: Egocentric Human Video Pretraining Outperforms Real-Robot Data",
        tag: "Embodied AI",
        href: "https://arxiv.org/abs/2606.20521",
        description: "Carefully filtered and labeled egocentric human video as pretraining data achieves 24% lower validation loss with same data volume; its data quality assessment pipeline can guide dance video dataset construction.",
      },
      {
        num: 8,
        title: "S-Agent: Spatial Tool-Use Elicits Reasoning for Spatial Intelligence",
        tag: "Spatial Reasoning",
        href: "https://arxiv.org/abs/2606.20515",
        description: "Spatio-temporal evidence accumulation framework lifts 2D objects into 3D geometric evidence and aggregates into high-level spatial knowledge; its Scene Memory mechanism can be used for spatial relationship modeling in dance motion.",
      },
      {
        num: 9,
        title: "EventVLA: Event-Driven Visual Evidence Memory for Long-Horizon VLA Policies",
        tag: "Memory Mechanisms",
        href: "https://arxiv.org/abs/2606.20092",
        description: "Keyframe Evidence Memory (KEM) predicts future keyframe probabilities from VLA latent embeddings to autonomously capture sparse task-critical visual events, applicable to key pose preservation in long-sequence dance generation.",
      },
    ],
    observation: "Today's papers present three key technical trends transferable to Music-to-Dance generation: (1) Human preference reward modeling (TuneJury) provides quantifiable training signals for dance motion aesthetics evaluation; (2) Style-content disentanglement mechanisms (FreeStyle's RoPE modulation, Holo-World's parameter subspace decomposition) offer engineering paradigms for joint control of appearance preservation and motion variation; (3) Closed-loop self-correction (FlowBender) integrates forward operators (e.g., pose estimators) into the inference pipeline, potentially addressing the inherent condition drift problem in current diffusion sampling.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-22`,
        'en': `/en/daily/music-to-dance/2026-06-22`,
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
      date="2026-06-22"
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
