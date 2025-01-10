"use client";
import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import { useSearchParams } from 'next/navigation';
import backendConnection from "@/communication";
import SettingsIcon from './SettingsIcon'
import ShareIcon from "./ShareIcon";
import NavBar from "../components/NavBar";


interface IUser {
  user_id: string;
  username: string;
  bio?: string;
  pronouns: string;
  tags: string[];
  followers: number;
  following: number;
  liked: [];
  picture: string; // Assuming a profile picture URL
  settings: {
    privateAccount: boolean;
  };
  posts?: [],
}

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
  }
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
  const [errorGettingUser, setErrorGettingUser] = useState(false);
  const searchParams = useSearchParams();

  const [user, setUser] = useState<IUser>({
    user_id: "asdf",
    username: "asdf",
    bio: "asdf",
    pronouns: "asdf",
    tags: [],
    followers: 0,
    following: 0,
    liked: [],
    posts: [],
    picture: "asdf",
    settings: {
      privateAccount: false,
    },
  });

  const fetchUser = async (username: string) => {
    try {
      const response = await backendConnection.get(`/users/${username}`);
      console.log(response.data);
      setUser(response.data);
      setErrorGettingUser(false);
    } catch (error) {
      setErrorGettingUser(true);
    }
  };

  useEffect(() => {
    if (searchParams.has("username")) {
      console.log(searchParams.get("username"));
      const userByName = searchParams.get("username") || "";
      fetchUser(userByName);
    }
  }, [searchParams]);

  // Early return if no username is provided or if there was an error fetching the user
  if (!searchParams.has("username") || errorGettingUser) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No User Selected</h2>
          <p className="text-gray-600">Please select a user to view their profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen bg-gray-100 z-0 overflow-hidden">
      {/* Top Background Gradient */}
      <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-blue-500 to-blue-300 z-0"></div>
      <a href="/" className="z-10 absolute underline text-gray-200 top-4 left-4 hover:text-gray-300 transition-all">Back</a>

      {/* Main Content */}
      <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col h-[100%] w-[40%] z-1">

        {/* User Information Box */}
        <div className="relative h-[25%] w-full bg-gray-100 shadow-lg rounded-lg">
          <div className="flex justify-between items-center p-4">
            <div className="flex items-center gap-4">
              <p><span className="font-bold text-lg">{user.followers}</span> followers</p>
              <p><span className="font-bold text-lg">{user.following}</span> following</p>
            </div>

            <div className="flex items-center gap-4">
              <SettingsIcon className="h-8 w-8" />
              <ShareIcon className="h-8 w-8" />
            </div>
          </div>

          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4 flex-col -top-20">
            <img src={user.picture} alt="User Icon" className="w-[150px] h-[150px] rounded-full border-2 border-black" />
            <div className="flex flex-col items-center gap-2">
              <p className="font-bold">{user.username}</p>
              <p className="italic text-gray-400">{user.bio}</p>
              <p className="text-gray-500 text-sm">{user.pronouns}</p>
            </div>
          </div>

          {/* Tags Section */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-[40%] w-full flex items-center justify-center gap-1 flex-wrap p-2">
            {user.tags.map((tag, index) => (
              <Tag key={index} text={tag} />
            ))}
          </div>
        </div>

        <div className="h-[75%] w-full p-6 shadow-lg rounded-lg">
          {/* Tabs */}
          <div className="flex border-b text-center mb-4 sticky top-0 bg-gray-100 z-10">
            {["posts", "liked"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab as "posts" | "liked")}
                className={`flex-1 py-2 cursor-pointer ${activeTab === tab ? "border-b-2 border-black font-semibold" : "text-gray-400"
                  }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="overflow-y-scroll h-full">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-32">
              {/* <Posts posts={posts}/> */}
              {activeTab === "posts" &&
                posts.map((post) => <Card key={post.id} data={post} type="post" />)}
              {activeTab === "liked" &&
                liked.map((post) => <Card key={post.id} data={post} type="liked" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;