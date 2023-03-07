import { useState } from "react";
import { useRouter } from 'next/router';

import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

import SearchResults from "@/components/search-results";
import SearchResultPagination from "@/components/search-pagination";

import { getSearchResult } from "@/service/VloApiClient"

const DEFAULT_PAGE_SIZE = 5;

function Search(props) {
    const { records, pagination } = props;
    const [query, setQuery] = useState(props.query);

    const router = useRouter();
    const pushStateToRouter = function (q, from) {
        router.push({
            query: {
                q: q,
                from: from
            }
        });
    }

    const handleSearchFormSubmit = function (e) {
        e.preventDefault();
        pushStateToRouter(query, pagination.from);
    }

    const updatePagination = function (newFrom) {
        pushStateToRouter(query, newFrom);
    }

    return (
        <>
            <h2>Search</h2>
            <Row>
                <Col md="6">
                    <Form method="get" onSubmit={handleSearchFormSubmit}>
                        <Form.Group controlId="query">
                            <InputGroup>
                                <Button type="button" variant="outline-secondary" onClick={e => setQuery('')}><XCircle /></Button>
                                <Form.Control type="search" name="q" placeholder="Query"
                                    value={query || ''}
                                    onChange={e => setQuery(e.target.value)}>
                                </Form.Control>
                                <Button type="submit">Search</Button>
                            </InputGroup>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            <hr />
            <h3>Search results</h3>
            <SearchResultPagination {...pagination} setFrom={updatePagination} />
            <SearchResults records={records} />
            <SearchResultPagination {...pagination} setFrom={updatePagination} />
        </>
    )
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
    const resultsJson = await getSearchResult(q, pagination);

    return {
        props: {
            records: resultsJson.records,
            pagination: { ...pagination, numFound: resultsJson.numFound },
            query: q
        }
    };
}

export default Search;
