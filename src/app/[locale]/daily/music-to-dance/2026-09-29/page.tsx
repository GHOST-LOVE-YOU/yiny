import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '流式动作扩散、一步式音频全身生成与训练自由加速',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'FloodDiffusion 2 以可缓存的局部注意力、运动学损失和路径条件实现高效可控的流式动作生成',
      'SocialHumanoid 在一次前向中生成语音同步、情感可控的全身动作窗口，并连续部署到实体人形机器人',
      'GeoShrink 无需训练即可跳过扩散模型求值，在视频、动作、音频和音乐生成上统一加速',
      '本期另关注可追溯人体动作修复、严格时长对齐和长视频状态一致性',
    ],
    papers: [
      {
        num: 1,
        tag: '流式动作生成 · 路径控制',
        title: 'FloodDiffusion 2: Efficient and Path Controllable Streaming Motion Generation',
        keyPoints: [
          '提出 Partial Attention，使已完成历史表示不再依赖活动窗口，从而支持 KV 缓存推理与共享历史打包训练',
          '给出回归损失保持扩散条件均值速度场的充要 Bregman 判据，并据此构造无需在线前向运动学计算的 FK 诱导二次损失',
          '加入角色根轨迹的精确路径条件；摘要报告训练计算降低 4.6 倍、去噪加速 11.29 倍，长序列每次更新为 2.303 ms',
          '在 SEED 与 HumanML3D 上分别取得 0.048 与 0.053 的流式方法 SOTA FID，并开放代码',
        ],
        description: '这是今天对 Music-to-Dance 最直接的工作。舞蹈系统不仅需要逐帧延续动作，还要让角色沿舞台走位而不破坏自然肢体运动；FD2 同时处理了历史缓存、运动几何和根路径控制。其 FK 诱导损失尤其适合把关节空间误差转化为更符合视觉感知的运动学约束，而 Partial Attention 为长音乐段的低延迟生成提供了工程路径。论文尚未以音乐为条件，因此下一步应验证节拍与段落条件加入活动窗口后，缓存边界处是否保持节奏连续。',
        href: 'https://arxiv.org/abs/2609.33167',
      },
      {
        num: 2,
        tag: '音频驱动全身动作 · 一步生成',
        title: 'SocialHumanoid: Towards Expressive Humanoid Behavior via One-Step Co-Speech Motion Generation',
        keyPoints: [
          '给定语音与情感条件，单次前向生成一个全身动作窗口，并通过动作历史条件衔接连续窗口',
          '将生成的人体动作在线转换为适配机器人形态的参考轨迹，再由全身控制器在实体机器人上执行',
          '发布 AffectMoCap：由两名专业演员采集的 4 小时同步语音、身体、精细手部动作与情绪标注数据',
          '在 BEAT2 上取得对比方法中最佳 FGD、具有竞争力的语音—动作同步，并比 GestureLSM 快约 6 倍',
        ],
        description: '虽然条件信号是语音而非音乐，SocialHumanoid 已完整展示了“音频条件—情感控制—窗口式全身生成—长期连续执行”的闭环。对 Music-to-Dance 而言，一步窗口生成可以替代昂贵的逐窗口扩散采样，历史条件则是避免舞段拼接跳变的关键；AffectMoCap 还提示情感标签可作为音乐情绪到动作表现力的中间监督。实体机器人结果增强了可执行性的可信度，但舞蹈所需的强节拍命中、更大运动幅度与脚步接触仍需单独训练和评测。',
        href: 'https://arxiv.org/abs/2609.33311',
      },
      {
        num: 3,
        tag: '扩散加速 · 训练自由',
        title: 'GeoShrink: Accelerating Diffusion Transformers with Two Lines of Code',
        keyPoints: [
          '保留原求解器时间网格，只在预设锚点执行模型；被跳过阶段由最近一次精确输出与按几何比例保留的创新量预测',
          '从弦切向传输与往返直线投影推导更新规则，并给出固定覆盖范围下控制相邻间隔扩张的锚点布置原则',
          '实验跨图像、视频、动作、音频、音乐和 3D 生成，在固定模型求值预算下均报告明显收益',
          '在 HunyuanVideo 上报告 4.99 倍加速，并较最强保真基线提升 ChronoMagic-Bench-150 PSNR 5.44 dB',
        ],
        description: 'GeoShrink 的吸引力在于不改训练、不蒸馏模型即可横跨动作、音乐与视频后端。Music-to-Dance 往往由动作扩散和视频扩散串联，统一的推理期加速器比为每个模块分别训练学生模型更容易落地。保留原求解器网格也意味着节拍条件仍可在既定时间点注入。不过论文主要报告保真度和通用生成结果，部署前必须补测动作节拍偏移、脚滑与快速肢体细节，确认跳过模型求值没有损害音乐—动作同步。',
        href: 'https://arxiv.org/abs/2609.33723',
      },
    ],
    worthReading: [
      { num: 1, title: 'Traceable Human-to-Humanoid Sign Language Benchmarking', tag: '人体动作修复 · 可追溯评测', href: 'https://arxiv.org/abs/2609.33354', description: 'HumanoidCSL-20K 为 20,648 条中文手语序列保留源动作、修复人体动作、直接机器人参考与几何修复参考四种对齐版本，并分别评测连续性、内容保持、可行性与执行误差。其逐阶段溯源和手形、位置、掌向、双手关系分项指标，可借鉴到舞蹈动捕清洗与重定向质量诊断。' },
      { num: 2, title: 'DuraS2ST: Chain-of-Thought and Reinforcement Learning for Duration-Aligned Speech-to-Speech Translation', tag: '时长对齐 · 多模态强化学习', href: 'https://arxiv.org/abs/2609.33742', description: '先显式规划目标措辞与音素长度，再生成语音 token，并以时长边界奖励和模态感知奖励归因联合优化。任务是视频配音，但“先规划时间结构、再生成内容”的思路可迁移到舞蹈段落长度、节拍落点与动作 token 的联合约束。' },
      { num: 3, title: 'StoryEngine: A State-Grounded Agentic Framework for Video Storytelling', tag: '长视频生成 · 状态一致性', href: 'https://arxiv.org/abs/2609.33627', description: '以结构化实体位置与故事状态作为权威语义层，为每个镜头传播事件后的起止状态，并通过规范参考、可执行渲染计划和有界修复循环抑制跨镜头漂移。对长舞蹈视频中的人物、服装、舞台与编排状态保持具有参考价值。' },
    ],
    observation: '今天的新稿把实时人体动作生成的三个层级连接了起来：FD2 在动作层解决长历史效率、运动几何与路径可控性，SocialHumanoid 在音频条件层证明一步窗口生成可以兼顾表现力、同步和长期实体执行，GeoShrink 则在通用扩散求解层提供无需再训练的跨模态加速。对 Music-to-Dance，值得优先验证的组合是：用音乐节拍与语义规划窗口和根路径，用运动学损失守住身体结构，再以缓存注意力和稀疏模型求值压低延迟。与此同时，HumanoidCSL-20K 的逐阶段可追溯评测提醒我们，不应只看最终视频观感，还要分离动捕修复、动作生成、重定向和渲染各环节的误差。arXiv 与 Hugging Face Daily Papers 本次均成功覆盖；HF 的高分条目主要是此前已刊或日期较早的音视频/视频生成工作，本期入选集中于 9 月 27 日提交的 arXiv 新稿。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Streaming Motion Diffusion, One-Step Audio-to-Body Generation, and Training-Free Acceleration',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'FloodDiffusion 2 combines cacheable partial attention, a kinematic loss, and path conditioning for efficient controllable streaming motion',
      'SocialHumanoid generates speech-synchronized, affect-controlled full-body windows in one pass and executes them continuously on a physical humanoid',
      'GeoShrink skips diffusion-model evaluations without training and accelerates video, motion, audio, and music generation under one rule',
      'This edition also tracks traceable human-motion repair, strict duration alignment, and state consistency in long-form video',
    ],
    papers: [
      {
        num: 1,
        tag: 'Streaming Motion · Path Control',
        title: 'FloodDiffusion 2: Efficient and Path Controllable Streaming Motion Generation',
        keyPoints: [
          'Introduces Partial Attention so finalized history representations no longer depend on the active window, enabling KV-cached inference and shared-history packed training',
          'Establishes a necessary-and-sufficient Bregman criterion for regression losses to preserve diffusion conditional-mean velocity fields, motivating an FK-induced quadratic loss without online FK evaluation',
          'Adds precise root-path conditioning; the abstract reports 4.6x less training compute, 11.29x faster denoising, and 2.303 ms updates on long sequences',
          'Reports streaming state-of-the-art FID of 0.048 on SEED and 0.053 on HumanML3D, with code released',
        ],
        description: 'This is today’s most direct Music-to-Dance paper. A dance system must stream motion while moving a character along a stage path without damaging natural articulation; FD2 tackles history caching, motion geometry, and root-path control together. Its FK-induced loss is particularly useful for turning joint-space errors into perceptually meaningful kinematic constraints, while Partial Attention offers an engineering route to long musical sequences at low latency. Music is not yet the condition, so the next test is whether beat and section conditioning preserves rhythmic continuity across active-window boundaries.',
        href: 'https://arxiv.org/abs/2609.33167',
      },
      {
        num: 2,
        tag: 'Audio-Driven Full-Body Motion · One-Step Generation',
        title: 'SocialHumanoid: Towards Expressive Humanoid Behavior via One-Step Co-Speech Motion Generation',
        keyPoints: [
          'Generates one full-body motion window in a single forward pass from speech and an affect condition, then joins windows through motion-history conditioning',
          'Retargets generated human motion online into embodiment-compatible robot references tracked by a whole-body controller',
          'Introduces AffectMoCap, four hours from two professional actors with synchronized speech, body motion, fine-grained hands, and emotion labels',
          'Achieves the best FGD among compared methods on BEAT2, competitive speech-motion synchrony, and roughly 6x faster inference than GestureLSM',
        ],
        description: 'Although driven by speech rather than music, SocialHumanoid demonstrates an end-to-end loop from audio and affect to windowed full-body generation and stable long-horizon execution. For Music-to-Dance, one-step windows could replace expensive iterative sampling, while history conditioning is essential to avoid discontinuities between dance phrases. AffectMoCap also suggests emotion labels as intermediate supervision from musical mood to movement expression. Physical-robot results strengthen the executability evidence, but strong beat hits, larger dance amplitudes, and foot contacts still require dedicated training and evaluation.',
        href: 'https://arxiv.org/abs/2609.33311',
      },
      {
        num: 3,
        tag: 'Diffusion Acceleration · Training-Free',
        title: 'GeoShrink: Accelerating Diffusion Transformers with Two Lines of Code',
        keyPoints: [
          'Keeps the original solver grid but evaluates the model only at anchors; skipped stages add a geometrically retained fraction of the latest innovation to the last exact output',
          'Derives the rule from chordal tangent transport and round-trip line projection, with an anchor-spacing principle controlling adjacent gap expansion under fixed coverage',
          'Evaluates image, video, motion, audio, music, and 3D generation and reports substantial gains at fixed model-evaluation budgets',
          'Reports 4.99x acceleration on HunyuanVideo and a 5.44 dB ChronoMagic-Bench-150 PSNR gain over the strongest listed fidelity baseline',
        ],
        description: 'GeoShrink is attractive because it can span motion and video diffusion backends without retraining or distillation. Music-to-Dance stacks often chain motion diffusion with video diffusion, so one inference-time accelerator is easier to deploy than separate students for every module. Retaining the solver grid also preserves established times at which beat conditions can enter. The reported evidence emphasizes fidelity and broad generation, however; deployment should additionally measure beat drift, foot sliding, and fast-limb detail to ensure skipped evaluations do not weaken music-motion synchronization.',
        href: 'https://arxiv.org/abs/2609.33723',
      },
    ],
    worthReading: [
      { num: 1, title: 'Traceable Human-to-Humanoid Sign Language Benchmarking', tag: 'Human-Motion Repair · Traceable Evaluation', href: 'https://arxiv.org/abs/2609.33354', description: 'HumanoidCSL-20K aligns four versions of 20,648 Chinese Sign Language sequences: source, repaired human motion, direct robot reference, and geometry-repaired reference. Its stage-wise provenance and component metrics for handshape, location, palm orientation, and inter-hand relation offer a strong template for diagnosing dance mocap cleanup and retargeting.' },
      { num: 2, title: 'DuraS2ST: Chain-of-Thought and Reinforcement Learning for Duration-Aligned Speech-to-Speech Translation', tag: 'Duration Alignment · Multimodal RL', href: 'https://arxiv.org/abs/2609.33742', description: 'The model explicitly plans target wording and phonetic length before generating speech tokens, then optimizes duration consistency with a margin reward and modality-aware credit assignment. Though designed for dubbing, plan-time-structure-first generation could transfer to dance phrase length, beat placement, and motion-token constraints.' },
      { num: 3, title: 'StoryEngine: A State-Grounded Agentic Framework for Video Storytelling', tag: 'Long-Form Video · State Consistency', href: 'https://arxiv.org/abs/2609.33627', description: 'Maintains authoritative structured entity and story states, propagates event consequences into shot start/end states, and uses canonical references, executable render plans, and bounded repair to prevent cross-shot drift. The design is relevant to preserving performer, costume, stage, and choreography state in long dance videos.' },
    ],
    observation: 'Today’s papers connect three levels of real-time human-motion generation. FD2 addresses long-history efficiency, kinematic geometry, and path control at the motion level; SocialHumanoid shows that one-step audio-conditioned windows can combine expression, synchronization, and stable physical execution; GeoShrink offers cross-modal acceleration at the diffusion-solver level without retraining. A promising Music-to-Dance combination is to plan windows and root paths from musical beats and semantics, preserve body structure with kinematic losses, then lower latency through cached attention and sparse model evaluations. HumanoidCSL-20K also cautions against judging only the final video: mocap repair, generation, retargeting, and rendering errors should be measured separately. Both arXiv and Hugging Face Daily Papers were successfully covered. The highest-scoring HF items were previously covered or older audio-video/video-generation work, so this edition selects arXiv submissions from September 27.',
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
    description: c.description,
    alternates: {
      languages: {
        'zh-CN': '/zh/daily/music-to-dance/2026-09-29',
        en: '/en/daily/music-to-dance/2026-09-29',
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
      date="2026-09-29"
      roleId="music-to-dance"
      roleName={c.roleName}
      title={c.title}
      overview={c.overview}
    >
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

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
