import React from "react";
import { Link } from "react-router";

const Login = () => {
  return (
    <div className="py-16 pt-18 md:py-24 px-4">
      <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 sm:shadow-2xl my-8">
        <div className="card-body">
          <h2 className="text-2xl text-center font-semibold text-primary my-5">
            Login your Account
          </h2>
          <form className="fieldset">
            <label className="label text-gray-200 text-base">Email</label>
            <input
              type="email"
              name="email"
              className="input w-full"
              placeholder="Email"
              required
            />
            <label className="label text-gray-200 text-base">Password</label>
            <input
              type="password"
              name="password"
              className="input w-full"
              placeholder="Password"
              required
            />
            {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
            <button type="submit" className="btn btn-secondary mt-4">
              Login
            </button>
            <p className="text-gray-300 text-center font-semibold pt-3">
              Don't Have An Account?{" "}
              <Link className="text-primary" to="/register">
                Register
              </Link>
            </p>
          </form>
          {/* Google */}
          <button className="btn bg-white text-black border-[#e5e5e5]">
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

export default Login;
