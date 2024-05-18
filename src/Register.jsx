import React from "react"
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react"
const Register = () => {
  const [email,newemail] = useState("")
  const [password , newpassword] = useState("")
  const navigate = useNavigate();

  const alerting = (Event) => {
    // Event.preventDefault();
    localStorage.setItem("isLogined",true);
    navigate('/');
  }
  return (
    <main className="h-screen w-screen bg-slate-400 flex justify-center items-center font-Mont">
        <form className="w-1/2 h-3/4 flex flex-col justify-center items-center gap-11  bg-white shadow-sm" onSubmit={alerting}>
            <div className="pb-20 text-4xl font-bold">Login</div>
            <input className="outline-none" type="email" id="email" value={email} onChange={(e)=>newemail(e.target.value)} name="user" placeholder="Email"/>
            <input className="outline-none" type="text" id="password" value={password} onChange={(e)=>newpassword(e.target.value)} name="password" placeholder="Password" />
            <button type="submit" className="bg-blue-500 px-4 py-2 text-2xl text-white font-bold">Login</button>
        </form>
    </main>
  )
}

export default Register