import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-16 | 多模态视频生成与世界模型新进展",
    overview: [
      "Seedance 2.0 发布统一多模态音视频生成架构，支持文本/图像/音频/视频四种输入模态，实现专业级内容生成",
      "HY-World 2.0 提出首个开源统一世界生成与重建框架，通过四阶段流水线实现高保真3D场景合成",
      "LeapAlign 探索在任意生成步骤后训练flow matching模型，为扩散模型优化提供新思路"
    ],
    papers: [
      {
        num: 1,
        tag: "多模态视频生成",
        title: "Seedance 2.0：字节跳动发布原生多模态音视频生成模型",
        description: "Seedance 2.0 是字节跳动Seed团队发布的最新视频生成模型，采用统一的大规模多模态音视频联合生成架构。与music-to-dance任务高度相关的是其多模态参考输入能力：支持组合使用文本、图像、视频、音频作为输入，最多可同时参考3个视频片段、9张图像和3个音频片段。模型具备原生双声道音频生成能力，可实现背景音乐、环境音效和人物叙述的多轨同步输出，并与视觉节奏精确对齐。对于舞蹈生成任务，这意味着可以同时参考：目标人物图像（身份保持）、音乐音频（节奏控制）、示例舞蹈视频（动作风格）。Seedance 2.0 Fast版本针对低延迟场景优化，支持4-15秒视频生成，输出分辨率480p/720p。在人物运动建模方面，模型在动作自然度、时序连贯性和物理合理性上有显著提升，能够生成高张力的大幅度动作和微妙的微表情。",
        keyPoints: [
          "四模态联合输入：文本+图像+视频+音频，最多3视频+9图+3音频同时参考，支持复杂多模态条件控制",
          "原生音视频同步：双声道高保真音频生成，多轨输出（背景音+环境音效+叙述），严格音画时序对齐",
          "专业级生成能力：支持主体控制、运动操控、风格迁移、特效设计、视频扩展和编辑，具备导演级镜头规划能力"
        ],
        href: "https://arxiv.org/abs/2604.14148",
        paperLink: "Seedance 2.0: Advancing Video Generation for World Complexity",
      },
      {
        num: 2,
        tag: "3D世界模型",
        title: "HY-World 2.0：统一世界生成与重建的多模态世界模型",
        description: "HY-World 2.0 是腾讯混元团队发布的开源多模态世界模型，首次统一了世界生成（从稀疏输入合成3D场景）和世界重建（从多视图恢复3D结构）两大任务。其核心贡献是四阶段世界生成流水线：HY-Pano 2.0全景图生成 → WorldNav轨迹规划 → WorldStereo 2.0世界扩展 → WorldMirror 2.0世界合成。对于music-to-dance任务，WorldStereo 2.0的记忆机制具有重要参考价值：全局几何记忆（Global-Geometric Memory）维护场景级一致性，空间立体记忆（Spatial-Stereo Memory）保持视角间连贯性，记忆增强（Memory Augmentation）策略提升生成稳定性。这些技术可直接迁移到长时程舞蹈视频生成中，解决当前模型在长时间生成中的身份漂移和动作不一致问题。此外，WorldLens 3DGS渲染平台支持人物角色导入和交互式探索，为舞蹈场景的3D呈现提供基础设施。",
        keyPoints: [
          "四阶段生成流水线：全景生成→轨迹规划→世界扩展→世界合成，从文本/单图生成可导航3D高斯场景",
          "双重记忆机制：全局几何记忆维护场景一致性，空间立体记忆保持视角连贯，支持长序列稳定生成",
          "统一生成与重建：WorldMirror 2.0实现从多视图/视频的几何精确重建，同时作为世界生成的核心组件"
        ],
        href: "https://arxiv.org/abs/2604.14268",
        paperLink: "HY-World 2.0: A Multi-Modal World Model for Reconstructing, Generating, and Simulating 3D Worlds",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "LeapAlign：在任意生成步骤后训练Flow Matching模型",
        tag: "扩散模型优化",
        href: "https://arxiv.org/abs/2604.15311",
        description: "提出在flow matching模型的任意生成步骤进行后训练，无需从初始噪声开始，可显著提升模型在特定步数范围内的生成质量，为扩散模型推理优化提供新思路。",
      },
      {
        num: 4,
        title: "双向跨模态提示用于事件帧非对称立体匹配",
        tag: "跨模态学习",
        href: "https://arxiv.org/abs/2604.15312",
        description: "双向跨模态提示机制可用于改进音频-视觉特征对齐，事件帧与标准图像的立体匹配方法对多模态舞蹈生成有参考价值。",
      },
      {
        num: 5,
        title: "超越独立帧：多帧潜在注意力自编码器",
        tag: "视频表征学习",
        href: "https://arxiv.org/abs/2604.15096",
        description: "潜在注意力掩码自编码器通过建模帧间依赖关系，可提升视频表征的时序一致性，对舞蹈视频的长程连贯性生成有帮助。",
      },
    ],
    observation: "今日论文体现了视频生成领域的两个重要趋势：一是多模态统一架构成为主流，Seedance 2.0和HY-World 2.0都支持文本/图像/音频/视频四种模态的灵活组合输入，这对music-to-dance任务意味着更丰富的条件控制可能性；二是世界模型与视频生成的边界逐渐模糊，HY-World 2.0通过3D高斯溅射实现可交互的3D场景生成，为舞蹈视频从2D像素生成向3D空间建模演进提供了技术路径。建议关注如何将Seedance的多模态参考机制与HY-World的3D一致性结合，实现既有丰富控制又有空间连贯性的舞蹈生成系统。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-16 | Advances in Multi-Modal Video Generation and World Models",
    overview: [
      "Seedance 2.0 releases a unified multi-modal audio-video generation architecture supporting four input modalities: text, image, audio, and video for professional content creation",
      "HY-World 2.0 proposes the first open-source unified framework for world generation and reconstruction, achieving high-fidelity 3D scene synthesis through a four-stage pipeline",
      "LeapAlign explores post-training flow matching models at arbitrary generation steps, offering new insights for diffusion model optimization"
    ],
    papers: [
      {
        num: 1,
        tag: "Multi-Modal Video Generation",
        title: "Seedance 2.0: ByteDance Releases Native Multi-Modal Audio-Video Generation Model",
        description: "Seedance 2.0 is the latest video generation model from ByteDance's Seed team, adopting a unified large-scale multi-modal audio-video joint generation architecture. Highly relevant to music-to-dance tasks is its multi-modal reference input capability: supporting combined use of text, images, videos, and audio as inputs, with up to 3 video clips, 9 images, and 3 audio clips simultaneously. The model features native binaural audio generation, enabling synchronized multi-track output of background music, ambient sound effects, and character narration, precisely aligned with visual rhythm. For dance generation, this means simultaneous reference to: target person images (identity preservation), music audio (rhythm control), and example dance videos (motion style). The Fast version is optimized for low-latency scenarios, supporting 4-15 second video generation at 480p/720p resolution. In human motion modeling, the model shows significant improvements in motion naturalness, temporal coherence, and physical plausibility, capable of generating high-tension large-scale movements and subtle micro-expressions.",
        keyPoints: [
          "Four-modality joint input: text+image+video+audio, up to 3 videos+9 images+3 audio references simultaneously, supporting complex multi-modal conditional control",
          "Native audio-video synchronization: Binaural high-fidelity audio generation, multi-track output (background+ambient+narration), strict audio-visual temporal alignment",
          "Professional generation capabilities: Subject control, motion manipulation, style transfer, special effects, video extension and editing, with director-level shot planning"
        ],
        href: "https://arxiv.org/abs/2604.14148",
        paperLink: "Seedance 2.0: Advancing Video Generation for World Complexity",
      },
      {
        num: 2,
        tag: "3D World Model",
        title: "HY-World 2.0: Unified Multi-Modal World Model for Generation and Reconstruction",
        description: "HY-World 2.0 is an open-source multi-modal world model from Tencent Hunyuan, first unifying world generation (synthesizing 3D scenes from sparse inputs) and world reconstruction (recovering 3D structures from multi-view observations). Its core contribution is a four-stage world generation pipeline: HY-Pano 2.0 panorama generation → WorldNav trajectory planning → WorldStereo 2.0 world expansion → WorldMirror 2.0 world composition. For music-to-dance tasks, WorldStereo 2.0's memory mechanisms offer important insights: Global-Geometric Memory maintains scene-level consistency, Spatial-Stereo Memory preserves cross-view coherence, and Memory Augmentation strategies enhance generation stability. These techniques can be directly transferred to long-horizon dance video generation, addressing current models' identity drift and motion inconsistency issues during extended generation. Additionally, the WorldLens 3DGS rendering platform supports character import and interactive exploration, providing infrastructure for 3D dance scene presentation.",
        keyPoints: [
          "Four-stage generation pipeline: Panorama generation → Trajectory planning → World expansion → World composition, generating navigable 3D Gaussian scenes from text/single images",
          "Dual memory mechanisms: Global-geometric memory maintains scene consistency, spatial-stereo memory preserves view coherence, supporting stable long-sequence generation",
          "Unified generation and reconstruction: WorldMirror 2.0 achieves geometrically accurate reconstruction from multi-view/video while serving as core component for world generation"
        ],
        href: "https://arxiv.org/abs/2604.14268",
        paperLink: "HY-World 2.0: A Multi-Modal World Model for Reconstructing, Generating, and Simulating 3D Worlds",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "LeapAlign: Post-Training Flow Matching Models at Any Generation Step",
        tag: "Diffusion Model Optimization",
        href: "https://arxiv.org/abs/2604.15311",
        description: "Proposes post-training flow matching models at arbitrary generation steps without starting from initial noise, significantly improving generation quality within specific step ranges.",
      },
      {
        num: 4,
        title: "Bidirectional Cross-Modal Prompting for Event-Frame Asymmetric Stereo",
        tag: "Cross-Modal Learning",
        href: "https://arxiv.org/abs/2604.15312",
        description: "Bidirectional cross-modal prompting mechanism can improve audio-visual feature alignment; stereo matching between event frames and standard images offers insights for multi-modal dance generation.",
      },
      {
        num: 5,
        title: "Beyond Independent Frames: Latent Attention Masked Autoencoders for Multi-Frame",
        tag: "Video Representation Learning",
        href: "https://arxiv.org/abs/2604.15096",
        description: "Latent attention masked autoencoders model inter-frame dependencies to improve temporal consistency in video representations, helpful for long-range coherent dance video generation.",
      },
    ],
    observation: "Today's papers reflect two important trends in video generation: First, multi-modal unified architectures are becoming mainstream—both Seedance 2.0 and HY-World 2.0 support flexible combination of four modalities (text/image/audio/video), meaning richer conditional control possibilities for music-to-dance tasks. Second, the boundary between world models and video generation is blurring—HY-World 2.0 achieves interactive 3D scene generation through 3D Gaussian Splatting, providing a technical path for dance video evolution from 2D pixel generation to 3D spatial modeling. Future work should explore combining Seedance's multi-modal reference mechanism with HY-World's 3D consistency to achieve dance generation systems with both rich control and spatial coherence.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-16`,
        'en': `/en/daily/music-to-dance/2026-04-16`,
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
      date="2026-04-16"
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
