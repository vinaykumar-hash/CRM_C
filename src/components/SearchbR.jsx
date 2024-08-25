import React from 'react'

const Search = () => {
  function handleSearchChange(e){
    localStorage.setItem("CurrentSearch",e.target.value);
  }
  return (
    <div className=' bg-appblack-800 m-10 rounded-lg flex justify-start items-start'>
      <input onChange={handleSearchChange} type="text" placeholder='Enter Name or CIP' className='font-Mont h-full bg-appblack-800 rounded-lg outline-none px-8 py-2 text-appblack-600 font-medium w-full'/>
      <button className='bg-appblue-500 px-4 py-1 w-max h-full rounded-lg'><img width="30" height="30" src="https://img.icons8.com/ios-filled/50/FFFFFF/search--v1.png" alt="search--v1"/></button>
    </div>
  )
}

export default Search