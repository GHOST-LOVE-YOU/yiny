import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "多智能体世界模型与视频生成加速：舞蹈生成的新工具",
    overview: [
      "MultiWorld 的多智能体视频世界模型框架为舞蹈生成中的多人协同场景提供了可迁移的技术方案",
      "SDVG 投机解码将自回归视频生成加速 2.09 倍，为实时舞蹈视频生成提供可行路径",
      "MeanFlow 单步生成技术揭示了文本/音频表征可判别性对少步生成的关键作用"
    ],
    papers: [
      {
        num: 1,
        tag: "世界模型",
        title: "MultiWorld：可扩展的多智能体多视角视频世界模型",
        description: "MultiWorld 提出了一个统一的多智能体多视角视频世界模型框架，通过 Multi-Agent Condition Module (MACM) 实现精确的多个智能体控制，并通过 Global State Encoder (GSE) 确保多视角一致性。该框架的核心创新在于将多智能体动作条件与 3D 感知全局状态相结合，实现了可扩展到任意数量智能体和相机视角的视频生成。对于 music-to-dance 任务，当需要生成多人共舞场景时，MACM 中的 Agent Identity Embedding (AIE) 机制可直接迁移——通过为每个舞者分配相对身份嵌入，解决身份混淆问题；而 GSE 的 3D 感知全局状态编码器则可确保跨视角的人物外观一致性，缓解当前 patch-shuffling 策略在时序上的抖动问题。实验表明，MultiWorld 在多人游戏和机器人操作任务中均取得了最优性能，其并行视角生成策略还可实现 1.5 倍加速。",
        keyPoints: [
          "Agent Identity Embedding (AIE) 使用旋转位置编码为每个智能体分配身份嵌入，解决多主体身份混淆问题",
          "Global State Encoder (GSE) 基于 VGGT 提取 3D 感知全局环境状态，确保多视角一致性",
          "框架支持任意数量智能体和相机视角的可扩展生成，推理延迟与视角数量无关"
        ],
        href: "https://arxiv.org/abs/2604.18564",
        paperLink: "MultiWorld: Scalable Multi-Agent Multi-View Video World Models",
      },
      {
        num: 2,
        tag: "推理加速",
        title: "SDVG：自回归视频生成的投机解码加速",
        description: "SDVG 将大语言模型中的投机解码技术首次成功应用于自回归视频扩散模型，解决了视频块作为连续时空张量无法使用传统 token 级拒绝采样的问题。该方法使用 1.3B 草稿模型生成候选块，通过 ImageReward 进行图像质量路由（采用 worst-frame 聚合策略捕获单帧伪影），在 14B 目标模型的 KV 缓存中接受或拒绝候选块。关键设计包括：强制拒绝第一块以锚定场景构图，以及单一阈值 τ 作为质量-速度权衡的调节旋钮。在 MovieGenVideoBench 上，SDVG 在 τ=-0.7 时实现 1.59 倍加速且保持 98.1% 的目标模型质量；在 τ=-2.5 时达到 2.09 倍加速，仍保持 95.7% 质量。对于 music-to-dance 的实时应用需求，该框架无需训练即可集成到现有自回归视频生成流程中。",
        keyPoints: [
          "使用图像质量路由替代 token 级验证，通过 worst-frame 聚合捕获单帧伪影",
          "强制拒绝第一块的设计确保场景构图锚定，避免布局错误传播",
          "单一阈值 τ 实现质量-速度帕累托前沿的平滑调节，无需复杂的轨迹工程"
        ],
        href: "https://arxiv.org/abs/2604.17397",
        paperLink: "Speculative Decoding for Autoregressive Video Generation",
      },
      {
        num: 3,
        tag: "少步生成",
        title: "EMF：基于判别性文本表征的 MeanFlow 文本条件单步生成",
        description: "该研究首次将 MeanFlow 从类标签条件扩展到文本条件生成，揭示了少步/单步生成成功的关键：文本表征必须具备高判别性（discriminability）和良好的语义解耦性（disentanglement）。研究发现，在极少去噪步数（如单步）的情况下，文本特征的可判别性尤为重要——这解释了为什么离散的类特征在 MeanFlow 中表现良好。通过对比 SANA-1.5 和 BLIP3o-NEXT 的文本编码器，论文证明了在少步设置下，不同文本表征会产生质量差异显著的速度场。对于 music-to-dance 任务，这一发现具有重要启发：当前使用 3D Audio Attention 对齐音频与运动，若将音频特征编码为高判别性表征（类似 BLIP3o-NEXT 的文本编码器），有望实现音频条件的单步/少步舞蹈视频生成，显著加速推理。实验在 BLIP3o-NEXT 上验证了该方法，4 步生成即可达到接近原模型的质量。",
        keyPoints: [
          "文本表征的可判别性和解耦性是 MeanFlow 单步生成成功的关键",
          "BLIP3o-NEXT 的文本编码器在少步设置下表现出更强的语义保持能力",
          "该方法为音频条件单步生成提供了可行路径：将音频特征编码为高判别性表征"
        ],
        href: "https://arxiv.org/abs/2604.18168",
        paperLink: "Extending One-Step Image Generation from Class Labels to Text via Discriminative Text Representation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "OneVL：单步潜在推理与视觉-语言解释",
        tag: "视觉-语言",
        href: "https://arxiv.org/abs/2604.18486",
        description: "OneVL 的统一 VLA 与世界模型框架通过视觉世界模型解码器强制潜在空间内化因果动态，其双解码器监督机制可能帮助改善舞蹈生成中的运动-音乐对齐一致性。",
      },
      {
        num: 5,
        title: "Agent-World：可扩展真实环境合成",
        tag: "智能体",
        href: "https://arxiv.org/abs/2604.18292",
        description: "Agent-World 的动态任务合成机制可为舞蹈动作数据增强和多样化训练环境构建提供思路。",
      },
      {
        num: 6,
        title: "MARCO：语义对应的新框架",
        tag: "语义对应",
        href: "https://arxiv.org/abs/2604.18267",
        description: "MARCO 的语义对应学习技术可应用于舞蹈视频中的人物姿态关键点跟踪与跨帧身份保持。",
      },
      {
        num: 7,
        title: "UDM-GRPO：离散扩散模型的强化学习",
        tag: "强化学习",
        href: "https://arxiv.org/abs/2604.18518",
        description: "UDM-GRPO 将强化学习引入扩散模型训练，对优化舞蹈生成模型的人类对齐和特定风格学习有潜在价值。",
      },
      {
        num: 8,
        title: "Curiosity-Critic：世界模型训练的内在奖励",
        tag: "世界模型",
        href: "https://arxiv.org/abs/2604.18701",
        description: "Curiosity-Critic 的内在奖励机制对视频生成模型的探索性训练有参考价值，可能帮助模型发现更丰富的舞蹈动作模式。",
      },
    ],
    observation: "今日论文呈现出两个明显的技术趋势：一是视频生成正在从单智能体向多智能体、单视角向多视角扩展，MultiWorld 的 3D 感知全局状态机制为舞蹈生成中的多人场景和一致性保持提供了可迁移方案；二是推理加速技术日趋成熟，SDVG 的投机解码和 MeanFlow 的单步生成从不同角度（自回归架构优化、少步采样）推动视频生成向实时应用迈进。对于 music-to-dance 任务，将音频特征编码为高判别性表征以实现少步生成，以及利用多智能体框架处理多人共舞场景，是值得探索的方向。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "Multi-Agent World Models & Video Generation Acceleration: New Tools for Dance Generation",
    overview: [
      "MultiWorld's multi-agent video world model framework provides transferable technical solutions for multi-person collaborative scenarios in dance generation",
      "SDVG speculative decoding accelerates autoregressive video generation by 2.09×, offering a viable path for real-time dance video generation",
      "MeanFlow single-step generation reveals the critical role of text/audio representation discriminability for few-step generation"
    ],
    papers: [
      {
        num: 1,
        tag: "World Model",
        title: "MultiWorld: Scalable Multi-Agent Multi-View Video World Models",
        description: "MultiWorld proposes a unified multi-agent multi-view video world model framework that achieves precise control of multiple agents through the Multi-Agent Condition Module (MACM) and ensures multi-view consistency via the Global State Encoder (GSE). The core innovation lies in combining multi-agent action conditioning with 3D-aware global states, enabling scalable video generation for arbitrary numbers of agents and camera views. For music-to-dance tasks, when generating multi-person dance scenes, MACM's Agent Identity Embedding (AIE) mechanism can be directly transferred—by assigning relative identity embeddings to each dancer to solve identity confusion; while GSE's 3D-aware global state encoder ensures cross-view subject appearance consistency, alleviating temporal jitter issues in current patch-shuffling strategies. Experiments show MultiWorld achieves state-of-the-art performance in both multiplayer games and robotic manipulation tasks, with parallel view generation strategies providing 1.5× acceleration.",
        keyPoints: [
          "Agent Identity Embedding (AIE) uses rotary position encoding to assign identity embeddings to each agent, solving multi-subject identity confusion",
          "Global State Encoder (GSE) extracts 3D-aware global environment states based on VGGT to ensure multi-view consistency",
          "The framework supports scalable generation for arbitrary numbers of agents and camera views, with inference latency independent of view count"
        ],
        href: "https://arxiv.org/abs/2604.18564",
        paperLink: "MultiWorld: Scalable Multi-Agent Multi-View Video World Models",
      },
      {
        num: 2,
        tag: "Inference Acceleration",
        title: "SDVG: Speculative Decoding for Autoregressive Video Generation",
        description: "SDVG successfully applies speculative decoding from large language models to autoregressive video diffusion models for the first time, solving the problem that video blocks as continuous spatiotemporal tensors cannot use traditional token-level rejection sampling. The method uses a 1.3B drafter model to generate candidate blocks, routes via ImageReward quality scoring (using worst-frame aggregation to capture single-frame artifacts), and accepts or rejects candidate blocks in the 14B target model's KV cache. Key designs include: forced rejection of the first block to anchor scene composition, and a single threshold τ as a quality-speed trade-off knob. On MovieGenVideoBench, SDVG achieves 1.59× speedup with 98.1% target model quality at τ=-0.7; and 2.09× speedup with 95.7% quality retention at τ=-2.5. For real-time music-to-dance applications, this framework can be integrated into existing autoregressive video generation pipelines without training.",
        keyPoints: [
          "Uses image quality routing instead of token-level verification, capturing single-frame artifacts through worst-frame aggregation",
          "Forced first-block rejection ensures scene composition anchoring, preventing layout error propagation",
          "Single threshold τ enables smooth quality-speed Pareto frontier adjustment without complex trajectory engineering"
        ],
        href: "https://arxiv.org/abs/2604.17397",
        paperLink: "Speculative Decoding for Autoregressive Video Generation",
      },
      {
        num: 3,
        tag: "Few-Step Generation",
        title: "EMF: MeanFlow Text-Conditioned Single-Step Generation via Discriminative Text Representation",
        description: "This research extends MeanFlow from class-label conditioning to text-conditioned generation for the first time, revealing the keys to successful few-step/single-step generation: text representations must possess high discriminability and good semantic disentanglement. The study finds that under very few denoising steps (such as single-step), text feature discriminability is particularly important—explaining why discrete class features perform well in MeanFlow. By comparing SANA-1.5 and BLIP3o-NEXT text encoders, the paper demonstrates that different text representations produce velocity fields with significantly different quality under few-step settings. For music-to-dance tasks, this finding has important implications: current approaches use 3D Audio Attention to align audio with motion; if audio features are encoded as highly discriminative representations (similar to BLIP3o-NEXT's text encoder), single-step/few-step dance video generation conditioned on audio could be achieved, significantly accelerating inference. Experiments on BLIP3o-NEXT validate the method, achieving near-original model quality with just 4 generation steps.",
        keyPoints: [
          "Text representation discriminability and disentanglement are key to MeanFlow single-step generation success",
          "BLIP3o-NEXT's text encoder shows stronger semantic preservation capability under few-step settings",
          "This method provides a viable path for audio-conditioned single-step generation: encode audio features as highly discriminative representations"
        ],
        href: "https://arxiv.org/abs/2604.18168",
        paperLink: "Extending One-Step Image Generation from Class Labels to Text via Discriminative Text Representation",
      },
    ],
    worthReading: [
      {
        num: 4,
        title: "OneVL: One-Step Latent Reasoning with Vision-Language Explanation",
        tag: "Vision-Language",
        href: "https://arxiv.org/abs/2604.18486",
        description: "OneVL's unified VLA and world model framework forces the latent space to internalize causal dynamics through visual world model decoders; its dual-decoder supervision mechanism may help improve motion-music alignment consistency in dance generation.",
      },
      {
        num: 5,
        title: "Agent-World: Scalable Real-World Environment Synthesis",
        tag: "Agent",
        href: "https://arxiv.org/abs/2604.18292",
        description: "Agent-World's dynamic task synthesis mechanism provides ideas for dance motion data augmentation and diverse training environment construction.",
      },
      {
        num: 6,
        title: "MARCO: A New Framework for Semantic Correspondence",
        tag: "Semantic Correspondence",
        href: "https://arxiv.org/abs/2604.18267",
        description: "MARCO's semantic correspondence learning techniques can be applied to human pose keypoint tracking and cross-frame identity preservation in dance videos.",
      },
      {
        num: 7,
        title: "UDM-GRPO: Reinforcement Learning for Discrete Diffusion Models",
        tag: "Reinforcement Learning",
        href: "https://arxiv.org/abs/2604.18518",
        description: "UDM-GRPO introduces reinforcement learning into diffusion model training, with potential value for optimizing human alignment and specific style learning in dance generation models.",
      },
      {
        num: 8,
        title: "Curiosity-Critic: Intrinsic Rewards for World Model Training",
        tag: "World Model",
        href: "https://arxiv.org/abs/2604.18701",
        description: "Curiosity-Critic's intrinsic reward mechanism has reference value for exploratory training of video generation models, potentially helping models discover richer dance motion patterns.",
      },
    ],
    observation: "Today's papers reveal two clear technical trends: first, video generation is expanding from single-agent to multi-agent and single-view to multi-view; MultiWorld's 3D-aware global state mechanism provides transferable solutions for multi-person scenarios and consistency preservation in dance generation. Second, inference acceleration technologies are maturing—SDVG's speculative decoding and MeanFlow's single-step generation push video generation toward real-time applications from different angles (autoregressive architecture optimization, few-step sampling). For music-to-dance tasks, encoding audio features as highly discriminative representations for few-step generation, and utilizing multi-agent frameworks to handle multi-person dance scenarios, are directions worth exploring.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-04-21`,
        'en': `/en/daily/music-to-dance/2026-04-21`,
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
      date="2026-04-21"
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