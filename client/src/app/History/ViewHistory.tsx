'use client';
import React, { useState } from "react";

const dummyPosts = [
  { id: 1, name: "Yonsei Baseball Jacket", description: "A stylish jacket for sports lovers.", likes: 12, imageUrl: "https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559" },
  { id: 2, name: "Blue Hoodie", description: "Comfy and cozy hoodie for all occasions.", likes: 7, imageUrl: "https://media.istockphoto.com/id/1319572197/photo/mens-hooded-jacket-for-your-design-mockup-for-print.jpg?s=612x612&w=0&k=20&c=c3n5O6D_gKpiX7zrN-K2wvDBYNuf9VMwUUysBg3TjkU=" },
  { id: 3, name: "Black Sneakers", description: "Perfect sneakers for casual outings.", likes: 24, imageUrl: "https://www.tukshoes.com/cdn/shop/files/A3226_LEFT_OUTSIDE.jpg?v=1698766343" },
  { id: 4, name: "Classic T-Shirt", description: "A simple t-shirt for everyday wear.", likes: 15, imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjazf4sKrskubw0510UfUT5B0K8eNzw0_q9w&s" },
  { id: 5, name: "Denim Jeans", description: "Trendy jeans for a modern look.", likes: 10, imageUrl: "https://lsco.scene7.com/is/image/lsco/A60810002-front-gstk?fmt=jpeg&qlt=70&resMode=sharp2&fit=crop,1&op_usm=0.6,0.6,8&wid=2000&hei=1840" },
  { id: 6, name: "Winter Coat", description: "Warm and stylish coat for cold weather.", likes: 20, imageUrl: "https://cdni.llbean.net/is/image/wim/520163_699_82?hei=1095&wid=950&resMode=sharp2&defaultImage=llbprod/520163_699_41" },
  { id: 7, name: "Plaid Shirt", description: "A classic plaid shirt for any occasion.", likes: 30, imageUrl: "https://media.istockphoto.com/id/1070699648/vector/shirt.jpg?s=612x612&w=0&k=20&c=rolcUAsd6L6cYpRkVtHTjZvsR9YHQEam0kuNXjBLQAc=" },
  { id: 8, name: "Leather Boots", description: "Durable and stylish leather boots.", likes: 18, imageUrl: "https://gt.atitlanleather.com/cdn/shop/products/atitlan-leather-boots-women-s-tall-leather-boots-34324884488361_600x.png?v=1678100313" },
  { id: 9, name: "Graphic Sweatshirt", description: "A fun and bold graphic sweatshirt.", likes: 25, imageUrl: "https://gvartwork.com/cdn/shop/files/ClevelandArtworkTshirtBack.jpg?v=1684517332" },
  { id: 10, name: "Chinos", description: "Perfect pair of chinos for casual and formal wear.", likes: 15, imageUrl: "https://img.abercrombie.com/is/image/anf/KIC_123-4016-0072-100_prod2.jpg?policy=product-large" },
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

// Post Card Component
const Card: React.FC<{ 
  type: 'post' | 'user'; 
  data: { 
    id: number; 
    name: string; 
    description: string; 
    likes: number; 
    imageUrl: string; 
  } 
}> = ({ type, data }) => {
  return (
    <div className="bg-gradient-to-b from-[#7390fb] via-[#7390fb] to-black rounded-2xl border border-gray-300 p-2 flex flex-col justify-between relative w-full h-auto">
      <img
        className="w-full h-56 object-cover rounded-lg mb-2"
        src={data.imageUrl}
        alt={data.name}
      />
      <div className="text-left w-full">
        <p className="text-white text-sm font-bold mb-1">{data.name}</p>
        <p className="text-white text-[0.75rem] mb-2 w-[70%] break-words">
          {data.description}
        </p>
      </div>
      <div className="absolute bottom-2 right-2 flex items-center cursor-pointer">
        <span className="text-white text-xl mr-2">&#9825;</span> {/* Unicode for unfilled white heart */}
        <span className="text-white text-sm">{data.likes}</span>
      </div>
    </div>
  );
};



const ViewHistory: React.FC = () => {
  const [postsCount, setPostsCount] = useState<number>(0);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [showPosts, setShowPosts] = useState<boolean>(true);

  const addPost = () => {
    if (postsCount < dummyPosts.length) {
      setPostsCount((prevCount) => prevCount + 1);
    }
  };

  const addUser = () => {
    if (usersCount < dummyUsers.length) {
      setUsersCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="app">
      <h1 className="text-2xl font-bold text-center mb-4">View History</h1>
      <div className="flex justify-center gap-4 mb-4">
        {/* Only show the Add Post button if there are more posts to add */}
        {postsCount < dummyPosts.length && (
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded" 
            onClick={addPost}
          >
            Add Post
          </button>
        )}
        {/* Only show the Add User button if there are more users to add */}
        {usersCount < dummyUsers.length && (
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded" 
            onClick={addUser}
          >
            Add User
          </button>
        )}
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowPosts(true)}>
          Posts
        </button>
        <button className="px-4 py-2 bg-gray-500 text-white rounded" onClick={() => setShowPosts(false)}>
          Users
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {showPosts
          ? dummyPosts.slice(Math.max(0, postsCount - 5), postsCount).map((post) => (
              <Card key={post.id} type="post" data={post} />
            ))
          : dummyUsers.slice(Math.max(0, usersCount - 5), usersCount).map((user) => (
              <Card key={user.id} type="user" data={user} />
            ))}
      </div>
    </div>
  );
};

export default ViewHistory;
