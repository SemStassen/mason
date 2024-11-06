import { Toaster } from "@mason/ui/toaster";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Providers } from "./providers";
import "@mason/ui/globals.css";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Mason",
  description: "The next generation of time tracking",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  const { locale } = await params;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <div className="overflow-hidden h-screen w-screen overscroll-x-none">
          <Providers locale={locale}>{children}</Providers>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
