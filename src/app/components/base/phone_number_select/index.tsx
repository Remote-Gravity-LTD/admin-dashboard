import * as React from "react";
import { Form } from "antd";
// import { PhoneInputModel } from "../../models/Input.class";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import startsWith from "lodash.startswith";

interface RGPhoneNumberInputProps {
  name: string;
  placeholder: string;
  message: string;
  handleOnChange: (value: string) => void;
  label: string;
  disabled?: boolean;
}

const RGPhoneNumberInput = ({
  name,
  placeholder,
  message,
  handleOnChange,
  label,
  disabled,
}: RGPhoneNumberInputProps) => {
  return (
    <div
      // name={name}
      // className="w-full "
      className=" w-full "
    >
      <label className="  mt-1 text-[#0B1F3F]    text-base font-light">
        {label}
      </label>
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            message: "Input a valid phone number",
            // len: 10 >,
            min: 10,
          },
        ]}
      >
        <PhoneInput
          isValid={(inputNumber, country, countries) => {
            return countries.some((country: any) => {
              return (
                startsWith(inputNumber, country.dialCode) ||
                startsWith(country.dialCode, inputNumber)
              );
            });
          }}
          disabled={disabled}
          onChange={handleOnChange}
          placeholder={placeholder}
          dropdownStyle={{
            borderRadius: 10,
            padding: 20,
          }}
          disableDropdown
          inputStyle={{
            // paddingTop: 20,
            height: 60,
            marginTop: 30,
            width: "100%",
            // borderRadius: 8,
          }}
          containerStyle={{
            width: "100%",
            height: 61,
            borderColor: "#0B1F3F",
            borderWidth: 1,
            borderRadius: 8,
          }}
          buttonStyle={{
            backgroundColor: "white",
            borderRightWidth: 0,
            borderBottomWidth: 0,
            // paddingLeft: 8,
            // borderTopLeftRadius: 8,
            // borderBottomLeftRadius: 8,
          }}
          country={"ng"}
          value="1425652"
          specialLabel={""}
        />
      </Form.Item>
    </div>
  );
};

export default RGPhoneNumberInput;
