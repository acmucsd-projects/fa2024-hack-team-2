"use client";
import React, { useState } from "react";

// Dummy API-like data
const user = {
  id: 1,
  username: "JaneDoe123",
  followers: 256,
  following: 180,
  icon: "https://c8.alamy.com/comp/J93J1T/food-aliment-comic-face-eyes-potatoes-cartoon-potato-plant-potatoe-J93J1T.jpg",
  description: "Person living in San Francisco",
  bio: "aspiring designer and video editor",
  pronouns: "He/Him",
};

const posts = [
  {
    id: 1,
    name: "Yonsei Baseball Jacket",
    description: "A stylish jacket for sports lovers.",
    likes: 12,
    likedByUser: true,
    imageUrl: "https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559",
  },
  {
    id: 4,
    name: "Classic T-Shirt",
    description: "A simple t-shirt for everyday wear.",
    likes: 15,
    likedByUser: false,
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjazf4sKrskubw0510UfUT5B0K8eNzw0_q9w&s",
  },
];

// Settings Modal Component
const SettingsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  userData: Partial<typeof user>;
  onSave: (updates: Partial<typeof user>) => void;
}> = ({ isOpen, onClose, userData, onSave }) => {
  const [description, setDescription] = useState(userData.description || "");
  const [bio, setBio] = useState(userData.bio || "");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <label className="block mb-2">
          <span className="text-gray-600">Description</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <label className="block mb-2">
          <span className="text-gray-600">Bio</span>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded mt-1"
          />
        </label>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="text-gray-600">
            Cancel
          </button>
          <button
            onClick={() => {
              onSave({ description, bio });
              onClose();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

// Main User Page Component
const UserPage: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userData, setUserData] = useState(user);

  const handleSave = (updates: Partial<typeof user>) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="relative w-full">
      {/* Top Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-blue-500 to-blue-300 z-0"></div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userData={userData}
        onSave={handleSave}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-[20vh]">
        {/* User Information Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6 relative">
          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="absolute top-4 right-4 bg-gray-200 p-2 rounded-md"
          >
            ⚙️
          </button>

          {/* User Icon */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center shadow-md overflow-hidden">
            <img src={userData.icon} className="w-full h-full object-cover" />
          </div>

          {/* Followers and Following */}
          <div className="absolute top-4 left-4 flex gap-4 text-sm">
            <p>
              <strong>{userData.followers}</strong> Followers
            </p>
            <p>
              <strong>{userData.following}</strong> Following
            </p>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center mt-16">
            <h1 className="text-xl font-bold">{userData.username}</h1>
            <p className="text-gray-500 text-sm">{userData.description}</p>
            <p className="italic text-gray-400">{userData.bio}</p>
            <p className="text-gray-500 text-sm">{userData.pronouns}</p>
          </div>
        </div>

        {/* Posts Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold mb-4">Posts</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post) => (
              <a
                key={post.id}
                href="#"
                className="block p-2 rounded-lg shadow-md bg-gradient-to-b from-[#7390fb] to-black"
              >
                <img
                  src={post.imageUrl}
                  alt={post.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h3 className="font-bold text-sm text-white">{post.name}</h3>
                <p className="text-xs text-white opacity-70 truncate">{post.description}</p>
                <div className="absolute bottom-2 right-2 text-xs text-white">
                  <span>{post.likedByUser ? '❤️' : '🤍'}</span>
                  <span className="ml-1">{post.likes}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
