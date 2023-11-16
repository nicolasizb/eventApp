import React, { useEffect, useState } from 'react' 

import './CreateEvents.scss'

export default function CreateEvents(props) {
    const [inputStyle, setInputStyle] = useState('inp--true')
    const [file, setFile] = useState(null)
    const [createInSuccess, setCreateInSuccess] = useState(false)
    const [userData, setUserData] = useState({
      profile_photo: null,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      dni: null
    })
    const [newEvent, setNewEvent] = useState({
        picture: "",
        title: "",
        date: "",
        place: "",
        city: "",
        cost: "",
        host: JSON.parse(props.stateid)
    })

    function handleInputChange(e) {
        const {name, value} = e.target

        setNewEvent({
            ...newEvent, 
            [name]: value
        })
    }

    function handleBtnFile() {
        document.getElementById('picture').click()
    }

    function handleFileChange(e) {
        const action = e.target.files[0]
        setFile(action)
    }

    async function getUser() {
      try {
          const response = await fetch(`${props.stateurl}/user/${JSON.parse(props.stateid)}`)
          const user = await response.json()
          setUserData(prevUserData => ({
              ...prevUserData,                
              profile_photo: user.profile_photo,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              dni: user.dni,
          }));
      } catch (error) {
          console.error(error)
      }
    }

    async function uploadFile() {
        if (file) {
            const formData = new FormData()
            formData.append('filename', file);
      
            try {
                const response = await fetch(`${props.stateurl}/upload-picture-event`, {
                  method: 'POST',
                  body: formData,
                });

                if (response.ok) {
                  const data = await response.json()
                  console.log('URL:', data.downloadURL)
                  const URLPhoto = data.downloadURL
                  if(file) {            
                    setNewEvent((newEvent) => (
                      {
                        ...newEvent, picture: URLPhoto
                      }
                    ))
                  } else {
                    console.error('Image Upload error:', file)
                  }
                } else {
                  console.error('Image Upload error:', response.statusText)
                }
            } catch (error) {
              console.error('Image Upload error:', error.message)
            }
        } else {
          console.error('No file has been selected');
        }
    }

    const validBtn = newEvent.title !== "" && newEvent.date !== "" && newEvent.place !== "" && newEvent.city !== "" && newEvent.cost !== "" && file !== null

    async function createEvent() {
      try {
        if(validBtn) {
          if(file) {
              const response = await fetch(`${props.stateurl}/create-event`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(newEvent)
              })
              if(response.ok) {
                  console.log(newEvent)
                  setCreateInSuccess(true)
                  setNewEvent({
                    picture: "",
                    title: "",
                    date: "",
                    place: "",
                    city: "",
                    cost: ""
                  })
              } else {
                  response.json({
                      status: 400,
                      message: "BAD"
                  })
              }
          } else {
              console.error('No file has been selected');
          }
        } else {
            console.error('Data incorrect')
        }
      } catch (error) {
          console.error(error)
      }
    }

    useEffect(() => {
        if(file !== null) {
            uploadFile()
        } else {
        }
    }, [file])

    useEffect(() => {
      getUser()
    }, [])

    return (
      <section className='cre--evn'>
          { userData.first_name && <h2>Hi {userData.first_name}!</h2> }
          <h3>Start creating a new event</h3>
          <div>
              <form action="create-event">
                    <label htmlFor="title">Title</label>
                    <input 
                      className={`${inputStyle}`}
                      type="text" 
                      placeholder='Example: Blockchain 2023'
                      name="title" 
                      value={ newEvent.title }
                      onChange={ handleInputChange } 
                      required
                    />

                    <label htmlFor="date">Date</label>
                    <input 
                      className={`${inputStyle}`}
                      type="date" 
                      name="date" 
                      value={ newEvent.date }
                      onChange={ handleInputChange } 
                      required
                    />

                    <label htmlFor="cost">Cost</label>
                    <input 
                      className={`${inputStyle}`}
                      type="text" 
                      placeholder='Free / 20 USD'
                      name="cost" 
                      value={ newEvent.cost }
                      onChange={ handleInputChange } 
                      required
                    />
              </form>
              <form action="create-event">
                    <label htmlFor="city">City</label>
                    <input 
                      className={`${inputStyle}`}
                      type="text" 
                      placeholder='Example: Bogotá D.C.'
                      name="city" 
                      value={ newEvent.city }
                      onChange={ handleInputChange } 
                      required
                    />

                    <label htmlFor="place">Place</label>
                    <input 
                      className={`${inputStyle}`}
                      type="text"                       
                      name="place" 
                      placeholder='Example: Hotel Marriot 26'
                      value={ newEvent.place }
                      onChange={ handleInputChange } 
                      required
                    />

                    <label htmlFor="picture">Cover image</label>
                    <input 
                      className={`int--file ${inputStyle}`}
                      type="file" 
                      placeholder='Example: Free'
                      id="picture"
                      name="picture" 
                      onChange={ handleFileChange } 
                      required
                    />
                    <input className='btn-upload' type="button" value="Upload picture here" onClick={ handleBtnFile } />
              </form>
          </div>
          {createInSuccess && <p className="tru--msg" >Event created</p> }
          <button className={`btn__login btn-cre-evn ${ validBtn && file ? 'active' : 'inactive'  }`}  
          disabled={ !validBtn } onClick={ createEvent } >Create event</button>
      </section>
    )
}
