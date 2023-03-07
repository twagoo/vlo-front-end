import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Link from 'next/link';

export default function SearchResults({ records, query, pagination }) {
    const recordsList = records.map(record => {
        return <Row key={record.id} >
            <Col>
                <h2>
                    <Link href={`/records/${encodeURIComponent(record.id)}`}>{record.fields.name}</Link>
                </h2>
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
