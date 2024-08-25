import React, { useState } from 'react'
import Menu from './components/Menu'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Search from './components/SearchbR'
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { useSort } from "@table-library/react-table-library/sort";
import { usePagination } from "@table-library/react-table-library/pagination";
import Notes from './components/Notes'
import Documents from './components/Documents'
const BASELINE_THEME = {
  Table: `width: inherit;
  border-radius: ${"0.5rem"};`,
  Header: '',
  Body: '',
  BaseRow: `
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-family: "Mont";
  `,
  HeaderRow: `
    color: ${"#575757"};
    background-color: ${"#EAEAEA"};
    border-radius: ${"0.5rem"};
    letter-spacing: ${"-0.0325rem"};
  `,  
  Row: `
    color: ${"#202020"};
    font-weight: 500;
    background-color: ${"#F3F3F3"};

    &.disabled {
      color: ${"#000000"};
    }

    &:hover {
      color: ${"#000000"};
      background-color: ${"#F8F8F8"};
      border-radius: ${"0.5rem"};
    }

    &:not(:last-of-type) > .td {
      border-bottom: 1px solid ${"#ffffff"};
    }
  `,
  BaseCell: `
    padding: 0.46875rem 12px;
  `,
  HeaderCell: `
    font-weight: 500;

    .resizer-handle {
      background-color: ${"#202020"};
    }

    svg,
    path {
      fill: currentColor;
    }
  `,
  Cell: `
    &:focus {
      outline: dotted;
      outline-width: 1px;
      outline-offset: -1px;
    }
  `,
};
const key = 'Compact Table';

