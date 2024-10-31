import { ThemeProvider } from "@/components/theme-provider";
import { I18nProviderClient } from "@/locales/client";
import {
  getProjects,
  getUserPreferences,
} from "@mason/supabase/cached-queries";
import { AppProvider } from "./app-provider";

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
}

export async function Providers({ children, locale }: ProvidersProps) {
  const userPreferences = await getUserPreferences();
  const projects = await getProjects();

  return (
    <I18nProviderClient locale={locale}>
      <ThemeProvider defaultTheme="light">
        <AppProvider
          initialUserPreferences={{
            weekStartsOnMonday:
              userPreferences?.data?.weekStartsOnMonday ?? false,
          }}
          initialProjects={{
            projects: projects?.data ?? [],
          }}
        >
          {children}
        </AppProvider>
      </ThemeProvider>
    </I18nProviderClient>
  );
}
