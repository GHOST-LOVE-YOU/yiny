import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, Observation,
} from '@/components/digest'
import { type Locale, locales } from '@/lib/i18n'
import type { Metadata } from 'next'

const content = {
  zh: {
    roleName: 'Music-to-Dance 视频生成研究者',
    title: '显式关节世界状态驱动的长时程角色生成',
    description: 'Music-to-Dance 视频生成相关论文速递',
    overview: [
      'Marionette 将多角色关节骨架、根轨迹与旋转显式建模为 276 维 3D 世界状态',
      '零参数图形桥负责几何与遮挡计算，视频扩散模型专注于外观合成',
      '状态空间中的碰撞与间距规则可直接修复长时程漂移，无需改动观察模型',
    ],
    papers: [
      {
        num: 1,
        tag: '关节世界模型 · 姿态控制视频 · 8月14日',
        title: 'Marionette: Predicting World States, Rendering Geometry, Painting Appearance',
        keyPoints: [
          '用两阶段自回归动力学模型预测可解释的 276 维 3D 世界状态，包含多实体关节骨架、度量根轨迹和旋转',
          '通过零参数图形桥将状态转换为姿态控制视频，以闭式计算处理世界坐标几何和遮挡，再由条件视频扩散模型生成 RGB 画面',
          '在 48 个留出片段中，强制不匹配的动作流使根对齐关节误差变化 31%，验证显式状态具有直接可控性',
          '地形碰撞器和角色间距上限使穿地现象减少 66%，且无需修改观察模型；通过显式状态生成的 FVD 为 831，录制姿态条件基线为 799',
        ],
        description: 'Marionette 对 Music-to-Dance 的核心启示，是把动作结构从视频生成器的隐变量中分离出来。音乐条件可先驱动骨架、根轨迹和旋转的时序预测，节拍落点、双人距离、足底接触等约束则在可解释状态层检查和修复，最后再交给视频扩散模型渲染人物外观。论文目前面向交互式游戏角色，并未直接评估音乐-动作对齐，因此它更像一条可迁移的系统架构，而不是现成的舞蹈生成方案；但其状态级长时程修复能力对双人舞和长段落编舞尤其值得关注。',
        href: 'https://arxiv.org/abs/2608.14530',
      },
    ],
    observation: '本期按周一规则覆盖上一个工作日以来的新论文。Hugging Face Daily Papers 在该窗口内收录 3 篇，人工筛选后仅 Marionette 与人体动作和姿态控制视频生成直接相关，其余两篇通用多模态基础模型不纳入；arXiv API 经代理重试仍返回 429，无代理请求也超时，因此本期 arXiv 全量覆盖降级。值得持续跟踪的方向是“先生成可验证动作状态，再渲染外观”：它让节拍同步、接触、角色间距和物理约束从难以解释的像素误差转化为可编辑的运动变量。不过 Marionette 尚未报告音乐条件、舞蹈数据或节拍指标，后续需要验证这种分层架构是否能保持音乐语义与动作风格的一致性。',
  },
  en: {
    roleName: 'Music-to-Dance Video Generation Researcher',
    title: 'Long-Horizon Character Generation with Explicit Articulated World States',
    description: 'Daily research digest for Music-to-Dance video generation',
    overview: [
      'Marionette explicitly represents multi-character skeletons, root trajectories, and rotations in a 276-dimensional 3D world state',
      'A zero-parameter graphics bridge handles geometry and occlusion while video diffusion focuses on appearance synthesis',
      'Collision and separation rules repair long-horizon drift directly in state space without changing the observation model',
    ],
    papers: [
      {
        num: 1,
        tag: 'Articulated World Model · Pose-Controlled Video · Aug 14',
        title: 'Marionette: Predicting World States, Rendering Geometry, Painting Appearance',
        keyPoints: [
          'Uses a two-stage autoregressive dynamics model to predict an interpretable 276-dimensional 3D state containing multi-entity articulated skeletons, metric root trajectories, and rotations',
          'Converts state into pose-control videos through a zero-parameter graphics bridge that computes world-space geometry and occlusion in closed form, then synthesizes RGB observations with conditional video diffusion',
          'Changing to a mismatched action stream alters root-aligned joint error by 31% across 48 held-out segments, demonstrating direct control through the predicted state',
          'A terrain collider and separation cap reduce ground penetration by 66% without changing the observation model; state-routed rendering scores 831 FVD versus 799 with recorded poses',
        ],
        description: 'Marionette suggests separating motion structure from the video generator latent space. A music-to-dance system could first predict skeletons, root trajectories, and rotations from music, validate beat accents, inter-person distance, and foot contact in an interpretable state layer, and only then render appearance with video diffusion. The paper targets interactive game characters and does not evaluate music-motion alignment, so this is a transferable systems architecture rather than a ready-made dance model. Its ability to repair long-horizon behavior at the state level is nevertheless particularly relevant to duet generation and extended choreography.',
        href: 'https://arxiv.org/abs/2608.14530',
      },
    ],
    observation: 'Following the Monday policy, this issue covers papers released since the previous business day. Hugging Face Daily Papers listed three papers in that window; manual review retained only Marionette as directly relevant to human motion and pose-controlled video generation, while two general multimodal foundation-model papers were excluded. The arXiv API continued to return HTTP 429 after a proxied retry, and a direct request timed out, so arXiv-wide coverage is degraded. The important direction is to generate a verifiable motion state before rendering appearance: beat synchronization, contact, character spacing, and physical constraints become editable variables instead of opaque pixel errors. Marionette does not yet report music conditioning, dance datasets, or beat metrics, so future work must test whether this layered architecture preserves musical semantics and motion style.',
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
        'zh-CN': '/zh/daily/music-to-dance/2026-08-17',
        en: '/en/daily/music-to-dance/2026-08-17',
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

      <WorthReading>{null}</WorthReading>

      <Observation>
        <p>{c.observation}</p>
      </Observation>
    </DigestLayout>
  )
}
