import { dailyReport } from "@/data/daily/music-to-dance/2026-06-25/report";
import { DailyDigestClient } from "@/components/daily-digest-client";
import { locales, type Locale } from "@/lib/i18n";
import { Metadata } from "next";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: "Daily Paper Digest - 2026-06-25",
  description: "Domain-Aware Disentanglement & Geometric Constraints",
};

export default function DailyDigestPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  return <DailyDigestClient report={dailyReport} locale={locale} />;
}
