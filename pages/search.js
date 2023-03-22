import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

// VLO API client method
import { getSearchResult } from "@/service/VloApiClient"

// Components
import { Row, Col, Alert } from "react-bootstrap";
import SearchForm from "@/components/search-form";
import SearchResults from "@/components/search-results";
import SearchResultPagination from "@/components/search-pagination";

const DEFAULT_PAGE_SIZE = 10;

export async function getServerSideProps(ctx) {
    const q = ctx.query['q'] || null;

    let from = 0;
    if (ctx.query['from']) {
        from = parseInt(ctx.query['from']);
    }
    const pagination = {
        from: from,
        pageSize: ctx.query['pageSize'] || DEFAULT_PAGE_SIZE
    };

    try {
        const resultsJson = await getSearchResult(q, pagination);

        return {
            props: {
                records: resultsJson.records,
                pagination: { ...pagination, numFound: resultsJson.numFound },
                query: q
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

function pushStateToRouter(router, q, pagination) {
    router.push({
        query: {
            q: q,
            from: pagination.from,
            pageSize: pagination.pageSize
        }
    });
}

function Search(props) {
    const { error, records, pagination } = props;
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState(props.query);

    const router = useRouter();

    useEffect(setUpRouteChangeHandler.bind(this, router, setLoading));

    const handleSearchFormSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        pushStateToRouter(router, query, { ...pagination, from: 0 });
    }

    const updatePagination = (newFrom) => {
        setLoading(true);
        pushStateToRouter(router, query, { ...pagination, from: newFrom });
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
                <h2>Search</h2>
                <Row>
                    <Col md="6">
                        <SearchForm query={query} setQuery={setQuery} onSubmit={handleSearchFormSubmit} />
                    </Col>
                </Row>
                <hr />
                <h3>Search results</h3>
                {records.length <= 0 && <div>No results</div>}
                {records.length > 0 && (
                    <>
                        <SearchResultPagination {...pagination} setFrom={updatePagination} />
                        <SearchResults records={records} query={query} pagination={pagination} loading={loading} />
                        <SearchResultPagination {...pagination} setFrom={updatePagination} />
                    </>
                )}
            </>
        );
    }
}

export default Search;
