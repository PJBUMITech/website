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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    title: "PJBUMI Tech",
    description:
      "Advanced long-range drones, communications satellites, and hydrogen technology from Malaysia to Toulouse.",
    url: "https://pjbumitech.com",
    siteName: "PJBUMI Tech",
    type: "website",
    images: [{ url: "/images/PJBUMI-tech-logo.png", width: 512, height: 512 }],
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
