import React, { forwardRef, memo } from "react";
import { Form, Select } from "antd";
import Image from "next/image";
import styled from "styled-components";

interface Option {
  name: string;
  value: string;
  id: number;
}

interface RGSelectProps {
  label: string;
  options: Option[];
  className: string | undefined;
  value: string | undefined;
  onChange: (value: string) => void;
  placeholder: string | undefined;
  disabled: boolean | undefined;
  name: string;
  message: string;
  rules?: any[]; // Update this to a more specific type if possible
}

const SelectWrapper = styled.div`
  .clever-select .ant-select-selector {
    height: 60px !important;
    border-width: 1px !important;
    border-color: #0b1f3f;
    padding-top: 100px;
    border-style: "solid";
    padding-bottom: 30px;
  }
`;

const { Option } = Select;

function RGSelect({
  label,
  options,
  className,
  value,
  onChange,
  placeholder,
  disabled,
  name,
  message,
  rules,
}: RGSelectProps) {
  return (
    <div className={className}>
      <SelectWrapper>
        <label className=" mt-1 text-[#0B1F3F]   text-base font-light">
          {label}
        </label>
        <Form.Item
          name={name}
          rules={
            rules || [
              {
                required: true,
                message,
              },
            ]
          }
        >
          <Select
            disabled={disabled}
            size="large"
            className={
              " h-[60px] w-full clever-select text-sm lg:w-[532px]  font-normal focus:outline-none  "
            }
            showSearch={false}
            placeholder={placeholder}
            onChange={onChange}
            options={options}
          >
            {options?.map((option) => {
              return (
                <Option key={option?.name} value={option?.value}>
                  {option.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </SelectWrapper>
    </div>
  );
}

export { RGSelect };
