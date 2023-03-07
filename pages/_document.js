import { Html, Head, Main, NextScript } from 'next/document'
import { Container } from "react-bootstrap";
import Script from 'next/script'


export default function Document() {
  return (
    <Html lang="en">
      <Head>
        { /* TODO: bundled */ }
      <Script src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js" crossOrigin='anonymous'></Script>
      <Script src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js" crossOrigin='anonymous'></Script>
      <Script src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin='anonymous'></Script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
        integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65"
        crossOrigin="anonymous" />
      </Head>
      <body>
        <Container fluid="md">
          <h1>Virtual Language Observatory</h1>
          <Main />
        </Container>
        <NextScript />
      </body>
    </Html>
  )
}
