import {
  DigestLayout, MustRead, Paper, KeyPoints, PaperLink,
  WorthReading, NotableItem, Observation
} from "@/components/digest";
import type { Locale } from "@/lib/i18n";

export const metadata = {
  title: "Daily Paper Digest — 2026-07-29",
  description: "Music-to-Dance 视频生成相关论文速递",
};

export default async function DigestPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;

  return (
    <DigestLayout
      locale={locale}
      date="2026-07-29"
      roleId="music-to-dance"
      roleName="Music-to-Dance 视频生成"
      title="扩散模型蒸馏加速与视觉条件表示优化"
      overview={[
        "PDM解决CFG蒸馏中的NBA问题，提升推理稳定性",
        "PDD实现4-8步快速视频生成，保持多样性",
        "Wonder的稀疏记忆机制解决长序列一致性",
        "VIPE通过视觉提示工程提升生成质量",
        "Mage-VL的codec-native编码减少75%token消耗"
      ]}
    >
      <MustRead>
        <Paper
          num={1}
          tag="CFG蒸馏 · 阿里巴巴"
          title="Rethinking Classifier-Free Guidance in On-Policy Diffusion Distillation"
        >
          <KeyPoints points={[
            "发现传统CFG-based OPD的Negative Branch Asymmetry (NBA)问题：正负分支误差在组合预测中相互抵消，导致训练时隐藏的误差在推理时暴露",
            "提出Positive-Direction Matching (PDM)：分别约束正分支预测和CFG条件方向，消除误差补偿自由度",
            "在dense-to-sparse视频控制任务上验证：PDM对推理guidance scale变化具有鲁棒性，而naive matching在γ偏离训练值时性能急剧下降"
          ]} />

          <p className="text-[#2C2C24] leading-relaxed">
            这篇论文直击扩散模型蒸馏中的核心问题。当前music-to-dance方案依赖CFG进行条件控制，
            但如果在蒸馏学生模型时采用传统的guided velocity matching，会引入NBA问题——正负分支的误差在训练时相互抵消，
            导致推理时guidance scale稍有变化就产生明显质量下降。PDM通过分离约束正分支预测和条件方向，
            从根本上消除了这种误差补偿机制。对于需要实时推理的舞蹈生成任务，这意味着可以在更宽的guidance scale范围内保持稳定的生成质量，
            而不必担心蒸馏后的模型对超参数过于敏感。
          </p>

          <PaperLink
            href="https://arxiv.org/abs/2607.24731"
            title="Rethinking Classifier-Free Guidance in On-Policy Diffusion Distillation"
          />
        </Paper>

        <Paper
          num={2}
          tag="并行解码蒸馏 · NVIDIA"
          title="Parallel Decoding Distillation for Fast Image and Video Generation"
        >
          <KeyPoints points={[
            "提出Parallel Decoding Distillation (PDD)：单次网络前向预测多个去噪步骤的平均速度，实现4-8 NFE的SOTA视频生成",
            "避免VSD和对抗损失，使用纯回归目标，训练更稳定且保持生成多样性",
            "在Wan2.1 14B上4 NFE达到SOTA，在LTX-2.3上8 NFE生成10秒720p视频，显著优于DMD2和AnyFlow"
          ]} />

          <p className="text-[#2C2C24] leading-relaxed">
            PDD为实时舞蹈视频生成提供了可行的加速路径。当前方案使用DDIM采样需要多步迭代，
            而PDD通过并行解码将NFE降至4-8步，同时保持甚至提升视频质量。关键创新在于预测块内多步的平均速度而非单步速度，
            这避免了传统方法中的模式坍塌问题。对于music-to-dance任务，PDD可直接替换现有的DDIM采样器，
            在保持音频-运动对齐质量的同时将推理速度提升数倍，是实现实时生成的关键技术。
          </p>

          <PaperLink
            href="https://arxiv.org/abs/2607.26004"
            title="Parallel Decoding Distillation for Fast Image and Video Generation"
          />
        </Paper>

        <Paper
          num={3}
          tag="视频世界模型 · Adobe Research"
          title="Wonder: Video World Model Done Better"
        >
          <KeyPoints points={[
            "提出像素空间坐标场相机条件表示：通过渲染合成3D场景将相机运动转换为像素对齐的视觉线索",
            "稀疏全保真记忆机制：使用轻量级池化查询-键摘要选择相关历史块，保持长程一致性同时控制延迟",
            "实现16 FPS实时生成长达数分钟的视频，支持图像和视频条件两种探索模式"
          ]} />

          <p className="text-[#2C2C24] leading-relaxed">
            Wonder的系统设计对舞蹈视频生成有重要借鉴意义。其像素空间坐标场表示将相机控制转化为视觉证据而非抽象几何，
            这种思路可迁移到音频条件控制——将音频节拍和运动提示转换为视觉线索而非直接注入特征。稀疏记忆机制解决了长视频生成的关键瓶颈：
            通过选择性地关注历史KV缓存中的相关块，在保持长程时间一致性的同时避免注意力成本随序列长度增长。
            对于需要生成数十秒舞蹈视频的任务，这种机制可有效解决动作漂移和身份不一致问题。
          </p>

          <PaperLink
            href="https://arxiv.org/abs/2607.26037"
            title="Wonder: Video World Model Done Better"
          />
        </Paper>

        <Paper
          num={4}
          tag="视觉提示工程 · Google DeepMind"
          title="Visual prompt engineering for video models"
        >
          <KeyPoints points={[
            "提出Visual Prompt Engineering (VIPE)：通过图像编辑模型自动修改输入视觉提示以提升视频模型推理性能",
            "发现视频模型系统性地偏好照片级真实感输入而非抽象输入，sketch基准可能低估模型能力",
            "在VPCT物理推理任务上，VIPE使Wan2.2从接近随机提升到显著优于随机，Veo 3.1从41.3%提升到59.3%"
          ]} />

          <p className="text-[#2C2C24] leading-relaxed">
            VIPE的发现对参考人物图的外观迁移有重要启发。当前方案直接使用参考图作为条件，
            但如果参考图质量不佳或与训练分布有差异，生成效果会明显下降。VIPE表明，通过图像编辑模型预处理参考图
            （如增强光照、统一风格、去除噪声），可以显著提升视频生成质量。对于music-to-dance任务，
            可在预处理阶段对输入人物图进行风格统一化和质量增强，使参考图外观迁移更加稳定和高质量。
          </p>

          <PaperLink
            href="https://arxiv.org/abs/2607.25537"
            title="Visual prompt engineering for video models"
          />
        </Paper>

        <Paper
          num={5}
          tag="Codec-Native VLM · Microsoft"
          title="Mage-VL: An Efficient Codec-Native Streaming Multimodal Foundation Model"
        >
          <KeyPoints points={[
            "提出Mage-ViT tokenizer：利用运动向量和残差能量选择性编码动态区域，减少75%视觉token消耗",
            "基于I-frame和P-frame的稀疏编码策略，在16×16 patch级别保留时空上下文",
            "在560M图像和100M视频帧上从头训练，性能匹敌数十亿图像-文本对训练的编码器"
          ]} />

          <p className="text-[#2C2C24] leading-relaxed">
            Mage-VL的codec-native编码策略为音频-视频联合建模提供了效率优化方向。当前music-to-dance方案
            需要处理长序列音频和视频帧，计算成本高昂。Mage-ViT通过运动向量选择动态区域进行编码，
            将token数量减少75%同时保留关键信息。这种策略可借鉴用于音频-运动对齐：
            在音频节拍变化显著或运动幅度较大的时刻密集采样，在静态或重复动作时段稀疏采样，
            从而在降低计算成本的同时保持时序对齐精度。
          </p>

          <PaperLink
            href="https://arxiv.org/abs/2607.24904"
            title="Mage-VL: An Efficient Codec-Native Streaming Multimodal Foundation Model"
          />
        </Paper>
      </MustRead>

      <WorthReading>
        <NotableItem
          num={1}
          title="Dual Inversion for Text-to-Image Diffusion Models"
          tag="图像反演 · ACM MM"
          href="https://arxiv.org/abs/2607.26735"
        >
          联合恢复语义提示和潜在噪声的两阶段反演方法，可用于参考人物图的精确反演以提升外观迁移一致性
        </NotableItem>

        <NotableItem
          num={2}
          title="ThinkOmni: A Reasoning-Driven Omni-Modal LLM Framework for Audio Forgery Detection"
          tag="音频-视觉推理 · ACM MM"
          href="https://arxiv.org/abs/2607.26553"
        >
          音频-视觉联合推理框架，其时序定位机制对音频驱动的舞蹈生成有启发
        </NotableItem>

        <NotableItem
          num={3}
          title="StructureGS: Structure-aware Gaussian Splatting for Articulated Object Reconstruction"
          tag="关节物体重建 · ECCV"
          href="https://arxiv.org/abs/2607.26889"
        >
          关节物体重建的3D Gaussian Splatting方法，可借鉴用于人体姿态和运动的结构化建模
        </NotableItem>

        <NotableItem
          num={4}
          title="Explicit Layer Modeling for Video Object Insertion and Layer Decomposition"
          tag="显式层建模"
          href="https://arxiv.org/abs/2607.25802"
        >
          显式层建模的扩散框架，可用于舞蹈视频的人物-背景分离和合成
        </NotableItem>

        <NotableItem
          num={5}
          title="OmniDelta: Skill-Driven Budget Allocation for Token Compression in OmniLLMs"
          tag="Token压缩"
          href="https://arxiv.org/abs/2607.25669"
        >
          跨模态token预算分配策略，对音频-视频联合建模的推理优化有参考价值
        </NotableItem>

        <NotableItem
          num={6}
          title="Temporal-Distance JEPA: Plan-Aware Representation Learning"
          tag="时序表示学习"
          href="https://arxiv.org/abs/2607.25337"
        >
          时间距离学习的JEPA方法，可用于舞蹈动作的长期时序一致性建模
        </NotableItem>

        <NotableItem
          num={7}
          title="OmniScope: Modality-Decoupled Token Compression for Omnimodal LLMs"
          tag="解耦压缩"
          href="https://arxiv.org/abs/2607.23193"
        >
          音频-视频解耦压缩策略，对music-to-dance的长序列推理优化有借鉴意义
        </NotableItem>

        <NotableItem
          num={8}
          title="Mitigating Compounding Error via Video Representation Regularization"
          tag="误差累积缓解"
          href="https://arxiv.org/abs/2607.27036"
        >
          视频表示正则化方法可缓解舞蹈视频长序列生成的误差累积问题
        </NotableItem>
      </WorthReading>

      <Observation>
        <p>
          今日论文呈现出两个值得关注的趋势。首先是<strong>扩散模型蒸馏加速</strong>的系统性进展：
          PDD和PDM分别从并行解码和分支感知监督两个角度解决了实时生成的关键瓶颈，
          两者结合可能实现4-8步的高质量视频生成。其次是<strong>视觉条件表示</strong>的重新思考：
          Wonder的像素空间坐标场和VIPE的视觉提示工程都表明，将控制信号转化为视觉证据而非抽象特征，
          可以显著提升生成质量和可控性。对于music-to-dance任务，这意味着音频条件不应仅作为特征注入，
          而应考虑如何将其转化为模型可直接感知的视觉运动线索。
        </p>
      </Observation>
    </DigestLayout>
  );
}
