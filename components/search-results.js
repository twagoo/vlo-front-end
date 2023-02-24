import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function SearchResults({ records }) {
    const recordsList = records.map(record => {
        const link = "record/" + record.id;
        return <Row key={record.id} >
            <Col>
                <h2><a href={link}>{record.fields.name}</a></h2>
                <p>{record.fields.description}</p>
            </Col>
        </Row>
    });

    return (
        <div>
            {recordsList}
        </div>
    )
}
