import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, social media management, and SEO services from David Donathan Media.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
