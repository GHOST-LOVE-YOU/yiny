import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '音频语义驱动全身动作、反应时序监督与长时视频蒸馏',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'ECHO-G 以帧级声学特征和词级文本共同驱动机器人全身动作，为音乐节奏与语义分层条件提供直接参照',
      'GLARE 把反应是否发生、何时发生和视觉质量分开评测，将音频驱动动作的时序正确性置于核心位置',
      'Radian 用视觉基础模型特征中的真实数据对抗监督，缓解少步自回归视频的细节退化、结构漂移与动作不稳定',
      '本期另关注不确定性感知的少步蒸馏、训练自由镜头轨迹控制，以及接触约束的人体运动重定向',
    ],
    papers: [
      {
        num: 1,
        tag: '音频到全身动作 · 整流流',
        title: 'ECHO-G: Embodied Co-speech Humanoid mOtion Generation',
        keyPoints: [
          '提出 Speech-Grounded Diffusion Transformer，同时接收语音音频与带时间戳文本，保留帧级声学和词级语言的不同时间粒度',
          '使用整流流匹配直接在机器人动作空间建模一对多的语句—动作关系，避免先生成真人动作再重定向',
          '构建源自 BEAT2 的音频—文本—机器人数据与基准，覆盖共语特征、机器人动作质量和运行效率',
          '模态消融和视频评分均支持音频与文本联合条件，并在实体人形机器人上完成部署演示',
        ],
        description: '这是今天最接近 Music-to-Dance 核心接口的工作：声学韵律负责细粒度时间驱动，带时间戳文本提供较慢的语义结构，两者共同生成具身全身动作。对应到舞蹈，可将声学分支替换或扩展为拍点、力度与音色特征，将文本分支扩展为歌词、乐段或编舞提示，并直接在目标骨架或机器人关节空间生成。当前任务是共语手势而非舞蹈，评价也不包含舞步多样性、足部接触与音乐拍点命中率；这些是迁移时必须补齐的门槛。',
        href: 'https://arxiv.org/abs/2609.39575',
      },
      {
        num: 2,
        tag: '音频驱动反应 · 时序评测',
        title: 'GLARE: Generating Listening Heads with Appropriate Reactions',
        keyPoints: [
          '整理约 147 小时成对说话者—聆听者视频，并提供 64,557 个事件级反应标注，覆盖点头、摇头、微笑、大笑、皱眉和惊讶',
          '以 Qwen2-Audio 提取韵律条件，并用流匹配 Transformer 构建音频驱动聆听反应基线',
          '加入逐帧反应时序损失，显式监督模型在合适时刻产生合适类别的非语言动作',
          '提出 R-F1、R-tIoU、R-ATD 与 R-FID，分别评估反应发生、时间重叠、非对称偏移及反应区域视觉质量',
        ],
        description: 'GLARE 的价值不只在头像生成，而在于把“看起来会动”与“听到信号后在正确时间做出正确动作”区分开。Music-to-Dance 也常被整体视觉质量掩盖时序错误；其事件级标注与 R-tIoU/R-ATD 思路可映射到重拍、切分音、乐句转折和标志性舞步，尤其适合诊断提前与滞后的非对称代价。限制是动作范围集中于头部和表情，且对话韵律并不等同于音乐节拍；迁移需要全身事件标签及连续节奏层级。',
        href: 'https://arxiv.org/abs/2609.40317',
      },
      {
        num: 3,
        tag: '长时视频生成 · 表征对抗蒸馏',
        title: 'Enhancing Autoregressive Video Generation via Representation Adversarial Distillation',
        keyPoints: [
          '指出少步自回归视频会反复使用早期时间块作为上下文，导致细节退化、结构漂移与动作不稳定持续累积',
          'Radian 在 on-policy DMD 之外，稀疏解码学生 rollout 帧，并在冻结视觉基础模型的多层特征中施加真实数据对抗监督',
          'DMD 负责锚定预训练教师分布，外部表征判别器补充感知与语义梯度；训练后判别组件全部移除，不增加推理成本',
          '基于 Wan2.1-1.3B 覆盖四步分块、一步逐帧和分钟级生成；四步设置达到 VBench 0.8444、VideoAlign 0.8033，并将 VBench-Long 从 0.7805 提升到 0.8041',
        ],
        description: '长舞蹈视频中的手脚畸变、服装身份漂移和动作冻结，正是自回归误差复用的典型后果。Radian 表明，仅在扩散潜空间匹配教师不足以保护解码后的人体细节；冻结视觉模型的多层表征能提供互补监督，而且不增加线上步数。用于舞蹈时，判别表征最好进一步包含人体姿态、身份和节拍敏感编码，否则通用 VFM 可能偏重画面语义而忽略落脚与音乐同步。论文报告的是通用视频指标，尚不能直接证明舞蹈动作的物理或节奏保真。',
        href: 'https://arxiv.org/abs/2609.40037',
      },
    ],
    worthReading: [
      { num: 1, title: 'Uncertainty-Aware Consistency Distillation for Few-Step Video Generation', tag: '少步视频 · 局部不确定性', href: 'https://arxiv.org/abs/2609.39132', description: 'UACD 用两条独立扰动的教师引导路径形成共识目标，以学生直接预测与共识的差异估计局部不确定性，并放松快速时空变化区域的不可靠一致性监督；配合特征对抗与语义对齐，在 LoRA 适配的 50 步 Wan 上实现四步生成。对快速肢体区域有启发，但需防止“降低高不确定区域权重”反而弱化关键舞步。' },
      { num: 2, title: 'PartiCam: Camera Controlled Video Generation with Reward Guidance', tag: '镜头控制 · 粒子引导', href: 'https://arxiv.org/abs/2609.39504', description: '以全局—局部粒子细化改进训练自由的扩散奖励引导，在 SMC 基础上通过粒子过滤重采样兼顾镜头轨迹遵循与样本多样性。舞蹈视频可据此解耦表演者动作与运镜，减少镜头漂移被误判为身体运动；它控制的是相机而非舞者，仍需姿态与音乐条件共同约束。' },
      { num: 3, title: 'TERRA: Terrain-Aware Reconstruction, Retargeting and Control for Musculoskeletal Locomotion', tag: '动作重定向 · 接触约束', href: 'https://arxiv.org/abs/2609.38653', description: '从纯运动学轨迹结合地形先验、接触估计和负自由空间证据恢复支撑几何，并在重定向中加入解剖、肌腱连续性与接触约束；五个数据集形成 9.4 小时训练集并用于统一肌肉驱动控制。它不是音乐生成，但为舞步落地、非平面舞台和物理可执行重定向提供了扎实的约束模板。' },
    ],
    observation: '今天最强的线索是将条件、监督和评测按时间尺度拆开：ECHO-G 分离帧级声学与词级语义，GLARE 分离反应类别、发生时刻与局部视觉质量，Radian 分离扩散教师锚定与解码视频的外部表征监督。对 Music-to-Dance，可形成“音乐多尺度条件 → 目标骨架动作 → 视频外观”的三级链路，并在每一级保留独立可核验指标。今天没有直接以音乐生成舞蹈的新论文，因此不把共语动作或通用视频分数包装成舞蹈性能。arXiv 与 Hugging Face Daily Papers 均成功采集；合并后的候选中 arXiv 覆盖 76 条、Hugging Face 覆盖 25 条（含 1 条跨来源重复），本期精选的新稿均以 arXiv 摘要页复核。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Audio-Semantic Full-Body Motion, Reaction Timing Supervision, and Long-Video Distillation',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'ECHO-G combines frame-level acoustics and word-level text to drive embodied full-body motion, directly informing hierarchical music rhythm and semantics conditioning',
      'GLARE evaluates whether a reaction occurs, when it occurs, and how it looks separately, placing temporal correctness at the center of audio-driven motion',
      'Radian adds real-data adversarial supervision in visual-foundation-model features to reduce detail decay, structural drift, and unstable motion in few-step autoregressive video',
      'Also covered: uncertainty-aware few-step distillation, training-free camera-trajectory control, and contact-constrained human-motion retargeting',
    ],
    papers: [
      {
        num: 1,
        tag: 'Audio-to-Full-Body Motion · Rectified Flow',
        title: 'ECHO-G: Embodied Co-speech Humanoid mOtion Generation',
        keyPoints: [
          'Introduces a Speech-Grounded Diffusion Transformer conditioned jointly on speech audio and timed transcripts while retaining frame-level acoustic and token-level linguistic granularity',
          'Uses rectified flow matching to model one-to-many utterance–motion relations directly in robot space, avoiding a human-motion-then-retarget pipeline',
          'Builds a BEAT2-derived audio–text–robot dataset and benchmark spanning co-speech characteristics, robot-motion quality, and runtime efficiency',
          'Modality ablations and video ratings favor joint audio–text conditioning, and the system is demonstrated on a physical humanoid',
        ],
        description: 'This is today’s closest match to the Music-to-Dance interface: acoustic prosody supplies fine timing, while timed text supplies slower semantic structure, and both drive embodied full-body motion. For dance, the acoustic branch could expose beats, intensity, and timbre, while the text branch carries lyrics, sections, or choreographic prompts, with generation performed directly in the target skeleton or robot joint space. The present task is co-speech gesture rather than dance, and its evaluation does not cover step diversity, foot contact, or music-beat hit rate; those are essential transfer criteria.',
        href: 'https://arxiv.org/abs/2609.39575',
      },
      {
        num: 2,
        tag: 'Audio-Driven Reactions · Temporal Evaluation',
        title: 'GLARE: Generating Listening Heads with Appropriate Reactions',
        keyPoints: [
          'Curates roughly 147 hours of paired speaker–listener video with 64,557 event annotations across nodding, head shaking, smiling, laughing, frowning, and surprise',
          'Uses Qwen2-Audio-derived prosody conditioning in an audio-driven flow-matching Transformer baseline',
          'Adds a frame-wise temporal reaction loss that explicitly supervises the type and timing of nonverbal responses',
          'Proposes R-F1, R-tIoU, R-ATD, and R-FID for occurrence, temporal overlap, asymmetric timing error, and reaction-region visual quality',
        ],
        description: 'GLARE matters beyond talking heads because it separates “motion looks plausible” from “the right motion happened at the right time after an acoustic cue.” Music-to-Dance is likewise vulnerable to global visual scores hiding timing errors. Its event annotations and R-tIoU/R-ATD concepts can map to downbeats, syncopations, phrase boundaries, and signature moves, including asymmetric penalties for early versus late motion. Its scope is limited to head and facial behavior, and conversational prosody is not a musical beat; transfer requires full-body event labels and continuous rhythmic hierarchy.',
        href: 'https://arxiv.org/abs/2609.40317',
      },
      {
        num: 3,
        tag: 'Long Video · Representation Adversarial Distillation',
        title: 'Enhancing Autoregressive Video Generation via Representation Adversarial Distillation',
        keyPoints: [
          'Shows how few-step autoregressive video repeatedly consumes early temporal blocks as context, accumulating detail loss, structural drift, and unstable motion',
          'Radian complements on-policy DMD by sparsely decoding student rollout frames and applying real-data adversarial supervision in multi-level features of a frozen visual foundation model',
          'DMD anchors the pretrained teacher distribution while external representation discriminators provide perceptual and semantic gradients; all added modules are removed after training',
          'On Wan2.1-1.3B it covers four-step chunks, one-step frames, and minute-long generation; four-step results reach 0.8444 VBench and 0.8033 VideoAlign, while VBench-Long rises from 0.7805 to 0.8041',
        ],
        description: 'Hand and foot corruption, costume/identity drift, and motion freezing in long dance videos are characteristic consequences of autoregressive error reuse. Radian indicates that teacher matching in diffusion latent space alone is insufficient to protect decoded body detail; multi-level features from a frozen visual model add complementary supervision without increasing inference steps. A dance adaptation should include pose-, identity-, and beat-sensitive representations, since a generic VFM may privilege scene semantics over foot plants and musical synchrony. The reported generic video metrics are not direct evidence of physical or rhythmic dance fidelity.',
        href: 'https://arxiv.org/abs/2609.40037',
      },
    ],
    worthReading: [
      { num: 1, title: 'Uncertainty-Aware Consistency Distillation for Few-Step Video Generation', tag: 'Few-Step Video · Local Uncertainty', href: 'https://arxiv.org/abs/2609.39132', description: 'UACD forms a consensus target from two independently perturbed teacher-guided paths, estimates local uncertainty from disagreement with the student’s direct prediction, and relaxes unreliable consistency supervision in rapidly varying spacetime regions. Combined with feature adversarial training and semantic alignment, it distills a 50-step Wan model to four steps with LoRA. This is relevant to fast limbs, but downweighting uncertainty must not erase the hardest signature moves.' },
      { num: 2, title: 'PartiCam: Camera Controlled Video Generation with Reward Guidance', tag: 'Camera Control · Particle Guidance', href: 'https://arxiv.org/abs/2609.39504', description: 'A global–local particle refinement scheme improves training-free diffusion reward guidance, adding particle-filtered resampling to SMC to balance camera-trajectory adherence and diversity. Dance video could use it to separate performer motion from camera motion and prevent viewpoint drift from masquerading as body motion. It controls the camera, not the dancer, so pose and music constraints remain necessary.' },
      { num: 3, title: 'TERRA: Terrain-Aware Reconstruction, Retargeting and Control for Musculoskeletal Locomotion', tag: 'Motion Retargeting · Contact Constraints', href: 'https://arxiv.org/abs/2609.38653', description: 'TERRA recovers support geometry from kinematic trajectories using terrain priors, estimated contacts, and negative free-space evidence, then enforces anatomical, tendon-continuity, and contact constraints during retargeting. Motion–terrain pairs from five datasets support 9.4 hours of unified muscle-driven control training. It is not music generation, but offers a strong constraint template for planted steps, non-flat stages, and physically executable dance retargeting.' },
    ],
    observation: 'Today’s strongest pattern is decomposition by timescale across conditioning, supervision, and evaluation. ECHO-G separates frame-level acoustics from word-level semantics; GLARE separates reaction identity, timing, and local visual quality; Radian separates diffusion-teacher anchoring from external supervision on decoded video representations. For Music-to-Dance, this suggests a three-stage chain—multiscale musical conditions, target-skeleton motion, then video appearance—with independently verifiable metrics at every stage. No new paper today directly generates dance from music, so co-speech motion and generic video scores should not be presented as dance performance. Both arXiv and Hugging Face Daily Papers were collected successfully: the merged pool contains 76 arXiv-covered and 25 Hugging Face-covered candidates, including one cross-source duplicate. All selected new papers were checked against their arXiv abstract pages.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-01',
        en: '/en/daily/music-to-dance/2026-10-01',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-01" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
