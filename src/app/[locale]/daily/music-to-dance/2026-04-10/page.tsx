import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-10 | 解耦运动控制与3D全身Avatar生成",
    overview: [
      "MoRight 提出双分支运动建模框架，实现相机与物体运动的解耦控制，支持前向/逆向运动因果推理",
      "GenLCA 首次从百万级野外视频训练3D扩散模型，通过可见性感知训练策略处理部分观测数据",
      "MegaStyle 构建140万规模风格数据集，通过风格监督对比学习实现可泛化的风格迁移"
    ],
    papers: [
      {
        num: 1,
        tag: "运动控制与因果推理",
        title: "MoRight：正确的运动控制",
        description: "MoRight 针对现有运动控制视频生成方法的两大局限——相机与物体运动纠缠、缺乏运动因果推理——提出了统一解决方案。核心创新是双分支运动建模框架：规范分支在固定视角下建模物体运动，目标分支通过时序跨视角注意力将运动从规范空间迁移到任意相机姿态，实现相机与物体的解耦控制。运动因果建模通过将运动分解为主动（用户驱动）和被动（结果）两类，在训练时随机丢弃其中一类，迫使模型学习动作-结果关系。推理时支持前向推理（给定主动运动预测场景演化）和逆向推理（给定被动结果恢复驱动动作）。技术实现基于Wan2.1-14B DiT，通过双流联合去噪，在自注意力层实现跨视角信息交换。相机条件通过深度估计和相机姿态对首帧进行warp后编码，运动条件通过轨迹图编码。在DynPose-100K和Cooking基准上，MoRight在仅使用首帧重投影轨迹（无需未来帧特权信息）的情况下，实现了与使用完整3D轨迹的基线相当的运动控制精度，在物理常识（PC）指标上达到0.76，显著优于WanMove（0.73）。",
        keyPoints: [
          "双分支解耦架构：规范分支固定视角建模物体运动，目标分支通过跨视角注意力迁移运动，实现相机-物体独立控制",
          "运动因果建模：主动/被动运动分解+随机丢弃训练策略，学习动作-结果关系而非简单轨迹跟随",
          "轻量输入支持：仅需首帧2D轨迹和相机姿态，无需未来帧跟踪或3D深度信息"
        ],
        href: "https://arxiv.org/abs/2604.07348",
        paperLink: "MoRight: Motion Control Done Right",
      },
      {
        num: 2,
        tag: "3D全身Avatar生成",
        title: "GenLCA：基于野外视频的3D扩散全身Avatar生成",
        description: "GenLCA 是首个从百万级部分观测的野外视频训练3D扩散模型的方法，解决了3D人体生成领域数据规模受限的问题。核心思路是将预训练的前馈Avatar重建模型LCA用作可动画3D tokenizer，将非结构化视频帧编码为结构化3D token（8192个token，每个对应模板人体网格上的一个查询点，解码为8个3D高斯）。针对野外视频部分观测导致的token模糊/透明问题，提出可见性感知训练策略：基于输入帧计算每个token的可见性掩码，将不可见区域替换为可学习占位特征，并仅在有效区域计算损失。模型采用流匹配目标在压缩后的潜在空间（8192×8维）训练，支持文本、涂鸦、身体部位图像三种条件模态。数据集包含111.3万野外视频身份+0.4万采集数据，总计111.7万身份。在文本到3D生成任务上，GenLCA在语义对齐（BLIP-VQA 0.64）、视觉质量（HyperIQA 0.55）和用户偏好（4.56/5）上均显著优于TADA、HumanGaussian、DreamWaltz-G、TeRA和SIGMAN等SOTA方法。推理时间仅需12秒，与TeRA相当。",
        keyPoints: [
          "重建模型即tokenizer：利用预训练LCA将视频帧编码为3D高斯token，实现从2D到3D的规模化数据转换",
          "可见性感知训练：可见性掩码+可学习占位特征+掩码损失，处理部分观测数据中的无效区域",
          "双流MMDiT架构：基于Hunyuan的MMDiT块，潜在特征和条件token分别处理后再联合注意力"
        ],
        href: "https://arxiv.org/abs/2604.07273",
        paperLink: "GenLCA: 3D Diffusion for Full-Body Avatars from In-the-Wild Videos",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "INSPATIO-WORLD：通过时空自回归建模的实时4D世界模拟器",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.07209",
        description: "STAR架构从单参考视频恢复和生成高保真动态交互场景，隐式时空缓存机制对长时程舞蹈视频生成有参考价值。",
      },
      {
        num: 4,
        title: "Sol-RL：通过高效Rollout扩展的扩散强化学习",
        tag: "高效训练",
        href: "https://arxiv.org/abs/2604.06916",
        description: "FP4赋能的两阶段RL框架，加速文本到图像扩散模型与人类偏好的对齐，训练收敛速度提升4.64倍。",
      },
      {
        num: 5,
        title: "FlowInOne：将多模态生成统一为图像进图像出的流匹配",
        tag: "统一生成",
        href: "https://arxiv.org/abs/2604.06757",
        description: "将所有输入转换为视觉提示，实现单一流匹配模型驱动的干净图像进图像出流程。",
      },
      {
        num: 6,
        title: "Action Images：通过多视角视频生成进行端到端策略学习",
        tag: "动作表示",
        href: "https://arxiv.org/abs/2604.06168",
        description: "将7自由度机器人动作转换为基于2D像素的可解释动作图像，对音频驱动的舞蹈动作编码有启发。",
      },
      {
        num: 7,
        title: "基于物理的接触丰富交互角色运动追踪",
        tag: "物理驱动",
        href: "https://arxiv.org/abs/2604.07984",
        description: "渐进神经网络(PNN)实现物理驱动的运动合成，对接触丰富的舞蹈动作真实感生成有参考价值。",
      },
    ],
    observation: "今日论文揭示了视频生成领域的两个重要趋势：一是运动控制的解耦与因果推理正在成为精细化生成的关键，MoRight的双分支架构和主动/被动运动分解为music-to-dance中的音乐节拍-动作解耦提供了可借鉴的技术路径；二是3D生成正在从合成数据和小规模采集数据向大规模野外视频扩展，GenLCA的可见性感知训练策略证明了从部分观测数据学习完整3D表示的可行性。对于music-to-dance任务，建议关注如何将MoRight的跨视角注意力机制应用于相机视角与舞蹈动作的独立控制，以及GenLCA的tokenizer方法是否可以用于从舞蹈视频构建大规模3D动作数据集。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-10 | Disentangled Motion Control and 3D Full-Body Avatar Generation",
    overview: [
      "MoRight proposes a dual-branch motion modeling framework for disentangled camera-object motion control, supporting forward and inverse motion causality reasoning",
      "GenLCA is the first to train 3D diffusion models from million-scale in-the-wild videos, using visibility-aware training to handle partial observations",
      "MegaStyle constructs a 1.4M-scale style dataset through consistent text-to-image style mapping, achieving generalizable style transfer via style-supervised contrastive learning"
    ],
    papers: [
      {
        num: 1,
        tag: "Motion Control & Causal Reasoning",
        title: "MoRight: Motion Control Done Right",
        description: "MoRight addresses two key limitations of existing motion-controlled video generation: entangled camera and object motion, and lack of motion causality reasoning. The core innovation is a dual-branch motion modeling framework: a canonical branch models object motion under a fixed viewpoint, while a target branch transfers motion from canonical space to arbitrary camera poses via temporal cross-view attention, achieving disentangled camera-object control. Motion causality modeling decomposes motion into active (user-driven) and passive (consequence) components, randomly dropping one during training to force the model to learn action-result relationships. At inference, it supports forward reasoning (predicting scene evolution from active motion) and inverse reasoning (recovering driving actions from passive results). Implementation is based on Wan2.1-14B DiT with dual-stream joint denoising and cross-view information exchange in self-attention layers. Camera conditions are encoded by warping the first frame using depth estimates and camera poses; motion conditions are encoded via trajectory maps. On DynPose-100K and Cooking benchmarks, MoRight achieves comparable motion control accuracy to baselines using full 3D trajectories while only using first-frame reprojected trajectories (no future-frame privileged information), reaching 0.76 on Physical Commonsense (PC) metrics vs. 0.73 for WanMove.",
        keyPoints: [
          "Dual-branch disentangled architecture: Canonical branch models object motion under fixed viewpoint, target branch transfers motion via cross-view attention, enabling independent camera-object control",
          "Motion causality modeling: Active/passive motion decomposition + random dropout training strategy, learning action-result relationships rather than simple trajectory following",
          "Lightweight input support: Only requires first-frame 2D trajectories and camera poses, no future-frame tracking or 3D depth information needed"
        ],
        href: "https://arxiv.org/abs/2604.07348",
        paperLink: "MoRight: Motion Control Done Right",
      },
      {
        num: 2,
        tag: "3D Full-Body Avatar Generation",
        title: "GenLCA: 3D Diffusion for Full-Body Avatars from In-the-Wild Videos",
        description: "GenLCA is the first method to train 3D diffusion models from million-scale partially observed in-the-wild videos, addressing the data scale limitation in 3D human generation. The core idea uses a pretrained feedforward Avatar reconstruction model LCA as an animatable 3D tokenizer, encoding unstructured video frames into structured 3D tokens (8192 tokens, each corresponding to a query point on a template body mesh, decoded to 8 3D Gaussians). To handle token blurring/transparent artifacts caused by partial observations in wild videos, a visibility-aware training strategy is proposed: computing visibility masks based on input frames, replacing invisible regions with learnable placeholder features, and computing loss only over valid regions. The model is trained with flow matching objectives in compressed latent space (8192×8 dimensions), supporting three conditional modalities: text, scribbles, and body part images. The dataset contains 1.113M wild video identities + 4K captured data, totaling 1.117M identities. On text-to-3D generation, GenLCA significantly outperforms TADA, HumanGaussian, DreamWaltz-G, TeRA, and SIGMAN in semantic alignment (BLIP-VQA 0.64), visual quality (HyperIQA 0.55), and user preference (4.56/5). Inference time is only 12 seconds, comparable to TeRA.",
        keyPoints: [
          "Reconstruction model as tokenizer: Using pretrained LCA to encode video frames into 3D Gaussian tokens, enabling scalable 2D-to-3D data conversion",
          "Visibility-aware training: Visibility masks + learnable placeholder features + masked loss, handling invalid regions in partially observed data",
          "Dual-stream MMDiT architecture: Based on Hunyuan's MMDiT blocks, with latent features and conditional tokens processed separately before joint attention"
        ],
        href: "https://arxiv.org/abs/2604.07273",
        paperLink: "GenLCA: 3D Diffusion for Full-Body Avatars from In-the-Wild Videos",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "INSPATIO-WORLD: A Real-Time 4D World Simulator via Spatiotemporal Autoregressive Modeling",
        tag: "World Models",
        href: "https://arxiv.org/abs/2604.07209",
        description: "STAR architecture recovers and generates high-fidelity dynamic interactive scenes from single reference videos; implicit spatiotemporal caching mechanism provides reference value for long-horizon dance video generation.",
      },
      {
        num: 4,
        title: "Sol-RL: Diffusion Reinforcement Learning via Efficient Rollout Scaling",
        tag: "Efficient Training",
        href: "https://arxiv.org/abs/2604.06916",
        description: "FP4-empowered two-stage RL framework accelerates alignment of text-to-image diffusion models with human preferences, improving training convergence by 4.64x.",
      },
      {
        num: 5,
        title: "FlowInOne: Unifying Multimodal Generation as Image-in, Image-out Flow Matching",
        tag: "Unified Generation",
        href: "https://arxiv.org/abs/2604.06757",
        description: "Converts all inputs into visual prompts, achieving a clean image-in, image-out pipeline driven by a single flow matching model.",
      },
      {
        num: 6,
        title: "Action Images: End-to-End Policy Learning via Multiview Video Generation",
        tag: "Action Representation",
        href: "https://arxiv.org/abs/2604.06168",
        description: "Translates 7-DoF robot actions into interpretable action images grounded in 2D pixels, providing inspiration for audio-driven dance motion encoding.",
      },
      {
        num: 7,
        title: "Physics-Based Motion Tracking of Contact-Rich Interacting Characters",
        tag: "Physics-Driven",
        href: "https://arxiv.org/abs/2604.07984",
        description: "Progressive neural network (PNN) for physics-based motion synthesis, providing reference value for realistic generation of contact-rich dance movements.",
      },
    ],
    observation: "Today's papers reveal two important trends in video generation: First, disentangled motion control and causal reasoning are becoming key to fine-grained generation, with MoRight's dual-branch architecture and active/passive motion decomposition providing a transferable technical path for music beat-action disentanglement in music-to-dance tasks. Second, 3D generation is expanding from synthetic data and small-scale captured data to large-scale in-the-wild videos, with GenLCA's visibility-aware training strategy demonstrating the feasibility of learning complete 3D representations from partial observations. For music-to-dance tasks, future work should explore applying MoRight's cross-view attention mechanism to independent control of camera viewpoints and dance movements, and whether GenLCA's tokenizer approach can be used to build large-scale 3D motion datasets from dance videos.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-10`,
        'en': `/en/daily/music-to-dance/2026-04-10`,
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
      date="2026-04-10"
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
