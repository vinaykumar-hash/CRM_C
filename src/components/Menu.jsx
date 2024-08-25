import React from 'react'
import { useEffect ,useState} from 'react'
import { useNavigate } from "react-router-dom";
import SureCheck from './SureCheck';
const Menu = () => {
    const navigate = useNavigate();
    const [currenttab,newtab] = useState(localStorage.getItem("currenttab")!==null?localStorage.getItem("currenttab") : "dashboard");
    //Logut logic
    const logout = ()=>{
        localStorage.setItem("isLogined",false);
        navigate('/login');
    }
    //Tab changing logic
    const tabs = ["dashboard","conversation","calendar","contacts","payments","marketing"];
    const handleMenuChange = (e)=>{
        // tabs.forEach((tab)=>{
        //     document.getElementById(tab).classList.remove("bg-appblue-500");
        //     document.getElementById(tab).classList.remove("shadow-md");
        // })
        localStorage.setItem("currenttab",e);
        // document.getElementById(e).classList.add("bg-appblue-500","shadow-md");
        navigate('/'+e);

        // alert(document.getElementById(e));
    }
    useEffect(()=>{
        tabs.forEach((tab)=>{
            document.getElementById(tab).classList.remove("bg-appblue-500");
            document.getElementById(tab).classList.remove("shadow-md");
        })
        document.getElementById(currenttab).classList.add("bg-appblue-500","shadow-md");
    },[])
  return ( 
    <div className='relative w-2/12 min-w-fit h-full bg-appblack-500 flex flex-col justify-top items-center pt-10 gap-5 px-5 cursor-pointer' >
        <img onClick={logout} className='transition-all hover:rotate-12 absolute bottom-5 left-10' width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/settings.png" alt="settings"/>
        <div id='logo' className='w-40 h-20 bg-white/10'>Logo Here</div>
        <div className='flex  items-center justify-start min-w-32 w-full bg-appblack-600 px-4 py-2 rounded-lg shadow-md gap-5'>
            <img width="30" height="30" src="https://img.icons8.com/ios-filled/100/FFFFFF/user-male-circle.png" alt="user-male-circle"/>
            <p className='capitalize font-Mont tracking-wide text-white font-normal'>{localStorage.getItem("User").replace("@gmail.com","")}</p>
        </div>
        <div id='dashboard' onClick={()=>handleMenuChange("dashboard")} className='transition-all flex  items-center justify-start min-w-32 w-full bg-appblue-500 px-4 py-2 rounded-lg shadow-md gap-5'>
            <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/control-panel--v2.png" alt="control-panel--v2"/>
            <p className='capitalize font-Mont tracking-wide text-white font-medium'>Dashboard</p>
        </div>
        <div id='conversation' onClick={()=>handleMenuChange("conversation")} className='transition-all flex  items-center justify-start min-w-32 w-full  px-4 py-2 rounded-lg gap-5'>
        <img width="30" height="30" src="https://img.icons8.com/ios-glyphs/30/FFFFFF/speech-bubble--v1.png" alt="speech-bubble--v1"/>
            <p className='capitalize font-Mont tracking-wide text-white font-medium'>Conversation</p>
        </div>
        <div id='calendar' onClick={()=>handleMenuChange("calendar")} className='flex transition-all items-center justify-start min-w-32 w-full  px-4 py-2 rounded-lg  gap-5'>
        <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/FFFFFF/tear-off-calendar.png" alt="tear-off-calendar"/>
            <p className='capitalize font-Mont tracking-wide text-white font-medium'>Calendar</p>
        </div>
        <div id='contacts' onClick={()=>handleMenuChange("contacts")} className='flex transition-all items-center justify-start min-w-32 w-full  px-4 py-2 rounded-lg  gap-5'>
        <img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/groups.png" alt="groups"/>
            <p className='capitalize font-Mont tracking-wide text-white font-medium'>Contacts</p>
        </div>
        <div id='payments' onClick={()=>handleMenuChange("payments")} className='flex transition-all items-center justify-start min-w-32 w-full  px-4 py-2 rounded-lg  gap-5'>
        <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/FFFFFF/expensive-2--v1.png" alt="expensive-2--v1"/>
            <p className='capitalize font-Mont tracking-wide text-white font-medium'>Payments</p>
        </div>
        <div id='marketing' onClick={()=>handleMenuChange("marketing")} className='flex transition-all items-center justify-start min-w-32 w-full  px-4 py-2 rounded-lg  gap-5'>
        <img width="30" height="30" src="https://img.icons8.com/ios-filled/30/FFFFFF/c-fold-leaflet.png" alt="c-fold-leaflet"/>
            <p className='capitalize font-Mont tracking-wide text-white font-medium'>Marketing</p>
        </div>
    </div>
  )
}

export default Menu