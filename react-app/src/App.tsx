import Home from "./Home.tsx";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import SearchResults from "./Components/SearchResults.tsx";
import Header from "./Components/Header.tsx";
function App(){
    return (
        <Router>
            <div>
                <Header />
                    <Switch>
                        <Route exact path={"/"}>
                            <Home type={0}/>
                        </Route>
                        <Route exact path={"/Search"}>
                            <SearchResults />
                        </Route>
                    </Switch>

            </div>
        </Router>
    );
}

export default App