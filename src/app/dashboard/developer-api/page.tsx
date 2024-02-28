"use client";
import DashboardLayout from "@/app/components/layout/dashboardLayout";

function DeveloperApi() {
  return (
    <>
      <DashboardLayout>
        <div className="text-black w-full h-screen">
          {" "}
          <div className="w-full h-[214px] bg-white shadow-md flex items-center justify-center rounded-[5px]">
            <div className="w-full flex justify-center">
              <div>
                <h1 className="">
                  Contact Our Support team to access our API service
                </h1>
                <div className="w-full flex mt-[24px] justify-center">
                  <div className="w-[198px] h-[60px] bg-[#002C73] flex items-center justify-center rounded-[5px]">
                    <h1 className="text-white font-[500px] text-lg">
                      Contact Us
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default DeveloperApi;
