import { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import uploadImageIcon from "/public/images/uploadImageIcon.svg";

interface MyComponentProps {}

const PostCreation: React.FC<MyComponentProps> = () => {
  const [images, setImages] = useState<File[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    setImages((prev) => [...prev, ...files]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    setImages((prev) => [...prev, ...files]);
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>): void =>
    e.preventDefault();

  const handleNextImage = (): void => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePreviousImage = (): void => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="mx-auto mb-4 mt-4 w-96 rounded bg-white p-4 text-center outline outline-gray-300">
      {/* heading */}
      <p className="mb-2 text-center text-xl font-bold text-gray-600">
        Create Post
      </p>
      <hr />
      {/* drag and drop box (disappears after upload) */}
      {images.length === 0 && (
        <div className="mt-4">
          <div
            onDrop={handleDrop}
            onDragOver={preventDefault}
            onDragEnter={preventDefault}
            onDragLeave={preventDefault}
            className="pb-full relative flex w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-100"
            style={{ paddingTop: "100%" }}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleInputChange}
              className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            />
            <div className="pointer-events-none absolute inset-0 flex h-full w-full flex-col items-center justify-center">
              <Image
                width="80"
                height="80"
                src={uploadImageIcon}
                alt="Upload Icon"
              />
              <p className="text-center font-bold text-gray-600">
                Drop Images Here
              </p>
              <p className="text-gray-500">or</p>
              <span className="rounded-sm bg-blue-500 px-2 py-1 text-white">
                Browse Files
              </span>
            </div>
          </div>
        </div>
      )}
      {/* image preview */}
      {images.length > 0 && (
        <div className="relative mt-4 aspect-square w-full overflow-hidden rounded-lg bg-gray-100 drop-shadow-lg">
          {/* display the current image */}
          <Image
            src={URL.createObjectURL(images[currentImageIndex])}
            height="1000"
            width="1000"
            alt={`Uploaded file ${currentImageIndex + 1}`}
            className="h-full w-full object-contain"
          />
          {/* previous/next button */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePreviousImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 px-3 py-2 text-white hover:-translate-y-1/2 hover:scale-105"
              >
                ◀
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-gray-800 bg-opacity-50 px-3 py-2 text-white hover:-translate-y-1/2 hover:scale-105"
              >
                ▶
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCreation;
