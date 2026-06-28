import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-06-27 | 外观保持与几何一致性：跨域视频生成的关键技术",
    overview: [
      "DomainShuttle 提出 Domain-MoT 和 DualRoPE 技术，实现 subject-driven video generation 中的高保真外观保持与跨域灵活性",
      "MVTrack4Gen 利用多视角点跟踪作为几何监督信号，显著提升相机控制视频生成的几何一致性",
      "TryOnCrafter 构建可渲染 4D Try-on Proxy，结合 SMPL-X 驱动与 3DGS，为人体视频生成提供精确几何锚点"
    ],
    papers: [
      {
        num: 1,
        tag: "Subject-Driven Video Generation",
        title: "DomainShuttle：跨域高保真主体驱动视频生成",
        description: "DomainShuttle 针对 subject-driven video generation 中外观保持与生成灵活性的权衡问题，提出了三项核心技术。Domain-MoT (Mixture-of-Transformers) 将视频潜变量与参考图像特征解耦到独立处理路径，通过 domain-aware AdaLN 在参考分支注入域属性信息，实现内容与域特征的显式分离。Video-Reference DualRoPE 将参考图像 token 分配到与视频 token 完全独立的 RoPE 空间，使不同主体在潜空间中被显式分离，同一主体的表示则被拉近。Cross-Pair Consistent Loss 则通过强制模型从同一视频的多组不同参考图像中提取共享特征，抑制对单帧冗余特征的过拟合。实验表明，该方法在跨域场景下相比 SOTA 提升 18.7% 的 Cross-Domain Score，同时保持域内场景的高主体一致性。",
        keyPoints: [
          "Domain-MoT 通过独立 QKV 投影和独立 RoPE 实现视频与参考特征的解耦，domain-aware AdaLN 支持域属性的显式注入与替换",
          "DualRoPE 为参考图像分配独立的 RoPE 空间 (时序索引固定为0)，实现主体级别的精确空间距离建模",
          "Cross-Pair Consistent Loss 利用可学习分支与冻结分支的对比，迫使模型提取与视角、光照、运动模糊无关的内在主体特征"
        ],
        href: "https://arxiv.org/abs/2606.26058",
        paperLink: "DomainShuttle: Freeform Open Domain Subject-driven Text-to-video Generation",
      },
      {
        num: 2,
        tag: "Novel-View Video Generation",
        title: "MVTrack4Gen：多视角点跟踪作为 4D 视频生成的几何监督",
        description: "MVTrack4Gen 针对相机控制视频生成中的几何一致性与运动保真度问题，提出将多视角点跟踪作为辅助监督信号。作者发现 DiT 的 3D attention 层中，query-key 匹配天然编码了时序对应（intra-video temporal）和跨视图对应（inter-video cross-view）信息，且这些对应关系在中间层同时显著。当动态物体出现几何或运动不一致时，这些层的 attention map 会表现出错误的跨视图对应。基于此，MVTrack4Gen 在选定的 attention 层之上构建多视角跟踪头，利用局部 4D correlation volumes 计算点跟踪，并与扩散模型联合训练。多视角对应损失直接对 attention map 应用交叉熵目标，鼓励目标视图的每个 query token 关注其对应的真实位置。该方法在 ReCamMaster 和 Redirector 两个 backbone 上均取得一致提升，在 DAVIS 和 iPhone 基准上达到 SOTA 几何一致性。",
        keyPoints: [
          "3D attention 的中间层同时编码时序对应和跨视图对应，对应关系质量直接决定输出的几何一致性",
          "多视角跟踪头基于 attention 层的 query/key 特征构建局部 4D correlation volumes，预测多视角点轨迹",
          "多视角对应损失直接监督 attention map，使模型在无需显式 3D 重建的情况下学习几何感知特征"
        ],
        href: "https://arxiv.org/abs/2606.26087",
        paperLink: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
      },
      {
        num: 3,
        tag: "4D Human Video Generation",
        title: "TryOnCrafter：基于可渲染 4D Proxy 的相机可控视频试穿",
        description: "TryOnCrafter 将视频虚拟试穿（VVT）扩展到相机可控场景（CaM-VVT），解决了传统方法受限于输入相机轨迹的问题。该方法构建 Renderable 4D Try-on Proxy，将高质量 2D 试穿先验蒸馏到基于 3DGS 的着装 avatar，并通过 SMPL-X 序列驱动动画。关键创新在于 anchor-based alignment：利用动态点云的人体组件作为几何锚点，通过置信度感知的点-表面对齐优化，将相机空间估计的 SMPL-X 序列映射到世界空间的度量尺度，解决单目重建的尺度歧义。Proxy-Anchored Video DiT 将渲染的 proxy 序列作为主要几何锚点，结合源视频特征和文本条件生成最终视频。该框架支持任意相机轨迹下的高保真试穿，并天然支持人体重定位、"子弹时间"效果和 360 度轨道视角等下游应用。",
        keyPoints: [
          "Anchor-based alignment 利用动态点云人体组件作为几何锚点，通过相似变换将 SMPL-X 从相机空间对齐到世界空间",
          "3DGS-based clothed avatar 蒸馏 2D 试穿先验，结合 SMPL-X 驱动实现高保真纹理密度和运动完整性",
          "Proxy-Anchored DiT 以渲染 proxy 为几何锚点，确保生成结果严格受限于物理合理的变形和目标相机轨迹"
        ],
        href: "https://arxiv.org/abs/2606.26092",
        paperLink: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "DanceOPD：流匹配模型的策略内生成场蒸馏",
        tag: "Flow Matching",
        href: "https://arxiv.org/abs/2606.27377",
        description: "提出 on-policy generative field distillation 框架，将多种能力（T2I、编辑等）统一为共享流状态空间上的速度场，通过学生模型自身 rollout 状态查询专家场进行蒸馏。",
      },
      {
        num: 5,
        title: "ViQ：任意分辨率的文本对齐视觉量化表示",
        tag: "Visual Representation",
        href: "https://arxiv.org/abs/2606.27313",
        description: "两阶段量化学习框架（文本对齐预训练 + 特征离散化），通过近端表示学习和位置感知头级量化机制，在保持低层重建精度的同时实现多模态训练 20%-70% 加速。",
      },
      {
        num: 6,
        title: "PhysiFormer：世界坐标系下的物理合理 3D 运动扩散模型",
        tag: "Physics Simulation",
        href: "https://arxiv.org/abs/2606.27364",
        description: "将顶点轨迹预测建模为直接在世界坐标系中的单步去噪扩散过程，无需显式刚性/因果归纳偏置，在 10 万+ 模拟轨迹上训练，实现刚体和弹性力学的高质量生成。",
      },
      {
        num: 7,
        title: "MusicJudge：面向歌唱评估的音乐感知框架",
        tag: "Music Understanding",
        href: "https://arxiv.org/abs/2606.26451",
        description: "通过模态引导 LoRA 微调 ASR，结合语义嵌入、词汇相似度和音素对齐进行多信号匹配，实现歌词正确性与音高-节奏保真度的块级多模态分析。",
      },
      {
        num: 8,
        title: "Neural Voxel Dynamics：体素特征平流学习隐式 3D 物理",
        tag: "3D Dynamics",
        href: "https://arxiv.org/abs/2606.26410",
        description: "将 V-JEPA 特征提升到 3D 体素潜空间，通过体素特征平流学习动作条件的状态转移算子，仅从视频信号监督即可实现异质物理现象（刚体+流体）的统一模拟。",
      },
    ],
    observation: "本周论文呈现出明显的技术收敛趋势：在 subject-driven 和相机可控的视频生成任务中，显式几何表示（3DGS、SMPL-X、点云）与扩散模型生成能力的结合成为主流范式。DomainShuttle 的 DualRoPE 和 MVTrack4Gen 的 attention 监督分别从架构设计和训练目标角度提升了模型的几何感知能力，而 TryOnCrafter 的 4D Proxy 则展示了如何将 3D 人体表示完整嵌入视频生成流程。对于 music-to-dance 任务，这些技术的迁移路径清晰：DualRoPE 可用于改善参考人物的外观保持，MVTrack4Gen 的对应关系监督可提升舞蹈动作的时序一致性，而 SMPL-X + 3DGS 的 4D 表示则为相机可控的舞蹈生成提供了可行框架。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-06-27 | Appearance Preservation & Geometric Consistency: Key Techniques for Cross-Domain Video Generation",
    overview: [
      "DomainShuttle proposes Domain-MoT and DualRoPE to achieve high-fidelity appearance preservation and cross-domain flexibility in subject-driven video generation",
      "MVTrack4Gen leverages multi-view point tracking as geometric supervision signals, significantly improving geometric consistency in camera-controlled video generation",
      "TryOnCrafter constructs a renderable 4D Try-on Proxy combining SMPL-X driving with 3DGS, providing precise geometric anchors for human video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Subject-Driven Video Generation",
        title: "DomainShuttle: High-Fidelity Cross-Domain Subject-Driven Video Generation",
        description: "DomainShuttle addresses the trade-off between appearance preservation and generation flexibility in subject-driven video generation through three core techniques. Domain-MoT (Mixture-of-Transformers) decouples video latents and reference image features into independent processing paths, injecting domain attribute information via domain-aware AdaLN in the reference branch to achieve explicit separation of content and domain features. Video-Reference DualRoPE allocates reference image tokens to a RoPE space fully decoupled from video tokens, explicitly separating different subjects in latent space while pulling representations of the same subject closer. Cross-Pair Consistent Loss forces the model to extract shared features from multiple reference sets of the same video, suppressing overfitting to redundant single-frame features. Experiments show 18.7% improvement in Cross-Domain Score over SOTA while maintaining high subject consistency in in-domain scenarios.",
        keyPoints: [
          "Domain-MoT achieves decoupling through independent QKV projections and RoPE, with domain-aware AdaLN supporting explicit injection and replacement of domain attributes",
          "DualRoPE assigns reference images to independent RoPE space (temporal index fixed at 0), enabling precise subject-level spatial distance modeling",
          "Cross-Pair Consistent Loss uses contrast between learnable and frozen branches to force extraction of intrinsic subject features invariant to viewpoint, lighting, and motion blur"
        ],
        href: "https://arxiv.org/abs/2606.26058",
        paperLink: "DomainShuttle: Freeform Open Domain Subject-driven Text-to-video Generation",
      },
      {
        num: 2,
        tag: "Novel-View Video Generation",
        title: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
        description: "MVTrack4Gen addresses geometric consistency and motion fidelity in camera-controlled video generation by using multi-view point tracking as auxiliary supervision. The authors discover that DiT's 3D attention layers naturally encode intra-video temporal and inter-video cross-view correspondence information, which becomes simultaneously prominent in intermediate layers. When dynamic objects exhibit geometric or motion inconsistencies, attention maps at these layers show incorrect cross-view correspondences. Based on this, MVTrack4Gen builds a multi-view tracking head on selected attention layers using local 4D correlation volumes for point tracking, jointly trained with the diffusion model. Multi-view correspondence loss applies cross-entropy objectives directly to attention maps, encouraging each query token in target views to attend to ground-truth corresponding locations. This method achieves consistent improvements on both ReCamMaster and Redirector backbones, reaching SOTA geometric consistency on DAVIS and iPhone benchmarks.",
        keyPoints: [
          "Intermediate 3D attention layers simultaneously encode temporal and cross-view correspondences, with correspondence quality directly determining output geometric consistency",
          "Multi-view tracking head builds local 4D correlation volumes from attention layer query/key features to predict multi-view point trajectories",
          "Multi-view correspondence loss directly supervises attention maps, enabling geometric-aware feature learning without explicit 3D reconstruction"
        ],
        href: "https://arxiv.org/abs/2606.26087",
        paperLink: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
      },
      {
        num: 3,
        tag: "4D Human Video Generation",
        title: "TryOnCrafter: Camera-Controllable Video Virtual Try-on via Renderable 4D Proxy",
        description: "TryOnCrafter extends video virtual try-on (VVT) to camera-controllable scenarios (CaM-VVT), solving the limitation of traditional methods constrained by input camera trajectories. The method constructs a Renderable 4D Try-on Proxy, distilling high-quality 2D try-on priors into a 3DGS-based clothed avatar driven by SMPL-X sequences. The key innovation is anchor-based alignment: using human components of dynamic point clouds as geometric anchors, SMPL-X sequences estimated in camera space are mapped to world space metric scales through confidence-aware point-to-surface alignment optimization, resolving scale ambiguity in monocular reconstruction. Proxy-Anchored Video DiT uses rendered proxy sequences as primary geometric anchors, combining source video features and text conditions to generate final videos. This framework supports high-fidelity try-on under arbitrary camera trajectories and naturally enables downstream applications including human relocalization, 'bullet time' effects, and 360-degree orbital viewing.",
        keyPoints: [
          "Anchor-based alignment uses dynamic point cloud human components as geometric anchors, aligning SMPL-X from camera space to world space via similarity transformation",
          "3DGS-based clothed avatar distills 2D try-on priors, combined with SMPL-X driving to achieve high-fidelity texture density and motion integrity",
          "Proxy-Anchored DiT uses rendered proxy as geometric anchor, ensuring generated results are strictly constrained by physically plausible deformations and target camera trajectories"
        ],
        href: "https://arxiv.org/abs/2606.26092",
        paperLink: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "DanceOPD: On-Policy Generative Field Distillation for Flow Matching",
        tag: "Flow Matching",
        href: "https://arxiv.org/abs/2606.27377",
        description: "Proposes on-policy generative field distillation framework unifying multiple capabilities (T2I, editing) as velocity fields over shared flow state space, distilling via student model's own rollout states.",
      },
      {
        num: 5,
        title: "ViQ: Text-Aligned Visual Quantized Representations at Any Resolution",
        tag: "Visual Representation",
        href: "https://arxiv.org/abs/2606.27313",
        description: "Two-stage quantization learning (text-aligned pretraining + feature discretization) with proximal representation learning and position-aware head-wise quantization, achieving 20%-70% multimodal training acceleration.",
      },
      {
        num: 6,
        title: "PhysiFormer: Learning to Simulate Mechanics in World Space",
        tag: "Physics Simulation",
        href: "https://arxiv.org/abs/2606.27364",
        description: "Models vertex trajectory prediction as single denoising diffusion process directly in world coordinates without explicit rigidity/causality inductive biases, trained on 100k+ simulated trajectories.",
      },
      {
        num: 7,
        title: "MusicJudge: Music-Aware Framework for Singing Performance Evaluation",
        tag: "Music Understanding",
        href: "https://arxiv.org/abs/2606.26451",
        description: "Modality-guided LoRA for ASR fine-tuning with multi-signal matching combining semantic embeddings, lexical similarity and phonetic alignment for block-level multimodal analysis.",
      },
      {
        num: 8,
        title: "Neural Voxel Dynamics: Learning Implicit 3D Physics via Volumetric Feature Advection",
        tag: "3D Dynamics",
        href: "https://arxiv.org/abs/2606.26410",
        description: "Lifts V-JEPA features to 3D voxel latent space, learning action-conditioned state transition operators via volumetric feature advection for unified simulation of heterogeneous physics.",
      },
    ],
    observation: "This week's papers show a clear technical convergence trend: in subject-driven and camera-controllable video generation tasks, the combination of explicit geometric representations (3DGS, SMPL-X, point clouds) with diffusion model generation capabilities has become the mainstream paradigm. DomainShuttle's DualRoPE and MVTrack4Gen's attention supervision improve models' geometric awareness from architectural design and training objective perspectives respectively, while TryOnCrafter's 4D Proxy demonstrates how to fully embed 3D human representations into the video generation pipeline. For music-to-dance tasks, the migration paths for these technologies are clear: DualRoPE can improve reference subject appearance preservation, MVTrack4Gen's correspondence supervision can enhance temporal consistency of dance motions, and the SMPL-X + 3DGS 4D representation provides a viable framework for camera-controllable dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-27`,
        'en': `/en/daily/music-to-dance/2026-06-27`,
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
      date="2026-06-27"
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
