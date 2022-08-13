

const SearchBar = ({searchTerm, setSearchTerm, setPage}) => {

    const onChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    }

    return (
        <input type='text' value={searchTerm} onChange={onChange}></input>
    )
}

export default SearchBar;