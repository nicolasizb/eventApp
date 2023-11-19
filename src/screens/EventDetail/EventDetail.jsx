import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

import './EventDetail.scss'

export default function EventDetail(props) {
  const location = useLocation();
  const [eventDetailData, setEventDetailData] = useState(null);

  const goToDashboard = () => {
    window.location.pathname = "/dashboard"
  }

  const createTicket = async () => {
    const dataID = {
      userID: JSON.parse(props.stateid),
      eventID: eventDetailData._id
    }

    try {
        const response = await fetch(`${props.stateurl}/create-ticket`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataID)
        })

        const server = await response.json()
        console.log(server)
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    if (location.state && location.state.eventdetail) {
      setEventDetailData(location.state.eventdetail);
    }
  }, [location.state]);

  return (
    <section className='evt--det' >
      <button className='ico--bck' onClick={ goToDashboard } ></button>
      <h3 className='evn--tt' >{ eventDetailData ? eventDetailData.title : '' }</h3>
      <div className='dd' >
        <h4>{ eventDetailData ? eventDetailData.date : '' }</h4>
        <h5>{ eventDetailData 
          ?  eventDetailData.place + ' • ' + eventDetailData.city
          : ''
        }</h5>
      </div>
      <picture>
        <img src={ eventDetailData ? eventDetailData.picture : '' } alt="image event detail" />
      </picture>
      <p>{ eventDetailData ? eventDetailData.description : 'eventDetailData' }</p>
      <button className='btn--gtk' onClick={ createTicket } >Get ticket</button>
    </section>
  ) 
}
