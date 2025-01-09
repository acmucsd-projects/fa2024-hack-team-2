import React, { useState } from 'react';

// ProductCard Component
const ProductCard: React.FC<{
  name: string;
  description: string;
  imageUrl: string;
  likes: number;
  tags: string[];
  material: string;
  brand: string;
  cost: number;
}> = ({ name, description, imageUrl, likes, tags, material, brand, cost }) => {
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
        <div className="absolute bottom-2 left-2 px-3 py-2 rounded-lg flex justify-between w-[90%]">
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
  description: string;
  imageUrl: string;
  likes: number;
  tags: string[];
  material: string;
  brand: string;
  cost: number;
}

const PostPopUp: React.FC<PostPopUpProps> = ({
  isOpen,
  closeModal,
  name,
  description,
  imageUrl,
  likes,
  tags,
  material,
  brand,
  cost,
}) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-white rounded-lg p-4 max-w-5xl w-full flex flex-col">
        {/* Header Section with Close Button */}
        <div className="flex justify-end">
          <button
            onClick={closeModal}
            className="bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition"
          >
            &times;
          </button>
        </div>

        {/* Product Details */}
        <ProductCard
          name={name}
          description={description}
          imageUrl={imageUrl}
          likes={likes}
          tags={tags}
          material={material}
          brand={brand}
          cost={cost}
        />
      </div>
    </div>
  );
};

// App Component
const App: React.FC = () => {
  // State to control modal visibility
  const [isOpen, setIsOpen] = useState(true);

  const closeModal = () => {
    // Close the modal by setting isOpen to false
    setIsOpen(false);
  };

  // Example product data
  const productData = {
    name: "Yonsei Baseball Jacket",
    description: "A stylish jacket for sports lovers.",
    imageUrl: "https://alexgear.com/cdn/shop/files/Yonsei-University-Baseball-Jacket.jpg?v=1704227559",
    likes: 12,
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

