import React, { useEffect, useState, useRef } from 'react'
import Ticket from './Ticket';
import { query, collection, doc, onSnapshot, Timestamp } from 'firebase/firestore' 
import {db} from '../../firebase-config'
import { AiOutlineSend } from 'react-icons/ai'
import axios from 'axios';

function SMSFlyout(props: any) {
    const {


    } = props;

    const [assigned, setAssigned] = useState(true);

    const [ticket, setTicket] = useState(null)
    const [tickets, setTickets] = useState<any[]>([])
    const [unassignedTickets, setUnassignedTickets] = useState([]);

    const [activeTicket, setActiveTicket] = useState(tickets[0]) 
    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [message, setMessage] = useState("")
    const [body, setBody] = useState("")
    const [location, setLocation] = useState("")


    const assign = () => setAssigned(true);
    const unassign = () => setAssigned(false);


    const qActive = query(collection(db, "text-form"))

    const bodyRef = useRef<HTMLInputElement>(null)

    useEffect(()=>{
      const unsubscribe = onSnapshot(qActive, (querySnapshot) => {
        let data:any= [];
        querySnapshot.forEach((doc) => {
          if(!data.includes(doc.data())){
            data.push(doc.data());
          }
        });
        setTickets(data);  
      });
      return () => unsubscribe()
    }, []);

    function handleTicket(ticket){
      setTicket(ticket);
      setName(ticket.full_name)
      setNumber(ticket.phone_number)
      setMessage(ticket.message)
      setLocation(ticket.location)
    }

    const handleSubmit = async (e) => {
      e.preventDefault()

      setBody(bodyRef.current.value)

      const URL = "http://localhost:5000/text"

      await axios.post(`${URL}/text`, {
        body: bodyRef.current.value,
        number: number
      })
      
    }

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 17.6667C26 18.4034 25.7073 19.1099 25.1864 19.6309C24.6655 20.1518 23.9589 20.4444 23.2222 20.4444H6.55556L1 26V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H23.2222C23.9589 1 24.6655 1.29266 25.1864 1.81359C25.7073 2.33453 26 3.04107 26 3.77778V17.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">SMS: Customer Queue</div>
            { assigned ?
              <>
                <div className='dashFeatureButton1' onClick={assign}> 
                  <button className="_h2">Assigned to you</button>
                  <span className='_body'><p>{tickets.length}</p></span>
                </div>

                <div className='dashFeatureButton2' onClick={unassign}> 
                  <button className="_h2 dashUnfocused">Unassigned</button>
                  <span className='_body dashUnfocused2'><p>{unassignedTickets.length}</p></span>
                </div>

                <span className="dashFeatureLine2" />
                <span className="dashFeatureLine" />
                <div className="dashFeatureBody _body">{tickets.length + unassignedTickets.length === 1 ? "1 conversation" : tickets.length + unassignedTickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Chat</div>
                <div className="dashTickets">
                {tickets.map((t:any) => (
                  <Ticket
                    current={t !== ticket} 
                    active={t.resolved} 
                    name={t.full_name} 
                    message={t.message} 
                    onClick={() => handleTicket(t)} 
                  />
                ))}
                </div>
              </>
            : 
              <>
                <div className='dashFeatureButton1' onClick={assign}> 
                  <button className="_h2 dashUnfocused">Assigned to you</button>
                  <span className='_body dashUnfocused2'><p>{tickets.length}</p></span>
                </div>

                <div className='dashFeatureButton2' onClick={unassign}> 
                  <button className="_h2">Unassigned</button>
                  <span className='_body'><p>{unassignedTickets.length}</p></span>
                </div>

                <span className="dashFeatureLine3" />
                <span className="dashFeatureLine" />
                <div className="dashFeatureBody _body">{tickets.length + unassignedTickets.length === 1 ? "1 conversation" : tickets.length + unassignedTickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Chat</div>
                <div className="dashTickets">
                  {unassignedTickets.map((t : any) => (
                    <Ticket 
                      current={t !== ticket} 
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

            {/*Border Box*/}
            <div className="dashRightBox">

              {/*Info Card Header + Profile Image */}
              {ticket && <>

              <div className="dashRightHeader">
                <div className="dashRightImage">
                  <img src={"https://picsum.photos/seed/" + ticket?.userID + "/300" }/> {/* Generates a new image using the userID as a seed */}
                </div>
                <div className="dashInfo">
                  <div className="dashInfoName _h2">{name}</div>
                  <div className="dashInfoAddress _h2"><img className="dashInfoIcon" src='/dashboard/map-pin.svg' alt='map-pin'/>{location}</div>
                  <div className="dashInfoEmail _h2"><img className="dashInfoIcon" src='/dashboard/phone-call.svg' alt='phone-call'/>Number: {number}</div>
                </div>
              </div>

              {/* Content Area */}
              <div className="dashContent">
                <div className="dashContentHeader"></div>
                <div className="dashContentFlow _body">{message}</div>
                <textarea
                  id="message"
                  class="dashContentTextArea _body"
                  placeholder="Your message..."
                  ref={bodyRef}
                />
                <div className="dashContentFooter">
                  <button className='dashContentSendButton' onClick={handleSubmit}>
                    <svg width="18" height="16" viewBox="0 0 32 27"  xmlns="http://www.w3.org/2000/svg" stroke="#817589" strokeWidth={3} stroke-linecap="round" stroke-linejoin="round" fill="white">
                      <path d="M30.75 4.875C30.75 3.29375 29.4562 2 27.875 2H4.875C3.29375 2 2 3.29375 2 4.875M30.75 4.875V22.125C30.75 23.7062 29.4562 25 27.875 25H4.875C3.29375 25 2 23.7062 2 22.125V4.875M30.75 4.875L16.375 14.9375L2 4.875" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M30.75 4.875L16.375 14.9375L2 4.875" />
                    </svg>
                    Send
                  </button>
                </div>
              </div>

              </>}
            </div> {/*End Border Box*/}
          </div> {/*End dashRight*/}
        </div>
      );  
}

export default SMSFlyout
