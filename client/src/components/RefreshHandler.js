import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function RefreshHandler({ setIsAuthenticate }) {

    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticate(true);
            if (location.pathname === '/login') {
                navigate('/admin', { replace: false });
            }
        }
    }, [location, navigate, setIsAuthenticate])

    return (
        <div>

        </div>
    )
}