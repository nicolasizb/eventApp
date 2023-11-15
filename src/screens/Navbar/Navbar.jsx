import React from 'react'
import { Link } from 'react-router-dom'

import './navbar.scss'  

const API_URL = 'https://eventhub-navy.vercel.app'

export default function Navbar() {
    const id = localStorage.getItem('ID')

    const changeStatus = async () => {
        await fetch(`${API_URL}/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: JSON.parse(id),
                status: false
            })
        })

        localStorage.removeItem('ID')
        window.location.pathname = '/'
    }

    return (
      <nav>
          <ul>
              <Link className='li'>Account</Link>
              <Link className='li'>Tickets</Link>
              <Link className='li'>Events</Link>
              <Link className='li'>Add events</Link>
              <Link className='li' onClick={ changeStatus } >Log out</Link>
          </ul>
      </nav>
    )
}
