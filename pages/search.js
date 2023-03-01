import { useState } from "react";
import getConfig from 'next/config'

import { Container, Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

import SearchResults from "@/components/search-results";

const { publicRuntimeConfig } = getConfig()
const SERVICE_BASE_URL = publicRuntimeConfig.vloServiceBaseUrl;

function Search(props) {
    const [records, setRecords] = useState(props.records);
    const [query, setQuery] = useState(props.query);

    const submitSearch = async function (e) {
        e.preventDefault();
        console.log('Submit query: ', query);

        const reqUrl = requestUrlParams({ q: query });

        const res = await fetch(reqUrl);
        const json = await res.json();

        setRecords(json);
    }

    return (
        <>
            <h2>Search</h2>
            <Row>
                <Col md="6">
                    <Form method="get" onSubmit={submitSearch}>
                        <Form.Group controlId="query">
                            <InputGroup>
                                <Button type="button" variant="outline-secondary" onClick={e => setQuery('')}><XCircle /></Button>
                                <Form.Control type="search" name="q" placeholder="Query"
                                    value={query}
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
            <SearchResults records={records} />
        </>
    )
}

function requestUrlParams(reqParams) {
    return SERVICE_BASE_URL + '/records?' + new URLSearchParams(reqParams);
}

function requestUrlForContext(ctx) {
    const reqParams = {};
    const q = ctx.query['q'];
    if (q) {
        reqParams.q = q;
    }

    return requestUrlParams(reqParams);
}

Search.getInitialProps = async (ctx) => {
    const reqUrl = requestUrlForContext(ctx);

    const res = await fetch(reqUrl);
    const resultsJson = await res.json();
    return {
        records: resultsJson.records,
        query: ctx.query['q']
    }
};

export default Search;
