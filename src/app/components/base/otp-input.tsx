import { Form, Input } from "antd";
import React, { useState } from "react";
import OtpInput from "react-otp-input";

interface RGOTPInputProps {
  otp: string;
  setOtp: (otp: string) => void;
  name: string;
  message: string;
  placeholder: string;
}

export const RGOTPInput = ({
  otp,
  setOtp,
  name,
  message,
  placeholder,
}: RGOTPInputProps) => {
  // const [otp, setOtp] = useState("");

  return (
    <Form.Item
      name={name}
      rules={[
        {
          required: true,
          message: "Please enter OTP!",
        },
      ]}
    >
      <OtpInput
        value={otp}
        onChange={setOtp}
        numInputs={6}
        renderSeparator={<span className="items-center  w-4  flex"></span>}
        renderInput={(props) => (
          <div className=" h-[64px] w-[32px] lg:w-[64px] bg-[#F9F9F9]  flex items-center justify-center   rounded-md border border-[#0B1F3F]">
            <input
              {...props}
              className="text-black bg-[#F9F9F9] text-2xl lg:text-4xl  "
            />
          </div>
        )}
      />
    </Form.Item>
  );
};
