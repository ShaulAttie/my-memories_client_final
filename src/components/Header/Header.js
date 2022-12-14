import "./styles.css"
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from "react-router-dom"

import { useDispatch } from "react-redux"

import { LOGOUT } from "../../constanst/constantsType"

import decode from "jwt-decode"

import {IoMdLogIn} from "react-icons/io"
import {IoMdLogOut} from "react-icons/io"

const Header = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  const logout = () => {
    dispatch({ type: LOGOUT })
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    const token = user?.token

    if (token) {
      const decodedToken = decode(token)

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')))

  }, [location])


  return (
    <div className="header__container" >
      <div className="margin__left"></div>
      <div className="header__subcontainer">
        <div className="header__title" >
          <img src="\images\logo brain.png" alt="logo" style={{height: "80%", marginRight: "0.5rem"}}/>
          <Link to="/posts">
            <h1 >Memories</h1>
          </Link>
        </div>
        {
          user ? (
            <div className="header__logOut">
              <span>Wellcome, {user.result.name}</span>
              <button onClick={logout} className="log_button"><IoMdLogOut /></button>
            </div>
          ) : (
            <div className="header__logIn">
              <Link to="/auth"><button className="log_button"><IoMdLogIn /></button></Link>
            </div>
          )
        }
      </div>
      <div className="margin__right"></div>
    </div>
  )
}

export default Header
