import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-14 | 稀疏点轨迹未来预测与合成数据驱动的视觉感知",
    overview: [
      "Myriad 提出首个稀疏点轨迹自回归扩散模型，从单张图像快速生成数千个多样化未来，推理速度比密集视频模型快三个数量级",
      "VisionFoundry 展示合成数据对VLM视觉感知的显著提升，仅10k合成样本即可在MMVP上提升7%",
      "AniGen 统一生成可动画3D资产的形状、骨骼和蒙皮，为舞蹈人物角色绑定提供端到端解决方案"
    ],
    papers: [
      {
        num: 1,
        tag: "运动预测与规划",
        title: "Myriad：稀疏点轨迹上的自回归扩散未来预测",
        description: "Myriad 将开放集未来场景动态预测建模为稀疏点轨迹上的逐步推断，这是首个完全避免「视觉税」（visual tax）的运动预测方法。与密集视频或潜在空间预测模型不同，该方法将计算资源完全集中在理解运动本身，而非外观渲染。技术上，该方法采用自回归扩散模型，通过短程、局部可预测的转换推进轨迹，显式建模不确定性随时间的增长。关键创新包括：运动token设计（结合傅里叶嵌入运动、轨迹唯一随机标识符和局部图像特征）、共享时空位置编码（基于轴向RoPE）、快速推理块（融合自注意力和交叉注意力的并行transformer层）以及流匹配后验参数化（使用多尺度输入级联处理运动的重尾分布）。实验表明，665M参数的模型在OWM基准上达到0.029的Best-of-5误差，相比4.5B参数的MAGI-1（0.037）和14B参数的Wan2.2（0.039）更具优势，同时采样速度达到2200 samples/min，比视频模型快三个数量级。在台球规划任务中，该方法达到78%的准确率，显著优于图像到视频扩散方法（16%）。",
        keyPoints: [
          "稀疏点轨迹表示：完全避免密集外观建模，将计算集中在运动动态，实现数千个多样化未来的快速生成",
          "自回归流匹配：通过短程局部预测逐步展开未来，显式建模不确定性增长，支持长时程多模态运动",
          "快速推理架构：融合注意力块和缓存优化设计，在32时间步推出中实现2-3.7倍加速"
        ],
        href: "https://arxiv.org/abs/2604.09527",
        paperLink: "Envisioning the Future, One Step at a Time",
      },
      {
        num: 2,
        tag: "视觉感知与合成数据",
        title: "VisionFoundry：用合成图像教授VLM视觉感知",
        description: "VisionFoundry 提出首个仅需任务关键词即可生成高质量合成VQA数据的端到端流程，为解决VLM视觉感知瓶颈提供了新思路。该流程包含三个核心组件：LLM生成问题-答案对和详细T2I提示、现代T2I模型（Gemini-2.5-Flash-Image）生成图像、以及强大多模态评判器（Gemini-3-Pro）进行对齐验证。关键设计原则包括可控性（显式任务配置和实体池系统采样）、视觉确定性（答案决定事实必须100%可从图像验证）和验证过滤（二值过滤标准确保数据集质量）。实验表明，在Qwen2.5-VL-3B上，VisionFoundry-10K训练使MMVP提升6.7%（35.3→42.0）、CV-Bench-3D提升10.5%（66.0→76.5）；在MiMo-VL-7B上，MMVP提升14%（43.3→57.3）、CV-Bench-3D提升11.4%（72.3→83.7）。混合实验显示，2k合成+2k自然数据在视觉感知基准上持续优于4k纯自然数据，证明合成数据提供了难以从有限真实数据获得的互补监督信号。",
        keyPoints: [
          "任务感知合成流程：仅需任务名称即可生成10k图像-问题-答案三元组，无需参考图像或人工标注",
          "验证过滤机制：多模态评判器实现99%精度的自动过滤，确保训练数据质量",
          "数据规模效应：随合成数据量增加，视觉感知性能持续提升，在3D/空间诊断任务上增益最大"
        ],
        href: "https://arxiv.org/abs/2604.09531",
        paperLink: "VisionFoundry: Teaching VLMs Visual Perception with Synthetic Images",
      },
      {
        num: 3,
        tag: "3D角色生成与绑定",
        title: "AniGen：统一S³ Fields实现可动画3D资产生成",
        description: "AniGen 是首个直接从单张图像生成完整可动画3D资产的统一框架，同时生成几何、骨骼和蒙皮权重。核心创新是将形状、骨骼和蒙皮表示为共享空间域上的相互一致S³ Fields（Shape, Skeleton, Skin）。技术贡献包括：置信度衰减骨骼场（通过几何度量显式监督置信度，解决Voronoi边界处的骨骼预测歧义）、双蒙皮特征场（通过预训练SkinAE将可变基数蒙皮转换为固定维潜在特征空间，支持任意复杂度骨骼）以及两阶段流匹配管道（先生成稀疏结构支架，再在结构化潜在空间中生成密集几何和关节）。实验在ArticulationXL数据集上进行，AniGen在骨骼Gromov-Wasserstein距离上达到0.286，显著优于TRELLIS*+Anymate（0.349）和TRELLIS*+Puppeteer（0.326）；在蒙皮KL散度上达到2.919，优于所有基线。推理时间为19秒，与最快的序列基线相当。该方法可泛化到野外图像，支持人类、动物、卡通角色和机械装置等多种类别。",
        keyPoints: [
          "统一S³ Fields表示：将形状、骨骼、蒙皮表示为共享空间域上的连续场，实现联合生成而非顺序生成-绑定",
          "置信度感知骨骼预测：显式定义几何歧义度量并监督置信度场，结合置信度加权聚类实现准确骨骼提取",
          "关节数无关蒙皮：SkinAE预训练策略将可变关节数蒙皮压缩为固定维特征，支持任意复杂度骨骼的生成"
        ],
        href: "https://arxiv.org/abs/2604.08746",
        paperLink: "AniGen: Unified S^3 Fields for Animatable 3D Asset Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Fast-dVLM：通过直接转换实现高效块扩散VLM",
        tag: "高效推理",
        href: "https://arxiv.org/abs/2604.06832",
        description: "提出块扩散VLM实现6倍以上推理加速，KV-cache兼容的并行解码对实时舞蹈视频生成具有重要价值。",
      },
      {
        num: 5,
        title: "RecaLLM：通过显式上下文检索解决推理中的信息丢失",
        tag: "长上下文",
        href: "https://arxiv.org/abs/2604.09494",
        description: "推理与上下文检索交替进行，可应用于music-to-dance中的音频-运动长序列对齐。",
      },
      {
        num: 6,
        title: "Scal3R：大规模3D重建的可扩展测试时训练",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2604.08542",
        description: "神经全局上下文表示通过测试时自监督目标快速适应，对长视频序列的时序一致性建模有参考价值。",
      },
      {
        num: 7,
        title: "SATO：原生UV分割的艺术家网格生成",
        tag: "3D网格",
        href: "https://arxiv.org/abs/2604.09132",
        description: "三角形条带token排序策略保持艺术家级边流和语义布局，可提升舞蹈人物的几何质量。",
      },
    ],
    observation: "今日论文揭示了视觉生成领域的三个重要趋势：一是运动与外观的解耦表示正在成为高效长时程预测的关键，Myriad的稀疏点轨迹方法表明，完全避免视觉税可以实现数量级的效率提升；二是合成数据正在成为视觉感知能力提升的实用路径，VisionFoundry的自动化流程证明，仅需任务关键词即可生成高质量训练数据；三是3D资产生成正在从静态几何向可动画功能资产演进，AniGen的联合生成范式消除了传统生成-绑定管道的错误累积。对于music-to-dance任务，建议关注如何将Myriad的稀疏轨迹预测扩展到人体姿态序列，以及AniGen的骨骼蒙皮生成是否可以用于舞蹈角色的自动绑定。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-14 | Sparse Point Trajectory Future Prediction and Synthetic Data-Driven Visual Perception",
    overview: [
      "Myriad proposes the first autoregressive diffusion model over sparse point trajectories, generating thousands of diverse futures from a single image with three orders of magnitude faster inference than dense video models",
      "VisionFoundry demonstrates significant improvements in VLM visual perception using synthetic data, achieving +7% on MMVP with only 10k synthetic samples",
      "AniGen unifies the generation of shape, skeleton, and skinning for animatable 3D assets, providing an end-to-end solution for dance character rigging"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Prediction & Planning",
        title: "Myriad: Autoregressive Diffusion Future Prediction over Sparse Point Trajectories",
        description: "Myriad formulates open-set future scene dynamics prediction as step-wise inference over sparse point trajectories, representing the first approach that completely avoids the 'visual tax'. Unlike dense video or latent-space prediction models, this method concentrates computational resources entirely on understanding motion itself rather than appearance rendering. Technically, the approach employs an autoregressive diffusion model that advances trajectories through short, locally predictable transitions, explicitly modeling the growth of uncertainty over time. Key innovations include: motion token design (combining Fourier-embedded motion, trajectory-unique random identifiers, and local image features), shared spatiotemporal positional encoding (based on axial RoPE), fast reasoning blocks (parallel transformer layers fusing self-attention and cross-attention), and flow matching posterior parametrization (using multiscale input cascades to handle the heavy-tailed distribution of motion). Experiments show that the 665M parameter model achieves 0.029 Best-of-5 error on the OWM benchmark, outperforming 4.5B parameter MAGI-1 (0.037) and 14B parameter Wan2.2 (0.039), while achieving 2200 samples/min sampling speed—three orders of magnitude faster than video models. On billiard planning tasks, the method achieves 78% accuracy, significantly outperforming image-to-video diffusion methods (16%).",
        keyPoints: [
          "Sparse point trajectory representation: Completely avoids dense appearance modeling, focusing computation on motion dynamics to enable fast generation of thousands of diverse futures",
          "Autoregressive flow matching: Unfolds the future through short-range local predictions, explicitly modeling uncertainty growth and supporting long-horizon multimodal motion",
          "Fast inference architecture: Fused attention blocks and caching optimizations achieve 2-3.7x speedup in 32-timestep rollouts"
        ],
        href: "https://arxiv.org/abs/2604.09527",
        paperLink: "Envisioning the Future, One Step at a Time",
      },
      {
        num: 2,
        tag: "Visual Perception & Synthetic Data",
        title: "VisionFoundry: Teaching VLMs Visual Perception with Synthetic Images",
        description: "VisionFoundry proposes the first end-to-end pipeline that generates high-quality synthetic VQA data using only task keywords, offering a new approach to addressing VLM visual perception bottlenecks. The pipeline comprises three core components: LLM generation of question-answer pairs and detailed T2I prompts, modern T2I model (Gemini-2.5-Flash-Image) image synthesis, and powerful multimodal judge (Gemini-3-Pro) alignment verification. Key design principles include controllability (explicit task configurations and systematic sampling from entity pools), visual determinism (answer-determining facts must be 100% verifiable from images), and verification filtering (binary filtering criteria ensure dataset quality). Experiments show that on Qwen2.5-VL-3B, VisionFoundry-10K training improves MMVP by 6.7% (35.3→42.0) and CV-Bench-3D by 10.5% (66.0→76.5); on MiMo-VL-7B, MMVP improves by 14% (43.3→57.3) and CV-Bench-3D by 11.4% (72.3→83.7). Mixture experiments show that 2k synthetic + 2k natural data consistently outperforms 4k pure natural data on visual perception benchmarks, demonstrating that synthetic data provides complementary supervision signals difficult to obtain from limited real data alone.",
        keyPoints: [
          "Task-aware synthesis pipeline: Generates 10k image-question-answer triplets using only task names, without reference images or human annotation",
          "Verification filtering mechanism: Multimodal judge achieves 99% precision automatic filtering to ensure training data quality",
          "Data scaling effects: Visual perception performance continuously improves with increasing synthetic data, with largest gains on 3D/spatial diagnostic tasks"
        ],
        href: "https://arxiv.org/abs/2604.09531",
        paperLink: "VisionFoundry: Teaching VLMs Visual Perception with Synthetic Images",
      },
      {
        num: 3,
        tag: "3D Character Generation & Rigging",
        title: "AniGen: Unified S³ Fields for Animatable 3D Asset Generation",
        description: "AniGen is the first unified framework that directly generates complete animatable 3D assets from a single image, simultaneously producing geometry, skeleton, and skinning weights. The core innovation represents shape, skeleton, and skinning as mutually consistent S³ Fields (Shape, Skeleton, Skin) defined over a shared spatial domain. Technical contributions include: confidence-decaying skeleton field (explicitly supervising confidence through geometric metrics to resolve bone prediction ambiguity at Voronoi boundaries), dual skin feature field (converting variable-cardinality skinning to fixed-dimensional latent feature space through pretrained SkinAE, supporting arbitrary complexity rigs), and two-stage flow matching pipeline (first generating sparse structural scaffolds, then generating dense geometry and articulation in structured latent space). Experiments on the ArticulationXL dataset show AniGen achieves 0.286 Gromov-Wasserstein distance for skeletons, significantly outperforming TRELLIS*+Anymate (0.349) and TRELLIS*+Puppeteer (0.326); skinning KL divergence reaches 2.919, better than all baselines. Inference time is 19 seconds, comparable to the fastest sequential baseline. The method generalizes to in-the-wild images across diverse categories including humans, animals, cartoon characters, and machinery.",
        keyPoints: [
          "Unified S³ Fields representation: Represents shape, skeleton, and skinning as continuous fields over shared spatial domain for joint rather than sequential generation-rigging",
          "Confidence-aware bone prediction: Explicitly defines geometric ambiguity metrics and supervises confidence field, combined with confidence-weighted clustering for accurate skeleton extraction",
          "Joint-count agnostic skinning: SkinAE pretraining strategy compresses variable joint-count skinning to fixed-dimensional features, supporting generation of arbitrary complexity rigs"
        ],
        href: "https://arxiv.org/abs/2604.08746",
        paperLink: "AniGen: Unified S^3 Fields for Animatable 3D Asset Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "Fast-dVLM: Efficient Block-Diffusion VLM via Direct Conversion",
        tag: "Efficient Inference",
        href: "https://arxiv.org/abs/2604.06832",
        description: "Proposes block-diffusion VLM achieving 6x+ inference speedup; KV-cache-compatible parallel decoding has important value for real-time dance video generation.",
      },
      {
        num: 5,
        title: "RecaLLM: Addressing Lost-in-Thought via Explicit In-Context Retrieval",
        tag: "Long Context",
        href: "https://arxiv.org/abs/2604.09494",
        description: "Alternates reasoning with context retrieval, applicable to audio-motion long sequence alignment in music-to-dance tasks.",
      },
      {
        num: 6,
        title: "Scal3R: Scalable Test-Time Training for Large-Scale 3D Reconstruction",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2604.08542",
        description: "Neural global context representation rapidly adapts via test-time self-supervised objectives, providing reference value for temporal consistency modeling in long video sequences.",
      },
      {
        num: 7,
        title: "SATO: Artist Mesh Generation with Native UV Segmentation",
        tag: "3D Mesh",
        href: "https://arxiv.org/abs/2604.09132",
        description: "Triangle strip token ordering strategy maintains artist-grade edge flow and semantic layout, potentially improving geometric quality of dance characters.",
      },
    ],
    observation: "Today's papers reveal three important trends in visual generation: First, disentangled motion and appearance representations are becoming key to efficient long-horizon prediction, with Myriad's sparse point trajectory approach demonstrating that completely avoiding the visual tax can achieve order-of-magnitude efficiency gains. Second, synthetic data is becoming a practical path for improving visual perception capabilities, with VisionFoundry's automated pipeline proving that high-quality training data can be generated using only task keywords. Third, 3D asset generation is evolving from static geometry to functional animatable assets, with AniGen's joint generation paradigm eliminating error accumulation in traditional generate-then-rig pipelines. For music-to-dance tasks, future work should explore extending Myriad's sparse trajectory prediction to human pose sequences, and whether AniGen's skeleton and skinning generation can be applied to automatic rigging of dance characters.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-14`,
        'en': `/en/daily/music-to-dance/2026-04-14`,
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
      date="2026-04-14"
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
