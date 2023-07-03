 import { useState} from "react";
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './searchbar.css'
 import { faSearch } from '@fortawesome/free-solid-svg-icons';
 
 export default function SearchBar({filteredData}){
    const [query, setQuery] = useState("");
    const updateQuery = (val) => {
        setQuery(val);
    }



    return(
        // <div className='searchcomponent'>
            <form className="searchcomponent">
            <input type="text" 
            className="searchBar"
            // value={query}
            placeholder={"Search by location..."}
            onChange={(e) => updateQuery(e.target.value)}
            />
            <button type='button' className='SearchBtn' onClick={() => {filteredData(query)}}><FontAwesomeIcon icon={faSearch}/></button>
            </form>
        // </div>
    );
 }