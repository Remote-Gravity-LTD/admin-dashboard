"use client";
import DashboardLayout from "../components/layout/dashboardLayout";
import SuccessIcon from "../../../public/assets/icons/succesfulIcon.svg";
import PendingIcon from "../../../public/assets/icons/pendingIcon.svg";
import Image from "next/image";
import ForwardIcon from "../../../public/assets/icons/forwardArrow.svg";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getAllAdminRequests,
  getAllCorporateRequests,
  getAllIndividualRequests,
  getCorporateRequestsByStatus,
  getIndividualRequestsByStatus,
  getPendingRequests,
  getUsersProfile,
  getVerifiedRequests,
} from "../../../Service/request";
import { Dropdown, Menu, Select, Space, Table } from "antd";
import { RGSelect } from "../components/base/select";

function DashboardMain() {
  interface User {
    firstName: string;
    lastName: string;
    apiKey: string;
    isEmailVerfied: true;
    phone: string;
    role: string;
  }
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [pendingRequests, setPendingRequests] = useState<[]>([]);
  const [verifiedRequests, setVerifiedRequests] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [allRequests, setAllRequests] = useState([]);
  const [corporateRequests, setCorporateRequests] = useState([]);
  const [corporateAdhocRequests, setCorporateAdhocRequests] = useState([]);
  const [individualRequests, setIndividualRequests] = useState([]);
  const [individualAdhocRequests, setIndividualAdhocRequests] = useState([]);
  const [approvedIndividualRequests, setApprovedIndividualRequests] = useState(
    []
  );
  const [pendingIndividualRequests, setPendingIndividualdRequests] = useState(
    []
  );
  const [rejectedIndividualRequests, setrejectedIndividualdRequests] = useState(
    []
  );
  const [approvedCorporateRequests, setApprovedCorporateRequests] = useState(
    []
  );
  const [pendingCorporateRequests, setpendingCorporatedRequests] = useState([]);
  const [rejectedCorporateRequests, setRejectedCorporatedRequests] = useState(
    []
  );

  const queryIndividualRequests = (value: string) => {
    if (value === "All Requests") {
      setIndividualRequests(individualAdhocRequests);
      return;
    }
    getIndividualRequestsByStatus(value)
      .then((res) => {
        console.log(res.data.data);
        setIndividualRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setIndividualRequests([]);
      });
  };

  const getTotallIndividualPendingRequests = () => {
    getIndividualRequestsByStatus("pending")
      .then((res) => {
        console.log(res.data.data);
        setPendingIndividualdRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTotallIndividualApprovedRequests = () => {
    getIndividualRequestsByStatus("approved")
      .then((res) => {
        console.log(res.data.data);
        setApprovedIndividualRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTotallIndividualRejectedRequests = () => {
    getIndividualRequestsByStatus("rejected")
      .then((res) => {
        console.log(res.data.data);
        setrejectedIndividualdRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotallCorporatePendingRequests = () => {
    getCorporateRequestsByStatus("pending")
      .then((res) => {
        console.log(res.data.data);
        setpendingCorporatedRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotallCorporateApprovedRequests = () => {
    getCorporateRequestsByStatus("approved")
      .then((res) => {
        console.log("[hello", res.data.data.length);
        setApprovedCorporateRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTotalCorporateRejectedRequests = () => {
    getCorporateRequestsByStatus("rejected")
      .then((res) => {
        console.log(res.data.data);
        setRejectedCorporatedRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const queryCorporateRequests = (value: string) => {
    if (value === "All Requests") {
      setCorporateRequests(corporateAdhocRequests);
      return;
    }
    getCorporateRequestsByStatus(value)
      .then((res) => {
        console.log(res.data.data);
        setCorporateRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        setCorporateRequests([]);
      });
  };

  const getIndividualRequests = () => {
    getAllIndividualRequests()
      .then((res) => {
        console.log(res);
        setIndividualAdhocRequests(res.data.data);
        setIndividualRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCorporateRequests = () => {
    getAllCorporateRequests()
      .then((res) => {
        console.log(res);
        setCorporateAdhocRequests(res.data.data);
        setCorporateRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns: any = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>{record?.firstName}</h1>
        </div>
      ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>{record?.lastName}</h1>
        </div>
      ),
    },

    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>{record?.phone}</h1>
        </div>
      ),
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>{record?.email}</h1>
        </div>
      ),
    },

    {
      title: "Verification Type",
      dataIndex: "idType",
      key: "idType",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>{record?.idType}</h1>
        </div>
      ),
    },

    {
      title: "Verification Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>{record?.requestStatus}</h1>
        </div>
      ),
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => (
        <Link href={`dashboard/request/manage-request/${record?.id}`}>
          <div className="text-center">
            <h1>View Details</h1>
          </div>
        </Link>
      ),
    },
  ];

  const corporateColumn: any = [
    {
      title: "Business Name",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "CAC Reg No",
      dataIndex: "rcNumber",
      key: "rcNumber",
    },

    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },

    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Verification Status",
      dataIndex: "requestStatus",
      key: "requestStatus",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => (
        <Link href={`dashboard/request/manage-request/${record?.id}`}>
          <div className="text-center">
            <h1>View Details</h1>
          </div>
        </Link>
      ),
    },
  ];

  const getAllRequests = () => {
    getAllAdminRequests()
      .then((res) => {
        console.log(res);
        setAllRequests(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllRequests();
    getIndividualRequests();
    getCorporateRequests();
    getTotallIndividualApprovedRequests();
    getTotallIndividualPendingRequests();
    getTotallIndividualRejectedRequests();
    getTotallCorporateApprovedRequests();
    getTotallCorporatePendingRequests();
    getTotalCorporateRejectedRequests();
  }, []);
  const searchOptions = [
    {
      id: 1,
      name: "All Requests",
      value: "All Requests",
    },
    {
      id: 2,
      name: "Accepted Requests",
      value: "approved",
    },
    {
      id: 3,
      name: "Rejected Requests",
      value: "rejected",
    },
    {
      id: 4,
      name: "Pending Requests",
      value: "pending",
    },
  ];
  return (
    <div className="w-full h-screen bg-white pb-20">
      <DashboardLayout>
        <div className="text-black w-full h-screen bg-white p-5 mb-72">
          <h1 className="text-[#0B1F3F] text-xl font-[500]">Welcome,Admin!</h1>
          <h1 className="text-[#0B1F3F] text-base font-[400]">
            Nice to have you onboard
          </h1>
          <div className="w-full flex flex-col lg:flex-row mt-5 mb-20 flex-wrap justify-between">
            <div className="border bg-gray-100 w-full lg:w-[250px] mt-5  p-[10px] gap-8 flex flex-col border-grey-400 bg-grey-200 rounded-[5px]">
              <h1 className=" text-gray-600 text-lg  font-[500]">
                {" "}
                Total Requests
              </h1>
              <h1 className="text-gray-600 text-3xl  font-[500]">
                {" "}
                {allRequests?.length}
              </h1>
            </div>
            <div className="border bg-gray-100 w-full lg:w-[250px] mt-5  p-[10px] gap-8 flex flex-col border-grey-400 bg-grey-200 rounded-[5px]">
              <h1 className=" text-gray-600 text-lg  font-[500]">
                {" "}
                Accepted Requests
              </h1>
              <h1 className="text-gray-600 text-3xl  font-[500]">
                {" "}
                {approvedIndividualRequests?.length +
                  approvedCorporateRequests?.length}
              </h1>
            </div>
            <div className="border bg-gray-100 w-full lg:w-[250px] mt-5  p-[10px] gap-8 flex flex-col border-grey-400 bg-grey-200 rounded-[5px]">
              <h1 className=" text-gray-600 text-lg  font-[500]">
                {" "}
                Rejected Requests
              </h1>
              <h1 className="text-gray-600 text-3xl  font-[500]">
                {" "}
                {rejectedIndividualRequests?.length +
                  rejectedCorporateRequests?.length}
              </h1>
            </div>
            <div className="border bg-gray-100 w-full lg:w-[250px] mt-5  p-[10px] gap-8 flex flex-col border-grey-400 bg-grey-200 rounded-[5px]">
              <h1 className=" text-gray-600 text-lg  font-[500]">
                {" "}
                Pending Requests
              </h1>
              <h1 className="text-gray-600 text-3xl  font-[500]">
                {pendingIndividualRequests?.length +
                  pendingCorporateRequests?.length}
              </h1>
            </div>
          </div>

          <div className="w-full mt-5 flex flex-row justify-between mb-20 items-center">
            <h1 className="text-[#0B1F3F] text-xl font-[500]">
              All Individual Request
            </h1>
            <div className="flex  justify-between items-center">
              <h1 className="text-[#0B1F3F] text-xl font-[500]">Filter</h1>
              <div className="w-[200px] ml-5">
                <RGSelect
                  label={""}
                  options={searchOptions}
                  className={"w-full"}
                  value={undefined}
                  onChange={(value) => {
                    console.log(value);
                    queryIndividualRequests(value);
                  }}
                  placeholder={"Filter by Status"}
                  disabled={undefined}
                  name={""}
                  message={""}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-[20px] border border-gray-400 mb-20 rounded-[10px]">
            {loading ? (
              <div className="w-full h-[500px] flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 border-4 rounded-full  border-t-[#E3BD1E] border-l-[#E3BD1E] border-r-[#E3BD1E]"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
            ) : (
              <Table
                columns={columns}
                dataSource={individualRequests}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
                // loading={loader}
                scroll={{ x: "max-content" }}
              />
            )}
          </div>

          <div className="w-full mt-20 flex flex-row justify-between items-center  ">
            <h1 className="text-[#0B1F3F] text-xl font-[500]">
              All Corporate Request
            </h1>
            <div className="flex  justify-between items-center">
              <h1 className="text-[#0B1F3F] text-xl font-[500]">Filter</h1>
              <div className="w-[200px] ml-5">
                <RGSelect
                  label={""}
                  options={searchOptions}
                  className={"w-full"}
                  value={undefined}
                  onChange={(value) => {
                    console.log(value);
                    queryCorporateRequests(value);
                  }}
                  placeholder={"Filter by Status"}
                  disabled={undefined}
                  name={""}
                  message={""}
                />
              </div>
            </div>
          </div>
          <div className="w-full mt-[20px] border border-gray-400 rounded-[10px] mb-44">
            {loading ? (
              <div className="w-full h-[500px] flex justify-center items-center">
                <svg
                  className="animate-spin h-5 w-5 border-4 rounded-full  border-t-[#E3BD1E] border-l-[#E3BD1E] border-r-[#E3BD1E]"
                  viewBox="0 0 24 24"
                ></svg>
              </div>
            ) : (
              <Table
                columns={corporateColumn}
                dataSource={corporateRequests}
                pagination={{
                  defaultPageSize: 10,
                  showSizeChanger: true,
                  pageSizeOptions: ["10", "20", "30"],
                }}
                // loading={loader}
                scroll={{ x: "max-content" }}
              />
            )}
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}

export default DashboardMain;
