const Records = ({records}) => {
    const recordsList = records.map(record =>{
        return <div key={record.id}>
            <h2>{record.fields.name}</h2>
            <p>{record.fields.description}</p>
        </div>
    });

    return (
        <div>
            <h1>Records</h1>
            {recordsList}
        </div>
    )
}

Records.getInitialProps = async () => {
    const res = await fetch('http://localhost:8708/records');
    const json = await res.json();
    return {
        records: json
    }
  };

export default Records;