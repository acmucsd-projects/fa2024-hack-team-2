import { useState, DragEvent, ChangeEvent } from "react";
import Image from "next/image";

interface MyComponentProps {
  images: File[];
}
const ImagePreview: React.FC<MyComponentProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const handleNextImage = (): void => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePreviousImage = (): void => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <>
      <Image
        src={URL.createObjectURL(images[currentImageIndex])}
        height="1000"
        width="1000"
        alt={`Uploaded file ${currentImageIndex + 1}`}
        className="object-contain md:h-[28rem] md:w-[28rem]"
      />
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
    </>
  );
};

export default ImagePreview;
