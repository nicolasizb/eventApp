import React, { useEffect, useState } from 'react'

import './dashboard.scss'

export default function Dashboard() {
  const [restrictedRoute, setRestrictedRoute] = useState()

  useEffect(() => {
    const id = localStorage.getItem('ID')

    if(!id) {
      window.location.pathname = "/"
    }
  })

  return (
    <section>
      <p>Dashboard</p>
    </section>
  )
}
