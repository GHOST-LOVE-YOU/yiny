import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from '@/components/digest'

export default function Page() {
  return (
    <DigestLayout
      date="2000-01-01"
      roleId="music-to-dance"
      roleName="Music-to-Dance 视频生成研究者"
      title="扩散模型遇上舞蹈生成"
      overview={[
        "第一条概览要点，用一句话概括最重要的发现",
        "第二条概览要点",
        "第三条概览要点",
      ]}
    >
      <MustRead>
        <Paper num={1} tag="视频生成" title="虚构论文：基于扩散模型的音乐驱动舞蹈视频生成">
          <p>分析段落，描述这篇论文的核心贡献和对当前任务的启发...</p>
          <KeyPoints points={[
            "要点一：核心技术贡献",
            "要点二：与现有方案的对比",
            "要点三：对 music-to-dance 任务的迁移价值",
          ]} />
          <PaperLink href="https://arxiv.org/abs/0000.00001" title="Fictional Dance Generation with Diffusion Models" />
        </Paper>

        <Paper num={2} tag="运动生成" title="虚构论文：跨模态运动表示学习">
          <p>分析段落...</p>
          <KeyPoints points={["要点一", "要点二"]} />
          <PaperLink href="https://arxiv.org/abs/0000.00002" title="Cross-Modal Motion Representation Learning" />
        </Paper>

        <Paper num={3} tag="推理加速" title="虚构论文：扩散模型一致性蒸馏新方案">
          <p>分析段落...</p>
          <KeyPoints points={["要点一", "要点二", "要点三"]} />
          <PaperLink href="https://arxiv.org/abs/0000.00003" title="Consistency Distillation for Video Diffusion" />
        </Paper>
      </MustRead>

      <WorthReading>
        <NotableItem num={4} title="虚构：参考图像身份保持的新方法" tag="图像生成" href="https://arxiv.org/abs/0000.00004">
          一句话描述该论文的核心贡献及其对当前任务的参考价值。
        </NotableItem>
        <NotableItem num={5} title="虚构：音频特征与视觉节拍对齐" tag="多模态" href="https://arxiv.org/abs/0000.00005">
          一句话描述。
        </NotableItem>
        <NotableItem num={6} title="虚构：人体姿态估计的无监督方案" tag="计算机视觉" href="https://arxiv.org/abs/0000.00006">
          一句话描述。
        </NotableItem>
        <NotableItem num={7} title="虚构：视频时序一致性约束" tag="视频生成" href="https://arxiv.org/abs/0000.00007">
          一句话描述。
        </NotableItem>
        <NotableItem num={8} title="虚构：MoE 在生成模型中的应用" tag="模型架构" href="https://arxiv.org/abs/0000.00008">
          一句话描述。
        </NotableItem>
      </WorthReading>

      <Observation>
        <p>今日观察段落，跨论文找规律，写出对当前研究方向有启发的共性洞察...</p>
      </Observation>
    </DigestLayout>
  )
}
