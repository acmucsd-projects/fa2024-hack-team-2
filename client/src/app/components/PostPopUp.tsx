import React, { useState } from 'react';

// ProductCard Component
const ProductCard: React.FC<{
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  likes: number;
  userName: string;
  tags: string[];
  material: string;
  brand: string;
  cost: number;
}> = ({ name, price, description, imageUrl, likes, userName, tags, material, brand, cost }) => {
  return (
    <div className="max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex mx-auto">
      {/* Image Section */}
      <div className="relative flex-1">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Tags and Likes */}
        <div className="absolute bottom-2 left-2 bg-white/75 px-3 py-2 rounded-lg flex justify-between w-[90%] shadow">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="bg-gray-200 text-gray-700 rounded-md px-3 py-1 text-xs"
              >
                {tag}
              </div>
            ))}
          </div>
          {/* Likes */}
          <div className="flex items-center gap-1">
            <span className="text-red-500 font-semibold text-sm">❤️</span>
            <span className="text-sm text-gray-700">{likes}</span>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Title */}
        <h2 className="text-3xl font-bold">{name}</h2>
        {/* Price */}
        <p className="text-xl text-gray-600 font-semibold">${price.toFixed(2)}</p>
        {/* Description */}
        <h3 className="text-xl font-bold">Description</h3>
        <p className="text-lg text-gray-500">{description}</p>
        {/* Material */}
        <h3 className="text-xl font-bold">Material</h3>
        <p className="text-lg text-gray-500">{material}</p>
        {/* Brand */}
        <h3 className="text-xl font-bold">Brand</h3>
        <p className="text-lg text-gray-500">{brand}</p>
        {/* Cost */}
        <h3 className="text-xl font-bold">Cost</h3>
        <p className="text-lg text-gray-500">${cost.toFixed(2)}</p>
      </div>
    </div>
  );
};

// PostPopUp Component
interface PostPopUpProps {
  isOpen: boolean;
  closeModal: () => void;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  likes: number;
  userName: string;
  tags: string[];
  material: string;
  brand: string;
  cost: number;
}

const PostPopUp: React.FC<PostPopUpProps> = ({
  isOpen,
  closeModal,
  name,
  price,
  description,
  imageUrl,
  likes,
  userName,
  tags,
  material,
  brand,
  cost,
}) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 relative max-w-lg w-full">
        {/* Close Button */}
        <button 
          onClick={closeModal} 
          className="absolute top-2 right-2 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
        >
          &times;
        </button>

      <div className="bg-white rounded-lg p-6 relative max-w-5xl w-full">
        {/* Product Details */}
        <ProductCard
          name={name}
          price={price}
          description={description}
          imageUrl={imageUrl}
          likes={likes}
          userName={userName}
          tags={tags}
          material={material}
          brand={brand}
          cost={cost}
        />
      </div>
    </div>
  );
};

// Example of how to use the modal with dynamic data
const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true); // State to control modal visibility

  const closeModal = () => {
    setIsOpen(false); // Close the modal
  };

  // Example product data
  const productData = {
    name: "Yonsei Baseball Jacket",
    price: 99.99,
    description: "A stylish jacket for sports lovers.",
    imageUrl: "https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559",
    likes: 12,
    userName: "Alex Johnson",
    tags: ["Smart Casual", "All Black"],
    material: "100% Cotton",
    brand: "Nike",
    cost: 79.99,
  };

  return (
    <div>
      <PostPopUp
        isOpen={isOpen}
        closeModal={closeModal}
        {...productData} // Passing product data as props
      />
    </div>
  );
};

export default App;
