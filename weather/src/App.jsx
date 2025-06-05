import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'

import Mainpage from './pages/main.jsx';
import LoginPage from './pages/login.jsx';
import SignuPage from './pages/signup.jsx';
import Subpage from './pages/sub.jsx';




function App() {

  return (
    <div className='h-full'>
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Mainpage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
           <Route path="/signup" element={<SignuPage/>}/>
           <Route path="/sub" element={<Subpage/>}/>


        </Routes>
      </BrowserRouter>


      
    </div>
  )
}


export default App;
 