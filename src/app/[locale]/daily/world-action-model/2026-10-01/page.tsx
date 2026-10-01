import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '让想象失败成为策略的主动教练',
    description: 'World Action Model 研究论文日报',
    overview: [
      'RoboCoach 用共享动作条件世界模型预演组合技能，并定位最先失败的子任务',
      '想象失败不只用于规划，还直接决定采集哪些演示、更新哪个技能专家',
      'PRISM 展示生成式视频经接触约束重建后可扩增人形机器人策略数据',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Latent Planning / Policy Improvement',
        title: 'RoboCoach: World Models as Active Coaches for Compositional Robot Skills',
        keyPoints: [
          '提出 Route–Imagine–Diagnose–Improve（RIDI）闭环：把下一未完成子任务路由给可复用技能专家，在共享动作条件世界模型 CoachWorld 中 rollout，再由进度判别器记录首个未完成子任务',
          '聚合想象失败记录，联合决定应追加哪个子任务的演示，以及只更新哪个专家适配器，把世界模型预测直接转化为有针对性的数据采集与策略改进',
          '在两个仿真套件和 Franka、AgileX 两种真实机器人上评估；22 个任务—策略对的想象成功率与部署成功率达到 Spearman ρ=0.840',
          '仅增加 150 条子任务演示后，Franka 成功率从 13.3% 升至 75.0%，AgileX 从 40.0% 升至 83.8%；四个未见组合平均达到 35.0%，均匀采样更新的共享策略基线为 0%',
        ],
        description: 'RoboCoach 没有联合生成像素未来与动作，因此不是 Joint Diffusion WAM；它更接近 Cascaded WAM 的 latent planning 路线。其 world–action coupling 仍然实质而明确：动作条件世界模型执行当前技能策略的想象轨迹，预测出的首个失败位置随后直接控制真实演示预算和专家更新位置。相比仅用世界模型给策略提供额外特征，RIDI 把“在哪里会失败”闭合到“教什么、改哪个策略模块”，并用真实机器人相关性验证了想象的决策价值。代码仓库已在论文元数据中给出，也提升了后续复核与复现的可行性。',
        href: 'https://arxiv.org/abs/2609.39685v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Counterfactual Video Generation Enables Scalable Humanoid Loco-Manipulation',
        tag: 'Cascaded WAM 邻近 · 生成视频到策略数据',
        href: 'https://arxiv.org/abs/2609.38172v1',
        description: 'PRISM 从少量真实示例生成数百段反事实人—物交互视频，再以接触锚定的 real-to-sim 管线重建并重定向为物理可行轨迹，训练只依赖机载深度的统一人形机器人策略，并在真实机器人上零微调泛化到多类未见物体。它没有在线动作条件未来预测，也未联合生成动作，因而只列为 WAM 邻近工作；但其“生成视觉未来→几何/接触约束动作轨迹→策略”的级联接口对 Cascaded WAM 数据闭环很有参考价值。',
      },
    ],
    observation: '今天的强相关信号不在更大的联合生成器，而在世界模型如何进入策略改进闭环。RoboCoach 把动作条件想象的输出从“供人查看的预测”变成可执行的监督分配器：失败发生在哪个子任务，决定下一条演示和下一次参数更新去哪里。这种 Cascaded WAM 设计避开了在线像素生成延迟，同时保留了反事实 rollout 对长时组合任务的价值。PRISM 则从另一端说明，生成视频若经过接触与物理约束，可以成为可执行策略的数据源；但由于其视频生成并非在线动作条件世界预测，且策略与生成器分开训练，不能把它夸大为强 WAM。值得继续观察的是：主动教练式 world model 能否与 Joint Diffusion WAM 的共享表征结合，把“预测失败、请求数据、更新动作”压缩进统一训练闭环。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Turning Imagined Failures into Active Policy Coaching',
    description: 'Daily research digest for World Action Models',
    overview: [
      'RoboCoach rehearses compositional skills in a shared action-conditioned world model and identifies the first failing subtask',
      'Imagined failures directly determine which demonstrations to collect and which skill expert to update',
      'PRISM shows how contact-constrained reconstruction can turn generated videos into scalable humanoid policy data',
    ],
    papers: [
      {
        num: 1,
        tag: 'Cascaded WAM · Latent Planning / Policy Improvement',
        title: 'RoboCoach: World Models as Active Coaches for Compositional Robot Skills',
        keyPoints: [
          'Introduces a Route–Imagine–Diagnose–Improve loop that routes the next unfinished subtask to a reusable expert, rolls it out in the shared action-conditioned CoachWorld model, and records the first unresolved subtask with a progress judge',
          'Aggregates imagined failures to jointly choose which subtask demonstrations to acquire and which expert adapter to update, directly converting world-model predictions into targeted data collection and policy improvement',
          'Evaluates on two simulation suites and two real-robot platforms, Franka and AgileX; imagined and deployed success correlate across 22 task-policy pairs with Spearman ρ=0.840',
          'With 150 additional subtask demonstrations, success rises from 13.3% to 75.0% on Franka and from 40.0% to 83.8% on AgileX; four held-out compositions average 35.0%, versus 0% for a uniformly updated shared-policy baseline',
        ],
        description: 'RoboCoach does not jointly generate pixel futures and actions, so it is not a Joint Diffusion WAM; it fits the Cascaded WAM latent-planning family more closely. Its world–action coupling is nevertheless substantive: an action-conditioned world model executes imagined trajectories under skill policies, and the predicted first failure directly controls the real demonstration budget and the expert update location. Rather than merely supplying auxiliary features to a policy, RIDI closes the loop from “where will this fail?” to “what should be taught and which policy module should change?” Real-robot correlation validates the decision value of that imagination. The paper metadata also links a code repository, improving the prospects for independent verification.',
        href: 'https://arxiv.org/abs/2609.39685v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'Counterfactual Video Generation Enables Scalable Humanoid Loco-Manipulation',
        tag: 'Cascaded-WAM Adjacent · Generated Video to Policy Data',
        href: 'https://arxiv.org/abs/2609.38172v1',
        description: 'PRISM expands a few real examples into hundreds of counterfactual human-object videos, then uses contact-anchored real-to-sim reconstruction and retargeting to obtain physically plausible trajectories. A unified humanoid policy using onboard depth transfers to unseen object instances on a real robot without real-world fine-tuning. Because generation is neither online action-conditioned future prediction nor joint action generation, this remains WAM-adjacent; its generated-visual-future-to-constrained-action-trajectory-to-policy interface is still useful for Cascaded WAM data loops.',
      },
    ],
    observation: 'Today’s strongest signal is not a larger joint generator, but a tighter path from world modeling to policy improvement. RoboCoach turns action-conditioned imagination from a prediction for inspection into an executable supervision allocator: the subtask where failure first appears determines where the next demonstration and parameter update go. This Cascaded WAM design avoids online pixel-generation latency while retaining the counterfactual value of rollout for long-horizon compositions. From the other direction, PRISM shows that generated video can become executable policy data after contact and physical constraints, but it should not be overstated as a strong WAM because video generation is not an online action-conditioned world predictor and the policy is trained separately. A key next question is whether active coaching can be combined with shared representations from Joint Diffusion WAMs to unify failure prediction, data requests, and action updates.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-10-01',
        en: '/en/daily/world-action-model/2026-10-01',
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
      date="2026-10-01"
      roleId="world-action-model"
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
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>
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
