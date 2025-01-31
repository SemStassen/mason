import { createBrowserClient } from "@mason/supabase/browser";
import { Toaster } from "@mason/ui/toaster";
import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { Login } from "~/app/login";
import { RootLayout } from "~/app/root-layout";
import { Settings } from "~/app/settings";
import { AppCommand } from "~/components/app-command";
import { ErrorElement } from "~/components/error-element";
import { Main } from "./main";

const routes: Array<RouteObject> = [
  {
    errorElement: <ErrorElement />,
    path: "/",
    element: (
      <>
        <RootLayout />
        <AppCommand />
        <Toaster />
      </>
    ),
    loader: async () => {
      const supabase = createBrowserClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        return redirect("/login");
      }

      return { session };
    },
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: "/organization",
        element: <div>Org</div>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const router = createBrowserRouter(routes, {
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});

export function MasonRouterProvider() {
  return <RouterProvider router={router} />;
}
