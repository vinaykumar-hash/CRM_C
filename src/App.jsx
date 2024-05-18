import React from 'react'
import { useState ,useEffect} from 'react'
import { BrowserRouter as Router ,Routes, Route , Link } from 'react-router-dom'
import Register from './Register'
import Home from './Home'
const App = () => {
  const [Logined,LoginStatus] = useState(false)
  useEffect(() => {
    const isLogined = localStorage.getItem("isLogined") === "true";
    LoginStatus(isLogined);
  }, []);
  // localStorage.getItem("isLogined") == "true" ? LoginStatus(true) : LoginStatus(false);
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Register/>}/>
        <Route path='/' element={Logined? <Home/> :<Register/>}/>
      </Routes>
    </Router>
  )
}

export default App