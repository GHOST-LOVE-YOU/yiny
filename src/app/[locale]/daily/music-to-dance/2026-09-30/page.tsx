import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '群体动作双层动力学、长时视频蒸馏与语义分工扩散专家',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'BRAID 将群体互动状态与个体行为分层建模，为多人编舞生成提供可迁移的结构化潜变量',
      'RMD 分离逐块视觉质量校正与整段时序一致性，在远超训练时长的自回归视频中抑制误差累积',
      'SplitMoE 让语义专家与通用专家分工，避免视频扩散中的碎片化路由和结构失真',
      '本期另关注实时音视频世界模型、舞者节奏反馈、音频驱动人像同步与意图条件人体运动预测',
    ],
    papers: [
      {
        num: 1,
        tag: '多人动作生成 · 层级潜动力学',
        title: 'Generative Interactions: Weaving Multiparty Human Motion with Bilevel Latent Dynamics',
        keyPoints: [
          '提出 BRAID 层级序列潜变量模型，以群体级状态描述共享互动动力学，并以个体级状态描述受群体上下文约束的个人行为',
          '把社交动作生成表述为元迁移学习：跨数据集学习共享互动先验，再通过任意已观测人物与关节的上下文集合适配',
          '统一支持完整、稀疏和部分观测下的社交预测、跟踪与补全，以及响应动作生成',
          '在统一 SMPL 表示上同时评测重建、真实感、多样性、时序对齐与人际协调，并分析群体/个体潜空间的可分结构',
        ],
        description: '这是今天与多人舞蹈编排最直接的生成研究。群舞不是若干独立单人序列的叠加：队形节奏、呼应关系与个体风格必须共同演化。BRAID 显式拆分群体互动状态和个体行为，为从领舞或局部骨架推断其余舞者、跨人数迁移编排，以及把“群体气氛”作为可控接口提供了清晰结构。论文并未使用音乐条件；落到 Music-to-Dance 时，应把拍点、乐段与音乐情绪接入群体状态，并检验互动协调指标是否与音乐同步指标共同提升。',
        href: 'https://arxiv.org/abs/2609.37708',
      },
      {
        num: 2,
        tag: '长时视频生成 · 自回归蒸馏',
        title: 'Rollout-Marginal Distillation for Long-Horizon Autoregressive Video Generation',
        keyPoints: [
          '指出视频级分布匹配蒸馏会把当前块与前后文联合评分，使质量校正可能迁就历史伪影以维持表面时序一致',
          'RMD 保留模型自身生成历史作为自回归条件，但让逐块教师独立评价当前块，从而获得不受劣化上下文污染的质量信号',
          '在逐块边缘蒸馏后再施加视频级 DMD，补回独立评分缺失的跨块时序约束',
          '论文展示仅用滑动上下文、无固定锚点或额外记忆时，以 5 秒 rollout 训练的模型可维持到 500 秒生成',
        ],
        description: '完整舞曲往往远长于视频模型的训练片段，循环生成容易让人体、服装和舞台细节逐段崩坏。RMD 的关键不是再加记忆模块，而是拆开“当前块应当清晰”与“整段应当连贯”两种教师信号，避免一致性目标保护已有错误。对长舞蹈视频，这可与骨架、身份和节拍条件结合：逐块教师守住人体质量，视频级目标守住动作连续性。不过论文的通用视频实验尚不能证明舞步、拍点或足部接触在 100 倍时长上同样稳定，仍需专项量化。',
        href: 'https://arxiv.org/abs/2609.37925',
      },
      {
        num: 3,
        tag: '视频扩散扩展 · 稀疏专家路由',
        title: 'Breaking the Uniformity Trap: Scaling Video Diffusion Model via SplitMoE',
        keyPoints: [
          '诊断传统 token 级 MoE 的均匀负载约束与视频的时空冗余、语义长尾不匹配，会打散语义连贯 patch 并造成结构畸变',
          '将专家池拆为负责高层语义抽象的 semantic experts 与保留残余视觉信息和生成容量的 generic experts',
          '以原型引导路由及 pull-push 正则，让 token 按语义属性自然聚类，而非被强制均匀分配',
          '在相同激活参数预算下，论文报告相较负载均衡 MoE 有更快收敛、更连贯路由和更佳视频生成质量，并观察到粗到细去噪分工',
        ],
        description: 'Music-to-Dance 视频同时包含长时间稳定的人物身份、局部高速肢体和稀疏但关键的舞步语义，恰好不适合把所有 token 平均撒给同质专家。SplitMoE 的分工机制可让高层专家持续处理人物与舞蹈语义，通用专家补充纹理和局部变化，从而在不提高激活计算的前提下扩展容量。它目前是通用视频扩散架构，尚未证明路由会自动形成节拍或身体部位专门化；值得进一步用音频条件和姿态区域原型引导路由，并观察专家分工是否对应乐段与动作层级。',
        href: 'https://arxiv.org/abs/2609.38140',
      },
    ],
    worthReading: [
      { num: 1, title: 'HelixWorld: A Real-time Interactive Audio-Visual World Model', tag: '实时音视频 · 空间同步', href: 'https://arxiv.org/abs/2609.38123', description: '从真实立体声与度量相机位姿训练双向教师，再以在线轨迹蒸馏得到少步流式学生，在单 GPU 上以 24 FPS 联合生成画面与随视点变化的空间声音。其 HelixBench 将空间声场是否跟随动态视角形式化，可为舞台镜头运动中的音乐空间一致性提供评测参照。' },
      { num: 2, title: 'Rhythm Is a Dancer: Designing Interactive Rhythm Feedback for Beginner Dancers', tag: '舞蹈节奏 · 交互反馈', href: 'https://arxiv.org/abs/2609.37641', description: 'SkeletonDance 自动检测节奏错误，并用模仿教师拍手的极简反馈帮助初学者重新找回节奏。参与者主观上认为其提升练习信心，但受控测试中的客观改善并不稳定；这提醒生成系统的节拍指标也应区分感知帮助、实际动作纠正与舞者经验水平。' },
      { num: 3, title: 'Beyond Lip Sync: Reference-Grounded Oral Refinement for Audio-Driven Portrait Animation', tag: '音频驱动人像 · 身份细节', href: 'https://arxiv.org/abs/2609.38019', description: 'RGOR 不只追求口型同步，而是用独立注册视频、绕过 VAE 的高清嘴部 patch 和成对判别器保留特定人物的唇齿细节。其“同步正确不等于身份细节正确”的结论同样适用于舞蹈视频中的手、脚和服装局部。' },
      { num: 4, title: 'Comparing Utility of Inertial, Occupancy, Semantic, and Intent Information in Human Motion Prediction During Daily Tasks', tag: '人体运动扩散 · 意图条件', href: 'https://arxiv.org/abs/2609.37971', description: '在 9 名参与者、10 栋建筑和 238 分钟数据上比较身体运动、场景、语义、凝视与显式意图对运动扩散预测的作用；整体较恒速基线改善 42%，显式意图带来最大额外收益。对舞蹈而言，乐段级编舞意图可能比仅输入局部姿态历史更关键。' },
    ],
    observation: '今天的共同线索是把“长期一致”从单一目标拆成层级明确的状态与监督：BRAID 分开群体互动和个体动作，RMD 分开逐块质量与整段连贯，SplitMoE 分开语义抽象与通用视觉残差。对 Music-to-Dance，可据此形成一条更清晰的架构路线：音乐结构先驱动群体级编舞状态，个体潜变量生成各舞者差异；视频阶段用独立块质量信号阻止长程退化，再由语义/通用专家分别维护动作含义与视觉细节。今天没有直接以音乐生成舞蹈的新模型，因此不应把通用视频指标当作节拍对齐证据。arXiv 与 Hugging Face Daily Papers 均成功采集；HF 当日候选主要是日期较早的通用视频扩散论文，本期新稿均来自 9 月 29 日提交的 arXiv。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Bilevel Group Motion, Long-Horizon Video Distillation, and Semantically Split Diffusion Experts',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'BRAID models group interaction and individual behavior at separate levels, providing structured transferable latents for multi-person choreography',
      'RMD separates per-chunk visual correction from sequence-level temporal coherence to curb error accumulation far beyond the training horizon',
      'SplitMoE divides labor between semantic and generic experts, avoiding fragmented routing and structural distortion in video diffusion',
      'Also covered: a real-time audiovisual world model, rhythm feedback for dancers, audio-driven portrait synchronization, and intent-conditioned motion prediction',
    ],
    papers: [
      {
        num: 1,
        tag: 'Multiperson Motion · Hierarchical Latent Dynamics',
        title: 'Generative Interactions: Weaving Multiparty Human Motion with Bilevel Latent Dynamics',
        keyPoints: [
          'Introduces BRAID, a hierarchical sequential latent-variable model with a group state for shared interaction dynamics and person states for behavior conditioned on group context',
          'Frames social motion generation as meta-transfer learning: shared interaction priors are learned across datasets and adapted through arbitrary context sets of observed people and joints',
          'Supports social forecasting, tracking and in-filling, and response generation under full, sparse, or partial observations',
          'Uses a unified SMPL representation and evaluates reconstruction, realism, diversity, temporal alignment, and interpersonal coordination while probing separable group/person latent structure',
        ],
        description: 'This is today’s most direct generative study for multi-dancer choreography. Group dance is not a sum of independent solo sequences: formation rhythm, mutual responses, and individual style must evolve together. BRAID’s explicit separation of interaction state and person behavior offers a clean structure for inferring dancers from a leader or partial skeletons, transferring choreography across group sizes, and exposing group atmosphere as a control interface. It is not music-conditioned; a Music-to-Dance extension should feed beats, sections, and musical affect into the group state and test whether interpersonal coordination and music synchronization improve together.',
        href: 'https://arxiv.org/abs/2609.37708',
      },
      {
        num: 2,
        tag: 'Long-Horizon Video · Autoregressive Distillation',
        title: 'Rollout-Marginal Distillation for Long-Horizon Autoregressive Video Generation',
        keyPoints: [
          'Identifies that video-level distribution matching scores a chunk jointly with surrounding context, so correction may preserve historical artifacts merely to maintain apparent temporal consistency',
          'RMD retains self-generated history for autoregressive prediction but has a chunk teacher score the current chunk independently, yielding a quality signal uncontaminated by degraded context',
          'Applies video-level DMD after marginal chunk distillation to restore the cross-chunk temporal constraints omitted by independent scoring',
          'Demonstrates 500-second generation from 5-second rollout training using only a sliding context, without fixed anchors or additional explicit memory',
        ],
        description: 'Full songs are much longer than typical video training clips, and recurrent generation can gradually corrupt the performer, costume, and stage. RMD’s key move is to separate “this chunk should be clean” from “the sequence should be coherent,” preventing consistency objectives from protecting accumulated errors. For long dance videos, chunk teachers could preserve body quality while video-level objectives preserve motion continuity, alongside skeleton, identity, and beat conditions. Generic video evidence does not yet establish that steps, beat hits, or foot contact remain stable at 100 times the training horizon, so dedicated measurements remain necessary.',
        href: 'https://arxiv.org/abs/2609.37925',
      },
      {
        num: 3,
        tag: 'Video Diffusion Scaling · Sparse Expert Routing',
        title: 'Breaking the Uniformity Trap: Scaling Video Diffusion Model via SplitMoE',
        keyPoints: [
          'Diagnoses a mismatch between uniform token-level MoE balancing and spatiotemporally redundant, semantically long-tailed video, which fragments coherent patches and distorts structure',
          'Splits the pool into semantic experts for high-level abstraction and generic experts for residual visual information and flexible generative capacity',
          'Uses prototype-guided routing and pull-push regularization so tokens cluster naturally by semantic attributes rather than arbitrary uniform allocation',
          'At equal activated-parameter budgets, reports faster convergence, more coherent routing, and better video quality than load-balanced MoEs, with emergent coarse-to-fine denoising roles',
        ],
        description: 'Music-to-Dance video combines persistent identity, fast local limbs, and sparse but crucial dance semantics, making uniform routing across homogeneous experts a poor fit. SplitMoE could let semantic experts maintain performer and choreography meaning while generic experts recover texture and local variation, expanding capacity without raising active compute. The current work is a general video architecture and does not show automatic specialization by beat or body region. A useful next step is routing with audio conditions and pose-region prototypes, then testing whether expert roles align with musical sections and motion hierarchy.',
        href: 'https://arxiv.org/abs/2609.38140',
      },
    ],
    worthReading: [
      { num: 1, title: 'HelixWorld: A Real-time Interactive Audio-Visual World Model', tag: 'Real-Time Audiovisual · Spatial Synchrony', href: 'https://arxiv.org/abs/2609.38123', description: 'A bidirectional teacher trained on true stereo acoustics and metric camera poses is distilled into a few-step streaming student that jointly renders visuals and viewpoint-responsive spatial sound at 24 FPS on one GPU. HelixBench formalizes whether a sound field follows dynamic viewpoints, offering a useful reference for music-space consistency under moving stage cameras.' },
      { num: 2, title: 'Rhythm Is a Dancer: Designing Interactive Rhythm Feedback for Beginner Dancers', tag: 'Dance Rhythm · Interactive Feedback', href: 'https://arxiv.org/abs/2609.37641', description: 'SkeletonDance detects rhythm errors and imitates a teacher’s clapping to help beginners recover the beat. Participants reported greater confidence and helpfulness, but objective gains were inconsistent in controlled tests—a reminder to separate perceived assistance, actual motion correction, and dancer experience when evaluating rhythmic generation.' },
      { num: 3, title: 'Beyond Lip Sync: Reference-Grounded Oral Refinement for Audio-Driven Portrait Animation', tag: 'Audio-Driven Portrait · Identity Detail', href: 'https://arxiv.org/abs/2609.38019', description: 'RGOR goes beyond synchronization by using separate enrollment video, high-definition mouth patches that bypass the VAE, and a paired judge to retain person-specific lips and teeth. Its finding that correct synchrony does not guarantee correct identity detail also applies to hands, feet, and clothing in dance video.' },
      { num: 4, title: 'Comparing Utility of Inertial, Occupancy, Semantic, and Intent Information in Human Motion Prediction During Daily Tasks', tag: 'Human-Motion Diffusion · Intent Conditioning', href: 'https://arxiv.org/abs/2609.37971', description: 'Across nine participants, ten buildings, and 238 minutes, the study compares body motion, scene, semantics, gaze, and explicit intent for diffusion-based motion prediction. It improves 42% over constant velocity overall, with explicit intent yielding the largest additional reduction—suggesting phrase-level choreographic intent may matter more than local pose history alone.' },
    ],
    observation: 'Today’s shared theme is to decompose “long-term consistency” into states and supervision with explicit roles. BRAID separates group interaction from individual motion, RMD separates chunk quality from sequence coherence, and SplitMoE separates semantic abstraction from generic visual residuals. For Music-to-Dance, this suggests a concrete stack: musical structure drives group-level choreographic state; person latents generate dancer variation; independent chunk-quality signals prevent long-rollout degradation; and semantic/generic experts preserve action meaning and visual detail respectively. No new paper today directly generates dance from music, so generic video scores should not be treated as evidence of beat alignment. Both arXiv and Hugging Face Daily Papers were collected successfully. HF’s relevant candidates were older general video-diffusion work; this edition’s new papers are arXiv submissions from September 29.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-30',
        en: '/en/daily/music-to-dance/2026-09-30',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-30" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
