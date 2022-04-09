import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase-config';
import { NavHashLink as NavLink} from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';
import { HashRoute } from './HashRoute';
import { motion, AnimatePresence } from "framer-motion"
import { Route } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export const Auth = () => {
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('')
    const [repeatedRegisterPassword, setRepeatedRegisterPassword] = useState('')
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const history = useHistory();

    onAuthStateChanged(auth, () => {
      if(auth.currentUser) {
        history.push('/home')
      }
    })
  
    const register = () => {
      if(registerPassword === repeatedRegisterPassword) {
        createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
          .then((resp) => console.log(resp)) 
          .catch((err) => console.log(err?.code))
      }
    }
  
    const login = () => {
      signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then((resp) => console.log(resp))
        .catch((err) => console.log(err?.code))
    }
  
    const logout = () => {
      signOut(auth);
    }

    const tabContentAnimationParams = {
      initial: {
        scale: 0.8,
        translateX: "100%",
        opacity: 0,
      },
      animate: {
        scale: 1,
        translateX: 0,
        opacity: 1,
      },
      exit: {
        scale: 0.8,
        translateX: "-100%",
        opacity: 0,
      },
    }
  
    return (
      <motion.form
        className="auth"
      >
        <div className="auth__tabs">
          <NavLink
            className="auth__tab"
            activeClassName="auth__tab--active"
            exact
            to={"/login"}
          >
            log in
          </NavLink>
          <NavLink
            className="auth__tab"
            activeClassName="auth__tab--active"
            exact
            to={"/login/register"}
          >
            register
          </NavLink>
        </div>
        <AnimatePresence>
          <Route
            path={"/login/register"}
            className="auth__tab-content"
          >
            <motion.div
              initial={tabContentAnimationParams.initial}
              animate={tabContentAnimationParams.animate}
              exit={tabContentAnimationParams.exit}
            >
              <div className="auth__title">
                  register
              </div>
              <label htmlFor="register-email" className="auth__label">
                email
                <input
                  id="register-email"
                  className="auth__input"
                  placeholder="example@email.com"
                  type="email"
                  onChange={(event) => {
                    setRegisterEmail(event.target.value)
                  }}
                />
              </label>
              <label htmlFor="register-password" className="auth__label">
                password
                <input
                    id="register-password"
                    className="auth__input"
                    placeholder="password"
                    type="password"
                    onChange={(event) => {
                      setRegisterPassword(event.target.value)
                    }}
                />
              </label>
              <label htmlFor="register-password-repeat" className="auth__label">
                repeat password
                <input
                    id="register-password-repeat"
                    className="auth__input"
                    placeholder="password"
                    type="password"
                    onChange={(event) => {
                      setRepeatedRegisterPassword(event.target.value)
                    }}
                />
              </label>
              <button
                  className="auth__submit-button"
                  onClick={(event) => {
                    event.preventDefault();
                    register()
                  }}
              >
                  register
              </button>
            </motion.div>
          </Route>
          <Route
            exact
            path={"/login"}
            className="auth__tab-content"
          >
            <motion.div
              initial={tabContentAnimationParams.initial}
              animate={tabContentAnimationParams.animate}
              exit={tabContentAnimationParams.exit}
            >
              <div className="auth__title">
                  log in
              </div>
              <label htmlFor="login-email" className="auth__label">
                email
                <input
                    htmlFor="login-email"
                    className="auth__input"
                    placeholder="example@email.com"
                    type="email"
                    onChange={(event) => {
                      setLoginEmail(event.target.value)
                    }}
                />
              </label>
              <label htmlFor="register-password" className="auth__label">
                password
                <input
                    className="auth__input"
                    placeholder="password"
                    type="password"
                    onChange={(event) => {
                      setLoginPassword(event.target.value)
                    }}
                />
              </label>
              <button
                  className="auth__submit-button"
                  onClick={(event) => {
                    event.preventDefault();
                    login()
                  }}
              >
                  log in
              </button>
            </motion.div>
          </Route>
        </AnimatePresence>
    </motion.form>
    );
  }