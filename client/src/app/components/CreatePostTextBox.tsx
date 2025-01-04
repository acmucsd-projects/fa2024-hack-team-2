interface MyComponentProps {
  name: string;
  onChange: (value: string) => void;
}

const CreatePostTextBox: React.FC<MyComponentProps> = ({ name, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <>
      <label
        htmlFor={name}
        className="mb-1 mt-2 text-left font-bold text-gray-600"
      >
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </label>
      <input
        type="text"
        name={name}
        className="w-full rounded-md p-2 outline-none drop-shadow transition-all focus:outline-blue-200 focus:drop-shadow-none"
        placeholder={`Edit ${name} here...`}
        onChange={handleChange}
      />
    </>
  );
};

export default CreatePostTextBox;
