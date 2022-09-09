import React from 'react'
import { useState, useEffect } from "react";
import { UserAuth } from '../context/AuthContext'
import { Chat, Window, Channel, MessageList, MessageInput} from "stream-chat-react";
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config"
import { StreamChat } from "stream-chat";
import 'stream-chat-react/dist/css/index.css'
import { doc, setDoc, serverTimestamp, onSnapshot, deleteDoc } from "firebase/firestore"; 
import {db} from '../firebase-config'



function ChatView() {
  const {user} = UserAuth()
  const [message, setMessage] = useState('')
  const [client, setClient] = useState<any>()
  const [adminID, setAdminID] = useState("")
  const [loading, setLoading] = useState(false)
  const [connected, setConnected] = useState(false)
  
  useEffect(()=>{
    if(user === null){
      setMessage("Please log in to chat with an agent.")
    }
    else{
      setMessage("Would you like to chat with an agent?")    
    }
  }, [user])

  async function handleChatRequest(e) {
    e.preventDefault()

    if(window.confirm("Would you like to chat with support?")){
      try {
       const docRef : any = await setDoc(doc(db, 'chatQueue', user?.uid),{
          userID: user?.uid,
          createdAt: serverTimestamp() ,
          resolved: false,
          adminID: "",
          isAssigned: false
        })
        console.log("Doc written!");
        setLoading(true);
      } catch (e) {
        console.log("setDoc failed: ", e);
      }
    }
  }

  const unsub = onSnapshot(doc(db, "chatQueue", user?.uid), (doc) => {
    console.log("Current data: ", doc.data());
    if(doc.data()?.isAssigned === true && doc.data()?.adminID !== ""){
      console.log(true);
      console.log(doc.data()?.adminID);
      setLoading(false)
      setConnected(true)
      setAdminID(doc.data()?.adminID)
      let authToken: any;
      const userID = user?.uid;
        const res = httpsCallable(functions, 'ext-auth-chat-getStreamUserToken');
        res({})
        .then(async (result) => {
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
  })

  return (
    <>
    <div className='bg-white h-full'>
    <div className='chatRequestContainer'>
    <div className="str-chat__avatar str-chat__avatar--circle" data-testid="avatar" title="test@test.com">
      <div className="str-chat__avatar-fallback" data-testid="avatar-fallback">CC</div>
      </div>
      <div className='supportModalChatRequest'><p>{message}</p></div>
    </div>
      {user && loading === false && connected === false &&
      <>
      <h1 className='justify-center text-center m-1 font-bold'>Possible Actions</h1>
      <div className='flex w-full justify-center'> 
        <button className='bg-[#ecebeb] p-1 rounded-xl hover:bg-[#9DA09F]' onClick={handleChatRequest}> Request to chat with support ?</button>
      </div>
    </>
    }
      {loading && 
          <div role="status" className="flex flex-col text-center items-center justify-center w-full pt-5 ">
            <h5 className='p-5'>Connecting to an agent. . .</h5>
          <svg aria-hidden="true" className="mr-2 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>   }

        {client === undefined ? 
          null
          :
        <div className="supportChat">
          <Chat client={client}>
          <Channel channel={client.channel('messaging', "support-"+user?.uid , {
              name: 'Welcome to customer support.',
              members: [user.uid, adminID],
            })}>
            <Window>
            <MessageList />
            <MessageInput/>
            </Window> 
          </Channel>
        </Chat>
        </div>
        }

    </div>
    </>
  )
}

export default ChatView