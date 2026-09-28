import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '连续动作风格控制、运动学感知生成与流式人物动态保真',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'Motion Style Slider 只用端点监督学习单调、可插值且可外推的动作风格强度轴',
      'Timo 以双向文本—动作建模和旋转运动学监督改善人体动作的协调性与语义对齐',
      'Routed Forcing 按人物区域与噪声阶段路由蒸馏目标，缓解流式音频人物生成的动态坍塌',
      '本期覆盖 9 月 25 日（上一个工作日）新论文，并补充语音驱动面部动作与可感知人体运动生成',
    ],
    papers: [
      {
        num: 1,
        tag: '动作风格迁移 · 连续控制',
        title: 'Motion Style Slider: Endpoint-Supervised Continuous Style Control for Human Motion Diffusion',
        keyPoints: [
          '在学习到的动作风格嵌入空间中，由内容动作与风格动作构造风格方向，并以标量连续控制生成强度',
          '联合扩散去噪与潜空间强度正则，无需采集中间强度真值动作，也能鼓励平滑、单调的风格变化',
          '兼容预训练动作扩散骨干和异构风格数据，并用额外的真实“过度反应”采集测试范围外强度的可用性',
        ],
        description: '这项工作直接对应舞蹈制作中的“风格要再强一点或收一点”需求。它不试图定义跨导演、跨风格通用的绝对标尺，而是为给定内容—风格对建立可靠的相对控制轴。对 Music-to-Dance 流水线而言，可以先由音乐决定动作内容和节拍，再用连续强度调节律动、夸张度或表演气质；端点监督也显著降低了为每首音乐标注多档风格强度的成本。需要进一步验证的是，强度单调性在长舞段、跨风格混合和严格节拍约束下是否仍然成立。',
        href: 'https://arxiv.org/abs/2609.30795',
      },
      {
        num: 2,
        tag: '人体动作生成 · 多模态扩散 Transformer',
        title: 'Timo: Taming Multimodal Diffusion Transformer for Human Motion Generation',
        keyPoints: [
          '采用完全共享的多模态注意力，让文本与动作 token 双向建模，而非只通过交叉注意力单向注入文本条件',
          '把流匹配与几何、旋转运动学监督结合，直接比较旋转及其时间变化，针对关节协调差和抖动问题施加约束',
          '建立包含六个公开数据集、40,025 个留出片段的统一评测；摘要报告其在六个维度中的五项超过 Kimodo，平均分相对提升 40.8%',
        ],
        description: 'Timo 的价值在于提醒 Music-to-Dance 系统：更强的多模态骨干并不会自动产生协调的人体运动。关节间相关性弱、时间连续性强这一结构特点，需要显式的旋转与变化率监督。虽然论文条件是文本而非音乐，但其共享注意力、流匹配和运动学损失可作为音频—动作联合建模的骨架；后续可把文本 token 替换或扩展为节拍、段落与音乐语义 token，并检验统一评测中的语义和运动质量优势能否转化为节拍对齐。',
        href: 'https://arxiv.org/abs/2609.30761',
      },
      {
        num: 3,
        tag: '音频驱动人物 · 流式扩散蒸馏',
        title: 'Where and When to Force: Routed Forcing for Streaming Avatars',
        keyPoints: [
          '发现 DMD 的反向 KL 目标会产生区域不均匀的模式坍塌：姿态与手势所在人物区域损失最大，嘴部较小，背景基本稳定',
          '在人物区域采用真实视频监督的 Data-Forcing Distillation，在嘴部与背景保留 DMD，以兼顾动作多样性、口型同步与场景稳定',
          '高噪声阶段注入真实动态模式、低噪声阶段用 DMD 修复细节；摘要报告动态提升最高 45%、多样性提升 7–25%',
        ],
        description: '对实时 Music-to-Dance 视频而言，少步蒸馏最危险的失败并非画面变糊，而是人物逐渐趋于静止。Routed Forcing 将这个问题拆成“哪里需要真实运动监督”和“何时注入监督”，比对整帧、所有噪声阶段使用同一目标更有针对性。尽管实验聚焦语音人物，其人物区域路由可自然细化为躯干、四肢和面部区域，并让节拍强段优先保留高动态模式；但从口型同步迁移到全身音乐节拍同步仍需专门实验。',
        href: 'https://arxiv.org/abs/2609.30963',
      },
    ],
    worthReading: [
      { num: 1, title: 'Seeing Speech: Learning Visible Articulatory Dynamics for Speech-Driven 3D Facial Animation', tag: '语音驱动 3D 面部 · NeurIPS 2026', href: 'https://arxiv.org/abs/2609.30517', description: '把可见发音分解为展宽、张开与前突三种方向运动，以语音—发音记忆检索音素上下文，再按网格拓扑合成为表面一致的 3D 面部动作。它为音乐人物中的面部局部动作提供了“结构化方向基元 + 拓扑组合”的建模参考。' },
      { num: 2, title: 'DyMD: Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video World Models', tag: '少步视频生成 · 动态保持', href: 'https://arxiv.org/abs/2609.31349', description: '通过时间亲和度条件重加噪与动态引导的伪分数跟踪，减少 DMD 对强运动轨迹的压制；将 14B 教师蒸馏为四步 1.3B 学生。任务是具身交互而非舞蹈，但对低延迟生成中“画质尚可、动作却消失”的诊断高度相关。' },
      { num: 3, title: 'Generate, Track, Improve: Perceptive Multi-Skill Humanoid Locomotion with RL-Fine-Tuned Motion Generators', tag: '全身运动生成 · 流匹配与强化学习', href: 'https://arxiv.org/abs/2609.31577', description: '以感知式流匹配生成器规划全身轨迹，再由控制引导强化学习跟踪，并用离策略优势加权回归改进生成器。其生成—跟踪分层和真实 Unitree G1 部署结果，可启发把舞蹈动作生成与可执行性控制分开优化。' },
    ],
    observation: '本周一回看上一个工作日的新稿，主线非常集中：人体动作生成正在从“给出一种合理运动”转向对风格强度、关节运动学和动态多样性进行可解释控制。Motion Style Slider 提供制作友好的连续旋钮，Timo 说明多模态扩散必须尊重人体旋转与时序结构，Routed Forcing 则指出加速后的模型会优先丢失人物高动态模式。三者组合成一条清晰的 Music-to-Dance 技术路线：用音乐与语义确定内容，以运动学约束保证骨架协调，以连续风格变量控制表现力，再在少步流式渲染中对高动态身体区域给予专门监督。Hugging Face Daily Papers 本次成功覆盖，但其高相关条目已在此前日报收录或不如上述 9 月 25 日新稿直接，因此本期入选论文均来自 arXiv。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Continuous Motion Style, Kinematics-Aware Generation, and Dynamic Streaming Avatars',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'Motion Style Slider learns a monotonic, interpolatable, and extrapolatable motion-style intensity axis from endpoint supervision only',
      'Timo improves human-motion coordination and semantic alignment with bidirectional text-motion modeling and rotational-kinematics supervision',
      'Routed Forcing routes distillation by person region and noise stage to counter dynamic collapse in streaming audio-driven avatars',
      'This Monday edition covers new papers from September 25, the previous business day, plus speech-driven facial motion and perceptive whole-body generation',
    ],
    papers: [
      {
        num: 1,
        tag: 'Motion Style Transfer · Continuous Control',
        title: 'Motion Style Slider: Endpoint-Supervised Continuous Style Control for Human Motion Diffusion',
        keyPoints: [
          'Builds a style direction from content and style motions in a learned motion-style embedding space, then controls generation with a continuous scalar intensity',
          'Combines diffusion denoising with latent intensity regularization to encourage smooth, monotonic scaling without ground-truth motions at intermediate intensities',
          'Works with pretrained motion-diffusion backbones and heterogeneous style data, and tests out-of-range intensities against a small real-capture over-reaction extension',
        ],
        description: 'This directly addresses a production request common in dance authoring: make the style stronger or subtler. Rather than impose one absolute scale across directors and styles, the method constructs a reliable relative axis for each content-style pair. A Music-to-Dance pipeline could first derive content and timing from music, then adjust groove, exaggeration, or performance character continuously. Endpoint-only supervision also avoids capturing every song at multiple style strengths. An open question is whether monotonic behavior survives long routines, mixed styles, and strict beat constraints.',
        href: 'https://arxiv.org/abs/2609.30795',
      },
      {
        num: 2,
        tag: 'Human Motion Generation · Multimodal Diffusion Transformer',
        title: 'Timo: Taming Multimodal Diffusion Transformer for Human Motion Generation',
        keyPoints: [
          'Uses fully shared multimodal attention for bidirectional text-motion token modeling instead of injecting text only through cross-attention',
          'Combines flow matching with geometric and rotational-kinematics supervision over rotations and their temporal changes to reduce poor coordination and jitter',
          'Introduces a common evaluation over 40,025 held-out clips from six public datasets; the abstract reports wins over Kimodo on five of six dimensions and a 40.8% relative gain in average score',
        ],
        description: 'Timo shows that a stronger multimodal backbone does not automatically yield coordinated bodies. Articulated motion has strong temporal coherence but weak cross-joint correlation, calling for explicit supervision on rotations and their change over time. Although Timo is text-conditioned, its shared attention, flow matching, and kinematic losses form a plausible backbone for audio-motion modeling. Beat, section, and musical-semantic tokens could augment or replace text, followed by testing whether its semantic and motion-quality gains transfer to beat alignment.',
        href: 'https://arxiv.org/abs/2609.30761',
      },
      {
        num: 3,
        tag: 'Audio-Driven Avatars · Streaming Diffusion Distillation',
        title: 'Where and When to Force: Routed Forcing for Streaming Avatars',
        keyPoints: [
          'Finds spatially uneven mode collapse under reverse-KL DMD: pose- and gesture-heavy person regions lose the most diversity, the audio-driven mouth less, and the background remains nearly stable',
          'Applies real-video Data-Forcing Distillation to the person region while retaining DMD for mouth and background to balance motion diversity, lip synchronization, and scene stability',
          'Injects real dynamic patterns at high-noise stages and uses DMD for low-noise detail refinement; the abstract reports up to 45% more dynamics and 7–25% more diversity',
        ],
        description: 'For real-time Music-to-Dance video, the most damaging few-step failure is often not blur but a person becoming static. Routed Forcing asks where real-motion supervision is needed and when to inject it, rather than applying one loss to every pixel and noise stage. Its person mask could be refined into torso, limb, and face regions, with high-energy musical sections receiving stronger protection for dynamic modes. The current evidence is on speech avatars, however, so transferring lip synchronization gains to full-body beat synchronization needs dedicated experiments.',
        href: 'https://arxiv.org/abs/2609.30963',
      },
    ],
    worthReading: [
      { num: 1, title: 'Seeing Speech: Learning Visible Articulatory Dynamics for Speech-Driven 3D Facial Animation', tag: 'Speech-Driven 3D Face · NeurIPS 2026', href: 'https://arxiv.org/abs/2609.30517', description: 'Decomposes visible articulation into spreading, opening, and protrusion motions, retrieves phonetic context through Speech–Articulatory Memory, and composes surface-consistent motion under mesh topology. Its structured directional primitives offer a useful model for local facial motion in music-driven characters.' },
      { num: 2, title: 'DyMD: Preserving Interaction Dynamics through Distribution Matching Distillation in Few-Step Video World Models', tag: 'Few-Step Video · Dynamics Preservation', href: 'https://arxiv.org/abs/2609.31349', description: 'Uses temporal-affinity-conditioned re-noising and dynamics-guided fake-score tracking to prevent DMD from suppressing strong-motion trajectories, distilling a 14B teacher into a four-step 1.3B student. The task is embodied interaction rather than dance, but the diagnosis of good-looking yet motion-deficient outputs is directly relevant.' },
      { num: 3, title: 'Generate, Track, Improve: Perceptive Multi-Skill Humanoid Locomotion with RL-Fine-Tuned Motion Generators', tag: 'Whole-Body Motion · Flow Matching and RL', href: 'https://arxiv.org/abs/2609.31577', description: 'Plans whole-body trajectories with a perceptive flow-matching generator, tracks them with control-guided RL, and improves the generator through off-policy advantage-weighted regression. Its generate-then-track decomposition and Unitree G1 deployment suggest separating dance synthesis from executability control.' },
    ],
    observation: 'Reviewing the previous business day on Monday reveals a coherent shift: human-motion generation is moving from producing one plausible sequence toward interpretable control of style intensity, joint kinematics, and dynamic diversity. Motion Style Slider supplies an author-friendly continuous control; Timo shows that multimodal diffusion must respect rotational and temporal body structure; Routed Forcing shows that accelerated models preferentially discard high-dynamic person modes. Together they suggest a Music-to-Dance stack in which music and semantics specify content, kinematic losses preserve coordination, a continuous style variable controls expression, and few-step streaming rendering gives dedicated supervision to highly dynamic body regions. Hugging Face Daily Papers was successfully covered, but its highly relevant items were already included in earlier editions or were less direct than the September 25 arXiv papers, so all selected papers in this edition come from arXiv.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-28',
        en: '/en/daily/music-to-dance/2026-09-28',
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
      date="2026-09-28"
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
