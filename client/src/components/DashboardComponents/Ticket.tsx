import React from 'react'

function Ticket(props : any) {
    const {
        current,
        name,
        message,
        id,
        createdAt,
        onClick
      } = props;
  
    return (
        <button className={current || "dashTicketsSelected"} onClick={onClick}>
            <div className={"ticketName _h2 " + (current || "selected")}>{name}</div>
            <div className="ticketMessage _body">{message}</div>
            <div className="ticketId _body">{id ?? "Created On:"}</div>
            <div className="ticketDate _body">{createdAt}</div>
        </button>
    );
}

export default Ticket;
