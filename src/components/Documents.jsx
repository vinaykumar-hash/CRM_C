import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Documents = ({ cip }) => {
  const navigate = useNavigate();
  const handleDocClick = (item) => {
    navigate('/conversation/'+item.cip);
    // console.log('Row clicked:', item.cip);
};
  function createAddDocElement() {
    // Create the main container div
    const mainDiv = document.createElement('div');
    mainDiv.id = 'AddDoc';
    mainDiv.className = 'w-full h-full bg-black/50 absolute top-0 bottom-0 left-0 right-0 m-auto flex justify-center items-center font-Mont';
    mainDiv.style.zIndex = '999';

    // Create the inner container div
    const innerDiv = document.createElement('div');
    innerDiv.className = 'w-1/2 h-max bg-white rounded-lg p-5';

    // Create the Exit button
    const exitButton = document.createElement('button');
    exitButton.id = 'AddDocNot';
    exitButton.className = 'transition-all hover:bg-red-500 cursor-pointer w-max font-medium text-white bg-red-600 px-6 py-2 rounded-lg tracking-wide';
    exitButton.innerText = 'Exit';
    exitButton.addEventListener('click', () => {
      document.body.removeChild(mainDiv);
    });

    // Create the form
    const form = document.createElement('form');
    form.action = '';
    form.className = 'gap-4 w-full flex flex-col items-center justify-center rounded-lg my-5';
    form.addEventListener('submit', handleSubmit);

    // Create the label for the file input
    const fileLabel = document.createElement('label');
    fileLabel.setAttribute('for', 'pdfUpload');
    fileLabel.className = 'self-start text-2xl font-bold font-Mont tracking-tight text-appblack-500';
    fileLabel.innerText = 'Upload Document';

    // Create the hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.id = 'pdfUpload';
    fileInput.name = 'pdfUpload';
    fileInput.accept = '.pdf';
    fileInput.className = 'opacity-0 hidden';

    // Create the visible label for file input
    const fileInputLabel = document.createElement('label');
    fileInputLabel.setAttribute('for', 'pdfUpload');
    fileInputLabel.className = 'flex justify-center items-center cursor-pointer w-full h-16 outline-red-300 outline-dashed rounded-lg';
    const fileInputLabelText = document.createElement('p');
    fileInputLabelText.className = 'text-xl font-medium text-red-500';
    fileInputLabelText.innerText = 'Choose File';
    fileInputLabel.appendChild(fileInputLabelText);

    // Create the div for document type input
    const docTypeDiv = document.createElement('div');
    docTypeDiv.className = 'w-full flex justify-start self-start text-appblack-600 font-medium gap-2';

    const docTypeText = document.createElement('p');
    docTypeText.innerText = 'Document Type';

    const docTypeInput = document.createElement('input');
    docTypeInput.type = 'text';
    docTypeInput.id = 'docTypeInput';
    docTypeInput.className = 'border-b-2 border-appblack-600/10 hover:border-appblack-600/50 focus:border-appblack-600/50 px-2 outline-none bg-white';
    docTypeInput.placeholder = 'Add a Document Type';
    docTypeInput.required = true;

    const requiredMark = document.createElement('div');
    requiredMark.className = 'text-red-600 text-xl';
    requiredMark.innerText = '*';

    docTypeDiv.appendChild(docTypeText);
    docTypeDiv.appendChild(docTypeInput);
    docTypeDiv.appendChild(requiredMark);

    // Create the submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'w-max bg-appblue-500 font-medium text-white rounded-lg px-5 py-2';
    submitButton.innerText = 'Submit';

    // Append elements to the form
    form.appendChild(fileLabel);
    form.appendChild(fileInput);
    form.appendChild(fileInputLabel);
    form.appendChild(docTypeDiv);
    form.appendChild(submitButton);

    // Append elements to the inner container div
    innerDiv.appendChild(exitButton);
    innerDiv.appendChild(form);

    // Append inner container to the main container div
    mainDiv.appendChild(innerDiv);

    // Append the main container div to the body
    document.body.appendChild(mainDiv);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    const fileInput = document.getElementById('pdfUpload');
    const docTypeInput = document.getElementById('docTypeInput');

    if (fileInput.files.length > 0) {
      formData.append('pdf', fileInput.files[0]);
    }
    formData.append('docname', docTypeInput.value);
    formData.append('cip', cip);

    fetch(`http://localhost:8080/upload/${docTypeInput.value}/${cip}`, {
      method: 'POST',
      body: formData,
    })
      .then(data => {
        alert('File uploaded successfully');
        document.getElementById('AddDoc').remove();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Failed to upload file');
      });
  }
  useEffect(() => {
    async function FetchFileName(){
      try {
        const response = await fetch(`http://localhost:8080/getpdfname/${cip}`);
        const data = await response.json();
        return data.result;
      } catch (err) {
          console.error("Error fetching data:", err);
          return 0; // Or another appropriate fallback value
      }
    }
    FetchFileName().then((data)=>{
      let DocContainer = document.getElementById("DocContainer");
      DocContainer.innerHTML = ""
      data.forEach(element => {
        if(element==="cip"){
          //
        }else{
          let tempelement = document.createElement("div");
          tempelement.className = "capitalize tracking-wide bg-white rounded-lg px-3 transition-all hover:shadow-lg py-3 font-medium tracking-tight text-appblack-500";
          tempelement.textContent = element;
          tempelement.onclick = ()=>window.open(`http://localhost:8080/getpdf/${element}/${cip}`,`_blank`, `rel=noopener noreferrer`);
          DocContainer.appendChild(tempelement);
        }
        
      });
    })
  }, []);

  return (
    <div id="DocumentsSection" className="m-5 font-Mont flex flex-col h-full">
      <h1 onClick={()=>window.open('http://localhost:8080/getpdf/birth/9918','_blank', 'rel=noopener noreferrer')} className="text-3xl font-Mont text-appblack-700 font-semibold tracking-tight mb-2">Documents</h1>
      <button onClick={createAddDocElement} className="w-max self-end float-right font-bold tracking-tight bg-appblue-500 text-white px-4 py-1 rounded-lg">
        Upload
      </button>
      <div id='DocContainer' className=" py-5 overflow-y-scroll h-40 gap-2 flex flex-col no-scrollbar ">
      </div>
    </div>
  );
};

export default Documents;
