import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import DashboardIcon from "../../../../public/assets/icons/dashboardIcon.svg";
import NotificationIcon from "../../../../public/assets/icons/notiification-bell-icon.svg";
import SearchIcon from "../../../../public/assets/icons/search-icon.svg";
import DropDownIcon from "../../../../public/assets/icons/menu-drop-down.svg";
import LanguageDropdownIcon from "../../../../public/assets/icons/language-drop-down.svg";
import RequestIcon from "../../../../public/assets/icons/requestIcon.svg";
import OrderIcon from "../../../../public/assets/icons/ordersIcon.svg";
import BillingIcon from "../../../../public/assets/icons/billingIcon.svg";
import DeveloperApiIcon from "../../../../public/assets/icons/developer-api-icon.svg";
import SettingsIcon from "../../../../public/assets/icons/settings-icon.svg";
import { getUsersProfile } from "../../../../Service/request";
interface dashboardProps {
  toggleLayoutCollapsed: () => void;
}

interface User {
  firstName: string;
  lastName: string;
  apiKey: string;
  isEmailVerfied: true;
  phone: string;
  role: string;
}
const DashboardNavbar = ({ toggleLayoutCollapsed }: dashboardProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  const path = usePathname();

  console.log(path);
  const getUserProfile = () => {
    getUsersProfile()
      .then((res) => {
        console.log(res.data.data);
        setUserInfo(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <nav className="  z-10   ">
      <div className="flex   w-full  items-center h-[86px] border-[1px] border-grey-200">
        <button
          onClick={() => toggleLayoutCollapsed()}
          className="block md:hidden cursor-pointer text-gray-500 py-2 px-3 transform -translate-x-3 mt-4"
        >
          <svg height="16" width="16" role="img" viewBox="0 0 448 512">
            <path
              fill="currentColor"
              d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
            ></path>
          </svg>
        </button>
        <div className="hidden lg:flex w-full  justify-between h-[100%]  items-center px-[24px]">
          {path === "/dashboard" ? (
            <div className="flex items-center">
              <Image
                src={DashboardIcon}
                width={19}
                height={18}
                alt={"Hero"}
                className="cursor-pointer "
              />
              <h1 className="text-base text-[#0B1F3F] font-[400] ml-[10px]">
                Dashboard
              </h1>
            </div>
          ) : path.includes("/dashboard/request") ? (
            <div className="flex items-center">
              <Image
                src={RequestIcon}
                width={19}
                height={18}
                alt={"Hero"}
                className="cursor-pointer "
              />
              <h1 className="text-base text-[#0B1F3F] font-[400] ml-[10px]">
                Requests
              </h1>
            </div>
          ) : path.includes("/dashboard/orders") ? (
            <div className="flex items-center">
              <Image
                src={OrderIcon}
                width={19}
                height={18}
                alt={"Hero"}
                className="cursor-pointer "
              />
              <h1 className="text-base text-[#0B1F3F] font-[400] ml-[10px]">
                Orders
              </h1>
            </div>
          ) : path.includes("/dashboard/billing") ? (
            <div className="flex items-center">
              <Image
                src={BillingIcon}
                width={19}
                height={18}
                alt={"Hero"}
                className="cursor-pointer "
              />
              <h1 className="text-base text-[#0B1F3F] font-[400] ml-[10px]">
                Billing
              </h1>
            </div>
          ) : path.includes("/dashboard/developer-api") ? (
            <div className="flex items-center">
              <Image
                src={DeveloperApiIcon}
                width={19}
                height={18}
                alt={"Hero"}
                className="cursor-pointer "
              />
              <h1 className="text-base text-[#0B1F3F] font-[400] ml-[10px]">
                Developer API
              </h1>
            </div>
          ) : path.includes("/dashboard/settings") ? (
            <div className="flex items-center">
              <Image
                src={SettingsIcon}
                width={19}
                height={18}
                alt={"Hero"}
                className="cursor-pointer "
              />
              <h1 className="text-base text-[#0B1F3F] font-[400] ml-[10px]">
                Settings
              </h1>
            </div>
          ) : null}

          <div className=" flex flex-row justify-between items-center">
            <div className="flex items-center">
              <div className="w-[40px] h-[40px] items-center flex  bg-[#FFD009] justify-center  rounded-[40px]">
                <h1 className="text-black font-[700] text-lg">
                  {userInfo?.firstName[0]}
                </h1>
              </div>
              <Image
                src={DropDownIcon}
                width={24}
                height={24}
                alt={"Hero"}
                className="cursor-pointer ml-1 mt-1 "
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
