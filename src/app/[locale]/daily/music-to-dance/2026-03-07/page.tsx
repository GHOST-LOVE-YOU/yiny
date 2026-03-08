import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "世界建模与物理动作生成：视频生成的深度理解新路径",
    overview: [
      "DreamWorld 提出统一世界建模框架，通过多源知识融合解决视频生成中的时序一致性问题",
      "RealWonder 实现实时物理动作条件视频生成，为交互式舞蹈生成提供新思路",
      "世界模型正成为视频生成领域的关键技术方向"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型",
        title: "DreamWorld：统一世界建模框架提升视频生成一致性",
        description: "DreamWorld 提出首个统一世界建模框架，将光流时序动力学、DINOv2 语义理解和 VGGT 空间几何三种互补的世界知识整合到视频生成器中。通过联合世界建模范式，模型同时预测视频像素和世界特征，解决了传统视频生成模型仅关注像素级分布匹配而缺乏结构化世界理解的问题。论文提出的 Consistent Constraint Annealing (CCA) 训练策略通过渐进式调节世界知识约束，在保证视觉质量的同时有效吸收世界先验知识。实验表明，DreamWorld 在 VBench 上比 Wan2.1 提升 2.26 分，在时序一致性、语义理解和空间关系方面均有显著改进。对于音乐到舞蹈生成任务，这种统一世界建模方法可直接应用于解决长舞蹈视频生成中的时序一致性问题，通过世界模型预测未来帧状态来减少累积误差。",
        keyPoints: [
          "首创多源世界知识统一框架：同时整合时序动力学、语义一致性和空间几何三种知识",
          "CCA 训练策略：渐进式退火机制平衡知识注入与视觉质量，避免优化不稳定",
          "Multi-Source Inner-Guidance：推理时利用模型自身预测的知识特征引导生成过程"
        ],
        href: "https://arxiv.org/abs/2603.00466",
        paperLink: "DreamWorld: Unified World Modeling in Video Generation",
      },
      {
        num: 2,
        tag: "物理动作生成",
        title: "RealWonder：实时物理动作条件视频生成系统",
        description: "RealWonder 是首个实现实时物理动作条件视频生成的系统，能够以 13.2 FPS 的速度从单张图像生成受 3D 物理动作（力、力场、机器人动作）驱动的视频。核心创新在于将物理模拟作为中间表示桥梁：通过物理模拟器将连续动作转换为光流和 RGB 预览等视觉表示，避免了动作标记化问题，且无需动作-视频配对训练数据。系统包含三个关键组件：单图像 3D 场景重建、实时物理模拟器和基于光流条件的 4 步蒸馏视频生成器。对于音乐到舞蹈生成任务，RealWonder 的动作-视频对齐机制具有重要借鉴意义——可将音频节拍特征类似地转换为中间表示，再驱动视频生成，实现更精确的音频-运动对齐。",
        keyPoints: [
          "物理模拟作为中间表示：将连续 3D 动作转换为光流/RGB，避免标记化难题",
          "实时流式生成：4 步扩散蒸馏实现 13.2 FPS@480×832 的交互式生成速度",
          "多材质支持：统一处理刚体、弹性体、流体和颗粒材料等多种物理材质"
        ],
        href: "https://arxiv.org/abs/2603.05449",
        paperLink: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "Latent Particle World Models：基于粒子的潜在世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2603.04553",
        description: "自监督的以物体为中心的随机动力学建模方法，可用于舞蹈动作序列的随机动力学建模。",
      },
      {
        num: 4,
        title: "HiFi-Inpaint：高保真参考图像修复",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2603.02210",
        description: "基于参考的图像修复技术，可应用于舞蹈视频生成中保持参考人物的外观细节。",
      },
      {
        num: 5,
        title: "AgentVista：多模态智能体评估基准",
        tag: "评估",
        href: "https://arxiv.org/abs/2602.23166",
        description: "超挑战性真实视觉场景中的多模态智能体评估方法，可为舞蹈生成质量评估提供参考。",
      },
    ],
    observation: "本日论文体现了视频生成领域向「深度理解」转型的趋势。DreamWorld 和 RealWonder 分别从「世界知识建模」和「物理动作交互」两个角度突破传统视频生成仅关注视觉质量的局限。对于音乐到舞蹈生成任务，这意味着未来的发展方向可能不仅是追求视觉真实感，更需要建立对舞蹈动作、音乐节奏和人体动力学的深层理解。特别是 RealWonder 的物理模拟中间表示思路，可启发将音频特征通过类似的中间表示（如运动轨迹、节拍模式）来驱动生成，而非直接学习音频到像素的映射。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "World Modeling & Physical Action Generation: New Paths for Deep Video Understanding",
    overview: [
      "DreamWorld proposes a unified world modeling framework that addresses temporal consistency through multi-source knowledge fusion",
      "RealWonder achieves real-time physical action-conditioned video generation, offering new insights for interactive dance generation",
      "World models are becoming a key technical direction in video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model",
        title: "DreamWorld: Unified Framework for World Modeling in Video Generation",
        description: "DreamWorld introduces the first unified world modeling framework that integrates three complementary knowledge sources—optical flow temporal dynamics, DINOv2 semantic understanding, and VGGT spatial geometry—into video generators. Through the Joint World Modeling Paradigm, the model predicts both video pixels and world features simultaneously, addressing the limitation of traditional video generation models that focus solely on pixel-level distribution matching without structured world understanding. The proposed Consistent Constraint Annealing (CCA) training strategy progressively modulates world knowledge constraints to ensure visual quality while effectively absorbing world priors. Experiments show DreamWorld outperforms Wan2.1 by 2.26 points on VBench, with significant improvements in temporal consistency, semantic understanding, and spatial relationships. For music-to-dance generation, this unified world modeling approach can be directly applied to solve temporal consistency issues in long dance video generation by predicting future frame states through world models to reduce accumulated errors.",
        keyPoints: [
          "First unified multi-source world knowledge framework: integrates temporal dynamics, semantic consistency, and spatial geometry",
          "CCA training strategy: progressive annealing mechanism balances knowledge injection with visual quality",
          "Multi-Source Inner-Guidance: leverages model's own predicted knowledge features to guide generation at inference"
        ],
        href: "https://arxiv.org/abs/2603.00466",
        paperLink: "DreamWorld: Unified World Modeling in Video Generation",
      },
      {
        num: 2,
        tag: "Physical Action",
        title: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
        description: "RealWonder is the first system to achieve real-time physical action-conditioned video generation, producing videos driven by 3D physical actions (forces, force fields, robot actions) from a single image at 13.2 FPS. The core innovation uses physics simulation as an intermediate representation bridge: converting continuous actions into visual representations like optical flow and RGB previews through physics simulators, avoiding action tokenization problems and eliminating the need for action-video paired training data. The system comprises three key components: single-image 3D scene reconstruction, real-time physics simulator, and flow-conditioned 4-step distilled video generator. For music-to-dance generation, RealWonder's action-video alignment mechanism offers significant insights—audio beat features could be similarly converted to intermediate representations to drive video generation, achieving more precise audio-motion alignment.",
        keyPoints: [
          "Physics simulation as intermediate representation: converts continuous 3D actions to optical flow/RGB, avoiding tokenization",
          "Real-time streaming generation: 4-step diffusion distillation achieves 13.2 FPS@480×832 interactive speed",
          "Multi-material support: unified handling of rigid bodies, elastic objects, fluids, and granular materials"
        ],
        href: "https://arxiv.org/abs/2603.05449",
        paperLink: "RealWonder: Real-Time Physical Action-Conditioned Video Generation",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "Latent Particle World Models: Particle-based World Modeling",
        tag: "World Model",
        href: "https://arxiv.org/abs/2603.04553",
        description: "Self-supervised object-centric stochastic dynamics modeling for dance motion sequence modeling.",
      },
      {
        num: 4,
        title: "HiFi-Inpaint: High-Fidelity Reference-Based Inpainting",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2603.02210",
        description: "Reference-based inpainting for maintaining character appearance details in dance video generation.",
      },
      {
        num: 5,
        title: "AgentVista: Multimodal Agent Evaluation Benchmark",
        tag: "Evaluation",
        href: "https://arxiv.org/abs/2602.23166",
        description: "Evaluation methods in challenging real visual scenarios for dance generation quality assessment.",
      },
    ],
    observation: "Today's papers reflect the trend toward 'deep understanding' in video generation. DreamWorld and RealWonder break through the limitation of traditional video generation focusing only on visual quality, approaching from 'world knowledge modeling' and 'physical action interaction' respectively. For music-to-dance generation, this suggests future development should not only pursue visual realism but also establish deep understanding of dance movements, musical rhythm, and human body dynamics. Particularly, RealWonder's physics simulation intermediate representation approach could inspire converting audio features through similar intermediate representations (like motion trajectories, beat patterns) to drive generation, rather than directly learning audio-to-pixel mapping.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-07`,
        'en': `/en/daily/music-to-dance/2026-03-07`,
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
      date="2026-03-07"
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
