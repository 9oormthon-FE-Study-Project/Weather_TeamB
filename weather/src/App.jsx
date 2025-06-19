import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css'



import Mainpage from './pages/main.jsx';
import LoginPage from './pages/login.jsx';
import SignuPage from './pages/signup.jsx';
import Subpage from './pages/sub.jsx';
import MapForm from './pages/map.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import WeatherList from './pages/list.jsx'
// 네비게이션 바 구현
import NavBar from './components/NavBar.jsx';

import WeatherTest from './apiTest/apiTest.jsx';




function App() {

  return (
    <div className='h-full'>
      <BrowserRouter>
        <NavBar/>
        
        <Routes>
           <Route path="/" element={<Mainpage/>}/>
           <Route path="/login" element={<LoginPage/>}/>
           <Route path="/signup" element={<SignuPage/>}/>
           <Route path="/sub" element={<Subpage/>}/>
           <Route path="/map" element={<MapForm/>}/>
           <Route path="/list" element={<WeatherList/>}/>

           <Route path="/test" element={<WeatherTest/>}/>


           {/* ProtectedRoute를 사용하여 로그인한 사용자만 접근할 수 있도록 설정 */}
           <Route path="/sub"
           element={
            <ProtectedRoute>
              <Subpage/>
            </ProtectedRoute>
           }
           />

           <Route path="/map"
            element={
              <ProtectedRoute>
                <MapForm/>
              </ProtectedRoute>
            }
            />

          <Route path="/list"
           element={
            <ProtectedRoute>
              <WeatherList/>
            </ProtectedRoute>
           }
           />
           


        </Routes>
      </BrowserRouter>


      
    </div>
  )
}


export default App;
 