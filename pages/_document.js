import { Html, Head, Main, NextScript } from 'next/document'
import { Container } from "react-bootstrap";

export default function Document() {
  return (
    <Html lang="en">
      <Head></Head>
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
