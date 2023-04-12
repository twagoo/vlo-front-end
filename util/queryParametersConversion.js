// Functions
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";
import pick from "lodash/pick";

import { facetSelectionMapToFq } from "@/service/ParameterConverter"

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