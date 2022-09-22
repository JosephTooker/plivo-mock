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
    console.log(clickedEmail);
  }


  async function sendEmail() { 
    const res = await fetch("/api/sendgrid", {
      body: JSON.stringify({
        email: clickedEmail,
        fullname: "fullname",
        subject: "BEST-T's support",
        message: commentText,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    let x = Math.random() * 10;
    await setDoc(doc(db, "emailQueue", clickedEmail, "emails", "support" + x), {
      text: commentText,
      from: "support",
    });
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
                <button className="dashFeatureSub1 _h2" onClick={assign}><p>Assigned to you ◂</p></button>
                <button className="dashFeatureSub2 _h2 dashUnfocused" onClick={unassign}><p>Unassigned</p></button>
                <span className="dashFeatureLine" />
                <span className="dashFeatureLine2" />
                <div className="dashFeatureBody _body">{emails.length === 1 ? "1 conversation" : emails.length + " conversations"} </div>
                <div className="dashFeatureType _h2">Emails</div>
                <div className="dashTickets">


                { emails.map(({email}) => (<>
                
                  <button className={"dashTicketsSelected"} onClick={() => displayEmails(email)}>
                  {email}
                  </button></>



                  // <Ticket active="1" name={email} message="Message..." id="1323" date="Today 9:12am" />
 

                  
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
    
          <div className="dashRight">
            <div className="dashRightBox">

              <div className="dashRightHeader">
                <div className="dashRightImage">
                  <img src={clickedEmail !== "test" ? "https://picsum.photos/seed/" + clickedEmail + "/300" : ""}/> {/* Generates a new image using the userID as a seed */}
                </div>
                <div className="dashInfo">
                  {/* <div className="dashInfoName _h2">{clickedEmail}</div> */}
                  <div className="dashInfoName _h2">{clickedEmail !== "test" ?  `Email: ${clickedEmail}` : null}</div>
                </div>
              </div>

              <div className="dashFlow">
              { emailss.map((emails) => (<>
          {console.log(emails)}
          <div className='container p-5 mb-4'><hr></hr>
          <b>{emails.data["Subject"]}</b>
          <hr></hr>
         {emails.data["text"]}
         <hr></hr></div>
              </>                       
              ))}

              </div>
                       {/* Content Area */}
                       <div className="dashContent">
                <div className="dashContentHeader"></div>
         
                <textarea
                  id="message" 
        
                  className="dashContentTextArea _body"
                  placeholder="Your message..."
                  onChange={e => setCommentText(e.target.value)}
                />
                <div className="dashContentFooter">
                  <button onClick={sendEmail} className='dashContentSendButton' >Send Email<AiOutlineSend/></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}  

export default EmailFlyout

  
  
