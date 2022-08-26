import React, { useState } from 'react'
import Cookies from 'universal-cookie'
import Link from 'next/link'
import axios from 'axios'

const cookies = new Cookies()

const initalState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: ''
}

const signup = () => {
    const [form, setForm] = useState()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(form)

        const { firstName, lastName, email, password, userType } = form

        const URL = 'http://localhost:5000/auth'

        const { data: { token, userId, hashedPassword } } = await axios.post(`${URL}/signup`, {
            firstName, lastName, email, password, userType
        })

        cookies.set('token', token)
        cookies.set('email', email)
        cookies.set('firstName', firstName)
        cookies.set('lastName', lastName)
        cookies.set('userId', userId)
        cookies.set('hashedPassword', hashedPassword)
        cookies.set('userType', userType)

        if(userType === 'User') {
            window.location.href = 'http://localhost:3000/home'
        } else {
            window.location.href = 'http://localhost:3000/'
        }

    }

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
  
          <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        name="firstName" 
                        type="text" 
                        placeholder="Jane" 
                        onChange={handleChange} 
                    />
                    <p className="text-red-500 text-xs italic">Please fill out this field.</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        name="lastName" 
                        type="text" 
                        placeholder="Doe" 
                        onChange={handleChange} 
                    />
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        name="email" 
                        type="text" 
                        placeholder="example@email.com" 
                        onChange={handleChange}
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-blue-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" 
                        name="password" 
                        type="password" 
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
                <div className='w-full px-3'>
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="userType">
                        User or Admin
                    </label>
                    <select className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" name='userType' onChange={handleChange}>
                        <option>Please Choose</option>
                        <option>User</option>
                        <option>Admin</option>
                    </select>
                </div>
            </div>
            <div className="md:flex md:items-center">
                <div className="md:w-1/3"> </div>
                <div className="md:w-2/3">
                    <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" type="button" onClick={handleSubmit}>
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