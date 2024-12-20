import clsx from "clsx";
interface MyComponentProps {
  htmlFor: string;
  text: string;
  size: string;
  type: string;
  isRequired: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const InputBox: React.FC<MyComponentProps> = ({
  htmlFor,
  text,
  size,
  type,
  isRequired,
  value,
  onChange,
  children,
}) => {
  return (
    <span className={clsx("relative grow", size)}>
      <label
        htmlFor={htmlFor}
        className="absolute -top-3 left-2 z-10 bg-white px-1"
      >
        {text}
        {isRequired ? <span className="px-1 text-red-500">*</span> : null}
      </label>
      <input
        name={htmlFor}
        className="w-full rounded-md p-2 outline-none drop-shadow transition-all focus:outline-blue-200 focus:drop-shadow-none"
        type={type}
        required={isRequired}
        value={value}
        onChange={onChange}
      />
      {children && <div className="absolute right-2 top-2">{children}</div>}
    </span>
  );
};

export default InputBox;
