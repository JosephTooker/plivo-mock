import React, { useState, useRef, useEffect } from "react";
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import {auth} from '../firebase-config'
import {browserSessionPersistence, inMemoryPersistence} from "firebase/auth";
import backgroundExample from "../assets/backgroundExample";

export default function login() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const {logIn, googleSignIn} = UserAuth()
  const [checked, setChecked] = useState(false)
  const router = useRouter()

  useEffect(()=> {
    console.log(checked)
  }, [checked])

  const handleGoogleSignIn = async (e) => {
    e.preventDefault()
    try{
        setLoading(true)
        await googleSignIn()
        router.push('/')
    } catch(error: any){
      var errorMessage = error.message
      var str = errorMessage.substr(errorMessage.indexOf(":") + 1);
      toast.error(str);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        setLoading(true)
        if(!checked){
          await auth.setPersistence(inMemoryPersistence)
        } 
        else{
          await auth.setPersistence(browserSessionPersistence)
        }
        await logIn(emailRef.current.value, passwordRef.current.value)
        console.log("Submit")
        router.push('/')
    } catch (error: any) {
        var errorMessage = error.message
        var str = errorMessage.substr(errorMessage.indexOf(":") + 1);
        toast.error(str);
    }
    setLoading(false)
  };

  return (
    <div className="flex flex-row justify-center h-screen overflow-hidden">
      <div className="flex flex-col md:w-[50%] max-h-screen align-middle justify-center text-center bg-white md:px-[10%] md:scale-[80%]">
        <h1 className="text-3xl font-medium">Welcome Back.👋 </h1>
        <div className="my-5">
          <button 
          onClick={handleGoogleSignIn}
          className="w-full text-center py-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:text-slate-900 hover:shadow transition duration-150">
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

        <p className="text-[#37414F] mt-5">Please enter your details. </p>

        <form action="" className="my-5" onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2 text-left">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                ref={emailRef}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                required
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2 text-left">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                ref={passwordRef} 
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
                required
              />
            </label>
            <div className="flex flex-row justify-between">
              <div>
                <label htmlFor="remember" className="">
                  <input
                    type="checkbox"
                    id="remember"
                    className="mr-2 w-4 h-4 border-slate-200 focus:bg-[#A5CBBE] rounded"
                    onChange={()=>{setChecked(!checked)}}
                    checked={checked}
                  />
                  Remember me
                </label>
              </div>
              <div>
                <a href="#" className="ml-2 font-medium text-[#A5CBBE]">
                  Forgot Password?
                </a>
              </div>
            </div>
            <button disabled = {loading} className="w-full py-3 font-medium text-white bg-[#A5CBBE] hover:bg-[#85A499] rounded-lg border-[#A5CBBE] hover:shadow inline-flex space-x-2 items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="black"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                />
              </svg>
              <span className="text-black">Login</span>
            </button>
            <p className="text-center">
              Not registered yet?{" "}
              <a
                href="/signup"
                className="text-[#A5CBBE] font-medium inline-flex space-x-1 items-center"
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
        <div className="object-fill">
            {backgroundExample()}
        </div>
      </div>
    </div>
  );
}
