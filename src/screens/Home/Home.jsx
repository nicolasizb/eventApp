import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/imgs/logo-name-image.png';
import './home.scss';

const API_URL = 'https://eventhub-navy.vercel.app'

function Home() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [inputStyle, setInputStyle] = useState('inp--true')
  const [loginError, setLoginError] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(formData.email)
  const isValidPassword = formData.password !== ''

  async function signIn() {
    try {
      const response = await fetch(`${API_URL}/sign-in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json()

      if (data.status === true) {
        localStorage.setItem('ID', JSON.stringify(data.id))     

        await fetch(`${API_URL}/log`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: data.id,
                status: true
            })
        })

        window.location.pathname = '/dashboard'
      } else {
        setLoginError(true);
        setInputStyle('inp--err')
      }
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isValidEmail && isValidPassword) {
      await signIn();
    } else {
      setInputStyle('inp--err');
    }
  };

  return (
    <section className="ctr--hm">
      <div>
        <img className="logo-image" src={logo} alt="logo" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className={`${inputStyle}`}
            type="email"
            placeholder="email@gmail.com"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            className={`${inputStyle}`}
            type="password"
            placeholder="**********"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <button
            className={`btn__login ${isValidEmail && isValidPassword ? 'active' : 'inactive'}`}
            disabled={!isValidEmail || !isValidPassword}
            onClick={signIn}
          >
            Sign In
          </button>
          {loginError && <p className="err--msg">Incorrect email or password</p>}
          <Link className="btn__logout" to="/create-account">
            Sign On
          </Link>
        </form>
      </div>
    </section>
  );
}

export default Home;
