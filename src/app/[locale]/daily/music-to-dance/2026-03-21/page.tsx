import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "2026-03-21 | 运动建模与3D感知定制新进展",
    overview: [
      "SAMA提出语义锚定与运动对齐的解耦框架，通过视频恢复预训练内化时序动态",
      "MoTok扩散式离散运动tokenizer实现语义与运动学条件的粗到细控制",
      "3DreamBooth的1帧优化范式解耦空间几何与时序运动，实现高保真3D定制",
      "Motion-o显式建模运动轨迹，为舞蹈动作的节拍对齐提供可验证的推理框架"
    ],
    papers: [
      {
        num: 1,
        tag: "视频编辑",
        title: "SAMA：解耦语义锚定与运动对齐的指令引导视频编辑",
        description: "SAMA将视频编辑任务分解为语义锚定（Semantic Anchoring）和运动对齐（Motion Alignment）两个互补能力。语义锚定通过在稀疏锚定帧上联合预测语义token和视频latent，实现指令感知的结构规划；运动对齐则通过三种以运动为中心的视频恢复预训练任务（立方体修复、速度扰动、tube shuffle）让模型直接从原始视频内化时序动态。这种分解训练策略使得模型在零样本情况下就展现出强大的视频编辑能力，在VIE-Bench上达到开源模型SOTA，与Kling-Omni等商业系统竞争。",
        keyPoints: [
          "两阶段训练：分解预训练阶段学习语义-运动内在表示，监督微调阶段提升编辑保真度",
          "语义锚定：在稀疏锚定帧上提取SigLIP语义特征，通过轻量MLP投影到VAE latent空间",
          "运动对齐：立方体修复（时序块掩码）、速度扰动（恢复正常速度）、tube shuffle（2×2×2时空tube重排）三种预训练任务",
          "类型嵌入（type embedding）区分源视频、语义token、目标视频token，比RoPE偏移收敛更快"
        ],
        href: "https://arxiv.org/abs/2603.19228",
        paperLink: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
      },
      {
        num: 2,
        tag: "运动生成",
        title: "MoTok：扩散式离散运动Tokenizer实现语义与运动学统一控制",
        description: "MoTok提出Perception-Planning-Control三阶段运动生成范式，核心创新是扩散式离散运动tokenizer。与传统VQ-VAE直接解码连续运动不同，MoTok将离散token映射为每帧条件信号，再通过条件扩散模型重建运动细节。这种设计将细粒度重建任务委托给扩散解码器，使离散token专注于语义结构，实现单层codebook的紧凑表示（仅需MaskControl 1/6的token数）。在HumanML3D上，轨迹误差从0.72cm降至0.08cm，FID从0.083降至0.029。",
        keyPoints: [
          "MoTok将运动表示分解为紧凑离散token序列和基于扩散的细粒度重建",
          "粗到细条件注入：运动学条件在Planning阶段作为粗约束引导token生成，在Control阶段通过扩散优化强制执行细粒度约束",
          "支持离散扩散（DDM）和自回归（AR）两种生成器，通过统一条件接口实现",
          "单层codebook（K=1024）配合时间压缩率ρ=4或2，在保持生成质量的同时显著降低下游生成器负担"
        ],
        href: "https://arxiv.org/abs/2603.19227",
        paperLink: "Bridging Semantic and Kinematic Conditions with Diffusion-based Discrete Motion Tokenizer",
      },
      {
        num: 3,
        tag: "3D定制",
        title: "3DreamBooth：高保真3D感知主体驱动视频生成",
        description: "3DreamBooth解决现有主体驱动视频生成方法将主体视为2D实体的根本局限。通过1帧优化范式（T=1），利用视频DiT的联合时空注意力机制在单帧输入时自然绕过时间路径，将梯度更新限制在空间表示上。这种方法无需冻结时间模块或插入空间adapter，即可将主体的3D身份植入模型，同时保留预训练的时间先验。配合3Dapter多视图条件模块，通过非对称条件策略实现动态选择性路由，从最小参考集查询视图特定的几何提示。在3D-CustomBench上，Chamfer Distance从Phantom的0.0338降至0.0177。",
        keyPoints: [
          "1帧优化范式：单帧输入自然绕过时间注意力，将学习限制在空间表示，避免时间过拟合",
          "3DreamBooth通过LoRA将多视图几何变化内化到标识符token V和网络权重",
          "3Dapter双分支架构：单视图预训练后，与主分支多视图联合优化，实现动态选择性路由",
          "多视图联合注意力作为动态选择性路由器，主动过滤无关视图的冲突信号"
        ],
        href: "https://arxiv.org/abs/2603.18524",
        paperLink: "3DreamBooth: High-Fidelity 3D Subject-Driven Video Generation Model",
      },
      {
        num: 4,
        tag: "视频推理",
        title: "Motion-o：轨迹基础的视频推理与时空轨迹证据链",
        description: "Motion-o提出Spatial-Temporal-Trajectory (STT)推理，将现有方法中隐式的轨迹理解显式化。通过在时空证据链中引入<motion/>标签，模型必须在多个时间戳观察同一对象后，总结连接这些观察的运动（方向、速度、尺度变化）。这种结构化推理路径使轨迹理解可验证、可奖励。训练采用双链验证：比较原始视频和运动掩码视频（冻结帧）产生的运动标签，鼓励模型依赖真实时序证据而非文本先验。在V-STAR基准上，Motion-o达到35.5 mAM，超过Open-o3 Video的33.7。",
        keyPoints: [
          "STT推理：空间（where）+ 时间（when）+ 轨迹（how）三维度的联合推理能力",
          "Motion Chain of Thought (MCoT)：<motion obj=\"...\" dir=\"...\" speed=\"...\" scale=\"...\"/>结构化标签",
          "轨迹奖励：方向、速度、尺度三属性与真值bin匹配，相邻bin给予部分 credit",
          "视觉 grounding 奖励：运动掩码视频下运动标签应发生变化，防止文本先验捷径"
        ],
        href: "https://arxiv.org/abs/2603.18856",
        paperLink: "Motion-o: Trajectory-Grounded Video Reasoning",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "VEGA-3D：利用视频生成模型的隐式3D先验进行场景理解",
        tag: "3D理解",
        href: "https://arxiv.org/abs/2603.19235",
        description: "将预训练视频扩散模型重新定位为潜在世界模拟器，提取中间噪声水平的时空特征，通过token级自适应门控融合机制与语义表示结合，无需显式3D监督即可丰富MLLM的几何线索。",
      },
      {
        num: 6,
        title: "MonoArt：渐进式结构推理的单目关节3D重建",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2603.19231",
        description: "将视觉观察渐进式转换为规范几何、结构化部件表示和运动感知嵌入，实现稳定可解释的关节推理，无需外部运动模板或多阶段流水线。",
      },
      {
        num: 7,
        title: "EffectErase：联合视频对象移除与插入的高质量效果擦除",
        tag: "视频修复",
        href: "https://arxiv.org/abs/2603.19224",
        description: "引入VOR数据集（60K视频对，5种效果类型），将视频对象插入作为移除的逆辅助任务，通过互惠学习方案实现效果感知视频对象移除。",
      },
      {
        num: 8,
        title: "STTS：统一时空Token评分实现高效视频VLM",
        tag: "效率优化",
        href: "https://arxiv.org/abs/2603.18004",
        description: "在ViT和LLM之间统一剪枝视觉token，无需文本条件或token合并，训练和推理效率提升62%，平均性能仅下降0.7%。",
      },
      {
        num: 9,
        title: "RoboForge：物理优化的文本引导人形全身运动",
        tag: "运动生成",
        href: "https://arxiv.org/abs/2603.17927",
        description: "双向耦合生成与控制阶段，通过物理合理性优化（PP-Opt）模块抑制漂浮、滑行、穿透等伪影，将奖励优化的模拟 rollout 转换为高质量显式运动数据。",
      },
    ],
    observation: "本周论文呈现出「解耦」与「显式化」两大趋势。SAMA和MoTok都将复杂的生成任务分解为语义规划与运动控制两个阶段，通过粗到细的条件注入避免单一模块负担过重。3DreamBooth则通过1帧优化范式巧妙解耦空间几何与时序运动，充分利用视频DiT的架构特性。与此同时，Motion-o将原本隐式的轨迹理解显式化为可验证的<motion/>标签，这种结构化推理路径不仅提升可解释性，也为强化学习提供了明确的奖励信号。对于music-to-dance任务，这些工作的启示在于：音频-运动对齐可以借鉴MoTok的粗到细控制策略，外观迁移可以参考3DreamBooth的3D感知定制，而动作连贯性验证则可以引入Motion-o的轨迹显式建模思路。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "2026-03-21 | Advances in Motion Modeling and 3D-Aware Customization",
    overview: [
      "SAMA proposes a factorized framework decoupling semantic anchoring from motion alignment via video restoration pre-training",
      "MoTok enables coarse-to-fine control of semantic and kinematic conditions through diffusion-based discrete motion tokenization",
      "3DreamBooth's 1-frame optimization paradigm decouples spatial geometry from temporal motion for high-fidelity 3D customization",
      "Motion-o explicitly models motion trajectories, providing a verifiable reasoning framework for beat-aligned dance generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Video Editing",
        title: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
        description: "SAMA factorizes video editing into two complementary capabilities: Semantic Anchoring and Motion Alignment. Semantic Anchoring establishes reliable visual anchors by jointly predicting semantic tokens and video latents at sparse anchor frames, enabling instruction-aware structural planning. Motion Alignment pre-trains the backbone on motion-centric video restoration tasks (cube inpainting, speed perturbation, and tube shuffle), allowing the model to internalize temporal dynamics directly from raw videos. This factorized training strategy enables strong zero-shot video editing capability, achieving SOTA among open-source models on VIE-Bench and competing with commercial systems like Kling-Omni.",
        keyPoints: [
          "Two-stage training: factorized pre-training learns inherent semantic-motion representations, supervised fine-tuning improves edit fidelity",
          "Semantic Anchoring: extracts SigLIP features at sparse anchor frames, projects to VAE latent space via lightweight MLP",
          "Motion Alignment: three pretext tasks—cube inpainting (temporal block masking), speed perturbation (restoring normal speed), tube shuffle (2×2×2 spatio-temporal tube permutation)",
          "Type embeddings distinguish source video, semantic tokens, and target video tokens, converging faster than RoPE shifting"
        ],
        href: "https://arxiv.org/abs/2603.19228",
        paperLink: "SAMA: Factorized Semantic Anchoring and Motion Alignment for Instruction-Guided Video Editing",
      },
      {
        num: 2,
        tag: "Motion Generation",
        title: "MoTok: Diffusion-based Discrete Motion Tokenizer Bridging Semantic and Kinematic Conditions",
        description: "MoTok proposes a Perception-Planning-Control three-stage paradigm for motion generation. The core innovation is a diffusion-based discrete motion tokenizer. Unlike traditional VQ-VAE that directly decodes continuous motion, MoTok maps discrete tokens to per-frame conditioning signals, then reconstructs motion details via conditional diffusion. This design delegates fine-grained reconstruction to the diffusion decoder, freeing discrete tokens to focus on semantic structure and enabling compact single-layer codebook representation (using only 1/6 of MaskControl's tokens). On HumanML3D, trajectory error drops from 0.72cm to 0.08cm and FID from 0.083 to 0.029.",
        keyPoints: [
          "MoTok factorizes motion representation into compact discrete tokens and diffusion-based fine-grained reconstruction",
          "Coarse-to-fine conditioning: kinematic conditions guide token generation as coarse constraints in Planning, enforced as fine-grained constraints via diffusion optimization in Control",
          "Supports both discrete diffusion (DDM) and autoregressive (AR) generators through unified conditioning interface",
          "Single-layer codebook (K=1024) with temporal compression ratio ρ=4 or 2, significantly reducing downstream generator burden while maintaining quality"
        ],
        href: "https://arxiv.org/abs/2603.19227",
        paperLink: "Bridging Semantic and Kinematic Conditions with Diffusion-based Discrete Motion Tokenizer",
      },
      {
        num: 3,
        tag: "3D Customization",
        title: "3DreamBooth: High-Fidelity 3D Subject-Driven Video Generation",
        description: "3DreamBooth addresses the fundamental limitation of existing subject-driven video generation methods that treat subjects as 2D entities. Through a 1-frame optimization paradigm (T=1), it leverages the inherent property of video DiTs' joint spatio-temporal attention—when input is restricted to single frames, temporal attention pathways are naturally bypassed, confining gradient updates to spatial representations. This approach implants 3D subject identity without freezing temporal modules or inserting spatial adapters, while preserving pre-trained temporal priors. Combined with the 3Dapter multi-view conditioning module via asymmetric conditioning strategy, it achieves dynamic selective routing. On 3D-CustomBench, Chamfer Distance drops from Phantom's 0.0338 to 0.0177.",
        keyPoints: [
          "1-frame optimization: single-frame input naturally bypasses temporal attention, confining learning to spatial representations and avoiding temporal overfitting",
          "3DreamBooth internalizes multi-view geometric variations into identifier token V and network weights via LoRA",
          "3Dapter dual-branch architecture: single-view pre-training followed by joint multi-view optimization with main branch, enabling dynamic selective routing",
          "Multi-view joint attention acts as dynamic selective router, actively filtering conflicting signals from irrelevant views"
        ],
        href: "https://arxiv.org/abs/2603.18524",
        paperLink: "3DreamBooth: High-Fidelity 3D Subject-Driven Video Generation Model",
      },
      {
        num: 4,
        tag: "Video Reasoning",
        title: "Motion-o: Trajectory-Grounded Video Reasoning with STT Evidence Chains",
        description: "Motion-o proposes Spatial-Temporal-Trajectory (STT) reasoning, making implicit trajectory understanding explicit. By introducing <motion/> tags into spatio-temporal evidence chains, the model must summarize motion (direction, speed, scale change) connecting multiple temporal observations of the same object. This structured reasoning path makes trajectory understanding verifiable and rewardable. Training uses dual-chain verification: comparing motion tags from original videos against motion-masked videos (frozen frames) encourages reliance on true temporal evidence rather than textual priors. On V-STAR benchmark, Motion-o achieves 35.5 mAM, surpassing Open-o3 Video's 33.7.",
        keyPoints: [
          "STT reasoning: joint capacity of spatial (where) + temporal (when) + trajectory (how) reasoning",
          "Motion Chain of Thought (MCoT): structured tag <motion obj=\"...\" dir=\"...\" speed=\"...\" scale=\"...\"/>",
          "Trajectory reward: direction, speed, scale attributes matched against ground-truth bins with partial credit for adjacent bins",
          "Visual grounding reward: motion tags should change under motion-masked videos, preventing textual prior shortcuts"
        ],
        href: "https://arxiv.org/abs/2603.18856",
        paperLink: "Motion-o: Trajectory-Grounded Video Reasoning",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "VEGA-3D: Leveraging Implicit 3D Priors from Video Generation Models for Scene Understanding",
        tag: "3D Understanding",
        href: "https://arxiv.org/abs/2603.19235",
        description: "Repurposes pre-trained video diffusion models as latent world simulators, extracting spatio-temporal features from intermediate noise levels and integrating with semantic representations via token-level adaptive gated fusion, enriching MLLMs with geometric cues without explicit 3D supervision.",
      },
      {
        num: 6,
        title: "MonoArt: Progressive Structural Reasoning for Monocular Articulated 3D Reconstruction",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2603.19231",
        description: "Progressively transforms visual observations into canonical geometry, structured part representations, and motion-aware embeddings, enabling stable interpretable articulation inference without external motion templates or multi-stage pipelines.",
      },
      {
        num: 7,
        title: "EffectErase: Joint Video Object Removal and Insertion for High-Quality Effect Erasing",
        tag: "Video Inpainting",
        href: "https://arxiv.org/abs/2603.19224",
        description: "Introduces VOR dataset (60K video pairs, 5 effect types), treating video object insertion as inverse auxiliary task to removal via reciprocal learning scheme for effect-aware video object removal.",
      },
      {
        num: 8,
        title: "STTS: Unified Spatio-Temporal Token Scoring for Efficient Video VLMs",
        tag: "Efficiency",
        href: "https://arxiv.org/abs/2603.18004",
        description: "Uniformly prunes vision tokens across ViT and LLM without text conditioning or token merging, achieving 62% efficiency improvement in training and inference with only 0.7% average performance drop.",
      },
      {
        num: 9,
        title: "RoboForge: Physically Optimized Text-guided Whole-Body Locomotion for Humanoids",
        tag: "Motion Generation",
        href: "https://arxiv.org/abs/2603.17927",
        description: "Bidirectionally couples generation and control stages via Physical Plausibility Optimization (PP-Opt) module, suppressing artifacts like floating, skating, and penetration, converting reward-optimized simulation rollouts into high-quality explicit motion data.",
      },
    ],
    observation: "This week's papers demonstrate two major trends: 'decoupling' and 'explicitization'. Both SAMA and MoTok decompose complex generation tasks into semantic planning and motion control stages, using coarse-to-fine conditioning to prevent overburdening single modules. 3DreamBooth cleverly decouples spatial geometry from temporal motion through the 1-frame optimization paradigm, fully exploiting video DiT architectural properties. Meanwhile, Motion-o makes implicit trajectory understanding explicit through verifiable <motion/> tags—this structured reasoning path not only improves interpretability but also provides clear reward signals for reinforcement learning. For music-to-dance tasks, the insights are: audio-motion alignment can borrow MoTok's coarse-to-fine control strategy, appearance migration can reference 3DreamBooth's 3D-aware customization, and motion coherence verification can incorporate Motion-o's explicit trajectory modeling approach.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-21`,
        'en': `/en/daily/music-to-dance/2026-03-21`,
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
      date="2026-03-21"
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