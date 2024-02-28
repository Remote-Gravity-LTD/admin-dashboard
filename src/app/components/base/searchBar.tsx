import Image from "next/image";
// import SearchIcon from "../../assets/svgs/grey-search-icon.svg";
import { Form, Input } from "antd";

interface SearchBarProps {
  name: string;
  placeholder: string;
  className: string;
  message: string;
  label: string;
  src: string;
  type: string;
  disabled: boolean;
  rules?: any; // Update this to a more specific type if possible
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

function SearchBar({
  name,
  placeholder,
  className,
  message,
  label,
  src,
  type,
  disabled,
  rules,
  maxLength,
  onChange,
  value,
}: SearchBarProps) {
  return (
    <Form.Item
      rules={
        rules || [
          {
            required: true,
            message,
          },
        ]
      }
      name={name}
    >
      <Input
        value={value}
        maxLength={maxLength}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        // prefix={
        //   <Image
        //     src={SearchIcon}
        //     width={24}
        //     height={24}
        //     alt={"Hero"}
        //     className="cursor-pointer mr-[5%]"
        //   />
        // }
        className="w-[313px]  md:w-[500px] h-[50px] mt-[32px] md:mt-0 flex flex-row justify-center  rounded-[100px] items-center"
      />
    </Form.Item>
  );
}

export default SearchBar;
