import React, { useEffect } from 'react';
import { Header } from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';
import { Notification } from '../../components/Notification/Notification';

function NotificationsPage() {
    const navigate = useNavigate();
    const activeUser = localStorage.getItem("activeUser");
    sessionStorage.removeItem('activeCity');

    useEffect(() => {
        if (!activeUser) {
            navigate('/');
        }
    }, [activeUser, navigate]);

    if (activeUser) {
        return (
            <div>
                <Header />
                <Notification />
            </div>
        );
    }

    return null;
}

export default NotificationsPage;