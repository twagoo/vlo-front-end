import log from '@/util/logging';
import object from 'lodash/object'
import split from 'lodash/split'
import head from 'lodash/head'
import tail from 'lodash/tail'
import join from 'lodash/join'

export function fqToFacetSelectionMap(fqs) {
    if (fqs === null) {
        return {};
    } else if (!Array.isArray(fqs)) {
        return fqToFacetSelectionMap([fqs]);
    } else {
        const result = {};
        fqs.forEach(fq => {
            const fqSplit = split(fq, ':');
            if (fqSplit.length >= 2) {
                const name = head(fqSplit);
                const value = join(tail(fqSplit));

                if (!result[name]) {
                    result[name] = [];
                }
                result[name].push(value);
            }
        });
        return result;
    }
}

export function facetSelectionMapToFq(selection) {
    log.debug('Converting selection to FQ params:', selection);
    const fq = [];
    if (typeof selection === 'object') {
        object.toPairs(selection).forEach(([facet, values]) => {
            if (Array.isArray(values)) {
                values.forEach((value) => {
                    fq.push(`${facet}:${value}`);
                })
            } else {
                fq.push(`${facet}:${values}`)
            }
        });

    }
    log.info('fq:', selection, '->', fq);
    return fq;
}
