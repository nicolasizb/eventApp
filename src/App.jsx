import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './screens/Home/Home.jsx'
import Error404 from './screens/Error404/Error404.jsx'
import SignOn from './screens/SignOn/SignOn.jsx'
import Dashboard from './screens/Dashboard/Dashboard.jsx'
import Navbar from './screens/Navbar/Navbar.jsx'

import './App.scss'

function App() {
  const [renderNav, setRenderNav] = useState(null)

  useEffect(() => {
    const isValidNav = window.location.pathname

    if(isValidNav !== "/") {
      setRenderNav(true)
    } else {
      setRenderNav(null)
    }
  }, [])

  return (
    <React.Fragment>
      <BrowserRouter>
        { renderNav && <header><Navbar /></header> }
        <main>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path='/create-account' element={ <SignOn /> } />
            <Route path='/dashboard' element={ <Dashboard /> } />
            <Route path="*" element={ <Error404 /> } />
          </Routes>
        </main>
      </BrowserRouter>
    </React.Fragment> 
  )
}

export default App
