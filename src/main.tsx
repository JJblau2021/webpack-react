import { createRoot } from "react-dom/client";
import App from "./App";
import { isProd } from "./utils";
import React from "react";

createRoot(document.getElementById("root") as HTMLElement).render(
  isProd ? (
    <App />
  ) : (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
);
