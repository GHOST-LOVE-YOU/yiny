import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '物理一致的联合生成、可塑预测表征与自验证 WAM',
    description: 'World Action Model 研究论文日报',
    overview: [
      'PhysWAM 在单一流匹配 Transformer 中共同去噪多视角视频、深度与自车运动，并用三维投影约束世界—动作一致性',
      'EVO-WAM 以任务完成度和逆动力学一致性筛选自身生成的轨迹，无需环境执行即可适配新任务',
      'ReWAM 与 V-JEPA Policy 表明：紧凑、受动作塑形的预测视觉 latent 可以替代昂贵的像素级未来生成',
      'DEWO 将部署后的成功与失败未来变成世界表征监督，让预测学习持续改善动作生成',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Unified Stream / Explicit Future Generation',
        title: 'PhysWAM: Physically Consistent World Action Model for Autonomous Driving',
        keyPoints: [
          '在同一个 flow-matching Transformer 中共同去噪多视角未来视频、度量深度和 SE(3) 自车运动，使世界预测与驾驶动作成为统一生成问题',
          '提出 Coupled Point Projection：把生成深度反投影为三维点，再按生成的自车运动变换，并与按真实运动变换的 LiDAR 点对齐',
          '推理时仅用无标签共识规则选择轨迹，不依赖学习式评分器或外部模拟器；在 NAVSIM v1/v2、零样本闭环迁移及视频/深度预测上验证',
        ],
        description: 'PhysWAM 对“联合生成是否真的联合”给出了几何层面的回答：共享网络与共同去噪还不够，预测深度和生成动作必须在同一三维坐标关系中成立。CPP 把可测量的场景几何直接写入世界—动作耦合，因此既改善规划，也改善深度预测。按 taxonomy，它是典型的 Joint WAM - Diffusion unified-stream / explicit-future 路线；其亮点是将物理一致性从软共享表示提升为可核验的投影约束。',
        href: 'https://arxiv.org/abs/2609.37970v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Explicit Future Generation / Self-Evolution',
        title: 'EVO-WAM: Evolving World Action Models through Video-Action Verification',
        keyPoints: [
          '为 WAM 加入状态预测和锚定多帧上下文，使模型无需外部环境反馈即可生成完整的自回归视频—动作 rollout',
          '先由视觉语言模型挑选完成任务的轨迹前缀，再由逆动力学模型验证视频与动作是否一致，仅用通过双重筛选的经验迭代训练',
          '在七个未见 RoboTwin 2.0 任务上把 Cosmos3 平均成功率从 26.9% 提至 68.0%，DreamZero 从 28.5% 提至 46.4%；三个真实长时组合任务上 Cosmos3 从 20.0% 提至 76.7%',
        ],
        description: 'EVO-WAM 把生成式 WAM 从策略模型推进为“可自举的经验生产器”。关键不是盲目自训练，而是分别检查未来视频是否完成任务、视频所配动作是否能解释该变化，从而抑制视觉上成功但不可执行的伪轨迹。它适用于具备显式视频—动作联合 rollout 的 Diffusion WAM；真实长时任务的大幅提升尤其说明，视频先验只有经过动作一致性验证后才适合作为控制监督。',
        href: 'https://arxiv.org/abs/2609.38057v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Predictive Latent',
        title: 'Rethinking Representations for World-Action Modeling',
        keyPoints: [
          '通过受控比较指出：高重建保真度或现成感知特征本身都不能保证世界表征适合策略学习',
          'ReWAM 以预训练 DINO 特征为基础，用 Feature Calibration 与 Temporal Representation Bottleneck 构造紧凑、可建模动态的世界状态',
          'Action-Grounded Representation Shaping 只把动作损失梯度路由到 bottleneck，让策略决定表征应保留什么，而世界模型学习其演化；RoboTwin 2.0 成功率达到 93.6%',
        ],
        description: 'ReWAM 将 WAM 的竞争焦点从“生成得多逼真”转向“预测空间是否对控制充分”。动作梯度塑形 bottleneck、预测模块学习时间演化，两者形成明确但受控的耦合，避免动作目标破坏整个视觉基础模型。它属于 predictive-latent 路线，不依赖生成式视频预训练，约 600 小时具身预训练即可取得强结果；但 RoboDojo 8.28% 成功率也提示复杂开放任务仍有显著空间。',
        href: 'https://arxiv.org/abs/2609.38163v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Multi-stream / Hidden State',
        title: 'V-JEPA Policy: Building Effective World-Action Models on Predictive Visual Latents',
        keyPoints: [
          '冻结 V-JEPA 2.1 编码器，在其预测视觉 latent 上从头联合训练指令条件未来预测器与 flow-matching 动作专家',
          '未来预测器的 context key/value hidden states 直接条件化动作生成，在不解码像素未来的情况下传递前瞻信息',
          '总计 0.9B 参数、其中 0.6B 可训练；在 LIBERO、LIBERO-Plus 与 RoboCasa-GR1 上具竞争力，并在分布偏移下优于判别式、重建式和视频理解型视觉基础表示',
          '可先用无动作标签的 DROID 视频—指令对预训练预测器，再适配为 WAM；代码已提供',
        ],
        description: '这项工作把“视频基础模型”拆成更小的必要条件：WAM 未必需要继承完整视频生成器，只需一个真正具有预测性的视觉 latent 空间。未来预测器的 KV 状态与 flow-matching 动作专家构成 multi-stream hidden-state coupling，既保留未来信息，又避开像素解码成本。无动作视频预训练还能迁移到控制，给扩展 WAM 数据规模提供了比全量动作标注更现实的路径。',
        href: 'https://arxiv.org/abs/2609.37250v1',
      },
      {
        num: 5,
        tag: 'Joint WAM - Diffusion · Shared Representation / Post-deployment Learning',
        title: 'Direct Experience World-Model Optimization: Learning the World Beyond Action Imitation',
        keyPoints: [
          'DEWO 在部署后不只模仿动作，还以真实视觉经验继续优化用于条件化动作生成的世界表征',
          '定位交互转折点，同时学习成功与失败的未来以支持 classifier-free guidance；价值头从视频表征估计任务进度，仅在进度停滞时启用引导',
          '在五个 DexJoCo 任务的三种 WAM 形式上均提升平均成功率；四个真实任务中，两轮部署学习使有初始成功样本的网格成功率从 51.0% 升至 71.7%',
        ],
        description: 'DEWO 解决了常见的不对称：部署学习往往只修策略，却让世界模型停留在旧分布。它把成功和失败后续视觉都用于改善预测表征，再由进度价值头按需影响动作生成，因此世界建模不是辅助损失，而是在线适配的主动组成。对接触密集、误差会累积的灵巧操作尤其重要；不过摘要中的网格统计限定于至少存在一次初始成功的单元，解读泛化幅度时应保留这一条件。',
        href: 'https://arxiv.org/abs/2609.37398v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'WorldLine: Action-Driven Visual Simulation for Robotic Manipulation', tag: 'Cascaded WAM · Pixel-space Planning', href: 'https://arxiv.org/abs/2609.38059v1', description: '以图像空间动作作为跨十余种具身的公共控制接口，用一万多小时无动作机器人视频学习动力学、两千多小时动作轨迹完成 grounding；少步因果 rollout 可评估候选策略，在未用 RoboTwin 训练时最高提升任务成功率 21.4 个百分点。它主要是动作条件视觉模拟器而非联合动作生成器，因此归入 Cascaded WAM。' },
      { num: 2, title: 'What Makes World Action Models Generalize? An Empirical Study of Test-Time Future Modeling', tag: 'Joint WAM - Diffusion · Implicit Future Prediction', href: 'https://arxiv.org/abs/2609.34981v1', description: '受控比较显示，完全丢弃未来表征会损害环境扰动、数据效率和任务迁移泛化；收益几乎集中在第一步去噪。Simple-WAM 只对全噪声视频 token 做一次前向“准备未来”，以接近 latent WAM 的效率获得更强泛化。' },
      { num: 3, title: 'V2X-WAM: A Cooperative World Action Model for End-to-End Autonomous Driving', tag: 'Joint WAM - Autoregressive · Explicit-Decoupled', href: 'https://arxiv.org/abs/2609.37098v1', description: '车端与路侧观测形成可靠性感知表示，规划轨迹显式条件化未来 occupancy 与动态流预测，再将预测后果反馈给轨迹优化，形成动作—未来闭环；量化路侧消息同时降低通信开销。' },
      { num: 4, title: 'CogWAM: Aligning Semantic Cognition with World Action Modeling via Event-Driven Interfaces', tag: 'Joint WAM - Autoregressive · Explicit-Decoupled', href: 'https://arxiv.org/abs/2609.37721v1', description: '以持久 Semantic State 记录已完成事件和当前子任务，并用 progress-conditioned WORLD/ACTION queries 共享任务进度语境；推理时移除未来预测分支，重点价值在于让长时语义进度稳定约束局部预测与动作。' },
    ],
    observation: '今天的 WAM 新作非常集中，主线从“有没有未来预测”转向“未来信息以什么结构进入动作”。PhysWAM 用三维投影把世界和动作锁进同一物理约束；V-JEPA Policy 与 ReWAM 则把昂贵像素未来压缩为受控制目标塑形的预测 latent；EVO-WAM 和 DEWO 进一步让模型利用自身 rollout 或部署经验持续改进。值得注意的是，显式与隐式未来并非简单二选一：Simple-WAM 的结果暗示第一步未来准备可能已承载大部分泛化收益，而 EVO-WAM 又证明完整视频 rollout 在离线生成新监督时仍很有价值。合理的系统分工可能是：训练和适配阶段保留高带宽未来生成，在线控制阶段只传递经过验证的预测表征。Awesome-WAM 最新 README 已覆盖既有 taxonomy，但本次页面中的 9 月 29 日论文尚未出现在其清单，故均按 arXiv/Hugging Face 新论文处理，而非“参考清单新增”。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Physically Consistent Co-generation, Policy-Shaped Predictive Latents, and Self-Verified WAMs',
    description: 'Daily research digest for World Action Models',
    overview: [
      'PhysWAM co-denoises multiview video, depth, and ego motion in one flow-matching transformer with a 3D consistency constraint',
      'EVO-WAM filters self-generated trajectories by task completion and inverse-dynamics consistency to adapt without environment execution',
      'ReWAM and V-JEPA Policy show that compact, action-shaped predictive visual latents can replace expensive pixel-space future generation',
      'DEWO turns successful and failed post-deployment futures into world-representation supervision that improves action generation',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Unified Stream / Explicit Future Generation',
        title: 'PhysWAM: Physically Consistent World Action Model for Autonomous Driving',
        keyPoints: [
          'Co-denoises future multiview video, metric depth, and SE(3) ego motion in one flow-matching transformer, making world prediction and driving action a unified generation problem',
          'Introduces Coupled Point Projection, which unprojects generated depth, transforms the 3D points with generated ego motion, and aligns them to LiDAR points transformed with recorded motion',
          'Selects trajectories with a simple label-free consensus rule rather than a learned scorer or simulator, with evaluation on NAVSIM v1/v2, zero-shot closed-loop transfer, and video/depth prediction',
        ],
        description: 'PhysWAM gives a geometric answer to whether joint generation is genuinely joint: sharing a network and denoising objective is insufficient unless predicted depth and generated motion obey the same 3D relation. CPP directly encodes measurable scene geometry into world-action coupling and improves both planning and depth. In the taxonomy, this is a Joint WAM - Diffusion model in the unified-stream, explicit-future family, distinguished by replacing soft representational sharing with a verifiable projection constraint.',
        href: 'https://arxiv.org/abs/2609.37970v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Diffusion · Explicit Future Generation / Self-Evolution',
        title: 'EVO-WAM: Evolving World Action Models through Video-Action Verification',
        keyPoints: [
          'Adds state prediction and anchored multiframe context so a WAM can produce complete autoregressive video-action rollouts without external environment feedback',
          'Uses a vision-language model to select task-completing prefixes and an inverse-dynamics model to verify video-action consistency, training only on experience that passes both checks',
          'Raises average success on seven unseen RoboTwin 2.0 tasks from 26.9% to 68.0% for Cosmos3 and 28.5% to 46.4% for DreamZero; Cosmos3 rises from 20.0% to 76.7% on three real long-horizon composite tasks',
        ],
        description: 'EVO-WAM turns a generative WAM into a bootstrapping experience producer. It does not perform naive self-training: it separately checks whether a future video completes the task and whether the paired actions explain that evolution, suppressing visually convincing but inexecutable trajectories. The method fits Diffusion WAMs with explicit video-action rollout. Its real long-horizon gains reinforce that broad video priors become useful control supervision only after action-consistency verification.',
        href: 'https://arxiv.org/abs/2609.38057v1',
      },
      {
        num: 3,
        tag: 'Joint WAM - Autoregressive · Predictive Latent',
        title: 'Rethinking Representations for World-Action Modeling',
        keyPoints: [
          'Controlled comparisons show that neither high reconstruction fidelity nor off-the-shelf perceptual features alone ensure a representation supports policy learning',
          'ReWAM builds on pretrained DINO features, using Feature Calibration and a Temporal Representation Bottleneck to form compact world states suited to dynamics modeling',
          'Action-Grounded Representation Shaping routes only action-loss gradients into the bottleneck, allowing policy learning to determine retained information while the world model learns its evolution; success reaches 93.6% on RoboTwin 2.0',
        ],
        description: 'ReWAM shifts the question from how photorealistically a WAM generates to whether its predictive space is sufficient for control. Action gradients shape the bottleneck while the prediction module learns temporal evolution, creating explicit but controlled coupling without disrupting the full visual foundation. It is a predictive-latent approach that avoids generative video pretraining and obtains strong results from roughly 600 hours of embodied pretraining, although its 8.28% RoboDojo success rate leaves substantial room on harder open tasks.',
        href: 'https://arxiv.org/abs/2609.38163v1',
      },
      {
        num: 4,
        tag: 'Joint WAM - Diffusion · Multi-stream / Hidden State',
        title: 'V-JEPA Policy: Building Effective World-Action Models on Predictive Visual Latents',
        keyPoints: [
          'Freezes a V-JEPA 2.1 encoder and jointly learns an instruction-conditioned future predictor and a flow-matching action expert from scratch in its predictive visual latent space',
          'Conditions action generation directly on the future predictor’s context key/value hidden states, transmitting foresight without decoding pixel futures',
          'Uses 0.9B total parameters, 0.6B trainable, and is competitive on LIBERO, LIBERO-Plus, and RoboCasa-GR1 while predictive latents outperform discriminative, reconstructive, and video-understanding foundations under distribution shift',
          'Supports predictor pretraining on action-free DROID video-instruction pairs before WAM adaptation; code is available',
        ],
        description: 'This work reduces the requirements for a video foundation: a WAM need not inherit a complete video generator if it has a genuinely predictive visual latent space. The future predictor’s KV states and flow-matching action expert form multi-stream hidden-state coupling, retaining foresight while avoiding pixel decoding. Action-free video pretraining also transfers to control, offering a practical path to scaling WAM data beyond fully action-labeled demonstrations.',
        href: 'https://arxiv.org/abs/2609.37250v1',
      },
      {
        num: 5,
        tag: 'Joint WAM - Diffusion · Shared Representation / Post-deployment Learning',
        title: 'Direct Experience World-Model Optimization: Learning the World Beyond Action Imitation',
        keyPoints: [
          'DEWO continues optimizing the world representation that conditions action generation from post-deployment visual experience, rather than learning only through action imitation',
          'Locates interaction turning points and learns from successful and failed futures for classifier-free guidance; a value head estimates task progress from video features and activates guidance only when progress stalls',
          'Improves average success for three WAM formulations across five DexJoCo tasks; after two deployment rounds, success rises from 51.0% to 71.7% on real-task grid cells with at least one initial success',
        ],
        description: 'DEWO addresses a common asymmetry: deployment learning updates the policy while leaving the world model fixed on an obsolete distribution. Successful and failed continuations improve predictive features, and a progress value head influences action generation when needed, making world learning an active component of adaptation rather than an auxiliary loss. This is particularly relevant to dexterous contact where errors compound, though the reported real-world grid gain is explicitly restricted to cells with at least one initial success.',
        href: 'https://arxiv.org/abs/2609.37398v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'WorldLine: Action-Driven Visual Simulation for Robotic Manipulation', tag: 'Cascaded WAM · Pixel-space Planning', href: 'https://arxiv.org/abs/2609.38059v1', description: 'An image-space action interface spans more than ten embodiments, with over 10K hours of action-free robot video for dynamics and 2K hours of trajectories for grounding. Few-step causal rollouts evaluate policies and improve success by up to 21.4 points without RoboTwin training. Because it simulates action-conditioned futures rather than jointly generating actions, it is classified as a Cascaded WAM.' },
      { num: 2, title: 'What Makes World Action Models Generalize? An Empirical Study of Test-Time Future Modeling', tag: 'Joint WAM - Diffusion · Implicit Future Prediction', href: 'https://arxiv.org/abs/2609.34981v1', description: 'Controlled comparisons find that dropping future representations hurts robustness, data efficiency, and task transfer, while most benefit arises at the first denoising step. Simple-WAM prepares fully noised video tokens in one pass, approaching latent-WAM efficiency with stronger generalization.' },
      { num: 3, title: 'V2X-WAM: A Cooperative World Action Model for End-to-End Autonomous Driving', tag: 'Joint WAM - Autoregressive · Explicit-Decoupled', href: 'https://arxiv.org/abs/2609.37098v1', description: 'A reliability-aware vehicle-infrastructure representation feeds prospective trajectories into future occupancy and dynamic-flow prediction, whose consequences then refine the plan. Quantized roadside messages reduce communication while preserving an action-future feedback loop.' },
      { num: 4, title: 'CogWAM: Aligning Semantic Cognition with World Action Modeling via Event-Driven Interfaces', tag: 'Joint WAM - Autoregressive · Explicit-Decoupled', href: 'https://arxiv.org/abs/2609.37721v1', description: 'A persistent Semantic State tracks completed events and the active subtask, while progress-conditioned WORLD and ACTION queries share task context. The future branch is removed at inference; the main contribution is stable semantic alignment between long-horizon progress, local prediction, and action.' },
    ],
    observation: 'Today’s WAM papers converge on a shift from whether to predict the future to how future information should enter action generation. PhysWAM binds world and action with a 3D projection constraint; V-JEPA Policy and ReWAM compress expensive pixel futures into predictive latents shaped by control; EVO-WAM and DEWO use generated rollouts or deployment experience for continued improvement. Explicit and implicit futures are not a simple binary: Simple-WAM suggests the first preparation step carries much of the generalization benefit, while EVO-WAM shows that complete video rollout remains valuable for producing offline supervision. A promising division of labor is therefore high-bandwidth future generation during training and adaptation, with only verified predictive representations passed to online control. The latest Awesome-WAM README supplies the established taxonomy, but these September 29 papers are not yet listed there, so they are treated as new arXiv/Hugging Face papers rather than reference-list additions.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-30',
        en: '/en/daily/world-action-model/2026-09-30',
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
      date="2026-09-30"
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