const Convoinside = () => {

    async function setNewData(){
      let url = `http://localhost:8080/setnewdata?`;
    };
    const [nodes,NewNodes] = useState([])
    const data = { nodes };
    const {user} = useParams()
    const [HeroName,SetHeroName] = useState("")
    const [HeroMobile,SetHeroMobile] = useState()
    const [HeroEmail,SetHeroEmail] = useState("")
    function handleCancel(){
      document.getElementById('AddPopUp').classList.remove('flex');
      document.getElementById('AddPopUp').classList.add('hidden')
    }
    async function handleSaveNewDetail(){
      let Date = document.getElementById("NewDate");
      let Course = document.getElementById("NewCourse");
      let University = document.getElementById("NewUniversity");
      let Status = document.getElementById("NewStatus");
      let Items = [Date,Course,University,Status];
      let filled = true;
      Items.forEach((el)=>{
        if(el.value===""){
          el.classList.add("border");
          el.classList.add("border-red-500");
          filled = false;
        }else{
          el.classList.remove("border");
        }
      })
      if(filled){
        let url = `http://localhost:8080/setnewdata?`;
        url+=`course=${encodeURIComponent(Course.value)}&university=${encodeURIComponent(University.value)}&status=${encodeURIComponent(Status.value)}&date=${encodeURIComponent(Date.value)}&cip=${encodeURIComponent(user)}`;
        try {
          const response = await fetch(`${url}`);
          const data = await response.json();
          data.result==="ok"?alert("New Lead Added") :alert("Failed to Add Lead");
        } catch (err) {
            console.error("Error fetching data:", err);
            return 0; // Or another appropriate fallback value
        }
      }
    }
    useEffect(()=>{
        const isLogined = localStorage.getItem("isLogined") === "true";
        !isLogined?navigate('/'):console.log("");

        async function GetUser(cip) {
          try {
            const response = await fetch(`http://localhost:8080/user/${cip}`);
            const data = await response.json();
            return data.result;
          } catch (err) {
              console.error("Error fetching data:", err);
              return 0; // Or another appropriate fallback value
          }
            
            }
          async function GetUserAllData(cip) {
            try {
              const response = await fetch(`http://localhost:8080/useralldata/${cip}`);
              const data = await response.json();
              return data.result;
            } catch (err) {
                console.error("Error fetching data:", err);
                return 0; // Or another appropriate fallback value
            }
              
              }
          GetUser(user).then((data)=>{
            SetHeroName(data[0].name);
            SetHeroMobile(data[0].phone);
            SetHeroEmail(data[0].email);
          })
          GetUserAllData(user).then((data)=>{
            console.log(data)
            NewNodes(data);
          })
      },[])
      const pagination = usePagination(data, {
        state: {
          page: 0,
          size: 10,
        },
        onChange: onPaginationChange,
      });
    
      function onPaginationChange(action, state) {
        console.log(action, state);
      }
    
    
    
      const theme = useTheme(BASELINE_THEME);
      const sort = useSort(
        data,
        {
          onChange: onSortChange,
        },
        {
          sortFns: {
            Name: (array) => array.sort((a, b) => a.name.localeCompare(b.name)),
            Mobile: (array) => array.sort((a, b) => a.mobile - b.mobile),
            // TYPE: (array) => array.sort((a, b) => a.type.localeCompare(b.type)),
            // COMPLETE: (array) => array.sort((a, b) => a.isComplete - b.isComplete),
            // TASKS: (array) =>
            //   array.sort((a, b) => (a.nodes || []).length - (b.nodes || []).length),
          },
        }
      );
    
      function onSortChange(action, state) {
        console.log(action, state);
      }
      const COLUMNS = [
        { label: 'Date', renderCell: (item) => item.date},
        { label: 'University', renderCell: (item) => item.university },
        {
          label: 'Course',
          renderCell: (item) => item.course,
        },
        {label:"Status",renderCell: (item) => item.status.charAt(0).toUpperCase() + item.status.slice(1)
        }
      ];
      
      function showpopup(){
        document.getElementById('AddPopUp').classList.remove('hidden');
        document.getElementById('AddPopUp').classList.add('flex')
      }
  return (
    <div className='w-screen h-screen bg-white flex'>
      <div id='AddPopUp' className='absolute hidden h-screen w-screen bg-black/50  justify-center items-center' style={{zIndex:999}}>
        <div className=' w-1/2 bg-white rounded-lg p-5 flex flex-col items-start gap-5'>
          <div className='w-full flex justify-between'>
            <button onClick={()=>handleCancel()} className='font-Mont text-red-500 border-2 border-red-500 bg-white rounded-lg px-5 py-2 font-bold'>Exit</button>
            <button onClick={()=>handleSaveNewDetail()} className='font-Mont text-white bg-appblue-500 rounded-lg px-5 py-2 font-bold'>Save</button>
          </div>
          
          <p className='text-appblack-500 font-bold font-Mont text-3xl tracking-tight'>Add Details</p>
          <div className='flex flex-wrap gap-5'>
          <div className='font-Mont tracking-tight'>
            <p className='text-xl font-medium px-2 mb-2'>Date</p>
            <input id='NewDate' type="text" placeholder='DD/MM/YYYY' className='outline-offset-0 outline-none  bg-gradient-to-r from-appblack-900 to-appblack-800 focus:bg-appblack-800 rounded-lg px-5 py-2' required/>
          </div>
          <div className='font-Mont tracking-tight'>
            <p className='text-xl font-medium px-2 mb-2'>Course</p>
            <input id='NewCourse' type="text" placeholder='Course' className='outline-none bg-gradient-to-r from-appblack-900 to-appblack-800 focus:bg-appblack-800  rounded-lg px-5 py-2' required/>
          </div>
          <div className='font-Mont tracking-tight'>
            <p className='text-xl font-medium px-2 mb-2'>University</p>
            <input id='NewUniversity' type="text" placeholder='University' className='outline-none bg-gradient-to-r from-appblack-900 to-appblack-800 focus:bg-appblack-800  rounded-lg px-5 py-2' required/>
          </div>
          <div className='font-Mont tracking-tight'>
            <p className='text-xl font-medium px-2 mb-2'>Status</p>
            <input id='NewStatus' type="text" placeholder='Status' className='outline-none bg-gradient-to-r from-appblack-900 to-appblack-800 focus:bg-appblack-800  rounded-lg px-5 py-2' required/>
          </div>
          </div>
        </div>
      </div>
        <Menu/>
        <div className='w-full flex flex-col'>
        <Search/>
        <div className='w-full flex justify-center items-center'>
          <div className='w-full h-full mx-5 px-5 font-Mont text-3xl font-bold text-appblack-500 gap-2'>
            <div className='font-Mont text-3xl font-bold text-appblack-500 tracking-tight mb-2'>{HeroName}</div>
            <p className='text-base font-medium text-appblack-700 tracking-wide'>Mobile - {HeroMobile}</p>
            <p className='text-base font-medium text-appblack-700 tracking-wide'>Email - {HeroEmail}</p>
            <div className=' my-5 rounded-lg bg-appblack-800 w-full p-5'><button onClick={()=>showpopup()} className='mb-5 float-right text-base px-6 py-2 rounded-lg font-semibold text-white bg-appblue-500 '>New</button>
              <CompactTable className="foo cursor-pointer" columns={COLUMNS} data={data} theme={theme} sort={sort} pagination={pagination}/>
            </div>
          </div>
          <div className='w-2/6 bg-appblack-800 rounded-lg h-full overflow-y-scroll no-scrollbar'>
            <Notes cip={user}/>
            <Documents cip={user}/>
          </div>
        </div>
        </div>
        
    </div>
  )
}

export default Convoinside