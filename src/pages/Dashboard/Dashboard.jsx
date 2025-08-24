import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../components/ui/Sidebar";
import Enterprise from "./Enterprise";
import Analytic from "./Analytic";
import AddEmployee from "./AddEmployee";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useEffect } from "react";


import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconRectangle,
} from "@tabler/icons-react";

function Dashboard() {
  const [open, setOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState("Enterprise");
  const links = [
    {
      label: "Enterprise",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Analytic",
      href: "#",
      icon: (
        <IconRectangle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
    },
    {
      label: "Add Employee",
      href: "#",
      icon: (
        <IconRectangle className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
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
      </div>
    </div>
  );
}
export default Dashboard;
