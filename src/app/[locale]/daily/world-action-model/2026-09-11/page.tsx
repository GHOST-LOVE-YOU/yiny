import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '动作落地的未来预测与记忆规划：从可执行转移到长时程闭环',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'UniMPA 用动作落地的转移接口统一未来预测、双向记忆检索与流匹配动作生成',
      'MaP-WAM 将长时程视觉记忆压缩成语言—视觉计划，并联合生成未来动态、动作与进度',
      '安全约束与失败监测正在成为预测式机器人模型走向部署的重要配套层',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'UniMPA: A Unified Memory-Prediction-Action Model via Action-Grounded Transition Modeling',
        keyPoints: [
          'Persistent-Selective Future Prediction 以持续 latent 监督跟踪任务进度，并只在接触、释放等关键转移处触发像素预测',
          '未来监督的转移表示查询 Visual-Action Memory，利用历史上真实执行过的视觉—动作演化约束预测的物理可实现性',
          'Action-Visual Memory 提供动作原型，Prototype-Biased Flow 将流匹配起点偏向历史支持的动作流形，再针对当前场景细化',
          '在 LIBERO、LIBERO-Plus、RoboTwin 2.0 Hard 与真实任务上分别超过 π0.5 1.7、11.7、18.5、12.6 个百分点，且仅使用其 25–50% 训练轮次',
        ],
        description: 'UniMPA 直接命中 WAM 的核心问题：预测出来的视觉未来必须能被当前机器人动作真实实现。它没有把未来预测当作松散的辅助损失，而是让 future-supervised transition tokens 同时成为记忆检索与动作专家的接口；像素和 latent 两级监督分别保留接触细节与任务进度，双向记忆再把预期变化关联到曾经可执行的动作演化。其动作头采用流匹配，因此可归为 Joint WAM - Diffusion 的多流共享表示路线。尤其值得关注的是，显式像素解码头推理时可移除，而被未来目标塑造的转移表示仍持续参与动作生成。',
        href: 'https://arxiv.org/abs/2609.11875v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Cross-Attention',
        title: 'Memory as Plans: World-Action Modeling with Memory-Grounded Planning',
        keyPoints: [
          '将已完成片段的语言指令与稀疏视觉上下文保存为 episodic memory，由 VLM 与 causal world model 生成下一段语言—视觉计划',
          'World-Action-Progress 模型基于视频 DiT 和 Mixture-of-Transformers，联合流匹配未来视觉 latent、动作块与执行进度',
          '用 plan-observation alignment 校准递归预测的进度，并在片段完成时以真实观测更新记忆，实现可变时长的闭环重规划',
          'RMBench 成功率 83.3%，真实机器人任务成功率 78.0%；随着历史增长，执行器上下文固定且推理延迟近似恒定',
        ],
        description: 'MaP-WAM 把长时程记忆从“每一步都塞给策略”改写为“规划时读取、执行时缓存”。因果世界模型先把历史证据转成视觉计划，随后 WAP 在共享的 MoT 体系内联合建模未来动态、动作和进度；视觉计划通过交叉注意力指导控制，真实观测则用于校准进度和触发下一次规划。该设计属于 Joint WAM - Diffusion 的多流交叉注意力路线，也带有 cascaded planning 的系统结构。它对非马尔可夫操作尤其重要：既保留远期视觉证据，又避免 growing-window WAM 的延迟与显存随历史线性膨胀。',
        href: 'https://arxiv.org/abs/2609.11561v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'ActSafeGuard: Differentiable and Training-Aligned Constraint Enforcement for Flow-Matching Policies', tag: 'Joint WAM - Diffusion · 安全约束', href: 'https://arxiv.org/abs/2609.11697v1', description: '面向 π0.5 与 Fast-WAM 等流匹配策略加入可微 ray-scaling 安全层，把硬动作可行域同时纳入训练和推理；实验报告 100% 单步安全率且不牺牲任务成功率。它不新增世界预测模块，但为 diffusion WAM 的可部署动作生成提供了直接兼容的约束机制。' },
      { num: 2, title: 'FARM: Reading Failure Signals from the Internal Predictive States of a Frozen Robotic World Model', tag: 'Predictive-Latent · 执行监测', href: 'https://arxiv.org/abs/2609.11445v1', description: '仅训练 33,985 参数的读出器，从冻结 VLA-JEPA 预测状态产生逐步失败分数与因果轨迹风险；十任务及 PIPER X、SO-101、Franka 实验显示预测 latent 可复用于低开销执行监测。它不是完整动作生成 WAM，故列入延伸阅读。' },
    ],
    observation: '今日两篇 Must Read 都把“预测”从辅助表征推进为动作生成的结构性接口。UniMPA 从可执行性出发，用未来转移查询历史视觉—动作证据并偏置流匹配动作；MaP-WAM 从长时程记忆出发，把历史压缩为可缓存的视觉计划，再联合预测动态、动作与进度。共同趋势是：高价值 WAM 不再依赖测试时完整视频想象，而是保留由未来监督塑造的 latent、计划或进度信号来闭合控制环。Hugging Face Daily Papers 的当日条目未发现满足强耦合门槛的新作；Awesome-WAM 最新 README 未出现 2609.* 新条目，因此仅作为 taxonomy 核对来源。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Executable Future Prediction and Memory-Grounded Planning for Long-Horizon Closed Loops',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'UniMPA unifies future prediction, bidirectional memory retrieval, and flow-matching action generation through an action-grounded transition interface',
      'MaP-WAM compresses long-horizon visual memory into language-visual plans and jointly generates future dynamics, actions, and progress',
      'Safety constraints and failure monitoring are emerging as deployment layers for predictive robot models',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'UniMPA: A Unified Memory-Prediction-Action Model via Action-Grounded Transition Modeling',
        keyPoints: [
          'Persistent-Selective Future Prediction tracks task progress with continuous latent supervision and triggers pixel prediction only around critical transitions such as contact and release',
          'A future-supervised transition representation queries Visual-Action Memory, grounding predicted changes in visual-action evolution that was physically executed in history',
          'Action-Visual Memory supplies action prototypes, while Prototype-Biased Flow shifts the flow source toward a historically supported action manifold before scene-specific refinement',
          'Outperforms π0.5 by 1.7, 11.7, 18.5, and 12.6 points on LIBERO, LIBERO-Plus, RoboTwin 2.0 Hard, and real-world tasks while using only 25–50% of its training epochs',
        ],
        description: 'UniMPA directly addresses the central WAM question: an imagined visual future must be physically realizable by the robot in the current scene. Future prediction is not a loose auxiliary loss; future-supervised transition tokens form the common interface for memory retrieval and the action expert. Pixel and latent targets preserve contact details and task progress, while bidirectional memory links intended changes to previously executable action evolution. Because actions are generated by flow matching, this fits the multi-stream shared-representation branch of Joint WAM - Diffusion. Notably, explicit pixel decoders can be removed at inference while future-shaped transition features continue to guide action generation.',
        href: 'https://arxiv.org/abs/2609.11875v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Cross-Attention',
        title: 'Memory as Plans: World-Action Modeling with Memory-Grounded Planning',
        keyPoints: [
          'Stores completed segments as episodic memory containing language instructions and sparse visual context, then uses a VLM and causal world model to generate the next language-visual plan',
          'Its video-DiT and Mixture-of-Transformers World-Action-Progress model jointly flow-matches future visual latents, action chunks, and execution progress',
          'Plan-observation alignment calibrates recursively predicted progress, while real observations update memory at segment boundaries for variable-duration closed-loop replanning',
          'Achieves 83.3% success on RMBench and 78.0% on real-robot tasks while keeping executor context and latency approximately constant as history grows',
        ],
        description: 'MaP-WAM changes long-horizon memory from something repeatedly fed into every policy step into evidence read during planning and cached during execution. A causal world model first converts history into a visual plan; WAP then jointly models future dynamics, actions, and progress in a shared MoT system. Cross-attention communicates the visual plan to control, and real observations calibrate progress and trigger replanning. This is a multi-stream cross-attention Joint WAM - Diffusion design with a cascaded planning structure. It is particularly relevant to non-Markovian manipulation because it retains distant visual evidence without the latency and memory growth of a growing-window WAM.',
        href: 'https://arxiv.org/abs/2609.11561v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'ActSafeGuard: Differentiable and Training-Aligned Constraint Enforcement for Flow-Matching Policies', tag: 'Joint WAM - Diffusion · Safety Constraints', href: 'https://arxiv.org/abs/2609.11697v1', description: 'Adds a differentiable ray-scaling safeguard to flow-matching policies including π0.5 and Fast-WAM, aligning hard action feasibility during training and inference. It reports 100% step safety without reducing task success. While it adds no world predictor, it is a directly compatible deployment mechanism for diffusion WAM action generation.' },
      { num: 2, title: 'FARM: Reading Failure Signals from the Internal Predictive States of a Frozen Robotic World Model', tag: 'Predictive-Latent · Execution Monitoring', href: 'https://arxiv.org/abs/2609.11445v1', description: 'Trains only a 33,985-parameter readout on frozen VLA-JEPA predictive states to produce step-wise failure scores and causal trajectory risk. Tests across ten tasks and PIPER X, SO-101, and Franka suggest predictive latents can support low-overhead monitoring. It is not a complete action-generating WAM, so it remains Worth Reading.' },
    ],
    observation: 'Both Must Read papers turn prediction from auxiliary representation learning into a structural interface for action generation. UniMPA begins with realizability, using future transitions to retrieve visual-action evidence and bias flow-matched actions. MaP-WAM begins with long-horizon memory, compressing history into cacheable visual plans before jointly predicting dynamics, actions, and progress. The shared trend is that capable WAMs need not render complete videos at test time; future-supervised latents, plans, or progress can close the control loop more efficiently. No Hugging Face Daily Papers entry for the day met the strong coupling threshold. The latest Awesome-WAM README contained no 2609.* entry and was used only to verify taxonomy.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-11',
        en: '/en/daily/world-action-model/2026-09-11',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-11" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
