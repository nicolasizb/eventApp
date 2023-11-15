import React, { useState } from 'react'

import logo from '../../assets/imgs/logo-name-image.png'
import { Link } from 'react-router-dom'

const API_URL = 'https://eventhub-navy.vercel.app'

export default function SignOn() {

  const [newUser, setNewUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    dni: undefined,
    login_status: false
  })

  const [inputStyle, setInputStyle] = useState('inp--true')
  const [signInError, setSignInError] = useState(false)
  const [signInSuccess, setSignInSuccess] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target 

    setNewUser({
      ...newUser,
      [name]: value
    })
  }

  const isValidInfo = newUser.first_name !== '' && newUser.last_name !== '' && /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(newUser.email) && newUser.password !== ''

  async function signOn(e) {
    e.preventDefault()
    if(isValidInfo) {
      const response = await fetch(`${API_URL}/sign-on`, {
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

  return (
    <section className='ctr--sgo' >
      <div>
        <Link to="/" >
          <img className='logo-image' src={ logo } alt="logo" />
        </Link>
        <form>
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
          disabled={ !isValidInfo } 
          onClick={ signOn }
          >Sign On</button>
        </form>
      </div>
    </section>
  )
}
