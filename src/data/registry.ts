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
