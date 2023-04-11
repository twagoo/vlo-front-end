import { useRouter } from 'next/router';
import log from '@/util/logging';

import { getRecord } from '@/service/VloApiClient';
import { fqToFacetSelectionMap } from "@/service/ParameterConverter"

import { Container, Row, Col, Alert, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import { omitBy, isNil } from 'lodash';

function searchQueryParamsFromRouter(router) {
    //TODO: make this common?

    // copy from router.query
    const queryParams = router.query;
    //TODO: add pagination
    const params = {
        q: queryParams.q,
        fq: queryParams.fq //TODO: fix case of multiple values
    };
    return new URLSearchParams(omitBy(params, isNil));;
}

function Record({ record, section, error }) {

    // TODO: get search context from client state
    const searchContext = {};

    const router = useRouter();
    const searchQueryParams = searchQueryParamsFromRouter(router);

    if (error) {
        return (
            <Alert variant='danger'>{error}</Alert>
        );
    } else {
        return (
            <>
                <Breadcrumb>
                    <BreadcrumbItem href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem href={`/search?${searchQueryParams}`}>Search</BreadcrumbItem>
                    <BreadcrumbItem href={`/records/${record.id}?${searchQueryParams}`}>{record.fields.name}</BreadcrumbItem>
                </Breadcrumb>
                <Container fluid="md">
                    <h1>{record.fields.name}</h1>
                    <h2>{section}</h2>
                    <Row>
                        <Col sm="2">Identifier</Col>
                        <Col>{record.id}</Col>
                    </Row>
                    <Row>
                        <Col sm="2">Description</Col>
                        <Col>{record.fields.description}</Col>
                    </Row>
                </Container>
            </>
        );
    }
}

function recordToProps(ctx, record) {
    return {
        props: {
            record: record,
            section: ctx.params['section'] || 'info'
        },
        revalidate: 60 // revalidation limit
    };
}

function errorProps(err) {
    log.error(err);
    return {
        props: {
            error: err.message
        }
    };
}

export async function getStaticProps(ctx) {
    const id = ctx.params['id'];

    return await getRecord(id, {
        success: (record) => recordToProps(ctx, record),
        notFound: () => ({ notFound: true }),
        error: errorProps
    });
}

export async function getStaticPaths() {
    // Returning an empty paths list enables incremental static regeneration
    return { paths: [], fallback: 'blocking' };
}

export default Record;
