import getConfig from 'next/config';
import log from '@/util/logging';

const { serverRuntimeConfig } = getConfig();
const SERVICE_BASE_URL = process.env.VLO_SERVICE_BASE_URL;

if (SERVICE_BASE_URL) {
    log.info('Service base URL configured as', SERVICE_BASE_URL);
} else {
    log.error('Missing critical configuration value in environment: ', SERVICE_BASE_URL);
}

async function apiRequest(reqUrl, { success, notFound, error }) {

    try {
        const response = await fetch(reqUrl);
        if (response.ok) {
            const json = await response.json();
            return success(json);
        } else if (response.status == 404) {
            return notFound();
        } else {
            return error({ message: response.statusText });
        }
    } catch (e) {
        return error(e);
    }
}

function reqParamsForSearch(query, fq, pagination) {
    let params = {};
    if (query != null) {
        params = { q: query };
    }
    if (fq != null) {
        if (!(Array.isArray(fq) && fq.length == 0)) {
            params = {
                ...params,
                fq: fq
            };
        }
    }
    if (pagination != null) {
        params = {
            ...params,
            from: pagination.from,
            size: pagination.pageSize
        };
    }

    return params;
}

export function getSearchResult(q, fq, pagination) {
    const reqParams = reqParamsForSearch(q, fq, pagination);
    const reqUrl = SERVICE_BASE_URL + '/records?' + new URLSearchParams(reqParams);

    log.debug('Requesting search results from', reqUrl);

    function handleError(err) {
        throw (new Error(err));
    }

    return apiRequest(reqUrl, {
        success: (json) => json,
        error: handleError,
        notFound: () => {
            // this should not happen at this endpoint, so if we get here treat it as an error
            return handleError('Not found');
        }
    });

}


export function getFacets(q, fq) {
    const reqParams = reqParamsForSearch(q, fq);
    const reqUrl = SERVICE_BASE_URL + '/facets?' + new URLSearchParams(reqParams);

    log.debug('Requesting search results from', reqUrl);

    function handleError(err) {
        throw (new Error(err));
    }

    return apiRequest(reqUrl, {
        success: (json) => json,
        error: handleError,
        notFound: () => {
            // this should not happen at this endpoint, so if we get here treat it as an error
            return handleError('Not found');
        }
    });

}

export function getRecord(id, { success, notFound, error }) {
    const reqUrl = `${SERVICE_BASE_URL}/records/${id}`;
    return apiRequest(reqUrl, { success, notFound, error });
}
