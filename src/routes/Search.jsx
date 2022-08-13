import {useState} from 'react';
import SearchBar from '../Search/SearchBar';


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
            <h2>Search</h2>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} setPage={setPage}/>
            <button onClick={fetchSearch}>Search</button>
            {/* <button onClick={fetchPopular}>Show Popular Things</button> */}


            {/* need search bar, results table and pagination function */}
            <table>
                <thead>
                    <tr>
                        <td>Name</td>
                        <td>Creator</td>
                        <td>Thingiverse Link</td>
                        <td>Preview</td>
                    </tr>
                    {data.length > 0 && data.map(element => <tr>
                        <td>{element.name}</td>
                        <td>{element.creator.name}</td>
                        <td><a href={element.public_url} target='_blank' rel='noreferrer'>link</a></td>
                        <td><img src={element.preview_image} alt='preview iamge'/></td>
                    </tr>)}
                </thead>
            </table>
            {data.length > 0 && <button onClick={fetchSearch}>Load more results</button>}
        </main>
    )
}

export default Search