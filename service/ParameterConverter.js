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
    const fq = [];
    if (typeof selection === 'object') {
        object.toPairs(selection).forEach(([facet, values]) => {
            values.forEach((value) => {
                fq.push(`${facet}:${value}`);
            })
        });

    }
    log.info('fq:', selection, '->', fq);
    return fq;
}
