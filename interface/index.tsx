import { MasonPGliteProvider } from "@mason/db/db";
import { httpBatchLink } from "@mason/trpc/client/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense, useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./app/i18n";
import { MasonRouterProvider } from "./app/router-provider";
import { trpc } from "./utils/trpc";

function MasonInterfaceRoot() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api",
          // You can pass any HTTP headers you wish here
          async headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    }),
  );

  return (
    <Suspense>
      <I18nextProvider i18n={i18n}>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <MasonPGliteProvider>
              <MasonRouterProvider />
            </MasonPGliteProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </I18nextProvider>
    </Suspense>
  );
}

export { MasonInterfaceRoot };
