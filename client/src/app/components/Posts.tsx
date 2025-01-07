import React from "react";
import Image from "next/image";
import Link from "next/link";
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
  }[];
  isUser: boolean;
}

const Posts: React.FC<MyComponentProps> = ({ posts, isUser }) => {
    // TODO: function to send to BE that user has liked post
    const handleLikeToggle = (post: any) => {

    };

    return (
        <div className="flex flex-wrap justify-center gap-6">
        {/* render each post */}
        {posts.map((post, index) => (
            <Link href={`/${isUser ? "profile" : "posts"}/${post.id}`} key={index}>
            <div
                className="rounded-lg bg-white p-4 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ width: "250px", height: "350px" }}
            >
                <div>
                <div className="aspect-w-16 aspect-h-9 relative mb-4">
                    {/* image preview */}
                    <Image
                    src={post.image[0]}
                    alt={post.title}
                    width={250}
                    height={150}
                    objectFit="cover"
                    className="rounded-md"
                    />
                </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                {/* post title */}
                <h3 className="flex-grow overflow-hidden text-ellipsis whitespace-nowrap text-xl font-bold text-gray-800">
                    {post.title}
                </h3>
                {/* like button (only if non-user) */}
                {!isUser && (
                    <div className="flex-none flex flex-col items-center text-center">
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
                    <p className="text-xs text-gray-600 leading-none mt-0.5">{post.likes}</p>
                    </div>
                )}
                </div>
                {/* description/bio */}
                <p className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-600">
                {isUser
                    ? post.bio === ""  // for users
                    ? "(no bio)"
                    : post.bio 
                    : post.product_details === ""  // for post
                    ? "(no description)"
                    : post.product_details 
                }
                </p>
            </div>
            </Link>
        ))}
        </div>
    );
};

export default Posts;