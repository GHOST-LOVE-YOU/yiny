import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '互联网视频预训练统一导航，短片训练稳定长程世界模型',
    description: 'World Action Model 研究论文日报',
    overview: [
      'ScaleNav 将互联网第一视角视频中的目标导向视觉动力学迁移到可执行导航动作，并通过联合微调形成统一 world-action 框架',
      'Fréchet Forcing 不依赖长视频或教师，以短片统计约束动作条件流式世界模型，使 rollout 稳定超过 4,000 帧',
      '今天只有一篇论文越过强 WAM 门槛；另一篇作为解决长程想象漂移的重要世界模型工作列入延伸阅读',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Explicit-decoupled / Unified Training',
        title: 'ScaleNav: Scalable Internet Video Pretraining for Language-Conditioned Local Navigation',
        keyPoints: [
          '先在无动作标注的互联网第一视角视频上进行指令条件视频预训练，学习相机接近语言指定目标时的观测演化',
          '再用带动作标注的仿真数据完成 action alignment，使模型预测可执行动作块，最后联合微调视觉动力学与动作生成组件',
          '在单视角 Short-Horizon OVON 和 HabitatGS-LN 上分别达到 86.5% 与 94.9% 成功率，并部署到真实四足机器人',
          '消融中跳过独立视频预训练、仅在后两阶段混合无动作视频时，HabitatGS-LN 成功率由 94.9% 降至 90.4%',
        ],
        description: 'ScaleNav 满足强 WAM 门槛：它不是把互联网视频只当视觉表征数据，而是先学习“朝目标移动时世界如何变化”，再把这套目标导向视觉动力学与可执行动作块对齐，并在联合微调中同时优化。按 taxonomy 更接近 Joint WAM - Autoregressive 的 explicit-decoupled 路线：未来观测预测与动作输出承担不同目标，但共享训练链路，视觉动力学直接支撑导航控制。其价值在于展示动作无标注的人类第一视角视频可以扩展 WAM 的真实场景覆盖；限制是任务目标在初始视野内，尚未验证需要记忆、探索与重规划的长程导航。',
        href: 'https://arxiv.org/abs/2610.25690v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Fréchet Forcing: Training Long-Horizon Streaming World Models from Short Clips',
        tag: 'WAM 基础 · Action-conditioned Diffusion World Model',
        href: 'https://arxiv.org/abs/2610.25666v1',
        description: '面向按动作流逐块生成未来的流式视频世界模型，联合 generative anchoring、以单条真值为中心的 latent Fréchet context fidelity，以及冻结感知空间中的 reality matching；仅用短片、无需教师或在线 critic，微调 MiniWorld-1B 最多 36 GPU 小时后可稳定生成超过 4,000 帧并保持动作跟随。它没有生成或选择动作，因此不是完整 WAM，但直接解决 WAM 长时视觉想象的漂移瓶颈；论文也明确报告 DROID rollout 在 2,500 帧后仍可能出现局部伪影。',
      },
    ],
    observation: '今天的两篇工作分别推进 WAM 的数据扩展与时间扩展。ScaleNav 证明“无动作视频预训练 → 动作对齐 → 联合微调”可以把互联网第一视角经验转化为真实机器人导航控制，关键不是宽泛的视频先验，而是与目标接近过程一致的视觉动力学。Fréchet Forcing 则把长程 rollout 的监督从逐帧教师匹配改为场景统计与真实分布约束，让短片训练覆盖远超训练长度的动作条件生成。两者可形成互补路线：先以大规模视频建立目标导向动力学，再以自由 rollout 约束抑制闭环漂移；但在称为完整 WAM 前，仍应检验长程预测是否在推理时实质改变动作决策，而不仅是生成稳定的视频。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Unified Navigation from Internet Video and Stable Long-Horizon World Models from Short Clips',
    description: 'Daily research digest for World Action Models',
    overview: [
      'ScaleNav transfers goal-directed visual dynamics from Internet egocentric video into executable navigation actions through a unified world-action framework',
      'Fréchet Forcing stabilizes action-conditioned streaming world-model rollouts beyond 4,000 frames using only short clips and no teacher',
      'Only one paper clears the strong WAM threshold today; the other is included as foundational reading on long-horizon imagination drift',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Explicit-decoupled / Unified Training',
        title: 'ScaleNav: Scalable Internet Video Pretraining for Language-Conditioned Local Navigation',
        keyPoints: [
          'First performs instruction-conditioned video pretraining on action-free Internet egocentric footage to learn how observations evolve as the camera approaches a language-specified target',
          'Then aligns executable action-chunk prediction with action-labeled simulation data before jointly fine-tuning visual dynamics and action generation',
          'Reaches 86.5% and 94.9% success on single-view Short-Horizon OVON and HabitatGS-LN, respectively, and is deployed on a physical quadruped',
          'An ablation that mixes action-free video only during the latter stages, without separate video pretraining, lowers HabitatGS-LN success from 94.9% to 90.4%',
        ],
        description: 'ScaleNav clears the strong WAM threshold because Internet video is not used merely for visual representation learning. The model first learns how the world changes while approaching an instructed target, aligns those goal-directed visual dynamics with executable action chunks, and then optimizes both components jointly. It most closely fits the Joint WAM - Autoregressive explicit-decoupled taxonomy: future-observation prediction and action output have distinct targets but share a training path in which visual dynamics directly support control. The result shows how action-free human egocentric video can broaden real-scene coverage for WAMs. Its current scope is local navigation with the target visible initially, leaving memory-heavy exploration and long-horizon replanning open.',
        href: 'https://arxiv.org/abs/2610.25690v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Fréchet Forcing: Training Long-Horizon Streaming World Models from Short Clips',
        tag: 'WAM Foundation · Action-conditioned Diffusion World Model',
        href: 'https://arxiv.org/abs/2610.25666v1',
        description: 'For streaming video world models that generate future chunks under an action stream, this method combines generative anchoring, per-clip latent Fréchet context fidelity, and reality matching in a frozen perceptual space. Using only short clips, no teacher, and no online critic, it fine-tunes MiniWorld-1B in at most 36 GPU-hours to remain stable beyond 4,000 frames while following actions. It does not generate or select actions, so it is not a complete WAM, but it directly addresses long-horizon imagination drift; the paper also reports local artifacts in DROID rollouts, mostly after frame 2,500.',
      },
    ],
    observation: 'Today’s papers extend WAMs along complementary data and temporal axes. ScaleNav shows that action-free video pretraining, action alignment, and joint fine-tuning can convert Internet egocentric experience into physical navigation control; the important ingredient is goal-directed visual dynamics rather than a generic video prior. Fréchet Forcing replaces framewise teacher matching with scene-specific and real-distribution constraints, letting short clips supervise action-conditioned rollouts far beyond their training horizon. A natural combination is to learn goal-directed dynamics at Internet scale and then regularize free rollouts against closed-loop drift. Before calling such a system a complete long-horizon WAM, however, evaluation should verify that the predicted future materially changes action decisions at inference rather than merely producing stable video.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-20',
        en: '/en/daily/world-action-model/2026-10-20',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-20" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
