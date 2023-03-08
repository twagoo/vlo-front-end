import Stack from 'react-bootstrap/Stack';
import Link from 'next/link';
import classNames from 'classnames';

export default function SearchResults({ loading, records, query, pagination }) {
    return (
        <Stack gap={3} className={classNames('my-3', 'pt-2', 'px-lg-2', { 'opacity-25': loading })}>
            {records.length <= 0 && <div>No results</div>}
            {records.length > 0 && records.map(record =>
                <div key={record.id} className='bg-light'>
                    <h2>
                        <Link href={`/records/${encodeURIComponent(record.id)}`}>{record.fields.name || 'Untitled'}</Link>
                    </h2>
                    <p>{record.fields.description}</p>
                </div>
            )}
        </Stack>
    )
}
