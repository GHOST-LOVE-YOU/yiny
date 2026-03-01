'use client'

import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export function Footer() {
  const pathname = usePathname()
  const locale = pathname.match(/^\/(zh|en)/)?.[1] || 'zh'

  const siteTitle = locale === 'zh' ? 'AI 论文速递' : 'AI Paper Digest'
  const description = locale === 'zh'
    ? '每天为你精选最值得读的 AI 论文，保持对前沿研究的深度洞察。'
    : 'Daily curated insights from latest AI research papers. Stay informed with thoughtful analysis and expert perspectives.'
  const quickLinksTitle = locale === 'zh' ? '快速链接' : 'Quick Links'
  const homeText = locale === 'zh' ? '首页' : 'Home'
  const connectTitle = locale === 'zh' ? '联系我们' : 'Connect'
  const copyright = locale === 'zh'
    ? '© 2025 AI 论文速递。为研究社区用心打造。'
    : '© 2025 AI Paper Digest. Crafted with care for research community.'

  return (
    <footer className="border-t border-[#DED8CF]/50 mt-32 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2C2C24] mb-4">
              {siteTitle}
            </h3>
            <p className="text-[#78786C] leading-relaxed">
              {description}
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-[#2C2C24] mb-4">
              {quickLinksTitle}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${locale}`} className="text-[#78786C] hover:text-[#5D7052] transition-colors">
                  {homeText}
                </Link>
              </li>
              <li>
                <a href="https://arxiv.org" target="_blank" rel="noopener noreferrer" className="text-[#78786C] hover:text-[#5D7052] transition-colors">
                  arXiv
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-[#2C2C24] mb-4">
              {connectTitle}
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@example.com"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[#DED8CF]/30 text-center text-[#78786C] text-sm">
          <p>{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
