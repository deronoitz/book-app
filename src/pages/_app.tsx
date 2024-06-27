import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";
import { ToastProvider } from "@/components/shared/Toast/ToastContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </SWRConfig>
  );
}
