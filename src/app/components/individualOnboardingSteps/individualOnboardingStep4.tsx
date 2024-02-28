import * as React from "react";

const OnboardingStepFour: React.FC = () => {
  const [otp, setPin] = React.useState("456785");
  const getOtp = (otp: string): void => {
    setPin(otp);
  };
  return (
    <>
      <div className={"w-full flex flex-col"}>
        {/* <TextInput
          className="w-full"
          name={'pin'}
          placeholder={'6-digit-pin'}
        /> */}
        {/* <OtpInput length={6} emitOtp={getOtp} /> */}
      </div>
    </>
  );
};

export default OnboardingStepFour;
