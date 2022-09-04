import React from "react";
import type { NextPage } from "next";

// Sidebar component - The sidebar shows the links on the left side of the screen.
const Sidebar = (props: any) => {
  const {
    setPanel,
  } = props;

  return (
    <div className="dashSidebar">

      <img className="dashSidebarLogo" src='/dashboard/logo.svg' alt='logo'/>

      <div className="dashSidebarNavContainer">
        <nav onClick={() => setPanel("chat")}>
          <svg className="dashSidebarCardIcon" width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2V22.2222H7.94444C8.49673 22.2222 8.94444 22.6699 8.94444 23.2222V26.3636L12.7929 22.5151C12.9804 22.3276 13.2348 22.2222 13.5 22.2222H20.0302L25 17.2525V2H2ZM13.1111 7.94445C13.1111 7.39216 12.6634 6.94445 12.1111 6.94445C11.5588 6.94445 11.1111 7.39216 11.1111 7.94445V13.5C11.1111 14.0523 11.5588 14.5 12.1111 14.5C12.6634 14.5 13.1111 14.0523 13.1111 13.5V7.94445ZM20.0556 7.94445C20.0556 7.39216 19.6078 6.94445 19.0556 6.94445C18.5033 6.94445 18.0556 7.39216 18.0556 7.94445V13.5C18.0556 14.0523 18.5033 14.5 19.0556 14.5C19.6078 14.5 20.0556 14.0523 20.0556 13.5V7.94445Z" fill="#C0A297"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H26C26.5523 0 27 0.447715 27 1V17.6667C27 17.9319 26.8946 18.1862 26.7071 18.3738L21.1516 23.9293C20.964 24.1169 20.7097 24.2222 20.4444 24.2222H13.9142L8.65155 29.4849C8.36555 29.7709 7.93544 29.8564 7.56176 29.7017C7.18809 29.5469 6.94444 29.1822 6.94444 28.7778V24.2222H1C0.447715 24.2222 0 23.7745 0 23.2222V1ZM2 2V22.2222H7.94444C8.49673 22.2222 8.94444 22.6699 8.94444 23.2222V26.3636L12.7929 22.5151C12.9804 22.3276 13.2348 22.2222 13.5 22.2222H20.0302L25 17.2525V2H2Z" fill="#C0A297"/>
          </svg>
          <div className="dashSidebarCardText _h1">Chat</div>
        </nav>

        <nav onClick={() => setPanel("email")}>
          <svg className="dashSidebarCardIcon" width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.875 2H27.875C29.4562 2 30.75 3.29375 30.75 4.875V22.125C30.75 23.7062 29.4562 25 27.875 25H4.875C3.29375 25 2 23.7062 2 22.125V4.875C2 3.29375 3.29375 2 4.875 2Z" fill="#C0A297"/>
            <path d="M30.75 4.875L16.375 14.9375L2 4.875" fill="#C0A297"/>
            <path d="M30.75 4.875C30.75 3.29375 29.4562 2 27.875 2H4.875C3.29375 2 2 3.29375 2 4.875M30.75 4.875V22.125C30.75 23.7062 29.4562 25 27.875 25H4.875C3.29375 25 2 23.7062 2 22.125V4.875M30.75 4.875L16.375 14.9375L2 4.875" stroke="#6E5E61" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div className="dashSidebarCardText _h1">Emails</div>
        </nav>

        <nav onClick={() => setPanel("sms")}>
          <svg className="dashSidebarCardIcon" width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M26 17.6667C26 18.4034 25.7073 19.1099 25.1864 19.6309C24.6655 20.1518 23.9589 20.4444 23.2222 20.4444H6.55556L1 26V3.77778C1 3.04107 1.29266 2.33453 1.81359 1.81359C2.33453 1.29266 3.04107 1 3.77778 1H23.2222C23.9589 1 24.6655 1.29266 25.1864 1.81359C25.7073 2.33453 26 3.04107 26 3.77778V17.6667Z" fill="#C0A297" stroke="#C0A297" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <div className="dashSidebarCardText _h1">SMS</div>
        </nav>
      </div>
    </div>
  )
}

// Ticket Component - The small card that displays the ticket information.
const Ticket = (props : any) => {
  const {
    active,
    name,
    message,
    id,
    date,
  } = props;

  return (
      <nav>
        <span className={active ? "ticketActive" : "ticketInactive"} />
        <div className="ticketName _h2">{name}</div>
        <div className="ticketMessage _body">{message}</div>
        <div className="ticketId _body">Ticket #{id}</div>
        <div className="ticketDate _body">{date}</div>
      </nav>
  );
};

// Email Component - An email panel that can be nested inside the dashFlow div.
const Email = (props : any) => {
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
};

