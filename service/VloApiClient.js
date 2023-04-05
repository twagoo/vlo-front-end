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

function reqParamsForSearch(query, fqs, pagination) {
    let params = new URLSearchParams();
    if (query != null && query !== '') {
        params.append('q', query);
    }
    if (pagination != null) {
        params.append('from', pagination.from);
        params.append('size', pagination.pageSize);
    }
    if (fqs != null) {
        if (Array.isArray(fqs)) {
            fqs.forEach(fq => params.append('fq', fq));
        } else {
            params.append('fq', fqs);
        }
    }

    return new URLSearchParams(params);
}

export function getSearchResult(q, fq, pagination) {
    const reqParams = reqParamsForSearch(q, fq, pagination);
    const reqUrl = SERVICE_BASE_URL + '/records?' + reqParams;

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
    const reqUrl = SERVICE_BASE_URL + '/facets?' + reqParams;

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
