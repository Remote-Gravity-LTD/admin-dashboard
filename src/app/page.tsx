"use client";
import Image from "next/image";
import RGLogo from "../../public/assets/icons/RGLogo.svg";
import LoginIllustration from "../../public/assets/images/undraw_my_location_re_r52x 2.png";
import Link from "next/link";
import { Button } from "./components/base/button";
import RGPhoneNumberInput from "./components/base/phone_number_select";
import { Form, notification } from "antd";
import EmailInput from "./components/base/email-input";
import PasswordInput from "./components/base/PasswordInput";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import http from "../../Service/http";
import { adminLogin } from "../../Service/request";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const onFinish = (values: any): void => {
    setLoading(true);
    let data = {
      email: values.email,
      password: values.password,
    };
    console.log(data);

    adminLogin(data)
      .then((res) => {
        console.log(res);
        http.defaults.headers[
          "Authorization"
        ] = `Bearer ${res.data.data.token}`;
        localStorage.setItem("token", res.data.data.token);
        setLoading(false);
        if (res.data.data.firstTmeLogin) {
          notification.success({
            message: "Login Successful ",
            duration: 4.5,
            description: `Hi ${data.email}, Kindly reset your password so you can have access to your dashboard.`,
          });
          router.push("/Auth/forget-password");
          return;
        }
        notification.success({
          message: "Login Successful ",
          duration: 4.5,
          description: `Hi ${data.email}, welcome back to your dashboard.`,
        });
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: "Login Unsuccessful ",
          duration: 4.5,
          description: err.message ? err.message : err.response.data.message,
        });
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white">
      <div className="w-full flex flex-row justify-center h-[1024px]">
        {/* <div className="w-full lg:w-[60%] bg-[#0B1F3F38] lg:p-[61px]">
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
        </div> */}
        <div className="w-full lg:w-[40%] px-[5%] h-[600px] mt-[100px] shadow-md py-[1%] bg-white">
          <div className="w-full pt-20 ">
            <h1 className="text-xl font-bold text-[#0B1F3F]">
              Sign into Remote Gravity Admin Dashboard
            </h1>
            <h1 className="text-[#0B1F3F] text-base font-normal">
              Provide your admin login details
            </h1>
            <div className="w-full mt-[30px]">
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                id="form_group"
              >
                <div className="w-full ">
                  <EmailInput
                    label={"Admin Email"}
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
                    name={"password"}
                    placeholder={"Input your password"}
                    message={"Incorrect password"}
                    label={"Admin Password"}
                    pattern={undefined}
                  />
                </div>
                <div className="w-full -mt-5">
                  <Link href={"/Auth/forget-password"}>
                    <h1 className="font-[400] text-[#0B1F3F] text-base">
                      Forgot Password?
                    </h1>
                  </Link>
                </div>

                <div className="w-full  mt-5 lg:mt-10 ">
                  <Button
                    className="mb-[11px] w-full"
                    text={"Sign In"}
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
