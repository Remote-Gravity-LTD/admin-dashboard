"use client";
import Image from "next/image";
import RGLogo from "../../../../public/assets/icons/RGLogo.svg";
import LoginIllustration from "../../../../public/assets/images/undraw_my_location_re_r52x 2.png";
import Link from "next/link";
import { Form, notification } from "antd";

import { Button } from "@/app/components/base/button";
import EmailInput from "@/app/components/base/email-input";
import { useRouter } from "next/navigation";
import { forgotPassword } from "../../../../Service/request";
import { useState } from "react";
import { json } from "stream/consumers";
function ForgotPasswordPage() {
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const router = useRouter();
  const onFinish = (values: any) => {
    setLoading(true);
    forgotPassword({ email: values.email })
      .then((res) => {
        console.log(res);
        router.push("/Auth/reset-password");
        localStorage.setItem("email", values.email);
        notification.success({
          message: `Mail sent to ${values.email} `,
          duration: 4.5,
          description: `We have sent an otp code to ${values.email}, kindly use it to reset your password.`,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: "Signup Unsuccessful ",
          duration: 4.5,
          description: err.response.data.message,
        });
        setLoading(false);
      });
    console.log(values);
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
                of getting your addresses verified in Nigeria.{" "}
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
                  <EmailInput
                    label={"Email Address"}
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

                <div className="w-full  mt-5 lg:mt-10 ">
                  <Button
                    className="mb-[11px] w-full"
                    text={"Send OTP"}
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

export default ForgotPasswordPage;
