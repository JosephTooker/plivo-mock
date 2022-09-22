import React, { useEffect, useState } from 'react'
import Ticket from './Ticket';
import Email from './Email';
import { db } from '../../firebase-config';
import { collection, query, where, onSnapshot, Timestamp, runTransaction, doc, getDoc, setDoc } from "firebase/firestore";
import { AiOutlineSend } from 'react-icons/ai';



const emailCollection = collection(db, "emailQueue")



function EmailFlyout(props: any) {
    const {
    } = props;
    const [commentText,setCommentText] = useState("")
    const [assigned, setAssigned] = useState(true);
    const [ticket, setTicket]:any = useState(null);
    const [tickets, setTickets] = useState([]);
    const [unassignedTickets, setUnassignedTickets] = useState([]);

    const assign = () => setAssigned(true);
    const unassign = () => setAssigned(false);
    const handleTicket = (ticket: any) => setTicket(ticket);

    const [emails, setEmails] = useState([]);
    const [emailss, setEmailss] = useState<any[]>([]);
    const [clickedEmail, setClikedEmail] = useState("test");
      
    useEffect(() => {
        onSnapshot(emailCollection, (snapshot: any) => {
            setEmails(snapshot.docs.map(doc => ({
                email: doc.id,
                data: doc.data()
            })))
        })
    }, [])


    useEffect(() => {
      const emailCollections = collection(db, "emailQueue", clickedEmail, "emails")
      onSnapshot(emailCollections, (snapshot: any) => {
          setEmailss(snapshot.docs.map(doc => ({
              email: doc.id,
              data: doc.data()
          })))
      })
      // console.log(emailss)
      { emailss.map(({emails}) => (<>
        {emails}
        </>
          
        ))}
  }, [clickedEmail])



  function displayEmails(email) {
    setClikedEmail(email)
  }


  async function sendEmail() {
    
    await setDoc(doc(db, "emailQueue", clickedEmail, "emails",(Math.random() + 1).toString(36).substring(7)), {
      text: commentText,
      "Email Address": "Customer Support Center",
      Subject: "Link Support Team"
    });

    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: clickedEmail,
        fullname: "fullname",
        subject: "BEST-T's support",
        msg: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    let x = Math.random() * 10;



  }

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27 4.5C27 3.125 25.875 2 24.5 2H4.5C3.125 2 2 3.125 2 4.5M27 4.5V19.5C27 20.875 25.875 22 24.5 22H4.5C3.125 22 2 20.875 2 19.5V4.5M27 4.5L14.5 13.25L2 4.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">EMAIL: Customer Queue</div>
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
                
                <span className="dashFeatureLine" />
                <span className="dashFeatureLine2" />
                <div className="dashFeatureBody _body">{emails.length === 1 ? "1 conversation" : emails.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Emails</div>
                <div className="dashTickets">

                { emails.map(({email}) => (<>
                  <Ticket 
                      current={email !== clickedEmail} 
                      name={email.replace(/^(.*?)<.*$/, "$1")}
                      message={email.replace(/(^.*<)/, "").replace('>','')}
                      onClick={ () => displayEmails(email) } 
                    />
                  </>
                  // <Ticket active="1" name={email} message="Message..." id="1323" date="Today 9:12am" />

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

                <span className="dashFeatureLine" />
                <span className="dashFeatureLine3" />
                <div className="dashFeatureBody _body">{unassignedTickets.length === 1 ? "1 conversation" : unassignedTickets.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Emails</div>
                <div className="dashTickets">
                  {unassignedTickets.map((t : any) => (
                    <Ticket 
                      name={t.name}
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
              {clickedEmail !== "test" && <>

              <div className="dashRightHeader">
                <div className="dashRightImage">
                  <img src={clickedEmail !== "test" ? "https://picsum.photos/seed/" + clickedEmail + "/300" : ""}/> {/* Generates a new image using the userID as a seed */}
                </div>
                <div className="dashInfo">
                  <div className="dashInfoName _h2">{clickedEmail.replace(/^(.*?)<.*$/, "$1")}</div>
                  <div className="dashInfo1 _h2">
                    <img className="dashInfoIcon" src='/dashboard/map-pin.svg' alt='map-pin'/>
                    Location: (Unknown location)
                  </div>
                  <div className="dashInfo2 _h2">
                    <img className="dashInfoIcon" src='/dashboard/mail.svg' alt='phone-call'/>
                    Email: {clickedEmail.replace(/(^.*<)/, "").replace('>','')}
                  </div>
                </div>
              </div>

              <div className="dashFlow">
                {emailss.map((emails) => (
                  <>
                    {console.log(emails)}
                    <div className='container p-5'>
                      <b>{emails.data["Subject"]}</b>
                      <p className=' text-sm text-gray-500'> {emails.data["Email Address"]}</p>
                      <p className='mt-5 mb-5'>{emails.data["text"]}</p>
                      <hr></hr>
                    </div>
                  </>                       
                ))}
              </div>

              {/* Content Area */}
              <div className="dashContent">
                <div className="dashContentHeader"></div>
                <textarea
                  id="message" 
                  className="dashContentEmail _body"
                  placeholder="Your message..."
                  onChange={e => setCommentText(e.target.value)}
                />
                <div className="dashContentEmailFooter">
                  <button onClick={sendEmail} className='dashContentSendButton' >           
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

export default EmailFlyout

  
  
