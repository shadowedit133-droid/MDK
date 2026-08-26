import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { profileData } from "@/data/profile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#08080b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://muhammaddaniyal.com"),
  title: {
    default: `${profileData.fullName} | Professional Video Editor & YouTube Editor`,
    template: `%s | ${profileData.fullName}`,
  },
  description: profileData.heroSubheadline,
  keywords: [
    "Muhammad Daniyal Khan",
    "Professional Video Editor",
    "YouTube Video Editor",
    "Cash Cow Video Editor",
    "Faceless YouTube Video Editor",
    "Short Form Video Editor",
    "Reels Video Editor",
    "Adobe Premiere Pro Editor",
    "Motion Graphics Editor",
    "Freelance Video Editor",
    "Upwork Top Rated Video Editor",
  ],
  authors: [{ name: profileData.fullName, url: profileData.upworkUrl }],
  creator: profileData.fullName,
  publisher: profileData.fullName,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://muhammaddaniyal.com",
    title: `${profileData.fullName} | ${profileData.shortRole}`,
    description: profileData.heroSubheadline,
    siteName: `${profileData.fullName} Portfolio`,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${profileData.fullName} - Professional Video Editor Portfolio`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.fullName} | ${profileData.shortRole}`,
    description: profileData.heroSubheadline,
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://muhammaddaniyal.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://muhammaddaniyal.com/#person",
        name: profileData.fullName,
        alternateName: profileData.upworkDisplayName,
        jobTitle: profileData.shortRole,
        description: profileData.heroSubheadline,
        sameAs: [profileData.upworkUrl],
        knowsAbout: [
          "Video Editing",
          "YouTube Post Production",
          "Motion Graphics",
          "Sound Design",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": "https://muhammaddaniyal.com/#service",
        name: `${profileData.fullName} — Video Editing Services`,
        provider: {
          "@id": "https://muhammaddaniyal.com/#person",
        },
        url: profileData.upworkUrl,
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${plusJakarta.variable} ${outfit.variable} scroll-smooth antialiased dark`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#08080b] text-[#f4f4f5] font-sans relative selection:bg-lime-500/30 selection:text-white flex flex-col justify-between">
        {/* Subtle Film Grain Layer */}
        <div className="film-grain" aria-hidden="true" />
        
        {/* Ambient Top Glow */}
        <div 
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-lime-500/10 via-sky-500/5 to-transparent blur-[120px] pointer-events-none -z-10"
          aria-hidden="true"
        />

        {/* Desktop Custom Cursor */}
        <CustomCursor />

        {/* Global Floating Navbar */}
        <Navbar />

        {/* Main Content Viewport */}
        <div className="flex-grow">{children}</div>

        {/* Global Compliant Footer */}
        <Footer />
      </body>
    </html>
  );
}
