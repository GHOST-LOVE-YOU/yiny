export interface DigestMeta {
  roleId: string
  roleName: string
  date: string
  title: string
  mustReadCount: number
  worthReadingCount: number
}

export const registry: DigestMeta[] = [
  {
    roleId: "music-to-dance",
    roleName: "Music-to-Dance 视频生成研究者",
    date: "2000-01-01",
    title: "扩散模型遇上舞蹈生成",
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
