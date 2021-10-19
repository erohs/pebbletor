import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import Navbar from './components/Navbar/Navbar';
import HillPage from "./pages/HillPage/HillPage";
// import Footer from './components/Footer/Footer';
import { io } from 'socket.io-client';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';

const socket = io("/");

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <Switch>
                    <div className="container">
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/edit/:id" render={props => (
                            <Edit id={props.match.params.id}/>
                        )} />
                        <Route path="/create">
                            <Create />
                        </Route>
                        <Route path="/hill/:id" render={props => (
                            <HillPage id={props.match.params.id} socket={socket} />
                        )} />
                    </div>
                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
