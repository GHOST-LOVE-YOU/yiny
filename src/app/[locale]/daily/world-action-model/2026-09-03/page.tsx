import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '几何潜变量扩散与世界一致性解码：WAM 的空间推理与测试时规划',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'SA-WAM 在单一扩散骨干中联合预测动作、RGB 与深度，把几何信息直接接入 WAM 的未来建模',
      'World-Coherent Decoding 将冻结 WAM 的多条未来 rollout 视为可证伪假设，并用生成信号选择更可靠的动作未来',
      '两篇工作共同把 WAM 的核心问题从“生成一个视觉未来”推进到“生成可执行且空间一致的未来”',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Unified Stream · Explicit Future Generation · 几何建模',
        title: 'Spatially Aware World Action Model via Geometric Latent Diffusion',
        keyPoints: [
          '在单一扩散骨干中联合预测机器人动作、未来 RGB 与深度，形成 3D-aware 的世界-动作模型',
          '通过非线性深度编码将无界深度信号映射到冻结 VAE tokenizer 可接受的有界输入域，无需 3D 专用 tokenizer 微调',
          '在 RoboCasa、LIBERO-Plus 与 UR5 真实机器人评测中报告强于基线的结果，并分析世界模型预测质量与 rollout 成功率的相关性',
        ],
        description: 'SA-WAM 直接满足 WAM 的联合建模定义：动作、视觉未来和几何深度共享一个扩散生成骨干。它的技术价值不只是增加深度通道，而是利用非线性编码复用大规模视频模型的 VAE 先验，使空间结构进入未来状态预测和动作预测的共同表示。对 embodied AI 而言，这为遮挡、接触和视角变化下的动作生成提供了可检验的几何约束；论文同时在仿真基准和 UR5 真实环境中验证，避免将改进停留在视频质量指标上。',
        href: 'https://arxiv.org/abs/2609.02531',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Implicit Planning · Test-Time Scaling · Self-Verification',
        title: 'World-Coherent Decoding: Self-Verifying Test-Time Planning for World Action Models',
        keyPoints: [
          '从冻结 WAM 采样多个视觉未来-动作候选，并用 flow-based video surprisal 与 action path effort 对候选进行内部排序',
          '执行后比较真实观测与所选想象，形成 imagination-reality mismatch，再训练轻量在线预测器改进未来选择，不更新 WAM 主干',
          '在 RoboTwin 2.0 Hard 设置下将成功率从 55.80% 提升到 60.90%，Horizon-3 任务报告 +16.43 个百分点，并在真实 Franka 视觉偏移测试中展示定性稳健性',
        ],
        description: 'World-Coherent Decoding 把 WAM 的测试时扩展从“多采样”变为“可靠性选择”。它没有另训一个完整世界模型，而是利用冻结 WAM 的生成惊奇度和动作路径代价，对动作条件未来进行自验证排序，再用执行反馈校准选择器。这属于 Cascaded WAM 的隐式规划路线：可执行动作由生成未来及其一致性信号共同筛选，适合研究 WAM rollout 质量不稳定时如何在不增加主干训练成本的前提下提高闭环控制可靠性。',
        href: 'https://arxiv.org/abs/2609.02159',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: '今日两篇强相关工作分别从空间表示和测试时决策补足 WAM 的两个关键短板。SA-WAM 将深度与动作、RGB 置于统一扩散流中，说明几何预测可以成为动作生成的共同约束；World-Coherent Decoding 则说明生成未来的价值取决于能否识别其中更可信的候选。二者结合的后续方向是几何感知的未来一致性评分：不仅检查视频是否像真实世界，也检查深度、接触和动作路径是否彼此可解释。需要注意的是，Awesome-WAM 本次 README 未新增 2609.* 条目，本文条目来自独立的 arXiv 检索。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Geometric Latent Diffusion and World-Coherent Decoding for Spatial Reasoning and Test-Time Planning',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'SA-WAM jointly predicts action, RGB, and depth in one diffusion backbone, bringing geometry directly into WAM future modeling',
      'World-Coherent Decoding treats multiple rollouts from a frozen WAM as falsifiable hypotheses and selects more reliable future-action candidates',
      'Together, the papers move WAM evaluation from generating a visual future toward generating an executable and spatially coherent future',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Unified Stream · Explicit Future Generation · Geometric Modeling',
        title: 'Spatially Aware World Action Model via Geometric Latent Diffusion',
        keyPoints: [
          'Jointly predicts robot actions, future RGB observations, and depth in one diffusion backbone for 3D-aware world-action modeling',
          'Uses a nonlinear depth encoding to map unbounded depth into the bounded input domain of a frozen VAE tokenizer, avoiding 3D-specific tokenizer fine-tuning',
          'Reports gains over baselines on RoboCasa, LIBERO-Plus, and real UR5 evaluation, and studies the correlation between world-model prediction quality and rollout success',
        ],
        description: 'SA-WAM directly matches the joint WAM definition: actions, visual futures, and geometric depth share one diffusion generative backbone. Its contribution is not simply adding a depth channel; the nonlinear encoding reuses a pretrained video model VAE prior while making spatial structure part of the shared future-and-action representation. For embodied AI, this supplies a testable geometric constraint under occlusion, contact, and viewpoint changes. The paper evaluates both simulation benchmarks and a real UR5 arm, keeping the claim tied to control rather than video quality alone.',
        href: 'https://arxiv.org/abs/2609.02531',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Implicit Planning · Test-Time Scaling · Self-Verification',
        title: 'World-Coherent Decoding: Self-Verifying Test-Time Planning for World Action Models',
        keyPoints: [
          'Samples multiple visual future-action candidates from a frozen WAM and ranks them with flow-based video surprisal and action-path effort',
          'Compares the executed observation with the selected imagination to obtain an imagination-reality mismatch, then trains a lightweight online selector without updating the WAM backbone',
          'Improves RoboTwin 2.0 Hard success from 55.80% to 60.90%, reports a +16.43 percentage-point gain on Horizon-3 tasks, and shows qualitative robustness on real Franka visual-shift tests',
        ],
        description: 'World-Coherent Decoding turns WAM test-time scaling from sampling more futures into selecting reliable ones. It avoids training another full world model: internal generative surprisal and action-path cost rank action-conditioned futures, while execution feedback calibrates the selector. This fits the Cascaded WAM implicit-planning route, where executable actions are chosen using both imagined futures and their coherence signals. The approach is especially relevant when rollout quality is variable and closed-loop reliability must improve without retraining the generative backbone.',
        href: 'https://arxiv.org/abs/2609.02159',
      },
    ],
    worthReading: [] as Array<{ num: number; title: string; tag: string; href: string; description: string }>,
    observation: 'Today’s two directly relevant papers address complementary WAM weaknesses: spatial representation and test-time decision quality. SA-WAM puts depth alongside action and RGB in a unified diffusion stream, showing how geometric prediction can constrain action generation; World-Coherent Decoding shows that the value of imagined futures depends on identifying the reliable candidates. A natural next step is geometry-aware future consistency scoring that checks not only visual plausibility but also whether depth, contact, and action paths explain one another. The current Awesome-WAM README adds no 2609.* entry in this run; both papers were found through independent arXiv search.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-03',
        en: '/en/daily/world-action-model/2026-09-03',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-03" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>
        ))}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
