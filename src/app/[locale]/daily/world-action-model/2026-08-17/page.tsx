import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '预测性 VLA 的未来表征与低延迟动态操作',
    description: 'World Action Model 研究日报',
    overview: [
      'ReflexVLA 将未来视觉 latent 预测与动作 chunk 回归联合训练，用于动态操作中的前瞻控制',
      '其多帧视觉融合与 CUDA Graph 部署优化共同降低感知到执行的时延',
      '本窗口没有新的 Awesome-WAM 清单条目；扩散 WAM 方向应继续关注动作和未来状态的联合生成',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'Reflex: Enabling Fast and Predictive Vision-Language-Action Models for Reaction-Critical Manipulation',
        keyPoints: [
          '提出 ReflexBench，包含传送带抓放、接球、滚动球拦截和旋转插销等 6 个反应关键型动态操作任务，并分别建模同步和异步推理的时延',
          '在 VLA 的多模态序列中加入与动作 chunk 等长的 future tokens；每个 token 预测冻结 DINOv3 编码器的未来观测语义 latent，并以余弦损失和动作损失联合优化',
          '在视觉骨干中对历史帧做因果时序融合，只向语言骨干暴露当前帧的融合 token；批量视觉编码和 CUDA Graph 将端到端时延降至 65.0 ms',
          'ReflexBench 平均成功率为 50.4%，高于其 VLA-Adapter 基线的 30.3%；在 AgileX Piper 真机的传送带、按键和接球实验中也优于报告的 SmolVLA 基线',
        ],
        description: '这是一篇符合 WAM 核心边界的 predictive-latent 联合模型：未来状态不是脱离控制的辅助视频任务，而是与每个待执行动作步对齐的语义预测目标。冻结视觉教师避免为了像素重建浪费容量，使共享的 VLA 表征学习对动态物体轨迹有用的未来变化。其消融也说明世界预测和系统时延必须共同考虑：未来预测使成功率从 36.8% 升至 62.8%，完整时序与部署设计达到 73.8%。对于 embodied WAM，值得进一步检验这种单步语义预测在更长时域规划和分布外接触任务中的保持能力。',
        href: 'https://arxiv.org/abs/2608.14379',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'ForgeWM: Progressive Causal Training for Few-Step Action-Conditioned Video World Models',
        tag: 'Cascaded WAM · 动作条件视频世界模型',
        href: 'https://arxiv.org/abs/2608.14022',
        description: '将双向动作条件视频生成器经因果训练、一致性蒸馏和 on-policy 分布匹配转换为 1/2/4 步因果世界模型，保持键盘和鼠标动作与 latent chunk 对齐。其 1 步模型在 Minecraft 评测中报告 72.10 FPS。它明确生成动作条件的未来视频，但目前实证限于游戏控制，并未从生成结果导出机器人策略，故列为边界相关参考。',
      },
      {
        num: 2,
        title: 'Ontology-Grounded World Models for Failure Diagnosis and Closed-Loop Repair in Physical AI Systems',
        tag: 'Cascaded WAM · 预测 latent 与验证修复',
        href: 'https://arxiv.org/abs/2608.13901',
        description: '在 EV-WM 的动作条件未来 latent 预测和候选动作窗口之上，加入类型化任务谓词、失败诊断和验证门控的修复记录。LIBERO-Goal 的量化修复直接修改模拟器 qpos，而非由机器人策略执行；作者也明确未做真机或端到端策略验证。因此它是把世界预测接入可审计闭环的有益接口工作，而非完整 WAM 控制方案。',
      },
    ],
    observation: '今日最可信的信号是 predictive-latent WAM 设计开始正面处理反应型控制的两个耦合瓶颈：模型必须预测与动作时域对齐的未来语义状态，同时必须在该未来失效前完成推理。ReflexVLA 以共享 VLA 表征实现这一点，但仍只覆盖短预测时域。扩散方向的 ForgeWM 展示了低步数动作条件世界生成和 rollout 分布匹配的工程路径，不过其当前证据来自游戏而非机器人。后续应优先寻找同时报告真实机器人闭环、未来视觉或 latent 生成、以及由该预测直接选择或生成动作的联合扩散模型。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Future Representations and Low-Latency Dynamic Manipulation for Predictive VLAs',
    description: 'Daily research digest for World Action Models',
    overview: [
      'ReflexVLA jointly trains future visual-latent prediction and action-chunk regression for anticipatory dynamic manipulation',
      'Multi-frame visual fusion and CUDA Graph deployment optimization reduce perception-to-action latency together',
      'Awesome-WAM has no new list entries in this window; diffusion WAMs should remain judged by joint action and future-state generation',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Autoregressive · Predictive-Latent',
        title: 'Reflex: Enabling Fast and Predictive Vision-Language-Action Models for Reaction-Critical Manipulation',
        keyPoints: [
          'Introduces ReflexBench with six reaction-critical dynamic manipulation tasks, including conveyor pick-and-place, ball catching, rolling-ball interception, and rotating-peg insertion; both synchronous and asynchronous inference latency are modeled',
          'Adds future tokens matching the action-chunk horizon to the VLA sequence; each token predicts a future-observation semantic latent from a frozen DINOv3 encoder, jointly optimized with the action loss',
          'Fuses historical frames causally inside the vision backbone while exposing only current-frame fused tokens to the language backbone; batched visual encoding and CUDA Graph replay reduce end-to-end latency to 65.0 ms',
          'Reports a 50.4% average ReflexBench success rate versus 30.3% for its VLA-Adapter backbone, plus stronger results than the reported SmolVLA baseline on three AgileX Piper real-robot tasks',
        ],
        description: 'This is a predictive-latent joint model that meets the core WAM boundary: future state is not an independent video auxiliary task, but a semantic prediction target aligned with every action step to be executed. The frozen visual teacher avoids spending capacity on pixel reconstruction and makes the shared VLA representation sensitive to future changes relevant to moving objects. Its ablation also shows why world prediction and systems latency must be considered together: future prediction raises success from 36.8% to 62.8%, while the complete temporal and deployment design reaches 73.8%. For embodied WAMs, the important next test is whether this single-step semantic foresight persists over longer planning horizons and out-of-distribution contact tasks.',
        href: 'https://arxiv.org/abs/2608.14379',
      },
    ],
    worthReading: [
      {
        num: 1,
        title: 'ForgeWM: Progressive Causal Training for Few-Step Action-Conditioned Video World Models',
        tag: 'Cascaded WAM · Action-Conditioned Video World Model',
        href: 'https://arxiv.org/abs/2608.14022',
        description: 'Converts a bidirectional action-conditioned video generator into 1/2/4-step causal world models through causal training, consistency distillation, and on-policy distribution matching, retaining keyboard and mouse alignment with latent chunks. Its one-step Minecraft model reports 72.10 FPS. It explicitly generates action-conditioned future video, but the evidence is limited to game control and does not derive a robot policy from generated outcomes, so it remains a boundary-relevant reference.',
      },
      {
        num: 2,
        title: 'Ontology-Grounded World Models for Failure Diagnosis and Closed-Loop Repair in Physical AI Systems',
        tag: 'Cascaded WAM · Predictive Latent and Verified Repair',
        href: 'https://arxiv.org/abs/2608.13901',
        description: 'Adds typed task predicates, failure diagnosis, and a verification-gated correction record over EV-WM action-conditioned future-latent prediction and candidate action windows. Its quantitative LIBERO-Goal repair directly modifies simulator qpos rather than executing a robot policy; the authors explicitly report neither real-robot nor end-to-end policy validation. It is therefore useful interface work for auditable world-prediction loops, not a complete WAM controller.',
      },
    ],
    observation: 'The strongest signal today is that predictive-latent WAM design is directly addressing the two coupled bottlenecks of reaction-critical control: a model must forecast future semantic state on the action timescale, and it must finish inference before that forecast expires. ReflexVLA does so through a shared VLA representation, although it still covers a short horizon. ForgeWM shows an engineering route to few-step action-conditioned world generation and rollout distribution matching, but its present evidence is in games rather than robotics. Priority should go to joint diffusion models that report real-robot closed loops, future visual or latent generation, and actions directly selected or generated from that prediction.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-08-17',
        en: '/en/daily/world-action-model/2026-08-17',
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
      date="2026-08-17"
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
