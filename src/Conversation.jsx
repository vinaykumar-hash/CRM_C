import React, { useState } from 'react'
import Menu from './components/Menu'
import { useEffect } from 'react'
import Search from './components/SearchbR'
import Showallrecords from './components/Showallrecords'
const Conversation = () => {
  let [name,setName] = useState('')
  let [date,setDate] = useState()
  let [id,setCip] = useState()
  let [dob,setDOB] = useState()
  let [course,setCourse] = useState()
  let [university,setUniversity] = useState()
  let [status,setStatus] = useState()
  let [phone,setMobile] = useState()
  let [address,setAddress] = useState()
  let [email,setEmail] = useState()
  async function addNewLead(){
    let url = `http://localhost:8080/setnewlead?`;
    let queries = ['name','phone','address','course','university','date','status','cip','dob','email'];
    let queriesCat = [document.getElementById("Name").value,document.getElementById("Mobile").value,document.getElementById("Address").value,document.getElementById("Course").value,document.getElementById("University").value,document.getElementById("Date").value,document.getElementById("Status").value,document.getElementById("CIP").value,document.getElementById("DOB").value,document.getElementById("Email").value];
    for(let i=0;i<queries.length;i++){
      url+=`${queries[i]}=${encodeURIComponent(queriesCat[i])}&`
    }
    url = url.slice(0, -1);
    try {
      const response = await fetch(`${url}`);
      const data = await response.json();
      ///////
      let Uurl = `http://localhost:8080/setnewdata?`;
        Uurl+=`course=${encodeURIComponent(document.getElementById("Course").value)}&university=${encodeURIComponent(document.getElementById("University").value)}&status=${encodeURIComponent(document.getElementById("Status").value)}&date=${encodeURIComponent(document.getElementById("Date").value)}&cip=${encodeURIComponent(document.getElementById("CIP").value)}`;
        try {
          const response = await fetch(`${Uurl}`);
          const data = await response.json();
        } catch (err) {
            console.error("Error fetching data:", err);
            return 0; // Or another appropriate fallback value
        }
      ///////
      data.result==="ok"?alert("New Lead Added") :alert("Failed to Add Lead");
    } catch (err) {
        console.error("Error fetching data:", err);
        return 0; // Or another appropriate fallback value
    }
  }
  async function handleSubmit(event){
    addNewLead()
  };
  function createDynamicForm() {
    // Create the outer container div
    const outerDiv = document.createElement('div');
    outerDiv.id = 'AddNew';
    outerDiv.className = 'absolute flex justify-center items-center w-screen h-screen bg-black/50';
    outerDiv.style.zIndex = 999;
  
    // Create the inner white content div
    const innerDiv = document.createElement('div');
    innerDiv.className = 'w-9/12 bg-white rounded-lg p-5 max-h-screen';
  
    // Function to create individual input fields with cleaner logic
    function createInputField(label, type, updateFunction, placeholder = "") {
      const inputDiv = document.createElement('div');
      inputDiv.className = 'flex p-5 gap-5 w-max items-center';
  
      const labelText = document.createElement('p');
      labelText.textContent = label;
      labelText.className = 'text-appblack-500 font-medium tracking-tight';
  
      const inputElement = document.createElement('input');
      inputElement.type = type;
      inputElement.id = label;
      inputElement.className = 'rounded-lg px-5 outline-none py-2 text-appblack-500';
      inputElement.placeholder = placeholder;
      inputElement.required = true;
      inputElement.onchange = (event)=>{
        updateFunction(event.target.value)
      };
  
      inputDiv.appendChild(labelText);
      inputDiv.appendChild(inputElement);
  
      return inputDiv;
    }
  
    // Create the header section with title and buttons
    const headerDiv = document.createElement('div');
    headerDiv.className = 'w-full flex justify-between';
  
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Exit';
    cancelButton.className = 'font-Mont text-red-500 border-2 border-red-500 bg-white rounded-lg px-5 font-bold';
    cancelButton.onclick = function() {
      handleCancel();
      outerDiv.remove();
    };
  
    const title = document.createElement('p');
    title.textContent = 'New Lead';
    title.className = 'text-2xl font-bold text-appblack-500 font-Mont tracking-tight';
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'opacity-0 font-Mont text-white bg-appblue-500 rounded-lg px-5 py-2 font-bold';
    saveButton.onclick = function() {
      handleSaveNewDetail();
    };
  
    // Append elements to the header section
    headerDiv.appendChild(cancelButton);
    headerDiv.appendChild(title);
    headerDiv.appendChild(saveButton);
  
    // Create the form element
    const form = document.createElement('form');
    form.onsubmit = handleSubmit;
    form.className = 'flex flex-col justify-center items-center font-Mont';
  
    // Create Basic Details section
    const basicDetailsDiv = document.createElement('div');
    basicDetailsDiv.className = 'w-full mt-5 flex flex-wrap bg-appblack-900 rounded-lg';
  
    const basicDetailsTitle = document.createElement('p');
    basicDetailsTitle.textContent = 'Basic Details';
    basicDetailsTitle.className = 'font-medium tracking-tight text-appblack-700 mt-5 self-start';
  
    // Create individual input fields using the createInputField function
    const nameInput = createInputField('Name', 'text', setName, 'Add Name');
    const dateInput = createInputField('Date', 'text', setDate, 'DD/MM/YYYY');
    const cipInput = createInputField('CIP', 'text', setCip , 'Add CIP');
    const dobInput = createInputField('DOB', 'text', setDOB, 'DD/MM/YYYY');
    const courseInput = createInputField('Course', 'text', setCourse , 'Add Course');
    const universityInput = createInputField('University', 'text', setUniversity , 'Add University');
    const statusInput = createInputField('Status', 'text', setStatus , 'Current Status');
  
    // Append input fields to basic details container (cleaner approach)
    form.appendChild(basicDetailsTitle);
    basicDetailsDiv.append(nameInput, dateInput, cipInput, dobInput, courseInput, universityInput, statusInput);
    form.appendChild(basicDetailsDiv);
  
    // Create Communication Details section (similar to Basic Details)
    const communicationDetailsDiv = document.createElement('div');
    // ... (previous code)

    communicationDetailsDiv.className = 'w-full mt-5 flex flex-wrap bg-appblack-900 rounded-lg';

    const communicationDetailsTitle = document.createElement('p');
    communicationDetailsTitle.textContent = 'Communication Details';
    communicationDetailsTitle.className = 'font-medium tracking-tight text-appblack-700 pt-5 self-start';

    // Create individual input fields for communication details using createInputField
    const mobileInput = createInputField('Mobile', 'text', setMobile,'Add Phone');
    const addressInput = createInputField('Address', 'text', setAddress, 'Communication Address');
    const emailInput = createInputField('Email', 'email', setEmail, 'Add Email');

    // Append input fields to communication details container
    form.appendChild(communicationDetailsTitle);
    communicationDetailsDiv.append(mobileInput, addressInput, emailInput);
    form.appendChild(communicationDetailsDiv);

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit';
    submitButton.className = 'mt-5 font-Mont text-white bg-appblue-500 rounded-lg px-5 py-2 font-bold';

    // Append submit button to form
    form.appendChild(submitButton);

    // Append form and inner div to outer div
    innerDiv.appendChild(headerDiv);
    innerDiv.appendChild(form);
    outerDiv.appendChild(innerDiv);

    // Append the entire form container to the document body (assuming you want it appended to the body)
    document.getElementById('ConvoMain').appendChild(outerDiv);
    }

  
  function handleCancel(){
    document.getElementById('AddNew').remove();
  }
    useEffect(()=>{
        const isLogined = localStorage.getItem("isLogined") === "true";
        !isLogined?navigate('/'):console.log("");
      },[])
  return (
    <div id="ConvoMain" className='w-screen h-screen bg-white flex'>
      {/* <div id='AddNew' className='absolute flex justify-center items-center w-screen h-screen bg-black/50' style={{zIndex:999}}>
        <div className='w-9/12  bg-white rounded-lg p-5'>
        <div className='w-full flex justify-between'>
            <button onClick={()=>handleCancel()} className='font-Mont text-red-500 border-2 border-red-500 bg-white rounded-lg px-5 py-2 font-bold'>Exit</button>
            <p className='text-2xl font-bold text-appblack-500 font-Mont tracking-tight'>New Lead</p>
            <button onClick={()=>handleSaveNewDetail()} className='opacity-0 font-Mont text-white bg-appblue-500 rounded-lg px-5 py-2 font-bold'>Save</button>
          </div>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center font-Mont'>
            <div className='w-full mt-5'>
              <p className='font-medium tracking-tight text-appblack-700'>Basic Details</p>
              <div className='w-full bg-appblack-900 rounded-lg mt-2 flex justify-start items-center flex-wrap'>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Name</p>
                  <input onChange={(e)=>{setName(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Add Name' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Date</p>
                  <input onChange={(e)=>{setDate(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='DD/MM/YYYY' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center '>
                  <p className='text-appblack-500 font-medium tracking-tight'>CIP</p>
                  <input onChange={(e)=>{setCip(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Add CIP' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>DOB</p>
                  <input onChange={(e)=>{setDOB(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='DD/MM/YYYY' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Course</p>
                  <input onChange={(e)=>{setCourse(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Add Course' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>University</p>
                  <input onChange={(e)=>{setUniversity(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Add University' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Status</p>
                  <input onChange={(e)=>{setStatus(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Current Status' required/>
                </div>
              </div>
            </div>
            <div className='w-full mt-5'>
              <p className='font-medium tracking-tight text-appblack-700'>Communication Details</p>
              <div className='w-full bg-appblack-900 rounded-lg mt-2 flex justify-start items-center flex-wrap'>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Mobile</p>
                  <input onChange={(e)=>{setMobile(e.target.value)}} type="text" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Add Phone' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Address</p>
                  <input onChange={(e)=>{setAddress(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Add Address' required/>
                </div>
                <div className='flex p-5 gap-5 w-max items-center'>
                  <p className='text-appblack-500 font-medium tracking-tight'>Email</p>
                  <input onChange={(e)=>{setEmail(e.target.value)}} type="text" name="" id=""  className='rounded-lg px-5 outline-none py-2' placeholder='Email' required/>
                </div>

              </div>
            </div>
            <button type="submit" className='mt-5 font-Mont text-white bg-appblue-500 rounded-lg px-5 py-2 font-bold'>Submit</button>
          </form>
        </div>
      </div> */}
        <Menu/>
        <div className='w-full'>
        <Search/>
        <div className='w-full flex justify-end px-10 mb-5'>
          <button onClick={()=>createDynamicForm()} className='rounded-lg font-Mont text-white bg-appblue-500 px-4 py-2 font-semibold'>New Lead</button>
        </div>
        
        <Showallrecords/>
        </div>
        
    </div>
  )
}

export default Conversation