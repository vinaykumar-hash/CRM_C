import React from 'react'
import { useState , useEffect} from 'react'
import Menu from './components/Menu';
import { useNavigate } from "react-router-dom";
import Oppstatusdaily from './components/Oppstatusdaily';
import ConversionRate from './components/ConversionRate';
import VariableOppStatus from './components/VariableOppStatus';
import HeroPageTable from './components/HeroPageTable';
const Home = () => {
  const [name,setname] = useState("");
  const navigate = useNavigate();
  let d = new Date().toLocaleDateString();
  useEffect(()=>{

    const isLogined = localStorage.getItem("isLogined") === "true";
    !isLogined?navigate('/'):console.log("");
    setname(localStorage.getItem("User"));
  },[])

  return (
    <div className='w-screen h-screen bg-white flex transition-all overflow-y-scroll'>
      <Menu/>
      <div className='h-full w-full pt-10 px-10 overflow-y-scroll '>
        <div className='mb-10 w-full h-max flex justify-between items-center '>
          <div className='font-Mont font-bold text-3xl text-appblack-500 tracking-tight'>Dashboard</div>
          <div className='text-appblack-600 font-medium text-base font-Mont shadow-sm px-4 py-1 rounded-lg'>{d}</div>
        </div>
        <div className='flex justify-start items-start gap-5 flex-wrap w-full'>
          <div className='w-full flex gap-5 flex-wrap '>
            <Oppstatusdaily/>
            <ConversionRate/>
          </div>
          
          <VariableOppStatus/>
          <HeroPageTable/>
        </div>
        
      </div>
    </div>
  )
}

export default Home