import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import ProfileDataComponent from "./ProfileDataComponent";
import "./App.css";

function App() {
  const [usernameInput, setUsernameInput] = useState("");
  const [userProfile, setUserProfile] = useState(null);

  const fetchData = () => {
    fetch(`https://api.github.com/users/${usernameInput}`)
      .then((response) => response.json())
      .then((data) => setUserProfile(data))
      .catch((error) => console.log(error));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Search</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/profile/:username"
            element={
              <div>
                <div>
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </div>
                <h1 className="title">Github User Profile</h1>

                <ProfileDataComponent
                  username={userProfile ? userProfile.login : ""}
                />
              </div>
            }
          />

          <Route
            path="/"
            element={
              <div>
                <h2>Find Github User Profile</h2>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="Enter GitHub username"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                  />
                </form>

                {userProfile !== null ? (
                  <div>
                    <img
                      src={userProfile.avatar_url}
                      alt={`Avatar of ${userProfile.login}`}
                      className="DPimage"
                    />
                    <p className="name12">{userProfile.name}</p>
                    <p>
                      <a
                        href={`https://github.com/${userProfile.login}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        @{userProfile.login}
                      </a>
                    </p>
                    <p>Location: {userProfile.location}</p>
                    <p>Joined: {userProfile.created_at}</p>
                    <p>Repos: {userProfile.public_repos}</p>
                    <p>Followers: {userProfile.followers}</p>
                    <p>Following: {userProfile.following}</p>
                  </div>
                ) : (
                  <h2></h2>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
