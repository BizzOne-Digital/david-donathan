import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LeadModal } from "@/components/forms/lead-modal";
import { LeadModalProvider } from "@/components/providers/lead-modal-provider";
import { siteConfig } from "@/lib/site-data";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Digital Marketing, Web Design & SEO`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Transforming clicks into clients with full-service digital marketing, custom web design, social media management, and data-driven SEO.",
  metadataBase: new URL("https://daviddonathanmedia.net"),
  openGraph: {
    title: siteConfig.name,
    description:
      "Full-service digital marketing, web design, and SEO for brands ready to grow.",
    url: siteConfig.domain,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#050d18] text-slate-100">
        <LeadModalProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <LeadModal />
        </LeadModalProvider>
      </body>
    </html>
  );
}
