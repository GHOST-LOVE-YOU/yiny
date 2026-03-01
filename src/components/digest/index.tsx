'use client'

import { type ReactNode, FC, createContext, useContext } from 'react'
import { Card } from '../ui/card'
import type { Locale } from '@/lib/i18n'
import { getUI } from '@/lib/i18n'

// Digest Locale Context
const DigestLocaleContext = createContext<Locale>('zh')

export function DigestLocaleProvider({ children, locale }: { children: ReactNode; locale: Locale }) {
  return (
    <DigestLocaleContext.Provider value={locale}>
      {children}
    </DigestLocaleContext.Provider>
  )
}

export function useDigestLocale() {
  return useContext(DigestLocaleContext)
}

export const DigestLayout: FC<{
  locale: Locale
  date: string
  roleId: string
  roleName: string
  title: string
  overview: string[]
  children: ReactNode
}> = ({ locale, date, roleName, title, overview, children }) => {
  const ui = getUI(locale)

  return (
    <DigestLocaleProvider locale={locale}>
      <article className="relative min-h-screen py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <header className="mb-16 text-center">
            <div className="inline-block px-4 py-2 rounded-full bg-[#5D7052]/10 text-[#5D7052] text-sm font-semibold mb-6">
              {roleName}
            </div>
            <time className="block text-[#78786C] mb-4 text-lg">
              {ui.dateFormat(date)}
            </time>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C2C24] mb-8 leading-tight">
              {title}
            </h1>
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-xl font-bold text-[#2C2C24] mb-4">{ui.overview}</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {overview.map((point, i) => (
                  <li key={i} className="flex items-start gap-2 text-[#2C2C24]">
                    <span className="text-[#C18C5D] mt-1.5 flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </header>

          <main className="relative">
            {children}
          </main>
        </div>

        <div className="fixed top-20 right-0 -translate-y-1/2 w-96 h-96 bg-[#5D7052]/5 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] blur-3xl -z-10" />
        <div className="fixed bottom-20 left-0 translate-y-1/2 w-80 h-80 bg-[#C18C5D]/5 rounded-[40%_60%_70%_30%_/_30%_70%_30%_70%] blur-3xl -z-10" />
      </article>
    </DigestLocaleProvider>
  )
}

export const MustRead: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useDigestLocale()
  const ui = getUI(locale)

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C24] mb-8 flex items-center gap-3">
        <span className="h-12 w-1 bg-[#5D7052] rounded-full" />
        {ui.mustRead}
        {ui.mustReadSubtitle && (
          <span className="ml-auto text-[#78786C] text-lg font-serif font-normal">
            {ui.mustReadSubtitle}
          </span>
        )}
      </h2>
      <div className="space-y-8">
        {children}
      </div>
    </section>
  )
}

export const Paper: FC<{
  num: number
  tag: string
  title: string
  children: ReactNode
}> = ({ num, tag, title, children }) => {
  const organicBorderPatterns = [
    'rounded-tl-[3rem] rounded-tr-[2rem] rounded-br-[1.5rem] rounded-bl-[2.5rem]',
    'rounded-tl-[2rem] rounded-tr-[3rem] rounded-br-[2.5rem] rounded-bl-[1.5rem]',
    'rounded-tl-[2.5rem] rounded-tr-[1.5rem] rounded-br-[3rem] rounded-bl-[2rem]'
  ]
  const patternIndex = num % 3

  return (
    <Card variant="default" className={`p-8 md:p-10 ${organicBorderPatterns[patternIndex]} hover:rotate-[0.5deg]`}>
      <div className="flex items-start gap-6 mb-6">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#5D7052] flex items-center justify-center text-[#F3F4F1] font-serif text-xl font-bold">
          {String(num).padStart(2, '0')}
        </div>
        <div className="flex-1">
          <span className="inline-block px-3 py-1 rounded-full bg-[#C18C5D]/20 text-[#C18C5D] text-sm font-semibold mb-3">
            {tag}
          </span>
          <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C2C24] leading-snug">
            {title}
          </h3>
        </div>
      </div>
      <div className="space-y-6 text-[#2C2C24] leading-relaxed">
        {children}
      </div>
    </Card>
  )
}

