import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Home from './components/home/Home'
import Login from './components/Login'
import Registration from './components/Registration'
import Profile from './components/Profile'
import AddJob from './components/AddJob'
import Job from './components/home/job/Job'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/registration' element={<Registration />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/addJob' element={<AddJob />} />
            <Route path="/job/:id" element={<Job />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default App
