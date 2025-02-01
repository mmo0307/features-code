# DataFetcher

------------
const DataFetcher = ({ url, render }) => {
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then(setData)
            .catch(setError)
            .finally(() => setLoading(false));
    }, [url]);

    return render({data, loading, error});
};

------------
```
<DataFetcher
    url="https://api.github.com/users/defunkt"
    render={({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        
        if (error) return <p>Error!</p>;
        
        return (<ul>
            {data.map(item => <li>{item.name}</li>)}
        </ul>)
    }} 
    />
```
