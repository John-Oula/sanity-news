import SearchContext from "../contexts/SearchContext";

import {useState} from "react";

function ContextWrapper({children}) {

    const [searchResults, setSearchResults] = useState([])
    const [searching, setSearching] = useState(false)
    const [message, setMessage] = useState('')

    const values = {
        searchResults,
        setSearchResults,
        searching,
        setSearching, message, setMessage
    }
    return (
        <SearchContext.Provider value={values}>
            {children}

        </SearchContext.Provider>
    )

}

export default ContextWrapper