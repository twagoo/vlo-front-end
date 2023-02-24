import { useState } from "react";
import getConfig from 'next/config'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchResults from "@/components/search-results";

const { publicRuntimeConfig } = getConfig()
const SERVICE_BASE_URL = publicRuntimeConfig.vloServiceBaseUrl;

function Search(props) {
    const [records, setRecords] = useState(props.records);
    const [query, setQuery] = useState(props.query);

    const submitSearch = async function (e) {
        console.log('Submit query: ', query);

        const reqUrl = requestUrlParams({ q: query });

        const res = await fetch(reqUrl);
        const json = await res.json();

        setRecords(json);
    }

    return (
        <Container fluid="md">
            <Row>
                <Col>
                    <h1>Records</h1>
                    <div>
                        <input type="search" name="q" placeholder="Query" defaultValue={query} onChange={e => setQuery(e.target.value)}></input>
                        <button onClick={submitSearch}>Search</button>
                    </div>
                </Col>
            </Row>
            <hr />
            <SearchResults records={records} />
        </Container>
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
    const json = await res.json();
    return {
        records: json,
        query: ctx.query['q']
    }
};

export default Search;
