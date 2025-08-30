import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/Sidebar";
import Enterprise from "./Enterprise";
import Analytic from "./Analytic";
import EmployeeDetails from "./EmployeeDetails";
import AddEmployee from "./AddEmployee";
import Policies from "./Policies";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from "react";


import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconChartBar,
  IconUserPlus,
  IconUsers,
  IconShield,
  IconBuilding,
} from "@tabler/icons-react";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Enterprise");
  const links = [
    {
      label: "Enterprise",
      href: "#",
      icon: (
        <IconBuilding className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Analytic",
      href: "#",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Employee",
      href: "#",
      icon: (
        <IconUserPlus className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Employee Details",
      href: "#",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Policies",
      href: "#",
      icon: (
        <IconShield className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    // ...other links...
  ];

  const navigate = useNavigate();
  const { logout, initializeAuth, user } = useAuthStore();

  useEffect(() => {
    // Initialize auth state from localStorage when component mounts
    initializeAuth();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/home/enterprise");
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody>
          {links.map((link, idx) => (
            <SidebarLink
              key={idx}
              link={link}
              onClick={(e) => {
                e.preventDefault();
                if (link.label === "Logout") {
                  handleLogout();
                } else {
                  setSelectedPage(link.label);
                }
              }}
            />
          ))}
        </SidebarBody>
      </Sidebar>
      <div style={{ flex: 1 }}>
        {selectedPage === "Enterprise" && <Enterprise />}
        {selectedPage === "Analytic" && <Analytic />}
        {selectedPage === "Add Employee" && <AddEmployee />}
        {selectedPage === "Employee Details" && <EmployeeDetails />}
        {selectedPage === "Add Policies" && <Policies />}
      </div>
    </div>
  );
}
export default Dashboard;
