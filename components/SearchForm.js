import { useState } from "react";


const SearchForm = ({ onSearch }) => {

    const [username, setUsername] = useState('');

    const handleSearch = (evt) => {
        evt.preventDefault();
        onSearch(username);
    }

    return (
        <form onSubmit={handleSearch}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <button type="submit">Search</button>
        </form>
    )
};

export default SearchForm;