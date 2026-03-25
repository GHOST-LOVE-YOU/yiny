import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "单流架构与流形感知：音视频生成的新范式",
    overview: [
      "daVinci-MagiHuman 以单流 Transformer 统一处理音频-视频生成，简化架构同时提升同步精度",
      "SAGE-GRPO 提出流形感知探索策略，解决视频生成 RL 训练中的不稳定性问题",
      "LumosX 的关系型注意力机制为参考人物图的身份保持提供了新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "音视频生成",
        title: "daVinci-MagiHuman：单流架构实现快速音频-视频联合生成",
        description: "daVinci-MagiHuman 提出了一种简洁的单流 Transformer 架构，将文本、视频和音频统一处理为单一 token 序列，完全通过自注意力机制实现多模态融合。这种设计摒弃了复杂的多流或交叉注意力架构，却在人类-centric 生成场景（包括面部表情、语音-口型协调、身体运动和音视频同步）表现出色。特别值得关注的是其「Sandwich Architecture」设计：首尾 4 层使用模态特定的投影和归一化参数，中间 32 层共享主 Transformer 参数，既保留了模态敏感处理，又实现了深层多模态融合。此外，该模型采用无显式 timestep 嵌入的设计，模型直接从输入中推断去噪状态。在推理优化方面，结合模型蒸馏、潜空间超分辨率和 Turbo VAE 解码器，可在单张 H100 上 2 秒生成 5 秒 256p 视频。对于 music-to-dance 任务，这种单流架构可直接迁移用于统一处理音频节拍和舞蹈动作生成，避免复杂的跨模态对齐模块设计。",
        keyPoints: [
          "单流 Transformer 架构：统一处理文本、视频、音频 token，仅通过自注意力实现多模态融合，避免复杂的多流设计",
          "Sandwich 布局：首尾层模态特定处理，中间层共享参数，兼顾模态敏感性与深层融合",
          "高效推理：结合 DMD-2 蒸馏、潜空间超分辨率和 Turbo VAE，实现 2 秒生成 5 秒视频"
        ],
        href: "https://arxiv.org/abs/2603.21986",
        paperLink: "Speed by Simplicity: A Single-Stream Architecture for Fast Audio-Video Generative Foundation Model",
      },
      {
        num: 2,
        tag: "强化学习",
        title: "SAGE-GRPO：流形感知探索稳定视频生成 RL 训练",
        description: "SAGE-GRPO 针对视频生成中 GRPO 强化学习训练的不稳定性问题，提出将预训练模型视为定义有效视频数据流形 M，核心问题转化为约束探索在流形邻域内进行。在微观层面，论文推导了精确流形感知 SDE，通过对数曲率校正项 log((1-σ_{t+Δt})/(1-σ_t)) 替代传统一阶近似，使探索噪声更贴近真实流形；同时引入梯度范数均衡器（Gradient Norm Equalizer），解决扩散过程中高噪声区梯度消失、低噪声区梯度爆炸导致的优化不平衡问题。在宏观层面，提出双信任域（Dual Trust Region）策略：周期性移动锚点（Periodical Moving Anchor）每 N 步更新参考策略，使信任域中心始终靠近流形一致策略；结合步进式 KL 约束限制参数更新幅度，形成位置-速度联合控制。在 HunyuanVideo1.5 上的实验表明，SAGE-GRPO 在 VQ、MQ、TA 和视觉指标上均优于 DanceGRPO、FlowGRPO 和 CPS 基线。对于 music-to-dance 任务，SAGE-GRPO 可用于稳定音频-运动对齐的后训练优化，避免因探索噪声过大导致的生成质量下降。",
        keyPoints: [
          "精确流形感知 SDE：通过对数曲率校正替代一阶近似，使探索噪声更贴近数据流形",
          "梯度范数均衡器：平衡不同 timestep 的优化压力，避免高/低噪声区的梯度失衡",
          "双信任域策略：周期性移动锚点 + 步进式 KL 约束，防止长程漂移同时保持可塑性"
        ],
        href: "https://arxiv.org/abs/2603.21872",
        paperLink: "Manifold-Aware Exploration for Reinforcement Learning in Video Generation",
      },
      {
        num: 3,
        tag: "个性化生成",
        title: "LumosX：关系型注意力实现身份-属性精确绑定",
        description: "LumosX 针对多主体个性化视频生成中的身份-属性对齐难题，提出了一套数据+模型的完整解决方案。在数据侧，通过 MLLM 从独立视频中提取显式的人脸-属性依赖关系，构建带关系先验的训练数据；在模型侧，设计关系型自注意力（Relational Self-Attention）和关系型交叉注意力（Relational Cross-Attention）。R2PE（关系型旋转位置编码）将主体 ID 编码进位置嵌入，CSAM（因果自注意力掩码）确保时序一致性，MCAM（多级交叉注意力掩码）则增强组内一致性、抑制组间干扰。这种显式绑定机制使得模型能够精确区分「左边穿黑衬衫的男人」和「右边戴黑帽子的男人」等易混淆描述。对于 music-to-dance 任务，LumosX 的关系型注意力机制可直接用于参考人物图与生成舞蹈视频之间的身份保持，解决 patch-shuffling 策略中可能出现的身份漂移问题，确保生成视频中的人物外观与参考图高度一致。",
        keyPoints: [
          "关系型自注意力：R2PE 将主体 ID 嵌入位置编码，CSAM 保证时序因果性",
          "关系型交叉注意力：MCAM 多级掩码增强组内一致、抑制组间干扰",
          "数据管道创新：利用 MLLM 自动构建带显式人脸-属性对应关系的训练数据"
        ],
        href: "https://arxiv.org/abs/2603.20192",
        paperLink: "LumosX: Relate Any Identities with Their Attributes for Personalized Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Omni-WorldBench：4D 世界模型的交互-centric 评估基准",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2603.22212",
        description: "首个系统评估世界模型交互响应能力的基准，提出 4D 生成范式，对舞蹈视频的时序一致性和动作响应评估有参考价值。",
      },
      {
        num: 5,
        title: "Geometric Latent Diffusion：几何基础模型的多视角扩散",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2603.22275",
        description: "利用几何基础模型的几何一致特征空间作为扩散潜空间，训练加速 4.4 倍，可用于改进舞蹈生成中的视角一致性。",
      },
      {
        num: 6,
        title: "SpatialBoost：语言引导的 3D 空间感知增强",
        tag: "视觉表征",
        href: "https://arxiv.org/abs/2603.22057",
        description: "通过多轮 CoT 推理将 3D 空间知识注入视觉编码器，ADE20K mIoU 从 55.9 提升至 59.7，可用于增强舞蹈动作的空间理解。",
      },
      {
        num: 7,
        title: "WorldCache：视频世界模型的内容感知缓存加速",
        tag: "推理加速",
        href: "https://arxiv.org/abs/2603.22286",
        description: "感知约束的动态缓存框架，在 Cosmos-Predict2.5-2B 上实现 2.3 倍加速同时保持 99.4% 质量，可用于提升 music-to-dance 推理速度。",
      },
      {
        num: 8,
        title: "Universal Normal Embedding：生成与编码的共享潜空间",
        tag: "理论基础",
        href: "https://arxiv.org/abs/2603.21786",
        description: "提出生成模型与视觉编码器共享高斯-like 潜空间几何的假设，为理解扩散模型潜空间结构提供理论视角。",
      },
    ],
    observation: "本周论文呈现出「简化架构 + 精细化控制」的双重趋势。一方面，daVinci-MagiHuman 用单流 Transformer 替代复杂的多流设计，证明简洁架构在音视频生成中的有效性；另一方面，SAGE-GRPO 和 LumosX 分别在训练稳定性和身份保持上引入精细化的流形感知和关系型注意力机制。这种「大道至简，细节至臻」的范式对 music-to-dance 任务有重要启示：核心架构应追求简洁统一（单流处理音频-运动），而关键挑战（身份保持、时序一致性）则需针对性的精细设计。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Single-Stream Architecture & Manifold Awareness: New Paradigms for Audio-Video Generation",
    overview: [
      "daVinci-MagiHuman unifies audio-video generation with a single-stream Transformer, simplifying architecture while improving synchronization",
      "SAGE-GRPO proposes manifold-aware exploration to stabilize RL training for video generation",
      "LumosX's relational attention mechanisms offer new insights for identity preservation in reference image conditioning"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Video Generation",
        title: "daVinci-MagiHuman: Single-Stream Architecture for Fast Audio-Video Joint Generation",
        description: "daVinci-MagiHuman proposes a streamlined single-stream Transformer architecture that processes text, video, and audio as a unified token sequence, achieving multi-modal fusion purely through self-attention. This design eliminates complex multi-stream or cross-attention architectures while excelling in human-centric generation scenarios including facial expressions, speech-lip coordination, body motion, and audio-video synchronization. Notably, the 'Sandwich Architecture' uses modality-specific projections in the first/last 4 layers while sharing main Transformer parameters across the middle 32 layers, preserving modality-sensitive processing while enabling deep multi-modal fusion. The model also adopts timestep-free denoising, inferring the denoising state directly from inputs. Combined with model distillation, latent-space super-resolution, and Turbo VAE decoder, it generates 5-second 256p videos in 2 seconds on a single H100. For music-to-dance tasks, this single-stream architecture can be directly adapted to unify audio beat and dance motion generation, avoiding complex cross-modal alignment modules.",
        keyPoints: [
          "Single-stream Transformer: Unified processing of text, video, and audio tokens through self-attention only",
          "Sandwich layout: Modality-specific processing at boundaries, shared parameters in middle layers",
          "Efficient inference: DMD-2 distillation, latent super-resolution, and Turbo VAE enable 2-second generation"
        ],
        href: "https://arxiv.org/abs/2603.21986",
        paperLink: "Speed by Simplicity: A Single-Stream Architecture for Fast Audio-Video Generative Foundation Model",
      },
      {
        num: 2,
        tag: "Reinforcement Learning",
        title: "SAGE-GRPO: Manifold-Aware Exploration Stabilizes Video Generation RL Training",
        description: "SAGE-GRPO addresses instability in GRPO-based RL training for video generation by treating the pre-trained model as defining a valid video data manifold M, formulating the core problem as constraining exploration within the manifold's vicinity. At the micro level, it derives a precise manifold-aware SDE with logarithmic curvature correction log((1-σ_{t+Δt})/(1-σ_t)) replacing first-order approximations, keeping exploration noise closer to the true manifold. A Gradient Norm Equalizer addresses the inherent signal-to-noise imbalance across timesteps. At the macro level, a Dual Trust Region strategy combines Periodical Moving Anchor (updating reference policy every N steps) with stepwise KL constraints, forming position-velocity joint control. Experiments on HunyuanVideo1.5 show consistent gains over DanceGRPO, FlowGRPO, and CPS baselines. For music-to-dance tasks, SAGE-GRPO can stabilize post-training optimization of audio-motion alignment, avoiding quality degradation from excessive exploration noise.",
        keyPoints: [
          "Precise manifold-aware SDE: Logarithmic curvature correction keeps exploration noise manifold-aligned",
          "Gradient Norm Equalizer: Balances optimization pressure across timesteps",
          "Dual Trust Region: Moving anchors + stepwise KL constraints prevent long-horizon drift"
        ],
        href: "https://arxiv.org/abs/2603.21872",
        paperLink: "Manifold-Aware Exploration for Reinforcement Learning in Video Generation",
      },
      {
        num: 3,
        tag: "Personalized Generation",
        title: "LumosX: Relational Attention for Precise Identity-Attribute Binding",
        description: "LumosX addresses identity-attribute alignment in multi-subject personalized video generation through a complete data+model solution. On the data side, MLLMs extract explicit face-attribute dependencies from independent videos. On the model side, Relational Self-Attention (with R2PE encoding subject IDs into positional embeddings and CSAM ensuring temporal causality) and Relational Cross-Attention (with MCAM enhancing intra-group consistency while suppressing inter-group interference) explicitly encode face-attribute bindings. This enables precise distinction between descriptions like 'man in black shirt on the left' vs 'man with black cap on the right'. For music-to-dance tasks, LumosX's relational attention can directly preserve identity between reference images and generated dance videos, solving identity drift issues in patch-shuffling strategies.",
        keyPoints: [
          "Relational Self-Attention: R2PE embeds subject IDs, CSAM ensures temporal causality",
          "Relational Cross-Attention: MCAM enhances intra-group consistency, suppresses inter-group interference",
          "Data pipeline innovation: MLLM-based construction of training data with explicit face-attribute correspondences"
        ],
        href: "https://arxiv.org/abs/2603.20192",
        paperLink: "LumosX: Relate Any Identities with Their Attributes for Personalized Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Omni-WorldBench: Interaction-Centric Evaluation for 4D World Models",
        tag: "World Models",
        href: "https://arxiv.org/abs/2603.22212",
        description: "First benchmark systematically evaluating interactive response capabilities of world models, proposes 4D generation paradigm relevant for dance video temporal consistency assessment.",
      },
      {
        num: 5,
        title: "Geometric Latent Diffusion: Multi-view Diffusion with Geometric Foundation Models",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2603.22275",
        description: "Uses geometrically consistent feature space of geometric foundation models as latent space, achieving 4.4x training speedup, applicable for improving view consistency in dance generation.",
      },
      {
        num: 6,
        title: "SpatialBoost: Language-Guided 3D Spatial Awareness Enhancement",
        tag: "Visual Representation",
        href: "https://arxiv.org/abs/2603.22057",
        description: "Injects 3D spatial knowledge into vision encoders via multi-turn CoT reasoning, improving ADE20K mIoU from 55.9 to 59.7, useful for enhancing spatial understanding of dance motions.",
      },
      {
        num: 7,
        title: "WorldCache: Content-Aware Caching for Video World Model Acceleration",
        tag: "Inference Acceleration",
        href: "https://arxiv.org/abs/2603.22286",
        description: "Perception-constrained dynamic caching achieves 2.3x speedup on Cosmos-Predict2.5-2B while preserving 99.4% quality, applicable for accelerating music-to-dance inference.",
      },
      {
        num: 8,
        title: "Universal Normal Embedding: Shared Latent Space for Generation and Encoding",
        tag: "Theoretical Foundation",
        href: "https://arxiv.org/abs/2603.21786",
        description: "Proposes hypothesis that generative models and vision encoders share Gaussian-like latent geometry, providing theoretical perspective on diffusion model latent structure.",
      },
    ],
    observation: "This week's papers show a dual trend of 'simplified architecture + refined control'. On one hand, daVinci-MagiHuman replaces complex multi-stream designs with a single-stream Transformer, demonstrating the effectiveness of simple architectures in audio-video generation. On the other hand, SAGE-GRPO and LumosX introduce refined manifold-aware and relational attention mechanisms for training stability and identity preservation. This 'simplicity in core, refinement in details' paradigm offers important insights for music-to-dance tasks: the core architecture should pursue unified simplicity (single-stream audio-motion processing), while key challenges (identity preservation, temporal consistency) require targeted refined designs.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-24`,
        'en': `/en/daily/music-to-dance/2026-03-24`,
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
      date="2026-03-24"
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