import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './nav.css';
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const accessToken = useSelector(state => state.auth.accessToken);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div>
            <nav className="navbar">
                <ul className="nav-list">
                    <li className="nav-item"><a href="/" className="nav-link">Kezdőlap</a></li>
                    {accessToken ?
                        (
                            <>
                                <li className="nav-item"><a href="/profile" className="nav-link">Profil</a></li>
                                {role === "company" && <li className="nav-item"><a href="/addJob" className="nav-link">Munka létrehozása</a></li>}
                                <li className="nav-item"><button onClick={() => {
                                    dispatch(logout());
                                    navigate('/');
                                }}>Kijelentkés</button></li>
                            </>
                        ) :
                        (
                            <>
                                <li className="nav-item"><a href="/login" className="nav-link">Bejelentkezés</a></li>
                                <li className="nav-item"><a href="/registration" className="nav-link">Regisztráció</a></li>
                            </>
                        )
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Nav
