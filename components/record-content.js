// Components
import { Row, Col, Tab, Tabs, Table } from 'react-bootstrap';
import { last, split, truncate } from 'lodash';

const refTruncateOptions = {
    length: 100
};

function refToLabel(ref) {
    if (ref.length - 3 <= refTruncateOptions.length) {
        return ref;
    } else {
        // truncate in the middle
        const filePart = last(split(ref, '/'));
        const preambleLength = refTruncateOptions.length - filePart.length;
        if(preambleLength <= 0) {
            return `...${truncate(filePart, refTruncateOptions)}`;
        } else {
            return `${ref.substring(0,preambleLength-1)}.../${filePart}`;
        }
    }
}

export default function RecordContent({ record, section }) {
    return (
        <>
            <h1>{record.fields.name}</h1>
            <Tabs id="record-tabs" defaultActiveKey={section || 'info'}
                className='mb-3'>
                <Tab id="record-tabs-details" eventKey='info' title='Record details'>
                    <Row>
                        <Col sm="2">Identifier</Col>
                        <Col>{record.id}</Col>
                    </Row>
                    <Row>
                        <Col sm="2">Description</Col>
                        <Col>{record.fields.description}</Col>
                    </Row>
                </Tab>
                <Tab id="record-tabs-links" eventKey='links' title='Links'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Type</td>
                            </tr>
                        </thead>
                        <tbody>
                            {record.resources && record.resources.map(resource => (
                                <tr>
                                    <td><a href={resource.ref} title={resource.ref}>{refToLabel(resource.ref)}</a></td>
                                    <td>{resource.mediaType}</td>
                                </tr>
                            ))}
                            {
                                (!record.resources || record.resources.length === 0) && (
                                    <span>No resources</span>)
                            }
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </>
    );
}