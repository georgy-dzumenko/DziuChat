import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
import { getAnalytics, setUserProperties } from "firebase/analytics";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useSwipeable } from "react-swipeable";
import { auth } from "../firebase-config";

export const ChatsPanel = () => {
  const location = useLocation();
  const history = useHistory();
  const [settingsButton, setSettingsButton] = useState(null)
  const [closeButton, setCloseButton] = useState(null)
  
  const [displayName, setDisplayName] = useState('')

  const logout = () => {
    signOut(auth)
  }

  const analytics = getAnalytics();

  return (
    <motion.div
      className={classNames(["chats-panel", {"chats-panel--active": location.hash === "#details"}])}
    >
      <div className="chats-panel__self-info">
        <div className="chats-panel__self-avatar">
          <Player
            src="./lottie/avatar.json"
            style={{width: "100%", height: "100%"}}
            hover
          />
        </div>
        <div className="chats-panel__self-name">
          {auth.currentUser?.email}
        </div>
        <HashLink
          to="#settings"
          onMouseEnter={() => {settingsButton?.playSegments([0, 15], true)}}
          onMouseLeave={() => {settingsButton?.playSegments([15, 0], true)}}
          onMouseDown={() => {settingsButton?.playSegments([15, 20], true)}}
          className="chats-panel__settings-button"
        >
          <Player
            speed={3}
            lottieRef={instance => {
              setSettingsButton(instance);
            }}
            src="./lottie/settings.json"
          />
        </HashLink>
      </div>
      <div className={classNames(["chats-panel__settings", {"chats-panel__settings--active": location.hash === "#settings"}])}>
        <div className="chats-panel__settings-avatar">
          <Player
            src="./lottie/avatar.json"
            style={{width: "100%", height: "100%"}}
            hover
          />
        </div>

        <label htmlFor="" className="label">
          display name
          <input placeholder="Stepan Bandera" type="text" className="input" onChange={(event) => {setDisplayName(event.target.value)}}/>
        </label>
        <label htmlFor="" className="label">
          <input type="text" className="input" />
        </label>

        <button
          className="button"
          onClick={(event) => {setUserProperties(analytics, {displayName: event.target.value})}}
        >
          Apply
        </button>
        <button
          className="button"
          onClick={(event) => {
            event.preventDefault();
            logout()
          }}
      >
          log out
      </button>
        <HashLink
          onMouseDown={() => {closeButton.play()}}
          to="#"
          className="chats-panel__settings-close"
        >
          <Player
            speed={3}
            lottieRef={instance => {
              setCloseButton(instance);
            }}
            src="./lottie/close.json"
          />
        </HashLink>
      </div>
    </motion.div>
  );
}