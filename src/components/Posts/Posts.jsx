import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/PostsAction";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import "./Posts.css";
import { useParams } from "react-router-dom";
import { getAllComments } from "../../actions/CommentAction";
import { getAllLostAndFounds } from "../../actions/LostAndFoundActions";

const Posts = ({location}) => {
  const params = useParams()
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);
  useEffect(() => {
    dispatch(getAllComments());
  }, []);
  useEffect(() => {
    dispatch(getAllLostAndFounds());
  }, []);
  if(!posts) return 'No Posts';
  if(params.id) posts = posts.filter((post)=> post.userId===params.id)
  return (
    <div className="Posts">
      {loading
        ? "Fetching posts...."
        :posts.map((post, id) => {
            return <Post data={post} key={id} location={location}/>;
          })}
    </div>
  );
};

export default Posts;
