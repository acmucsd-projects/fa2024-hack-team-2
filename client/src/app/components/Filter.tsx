import React, { useState, useEffect, useRef } from "react";

interface FilterComponentProps {
  tags: string[];
  onTagFilterChange: (tags: string[]) => void;
}

const Filter: React.FC<FilterComponentProps> = ({
  tags,
  onTagFilterChange,
}) => {
  const [inputValue, setInputValue] = useState<string>("");
  const tagContainerRef = useRef<HTMLDivElement>(null);

  // function to add a tag
  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      const newTags = [...tags, inputValue.trim()];
      onTagFilterChange(newTags);
      setInputValue("");
    }
  };

  // function to remove a tag
  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    onTagFilterChange(newTags);
  };

  useEffect(() => {
    // scroll to the newest tag when tags are updated
    if (tagContainerRef.current) {
      tagContainerRef.current.scrollLeft = tagContainerRef.current.scrollWidth;
    }
  }, [tags]);

  return (
    <>
      {/* enter tag input + button */}
      <div className="mt-1 flex w-52 items-center gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-32 rounded-md border-gray-300 px-2 py-1 text-sm shadow"
          placeholder="Enter tag here..."
        />
        <button
          type="button"
          onClick={addTag}
          className="w-32 text-xs text-gray-400 hover:scale-100"
        >
          + Add Tag
        </button>
      </div>
      {/* list of tags */}
      <div
        ref={tagContainerRef}
        className="scrollbar-hide mt-2 flex w-52 gap-2 overflow-x-auto whitespace-nowrap"
      >
        {tags.map((tag, index) => (
          // tag
          <span
            key={index}
            className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 shadow-sm"
          >
            {tag}
            {/* x button */}
            <button
              onClick={() => removeTag(tag)}
              className="font-bold text-gray-400 hover:text-gray-500"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </>
  );
};

export default Filter;
