import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Standard $79 package, custom enterprise options, and interactive add-ons.",
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
