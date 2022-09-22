import React, {useState, useEffect} from 'react'
import Ticket from './Ticket';
import { Chat, Window, Channel, MessageList, MessageInput} from "stream-chat-react";
import { WindowsFilled } from '@ant-design/icons';
import { collection, query, where, onSnapshot, Timestamp, runTransaction, doc } from "firebase/firestore";
import {db} from '../../firebase-config'

function ChatFlyout(props: any) {
    const {
      user,
      client
    } = props;

    const [assigned, setAssigned] = useState(true);
    const [ticket, setTicket]:any = useState(null);
    const [channel, setChannel]:any = useState();
    const [tickets, setTickets] = useState([])
    const [unassignedTickets, setUnassignedTickets] = useState([]);

    const assign = () => setAssigned(true);
    const unassign = () => setAssigned(false);
    const handleTicket = (ticket: any) => setTicket(ticket);

    useEffect(()=>{
      console.log("User loaded")
    }, [user]);

    useEffect(()=>{
      const q = query(collection(db, "chatQueue"), where("isAssigned", "==", false));

      const unsubscribe = onSnapshot(q, (querySnapshot:any) => {
        setUnassignedTickets(querySnapshot.docs.map(doc => doc.data()))
      });

      return () => unsubscribe()
    }, []);

    useEffect(()=>{
      const qActive = query(collection(db, "chatQueue"), where("isAssigned", "==", true), where("adminID", "==", user?.uid));

      const unsubscribe = onSnapshot(qActive, (querySnapshot:any) => {
        setTickets(querySnapshot.docs.map(doc => doc.data()))
      });

      return () => unsubscribe()
    }, []);

    useEffect(()=>{
      if (ticket !== null) {
        console.log(ticket.userID);
        setChannel(client.channel('messaging', "support-"+ticket.userID , {
          name: 'Welcome to customer support.',
          members: [user.uid, ticket.userID],
        }));
      }
    }, [ticket])

    async function assignTicket(ticket){
      if(window.confirm("Would you like to add this ticket")){
        console.log(ticket.userID)
        const chatRef = await doc(db, "chatQueue", ticket.userID);

        try {
          await runTransaction(db, async (transaction) => {
            const chatDoc:any = await transaction.get(chatRef);
            if (!chatDoc.exists()) {
              throw "Chat does not exist!";
            }

            if (chatDoc.isAssigned === true) {
              throw "Chat is already assigned!";
            }
        
            transaction.update(chatRef, 
              { 
                isAssigned: true,  
                adminID: user.uid,
              });
          });
          console.log("Transaction successfully committed!");
        } catch (e) {
          alert("Transaction failed: " + e);
        }

      }
    }

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H26C26.5523 0 27 0.447715 27 1V17.6667C27 17.9319 26.8946 18.1862 26.7071 18.3738L21.1516 23.9293C20.964 24.1169 20.7097 24.2222 20.4444 24.2222H13.9142L8.65155 29.4849C8.36555 29.7709 7.93544 29.8564 7.56176 29.7017C7.18809 29.5469 6.94444 29.1822 6.94444 28.7778V24.2222H1C0.447715 24.2222 0 23.7745 0 23.2222V1ZM2 2V22.2222H7.94444C8.49673 22.2222 8.94444 22.6699 8.94444 23.2222V26.3636L12.7929 22.5151C12.9804 22.3276 13.2348 22.2222 13.5 22.2222H20.0302L25 17.2525V2H2ZM12.1111 6.94445C12.6634 6.94445 13.1111 7.39216 13.1111 7.94445V13.5C13.1111 14.0523 12.6634 14.5 12.1111 14.5C11.5588 14.5 11.1111 14.0523 11.1111 13.5V7.94445C11.1111 7.39216 11.5588 6.94445 12.1111 6.94445ZM19.0556 6.94445C19.6078 6.94445 20.0556 7.39216 20.0556 7.94445V13.5C20.0556 14.0523 19.6078 14.5 19.0556 14.5C18.5033 14.5 18.0556 14.0523 18.0556 13.5V7.94445C18.0556 7.39216 18.5033 6.94445 19.0556 6.94445Z" fill="black"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">CHAT: Customer Queue</div>
            { assigned ?
              <>
                <button className="dashFeatureSub1 _h2" onClick={assign}><p>Assigned to you ◂</p></button>
                <button className="dashFeatureSub2 _h2 dashUnfocused" onClick={unassign}><p>Unassigned</p></button>
                <span className="dashFeatureLine2" />
                <span className="dashFeatureLine" />
                <div className="dashFeatureBody _body">{tickets.length === 1 ? "1 conversation" : tickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Chat</div>
                <div className="dashTickets">
                  {tickets.map((t : any) => (
                    <Ticket 
                      current={t !== ticket} 
                      name={t.name}
                      message={t.userID} 
                      createdAt={new Timestamp(t.createdAt?.seconds, t.createdAt?.nanoseconds).toDate().toLocaleDateString('en-US')} 
                      onClick={ () => handleTicket(t) } 
                    />
                  ))}
                </div>
              </>
            : 
              <>
                <button className="dashFeatureSub1 _h2 dashUnfocused" onClick={assign}><p>Assigned to you</p></button>
                <button className="dashFeatureSub2 _h2" onClick={unassign}><p>▸ Unassigned</p></button>
                <span className="dashFeatureLine" />
                <span className="dashFeatureLine3" />
                <div className="dashFeatureBody _body">{unassignedTickets.length === 1 ? "1 conversation" : unassignedTickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Chat</div>
                <div className="dashTickets">
                  {unassignedTickets.map((t : any) => (
                    <Ticket 
                      name={t.name}
                      message={t.userID} 
                      createdAt={new Timestamp(t.createdAt?.seconds, t.createdAt?.nanoseconds).toDate().toLocaleDateString('en-US')} 
                      onClick={ () => assignTicket(t) }
                    />
                  ))}
                </div>
              </>
            }
          </div>
    
          <div className="dashRight">
            <div className="dashRightBox">
            {ticket !== null ? <>
              <div className="dashRightHeader">
                <div className="dashRightImage">
                  <img src={"https://picsum.photos/seed/" + ticket?.userID + "/300"}/> {/* Generates a new image using the userID as a seed */}
                </div>
                <div className="dashInfo">
                  <div className="dashInfoName _h2">{ticket?.name}</div>
                  <div className="dashInfoAddress _h2">{"2972 Westheimer Rd. Santa Ana, Illinois 85486"}</div>
                  <div className="dashInfoEmail _h2">{"Email: dianne.russell@mail.com"} </div>
                </div>
              </div>

              {ticket === null ? null:
               <div className="dashboardChat">
                <Chat client={client}>
                  <Channel channel={channel}>
                    <Window>
                    <MessageList />
                    <MessageInput/>
                    </Window> 
                  </Channel>
                </Chat>
              </div>
              }
             </> : null}
            </div>
          </div>
        </div>
      );
}

export default ChatFlyout
