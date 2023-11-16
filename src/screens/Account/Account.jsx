import React, { useEffect, useState } from 'react'

import './Account.scss'

export default function Account(props) {
    const [userData, setUserData] = useState({
        profile_photo: null,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        dni: null
    })

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

    useEffect(() => {
        getUser()
    }, [])

    return (
        <React.Fragment>
            <article className='ctr' >
                <h2 className='ctr__tt' >My account</h2>
                <img src={ userData.profile_photo } alt="image user" />
                <div>
                    <p className='inf--ti' >First name</p>
                    <p className='inf--re' >{ userData.first_name }</p>
                </div>
                <div>
                    <p className='inf--ti' >Last name</p>
                    <p className='inf--re' >{ userData.last_name }</p>
                </div>
                <div>
                    <p className='inf--ti' >Email</p>
                    <p className='inf--re' >{ userData.email }</p>
                </div>
                <div>
                    <p className='inf--ti' >DNI</p>
                    <p className='inf--re' >{ userData.dni }</p>
                </div>
            </article>
        </React.Fragment>
    )
}
