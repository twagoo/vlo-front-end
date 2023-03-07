const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const DEFAULT_LOG_LEVEL = 'INFO'
const DEV_LOG_LEVEL = 'DEBUG'

module.exports = async (phase, { defaultConfig }) => {
  let logLevel = DEFAULT_LOG_LEVEL;
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log('Development server phase detected - logging at', DEV_LOG_LEVEL, 'level (overriding default', DEFAULT_LOG_LEVEL, ')');
    logLevel = DEV_LOG_LEVEL;
  }

  /** @type {import('next').NextConfig} */
  const nextConfig = {
    serverRuntimeConfig: {
      logLevel: logLevel,
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

  return nextConfig
}
