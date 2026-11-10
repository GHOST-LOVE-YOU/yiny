import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '多人随机动作、流形姿态生成与长视频轨迹记忆',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'FlowMoP 用条件流匹配联合生成多人的全局轨迹与局部姿态，并显式刻画互动中的多种未来',
      'PoseRieFlow 在 SMPL-H 旋转流形上生成包含手部细节的全身姿态，以八个身体部位 token 压缩建模序列',
      'Trajectory Forcing 将前序视频块的去噪轨迹作为上下文，提升训练时域之外的长视频质量',
      '实时穿模修复、结构化视频控制、音频驱动头像、姿态测量和稀疏注意力补齐生成链路',
    ],
    papers: [
      {
        num: 1,
        tag: '多人动作 · 条件流匹配',
        title: 'FlowMoP: Stochastic Multi-Person Motion Prediction',
        keyPoints: [
          '以条件流匹配联合生成多个主体的未来动作分布，同时建模全局运动轨迹与 root-relative 局部姿态',
          '用 B-spline 重参数化压缩生成状态空间并约束时间平滑性，双流 Transformer 结合邻近人物的历史动作',
          '在 CMU-Mocap (UMPM) 与 3DPW 上，尽管输出完整随机分布，关节位置、姿态和最终位移误差仍优于确定性基线',
          '在 WorldPose 建立首个动作预测基线，并观察到社交条件会把预测不确定性集中到互动约束允许的方向',
        ],
        description: '群舞生成不能把每名舞者独立采样后再拼接：同一段历史可能延伸出多种编排，但人物间距离、朝向和响应关系必须共同成立。FlowMoP 把多主体未来作为联合随机分布生成，B-spline 和邻居条件分别处理平滑性与互动。对 Music-to-Dance 的直接启发是先学习音乐条件下的群体动作分布，再以全局轨迹和局部姿态双层表示约束队形；论文验证的是动作预测而非音乐驱动，节拍和段落条件仍需另行接入。',
        href: 'https://arxiv.org/abs/2611.09882',
      },
      {
        num: 2,
        tag: '全身姿态 · 黎曼流匹配',
        title: 'PoseRieFlow: Riemannian Flow Matching for Whole-Body Text-to-Pose Generation',
        keyPoints: [
          '直接在 52 个 SMPL-H 关节旋转构成的 SO(3) 乘积流形上学习文本条件向量场，沿黎曼测地线传输样本',
          '将关节聚合为八个身体部位 token，并为双手分别配置专用 token、非线性投影器和部位解码器',
          '模型仅含 21.6M 可训练参数，可生成带细致手部关节的表达性全身姿态',
          '在 PoseScript 上取得所有可生成手部方法中最低的全身运动学误差；黎曼版本在各实用推理预算下均优于欧氏对应模型',
        ],
        description: '舞蹈姿态天然由关节旋转组成，把它们当作普通欧氏向量插值容易产生不符合旋转几何的路径。PoseRieFlow 将流匹配放在 SO(3) 乘积流形上，并用部位 token 在紧凑序列中保留手部细节。它适合作为编舞系统的姿态先验或关键帧生成器，尤其可改善手势丰富的舞种；但当前任务是单帧文本到姿态，没有验证连续动作、脚部接触或音乐同步。',
        href: 'https://arxiv.org/abs/2611.09692',
      },
      {
        num: 3,
        tag: '长视频生成 · 去噪轨迹记忆',
        title: 'Trajectory Forcing: Exploiting Diffusion Trajectories for Autoregressive Long Video Generation',
        keyPoints: [
          '自回归扩散生成下一视频块时，不只读取上一块的最终结果，还把该块生成过程中的中间去噪轨迹作为上下文',
          '先从真实视频的高斯插值构造伪轨迹训练，再用教师模型获得学生自身 rollout 的真实去噪轨迹',
          '在 5 秒 VBench 上总分达到 85.15，同时超过 Self Forcing 0.84 分、Causal Forcing 1.11 分',
          '在训练时域六倍的 30 秒生成上取得比较方法中最高的整体质量',
        ],
        description: '长舞蹈视频常按片段自回归生成，若只传递上一段成片，会丢失扩散过程对动作走向和替代未来的内部表征。Trajectory Forcing 将历史去噪轨迹纳入下一段条件，为减少跨段漂移提供了更丰富的记忆。对歌曲长度生成而言，它可能帮助维持人物、运动语义和镜头连续性；论文指标是通用视频质量与语义，尚未报告节拍对齐、关节稳定性或舞蹈动作重复率。',
        href: 'https://arxiv.org/abs/2611.09096',
      },
    ],
    worthReading: [
      { num: 1, title: 'Real-Time Self-Penetration Repair for Skinned Characters with Soft Contact Budgets', tag: '动作后处理 · 实时穿模修复', href: 'https://arxiv.org/abs/2611.09693', description: '训练无关的后处理先做姿态校正，再按身体部位的软组织预算执行有界皮肤压缩。320 个未见片段、3 种体型上，手—躯干穿透深度超过 20 mm 的帧从 15.53% 降至 0，姿态与皮肤处理合计平均 2.29 ms；适合修复舞蹈动作迁移到不同体型后的穿模，但依赖兼容 rig/skin character pack。' },
      { num: 2, title: 'Video-Coder: Reinforcing Agentic Coding for Video Generation', tag: '结构化视频控制 · 代码智能体', href: 'https://arxiv.org/abs/2611.09894', description: '智能体编写并执行代码构建动态 3D 草稿视频，为下游生成器提供结构与运动信号，再以执行和视频双奖励训练。在 PhyGenBench 与 VBench-2.0 上分别将 Minimax-H3 提升约 7 和 24 分；代码化舞台、相机及队形控制值得借鉴，且该条目同时来自 arXiv 与 Hugging Face。' },
      { num: 3, title: 'Emo-LiveSync: Real-Time Universal Lip Synchronization with Explicit Emotion Control', tag: '音频驱动头像 · 实时表情控制', href: 'https://arxiv.org/abs/2611.09074', description: '在 LivePortrait 的变形动画框架中，将预训练 video-to-motion 模型的知识蒸馏到音频至隐式动作空间的映射，并加入显式情绪控制门。论文报告实时推理、视觉质量与口型同步的领先结果，也能泛化到风格化和非人角色；可补充舞蹈视频的面部表现，但不生成全身动作。' },
      { num: 4, title: 'MetricPose: Flexible 3D Human Pose Estimation with Depth and Geometric Cues', tag: '3D 人体姿态 · 度量空间', href: 'https://arxiv.org/abs/2611.08954', description: '在统一参数模型中组合 RGB 先验、可选度量深度和地面接触几何，预测相机坐标系中的绝对关节位置。相较 SAM 3D Body，RGB、RGB-Ground、RGB-D 模式的 camera-local 误差分别降低 12.16%、31.00% 和 54.61%；可用于舞蹈数据清洗和舞台空间评估。' },
      { num: 5, title: 'InstaGen: Group-Shared Importance Sampling for Fast Video Generation', tag: '视频加速 · 块稀疏注意力', href: 'https://arxiv.org/abs/2611.08610', description: '把稀疏注意力的块选择改写为重要性采样：高分 key 精确计算，其余按估计注意力加权采样，并让同一 query cluster 共享样本以适配 GPU 块执行。在 Wan2.1 14B 上相对稠密注意力达到 1.65 倍加速，并在同等密度或墙钟时间下提升 PSNR；可降低舞蹈视频生成成本，但未单独评测快速人体运动。' },
    ],
    observation: '本次采集的最新论文主要发布于 11 月 6 日，arXiv 与 Hugging Face Daily Papers 均成功，JSON 未记录来源告警；候选按 arXiv ID 合并后，Video-Coder 保留了双来源 provenance。今天最值得关注的是生成系统开始同时处理“未来的不确定性、表示的几何和长时记忆”：FlowMoP 联合采样多人未来，PoseRieFlow 尊重关节旋转流形，Trajectory Forcing 保留跨片段去噪历史。三者分别对应群舞编排、姿态先验和歌曲长度视频延展。大量只因 motion、pose、diffusion 或 temporal 命中的无关工作已排除，且未重复收录 11 月 9 日日报已有条目。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Stochastic Multi-Person Motion, Manifold Pose Generation, and Trajectory Memory for Long Video',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'FlowMoP jointly generates global trajectories and local poses for multiple people with conditional flow matching, representing multiple interactive futures explicitly',
      'PoseRieFlow generates whole-body poses with articulated hands on the SMPL-H rotation manifold and compresses the sequence into eight body-part tokens',
      'Trajectory Forcing conditions on the denoising trajectories of previous chunks to improve video generation beyond the training horizon',
      'Real-time collision repair, structured video control, audio-driven portraits, metric pose estimation, and sparse attention complete the generation pipeline',
    ],
    papers: [
      {
        num: 1,
        tag: 'Multi-Person Motion · Conditional Flow Matching',
        title: 'FlowMoP: Stochastic Multi-Person Motion Prediction',
        keyPoints: [
          'Uses conditional flow matching to jointly generate a distribution over multiple people\'s future motions, including global trajectories and root-relative poses',
          'Compresses the generative state with a B-spline reparameterization for temporal smoothness, while a dual-stream transformer conditions each person on observed neighbor motion',
          'Outperforms deterministic baselines on joint position, pose, and final displacement errors on CMU-Mocap (UMPM) and 3DPW despite modeling a full stochastic distribution',
          'Establishes the first motion-prediction baseline on WorldPose and finds that social conditioning concentrates uncertainty along interaction-compatible directions',
        ],
        description: 'Group dance cannot be built by independently sampling each dancer and combining the results: one history admits several choreographic futures, but spacing, orientation, and responses among dancers must remain jointly valid. FlowMoP generates a joint stochastic future, with B-splines and neighbor conditioning addressing smoothness and interaction. For Music-to-Dance, it suggests learning a music-conditioned group-motion distribution with separate global formation and local pose representations. The paper evaluates prediction rather than music conditioning, so beat and section cues still need to be incorporated.',
        href: 'https://arxiv.org/abs/2611.09882',
      },
      {
        num: 2,
        tag: 'Whole-Body Pose · Riemannian Flow Matching',
        title: 'PoseRieFlow: Riemannian Flow Matching for Whole-Body Text-to-Pose Generation',
        keyPoints: [
          'Learns a text-conditioned vector field directly on the product of SO(3) manifolds for 52 SMPL-H joint rotations, transporting samples along Riemannian geodesics',
          'Aggregates joints into eight body-part tokens and assigns dedicated tokens, nonlinear projectors, and part-specific decoders to both hands',
          'Generates expressive SMPL-H poses with detailed hand articulation using only 21.6M trainable parameters',
          'Achieves the lowest whole-body kinematic error among hand-producing methods on PoseScript, with consistent gains over its Euclidean counterpart at every practical inference budget',
        ],
        description: 'Dance poses are compositions of joint rotations, and treating them as ordinary Euclidean vectors can produce geometrically invalid interpolation paths. PoseRieFlow performs flow matching on a product of SO(3) manifolds while retaining hand detail through compact part tokens. It can serve as a pose prior or keyframe generator for choreography systems, especially for hand-intensive styles. The current task is single-frame text-to-pose, however, and does not evaluate continuous motion, foot contact, or music synchronization.',
        href: 'https://arxiv.org/abs/2611.09692',
      },
      {
        num: 3,
        tag: 'Long Video · Denoising-Trajectory Memory',
        title: 'Trajectory Forcing: Exploiting Diffusion Trajectories for Autoregressive Long Video Generation',
        keyPoints: [
          'Conditions the next autoregressive video chunk on intermediate denoising states from the preceding chunk, rather than only its final output',
          'First trains with pseudo-trajectories built from Gaussian interpolation of ground-truth video, then uses real trajectories from the student rollout under a teacher model',
          'Scores 85.15 Total on the 5-second VBench benchmark, improving over Self Forcing by 0.84 and Causal Forcing by 1.11',
          'Achieves the best overall quality among compared methods on 30-second generation, six times the training horizon',
        ],
        description: 'Long dance videos are often generated chunk by chunk. Passing only the previous rendered chunk discards internal diffusion states that encode motion direction and alternative futures. Trajectory Forcing exposes that denoising history to the next chunk, providing richer memory against cross-chunk drift. It may help preserve identity, motion semantics, and camera continuity over song-length output. The reported metrics cover general video quality and semantics, not beat alignment, joint stability, or dance repetition.',
        href: 'https://arxiv.org/abs/2611.09096',
      },
    ],
    worthReading: [
      { num: 1, title: 'Real-Time Self-Penetration Repair for Skinned Characters with Soft Contact Budgets', tag: 'Motion Post-Processing · Real-Time Collision Repair', href: 'https://arxiv.org/abs/2611.09693', description: 'A training-free post-process applies pose correction followed by bounded skin compression under part-specific soft-tissue budgets. Across 320 unseen clips and three body shapes, frames with hand-torso penetration deeper than 20 mm fall from 15.53% to zero, with 2.29 ms mean combined processing. It targets body-shape transfer artifacts in dance motion, but requires compatible rig and skin character packs.' },
      { num: 2, title: 'Video-Coder: Reinforcing Agentic Coding for Video Generation', tag: 'Structured Video Control · Coding Agent', href: 'https://arxiv.org/abs/2611.09894', description: 'An agent writes and executes code to build a dynamic 3D draft video that supplies structure and motion to downstream generators, then trains with execution and video rewards. It improves Minimax-H3 by about 7 points on PhyGenBench and 24 on VBench-2.0. Code-driven stage, camera, and formation control may transfer to dance production; this item appeared in both arXiv and Hugging Face.' },
      { num: 3, title: 'Emo-LiveSync: Real-Time Universal Lip Synchronization with Explicit Emotion Control', tag: 'Audio-Driven Portrait · Real-Time Expression Control', href: 'https://arxiv.org/abs/2611.09074', description: 'Built on LivePortrait, it distills a pretrained video-to-motion model into an audio-to-implicit-motion mapping and adds an explicit emotion gate. The paper reports real-time inference and state-of-the-art visual quality and lip-sync accuracy across photorealistic, stylized, and non-human characters. It can enrich facial performance in dance videos but does not generate full-body motion.' },
      { num: 4, title: 'MetricPose: Flexible 3D Human Pose Estimation with Depth and Geometric Cues', tag: '3D Human Pose · Metric Space', href: 'https://arxiv.org/abs/2611.08954', description: 'A shared-parameter model combines RGB priors with optional metric depth and ground-contact geometry to estimate absolute joints in camera coordinates. Against SAM 3D Body, camera-local error falls by 12.16%, 31.00%, and 54.61% in RGB, RGB-Ground, and RGB-D modes. The representation is useful for dance-data cleaning and stage-space evaluation.' },
      { num: 5, title: 'InstaGen: Group-Shared Importance Sampling for Fast Video Generation', tag: 'Video Acceleration · Block-Sparse Attention', href: 'https://arxiv.org/abs/2611.08610', description: 'It recasts sparse-attention block selection as importance sampling: top keys are exact, remaining keys are weighted samples, and query clusters share samples for GPU-friendly blocks. On Wan2.1 14B it reaches 1.65x speedup over dense attention while improving PSNR at matched density or wall-clock time. It can reduce dance-video generation cost, though fast human motion is not evaluated separately.' },
    ],
    observation: 'The newest papers in this collection were primarily submitted on November 6. Both arXiv and Hugging Face Daily Papers succeeded with no source warnings in the JSON; after merging by arXiv ID, Video-Coder retained provenance from both sources. The strongest theme is simultaneous attention to future uncertainty, representational geometry, and long-horizon memory: FlowMoP samples joint multi-person futures, PoseRieFlow respects the rotation manifold, and Trajectory Forcing retains denoising history across chunks. These map to group choreography, pose priors, and song-length video extension. Papers matching only broad terms such as motion, pose, diffusion, or temporal were excluded, as were entries already covered on November 9.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-11-10',
        en: '/en/daily/music-to-dance/2026-11-10',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-11-10" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
      <MustRead>{c.papers.map(paper => <Paper key={paper.num} num={paper.num} tag={paper.tag} title={paper.title}><KeyPoints points={paper.keyPoints} /><p className="text-[#2C2C24] leading-relaxed">{paper.description}</p><PaperLink href={paper.href} title={paper.title} /></Paper>)}</MustRead>
      <WorthReading>{c.worthReading.map(item => <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>)}</WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
