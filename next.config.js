const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

const DEV_LOG_LEVEL = 'DEBUG'

module.exports = async (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    serverRuntimeConfig: {
      logLevel: determineLogLevel(phase)
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
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    console.log('Development server phase detected - logging at', DEV_LOG_LEVEL, 'level - overriding default');
    return DEV_LOG_LEVEL;
  } else {
    return null;
  }
}

