import { useEffect, useState } from 'react';
import './styles/App.scss';
import {
  onAuthStateChanged, signOut
} from 'firebase/auth';
import { auth, db } from './firebase-config';
import { doc, onSnapshot } from 'firebase/firestore'
import { Switch, Route } from 'react-router-dom'
import { Home } from './component/Home';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import {Auth } from './component/Auth'
import { Redirect } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';

function App() {
  const [messages, setMessages] = useState([])
  const history = useHistory();
  const chatRoomRef = doc(db, "chat", "rdINvH2M03UamP71fNCQ");

  useEffect(() => {
    onSnapshot(chatRoomRef, (doc) => {
      console.log(doc.data().messages)
      setMessages(doc.data().messages)
    })
  }, [])

  onAuthStateChanged(auth, () => {
    if(!auth.currentUser) {
      history.push('/login')
    }
    if(auth.currentUser) {
      history.push('/home')
    }
  })

  useEffect(() => {console.log(messages.m)}, [messages])

  console.log(auth.currentUser)

  const { ref } = useSwipeable({
    onSwipedRight: () => { history.push('#details')},
    onSwipedLeft: () => { history.push('#')},
    ...{
      delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
      preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
      trackTouch: true,                     // track touch input
      trackMouse: false,                    // track mouse input
      rotationAngle: 0,                     // set a rotation angle
    }
  })

  useEffect(() => {
    ref(document);
  });

  return (
    <div
      className="App"
    >
      <div className="lottie-bg">
        <Player
          src="./lottie/background.json" background="transparent"
          // mode="normal"
          speed="1.5"
          // preserveAspectRatio="xMaxYMax slice"
          rendererSettings={{
            preserveAspectRatio: 'xMidYMid slice' // also tried 'xMidYMid meet'
          }}
          style={{
            position: "absolute",
            bottom: 0, top: 0,
            left: 0, right: 0,
            scale: 2,
            flex: 1,
            resizeMode: 'contain',
            height: "100%",
            width: "100%",
            padding: 0,
            margin: 0,
          }}
          resizeMode='cover'
          loop
          autoplay
        />
      </div>
      <Switch>
        <Route path="/login" >
          <Auth/>
        </Route>
        <Route path="/home" >
          <Home/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
