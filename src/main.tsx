import React from "react";
import { createRoot } from "react-dom/client";
import "src/app/styles/index.scss";
import App from "src/app/App";
import { StoreProvider } from "src/app/providers/StoreProvider";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <StoreProvider>
      <App />
    </StoreProvider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
