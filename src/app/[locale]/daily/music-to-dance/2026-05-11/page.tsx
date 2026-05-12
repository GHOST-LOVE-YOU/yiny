import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-05-11 | 扩散模型加速与多任务对齐的新进展",
    overview: [
      "Normalizing Trajectory Models 用条件归一化流实现 4 步高质量采样，保留精确似然",
      "Flow-OPD 将 on-policy distillation 引入 Flow Matching，解决多任务对齐的梯度干扰问题",
      "Prior-Aligned AutoEncoder 揭示扩散友好 latent manifold 的三大关键属性",
      "Delta-Adapter 实现单样本监督的示例驱动图像编辑，为外观迁移提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "扩散加速",
        title: "Normalizing Trajectory Models：4 步采样 + 精确似然",
        description: "论文提出 NTM，用条件归一化流建模扩散的反向条件分布 p(x_s|x_t)，解决少步采样时高斯假设失效的问题。核心架构包括：可逆 transporter（基于 TarFlow 块）将 x_t 和 x_s 映射到 latent space；Gaussian predictor 在 latent space 中进行预测。这种设计使得模型可以通过变分公式进行精确对数似然训练。更关键的是，NTM 支持自蒸馏：利用模型自身的 score 信号训练轻量级去噪器，实现 4 步高质量采样。实验显示，从零训练的 NTM 在 GenEval 上达到 0.82（256 步 STARFlow 仅 0.56），且能直接初始化自预训练的 flow-matching 模型。对 music-to-dance 而言，NTM 提供了加速视频扩散生成的可行路径——将 50 步采样压缩到 4 步，同时保留精确似然，这对实时舞蹈视频生成有重要价值。",
        keyPoints: [
          "用可逆 transporter + Gaussian predictor 建模非高斯反向条件，实现精确似然训练",
          "自蒸馏机制将模型自身的 score 信号蒸馏为轻量级去噪器，4 步即可生成高质量样本",
          "支持从预训练 flow-matching 模型初始化（transporter 设为单位映射，predictor 加载预训练权重）"
        ],
        href: "https://arxiv.org/abs/2605.08078",
        paperLink: "Normalizing Trajectory Models"
      },
      {
        num: 2,
        tag: "多任务对齐",
        title: "Flow-OPD：Flow Matching 的 On-Policy Distillation 框架",
        description: "论文针对 Flow Matching 模型在多任务对齐时的两大瓶颈——标量奖励导致的奖励稀疏、异质目标联合优化导致的梯度干扰——提出 Flow-OPD。方法采用两阶段策略：第一阶段用单奖励 GRPO 微调培养领域专家教师；第二阶段通过 Flow-based Cold-Start 建立稳健初始策略，再用三步编排（on-policy 采样、任务路由标注、密集轨迹级监督）将异质专家知识整合到单一学生模型。此外引入 Manifold Anchor Regularization（MAR），利用任务无关教师提供全数据监督，将生成过程锚定到高质量流形，缓解纯 RL 对齐中的美学退化。基于 SD3.5 Medium 的实验显示，Flow-OPD 将 GenEval 从 63 提升到 92，OCR 准确率从 59 提升到 94，比 vanilla GRPO 提升约 10 分。对 music-to-dance 的多条件（音频+参考图）对齐训练有直接参考价值。",
        keyPoints: [
          "识别多任务 Flow Matching 训练的失败模式：奖励稀疏 + 梯度干扰导致的 seesaw 效应",
          "两阶段框架解耦专家能力获取与模型统一，支持 SFT 和模型合并两种 Cold-Start 变体",
          "MAR 正则化利用任务无关教师锚定高质量流形，缓解 RL 驱动对齐的美学退化"
        ],
        href: "https://arxiv.org/abs/2605.08063",
        paperLink: "Flow-OPD: On-Policy Distillation for Flow Matching Models"
      },
      {
        num: 3,
        tag: "Tokenizer 设计",
        title: "Prior-Aligned AutoEncoder：构建扩散友好的 Latent Manifold",
        description: "论文从 latent manifold 组织角度研究什么样的 latent space 对扩散模型最友好。通过控制实验识别出三个关键属性：空间结构一致性（SSC）、局部流形连续性（LPC）、全局语义质量（GSQ）。实验发现这些属性与下游生成质量（gFID）的相关性高于重建保真度（rFID）。基于这一发现提出 PAE，通过三种正则化显式塑造 latent manifold：Spatial Structure Regularization（SSR）对齐 VFM 特征增强实例级空间结构；Manifold Continuity Regularization（MCR）通过扰动 latent 并强制解码感知一致性促进局部连续性；Semantic Consistency Regularization（SCR）对齐全局池化 VFM 特征保持语义组织。ImageNet 256×256 实验显示，PAE 达到 rFID 0.26，在 LightningDiT 设置下以 13× 更少 epoch 达到与 RAE 相当的性能，最佳 gFID 1.03（SOTA），且 45 步采样仍保持 gFID 1.05。对优化舞蹈视频生成的 latent space 设计有直接指导意义。",
        keyPoints: [
          "识别扩散友好 latent manifold 的三大属性：空间结构一致性、局部连续性、全局语义组织",
          "提出三种对应正则化（SSR/MCR/SCR）显式优化 manifold 几何，而非依赖重建或特征继承",
          "13× 更快收敛，45 步采样保持高质量，gFID 1.03 达到 SOTA"
        ],
        href: "https://arxiv.org/abs/2605.07915",
        paperLink: "What Matters for Diffusion-Friendly Latent Manifold? Prior-Aligned Autoencoders for Latent Diffusion"
      },
      {
        num: 4,
        tag: "外观迁移",
        title: "Delta-Adapter：单样本监督的示例驱动图像编辑",
        description: "论文针对示例驱动图像编辑中 pair-of-pairs 监督范式导致的数据策展困难问题，提出 Delta-Adapter。核心洞察是：不直接暴露目标图像 a' 作为条件，而是提取编码视觉变换的语义 delta，使模型仅接收 (a, Δa→a') 作为输入，从而 a' 可作为预测目标实现单样本监督。具体实现：用预训练 SigLIP 提取 patch 级特征，计算归一化语义 delta（LN(f_a') - LN(f_a)），通过门控残差投影和 Perceiver resampler 转换为 edit tokens，注入冻结的 DiT 编辑主干。训练使用 flow matching loss 加语义 delta 一致性损失。该方法可直接利用现有大规模图像编辑数据集，支持测试时微调以适应新变换。实验显示在 seen 和 unseen 编辑任务上均优于基线。对 music-to-dance 的外观迁移子问题有直接借鉴价值——单样本监督范式可扩展到舞蹈视频的人物外观迁移。",
        keyPoints: [
          "用语义 delta 替代直接暴露目标图像，实现单样本监督，摆脱 pair-of-pairs 限制",
          "基于 SigLIP 特征提取 + Perceiver adapter 的轻量级架构，冻结主干仅训练 adapter",
          "支持测试时微调，对 unseen 编辑任务有良好泛化能力"
        ],
        href: "https://arxiv.org/abs/2605.07940",
        paperLink: "Delta-Adapter: Scalable Exemplar-Based Image Editing with Single-Pair Supervision"
      }
    ],
    worthReading: [
      {
        num: 5,
        title: "STARFlow2：统一多模态生成的自回归归一化流",
        tag: "多模态生成",
        href: "https://arxiv.org/abs/2605.08029",
        description: "将自回归归一化流与 LLM 统一架构，文本和视觉共享因果掩码和 KV-cache，对音频-视觉联合生成架构有参考价值。"
      },
      {
        num: 6,
        title: "SCOPE：复杂图像生成的语义承诺跟踪",
        tag: "语义控制",
        href: "https://arxiv.org/abs/2605.08043",
        description: "提出语义承诺跟踪机制解决概念漂移问题，对多条件舞蹈视频生成的语义一致性控制有启发。"
      },
      {
        num: 7,
        title: "SAVEMem：语义感知的流式视频记忆",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2605.07897",
        description: "训练无关的双阶段框架将语义感知引入视频记忆管理，对长时舞蹈视频的时序一致性保持有参考价值。"
      },
      {
        num: 8,
        title: "TextLDM：连续 Latent Diffusion 语言建模",
        tag: "统一架构",
        href: "https://arxiv.org/abs/2605.07748",
        description: "将视觉 DiT+flow matching 方法迁移到语言建模，验证跨模态通用性，对统一多模态舞蹈生成架构有参考意义。"
      },
      {
        num: 9,
        title: "EditTransfer++：视觉提示引导的图像编辑",
        tag: "图像编辑",
        href: "https://arxiv.org/abs/2605.07455",
        description: "text-decoupled 训练和对比精炼机制提升视觉提示保真度，对舞蹈视频中的外观编辑有参考价值。"
      },
      {
        num: 10,
        title: "RLA-WM：残差潜动作视觉世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2605.07079",
        description: "基于 DINO 残差学习残差潜动作，比视频扩散快数个数量级，对高效舞蹈视频生成有潜在借鉴价值。"
      }
    ],
    observation: "今日论文围绕扩散模型的效率与可控性展开。NTM 和 Flow-OPD 分别从采样效率和训练稳定性角度推进：NTM 用归一化流打破高斯假设瓶颈，实现 4 步精确似然采样；Flow-OPD 将 LLM 领域的 OPD 范式迁移到视觉生成，解决多任务对齐的梯度干扰。PAE 则从 latent space 设计角度提供底层支撑——更好的 manifold 组织带来 13× 训练加速。这三者共同指向一个方向：扩散模型的实用化需要全栈优化，从 tokenizer 到采样再到对齐。对 music-to-dance 而言，这些进展提供了加速推理、稳定多条件训练、优化 latent 表示的完整工具箱。"
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-05-11 | Advances in Diffusion Acceleration and Multi-Task Alignment",
    overview: [
      "Normalizing Trajectory Models achieves 4-step high-quality sampling with exact likelihood via conditional normalizing flows",
      "Flow-OPD brings on-policy distillation to Flow Matching, solving gradient interference in multi-task alignment",
      "Prior-Aligned AutoEncoder reveals three key properties of diffusion-friendly latent manifolds",
      "Delta-Adapter enables exemplar-driven image editing with single-pair supervision, offering new ideas for appearance transfer"
    ],
    papers: [
      {
        num: 1,
        tag: "Diffusion Acceleration",
        title: "Normalizing Trajectory Models: 4-Step Sampling + Exact Likelihood",
        description: "This paper proposes NTM, which models the reverse conditional distribution p(x_s|x_t) using conditional normalizing flows to address the failure of Gaussian assumptions in few-step sampling. The core architecture includes: an invertible transporter (based on TarFlow blocks) that maps x_t and x_s to latent space; and a Gaussian predictor that operates in latent space. This design enables exact log-likelihood training via the change-of-variables formula. More critically, NTM supports self-distillation: training a lightweight denoiser using the model's own score signal to achieve 4-step high-quality sampling. Experiments show NTM trained from scratch achieves 0.82 on GenEval (vs 0.56 for 256-step STARFlow), and can be initialized directly from pretrained flow-matching models. For music-to-dance, NTM provides a viable path to accelerate video diffusion generation—compressing 50-step sampling to 4 steps while retaining exact likelihood, which is valuable for real-time dance video generation.",
        keyPoints: [
          "Models non-Gaussian reverse conditionals with invertible transporter + Gaussian predictor for exact likelihood training",
          "Self-distillation mechanism distills the model's own score signal into a lightweight denoiser for 4-step generation",
          "Supports initialization from pretrained flow-matching models (identity transporter, pretrained predictor weights)"
        ],
        href: "https://arxiv.org/abs/2605.08078",
        paperLink: "Normalizing Trajectory Models"
      },
      {
        num: 2,
        tag: "Multi-Task Alignment",
        title: "Flow-OPD: On-Policy Distillation Framework for Flow Matching",
        description: "This paper addresses two bottlenecks in Flow Matching multi-task alignment—reward sparsity from scalar rewards and gradient interference from jointly optimizing heterogeneous objectives—by proposing Flow-OPD. The method uses a two-stage strategy: first, cultivating domain expert teachers via single-reward GRPO fine-tuning; second, establishing a robust initial policy through Flow-based Cold-Start, then consolidating heterogeneous expertise into a single student via three-step orchestration (on-policy sampling, task-routing labeling, dense trajectory-level supervision). Additionally, Manifold Anchor Regularization (MAR) uses a task-agnostic teacher to provide full-data supervision, anchoring generation to a high-quality manifold and mitigating aesthetic degradation in pure RL alignment. Experiments on SD3.5 Medium show Flow-OPD improves GenEval from 63 to 92 and OCR accuracy from 59 to 94, roughly 10 points above vanilla GRPO. Directly relevant for multi-condition (audio+reference image) alignment training in music-to-dance.",
        keyPoints: [
          "Identifies failure modes in multi-task Flow Matching training: reward sparsity + gradient interference causing seesaw effects",
          "Two-stage framework decouples expertise acquisition from model unification, supporting both SFT and model merging Cold-Start variants",
          "MAR regularization anchors to high-quality manifold using task-agnostic teacher, mitigating aesthetic degradation in RL-driven alignment"
        ],
        href: "https://arxiv.org/abs/2605.08063",
        paperLink: "Flow-OPD: On-Policy Distillation for Flow Matching Models"
      },
      {
        num: 3,
        tag: "Tokenizer Design",
        title: "Prior-Aligned AutoEncoder: Building Diffusion-Friendly Latent Manifolds",
        description: "This paper studies what kind of latent space is truly friendly for diffusion models from the perspective of latent manifold organization. Through controlled experiments, it identifies three key properties: Spatial Structure Coherence (SSC), Local Perceptual Continuity (LPC), and Global Semantic Quality (GSQ). Experiments find these properties correlate more strongly with downstream generation quality (gFID) than reconstruction fidelity (rFID). Based on this, PAE is proposed with three regularizations to explicitly shape the latent manifold: Spatial Structure Regularization (SSR) aligns VFM features to enhance instance-level spatial structure; Manifold Continuity Regularization (MCR) promotes local continuity by perturbing latents and enforcing perceptual consistency; Semantic Consistency Regularization (SCR) aligns globally pooled VFM features for semantic organization. ImageNet 256×256 experiments show PAE achieves rFID 0.26, reaches comparable performance to RAE with 13× fewer epochs under LightningDiT settings, achieves SOTA gFID of 1.03, and maintains gFID 1.05 with only 45 sampling steps. Directly guides latent space design for dance video generation optimization.",
        keyPoints: [
          "Identifies three key properties of diffusion-friendly latent manifolds: spatial coherence, local continuity, global semantic organization",
          "Proposes three corresponding regularizations (SSR/MCR/SCR) to explicitly optimize manifold geometry rather than relying on reconstruction or feature inheritance",
          "13× faster convergence, maintains high quality at 45 sampling steps, gFID 1.03 achieves SOTA"
        ],
        href: "https://arxiv.org/abs/2605.07915",
        paperLink: "What Matters for Diffusion-Friendly Latent Manifold? Prior-Aligned Autoencoders for Latent Diffusion"
      },
      {
        num: 4,
        tag: "Appearance Transfer",
        title: "Delta-Adapter: Exemplar-Driven Image Editing with Single-Pair Supervision",
        description: "This paper addresses the data curation difficulties caused by the pair-of-pairs supervision paradigm in exemplar-based image editing by proposing Delta-Adapter. The core insight is: instead of directly exposing the target image a' as a condition, extract a semantic delta encoding the visual transformation, so the model only receives (a, Δa→a') as input, enabling a' to serve as the prediction target for single-pair supervision. Implementation: use pretrained SigLIP to extract patch-level features, compute normalized semantic delta (LN(f_a') - LN(f_a)), convert to edit tokens via gated residual projection and Perceiver resampler, and inject into a frozen DiT editing backbone. Training uses flow matching loss plus semantic delta consistency loss. This method can directly leverage existing large-scale image editing datasets and supports test-time fine-tuning for new transformations. Experiments show superior performance on both seen and unseen editing tasks. Directly applicable to the appearance transfer sub-problem in music-to-dance—the single-pair supervision paradigm can be extended to person appearance transfer in dance videos.",
        keyPoints: [
          "Uses semantic delta instead of directly exposing target image, enabling single-pair supervision and eliminating pair-of-pairs constraints",
          "Lightweight architecture based on SigLIP feature extraction + Perceiver adapter, freezing backbone and only training adapter",
          "Supports test-time fine-tuning with good generalization to unseen editing tasks"
        ],
        href: "https://arxiv.org/abs/2605.07940",
        paperLink: "Delta-Adapter: Scalable Exemplar-Based Image Editing with Single-Pair Supervision"
      }
    ],
    worthReading: [
      {
        num: 5,
        title: "STARFlow2: Autoregressive Normalizing Flows for Unified Multimodal Generation",
        tag: "Multimodal Generation",
        href: "https://arxiv.org/abs/2605.08029",
        description: "Unifies autoregressive normalizing flows with LLM architecture, sharing causal masks and KV-cache between text and vision. Relevant for audio-visual joint generation architecture."
      },
      {
        num: 6,
        title: "SCOPE: Semantic Commitment Tracking for Complex Image Generation",
        tag: "Semantic Control",
        href: "https://arxiv.org/abs/2605.08043",
        description: "Proposes semantic commitment tracking to solve concept drift, inspiring for semantic consistency control in multi-condition dance video generation."
      },
      {
        num: 7,
        title: "SAVEMem: Semantic-Aware Streaming Video Memory",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2605.07897",
        description: "Training-free dual-stage framework bringing semantic awareness to video memory management. Relevant for temporal consistency in long dance videos."
      },
      {
        num: 8,
        title: "TextLDM: Continuous Latent Diffusion for Language Modeling",
        tag: "Unified Architecture",
        href: "https://arxiv.org/abs/2605.07748",
        description: "Migrates visual DiT+flow matching to language modeling, validating cross-modal generality. Relevant for unified multimodal dance generation architecture."
      },
      {
        num: 9,
        title: "EditTransfer++: Visual-Prompt-Guided Image Editing",
        tag: "Image Editing",
        href: "https://arxiv.org/abs/2605.07455",
        description: "Text-decoupled training and contrastive refinement improve visual prompt faithfulness. Relevant for appearance editing in dance videos."
      },
      {
        num: 10,
        title: "RLA-WM: Residual Latent Action Visual World Models",
        tag: "World Models",
        href: "https://arxiv.org/abs/2605.07079",
        description: "Learns residual latent actions from DINO residuals, orders of magnitude faster than video diffusion. Potentially valuable for efficient dance video generation."
      }
    ],
    observation: "Today's papers focus on efficiency and controllability in diffusion models. NTM and Flow-OPD advance from sampling efficiency and training stability perspectives respectively: NTM breaks the Gaussian assumption bottleneck with normalizing flows, achieving 4-step exact-likelihood sampling; Flow-OPD migrates the OPD paradigm from LLMs to visual generation, solving gradient interference in multi-task alignment. PAE provides underlying support from the latent space design angle—better manifold organization brings 13× training acceleration. Together these point in one direction: practical diffusion models require full-stack optimization from tokenizer to sampling to alignment. For music-to-dance, these advances provide a complete toolkit for accelerating inference, stabilizing multi-condition training, and optimizing latent representations."
  }
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
        'zh-CN': `/zh/daily/music-to-dance/2026-05-11`,
        'en': `/en/daily/music-to-dance/2026-05-11`,
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
      date="2026-05-11"
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