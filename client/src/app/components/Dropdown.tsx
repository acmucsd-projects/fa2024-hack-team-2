interface DropdownComponentProps {
    options: string[];
    selected: string;
    onDropdownChange: (selected: string) => void;
  }
  
  const Dropdown: React.FC<DropdownComponentProps> = ({
    options,
    selected,
    onDropdownChange,
  }) => {
    return (
      <div className="mb-4 w-32 rounded-md shadow">
        <select
          value={selected}
          onChange={(e) => onDropdownChange(e.target.value)}
          className="focus:border-indigo-500 focus:ring-indigo-500 mt-1 block w-full rounded-md border-gray-300 px-2 py-1 text-sm shadow-sm"
        >
          {options.map((option: string) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default Dropdown;
  