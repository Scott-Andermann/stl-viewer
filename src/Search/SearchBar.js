import styled from 'styled-components';

const SearchBarContainer = styled.form`
height: 2.5rem;
width: 80%;
margin: 2rem auto;
position: relative;
`

const SearchBarInput = styled.input`
height: 100%;
width: 100%;
margin: auto;
border-radius: 0.5rem;
font-size: 1.5rem;
padding: 0;
padding-left: 1rem;
`

const SearchButton = styled.button`
position: absolute;
height: 2.5rem;
right: 0;
top: 2px;
width: 100px;
font-size: 1.5rem;
color: blue;
border: none;
background: none;
`

const SearchBar = ({ searchTerm, setSearchTerm, setPage, fetchSearch }) => {

    const onChange = (e) => {
        setSearchTerm(e.target.value);
        setPage(1);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        fetchSearch();
    }

    return (
        <SearchBarContainer onSubmit={onSubmit}>
            <SearchBarInput type='text' value={searchTerm} onChange={onChange}></SearchBarInput>
            <SearchButton type='submit' >Search</SearchButton>
        </SearchBarContainer>
    )
}

export default SearchBar;