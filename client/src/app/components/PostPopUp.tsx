import React, { useState } from 'react';

// Card Component
const ProductCard: React.FC<{
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  likes: number;
  userName: string;
}> = ({ name, price, description, imageUrl, likes, userName }) => {
  return (
    <div className="max-w-lg bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex mx-auto">
      {/* Image Section */}
      <div className="relative w-1/2">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-72 object-cover"
        />
        <div className="absolute bottom-2 right-2 bg-black/50 text-white rounded-full px-2 py-1 text-sm">
          ❤️ {likes}
        </div>
      </div>

      {/* Details Section */}
      <div className="p-4 flex flex-col gap-2 w-1/2">
        <h2 className="text-lg font-bold">{name}</h2>
        <p className="text-gray-600">${price.toFixed(2)}</p>
        <div className="border-b border-white my-2"></div> {/* White line below price */}
        
        {/* Gray line above product description */}
        <div className="border-t border-gray-300 my-4"></div> {/* Gray line above description */}

        {/* Product Description Header */}
        <h3 className="text-xl font-bold">Product Description</h3>
        <p className="text-sm text-gray-500 mt-2">{description}</p>
        
        <div className="flex items-center gap-2 mt-4">
          <div className="w-8 h-8 bg-blue-300 rounded-full"></div>
          <div>
            <p className="text-sm font-medium">{userName}</p>
            <p className="text-xs text-gray-500">{likes} Likes</p>
          </div>
        </div>
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
}) => {
  if (!isOpen) return null; // Don't render anything if the modal is closed

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

        {/* Product Details */}
        <ProductCard
          name={name}
          price={price}
          description={description}
          imageUrl={imageUrl}
          likes={likes}
          userName={userName}
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

export default PostPopUp; 
