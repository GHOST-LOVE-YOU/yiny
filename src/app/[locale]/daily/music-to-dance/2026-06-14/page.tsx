import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-06-14 | 2D监督3D运动生成与相机控制新进展",
    overview: [
      "VideoMDM 提出从2D视频直接学习3D运动先验的扩散框架，无需3D标注即可训练高质量运动生成模型",
      "Flex4DHuman 基于 Wan 2.1 实现无显式几何先验的多视角人体视频生成，支持单目视频到4D高斯溅射",
      "OmniDirector 提出相机网格表示，实现多镜头相机运动克隆的统一框架"
    ],
    papers: [
      {
        num: 1,
        tag: "3D运动生成",
        title: "VideoMDM: 基于2D监督的3D人体运动生成",
        description: "VideoMDM 提出了一种革命性的训练范式：仅使用从单目视频中提取的2D姿态，即可训练3D运动扩散模型。核心创新在于深度感知重投影损失——在温和假设下，该损失在期望上等价于直接3D监督。论文将标准3D运动正则化器（速度一致性、过参数化表示对齐）适配到2D设置，通过相机射线投影生成伪目标。在HumanML3D上，VideoMDM达到FID 0.88，接近全3D监督MDM的0.54；在真实视频数据集Fit3D上，相比WHAM将MPJPE从228mm降至111mm，加速度误差降低5.5倍。对于music-to-dance任务，这意味着可以从海量舞蹈视频中学习运动先验，彻底摆脱对昂贵MoCap数据的依赖。",
        keyPoints: [
          "深度感知重投影损失：通过d加权消除透视投影的1/d缩放偏差，使2D监督在期望上等价于3D MSE",
          "运动表示对齐：通过射线投影将预测的3D运动投影到2D观测射线，生成冗余通道（关节旋转、速度、足接触）的伪目标",
          "多步去噪策略：对低噪声时间步(t < t*)进一步扩散到更高噪声水平再逐步去噪，确保模型学习高频细节"
        ],
        href: "https://arxiv.org/abs/2606.13364",
        paperLink: "VideoMDM: Towards 3D Human Motion Generation From 2D Supervision",
      },
      {
        num: 2,
        tag: "多视角视频生成",
        title: "Flex4DHuman: 无需几何先验的灵活多视角视频扩散",
        description: "Flex4DHuman 基于 Wan 2.1 1.3B模型，通过相对相机姿态位置编码实现多视角视频生成，无需SMPL骨架、深度图或法线等显式几何先验。核心创新是五轴位置编码：将原始RoPE的时间维度重新分配为时间(16)、视角(8)和SE(3)相机几何(20)三个子带。三阶段训练课程逐步引入姿态跟随、动态参考视角生成和时序rollout。在DNA-Rendering上，相比使用GT骨架的Diffuman4D提升+1.21dB PSNR；单目设置下提升+9.32dB。对于music-to-dance，这意味着可以将音频节拍作为额外条件注入，实现音乐驱动的多视角舞蹈生成，同时支持从单目舞蹈视频重建4D动态高斯溅射。",
        keyPoints: [
          "PRoPE相机编码：通过T⊤查询和T⁻¹键变换使注意力依赖于token间的相对相机变换，无需额外可学习参数",
          "三阶段训练课程：Stage 1单参考单目标适应新编码；Stage 2动态参考采样支持1-15个参考视角；Stage 3教师强制历史条件实现时序rollout",
          "单目到4D高斯溅射：生成的同步多视角视频可直接输入FreeTimeGS重建动态4D表示"
        ],
        href: "https://arxiv.org/abs/2606.13655",
        paperLink: "Flex4DHuman: Flexible Multi-view Video Diffusion for 4D Human Reconstruction",
      },
      {
        num: 3,
        tag: "相机运动控制",
        title: "OmniDirector: 无需交叉配对数据的多镜头相机克隆",
        description: "OmniDirector 提出相机网格(camera grid)表示——将相机参数渲染为3D空场景中的网格运动视频，实现相机运动与内容解耦。该表示支持单镜头和多镜头统一处理，且可从任意视频自动生成，无需昂贵的交叉配对数据。在百万级相机网格-视频对上训练的MMDiT框架，配合分层提示扩展代理(PE Agent)将相机运动、主体、动作语义融合为统一文本。对于music-to-dance任务，相机网格提供了一种直观的舞蹈视频相机克隆方式：可以从参考舞蹈视频中提取相机运动，应用到生成的舞蹈视频上，实现导演级的镜头语言控制。",
        keyPoints: [
          "相机网格表示：在空3D房间中渲染相机轨迹，通过地板/天花板正交网格和隧道墙垂直线可视化相机运动，支持鱼眼、推拉变焦等特殊效果",
          "分层提示扩展：inter-shot层处理镜头间关系确保多镜头语义连贯，intra-shot层描述单镜头内相机克隆",
          "模态兼容注入：相机网格作为时空信号与视频latent沿帧维度拼接，通过标准3D VAE编码，无需架构修改"
        ],
        href: "https://arxiv.org/abs/2606.13432",
        paperLink: "OmniDirector: General Multi-Shot Camera Cloning without Cross-Paired Data",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "MoVerse: 全景高斯支架实时视频世界模型",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2606.13376",
        description: "从单张窄视场图像创建可交互漫游的360°场景，结合显式3D高斯表示与生成视频模型的感知质量，支持实时8FPS场景漫游。双向扩散教师-自回归学生蒸馏机制对舞蹈视频时序一致性有参考价值。",
      },
      {
        num: 5,
        title: "HYDRA-X: 整体视觉Tokenizer的统一多模态模型",
        tag: "视觉Tokenization",
        href: "https://arxiv.org/abs/2606.13289",
        description: "统一图像和视频tokenization的7B模型，发现帧级因果时序注意力足以支持视觉重建。统一tokenizer设计可启发多模态舞蹈生成中参考图与生成视频的联合表示学习。",
      },
      {
        num: 6,
        title: "World Tracing: 像素对齐的生成式3D几何",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2606.13652",
        description: "预测与观测像素对齐的3D点栈，第一层表示可见表面，后续层表示遮挡表面。对舞蹈生成中人体遮挡处理和视角变化有潜在应用价值。",
      },
      {
        num: 7,
        title: "Z-Image Turbo++: 2步高保真图像生成",
        tag: "扩散蒸馏",
        href: "https://arxiv.org/abs/2606.12575",
        description: "通过分布对齐对抗学习和步解耦参数化实现2步高质量生成。对加速舞蹈视频扩散模型推理有借鉴意义。",
      },
      {
        num: 8,
        title: "AudioX-Turbo: 统一高效的多模态音频生成",
        tag: "音频生成",
        href: "https://arxiv.org/abs/2606.12555",
        description: "支持文本/视频/音频条件输入的4步音频生成框架，多模态自适应融合模块可为音乐-舞蹈对齐提供技术参考。",
      },
    ],
    observation: "今日论文呈现出两个重要趋势：一是3D运动生成正在从昂贵的MoCap数据依赖转向2D视频监督，VideoMDM的深度感知重投影损失为这一方向提供了理论基础；二是多视角视频生成正在摆脱显式几何先验（SMPL、深度图）的束缚，Flex4DHuman的相机姿态编码和OmniDirector的相机网格表示都表明，通过更巧妙的条件编码设计，可以直接从视频学习视角一致性。对于music-to-dance任务，这意味着未来可能实现：从任意舞蹈视频学习运动先验→生成多视角同步舞蹈视频→应用参考视频的相机运动→输出具有专业镜头语言的舞蹈作品。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-06-14 | 2D-Supervised 3D Motion Generation & Camera Control Advances",
    overview: [
      "VideoMDM proposes training 3D motion diffusion models from 2D video supervision only, eliminating the need for expensive MoCap data",
      "Flex4DHuman enables multi-view human video generation without explicit geometric priors, supporting monocular-to-4D Gaussian splatting",
      "OmniDirector introduces camera grid representation for unified multi-shot camera motion cloning without cross-paired data"
    ],
    papers: [
      {
        num: 1,
        tag: "3D Motion Generation",
        title: "VideoMDM: 3D Human Motion Generation from 2D Supervision",
        description: "VideoMDM introduces a revolutionary training paradigm: training 3D motion diffusion models using only 2D poses extracted from monocular videos. The core innovation is depth-aware reprojection loss—which, under mild assumptions, is provably equivalent in expectation to direct 3D supervision. The paper adapts standard 3D motion regularizers (velocity consistency, over-parameterized representation alignment) to the 2D setting via camera ray projection for pseudo-target generation. On HumanML3D, VideoMDM achieves FID 0.88, approaching 0.54 of fully 3D-supervised MDM; on real-world Fit3D, MPJPE drops from 228mm (WHAM) to 111mm with 5.5× lower acceleration error. For music-to-dance, this means learning motion priors from abundant dance videos without expensive MoCap constraints.",
        keyPoints: [
          "Depth-aware reprojection loss: d-weighting eliminates 1/d scaling bias from perspective projection, making 2D supervision equivalent to 3D MSE in expectation",
          "Motion representation alignment: ray projection of predicted 3D motion onto 2D observation rays generates pseudo-targets for redundant channels (joint rotations, velocities, foot contacts)",
          "Multi-step denoising: low-noise timesteps (t < t*) are further diffused to higher noise levels before gradual denoising, ensuring high-frequency detail learning"
        ],
        href: "https://arxiv.org/abs/2606.13364",
        paperLink: "VideoMDM: Towards 3D Human Motion Generation From 2D Supervision",
      },
      {
        num: 2,
        tag: "Multi-View Video Generation",
        title: "Flex4DHuman: Multi-View Video Diffusion Without Geometric Priors",
        description: "Flex4DHuman builds on Wan 2.1 1.3B with relative camera-pose positional encoding for multi-view video generation, eliminating explicit geometric priors like SMPL skeletons, depth maps, or normals. The core innovation is five-axis positional encoding: reallocating original RoPE temporal dimensions into time (16), view (8), and SE(3) camera geometry (20) sub-bands. A three-stage curriculum progressively introduces pose following, dynamic reference-view generation, and temporal rollout. On DNA-Rendering, it improves +1.21dB PSNR over Diffuman4D with GT skeletons; +9.32dB in monocular settings. For music-to-dance, this enables injecting audio beats as additional conditioning for music-driven multi-view dance generation, plus 4D Gaussian splat reconstruction from monocular dance videos.",
        keyPoints: [
          "PRoPE camera encoding: T⊤ query and T⁻¹ key transformations make attention depend on relative camera transforms between tokens without extra learnable parameters",
          "Three-stage curriculum: Stage 1 adapts single-ref/single-target to new encoding; Stage 2 dynamic reference sampling supports 1-15 reference views; Stage 3 teacher-forced history enables temporal rollout",
          "Monocular-to-4D Gaussian splatting: generated synchronized multi-view videos feed directly into FreeTimeGS for dynamic 4D reconstruction"
        ],
        href: "https://arxiv.org/abs/2606.13655",
        paperLink: "Flex4DHuman: Flexible Multi-view Video Diffusion for 4D Human Reconstruction",
      },
      {
        num: 3,
        tag: "Camera Motion Control",
        title: "OmniDirector: Multi-Shot Camera Cloning Without Cross-Paired Data",
        description: "OmniDirector proposes camera grid representation—rendering camera parameters as grid motion videos in empty 3D scenes to decouple camera motion from content. This unified representation handles single and multi-shot scenarios and can be automatically generated from any video without expensive cross-paired data. The MMDiT framework trained on million-scale camera grid-video pairs, combined with hierarchical Prompt Expansion (PE) Agent, fuses camera motion, subject, and action semantics into unified text. For music-to-dance, camera grids provide intuitive dance video camera cloning: extract camera motion from reference dance videos and apply to generated dance videos for director-level cinematographic control.",
        keyPoints: [
          "Camera grid representation: rendering camera trajectories in empty 3D rooms with floor/ceiling orthogonal grids and tunnel wall vertical lines visualizing camera motion, supporting fisheye, dolly zoom effects",
          "Hierarchical prompt expansion: inter-shot layer handles shot relationships for multi-shot coherence; intra-shot layer describes single-shot camera cloning",
          "Modality-compatible injection: camera grids as spatiotemporal signals concatenate with video latents along frame dimension, encoded via standard 3D VAE without architectural changes"
        ],
        href: "https://arxiv.org/abs/2606.13432",
        paperLink: "OmniDirector: General Multi-Shot Camera Cloning without Cross-Paired Data",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "MoVerse: Real-Time Video World Modeling with Panoramic Gaussian Scaffold",
        tag: "World Model",
        href: "https://arxiv.org/abs/2606.13376",
        description: "Creates interactively navigable 360° scenes from single narrow-FOV images, combining explicit 3D Gaussian representations with generative video perceptual quality at 8FPS. Bidirectional diffusion teacher-causal autoregressive student distillation informs dance video temporal consistency.",
      },
      {
        num: 5,
        title: "HYDRA-X: Unified Multimodal Models with Holistic Visual Tokenizers",
        tag: "Visual Tokenization",
        href: "https://arxiv.org/abs/2606.13289",
        description: "7B model unifying image and video tokenization, finding frame-level causal temporal attention suffices for reconstruction. Unified tokenizer design informs joint representation learning of reference images and generated videos for dance generation.",
      },
      {
        num: 6,
        title: "World Tracing: Generative Pixel-Aligned Geometry",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2606.13652",
        description: "Predicts pixel-aligned 3D point stacks with first layer for visible surfaces and subsequent layers for occluded geometry. Potential applications for human occlusion handling and viewpoint changes in dance generation.",
      },
      {
        num: 7,
        title: "Z-Image Turbo++: High-Fidelity Two-Step Image Generation",
        tag: "Diffusion Distillation",
        href: "https://arxiv.org/abs/2606.12575",
        description: "Achieves high-quality 2-step generation via distribution-aligned adversarial learning and step-decoupled parameterization. Insights applicable for accelerating dance video diffusion model inference.",
      },
      {
        num: 8,
        title: "AudioX-Turbo: Unified Framework for Efficient Anything-to-Audio",
        tag: "Audio Generation",
        href: "https://arxiv.org/abs/2606.12555",
        description: "4-step audio generation framework supporting text/video/audio conditioning. Multimodal adaptive fusion module provides technical reference for music-dance alignment.",
      },
    ],
    observation: "Today's papers reveal two key trends: first, 3D motion generation is shifting from expensive MoCap data dependency to 2D video supervision, with VideoMDM's depth-aware reprojection loss providing theoretical foundations; second, multi-view video generation is breaking free from explicit geometric priors (SMPL, depth maps)—Flex4DHuman's camera pose encoding and OmniDirector's camera grid representation demonstrate that clever conditioning encoding enables direct learning of view consistency from videos. For music-to-dance, this suggests a future pipeline: learn motion priors from arbitrary dance videos → generate multi-view synchronized dance videos → apply camera motion from reference videos → output dance productions with professional cinematography.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-14`,
        'en': `/en/daily/music-to-dance/2026-06-14`,
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
      date="2026-06-14"
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
