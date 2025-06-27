import React from "react";
import { Link } from "react-router";
import brandLogo from "../assets/brand-logo.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 divide-y">
      {/* ───────── Top strip ───────── */}
      <div className="max-w-screen-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10 px-4 md:px-12 lg:px-16 xl:px-24 py-12">
        {/* Logo & tagline */}
        <aside className="space-y-3">
          <Link to="/">
            <img src={brandLogo} alt="HobbyHub" className="w-44" />
          </Link>
          <p className="text-accent text-sm">A Local Hobby Group Organizer</p>
        </aside>

        {/* Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-sm lg:w-2/3">
          {/* HobbyHub */}
          <div>
            <h3 className="uppercase tracking-wide text-accent font-bold mb-3">
              HobbyHub
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/all-groups">All Groups</Link>
              </li>
              <li>
                <Link to="/dashboard/create-group">Create Group</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="uppercase tracking-wide text-accent font-bold mb-3">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
              <li>
                <Link to="/contact-us">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h3 className="uppercase tracking-wide text-accent font-bold mb-3">
              Developers
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="https://github.com/roni-biswas/HobbyHub">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="https://react.dev/">Guides</Link>
              </li>
            </ul>
          </div>

          {/* Social media */}
          <div>
            <h3 className="uppercase tracking-wide text-accent font-bold mb-3">
              Social
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/roni.biswas.48"
                aria-label="Facebook"
                className="text-indigo-300 hover:text-indigo-100"
              >
                <FaFacebookF size={20} />
              </a>
              <a
                href="https://x.com/ronibiswas64"
                aria-label="Twitter"
                className="text-blue-400 hover:text-blue-200"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://instagram.com/roni.biswas.48"
                aria-label="Instagram"
                className="text-pink-400 hover:text-pink-200"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="https://github.com/roni-biswas"
                aria-label="GitHub"
                className="text-gray-300 hover:text-white"
              >
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ───────── Bottom strip ───────── */}
      <div className="py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} HobbyHub • All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
