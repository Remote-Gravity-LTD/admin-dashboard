"use client";
import Image from "next/image";
import RGLogo from "../../../../public/assets/icons/RGLogo.svg";
import LoginIllustration from "../../../../public/assets/images/undraw_my_location_re_r52x 2.png";
import Link from "next/link";
import { Form, Input, notification } from "antd";
import PasswordInput from "@/app/components/base/PasswordInput";
import { Button } from "@/app/components/base/button";
import { RGInput } from "@/app/components/base/input";
import { useRouter } from "next/navigation";
import { resetPassword } from "../../../../Service/request";
import { useState } from "react";
function ResetPasswordPage() {
  const resetPasswordEmail: string | null =
    globalThis.window?.localStorage.getItem("email")
      ? localStorage.getItem("email")
      : null;
  console.log(resetPasswordEmail);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const router = useRouter();
  const onFinish = (values: any) => {
    setLoading(true);
    let data = {
      token: values.otp,
      email: resetPasswordEmail,
      password: values.password,
    };
    console.log(data);

    resetPassword(data)
      .then((res) => {
        console.log(res);
        notification.success({
          message: `Successfull reset password `,
          duration: 4.5,
          description: `Congratulations, you have successfully reset your password.`,
        });
        setLoading(false);

        router.push("/");
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "reset password Unsuccessful ",
          duration: 4.5,
          description: err.response.data.message,
        });
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <div className="w-full flex flex-row justify-between h-[1024px]">
        <div className="w-full lg:w-[60%] bg-[#0B1F3F38] lg:p-[61px]">
          <div className="w-full flex justify-start">
            <Image
              src={RGLogo}
              className="w-[157px]  h-[25px] "
              alt="reliable"
            />
          </div>
          <div className="mt-[131px] w-full flex justify-center">
            <Image
              src={LoginIllustration}
              className="w-[519px]  h-[459px] "
              alt="reliable"
            />
          </div>
          <div className="w-full justify-center flex">
            <div className="w-[540px] mt-[62px]">
              <h1 className="text-[#0B1F3F] font-bold text-2xl text-center">
                Do You Know?
              </h1>
              <h1 className="text-[#0B1F3F] font-normal text-base text-center">
                Remote Gravity is your most trusted, fastest and reliable medium
                of getting your addresses verified in Nigeria{" "}
              </h1>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[40%] px-[5%] py-[1%] bg-white">
          <div className="w-full mt-[161px]">
            <h1 className="text-xl font-bold text-[#0B1F3F]">
              Forgot Password
            </h1>
            <h1 className="text-[#0B1F3F] text-base font-normal">
              Enter your email below and we’ll send you an OTP code
            </h1>
            <div className="w-full mt-[60px]">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                id="form_group"
              >
                <div className="w-full ">
                  <RGInput
                    label={"OTP CODE"}
                    name={"otp"}
                    // onBlur={(e) => checkEmails(e)}
                    message={"Please enter OTP Code sent to your phone"}
                    placeholder={"Please enter OTP Code sent to your phone"}
                    className={undefined}
                    disabled={undefined}
                    rules={undefined}
                    src={undefined}
                    type={"number"}
                    maxLength={undefined}
                    defaultValue={undefined}
                    value={undefined}
                  />
                </div>
                <div className="w-full ">
                  <PasswordInput
                    name={"password"}
                    placeholder={"Input your password"}
                    message={"Incorrect password"}
                    label={"Password"}
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
                        message: "Please confirm your new password!",
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
                      placeholder="Confirm your new password"
                      className="text-sm h-[60px] w-full  px-4 mt-1 border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
                    />
                  </Form.Item>
                </div>

                <div className="w-full  mt-5 lg:mt-10 ">
                  <Button
                    className="mb-[11px] w-full"
                    text={"Reset Password"}
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
      </div>
    </main>
  );
}

export default ResetPasswordPage;
