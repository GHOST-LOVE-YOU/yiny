import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance",
    title: "风格解耦与视频控制：从社区LoRA到导演级空间编排",
    overview: [
      "FreeStyle提出社区LoRA挖掘框架，实现风格-内容双参考生成的规模化数据构建",
      "LooseControlVideo以稀疏3D框实现导演级视频控制，解耦高层编排与局部形变",
      "Holo-World统一相机-物体-天气控制，其解耦适配器设计对多维度舞蹈生成有启发",
      "FlowBender引入反馈感知训练，解决条件扩散模型中保真度与真实感的权衡困境"
    ],
    papers: [
      {
        num: 1,
        tag: "风格迁移",
        title: "FreeStyle：基于社区LoRA挖掘的风格-内容双参考生成",
        description: "FreeStyle针对风格-内容双参考生成中数据稀缺和语义泄漏两大瓶颈，提出从社区LoRA中挖掘组合锚点的数据构建范式。其核心创新在于两阶段解耦训练课程：第一阶段采用注意力级富集约束，抑制风格参考在晚期去噪步骤中的过度支配；第二阶段引入频率感知的RoPE调制策略，针对双参考设置中通过高频位置对应发生的泄漏进行抑制。论文构建了包含Style-Reference和Content-Reference的大规模三元组数据集，覆盖多种基础模型和长尾艺术风格。实验表明，该方法在风格对齐、内容保持和泄漏抑制之间取得良好平衡，其两阶段解耦机制可直接迁移到舞蹈生成中的人物外观保持与动作生成的解耦控制。",
        keyPoints: [
          "社区LoRA挖掘：将社区LoRA作为风格和内容的组合锚点，构建大规模双参考三元组",
          "两阶段解耦训练：Stage 1用注意力级富集约束抑制风格泄漏；Stage 2用频率感知RoPE调制处理位置对应泄漏",
          "风格不变内容对齐分数(CAS)：提出基于VLM的验证分数，分别评估风格迁移可靠性和内容保持"
        ],
        href: "https://arxiv.org/abs/2606.20506",
        paperLink: "FreeStyle: Free Control of Style-Content Dual-Reference Generation from Community LoRA Mining",
      },
      {
        num: 2,
        tag: "视频控制",
        title: "LooseControlVideo：使用空间Blocking的导演级视频控制",
        description: "LooseControlVideo提出以稀疏定向3D框作为'blocking'代理的导演级视频控制框架，解决多物体场景中语义布局与时序动态纠缠的难题。与需要逐帧精确引导的深度条件模型不同，该方法允许用户仅通过简单3D建模工具或刚体物理模拟来编排高层轨迹，将复杂的几何建模和物体形变交由扩散过程推断。核心技术创新是DNOCS（深度调制归一化物体坐标空间）表示，联合编码局部朝向和全局深度，使关键空间线索（深度排序、遮挡关系）在条件帧中直接可观测。在nuScenes、HO-3D和BEHAVE基准上的评估显示，该方法在轨迹误差上实现1.2-3倍改进，在刚体运动一致性上实现2倍提升，在遮挡准确率上实现1.5-2倍提升。",
        keyPoints: [
          "DNOCS表示：深度调制归一化物体坐标空间，联合编码局部朝向和全局深度排序",
          "解耦编排与执行：用户控制高层布局和运动路径，模型推断次级动态和真实形变",
          "自动化训练数据构建：从野外视频数据中提取时序跟踪的3D定向框，构建约10K对齐的RGB-DNOCS视频对"
        ],
        href: "https://arxiv.org/abs/2606.19495",
        paperLink: "LooseControlVideo: Directorial Video Control using Spatial Blocking",
      },
      {
        num: 3,
        tag: "世界模型",
        title: "Holo-World：统一的相机、物体与天气控制视频世界模型",
        description: "Holo-World研究从单张图像出发，在显式相机和物体控制下生成视频的统一状态控制问题，同时支持场景保持和天气状态转移。现有方法通常将相机控制、物体控制和天气生成分离处理，且天气生成依赖于已提供未来结构的源视频或重建场景。Holo-World的核心贡献是Unified Scene Adapter (UniSA)，它将世界保持和天气转移分解到同一冻结视频骨干网络的不同参数子空间中。World Adapter使用渲染背景、几何缓冲区和物体控制来维持受控场景结构；State Adapter则在同一受控场景中建模天气相关的外观和粒子效果。此外，Scene-Weather Decomposed CFG (SW-CFG)在采样时对场景和天气残差分别进行引导，在不过度放大完整条件的情况下增强目标天气效果。",
        keyPoints: [
          "UniSA解耦设计：World Adapter和State Adapter共享冻结骨干但学习分离残差子空间",
          "HoloStateData数据集：将真实视频、配对模拟天气视频和V2V天气转移视频组织为统一控制样本",
          "SW-CFG引导策略：场景残差保持受控世界，独立天气残差增强天气效果"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
      {
        num: 4,
        tag: "扩散模型",
        title: "FlowBender：反馈感知训练实现自校正条件流",
        description: "FlowBender针对条件扩散和流模型中普遍存在的约束违反问题，提出将模型自身的对齐误差作为一等输入的闭环训练框架。现有方法要么将条件信号视为静态线索在推理时忽略对齐信息，要么通过手工调优的线性更新在推理时咨询条件，但后者通常在保真度和真实感之间产生权衡。FlowBender的核心机制是两遍执行策略：第一遍进行无引导的前瞻传递，估计干净信号并计算任务特定的偏差；第二遍将该误差反馈与标准输入一起消费，产生校正后的速度。论文提出一阶反馈（基于可微算子的梯度）和零阶反馈（基于非可微设置的原始残差）两种变体，以及prior-step shortcut将推理开销降至N+1次评估。在图像翻译、恢复和3D网格纹理化任务上的实验表明，该方法同时提升保真度和真实感，打破了传统引导方法的权衡困境。",
        keyPoints: [
          "闭环反馈机制：将模型对齐误差作为一等输入，训练网络学习基于推理时反馈的校正策略",
          "两遍执行策略：前瞻传递估计干净信号，精炼传递消费误差产生校正速度",
          "零阶反馈变体：支持非可微或黑盒算子（如JPEG压缩、第三方API）的校正"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "JanusMesh：跨空间双分支去噪实现零样本3D视觉错觉生成",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2606.20563",
        description: "提出跨空间双分支去噪过程和视角条件纹理合成模块，3-5分钟生成高质量双语义3D错觉，其视角条件合成技术对多视角舞蹈视频生成有参考价值。",
      },
      {
        num: 6,
        title: "当前世界模型缺乏持久状态核心",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.20545",
        description: "WRBench基准测试发现当前系统在相机离开视场时停止推进世界状态，揭示世界状态演化的稳定性应成为视频模型设计的一等目标，对舞蹈动作长时序一致性建模有启发。",
      },
      {
        num: 7,
        title: "ImageWAM：世界动作模型真的需要视频生成吗？",
        tag: "动作预测",
        href: "https://arxiv.org/abs/2606.19531",
        description: "提出以图像编辑替代视频生成的世界动作模型框架，将FLOPs降至1/6、延迟降至1/4，其低延迟设计思路可借鉴到实时舞蹈生成场景。",
      },
      {
        num: 8,
        title: "学习何时去噪：潜在扩散的异步调度优化",
        tag: "扩散优化",
        href: "https://arxiv.org/abs/2606.19662",
        description: "提出学习多表示空间异步去噪调度的方法，在ImageNet 256x256上以4倍更少训练达到SFD-XL 800轮效果，可提升舞蹈视频生成的推理效率。",
      },
      {
        num: 9,
        title: "UNIEGO：代理模型介导的统一第一人称视频表示学习",
        tag: "表示学习",
        href: "https://arxiv.org/abs/2606.20559",
        description: "提出分层多教师蒸馏框架，通过表示特定的代理模型将异构教师知识转化为同质的第一人称空间，其代理模型机制对舞蹈动作表示学习有参考价值。",
      },
    ],
    observation: "今日论文呈现出一个清晰的技术趋势：生成模型的控制正在从单一维度向多维度解耦演进。FreeStyle的风格-内容解耦、LooseControlVideo的编排-执行解耦、Holo-World的世界保持-天气转移解耦，以及FlowBender的反馈感知校正，共同指向一个核心洞察——高质量可控生成的关键在于识别并分离不同控制维度的耦合。对于music-to-dance任务，这意味着我们需要更精细地解耦人物外观、舞蹈动作、相机运动和背景环境四个维度。当前方案主要关注外观-动作的解耦，但相机运动和背景变化仍与动作生成紧密耦合。借鉴Holo-World的UniSA设计，未来可探索将四个维度分解到共享骨干的不同参数子空间中，实现真正的导演级舞蹈视频生成。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "Style Disentanglement & Video Control: From Community LoRA to Directorial Spatial Orchestration",
    overview: [
      "FreeStyle proposes community LoRA mining framework for scalable style-content dual-reference generation",
      "LooseControlVideo achieves directorial video control via sparse 3D boxes, decoupling high-level choreography from local deformation",
      "Holo-World unifies camera-object-weather control with disentangled adapter design inspiring multi-dimensional dance generation",
      "FlowBender introduces feedback-aware training to resolve the fidelity-plausibility trade-off in conditional diffusion models"
    ],
    papers: [
      {
        num: 1,
        tag: "Style Transfer",
        title: "FreeStyle: Style-Content Dual-Reference Generation via Community LoRA Mining",
        description: "FreeStyle addresses data scarcity and semantic leakage in style-content dual-reference generation by proposing a data construction paradigm that mines compositional anchors from community LoRAs. Its core innovation lies in a two-stage disentanglement training curriculum: Stage 1 employs attention-level enrichment constraints to suppress excessive style-reference dominance in late denoising steps; Stage 2 introduces frequency-aware RoPE modulation to target leakage through positional correspondence in the harder dual-reference setting. The paper constructs large-scale triplet datasets containing Style-Reference and Content-Reference pairs across multiple base models and long-tail artistic styles. Experiments demonstrate strong balance among style alignment, content preservation, and leakage suppression, with the two-stage disentanglement mechanism directly transferable to decoupling character appearance preservation from motion generation in dance synthesis.",
        keyPoints: [
          "Community LoRA mining: Using community LoRAs as compositional anchors for style and content to build large-scale dual-reference triplets",
          "Two-stage disentanglement training: Stage 1 uses attention-level enrichment constraints; Stage 2 uses frequency-aware RoPE modulation for positional leakage",
          "Style-invariant Content Alignment Score (CAS): VLM-based verification score separately evaluating style transfer reliability and content preservation"
        ],
        href: "https://arxiv.org/abs/2606.20506",
        paperLink: "FreeStyle: Free Control of Style-Content Dual-Reference Generation from Community LoRA Mining",
      },
      {
        num: 2,
        tag: "Video Control",
        title: "LooseControlVideo: Directorial Video Control using Spatial Blocking",
        description: "LooseControlVideo proposes a directorial video control framework using sparse oriented 3D boxes as 'blocking' proxies, addressing the challenge of entangled semantic layout and temporal dynamics in multi-object scenes. Unlike depth-conditioned models requiring frame-accurate guidance, this method allows users to choreograph high-level trajectories using simple 3D modeling tools or rigid-body physics simulations, delegating complex geometric modeling and object deformation to the diffusion process. The core technical innovation is DNOCS (Depth-modulated Normalized Object Coordinate Space) representation, jointly encoding local orientation and global depth to make key spatial cues (depth ordering, occlusion relationships) directly observable in conditioning frames. Evaluations on nuScenes, HO-3D, and BEHAVE benchmarks show 1.2-3× improvement in Trajectory Error, 2× improvement in Rigid Motion Consistency, and 1.5-2× increase in Occlusion Accuracy.",
        keyPoints: [
          "DNOCS representation: Depth-modulated Normalized Object Coordinate Space jointly encoding local orientation and global depth ordering",
          "Decoupled choreography and execution: Users control high-level layout and motion paths while model infers secondary dynamics and realistic deformations",
          "Automated training data construction: Extracting temporally-tracked 3D oriented boxes from in-the-wild videos to build ~10K aligned RGB-DNOCS video pairs"
        ],
        href: "https://arxiv.org/abs/2606.19495",
        paperLink: "LooseControlVideo: Directorial Video Control using Spatial Blocking",
      },
      {
        num: 3,
        tag: "World Model",
        title: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
        description: "Holo-World studies unified state control for video generation from a single image under explicit camera and object controls, supporting both scene preservation and weather state transfer. Existing methods typically separate camera control, object control, and weather generation, with weather synthesis relying on source videos or reconstructed scenes that already provide future structure. Holo-World's core contribution is Unified Scene Adapter (UniSA), which factorizes world preservation and weather transfer into distinct parameter subspaces within the same frozen video backbone. The World Adapter uses rendered backgrounds, geometry buffers, and object controls to maintain controlled scene structure; the State Adapter models weather-dependent appearance and particle effects within the same controlled scene. Additionally, Scene-Weather Decomposed CFG (SW-CFG) guides scene and weather residuals separately during sampling, strengthening target weather effects without over-amplifying the full condition.",
        keyPoints: [
          "UniSA decoupled design: World Adapter and State Adapter share frozen backbone but learn separate residual subspaces",
          "HoloStateData dataset: Organizing real videos, paired simulated weather videos, and V2V weather-transferred videos as unified control samples",
          "SW-CFG guidance strategy: Scene residual preserves controlled world; independent weather residual enhances weather effects"
        ],
        href: "https://arxiv.org/abs/2606.20083",
        paperLink: "Holo-World: Unified Camera, Object and Weather Control for Video World Model",
      },
      {
        num: 4,
        tag: "Diffusion Model",
        title: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
        description: "FlowBender addresses the pervasive constraint violation problem in conditional diffusion and flow models by proposing a closed-loop training framework that treats the model's own alignment error as a first-class input. Existing approaches either treat conditioning signals as static cues ignoring alignment information at inference, or consult conditions through hand-tuned linear updates during inference, typically creating a trade-off between fidelity and plausibility. FlowBender's core mechanism is a two-pass execution strategy: first pass performs unguided look-ahead to estimate clean signal and compute task-specific deviation; second pass consumes this error feedback alongside standard inputs to produce corrected velocity. The paper proposes first-order feedback (gradients for differentiable operators) and zero-order feedback (raw residuals for non-differentiable settings) variants, plus prior-step shortcut reducing inference overhead to N+1 evaluations. Experiments on image translation, restoration, and 3D mesh texturing show simultaneous improvements in fidelity and plausibility, breaking the trade-off dilemma of traditional guidance methods.",
        keyPoints: [
          "Closed-loop feedback mechanism: Treating model alignment error as first-class input, training network to learn correction policy based on inference-time feedback",
          "Two-pass execution strategy: Look-ahead pass estimates clean signal; refinement pass consumes error to produce corrected velocity",
          "Zero-order feedback variant: Supports correction for non-differentiable or black-box operators (e.g., JPEG compression, third-party APIs)"
        ],
        href: "https://arxiv.org/abs/2606.20404",
        paperLink: "FlowBender: Feedback-Aware Training for Self-Correcting Conditional Flows",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "JanusMesh: Fast Zero-Shot 3D Visual Illusion via Cross-Space Denoising",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2606.20563",
        description: "Proposes cross-space dual-branch denoising and view-conditioned texture synthesis, generating high-quality dual-semantic 3D illusions in 3-5 minutes. The view-conditioned synthesis technique offers reference value for multi-view dance video generation.",
      },
      {
        num: 6,
        title: "Current World Models Lack a Persistent State Core",
        tag: "World Model",
        href: "https://arxiv.org/abs/2606.20545",
        description: "WRBench benchmark finds current systems stop advancing world state when camera leaves field of view, revealing that stability of world-state evolution should become first-class objectives in video model design, with implications for long-term motion consistency in dance generation.",
      },
      {
        num: 7,
        title: "ImageWAM: Do World Action Models Really Need Video Generation?",
        tag: "Action Prediction",
        href: "https://arxiv.org/abs/2606.19531",
        description: "Proposes repurposing image editing for world action modeling, reducing FLOPs to 1/6 and latency to 1/4 of video-based WAMs. The low-latency design philosophy offers insights for real-time dance generation scenarios.",
      },
      {
        num: 8,
        title: "Learning When to Denoise: Optimizing Asynchronous Schedules for Latent Diffusion",
        tag: "Diffusion Optimization",
        href: "https://arxiv.org/abs/2606.19662",
        description: "Proposes learning asynchronous denoising schedules across multiple representation spaces, achieving SFD-XL 800-epoch results with 4× less training on ImageNet 256×256. Applicable for improving inference efficiency in dance video generation.",
      },
      {
        num: 9,
        title: "UNIEGO: Proxies as Mediators for Unified Egocentric Video Representation Learning",
        tag: "Representation Learning",
        href: "https://arxiv.org/abs/2606.20559",
        description: "Proposes hierarchical multi-teacher distillation framework translating heterogeneous teacher knowledge into homogeneous egocentric space via representation-specific proxies. The proxy model mechanism offers reference value for dance motion representation learning.",
      },
    ],
    observation: "Today's papers reveal a clear technical trend: generative model control is evolving from single-dimensional to multi-dimensional decoupling. FreeStyle's style-content disentanglement, LooseControlVideo's choreography-execution decoupling, Holo-World's world preservation-weather transfer separation, and FlowBender's feedback-aware correction collectively point to a core insight—the key to high-quality controllable generation lies in identifying and separating couplings across different control dimensions. For music-to-dance tasks, this implies we need finer decoupling of character appearance, dance motion, camera movement, and background environment. Current approaches primarily focus on appearance-motion decoupling, while camera motion and background variation remain tightly coupled with motion generation. Drawing inspiration from Holo-World's UniSA design, future work could explore decomposing these four dimensions into different parameter subspaces of a shared backbone, enabling truly directorial dance video generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-20`,
        'en': `/en/daily/music-to-dance/2026-06-20`,
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
      date="2026-06-20"
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
