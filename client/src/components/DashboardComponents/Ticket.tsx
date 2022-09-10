import React from 'react'

function Ticket(props : any) {
    const {
        active,
        name,
        message,
        id,
        createdAt,
        onClick
      } = props;
  
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
