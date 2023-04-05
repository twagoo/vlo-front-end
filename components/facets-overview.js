import log from '@/util/logging';
import merge from 'lodash/merge'

function FacetsOverview({ facets, selection, setSelection }) {

    const addToSelection = (e, facetName, value) => {
        e.preventDefault();
        log.info('Facet selected');
        const change = {};
        change[facetName] = [value];
        log.info('selection', selection, 'merge with change', change);
        setSelection(merge(selection, change));
    };

    return (
        <>
            {facets.length > 0 && facets.map(facet =>
                <div key={facet.name} className='bg-light'>
                    <h2>{facet.name}</h2>
                    {facet.values.length > 0 && <ul>{
                        facet.values.map(value =>
                            <li key={value.value}><a href="#" onClick={(e) => { addToSelection(e, facet.name, value.value); }}>{value.value}</a> ({value.count})</li>
                        )
                    }</ul>}
                </div>
            )}
        </>);
}

export default FacetsOverview;