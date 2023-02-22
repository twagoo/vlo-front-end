export default function SearchResults({ records }) {
    const recordsList = records.map(record => {
        const link = "record/" + record.id;
        return <div key={record.id}>
            <h2><a href={link}>{record.fields.name}</a></h2>
            <p>{record.fields.description}</p>
        </div>
    });

    return (
        <div>
            {recordsList}
        </div>
    )
}
