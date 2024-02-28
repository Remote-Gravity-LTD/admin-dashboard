/* eslint-disable react/no-unescaped-entities */
"use client";
import { RGInput } from "@/app/components/base/input";
import RGPhoneNumberInput from "@/app/components/base/phone_number_select";
import { RGSelect } from "@/app/components/base/select";
import DashboardLayout from "@/app/components/layout/dashboardLayout";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Checkbox, Form, notification } from "antd";
import { Button } from "@/app/components/base/button";
import useDownloader from "react-use-downloader";
import {
  SubmitBusinessAddress,
  SubmitIndividualAddress,
  getNigerianStates,
  getStateLGAs,
} from "../../../../../Service/request";
import EmailInput from "@/app/components/base/email-input";
import axios from "axios";

function RequestTypePage() {
  const [showSingleRequest, setShowSingleRequest] = useState(true);
  const [showBulkRequest, setShowBulkRequest] = useState(false);
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const [nigerianStates, setNigerianStates] = useState([]);
  const [LGAs, setLGAs] = useState([]);
  let [individualUploadedRequestCSv, setindividualUploadedRequestCsv] =
    useState<null>(null);
  let [businessUploadedRequestCSv, setbusinessUploadedRequestCsv] =
    useState<null>(null);
  const [currentSelectedType, setCurrentSelectedType] = useState("");
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();

  const fileUrl =
    currentSelectedType === "Business"
      ? "/assets/files/Address-Data-Templete-Business-Address.csv"
      : "/assets/files/Address-Data-Templete-Individual-Address.csv";

  const filename =
    currentSelectedType === "Business"
      ? "Address-Data-Templete-Business-Address.csv"
      : "Address-Data-Templete-Individual-Address.csv";

  const onChange = (e: any) => {
    console.log("checked = ", e.target.checked);
    setChecked(e.target.checked);
  };

  const uploadSingleFile = (event: any) => {
    console.log(event.target.files[0]);
    setindividualUploadedRequestCsv(
      (individualUploadedRequestCSv = event.target.files[0])
    );
    const file = event.target.files[0];
    // console.log();

    const formData = new FormData();
    formData.append("address", file);

    console.log(formData);
  };

  const uploadBulkFile = (event: any) => {
    console.log(event.target.files[0]);
    setbusinessUploadedRequestCsv(
      (businessUploadedRequestCSv = event.target.files[0])
    );
    const file = event.target.files[0];
    // console.log();

    const formData = new FormData();
    formData.append("address", file);

    console.log(formData);
  };

  const selectVerificationType = (e: string): void => {
    console.log(e);
    setCurrentSelectedType(e);
  };
  const submitBulkIndividualRequestsFunction = () => {
    if (!checked) {
      notification.error({
        message: `Oops`,
        duration: 4.5,
        description: "Kindly Accept our terms before submitting an address",
      });
      return;
    }
    if (!individualUploadedRequestCSv) {
      console.log("No file selected");
      notification.error({
        message: `Error Submitting Bulk Address`,
        duration: 4.5,
        description: "File containing Individual Addresses not uploaded",
      });
      return;
    }

    setLoading(true);
    const formData = new FormData();

    const token = localStorage.getItem("token");

    formData.append("address", individualUploadedRequestCSv, "[PROXY]");

    axios
      .post(
        "https://iddprmzmhp.us-east-1.awsapprunner.com/api/v1/addresses/individual/bulk",
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
        console.log(res);
        setLoading(false);
        router.push("/dashboard/request");
        notification.success({
          message: `Bulk Address submitted`,
          duration: 4.5,
          description:
            "Congratulations, these bulk address request  has been sent to us for verification.",
        });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: `Error Submitting Bulk Address`,
          duration: 4.5,
          description: err.response.data.message,
        });
      });
  };
  const submitBulkBusinessRequestsFunction = () => {
    if (!checked) {
      notification.error({
        message: `Oops`,
        duration: 4.5,
        description: "Kindly Accept our terms before submitting an address",
      });
      return;
    }
    if (!businessUploadedRequestCSv) {
      console.log("No file selected");
      notification.error({
        message: `Error Submitting Bulk Address`,
        duration: 4.5,
        description: "File containing Bulk Business Address not uploaded",
      });
      return;
    }
    setLoading(true);
    const formData = new FormData();

    const token = localStorage.getItem("token");

    formData.append("address", businessUploadedRequestCSv, "[PROXY]");

    axios
      .post(
        "https://iddprmzmhp.us-east-1.awsapprunner.com/api/v1/addresses/business/bulk",
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
        console.log(res);
        setLoading(false);
        notification.success({
          message: `Bulk Address submitted`,
          duration: 4.5,
          description:
            "Congratulations, these bulk address request  has been sent to us for verification.",
        });
        router.push("/dashboard/request");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        notification.error({
          message: `Error Submitting Bulk Address`,
          duration: 4.5,
          description: err.response.data.message,
        });
      });
  };
  const verificationOptions = [
    {
      id: 1,
      name: "Individual",
      value: "Individual",
    },
    {
      id: 2,
      name: "Business",
      value: "Business",
    },
  ];

  const selectState = (state: string) => {
    console.log(state);

    getStateLGAs(state)
      .then((res) => {
        console.log(res.data.data);
        setLGAs(
          res.data.data.map((state: string, index: number) => {
            return {
              id: index + 1,
              value: state,
              name: state,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getStates = (): void => {
    getNigerianStates()
      .then((res) => {
        console.log(res);
        setNigerianStates(
          res.data.data.map((state: string, index: number) => {
            return {
              id: index + 1,
              value: state,
              name: state,
            };
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getStates();
  }, []);

  const onFinish = (values: any) => {
    if (!checked) {
      notification.error({
        message: `Oops`,
        duration: 4.5,
        description: "Kindly Accept our terms before submitting an address",
      });
      return;
    }
    console.log(values);
    if (currentSelectedType === "Individual") {
      let data: object = {
        firstName: values.firstName,
        lastName: values.lastName,
        // dob: null,
        idType: values.idType,
        idNumber: values.idNumber,
        phone: `+${values.phone}`,
        email: values.email,
        street: values.address,
        nickName: values.nickName,
        city: values.city,
        lga: values.lga,
        state: values.state,
        landmark: values.landmark,
      };
      console.log(data);
      setLoading(true);
      SubmitIndividualAddress(data)
        .then((res) => {
          console.log(res);
          setLoading(false);
          notification.success({
            message: `Address submitted`,
            duration: 4.5,
            description:
              "Congratulations, this address has been sent to us for verification.",
          });
          router.push("/dashboard/request");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          notification.error({
            message: `Error Submitting Address`,
            duration: 4.5,
            description: err.response.data.message,
          });
        });
    } else {
      setLoading(true);
      let data: object = {
        firstName: values.firstName,
        lastName: values.lastName,
        idType: values.idType,
        idNumber: values.idNumber,
        street: values.address,
        city: values.city,
        lga: values.lga,
        state: values.state,
        landmark: values.landmark,
        businessName: values.businessName,
        businessEmail: values.businessEmail,
        email: values.businessEmail,
        businessPhone: `+${values.businessPhone}`,
        phone: `+${values.businessPhone}`,
        rcNumber: values.rcNumber,
        canContactPoc: values.canContactPoc === "Yes" ? true : false,
      };
      SubmitBusinessAddress(data)
        .then((res) => {
          console.log(res);
          setLoading(false);

          notification.success({
            message: `Address submitted`,
            duration: 4.5,
            description:
              "Congratulations, this address has been sent to us for verification.",
          });
          router.push("/dashboard/request");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          notification.error({
            message: `Error Submitting Address`,
            duration: 4.5,
            description: err.response.data.message,
          });
        });
    }
  };
  const onFinishFailed = (errors: any) => {
    console.log(errors);
  };
  return (
    <DashboardLayout>
      <div className="h-full w-full pb-[100px]">
        <div className="w-full flex justify-center">
          <div className="w-full lg:w-[583px] rounded-[20px] pb-[50px]  bg-white shadow-sm">
            <div className="w-full h-[55px] border-b border-b-[#0B1F3F] flex px-[30px] py-[20px]">
              <div
                onClick={() => {
                  setShowSingleRequest(true);
                  setShowBulkRequest(false);
                }}
                className={
                  "px-[23px] cursor-pointer " +
                  (showSingleRequest
                    ? "border-b-[2px] h-[35px]  border-[#002C73]"
                    : "")
                }
              >
                <h1 className="text-[#002C73] text-base font-[400] mt-2 ">
                  Single Request
                </h1>
              </div>
              <div
                onClick={() => {
                  setShowSingleRequest(false);
                  setShowBulkRequest(true);
                }}
                className={
                  "px-[23px] cursor-pointer " +
                  (showBulkRequest
                    ? "border-b-[2px] h-[35px] border-[#002C73]"
                    : "")
                }
              >
                <h1 className="text-[#002C73] text-base font-[400] mt-2 ">
                  Bulk Request
                </h1>
              </div>
            </div>
            {showSingleRequest ? (
              <div className="w-full px-[30px] mt-[25px]">
                <h1 className="text-[#0B1F3F] font-[400] text-base">
                  Select Verification type
                </h1>
                <div className="w-full mt-[25px]">
                  <RGSelect
                    label={"Verification Type"}
                    options={verificationOptions}
                    className={undefined}
                    value={undefined}
                    onChange={(e) => {
                      selectVerificationType(e);
                    }}
                    placeholder={"Select Verification Type"}
                    disabled={undefined}
                    name={""}
                    message={"Select verification type"}
                    rules={undefined}
                  />
                </div>

                {currentSelectedType === "Individual" ? (
                  <Form
                    name="basic"
                    form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    id="form_group"
                  >
                    <div className="w-full">
                      <div className="w-full mt-[30px] ">
                        <RGInput
                          name={"firstName"}
                          placeholder={"Resident's first name"}
                          className={undefined}
                          message={"Input Resident's first name"}
                          label={"First name"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"lastName"}
                          placeholder={"Resident's last name"}
                          className={undefined}
                          message={"input Resident's last name"}
                          label={"last name"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"nickName"}
                          placeholder={"Popularly known name"}
                          className={undefined}
                          message={"input Popularly known name"}
                          label={"Nickname (optional)"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>

                      <div className="w-full mt-[20px]">
                        <RGSelect
                          label={"Select ID Type"}
                          options={[
                            {
                              id: 1,
                              name: "BVN",
                              value: "BVN",
                            },
                            {
                              id: 2,
                              name: "NIN",
                              value: "NIN",
                            },
                          ]}
                          className={undefined}
                          value={undefined}
                          onChange={() => {}}
                          placeholder={"Select ID Type"}
                          disabled={undefined}
                          name={"idType"}
                          message={"Select Verification Type"}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[40px]">
                        <RGInput
                          name={"idNumber"}
                          placeholder={"Id Number"}
                          className={undefined}
                          message={"Kindly Input Id Number"}
                          label={"Id Number"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <RGPhoneNumberInput
                          name={"phone"}
                          placeholder={"Resident's phone number"}
                          message={"Kindly input a Resident's phone number"}
                          handleOnChange={() => {}}
                          label={"Phone Number"}
                          disabled={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <EmailInput
                          name={"email"}
                          className={undefined}
                          label={"Email address"}
                          message={"Kindly input Resident's email address"}
                          placeholder={"Kindly input Resident's email address"}
                          disabled={undefined}
                          onBlur={undefined}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"address"}
                          placeholder={"Street"}
                          className={undefined}
                          message={"No 10, john doe street,"}
                          label={"Street"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"landmark"}
                          placeholder={"Opposite Governor's office"}
                          className={undefined}
                          message={"Kindly input landmark"}
                          label={"Landmark"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"city"}
                          placeholder={"e.g. Victoria Island, Warri,"}
                          className={undefined}
                          message={"Kindly input City"}
                          label={"City"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGSelect
                          label={"State"}
                          options={nigerianStates}
                          className={undefined}
                          value={undefined}
                          onChange={(e) => {
                            selectState(e);
                            form.setFieldsValue({ lga: undefined });
                          }}
                          placeholder={"State"}
                          disabled={undefined}
                          name={"state"}
                          message={"Kindly input state"}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[35px] ">
                        <RGSelect
                          label={"LGA"}
                          options={LGAs}
                          className={undefined}
                          value={undefined}
                          onChange={() => {}}
                          placeholder={"e.g. Ikeja, Surulere"}
                          disabled={undefined}
                          name={"lga"}
                          message={"Kindly select LGA"}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[25px]">
                        <h1 className={"text-[#0B1F3F] font-normal text-sm"}>
                          <Checkbox
                            checked={checked}
                            name="checked"
                            onChange={onChange}
                            className={"text-[#85868D] text-sm "}
                          >
                            I accept Remote Gravity's{" "}
                          </Checkbox>
                          {/* <Link
                            href={
                              "https://docs.google.com/document/d/1QR92m_7o4e8B0zACv-Ss1nLxqdB9L3Yi/edit"
                            }
                          > */}
                          <a
                            href="https://docs.google.com/document/d/1QR92m_7o4e8B0zACv-Ss1nLxqdB9L3Yi/edit"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className=" underline">Term of Use</span>
                            {/* </Link> */}
                          </a>
                        </h1>
                      </div>
                      <div className="w-full mt-[50px]">
                        <Button
                          text={"Submit"}
                          className={
                            "w-full bg-[#002C73] mt-[30px] rounded-[5px]"
                          }
                          onClick={undefined}
                          type={undefined}
                          show={loading}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </Form>
                ) : (
                  <Form
                    name="basic"
                    onFinish={onFinish}
                    form={form}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    id="form_group"
                  >
                    <div className="w-full">
                      <div className="w-full mt-[30px] ">
                        <RGInput
                          name={"businessName"}
                          placeholder={"Name of company to be verified"}
                          className={undefined}
                          message={
                            "Kindly input Name of company to be verified"
                          }
                          label={"Business Name"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <RGPhoneNumberInput
                          name={"businessPhone"}
                          placeholder={"Official phone number of the business"}
                          message={
                            "Kindly input a Official phone number of the business"
                          }
                          handleOnChange={() => {}}
                          label={"Business Phone Number"}
                          disabled={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <RGInput
                          name={"rcNumber"}
                          placeholder={"CAC registration number"}
                          className={undefined}
                          message={
                            "Kindly input company CAC registration number"
                          }
                          label={"RC Number"}
                          src={undefined}
                          type={"text"}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <EmailInput
                          name={"businessEmail"}
                          className={undefined}
                          label={"Business Email Address"}
                          message={
                            "Kindly input Official email of the business"
                          }
                          placeholder={
                            "Kindly input Official email of the business"
                          }
                          disabled={undefined}
                          onBlur={undefined}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[30px] ">
                        <RGInput
                          name={"firstName"}
                          placeholder={"Contact person's first name"}
                          className={undefined}
                          message={"Kindly input Contact person's first name"}
                          label={"First Name"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>

                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"lastName"}
                          placeholder={"Contact person's last name"}
                          className={undefined}
                          message={"Kindly input Contact person's last name"}
                          label={"Last Name"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <RGPhoneNumberInput
                          name={"phone"}
                          placeholder={"Contact Person's phone number"}
                          message={
                            "Kindly input a Contact Person's phone number"
                          }
                          handleOnChange={() => {}}
                          label={"Phone Number"}
                          disabled={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px]">
                        <EmailInput
                          name={"email"}
                          className={undefined}
                          label={"Email address"}
                          message={
                            "Kindly input Contact Person's email address"
                          }
                          placeholder={
                            "Kindly input Contact Person's email address"
                          }
                          disabled={undefined}
                          onBlur={undefined}
                          rules={undefined}
                        />
                      </div>

                      <div className="w-full mt-[20px]">
                        <RGSelect
                          label={"Select ID Type"}
                          options={[
                            {
                              id: 1,
                              name: "BVN",
                              value: "BVN",
                            },
                            {
                              id: 2,
                              name: "NIN",
                              value: "NIN",
                            },
                          ]}
                          className={undefined}
                          value={undefined}
                          onChange={() => {}}
                          placeholder={"Select ID Type"}
                          disabled={undefined}
                          name={"idType"}
                          message={"Select Verification Type"}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[30px]">
                        <RGSelect
                          label={"Can Agent Contact Business Owner?"}
                          options={[
                            {
                              id: 1,
                              name: "Yes",
                              value: "Yes",
                            },
                            {
                              id: 2,
                              name: "No",
                              value: "No",
                            },
                          ]}
                          className={undefined}
                          value={undefined}
                          onChange={() => {}}
                          placeholder={"Can Agent Contact Business Owner?"}
                          disabled={undefined}
                          name={"canContactPoc"}
                          message={
                            "Select if our agent can contact Business Owner"
                          }
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[40px]">
                        <RGInput
                          name={"idNumber"}
                          placeholder={"Contact person's valid ID"}
                          className={undefined}
                          message={"Kindly Input Contact person's valid ID"}
                          label={"Id Number"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>

                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"address"}
                          placeholder={"10, john doe street, Alausa, Ikeja"}
                          className={undefined}
                          message={"Kindly input Street"}
                          label={"Street"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"landmark"}
                          placeholder={
                            "for example: 'Opposite Governor's office, Ikeja"
                          }
                          className={undefined}
                          message={"Kindly input a visible landmark"}
                          label={"Landmark"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGInput
                          name={"city"}
                          placeholder={"e.g. Victoria Island, Warri,"}
                          className={undefined}
                          message={"Kindly input City of the business"}
                          label={"City"}
                          src={undefined}
                          type={undefined}
                          disabled={undefined}
                          rules={undefined}
                          maxLength={undefined}
                          defaultValue={undefined}
                          value={undefined}
                        />
                      </div>
                      <div className="w-full mt-[20px] ">
                        <RGSelect
                          label={"State"}
                          options={nigerianStates}
                          className={undefined}
                          value={undefined}
                          onChange={(e) => {
                            selectState(e);
                            form.setFieldsValue({ lga: undefined });
                          }}
                          placeholder={"State"}
                          disabled={undefined}
                          name={"state"}
                          message={"Kindly input state"}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[35px] ">
                        <RGSelect
                          label={"LGA"}
                          options={LGAs}
                          className={undefined}
                          value={undefined}
                          onChange={() => {}}
                          placeholder={"e.g. Ikeja, Surulere"}
                          disabled={undefined}
                          name={"lga"}
                          message={"kindly input LGA"}
                          rules={undefined}
                        />
                      </div>
                      <div className="w-full mt-[25px]">
                        {/* <Checkbox
                          checked={checked}
                          onChange={onChange}
                          name="checked"
                          className={"text-[#85868D] text-sm "}
                        >
                          <h1 className={"text-[#0B1F3F] font-normal text-sm"}>
                            I accept Remote gravity{" "}
                            <span className=" underline">Term of Use</span>
                          </h1>
                        </Checkbox> */}
                        <h1 className={"text-[#0B1F3F] font-normal text-sm"}>
                          <Checkbox
                            checked={checked}
                            name="checked"
                            onChange={onChange}
                            className={"text-[#85868D] text-sm "}
                          >
                            I accept Remote Gravity's{" "}
                          </Checkbox>
                          {/* <Link
                            href={
                              "https://docs.google.com/document/d/1QR92m_7o4e8B0zACv-Ss1nLxqdB9L3Yi/edit"
                            }
                          > */}
                          <a
                            href="https://docs.google.com/document/d/1QR92m_7o4e8B0zACv-Ss1nLxqdB9L3Yi/edit"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className=" underline">Term of Use</span>
                          </a>
                        </h1>
                      </div>
                      <div className="w-full mt-[50px]">
                        {/* <div className="w-full bg-[#E3BD1E] rounded-[5px] h-[60px] flex items-center justify-center">
                      <h1 className="text-white font-medium text-lg">
                        Add Another
                      </h1>
                    </div>
                    <div className="w-full bg-[#002C73] mt-[30px] rounded-[5px] h-[60px] flex items-center justify-center">
                      <h1 className="text-white font-medium text-lg">
                        Save For Later
                      </h1>
                    </div> */}
                        <Button
                          text={"Submit"}
                          className={
                            "w-full bg-[#002C73] mt-[30px] rounded-[5px]"
                          }
                          onClick={undefined}
                          type={undefined}
                          show={loading}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </Form>
                )}
              </div>
            ) : null}
            {showBulkRequest ? (
              <div className="w-full">
                {/* <div className="w-full  px-[30px]  h-[68px]  border-b-[1px] border-[#0B1F3F] flex items-center">
                  <h1 className="text-[#0B1F3F] text-lg font-medium">
                    New Bulk Request
                  </h1>
                </div> */}

                <div className="w-full px-[30px] mt-[25px]">
                  <div className="w-full mt-[10px] px-[30px]">
                    <h1 className="text-[#0B1F3F] font-[400] text-base">
                      Select Bulk Verification type
                    </h1>
                    <div className="w-full mt-[25px]">
                      <RGSelect
                        label={"Verification Type"}
                        options={verificationOptions}
                        className={undefined}
                        value={undefined}
                        onChange={(e) => {
                          selectVerificationType(e);
                        }}
                        placeholder={"Select Verification Type"}
                        disabled={undefined}
                        name={""}
                        message={"Select verification type"}
                        rules={undefined}
                      />
                    </div>
                    <h1 className="text-[#0B1F3F] text-base font-normal">
                      Select File
                    </h1>
                    <div className="w-full h-[60px] justify-between rounded-[10px] border border-[#0B1F3F] px-[10px] items-center flex bg-white">
                      <input
                        type="file"
                        // name="file"
                        accept=".csv"
                        onChange={
                          currentSelectedType === "Individual"
                            ? uploadSingleFile
                            : uploadBulkFile
                        }
                        className=" text-[#0B1F3F] text-sm font-[400] h-[28px] flex items-center justify-center rounded-[5px]"
                      />
                      <h1 className="text-black text-sm">
                        {" "}
                        {/* {individualUploadedRequestCSv?.name} */}
                      </h1>
                    </div>

                    <div className="w-full justify-between items-center flex mt-[18px]">
                      <h1 className={"text-[#0B1F3F] font-normal text-sm"}>
                        <Checkbox
                          checked={checked}
                          name="checked"
                          onChange={onChange}
                          className={"text-[#85868D] text-sm "}
                        >
                          I accept Remote Gravity's{" "}
                        </Checkbox>
                        {/* <Link
                          href={
                            "https://docs.google.com/document/d/1QR92m_7o4e8B0zACv-Ss1nLxqdB9L3Yi/edit"
                          }
                        > */}
                        <a
                          href="https://docs.google.com/document/d/1QR92m_7o4e8B0zACv-Ss1nLxqdB9L3Yi/edit"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className=" underline">Term of Use</span>
                        </a>
                      </h1>
                      <div
                        className=" cursor-pointer"
                        onClick={() => download(fileUrl, filename)}
                      >
                        <h1 className="text-[#0B1F3F] text-lg font-normal underline">
                          Download Template
                        </h1>
                      </div>
                    </div>

                    <Button
                      text={"Checkout"}
                      className={"w-full bg-[#002C73] mt-[30px] rounded-[5px]"}
                      onClick={
                        currentSelectedType === "Individual"
                          ? submitBulkIndividualRequestsFunction
                          : submitBulkBusinessRequestsFunction
                      }
                      type={undefined}
                      show={loading}
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default RequestTypePage;
