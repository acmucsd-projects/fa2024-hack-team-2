import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";
import likeIcon from "/public/images/heart-regular.svg";
import likedIcon from "/public/images/heart-solid.svg";
import backendConnection from "../../communication";

interface MyComponentProps {
  posts: {
    _id: string;
    title: string;
    product_details?: string;
    material?: string;
    brand?: string;
    cost?: number;
    likes: number;
    author: string;
    images: string[];
    tags: string[];
    date_created: string;
  }[];
  isUser: boolean;
}

interface PostProps {
  _id: string;
  title: string;
  product_details?: string;
  material?: string;
  brand?: string;
  cost?: number;
  likes: number;
  author: string;
  images: string[];
  tags: string[];
  date_created: string;
}

const Posts: React.FC<MyComponentProps> = ({ posts, isUser }) => {
  const [user, setUser] = useState<any>(null);
  const [localPosts, setLocalPosts] = useState(posts);

  // fetch user data when the component mounts
  useEffect(() => {
    backendConnection
      .get("/user/self")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(`Failed to fetch user data: ${error}`);
      });
  }, []);

  // tell BE that user has liked post and update local state
  const handleLikeToggle = async (post: PostProps) => {
    try {
      const response = await backendConnection.patch("/posts/like", {
        post_id: post._id,
      });

      // Update the local state for posts
      setLocalPosts((prevPosts) =>
        prevPosts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: p.likes + (user?.liked.includes(post._id) ? -1 : 1), // Increment or decrement likes
              }
            : p,
        ),
      );

      // Update the user's liked posts
      setUser((prevUser: any) => {
        if (prevUser?.liked.includes(post._id)) {
          return {
            ...prevUser,
            liked: prevUser.liked.filter((id: string) => id !== post._id),
          };
        } else {
          return { ...prevUser, liked: [...prevUser.liked, post._id] };
        }
      });
    } catch (error) {
      console.error(`Failed to toggle like: ${error}`);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {/* render each post */}
      {localPosts.map((post, index) => (
        // TODO: fix link + add pop up
        <Link href={`/${isUser ? "user" : "posts"}/${post._id}`} key={index}>
          <div className="relative w-52 rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg md:w-80">
            <div>
              <div className="aspect-w-16 aspect-h-9 relative mb-4">
                {/* image preview */}
                <img
                  src={"data:image/png;base64," + post.images[0].data}
                  alt={post.title}
                  width={400}
                  height={400}
                  // objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
            {/* post title */}
            <h3 className="mt-2 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-gray-800">
              {post.title}
            </h3>
            {/* description/bio */}
            <div className="mx-2 ml-0 mr-10 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500">
              {isUser
                ? post.bio === undefined || post.bio === "" // for users
                  ? "(no bio)"
                  : post.bio
                : post.product_details === undefined ||
                    post.product_details === "" // for posts
                  ? "(no description)"
                  : post.product_details}
              {/* TagList component */}
              {!isUser && (
                <div className="mt-2">
                  <TagList
                    name="Tags"
                    initialTags={post.tags}
                    canEdit={false}
                  />
                </div>
              )}
            </div>
            {/* like button (only if non-user) */}
            {!isUser && (
              <div className="absolute bottom-4 right-4 flex flex-col items-center">
                <button
                  onClick={(e) => {
                    e.preventDefault(); // prevent navigation when clicking the like button
                    handleLikeToggle(post);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-full transition-transform hover:scale-110"
                  aria-label={`Like ${post.title}`}
                >
                  <Image
                    src={
                      user && user.liked.includes(post._id)
                        ? likedIcon
                        : likeIcon
                    } // Check if post is liked by the user
                    alt={
                      user && user.liked.includes(post._id)
                        ? "Liked"
                        : "Not Liked"
                    }
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </button>
                {/* number of likes */}
                <p className="mt-1 text-xs leading-none text-gray-600">
                  {post.likes}
                </p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
