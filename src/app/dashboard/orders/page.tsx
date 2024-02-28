"use client";
import DashboardLayout from "@/app/components/layout/dashboardLayout";

function orders() {
  const orders = [
    {
      name: "John cena",
      id: 1,
      date: "01/23/2024",
      amount: "5.00",
      dealId: "RG000111",
      status: "Successful",
    },
    {
      name: "Adams John",
      id: 2,
      date: "01/23/2024",
      amount: "5.00",
      dealId: "RG000111",
      status: "Unsuccessful",
    },
    {
      name: "Deborah Piece",
      id: 3,
      date: "01/23/2024",
      amount: "5.00",
      dealId: "RG000111",
      status: "Successful",
    },
    {
      name: "Success Amodi",
      id: 4,
      date: "01/23/2024",
      amount: "5.00",
      dealId: "RG000111",
      status: "Unsuccessful",
    },
    {
      name: "Aminu Aminu",
      id: 5,
      date: "01/23/2024",
      amount: "5.00",
      dealId: "RG000111",
      status: "Unsuccessful",
    },
    {
      name: "Ruth Smith",
      id: 6,
      date: "01/23/2024",
      amount: "5.00",
      dealId: "RG000111",
      status: "Successful",
    },
  ];
  return (
    <>
      <DashboardLayout>
        <div className="text-black w-full h-screen ">
          <div className="w-full mt-[30px] pb-[133px]">
            <h1 className="text-[#0B1F3F] text-base font-[500]">Orders</h1>
            <div className="w-full rounded-[5px] border border-[#0B1F3F] mt-[10px] bg-white">
              <div className="flex w-full justify-between items-center  px-[20px] border-b h-[60px]  bg-[#002C73] border-[#0B1F3F]">
                <div className="w-[150px]  flex ">
                  <h1 className=" text-[#fff] text-base font-[400]">Date</h1>
                </div>
                <div className="w-[150px]  flex justify-center">
                  <h1 className=" text-[#fff] text-base font-[400]">Deal ID</h1>
                </div>
                <div className="w-[150px]  flex justify-center">
                  <h1 className=" text-[#fff] text-base font-[400]">
                    Payment Status
                  </h1>
                </div>
                <div className="w-[150px]  flex justify-center">
                  <h1 className=" text-[#fff] text-base font-[400]">Total</h1>
                </div>
              </div>

              {orders.map((order) => {
                return (
                  <div
                    key={order.id}
                    className="w-full h-[50px] px-[15px] flex  border-opacity-20 border-b border-b-[#0b1f3f] items-center justify-between"
                  >
                    <div className="w-[150px]  flex">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        {" "}
                        {order.date}
                      </h1>
                    </div>

                    <div className="w-[150px]  flex justify-center">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        {order.dealId}
                      </h1>
                    </div>
                    <div className="w-[150px]  flex justify-center">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        {order.status}
                      </h1>
                    </div>
                    <div className="w-[150px] flex justify-center">
                      <h1 className=" text-[#0B1F3F] text-base font-[400]">
                        {order.amount}
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

export default orders;
