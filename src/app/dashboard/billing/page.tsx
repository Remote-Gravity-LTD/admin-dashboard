"use client";

import DashboardLayout from "@/app/components/layout/dashboardLayout";
function Billing() {
  const billings = [
    {
      name: "John cena",
      id: 1,
      date: "01/23/2024",
      amount: "5.00",
      status: "Successful",
    },
    {
      name: "Adams John",
      id: 2,
      date: "01/23/2024",
      amount: "5.00",
      status: "Unsuccessful",
    },
    {
      name: "Deborah Piece",
      id: 3,
      date: "01/23/2024",
      amount: "5.00",
      status: "Successful",
    },
    {
      name: "Success Amodi",
      id: 4,
      date: "01/23/2024",
      amount: "5.00",
      status: "Unsuccessful",
    },
    {
      name: "Aminu Aminu",
      id: 5,
      date: "01/23/2024",
      amount: "5.00",
      status: "Unsuccessful",
    },
    {
      name: "Ruth Smith",
      id: 6,
      date: "01/23/2024",
      amount: "5.00",
      status: "Successful",
    },
  ];
  return (
    <>
      <DashboardLayout>
        <div className="text-black w-full h-screen ">
          <div className="w-full mt-[30px] pb-[133px]">
            <div className="w-full rounded-[5px] border border-[#0B1F3F] bg-white">
              <div className="flex w-full justify-between items-center  px-[20px] border-b h-[60px] border-[#0B1F3F]">
                <h1 className=" text-[#0B1F3F] text-base font-[500]">
                  Recent Transactions
                </h1>
                <h1 className=" text-[#0B1F3F] text-base font-[500]">
                  View all transactions
                </h1>
              </div>
              <div className="w-full flex justify-between  h-[50px] px-[15px] border-opacity-20  border-b border-b-[#0b1f3f] items-center">
                <div className="w-[150px]  flex ">
                  <h1 className=" text-[#0B1F3F] text-base font-[400]">Date</h1>
                </div>
                <div className="w-[150px]  flex justify-center">
                  <h1 className=" text-[#0B1F3F] text-base font-[400]">
                    Amount{" "}
                  </h1>
                </div>
                <div className="w-[150px]  flex justify-center">
                  <h1 className=" text-[#0B1F3F] text-base font-[400]">
                    Status{" "}
                  </h1>
                </div>
              </div>
              {billings.map((billing) => {
                return (
                  <div
                    key={billing.id}
                    className="w-full h-[50px] px-[15px] flex  border-opacity-20 border-b border-b-[#0b1f3f] items-center justify-between"
                  >
                    <div className="w-[150px]  flex">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        {" "}
                        {billing.name}
                      </h1>
                    </div>
                    <div className="w-[150px] flex justify-center">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        N {billing.amount}
                      </h1>
                    </div>
                    <div className="w-[150px]  flex justify-center">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        {billing.status}
                      </h1>
                    </div>
                  </div>
                );
              })}
              {/* <div className="w-full flex  justify-center">
                <div className="w-[122px] bg-[#0B1F3F] rounded-[10px] h-[41px]  flex my-[10px] justify-center items-center ">
                  <h1 className="text-[#fff] text-sm font-[400]">
                    Load More...
                  </h1>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Billing;
