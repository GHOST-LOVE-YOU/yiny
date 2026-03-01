import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "AI Paper Digest - AI 论文速递",
  description: "Daily curated insights from the latest AI research papers. 每天为你精选最值得读的 AI 论文。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700;9..144,800&family=Nunito:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        precedence="default"
      />
      <html lang="en">
        <body className="antialiased">
          <div className="relative min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1 relative z-10">
              {children}
            </main>
            <Footer />
          </div>
        </body>
      </html>
    </>
  );
}
