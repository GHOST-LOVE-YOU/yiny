import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '异步长程想象、流匹配双专家与动作条件三维未来',
    description: 'World Action Model 研究日报：异步扩散、联合流匹配与动作条件世界预测',
    overview: [
      'LiMA 用异步双系统连接稀疏长程意图与高频灵巧控制',
      'InternW0 以视频—动作双专家联合学习视觉未来与连续控制',
      'NowWAM 证明当前帧去噪轨迹本身也可成为动作学习接口',
      'PointCast 用动作条件扩散预测统一多种物体动力学并直接进入 MPC',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-stream / Shared Representation',
        title: 'LiMA: Bridging Long-term Imagination to Real-time Dexterous Manipulation via Asynchronous Diffusion',
        keyPoints: [
          '采用异步双系统：慢系统生成稀疏长程时空意图，快系统进行稠密高频动作细化，使规划不阻塞反应控制',
          '以 Latent Schrödinger Bridge Coupling 将稀疏意图到连续动作的细化表述为熵正则概率输运',
          '在六项双臂灵巧操作任务上取得 70.8% 总体成功率、78.9% 平均子任务成功率，并较 Cosmos-Policy 降低 45.8% 推理延迟',
        ],
        description: 'LiMA 将“想象未来”和“马上行动”放在不同时间尺度却保持生成式耦合，是面向真实接触动态的多流 Joint WAM。它没有要求慢速世界想象在每次控制更新时重算，而是让快速动作细化持续吸收稀疏意图，直接回应扩散 WAM 延迟过高的问题。对长时灵巧操作而言，其价值在于同时保留长程任务结构与局部接触反应能力。',
        href: 'https://arxiv.org/abs/2609.28431v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-stream / Cross-Attention',
        title: 'InternW0: A Foundational Physical World Model for Efficient Real-World Interactions',
        keyPoints: [
          '通过非对称视频—动作架构与 flow matching，联合学习长程未来视觉动力学和高频连续机器人控制',
          '视频专家提供预测上下文，轻量动作专家以更快频率运行；观测条件路由复用并更新逐层 K/V，无需每次动作更新都重生成未来',
          '在约 7,200 小时异构机器人与第一视角数据上训练，并加入力觉、触觉的接触感知后训练',
          '覆盖仿真和真实科学任务，包括 15 阶段 MOF 合成与 5 阶段接触/力感知定量移液',
        ],
        description: 'InternW0 是今日最完整的联合世界—动作系统：未来视频与连续动作在 flow-matching 框架中共同训练，却按不同频率执行。其上下文路由把昂贵的长程视觉预测变成可复用状态，再由动作专家随新观测快速校正，兼顾预测、闭环控制、跨具身接口和接触信号，体现了多流 WAM 从实验基准走向复杂真实流程的系统化方向。',
        href: 'https://arxiv.org/abs/2609.27656v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Unified Stream / Implicit Future Prediction',
        title: 'Beyond Future Prediction: Denoising as Generative Adaptation for Robot Control',
        keyPoints: [
          '提出 NowWAM：在同一视觉去噪流上联合恢复当前观测并预测机器人动作，不再需要独立的未来帧监督目标',
          '受控比较显示过去帧和未来帧目标表现接近，而只在干净端点训练会显著损害鲁棒性，说明关键接口是完整去噪轨迹',
          '在 LIBERO-Plus 上以 FLUX2-Klein 达到 87.7%，较未来目标基线提升 6.1 点，同时视觉 token 减半、单步训练加速 1.8 倍',
        ],
        description: 'NowWAM 对 WAM 的“world”提出重要边界问题：动作学习是否必须显式生成未来？结果表明，生成模型沿噪声到当前观测的轨迹已经提供可被动作头共享的结构化表示。它仍是世界生成目标与控制的实质联合，而不是普通 diffusion policy；但其 implicit future 路线用更低训练成本挑战了“必须预测未来帧”的默认设计。',
        href: 'https://arxiv.org/abs/2609.28339v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Latent Planning / Diffusion World Model',
        title: 'PointCast: One World Model for Rigid, Articulated, and Deformable Object Manipulation',
        keyPoints: [
          '以保持点身份的三维点集表示物体与末端执行器，统一覆盖刚体、布料、绳索和多关节柜体',
          '扩散 Transformer 在历史点轨迹和指令末端运动条件下去噪未来点位置窗口，以交叉注意力显式表达动作—对象耦合',
          '19.8M 参数架构在仿真四种动力学中的三种排名第一，并在真实遥操作数据六类指标中全面优于数据集原模型',
          '将冻结模型以每个窗口一次网络评估接入采样式 MPC，在 64 个仿真回合的四项任务中达到或超过全部基线',
        ],
        description: 'PointCast 是清晰的 Cascaded WAM：先预测候选末端动作造成的三维点级未来，再由 MPC 选择可执行控制。点身份监督避免只拟合终态形状而忽略运动路径，拓扑无关表示又让同一建模原则横跨刚体、关节体与柔性体。它尤其适合研究几何未来预测如何真正转化为规划收益。',
        href: 'https://arxiv.org/abs/2609.28393v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Frozen Flows Forget: Diagnosing and Restoring Lost Motion in a Latent-flow World Model', tag: 'Joint WAM - Autoregressive · Predictive-Latent', href: 'https://arxiv.org/abs/2609.28414v1', description: 'DART 用解码路径监督修复冻结自监督潜空间中静止或“瞬移”的操作物体运动，并指出像素误差会错误奖励冻结预测；对动作耦合潜世界模型的训练和评测很关键。' },
      { num: 2, title: 'MemBodied: Recurrent Associative Memory for Vision-Language-Action Models', tag: 'WAM 邻域 · 历史条件 VLA', href: 'https://arxiv.org/abs/2609.28256v1', description: '为 VLA 引入循环联想记忆，在固定上下文成本下保留回合级历史；尚未联合预测世界未来，但对长时 WAM 的状态压缩值得参考。' },
      { num: 3, title: 'Watch, Recall, Act: Always-On Robots in Concurrent Embodied Streams', tag: 'WAM 邻域 · 流式闭环策略', href: 'https://arxiv.org/abs/2609.28429v1', description: '用异步模块把实时感知、具身状态和历史动作写入 π0.5 的上下文，面向不重置、可中途干预的双臂并发流；属于政策系统而非严格联合 WAM。' },
    ],
    observation: '今日最清晰的趋势是“不同时间尺度上的世界—动作耦合”。LiMA 与 InternW0 都拒绝让昂贵的未来生成锁住控制频率：前者以慢想象/快细化异步协作，后者以视频专家的可复用 K/V 服务高频动作专家。与此同时，NowWAM 从另一端追问显式未来是否必要，并显示去噪轨迹本身可以承担共享表征接口；PointCast 则证明显式、动作条件化的三维未来在 MPC 中仍有直接价值。未来比较不应只问是否生成视频，而应量化预测表征是否提升闭环决策、更新频率和接触鲁棒性。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Asynchronous Long-Horizon Imagination, Flow-Matched Dual Experts, and Action-Conditioned 3D Futures',
    description: 'World Action Model daily digest on asynchronous diffusion, joint flow matching, and action-conditioned prediction',
    overview: [
      'LiMA connects sparse long-horizon intent to high-frequency dexterous control with an asynchronous dual system',
      'InternW0 jointly learns visual futures and continuous control with video and action experts',
      'NowWAM shows that the current-frame denoising trajectory itself can interface with action learning',
      'PointCast predicts action-conditioned 3D futures across object regimes and places them directly inside MPC',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-stream / Shared Representation',
        title: 'LiMA: Bridging Long-term Imagination to Real-time Dexterous Manipulation via Asynchronous Diffusion',
        keyPoints: [
          'Uses an asynchronous dual system: a slow module generates sparse long-horizon spatiotemporal intent while a fast module refines dense, high-frequency actions',
          'Introduces Latent Schrödinger Bridge Coupling, casting sparse-intent-to-action refinement as entropy-regularized probabilistic transport',
          'Reaches 70.8% overall and 78.9% average subtask success across six bimanual dexterous tasks while reducing latency by 45.8% versus Cosmos-Policy',
        ],
        description: 'LiMA couples imagining and acting at different timescales without forcing either into a single update rate. Slow world imagination supplies persistent intent while fast generative refinement reacts to contact changes. This multi-stream Joint WAM directly addresses diffusion latency and preserves both long-horizon task structure and local physical responsiveness.',
        href: 'https://arxiv.org/abs/2609.28431v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-stream / Cross-Attention',
        title: 'InternW0: A Foundational Physical World Model for Efficient Real-World Interactions',
        keyPoints: [
          'Jointly learns long-horizon visual dynamics and high-frequency continuous robot control with an asymmetric video-action flow-matching architecture',
          'A video expert supplies predictive context while a lightweight action expert runs faster; observation-conditioned routing reuses and updates layerwise K/V instead of regenerating every future',
          'Trains on roughly 7,200 hours of heterogeneous robot and egocentric data and adds force and tactile signals through contact-aware post-training',
          'Evaluates in simulation and real scientific workflows, including 15-stage MOF synthesis and five-stage force-aware quantitative pipetting',
        ],
        description: 'InternW0 is the most comprehensive joint world-action system today. Future video and continuous action are trained together through flow matching but executed at different frequencies. Context routing turns expensive predictive computation into reusable state that the action expert can update from fresh observations, combining prediction, closed-loop control, embodiment interfaces, and contact sensing.',
        href: 'https://arxiv.org/abs/2609.27656v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Unified Stream / Implicit Future Prediction',
        title: 'Beyond Future Prediction: Denoising as Generative Adaptation for Robot Control',
        keyPoints: [
          'NowWAM denoises the current observation and predicts robot actions from the same visual stream, removing the need for a separate future-frame target',
          'Controlled comparisons find past and future targets comparable, while clean-endpoint-only training sharply reduces robustness, identifying the full denoising trajectory as the useful interface',
          'With FLUX2-Klein it reaches 87.7% on LIBERO-Plus, 6.1 points above the future-target baseline, while halving visual tokens and accelerating training steps by 1.8x',
        ],
        description: 'NowWAM asks whether the world component must explicitly render the future. Its results indicate that a generative model’s noise-to-current-observation trajectory already supplies structured representations that can be shared with control. This remains substantive coupling between a generative objective and actions rather than a standalone diffusion policy, but offers a cheaper implicit-future alternative.',
        href: 'https://arxiv.org/abs/2609.28339v1',
      },
      {
        num: 4,
        tag: 'Cascaded WAM · Latent Planning / Diffusion World Model',
        title: 'PointCast: One World Model for Rigid, Articulated, and Deformable Object Manipulation',
        keyPoints: [
          'Represents objects and end effectors as identity-preserving 3D point sets, spanning rigid objects, cloth, rope, and multi-joint cabinets',
          'A diffusion transformer denoises future point-position windows conditioned on point history and commanded end-effector motion, with cross-attention carrying action-object coupling',
          'Its 19.8M-parameter architecture ranks first in three of four simulated regimes and improves on the source model across all six real teleoperation categories',
          'Frozen inside sampling-based MPC at one network evaluation per window, it matches or exceeds every baseline on four tasks over 64 simulated episodes',
        ],
        description: 'PointCast is a clear Cascaded WAM: it predicts 3D point-level futures under candidate end-effector motions, then MPC selects executable control. Point-identity supervision preserves trajectories rather than merely terminal shape, while topology independence supports rigid, articulated, and deformable dynamics under one modeling principle.',
        href: 'https://arxiv.org/abs/2609.28393v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Frozen Flows Forget: Diagnosing and Restoring Lost Motion in a Latent-flow World Model', tag: 'Joint WAM - Autoregressive · Predictive-Latent', href: 'https://arxiv.org/abs/2609.28414v1', description: 'DART uses decode-path supervision to repair static or teleporting object motion in frozen self-supervised latent spaces and shows that pixel error can reward frozen predictions—important lessons for action-coupled latent world models.' },
      { num: 2, title: 'MemBodied: Recurrent Associative Memory for Vision-Language-Action Models', tag: 'WAM-Adjacent · History-Conditioned VLA', href: 'https://arxiv.org/abs/2609.28256v1', description: 'Adds recurrent associative memory to VLA models for episode-level history at bounded context cost. It does not jointly predict world futures, but its state compression is relevant to long-horizon WAMs.' },
      { num: 3, title: 'Watch, Recall, Act: Always-On Robots in Concurrent Embodied Streams', tag: 'WAM-Adjacent · Streaming Closed-Loop Policy', href: 'https://arxiv.org/abs/2609.28429v1', description: 'Asynchronous modules feed live perception, embodied state, and action history into π0.5 for non-resetting, interruptible dual-arm streams; this is a policy system rather than a strict joint WAM.' },
    ],
    observation: 'The clearest trend is world-action coupling across timescales. LiMA and InternW0 both prevent expensive future generation from locking the control frequency: one uses slow imagination with fast refinement, while the other serves a high-rate action expert from reusable video-expert K/V. From the opposite direction, NowWAM questions whether explicit futures are necessary and identifies denoising trajectories as a shared interface; PointCast shows that explicit action-conditioned 3D futures still deliver direct MPC value. Comparisons should therefore measure not merely whether a system generates video, but whether predictive representations improve closed-loop decisions, update rate, and contact robustness.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-24',
        en: '/en/daily/world-action-model/2026-09-24',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]
  return (
    <DigestLayout locale={locale} date="2026-09-24" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
