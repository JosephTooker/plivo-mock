import type { NextPage } from "next";
import Head from "next/head";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer } from '../components'

const apiKey = 'nypvarqgsd9a';

const client = StreamChat.getInstance(apiKey)

const Home: NextPage = () => {
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
