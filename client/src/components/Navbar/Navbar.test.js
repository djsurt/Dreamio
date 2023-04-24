import React, { isValidElement } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import user from '@testing-library/user-event'

import Navbar from './Navbar'

const rootReducer = (state = {}) => state;
const store = createStore(rootReducer);

const mockUser = {
    result: {
      _id: '1',
      googleId: '1',
      name: 'Sample User',
      email: 'sample.user@example.com',
      password: 'samplePassword',
      friends: [],
      friendRequests: [],
    },
  };  

const renderWithReduxAndRouter = (component) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    );
  };

describe(Navbar,()=>{
    it("has friend request button", () => {
        renderWithReduxAndRouter(<Navbar  />);
        expect(screen.getByRole("button", {name: 'Friend Request'})).toBeInTheDocument;
    });

    it("has Community Feels button", () => {
        renderWithReduxAndRouter(<Navbar  />);
        expect(screen.getByRole("button", {name: 'Community Feels'})).toBeInTheDocument;
    });

    it("has login button", () => {
        renderWithReduxAndRouter(<Navbar  />);
        expect(screen.getByRole("button", {name: 'Login'})).toBeInTheDocument;
    });

    it("has logout button", () => {
        localStorage.setItem('profile', JSON.stringify(mockUser))
        renderWithReduxAndRouter(<Navbar  />);
        expect(screen.getByRole("button", {name: 'Logout'})).toBeInTheDocument;
    });


    //I cant figure out button clicking
    it("can send logout request", async () => {
        localStorage.setItem('profile', JSON.stringify(mockUser))
        renderWithReduxAndRouter(<Navbar  />);
        expect(screen.getByRole("button", {name: 'Logout'})).toBeInTheDocument;
        const logoutButton = screen.getByRole("button", {name: 'Logout'})
        await fireEvent.click(logoutButton)
        // something to detect button click
    });


})