import React, { useEffect } from 'react'

export default function EventCard(props) {
    const goToEventDetail = () => {
      if(props.event) {
        sendInfoToDashboard()
      } else {
        console.log("There is not id")
      }
    }

    const sendInfoToDashboard = () => {
      props.sendeventdetail(props.event)
    }

    return (
        <button onClick={ goToEventDetail } >
            <picture>
              <img src={ props.event.picture } alt="picture" />
            </picture>
            <div className='div'>
              { props.event.title.length < 28 
                ? <p className='tt'>{ props.event.title }</p>
                : <p className='tt'>{ props.event.title.slice(0, 28) }...</p>
              }
              <span className='dt'>{ props.event.date }</span>
              <div className='site'>  
                {
                  props.event.place.length < 22
                  ? <p className='plc'>{ props.event.place }</p>
                  : <p className='plc'>{ props.event.place.slice(0, 22) }...</p>             
                }            
                <p className='cty'>{ props.event.city }</p>
              </div>
              <span className='cost' >{ props.event.cost }</span>
              <p className='hos' >{ props.event.host }</p>
            </div>
        </button>
    )
}
