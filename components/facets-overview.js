import log from '@/util/logging';
import assign from 'lodash/assign'
import merge from 'lodash/merge'
import without from 'lodash/without'
import { XLg } from "react-bootstrap-icons";

function FacetsOverview({ facets, selection, setSelection }) {

    const addToSelection = (e, facetName, value) => {
        e.preventDefault();
        log.info('Facet selected');
        const change = {};
        change[facetName] = [value];
        log.info('selection', selection, 'merge with change', change);
        setSelection(merge(selection, change));
    };

    const removeFromSelection = (e, facetName, value) => {
        e.preventDefault();
        log.info('Facet ');
        const change = {};
        change[facetName] = without(selection[facetName], value);
        log.info('selection', selection, 'merge with change', change);
        setSelection(assign(selection, change));
    };

    const renderFacetValue = function (facet, facetSelection, value) {
        if (facetSelection && facetSelection.includes(value.value)) {
            return (
                <li key={value.value}>
                    {value.value}
                    <a href="#"
                        onClick={(e) => { removeFromSelection(e, facet.name, value.value); }}><XLg /></a>
                </li>
            );
        }

        return (
            <li key={value.value}>
                <a href="#"
                    onClick={(e) => { addToSelection(e, facet.name, value.value); }}>
                    {value.value}</a> ({value.count})
            </li>
        );

    }

    return (
        <>
            {facets.length > 0 && facets.map(facet => {
                if (facet.values.length > 0)
                    return (
                        <div key={facet.name} className='bg-light'>
                            <h2>{facet.name}</h2>
                            {facet.values.length > 0 && <ul>{
                                facet.values.map(value => renderFacetValue(facet, selection[facet.name], value))
                            }</ul>}
                        </div>
                    )
            })}
        </>);
}

export default FacetsOverview;