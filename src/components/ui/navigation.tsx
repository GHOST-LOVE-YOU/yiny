'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl">
        <div className="bg-white/70 backdrop-blur-md border-[#DED8CF]/50 rounded-full shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] px-6 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="h-10 w-10 rounded-full bg-[#5D7052] flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="font-serif font-bold text-lg text-[#2C2C24]">AI Paper Digest</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-[#2C2C24] hover:text-[#5D7052] font-medium transition-colors">
              Home
            </Link>
            <a href="https://arxiv.org" target="_blank" rel="noopener noreferrer" className="text-[#2C2C24] hover:text-[#5D7052] font-medium transition-colors">
              arXiv
            </a>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-full hover:bg-[#5D7052]/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6 text-[#5D7052]" /> : <Menu className="w-6 h-6 text-[#5D7052]" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-[#FDFCF8] md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8 p-8">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif font-bold text-[#2C2C24] hover:text-[#5D7052] transition-colors"
            >
              Home
            </Link>
            <a
              href="https://arxiv.org"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="text-2xl font-serif font-bold text-[#2C2C24] hover:text-[#5D7052] transition-colors"
            >
              arXiv
            </a>
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#5D7052]/10 transition-colors"
            >
              <X className="w-6 h-6 text-[#5D7052]" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
