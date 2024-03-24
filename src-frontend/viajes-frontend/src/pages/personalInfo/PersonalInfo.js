import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { PersonalInfo } from '../../components/PersonalInfo/PersonalInfo';
import { useNavigate } from 'react-router-dom';

function PersonalInfoPage() {
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
                <PersonalInfo />
            </div>
        );
    }

    return null;
}

export default PersonalInfoPage;