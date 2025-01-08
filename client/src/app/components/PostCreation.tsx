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
    // const json = {
    //   image: images,
    //   title: title,
    //   product_details: description,
    //   material: materialString,
    //   brand: brand,
    //   cost: cost,
    //   tags: tags,
    // };
    try {
      // make POST request to the backend
      const numStores = 0
      const available_stores = [];
      const image = "https://i.pinimg.com/originals/13/cb/4e/13cb4e45fdc7d4a07b9df3e7f7cf0b31.jpg";
      backendConnection.post("/posts", {
        title,
        description,
        material,
        brand,
        cost,
        numStores,
        available_stores,
        image,
        tags,
      }).then((response) => {
        // success
        alert("Successfully created post.");
        // reset form state
        setImages([]);
        setTitle("");
        setDescription("");
        setMaterial(undefined);
        setBrand("");
        setCost(0.0);
        setTags([]);
        //TODO: add code to navigate out of post creation
      }).catch((error) => {
        throw new Error(`Failed to post data: ${error}`);
      });
    } catch (error) {
      // console.error("Error posting data:", error);
      alert("Failed to create post. Please try again.");
    }
  };

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
