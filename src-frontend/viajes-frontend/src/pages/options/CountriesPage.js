import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { Countries } from '../../components/Options/Countries'

function CountriesPage() {
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
                <Countries />
            </div>
        );
    }

    return null;
}

export default CountriesPage;
