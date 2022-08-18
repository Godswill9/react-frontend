import React, { useEffect, useState } from 'react'
import Header from '../header'
import './money.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

export default function SendMoney() {
  const navigate=useNavigate()
const cookies = new Cookies();
const[inputemail, setInputemail]=useState('')
const[inputamount, setInputamount]=useState('')
const[myId, setmyId]=useState('')
const[myname, setmyname]=useState('')
const[myemail, setmyemail]=useState('')
const[checkUserError, setcheckUserError]=useState(false)
const[checkUserPrice, setcheckUserPrice]=useState(false)
const[formErr, setformErr]=useState(false)
const[formDet, setformDet]=useState('')
const[formDet2, setformDet2]=useState('')
const[formDet3, setformDet3]=useState('')
const[redi, setredi]=useState("false")

const verifyUser=async()=>{
  if(!cookies.get("jwt")) navigate('/login')
  const data= await axios.post(
    "http://localhost:3001/api/sendMoney",
    {},
   { withCredentials:true}
)
const id=data.data.id
const name=data.data.firstName
const email=data.data.email
setmyId(id)
setmyname(name)
setmyemail(email)
navigate(`/sendMoney:${id}`)

}

const sendMoneyToUser=async()=>{
 const data= await axios({
  method:'POST',
  url:`http://localhost:3001/api/sendMoney/:${myId}`,
  data:{
    amount:inputamount,
    email:inputemail,
    sender:myname,
    senderEmail:myemail,
    transaction:"sent"
  }
 })
//  console.log(data.data)
 setformErr(true)
 setcheckUserError(true)
 setcheckUserPrice(true)
 setformDet(data.data.message)
 setformDet2(data.data.message2)
 setformDet3(data.data.message3)
 setredi(data.data.redirect)
}


useEffect(()=>{
  redi=="true" ? navigate(`/homepage:${myId}`): console.log(redi)
 },[redi])



const clickHandler=(e)=>{
  setformErr(false)
  setcheckUserError(false)
  setcheckUserPrice(false)
  e.preventDefault()
  sendMoneyToUser()
   
}


useEffect(()=>{
  verifyUser()
},[])

  return (
    <div>
        <Header/> 
        <div className='containerFund'>
          <h2>Send money</h2>
          <form>
              <input type="email" placeholder="Enter the user's MyMonii Email" value={inputemail} onChange={(e)=>setInputemail(e.target.value)} required></input>
              <input type="number" placeholder='Enter amount to send' value={inputamount} onChange={(e)=>setInputamount(e.target.value)} required></input>
              <button  onClick={clickHandler}> Proceed</button>
              {checkUserError ? <p style={{"color":"red"}}>{formDet2}</p>: <p style={{"color":"red", "display":"none"}}></p>}
              {checkUserPrice ? <p style={{"color":"red"}}>{formDet3}</p>: <p style={{"color":"red", "display":"none"}}></p>}
              {formErr ? <p style={{"color":"red"}}>{formDet}</p>: <p style={{"color":"red", "display":"none"}}></p>}

          </form>
        </div>
    </div>
  )
}
