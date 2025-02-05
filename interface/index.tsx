import { MasonPGliteProvider } from "@mason/db/client/db";
import { Suspense } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./app/i18n";
import { MasonRouterProvider } from "./app/router-provider";

function MasonInterfaceRoot() {
  return (
    <Suspense>
      <I18nextProvider i18n={i18n}>
        <MasonPGliteProvider>
          <MasonRouterProvider />
        </MasonPGliteProvider>
      </I18nextProvider>
    </Suspense>
  );
}

export { MasonInterfaceRoot };
