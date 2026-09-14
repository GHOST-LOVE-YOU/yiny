import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'World Action Model 研究者',
    title: '空间目标潜接口：抑制视觉—动作捷径的 WAM 泛化训练',
    description: 'World Action Model 与具身智能世界模型研究日报',
    overview: [
      'LIT 先在无图像条件下学习空间目标驱动的动作先验，再通过姿态监督的潜接口恢复视觉条件',
      '终端 SE(3) 位姿把动作块的未来结果与流匹配动作生成对齐，并在推理时被视觉潜 token 隐式替代',
      '同一训练策略在 FAST-WAM、ImageWAM 与两类 VLA 上均提升视觉分布偏移下的泛化',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Cross-Attention · Predictive-Latent',
        title: 'Breaking the Vision-Action Shortcut: Latent Interface Training for Generalizable Robotics Foundation Models',
        keyPoints: [
          '第一阶段冻结视觉/世界模型骨干，在不输入图像的情况下，以语言、机器人状态和每个动作块的终端 SE(3) 位姿训练流匹配动作专家，建立空间目标条件动作先验',
          '第二阶段用 100 个可学习 latent token 逐层交叉注意视觉与语义表示，并把这些 token 作为动作专家唯一的视觉条件通道；终端位姿重建损失迫使接口保留与动作相关的空间信息',
          '该接口适配 π0.5、MolmoAct2、FAST-WAM 和 ImageWAM；LIBERO-Plus 总成功率分别提升 10.70、8.30、9.19 和 3.87 个百分点，同时保持或提升 LIBERO 平均成功率',
          '真实机器人三项任务中，汇总成功率在光照、相机和干扰物偏移下分别从 53.3%/30.0%/50.0% 提升到 70.0%/46.7%/63.3%，且推理时无需终端位姿编码器或重建头',
        ],
        description: 'LIT 不是一个新的未来视频生成器，而是针对 WAM 中“世界表示如何进入动作专家”这一耦合接口提出训练方案。终端 SE(3) 位姿是动作块执行后的未来状态摘要：第一阶段用它塑造可执行的流匹配动作先验，第二阶段再要求视觉—语义 latent 接口重建同一未来目标，并独占对动作专家的条件通路。因而它可归入 Joint WAM - Diffusion 的多流交叉注意力/预测潜表示路线。论文在仅训练时预测未来的 FAST-WAM 与推理时保留图像编辑的 ImageWAM 上都取得 OOD 增益，说明限制视觉条件接口比单纯增加视觉特征更能抑制场景捷径；不过方法只预测低维终端姿态而非完整未来观测，其 WAM 贡献主要在耦合与泛化训练。',
        href: 'https://arxiv.org/abs/2609.12641v1',
      },
    ],
    worthReading: [],
    observation: '本期覆盖周一窗口内上一个工作日的新论文。LIT 展示了一条区别于“生成更逼真未来”的 WAM 路线：先用动作块终点定义最小但可执行的未来摘要，再把视觉信息压缩到受该目标监督的潜接口中。它在 FAST-WAM 与 ImageWAM 上的共同增益表明，预测表征是否以受控方式耦合到动作专家，可能比测试时是否显式解码未来更关键。Hugging Face Daily Papers 收录了该论文；Awesome-WAM 最新 README 未新增同期论文，仅用于 taxonomy 核验。arXiv API 在代理与直连重试中均返回 429，因此 API 搜索覆盖降级；论文发布日期、摘要与实验数字已通过 arXiv v1 摘要页和全文交叉核验。',
  },
  en: {
    roleName: 'World Action Model Researcher',
    title: 'Spatial-Goal Latent Interfaces for Shortcut-Resistant WAM Generalization',
    description: 'Daily research digest for World Action Models and embodied intelligence',
    overview: [
      'LIT first learns a spatial-goal-conditioned action prior without images, then restores visual conditioning through a pose-supervised latent interface',
      'A terminal SE(3) pose aligns the future outcome of each action chunk with flow-matched action generation and is implicitly replaced by visual latent tokens at inference',
      'The same training strategy improves robustness to visual distribution shifts across FAST-WAM, ImageWAM, and two VLA families',
    ],
    papers: [
      {
        num: 1,
        tag: 'Joint WAM - Diffusion · Multi-Stream · Cross-Attention · Predictive-Latent',
        title: 'Breaking the Vision-Action Shortcut: Latent Interface Training for Generalizable Robotics Foundation Models',
        keyPoints: [
          'Stage 1 freezes the visual/world-model backbone and trains a flow-matching action expert without images, conditioned on language, robot state, and the terminal SE(3) pose of each demonstrated action chunk',
          'Stage 2 uses 100 learnable latent tokens that cross-attend layer-wise to visual and semantic representations and become the action expert’s only visual pathway; terminal-pose reconstruction forces the interface to retain action-relevant spatial information',
          'The interface applies to π0.5, MolmoAct2, FAST-WAM, and ImageWAM, improving overall LIBERO-Plus success by 10.70, 8.30, 9.19, and 3.87 points while preserving or improving average LIBERO success',
          'Across three real-robot tasks, aggregate success under lighting, camera, and distractor shifts rises from 53.3%/30.0%/50.0% to 70.0%/46.7%/63.3%; the pose encoder and reconstruction head are removed at inference',
        ],
        description: 'LIT is not a new future-video generator; it redesigns how world representations condition the action expert in WAM pipelines. The terminal SE(3) pose summarizes the future outcome of an action chunk: Stage 1 uses it to shape an executable flow-matching prior, while Stage 2 requires a visual-semantic latent interface to reconstruct that same future goal and makes the interface the exclusive conditioning path. This places the method in the multi-stream cross-attention and predictive-latent branch of Joint WAM - Diffusion. Gains on both FAST-WAM, which predicts futures only during training, and ImageWAM, which retains image-editing denoising at inference, suggest that controlling the world-to-action interface can matter more than simply enriching visual features. The method predicts a low-dimensional terminal pose rather than full future observations, so its main WAM contribution is coupling and generalization training.',
        href: 'https://arxiv.org/abs/2609.12641v1',
      },
    ],
    worthReading: [],
    observation: 'This Monday edition covers papers released since the previous workday. LIT presents a WAM direction distinct from generating more photorealistic futures: define a minimal but executable future summary at the end of each action chunk, then compress visual evidence through a latent interface supervised by that target. Its gains on both FAST-WAM and ImageWAM indicate that how predictive representations couple into an action expert may be more consequential than whether a full future is decoded at test time. Hugging Face Daily Papers featured the paper. The latest Awesome-WAM README added no paper from this window and served as a taxonomy reference. The arXiv API returned HTTP 429 after both proxied and direct retries, so API search coverage was degraded; publication date, abstract, and experimental values were cross-checked against the arXiv v1 abstract page and full paper.',
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
        'zh-CN': '/zh/daily/world-action-model/2026-09-14',
        en: '/en/daily/world-action-model/2026-09-14',
      },
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const c = content[locale]

  return (
    <DigestLayout locale={locale} date="2026-09-14" roleId="world-action-model" roleName={c.roleName} title={c.title} overview={c.overview}>
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
        {c.worthReading.map((item: { num: number; title: string; tag: string; href: string; description: string }) => (
          <NotableItem key={item.num} num={item.num} title={item.title} tag={item.tag} href={item.href}>{item.description}</NotableItem>
        ))}
      </WorthReading>
      <Observation><p>{c.observation}</p></Observation>
    </DigestLayout>
  )
}
