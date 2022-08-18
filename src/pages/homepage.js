import React, { useEffect, useState } from 'react'
import Header from '../header'
import './homePage.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios'

export default function Homepage() {
    const [myId, setmyId]=useState('')
    const [myname, setmyname]=useState('')
    const [myemail, setmyemail]=useState('')
    const [totalAmount, settotalAmount]=useState(0)
    const [status, setStatus]=useState(false)
    const navigate=useNavigate()
const cookies = new Cookies();

const fetchAccount=async()=>{
    if(!cookies.get("jwt")) {navigate('/login')}
    const data=await axios.post('http://localhost:3001/api/home',
    {},
    {withCredentials:true})
    var id= data.data.id
    var name= data.data.firstName
    var email= data.data. username
    setmyname(name)
    setmyId(id)
    setmyemail(email)
    setStatus(data.data.status)
    navigate(`/homepage:${id}`)
}
const fetchTotalAmount=async()=>{
    const data=await axios({
        method:'GET',
        url:`http://localhost:3001/api/home/totalAmount/:${myId}`,
    })
    var amount=data.data.amount
    settotalAmount(amount)
    console.log(amount)
} 
fetchTotalAmount()



useEffect(()=>{
fetchAccount()
  },[totalAmount])

  return (
    <div>
        <Header/>
        <div className='containerHome'>
            <div className='headd'>
            <h2>Hi {myname} &#128512;</h2>
        <p>Available balance:  <span style={{"fontWeight":"bold"}}>${totalAmount}</span></p>
            </div>
            <div className="moreDetails"> <p><span>Welcome to your dashboard.</span>  You can add funds, send funds to fellow users and also withdraw your funds. <br></br>
        Go ahead ad try it out.</p>
        <img src="girlDog3.jpeg"></img>
        </div>
        </div>
    </div>
  )
}
