const commentReducer = (
  state = {
    comments: null,
    loading: false,
    error: false,
  },
  action
) => {
  switch (action.type) {
    // belongs Post.jsx
    case "COMMENT_FETCH_START":
      return { ...state, loading: true, error: false };
    case "COMMENT_FETCH_SUCCESS":
      return { ...state, comments: action.data, loading: false, error: false };
    case "COMMENT_FETCH_FAIL":
      return { ...state, loading: false, error: true };

    case "COMMENT_CREATE_START":
      return { ...state, error: false };
    case "COMMENT_CREATE_SUCCESS":
      return {
        ...state,
        comments: [action.data, ...state.comments],
        error: false,
      };
    case "COMMENT_CREATE_FAIL":
      return { ...state, error: true };

    case "COMMENT_UPDATE_START":
      return { ...state, error: false, loading: true };
    case "COMMENT_UPDATE_SUCCESS":
      const comments = [...state.comments];
      const commentIndex = comments.findIndex(
        (comment) => comment._id === action.data._id
      );
      comments[commentIndex] = action.data;
      return { ...state, comments, loading: false };
    case "COMMENT_UPDATE_FAIL":
      return { ...state, loading: false, error: true };
      
    case "COMMENT_DELETE_SUCCESS":
      const allComments = [...state.comments];
      allComments.filter((comment)=>comment._id !== action.data._id) 
      return {...state, comments:allComments.filter((comment)=>comment._id !== action.data._id), loading: false }
    default:
      return state;
  }
};

export default commentReducer;
