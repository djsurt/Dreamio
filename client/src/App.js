
import React from "react";
import { Container } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import FriendRequest from "./components/FriendRequest/FriendRequest";

const App = ()=>{
    return(
        <BrowserRouter>
            <Container maxWidth='lg'>
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/auth" exact component={Auth} />
                    <Route path="/friendRequest" exact component={FriendRequest} />
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default App;