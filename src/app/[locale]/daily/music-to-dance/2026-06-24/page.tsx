import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'
import { getUI, type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: "Music-to-Dance 视频生成研究者",
    title: "图像到视频安全、时序扩散与音乐表征学习",
    overview: [
      "I2V生成安全基准为参考图像驱动的舞蹈视频生成提供鲁棒性评估框架",
      "时序扩散模型在自动驾驶中的联合感知-规划方法可迁移到音视频对齐",
      "频率感知的音乐表征学习为舞蹈生成中的音频特征提取提供新思路"
    ],
    papers: [],
    worthReading: [
      {
        num: 1,
        title: "VPA-Guard：防御图像到视频生成的视觉提示攻击",
        tag: "I2V安全",
        href: "https://arxiv.org/abs/2606.25592",
        description: "首个系统评估视觉中心提示攻击下视频生成安全性的基准测试，发现Wan 2.7和Veo 3.1对视觉提示攻击的ASR分别达100%和74.8%。提出的VPA-Guard防御框架通过少样本推理识别潜在恶意意图，平均降低ASR 44.2%。对于舞蹈生成系统，该框架可帮助识别和防御针对参考图像的对抗性攻击，提升生成视频的鲁棒性。",
      },
      {
        num: 2,
        title: "UniTeD：统一时序扩散实现联合感知与规划",
        tag: "时序扩散",
        href: "https://arxiv.org/abs/2606.25736",
        description: "将扩散模型从仅用于规划模块扩展到联合建模感知与规划，通过共享生成空间中的迭代去噪实现双向信息交换。时间过渡模块(TTM)解决历史帧与当前帧的噪声级不匹配问题。该方法的核心思想——在共享生成空间中联合建模多个相关任务——可直接应用于舞蹈生成中的音频-运动联合建模。",
      },
      {
        num: 3,
        title: "H-Adapter：姿态鲁棒的发型迁移",
        tag: "外观保持",
        href: "https://arxiv.org/abs/2606.25578",
        description: "通过区域特定损失解耦头发与非头发目标，诱导空间解耦的交叉注意力，从中导出源对齐的头发编辑掩码指导基于扩散的修复。在姿态差异下实现最佳FID和CLIP-I分数。该姿态鲁棒的外观迁移技术可直接迁移到舞蹈生成：解决参考人物图与生成视频之间大姿态差异下的身份保持问题。",
      },
      {
        num: 4,
        title: "频率感知的自监督音乐表征学习",
        tag: "音乐表征",
        href: "https://arxiv.org/abs/2606.25713",
        description: "针对音乐信号的多尺度时序结构，提出频率感知的自监督学习框架，在不同频率带上学习层次化表征。该方法可为舞蹈生成中的音频节拍检测和音乐风格理解提供更精准的特征表示，改善当前3D Audio Attention机制中的音频特征提取。",
      },
      {
        num: 5,
        title: "DiffRhythm：快速可控的音乐生成",
        tag: "音乐生成",
        href: "https://arxiv.org/abs/2606.25408",
        description: "基于扩散模型的高速音乐生成系统，支持通过文本和音频提示进行细粒度控制。其条件控制机制——特别是通过CFG进行强度和风格解耦——可为舞蹈生成中的音乐条件控制提供参考，实现更灵活的音频-运动对齐策略。",
      },
      {
        num: 6,
        title: "Vera：分层扩散模型实现内容保持的视频编辑",
        tag: "视频编辑",
        href: "https://arxiv.org/abs/2606.23610",
        description: "分层扩散架构将视频分解为内容层和编辑层，实现内容保持的局部编辑。该分层思想可应用于舞蹈生成：将人物外观作为内容层、舞蹈动作作为编辑层，实现外观保持与动作变化的解耦控制。",
      },
      {
        num: 7,
        title: "Social Structure Matters：3D人体交互生成",
        tag: "人体生成",
        href: "https://arxiv.org/abs/2606.24255",
        description: "在3D人体-人体交互生成中引入社交结构建模，学习人物间的空间关系和互动模式。该方法可扩展到多人舞蹈场景生成，建模舞者间的编队关系和互动动作，丰富舞蹈视频的表现力。",
      },
      {
        num: 8,
        title: "自适应振荡归纳偏置用于扩散TTS的韵律建模",
        tag: "扩散音频",
        href: "https://arxiv.org/abs/2606.25424",
        description: "引入自适应振荡非线性激活函数，在扩散TTS解码器中建模急剧的韵律过渡和快速音高变化。该技术可为舞蹈生成中的音频节拍锐度建模提供借鉴，改善音乐节拍与动作切换的对齐精度。",
      },
      {
        num: 9,
        title: "Lift4D：单视图3D估计的4D野外重建",
        tag: "3D重建",
        href: "https://arxiv.org/abs/2606.23688",
        description: "协调单视图3D估计实现野外视频的4D重建，统一处理几何估计和时序一致性。其4D重建流程可为舞蹈视频中的3D人体运动估计和时空一致性保持提供技术参考。",
      },
      {
        num: 10,
        title: "FeVOS：预见性表达视频对象分割",
        tag: "视频理解",
        href: "https://arxiv.org/abs/2606.25585",
        description: "提出预见性表达视频对象分割任务，要求模型基于时空线索推理预测未来事件。该预测性推理能力可应用于舞蹈生成中的动作预判，帮助模型学习更自然的动作过渡和节拍对齐。",
      },
    ],
    observation: "今日论文呈现三个与Music-to-Dance生成相关的技术方向：（1）I2V安全与鲁棒性（VPA-Guard）为参考图像驱动的舞蹈生成提供了对抗性防御思路；（2）时序扩散联合建模（UniTeD）和分层视频编辑（Vera）为音频-运动联合建模与解耦控制提供了架构参考；（3）音乐表征学习（频率感知、DiffRhythm）和姿态鲁棒外观迁移（H-Adapter）可直接改善当前方案中的音频特征提取和身份保持问题。",
  },
  en: {
    roleName: "Music-to-Dance Video Generation Researcher",
    title: "I2V Safety, Temporal Diffusion & Music Representation Learning",
    overview: [
      "I2V generation safety benchmarks provide robustness evaluation frameworks for reference image-driven dance video generation",
      "Temporal diffusion models for joint perception-planning in autonomous driving can be transferred to audio-visual alignment",
      "Frequency-aware music representation learning offers new directions for audio feature extraction in dance generation"
    ],
    papers: [],
    worthReading: [
      {
        num: 1,
        title: "VPA-Guard: Defending Image-to-Video Generation Against Visual Prompt Attacks",
        tag: "I2V Safety",
        href: "https://arxiv.org/abs/2606.25592",
        description: "First systematic benchmark evaluating video generation safety under vision-centric prompt attacks, finding ASR of 100% on Wan 2.7 and 74.8% on Veo 3.1. The proposed VPA-Guard defense reduces ASR by 44.2% through few-shot reasoning. For dance generation systems, this framework helps identify and defend against adversarial attacks on reference images, improving generated video robustness.",
      },
      {
        num: 2,
        title: "UniTeD: Unified Temporal Diffusion for Joint Perception and Planning",
        tag: "Temporal Diffusion",
        href: "https://arxiv.org/abs/2606.25736",
        description: "Extends diffusion models from planning-only to joint perception-planning modeling through iterative denoising in shared generative space with bidirectional information exchange. Temporal Transition Module (TTM) resolves noise-level mismatch between historical and current frames. The core idea—jointly modeling multiple related tasks in shared generative space—can be directly applied to audio-motion joint modeling in dance generation.",
      },
      {
        num: 3,
        title: "H-Adapter: Pose-Robust Hairstyle Transfer",
        tag: "Appearance Preservation",
        href: "https://arxiv.org/abs/2606.25578",
        description: "Decouples hair and non-hair objectives through region-specific losses, inducing spatially disentangled cross-attention for source-aligned hair editing masks. Achieves best FID and CLIP-I scores under pose differences. This pose-robust appearance transfer can be directly transferred to dance generation: addressing identity preservation under large pose differences between reference images and generated videos.",
      },
      {
        num: 4,
        title: "Frequency-Aware Self-Supervised Music Representation Learning",
        tag: "Music Representation",
        href: "https://arxiv.org/abs/2606.25713",
        description: "Proposes frequency-aware self-supervised learning framework targeting multi-scale temporal structures in music signals, learning hierarchical representations across frequency bands. This method can provide more precise feature representations for audio beat detection and music style understanding in dance generation, improving audio feature extraction in current 3D Audio Attention mechanisms.",
      },
      {
        num: 5,
        title: "DiffRhythm: Fast and Controllable Music Generation",
        tag: "Music Generation",
        href: "https://arxiv.org/abs/2606.25408",
        description: "High-speed diffusion-based music generation system supporting fine-grained control through text and audio prompts. Its conditional control mechanisms—particularly intensity and style disentanglement via CFG—provide reference for music conditional control in dance generation, enabling more flexible audio-motion alignment strategies.",
      },
      {
        num: 6,
        title: "Vera: Layered Diffusion for Content-Preserving Video Editing",
        tag: "Video Editing",
        href: "https://arxiv.org/abs/2606.23610",
        description: "Layered diffusion architecture decomposes video into content and editing layers for content-preserving local editing. This layering concept can be applied to dance generation: treating person appearance as content layer and dance motion as editing layer, achieving decoupled control of appearance preservation and motion variation.",
      },
      {
        num: 7,
        title: "Social Structure Matters in 3D Human-Human Interaction Generation",
        tag: "Human Generation",
        href: "https://arxiv.org/abs/2606.24255",
        description: "Introduces social structure modeling in 3D human-human interaction generation, learning spatial relationships and interaction patterns between people. This method can be extended to multi-person dance scene generation, modeling formation relationships and interactive movements between dancers, enriching dance video expressiveness.",
      },
      {
        num: 8,
        title: "Adaptive Oscillatory Inductive Bias for Diffusion TTS Prosody Modeling",
        tag: "Diffusion Audio",
        href: "https://arxiv.org/abs/2606.25424",
        description: "Introduces adaptive oscillatory nonlinearity in diffusion TTS decoders for modeling sharp prosodic transitions and rapid pitch variations. This technique can inform audio beat sharpness modeling in dance generation, improving alignment precision between music beats and motion transitions.",
      },
      {
        num: 9,
        title: "Lift4D: Harmonizing Single-View 3D Estimation for 4D Reconstruction",
        tag: "3D Reconstruction",
        href: "https://arxiv.org/abs/2606.23688",
        description: "Coordinates single-view 3D estimation for 4D reconstruction from in-the-wild videos, unified handling of geometric estimation and temporal consistency. Its 4D reconstruction pipeline provides technical reference for 3D human motion estimation and spatio-temporal consistency preservation in dance videos.",
      },
      {
        num: 10,
        title: "FeVOS: Foresight Expression Video Object Segmentation",
        tag: "Video Understanding",
        href: "https://arxiv.org/abs/2606.25585",
        description: "Proposes foresight expression video object segmentation requiring models to predict future events based on spatio-temporal cues. This predictive reasoning capability can be applied to motion anticipation in dance generation, helping models learn more natural motion transitions and beat alignment.",
      },
    ],
    observation: "Today's papers present three technical directions relevant to Music-to-Dance generation: (1) I2V safety and robustness (VPA-Guard) provides adversarial defense insights for reference image-driven dance generation; (2) Temporal diffusion joint modeling (UniTeD) and layered video editing (Vera) offer architectural references for audio-motion joint modeling and decoupled control; (3) Music representation learning (frequency-aware, DiffRhythm) and pose-robust appearance transfer (H-Adapter) can directly improve audio feature extraction and identity preservation in current approaches.",
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
        'zh-CN': `/zh/daily/music-to-dance/2026-06-24`,
        'en': `/en/daily/music-to-dance/2026-06-24`,
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
      date="2026-06-24"
      roleId="music-to-dance"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
      <MustRead>
        <div className="text-muted-foreground italic">
          {locale === 'zh' 
            ? '今日无 must_read 级别论文（评分≥7），以下是值得关注的论文。' 
            : 'No must_read papers today (score≥7). Below are papers worth reading.'}
        </div>
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
