import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from "./types";

// get all posts
export const getPosts = () => async (dispatch) => {
  try {
    let res = await axios.get("/api/posts");
    dispatch({ type: GET_POSTS, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// ADD LIKE
export const addLike = (postId) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/posts/like/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch(setAlert("You have already liked this post", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove LIKE
export const removeLike = (postId) => async (dispatch) => {
  try {
    let res = await axios.put(`/api/posts/unlike/${postId}`);
    dispatch({ type: UPDATE_LIKES, payload: { postId, likes: res.data } });
  } catch (err) {
    dispatch(setAlert("You have not liked post yet", "danger"));
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// delete post
export const removePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({ type: DELETE_POST, payload: postId });
    dispatch(setAlert("Post deleted..", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add post
export const addPost = (formdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res = await axios.post(`/api/posts/`, formdata, config);

    dispatch({ type: ADD_POST, payload: res.data });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// get post
export const getPost = (id) => async (dispatch) => {
  try {
    let res = await axios.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: res.data });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add comment
export const addComment = (postId, formdata) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    let res = await axios.post(
      `/api/posts/comments/${postId}`,
      formdata,
      config
    );

    dispatch({ type: ADD_COMMENT, payload: res.data });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    console.log(err);
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// remove comment
export const removeComment = (postId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/posts/comments/${postId}/${commentId}`);

    dispatch({ type: REMOVE_COMMENT, payload: commentId });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
