import React from 'react'
import Nav from './navBar/Nav'
import { useSelector } from 'react-redux';

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    console.log(user.fullname);

    return (
        <div>
            <Nav />
            <h2>Profilom</h2>
            <div className='container'>
                <p>Teljes név: {user.fullname}</p>
                <p>Email: {user.email}</p>
                <p>Státusz: {user.role === "jobseeker" ? "Munkavállaló" : "Munkáltató"}</p>
            </div>
        </div>
    )
}

export default Profile
