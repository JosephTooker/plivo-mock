import React from 'react'
import Ticket from './Ticket';
import Email from './Email';

function EmailFlyout(props: any) {
    const {
    } = props;

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="29" height="24" viewBox="0 0 29 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M27 4.5C27 3.125 25.875 2 24.5 2H4.5C3.125 2 2 3.125 2 4.5M27 4.5V19.5C27 20.875 25.875 22 24.5 22H4.5C3.125 22 2 20.875 2 19.5V4.5M27 4.5L14.5 13.25L2 4.5" stroke="black" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">EMAIL: Customer Queue</div>
            <div className="dashFeatureSub1 _h2"><p>Assigned to you</p></div>
            <div className="dashFeatureSub2 _h2"><p>Unassigned</p></div>
            <span className="dashFeatureLine"/>
            <div className="dashFeatureBody _body">16 conversations</div>
            <div className="dashFeatureType _h2">Email</div>
            <div className="dashTickets">
              <Ticket active="1" name="Devon Lane" message="Hi, Is it possible to get a..." id="1321" date="Today 9:00am" />
              <Ticket name="Guy Hawkins" message="Hey, I have a question a..." id="1322" date="Today 9:09am" />
              <Ticket name="Albert Flores" message="Hi, I received the wrong ..." id="1323" date="Today 9:12am" />
              <Ticket active="1" name="Cameron Williamson" message="Hi, Is it possible to get a..." id="1389" date="Today 10:23am" />
              <Ticket active="1" name="Leslie Alexander" message="Hey, I have a question a..." id="1452" date="Today 11:18am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
            </div>
          </div>
    
          <div className="dashPanel">
            <div className="dashPanelBox">
              {/*<div className="dashPanelImage fill">
                <img src="/dashboard/profile.png" />
              </div>*/}
              <div className="dashSectionInfo">
                <div className="dashPanelName _h2">Dianne Russell</div>
                <div className="dashPanelActive _h2">Ticket active</div>
                <div className="dashPanelAddress _h2">2972 Westheimer Rd. Santa Ana, Illinois 85486</div>
                <div className="dashPanelEmail _h2">Email: dianne.russell@mail.com</div>
              </div>
              <div className="dashFlow">
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that?
                  <br>\n
                  \r\n
                  \n
                  Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
                <Email 
                  sender="customers@mail.com" 
                  name="customerservice"
                  body="Hi, I receved the wrong color shoes in my order and wanted to get them exchanged. How would I do that? Thanks! Dianne"
                  id="1321"
                  date="Today 9:00am"
                />
              </div>
            </div>
          </div>
        </div>
      );
}  

export default EmailFlyout

  
  
  