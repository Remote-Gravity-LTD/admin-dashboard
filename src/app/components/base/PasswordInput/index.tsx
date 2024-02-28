import * as React from "react";
import { Form, Input } from "antd";
// import PasswordIcon from "../../../assets/svgs/password-icon.svg";
import Image from "next/image";

interface PasswordInputProps {
  name: string;
  placeholder?: string;
  message: string;
  label: string;
  pattern: RegExp | string | undefined;
}
const PasswordInput = ({
  name,
  placeholder,
  message,
  label,
  pattern,
}: PasswordInputProps) => {
  const patternRegex =
    typeof pattern === "string" ? new RegExp(pattern) : pattern;

  return (
    <div className="w-full ">
      <label className=" mt-2 text-[#444150] font-normal">{label}</label>
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            message: message,
            pattern: patternRegex,
            min: 6,
          },
        ]}
      >
        <Input.Password
          placeholder={placeholder ?? "Password"}
          className="text-sm h-[60px] w-full  px-4 mt-1 border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
        />
      </Form.Item>
    </div>
  );
};

export default PasswordInput;
