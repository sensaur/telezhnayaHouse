import "./App.css";
import Home from "./pages/Home"
import SingleRoom from "./pages/SingleRoom"
import Rooms from "./pages/Rooms"
import Error from "./pages/Error"
import NavBar from "./components/NavBar";
import {Route, Switch} from "react-router-dom";
import Form from "./components/Form"

function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/rooms' component={Rooms}/>
                <Route exact path='/rooms/:slug' component={SingleRoom}/>
                <Route exact path='/request' component={Form}/>
                <Route component={Error}/>
            </Switch>
        </>
    );
}

export default App;
