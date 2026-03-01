import { getAllRoleIds, getByRole, getLocalized } from '@/data/registry'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Calendar, FileText, ArrowLeft } from 'lucide-react'
import { getUI, type Locale, locales } from '@/lib/i18n'

export async function generateStaticParams() {
  const roleIds = getAllRoleIds()
  const params: { locale: string; roleId: string }[] = []
  for (const roleId of roleIds) {
    for (const locale of locales) {
      params.push({ locale, roleId })
    }
  }
  return params
}

export default async function RoleArchivePage({ params }: { params: Promise<{ locale: Locale; roleId: string }> }) {
  const { locale, roleId } = await params
  const ui = getUI(locale)
  const digests = getByRole(roleId)
  const roleName = digests[0] ? getLocalized(digests[0].roleName, locale) : 'Unknown Role'

  return (
    <main className="min-h-screen pt-28 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-[#78786C] hover:text-[#5D7052] transition-colors font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            {ui.backToHome}
          </Link>
        </div>

        <header className="mb-16 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-[#2C2C24] mb-6">
            {roleName}
          </h1>
          <p className="text-xl text-[#78786C] max-w-2xl mx-auto">
            {ui.curatedInsights}
          </p>
        </header>

        <div className="space-y-8">
          {digests.map((meta, index) => {
            const organicBorderPatterns = [
              'rounded-tl-[3rem] rounded-tr-[2rem] rounded-br-[1.5rem] rounded-bl-[2.5rem]',
              'rounded-tl-[2rem] rounded-tr-[3rem] rounded-br-[2.5rem] rounded-bl-[1.5rem]',
              'rounded-tl-[2.5rem] rounded-tr-[1.5rem] rounded-br-[3rem] rounded-bl-[2rem]'
            ]
            const title = getLocalized(meta.title, locale)

            return (
              <Link
                key={meta.date}
                href={`/${locale}/daily/${meta.roleId}/${meta.date}`}
                className="group block"
              >
                <Card
                  variant="default"
                  className={`${organicBorderPatterns[index % 3]} p-8 transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_40px_-10px_rgba(93,112,82,0.2)]`}
                >
                  <div className="flex items-start justify-between gap-6 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#5D7052]/10 flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-[#5D7052]" />
                      </div>
                      <div>
                        <time className="font-serif text-2xl font-bold text-[#2C2C24]">
                          {meta.date}
                        </time>
                      </div>
                    </div>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#2C2C24] mb-6 leading-snug">
                    {title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-[#78786C]">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-[#5D7052]" />
                        <span className="font-medium">{ui.mustReadCount(meta.mustReadCount)}</span>
                      </div>
                      {meta.worthReadingCount > 0 && (
                        <div className="flex items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="#C18C5D" strokeWidth={2} className="w-5 h-5">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9 12l2 2 4-4" />
                          </svg>
                          <span className="font-medium">{ui.worthReadingCount(meta.worthReadingCount)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[#5D7052] font-semibold group-hover:translate-x-1 transition-transform">
                      <span>{ui.read}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                        <path d="M5 12h14" />
                        <path d="M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
