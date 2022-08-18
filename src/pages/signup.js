import React,{useEffect, useState} from 'react'
import Header from '../header'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate=useNavigate()
  const[isError, setIsError]=useState(false)
  const[isErrorRes, setIsErrorRes]=useState('')
  const[notFound, setnotFound]=useState(false)
  const [messagee, setmessagee]=useState('')
  const [messagee2, setmessagee2]=useState('')
  const[form, setForm]=useState({
    firstName:"",
    lastName:"",
    email:"", 
    password:"", 
    confirmPassword:""
    })

    const sendData=  async (obj)=>{
      let data=JSON.stringify(obj)
      try{
       await fetch("http://localhost:3001/api/signup", {
          mode:'cors',
          method:"POST",
          headers:{"Content-Type": "application/json"},
          body:data
         })
         .then(response=>response.json())
         .then(res=>{
            setIsErrorRes(res.redirect)
            setmessagee2(res.message)
         })
      }catch(err){
        console.log(err)
      }
    }
    useEffect(()=>{
    isErrorRes=="false" ? navigate('/login'): navigate('/signup')
    },[isErrorRes])

    const handleChange=(e)=>{
      setForm((prev)=>({
        ...prev, [e.target.name]:e.target.value
      }))
    } 
    const handleClick=(e)=>{
      // setIsErrorRes("false")
      e.preventDefault()
      formHandling(form)
    }

    const formHandling=(obj)=>{
      if(!obj.firstName||!obj.lastName||!obj.email || !obj.password ||!obj.confirmPassword||!obj.email.includes('@')){
        setIsError(true)
        setmessagee("fill in email and password properly")
      }
      else if(obj.password.length<=8){
        setIsError(true)
        setmessagee("password must be up to 9 characters")
      }
      else if(obj.confirmPassword!==obj.password){
        setIsError(true)
        setmessagee("passwords are not alike")
      }
      else if(notFound){
        setIsError(true)
        setmessagee("invalid email or password")
      }
      else{
        sendData(obj)
        setIsError(false)
        // setIsErrorRes('false')
        
      }
    }

  return (
    <div>
        <Header/>
        <div className='containerAuth'>
          <h2>Sign up</h2>
          <form>
              <input type="text" placeholder='Firstname' onChange={handleChange} value={form.firstName} name="firstName" required></input>
              <input type="text" placeholder='Lastname'  onChange={handleChange} value={form.lastName} name="lastName" required></input>
              <input type="email" placeholder='Email' onChange={handleChange} value={form.email} name="email" required></input>
              <input type="password" placeholder='password' onChange={handleChange} value={form.password} name="password" required></input>
              <input type="password" placeholder='confirmPassword' onChange={handleChange} value={form.confirmPassword} name="confirmPassword" required></input>
              <button onClick={handleClick} type="submit">Proceed</button>
          </form>
          <p>Existing user? <a href='/login'>Click</a> to login</p>
          {isError ?<p style={{ "color":"red" }}>{messagee}</p>:<p style={{ "display":"none" }}></p> } 
          {isErrorRes=="true" ?<p style={{ "color":"red" }}>{messagee2}</p>:<p style={{ "display":"none" }}></p> } 
        </div>
    </div>
  )
}
