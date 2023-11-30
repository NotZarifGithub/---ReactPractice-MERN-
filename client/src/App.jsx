import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/common/Navbar.jsx"

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='' element/>
      </Routes>
    </BrowserRouter>
  )
}

export default App