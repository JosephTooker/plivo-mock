import React from "react";
import type { NextPage } from "next";
import SupportModal from "../components/SupportModal";
import Link from "next/link";
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'

/*
const GroupCard = (props : any) => {
    const {
      pic,
      team,
      members,
    } = props;
  
    return (
        <div className="groupcard">
        {members >= 200
            ? <span className="dot unavailable"></span>
            : <span className="dot"></span>
        }
        <div className='groupPic round'>
            <img src={pic} alt='group pic'/>
        </div>
        <div className="groupText">
            <h3>{team}</h3>
            <body>{members + " members"}</body>
        </div>
        <span className="groupAdd">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.2222 0L10.2222 20M20 10.2222L0 10.2222" stroke="black" stroke-opacity="1" stroke-width="2"/>
            </svg>
        </span>
        </div>
    );
  };
*/
const Home: NextPage = () => {
  const {user, logOut} = UserAuth()
  const router = useRouter()

  async function handleLogout(){   
    if (window.confirm("Do you really want to leave?")) {
      try{
          await logOut()
          router.push('/login')
      } catch (error : any){
          const errorMessage = error.message;
          console.log("Failed to log out: " + errorMessage)
      }      
    }
  }


  return (
    <div className="home">
      <div className="home_header">
        <div className="_h5">
          company logo
        </div>
        <div className="home_header_right">
          <p className="_h5">Home</p>
          <p className="_h5">About Us</p>
          <p className="_h5">Shop</p>
          <p className="_h5">Help</p>
          { user !== null ? 
            <span onClick={handleLogout} className="_h5">Log Out</span> :
            <Link href="/login">
            <p className="_h5">Login</p>
          </Link>
          }

        </div>
      </div>

      <div className="home_content">
        <SupportModal />

        <p className="home_title _title">Customer Care</p>
        <p className="home_text _body">
          How can we help? Find all your answers in one place.
        </p>
        <div className="home_container1">
          <div className="home_panel">
            <svg
              className="home_icon"
              width="70"
              height="70"
              viewBox="0 0 70 70"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M58.3333 61.25V55.4167C58.3333 52.3225 57.1041 49.355 54.9162 47.1671C52.7283 44.9792 49.7608 43.75 46.6666 43.75H23.3333C20.2391 43.75 17.2716 44.9792 15.0837 47.1671C12.8958 49.355 11.6666 52.3225 11.6666 55.4167V61.25"
                stroke="#667080"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M35 32.0833C41.4434 32.0833 46.6667 26.86 46.6667 20.4167C46.6667 13.9733 41.4434 8.75 35 8.75C28.5567 8.75 23.3334 13.9733 23.3334 20.4167C23.3334 26.86 28.5567 32.0833 35 32.0833Z"
                stroke="#667080"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="home_panel_text _h3">My Account</p>
          </div>
          <div className="home_panel">
            <svg
              className="home_icon"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z"
                stroke="#667080"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M26 17V30.3333L36 37"
                stroke="#667080"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="home_panel_text _h3">Order History</p>
          </div>
          <div className="home_panel">
            <svg
              className="home_icon"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.7564 32.96C24.7564 32.256 24.863 31.6373 25.0764 31.104C25.2897 30.5493 25.5564 30.048 25.8764 29.6C26.2177 29.152 26.591 28.7253 26.9964 28.32C27.423 27.9147 27.8284 27.5093 28.2124 27.104C28.7244 26.6133 29.1937 26.0587 29.6204 25.44C30.047 24.8 30.2604 23.9893 30.2604 23.008C30.303 21.856 29.9937 20.928 29.3324 20.224C28.6924 19.52 27.7324 19.168 26.4524 19.168C25.0657 19.168 24.0097 19.4773 23.2844 20.096C22.5804 20.7147 22.047 21.7067 21.6844 23.072L19.1244 22.656C19.2737 21.888 19.519 21.152 19.8604 20.448C20.2017 19.744 20.6604 19.1253 21.2364 18.592C21.8124 18.0373 22.527 17.6 23.3804 17.28C24.255 16.9387 25.2897 16.768 26.4844 16.768C27.5724 16.768 28.5217 16.9173 29.3324 17.216C30.1644 17.4933 30.8577 17.8987 31.4124 18.432C31.9884 18.9653 32.415 19.5947 32.6924 20.32C32.991 21.0453 33.1404 21.8347 33.1404 22.688C33.1404 23.968 32.8844 25.024 32.3724 25.856C31.8817 26.688 31.295 27.4347 30.6124 28.096C30.2284 28.48 29.8444 28.8533 29.4604 29.216C29.0977 29.5787 28.767 29.952 28.4684 30.336C28.191 30.72 27.9564 31.136 27.7644 31.584C27.5937 32.0107 27.5084 32.4907 27.5084 33.024V33.44H24.7564V32.96ZM24.5644 36.288H27.6684V40H24.5644V36.288Z"
                fill="#667080"
              />
              <path
                d="M27 52C40.8071 52 52 40.8071 52 27C52 13.1929 40.8071 2 27 2C13.1929 2 2 13.1929 2 27C2 40.8071 13.1929 52 27 52Z"
                stroke="#667080"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="home_panel_text _h3">General Questions</p>
          </div>
        </div>

        <div className="home_container2">
          <div className="home_panel2">
            <p className="home_bot_text _h3">Still need help?</p>
            <p className="home_bot_caption _body">Contact Us</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
