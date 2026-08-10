import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PJBUMI Tech | Aerospace, Drone & Hydrogen Technology",
  description:
    "PJBUMI Technologies integrates multi-disciplinary engineering and cutting-edge technology across drones, satellites, hydrogen systems, and space research.",
  openGraph: {
    title: "PJBUMI Tech",
    description:
      "Advanced long-range drones, communications satellites, and hydrogen technology from Malaysia to Toulouse.",
    url: "https://pjbumitech.com",
    siteName: "PJBUMI Tech",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${sora.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
