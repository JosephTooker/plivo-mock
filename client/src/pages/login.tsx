import React, { useState } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";
import axios from "axios";
import { string } from "zod";

const cookies = new Cookies();

export default function login() {
  const [form, setForm] = useState<{
    email: string;
    password: string;
    userType: string;
  }>({
    email: "",
    password: "",
    userType: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const { email, password, userType } = form;

    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/signup`, {
      email,
      password,
    });

    cookies.set("token", token);
    cookies.set("email", email);
    cookies.set("userId", userId);

    if (userType === "User") {
      window.location.href = "http://localhost:3000/home";
    } else {
      window.location.href = "http://localhost:3000/";
    }
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col md:w-[50%] min-h-screen align-middle justify-center text-center bg-white md:px-[10%] md:scale-[80%]">
        <h1 className="text-3xl font-medium">Welcome Back.👋 </h1>
        <div className="my-5">
          <button className="w-full text-center py-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:shadow transition duration-150">
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              className="w-6 h-6"
              alt=""
            />{" "}
            <span>Login with Google</span>
          </button>
        </div>

        <div className="flex flex-row justify-evenly">
          <div className="w-[100%] border-b border-gray-300 mb-2" />{" "}
          <p className="mx-2"> Or </p>{" "}
          <div className="w-[100%] border-b border-gray-300 mb-2" />
        </div>

        <p className="text-slate-500 mt-5">Please enter your details. </p>

        <form action="" className="my-5">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
              />
            </label>
            <div className="flex flex-row justify-between">
              <div>
                <label htmlFor="remember" className="">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 w-4 h-4 border-slate-200 focus:bg-indigo-600 rounded"
                  />
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="ml-2 font-medium text-indigo-600">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span>Login</span>
            </button>
            <p className="text-center">
              Not registered yet?{" "}
              <a
                href="/signup"
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Register now </span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </span>
              </a>
            </p>
          </div>
        </form>
      </div>

      <div className="hidden md:w-[50%] flex-col md:flex bg-[#F5F5F5] justify-center text-center">
        <h1 className="my-3 font-semibold text-5xl text-white">
          Put Image Here
        </h1>
      </div>
    </div>
  );
}
