import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import Layout from "../components/Layout";
import SimpleReactLightbox from "simple-react-lightbox";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <SimpleReactLightbox>
        <Component {...pageProps} />
      </SimpleReactLightbox>
    </Layout>
  );
}

export default MyApp;
