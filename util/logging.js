import _log from 'loglevel';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

const envLogLevel = process.env.VLO_FRONT_END_LOG_LEVEL;
if (envLogLevel) {
    console.log('Logging at [', envLogLevel, '] level as configured in environment (VLO_FRONT_END_LOG_LEVEL)- overriding any default');
    _log.setLevel(envLogLevel);
} else if (serverRuntimeConfig.logLevel) {
    const logLevel = serverRuntimeConfig.logLevel;
    _log.info('Setting log level to [', logLevel, '] as per NextJS configuration');
    _log.setLevel(logLevel);
} else {
    console.log('No log level configured, using loglevel library defaults');
}

export default _log;
