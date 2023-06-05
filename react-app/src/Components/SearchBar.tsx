import MagnifyingGlass from '../assets/pics/magnifying-glass-svgrepo-com (1).png'
import {useState} from "react";
import { useHistory } from 'react-router-dom'



function SearchBar(){



    const [state, setState] = useState('')
    const history = useHistory();
    return (
        <>
            <div>
                <img className={"magnifying-glass"} src={MagnifyingGlass} alt={"glass"}
                     onClick={() => {
                         window.localStorage.setItem("SEARCH_INPUT", state)
                         history.push('/')
                         history.push('/Search');
                     }}/>
                <input className={"search-bar"} type="text" placeholder="Search for a Team"
                onChange={(event) => {
                    setState(event.target.value);
                    // handleSearchClick(state)
                }}
                onKeyPress={(e) => {
                    if(e.key === "Enter") {
                        window.localStorage.setItem("SEARCH_INPUT", state)
                        history.push('/')
                        history.push('/Search');
                    }
                }}></input>
            </div>
        </>
    );
}

export default SearchBar