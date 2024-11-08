import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Settings } from "~/app//settings";
import { RootLayout } from "~/app/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },
]);

export function MasonRouterProvider() {
  return <RouterProvider router={router} />;
}
