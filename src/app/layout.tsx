import "./globals.css";
import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Next Auth App",
    template: "%s | Next Auth App",
  },
  description:
    "Con Supabase, Context y Tailwind. Plataforma segura y rápida para gestionar autenticación.",
  keywords: ["nextjs", "supabase", "auth", "tailwind", "react", "typescript"],
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Kevin Ortega", url: "https://tusitio.com" }],
  publisher: "Kevin Ortega",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Next Auth App",
    description:
      "Con Supabase, Context y Tailwind. Plataforma segura y rápida para gestionar autenticación.",
    url: "http://localhost:3000/",
    siteName: "Next Auth App",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next Auth App",
    description:
      "Con Supabase, Context y Tailwind. Plataforma segura y rápida para gestionar autenticación.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </AuthProvider>
      </body>
    </html>
  );
}
