import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { StudentDataProvider } from "@/contexts/StudentDataContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <StudentDataProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StudentDataProvider>
    </AuthProvider>
  </React.StrictMode>
);

