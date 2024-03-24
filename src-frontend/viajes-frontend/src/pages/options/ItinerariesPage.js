import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

function ItinerariesPage() {
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
                Itineraries
            </div>
        );
    }

    return null;
}

export default ItinerariesPage;