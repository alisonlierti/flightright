import {
  FETCH_POSTS,
  FETCH_POST,
  CREATE_POST,
  DELETE_POST,
  UPDATE_POST
} from '../actions/';

export default function(state = {}, { type, payload }) {
  switch (type) {
    case FETCH_POSTS: {
      return { list: payload.data };
    }
    case FETCH_POST:
      const post = payload.data;
      return { post, ...state };
    case UPDATE_POST:
    case CREATE_POST: {
      const post = payload;
      return { ...state, post };
    }
    case DELETE_POST: {
      let posts = { ...state };
      posts.list = posts.list.filter(data => data.id !== payload);
      return { posts };
    }
    default: {
      return state;
    }
  }
}
