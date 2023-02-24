import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SERVICE_BASE_URL = 'http://localhost:8708';

function Record({ record }) {

    return (
        <Container fluid="md">
            <h1>{record.fields.name}</h1>
            <Row>
                <Col sm="2">Identifier</Col>
                <Col>{record.id}</Col>
            </Row>
            <Row>
                <Col sm="2">Description</Col>
                <Col>{record.fields.description}</Col>
            </Row>
        </Container>
    )
}

Record.getInitialProps = async (ctx) => {
    const id = ctx.query['id'];
    //TOOD: if no ID, error
    const reqUrl = SERVICE_BASE_URL + '/records/' + id;

    const res = await fetch(reqUrl);
    const json = await res.json();
    return {
        record: json
    }
};

export default Record;
