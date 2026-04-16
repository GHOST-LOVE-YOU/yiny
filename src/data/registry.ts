import type { Locale } from '@/lib/i18n'

export interface DigestMeta {
  roleId: string
  roleName: { zh: string; en: string }   // 双语
  date: string
  title: { zh: string; en: string }       // 双语
  mustReadCount: number
  worthReadingCount: number
}

export const registry: DigestMeta[] = [
  {
    roleId: "music-to-dance",
    roleName: {
      zh: "Music-to-Dance 视频生成研究者",
      en: "Music-to-Dance Video Generation",
    },
    date: "2000-01-01",
    title: {
      zh: "扩散模型遇上舞蹈生成",
      en: "Diffusion Models Meet Dance Generation",
    },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-02-28",
    title: { zh: "因果扩散与音频-运动对齐的新进展", en: "Advances in Causal Diffusion and Audio-Motion Alignment" },
    mustReadCount: 3,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: {
      zh: "Music-to-Dance 视频生成研究者",
      en: "Music-to-Dance Video Generation",
    },
    date: "2026-03-01",
    title: {
      zh: "因果扩散与时序泛化：长舞蹈视频生成的新路径",
      en: "Causal Diffusion & Length Generalization: New Paths for Long Dance Video Generation",
    },
    mustReadCount: 4,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-02",
    title: { zh: "空间理解与高效视觉建模：图像生成与视频理解的新进展", en: "Spatial Understanding & Efficient Visual Modeling: New Advances in Image Generation and Video Understanding" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-03",
    title: { zh: "矢量动画生成与自适应推理：图像编辑与生成的新进展", en: "Vector Animation & Adaptive Inference: New Advances in Image Editing and Generation" },
    mustReadCount: 3,
    worthReadingCount: 3,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-04",
    title: { zh: "视频编辑与扩散控制：无配对学习与稳定引导的新进展", en: "Video Editing & Diffusion Control: Advances in Pair-Free Learning and Stable Guidance" },
    mustReadCount: 2,
    worthReadingCount: 3,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-05",
    title: { zh: "4D重建与实时生成：人体运动合成的新前沿", en: "4D Reconstruction and Real-Time Generation: New Frontiers in Human Motion Synthesis" },
    mustReadCount: 5,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-06",
    title: { zh: "世界建模与细节保持：视频生成的新突破", en: "World Modeling and Detail Preservation: New Breakthroughs in Video Generation" },
    mustReadCount: 5,
    worthReadingCount: 6,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-07",
    title: { zh: "世界建模与物理动作生成：视频生成的深度理解新路径", en: "World Modeling & Physical Action Generation: New Paths for Deep Video Understanding" },
    mustReadCount: 2,
    worthReadingCount: 3,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-08",
    title: { zh: "世界模型与实时生成：视频一致性与效率的新进展", en: "World Models & Real-Time Generation: New Advances in Video Consistency and Efficiency" },
    mustReadCount: 3,
    worthReadingCount: 3,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-09",
    title: { zh: "物理一致性视频生成与身份保持技术的新进展", en: "Advances in Physics-Consistent Video Generation and Identity Preservation" },
    mustReadCount: 3,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-10",
    title: { zh: "多主体视频定制与流式视觉智能：身份保持、自适应Token化与实时处理", en: "Multi-Subject Video Customization & Streaming Visual Intelligence: Identity Preservation, Adaptive Tokenization & Real-Time Processing" },
    mustReadCount: 5,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-11",
    title: { zh: "长视频生成与运动建模：层级去噪、稀疏注意力与关节级潜在空间", en: "Long Video Generation & Motion Modeling: Hierarchical Denoising, Sparse Attention & Per-Joint Latent Space" },
    mustReadCount: 4,
    worthReadingCount: 6,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-12",
    title: { zh: "实时音视频生成与长序列建模：流式扩散与空间加速的新突破", en: "Real-Time Audio-Visual Generation & Long-Sequence Modeling: Breakthroughs in Streaming Diffusion and Spatial Acceleration" },
    mustReadCount: 5,
    worthReadingCount: 6,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-13",
    title: { zh: "视频生成控制与效率优化新进展", en: "Advances in Video Generation Control and Efficiency" },
    mustReadCount: 5,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-14",
    title: { zh: "多主体运动控制与自适应视频表征：舞蹈生成的新工具箱", en: "Multi-Subject Motion Control & Adaptive Video Representation: New Tools for Dance Generation" },
    mustReadCount: 3,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-15",
    title: { zh: "多主体运动控制与实时音视频生成新进展", en: "Advances in Multi-Subject Motion Control and Real-time Audio-Visual Generation" },
    mustReadCount: 3,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-16",
    title: { zh: "身份保持与运动控制的统一框架 · 自适应视频Token化", en: "Unified Identity Preservation & Motion Control · Adaptive Video Tokenization" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-17",
    title: { zh: "统一控制与几何感知：视频扩散模型的新进展", en: "Unified Control and Geometry Awareness: New Advances in Video Diffusion Models" },
    mustReadCount: 4,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-19",
    title: { zh: "视频推理机制与音频-视觉对齐新进展", en: "Video Reasoning Mechanisms & Audio-Visual Alignment Advances" },
    mustReadCount: 5,
    worthReadingCount: 7,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-21",
    title: { zh: "运动建模与3D感知定制新进展", en: "Advances in Motion Modeling and 3D-Aware Customization" },
    mustReadCount: 4,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-22",
    title: { zh: "运动对齐与3D一致性：视频编辑与人物定制的新范式", en: "Motion Alignment & 3D Consistency: New Paradigms for Video Editing and Subject Customization" },
    mustReadCount: 4,
    worthReadingCount: 3,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-23",
    title: { zh: "视频编辑的语义-运动解耦与身份保持新范式", en: "Semantic-Motion Decoupling and Identity Preservation in Video Editing" },
    mustReadCount: 3,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-24",
    title: { zh: "单流架构与流形感知：音视频生成的新范式", en: "Single-Stream Architecture & Manifold Awareness: New Paradigms for Audio-Video Generation" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-25",
    title: { zh: "音频-视觉同步生成新范式：单流架构与物理感知运动建模", en: "Audio-Visual Sync Generation: Single-Stream Architecture & Physics-Aware Motion Modeling" },
    mustReadCount: 5,
    worthReadingCount: 8,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-26",
    title: { zh: "长视频生成与身份保持：舞蹈生成的关键技术突破", en: "Long Video Generation & Identity Preservation: Key Breakthroughs for Dance Generation" },
    mustReadCount: 5,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-27",
    title: { zh: "长视频生成与音频-视觉对齐：自回归架构与记忆机制的新进展", en: "Long Video Generation & Audio-Visual Alignment: Advances in Autoregressive Architectures and Memory Mechanisms" },
    mustReadCount: 5,
    worthReadingCount: 8,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-28",
    title: { zh: "流式多镜头生成与音频-视觉控制新进展", en: "Streaming Multi-Shot Generation & Audio-Visual Control Advances" },
    mustReadCount: 5,
    worthReadingCount: 7,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-29",
    title: { zh: "长视频生成与音频-视觉控制：流式架构与记忆机制的新突破", en: "Long Video Generation & Audio-Visual Control: Breakthroughs in Streaming Architecture and Memory Mechanisms" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-03-31",
    title: { zh: "视频生成控制、运动适应与多模态对齐的最新进展", en: "Advances in Video Generation Control, Motion Adaptation, and Multimodal Alignment" },
    mustReadCount: 5,
    worthReadingCount: 6,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-03",
    title: { zh: "动作绑定、动态运动生成与连续编辑控制", en: "Action Binding, Dynamic Motion Generation & Continuous Editing Control" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-04",
    title: { zh: "多主体动作绑定与动态视频生成新进展", en: "Multi-Subject Action Binding & Dynamic Video Generation Advances" },
    mustReadCount: 3,
    worthReadingCount: 6,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-05",
    title: { zh: "动态视频生成与多主体控制的技术突破", en: "Breakthroughs in Dynamic Video Generation and Multi-Subject Control" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-06",
    title: { zh: "运动解耦、高效推理与几何感知：视频生成的新前沿", en: "Motion Decoupling, Efficient Inference & Geometry Awareness: New Frontiers in Video Generation" },
    mustReadCount: 4,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-08",
    title: { zh: "今日无重点论文：音频推理优化的一点启发", en: "No Priority Papers Today: A Hint from Audio Inference Optimization" },
    mustReadCount: 0,
    worthReadingCount: 1,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-09",
    title: { zh: "运动解耦控制与音频驱动视频生成新进展", en: "Advances in Disentangled Motion Control and Audio-Driven Video Generation" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 研究", en: "Music-to-Dance Research" },
    date: "2026-04-11",
    title: { zh: "LPM 1.0: 实时音频驱动角色表演的突破", en: "LPM 1.0: Breakthrough in Real-Time Audio-Driven Character Performance" },
    mustReadCount: 1,
    worthReadingCount: 4,
  },
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-12",
    title: { zh: "音频驱动视频生成的身份保持与实时推理新突破", en: "Breakthroughs in Identity Preservation and Real-Time Inference for Audio-Driven Video Generation" },
    mustReadCount: 3,
    worthReadingCount: 5,
  },
]

export function getAllRoleIds(): string[] {
  const ids = new Set(registry.map(meta => meta.roleId))
  return Array.from(ids)
}

export function getByRole(roleId: string): DigestMeta[] {
  return registry
    .filter(meta => meta.roleId === roleId)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getLatestPerRole(): DigestMeta[] {
  const latestMap = new Map<string, DigestMeta>()
  for (const meta of registry) {
    const existing = latestMap.get(meta.roleId)
    if (!existing || meta.date.localeCompare(existing.date) > 0) {
      latestMap.set(meta.roleId, meta)
    }
  }
  return Array.from(latestMap.values())
}

// Helper function to get localized string from bilingual object
  {
    roleId: "music-to-dance",
    roleName: { zh: "Music-to-Dance 视频生成研究者", en: "Music-to-Dance Video Generation Researcher" },
    date: "2026-04-15",
    title: { zh: "多模态统一生成与高效视频表征", en: "Multimodal Unified Generation & Efficient Video Representation" },
    mustReadCount: 4,
    worthReadingCount: 7,
  },
]

export function getAllRoleIds(): string[] {
  const ids = new Set(registry.map(meta => meta.roleId))
  return Array.from(ids)
}

export function getByRole(roleId: string): DigestMeta[] {
  return registry
    .filter(meta => meta.roleId === roleId)
    .sort((a, b) => b.date.localeCompare(a.date))
}

export function getLatestPerRole(): DigestMeta[] {
  const latestMap = new Map<string, DigestMeta>()
  for (const meta of registry) {
    const existing = latestMap.get(meta.roleId)
    if (!existing || meta.date.localeCompare(existing.date) > 0) {
      latestMap.set(meta.roleId, meta)
    }
  }
  return Array.from(latestMap.values())
}

// Helper function to get localized string from bilingual object
export function getLocalized<T extends { zh: string; en: string }>(
  obj: T,
  locale: Locale
): string {
  return obj[locale]
}
