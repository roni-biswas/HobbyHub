// src/layouts/DashboardLayout.jsx
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BrandLogo from "../assets/brand-logo.png";

import {
  FiHome,
  FiFolderPlus,
  FiUsers,
  FiChevronRight,
  FiArrowLeft,
  FiList,
} from "react-icons/fi";

/* Map segment to icon and label */
const iconMap = {
  dashboard: <FiHome />,
  "create-group": <FiFolderPlus />,
  "my-group": <FiUsers />,
};

const labelMap = {
  dashboard: "Dashboard",
  "create-group": "Create Group",
  "my-group": "My Groups",
};

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  // Build breadcrumb segments
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => ({
    to: "/" + segments.slice(0, idx + 1).join("/"),
    name: labelMap[seg] || seg.replace(/-/g, " "),
    icon: iconMap[seg] || <FiList />,
  }));

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* ------------ Main Content ------------ */}
      <div className="drawer-content flex flex-col">
        {/* Mobile top navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <label htmlFor="my-drawer-2" className="btn btn-ghost btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          <span className="ml-2 font-semibold text-lg">Dashboard</span>
        </div>

        {/* Breadcrumb + Back button */}
        <div className="bg-base-100 border-b border-base-300 px-4 md:px-6 py-3 flex flex-wrap items-center justify-between gap-2">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm overflow-x-auto scrollbar-thin max-w-full"
          >
            {crumbs.map((crumb, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 whitespace-nowrap"
              >
                {idx > 0 && <FiChevronRight className="text-gray-400" />}
                {idx === crumbs.length - 1 ? (
                  <span className="flex items-center gap-1 text-gray-600">
                    <span className="text-base">{crumb.icon}</span>
                    <span>{crumb.name}</span>
                  </span>
                ) : (
                  <Link
                    to={crumb.to}
                    className="flex items-center gap-1 text-primary hover:underline"
                  >
                    <span className="text-base">{crumb.icon}</span>
                    <span>{crumb.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            disabled={location.pathname === "/dashboard"}
            className="btn btn-sm btn-outline btn-secondary flex items-center gap-1"
          >
            <FiArrowLeft /> Back
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6">
          <Outlet />
        </div>
      </div>

      {/* ------------ Sidebar ------------ */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Brand Logo */}
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={BrandLogo} alt="Brand Logo" className="w-32" />
            </Link>
          </div>

          {/* Sidebar links */}
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FiHome className="inline-block mr-2" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/create-group"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FiFolderPlus className="inline-block mr-2" />
              Create Group
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/dashboard/my-group/${user?.email}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FiUsers className="inline-block mr-2" />
              My Groups
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
