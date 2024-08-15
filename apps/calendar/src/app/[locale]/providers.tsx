"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { I18nProviderClient } from "@/locales/client";

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export function Providers({ children, locale }: ProvidersProps) {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
    </I18nProviderClient>
  );
}
