/* eslint-disable react/no-unescaped-entities */
"use client";
import DashboardLayout from "@/app/components/layout/dashboardLayout";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { notification } from "antd";
import { useParams } from "next/navigation";
import {
  ApproveRequest,
  adminDeactivateApprovedUser,
  fetchRequestDetails,
  fetchUserDetails,
  getUsersProfile,
  getrequestDetailApi,
  rejectRequest,
} from "../../../../../../Service/request";
import CancelIcon from "../../../../../../public/assets/icons/prescriber-cancel-icon.svg";

type requestType = {
  firstName: string;
  lastName: string;
  phone: string;
  addressStatus: string;
  dob: string;
  email: string;
  idType: string;
  landmark: string;
  lga: string;
  GPSCoord: string;
  googleMapLink: string;
  verificationAgentRemark: string;
  verificationType: string;
  verificationAddress: string;
  neighBorRemark: string;
  neigborContact: string;
  operationalStatus: string;
  companyName: string;
  companyAddress: string;
  requestStatus: string;
  rcNumber: string;
  idNumber: string;
};
function ViewReport() {
  const ref = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  console.log(id);

  const [requestDetails, setRequestDetails] = useState<requestType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
  const [reasonforRejection, setReasonForRejection] = useState<string>("");
  const [showDeactivationModal, setShowDeactivationModal] =
    useState<boolean>(false);
  const [reasonforDeactivation, setReasonForDeactivation] =
    useState<string>("");
  const getRequestsDetails = () => {
    getrequestDetailApi(id)
      .then((res) => {
        console.log(res.data.data);

        setRequestDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUserDetails = () => {
    console.log(requestDetails?.email);

    fetchUserDetails({
      workEmail: "tolu18@yopmail.com",
    })
      .then((res) => {
        console.log("user details", res.data.data);
        setRequestDetails(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deactivateApprovedUserHandler = () => {
    if (reasonforDeactivation === "") {
      notification.error({
        message: "Reason Required",
        description: "Please provide a reason for Deactivation",
      });
      return;
    }

    adminDeactivateApprovedUser({
      email: requestDetails?.email,
      reasonForDeactivation: reasonforDeactivation,
    })
      .then((res) => {
        console.log(res);
        notification.success({
          message: "Request Approved!",
          duration: 4.5,
          description: `You have successfully deactivated ${
            requestDetails?.companyName
              ? requestDetails?.companyName
              : `${requestDetails?.firstName} ${requestDetails?.lastName}`
          } from the platform`,
        });
        setShowDeactivationModal(false);
        getRequestsDetails();
      })
      .catch((err) => {
        console.log(err);
        notification.error({
          message: " Deactivation Unsuccessful!",
          duration: 4.5,
          description: err.message ? err.message : err.response.data.message,
        });
      });
  };

  const approveRequestHandler = () => {
    ApproveRequest(id)
      .then((res) => {
        notification.success({
          message: "Request Approved!",
          duration: 4.5,
          description: `You have successfully approved ${
            requestDetails?.companyName
              ? requestDetails?.companyName
              : `${requestDetails?.firstName} ${requestDetails?.lastName}`
          } onboarding request`,
        });
        setShowApprovalModal(false);
        getRequestsDetails();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: " Request Approval Unsuccessful!",
          duration: 4.5,
          description: err.message ? err.message : err.response.data.message,
        });
      });
  };

  const rejectRequestHandler = () => {
    if (reasonforRejection === "") {
      notification.error({
        message: "Reason Required",
        description: "Please provide a reason for rejection",
      });
      return;
    }
    const data = { reasonForRejection: reasonforRejection };
    console.log(data);

    rejectRequest(id, reasonforRejection.toString())
      .then((res) => {
        notification.success({
          message: "Request rejected!",
          duration: 4.5,
          description: `You have successfully rejected ${
            requestDetails?.companyName
              ? requestDetails?.companyName
              : `${requestDetails?.firstName} ${requestDetails?.lastName}`
          } onboarding request`,
        });
        setShowRejectionModal(false);
        getRequestsDetails();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: "Request Rejection  Unsuccessful!",
          duration: 4.5,
          description: err.message ? err.message : err.response.data.message,
        });
      });
  };
  useEffect(() => {
    getRequestsDetails();
    setTimeout(() => {
      getUserDetails();
    }, 2000);
  }, []);

  return (
    <DashboardLayout>
      <div className="w-full flex justify-center h-full pb-44 pt-20 rounded-[10px]">
        <div className="w-full lg:w-[800px] bg-gray-200 shadow-sm flex mt-10 p-10   justify-between ">
          <div className="w-full">
            <h1 className="text-[#0B1F3F] text-xl font-[500]">
              Pre-Onboarding Information
            </h1>
            {requestDetails?.companyAddress ? (
              <div className="w-full mt-5 justify-between flex">
                <div>
                  <h1 className="text-[#0B1F3F] text-xl font-[500]">
                    Company Name
                  </h1>
                  <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                    {requestDetails?.companyName}
                  </h1>
                </div>
                <div className="w-[50%]">
                  <h1 className="text-[#0B1F3F] text-xl font-[500]">
                    Company Address
                  </h1>
                  <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                    {requestDetails?.companyAddress}
                  </h1>
                </div>
              </div>
            ) : null}
            <div className="w-full mt-5 justify-between flex">
              <div>
                <h1 className="text-[#0B1F3F] text-xl font-[500]">
                  First Name
                </h1>
                <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                  {requestDetails?.firstName}
                </h1>
              </div>
              <div className="w-[50%]">
                <h1 className="text-[#0B1F3F] text-xl font-[500]">Last Name</h1>
                <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                  {requestDetails?.lastName}
                </h1>
              </div>
            </div>
            <div className="w-full mt-5 justify-between flex">
              <div>
                <h1 className="text-[#0B1F3F] text-xl font-[500]">Email</h1>
                <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                  {requestDetails?.email}
                </h1>
              </div>
              <div className="w-[50%]">
                <h1 className="text-[#0B1F3F] text-xl font-[500]">
                  Phone Number
                </h1>
                <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                  {requestDetails?.phone}
                </h1>
              </div>
            </div>
            {requestDetails?.companyAddress ? (
              <div className="w-full mt-5 justify-between flex">
                <div>
                  <h1 className="text-[#0B1F3F] text-xl font-[500]">
                    Company CAC REG No
                  </h1>
                  <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                    {requestDetails?.rcNumber}
                  </h1>
                </div>
                <div className="w-[50%]">
                  <h1 className="text-[#0B1F3F] text-xl font-[500]">
                    Request Status
                  </h1>
                  <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                    {requestDetails?.requestStatus}
                  </h1>
                </div>
              </div>
            ) : (
              <>
                <div className="w-full mt-5 justify-between">
                  <div className="w-full flex justify-between">
                    <div>
                      <h1 className="text-[#0B1F3F] text-xl font-[500]">
                        Identification Type
                      </h1>
                      <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                        {requestDetails?.idType}
                      </h1>
                    </div>
                    <div className="w-[50%]">
                      <h1 className="text-[#0B1F3F] text-xl font-[500]">
                        Id Number
                      </h1>
                      <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                        {requestDetails?.idNumber}
                      </h1>
                    </div>
                  </div>
                  <div className="w-full">
                    <div>
                      <h1 className="text-[#0B1F3F] text-xl font-[500]">
                        Request Status
                      </h1>
                      <h1 className="text-[#0B1F3F] text-base font-[500] mt-1">
                        {requestDetails?.requestStatus}
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            )}
            {requestDetails?.requestStatus === "pending" ? (
              <div className="w-full  justify-start flex mt-[20px]">
                <div className="w-full  lg:w-[330px]  flex justify-between">
                  <div
                    onClick={() => setShowRejectionModal(true)}
                    className="w-[150px] h-[50px] rounded-md bg-red-500  flex items-center  justify-center"
                  >
                    <h1>Reject Request</h1>
                  </div>
                  <div
                    onClick={() => setShowApprovalModal(true)}
                    className="w-[150px] h-[50px] rounded-md bg-green-500  flex items-center  justify-center"
                  >
                    <h1>Accept Request</h1>
                  </div>
                </div>
              </div>
            ) : null}
            {/* {requestDetails?.requestStatus === "approved" ? (
              <div
                onClick={() => setShowDeactivationModal(true)}
                className="w-[150px] h-[50px] rounded-md mt-5 bg-red-500  flex items-center  justify-center"
              >
                <h1>Deactivate User</h1>
              </div>
            ) : null} */}
          </div>
        </div>
        {showApprovalModal ? (
          <div className="z-[1000] fixed bg-[#171717]  bg-opacity-30 flex items-center justify-center w-full h-full top-0 left-0 right-0 bottom-0 ">
            <div className="w-[90%]  py-[36px]  lg:w-[628px] flex flex-col items-center justify-center bg-white rounded-[24px]">
              <div className="w-[80%] flex justify-end">
                {" "}
                <div
                  onClick={() => {}}
                  className="bg-[#DDF3EB]   rounded-full h-[25px] w-[25px]  flex items-center justify-center"
                >
                  <Image
                    src={CancelIcon}
                    width={24}
                    height={24}
                    alt={"Hero"}
                    className="cursor-pointer mr-[5%]"
                  />
                </div>
              </div>

              <div className="w-[80%]">
                <h1 className="text-black text-xl">
                  {" "}
                  Are you sure you want to approve this Request ?
                </h1>
                <div className="w-full flex mt-10">
                  <div
                    onClick={() => {
                      approveRequestHandler();
                    }}
                    className=" bg-green-500  h-[40px] rounded-md  w-[100px] flex items-center justify-center"
                  >
                    <h1 className="text-white text-xl">Yes</h1>
                  </div>
                  <div
                    onClick={() => setShowApprovalModal(false)}
                    className=" bg-red-500 ml-3  h-[40px] rounded-md  w-[100px] flex items-center justify-center"
                  >
                    <h1 className="text-white text-xl">No</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {showRejectionModal ? (
          <div className="z-[1000] fixed bg-[#171717]  bg-opacity-30 flex items-center justify-center w-full h-full top-0 left-0 right-0 bottom-0 ">
            <div className="w-[90%]  py-[36px]  lg:w-[628px] flex flex-col items-center justify-center bg-white rounded-[24px]">
              <div className="w-[80%] flex justify-end">
                {" "}
                <div
                  onClick={() => setShowRejectionModal(false)}
                  className="bg-[#DDF3EB]   rounded-full h-[25px] w-[25px]  flex items-center justify-center"
                >
                  <Image
                    src={CancelIcon}
                    width={24}
                    height={24}
                    alt={"Hero"}
                    className="cursor-pointer mr-[5%]"
                  />
                </div>
              </div>

              <div className="w-[80%]">
                <h1 className="text-black text-xl">
                  {" "}
                  Are you sure you want to reject this Request ?
                </h1>

                <div className="w-full  mt-[20px]">
                  <input
                    value={reasonforRejection}
                    placeholder="Input a reason for rejection"
                    className="text-sm h-[60px] w-full mt-1   text-black px-5 border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
                    onChange={(e) => {
                      setReasonForRejection(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex mt-10">
                  <div
                    onClick={() => {
                      rejectRequestHandler();
                    }}
                    className=" bg-green-500  h-[40px] rounded-md  w-[100px] flex items-center justify-center"
                  >
                    <h1 className="text-white text-xl">Yes</h1>
                  </div>
                  <div
                    onClick={() => setShowRejectionModal(false)}
                    className=" bg-red-500 ml-3  h-[40px] rounded-md  w-[100px] flex items-center justify-center"
                  >
                    <h1 className="text-white text-xl">No</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {showDeactivationModal ? (
          <div className="z-[1000] fixed bg-[#171717]  bg-opacity-30 flex items-center justify-center w-full h-full top-0 left-0 right-0 bottom-0 ">
            <div className="w-[90%]  py-[36px]  lg:w-[628px] flex flex-col items-center justify-center bg-white rounded-[24px]">
              <div className="w-[80%] flex justify-end">
                {" "}
                <div
                  onClick={() => setShowDeactivationModal(false)}
                  className="bg-[#DDF3EB]   rounded-full h-[25px] w-[25px]  flex items-center justify-center"
                >
                  <Image
                    src={CancelIcon}
                    width={24}
                    height={24}
                    alt={"Hero"}
                    className="cursor-pointer mr-[5%]"
                  />
                </div>
              </div>

              <div className="w-[80%]">
                <h1 className="text-black text-xl">
                  {" "}
                  Are you sure you want to reject this Request ?
                </h1>

                <div className="w-full  mt-[20px]">
                  <input
                    value={reasonforDeactivation}
                    placeholder="Input a reason for rejection"
                    className="text-sm h-[60px] w-full mt-1   text-black px-5 border-[1px] border-[#0B1F3F] rounded-[10px] font-normal focus:outline-none outline:border-brand-200  focus:border-green-200 placeholder:text-sm placeholder:#B3B4BB) placeholder:font-normal"
                    onChange={(e) => {
                      setReasonForDeactivation(e.target.value);
                    }}
                  />
                </div>
                <div className="w-full flex mt-10">
                  <div
                    onClick={() => {
                      deactivateApprovedUserHandler();
                    }}
                    className=" bg-green-500  h-[40px] rounded-md  w-[100px] flex items-center justify-center"
                  >
                    <h1 className="text-white text-xl">Yes</h1>
                  </div>
                  <div
                    onClick={() => setShowDeactivationModal(false)}
                    className=" bg-red-500 ml-3  h-[40px] rounded-md  w-[100px] flex items-center justify-center"
                  >
                    <h1 className="text-white text-xl">No</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
}

export default ViewReport;
