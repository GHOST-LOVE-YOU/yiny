import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "交互式动作生成与长时程视频稳定性",
    overview: [
      "ARDY 提出混合表示+两阶段自回归扩散，实现 33ms 延迟的实时人体动作生成",
      "LongE2V 的自回归展开与自适应上下文切换可有效抑制长视频漂移",
      "OPSD-V 的 on-policy 自蒸馏为长程 AR 生成提供密集轨迹级监督"
    ],
    papers: [
      {
        num: 1,
        tag: "动作生成",
        title: "ARDY：混合表示实现实时交互式人体动作生成",
        description: "ARDY 提出了一种创新的混合运动表示方法，将显式根轨迹与隐式身体潜码相结合，在保持精确轨迹控制的同时实现高效生成学习。其核心是一个两阶段自回归 Transformer 去噪器：第一阶段预测干净的显式根运动，第二阶段在此基础上预测身体潜码。这种交错设计确保了根运动与身体运动之间的持续相互影响。模型支持可变长度历史上下文（最长 8 秒）和长程运动学目标（最长 10 秒），能够处理\"先走、再弯腰捡起东西、继续走\"这类需要长程语义理解的复杂指令。在 HumanML3D 和 Bones Rigplay 数据集上的评估表明，ARDY 在运动质量和约束遵循方面均达到 SOTA 水平。",
        keyPoints: [
          "混合表示：显式根特征（全局位置+朝向）+ 潜码身体嵌入，兼顾可控性与学习效率",
          "两阶段去噪：先根后身体的交错扩散过程，确保两者协同优化",
          "33ms 生成延迟：4 步扩散实现实时交互，支持键盘鼠标实时控制"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "视频生成",
        title: "LongE2V：长时程事件相机视频生成的稳定性方案",
        description: "LongE2V 针对长视频生成中的误差累积和时序漂移问题，提出了自回归展开（Autoregressive Unrolling）训练策略和自适应上下文切换（Adaptive Context Switching）机制。自回归展开通过在训练时逐步用模型自身生成的预测替代真实上下文，迫使模型适应自身误差；自适应上下文切换则根据注意力权重动态决定是否更新上下文，当当前 token 对上下文注意力低于阈值（τ=0.05）时触发上下文刷新。此外，Reencoding Alignment 和 Cross Residual Correction 解决了双向帧插值中的时序对齐问题。在 MVSEC 和 HQF 长序列（最高 2740 帧）上的实验表明，该方法显著优于 E2VID+ 和 VDM-EVFI 等基线。",
        keyPoints: [
          "自回归展开训练：用模型自身预测替代 GT 上下文，弥合训练-推理分布差异",
          "自适应上下文切换：基于注意力权重动态刷新上下文，防止误差累积",
          "双向一致性：Reencoding Alignment 解决 3D VAE 时序压缩导致的双向分支错位"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
      {
        num: 3,
        tag: "视频生成",
        title: "OPSD-V：on-policy 自蒸馏提升长程 AR 视频生成",
        description: "OPSD-V 针对少步自回归视频生成器在长程展开时的误差累积和运动动态减弱问题，提出了一种后训练框架。其核心洞察是：在测试时仅用真实长视频替换 KV cache 中的历史条目（保持最新块为生成），即可显著改善长程稳定性。基于此，OPSD-V 在训练时构建两个分支——学生分支遵循推理时 rollout，将自身生成块写入 KV cache；教师分支在相同去噪状态评估，但使用由真实长视频构建的更干净的 AR 一致 cache。两个分支共享初始真实前缀以锚定场景，教师保留最新生成块以保持自回归连续性。这种设计在不改变采样器、步数或推理 cache 机制的前提下，为长程 AR 生成提供密集的轨迹级监督。",
        keyPoints: [
          "Cache-aware 自蒸馏：学生用自生成 cache，教师用真实视频构建的干净 cache",
          "密集轨迹监督：在少步去噪轨迹的每个状态提供纠正目标",
          "用户研究显示：66% 整体偏好率（排除平局后 82.5%）优于基线"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
      {
        num: 4,
        tag: "动作生成",
        title: "GIRAF：与铰接物体的全身交互生成",
        description: "GIRAF 解决了全身人体与铰接物体（如冰箱、抽屉）交互生成的挑战，涵盖从行走到操作的完整过渡。其核心创新是动态 BPS（Basis Point Sets）表示：在物体坐标系中统一编码物体表面距离、手部末端执行器距离和接触标签，通过投票机制实现跨物体几何的泛化。训练采用混合域策略，通过 FiLM 层和可学习嵌入平衡行走与交互序列的学习。此外，基于接触的数据增强策略在保持上下文合理性的前提下重新定位交互，有效缓解数据稀缺问题。实验表明，该方法在未见过的物体配置上表现出强泛化能力。",
        keyPoints: [
          "动态 BPS 表示：物体中心坐标系统一编码接触、手部、物体表面，支持跨形状泛化",
          "混合域训练：FiLM 条件化平衡行走与交互，实现无缝过渡",
          "接触驱动增强：重新定位交互以扩展训练多样性"
        ],
        href: "https://arxiv.org/abs/2607.07880",
        paperLink: "GIRAF: Towards Generalizable Human Interactions with Articulated Objects",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "OpenCoF：通过视频生成学习推理",
        tag: "视频推理",
        href: "https://arxiv.org/abs/2607.08763",
        description: "提出 Chain-of-Frame (CoF) 推理机制，通过时序连接的帧进行推理。构建 OpenCoF-17K 数据集（11 任务家族）和 Wan-CoF 模型，探索视觉和文本推理 token 的设计。",
      },
      {
        num: 6,
        title: "线性注意力架构：机制、权衡与跨层路由",
        tag: "注意力机制",
        href: "https://arxiv.org/abs/2607.07953",
        description: "系统比较 softmax 注意力与四种线性注意力变体（DeltaNet、Gated DeltaNet、Kimi Delta Attention）。提出 Cross-Layer Value Routing (CLVR) 跨层路由机制。",
      },
      {
        num: 7,
        title: "DeltaV：视觉状态增量更新的多模态推理",
        tag: "多模态",
        href: "https://arxiv.org/abs/2607.08434",
        description: "用视觉状态更新替代全图生成，通过 TSIM Router 自适应分配 token 预算。平均减少 55.6% 视觉 token，提升多模态推理 3.3%。",
      },
      {
        num: 8,
        title: "Canvas360：几何感知全景生成",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2607.08765",
        description: "两阶段框架结合几何感知预训练与任务微调。并行深度生成、速度循环填充和相似度损失正则化，在 FAED 指标上达到 SOTA。",
      },
      {
        num: 9,
        title: "FabriVLA：轻量级 VLA 操控模型",
        tag: "机器人",
        href: "https://arxiv.org/abs/2607.08575",
        description: "InternVL3.5 视觉语言主干 + 流匹配动作头，门控自注意力连接动作 token。在 Meta-World MT50 上达到 90.0% 成功率，仅 1B 规模 VLM。",
      },
    ],
    observation: "本日论文呈现两个值得关注的技术趋势。一是自回归生成范式的复兴：ARDY、LongE2V、OPSD-V 均采用自回归框架处理长时程生成问题，通过精心设计的训练策略（自回归展开、on-policy 自蒸馏）缓解误差累积。这与当前扩散模型的一次性生成分野明显，为 dance video 的长序列生成提供了替代路径。二是显式-隐式混合表示的兴起：ARDY 的显式根+隐式身体、GIRAF 的动态 BPS 均表明，在生成任务中保留部分显式可控变量（如根轨迹、接触点）同时利用潜码压缩高维细节，是平衡可控性与生成质量的有效策略。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Interactive Motion Generation & Long-Horizon Video Stability",
    overview: [
      "ARDY achieves real-time human motion generation with 33ms latency via hybrid representation + two-stage autoregressive diffusion",
      "LongE2V's autoregressive unrolling and adaptive context switching effectively suppress long-video drift",
      "OPSD-V's on-policy self-distillation provides dense trajectory-level supervision for long-range AR generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "ARDY: Hybrid Representation Enables Real-Time Interactive Motion Generation",
        description: "ARDY introduces an innovative hybrid motion representation combining explicit root trajectories with latent body embeddings, enabling precise trajectory control while maintaining efficient generative learning. Its core is a two-stage autoregressive Transformer denoiser: first predicting clean explicit root motion, then predicting body latent codes conditioned on the root. This interleaved design ensures continuous mutual influence between root and body motion. The model supports variable-length history contexts (up to 8s) and long-horizon kinematic goals (up to 10s), handling complex instructions like \"walk, bend to pick up something, then continue walking\" that require long-range semantic understanding. Evaluations on HumanML3D and Bones Rigplay datasets show ARDY achieves SOTA in motion quality and constraint adherence.",
        keyPoints: [
          "Hybrid representation: Explicit root features (global position + heading) + latent body embeddings balance controllability and learning efficiency",
          "Two-stage denoising: Root-first interleaved diffusion ensures coordinated optimization of both components",
          "33ms generation latency: 4-step diffusion enables real-time interaction with keyboard/mouse control"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "Video Generation",
        title: "LongE2V: Stability Solutions for Long-Horizon Event Camera Video Generation",
        description: "LongE2V addresses error accumulation and temporal drift in long video generation through Autoregressive Unrolling training strategy and Adaptive Context Switching mechanism. Autoregressive unrolling gradually replaces ground-truth context with model predictions during training, forcing the model to adapt to its own errors. Adaptive context switching dynamically decides whether to update context based on attention weights, triggering a refresh when current token attention to context falls below threshold (τ=0.05). Additionally, Reencoding Alignment and Cross Residual Correction solve temporal alignment issues in bidirectional frame interpolation. Experiments on MVSEC and HQF long sequences (up to 2740 frames) demonstrate significant improvements over E2VID+ and VDM-EVFI baselines.",
        keyPoints: [
          "Autoregressive unrolling training: Replace GT context with model predictions to bridge train-inference distribution gap",
          "Adaptive context switching: Dynamic context refresh based on attention weights prevents error accumulation",
          "Bidirectional consistency: Reencoding Alignment resolves bidirectional branch misalignment caused by 3D VAE temporal compression"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
      {
        num: 3,
        tag: "Video Generation",
        title: "OPSD-V: On-Policy Self-Distillation for Long-Range AR Video Generation",
        description: "OPSD-V addresses error accumulation and weakened motion dynamics in few-step autoregressive video generators during long-horizon rollout. Its key insight: at test time, simply replacing historical entries in the KV cache with real long videos (while keeping the latest block generated) significantly improves long-horizon stability. Based on this, OPSD-V constructs two branches during training—the student follows inference-time rollout, writing self-generated chunks to KV cache; the teacher evaluates at the same denoising states but uses a cleaner AR-consistent cache built from real long videos. Both branches share an initial real prefix to anchor the scene, while the teacher retains the latest generated block for autoregressive continuity. This design provides dense trajectory-level supervision for long-range AR generation without changing the sampler, steps, or inference cache mechanism.",
        keyPoints: [
          "Cache-aware self-distillation: Student uses self-generated cache, teacher uses clean cache built from real videos",
          "Dense trajectory supervision: Provides corrective targets at each state of the few-step denoising trajectory",
          "User study shows: 66% overall preference rate (82.5% excluding ties) over baseline"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
      {
        num: 4,
        tag: "Motion Generation",
        title: "GIRAF: Full-Body Interaction Generation with Articulated Objects",
        description: "GIRAF tackles the challenge of generating full-body human interactions with articulated objects (e.g., refrigerators, drawers), covering the complete transition from locomotion to manipulation. Its core innovation is dynamic BPS (Basis Point Sets) representation: encoding object surface distances, hand end-effector distances, and contact labels in a unified object-centric coordinate system, achieving cross-object geometry generalization through a voting mechanism. Training employs a mixed-domain strategy balancing locomotion and interaction sequences through FiLM layers and learnable embeddings. Additionally, contact-based data augmentation relocates interactions while maintaining contextual plausibility, effectively mitigating data scarcity. Experiments demonstrate strong generalization to unseen object configurations.",
        keyPoints: [
          "Dynamic BPS representation: Object-centric coordinate system unifies contact, hands, and object surfaces for cross-shape generalization",
          "Mixed-domain training: FiLM conditioning balances locomotion and interaction for seamless transitions",
          "Contact-driven augmentation: Relocates interactions to expand training diversity"
        ],
        href: "https://arxiv.org/abs/2607.07880",
        paperLink: "GIRAF: Towards Generalizable Human Interactions with Articulated Objects",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "OpenCoF: Learning to Reason Through Video Generation",
        tag: "Video Reasoning",
        href: "https://arxiv.org/abs/2607.08763",
        description: "Proposes Chain-of-Frame (CoF) reasoning mechanism through temporally connected frames. Constructs OpenCoF-17K dataset (11 task families) and Wan-CoF model, exploring visual and textual reasoning token designs.",
      },
      {
        num: 6,
        title: "Linear Attention Architectures: Mechanisms, Trade-offs, and Cross-Layer Routing",
        tag: "Attention",
        href: "https://arxiv.org/abs/2607.07953",
        description: "Systematically compares softmax attention with four linear attention variants (DeltaNet, Gated DeltaNet, Kimi Delta Attention). Proposes Cross-Layer Value Routing (CLVR) mechanism.",
      },
      {
        num: 7,
        title: "DeltaV: Multimodal Reasoning with Visual State Updates",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2607.08434",
        description: "Replaces full-image generation with visual state updates, adaptively allocating token budget via TSIM Router. Reduces visual tokens by 55.6% on average, improves multimodal reasoning by 3.3%.",
      },
      {
        num: 8,
        title: "Canvas360: Geometric-Aware Panoramic Generation",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2607.08765",
        description: "Two-stage framework combining geometric-aware pretraining with task-specific fine-tuning. Parallel depth generation, velocity circular padding, and similarity loss regularization achieve SOTA on FAED metric.",
      },
      {
        num: 9,
        title: "FabriVLA: Lightweight VLA Model for Manipulation",
        tag: "Robotics",
        href: "https://arxiv.org/abs/2607.08575",
        description: "InternVL3.5 vision-language backbone + flow-matching action head with gated self-attention across action tokens. Achieves 90.0% success rate on Meta-World MT50 with only 1B-scale VLM.",
      },
    ],
    observation: "Two notable technical trends emerge from today's papers. First, the resurgence of autoregressive generation paradigms: ARDY, LongE2V, and OPSD-V all employ autoregressive frameworks for long-horizon generation, mitigating error accumulation through carefully designed training strategies (autoregressive unrolling, on-policy self-distillation). This diverges from current diffusion models' one-shot generation approach, offering an alternative path for long-sequence dance video generation. Second, the rise of explicit-implicit hybrid representations: ARDY's explicit root + implicit body and GIRAF's dynamic BPS both demonstrate that preserving some explicit controllable variables (e.g., root trajectories, contact points) while using latent codes to compress high-dimensional details is an effective strategy for balancing controllability and generation quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-11`,
        'en': `/en/daily/music-to-dance/2026-07-11`,
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
      date="2026-07-11"
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
