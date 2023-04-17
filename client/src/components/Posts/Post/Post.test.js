import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Post from './Post';
import { deletePost, likePost } from '../../../actions/posts';

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

const samplePost = {
    _id: '1',
    title: 'Sample Title',
    message: 'Sample Message',
    name: 'Sample User',
    creator: '1',
    tags: ['tag1', 'tag2'],
    selectedFile: 'sampleFile.jpg',
    likes: [],
    createdAt: '2023-04-17T00:00:00.000Z',
  };

  const renderWithReduxAndRouter = (component) => {
    return render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>
    );
  };

  describe('Post Component', () => {
    test('renders Post component', () => {
      renderWithReduxAndRouter(<Post post={samplePost} />);
      expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
      expect(screen.getByText(/Sample Message/i)).toBeInTheDocument();
      expect(screen.getByText(/Sample User/i)).toBeInTheDocument();
    });
  
    // Add other tests here
  });

  jest.mock('../../../actions/posts', () => ({
    deletePost: jest.fn(),
    likePost: jest.fn(),
  }));
  


  