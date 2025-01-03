"use client";
import React, { useState } from "react";

const user = {
  id: 1,
  username: "JaneDoe123",
  followers: 256,
  following: 180,
  icon: "https://c8.alamy.com/comp/J93J1T/food-aliment-comic-face-eyes-potatoes-cartoon-potato-plant-potatoe-J93J1T.jpg",
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
  {
    id: 6,
    name: "Winter Coat",
    description: "Warm and stylish coat for cold weather.",
    likes: 20,
    likedByUser: false,
    imageUrl: "https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41",
  },
];

const liked = [
  {
    id: 3,
    name: "Black Sneakers",
    description: "Perfect sneakers for casual outings.",
    likes: 24,
    likedByUser: true,
    imageUrl: "https://www.tukshoes.com/cdn/shop/files/A3226_LEFT_OUTSIDE.jpg?v=1698766343",
  },
];

// Card Component
const Card: React.FC<{ data: any; type: 'post' | 'liked' }> = ({ data, type }) => (
  <a
    href={type === 'post' ? '#' : undefined}  // Use '#' for posts, or undefined for others
    className={`relative block p-2 rounded-lg shadow-md ${type === 'post' ? 'bg-gradient-to-b from-[#7390fb] via-[#7390fb] to-black rounded-2xl border border-gray-300' : 'bg-gradient-to-b from-[#8B0000] via-[#8B0000] to-black rounded-2xl border border-gray-300'}`}
  >
    <div className="overflow-hidden">
      <img src={data.imageUrl} alt={data.name} className="w-full h-48 object-cover rounded-md mb-2" />
    </div>
    <h3 className="font-bold text-sm text-white">{data.name}</h3>
    {/* Removed description from here */}
    {type === 'post' && (
      <div className="absolute bottom-2 right-2 text-xs text-white">
        <span>{data.likedByUser ? '❤️' : '🤍'}</span>
        <span className="ml-1">{data.likes}</span>
      </div>
    )}
  </a>
);

// Main User Page Component
const UserPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"posts" | "liked">("posts");

  return (
    <div className="relative w-full">
      {/* Top Background Gradient */}
      <div className="fixed top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-blue-500 to-blue-300 z-0"></div>

      {/* Main Content */}
      <div className="relative z-10 pt-[20vh]">

        {/* User Information Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mb-6 relative">

          {/* User Icon */}
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-gray-200 rounded-full border-4 border-white flex items-center justify-center shadow-md overflow-hidden">
            <img src={user.icon} className="w-full h-full object-cover" />
          </div>

          {/* Followers and Following */}
          <div className="absolute top-4 left-4 flex gap-4 text-sm">
            <p><strong>{user.followers}</strong> Followers</p>
            <p><strong>{user.following}</strong> Following</p>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center mt-16">
            <h1 className="text-xl font-bold">{user.username}</h1>
            {/* Removed the description */}
            <p className="italic text-gray-400">{user.bio}</p>
            <p className="text-gray-500 text-sm">{user.pronouns}</p>
          </div>
        </div>

        {/* Posts, Liked Box */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
          
          {/* Tabs */}
          <div className="flex border-b text-center mb-4">
            {["posts", "liked"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab as "posts" | "liked")}
                className={`flex-1 py-2 cursor-pointer ${activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-400"}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {activeTab === "posts" && posts.map((post) => <Card key={post.id} data={post} type="post" />)}
            {activeTab === "liked" && liked.map((post) => <Card key={post.id} data={post} type="liked" />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
