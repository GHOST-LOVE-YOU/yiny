import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "长视频外推与动作控制：自回归扩散的新突破",
    overview: [
      "Self Gradient Forcing 解决了自回归视频扩散中的历史上下文梯度缺失问题，仅用5秒训练窗口即可外推至数分钟长视频",
      "ABot-World-0 实现了单卡RTX 5090上720P/16FPS的实时交互式世界模型，为动作条件视频生成提供新范式",
      "Masked Visual Actions 提出像素级动作控制接口，实现前向/逆向动力学统一建模"
    ],
    papers: [
      {
        num: 1,
        tag: "长视频生成",
        title: "Self Gradient Forcing：原生长视频外推训练框架",
        description: "自回归视频扩散模型在生成长视频时面临一个根本性问题：未来帧的损失无法监督历史KV缓存的写入过程，导致人物身份、背景布局和时序稳定性随时间漂移。论文提出Self Gradient Forcing (SGF)，一种双阶段训练策略——Pass 1执行无梯度的自回归 rollout 并记录中间状态，Pass 2并行重建上下文梯度，使未来损失能够监督自生成 latent 如何被编码为 KV 记忆。实验表明，仅用5秒训练窗口，SGF可将视频外推至240秒（4分钟）以上，在主体一致性（Subject Consistency 0.983 vs 0.976）、背景一致性（Background Consistency 0.974 vs 0.970）和闪烁抑制（Flickering 0.991 vs 0.988）上均优于Self Forcing基线。对于舞蹈视频生成，这意味着即使训练数据只有短片段，也能生成完整舞曲长度的连贯表演。",
        keyPoints: [
          "历史上下文梯度缺口：frozen-cache Self Forcing 无法让未来损失监督 clean-timestep 的KV写入",
          "SGF双阶段训练：Pass 1无梯度rollout记录状态，Pass 2并行重建恢复KV梯度流",
          "仅用5秒训练窗口即可外推至240秒长视频，GSB人类偏好评分提升29.6%-48.7%"
        ],
        href: "https://arxiv.org/abs/2607.20368",
        paperLink: "Self Gradient Forcing: Native Long Video Extrapolation",
      },
      {
        num: 2,
        tag: "世界模型",
        title: "ABot-World-0：单卡实时交互世界模型",
        description: "论文提出了一个动作条件视频世界模型，在单张RTX 5090上实现720P/16FPS的实时无限交互式世界 rollout。核心技术包括：WorldExplorer代理驱动数据收集系统，通过训练反馈动态调整数据采集；渐进式双向到因果蒸馏，配合LongForcing机制对齐长时程学生自rollout与扩展视野教师模型；参考角色记忆（reference-character memory）为第三人称视角提供持久外观线索。系统采用流式推理栈，包括轻量级VAE解码器、高效注意力、内存感知调度和低比特DiT推理，动作到首帧延迟仅1.2秒。对于舞蹈生成，其键盘动作接口和角色记忆机制可直接迁移——用音乐节拍信号替代键盘动作，用参考人物图替代角色记忆，实现音乐驱动的可控舞蹈生成。",
        keyPoints: [
          "单卡RTX 5090实现720P@16FPS实时交互，峰值显存19GB，动作到首帧延迟1.2秒",
          "LongForcing：将分布级教师监督扩展至长时程学生自rollout，缓解自回归漂移",
          "参考角色记忆为第三人称长rollout提供身份一致性，可直接借鉴用于舞蹈人物外观保持"
        ],
        href: "https://arxiv.org/abs/2607.19191",
        paperLink: "ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU",
      },
      {
        num: 3,
        tag: "动作控制",
        title: "Masked Visual Actions：统一世界建模的像素级动作接口",
        description: "论文提出将动作表示为像素空间中的部分揭示轨迹（masked trajectory），使预训练视频模型能够通过微调成为机器人世界模型。关键洞察：当揭示的实体是机器人时，模型作为前向动力学模型预测场景响应；当揭示的是期望物体运动时，同一模型作为逆向模型恢复机器人行为。仅用15小时真实视频和仿真数据进行LoRA微调（rank 256），单检查点即可在多种机器人和场景中实现零样本泛化。在DROID数据集上，LPIPS达0.0945（vs Ctrl-World的0.362），SSIM达0.887。对于舞蹈生成，这种像素级动作表示可直接用于编码音频驱动的动作信号——将音乐节拍转化为视觉轨迹掩码，让模型学习音频-动作-视频的联合分布。",
        keyPoints: [
          "像素级动作接口：将动作表示为部分揭示的时空轨迹，与视频模型原生表示对齐",
          "前向/逆向统一：揭示机器人运动→前向模型；揭示物体运动→逆向模型，同一检查点两用",
          "15小时数据LoRA微调即可实现跨 embodiment 零样本泛化，BEHAVIOR unseen embodiment SSIM 0.843"
        ],
        href: "https://arxiv.org/abs/2607.19343",
        paperLink: "Masked Visual Actions for Unified World Modeling",
      },
      {
        num: 4,
        tag: "音视频推理",
        title: "OmniReasoner：长音视频推理的原生工具使用",
        description: "论文针对长音视频推理中的证据稀疏性和跨模态对齐问题，提出工具使用后训练框架。模型首先构建低成本的全局预览，然后决定是否需要调用zoom-in工具获取更高保真度的局部音视频片段。核心创新TimeAnchor确保工具的时间参数在不同采样粒度（稀疏全局预览 vs 密集局部片段）之间保持一致。通过Temporal Augmented Data Engine合成工具使用轨迹进行SFT+RL训练。实验表明，该方法在多个omnimodal基准上提升答案准确率和时间定位精度。对于音乐驱动舞蹈，这种选择性聚焦机制可用于在长篇音乐中定位关键节拍点，实现更精确的音频-动作对齐。",
        keyPoints: [
          "工具使用后训练：模型学习何时何地调用zoom-in工具获取高保真证据",
          "TimeAnchor：保持时间参数在不同采样粒度间的往返一致性，解决跨粒度定位问题",
          "Temporal Augmented Data Engine：通过视频编辑和合成为工具使用行为提供大规模监督"
        ],
        href: "https://arxiv.org/abs/2607.19339",
        paperLink: "OmniReasoner: Thinking with Long Audio-Video via Native Tool Use",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "AlayaRenderer-Flash：实时生成式世界渲染器",
        tag: "实时渲染",
        href: "https://arxiv.org/abs/2607.18703",
        description: "将生成式世界渲染器从0.56 FPS提升至31.54 FPS，达到可玩速度。流式自回归模型+轻量级蒸馏编解码器，为舞蹈视频实时推理提供效率优化参考。",
      },
      {
        num: 6,
        title: "DiT中模板token作为隐式语义寄存器",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2607.19139",
        description: "发现结构模板token在DiT中作为隐式语义寄存器维持对象身份，可解释20%注意力FLOPs的剪枝。有助于理解扩散模型中的身份保持机制。",
      },
      {
        num: 7,
        title: "Mage-Flow：高效原生分辨率图像生成",
        tag: "高效生成",
        href: "https://arxiv.org/abs/2607.19064",
        description: "4B参数模型，4步Turbo变体在A100上0.59秒生成1024²图像。Mage-VAE将token化成本降低一个数量级，为舞蹈视频生成效率优化提供思路。",
      },
      {
        num: 8,
        title: "Appearance Pointers：DiT的多模态区域控制",
        tag: "可控生成",
        href: "https://arxiv.org/abs/2607.19344",
        description: "紧凑token引导DiT在正确空间位置关注正确外观线索，无需从头训练基础模型。可用于舞蹈生成中的服装/姿态区域级控制。",
      },
      {
        num: 9,
        title: "WorldScape Policy 2.0：推理增强记忆的可控世界动作模型",
        tag: "记忆机制",
        href: "https://arxiv.org/abs/2607.18840",
        description: "因果短期视觉记忆+长短期事件记忆组织历史VLM输出，支持长时程自主规划和细粒度指令跟随。对舞蹈动作的长时序记忆和规划有借鉴意义。",
      },
    ],
    observation: "今日论文呈现两个明确趋势：一是自回归视频扩散正在突破长时程一致性瓶颈——SGF通过恢复上下文梯度监督，仅用短训练窗口即可外推至数分钟长视频；ABot-World-0则展示了单卡实时交互世界模型的工程可行性。二是动作控制接口正在从低维向量向像素级视觉表示迁移——Masked Visual Actions证明像素空间掩码可作为跨embodiment的统一控制语言。对于音乐驱动舞蹈生成，这些进展意味着：1) 可用更短训练数据生成长舞曲视频；2) 音频节拍可编码为视觉轨迹掩码实现原生控制；3) 参考人物图+音频的联合条件生成正在变得实时可行。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "Long Video Extrapolation & Motion Control: New Breakthroughs in Autoregressive Diffusion",
    overview: [
      "Self Gradient Forcing solves the historical context-gradient gap in autoregressive video diffusion, extrapolating from 5-second training windows to minute-scale videos",
      "ABot-World-0 achieves real-time interactive world modeling at 720P/16FPS on a single RTX 5090, offering a new paradigm for action-conditioned video generation",
      "Masked Visual Actions proposes a pixel-space action control interface enabling unified forward/inverse dynamics modeling"
    ],
    papers: [
      {
        num: 1,
        tag: "Long Video Generation",
        title: "Self Gradient Forcing: Native Long Video Extrapolation Training Framework",
        description: "Autoregressive video diffusion models face a fundamental challenge in long-form generation: future frame losses cannot supervise the writing process of historical KV caches, causing drift in subject identity, background layout, and temporal stability over time. This paper proposes Self Gradient Forcing (SGF), a two-pass training strategy—Pass 1 performs gradient-free autoregressive rollout and records intermediate states, while Pass 2 reconstructs context gradients in parallel, enabling future losses to supervise how self-generated latents are encoded into KV memory. Experiments show that with only a 5-second training window, SGF can extrapolate to videos over 240 seconds (4 minutes), outperforming Self Forcing baselines in subject consistency (0.983 vs 0.976), background consistency (0.974 vs 0.970), and flickering suppression (0.991 vs 0.988). For dance video generation, this means coherent full-length performances can be generated even when training data consists only of short clips.",
        keyPoints: [
          "Historical context-gradient gap: frozen-cache Self Forcing cannot let future losses supervise clean-timestep KV writing",
          "SGF two-pass training: Pass 1 gradient-free rollout records states, Pass 2 parallel reconstruction restores KV gradient flow",
          "Extrapolates from 5-second training window to 240-second videos, GSB human preference scores improve 29.6%-48.7%"
        ],
        href: "https://arxiv.org/abs/2607.20368",
        paperLink: "Self Gradient Forcing: Native Long Video Extrapolation",
      },
      {
        num: 2,
        tag: "World Model",
        title: "ABot-World-0: Real-Time Interactive World Model on Single GPU",
        description: "This paper presents an action-conditioned video world model achieving real-time infinite interactive world rollout at 720P/16FPS on a single RTX 5090. Core technologies include: WorldExplorer agent-driven data collection system that dynamically adjusts data acquisition through training feedback; progressive bidirectional-to-causal distillation with LongForcing mechanism aligning long-horizon student self-rollouts with extended-horizon teacher models; reference-character memory providing persistent appearance cues for third-person viewpoints. The system employs a streaming inference stack including lightweight VAE decoder, efficient attention, memory-aware scheduling, and low-bit DiT inference, with only 1.2-second action-to-first-frame latency. For dance generation, its keyboard action interface and character memory mechanisms can be directly adapted—replacing keyboard actions with music beat signals and reference images with character memory to enable music-driven controllable dance generation.",
        keyPoints: [
          "Single RTX 5090 achieves 720P@16FPS real-time interaction, 19GB peak VRAM, 1.2s action-to-first-frame latency",
          "LongForcing: extends distribution-level teacher supervision to long-horizon student self-rollouts, mitigating autoregressive drift",
          "Reference-character memory provides identity consistency for third-person long rollouts, directly applicable to dancer appearance preservation"
        ],
        href: "https://arxiv.org/abs/2607.19191",
        paperLink: "ABot-World-0: Infinite Interactive World Rollout on a Single Desktop GPU",
      },
      {
        num: 3,
        tag: "Motion Control",
        title: "Masked Visual Actions: Pixel-Space Action Interface for Unified World Modeling",
        description: "This paper proposes representing actions as partially revealed trajectories (masked trajectories) in pixel space, enabling pretrained video models to become robotic world models through fine-tuning. Key insight: when the revealed entity is the robot, the model acts as a forward dynamics model predicting scene response; when revealing desired object motion, the same model acts as an inverse model recovering robot behavior. With only 15 hours of real video and simulation data for LoRA fine-tuning (rank 256), a single checkpoint achieves zero-shot generalization across diverse robots and scenes. On DROID dataset, LPIPS reaches 0.0945 (vs 0.362 for Ctrl-World), SSIM reaches 0.887. For dance generation, this pixel-level action representation can directly encode audio-driven motion signals—converting music beats into visual trajectory masks for the model to learn the joint distribution of audio-motion-video.",
        keyPoints: [
          "Pixel-level action interface: represents actions as partially revealed spatiotemporal trajectories, aligned with video model native representations",
          "Forward/inverse unification: revealing robot motion → forward model; revealing object motion → inverse model, same checkpoint serves both",
          "15 hours of data with LoRA fine-tuning achieves cross-embodiment zero-shot generalization, BEHAVIOR unseen embodiment SSIM 0.843"
        ],
        href: "https://arxiv.org/abs/2607.19343",
        paperLink: "Masked Visual Actions for Unified World Modeling",
      },
      {
        num: 4,
        tag: "Audio-Video Reasoning",
        title: "OmniReasoner: Native Tool Use for Long Audio-Video Reasoning",
        description: "Addressing evidence sparsity and cross-modal alignment in long audio-video reasoning, this paper proposes a tool-use post-training framework. The model first constructs a low-cost global preview, then decides whether to call a zoom-in tool for higher-fidelity local audio-video segments. The core innovation TimeAnchor ensures the tool's temporal arguments remain consistent across different sampling granularities (sparse global preview vs dense local clips). Tool-use trajectories are synthesized via the Temporal Augmented Data Engine for SFT+RL training. Experiments show improved answer accuracy and temporal grounding on multiple omnimodal benchmarks. For music-driven dance, this selective attention mechanism can locate key beat points in long music pieces for more precise audio-motion alignment.",
        keyPoints: [
          "Tool-use post-training: model learns when and where to call zoom-in tool for high-fidelity evidence",
          "TimeAnchor: maintains round-trip consistency of temporal arguments across different sampling granularities",
          "Temporal Augmented Data Engine: provides large-scale supervision for tool-use behavior through video editing and composition"
        ],
        href: "https://arxiv.org/abs/2607.19339",
        paperLink: "OmniReasoner: Thinking with Long Audio-Video via Native Tool Use",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "AlayaRenderer-Flash: Real-Time Generative World Renderer",
        tag: "Real-Time Rendering",
        href: "https://arxiv.org/abs/2607.18703",
        description: "Accelerates generative world renderer from 0.56 FPS to 31.54 FPS, reaching playable speeds. Streaming autoregressive model + lightweight distilled codecs, providing efficiency optimization references for dance video real-time inference.",
      },
      {
        num: 6,
        title: "Template Tokens as Implicit Semantic Registers in DiT",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2607.19139",
        description: "Discovers structural template tokens act as implicit semantic registers maintaining object identity in DiT, enabling 20% attention FLOPs pruning. Helps understand identity preservation mechanisms in diffusion models.",
      },
      {
        num: 7,
        title: "Mage-Flow: Efficient Native-Resolution Image Generation",
        tag: "Efficient Generation",
        href: "https://arxiv.org/abs/2607.19064",
        description: "4B parameter model, 4-step Turbo variant generates 1024² images in 0.59 seconds on A100. Mage-VAE reduces tokenization cost by an order of magnitude, providing insights for dance video generation efficiency optimization.",
      },
      {
        num: 8,
        title: "Appearance Pointers: Multimodal Region Control for DiT",
        tag: "Controllable Generation",
        href: "https://arxiv.org/abs/2607.19344",
        description: "Compact tokens guide DiT to attend to correct appearance cues at correct spatial locations without base model retraining. Applicable to costume/pose region-level control in dance generation.",
      },
      {
        num: 9,
        title: "WorldScape Policy 2.0: Reasoning-Augmented Memory for Controllable World Action Modeling",
        tag: "Memory Mechanisms",
        href: "https://arxiv.org/abs/2607.18840",
        description: "Causal short-term visual memory + long short-term event memory organizing historical VLM outputs, supporting long-horizon autonomous planning and fine-grained instruction following. Relevant for long-temporal dance motion memory and planning.",
      },
    ],
    observation: "Today's papers reveal two clear trends: first, autoregressive video diffusion is breaking through long-horizon consistency bottlenecks—SGF enables minute-scale extrapolation from short training windows by restoring context-gradient supervision, while ABot-World-0 demonstrates the engineering feasibility of single-GPU real-time interactive world models. Second, action control interfaces are migrating from low-dimensional vectors to pixel-level visual representations—Masked Visual Actions proves pixel-space masks can serve as a unified control language across embodiments. For music-driven dance generation, these advances imply: 1) longer dance videos can be generated from shorter training data; 2) audio beats can be encoded as visual trajectory masks for native control; 3) joint conditional generation from reference images + audio is becoming real-time feasible.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-23`,
        'en': `/en/daily/music-to-dance/2026-07-23`,
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
      date="2026-07-23"
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
