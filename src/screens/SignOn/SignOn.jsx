import React, { useState, useEffect } from 'react'

import logo from '../../assets/imgs/logo-name-image.png'
import { Link } from 'react-router-dom'

const API_URL = 'https://eventhub-navy.vercel.app'

export default function SignOn(props) {

  const [newUser, setNewUser] = useState({
    profile_photo: null,
    first_name: "",
    last_name: '',
    email: '',
    password: '',
    dni: undefined,
    login_status: false
  })

  const [inputStyle, setInputStyle] = useState('inp--true')
  const [signInError, setSignInError] = useState(false)
  const [signInSuccess, setSignInSuccess] = useState(false)
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    try {
      const action = e.target.files[0]
      console.log(action)
      setFile(action)
    } catch (error) {
      console.error("Error en handleFileChange:", error);
    }
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target 

    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const isValidInfo = newUser.first_name !== '' && newUser.last_name !== '' && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(newUser.email) && newUser.password !== ''

  const uploadFile = async () => {
    if (file) {
      // Crea un objeto FormData para enviar la imagen
      const formData = new FormData()
      formData.append('filename', file);

      try {
        // Realiza la solicitud POST al servidor
        const response = await fetch(`${props.stateurl}/upload-profile-photo`, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json()
          console.log('URL:', data.downloadURL)
          const URLPhoto = data.downloadURL

          if(file) {            
            setNewUser((newUser) => (
              {
                ...newUser, profile_photo: URLPhoto
              }
            ))
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

  async function signOn(e) {
    e.preventDefault()

    if(isValidInfo) {
      const response = await fetch(`${props.stateurl}/sign-on`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      })
      const data = await response.status

      if(data === 200) {    
        setSignInSuccess(true)  
        setTimeout(() => {
          window.location.pathname = '/'
        }, 1000) 
      } else if (data === 400) {
        setInputStyle('inp--err')
        setSignInError(true);
      } else {
        console.error(error)
      }
    } else {
      console.error(error)
    }
  }

  useEffect(() => {
    if (file !== null) {
      uploadFile();
    }
  }, [file]);

  return (
    <section className='ctr--sgo' >
      <div>
        <Link to="/" >
          <img className='logo-image' src={ logo } alt="logo" />
        </Link>
        <form>
          <label 
            htmlFor="profile_photo"
          >Profile photo</label>
          <input 
            className={`${inputStyle}`}
            type="file" 
            onChange={ handleFileChange } 
          />

          <label 
            htmlFor="first-name"
          >First name</label>
          <input 
            className={`${inputStyle}`}
            type="text" 
            placeholder='Your first name'
            name="first_name" 
            value={ newUser.first_name }
            onChange={ handleInputChange } 
            required
          />

          <label htmlFor="last-name">Last name</label>
          <input 
            className={`${inputStyle}`}
            type="text" 
            placeholder='Your last name'
            name="last_name" 
            value={ newUser.last_name }
            onChange={ handleInputChange } 
            required
          />

          <label 
            htmlFor="dni"
          >DNI</label>
          <input 
            className={`${inputStyle}`}
            type="number" 
            placeholder='Only numbers'
            name="dni" 
            value={ newUser.dni }
            onChange={ handleInputChange } 
            required
          />

          <label 
            htmlFor="email"
          >Email</label>
          <input 
            className={`${inputStyle}`}
            type="email" 
            placeholder='Your email address'
            name="email" 
            value={ newUser.email }
            onChange={ handleInputChange } 
            required
          />

          <label 
            htmlFor="password"
          >Password</label>
          <input 
            className={`${inputStyle}`}
            type="password" 
            placeholder='********'
            name="password" 
            value={ newUser.password }
            onChange={ handleInputChange } 
            required
          />

          {signInSuccess && <p className="tru--msg" >User created</p> }
          {signInError && <p className="err--msg" >User already exists</p> }
          <button className={`btn__login ${ isValidInfo ? 'active' : 'inactive'  }`} 
          disabled={ !isValidInfo || !file } 
          onClick={ signOn }
          >Sign On</button>
        </form>
      </div>
    </section>
  )
}
