import React, { isValidElement } from 'react';
import { render, fireEvent, screen, } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import user from '@testing-library/user-event'


import Form from './Form'

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

  describe(Form, () => {
    it("tells to login if not logged in", () => {
        renderWithReduxAndRouter(<Form />);
        expect(screen.getByText("Please Sign In to create your own memories and like other's memories.")).toBeInTheDocument;
    });

    it("has submit button", () => {
        localStorage.setItem('profile', JSON.stringify(mockUser))
        renderWithReduxAndRouter(<Form />);
        expect(screen.getByRole("button", {name: "Submit"})).toBeInTheDocument;
    });

    it("has clear button", () => {
        localStorage.setItem('profile', JSON.stringify(mockUser))
        renderWithReduxAndRouter(<Form />);
        expect(screen.getByRole("button", {name: "Clear"})).toBeInTheDocument;
    });


  });