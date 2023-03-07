import getConfig from 'next/config';
import log from '@/util/logging';

import { getRecord } from '@/service/VloApiClient';

import { Container, Row, Col, Alert } from 'react-bootstrap';

function Record({ record, section, error }) {

    if (error) {
        return (
            <Alert variant='danger'>{error}</Alert>
        );
    } else {

        return (
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
        );
    }
}

function recordToProps(ctx, record) {
    return {
        props: {
            section: ctx.params['section'] || 'info',
            record: record
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
