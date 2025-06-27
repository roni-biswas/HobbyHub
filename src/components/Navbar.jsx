// src/components/Navbar.jsx
import React, { useEffect, useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import brandLogo from "../assets/brand-logo.png";
import avatarIcon from "../assets/avatar.png";
import ThemeToggle from "./ThemeToggle";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  /* ── sticky state ─────────────────────────── */
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsSticky(window.scrollY > 80);
    onScroll(); // run once on mount
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── fetch user info ───────────────────────── */
  useEffect(() => {
    if (!user?.email) return;
    fetch(`http://localhost:3000/users/${user.email}`)
      .then((res) => res.json())
      .then(setUserData)
      .catch((err) => console.error("Error fetching user data:", err));
  }, [user?.email]);

  const navigate = useNavigate();

  const handleLogOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((r) => {
      if (r.isConfirmed) {
        signOutUser().then(() => {
          Swal.fire("Logged out!", "", "success");
          navigate("/");
        });
      }
    });
  };

  /* ── link helpers ──────────────────────────── */
  const navLinkClass = ({ isActive }) =>
    `inline-block text-sm uppercase after:duration-1000 ease-out after:block
     after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0
     after:bg-red-500 after:transition-transform hover:after:origin-bottom-left
     hover:after:scale-x-100 ${isActive ? "text-primary" : ""}`;

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
        <NavLink to="/about-us" className={navLinkClass}>
          About Us
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink to={`/dashboard`} className={navLinkClass}>
            Dashboard
          </NavLink>
        </li>
      )}
      {!user ? (
        <li>
          <NavLink to="/login" className={navLinkClass}>
            Login
          </NavLink>
        </li>
      ) : (
        <li>
          <button
            onClick={handleLogOut}
            className="inline-block text-sm uppercase after:duration-1000
                       after:block after:h-0.5 after:w-full after:bg-red-500
                       after:origin-bottom-right after:scale-x-0
                       hover:after:origin-bottom-left hover:after:scale-x-100"
          >
            Logout
          </button>
        </li>
      )}
    </>
  );

  /* ── header classes (sticky vs top) ────────── */
  const headerBase = "top-0 left-0 right-0 z-50 transition-colors duration-300";
  const headerSticky =
    "sticky backdrop-blur-lg bg-accent/30 border-b border-white/30 shadow-md";
  const headerAtTop =
    "relative bg-accent border-b border-white/10 shadow-none z-20";

  return (
    <header
      className={`${headerBase} ${isSticky ? headerSticky : headerAtTop}`}
    >
      <div className="navbar p-0 py-3 max-w-screen-7xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24">
        {/* ─────── start (logo + mobile menu) ─────── */}
        <div className="navbar-start">
          {/* mobile dropdown */}
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
              className="menu menu-sm dropdown-content mt-4 p-2 shadow-sm
                         bg-base-100 text-base-content rounded-box w-[200px]
                         left-0 top-full z-50 [&>*]:font-bold"
            >
              {links}
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </div>

          <Link to="/" className="w-[180px]">
            <img src={brandLogo} alt="Brand Logo" className="w-full" />
          </Link>
        </div>

        {/* ─────── end (links + toggle + avatar) ─────── */}
        <div className="navbar-end hidden lg:flex items-center">
          <ul className="flex gap-4 px-1 [&>*]:font-bold">{links}</ul>

          <ThemeToggle />

          {user && userData && (
            <div
              className="avatar ml-3"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={userData.name}
            >
              <div className="w-7 rounded-full ring-2 ring-primary ring-offset-2 ring-offset-base-100">
                <img src={userData.photo_url || avatarIcon} />
              </div>
            </div>
          )}
          <Tooltip id="my-tooltip" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
