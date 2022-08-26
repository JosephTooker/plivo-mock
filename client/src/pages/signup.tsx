import React, { useState } from "react";
import Cookies from "universal-cookie";
import Link from "next/link";
import axios from "axios";

const cookies = new Cookies();

const initalState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  userType: "",
};

const signup = () => {
  const [form, setForm] = useState<{
    email: string;
    password: string;
    userType: string;
    firstName: string;
    lastName: string;
  }>({
    email: "",
    password: "",
    userType: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    const { firstName, lastName, email, password, userType } = form;

    const URL = "http://localhost:5000/auth";

    const {
      data: { token, userId, hashedPassword },
    } = await axios.post(`${URL}/signup`, {
      firstName,
      lastName,
      email,
      password,
      userType,
    });

    cookies.set("token", token);
    cookies.set("email", email);
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    cookies.set("userId", userId);
    cookies.set("hashedPassword", hashedPassword);
    cookies.set("userType", userType);

    if (userType === "User") {
      window.location.href = "http://localhost:3000/home";
    } else {
      window.location.href = "http://localhost:3000/";
    }
  };

  return (
    <div className="min-h-screen max-h-screen flex flex-row bg-[#F5F5F5]">
      <div className="flex flex-col md:w-[50%] bg-white rounded-3xl shadow-2xl xl:m-20 m-6 align-middle justify-center text-center px-[10%] py-[5%]">
        <div className="scale-[80%]">
          <h1 className="text-4xl font-medium ">Sign Up. 🙌</h1>
          <div className="my-5">
            <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt=""
              />{" "}
              <span>Sign in with Google</span>
            </button>
          </div>

          <div className="flex flex-row justify-evenly">
            <div className="w-[100%] border-b border-gray-300 mb-2" />{" "}
            <p className="mx-2"> Or </p>{" "}
            <div className="w-[100%] border-b border-gray-300 mb-2" />
          </div>

          <form className="w-full mt-5" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  name="firstName"
                  type="text"
                  placeholder="Jane"
                  onChange={handleChange}
                />
                <p className="my-2 text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  name="lastName"
                  type="text"
                  placeholder="Doe"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  name="email"
                  type="text"
                  placeholder="example@email.com"
                  onChange={handleChange}
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  name="password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label
                  className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  htmlFor="userType"
                >
                  User or Admin
                </label>
                <select
                  className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                  name="userType"
                  onChange={handleChange}
                >
                  <option>Please Choose</option>
                  <option>User</option>
                  <option>Admin</option>
                </select>
              </div>
            </div>
            <div className="flex flex-row items-center">
              <button
                className="w-full shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
                onClick={handleSubmit}
              >
                Sign Up
              </button>
            </div>

            <p className="text-center mt-5">
              Already a member?{" "}
              <a
                href="/login"
                className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
              >
                <span>Log In </span>
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default signup;
