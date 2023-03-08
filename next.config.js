const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const DEFAULT_LOG_LEVEL = 'INFO'
const DEV_LOG_LEVEL = 'DEBUG'

module.exports = async (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    serverRuntimeConfig: {
      logLevel: determineLogLevel(phase),
      vloServiceBaseUrl: process.env.VLO_SERVICE_BASE_URL,
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
    }
  }

  if (process.env.BUILD_FOR_DOCKER) {
    nextConfig['output'] = 'standalone';
  }

  return nextConfig
}

function determineLogLevel(phase) {
  if (process.env.VLO_FRONT_END_LOG_LEVEL) {
    console.log('Logging at configured', process.env.VLO_FRONT_END_LOG_LEVEL, 'level - overriding default', DEFAULT_LOG_LEVEL);
    return process.env.VLO_FRONT_END_LOG_LEVEL;
  } else if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log('Development server phase detected - logging at', DEV_LOG_LEVEL, 'level - overriding default', DEFAULT_LOG_LEVEL);
    return DEV_LOG_LEVEL;
  } else {
    return DEFAULT_LOG_LEVEL;
  }
}

