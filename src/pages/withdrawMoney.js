import React, { useEffect, useState } from 'react'
import Header from '../header'
import './money.css'
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios';

export default function WithdrawMoney() {
  const navigate=useNavigate()
const cookies = new Cookies();
const [money, setMoney]=useState('')
const[myId, setmyId]=useState('')
const[myname, setmyname]=useState('')
const[myemail, setmyemail]=useState('')
const[myAccNo, setmyAccNo]=useState('')
const[myBankName, setmyBankName]=useState('')
const[formDet, setformDet]=useState('')
const[checkUserPrice, setcheckUserPrice]=useState(true)
const[formErr, setformErr]=useState(true)
const[redi, setredi]=useState("false")



//this is for verification
const verifyUser=async()=>{
  if(!cookies.get("jwt")){navigate('/login')}
  const data=await axios.post('http://localhost:3001/api/withdraw',
              {},
              {withCredentials:true})
      const id=data.data.id
      const status=data.data.status
      const name=data.data.firstName
      const email=data.data.email
      setmyId(id)
      setmyname(name)
      setmyemail(email)
      navigate(`/withdrawMoney:${id}`)

}
useEffect(()=>{
  verifyUser()
},[])


//storing the users request
const withdrawalRequest=async()=>{
  const data=await axios({
    method:'POST',
    url:`http://localhost:3001/api/withdraw/:${myId}`,
    data:{
      amountToWithdraw:money,
      transaction:"withdraw",
      myName:myname,
      myEmail:myemail,
      myAccNo:myAccNo,
      myBankName:myBankName,
    }
  })
 setformDet(data.data.message)
 setformErr(data.data.stats)
 setcheckUserPrice(data.data.stat2)
 setredi(data.data.redirect)
 
}
useEffect(()=>{
 redi=="true" ? navigate(`/homepage:${myId}`): console.log(redi)
},[redi])


const handleClick=(e)=>{
  e.preventDefault()
withdrawalRequest()
setcheckUserPrice(true)
  setformErr(true)
  setredi("false")
// {(!checkUserPrice && !formErr)?navigate(`/homepage:${myId}`): navigate(`/withdrawMoney:${myId}`)}
// {(!checkUserPrice & !formErr)? console.log("all clear"): console.log("notYet")}
}


  return (
    <div>
        <Header/> 
        <div className='containerFund'>
          <h2>Withdraw money</h2>
          <form>
              <input type="number" placeholder='Enter your accountNumber' value={myAccNo} onChange={(e)=>setmyAccNo(e.target.value)}></input>
              <input type="text" placeholder='Bank name' value={myBankName} onChange={(e)=>setmyBankName(e.target.value)}></input>
              <input type="number" placeholder='Amount to withdraw' value={money} onChange={(e)=>setMoney(e.target.value)}></input>
              <button onClick={handleClick}>Proceed</button>
          </form>
          {checkUserPrice==false ? <p style={{"color":"red"}}>Amount too high</p>: <p style={{"color":"red", "display":"none"}}></p>}
          {!formErr ? <p style={{"color":"red"}}>{formDet}</p>: <p style={{"color":"red", "display":"none"}}></p>}
        </div>
    </div>
  )
}
