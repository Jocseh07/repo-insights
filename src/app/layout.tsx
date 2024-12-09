import Providers from "@/components/providers/Providers";
import "@/styles/globals.css";
import { Toaster } from "sonner";

import { type Metadata } from "next";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: "RepoInsight",
  description: "RepoInsight",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster richColors />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
