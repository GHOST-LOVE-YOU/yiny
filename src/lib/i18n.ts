export type Locale = 'zh' | 'en'
export const locales: Locale[] = ['zh', 'en']
export const defaultLocale: Locale = 'zh'

// UI 固定字符串翻译表
export const ui = {
  zh: {
    siteTitle: 'AI 论文速递',
    siteSubtitle: '每天为你精选最值得读的 AI 论文',
    daily: '日报',
    overview: '今日概览',
    mustRead: '重点关注',
    mustReadSubtitle: 'Must Read',
    worthReading: '也值得关注',
    worthReadingSubtitle: 'Worth Reading',
    observation: '今日观察',
    keyPoints: '要点',
    originalPaper: '原文',
    viewOriginal: '查看原文',
    home: '首页',
    backToHome: '返回首页',
    latestDigests: '最新日报',
    read: '阅读',
    readCount: (n: number) => `${n} 篇重点`,
    referenceCount: (n: number) => `${n} 篇参考`,
    mustReadCount: (n: number) => `${n} 篇重点关注`,
    worthReadingCount: (n: number) => `${n} 篇也值得关注`,
    dateFormat: (date: string) => {
      const [y, m, d] = date.split('-').map(Number)
      return `${y}年${m}月${d}日`
    },
    langSwitch: 'EN',
    langSwitchLabel: '切换到英文',
    curatedInsights: '精选研究见解和分析',
  },
  en: {
    siteTitle: 'AI Paper Digest',
    siteSubtitle: 'Curated AI papers worth reading, every day',
    daily: 'Daily',
    overview: "Today's Overview",
    mustRead: 'Must Read',
    mustReadSubtitle: '',
    worthReading: 'Worth Reading',
    worthReadingSubtitle: '',
    observation: "Today's Observation",
    keyPoints: 'Key Points',
    originalPaper: 'Paper',
    viewOriginal: 'View Paper',
    home: 'Home',
    backToHome: 'Back to Home',
    latestDigests: 'Latest Digests',
    read: 'Read',
    readCount: (n: number) => `${n} must-reads`,
    referenceCount: (n: number) => `${n} references`,
    mustReadCount: (n: number) => `${n} must-reads`,
    worthReadingCount: (n: number) => `${n} worth reading`,
    dateFormat: (date: string) => {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    },
    langSwitch: '中文',
    langSwitchLabel: 'Switch to Chinese',
    curatedInsights: 'Curated research insights and analysis',
  },
} satisfies Record<Locale, object>

export function getUI(locale: Locale) {
  return ui[locale]
}

// 在 [locale] layout 和 generateStaticParams 里用
export function isValidLocale(s: string): s is Locale {
  return locales.includes(s as Locale)
}
