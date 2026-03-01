'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { getUI, type Locale } from '@/lib/i18n'

export function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
  const pathname = usePathname()
  const switchTo = currentLocale === 'zh' ? 'en' : 'zh'
  const ui = getUI(currentLocale)

  // Replace the first locale segment in the path with the target locale
  const switchedPath = pathname.replace(/^\/(zh|en)/, `/${switchTo}`)

  return (
    <Link
      href={switchedPath}
      aria-label={ui.langSwitchLabel}
      className="px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
      style={{
        backgroundColor: currentLocale === 'zh' ? '#5D7052' : 'transparent',
        color: currentLocale === 'zh' ? '#F3F4F1' : '#5D7052',
      }}
    >
      {ui.langSwitch}
    </Link>
  )
}
