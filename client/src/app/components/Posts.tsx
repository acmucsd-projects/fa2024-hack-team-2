import React from "react";
import Image from "next/image";
import Link from "next/link";
import TagList from "./TagList";
import likeIcon from "/public/images/heart-regular.svg";
import likedIcon from "/public/images/heart-solid.svg";

interface MyComponentProps {
  posts: {
    id: string;
    image: string[];
    title: string;
    product_details: string;
    bio?: string;
    liked: boolean;
    likes: number;
    tags: [];
  }[];
  isUser: boolean;
}

const Posts: React.FC<MyComponentProps> = ({ posts, isUser }) => {
  // TODO: function to send to BE that user has liked post
  const handleLikeToggle = (post: any) => {};

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {/* render each post */}
      {posts.map((post, index) => (
        <Link href={`/${isUser ? "profile" : "posts"}/${post.id}`} key={index}>
          <div
            className="relative rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg w-52 md:w-80"
          >
            <div>
              <div className="aspect-w-16 aspect-h-9 relative mb-4">
                {/* image preview */}
                <Image
                  src={post.image[0]}
                  alt={post.title}
                  width={400}
                  height={400}
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            </div>
            {/* post title */}
            <h3 className="mt-2 flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-gray-800">
              {post.title}
            </h3>
            {/* description/bio */}
            <div className="mx-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-500 mr-10 ml-0">
              {isUser
                ? post.bio === undefined || post.bio === "" // for users
                  ? "(no bio)"
                  : post.bio
                : post.product_details === undefined ||post.product_details === "" // for posts
                ? "(no description)"
                : post.product_details}
              {/* TagList component */}
              {!isUser && (
                <div className="mt-2">
                    <TagList name="Tags" initialTags={post.tags} canEdit={false} />
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
                    src={post.liked ? likedIcon : likeIcon}
                    alt={post.liked ? "Liked" : "Not Liked"}
                    width={24}
                    height={24}
                    className="cursor-pointer"
                  />
                </button>
                {/* number of likes */}
                <p className="text-xs text-gray-600 leading-none mt-1">{post.likes}</p>
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Posts;
