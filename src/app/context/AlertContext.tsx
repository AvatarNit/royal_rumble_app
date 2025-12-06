"use client";

import { createContext, useContext, useState } from "react";

type AlertType = "success" | "danger" | "warning" | "info";

export interface Alert {
  message: string;
  type: AlertType;
}

export interface AlertContextType {
  alert: Alert | null;
  showAlert: (message: string, type?: AlertType) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alert, setAlert] = useState<Alert | null>(null);

  function showAlert(message: string, type: AlertType = "success") {
    setAlert({ message, type });

    // Auto dismiss after 3 seconds
    setTimeout(() => setAlert(null), 3000);
  }

  function clearAlert() {
    setAlert(null);
  }

  return (
    <AlertContext.Provider value={{ alert, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

// ⭐ IMPORTANT FIX ⭐
// Force TypeScript to treat the return type as guaranteed.
export function useAlert(): AlertContextType {
  const ctx = useContext(AlertContext);
  if (!ctx) {
    throw new Error("useAlert must be used inside <AlertProvider>");
  }
  return ctx;
}
