import React from 'react'

function Email(props : any) {
    const {
        sender,
        name,
        body,
        id,
        date,
        //images, // This should be an array of image urls. // Do later
      } = props;
  
      return (
        <nav>
          <div className="emailSender _body">{sender}</div>
          <div className="emailName _body">{name}</div>
          <div className="emailBody _body">{body}</div>
          <div className="emailId _body">Ticket #{id}</div>
          <div className="emailDate _body">{date}</div>
        </nav>
    );
}

export default Email

