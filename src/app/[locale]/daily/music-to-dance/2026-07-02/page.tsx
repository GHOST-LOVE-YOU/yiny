import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-07-02 | 轨迹注意力定位与多分辨率流匹配：运动控制与推理加速的新工具",
    overview: [
      "TrajLoc 提出在注意力层中通过高斯热图实现多目标轨迹控制，可直接应用于舞蹈姿态轨迹约束",
      "NeoMap 通过流形交替投影实现无需训练的新视角视频合成，对舞蹈视频视角增强有启发",
      "MrFlow 实现 10 倍加速的多分辨率流匹配生成，可显著降低舞蹈视频生成的推理成本"
    ],
    papers: [
      {
        num: 1,
        tag: "运动控制",
        title: "TrajLoc: 注意力层中的轨迹定位实现多目标运动控制",
        description: "TrajLoc 突破了现有方法将多个轨迹编码到共享密集条件信号的做法，直接在注意力层中用高斯热图替换对象 token 的交叉注意力权重。每个对象由两个专用 token 表示：轨迹 token 编码运动和深度，外观 token 编码首帧视觉身份。该方法在 CogVideoX-5B 和 WaN 2.1-14B 上实现平均 +4.3 dB PSNR 提升和 51% 轨迹终点误差降低，可扩展至 20 个同时控制的对象。",
        keyPoints: [
          "注意力定位机制：用轨迹对齐的高斯热图替换对象 token 的交叉注意力权重列，提供硬空间约束",
          "对象级独立处理：每个对象的运动、身份和空间注意力独立处理，自然扩展到拥挤场景",
          "双 token 条件：轨迹 token 编码 (x, y, d) 时序信息，外观 token 替换类别词保留首帧身份"
        ],
        href: "https://arxiv.org/abs/2607.00861",
        paperLink: "TrajLoc: Trajectory-Attention Localization for Multi-Object Motion Control",
      },
      {
        num: 2,
        tag: "新视角合成",
        title: "NeoMap: 无需训练的单图/视频新视角合成",
        description: "NeoMap 挑战了\"需要修改映射关系或重新训练模型才能获得有效新视角解\"的假设，提出高质量新视角解已存在于预训练视频模型的数据流形中。通过 Anchored Manifold Projection (AMP) 和 Pixel-Constrained Projection (PCP) 的交替迭代，在噪声空间中寻找最优初始点。在 Tanks-and-Temples、LLFF 和 DAVIS 上达到 SOTA，且无需任何任务特定微调。",
        keyPoints: [
          "流形交替投影：AMP 将状态推向自然视频流形以补全不可见区域，PCP 在像素空间强制几何边界",
          "最优噪声初始化：将新视角合成问题转化为寻找最优初始噪声，而非控制去噪轨迹",
          "训练无关：完全基于预训练视频模型，无需相机条件注入或任务特定微调"
        ],
        href: "https://arxiv.org/abs/2607.01962",
        paperLink: "NeoMap: Training-free Novel-View Synthesis from Single Images and Videos",
      },
      {
        num: 3,
        tag: "推理加速",
        title: "MrFlow: 多分辨率流匹配实现 10 倍加速生成",
        description: "MrFlow 提出分阶段低分辨率到高分辨率生成管线：低分辨率快速生成结构 → 像素空间 GAN 超分 → 低强度噪声注入实现高频重采样 → 高分辨率细节精炼。在 FLUX.1-dev 和 Qwen-Image 上实现 10 倍端到端加速，OneIG 指标差距小于 1%。可与 timestep distillation 结合达到 25 倍加速。",
        keyPoints: [
          "像素空间超分：使用 Real-ESRGAN 在像素空间而非潜空间上采样，避免模糊和伪影",
          "低强度噪声注入：σ ∈ [0.1, 0.15] 的噪声降低高频 SNR，使高分辨率流先验能够重采样修正",
          "单步高分辨率精炼：由于接近干净图像端点，高分辨率阶段仅需 1 步即可完成细节精炼"
        ],
        href: "https://arxiv.org/abs/2607.01642",
        paperLink: "Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration via Staged Sampling",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "PixGS: 像素空间扩散直接生成 3D 高斯泼溅",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2607.01803",
        description: "绕过有损潜空间压缩，直接在像素空间去噪 3DGS 属性，单张 A100 上 1 秒推理。对舞蹈人物 3D 化身生成有参考价值。",
      },
      {
        num: 5,
        title: "Ink3D: 利用视频生成模型合成复杂纹理",
        tag: "纹理合成",
        href: "https://arxiv.org/abs/2607.01222",
        description: "OrbitPainter 条件视频生成模型产生密集轨道扫描视频，TextureOptimizer 神经烘焙模块整合多视角观测。对舞蹈视频外观一致性保持有启发。",
      },
      {
        num: 6,
        title: "VideoSearch-R1: 软查询精炼的迭代视频检索",
        tag: "视频检索",
        href: "https://arxiv.org/abs/2607.00446",
        description: "在连续潜空间而非离散文本空间精炼搜索查询 token，使用 GRPO 训练。可用于舞蹈视频中的音乐节拍-动作对齐检索。",
      },
      {
        num: 7,
        title: "Perceive-to-Reason: 感知与推理解耦的细粒度视觉推理",
        tag: "视觉推理",
        href: "https://arxiv.org/abs/2607.01191",
        description: "两阶段框架：先作为 Perceiver 定位问题相关证据，再作为 Reasoner 基于标注图像和裁剪区域回答问题。PRA-GRPO 训练策略对舞蹈动作理解的细粒度分析有借鉴意义。",
      },
      {
        num: 8,
        title: "GEAR: 引导式端到端自回归图像合成",
        tag: "自回归生成",
        href: "https://arxiv.org/abs/2606.32039",
        description: "VQ tokenizer 与 AR 生成器联合端到端训练，通过表示对齐损失引导 tokenizer。对舞蹈视频生成中的视觉 tokenizer 设计有参考价值。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-07-02 | Trajectory-Attention Localization & Multi-Resolution Flow Matching: New Tools for Motion Control and Inference Acceleration",
    overview: [
      "TrajLoc enables multi-object trajectory control via Gaussian heatmaps in attention layers, directly applicable to dance pose trajectory constraints",
      "NeoMap achieves training-free novel-view video synthesis through manifold alternating projection, inspiring dance video viewpoint enhancement",
      "MrFlow delivers 10x accelerated multi-resolution flow matching generation, significantly reducing inference costs for dance video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Control",
        title: "TrajLoc: Trajectory-Attention Localization for Multi-Object Motion Control",
        description: "TrajLoc departs from existing approaches that entangle multiple trajectories within shared dense conditioning signals. It replaces cross-attention weight columns of object tokens with Gaussian heatmaps centered on target locations at every frame. Each object is represented by two dedicated tokens: a trajectory token encoding motion and depth, and an appearance token encoding first-frame visual identity. The method achieves +4.3 dB PSNR gains and 51% trajectory endpoint error reduction on CogVideoX-5B and WaN 2.1-14B, scaling to 20 simultaneously controlled objects.",
        keyPoints: [
          "Attention localization: Replaces object token cross-attention weights with trajectory-aligned Gaussian heatmaps for hard spatial constraints",
          "Object-level independent processing: Each object's motion, identity, and spatial attention handled independently, naturally scaling to crowded scenes",
          "Dual-token conditioning: Trajectory token encodes (x, y, d) temporal information; appearance token replaces category words to preserve first-frame identity"
        ],
        href: "https://arxiv.org/abs/2607.00861",
        paperLink: "TrajLoc: Trajectory-Attention Localization for Multi-Object Motion Control",
      },
      {
        num: 2,
        tag: "Novel View Synthesis",
        title: "NeoMap: Training-free Novel-View Synthesis from Single Images and Videos",
        description: "NeoMap challenges the assumption that valid novel-view solutions require modifying the mapping relation or retraining. It proposes that high-quality solutions already exist in the data manifold of pre-trained video models. Through alternating iterations of Anchored Manifold Projection (AMP) and Pixel-Constrained Projection (PCP), it finds the optimal initial noise in noise space. Achieves SOTA on Tanks-and-Temples, LLFF, and DAVIS without any task-specific fine-tuning.",
        keyPoints: [
          "Manifold alternating projection: AMP pushes state toward natural video manifold for invisible region completion, PCP enforces geometric boundaries in pixel space",
          "Optimal noise initialization: Frames novel-view synthesis as finding optimal initial noise rather than controlling denoising trajectory",
          "Training-free: Entirely based on pre-trained video models, no camera conditioning or task-specific fine-tuning required"
        ],
        href: "https://arxiv.org/abs/2607.01962",
        paperLink: "NeoMap: Training-free Novel-View Synthesis from Single Images and Videos",
      },
      {
        num: 3,
        tag: "Inference Acceleration",
        title: "MrFlow: Multi-Resolution Flow Matching for 10x Accelerated Generation",
        description: "MrFlow proposes a staged low-to-high-resolution pipeline: rapid structure generation at low resolution → GAN super-resolution in pixel space → low-strength noise injection for high-frequency resampling → high-resolution detail refinement. Achieves 10x end-to-end acceleration on FLUX.1-dev and Qwen-Image with <1% OneIG metric gap. Can combine with timestep distillation for 25x acceleration.",
        keyPoints: [
          "Pixel-space super-resolution: Uses Real-ESRGAN to upsample in pixel space rather than latent space, avoiding blurring and artifacts",
          "Low-strength noise injection: σ ∈ [0.1, 0.15] noise reduces high-frequency SNR, enabling high-resolution flow prior to resample and correct",
          "Single-step high-resolution refinement: Due to proximity to clean image endpoint, high-resolution stage completes with just 1 step"
        ],
        href: "https://arxiv.org/abs/2607.01642",
        paperLink: "Multi-Resolution Flow Matching: Training-Free Diffusion Acceleration via Staged Sampling",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "PixGS: Pixel-Space Diffusion for Direct 3D Gaussian Splat Generation",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2607.01803",
        description: "Bypasses lossy latent compression by directly denoising 3DGS attributes in pixel space. 1-second inference on single A100. Relevant for 3D avatar generation of dance characters.",
      },
      {
        num: 5,
        title: "Ink3D: Sculpting 3D Assets with Extremely Complex Textures via Video Generative Models",
        tag: "Texture Synthesis",
        href: "https://arxiv.org/abs/2607.01222",
        description: "OrbitPainter conditional video generative model produces dense orbit-scan videos; TextureOptimizer neural baking integrates multi-view observations. Offers insights for appearance consistency in dance videos.",
      },
      {
        num: 6,
        title: "VideoSearch-R1: Iterative Video Retrieval via Soft Query Refinement",
        tag: "Video Retrieval",
        href: "https://arxiv.org/abs/2607.00446",
        description: "Refines search query tokens in continuous latent space rather than discrete text space, trained with GRPO. Applicable to music beat-action alignment retrieval in dance videos.",
      },
      {
        num: 7,
        title: "Perceive-to-Reason: Decoupling Perception and Reasoning for Fine-Grained Visual Reasoning",
        tag: "Visual Reasoning",
        href: "https://arxiv.org/abs/2607.01191",
        description: "Two-stage framework: first localizes question-relevant evidence as Perceiver, then answers as Reasoner based on annotated image and cropped regions. PRA-GRPO training offers insights for fine-grained dance motion analysis.",
      },
      {
        num: 8,
        title: "GEAR: Guided End-to-End AutoRegression for Image Synthesis",
        tag: "Autoregressive Generation",
        href: "https://arxiv.org/abs/2606.32039",
        description: "Joint end-to-end training of VQ tokenizer and AR generator with representation alignment loss. Relevant for visual tokenizer design in dance video generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-02`,
        'en': `/en/daily/music-to-dance/2026-07-02`,
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
      date="2026-07-02"
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
