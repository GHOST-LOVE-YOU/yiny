import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '视频示范驱动的任务泛化与对象中心 4D 世界动作建模',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'Zero-WAM 将人类视频作为上下文任务规范，以因果视频-动作模型执行训练外操作任务',
      '4DGS-WAM 将策略预测的 actor action 与 Gaussian splat 变换预测耦合到持久 4D 场景表示中',
      'Awesome-WAM 新标记了 HiMem-WAM 与 Flash-WAM，但两篇原论文均发布于 6 月，作为参考清单新增单列',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled · In-Context Control',
        title: 'Zero-WAM: In-Context World-Action Modeling from Human Videos for Open-Ended Task Generalization',
        keyPoints: [
          '提出因果视频-动作模型，以人类示范视频作为上下文任务规范，在不更新参数的情况下执行训练外操作任务',
          '构建 HumanGen：通过自动匹配任务采样机器人轨迹与语义对应人类视频，得到覆盖 8.6K 任务的 74.2K 组人机 ICL 数据',
          '使用 in-context future chunk prediction 目标抑制已见任务捷径，迫使策略从视频提示读取任务演化信息',
          '在 RoboTwin 2.0 七个未见任务上达到 47.0% 平均成功率，较最强视频-动作基线绝对提升 29.5 个百分点，并验证真实机器人长时、多物体与精细插入泛化',
        ],
        description: 'Zero-WAM 的关键不是把视频当作普通视觉条件，而是把完整的人类任务演化放进因果 video-action 上下文。未来 chunk 预测将“世界将如何变化”与“机器人接下来如何行动”紧密连接，使跨任务泛化转化为上下文任务识别与执行问题。它属于显式解耦的自回归 Joint WAM：视频提示提供未来结构，模型输出可执行动作，并在仿真和真实机器人上检验闭环结果。',
        href: 'https://arxiv.org/abs/2608.26103v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Explicit 4D Representation · Policy-World Coupling',
        title: '4DGS-WAM: Bridging Past and Future with an Object-Centric World Action Model based on 4D Gaussian Splatting',
        keyPoints: [
          '以显式 4D Gaussian Splatting 分离动态对象与静态背景，将多视角历史观测提升为可持续复用的 4D 场景表示',
          '策略模型预测未来 actor actions，世界模型预测已观测 Gaussian splats 的变换，从而把动作与对象级未来状态直接耦合',
          '未来外推只更新动态对象并复用已观测静态背景，避免二维 WAM 反复生成冗余场景内容',
          '在 KITTI-MOT 上评估短时未来预测与历史重建；当前证据集中于驾驶场景表征，尚未展示机器人操作控制闭环',
        ],
        description: '4DGS-WAM 为像素视频 rollout 提供了结构化替代：过去观测被累积成持久的对象中心 4D 表示，策略给出 actor action，世界模型再预测该动作对应的 Gaussian 变换。它满足 WAM 的实质耦合门槛，但更接近级联式架构；实验目前验证的是预测与重建，而不是动作选择带来的闭环控制收益，因此其贡献应理解为 WAM 状态表示与计算复用，而非完整机器人策略系统。',
        href: 'https://arxiv.org/abs/2608.25956v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Flash-WAM: Modality-Aware Distillation for World Action Models', tag: '参考清单新增 · Joint WAM - Diffusion · Multi-stream · Cross-Attention', href: 'https://arxiv.org/abs/2606.05254v1', description: 'Awesome-WAM 本次标记为 NEW，但原论文发布于 2026-06-03，并非今日新论文。它针对视频与动作流不同噪声区间设计模态感知一致性蒸馏，将 LingBot-VA 两路推理压缩到单步，在 L40S 上把每个 action chunk 延迟从 8.1 秒降至 348 毫秒，同时避免朴素蒸馏的真实机器人性能崩塌。' },
      { num: 2, title: 'HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation', tag: '参考清单新增 · Joint WAM - Diffusion · Unified Stream · Explicit Future', href: 'https://arxiv.org/abs/2606.10363v1', description: 'Awesome-WAM 本次标记为 NEW，但原论文发布于 2026-06-09，并非今日新论文。方法联合学习运动级 latent action 与高层 skill latent，并在预测到技能边界时写入紧凑任务记忆，为长时操作保留因果状态，同时避免部署时生成未来视频。' },
    ],
    observation: '今天的两篇新作把 WAM 的“世界”从单一路径向两个方向扩展：Zero-WAM 用人类视频把未见任务的未来演化直接带入策略上下文，4DGS-WAM 则用持久 4D 对象表示把历史、动作和未来几何变换连接起来。前者证明任务规范可以来自视觉过程而非语言标签，后者强调不必反复生成静态像素。与此同时，Awesome-WAM 新收录的 Flash-WAM 与 HiMem-WAM 虽不是当日论文，却共同指向部署约束：联合世界-动作扩散需要更低延迟，也需要跨技能边界保留长期记忆。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Video-Demonstrated Task Generalization and Object-Centric 4D World-Action Modeling',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'Zero-WAM treats human video as an in-context task specification for a causal video-action model executing unseen manipulation tasks',
      '4DGS-WAM couples policy-predicted actor actions with Gaussian-splat transformations in a persistent 4D scene representation',
      'Awesome-WAM newly marks HiMem-WAM and Flash-WAM, but their papers date to June and are listed separately as reference-list additions',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Explicit-Decoupled · In-Context Control',
        title: 'Zero-WAM: In-Context World-Action Modeling from Human Videos for Open-Ended Task Generalization',
        keyPoints: [
          'Introduces a causal video-action model that takes a human demonstration video as an in-context task specification and executes unseen manipulation tasks without parameter updates',
          'Builds HumanGen by automatically pairing task-sampled robot trajectories with semantically matched human videos, yielding 74.2K human-robot ICL pairs across 8.6K tasks',
          'Uses an in-context future chunk prediction objective to suppress shortcuts from seen tasks and force the policy to recover task evolution from the video prompt',
          'Achieves 47.0% average success on seven unseen RoboTwin 2.0 tasks, 29.5 points above the strongest video-action baseline, with real-robot generalization to long-horizon, multi-object, and insertion settings',
        ],
        description: 'Zero-WAM does more than use video as another observation condition: it places an entire human-demonstrated task evolution in the causal video-action context. Future-chunk prediction connects how the world should change with what the robot should do next, turning cross-task generalization into in-context task inference and execution. It fits an explicit-decoupled autoregressive Joint WAM: the video prompt supplies future structure, the model emits executable actions, and closed-loop outcomes are tested in simulation and on real robots.',
        href: 'https://arxiv.org/abs/2608.26103v1',
      },
      {
        num: 2,
        tag: 'Cascaded WAM · Explicit 4D Representation · Policy-World Coupling',
        title: '4DGS-WAM: Bridging Past and Future with an Object-Centric World Action Model based on 4D Gaussian Splatting',
        keyPoints: [
          'Separates dynamic objects from static background with explicit 4D Gaussian Splatting, lifting multi-view history into a persistent reusable 4D scene representation',
          'Uses a policy model to predict future actor actions and a world model to predict transformations of observed Gaussian splats, directly coupling actions to object-level future states',
          'Extrapolates dynamic objects while reusing observed static background instead of repeatedly regenerating redundant scene content',
          'Evaluates short-horizon prediction and past reconstruction on KITTI-MOT; current evidence targets driving-scene representation rather than closed-loop robot control',
        ],
        description: '4DGS-WAM offers a structured alternative to pixel-video rollouts. Past observations accumulate into a persistent object-centric 4D representation; a policy proposes actor actions, and a world model predicts the corresponding Gaussian transformations. This is substantive world-action coupling in a cascaded architecture. Its experiments validate prediction and reconstruction rather than control gains, so the contribution is best read as a WAM state representation and computation-reuse result, not yet a complete robotic policy system.',
        href: 'https://arxiv.org/abs/2608.25956v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Flash-WAM: Modality-Aware Distillation for World Action Models', tag: 'Reference-List Addition · Joint WAM - Diffusion · Multi-stream · Cross-Attention', href: 'https://arxiv.org/abs/2606.05254v1', description: 'Awesome-WAM currently marks this entry NEW, but the paper was published on 2026-06-03 and is not a paper released today. Its modality-aware consistency distillation handles the distinct video and action noise regimes, compressing both LingBot-VA streams to one step and reducing action-chunk latency from 8.1 seconds to 348 milliseconds on an L40S without the real-robot collapse of naive distillation.' },
      { num: 2, title: 'HiMem-WAM: Hierarchical Memory-Gated World Action Models for Robotic Manipulation', tag: 'Reference-List Addition · Joint WAM - Diffusion · Unified Stream · Explicit Future', href: 'https://arxiv.org/abs/2606.10363v1', description: 'Awesome-WAM currently marks this entry NEW, but the paper was published on 2026-06-09 and is not a paper released today. It jointly learns motion-level latent actions and high-level skill latents, writing compact task memory at predicted skill boundaries to preserve causal state across long-horizon manipulation without future-video generation at deployment.' },
    ],
    observation: 'Today’s two new papers expand the “world” in WAMs along complementary axes. Zero-WAM imports the evolution of an unseen task directly into policy context through human video, while 4DGS-WAM connects history, action, and future geometric transformation in a persistent object-centric 4D representation. The former shows that task specification can be a visual process rather than a language label; the latter avoids repeatedly generating static pixels. The newly listed, older Flash-WAM and HiMem-WAM papers add a deployment perspective: joint world-action diffusion needs both lower latency and memory that survives skill boundaries.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-08-27',
        en: '/en/daily/world-action-model/2026-08-27',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-08-27" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
