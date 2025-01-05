import { useState } from "react";
import DragDropImagesBox from "./DragDropImagesBox";
import ImagePreview from "./ImagePreview";
import CreatePostTextBox from "./CreatePostTextBox";
import CreatePostMaterialBox from "./CreatePostMaterialBox";
import CreatePostBrandBox from "./CreatePostBrandBox";
import CreatePostSlider from "./CreatePostSlider";
import TagList from "./TagList";

interface MyComponentProps {}

const PostCreation: React.FC<MyComponentProps> = () => {
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [material, setMaterial] = useState<Record<string, number>>();
  const [brand, setBrand] = useState<string>("");
  const [cost, setCost] = useState<number>(100.0);
  const [tags, setTags] = useState<string[]>([]);

  const handleImageChange = (updatedImages: File[]) => {
    setImages(updatedImages);
  };

  return (
    <div
      className={`mx-auto mb-4 mt-4 rounded bg-white p-4 text-center outline outline-gray-300 ${
        images.length > 0 ? "w-[48rem]" : "w-96"
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
          onChange={handleImageChange}
        />
      )}
      {images.length > 0 && (
        <div className="flex flex-row">
          {/* left side */}
          <div className="flex flex-col">
            <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100 drop-shadow-lg">
              {/* image preview */}
              <ImagePreview images={images} />
            </div>
            {/* Tags */}
            <TagList title="Tag" onChange={(val) => setTags(val)} />
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
              min={1}
              max={1000}
              onChange={(val) => setCost(val)}
            />
            {/* button for post */}
            <button
              type="submit"
              className="mt-2 w-full rounded bg-blue-500 p-1 text-xl font-bold text-white"
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
