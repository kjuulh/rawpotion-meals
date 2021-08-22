import { Provider } from "react-redux";

import store from "../lib/redux/store";
import { FC } from "react";

import "styles/globals.css";
import Head from "next/head";
import Monitoring from "@lib/monitoring";
import { useGetWeatherForecastQuery } from "@lib/api";

const Noop: FC = ({ children }) => <>{children}</>;

const InitializeAuth = (props) => {
  useGetWeatherForecastQuery({});

  return <>{props.children}</>;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DefaultApp = ({ Component, pageProps, err }) => {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>Rawpotion Mealplanner</title>

        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <style global jsx>
        {`
          html {
            height: 100%;
            height: -webkit-fill-available;
            box-sizing: border-box;
          }

          body {
            min-height: 100vh;
            min-height: -webkit-fill-available;
            box-sizing: border-box;
          }

          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          input:-webkit-autofill:active {
            -webkit-box-shadow: 0 0 0 30px white inset !important;
          }

          @supports (-webkit-appearance: none) {
            body {
              min-height: calc(100vh - 56px);
            }
          }
        `}
      </style>

      <Monitoring>
        <Provider store={store}>
          <InitializeAuth>
            <Layout>
              <Component {...pageProps} err={err} />
            </Layout>
          </InitializeAuth>
        </Provider>
      </Monitoring>
    </>
  );
};
export default DefaultApp;
