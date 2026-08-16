import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "音频-视频联合表征与扩散模型优化",
    overview: [
      "OmniVAE 提出首个音频-视频联合VAE，通过细粒度跨模态对齐解决音视频同步难题",
      "Sol-Attn 实现无需训练的动态稀疏注意力，视频生成推理速度提升2倍以上",
      "PDM 揭示CFG蒸馏中的负分支不对称问题，为条件控制提供更稳定的训练目标",
      "ID-V2V 将身份保持解耦为视频重光照与编辑合成，为人物外观保持提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "跨模态表征",
        title: "OmniVAE：首个音频-视频联合VAE实现细粒度跨模态对齐",
        description: "现有音视频生成系统通常使用独立训练的VAE，导致两个潜在空间缺乏跨模态对齐，下游生成模型必须从零学习同步。OmniVAE 是首个专为跨模态潜在对齐设计的音频-视频VAE，通过两个互补的训练目标实现统一表征：模态特定的语义蒸馏将Qwen3-Omni的预训练编码器知识注入各模态潜在空间；片段级双向InfoNCE对比学习在细粒度时间粒度上对齐音视频潜在表示。实验表明，这两个目标分别提升单模态可学习性和跨模态同步精度，结合后下游T2AV生成质量显著提升。对于music-to-dance任务，OmniVAE的对齐方法可直接迁移到音频-动作对齐场景，解决当前3D Audio Attention在细粒度节拍同步上的局限。",
        keyPoints: [
          "首个音频-视频联合VAE，通过语义蒸馏+对比学习实现跨模态潜在空间对齐",
          "片段级双向InfoNCE在1/6秒粒度上捕捉时序-语义对应关系",
          "训练目标不增加推理开销，对比头和蒸馏投影器在推理时丢弃",
          "下游T2AV生成中，OmniVAE在Desync、LSE-C等同步指标上显著优于独立VAE基线"
        ],
        href: "https://arxiv.org/abs/2607.23855",
        paperLink: "OmniVAE: An Audio-Video VAE with Cross-Modal Alignment for Joint Generation",
      },
      {
        num: 2,
        tag: "推理加速",
        title: "Sol-Attn：动态稀疏注意力实现视频生成2.1倍加速",
        description: "扩散Transformer已成为视频生成的主流架构，但长序列带来的二次方注意力复杂度成为推理瓶颈。现有无训练稀疏注意力方法存在两个局限：路由策略僵化（top-k固定预算或top-p动态但不平衡）且需要物化完整代理分数图；丢弃未选中块导致激进稀疏下精度损失。Sol-Attn提出在线softmax中的动态阈值路由：基于代理分数的高斯分布特性，用均值+β倍标准差作为查询相关阈值，实现动态但可控的块预算。核心创新包括：on-the-fly块阈值比较避免物化代理图；重用低于阈值的代理分数近似未选中块的贡献。在LTX 2.3、Wan等模型上，Sol-Attn实现视频生成2.1倍、视频编辑2.3倍端到端加速，与Sol-Engine其他优化结合可达5倍加速。对于music-to-dance的实时应用或长视频生成，Sol-Attn提供了即插即用的加速方案。",
        keyPoints: [
          "基于高斯分布假设的查询相关阈值路由，β参数控制模型级平均稀疏度",
          "on-the-fly阈值比较嵌入online softmax，避免物化N×N代理分数图",
          "重用低于阈值的代理分数进行零阶近似，恢复未选中块的贡献",
          "LTX 2.3视频生成2.1倍加速，Bernini视频编辑2.3倍加速，视觉质量无损"
        ],
        href: "https://arxiv.org/abs/2607.24027",
        paperLink: "Sol-Attn: Accelerating Video Generation Inference via On-the-Fly Attention Sparsification",
      },
      {
        num: 3,
        tag: "扩散蒸馏",
        title: "PDM：解决CFG蒸馏中的负分支不对称问题",
        description: "On-policy蒸馏(OPD)通过在策略生成的轨迹上匹配教师速度来适应扩散模型，但如何与CFG结合尚不明确。现有方法直接匹配CFG组合后的速度预测，但论文证明该目标在分支层面是欠识别的：正负分支误差可以在组合预测中相互补偿。当教师负分支包含学生无法获取的特权信息时，会出现「负分支不对称」(NBA)现象——正分支误差减小而负分支误差增大，这种对抗性动态在训练尺度被隐藏，但在推理尺度变化时暴露。PDM(Positive-Direction Matching)通过分别约束正预测和CFG条件方向(v+ - v-)来解决此问题。在密集到稀疏视频控制任务上，naive匹配对推理尺度高度敏感，而PDM在姿态、深度、涂鸦等多种控制模态上实现更稳健的知识迁移。对于music-to-dance中的音频条件控制，PDM提供了更稳定的CFG蒸馏训练目标。",
        keyPoints: [
          "揭示CFG组合匹配目标的欠识别性：γe+ + (1-γ)e- = 0 允许无限多非零误差对",
          "定义负分支不对称(NBA)：特权负条件下naive匹配诱导对抗性分支误差动态",
          "PDM分别匹配正预测和CFG条件方向，消除跨分支误差补偿",
          "密集到稀疏视频控制任务上，PDM在姿态/深度/涂鸦模态均优于naive匹配"
        ],
        href: "https://arxiv.org/abs/2607.24731",
        paperLink: "Rethinking Classifier-Free Guidance in On-Policy Diffusion Distillation",
      },
      {
        num: 4,
        tag: "身份保持",
        title: "ID-V2V：解耦身份保持与编辑驱动的视频风格化",
        description: "身份保持视频风格化旨在将编辑关键帧指定的场景、光照、风格变化传播到整个源视频，同时严格保持面部相似性和表演细节。核心挑战是缺乏大规模配对训练数据。ID-V2V的关键洞察是将身份保持解耦为两个子问题：编辑驱动的合成应保持对编辑关键帧的灵活性；源视频 grounded 的身份保持应严格约束。论文观察到在身份保持风格化下，面部结构和表情应保持不变，光照是主要允许的变化。因此将身份保持建模为视频重光照问题，编辑传播建模为受控视频合成。具体实现中，从训练视频提取重光照面部区域和面部法线图作为身份保持控制信号，第一帧和深度序列作为编辑驱动合成信号。这种设计允许从单个视频构建配对监督。实验表明ID-V2V在面部相似性和细粒度表演保持上显著优于现有方法，支持单/多主体场景。对于music-to-dance的参考人物图保持，其重光照+法线图的约束思路可直接迁移。",
        keyPoints: [
          "将身份保持解耦为视频重光照（不变性）和编辑驱动合成（灵活性）",
          "重光照面部区域+面部法线图约束身份，编辑关键帧+深度序列驱动合成",
          "从单视频构建训练对，避免稀缺的真实世界配对数据",
          "在面部相似性和表演保持上显著优于基于landmark或embedding的基线"
        ],
        href: "https://arxiv.org/abs/2607.22830",
        paperLink: "ID-V2V: Identity-Preserving Video Restylization",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "JarvisHub：Canvas-native多模态创意Agent框架",
        tag: "创意Agent",
        href: "https://arxiv.org/abs/2607.23588",
        description: "将可编辑画布作为Agent工作空间、外部记忆和动作空间，支持长程多模态创作中的迭代规划和人工干预。对dance视频生成的交互式编辑有参考价值。",
      },
      {
        num: 6,
        title: "FilmBench：电影级视频生成评估基准",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2607.24241",
        description: "基于专业电影语言的T2V和R2V基准，包含20种电影类型的1056个多镜头提示。评估维度包括动态美学、镜头语言等，可为dance视频质量评估提供新维度。",
      },
      {
        num: 7,
        title: "DreamStyle3D：解耦双交叉注意力的3D风格化生成",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2607.24721",
        description: "通过解耦双交叉注意力机制分离几何和风格特征，10秒内生成高质量风格化3D资产。其几何-外观解耦思路可能适用于3D人体姿态和外观分离控制。",
      },
      {
        num: 8,
        title: "音频Token时间定位的机理分析",
        tag: "音频理解",
        href: "https://arxiv.org/abs/2607.25355",
        description: "通过查询条件token语义、校准token读出等分析，揭示微调后音频token的层间语义和解码器可访问性变化。对理解音频-动作对齐的底层原理有帮助。",
      },
      {
        num: 9,
        title: "GraphIDyOM：音乐期望建模的图原生Python实现",
        tag: "音乐建模",
        href: "https://arxiv.org/abs/2607.25787",
        description: "将IDyOM模型的长短时记忆表示为显式图对象，支持音乐期望的不确定性估计。可用于分析音乐节拍结构，辅助dance生成中的节拍对齐。",
      },
    ],
    observation: "",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Audio-Video Joint Representation & Diffusion Model Optimization",
    overview: [
      "OmniVAE proposes the first audio-video joint VAE with fine-grained cross-modal alignment for AV synchronization",
      "Sol-Attn achieves training-free dynamic sparse attention, delivering 2x+ speedup for video generation inference",
      "PDM reveals the Negative Branch Asymmetry problem in CFG distillation, providing more stable training objectives",
      "ID-V2V decouples identity preservation into video relighting and edit synthesis, offering new insights for appearance consistency"
    ],
    papers: [
      {
        num: 1,
        tag: "Cross-Modal Representation",
        title: "OmniVAE: First Audio-Video Joint VAE for Fine-Grained Cross-Modal Alignment",
        description: "Existing audio-video generation systems typically use independently trained VAEs, causing misalignment between latent spaces and forcing downstream generators to learn synchronization from scratch. OmniVAE is the first audio-video VAE explicitly designed for cross-modal latent alignment. It achieves unified representation through two complementary objectives: modality-specific semantic distillation injects knowledge from frozen Qwen3-Omni encoders into each latent space; segment-level bidirectional InfoNCE contrastive learning aligns audio and video latents at fine temporal granularity. Experiments show these objectives improve single-modality learnability and cross-modal synchronization respectively, with combined training delivering significant quality gains in downstream T2AV generation. For music-to-dance tasks, OmniVAE's alignment approach can be directly transferred to audio-motion alignment scenarios, addressing current limitations of 3D Audio Attention in fine-grained beat synchronization.",
        keyPoints: [
          "First audio-video joint VAE achieving cross-modal latent space alignment via semantic distillation + contrastive learning",
          "Segment-level bidirectional InfoNCE captures temporal-semantic correspondence at 1/6-second granularity",
          "Training objectives incur no inference overhead; contrastive heads and distillation projectors discarded at inference",
          "In downstream T2AV generation, OmniVAE significantly outperforms independent VAE baselines on Desync, LSE-C sync metrics"
        ],
        href: "https://arxiv.org/abs/2607.23855",
        paperLink: "OmniVAE: An Audio-Video VAE with Cross-Modal Alignment for Joint Generation",
      },
      {
        num: 2,
        tag: "Inference Acceleration",
        title: "Sol-Attn: Dynamic Sparse Attention for 2.1x Video Generation Speedup",
        description: "Diffusion transformers have become the foundation of video generation, but quadratic attention complexity with long sequences creates inference bottlenecks. Existing training-free sparse attention methods suffer from two limitations: rigid routing strategies (fixed-budget top-k or dynamic but unbalanced top-p) requiring materialization of full proxy score maps; lossy keep-or-drop sparsification degrading accuracy under aggressive sparsity. Sol-Attn proposes dynamic threshold routing within online softmax: leveraging Gaussian distribution properties of proxy scores, it uses mean+β×std as query-dependent thresholds for dynamic yet controllable block budgets. Core innovations include: on-the-fly block threshold comparison avoiding proxy map materialization; reusing below-threshold proxy scores to approximate contributions from unselected blocks. On LTX 2.3, Wan and other models, Sol-Attn delivers 2.1x end-to-end speedup for video generation and 2.3x for video editing, reaching 5x when combined with other Sol-Engine optimizations. For real-time or long-video music-to-dance applications, Sol-Attn provides a plug-and-play acceleration solution.",
        keyPoints: [
          "Query-dependent threshold routing based on Gaussian assumption, with β controlling model-level mean sparsity",
          "On-the-fly threshold comparison embedded in online softmax, avoiding materialization of N×N proxy score maps",
          "Zero-order approximation using below-threshold proxy scores to recover contributions from skipped blocks",
          "2.1x speedup on LTX 2.3 video generation, 2.3x on Bernini video editing, with no visual quality degradation"
        ],
        href: "https://arxiv.org/abs/2607.24027",
        paperLink: "Sol-Attn: Accelerating Video Generation Inference via On-the-Fly Attention Sparsification",
      },
      {
        num: 3,
        tag: "Diffusion Distillation",
        title: "PDM: Addressing Negative Branch Asymmetry in CFG Distillation",
        description: "On-policy distillation (OPD) adapts diffusion models by matching teacher velocities on student-generated trajectories, but how to combine with CFG remains unclear. Existing methods directly match CFG-composed velocity predictions, but this paper proves the objective is under-identified at branch level: positive and negative branch errors can compensate in the composed prediction. When teacher negative branches contain privileged information unavailable to students, 'Negative Branch Asymmetry' (NBA) occurs—positive branch error decreases while negative branch error increases. This antagonistic dynamic is hidden at training scale but exposed when inference scale changes. PDM (Positive-Direction Matching) resolves this by separately constraining positive predictions and CFG conditional directions (v+ - v-). On dense-to-sparse video control tasks, naive matching is highly sensitive to inference scales, while PDM enables more robust knowledge transfer across pose, depth, and scribble control modalities. For audio-conditioned control in music-to-dance, PDM provides a more stable CFG distillation training objective.",
        keyPoints: [
          "Reveals under-identification of CFG-composed matching: γe+ + (1-γ)e- = 0 admits infinitely many non-zero error pairs",
          "Defines Negative Branch Asymmetry (NBA): naive matching induces antagonistic branch-error dynamics under privileged negative conditioning",
          "PDM matches positive predictions and CFG conditional directions separately, eliminating cross-branch error compensation",
          "On dense-to-sparse video control, PDM outperforms naive matching across pose/depth/scribble modalities"
        ],
        href: "https://arxiv.org/abs/2607.24731",
        paperLink: "Rethinking Classifier-Free Guidance in On-Policy Diffusion Distillation",
      },
      {
        num: 4,
        tag: "Identity Preservation",
        title: "ID-V2V: Decoupling Identity Preservation from Edit-Driven Video Synthesis",
        description: "Identity-preserving video restylization aims to propagate scene, lighting, and style changes specified by an edited keyframe across a source video while strictly preserving facial likeness and performance details. The core challenge is lack of large-scale paired training data. ID-V2V's key insight is decoupling identity preservation into two sub-problems: edit-driven synthesis should remain flexible to the edited keyframe; source-grounded identity preservation should be tightly constrained. The paper observes that under identity-preserving restylization, facial structure and expression should remain invariant, with illumination being the primary permissible variation. Thus identity preservation is modeled as video relighting, while edit propagation is modeled as controlled video synthesis. Specifically, relit facial regions and facial normal maps extracted from training videos serve as identity-preserving control signals, while first frames and depth sequences drive edit-conditioned synthesis. This design enables constructing paired supervision from single videos. Experiments show ID-V2V significantly outperforms existing methods in facial similarity and fine-grained performance preservation, supporting single/multi-subject scenarios. For reference image preservation in music-to-dance, its relighting+normal map constraint approach can be directly transferred.",
        keyPoints: [
          "Decouples identity preservation into video relighting (invariance) and edit-driven synthesis (flexibility)",
          "Relit facial regions + facial normal maps constrain identity; edited keyframes + depth sequences drive synthesis",
          "Constructs training pairs from single videos, avoiding scarce real-world paired data",
          "Significantly outperforms landmark-based or embedding-based baselines in facial similarity and performance preservation"
        ],
        href: "https://arxiv.org/abs/2607.22830",
        paperLink: "ID-V2V: Identity-Preserving Video Restylization",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "JarvisHub: Canvas-Native Multimodal Creative Agent Framework",
        tag: "Creative Agent",
        href: "https://arxiv.org/abs/2607.23588",
        description: "Uses editable canvas as agent workspace, external memory and action space, supporting iterative planning and human intervention in long-horizon multimodal creation. Relevant for interactive editing in dance video generation.",
      },
      {
        num: 6,
        title: "FilmBench: Film-Grade Benchmark for Cinematic Video Generation",
        tag: "Evaluation Benchmark",
        href: "https://arxiv.org/abs/2607.24241",
        description: "T2V and R2V benchmark based on professional cinematic language, covering 20 film genres with 1,056 multi-shot prompts. Evaluation dimensions include dynamic aesthetics and cinematography, offering new perspectives for dance video quality assessment.",
      },
      {
        num: 7,
        title: "DreamStyle3D: 3D Stylization via Decoupled Dual Cross-Attention",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2607.24721",
        description: "Separates geometric and stylistic features via decoupled dual cross-attention, generating high-quality stylized 3D assets in 10 seconds. Its geometry-appearance decoupling approach may apply to 3D human pose and appearance separation control.",
      },
      {
        num: 8,
        title: "Mechanistic Understanding of Audio Tokens for Temporal Grounding",
        tag: "Audio Understanding",
        href: "https://arxiv.org/abs/2607.25355",
        description: "Analyzes layerwise semantics and decoder accessibility of audio tokens after fine-tuning through query-conditioned semantics and calibrated readout. Helps understand underlying mechanisms of audio-motion alignment.",
      },
      {
        num: 9,
        title: "GraphIDyOM: Graph-Native Python Reimplementation of IDyOM",
        tag: "Music Modeling",
        href: "https://arxiv.org/abs/2607.25787",
        description: "Represents IDyOM model's long/short-term memories as explicit graph objects, supporting uncertainty estimation in musical expectation. Can be used to analyze musical beat structures, assisting beat alignment in dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-28`,
        'en': `/en/daily/music-to-dance/2026-07-28`,
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
      date="2026-07-28"
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
