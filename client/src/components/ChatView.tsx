import React from 'react'
import { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'
import { Chat, Window, Channel, MessageList, MessageInput} from "stream-chat-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config"
import { DefaultGenerics, StreamChat } from "stream-chat";
import { ChannelContainer, ChannelListContainer } from "../components";
import 'stream-chat-react/dist/css/index.css'

function ChatView() {
  const {user} = UserAuth()
  const [ createType, setCreateType ] = useState('')
  const [ isCreating, setIsCreating ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const [message, setMessage] = useState('')
  const [client, setClient] = useState()

  useEffect(()=>{
    if(user === null){
      setMessage("Please log in to chat with an agent.")
    }
    else{
      setMessage("Chat with an agent?")
    }
  }, [user])

  let authToken: any;
  const userID = user?.uid;

  if(user !== null){
    const res = httpsCallable(functions, 'ext-auth-chat-getStreamUserToken');
    res({})
    .then((result) => {
      const data: any = result.data;
      authToken = data
      if (user.uid !== undefined){
        const apiKey = "nypvarqgsd9a";
        const client = StreamChat.getInstance(apiKey, {
          timeout: 6000,
        });    
        console.log(authToken)
        console.log(userID)
        client.connectUser(
          {
            id: userID,
            name: user.email,
          },
          authToken
        );
        setClient(client)
      }
    })
  }

  return (
    <>
    <div>{message}</div>
      {client === undefined ? 
        null
        :
      <div className="supportChat">
        <Chat client={client}>
        <Channel channel={client.channel('messaging', {
            members: ['1hJFZfFU4ehhT8cshc8jimfUOX13', 'Qev5C2hXJNeJ56VJtKAjKgzoAKx1'],
          })}>
           <Window>
          <MessageList />
          <MessageInput/>
          </Window> 
        </Channel>
      </Chat>
      </div>
      }
    </>
  )
}

export default ChatView