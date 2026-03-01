import { getLatestPerRole } from '@/data/registry'

export default function Home() {
  const latestDigests = getLatestPerRole()

  return (
    <main>
      <h1>AI Paper Digest</h1>
      {latestDigests.map(meta => (
        <article key={meta.roleId}>
          <h2>{meta.roleName}</h2>
          <p>Date: {meta.date}</p>
          <p>{meta.title}</p>
          <a href={`/daily/${meta.roleId}`}>View Archive</a>
        </article>
      ))}
    </main>
  )
}
