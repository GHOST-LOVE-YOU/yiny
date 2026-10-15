import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '生成先验驱动人体重建、单步流式动作与舞台尺度校正',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'DreamHMR 将视频生成先验迁移到完整身体与手部网格恢复',
      'OmniPoser 以一次 ODE 积分从灵活传感器组合恢复全身动作',
      'RepForcing 用表征空间监督改进四步自回归视频蒸馏',
      'K-Pop 压力测试揭示动态镜头下世界坐标人体漂移的尺度根因',
    ],
    papers: [
      {
        num: 1,
        tag: '人体网格恢复 · 视频生成先验',
        title: 'DreamHMR: From Video Generation to Human Motion Modeling via Structural Focusing',
        keyPoints: [
          '把视频生成骨干的时空先验迁移到完整身体与手部重建，以全局到局部策略弥合视觉合成表征与显式人体几何之间的差距',
          'Global Body Representation Transfer 让骨干预测完整人体渲染，学习表面对应与姿态几何；Local Joint Feature Enhancement 再以可靠局部证据细化身体和手部',
          '在五个数据集、四类视频骨干上验证；在 3DPW、EMDB-1、RICH 上分别将身体 MPJPE 降低 4.2%、4.7%、6.1%，遮挡设置下整体身体与手部 MPJPE 降低 7.0% 和 10.0%',
        ],
        description: '这项工作为 Music-to-Dance 的动作数据生产提供了一条直接路径：不只从舞蹈视频抽取粗粒度骨架，而是利用生成模型已经学到的时空连续性恢复身体表面与手部细节。对镜头遮挡频繁、手臂交叉和多人编舞等场景，全局几何约束与局部可靠证据的分工尤其有价值，可提高训练动作、接触和手势监督的质量。',
        href: 'https://arxiv.org/abs/2610.20124v1',
      },
      {
        num: 2,
        tag: '全身动作恢复 · 条件流匹配',
        title: 'OmniPoser: Flexible Human Motion Recovery in the Wild with Masked Flow Matching',
        keyPoints: [
          '在一个模型内支持 3D 关键点、稀疏 IMU 旋转、头戴设备 6-DoF 姿态及其任意子集，恢复完整 SMPL 全身动作',
          '跨模态掩码与 Masked Conditioning Encoder 统一不同传感器配置，避免为每种输入组合训练独立模型',
          '解耦双流生成骨干采用条件流匹配，推理只需一次 ODE 积分；七个基准上达到同类先进水平并超过 700 FPS',
        ],
        description: 'OmniPoser 对实时舞蹈捕捉与在线 Music-to-Dance 控制都很实用。它允许系统在传感器临时缺失时继续工作，并把稀疏穿戴信号补全为统一 SMPL 序列；单步流推理也为舞台预演、XR 舞者驱动和低延迟动作条件输入留下了足够预算。需要注意的是，它解决的是动作恢复而非音乐条件生成，可作为数据与控制前端，而不是直接替代音舞生成器。',
        href: 'https://arxiv.org/abs/2610.19857v1',
      },
      {
        num: 3,
        tag: '视频扩散蒸馏 · 四步生成',
        title: 'RepForcing: Representation-Space Initialization for Autoregressive Video Distillation',
        keyPoints: [
          '指出直接潜变量回归偏向后验均值：因果 ODE 初始化虽能减轻模糊，仍不足以恢复细节',
          '以冻结视频扩散 Transformer 的归一化特征比较干净预测与训练目标，在表征空间学习少步因果初始化',
          '复用双向模型生成的合成视频，并省去中间自回归教师训练和因果 ODE 轨迹蒸馏；四步模型经 DMD 后将 VBench Total 从 84.04 提升至 84.66，VisionReward 从 6.326 提升至 10.074',
        ],
        description: 'Music-to-Dance 视频若要从离线样片走向交互式生成，必须同时压缩采样步数并保住服装纹理、肢体边界和跨块连续性。RepForcing 的关键启示是：少步初始化不应只拟合潜变量轨迹，而应在强视频模型的表征空间约束感知结构。它并未专门报告音舞对齐，因此迁移时仍需单独验证节拍响应与跨块动作相位。',
        href: 'https://arxiv.org/abs/2610.20111v1',
      },
      {
        num: 4,
        tag: 'K-Pop 编舞 · 世界坐标人体恢复',
        title: 'A Diagnostic Study of World-Space Human Recovery Under High Camera Dynamics',
        keyPoints: [
          '构建包含快速大幅镜头运动与密集多人编舞的 K-Pop 压力测试，暴露现有世界坐标人体恢复基准未覆盖的失败模式',
          '诊断发现相机和人体估计各自仍自洽，漂移来自二者独立恢复后的尺度不匹配；镜头位移会被错误转换为不断累积的人体漂移',
          '推导闭式尺度校正，对所有表演者应用同一尺度，无需重训即可保留相对位置；结合物理约束后可稳定支持编舞建模、数据生成与虚拟重拍',
        ],
        description: '这是今日与舞蹈场景最直接的诊断工作。广播级舞台视频中的推拉摇移并不是人体动作，若恢复管线把相机尺度误差写入舞者轨迹，后续模型会学到虚假的根节点位移和队形变化。统一尺度校正可在构建多人舞蹈数据集前作为必要清洗步骤，也提示 Music-to-Dance 评测应加入动态镜头与共享世界坐标一致性。',
        href: 'https://arxiv.org/abs/2610.19729v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'KinoGen: Customizable Humanoid Loco-Manipulation References via Kinematically Grounded Video Generation', tag: '运动学落地视频生成', href: 'https://arxiv.org/abs/2610.20552v1', description: '用目标机器人与物体的标定渲染条件化视频生成，再从双视图拟合回机器人构型空间；其“生成后回投到可执行运动学空间”思路可用于减少舞蹈动作的穿插、滑步与不可执行姿态。' },
      { num: 2, title: 'Speculative Sampling in Interactive Video Generation', tag: '交互式视频 · 推测采样', href: 'https://arxiv.org/abs/2610.20556v1', description: '通过噪声潜变量扩展双向窗口并缓存可复用预测，在条件变化时替换尚未提交的未来，为低延迟交互舞蹈生成兼顾大窗口时序质量与快速响应提供系统方案。' },
      { num: 3, title: 'PhyMetric: Diagnosing Physical Plausibility in Text-to-Video Generation via Scene-Level QA', tag: '视频物理评测', href: 'https://arxiv.org/abs/2610.19823v1', description: '以 1,115 个场景、8,920 个平衡二元问题和结构化物理先验诊断视频生成，可借鉴为舞蹈视频建立足底接触、重心、惯性与动作顺序的可解释评测。' },
      { num: 4, title: 'Robust Real-Time Monocular Human Pose Estimation with Insole-Based Sensor Fusion', tag: '足底传感融合', href: 'https://arxiv.org/abs/2610.19494v1', description: '将足底压力与加速度信号注入下肢分支，在遮挡和短时出画时改善姿态精度、平滑度与步态指标，可为舞蹈脚步和地面接触提供视觉之外的监督。' },
      { num: 5, title: 'Any Time, Any Space: A World-State-Centric Framework for Agentic Video Generation', tag: '长视频世界状态', href: 'https://arxiv.org/abs/2610.20571v1', description: '以注册静态几何的场景记忆和按场景、事件、时间索引的动态记忆维持跨镜头一致性，对长篇舞蹈 MV 的场景回访、动作重演和多机位连续性有参考价值。' },
    ],
    observation: '今日主线不是新的音乐条件器，而是 Music-to-Dance 上下游基础设施的补强：视频生成先验正在反向服务人体几何恢复，流匹配与表征蒸馏把全身动作恢复和视频生成推向实时，同时 K-Pop 压力测试提醒我们，动态镜头下“看起来合理”的逐帧人体仍可能拥有错误的世界轨迹。更可靠的系统应形成闭环：先校正相机—人体尺度并提取高质量动作，再以可缺失传感器和单步流支持在线控制，最后用少步视频生成与足底接触、物理顺序等诊断指标共同验证输出。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Generative Priors for Human Recovery, One-Step Motion, and Stage-Scale Correction',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'DreamHMR transfers video-generation priors to complete body-and-hand mesh recovery',
      'OmniPoser recovers full-body motion from flexible sensor combinations with one ODE step',
      'RepForcing improves four-step autoregressive video distillation through representation supervision',
      'A K-Pop stress test traces world-space human drift under dynamic cameras to scale mismatch',
    ],
    papers: [
      {
        num: 1,
        tag: 'Human Mesh Recovery · Video Priors',
        title: 'DreamHMR: From Video Generation to Human Motion Modeling via Structural Focusing',
        keyPoints: [
          'Transfers spatiotemporal priors from video-generation backbones to complete body-and-hand reconstruction with a global-to-local strategy',
          'Global Body Representation Transfer predicts complete human renderings to learn surface correspondence and posed geometry, while Local Joint Feature Enhancement refines body and hand detail from reliable evidence',
          'Across five datasets and four backbones, reduces body MPJPE by 4.2%, 4.7%, and 6.1% on 3DPW, EMDB-1, and RICH, and overall body-and-hand MPJPE by 7.0% and 10.0% in held-out occlusion settings',
        ],
        description: 'DreamHMR offers a direct route to better motion data for Music-to-Dance: instead of extracting only coarse skeletons, it uses generative temporal knowledge to recover body surfaces and articulated hands. The split between global geometric grounding and reliable local evidence is especially relevant to occlusions, crossed limbs, and group choreography, where cleaner geometry can improve motion, contact, and gesture supervision.',
        href: 'https://arxiv.org/abs/2610.20124v1',
      },
      {
        num: 2,
        tag: 'Full-Body Recovery · Conditional Flow Matching',
        title: 'OmniPoser: Flexible Human Motion Recovery in the Wild with Masked Flow Matching',
        keyPoints: [
          'Recovers complete SMPL motion in one model from 3D keypoints, sparse IMU rotations, head-mounted 6-DoF poses, or arbitrary subsets of them',
          'Combines cross-modal masking with a Masked Conditioning Encoder so different sensor layouts do not require separate models',
          'Uses Conditional Flow Matching in a decoupled dual-stream backbone with one ODE integration step, matching leading methods across seven benchmarks at over 700 FPS',
        ],
        description: 'OmniPoser is useful for real-time dance capture and online Music-to-Dance control. It can continue operating when sensors disappear and converts sparse wearable observations into a common SMPL sequence, while one-step flow inference leaves latency budget for stage rehearsal and XR control. It recovers motion rather than generating it from music, so its natural role is a data and control front end.',
        href: 'https://arxiv.org/abs/2610.19857v1',
      },
      {
        num: 3,
        tag: 'Video Diffusion Distillation · Four-Step Generation',
        title: 'RepForcing: Representation-Space Initialization for Autoregressive Video Distillation',
        keyPoints: [
          'Shows that direct latent regression favors posterior means: causal ODE initialization reduces blur but still misses fine detail',
          'Learns few-step causal initialization by comparing clean predictions and targets through normalized features of a frozen video diffusion transformer',
          'Reuses synthetic videos from a bidirectional model and removes intermediate AR-teacher training and causal ODE trajectory distillation; after DMD, its four-step model raises VBench Total from 84.04 to 84.66 and VisionReward from 6.326 to 10.074',
        ],
        description: 'Interactive Music-to-Dance video needs fewer sampling steps without losing costume texture, limb boundaries, or continuity across chunks. RepForcing suggests that few-step initialization should preserve perceptual structure in a strong video model’s feature space instead of merely regressing latent trajectories. The paper does not report music-motion alignment, so beat response and cross-chunk phase still require dedicated validation.',
        href: 'https://arxiv.org/abs/2610.20111v1',
      },
      {
        num: 4,
        tag: 'K-Pop Choreography · World-Space Human Recovery',
        title: 'A Diagnostic Study of World-Space Human Recovery Under High Camera Dynamics',
        keyPoints: [
          'Introduces a K-Pop stress test with fast, large camera motion and dense multi-person choreography, exposing a failure mode missing from current benchmarks',
          'Finds camera and human estimates individually self-consistent, but independently recovered scales mismatch and turn camera displacement into accumulating human drift',
          'Derives a closed-form correction that applies one scale to every performer without retraining and preserves their shared relative positions; physical constraints then support stable choreography modeling and virtual reshooting',
        ],
        description: 'This is today’s most dance-specific diagnostic. Pan, zoom, and dolly motion in broadcast footage are not dancer motion; if scale errors leak camera movement into recovered trajectories, downstream models learn false root translation and formation changes. A shared-scale correction is therefore a useful preprocessing step for multi-dancer data, and Music-to-Dance evaluation should explicitly test dynamic cameras and shared world-coordinate consistency.',
        href: 'https://arxiv.org/abs/2610.19729v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'KinoGen: Customizable Humanoid Loco-Manipulation References via Kinematically Grounded Video Generation', tag: 'Kinematically Grounded Video', href: 'https://arxiv.org/abs/2610.20552v1', description: 'Conditions video generation on calibrated robot and object renders, then fits the same models back to two generated views. Its projection into an executable configuration space may help reduce penetration, foot skating, and impossible poses in dance motion.' },
      { num: 2, title: 'Speculative Sampling in Interactive Video Generation', tag: 'Interactive Video · Speculative Sampling', href: 'https://arxiv.org/abs/2610.20556v1', description: 'Pads large bidirectional windows with noise latents and caches reusable predictions while keeping uncommitted futures replaceable, offering interactive dance video both broad temporal context and fast response.' },
      { num: 3, title: 'PhyMetric: Diagnosing Physical Plausibility in Text-to-Video Generation via Scene-Level QA', tag: 'Physical Video Evaluation', href: 'https://arxiv.org/abs/2610.19823v1', description: 'Uses 1,115 scenes, 8,920 balanced binary questions, and structured physical priors for interpretable diagnosis; the protocol can inspire checks for foot contact, balance, inertia, and action order in dance video.' },
      { num: 4, title: 'Robust Real-Time Monocular Human Pose Estimation with Insole-Based Sensor Fusion', tag: 'Insole Sensor Fusion', href: 'https://arxiv.org/abs/2610.19494v1', description: 'Injects plantar pressure and acceleration into a lower-body branch, improving pose accuracy, smoothness, and gait measures under occlusion and visual dropout—useful supervision for dance footwork and contact.' },
      { num: 5, title: 'Any Time, Any Space: A World-State-Centric Framework for Agentic Video Generation', tag: 'Long-Video World State', href: 'https://arxiv.org/abs/2610.20571v1', description: 'Maintains registered scene geometry and event memories indexed by scene, event, and time, with useful ideas for location revisits, motion replay, and multi-camera continuity in long dance music videos.' },
    ],
    observation: 'Today’s main thread is not a new music conditioner but stronger infrastructure around Music-to-Dance. Video-generation priors now improve explicit human geometry, while flow matching and representation-space distillation push motion recovery and video synthesis toward real time. The K-Pop stress test also shows that plausible per-frame bodies can still have incorrect world trajectories under dynamic cameras. A robust pipeline should close the loop: correct camera-human scale and extract clean motion, support online control with missing-sensor tolerance and one-step flow, then validate few-step video with diagnostics for foot contact, physical ordering, and shared world-space consistency.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-15',
        en: '/en/daily/music-to-dance/2026-10-15',
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
      date="2026-10-15"
      roleId="music-to-dance"
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
