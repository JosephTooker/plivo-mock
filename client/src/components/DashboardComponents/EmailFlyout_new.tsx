import React, {useState, useEffect} from 'react'
import Ticket from './Ticket';
import Email from './Email';
import { collection, query, where, onSnapshot, Timestamp, runTransaction, doc } from "firebase/firestore";

function EmailFlyout(props: any) {
    const {
    } = props;

    const [assigned, setAssigned] = useState(true);
    const [ticket, setTicket]:any = useState(null);
    const [tickets, setTickets] = useState([]);
    const [unassignedTickets, setUnassignedTickets] = useState([]);

    const assign = () => setAssigned(true);
    const unassign = () => setAssigned(false);
    const handleTicket = (ticket: any) => setTicket(ticket);

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27 4.5C27 3.125 25.875 2 24.5 2H4.5C3.125 2 2 3.125 2 4.5M27 4.5V19.5C27 20.875 25.875 22 24.5 22H4.5C3.125 22 2 20.875 2 19.5V4.5M27 4.5L14.5 13.25L2 4.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">EMAIL: Customer Queue</div>
            { assigned ?
              <>
                <button className="dashFeatureSub1 _h2" onClick={assign}><p>Assigned to you ◂</p></button>
                <button className="dashFeatureSub2 _h2 dashUnfocused" onClick={unassign}><p>Unassigned</p></button>
                <span className="dashFeatureLine" />
                <div className="dashFeatureBody _body">{tickets.length === 1 ? "1 conversation" : tickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Emails</div>
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
                <div className="dashFeatureBody _body">{unassignedTickets.length === 1 ? "1 conversation" : unassignedTickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Emails</div>
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
    
          <div className="dashPanel">
            <div className="dashPanelBox">

              <div className="dashPanelHeader">
                <div className="dashPanelImage">
                  <img src={"https://picsum.photos/seed/" + ticket?.userID + "/300" }/> {/* Generates a new image using the userID as a seed */}
                </div>
                <div className="dashInfo">
                  <div className="dashInfoName _h2">{ticket?.name}</div>
                  <div className="dashInfoActive _h2">{ticket?.active == true ? "Ticket Active" : "Ticket Inactive"}</div>
                  <div className="dashInfoAddress _h2">2972 Westheimer Rd. Santa Ana, Illinois 85486</div>
                  <div className="dashInfoEmail _h2">Email: dianne.russell@mail.com</div>
                  <span className={"dashInfoDot " + (ticket?.active && "active")} />
                </div>
              </div>

              <div className="dashFlow">
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that?
                  <br>\n
                  \r\n
                  \n
                  Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
              </div>
            </div>
          </div>
        </div>
      );
}  

export default EmailFlyout

  
  
  