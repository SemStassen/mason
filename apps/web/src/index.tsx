// WARNING: BE CAREFUL SAVING THIS FILE WITH A FORMATTER ENABLED. The import order is important and goes against prettier's recommendations.
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";

import "@mason/ui/globals.css";

import App from "./app";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Suspense>
      <App />
    </Suspense>
  </React.StrictMode>,
);
