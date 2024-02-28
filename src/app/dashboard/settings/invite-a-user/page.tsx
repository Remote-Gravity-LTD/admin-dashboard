"use client";
import PasswordInput from "@/app/components/base/PasswordInput";
import { Button } from "@/app/components/base/button";
import EmailInput from "@/app/components/base/email-input";
import { RGInput } from "@/app/components/base/input";
import { RGSelect } from "@/app/components/base/select";
import DashboardLayout from "@/app/components/layout/dashboardLayout";
import { Form, notification } from "antd";
import { useState } from "react";
import { createAdmin } from "../../../../../Service/request";
import { useRouter } from "next/navigation";

function CreateAdmin() {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [checked, setChecked] = useState(false);

  const router = useRouter();
  // const onChange = (e) => {
  //   console.log("checked = ", e.target.checked);
  //   setChecked(e.target.checked);
  // };
  const roles = [
    {
      id: 1,
      name: "Admin",
      value: "Admin",
    },
    {
      id: 2,
      name: "Sub-Admin",
      value: "SubAdmin",
    },
  ];

  const onFinish = (values: any) => {
    console.log(values);
    setLoading(true);
    createAdmin({
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
    })
      .then((res: any) => {
        console.log(res);
        setLoading(false);
        notification.success({
          message: "Successfully created a new admin",
          duration: 4.5,
          description: res.data.message,
        });
        router.push("/dashboard");
      })
      .catch((err: any) => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: "Error  creating a new user",
          duration: 4.5,
          description: err.response.data.message,
        });
      });
  };
  const onFinishFailed = (errors: any) => {
    console.log(errors);
  };
  return (
    <DashboardLayout>
      <div className="w-full h-screen ">
        <div className="w-full flex  justify-center">
          <div className="w-full lg:w-[400px]">
            <Form
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              id="form_group"
            >
              <div className="w-full ">
                <RGInput
                  name={"firstName"}
                  placeholder={"First Name"}
                  className={undefined}
                  message={"Enter the first name of the individual"}
                  label={"First Name"}
                  src={undefined}
                  type={undefined}
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
                  placeholder={"Doe"}
                  className={undefined}
                  message={"Enter the last name of the individual"}
                  label={"Last Name"}
                  src={undefined}
                  type={undefined}
                  disabled={undefined}
                  rules={undefined}
                  maxLength={undefined}
                  defaultValue={undefined}
                  value={undefined}
                />
              </div>

              <div className="w-full ">
                <EmailInput
                  name={"email"}
                  placeholder={"Email Address"}
                  className={undefined}
                  message={"Kindly input email address"}
                  label={"Email Address"}
                  disabled={undefined}
                  rules={undefined}
                  onBlur={undefined}
                />
              </div>

              <div className="w-full  mt-5 lg:mt-10 ">
                <Button
                  className="mb-[11px] w-full"
                  text={"Create Admin"}
                  onClick={undefined}
                  type={undefined}
                  show={loading}
                  disabled={loading}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CreateAdmin;
