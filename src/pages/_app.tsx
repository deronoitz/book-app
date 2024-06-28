import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastProvider } from "@/components/shared/Toast/ToastContext";
import { ModalProvider } from "@/components/shared/Modal/ModalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ModalProvider>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </ModalProvider>
    </SWRConfig>
  );
}
