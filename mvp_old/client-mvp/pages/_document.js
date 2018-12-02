import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <html>
      <Head>
        <link href="https://widget.kyber.network/dapp-libs/v0.1/app.bundle.css?v=1538453945568" rel="stylesheet"/>
      </Head>
      <body>
      <Main />
      <NextScript />
      <script type="text/javascript" src="https://widget.kyber.network/dapp-libs/v0.1/app.min.js?v=1538453945568"/>
      </body>
      </html>
    )
  }
}
