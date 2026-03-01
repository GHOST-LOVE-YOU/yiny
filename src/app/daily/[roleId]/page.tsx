import { getAllRoleIds, getByRole } from '@/data/registry'
import Link from 'next/link'

export async function generateStaticParams() {
  const roleIds = getAllRoleIds()
  return roleIds.map(roleId => ({ roleId }))
}

export default async function RoleArchivePage({ params }: { params: Promise<{ roleId: string }> }) {
  const { roleId } = await params
  const digests = getByRole(roleId)
  const roleName = digests[0]?.roleName || 'Unknown Role'

  return (
    <main>
      <h1>{roleName}</h1>
      {digests.map(meta => (
        <article key={meta.date}>
          <h2>{meta.date}</h2>
          <p>{meta.title}</p>
          <p>{meta.mustReadCount} 篇重点关注</p>
          <Link href={`/daily/${meta.roleId}/${meta.date}`}>Read</Link>
        </article>
      ))}
    </main>
  )
}
