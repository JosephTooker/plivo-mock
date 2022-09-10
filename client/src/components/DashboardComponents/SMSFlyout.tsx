import React from 'react'
import Ticket from './Ticket';

function SMSFlyout(props: any) {
    const {
    } = props;

    return (
        <div className="dashFlyout">
          <div className="dashFeature">
            <svg className="dashFeatureIcon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M26 17.6667C26 18.4034 25.7073 19.1099 25.1864 19.6309C24.6655 20.1518 23.9589 20.4444 23.2222 20.4444H6.55556L1 26V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H23.2222C23.9589 1 24.6655 1.29266 25.1864 1.81359C25.7073 2.33453 26 3.04107 26 3.77778V17.6667Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
    
            <div className="dashFeatureHeader _h1">SMS: Customer Queue</div>
            <div className="dashFeatureSub1 _h2"><p>Assigned to you</p></div>
            <div className="dashFeatureSub2 _h2"><p>Unassigned</p></div>
            <span className="dashFeatureLine"/>
            <div className="dashFeatureBody _body">16 conversations</div>
            <div className="dashFeatureType _h2">SMS</div>
            <div className="dashTickets">
              <Ticket active="1" name="Albert Flores" message="Hi, I received the wrong ..." id="1323" date="Today 9:12am" />
              <Ticket active="1" name="Cameron Williamson" message="Hi, Is it possible to get a..." id="1389" date="Today 10:23am" />
              <Ticket active="1" name="Devon Lane" message="Hi, Is it possible to get a..." id="1321" date="Today 9:00am" />
              <Ticket name="Guy Hawkins" message="Hey, I have a question a..." id="1322" date="Today 9:09am" />
              <Ticket name="Leslie Alexander" message="Hey, I have a question a..." id="1452" date="Today 11:18am" />
              <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
            </div>
          </div>
    
          <div className="dashPanel">
            <div className="dashPanelBox">
              {/*<div className="dashPanelImage fill">
                <img src="/dashboard/profile.png" />
              </div>*/}
              <div className="dashInfo">
                <div className="dashInfoName _h2">Dianne Russell</div>
                <div className="dashInfoActive _h2">Ticket active</div>
                <div className="dashInfoAddress _h2">2972 Westheimer Rd. Santa Ana, Illinois 85486</div>
                <div className="dashInfoEmail _h2">Email: dianne.russell@mail.com</div>
              </div>
              <div className="dashSection1">
              </div>
              <div className="dashSection2">
              </div>
            </div>
          </div>
        </div>
      );  
}

export default SMSFlyout
