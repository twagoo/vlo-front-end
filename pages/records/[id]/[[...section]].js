// Framework features
import { useRouter } from 'next/router';

// Services, business logic, utility functions
import log from '@/util/logging';
import { getRecord } from '@/service/VloApiClient';
import { fqToFacetSelectionMap } from "@/service/ParameterConverter"
import { toURLSearchParams } from '@/util/queryParametersConversion';

// Components
import { Container, Row, Col, Alert, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';

/**
 * Record page
 * @param {*} props 
 * @returns 
 */
function Record({ record, section, error }) {
    // copy state from router.query (URL query parameters)
    const { q, fq, pagination } =  useRouter().query;
    const searchQueryParams = toURLSearchParams(q, fqToFacetSelectionMap(fq), pagination);

    if (error) {
        // render error page
        return (
            <Alert variant='danger'>{error}</Alert>
        );
    } else {
        // render regular record page
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
