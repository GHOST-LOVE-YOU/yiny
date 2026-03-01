import { getLatestPerRole, getLocalized } from '@/data/registry'
import { Card } from '@/components/ui/card'
import { Calendar, FileText, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { getUI, type Locale, locales } from '@/lib/i18n'

export function generateStaticParams() {
  return locales.map(locale => ({ locale }))
}

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const ui = getUI(locale)
  const latestDigests = getLatestPerRole()

  return (
    <main className="min-h-screen">
      <section className="relative pt-40 pb-20 px-4 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#5D7052]/10 rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C18C5D]/10 rounded-[40%_60%_70%_30%_/_30%_70%_30%_70%] blur-3xl -z-10" />

        <div className="max-w-4xl mx-auto text-center mb-20">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-[#2C2C24] mb-6 leading-tight">
            {ui.siteTitle}
          </h1>
          <p className="text-xl md:text-2xl text-[#78786C] leading-relaxed max-w-2xl mx-auto">
            {ui.siteSubtitle}
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#2C2C24] mb-8 flex items-center justify-center gap-3">
            <span className="h-12 w-1 bg-[#5D7052] rounded-full" />
            {ui.latestDigests}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestDigests.map((meta, index) => {
              const organicBorderPatterns = [
                'rounded-tl-[3rem] rounded-tr-[2rem] rounded-br-[1.5rem] rounded-bl-[2.5rem]',
                'rounded-tl-[2rem] rounded-tr-[3rem] rounded-br-[2.5rem] rounded-bl-[1.5rem]',
                'rounded-tl-[2.5rem] rounded-tr-[1.5rem] rounded-br-[3rem] rounded-bl-[2rem]'
              ]
              const roleName = getLocalized(meta.roleName, locale)
              const title = getLocalized(meta.title, locale)
              return (
                <Link
                  key={meta.roleId}
                  href={`/${locale}/daily/${meta.roleId}`}
                  className="group"
                >
                  <Card
                    variant="default"
                    className={`${organicBorderPatterns[index % 3]} p-8 h-full transition-all duration-500 group-hover:-translate-y-2 group-hover:rotate-[0.5deg]`}
                  >
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5D7052]/10 text-[#5D7052] text-sm font-semibold mb-4">
                        <Calendar className="w-4 h-4" />
                        {meta.date}
                      </div>
                      <h3 className="font-serif text-xl md:text-2xl font-bold text-[#2C2C24] mb-3 leading-snug">
                        {roleName}
                      </h3>
                    </div>

                    <h4 className="font-serif text-lg font-semibold text-[#2C2C24] mb-6 line-clamp-2">
                      {title}
                    </h4>

                    <div className="flex items-center justify-between text-[#78786C] text-sm">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>{ui.readCount(meta.mustReadCount)}</span>
                        </div>
                        {meta.worthReadingCount > 0 && (
                          <div className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                              <circle cx="12" cy="12" r="10" />
                              <path d="M9 12l2 2 4-4" />
                            </svg>
                            <span>{ui.referenceCount(meta.worthReadingCount)}</span>
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-[#5D7052] group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </main>
  )
}
