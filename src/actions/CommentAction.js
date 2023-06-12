import * as CommentApi from "../api/CommentRequest";

export const getAllComments = () => async (dispatch) => {
    dispatch({ type: "COMMENT_FETCH_START" });
    try{
    const {data} = await CommentApi.getAllComments();
    dispatch({type: "COMMENT_FETCH_SUCCESS",data: data})
    } catch(error) {
    dispatch({ type: "COMMENT_FETCH_FAIL" });
    }
    
}

export const createComment = (postId,data) => async (dispatch) => {
    dispatch({ type: "COMMENT_CREATE_START" });
    try {
      const createdComment = await CommentApi.createComment(postId,data);
      dispatch({ type: "COMMENT_CREATE_SUCCESS", data: createdComment.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "COMMENT_CREATE_FAIL" });
    }
  };
  
  export const updateComment = (comId,data) => async (dispatch) => {
    dispatch({ type: "COMMENT_UPDATE_START" });
    try {
      const updatedComment = await CommentApi.updateComment(comId,data);
      dispatch({ type: "COMMENT_UPDATE_SUCCESS", data: updatedComment.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: "COMMENT_UPDATE_FAIL" });
    }
  };
  export const deleteComment = (comId,userId) => async (dispatch) => {
    try {
      const deletedComment = await CommentApi.deleteComment(comId,userId);
      dispatch({ type: "COMMENT_DELETE_SUCCESS", data: deletedComment.data });
    } catch (error) {
      console.log(error);
    }
  };
  
