import React, { useState } from "react";
import "./history.css";
// Post Card Component
const PostCard: React.FC<{ index: number }> = ({ index }) => {
  const [likes, setLikes] = useState(0); // save for when changing likes

  return (
    <div
      style={{
        width: 297,
        height: 468,
        background: "linear-gradient(180deg, #789EFF 65%, black)",
        borderRadius: 25.81,
        border: "1px solid #ccc",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <img
        style={{
          maxWidth: "100%",
          borderRadius: 15,
          marginBottom: 16,
        }}
        src="https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559"
        alt={`Post ${index}`}
      />
      <p
        style={{
          color: "white",
          fontSize: 14,
          textAlign: "center",
          margin: 0,
        }}
      >
        Post {index + 1}: Description.
      </p>
      <div
        style={{
          position: "absolute",
          bottom: 10,
          right: 10,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        
      >
        <span
          style={{
            fontSize: 20,
            color: "red",
            marginRight: 5,
          }}
        >
          ♥
        </span>
        <span
          style={{
            fontSize: 14,
            color: "white",
          }}
        >
          {likes}
        </span>
      </div>
    </div>
  );
};

// User Card Component
const UserCard: React.FC<{ index: number }> = ({ index }) => {
  return (
    <div
      style={{
        width: 297,
        height: 468,
        background: "linear-gradient(180deg, #789EFF 65%, black)",
        borderRadius: 25.81,
        border: "1px solid #ccc",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      <img
        style={{
          maxWidth: "100%",
          borderRadius: 10,
          marginBottom: 8,
        }}
        src="https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559"
        alt={`User ${index}`}
      />
      <p
        style={{
          color: "white",
          fontSize: 12,
          textAlign: "center",
          margin: 0,
        }}
      >
        User {index + 1}
      </p>
    </div>
  );
};

// View History Component
const ViewHistory: React.FC = () => {
  const [posts, setPosts] = useState<number[]>([]);
  const [users, setUsers] = useState<number[]>([]);
  const [showPosts, setShowPosts] = useState<boolean>(true);

  const addPost = () => {
    setPosts((prevPosts) => {
      const newPostIndex = prevPosts.length ? prevPosts[0] + 1 : 1;
      const newPosts = [newPostIndex, ...prevPosts];
      return newPosts.slice(0, 5);
    });
  };
  // an array that only stores the most recent 5 values
  const addUser = () => {
    setUsers((prevUsers) => {
      const newUserIndex = prevUsers.length ? prevUsers[0] + 1 : 1;
      const newUsers = [newUserIndex, ...prevUsers];
      return newUsers.slice(0, 5);
    });
  };

  return (
    <div className="app">
      <h1 className="title">View History</h1>
      <button className="add-button" onClick={addPost}>
        Add Post
      </button>
      --
      <button className="add-button" onClick={addUser}>
        Add User
      </button>
      ---
      <button className="toggle-view-button" onClick={() => setShowPosts(true)}>
        Posts
      </button>
      |
      <button
        className="toggle-view-button"
        onClick={() => setShowPosts(false)}
      >
        Users
      </button>
      <div
        className="card-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        {showPosts
          ? posts.map((index) => <PostCard key={index} index={index} />)
          : users.map((index) => <UserCard key={index} index={index} />)}
      </div>
    </div>
  );
};


export default ViewHistory;
