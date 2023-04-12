import log from '@/util/logging';
import { assign, includes, merge, partition, union, without } from 'lodash';
import { XLg } from "react-bootstrap-icons";

function FacetsOverview({ facets, selection, setSelection }) {

    const addToSelection = (e, facetName, value) => {
        e.preventDefault();
        log.info('Facet selected');
        const change = {};
        change[facetName] = union([value], selection[facetName]);
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

    const isSelectedValue = function (facet, value) {
        if (selection[facet.name]) {
            return includes(selection[facet.name], value.value);
        } else {
            return false;
        }
    }

    const renderFacetValue = function (facet, facetSelection, value) {
        const valueLabel = value && (value.label || value.value);

        if (facetSelection && facetSelection.includes(value.value)) {
            return (
                <li key={value.value}>
                    {valueLabel}
                    <a href="#"
                        onClick={(e) => { removeFromSelection(e, facet.name, value.value); }}><XLg /></a>
                </li>
            );
        }

        return (
            <li key={value.value}>
                <a href="#"
                    onClick={(e) => { addToSelection(e, facet.name, value.value); }}>
                    {valueLabel}</a> ({value.count})
            </li>
        );

    }

    const renderFacet = function (facet) {
        if (facet.values.length > 0) {
            const renderValue = value => renderFacetValue(facet, selection[facet.name], value);

            // partition into selected / not selected
            const partitions = partition(facet.values, v => isSelectedValue(facet, v));

            return (
                <div key={facet.name} className='bg-light'>
                    <h2>{facet.name}</h2>
                    <ul>{[
                        // selected values
                        partitions[0].length > 0 && [
                            partitions[0].map(renderValue),
                            // divider if there are unselected values to be shown
                            (partitions[1].length > 0 && <hr />)
                        ],
                        //unselected values
                        partitions[1].map(renderValue)
                    ]}</ul>
                </div>
            )
        }
    };

    return (
        <>
            {facets.length > 0 && facets.map(renderFacet)}
        </>);
}

export default FacetsOverview;