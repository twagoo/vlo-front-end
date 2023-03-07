import _log from 'loglevel';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
if (serverRuntimeConfig.logLevel) {
    const logLevel = serverRuntimeConfig.logLevel;
    _log.info('Setting log level to', logLevel, 'as configured');
    _log.setLevel(logLevel);
}

export default _log;