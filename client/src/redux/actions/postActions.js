import axios from "axios";

// Types
import {
  ADD_POST,
  GET_POST,
  POST_LOADING,
  GET_ERRORS,
  GET_POSTS
} from "./types";

// Add a post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts/", postData)
    .then(res =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get Posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading());

  axios
    .get("/api/posts/")
    .then(res =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

// Set Loading state
export const setPostLoading = () => ({
  type: POST_LOADING
});
