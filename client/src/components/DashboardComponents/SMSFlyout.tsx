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
    const [sid, setSid] = useState("")
    const [time, setTime] = useState("")

    const assign = () => setAssigned(true);
    const unassign = () => setAssigned(false);


    const qActive = query(collection(db, "text-form"))

    const bodyRef: any = useRef<HTMLInputElement>()

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
      setSid(ticket.sid)
      setTime(ticket.time?.toDate().toLocaleDateString('en-US'))
    }

    const handleSubmit = async (e: any) => {
      e.preventDefault()
if (bodyRef.current != null){      setBody(bodyRef.current.value)

  const URL = "http://localhost:5000/text"

  await axios.post(`${URL}/text`, {
    body: bodyRef?.current?.value,
    number: number
  })}

      
    }

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 17.6667C26 18.4034 25.7073 19.1099 25.1864 19.6309C24.6655 20.1518 23.9589 20.4444 23.2222 20.4444H6.55556L1 26V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H23.2222C23.9589 1 24.6655 1.29266 25.1864 1.81359C25.7073 2.33453 26 3.04107 26 3.77778V17.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">SMS: Customer Queue</div>
            {assigned ?
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
                    name={t.full_name || t.phone_number} 
                    message={t.message} 
                    id={"Ticket #" + (t.sid?.slice(2, 8) || "unknown")}
                    createdAt={t.time?.toDate().toLocaleDateString('en-US') || "(no date)"}
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
                      name={t.full_name || number}
                      message={t.userID} 
                      createdAt={new Timestamp(t.createdAt?.seconds, t.createdAt?.nanoseconds).toDate().toLocaleDateString('en-US')} 
                      onClick={ () => alert("assignTicket(t)") }
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
                  <img src={"https://picsum.photos/seed/" + name + "/300" }/> {/* Generates a new image using the name as a seed */}
                </div>
                <div className="dashInfo">
                  <div className="dashInfoName _h2">{name || number}</div>
                  <div className="dashInfo1 _h2">
                    <img className="dashInfoIcon" src='/dashboard/map-pin.svg' alt='map-pin'/>
                    {location || "(Unknown location)"}
                  </div>
                  <div className="dashInfo2 _h2">
                    <img className="dashInfoIcon" src='/dashboard/phone-call.svg' alt='phone-call'/>
                    Phone Number: {number}
                  </div>
                </div>
              </div>

              {/* Content Area */}
              <div className="dashContent">

                {/* Header Area */}
                <div className="dashContentHeader">
                  <body className='_body'>Conversation with - {name || number}</body>
                  <span>
                    <p className='_body'>Ticket #{(sid?.slice(2, 8) || "unknown")}</p>
                    <p className='_body'>{time ?? "(no date)"}</p>
                  </span>
                </div>

                {/* Main Area */}
                <div className="dashContentMain">
                  <div className="dashContentFlow">
                    <nav>
                      <div className="smsIcon">
                        <img src={"https://picsum.photos/seed/" + name + "/300" }/> {/* Generates a new image using the name as a seed */}
                      </div>
                      <span>
                        <div className='smsName _h2'>{name || number}</div>
                        <div className='smsText _body'>{message}</div>
                      </span>
                      <div className='smsTime _body'>Less than a minute ago</div>
                    </nav>
                  </div>
                </div>
                  
                {/* Text Area */}
                <textarea
                  id="message"
                  className="dashContentTextArea _body"
                  placeholder="Your message..."
                  ref={bodyRef}
                />

                {/* Footer Area */}
                <div className="dashContentFooter">
                  <button className='dashContentSendButton _body' onClick={handleSubmit}>
                    <svg width="18" height="16" viewBox="0 0 32 27"  xmlns="http://www.w3.org/2000/svg" stroke="#817589" strokeWidth={3} stroke-linecap="round" stroke-linejoin="round" fill="white">
                      <path d="M30.75 4.875C30.75 3.29375 29.4562 2 27.875 2H4.875C3.29375 2 2 3.29375 2 4.875M30.75 4.875V22.125C30.75 23.7062 29.4562 25 27.875 25H4.875C3.29375 25 2 23.7062 2 22.125V4.875M30.75 4.875L16.375 14.9375L2 4.875" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M30.75 4.875L16.375 14.9375L2 4.875" />
                    </svg>
                    Send
                  </button>
                </div>

              </div>
              </> || <div className='dashEmpty'><img src='/dashboard/logo-full.svg' alt='map-pin'/>Select a ticket from the left.</div>}
            </div> {/*End Border Box*/}
          </div> {/*End dashRight*/}
        </div>
      );  
}

export default SMSFlyout
