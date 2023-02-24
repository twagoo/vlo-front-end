/** @type {import('next').NextConfig} */

module.exports = {
  publicRuntimeConfig: {
    vloServiceBaseUrl: 'http://localhost:8708',
  },
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/search',
        permanent: true,
      },
    ]
  },
}
