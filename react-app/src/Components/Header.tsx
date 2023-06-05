import SearchBar from "./SearchBar.tsx";
import {useHistory} from "react-router-dom";

function Header(){
    const history = useHistory()
    return (
        <div className={"header-div"}>
            <img
                className={"fifa_logo"}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/FIFA_logo_without_slogan.svg/799px-FIFA_logo_without_slogan.svg.png?20230319073010"
                alt="fifa logo"
                onClick={() => {
                    history.push('/')
                }}
            />
            <SearchBar/>
        </div>
    );
}

export default Header