// Email Flyout - This is the panel that displays the email information.
const EmailFlyout = (props: any) => {
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
};

// SMS Flyout - This is the panel that displays the SMS information.
const SmsFlyout = (props: any) => {
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
          <div className="dashSectionInfo">
            <div className="dashPanelName _h2">Dianne Russell</div>
            <div className="dashPanelActive _h2">Ticket active</div>
            <div className="dashPanelAddress _h2">2972 Westheimer Rd. Santa Ana, Illinois 85486</div>
            <div className="dashPanelEmail _h2">Email: dianne.russell@mail.com</div>
          </div>
          <div className="dashSection1">
          </div>
          <div className="dashSection2">
          </div>
        </div>
      </div>
    </div>
  );
};

// Chat Flyout - This is the panel that displays the chat information.
const ChatFlyout = (props: any) => {
  const {
  } = props;

  return (
    <div className="dashFlyout">
      <div className="dashFeature">
        <svg className="dashFeatureIcon" width="27" height="30" viewBox="0 0 27 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 1C0 0.447715 0.447715 0 1 0H26C26.5523 0 27 0.447715 27 1V17.6667C27 17.9319 26.8946 18.1862 26.7071 18.3738L21.1516 23.9293C20.964 24.1169 20.7097 24.2222 20.4444 24.2222H13.9142L8.65155 29.4849C8.36555 29.7709 7.93544 29.8564 7.56176 29.7017C7.18809 29.5469 6.94444 29.1822 6.94444 28.7778V24.2222H1C0.447715 24.2222 0 23.7745 0 23.2222V1ZM2 2V22.2222H7.94444C8.49673 22.2222 8.94444 22.6699 8.94444 23.2222V26.3636L12.7929 22.5151C12.9804 22.3276 13.2348 22.2222 13.5 22.2222H20.0302L25 17.2525V2H2ZM12.1111 6.94445C12.6634 6.94445 13.1111 7.39216 13.1111 7.94445V13.5C13.1111 14.0523 12.6634 14.5 12.1111 14.5C11.5588 14.5 11.1111 14.0523 11.1111 13.5V7.94445C11.1111 7.39216 11.5588 6.94445 12.1111 6.94445ZM19.0556 6.94445C19.6078 6.94445 20.0556 7.39216 20.0556 7.94445V13.5C20.0556 14.0523 19.6078 14.5 19.0556 14.5C18.5033 14.5 18.0556 14.0523 18.0556 13.5V7.94445C18.0556 7.39216 18.5033 6.94445 19.0556 6.94445Z" fill="black"/>
        </svg>


        <div className="dashFeatureHeader _h1">CHAT: Customer Queue </div>
        <div className="dashFeatureSub1 _h2"><p>Assigned to you</p></div>
        <div className="dashFeatureSub2 _h2"><p>Unassigned</p></div>
        <span className="dashFeatureLine"/>
        <div className="dashFeatureBody _body">16 conversations</div>
        <div className="dashFeatureType _h2">Chat</div>
        <div className="dashTickets">
          <Ticket active="1" name="Albert Flores" message="Hi, I received the wrong ..." id="1323" date="Today 9:12am" />
          <Ticket name="Robert Fox" message="Hi, I received the wrong ...." id="1479" date="Today 12:03am" />
          <Ticket name="Cameron Williamson" message="Hi, Is it possible to get a..." id="1389" date="Today 10:23am" />
          <Ticket name="Guy Hawkins" message="Hey, I have a question a..." id="1322" date="Today 9:09am" />
          <Ticket name="Devon Lane" message="Hi, Is it possible to get a..." id="1321" date="Today 9:00am" />
          <Ticket name="Leslie Alexander" message="Hey, I have a question a..." id="1452" date="Today 11:18am" />
          <Ticket name="Leslie Alexander" message="Hey, I have a question a..." id="1452" date="Today 11:18am" />
          <Ticket name="Leslie Alexander" message="Hey, I have a question a..." id="1452" date="Today 11:18am" />
          <Ticket name="Leslie Alexander" message="Hey, I have a question a..." id="1452" date="Today 11:18am" />
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
          <div className="dashSection1">
          </div>
          <div className="dashSection2">
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Rendering Routine - Displays the correct HTML and handles panel switching.
const NewDash: NextPage = () => {

  const [panel, setPanel] = React.useState("email");

  return (
    <div className="home">
        <Sidebar setPanel={setPanel} />
  
        {panel === "email"
          ? <EmailFlyout />
          : panel === "sms"
          ? <SmsFlyout />
          : panel === "chat"
          ? <ChatFlyout />
          : null
        }
    </div>
  );
};

export default NewDash;