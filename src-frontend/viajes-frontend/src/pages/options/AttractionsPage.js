import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

function CitiesPage() {
    const navigate = useNavigate();
    const activeUser = localStorage.getItem("activeUser");

    useEffect(() => {
        if (!activeUser) {
            navigate('/');
        }
    }, [activeUser, navigate]);

    if (activeUser) {
        return (
            <div>
                <Header />
                Attraction
            </div>
        );
    }

    return null;
}

export default CitiesPage;
