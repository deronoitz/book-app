import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast from "./";
import styles from "./Toast.module.scss";

interface ToastContextProps {
  showToast: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const useToast = (): ToastContextProps => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<string[]>([]);

  function showToast(message: string) {
    setToasts([...toasts, message]);
    setTimeout(() => {
      setToasts((currentToasts) => currentToasts.slice(1));
    }, 2000); // Remove the toast after 2 seconds
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className={styles.toastContainer}>
        {toasts.map((message, index) => (
          <Toast key={index} message={message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
