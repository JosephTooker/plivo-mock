import React, { useState, useRef } from "react";
import { UserAuth } from '../context/AuthContext'
import { doc, setDoc } from "firebase/firestore";  
import { useRouter } from 'next/router'
import toast from 'react-hot-toast';
import {db, auth} from "../firebase-config"
import {updateProfile } from "firebase/auth";


const signup = () => {
  const firstNameRef = useRef<HTMLInputElement>(null)
  const lastNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const { signUp, googleSignIn } = UserAuth()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

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
        await signUp(emailRef.current.value, passwordRef.current.value)
        await setDoc(doc(db, "users", auth.currentUser.uid), {
          first_name: firstNameRef.current.value,
          last_name: lastNameRef.current.value,
          user_type: "User"
        }).then(function() {
          return updateProfile(auth.currentUser, {
            displayName: firstNameRef.current.value + " " + lastNameRef.current.value
          })
        }).catch(function(error) {
          console.log(error);
        });
        router.push('/')
    } catch (error: any){
      var errorMessage = error.message
      var str = errorMessage.substr(errorMessage.indexOf(":") + 1);
      toast.error(str);
    }
    setLoading(false)
  };

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col md:w-[50%] min-h-screen align-middle justify-center text-center bg-white md:px-[10%] scale-[80%]">
          <h1 className="text-4xl font-medium ">Create an account. 🙌</h1>
          <div className="my-5">
            <button 
            onClick={handleGoogleSignIn}
            className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
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

          <form action="" className="w-full mt-5" onSubmit={handleSubmit}>
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
                  ref={firstNameRef}
                  required
                />
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
                  ref={lastNameRef}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col space-y-5 mb-5">
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
                  ref={emailRef}
                  required
                />
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
                  ref={passwordRef}
                  placeholder= "Enter a password"
                  required
                />
            </div>

            <button 
              type="submit"
              className="w-full py-3 my-3 shadow bg-black hover:bg-[#85A499] focus:shadow-outline focus:outline-none text-white font-bold px-4 rounded"
              disabled={loading}
            >
              Sign Up
            </button>

            <p className="text-center mt-5">
              Already a member?{" "}
              <a
                href="/login"
                className="text-[#A5CBBE] font-medium inline-flex space-x-1 items-center"
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

        <div className="hidden md:w-[50%] flex-col md:flex bg-[#B7E1D3] justify-center text-center">
        <h1 className="italic font-bold text-3xl">
            Keep it simple.
          </h1>
          <h1 className="italic font-extrabold text-9xl text-white" style={{fontFamily:"Averia Sans Libre"}}>
            <p>BEST-T'S</p>
            <p className="text-black">BEST-T'S</p>
            <p>BEST-T'S</p>
            <p className="text-black">BEST-T'S</p>
          </h1>
      </div>

      </div>
  );
};

export default signup;
