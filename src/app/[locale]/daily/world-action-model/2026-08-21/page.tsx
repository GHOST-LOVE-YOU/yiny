import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '分层触觉预测、全身解耦与外科联合预报：WAM 当日三篇强相关新作',
    description: 'World Action Model 研究日报',
    overview: [
      'HiTac-WAM 将接触、三维形变与滑移风险组织成分层触觉未来预测，并把预测误差直接接入执行时重规划',
      'DECOWAM 面向腿足移动操作，把基座运动、手臂动作与相机 ego-motion 解耦后再做联合未来视频与动作建模',
      'Surgical World-Action Modeling 首次把外科视频未来状态与器械轨迹联合滚动预测到同一框架中，强调 trajectory-scene consistency',
      'Hugging Face Daily Papers 今日未发现新增强相关 WAM 候选；Awesome-WAM README 可见 HiMem-WAM 与 Flash-WAM 为清单新增参考，但并非今日新发 arXiv 论文',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream Cross-Attention',
        title: 'HiTac-WAM: A Hierarchical Tactile World Action Model for Contact-Rich Robot Manipulation',
        keyPoints: [
          '对每个 candidate action chunk 在执行前预测未来触觉序列，并将触觉未来分解为 contact state、3D deformation field 与 slip risk 三层结构',
          '使用 directed hierarchy 与 stop-gradient 条件链，把上游接触判断作为下游形变和滑移预测的结构先验，而不是把触觉仅当作另一条平铺 latent 流',
          '规划阶段用触觉未来与 task-progress jointly rank 动作候选；执行阶段若观测触觉持续偏离预测，则触发 corrective replanning',
          '摘要报告真实机器人 chip grasping、blackboard erasing、USB insertion 三项任务中，候选选择成功率由 31.1% 提升到 61.1%，完整系统达到 72.2%',
        ],
        description: '这篇论文是今天最强的 WAM 候选，因为它把“未来世界会怎样变化”具体落实为可执行前的触觉后果建模，并直接用于动作筛选与闭环纠偏。相比把 tactile token 与 video token 简单并列，HiTac-WAM 明确建模接触到形变再到滑移的因果层次，说明 world-action coupling 不一定只体现在像素视频，也可以体现在与接触操作强耦合的层级物理状态上。按 taxonomy，它最接近 Joint WAM - Diffusion 的 multi-stream 路线：触觉查询显式读取 video-action context，并在共享未来预测中服务于动作决策。',
        href: 'https://arxiv.org/abs/2608.19574v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream Shared-Representation',
        title: 'DECOWAM: Decoupled Whole-Body World-Action Model for Legged Mobile Manipulation',
        keyPoints: [
          '针对移动操作中最关键的混淆项——基座运动、手臂动作与相机视角变化——引入 dedicated conditional interfaces 做 whole-body 解耦建模',
          '冻结适配后的 FastWAM backbone，仅训练 residual adapters、action-equivalent future bottleneck、base/arm 分离 latent 与 base-velocity-conditioned video prediction 分支',
          '新建 ARMDOG 数据集，同步采集视频、whole-body state、动作与语言，使 moving-viewpoint 下的 world-action 学习可被系统评测',
          '固定重放协议中较 FastWAM 将 action MSE 降低 21.7%；79 次闭环试验里 whole-body coordination 与 base-displacement robustness 最优，任务完成率与最强基线相当',
        ],
        description: 'DECOWAM 的价值在于，它把 WAM 从固定基座操作推广到真正麻烦的 whole-body mobile manipulation。机器人一边走、一边看、一边伸手时，未来视觉变化既来自环境后果，也来自自体运动；如果不解耦，world prediction 很容易退化成 camera motion prediction。DECOWAM 通过 parameter-efficient 适配 FastWAM，并把基座/手臂/视角因素拆开后重新耦合到联合未来视频与动作预测中，属于很典型的 Joint WAM - Diffusion shared-representation 扩展。',
        href: 'https://arxiv.org/abs/2608.20114v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled',
        title: 'Towards Surgical World-Action Modeling: A Preliminary Joint Visual-Trajectory Forecasting for Surgical Motion Planning',
        keyPoints: [
          '明确指出 scene-only 预测无法评估器械运动正确性、trajectory-only 预测又无法刻画动作导致的视觉后果，因此需要联合 visual-state 与 instrument trajectory forecasting',
          '把历史视频帧与工具轨迹共同编码，经 temporal-spatial encoder 后由分离的 visual-state head 与 trajectory head 解码，形成显式双头 world-action 结构',
          '采用 chunked autoregressive rollout 连续预测 15 个 future steps，并报告 chunked 策略在全部 horizon 上优于 one-shot 预测',
          '摘要给出首段 PSNR 从 18.86 提升到 23.11 dB、ADE 从 45.77 降到 22.22 pixels，同时坦陈长时程下仍有视觉退化与轨迹误差累积',
        ],
        description: '这篇工作虽然还属于 preliminary 阶段，但它满足 WAM 的核心门槛：未来视觉与未来动作轨迹不是分开做，而是在同一预测循环中共同滚动，并以二者一致性来服务 surgical motion planning。其耦合强度弱于统一流扩散模型，但比单纯 world model 或轨迹预测更贴近“动作—世界共同演化”的定义。按 taxonomy，更适合归入 Joint WAM - Autoregressive 的 explicit-decoupled 路线。',
        href: 'https://arxiv.org/abs/2608.20284v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'World-Model-Grounded LLM Planning for AUV and ASV Navigation Near Offshore Wind Farms',
        tag: 'Cascaded WAM · World-Model Planning',
        href: 'https://arxiv.org/abs/2608.19661v1',
        description: '这篇论文把自然语言任务分解、神经世界模型、梯度轨迹优化与 MPC 式重规划串成闭环，适合关注 world-model-grounded planning 的读者。它不是联合生成式 WAM：LLM 决定做什么，世界模型负责“多久、怎么走、会不会撞”，因此更接近 cascaded pipeline，但对理解 WAM 在复杂载具导航中的工程化落地仍有参考价值。',
      },
    ],
    observation: '今天的 WAM 新作共同指向一个更具体的趋势：联合建模正在从“统一预测一个未来 latent”走向“为不同 embodiment 和接触机制显式拆分未来结构”。HiTac-WAM 用触觉层级未来直接筛动作，DECOWAM 处理 whole-body 移动操作里基座/手臂/视角的混合因子，Surgical WAM 则把视觉场景和器械轨迹放进同一滚动预测回路。相比昨天偏 decision-aligned latent 的工作，今天更像是在回答一个工程问题：当机器人未来后果来自多种物理通道时，WAM 应该把哪些未来变量拆开、哪些变量继续共享。另一方面，Awesome-WAM README 今日读取成功，确实出现 HiMem-WAM 与 Flash-WAM 的清单新增标记，但它们属于参考清单更新，不应被误报为今日新论文；Hugging Face Daily Papers 也未补充出比上述三篇更强的新候选。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Hierarchical Tactile Forecasting, Whole-Body Decoupling, and Surgical Joint Prediction',
    description: 'Daily research digest for World Action Models',
    overview: [
      'HiTac-WAM structures tactile futures into contact, 3D deformation, and slip-risk forecasts, then feeds prediction mismatch back into replanning',
      'DECOWAM targets legged mobile manipulation by decoupling base motion, arm action, and camera ego-motion before joint future-video and action modeling',
      'The surgical world-action model jointly rolls future visual states and tool trajectories in one forecasting loop to preserve trajectory-scene consistency',
      'Hugging Face Daily Papers did not add a stronger new WAM candidate today; the Awesome-WAM README shows HiMem-WAM and Flash-WAM as list additions, not today’s newly published arXiv papers',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream Cross-Attention',
        title: 'HiTac-WAM: A Hierarchical Tactile World Action Model for Contact-Rich Robot Manipulation',
        keyPoints: [
          'Forecasts a future tactile sequence for each candidate action chunk before execution, factorizing it into contact state, 3D deformation field, and slip risk',
          'Uses a directed hierarchy with stop-gradient conditioning so contact predictions become structural priors for downstream deformation and slip forecasting instead of treating touch as a flat latent stream',
          'Ranks candidate actions with tactile futures and task-progress estimates, then triggers corrective replanning when observed tactile signals persistently disagree with the retained forecast',
          'The abstract reports real-robot gains across chip grasping, blackboard erasing, and USB insertion, raising candidate-selection success from 31.1% to 61.1%, with the full system reaching 72.2%',
        ],
        description: 'This is the strongest WAM paper today because it turns future-world prediction into actionable tactile consequence modeling before contact and uses it for both action selection and closed-loop correction. Rather than flattening tactile tokens beside video tokens, HiTac-WAM models the causal hierarchy from contact to deformation to slip. That shows world-action coupling need not live only in pixel futures; it can also live in structured physical futures tightly tied to manipulation. In the taxonomy, it is closest to Joint WAM - Diffusion with a multi-stream design where tactile queries explicitly read the video-action context.',
        href: 'https://arxiv.org/abs/2608.19574v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream Shared-Representation',
        title: 'DECOWAM: Decoupled Whole-Body World-Action Model for Legged Mobile Manipulation',
        keyPoints: [
          'Introduces dedicated conditional interfaces to separate the most important confounders in mobile manipulation: base motion, arm action, and camera viewpoint change',
          'Freezes an adapted FastWAM backbone and trains only residual adapters, an action-equivalent future bottleneck, base/arm-separated latents, and a base-velocity-conditioned video-prediction branch',
          'Builds the ARMDOG dataset with synchronized video, whole-body state, action, and language for moving-viewpoint world-action evaluation',
          'Under a fixed replay protocol it reduces action MSE by 21.7% versus FastWAM; across 79 closed-loop trials it shows the strongest whole-body coordination and base-displacement robustness among compared systems',
        ],
        description: 'DECOWAM matters because it pushes WAM beyond fixed-base manipulation into whole-body mobile manipulation, where future images change because the world changes and because the robot moves its own camera. Without disentangling those factors, world prediction can collapse into viewpoint prediction. DECOWAM re-couples the factors after separating them and performs parameter-efficient adaptation on top of FastWAM, making it a strong example of a Joint WAM - Diffusion extension with a shared representation for future video and action prediction.',
        href: 'https://arxiv.org/abs/2608.20114v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled',
        title: 'Towards Surgical World-Action Modeling: A Preliminary Joint Visual-Trajectory Forecasting for Surgical Motion Planning',
        keyPoints: [
          'Argues that scene-only forecasting cannot judge tool-motion correctness, while trajectory-only forecasting misses the visual consequences of action, motivating joint visual-state and trajectory prediction',
          'Encodes historical video frames and tool trajectories jointly, then decodes them with separate visual-state and trajectory heads inside one temporal-spatial forecasting architecture',
          'Uses chunked autoregressive rollout to predict fifteen future steps and reports consistent gains over one-shot prediction across all tested horizons',
          'The abstract reports first-segment PSNR improving from 18.86 to 23.11 dB and ADE dropping from 45.77 to 22.22 pixels, while also disclosing long-horizon degradation and accumulated trajectory error',
        ],
        description: 'Although still preliminary, this work meets the WAM bar because future visuals and future tool motion are not modeled as isolated tasks; they are rolled forward together and judged by their consistency for surgical motion planning. Its coupling is weaker than unified-stream diffusion models, but substantially stronger than a pure world model or a pure trajectory predictor. In the taxonomy it best fits Joint WAM - Autoregressive with an explicit-decoupled design.',
        href: 'https://arxiv.org/abs/2608.20284v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'World-Model-Grounded LLM Planning for AUV and ASV Navigation Near Offshore Wind Farms',
        tag: 'Cascaded WAM · World-Model Planning',
        href: 'https://arxiv.org/abs/2608.19661v1',
        description: 'This paper chains natural-language mission parsing, a neural world model, gradient-based trajectory optimization, and MPC-style replanning into one deployment loop. It is not a joint generative WAM because the LLM decides what to do and the world model decides how long and how safely to do it, so it is better viewed as a cascaded pipeline. Still, it is a useful reference for engineering world-model-grounded planning in complex marine navigation.',
      },
    ],
    observation: 'Today’s WAM papers point to a concrete trend: joint modeling is moving from “predict one future latent” toward explicitly structuring the future variables that matter for each embodiment and contact regime. HiTac-WAM uses hierarchical tactile futures to rank actions, DECOWAM handles the mixed factors of base motion, arm action, and viewpoint change in whole-body mobile manipulation, and the surgical WAM places visual scene evolution and tool trajectories in one autoregressive loop. Compared with yesterday’s decision-aligned latent work, today’s papers are more about an engineering question: when future consequences arrive through multiple physical channels, which futures should a WAM separate and which should remain shared? The Awesome-WAM README was successfully refreshed and does show HiMem-WAM and Flash-WAM as new list entries, but they should be treated as bibliography updates rather than today’s new papers; Hugging Face Daily Papers likewise did not surface a stronger new candidate than the three papers above.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-08-21',
        en: '/en/daily/world-action-model/2026-08-21',
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
      date="2026-08-21"
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
