import React, { useState } from "react";

interface SliderProps {
  name: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

const Slider: React.FC<SliderProps> = ({
  name,
  min,
  max,
  step = 1,
  onChange,
}) => {
  const [value, setValue] = useState(min);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  // Calculate the percentage for positioning the bubble
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="mb-10 mt-2 block text-left font-bold text-gray-600"
      >
        {name.charAt(0).toUpperCase() + name.slice(1)} (optional)
      </label>

      {/* Cost Bubble */}
      <div
        className="absolute top-8 -translate-x-1/2 transform rounded-full bg-blue-500 px-2 py-1 text-sm text-white shadow-md"
        style={{ left: `calc(${percentage}%)` }}
      >
        ${value}
        {/* Higher Triangle Pointer */}
        <div className="absolute -bottom-3 left-1/2 h-0 w-0 -translate-x-1/2 transform border-l-[10px] border-r-[10px] border-t-[16px] border-l-transparent border-r-transparent border-t-blue-500"></div>
      </div>

      {/* Slider Input */}
      <input
        type="range"
        id={name}
        name={name}
        className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-500"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />

      {/* endpoints */}
      <div className="mt-1 flex justify-between text-sm text-gray-600">
        <span>${min}</span>
        <span>${max}</span>
      </div>
    </div>
  );
};

export default Slider;
