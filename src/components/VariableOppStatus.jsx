import React, { useState ,useEffect} from 'react'
import ReactDropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import CountUp from 'react-countup'
const VariableOppStatus = () => {
    const [Enrolled,setEnrolled] = useState(0);
    const [NewLeads,setLeads] = useState(0);
    const [HighPLeads,setHPL] = useState(0);
    const [PendingAction,setPA] = useState(0);
    const [Lost,setLost] = useState(0)
    const options = [
        'Daily',
        'Monthly',
        'Yearly'
      ];
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const handleDropdownChange = (selected) => {
    setSelectedOption(selected.value);
    
    };
    useEffect(()=>{
        async function fetchLength(name) {
            try {
                const response = await fetch('http://localhost:8080/getcountstatus/'+name+'/'+selectedOption);
                const data = await response.json();
                return data.result[0].count;
            } catch (err) {
                console.error("Error fetching data:", err);
                return 0; // Or another appropriate fallback value
            }
            }
        const fetchData = async () => {
        try {
            const nameTypes = ["applied", "accepted", "pa", "hp", "lost"];
            const promises = nameTypes.map(async (ele) => {
                const count = await fetchLength(ele);
                return count;
            });
            const results = await Promise.all(promises);
            localStorage.setItem("allStatusLen",JSON.stringify(results));
            localStorage.setItem("CurrentTimeline",selectedOption);
            setEnrolled(results[1]);
            setLeads(results[0]);
            setPA(results[2]);
            setHPL(results[3]);
            setLost(results[4]);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    fetchData();
    },[selectedOption])
  return (
    <div className='font-Mont min-w-40 p-5 w-full'>
        <div className='flex justify-between items-center'>
            <p className='font-bold text-appblack-700 tracking-tight'>Overview →</p>
            {/* <button className='hover:bg-appblack-700 transition-all hover:text-white font-medium outline outline-1 outline-offset-2 outline-appblack-700 text-appblack-700 px-4 py rounded-lg'>{currentview}</button> */}
            <ReactDropdown className='font-bold' id="DropChange"
                options={options}
                onChange={handleDropdownChange}
                value={selectedOption}
                placeholder="Select an option"
                />
        </div>
        <div className='pt-10 flex justify-start items-start flex-wrap gap-10 font-semibold p-10'>
            <div id='accepted' className='flex flex-col justify-center items-center cursor-pointer text-appblack-500 gap-2'>
                <p className='text-xl'>Won/Enrolled</p>
                {/* <CountUp className='text-4xl font-bold'>{Enrolled} </CountUp> */}
                <CountUp className='text-4xl font-bold' duration={1} end={Enrolled}/>
            </div>
            <div id='applied' className='flex flex-col justify-center items-center cursor-pointer text-appblack-500 gap-2'>
                <p className='text-xl'>New Leads</p>
                <CountUp className='text-4xl font-bold' duration={1} end={NewLeads}/>
            </div>
            <div id='hp' className='flex flex-col justify-center items-center cursor-pointer text-appblack-500 gap-2'>
                <p className='text-xl'>High Priority Leads</p>
                <CountUp className='text-4xl font-bold' duration={1} end={HighPLeads}/>
            </div>
            <div id='pa' className='flex flex-col justify-center items-center cursor-pointer text-appblack-500 gap-2'>
                <p className='text-xl'>Pending Action</p>
                <CountUp className='text-4xl font-bold' duration={1} end={PendingAction}/>
            </div>
            <div id='lost' className='flex flex-col justify-center items-center cursor-pointer text-appblack-500 gap-2'>
                <p className='text-xl'>Lost</p>
                <CountUp className='text-4xl font-bold' duration={1} end={Lost}/>
            </div>
        </div>
        
        
    </div>
  )
}

export default VariableOppStatus