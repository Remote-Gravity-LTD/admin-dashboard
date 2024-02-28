import { Form, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import { RuleObject } from "antd/lib/form";
import * as React from "react";
import PasswordInput from "../base/PasswordInput";
import EmailInput from "../base/email-input";

const OnboardingStepThree: React.FC = () => {
  let [isChecked, setIsChecked] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>("");
  const [modalContent, setModalContent] = React.useState<React.ReactElement>(
    <></>
  );

  // const onChange = async (e: CheckboxChangeEvent) => {
  //   console.log("checked = ", e.target.checked);
  //   await setIsChecked((isChecked = e.target.checked));
  //   console.log(isChecked);
  // };

  // const validation = (
  //   rule: RuleObject,
  //   value: any,
  //   callback: (error?: string) => void
  // ) => {
  //   if (isChecked) {
  //     return callback();
  //   }
  //   return callback("Please accept the terms and conditions");
  // };

  // const handleShowModal = (
  //   element: React.ReactElement,
  //   title: string
  // ): void => {
  //   setTitle(title);
  //   setModalContent(element);
  //   setOpen(true);
  // };

  return (
    <>
      <div className={"w-full flex flex-col"}>
        <div className={"w-full"}>
          <Form
            name="basic"
            // onFinish={onFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
            id="form_group"
          >
            <div className="w-full ">
              <EmailInput
                label={"Email"}
                name={"email"}
                // onBlur={(e) => checkEmails(e)}
                message={
                  "Please enter a valid email address for Remote Gravity!"
                }
                placeholder={"youremail@gmail.com"}
                className={undefined}
                disabled={undefined}
                onBlur={undefined}
                rules={undefined}
              />
            </div>
            <div className="w-full ">
              <PasswordInput
                name={"name"}
                placeholder={"Input your password"}
                message={"Kindly input alphanumeric characters of length of 8"}
                label={"Password"}
                pattern={`/^(?=.*\d)(?=.*[A-Z]).{8,}$/`}
              />
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default OnboardingStepThree;
