import "leaflet/dist/leaflet.css";
import "../../styles/global.css";
import "../../styles/pages/orphanages-map.css";
import "../../styles/pages/landing.css";

import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
