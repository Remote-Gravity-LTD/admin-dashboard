"use client";
import PasswordInput from "@/app/components/base/PasswordInput";
import { Button } from "@/app/components/base/button";
import EmailInput from "@/app/components/base/email-input";
import { RGInput } from "@/app/components/base/input";
import DashboardLayout from "@/app/components/layout/dashboardLayout";
import { Dropdown, Form, Menu, Space, Table, notification } from "antd";
import { useEffect, useState } from "react";
import {
  UpdatePassword,
  getAllAdmins,
  getInvitedUsers,
  getUsersProfile,
} from "../../../../Service/request";
import Link from "next/link";

function Settings() {
  const [showUsers, setShowUsers] = useState(false);
  const [showOrganizationDetails, setShowOrganizationDetails] = useState(false);
  const [showEditDetails, setShowEditDetails] = useState(true);
  const [loading, setLoading] = useState<boolean | undefined>(false);
  const [userInfo, setUserInfo] = useState<UserOrNullableFunction>(null);
  const [admins, setAdmins] = useState([]);

  const [allInvitedUsers, setInvitedUsers] = useState<any>(null);

  interface user {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    status: boolean;
  }

  type UserOrNullableFunction = user | null;

  const columns = [
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  const getAllAdminsHandler = () => {
    getAllAdmins()
      .then((res) => {
        setAdmins(res.data.data.admins);
      })
      .catch((err) => {});
  };
  const onFinish = (values: any) => {
    setLoading(true);
    UpdatePassword({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    })
      .then((res) => {
        setLoading(false);
        notification.success({
          message: "Successfully updated your password ",
          duration: 4.5,
          description: `Successfully updated your password`,
        });
      })
      .catch((err) => {
        setLoading(false);
        notification.error({
          message: "Error updating your Password ",
          duration: 4.5,
          description: err.response.data.message,
        });
      });
  };

  const getUserProfile = () => {
    getUsersProfile()
      .then((res) => {
        if (res.data.data.role !== "administrator") {
          setShowEditDetails(true);
          setShowOrganizationDetails(false);
          setShowUsers(false);
        }
        setUserInfo(res.data.data);
      })
      .catch((err) => {});
  };

  const getAllInvitedUsers = () => {
    getInvitedUsers()
      .then((res) => {
        setInvitedUsers(res.data.data);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getUserProfile();
    getAllInvitedUsers();
    getAllAdminsHandler();
  }, []);
  const onFinishFailed = (errors: any) => {};
  return (
    <>
      <DashboardLayout>
        <div className="h-full w-full pb-[100px]">
          <h1 className="text-[#002C73] text-base font-[400] mt-[20px] ">
            Current Admins
          </h1>
          <div className="w-full flex mt-[10px] justify-center">
            <div className="w-full  rounded-[10px] pb-[50px]  bg-white shadow-sm">
              <div className="w-full flex justify-between px-[30px] pb-[15px] border-b border-gray-400 items-center">
                <div className="w-full lg:w-[583px] h-[55px] flex py-[20px]">
                  <div
                    onClick={() => {
                      setShowEditDetails(true);
                      setShowOrganizationDetails(false);
                      setShowUsers(false);
                    }}
                    className={
                      "px-[23px] " +
                      (showEditDetails
                        ? "border-b-[2px] h-[35px] border-[#002C73]"
                        : "")
                    }
                  >
                    <h1 className="text-[#002C73] text-base font-[400] mt-2 ">
                      Edit Details
                    </h1>
                  </div>

                  <div
                    onClick={() => {
                      setShowUsers(true);
                      setShowOrganizationDetails(false);
                      setShowEditDetails(false);
                    }}
                    className={
                      "px-[23px] " +
                      (showUsers
                        ? "border-b-[2px] h-[35px]  border-[#002C73]"
                        : "")
                    }
                  >
                    <h1 className="text-[#002C73] text-base font-[400] mt-2 ">
                      Users
                    </h1>
                  </div>

                  {userInfo?.role === "administrator" ? (
                    <div
                      onClick={() => {
                        setShowOrganizationDetails(true);
                        setShowUsers(false);
                        setShowEditDetails(false);
                      }}
                      className={
                        "px-[23px] " +
                        (showOrganizationDetails
                          ? "border-b-[2px] h-[35px] border-[#002C73]"
                          : "")
                      }
                    >
                      <h1 className="text-[#002C73] text-base font-[400] mt-2 ">
                        Organizational Details
                      </h1>
                    </div>
                  ) : null}
                </div>
                <Link href={"/dashboard/settings/invite-a-user"}>
                  <div className="w-[150px] h-[30px] mt-[20px]  bg-[#E3BD1E] rounded-[5px] flex items-center justify-center">
                    <h1 className="font-[500] text-base text-white">
                      Create Admin
                    </h1>
                  </div>
                </Link>
              </div>
              {showUsers ? (
                <div className="w-full px-[30px] mt-[25px]">
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
                      dataSource={admins}
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
              ) : null}
              {showEditDetails ? (
                <div className="w-full flex justify-center">
                  {" "}
                  <div className="w-full lg:w-[400px]">
                    <div className="w-full mt-[60px]">
                      {userInfo ? (
                        <>
                          <div className="w-full ">
                            <RGInput
                              label={"First Name"}
                              name={"firstName"}
                              message={"Please enter your first name!"}
                              // placeholder={"John"}
                              className={undefined}
                              disabled={true}
                              rules={undefined}
                              src={undefined}
                              type={undefined}
                              maxLength={undefined}
                              defaultValue={`${userInfo?.firstName}`}
                              value={`${userInfo?.firstName}`}
                            />
                          </div>

                          <div className="w-full ">
                            <RGInput
                              label={"Last Name"}
                              name={"lastName"}
                              message={"Please input your  Last Name!"}
                              // placeholder={"Doe"}
                              className={undefined}
                              disabled={true}
                              rules={undefined}
                              src={undefined}
                              type={undefined}
                              maxLength={undefined}
                              defaultValue={`${userInfo?.lastName}`}
                              value={`${userInfo?.lastName}`}
                            />
                          </div>
                        </>
                      ) : null}
                      <Form
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        id="form_group"
                      >
                        <div className="w-full ">
                          <PasswordInput
                            name={"currentPassword"}
                            placeholder={"Current Password"}
                            message={"Kindly Input your current password"}
                            label={"Current Password"}
                            pattern={undefined}
                          />
                        </div>
                        <div className="w-full ">
                          <PasswordInput
                            name={"newPassword"}
                            placeholder={"New Password"}
                            message={"Kindly Input your New password"}
                            label={"New Password"}
                            pattern={undefined}
                          />
                        </div>

                        <div className="w-full  mt-5 lg:mt-10 ">
                          <Button
                            className="mb-[11px] w-full"
                            text={"Update Password"}
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
              ) : null}
              {/* {showBulkuser ? (
              <div className="w-full">
                <div className="w-full  px-[30px]  h-[68px]  border-b-[1px] border-[#0B1F3F] flex items-center">
                  <h1 className="text-[#0B1F3F] text-lg font-medium">
                    New Bulk user
                  </h1>
                </div>
                <div className="w-full justify-end flex mt-[18px] px-[30px]">
                  <h1 className="text-[#0B1F3F] text-lg font-normal underline">
                    Download Template
                  </h1>
                </div>
                <div className="w-full mt-[10px] px-[30px]">
                  <h1 className="text-[#0B1F3F] text-base font-normal">
                    Select File
                  </h1>
                  <div className="w-full h-[60px] rounded-[10px] border border-[#0B1F3F] px-[10px] items-center flex bg-white">
                    <input
                      type="file"
                      className=" text-[#0B1F3F] text-sm font-[400] bg-[#EDEDED] w-[114px] h-[28px] flex items-center justify-center rounded-[5px]"
                    />
                   
                  </div>
                  <Button
                    text={"Checkout"}
                    className={"w-full bg-[#002C73] mt-[30px] rounded-[5px]"}
                    onClick={undefined}
                    type={undefined}
                    show={undefined}
                    disabled={undefined}
                  />
                </div>
              </div>
            ) : null} */}
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}

export default Settings;
