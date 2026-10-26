import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '统一视频—动作训练与单步未来表征自蒸馏',
    description: 'World Action Model 研究论文日报',
    overview: [
      'RynnUnify 以自回归推理器、扩散视频生成器和动作分支统一长时视觉规划与机器人控制',
      'FRED 用真实未来表征自蒸馏单步噪声表征，在不完整生成视频的情况下强化动作解码',
      '本期周一版覆盖上一个工作日以来的新论文，并补充 Hugging Face Daily Papers 新近收录的强相关工作',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream / Shared Representation',
        title: 'RynnUnify: Towards Unified Embodied Brain',
        keyPoints: [
          '以 8B 自回归推理器和 8B rectified-flow 视频生成器组成 Mixture-of-Transformers，两分支通过 joint attention 交互',
          '推理器逐步提出可执行子任务及预期视觉演化，生成器用跨片段场景记忆预测视频，生成结果再成为后续规划上下文',
          '通过 latent planning 与 joint video-action training 把完整模型扩展为 WAM，而非在独立世界模型后外挂无关策略',
          'WAM 扩展在 20 个 RoboCasa365 复合任务上达到 51.5% 成功率，并在三项真实机器人任务上平均达到 46.7%',
        ],
        description: 'RynnUnify 把“理解—预演—行动”放进同一基础模型：语言推理器决定下一子任务，扩散分支预测交互后的视觉变化，WAM 扩展再以共享能力生成控制。按 taxonomy，它最接近 Joint WAM - Diffusion 的 multi-stream/shared-representation 路线；其价值不只在联合模块数量，而在长时 rollout 中让预测视频持续改变下一步规划，并将同一视频—语言表征迁移到动作训练。需要注意，论文中的通用视觉规划、agentic reasoning 与 WAM 控制是不同扩展，控制结果不能等同于全部视频推理能力。',
        href: 'https://arxiv.org/abs/2610.32965v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream / Hidden-State Future',
        title: 'Self-Distilling Future Video Representations for World Action Models',
        keyPoints: [
          '把视频扩散模型解释为 future representation generator：从高斯噪声单次前向取得中间 hidden state，供独立扩散动作解码器使用',
          'FRED 用 EMA teacher 从带噪真实未来观测提取目标，并以自蒸馏对齐噪声输入产生的未来表征，同时加入短观测历史',
          '14B 模型将长时任务成功率从最强对比方法的 61.7% 提升到 81.7%，域外任务从 10.4% 提升到 52.1%',
          '仅由人类视频展示、机器人训练数据中缺失的技能达到 50.0% 成功率，对比最强 WAM 为 19.4%；推理约比 DreamZero 快 8 倍',
        ],
        description: 'FRED 直接优化动作解码器真正读取的“隐式未来”，而不是花费多步去噪生成完整像素。它属于 Joint WAM - Diffusion 的 multi-stream/hidden-state 路线：视频 DiT 负责产生动作相关未来表征，独立 action DiT 以该表征生成动作。最重要的证据是噪声生成未来表征的 probing 质量与控制成功率相关系数达到 0.89，而一步视频质量仅为 0.24；这把 WAM 的效率问题转化为表征学习问题。该论文 10 月 21 日首发，本期因 Hugging Face Daily Papers 新近收录而补充，不伪称为 10 月 26 日新投稿。',
        href: 'https://arxiv.org/abs/2610.30320v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'DynaSlots: Slot-Centric 3D Dynamics Pretraining for Robot Manipulation', tag: 'WAM Foundation · Slot-level Latent Dynamics', href: 'https://arxiv.org/abs/2610.32330v1', description: '把点云序列分解为时间一致 slots，以 inverse dynamics 为每个 slot 提取 latent action，再用 diffusion forward dynamics 预测 slot 未来与成对交互；在 Meta-World、Adroit 和真实 RealMan RM65-B 上改善策略。它仍是 action-free 预训练而非完整 WAM，因此列入延伸阅读。' },
      { num: 2, title: 'Echo: Coupled Action and Task Status Signal Denoising for Vision Language Action Models', tag: 'WAM-adjacent · Shared Denoising / Outcome Signal', href: 'https://arxiv.org/abs/2610.31569v1', description: '把 stop 与 failure 两个任务状态维度加入 action chunk，与动作共同去噪，并让更早变干净的状态估计调节后续动作去噪。它没有预测完整世界未来，但将可执行动作与任务结果信号紧耦合，真实操控实验显示状态预测准确并持续改善策略。' },
      { num: 3, title: 'ViT-H: Generative Video-To-Humanoid Control with Motion Tracking Feedback', tag: 'Cascaded WAM-adjacent · Diffusion Motion Generation', href: 'https://arxiv.org/abs/2610.32966v1', description: '从单目人类视频直接扩散生成 humanoid reference motion，再以 motion-tracking 结果通过 DPO 回训生成器，使生成目标更可执行；Unitree G1 实验优于重建—重定向—跟踪流水线，并提供低于 400 ms 的自回归遥操作版本。它生成的是参考动作而非环境未来，故不列 Must Read。' },
    ],
    observation: '本期两篇核心工作从两个尺度推进同一问题：怎样让视频未来真正服务动作。RynnUnify 在系统尺度上把自回归子任务推理、带记忆的视频预演与 joint video-action training 连成闭环；FRED 在表示尺度上证明，无需完整渲染未来，只要单步 hidden state 能可靠接近真实未来表征，就能显著改善长时、域外和人到机器人迁移。两者共同削弱了“高质量像素预演是 WAM 的必要条件”这一假设：关键是未来信息是否进入动作接口、是否影响后续决策，以及这种耦合能否在真实机器人上兑现。DynaSlots、Echo 与 ViT-H 则分别从对象级动力学、结果状态信号和执行反馈补足这一接口。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Unified Video–Action Training and One-Step Future Representation Distillation',
    description: 'Daily research digest for World Action Models',
    overview: [
      'RynnUnify unifies long-horizon visual planning and robot control through an autoregressive reasoner, diffusion video generator, and action extension',
      'FRED self-distills one-step future representations to strengthen action decoding without fully rendering videos',
      'This Monday edition covers releases since the previous workday and adds a strongly relevant paper newly surfaced by Hugging Face Daily Papers',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream / Shared Representation',
        title: 'RynnUnify: Towards Unified Embodied Brain',
        keyPoints: [
          'Combines an 8B autoregressive reasoner and an 8B rectified-flow video generator in a Mixture-of-Transformers whose branches interact through joint attention',
          'The reasoner proposes executable subtasks and anticipated visual evolution; cross-chunk scene memory supports video prediction, whose output becomes context for subsequent planning',
          'Extends the full model into a WAM through latent planning and joint video-action training rather than attaching an unrelated policy after a standalone world model',
          'The WAM extension reaches 51.5% success on 20 composite RoboCasa365 tasks and 46.7% average success across three real-robot tasks',
        ],
        description: 'RynnUnify places understanding, foresight, and action within one foundation model: a language reasoner selects the next subtask, a diffusion branch predicts the resulting visual evolution, and the WAM extension transfers those shared capabilities into control. In the taxonomy, it is closest to Joint WAM - Diffusion with multi-stream/shared representations. Its importance is not merely architectural breadth: predicted videos update subsequent long-horizon plans, while joint video-action training connects the same embodied representation to action. The general visual-planning, agentic-reasoning, and WAM-control variants are distinct extensions, so the robot results should not be attributed indiscriminately to every capability.',
        href: 'https://arxiv.org/abs/2610.32965v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream / Hidden-State Future',
        title: 'Self-Distilling Future Video Representations for World Action Models',
        keyPoints: [
          'Treats the video diffusion model as a future-representation generator whose single forward pass from Gaussian noise supplies an intermediate hidden state to a separate diffusion action decoder',
          'FRED uses an EMA teacher to extract targets from noisy ground-truth future observations, self-distills noise-generated representations, and adds short observation history',
          'At 14B scale, long-horizon success rises from the strongest comparator’s 61.7% to 81.7%, while out-of-domain success rises from 10.4% to 52.1%',
          'Skills shown only in human videos reach 50.0% task success versus 19.4% for the best competing WAM, with inference roughly 8x faster than DreamZero',
        ],
        description: 'FRED optimizes the implicit future actually consumed by the action decoder rather than spending multiple denoising steps on complete pixels. It fits the Joint WAM - Diffusion multi-stream/hidden-state path: a video DiT produces an action-relevant future representation and a separate action DiT generates controls from it. The strongest evidence is that probing quality for noise-generated future representations correlates with control success at 0.89, versus only 0.24 for one-step video quality. This reframes efficient WAM inference as a representation-learning problem. The paper first appeared on October 21 and is included because it was newly surfaced by Hugging Face Daily Papers, not presented as an October 26 submission.',
        href: 'https://arxiv.org/abs/2610.30320v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'DynaSlots: Slot-Centric 3D Dynamics Pretraining for Robot Manipulation', tag: 'WAM Foundation · Slot-level Latent Dynamics', href: 'https://arxiv.org/abs/2610.32330v1', description: 'Decomposes point-cloud sequences into temporally consistent slots, extracts one latent action per slot with inverse dynamics, and predicts slot futures and pairwise interactions with diffusion forward dynamics. It improves policies on Meta-World, Adroit, and a physical RealMan RM65-B, but remains action-free pretraining rather than a complete WAM.' },
      { num: 2, title: 'Echo: Coupled Action and Task Status Signal Denoising for Vision Language Action Models', tag: 'WAM-adjacent · Shared Denoising / Outcome Signal', href: 'https://arxiv.org/abs/2610.31569v1', description: 'Adds stop and failure dimensions to each action chunk, denoises status and actions jointly, and lets earlier-cleaned status estimates guide later action denoising. It does not predict a full world future, but tightly couples executable actions with task-outcome signals and consistently improves real-world manipulation.' },
      { num: 3, title: 'ViT-H: Generative Video-To-Humanoid Control with Motion Tracking Feedback', tag: 'Cascaded WAM-adjacent · Diffusion Motion Generation', href: 'https://arxiv.org/abs/2610.32966v1', description: 'Directly generates humanoid reference motion from monocular human video with diffusion and post-trains the generator through DPO using tracking outcomes, making generated targets more executable. Unitree G1 experiments outperform reconstruction-retargeting-tracking pipelines, with a sub-400 ms autoregressive teleoperation variant. Because it generates reference motion rather than environment futures, it remains Worth Reading.' },
    ],
    observation: 'The two core papers attack the same question at different scales: how can video futures become useful for action? RynnUnify connects autoregressive subtask reasoning, memory-conditioned visual rollout, and joint video-action training at the system level. FRED shows at the representation level that full future rendering is unnecessary when a one-step hidden state reliably approaches a representation of the observed future. Together they weaken the assumption that photorealistic rollout is required for WAMs. What matters is whether future information reaches the action interface, changes subsequent decisions, and improves physical execution. DynaSlots, Echo, and ViT-H complement this picture through object-level dynamics, outcome-status signals, and executability feedback.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-26',
        en: '/en/daily/world-action-model/2026-10-26',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-26" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
