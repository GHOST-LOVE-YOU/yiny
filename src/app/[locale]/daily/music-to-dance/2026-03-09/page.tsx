import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究者",
    title: "物理一致性视频生成与身份保持技术的新进展",
    overview: [
      "物理模拟器嵌入扩散流程成为解决视频生成中运动不自然问题的新范式",
      "非对称身份保持注意力机制实现了大视角变化下的全身一致性",
      "语义-视觉双路径引导为参考视频驱动的风格迁移提供了可扩展方案"
    ],
    papers: [
      {
        num: 1,
        tag: "物理一致性生成",
        title: "PSIVG：将物理模拟器嵌入视频扩散流程",
        description: "PSIVG 提出了一种全新的物理一致性视频生成范式，通过将物理模拟器嵌入扩散模型的推理流程，解决了现有视频生成模型中物体运动违反物理规律（如重力、惯性、碰撞）的普遍问题。该方法首先使用预训练视频生成器产出模板视频，然后通过 4D 感知流程重建前景物体的 3D mesh 和场景几何，初始化 MPM 物理模拟器进行前向仿真，获得物理上合理的物体轨迹。\n\n对于 music-to-dance 任务，舞蹈动作的自然性和物理合理性至关重要。PSIVG 的核心价值在于其 Test-Time Texture Consistency Optimization (TTCO) 技术——通过优化可学习的文本嵌入和特征，使生成视频更紧密地跟随物理模拟器提供的像素对应关系，从而在物体运动和旋转过程中保持纹理一致性。这一技术可直接迁移到舞蹈视频生成中，解决当前方案中人物外观在动态变化时的闪烁和不一致问题。此外，论文提出的 4D 感知流程（包括 InstantMesh 重建、ViPE 4D 重建、SuperGlue 特征匹配）为从参考图像恢复可驱动的人体 3D 表示提供了完整的技术路径。",
        keyPoints: [
          "首次实现无需训练、在推理时将物理模拟器与视频扩散模型桥接的框架",
          "TTCO 测试时优化技术可在不重新训练模型的情况下显著提升运动物体的纹理一致性",
          "4D 感知流程提供了从 2D 视频恢复 3D 场景几何和动态信息的完整方案，可迁移到人体重建"
        ],
        href: "https://arxiv.org/abs/2603.06408",
        paperLink: "Physical Simulator In-the-Loop Video Generation",
      },
      {
        num: 2,
        tag: "身份保持生成",
        title: "WildActor：无约束视角下的全身身份保持视频生成",
        description: "WildActor 针对现有人物视频生成方法普遍存在的两大问题——面部中心偏见（忽视身体一致性）和姿态锁定（导致复制粘贴式伪影）——提出了系统性的解决方案。论文构建了 Actor-18M 数据集，包含 160 万视频和 1800 万对应人物图像，涵盖任意视角和规范三视图表示，为学习视角不变的人物表示提供了大规模监督。\n\n核心技术包括非对称身份保持注意力（AIPA）和视角自适应蒙特卡洛采样。AIPA 通过单向信息流机制（视频 token 查询身份线索，参考 token 与噪声骨干特征隔离）避免了身份信息泄露导致的姿态锁定问题；配套的 I-RoPE 通过时空坐标偏移区分视频 token 和参考 token。视角自适应采样则通过动态重加权策略，在训练时抑制相邻视角的冗余采样，鼓励互补视角覆盖，使模型能够观察身份流形的更均匀分布。\n\n对于 music-to-dance 任务，WildActor 的技术可直接应用于解决参考人物外观迁移中的视角变化问题。当前方案在处理大视角变化（如从正面参考图生成侧面舞蹈动作）时经常出现身份漂移，AIPA 的非对称注意力机制和 Actor-18M 的多视角监督数据为解决这一问题提供了可直接借鉴的方案。",
        keyPoints: [
          "Actor-18M 是首个大规模野外人体视频数据集，提供跨视角、环境、动作的密集身份监督",
          "非对称身份保持注意力（AIPA）通过参考专属 LoRA 和单向注意力流解决了身份泄露导致的姿态锁定",
          "视角自适应蒙特卡洛采样通过角度邻域抑制机制鼓励训练时的互补视角覆盖"
        ],
        href: "https://arxiv.org/abs/2603.00586",
        paperLink: "WildActor: Unconstrained Identity-Preserving Video Generation",
      },
      {
        num: 3,
        tag: "参考驱动生成",
        title: "EffectMaker：统一推理与生成的视觉特效定制框架",
        description: "EffectMaker 提出了一种参考视频驱动的视觉特效迁移新范式，通过多模态大语言模型（MLLM）与扩散 Transformer 的协同，实现了无需逐效果微调的开放集 VFX 生成。该方法的核心创新是语义-视觉双路径引导机制：MLLM 负责理解参考视频中的高层语义并推理如何将其适配到目标主体，DiT 则通过 in-context learning 捕获参考视频中的细粒度视觉线索。\n\n技术实现上，EffectMaker 采用解耦交叉注意力机制分别处理语义理解特征（MLLM 最后一层隐藏状态）和语义推理特征（自回归预测的文本 token 序列），同时通过双流自注意力机制实现参考视频与目标视频的联合处理。Biased RoPE 通过时序维度偏移区分参考视频和目标视频的位置编码空间。\n\n对于 music-to-dance 任务，EffectMaker 的范式具有重要的迁移价值。当前的舞蹈风格迁移通常需要针对每种风格单独训练 LoRA，而 EffectMaker 展示的参考视频驱动、无需微调的风格迁移能力可直接应用于舞蹈动作风格迁移——给定一段参考舞蹈视频和一张目标人物图像，即可生成该人物执行相同风格舞蹈的视频。论文构建的 EffectData（13 万视频、3000 类特效）也为构建舞蹈风格数据集提供了参考。",
        keyPoints: [
          "首个统一 MLLM 推理能力与 DiT 生成能力的视觉特效框架，无需逐效果微调",
          "语义-视觉双路径引导机制结合高层语义理解和细粒度视觉线索捕获",
          "解耦交叉注意力和双流自注意力实现了参考视频与目标生成的有效解耦与信息融合"
        ],
        href: "https://arxiv.org/abs/2603.06014",
        paperLink: "EffectMaker: Unifying Reasoning and Generation for Customized Visual Effect Creation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "DC-DiT：动态分块扩散 Transformer",
        tag: "高效推理",
        href: "https://arxiv.org/abs/2603.06351",
        description: "根据图像内容自适应分配计算资源，将均匀区域压缩为更少 token、细节区域保留更多 token，对提升舞蹈视频生成的推理效率有潜在借鉴意义。",
      },
      {
        num: 5,
        title: "WorldCache：异构 Token 缓存加速世界模型",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2603.06331",
        description: "针对扩散世界模型的异构 token 缓存框架，可在不训练的情况下实现 3.7 倍端到端加速，对长视频生成场景有参考价值。",
      },
      {
        num: 6,
        title: "iFID：使重建 FID 可预测扩散生成质量",
        tag: "评估指标",
        href: "https://arxiv.org/abs/2603.05630",
        description: "提出插值 FID（iFID）与扩散模型生成 FID 强相关（Pearson ~0.85），为舞蹈视频生成评估提供了更可靠的指标选择。",
      },
      {
        num: 7,
        title: "Penguin-VL：基于 LLM 的视觉编码器探索 VLM 效率极限",
        tag: "视觉表征",
        href: "https://arxiv.org/abs/2603.06569",
        description: "用纯文本 LLM 初始化的视觉编码器保留细粒度时空线索，在视频理解任务上超越 CLIP/SigLIP 初始化，对舞蹈动作细节感知有启发。",
      },
    ],
    observation: "今日论文呈现出两个值得关注的趋势。一是物理一致性正在从「后处理修正」转向「生成流程嵌入」——PSIVG 将物理模拟器直接嵌入扩散推理流程，代表了视频生成从追求视觉真实感向追求物理真实感演进的重要方向。对于舞蹈生成而言，这意味着未来可能通过人体动力学模拟器来约束生成过程，从根本上解决舞蹈动作不自然的问题。二是身份保持技术从「面部中心」向「全身一致」扩展——WildActor 的非对称注意力机制和 Actor-18M 的多视角数据集为处理大视角变化下的身份保持提供了新思路，这对于舞蹈视频中常见的全身运动和视角变化场景尤为关键。",
  },
  en: {
    roleName: "Music-to-Dance Researcher",
    title: "Advances in Physics-Consistent Video Generation and Identity Preservation",
    overview: [
      "Embedding physical simulators into diffusion pipelines emerges as a new paradigm for addressing unnatural motion in video generation",
      "Asymmetric identity-preserving attention enables full-body consistency under large viewpoint variations",
      "Semantic-visual dual-path guidance provides a scalable solution for reference video-driven style transfer"
    ],
    papers: [
      {
        num: 1,
        tag: "Physics-Consistent Generation",
        title: "PSIVG: Embedding Physical Simulators into Video Diffusion Pipelines",
        description: "PSIVG introduces a novel paradigm for physics-consistent video generation by embedding a physical simulator into the diffusion model's inference pipeline. This addresses the widespread issue in current video generation models where object motion violates physical laws such as gravity, inertia, and collision. The method first generates a template video using a pre-trained video generator, then reconstructs 3D meshes of foreground objects and scene geometry through a 4D perception pipeline, initializes an MPM physics simulator for forward simulation, and obtains physically plausible object trajectories.\n\nFor music-to-dance tasks, the naturalness and physical plausibility of dance movements are crucial. PSIVG's core value lies in its Test-Time Texture Consistency Optimization (TTCO) technique—by optimizing learnable text embeddings and features, the generated video more closely follows pixel correspondences provided by the physical simulator, thereby maintaining texture consistency during object movement and rotation. This technique can be directly transferred to dance video generation to solve the flickering and inconsistency issues of human appearance during dynamic changes in current approaches. Additionally, the paper's 4D perception pipeline (including InstantMesh reconstruction, ViPE 4D reconstruction, and SuperGlue feature matching) provides a complete technical path for recovering drivable 3D human representations from reference images.",
        keyPoints: [
          "First training-free framework that bridges physical simulators with video diffusion models at inference time",
          "TTCO test-time optimization significantly improves texture consistency of moving objects without model retraining",
          "4D perception pipeline provides a complete solution for recovering 3D scene geometry and dynamics from 2D video, transferable to human reconstruction"
        ],
        href: "https://arxiv.org/abs/2603.06408",
        paperLink: "Physical Simulator In-the-Loop Video Generation",
      },
      {
        num: 2,
        tag: "Identity-Preserving Generation",
        title: "WildActor: Unconstrained Identity-Preserving Video Generation",
        description: "WildActor addresses two prevalent issues in existing human video generation methods—face-centric bias (neglecting body consistency) and pose locking (leading to copy-paste artifacts)—through systematic solutions. The paper constructs the Actor-18M dataset, comprising 1.6M videos and 18M corresponding human images covering arbitrary viewpoints and canonical three-view representations, providing large-scale supervision for learning view-invariant human representations.\n\nCore technologies include Asymmetric Identity-Preserving Attention (AIPA) and Viewpoint-Adaptive Monte Carlo Sampling. AIPA avoids pose-locking artifacts caused by identity leakage through a unidirectional information flow mechanism (video tokens query identity cues while reference tokens are isolated from noisy backbone features); the accompanying I-RoPE distinguishes video tokens from reference tokens through spatiotemporal coordinate shifts. Viewpoint-adaptive sampling encourages complementary viewpoint coverage during training by dynamically reweighting and suppressing redundant sampling of adjacent viewpoints, enabling the model to observe a more uniform distribution of the identity manifold.\n\nFor music-to-dance tasks, WildActor's technology can be directly applied to solve viewpoint variation issues in reference person appearance transfer. Current approaches frequently experience identity drift when handling large viewpoint changes (e.g., generating side-view dance motions from frontal reference images), and AIPA's asymmetric attention mechanism combined with Actor-18M's multi-view supervision data provides directly adaptable solutions to this problem.",
        keyPoints: [
          "Actor-18M is the first large-scale in-the-wild human video dataset providing dense identity supervision across viewpoints, environments, and motions",
          "Asymmetric Identity-Preserving Attention (AIPA) solves pose-locking caused by identity leakage through reference-only LoRA and unidirectional attention flow",
          "Viewpoint-Adaptive Monte Carlo Sampling encourages complementary viewpoint coverage during training through angular neighborhood suppression"
        ],
        href: "https://arxiv.org/abs/2603.00586",
        paperLink: "WildActor: Unconstrained Identity-Preserving Video Generation",
      },
      {
        num: 3,
        tag: "Reference-Driven Generation",
        title: "EffectMaker: Unified Reasoning and Generation for Visual Effect Customization",
        description: "EffectMaker proposes a new paradigm for reference video-driven visual effect transfer through the collaboration of multimodal large language models (MLLM) and diffusion Transformers, achieving open-set VFX generation without per-effect fine-tuning. The core innovation is the semantic-visual dual-path guidance mechanism: MLLM comprehends high-level semantics from reference videos and reasons how to adapt them to target subjects, while DiT captures fine-grained visual cues from reference videos through in-context learning.\n\nTechnically, EffectMaker employs decoupled cross-attention mechanisms to process semantic understanding features (MLLM's last-layer hidden states) and semantic reasoning features (autoregressively predicted text token sequences) separately, while enabling joint processing of reference and target videos through a dual-stream self-attention mechanism. Biased RoPE distinguishes the positional encoding spaces of reference and target videos through temporal dimension offsets.\n\nFor music-to-dance tasks, EffectMaker's paradigm has significant transfer value. Current dance style transfer typically requires training separate LoRAs for each style, while EffectMaker's demonstrated reference video-driven, fine-tuning-free style transfer capability can be directly applied to dance motion style transfer—given a reference dance video and a target person image, generate a video of that person performing the same style dance. The EffectData constructed in the paper (130K videos, 3K effect categories) also provides reference for building dance style datasets.",
        keyPoints: [
          "First VFX framework unifying MLLM reasoning capabilities with DiT generation without per-effect fine-tuning",
          "Semantic-visual dual-path guidance combines high-level semantic understanding with fine-grained visual cue capture",
          "Decoupled cross-attention and dual-stream self-attention achieve effective decoupling and information fusion between reference and target generation"
        ],
        href: "https://arxiv.org/abs/2603.06014",
        paperLink: "EffectMaker: Unifying Reasoning and Generation for Customized Visual Effect Creation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "DC-DiT: Dynamic Chunking Diffusion Transformer",
        tag: "Efficient Inference",
        href: "https://arxiv.org/abs/2603.06351",
        description: "Adaptively allocates computational resources based on image content, compressing uniform regions into fewer tokens while preserving more tokens for detailed regions, offering potential insights for improving inference efficiency in dance video generation.",
      },
      {
        num: 5,
        title: "WorldCache: Accelerating World Models via Heterogeneous Token Caching",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2603.06331",
        description: "A heterogeneous token caching framework for diffusion world models that achieves 3.7x end-to-end speedup without training, offering reference value for long video generation scenarios.",
      },
      {
        num: 6,
        title: "iFID: Making Reconstruction FID Predictive of Diffusion Generation Quality",
        tag: "Evaluation Metrics",
        href: "https://arxiv.org/abs/2603.05630",
        description: "Proposes interpolated FID (iFID) that strongly correlates with diffusion model generation FID (Pearson ~0.85), providing a more reliable metric choice for dance video generation evaluation.",
      },
      {
        num: 7,
        title: "Penguin-VL: Exploring VLM Efficiency Limits with LLM-based Vision Encoders",
        tag: "Visual Representation",
        href: "https://arxiv.org/abs/2603.06569",
        description: "Vision encoder initialized from pure text LLM preserves fine-grained spatiotemporal cues, outperforming CLIP/SigLIP initialization on video understanding tasks, offering insights for dance motion detail perception.",
      },
    ],
    observation: "Today's papers reveal two noteworthy trends. First, physical consistency is shifting from 'post-processing correction' to 'generation pipeline embedding'—PSIVG embeds physical simulators directly into the diffusion inference pipeline, representing an important evolution of video generation from pursuing visual realism to pursuing physical realism. For dance generation, this implies that future approaches may constrain the generation process through human dynamics simulators, fundamentally solving the problem of unnatural dance motions. Second, identity preservation technology is expanding from 'face-centric' to 'full-body consistency'—WildActor's asymmetric attention mechanism and Actor-18M's multi-view dataset provide new ideas for handling identity preservation under large viewpoint variations, which is particularly crucial for dance video scenarios involving full-body movements and viewpoint changes.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-09`,
        'en': `/en/daily/music-to-dance/2026-03-09`,
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
      date="2026-03-09"
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