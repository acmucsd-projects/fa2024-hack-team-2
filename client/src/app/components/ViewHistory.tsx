'use client';
import React, { useState } from 'react';

// dummy
const dummyPosts = [
  { id: 1, name: "Yonsei Baseball Jacket", description: "A stylish jacket for sports lovers.", likes: 12, likedByUser: true, imageUrl: "https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559", userId: 1 },
  { id: 2, name: "Blue Hoodie", description: "Comfy and cozy hoodie for all occasions.", likes: 7, likedByUser: false, imageUrl: "https://media.istockphoto.com/id/1319572197/photo/mens-hooded-jacket-for-your-design-mockup-for-print.jpg?s=612x612&w=0&k=20&c=c3n5O6D_gKpiX7zrN-K2wvDBYNuf9VMwUUysBg3TjkU=", userId: 2 },
  { id: 3, name: "Black Sneakers", description: "Perfect sneakers for casual outings.", likes: 24, likedByUser: true, imageUrl: "https://www.tukshoes.com/cdn/shop/files/A3226_LEFT_OUTSIDE.jpg?v=1698766343", userId: 3 },
  { id: 4, name: "Classic T-Shirt", description: "A simple t-shirt for everyday wear.", likes: 15, likedByUser: false, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjazf4sKrskubw0510UfUT5B0K8eNzw0_q9w&s", userId: 4 },
  { id: 5, name: "Denim Jeans", description: "Trendy jeans for a modern look.", likes: 10, likedByUser: true, imageUrl: "https://lsco.scene7.com/is/image/lsco/A60810002-front-gstk?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840", userId: 5 },
  { id: 6, name: "Winter Coat", description: "Warm and stylish coat for cold weather.", likes: 20, likedByUser: false, imageUrl: "https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41", userId: 6 },
  { id: 7, name: "Plaid Shirt", description: "A classic plaid shirt for any occasion.", likes: 30, likedByUser: true, imageUrl: "https://media.istockphoto.com/id/1070699648/vector/shirt.jpg?s=612x612&w=0&k=20&c=rolcUAsd6L6cYpRkVtHTjZvsR9YHQEam0kuNXjBLQAc=", userId: 7 },
  { id: 8, name: "Leather Boots", description: "Durable and stylish leather boots.", likes: 18, likedByUser: false, imageUrl: "https://gt.atitlanleather.com/cdn/shop/products/atitlan-leather-boots-women-s-tall-leather-boots-34324884488361_600x.png?v=1678100313", userId: 8 },
  { id: 9, name: "Graphic Sweatshirt", description: "A fun and bold graphic sweatshirt.", likes: 25, likedByUser: true, imageUrl: "https://gvartwork.com/cdn/shop/files/ClevelandArtworkTshirtBack.jpg?v=1684517332", userId: 9 },
  { id: 10, name: "Chinos", description: "Perfect pair of chinos for casual and formal wear.", likes: 15, likedByUser: false, imageUrl: "https://img.abercrombie.com/is/image/anf/KIC_123-4016-0072-100_prod2.jpg?policy=product-large", userId: 10 },
];

const dummyUsers = [
  { id: 1, name: "John Doe", description: "Fashion enthusiast.", likes: 8, imageUrl: "https://via.placeholder.com/200x200/0000FF/FFFFFF?text=John+Doe" },
  { id: 2, name: "Jane Smith", description: "Loves collecting vintage clothes.", likes: 14, imageUrl: "https://via.placeholder.com/200x200/008000/FFFFFF?text=Jane+Smith" },
  { id: 3, name: "Alex Lee", description: "Streetwear and sneakerhead.", likes: 18, imageUrl: "https://via.placeholder.com/200x200/000000/FFFFFF?text=Alex+Lee" },
  { id: 4, name: "Emily Davis", description: "Fashion blogger and trendsetter.", likes: 22, imageUrl: "https://via.placeholder.com/200x200/FF0000/FFFFFF?text=Emily+Davis" },
  { id: 5, name: "Michael Brown", description: "Passionate about clothing and design.", likes: 9, imageUrl: "https://via.placeholder.com/200x200/FFFFFF/000000?text=Michael+Brown" },
  { id: 6, name: "Sara White", description: "Avid traveler and lover of unique fashion.", likes: 20, imageUrl: "https://via.placeholder.com/200x200/FFFF00/000000?text=Sara+White" },
  { id: 7, name: "Tom Black", description: "Street fashion photographer.", likes: 12, imageUrl: "https://via.placeholder.com/200x200/8B4513/FFFFFF?text=Tom+Black" },
  { id: 8, name: "Olivia Green", description: "Sustainable fashion advocate.", likes: 16, imageUrl: "https://via.placeholder.com/200x200/00FFFF/000000?text=Olivia+Green" },
  { id: 9, name: "Lucas Grey", description: "Designer and artist, blending fashion with art.", likes: 14, imageUrl: "https://via.placeholder.com/200x200/A52A2A/FFFFFF?text=Lucas+Grey" },
  { id: 10, name: "Sophia Blue", description: "Loves minimalist and functional clothing.", likes: 18, imageUrl: "https://via.placeholder.com/200x200/0000FF/FFFFFF?text=Sophia+Blue" },
];

const ITEMS_PER_PAGE = 5;

// card component
const Card: React.FC<{ data: any; type: 'post' | 'user' }> = ({ data, type, onClick }: any) => (
  <a
    href={type === 'user' ? '#' : data.link}
    className={`relative block p-4 rounded-lg shadow-md text-white ${
      type === 'user'
        ? 'bg-gradient-to-b from-[#8B0000] via-[#8B0000] to-black rounded-2xl border border-gray-300'
        : 'bg-gradient-to-b from-[#7390fb] via-[#7390fb] to-black rounded-2xl border border-gray-300'
    } max-h-[350px]`} 
    onClick={onClick}
  >
    <div className="overflow-hidden">
      <img
        src={data.imageUrl}
        alt={data.name}
        className="w-full object-cover rounded-md mb-2 h-[25vh]" 
      />
    </div>
    <div className="flex justify-between items-start mb-2">
      <div className="flex flex-col">
        <h3 className="font-bold text-sm sm:text-base">{data.name}</h3> 
        <p className="text-xs sm:text-sm max-w-[180px]">{data.description}</p> 
      </div>
    </div>

    {type === 'post' && (
      <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1">
        <span>{data.likedByUser ? '❤️' : '🤍'}</span>
        <span className="text-xs sm:text-sm">{data.likes}</span>
      </div>
    )}
  </a>
);


// takes data and displays it
const ViewHistory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPosts, setShowPosts] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentData = showPosts ? dummyPosts : dummyUsers;
  const totalPages = Math.ceil(currentData.length / ITEMS_PER_PAGE);

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const handlePostClick = (postId: number) => {
    setSelectedPostId(postId);
    setIsModalOpen(true);
  };

  const selectedUser = dummyUsers.find((user) => user.id === selectedUserId);
  const selectedPost = dummyPosts.find((post) => post.id === selectedPostId);
  const userPosts = selectedUser ? dummyPosts.filter((post) => post.userId === selectedUserId) : [];
  const postUser = selectedPost ? dummyUsers.find((user) => user.id === selectedPost.userId) : null;

  return (
    <>
      {/* Main Content */}
      <div className="fixed inset-0 flex justify-center items-center z-50">
        <div className="w-[90vw] h-[90vh] bg-white border border-gray-300 shadow-2xl overflow-hidden rounded-lg p-6 flex flex-col">
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
  <h1 className="text-2xl font-bold text-center">View History</h1>
</div>


          {/* Buttons */}
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setShowPosts(true)}
              className={`text-sm sm:text-base font-semibold ${
                showPosts ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setShowPosts(false)}
              className={`text-sm sm:text-base font-semibold ${
                !showPosts ? 'text-blue-600' : 'text-gray-500'
              }`}
            >
              Users
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 overflow-y-auto flex-grow">
            {currentData.slice(
              (currentPage - 1) * ITEMS_PER_PAGE,
              currentPage * ITEMS_PER_PAGE
            ).map((item) => (
              <Card
                key={item.id}
                data={item}
                type={showPosts ? 'post' : 'user'}
                onClick={showPosts ? () => handlePostClick(item.id) : () => handleUserClick(item.id)}
              />
            ))}
          </div>

          {/* pages */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="w-[90vw] h-[90vh] bg-white border border-gray-300 shadow-2xl overflow-hidden rounded-lg p-6 flex flex-col">
            {/* Displaying user details */}
            {selectedUser && (
              <div className="flex flex-col items-center mb-4">
                <img src={selectedUser.imageUrl} alt={selectedUser.name} className="w-32 h-32 rounded-full mb-2" />
                <h2 className="text-2xl font-bold">{selectedUser.name}</h2>
                <p className="text-sm text-gray-500">{selectedUser.description}</p>
              </div>
            )}

            {/* Displaying post details */}
            {selectedPost && postUser && (
              <>
                <div className="flex flex-col items-center mb-4">
                  <img
                    src={selectedPost.imageUrl}
                    alt={selectedPost.name}
                    className="w-32 h-32 rounded-md mb-2"
                  />
                  <h2 className="text-2xl font-bold">{selectedPost.name}</h2>
                  <p className="text-sm text-gray-500">{selectedPost.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span>{selectedPost.likedByUser ? '❤️' : '🤍'}</span>
                    <span className="text-xs sm:text-sm">{selectedPost.likes}</span>
                  </div>
                </div>

                {/* Display the user who posted */}
                <div className="flex flex-col items-center mt-4">
                  <h3 className="text-lg font-semibold">Posted by: {postUser.name}</h3>
                  <img src={postUser.imageUrl} alt={postUser.name} className="w-20 h-20 rounded-full mt-2" />
                  <p className="text-sm text-gray-500 mt-2">{postUser.description}</p>
                </div>
              </>
            )}

            {/* Display user's posts if viewing the user */}
            {selectedUser && userPosts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Posts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userPosts.map((post) => (
                    <Card key={post.id} data={post} type="post" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewHistory;
