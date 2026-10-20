import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '动态空间音频驱动动作、长视频抗漂移与离散运动控制',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'MOMO 首次系统建模移动声源的空间线索、声音语义与三维人体反应动作',
      'Clean Forcing 用冻结基座上的轻量校正器显著抑制长时自回归视频漂移',
      'ViMoLa 将稠密轨迹压缩为离散运动 token，为冻结视频扩散模型补足动作控制',
      '本期为周一版，覆盖 10 月 17 日至 19 日提交的新论文',
    ],
    papers: [
      {
        num: 1,
        tag: '空间音频 · 人体动作扩散',
        title: 'MOMO: Human Motion from Moving Sounds',
        keyPoints: [
          '提出动态空间音频驱动人体动作生成任务，并发布同步双耳音频、三维动作与移动声源轨迹的 DySAM 数据集和基准',
          '另建 DySAL 辅助数据集，将多样声音事件、头部姿态与移动声源轨迹配对，以训练空间声源感知',
          'MOMO 从原始双耳音频估计头部中心的动态方向线索，并把它与逐帧音频内容表示共同注入动作扩散模型',
          '实验报告其在动作保真度、音频—动作对齐和物理合理性上均优于现有基线',
        ],
        description: '这是本期与 Music-to-Dance 最直接相关的工作。它把音频条件从“听到了什么”扩展到“声音从哪里来、如何移动”，使生成身体能够同时响应语义和空间轨迹。对舞蹈系统而言，双耳方向线索可进一步编码舞者面向、头部转向和重心迁移；DySAM 的同步三元组也提供了比单纯节拍监督更丰富的时序约束。需要注意，它建模的是广义声音反应而非音乐编舞，后续仍需验证节拍结构、风格与长段落编排。',
        href: 'https://arxiv.org/abs/2610.24522v1',
      },
      {
        num: 2,
        tag: '长视频生成 · 抗漂移校正',
        title: 'Clean Forcing: Drift-Resistant Autoregressive Video Diffusion with a Frozen Base',
        keyPoints: [
          '发现自回归视频扩散中的反事实速度差约 95% 可跨噪声种子系统复现，说明长时漂移很大程度上可学习',
          '在冻结基座上训练 5.9M 参数 LoRA 校正器，并用 DAgger 式数据聚合与漂移收缩目标让模型接触自身滚动误差',
          '干净历史可直接来自基座的一次性生成，因此无需真实视频也能训练；合并 LoRA 后不增加推理成本',
          '在 50 秒文本到视频实验中，无真实视频时将 Δ-drift 从 +11.3 降至 +1.65，加入 40 个真实片段后降至 -0.16',
        ],
        description: '长舞蹈视频最常见的失效不是单帧画质，而是动作、身份和场景误差随片段递归累积。Clean Forcing 把这种漂移视为可回归的历史条件偏差，并在不重训大模型的情况下闭环修正。它适合迁移到自回归舞蹈视频生成器：可针对身体结构、服饰和动作相位定义专门的漂移收缩信号。不过论文只验证文本到视频，音乐条件下还应单独检查校正器是否保留节拍同步与跨段动作连续性。',
        href: 'https://arxiv.org/abs/2610.25634v1',
      },
      {
        num: 3,
        tag: '离散运动 Token · 视频扩散控制',
        title: 'ViMoLa: Discrete Motion Tokens for Language-Guided Video Generation',
        keyPoints: [
          '用空间 VQ 自编码器把稠密轨迹压缩为 64 个离散 token，码本规模为 512，再由 28M 参数 Transformer 从文本预测运动先验',
          '通过零门控交叉注意力适配器向冻结 Wan 2.2 DiT 的各层注入运动 token，无需改动视频生成基座',
          '在 462K 视频上训练后，方向准确率由 0.287 提升至 0.442；低秩适配版本以 1.45% 额外前向 FLOPs 达到 0.428',
          '同一 tokenizer 与语言模型可迁移到 CogVideoX；但 oracle token 仅达 0.531，复合运动和 token—patch 对应仍有限',
        ],
        description: 'ViMoLa 给出了一条将动作结构显式离散化、再接入冻结视频模型的低成本路线。Music-to-Dance 可以把文本预测器替换为音乐编码器，让节拍、乐句或风格先映射到运动 token，再由视频扩散模型负责外观渲染。论文的消融说明匹配提示的 token 内容确实重要，但当前 token 没有显式绑定身体区域，复杂舞步的局部相位控制仍是关键缺口。',
        href: 'https://arxiv.org/abs/2610.25595v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'OmniGround: Strengthening Omni-Modal Temporal Grounding via Attention-Consistency Training', tag: '音视频定位 · 注意力一致性', href: 'https://arxiv.org/abs/2610.25929v1', description: '发现模型内部注意力比最终生成的时间戳定位更准确，并用 TACG 将注意力、预测与标注对齐；LongVALE/UnAV-100 达到 37.5/35.7 mIoU，可借鉴为音乐事件与舞蹈片段建立可监督的时间锚点。' },
      { num: 2, title: 'InteractAgent: Agentic Human Motion Interaction with Memory-Augmented Reflection', tag: '长时人体动作 · 闭环纠错', href: 'https://arxiv.org/abs/2610.25649v1', description: '以同一多模态模型负责规划与评估，结合在线观察和记忆反思控制冻结 MotionLLM 的继续、重做或重规划；其长时闭环纠错可用于修复舞蹈序列中的穿模与累积执行误差。' },
      { num: 3, title: 'Vision as Proprioception: Estimating Humanoid Robot Pose from Video', tag: '视频姿态恢复 · 动作数据', href: 'https://arxiv.org/abs/2610.25288v1', description: '融合人体姿态特征与机器人运动学，从视频恢复世界坐标中的全身关节配置；在三种真实人形平台上将关节角误差相对最佳基线降低 18–32%，并开放代码，可用于从生成视频回收结构化动作以做质量检查。' },
      { num: 4, title: 'CASE: Complementary Articulation-Aware Speech Encoder to Enhance Speech-Driven 3D Facial Animation', tag: '语音驱动动画 · 几何对齐', href: 'https://arxiv.org/abs/2610.25342v1', description: '以连续三维唇网格潜变量对比适配语音编码器，再通过残差交叉注意力融合原有表示；四个 VOCASET 基线的唇顶点误差降低 2.8–6.0%，显示几何对齐预训练可补足通用音频表征。' },
    ],
    observation: '本期从条件、生成与反馈三个环节形成一条清晰链路：MOMO 将声音语义与动态空间位置共同变成动作条件，ViMoLa 把运动结构离散化后注入冻结视频扩散模型，Clean Forcing 则在长时滚动生成中学习并收缩历史误差。配合 OmniGround 的时间锚定和视频姿态回收，可以构成“音乐事件定位—运动 token 规划—视频渲染—动作与漂移审计”的模块化闭环。当前最值得补齐的是音乐特有的拍点、乐句和风格监督，以及身体区域与离散运动 token 的显式对应。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Motion from Dynamic Spatial Audio, Drift-Resistant Long Video, and Discrete Motion Control',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'MOMO jointly models moving-sound spatial cues, audio semantics, and reactive 3D human motion',
      'Clean Forcing suppresses long-horizon autoregressive video drift with a lightweight corrector on a frozen base',
      'ViMoLa compresses dense trajectories into discrete motion tokens to add motion control to frozen video diffusion',
      'This Monday edition covers new submissions from October 17–19',
    ],
    papers: [
      {
        num: 1,
        tag: 'Spatial Audio · Human Motion Diffusion',
        title: 'MOMO: Human Motion from Moving Sounds',
        keyPoints: [
          'Introduces dynamic spatial-audio-driven human motion generation and DySAM, a benchmark pairing binaural audio, 3D motion, and moving-source trajectories',
          'Adds DySAL, an auxiliary dataset pairing diverse acoustic events with head poses and moving-source trajectories for spatial perception',
          'Estimates head-centric dynamic direction cues directly from raw binaural audio and conditions motion diffusion on them together with frame-wise audio content',
          'Reports improvements over existing baselines in motion fidelity, audio-motion alignment, and physical plausibility',
        ],
        description: 'This is the edition’s most direct contribution to music-to-dance. It expands audio conditioning from what is heard to where a sound is and how it moves, allowing the body to respond to both semantics and spatial trajectories. For dance systems, binaural direction can supervise facing, head turns, and weight shifts, while DySAM provides richer temporal constraints than beat labels alone. The task concerns general sound reactions rather than musical choreography, so rhythm, style, and long-form phrase structure still require dedicated validation.',
        href: 'https://arxiv.org/abs/2610.24522v1',
      },
      {
        num: 2,
        tag: 'Long Video · Drift Correction',
        title: 'Clean Forcing: Drift-Resistant Autoregressive Video Diffusion with a Frozen Base',
        keyPoints: [
          'Finds that about 95% of the counterfactual velocity gap is systematic across noise seeds, indicating that long-video drift is largely learnable',
          'Trains a 5.9M-parameter LoRA corrector on a frozen base, then exposes it to its own rollouts through DAgger-style aggregation and a drift-contraction objective',
          'Can obtain clean histories from the base model’s own single-shot generations, requiring no real video, and adds no inference cost after merging',
          'On 50-second text-to-video generation, reduces Δ-drift from +11.3 to +1.65 without real video and to -0.16 with 40 real clips',
        ],
        description: 'The dominant failure in long dance videos is often accumulated motion, identity, and scene error rather than isolated frame quality. Clean Forcing treats drift as a regressable history-conditioned bias and corrects it without retraining the large base model. The approach could be adapted to autoregressive dance generators with contraction signals for body structure, clothing, and motion phase. Since evaluation is text-conditioned, music-driven use must still verify that correction preserves beat synchronization and cross-segment movement continuity.',
        href: 'https://arxiv.org/abs/2610.25634v1',
      },
      {
        num: 3,
        tag: 'Discrete Motion Tokens · Video Diffusion Control',
        title: 'ViMoLa: Discrete Motion Tokens for Language-Guided Video Generation',
        keyPoints: [
          'Compresses dense trajectories into 64 discrete tokens from a 512-entry codebook and predicts them from text with a 28M-parameter transformer',
          'Injects the motion tokens into every frozen Wan 2.2 DiT block using zero-gated cross-attention adapters',
          'Raises directional accuracy from 0.287 to 0.442 after training on 462K videos; a low-rank version reaches 0.428 with 1.45% extra forward FLOPs',
          'Transfers the tokenizer and language model to CogVideoX, while oracle accuracy of 0.531 and weaker compound-motion gains expose remaining limits',
        ],
        description: 'ViMoLa offers a low-cost path for explicitly discretizing motion structure before attaching it to a frozen video model. A music-to-dance system could replace the language predictor with a music encoder that maps beats, phrases, or style into motion tokens, leaving appearance rendering to video diffusion. Its ablations show that prompt-matched token content matters, but the tokens are not explicitly tied to body regions, leaving local phase control for complex choreography unresolved.',
        href: 'https://arxiv.org/abs/2610.25595v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'OmniGround: Strengthening Omni-Modal Temporal Grounding via Attention-Consistency Training', tag: 'Audio-Visual Grounding · Attention Consistency', href: 'https://arxiv.org/abs/2610.25929v1', description: 'Shows that internal attention localizes time better than generated timestamps and uses TACG to align attention, prediction, and labels. Its 37.5/35.7 mIoU on LongVALE/UnAV-100 suggests a route to supervised temporal anchors between musical events and dance segments.' },
      { num: 2, title: 'InteractAgent: Agentic Human Motion Interaction with Memory-Augmented Reflection', tag: 'Long-Horizon Motion · Closed-Loop Recovery', href: 'https://arxiv.org/abs/2610.25649v1', description: 'Uses one multimodal model for planning and evaluation, combining online observation and memory-augmented reflection to continue, redo, or replan a frozen MotionLLM. Its closed-loop recovery could address penetration and accumulated execution errors in long dance sequences.' },
      { num: 3, title: 'Vision as Proprioception: Estimating Humanoid Robot Pose from Video', tag: 'Video Pose Recovery · Motion Data', href: 'https://arxiv.org/abs/2610.25288v1', description: 'Combines human-pose features with robot kinematics to recover world-space full-body configurations from video. It cuts joint-angle error by 18–32% against the best baseline on three real humanoids and releases code, making it useful for recovering structured motion from generated video for quality control.' },
      { num: 4, title: 'CASE: Complementary Articulation-Aware Speech Encoder to Enhance Speech-Driven 3D Facial Animation', tag: 'Speech-Driven Animation · Geometry Alignment', href: 'https://arxiv.org/abs/2610.25342v1', description: 'Contrastively adapts a speech encoder against continuous 3D lip-mesh latents, then fuses it with the original representation through residual cross-attention. Lip vertex error falls by 2.8–6.0% across four VOCASET baselines, showing how geometry-aligned pretraining can complement generic audio features.' },
    ],
    observation: 'This edition forms a clear chain across conditioning, generation, and feedback. MOMO turns audio semantics and dynamic spatial position into motion conditions; ViMoLa discretizes motion structure before injecting it into frozen video diffusion; and Clean Forcing learns to contract history-induced error during long rollouts. Together with OmniGround-style temporal anchors and pose recovery from generated video, these pieces suggest a modular loop of musical-event localization, motion-token planning, video rendering, and motion/drift auditing. The main missing pieces are music-specific supervision for beats, phrases, and style, plus explicit correspondence between body regions and discrete motion tokens.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-20',
        en: '/en/daily/music-to-dance/2026-10-20',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-20" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>
        {c.papers.map(paper => (
          <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}>
            <KeyPoints points={paper.keyPoints} />
            <p className="text-[#2C2C24] leading-relaxed">{paper.description}</p>
            <PaperLink href={paper.href} title={paper.title} />
          </Paper>
        ))}
      </MustRead>

      <WorthReading>
        {c.worthReading.map(item => (
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>
            {item.description}
          </NotableItem>
        ))}
      </WorthReading>

      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
