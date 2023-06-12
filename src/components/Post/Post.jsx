import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/Like.png";
import NotLike from "../../img/Notlike.png";
import { likePost } from "../../api/PostsRequests";
import { deletePost } from "../../api/PostsRequests";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import menuIcon from "../../img/menu.png";
import DeleteModal from "../DeleteModal/DeleteModal";
import CommentSection from "./CommentSection";

const Post = ({ data }) => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [postOption, setPostOption] = useState(false);
  const [delModalOpened, setDelModalOpened] = useState(false);
  //const [postOwner, setPostOwner] = useState(data.postOwnerData[0] ? data.postOwnerData[0].username :"")
  const postOwner = data.postOwnerData[0] ? data.postOwnerData[0] : "";
  // profile data babi added
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [openComment, setOpenComment] = useState(false);
  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const { comments, loading } = useSelector((state) => state.commentReducer);
  const commentss = comments.filter((comment)=> comment.postId === data._id);

  return (
    <div className="Post">
      <div className="detail">
        <div>
        <Link
              to={`/profile/${postOwner._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
          <img
            src={
              publicFolder + postOwner.profilePicture
                ? publicFolder + postOwner.profilePicture
                : publicFolder + "defaultProfile.png"
            }
            alt="profile"
            className="followerImage"
          />
          </Link>
          <div className="name">
            <Link
              to={`/profile/${postOwner._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            ><div>
              <span title="click to go to user profile">
                @{postOwner.username}
              </span>
            </div></Link>
              <div>
                <span style={{ color: "var(--gray)", fontSize: "12px" }} title="click to go to user profile">
                {postOwner.isAdmin?"Adminstrator":postOwner.isPsychiatrist==="yes"? "Psychiatrist":postOwner.department?postOwner.department:""}
              </span> 
              </div>
             
            
          </div>
        </div>
        {params.id === user._id && (
          <div>
            <img
              src={menuIcon}
              alt=""
              title={postOption ? "hide delete" : "show delete"}
              style={{ cursor: "pointer", height: "1.5rem", width: "1.5rem" }}
              onClick={() => setPostOption((postOption) => !postOption)}
            />

            <div style={{ display: postOption ? "flex" : "none" }}>
              <button
                className="editDeleteButton"
                onClick={() => setDelModalOpened(true)}
              >
                delete
              </button>
            </div>
            <DeleteModal
              location={"post"}
              delModalOpened={delModalOpened}
              setDelModalOpened={setDelModalOpened}
              data={data}
              user={user}
            />
          </div>
        )}
      </div>

      <div className="description">
        <p># {data.desc}</p>
      </div>

      <img
        src={
          data?.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""
        }
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: "pointer" }}
          onClick={handleLike}
        />
        <img
          src={Comment}
          alt=""
          onClick={() => setOpenComment((prev) => !prev)}
          style={{ cursor: "pointer" }}
        />
        {/* <img src={Share} alt="" /> */}
      </div>
      <div style={{display: "flex", gap: "1rem"}}>
         <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {likes} likes
      </span>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {commentss?.length} comments
      </span>
      </div>
     
      {openComment && 
       <div>
          <CommentSection post = {data}/>
      </div> 
      }
    </div>
  );
};

export default Post;
