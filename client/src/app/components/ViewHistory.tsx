import React, { useState, useEffect } from 'react';
import PostPopUp from './PostPopUp';
import backendConnection from '@/communication';

const ITEMS_PER_PAGE = 5;

interface CardProps {
  data: any;
  type: 'post' | 'user';
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ data, type, onClick }) => {
  const decodeBase64 = (base64Str: string) => {
    try {
      const decodedStr = `data:image/png;base64,${base64Str}`;
      return decodedStr;
    } catch (e) {
      console.error("Error decoding base64:", e);
      return base64Str;
    }
  };

  return (
    <a
      href={type === 'user' ? '#' : data.link}
      className={`relative block p-4 rounded-lg shadow-md text-white ${type === 'user'
          ? 'bg-gradient-to-b from-[#8B0000] via-[#8B0000] to-black rounded-2xl border border-gray-300'
          : 'bg-gradient-to-b from-[#7390fb] via-[#7390fb] to-black rounded-2xl border border-gray-300'
        } max-h-[350px]`}
      onClick={onClick}
    >
      <div className="overflow-hidden">
        <img
          src={type === 'user' ? data.picture : decodeBase64(data.images[0]?.data)}
          alt={data.username || data.title}
          className="w-40 h-40 object-cover rounded-md mb-2"
        />
      </div>
      <div className="flex justify-between items-start mb-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-sm sm:text-base">
            {type === 'user' ? data.username : data.title}
          </h3>
          {type === 'post' && <p className="text-xs sm:text-sm max-w-[180px]">{data.brand}</p>}
        </div>
      </div>
      {type === 'post' && (
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1">
          <span>{data.likes > 0 ? '❤️' : '🤍'}</span>
          <span className="text-xs sm:text-sm">{data.likes}</span>
        </div>
      )}
    </a>
  );
};
const ViewHistory: React.FC = () => {
  const decodeBase64 = (base64Str: string) => {
    try {
      const decodedStr = `data:image/png;base64,${base64Str}`;
      return decodedStr;
    } catch (e) {
      console.error("Error decoding base64:", e);
      return base64Str;
    }
  };

  const [posts, setPosts] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showPosts, setShowPosts] = useState(true);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedPost, setEditedPost] = useState<any | null>(null);
  const [authorNames, setAuthorNames] = useState<Record<string, string>>({});

  const currentData = showPosts ? posts : users;
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);
  const currentUserId = "currentUserId";

  const handlePostClick = (postId: string) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
    const selectedPost = posts.find((post) => post._id === postId);
    setEditedPost({
      ...selectedPost,
      isOwner: selectedPost.authorId === currentUserId,
    });
  };

  const fetchPostHistory = async () => {
    try {
      const response = await backendConnection.get("/posts/history");
      setPosts(response.data);
      console.log("post data", response.data);
    } catch (error) {
      console.error("Error fetching post history", error);
    }
  };

  const fetchUserHistory = async () => {
    try {
      const response = await backendConnection.get("/users/history");
      setUsers(response.data);
      console.log("user data", response.data);
    } catch (error) {
      console.error("Error fetching user history", error);
    }
  };

  const handleEditPost = (updatedPost: any) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === updatedPost._id
          ? {
              ...post,
              title: updatedPost.title,
              cost: updatedPost.cost,
              product_details: updatedPost.product_details,
              images: updatedPost.images, // Ensure images are updated
              likes: updatedPost.likes,
              authorId: updatedPost.authorId,
            }
          : post
      )
    );
    
    // Print the updated list of posts
    console.log("Updated posts after edit:", posts);
    
    setIsModalOpen(false);
  };
  
  

  const handleDeletePost = async () => {
    if (editedPost) {
      await fetchPostHistory();
      setIsModalOpen(false);
    }
  };


  useEffect(() => {
    fetchPostHistory();
    fetchUserHistory();
  }, []);

  return (
    <>
      <div className="main-content p-8 pt-16">
        <div className="flex justify-center gap-4 mb-4 mt-[5%]">
          <button
            onClick={() => setShowPosts(true)}
            className={`text-sm sm:text-base font-semibold ${showPosts ? 'text-blue-600' : 'text-gray-500'}`}
          >
            Posts
          </button>
          <button
            onClick={() => setShowPosts(false)}
            className={`text-sm sm:text-base font-semibold ${!showPosts ? 'text-blue-600' : 'text-gray-500'}`}
          >
            Users
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto flex-grow mt-[5%]">
  {currentData.length > 0 ? (
    currentData
      .slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
      .filter((item) => {
        // Skip items without valid images
        return item.images && item.images.length > 0 && item.images[0]?.data;
      })
      .map((item) => (
        <Card
          key={item._id}  
          data={item}
          type={showPosts ? 'post' : 'user'}
          onClick={showPosts ? () => handlePostClick(item._id) : undefined}
        />
      ))
  ) : (
    <p>No {showPosts ? 'posts' : 'users'} available</p>  // Show a message when there are no posts or users
  )}
</div>

      </div>
      <div className="fixed bottom-4 left-0 right-0 flex justify-center items-center gap-4 z-10 bg-white py-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {isModalOpen && editedPost && (
        <PostPopUp
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          postId={editedPost._id}
          name={editedPost.title}
          price={editedPost.cost}
          description={editedPost.product_details}
          imageUrl={decodeBase64(editedPost.images[0]?.data || '')}
          likes={editedPost.likes}
          userName={authorNames[editedPost.authorId] || "Not found"}
          isOwner={editedPost.isOwner}
          onDelete={handleDeletePost}
          onEdit={handleEditPost}
        />
      )}
    </>
  );
};


export default ViewHistory;
