import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { Auth } from './Auth';
import { auth, db } from '../firebase-config';
import { onAuthStateChanged } from 'firebase/auth';
import { Message } from "./Message";

export const Chat = () => {
  const [sendButton, setSendButton] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatRoomRef = doc(db, "chat", "rdINvH2M03UamP71fNCQ");

  useEffect(() => {
    onSnapshot(chatRoomRef, (doc) => {
      setMessages(doc.data().messages)
    })
  }, [])
  
  return (
    <div className="chat">
      <div className="chat__messages-container">
        {messages.map((message) => <Message message={message}/>)}
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          sendButton.play()
          if(newMessage.trim() !== '')
          updateDoc(chatRoomRef, {
            messages: [...messages, {author: {email: auth.currentUser.email, uid: auth.currentUser.uid},text: newMessage}]
          })
          setNewMessage('')
        }}
        className="chat__input-container"
      >
        <input value={newMessage} onChange={(event) => {setNewMessage(event.target.value)}} type="text" className="chat__input" />
        <button
          type="submit"
          className="chat__send-lottie"
        >
          <Player
            speed="3"
            src="./lottie/send.json"
            rendererSettings={{
              preserveAspectRatio: 'xMaxYMin slice' // also tried 'xMidYMid meet'
            }}
            style={{ 
              display: "block",
              width: "100%", height: "100%"
            }}
            lottieRef={instance => {
              setSendButton(instance);
            }}
          />
        </button>
      </form>
    </div>
  );
}