import React from 'react'

function Ticket(props : any) {
    const {
        active,
        name,
        message,
        id,
        date,
        onClick
      } = props;
  
    return (
        <button onClick={onClick}>
            <span className={active ? "ticketActive" : "ticketInactive"} />
            <div className="ticketName _h2">{name}</div>
            <div className="ticketMessage _body">{message}</div>
            <div className="ticketId _body">Ticket #{id}</div>
            <div className="ticketDate _body">{date}</div>
        </button>
    );
}

export default Ticket
