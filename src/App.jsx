import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import Home from './screens/Home/Home.jsx'
import Error404 from './screens/Error404/Error404.jsx'

import './App.scss'

function App() {

  return (
    <React.Fragment>
      <BrowserRouter>
        {/* Nav */}
        <Routes>
          <Route path="/" element={ <Home /> } />
          <Route path="*" element={ <Error404 /> } />
        </Routes>
      </BrowserRouter>
        {/* Navbar */}
    </React.Fragment>
  )
}

export default App
