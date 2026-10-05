import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '二维推理时引导、视频寄生动作解码与频率解耦运动',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'LatticeSMC 在分块与去噪二维网格上安排推理预算，直接把 Music-to-Dance 拍点对齐从 0.234 提升到 0.441',
      'Parasitic Motion Decoder 从冻结视频扩散模型的中间状态同步解码三维动作，一次生成配对视频与运动',
      'FreqMo 用小波频带和共享码本同时保留慢速轨迹与足部接触等高频瞬态，并将 token 序列压缩三倍',
      '本期另关注物理可信视频动捕、空间落地手势评测、可分层音轨的音视频生成和分钟级视频漂移控制',
    ],
    papers: [
      {
        num: 1,
        tag: 'Music-to-Dance · 推理时引导',
        title: 'LatticeSMC: Where to Spend Inference-Time Compute in Chunked Sequence Generators',
        keyPoints: [
          '把分块序列生成表示为“块索引 × 去噪步骤”的二维 Feynman–Kac 网格，在统一预算下比较并组合跨块与块内引导',
          '对块可加奖励证明两条轴产生相同权重，因此应在前瞻最便宜的位置重采样；对终局奖励，任意前缀分数都可构成精确中间势函数',
          '在块边界及评分免费的块内位置按势函数重采样，可返回加权样本或最佳粒子，无需额外去噪器调用',
          '32 粒子下，Music-to-Dance 拍点对齐由 0.234 提升至 0.441，超过 best-of-N 的 0.354；40 秒文生音乐提示遵循度由 0.470 升至 0.560',
        ],
        description: '这是本期与 Music-to-Dance 最直接的工作：它不重训生成器，而是回答有限推理预算应该花在“当前去噪更精细”还是“更早淘汰长程分支”上。拍点对齐的大幅提升说明可评估的音乐—动作奖励能有效介入分块扩散，并且长程奖励仍保有优势。实际部署仍需关注 32 粒子的延迟与显存成本，以及 beat alignment 是否会牺牲动作自然度；论文称保持留出质量并有人评偏好，但舞蹈风格、接触稳定性与跨块身份一致性仍应单独审计。',
        href: 'https://arxiv.org/abs/2610.02774',
      },
      {
        num: 2,
        tag: '三维人体动作 · 视频扩散解码',
        title: 'Parasitic Co-Denoising: Unlocking 3D Human Motion Generation in a Frozen Video Diffusion Model',
        keyPoints: [
          '探测冻结 Wan2.1 后发现，可恢复的三维动作信号贯穿整个去噪日程，而非只存在于最终干净视频',
          '提出寄生协同去噪：动作沿宿主视频模型的去噪轨迹被解码，而不是由独立动作生成器另行采样',
          'Parasitic Motion Decoder 采用与宿主共享噪声日程的流匹配，并通过 σ 自适应多层融合读取中间特征，宿主参数保持冻结',
          '以较少可训练参数超过专用动作生成器的文本—动作对齐，并在一次前向过程中产出彼此配对的视频与三维动作',
        ],
        description: 'Music-to-Dance 系统常面临“视频好看但骨架不可用”或“动作正确但渲染脱节”的双模型鸿沟。PMD 从同一去噪过程导出视频与三维运动，为拍点损失、足部接触检查和后续重定向提供显式轨迹，同时避免两个生成器独立采样造成的错位。其动作覆盖借力大规模视频先验也很有吸引力。不过当前摘要只报告文本—动作对齐，没有音乐条件、节奏指标或定量视频—骨架几何一致性；迁移时应把音频条件注入宿主与解码器，并验证快速舞步中的深度和接触。',
        href: 'https://arxiv.org/abs/2610.03047',
      },
      {
        num: 3,
        tag: '动作表示 · 多频时间建模',
        title: 'Rethinking Fixed Temporal Grids: Frequency-Disentangled Motion Generation',
        keyPoints: [
          '指出均匀时间 token 会把慢速全局轨迹与足部接触、关节冲量等快速瞬态纠缠在同一分辨率中',
          'FreqMo 用小波频带分解动作，在保持时间定位和精确重建的同时分离不同尺度动态',
          'Unified Frequency Residual Quantization 让全部频带共享一个码本，将 token 序列压缩三倍并支持稳定的单阶段生成',
          '实验报告达到 SOTA 动作保真度并显著改善高频细节，且同一频率分解可迁移到连续扩散骨干',
        ],
        description: '舞蹈同时包含乐句级位移、拍级律动和触地瞬间，固定帧率 token 往往优先拟合低频轮廓而抹平击拍动作。FreqMo 的多频表示可以让音乐的层级节拍分别条件化对应运动频带，也能以更短序列支撑长舞生成。共享码本则避免为每个频带维护孤立语义空间。摘要尚未给出音乐驱动实验或具体基准数值，因此下一步应核验跨频带相位、足滑、重建延迟，以及三倍压缩是否在复杂编舞上仍成立。',
        href: 'https://arxiv.org/abs/2610.03012',
      },
    ],
    worthReading: [
      { num: 1, title: 'FlowHMR: Physically Plausible Motion Capture from Video', tag: '视频动捕 · 物理奖励', href: 'https://arxiv.org/abs/2610.03691', description: '把单目动捕改写为视频条件流匹配生成，再用 GRPO 同时优化视频保真与物理控制器可跟踪性；Wild-4K 上物理跟踪成功率为 82.47%，强基线 GVHMR 为 62.82%。它适合从舞蹈视频构建更可执行的训练动作，但不是音乐条件生成。' },
      { num: 2, title: 'A Benchmark for Spatially Grounded Gesture Generation', tag: '手势生成 · 分解式评测', href: 'https://arxiv.org/abs/2610.03105', description: '提供约 2K 个带三维指向目标标注的自然 VR 对话片段，并把“何时、如何、指向哪里”拆成时间对齐、空间落地与感知自然度；结果显示几何落地超过真人也不必然更自然。其分解评测思想可迁移到舞蹈的拍点、空间队形和自然度。' },
      { num: 3, title: 'Soundwich: Video Generation with Layered and Controllable Audio', tag: '联合音视频 · 分层音轨', href: 'https://arxiv.org/abs/2610.00691', description: '训练自由地把冻结联合音视频流匹配模型扩展为多条同步、独立可编辑音轨，通过共享场景表示和定向跨模态路由维持视听一致。对舞蹈视频后期尤其有用：音乐、脚步和环境声可分别重定时或替换，但论文目标不是由既定音乐驱动人体。' },
      { num: 4, title: 'In-Distribution Forcing for Long Video Generation at Test Time', tag: '长视频 · 漂移抑制', href: 'https://arxiv.org/abs/2610.03120', description: '指出长视频 KV conditioning 的缓存本身会在训练时域之外变成 OOD，并用不关注旧缓存的 self-caching 保持滚动窗口符合训练分布，在无需训练下把短时模型扩展到分钟级。长舞视频可借此减轻外观与动力学衰减，但尚未验证音乐相位连续性。' },
    ],
    observation: '周一窗口覆盖上一个工作日 2026-10-02 UTC 的新稿。今天最清晰的趋势，是把长时 Music-to-Dance 的三个瓶颈分别结构化：LatticeSMC 在块与去噪步之间分配推理预算，PMD 让视频与显式三维动作共享同一生成轨迹，FreqMo 则把动作时间尺度拆成可独立保真的频带。三者可以形成互补流水线：多频动作表示负责细节，视频寄生解码提供可核验骨架，二维粒子引导用拍点与长程奖励做推理时选择。本次 arXiv 与 Hugging Face Daily Papers 均采集成功；100 条去重候选中来源覆盖为 arXiv 86 条、Hugging Face 14 条，无来源告警。精选论文均来自本次真实结果，核心条目已通过 arXiv 摘要页核验，并排除了只命中 motion、diffusion 或 temporal 等宽泛词的无关工作。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: '2D Inference-Time Steering, Parasitic Video-to-Motion Decoding, and Frequency-Disentangled Motion',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'LatticeSMC allocates inference compute over a two-dimensional chunk-by-denoising lattice, directly raising Music-to-Dance beat alignment from 0.234 to 0.441',
      'A Parasitic Motion Decoder extracts 3D motion alongside video from intermediate states of a frozen video diffusion model',
      'FreqMo combines wavelet bands with a shared codebook to retain both slow trajectories and high-frequency events such as foot contacts while compressing tokens threefold',
      'Also covered: physically plausible video mocap, spatially grounded gesture evaluation, layered audio-video generation, and drift control for minute-long video',
    ],
    papers: [
      {
        num: 1,
        tag: 'Music-to-Dance · Inference-Time Steering',
        title: 'LatticeSMC: Where to Spend Inference-Time Compute in Chunked Sequence Generators',
        keyPoints: [
          'Models chunked sequence generation as a two-dimensional Feynman–Kac lattice over chunk index and denoising step, unifying cross-chunk and within-chunk steering under matched budgets',
          'Proves that chunk-additive rewards induce identical weights on both axes, so resampling should occur where lookahead is cheapest; for terminal rewards, any prefix score gives an exact intermediate potential',
          'Resamples from these potentials at chunk boundaries and, when scoring is free, within chunks, returning a weighted draw or best particle without extra denoiser calls',
          'At 32 particles, raises Music-to-Dance beat alignment from 0.234 to 0.441 versus 0.354 for best-of-N, and 40-second text-to-music prompt adherence from 0.470 to 0.560',
        ],
        description: 'This is the issue’s most direct Music-to-Dance contribution. Rather than retraining the generator, it decides whether limited compute is better spent refining the current denoising path or pruning long-horizon branches earlier. The large beat-alignment gain shows that an evaluable music–motion reward can effectively steer chunked diffusion, including long-range objectives. Deployment must still account for the latency and memory of 32 particles and test whether optimizing beat alignment harms naturalness. The paper reports preserved held-out quality and human preference, but dance style, contact stability, and identity across chunks deserve separate audits.',
        href: 'https://arxiv.org/abs/2610.02774',
      },
      {
        num: 2,
        tag: '3D Human Motion · Video Diffusion Decoding',
        title: 'Parasitic Co-Denoising: Unlocking 3D Human Motion Generation in a Frozen Video Diffusion Model',
        keyPoints: [
          'Probing frozen Wan2.1 finds recoverable 3D motion throughout the denoising schedule rather than only in the final clean video',
          'Introduces parasitic co-denoising, decoding motion along the host video model’s trajectory instead of sampling from an independent motion generator',
          'The Parasitic Motion Decoder uses flow matching on the host noise schedule and reads intermediate features through σ-adaptive multi-layer fusion while leaving the host frozen',
          'With a small fraction of the trainable parameters, it leads dedicated motion generators on text–motion alignment and emits paired video and 3D motion in one pass',
        ],
        description: 'Music-to-Dance pipelines often face either attractive video with unusable skeletons or correct motion rendered out of sync. PMD derives video and explicit 3D motion from one denoising process, exposing trajectories for beat losses, foot-contact checks, and retargeting while avoiding independent sampling drift. Leveraging a large video prior for motion coverage is also attractive. The abstract reports text–motion alignment, however, not music conditioning, rhythm metrics, or quantitative video–skeleton geometry. A transfer should inject audio into both host and decoder and stress-test depth and contacts during fast steps.',
        href: 'https://arxiv.org/abs/2610.03047',
      },
      {
        num: 3,
        tag: 'Motion Representation · Multi-Frequency Time Modeling',
        title: 'Rethinking Fixed Temporal Grids: Frequency-Disentangled Motion Generation',
        keyPoints: [
          'Argues that uniform temporal tokens entangle slow global trajectories with fast transients such as foot contacts and joint impulses',
          'FreqMo decomposes motion into wavelet bands, separating temporal scales while retaining localization and exact reconstruction',
          'Unified Frequency Residual Quantization encodes all bands in one shared codebook, compressing token sequences threefold and enabling stable single-stage generation',
          'Experiments report state-of-the-art fidelity with substantially better high-frequency preservation, and the decomposition transfers to continuous diffusion backbones',
        ],
        description: 'Dance contains phrase-scale displacement, beat-scale groove, and contact-scale impulses. Fixed-rate tokens tend to fit low-frequency shape while smoothing beat accents. FreqMo could let hierarchical musical structure condition corresponding motion bands and support longer generation with fewer tokens, while a shared codebook avoids isolated semantics per band. The abstract gives neither music-driven experiments nor detailed benchmark values, so follow-up should test cross-band phase, foot sliding, reconstruction latency, and whether threefold compression survives complex choreography.',
        href: 'https://arxiv.org/abs/2610.03012',
      },
    ],
    worthReading: [
      { num: 1, title: 'FlowHMR: Physically Plausible Motion Capture from Video', tag: 'Video Mocap · Physical Rewards', href: 'https://arxiv.org/abs/2610.03691', description: 'Recasts monocular mocap as video-conditioned flow-matching generation, then uses GRPO rewards for video fidelity and physics-controller trackability. Physical tracking success on Wild-4K reaches 82.47% versus 62.82% for GVHMR. It can produce more executable training motion from dance video, though it is not music-conditioned generation.' },
      { num: 2, title: 'A Benchmark for Spatially Grounded Gesture Generation', tag: 'Gesture Generation · Factorized Evaluation', href: 'https://arxiv.org/abs/2610.03105', description: 'Provides roughly 2K natural VR dialogue clips with 3D pointing targets and separates when, how, and where to point into temporal alignment, spatial grounding, and perceived naturalness. Better-than-human geometric grounding does not imply higher naturalness. The factorized protocol transfers well to beat timing, stage formation, and naturalness in dance.' },
      { num: 3, title: 'Soundwich: Video Generation with Layered and Controllable Audio', tag: 'Joint Audio-Video · Layered Stems', href: 'https://arxiv.org/abs/2610.00691', description: 'Training-free adaptation turns a frozen joint audio-video flow model into a generator of synchronized, independently editable stems, using a shared scene representation and routed cross-modal interactions. Music, footsteps, and ambience in dance video could be retimed or replaced independently, although the task is not human motion driven by a fixed track.' },
      { num: 4, title: 'In-Distribution Forcing for Long Video Generation at Test Time', tag: 'Long Video · Drift Control', href: 'https://arxiv.org/abs/2610.03120', description: 'Identifies cached KV entries themselves becoming out-of-distribution beyond the training horizon. Self-caching constructs each chunk without attending to prior cache, keeping the rolling window in-distribution and extending short-horizon models to minute scale without training. It may reduce appearance and dynamics decay in long dances, but musical phase continuity remains untested.' },
    ],
    observation: 'Because this is Monday, the window covers new submissions from the previous workday, 2026-10-02 UTC. The clearest trend is structural separation of three long-form Music-to-Dance bottlenecks: LatticeSMC allocates inference budget across chunks and denoising steps, PMD ties video to an explicit 3D trajectory, and FreqMo separates motion timescales into bands whose details can be preserved independently. Together they suggest a complementary pipeline: multi-frequency motion representations retain detail, parasitic decoding exposes a verifiable skeleton, and 2D particle steering selects outputs using beat and long-range rewards. Both arXiv and Hugging Face Daily Papers were collected successfully. The 100 deduplicated candidates contain 86 with arXiv provenance and 14 with Hugging Face provenance, with no source warnings. All selections came from this live collection, core entries were checked on arXiv abstract pages, and broad-keyword false positives were excluded.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-05',
        en: '/en/daily/music-to-dance/2026-10-05',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-05" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
