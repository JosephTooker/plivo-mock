
import { DefaultGenerics, StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { ChannelContainer, ChannelListContainer } from "../components";
import { useState, useEffect } from "react";
import 'stream-chat-react/dist/css/index.css'
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase-config"
import { UserAuth } from '../context/AuthContext'
import LoadingSpinner from "../components/LoadingSpinner";
import { useRouter } from 'next/router'


// const cookies = new Cookies();

export default function dashboard() {
  const {user} = UserAuth()
  const [ createType, setCreateType ] = useState('')
  const [ isCreating, setIsCreating ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)
  const [client, setClient] = useState()
  const router = useRouter()

  useEffect(()=>{
    if(user === null){
      router.push('/login')
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

// const authToken = cookies.get("token");
  return (
    <>
    {client === undefined ? 
    <LoadingSpinner/>
    :
    <div className="app__wrapper">
      <Chat client={client} theme="team light">
        <ChannelListContainer
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
        />

        <ChannelContainer 
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          createType={createType}
        />
      </Chat>
    </div>
    }
    </>
  )
}
