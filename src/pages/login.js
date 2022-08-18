import React, {useEffect, useState} from 'react'
import Header from '../header'
import "./auth.css"
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
 
export default function Login() {
  const navigate=useNavigate()
  const [myIdd, setmyIdd]=useState('')
  const[isError, setIsError]=useState(false)
  const[isError2, setIsError2]=useState('')
  const[cook, setcook]=useState('')
  const [messagee, setmessagee]=useState('')
  const [redi, setredi]=useState('')
  const [messagee2, setmessagee2]=useState('')
  const[form, setForm]=useState({
    email:"", 
    password:"", 
    })
const cookies = new Cookies();

   const sendData=  async (obj)=>{
      let data=JSON.stringify(obj)
      try{
            await axios({
        url:"http://localhost:3001/api/login",
          method:"POST",
          headers:{"Content-Type": "application/json"},
          data:data
         })
         .then(res=>{
          setIsError2(res.data.bool)
          // setIsError2(res.bool2)
         setmessagee2(res.data.message)
          setredi(res.redirect)
          setmyIdd(res.data.id)
          setcook(res.data.accessToken)
         }
        
         )
      }catch(err){
        console.log(err)
      }
    }
  

    const handleCookie=()=>{
      if(cook){
        cookies.set('jwt', cook);
        navigate(`/homepage:${myIdd}`)
      }
    }

    const handleChange=(e)=>{
      setForm((prev)=>({
        ...prev, [e.target.name]:e.target.value
      }))
    } 
     const handleClick=(e)=>{
    setcook("")
    e.preventDefault()
    formHandling(form)
  }

useEffect(()=>{
  handleCookie()
},[cook])
    


    const formHandling=(obj)=>{
      if(!obj.email || !obj.password || !obj.email.includes('@')){
        setIsError(true)
        setmessagee("fill in email and password properly")
      }
      else{
        setIsError(false)
        sendData(obj)
      }
    }
  return (
    <div>
        <Header/>
        <div className='containerAuth'>
          <h2>Login your MyMonii account</h2>
          <form action='/login' method='POST'>
              <input type="email" placeholder='Email' onChange={handleChange} value={form.email} name="email"required ></input>
              <input type="password" placeholder='password' onChange={handleChange} value={form.password} name="password" required></input>
              <button onClick={handleClick} type="submit">Proceed</button>
          </form>
          <p>New user? <a href='/signup'>Click</a> to signup</p>
          {isError ?<p style={{ "color":"red" }}>{messagee}</p>:<p style={{ "display":"none" }}></p> } 
          {isError2=="true" ?<p style={{ "color":"red" }}>{messagee2}</p>:<p style={{ "display":"none" }}></p> } 
        </div>
    </div>
  )
}
