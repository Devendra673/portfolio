import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { siteConfig } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: "Devendra | Full Stack Developer & AI Engineer",
  description:
    "Full stack developer and AI engineer building intelligent systems — NLP, secure RAG, IoT with ML analytics, and collaborative AI applications.",
  keywords: [
    "Devendra",
    "Full Stack Developer",
    "AI Engineer",
    "Machine Learning",
    "NLP",
    "RAG",
    "IoT",
    "React",
    "Next.js",
    "Python",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Devendra" }],
  creator: "Devendra",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Devendra — Full Stack Developer & AI Engineer",
    description:
      "Building intelligent systems across NLP, RAG, IoT, and speech technologies. From raw data to polished interfaces.",
    siteName: "Devendra's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devendra — Full Stack Developer & AI Engineer",
    description:
      "Building intelligent systems across NLP, RAG, IoT, and speech technologies.",
    creator: "@devendra",
  },
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
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.remove('dark')}else if(t==='dark'){document.documentElement.classList.add('dark')}else if(!window.matchMedia('(prefers-color-scheme: dark)').matches){document.documentElement.classList.remove('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Devendra",
              jobTitle: "Full Stack Developer & AI Engineer",
              email: "devendradevendra562@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Bangalore",
                addressCountry: "IN",
              },
              worksFor: [
                {
                  "@type": "Organization",
                  name: "DigitalTransols AI Pvt Ltd",
                },
                {
                  "@type": "Organization",
                  name: "Guruvidhya IT Services Pvt Ltd",
                },
              ],
              alumniOf: [
                {
                  "@type": "CollegeOrUniversity",
                  name: "Dr. Ambedkar Institute of Technology",
                },
                {
                  "@type": "CollegeOrUniversity",
                  name: "AES National Degree College",
                },
              ],
              knowsAbout: [
                "Natural Language Processing",
                "Retrieval-Augmented Generation",
                "Internet of Things",
                "Speech Technology",
                "Full Stack Development",
              ],
              sameAs: [
                "https://github.com/Devendra673",
                "https://www.linkedin.com/in/devendra-664a02306",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
