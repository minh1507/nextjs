import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import Route from "next/router";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import Toast from "@/components/toast";
import { wrapper } from "@/store/index";
import { Provider } from "react-redux";

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    Route.events.on("routeChangeStart", (url: any) => {
      setLoading(true);
    });

    Route.events.on("routeChangeComplete", (url: any) => {
      setLoading(false);
    });

    Route.events.on("routeChangeError", (url: any) => {
      setLoading(false);
    });

    return () => {
      Route.events.off("routeChangeStart", (url: any) => {
        setLoading(true);
      });
      Route.events.off("routeChangeComplete", (url: any) => {
        setLoading(false);
      });
      Route.events.off("routeChangeError", (url: any) => {
        setLoading(false);
      });
    };
  }, []);
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      {loading && (
        <section className="loading">
          <div className="lds-hourglass"></div>
        </section>
      )}
      <SessionProvider>
        <Toast />
        <Header />

        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default App;
