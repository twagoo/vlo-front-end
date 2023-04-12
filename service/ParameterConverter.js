import log from '@/util/logging';
import { head, isNil, join, omitBy, pick, split, tail, toPairs } from 'lodash';

const DEFAULT_PAGE_SIZE = 10;

export function toURLSearchParams(query, facetSelection, pagination) {
    const params = toQueryParams(query, facetSelection, pagination);
    const result = new URLSearchParams(omitBy(pick(params, ['q', 'from', 'pageSize']), isNil));
    if (params.fq) {
        if (Array.isArray(params.fq)) {
            params.fq.forEach(fq => result.append('fq', fq));
        } else {
            result.append('fq', params.fq)
        }
    }
    return result;
}

export function toQueryParams(query, facetSelection, pagination) {
    const fq = facetSelectionMapToFq(facetSelection);

    return omitBy({
        q: query,
        fq: fq,
        from: (pagination || {})['from'],
        pageSize: (pagination || {})['pageSize']
    }, isNil);
}

export function searchStateFromQueryParameters(queryObject) {
    const q = queryObject['q'] || null;
    const fq = queryObject['fq'] || [];

    let from = 0;
    if (queryObject['from']) {
        from = parseInt(queryObject['from']);
    }
    const pagination = {
        from: from,
        pageSize: queryObject['pageSize'] || DEFAULT_PAGE_SIZE
    };

    return { q, fq, pagination };
}

export function fqToFacetSelectionMap(fqs) {
    log.debug('Converting FQ params to selection:', fqs);
    if (fqs === null) {
        return {};
    } else if (!Array.isArray(fqs)) {
        return fqToFacetSelectionMap([fqs]);
    } else {
        const selection = {};
        fqs.forEach(fq => {
            const fqSplit = split(fq, ':');
            if (fqSplit.length >= 2) {
                const name = head(fqSplit);
                const value = join(tail(fqSplit), ':');

                if (!selection[name]) {
                    selection[name] = [];
                }
                selection[name].push(value);
            }
        });

        log.info('fq:', fqs, '-> selection:', selection);
        return selection;
    }
}

export function facetSelectionMapToFq(selection) {
    log.debug('Converting selection to FQ params:', selection);
    const fq = [];
    if (typeof selection === 'object') {
        toPairs(selection).forEach(([facet, values]) => {
            if (Array.isArray(values)) {
                values.forEach((value) => {
                    fq.push(`${facet}:${value}`);
                })
            } else {
                fq.push(`${facet}:${values}`)
            }
        });

    }
    log.info('selection:', selection, '-> fq: ', fq);
    return fq;
}
