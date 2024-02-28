"use client";
import Image from "next/image";
import RGLogo from "../../../../public/assets/icons/RGLogo.svg";
import LoginIllustration from "../../../../public/assets/images/undraw_my_location_re_r52x 2.png";
import Link from "next/link";
import { Form, notification } from "antd";
import PasswordInput from "@/app/components/base/PasswordInput";
import { Button } from "@/app/components/base/button";
import EmailInput from "@/app/components/base/email-input";
import { RGInput } from "@/app/components/base/input";
import { useRouter } from "next/navigation";
function OTPVerificationPage() {
  const router = useRouter();
  const onFinish = (values: any) => {
    console.log(values);
    router.push("/Auth/reset-password");
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
                    name={"email"}
                    // onBlur={(e) => checkEmails(e)}
                    message={"Please enter OTP Code sent to your phone"}
                    placeholder={"Please enter OTP Code sent to your phone"}
                    className={undefined}
                    disabled={undefined}
                    rules={undefined}
                    src={undefined}
                    type={undefined}
                    maxLength={undefined}
                    defaultValue={undefined}
                    value={undefined}
                  />
                </div>

                <div className="w-full  mt-5 lg:mt-10 ">
                  <Link href={"/Auth/reset-password"}>
                    <Button
                      className="mb-[11px] w-full"
                      text={"Send Request Link"}
                      onClick={undefined}
                      type={undefined}
                      show={undefined}
                      disabled={undefined} // show={isLoading}
                      // disabled={isLoading}
                    />
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default OTPVerificationPage;
