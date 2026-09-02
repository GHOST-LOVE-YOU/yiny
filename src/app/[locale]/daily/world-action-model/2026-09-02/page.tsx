import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '可扩展视频预训练、闭环决策与潜在世界-动作部署',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'ZimaBlue 以 120,000 小时以上具身视频预训练、视频-动作中训练和目标机器人专化，将无动作视频转化为可泛化 WAM',
      'Motus2 用共享权重的策略、动作条件模拟器和价值评估器形成候选动作提出、未来预测、结果评估的闭环',
      'AcrossWAM1.0 明确拆分 latent world decoder、policy adapter 与 flow-matching action expert，提供可审计的紧凑部署路径',
      'CAER 将监督聚焦于由动作因果影响的 future tokens，提示 WAM 训练应优化交互结果而非背景重建',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent · Slow-Fast Control',
        title: 'ZimaBlue: Evolving Generalizable World Action Models through Scalable Video Pre-training',
        keyPoints: [
          '采用三阶段课程：先在大规模人类和机器人第一视角视频上进行因果具身视频预训练，再以统一动作表征进行视频-动作中训练，最后适配目标机器人',
          'Slow-Fast 双系统以高容量世界模型提供时空表征，以轻量 Fast 分支在 NVIDIA RTX 4090 上实现 30 Hz 动作预测',
          '真实机器人零样本评测中，将训练从仅目标机器人数据扩展到 120,000 小时以上具身视频后，成功率从 36.1% 提升至 77.8%',
        ],
        description: 'ZimaBlue 的关键不是把视频预训练附加到策略前，而是通过统一动作表征把无动作的具身视频动态重新落地为视频-动作模型，再让慢速世界分支和实时动作分支协同工作。它对应 predictive-latent 的 Joint WAM：世界模型的表征直接服务于实时控制，并用真实机器人零样本结果检验视频规模化是否转化为行动泛化。',
        href: 'https://arxiv.org/abs/2609.00188v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Shared Representation · Closed-Loop Planning',
        title: 'Motus2: A Self-Evolving General World Model for Dexterous Manipulation',
        keyPoints: [
          '一个共享权重模型暴露策略、动作条件模拟器和价值模型三种控制接口：策略提出 action chunks，模拟器预测视觉后果，评估器评价预测结果',
          '三接口耦合为用于策略改进的闭环决策与学习过程，而不是给世界模拟器附加独立动作头',
          '数据从单目第一视角扩展到同步双目第一视角，再以机器人轨迹和人机对齐数据进行机器人域适配，并加入触觉反馈支持接触感知控制',
        ],
        description: 'Motus2 满足 WAM 的强耦合标准：动作候选的选择由其动作条件未来和价值评估共同决定，策略、世界模型和评估器共享参数而非串联为松散模块。论文重点是灵巧双手平台上的自我改进闭环；摘要未提供可复核的成功率，因此本条不推断其具体性能幅度。',
        href: 'https://arxiv.org/abs/2608.30237v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'AcrossWAM1.0: A Modular Latent World-Action Stack for Compact Robot Policies',
        keyPoints: [
          '将 latent world-action stack 显式拆为产生 latent-action 与 action-generation context 的 policy adapter、保留的 latent world decoder，以及生成连续 action chunks 的 flow-matching expert',
          '将训练期教师与推理图分离，并提供可核验的部署导出；紧凑 checkpoint 含 1,472.6M unique parameters，比原 2B policy 少 42.4%',
          '在 2,000 个配对 LIBERO episodes 上，Qwen3.5-0.8B backbone 达到 97.45% 成功率，Qwen3-VL-2B 为 98.00%；跨模型家族闭环迁移仍被作者明确列为开放评估',
        ],
        description: 'AcrossWAM1.0 的方法贡献主要是把 latent future subgoal、当前场景中的 world transition grounding 与连续动作流分别放入可审计模块。其连续动作由 flow matching 生成，且世界解码器和动作上下文在同一潜在堆栈中耦合，最贴近 taxonomy 中的 multi-stream shared-representation Joint WAM；该分类是基于摘要结构的编辑判断，而不是作者自定标签。',
        href: 'https://arxiv.org/abs/2608.29937v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'CAER: Causal Action Effect Reweighting for World Model Training', tag: 'Action-Conditioned World Model · Causal Supervision · 参考延伸', href: 'https://arxiv.org/abs/2608.30897v1', description: '在线比较带与不带动作条件的模型预测，定位未来中受动作因果影响的 tokens，再在不改变总系数质量的前提下重分配监督权重。实验报告改善了动作条件视频的物理一致性、可控性和视觉质量。论文没有直接给出策略学习或规划接口，因此保留为高相关的训练方法而非 Must Read WAM。' },
      { num: 2, title: 'Hydra: A Navigation World Action Model with Discrete Latent Planning and Continuous Flow-Matching Execution', tag: 'Joint WAM - Diffusion · Unified-Discrete · 参考延伸', href: 'https://arxiv.org/abs/2608.28995v1', description: '在视觉状态、物理姿态和控制动作之间建立统一潜在流形，并以离散 latent planning 在不解码像素的情况下采样和排序候选，再以 conditional flow matching 输出连续轨迹。摘要称其在两种实体机器人平台的目标导向规划中优于已有世界模型；本次作为周末以来的补充阅读。' },
    ],
    observation: '本轮强相关新作集中在把可扩展视觉经验变成动作选择的接口上。ZimaBlue 的 Slow-Fast 设计表明大型视频世界模型可离开控制关键路径而继续提供泛化表征；Motus2 进一步让策略用模拟的未来和价值判断自我改进；AcrossWAM1.0 则把这种潜在世界-动作链条拆成可部署、可审计的模块。扩散分支的直接新作较少，但 AcrossWAM1.0 与 Hydra 都将连续 flow-matching action generation 接到共享潜在规划表征，值得追踪其真实闭环迁移结果。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Scalable Video Pre-training, Closed-Loop Decisions, and Latent World-Action Deployment',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'ZimaBlue turns action-free embodied video into a generalizable WAM through 120,000+ hours of pre-training, video-action mid-training, and target-robot specialization',
      'Motus2 closes a decision loop with shared-weight policy, action-conditioned simulation, and value evaluation interfaces',
      'AcrossWAM1.0 separates a latent world decoder, policy adapter, and flow-matching action expert for auditable compact deployment',
      'CAER focuses world-model supervision on future tokens causally affected by action rather than background reconstruction',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent · Slow-Fast Control',
        title: 'ZimaBlue: Evolving Generalizable World Action Models through Scalable Video Pre-training',
        keyPoints: [
          'Uses a three-stage curriculum: causal embodied-video pre-training on large-scale human and robot egocentric video, video-action mid-training with a unified action representation, then target-robot specialization',
          'A Slow-Fast dual system combines a high-capacity world model for spatiotemporal representations with a lightweight Fast branch that predicts actions at 30 Hz on an NVIDIA RTX 4090',
          'In real-robot zero-shot evaluation, scaling from target-robot-only data to more than 120,000 hours of embodied video raises success from 36.1% to 77.8%',
        ],
        description: 'ZimaBlue does more than prepend video pre-training to a policy. Its unified action representation grounds action-free embodied dynamics back into a video-action model, then coordinates a slow world branch with a real-time action branch. It fits predictive-latent Joint WAM because world-model representations directly serve control and the scaling claim is tested through real-robot zero-shot transfer.',
        href: 'https://arxiv.org/abs/2609.00188v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Shared Representation · Closed-Loop Planning',
        title: 'Motus2: A Self-Evolving General World Model for Dexterous Manipulation',
        keyPoints: [
          'One shared-weight model exposes policy, action-conditioned simulator, and value-model interfaces: the policy proposes action chunks, the simulator predicts visual consequences, and the evaluator assesses outcomes',
          'Coupling the three interfaces creates a closed decision-and-learning loop for policy improvement rather than merely attaching an action head to a world simulator',
          'The data curriculum moves from monocular to synchronized stereo egocentric video, then robot-domain adaptation with robot trajectories and human-robot alignment data, adding tactile feedback for contact-aware control',
        ],
        description: 'Motus2 meets the strong WAM-coupling criterion because candidate actions are selected using their action-conditioned futures and value estimates, while policy, world model, and evaluator share parameters instead of forming a loose pipeline. The work focuses on a dexterous bimanual platform and self-improvement loop. Its abstract provides no verifiable success rate, so this entry does not infer a quantitative performance claim.',
        href: 'https://arxiv.org/abs/2608.30237v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'AcrossWAM1.0: A Modular Latent World-Action Stack for Compact Robot Policies',
        keyPoints: [
          'Makes the latent world-action stack explicit: a policy adapter emits latent-action and action-generation contexts, a retained latent world decoder grounds transitions in the current scene, and a flow-matching expert produces continuous action chunks',
          'Separates training-only teachers from the inference graph and ships a verifiable deployment export; its compact checkpoint has 1,472.6M unique parameters, 42.4% fewer than the original 2B policy',
          'On 2,000 paired LIBERO episodes, a Qwen3.5-0.8B backbone obtains 97.45% success against 98.00% for Qwen3-VL-2B; closed-loop cross-family transfer remains an explicit open evaluation',
        ],
        description: 'AcrossWAM1.0 contributes an auditable decomposition of latent future subgoals, current-scene transition grounding, and continuous action flow. Its continuous actions are generated through flow matching and its world decoder and action contexts remain coupled within one latent stack, making it closest to the multi-stream shared-representation Joint WAM taxonomy. That classification is an editorial reading of the abstract structure, not an author-supplied label.',
        href: 'https://arxiv.org/abs/2608.29937v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'CAER: Causal Action Effect Reweighting for World Model Training', tag: 'Action-Conditioned World Model · Causal Supervision · Further Reading', href: 'https://arxiv.org/abs/2608.30897v1', description: 'Compares predictions with and without action conditioning online to localize future tokens causally affected by action, then reallocates supervision while preserving total coefficient mass. It reports better physical consistency, controllability, and visual quality in action-conditioned video. Because it does not directly provide policy learning or planning, it remains a high-relevance training method rather than a Must Read WAM.' },
      { num: 2, title: 'Hydra: A Navigation World Action Model with Discrete Latent Planning and Continuous Flow-Matching Execution', tag: 'Joint WAM - Diffusion · Unified-Discrete · Further Reading', href: 'https://arxiv.org/abs/2608.28995v1', description: 'Builds a unified latent manifold over visual states, physical poses, and controls; discrete latent planning samples and ranks candidates without pixel decoding, then conditional flow matching emits continuous trajectories. Its abstract reports stronger goal-directed planning than existing world models on two physical robot platforms. Included as a weekend catch-up item.' },
    ],
    observation: 'This cycle’s strongest papers focus on the interface that turns scalable visual experience into action selection. ZimaBlue keeps a large video world model off the control-critical path while retaining its generalizable representations; Motus2 lets the policy improve through simulated futures and value judgment; and AcrossWAM1.0 breaks the latent world-action chain into deployable, auditable modules. Direct diffusion-based releases are sparse, but AcrossWAM1.0 and Hydra both connect continuous flow-matching action generation to shared latent planning representations, making their real closed-loop transfer results worth tracking.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-02',
        en: '/en/daily/world-action-model/2026-09-02',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-02" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
