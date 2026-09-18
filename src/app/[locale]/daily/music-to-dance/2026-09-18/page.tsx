import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '视频原生高效注意力、鲁棒动捕与音视频时序诊断',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'Video DeltaNet 以局部 Softmax 注意力和双向线性记忆兼顾细粒度视频交互与长程上下文，并在八步蒸馏后显著加速长视频生成',
      'DirtyMoCap 将任意布局、稀疏且含噪的无序标记映射到固定代理锚点，恢复时序连贯的 SMPL-H 全身运动',
      'AVTrace 系统诊断全模态模型的事件定位、顺序保持与音视频同步判断，揭示语义理解不能替代时序对齐能力',
      'DART、PACE、动作质量评估与场景落地全身运动分别补充少步视频适配、姿态控制、动作评价和接触约束工具',
    ],
    papers: [
      {
        num: 1,
        tag: '长视频生成 · 混合注意力',
        title: 'Video DeltaNet: A Video-Native Hybrid Attention for Livestream Video Generation',
        keyPoints: [
          '将局部 Softmax 注意力与面向长程视频上下文的双向线性记忆结合，避免纯线性注意力损失高质量生成所需的细粒度交互',
          '线性分支提出 Video Delta Attention，以帧为单位联合吸收空间 token 更新记忆，并用独立输出投影和可学习门控校准两条分支',
          '采用分阶段教师对齐，把新路径逐步引入预训练模型；视频—视频交互使用混合注意力，而涉及文本或音频的交互继续保留 Softmax',
          '在 MiniMax H3 上结合八步蒸馏与优化后的 SGLang 服务栈，8 张 B200 生成 14.3 秒、768p 视频的 DiT 去噪耗时 6.70 秒，相比同卡 50 步稠密基线加速 14.5 倍',
        ],
        description: 'Music-to-Dance 视频通常同时需要保留局部肢体细节、跨帧动作连贯性和音乐条件。Video DeltaNet 的价值在于没有用纯线性注意力一刀切，而是让局部 Softmax 负责精细交互、线性记忆承担长程历史，并明确保留音频相关交互的 Softmax 路径。这为长舞蹈视频提供了较可信的效率路线：可减少视频 token 的二次注意力成本，同时避免把节拍条件和细粒度姿态一起过度压缩。其速度数字来自高端多卡部署，迁移到单卡舞蹈系统仍需单独验证。',
        href: 'https://arxiv.org/abs/2609.20744v1',
      },
      {
        num: 2,
        tag: '人体动捕 · 鲁棒 SMPL-H 拟合',
        title: 'DirtyMoCap: Robust Motion Capture from Unconstrained Markers',
        keyPoints: [
          '面向稀疏、含噪、无序且布局未知或变化的光学标记点云，不再要求固定的 marker configuration',
          '先把原始观测映射到由骨骼关节和身体表面点组成的固定代理锚点，再用循环滑窗网络初始化并跨长序列跟踪锚点',
          '自定义可微 Gauss–Newton 求解器将 SMPL-H 拟合到锚点，并端到端学习观测置信度、平滑项和先验项的自适应权重',
          '一个模型即可跨任意标记布局泛化，并将异构中国传统武术原始动捕重建为时序连贯的 SMPL-H 数据；论文同时公开代码和数据',
        ],
        description: '高质量、风格多样的动作数据仍是 Music-to-Dance 的核心瓶颈。DirtyMoCap 不直接生成舞蹈，却能把现实采集中最常见的掉点、噪声和布局变化转成统一的人体参数轨迹，尤其适合整理历史舞蹈、武术或现场表演动捕。代理锚点提供跨设备的稳定中间表示，学习式置信度与几何求解器则兼顾数据驱动鲁棒性和人体结构约束。它可用于扩充训练集、清洗监督信号，也能为生成结果提供较可靠的动作重建参考。',
        href: 'https://arxiv.org/abs/2609.19927v1',
      },
      {
        num: 3,
        tag: '音视频同步 · 时序评测',
        title: 'AVTrace: Diagnosing Audio-Visual Temporal Reasoning in Omni Models',
        keyPoints: [
          '建立包含起点与区间定位、同步判断、下一步预测、跨模态定位、事件链解析和事件条件理解的银标准诊断套件',
          '提供 34,114 条训练样本，以及类别平衡的 3,500 条开发集和 7,000 条测试集',
          '五个开源全模态模型在同步验证上均低于测试集 0.556 的多数类基线，事件链解析和条件定位/理解同样薄弱',
          '对 Gemma4-E4B-it 的参数高效时序后训练改善多项基准指标，但外部图像基准变化有限且部分退化，显示时序能力需要独立训练与审计',
        ],
        description: 'Music-to-Dance 不能只靠“视频看起来与音乐语义相关”来证明同步。AVTrace 直接区分事件发生时间、持续区间、先后顺序和跨模态同步，并显示现有全模态模型即使会描述内容，也可能无法可靠判断时间对齐。它可作为舞蹈评测设计的模板：把节拍命中、动作段落定位、音乐事件—动作事件对应和顺序保持拆开测量，而不是只使用一个整体相似度。论文也提醒，语义参考文本重叠不能充当时序定位代理指标。',
        href: 'https://arxiv.org/abs/2609.19991v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'DART: Distillation-Aware Reparameterization for Training-Free LoRA Reuse in Few-Step Video Diffusion Models',
        tag: '少步视频扩散 · LoRA 复用',
        href: 'https://arxiv.org/abs/2609.20051v1',
        description: '以低秩坐标传输和目标采样日程响应校准，在无需源训练视频的情况下把长轨迹 LoRA 复用于少步视频扩散；四步 Wan2.2 上联合质量分数由 0.9029 提至 0.9227，可降低舞蹈风格适配器迁移到蒸馏模型时的负迁移。',
      },
      {
        num: 2,
        title: 'PACE: Precise AI Cinematic Expression: A Typed Specification for Script-Grounded Previsualization and Geometric Conformance',
        tag: '人物构图 · 几何姿态控制',
        href: 'https://arxiv.org/abs/2609.19853v1',
        description: '用类型化规格统一声明人物、道具、位置和相机，并编译为扩散提示与米制三维场景；在 30 个镜头中显式声明姿态将动作呈现率从 58.9% 提升到 74.4%，适合借鉴到多人舞蹈构图和镜头约束。',
      },
      {
        num: 3,
        title: 'Can Vision-Language Models Judge Olympic Diving? From Reasoning to Scores in Zero-Shot Action Quality Assessment',
        tag: '动作质量评估 · 可解释评分',
        href: 'https://arxiv.org/abs/2609.19354v1',
        description: '开源 VLM 单独零样本评价跳水动作的 Spearman 相关均低于 0.32，而结合语义推理、分阶段子分数和集成回归后达到 0.67；文本推理比原始数值子分数更有效，可为舞蹈质量评价提供可解释的阶段化信号。',
      },
      {
        num: 4,
        title: 'Learning Slope-Adaptive Whole-Body Locomotion for Humanoid Robots in Roofing Construction',
        tag: '全身运动 · 场景接触约束',
        href: 'https://arxiv.org/abs/2609.20558v1',
        description: '把人类示范重定向到 Unitree G1，并以米制屋顶模型、轨迹级优化和执行感知强化学习约束支撑接触与工作关系；对舞蹈生成的启示是动作外观相似并不足够，足地接触、场景几何和动态执行误差需要显式落地。',
      },
    ],
    observation: '本期形成了从数据、生成到评价的完整链条。DirtyMoCap 先把不洁净的现实动捕转成统一、连贯的人体轨迹；Video DeltaNet 再以局部精细交互和长程线性记忆降低长视频生成成本；AVTrace 则证明最终评价必须真正检查时间定位与同步，而不能被语义描述能力替代。Worth Reading 中的 DART、PACE、动作质量评估和场景落地运动进一步指出四个工程缺口：少步模型的风格适配、人物与镜头的几何可控性、可解释动作评分，以及接触物理。对 Music-to-Dance 管线而言，下一步不应只追求更大的端到端模型，而应把鲁棒动作数据、长程高效生成、精确音视频同步和物理可执行性作为可分别验证的模块。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Video-Native Efficient Attention, Robust MoCap, and Audio-Visual Temporal Diagnostics',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'Video DeltaNet combines local Softmax attention with bidirectional linear memory to retain fine-grained video interactions and long-range context, substantially accelerating long-video generation after eight-step distillation',
      'DirtyMoCap maps sparse, noisy, unordered markers with arbitrary layouts onto fixed proxy anchors and recovers temporally coherent SMPL-H full-body motion',
      'AVTrace diagnoses event localization, order preservation, and audio-visual synchronization in omni models, showing that semantic understanding cannot substitute for temporal alignment',
      'DART, PACE, action-quality assessment, and scene-grounded whole-body motion add tools for few-step adaptation, pose control, motion evaluation, and contact constraints',
    ],
    papers: [
      {
        num: 1,
        tag: 'Long-Video Generation · Hybrid Attention',
        title: 'Video DeltaNet: A Video-Native Hybrid Attention for Livestream Video Generation',
        keyPoints: [
          'Combines local Softmax attention with bidirectional linear memory for long-range video context, avoiding the loss of fine-grained interactions seen when linear attention is applied alone',
          'Introduces Video Delta Attention, which updates memory once per frame from all spatial tokens, with separate output projections and learnable gates calibrating the two branches',
          'Uses staged teacher alignment to introduce the pathway into pretrained models; video-to-video interactions use the hybrid while interactions involving text or audio retain Softmax attention',
          'On MiniMax H3 with eight-step distillation and an optimized SGLang stack, DiT denoising for 14.3-second 768p video takes 6.70 seconds on eight B200 GPUs, a 14.5x speedup over the 50-step dense baseline on the same hardware',
        ],
        description: 'Music-to-Dance video must preserve local body detail, cross-frame motion continuity, and musical conditioning at once. Video DeltaNet is valuable because it does not replace attention wholesale: local Softmax handles precise interactions, linear memory carries long history, and audio-related interactions explicitly remain on the Softmax path. This is a credible route to reducing quadratic video-token cost without compressing beat conditions and detailed pose equally aggressively. Its latency result uses high-end multi-GPU deployment, so single-GPU dance pipelines still require separate validation.',
        href: 'https://arxiv.org/abs/2609.20744v1',
      },
      {
        num: 2,
        tag: 'Human Motion Capture · Robust SMPL-H Fitting',
        title: 'DirtyMoCap: Robust Motion Capture from Unconstrained Markers',
        keyPoints: [
          'Targets sparse, noisy, unordered optical-marker point clouds with unknown or changing layouts instead of requiring a fixed marker configuration',
          'Maps raw observations to fixed proxy anchors made of skeletal joints and body-surface points, then initializes and tracks them over long sequences with a recurrent sliding-window architecture',
          'Fits SMPL-H to tracked anchors with a custom differentiable Gauss–Newton solver that learns adaptive observation-confidence, smoothness, and prior weights end to end',
          'One model generalizes across arbitrary layouts and reconstructs heterogeneous raw Chinese martial-arts captures into temporally coherent SMPL-H data; code and data are released',
        ],
        description: 'High-quality, stylistically diverse motion remains a core bottleneck for Music-to-Dance. DirtyMoCap does not generate dance directly, but turns dropped markers, noise, and layout changes from real capture sessions into a unified parametric trajectory, making it especially useful for archival dance, martial arts, and live performance recordings. Proxy anchors provide a stable interface across capture setups, while learned confidence and geometric fitting combine data-driven robustness with body structure. The method can expand training corpora, clean supervision, and provide a stronger reconstruction reference for generated motion.',
        href: 'https://arxiv.org/abs/2609.19927v1',
      },
      {
        num: 3,
        tag: 'Audio-Visual Synchronization · Temporal Evaluation',
        title: 'AVTrace: Diagnosing Audio-Visual Temporal Reasoning in Omni Models',
        keyPoints: [
          'Builds a silver-standard diagnostic suite covering onset and span grounding, synchronization, next-step prediction, cross-modal localization, chain parsing, and event-conditioned comprehension',
          'Contains 34,114 training examples plus category-balanced development and test splits of 3,500 and 7,000 examples',
          'All five evaluated open omni models fall below the test majority-label baseline of 0.556 on synchronization verification and also perform poorly on chain parsing and conditioned grounding/comprehension',
          'Parameter-efficient temporal post-training improves Gemma4-E4B-it on several metrics, while external image benchmarks change only modestly and sometimes degrade, showing that temporal ability needs dedicated training and auditing',
        ],
        description: 'Music-to-Dance cannot establish synchronization merely because a video is semantically compatible with music. AVTrace separates event onset, duration, order, and cross-modal synchrony, and shows that models able to describe content may still judge temporal alignment unreliably. It offers a template for dance evaluation: measure beat hits, motion-segment boundaries, music-event-to-motion-event correspondence, and order preservation separately rather than collapsing them into one similarity score. The paper also warns that semantic reference-text overlap is not a proxy for temporal localization.',
        href: 'https://arxiv.org/abs/2609.19991v1',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'DART: Distillation-Aware Reparameterization for Training-Free LoRA Reuse in Few-Step Video Diffusion Models',
        tag: 'Few-Step Video Diffusion · LoRA Reuse',
        href: 'https://arxiv.org/abs/2609.20051v1',
        description: 'Combines low-rank coordinate transport with target-schedule response calibration to reuse long-trajectory LoRAs in few-step video diffusion without source training videos. On four-step Wan2.2, it raises joint quality from 0.9029 to 0.9227, potentially reducing negative transfer when dance-style adapters move to distilled models.',
      },
      {
        num: 2,
        title: 'PACE: Precise AI Cinematic Expression: A Typed Specification for Script-Grounded Previsualization and Geometric Conformance',
        tag: 'Human Composition · Geometric Pose Control',
        href: 'https://arxiv.org/abs/2609.19853v1',
        description: 'Uses a typed specification for characters, props, positions, and cameras, compiling it into both diffusion prompts and a metric 3D scene. Explicitly declaring pose raises rendered-action success from 58.9% to 74.4% on 30 shots, suggesting useful controls for multi-dancer composition and camera planning.',
      },
      {
        num: 3,
        title: 'Can Vision-Language Models Judge Olympic Diving? From Reasoning to Scores in Zero-Shot Action Quality Assessment',
        tag: 'Action Quality Assessment · Explainable Scoring',
        href: 'https://arxiv.org/abs/2609.19354v1',
        description: 'Open VLMs alone stay below 0.32 Spearman correlation for zero-shot diving assessment, while combining semantic reasoning, phase-level subscores, and ensemble regression reaches 0.67. Textual reasoning outperforms raw numerical subscores, offering an explainable, phase-aware signal for dance-quality evaluation.',
      },
      {
        num: 4,
        title: 'Learning Slope-Adaptive Whole-Body Locomotion for Humanoid Robots in Roofing Construction',
        tag: 'Whole-Body Motion · Scene Contact Constraints',
        href: 'https://arxiv.org/abs/2609.20558v1',
        description: 'Retargets human demonstrations to a Unitree G1 and uses a metric roof model, trajectory optimization, and execution-aware reinforcement learning to preserve support contacts and work relations. For dance generation, it shows that motion resemblance is insufficient without explicit grounding of foot contact, scene geometry, and execution error.',
      },
    ],
    observation: 'This issue forms a complete chain from data through generation to evaluation. DirtyMoCap converts imperfect real capture into unified, coherent body trajectories; Video DeltaNet reduces long-video generation cost with local fine interactions and long-range linear memory; AVTrace then shows that evaluation must genuinely test temporal localization and synchronization rather than substitute semantic description. DART, PACE, action-quality assessment, and scene-grounded motion expose four additional engineering gaps: style adaptation for few-step models, geometric control of people and cameras, explainable motion scoring, and contact physics. A stronger Music-to-Dance pipeline should therefore treat robust motion data, efficient long-horizon generation, precise audio-visual synchronization, and physical executability as independently verifiable modules rather than merely scaling one end-to-end model.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-09-18',
        en: '/en/daily/music-to-dance/2026-09-18',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-18" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
