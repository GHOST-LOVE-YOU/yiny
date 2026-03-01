import { Github as GithubIcon, Twitter as TwitterIcon, Linkedin as LinkedinIcon, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[#DED8CF]/50 mt-32 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#2C2C24] mb-4">
              AI Paper Digest
            </h3>
            <p className="text-[#78786C] leading-relaxed">
              Daily curated insights from the latest AI research papers.
              Stay informed with thoughtful analysis and expert perspectives.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-[#2C2C24] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-[#78786C] hover:text-[#5D7052] transition-colors">
                  Home
                </a>
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
              Connect
            </h3>
            <div className="flex gap-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="GitHub"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full bg-[#5D7052]/10 flex items-center justify-center hover:bg-[#5D7052] hover:text-white text-[#5D7052] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
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
          <p>© 2025 AI Paper Digest. Crafted with care for research community.</p>
        </div>
      </div>
    </footer>
  )
}
