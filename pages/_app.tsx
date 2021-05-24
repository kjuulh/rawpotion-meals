import UserProvider from "../src/context/userContext";
import { Provider } from "react-redux";

import store from "../src/lib/redux/store";
import "tailwindcss/tailwind.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <style global jsx>
        {`
          html {
            height: 100%;
            height: -webkit-fill-available;
          }
          body {
            min-height: 100vh;
            min-height: -webkit-fill-available;
            position: fixed;
            width: 100vw;
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
          <Component {...pageProps} />
        </UserProvider>
      </Provider>
    </>
  );
}
