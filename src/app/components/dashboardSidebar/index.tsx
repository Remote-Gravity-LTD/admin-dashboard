/* eslint-disable react/jsx-no-duplicate-props */
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import RGLogo from "../../../../public/assets/icons/RGLogo.svg";
import Image from "next/image";
import DashboardIcon from "../../../../public/assets/icons/dashboardIcon.svg";
import RequestIcon from "../../../../public/assets/icons/requestIcon.svg";
import OrderIcon from "../../../../public/assets/icons/ordersIcon.svg";
import BillingIcon from "../../../../public/assets/icons/billingIcon.svg";
import DeveloperApiIcon from "../../../../public/assets/icons/developer-api-icon.svg";
import SettingsIcon from "../../../../public/assets/icons/settings-icon.svg";

interface DashboardSidebarProps {
  collapsed: boolean;
  close: () => void;
  path?: string;
}
const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  collapsed,
  close,
}) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    // dispatch(resetUser());
    window.location.href = "/";
  };

  const path = usePathname();

  console.log(path);

  const routes = [
    {
      id: 1,
      path: "/dashboard",
      name: "Dashboard",
      icon: DashboardIcon,
    },
    // {
    //   id: 4,
    //   path: "/dashboard/request",
    //   name: "Requests",
    //   icon: RequestIcon,
    //   children: [
    //     {
    //       id: 2,
    //       path: "/dashboard/select-request-type",
    //       name: "All",
    //     },
    //     {
    //       id: 3,
    //       path: "#",
    //       name: "Reports",
    //     },
    //   ],
    // },

    {
      id: 11,
      path: "/dashboard/settings",
      name: "Settings",
      icon: SettingsIcon,
    },
    {
      id: 12,
      path: "/dashboard/uploadCSV",
      name: "Upload CSV",
      icon: SettingsIcon,
    },
  ];

  return (
    <nav
      id="dashboard-sidebar"
      className={`${
        collapsed ? "collapsed" : "expanded"
      } flex flex-col justify-between `}
    >
      <button
        className="md:hidden text-xl p-2 transform translate-x-3 absolute right-4"
        onClick={() => close()}
      >
        &times;
      </button>
      <div className="pt-10 w-full flex justify-center">
        <Image
          src={RGLogo}
          width={157}
          height={30}
          alt={"Hero"}
          className="cursor-pointer"
        />
      </div>

      <article className="= overflow-y-auto -mt-44 flex w-full  justify-start">
        <ul className="m-0   flex w-full justify-start">
          <div className="w-[100%] ">
            {routes &&
              routes.map((route) => (
                <li className="mb-[50px]" key={route.id}>
                  {route.name === "Dashboard" ? (
                    <Link
                      href="/dashboard"
                      className={
                        path === route.path ? "link-item-active" : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={DashboardIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span
                        style={{ textDecoration: "none" }}
                        className="link-item  hide-on-collapse"
                      >
                        {route.name}
                      </span>
                    </Link>
                  ) : route.name === "Requests" ? (
                    <Link
                      href="/dashboard/request"
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={RequestIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span
                        style={{ textDecoration: "none" }}
                        className="link-item   hide-on-collapse"
                      >
                        {route.name}
                      </span>
                    </Link>
                  ) : route.name === "Orders" ? (
                    <Link
                      href={"/dashboard/orders"}
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={OrderIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span className="link-item  hide-on-collapse">
                        {route.name}
                      </span>
                    </Link>
                  ) : route.name === "Billing" ? (
                    <Link
                      href={"/dashboard/billing"}
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={BillingIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span className="link-item  hide-on-collapse">
                        {route.name}
                      </span>
                    </Link>
                  ) : route.name === "Developer API" ? (
                    <Link
                      href={"/dashboard/developer-api"}
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={DeveloperApiIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span className="link-item  hide-on-collapse">
                        {route.name}
                      </span>
                    </Link>
                  ) : route.name === "Settings" ? (
                    <Link
                      href={"/dashboard/settings"}
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={SettingsIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span className="link-item  hide-on-collapse">
                        {route.name}
                      </span>
                    </Link>
                  ) : route.name === "Upload CSV" ? (
                    <Link
                      href={"/dashboard/uploadCSV"}
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      <Image
                        src={SettingsIcon}
                        width={19}
                        height={18}
                        alt={"Hero"}
                        className="cursor-pointer "
                      />
                      <span className="link-item  hide-on-collapse">
                        {route.name}
                      </span>
                    </Link>
                  ) : (
                    <Link
                      href={route.path}
                      className={
                        path?.includes(route.path)
                          ? "link-item-active"
                          : "link-item"
                      }
                      // redirecthref={route.path}
                    >
                      {/* <ReactSVG
                        className={
                          path?.includes(route.path) ? "svg-active" : "link-item"
                        }
                        src={route.icon}
                      ></ReactSVG> */}
                      <span className="link-item  hide-on-collapse">
                        {route.name}
                      </span>
                    </Link>
                  )}
                </li>
              ))}
          </div>{" "}
        </ul>
      </article>

      {/* Start Footer */}
      <div className=" flex justify-start w-[70%]">
        <ul className="pb-10">
          {/* {footerRoutes &&
            footerRoutes.map((route) => (
              <>
                <li className="mb-6" key={route.id}>
                  <Link
                    href={route.path}
                    className={
                      path === route.path ? "link-item-active" : "link-item"
                    }
                  >
                    <span className="link-item ml-[13px] mt-1 hide-on-collapse">
                      {route.name}
                    </span>
                  </Link>
                </li>
              </>
            ))} */}
          <li>
            <div className="w-full">
              <div
                onClick={() => handleLogout()}
                className="flex items-center -ml-7  mt-5 cursor-pointer"
              >
                {/* <LogoutIcon /> */}
                <span className="link-item ml-[13px] hide-on-collapse">
                  Log out
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
      {/* End Footer */}
    </nav>
  );
};

export default DashboardSidebar;
