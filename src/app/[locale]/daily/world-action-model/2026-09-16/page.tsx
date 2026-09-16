import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '多模态未来、异构经验与具身闭环：WAM 从预测走向策略自改进',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'ModAR 依次去噪点轨迹、DINO 特征、深度与动作，证明结构化未来比额外 RGB 更稳定地帮助控制',
      'XPACE 共享策略与模拟器的视频骨干，并把模型生成的偏离—恢复轨迹回流为策略监督',
      'GeoLAM 从近 2 万小时无动作标签人类视频学习几何潜动作，再与机器人动作块联合去噪',
      'WholeBodyWAM 与 CueNav 分别把 WAM 扩展到全身人形控制和跨 embodiment 视频导航',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Cross-Attention',
        title: 'Modality-Autoregressive World-Action Models',
        keyPoints: [
          '在共享 DiT 中按点轨迹 → DINO 特征 → 深度 → RGB → 动作的顺序逐块去噪；每个完成的未来模态会重新作为上下文，动作最后生成并条件化于全部预测',
          '受控实验显示点轨迹、DINO 与深度带来可叠加收益，而在三者之上继续预测 RGB 没有一致增益；以独立 IDM 读取预测未来时，ModAR 仍优于统一同步去噪',
          '30.1M 参数模型的平均成功率为 75%，略高于视频预训练的 6B Flex-π 的 72%，训练 FLOPs 约少 20 倍；额外无动作数据将仿真平均成功率从 66% 提至 76%',
          '三项真实双臂任务中，加入 200 条域内和 1000 条 EgoDex 人类示范后，平均成功率由 70.0% 逐步升至 81.1% 和 83.3%',
        ],
        description: 'ModAR 是今日最直接的 WAM 方法贡献。它不把所有未来与动作同时去噪，而是让紧凑、结构化的预测先成为后续模态和动作的“草稿纸”，把 multi-stream coupling 改造成有方向的信息流。结果也挑战了“未来必须是 RGB 视频”的默认设定：对操作而言，运动对应、语义结构和几何可能比像素外观更有效。代价是推理需对五个块分别积分，论文报告总计 40 个 Euler 步，而同步模型仅需 8 步；因此其控制收益与时延之间仍需进一步权衡。',
        href: 'https://arxiv.org/abs/2609.17524v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'XPACE: Joint World and Action Modeling from Heterogeneous Experience',
        keyPoints: [
          '非对称 Mixture-of-Transformers 让视频 Transformer 与动作 Transformer 通过多层视觉特征连接：策略模式联合预测未来视频和可执行动作块，模拟器模式则预测给定骨架控制与相机位姿的视觉后果',
          '组织 5000 小时四层经验金字塔，从无动作标签第一视角视频、人类动作视频、跨 embodiment bridge 数据到 IRON 机器人遥操作，并用 coarse-to-fine 课程逐步提高控制监督比重',
          '对模拟器采用 chunk-wise self-gradient forcing 以适应自生成上下文，再围绕专家轨迹合成偏离—恢复序列，过滤后执行 DAgger 风格的策略微调',
          'XPENG IRON 人形机器人实验显示，异构训练可迁移机器人示范未覆盖的人类技能，模拟器生成的恢复数据进一步提升真实任务完成率',
        ],
        description: 'XPACE 的关键不只是同一网络输出视频和动作，而是让共享预测表示形成闭环：人类视频扩展动力学与行为覆盖，机器人数据落地可执行控制，模拟器再生成名义示范缺失的恢复经验来改进策略。按 taxonomy，它属于 multi-stream/shared-representation 的联合扩散 WAM；视频到动作的多层单向连接和动作损失回传，使世界建模与策略学习发生实质耦合。值得注意的是，自改进阶段微调的是独立策略副本，且合成恢复需要过滤，因此还不是完全在线、自主的 model-based RL。',
        href: 'https://arxiv.org/abs/2609.17372v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Hidden-State',
        title: 'GeoLAM: Learning Geometry-Grounded Latent Actions from Unlabeled Human Videos',
        keyPoints: [
          '从 19,860 小时无动作标签人类 RGB 视频预训练连续潜动作：冻结几何特征层承担未来重建，训练期 4D teacher 提供 3D 位移、残余像平面运动和表面方向变化监督',
          '下游 WAM 联合去噪四个几何潜动作 token 与 32 步可执行动作块；未来视频仅作为训练辅助任务，部署时无需几何 teacher 或未来视频生成',
          'LARYBench 上相对最强基线将平均回归 MSE 从 0.60 降至 0.29，并把平均分类准确率从 45.62% 提至 71.22%',
          'LIBERO 平均成功率 98.5%，RoboTwin 2.0 平均 92.6%；长程 LIBERO 成功率相对 Fast-WAM 从 95.2% 提至 97.8%',
        ],
        description: 'GeoLAM 代表“隐式未来预测”的高效 WAM 路线：未来视频在训练期塑造表示，但执行期保留的是与动作共同生成的几何转移变量。其主要贡献是避免纯像素重建把相机运动和外观变化误当作可控动作，用 4D 几何教师把人类视频压缩成更接近物理转移的 latent action。它保持了 Joint WAM 的动作—世界耦合，又避开在线生成视频的成本；限制是几何教师只在预训练中提供蒸馏式监督，真实部署时潜动作的可解释性和接触细节仍取决于冻结表示。',
        href: 'https://arxiv.org/abs/2609.17099v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Unified Stream · Explicit Future',
        title: 'WholeBodyWAM: Generalizing Pre-trained World-Action Priors to Humanoid Loco-Manipulation via WBC-Grounded Coordination',
        keyPoints: [
          '在预训练视频 DiT 的世界—动作序列中加入未来视觉、操作动作和 Unified Whole-Body Controller Interface 三类 typed stream，以联合 flow matching 生成',
          'UWBC 用 46 维共享物理语义字段加 10 个控制器专用槽统一异构 WBC；coordination-aware self-attention 动态增强操作 token 到全身控制 token 的信息流',
          '基于 1.5 万条全身示范对 14B WAM 做 LoRA 后训练，六项仿真任务总体成功率 91.9%，高于 Cosmos-3 的 86.4% 和 DreamZero-PT 的 73.6%',
          '八项真实任务中 ID/OOD 平均成功率为 81.3%/68.8%，对比 DreamZero 的 57.5%/40.0%；跨三种 WBC 的成功率方差由 35.0 降至 10.5 平方百分点',
        ],
        description: 'WholeBodyWAM 把 WAM 的动作接口从机械臂扩展到需要移动、躯干和双手协调的人形机器人。真正的增量不是简单扩大动作向量，而是保留预训练操作通路，同时用有物理语义的 UWBC 独立表示控制器意图，并让注意力按状态协调操作与全身流。这是 unified-stream explicit-future 路线在新 embodiment 上的有力验证；不过结果依赖 14B 预训练 WAM、1.5 万条后训练示范和现成低层 WBC，尚不能视为端到端学习全身动力学。',
        href: 'https://arxiv.org/abs/2609.16644v1',
      },
      {
        num: 5,
        tag: 'Cascaded WAM · Pixel-Space Planning · Learned Action Extraction',
        title: 'Seeing What Matters: Visual Cue Guided Video Planning for Generalizable Robot Navigation',
        keyPoints: [
          '以 Wan2.2-5B 生成未来 16 帧视觉计划，BEV 地图提供全局任务上下文，画面中保留机器人本体以显式暴露 embodiment 与障碍物的空间关系',
          'embodiment-specific IDM 从生成视频的稠密光流直接回归连续控制，无需三维重建；同一视频规划器可配不同 IDM 部署到 Husky 轮式机器人和 Go2 四足机器人',
          '真实语义目标导航成功率 93.3%；1 米窄通道成功率 70%，而去除本体线索或以几何重建替代 IDM 都会降低精确执行表现',
          '在未见 6×6 迷宫中，全局视觉上下文把成功率由无地图的 30% 提至 55%；系统在 Jetson Thor 上一次规划与动作推断约需 4 秒',
        ],
        description: 'CueNav 是清晰的 Cascaded WAM：视频扩散模型先在像素空间给出可视未来，IDM 再从未来流场提取可执行动作。它证明全局地图不必作为符号规划器输入，也能被拼成视觉证据进入生成模型；本体可见性则为跨平台规划提供 embodiment context。与联合 WAM 相比，这种解耦设计容易复用无动作视频和共享规划器，但动作提取器仍绑定平台与固定相机，4 秒重规划延迟也限制了动态环境中的闭环频率。',
        href: 'https://arxiv.org/abs/2609.16737v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'ProxiDex: Learning Dynamics-Guided Proximity Policy for Dexterous Manipulation', tag: 'Joint WAM - Diffusion · Implicit Future', href: 'https://arxiv.org/abs/2609.16586v1', description: '用动作条件前向模型预测未来观测 latent，再从 latent 变化解码手—物 proximity，并以动力学一致性指导扩散策略；世界预测与动作生成耦合明确，但预测对象较局部，适合作为接触状态 WAM 的案例。' },
      { num: 2, title: 'CorrRisk-WM: Corridor-Conditioned Risk World Modeling for Safety-Critical Trajectory Planning', tag: 'Cascaded WAM · Latent Planning', href: 'https://arxiv.org/abs/2609.16724v1', description: '递归预测交通参与者状态，并针对每条候选轨迹走廊计算侵入和近失误风险，用世界演化直接支持安全候选选择；更偏自动驾驶规划专用 world model。' },
      { num: 3, title: 'World Models for Embodied Intelligence: From Plausible to Controllable to Actionable', tag: 'Survey · Actionable World Models', href: 'https://arxiv.org/abs/2609.16697v1', description: '以 Plausible、Controllable、Actionable 三级能力重组具身世界模型文献，强调预测只有转化为规划、学习、恢复或验证收益才有行为价值，可作为 WAM 筛选与评测框架。' },
    ],
    observation: '今日 arXiv 的 WAM 密度显著上升，主线从“生成一段好看的未来视频”转向“选择对动作有用的未来表示并闭合学习回路”。ModAR 与 GeoLAM 都表明 RGB 不是唯一、甚至未必是最有效的预测目标：点轨迹、语义特征、深度和几何 latent 能以更低容量承载控制所需的转移信息。XPACE 则把世界模型价值推进到策略数据闭环，让模拟器生成恢复监督。WholeBodyWAM 和 CueNav 从两个方向检验可扩展性：前者统一多层全身控制语义，后者复用视频规划器并按 embodiment 学习动作提取。Hugging Face Daily Papers 今日仅收录 ModAR，说明其榜单覆盖明显滞后于 arXiv；Awesome-WAM 最新 README 已核读，但其 Joint WAM 与 Diffusion-based Generation 章节今日无新增，最近 README 提交为 9 月 6 日。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Multimodal Futures, Heterogeneous Experience, and Embodied Closed Loops',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'ModAR denoises point tracks, DINO features, depth, and actions sequentially, showing that structured futures help control more reliably than extra RGB prediction',
      'XPACE shares a video backbone between policy and simulator, then feeds generated deviation–recovery trajectories back into policy learning',
      'GeoLAM learns geometry-grounded latent actions from nearly 20,000 hours of action-free human video and jointly denoises them with robot action chunks',
      'WholeBodyWAM and CueNav extend WAMs to whole-body humanoid control and cross-embodiment video navigation, respectively',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Cross-Attention',
        title: 'Modality-Autoregressive World-Action Models',
        keyPoints: [
          'Sequentially denoises point tracks → DINO features → depth → RGB → actions in a shared DiT; every completed future modality is re-embedded as context, and actions condition on all predictions',
          'Controlled studies find additive gains from tracks, DINO, and depth but no consistent benefit from adding RGB; ModAR also remains better than unified co-denoising when a separate IDM reads both models’ futures',
          'The 30.1M-parameter model reaches 75% average success versus 72% for video-pretrained 6B Flex-π with roughly 20× fewer training FLOPs; actionless data raises simulated success from 66% to 76%',
          'Across three real bimanual tasks, adding 200 in-domain and 1,000 EgoDex human demonstrations progressively improves average success from 70.0% to 81.1% and 83.3%',
        ],
        description: 'ModAR is today’s clearest methodological contribution to WAMs. Rather than denoising every future and action together, it turns compact structured predictions into scratchpads for later modalities and control, creating directed information flow across streams. The results also challenge the assumption that a useful future must be RGB: motion correspondence, semantic structure, and geometry can matter more than appearance for manipulation. The trade-off is inference cost—five blocks require 40 Euler steps in total, versus eight for synchronous formulations—so the control gains must still be balanced against latency.',
        href: 'https://arxiv.org/abs/2609.17524v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'XPACE: Joint World and Action Modeling from Heterogeneous Experience',
        keyPoints: [
          'An asymmetric Mixture-of-Transformers links video and action Transformers through multilevel visual features: policy mode jointly predicts future video and executable chunks, while simulator mode predicts visual consequences of skeleton controls and camera poses',
          'Organizes a 5,000-hour four-level data pyramid spanning action-free egocentric video, human action video, cross-embodiment bridge data, and IRON teleoperation, with a coarse-to-fine curriculum that increasingly emphasizes control',
          'Adapts the simulator to generated context with chunk-wise self-gradient forcing, synthesizes deviation–recovery trajectories around expert demonstrations, filters them, and performs DAgger-style policy fine-tuning',
          'Experiments on the XPENG IRON humanoid show transfer of human-observed skills absent from robot demonstrations and further real-task gains from simulator-generated recovery data',
        ],
        description: 'XPACE matters not merely because one system emits video and action, but because its shared predictive representation closes a learning loop: human video broadens dynamics and behavior coverage, robot data grounds executable control, and the simulator supplies recovery experience missing from nominal demonstrations. Taxonomically it is a multi-stream, shared-representation diffusion WAM. Multilevel video-to-action links and action gradients into the video backbone create substantive coupling. The self-improvement stage still fine-tunes a separate policy copy and depends on filtering synthetic recoveries, so it is not yet fully online autonomous model-based RL.',
        href: 'https://arxiv.org/abs/2609.17372v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Hidden-State',
        title: 'GeoLAM: Learning Geometry-Grounded Latent Actions from Unlabeled Human Videos',
        keyPoints: [
          'Pretrains continuous latent actions on 19,860 hours of action-free human RGB video: frozen geometric features support future reconstruction and a training-only 4D teacher supervises 3D displacement, residual image motion, and surface-orientation changes',
          'The downstream WAM jointly denoises four geometric latent-action tokens and a 32-step executable action chunk; future video is training-only, and neither the geometry teacher nor video generation is needed at deployment',
          'On LARYBench it lowers average regression MSE from the strongest baseline’s 0.60 to 0.29 and raises mean classification accuracy from 45.62% to 71.22%',
          'It reaches 98.5% average success on LIBERO and 92.6% on RoboTwin 2.0; on LIBERO-Long it improves over Fast-WAM from 95.2% to 97.8%',
        ],
        description: 'GeoLAM represents the efficient implicit-future branch of WAMs: video prediction shapes the representation during training, while deployment retains a geometry-grounded transition variable generated jointly with actions. Its key contribution is preventing pixel reconstruction from conflating controllable motion with camera and appearance changes by distilling 4D geometry into latent actions. This preserves substantive world–action coupling without online video generation. Because the geometry teacher appears only during pre-training, however, deployment-time interpretability and contact fidelity still depend on the frozen latent representation.',
        href: 'https://arxiv.org/abs/2609.17099v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Unified Stream · Explicit Future',
        title: 'WholeBodyWAM: Generalizing Pre-trained World-Action Priors to Humanoid Loco-Manipulation via WBC-Grounded Coordination',
        keyPoints: [
          'Adds typed streams for future vision, manipulation actions, and a Unified Whole-Body Controller Interface to a pretrained video DiT world–action sequence and learns them with joint flow matching',
          'UWBC combines 46 shared physically meaningful fields with ten controller-specific slots; coordination-aware self-attention dynamically strengthens information flow from manipulation to whole-body control tokens',
          'LoRA post-training a 14B WAM on 15K whole-body demonstrations yields 91.9% overall simulated success, versus 86.4% for Cosmos-3 and 73.6% for DreamZero-PT',
          'Across eight real tasks, ID/OOD success is 81.3%/68.8% versus DreamZero’s 57.5%/40.0%; success variance across three WBCs falls from 35.0 to 10.5 squared percentage points',
        ],
        description: 'WholeBodyWAM expands the WAM action interface from arms to coordinated locomotion, torso, and hands. The substantive step is not a larger flat action vector: it preserves the pretrained manipulation pathway, gives controller intent a physically typed UWBC stream, and coordinates the streams according to state. This is strong evidence for unified-stream, explicit-future WAM transfer to a new embodiment. It still relies on a 14B pretrained WAM, 15K post-training demonstrations, and existing low-level WBCs, so it should not be read as end-to-end learning of whole-body dynamics.',
        href: 'https://arxiv.org/abs/2609.16644v1',
      },
      {
        num: 5,
        tag: 'Cascaded WAM · Pixel-Space Planning · Learned Action Extraction',
        title: 'Seeing What Matters: Visual Cue Guided Video Planning for Generalizable Robot Navigation',
        keyPoints: [
          'Uses Wan2.2-5B to generate 16-frame visual plans; a BEV map supplies global task context and a visible robot body exposes embodiment-relative obstacle geometry',
          'An embodiment-specific IDM maps dense optical flow from generated video directly to continuous controls without 3D reconstruction; one planner works with separate IDMs for Husky and Go2 robots',
          'Achieves 93.3% real semantic-goal navigation success and 70% success in a one-meter passage; removing body cues or replacing the IDM with geometric reconstruction hurts precise execution',
          'Global visual context raises success in unseen 6×6 mazes from 30% to 55%; one planning-and-action inference cycle takes about four seconds on a Jetson Thor',
        ],
        description: 'CueNav is a clear Cascaded WAM: a video diffusion model first proposes a pixel-space future, then an IDM extracts executable controls from future flow. It shows that a global map can be presented as visual evidence rather than consumed by a symbolic planner, while body visibility provides embodiment context for cross-platform planning. Compared with joint WAMs, this decomposition readily reuses action-free videos and a shared planner, but each platform still needs a camera-specific action extractor, and four-second replanning limits closed-loop frequency in dynamic environments.',
        href: 'https://arxiv.org/abs/2609.16737v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'ProxiDex: Learning Dynamics-Guided Proximity Policy for Dexterous Manipulation', tag: 'Joint WAM - Diffusion · Implicit Future', href: 'https://arxiv.org/abs/2609.16586v1', description: 'Predicts future observation latents from actions, decodes hand–object proximity from latent changes, and uses dynamics consistency to guide a diffusion policy. The coupling is explicit, though its predicted world state is deliberately local.' },
      { num: 2, title: 'CorrRisk-WM: Corridor-Conditioned Risk World Modeling for Safety-Critical Trajectory Planning', tag: 'Cascaded WAM · Latent Planning', href: 'https://arxiv.org/abs/2609.16724v1', description: 'Recursively evolves traffic-agent states and evaluates intrusion and near-miss risk for each candidate-trajectory corridor, directly supporting safe candidate selection in a specialized driving world model.' },
      { num: 3, title: 'World Models for Embodied Intelligence: From Plausible to Controllable to Actionable', tag: 'Survey · Actionable World Models', href: 'https://arxiv.org/abs/2609.16697v1', description: 'Reorganizes embodied world models into Plausible, Controllable, and Actionable capability levels, emphasizing that prediction matters only when it improves planning, learning, recovery, evaluation, or verification.' },
    ],
    observation: 'Today’s arXiv release contains an unusually dense WAM cluster, with the field shifting from “generate a plausible future video” toward “choose future representations that help action and close the learning loop.” ModAR and GeoLAM both show that RGB is neither the only nor necessarily the best predictive target: tracks, semantic features, depth, and geometric latents can carry control-relevant transitions more compactly. XPACE goes further by turning its simulator into recovery supervision for the policy. WholeBodyWAM and CueNav test scalability in complementary ways—unifying whole-body controller semantics versus sharing a video planner across embodiments. Hugging Face Daily Papers featured only ModAR, so its coverage visibly lags the arXiv release. The latest Awesome-WAM README was reviewed, but its Joint WAM and Diffusion-based Generation sections have no new entry today; the most recent README commit is dated September 6.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-16',
        en: '/en/daily/world-action-model/2026-09-16',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-16" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
