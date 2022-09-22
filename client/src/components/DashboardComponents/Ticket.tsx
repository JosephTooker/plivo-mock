import React from 'react'

function Ticket(props : any) {
    const {
        resolve,
        email,
        active,
        current,   /* the id of the current ticket */
        onClick,   /* sets the new current*/
        name,      /* the name of the ticket in bold*/
        message,
        id,
        createdAt,
      } = props;
  
    return (
        <button className={current || "dashTicketsSelected"} onClick={onClick}>
            <div className={"ticketName _h2 " + (current /*hacky*/ || "selected")}>{name}</div>
            <div className="ticketMessage _body">{message}</div>
            <div className="ticketId _body">{id ?? "Created On:"}</div>
            <div className="ticketDate _body">{createdAt}</div>
            <div className={" w-full ml-4 text-start " + (current || " font-bold")}> {email}</div>
        </button>
    );
}

export default Ticket;