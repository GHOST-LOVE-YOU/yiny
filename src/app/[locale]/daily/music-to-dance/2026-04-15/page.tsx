import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "2026-04-15 | 多模态人-物交互视频生成与高效运动嵌入学习",
    overview: [
      "OmniShow 提出首个端到端人-物交互视频生成框架，统一处理文本、参考图像、音频和姿态四种条件，实现工业级多模态控制能力",
      "Gated Local-Context Attention 机制通过音频上下文打包和掩码注意力实现精确的音视频同步",
      "ZipMo 提出64x时间压缩的长期运动嵌入空间，使运动生成效率比视频模型提升超过10000倍"
    ],
    papers: [
      {
        num: 1,
        tag: "多模态视频生成",
        title: "OmniShow：统一多模态条件的人-物交互视频生成",
        description: "OmniShow 是首个针对人-物交互视频生成（HOIVG）的端到端框架，能够同时处理文本、参考图像、音频和姿态四种条件。该框架针对 music-to-dance 任务的核心痛点——多模态条件的高效融合与精确控制——提出了三项关键创新。首先，Unified Channel-wise Conditioning 通过在时间维度上扩展「伪帧token」，将姿态视频和参考图像通过统一的通道拼接策略注入，同时引入参考重建损失保持语义细节，这种方法最大程度保留了基础模型的预训练先验。其次，Gated Local-Context Attention 采用音频上下文打包策略（窗口大小w=5，步长s=4），通过掩码注意力机制限制视频token仅与对应音频段交互，配合可学习的门控向量稳定早期训练，实现精确的音视频同步。第三，Decoupled-Then-Joint Training 策略先分别训练R2V和A2V专用模型，再通过权重插值（0.6/0.4）融合，最后引入姿态进行微调，有效解决了HOIVG数据稀缺问题。",
        keyPoints: [
          "统一通道条件注入：姿态token与噪声视频token拼接，图像token与伪帧token拼接，保持原生输入结构以最小化适应差距",
          "门控局部上下文注意力：滑动窗口聚合音频上下文，掩码注意力实现帧级对齐，可学习门控向量显式指示音频影响幅度",
          "解耦-联合训练策略：先训练专用模型掌握各自模态，再融合实现RA2V能力涌现，最后引入姿态防止过度依赖强信号"
        ],
        href: "https://arxiv.org/abs/2604.11804",
        paperLink: "OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation",
      },
      {
        num: 2,
        tag: "运动生成与压缩",
        title: "ZipMo：长期运动嵌入实现高效运动学生成",
        description: "ZipMo 提出了一种全新的运动表示学习方法，通过64x时间压缩的长期运动嵌入空间，将运动生成效率提升超过10000倍。与视频模型需要逐帧合成外观和运动不同，该方法直接在紧凑的运动潜在空间中操作，学习从稀疏轨迹到密集运动场的映射。第一阶段训练VAE将跟踪器得到的稀疏轨迹编码为16×16×D的潜在网格，使用3D RoPE编码时间和起始位置信息，通过掩码自编码器设计支持任意空间位置的查询。第二阶段在该运动空间中训练条件流匹配模型，支持文本提示或空间poke（指定起止位置）作为条件生成运动latent。实验表明，强时间压缩（64x）不仅提升了训练和推理效率，还改善了运动生成质量——这是因为压缩迫使模型学习更语义化的表示，kNN检索准确率随压缩率增加而单调提升。在LIBERO机器人任务上，该方法的动作预测成功率达到77.5%-80.3%，显著优于ATM（60.4%）和Tra-MoE（61.4%）。",
        keyPoints: [
          "64x时间压缩运动嵌入：将轨迹压缩为16×16潜在网格，相比视频模型的4x-8x压缩实现数量级效率提升",
          "密集运动解码：VAE解码器支持任意空间位置查询，从稀疏轨迹输入生成全局一致的运动场",
          "条件流匹配生成：在运动潜在空间中训练流匹配模型，支持文本和poke两种条件模式进行目标导向运动规划"
        ],
        href: "https://arxiv.org/abs/2604.11737",
        paperLink: "Learning Long-term Motion Embeddings for Efficient Kinematics Generation",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "Audio Flamingo Next：下一代开放音频-语言模型",
        tag: "音频理解",
        href: "https://arxiv.org/abs/2604.10905",
        description: "支持30分钟长音频输入，提出Temporal Audio Chain-of-Thought范式实现推理步骤与时序戳显式对齐，可应用于音乐节拍到舞蹈动作的细粒度时序对齐。",
      },
      {
        num: 4,
        title: "OmniScript：面向长形式电影视频的视听脚本生成",
        tag: "时序理解",
        href: "https://arxiv.org/abs/2604.11102",
        description: "提出视频到脚本（V2S）新任务，8B参数全模态模型通过时序分段奖励的强化学习训练，其时序感知分层评估框架可借鉴用于舞蹈动作序列评估。",
      },
      {
        num: 5,
        title: "Introspective Diffusion Language Models",
        tag: "扩散模型",
        href: "https://arxiv.org/abs/2604.11035",
        description: "提出内省扩散语言模型I-DLM，通过内省步进解码(ISD)算法在并行解码中验证已生成token，其内省一致性机制可应用于舞蹈视频生成的帧间一致性提升。",
      },
      {
        num: 6,
        title: "Continuous Adversarial Flow Models",
        tag: "生成模型",
        href: "https://arxiv.org/abs/2604.11521",
        description: "提出连续对抗流模型，使用学习判别器替代flow matching的固定MSE目标，后训练可将SiT的FID从8.26降至3.63，该方法可提升舞蹈视频扩散模型的生成质量。",
      },
    ],
    observation: "今日论文揭示了视频生成领域的两个重要趋势：一是多模态条件的统一处理正成为工业级应用的标配，OmniShow的通道拼接+门控注意力设计为music-to-dance任务中的音乐-姿态-身份联合控制提供了可迁移的技术路径；二是运动与外观的解耦表示正在兴起，ZipMo的64x压缩运动空间表明，将运动从像素空间中解放出来可以带来数量级的效率提升。对于music-to-dance任务，建议关注如何将OmniShow的多模态注入机制扩展到音乐节拍条件，以及ZipMo的运动嵌入方法是否可用于学习舞蹈动作的紧凑表示，从而实现实时舞蹈生成。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "2026-04-15 | Multimodal Human-Object Interaction Video Generation and Efficient Motion Embedding Learning",
    overview: [
      "OmniShow proposes the first end-to-end framework for Human-Object Interaction Video Generation, unifying text, reference images, audio, and pose conditions to achieve industrial-grade multimodal control",
      "Gated Local-Context Attention mechanism achieves precise audio-visual synchronization through audio context packing and masked attention",
      "ZipMo introduces 64x temporally compressed long-term motion embeddings, improving motion generation efficiency by over 10,000x compared to video models"
    ],
    papers: [
      {
        num: 1,
        tag: "Multimodal Video Generation",
        title: "OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation",
        description: "OmniShow is the first end-to-end framework for Human-Object Interaction Video Generation (HOIVG), capable of simultaneously processing four conditions: text, reference images, audio, and pose. Addressing core challenges in music-to-dance tasks—efficient multimodal fusion and precise control—the framework introduces three key innovations. First, Unified Channel-wise Conditioning expands 'pseudo-frame tokens' along the temporal dimension and injects pose videos and reference images through a unified channel concatenation strategy, while introducing a reference reconstruction loss to preserve semantic details, minimizing adaptation gaps with the base model's pretrained priors. Second, Gated Local-Context Attention employs an audio context packing strategy (window size w=5, stride s=4), restricting video tokens to interact only with corresponding audio segments via masked attention, with learnable gating vectors stabilizing early training and achieving precise audio-visual synchronization. Third, the Decoupled-Then-Joint Training strategy first trains specialized R2V and A2V models, fuses them via weight interpolation (0.6/0.4), and finally introduces pose for fine-tuning, effectively addressing HOIVG data scarcity.",
        keyPoints: [
          "Unified channel-wise conditioning: pose tokens concatenated with noisy video tokens, image tokens with pseudo-frame tokens, preserving native input structure to minimize adaptation gap",
          "Gated local-context attention: sliding window aggregates audio context, masked attention enables frame-level alignment, learnable gating vectors explicitly indicate audio impact magnitude",
          "Decoupled-then-joint training: train specialized models to master respective modalities first, then fuse for emergent RA2V capabilities, finally introduce pose to prevent over-reliance on strong signals"
        ],
        href: "https://arxiv.org/abs/2604.11804",
        paperLink: "OmniShow: Unifying Multimodal Conditions for Human-Object Interaction Video Generation",
      },
      {
        num: 2,
        tag: "Motion Generation & Compression",
        title: "ZipMo: Long-term Motion Embeddings for Efficient Kinematics Generation",
        description: "ZipMo proposes a novel motion representation learning method that achieves over 10,000x efficiency improvement through 64x temporally compressed long-term motion embedding space. Unlike video models that synthesize appearance and motion frame-by-frame, this method operates directly in a compact motion latent space, learning mappings from sparse trajectories to dense motion fields. The first stage trains a VAE to encode tracker-derived sparse trajectories into a 16×16×D latent grid, using 3D RoPE to encode temporal and starting position information, with a masked autoencoder design supporting queries at arbitrary spatial positions. The second stage trains a conditional flow matching model in this motion space, supporting text prompts or spatial pokes (specifying start/end positions) as conditions for generating motion latents. Experiments show that strong temporal compression (64x) not only improves training and inference efficiency but also enhances motion generation quality—compression forces the model to learn more semantic representations, with kNN retrieval accuracy monotonically increasing with compression ratio. On LIBERO robotic tasks, the method achieves 77.5%-80.3% action prediction success rates, significantly outperforming ATM (60.4%) and Tra-MoE (61.4%).",
        keyPoints: [
          "64x temporal compression motion embedding: compressing trajectories into 16×16 latent grid, achieving order-of-magnitude efficiency gains over video models' 4x-8x compression",
          "Dense motion decoding: VAE decoder supports arbitrary spatial position queries, generating globally consistent motion fields from sparse trajectory inputs",
          "Conditional flow matching generation: training flow matching model in motion latent space, supporting both text and poke conditioning modes for goal-directed motion planning"
        ],
        href: "https://arxiv.org/abs/2604.11737",
        paperLink: "Learning Long-term Motion Embeddings for Efficient Kinematics Generation",
      },
    ],
    worthReading: [
      {
        num: 3,
        title: "Audio Flamingo Next: Next-Generation Open Audio-Language Models",
        tag: "Audio Understanding",
        href: "https://arxiv.org/abs/2604.10905",
        description: "Supports 30-minute long audio inputs, proposes Temporal Audio Chain-of-Thought paradigm for explicit alignment between reasoning steps and timestamps, applicable to fine-grained beat-to-dance temporal alignment.",
      },
      {
        num: 4,
        title: "OmniScript: Towards Audio-Visual Script Generation for Long-Form Cinematic Video",
        tag: "Temporal Understanding",
        href: "https://arxiv.org/abs/2604.11102",
        description: "Proposes the novel Video-to-Script (V2S) task, an 8B-parameter omni-modal model trained with reinforcement learning using temporally segmented rewards; its temporally-aware hierarchical evaluation framework can inspire dance sequence evaluation.",
      },
      {
        num: 5,
        title: "Introspective Diffusion Language Models",
        tag: "Diffusion Models",
        href: "https://arxiv.org/abs/2604.11035",
        description: "Proposes I-DLM with Introspective Strided Decoding (ISD) algorithm that verifies previously generated tokens during parallel decoding; its introspective consistency mechanism can improve inter-frame consistency in dance video generation.",
      },
      {
        num: 6,
        title: "Continuous Adversarial Flow Models",
        tag: "Generative Models",
        href: "https://arxiv.org/abs/2604.11521",
        description: "Proposes continuous adversarial flow models using learned discriminators instead of fixed MSE objectives in flow matching, reducing SiT FID from 8.26 to 3.63 via post-training; applicable to improving dance video diffusion model quality.",
      },
    ],
    observation: "Today's papers reveal two important trends in video generation: first, unified processing of multimodal conditions is becoming standard for industrial applications, with OmniShow's channel concatenation + gated attention design providing a transferable technical path for music-pose-identity joint control in music-to-dance tasks; second, disentangled motion and appearance representations are emerging, with ZipMo's 64x compressed motion space demonstrating that liberating motion from pixel space can bring order-of-magnitude efficiency gains. For music-to-dance tasks, future work should explore extending OmniShow's multimodal injection mechanisms to music beat conditions and whether ZipMo's motion embedding approach can learn compact representations of dance movements for real-time dance generation.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-15`,
        'en': `/en/daily/music-to-dance/2026-04-15`,
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
      date="2026-04-15"
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
