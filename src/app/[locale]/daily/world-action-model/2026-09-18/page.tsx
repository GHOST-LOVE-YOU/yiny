import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '触觉联合扩散、显式运动未来与跨具身接触动力学',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'Agile-WAM 在共享 latent 中以流匹配联合生成动作块和未来视觉/触觉状态，并将真实机器人推理延迟压到 11.9 ms',
      'MoWAM 用紧凑的显式未来运动替代推理期视频生成，并通过运动—动作候选采样实现测试时扩展',
      'DexTouch-WM 把人类触摸重定向到机器人动作空间，扩展动作条件视觉—触觉动力学学习',
      '未来导向 latent、采样式 MPC 与生成场景想象分别展示了从隐式预测到显式规划的不同耦合强度',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'Agile-WAM: An Agile Tactile World Action Model for Contact-Rich Robot Control',
        keyPoints: [
          '将视觉与触觉观测编码到共享 latent，并以直接的视觉—触觉到动作流匹配过程，联合生成动作块以及未来视觉/触觉 latent',
          '针对模态时间尺度差异采用多时域监督：视觉预测较远时间偏移，触觉预测下一帧，以捕捉接触瞬变而避免冗余视觉重建',
          '覆盖 9 项仿真和 5 项真实接触操作任务；真实实验总体成功率相对最强基线提高 29.4%，推理延迟为 11.9 ms',
        ],
        description: 'Agile-WAM 是今日最强的 Joint WAM：动作生成与多模态未来预测不是松散辅助任务，而是在同一共享表示和流匹配过程中联合生成。它还把视觉的慢变化与触觉的快瞬变显式拆成不同预测时域，使世界监督更贴合接触控制的频率需求。按 taxonomy，它属于 multi-stream/shared-representation 的 Joint WAM - Diffusion。真实机器人结果同时覆盖成功率与低延迟，说明预测未来并不必然牺牲高频控制；但摘要尚未给出各任务绝对成功率和不同传感器扰动下的细分结果。',
        href: 'https://arxiv.org/abs/2609.20761v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'MoWAM: Explicit Future Motion Prediction for Efficient World Action Models',
        keyPoints: [
          '以结构化机器人运动作为紧凑未来抽象，避免在推理时生成完整未来视频，同时保留显式、可解释的未来表示',
          'Mixture-of-Transformer 在训练中学习未来视觉动力学并联合预测运动与动作；部署时移除视频生成分支以降低开销',
          '推理时采样多组运动—动作候选，再由运动感知的任务进度验证器选择；候选数增加时性能继续提升',
          '在 LIBERO、LIBERO-Plus 和真实操作中取得强分布内表现、更好的分布外鲁棒性及高于代表性 WAM 基线的平均真实成功率',
        ],
        description: 'MoWAM 把 WAM 的“未来”从高成本像素重建压缩为与控制直接相关的运动结构，并利用这一结构同时约束动作和支持候选排序。它更接近 predictive-latent 的 Joint WAM：未来运动与动作在训练和推理中成对出现，而视频预测只作为训练期动力学教师。相较完全隐式的预测 latent，这种接口便于诊断测试时扩展是否真的探索了不同未来；相较显式视频 WAM，它牺牲环境外观变化的表达能力换取效率。',
        href: 'https://arxiv.org/abs/2609.20709v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Pixel-Space Prediction · Policy Learning',
        title: 'DexTouch-WM: Learning Action-Conditioned Tactile World Models from Human Touch for Dexterous Robot Manipulation',
        keyPoints: [
          '联合预测动作条件的未来 RGB 与双侧触觉动力学，以预训练视频专家和轻量触觉专家通过解剖感知触觉 token 连接两种模态',
          '在人手和灵巧机器人手上部署共享布局的柔性压阻阵列，并将人类运动重定向到机器人动作空间，使跨具身数据可监督同一动力学模型',
          '固定 5 小时机器人数据、把人类交互从 0 扩展至 100 小时后，即使人机任务集合不重合，机器人域视觉、几何和接触预测仍显著改善',
          '将模型用作策略评估的代理环境，并生成合成轨迹训练真实机器人策略，验证预测模型向动作学习的下游闭环',
        ],
        description: 'DexTouch-WM 的核心价值是为接触世界模型找到机器人演示之外的数据扩展轴。动作兼容化和共享触觉布局让人类触摸不只是预训练背景数据，而能直接改善机器人条件动力学。按 taxonomy，它最适合归入 Cascaded WAM：模型先预测视觉—触觉未来，再作为代理环境和轨迹生成器服务策略评估与学习，而非在同一生成流中输出动作。跨具身收益很有吸引力，但摘要未说明合成轨迹在各真实任务上的独立策略增益，因而仍需正文级消融判断 world-model fidelity 与 policy utility 的对应关系。',
        href: 'https://arxiv.org/abs/2609.20649v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Learning Foresight without Explicit Trajectories for 3D Diffusion Policies', tag: 'Joint WAM - Diffusion · Implicit Future', href: 'https://arxiv.org/abs/2609.20669v1', description: '用稀疏未来夹爪状态监督历史编码的运动趋势 latent，部署时仅以该 latent 条件化 3D 扩散动作生成；相对 DP3 只增加 3.52% 参数，却在 RoboTwin2.0、LIBERO-40 和五项真实任务显著提升。未来预测是隐式且不递归展开，故列入延伸阅读。' },
      { num: 2, title: 'Accelerating Visual Policy Learning with Sampling-Based Model Predictive Control', tag: 'Cascaded WAM · Simulator-Based MPC', href: 'https://arxiv.org/abs/2609.20575v1', description: 'SGPS 交替执行采样式 MPC 动作目标细化与短时域可微策略优化，并把渲染移出梯度图；在单 GPU 上训练多种接触技能，蒸馏视觉策略零样本迁移到真实 Go2。世界预测来自模拟器而非学习式 WAM，但规划—策略闭环具有参考价值。' },
      { num: 3, title: 'Imagine-TAMP: Imagination-Guided Task and Motion Planning in Partial Observability', tag: 'Cascaded WAM · Generative Scene Planning', href: 'https://arxiv.org/abs/2609.20396v1', description: '以 VLM 形成目标位置粒子信念、生成场景模型补全未观测几何，再比较观察与移除遮挡物等计划骨架；货架任务成功率从 46.0% 提至 84.0%，真实机器人规划时间相对几何消融减少 32%。它以场景想象评估高层动作，耦合弱于动作条件生成。' },
    ],
    observation: '今日的主线是“把未来预测压到控制真正需要的状态”。Agile-WAM 保留视觉与触觉两种未来，却按各自时间尺度监督并与动作共同流匹配；MoWAM 更激进地用结构化运动替代视频，在部署时把显式未来直接用于候选选择；DexTouch-WM 则把人类接触数据转化为机器人可用的动作条件动力学。三者分别回答了高频执行、测试时扩展和数据规模化问题。Hugging Face Daily Papers API 已成功检查 50 条榜单，但尚未收录上述新提交；Awesome-WAM 最新 README 已核读，其 Joint WAM / Diffusion-based Generation 章节未发现这些 2609.20xxx 新条目，因此不把清单状态误作论文发布日期。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Joint Tactile Diffusion, Explicit Motion Futures, and Cross-Embodiment Contact Dynamics',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'Agile-WAM jointly generates action chunks and future visual/tactile states through flow matching in a shared latent, reaching 11.9 ms real-robot latency',
      'MoWAM replaces inference-time video generation with compact explicit future motion and scales at test time by sampling motion–action candidates',
      'DexTouch-WM retargets human touch into robot action space to scale action-conditioned visual–tactile dynamics learning',
      'Future-oriented latents, sampling MPC, and generative scene imagination span different strengths of prediction–action coupling',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Shared Representation',
        title: 'Agile-WAM: An Agile Tactile World Action Model for Contact-Rich Robot Control',
        keyPoints: [
          'Encodes visual and tactile observations into a shared latent, then jointly generates action chunks and future visual/tactile latents with direct vision–tactile-to-action flow matching',
          'Uses modality-specific horizons: visual latents are supervised at a larger offset while tactile latents predict the next frame, capturing contact transients without redundant visual reconstruction',
          'Across nine simulated and five real contact-rich tasks, it improves overall real-world success by 29.4% relative to the strongest baseline while running at 11.9 ms latency',
        ],
        description: 'Agile-WAM is today’s strongest Joint WAM. Action generation and multimodal future prediction are not loosely attached auxiliary tasks; they are generated together through one shared representation and flow-matching process. Separating slow visual evolution from fast tactile transients also aligns world supervision with contact-control frequency. In the taxonomy, this is a multi-stream/shared-representation Joint WAM - Diffusion. The real-robot results cover both success and latency, showing that predictive futures need not preclude high-frequency control, although the abstract does not expose per-task absolute success or detailed sensor-perturbation results.',
        href: 'https://arxiv.org/abs/2609.20761v1',
      },
      {
        num: 2,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'MoWAM: Explicit Future Motion Prediction for Efficient World Action Models',
        keyPoints: [
          'Uses structured robot motion as a compact future abstraction, avoiding full video generation at inference while retaining an explicit, interpretable future representation',
          'A Mixture-of-Transformer learns visual dynamics during training and jointly predicts motion and action; deployment removes the video-generation branch',
          'Samples multiple motion–action pairs at inference and selects them with a motion-aware task-progress verifier; performance continues to improve with more candidates',
          'Shows strong in-distribution results, better out-of-distribution robustness, and higher average real-world success than representative WAM baselines on LIBERO, LIBERO-Plus, and real manipulation',
        ],
        description: 'MoWAM compresses the WAM “future” from expensive pixel reconstruction into control-relevant motion structure, using that structure both to constrain actions and rank candidates. It fits predictive-latent Joint WAM: future motion and action remain paired through training and inference, while video prediction acts only as a training-time dynamics teacher. Compared with fully implicit future latents, the interface makes test-time exploration diagnosable; compared with explicit video WAMs, it trades representation of environmental appearance changes for efficiency.',
        href: 'https://arxiv.org/abs/2609.20709v1',
      },
      {
        num: 3,
        tag: 'Cascaded WAM · Pixel-Space Prediction · Policy Learning',
        title: 'DexTouch-WM: Learning Action-Conditioned Tactile World Models from Human Touch for Dexterous Robot Manipulation',
        keyPoints: [
          'Jointly predicts action-conditioned future RGB and bilateral tactile dynamics by coupling a pretrained video expert with a lightweight tactile expert through anatomy-aware tactile tokens',
          'Deploys flexible piezoresistive arrays with a shared layout on human and dexterous robot hands, then retargets human motion into robot action space so both embodiments supervise one dynamics model',
          'With robot supervision fixed at five hours, scaling human interaction from 0 to 100 hours substantially improves held-out robot-domain visual, geometric, and contact prediction despite disjoint task sets',
          'Uses the learned models as surrogate environments for policy evaluation and as synthetic-trajectory generators for real-robot policy learning',
        ],
        description: 'DexTouch-WM identifies a scaling axis for contact world models beyond robot demonstrations. Compatible actions and shared tactile layouts make human touch direct supervision for robot-conditioned dynamics rather than generic pretraining data. It best fits Cascaded WAM: visual–tactile futures are predicted first, then support policy evaluation and training, instead of actions being emitted by the same generative stream. The cross-embodiment gains are compelling, but the abstract does not isolate synthetic-trajectory policy gains task by task, so full-paper ablations are still needed to connect predictive fidelity with policy utility.',
        href: 'https://arxiv.org/abs/2609.20649v1',
      },
    ],
    worthReading: [
      { num: 1, title: 'Learning Foresight without Explicit Trajectories for 3D Diffusion Policies', tag: 'Joint WAM - Diffusion · Implicit Future', href: 'https://arxiv.org/abs/2609.20669v1', description: 'Sparse future gripper states supervise a movement-trend latent encoded from history; only that latent conditions 3D diffusion action generation at deployment. It adds 3.52% parameters to DP3 and reports large gains on RoboTwin2.0, LIBERO-40, and five real tasks. Because the future remains implicit and is not rolled out recursively, it is listed as Worth Reading.' },
      { num: 2, title: 'Accelerating Visual Policy Learning with Sampling-Based Model Predictive Control', tag: 'Cascaded WAM · Simulator-Based MPC', href: 'https://arxiv.org/abs/2609.20575v1', description: 'SGPS alternates sampling-MPC action-target refinement with short-horizon differentiable policy optimization and removes rendering from the gradient graph. It trains contact skills on one GPU, and the distilled visual policy transfers zero-shot to a real Go2. Prediction comes from a simulator rather than a learned WAM, but the planning–policy loop is informative.' },
      { num: 3, title: 'Imagine-TAMP: Imagination-Guided Task and Motion Planning in Partial Observability', tag: 'Cascaded WAM · Generative Scene Planning', href: 'https://arxiv.org/abs/2609.20396v1', description: 'A VLM shapes a target-location particle belief and a generative scene model fills unobserved geometry before comparing observation and occluder-removal plan skeletons. Shelf success rises from 46.0% to 84.0%, and real-robot planning time falls 32% versus a geometry-only ablation. Scene imagination evaluates high-level actions, but coupling is weaker than action-conditioned generation.' },
    ],
    observation: 'Today’s main theme is compressing future prediction into the state that control actually needs. Agile-WAM retains visual and tactile futures but supervises each at its own timescale and jointly flow-matches them with actions. MoWAM goes further by replacing video with structured motion and using explicit futures for candidate selection at deployment. DexTouch-WM turns human contact into scalable action-conditioned robot dynamics. Together they address high-frequency execution, test-time scaling, and data scaling. The Hugging Face Daily Papers API was successfully checked across 50 ranked entries but has not yet included these new submissions. The latest Awesome-WAM README was reviewed; its Joint WAM / Diffusion-based Generation section does not yet contain these 2609.20xxx papers, so list status is not presented as publication status.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-18',
        en: '/en/daily/world-action-model/2026-09-18',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-18" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
