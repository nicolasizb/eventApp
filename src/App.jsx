import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from './screens/Home/Home.jsx'
import Error404 from './screens/Error/Error404.jsx'
import Dashboard from './screens/Dashboard/Dashboard.jsx'
import SignOn from './screens/SignOn/SignOn.jsx'
import Navbar from './screens/Navbar/Navbar.jsx'
import Account from './screens/Account/Account.jsx'

import './App.scss'


function App() {
  const [renderNav, setRenderNav] = useState(null)
  const [API_URL, setURL] = useState("https://eventhub-navy.vercel.app")
  const [id, setID] = useState(localStorage.getItem('ID'))

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
        { renderNav && <header><Navbar stateurl={ API_URL } stateid={ id } /></header> }
        <main>
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/create-account" element={ <SignOn stateurl={ API_URL } /> } />
            <Route path="/dashboard" element={ <Dashboard stateurl={ API_URL }  /> } />
            <Route path="/account" element={ <Account stateurl={ API_URL } stateid={ id } /> } ></Route>
            <Route path="*" element={ <Error404 /> } />
          </Routes>
        </main>
      </BrowserRouter>
    </React.Fragment> 
  )
}

export default App