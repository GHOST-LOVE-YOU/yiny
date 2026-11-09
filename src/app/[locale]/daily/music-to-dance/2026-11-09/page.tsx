import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '频率分解编舞、紧凑人体动作表征与实时骨架补全',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'FFMT 将舞蹈拆分为低频编舞骨架与高频动作残差，并为二者分配不同 token 速率和码本容量',
      'FUHA 学习去外观化的全身紧凑动作嵌入，以前馈 Transformer 实现实时级人体动画',
      'REACT 以因果 S4 自回归模型逐帧补全受遮挡或噪声污染的骨架信号',
      'AGAVE、EgoGeneralist 与 DiaHeads 分别扩展单步视频引导、动作—视频耦合和双人音频驱动协调',
    ],
    papers: [
      {
        num: 1,
        tag: 'Music-to-Dance · 多速率动作 Token',
        title: 'FFMT: Frequency-Factorized Multi-Rate Tokenization for Music-to-Dance Generation',
        keyPoints: [
          '把 root-relative 舞蹈动作显式分解为缓慢变化的低频编舞骨架和互补的高频局部动作残差',
          '低频分支使用更低 token 速率与更小码本，高频分支使用更高 token 速率与更大码本，使表示容量匹配动作频率',
          '采用“先规划、后表达”的自回归分解：先生成粗粒度编舞，再在音乐与低频计划条件下生成局部细节',
          '在 AIST++ 与 FineDance 上报告分布保真度、真实多样性和音乐—动作同步结果，消融支持频率分解、非对称资源分配与低到高条件化',
        ],
        description: '这是本期最直接的 Music-to-Dance 工作。它没有把所有关节和时间尺度压进同一离散序列，而是让低频分支持有编舞结构、高频分支负责踩点细节与局部表现。对工程系统而言，关键价值是把算力预算与动作频率显式绑定，也让长程结构和短时节拍分别可控。摘要中的证据来自 AIST++、FineDance 与消融实验；是否改善更长歌曲上的段落结构仍需阅读全文验证。',
        href: 'https://arxiv.org/abs/2611.07384',
      },
      {
        num: 2,
        tag: '人体动画 · 紧凑动作嵌入',
        title: 'Compact Motion Embeddings for Feed-forward Unified Human Animation',
        keyPoints: [
          '用 Q-Former 将冻结视觉编码器的驱动者特征压缩为覆盖面部、手部与全身关节的紧凑动作嵌入',
          '以对比损失将嵌入拉向同一动作的关键点渲染、推离同一人物的其他姿态，从而抑制驱动者外观泄漏',
          '推理阶段不依赖外部姿态估计器、关键点或参数化人体模型，可统一处理面部、上半身和全身动画',
          '论文报告 512×512、单张 RTX 4090 上最高 38.9 FPS；上半身基准各项自重演指标和跨身份相似度均优于比较基线',
        ],
        description: 'FUHA 解决的是舞蹈视频渲染链路中的动作接口问题：驱动动作需要保留手、脸和身体细节，同时不能把驱动者身份带给目标人物。紧凑、去外观化的嵌入可作为音乐生成动作与最终人物动画之间的中间层，前馈推理也适合互动预览。其主要结果集中在重演与上半身基准，并非音乐条件生成；用于快速舞蹈时仍需检查脚部接触、极端姿态和长时身份稳定性。',
        href: 'https://arxiv.org/abs/2611.07481',
      },
      {
        num: 3,
        tag: '骨架动作 · 因果实时补全',
        title: 'REACT: Towards Real-Time Completion of Skeletal Motion Signals',
        keyPoints: [
          '面向廉价动捕中的遮挡、高频噪声、漂移等问题，逐帧因果运行且不使用未来帧',
          '以 S4 自回归模型协调互补动作估计，并根据输入可靠性施加约束，内部信号具有可解释性',
          '在不同遮挡强度下与多种因果基线及架构变体比较，同时报告推理延迟',
          '结果强调重建精度、更新平滑度和交互延迟之间的折中，并分析缺失观测时融合行为的变化',
        ],
        description: 'Music-to-Dance 系统不仅需要生成，还需要可靠地接收舞者示范、在线控制或低带宽骨架流。REACT 的无前视补全可放在动作采集与生成模型之间，减少缺失关节和高频噪声对节拍对齐及渲染稳定性的破坏。论文定位是动作信号修复而非编舞生成，因此它应作为数据与实时控制基础设施评估，尤其要测量补全是否会过度平滑真正的快速舞步。',
        href: 'https://arxiv.org/abs/2611.08301',
      },
    ],
    worthReading: [
      { num: 1, title: 'Guidance Is a Field, Not a Scalar: Interval-Integrated Classifier-Free Guidance for One-Step Video Generation', tag: '单步视频生成 · 时空引导', href: 'https://arxiv.org/abs/2611.07566', description: 'AGAVE 将随噪声、空间内容和帧位置变化的引导场编译进 MeanFlow 区间目标，以不到十个额外标量和零推理开销加入时间调度、运动显著性调制及帧位置非对称性。论文在 VBench、UCF-101 与 MSR-VTT 上优于单步基线；对舞蹈视频的价值在低延迟时空引导，但尚未验证音乐同步。' },
      { num: 2, title: 'EgoGeneralist: Unifying Egocentric Action-Video Tasks through Video-Native Modeling', tag: '动作—视频联合建模 · 3D 控制', href: 'https://arxiv.org/abs/2611.08477', description: '以视频原生动作渲染器把度量 3D 运动同时变成空间控制信号和可恢复目标，并通过轻量跨流耦合统一动作条件视频生成、姿态估计及联合生成。它面向第一视角交互而非舞蹈，但为“动作表示既可驱动又可反演”的闭环接口提供参考。' },
      { num: 3, title: 'DiaHeads: Jointly Generating Coordinated 3D Dialogue Heads with Non-verbal Cues from Dual Audio', tag: '双人音频驱动 · 协调动作', href: 'https://arxiv.org/abs/2611.06970', description: '联合解码双路音频，以凝视、摇头、点头和微笑四类离散线索约束共享潜空间，并用流式先验建立时间依赖。CANDOR-FG 实验和用户研究将优势归因于人际协调而非单人动作保真度；其双主体条件机制可迁移到群舞互动，但输入是对话音频且输出仅为头部。' },
    ],
    observation: '本次周一采集覆盖上一个工作日以来的新稿，arXiv 与 Hugging Face Daily Papers 均成功，JSON 未记录来源告警。最明确的趋势是把动作的不同时间尺度和功能拆开建模：FFMT 分离编舞骨架与局部细节，FUHA 分离动作与外观，REACT 分离观测可靠性与补全估计。三者分别对应生成表示、渲染接口和实时输入质量，可组成更清晰的 Music-to-Dance 技术栈。候选池中大量论文仅因 motion、pose、diffusion 或 temporal 命中，已排除与人体动作、音画协调或相关视频生成无直接关系的工作。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Frequency-Factorized Choreography, Compact Human Motion, and Real-Time Skeleton Completion',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'FFMT splits dance into a low-frequency choreographic scaffold and high-frequency motion residuals with different token rates and codebook capacities',
      'FUHA learns a compact appearance-disentangled whole-human motion embedding for real-time-capable feed-forward animation',
      'REACT completes occluded or noisy skeletal motion causally, frame by frame, with an S4 autoregressive model',
      'AGAVE, EgoGeneralist, and DiaHeads extend one-step video guidance, action-video coupling, and dual-audio coordination',
    ],
    papers: [
      {
        num: 1,
        tag: 'Music-to-Dance · Multi-Rate Motion Tokens',
        title: 'FFMT: Frequency-Factorized Multi-Rate Tokenization for Music-to-Dance Generation',
        keyPoints: [
          'Explicitly decomposes root-relative dance motion into a slowly varying low-frequency choreography scaffold and a complementary high-frequency local-motion residual',
          'Assigns a lower token rate and smaller codebook to the low-frequency branch, and a higher rate and larger codebook to high-frequency detail',
          'Uses a plan-then-articulate autoregressive factorization: coarse choreography is generated first, then local detail is conditioned on both the plan and music',
          'Reports distributional fidelity, realistic diversity, and music-motion synchronization on AIST++ and FineDance; ablations support frequency factorization, asymmetric allocation, and low-to-high conditioning',
        ],
        description: 'This is the issue\'s most direct Music-to-Dance paper. Instead of compressing every joint and temporal scale into one discrete sequence, it gives long-range choreography and short-lived expressive detail separate representational budgets. That design makes compute allocation explicit and offers independent control over structure and beat-level articulation. The abstract supports its claims with AIST++, FineDance, and ablations; behavior over song-length section structure still requires examination in the full paper.',
        href: 'https://arxiv.org/abs/2611.07384',
      },
      {
        num: 2,
        tag: 'Human Animation · Compact Motion Embedding',
        title: 'Compact Motion Embeddings for Feed-forward Unified Human Animation',
        keyPoints: [
          'Uses a Q-Former to compress driver features from a frozen visual encoder into a compact embedding covering face, hands, and full-body articulation',
          'Applies a contrastive objective that pulls the embedding toward a rendered keypoint view of the same motion and away from another pose of the same person, suppressing appearance leakage',
          'Handles face, upper-body, and full-body animation without external pose estimators, keypoints, or parametric body models at inference time',
          'Reports up to 38.9 FPS at 512x512 on one RTX 4090 and leads all compared self-reenactment metrics plus cross-reenactment identity similarity on its upper-body benchmark',
        ],
        description: 'FUHA addresses the motion interface in a dance-video rendering pipeline: a driver representation must retain hand, face, and body articulation without transferring the driver\'s identity. Its compact appearance-disentangled embedding could sit between music-conditioned motion generation and target-person animation, while feed-forward inference supports interactive preview. The strongest results concern reenactment and upper-body evaluation rather than music-conditioned generation, so foot contact, extreme dance poses, and long-horizon identity stability remain important tests.',
        href: 'https://arxiv.org/abs/2611.07481',
      },
      {
        num: 3,
        tag: 'Skeletal Motion · Causal Real-Time Completion',
        title: 'REACT: Towards Real-Time Completion of Skeletal Motion Signals',
        keyPoints: [
          'Targets occlusion, high-frequency noise, drift, and related failures in affordable motion capture while operating causally without look-ahead',
          'Uses an S4-based autoregressive model to coordinate complementary motion estimates under reliability-dependent constraints and exposes interpretable internal signals',
          'Compares against causal baselines and architectural variants across multiple occlusion severities while reporting inference latency',
          'Characterizes the trade-off among reconstruction accuracy, update smoothness, and interactive latency, including fusion behavior under missing observations',
        ],
        description: 'A Music-to-Dance system must not only generate motion; it may also ingest dancer demonstrations, online controls, or low-bandwidth skeleton streams. REACT can sit between capture and generation to reduce missing-joint and high-frequency artifacts that would otherwise damage beat alignment and rendering stability. It is a motion-signal repair system rather than a choreography model, so evaluation should focus on whether completion preserves genuinely fast dance movements instead of smoothing them away.',
        href: 'https://arxiv.org/abs/2611.08301',
      },
    ],
    worthReading: [
      { num: 1, title: 'Guidance Is a Field, Not a Scalar: Interval-Integrated Classifier-Free Guidance for One-Step Video Generation', tag: 'One-Step Video · Spatiotemporal Guidance', href: 'https://arxiv.org/abs/2611.07566', description: 'AGAVE compiles guidance that varies over noise, spatial content, and frame position into the MeanFlow interval target, adding a temporal schedule, motion-saliency modulation, and frame asymmetry with fewer than ten scalars and no inference overhead. It beats one-step baselines on VBench, UCF-101, and MSR-VTT; the dance-video value is low-latency spatiotemporal guidance, not demonstrated music synchronization.' },
      { num: 2, title: 'EgoGeneralist: Unifying Egocentric Action-Video Tasks through Video-Native Modeling', tag: 'Action-Video Modeling · 3D Control', href: 'https://arxiv.org/abs/2611.08477', description: 'A video-native action renderer makes metric 3D motion both a spatial control and a recoverable target, while lightweight cross-stream coupling unifies action-conditioned video generation, pose estimation, and joint generation. It targets egocentric interaction rather than dance, but offers a useful closed-loop interface in which motion can both drive and be recovered from video.' },
      { num: 3, title: 'DiaHeads: Jointly Generating Coordinated 3D Dialogue Heads with Non-verbal Cues from Dual Audio', tag: 'Dual-Audio Motion · Interpersonal Coordination', href: 'https://arxiv.org/abs/2611.06970', description: 'Jointly decodes two audio streams, constrains a shared latent space with gaze, head-shake, nod, and smile cues, and uses a flow prior for temporal dependence. CANDOR-FG experiments and a user study attribute gains to interpersonal coordination rather than individual fidelity. Its multi-person conditioning may transfer to group dance, but the input is dialogue audio and the output is limited to heads.' },
    ],
    observation: 'This Monday run covers new work since the previous business day. Both arXiv and Hugging Face Daily Papers succeeded, and the JSON recorded no source warnings. The clearest trend is functional separation across motion timescales and interfaces: FFMT separates choreographic structure from local detail, FUHA separates motion from appearance, and REACT separates observation reliability from completion. Together they map to representation, rendering, and live-input quality in a cleaner Music-to-Dance stack. Many collected papers matched only broad terms such as motion, pose, diffusion, or temporal; work without a direct connection to human motion, audiovisual coordination, or relevant video generation was excluded.',
  },
}

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const c = content[locale]
  return {
    title: c.title,
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/music-to-dance/2026-11-09',
        en: '/en/daily/music-to-dance/2026-11-09',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-11-09" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
      <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
