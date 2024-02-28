"use client";
import React, { useState } from "react";
import DashboardSidebar from "../../dashboardSidebar";
import DashboardNavbar from "../../dashboardNavbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [layoutCollapsed, setLayoutCollapsed] = useState(false);

  const toggleLayoutCollapsed = () => {
    setLayoutCollapsed(!layoutCollapsed);
  };

  const closeSidebar = () => {
    setLayoutCollapsed(false);
  };

  return (
    <div
      id="dashboard-layout"
      className={layoutCollapsed ? "collapsed" : "expanded"}
    >
      <div id="sidebar-overlay" onClick={() => setLayoutCollapsed(false)}></div>
      <div id="sidebar-container">
        <DashboardSidebar
          collapsed={layoutCollapsed}
          close={() => closeSidebar()}
        />
      </div>
      <div
        id="main-content"
        className="relative overflow-x-hidden overflow-y-auto"
      >
        <DashboardNavbar
          toggleLayoutCollapsed={() => toggleLayoutCollapsed()}
        />
        <div className="w-full px-2 bg-[#F7F7F7] lg:px-[24px] pt-[40px] ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
