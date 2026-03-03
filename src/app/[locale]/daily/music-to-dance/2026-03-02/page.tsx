import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance",
    title: "空间理解与高效视觉建模：图像生成与视频理解的新进展",
    overview: [
      "奖励模型SpatialScore通过对抗偏好学习提升图像生成的空间关系理解能力",
      "LongVideo-R1实现低成本长视频理解，通过智能导航平衡精度与效率",
      "DUET-VLM双阶段视觉token压缩在保持99%准确率的同时显著降低计算开销"
    ],
    papers: [
      {
        num: 1,
        tag: "图像生成",
        title: "通过奖励模型增强图像生成中的空间理解",
        description: "论文提出SpatialScore奖励模型，专门针对图像生成中的空间关系理解进行优化。研究团队构建了包含8万对抗偏好对的SpatialReward-Dataset，通过人工审核确保数据质量。该奖励模型在评估多物体空间关系时表现优于多个领先的专有模型，解决了现有通用奖励模型和VLM在空间推理上的不足。更重要的是，SpatialScore可用于在线强化学习，通过top-k过滤策略有效提升生成模型的空间理解能力。对于music-to-dance任务，这项技术可迁移用于提升生成视频中人物与背景、多人物之间的空间关系准确性。",
        keyPoints: [
          "构建80K对抗偏好对的专门数据集，聚焦复杂空间关系",
          "SpatialScore奖励模型超越领先专有模型的空间评估能力",
          "提出top-k过滤策略实现高效的在线RL训练",
          "可迁移至视频生成中的空间一致性和布局控制"
        ],
        href: "https://arxiv.org/abs/2602.24233",
        paperLink: "Enhancing Spatial Understanding in Image Generation via Reward Modeling",
      },
      {
        num: 2,
        tag: "长视频理解",
        title: "LongVideo-R1：低成本长视频理解的智能导航",
        description: "针对长视频理解计算成本高的问题，论文提出LongVideo-R1框架，将MLLM与大型推理模型结合实现智能视频导航。该方法将视频组织为层次结构，通过推理模块动态决策下一步采样的位置——可以钻取到子片段、横向遍历兄弟节点或回溯到上层获取新上下文。在LVBench、VideoMME和MLVU等基准上，平均仅需10.5轮推理即可达到竞争性的QA准确率，显著优于线性扫描方法的计算效率。对于分钟级舞蹈视频生成，这种分层导航和长时序上下文管理技术具有重要的迁移价值。",
        keyPoints: [
          "层次化视频组织实现跨时间粒度快速聚焦",
          "推理模块动态决策采样位置，平衡效率与准确性",
          "两阶段训练：SFT + 专门设计的RL奖励函数",
          "长时序上下文管理技术可迁移至长视频生成"
        ],
        href: "https://arxiv.org/abs/2602.20913",
        paperLink: "LongVideo-R1: Smart Navigation for Low-cost Long Video Understanding",
      },
      {
        num: 3,
        tag: "高效视觉建模",
        title: "DUET-VLM：视觉语言模型的双阶段统一高效token压缩",
        description: "论文提出DUET-VLM框架，通过视觉侧冗余感知压缩和语言侧文本引导剪枝的双阶段策略，解决VLM中视觉token过多导致的计算瓶颈。V2V阶段在视觉编码器输出后合并相关patch为信息丰富的嵌入，T2V阶段在语言模型中基于注意力分布动态剪枝。在LLaVA-1.5-7B上保持99%准确率的同时实现67% token压缩，极端情况下89%压缩仍保持97%准确率。Video-LLaVA-7B上更是实现>100%准确率提升（53.1%压缩）。对于依赖3D Audio Attention的music-to-dance系统，这种token压缩技术可显著降低计算成本。",
        keyPoints: [
          "V2V视觉侧压缩：冗余感知token合并保留关键视觉信息",
          "T2V语言侧剪枝：基于文本-视觉注意力的自适应token丢弃",
          "训练时启用压缩使模型适应降维输入，推理效率大幅提升",
          "视频理解任务中53.1%压缩下准确率反而超越基线"
        ],
        href: "https://arxiv.org/abs/2602.18846",
        paperLink: "DUET-VLM: Dual stage Unified Efficient Token reduction for VLM Training and Inference",
      }
    ],
    worthReading: [
      {
        num: 4,
        title: "快速长视频生成：Mode Seeking与Mean Seeking的结合",
        tag: "视频生成",
        href: "https://arxiv.org/abs/2602.24289",
        description: "提出解耦扩散Transformer，通过全局Flow Matching学习长视频结构、局部分布匹配继承短视频教师的真实感，实现分钟级视频生成。可借鉴其局部-全局解耦策略提升舞蹈视频时长和一致性。"
      },
      {
        num: 5,
        title: "UniTalking：统一音视频对话肖像生成框架",
        tag: "音视频生成",
        href: "http://arxiv.org/abs/2603.01418v1",
        description: "采用多模态Transformer块通过共享自注意力显式建模音频-视频latent token的细粒度时序对应。其音视频对齐技术对music-to-dance的音频-运动对齐有直接参考价值。"
      },
      {
        num: 6,
        title: "Sketch2Colab：草图条件多人动画的流蒸馏",
        tag: "运动生成",
        href: "http://arxiv.org/abs/2603.02190v1",
        description: "将扩散先验蒸馏为高效的rectified-flow学生模型，通过可微能量直接塑造运输场。Flow蒸馏加速采样技术可为舞蹈生成提供更高效的推理方案。"
      },
      {
        num: 7,
        title: "Kiwi-Edit：指令与参考引导的多功能视频编辑",
        tag: "视频编辑",
        href: "http://arxiv.org/abs/2603.02175v1",
        description: "提出可扩展的数据生成管道构建大规模指令-参考训练集，统一编辑架构协同学习查询和潜在视觉特征。参考引导技术可直接迁移到外观保持任务。"
      },
      {
        num: 8,
        title: "LiftAvatar：表情控制的3D高斯化身动画",
        tag: "化身生成",
        href: "http://arxiv.org/abs/2603.02129v1",
        description: "在运动学空间补全稀疏单目观测并驱动高保真化身动画，多参考图条件机制聚合多帧互补线索实现强3D一致性。多参考条件生成技术对人物外观迁移有参考价值。"
      }
    ],
    observation: "今日论文显示出三个值得关注的技术趋势：一是奖励模型和RL在提升生成质量上的精细化应用，从通用偏好学习到专门的空间关系理解；二是流匹配(Flow Matching)和Rectified Flow等新型生成范式正在成为扩散模型的有力替代；三是多模态效率优化从单一维度向视觉-语言协同压缩演进。对于music-to-dance任务，这些进展意味着可以通过更高效的注意力机制降低计算成本，同时利用专门的奖励模型提升生成结果的空间一致性和时序连贯性。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "Spatial Understanding & Efficient Visual Modeling: New Advances in Image Generation and Video Understanding",
    overview: [
      "Reward model SpatialScore enhances spatial relationship understanding via adversarial preference learning",
      "LongVideo-R1 achieves low-cost long video understanding through smart navigation balancing accuracy and efficiency",
      "DUET-VLM dual-stage visual token compression maintains 99% accuracy while significantly reducing computational overhead"
    ],
    papers: [
      {
        num: 1,
        tag: "Image Generation",
        title: "Enhancing Spatial Understanding in Image Generation via Reward Modeling",
        description: "This paper proposes SpatialScore, a reward model specifically optimized for spatial relationship understanding in image generation. The research team constructed SpatialReward-Dataset with 80K adversarial preference pairs, manually reviewed for quality. The reward model outperforms leading proprietary models in evaluating multi-object spatial relationships, addressing limitations of general reward models and VLMs in spatial reasoning. Importantly, SpatialScore enables online reinforcement learning with top-k filtering strategy to effectively improve spatial understanding. For music-to-dance tasks, this technology can be migrated to enhance spatial relationship accuracy between characters and backgrounds or among multiple characters in generated videos.",
        keyPoints: [
          "Constructed specialized dataset with 80K adversarial pairs focusing on complex spatial relations",
          "SpatialScore reward model surpasses leading proprietary models in spatial evaluation",
          "Proposed top-k filtering strategy for efficient online RL training",
          "Transferable to spatial consistency and layout control in video generation"
        ],
        href: "https://arxiv.org/abs/2602.24233",
        paperLink: "Enhancing Spatial Understanding in Image Generation via Reward Modeling",
      },
      {
        num: 2,
        tag: "Long Video Understanding",
        title: "LongVideo-R1: Smart Navigation for Low-cost Long Video Understanding",
        description: "Addressing high computational costs in long video understanding, this paper proposes LongVideo-R1 framework combining MLLM with large reasoning models for intelligent video navigation. The method organizes video hierarchically, using a reasoning module to dynamically decide next sampling positions—drilling down to child clips, traversing laterally to siblings, or backtracking to upper levels for new context. On LVBench, VideoMME and MLVU benchmarks, it achieves competitive QA accuracy with only 10.5 reasoning rounds on average, significantly outperforming linear scan methods in computational efficiency. For minute-level dance video generation, this hierarchical navigation and long-term context management technology has important migration value.",
        keyPoints: [
          "Hierarchical video organization enables rapid focus across temporal granularities",
          "Reasoning module dynamically decides sampling positions balancing efficiency and accuracy",
          "Two-stage training: SFT + specially designed RL reward function",
          "Long-term context management techniques transferable to long video generation"
        ],
        href: "https://arxiv.org/abs/2602.20913",
        paperLink: "LongVideo-R1: Smart Navigation for Low-cost Long Video Understanding",
      },
      {
        num: 3,
        tag: "Efficient Visual Modeling",
        title: "DUET-VLM: Dual Stage Unified Efficient Token Reduction for VLM Training and Inference",
        description: "This paper proposes DUET-VLM framework using dual-stage strategy—vision-side redundancy-aware compression and language-side text-guided pruning—to address computational bottlenecks from excessive visual tokens in VLMs. V2V stage merges related patches into information-rich embeddings after vision encoder output, while T2V stage dynamically prunes tokens based on attention distribution in the language model. On LLaVA-1.5-7B, it maintains 99% accuracy with 67% token compression, and still achieves 97% accuracy under extreme 89% compression. On Video-LLaVA-7B, it achieves >100% accuracy improvement (53.1% compression). For music-to-dance systems relying on 3D Audio Attention, this token compression technology can significantly reduce computational costs.",
        keyPoints: [
          "V2V vision-side compression: redundancy-aware token merging preserves key visual information",
          "T2V language-side pruning: adaptive token dropping based on text-vision attention",
          "Enabling compression during training adapts model to reduced-dimension inputs",
          "Video understanding tasks show accuracy surpassing baseline at 53.1% compression"
        ],
        href: "https://arxiv.org/abs/2602.18846",
        paperLink: "DUET-VLM: Dual stage Unified Efficient Token reduction for VLM Training and Inference",
      }
    ],
    worthReading: [
      {
        num: 4,
        title: "Fast Long Video Generation: Combining Mode Seeking and Mean Seeking",
        tag: "Video Generation",
        href: "https://arxiv.org/abs/2602.24289",
        description: "Proposes decoupled diffusion Transformer that learns long video structure via global Flow Matching while inheriting realism from short video teacher via local distribution matching, enabling minute-scale video generation."
      },
      {
        num: 5,
        title: "UniTalking: Unified Audio-Video Framework for Talking Portrait Generation",
        tag: "Audio-Video Generation",
        href: "http://arxiv.org/abs/2603.01418v1",
        description: "Uses multi-modal Transformer blocks to explicitly model fine-grained temporal correspondence between audio and video latent tokens via shared self-attention. Its audio-visual alignment technology has direct reference value for audio-motion alignment."
      },
      {
        num: 6,
        title: "Sketch2Colab: Sketch-Conditioned Multi-Human Animation via Flow Distillation",
        tag: "Motion Generation",
        href: "http://arxiv.org/abs/2603.02190v1",
        description: "Distills diffusion prior into efficient rectified-flow student model, directly shaping transport field via differentiable energies. Flow distillation acceleration can provide more efficient inference for dance generation."
      },
      {
        num: 7,
        title: "Kiwi-Edit: Versatile Video Editing via Instruction and Reference Guidance",
        tag: "Video Editing",
        href: "http://arxiv.org/abs/2603.02175v1",
        description: "Proposes scalable data generation pipeline for large-scale instruction-reference training set, unified editing architecture synergizes learnable queries and latent visual features. Reference-guided technology directly transferable to appearance preservation."
      },
      {
        num: 8,
        title: "LiftAvatar: Kinematic-Space Completion for Expression-Controlled 3D Gaussian Avatar Animation",
        tag: "Avatar Generation",
        href: "http://arxiv.org/abs/2603.02129v1",
        description: "Completes sparse monocular observations in kinematic space and drives high-fidelity avatar animation, multi-reference conditioning aggregates complementary cues for strong 3D consistency."
      }
    ],
    observation: "Today's papers reveal three notable technical trends: first, the refined application of reward models and RL in improving generation quality, moving from general preference learning to specialized spatial relationship understanding; second, novel generation paradigms like Flow Matching and Rectified Flow emerging as strong alternatives to diffusion models; third, multimodal efficiency optimization evolving from single-dimension to vision-language collaborative compression. For music-to-dance tasks, these advances suggest the possibility of reducing computational costs through more efficient attention mechanisms while utilizing specialized reward models to enhance spatial consistency and temporal coherence in generated results.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-02`,
        'en': `/en/daily/music-to-dance/2026-03-02`,
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
      date="2026-03-02"
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