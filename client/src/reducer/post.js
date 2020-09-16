import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
} from "../actions/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, actions) {
  const { type, payload } = actions;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        loading: false,
        posts: payload,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
}
