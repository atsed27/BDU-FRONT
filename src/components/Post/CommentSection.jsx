import React, { useEffect, useState } from "react";
import "./CommentSection.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteComment, updateComment } from "../../actions/CommentAction";
import { createComment } from "../../actions/CommentAction";
import menuIcon from "../../img/menu.png";
import DeleteModal from "../DeleteModal/DeleteModal";

function CommentSection({ post }) {
  const dispatch = useDispatch();
  const { comments, loading } = useSelector((state) => state.commentReducer);
  const commentss = comments.filter((comment) => comment.postId === post._id);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);

  const [commentText, setCommentText] = useState("");
  const [newComment, setNewComment] = useState();
  const [showAllComments, setShowAllComments] = useState(false);
  //const [editCommentIndex, setEditCommentIndex] = useState(-1);
  const [editComment, setEditComment] = useState(false);
  const [postOption, setPostOption] = useState(false);
  const [delModalOpened, setDelModalOpened] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState();
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (editCommentIndex !== -1) {
  //     const updatedComments = [...comments];
  //     updatedComments[editCommentIndex] = newComment;
  //     // setComments(updatedComments);
  //     setEditCommentIndex(-1);
  //   } else {
  //     //  setComments([...comments, newComment]);
  //   }
  //   setNewComment("");
  // };

  // const handleDeleteComment = (index) => {
  //   const updatedComments = [...comments];
  //   updatedComments.splice(index, 1);
  //   // setComments(updatedComments);
  // };

  // const handleEditComment = (index) => {
  //   setNewComment(comments[index]);
  //   setEditCommentIndex(index);
  // };
  const handleSubmit = (event) => {
    event.preventDefault();
    if (editComment) {
      const userId = user._id;
      const data = { commentText, userId };
      const comId = newComment._id;
      dispatch(updateComment(comId, data));
      setCommentText("");
    } else {
      const postId = post._id;
      const userId = user._id;
      const data = {
        commentText,
        userId,
      };
      dispatch(createComment(postId, data));
      setCommentText("");
    }
  };

  const handleDeleteComment = (comment) => {  
    const comId = comment._id;
    const userId = comment.userId;
    dispatch(deleteComment(comId, userId))
  }
  const handleEditComment = (comment) => {
    setEditComment(true);
    setCommentText(() => comment.commentText);
    setNewComment(() => comment);
  };
  const handleCancelButton = () => {
    setCommentText("");
    setEditComment(false);
  };

  const handleViewAllComments = () => {
    setShowAllComments(true);
  };

  const commentCount = commentss.length;
  return (
    <>
      {loading ? (
        "loading comments"
      ) : (
        <div className="comment-section">
          {showAllComments ? (
            <div>
              <p>Total comments: {commentCount}</p>
              <ul>
                {commentss.map((comment, index) => (
                  <li key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link
                        to={`/profile/${comment?.userId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <img
                          src={
                            publicFolder +
                            comment?.commentOwnerData[0].profilePicture
                              ? publicFolder +
                                comment?.commentOwnerData[0].profilePicture
                              : publicFolder + "defaultProfile.png"
                          }
                          alt="profile"
                          className="followerImage"
                          title={
                            "Go to " +
                            comment?.commentOwnerData[0].username +
                            "'s profile"
                          }
                          style={{ height: "40px", width: "40px" }}
                        />
                      </Link>
                      <div style={{ paddingLeft: "1rem" }}>
                        {comment?.commentText}
                      </div>
                    </div>
                    {/* ------------------ */}
                    {comment.userId === user._id && (
                      <div style={{display: "flex", alignItems: "center"}}>
                        <div>
                          <img
                          src={menuIcon}
                          alt=""
                          title={postOption ? "hide delete" : "show delete"}
                          style={{
                            cursor: "pointer",
                            height: "1.5rem",
                            width: "1.5rem",
                          }}
                          onClick={() =>
                            setPostOption((postOption) => !postOption)
                          }
                        /> 
                        </div>
                       

                        <div
                          style={{ display: postOption ? "flex" : "none" }}
                          className="comment-buttons"
                        >
                          <button onClick={() => handleDeleteComment(comment)}>
                            Delete
                          </button>
                          <button onClick={() => handleEditComment(comment)}>
                            Edit
                          </button>
                        </div>
                        <DeleteModal
                          location={"comment"}
                          delModalOpened={delModalOpened}
                          setDelModalOpened={setDelModalOpened}
                          data={commentToDelete}
                          user={user}
                        />
                      </div>
                    )}
                    {/* ------------------------ */}

                    {/* <div className="comment-buttons">
                      <button onClick={() => handleDeleteComment(index)}>
                        Delete
                      </button>
                      <button onClick={() => handleEditComment(comment)}>
                        Edit
                      </button>
                    </div> */}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              {commentss.length === 0 && <p>No comments yet!</p>}
              <ul>
                {commentss.slice(0, 3).map((comment, index) => (
                  <li key={index}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <Link
                        to={`/profile/${comment?.userId}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <img
                          src={
                            publicFolder +
                            comment?.commentOwnerData[0].profilePicture
                              ? publicFolder +
                                comment?.commentOwnerData[0].profilePicture
                              : publicFolder + "defaultProfile.png"
                          }
                          style={{ height: "40px", width: "40px" }}
                          title={
                            "Go to " +
                            comment?.commentOwnerData[0].username +
                            "'s profile"
                          }
                          alt="profile"
                          className="followerImage"
                        />
                      </Link>
                      <div style={{ paddingLeft: "1rem" }}>
                        {comment?.commentText}
                      </div>
                    </div>
                    {/* -------------------------- */}
                    {comment.userId === user._id && (
                      <div style={{display: "flex", alignItems:"center"}}>
                        <div>
                         <img
                          src={menuIcon}
                          alt=""
                          title={postOption ? "hide delete" : "show delete"}
                          style={{
                            cursor: "pointer",
                            height: "1.5rem",
                            width: "1.5rem",
                          }}
                          onClick={() =>
                            setPostOption((postOption) => !postOption)
                          }
                        /> 
                        </div>
                        

                        <div
                          style={{ display: postOption ? "flex" : "none" }}
                          className="comment-buttons"
                        >
                          <button onClick={() => handleDeleteComment(comment)}>
                            Delete
                          </button>
                          <button onClick={() => handleEditComment(comment)}>
                            Edit
                          </button>
                        </div>
                        <DeleteModal
                          location={"comment"}
                          delModalOpened={delModalOpened}
                          setDelModalOpened={setDelModalOpened}
                          data={commentToDelete}
                          user={user}
                        />
                      </div>
                    )}
                    {/* ------------------------------- */}
                    {/* <div className="comment-buttons">
                      <button onClick={() => handleDeleteComment(index)}>
                        Delete
                      </button>
                      <button onClick={() => handleEditComment(comment)}>
                        Edit
                      </button>
                    </div> */}
                  </li>
                ))}
              </ul>
              {commentss.length > 3 && (
                <button style={{marginTop: "10px"}} onClick={handleViewAllComments}>
                  View all comments ({commentCount})
                </button>
              )}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <label>
              {editComment ? "Edit your comment:" : "Add a comment:"}
              <input
                type="text"
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />
            </label>
            <button type="submit">{editComment ? "Save" : "Comment"}</button>
            {editComment && (
              <button type="button" onClick={() => handleCancelButton()}>
                Cancel
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}

export default CommentSection;
