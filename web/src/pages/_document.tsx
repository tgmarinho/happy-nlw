import Document, { Html, Head, Main, NextScript } from "next/document";
import { getStyles } from "typestyle";

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const page = await renderPage();
    // const styleTags = getStyles();
    return { ...page };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
