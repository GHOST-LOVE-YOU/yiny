import { DailyReport } from "@/types/paper";

export const dailyReport: DailyReport = {
  date: "2026-06-25",
  roleId: "music-to-dance",
  papers: {
    mustRead: [
      {
        arxivId: "2606.26058",
        title: "DomainShuttle: Freeform Open Domain Subject-driven Text-to-video Generation",
        titleZh: "DomainShuttle：自由开放域主体驱动视频生成",
        authors: ["Nan Chen", "Yiyang Cai", "Rongchang Xie", "Junwen Pan"],
        venue: "arXiv 2026",
        hasCode: true,
        abstract: "DomainShuttle 提出了一种新的主体驱动视频生成（S2V）框架，通过 Domain-MoT 模块解耦视频和参考图像特征，并引入 domain-aware AdaLN 实现域感知建模。Video-Reference DualRoPE 将参考图像 token 和视频 token 分配到独立的 RoPE 空间，实现精确的主体级空间建模。",
        analysis: "**直接迁移价值**：Domain-MoT 的解耦设计和 DualRoPE 的空间分离机制可直接应用于 music-to-dance 任务。当前方案中参考人物外观与舞蹈动作的耦合问题可以通过这种域感知建模得到改善——参考图像的外观特征只影响人物身份属性（发型、肤色、服装），而舞蹈动作、背景、光照等域属性可根据音乐灵活变化。Cross-Pair Consistent Loss 的思想也可用于提取人物内在特征，减少外观漂移。",
        arxivUrl: "https://arxiv.org/abs/2606.26058"
      },
      {
        arxivId: "2606.26087",
        title: "MVTrack4Gen: Multi-View Point Tracking as Geometric Supervision for 4D Video Generation",
        titleZh: "MVTrack4Gen：多视角点跟踪作为4D视频生成的几何监督",
        authors: ["JoungBin Lee", "Jaewoo Jung", "Jongmin Lee", "Tongmin Kim"],
        venue: "arXiv 2026",
        hasCode: false,
        abstract: "MVTrack4Gen 通过多视角点跟踪作为几何和运动监督信号，增强仅依赖相机条件的新视角视频扩散模型。研究发现特定注意力层编码了强对应关系线索，通过将这些特征路由到辅助多视角跟踪头并与点跟踪目标联合训练，显式增强运动感知对应关系。",
        analysis: "**技术启发**：论文发现 3D 注意力层中 query-key 匹配提供了清晰的时序和跨视角对应关系线索，这一观察对改善舞蹈视频的时间一致性很有价值。当前 music-to-dance 方案中跨帧人物外观漂移问题，可以通过类似的多视角（或多帧）点跟踪监督来缓解。将跟踪头集成到扩散模型的中间层，可能提升生成视频中人物运动的连贯性和几何一致性。",
        arxivUrl: "https://arxiv.org/abs/2606.26087"
      },
      {
        arxivId: "2606.26778",
        title: "LearniBridge: Learnable Calibration of Feature Caching for Diffusion Models Acceleration",
        titleZh: "LearniBridge：扩散模型特征缓存的可学习校准加速",
        authors: ["Xuyue Huang", "Zhe Chen", "Wang Shen", "Xiao-Ping Zhang"],
        venue: "ICML 2026",
        hasCode: true,
        abstract: "LearniBridge 提出了一种可学习的特征缓存校准机制，通过轻量级 LoRA 更新桥接多个时间步。研究发现最优校准更新位于跨提示共享的低秩子空间中，仅需 3-5 个训练样本即可有效校准。在 FLUX、HunyuanVideo 和 WAN 2.1 上分别实现 5.87×、5.75× 和 4.10× 加速。",
        analysis: "**实用价值**：对于基于 DiT 的舞蹈生成模型，推理延迟是实际部署的关键瓶颈。LearniBridge 的 LoRA 校准机制可以在保持生成质量的同时显著加速推理——WAN 2.1 上 4.10× 加速且 VBench 提升 1.28%。更重要的是仅需 3-5 个样本即可训练，意味着可以快速适配到特定的舞蹈生成模型而无需大量数据。",
        arxivUrl: "http://arxiv.org/abs/2606.26778v1"
      },
      {
        arxivId: "2606.26092",
        title: "TryOnCrafter: Unleashing Camera Trajectories for Realistic Video Virtual Try-on via a Renderable 4D Try-on Proxy",
        titleZh: "TryOnCrafter：通过可渲染4D试衣代理释放相机轨迹",
        authors: ["Hao Sun", "Hao Yan", "Mengting Chen", "Quanjian Song"],
        venue: "arXiv 2026",
        hasCode: false,
        abstract: "TryOnCrafter 提出 Camera-controllable Video Virtual Try-on (CaM-VVT) 任务，通过 Renderable 4D Try-on Proxy 显式解耦人物与环境。将高质量 2D 试衣先验蒸馏到基于 3DGS 的虚拟形象，通过 SMPL-X 序列动画化并度量对齐到重建的背景点云。",
        analysis: "**方法论借鉴**：TryOnCrafter 的 4D Proxy 构建流程对舞蹈生成有重要参考价值。其通过 SMPL-X 序列解耦人物动作与相机轨迹、使用 3DGS 保持高保真纹理、度量对齐确保几何一致性的方法，可直接迁移到 music-to-dance 任务。特别是 anchor-based alignment 解决单目重建尺度歧义的思路，有助于改善当前方案中人物与背景的空间关系建模。",
        arxivUrl: "https://arxiv.org/abs/2606.26092"
      }
    ],
    worthReading: [
      {
        arxivId: "2606.25473",
        title: "Causal-rCM: Unified Teacher-Forcing and Self-Forcing for Autoregressive Diffusion Distillation",
        titleZh: "Causal-rCM：自回归扩散蒸馏的统一教师强制与自强制",
        authors: ["Kaiwen Zheng", "Guande He", "Min Zhao", "Jintao Zhang"],
        venue: "arXiv 2026",
        hasCode: true,
        abstract: "将 rCM 扩散蒸馏框架扩展到自回归视频扩散，通过教师强制（TF）和自强制（SF）的互补性实现高效蒸馏。蒸馏后的 2 步因果 Wan2.1-1.3B 模型在 VBench-T2V 上达到 84.63 分。",
        relevance: "扩散蒸馏技术可加速舞蹈视频生成，2步采样即可达到高质量输出"
      },
      {
        arxivId: "2606.26795",
        title: "NaviCache: Test-Time Self-Calibration Caching for Video Generation",
        titleZh: "NaviCache：视频生成的测试时自校准缓存",
        authors: ["Zheqi Lv", "Zhibo Zhu", "Jinke Wang", "Qi Tian"],
        venue: "ICML 2026",
        hasCode: false,
        abstract: "将特征演化重新概念化为惯性导航系统（INS）问题，通过双状态估计架构自适应跟踪特征变化率和潜在漂移，实现误差有界的计算跳过。",
        relevance: "测试时自校准缓存机制可优化视频扩散模型推理效率，适用于实时舞蹈生成"
      },
      {
        arxivId: "2606.25713",
        title: "Frequency-Aware Self-Supervised Music Representation Learning",
        titleZh: "频率感知自监督音乐表示学习",
        authors: ["Yicheng Gu", "Junan Zhang", "Jerry Li", "Zhizheng Wu"],
        venue: "arXiv 2026",
        hasCode: true,
        abstract: "PupuJEPA 直接在 2D 频谱图上训练视觉联合嵌入预测架构，通过预测被掩码的 2D 频谱图块的潜在嵌入来学习鲁棒表示，在 MARBLE 基准上优于 1D 序列模型。",
        relevance: "2D 频谱图表示学习方法可为音乐特征提取提供新思路，改善音频-舞蹈对齐"
      },
      {
        arxivId: "2606.26981",
        title: "In-Context Model Predictive Generation: Open-Vocabulary Motion Synthesis",
        titleZh: "上下文模型预测生成：开放词汇运动合成",
        authors: ["Xiaomeng Fu", "Junfan Lin", "Yang Liu", "Yaowei Wang"],
        venue: "arXiv 2026",
        hasCode: false,
        abstract: "ICMPG 将运动合成重新表述为类似模型预测控制（MPC）的过程，通过物理模拟和语义对齐评估候选运动序列，选择最佳序列指导后续生成，无需特定任务策略重训练。",
        relevance: "物理约束运动合成方法可为舞蹈动作生成提供物理合理性保障"
      },
      {
        arxivId: "2606.25041",
        title: "Wan-Streamer v0.1: End-to-end Real-time Interactive Foundation Models",
        titleZh: "Wan-Streamer：端到端实时交互基础模型",
        authors: ["Lianghua Huang", "Zhifan Wu", "Wei Wang", "Yupeng Shi"],
        venue: "arXiv 2026",
        hasCode: false,
        abstract: "原生流式端到端交互基础模型，在单一 Transformer 中无缝建模语言、音频和视频作为输入和输出，通过块因果注意力实现增量流式处理，模型端响应延迟约 200ms。",
        relevance: "端到端实时音视频交互架构可为音乐驱动舞蹈生成提供低延迟技术参考"
      },
      {
        arxivId: "2606.26904",
        title: "Confidence-Aware Tool Orchestration for Robust Video Understanding",
        titleZh: "置信度感知工具编排实现鲁棒视频理解",
        authors: ["Yangfan He", "Yujin Choi", "Jaehong Yoon"],
        venue: "arXiv 2026",
        hasCode: false,
        abstract: "Robust-TO 通过可靠性-相关性分数选择可信帧，将每帧可信度显式集成到推理的每个阶段，在五种真实损坏类型下保持 54.3% 平均准确率。",
        relevance: "帧级可信度评估机制可用于提升舞蹈视频生成中关键帧的质量和一致性"
      },
      {
        arxivId: "2606.26556",
        title: "WQ-Fusion: Dynamic Gated Attention for Cross-Domain Audio Representation",
        titleZh: "WQ-Fusion：跨域音频表示的动态门控注意力",
        authors: ["Mingda Lin", "Lei Ding", "Xinyue Zhou", "Tiantian Xiong"],
        venue: "Interspeech 2026",
        hasCode: false,
        abstract: "通过自适应特征调制模块和元素级门控注意力机制融合 Whisper 和 Qwen，实现动态特征选择，在 Interspeech 2026 音频编码器能力挑战中取得 0.836 总分。",
        relevance: "门控注意力音频融合方法可用于改进音乐特征提取，增强跨风格泛化"
      },
      {
        arxivId: "2606.25592",
        title: "VPA-Guard: Defending Image-to-Video Generation Against Visual Prompt Attacks",
        titleZh: "VPA-Guard：防御图像到视频生成的视觉提示攻击",
        authors: ["Yining Sun", "Haoyu Kang", "Jiajun Wu", "Heng Zhang"],
        venue: "arXiv 2026",
        hasCode: false,
        abstract: "首个系统性评估视觉中心提示攻击下视频生成安全性的基准 VVA-Bench，提出 VPA-Guard 防御框架，通过少样本推理识别潜在恶意意图，平均降低攻击成功率 44.2%。",
        relevance: "I2V 安全防御方法对参考图像驱动的舞蹈生成有鲁棒性参考价值"
      }
    ]
  },
  summary: "今日筛选出 4 篇重点关注论文，均与 music-to-dance 任务有直接技术关联。DomainShuttle 的域感知解耦和 DualRoPE 机制可用于改善人物外观与动作的分离；MVTrack4Gen 的多视角点跟踪监督可增强时间一致性；LearniBridge 的 LoRA 校准加速对实时推理至关重要；TryOnCrafter 的 4D Proxy 构建流程为人物建模提供了显式几何约束方案。"
};
