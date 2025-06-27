import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import SocialLogin from "../components/SocialLogin";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from;
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;
    signIn(email, password)
      .then((result) => {
        if (result.user) {
          Swal.fire({
            title: "Login Successful",
            text: "Welcome back!",
            icon: "success",
            confirmButtonText: "OK",
          });
          navigate(`${location?.state ? from : "/"}`);
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
          confirmButtonText: "Try Again",
        });
      });
  };

  return (
    <div className="py-16 pt-18 md:py-24 px-4">
      <div className="card bg-base-200 w-full mx-auto max-w-sm shrink-0 sm:shadow-md my-8">
        <div className="card-body">
          <h2 className="text-2xl text-center font-semibold text-primary my-5">
            Login your Account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
            <label className="label text-gray-200 text-base">Email</label>
            <input
              type="email"
              name="email"
              {...register("email", { required: true })}
              className="input w-full"
              placeholder="Email"
              required
            />
            <label className="label text-gray-200 text-base">Password</label>
            <input
              type="password"
              name="password"
              {...register("password", { required: true })}
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
            <p className="text-gray-500 text-center font-semibold pt-3">
              Don't Have An Account?{" "}
              <Link className="text-primary" to="/register">
                Register
              </Link>
            </p>
          </form>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
