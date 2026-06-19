import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "扩散Transformer与流匹配：音视频对齐和身份保持的新进展",
    overview: [
      "混合扩散Transformer架构通过粗到细策略实现高效的跨模态对齐",
      "ControlNet几何条件控制与区域特定迁移显著提升身份保持能力",
      "流匹配与判别器引导RL为生成质量提供新的优化路径"
    ],
    papers: [
      {
        num: 1,
        tag: "音频-文本对齐",
        title: "混合扩散Transformer：粗到细策略实现指令引导音频编辑",
        description: "论文提出了一种基于矫正流匹配的混合两阶段扩散Transformer架构，用于指令引导的音频编辑。核心创新在于粗到细的设计：在低分辨率阶段通过音频-文本token的联合注意力建立粗粒度语义对齐，在高分辨率阶段交替使用联合注意力和交叉注意力块细化编辑细节。这种方法在保持编辑精度的同时显著降低了计算复杂度。对于music-to-dance任务，其跨模态联合注意力机制可直接迁移到音频-运动对齐模块，解决当前3D Audio Attention在长程语义对齐上的局限。",
        keyPoints: [
          "DSJA-MMDiT块在低分辨率阶段实现音频-文本粗粒度语义融合",
          "AZCA-DiT块在高分辨率阶段细化局部声学细节恢复",
          "AdaLN-Zero调制结合全局文本特征与token级原始音频特征"
        ],
        href: "https://arxiv.org/abs/2606.20101",
        paperLink: "Hybrid Diffusion Transformer for Instruction-Guided Audio Editing via Rectified Flow",
      },
      {
        num: 2,
        tag: "身份保持",
        title: "MakeupMirror：ControlNet几何控制实现面部属性保持",
        description: "针对扩散模型中身份保持的核心挑战，论文提出了MakeupMirror框架，通过四项技术创新显著提升面部特征和皮肤色调保持能力：(1) 集成Depth-Anything和Canny边缘检测的ControlNet几何条件控制；(2) 区域特定的化妆迁移控制，对皮肤区域降低CFG和扩散步数，对嘴唇和眼睛保持更强的迁移；(3) 基于肤色差异检测的自适应调制机制；(4) Levenberg-Marquardt Langevin采样器实现2.8倍推理加速。在CPM-Real和MakeupSelfies数据集上，相对面部识别相似度提升60%，肤色差异降低50%。",
        keyPoints: [
          "ControlNets几何条件控制维持面部结构、细节和整体身份",
          "区域自适应控制机制实现精确的面部区域化妆应用",
          "LM Langevin采样器在保持质量的同时实现0.7秒延迟"
        ],
        href: "https://arxiv.org/abs/2606.20094",
        paperLink: "MakeupMirror: Improving Facial Attribute Preservation in Diffusion Models for Makeup Transfer",
      },
      {
        num: 3,
        tag: "运动预测",
        title: "MolmoMotion：语言引导的3D点轨迹预测与流匹配生成",
        description: "论文提出了目标条件3D点运动预测任务，给定视觉历史、物体上的3D查询点和语言描述的目标，预测每个点的未来3D轨迹。核心贡献包括：MolmoMotion-1M数据集（116万视频片段）、PointMotionBench基准（111个物体类别、61种运动类型），以及支持自回归坐标预测和流匹配轨迹生成的双模态模型。3D世界坐标表示具有类别无关、视角稳定和物理结构可直接使用的优势。实验表明，学习到的运动先验可迁移到机器人操作和视频生成任务，为舞蹈动作生成提供了可借鉴的运动表示学习方法。",
        keyPoints: [
          "3D世界坐标点表示实现类别无关、视角稳定的运动预测",
          "流匹配目标建模连续轨迹分布，捕捉运动不确定性",
          "运动先验迁移到视频生成，提供更真实的物体运动指导"
        ],
        href: "https://arxiv.org/abs/2606.18558",
        paperLink: "MolmoMotion: Forecasting Point Trajectories in 3D with Language Instruction",
      },
      {
        num: 4,
        tag: "生成质量优化",
        title: "判别器引导RL：流匹配模型的分布校正新方法",
        description: "论文揭示了流/分数匹配目标与生成质量之间的结构性错配：匹配损失在训练时间边际上测量速度场的L2回归误差，这与决定样本质量的视觉语义属性对齐不良。提出的Discriminator-Guided RL (DRL)在预训练表示空间中训练判别器分离数据与模型样本，使用其对数几率作为KL正则化RL的奖励。在SiT、JiT、REPA和RAE上的实验表明，DRL将无指导FID从9.38降至2.62，语义空间FD从88.2降至19.3。对于舞蹈视频生成，DRL提供了一种无需人工偏好数据即可提升视觉真实感的后训练方法。",
        keyPoints: [
          "匹配目标在训练边际上优化，与推理时样本质量存在错配",
          "SSL表示空间中的判别器估计数据与模型的对数似然比",
          "DRL在保持图像保真度的同时改善人类偏好奖励"
        ],
        href: "https://arxiv.org/abs/2606.19162",
        paperLink: "The Reward Was in Your Data All Along: Correcting Flow Matching with Discriminator-Guided RL",
      },
      {
        num: 5,
        tag: "多视角一致性",
        title: "PAIWorld：几何感知跨视角注意力实现3D一致世界模型",
        description: "针对机器人操作中的多视角3D一致性问题，论文提出了PAIWorld框架，通过两个技术支柱解决现有方法的根本缺陷：(1) 几何感知跨视角注意力块建立视角间显式通信路径，结合几何旋转位置编码(Geo-RoPE)将相机射线方向和外参编码到注意力机制；(2) 潜在3D-REPA从冻结的3D基础模型蒸馏3D感知特征。在WorldArena基准上排名第一(EWMScore 70.67%)，AgiBot-Challenge2026上排名第二(EWMScore 82.45%)。对于多视角舞蹈视频生成，其跨视角通信机制和几何先验可有效解决视角间物体漂移和深度不一致问题。",
        keyPoints: [
          "Geometry-Aware Cross-View Attention建立视角间显式信息通路",
          "Geo-RoPE编码相机几何信息，引导注意力沿几何对应token路由",
          "Latent 3D-REPA确保交换内容的3D一致性"
        ],
        href: "https://arxiv.org/abs/2606.18375",
        paperLink: "PAIWorld: A 3D-Consistent World Foundation Model for Robotic Manipulation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "可变长度Tokenization：可学习全局合并优化扩散Transformer计算效率",
        tag: "效率优化",
        href: "https://arxiv.org/abs/2606.20076",
        description: "通过可学习全局合并实现可变长度tokenization，在ImageNet 256×256上实现更优的gFID-计算权衡，为长视频生成的计算效率优化提供思路。",
      },
      {
        num: 7,
        title: "Zero-VC：说话人匿名化实现零前瞻流式语音转换",
        tag: "语音转换",
        href: "https://arxiv.org/abs/2606.20218",
        description: "严格因果、零前瞻网络设计，其因果编码器架构对实时舞蹈生成系统的低延迟要求具有参考价值。",
      },
      {
        num: 8,
        title: "频域流匹配：连续一致的机器人动作生成",
        tag: "时序一致性",
        href: "https://arxiv.org/abs/2606.20135",
        description: "通过DCT将动作序列转换到频域进行流匹配，Sobolev型约束抑制高频误差，可用于平滑舞蹈动作的时序一致性正则化。",
      },
      {
        num: 9,
        title: "循环世界模型：自适应计算深度提升长程模拟效率",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.18208",
        description: "通过参数共享的Transformer块迭代细化潜在环境状态，实现100倍参数效率，为长视频生成的计算效率优化提供新方向。",
      },
      {
        num: 10,
        title: "Physics-IQ Verified：视频生成模型物理理解评估基准",
        tag: "评估基准",
        href: "https://arxiv.org/abs/2606.18943",
        description: "系统性审计和改进Physics-IQ基准，为舞蹈动作物理合理性评估提供参考框架。",
      },
      {
        num: 11,
        title: "FlowMaps：流匹配建模长期多模态物体动态",
        tag: "动态建模",
        href: "https://arxiv.org/abs/2606.20209",
        description: "潜在流匹配模型估计动态物体未来位置的多模态分布，可用于学习舞蹈动作的空间-时序模式。",
      },
      {
        num: 12,
        title: "TriFlow：最近顶点向量场生成艺术家级3D网格拓扑",
        tag: "3D生成",
        href: "https://arxiv.org/abs/2606.20131",
        description: "基于流匹配的3D网格拓扑生成，其NVF表示可能适用于人体网格生成和舞蹈姿态建模。",
      },
      {
        num: 13,
        title: "残差空间进化优化：流模型的实例保持机制",
        tag: "数据编辑",
        href: "https://arxiv.org/abs/2606.20084",
        description: "在残差空间结合进化算法与流匹配，自花授粉实现局部利用，异花授粉促进探索，实例保持机制对身份保持有借鉴意义。",
      },
    ],
    observation: "今日论文呈现出两个显著趋势：一是扩散Transformer架构的持续演进，从粗到细的层次化设计成为平衡性能与效率的主流策略；二是流匹配方法在多个领域的扩展应用，从音频编辑到运动预测再到3D生成，其连续时间建模优势逐渐显现。对于music-to-dance任务，这些进展提供了三个可直接迁移的技术方向：(1) 层次化跨模态注意力机制可改进音频-运动对齐，(2) ControlNet几何控制可强化参考人物身份保持，(3) 判别器引导RL可作为后训练优化手段提升生成质量。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Diffusion Transformers & Flow Matching: Advances in Audio-Visual Alignment and Identity Preservation",
    overview: [
      "Hybrid diffusion transformer architectures enable efficient cross-modal alignment via coarse-to-fine strategies",
      "ControlNet geometric conditioning and region-specific transfer significantly improve identity preservation",
      "Flow matching with discriminator-guided RL offers new optimization paths for generation quality"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Text Alignment",
        title: "Hybrid Diffusion Transformer: Coarse-to-Fine Strategy for Instruction-Guided Audio Editing",
        description: "This paper proposes a hybrid two-stage diffusion transformer architecture based on rectified flow matching for instruction-guided audio editing. The core innovation lies in the coarse-to-fine design: joint attention over audio-text tokens establishes coarse semantic alignment at low resolution, while alternating joint-attention and cross-attention blocks refine editing details at high resolution. This approach significantly reduces computational complexity while maintaining editing precision. For music-to-dance tasks, the cross-modal joint attention mechanism can be directly transferred to audio-motion alignment modules, addressing current limitations of 3D Audio Attention in long-range semantic alignment.",
        keyPoints: [
          "DSJA-MMDiT blocks achieve coarse audio-text semantic fusion at low-resolution stage",
          "AZCA-DiT blocks refine local acoustic detail recovery at high-resolution stage",
          "AdaLN-Zero modulation combines global text features with token-level source audio features"
        ],
        href: "https://arxiv.org/abs/2606.20101",
        paperLink: "Hybrid Diffusion Transformer for Instruction-Guided Audio Editing via Rectified Flow",
      },
      {
        num: 2,
        tag: "Identity Preservation",
        title: "MakeupMirror: ControlNet Geometric Control for Facial Attribute Preservation",
        description: "Addressing the core challenge of identity preservation in diffusion models, this paper proposes MakeupMirror framework with four technical innovations: (1) ControlNet geometric conditioning integrating Depth-Anything and Canny edge detection; (2) region-specific makeup transfer control reducing CFG and diffusion steps for skin regions while maintaining stronger transfer for lips and eyes; (3) adaptive modulation based on skin tone difference detection; (4) Levenberg-Marquardt Langevin sampler achieving 2.8× inference acceleration. On CPM-Real and MakeupSelfies datasets, relative facial recognition similarity improves by 60% with 50% reduction in skin tone difference.",
        keyPoints: [
          "ControlNets geometric conditioning maintains facial structure, details, and overall identity",
          "Region-adaptive control mechanism enables precise facial region makeup application",
          "LM Langevin sampler achieves 0.7s latency while maintaining quality"
        ],
        href: "https://arxiv.org/abs/2606.20094",
        paperLink: "MakeupMirror: Improving Facial Attribute Preservation in Diffusion Models for Makeup Transfer",
      },
      {
        num: 3,
        tag: "Motion Prediction",
        title: "MolmoMotion: Language-Guided 3D Point Trajectory Prediction with Flow Matching",
        description: "This paper proposes the task of goal-conditioned 3D point motion prediction: given visual history, 3D query points on objects, and language descriptions of intended goals, the model predicts future 3D trajectories. Key contributions include: MolmoMotion-1M dataset (1.16M video clips), PointMotionBench benchmark (111 object categories, 61 motion types), and a dual-modal model supporting both autoregressive coordinate prediction and flow matching trajectory generation. The 3D world coordinate representation offers class-agnostic, view-stable advantages with directly usable physical structure. Experiments show the learned motion prior transfers to robotics and video generation tasks, providing valuable insights for dance motion representation learning.",
        keyPoints: [
          "3D world coordinate points enable class-agnostic, view-stable motion prediction",
          "Flow matching objective models continuous trajectory distributions capturing motion uncertainty",
          "Motion prior transfers to video generation providing more realistic object motion guidance"
        ],
        href: "https://arxiv.org/abs/2606.18558",
        paperLink: "MolmoMotion: Forecasting Point Trajectories in 3D with Language Instruction",
      },
      {
        num: 4,
        tag: "Generation Quality",
        title: "Discriminator-Guided RL: A New Approach for Flow Matching Distribution Correction",
        description: "This paper reveals the structural mismatch between flow/score matching objectives and generation quality: matching losses measure L2 regression error on velocity fields under training-time marginals, poorly aligned with visual-semantic properties determining sample quality. The proposed Discriminator-Guided RL (DRL) trains a discriminator to separate data from model samples in pretrained representation space, using its logit as reward for KL-regularized RL. Experiments on SiT, JiT, REPA, and RAE show DRL reduces guidance-free FID from 9.38 to 2.62 and semantic-space FD from 88.2 to 19.3. For dance video generation, DRL provides a post-training method to improve visual realism without human preference data.",
        keyPoints: [
          "Matching objectives optimize under training marginals, creating mismatch with inference sample quality",
          "Discriminator in SSL space estimates log-likelihood ratio between data and model",
          "DRL improves human-preference rewards while maintaining image fidelity"
        ],
        href: "https://arxiv.org/abs/2606.19162",
        paperLink: "The Reward Was in Your Data All Along: Correcting Flow Matching with Discriminator-Guided RL",
      },
      {
        num: 5,
        tag: "Multi-View Consistency",
        title: "PAIWorld: Geometry-Aware Cross-View Attention for 3D-Consistent World Models",
        description: "Addressing multi-view 3D consistency for robotic manipulation, this paper proposes PAIWorld framework with two technical pillars: (1) Geometry-Aware Cross-View Attention blocks establish explicit inter-view communication pathways, combined with Geometric Rotary Position Embedding (Geo-RoPE) encoding camera ray directions and extrinsics into the attention mechanism; (2) Latent 3D-REPA distills 3D-aware features from frozen 3D foundation models. Ranked 1st on WorldArena (EWMScore 70.67%) and 2nd on AgiBot-Challenge2026 (EWMScore 82.45%). For multi-view dance video generation, the cross-view communication mechanism and geometric priors can effectively address object drift and depth inconsistency across viewpoints.",
        keyPoints: [
          "Geometry-Aware Cross-View Attention establishes explicit information pathways across views",
          "Geo-RoPE encodes camera geometry, guiding attention along geometrically corresponding tokens",
          "Latent 3D-REPA ensures 3D consistency of exchanged content"
        ],
        href: "https://arxiv.org/abs/2606.18375",
        paperLink: "PAIWorld: A 3D-Consistent World Foundation Model for Robotic Manipulation",
      },
    ],
    worthReading: [
      {
        num: 6,
        title: "Variable-Length Tokenization: Learnable Global Merging for Diffusion Transformer Efficiency",
        tag: "Efficiency",
        href: "https://arxiv.org/abs/2606.20076",
        description: "Achieves superior gFID-compute trade-off on ImageNet 256×256 through learnable global merging, offering insights for computational efficiency in long video generation.",
      },
      {
        num: 7,
        title: "Zero-VC: Zero-Lookahead Streaming Voice Conversion via Speaker Anonymization",
        tag: "Voice Conversion",
        href: "https://arxiv.org/abs/2606.20218",
        description: "Strictly causal, zero-lookahead network design with causal encoder architecture provides reference for low-latency requirements in real-time dance generation systems.",
      },
      {
        num: 8,
        title: "Frequency-Aware Flow Matching for Continuous Robotic Action Generation",
        tag: "Temporal Consistency",
        href: "https://arxiv.org/abs/2606.20135",
        description: "Transforms action sequences to frequency domain via DCT for flow matching, with Sobolev-type constraints suppressing high-frequency errors, applicable for smoothing dance motion temporal consistency.",
      },
      {
        num: 9,
        title: "Looped World Models: Adaptive Computation Depth for Long-Horizon Simulation",
        tag: "World Models",
        href: "https://arxiv.org/abs/2606.18208",
        description: "Iteratively refines latent environment states through parameter-shared transformer blocks, achieving 100× parameter efficiency and offering new directions for long video generation efficiency.",
      },
      {
        num: 10,
        title: "Physics-IQ Verified: Physical Understanding Evaluation Benchmark for Video Generation",
        tag: "Evaluation",
        href: "https://arxiv.org/abs/2606.18943",
        description: "Systematic audit and improvement of Physics-IQ benchmark, providing reference framework for evaluating physical plausibility of dance motions.",
      },
      {
        num: 11,
        title: "FlowMaps: Flow Matching for Long-Term Multimodal Object Dynamics",
        tag: "Dynamics",
        href: "https://arxiv.org/abs/2606.20209",
        description: "Latent flow matching model estimates multimodal distributions over future object locations, applicable for learning spatial-temporal patterns in dance motions.",
      },
      {
        num: 12,
        title: "TriFlow: Artist-Like 3D Mesh Topology via Nearest-Vertex Vector Fields",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2606.20131",
        description: "Flow matching-based 3D mesh topology generation with NVF representation potentially applicable for human mesh generation and dance pose modeling.",
      },
      {
        num: 13,
        title: "Residual-Space Evolutionary Optimization: Instance Preservation for Flow Models",
        tag: "Data Editing",
        href: "https://arxiv.org/abs/2606.20084",
        description: "Combines evolutionary algorithms with flow matching in residual space, with self-pollination for local exploitation and cross-pollination for exploration, offering insights for identity preservation.",
      },
    ],
    observation: "Today's papers reveal two notable trends: the continued evolution of diffusion transformer architectures, with hierarchical coarse-to-fine designs becoming the mainstream strategy for balancing performance and efficiency; and the expanding application of flow matching methods across multiple domains, from audio editing to motion prediction to 3D generation, with their continuous-time modeling advantages gradually emerging. For music-to-dance tasks, these advances provide three directly transferable technical directions: (1) hierarchical cross-modal attention mechanisms can improve audio-motion alignment, (2) ControlNet geometric control can strengthen reference person identity preservation, and (3) discriminator-guided RL can serve as a post-training optimization method to improve generation quality.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-18`,
        'en': `/en/daily/music-to-dance/2026-06-18`,
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
      date="2026-06-18"
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
