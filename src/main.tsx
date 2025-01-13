import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router";
import MainRouter from "./router/MainRouter";
import { ThemeProvider } from "./hooks/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <MainRouter />
    </ThemeProvider>
      </BrowserRouter>
  </StrictMode>
);
