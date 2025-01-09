import React, { useState, useEffect } from "react";
import backendConnection from "@/communication";

interface PostPopUpProps {
  isOpen: boolean;
  closeModal: () => void;
  postId: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  likes: number;
  userName: string;
  isOwner: boolean;
  onDelete: () => void;
  onEdit: (updatedPost: any) => void;
}

const PostPopUp: React.FC<PostPopUpProps> = ({
  isOpen,
  closeModal,
  postId,
  name,
  price,
  description,
  imageUrl,
  likes,
  userName,
  isOwner,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [editPrice, setEditPrice] = useState(price);
  const [editDescription, setEditDescription] = useState(description);
  const [editImageUrl, setEditImageUrl] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !isEditing) {
      setEditName(name);
      setEditPrice(price);
      setEditDescription(description);
      setEditImageUrl(imageUrl);
    }
  }, [isOpen, isEditing, name, price, description, imageUrl]);

  if (!isOpen) return null;

  const extractBase64Data = (imageUrl: string) => {
    const base64Match = imageUrl.match(/^data:image\/\w+;base64,(.+)$/);
    return base64Match ? base64Match[1] : imageUrl;
  };

  const handleSaveEdit = async () => {
    setIsLoading(true);
    try {
      const base64ImageData = extractBase64Data(editImageUrl);
      
      const response = await backendConnection.patch("/posts", {
        post_id: postId,
        title: editName,
        cost: editPrice,
        product_details: editDescription,
        images: [base64ImageData],
      });

      onEdit({
        _id: postId,
        title: editName,
        cost: editPrice,
        product_details: editDescription,
        images: [{ data: base64ImageData }],
        likes: likes,
        authorId: response.data.authorId,
      });
      
      setIsEditing(false);
      closeModal();
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await backendConnection.delete("/posts", {
        data: { post_id: postId },
      });
      onDelete();
      closeModal();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={closeModal}
    >
      <div
        className="bg-[#F6F6F6] rounded-lg p-6 flex flex-col sm:flex-row w-[550px] max-w-full h-[450px] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full sm:w-3/5 mb-4 sm:mb-0 flex justify-center items-center relative">
          {isEditing ? (
            <input
              type="text"
              value={editImageUrl}
              onChange={(e) => setEditImageUrl(e.target.value)}
              placeholder="Enter image URL"
              className="w-full text-gray-700 border-b border-gray-300 mb-4"
            />
          ) : (
            <img
              src={imageUrl}
              alt={name}
              className="w-[250px] h-[350px] object-cover rounded-lg"
            />
          )}

          <div className="absolute bottom-4 right-4 flex flex-col items-center">
            <span className="text-3xl text-red-500">❤️</span>
            <span className="text-xl text-black">{likes}</span>
          </div>
        </div>

        <div className="w-full sm:w-3/5 sm:pl-10 flex flex-col justify-center items-start text-left relative mt-4">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-1">
              {isEditing ? (
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="text-2xl font-bold w-full border-b border-gray-300"
                />
              ) : (
                name
              )}
            </h2>
            <p className="text-lg text-gray-700">
              {isEditing ? (
                <input
                  type="number"
                  value={editPrice}
                  onChange={(e) => setEditPrice(parseFloat(e.target.value))}
                  className="text-lg text-gray-700 border-b border-gray-300"
                />
              ) : (
                `$${price.toFixed(2)}`
              )}
            </p>
            <hr className="border-gray-300 my-4" />
          </div>

          <div className="w-full">
            <h3 className="text-xl font-bold text-black mb-1">
              Product Description
            </h3>
            {isEditing ? (
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                className="w-full p-2 border border-gray-300"
              />
            ) : (
              <p className="text-gray-700">{description}</p>
            )}
          </div>

          <div className="mt-6 flex gap-4">
            {isEditing ? (
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Delete"}
            </button>
          </div>

          <div className="absolute bottom-4 text-gray-500 italic text-left">
            <p>Owned by: {userName}</p>
          </div>
        </div>

        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-black text-xl"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default PostPopUp;
