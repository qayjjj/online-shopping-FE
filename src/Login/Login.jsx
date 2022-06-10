import React from "react";
import google from "./google.svg";
import logomark from "./Logomark.svg";

function Login() {
  return (
    <div className="bg-white flex place-content-center w-1/2 h-screen py-16">
      <div className="w-1/2">
        <div className="flex">
          <img src={logomark} className="h-8" />
          <h1 className="ml-2 text-lg font-medium">Untitled UI</h1>
        </div>
        <div className="mt-12">
          <h1 className="text-3xl font-semibold">Log in</h1>
          <h2 className="text-gray-500 mt-4 text-sm">
            Welcome back! Please enter your details.
          </h2>
        </div>

        <div className="form mt-6">
          <form>
            <div className="input-container flex flex-col">
              <label className="text-xs font-medium">Email</label>
              <input
                className="border-2 border-solid border-gray-200 rounded-lg h-12 px-3 mt-2"
                type="text"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="input-container flex flex-col mt-3">
              <label className="text-xs font-medium">Password</label>
              <input
                className="border-2 border-solid border-gray-200 rounded-lg h-12 px-3 mt-2"
                type="password"
                name="password"
                placeholder="**********"
                required
              />
            </div>
            <div className="flex justify-between mt-5">
              <div>
                <input
                  className="mb-0"
                  type="checkbox"
                  id="remember"
                  name="remember"
                  value="remember"
                />
                <label className="ml-2 text-xs font-medium" for="remember">
                  Remember for 30 days
                </label>
              </div>
              <h2 className="text-xs font-semibold mt-0.5 text-[#3339cb]">
                Forgot password
              </h2>
            </div>

            <div className="flex flex-col mt-5">
              <div className="bg-[#3339cb] h-12 text-white rounded-lg flex place-content-center items-center font-medium text-sm">
                Sign in
              </div>
              <div className="mt-4 border-2 border-solid border-gray-200 h-12 rounded-lg flex place-content-center items-center">
                <img src={google} className="h-6" />
                <span className="font-medium ml-2 text-sm">
                  Sign in with Google
                </span>
              </div>
              <div className="mt-6 text-center">
                <span className="text-gray-500">Don't have an account?</span>
                <span className="font-semibold text-[#3339cb] ml-1">
                  Sign up
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
