import React from 'react'

function Ticket(props : any) {
    const {
        resolve,
        current,   /* the id of the current ticket */
        onClick,   /* sets the new current*/
        name,      /* the name of the ticket in bold*/
        message,
        id,
        createdAt,
      } = props;
  
    return (
        <button className={current || "dashTicketsSelected"} onClick={onClick}>
            <div className={"ticketName _h2 " + (current ? "selected" : "")}>{name}</div>
            <div className="ticketMessage _body">{message}</div>
            <div className="ticketId _body">{id ?? "Created On:"}</div>
            <div className="ticketDate _body">{createdAt}</div>
        </button>
    );
}

export default Ticket;