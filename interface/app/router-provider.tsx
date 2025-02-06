import { createBrowserClient } from "@mason/supabase/browser";
import { Toaster } from "@mason/ui/toaster";
import {
  type RouteObject,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { LoginPage } from "~/app/routes/login-page";
import { RootLayout } from "~/app/routes/root-layout";
import { SettingsPage, settingsLoader } from "~/app/routes/settings-page";
import { AppCommand } from "~/components/app-command";
import { ErrorElement } from "~/components/error-element";
import { MainPage } from "./routes/main-page";
import { ProjectsPage } from "./routes/projects-page";

const appLoader = async () => {
  const supabase = createBrowserClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return redirect("/login");
  }

  return { userUuid: session.user.id };
};

export type AppLoaderType = typeof appLoader;

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
    loader: appLoader,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
        loader: settingsLoader,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];

const router = createBrowserRouter(routes);

export function MasonRouterProvider() {
  return <RouterProvider router={router} />;
}
