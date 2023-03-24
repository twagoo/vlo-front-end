

export function fqToFacetSelectionMap(fq) {
    if (fq === null) {
        return {};
    } else if (!Array.isArray(fq)) {
        return fqToFacetSelectionMap([fq]);
    } else {
        //TODO convert
    }
}

export function facetSelectionMapToFq(map) {
    // TODO: convert
}
