/* import statements*/
import React, {useState, useEffect} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom'; // DO A 'npm install react-router-dom'
import {AppBar, Avatar, Typography, Toolbar, Button} from '@material-ui/core';
import memories from '../../images/memories.png';
import {Provider, useDispatch} from 'react-redux';
import { configureStore } from "@reduxjs/toolkit"; //  IMPORTANT!!!! DO AN npm install '@reduxjs/toolkit' --legacy-peer-deps
import authReducer from '../../reducers/auth';
//import decode from 'jwt-decode';

//for front end styles
import useStyles from './styles';


const NavWrapper = () => {
  const store = configureStore({reducer: authReducer});

  return (
    <Provider store={store}> 
      <Navbar /> 
    </Provider>
  );
};

/*
* navbar from App.js
*/
const Navbar = () => {
    const classes = useStyles(); //-- line for CSS styles frontend design
    const history = useHistory();
    const location = useLocation();
    //used for login and logout. used to get user
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);
    const dispatch = useDispatch();
    //logout functionality for the logout button defined later below
    const logout = () =>{
        dispatch({type: 'LOGOUT'});
        history.push('/'); // go to home page
        setUser(null); //no more user bc logged out
    };

    useEffect(()=>{
        ///JWT manual sign up

        //const token = user?.token;

        //if(token) {
          //  const decodedToken = decode(token);

            //if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        //}

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);
    //const user = null;
    /*
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
                <Typography className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="dreamio" height= "60" />

        </AppBar>
    */
    
    
    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Link to="/" ><img className={classes.image}  src={memories} alt="dreamio" height= "150" width="150" /></Link>
            </div>
            <Button component={Link} to="/friendRequest" variant="contained" color="primary">Friend Request</Button>
        
            <Toolbar className={classes.toolbar}>
                
                <Button component={Link} to="/community" variant="contained" color="primary">Community Feels</Button>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Link to={`/user/${user.result.name}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        </Link>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>                    
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Login</Button>

                )}
            </Toolbar>
        </AppBar>
       
    );
    

};


export default NavWrapper;
