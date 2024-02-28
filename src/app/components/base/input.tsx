import * as React from "react";
import { Form, Input, message } from "antd";
import Image from "next/image";
import UserIcon from "../../assets/svgs/user-icon.svg";

interface RGInputProps {
  name: string;
  placeholder?: string;
  className?: string;
  message: string;
  label: string;
  src?: string;
  type?: string;
  disabled?: boolean;
  rules?: any;
  maxLength?: number;
  defaultValue?: string;
  value?: string;
}
export const RGInput = ({
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
  defaultValue,
  value,
}: RGInputProps) => {
  return (
    <div className={className}>
      <h1 className=" mt-2 text-[#444150] font-light    text-base">{label}</h1>
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
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          className="text-sm h-[60px] w-full mt-1  lg:px-5 border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
        />
      </Form.Item>
    </div>
  );
};
