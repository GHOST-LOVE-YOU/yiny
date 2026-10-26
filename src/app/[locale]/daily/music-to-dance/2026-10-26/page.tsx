import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '显式群舞编排、持久状态长时动作与可执行人体运动',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'ChoreoStudio把群舞的队形、切换时机和执行舞者拆成显式规划变量',
      'PASPA以持久状态压缩历史，在长时动作生成中兼顾风格稳定与局部动态',
      'ViT-H用跟踪反馈直接优化视频到可执行人形机器人动作的生成链路',
    ],
    papers: [
      {
        num: 1,
        tag: '音乐驱动群舞 · 显式编排',
        title: 'ChoreoStudio: Planning What, When, and Who in Music-Driven Group Choreography',
        keyPoints: [
          '将音乐分解为帧级节奏特征与段级结构特征，分别服务细粒度动作同步和高层编排规划',
          'Director联合预测队形点集、队形切换门控与舞者移动分配，显式回答“什么队形、何时切换、由谁执行”',
          '通过帧对齐指令 token 与跨舞者注意力偏置注入交互计划，并在 AIOZ-GDance 上取得动作质量、群体组织和队形动态的领先结果',
        ],
        description: '这是本期与 Music-to-Dance 最直接相关的工作。它不再让扩散生成器隐式猜测群舞组织，而是把音乐段落结构转成可检查的交互计划，再用帧级节奏控制身体细节。对多人物舞蹈系统而言，这种“段级导演 + 帧级生成”的双时间尺度设计，能同时处理副歌或高潮处的队形变化与拍点上的动作同步，也为人工修改队形和角色分工留下明确接口。',
        href: 'https://arxiv.org/abs/2610.32325',
      },
      {
        num: 2,
        tag: '长时动作 · Blockwise Flow Matching',
        title: 'Past as State, Present as Attention: Persistent-State Blockwise Flow Matching for Long-Horizon Co-Speech Motion Generation',
        keyPoints: [
          '提出 Past-As-State, Present-as-Attention：用跨块持久状态概括慢变历史风格，以块内双向注意力建模当前快速动态',
          '在 blockwise flow matching 中加入多块监督、prefill-decode 状态缓存和混合 classifier-free guidance',
          '在公开基准上取得领先 FGD，并在长序列生成中保持动作风格；论文已被 NeurIPS 2026 接收',
        ],
        description: '虽然任务是语音共身动作而非舞蹈，PASPA解决的正是长音乐驱动动作也会遇到的漂移问题。它避免保留无限增长的显式历史，也不只依赖容易遗忘风格的短 seed，而是把慢变身份与风格压入持久状态，把当前动作细节交给局部注意力。该分工可迁移到整首歌曲生成：持久状态维护舞者风格和动作语汇，当前块继续响应局部节拍与乐句。',
        href: 'https://arxiv.org/abs/2610.32373',
      },
      {
        num: 3,
        tag: '视频到人体动作 · 跟踪反馈',
        title: 'ViT-H: Generative Video-To-Humanoid Control with Motion Tracking Feedback',
        keyPoints: [
          '以扩散模型直接从单目人体视频生成机器人参考动作，绕过独立的人体重建与动作重定向阶段',
          '利用下游动作跟踪结果进行直接偏好优化，使生成动作显式面向可执行性',
          '自回归版本实现低于 400 ms 的实时视频遥操作，并在 Unitree G1 上提升动作质量与执行效果',
        ],
        description: 'ViT-H把评价信号从视觉相似度推进到物理执行结果。对舞蹈生成而言，这提示我们可用人体动力学、足底接触或下游跟踪器反馈后训练动作生成器，而不是只优化关节误差或感知质量。若目标包含虚拟人驱动、机器人舞蹈或动作捕捉导出，这种生成—跟踪闭环尤其重要，可减少视觉上合理但无法稳定执行的姿态。',
        href: 'https://arxiv.org/abs/2610.32966',
      },
    ],
    worthReading: [
      { num: 1, title: 'SyncVid: World-Equivariant Diffusion for Synchronized Video Generation', tag: '多视角视频同步', href: 'https://arxiv.org/abs/2610.31765', description: '在规范三维空间采样并向各相机光栅化结构化噪声，从随机性源头维持跨视角、跨时间一致性；适合参考多机位舞台视频生成。' },
      { num: 2, title: 'Making MLLM Latents Matter: Factor-Aware Predictive Learning for Cinematic Video Generation', tag: '因素感知视频控制', href: 'https://arxiv.org/abs/2610.30926', description: '通过生成器落地、因素跨度替换与预测学习，让 MLLM 表征真正控制角色、场景、动作和镜头，并支持稀疏条件下的时间推断。' },
      { num: 3, title: 'AudioLift: Audio-Driven Single Image to Full-Head Gaussian Avatar via Multi-view Video Generation', tag: '音频驱动头像', href: 'https://arxiv.org/abs/2610.31747', description: '以同步多视角视频作为中间表示，从单张肖像构建音频驱动的完整头部 Gaussian Avatar，展示音频条件与多视角一致重建的组合路径。' },
      { num: 4, title: 'UniAction: Unified Action Conditioning for World Models', tag: '统一时空动作条件', href: 'https://arxiv.org/abs/2610.32977', description: '把力、相机、手部和机器人姿态统一表示为带语义身份与连续时空坐标的稀疏动作元素，为异构舞蹈控制信号的统一注入提供参考。' },
    ],
    observation: '本周一覆盖上一个工作日以来的新论文。最清晰的趋势是生成系统开始把不同时间尺度和不同责任显式拆开：ChoreoStudio区分段级结构规划与帧级节奏控制，PASPA区分慢变历史状态与快速当前动态，ViT-H则把视觉动作生成和物理执行反馈闭环连接。对 Music-to-Dance，下一步不只是扩大视频模型，而是建立可编辑的编舞中间层、可持续的长时状态，以及能反映接触与可执行性的反馈信号。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Explicit Group Choreography, Persistent Long-Horizon Motion, and Executable Human Movement',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'ChoreoStudio explicitly plans group formation, transition timing, and dancer assignment',
      'PASPA compresses history into persistent state while preserving local dynamics over long motion sequences',
      'ViT-H uses tracking feedback to turn video-derived motion into executable humanoid behavior',
    ],
    papers: [
      {
        num: 1,
        tag: 'Music-Driven Group Dance · Explicit Planning',
        title: 'ChoreoStudio: Planning What, When, and Who in Music-Driven Group Choreography',
        keyPoints: [
          'Disentangles music into frame-level rhythmic features for detailed synchronization and segment-level structural features for choreography planning',
          'Jointly predicts a formation point set, transition gate, and mobility allocation to decide what changes, when, and which dancers execute them',
          'Injects plans through frame-aligned instruction tokens and cross-dancer attention biases, reaching state-of-the-art motion quality, group organization, and formation dynamics on AIOZ-GDance',
        ],
        description: 'This is the most direct Music-to-Dance paper in the issue. Rather than asking a diffusion generator to infer group organization implicitly, it turns musical structure into an inspectable interaction plan and reserves frame-level rhythm for body detail. The two-timescale design can align formation changes with sections such as choruses or climaxes while retaining beat-level synchronization, and it exposes useful interfaces for editing formations and dancer roles.',
        href: 'https://arxiv.org/abs/2610.32325',
      },
      {
        num: 2,
        tag: 'Long-Horizon Motion · Blockwise Flow Matching',
        title: 'Past as State, Present as Attention: Persistent-State Blockwise Flow Matching for Long-Horizon Co-Speech Motion Generation',
        keyPoints: [
          'Introduces Past-As-State, Present-as-Attention: an inter-block persistent state summarizes slowly varying style while intra-block bidirectional attention models fast current dynamics',
          'Combines blockwise flow matching with multi-block supervision, prefill-decode state caching, and hybrid classifier-free guidance',
          'Achieves state-of-the-art FGD on public benchmarks while preserving style over long generation; accepted at NeurIPS 2026',
        ],
        description: 'Although the task is co-speech motion rather than dance, PASPA addresses the same drift that affects long music-conditioned sequences. It avoids both an ever-growing explicit history and a short seed that gradually forgets style. For full-song dance generation, persistent state could retain performer identity and motion vocabulary while each current block remains responsive to local beats and phrases.',
        href: 'https://arxiv.org/abs/2610.32373',
      },
      {
        num: 3,
        tag: 'Video-to-Humanoid Motion · Tracking Feedback',
        title: 'ViT-H: Generative Video-To-Humanoid Control with Motion Tracking Feedback',
        keyPoints: [
          'Directly generates humanoid reference motion from monocular human video with a diffusion model, bypassing separate reconstruction and retargeting stages',
          'Post-trains the generator with direct preference optimization using downstream motion-tracking outcomes as executability feedback',
          'Adds an autoregressive variant for real-time video teleoperation below 400 ms and improves both motion quality and executability on Unitree G1',
        ],
        description: 'ViT-H moves the learning signal from visual similarity toward physical execution. Dance generators can likewise be post-trained with body dynamics, foot-contact, or downstream tracker feedback rather than relying only on joint error or perceptual quality. This generation-tracking loop matters when outputs must drive avatars, robots, or motion-capture pipelines, where visually plausible poses may still be unstable or impossible to execute.',
        href: 'https://arxiv.org/abs/2610.32966',
      },
    ],
    worthReading: [
      { num: 1, title: 'SyncVid: World-Equivariant Diffusion for Synchronized Video Generation', tag: 'Multi-View Video Synchronization', href: 'https://arxiv.org/abs/2610.31765', description: 'Samples structured noise in canonical 3D space and rasterizes it into each camera, enforcing cross-view and temporal consistency at the source of randomness for multi-camera stage-video generation.' },
      { num: 2, title: 'Making MLLM Latents Matter: Factor-Aware Predictive Learning for Cinematic Video Generation', tag: 'Factor-Aware Video Control', href: 'https://arxiv.org/abs/2610.30926', description: 'Grounds MLLM representations in generation and trains factor-specific control and temporal prediction for characters, scenes, actions, cameras, and sparse inputs.' },
      { num: 3, title: 'AudioLift: Audio-Driven Single Image to Full-Head Gaussian Avatar via Multi-view Video Generation', tag: 'Audio-Driven Avatar', href: 'https://arxiv.org/abs/2610.31747', description: 'Uses synchronized multi-view video as an intermediate representation to build an audio-driven full-head Gaussian avatar from one portrait.' },
      { num: 4, title: 'UniAction: Unified Action Conditioning for World Models', tag: 'Unified Spatiotemporal Actions', href: 'https://arxiv.org/abs/2610.32977', description: 'Represents force, camera, hand, and robot-pose controls as sparse action elements with semantic identities and continuous spatiotemporal coordinates, suggesting a common interface for heterogeneous dance controls.' },
    ],
    observation: 'This Monday issue covers new work since the previous business day. A shared pattern is the explicit separation of timescales and responsibilities: ChoreoStudio separates segment-level structural planning from frame-level rhythm, PASPA separates slowly varying historical state from fast present dynamics, and ViT-H closes the loop between visual motion generation and physical tracking. Progress in Music-to-Dance may depend less on simply scaling video models and more on editable choreography intermediates, durable long-horizon state, and feedback that captures contact and executability.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-26',
        en: '/en/daily/music-to-dance/2026-10-26',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-26" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
