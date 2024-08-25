import React, { useEffect, useState } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import CountUp from 'react-countup';
const ConversionRate = () => {
    const [reavelincome,newincome] = useState(0);
    function test(){
      alert("Changed");
    }
    useEffect(()=>{
      function handleStorageChange(){
        let totalcase = 0;
        let allData = JSON.parse(localStorage.getItem("allStatusLen"));
        allData.forEach((el)=>{
          totalcase+=el;
        })
        newincome((allData[1]*100)/totalcase);
      }
      handleStorageChange();
      const intervalId = setInterval(handleStorageChange, 1000);
    },["allStatusLen"])
  return (
    <div className='font-Mont min-w-40 min-h-96 p-5 shadow-md rounded-lg hover:scale-105 transition-all hover:shadow-lg'>
        <div className='w-full font-bold text-appblack-700 tracking-tight'>Conversion Rate →</div>
        <div className='relative w-56 h-56 m-10 '>
            <PieChart className='h-56 w-56 centeraboslute '
                data={[
                  { title: 'Success', value: 1, color: '#004697' }
                ]}
                reveal={reavelincome}
                lineWidth={15}
                background="#E7E7E7"
                lengthAngle={360}
                rounded
                animate
              />
              {/* <div className='h-48 w-48 bg-white rounded-full centeraboslute'></div> */}
              {/* <p className='centeraboslute font-Mont font-bold text-4xl text-appblack-700'>27.27%</p> */}
              <CountUp className='centeraboslute font-Mont font-bold text-4xl text-appblack-700' start={0} end={reavelincome} duration={1} suffix='%'/>
          </div>
    </div>
  )
}

export default ConversionRate






