import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar/Navbar'
import Login from './Authentification/Login'
import Sighnup from './Authentification/Sighnup'
import Candidate from './Candidate'
import AdminPanel from './AdminPanel'
import Profile from './Profile'
import Voteresult from './Voteresult'
import Sighn from './CandidateAuthenticate/Sighn'
import Homes from './Homes'

function App() {

  return (
    <>
    
    <BrowserRouter>
    <Navbar/>
    
    <Routes>
      <Route path='/login' element={<Login/>}/>
     
      <Route path='/Sighn' element={<Sighnup/>}/>
          <Route path='/' element={<Candidate />} />
          <Route path="/results" element={<Voteresult />} /> 
           <Route path="/admin" element={<AdminPanel />} />
           <Route path ='/profile'element={<Profile/>}/>
           <Route path='/adminsighn' element={<Sighn/>}/>
           <Route path='/Hoomes' element={<Homes/>}/>

    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
