import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "Calapan City System | Smart City Services & Community Portal",
    template: "%s | Calapan City System"
  },
  description: "Official Calapan City digital platform providing seamless access to government services, community updates, emergency alerts, and local resources. Your complete gateway to smart city living in Oriental Mindoro.",
  keywords: [
    "Calapan City",
    "Oriental Mindoro",
    "city services",
    "government portal",
    "smart city",
    "community updates",
    "local government",
    "Philippine city services",
    "Calapan government",
    "city hall services",
    "emergency alerts",
    "community portal",
    "digital government",
    "e-services Philippines"
  ],
  authors: [{ name: "Calapan City Government" }],
  creator: "Calapan City Government",
  publisher: "Calapan City Government",
  generator: "Next.js",
  applicationName: "Calapan City System",
  referrer: "origin-when-cross-origin",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  metadataBase: new URL("https://calapan-city.vercel.app"),
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Calapan City System",
    startupImage: [
      {
        url: "/apple-splash-2048-2732.png",
        media: "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)"
      }
    ]
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  openGraph: {
    type: "website",
    locale: "en_PH",
    url: "https://calapan-city.vercel.app",
    title: "Calapan City System | Smart City Services & Community Portal",
    description: "Official Calapan City digital platform providing seamless access to government services, community updates, emergency alerts, and local resources.",
    siteName: "Calapan City System",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Calapan City System - Smart City Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Calapan City System | Smart City Services & Community Portal",
    description: "Official Calapan City digital platform providing seamless access to government services, community updates, and local resources.",
    images: ["/twitter-image.png"],
    creator: "@CalapanCity",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://calapan-city.vercel.app",
    languages: {
      "en-PH": "https://calapan-city.vercel.app",
      "fil-PH": "https://calapan-city.vercel.app/fil",
    },
  },
  category: "government",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Calapan City Government",
    "url": "https://calapan-city.vercel.app",
    "logo": "https://calapan-city.vercel.app/icon-512x512.png",
    "description": "Official digital platform of Calapan City Government providing seamless access to city services and community updates",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Calapan City Hall",
      "addressLocality": "Calapan City",
      "addressRegion": "Oriental Mindoro",
      "postalCode": "5200",
      "addressCountry": "PH"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "13.4119",
      "longitude": "121.1803"
    },
    "areaServed": {
      "@type": "City",
      "name": "Calapan City"
    },
    "sameAs": [
      "https://www.facebook.com/CalapanCity",
      "https://twitter.com/CalapanCity"
    ]
  }

  return (
    <html lang="en">
      <head>
        {/* Essential Meta Tags */}
        <meta name="theme-color" content="#ea580c" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* Geographic Tags */}
        <meta name="geo.region" content="PH-MDR" />
        <meta name="geo.placename" content="Calapan City" />
        <meta name="geo.position" content="13.4119;121.1803" />
        <meta name="ICBM" content="13.4119, 121.1803" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        
        {/* Service Worker Registration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${geist.className} antialiased bg-gradient-to-br from-emerald-50 via-orange-50 to-emerald-50`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}