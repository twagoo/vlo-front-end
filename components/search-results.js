import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';

export default function SearchResults({ records, query, pagination }) {
    return (
        <Stack gap={3} className='my-3'>
            {records.length <= 0 && <div>No results</div>}
            {records.length > 0 && records.map(record =>
                <div key={record.id} className='pt-2 px-lg-2 bg-light'>
                    <h2>
                        <Link href={`/records/${encodeURIComponent(record.id)}`}>{record.fields.name || 'Untitled'}</Link>
                    </h2>
                    <p>{record.fields.description}</p>
                </div>
            )}
        </Stack>
    )
}
