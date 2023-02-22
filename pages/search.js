const SERVICE_BASE_URL = 'http://localhost:8708';

function Search({ records, query }) {
    const recordsList = records.map(record => {
        const link = "record/" + record.id;
        return <div key={record.id}>
            <h2><a href={link}>{record.fields.name}</a></h2>
            <p>{record.fields.description}</p>
        </div>
    });

    return (
        <div>
            <h1>Records</h1>
            <form method="get">
                <input type="search" name="q" placeholder="Query" defaultValue={query}></input>
                <input type="submit" value="Search" />
            </form>
            <hr />
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

Search.getInitialProps = async (ctx) => {
    const reqUrl = requestUrlForContext(ctx);

    const res = await fetch(reqUrl);
    const json = await res.json();
    return {
        records: json,
        query: ctx.query['q']
    }
};

export default Search;
