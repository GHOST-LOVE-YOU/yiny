import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '扩散模型蒸馏加速与视觉条件表示优化',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'PDM解决CFG蒸馏中的NBA问题，提升推理稳定性',
      'PDD实现4-8步快速视频生成，保持多样性',
      'Wonder的稀疏记忆机制解决长序列一致性',
      'VIPE通过视觉提示工程提升生成质量',
      'Mage-VL的codec-native编码减少75% token消耗',
    ],
    papers: [
      {
        num: 1,
        tag: 'CFG蒸馏 · 阿里巴巴',
        title: 'Rethinking Classifier-Free Guidance in On-Policy Diffusion Distillation',
        keyPoints: [
          '发现传统CFG-based OPD的Negative Branch Asymmetry (NBA)问题：正负分支误差在组合预测中相互抵消，导致训练时隐藏的误差在推理时暴露',
          '提出Positive-Direction Matching (PDM)：分别约束正分支预测和CFG条件方向，消除误差补偿自由度',
          '在dense-to-sparse视频控制任务上验证：PDM对推理guidance scale变化具有鲁棒性，而naive matching在γ偏离训练值时性能急剧下降',
        ],
        description: '这篇论文直击扩散模型蒸馏中的核心问题。当前music-to-dance方案依赖CFG进行条件控制，但如果在蒸馏学生模型时采用传统的guided velocity matching，会引入NBA问题：正负分支的误差在训练时相互抵消，导致推理时guidance scale稍有变化就产生明显质量下降。PDM通过分离约束正分支预测和条件方向，从根本上消除了这种误差补偿机制。对于需要实时推理的舞蹈生成任务，这意味着可以在更宽的guidance scale范围内保持稳定的生成质量。',
        href: 'https://arxiv.org/abs/2607.24731',
      },
      {
        num: 2,
        tag: '并行解码蒸馏 · NVIDIA',
        title: 'Parallel Decoding Distillation for Fast Image and Video Generation',
        keyPoints: [
          '提出Parallel Decoding Distillation (PDD)：单次网络前向预测多个去噪步骤的平均速度，实现4-8 NFE的SOTA视频生成',
          '避免VSD和对抗损失，使用纯回归目标，训练更稳定且保持生成多样性',
          '在Wan2.1 14B上4 NFE达到SOTA，在LTX-2.3上8 NFE生成10秒720p视频，显著优于DMD2和AnyFlow',
        ],
        description: 'PDD为实时舞蹈视频生成提供了可行的加速路径。它通过并行解码将NFE降至4-8步，同时保持甚至提升视频质量。关键创新在于预测块内多步的平均速度而非单步速度，从而避免传统方法中的模式坍塌。对于music-to-dance任务，PDD可替换现有DDIM采样器，在保持音频-运动对齐质量的同时将推理速度提升数倍。',
        href: 'https://arxiv.org/abs/2607.26004',
      },
      {
        num: 3,
        tag: '视频世界模型 · Adobe Research',
        title: 'Wonder: Video World Model Done Better',
        keyPoints: [
          '提出像素空间坐标场相机条件表示：通过渲染合成3D场景将相机运动转换为像素对齐的视觉线索',
          '稀疏全保真记忆机制：使用轻量级池化查询-键摘要选择相关历史块，保持长程一致性同时控制延迟',
          '实现16 FPS实时生成长达数分钟的视频，支持图像和视频条件两种探索模式',
        ],
        description: 'Wonder的系统设计对舞蹈视频生成有重要借鉴意义。其像素空间坐标场将相机控制转化为视觉证据，这种思路可迁移到音频条件控制。稀疏记忆机制通过选择性关注历史KV缓存中的相关块，在保持长程时间一致性的同时避免注意力成本随序列长度增长，可缓解长舞蹈视频中的动作漂移和身份不一致。',
        href: 'https://arxiv.org/abs/2607.26037',
      },
      {
        num: 4,
        tag: '视觉提示工程 · Google DeepMind',
        title: 'Visual prompt engineering for video models',
        keyPoints: [
          '提出Visual Prompt Engineering (VIPE)：通过图像编辑模型自动修改输入视觉提示以提升视频模型推理性能',
          '发现视频模型系统性地偏好照片级真实感输入而非抽象输入，sketch基准可能低估模型能力',
          '在VPCT物理推理任务上，VIPE使Wan2.2从接近随机提升到显著优于随机，Veo 3.1从41.3%提升到59.3%',
        ],
        description: 'VIPE的发现对参考人物图的外观迁移有重要启发。如果参考图质量不佳或偏离训练分布，生成效果会明显下降。通过图像编辑模型预处理参考图，例如增强光照、统一风格和去除噪声，可以提升视频生成质量。music-to-dance可在预处理阶段统一参考人物图的风格和质量，使外观迁移更稳定。',
        href: 'https://arxiv.org/abs/2607.25537',
      },
      {
        num: 5,
        tag: 'Codec-Native VLM · Microsoft',
        title: 'Mage-VL: An Efficient Codec-Native Streaming Multimodal Foundation Model',
        keyPoints: [
          '提出Mage-ViT tokenizer：利用运动向量和残差能量选择性编码动态区域，减少75%视觉token消耗',
          '基于I-frame和P-frame的稀疏编码策略，在16×16 patch级别保留时空上下文',
          '在560M图像和100M视频帧上从头训练，性能匹敌数十亿图像-文本对训练的编码器',
        ],
        description: 'Mage-VL的codec-native编码策略为音频-视频联合建模提供了效率优化方向。它通过运动向量选择动态区域进行编码，将token数量减少75%同时保留关键信息。类似策略可用于音频-运动对齐：在节拍变化或运动幅度较大的时刻密集采样，在静态或重复动作时段稀疏采样，以降低计算成本并保持时序对齐。',
        href: 'https://arxiv.org/abs/2607.24904',
      },
    ],
    worthReading: [
      { num: 1, title: 'Dual Inversion for Text-to-Image Diffusion Models', tag: '图像反演 · ACM MM', href: 'https://arxiv.org/abs/2607.26735', description: '联合恢复语义提示和潜在噪声的两阶段反演方法，可用于参考人物图的精确反演以提升外观迁移一致性。' },
      { num: 2, title: 'ThinkOmni: A Reasoning-Driven Omni-Modal LLM Framework for Audio Forgery Detection', tag: '音频-视觉推理 · ACM MM', href: 'https://arxiv.org/abs/2607.26553', description: '音频-视觉联合推理框架，其时序定位机制对音频驱动的舞蹈生成有启发。' },
      { num: 3, title: 'StructureGS: Structure-aware Gaussian Splatting for Articulated Object Reconstruction', tag: '关节物体重建 · ECCV', href: 'https://arxiv.org/abs/2607.26889', description: '关节物体重建的3D Gaussian Splatting方法，可借鉴用于人体姿态和运动的结构化建模。' },
      { num: 4, title: 'Explicit Layer Modeling for Video Object Insertion and Layer Decomposition', tag: '显式层建模', href: 'https://arxiv.org/abs/2607.25802', description: '显式层建模的扩散框架，可用于舞蹈视频的人物-背景分离和合成。' },
      { num: 5, title: 'OmniDelta: Skill-Driven Budget Allocation for Token Compression in OmniLLMs', tag: 'Token压缩', href: 'https://arxiv.org/abs/2607.25669', description: '跨模态token预算分配策略，对音频-视频联合建模的推理优化有参考价值。' },
      { num: 6, title: 'Temporal-Distance JEPA: Plan-Aware Representation Learning', tag: '时序表示学习', href: 'https://arxiv.org/abs/2607.25337', description: '时间距离学习的JEPA方法，可用于舞蹈动作的长期时序一致性建模。' },
      { num: 7, title: 'OmniScope: Modality-Decoupled Token Compression for Omnimodal LLMs', tag: '解耦压缩', href: 'https://arxiv.org/abs/2607.23193', description: '音频-视频解耦压缩策略，对music-to-dance的长序列推理优化有借鉴意义。' },
      { num: 8, title: 'Mitigating Compounding Error via Video Representation Regularization', tag: '误差累积缓解', href: 'https://arxiv.org/abs/2607.27036', description: '视频表示正则化方法可缓解舞蹈视频长序列生成的误差累积问题。' },
    ],
    observation: '今日论文呈现出两个值得关注的趋势。首先是扩散模型蒸馏加速的系统性进展：PDD和PDM分别从并行解码和分支感知监督两个角度解决实时生成瓶颈，两者结合可能实现4-8步的高质量视频生成。其次是视觉条件表示的重新思考：Wonder的像素空间坐标场和VIPE的视觉提示工程表明，将控制信号转化为视觉证据而非抽象特征，可以提升生成质量和可控性。对music-to-dance而言，音频条件不应只作为特征注入，还应探索可直接感知的视觉运动线索。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Diffusion Distillation Acceleration and Visual Conditioning Optimization',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'PDM resolves negative-branch asymmetry in CFG distillation for more stable inference',
      'PDD delivers diverse, high-quality video generation in 4-8 denoising steps',
      'Wonder uses sparse memory to preserve long-range consistency',
      'VIPE improves generation quality through visual prompt engineering',
      'Mage-VL cuts visual token usage by 75% with codec-native encoding',
    ],
    papers: [
      {
        num: 1,
        tag: 'CFG Distillation · Alibaba',
        title: 'Rethinking Classifier-Free Guidance in On-Policy Diffusion Distillation',
        keyPoints: [
          'Identifies Negative Branch Asymmetry in CFG-based on-policy distillation, where positive and negative branch errors cancel during training but surface at inference time',
          'Introduces Positive-Direction Matching, which separately constrains the positive prediction and CFG conditional direction',
          'Shows robust dense-to-sparse video control when the inference guidance scale differs from the training scale',
        ],
        description: 'This work addresses a central weakness in diffusion distillation for conditioned generation. Conventional guided velocity matching can hide opposing errors between the CFG branches, making a distilled model brittle when guidance changes. PDM removes that compensation freedom. For real-time dance generation, it enables stable quality across a wider guidance range without excessive sensitivity to a single training-time setting.',
        href: 'https://arxiv.org/abs/2607.24731',
      },
      {
        num: 2,
        tag: 'Parallel Decoding Distillation · NVIDIA',
        title: 'Parallel Decoding Distillation for Fast Image and Video Generation',
        keyPoints: [
          'Predicts the average velocity across multiple denoising steps in one forward pass, reaching state-of-the-art video quality at 4-8 NFE',
          'Uses a stable regression objective without VSD or adversarial losses while retaining generation diversity',
          'Reaches strong 4-NFE results on Wan2.1 14B and generates 10-second 720p clips at 8 NFE on LTX-2.3',
        ],
        description: 'PDD provides a practical acceleration route for interactive dance video generation. Predicting a block-level average velocity reduces sampling to 4-8 model evaluations while avoiding the mode collapse seen in several aggressive distillation methods. It could replace a multi-step DDIM sampler while preserving audio-motion alignment and substantially reducing latency.',
        href: 'https://arxiv.org/abs/2607.26004',
      },
      {
        num: 3,
        tag: 'Video World Model · Adobe Research',
        title: 'Wonder: Video World Model Done Better',
        keyPoints: [
          'Represents camera conditions as pixel-aligned coordinate fields rendered from synthetic 3D scenes',
          'Selects relevant historical blocks with lightweight pooled query-key summaries while retaining full-fidelity sparse memory',
          'Generates explorable videos lasting minutes at 16 FPS from either image or video conditions',
        ],
        description: 'Wonder offers two useful ideas for dance generation. Pixel-space conditions turn abstract controls into visual evidence, a principle that may also help represent beats and motion cues. Its sparse memory selects only relevant history from the KV cache, preserving long-range consistency without attention cost growing with the entire sequence and reducing identity or motion drift in long clips.',
        href: 'https://arxiv.org/abs/2607.26037',
      },
      {
        num: 4,
        tag: 'Visual Prompt Engineering · Google DeepMind',
        title: 'Visual prompt engineering for video models',
        keyPoints: [
          'Uses an image editing model to rewrite visual prompts before video-model inference',
          'Finds that video models systematically perform better on photorealistic inputs than abstract sketches',
          'Raises Veo 3.1 accuracy on the VPCT physical reasoning task from 41.3% to 59.3%',
        ],
        description: 'VIPE suggests that reference-image preparation is part of the generation system rather than a neutral input step. Relighting, denoising, and style normalization can move a portrait closer to the video model training distribution. A music-to-dance pipeline can use this preprocessing to make appearance transfer more stable and less dependent on the raw reference quality.',
        href: 'https://arxiv.org/abs/2607.25537',
      },
      {
        num: 5,
        tag: 'Codec-Native VLM · Microsoft',
        title: 'Mage-VL: An Efficient Codec-Native Streaming Multimodal Foundation Model',
        keyPoints: [
          'Uses motion vectors and residual energy to encode dynamic regions selectively, reducing visual tokens by 75%',
          'Preserves spatiotemporal context at 16x16 patch granularity with I-frame and P-frame sparse encoding',
          'Matches much larger encoders after training on 560M images and 100M video frames',
        ],
        description: 'Mage-VL points to a more efficient way to process long audio-video sequences. Motion-vector-guided encoding spends tokens on changing regions while compressing static content. The same allocation principle can emphasize strong beat changes and large movements, then sample repeated or static motion more sparsely, reducing compute while preserving temporal alignment.',
        href: 'https://arxiv.org/abs/2607.24904',
      },
    ],
    worthReading: [
      { num: 1, title: 'Dual Inversion for Text-to-Image Diffusion Models', tag: 'Image Inversion · ACM MM', href: 'https://arxiv.org/abs/2607.26735', description: 'A two-stage method that recovers both semantic prompts and latent noise, useful for precise inversion of reference portraits and consistent appearance transfer.' },
      { num: 2, title: 'ThinkOmni: A Reasoning-Driven Omni-Modal LLM Framework for Audio Forgery Detection', tag: 'Audio-Visual Reasoning · ACM MM', href: 'https://arxiv.org/abs/2607.26553', description: 'Its joint audio-visual reasoning and temporal localization mechanisms may inform audio-driven dance generation.' },
      { num: 3, title: 'StructureGS: Structure-aware Gaussian Splatting for Articulated Object Reconstruction', tag: 'Articulated Reconstruction · ECCV', href: 'https://arxiv.org/abs/2607.26889', description: 'Structure-aware Gaussian Splatting for articulated objects offers ideas for structured human pose and motion modeling.' },
      { num: 4, title: 'Explicit Layer Modeling for Video Object Insertion and Layer Decomposition', tag: 'Explicit Layer Modeling', href: 'https://arxiv.org/abs/2607.25802', description: 'An explicit layered diffusion framework that could support foreground-background separation and compositing in dance videos.' },
      { num: 5, title: 'OmniDelta: Skill-Driven Budget Allocation for Token Compression in OmniLLMs', tag: 'Token Compression', href: 'https://arxiv.org/abs/2607.25669', description: 'Cross-modal token budget allocation provides a useful reference for efficient joint audio-video inference.' },
      { num: 6, title: 'Temporal-Distance JEPA: Plan-Aware Representation Learning', tag: 'Temporal Representation', href: 'https://arxiv.org/abs/2607.25337', description: 'Temporal-distance representation learning may improve long-horizon consistency in generated dance motion.' },
      { num: 7, title: 'OmniScope: Modality-Decoupled Token Compression for Omnimodal LLMs', tag: 'Decoupled Compression', href: 'https://arxiv.org/abs/2607.23193', description: 'Modality-decoupled audio-video compression offers ideas for efficient long-sequence music-to-dance inference.' },
      { num: 8, title: 'Mitigating Compounding Error via Video Representation Regularization', tag: 'Compounding Error', href: 'https://arxiv.org/abs/2607.27036', description: 'Video representation regularization can reduce error accumulation during long-horizon dance video generation.' },
    ],
    observation: 'Two trends stand out. First, diffusion distillation is becoming systematic: PDD attacks latency through parallel decoding while PDM stabilizes branch-aware supervision, and the combination could support high-quality generation in 4-8 steps. Second, visual conditioning is being reconsidered. Wonder and VIPE both show that controls represented as visual evidence can be more effective than abstract feature injection. For music-to-dance systems, audio should not only enter as a feature stream; it may also be translated into visual motion cues the model can consume directly.',
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
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/music-to-dance/2026-07-29',
        en: '/en/daily/music-to-dance/2026-07-29',
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
      date="2026-07-29"
      roleId="music-to-dance"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
      <MustRead>
        {c.papers.map(paper => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <KeyPoints points={paper.keyPoints} />
            <p className="text-[#2C2C24] leading-relaxed">{paper.description}</p>
            <PaperLink href={paper.href} title={paper.title} />
          </Paper>
        ))}
      </MustRead>

      <WorthReading>
        {c.worthReading.map(item => (
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

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
