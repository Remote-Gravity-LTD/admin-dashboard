import DashboardLayout from "@/app/components/layout/dashboardLayout";
import Image from "next/image";
import RGLogo from "../../../../../public/assets/icons/RGLogo.svg";

function BillingInvoice() {
  return (
    <DashboardLayout>
      <div className="w-full h-screen flex justify-center">
        <div className="w-full lg:w-[760px] border  border-[#FFD009]">
          <div className="w-full p-10 flex justify-between">
            <Image
              src={RGLogo}
              className="w-[157px]  h-[25px] "
              alt="reliable"
            />
            <h1 className="text-[#0B1F3F] font-[700] text-xl">INVOICE</h1>
          </div>
          <div className="w-full flex justify-end">
            <div className="w-[350px]">
              <div className="mt-[20px]">
                {" "}
                <h1 className="text-[#0B1F3F] font-[600] text-base">
                  Remote Gravity :{" "}
                  <span className="text-[#0B1F3F] font-[400] text-base">
                    1B example street , Lagos
                  </span>
                </h1>
              </div>
              <div className="mt-[20px]">
                {" "}
                <h1 className="text-[#0B1F3F] font-[600] text-base">
                  Email :{" "}
                  <span className="text-[#0B1F3F] font-[400] text-base">
                    Remotegravity@example.com
                  </span>
                </h1>
              </div>
              <div className="mt-[20px]">
                {" "}
                <h1 className="text-[#0B1F3F] font-[600] text-base">
                  Phone :{" "}
                  <span className="text-[#0B1F3F] font-[400] text-base">
                    080123456789
                  </span>
                </h1>
              </div>
              <div className="mt-[20px]">
                {" "}
                <h1 className="text-[#0B1F3F] font-[600] text-base">
                  Website :{" "}
                  <span className="text-[#0B1F3F] font-[400] text-base">
                    Remotegravity.com
                  </span>
                </h1>
              </div>
            </div>
          </div>
          <div className="w-full mt-5 border-y border-[#E3BD1E] py-[20px] flex justify-between">
            <div className=" w-[200px] flex ">
              <h1 className="text-[#0B1F3F] font-[500] text-base">Bill to:</h1>
              <div className="w-[150px]">
                {" "}
                <h1 className="text-[#0B1F3F] font-[500] text-base ml-2">
                  Example Bank 1 example street, Lagos Nigeria
                </h1>
              </div>
            </div>
            <div className="w-[200px]">
              {" "}
              <h1 className="text-[#0B1F3F] font-[500] text-base">
                Date: 01/20/2024
              </h1>
              <h1 className="text-[#0B1F3F] font-[500] text-base">
                Due Date: 01/22/2024
              </h1>
            </div>
          </div>
          <div className="w-full px-[5%] mt-[20px] flex justify-center">
            <div className="w-full h-[51px] bg-[#E3BD1E] rounded-[10px] flex justify-between px-[5%] items-center">
              <h1 className="text-white font-[700] text-base">Description</h1>
              <h1 className="text-white font-[700] text-base">
                {" "}
                Numer of Individual
              </h1>
              <h1 className="text-white font-[700] text-base"> Price</h1>
              <h1 className="text-white font-[700] text-base"> Amount</h1>
            </div>
          </div>
          <div className="w-full px-[6%] mt-[20px] flex justify-between ">
            <h1 className="text-[#0B1F3F] font-[600] text-base">Bulk Upload</h1>
            <h1 className="text-[#0B1F3F] font-[600] text-base">50</h1>
            <h1 className="text-[#0B1F3F] font-[600] text-base">N150</h1>
            <h1 className="text-[#0B1F3F] font-[600] text-base">N7,500</h1>
          </div>
          <div className="w-full flex justify-end px-[5%]">
            <div>
              <div className="mt-[100px]">
                {" "}
                <h1 className="text-[#0B1F3F] font-[400] text-base">
                  Subtotal :{" "}
                  <span className="text-[#0B1F3F] font-[600] text-base">
                    7,500
                  </span>
                </h1>
              </div>
              <div className=" w-full border-b border-[#FFD009] pb-3">
                {" "}
                <h1 className="text-[#0B1F3F] font-[400] text-base">
                  Tax (0%) :{" "}
                  <span className="text-[#0B1F3F] font-[600] text-base">
                    N 0
                  </span>
                </h1>
              </div>
              <div className="">
                {" "}
                <h1 className="text-[#0B1F3F] font-[400] text-base">
                  Total :{" "}
                  <span className="text-[#0B1F3F] font-[600] text-base">
                    N 7,500
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default BillingInvoice;
