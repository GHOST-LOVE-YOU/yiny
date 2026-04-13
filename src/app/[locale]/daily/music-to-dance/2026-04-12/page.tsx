import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-12 | 音频驱动视频生成的身份保持与实时推理新突破",
    overview: [
      "LPM 1.0 提出17B参数DiT架构，通过交错式双音频注入策略同时建模说话与倾听行为，实现实时流式生成与长时身份一致性",
      "C-MET 开创跨模态情感迁移方法，学习音频-视觉情感语义向量映射，可生成训练时未见过的扩展情感",
      "MegaStyle 构建140万规模风格数据集，提出风格监督对比学习实现高质量风格迁移"
    ],
    papers: [
      {
        num: 1,
        tag: "音频驱动视频生成",
        title: "LPM 1.0：实时对话角色表演的17B参数DiT模型",
        description: "LPM 1.0 是首个针对单角色全双工对话表演的视频生成系统，直接解决 music-to-dance 任务面临的三大核心挑战：表现力、实时推理和长时稳定性。其17B参数DiT架构采用交错式双音频注入策略——偶数层处理说话音频（驱动唇同步和高频面部运动），奇数层处理倾听音频（触发点头、眼神接触等低频反应），这种设计与音乐-舞蹈任务中节拍驱动高频动作、旋律驱动低频表情的需求高度同构。身份保持方面，LPM 提出多粒度参考图像机制：全局外观参考、多视角身体参考（通过GVHMR估计SMPL朝向分类为正面/背面/左右侧视）和1-8种表情参考，通过3D RoPE位置编码区分参考类型，实现无需额外参数的隐式身份条件。Base LPM支持约10分钟视频生成，Online LPM通过骨干-精炼器蒸馏架构实现因果流式生成，在H100上达到实时推理速度。",
        keyPoints: [
          "交错式双音频注入：偶数层说话音频（唇同步、高频运动），奇数层倾听音频（反应、低频运动），降低50%音频交叉注意力参数量",
          "多粒度身份参考：全局外观+多视角身体（GVHMR估计4类视角）+表情参考（1-8种），通过RoPE偏移量区分类型",
          "四阶段自回归蒸馏：Base LPM（双向17B）→ Online LPM（因果流式），支持无限长实时交互"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
      {
        num: 2,
        tag: "跨模态情感迁移",
        title: "C-MET：跨模态情感迁移实现扩展情感生成",
        description: "C-MET 提出首个跨模态情感迁移方法，解决情感说话脸生成中标签法表达能力受限、音频法情感与内容纠缠、图像法需要高质量正面参考的难题。其核心创新是建模音频空间与视觉特征空间之间的情感语义向量映射：给定输入情感i和目标情感j，计算音频语义向量 f_a^{i→j} = f_a^j - f_a^i 和视觉语义向量 f_v^{i→j} = f_v^j - f_v^i，通过Transformer编码器从音频向量预测视觉向量。该方法利用大规模自监督语音模型emotion2vec+large和EDTalk解耦表情编码器，通过对比学习对齐多模态token空间。关键优势在于可以生成训练时未见过的扩展情感（如讽刺、魅力、共情），只需从情感语音中提取语义向量即可驱动生成，无需对应视频数据。在MEAD和CREMA-D数据集上，情感准确率比SOTA提升14%，且能 plug-and-play 集成到现有解耦框架。",
        keyPoints: [
          "情感语义向量：跨模态向量差值表示情感转换，f^{i→j} = f^j - f^i，支持双向和零样本扩展情感",
          "多模态token对比学习：视觉tokenizer(1D卷积)+音频tokenizer(投影层)，双向对比损失对齐空间",
          "即插即用模块：轻量级Transformer编码器预测视觉语义向量，可替换原有表情编码器，降低推理时间"
        ],
        href: "https://arxiv.org/abs/2604.07786",
        paperLink: "Cross-Modal Emotion Transfer for Emotion Editing in Talking Face Video",
      },
      {
        num: 3,
        tag: "风格迁移与身份保持",
        title: "MegaStyle：大规模风格数据集构建与风格监督对比学习",
        description: "MegaStyle 针对风格迁移中风格-内容难以解耦、现有数据集风格一致性差的问题，提出基于大规模文生图模型的一致风格映射能力构建数据集。其数据构建流程：从JourneyDB/WikiArt/LAION收集200万图像，使用Qwen3-VL生成17万风格提示和40万内容提示，通过分层k-means平衡采样，最终用Qwen-Image生成140万风格图像对（MegaStyle-1.4M）。基于该数据集，提出风格监督对比学习（SSCL）微调SigLIP图像编码器得到MegaStyle-Encoder，使用8192大batch size和图像-文本对比损失正则化，实现可靠的风格相似度度量。同时训练FLUX-based风格迁移模型MegaStyle-FLUX，采用配对监督（同一风格不同内容）和偏移RoPE防止位置冲突。实验表明，该方法在风格相似度测量和可泛化风格迁移上达到SOTA。",
        keyPoints: [
          "一致T2I风格映射：利用Qwen-Image从风格提示生成一致风格、不同内容的图像对，解决风格对收集难题",
          "风格监督对比学习：L_sscl = L_scl + L_itc，大batch(8192)提供更多负样本，学习判别性风格表示",
          "FLUX风格迁移：参考风格图像编码为视觉token，与噪声图像token、文本token拼接输入MM-DiT"
        ],
        href: "https://arxiv.org/abs/2604.08364",
        paperLink: "MegaStyle: Constructing Diverse and Scalable Style Dataset via Consistent Text-to-Image Style Mapping",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "NUMINA：文本到视频扩散模型的数值对齐优化",
        tag: "视频生成控制",
        href: "https://arxiv.org/abs/2604.08546",
        description: "提出无需训练的identify-then-guide框架，通过选择判别性自注意力和交叉注意力头推导可计数潜在布局，调制交叉注意力引导重生成。在Wan2.1上计数准确率提升7.4%，同时改善CLIP对齐和时序一致性。",
      },
      {
        num: 5,
        title: "Phantom：物理感知视频生成",
        tag: "物理一致性",
        href: "https://arxiv.org/abs/2604.08503",
        description: "联合建模视觉内容和潜在物理动态，从观测帧和推断物理状态条件出发，同时预测物理动态和生成未来帧。物理感知视频表示作为隐式嵌入，无需显式指定复杂物理规则即可生成物理一致的视频。",
      },
      {
        num: 6,
        title: "LiVER：基于渲染器的场景可控视频生成",
        tag: "3D场景控制",
        href: "https://arxiv.org/abs/2604.07966",
        description: "将视频合成条件于显式3D场景属性（布局、光照、相机参数），从统一3D表示渲染控制信号，解耦这些属性。支持图像到视频和视频到视频合成，底层3D场景完全可编辑。",
      },
      {
        num: 7,
        title: "RewardFlow：多奖励引导的图像生成",
        tag: "推理时优化",
        href: "https://arxiv.org/abs/2604.08536",
        description: "无需反演的推理时引导框架，通过多奖励Langevin动态统一语义对齐、感知保真、局部定位、对象一致性和人类偏好等可微奖励。提出提示感知的自适应策略，动态调节奖励权重和步长。",
      },
      {
        num: 8,
        title: "OmniJigsaw：模态编排重排增强全模态推理",
        tag: "音视频预训练",
        href: "https://arxiv.org/abs/2604.08209",
        description: "基于时序重排代理任务的自监督框架，通过联合模态整合、样本级模态选择和片段级模态掩码三种策略编排视听信号。发现联合模态整合中的双模态捷径现象，细粒度片段级掩码可缓解该问题。",
      },
    ],
    observation: "今日论文呈现出音频-视觉生成领域的三个重要趋势：一是从单向驱动（仅说话/仅舞蹈）向全双工交互演进，LPM 1.0的说话-倾听交错注入机制为音乐-舞蹈任务中的音乐理解+动作生成提供了新思路；二是跨模态语义向量学习成为连接异构模态的有效桥梁，C-MET的情感语义向量方法可扩展至音乐-舞蹈中的节拍-动作语义映射；三是多参考条件逐渐成为长时身份保持的标准方案，MegaStyle的风格一致性与LPM的多视角参考都验证了「多示例+位置编码」的有效性。对于music-to-dance任务，建议关注如何将LPM的流式生成能力迁移到实时舞蹈生成场景，以及C-MET的跨模态向量方法是否可用于学习音乐节拍到舞蹈风格的映射。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-12 | Breakthroughs in Identity Preservation and Real-Time Inference for Audio-Driven Video Generation",
    overview: [
      "LPM 1.0 proposes a 17B-parameter DiT architecture with interleaved dual-audio injection, modeling both speaking and listening behaviors for real-time streaming generation with long-term identity consistency",
      "C-MET pioneers cross-modal emotion transfer by learning audio-visual emotion semantic vector mappings, enabling generation of extended emotions unseen during training",
      "MegaStyle constructs a 1.4M-scale style dataset and proposes style-supervised contrastive learning for high-quality style transfer"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Driven Video Generation",
        title: "LPM 1.0: A 17B-Parameter DiT Model for Real-Time Conversational Character Performance",
        description: "LPM 1.0 is the first video-generative system for single-person full-duplex conversational performance, directly addressing three core challenges in music-to-dance tasks: expressiveness, real-time inference, and long-term stability. Its 17B-parameter DiT architecture employs an interleaved dual-audio injection strategy— even layers process speaking audio (driving lip-sync and high-frequency facial motion) while odd layers process listening audio (triggering nodding, eye contact, and other low-frequency responses). This design is highly isomorphic to music-dance tasks where beats drive high-frequency movements and melody drives low-frequency expressions. For identity preservation, LPM proposes a multi-granularity reference image mechanism: global appearance reference, multi-view body references (classified into front/rear/left-profile/right-profile via GVHMR-based SMPL orientation estimation), and 1-8 expression references, distinguished through 3D RoPE positional encoding for implicit identity conditioning without additional parameters. Base LPM supports ~10 minute video generation, while Online LPM achieves causal streaming generation through a backbone-refiner distillation architecture at real-time speed on H100.",
        keyPoints: [
          "Interleaved dual-audio injection: even layers for speaking (lip-sync, high-frequency motion), odd layers for listening (reactions, low-frequency motion), reducing audio cross-attention params by 50%",
          "Multi-granularity identity references: global appearance + multi-view body (4 viewpoint classes via GVHMR) + expression refs (1-8 types), distinguished via RoPE offsets",
          "Four-stage autoregressive distillation: Base LPM (bidirectional 17B) → Online LPM (causal streaming), supporting infinite-length real-time interaction"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
      {
        num: 2,
        tag: "Cross-Modal Emotion Transfer",
        title: "C-MET: Cross-Modal Emotion Transfer for Extended Emotion Generation",
        description: "C-MET proposes the first cross-modal emotion transfer method, addressing limitations of label-based methods (limited expressiveness), audio-based methods (emotion-content entanglement), and image-based methods (requiring high-quality frontal references). The core innovation is modeling emotion semantic vector mappings between audio and visual feature spaces: given input emotion i and target emotion j, compute audio semantic vector f_a^{i→j} = f_a^j - f_a^i and visual semantic vector f_v^{i→j} = f_v^j - f_v^i, then predict visual vectors from audio vectors via a Transformer encoder. The method leverages the large-scale self-supervised speech model emotion2vec+large and EDTalk's disentangled expression encoder, aligning multimodal token spaces through contrastive learning. A key advantage is the ability to generate extended emotions unseen during training (e.g., sarcasm, charisma, empathy) by extracting semantic vectors from emotional speech alone, without corresponding video data. On MEAD and CREMA-D datasets, emotion accuracy improves by 14% over SOTA, and the module can be plug-and-play integrated into existing disentanglement frameworks.",
        keyPoints: [
          "Emotion semantic vectors: cross-modal vector differences represent emotion transitions, f^{i→j} = f^j - f^i, supporting bidirectional and zero-shot extended emotions",
          "Multimodal token contrastive learning: visual tokenizer (1D conv) + audio tokenizer (projection), bidirectional contrastive loss for space alignment",
          "Plug-and-play module: lightweight Transformer encoder predicts visual semantic vectors, replaceable with original expression encoder, reducing inference time"
        ],
        href: "https://arxiv.org/abs/2604.07786",
        paperLink: "Cross-Modal Emotion Transfer for Emotion Editing in Talking Face Video",
      },
      {
        num: 3,
        tag: "Style Transfer & Identity Preservation",
        title: "MegaStyle: Large-Scale Style Dataset Construction with Style-Supervised Contrastive Learning",
        description: "MegaStyle addresses the difficulty of disentangling style from content and the poor style consistency in existing datasets by leveraging large-scale text-to-image models' consistent style mapping capabilities. The data curation pipeline: collect 2M images from JourneyDB/WikiArt/LAION, use Qwen3-VL to generate 170K style prompts and 400K content prompts, apply hierarchical k-means balanced sampling, and finally use Qwen-Image to generate 1.4M style image pairs (MegaStyle-1.4M). Based on this dataset, style-supervised contrastive learning (SSCL) is proposed to fine-tune a SigLIP image encoder into MegaStyle-Encoder, using 8192 large batch size and image-text contrastive loss regularization for reliable style similarity measurement. Simultaneously, a FLUX-based style transfer model MegaStyle-FLUX is trained with paired supervision (same style, different content) and shifted RoPE to prevent positional conflicts. Experiments demonstrate SOTA performance in style similarity measurement and generalizable style transfer.",
        keyPoints: [
          "Consistent T2I style mapping: use Qwen-Image to generate image pairs with consistent style but different content from style prompts, solving style pair collection challenges",
          "Style-supervised contrastive learning: L_sscl = L_scl + L_itc, large batch (8192) provides more negatives, learning discriminative style representations",
          "FLUX style transfer: encode reference style images as visual tokens, concatenate with noisy image tokens and text tokens for MM-DiT input"
        ],
        href: "https://arxiv.org/abs/2604.08364",
        paperLink: "MegaStyle: Constructing Diverse and Scalable Style Dataset via Consistent Text-to-Image Style Mapping",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "NUMINA: Numerical Alignment for Text-to-Video Diffusion Models",
        tag: "Video Generation Control",
        href: "https://arxiv.org/abs/2604.08546",
        description: "Proposes a training-free identify-then-guide framework that selects discriminative self- and cross-attention heads to derive a countable latent layout, then modulates cross-attention to guide regeneration. Improves counting accuracy by 7.4% on Wan2.1 while improving CLIP alignment and temporal consistency.",
      },
      {
        num: 5,
        title: "Phantom: Physics-Infused Video Generation",
        tag: "Physical Consistency",
        href: "https://arxiv.org/abs/2604.08503",
        description: "Jointly models visual content and latent physical dynamics, conditioned on observed frames and inferred physical states, simultaneously predicting physical dynamics and generating future frames. Physics-aware video representation as implicit embedding enables physically consistent video without explicit physical rules.",
      },
      {
        num: 6,
        title: "LiVER: Renderer-based Scene-Controllable Video Generation",
        tag: "3D Scene Control",
        href: "https://arxiv.org/abs/2604.07966",
        description: "Conditions video synthesis on explicit 3D scene properties (layout, lighting, camera parameters), rendering control signals from unified 3D representation to disentangle these properties. Supports image-to-video and video-to-video with fully editable underlying 3D scenes.",
      },
      {
        num: 7,
        title: "RewardFlow: Multi-Reward Guided Image Generation",
        tag: "Inference-Time Optimization",
        href: "https://arxiv.org/abs/2604.08536",
        description: "Inversion-free inference-time guidance framework unifying semantic alignment, perceptual fidelity, localized grounding, object consistency, and human preference via multi-reward Langevin dynamics. Proposes prompt-aware adaptive policy for dynamic reward weight and step size adjustment.",
      },
      {
        num: 8,
        title: "OmniJigsaw: Modality-Orchestrated Reordering for Omni-Modal Reasoning",
        tag: "Audio-Video Pretraining",
        href: "https://arxiv.org/abs/2604.08209",
        description: "Self-supervised framework based on temporal reordering proxy task, orchestrating audio-visual signals through joint modality integration, sample-level modality selection, and clip-level modality masking. Discovers bi-modal shortcut phenomenon in joint integration, mitigated by fine-grained clip-level masking.",
      },
    ],
    observation: "Today's papers reveal three important trends in audio-visual generation: (1) evolution from unidirectional driving (speaking-only/dance-only) to full-duplex interaction, with LPM 1.0's speaking-listening interleaved injection offering new insights for music understanding + motion generation in music-to-dance tasks; (2) cross-modal semantic vector learning emerging as an effective bridge between heterogeneous modalities, with C-MET's emotion semantic vector method potentially extensible to beat-motion semantic mapping in music-dance; (3) multi-reference conditioning gradually becoming the standard for long-term identity preservation, with both MegaStyle's style consistency and LPM's multi-view references validating the effectiveness of 'multiple examples + positional encoding'. For music-to-dance tasks, future work should explore adapting LPM's streaming generation to real-time dance scenarios and whether C-MET's cross-modal vector approach can learn mappings from music beats to dance styles.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-12`,
        'en': `/en/daily/music-to-dance/2026-04-12`,
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
      date="2026-04-12"
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