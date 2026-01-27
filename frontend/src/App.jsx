import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import { Home } from 'lucide-react'
import Register from '../pages/Register'
import Create from '../pages/Create'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />}>
          <Route index element={<Home />} />
          <Route path='/create' element={<Create />} />
        </Route>
        <Route path='/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App