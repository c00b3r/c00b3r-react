// pages/_app.tsx
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../../store/store";
import { ThemeProvider } from "../context/LightDarkThemeContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
