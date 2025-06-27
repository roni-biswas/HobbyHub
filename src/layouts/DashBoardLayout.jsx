// src/layouts/DashboardLayout.jsx
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import BrandLogo from "../assets/brand-logo.png";
import { AuthContext } from "../context/AuthContext";

import {
  FiHome,
  FiFolder,
  FiUser,
  FiChevronRight,
  FiEdit2,
  FiList,
  FiArrowLeft,
} from "react-icons/fi";
import { MdGroup } from "react-icons/md";
import Swal from "sweetalert2";

/* ───────── icon + label helpers ───────── */
const iconMap = {
  dashboard: <FiHome />,
  "create-group": <FiFolder />,
  "my-group": <FiUser />,
  edit: <FiEdit2 />,
};

const labelMap = {
  dashboard: "Dashboard",
  "create-group": "Create Group",
  "my-group": "My Groups",
  edit: "Edit",
};

const friendlyName = (segment) => {
  if (labelMap[segment]) return labelMap[segment];
  if (segment.includes("@")) return segment.split("@")[0]; // truncate email
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};
/* ───────────────────────────────────────── */

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    if (!user) return;
    signOutUser()
      .then(() => {
        Swal.fire("Logged out!", "", "success");
        navigate("/");
      })
      .catch((err) => {
        console.error("Logout error:", err);
        Swal.fire("Error", "Failed to log out. Please try again.", "error");
      });
  };

  /* build breadcrumb array dynamically */
  const segments = location.pathname.split("/").filter(Boolean);
  const crumbs = segments.map((seg, idx) => ({
    to: "/" + segments.slice(0, idx + 1).join("/"),
    name: friendlyName(seg),
    icon: iconMap[seg.toLowerCase()] || <FiList />,
  }));

  /* ensure root breadcrumb */
  if (crumbs.length === 0) {
    crumbs.push({ to: "/dashboard", name: "Dashboard", icon: <FiHome /> });
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      {/* ───────── Main content ───────── */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* mobile toggle bar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="my-drawer-2"
              className="btn btn-square btn-ghost"
              aria-label="open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-6 w-6 stroke-current"
                fill="none"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
          </div>
          <span className="flex-1 mx-2 px-2">Dashboard</span>
        </div>

        {/* breadcrumbs + back button */}
        <div className="flex items-center justify-between px-6 py-3 bg-base-200 border-b border-base-300">
          {/* Breadcrumb trail */}
          <nav
            className="flex items-center gap-2 text-sm overflow-x-auto scrollbar-thin"
            aria-label="Breadcrumb"
          >
            {crumbs.map(({ to, name, icon }, idx) => {
              const isFirst = idx === 0;
              const isLast = idx === crumbs.length - 1;
              return (
                <div
                  key={to}
                  className="flex items-center gap-1 font-medium whitespace-nowrap"
                >
                  {isFirst ? (
                    <Link
                      to={to}
                      className="flex items-center gap-1 text-primary hover:underline"
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{name}</span>
                    </Link>
                  ) : (
                    <span
                      className="flex items-center gap-1 text-gray-500"
                      aria-current={isLast ? "page" : undefined}
                    >
                      <span className="text-lg">{icon}</span>
                      <span>{name}</span>
                    </span>
                  )}
                  {idx < crumbs.length - 1 && (
                    <FiChevronRight className="text-gray-400" />
                  )}
                </div>
              );
            })}
          </nav>

          {/* Back → one step in history */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-sm btn-outline btn-secondary flex items-center gap-1"
          >
            <FiArrowLeft /> Back
          </button>
        </div>

        {/* routed page content */}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>

      {/* ───────── Sidebar ───────── */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay" />
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <div className="flex justify-center mb-6">
            <Link to="/">
              <img src={BrandLogo} alt="Brand Logo" className="w-32" />
            </Link>
          </div>

          {/* sidebar nav items with icons */}
          <li>
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FiHome /> Dashboard Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/all-groups"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <MdGroup /> All Groups
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/create-group"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FiFolder /> Create Group
            </NavLink>
          </li>

          <li>
            <NavLink
              to={`/dashboard/my-group/${user?.email}`}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg flex items-center gap-2 ${
                  isActive ? "bg-secondary text-white" : "hover:bg-base-300"
                }`
              }
            >
              <FiUser /> My Groups
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-base-300 text-red-600"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
