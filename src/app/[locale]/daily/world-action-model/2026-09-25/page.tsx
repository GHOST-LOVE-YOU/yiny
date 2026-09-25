import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '可编辑动作预演：把视觉推理落到可执行机器人控制',
    description: 'World Action Model 研究日报：视觉动作工作区、几何预演与闭环修正',
    overview: [
      'World Action Agent 把动作变成执行前可预览、可修订并接受运动规划校验的视觉提案',
      '交互中心 Contact Views 与视图内修正将视觉空间判断闭环映射为可执行末端运动',
      '今日严格筛选后仅收录一篇强相关论文，不以通用视频生成或纯策略论文凑数',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Pixel-space / Geometric Action Extraction',
        title: 'World Action Agent: Harnessing VLMs for Robot Manipulation via World Action Rehearsal',
        keyPoints: [
          '构建 Visual Action Workspace：依据场景几何自动选择交互中心 Contact Views，让 VLM 在抓取器、物体与目标关系最清晰的视角中决策',
          '将动作表示为可编辑提案；系统用逆运动学与 cuRobo 规划生成半透明机器人预演并反馈可行性，主代理或 Imagination Agent 可在真实世界保持不变时反复修订',
          '执行后通过标定视图中的拖拽修正把像素空间意图转换为有界末端位移，形成观察—预演—执行—再观察的闭环',
          '仅用 LIBERO-90 演化的技能在 LIBERO-Pro 达到 75.6% 平均成功率；112 条成功轨迹（1,774 次决策）微调 Qwen3.5-9B 后，其域外成功率由 1.7% 提升到 43.3%',
        ],
        description: 'WAA 不是联合扩散式 WAM，而是几何级联路线：VLM 先在视觉工作区提出动作，几何渲染与运动规划把候选动作变成可检查的“预演世界”，再从该预演中修订并执行控制。它没有学习未来视频动力学，因此应与生成式 Joint WAM 区分；但动作提案、可视化结果、规划可行性和闭环修正被实质耦合，满足从显式视觉预演中提取可执行动作的 Cascaded WAM 边界。尤其值得注意的是，其主要增益来自接口和技能演化，而非更大的端到端动作模型。',
        href: 'https://arxiv.org/abs/2609.29964v1',
      },
    ],
    worthReading: [],
    observation: '今日新增信号不在扩散生成，而在“可编辑预演”这一更工程化的世界—动作接口。WAA 用场景点云、虚拟机器人叠加和运动规划器构造短程、局部且可核验的动作结果表示：它比学习式视频世界模型窄，却能在执行前暴露碰撞、不可达和接触方向错误。论文也清楚显示，Contact Views、预演和视图内修正的价值必须与技能库贡献分开解读——零技能 WAA 为 28.9%，演化技能版本才达到 75.6%。后续值得比较的不是“是否叫 world model”，而是 learned rollout 与 geometric rehearsal 在接触精度、延迟、失败恢复和跨场景泛化上的收益边界。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Editable Action Rehearsal: Grounding Visual Reasoning in Executable Robot Control',
    description: 'World Action Model daily digest on visual action workspaces, geometric rehearsal, and closed-loop correction',
    overview: [
      'World Action Agent turns actions into visual proposals that can be previewed, revised, and checked by motion planning before execution',
      'Interaction-centered Contact Views and in-view correction map visual spatial judgment back to executable end-effector motion',
      'Only one strongly relevant paper passes today’s strict screen; generic video generation and policy-only work are not used as filler',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Pixel-space / Geometric Action Extraction',
        title: 'World Action Agent: Harnessing VLMs for Robot Manipulation via World Action Rehearsal',
        keyPoints: [
          'Builds a Visual Action Workspace whose geometry-selected Contact Views expose local relations among the gripper, object, and target',
          'Represents each action as an editable proposal; inverse kinematics and cuRobo render a translucent robot preview and report feasibility while the main or Imagination Agent iteratively revises it without changing the physical scene',
          'Converts calibrated image-space drag corrections into bounded end-effector displacements after execution, closing the observation–rehearsal–execution–observation loop',
          'Reaches 75.6% average success on LIBERO-Pro with skills evolved only from LIBERO-90; fine-tuning Qwen3.5-9B on 112 successful trajectories (1,774 decisions) raises out-of-domain success from 1.7% to 43.3%',
        ],
        description: 'WAA is not a joint diffusion WAM; it follows a geometric cascaded route. A VLM proposes an action in a visual workspace, geometric rendering and motion planning turn it into an inspectable “rehearsed world,” and control is revised and executed from that preview. It does not learn future video dynamics and should remain distinct from generative Joint WAMs, but it substantively couples action proposals, visualized outcomes, planning feasibility, and closed-loop correction. This places it at the Cascaded WAM boundary where executable actions are extracted from explicit visual rehearsal. Its gains come primarily from interface design and skill evolution rather than a larger end-to-end action model.',
        href: 'https://arxiv.org/abs/2609.29964v1',
      },
    ],
    worthReading: [],
    observation: 'Today’s new signal is not diffusion generation but editable rehearsal as an engineering-oriented world–action interface. WAA combines a scene point cloud, virtual robot overlays, and motion planning into a short-horizon, local, verifiable representation of action outcomes. It is narrower than a learned video world model, yet can expose collisions, unreachable poses, and incorrect contact directions before execution. The results also require careful attribution: skill-free WAA averages 28.9%, while evolved skills raise it to 75.6%. Future comparisons should ask where learned rollouts outperform geometric rehearsal—and vice versa—on contact precision, latency, recovery, and cross-scene generalization, rather than debating labels alone.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-25',
        en: '/en/daily/world-action-model/2026-09-25',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-09-25" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
        {c.worthReading.map((item: { num: number; title: string; tag: string; href: string; description: string }) => (
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>
            {item.description}
          </NotableItem>
        ))}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
