import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 研究",
    title: "2026-07-14 | 分钟级舞蹈生成与无骨架动作迁移",
    overview: [
      "阿里通义实验室发布 Wan-Dancer，实现分钟级连贯音乐驱动舞蹈生成，突破扩散模型20秒时序限制",
      "Motion4Motion 提出无需骨架的 motion flow 迁移方法，支持跨物种动作迁移",
      "StudioRecon 实现低重叠相机下的4D人体场景重建，可变形高斯人体初始化技术值得关注"
    ],
    papers: [
      {
        num: 1,
        tag: "音乐驱动生成",
        title: "Wan-Dancer: 分钟级连贯音乐驱动舞蹈生成的分层框架",
        description: "阿里通义实验室提出的 Wan-Dancer 是首个实现分钟级（超过60秒）连贯音乐驱动舞蹈生成的框架。核心创新在于分层全局-局部架构：全局阶段利用完整音乐上下文进行长期节奏规划，生成分布均匀的关键帧；局部阶段则在关键帧之间进行精细插值。技术亮点包括 time-mapped RoPE 嵌入实现动态帧率适配、光流损失函数增强运动连续性、以及基于运动速度的分层采样策略（慢速10%/中速80%/快速10%）。实验表明，该框架可生成720p/30fps的稳定长视频，在5种舞蹈风格上均达到SOTA。对于当前方案，time-mapped RoPE 可直接用于改进音频-视觉时序对齐模块，光流损失可集成到现有的 patch-shuffling 训练流程中以增强动作连贯性。",
        keyPoints: [
          "分层全局-局部架构：全局关键帧规划 + 局部时序细化，解决长视频时序漂移问题",
          "time-mapped RoPE：将位置编码映射到绝对时间，支持动态帧率和任意音乐时长适配",
          "光流损失 + 运动速度控制：SEAR-RAFT提取光流指导运动合成，分层采样平衡运动保真度"
        ],
        href: "https://arxiv.org/abs/2607.09581",
        paperLink: "Wan-Dancer: A Hierarchical Framework for Minute-scale Coherent Music-to-Dance Generation",
      },
      {
        num: 2,
        tag: "动作迁移",
        title: "Motion4Motion: 推理时跨主体动作迁移",
        description: "Stepfun团队提出的 Motion4Motion 是第一个无需训练、不依赖预定义骨架的 motion transfer 框架。传统方法依赖DWPose等姿态估计器和固定的骨骼拓扑，难以处理跨物种（人→动物）或形态差异大的角色。Motion4Motion 的核心创新是用像素级 motion flow 替代骨架表示，通过 TransPE 模块在 WAN-T2V 的 DiT 注意力机制中注入运动流。具体流程：1) 用 Grounded SAM-2 在源视频和目标图像上采样锚点并建立语义对应；2) 跟踪源视频中锚点的时序轨迹构建 motion flow；3) 通过 TransPE 将运动流注入到目标主体的去噪过程。该方法完全在推理阶段完成，无需任何微调。对于 music-to-dance 任务，这意味着可以摆脱对 DWPose 的依赖，直接基于光流实现舞蹈动作的跨人物迁移。",
        keyPoints: [
          "无骨架运动表示：用像素级 motion flow 替代骨骼拓扑，支持跨物种/跨形态迁移",
          "TransPE 注意力注入：在 DiT 的自注意力层中注入运动流，保持目标主体外观一致性",
          "训练无关：完全在推理阶段完成，无需微调或特定角色的训练数据"
        ],
        href: "https://arxiv.org/abs/2607.11644",
        paperLink: "Motion4Motion: Motion Transfer Across Subjects at Inference",
      },
      {
        num: 3,
        tag: "面部动作合成",
        title: "对话式机器人面部机制自动合成",
        description: "清华AIR团队提出的框架实现了从单张2D肖像到完整机械面部机制的自动生成，更重要的是提出了双身份对话式面部动作合成方法。与单轮说话头生成不同，该方法联合建模说话者和倾听者的行为，支持多轮对话中的角色切换。技术核心包括：1) 参数化连杆驱动面部模板，支持跨形态缩放；2) 基于 Action Unit (AU) 的轨迹表达目标；3) 双身份音频编码器分别建模说话和倾听状态。该方法在物理机器人上实现了实时部署。对于 music-to-dance 任务，其双身份建模思路可迁移到舞蹈生成：将"听音乐"视为倾听状态，"跳舞"视为表达状态，联合建模音频感知与动作表达的时序关系。",
        keyPoints: [
          "双身份对话建模：联合建模说话者和倾听者行为，支持多轮交互",
          "AU驱动的轨迹目标：基于面部动作单元定义表达性目标，生成物理可执行动作",
          "实时物理部署：从数字动画到机械执行器的语义区域映射"
        ],
        href: "https://arxiv.org/abs/2607.11688",
        paperLink: "Automated Synthesis of Facial Mechanisms for Conversational Animatronic Robots",
      },
      {
        num: 4,
        tag: "4D重建",
        title: "StudioRecon: 低重叠相机下的4D人体场景重建",
        description: "首尔国立大学提出的 StudioRecon 解决了低重叠相机（如4个90度分布相机）下的4D人体场景重建问题。核心洞察是背景和人类应使用不同的先验：背景使用视频扩散模型合成密集视角，人类使用 SMPL 参数模型约束几何。技术流程包括：1) 相机控制的视频扩散合成数百个背景新视角；2) 基于空间+姿态亲和性的跨视角身份关联和三角化关键点拟合初始化可变形高斯人体；3) 递归增强模块通过光流变形注入运动自适应一致性。实验在 EgoHumans、Harmony4D 等数据集上达到SOTA。对于舞蹈视频生成，其可变形高斯人体初始化技术和运动自适应一致性注入方法，对保持长视频中人物外观一致性具有参考价值。",
        keyPoints: [
          "解耦重建策略：背景用扩散模型，人类用SMPL先验，避免误差耦合",
          "可变形高斯人体：基于三角化关键点初始化，支持稀疏视角下的精确人体重建",
          "运动自适应一致性：单步扩散+光流变形，消除时序闪烁"
        ],
        href: "https://arxiv.org/abs/2607.09125",
        paperLink: "4D Human-Scene Reconstruction from Low-Overlap Captures",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "E-VQA: 基于证据的视频问答",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2607.11862",
        description: "Salesforce AI Research 提出证据支持的视频问答任务，要求模型输出时序片段和密集跟踪分割mask作为视觉证据。16万样本的ST-Evidence-Instruct数据集可用于训练可解释的舞蹈动作评估模型。",
      },
      {
        num: 6,
        title: "Latent-Identity Tuning: 潜空间身份微调",
        tag: "身份保持",
        href: "https://arxiv.org/abs/2607.11885",
        description: "以色列理工学院提出在预训练个性化编码器的潜空间中修改身份表示，实现细粒度面部编辑同时保持跨图像身份一致性。其潜空间语义方向发现方法可用于参考人物图的外观保持。",
      },
      {
        num: 7,
        title: "实时听众点头生成",
        tag: "音频驱动动作",
        href: "https://arxiv.org/abs/2607.12329",
        description: "京都大学提出基于 Voice Activity Projection (VAP) 的点头时机和运动学参数联合预测模型。轻量级设计支持实时运行，其音频-动作对齐思路可用于舞蹈节拍预测。",
      },
    ],
    observation: "今日论文呈现两个重要趋势：一是长时序视频生成的突破，Wan-Dancer 通过分层架构和 time-mapped RoPE 将扩散模型的有效时长从20秒扩展到分钟级；二是骨架-free 运动表示的兴起，Motion4Motion 用像素级 motion flow 替代骨骼拓扑，为跨人物舞蹈迁移提供了新思路。两者结合可能催生更灵活的舞蹈生成框架：全局层面用音乐上下文规划关键动作，局部层面用 motion flow 实现外观无关的动作迁移。",
  },
  en: {
    roleName: "Music-to-Dance Research",
    title: "2026-07-14 | Minute-scale Dance Generation & Skeleton-free Motion Transfer",
    overview: [
      "Alibaba Tongyi Lab releases Wan-Dancer, achieving minute-scale coherent music-driven dance generation, breaking the 20-second temporal limit of diffusion models",
      "Motion4Motion proposes skeleton-free motion flow transfer, enabling cross-species motion migration",
      "StudioRecon achieves 4D human-scene reconstruction from low-overlap cameras, with deformable Gaussian human initialization worth noting"
    ],
    papers: [
      {
        num: 1,
        tag: "Music-Driven Generation",
        title: "Wan-Dancer: Hierarchical Framework for Minute-scale Coherent Music-to-Dance Generation",
        description: "Wan-Dancer from Alibaba Tongyi Lab is the first framework to achieve minute-scale (over 60 seconds) coherent music-driven dance generation. The core innovation lies in its hierarchical global-to-local architecture: the global stage leverages full musical context for long-term rhythm planning to generate evenly distributed keyframes, while the local stage performs fine interpolation between keyframes. Technical highlights include time-mapped RoPE embeddings for dynamic frame rate adaptation, optical flow loss functions for enhanced motion continuity, and motion-speed-based hierarchical sampling (10% slow / 80% medium / 10% fast). Experiments show the framework can generate stable 720p/30fps long videos, achieving SOTA across 5 dance genres. For current approaches, time-mapped RoPE can directly improve audio-visual temporal alignment modules, and optical flow loss can be integrated into existing patch-shuffling training pipelines to enhance motion coherence.",
        keyPoints: [
          "Hierarchical global-to-local architecture: Global keyframe planning + local temporal refinement solves long-video temporal drift",
          "time-mapped RoPE: Maps positional encoding to absolute time, supporting dynamic frame rates and arbitrary music duration adaptation",
          "Optical flow loss + motion speed control: SEAR-RAFT extracts optical flow to guide motion synthesis, hierarchical sampling balances motion fidelity"
        ],
        href: "https://arxiv.org/abs/2607.09581",
        paperLink: "Wan-Dancer: A Hierarchical Framework for Minute-scale Coherent Music-to-Dance Generation",
      },
      {
        num: 2,
        tag: "Motion Transfer",
        title: "Motion4Motion: Motion Transfer Across Subjects at Inference",
        description: "Motion4Motion from Stepfun team is the first training-free motion transfer framework that doesn't rely on predefined skeletons. Traditional methods depend on pose estimators like DWPose and fixed skeletal topologies, making it difficult to handle cross-species (human→animal) or morphologically different characters. Motion4Motion's core innovation replaces skeleton representations with pixel-level motion flow, injecting motion flow into WAN-T2V's DiT attention mechanism through the TransPE module. The pipeline: 1) Sample anchors on source video and target image using Grounded SAM-2 to establish semantic correspondence; 2) Track anchor trajectories across time to build motion flow; 3) Inject motion flow into the target subject's denoising process via TransPE. This method operates entirely during inference without any fine-tuning. For music-to-dance tasks, this means breaking free from DWPose dependency and directly achieving cross-subject dance motion transfer based on optical flow.",
        keyPoints: [
          "Skeleton-free motion representation: Uses pixel-level motion flow instead of skeletal topology, supporting cross-species/cross-morphology transfer",
          "TransPE attention injection: Injects motion flow into DiT self-attention layers while maintaining target subject appearance consistency",
          "Training-free: Completed entirely during inference phase, no fine-tuning or character-specific training data required"
        ],
        href: "https://arxiv.org/abs/2607.11644",
        paperLink: "Motion4Motion: Motion Transfer Across Subjects at Inference",
      },
      {
        num: 3,
        tag: "Facial Motion Synthesis",
        title: "Automated Synthesis of Facial Mechanisms for Conversational Animatronic Robots",
        description: "The framework from Tsinghua AIR achieves automatic generation of complete mechanical facial mechanisms from a single 2D portrait, and more importantly proposes dual-identity conversational facial motion synthesis. Unlike single-turn talking head generation, this method jointly models speaker and listener behaviors, supporting role switching in multi-turn conversations. Technical core includes: 1) Parametric linkage-driven facial template supporting cross-morphology scaling; 2) Action Unit (AU)-based trajectory expression objectives; 3) Dual-identity audio encoder modeling both speaking and listening states. The method achieves real-time deployment on physical robots. For music-to-dance tasks, its dual-identity modeling approach can be migrated: treating 'listening to music' as the listening state and 'dancing' as the expression state, jointly modeling the temporal relationship between audio perception and motion expression.",
        keyPoints: [
          "Dual-identity conversational modeling: Jointly models speaker and listener behaviors, supporting multi-turn interaction",
          "AU-driven trajectory objectives: Defines expressive objectives based on facial action units, generating physically executable motions",
          "Real-time physical deployment: Semantic region-wise mapping from digital animation to mechanical actuators"
        ],
        href: "https://arxiv.org/abs/2607.11688",
        paperLink: "Automated Synthesis of Facial Mechanisms for Conversational Animatronic Robots",
      },
      {
        num: 4,
        tag: "4D Reconstruction",
        title: "StudioRecon: 4D Human-Scene Reconstruction from Low-Overlap Captures",
        description: "StudioRecon from Seoul National University addresses 4D human-scene reconstruction from low-overlap cameras (e.g., 4 cameras at 90-degree distribution). The core insight is that backgrounds and humans should use different priors: backgrounds use video diffusion models to synthesize dense views, while humans use SMPL parametric models to constrain geometry. The technical pipeline includes: 1) Camera-controlled video diffusion synthesizes hundreds of novel background views; 2) Cross-view identity association based on spatial+pose affinity and triangulated keypoint fitting initialize deformable Gaussian humans; 3) Recursive enhancement module injects motion-adaptive consistency through optical flow warping. Experiments achieve SOTA on EgoHumans, Harmony4D and other datasets. For dance video generation, its deformable Gaussian human initialization technique and motion-adaptive consistency injection method have reference value for maintaining human appearance consistency in long videos.",
        keyPoints: [
          "Decoupled reconstruction strategy: Backgrounds use diffusion models, humans use SMPL priors, avoiding error coupling",
          "Deformable Gaussian humans: Initialized based on triangulated keypoints, supporting accurate human reconstruction from sparse views",
          "Motion-adaptive consistency: Single-step diffusion + optical flow warping eliminates temporal flickering"
        ],
        href: "https://arxiv.org/abs/2607.09125",
        paperLink: "4D Human-Scene Reconstruction from Low-Overlap Captures",
      },
    ],
    worthReading: [
      {
        num: 5,
        title: "E-VQA: Evidence-Backed Video Question Answering",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2607.11862",
        description: "Salesforce AI Research proposes evidence-backed video QA requiring models to output temporal segments and dense tracked segmentation masks as visual evidence. The 160k-sample ST-Evidence-Instruct dataset can train interpretable dance motion evaluation models.",
      },
      {
        num: 6,
        title: "Latent-Identity Tuning in Text-to-Image Personalization",
        tag: "Identity Preservation",
        href: "https://arxiv.org/abs/2607.11885",
        description: "Technion proposes modifying identity representations in the latent space of pretrained personalization encoders, enabling fine-grained facial editing while preserving cross-image identity consistency. Its latent semantic direction discovery method can be applied to reference image appearance preservation.",
      },
      {
        num: 7,
        title: "Real-time Generation of Listener Nodding",
        tag: "Audio-Driven Motion",
        href: "https://arxiv.org/abs/2607.12329",
        description: "Kyoto University proposes a joint prediction model for nod timing and kinematic parameters based on Voice Activity Projection (VAP). The lightweight design supports real-time operation, and its audio-motion alignment approach can be used for dance beat prediction.",
      },
    ],
    observation: "Today's papers reveal two important trends: first, breakthroughs in long-temporal video generation, with Wan-Dancer extending diffusion models' effective duration from 20 seconds to minute-scale through hierarchical architecture and time-mapped RoPE; second, the rise of skeleton-free motion representation, with Motion4Motion replacing skeletal topology with pixel-level motion flow, providing new ideas for cross-subject dance transfer. Combining both may enable more flexible dance generation frameworks: global-level action planning with musical context, local-level appearance-agnostic motion transfer via motion flow.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-07-14`,
        'en': `/en/daily/music-to-dance/2026-07-14`,
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
      date="2026-07-14"
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
