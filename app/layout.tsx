import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import ThemeProvider from "@/components/theme-provider";
import { Toaster } from "sonner";
import QueryClientProvider from "@/components/query-provider";
import siteMetadata from "@/lib/siteMetaData";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title, // a default is required when creating a template
  },
  description: siteMetadata.description,

  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [
      {
        url: siteMetadata.socialBanner, // Must be an absolute URL
        width: 1200,
        height: 675,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false, // Allow caching for better performance
    googleBot: {
      index: true,
      follow: true, // Allow Googlebot to follow links
      noimageindex: false, // Allow Google to index images
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.socialBanner],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster position="top-center" richColors />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
