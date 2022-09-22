import React from 'react'

function Ticket(props : any) {
    const {
        resolve,
        email,
        active,
        current,
        name,
        message,
        id,
        createdAt,
        onClick,
      } = props;
  
    return (
        <button className={current || "dashTicketsSelected"} onClick={onClick}>
            <div className={"ticketName _h2 " + (current || "selected")}>{name}</div>
            <div className="ticketMessage _body">{message}</div>
            <div className="ticketId _body">{createdAt ? "Created On:" : null}</div>
            <div className="ticketDate _body">{createdAt}</div>
            <div className={" w-full ml-4 text-start " + (current || " font-bold")}> {email}</div>
        </button>
    );
}

export default Ticket;