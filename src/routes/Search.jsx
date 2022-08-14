import {useState} from 'react';
import SearchBar from '../Search/SearchBar';
import DataTable from '../DataTable/DataTable';



const Search = () => {
    const [data, setData] = useState([])
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);

    // const fetchPopular = async () => {
    //     const response = await fetch(`https://api.thingiverse.com/popular?access_token=ed4e63e963ee3c92cdc7806f3cf085ac&page=${page}`);
    //     const result = await response.json();
    //     // console.log(result)
    //     setData(prev => [...prev, ...result]); 
    //     setPage(element => element + 1);
    // }

    const fetchSearch = async () => {

        console.log(searchTerm, page)
        const response = await fetch(`https://api.thingiverse.com/search/${searchTerm}?access_token=ed4e63e963ee3c92cdc7806f3cf085ac&page=${page}`);
        const result = await response.json();
        console.log(result.hits.length)
        if (result.hits.length > 0) {
            if (page === 1) setData(result.hits);
            else setData(prev => [...prev, ...result.hits]); 
            setPage(element => element + 1);
        } else {
            setData([]);
            setPage(1);
            alert(`No results found for ${searchTerm}`)
        }
    }

    return (
        <main>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage} fetchSearch={fetchSearch}/>
            {/* <button onClick={fetchPopular}>Show Popular Things</button> */}
            {data.length > 0 && <DataTable data={data} />}
            {data.length > 0 && <button onClick={fetchSearch}>Load more results</button>}
        </main>
    )
}

export default Search