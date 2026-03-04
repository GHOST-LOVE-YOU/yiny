import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance",
    title: "矢量动画生成与自适应推理：图像编辑与生成的新进展",
    overview: [
      "OmniLottie实现多模态指令驱动的矢量动画生成，Lottie分词器技术值得借鉴",
      "ADE-CoT提出自适应推理时间缩放，动态资源分配提升编辑效率2倍以上",
      "RAISE需求驱动进化优化框架实现文本到图像对齐的新突破"
    ],
    papers: [
      {
        num: 1,
        tag: "动画生成",
        title: "OmniLottie：基于参数化Lottie Token的多模态矢量动画生成",
        description: "论文提出OmniLottie框架，专注于从多模态指令生成高质量矢量动画。核心创新是设计了一个专门的Lottie分词器，将原始JSON文件转换为结构化的命令和参数序列，表示形状、动画函数和控制参数。该技术基于预训练视觉语言模型构建，可遵循多模态交错指令生成动画。研究团队还构建了MMLottie-2M大规模数据集，包含专业设计的矢量动画及文本和视觉标注。对于music-to-dance任务，矢量动画的时序控制和多模态指令跟随机制对舞蹈动作生成有重要参考价值——尤其是在处理动作序列的结构化表示和多条件（音频+参考图）控制方面。",
        keyPoints: [
          "Lottie分词器将JSON转换为结构化命令序列，解决原始格式学习难题",
          "基于预训练VLM构建，支持多模态交错指令跟随",
          "MMLottie-2M数据集包含专业动画及多模态标注",
          "时序控制和结构化动作表示对舞蹈生成有迁移价值"
        ],
        href: "https://arxiv.org/abs/2603.02138",
        paperLink: "OmniLottie: Generating Vector Animations via Parameterized Lottie Tokens",
      },
      {
        num: 2,
        tag: "图像编辑",
        title: "ADE-CoT：自适应推理时间缩放提升图像编辑效率",
        description: "针对图像编辑中应用Image-CoT的三大挑战（固定采样预算导致资源分配低效、通用MLLM评分的早期验证不可靠、大规模采样产生冗余结果），论文提出ADE-CoT框架。核心策略包括：难度感知资源分配（根据估计的编辑难度动态分配预算）、编辑特定早期剪枝验证（使用区域定位和标题一致性选择候选）、深度优先机会性停止（由实例特定验证器引导）。在Step1X-Edit、BAGEL、FLUX.1 Kontext等模型上的实验表明，ADE-CoT在相当采样预算下实现2倍以上加速。对于视频生成任务，这种自适应推理时间缩放和动态资源分配机制可迁移用于优化扩散模型的推理效率。",
        keyPoints: [
          "难度感知资源分配根据编辑复杂度动态调整采样预算",
          "区域定位+标题一致性的编辑特定验证机制",
          "深度优先机会性停止策略减少冗余计算",
          "自适应推理缩放技术可迁移至视频生成效率优化"
        ],
        href: "https://arxiv.org/abs/2603.00141",
        paperLink: "From Scale to Speed: Adaptive Test-Time Scaling for Image Editing",
      },
      {
        num: 3,
        tag: "图像生成",
        title: "RAISE：需求驱动的进化优化实现文本到图像对齐",
        description: "现有T2I扩散模型在复杂提示（多对象、关系、细粒度属性）的图像对齐上仍面临挑战。论文提出RAISE框架，将图像生成建模为需求驱动的自适应缩放过程。关键创新包括：通过提示重写、噪声重采样、指令编辑等多样化精炼动作进化候选群体；使用结构化需求清单验证每代输出，动态识别未满足项；仅在需要处分配额外计算，实现与语义查询复杂度对齐的自适应推理缩放。在GenEval上达到0.94整体对齐分数，生成样本减少30-40%，VLM调用减少80%。对于music-to-dance，这种需求驱动的优化和提示对齐技术可提升生成视频的外观一致性和音频对齐质量。",
        keyPoints: [
          "需求清单验证机制动态识别未满足的生成要求",
          "多样化精炼动作（提示重写、噪声重采样、指令编辑）",
          "自适应推理缩放与语义复杂度对齐",
          "零训练框架，可迁移性强"
        ],
        href: "https://arxiv.org/abs/2603.00483",
        paperLink: "RAISE: Requirement-Adaptive Evolutionary Refinement for Training-Free Text-to-Image Alignment",
      }
    ],
    worthReading: [
      {
        num: 4,
        title: "VGGT-Det：无传感器几何的多视图室内3D检测",
        tag: "3D视觉",
        href: "https://arxiv.org/abs/2603.00912",
        description: "注意力引导查询生成和查询驱动特征聚合技术利用VGGT内部语义和几何先验。多视角人物理解技术对舞蹈场景中的相机自由设置有参考价值。"
      },
      {
        num: 5,
        title: "R-TAP：LLM和VLM的递归思考-回答过程",
        tag: "推理优化",
        href: "https://arxiv.org/abs/2603.02099",
        description: "置信度生成器评估响应确定性并指导改进，递归推理循环提升答案准确性。自洽性检查机制可借鉴用于舞蹈生成结果的迭代优化。"
      },
      {
        num: 6,
        title: "V-LCM：通过概念空间对齐的统一视觉-语言建模",
        tag: "多模态",
        href: "https://arxiv.org/abs/2603.01096",
        description: "V-SONAR视觉-语言嵌入空间将视觉编码器表示映射到统一空间，V-LCM使用潜在扩散目标进行下一嵌入预测。多模态统一建模对音频-视觉-运动联合建模有启发。"
      }
    ],
    observation: "今日论文呈现一个明显趋势：生成任务的优化正从固定范式转向自适应、需求驱动的动态策略。ADE-CoT的难度感知资源分配、RAISE的需求清单验证、R-TAP的置信度引导递归，都体现了\"按需计算\"的思想。这与music-to-dance中根据音频复杂度动态调整生成策略的需求高度契合——简单节拍使用轻量推理，复杂编舞启用深度思考。",
  },
  en: {
    roleName: "Music-to-Dance",
    title: "Vector Animation & Adaptive Inference: New Advances in Image Editing and Generation",
    overview: [
      "OmniLottie achieves multimodal instruction-driven vector animation generation with learnable Lottie tokenizer",
      "ADE-CoT proposes adaptive test-time scaling with dynamic resource allocation achieving 2x+ speedup",
      "RAISE requirement-driven evolutionary framework breaks new ground in text-to-image alignment"
    ],
    papers: [
      {
        num: 1,
        tag: "Animation Generation",
        title: "OmniLottie: Generating Vector Animations via Parameterized Lottie Tokens",
        description: "This paper proposes OmniLottie framework for generating high-quality vector animations from multimodal instructions. The core innovation is a specialized Lottie tokenizer that converts raw JSON files into structured command and parameter sequences representing shapes, animation functions, and control parameters. Built on pretrained vision-language models, it follows multimodal interleaved instructions. The MMLottie-2M dataset contains professionally designed animations with text and visual annotations. For music-to-dance, the temporal control and multimodal instruction following mechanisms offer valuable insights—especially in handling structured motion representations and multi-condition (audio+reference) control.",
        keyPoints: [
          "Lottie tokenizer converts JSON to structured command sequences",
          "Built on pretrained VLM with multimodal interleaved instruction following",
          "MMLottie-2M dataset with professional animations and annotations",
          "Temporal control and structured motion representation transferable to dance"
        ],
        href: "https://arxiv.org/abs/2603.02138",
        paperLink: "OmniLottie: Generating Vector Animations via Parameterized Lottie Tokens",
      },
      {
        num: 2,
        tag: "Image Editing",
        title: "ADE-CoT: Adaptive Test-Time Scaling for Image Editing",
        description: "Addressing three challenges of applying Image-CoT to editing (inefficient resource allocation, unreliable early verification, redundant results), this paper proposes ADE-CoT with: difficulty-aware resource allocation (dynamic budgets based on edit complexity), edit-specific early pruning (region localization + caption consistency), and depth-first opportunistic stopping (instance-specific verifier). Experiments on Step1X-Edit, BAGEL, FLUX.1 Kontext show 2x+ speedup with comparable budgets. For video generation, this adaptive inference scaling and dynamic resource allocation can optimize diffusion model inference efficiency.",
        keyPoints: [
          "Difficulty-aware resource allocation adjusts sampling budgets dynamically",
          "Region localization + caption consistency for edit-specific verification",
          "Depth-first opportunistic stopping reduces redundant computation",
          "Adaptive inference scaling transferable to video generation"
        ],
        href: "https://arxiv.org/abs/2603.00141",
        paperLink: "From Scale to Speed: Adaptive Test-Time Scaling for Image Editing",
      },
      {
        num: 3,
        tag: "Image Generation",
        title: "RAISE: Requirement-Adaptive Evolutionary Refinement for T2I Alignment",
        description: "Existing T2I diffusion models struggle with complex prompts. RAISE models generation as requirement-driven adaptive scaling. Key innovations: evolving candidate populations through diverse refinement actions (prompt rewriting, noise resampling, instructional editing); structured requirement checklist verification; dynamic identification of unsatisfied items; allocating computation only where needed. Achieves 0.94 GenEval alignment with 30-40% fewer samples and 80% fewer VLM calls. For music-to-dance, this requirement-driven optimization and prompt alignment can improve appearance consistency and audio alignment quality.",
        keyPoints: [
          "Requirement checklist verification dynamically identifies unmet generation needs",
          "Diverse refinement actions (prompt rewriting, noise resampling, editing)",
          "Adaptive inference scaling aligned with semantic complexity",
          "Training-free framework with strong transferability"
        ],
        href: "https://arxiv.org/abs/2603.00483",
        paperLink: "RAISE: Requirement-Adaptive Evolutionary Refinement for Training-Free Text-to-Image Alignment",
      }
    ],
    worthReading: [
      {
        num: 4,
        title: "VGGT-Det: Sensor-Geometry-Free Multi-View Indoor 3D Detection",
        tag: "3D Vision",
        href: "https://arxiv.org/abs/2603.00912",
        description: "Attention-guided query generation and query-driven feature aggregation leverage VGGT internal semantic and geometric priors. Multi-view understanding valuable for camera-free dance scenarios."
      },
      {
        num: 5,
        title: "R-TAP: Recursive Think-Answer Process for LLMs and VLMs",
        tag: "Reasoning",
        href: "https://arxiv.org/abs/2603.02099",
        description: "Confidence generator evaluates response certainty and guides improvements through recursive reasoning cycles. Self-consistency checking applicable to dance generation iterative optimization."
      },
      {
        num: 6,
        title: "V-LCM: Unified Vision-Language Modeling via Concept Space Alignment",
        tag: "Multimodal",
        href: "https://arxiv.org/abs/2603.01096",
        description: "V-SONAR embeds vision-language into unified space, V-LCM uses latent diffusion for next-embedding prediction. Unified multimodal modeling inspires audio-visual-motion joint modeling."
      }
    ],
    observation: "Today's papers reveal a clear trend: generation task optimization is shifting from fixed paradigms to adaptive, demand-driven dynamic strategies. ADE-CoT's difficulty-aware allocation, RAISE's requirement checklist verification, and R-TAP's confidence-guided recursion all embody \"compute-on-demand\" philosophy. This aligns perfectly with music-to-dance needs—lightweight inference for simple beats, deep thinking for complex choreography.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-03-03`,
        'en': `/en/daily/music-to-dance/2026-03-03`,
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
      date="2026-03-03"
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