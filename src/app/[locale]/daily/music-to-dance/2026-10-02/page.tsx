import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '源动作保真编辑、统一三维运动先验与四步音视频蒸馏',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'SuperMotion 在每个反向去噪步骤重用源动作，以门控锚点保护未编辑动作及高频时间细节',
      'World Motion Models 用统一的稀疏 SE(3) 轨迹与掩码接口覆盖人体、相机、物体和跨具身运动任务',
      'DMAD 将分布匹配改写为对抗分类，在四步 Wan 与联合音视频生成上减少额外 score 拟合开销',
      '本期另关注长视频时空记忆、三维运镜与前景动作解耦、运动多样性诊断和 token 级视频强化学习',
    ],
    papers: [
      {
        num: 1,
        tag: '人体动作编辑 · 源动作锚定',
        title: 'SuperMotion: Source-Preserving Denoising for Text-Driven Human Motion Editing',
        keyPoints: [
          '提出 Source-Preserving Denoising：先将源动作对齐到输出时间线，再预测跨帧与特征维度的保留门控',
          '在每个反向步骤把预测的干净动作与已对齐源动作混合，并将修正后的估计直接送入采样后验',
          '以编辑目标监督锚定估计，并通过二阶时间差损失保护动作高频细节，全程不依赖显式编辑掩码',
          '在 MotionFix 上达到 33.20% full-pool R@1，同时减轻时间细节衰减并保留未编辑动态',
        ],
        description: '对 Music-to-Dance 而言，这种“只改变需要改变的部分”比从零重生成更适合编舞迭代：可以按歌词或导演指令修改局部手势、方向或时段，同时保留已经对齐音乐的脚步和身体律动。二阶时间差约束尤其适合保护击拍附近的加速度变化。不过论文条件是文本而非音乐，MotionFix 指标也不验证拍点、足部接触或多人互动；迁移时应让保留门控同时感知音乐结构，并单独测量编辑区域之外的节奏漂移。',
        href: 'https://arxiv.org/abs/2610.01517',
      },
      {
        num: 2,
        tag: '三维运动先验 · NeurIPS Spotlight',
        title: 'World Motion Models: Flexible Sequence Modeling of SE(3) Trajectories',
        keyPoints: [
          '把动态世界表示为稀疏 SE(3) 位姿轨迹，统一关节物体、人体、手物交互、相机与机器人状态和动作',
          '使用每 token 独立噪声级别的流匹配，并以 context token 接收非序列条件',
          '通过不同掩码在同一网络中实现未来预测、动作补全、逆运动学、跨具身重定向与策略学习',
          '在六类三维视觉与机器人应用上验证统一模型的灵活性，并获 NeurIPS 2026 Spotlight',
        ],
        description: '舞蹈视频常把骨架运动、相机运动和场景物体分别建模，导致坐标系与时间约束难以闭合。WMM 的统一 SE(3) 轨迹接口可把舞者关节段、运镜、道具甚至机器人替身放入同一条件生成问题，并用掩码自然支持动作补全和重定向。它也为先生成可验证三维轨迹、再渲染视频的两阶段系统提供强先验。局限是刚性轨迹仅近似人体软组织与衣物，摘要没有音乐条件或舞蹈专项实验，因此节奏语义仍需外接编码器和损失。',
        href: 'https://arxiv.org/abs/2610.01742',
      },
      {
        num: 3,
        tag: '少步生成 · 对抗分布匹配',
        title: 'DMAD: Distribution Matching as Adversarial Distillation for Fast Visual Generation',
        keyPoints: [
          '将 DMD 所需的分布匹配梯度改写为分类问题，用共享骨干上的两个判别头直接学习真实数据/教师与学生之间的对数密度比',
          '在判别器最优时，其线性 logit 损失恢复 DMD 的分布匹配梯度，从而无需持续拟合学生分布的辅助扩散模型',
          '提出 gap-based reweighting，依据真实数据与教师样本的经验 logit 差，自适应分配各噪声级的教师监督',
          '四步 Wan2.1-T2V-14B 达到 85.15 VBench；在 MiniMax-H3-33B 联合音视频生成中，人评相对 DMD2 和 rCM 的偏好率分别为 79.1% 与 84.6%（不计平局）',
        ],
        description: 'DMAD 对实时 Music-to-Dance 视频最直接的价值是把昂贵的多步生成压到四步，同时实验证据不仅覆盖通用视频，也覆盖联合音视频模型。省去辅助 score 模型可降低蒸馏阶段的显存与计算负担，而按噪声级自适应加权有助于处理教师与真实数据的质量差距。但论文报告的联合音视频人评不等于音乐—舞蹈同步，85.15 VBench 也不会检查关节物理；应用时仍需加入姿态、身份、拍点和语义一致性的专用判别信号。',
        href: 'https://arxiv.org/abs/2610.02188',
      },
    ],
    worthReading: [
      { num: 1, title: 'MosaiChunk: Compositing Spatio-Temporal Memory for Autoregressive Video Generation', tag: '长视频 · 稀疏时空记忆', href: 'https://arxiv.org/abs/2610.02153', description: '在固定活跃记忆预算内，由轻量路由器从历史时空位置挑选完整 KV 条目并拼成 mosaic，冻结的视频生成器可直接利用非连续历史恢复重现对象；RememBench 上优于滑窗与整块检索。长舞蹈可用它召回早期服装、人物和标志动作，但还需验证节奏相位与骨架状态是否被路由器保留。' },
      { num: 2, title: 'Generative Cinematographer: Composing Camera and Object Motion in 3D', tag: '三维运镜 · 前景动作控制', href: 'https://arxiv.org/abs/2610.02180', description: '将单图提升为可编辑三维场景脚手架，允许联合指定相机路径与局部三维运动手柄，再投影为共享世界坐标的引导图，通过轻量分支和 LoRA 控制 Wan。其相机—前景分离非常适合舞蹈镜头设计，但分段刚性手柄仍不是完整人体运动模型。' },
      { num: 3, title: 'DiVid: Diagnosing Dimension-Specific Diversity Collapse in Video Generation Models', tag: '视频评测 · 运动多样性', href: 'https://arxiv.org/abs/2610.01661', description: '把视频多样性分解为语义、风格、主体、场景、运动和相机六维，并发现即使全局多样性较高，运动与相机仍常坍缩；控制提示实验进一步区分默认模式收敛与实现缺口。该框架可防止 Music-to-Dance 只靠外观变化“刷高”多样性，但需要加入舞步与节奏结构维度。' },
      { num: 4, title: 'Token-Level Video Reinforcement Learning', tag: '视频强化学习 · Token 归因', href: 'https://arxiv.org/abs/2610.01973', description: 'TVRL 用冻结视觉语言模型的答案似然构造视频级奖励，并以视频输入梯度幅度定位影响奖励的 token，在 GRPO 中重加权稠密去噪转移；VBench-2.0 总分较基座提高 3.60。对局部肢体错误的精细归因有潜力，但音乐同步需由音视频奖励模型而非纯视觉问答信号提供。' },
    ],
    observation: '今天的共同方向是把控制与学习信号从“整段一个分数”细化到结构化单元：SuperMotion 在帧和特征维度学习保留门，WMM 把实体与时间点化为可任意遮罩的 SE(3) token，DMAD 在噪声级自适应分配监督，TVRL 进一步把强化学习 credit 下沉到视频 token。对 Music-to-Dance，这意味着可将音乐拍点/乐句、身体部位、三维轨迹和视频 token 建立显式对应，再分别约束编辑保真、节奏响应与外观质量。本次 arXiv 与 Hugging Face Daily Papers 均采集成功；100 条去重排序候选中，来源覆盖为 arXiv 82 条、Hugging Face 18 条，无来源告警。精选条目以 2026-10-01 UTC 新提交为主，并通过 arXiv 结果与摘要页核验；没有把仅命中宽泛关键词的无关论文纳入。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Source-Faithful Motion Editing, Unified 3D Motion Priors, and Four-Step Audio-Video Distillation',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'SuperMotion reuses source motion at every reverse step, protecting unedited content and high-frequency temporal detail with a gated anchor',
      'World Motion Models unify humans, cameras, objects, and cross-embodiment tasks as sparse SE(3) trajectories under one masking interface',
      'DMAD reframes distribution matching as adversarial classification, reducing auxiliary score-fitting overhead for four-step Wan and joint audio-video generation',
      'Also covered: long-video spatiotemporal memory, decoupled 3D camera and foreground control, motion-diversity diagnosis, and token-level video RL',
    ],
    papers: [
      {
        num: 1,
        tag: 'Human Motion Editing · Source Anchoring',
        title: 'SuperMotion: Source-Preserving Denoising for Text-Driven Human Motion Editing',
        keyPoints: [
          'Introduces Source-Preserving Denoising, aligning source motion to the output timeline and predicting a preservation gate across frames and feature dimensions',
          'Blends the predicted clean motion with the aligned source at every reverse step and passes the corrected estimate directly to the sampling posterior',
          'Supervises the anchored estimate against the edit target and preserves high-frequency dynamics with a second-temporal-difference loss, without explicit edit masks',
          'Reaches 33.20% full-pool R@1 on MotionFix while reducing temporal-detail attenuation and retaining unedited dynamics',
        ],
        description: 'For Music-to-Dance, changing only what must change is more useful for iterative choreography than regenerating everything. A director could edit a local gesture, direction, or time interval from lyrics or text while retaining footwork and body rhythm already aligned to the track. The second-difference loss is particularly relevant to acceleration changes around beats. The paper is text-conditioned rather than music-conditioned, however, and MotionFix does not test beat hits, foot contacts, or group interaction. A transfer should make the preservation gate aware of musical structure and measure rhythmic drift outside the edited region.',
        href: 'https://arxiv.org/abs/2610.01517',
      },
      {
        num: 2,
        tag: '3D Motion Prior · NeurIPS Spotlight',
        title: 'World Motion Models: Flexible Sequence Modeling of SE(3) Trajectories',
        keyPoints: [
          'Represents the dynamic world as sparse SE(3) pose trajectories spanning articulated objects, human bodies, hand-object interaction, cameras, and robot states and actions',
          'Uses flow matching with per-token noise levels and context tokens for non-sequential conditioning',
          'Implements future prediction, infilling, inverse kinematics, cross-embodiment retargeting, and policy learning through different masks over one network',
          'Demonstrates flexibility across six 3D vision and robotics applications and is accepted as a NeurIPS 2026 Spotlight',
        ],
        description: 'Dance-video systems often model skeleton motion, camera motion, and scene objects separately, making coordinate and timing constraints difficult to close. WMM offers one SE(3) trajectory interface for body segments, cameras, props, and even robotic embodiments, while masks naturally support infilling and retargeting. It is also a strong prior for a two-stage system that generates verifiable 3D trajectories before rendering video. Rigid trajectories only approximate soft tissue and clothing, and the abstract reports neither music conditioning nor dance-specific evaluation, so rhythm and semantics still require dedicated encoders and objectives.',
        href: 'https://arxiv.org/abs/2610.01742',
      },
      {
        num: 3,
        tag: 'Few-Step Generation · Adversarial Distribution Matching',
        title: 'DMAD: Distribution Matching as Adversarial Distillation for Fast Visual Generation',
        keyPoints: [
          'Recasts the DMD distribution-matching gradient as classification, using two discriminator heads on a shared backbone to learn real/teacher-to-student log-density ratios directly',
          'Shows that linear logit losses recover the underlying DMD gradient at the discriminator optimum, avoiding an auxiliary diffusion model continually fitted to the student distribution',
          'Introduces gap-based reweighting that allocates teacher supervision across noise levels from the empirical real-versus-teacher logit gap',
          'Reports 85.15 VBench with four-step Wan2.1-T2V-14B; on MiniMax-H3-33B joint audio-video generation, its four-step student receives 79.1% and 84.6% human preference over DMD2 and rCM, excluding ties',
        ],
        description: 'DMAD’s most direct value for real-time Music-to-Dance is compressing expensive iterative generation to four steps, with evidence spanning both general video and a joint audio-video model. Removing auxiliary score fitting can reduce distillation memory and compute, while noise-level reweighting addresses quality gaps between teacher and real data. Still, joint audio-video human preference is not music–dance synchronization, and an 85.15 VBench score does not validate body physics. A dance deployment still needs pose-, identity-, beat-, and semantic-aware discriminative signals.',
        href: 'https://arxiv.org/abs/2610.02188',
      },
    ],
    worthReading: [
      { num: 1, title: 'MosaiChunk: Compositing Spatio-Temporal Memory for Autoregressive Video Generation', tag: 'Long Video · Sparse Spatiotemporal Memory', href: 'https://arxiv.org/abs/2610.02153', description: 'Under a fixed active-memory budget, a lightweight router selects full-fidelity historical KV entries across space and time and composes them into a mosaic that a frozen video generator can consume. It outperforms sliding-window and whole-chunk retrieval on RememBench. Long dance clips could recall costumes, identities, and signature moves, though preservation of rhythmic phase and skeleton state remains untested.' },
      { num: 2, title: 'Generative Cinematographer: Composing Camera and Object Motion in 3D', tag: '3D Cinematography · Foreground Motion Control', href: 'https://arxiv.org/abs/2610.02180', description: 'GenCine lifts one image into an editable 3D scaffold, jointly authors camera paths and local 3D motion handles, and projects them into world-coordinate guidance maps for a lightweight Wan branch and LoRA. Its camera–foreground separation is highly relevant to dance cinematography, although piecewise-rigid handles are not a complete human-motion model.' },
      { num: 3, title: 'DiVid: Diagnosing Dimension-Specific Diversity Collapse in Video Generation Models', tag: 'Video Evaluation · Motion Diversity', href: 'https://arxiv.org/abs/2610.01661', description: 'DiVid decomposes diversity into Semantic, Style, Subject, Scene, Motion, and Camera dimensions, finding that globally diverse models can still collapse particularly on Motion and Camera. Prompt interventions distinguish default-mode convergence from realization gaps. It can stop Music-to-Dance systems from inflating diversity through appearance alone, but dance vocabulary and rhythmic structure should become additional dimensions.' },
      { num: 4, title: 'Token-Level Video Reinforcement Learning', tag: 'Video RL · Token Credit', href: 'https://arxiv.org/abs/2610.01973', description: 'TVRL uses a frozen VLM’s answer likelihood for video-level reward and video-input gradient magnitude to locate influential tokens, reweighting dense denoising transitions inside GRPO. It improves VBench-2.0 Overall by 3.60 points over the base model. Fine-grained credit may target local limb failures, but synchrony requires an audio-visual reward rather than a vision-only QA signal.' },
    ],
    observation: 'The common direction today is to refine control and learning signals from one score per clip into structured units. SuperMotion learns preservation gates over frames and features; WMM turns entities and timesteps into arbitrarily maskable SE(3) tokens; DMAD adapts supervision by noise level; and TVRL pushes reinforcement-learning credit down to video tokens. For Music-to-Dance, this suggests explicit correspondences among beats and phrases, body parts, 3D trajectories, and video tokens, with separate constraints for edit fidelity, rhythmic response, and appearance. Both arXiv and Hugging Face Daily Papers were collected successfully. The 100 deduplicated ranked candidates contain 82 with arXiv provenance and 18 with Hugging Face provenance, with no source warnings. Selections prioritize papers newly submitted on 2026-10-01 UTC and were checked against arXiv results and abstract pages; broad-keyword false positives were excluded.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-02',
        en: '/en/daily/music-to-dance/2026-10-02',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-02" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
