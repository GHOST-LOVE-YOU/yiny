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
