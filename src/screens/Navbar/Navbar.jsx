import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './navbar.scss'  

export default function Navbar(props) {
    const [API_URL, setURL] = useState(props.stateurl)

    async function changeStatus() {
        await fetch(`${API_URL}/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: JSON.parse(props.stateid),
                status: false
            })
        })

        localStorage.removeItem('ID')
        window.location.pathname = '/'
    }

    useEffect(() => {
      if(!props.stateid) {
        window.location.pathname = "/"
      }
    })

    return (
      <nav>
          <ul>
            <NavLink className='li' exact="true" to="/dashboard">
              Inicio
            </NavLink>
            <NavLink className='li' to="/account">
              Account
            </NavLink>
            <NavLink className='li' to="/tickets">
              Tickets
            </NavLink>
            <NavLink className='li' to="/create-event">
              Create events
            </NavLink>
            <li className='li' onClick={changeStatus}>
              Log out
            </li>
          </ul>
      </nav>
    )
}
