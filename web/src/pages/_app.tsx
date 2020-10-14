import "leaflet/dist/leaflet.css";
import "../../styles/global.css";
import "../../styles/pages/landing.css";
import "../../styles/pages/orphanage.css";
import "../../styles/components/sidebar.css";
import "../../styles/pages/create-orphanage.css";
import "../../styles/pages/orphanages-map.css";

import type { AppProps /*, AppContext */ } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
