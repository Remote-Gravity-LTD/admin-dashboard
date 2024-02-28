import * as React from "react";
import { Form, Input, message } from "antd";
import Image from "next/image";
// import EmailIcon from "../../assets/svgs/email-icon.svg";

interface EmailInputProps {
  name: string;
  className?: string;
  label: string;
  message: string;
  placeholder?: string;
  disabled?: boolean;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  rules?: any;
}
const EmailInput = ({
  name,
  className,
  label,
  message,
  placeholder,
  disabled,
  onBlur,
  rules,
}: // rules,
EmailInputProps) => {
  return (
    <div className={className}>
      <label className=" font-euclid mt-1 text-[#0B1F3F]    text-base font-light">
        {label}
      </label>
      <Form.Item
        name={name}
        rules={
          rules || [
            {
              required: true,
              message,
              type: "email",
            },
          ]
        }
      >
        <Input
          type={"email"}
          placeholder={placeholder}
          disabled={disabled}
          onBlur={onBlur}
          className="text-sm h-[60px]  font-euclid w-full pl-4 mt-2 lg:px-5  border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
        />
      </Form.Item>
    </div>
  );
};

export default EmailInput;
