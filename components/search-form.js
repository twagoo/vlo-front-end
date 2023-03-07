
import { Form, InputGroup, Button } from "react-bootstrap";
import { XCircle } from "react-bootstrap-icons";

function SearchForm({ query, setQuery, onSubmit }) {
    return (
        <>
            <Form method="get" onSubmit={onSubmit}>
                <Form.Group controlId="query">
                    <InputGroup>
                        <Button type="button" variant="outline-secondary" onClick={e => setQuery('')}><XCircle /></Button>
                        <Form.Control type="search" name="q" placeholder="Query"
                            value={query || ''}
                            onChange={e => setQuery(e.target.value)}>
                        </Form.Control>
                        <Button type="submit">Search</Button>
                    </InputGroup>
                </Form.Group>
            </Form>
        </>);
}

export default SearchForm;