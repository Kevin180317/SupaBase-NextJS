import type { Metadata } from "next";
import DashboardAuthWrapper from "./DashboardAuthWrapper";

export const metadata: Metadata = {
  title: "Dashboard | Next Auth App",
  description:
    "Panel de control personalizado para gestionar tu cuenta, ver estadísticas y más. Seguro y rápido.",
  keywords: [
    "dashboard",
    "panel de control",
    "usuario",
    "supabase",
    "nextjs",
    "tailwind",
  ],
  metadataBase: new URL("http://localhost:3000"),
  alternates: {
    canonical: "/dashboard",
  },
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Dashboard | Next Auth App",
    description:
      "Panel de control personalizado para gestionar tu cuenta, ver estadísticas y más. Seguro y rápido.",
    url: "http://localhost:3000/dashboard",
    siteName: "Next Auth App",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dashboard | Next Auth App",
    description:
      "Panel de control personalizado para gestionar tu cuenta, ver estadísticas y más. Seguro y rápido.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardAuthWrapper>{children}</DashboardAuthWrapper>;
}
