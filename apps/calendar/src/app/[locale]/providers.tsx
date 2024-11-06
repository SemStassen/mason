import { ThemeProvider } from "@/components/theme-provider";
import { I18nProviderClient } from "@/locales/client";

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export async function Providers({ children, locale }: ProvidersProps) {
  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider defaultTheme="light">{children}</ThemeProvider>
    </I18nProviderClient>
  );
}
