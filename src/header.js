import React, { useEffect, useRef } from 'react'
import './header.css'
import { useNavigate, useParams } from 'react-router-dom'
import Cookies from 'universal-cookie';

export default function Header() {
  const menuRef=useRef()
  const cookie=new Cookies()
  const navigate=useNavigate()
  let {myId}=useParams()
  // {myId=="undefined"?navigate('/login') : }

  const handleToggle=()=>{
   menuRef.current.classList.toggle('translateIn')
  }
  // useEffect(()=>{
  //   myId===undefined? cookie.remove("jwt"):console.log("youre in")
  // })
  

  const handleCookie=()=>{
    cookie.remove("jwt")
    navigate('/login')
  }

  return (
    <div className='cont'>
        <div className='logo'><a href={`/`} style={{"textDecoration":"none", "color":"orange"}} className='link white logo'>MyMonii App</a></div>
        <div className='links'>
          <div className='navLinks'>
          {/* <span><a href={`/homePage:${myId}`}className='link white'>Homepage</a></span> */}
          {/* <span><a href={!myId? `/login`:`/homePage:${myId}`}className='link white'>Homepage</a></span> */}
          <span><a href={`/homePage:${myId}`}className='link white'>Homepage</a></span>
            <span><a href={`/fundWallet:${myId}`}className='link white'>Fund my account</a></span>
            <span><a href={`/sendMoney:${myId}`}className='link white'>Send money</a></span>
            <span><a href={`/withdrawMoney:${myId}`}className='link white'>Withdraw</a></span>
            {cookie.get("jwt") ?<span style={{"background":"rgb(255, 127, 8)"}}><a onClick={handleCookie} className='link white'>Logout</a></span>:<span style={{"background":"rgb(255, 229, 144)"}}><a href={`/login`}className='link white'>Login</a></span> }
          </div>
        </div>
        <div className='mobileMenu'>
          <span className='menu' onClick={handleToggle}>Menu</span>
          <div className='dropDown' ref={menuRef}>
            <span><a href={`/homePage:${myId}`}className='link white'>Homepage</a></span>
            <span><a href={`/fundWallet:${myId}`}className='link white'>Fund my account</a></span>
            <span><a href={`/sendMoney:${myId}`}className='link white'>Send money</a></span>
            <span><a href={`/withdrawMoney:${myId}`}className='link white'>Withdraw</a></span>
            {cookie.get("jwt") ?<span style={{"background":"rgb(255, 127, 8)"}}><a onClick={handleCookie} className='link white'>Logout</a></span>:<span style={{"background":"rgb(255, 229, 144)"}}><a href={`/login`}className='link white'>Login</a></span> }
            
          </div>
        </div>
    </div>
  )
}
