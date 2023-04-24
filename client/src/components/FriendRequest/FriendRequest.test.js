import React, { isValidElement } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import user from '@testing-library/user-event'

//import FriendRequest from './FriendRequest'

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

  describe('FriendRequest', () => {
    it('exists', () => {
        expect(true).toEqual(true)
    })
  })