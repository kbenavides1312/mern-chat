import { useContext, useEffect, useRef, useState } from "react";
import Avatar from "./Avatar";
import Logo from "./Logo";
import {UserContext} from "./UserContext.jsx";
import {uniqBy} from "lodash";
import axios from "axios";

export default function Chat () {
  const [ws, setWs] = useState(null);
  const [onlinePeople,setOnlinePeople] = useState({});
  const [selectedUserId,setSelectedUserId] = useState (null);
  const [newMessageTex,setNewMessagetext] = useState ('')
  const [messages,setMessages] = useState([]);
  const {username,id} = useContext(UserContext);
  const divUnderMessages = useRef();
  useEffect( () => {
    const ws = new WebSocket('ws://localhost:4040');
    setWs(ws);
     connecToWs();
  }, []);
  function connecToWs() {
     const ws = new WebSocket('ws://localhost:4040');
    setWs(ws);
    ws.addEventListener('message', handleMessage);
    ws.addEventListener('clone', () => {
    setTimeout(() => {
      console.log('Disconnetec. Tryin to reconnect.')
      connecToWs();
     }, 1000);
   });
  }
  function showOnlinePeople(peopleArray) {
  const people = {};
  peopleArray.forEach(({userId,username}) => {
    people[userId] = username;
  });
 setOnlinePeople(people);
  }
  function handleMessage(ev){
    const messageData =JSON.parse(ev.data);
    console.log({ev,messageData});
    if ('online' in messageData){
      showOnlinePeople(messageData.online);
    } else if ('text' in messageData){
      console.log("text")
      setMessages(prev => ([...prev, {...messageData}]));
    }
  }
  function sendMessage(ev) {
   ev.preventDefault();
   console.long('sending');
   ws.send(JSON.stringify(  {
     recipient: selectedUserId,
     text: newMessageTex,

   }));
   setNewMessagetext('');
   setMessages(prev => ([...prev,{
    text: newMessageTex,
    sender: id,
    recipient: selectedUserId,
    _id: Date.now(),
  }]));
  }

  useEffect(() => {
   const div = divUnderMessages.current;
   if(div) {
    console.log("div", div)
     div.scrollIntoView({behavior:'smooth', block:'end'})
   }
  }, [messages]);

  useEffect(() => {
    if (selectedUserId) {
      console.log("selectedUserId", selectedUserId)
    axios.get('/messages/'+selectedUserId).then(res => {
    setMessages(res,data);
    });
  }
}, [selectedUserId]);

const onlinePeopleExclOurUser ={...onlinePeople}
delete onlinePeopleExclOurUser[id];

const messagesWithouDupes = uniqBy(messages, '_id');

  return(
    <div className="flex h-screen">
      <div className="bg-white w-1/3">
        <Logo />
        {Object.keys(onlinePeople).map(userId => (
          <div key={userId}onClick={() => setSelectedUserId(userId)}
          className={"border-b border-gray-100  flex items-center gap-2 cursor-pointer"+(userId === selectedUserId ? 'bg-blue-50' : '')}>
            {userId === selectedUserId && (
              <div className="w-1 bg-blue-500 h-12 rounded-r-md"></div>
            )}
            <div className="flex gap-2 py-2 pl-4 items-center">
              <Avatar online={true} username={onlinePeople[userId]} userId={userId}/>
              <span className="tex-gray-800">{onlinePeople[userId]}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col bg-blue-50 w-2/3 p-2">
        <div className="flex-grow">
           {!selectedUserId && (
              <div className="flex h-full flex-grow items-center justify-center">
              <div className="tex-gray-400">&larr; Select a person from the sidebar</div>
              </div>
           )}
           {!!selectedUserId && (
              <div className="mb-4 h-fill">
               <div className="relative h-full">
                 <div  className="overflow-y-scroll absolute top-0 left-0 right-0 bottom-2">
                   {messagesWithouDupes.map(message => (
                    <div key={message._id} className="{(message.sender === id ? 'tex-right': 'tex-left')}">
                     <div className={"text-lef inline-bock p-2 my-2 rounded-md tex-sm " +(message.sender === id ?'bg-lue-500 tex-white':'bg-white tex-gray-500')}>
                   {message.text}
                 </div>
               </div>
              ))}
             <div ref={divUnderMessages}></div>
            </div>
           </div>
          </div>
           )}
            </div>
            {!!selectedUserId && (
              < form className="flex gap-2" onSubmit={sendMessage}>
                <input type="text"
                    value={newMessageTex}
                    onChange={ev => setNewMessagetext(ev.target.value)}
                      placeholder="Type your messege here"
                      className="bg-white flex-grow border rounded-sm p-2"/>
                <button type="submit" className="bg-blue-500 p-2 tex-white rounded-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
            )}
      </div>
    </div>
    );
}