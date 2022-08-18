import React from 'react'
import Header from '../header'
import './homePage.css'

export default function LandingPage() {
  return (
    <div> 
        <Header/>
        <div className='container'>
          <div >
            <img src='/girlDog5.jpeg'></img>
          <h1 style={{'paddingBottom':"15px"}}>Who are we?</h1>
          <p style={{'paddingBottom':"15px"}}>We are an amazing app that helps you manage your transactions
          in the EASIEST and BEST way.</p>
          <span style={{'paddingBottom':"15px", "border":"none"}}>
            <a href='/signup'>Signup</a> and feel the experience of easy banking. Already have an account? <a href='/login'>Login</a> to continue
          </span>
          </div>
        </div>
    </div>
  )
}
