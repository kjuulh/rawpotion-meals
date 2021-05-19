import UserProvider from "../context/userContext";
import { Provider } from "react-redux";

import store from "../lib/redux/store";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}
