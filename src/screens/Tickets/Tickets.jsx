import React, { useEffect, useState } from 'react'

import './ticket.scss'
import { useActionData } from 'react-router-dom'

export default function Tickets(props) {
    const [tickets, setTickets] = useState(null)
    const [userCookieID, setUserCookieID] = useState(props.stateid)

    const getTickets = async() => {
        try {
            const response = await fetch(`${props.stateurl}/tickets`)

            const data = await response.json()

            const matchingTickets = data.filter(ticket => {
                const userID = JSON.stringify(ticket.user.id)
                return userID === userCookieID
            })

            if (matchingTickets.length > 0) {
                setTickets(matchingTickets);
            } else {
                console.log("All clean");
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTickets()
    }, [tickets])

    return (
        <section className='ctr--tick'>
            <h3>Orders</h3>
            <div className='ctr--card'>
            {
                tickets
                ? tickets.map((ticket, index) => (
                    <article className='card' key={index} >
                        <picture>
                            <img src={ ticket.event.picture } alt="image ticket" />
                        </picture>
                        <div className='card--lf' >
                            <div className='con--one'>
                                <p className='tt'>{ ticket ? ticket.event.title : ticket.event.title = '' }</p>
                                <span className='ss' >{ ticket ? ticket.event.date : ticket.event.date = '' }</span>
                                <p>{ ticket ? ticket.event.place + ' • ' + ticket.event.city : ticket.event = '' }</p>
                            </div>
                            <div className='con--two'>
                                <p>{ ticket ? ticket.event.cost : ticket.event.cost = '' }</p>
                                <p>{ ticket ? ticket.user.first_name + ' ' +  ticket.user.last_name + ' • ' + ticket.user.dni : ticket.user = '' }</p>
                                <p className='tk'>Ticket ID: { ticket ? ticket.id.ticketID : ticket.id.ticketID = '' }</p>
                            </div>
                        </div>
                    </article>
                ))
                : (
                    <p className='no--tk' >There are not tickets yet...</p>
                )
            }
            </div>
        </section>
    )
}
