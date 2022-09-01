import type { NextPage } from "next";
import Head from "next/head";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import Cookies from "universal-cookie";
import { ChannelContainer, ChannelListContainer } from "../components";
import Link from "next/link";
import { useState } from "react";
import 'stream-chat-react/dist/css/index.css'
import { getFunctions, httpsCallable } from "firebase/functions";

// const cookies = new Cookies();

export default function dashboard() {
  const [ createType, setCreateType ] = useState('')
  const [ isCreating, setIsCreating ] = useState(false)
  const [ isEditing, setIsEditing ] = useState(false)


  const functions = getFunctions();
  const res = httpsCallable(functions, 'ext-auth-chat-getStreamUserToken');
  res({})
  .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    const sanitizedMessage = data.text;
    console.log(sanitizedMessage)
  }).catch((error) => {
    // Getting the Error details.
    const code = error.code;
    const message = error.message;
    const details = error.details;
    // ...
  });
  // const apiKey = "nypvarqgsd9a";

// const client = StreamChat.getInstance(apiKey);

// const authToken = cookies.get("token");

// if (authToken) {
//   client.connectUser(
//     {
//       id: cookies.get("userId"),
//       name: cookies.get("email"),
//       firstName: cookies.get("firstName"),
//       lastName: cookies.get("lastName"),
//       userType: cookies.get("userTypre"),
//       hashedPassword: cookies.get("hashedPassword"),
//     },
//     authToken
//   );
// }


  return (
    <div className="app__wrapper">
      {/* <Chat client={client} theme="team light">
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
      </Chat> */}
    </div>
  );
}
