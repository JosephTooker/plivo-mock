import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input/input'
import React, { useRef, useState } from "react";
import { db } from "../firebase-config"
import { doc, setDoc } from "firebase/firestore"


export default function TextUs(props: any) {
  const {
    location
  } = props;
    const [phoneNumber, setPhoneNumber] = useState();
    const nameRef = useRef<HTMLInputElement>(null)
    const numberRef = useRef<HTMLInputElement>(null)
    const messageRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e) => {
      e.preventDefault()
      console.log("Sending data")
      await setDoc(doc(db, "text-form", nameRef.current.value), {
        full_name: nameRef.current.value,
        phone_number: numberRef.current.value,
        message: messageRef.current.value,
        location: location
      })

    }

    return (
        <form className="rounded-lg flex flex-col px-8">
    
          <label
            htmlFor="fullname"
            className="text-black font-light mt-8 dark:text-gray-50"
          >
            Full name <span className="text-red-500 dark:text-gray-50">*</span>
          </label>
          <input
            type="text"
            name="fullname"
            className="bg-white border-2 border-[#D9D9D9] py-2 pl-4 focus:outline-none focus:ring-1 ring-green-500 font-light text-gray-500"
            ref={nameRef}
          />
        
          <label
            htmlFor="phoneNumber"
            className="text-black font-light mt-4 dark:text-gray-50"
          >
            Phone number <span className="text-red-500">*</span> <p className='text-gray-500 italic py-2'>Example: (123)-456-7890</p>
          </label>

          <PhoneInput
            maxLength="14"
            country="US"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            className="bg-white border-2 border-[#D9D9D9] py-2 pl-4 focus:outline-none focus:ring-1 ring-green-500 font-light text-gray-500"
            ref={numberRef}
          />
    
          <label
            htmlFor="message"
            className="text-black  font-light mt-4 dark:text-gray-50"
          >
            How can we help you? <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder='Type up to 180 characters'
            maxLength={180}
            name="message"
            className="bg-white border-2 border-[#D9D9D9] py-2 pl-4 focus:outline-none focus:ring-1 ring-green-500 font-light text-gray-500"
            ref={messageRef}
          ></textarea>
          <div className="flex flex-row justify-center">
            <button className="flex flex-row items-center justify-center w-full px-10 mt-8 mb-8 py-2 bg-[#A9C6BB] text-black font-semibold text-lg  " onClick={handleSubmit}>
              Send
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="white ml-2"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.00967 5.12761H11.0097C12.1142 5.12761 13.468 5.89682 14.0335 6.8457L16.5089 11H21.0097C21.562 11 22.0097 11.4477 22.0097 12C22.0097 12.5523 21.562 13 21.0097 13H16.4138L13.9383 17.1543C13.3729 18.1032 12.0191 18.8724 10.9145 18.8724H8.91454L12.4138 13H5.42485L3.99036 15.4529H1.99036L4.00967 12L4.00967 11.967L2.00967 8.54712H4.00967L5.44417 11H12.5089L9.00967 5.12761Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </form>
      );
    
}