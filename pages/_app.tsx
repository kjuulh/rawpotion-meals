import UserProvider from "../lib/context/userContext";
import { Provider } from "react-redux";

import store from "../lib/redux/store";
import { FC } from "react";

import "styles/globals.css";

const Noop: FC = ({ children }) => <>{children}</>;

export default function App({ Component, pageProps }) {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <style global jsx>
        {`
          html {
            height: 100%;
            height: -webkit-fill-available;
            box-sizing: border-box;
          }
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

      <Provider store={store}>
        <UserProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserProvider>
      </Provider>
    </>
  );
}
