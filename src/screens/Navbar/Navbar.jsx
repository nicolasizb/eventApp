import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import './navbar.scss'  

export default function Navbar(props) {
    const [API_URL, setURL] = useState(props.stateurl)
    let [btnStatus, setBtnStatus] = useState(false)

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

    const toggleMenuBtn = () => {
      setBtnStatus(!btnStatus)
    }

    useEffect(() => {
      if(!props.stateid) {
        window.location.pathname = "/"
      }
    })

    return (
      <nav>
        <ul className='nav--desk' >
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
        <div className='nav--mobile' >
          <span className='ico--menu' onClick={ toggleMenuBtn } ></span>
          {
            btnStatus &&
            (
              <div className={`ctr--ul ${ btnStatus ? 'active' : 'desactive' }` }>
                <ul>
                  <NavLink className="li" onClick={ toggleMenuBtn } exact="true" to="/dashboard">
                    Inicio
                  </NavLink>
                  <NavLink className="li" onClick={ toggleMenuBtn } to="/account">
                    Account
                  </NavLink>
                  <NavLink className="li" onClick={ toggleMenuBtn } to="/tickets">
                    Tickets
                  </NavLink>
                  <NavLink className="li" onClick={ toggleMenuBtn } to="/create-event">
                    Create events
                  </NavLink>
                  <li className='li' onClick={changeStatus}>
                    Log out
                  </li>
                </ul>
              </div>
            )
          }
        </div>
      </nav>
    )
}
