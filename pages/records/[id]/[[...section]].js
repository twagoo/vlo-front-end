// Framework features
import { useRouter } from 'next/router';

// Services, business logic, utility functions
import log from '@/util/logging';
import { getRecord } from '@/service/VloApiClient';
import { fqToFacetSelectionMap, toURLSearchParams } from "@/service/ParameterConverter"

// Components
import { Container, Alert, Breadcrumb, BreadcrumbItem } from 'react-bootstrap';
import RecordContent from '@/components/record-content';

/**
 * Record page
 * @param {*} props 
 * @returns 
 */
function Record({ record, section, error }) {

    // copy state from router.query (URL query parameters)
    const { q, fq, pagination } = useRouter().query;
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
                    <BreadcrumbItem id="breadcrumb-home" href="/">Home</BreadcrumbItem>
                    <BreadcrumbItem id="breadcrumb-search" href={`/search?${searchQueryParams}`}>Search</BreadcrumbItem>
                    <BreadcrumbItem id="breadcrumb-record" href={`/records/${record.id}?${searchQueryParams}`}>{record.fields.name}</BreadcrumbItem>
                </Breadcrumb>
                <Container fluid="md">
                    <RecordContent record={record} section={section} />
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
