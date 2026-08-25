import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '音频驱动动作精度、动态保持与长时程一致性',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'DeMoDiff 以逐关节时空 VAE 和自回归扩散增强人体动作编辑',
      'Drummer Motion 将鼓棒空间精度与骨骼自然度解耦，并直接评估音频-动作相关性',
      'DynaForcing 用动态奖励抑制流式角色生成中的动态坍缩',
      'VA-Judger 将人类偏好用于联合视频-音频生成奖励建模',
    ],
    papers: [
      {
        num: 1,
        tag: '人体动作扩散 · ICME 2026',
        title: 'Spatiotemporally Decoupled Autoregressive Diffusion Model for Human Motion Generation',
        keyPoints: [
          '提出 DeMoDiff，以逐关节编码的时空 VAE 替代将全身动作压进单一潜变量的表示方式',
          '在自回归扩散生成器中加入时空掩码与注意力，实现更细粒度的身体部位控制与编辑',
          '在 HumanML3D 和 KIT-ML 上验证重建与动作生成效果，并展示时空编辑能力',
        ],
        description: 'DeMoDiff 对 Music-to-Dance 的直接价值在于把“全身动作”拆成可编辑的关节级时空状态。音频条件可以在节拍、鼓点或段落切换处只作用于相关身体部位，再由自回归扩散保持全身协调；这比把音乐特征注入一个整体动作 latent 更适合局部节奏强调和长序列修正。',
        href: 'https://arxiv.org/abs/2608.23279',
      },
      {
        num: 2,
        tag: '音频驱动动作 · SCA 2026 Best Paper',
        title: 'Generalized Audio-Driven Synthesis of Precise Drummer Motion',
        keyPoints: [
          '用双目标损失解耦骨骼完整性与鼓棒精度，在保持自然身体动力学的同时实现厘米级目标精度',
          '通过自建数据集与增强策略，让模型从精选音频泛化到真实世界音频',
          '提出 impact-to-target distance 与 audio-motion correlation score，分别度量空间精度和时间对齐',
        ],
        description: '这篇工作把 Music-to-Dance 中常被混在一起的两个问题分开测量：动作是否自然，以及动作是否准确击中音乐事件对应的位置。其 audio-motion correlation score 可作为节拍对齐评测的参考，而空间精度指标也提示舞蹈生成应增加脚步、手部和道具接触点的局部约束，而不只依赖整体姿态相似度。',
        href: 'https://arxiv.org/abs/2608.19055',
      },
      {
        num: 3,
        tag: '流式角色生成 · ACM MM 2026',
        title: 'DynaForcing: Overcoming Dynamic Collapse in Self-Forcing Distillation for Streaming Avatar Generation',
        keyPoints: [
          '指出自强制蒸馏会收敛到近乎静态的高感知质量解，导致动态被压制并破坏唇形同步与表情',
          '用 Hybrid Forcing、Dynamics-Aware Reward Regularization 和 Reference Perturbation 分别从数据、损失和条件端恢复动态',
          '通过计算图裁剪与梯度回放将自强制训练的 GPU 占用降低一个数量级以上',
        ],
        description: 'DynaForcing 揭示了实时音频驱动生成的一个关键风险：画面看起来稳定，不等于动作真的跟随音乐变化。其动态奖励正则化和参考图扰动可迁移到舞蹈视频蒸馏，尤其适合防止学生模型用低运动量“投机”换取更高的视觉质量；Dyn-Deg 从 0.31 提升到 0.73、Sync-C 从 7.03 提升到 7.68，也提供了可复用的质量-动态权衡诊断。',
        href: 'https://arxiv.org/abs/2608.17707',
      },
      {
        num: 4,
        tag: '人类偏好奖励 · 音视频生成',
        title: 'VA-Judger: Reward Modeling from Human Preference Feedback for Joint Video-Audio Generation',
        keyPoints: [
          '构建 VAPref-10K，包含 9K 个提示和 10.3K 组来自开源模型的细粒度成对偏好比较',
          '用 VA-Judger-Bench 检验奖励模型在域内与域外比较中的人类偏好预测能力',
          '通过维度级强化学习分解视频质量、音频质量、同步与语义一致性，减少单一指标导致的 reward hacking',
        ],
        description: 'VA-Judger 对 Music-to-Dance 的启发是把“音乐对上动作”放回整体感知一致性中评估。单独优化节拍距离或视频清晰度，可能生成局部指标很好但语义和动作风格不协调的结果；维度级人类偏好奖励可以与音频-动作相关性、姿态质量和身份保持共同构成更难被钻空子的后训练信号。',
        href: 'https://arxiv.org/abs/2608.18607',
      },
    ],
    worthReading: [
      { num: 1, title: 'Long-Horizon Audio-Visual Generation for Persistent Stories and Interactive Worlds', tag: '长时程音视频生成', href: 'https://arxiv.org/abs/2608.23383', description: '用跨镜头视觉记忆、语音线索与渐进式教师强制支持长视频生成；其跨段身份和声音保持机制可参考长舞蹈视频的连续性设计。' },
      { num: 2, title: 'KeyID: Decoupled Drafting and Keyframe Editing for Identity-Preserving Video Generation', tag: '身份保持视频生成', href: 'https://arxiv.org/abs/2608.16154', description: '将视频动态草稿与身份注入分离，并用稀疏关键帧修正和运动插值保持人物身份，适合参考人物舞蹈的外观一致性。' },
      { num: 3, title: '4DAnyone: Create Anyone in 4D from a Casual Monocular Video', tag: '4D 人体重建', href: 'https://arxiv.org/abs/2608.20335', description: '通过固定长度参考上下文与跨目标视角路由提升多视角人体一致性，可为多视角动作监督和 4D 舞者表示提供参考。' },
    ],
    observation: '本次采集最清晰的信号是“精度、动态和整体一致性”正在被分开建模。Drummer Motion 说明音频-动作同步必须配合局部空间约束；DynaForcing 说明蒸馏系统必须主动防止低动态解；VA-Judger 则提醒我们，节拍指标、画质指标和人类对整体音视频协调的判断并不等价。对 Music-to-Dance 而言，下一步值得优先验证的是关节级时空表示与人类偏好奖励的组合。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Audio-Driven Motion Precision, Dynamic Preservation, and Long-Horizon Consistency',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'DeMoDiff improves human-motion editing with joint-wise spatiotemporal VAE latents and autoregressive diffusion',
      'Drummer Motion separates skeletal naturalness from spatial precision and directly scores audio-motion correlation',
      'DynaForcing counters dynamic collapse in streaming avatar distillation with motion-aware rewards',
      'VA-Judger models human preferences as a reward for joint video-audio generation',
    ],
    papers: [
      {
        num: 1,
        tag: 'Human Motion Diffusion · ICME 2026',
        title: 'Spatiotemporally Decoupled Autoregressive Diffusion Model for Human Motion Generation',
        keyPoints: [
          'Introduces DeMoDiff, using a joint-wise spatiotemporal VAE instead of compressing whole-body motion into one latent',
          'Adds spatiotemporal masking and attention to an autoregressive diffusion generator for fine-grained body-part control',
          'Demonstrates reconstruction, motion generation, and spatial-temporal editing on HumanML3D and KIT-ML',
        ],
        description: 'DeMoDiff is directly relevant to Music-to-Dance because it turns whole-body motion into editable joint-level spatiotemporal states. Audio conditions could act on the body parts associated with a beat, drum hit, or phrase transition while autoregressive diffusion preserves global coordination. That is a better fit for local rhythmic emphasis and long-sequence correction than injecting music into a single holistic motion latent.',
        href: 'https://arxiv.org/abs/2608.23279',
      },
      {
        num: 2,
        tag: 'Audio-Driven Motion · SCA 2026 Best Paper',
        title: 'Generalized Audio-Driven Synthesis of Precise Drummer Motion',
        keyPoints: [
          'Uses a dual-objective loss to decouple skeletal integrity from drumstick precision, reaching centimeter-level target accuracy without sacrificing natural dynamics',
          'Uses a dedicated dataset and augmentation to generalize from curated inputs to in-the-wild audio',
          'Introduces impact-to-target distance and audio-motion correlation score for spatial precision and temporal alignment',
        ],
        description: 'This work separates two concerns that are often conflated in Music-to-Dance: whether motion looks natural and whether it hits the spatial location implied by a musical event. Its audio-motion correlation score is a useful reference for beat alignment evaluation. The spatial metric also suggests adding local constraints for footfalls, hands, and contact points rather than relying only on whole-pose similarity.',
        href: 'https://arxiv.org/abs/2608.19055',
      },
      {
        num: 3,
        tag: 'Streaming Avatar Generation · ACM MM 2026',
        title: 'DynaForcing: Overcoming Dynamic Collapse in Self-Forcing Distillation for Streaming Avatar Generation',
        keyPoints: [
          'Identifies dynamic collapse in self-forcing distillation: visually plausible students converge toward near-static motion, damaging lip-sync and expression',
          'Uses Hybrid Forcing, Dynamics-Aware Reward Regularization, and Reference Perturbation at the data, loss, and conditioning levels',
          'Reduces the GPU footprint of self-forcing by more than an order of magnitude through graph pruning and gradient replay',
        ],
        description: 'DynaForcing exposes a central risk in real-time audio-driven generation: a stable-looking video may still suppress the motion that should follow the music. Its motion-aware reward and reference perturbation can transfer to dance-video distillation, preventing students from trading dynamics for perceptual quality. The reported Dyn-Deg improvement from 0.31 to 0.73 and Sync-C improvement from 7.03 to 7.68 also provide a useful diagnostic for the quality-dynamics trade-off.',
        href: 'https://arxiv.org/abs/2608.17707',
      },
      {
        num: 4,
        tag: 'Human Preference Reward · Audio-Visual Generation',
        title: 'VA-Judger: Reward Modeling from Human Preference Feedback for Joint Video-Audio Generation',
        keyPoints: [
          'Builds VAPref-10K with 9K prompts and 10.3K fine-grained pairwise preferences from open-source generation models',
          'Uses VA-Judger-Bench to test preference prediction in both in-domain and out-of-domain comparisons',
          'Applies dimension-wise reinforcement learning to reduce reward hacking across visual quality, audio quality, synchronization, and semantic coherence',
        ],
        description: 'VA-Judger suggests evaluating music-driven dance as a holistic audio-visual experience rather than optimizing beat distance or visual fidelity in isolation. A clip can score well on local synchronization while remaining semantically or stylistically incoherent. Dimension-wise human preference rewards could complement audio-motion correlation, pose quality, and identity preservation in a more robust post-training signal.',
        href: 'https://arxiv.org/abs/2608.18607',
      },
    ],
    worthReading: [
      { num: 1, title: 'Long-Horizon Audio-Visual Generation for Persistent Stories and Interactive Worlds', tag: 'Long-Horizon Audio-Visual Generation', href: 'https://arxiv.org/abs/2608.23383', description: 'Combines cross-shot visual memory, speech-derived cues, and progressive teacher forcing for long videos; its identity and voice persistence mechanisms are relevant to continuous dance clips.' },
      { num: 2, title: 'KeyID: Decoupled Drafting and Keyframe Editing for Identity-Preserving Video Generation', tag: 'Identity-Preserving Video', href: 'https://arxiv.org/abs/2608.16154', description: 'Separates motion drafting from identity injection and uses sparse keyframe correction with motion interpolation for consistent reference-person appearance.' },
      { num: 3, title: '4DAnyone: Create Anyone in 4D from a Casual Monocular Video', tag: '4D Human Reconstruction', href: 'https://arxiv.org/abs/2608.20335', description: 'Improves multiview human consistency with fixed-length reference context and target-view routing, offering ideas for multiview motion supervision and 4D dancer representations.' },
    ],
    observation: 'The clearest signal from this collection is that precision, dynamics, and holistic coherence are being modeled separately. Drummer Motion shows that audio-motion alignment needs local spatial constraints; DynaForcing shows that distilled systems must actively resist low-dynamic solutions; VA-Judger shows that beat metrics, visual metrics, and human judgments of audio-visual coordination are not interchangeable. For Music-to-Dance, the most promising next experiment is to combine joint-wise spatiotemporal representations with human-preference rewards.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-08-25',
        en: '/en/daily/music-to-dance/2026-08-25',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-08-25" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
