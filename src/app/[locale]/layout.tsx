import { isValidLocale, defaultLocale, locales, type Locale } from '@/lib/i18n'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const validatedLocale = isValidLocale(locale) ? (locale as Locale) : defaultLocale

  return (
    <div className="flex-1">
      <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
        <div className="flex bg-white/80 backdrop-blur-md border-[#DED8CF]/50 rounded-full px-1 py-1 shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)]">
          <LanguageSwitcher currentLocale={validatedLocale} />
        </div>
      </div>
      {children}
    </div>
  )
}
