import { useState } from "react";
import { useRouter } from 'next/router';

// VLO API client method
import { getSearchResult } from "@/service/VloApiClient"

// Components
import { Row, Col, Alert } from "react-bootstrap";
import SearchForm from "@/components/search-form";
import SearchResults from "@/components/search-results";
import SearchResultPagination from "@/components/search-pagination";

const DEFAULT_PAGE_SIZE = 5;

function Search(props) {
    const { error, records, pagination } = props;
    const [query, setQuery] = useState(props.query);

    const router = useRouter();
    const pushStateToRouter = function (q, pagination) {
        router.push({
            query: {
                q: q,
                from: pagination.from,
                pageSize: pagination.pageSize
            }
        });
    }

    const handleSearchFormSubmit = function (e) {
        e.preventDefault();
        pushStateToRouter(query, { ...pagination, from: 0 });
    }

    const updatePagination = function (newFrom) {
        pushStateToRouter(query, { ...pagination, from: newFrom });
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
                <SearchResultPagination {...pagination} setFrom={updatePagination} />
                <SearchResults records={records} />
                <SearchResultPagination {...pagination} setFrom={updatePagination} />
            </>
        );
    }
}

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

export default Search;