export const KeyPoints: FC<{ points: string[] }> = ({ points }) => {
  const locale = useDigestLocale()
  const ui = getUI(locale)

  return (
    <div className="bg-[#F0EBE5]/30 rounded-2xl p-6">
      <h4 className="font-serif text-lg font-bold text-[#2C2C24] mb-4 flex items-center gap-2">
        <svg viewBox="0 0 24 24" fill="none" stroke="#5D7052" strokeWidth={2} className="w-5 h-5">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </svg>
        {ui.keyPoints}
      </h4>
      <ul className="space-y-3">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[#5D7052] mt-2.5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const PaperLink: FC<{
  href: string
  title: string
}> = ({ href, title }) => {
  const locale = useDigestLocale()
  const ui = getUI(locale)

  return (
    <div className="flex items-center gap-3 pt-4 border-t border-[#DED8CF]/30">
      <svg viewBox="0 0 24 24" fill="none" stroke="#5D7052" strokeWidth={2} className="w-5 h-5 flex-shrink-0">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
      <span className="text-[#78786C] font-medium mr-2">{ui.originalPaper}:</span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#5D7052] font-semibold hover:text-[#C18C5D] transition-colors underline decoration-2 underline-offset-2"
      >
        {title}
      </a>
      <svg viewBox="0 0 24 24" fill="none" stroke="#78786C" strokeWidth={2} className="w-4 h-4">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </svg>
    </div>
  )
}

export const WorthReading: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useDigestLocale()
  const ui = getUI(locale)

  return (
    <section className="mb-16">
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C24] mb-8 flex items-center gap-3">
        <span className="h-12 w-1 bg-[#C18C5D] rounded-full" />
        {ui.worthReading}
        {ui.worthReadingSubtitle && (
          <span className="ml-auto text-[#78786C] text-lg font-serif font-normal">
            {ui.worthReadingSubtitle}
          </span>
        )}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </section>
  )
}

export const NotableItem: FC<{
  num: number
  title: string
  tag: string
  href: string
  children: ReactNode
}> = ({ num, title, tag, href, children }) => {
  const locale = useDigestLocale()
  const ui = getUI(locale)

  const organicBorderPatterns = [
    'rounded-tl-[2.5rem] rounded-tr-[1.5rem] rounded-br-[2rem] rounded-bl-[1.8rem]',
    'rounded-tl-[1.8rem] rounded-tr-[2.5rem] rounded-br-[1.5rem] rounded-bl-[2rem]'
  ]
  const patternIndex = num % 2

  return (
    <Card variant="muted" className={`p-6 ${organicBorderPatterns[patternIndex]}`}>
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#C18C5D]/20 flex items-center justify-center text-[#C18C5D] font-serif text-base font-bold">
          {String(num).padStart(2, '0')}
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block px-2 py-0.5 rounded-full bg-[#C18C5D]/15 text-[#C18C5D] text-xs font-semibold mb-2">
            {tag}
          </span>
          <h4 className="font-serif text-lg font-bold text-[#2C2C24] leading-snug truncate">
            {title}
          </h4>
        </div>
      </div>
      <p className="text-[#2C2C24] text-sm leading-relaxed mb-4">
        {children}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-[#5D7052] text-sm font-semibold hover:text-[#C18C5D] transition-colors"
      >
        <span>{ui.viewOriginal}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </Card>
  )
}

export const Observation: FC<{ children: ReactNode }> = ({ children }) => {
  const locale = useDigestLocale()
  const ui = getUI(locale)

  return (
    <section className="relative">
      <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#5D7052]/10 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] blur-xl -z-10" />
      <Card variant="accent" className="p-8 md:p-12 border-l-4 border-l-[#5D7052]">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C24] mb-6 flex items-center gap-3">
          <svg viewBox="0 0 24 24" fill="none" stroke="#5D7052" strokeWidth={2} className="w-8 h-8">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          {ui.observation}
        </h2>
        <div className="prose prose-lg max-w-none text-[#2C2C24] leading-relaxed">
          {children}
        </div>
      </Card>
    </section>
  )
}
