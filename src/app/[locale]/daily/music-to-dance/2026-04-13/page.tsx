import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-13 | 实时角色表演生成与跨模态情感迁移",
    overview: [
      "LPM 1.0 提出首个视频生成式角色表演模型，通过17B参数DiT实现高表现力、实时推理和长时程身份稳定的统一",
      "C-MET 首次建模语音与面部表情的跨模态情感语义向量，实现未见扩展情感的生成",
      "MegaStyle 构建140万规模风格数据集，通过风格监督对比学习实现可泛化的风格迁移"
    ],
    papers: [
      {
        num: 1,
        tag: "音频驱动角色生成",
        title: "LPM 1.0：基于视频的角色表演模型",
        description: "LPM 1.0 是首个面向单人多工音频-视觉对话表演的完整框架，解决了现有视频模型面临的「表演三难困境」（表现力、实时推理、长时程身份稳定无法兼得）。核心架构包括：Base LPM（17B参数双向DiT，在1.7万亿多模态token上训练，支持说话/倾听双工模式、文本控制、多参考身份保持）和Online LPM（通过四阶段自回归蒸馏课程将Base LPM转换为因果流式生成器，实现低延迟无限长度交互）。数据构建方面，通过严格过滤、说话-倾听音视频配对、表演理解和身份感知多参考提取，构建了大规模多模态人类中心数据集。关键技术创新包括：交错双音频注入策略（偶数层处理说话音频、奇数层处理倾听音频，各自保持独立KV投影参数）、多粒度身份参考图像（全局外观+多视角身体+表情参考，通过RoPE偏移区分）、以及流式音频编码（3秒窗口含2秒历史+1秒当前，步长1秒）。在LPM-Bench基准上，Base LPM (720P) 相比Kling-Avatar-2和OmniHuman-1.5分别获得64.3%和42.5%的人类偏好率；Online LPM (480P) 相比LiveAvatar和SoulX分别获得82.5%和64.1%的偏好率。",
        keyPoints: [
          "交错双音频注入：说话和倾听音频分别注入偶数/奇数层，形成隐式'说话专用'和'倾听专用'子网络，避免梯度冲突",
          "多粒度身份条件：全局参考+1-4视角身体参考+1-8表情参考，通过RoPE时序偏移区分，支持可变数量参考图像",
          "四阶段蒸馏课程：ODE监督初始化→离线DMD→在线DMD→细化DMD，将双向教师模型转换为2+1步因果学生模型"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
      {
        num: 2,
        tag: "跨模态情感迁移",
        title: "C-MET：面向说话人脸视频情感编辑的跨模态情感迁移",
        description: "C-MET 提出首个显式建模语音与视觉特征空间之间情感语义向量关系的情感编辑方法。现有方法受限于：标签法只能表示离散类别、音频法难以解耦情感与语言内容、图像法需要高质量正面参考且难以获取扩展情感数据。C-MET的核心创新是通过计算两种不同情感嵌入的差值来获得情感语义向量，学习从音频空间预测视觉空间的对应向量。具体实现包括：使用emotion2vec+large作为预训练音频编码器、EDTalk的解耦面部表情编码器作为视觉编码器、1D卷积视觉tokenizer和投影层音频tokenizer、以及多模态token对比学习（双向InfoNCE损失）。Transformer编码器接收参考视觉语义向量、目标语音语义向量和输入视觉嵌入三类token，预测目标视觉语义向量。训练采用MSE重建损失+对比损失+方向损失（鼓励双向向量相反）。在MEAD和CREMA-D上，C-MET相比SOTA方法提升14%情感准确率（55.91% vs 41.99%），且能生成未见扩展情感（如讽刺、魅力）。作为即插即用模块，C-MET可集成到现有解耦网络中，在提升情感准确率的同时减少推理时间。",
        keyPoints: [
          "情感语义向量：通过目标与中性嵌入的差值表示情感，实现连续情感空间的跨模态映射",
          "解耦对比学习：视觉和音频token分别通过1D卷积和投影层编码，双向InfoNCE损失对齐跨模态表示",
          "扩展情感生成：利用丰富连续的音频情感表示，仅使用基础情感数据集即可合成未见扩展情感"
        ],
        href: "https://arxiv.org/abs/2604.07786",
        paperLink: "Cross-Modal Emotion Transfer for Emotion Editing in Talking Face Video",
      },
      {
        num: 3,
        tag: "风格迁移与数据集",
        title: "MegaStyle：通过一致文本到图像风格映射构建多样化可扩展风格数据集",
        description: "MegaStyle 提出首个仅需任务关键词即可生成高质量合成风格数据集的可扩展数据整理流程。核心挑战在于现有风格数据集存在风格内不一致、风格间不平衡、质量参差不齐等问题。MegaStyle通过利用当前大型生成模型的一致文本到图像风格映射能力来解决这些问题——给定风格描述即可生成同风格图像。流程包括：LLM生成问题-答案对和详细T2I提示、Gemini-2.5-Flash-Image生成图像、Gemini-3-Pro进行对齐验证。构建了包含17万风格提示和40万内容提示的多样化平衡提示库，生成140万规模的MegaStyle-1.4M数据集。基于该数据集，提出风格监督对比学习微调风格编码器MegaStyle-Encoder，以及训练基于FLUX的风格迁移模型MegaStyle-FLUX。实验表明，风格内一致性、风格间多样性和高质量对风格数据集至关重要。MegaStyle-Encoder提供可靠的风格相似度度量，MegaStyle-FLUX实现可泛化的风格迁移。",
        keyPoints: [
          "一致风格映射：利用大型T2I模型的风格一致性，通过风格描述生成同风格多样化图像",
          "自动化数据流程：LLM生成提示→T2I生成图像→多模态评判器验证，仅需任务关键词无需人工标注",
          "风格监督对比学习：在MegaStyle-1.4M上微调编码器，学习表达性强、风格特定的表示"
        ],
        href: "https://arxiv.org/abs/2604.08364",
        paperLink: "MegaStyle: Constructing Diverse and Scalable Style Dataset via Consistent Text-to-Image Style Mapping",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "NUMINA：改善文本到视频扩散模型中的数字对齐",
        tag: "可控生成",
        href: "https://arxiv.org/abs/2604.08546",
        description: "无需训练的识别-引导框架，通过选择判别性自注意力和交叉注意力头来推导可计数的潜在布局，在CountBench上提升7.4%计数准确率。",
      },
      {
        num: 5,
        title: "Phantom：通过联合建模视觉和潜在物理动态实现物理注入视频生成",
        tag: "物理感知",
        href: "https://arxiv.org/abs/2604.08503",
        description: "联合预测潜在物理动态和未来视频帧，产生视觉上真实且物理一致的视频序列。",
      },
      {
        num: 6,
        title: "LiVER：基于渲染器代理推理的光照基础视频生成",
        tag: "场景控制",
        href: "https://arxiv.org/abs/2604.07966",
        description: "基于显式3D场景属性（布局、光照、相机参数）的条件视频合成，支持完全可编辑的底层3D场景。",
      },
      {
        num: 7,
        title: "RewardFlow：通过优化奖励目标生成图像",
        tag: "奖励引导",
        href: "https://arxiv.org/abs/2604.08536",
        description: "多奖励Langevin动态统一语义对齐、感知保真、局部定位等目标，引入可微VQA奖励提供细粒度语义监督。",
      },
      {
        num: 8,
        title: "OmniJigsaw：通过模态编排重排序增强全模态推理",
        tag: "音视频预训练",
        href: "https://arxiv.org/abs/2604.08209",
        description: "基于时序重排序代理任务，通过联合模态整合、样本级模态选择和片段级模态掩码策略强制跨模态整合。",
      },
    ],
    observation: "今日论文揭示了音视频生成领域的三个重要趋势：一是实时交互式角色生成正在成为工业级应用的核心能力，LPM 1.0的17B参数DiT架构和四阶段蒸馏课程为music-to-dance任务中的实时舞蹈生成提供了可借鉴的技术路径；二是跨模态情感表示学习正在突破离散标签的限制，C-MET的情感语义向量方法可能帮助改进音乐-舞蹈情感对齐；三是合成数据驱动的风格学习正在兴起，MegaStyle的自动化数据构建策略可用于舞蹈视频的风格迁移。对于music-to-dance任务，建议关注如何将LPM 1.0的双工音频处理机制扩展到音乐节拍条件，以及C-MET的跨模态向量学习方法是否可用于音乐-动作情感迁移。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-13 | Real-time Character Performance Generation and Cross-Modal Emotion Transfer",
    overview: [
      "LPM 1.0 proposes the first video-generative character performance model, unifying high expressiveness, real-time inference, and long-horizon identity stability through a 17B-parameter DiT",
      "C-MET first models cross-modal emotion semantic vectors between speech and facial expressions, enabling generation of unseen extended emotions",
      "MegaStyle constructs a 1.4M-scale style dataset through consistent text-to-image style mapping, achieving generalizable style transfer via style-supervised contrastive learning"
    ],
    papers: [
      {
        num: 1,
        tag: "Audio-Driven Character Generation",
        title: "LPM 1.0: Video-based Character Performance Model",
        description: "LPM 1.0 is the first complete framework for single-person full-duplex audio-visual conversational performance, addressing the 'performance trilemma' where existing video models cannot simultaneously achieve expressiveness, real-time inference, and long-horizon identity stability. The core architecture includes: Base LPM (17B-parameter bidirectional DiT trained on 1.7 trillion multimodal tokens, supporting speaking/listening duplex modes, text control, and multi-reference identity preservation) and Online LPM (converting Base LPM to causal streaming generator through four-stage autoregressive distillation curriculum for low-latency infinite-length interaction). Data construction involves strict filtering, speaking-listening audio-video pairing, performance understanding, and identity-aware multi-reference extraction to build a large-scale multimodal human-centric dataset. Key innovations include: interleaved dual-audio injection (even layers for speaking audio, odd layers for listening audio with separate KV projection parameters), multi-granularity identity reference images (global appearance + multi-view body + expression references distinguished via RoPE offsets), and streaming audio encoding (3-second windows with 2s history + 1s current, 1s stride). On LPM-Bench, Base LPM (720P) achieves 64.3% and 42.5% human preference rates over Kling-Avatar-2 and OmniHuman-1.5; Online LPM (480P) achieves 82.5% and 64.1% over LiveAvatar and SoulX.",
        keyPoints: [
          "Interleaved dual-audio injection: Speaking and listening audio injected into even/odd layers respectively, forming implicit 'speak-tuned' and 'listen-tuned' subnetworks to avoid gradient conflicts",
          "Multi-granularity identity conditioning: Global reference + 1-4 body view references + 1-8 expression references, distinguished via RoPE temporal offsets, supporting variable numbers of reference images",
          "Four-stage distillation curriculum: ODE supervised initialization → offline DMD → on-policy DMD → refinement DMD, converting bidirectional teacher to 2+1 step causal student model"
        ],
        href: "https://arxiv.org/abs/2604.07823",
        paperLink: "LPM 1.0: Video-based Character Performance Model",
      },
      {
        num: 2,
        tag: "Cross-Modal Emotion Transfer",
        title: "C-MET: Cross-Modal Emotion Transfer for Emotion Editing in Talking Face Video",
        description: "C-MET proposes the first approach that explicitly models emotion semantic vector relationships between speech and visual feature spaces for emotion editing. Existing methods are limited by: label-based approaches supporting only discrete categories, audio-based methods struggling to disentangle emotion from linguistic content, and image-based methods requiring high-quality frontal references with difficulty obtaining extended emotion data. C-MET's core innovation computes emotion semantic vectors as differences between two emotional embeddings, learning to predict corresponding vectors from audio to visual space. Implementation includes: emotion2vec+large as pretrained audio encoder, EDTalk's disentangled facial expression encoder as visual encoder, 1D convolution visual tokenizer and projection layer audio tokenizer, and multimodal token contrastive learning (bidirectional InfoNCE loss). The Transformer encoder receives reference visual semantic vectors, target speech semantic vectors, and input visual embeddings as three token types to predict target visual semantic vectors. Training uses MSE reconstruction loss + contrastive loss + direction loss (encouraging bidirectional vectors to be opposite). On MEAD and CREMA-D, C-MET improves emotion accuracy by 14% over SOTA (55.91% vs 41.99%) and can generate unseen extended emotions (e.g., sarcasm, charisma). As a plug-and-play module, C-MET integrates into existing disentanglement networks, improving emotion accuracy while reducing inference time.",
        keyPoints: [
          "Emotion semantic vectors: Representing emotions as differences between target and neutral embeddings, enabling cross-modal mapping in continuous emotion space",
          "Disentangled contrastive learning: Visual and audio tokens encoded via 1D convolution and projection layers respectively, with bidirectional InfoNCE loss aligning cross-modal representations",
          "Extended emotion generation: Leveraging rich continuous audio emotion representations to synthesize unseen extended emotions using only basic emotion datasets"
        ],
        href: "https://arxiv.org/abs/2604.07786",
        paperLink: "Cross-Modal Emotion Transfer for Emotion Editing in Talking Face Video",
      },
      {
        num: 3,
        tag: "Style Transfer & Dataset",
        title: "MegaStyle: Constructing Diverse and Scalable Style Dataset via Consistent Text-to-Image Style Mapping",
        description: "MegaStyle proposes the first scalable data curation pipeline that generates high-quality synthetic style datasets using only task keywords. Core challenges include intra-style inconsistency, inter-style imbalance, and uneven quality in existing style datasets. MegaStyle addresses these by leveraging current large generative models' consistent text-to-image style mapping capability—generating same-style images from style descriptions. The pipeline includes: LLM generation of question-answer pairs and detailed T2I prompts, Gemini-2.5-Flash-Image for image generation, and Gemini-3-Pro for alignment verification. Constructs a diverse balanced prompt gallery with 170K style prompts and 400K content prompts, generating the 1.4M-scale MegaStyle-1.4M dataset. Based on this dataset, proposes style-supervised contrastive learning to fine-tune style encoder MegaStyle-Encoder, and trains FLUX-based style transfer model MegaStyle-FLUX. Experiments demonstrate that intra-style consistency, inter-style diversity, and high quality are crucial for style datasets. MegaStyle-Encoder provides reliable style similarity measurement, and MegaStyle-FLUX achieves generalizable style transfer.",
        keyPoints: [
          "Consistent style mapping: Leveraging large T2I models' style consistency to generate diverse same-style images from style descriptions",
          "Automated data pipeline: LLM generates prompts → T2I generates images → multimodal judge verifies, requiring only task keywords without human annotation",
          "Style-supervised contrastive learning: Fine-tuning encoder on MegaStyle-1.4M to learn expressive, style-specific representations"
        ],
        href: "https://arxiv.org/abs/2604.08364",
        paperLink: "MegaStyle: Constructing Diverse and Scalable Style Dataset via Consistent Text-to-Image Style Mapping",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "NUMINA: Aligning Textual Numerals and Visual Instances in Text-to-Video Diffusion Models",
        tag: "Controllable Generation",
        href: "https://arxiv.org/abs/2604.08546",
        description: "Training-free identify-then-guide framework that selects discriminative self-attention and cross-attention heads to derive countable latent layouts, improving counting accuracy by 7.4% on CountBench.",
      },
      {
        num: 5,
        title: "Phantom: Physics-Infused Video Generation via Joint Modeling of Visual and Latent Physical Dynamics",
        tag: "Physics-Aware",
        href: "https://arxiv.org/abs/2604.08503",
        description: "Jointly predicts latent physical dynamics and future video frames to produce visually realistic and physically consistent video sequences.",
      },
      {
        num: 6,
        title: "LiVER: Lighting-grounded Video Generation with Renderer-based Agent Reasoning",
        tag: "Scene Control",
        href: "https://arxiv.org/abs/2604.07966",
        description: "Video synthesis conditioned on explicit 3D scene properties (layout, lighting, camera parameters), supporting fully editable underlying 3D scenes.",
      },
      {
        num: 7,
        title: "RewardFlow: Generate Images by Optimizing What You Reward",
        tag: "Reward-Guided",
        href: "https://arxiv.org/abs/2604.08536",
        description: "Multi-reward Langevin dynamics unifying semantic alignment, perceptual fidelity, localized grounding objectives, introducing differentiable VQA reward for fine-grained semantic supervision.",
      },
      {
        num: 8,
        title: "OmniJigsaw: Enhancing Omni-Modal Reasoning via Modality-Orchestrated Reordering",
        tag: "Audio-Visual Pretraining",
        href: "https://arxiv.org/abs/2604.08209",
        description: "Temporal reordering proxy task with joint modality integration, sample-level modality selection, and clip-level modality masking strategies to force cross-modal integration.",
      },
    ],
    observation: "Today's papers reveal three important trends in audio-visual generation: First, real-time interactive character generation is becoming a core capability for industrial applications, with LPM 1.0's 17B-parameter DiT architecture and four-stage distillation curriculum providing a transferable technical path for real-time dance generation in music-to-dance tasks. Second, cross-modal emotion representation learning is breaking through the limitations of discrete labels, and C-MET's emotion semantic vector approach may help improve music-dance emotional alignment. Third, synthetic data-driven style learning is emerging, with MegaStyle's automated data construction strategy applicable to style transfer in dance videos. For music-to-dance tasks, future work should explore extending LPM 1.0's duplex audio processing mechanism to music beat conditions, and whether C-MET's cross-modal vector learning approach can be applied to music-motion emotion transfer.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-13`,
        'en': `/en/daily/music-to-dance/2026-04-13`,
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
      date="2026-04-13"
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
