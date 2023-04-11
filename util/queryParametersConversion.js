// Functions
import isNil from "lodash/isNil";
import omitBy from "lodash/omitBy";

import { facetSelectionMapToFq } from "@/service/ParameterConverter"

export function toQueryParams(query, facetSelection, pagination) {
    const fq = facetSelectionMapToFq(facetSelection);

    return omitBy({
        q: query,
        fq: fq,
        from: (pagination || {})['from'],
        pageSize: (pagination || {})['pageSize']
    }, isNil);
}