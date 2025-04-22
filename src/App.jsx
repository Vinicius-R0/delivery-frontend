import React, {use, useEffect} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Cadastro from "./pages/Cadastro"
import Login from "./pages/Login"
import Register from "./pages/Register"

import { setAuthToken } from "./services/apiClientes"
function App() {


  useEffect(() => {
    const token = localStorage.getItem('token')
    setAuthToken(token)
  }, [])

  return (
    
    <BrowserRouter>
    <header className="flex  bg-red-800 text-white justify-center items-center h-20">
      <h1 className="font-bold text-3xl tracking-[.20em]">SISTEMA DE DELIVERY - MICROSEVIÇOS</h1>
    </header>
      <Routes>
        <Route path='/users/register' element={<Cadastro />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register_dishes' element={<Register />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
