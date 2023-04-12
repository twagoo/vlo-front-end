// Components
import { Row, Col, Tab, Tabs, Table } from 'react-bootstrap';

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
                                <td>Type</td>
                                <td>Name</td>
                                <td>...</td>
                            </tr>
                        </thead>
                        <tbody>
                            {record.fields._resourceRef && record.fields._resourceRef.map(element => (
                                <tr>
                                    <td></td>
                                    <td>{element}</td>
                                    <td></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Tab>
            </Tabs>
        </>
    );
}