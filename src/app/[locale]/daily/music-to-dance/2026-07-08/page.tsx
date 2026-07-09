import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成",
    title: "音乐流派感知与多视角一致性：舞蹈生成的跨域启发",
    overview: [
      "MMGenre 揭示音乐流派感知需要显式训练，零样本迁移效果有限",
      "MV-Forcing 实现长时程多视角视频生成，4D 几何桥接是关键",
      "Geometric Reciprocity 为单目深度估计提供自监督新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "音乐理解",
        title: "MMGenre：跨流派歌声合成评测基准",
        description: "MMGenre 是首个系统评估歌声合成（SVS）模型跨音乐流派泛化能力的基准测试。研究团队利用 Suno V4.5 生成覆盖 10 大流派、26 个子流派的音乐，构建出 3,152 段对齐的乐谱-歌声数据。核心发现令人警醒：当前主流 SVS 模型（包括 DiffSinger、StyleSinger 等）生成的歌声在不同流派间声学特征高度相似，缺乏可辨识的流派区分度。零样本风格迁移或技术条件仅带来边际改善，而轻量级的流派特定持续训练却能带来显著提升。这提示舞蹈生成任务中，音乐风格的条件控制同样需要显式的流派感知训练，而非依赖模型的隐式泛化。",
        keyPoints: [
          "覆盖 10 大流派（流行、摇滚、爵士、古典等）和 26 个子流派的系统评测",
          "当前 SVS 模型跨流派声学特征相似，Gemini 2.5 Pro 评测的流派一致性得分（GCS-5）显示显著缺陷",
          "零样本流派适应效果微弱，轻量持续训练带来实质提升——提示舞蹈生成的音乐条件需要显式训练"
        ],
        href: "https://arxiv.org/abs/2607.06986",
        paperLink: "MMGenre: Benchmarking Singing Voice Synthesis across Multiple Musical Genres",
      },
      {
        num: 2,
        tag: "视频生成",
        title: "MV-Forcing：4D 几何桥接的长时程多视角视频生成",
        description: "MV-Forcing 首次实现任意时长、任意视角数量的长时程多视角视频生成。核心创新在于引入自回归 4D 重建模型 CUT3R 作为「几何桥接」——每生成一个视角后，立即重建其 3D 结构并渲染下一个视角的几何先验，扩散模型在此基础上精炼生成。这种设计规避了传统双向注意力在时序-视角网格上的二次复杂度，实现真正的流式推理。Distribution Matching Distillation 配合 Spatio-Temporal Self-Forcing 有效弥合训练-推理的暴露偏差。对舞蹈生成而言，这意味着未来可实现环绕拍摄的多视角舞蹈视频生成，且 4D 几何一致性机制可能改善复杂动作（如旋转、跳跃）的时序连贯性。",
        keyPoints: [
          "CUT3R 自回归 4D 重建模型作为几何桥接，实现视角间的显式几何约束",
          "时空 Self-Forcing 机制同时闭合时序和视角两个维度的暴露偏差",
          "单模型支持任意时长和任意视角数量，为舞蹈视频的环绕拍摄生成提供技术路径"
        ],
        href: "https://arxiv.org/abs/2607.05376",
        paperLink: "MV-Forcing: Long Multi-View Video Generation via 4D-Grounded Spatio-Temporal Self-Forcing",
      },
      {
        num: 3,
        tag: "深度估计",
        title: "Geometric Reciprocity：自监督立体视频生成的几何互惠定理",
        description: "单目到立体视频转换的核心瓶颈是遮挡区域（disocclusion）的修复。现有训练方法依赖稀缺的真实立体视频对或存在域间隙的合成数据。本文提出几何互惠定理（GRT）：在最近邻 DIBR 框架下，合成目标视角时产生的遮挡掩码，等于从目标视角反向扭曲回源视角时丢失的像素掩码。这一发现使得仅通过单目视频即可解析计算训练所需的遮挡掩码，无需执行完整的左右-右左循环。基于 GRT 的自监督训练在真实视频数据集上超越了有监督 SOTA 方法。对舞蹈生成而言，这意味着可从海量单目舞蹈视频中提取深度监督信号，改善遮挡区域（如手臂交叉、身体旋转）的运动生成质量。",
        keyPoints: [
          "几何互惠定理（GRT）揭示 DIBR 扭曲过程本身编码了循环一致性所需的全部信息",
          "从单目图像直接解析计算遮挡掩码，无需立体视频对或合成数据",
          "在 ImageNet-GRT、Kinetics-GRT 等数据集上超越有监督 SOTA"
        ],
        href: "https://arxiv.org/abs/2607.05354",
        paperLink: "Geometric Reciprocity: Unlocking Self-Supervision for Stereoscopic Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "RynnWorld-4D：机器人操作的 4D 具身世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2607.06559",
        description: "RGB-DF 多模态表示（RGB、深度、光流）统一建模场景的 4D 动态，其跨模态注意力机制可能改善舞蹈生成中的音频-运动对齐。",
      },
      {
        num: 5,
        title: "RynnWorld-Teleop：数字遥操作的动作条件世界模型",
        tag: "动作驱动",
        href: "https://arxiv.org/abs/2607.06558",
        description: "姿态流驱动的高保真视频生成，40+ FPS 实时交互，其动作-视频对齐方法可为舞蹈动作控制提供参考。",
      },
      {
        num: 6,
        title: "AlayaWorld：长时程可交互视频世界生成",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2607.06291",
        description: "自回归合成未来观测的可玩世界模型，可能用于构建用户与生成舞蹈的实时交互场景。",
      },
      {
        num: 7,
        title: "PixWorld：像素空间统一 3D 场景生成与重建",
        tag: "3D 生成",
        href: "https://arxiv.org/abs/2607.05373",
        description: "直接在渲染图像上监督扩散过程，避免 VAE 编码的信息损失，可能改善舞蹈生成中的人物外观保持。",
      },
    ],
    observation: "今日论文呈现一个共同主题：显式结构约束优于隐式泛化。MMGenre 表明音乐流派感知需要显式训练而非零样本迁移；MV-Forcing 用 4D 几何桥接替代密集双向注意力；Geometric Reciprocity 从几何原理出发解析计算监督信号。这提示舞蹈生成任务中，音频-运动对齐、多视角一致性、遮挡处理等挑战可能需要类似的显式结构建模，而非依赖端到端隐式学习。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation",
    title: "Genre-Aware Music Understanding & Multi-View Consistency",
    overview: [
      "MMGenre shows genre perception requires explicit training, zero-shot transfer yields limited gains",
      "MV-Forcing achieves long-horizon multi-view video generation via 4D geometric bridging",
      "Geometric Reciprocity enables self-supervised monocular depth estimation for stereo generation"
    ],
    papers: [
      {
        num: 1,
        tag: "Music Understanding",
        title: "MMGenre: Benchmarking Singing Voice Synthesis Across Musical Genres",
        description: "MMGenre is the first benchmark systematically evaluating cross-genre generalization in singing voice synthesis (SVS). Using Suno V4.5, the team generated music covering 10 major genres and 26 subgenres, constructing 3,152 aligned score-vocal segments. The key finding is alarming: current SVS models (DiffSinger, StyleSinger, etc.) produce vocals with highly similar acoustic characteristics across genres, lacking discernible genre distinction. Zero-shot style transfer yields only marginal improvements, while lightweight genre-specific continued training brings substantial gains. This suggests that for dance generation, music style conditioning similarly requires explicit genre-aware training rather than relying on implicit model generalization.",
        keyPoints: [
          "Systematic evaluation across 10 major genres (Pop, Rock, Jazz, Classical, etc.) and 26 subgenres",
          "Current SVS models show weak cross-genre discrimination in acoustic features per Gemini 2.5 Pro evaluation (GCS-5)",
          "Zero-shot genre adaptation shows minimal gains; continued training brings substantial improvements—suggesting dance generation needs explicit music conditioning training"
        ],
        href: "https://arxiv.org/abs/2607.06986",
        paperLink: "MMGenre: Benchmarking Singing Voice Synthesis across Multiple Musical Genres",
      },
      {
        num: 2,
        tag: "Video Generation",
        title: "MV-Forcing: Long Multi-View Video Generation via 4D-Grounded Spatio-Temporal Self-Forcing",
        description: "MV-Forcing is the first framework enabling long multi-view video generation with arbitrary temporal horizons and viewpoint counts. The core innovation is using an autoregressive 4D reconstruction model (CUT3R) as a 'geometric bridge'—after generating each view, it immediately reconstructs the 3D structure and renders a geometric prior for the next viewpoint, which the diffusion model refines. This design avoids the quadratic complexity of traditional bidirectional attention over the time-view grid, enabling true streaming inference. Distribution Matching Distillation with Spatio-Temporal Self-Forcing effectively closes the train-inference exposure bias gap. For dance generation, this means future support for multi-view dance videos with orbiting camera trajectories, and the 4D geometric consistency mechanism may improve temporal coherence for complex motions like spins and jumps.",
        keyPoints: [
          "CUT3R autoregressive 4D reconstruction model serves as geometric bridge between views",
          "Spatio-Temporal Self-Forcing closes exposure bias gaps along both temporal and view dimensions",
          "Single model supports arbitrary temporal length and viewpoint count, enabling orbiting camera dance video generation"
        ],
        href: "https://arxiv.org/abs/2607.05376",
        paperLink: "MV-Forcing: Long Multi-View Video Generation via 4D-Grounded Spatio-Temporal Self-Forcing",
      },
      {
        num: 3,
        tag: "Depth Estimation",
        title: "Geometric Reciprocity: Self-Supervision for Stereoscopic Video Generation",
        description: "The core bottleneck in monocular-to-stereo video conversion is inpainting disoccluded regions. Existing training methods rely on scarce real stereo pairs or synthetic data with domain gaps. This paper introduces the Geometric Reciprocity Theorem (GRT): under nearest-neighbor DIBR, the disocclusion mask when synthesizing a target view equals the mask of pixels lost when warping back from target to source. This enables analytically computing training masks from monocular videos alone, without executing the full left-right-left cycle. GRT-based self-supervised training surpasses supervised SOTA on real video datasets. For dance generation, this means depth supervision signals can be extracted from abundant monocular dance videos, improving motion generation quality in occluded regions (arm crossings, body rotations).",
        keyPoints: [
          "Geometric Reciprocity Theorem reveals DIBR warping encodes all information needed for cycle consistency",
          "Analytically compute disocclusion masks from monocular images without stereo pairs or synthetic data",
          "Surpasses supervised SOTA on ImageNet-GRT, Kinetics-GRT, and DAVIS-GRT datasets"
        ],
        href: "https://arxiv.org/abs/2607.05354",
        paperLink: "Geometric Reciprocity: Unlocking Self-Supervision for Stereoscopic Video Generation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "RynnWorld-4D: 4D Embodied World Models for Robotic Manipulation",
        tag: "World Models",
        href: "https://arxiv.org/abs/2607.06559",
        description: "RGB-DF multi-modal representation (RGB, depth, optical flow) unifies 4D scene dynamics modeling. Its cross-modal attention mechanism may improve audio-motion alignment in dance generation.",
      },
      {
        num: 5,
        title: "RynnWorld-Teleop: Action-Conditioned World Model for Digital Teleoperation",
        tag: "Action-Driven",
        href: "https://arxiv.org/abs/2607.06558",
        description: "Hand-pose stream drives high-fidelity egocentric video synthesis at 40+ FPS. Its action-video alignment approach provides reference for dance motion control.",
      },
      {
        num: 6,
        title: "AlayaWorld: Long-Horizon Playable Video World Generation",
        tag: "World Models",
        href: "https://arxiv.org/abs/2607.06291",
        description: "Autoregressive world model synthesizing future observations conditioned on interactions. May enable real-time user interaction with generated dance performances.",
      },
      {
        num: 7,
        title: "PixWorld: Unifying 3D Generation and Reconstruction in Pixel Space",
        tag: "3D Generation",
        href: "https://arxiv.org/abs/2607.05373",
        description: "Supervises diffusion directly on rendered images, avoiding VAE encoding information loss. May improve subject appearance preservation in dance generation.",
      },
    ],
    observation: "Today's papers share a common theme: explicit structural constraints outperform implicit generalization. MMGenre shows music genre perception requires explicit training rather than zero-shot transfer; MV-Forcing replaces dense bidirectional attention with 4D geometric bridging; Geometric Reciprocity derives supervision signals analytically from geometric principles. This suggests that challenges in dance generation—audio-motion alignment, multi-view consistency, occlusion handling—may similarly benefit from explicit structural modeling rather than relying solely on end-to-end implicit learning.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-08`,
        'en': `/en/daily/music-to-dance/2026-07-08`,
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
      date="2026-07-08"
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
