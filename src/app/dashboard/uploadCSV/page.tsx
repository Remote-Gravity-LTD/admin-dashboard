"use client";

import { Button } from "@/app/components/base/button";
import { RGSelect } from "@/app/components/base/select";
import DashboardLayout from "@/app/components/layout/dashboardLayout";
import { notification } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

function UploadCSVToGlide() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let [UploadedRequestCSV, setUploadedRequestCSV] = useState<null>(null);

  const UploadCSVFile = (event: any) => {
    setUploadedRequestCSV((UploadedRequestCSV = event.target.files[0]));
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("address", file);
  };
  const SubmitCSVFromGlide = () => {
    if (!UploadedRequestCSV) {
      notification.error({
        message: `Error Submitting Addresses`,
        duration: 4.5,
        description: "File containing Address not uploaded",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();

    const token = localStorage.getItem("token");

    formData.append("address", UploadedRequestCSV, "[PROXY]");

    axios
      .post(
        `${process.env.NEXT_PUBLIC_BASE_URL}admins/upload/addresses`,
        formData,
        {
          headers: {
            Authorization: " Bearer " + token,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        notification.success({
          message: `Addresses submitted`,
          duration: 4.5,
          description:
            "Congratulations, these Addresses request  has been sent to us for verification.",
        });
        router.push("/dashboard/request");
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: `Error Submitting Addresses`,
          duration: 4.5,
          description: err.response.data.message,
        });
      });
  };
  return (
    <DashboardLayout>
      <div className="w-full flex justify-center pb">
        <div className="w-full lg:w-[50%] bg-white rounded-md shadow-md p-5 px-[30px] mt-[25px]">
          <div className="w-full mt-[10px] px-[30px]">
            <h1 className="text-[#0B1F3F] font-[400] text-base">
              Upload Csv files to Glide
            </h1>

            <h1 className="text-[#0B1F3F] text-base font-normal">
              Select File
            </h1>
            <div className="w-full h-[60px] justify-between rounded-[10px] border border-[#0B1F3F] px-[10px] items-center flex bg-white">
              <input
                type="file"
                name="file"
                accept=".csv"
                onChange={UploadCSVFile}
                className=" text-[#0B1F3F] text-sm font-[400] h-[28px] flex items-center justify-center rounded-[5px]"
              />
              <h1 className="text-black text-sm">
                {" "}
                {/* {individualUploadedRequestCSv?.name} */}
              </h1>
            </div>

            <Button
              text={"Submit CSV File"}
              className={"w-full bg-[#002C73] mt-[30px] rounded-[5px]"}
              onClick={SubmitCSVFromGlide}
              type={undefined}
              show={loading}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default UploadCSVToGlide;
