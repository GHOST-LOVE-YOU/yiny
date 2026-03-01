import { type ReactNode, FC } from 'react'

export const DigestLayout: FC<{
  date: string
  roleId: string
  roleName: string
  title: string
  overview: string[]
  children: ReactNode
}> = ({ date, roleId, roleName, title, overview, children }) => (
  <div>
    <div>{`Date: ${date}`}</div>
    <div>{`Role: ${roleId}`}</div>
    <div>{`RoleName: ${roleName}`}</div>
    <h1>{title}</h1>
    <ul>
      {overview.map((point, i) => (
        <li key={i}>{point}</li>
      ))}
    </ul>
    {children}
  </div>
)

export const MustRead: FC<{ children: ReactNode }> = ({ children }) => (
  <section>
    <h2>Must Read</h2>
    {children}
  </section>
)

export const Paper: FC<{
  num: number
  tag: string
  title: string
  children: ReactNode
}> = ({ num, tag, title, children }) => (
  <article>
    <div>{String(num).padStart(2, '0')}</div>
    <div>{tag}</div>
    <h3>{title}</h3>
    {children}
  </article>
)

export const KeyPoints: FC<{ points: string[] }> = ({ points }) => (
  <ul>
    {points.map((point, i) => (
      <li key={i}>{point}</li>
    ))}
  </ul>
)

export const PaperLink: FC<{
  href: string
  title: string
}> = ({ href, title }) => (
  <a href={href}>{title}</a>
)

export const WorthReading: FC<{ children: ReactNode }> = ({ children }) => (
  <section>
    <h2>Worth Reading</h2>
    {children}
  </section>
)

export const NotableItem: FC<{
  num: number
  title: string
  tag: string
  href: string
  children: ReactNode
}> = ({ num, title, tag, href, children }) => (
  <article>
    <div>{String(num).padStart(2, '0')}</div>
    <div>{tag}</div>
    <h4>{title}</h4>
    <a href={href}>{href}</a>
    {children}
  </article>
)

export const Observation: FC<{ children: ReactNode }> = ({ children }) => (
  <section>
    <h2>Observation</h2>
    {children}
  </section>
)
