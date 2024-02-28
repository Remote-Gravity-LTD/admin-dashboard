import { DatePicker, DatePickerProps, Form } from "antd";
import * as React from "react";
import { RGInput } from "../base/input";
import RGPhoneNumberInput from "../base/phone_number_select";

const OnboardingStepOne: React.FC = () => {
  const genders = [
    {
      name: "Male",
      value: "male",
    },
    {
      name: "Female",
      value: "female",
    },
  ];

  const [dob, setDob] = React.useState("");

  return (
    <>
      <div className={"w-full flex flex-col"}>
        <div className={"w-full"}>
          <div className="w-full ">
            <RGInput
              name={"firstName"}
              placeholder={"First Name"}
              className={undefined}
              message={"Kindly enter your First Name"}
              label={"First Name"}
              src={undefined}
              type={"text"}
              disabled={undefined}
              rules={undefined}
              maxLength={undefined}
              defaultValue={undefined}
              value={undefined}
            />
          </div>
          <div className="w-full ">
            <RGInput
              name={"lastName"}
              placeholder={"Last Name"}
              className={undefined}
              message={"Kindly enter your Last Name"}
              label={"Last Name"}
              src={undefined}
              type={"text"}
              disabled={undefined}
              rules={undefined}
              maxLength={undefined}
              defaultValue={undefined}
              value={undefined}
            />
          </div>

          <div className="w-full ">
            <RGPhoneNumberInput
              name={"PhoneNo"}
              placeholder={"Phone Number"}
              message={"Kindly Input your Phone Number"}
              handleOnChange={() => {}}
              label={"Phone Number"}
              disabled={undefined}
            />
          </div>
          {/* </Form> */}
        </div>
      </div>
    </>
  );
};

export default OnboardingStepOne;
