import React, { useState, useRef, useEffect } from "react";

interface MyComponentProps {
  name: string;
  initialTags?: string[];
  onChange?: (tags: string[]) => void;
}

const TagList: React.FC<MyComponentProps> = ({
  name,
  initialTags = [],
  onChange,
}) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [newTagName, setNewTagName] = useState<string>("");
  const tagContainerRef = useRef<HTMLDivElement>(null);

  const handleAddTag = () => {
    if (newTagName.trim() === "") return;
    const updatedTags = [...tags, newTagName.trim()];
    setTags(updatedTags);
    setNewTagName("");
    if (onChange) onChange(updatedTags);
  };

  const handleDeleteTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
    if (onChange) onChange(updatedTags);
  };

  useEffect(() => {
    // scroll to the newest tag when tags are updated
    if (tagContainerRef.current) {
      tagContainerRef.current.scrollLeft = tagContainerRef.current.scrollWidth;
    }
  }, [tags]);

  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-md md:w-[28rem]">
      {/* title row */}
      <div className="mb-2 flex items-center justify-between">
        <p className="font-bold text-gray-700">{name}</p>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter tag here..."
            value={newTagName}
            onChange={(e) => setNewTagName(e.target.value)}
            className="rounded-md px-2 py-1 outline-none drop-shadow transition-all focus:outline-blue-200 focus:drop-shadow-none"
          />
          <button
            onClick={handleAddTag}
            className="mb-1 mt-2 cursor-pointer text-left text-sm text-blue-500 transition-all hover:scale-100 hover:text-blue-400"
          >
            Add tag
          </button>
        </div>
      </div>

      {/* tags */}
      <div
        ref={tagContainerRef}
        className="scrollbar-hide flex gap-2 overflow-x-auto whitespace-nowrap"
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm"
          >
            {tag}
            <button
              onClick={() => handleDeleteTag(index)}
              className="font-bold text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagList;
