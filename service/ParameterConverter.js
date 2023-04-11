import log from '@/util/logging';
import object from 'lodash/object'
import split from 'lodash/split'
import head from 'lodash/head'
import tail from 'lodash/tail'
import join from 'lodash/join'

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
    log.info('selection:', selection, '-> fq: ', fq);
    return fq;
}
