import React from "react";
import Header from "./header";
import LandingPage from "./pages/landingPage";
import Signup from "./pages/signup";
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import FundWallet from "./pages/fundWallet";
import Login from "./pages/login";
import SendMoney from "./pages/sendMoney";
import WithdrawMoney from "./pages/withdrawMoney";
import Homepage from "./pages/homepage";


function App() {
  let {AgentId}=useParams()
  return (
    <div className="App">
   <BrowserRouter> 
   <Routes>
      <Route path={`/`} element={<LandingPage/>}/>
      <Route path={`/login`} element={<Login/>}/>
      <Route path={`/signup`} element={<Signup/>}/>
      <Route path={`/fundWallet:${AgentId}`} element={<FundWallet/>}/>
      <Route path={`/sendMoney:${AgentId}`} element={<SendMoney/>}/>
      <Route path={`/withdrawMoney:${AgentId}`} element={<WithdrawMoney/>}/>
      <Route path={`/homePage:${AgentId}`} element={<Homepage/>}/>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;


//it will include all the components