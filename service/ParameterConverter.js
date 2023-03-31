import log from '@/util/logging';
import object from 'lodash/object'

export function fqToFacetSelectionMap(fq) {
    if (fq === null) {
        return {};
    } else if (!Array.isArray(fq)) {
        return fqToFacetSelectionMap([fq]);
    } else {
        //TODO convert
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
