import React, { use, useState } from "react";
import { MdDone } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import SocialLogin from "../components/SocialLogin";
import axios from "axios";

const Register = () => {
  const { createUser, updateUserProfile } = use(AuthContext);
  const navigate = useNavigate();
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    digit: false,
    lower: false,
    upper: false,
  });
  const [togglePassword, setTogglePassword] = useState(true);

  // password validation
  const handlePasswordValidation = (value) => {
    // const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
    const isSixCar = /^.{6,}$/;
    const digitRegex = /(?=.*\d)/;
    const upperCaseRegex = /(?=.*[A-Z])/;
    const lowerCaseRegex = /(?=.*[a-z])/;

    setPasswordValidations({
      length: isSixCar.test(value),
      digit: digitRegex.test(value),
      lower: lowerCaseRegex.test(value),
      upper: upperCaseRegex.test(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const { email, password, ...restFormData } = Object.fromEntries(
      formData.entries()
    );

    // Check password validity first
    if (!Object.values(passwordValidations).every(Boolean)) return;

    try {
      const result = await createUser(email, password);
      if (result.user) {
        // Prepare user data for registration
        const userData = {
          ...restFormData,
          email: result.user.email,
          photo_url: restFormData.photo_url || result.user.photoURL,
          creationTime: result.user.metadata.creationTime,
          lastSignInTime: result.user.metadata.lastSignInTime,
        };
        await updateUserProfile(
          formData.get("name"),
          formData.get("photo_url")
        );

        // Send user data to the server
        const res = await axios.post(`${import.meta.env.VITE_base_url}/users`, {
          ...userData,
        });

        if (res.status === 200) {
          Swal.fire({
            title: "Registration Successful",
            text: "Welcome to our community!",
            icon: "success",
            confirmButtonText: "OK",
          });
          form.reset();
          navigate("/");
        } else {
          throw new Error("Failed to register user");
        }
      }
    } catch (error) {
      Swal.fire({
        title: "Registration Failed",
        text: error.message,
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  return (
    <div className="px-4 py-8 flex items-center justify-center min-h-screen">
      <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 sm:shadow-md my-8">
        <div className="card-body">
          <h2 className="text-2xl text-center font-semibold text-primary my-5">
            Register your account
          </h2>
          <form onSubmit={handleSubmit} className="fieldset">
            <label className="label text-gray-200 text-base">Your Name</label>
            <input
              type="text"
              name="name"
              className="input w-full"
              placeholder="Enter your name"
              required
            />
            <label className="label text-gray-200 text-base">Photo URL</label>
            <input
              type="text"
              name="photo_url"
              className="input w-full"
              placeholder="Enter your photo URL"
              required
            />
            <label className="label text-gray-200 text-base">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
              required
            />
            <label className="label text-gray-200 text-base">Password</label>
            <div className="relative">
              <input
                type={togglePassword ? "password" : "text"}
                name="password"
                onChange={(e) => handlePasswordValidation(e.target.value)}
                className="input w-full"
                placeholder="Password"
                autoComplete="off"
                required
              />
              <span
                onClick={() => setTogglePassword(!togglePassword)}
                className="absolute top-2.5 cursor-pointer right-7"
              >
                {!togglePassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaRegEye size={20} />
                )}
              </span>
            </div>
            {/* password validation */}
            <p className="flex flex-col text-red-500">
              <span
                className={`flex items-center gap-1.5 ${
                  passwordValidations.length && "text-green-500"
                }`}
              >
                {passwordValidations.length && <MdDone />} Must be more than 6
                characters
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  passwordValidations.digit && "text-green-500"
                }`}
              >
                {passwordValidations.digit && <MdDone />}including at least one
                Number
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  passwordValidations.upper && "text-green-500"
                }`}
              >
                {passwordValidations.upper && <MdDone />}At least one Uppercase
                letter
              </span>
              <span
                className={`flex items-center gap-1.5 ${
                  passwordValidations.lower && "text-green-500"
                }`}
              >
                {passwordValidations.lower && <MdDone />}At least one Lowercase
                letter
              </span>
            </p>
            <button className="btn btn-secondary mt-4">Register</button>
            <p className="text-gray-500 text-center font-medium pt-3">
              Already Have An Account?{" "}
              <Link className="text-primary" to="/login">
                Login
              </Link>
            </p>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
