import React from "react";
import { Link, NavLink } from "react-router";
import brandLogo from "../assets/brand-logo.png";
import avatarIcon from "../assets/avatar.png";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const navLinkClass = ({ isActive }) =>
    `inline-block text-sm uppercase after:duration-1000 ease-out after:block after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-red-500 after:transition-transform hover:after:origin-bottom-left hover:after:scale-x-100 ${
      isActive ? "text-primary" : ""
    }`;
  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-groups" className={navLinkClass}>
          All Groups
        </NavLink>
      </li>
      <li>
        <NavLink to="/create-group" className={navLinkClass}>
          Create Group
        </NavLink>
      </li>
      <li>
        <NavLink to="/my-group" className={navLinkClass}>
          My Groups
        </NavLink>
      </li>
      <li>
        <NavLink to="/login" className={navLinkClass}>
          Login
        </NavLink>
      </li>
    </>
  );
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b-1 border-b-white/40 bg-opacity-30 shadow-md backdrop-blur-lg bg-base-100/30
        }`}
    >
      <div className="navbar p-0 py-3 max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
        <div className="navbar-start">
          {/* Dropdown for mobile */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="p-0 mr-3 lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-4 p-2 shadow-sm bg-base-100 text-base-content rounded-box w-[200px] left-0 top-full z-50 [&>*]:font-bold"
            >
              {links}
              <div>
                <ThemeToggle />
              </div>
            </ul>
          </div>

          <Link to="/" className="w-[180px]">
            <img className="w-full" src={brandLogo} alt="Brand Logo" />
          </Link>
        </div>

        <div className="navbar-end hidden lg:flex">
          <ul className="flex gap-4 px-1 [&>*]:font-bold ">{links}</ul>

          {/* Theme and Profile */}
          <ThemeToggle />
          {/* profiles */}
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-7 rounded-full ring-2 ring-offset-2">
              <img src={avatarIcon} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
