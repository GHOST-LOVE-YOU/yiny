import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "分钟级舞蹈生成与视频扩散的通用视觉智能",
    overview: [
      "Wan-Dancer 提出分层框架突破 20 秒时长限制，实现分钟级连贯音乐驱动舞蹈生成",
      "GenCeption 论证视频生成模型可作为通用视觉预训练范式，迁移到深度估计、姿态估计等任务",
      "LongE2V 的自回归展开与自适应上下文切换为长时程视频生成稳定性提供技术路径"
    ],
    papers: [
      {
        num: 1,
        tag: "音乐驱动舞蹈",
        title: "Wan-Dancer：分钟级连贯音乐驱动舞蹈生成的分层框架",
        description: "阿里通义实验室提出的 Wan-Dancer 是当前音乐驱动舞蹈生成领域的重要进展。该框架采用分层全局-局部生成策略，将长视频生成分解为全局关键帧规划和局部时序细化两个阶段。核心技术包括：time-mapped RoPE 嵌入实现动态帧率适应，将位置编码映射到绝对时间戳以支持任意音乐时长；光流损失函数（基于 SEA-RAFT）增强快速运动时的视觉保真度；运动速度控制机制根据关键点位移速度分层处理慢/中/高速运动。实验表明，该框架可生成超过一分钟的 720p/30fps 稳定视频，支持中国古典舞、K-Pop、拉丁、踢踏、街舞五种舞蹈类型。",
        keyPoints: [
          "分层 Global-to-Local 架构：全局阶段用稀疏关键帧 mask（仅首帧为1）学习长程结构，局部阶段用随机 mask 学习帧间连续性",
          "Time-mapped RoPE：将旋转位置编码映射到绝对时间标识符，支持动态 FPS 注入",
          "光流损失权重：在 MSE 损失中引入光流 latents 作为元素级权重，强化运动区域监督"
        ],
        href: "https://arxiv.org/abs/2607.09581",
        paperLink: "Wan-Dancer: A Hierarchical Framework for Minute-scale Coherent Music-to-Dance Generation",
      },
      {
        num: 2,
        tag: "通用视觉智能",
        title: "GenCeption：视频生成模型作为通用视觉学习器",
        description: "Google DeepMind 提出的 GenCeption 论证了大规模文本到视频生成可作为计算机视觉的通用预训练范式。该研究将预训练视频扩散模型（Video Diffusion Transformer）作为基础，通过多任务后训练将其适配为前馈感知模型。GenCeption 在深度估计、表面法线估计、相机姿态估计、表情指代分割、2D/3D 关键点预测等任务上达到 SOTA 性能，与 DepthAnything3、SAM3、D4RT、VGGT-Omega 等专业模型相当甚至更优。关键发现：视频生成预训练在可比设置下优于 V-JEPA、VideoMAE V2 等替代范式；仅用 7× 到 500× 更少训练数据即可达到领先模型性能；仅在合成人体视频上训练的模型可零样本泛化到真实世界和动物、机器人等分布外类别。",
        keyPoints: [
          "统一架构：单一主干 + 单一头部 + 统一损失函数处理所有感知任务，任务规范从架构修改转为数据格式设计",
          "扩散到前馈：将迭代去噪转化为单步前馈推理，通过任务提示词动态切换输出模态",
          "涌现行为：sim-to-real 迁移和跨类别泛化能力，表明视频生成不仅是合成工具"
        ],
        href: "https://arxiv.org/abs/2607.09024",
        paperLink: "Video Generation Models are General-Purpose Vision Learners",
      },
      {
        num: 3,
        tag: "长时程视频生成",
        title: "LongE2V：基于视频扩散的长时程事件相机视频生成",
        description: "国立阳明交通大学提出的 LongE2V 针对事件相机视频重建、预测和插帧任务，提出两项关键技术创新。Autoregressive Unrolling（自回归展开）通过迭代训练策略弥合训练-推理分布差距：先用 GT 上下文帧训练至收敛，再用模型自身预测替换上下文帧进行微调，重复 T 次使模型适应自身生成误差。Adaptive Context Switching（自适应上下文切换）动态调整时序依赖，在长序列生成中防止误差累积和漂移。此外，Reencoding Alignment 与 Cross Residual Correction 解决 3D VAE 潜在空间中的时序不对齐问题。实验表明，该方法在真实世界基准上超越 SOTA，展现出卓越的时序一致性和零样本泛化能力。",
        keyPoints: [
          "自回归展开训练：迭代式自举训练强制模型适应自身预测误差，缓解长程漂移",
          "自适应上下文切换：动态更新上下文窗口，替代固定调度策略",
          "事件体素密度增强：随机缩放事件体素并同步变换首帧和上下文帧，增强跨传感器分辨率鲁棒性"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
      {
        num: 4,
        tag: "交互式动作生成",
        title: "ARDY：混合表示的交互式人体动作生成自回归扩散模型",
        description: "NVIDIA 和 ETH Zürich 提出的 ARDY 实现了 33ms 延迟的实时交互式人体动作生成。核心创新是混合表示：显式根特征（root trajectory/waypoints）提供精确轨迹控制，隐式身体嵌入（通过学习的 tokenizer 获得）实现高效生成学习。两阶段自回归 Transformer 去噪器先预测干净的显式根，再基于根预测条件预测隐式身体嵌入，两个阶段在去噪循环中交错进行确保根与身体运动的相互影响。该架构支持可变历史上下文（最长 8 秒）和长程运动学约束（最长 10 秒），可直接条件于全身关键帧、末端执行器位置/旋转、根轨迹等多种约束，无需测试时优化或 RL 策略。",
        keyPoints: [
          "混合表示：显式根特征 + 隐式身体嵌入，平衡控制精度与生成效率",
          "两阶段交错去噪：根预测与身体预测在去噪循环中相互条件",
          "33ms 实时生成：4 步扩散模型在消费级 GPU 上实现交互式控制"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "OPSD-V：on-policy 自蒸馏减少长程 AR 视频生成的误差累积",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2607.08766",
        description: "学生跟随推理时 rollout 生成，教师使用真实视频上下文提供更干净的时间缓存，在保持原始少步推理路径的同时减少长程退化。",
      },
      {
        num: 6,
        title: "OpenCoF：通过视频生成学习推理",
        tag: "视频推理",
        href: "https://arxiv.org/abs/2607.08763",
        description: "Chain-of-Frame (CoF) 推理框架，OpenCoF-17K 数据集包含 11 个任务家族的推理视频，探索视频生成中的时序推理能力。",
      },
      {
        num: 7,
        title: "Canvas360：几何感知预训练增强上下文全景生成",
        tag: "图像生成",
        href: "https://arxiv.org/abs/2607.08765",
        description: "两阶段框架结合几何感知预训练与下游任务微调，100 万配对全景样本支持风格迁移、修复、外扩等任务。",
      },
      {
        num: 8,
        title: "DeltaV：视觉状态增量更新的统一多模态模型",
        tag: "多模态",
        href: "https://arxiv.org/abs/2607.08434",
        description: "用紧凑更新 token 替代全图生成，减少 55.6% 视觉 token 同时保持重建保真度，TSIM Router 根据视觉变化幅度动态分配 token。",
      },
      {
        num: 9,
        title: "FabriVLA：轻量级视觉-语言-动作模型",
        tag: "机器人",
        href: "https://arxiv.org/abs/2607.08575",
        description: "InternVL3.5 主干 + flow-matching 动作头，gated self-attention 跨动作 token，在 Meta-World MT50 上达到 90% 成功率。",
      },
    ],
    observation: "本周论文呈现出两个明确的技术趋势。第一，长时程视频生成的稳定性问题正通过多种互补策略解决：Wan-Dancer 的分层全局-局部架构、LongE2V 的自回归展开与自适应上下文切换、OPSD-V 的 on-policy 自蒸馏，分别从架构设计、训练策略、蒸馏方法三个角度切入。第二，视频扩散模型的能力正在向通用视觉智能扩展——GenCeption 证明视频生成预训练可迁移到深度、姿态、分割等感知任务，这为 music-to-dance 领域提供了新的技术路径：与其从头训练专门的音频-视觉对齐模块，不如基于大规模视频生成模型进行后训练，利用其已内化的时空世界先验。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Minute-Scale Dance Generation & General-Purpose Visual Intelligence from Video Diffusion",
    overview: [
      "Wan-Dancer proposes a hierarchical framework breaking the 20-second barrier for minute-scale coherent music-driven dance generation",
      "GenCeption demonstrates video generation models as a general-purpose visual pretraining paradigm, transferable to depth estimation, pose estimation, and more",
      "LongE2V's autoregressive unrolling and adaptive context switching provide technical pathways for long-horizon video generation stability"
    ],
    papers: [
      {
        num: 1,
        tag: "Music-to-Dance",
        title: "Wan-Dancer: Hierarchical Framework for Minute-Scale Coherent Music-to-Dance Generation",
        description: "Wan-Dancer from Alibaba Tongyi Lab represents significant progress in music-driven dance generation. The framework adopts a hierarchical global-to-local generation strategy, decomposing long video generation into global keyframe planning and local temporal refinement. Core technologies include: time-mapped RoPE embeddings for dynamic frame rate adaptation, mapping positional encoding to absolute timestamps to support arbitrary music durations; optical flow loss (based on SEA-RAFT) enhancing visual fidelity during fast motion; motion speed control mechanism stratifying slow/medium/high-speed motion based on keypoint displacement velocity. Experiments show the framework can generate stable 720p/30fps videos exceeding one minute, supporting five dance genres: Chinese Classical, K-Pop, Latin, Tap, and Street dance.",
        keyPoints: [
          "Hierarchical Global-to-Local architecture: Global phase uses sparse keyframe mask (only first frame=1) for long-range structure learning, local phase uses random masking for frame continuity",
          "Time-mapped RoPE: Maps rotary positional encoding to absolute time identifiers, supporting dynamic FPS injection",
          "Optical flow loss weighting: Introduces optical flow latents as element-wise weights in MSE loss to strengthen motion region supervision"
        ],
        href: "https://arxiv.org/abs/2607.09581",
        paperLink: "Wan-Dancer: A Hierarchical Framework for Minute-scale Coherent Music-to-Dance Generation",
      },
      {
        num: 2,
        tag: "General Visual Intelligence",
        title: "GenCeption: Video Generation Models as General-Purpose Vision Learners",
        description: "GenCeption from Google DeepMind argues that large-scale text-to-video generation serves as a general pretraining paradigm for computer vision. The study uses a pretrained video diffusion model (Video Diffusion Transformer) as backbone and adapts it to feed-forward perception through multi-task post-training. GenCeption achieves SOTA performance on depth estimation, surface normal estimation, camera pose estimation, expression-referring segmentation, and 2D/3D keypoint prediction, matching or surpassing specialized models like DepthAnything3, SAM3, D4RT, and VGGT-Omega. Key findings: video generative pretraining outperforms alternatives like V-JEPA and VideoMAE V2; achieves comparable performance with 7× to 500× less training data; models trained only on synthetic human videos generalize zero-shot to real-world and out-of-distribution categories like animals and robots.",
        keyPoints: [
          "Unified architecture: Single backbone + single head + unified loss for all perception tasks, task specification shifts from architectural changes to data format design",
          "Diffusion to feed-forward: Transforms iterative denoising to single-step feed-forward inference, dynamically switching output modalities via task prompts",
          "Emergent behaviors: Sim-to-real transfer and cross-category generalization suggest video generation is more than a synthesis tool"
        ],
        href: "https://arxiv.org/abs/2607.09024",
        paperLink: "Video Generation Models are General-Purpose Vision Learners",
      },
      {
        num: 3,
        tag: "Long-Horizon Video",
        title: "LongE2V: Long-Horizon Event-based Video Generation with Video Diffusion",
        description: "LongE2V from National Yang Ming Chiao Tung University addresses event camera video reconstruction, prediction, and interpolation with two key innovations. Autoregressive Unrolling bridges the training-inference distribution gap through iterative training: first train with GT context frames to convergence, then fine-tune with model predictions replacing context frames, repeating T times to adapt to self-generated errors. Adaptive Context Switching dynamically adjusts temporal dependencies to prevent error accumulation and drift in long sequences. Additionally, Reencoding Alignment and Cross Residual Correction address temporal misalignment in 3D VAE latent space. Experiments demonstrate SOTA performance on real-world benchmarks with exceptional temporal coherence and zero-shot generalization.",
        keyPoints: [
          "Autoregressive unrolling training: Iterative bootstrapping forces model adaptation to self-prediction errors, mitigating long-range drift",
          "Adaptive context switching: Dynamically updates context window instead of fixed scheduling",
          "Event voxel density augmentation: Randomly scales event voxels with synchronized transforms for cross-sensor resolution robustness"
        ],
        href: "https://arxiv.org/abs/2607.08770",
        paperLink: "LongE2V: Long-Horizon Event-based Video Reconstruction, Prediction, and Frame Interpolation with Video Diffusion Models",
      },
      {
        num: 4,
        tag: "Interactive Motion",
        title: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion",
        description: "ARDY from NVIDIA and ETH Zürich achieves 33ms latency real-time interactive human motion generation. The core innovation is hybrid representation: explicit root features (root trajectory/waypoints) provide precise trajectory control, while latent body embeddings (via learned tokenizer) enable efficient generative learning. The two-stage autoregressive Transformer denoiser first predicts clean explicit roots, then predicts latent body embeddings conditioned on root predictions, with both stages interleaved in the denoising loop for mutual influence. The architecture supports variable history context (up to 8s) and long-horizon kinematic constraints (up to 10s), directly conditioning on full-body keyframes, end-effector positions/rotations, root trajectories, and more without test-time optimization or RL policies.",
        keyPoints: [
          "Hybrid representation: Explicit root features + latent body embeddings balance control precision and generation efficiency",
          "Two-stage interleaved denoising: Root and body predictions condition each other within the denoising loop",
          "33ms real-time generation: 4-step diffusion model enables interactive control on consumer GPUs"
        ],
        href: "https://arxiv.org/abs/2607.08741",
        paperLink: "ARDY: Autoregressive Diffusion with Hybrid Representation for Interactive Human Motion Generation",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "OPSD-V: On-Policy Self-Distillation for Long-Horizon AR Video Generation",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2607.08766",
        description: "Student follows inference-time rollout while teacher uses real video context for cleaner temporal cache, reducing long-horizon degradation while preserving the original few-step inference path.",
      },
      {
        num: 6,
        title: "OpenCoF: Learning to Reason Through Video Generation",
        tag: "Video Reasoning",
        href: "https://arxiv.org/abs/2607.08763",
        description: "Chain-of-Frame (CoF) reasoning framework with OpenCoF-17K dataset spanning 11 task families, exploring temporal reasoning capabilities in video generation.",
      },
      {
        num: 7,
        title: "Canvas360: Geometric-Aware Pretraining for In-Context Panoramic Generation",
        tag: "Image Generation",
        href: "https://arxiv.org/abs/2607.08765",
        description: "Two-stage framework combining geometric-aware pretraining with downstream fine-tuning, 1M paired panoramic samples support style transfer, inpainting, outpainting.",
      },
      {
        num: 8,
        title: "DeltaV: Visual State Updates in Unified Multimodal Models",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2607.08434",
        description: "Replaces full-image generation with compact update tokens, reducing 55.6% visual tokens while maintaining reconstruction fidelity; TSIM Router dynamically allocates tokens based on visual change magnitude.",
      },
      {
        num: 9,
        title: "FabriVLA: Lightweight Vision-Language-Action Model",
        tag: "Robotics",
        href: "https://arxiv.org/abs/2607.08575",
        description: "InternVL3.5 backbone + flow-matching action head with gated self-attention across action tokens, achieves 90% success rate on Meta-World MT50.",
      },
    ],
    observation: "This week's papers reveal two clear technical trends. First, the stability problem in long-horizon video generation is being addressed through multiple complementary strategies: Wan-Dancer's hierarchical global-local architecture, LongE2V's autoregressive unrolling with adaptive context switching, and OPSD-V's on-policy self-distillation—attacking from architectural design, training strategy, and distillation perspectives respectively. Second, video diffusion model capabilities are expanding toward general visual intelligence—GenCeption demonstrates that video generative pretraining transfers to depth, pose, segmentation and other perception tasks, suggesting a new technical pathway for music-to-dance: instead of training specialized audio-visual alignment modules from scratch, post-train on large-scale video generation models leveraging their internalized spatiotemporal world priors.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-13`,
        'en': `/en/daily/music-to-dance/2026-07-13`,
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
      date="2026-07-13"
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
