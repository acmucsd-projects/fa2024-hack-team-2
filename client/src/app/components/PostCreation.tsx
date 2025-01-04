import { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import uploadImageIcon from "/public/images/uploadImageIcon.svg";

interface MyComponentProps {}

const PostCreation: React.FC<MyComponentProps> = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    setImages((prev) => [...prev, ...files]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    setImages((prev) => [...prev, ...files]);
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>): void => e.preventDefault();

  return (
    <div className="mb-4 w-96 rounded bg-white p-4 outline outline-gray-300 text-center mx-auto mt-4">
      {/* heading */}
      <p className="mb-2 text-center text-xl font-bold text-gray-600">
        Create Post
      </p>
      <hr />
      {/* drag and drop box (disappears after upload) */}
      {
          images.length === 0 && (
            <div className="mt-4">
              <div
                onDrop={handleDrop}
                onDragOver={preventDefault}
                onDragEnter={preventDefault}
                onDragLeave={preventDefault}
                className="relative w-full pb-full border-2 border-dashed bg-gray-100 border-gray-400 flex items-center justify-center rounded-lg cursor-pointer flex-col"
                style={{ paddingTop: "100%" }}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleInputChange}
                  className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                />
                <div className="absolute inset-0 w-full h-full flex items-center justify-center flex-col pointer-events-none">
                  <Image width="80" height="80" src={uploadImageIcon} alt="Upload Icon" />
                  <p className="text-gray-600 text-center font-bold">Drop Images Here</p>
                  <p className="text-gray-500">or</p>
                  <span className="bg-blue-500 text-white px-2 py-1 rounded-sm">
                    Browse Files
                  </span>
                </div>
              </div>
              {/* show uploaded images count */}
              <div className="mt-2 text-gray-700">
                {images.length > 0 ? (
                  <p>Uploaded {images.length} image(s).</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )
        }
    </div>
  );
};

export default PostCreation;
