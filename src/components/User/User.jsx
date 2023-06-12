import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserAction";
import { Link } from "react-router-dom";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  return (
    <div className="follower">
      <div>
        <Link
          to={`/profile/${person._id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={
              publicFolder + person.profilePicture
                ? publicFolder + person.profilePicture
                : publicFolder + "defaultProfile.png"
            }
            alt="profile"
            className="followerImage"
          />
        </Link>
        <div className="name">
          <Link
            to={`/profile/${person._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <span>@{person.username}</span>
          </Link>
          <span
            style={{ color: "var(--gray)", fontSize: "12px" }}
            title="click to go to user profile"
          >
            {person.isAdmin
              ? "Adminstrator"
              : person.isPsychiatrist === "yes"
              ? "Psychiatrist"
              : person.department
              ? person.department
              : ""}
          </span>
        </div>
      </div>
      <button
        className={following ? "button fc-button" : "fc-button UnfollowButton"}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
