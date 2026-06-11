import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "端到端动画与实时推理：视频生成的新范式",
    overview: [
      "SCAIL-2 提出端到端角色动画框架，直接拼接驱动视频而非依赖姿态骨架，与当前 music-to-dance 方案思路高度一致",
      "Lip Forcing 实现音频条件视频生成的实时推理（31 FPS），其 Sync-Window DMD 和两步推理机制可直接迁移",
      "Flow-DPPO 为 Flow Matching 模型提供稳定的 RL 优化方法，解决 ratio clipping 的结构性缺陷"
    ],
    papers: [
      {
        num: 1,
        tag: "角色动画",
        title: "SCAIL-2：端到端上下文条件控制的统一角色动画",
        description: "SCAIL-2 提出了一种革命性的端到端角色动画范式，直接拼接驱动视频而非依赖姿态骨架等中间表示。该方法通过 in-context mask conditioning 和 mode-specific RoPE 实现任务统一，并引入 Bias-Aware DPO 解决合成数据在手部细节区域的偏差问题。与当前 music-to-dance 方案类似，SCAIL-2 同样采用端到端训练策略，通过合成数据流水线 MotionPair-60K 实现跨身份运动迁移。其核心技术——直接视频驱动而非显式姿态估计——与当前基于 3D Audio Attention 的音乐驱动舞蹈生成方案思路高度一致，可借鉴其 Bias-Aware DPO 技术来优化舞蹈动作的细节保真度。",
        keyPoints: [
          "端到端驱动：直接拼接驱动视频，绕过姿态骨架等中间表示的信息损失",
          "任务统一：in-context mask conditioning + mode-specific RoPE 支持动画/替换/多角色等异构任务",
          "Bias-Aware DPO：针对合成数据手部细节偏差的后训练优化机制"
        ],
        href: "https://arxiv.org/abs/2606.10804",
        paperLink: "SCAIL-2: Unifying Controlled Character Animation with End-to-end In-Context Conditioning",
      },
      {
        num: 2,
        tag: "音频驱动生成",
        title: "Lip Forcing：实时唇同步的少步自回归扩散",
        description: "Lip Forcing 是首个针对视频到视频唇同步的自回归扩散方法，将 14B 双向视频扩散教师模型蒸馏为因果学生模型，实现仅两步去噪的实时推理（1.3B 模型达 31 FPS，比同规模双向模型快 17.6 倍）。其核心创新包括：通过教师轨迹分析发现的 CFG fidelity-sync tradeoff、Sync-Window DMD（仅在同步偏好区间应用 CFG）、以及 SyncNet-based reward。对于 music-to-dance 任务，其两步推理机制和音频条件视频生成经验可直接迁移，尤其是 Sync-Window DMD 的思想可用于优化音乐-舞蹈对齐的训练策略。",
        keyPoints: [
          "实时推理：两步去噪实现 31 FPS，time-to-first-frame 亚毫秒级",
          "Sync-Window DMD：基于轨迹分析的在同步偏好窗口内应用 CFG 的训练策略",
          "蒸馏框架：14B 教师 → 1.3B/14B 学生，保持参考保真度的同时实现 39.8 倍加速"
        ],
        href: "https://arxiv.org/abs/2606.11180",
        paperLink: "Lip Forcing: Few-Step Autoregressive Diffusion for Real-time Lip Synchronization",
      },
      {
        num: 3,
        tag: "扩散模型训练",
        title: "Flow-DPPO：Flow Matching 模型的发散近端策略优化",
        description: "Flow-DPPO 针对 Flow Matching 模型的 RL 优化提出了根本性的改进。现有方法（如 Flow-GRPO）使用 PPO 风格的 ratio clipping 来强制信任区域，但论文指出 ratio 是真实策略发散的噪声单样本估计，在流模型的高维连续潜空间中会导致系统性偏差。Flow-DPPO 的关键洞察是：流模型的每步策略是高斯分布，可以精确且廉价地计算新旧策略间的 KL 发散。该方法用发散近端约束替代 ratio clipping，采用非对称发散掩码仅当更新同时远离信任区域且违反发散阈值时才阻断梯度。实验表明 Flow-DPPO 在奖励优化、KL 近端效率、缓解灾难性遗忘和多目标优化方面均优于现有方法。对于 music-to-dance 的扩散模型训练，这提供了更稳定的 RL 优化方案。",
        keyPoints: [
          "精确 KL 计算：利用流模型高斯策略特性，精确计算策略发散而非噪声估计",
          "非对称发散掩码：仅阻断远离信任区域的过度优化，保留向旧策略恢复的更新",
          "多目标优化：缓解奖励黑客问题，支持稳定的多 epoch 训练"
        ],
        href: "https://arxiv.org/abs/2606.11025",
        paperLink: "Flow-DPPO: Divergence Proximal Policy Optimization for Flow Matching Models",
      },
      {
        num: 4,
        tag: "世界模型",
        title: "Next Forcing：多块预测的因果世界建模",
        description: "Next Forcing 提出多块预测（MCP）框架解决自回归视频生成的短视监督问题。现有方法仅监督当前块去噪，导致模型依赖外观捷径而非学习潜在动态。Next Forcing 通过辅助 MCP 模块同时预测未来多个时间尺度的视频块（next1/next2/next3），形成跨深度的因果链。MCP 模块从主模型多层融合特征，使用更高的 timestep shift 强制依赖主模型表示。在 RoboTwin 基准上，50fps 时实现 2.3 倍训练加速和 93.1% 相对精度提升，推理时可并行预测实现 2 倍加速。对于长舞蹈视频生成，该技术可显著提升训练效率和长程时序一致性。",
        keyPoints: [
          "多块预测：同时预测 next1/next2/next3 块，提供多尺度时序监督",
          "多层特征融合：从主模型 4 个中间层融合特征，梯度深入主模型表示",
          "训练/推理双加速：训练收敛速度提升 2.3 倍，推理并行预测加速 2 倍"
        ],
        href: "https://arxiv.org/abs/2606.11187",
        paperLink: "Next Forcing: Causal World Modeling with Multi-Chunk Prediction",
      },
      {
        num: 5,
        tag: "运动生成",
        title: "MoGeFlow：流经运动码本几何的文本到运动生成",
        description: "MoGeFlow 提出在运动码本嵌入空间中生成文本条件运动的新范式。与将码本索引视为无序类别标签的传统方法不同，MoGeFlow 利用 PartVQ 运动 tokenizer 的码本几何特性——码本距离与局部运动原型距离对齐——在连续码本嵌入空间中学习流匹配模型，仅在终端投影回有效码本条目。该方法在 HumanML3D 和 KIT-ML 上取得 SOTA：R-Precision 所有检索排名最优，HumanML3D MultiModal Distance 和 KIT-ML FID 在生成方法中最佳。对于 music-to-dance，这提示可将音乐条件运动生成建模为在学习的运动码本几何中的连续流动，而非离散的码本索引预测。",
        keyPoints: [
          "码本几何：验证 PartVQ 码本距离与局部运动原型距离对齐，具有解码器因果性",
          "连续生成：在码本嵌入空间学习流匹配，终端投影回离散码本",
          "结构化帧表示：将各关节组码嵌入组合为结构化运动码帧作为生成单元"
        ],
        href: "https://arxiv.org/abs/2606.11656",
        paperLink: "MoGeFlow: Flowing Through Motion Codebook Geometry for Text-to-Motion Generation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Kwai Keye-VL-2.0：长视频理解的多模态基础模型",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2606.10651",
        description: "快手可灵团队开源的 MoE 多模态模型，支持 256K 无损上下文处理，对长舞蹈视频生成有参考价值。",
      },
      {
        num: 7,
        title: "WorldOlympiad：视频世界模型评估基准",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2606.11129",
        description: "从物理保真度、几何一致性和交互保真度三维度评估生成视频，可用于舞蹈视频质量评估。",
      },
      {
        num: 8,
        title: "FadeMem：距离感知记忆整合",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2606.10671",
        description: "自回归视频扩散的距离感知 KV 缓存机制，固定缓存预算下保持长程一致性，适用于长舞蹈视频。",
      },
      {
        num: 9,
        title: "TopoCap：拓扑无关运动先验",
        tag: "运动重定向",
        href: "https://arxiv.org/abs/2606.12153",
        description: "支持任意骨骼结构（从双足到六足）的运动提取与重定向，可扩展舞蹈生成到非人形角色。",
      },
    ],
    observation: "今日论文呈现出从显式中间表示（姿态骨架）向端到端隐式学习的明显趋势。SCAIL-2 和 Lip Forcing 均通过直接视频/音频条件绕过显式结构估计，这与 music-to-dance 任务中从显式姿态控制向隐式音乐-运动对齐的演进方向一致。同时，MoGeFlow 揭示的码本几何特性提示：即使使用离散表示，也可在连续嵌入空间中学习生成，这为音乐条件运动生成提供了新思路——将音乐节拍编码为在运动码本几何中的流动路径。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "End-to-End Animation & Real-Time Inference: New Paradigms for Video Generation",
    overview: [
      "SCAIL-2 proposes an end-to-end character animation framework that directly concatenates driving videos instead of relying on pose skeletons",
      "Lip Forcing achieves real-time inference (31 FPS) for audio-conditioned video generation, with Sync-Window DMD directly transferable",
      "Flow-DPPO provides stable RL optimization for Flow Matching models, addressing structural flaws in ratio clipping"
    ],
    papers: [
      {
        num: 1,
        tag: "Character Animation",
        title: "SCAIL-2: End-to-End In-Context Conditioning for Unified Character Animation",
        description: "SCAIL-2 introduces a revolutionary end-to-end character animation paradigm that directly concatenates driving videos rather than relying on intermediate representations like pose skeletons. The method achieves task unification through in-context mask conditioning and mode-specific RoPE, and introduces Bias-Aware DPO to address synthetic data bias in hand detail regions. Similar to current music-to-dance approaches, SCAIL-2 adopts end-to-end training strategies and cross-identity motion transfer through the synthetic data pipeline MotionPair-60K. Its core technique—direct video driving instead of explicit pose estimation—aligns closely with current music-driven dance generation based on 3D Audio Attention, and its Bias-Aware DPO technology can be adapted to optimize dance motion detail fidelity.",
        keyPoints: [
          "End-to-end driving: Direct video concatenation bypasses information loss from intermediate representations",
          "Task unification: in-context mask conditioning + mode-specific RoPE supports heterogeneous tasks",
          "Bias-Aware DPO: Post-training optimization for hand detail bias in synthetic data"
        ],
        href: "https://arxiv.org/abs/2606.10804",
        paperLink: "SCAIL-2: Unifying Controlled Character Animation with End-to-end In-Context Conditioning",
      },
      {
        num: 2,
        tag: "Audio-Driven Generation",
        title: "Lip Forcing: Few-Step Autoregressive Diffusion for Real-Time Lip Sync",
        description: "Lip Forcing is the first autoregressive diffusion method for video-to-video lip synchronization, distilling a 14B bidirectional video diffusion teacher into causal student models for real-time two-step denoising inference (1.3B model achieves 31 FPS, 17.6× faster than bidirectional baselines). Key innovations include: CFG fidelity-sync tradeoff discovered through teacher trajectory analysis, Sync-Window DMD (applying CFG only within sync-favoring intervals), and SyncNet-based reward. For music-to-dance tasks, its two-step inference mechanism and audio-conditioned video generation experience are directly transferable, especially the Sync-Window DMD concept for optimizing music-dance alignment training.",
        keyPoints: [
          "Real-time inference: Two-step denoising achieves 31 FPS with sub-millisecond TTFF",
          "Sync-Window DMD: Training strategy applying CFG only within sync-favoring windows",
          "Distillation: 14B teacher → 1.3B/14B students, 39.8× faster while preserving fidelity"
        ],
        href: "https://arxiv.org/abs/2606.11180",
        paperLink: "Lip Forcing: Few-Step Autoregressive Diffusion for Real-time Lip Synchronization",
      },
      {
        num: 3,
        tag: "Diffusion Training",
        title: "Flow-DPPO: Divergence Proximal Policy Optimization for Flow Matching",
        description: "Flow-DPPO proposes fundamental improvements for RL optimization of Flow Matching models. Existing methods (e.g., Flow-GRPO) use PPO-style ratio clipping to enforce trust regions, but the paper shows ratio is a noisy single-sample estimate of true policy divergence, causing systematic bias in high-dimensional continuous latent spaces. Flow-DPPO's key insight: per-step policies in flow models are Gaussian, enabling exact and cheap KL divergence computation. The method replaces ratio clipping with divergence proximal constraints using asymmetric divergence masks that block gradients only when updates simultaneously move away from trust regions and violate divergence thresholds. Experiments show superior reward optimization, KL-proximal efficiency, catastrophic forgetting mitigation, and multi-objective optimization. This provides a more stable RL optimization scheme for music-to-dance diffusion model training.",
        keyPoints: [
          "Exact KL computation: Leverages Gaussian policy properties for exact divergence calculation",
          "Asymmetric divergence mask: Only blocks excessive optimization away from trust regions",
          "Multi-objective optimization: Mitigates reward hacking, enables stable multi-epoch training"
        ],
        href: "https://arxiv.org/abs/2606.11025",
        paperLink: "Flow-DPPO: Divergence Proximal Policy Optimization for Flow Matching Models",
      },
      {
        num: 4,
        tag: "World Models",
        title: "Next Forcing: Causal World Modeling with Multi-Chunk Prediction",
        description: "Next Forcing proposes a Multi-Chunk Prediction (MCP) framework to address myopic supervision in autoregressive video generation. Existing methods only supervise current chunk denoising, causing models to rely on appearance shortcuts rather than learning latent dynamics. Next Forcing uses auxiliary MCP modules to simultaneously predict future video chunks at multiple temporal scales (next1/next2/next3), forming causal chains across depths. MCP modules fuse features from multiple main model layers with higher timestep shifts to force dependency on main model representations. On RoboTwin benchmark, achieves 2.3× training speedup and 93.1% relative accuracy improvement at 50fps, with 2× inference acceleration through parallel prediction. For long dance video generation, this significantly improves training efficiency and long-range temporal consistency.",
        keyPoints: [
          "Multi-chunk prediction: Simultaneously predicts next1/next2/next3 for multi-scale temporal supervision",
          "Multi-layer fusion: Fuses from 4 intermediate layers, gradients propagate deep into main model",
          "Training/inference acceleration: 2.3× faster convergence, 2× parallel inference speedup"
        ],
        href: "https://arxiv.org/abs/2606.11187",
        paperLink: "Next Forcing: Causal World Modeling with Multi-Chunk Prediction",
      },
      {
        num: 5,
        tag: "Motion Generation",
        title: "MoGeFlow: Flowing Through Motion Codebook Geometry",
        description: "MoGeFlow proposes a new paradigm for text-conditioned motion generation in motion codebook embedding space. Unlike traditional methods treating codebook indices as unordered categorical labels, MoGeFlow leverages PartVQ tokenizer's codebook geometry—where codebook distances align with local motion prototype distances—to learn flow matching in continuous codebook embedding space, projecting only at terminals back to valid codebook entries. The method achieves SOTA on HumanML3D and KIT-ML: best R-Precision at all retrieval ranks, best HumanML3D MultiModal Distance and KIT-ML FID among generative methods. For music-to-dance, this suggests modeling music-conditioned motion generation as continuous flow in learned motion codebook geometry rather than discrete codebook index prediction.",
        keyPoints: [
          "Codebook geometry: Verified PartVQ codebook distances align with local motion prototype distances",
          "Continuous generation: Flow matching in codebook embedding space with terminal projection",
          "Structured frame representation: Groups joint-group embeddings into structured motion-code frames"
        ],
        href: "https://arxiv.org/abs/2606.11656",
        paperLink: "MoGeFlow: Flowing Through Motion Codebook Geometry for Text-to-Motion Generation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Kwai Keye-VL-2.0: Long-Video Understanding Foundation Model",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2606.10651",
        description: "Kwai's open-source MoE multimodal model supporting 256K lossless context processing, relevant for long dance video generation.",
      },
      {
        num: 7,
        title: "WorldOlympiad: Video World Model Evaluation Benchmark",
        tag: "Evaluation",
        href: "https://arxiv.org/abs/2606.11129",
        description: "Evaluates generated videos across physical faithfulness, geometric consistency, and interaction fidelity—applicable to dance video quality assessment.",
      },
      {
        num: 8,
        title: "FadeMem: Distance-Aware Memory Consolidation",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2606.10671",
        description: "Distance-aware KV cache mechanism for autoregressive video diffusion, maintaining long-range consistency under fixed cache budgets for long dance videos.",
      },
      {
        num: 9,
        title: "TopoCap: Topology-Agnostic Motion Priors",
        tag: "Motion Retargeting",
        href: "https://arxiv.org/abs/2606.12153",
        description: "Supports motion extraction and retargeting for arbitrary skeletal structures (biped to hexapod), extending dance generation to non-humanoid characters.",
      },
    ],
    observation: "Today's papers show a clear trend from explicit intermediate representations (pose skeletons) toward end-to-end implicit learning. Both SCAIL-2 and Lip Forcing bypass explicit structure estimation through direct video/audio conditioning, aligning with the evolution in music-to-dance from explicit pose control toward implicit music-motion alignment. Meanwhile, MoGeFlow's revelation of codebook geometry suggests that even with discrete representations, generation can be learned in continuous embedding space—providing a new perspective for music-conditioned motion generation by encoding musical beats as flow paths through motion codebook geometry.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-10`,
        'en': `/en/daily/music-to-dance/2026-06-10`,
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
      date="2026-06-10"
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
