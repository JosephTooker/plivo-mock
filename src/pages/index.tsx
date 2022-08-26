import type { NextPage } from "next";
import Head from "next/head";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer } from '../components'
import Link from "next/link";

const cookies = new Cookies()

const apiKey = 'nypvarqgsd9a';

const client = StreamChat.getInstance(apiKey)

const authToken = cookies.get('token')

if(authToken) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('email'),
    firstName: cookies.get('firstName'),
    lastName: cookies.get('lastName'),
    hashedPassword: cookies.get('hashedPassword')
  }, authToken)
}

const Home: NextPage = () => {

  if(!authToken) return (
    <Link href='/login'>
      <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Login</button>
    </Link>
  ) 

  return (
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
        
        />

        <ChannelContainer 

        />
      </Chat>    
    </div>
  );
};

export default Home;
