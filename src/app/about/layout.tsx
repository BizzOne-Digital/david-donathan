import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet David Donathan and the Assess · Plan · Build · Measure framework behind David Donathan Media.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
