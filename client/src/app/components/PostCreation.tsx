import { useState } from "react";
import DragDropImagesBox from "./DragDropImagesBox";
import ImagePreview from "./ImagePreview";
import CreatePostTextBox from "./CreatePostTextBox";
import CreatePostMaterialBox from "./CreatePostMaterialBox";
import CreatePostBrandBox from "./CreatePostBrandBox";
import CreatePostSlider from "./CreatePostSlider";
import TagList from "./TagList";
import backendConnection from "../../communication";

interface MyComponentProps {}

const PostCreation: React.FC<MyComponentProps> = () => {
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [material, setMaterial] = useState<Record<string, number>>();
  const [brand, setBrand] = useState<string>("");
  const [cost, setCost] = useState<number>(100.0);
  const [tags, setTags] = useState<string[]>([]);

  const postData = async () => {
    // validation
    const errors: string[] = [];
    if (images.length === 0) {
      errors.push("Please upload at least one image.");
    }
    if (title.trim() === "") {
      errors.push("Title is required.");
    }
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return;
    }

    // prepare data to be sent
    const materialString = material
      ? Object.entries(material)
          .map(([key, value]) => `${value}% ${key}`)
          .join(", ")
      : "";
      
      try {
        // Create a FormData object
        const formData = new FormData();
    
        // Append fields to FormData
        formData.append("title", title);
        formData.append("description", description);
        formData.append("materialString", materialString);
        formData.append("brand", brand);
        formData.append("cost", cost);
    
        // Append each image to the FormData (assuming images is an array of File objects)
        images.forEach((image) => {
            formData.append("images", image); // Ensure this matches the backend's expected key
        });
    
        // Append tags (assuming tags is an array of strings)
        tags.forEach((tag) => {
            formData.append("tags[]", tag); // Using tags[] ensures correct backend interpretation
        });
    
        // Make the POST request
        backendConnection
            .post("/posts", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", 
                },
            })
            .then((response) => {
                // Success
                alert("Successfully created post.");
    
                // Reset form state
                setImages([]);
                setTitle("");
                setDescription("");
                setMaterial(undefined);
                setBrand("");
                setCost(0.0);
                setTags([]);
    
                // TODO: Add code to navigate out of post creation
            })
            .catch((error) => {
                console.error("Failed to post data:", error.response?.data || error.message);
                alert("Failed to create post. Please try again.");
            });
    } catch (error) {
        console.error("Unexpected error:", error.message);
        alert("Failed to create post. Please try again.");
    }
  }    

  return (
    <div
      className={`mx-auto mb-4 mt-4 rounded bg-white p-4 text-center outline outline-gray-300 ${
        images.length > 0 // the container changes sizes after user uploads images
          ? "w-9/12 md:w-[48rem]" // after upload
          : "w-96" // before upload
      }`}
    >
      {/* heading */}
      <p className="mb-2 text-center text-xl font-bold text-gray-600">
        Create Post
      </p>
      <hr />
      {/* drag and drop box (disappears after upload) */}
      {images.length === 0 && (
        <DragDropImagesBox
          initialImages={images}
          onChange={(updatedImages) => setImages(updatedImages)}
        />
      )}
      {images.length > 0 && (
        <div className="flex flex-col md:flex-row">
          {/* left side */}
          <div className="flex flex-col">
            <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100 drop-shadow-lg">
              {/* image preview */}
              <ImagePreview images={images} />
            </div>
            {/* Tags */}
            <TagList name="Tag" onChange={(val) => setTags(val)} />
          </div>
          {/* right side */}
          <div className="m-4 flex flex-1 flex-col">
            {/* title */}
            <CreatePostTextBox name="title" onChange={(val) => setTitle(val)} />
            {/* description */}
            <CreatePostTextBox
              name="description"
              onChange={(val) => setDescription(val)}
            />
            {/* material */}
            <CreatePostMaterialBox
              name="material"
              onChange={(val) => setMaterial(val)}
            />
            {/* brand */}
            <CreatePostBrandBox
              name="brand"
              onChange={(val) => setBrand(val)}
            />
            {/* cost */}
            <CreatePostSlider
              name="cost"
              min={0}
              max={1000}
              onChange={(val) => setCost(val)}
            />
            {/* button for post */}
            <button
              type="submit"
              className="mt-2 w-full rounded bg-blue-500 p-1 text-xl font-bold text-white"
              onClick={() => postData()}
            >
              Post
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCreation;
