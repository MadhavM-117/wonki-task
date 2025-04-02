import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import { AppRoutes } from "./router.tsx";

import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SidebarProvider>
        <AppRoutes />
        <Toaster />
      </SidebarProvider>
    </BrowserRouter>
  </StrictMode>,
);
