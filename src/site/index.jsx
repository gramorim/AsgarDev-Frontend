import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Intro from "site/pages/intro.jsx";
import Main from "site/pages/main.jsx";
import { hist } from "index.js"
import PrivateRoute from "components/PrivateRoute.jsx";

class App extends React.Component {
    render(){
        return (
        <Router history={hist}>
            <Switch>
                <PrivateRoute path={"/main"} component={Main}/>;
                <Route path={"/"} component={Intro}/>;
            </Switch>
        </Router>
        )
    }
}

export default App;