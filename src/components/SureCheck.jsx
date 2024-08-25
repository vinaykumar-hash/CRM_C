import React, { useState } from 'react'

const SureCheck = ({ question, onAnswer }) => {
    alert("hi")
    const [isVisible,setVisiblity] = useState(true);
    const [answer,setAnswer] = useState("");
    const handleAnswer = (userAnswer) => {
        setAnswer(userAnswer);
        onAnswer(userAnswer); // Pass the answer to the callback
        setVisiblity(false); // Hide the dialog after selecting an answer
      };
  return (
    isVisible &&
    <div className='absolute w-screen h-screen bg-black/80' style={{zIndex:999}}>
        <div className='centeraboslute min-h-80 min-w-96 bg-white rounded-lg p-10'>
            <p className='font-Mont font-semibold tracking-tighter text-6xl text-appblack-500'>{question}</p>
            <button onClick={() => handleAnswer(true)}>Yes</button>
            <button onClick={() => handleAnswer(false)}>No</button>
        </div>
    </div>
  )
}

export default SureCheck