"use client";
import SuccessIcon from "../../../public/assets/icons/succesfulIcon.svg";
import PendingIcon from "../../../public/assets/icons/pendingIcon.svg";
import Image from "next/image";
import ForwardIcon from "../../../public/assets/icons/forwardArrow.svg";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Dropdown, Menu, Select, Space, Table } from "antd";
import DashboardLayout from "@/app/components/layout/dashboardLayout";
import { RGSelect } from "@/app/components/base/select";

function AllRequests() {
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
  // const pendingRequests = [
  //   { name: "John cena", id: 1 },
  //   { name: "Adams John", id: 2 },
  //   { name: "Deborah Piece", id: 3 },
  //   {
  //     name: "Success Amodi",
  //     id: 4,
  //   },
  //   { name: "Aminu Aminu", id: 5 },
  //   { name: "Ruth Smith", id: 6 },
  // ];

  const columns: any = [
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
      title: "Phone Number",
      dataIndex: "lga",
      key: "lga",
    },

    {
      title: "Email",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "Verification Type",
      dataIndex: "verificationType",
      key: "verificationType",
    },

    {
      title: "Verification Status",
      dataIndex: "addressStatus",
      key: "addressStatus",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>View Details</h1>
        </div>
      ),
    },
  ];

  const corporateColumn: any = [
    {
      title: "Business Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "CAC Reg No",
      dataIndex: "lastName",
      key: "lastName",
    },

    {
      title: "First Name",
      dataIndex: "city",
      key: "city",
    },

    {
      title: "Last Name",
      dataIndex: "verificationType",
      key: "verificationType",
    },

    {
      title: "Email",
      dataIndex: "addressStatus",
      key: "addressStatus",
    },

    {
      title: "Position in Company",
      dataIndex: "lga",
      key: "lga",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (text: any, record: any) => (
        <div className="text-center">
          <h1>View Details</h1>
        </div>
      ),
    },
  ];

  const searchOptions = [
    {
      id: 1,
      name: "All Requests",
      value: "All Requests",
    },
    {
      id: 2,
      name: "Accepted Requests",
      value: "Accepted Requests",
    },
    {
      id: 3,
      name: "Rejected Requests",
      value: "Rejected Requests",
    },
    {
      id: 4,
      name: "Pending Requests",
      value: "Pending Requests",
    },
  ];
  return (
    <div className="w-full h-screen bg-white">
      <DashboardLayout>
        <div className="text-black w-full h-screen shadow-md bg-white p-5 ">
          <div className="w-full mt-5 flex flex-row justify-between items-center">
            <h1 className="text-[#0B1F3F] text-xl font-[500]">
              All Individual Request
            </h1>
            <div className="w-[200px]">
              <RGSelect
                label={""}
                options={searchOptions}
                className={"w-full"}
                value={undefined}
                onChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
                placeholder={"Filter by Status"}
                disabled={undefined}
                name={""}
                message={""}
              />
            </div>
          </div>
          <div className="w-full mt-[20px] border border-gray-400 rounded-[10px]">
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
                dataSource={allRequests}
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

          <div className="w-full mt-5 flex flex-row justify-between items-center">
            <h1 className="text-[#0B1F3F] text-xl font-[500]">
              All Corporate Request
            </h1>
            <div className="w-[200px]">
              <RGSelect
                label={""}
                options={searchOptions}
                className={"w-full"}
                value={undefined}
                onChange={function (value: string): void {
                  throw new Error("Function not implemented.");
                }}
                placeholder={"Filter by Status"}
                disabled={undefined}
                name={""}
                message={""}
              />
            </div>
          </div>
          <div className="w-full mt-[20px] border border-gray-400 rounded-[10px]">
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
                dataSource={allRequests}
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

export default AllRequests;
