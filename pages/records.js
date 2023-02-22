const SERVICE_BASE_URL = 'http://localhost:8708';

function Records({ records }) {
    const recordsList = records.map(record => {
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

function requestUrlForContext(ctx) {
    const reqParams = {};
    const q = ctx.query['q'];
    if (q) {
        reqParams.q = q;
    }

    return SERVICE_BASE_URL+'/records?' + new URLSearchParams(reqParams);
}

Records.getInitialProps = async (ctx) => {
    const reqUrl = requestUrlForContext(ctx);

    const res = await fetch(reqUrl);
    const json = await res.json();
    return {
        records: json
    }
};

export default Records;
