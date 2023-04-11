import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

// VLO API client method
import { getSearchResult, getFacets } from "@/service/VloApiClient"
import { fqToFacetSelectionMap } from "@/service/ParameterConverter"
import { toQueryParams } from "@/util/queryParametersConversion";

// Components
import { Container, Row, Col, Alert, Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import SearchForm from "@/components/search-form";
import SearchResults from "@/components/search-results";
import SearchResultPagination from "@/components/search-pagination";
import FacetsOverview from "@/components/facets-overview";

const DEFAULT_PAGE_SIZE = 10;

export async function getServerSideProps(ctx) {
    const q = ctx.query['q'] || null;
    const fq = ctx.query['fq'] || [];

    let from = 0;
    if (ctx.query['from']) {
        from = parseInt(ctx.query['from']);
    }
    const pagination = {
        from: from,
        pageSize: ctx.query['pageSize'] || DEFAULT_PAGE_SIZE
    };

    try {
        const resultsJson = await getSearchResult(q, fq, pagination);
        const facets = await getFacets(q, fq);

        return {
            props: {
                records: resultsJson.records,
                pagination: { ...pagination, numFound: resultsJson.numFound },
                query: q,
                fq: fq,
                facets: facets
            }
        };
    } catch (err) {
        return {
            props: {
                error: err.message
            }
        };
    }
}

function setUpRouteChangeHandler(router, setLoading) {
    // Unset 'loading' state when a route change completes or errors
    const onRouteChange = () => { setLoading(false) };
    router.events.on('routeChangeComplete', onRouteChange);
    router.events.on('routeChangeError', onRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method:
    return () => {
        router.events.off('routeChangeComplete', onRouteChange);
        router.events.off('routeChangeError', onRouteChange);
    };
}

function pushStateToRouter(router, q, facetSelection, pagination) {
    router.push({
        query: toQueryParams(q, facetSelection, pagination)
    });
}

function Search(props) {
    const { error, records, pagination, facets } = props;
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(props.query);

    // parse facet selection
    const [facetSelection, setFacetSelection] = useState(fqToFacetSelectionMap(props.fq));

    const router = useRouter();

    useEffect(setUpRouteChangeHandler.bind(this, router, setLoading));

    const handleSearchFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        pushStateToRouter(router, query, facetSelection, { ...pagination, from: 0 });
    }

    const updatePagination = (newFrom) => {
        setLoading(true);
        pushStateToRouter(router, query, facetSelection, { ...pagination, from: newFrom });
    }

    const handleUpdateFacetSelection = (newSelection) => {
        setLoading(true);
        pushStateToRouter(router, query, newSelection, { ...pagination, from: 0 })
    }

    if (error) {
        return (
            <>
                <Alert variant='danger'>{error}</Alert>
            </>
        )
    } else {
        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem href={`/search?${new URLSearchParams(toQueryParams(query, facetSelection, pagination))}`}>Search</BreadcrumbItem>
                </Breadcrumb>
                <Container fluid="md">
                    <Row>
                        <Col md="12">
                            <SearchForm query={query} setQuery={setQuery} onSubmit={handleSearchFormSubmit} />
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col md="3">
                            <FacetsOverview facets={facets} selection={facetSelection} setSelection={handleUpdateFacetSelection} />
                        </Col>
                        <Col md="9">
                            {records.length <= 0 && <div>No results</div>}
                            {records.length > 0 && (
                                <>
                                    <p>Showing {pagination.numFound} results</p>
                                    <SearchResultPagination {...pagination} setFrom={updatePagination} />
                                    <SearchResults records={records} query={query} facetSelection={facetSelection} pagination={pagination} loading={loading} />
                                    <SearchResultPagination {...pagination} setFrom={updatePagination} />
                                </>
                            )}</Col>
                    </Row>
                </Container >
            </>
        );
    }
}

export default Search;
