import React, { useEffect, useState } from 'react';

import './dashboard.scss'

import logo from "../../assets/imgs/logo-name-image.png"

export default function Dashboard(props) {
  const [events, setEvents] = useState(null)

  async function getEvents() {
    try {
      const response = await fetch(`${props.stateurl}/events`)
      const data = await response.json()

      setEvents(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getEvents()
  }, [])

  return (
    <section className='ctr--dash'>
      <h3>Upcoming events</h3>
      <div className='ctr--arts'>
        { events && 
          events.map((event, index) => (
          <article key={index} >
            <picture>
              <img src={ event.picture } alt="picture" />
            </picture>
            <div>
              <p className='tt'>{ event.title }</p>
              <span className='dt'>{ event.date }</span>
              <p className='plc'>{ event.place }</p>
              <span className='cost' >{ event.cost }</span>
              <p className='hos' >{ event.host }</p>
            </div>
          </article>
          ))
        }
      </div>
    </section>
  );
}
