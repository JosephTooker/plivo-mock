import React from 'react'
import Cookies from 'universal-cookie'
import Link from 'next/link'

const signup = () => {
  return (
    <div className="min-h-screen  sm:flex sm:flex-row  justify-center ">
        <div className=" mx-auto my-10 bg-gray-200 px-80  py-40  lg:p-50 ms:p-10 ss:p-5 rounded-3xl shadow-xl xl:m-20 m-6 ">
          <h1 className="text-4xl font-medium">Sign Up</h1>
          <p className="text-slate-500">Hi, Welcome 👋</p>
          <div className="my-5">
            <button className="w-full text-center py-3 my-3 border flex space-x-2 items-center justify-center border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
              <img
                src="https://www.svgrepo.com/show/355037/google.svg"
                className="w-6 h-6"
                alt=""
              />{" "}
              <span>Login with Google</span>
            </button>
          </div>
  
          <form action="" className="w-full max-w-lg" onSubmit={() => {}}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="firstName" type="text" placeholder="Jane" />
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="lastName" type="text" placeholder="Doe" />
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="email" type="text" placeholder="example@email.com" />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="password" type="password" />
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="userType">
                        User or Admin
                    </label>
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name='userType'>
                        <option>Please Choose</option>
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button">
                        Sign Up
                    </button>
                </div>
            </div>
          </form>
        </div>
    </div>
        
  )
}

export default signup