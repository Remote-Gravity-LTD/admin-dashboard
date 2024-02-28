import { Form, Input } from "antd";
import * as React from "react";
import PasswordInput from "../base/PasswordInput";
import EmailInput from "../base/email-input";

const OnboardingStepTwo: React.FC = () => {
  return (
    <>
      <div className={"w-full flex flex-col"}>
        <div className={"w-full"}>
          <div className="w-full ">
            <EmailInput
              label={"Email"}
              name={"email"}
              // onBlur={(e) => checkEmails(e)}
              message={"Please enter a valid email address for Remote Gravity!"}
              placeholder={"youremail@gmail.com"}
              className={undefined}
              disabled={undefined}
              onBlur={undefined}
              rules={undefined}
            />
          </div>
          <div className="w-full ">
            <PasswordInput
              name={"password"}
              placeholder={"Input your password"}
              message={"Incorrect password"}
              label={"Create  a passsword"}
              pattern={undefined}
            />
          </div>
          <div className="w-full ">
            <label
              htmlFor="fullname"
              className="mt-2 text-[#444150] font-normal"
            >
              Confirm Password
            </label>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Confirm your password"
                className="text-sm h-[60px] w-full  px-4 mt-1 border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
              />
            </Form.Item>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnboardingStepTwo;
