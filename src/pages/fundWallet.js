import React, { useEffect, useState } from 'react'
import Header from '../header'
import "./money.css"
import { useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Paystackpop from '@paystack/inline-js'


export default function FundWallet() {
const navigate=useNavigate()
const cookies = new Cookies();
const [amount,setAmount]=useState('')
const[myId, setMyId]=useState('')
const[myname, setMyname]=useState('')
const[myemail, setMyemail]=useState('')
const[myErr, setMyErr]=useState(true)
const[myErrmessage, setMyErrmessage]=useState('')
const paystack=new Paystackpop()



const verifyUser=async()=>{
  if(!cookies.get("jwt")){navigate('/login')}
  const data=await axios.post('http://localhost:3001/api/funding',
              {},
              {withCredentials:true})
      const id=data.data.id 
      setMyId(id)
      const status=data.data.status
      const email=data.data.email
      const name=data.data.firstName
      setMyemail(email)
      setMyname(name)
      navigate(`/fundWallet:${id}`)

}
useEffect(()=>{
  verifyUser()
},[])

const storing=async()=>{
  const data= await axios({
    method:'POST',
    url:`http://localhost:3001/api/addFunds/:${myId}`,
    data:{amount:amount, transactionMode:'funding'}
 })
}

const sendAmount=async(e)=>{
  setMyErrmessage(true)
  e.preventDefault()
  if(!amount){setMyErrmessage('Enter an amount')
setMyErr(false)}
await paystack.newTransaction({
  key:'pk_test_86c16089d31734b378a10f20e3ba57d536bf6cdd',
  amount:amount,
  email:myemail,
  onSuccess (transaction){
    let message=`Payment completed ref ${transaction.reference}`
    console.log(message)
    navigate(`/homepage:${myId}`)
  storing()
  .then((res)=>{
    console.log(res)
  })
  },
  onCancel(){
    console.log("you have canceled the transaction")
  }
})
}


  return (
    <div>
        <Header/>
        <div className='containerFund'>
          <h2>Fund your wallet</h2>
          <form>
              <input type="number" placeholder='Enter amount to fund' value={amount} onChange={(e)=>{setAmount(e.target.value);console.log(amount)}}></input>
              <button onClick={sendAmount}>Proceed</button>
          </form>
          {!myErr? <p style={{"color":"red"}}>{myErrmessage}</p>:<p style={{"display":"none"}}></p>}
        </div>
    </div>
  )
}
