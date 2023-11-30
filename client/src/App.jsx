import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/common/Navbar.jsx"
import Home from './pages/Home.jsx'
import SignUp from './pages/SignUp.jsx'
import SignIn from './pages/SignIn.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/register' element={<SignUp />}/>
        <Route path='/login' element={<SignIn />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App