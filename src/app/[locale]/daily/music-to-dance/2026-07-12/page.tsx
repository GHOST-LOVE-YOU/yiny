import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "实时交互生成与长程一致性：自回归扩散在动作与视频生成中的新进展",
    overview: [
      "ARDY 提出混合表示+两阶段自回归扩散，实现 33ms 延迟的实时可控人体动作生成",
      "LongE2V 的自回归展开与自适应上下文切换技术为长时程视频生成提供稳定性方案",
      "OPSD-V 的 on-policy 自蒸馏方法有效减少自回归视频生成中的误差累积"
    ],
    papers: [
      {
        num: 1,
        tag: "人体动作生成",
        title: "ARDY：混合表示自回归扩散实现实时交互式人体动作生成",
        description: "ARDY 针对实时交互式人体动作生成的核心难题——如何在保持高质量的同时实现低延迟和灵活控制——提出了一个流式生成框架。其核心创新是混合表示：将动作分解为显式根轨迹特征和隐式身体嵌入，前者支持精确的轨迹控制，后者通过学习的 tokenizer 实现紧凑高效的生成。两阶段自回归 transformer 去噪器先预测根轨迹，再基于根预测条件生成身体嵌入，两个阶段在去噪循环中交错进行，确保根与身体运动的相互影响。该架构支持 8 秒历史上下文和 10 秒未来约束，远超现有方法（DiP 仅 1 秒历史/2 秒未来）。在 Bones Rigplay 和 HumanML3D 上的评估显示，ARDY 在动作质量和约束遵循方面达到 SOTA 水平，4 步扩散模型平均生成延迟仅 33ms，支持在线文本提示、全身关键帧、根轨迹/路径点、末端执行器位置/旋转等灵活控制。",
        keyPoints: [
          "混合表示：显式根特征 + 隐式身体嵌入，平衡控制精度与生成效率",
          "两阶段自回归去噪器：根-身体交错预测，支持 8s 历史 / 10s 未来约束",
          "33ms 生成延迟：4 步扩散实现实时交互，支持键盘鼠标实时控制"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "视频生成",
        title: "LongE2V：自回归展开与自适应上下文切换实现长时程事件视频生成",
        description: "LongE2V 针对事件相机视频生成的三大挑战——重建时的纹理模糊、预测时的时间漂移、插值时的鬼影伪影——提出了基于预训练视频扩散模型的统一框架。其核心贡献是 Autoregressive Unrolling（自回归展开）训练策略：模型先用真实上下文帧训练至收敛，然后用自身生成的预测替换上下文帧进行微调，迭代迫使模型适应自身预测误差，弥合训练-推理分布差距。配合 Adaptive Context Switching（自适应上下文切换）动态调整时间依赖，有效缓解长序列的误差累积。对于帧插值，Reencoding Alignment 与 Cross Residual Correction 解决 3D VAE 潜在空间的时间不对齐问题。在真实世界基准上的实验表明，该方法在重建、预测、插值三项任务上均超越 SOTA，展现出卓越的时间一致性和零样本泛化能力。",
        keyPoints: [
          "自回归展开训练：迭代用自生成预测替换上下文，弥合训练-推理差距",
          "自适应上下文切换：动态调整时间依赖，缓解长序列误差累积",
          "重编码对齐+交叉残差校正：解决 3D VAE 帧插值的时间不对齐"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
      {
        num: 3,
        tag: "视频生成",
        title: "OPSD-V：On-Policy 自蒸馏提升少步自回归视频生成器的长程稳定性",
        description: "OPSD-V 针对少步自回归视频生成器在长程展开时的误差累积和运动动力学减弱问题，提出了一种后训练范式。其核心洞察是：现有 DMD 风格蒸馏使用的双向短片段教师无法直接监督真正的长自回归轨迹。OPSD-V 将真实长视频作为特权时间上下文，构建更干净的教师分布。具体而言，学生遵循推理时的完整展开，将生成的块写入 KV cache；教师在相同的学生访问去噪状态处评估，但使用由真实视频上下文构建的更干净的 AR-一致时间 cache。两分支共享相同的真实视频前缀以锚定场景，教师用真实视频块替换较老的历史 cache 条目，同时保留最近的学生生成块以保持自回归连续性。这种设计在不改变原始少步采样路径的前提下，提供密集的轨迹级监督。在 Self-Forcing 和 LongLive 上的实验显示，OPSD-V 在视觉质量、运动动力学和 VBenchLong 分数上均有持续提升，用户研究中 66% 的整体偏好率（排除平局后 82.5%）证明了其有效性。",
        keyPoints: [
          "真实长视频作为特权上下文：构建比短片段教师更可靠的目标分布",
          "Cache-aware 蒸馏：学生用自生成 cache，教师用真实视频增强的 cache",
          "保持原始推理路径：不改变采样器、去噪步数或推理时 cache 机制"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
      {
        num: 4,
        tag: "人体交互",
        title: "GIRAF：面向铰接物体的可泛化全身人体交互生成",
        description: "GIRAF 针对与铰接物体（如冰箱、抽屉）的全身交互生成挑战，提出了一个文本条件扩散模型。其核心创新是 object-centric 表示：将手-物体接触、手部末端执行器和物体表面统一到一个共享的物体中心空间，通过 Dynamic BPS（动态基点集）表示，避免仅手部或仅物体表示的泛化缺陷。为实现从行走到交互的无缝过渡，设计了混合域训练策略：使用 FiLM 层保留交互特定特征，同时允许模型自然表示行走。针对数据稀缺问题，提出了基于接触的数据增强方案，在保持上下文合理性的前提下重新定位交互。在 ParaHome 数据集上的实验表明，该方法在未见过的物体配置上展现出强大的泛化能力，超越了当前 SOTA 方法。",
        keyPoints: [
          "Object-centric 表示：Dynamic BPS 统一手-物体接触、末端执行器和物体表面",
          "混合域训练：FiLM 层平衡行走与交互学习，实现无缝过渡",
          "接触驱动增强：在保持物理合理性的前提下扩展训练多样性"
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
        description: "提出 Chain-of-Frame (CoF) 推理机制，通过时间连接的帧展开推理过程，Wan-CoF 在四项视频推理基准上相比基线取得显著提升。",
      },
      {
        num: 6,
        title: "Canvas360：几何感知预训练增强全景生成",
        tag: "全景生成",
        href: "https://arxiv.org/abs/2607.08765",
        description: "两阶段框架结合几何感知预训练与下游任务微调，通过并行深度生成和速度循环填充提升几何一致性和全局连贯性。",
      },
      {
        num: 7,
        title: "线性注意力架构：机制、权衡与跨层路由",
        tag: "注意力机制",
        href: "https://arxiv.org/abs/2607.07953",
        description: "系统比较 softmax 注意力与四种线性注意力架构（DeltaNet、Gated DeltaNet、Kimi Delta Attention），提出跨层值路由 (CLVR) 机制。",
      },
      {
        num: 8,
        title: "DeltaV：视觉状态增量更新的统一多模态模型",
        tag: "多模态",
        href: "https://arxiv.org/abs/2607.08434",
        description: "用紧凑的视觉更新 token 替代全图生成，平均减少 55.6% 新生成的视觉 token，同时提升多模态推理能力 3.3%。",
      },
      {
        num: 9,
        title: "FabriVLA：轻量级视觉-语言-动作模型",
        tag: "VLA",
        href: "https://arxiv.org/abs/2607.08575",
        description: "结合 InternVL3.5 主干与流匹配动作头，在 Meta-World MT50 上达到 90% 平均成功率，展示 1B 规模 VLM 可实现强性能。",
      },
    ],
    observation: "本周论文呈现出明显的「自回归 + 扩散」融合趋势。ARDY、LongE2V、OPSD-V 三者虽然面向不同任务（人体动作、事件视频、通用视频），但都在解决同一个核心问题：如何在保持扩散模型生成质量的同时，实现自回归的流式推理和长程一致性。ARDY 的混合表示和两阶段去噪、LongE2V 的自回归展开、OPSD-V 的 on-policy 蒸馏，分别从不同角度给出了答案。对于音乐驱动舞蹈生成而言，这些技术的组合可能带来突破：用 ARDY 的混合表示处理音乐节拍条件，借鉴 LongE2V 的上下文切换保持长序列一致性，通过 OPSD-V 的蒸馏方法减少推理步数——这或许是一条通往实时高质量舞蹈生成的可行路径。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Real-Time Interactive Generation & Long-Horizon Consistency: Advances in Autoregressive Diffusion for Motion and Video",
    overview: [
      "ARDY proposes hybrid representation + two-stage autoregressive diffusion, achieving real-time controllable human motion generation with 33ms latency",
      "LongE2V's autoregressive unrolling and adaptive context switching provide stability solutions for long-horizon video generation",
      "OPSD-V's on-policy self-distillation effectively reduces error accumulation in autoregressive video generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Generation",
        title: "ARDY: Hybrid Representation Autoregressive Diffusion for Real-Time Interactive Human Motion Generation",
        description: "ARDY addresses the core challenge of real-time interactive motion generation—achieving low latency and flexible control while maintaining high quality—through a streaming generation framework. Its key innovation is a hybrid representation that decomposes motion into explicit root trajectory features and latent body embeddings, enabling precise trajectory control and compact efficient generation respectively. The two-stage autoregressive transformer denoiser first predicts root trajectories, then generates body embeddings conditioned on root predictions, with both stages interleaved in the denoising loop to ensure mutual influence. This architecture supports 8-second history context and 10-second future constraints, far exceeding existing methods (DiP only offers 1s history / 2s future). Evaluations on Bones Rigplay and HumanML3D show ARDY achieves SOTA motion quality and constraint adherence, with the 4-step diffusion model averaging 33ms generation latency and supporting flexible controls including online text prompts, full-body keyframes, root trajectories/waypoints, and end-effector positions/rotations.",
        keyPoints: [
          "Hybrid representation: explicit root features + latent body embeddings balance control precision and generation efficiency",
          "Two-stage autoregressive denoiser: root-body interleaved prediction supports 8s history / 10s future constraints",
          "33ms generation latency: 4-step diffusion enables real-time interaction with keyboard/mouse control"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
      {
        num: 2,
        tag: "Video Generation",
        title: "LongE2V: Autoregressive Unrolling and Adaptive Context Switching for Long-Horizon Event-Based Video Generation",
        description: "LongE2V addresses three major challenges in event camera video generation—texture blur in reconstruction, temporal drift in prediction, and ghosting artifacts in interpolation—through a unified framework based on pretrained video diffusion models. Its core contribution is the Autoregressive Unrolling training strategy: the model first trains with real context frames until convergence, then fine-tunes with its own generated predictions replacing context frames, iteratively forcing the model to adapt to its own prediction errors and bridging the train-inference distribution gap. Combined with Adaptive Context Switching to dynamically adjust temporal dependencies, this effectively mitigates error accumulation in long sequences. For frame interpolation, Reencoding Alignment and Cross Residual Correction resolve temporal misalignment in the 3D VAE latent space. Experiments on real-world benchmarks demonstrate SOTA performance across all three tasks, exhibiting exceptional temporal coherence and zero-shot generalization.",
        keyPoints: [
          "Autoregressive unrolling training: iteratively replace context with self-generated predictions to bridge train-inference gap",
          "Adaptive context switching: dynamically adjust temporal dependencies to mitigate long-sequence error accumulation",
          "Reencoding alignment + cross residual correction: resolve 3D VAE temporal misalignment for frame interpolation"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
      {
        num: 3,
        tag: "Video Generation",
        title: "OPSD-V: On-Policy Self-Distillation for Long-Horizon Stability in Few-Step AR Video Generators",
        description: "OPSD-V addresses error accumulation and weakened motion dynamics in long-horizon few-step autoregressive video generation through a post-training paradigm. Its key insight is that existing DMD-style distillation uses bidirectional short-clip teachers that cannot directly supervise true long autoregressive trajectories. OPSD-V treats real long videos as privileged temporal context to construct cleaner teacher distributions. Specifically, the student follows the full inference-time rollout, writing generated chunks to KV cache; the teacher evaluates at the same student-visited denoising states but uses a cleaner AR-consistent temporal cache built from real video context. Both branches share the same real-video prefix to anchor the scene, with the teacher replacing older cache entries with real video chunks while retaining the most recent student-generated chunk for autoregressive continuity. This design provides dense trajectory-level supervision without changing the original few-step sampling path. Experiments on Self-Forcing and LongLive show consistent improvements in visual quality, motion dynamics, and VBenchLong scores, with 66% overall preference in user studies (82.5% excluding ties).",
        keyPoints: [
          "Real long videos as privileged context: construct more reliable target distributions than short-clip teachers",
          "Cache-aware distillation: student uses self-generated cache, teacher uses real-video enhanced cache",
          "Preserve original inference path: unchanged sampler, denoising steps, or inference-time cache mechanism"
        ],
        href: "https://arxiv.org/abs/2607.08766",
        paperLink: "OPSD-V: On-Policy Self-Distillation for Post-Training Few-Step Autoregressive Video Generators",
      },
      {
        num: 4,
        tag: "Human Interaction",
        title: "GIRAF: Generalizable Full-Body Human Interactions with Articulated Objects",
        description: "GIRAF addresses the challenge of generating full-body interactions with articulated objects (e.g., refrigerators, drawers) through a text-conditioned diffusion model. Its core innovation is an object-centric representation that unifies hand-object contact, hand end-effectors, and object surfaces into a shared object-centered space using Dynamic BPS (Basis Point Sets), avoiding the generalization limitations of hand-only or object-only representations. To enable seamless transitions from locomotion to interaction, a mixed-domain training strategy uses FiLM layers to preserve interaction-specific features while allowing natural locomotion representation. For data scarcity, a contact-based augmentation scheme relocates interactions while maintaining contextual plausibility. Experiments on the ParaHome dataset demonstrate strong generalization to unseen object configurations, surpassing current SOTA methods.",
        keyPoints: [
          "Object-centric representation: Dynamic BPS unifies hand-object contact, end-effectors, and object surfaces",
          "Mixed-domain training: FiLM layers balance locomotion and interaction learning for seamless transitions",
          "Contact-driven augmentation: expand training diversity while maintaining physical plausibility"
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
        description: "Proposes Chain-of-Frame (CoF) reasoning mechanism that unfolds reasoning through temporally connected frames, with Wan-CoF achieving significant gains over baselines on four video reasoning benchmarks.",
      },
      {
        num: 6,
        title: "Canvas360: Geometric-Aware Pretraining for Panoramic Generation",
        tag: "Panorama",
        href: "https://arxiv.org/abs/2607.08765",
        description: "Two-stage framework combining geometric-aware pretraining with downstream fine-tuning, improving geometric consistency through parallel depth generation and velocity circular padding.",
      },
      {
        num: 7,
        title: "Linear Attention Architectures: Mechanisms, Trade-offs, and Cross-Layer Routing",
        tag: "Attention",
        href: "https://arxiv.org/abs/2607.07953",
        description: "Systematic comparison of softmax attention and four linear attention variants (DeltaNet, Gated DeltaNet, Kimi Delta Attention), proposing Cross-Layer Value Routing (CLVR) mechanism.",
      },
      {
        num: 8,
        title: "DeltaV: Visual State Updates in Unified Multimodal Models",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2607.08434",
        description: "Replaces full-image generation with compact visual update tokens, reducing newly generated visual tokens by 55.6% on average while improving multimodal reasoning by 3.3%.",
      },
      {
        num: 9,
        title: "FabriVLA: Lightweight Vision-Language-Action Model",
        tag: "VLA",
        href: "https://arxiv.org/abs/2607.08575",
        description: "Combines InternVL3.5 backbone with flow-matching action head, achieving 90% average success on Meta-World MT50, demonstrating strong performance at 1B VLM scale.",
      },
    ],
    observation: "This week's papers show a clear trend toward 'autoregressive + diffusion' fusion. ARDY, LongE2V, and OPSD-V, though targeting different tasks (human motion, event video, general video), all address the same core problem: how to achieve streaming inference and long-horizon consistency while maintaining diffusion model quality. ARDY's hybrid representation and two-stage denoising, LongE2V's autoregressive unrolling, and OPSD-V's on-policy distillation each offer solutions from different angles. For music-driven dance generation, combining these techniques could be breakthrough: using ARDY's hybrid representation for music beat conditioning, borrowing LongE2V's context switching for long-sequence consistency, and applying OPSD-V's distillation to reduce inference steps—this may be a viable path toward real-time high-quality dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-12`,
        'en': `/en/daily/music-to-dance/2026-07-12`,
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
      date="2026-07-12"
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
