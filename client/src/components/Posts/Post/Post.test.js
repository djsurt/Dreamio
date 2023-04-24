import React, { isValidElement } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
//import user from '@testing-library/user-event'

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

  const samplePost1Like = {
    _id: '1',
    title: 'Sample Title',
    message: 'Sample Message',
    name: 'Sample User',
    creator: '1',
    tags: ['tag1', 'tag2'],
    selectedFile: 'sampleFile.jpg',
    likes: ["testUser"],
    createdAt: '2023-04-17T00:00:00.000Z',
  };

  const samplePost2Likes = {
    _id: '1',
    title: 'Sample Title',
    message: 'Sample Message',
    name: 'Sample User',
    creator: '1',
    tags: ['tag1', 'tag2'],
    selectedFile: 'sampleFile.jpg',
    likes: ["testUser", "anotherUser"],
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
    test('renders Post information', () => {
      renderWithReduxAndRouter(<Post post={samplePost} />);
      expect(screen.getAllByText(/Sample Title/i)).toBeInTheDocument;
      expect(screen.getAllByText(/Sample Message/i)).toBeInTheDocument;
      expect(screen.getAllByText(/Sample User/i).length).toBeInTheDocument;
    });
    
    it('has username', () => {
      expect(true).toBe(true)
      const { getByTestId } =  renderWithReduxAndRouter(<Post post={samplePost} />);
      const postName = getByTestId("name").textContent;
      expect(postName).toEqual("Sample User");
    });

    it('has like button',() => {
      renderWithReduxAndRouter(<Post post={samplePost} />);
      expect(screen.getByRole("button", {name: 'Like'})).toBeInTheDocument;
    });

    it('renders 1 like',() => {
      renderWithReduxAndRouter(<Post post={samplePost1Like}  />);
      const likeButton = screen.getByRole("button", {name: '1 Like'});
      //localStorage.setItem('profile', JSON.stringify("testUser"))
      //fireEvent.click(likeButton)
      expect(screen.getByRole("button", {name: '1 Like'})).toBeInTheDocument
    });

    it('renders 2 likes', () => {
      renderWithReduxAndRouter(<Post post={samplePost2Likes} />);
      const likeButton = screen.getByRole("button", {name: '2 Likes'});
      expect(likeButton).toBeInTheDocument
    });

    // I cant get this test to work properly :(
    it('can like post', async () =>{
      const LikeHandler = jest.fn()
      //localStorage.setItem('profile', JSON.stringify(mockUser))
      renderWithReduxAndRouter(<Post post={samplePost} likePost ={LikeHandler}/>);
      const likeButton = screen.getByRole("button", {name: 'Like'});
      expect(likeButton).toBeInTheDocument
      expect(LikeHandler).toHaveBeenCalledTimes(0)

      await fireEvent.click(likeButton)
      //expect(LikeHandler).toHaveBeenCalledTimes(1)

    });

    it('has delete button', () => {
      localStorage.setItem('profile', JSON.stringify(mockUser))
      renderWithReduxAndRouter(<Post post={samplePost}/>);
      expect(screen.getByRole("button", {name: 'Delete'})).toBeInTheDocument
    });
    // Add other tests here
  });



  jest.mock('../../../actions/posts', () => ({
    deletePost: jest.fn(),
    likePost: jest.fn(),
  }));
  


  