import React, { useState } from "react";
import ContactUs from "./contact-form";

export default function SupportModal() {
  const [hideModal, setHideModal] = useState(true);
  const [menu, setMenu] = useState("Default");

  function onClose() {
    setHideModal(true);
  }

  function onClick() {
    setHideModal(false);
  }

  const Default = () => {
    return (
      <div className="chat-popup" id="myForm" hidden={hideModal}>
        <form className="flex fixed z-50 gap-x-2.5 w-[25%] top-[40%] bottom-[3.9%] right-[3.05%] flex-col bg-[#F5F5F5] rounded-md">
          <div className="flex flex-row h-[15%] items-center bg-[#9DA09F] px-8 rounded-t-md">
          { menu === "Default" && 
          <>
            <h1 className="flex-auto font-semibold text-center text-white">
              How can we help?
            </h1>
            <button className="flex-initial" type="button" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            </>
            }

        {menu !== "Default" && 
          <button
            className="flex-initial"
            type="button"
            onClick={() => {
              setMenu("Default");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
        }

        {menu === "Message" && 
            <h1 className="flex-auto font-semibold text-center text-white">
            Leave us a message
        </h1>
        }

        
        {menu === "Text" && 
            <h1 className="flex-auto font-semibold text-center text-white">
            Send us a text
        </h1>
        }

        
        {menu === "Chat" && 
            <h1 className="flex-auto font-semibold text-center text-white">
            Chat with us
        </h1>
        }

        </div>  

        <div className="support-modal-content">

            {menu === "Default" && 
            <div className="bg=[#F5F5F5] p-8">
                <h1 className="font-semibold py-2 underline">Suggestions</h1>
                <div className='flex flex-col justify-start'>
                <button type="submit" className="font-semibold text-start py-2 hover:underline" onClick={()=> {setMenu("Message")} }>1. Leave a message</button>
                <button type="submit" className="font-semibold text-start py-2 hover:underline" onClick={()=> {setMenu("Text")} }>2. Send us a text</button>
                </div>
                <hr className='self-center border-1 border-black mt-28'></hr>
                <button type="submit" className="text-start py-2 text-[#667080] hover:underline" onClick={()=> {setMenu("Chat")} }>Chat with us</button>
                
            </div>
            }
                {menu === "Message" && 
                <ContactUs />
                }

                {menu === "Text" && 
                <div />
                }

                {menu === "Chat" && 
                <div />
                }
        </div>

        </form>
      </div>
    );
  };

  return (
    <div className="supportModal">
      <button
        className="fixed z-50 px-8 gap-x-2.5 top-[91.21%] bottom-[3.9%] right-[3.05%] bg-[#9DA09F] hover:bg-[#289D8C] text-gray-800 font-bold inline-flex items-center rounded-md"
        type="button"
        onClick={onClick}
      >
        <span className="text-white font-medium">Help</span>
        <svg
          width="27"
          height="27"
          viewBox="0 0 54 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M24.7564 32.96C24.7564 32.256 24.863 31.6373 25.0764 31.104C25.2897 30.5493 25.5564 30.048 25.8764 29.6C26.2177 29.152 26.591 28.7253 26.9964 28.32C27.423 27.9147 27.8284 27.5093 28.2124 27.104C28.7244 26.6133 29.1937 26.0587 29.6204 25.44C30.047 24.8 30.2604 23.9893 30.2604 23.008C30.303 21.856 29.9937 20.928 29.3324 20.224C28.6924 19.52 27.7324 19.168 26.4524 19.168C25.0657 19.168 24.0097 19.4773 23.2844 20.096C22.5804 20.7147 22.047 21.7067 21.6844 23.072L19.1244 22.656C19.2737 21.888 19.519 21.152 19.8604 20.448C20.2017 19.744 20.6604 19.1253 21.2364 18.592C21.8124 18.0373 22.527 17.6 23.3804 17.28C24.255 16.9387 25.2897 16.768 26.4844 16.768C27.5724 16.768 28.5217 16.9173 29.3324 17.216C30.1644 17.4933 30.8577 17.8987 31.4124 18.432C31.9884 18.9653 32.415 19.5947 32.6924 20.32C32.991 21.0453 33.1404 21.8347 33.1404 22.688C33.1404 23.968 32.8844 25.024 32.3724 25.856C31.8817 26.688 31.295 27.4347 30.6124 28.096C30.2284 28.48 29.8444 28.8533 29.4604 29.216C29.0977 29.5787 28.767 29.952 28.4684 30.336C28.191 30.72 27.9564 31.136 27.7644 31.584C27.5937 32.0107 27.5084 32.4907 27.5084 33.024V33.44H24.7564V32.96ZM24.5644 36.288H27.6684V40H24.5644V36.288Z"
            fill="white"
          />
          <path
            d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z"
            stroke="white"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

        <Default />

    </div>
  );
}
