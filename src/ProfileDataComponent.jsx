import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfileDataComponent = ({ username }) => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}`
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="container">
      {userData ? (
        <div className="profile-container">
          <img
            src={userData.avatar_url}
            alt={`${userData.login}'s avatar`}
            className="DPimage"
          />
          <p>{userData.name}</p>
          <h2>
            @{userData.login}{" "}
            <a
              href={`https://github.com/${userProfile.login}`}
              target="_blank"
              rel="noopener noreferrer"
            ></a>
          </h2>
          <p>Location: {userData.location}</p>
          <p>Joined: {userData.created_at}</p>
          <div className="tiles">
            <p>Repos: {userData.public_repos}</p>
            <p>Followers: {userData.followers}</p>
            <p>Following: {userData.following}</p>
          </div>
        </div>
      ) : (
        <h2 className="loading-message">Loading user data...</h2>
      )}
    </div>
  );
};

export default ProfileDataComponent;
