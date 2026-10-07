import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '随机最优控制驱动的动作定制、模块化扩散协调与人体中心表征',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'CMC 用随机最优控制迁移动作，同时从结构上抑制参考视频的外观泄漏',
      'CMDS 协调冻结的扩散生成器，在文本条件人体动作上验证模块化组合',
      'HuC-VideoMAE 以人体关键点引导遮蔽，让合成人体运动预训练更有效',
    ],
    papers: [
      {
        num: 1,
        tag: '动作定制 · 随机最优控制',
        title: 'Diverse Motion Customization via Control-based Dynamic Optimization',
        keyPoints: [
          '把参考视频动作定制表述为随机最优控制：引导生成动力学获得目标动作，同时约束样本留在预训练模型的提示条件分布内',
          '避免对参考视频直接回归导致的内容坍缩，使外观更多由文本提示决定，从结构上缓解参考人物、服饰和背景泄漏',
          '提出只聚焦生成早期阶段的时间步自适应运动代价，无需显式奖励，并将训练加速 2.5 倍',
        ],
        description: '这是今日与 Music-to-Dance 视频生成最直接相关的工作。舞蹈参考视频通常同时携带动作与外观，直接监督很容易把舞者身份、服装或场景一并复制。CMC 将“保留动作、舍弃外观”写进生成动力学的控制目标，为音乐驱动系统叠加参考编舞提供了清晰接口：音乐负责时序和语义条件，控制项负责动作轨迹，而基础模型的提示条件分布维持目标人物外观与输出多样性。',
        href: 'https://arxiv.org/abs/2610.07911',
      },
      {
        num: 2,
        tag: '模块化扩散 · 协调控制',
        title: 'One for All, All for One: Coordinated Multi-Agent Diffusion Steering via Stochastic Optimal Control',
        keyPoints: [
          '将多个冻结扩散模型视为可复用生成原语，只学习协调其反向扩散过程的控制器，而不重新训练完整联合模型',
          '以随机最优控制平衡组合级奖励与对各预训练动力学的偏离，并用学习到的控制摊销后续任务优化',
          '在多智能体迷宫、关节机器人规划和文本条件人体动作中验证，可用同一控制满足不同空间约束',
        ],
        description: 'CMDS 为舞蹈生成中的“分而治之”提供方法论：节拍、风格、身体局部或多舞者可以由不同先验负责，再由轻量协调器保证整体一致。它尚未直接处理音乐，但其文本条件人体动作实验说明该框架能作用于运动生成。对多舞者编排尤其值得关注——无需训练一个包办所有角色的模型，也可能在保留各角色运动先验的同时施加队形与互动约束。',
        href: 'https://arxiv.org/abs/2610.08595',
      },
      {
        num: 3,
        tag: '人体中心预训练 · 合成动作数据',
        title: 'HuC-VideoMAE: Human-Centric Video Masked Autoencoding from synthetic data',
        keyPoints: [
          '研究仅以 BEDLAM2.0 等合成动捕视频进行视频 Transformer 自监督预训练，避免依赖未经主体同意抓取的真人视频',
          '用身体关键点和人物包围框设计人体中心遮蔽，使模型聚焦人体结构与运动动力学，而非均匀重建背景',
          '在 NTU RGB+D 跨视角-主体设置中，相比标准合成数据 VideoMAE 预训练，弥合了与 Kinetics 预训练差距的 49%',
        ],
        description: '这篇论文不是生成器，却直接影响 Music-to-Dance 的人体运动表征质量。舞蹈系统的对齐损失、动作编码器和质量评估器都需要识别细粒度身体动态；人体中心遮蔽可减少背景捷径，让表征更重视肢体结构。更重要的是，它展示了合成动捕视频作为预训练来源的可行性，为数据授权敏感的舞蹈场景提供更可控的训练路径。',
        href: 'https://arxiv.org/abs/2610.08433',
      },
    ],
    worthReading: [
      { num: 1, title: 'iGPC: Generative Motion Priors for Object-Aware Humanoid Interaction', tag: '生成式动作先验 · 全身交互', href: 'https://arxiv.org/abs/2610.08120', description: '把通用生成式人体动作控制器适配为带场景可供性与特权状态的交互专家，再蒸馏到机载感知学生模型；覆盖伸手、借助环境稳定和推动物体。对需要接触地面或道具的舞蹈动作，其“通用先验—交互专家—感知学生”路径可用于增强物理可执行性。' },
      { num: 2, title: 'Beyond Retargeting: Low-Latency and Robust Humanoid Whole-Body Teleoperation with Learned Atomic Motion Primitives', tag: '全身动作 · 原子运动码本', href: 'https://arxiv.org/abs/2610.07891', description: '用单次前向策略把原始人体动作直接映射为机器人关节命令，并以全身原子运动码本将分布外或缺失观测投影到合理动作原型；在仿真与 Unitree G1 实机、VR、动捕、文生动作和单目视频输入上验证。其码本可为舞蹈动作补全与实时重定向提供参考。' },
      { num: 3, title: 'WorldSonus: Bringing Sound to Worlds', tag: '视频到音频 · 流式空间声', href: 'https://arxiv.org/abs/2610.08760', description: '提出面向世界模型的交互式视频到音频框架，以流式因果自回归扩散实现 0.41 的实时因子，并支持中途声音指令和与场景几何、相机运动对齐的立体声。方向与“音乐驱动动作”相反，但其低延迟跨模态时序与空间对齐设计可作为舞蹈视频声画同步的互补参照。' },
    ],
    observation: '今日没有新的纯音乐到舞蹈端到端模型，但出现了三条可组合的关键技术线：CMC 解决参考动作迁移中的外观泄漏，CMDS 解决多个冻结生成先验之间的协调，HuC-VideoMAE 则改善人体运动表征的预训练。它们共同指向一种模块化系统：以人体中心编码器抽取运动，以音乐条件决定时序，再以最优控制协调动作先验和视频生成器。与此同时，iGPC 与原子运动码本强调接触可执行性和分布外鲁棒性，说明舞蹈质量评估不应只看视觉自然度，还应纳入物理跟踪与动作可恢复性。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Control-Based Motion Customization, Modular Diffusion Coordination, and Human-Centric Representations',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'CMC transfers motion with stochastic optimal control while structurally suppressing appearance leakage',
      'CMDS coordinates frozen diffusion generators and validates modular composition on text-conditioned human motion',
      'HuC-VideoMAE uses body-guided masking to make synthetic human-motion pretraining more effective',
    ],
    papers: [
      {
        num: 1,
        tag: 'Motion Customization · Stochastic Optimal Control',
        title: 'Diverse Motion Customization via Control-based Dynamic Optimization',
        keyPoints: [
          'Formulates reference-video motion customization as stochastic optimal control, steering dynamics toward the desired motion while remaining within the pretrained prompt-conditional distribution',
          'Avoids the content collapse caused by direct regression to the reference, leaving appearance to the text prompt and reducing leakage of identity, clothing, and background',
          'Introduces a timestep-adaptive motion cost focused on early generation, removes the need for an explicit reward, and accelerates training by 2.5x',
        ],
        description: 'This is today’s most direct contribution to music-to-dance video generation. A dance reference carries motion and appearance together, so direct supervision often copies the dancer, clothing, or scene. CMC puts “retain motion, discard appearance” into the controlled generation dynamics. A music-driven system could use music for timing and semantics, the control term for choreography, and the base model’s prompt-conditioned distribution for target appearance and diversity.',
        href: 'https://arxiv.org/abs/2610.07911',
      },
      {
        num: 2,
        tag: 'Modular Diffusion · Coordinated Control',
        title: 'One for All, All for One: Coordinated Multi-Agent Diffusion Steering via Stochastic Optimal Control',
        keyPoints: [
          'Treats frozen diffusion models as reusable generative primitives and learns only a controller that coordinates their reverse processes instead of retraining a monolithic joint model',
          'Balances an assembly-level reward against deviation from pretrained dynamics through stochastic optimal control, then amortizes optimization with a learned control',
          'Validates the framework on multi-agent mazes, articulated robot planning, and text-conditioned human motion, including reuse under different spatial constraints',
        ],
        description: 'CMDS offers a principled divide-and-coordinate strategy for dance generation. Beat, style, body regions, or individual dancers could be handled by separate priors and reconciled by a lightweight controller. Although music is not an input in this paper, the human-motion experiment shows that the framework applies to motion generation. It is particularly relevant to group choreography, where independent character priors must obey formation and interaction constraints.',
        href: 'https://arxiv.org/abs/2610.08595',
      },
      {
        num: 3,
        tag: 'Human-Centric Pretraining · Synthetic Motion Data',
        title: 'HuC-VideoMAE: Human-Centric Video Masked Autoencoding from synthetic data',
        keyPoints: [
          'Studies self-supervised video-Transformer pretraining solely on synthetic mocap video such as BEDLAM2.0, avoiding reliance on scraped footage without subject consent',
          'Uses body keypoints and person boxes for human-centric masking so the model learns body structure and dynamics instead of uniformly reconstructing backgrounds',
          'Closes 49% of the gap to Kinetics pretraining on the NTU RGB+D cross-view-subject setting compared with standard VideoMAE pretraining on synthetic data',
        ],
        description: 'This is not a generator, but it directly affects motion representation quality in music-to-dance systems. Alignment losses, motion encoders, and evaluators all need sensitivity to fine-grained body dynamics. Human-centric masking reduces background shortcuts and emphasizes articulated structure. It also demonstrates a more controllable, consent-conscious pretraining route based on synthetic mocap video.',
        href: 'https://arxiv.org/abs/2610.08433',
      },
    ],
    worthReading: [
      { num: 1, title: 'iGPC: Generative Motion Priors for Object-Aware Humanoid Interaction', tag: 'Generative Motion Priors · Whole-Body Interaction', href: 'https://arxiv.org/abs/2610.08120', description: 'Adapts a general generative human-motion controller into interaction experts conditioned on affordances and privileged state, then distills them into a perception-driven student. Tasks include reaching, using supports for stabilization, and pushing objects. The prior-to-expert-to-student path may improve physical executability for dance involving floor or prop contact.' },
      { num: 2, title: 'Beyond Retargeting: Low-Latency and Robust Humanoid Whole-Body Teleoperation with Learned Atomic Motion Primitives', tag: 'Whole-Body Motion · Atomic Primitive Codebook', href: 'https://arxiv.org/abs/2610.07891', description: 'Maps raw human motion directly to robot commands in one forward pass and uses a full-body primitive codebook to project out-of-distribution or partial observations onto plausible prototypes. Evaluation spans simulation and Unitree G1 hardware with VR, mocap, text-to-motion, and monocular-video inputs, making the codebook relevant to robust dance completion and retargeting.' },
      { num: 3, title: 'WorldSonus: Bringing Sound to Worlds', tag: 'Video-to-Audio · Streaming Spatial Sound', href: 'https://arxiv.org/abs/2610.08760', description: 'Introduces interactive video-to-audio generation with streaming causal autoregressive diffusion at a 0.41 real-time factor, mid-stream sound instructions, and stereo aligned to scene geometry and camera motion. Its direction is opposite to music-driven motion, but its low-latency cross-modal timing and spatial alignment offer a useful complementary reference.' },
    ],
    observation: 'No new end-to-end music-to-dance model appeared today, but three composable technical lines did: CMC addresses appearance leakage in reference-motion transfer, CMDS coordinates multiple frozen generative priors, and HuC-VideoMAE improves human-motion representation pretraining. Together they suggest a modular system in which a human-centric encoder extracts motion, music determines timing, and optimal control coordinates motion priors with a video generator. iGPC and atomic motion primitives further emphasize contact feasibility and out-of-distribution robustness, arguing that dance evaluation should include physical trackability and recoverability alongside visual naturalness.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-10-07',
        en: '/en/daily/music-to-dance/2026-10-07',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-10-07" roleId="music-to-dance" roleName={c.roleName} title={c.title} overview={c.overview}>
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
