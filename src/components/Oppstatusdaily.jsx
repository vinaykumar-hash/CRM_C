import React, { useEffect ,useState} from 'react'
import { PieChart } from 'react-minimal-pie-chart';
const Oppstatusdaily = () => {
  return (
    <div className=' min-w-80 min-h-96 flex flex-col justify-start items-start p-5 shadow-md rounded-lg hover:scale-105 transition-all hover:shadow-lg'>
        <div className='font-Mont font-bold text-appblack-700 tracking-tight'>Opportunities Status →</div>
        <div className='flex items-center justify-center gap-10 px-10 pb-5'>
          <div className='relative w-56 h-56  mt-10'>
            <PieChart className='h-56 w-56 centeraboslute '
                data={[
                  { title: 'Abandoned', value: 20, color: '#0693E3' },
                  { title: 'Lost', value: 15, color: '#06C8E3' },
                  { title: 'Won', value: 45, color: '#3206E3' },
                  { title: 'Open', value: 20, color: '#D106E3' },
                ]}
              />
              <div className='h-48 w-48 bg-white rounded-full centeraboslute'></div>
              <p className='centeraboslute font-Mont font-bold text-4xl text-appblack-700'>11</p>
          </div>
          <div className='flex flex-col justify-start items-start text-appblack-700 gap-2'>
            <div className='flex justify-center items-center gap-2'>
              <div className='h-4 w-12 rounded-lg' style={{background:"#0693E3"}} ></div>
              <p className='font-Mont font-bold tracking-tight'>Abandoned</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='h-4 w-12 rounded-lg' style={{background:"#06C8E3"}} ></div>
              <p className='font-Mont font-bold tracking-tight'>Lost</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='h-4 w-12 rounded-lg' style={{background:"#3206E3"}} ></div>
              <p className='font-Mont font-bold tracking-tight'>Won</p>
            </div>
            <div className='flex justify-center items-center gap-2'>
              <div className='h-4 w-12 rounded-lg' style={{background:"#D106E3"}} ></div>
              <p className='font-Mont font-bold tracking-tight'>Open</p>
            </div>
          </div>
        </div>
        
        
    </div>
  )
}

export default Oppstatusdaily