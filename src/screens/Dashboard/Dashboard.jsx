// Importa useNavigate en lugar de useHistory
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import './dashboard.scss';

export default function Dashboard(props) {
  const [events, setEvents] = useState(null);
  const [eventDetail, setEventDetail] = useState('');
  const navigate = useNavigate();

  const getEvents = async () => {
    try {
      const response = await fetch(`${props.stateurl}/events`);
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error(error);
    }
  }

  const getEvent = (eventSelected) => {
    setEventDetail(eventSelected)
    navigate("/event-detail", { state: { eventdetail: eventSelected } })
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <section className='ctr--dash'>
      <h3>Upcoming events</h3>
      <div className='ctr--arts'>
        { events && 
          events.map((event, index) => (
            <EventCard key={index} event={ event } sendeventdetail={ getEvent } />
          ))
        }
      </div>
    </section>
  );
}
