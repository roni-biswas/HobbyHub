import React, { use, useState } from "react";
import { MdDone } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, googleLoginUser } = use(AuthContext);
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

    // If not exists, create user in Firebase
    const result = await createUser(email, password);
    const userProfile = {
      email,
      ...restFormData,
      creationTime: result.user?.metadata?.creationTime,
      lastSignInTime: result.user?.metadata?.lastSignInTime,
    };

    // Save to database
    const dbRes = await fetch("https://papaya-hobby-server.vercel.app/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userProfile),
    });

    const dbData = await dbRes.json();
    if (dbData.insertedId) {
      Swal.fire({
        title: "User created Successfully!",
        icon: "success",
        draggable: true,
      });
      form.reset();
      navigate("/");
    }
  };

  // sign up with google
  const handleGoogleLogin = () => {
    googleLoginUser()
      .then(async (result) => {
        const { user } = result;
        const userProfile = {
          email: user.email,
          name: user.displayName,
          photo_url: user.photoURL,
          creationTime: user?.metadata?.creationTime,
          lastSignInTime: user?.metadata?.lastSignInTime,
        };

        try {
          // Check if user exists by email
          const res = await fetch(
            `https://papaya-hobby-server.vercel.app/users?email=${user.email}`
          );
          const existingUsers = await res.json();

          // If not found, register new user
          if (existingUsers.length === 0) {
            const dbRes = await fetch(
              "https://papaya-hobby-server.vercel.app/users",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userProfile),
              }
            );
            const dbData = await dbRes.json();

            if (dbData.insertedId) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Successfully Registered with Google!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          }

          // Navigate after login (either existing or new user)
          navigate(location.state || "/");
        } catch (error) {
          console.error("Google login error:", error);
          Swal.fire({
            icon: "error",
            title: "Login Failed",
            text: error.message || "Something went wrong with Google login.",
          });
        }
      })
      .catch((error) => {
        console.error("Firebase error:", error);
        Swal.fire({
          icon: "error",
          title: "Google Login Error",
          text: error.message || "Could not complete Google login.",
        });
      });
  };

  return (
    <div className="py-16 pt-18 md:py-24 px-4">
      <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 sm:shadow-2xl my-8">
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
            <p className="text-gray-200 text-center font-medium pt-3">
              Already Have An Account?{" "}
              <Link className="text-primary" to="/login">
                Login
              </Link>
            </p>
          </form>
          {/* Google */}
          <button
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
