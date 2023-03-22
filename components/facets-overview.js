
function FacetsOverview({ facets }) {
    return (
        <>
            {facets.length > 0 && facets.map(facet =>
                <div key={facet.name} className='bg-light'>
                    <h2>{facet.name}</h2>
                    {facet.values.length > 0 && <ul>{
                        facet.values.map(value =>
                            <li>{value.value} ({value.count})</li>
                        )
                    }</ul>}
                </div>
            )}
        </>);
}

export default FacetsOverview;