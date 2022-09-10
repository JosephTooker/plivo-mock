import React from 'react'
import { doc, getDocs } from "firebase/firestore";
import { collection } from 'firebase/firestore';
import { db } from '../../firebase-config';




 function Ticket(props : any) {
    const {
        active,
        name,
        message,
        id,
        createdAt,
        onClick
      } = props;

    //   const docRef = collection(db, "emailQueue", name, "emails");
    //   const docSnaps = getDocs(docRef); 
    //   console.log(docSnaps[0])

      
        async function cal(){

            const querySnapshot = await getDocs(collection(db, "emailQueue", name, "emails"));
            console.log(querySnapshot)
            querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            });
        }
        cal();


    return (
        <button onClick={onClick}>
            <span className={active ? "ticketActive" : "ticketInactive"} />
            <div className="ticketName _h2">{name}</div>
            <div className="ticketMessage _body">{message}</div>
            <div className="ticketId _body">{id ?? "Created On:"}</div>
            <div className="ticketDate _body">{createdAt}</div>
        </button>
    );
}

export default Ticket;
