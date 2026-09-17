import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '群体舞动反馈、语音运动解耦与人体动态建模',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'Encypher 将群体运动质量转写为文本提示并实时条件化音乐生成，把传统 Music-to-Dance 的单向映射扩展为舞者与生成音乐之间的社会反馈回路',
      'VibeAvatar 将语音—运动生成拆成音素运动学条件与审美运动策略，在紧凑的一维形变运动空间中兼顾口型准确、运动观感与推理效率',
      'DiT-Garment 用 UV 空间扩散 Transformer 学习给定身体动作与材料参数的服装动态，为舞蹈角色渲染补足动作之外的非刚性细节',
      'Pose2Muscle 以结构化离散轨迹从人体姿态估计肌肉活动，为舞蹈动作的生理合理性分析提供无需推理期肌电传感器的新信号',
    ],
    papers: [
      {
        num: 1,
        tag: '舞蹈交互 · 实时生成音乐',
        title: 'Encypher: Shared Agency and Social Presence in Collaborative Music Generation for Dance Cyphers',
        keyPoints: [
          '提出面向 dance cypher 的协作式生成音乐系统，把群体运动质量转写为文本提示，实时条件化音乐生成',
          '通过与本地舞者持续五周的共同设计来迭代系统，而不是只在离线数据集上评价运动—音乐映射',
          '在陌生参与者用户研究、公开博物馆活动和现场演出中观察到共享能动性：参与者会把生成音乐感知为对现场能量的回应',
          '系统也暴露了新参与者的不确定感，但会促使参与者互相寻找线索，从而增强共同在场与群体协同',
        ],
        description: '这项工作不是从音乐自动合成舞蹈，而是把方向反过来：让集体舞动持续影响音乐，再由音乐反馈下一轮动作。对 Music-to-Dance 系统而言，它的重要性在于揭示单向“音频输入—动作输出”之外的闭环设计空间：运动特征可以成为可解释的控制提示，音乐与动作可在多人现场中共同演化。论文证据主要来自共同设计和真实场景研究，而非生成动作的数值基准，因此更适合作为交互范式与评价维度的参考。',
        href: 'https://arxiv.org/abs/2609.18062v1',
      },
      {
        num: 2,
        tag: '语音驱动头像 · 流模型后训练',
        title: 'VibeAvatar: Aligning Phonetic Kinematics and Human Aesthetics for High-Fidelity Talking Avatar Synthesis',
        keyPoints: [
          '把音素准确性与人类偏好的运动审美视为不同来源的目标，分别放在条件阶段和生成后训练阶段处理',
          'Phonetic Kinematics Adapter 将偏识别的语音特征转换为音素—运动学条件，直接强化发音与可见运动的对应关系',
          'Aesthetic Motion Policy 通过 GRPO 优化与流一致的随机采样策略，以人类审美偏好改善运动表现',
          '轻量流式运动生成器运行在紧凑的一维形变潜空间；论文报告 10 秒、512 像素视频可在 10 秒内、约 3GB 显存上生成，并在客观指标和用户研究中达到领先结果',
        ],
        description: '虽然任务是语音驱动说话头像而非全身舞蹈，VibeAvatar 的“条件对齐与审美后训练解耦”对 Music-to-Dance 很有启发：节拍、音素或音乐语义等可核验对齐目标可由专用适配器保证，而自然度、风格与观感则由偏好优化的运动策略负责。紧凑运动潜空间和流一致策略也提示了实时舞蹈头像的效率路线。迁移到全身舞蹈仍需解决更高自由度、节拍层级和足地接触等问题。',
        href: 'https://arxiv.org/abs/2609.18632v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'DiT-Garment: Garment Dynamics with Diffusion Transformers',
        tag: '服装动态 · 扩散 Transformer',
        href: 'https://arxiv.org/abs/2609.18510v1',
        description: '在 UV 空间用二维扩散 Transformer 生成三维服装形变，并以身体动作和物理参数为条件；仅用合成模拟训练却能泛化到捕获和艺术家制作的服装，可作为舞蹈动作之后的物理感服饰动画层。',
      },
      {
        num: 2,
        title: 'Pose2Muscle: Structured Spatio-Temporal Decoding for Discrete Muscle Activity Estimation from Human Pose',
        tag: '姿态理解 · 肌肉状态轨迹',
        href: 'https://arxiv.org/abs/2609.18336v1',
        description: '以多尺度时空注意力和有向无环图解码器，从姿态推断离散肌肉活动轨迹；新建 PoseEMG-43 同步数据集，并在随机划分上取得 86.36% 邻级准确率、0.8821 Pearson 相关，可辅助评估生成舞蹈的运动负荷与合理性。',
      },
    ],
    observation: '本期最值得关注的共同趋势是把“运动是否对得上”和“运动是否好看、是否能组织真实互动”拆成不同问题。Encypher 把舞蹈与音乐置于多人实时反馈回路中，VibeAvatar 则在模型内部将可测量的音素运动学与偏好驱动的运动审美分阶段优化；两者都超越了单一重建损失。与此同时，DiT-Garment 与 Pose2Muscle 分别向外观物理和内部生理延伸人体动态表示。对下一代 Music-to-Dance 管线，更合理的方向可能是同时维护节拍/语义对齐、审美偏好、服饰动力学与身体合理性等可分解目标，而不是让一个端到端生成器隐式承担全部约束。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Collective Dance Feedback, Speech–Motion Disentanglement, and Human Dynamics Modeling',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'Encypher translates collective movement qualities into text prompts for real-time music generation, extending one-way Music-to-Dance mappings into a social feedback loop between dancers and generated sound',
      'VibeAvatar separates speech–motion generation into phonetic-kinematic conditioning and an aesthetic motion policy, balancing articulation, perceived motion quality, and efficiency in a compact 1D warp-based motion space',
      'DiT-Garment learns clothing dynamics conditioned on body motion and material parameters with a UV-space diffusion Transformer, adding non-rigid detail beyond the dance skeleton',
      'Pose2Muscle estimates structured discrete muscle-activity trajectories from human pose, offering a sensor-free signal for analyzing the physiological plausibility of dance motion',
    ],
    papers: [
      {
        num: 1,
        tag: 'Dance Interaction · Real-Time Generative Music',
        title: 'Encypher: Shared Agency and Social Presence in Collaborative Music Generation for Dance Cyphers',
        keyPoints: [
          'Introduces a collaborative generative-music system for dance cyphers that converts collective movement qualities into text prompts conditioning music generation in real time',
          'Develops the system through five weeks of co-design with local dancers rather than evaluating the movement-to-music mapping only on an offline dataset',
          'Across a study with unacquainted participants, a public museum event, and a live performance, users developed shared agency and perceived the music as responding to the room’s energy',
          'The system also exposed uncertainty for newcomers, yet encouraged participants to look to one another for cues and thereby fostered social presence and group coordination',
        ],
        description: 'This work does not synthesize dance from music; it reverses the direction so collective movement continually shapes music, which then feeds back into subsequent movement. For Music-to-Dance, its value lies in the closed-loop design space beyond a one-way audio-input/motion-output mapping: movement descriptors can become interpretable controls, while music and motion co-evolve in a live multi-person setting. Its evidence comes primarily from co-design and in-the-wild studies rather than numerical motion-generation benchmarks, so it is most useful as a reference for interaction paradigms and evaluation dimensions.',
        href: 'https://arxiv.org/abs/2609.18062v1',
      },
      {
        num: 2,
        tag: 'Speech-Driven Avatar · Flow-Model Post-Training',
        title: 'VibeAvatar: Aligning Phonetic Kinematics and Human Aesthetics for High-Fidelity Talking Avatar Synthesis',
        keyPoints: [
          'Treats phonetic accuracy and human-preferred motion aesthetics as objectives with different origins, addressing them at conditioning and generative post-training stages respectively',
          'The Phonetic Kinematics Adapter converts recognition-oriented speech features into phonetic-kinematic conditions that directly strengthen correspondence between pronunciation and visible motion',
          'The Aesthetic Motion Policy uses GRPO to optimize a flow-consistent stochastic sampling policy for human-preferred motion quality',
          'A lightweight flow-based generator operates in a compact 1D warp-based motion latent space; the paper reports a 10-second 512px video in under 10 seconds with about 3GB VRAM and leading objective and user-study results',
        ],
        description: 'Although the task is speech-driven talking avatars rather than full-body dance, VibeAvatar offers a useful decomposition for Music-to-Dance: verifiable alignment targets such as beats, phonetics, or musical semantics can be secured by dedicated conditioning adapters, while naturalness, style, and appeal are handled by a preference-optimized motion policy. Its compact motion space and flow-consistent policy also suggest an efficiency route for real-time dance avatars. Extending the idea to full-body dance would still require handling higher degrees of freedom, hierarchical rhythm, and foot contact.',
        href: 'https://arxiv.org/abs/2609.18632v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'DiT-Garment: Garment Dynamics with Diffusion Transformers',
        tag: 'Garment Dynamics · Diffusion Transformer',
        href: 'https://arxiv.org/abs/2609.18510v1',
        description: 'Generates 3D garment deformation with a 2D diffusion Transformer in UV space, conditioned on body motion and physical parameters. Despite training only on synthetic simulation, it generalizes to captured and artist-made garments, making it a promising physically informed clothing-animation layer after dance-motion generation.',
      },
      {
        num: 2,
        title: 'Pose2Muscle: Structured Spatio-Temporal Decoding for Discrete Muscle Activity Estimation from Human Pose',
        tag: 'Pose Understanding · Muscle-State Trajectories',
        href: 'https://arxiv.org/abs/2609.18336v1',
        description: 'Uses multi-scale spatiotemporal attention and a directed-acyclic-graph decoder to infer discrete muscle-activity trajectories from pose. It introduces the synchronized PoseEMG-43 dataset and reports 86.36% adjacent-level accuracy and 0.8821 Pearson correlation on the random split, offering a possible signal for evaluating load and plausibility in generated dance.',
      },
    ],
    observation: 'The shared theme this time is separating whether motion is correctly aligned from whether it looks good and supports real interaction. Encypher places dance and music in a live multi-person feedback loop, while VibeAvatar separates measurable phonetic kinematics from preference-driven motion aesthetics inside the model; both move beyond a single reconstruction objective. DiT-Garment and Pose2Muscle further extend human dynamics outward to physical appearance and inward to physiological state. A stronger next-generation Music-to-Dance pipeline may therefore maintain decomposable objectives for beat/semantic alignment, aesthetic preference, garment dynamics, and bodily plausibility instead of asking one end-to-end generator to absorb every constraint implicitly.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-17',
        en: '/en/daily/music-to-dance/2026-09-17',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-17" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
