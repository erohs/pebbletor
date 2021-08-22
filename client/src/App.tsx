import React from 'react';
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import Edit from "./pages/Edit/Edit";
import Navbar from './components/Navbar/Navbar';
import Hill from './components/Hill/Hill';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import { io } from 'socket.io-client';
// import Footer from './components/Footer/Footer';

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
                        <Route path="/edit/:id">
                            <Edit />
                        </Route>
                        <Route path="/create">
                            <Create />
                        </Route>
                        <Route path="/hill/:id" render={(props) => (
                            <Hill size={{width: 1200, height: 450}} points={[[100,400],[300,350],[600,120],[900,350],[1100,400]]} id={props.match.params.id} socket={socket} />
                        )} />
                    </div>
                </Switch>
                {/* <Footer /> */}
            </div>
        </Router>
    );
}

export default App;
