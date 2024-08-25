import React, { useEffect, useState } from 'react'

const Notes = ({cip}) => {
  const [Notes,SetNotes] = useState("")

  useEffect(()=>{
    async function getNotes(cip) {
      try {
        const response = await fetch(`http://localhost:8080/getnotes/${cip}`);
        const data = await response.json();
        return data.notes[0].note;
      } catch (err) {
          console.error("Error fetching data:", err);
          return 0; // Or another appropriate fallback value
      }
        
        }
      getNotes(cip).then((data)=>{
        SetNotes(data);
      })

      async function setNotes(cip) {
        let TempNote = document.getElementById('notes').value;
        // console.log(Notes)
        try {
          const response = await fetch(`http://localhost:8080/setnotes/${cip}?note=${encodeURIComponent(TempNote)}`);
          const data = await response.json();
        } catch (err) {
            console.error("Error fetching data:", err);
        }
        getNotes(cip).then((data)=>{
          SetNotes(data);
        })
          }
      let savebtn = document.getElementById('SaveBTN');
      savebtn.addEventListener('click',()=>{
        setNotes(cip);
      })
  },[])
  return (
    <div className='w-full p-5 font-Mont'>
        <h1 className='text-3xl font-Mont text-appblack-700 font-semibold tracking-tight'></h1>
        <textarea name="notes" id="notes" placeholder='Add Notes ...' className='no-scrollbar my-2 outline-none w-full rounded-lg p-2 overflow-y-scroll max-h-64 min-h-64 resize-none font-medium' defaultValue={Notes} onChange={(e)=>{SetNotes(e.target.value)}}></textarea>
        <button className='float-right font-semibold bg-white text-appblue-500 px-4 py-1 rounded-lg hover:text-white hover:bg-appblue-500 transition-all' id='SaveBTN'>Save</button>
    </div>
  )
}

export default Notes