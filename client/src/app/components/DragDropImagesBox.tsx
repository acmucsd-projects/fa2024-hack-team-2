import { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";
import uploadImageIcon from "/public/images/uploadImageIcon.svg";

interface MyComponentProps {
  initialImages: File[];
  onChange?: (updatedImages: File[]) => void;
}

const DragDropImagesBox: React.FC<MyComponentProps> = ({
  initialImages,
  onChange,
}) => {
  const [images, setImages] = useState<File[]>(initialImages);

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    if (onChange) onChange(updatedImages);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((file) =>
      file.type.startsWith("image/"),
    );

    const updatedImages = [...images, ...files];
    setImages(updatedImages);
    if (onChange) onChange(updatedImages);
  };

  const preventDefault = (e: DragEvent<HTMLDivElement>): void =>
    e.preventDefault();

  return (
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
  );
};

export default DragDropImagesBox;
